/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — Google Cloud Healthcare API Client
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Cliente singleton autenticado para Google Cloud Healthcare API v1.
 * Usa google-auth-library para cargar credenciales del JSON de la
 * cuenta de servicio y crear un cliente autenticado de googleapis.
 * 
 * Scope requerido: https://www.googleapis.com/auth/cloud-healthcare
 * 
 * Uso:
 *   import { getHealthcareClient, getFhirClient } from './client.js';
 *   const healthcare = await getHealthcareClient();
 *   const fhir = await getFhirClient();
 * 
 * @module server/services/healthcare/client
 */

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { healthcareConfig } from '../../config/healthcare.config.js';

// ── Scope necesario para Cloud Healthcare API ───────────────────────────────
const HEALTHCARE_SCOPE = 'https://www.googleapis.com/auth/cloud-healthcare';

// ── Instancias singleton ────────────────────────────────────────────────────
let authClient = null;
let healthcareClient = null;

/**
 * Inicializa y retorna el cliente de autenticación de Google.
 * Usa las credenciales del archivo JSON de la cuenta de servicio.
 * Se cachea como singleton para reutilizar la misma autenticación.
 * 
 * @returns {Promise<GoogleAuth>} Cliente de autenticación configurado
 * @throws {Error} Si las credenciales no están disponibles
 */
export async function getAuthClient() {
  if (authClient) return authClient;

  try {
    authClient = new GoogleAuth({
      keyFile: healthcareConfig.credentialsPath,
      scopes: [HEALTHCARE_SCOPE],
    });

    // Verificar que las credenciales sean válidas obteniendo un token
    const client = await authClient.getClient();
    await client.getAccessToken();

    console.log('[Healthcare Client] ✅ Autenticación exitosa con cuenta de servicio');
    return authClient;
  } catch (error) {
    console.error('[Healthcare Client] ❌ Error de autenticación:', error.message);
    authClient = null; // Reset para reintentar
    throw new Error(`Error de autenticación con Healthcare API: ${error.message}`);
  }
}

/**
 * Retorna el cliente de Google Cloud Healthcare API v1.
 * Se cachea como singleton para reutilizar la misma instancia.
 * 
 * @returns {Promise<object>} Cliente healthcare de googleapis
 */
export async function getHealthcareClient() {
  if (healthcareClient) return healthcareClient;

  const auth = await getAuthClient();
  healthcareClient = google.healthcare({
    version: 'v1',
    auth,
  });

  console.log('[Healthcare Client] ✅ Cliente Healthcare API v1 inicializado');
  return healthcareClient;
}

/**
 * Retorna el sub-cliente FHIR del Healthcare API, listo para
 * operaciones CRUD sobre recursos FHIR (Patient, Observation, etc.)
 * 
 * Este es el cliente que se usa en la mayoría de las operaciones,
 * ya que opera directamente sobre el FHIR Store.
 * 
 * Métodos disponibles:
 *   - fhir.create()    → Crear recurso FHIR
 *   - fhir.read()      → Leer recurso por ID
 *   - fhir.update()    → Actualizar recurso
 *   - fhir.delete()    → Eliminar recurso
 *   - fhir.search()    → Buscar recursos con parámetros FHIR
 *   - fhir.executeBundle() → Ejecutar bundle de transacciones
 * 
 * @returns {Promise<object>} Sub-cliente FHIR del Healthcare API
 */
export async function getFhirClient() {
  const healthcare = await getHealthcareClient();
  return healthcare.projects.locations.datasets.fhirStores.fhir;
}

/**
 * Retorna el path completo del FHIR Store para usar en las llamadas API.
 * Formato: projects/{project}/locations/{location}/datasets/{dataset}/fhirStores/{fhirStore}
 * 
 * @returns {string} Path completo del FHIR Store
 */
export function getFhirStorePath() {
  return healthcareConfig.fhirStorePath;
}

/**
 * Verifica la conectividad con Healthcare API intentando acceder
 * a la metadata del FHIR Store.
 * 
 * Útil para health checks y validación inicial.
 * 
 * @returns {Promise<boolean>} true si la conexión es exitosa
 */
export async function testConnection() {
  try {
    const healthcare = await getHealthcareClient();
    
    // Intentar obtener la metadata del FHIR Store
    const result = await healthcare.projects.locations.datasets.fhirStores.get({
      name: healthcareConfig.fhirStorePath,
    });

    console.log('[Healthcare Client] ✅ Conexión verificada al FHIR Store');
    console.log(`  📦 Store: ${result.data.name}`);
    console.log(`  📋 Versión FHIR: ${result.data.version}`);
    
    return true;
  } catch (error) {
    console.error('[Healthcare Client] ❌ Error de conexión:', error.message);
    return false;
  }
}

export default {
  getAuthClient,
  getHealthcareClient,
  getFhirClient,
  getFhirStorePath,
  testConnection,
};
