#!/usr/bin/env node

/**
 * i18n Audit Script
 * 
 * Finds:
 * 1. Keys defined in translations but not used
 * 2. Keys used in code but not defined in translations
 * 3. Keys missing in English translations
 * 4. Keys missing in Spanish translations
 * 5. Placeholders in strings
 * 
 * Usage: node scripts/audit-i18n.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Extract defined translation keys
function extractDefinedKeys() {
  const contextPath = path.join(__dirname, '../src/contexts/LanguageContext.tsx');
  const content = fs.readFileSync(contextPath, 'utf-8');

  const esMatch = content.match(/const translations: Translations = \{[\s\S]*?es: \{([\s\S]*?)\},\s*en:/);
  const enMatch = content.match(/en: \{([\s\S]*?)\}\s*\}/);

  if (!esMatch || !enMatch) {
    log('red', 'Could not parse translations from LanguageContext.tsx');
    process.exit(1);
  }

  const extractKeys = (block) => {
    const keyMatches = block.match(/'([^']+)':/g);
    return keyMatches ? keyMatches.map(k => k.slice(1, -2)) : [];
  };

  return {
    es: extractKeys(esMatch[1]),
    en: extractKeys(enMatch[1])
  };
}

// Extract used keys from components
function extractUsedKeys() {
  const srcDir = path.join(__dirname, '../src');
  const usedKeys = new Set();

  function traverse(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && file !== 'node_modules') {
        traverse(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Find t('key') or t("key")
        const matches = content.match(/t\(['"]([^'"]+)['"]/g);
        if (matches) {
          matches.forEach(match => {
            const key = match.slice(3, -1);
            usedKeys.add(key);
          });
        }
      }
    }
  }

  traverse(srcDir);
  return Array.from(usedKeys).sort();
}

// Extract placeholders from translations
function extractPlaceholders(keys, translations) {
  const placeholders = {};

  keys.forEach(key => {
    const text = translations.es[key];
    if (text) {
      const matches = text.match(/\{(\w+)\}/g);
      if (matches) {
        placeholders[key] = matches.map(m => m.slice(1, -1));
      }
    }
  });

  return placeholders;
}

// Main audit
function runAudit() {
  log('cyan', '\n📋 Iniciando auditoría de traducción i18n...\n');

  const defined = extractDefinedKeys();
  const used = extractUsedKeys();

  const definedEs = new Set(defined.es);
  const definedEn = new Set(defined.en);
  const usedSet = new Set(used);

  // 1. Defined but not used
  const definedNotUsed = defined.es.filter(k => !usedSet.has(k));

  // 2. Used but not defined
  const usedNotDefined = used.filter(k => !definedEs.has(k));

  // 3. Missing in English
  const missingInEn = defined.es.filter(k => !definedEn.has(k));

  // 4. Missing in Spanish
  const missingInEs = defined.en.filter(k => !definedEs.has(k));

  // 5. Placeholders
  const placeholders = extractPlaceholders(defined.es, defined);

  // Report
  log('blue', `Total keys defined in Spanish: ${definedEs.size}`);
  log('blue', `Total keys defined in English: ${definedEn.size}`);
  log('blue', `Total keys used in code: ${usedSet.size}\n`);

  if (definedNotUsed.length > 0) {
    log('yellow', `⚠️  ${definedNotUsed.length} keys defined pero no usadas:`);
    definedNotUsed.slice(0, 10).forEach(k => log('yellow', `   - ${k}`));
    if (definedNotUsed.length > 10) {
      log('yellow', `   ... y ${definedNotUsed.length - 10} más\n`);
    } else {
      console.log('');
    }
  } else {
    log('green', '✅ Todas las keys definidas se usan\n');
  }

  if (usedNotDefined.length > 0) {
    log('red', `❌ ${usedNotDefined.length} keys usadas pero NO definidas:`);
    usedNotDefined.forEach(k => log('red', `   - ${k}`));
    console.log('');
  } else {
    log('green', '✅ Todas las keys usadas están definidas\n');
  }

  if (missingInEn.length > 0) {
    log('red', `❌ ${missingInEn.length} keys faltantes en English:`);
    missingInEn.slice(0, 10).forEach(k => log('red', `   - ${k}`));
    if (missingInEn.length > 10) {
      log('red', `   ... y ${missingInEn.length - 10} más\n`);
    } else {
      console.log('');
    }
  } else {
    log('green', '✅ Todas las keys existen en English\n');
  }

  if (missingInEs.length > 0) {
    log('yellow', `⚠️  ${missingInEs.length} keys faltantes en Spanish (en English):`);
    missingInEs.slice(0, 10).forEach(k => log('yellow', `   - ${k}`));
    if (missingInEs.length > 10) {
      log('yellow', `   ... y ${missingInEs.length - 10} más\n`);
    } else {
      console.log('');
    }
  } else {
    log('green', '✅ Todas las keys existen en Spanish\n');
  }

  if (Object.keys(placeholders).length > 0) {
    log('blue', `📝 Keys con placeholders (${Object.keys(placeholders).length}):`);
    Object.entries(placeholders).forEach(([key, ph]) => {
      log('blue', `   - ${key}: ${ph.join(', ')}`);
    });
    console.log('');
  }

  // Summary
  console.log('');
  const issuesCount = definedNotUsed.length + usedNotDefined.length + missingInEn.length + missingInEs.length;
  
  if (issuesCount === 0) {
    log('green', '✅ Auditoría completada: Sin problemas encontrados\n');
  } else {
    log('red', `⚠️  Auditoría completada: ${issuesCount} problemas encontrados\n`);
  }
}

runAudit();
