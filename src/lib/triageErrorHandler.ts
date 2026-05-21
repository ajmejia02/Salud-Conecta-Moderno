/**
 * triageErrorHandler.ts
 * 
 * Manejo robusto de errores para el sistema de triaje médico.
 * Tipos de error específicos, retry logic, exponential backoff, y logging.
 */

/**
 * Tipos de error específicos del sistema de triaje
 */
export enum TriageErrorType {
  // Errores de validación
  INVALID_INPUT = 'INVALID_INPUT',
  INVALID_SCHEMA = 'INVALID_SCHEMA',
  SPAM_DETECTED = 'SPAM_DETECTED',

  // Errores de API (Gemini)
  GEMINI_RATE_LIMIT = 'GEMINI_RATE_LIMIT', // 429
  GEMINI_AUTH_ERROR = 'GEMINI_AUTH_ERROR', // 401, 403
  GEMINI_TIMEOUT = 'GEMINI_TIMEOUT',
  GEMINI_SERVER_ERROR = 'GEMINI_SERVER_ERROR', // 5xx
  GEMINI_CONFIG_ERROR = 'GEMINI_CONFIG_ERROR', // Key missing/invalid

  // Errores de geolocalización
  GEOLOCATION_DENIED = 'GEOLOCATION_DENIED',
  GEOLOCATION_UNAVAILABLE = 'GEOLOCATION_UNAVAILABLE',
  GEOLOCATION_TIMEOUT = 'GEOLOCATION_TIMEOUT',

  // Errores de Firestore
  FIRESTORE_ERROR = 'FIRESTORE_ERROR',
  FIRESTORE_AUTH = 'FIRESTORE_AUTH',

  // Errores de red
  NETWORK_OFFLINE = 'NETWORK_OFFLINE',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',

  // Otros
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Información de error estructurada
 */
export interface TriageError {
  type: TriageErrorType;
  message: string;
  originalError?: Error | unknown;
  statusCode?: number;
  retryable: boolean;
  retryCount?: number;
  nextRetryIn?: number; // milliseconds
  timestamp: Date;
  context?: {
    symptoms?: string;
    membership?: string;
    phase?: string;
  };
}

/**
 * Configuración de retry
 */
export interface RetryConfig {
  maxRetries: number;
  initialDelay: number; // milliseconds
  maxDelay: number; // milliseconds
  backoffMultiplier: number;
  exponentialBackoff: boolean;
}

// Configuración por defecto
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 30000,
  backoffMultiplier: 2,
  exponentialBackoff: true,
};

/**
 * Clase para manejar errores de triaje con retry logic
 */
export class TriageErrorHandler {
  private retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG;
  private errorLog: TriageError[] = [];
  private lastRateLimitReset: Map<string, number> = new Map();

  constructor(config?: Partial<RetryConfig>) {
    if (config) {
      this.retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
    }
  }

  /**
   * Clasificar un error y crear TriageError estructurado
   */
  classifyError(
    error: unknown,
    type?: TriageErrorType,
    context?: TriageError['context']
  ): TriageError {
    const timestamp = new Date();
    let classifiedType = type || TriageErrorType.UNKNOWN_ERROR;
    let message = 'Error desconocido en triaje';
    let statusCode: number | undefined;
    let retryable = false;

    // Si es un Error nativo
    if (error instanceof Error) {
      const errorStr = error.message.toLowerCase();

      // Detectar errores de red
      if (errorStr.includes('offline') || errorStr.includes('no internet')) {
        classifiedType = TriageErrorType.NETWORK_OFFLINE;
        message = 'No hay conexión a internet';
        retryable = true;
      }
      // Detectar timeout
      else if (errorStr.includes('timeout') || errorStr.includes('timed out')) {
        classifiedType = TriageErrorType.NETWORK_TIMEOUT;
        message = 'Tiempo agotado en la solicitud';
        retryable = true;
      }
      // Detectar errores de geolocalización
      else if (errorStr.includes('geolocation')) {
        if (errorStr.includes('denied')) {
          classifiedType = TriageErrorType.GEOLOCATION_DENIED;
          message = 'Permiso de ubicación denegado';
        } else if (errorStr.includes('unavailable')) {
          classifiedType = TriageErrorType.GEOLOCATION_UNAVAILABLE;
          message = 'Ubicación no disponible';
        } else {
          classifiedType = TriageErrorType.GEOLOCATION_TIMEOUT;
          message = 'Tiempo agotado al obtener ubicación';
        }
        retryable = true;
      }
      // Detectar errores de Firestore
      else if (errorStr.includes('firestore') || errorStr.includes('firebase')) {
        if (errorStr.includes('permission denied') || errorStr.includes('auth')) {
          classifiedType = TriageErrorType.FIRESTORE_AUTH;
          message = 'Error de autenticación con Firestore';
        } else {
          classifiedType = TriageErrorType.FIRESTORE_ERROR;
          message = 'Error al guardar datos';
        }
        retryable = false;
      } else {
        message = error.message;
      }
    }
    // Si es un objeto con propiedades de error HTTP
    else if (error && typeof error === 'object') {
      const errorObj = error as any;

      // Obtener status code si está disponible
      statusCode = errorObj.status || errorObj.statusCode || errorObj.code;

      // Clasificar por status code
      if (statusCode === 429) {
        classifiedType = TriageErrorType.GEMINI_RATE_LIMIT;
        message = 'Límite de solicitudes excedido. Reintentando...';
        retryable = true;
      } else if (statusCode === 401 || statusCode === 403) {
        classifiedType = TriageErrorType.GEMINI_AUTH_ERROR;
        message = 'Error de autenticación con API de IA';
        retryable = false;
      } else if (statusCode === 500 || statusCode === 502 || statusCode === 503) {
        classifiedType = TriageErrorType.GEMINI_SERVER_ERROR;
        message = 'Servidor de IA no disponible temporalmente';
        retryable = true;
      } else if (statusCode === 408 || statusCode === 504) {
        classifiedType = TriageErrorType.GEMINI_TIMEOUT;
        message = 'Tiempo agotado en servidor de IA';
        retryable = true;
      }

      message = errorObj.message || message;
    }

    const triageError: TriageError = {
      type: classifiedType,
      message,
      originalError: error,
      statusCode,
      retryable,
      timestamp,
      context,
    };

    this.errorLog.push(triageError);
    this.logError(triageError);

    return triageError;
  }

