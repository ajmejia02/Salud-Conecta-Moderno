/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — FHIR Encounter Service
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Servicio para gestión de encuentros médicos (consultas) FHIR R4.
 * Representa las visitas del paciente a centros de salud.
 * 
 * Funciones disponibles:
 *   - createEncounter(data)               → Crear encuentro médico
 *   - getEncounter(encounterId)           → Obtener encuentro por ID
 *   - getPatientEncounters(patientId)     → Historial de consultas del paciente
 *   - completeEncounter(encounterId)      → Finalizar consulta en curso
 *   - createFullConsultation(data)        → Crear consulta con signos vitales
 * 
 * @module server/services/healthcare/encounter.service
 */

import { getFhirClient, getFhirStorePath } from './client.js';
import { buildEncounterResource } from './fhir.helpers.js';
import { createVitalSigns } from './observation.service.js';

/**
 * Crea un nuevo encuentro médico en el FHIR Store.
 * 
 * @param {Object} data — Datos del encuentro
 * @param {string} data.patientId          — ID FHIR del paciente
 * @param {string} [data.status]           — planned | in-progress | finished | cancelled
 * @param {string} [data.class]            — AMB | EMER | IMP | VR
 * @param {string} [data.type]             — Tipo de consulta
 * @param {string} [data.reason]           — Razón de la visita
 * @param {string} [data.practitionerName] — Nombre del médico
 * @param {string} [data.locationName]     — Centro de salud
 * @param {string} [data.diagnosis]        — Diagnóstico
 * @param {string} [data.periodStart]      — Inicio (ISO 8601)
 * @param {string} [data.periodEnd]        — Fin (ISO 8601)
 * 
 * @returns {Promise<Object>} Recurso Encounter creado
 * 
 * @example
 * const encounter = await createEncounter({
 *   patientId: 'abc-123',
 *   class: 'AMB',
 *   reason: 'Dolor de cabeza persistente por 3 días',
 *   practitionerName: 'Dr. Roberto Flores',
 *   locationName: 'Centro de Salud Granada',
 *   diagnosis: 'Cefalea tensional',
 * });
 */
export async function createEncounter(data) {
  try {
    const fhir = await getFhirClient();
    const parent = getFhirStorePath();

    // Construir recurso FHIR válido
    const encounterResource = buildEncounterResource(data);

    console.log(`[Encounter Service] 📝 Creando encuentro médico...`);
    console.log(`  👤 Paciente: ${data.patientId}`);
    console.log(`  🏥 Tipo: ${data.class || 'AMB'} — ${data.type || 'Consulta general'}`);
    if (data.reason) console.log(`  📋 Razón: ${data.reason}`);

    const response = await fhir.create({
      parent,
      type: 'Encounter',
      requestBody: encounterResource,
    });

    const created = response.data;
    console.log(`[Encounter Service] ✅ Encuentro creado — ID: ${created.id}`);

    return created;
  } catch (error) {
    console.error('[Encounter Service] ❌ Error al crear encuentro:', error.message);
    throw new Error(`Error al crear encuentro médico: ${error.message}`);
  }
}

/**
 * Obtiene un encuentro médico por su ID.
 * 
 * @param {string} encounterId — ID FHIR del encuentro
 * @returns {Promise<Object>} Recurso Encounter
 */
export async function getEncounter(encounterId) {
  try {
    const fhir = await getFhirClient();
    const name = `${getFhirStorePath()}/fhir/Encounter/${encounterId}`;

    console.log(`[Encounter Service] 🔍 Buscando encuentro: ${encounterId}`);

    const response = await fhir.read({ name });
    const encounter = response.data;

    console.log(`[Encounter Service] ✅ Encuentro encontrado — Estado: ${encounter.status}`);
    return encounter;
  } catch (error) {
    if (error.code === 404) {
      throw new Error(`Encuentro no encontrado: ${encounterId}`);
    }
    console.error('[Encounter Service] ❌ Error al obtener encuentro:', error.message);
    throw new Error(`Error al obtener encuentro: ${error.message}`);
  }
}

/**
 * Obtiene todos los encuentros médicos de un paciente.
 * Retorna el historial de consultas ordenado cronológicamente.
 * 
 * @param {string} patientId — ID FHIR del paciente
 * @param {Object} [options] — Opciones de filtrado
 * @param {string} [options.status]  — Filtrar por estado
 * @param {string} [options.class]   — Filtrar por clase (AMB, EMER, etc.)
 * @param {number} [options._count]  — Límite de resultados
 * 
 * @returns {Promise<Object>} Historial de encuentros del paciente
 */
