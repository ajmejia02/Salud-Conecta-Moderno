/**
 * ═════════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — Healthcare API Client (Frontend)
 * ════════════════════════════════════════════════════════════════════════════════
 * 
 * Cliente HTTP tipado para consumir la API FHIR del backend Express.
 * Todas las peticiones pasan por el proxy de Vite (/api → localhost:3001).
 * 
 * Las credenciales de la cuenta de servicio NUNCA se exponen al frontend.
 * Este cliente solo habla con el backend Express vía REST.
 * 
 * Uso:
 *   import { healthcareApi } from './services/healthcareApi';
 *   const patients = await healthcareApi.listPatients();
 * 
 * @module src/services/healthcareApi
 */

import { getAuth } from 'firebase/auth';

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS — Interfaces TypeScript para datos FHIR
// ═══════════════════════════════════════════════════════════════════════════════

/** Datos para crear un paciente FHIR */
export interface CreatePatientData {
  firstName: string;
  lastName: string;
  birthDate: string;  // YYYY-MM-DD
  gender: 'male' | 'female' | 'other' | 'unknown';
  identifier?: string;  // Cédula/documento
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  maritalStatus?: 'S' | 'M' | 'D' | 'W';
  language?: string;
}

/** Recurso Patient FHIR simplificado */
export interface FhirPatient {
  id: string;
  resourceType: 'Patient';
  name: Array<{
    text: string;
    family: string;
    given: string[];
  }>;
  gender: string;
  birthDate: string;
  identifier?: Array<{ value: string }>;
  telecom?: Array<{ system: string; value: string }>;
  address?: Array<{ text: string; city: string; state: string }>;
  active: boolean;
}

/** Datos para crear una observación */
export interface CreateObservationData {
  patientId: string;
  codeKey: string;  // Key de LOINC_CODES (ej: 'BODY_TEMPERATURE')
  value: number;
  note?: string;
  encounterId?: string;
}

/** Signos vitales para registro en lote */
export interface VitalSignsData {
  systolicBP?: number;
  diastolicBP?: number;
  heartRate?: number;
  temperature?: number;
  respiratoryRate?: number;
  oxygenSat?: number;
  weight?: number;
  height?: number;
  encounterId?: string;
}

/** Datos para crear un encuentro médico */
export interface CreateEncounterData {
  patientId: string;
  class?: 'AMB' | 'EMER' | 'IMP' | 'VR';
  type?: string;
  reason?: string;
  practitionerName?: string;
  locationName?: string;
  diagnosis?: string;
}

/** Datos para una consulta completa */
export interface CreateConsultationData extends CreateEncounterData {
  vitals?: VitalSignsData;
}

