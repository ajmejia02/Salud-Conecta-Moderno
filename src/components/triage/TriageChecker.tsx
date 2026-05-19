import React, { useState, useEffect } from 'react';
import { Activity, Send, RotateCcw, Save, MapPin, Compass, Zap } from 'lucide-react';
import { getEnhancedTriageWithLocation } from '../../services/triageService';
import { saveTriageRecord } from '../../services/triageService';
import { useUser } from '../../contexts/UserContext';
import { auth } from '../../lib/firebase';
import { TriageWithLocationResult } from '../../services/triageService';

interface Message { id: string; role: 'assistant' | 'user'; content: string; timestamp: Date; }

export default function TriageChecker() {
  const { membership } = useUser();
  const [messages, setMessages] = useState<Message[]>([{ id: '1', role: 'assistant', content: 'Soy su asistente de triaje. ¿Qué síntoma lo trae hoy?', timestamp: new Date() }]);
  const [input, setInput] = useState('');
  const [triageResult, setTriageResult] = useState<TriageWithLocationResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    const sender: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, sender]);
    setInput('');
    setTriageResult(null);
    try {
      const result = await getEnhancedTriageWithLocation(text, membership);
      if (!result.error) setTriageResult(result);
    } catch (e) { console.error(e); }
  };

  const handleReset = () => { setMessages([{ id: '1', role: 'assistant', content: 'Hola. ¿Qué síntoma lo trae hoy?', timestamp: new Date() }]); setTriageResult(null); setInput(''); };

  const handleSave = async () => {
    if (!auth.currentUser || !triageResult) return;
    setIsSaving(true);
    const sym = messages.filter(m => m.role === 'user').map(m => m.content).join(' | ');
    await saveTriageRecord({ userId: auth.currentUser.uid, symptoms: sym, urgency: triageResult.severity, recommendation: triageResult.recommendation, medication: triageResult.medication?.name, dosage: triageResult.medication?.dosage, frequency: triageResult.medication?.frequency, duration: triageResult.medication?.duration, instructions: '' });
    setIsSaving(false);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-sky-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-blue-200 dark:border-blue-900/30 p-4">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-500" />
          <span className="font-semibold">Triage IA con Geolocalización</span>
          {triageResult && <button onClick={handleReset} className="ml-auto"><RotateCcw className="w-4 h-4"/></button>}
        </div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="space-y-2">
          {messages.map(m => (
            <div key={m.id} className={`p-2 rounded ${m.role==='user'?'bg-blue-100 dark:bg-blue-900/30 ml-8':'bg-slate-100 dark:bg-slate-800 mr-8'}`}><p className="text-sm">{m.content}</p></div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {triageResult && !triageResult.error && (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-blue-200 dark:border-blue-900/30 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${triageResult.severity==='emergency'?'bg-red-100 text-red-700':triageResult.severity==='high'?'bg-orange-100 text-orange-700':triageResult.severity==='medium'?'bg-yellow-100 text-yellow-700':'bg-green-100 text-green-700'}`}>
                Severidad: {triageResult.severity}
              </span>
              {triageResult.severity==='emergency' && <Zap className="w-4 h-4 text-red-500"/>}
            </div>
            <p className="text-sm mb-2"><strong>Recomendación:</strong> {triageResult.recommendation}</p>
            {triageResult.locationInfo?.clinic && (
              <div className="flex items-center gap-2 text-sm"><MapPin className="text-blue-500"/><strong>{triageResult.locationInfo.nearestFacility}</strong></div>
            )}
            <div className="mt-3 flex gap-2">
              <button onClick={handleSave} disabled={isSaving} className="flex-1 py-2 bg-blue-500 text-white rounded-lg"><Save className="w-4 h-4 inline"/> {isSaving?'Guardando...':'Guardar'}</button>
              <button onClick={() => handleSend('¿Cómo llegar?')} className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg"><Compass className="w-4 h-4"/> Rutas</button>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <input className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500" placeholder="¿Qué síntoma tiene?" value={input} onChange={e=>setInput(e.target.value)} onKeyPress={e=>e.key==='Enter'&&handleSend()}/>
          <button onClick={()=>handleSend()} className="px-6 py-3 bg-blue-500 text-white rounded-lg"><Send className="w-5 h-5"/></button>
        </div>
      </div>
    </div>
  );
}