/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — FHIR Resource Helpers & Builders
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Utilidades para construir recursos FHIR R4 válidos.
 * Incluye builders para Patient, Observation y Encounter,
 * además de un diccionario de códigos LOINC comunes.
 * 
 * Referencia FHIR R4: https://www.hl7.org/fhir/R4/
 * 
 * @module server/services/healthcare/fhir.helpers
 */

// ═══════════════════════════════════════════════════════════════════════════════
// CÓDIGOS LOINC COMUNES PARA OBSERVACIONES CLÍNICAS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Diccionario de códigos LOINC frecuentemente usados en atención primaria.
 * Cada entrada incluye el código, display, unidad UCUM y categoría.
 * 
 * Referencia: https://loinc.org/
 */
export const LOINC_CODES = {
  // ── Signos Vitales ────────────────────────────────────────────────────────
  BLOOD_PRESSURE_SYSTOLIC: {
    code: '8480-6',
    display: 'Presión arterial sistólica',
    unit: 'mmHg',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },
  BLOOD_PRESSURE_DIASTOLIC: {
    code: '8462-4',
    display: 'Presión arterial diastólica',
    unit: 'mmHg',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },
  HEART_RATE: {
    code: '8867-4',
    display: 'Frecuencia cardíaca',
    unit: '/min',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },
  BODY_TEMPERATURE: {
    code: '8310-5',
    display: 'Temperatura corporal',
    unit: 'Cel',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },
  RESPIRATORY_RATE: {
    code: '9279-1',
    display: 'Frecuencia respiratoria',
    unit: '/min',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },
  OXYGEN_SATURATION: {
    code: '2708-6',
    display: 'Saturación de oxígeno en sangre',
    unit: '%',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },
  BODY_WEIGHT: {
    code: '29463-7',
    display: 'Peso corporal',
    unit: 'kg',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },
  BODY_HEIGHT: {
    code: '8302-2',
    display: 'Estatura',
    unit: 'cm',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },
  BMI: {
    code: '39156-5',
    display: 'Índice de masa corporal (IMC)',
    unit: 'kg/m2',
    system: 'http://loinc.org',
    category: 'vital-signs',
  },

  // ── Laboratorio básico ────────────────────────────────────────────────────
  BLOOD_GLUCOSE: {
    code: '2345-7',
    display: 'Glucosa en sangre',
    unit: 'mg/dL',
    system: 'http://loinc.org',
    category: 'laboratory',
  },
  HEMOGLOBIN: {
    code: '718-7',
    display: 'Hemoglobina',
    unit: 'g/dL',
    system: 'http://loinc.org',
    category: 'laboratory',
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// BUILDERS DE RECURSOS FHIR R4
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Construye un recurso Patient FHIR R4 válido.
 * 
 * @param {Object} data — Datos del paciente
 * @param {string} data.firstName       — Nombre(s)
 * @param {string} data.lastName        — Apellido(s)
 * @param {string} data.birthDate       — Fecha de nacimiento (YYYY-MM-DD)
 * @param {string} data.gender          — Género: male | female | other | unknown
 * @param {string} [data.identifier]    — Cédula o documento de identidad
 * @param {string} [data.phone]         — Teléfono de contacto
 * @param {string} [data.email]         — Correo electrónico
 * @param {string} [data.address]       — Dirección completa
 * @param {string} [data.city]          — Ciudad
 * @param {string} [data.state]         — Departamento/Estado
 * @param {string} [data.country]       — País (default: NI para Nicaragua)
 * @param {string} [data.maritalStatus] — Estado civil: S (soltero), M (casado), D (divorciado)
 * @param {string} [data.language]      — Idioma preferido (default: es)
 * 
 * @returns {Object} Recurso Patient FHIR R4
 * 
 * @example
 * const patient = buildPatientResource({
 *   firstName: 'María',
 *   lastName: 'García López',
 *   birthDate: '1990-03-15',
 *   gender: 'female',
 *   identifier: '001-150390-0001X',
 *   phone: '+505-8888-1234',
 * });
 */
export function buildPatientResource(data) {
  const resource = {
    resourceType: 'Patient',

    // ── Nombre del paciente ─────────────────────────────────────────────
    name: [
      {
        use: 'official',
        family: data.lastName,
        given: data.firstName.split(' '), // Soporta nombres compuestos
        text: `${data.firstName} ${data.lastName}`,
      },
    ],

    // ── Género y fecha de nacimiento ────────────────────────────────────
    gender: data.gender || 'unknown',
    birthDate: data.birthDate,

    // ── Estado del recurso ──────────────────────────────────────────────
    active: true,
  };

  // ── Identificador (cédula/documento) ────────────────────────────────────
  if (data.identifier) {
    resource.identifier = [
      {
        use: 'official',
        type: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
              code: 'NI', // National Identifier
              display: 'Cédula de Identidad',
            },
          ],
        },
        system: 'urn:oid:2.16.558.1', // OID ficticio para Nicaragua
        value: data.identifier,
      },
    ];
  }

  // ── Contacto (teléfono, email) ──────────────────────────────────────────
  const telecom = [];
  if (data.phone) {
    telecom.push({
      system: 'phone',
      value: data.phone,
      use: 'mobile',
    });
  }
  if (data.email) {
    telecom.push({
      system: 'email',
      value: data.email,
      use: 'home',
    });
  }
  if (telecom.length > 0) {
    resource.telecom = telecom;
  }

  // ── Dirección ───────────────────────────────────────────────────────────
  if (data.address || data.city || data.state) {
    resource.address = [
      {
        use: 'home',
        type: 'physical',
        text: data.address || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || 'NI', // Nicaragua por defecto
      },
    ];
  }

  // ── Estado civil ────────────────────────────────────────────────────────
  if (data.maritalStatus) {
    const maritalMap = {
      S: { code: 'S', display: 'Never Married' },
      M: { code: 'M', display: 'Married' },
      D: { code: 'D', display: 'Divorced' },
      W: { code: 'W', display: 'Widowed' },
    };
    const status = maritalMap[data.maritalStatus] || maritalMap.S;
    resource.maritalStatus = {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
          code: status.code,
          display: status.display,
        },
      ],
    };
  }

  // ── Idioma preferido ────────────────────────────────────────────────────
  resource.communication = [
    {
      language: {
        coding: [
          {
            system: 'urn:ietf:bcp:47',
            code: data.language || 'es',
            display: data.language === 'en' ? 'English' : 'Español',
          },
        ],
      },
      preferred: true,
    },
  ];

  return resource;
}