export async function getPatientEncounters(patientId, options = {}) {
  try {
    const fhir = await getFhirClient();
    const parent = getFhirStorePath();

    console.log(`[Encounter Service] 🔍 Buscando encuentros del paciente: ${patientId}`);

    const response = await fhir.search({
      parent,
      resourceType: 'Encounter',
      requestBody: {
        resourceType: 'Parameters',
      },
    });

    const bundle = response.data;

    // Filtrar por paciente
    let encounters = (bundle.entry || [])
      .map(entry => entry.resource)
      .filter(enc => enc.subject?.reference === `Patient/${patientId}`);

    // Filtrar por estado
    if (options.status) {
      encounters = encounters.filter(enc => enc.status === options.status);
    }

    // Filtrar por clase
    if (options.class) {
      encounters = encounters.filter(enc => enc.class?.code === options.class);
    }

    // Ordenar por fecha (más reciente primero)
    encounters.sort((a, b) =>
      new Date(b.period?.start || 0) - new Date(a.period?.start || 0)
    );

    // Limitar resultados
    if (options._count) {
      encounters = encounters.slice(0, options._count);
    }

    console.log(`[Encounter Service] ✅ ${encounters.length} encuentro(s) encontrado(s)`);

    return {
      total: encounters.length,
      encounters,
    };
  } catch (error) {
    console.error('[Encounter Service] ❌ Error al obtener encuentros:', error.message);
    throw new Error(`Error al obtener encuentros: ${error.message}`);
  }
}

/**
 * Marca un encuentro como finalizado.
 * Actualiza el status a 'finished' y establece el período de fin.
 * 
 * @param {string} encounterId — ID FHIR del encuentro
 * @returns {Promise<Object>} Encuentro actualizado
 */
export async function completeEncounter(encounterId) {
  try {
    const fhir = await getFhirClient();
    const name = `${getFhirStorePath()}/fhir/Encounter/${encounterId}`;

    // Obtener el encuentro actual
    const currentResponse = await fhir.read({ name });
    const encounter = currentResponse.data;

    // Actualizar estado y período
    encounter.status = 'finished';
    if (encounter.period) {
      encounter.period.end = new Date().toISOString();
    }

    console.log(`[Encounter Service] ✏️  Finalizando encuentro: ${encounterId}`);

    const response = await fhir.update({
      name,
      requestBody: encounter,
    });

    console.log(`[Encounter Service] ✅ Encuentro finalizado: ${encounterId}`);
    return response.data;
  } catch (error) {
    console.error('[Encounter Service] ❌ Error al finalizar encuentro:', error.message);
    throw new Error(`Error al finalizar encuentro: ${error.message}`);
  }
}

/**
 * Crea una consulta médica completa: encuentro + signos vitales.
 * Este es el helper principal para registrar una visita al doctor
 * con toda la información clínica de una sola vez.
 * 
 * @param {Object} data — Datos completos de la consulta
 * @param {string} data.patientId          — ID del paciente
 * @param {string} data.reason             — Razón de la consulta
 * @param {string} [data.practitionerName] — Nombre del médico
 * @param {string} [data.locationName]     — Centro de salud
 * @param {string} [data.diagnosis]        — Diagnóstico
 * @param {string} [data.class]            — AMB | EMER | IMP
 * @param {Object} [data.vitals]           — Signos vitales (ver createVitalSigns)
 * @param {string} [data.notes]            — Notas clínicas adicionales
 * 
 * @returns {Promise<Object>} Resultado con encuentro y observaciones creadas
 * 
 * @example
 * const consultation = await createFullConsultation({
 *   patientId: 'abc-123',
 *   reason: 'Control de embarazo',
 *   practitionerName: 'Dra. Ana Martínez',
 *   locationName: 'Hospital Regional de Granada',
 *   diagnosis: 'Embarazo normal, 20 semanas',
 *   vitals: {
 *     systolicBP: 110,
 *     diastolicBP: 70,
 *     heartRate: 78,
 *     temperature: 36.6,
 *     weight: 65.0,
 *   },
 * });
 */
export async function createFullConsultation(data) {
  console.log(`[Encounter Service] 🏥 Creando consulta completa para paciente: ${data.patientId}`);

  try {
    // 1. Crear el encuentro médico
    const encounter = await createEncounter({
      patientId: data.patientId,
      status: data.vitals ? 'in-progress' : 'finished',
      class: data.class || 'AMB',
      type: data.type || 'Consulta médica general',
      reason: data.reason,
      practitionerName: data.practitionerName,
      locationName: data.locationName,
      diagnosis: data.diagnosis,
    });

    let vitalSignsResults = [];

    // 2. Si hay signos vitales, crearlos asociados al encuentro
    if (data.vitals && Object.keys(data.vitals).length > 0) {
      vitalSignsResults = await createVitalSigns(
        data.patientId,
        data.vitals,
        encounter.id
      );

      // 3. Finalizar el encuentro después de registrar signos vitales
      await completeEncounter(encounter.id);
    }

    console.log(`[Encounter Service] ✅ Consulta completa creada exitosamente`);
    console.log(`  📋 Encuentro: ${encounter.id}`);
    console.log(`  📊 Signos vitales: ${vitalSignsResults.length} registrados`);

    return {
      encounter,
      vitalSigns: vitalSignsResults,
      summary: {
        encounterId: encounter.id,
        patientId: data.patientId,
        reason: data.reason,
        diagnosis: data.diagnosis,
        practitioner: data.practitionerName,
        location: data.locationName,
        vitalSignsCount: vitalSignsResults.length,
        status: 'finished',
      },
    };
  } catch (error) {
    console.error('[Encounter Service] ❌ Error en consulta completa:', error.message);
    throw new Error(`Error al crear consulta completa: ${error.message}`);
  }
}

export default {
  createEncounter,
  getEncounter,
  getPatientEncounters,
  completeEncounter,
  createFullConsultation,
};
