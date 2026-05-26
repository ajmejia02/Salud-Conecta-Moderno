// Prueba rápida de búsqueda de síntomas
import { buscarSintoma, buscarMultiplesSintomas, SINTOMAS } from './src/data/granadaDatabase';

console.log('🧪 TEST DE BÚSQUEDA MEJORADA v7');
console.log(`Total de síntomas: ${SINTOMAS.length}\n`);

const testCases = [
  // Consultas como las haría un usuario real
  { query: 'me duele la cabeza', esperado: 'Cefalea' },
  { query: 'tengo fiebre', esperado: 'Fiebre' },
  { query: 'vomitos', esperado: 'Vómito' },
  { query: 'me siento cansado', esperado: 'Astenia' },
  { query: 'tos', esperado: 'Tos' },
  { query: 'dolor estomacal', esperado: 'Dolor' },
  { query: 'mareos', esperado: 'Mareo' },
  { query: 'diarrea', esperado: 'Diarrea' },
  // Pruebas límite
  { query: 'cefalea', esperado: 'Cefalea' },
  { query: 'jaqueca', esperado: 'Cefalea' },  
  { query: 'xyz', esperado: null },
];

console.log('📋 RESULTADOS DE BÚSQUEDA:\n');

let aciertos = 0;
let fallos = 0;

testCases.forEach(test => {
  const resultado = buscarSintoma(test.query);
  const matches = buscarMultiplesSintomas(test.query);
  
  const acierto = resultado && resultado.nombre.toLowerCase().includes(test.esperado?.toLowerCase() || '');
  
  console.log(`Query: "${test.query}"`);
  console.log(`  ✓ Resultado: ${resultado ? resultado.nombre : '❌ NULL'}`);
  console.log(`  ✓ Matches: ${matches.length}`);
  if (matches.length > 0) {
    matches.slice(0, 3).forEach(m => console.log(`    - ${m.nombre}`));
  }
  console.log(`  ${acierto ? '✅ ACIERTO' : '❌ FALLO'}`);
  
  if (acierto) aciertos++;
  else fallos++;
  
  console.log('');
});

console.log(`\n📊 RESUMEN: ${aciertos}/${testCases.length} aciertos (${fallos} fallos)`);
