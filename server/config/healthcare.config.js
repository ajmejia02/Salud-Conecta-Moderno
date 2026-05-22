/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — Healthcare API Configuration
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Configuración centralizada para Google Cloud Healthcare API.
 * Auto-detecta el archivo JSON de credenciales dentro de /config/.
 * 
 * Variables de entorno requeridas (definidas en .env):
 *   - GCP_PROJECT_ID
 *   - GCP_LOCATION
 *   - GCP_DATASET_ID
 *   - GCP_FHIR_STORE_ID
 *   - GOOGLE_APPLICATION_CREDENTIALS (opcional, se auto-detecta)
 * 
 * @module server/config/healthcare.config
 */

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// ── Resolución de rutas (ESM compatible) ────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

/**
 * Auto-detecta el archivo JSON de credenciales de la cuenta de servicio
 * dentro del directorio /config/ del proyecto.
 * 
 * Busca archivos que coincidan con patrones comunes de credenciales GCP:
 *   - Archivos que empiezan con el project ID
 *   - Archivos que contienen "service" o "credential"
 *   - Cualquier .json en /config/ como fallback
 * 
 * @returns {string|null} Ruta absoluta al archivo de credenciales, o null
 */
function autoDetectCredentials() {
  const configDir = path.join(PROJECT_ROOT, 'config');

  // Si no existe el directorio /config/, retornar null
  if (!fs.existsSync(configDir)) {
    console.warn('[Healthcare Config] ⚠️  Directorio /config/ no encontrado.');
    return null;
  }

  // Obtener todos los archivos .json del directorio
  const jsonFiles = fs.readdirSync(configDir)
    .filter(f => f.endsWith('.json'));

  if (jsonFiles.length === 0) {
    console.warn('[Healthcare Config] ⚠️  No se encontraron archivos JSON en /config/.');
    return null;
  }

  // Prioridad 1: Archivo que contenga el project ID
  const projectId = process.env.GCP_PROJECT_ID || 'salud-conecta-ia';
  const matchProjectId = jsonFiles.find(f => f.includes(projectId));
  if (matchProjectId) {
    const fullPath = path.join(configDir, matchProjectId);
    console.log(`[Healthcare Config] ✅ Credenciales detectadas (por project ID): ${matchProjectId}`);
    return fullPath;
  }

  // Prioridad 2: Archivo que contenga "service" o "credential"
  const matchPattern = jsonFiles.find(f =>
    f.toLowerCase().includes('service') ||
    f.toLowerCase().includes('credential')
  );
  if (matchPattern) {
    const fullPath = path.join(configDir, matchPattern);
    console.log(`[Healthcare Config] ✅ Credenciales detectadas (por patrón): ${matchPattern}`);
    return fullPath;
  }

  // Prioridad 3: Primer JSON encontrado como fallback
  const fallbackPath = path.join(configDir, jsonFiles[0]);
  console.log(`[Healthcare Config] ✅ Credenciales detectadas (fallback): ${jsonFiles[0]}`);
  return fallbackPath;
}

/**
 * Resuelve la ruta de credenciales, priorizando la variable de entorno
 * sobre la auto-detección.
 * 
 * @returns {string|null} Ruta absoluta al archivo de credenciales
 */
function resolveCredentialsPath() {
  // Si se especificó en variable de entorno, usar esa
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const envPath = path.isAbsolute(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      ? process.env.GOOGLE_APPLICATION_CREDENTIALS
      : path.join(PROJECT_ROOT, process.env.GOOGLE_APPLICATION_CREDENTIALS);

    if (fs.existsSync(envPath)) {
      console.log(`[Healthcare Config] ✅ Credenciales desde env: ${path.basename(envPath)}`);
      return envPath;
    }
    console.warn(`[Healthcare Config] ⚠️  GOOGLE_APPLICATION_CREDENTIALS apunta a archivo inexistente: ${envPath}`);
  }

  // Auto-detectar en /config/
  return autoDetectCredentials();
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN EXPORTADA
// ═══════════════════════════════════════════════════════════════════════════════

const credentialsPath = resolveCredentialsPath();

/**
 * Configuración completa de Google Cloud Healthcare API.
 * 
 * @property {string} projectId         — ID del proyecto GCP
 * @property {string} location          — Región del dataset (ej: us-central1)
 * @property {string} datasetId         — Nombre del dataset Healthcare
 * @property {string} fhirStoreId       — Nombre del FHIR Store
 * @property {string} credentialsPath   — Ruta absoluta al JSON de credenciales
 * @property {string} fhirStorePath     — Path completo del FHIR Store para la API
 * @property {string} datasetPath       — Path completo del dataset para la API
 */
export const healthcareConfig = {
  // ── Identificadores GCP ───────────────────────────────────────────────────
  projectId: process.env.GCP_PROJECT_ID || 'salud-conecta-ia-497023',
  location: process.env.GCP_LOCATION || 'us-central1',
  datasetId: process.env.GCP_DATASET_ID || 'saludconecta-dataset',
  fhirStoreId: process.env.GCP_FHIR_STORE_ID || 'saludconecta-fhir',

  // ── Credenciales ──────────────────────────────────────────────────────────
  credentialsPath,

  // ── Paths construidos para la API ─────────────────────────────────────────
  get datasetPath() {
    return `projects/${this.projectId}/locations/${this.location}/datasets/${this.datasetId}`;
  },

  get fhirStorePath() {
    return `${this.datasetPath}/fhirStores/${this.fhirStoreId}`;
  },

  // ── Server ────────────────────────────────────────────────────────────────
  serverPort: parseInt(process.env.SERVER_PORT || '3001', 10),
};

/**
 * Valida que la configuración sea correcta y completa.
 * Lanza error si faltan componentes críticos.
 */
export function validateConfig() {
  const errors = [];

  if (!healthcareConfig.projectId) {
    errors.push('GCP_PROJECT_ID no configurado');
  }
  if (!healthcareConfig.location) {
    errors.push('GCP_LOCATION no configurado');
  }
  if (!healthcareConfig.datasetId) {
    errors.push('GCP_DATASET_ID no configurado');
  }
  if (!healthcareConfig.fhirStoreId) {
    errors.push('GCP_FHIR_STORE_ID no configurado');
  }
  if (!healthcareConfig.credentialsPath) {
    errors.push('No se encontró archivo de credenciales. Coloca el JSON de la cuenta de servicio en /config/');
  } else if (!fs.existsSync(healthcareConfig.credentialsPath)) {
    errors.push(`Archivo de credenciales no existe: ${healthcareConfig.credentialsPath}`);
  }

  if (errors.length > 0) {
    const errorMsg = `[Healthcare Config] ❌ Errores de configuración:\n  - ${errors.join('\n  - ')}`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  console.log('[Healthcare Config] ✅ Configuración validada correctamente');
  console.log(`  📂 FHIR Store: ${healthcareConfig.fhirStorePath}`);
  console.log(`  🔑 Credenciales: ${path.basename(healthcareConfig.credentialsPath)}`);

  return true;
}

export default healthcareConfig;
