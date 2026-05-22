/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — FHIR Observation Service
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Servicio para gestión de observaciones clínicas FHIR R4.
 * Maneja signos vitales, resultados de laboratorio y otras mediciones.
 * 
 * Funciones disponibles:
 *   - createObservation(data)           → Crear observación clínica
 *   - getPatientObservations(patientId) → Obtener observaciones del paciente
 *   - createVitalSigns(patientId, vitals) → Helper para signos vitales comunes
 *   - createLabResult(patientId, lab)   → Helper para resultados de laboratorio
 * 
 * @module server/services/healthcare/observation.service
 */

import { getFhirClient, getFhirStorePath } from './client.js';
import { buildObservationResource, LOINC_CODES } from './fhir.helpers.js';

/**
 * Crea una observación clínica en el FHIR Store.
 * 
 * @param {Object} data — Datos de la observación
 * @param {string} data.patientId       — ID FHIR del paciente
 * @param {Object} data.code            — Código LOINC (de LOINC_CODES)
 * @param {number} data.value           — Valor numérico
 * @param {string} [data.status]        — final | preliminary | amended
 * @param {string} [data.effectiveDate] — Fecha ISO 8601
 * @param {string} [data.note]          — Nota clínica
 * @param {string} [data.encounterId]   — ID del encuentro asociado
 * 
 * @returns {Promise<Object>} Recurso Observation creado
 * 
 * @example
 * const obs = await createObservation({
 *   patientId: 'abc-123',
 *   code: LOINC_CODES.BODY_TEMPERATURE,
 *   value: 37.5,
 *   note: 'Temperatura axilar en consulta de rutina',
 * });
 */
export async function createObservation(data) {
  try {
    const fhir = await getFhirClient();
    const parent = getFhirStorePath();

    // Construir recurso FHIR válido
    const observationResource = buildObservationResource(data);

    console.log(`[Observation Service] 📝 Creando observación: ${data.code.display}`);
    console.log(`  👤 Paciente: ${data.patientId}`);
    console.log(`  📊 Valor: ${data.value} ${data.code.unit}`);

    const response = await fhir.create({
      parent,
      type: 'Observation',
      requestBody: observationResource,
    });

    const created = response.data;
    console.log(`[Observation Service] ✅ Observación creada — ID: ${created.id}`);

    return created;
  } catch (error) {
    console.error('[Observation Service] ❌ Error al crear observación:', error.message);
    throw new Error(`Error al crear observación: ${error.message}`);
  }
}

/**
 * Obtiene todas las observaciones de un paciente.
 * Retorna signos vitales, labs y otras mediciones ordenadas cronológicamente.
 * 
 * @param {string} patientId — ID FHIR del paciente
 * @param {Object} [options] — Opciones de filtrado
 * @param {string} [options.category]  — vital-signs | laboratory
 * @param {string} [options.code]      — Código LOINC específico
 * @param {number} [options._count]    — Límite de resultados
 * 
 * @returns {Promise<Object>} Observaciones del paciente
 */
export async function getPatientObservations(patientId, options = {}) {
  try {
    const fhir = await getFhirClient();
    const parent = getFhirStorePath();

    console.log(`[Observation Service] 🔍 Buscando observaciones del paciente: ${patientId}`);

    const response = await fhir.search({
      parent,
      resourceType: 'Observation',
      requestBody: {
        resourceType: 'Parameters',
      },
    });

    const bundle = response.data;

    // Filtrar por paciente y opciones adicionales
    let observations = (bundle.entry || [])
      .map(entry => entry.resource)
      .filter(obs => obs.subject?.reference === `Patient/${patientId}`);

    // Filtrar por categoría si se especificó
    if (options.category) {
      observations = observations.filter(obs =>
        obs.category?.some(c => c.coding?.some(cc => cc.code === options.category))
      );
    }

    // Filtrar por código LOINC si se especificó
    if (options.code) {
      observations = observations.filter(obs =>
        obs.code?.coding?.some(c => c.code === options.code)
      );
    }

    // Ordenar por fecha (más reciente primero)
    observations.sort((a, b) =>
      new Date(b.effectiveDateTime || 0) - new Date(a.effectiveDateTime || 0)
    );

    // Limitar resultados si se especificó
    if (options._count) {
      observations = observations.slice(0, options._count);
    }

    console.log(`[Observation Service] ✅ ${observations.length} observación(es) encontrada(s)`);

    return {
      total: observations.length,
      observations,
    };
  } catch (error) {
    console.error('[Observation Service] ❌ Error al obtener observaciones:', error.message);
    throw new Error(`Error al obtener observaciones: ${error.message}`);
  }
}

