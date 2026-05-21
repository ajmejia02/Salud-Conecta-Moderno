/**
 * triageOfflineManager.ts
 * 
 * Gestor de estado offline para triaje.
 * Detecta cambios online/offline y sincroniza estado con NetworkContext.
 */

export interface OfflineState {
  isOnline: boolean;
  lastOnlineAt: number;
  lastOfflineAt: number;
  isRateLimited: boolean;
  pendingSync: number;
}

export class TriageOfflineManager {
  private isOnline = true;
  private lastOnlineAt = Date.now();
  private lastOfflineAt = 0;
  private isRateLimited = false;
  private pendingSyncQueue: Array<{ timestamp: number; data: any }> = [];
  private listeners: Set<(state: OfflineState) => void> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    this.initializeListeners();
    this.initializeBroadcastChannel();
  }

  /**
   * Inicializar escuchadores de eventos online/offline
   */
  private initializeListeners(): void {
    if (typeof window === 'undefined') return;

    // Online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());

    // Check inicial
    this.isOnline = navigator.onLine;
  }

  /**
   * Inicializar BroadcastChannel para sincronización entre tabs
   */
  private initializeBroadcastChannel(): void {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) {
      console.warn('[OFFLINE] BroadcastChannel no soportado');
      return;
    }

    try {
      this.broadcastChannel = new BroadcastChannel('triage-offline-sync');
      this.broadcastChannel.onmessage = (event) => {
        if (event.data.type === 'ONLINE_STATUS_CHANGE') {
          this.isOnline = event.data.isOnline;
          this.notifyListeners();
        }
      };
    } catch (error) {
      console.error('[OFFLINE] Error creando BroadcastChannel:', error);
    }
  }

  /**
   * Handler cuando vuelve online
   */
  private handleOnline(): void {
    if (this.isOnline) return; // Ya estaba online

    console.log('[OFFLINE] Conexión restaurada');
    this.isOnline = true;
    this.lastOnlineAt = Date.now();
    this.notifyListeners();
    this.broadcastToOtherTabs();

    // Intentar sincronizar operaciones pendientes
    this.syncPendingOperations();
  }

  /**
   * Handler cuando se va offline
   */
  private handleOffline(): void {
    if (!this.isOnline) return; // Ya estaba offline

    console.log('[OFFLINE] Conexión perdida');
    this.isOnline = false;
    this.lastOfflineAt = Date.now();
    this.notifyListeners();
    this.broadcastToOtherTabs();
  }

  /**
   * Notificar cambios a listeners
   */
  private notifyListeners(): void {
    const state = this.getState();
    for (const listener of this.listeners) {
      try {
        listener(state);
      } catch (error) {
        console.error('[OFFLINE] Error notificando listener:', error);
      }
    }
  }

  /**
   * Broadcast a otras tabs
   */
  private broadcastToOtherTabs(): void {
    if (!this.broadcastChannel) return;

    try {
      this.broadcastChannel.postMessage({
        type: 'ONLINE_STATUS_CHANGE',
        isOnline: this.isOnline,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('[OFFLINE] Error broadcasting:', error);
    }
  }

  /**
   * Registrar listener para cambios de estado
   */
  onStateChange(listener: (state: OfflineState) => void): () => void {
    this.listeners.add(listener);

    // Retornar función para unsubscribe
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Obtener estado actual
   */
  getState(): OfflineState {
    return {
      isOnline: this.isOnline,
      lastOnlineAt: this.lastOnlineAt,
      lastOfflineAt: this.lastOfflineAt,
      isRateLimited: this.isRateLimited,
      pendingSync: this.pendingSyncQueue.length,
    };
  }

  /**
   * Marcar como rate limited
   */
  setRateLimited(isLimited: boolean): void {
    if (this.isRateLimited === isLimited) return;

    this.isRateLimited = isLimited;
    console.log(`[OFFLINE] Rate limited: ${isLimited}`);
    this.notifyListeners();
  }

  /**
   * Agregar operación a cola de sync
   */
  addPendingOperation(data: any): void {
    this.pendingSyncQueue.push({
      timestamp: Date.now(),
      data,
    });

    console.log(`[OFFLINE] Operación agregada a cola (${this.pendingSyncQueue.length} pendientes)`);
    this.notifyListeners();

    // Intentar sincronizar si estamos online
    if (this.isOnline) {
      this.syncPendingOperations();
    }
  }

  /**
   * Sincronizar operaciones pendientes
   */
  private syncPendingOperations(): void {
    if (!this.isOnline || this.pendingSyncQueue.length === 0) return;

    console.log(`[OFFLINE] Intentando sincronizar ${this.pendingSyncQueue.length} operaciones`);
    // Esta función debería ser sobrescrita o inyectada por triageService
  }

  /**
   * Obtener cola de pendientes
   */
  getPendingQueue(): Array<{ timestamp: number; data: any }> {
    return [...this.pendingSyncQueue];
  }

  /**
   * Limpiar cola de pendientes
   */
  clearPendingQueue(): void {
    this.pendingSyncQueue = [];
    this.notifyListeners();
  }

  /**
   * Limpiar un item específico de la cola
   */
  removePendingOperation(timestamp: number): void {
    this.pendingSyncQueue = this.pendingSyncQueue.filter(
      op => op.timestamp !== timestamp
    );
    this.notifyListeners();
  }

  /**
   * Limpiar y desuscribirse de todo
   */
  destroy(): void {
    this.listeners.clear();
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }
  }

  /**
   * Obtener debugging info
   */
  getDebugInfo(): string {
    const state = this.getState();
    const uptime = this.isOnline ? Date.now() - state.lastOnlineAt : Date.now() - state.lastOfflineAt;
    return `
Offline State:
- Online: ${state.isOnline}
- Rate Limited: ${state.isRateLimited}
- Pending Sync: ${state.pendingSync}
- Last Online: ${Math.round(uptime / 1000)}s ago
- Queue Size: ${this.pendingSyncQueue.length}
    `.trim();
  }
}

// Instancia singleton
let managerInstance: TriageOfflineManager | null = null;

export function getTriageOfflineManager(): TriageOfflineManager {
  if (!managerInstance) {
    managerInstance = new TriageOfflineManager();
  }
  return managerInstance;
}
