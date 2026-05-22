/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SALUD CONECTA IA — Healthcare API Test Script
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Script de prueba end-to-end que verifica la integración completa
 * con Google Cloud Healthcare API.
 * 
 * Ejecución:
 *   npm run test:healthcare
 *   — o —
 *   node server/scripts/test-healthcare.js
 * 
 * Pasos del test:
 *   1. Validar configuración
 *   2. Verificar conectividad con Healthcare API
 *   3. Crear un paciente FHIR de ejemplo
 *   4. Leer el paciente creado
 *   5. Listar todos los pacientes
 *   6. Crear observaciones (signos vitales)
 *   7. Crear un encuentro médico
 *   8. Obtener historial clínico completo
 *   9. Generar resumen Gemini-ready
 * 
 * @module server/scripts/test-healthcare
 */

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

// Imports de servicios
import { validateConfig } from '../config/healthcare.config.js';
import { testConnection } from '../services/healthcare/client.js';
import { createPatient, getPatient, listPatients } from '../services/healthcare/patient.service.js';
import { createVitalSigns, getPatientObservations } from '../services/healthcare/observation.service.js';
import { createEncounter, getPatientEncounters, createFullConsultation } from '../services/healthcare/encounter.service.js';
import { buildMedicalHistorySummary } from '../services/healthcare/fhir.helpers.js';

// ═══════════════════════════════════════════════════════════════════════════════
// DATOS DE EJEMPLO — Pacientes FHIR realistas (Nicaragua)
// ═══════════════════════════════════════════════════════════════════════════════

const SAMPLE_PATIENTS = [
  {
    firstName: 'María Elena',
    lastName: 'García López',
    birthDate: '1990-03-15',
    gender: 'female',
    identifier: '001-150390-0001X',
    phone: '+505-8888-1234',
    email: 'maria.garcia@email.com',
    address: 'Del parque central 2 cuadras al norte, Bo. La Inmaculada',
    city: 'Granada',
    state: 'Granada',
    country: 'NI',
    maritalStatus: 'M',
    language: 'es',
  },
  {
    firstName: 'Carlos Roberto',
    lastName: 'Flores Martínez',
    birthDate: '1985-07-22',
    gender: 'male',
    identifier: '001-220785-0002K',
    phone: '+505-7777-5678',
    email: 'carlos.flores@email.com',
    address: 'Km 45 Carretera Granada-Masaya',
    city: 'Granada',
    state: 'Granada',
    country: 'NI',
    maritalStatus: 'S',
    language: 'es',
  },
];

const SAMPLE_VITALS = {
  systolicBP: 120,
  diastolicBP: 80,
  heartRate: 72,
  temperature: 36.8,
  respiratoryRate: 18,
  oxygenSat: 98,
  weight: 65.5,
  height: 162,
};

