import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY, isGeminiAvailable } from "./config";
import {
  validateSymptoms,
  validateGeminiResponse,
  sanitizeSymptoms,
  type GeminiTriageResponse,
  logValidationError,
} from "./triageValidator";
import {
  getTriageErrorHandler,
  TriageErrorType,
  type TriageError,
} from "./triageErrorHandler";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const isInvalidKey = !GEMINI_API_KEY || ["undefined", "MISSING", ""].includes(GEMINI_API_KEY.trim());
    if (isInvalidKey) {
      console.warn("[AI Configuration] GEMINI_API_KEY is missing or invalid. AI features disabled.");
      return null;
    }
    try {
      aiInstance = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    } catch (error) {
      console.error("[AI Configuration] Failed to initialize Gemini:", error);
      return null;
    }
  }
  return aiInstance;
};

export const MODEL = "gemini-2.0-flash";

const getServerTriage = async (
  symptoms: string,
  membership: 'free' | 'premium'
): Promise<GeminiTriageResponse | null> => {
  if (typeof fetch === 'undefined') {
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch('/api/triage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms, membership }),
      signal: controller.signal,
    });

    if (response.status === 404 || response.status === 405) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Server triage failed with status ${response.status}`);
    }

    const data = await response.json();
    const validation = validateGeminiResponse(data);
    if (!validation.isValid) {
      logValidationError(validation.errors[0], 'getServerTriage');
      return null;
    }

    return validation.data!;
  } catch (error) {
    console.warn('[TRIAGE] Server Gemini endpoint unavailable, trying client fallback:', error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
};

// Export a function to check if Gemini is available
export const isAIServiceAvailable = (): boolean => {
  return isGeminiAvailable && getAI() !== null;
};

// Función para obtener consejo diario de salud
export const getDailyHealthTip = async (language: string = 'es', membership: 'free' | 'premium' = 'free') => {
  try {
    // If Gemini is not available, return a safe fallback
    if (!isGeminiAvailable) {
      console.warn("[Daily Tip] Gemini API not configured. Using fallback tip.");
      return "💡 Servicio de IA no disponible. Consulta con tu centro de salud.";
    }

    const ai = getAI();
    if (!ai) {
      console.warn("[Daily Tip] Could not initialize Gemini. Using fallback tip.");
      return "💡 Consulta regular a tu centro de salud local.";
    }

    const context = membership === 'free'
      ? 'Recuerda que la Red Pública (MINSA) en Nicaragua ofrece servicios de salud gratuitos.'
      : 'Como usuario Premium tienes acceso prioritario a centros de salud. ¿Recordas revisar tus citas pendientes?';

    const result = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction: "Respuestas breves de máximo 30 caracteres, inicia con 💡 " },
      contents: [{ role: 'user', parts: [{ text: `Consejo de salud breve. ${context}` }] }],
    });

    return (result.text ?? "").substring(0, 30);
  } catch (error: any) {
    console.error("[Daily Tip Error]", error?.message || error);
    if (error?.status === 429 || String(error).includes('429')) {
      console.warn("Gemini Quota Exceeded (Daily Tip) - Using fallback.");
    }
    return "¡Bebe agua y mantente activo! 💪";
  }
};

// Función de asistente general de salud
export const getHealthAssistant = async (message: string, membership: 'free' | 'premium' = 'free', history: Array<{role: 'model' | 'user'; parts: Array<{text: string}>}>): Promise<string> => {
  try {
    // If Gemini is not available, return a helpful message
    if (!isGeminiAvailable) {
      console.warn("[Health Assistant] Gemini API not configured. Service unavailable.");
      const fallbackMessage = membership === 'free'
        ? "El servicio de asistente de IA no está disponible en este momento. Por favor, contacta a tu centro de salud local MINSA para recibir atención personalizada."
        : "El servicio de asistente de IA no está disponible en este momento. Por favor, contacta al soporte técnico o usa el sistema de citas para comunicarte con un profesional.";
      return fallbackMessage;
    }

    const ai = getAI();
    if (!ai) {
      console.warn("[Health Assistant] Could not initialize Gemini. Service unavailable.");
      return "El asistente de IA no está disponible. Por favor, intenta de nuevo más tarde o contacta a soporte.";
    }

    const membershipContext = membership === 'free'
      ? 'Eres un asistente de salud para usuarios de la Red Pública de Nicaragua (MINSA). Sé empático y enfócate en consejos preventivos y remisión a servicios gratuitos.'
      : 'Eres un asistente salud premium. Proporciona información detallada sobre servicios y prevención. NO ofrecemos preguntas de emergencia.';

    const prompt = `Respóndeme sobre salud y consejos preventivos (${membership === 'free' ? '50' : '100'} caracteres). Sé profesional. ${membership === 'free' ? 'SI EMERGENCIA, DI: Acude a urgencias ahora.' : 'Usa citas preventivas únicamente.'}; ${message}`;

    const result = await ai.models.generateContent({ model: MODEL, contents: [{ role: 'user', parts: [{ text: prompt }] }] });
    return (result.text ?? "").substring(0, 200);
  } catch (error: any) {
    console.error("[Health Assistant Error]", error?.message || error);
    if (error?.status === 429 || String(error).includes('429')) {
      console.warn("Gemini Quota Exceeded (Assistant) - Using fallback.");
    } else {
      console.error("Health assistant error:", error);
    }
    return membership === 'free' ? 'Acude a tu centro de salud local MINSA para atención inmediata.' : 'Escríbelo en el chat de citas para cuadrar tu próxima visita.';
  }
};

// Sistema de triaje
export const getSmartTriage = async (symptoms: string, membership: 'free' | 'premium' = 'free'): Promise<GeminiTriageResponse> => {
  const errorHandler = getTriageErrorHandler();

  try {
    // ===== FASE 1: Input Validation =====
    const sanitized = sanitizeSymptoms(symptoms);
    const symptomsValidation = validateSymptoms(sanitized);
    
    if (!symptomsValidation.isValid) {
      const validationError = symptomsValidation.errors[0];
      const error = errorHandler.classifyError(
        new Error(validationError.message),
        TriageErrorType.INVALID_INPUT,
        { phase: 'input_validation', symptoms: sanitized }
      );
      
      return {
        urgency: 'medium',
        recommendation: errorHandler.getUserFriendlyMessage(error),
        reasoning: `Validación de entrada: ${validationError.code}`,
        error: true,
      };
    }

    const serverTriage = await getServerTriage(sanitized, membership);
    if (serverTriage) {
      return serverTriage;
    }

    const ai = getAI();
    if (!ai) {
      const error = errorHandler.classifyError(
        new Error('Gemini API not initialized'),
        TriageErrorType.GEMINI_CONFIG_ERROR,
        { phase: 'initialization' }
      );
      
      return {
        urgency: 'medium',
        recommendation: errorHandler.getUserFriendlyMessage(error),
        reasoning: 'Configuración de IA no disponible',
        error: true,
      };
    }

    const membershipContext = membership === 'free'
      ? 'CONTEXTO SOCIAL: Prioriza siempre la Red Pública (MINSA).'
      : 'CONTEXTO PREMIUM: Acceso a servicios privados y públicos.';

    const systemInstruction = `Motor de triaje médico para Nicaragua. Respóndeme ÚNICAMENTE JSON con este esquema exacto:
{
  "urgency": "low" | "medium" | "high" | "emergency",
  "recommendation": "Acción a tomar (texto claro en español)",
  "reasoning": "Justificación breve (1-2 líneas)"
}
${membershipContext}

REGLAS CRÍTICAS:
1. SIEMPRE responde JSON válido
2. El urgency DEBE ser uno de los 4 valores listados
3. recommendation y reasoning DEBEN ser strings no vacíos
4. Si hay medicamento sugerir, incluir objeto "medication": { "name": "...", "dosage": "...", "frequency": "..." }
5. Para emergencias (ej: pecho, respiración, inconsciente) urgency="emergency"`;

    const result = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction, responseMimeType: "application/json" },
      contents: [{ role: 'user', parts: [{ text: sanitized }] }],
    });

    const text = result.text ?? "";
    
    // ===== FASE 1: Schema Validation =====
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      const error = errorHandler.classifyError(
        parseError instanceof Error ? parseError : new Error(String(parseError)),
        TriageErrorType.INVALID_SCHEMA,
        { phase: 'json_parsing', symptoms: sanitized }
      );
      
      console.error(`[TRIAGE] ${error.message}. Raw response (first 200 chars):`, text.substring(0, 200));

      return {
        urgency: 'medium',
        recommendation: errorHandler.getUserFriendlyMessage(error),
        reasoning: 'Respuesta de IA inválida',
        error: true,
      };
    }

    // Validar contra esquema esperado
    const validation = validateGeminiResponse(parsed);
    if (!validation.isValid) {
      const validationError = validation.errors[0];
      const error = errorHandler.classifyError(
        new Error(validationError.message),
        TriageErrorType.INVALID_SCHEMA,
        { phase: 'schema_validation', symptoms: sanitized }
      );
      
      logValidationError(validationError, 'getSmartTriage');

      return {
        urgency: 'medium',
        recommendation: errorHandler.getUserFriendlyMessage(error),
        reasoning: `Esquema inválido: ${validationError.code}`,
        error: true,
      };
    }

    return validation.data!;
  } catch (error: any) {
    const errorHandler = getTriageErrorHandler();
    
    // Detectar tipo de error específico
    let errorType = TriageErrorType.UNKNOWN_ERROR;
    if (error?.status === 429 || String(error).includes('429')) {
      errorType = TriageErrorType.GEMINI_RATE_LIMIT;
    } else if (error?.status === 401 || error?.status === 403) {
      errorType = TriageErrorType.GEMINI_AUTH_ERROR;
    } else if (error?.status && error.status >= 500) {
      errorType = TriageErrorType.GEMINI_SERVER_ERROR;
    }

    const classifiedError = errorHandler.classifyError(
      error,
      errorType,
      { phase: 'gemini_call', symptoms: symptoms?.substring(0, 50) }
    );

    return {
      urgency: 'medium',
      recommendation: errorHandler.getUserFriendlyMessage(classifiedError),
      reasoning: `Error en IA: ${classifiedError.type}`,
      error: true,
    };
  }
};