/**
 * Construye un recurso Observation FHIR R4 válido.
 * 
 * @param {Object} data — Datos de la observación
 * @param {string} data.patientId       — ID FHIR del paciente
 * @param {Object} data.code            — Código LOINC (usar LOINC_CODES)
 * @param {number} data.value           — Valor numérico de la medición
 * @param {string} [data.status]        — Estado: final | preliminary | amended
 * @param {string} [data.effectiveDate] — Fecha de la observación (ISO 8601)
 * @param {string} [data.note]          — Nota clínica adicional
 * @param {string} [data.encounterId]   — ID del encuentro médico asociado
 * 
 * @returns {Object} Recurso Observation FHIR R4
 * 
 * @example
 * const obs = buildObservationResource({
 *   patientId: 'abc-123',
 *   code: LOINC_CODES.BODY_TEMPERATURE,
 *   value: 37.5,
 *   note: 'Temperatura axilar',
 * });
 */
export function buildObservationResource(data) {
  const resource = {
    resourceType: 'Observation',
    status: data.status || 'final',

    // ── Categoría de la observación ─────────────────────────────────────
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/observation-category',
            code: data.code.category || 'vital-signs',
            display: data.code.category === 'laboratory' ? 'Laboratory' : 'Vital Signs',
          },
        ],
      },
    ],

    // ── Código LOINC ────────────────────────────────────────────────────
    code: {
      coding: [
        {
          system: data.code.system || 'http://loinc.org',
          code: data.code.code,
          display: data.code.display,
        },
      ],
      text: data.code.display,
    },

    // ── Referencia al paciente ──────────────────────────────────────────
    subject: {
      reference: `Patient/${data.patientId}`,
    },

    // ── Fecha efectiva de la observación ────────────────────────────────
    effectiveDateTime: data.effectiveDate || new Date().toISOString(),

    // ── Valor numérico con unidad ───────────────────────────────────────
    valueQuantity: {
      value: data.value,
      unit: data.code.unit,
      system: 'http://unitsofmeasure.org',
      code: data.code.unit,
    },
  };

  // ── Referencia al encuentro médico (opcional) ───────────────────────────
  if (data.encounterId) {
    resource.encounter = {
      reference: `Encounter/${data.encounterId}`,
    };
  }

  // ── Nota clínica (opcional) ─────────────────────────────────────────────
  if (data.note) {
    resource.note = [
      {
        text: data.note,
        time: new Date().toISOString(),
      },
    ];
  }

  return resource;
}

