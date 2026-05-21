/**
 * useTriageOfflineState.ts
 * 
 * Hook React para escuchar estado offline del triaje
 */

import { useState, useEffect } from 'react';
import { getTriageOfflineManager, type OfflineState } from '../lib/triageOfflineManager';

export const DEFAULT_OFFLINE_STATE: OfflineState = {
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  lastOnlineAt: Date.now(),
  lastOfflineAt: 0,
  isRateLimited: false,
  pendingSync: 0,
};

/**
 * Hook para escuchar estado offline/online en componentes
 */
export function useTriageOfflineState(): OfflineState {
  const [state, setState] = useState<OfflineState>(DEFAULT_OFFLINE_STATE);

  useEffect(() => {
    const manager = getTriageOfflineManager();

    // Obtener estado inicial
    setState(manager.getState());

    // Subscribirse a cambios
    const unsubscribe = manager.onStateChange(setState);

    // Cleanup
    return unsubscribe;
  }, []);

  return state;
}

/**
 * Hook para obtener solo si está online
 */
export function useIsTriageOnline(): boolean {
  const state = useTriageOfflineState();
  return state.isOnline;
}

/**
 * Hook para obtener si está rate limited
 */
export function useIsTriageRateLimited(): boolean {
  const state = useTriageOfflineState();
  return state.isRateLimited;
}

/**
 * Hook para obtener número de operaciones pendientes
 */
export function useTriagePendingSync(): number {
  const state = useTriageOfflineState();
  return state.pendingSync;
}
