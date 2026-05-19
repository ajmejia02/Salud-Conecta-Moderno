import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "./config";

let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const isInvalidKey = !GEMINI_API_KEY || 
                         ["undefined", "MISSING", ""].includes(GEMINI_API_KEY.trim());
    if (isInvalidKey) {
      console.warn("[AI Configuration] GEMINI_API_KEY is missing or invalid. Restart the dev server.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
  return aiInstance;
};

export const MODEL = "gemini-2.0-flash";

// Función para obtener consejo diario de salud
export const getDailyHealthTip = async (language: string = 'es', membership: 'free' | 'premium' = 'free') => {
  try {
    const ai = getAI();
    if (!ai) {
      return "Consulta regular a tu centro de salud local.";
    }

    const context = membership === 'free'
      ? 'Recuerda que la Red Pública (MINSA) en Nicaragua ofrece servicios de salud gratuitos. La prevención es clave...'
      : 'Como usuario Premium tienes acceso prioritario a centros de salud y consultas especializadas. ¿Recordas revisar tus citas pendientes?';

    const prompt = `Dale un consejo de salud breve y conciso (${membership === 'free' ? '30' : '25'} caracteres máximo) para una persona nicaragüense, que empiece con "💡 ". Responde en ${language}.
${context}`;

    const systemInstruction = "Eres un asistente de salud. Respuestas breves de máximo 30 caracteres";
    const result = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const text = result.text ?? "";
    const tip = text.length > 30 ? text.substring(0, 30) : text;
    return tip;
  } catch (error) {
    console.error("Daily health tip error:", error);
    return "¡Bebe agua y mantente activo! 💪";
  }
};

// Sistema de triaje
export const getSmartTriage = async (symptoms: string, membership: 'free' | 'premium' = 'free') => {
  try {
    const ai = getAI();
    if (!ai) {
      return {
        urgency: 'medium',
        recommendation: 'El asistente de IA no está configurado. Busque atención médica profesional.',
        reasoning: 'Configuración de API pendiente.',
        error: true
      };
    }

    const membershipContext = membership === 'free' 
      ? 'CONTEXTO SOCIAL: El usuario es Free. Prioriza siempre la Red Pública (MINSA).' 
      : 'CONTEXTO PREMIUM: Acceso a servicios privados y públicos.';
      
    const systemInstruction = `Eres un motor de triaje médico para Nicaragua. Responde ÚNICAMENTE JSON con:
{
  "urgency": "low" | "medium" | "high" | "emergency",
  "recommendation": "Acción a tomar",
  "reasoning": "Justificación breve"
}
${membershipContext}`;

    const result = await ai.models.generateContent({
      model: MODEL,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
      contents: [{ role: 'user', parts: [{ text: symptoms }] }],
    });

    const text = result.text ?? "";
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      console.error("Error parsing Gemini JSON response:", parseError, "Raw:", text);
      return {
        urgency: 'medium',
        recommendation: 'Error al procesar. Busque atención médica.',
        reasoning: 'JSON inválido.',
        error: true
      };
    }
    
    const requiredFields = ['urgency', 'recommendation', 'reasoning'];
    if (!requiredFields.every(field => field in parsed)) {
      throw new Error('Invalid schema');
    }
    
    return parsed;
  } catch (error: any) {
    console.error("Gemini Triage Error:", error);
    const msg = typeof error === 'string' ? error : (error?.message || 'Error');
    const isOutOfCredits = msg.toLowerCase().includes('credits') || msg.includes('429');
    return {
      urgency: 'medium',
      recommendation: isOutOfCredits 
        ? 'Verifique créditos en ai.studio o acuda a su centro de salud.'
        : 'Busque atención médica profesional.',
      reasoning: 'Error al procesar triaje.',
      error: true
    };
  }
};