/**
 * Crea múltiples signos vitales de una sola vez para un paciente.
 * Helper de conveniencia para consultas médicas donde se toman
 * varios signos vitales simultáneamente.
 * 
 * @param {string} patientId    — ID FHIR del paciente
 * @param {Object} vitals       — Objeto con los signos vitales
 * @param {number} [vitals.systolicBP]     — Presión sistólica (mmHg)
 * @param {number} [vitals.diastolicBP]    — Presión diastólica (mmHg)
 * @param {number} [vitals.heartRate]      — Frecuencia cardíaca (/min)
 * @param {number} [vitals.temperature]    — Temperatura (°C)
 * @param {number} [vitals.respiratoryRate]— Frecuencia respiratoria (/min)
 * @param {number} [vitals.oxygenSat]      — Saturación de oxígeno (%)
 * @param {number} [vitals.weight]         — Peso (kg)
 * @param {number} [vitals.height]         — Estatura (cm)
 * @param {string} [encounterId]           — ID del encuentro asociado
 * 
 * @returns {Promise<Array>} Array de observaciones creadas
 * 
 * @example
 * const vitals = await createVitalSigns('patient-123', {
 *   systolicBP: 120,
 *   diastolicBP: 80,
 *   heartRate: 72,
 *   temperature: 36.8,
 *   weight: 68.5,
 * });
 */
export async function createVitalSigns(patientId, vitals, encounterId = null) {
  const vitalMap = {
    systolicBP:     LOINC_CODES.BLOOD_PRESSURE_SYSTOLIC,
    diastolicBP:    LOINC_CODES.BLOOD_PRESSURE_DIASTOLIC,
    heartRate:      LOINC_CODES.HEART_RATE,
    temperature:    LOINC_CODES.BODY_TEMPERATURE,
    respiratoryRate: LOINC_CODES.RESPIRATORY_RATE,
    oxygenSat:      LOINC_CODES.OXYGEN_SATURATION,
    weight:         LOINC_CODES.BODY_WEIGHT,
    height:         LOINC_CODES.BODY_HEIGHT,
  };

  const results = [];
  const now = new Date().toISOString();

  console.log(`[Observation Service] 📊 Creando signos vitales para paciente: ${patientId}`);

  for (const [key, value] of Object.entries(vitals)) {
    if (value == null || !vitalMap[key]) continue;

    try {
      const observation = await createObservation({
        patientId,
        code: vitalMap[key],
        value,
        effectiveDate: now,
        encounterId,
        note: `Registro automático de ${vitalMap[key].display}`,
      });
      results.push(observation);
    } catch (error) {
      console.warn(`[Observation Service] ⚠️  Error creando ${key}:`, error.message);
      // Continuar con los demás signos vitales
    }
  }

  console.log(`[Observation Service] ✅ ${results.length}/${Object.keys(vitals).length} signos vitales registrados`);
  return results;
}

/**
 * Crea un resultado de laboratorio como observación FHIR.
 * 
 * @param {string} patientId — ID FHIR del paciente
 * @param {Object} lab       — Datos del resultado de laboratorio
 * @param {string} lab.type  — Tipo de prueba (key de LOINC_CODES: BLOOD_GLUCOSE, HEMOGLOBIN)
 * @param {number} lab.value — Valor del resultado
 * @param {string} [lab.note] — Nota del laboratorio
 * @param {string} [lab.encounterId] — Encuentro asociado
 * 
 * @returns {Promise<Object>} Observación creada
 */
export async function createLabResult(patientId, lab) {
  const labCode = LOINC_CODES[lab.type];
  if (!labCode) {
    throw new Error(`Tipo de laboratorio desconocido: ${lab.type}. Tipos válidos: ${Object.keys(LOINC_CODES).filter(k => LOINC_CODES[k].category === 'laboratory').join(', ')}`);
  }

  return createObservation({
    patientId,
    code: labCode,
    value: lab.value,
    note: lab.note || `Resultado de ${labCode.display}`,
    encounterId: lab.encounterId,
  });
}

// Re-exportar LOINC_CODES para conveniencia
export { LOINC_CODES };

export default {
  createObservation,
  getPatientObservations,
  createVitalSigns,
  createLabResult,
  LOINC_CODES,
};
