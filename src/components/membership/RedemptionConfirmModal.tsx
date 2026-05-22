import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Copy, Check } from 'lucide-react';
import { PointsService } from '../../lib/pointsService';
import { toastManager } from '../../lib/toastService';

interface RedemptionConfirmModalProps {
  isOpen: boolean;
  reward?: {
    title: string;
    points: number;
    desc: string;
  };
  onClose: () => void;
  onConfirm?: () => void;
}

export default function RedemptionConfirmModal({
  isOpen,
  reward,
  onClose,
  onConfirm
}: RedemptionConfirmModalProps) {
  const [step, setStep] = useState<'confirm' | 'success'>('confirm');
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleConfirm = async () => {
    if (!reward) return;

    setIsLoading(true);
    try {
      const result = PointsService.redeemReward(reward.title, reward.points);

      if (result.success) {
        setCode(result.code || '');
        setStep('success');
        toastManager.success(`¡Recompensa canjeada! Código: ${result.code}`);
        onConfirm?.();
      } else {
        toastManager.error(result.message);
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !reward) return null;

  const currentPoints = PointsService.getTotalPoints();
  const remainingPoints = Math.max(0, reward.points - currentPoints);
  const hasEnoughPoints = currentPoints >= reward.points;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9000] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-surface-container-low border border-outline-variant/30 rounded-[40px] max-w-md w-full overflow-hidden shadow-2xl"
      >
        {/* Confirmation Step */}
        {step === 'confirm' && (
          <div className="p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-black text-on-surface">
                Confirmar Canje
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-surface-container-high border border-outline-variant/20 rounded-[24px] p-6">
              <div className="text-sm font-mono text-on-surface-variant/60 mb-2">RECOMPENSA</div>
              <h3 className="text-xl font-display font-black text-on-surface mb-4">
                {reward.title}
              </h3>
              <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                {reward.desc}
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-display font-black text-primary">
                  {reward.points.toLocaleString()}
                </span>
                <span className="text-sm font-display font-black text-primary/60">PTS</span>
              </div>

              {!hasEnoughPoints && (
                <div className="bg-error/10 border border-error/30 rounded-2xl p-4">
                  <p className="text-sm text-error font-display font-black">
                    Te faltan {remainingPoints.toLocaleString()} puntos
                  </p>
                </div>
              )}

              {hasEnoughPoints && (
                <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-4">
                  <p className="text-sm text-secondary font-display font-black">
                    ✓ Tienes suficientes puntos
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-[20px] bg-surface-container-high border border-outline-variant/30 text-on-surface font-display font-black text-sm uppercase tracking-wider hover:bg-surface-container-highest transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={!hasEnoughPoints || isLoading}
                className="flex-1 px-6 py-4 rounded-[20px] bg-primary text-on-primary font-display font-black text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Canjeando...' : 'Confirmar Canje'}
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="p-8 flex flex-col gap-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary text-secondary flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-8 h-8" />
            </motion.div>

            <div>
              <h2 className="text-2xl font-display font-black text-on-surface mb-2">
                ¡Canjeado!
              </h2>
              <p className="text-sm text-on-surface-variant">
                Tu recompensa ha sido procesada correctamente
              </p>
            </div>

            <div className="bg-surface-container-high border border-outline-variant/20 rounded-[20px] p-6">
              <p className="text-xs font-mono text-on-surface-variant/60 mb-2 uppercase tracking-widest">
                Código de Canje
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-display font-black text-primary tracking-widest">
                  {code}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-on-surface-variant/60 font-mono">
                Guarda este código para tu recompensa
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full px-6 py-4 rounded-[20px] bg-primary text-on-primary font-display font-black text-sm uppercase tracking-wider shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
            >
              Listo
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
