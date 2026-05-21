/**
 * triageDisclaimers.ts
 * 
 * Textos de disclaimer legal y accesibilidad para triaje médico.
 * IMPORTANTE: No reemplaza consulta profesional.
 */

export const TRIAGE_DISCLAIMERS = {
  MEDICAL_ADVICE: {
    es: '⚠️ IMPORTANTE: Este análisis NO reemplaza la consulta con un profesional médico. Consulte con un doctor para diagnóstico definitivo.',
    en: '⚠️ IMPORTANT: This analysis does NOT replace medical professional consultation. Consult a doctor for definitive diagnosis.',
  },
  
  EMERGENCY: {
    es: '🚨 EN CASO DE EMERGENCIA: Llame al 911 o acuda a la sala de emergencias más cercana inmediatamente.',
    en: '🚨 IN CASE OF EMERGENCY: Call 911 or go to the nearest emergency room immediately.',
  },
  
  DATA_USAGE: {
    es: 'Su información de salud será procesada de forma segura según HIPAA y regulaciones locales.',
    en: 'Your health information will be processed securely according to HIPAA and local regulations.',
  },
  
  ACCURACY_NOTICE: {
    es: 'Este sistema utiliza inteligencia artificial. Resultados pueden variar. Consulte siempre con profesionales médicos.',
    en: 'This system uses artificial intelligence. Results may vary. Always consult with medical professionals.',
  },
} as const;

export const ACCESSIBILITY_LABELS = {
  TRIAGE_FORM: {
    es: 'Formulario de triaje médico. Ingrese sus síntomas para obtener una evaluación inicial.',
    en: 'Medical triage form. Enter your symptoms for initial assessment.',
  },
  
  SEVERITY_BADGE: {
    es: 'Nivel de severidad: {severity}',
    en: 'Severity level: {severity}',
  },
  
  MEDICATION_INFO: {
    es: 'Medicamento recomendado: {name}. Dosis: {dosage}. Frecuencia: {frequency}',
    en: 'Recommended medication: {name}. Dosage: {dosage}. Frequency: {frequency}',
  },
  
  LOCATION_INFO: {
    es: 'Centro de salud más cercano: {facility}. Distancia: {distance} km. Tiempo estimado: {time}',
    en: 'Nearest health center: {facility}. Distance: {distance} km. Estimated time: {time}',
  },
  
  LOADING_STATE: {
    es: 'Analizando síntomas. Por favor espere...',
    en: 'Analyzing symptoms. Please wait...',
  },
  
  OFFLINE_STATE: {
    es: 'Sin conexión de internet. Los datos se sincronizarán cuando haya conexión.',
    en: 'No internet connection. Data will sync when connection is restored.',
  },
} as const;

/**
 * Obtener disclaimer apropiado por idioma
 */
export function getDisclaimer(type: keyof typeof TRIAGE_DISCLAIMERS, language: 'es' | 'en'): string {
  return TRIAGE_DISCLAIMERS[type][language] || TRIAGE_DISCLAIMERS[type].es;
}

/**
 * Obtener etiqueta de accesibilidad
 */
export function getAccessibilityLabel(
  type: keyof typeof ACCESSIBILITY_LABELS,
  language: 'es' | 'en',
  placeholders?: Record<string, string>
): string {
  let text = ACCESSIBILITY_LABELS[type][language] || ACCESSIBILITY_LABELS[type].es;
  
  if (placeholders) {
    for (const [key, value] of Object.entries(placeholders)) {
      text = text.replace(`{${key}}`, value);
    }
  }
  
  return text;
}

/**
 * Generar ARIA label completo para resultado de triaje
 */
export function generateTriageAriaLabel(
  severity: string,
  recommendation: string,
  medication: string | undefined,
  language: 'es' | 'en'
): string {
  const parts: string[] = [];
  
  // Severidad
  parts.push(
    language === 'es'
      ? `Evaluación: ${severity}`
      : `Assessment: ${severity}`
  );
  
  // Recomendación
  parts.push(recommendation);
  
  // Medicamento si existe
  if (medication) {
    parts.push(
      language === 'es'
        ? `Medicamento: ${medication}`
        : `Medication: ${medication}`
    );
  }
  
  // Disclaimer legal
  parts.push(getDisclaimer('MEDICAL_ADVICE', language));
  
  return parts.join('. ');
}

/**
 * Generar descripciones por severidad
 */
export const SEVERITY_DESCRIPTIONS = {
  emergency: {
    es: 'Emergencia médica - Requiere atención inmediata',
    en: 'Medical emergency - Requires immediate attention',
  },
  high: {
    es: 'Severidad alta - Consulte médico urgentemente',
    en: 'High severity - Consult doctor urgently',
  },
  moderate: {
    es: 'Severidad moderada - Visite centro de salud pronto',
    en: 'Moderate severity - Visit health center soon',
  },
  low: {
    es: 'Severidad baja - Observe síntomas, consulte si persisten',
    en: 'Low severity - Monitor symptoms, consult if they persist',
  },
} as const;

export function getSeverityDescription(severity: string, language: 'es' | 'en'): string {
  const desc = SEVERITY_DESCRIPTIONS[severity as keyof typeof SEVERITY_DESCRIPTIONS];
  if (!desc) return SEVERITY_DESCRIPTIONS.moderate[language];
  return desc[language];
}
