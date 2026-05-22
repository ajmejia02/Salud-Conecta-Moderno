import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { X, Activity, TrendingUp, Gift, Heart, AlertCircle } from 'lucide-react';
import { PointsService, PointsTransaction } from '../../lib/pointsService';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const transactions = useMemo(
    () => PointsService.getTransactions(),
    [isOpen]
  );

  const getIconForAction = (action: string) => {
    if (action.includes('Login')) return Activity;
    if (action.includes('Pasos') || action.includes('Desafío')) return TrendingUp;
    if (action.includes('Teleconsulta') || action.includes('Análisis') || action.includes('Fisioterapia')) return Gift;
    if (action.includes('Vitales')) return Heart;
    return AlertCircle;
  };

  const formatDate = (dateStr: string, timestamp: number): string => {
    const txDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = txDate.toDateString() === today.toDateString();
    const isYesterday = txDate.toDateString() === yesterday.toDateString();

    const time = txDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (isToday) return `HOY ${time}`;
    if (isYesterday) return `AYER ${time}`;

    return txDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) + ` ${time}`;
  };

  if (!isOpen) return null;

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
        className="bg-surface-container-low border border-outline-variant/30 rounded-[40px] max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-outline-variant/10">
          <h2 className="text-3xl font-display font-black text-on-surface">
            Historial Completo
          </h2>
          <button
            onClick={onClose}
            className="p-3 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-on-surface"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-on-surface-variant/30 mx-auto mb-4" />
                <p className="text-on-surface-variant">No hay transacciones aún</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-outline-variant/10">
              {transactions.map((tx, idx) => {
                const Icon = getIconForAction(tx.action);
                const isGain = tx.type === 'gain';

                return (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 hover:bg-surface-container-high transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-outline-variant/20 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base font-display font-black text-on-surface group-hover:text-primary transition-colors">
                          {tx.action}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 font-mono">
                          {formatDate(tx.date, tx.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg font-display font-black drop-shadow-sm ${
                          isGain
                            ? 'text-secondary'
                            : 'text-error'
                        }`}
                      >
                        {isGain ? '+' : '-'}{Math.abs(tx.points).toLocaleString()} pts
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
