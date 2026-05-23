/**
 * triageValidator.ts
 * Validadores estrictos para el sistema de triaje médico.
 * Asegura integridad de datos antes de procesarlos.
 */

// Constantes de validación
export const TRIAGE_VALIDATION = {
  SYMPTOM_MIN_LENGTH: 3,
  SYMPTOM_MAX_LENGTH: 500,
  ALLOWED_URGENCY_LEVELS: ['low', 'medium', 'high', 'emergency'] as const,
  ALLOWED_SEVERITIES: ['low', 'medium', 'high', 'emergency'] as const,
};

// Interfaces tipadas para respuesta Gemini
export interface GeminiTriageResponse {
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  recommendation: string;
  reasoning: string;
  medication?: GeminiMedication;
  error?: boolean;
}

export interface GeminiMedication {
  name: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
}

export interface TriageValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * Validar síntomas de entrada
 * @throws {TriageValidationError}
 */
export function validateSymptoms(symptoms: string): { isValid: boolean; errors: TriageValidationError[] } {
  const errors: TriageValidationError[] = [];

  // Validación: vacío
  if (!symptoms || symptoms.trim().length === 0) {
    errors.push({
      field: 'symptoms',
      message: 'Los síntomas no pueden estar vacíos',
      code: 'EMPTY_SYMPTOMS',
    });
  }

  // Validación: muy corto
  if (symptoms.length < TRIAGE_VALIDATION.SYMPTOM_MIN_LENGTH) {
    errors.push({
      field: 'symptoms',
      message: `Los síntomas deben tener al menos ${TRIAGE_VALIDATION.SYMPTOM_MIN_LENGTH} caracteres`,
      code: 'TOO_SHORT',
    });
  }

  // Validación: muy largo
  if (symptoms.length > TRIAGE_VALIDATION.SYMPTOM_MAX_LENGTH) {
    errors.push({
      field: 'symptoms',
      message: `Los síntomas no pueden exceder ${TRIAGE_VALIDATION.SYMPTOM_MAX_LENGTH} caracteres`,
      code: 'TOO_LONG',
    });
  }

  // Validación: spam (solo números o caracteres especiales repetidos)
  const spamPattern = /^(.)\1{10,}$/; // Más de 10 caracteres idénticos
  if (spamPattern.test(symptoms.replace(/\s/g, ''))) {
    errors.push({
      field: 'symptoms',
      message: 'La entrada parece ser spam. Por favor describe síntomas reales',
      code: 'SPAM_DETECTED',
    });
  }

  // Validación: caracteres válidos (alfabeto + números + espacios + puntuación)
  const validCharsPattern = /^[a-zA-Z0-9\s\.,;:¿?¡!áéíóúñÁÉÍÓÚÑ\-()]+$/;
  if (!validCharsPattern.test(symptoms)) {
    errors.push({
      field: 'symptoms',
      message: 'Caracteres inválidos detectados. Por favor usa solo texto normal',
      code: 'INVALID_CHARS',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validar respuesta JSON de Gemini contra esquema esperado
 */
export function validateGeminiResponse(data: any): { isValid: boolean; data?: GeminiTriageResponse; errors: TriageValidationError[] } {
  const errors: TriageValidationError[] = [];

  // Validación: es objeto
  if (!data || typeof data !== 'object') {
    errors.push({
      field: 'response',
      message: 'La respuesta debe ser un objeto JSON válido',
      code: 'INVALID_JSON',
    });
    return { isValid: false, errors };
  }

  // Validación: urgency/severity
  if (!data.urgency || !TRIAGE_VALIDATION.ALLOWED_URGENCY_LEVELS.includes(data.urgency)) {
    errors.push({
      field: 'urgency',
      message: `Urgency debe ser uno de: ${TRIAGE_VALIDATION.ALLOWED_URGENCY_LEVELS.join(', ')}`,
      code: 'INVALID_URGENCY',
    });
  }

  // Validación: recommendation es string no vacío
  if (!data.recommendation || typeof data.recommendation !== 'string' || data.recommendation.trim().length === 0) {
    errors.push({
      field: 'recommendation',
      message: 'La recomendación debe ser texto no vacío',
      code: 'EMPTY_RECOMMENDATION',
    });
  }

  // Validación: reasoning es string no vacío
  if (!data.reasoning || typeof data.reasoning !== 'string' || data.reasoning.trim().length === 0) {
    errors.push({
      field: 'reasoning',
      message: 'El razonamiento debe ser texto no vacío',
      code: 'EMPTY_REASONING',
    });
  }

  // Validación: medication (opcional pero si existe debe ser válido)
  if (data.medication) {
    if (typeof data.medication !== 'object') {
      errors.push({
        field: 'medication',
        message: 'La medicación debe ser un objeto',
        code: 'INVALID_MEDICATION_TYPE',
      });
    } else if (!data.medication.name || typeof data.medication.name !== 'string') {
      errors.push({
        field: 'medication.name',
        message: 'El nombre del medicamento es requerido',
        code: 'MISSING_MEDICATION_NAME',
      });
    }
  }

  // Validación: error field (opcional, boolean)
  if (data.error && typeof data.error !== 'boolean') {
    errors.push({
      field: 'error',
      message: 'El campo error debe ser booleano',
      code: 'INVALID_ERROR_TYPE',
    });
  }

  if (errors.length === 0) {
    return {
      isValid: true,
      data: {
        urgency: data.urgency,
        recommendation: data.recommendation.trim(),
        reasoning: data.reasoning.trim(),
        medication: data.medication,
        error: data.error ?? false,
      },
      errors: [],
    };
  }

  return { isValid: false, errors };
}

/**
 * Validar medicación específica
 */
export function validateMedication(med: any): { isValid: boolean; errors: TriageValidationError[] } {
  const errors: TriageValidationError[] = [];

  if (!med) {
    return { isValid: true, errors };
  }

  // Validación: name es requerido
  if (!med.name || typeof med.name !== 'string') {
    errors.push({
      field: 'medication.name',
      message: 'Nombre del medicamento inválido',
      code: 'INVALID_MED_NAME',
    });
  }

  // Validación: dosage, frequency, duration son strings opcionales
  if (med.dosage && typeof med.dosage !== 'string') {
    errors.push({
      field: 'medication.dosage',
      message: 'Dosis debe ser texto',
      code: 'INVALID_DOSAGE_TYPE',
    });
  }

  if (med.frequency && typeof med.frequency !== 'string') {
    errors.push({
      field: 'medication.frequency',
      message: 'Frecuencia debe ser texto',
      code: 'INVALID_FREQUENCY_TYPE',
    });
  }

  if (med.duration && typeof med.duration !== 'string') {
    errors.push({
      field: 'medication.duration',
      message: 'Duración debe ser texto',
      code: 'INVALID_DURATION_TYPE',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitizar texto de síntomas (remover espacios extras, normalizar)
 */
export function sanitizeSymptoms(symptoms: string): string {
  return symptoms
    .trim() // Remover espacios al inicio/final
    .replace(/\s+/g, ' ') // Normalizar espacios múltiples a uno
    .substring(0, TRIAGE_VALIDATION.SYMPTOM_MAX_LENGTH); // Truncar si necesario
}

/**
 * Log de validación para debugging
 */
export function logValidationError(error: TriageValidationError, context: string = ''): void {
  const contextStr = context ? ` [${context}]` : '';
  console.warn(`⚠️ TRIAGE VALIDATION ERROR${contextStr}:`, {
    field: error.field,
    code: error.code,
    message: error.message,
  });
}

/**
 * Validar todo junto (síntomas + respuesta Gemini)
 */
export function validateTriageFlow(
  inputSymptoms: string,
  geminiResponse: any
): { isValid: boolean; errors: TriageValidationError[]; cleanSymptoms?: string; cleanResponse?: GeminiTriageResponse } {
  const allErrors: TriageValidationError[] = [];

  // 1. Validar síntomas de entrada
  const symptomsValidation = validateSymptoms(inputSymptoms);
  if (!symptomsValidation.isValid) {
    allErrors.push(...symptomsValidation.errors);
  }

  // 2. Validar respuesta Gemini
  const responseValidation = validateGeminiResponse(geminiResponse);
  if (!responseValidation.isValid) {
    allErrors.push(...responseValidation.errors);
  }

  if (allErrors.length === 0) {
    return {
      isValid: true,
      errors: [],
      cleanSymptoms: sanitizeSymptoms(inputSymptoms),
      cleanResponse: responseValidation.data,
    };
  }

  return {
    isValid: false,
    errors: allErrors,
  };
}
