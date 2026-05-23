import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-2.0-flash';
const ALLOWED_URGENCY = new Set(['low', 'medium', 'high', 'emergency']);

const getApiKey = () => {
  const value = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
  const trimmed = value.trim();
  if (!trimmed || ['undefined', 'null', 'MISSING', 'YOUR_API_KEY', 'MY_GEMINI_API_KEY'].includes(trimmed)) {
    return '';
  }
  return trimmed;
};

const parseJsonResponse = (text) => {
  const cleaned = text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '');

  const parsed = JSON.parse(cleaned);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Gemini response is not an object');
  }

  if (!ALLOWED_URGENCY.has(parsed.urgency)) {
    throw new Error('Gemini response has invalid urgency');
  }

  if (typeof parsed.recommendation !== 'string' || !parsed.recommendation.trim()) {
    throw new Error('Gemini response is missing recommendation');
  }

  if (typeof parsed.reasoning !== 'string' || !parsed.reasoning.trim()) {
    throw new Error('Gemini response is missing reasoning');
  }

  return {
    urgency: parsed.urgency,
    recommendation: parsed.recommendation.trim(),
    reasoning: parsed.reasoning.trim(),
    medication: parsed.medication,
    error: false,
  };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured' });
  }

  const symptoms = typeof req.body?.symptoms === 'string' ? req.body.symptoms.trim() : '';
  const membership = req.body?.membership === 'premium' ? 'premium' : 'free';

  if (symptoms.length < 3 || symptoms.length > 500) {
    return res.status(400).json({ error: 'Invalid symptoms' });
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
- No diagnostiques de forma definitiva.
- Si hay señales de alarma, usa "emergency".
- Responde solo JSON válido, sin markdown.`;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model: MODEL,
      config: { systemInstruction },
      contents: [{ role: 'user', parts: [{ text: symptoms }] }],
    });

    return res.status(200).json(parseJsonResponse(result.text ?? ''));
  } catch (error) {
    console.error('[API TRIAGE]', error?.message || error);
    return res.status(502).json({ error: 'Gemini triage failed' });
  }
}