/**
 * Construye un recurso Encounter FHIR R4 válido.
 * Representa una consulta o encuentro médico.
 * 
 * @param {Object} data — Datos del encuentro
 * @param {string} data.patientId         — ID FHIR del paciente
 * @param {string} [data.status]          — Estado: planned | in-progress | finished | cancelled
 * @param {string} [data.class]           — Clase: AMB (ambulatorio) | EMER (emergencia) | IMP (hospitalización)
 * @param {string} [data.type]            — Tipo de consulta
 * @param {string} [data.reason]          — Razón de la consulta
 * @param {string} [data.periodStart]     — Inicio de la consulta (ISO 8601)
 * @param {string} [data.periodEnd]       — Fin de la consulta (ISO 8601)
 * @param {string} [data.practitionerName] — Nombre del médico
 * @param {string} [data.locationName]    — Nombre del centro de salud
 * @param {string} [data.diagnosis]       — Diagnóstico principal
 * @param {string} [data.notes]           — Notas clínicas
 * 
 * @returns {Object} Recurso Encounter FHIR R4
 */
export function buildEncounterResource(data) {
  // Mapeo de clase de encuentro
  const classMap = {
    AMB: { code: 'AMB', display: 'Ambulatorio' },
    EMER: { code: 'EMER', display: 'Emergencia' },
    IMP: { code: 'IMP', display: 'Hospitalización' },
    VR: { code: 'VR', display: 'Virtual' },
  };

  const encounterClass = classMap[data.class] || classMap.AMB;

  const resource = {
    resourceType: 'Encounter',
    status: data.status || 'finished',

    // ── Clase del encuentro ─────────────────────────────────────────────
    class: {
      system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
      code: encounterClass.code,
      display: encounterClass.display,
    },

    // ── Tipo de consulta ────────────────────────────────────────────────
    type: [
      {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '185349003',
            display: data.type || 'Consulta médica general',
          },
        ],
        text: data.type || 'Consulta médica general',
      },
    ],

    // ── Referencia al paciente ──────────────────────────────────────────
    subject: {
      reference: `Patient/${data.patientId}`,
    },

    // ── Período de la consulta ──────────────────────────────────────────
    period: {
      start: data.periodStart || new Date().toISOString(),
      ...(data.periodEnd && { end: data.periodEnd }),
    },
  };

  // ── Razón de la consulta (opcional) ─────────────────────────────────────
  if (data.reason) {
    resource.reasonCode = [
      {
        text: data.reason,
      },
    ];
  }

  // ── Diagnóstico (opcional) ──────────────────────────────────────────────
  if (data.diagnosis) {
    resource.diagnosis = [
      {
        condition: {
          display: data.diagnosis,
        },
        use: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
              code: 'AD',
              display: 'Admission diagnosis',
            },
          ],
        },
      },
    ];
  }

  // ── Médico (opcional) ───────────────────────────────────────────────────
  if (data.practitionerName) {
    resource.participant = [
      {
        type: [
          {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
                code: 'ATND',
                display: 'Attender',
              },
            ],
          },
        ],
        individual: {
          display: data.practitionerName,
        },
      },
    ];
  }

  // ── Ubicación (opcional) ────────────────────────────────────────────────
  if (data.locationName) {
    resource.location = [
      {
        location: {
          display: data.locationName,
        },
      },
    ];
  }

  return resource;
}

// ═══════════════════════════════════════════════════════════════════════════════
// UTILIDADES DE HISTORIAL CLÍNICO
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Genera un resumen de historial clínico a partir de recursos FHIR.
 * Este formato está optimizado para ser inyectado como contexto en Gemini AI.
 * 
 * @param {Object} patient         — Recurso Patient FHIR
 * @param {Array}  observations    — Array de recursos Observation FHIR
 * @param {Array}  encounters      — Array de recursos Encounter FHIR
 * 
 * @returns {Object} Resumen estructurado del historial
 * 
 * @example
 * // Retorna un objeto como:
 * // {
 * //   patient: { name: "María García", age: 35, gender: "female", ... },
 * //   vitalSigns: [{ type: "Temperatura", value: 37.5, unit: "Cel", date: "..." }],
 * //   encounters: [{ date: "...", type: "Consulta general", reason: "Fiebre", ... }],
 * //   summary: "Paciente María García, 35 años, femenino. Última consulta: ..."
 * // }
 */
