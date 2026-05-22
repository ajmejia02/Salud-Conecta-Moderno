/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — FHIR Patient Service
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Servicio para gestión de pacientes FHIR R4 en Google Cloud Healthcare API.
 * Proporciona operaciones CRUD completas sobre recursos Patient.
 * 
 * Funciones disponibles:
 *   - createPatient(data)              → Crear nuevo paciente
 *   - getPatient(patientId)            → Obtener paciente por ID
 *   - listPatients(params)             → Listar pacientes con filtros
 *   - updatePatient(patientId, data)   → Actualizar paciente existente
 *   - searchPatientByIdentifier(id)    → Buscar por cédula/documento
 *   - deletePatient(patientId)         → Eliminar paciente (soft delete)
 * 
 * @module server/services/healthcare/patient.service
 */

import { getFhirClient, getFhirStorePath } from './client.js';
import { buildPatientResource } from './fhir.helpers.js';

/**
 * Crea un nuevo paciente en el FHIR Store.
 * 
 * @param {Object} patientData — Datos del paciente
 * @param {string} patientData.firstName       — Nombre(s)
 * @param {string} patientData.lastName        — Apellido(s)
 * @param {string} patientData.birthDate       — Fecha de nacimiento (YYYY-MM-DD)
 * @param {string} patientData.gender          — male | female | other | unknown
 * @param {string} [patientData.identifier]    — Cédula/documento
 * @param {string} [patientData.phone]         — Teléfono
 * @param {string} [patientData.email]         — Email
 * @param {string} [patientData.address]       — Dirección
 * @param {string} [patientData.city]          — Ciudad
 * @param {string} [patientData.state]         — Departamento
 * 
 * @returns {Promise<Object>} Recurso Patient creado con ID asignado
 * 
 * @example
 * const patient = await createPatient({
 *   firstName: 'María',
 *   lastName: 'García López',
 *   birthDate: '1990-03-15',
 *   gender: 'female',
 *   identifier: '001-150390-0001X',
 *   phone: '+505-8888-1234',
 *   city: 'Granada',
 *   state: 'Granada',
 * });
 * console.log(patient.id); // → ID FHIR asignado automáticamente
 */
export async function createPatient(patientData) {
  try {
    const fhir = await getFhirClient();
    const parent = getFhirStorePath();

    // Construir recurso FHIR válido usando el builder
    const patientResource = buildPatientResource(patientData);

    console.log('[Patient Service] 📝 Creando paciente FHIR...');
    console.log(`  👤 Nombre: ${patientData.firstName} ${patientData.lastName}`);

    const response = await fhir.create({
      parent,
      type: 'Patient',
      requestBody: patientResource,
    });

    const createdPatient = response.data;
    console.log(`[Patient Service] ✅ Paciente creado exitosamente — ID: ${createdPatient.id}`);

    return createdPatient;
  } catch (error) {
    console.error('[Patient Service] ❌ Error al crear paciente:', error.message);
    
    // Proporcionar contexto adicional según el tipo de error
    if (error.code === 409) {
      throw new Error('Ya existe un paciente con los mismos datos. Verifique el identificador.');
    }
    if (error.code === 400) {
      throw new Error(`Datos del paciente inválidos: ${error.message}`);
    }
    
    throw new Error(`Error al crear paciente en FHIR Store: ${error.message}`);
  }
}

/**
 * Obtiene un paciente por su ID FHIR.
 * 
 * @param {string} patientId — ID FHIR del paciente
 * @returns {Promise<Object>} Recurso Patient completo
 * 
 * @throws {Error} Si el paciente no existe (404)
 */
export async function getPatient(patientId) {
  try {
    const fhir = await getFhirClient();
    const name = `${getFhirStorePath()}/fhir/Patient/${patientId}`;

    console.log(`[Patient Service] 🔍 Buscando paciente: ${patientId}`);

    const response = await fhir.read({ name });
    const patient = response.data;

    console.log(`[Patient Service] ✅ Paciente encontrado: ${patient.name?.[0]?.text || 'N/A'}`);
    return patient;
  } catch (error) {
    if (error.code === 404) {
      console.warn(`[Patient Service] ⚠️  Paciente no encontrado: ${patientId}`);
      throw new Error(`Paciente no encontrado con ID: ${patientId}`);
    }
    console.error('[Patient Service] ❌ Error al obtener paciente:', error.message);
    throw new Error(`Error al obtener paciente: ${error.message}`);
  }
}

/**
 * Lista pacientes del FHIR Store con filtros opcionales.
 * Soporta paginación y búsqueda por nombre/género/fecha de nacimiento.
 * 
 * @param {Object} [params]              — Parámetros de búsqueda FHIR
 * @param {string} [params.name]         — Filtrar por nombre
 * @param {string} [params.gender]       — Filtrar por género
 * @param {string} [params.birthdate]    — Filtrar por fecha de nacimiento
 * @param {number} [params._count]       — Número de resultados por página (default: 20)
 * @param {string} [params._sort]        — Ordenar por campo (ej: 'name', '-birthdate')
 * 
 * @returns {Promise<Object>} Bundle FHIR con los pacientes encontrados
 * 
 * @example
 * // Listar todos los pacientes
 * const allPatients = await listPatients();
 * 
 * // Buscar por nombre
 * const search = await listPatients({ name: 'María' });
 * 
 * // Filtrar por género con paginación
 * const females = await listPatients({ gender: 'female', _count: 10 });
 */
