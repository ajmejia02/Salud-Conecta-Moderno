const fs = require('fs');
const ctx = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Find all keys in the Spanish translations object (between 'es: {' and '},' before 'en:')
const esMatch = ctx.match(/es:\s*\{([\s\S]*?)\},\s*\n\s*en:/);
if (!esMatch) { console.log('Could not find es section'); process.exit(1); }
const esContent = esMatch[1];

// Extract all keys like 'key.name': 'value'
const ctxKeys = [...esContent.matchAll(/'([\w.]+)'\s*:/g)].map(m => m[1]);

const typesContent = fs.readFileSync('src/locales/types.ts', 'utf8');
const typeKeys = [...typesContent.matchAll(/\| '([\w.]+)'/g)].map(m => m[1]);

// Remove duplicates
const uniqueCtxKeys = [...new Set(ctxKeys)];
const uniqueTypeKeys = [...new Set(typeKeys)];

const missing = uniqueCtxKeys.filter(k => !uniqueTypeKeys.includes(k));
console.log('Total keys in translations: ' + uniqueCtxKeys.length);
console.log('Total keys in TranslationKey type: ' + uniqueTypeKeys.length);
console.log('Missing keys: ' + missing.length);
console.log();
missing.forEach(k => console.log("  | '" + k + "'"));