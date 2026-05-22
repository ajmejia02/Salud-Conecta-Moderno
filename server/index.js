/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — Express Backend Server
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Servidor backend que actúa como proxy seguro entre el frontend React
 * y Google Cloud Healthcare API. Las credenciales de la cuenta de servicio
 * NUNCA se exponen al navegador.
 * 
 * Características:
 *   - Autenticación con cuenta de servicio GCP
 *   - Rutas FHIR RESTful (/api/fhir/*)
 *   - CORS configurado para desarrollo local
 *   - Middleware de autenticación Firebase (opcional)
 *   - Error handling centralizado
 *   - Health check endpoint
 * 
 * Uso:
 *   node server/index.js
 *   — o —
 *   npm run dev:server
 * 
 * @module server/index
 */

import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// ── Cargar variables de entorno ─────────────────────────────────────────────
// Busca .env en la raíz del proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(projectRoot, '.env') });

// ── Imports del servidor ────────────────────────────────────────────────────
import { healthcareConfig, validateConfig } from './config/healthcare.config.js';
import { authMiddleware } from './middleware/auth.js';
import healthcareRoutes from './routes/healthcare.routes.js';

const app = express();
const PORT = healthcareConfig.serverPort;

// ═══════════════════════════════════════════════════════════════════════════════
// MIDDLEWARE GLOBAL
// ═══════════════════════════════════════════════════════════════════════════════

// ── JSON body parser ────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── CORS — Permitir peticiones del frontend en desarrollo ───────────────────
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',     // Vite dev server
    'http://localhost:5173',     // Vite default port
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Responder inmediatamente a preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// ── Request logging ─────────────────────────────────────────────────────────
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().slice(11, 19);
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ── Auth middleware (aplica a todas las rutas /api/*) ────────────────────────
app.use('/api', authMiddleware);

// ═══════════════════════════════════════════════════════════════════════════════
// RUTAS
// ═══════════════════════════════════════════════════════════════════════════════

// ── Healthcare API FHIR routes ──────────────────────────────────────────────
app.use('/api/fhir', healthcareRoutes);

// ── Root endpoint — Info del servidor ───────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    service: 'Salud Conecta IA — Healthcare Backend',
    version: '1.0.0',
    description: 'Backend server para Google Cloud Healthcare API (FHIR R4)',
    endpoints: {
      health: 'GET /api/fhir/health',
      patients: {
        create: 'POST /api/fhir/patients',
        list: 'GET /api/fhir/patients',
        get: 'GET /api/fhir/patients/:id',
        update: 'PUT /api/fhir/patients/:id',
        delete: 'DELETE /api/fhir/patients/:id',
        search: 'GET /api/fhir/patients/search/:identifier',
      },
      observations: {
        create: 'POST /api/fhir/observations',
        getForPatient: 'GET /api/fhir/patients/:id/observations',
        createVitals: 'POST /api/fhir/patients/:id/vitals',
      },
      encounters: {
        create: 'POST /api/fhir/encounters',
        getForPatient: 'GET /api/fhir/patients/:id/encounters',
        complete: 'POST /api/fhir/encounters/:id/complete',
      },
      consultations: {
        createFull: 'POST /api/fhir/consultations',
      },
      history: {
        getMedicalHistory: 'GET /api/fhir/patients/:id/history',
      },
    },
    timestamp: new Date().toISOString(),
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════════

// ── 404 — Ruta no encontrada ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.method} ${req.path} no existe. Consulta GET / para ver las rutas disponibles.`,
    availableEndpoints: 'GET /',
  });
});

// ── Error handler global ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);

  res.status(err.status || 500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'production'
      ? 'Ocurrió un error inesperado. Por favor, intente de nuevo.'
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// INICIO DEL SERVIDOR
// ═══════════════════════════════════════════════════════════════════════════════

async function startServer() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  🏥 SALUD CONECTA IA — Healthcare Backend Server');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');

  try {
    // 1. Validar configuración de Healthcare API
    console.log('[Server] 🔧 Validando configuración...');
    validateConfig();

    // 2. Verificar conectividad con Healthcare API
    console.log('[Server] 🔗 Verificando conectividad con Healthcare API...');
    const { testConnection } = await import('./services/healthcare/client.js');
    const connected = await testConnection();

    if (!connected) {
      console.warn('[Server] ⚠️  No se pudo conectar con Healthcare API. El servidor iniciará pero las operaciones FHIR podrían fallar.');
    }

    // 3. Iniciar servidor Express
    app.listen(PORT, () => {
      console.log('');
      console.log(`[Server] ✅ Servidor iniciado en http://localhost:${PORT}`);
      console.log(`[Server] 📋 Endpoints disponibles en http://localhost:${PORT}/`);
      console.log(`[Server] 🏥 Health check: http://localhost:${PORT}/api/fhir/health`);
      console.log('');
      console.log('  Uso con frontend (Vite proxy):');
      console.log('    1. Terminal 1: npm run dev:server');
      console.log('    2. Terminal 2: npm run dev');
      console.log('    3. Frontend accede a /api/fhir/* automáticamente');
      console.log('');
      console.log('═══════════════════════════════════════════════════════════');
    });
  } catch (error) {
    console.error('');
    console.error('[Server] ❌ Error fatal al iniciar:', error.message);
    console.error('');
    console.error('  Verifica que:');
    console.error('    1. El archivo JSON de credenciales está en /config/');
    console.error('    2. Las variables de entorno están configuradas (.env)');
    console.error('    3. La cuenta de servicio tiene permisos de Healthcare API');
    console.error('');
    process.exit(1);
  }
}

startServer();
