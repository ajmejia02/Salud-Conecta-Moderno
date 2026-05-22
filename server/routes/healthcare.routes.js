/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — Healthcare API Routes
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Endpoints RESTful para interactuar con Google Cloud Healthcare API (FHIR R4).
 * Todas las rutas están montadas bajo /api/fhir/.
 * 
 * Endpoints disponibles:
 * 
 *   PATIENTS:
 *     POST   /api/fhir/patients              → Crear paciente
 *     GET    /api/fhir/patients               → Listar pacientes
 *     GET    /api/fhir/patients/:id           → Obtener paciente por ID
 *     PUT    /api/fhir/patients/:id           → Actualizar paciente
 *     DELETE /api/fhir/patients/:id           → Eliminar paciente
 *     GET    /api/fhir/patients/search/:identifier → Buscar por cédula
 * 
 *   OBSERVATIONS:
 *     POST   /api/fhir/observations           → Crear observación
 *     GET    /api/fhir/patients/:id/observations → Observaciones del paciente
 *     POST   /api/fhir/patients/:id/vitals    → Crear signos vitales en lote
 * 
 *   ENCOUNTERS:
 *     POST   /api/fhir/encounters             → Crear encuentro
 *     GET    /api/fhir/patients/:id/encounters → Encuentros del paciente
 *     POST   /api/fhir/encounters/:id/complete → Finalizar encuentro
 *     POST   /api/fhir/consultations          → Consulta completa (encuentro + vitals)
 * 
 *   MEDICAL HISTORY:
 *     GET    /api/fhir/patients/:id/history   → Historial clínico completo (Gemini-ready)
 * 
 * @module server/routes/healthcare.routes
 */

import { Router } from 'express';
import { createPatient, getPatient, listPatients, updatePatient, searchPatientByIdentifier, deletePatient } from '../services/healthcare/patient.service.js';
import { createObservation, getPatientObservations, createVitalSigns } from '../services/healthcare/observation.service.js';
import { createEncounter, getPatientEncounters, completeEncounter, createFullConsultation } from '../services/healthcare/encounter.service.js';
import { buildMedicalHistorySummary } from '../services/healthcare/fhir.helpers.js';
import { LOINC_CODES } from '../services/healthcare/fhir.helpers.js';

const router = Router();

// ═══════════════════════════════════════════════════════════════════════════════
// PATIENTS — Gestión de pacientes FHIR
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * POST /api/fhir/patients
 * Crea un nuevo paciente en el FHIR Store.
 * 
 * Body esperado:
 * {
 *   "firstName": "María",
 *   "lastName": "García López",
 *   "birthDate": "1990-03-15",
 *   "gender": "female",
 *   "identifier": "001-150390-0001X",  // opcional
 *   "phone": "+505-8888-1234",          // opcional
 *   "email": "maria@email.com",         // opcional
 *   "address": "Del parque central...", // opcional
 *   "city": "Granada",                  // opcional
 *   "state": "Granada"                  // opcional
 * }
 */
