const fs = require('fs');
const ctx = fs.readFileSync('src/contexts/LanguageContext.tsx', 'utf8');

// Find all keys in BOTH the Spanish (es) and English (en) translations objects
const esMatch = ctx.match(/es:\s*\{([\s\S]*?)\},\s*\n\s*en:/);
const enMatch = ctx.match(/en:\s*\{([\s\S]*?)\}\s*;/);

const esContent = esMatch[1];
const enContent = enMatch[1];

// Extract all keys from both sections
const esKeys = [...esContent.matchAll(/'([\w.]+)'\s*:/g)].map(m => m[1]);
const enKeys = [...enContent.matchAll(/'([\w.]+)'\s*:/g)].map(m => m[1]);

// Combine and deduplicate
const allKeys = [...new Set([...esKeys, ...enKeys])].sort();

let output = `import type { Language } from '../contexts/LanguageContext';

/**
 * Translation keys type - provides full type safety for all translation strings
 * 
 * Usage:
 * \`\`\`ts
 * const key: TranslationKey = 'nav.triage';  // ✅ Valid
 * const key: TranslationKey = 'invalid.key'; // ❌ TypeScript error
 * \`\`\`
 */
export type TranslationKey =
`;

for (const key of allKeys) {
    output += `  | '${key}'\n`;
}

output += ';\n';

fs.writeFileSync('src/locales/types.ts', output);
console.log(`Generated TranslationKey type with ${allKeys.length} keys.`);

// Also check keys used in components that are missing
const usedIn = ctx.match(/'([\w.]+)'/g);
const usedKeys = [...new Set(usedIn.map(k => k.replace(/'/g, '')))]
    .filter(k => /^[\w.]+$/.test(k) && k.includes('.')) // filter to look like translation keys
    .sort();

const notInTranslations = usedKeys.filter(k => !allKeys.includes(k));
if (notInTranslations.length > 0) {
    console.log('\nKeys used in components but NOT in translations:');
    notInTranslations.forEach(k => console.log('  ' + k));
}