export function buildMedicalHistorySummary(patient, observations = [], encounters = []) {
  // ── Datos básicos del paciente ──────────────────────────────────────────
  const patientName = patient.name?.[0]?.text || 'Paciente desconocido';
  const birthDate = patient.birthDate;
  const age = birthDate ? calculateAge(birthDate) : null;
  const gender = patient.gender || 'unknown';
  const identifier = patient.identifier?.[0]?.value || 'Sin identificador';

  // ── Signos vitales (últimas observaciones) ──────────────────────────────
  const vitalSigns = observations
    .filter(obs => obs.category?.some(c => c.coding?.some(cc => cc.code === 'vital-signs')))
    .map(obs => ({
      type: obs.code?.text || obs.code?.coding?.[0]?.display || 'Desconocido',
      value: obs.valueQuantity?.value,
      unit: obs.valueQuantity?.unit,
      date: obs.effectiveDateTime,
      status: obs.status,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // ── Resultados de laboratorio ───────────────────────────────────────────
  const labResults = observations
    .filter(obs => obs.category?.some(c => c.coding?.some(cc => cc.code === 'laboratory')))
    .map(obs => ({
      type: obs.code?.text || obs.code?.coding?.[0]?.display || 'Desconocido',
      value: obs.valueQuantity?.value,
      unit: obs.valueQuantity?.unit,
      date: obs.effectiveDateTime,
      status: obs.status,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // ── Historial de consultas ──────────────────────────────────────────────
  const encounterHistory = encounters
    .map(enc => ({
      date: enc.period?.start,
      type: enc.type?.[0]?.text || 'Consulta',
      reason: enc.reasonCode?.[0]?.text || '',
      diagnosis: enc.diagnosis?.[0]?.condition?.display || '',
      status: enc.status,
      class: enc.class?.display || '',
      practitioner: enc.participant?.[0]?.individual?.display || '',
      location: enc.location?.[0]?.location?.display || '',
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // ── Resumen narrativo (para Gemini) ─────────────────────────────────────
  let summaryParts = [];
  summaryParts.push(`Paciente: ${patientName}`);
  if (age) summaryParts.push(`Edad: ${age} años`);
  summaryParts.push(`Género: ${gender === 'female' ? 'Femenino' : gender === 'male' ? 'Masculino' : 'Otro'}`);

  if (vitalSigns.length > 0) {
    const lastVitals = vitalSigns.slice(0, 5).map(v => `${v.type}: ${v.value} ${v.unit}`).join(', ');
    summaryParts.push(`Últimos signos vitales: ${lastVitals}`);
  }

  if (encounterHistory.length > 0) {
    const lastEncounter = encounterHistory[0];
    summaryParts.push(`Última consulta: ${lastEncounter.date} — ${lastEncounter.reason || lastEncounter.type}`);
    if (lastEncounter.diagnosis) {
      summaryParts.push(`Último diagnóstico: ${lastEncounter.diagnosis}`);
    }
  }

  summaryParts.push(`Total consultas registradas: ${encounters.length}`);
  summaryParts.push(`Total observaciones: ${observations.length}`);

  return {
    patient: {
      name: patientName,
      age,
      gender,
      identifier,
      birthDate,
      phone: patient.telecom?.find(t => t.system === 'phone')?.value,
      email: patient.telecom?.find(t => t.system === 'email')?.value,
      address: patient.address?.[0]?.text,
    },
    vitalSigns,
    labResults,
    encounters: encounterHistory,
    summary: summaryParts.join('. ') + '.',
    // Flag para Gemini: este objeto puede ser serializado e inyectado como contexto
    _geminiReady: true,
  };
}

/**
 * Calcula la edad en años a partir de una fecha de nacimiento.
 * @param {string} birthDate — Fecha en formato YYYY-MM-DD
 * @returns {number} Edad en años
 */
function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export default {
  LOINC_CODES,
  buildPatientResource,
  buildObservationResource,
  buildEncounterResource,
  buildMedicalHistorySummary,
};
