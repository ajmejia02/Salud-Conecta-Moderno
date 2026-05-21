/**
 * triageCacheManager.ts
 * 
 * Cache en memoria para resultados de triaje.
 * Evita re-evaluaciones innecesarias de síntomas idénticos o similares.
 * Respeta rate limits mediante cache inteligente.
 */

import { TriageWithLocationResult } from '../services/triageService';

export interface CacheEntry {
  symptoms: string;
  result: TriageWithLocationResult;
  timestamp: number;
  expiresAt: number;
  hits: number;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  oldestEntry?: { symptoms: string; age: number };
  newestEntry?: { symptoms: string; age: number };
}

/**
 * Configuración del cache
 */
export interface CacheConfig {
  maxSize: number; // Máximo de entradas
  ttl: number; // Time to live en ms
  similarityThreshold: number; // Umbral de similitud (0-1)
}

const DEFAULT_CACHE_CONFIG: CacheConfig = {
  maxSize: 50,
  ttl: 24 * 60 * 60 * 1000, // 24 horas
  similarityThreshold: 0.8, // 80% similar
};

/**
 * Calcular similitud entre dos strings (Levenshtein distance normalizado)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;

  const matrix: number[][] = [];

  for (let i = 0; i <= s2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= s1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s2.length; i++) {
    for (let j = 1; j <= s1.length; j++) {
      if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  const distance = matrix[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  return 1 - distance / maxLen;
}

/**
 * Gestor de cache para resultados de triaje
 */
export class TriageCacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private stats = {
    hits: 0,
    misses: 0,
  };
  private config: CacheConfig = DEFAULT_CACHE_CONFIG;

  constructor(config?: Partial<CacheConfig>) {
    if (config) {
      this.config = { ...DEFAULT_CACHE_CONFIG, ...config };
    }
    this.initializeCleanupInterval();
  }

  /**
   * Limpiar entradas expiradas cada 5 minutos
   */
  private initializeCleanupInterval(): void {
    if (typeof window !== 'undefined') {
      setInterval(() => {
        this.cleanup();
      }, 5 * 60 * 1000);
    }
  }

  /**
   * Generar key para cache (hash simple)
   */
  private generateKey(symptoms: string): string {
    return `triage:${symptoms.toLowerCase().trim().substring(0, 100)}`;
  }

  /**
   * Obtener resultado de cache (búsqueda exacta)
   */
  get(symptoms: string): TriageWithLocationResult | null {
    const key = this.generateKey(symptoms);
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Verificar si expiró
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }

    // Hit! Actualizar stats
    entry.hits++;
    this.stats.hits++;
    console.log(`[CACHE] Hit para síntomas (${entry.hits} hits)`);
    return entry.result;
  }

  /**
   * Obtener resultado similar al síntoma (búsqueda fuzzy)
   */
  getSimilar(symptoms: string): TriageWithLocationResult | null {
    const currentKey = this.generateKey(symptoms);
    let bestMatch: CacheEntry | null = null;
    let bestSimilarity = this.config.similarityThreshold;

    for (const [key, entry] of this.cache.entries()) {
      if (key === currentKey) continue; // Saltar búsqueda exacta

      // Verificar si expiró
      if (Date.now() > entry.expiresAt) {
        this.cache.delete(key);
        continue;
      }

      const similarity = calculateSimilarity(symptoms, entry.symptoms);
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestMatch = entry;
      }
    }

    if (bestMatch) {
      bestMatch.hits++;
      this.stats.hits++;
      console.log(
        `[CACHE] Similar match encontrado (${(bestSimilarity * 100).toFixed(0)}% similitud)`
      );
      return bestMatch.result;
    }

    this.stats.misses++;
    return null;
  }

  /**
   * Guardar resultado en cache
   */
  set(symptoms: string, result: TriageWithLocationResult): void {
    const key = this.generateKey(symptoms);

    // Si estamos en el límite, remover el menos usado
    if (this.cache.size >= this.config.maxSize) {
      this.evictLRU();
    }

    const entry: CacheEntry = {
      symptoms,
      result,
      timestamp: Date.now(),
      expiresAt: Date.now() + this.config.ttl,
      hits: 0,
    };

    this.cache.set(key, entry);
    console.log(`[CACHE] Guardado: ${symptoms.substring(0, 50)}...`);
  }

  /**
   * Evict Least Recently Used entry
   */
  private evictLRU(): void {
    let lruKey: string | null = null;
    let lruEntry: CacheEntry | null = null;

    for (const [key, entry] of this.cache.entries()) {
      if (!lruEntry || entry.timestamp < lruEntry.timestamp) {
        lruKey = key;
        lruEntry = entry;
      }
    }

    if (lruKey) {
      this.cache.delete(lruKey);
      console.log(`[CACHE] Evicted LRU entry: ${lruEntry?.symptoms.substring(0, 30)}...`);
    }
  }

  /**
   * Limpiar entradas expiradas
   */
  private cleanup(): void {
    const now = Date.now();
    let removed = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
        removed++;
      }
    }

    if (removed > 0) {
      console.log(`[CACHE] Cleanup: ${removed} entradas expiradas removidas`);
    }
  }

  /**
   * Limpiar todo el cache
   */
  clear(): void {
    this.cache.clear();
    console.log('[CACHE] Cache limpiado completamente');
  }

  /**
   * Obtener estadísticas del cache
   */
  getStats(): CacheStats {
    const entries = Array.from(this.cache.values());
    const now = Date.now();

    const stats: CacheStats = {
      size: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRate: this.stats.hits + this.stats.misses > 0
        ? this.stats.hits / (this.stats.hits + this.stats.misses)
        : 0,
    };

    if (entries.length > 0) {
      const oldest = entries.reduce((a, b) => a.timestamp < b.timestamp ? a : b);
      const newest = entries.reduce((a, b) => a.timestamp > b.timestamp ? a : b);

      stats.oldestEntry = {
        symptoms: oldest.symptoms.substring(0, 30),
        age: now - oldest.timestamp,
      };

      stats.newestEntry = {
        symptoms: newest.symptoms.substring(0, 30),
        age: now - newest.timestamp,
      };
    }

    return stats;
  }

  /**
   * Obtener información de debugging
   */
  getDebugInfo(): string {
    const stats = this.getStats();
    return `
Cache Stats:
- Size: ${stats.size}/${this.config.maxSize}
- Hits: ${stats.hits}, Misses: ${stats.misses}
- Hit Rate: ${(stats.hitRate * 100).toFixed(1)}%
- TTL: ${(this.config.ttl / 1000 / 60).toFixed(0)} minutos
- Oldest: ${stats.oldestEntry?.symptoms} (${(stats.oldestEntry?.age || 0 / 1000).toFixed(0)}s)
- Newest: ${stats.newestEntry?.symptoms} (${(stats.newestEntry?.age || 0 / 1000).toFixed(0)}s)
    `.trim();
  }
}

// Instancia singleton
let cacheInstance: TriageCacheManager | null = null;

export function getTriageCacheManager(): TriageCacheManager {
  if (!cacheInstance) {
    cacheInstance = new TriageCacheManager();
  }
  return cacheInstance;
}