router.post('/patients', async (req, res) => {
  try {
    const { firstName, lastName, birthDate, gender } = req.body;

    // Validación básica de campos requeridos
    if (!firstName || !lastName || !birthDate || !gender) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requieren: firstName, lastName, birthDate, gender',
        required: ['firstName', 'lastName', 'birthDate', 'gender'],
      });
    }

    // Validar formato de fecha
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
      return res.status(400).json({
        error: 'Formato inválido',
        message: 'birthDate debe estar en formato YYYY-MM-DD',
      });
    }

    // Validar género
    const validGenders = ['male', 'female', 'other', 'unknown'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({
        error: 'Valor inválido',
        message: `gender debe ser uno de: ${validGenders.join(', ')}`,
      });
    }

    const patient = await createPatient(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Paciente creado exitosamente',
      data: patient,
    });
  } catch (error) {
    console.error('[Routes] Error creando paciente:', error.message);
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

/**
 * GET /api/fhir/patients
 * Lista todos los pacientes con filtros opcionales.
 * 
 * Query params:
 *   - name: Filtrar por nombre
 *   - gender: Filtrar por género
 *   - _count: Límite de resultados (default: 20)
 */
router.get('/patients', async (req, res) => {
  try {
    const result = await listPatients({
      name: req.query.name,
      gender: req.query.gender,
      _count: req.query._count ? parseInt(req.query._count) : undefined,
      _sort: req.query._sort,
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('[Routes] Error listando pacientes:', error.message);
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

/**
 * GET /api/fhir/patients/search/:identifier
 * Busca un paciente por su cédula/documento de identidad.
 */
router.get('/patients/search/:identifier', async (req, res) => {
  try {
    const patient = await searchPatientByIdentifier(req.params.identifier);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: `No se encontró paciente con identificador: ${req.params.identifier}`,
      });
    }

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error('[Routes] Error buscando por identificador:', error.message);
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

/**
 * GET /api/fhir/patients/:id
 * Obtiene un paciente por su ID FHIR.
 */
router.get('/patients/:id', async (req, res) => {
  try {
    const patient = await getPatient(req.params.id);
    
    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    const status = error.message.includes('no encontrado') ? 404 : 500;
    res.status(status).json({
      error: status === 404 ? 'No encontrado' : 'Error interno',
      message: error.message,
    });
  }
});

/**
 * PUT /api/fhir/patients/:id
 * Actualiza un paciente existente.
 * Body: mismos campos que POST /patients
 */
router.put('/patients/:id', async (req, res) => {
  try {
    const patient = await updatePatient(req.params.id, req.body);
    
    res.json({
      success: true,
      message: 'Paciente actualizado exitosamente',
      data: patient,
    });
  } catch (error) {
    const status = error.message.includes('no encontrado') ? 404 : 500;
    res.status(status).json({
      error: status === 404 ? 'No encontrado' : 'Error interno',
      message: error.message,
    });
  }
});

/**
 * DELETE /api/fhir/patients/:id
 * Elimina un paciente (soft delete en FHIR).
 */
router.delete('/patients/:id', async (req, res) => {
  try {
    const deleted = await deletePatient(req.params.id);
    
    res.json({
      success: true,
      message: deleted ? 'Paciente eliminado' : 'Paciente ya no existía',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// OBSERVATIONS — Observaciones clínicas y signos vitales
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * POST /api/fhir/observations
 * Crea una observación clínica individual.
 * 
 * Body esperado:
 * {
 *   "patientId": "abc-123",
 *   "codeKey": "BODY_TEMPERATURE",  // Key de LOINC_CODES
 *   "value": 37.5,
 *   "note": "Temperatura axilar",    // opcional
 *   "encounterId": "enc-456"         // opcional
 * }
 */
router.post('/observations', async (req, res) => {
  try {
    const { patientId, codeKey, value, note, encounterId } = req.body;

    if (!patientId || !codeKey || value == null) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requieren: patientId, codeKey, value',
        availableCodes: Object.keys(LOINC_CODES),
      });
    }

    const code = LOINC_CODES[codeKey];
    if (!code) {
      return res.status(400).json({
        error: 'Código inválido',
        message: `codeKey "${codeKey}" no es válido. Códigos disponibles: ${Object.keys(LOINC_CODES).join(', ')}`,
      });
    }

    const observation = await createObservation({
      patientId,
      code,
      value: Number(value),
      note,
      encounterId,
    });

    res.status(201).json({
      success: true,
      message: 'Observación creada exitosamente',
      data: observation,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

/**
 * GET /api/fhir/patients/:id/observations
 * Obtiene las observaciones de un paciente.
 * 
 * Query params:
 *   - category: vital-signs | laboratory
 *   - _count: Límite de resultados
 */
router.get('/patients/:id/observations', async (req, res) => {
  try {
    const result = await getPatientObservations(req.params.id, {
      category: req.query.category,
      _count: req.query._count ? parseInt(req.query._count) : undefined,
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

/**
 * POST /api/fhir/patients/:id/vitals
 * Crea signos vitales en lote para un paciente.
 * 
 * Body esperado:
 * {
 *   "systolicBP": 120,
 *   "diastolicBP": 80,
 *   "heartRate": 72,
 *   "temperature": 36.8,
 *   "weight": 68.5,
 *   "height": 170,
 *   "encounterId": "enc-456"  // opcional
 * }
 */
router.post('/patients/:id/vitals', async (req, res) => {
  try {
    const { encounterId, ...vitals } = req.body;

    if (Object.keys(vitals).length === 0) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requiere al menos un signo vital',
        availableVitals: ['systolicBP', 'diastolicBP', 'heartRate', 'temperature', 'respiratoryRate', 'oxygenSat', 'weight', 'height'],
      });
    }

    const results = await createVitalSigns(req.params.id, vitals, encounterId);

    res.status(201).json({
      success: true,
      message: `${results.length} signos vitales registrados`,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ENCOUNTERS — Encuentros médicos (consultas)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * POST /api/fhir/encounters
 * Crea un encuentro médico.
 * 
 * Body esperado:
 * {
 *   "patientId": "abc-123",
 *   "class": "AMB",
 *   "reason": "Dolor de cabeza",
 *   "practitionerName": "Dr. Flores",  // opcional
 *   "locationName": "Centro Granada",  // opcional
 *   "diagnosis": "Cefalea tensional"   // opcional
 * }
 */
router.post('/encounters', async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requiere: patientId',
      });
    }

    const encounter = await createEncounter(req.body);

    res.status(201).json({
      success: true,
      message: 'Encuentro médico creado',
      data: encounter,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

/**
 * GET /api/fhir/patients/:id/encounters
 * Obtiene los encuentros de un paciente.
 */
router.get('/patients/:id/encounters', async (req, res) => {
  try {
    const result = await getPatientEncounters(req.params.id, {
      status: req.query.status,
      _count: req.query._count ? parseInt(req.query._count) : undefined,
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

/**
 * POST /api/fhir/encounters/:id/complete
 * Marca un encuentro como finalizado.
 */
router.post('/encounters/:id/complete', async (req, res) => {
  try {
    const encounter = await completeEncounter(req.params.id);

    res.json({
      success: true,
      message: 'Encuentro finalizado',
      data: encounter,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

/**
 * POST /api/fhir/consultations
 * Crea una consulta médica completa (encuentro + signos vitales).
 * 
 * Body esperado:
 * {
 *   "patientId": "abc-123",
 *   "reason": "Control de embarazo",
 *   "practitionerName": "Dra. Martínez",
 *   "locationName": "Hospital Regional",
 *   "diagnosis": "Embarazo normal",
 *   "vitals": {
 *     "systolicBP": 110,
 *     "diastolicBP": 70,
 *     "heartRate": 78,
 *     "temperature": 36.6,
 *     "weight": 65.0
 *   }
 * }
 */
router.post('/consultations', async (req, res) => {
  try {
    const { patientId, reason } = req.body;

    if (!patientId) {
      return res.status(400).json({
        error: 'Datos incompletos',
        message: 'Se requiere: patientId',
      });
    }

    const result = await createFullConsultation(req.body);

    res.status(201).json({
      success: true,
      message: 'Consulta completa creada',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error interno',
      message: error.message,
    });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// MEDICAL HISTORY — Historial clínico (Gemini-ready)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/fhir/patients/:id/history
 * Obtiene el historial clínico completo de un paciente.
 * Retorna un resumen estructurado preparado para inyección en Gemini AI.
 * 
 * Response incluye:
 *   - Datos del paciente
 *   - Últimos signos vitales
 *   - Resultados de laboratorio
 *   - Historial de consultas
 *   - Resumen narrativo (summary) listo para Gemini
 */
router.get('/patients/:id/history', async (req, res) => {
  try {
    // 1. Obtener paciente
    const patient = await getPatient(req.params.id);

    // 2. Obtener observaciones
    const { observations } = await getPatientObservations(req.params.id);

    // 3. Obtener encuentros
    const { encounters } = await getPatientEncounters(req.params.id);

    // 4. Generar resumen de historial clínico
    const history = buildMedicalHistorySummary(patient, observations, encounters);

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    const status = error.message.includes('no encontrado') ? 404 : 500;
    res.status(status).json({
      error: status === 404 ? 'Paciente no encontrado' : 'Error interno',
      message: error.message,
    });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// HEALTH CHECK
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GET /api/fhir/health
 * Endpoint de health check para verificar la conectividad con Healthcare API.
 */
router.get('/health', async (req, res) => {
  try {
    const { testConnection } = await import('../services/healthcare/client.js');
    const isConnected = await testConnection();

    res.json({
      status: isConnected ? 'healthy' : 'degraded',
      service: 'Google Cloud Healthcare API',
      fhirStore: 'saludconecta-fhir',
      timestamp: new Date().toISOString(),
      connected: isConnected,
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      service: 'Google Cloud Healthcare API',
      error: error.message,
      timestamp: new Date().toISOString(),
      connected: false,
    });
  }
});

export default router;
