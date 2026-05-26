import { buscarSintoma, buscarMultiplesSintomas, SINTOMAS } from './src/data/granadaDatabase';

console.log('=== TEST DE BÚSQUEDA DE SÍNTOMAS ===\n');

// Tests comunes
const testQueries = [
  'dolor de cabeza',
  'me duele la cabeza',
  'fiebre',
  'tengo fiebre',
  'vomitos',
  'me siento cansado',
  'fatiga',
  'nauseas',
  'dolor estómago',
  'a',  // Test límite mínimo
  'xyz', // Que no existe
];

console.log(`Total de síntomas en BD: ${SINTOMAS.length}\n`);

testQueries.forEach(query => {
  const result = buscarSintoma(query);
  const allResults = buscarMultiplesSintomas(query);
  
  console.log(`Query: "${query}"`);
  console.log(`  ✓ Encontrado: ${result ? result.nombre : 'NADA'}`);
  console.log(`  ✓ Total matches: ${allResults.length}`);
  if (allResults.length > 0) {
    allResults.slice(0, 2).forEach(r => console.log(`    - ${r.nombre}`));
  }
  console.log('');
});

// Mostrar primeros 5 síntomas y sus sinónimos
console.log('\n=== PRIMEROS 5 SÍNTOMAS Y SINÓNIMOS ===');
SINTOMAS.slice(0, 5).forEach(s => {
  console.log(`\nNombre: ${s.nombre}`);
  console.log(`Sinónimos: ${s.sinonimos.join(', ')}`);
});
