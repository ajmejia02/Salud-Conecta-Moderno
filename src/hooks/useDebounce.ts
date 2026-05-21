/**
 * useDebounce.ts
 * React hook para debouncing de valores y funciones
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook para debounce de un valor
 * Útil para buscar, filtrar, etc. sin hacer requests en cada keystroke
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook para debounce de un callback/función
 * Previene ejecutar funciones múltiples veces en corto tiempo
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef<number>(0);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallRef.current;

      // Limpiar timeout previo
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Si han pasado suficientes ms, ejecutar inmediatamente
      if (timeSinceLastCall >= delay) {
        lastCallRef.current = now;
        callback(...args);
      } else {
        // Si no, esperar el delay
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now();
          callback(...args);
        }, delay - timeSinceLastCall);
      }
    },
    [callback, delay]
  );

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback as T;
}

/**
 * Hook para throttle (similar a debounce pero ejecuta al inicio)
 * Útil para resize, scroll, etc.
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef<number>(Date.now());

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallRef.current;

      if (timeSinceLastCall >= delay) {
        // Suficiente tiempo ha pasado, ejecutar inmediatamente
        lastCallRef.current = now;
        callback(...args);
      } else {
        // No ha pasado suficiente tiempo, pero agendar para después
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now();
          callback(...args);
        }, delay - timeSinceLastCall);
      }
    },
    [callback, delay]
  );

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback as T;
}

/**
 * Hook para leading/trailing edge control en debounce
 */
export function useDebouncedCallbackWithEdges<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 500,
  { leading = false, trailing = true }: { leading?: boolean; trailing?: boolean } = {}
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  // Actualizar callback ref siempre
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallRef.current;

      // Limpiar timeout previo
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Leading edge: ejecutar inmediatamente en el primer call
      if (leading && timeSinceLastCall >= delay) {
        lastCallRef.current = now;
        callbackRef.current(...args);
      } else {
        // Trailing edge: ejecutar después del delay
        if (trailing) {
          timeoutRef.current = setTimeout(() => {
            lastCallRef.current = Date.now();
            callbackRef.current(...args);
          }, delay);
        }
      }
    },
    [delay, leading, trailing]
  );

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback as T;
}
