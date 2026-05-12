import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const model = genAI.getGenerativeModel({ 
  model: process.env.GEMINI_MODEL || 'gemini-2.0-flash'
});

app.post('/api/gemini/smart-search', async (req, res) => {
  try {
    const { symptoms, location, clinics } = req.body;
    
    const clinicList = clinics?.map(c => 
      `- ${c.name} (${c.type}${c.open24h ? ', 24h' : ''})`
    ).join('\n') || '';

    const prompt = `Eres un asistente médico inteligente para Salud Conecta IA.
Analiza los síntomas y encuentra centros de salud cercanos adecuados.
Si hay síntomas de emergencia, recomienda centros de urgencia primero.

Síntomas: ${symptoms}
Ubicación: lat ${location?.lat || 0}, lng ${location?.lng || 0}${location?.city ? ', ' + location.city : ''}

Centros disponibles:
${clinicList || 'No hay centros disponibles'}

Responde ÚNICAMENTE con un JSON válido sin markdown:
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
  "summary": "resumen breve de por qué estos centros son recomendados",
  "urgency": "low|medium|high|emergency"
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json\n?/g, '').replace(/\n?```/g, '');
    
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (error) {
    console.error('Smart Search Error:', error);
    res.status(500).json({ error: 'Error al procesar la búsqueda' });
  }
});

app.post('/api/gemini/triage', async (req, res) => {
  try {
    const { symptoms, location } = req.body;

    const prompt = `Eres un motor de triaje médico de alta precisión para Salud Conecta IA.
Analiza los síntomas y clasifica la urgencia.
Incluye información de centros cercanos en tus recomendaciones.

Síntomas: ${symptoms}
Ubicación: lat ${location?.lat || 0}, lng ${location?.lng || 0}${location?.city ? ', ' + location.city : ''}

Responde ÚNICAMENTE con un JSON válido sin markdown:
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
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json\n?/g, '').replace(/\n?```/g, '');
    
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (error: any) {
    console.error('Triage Error:', error?.message || error);
    res.status(500).json({ 
      error: 'Error al procesar el triaje',
      details: error?.message,
      urgency: 'medium',
      recommendation: 'No pudimos procesar tu evaluación. Consulta con un profesional.',
      reasoning: 'Error en el servicio de triaje.'
    });
  }
});

app.post('/api/gemini/assistant', async (req, res) => {
  try {
    const { prompt, history, location } = req.body;
    
    const locationContext = location 
      ? `\n\nContexto de ubicación: Estoy en lat ${location.lat}, lng ${location.lng}${location.city ? `, ${location.city}` : ''}.`
      : '';

    const systemInstruction = `Eres un asistente de salud inteligente para "Salud Conecta IA".
Tu tono es empático, eficiente y confiable.
Proporcionas información clara y reduzca la carga cognitiva.
Si hay síntomas de emergencia, indica ir a urgencias.
Puedes recomendar centros de salud cercanos cuando se proporcione ubicación.
Si mencionas medicamentos, sugiere farmacias cercanas.
Responde siempre en español.${locationContext}`;

    const contents = history?.length 
      ? [...history, { role: 'user', parts: [{ text: prompt + locationContext }] }]
      : [{ role: 'user', parts: [{ text: prompt + locationContext }] }];

    const result = await model.generateContent({
      contents,
      generationConfig: { systemInstruction }
    });
    
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    console.error('Assistant Error:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', geminiConfigured: !!process.env.GEMINI_API_KEY });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Gemini API Key configured: ${!!process.env.GEMINI_API_KEY}`);
});