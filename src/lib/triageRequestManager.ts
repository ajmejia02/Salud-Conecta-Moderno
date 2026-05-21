/**
 * triageRequestManager.ts
 * 
 * Gestor centralizado para requests de triaje.
 * Evita requests duplicadas, cancela requests anteriores, maneja AbortController.
 */

export interface RequestContext {
  id: string;
  symptoms: string;
  timestamp: number;
  controller: AbortController;
}

export class TriageRequestManager {
  private activeRequest: RequestContext | null = null;
  private requestQueue: RequestContext[] = [];
  private isProcessing = false;

  /**
   * Crear un nuevo request context con AbortController
   */
  createRequest(symptoms: string): { context: RequestContext; signal: AbortSignal } {
    const controller = new AbortController();
    const context: RequestContext = {
      id: `triage-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      symptoms,
      timestamp: Date.now(),
      controller,
    };

    return { context, signal: controller.signal };
  }

  /**
   * Registrar un request como activo y cancelar el anterior si existe
   */
  setActiveRequest(context: RequestContext): void {
    // Cancelar request anterior si existe
    if (this.activeRequest && !this.activeRequest.controller.signal.aborted) {
      console.log(`[TRIAGE] Cancelando request anterior: ${this.activeRequest.id}`);
      this.activeRequest.controller.abort();
    }

    this.activeRequest = context;
    console.log(`[TRIAGE] Nuevo request activo: ${context.id}`);
  }

  /**
   * Verificar si un request está activo (no ha sido cancelado)
   */
  isRequestActive(requestId: string): boolean {
    if (!this.activeRequest) return false;
    if (this.activeRequest.id !== requestId) return false;
    return !this.activeRequest.controller.signal.aborted;
  }

  /**
   * Cancelar el request activo actual
   */
  cancelActiveRequest(reason: string = 'Usuario canceló'): void {
    if (this.activeRequest && !this.activeRequest.controller.signal.aborted) {
      console.log(`[TRIAGE] Cancelando request activo: ${reason}`);
      this.activeRequest.controller.abort();
      this.activeRequest = null;
    }
  }

  /**
   * Obtener el request activo actual
   */
  getActiveRequest(): RequestContext | null {
    return this.activeRequest;
  }

  /**
   * Verificar si hay un request activo
   */
  hasActiveRequest(): boolean {
    return this.activeRequest !== null && !this.activeRequest.controller.signal.aborted;
  }

  /**
   * Limpiar - cancelar todos los requests
   */
  clear(): void {
    if (this.activeRequest && !this.activeRequest.controller.signal.aborted) {
      this.activeRequest.controller.abort();
    }
    this.activeRequest = null;
    this.requestQueue = [];
    this.isProcessing = false;
  }

  /**
   * Obtener información de debugging del manager
   */
  getDebugInfo(): {
    activeRequest: Omit<RequestContext, 'controller'> | null;
    queueLength: number;
    isProcessing: boolean;
  } {
    return {
      activeRequest: this.activeRequest
        ? {
            id: this.activeRequest.id,
            symptoms: this.activeRequest.symptoms.substring(0, 50),
            timestamp: this.activeRequest.timestamp,
          }
        : null,
      queueLength: this.requestQueue.length,
      isProcessing: this.isProcessing,
    };
  }
}

// Instancia singleton del request manager
let managerInstance: TriageRequestManager | null = null;

export function getTriageRequestManager(): TriageRequestManager {
  if (!managerInstance) {
    managerInstance = new TriageRequestManager();
  }
  return managerInstance;
}

/**
 * Helper para ejecutar una función de triaje con cancellation support
 */
export async function executeTriageRequest<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  symptoms: string
): Promise<T> {
  const manager = getTriageRequestManager();
  const { context, signal } = manager.createRequest(symptoms);
  
  manager.setActiveRequest(context);

  try {
    const result = await fn(signal);
    
    // Verificar si fue cancelado mientras esperábamos
    if (signal.aborted) {
      throw new Error('Request cancelado por el usuario');
    }

    return result;
  } finally {
    // Limpiar si este es el request activo
    if (manager.getActiveRequest()?.id === context.id) {
      manager.cancelActiveRequest('Completado');
    }
  }
}

/**
 * Hook-compatible wrapper para usar en componentes React
 */
export class TriageAbortHandle {
  private requestId: string;
  private manager: TriageRequestManager;

  constructor(requestId: string) {
    this.requestId = requestId;
    this.manager = getTriageRequestManager();
  }

  /**
   * Verificar si el request sigue activo
   */
  isActive(): boolean {
    return this.manager.isRequestActive(this.requestId);
  }

  /**
   * Obtener el signal de AbortController
   */
  getSignal(): AbortSignal | null {
    const active = this.manager.getActiveRequest();
    if (active?.id === this.requestId) {
      return active.controller.signal;
    }
    return null;
  }

  /**
   * Usar en checkpoints durante ejecución
   */
  throwIfAborted(): void {
    if (!this.isActive()) {
      throw new Error(`Request ${this.requestId} fue cancelado`);
    }
  }
}
