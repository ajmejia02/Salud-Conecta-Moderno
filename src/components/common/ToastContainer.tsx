import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, AlertCircle, Info } from 'lucide-react';
import { toastManager, Toast } from '../../lib/toastService';

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe((toast) => {
      setToasts(prev => [...prev, toast]);
      
      if (toast.duration !== 0) {
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== toast.id));
        }, toast.duration || 3000);
      }
    });

    return unsubscribe;
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />;
      case 'error':
        return <X className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-secondary/90 text-on-secondary border-secondary';
      case 'error':
        return 'bg-error/90 text-on-error border-error';
      case 'warning':
        return 'bg-tertiary/90 text-on-tertiary border-tertiary';
      default:
        return 'bg-primary/90 text-on-primary border-primary';
    }
  };

  return (
    <div className="fixed top-8 right-8 z-[9999] pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast, idx) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 400, y: -50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 400, y: -50 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`mb-4 flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl pointer-events-auto font-display font-black text-sm ${getColors(toast.type)}`}
          >
            {getIcon(toast.type)}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
