/**
 * TriageDisclaimerCard.tsx
 * 
 * Componente de disclaimer legal para resultados de triaje.
 * Muestra advertencias médicas y avisos de accesibilidad.
 */

import React from 'react';
import { AlertTriangle, AlertCircle, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { getDisclaimer, TRIAGE_DISCLAIMERS } from '../../lib/triageDisclaimers';

export interface TriageDisclaimerCardProps {
  severity: 'emergency' | 'high' | 'moderate' | 'low';
  language: 'es' | 'en';
}

export const TriageDisclaimerCard: React.FC<TriageDisclaimerCardProps> = ({
  severity,
  language,
}) => {
  const isEmergency = severity === 'emergency';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`rounded-2xl border-2 p-4 backdrop-blur-sm ${
        isEmergency
          ? 'border-error/50 bg-error/10 shadow-lg shadow-error/20'
          : 'border-amber-500/50 bg-amber-500/10 shadow-lg shadow-amber-500/10'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {isEmergency ? (
          <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isEmergency ? 'text-error animate-pulse' : 'text-amber-600'}`} />
        ) : (
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-600" />
        )}

        <div className="flex-1">
          {/* Medical Advice Disclaimer */}
          <p className={`text-sm font-bold mb-2 ${isEmergency ? 'text-error' : 'text-amber-700'}`}>
            {getDisclaimer('MEDICAL_ADVICE', language)}
          </p>

          {/* Emergency Notice */}
          {isEmergency && (
            <div className="mb-3 p-2 rounded-lg bg-error/20 border border-error/30">
              <p className="text-xs font-bold text-error">
                {getDisclaimer('EMERGENCY', language)}
              </p>
            </div>
          )}

          {/* Data Usage Notice */}
          <p className="text-xs text-on-surface/60 mb-2">
            {getDisclaimer('DATA_USAGE', language)}
          </p>

          {/* Accuracy Notice */}
          <p className="text-xs text-on-surface/60">
            {getDisclaimer('ACCURACY_NOTICE', language)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TriageDisclaimerCard;