  /**
   * Calcular delay para retry usando exponential backoff
   */
  calculateRetryDelay(retryCount: number): number {
    if (!this.retryConfig.exponentialBackoff) {
      return this.retryConfig.initialDelay;
    }

    const exponentialDelay = this.retryConfig.initialDelay * Math.pow(this.retryConfig.backoffMultiplier, retryCount);
    const jitteredDelay = exponentialDelay + Math.random() * 1000; // Agregar jitter
    return Math.min(jitteredDelay, this.retryConfig.maxDelay);
  }

  /**
   * Determinar si se debe reintentarbasado en el tipo de error y cuenta de intentos
   */
  shouldRetry(error: TriageError, currentRetryCount: number): boolean {
    if (!error.retryable) {
      return false;
    }

    if (currentRetryCount >= this.retryConfig.maxRetries) {
      return false;
    }

    // Para rate limits, verificar si ya pasó el tiempo de espera
    if (error.type === TriageErrorType.GEMINI_RATE_LIMIT) {
      const key = 'gemini_rate_limit';
      const lastReset = this.lastRateLimitReset.get(key) || 0;
      const now = Date.now();
      const timeSinceLastReset = now - lastReset;

      // Si han pasado más de 60 segundos desde el último reset, permitir retry
      if (timeSinceLastReset > 60000) {
        this.lastRateLimitReset.set(key, now);
        return true;
      }
      return false;
    }

    return true;
  }

  /**
   * Crear mensaje de error amigable para usuario
   */
  getUserFriendlyMessage(error: TriageError): string {
    const baseMessages: Record<TriageErrorType, string> = {
      [TriageErrorType.INVALID_INPUT]: 'Por favor describe tus síntomas de forma clara y detallada.',
      [TriageErrorType.INVALID_SCHEMA]: 'Error procesando respuesta médica. Por favor intenta de nuevo.',
      [TriageErrorType.SPAM_DETECTED]: 'La entrada parece inválida. Por favor describe síntomas reales.',
      [TriageErrorType.GEMINI_RATE_LIMIT]: 'Sistema sobrecargado. Por favor intenta en unos momentos.',
      [TriageErrorType.GEMINI_AUTH_ERROR]: 'Error de autenticación. Contacta a soporte técnico.',
      [TriageErrorType.GEMINI_TIMEOUT]: 'La IA tardó demasiado. Por favor intenta de nuevo.',
      [TriageErrorType.GEMINI_SERVER_ERROR]: 'Servidor de IA no disponible. Intenta en unos minutos.',
      [TriageErrorType.GEMINI_CONFIG_ERROR]: 'Sistema no configurado correctamente. Contacta a soporte.',
      [TriageErrorType.GEOLOCATION_DENIED]: 'Necesitamos acceso a tu ubicación para mejores recomendaciones.',
      [TriageErrorType.GEOLOCATION_UNAVAILABLE]: 'Tu ubicación no está disponible en este momento.',
      [TriageErrorType.GEOLOCATION_TIMEOUT]: 'No pudimos obtener tu ubicación a tiempo.',
      [TriageErrorType.FIRESTORE_ERROR]: 'Error al guardar tu evaluación. Por favor intenta de nuevo.',
      [TriageErrorType.FIRESTORE_AUTH]: 'Necesitas estar autenticado para guardar evaluaciones.',
      [TriageErrorType.NETWORK_OFFLINE]: 'Sin conexión a internet. Por favor verifica tu conexión.',
      [TriageErrorType.NETWORK_TIMEOUT]: 'Conexión lenta o interrumpida. Por favor intenta de nuevo.',
      [TriageErrorType.UNKNOWN_ERROR]: 'Error inesperado. Por favor intenta de nuevo más tarde.',
    };

    return baseMessages[error.type] || error.message;
  }

  /**
   * Log interno de error
   */
  private logError(error: TriageError): void {
    const emoji = error.retryable ? '⚠️' : '❌';
    console.error(`${emoji} [TRIAGE ERROR] ${error.type}:`, {
      message: error.message,
      statusCode: error.statusCode,
      retryable: error.retryable,
      context: error.context,
      originalError: error.originalError,
    });
  }

  /**
   * Obtener historial de errores
   */
  getErrorLog(): TriageError[] {
    return [...this.errorLog];
  }

  /**
   * Limpiar historial de errores
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }

  /**
   * Obtener último error
   */
  getLastError(): TriageError | null {
    return this.errorLog[this.errorLog.length - 1] || null;
  }
}

// Instancia singleton
let handlerInstance: TriageErrorHandler | null = null;

export function getTriageErrorHandler(): TriageErrorHandler {
  if (!handlerInstance) {
    handlerInstance = new TriageErrorHandler();
  }
  return handlerInstance;
}

/**
 * Helper para retry con exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
  shouldRetryFn?: (error: unknown, attempt: number) => boolean
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Verificar si debe reintentarse
      if (shouldRetryFn && !shouldRetryFn(error, attempt)) {
        throw error;
      }

      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt) + Math.random() * 1000;
        console.warn(`[RETRY] Intento ${attempt + 1} falló. Reintentando en ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}