const SAMPLE_ENCOUNTER = {
  class: 'AMB',
  type: 'Consulta de medicina general',
  reason: 'Revisión periódica de control + dolor de cabeza leve por 2 días',
  practitionerName: 'Dr. Roberto Antonio Flores',
  locationName: 'Centro de Salud Enrique Cisne Gómez — Granada',
  diagnosis: 'Cefalea tensional leve. Sin signos de alarma. Paciente estable.',
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEST RUNNER
// ═══════════════════════════════════════════════════════════════════════════════

async function runTests() {
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║  🧪 SALUD CONECTA IA — Healthcare API Integration Tests     ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  console.log('');

  let passed = 0;
  let failed = 0;
  let createdPatientId = null;

  // ── TEST 1: Validar configuración ─────────────────────────────────────
  console.log('━━━ TEST 1: Validar configuración ━━━━━━━━━━━━━━━━━━━━━━━━━━');
  try {
    validateConfig();
    console.log('✅ PASS — Configuración válida\n');
    passed++;
  } catch (error) {
    console.log(`❌ FAIL — ${error.message}\n`);
    failed++;
    console.log('\n⚠️  No se puede continuar sin configuración válida.');
    printSummary(passed, failed);
    process.exit(1);
  }

  // ── TEST 2: Verificar conectividad ────────────────────────────────────
  console.log('━━━ TEST 2: Verificar conectividad con Healthcare API ━━━━━━');
  try {
    const connected = await testConnection();
    if (connected) {
      console.log('✅ PASS — Conexión exitosa con FHIR Store\n');
      passed++;
    } else {
      console.log('❌ FAIL — No se pudo conectar con Healthcare API\n');
      failed++;
      console.log('\n⚠️  Verifica que la cuenta de servicio tenga los permisos correctos.');
      printSummary(passed, failed);
      process.exit(1);
    }
  } catch (error) {
    console.log(`❌ FAIL — ${error.message}\n`);
    failed++;
    printSummary(passed, failed);
    process.exit(1);
  }

  // ── TEST 3: Crear paciente ────────────────────────────────────────────
  console.log('━━━ TEST 3: Crear paciente FHIR ━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  try {
    const patient = await createPatient(SAMPLE_PATIENTS[0]);
    createdPatientId = patient.id;
    console.log(`✅ PASS — Paciente creado: ${patient.name?.[0]?.text}`);
    console.log(`   📋 ID: ${patient.id}`);
    console.log(`   🆔 Cédula: ${patient.identifier?.[0]?.value || 'N/A'}\n`);
    passed++;
  } catch (error) {
    console.log(`❌ FAIL — ${error.message}\n`);
    failed++;
  }

  // ── TEST 4: Leer paciente ─────────────────────────────────────────────
  if (createdPatientId) {
    console.log('━━━ TEST 4: Leer paciente por ID ━━━━━━━━━━━━━━━━━━━━━━━━━━');
    try {
      const patient = await getPatient(createdPatientId);
      console.log(`✅ PASS — Paciente leído: ${patient.name?.[0]?.text}`);
      console.log(`   📅 Nacimiento: ${patient.birthDate}`);
      console.log(`   🚻 Género: ${patient.gender}`);
      console.log(`   📱 Teléfono: ${patient.telecom?.[0]?.value || 'N/A'}\n`);
      passed++;
    } catch (error) {
      console.log(`❌ FAIL — ${error.message}\n`);
      failed++;
    }
  }

  // ── TEST 5: Listar pacientes ──────────────────────────────────────────
  console.log('━━━ TEST 5: Listar pacientes ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  try {
    const result = await listPatients();
    console.log(`✅ PASS — ${result.total} paciente(s) en el FHIR Store`);
    if (result.patients.length > 0) {
      result.patients.slice(0, 3).forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name?.[0]?.text || 'Sin nombre'} (ID: ${p.id})`);
      });
    }
    console.log('');
    passed++;
  } catch (error) {
    console.log(`❌ FAIL — ${error.message}\n`);
    failed++;
  }

  // ── TEST 6: Crear signos vitales ──────────────────────────────────────
  if (createdPatientId) {
    console.log('━━━ TEST 6: Crear signos vitales ━━━━━━━━━━━━━━━━━━━━━━━━━━');
    try {
      const vitals = await createVitalSigns(createdPatientId, SAMPLE_VITALS);
      console.log(`✅ PASS — ${vitals.length} signos vitales registrados`);
      vitals.forEach(v => {
        console.log(`   📊 ${v.code?.text}: ${v.valueQuantity?.value} ${v.valueQuantity?.unit}`);
      });
      console.log('');
      passed++;
    } catch (error) {
      console.log(`❌ FAIL — ${error.message}\n`);
      failed++;
    }
  }

  // ── TEST 7: Crear encuentro médico ────────────────────────────────────
  if (createdPatientId) {
    console.log('━━━ TEST 7: Crear encuentro médico ━━━━━━━━━━━━━━━━━━━━━━━━');
    try {
      const encounter = await createEncounter({
        patientId: createdPatientId,
        ...SAMPLE_ENCOUNTER,
      });
      console.log(`✅ PASS — Encuentro creado: ${encounter.id}`);
      console.log(`   🏥 Clase: ${encounter.class?.display}`);
      console.log(`   📋 Razón: ${encounter.reasonCode?.[0]?.text || SAMPLE_ENCOUNTER.reason}`);
      console.log(`   👨‍⚕️ Médico: ${SAMPLE_ENCOUNTER.practitionerName}\n`);
      passed++;
    } catch (error) {
      console.log(`❌ FAIL — ${error.message}\n`);
      failed++;
    }
  }

  // ── TEST 8: Obtener historial clínico ─────────────────────────────────
  if (createdPatientId) {
    console.log('━━━ TEST 8: Historial clínico completo (Gemini-ready) ━━━━━');
    try {
      const patient = await getPatient(createdPatientId);
      const { observations } = await getPatientObservations(createdPatientId);
      const { encounters } = await getPatientEncounters(createdPatientId);

      const history = buildMedicalHistorySummary(patient, observations, encounters);

      console.log(`✅ PASS — Historial clínico generado`);
      console.log(`   👤 Paciente: ${history.patient.name}`);
      console.log(`   📊 Signos vitales: ${history.vitalSigns.length}`);
      console.log(`   🏥 Consultas: ${history.encounters.length}`);
      console.log(`   🤖 Gemini-ready: ${history._geminiReady ? 'Sí' : 'No'}`);
      console.log('');
      console.log('   ── Resumen para Gemini ──');
      console.log(`   ${history.summary}`);
      console.log('');
      passed++;
    } catch (error) {
      console.log(`❌ FAIL — ${error.message}\n`);
      failed++;
    }
  }

  // ── RESUMEN ───────────────────────────────────────────────────────────
  printSummary(passed, failed);
}

function printSummary(passed, failed) {
  const total = passed + failed;
  console.log('');
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log(`║  📊 RESULTADOS: ${passed}/${total} tests pasaron                          ║`);
  console.log(`║  ${failed === 0 ? '✅ TODOS LOS TESTS PASARON' : `❌ ${failed} test(s) fallaron`}                              ║`);
  console.log('╚═══════════════════════════════════════════════════════════════╝');
  console.log('');

  if (failed === 0) {
    console.log('🎉 ¡Integración con Google Cloud Healthcare API exitosa!');
    console.log('');
    console.log('Próximos pasos:');
    console.log('  1. Ejecuta "npm run dev:server" para iniciar el backend');
    console.log('  2. Ejecuta "npm run dev" en otra terminal para el frontend');
    console.log('  3. Accede a http://localhost:3001/ para ver los endpoints');
    console.log('  4. Accede a http://localhost:3001/api/fhir/patients para ver pacientes');
  }
  console.log('');
}

// Ejecutar tests
runTests().catch(error => {
  console.error('\n❌ Error fatal en el test runner:', error);
  process.exit(1);
});