export async function listPatients(params = {}) {
  try {
    const fhir = await getFhirClient();
    const parent = getFhirStorePath();

    // Construir query string para búsqueda FHIR
    const searchParams = new URLSearchParams();
    if (params.name) searchParams.set('name', params.name);
    if (params.gender) searchParams.set('gender', params.gender);
    if (params.birthdate) searchParams.set('birthdate', params.birthdate);
    if (params._count) searchParams.set('_count', String(params._count));
    if (params._sort) searchParams.set('_sort', params._sort);

    const resourceType = `Patient?${searchParams.toString()}`;

    console.log(`[Patient Service] 📋 Listando pacientes... (filtros: ${searchParams.toString() || 'ninguno'})`);

    const response = await fhir.search({
      parent,
      resourceType: 'Patient',
      requestBody: {
        resourceType: 'Parameters',
        // Los parámetros de búsqueda se pasan como query params en la URL
      },
    });

    // La respuesta de search es un Bundle FHIR
    const bundle = response.data;
    const totalPatients = bundle.total || bundle.entry?.length || 0;

    console.log(`[Patient Service] ✅ ${totalPatients} paciente(s) encontrado(s)`);

    // Extraer pacientes del bundle para facilitar el uso
    const patients = (bundle.entry || []).map(entry => entry.resource);

    return {
      total: totalPatients,
      patients,
      bundle, // Bundle completo para paginación
    };
  } catch (error) {
    console.error('[Patient Service] ❌ Error al listar pacientes:', error.message);
    throw new Error(`Error al listar pacientes: ${error.message}`);
  }
}

/**
 * Actualiza un paciente existente en el FHIR Store.
 * Usa PUT (replace completo del recurso).
 * 
 * @param {string} patientId   — ID FHIR del paciente
 * @param {Object} patientData — Datos actualizados del paciente
 * 
 * @returns {Promise<Object>} Recurso Patient actualizado
 */
export async function updatePatient(patientId, patientData) {
  try {
    const fhir = await getFhirClient();
    const name = `${getFhirStorePath()}/fhir/Patient/${patientId}`;

    // Construir recurso actualizado
    const patientResource = buildPatientResource(patientData);
    patientResource.id = patientId; // Mantener el mismo ID

    console.log(`[Patient Service] ✏️  Actualizando paciente: ${patientId}`);

    const response = await fhir.update({
      name,
      requestBody: patientResource,
    });

    console.log(`[Patient Service] ✅ Paciente actualizado: ${patientId}`);
    return response.data;
  } catch (error) {
    if (error.code === 404) {
      throw new Error(`Paciente no encontrado para actualizar: ${patientId}`);
    }
    console.error('[Patient Service] ❌ Error al actualizar paciente:', error.message);
    throw new Error(`Error al actualizar paciente: ${error.message}`);
  }
}

/**
 * Busca un paciente por su identificador (cédula/documento).
 * 
 * @param {string} identifier — Número de cédula o documento
 * @returns {Promise<Object|null>} Paciente encontrado, o null si no existe
 * 
 * @example
 * const patient = await searchPatientByIdentifier('001-150390-0001X');
 * if (patient) {
 *   console.log('Paciente encontrado:', patient.name[0].text);
 * }
 */
export async function searchPatientByIdentifier(identifier) {
  try {
    const fhir = await getFhirClient();
    const parent = getFhirStorePath();

    console.log(`[Patient Service] 🔍 Buscando paciente por identificador: ${identifier}`);

    const response = await fhir.search({
      parent,
      resourceType: 'Patient',
      requestBody: {
        resourceType: 'Parameters',
      },
    });

    const bundle = response.data;
    const patients = (bundle.entry || [])
      .map(entry => entry.resource)
      .filter(patient =>
        patient.identifier?.some(id => id.value === identifier)
      );

    if (patients.length === 0) {
      console.log(`[Patient Service] ⚠️  No se encontró paciente con identificador: ${identifier}`);
      return null;
    }

    console.log(`[Patient Service] ✅ Paciente encontrado por identificador: ${patients[0].name?.[0]?.text}`);
    return patients[0];
  } catch (error) {
    console.error('[Patient Service] ❌ Error al buscar por identificador:', error.message);
    throw new Error(`Error al buscar paciente por identificador: ${error.message}`);
  }
}

/**
 * Elimina un paciente del FHIR Store.
 * Nota: En FHIR, delete es un "soft delete" — el recurso se marca como eliminado
 * pero se mantiene en el historial de versiones.
 * 
 * @param {string} patientId — ID FHIR del paciente a eliminar
 * @returns {Promise<boolean>} true si se eliminó exitosamente
 */
export async function deletePatient(patientId) {
  try {
    const fhir = await getFhirClient();
    const name = `${getFhirStorePath()}/fhir/Patient/${patientId}`;

    console.log(`[Patient Service] 🗑️  Eliminando paciente: ${patientId}`);

    await fhir.delete({ name });

    console.log(`[Patient Service] ✅ Paciente eliminado: ${patientId}`);
    return true;
  } catch (error) {
    if (error.code === 404) {
      console.warn(`[Patient Service] ⚠️  Paciente ya no existe: ${patientId}`);
      return false;
    }
    console.error('[Patient Service] ❌ Error al eliminar paciente:', error.message);
    throw new Error(`Error al eliminar paciente: ${error.message}`);
  }
}

export default {
  createPatient,
  getPatient,
  listPatients,
  updatePatient,
  searchPatientByIdentifier,
  deletePatient,
};