/** Resumen de historial clínico (Gemini-ready) */
export interface MedicalHistory {
  patient: {
    name: string;
    age: number | null;
    gender: string;
    identifier: string;
    birthDate: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  vitalSigns: Array<{
    type: string;
    value: number;
    unit: string;
    date: string;
  }>;
  labResults: Array<{
    type: string;
    value: number;
    unit: string;
    date: string;
  }>;
  encounters: Array<{
    date: string;
    type: string;
    reason: string;
    diagnosis: string;
    practitioner: string;
    location: string;
  }>;
  summary: string;
  _geminiReady: boolean;
}

/** Respuesta estándar de la API */
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  total?: number;
  patients?: T[];
  observations?: T[];
  encounters?: T[];
  error?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLIENTE HTTP
// ═══════════════════════════════════════════════════════════════════════════════

const API_BASE = '/api/fhir';

/**
 * Helper para realizar peticiones HTTP al backend.
 * Incluye manejo de errores centralizado y logging.
 */
async function request<T>(
   endpoint: string,
   options: RequestInit = {}
): Promise<ApiResponse<T>> {
   const url = `${API_BASE}${endpoint}`;

   try {
     // Get Firebase ID token if user is authenticated
     let authHeader = {};
     try {
       const auth = getAuth();
       const user = auth.currentUser;
       if (user) {
         const token = await user.getIdToken();
         authHeader = { Authorization: `Bearer ${token}` };
       }
     } catch (authError) {
       // If there's an error getting the token (e.g., Firebase not initialized, user not logged in), we just don't add the token.
       console.warn('[HealthcareAPI] Could not get Firebase token:', authError);
     }

     const response = await fetch(url, {
       headers: {
         'Content-Type': 'application/json',
         ...authHeader,
         ...options.headers,
       },
       ...options,
     });

    const data = await response.json();

    if (!response.ok) {
      console.error(`[HealthcareAPI] Error ${response.status}:`, data);
      throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('[HealthcareAPI] ❌ No se puede conectar con el backend. ¿Está corriendo el servidor?');
      throw new Error('No se puede conectar con el servidor de Healthcare. Verifica que esté corriendo (npm run dev:server).');
    }
    throw error;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// API CLIENT — Funciones públicas
// ═══════════════════════════════════════════════════════════════════════════════

export const healthcareApi = {

  // ── PATIENTS ────────────────────────────────────────────────────────────

  /** Crea un nuevo paciente FHIR */
  async createPatient(data: CreatePatientData): Promise<FhirPatient> {
    const response = await request<FhirPatient>('/patients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data!;
  },

  /** Obtiene un paciente por ID */
  async getPatient(patientId: string): Promise<FhirPatient> {
    const response = await request<FhirPatient>(`/patients/${patientId}`);
    return response.data!;
  },

  /** Lista todos los pacientes con filtros opcionales */
  async listPatients(params?: {
    name?: string;
    gender?: string;
    _count?: number;
  }): Promise<{ total: number; patients: FhirPatient[] }> {
    const searchParams = new URLSearchParams();
    if (params?.name) searchParams.set('name', params.name);
    if (params?.gender) searchParams.set('gender', params.gender);
    if (params?._count) searchParams.set('_count', String(params._count));

    const query = searchParams.toString();
    const response = await request<FhirPatient>(`/patients${query ? `?${query}` : ''}`);
    
    return {
      total: response.total || 0,
      patients: (response as any).patients || [],
    };
  },

  /** Actualiza un paciente existente */
  async updatePatient(patientId: string, data: CreatePatientData): Promise<FhirPatient> {
    const response = await request<FhirPatient>(`/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data!;
  },

  /** Busca paciente por cédula/documento */
  async searchByIdentifier(identifier: string): Promise<FhirPatient | null> {
    try {
      const response = await request<FhirPatient>(`/patients/search/${identifier}`);
      return response.data || null;
    } catch {
      return null;
    }
  },

  /** Elimina un paciente */
  async deletePatient(patientId: string): Promise<boolean> {
    const response = await request<void>(`/patients/${patientId}`, {
      method: 'DELETE',
    });
    return response.success;
  },

  // ── OBSERVATIONS ────────────────────────────────────────────────────────

  /** Crea una observación clínica individual */
  async createObservation(data: CreateObservationData): Promise<any> {
    const response = await request<any>('/observations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  },

  /** Obtiene observaciones de un paciente */
  async getPatientObservations(
    patientId: string,
    options?: { category?: 'vital-signs' | 'laboratory'; _count?: number }
  ): Promise<{ total: number; observations: any[] }> {
    const searchParams = new URLSearchParams();
    if (options?.category) searchParams.set('category', options.category);
    if (options?._count) searchParams.set('_count', String(options._count));

    const query = searchParams.toString();
    const response = await request<any>(`/patients/${patientId}/observations${query ? `?${query}` : ''}`);
    
    return {
      total: response.total || 0,
      observations: (response as any).observations || [],
    };
  },

  /** Crea signos vitales en lote */
  async createVitalSigns(patientId: string, vitals: VitalSignsData): Promise<any[]> {
    const response = await request<any>(`/patients/${patientId}/vitals`, {
      method: 'POST',
      body: JSON.stringify(vitals),
    });
    return response.data || [];
  },

  // ── ENCOUNTERS ──────────────────────────────────────────────────────────

  /** Crea un encuentro médico */
  async createEncounter(data: CreateEncounterData): Promise<any> {
    const response = await request<any>('/encounters', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  },

  /** Obtiene encuentros de un paciente */
  async getPatientEncounters(
    patientId: string,
    options?: { status?: string; _count?: number }
  ): Promise<{ total: number; encounters: any[] }> {
    const searchParams = new URLSearchParams();
    if (options?.status) searchParams.set('status', options.status);
    if (options?._count) searchParams.set('_count', String(options._count));

    const query = searchParams.toString();
    const response = await request<any>(`/patients/${patientId}/encounters${query ? `?${query}` : ''}`);
    
    return {
      total: response.total || 0,
      encounters: (response as any).encounters || [],
    };
  },

  /** Finaliza un encuentro médico */
  async completeEncounter(encounterId: string): Promise<any> {
    const response = await request<any>(`/encounters/${encounterId}/complete`, {
      method: 'POST',
    });
    return response.data;
  },

  /** Crea una consulta completa (encuentro + signos vitales) */
  async createFullConsultation(data: CreateConsultationData): Promise<any> {
    const response = await request<any>('/consultations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data;
  },

  // ── MEDICAL HISTORY ─────────────────────────────────────────────────────

  /**
   * Obtiene el historial clínico completo de un paciente.
   * El resumen retornado está optimizado para inyección en Gemini AI.
   */
  async getMedicalHistory(patientId: string): Promise<MedicalHistory> {
    const response = await request<MedicalHistory>(`/patients/${patientId}/history`);
    return response.data!;
  },

  // ── HEALTH CHECK ────────────────────────────────────────────────────────

  /** Verifica la conectividad con Healthcare API */
  async checkHealth(): Promise<{
    status: string;
    connected: boolean;
    timestamp: string;
  }> {
    const response = await request<any>('/health');
    return response as any;
  },
};

export default healthcareApi;
