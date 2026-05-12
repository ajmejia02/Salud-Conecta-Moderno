import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface LocationContext {
  lat: number;
  lng: number;
  city?: string;
  country?: string;
}

export interface SmartClinicSearch {
  clinics: Array<{
    id: string;
    name: string;
    type: 'clinic' | 'pharmacy' | 'emergency';
    distance: string;
    reason: string;
    recommended: boolean;
  }>;
  summary: string;
}

export interface EnhancedTriageResult {
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  recommendation: string;
  medication?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  instructions?: string;
  reasoning: string;
  nearestClinic?: {
    name: string;
    type: string;
    distance: string;
  };
  pharmacyRecommendation?: {
    name: string;
    hasStock: boolean;
  };
  error?: boolean;
}

export const findNearbyHealthCenters = async (
  symptoms: string,
  location: LocationContext,
  clinics: Array<{
    id: string;
    name: string;
    type: 'clinic' | 'pharmacy' | 'emergency';
    address: string;
    open24h?: boolean;
    distance?: string;
  }>
): Promise<SmartClinicSearch> => {
  try {
    const clinicList = clinics.map(c => 
      `- ${c.name} (${c.type}${c.open24h ? ', 24h' : ''})`
    ).join('\n');

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{
        role: 'user',
        parts: [{
          text: `Eres un asistente médico inteligente. Analiza los síntomas y encuentra los centros de salud más apropiados.
          
Síntomas: ${symptoms}
Ubicación: lat ${location.lat}, lng ${location.lng}${location.city ? ', ' + location.city : ''}

Centros disponibles:
${clinicList}

Responde ÚNICAMENTE con un JSON válido:
{
  "clinics": [
    {
      "id": "id del centro",
      "name": "nombre",
      "type": "clinic|pharmacy|emergency",
      "distance": "distancia estimada",
      "reason": "por qué es recomendable para estos síntomas",
      "recommended": true/false
    }
  ],
  "summary": "resumen breve de por qué estos centros son recomendados"
}`
        }]
      }],
      config: {
        systemInstruction: `Eres un asesor médico inteligente para Salud Conecta IA. 
Analiza síntomas y encuentra centros de salud cercanos adecuados.
Si hay síntomas de emergencia, recomienda centros de urgencia primero.
Siempre responde en español.`,
        responseMimeType: "application/json"
      },
    });

    const parsed = JSON.parse(response.text);
    return {
      clinics: parsed.clinics || [],
      summary: parsed.summary || 'Basado en tus síntomas, aquí están los centros recomendados.'
    };
  } catch (error) {
    console.error("Smart Clinic Search Error:", error);
    return {
      clinics: [],
      summary: 'No pudimos procesar la búsqueda. Por favor, intenta de nuevo.'
    };
  }
};

export const enhancedTriage = async (
  symptoms: string,
  location: LocationContext
): Promise<EnhancedTriageResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{
        role: 'user',
        parts: [{
          text: `Analiza estos síntomas en la ubicación (${location.lat}, ${location.lng}):
          
Síntomas: ${symptoms}

Responde ÚNICAMENTE con un JSON válido:
{
  "urgency": "low|medium|high|emergency",
  "recommendation": "acción a tomar",
  "medication": "medicamento de venta libre (opcional)",
  "dosage": "dosis",
  "frequency": "frecuencia",
  "duration": "duración",
  "instructions": "instrucciones adicionales",
  "reasoning": "justificación clínica",
  "nearestClinic": {
    "name": "nombre del centro más cercano",
    "type": "tipo",
    "distance": "distancia"
  },
  "pharmacyRecommendation": {
    "name": "farmacia recomendada",
    "hasStock": true
  }
}`
        }]
      }],
      config: {
        systemInstruction: `Eres un motor de triaje médico de alta precisión para Salud Conecta IA.
Incluye información de centros cercanos en tus recomendaciones.
Si es emergencia, indica el centro de urgencia más cercano.
Responde siempre en español.`,
        responseMimeType: "application/json"
      },
    });

    const parsed = JSON.parse(response.text);
    return parsed;
  } catch (error) {
    console.error("Enhanced Triage Error:", error);
    return {
      urgency: 'medium',
      recommendation: 'No pudimos procesar tu evaluación. Consulta con un profesional.',
      reasoning: 'Error en el servicio de triaje inteligente.',
      error: true
    };
  }
};

export const getHealthAssistant = async (
  prompt: string, 
  history: { role: string, parts: { text: string }[] }[] = [],
  location?: LocationContext
) => {
  try {
    const locationContext = location 
      ? `\n\nContexto de ubicación: Estoy en lat ${location.lat}, lng ${location.lng}${location.city ? `, ${location.city}` : ''}.`
      : '';

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt + locationContext }] }
      ],
      config: {
        systemInstruction: `Eres un asistente de salud inteligente para "Salud Conecta IA".
Tu tono es empático, eficiente y confiable.
Proporcionas información clara y reduzca la carga cognitiva.
Si hay síntomas de emergencia, indica ir a urgencias.
Puedes recomendar centros de salud cercanos cuando se proporcione ubicación.
Si mencionas medicamentos, sugiere farmacias cercanas.
Responde siempre en español.${locationContext}`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Lo siento, tuve un problema al procesar tu solicitud.";
  }
};

export const getSmartTriage = async (symptoms: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: 'user', parts: [{ text: symptoms }] }],
      config: {
        systemInstruction: `Eres un motor de triaje médico de alta precisión para Salud Conecta IA. 
Analiza los síntomas y clasifica la urgencia.
REGLA: Solo una recomendación única de acción.
Responde ÚNICAMENTE con JSON:
{
  "urgency": "low|medium|high|emergency",
  "recommendation": "acción (máx 200 caracteres)",
  "medication": "medicamento (opcional)",
  "dosage": "dosis",
  "frequency": "frecuencia",
  "duration": "duración",
  "instructions": "instrucciones",
  "reasoning": "justificación (máx 150 caracteres)"
}
Siempre en español.`,
        responseMimeType: "application/json"
      },
    });
    const text = response.text;
    const parsed = JSON.parse(text);
    
    const requiredFields = ['urgency', 'recommendation', 'reasoning'];
    const hasAllFields = requiredFields.every(field => field in parsed);
    
    if (!hasAllFields) {
      throw new Error('Invalid triage response schema');
    }
    
    return parsed;
  } catch (error) {
    console.error("Gemini Triage Error:", error);
    return {
      urgency: 'medium',
      recommendation: 'No pudimos procesar tu evaluación automáticamente.',
      reasoning: 'Tuvimos un problema al analizar tus síntomas.',
      error: true
    };
  }
};
