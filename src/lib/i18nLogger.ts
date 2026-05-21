/**
 * i18n Logger - Development utility for tracking translation issues
 * Logs missing keys, untranslated strings, and placeholders
 */

import type { Language, Translations } from '../contexts/LanguageContext';

interface TranslationIssue {
  type: 'missing_key' | 'untranslated' | 'placeholder_mismatch';
  key: string;
  language: Language;
  message: string;
}

class I18nLogger {
  private issues: TranslationIssue[] = [];
  private seenKeys = new Set<string>();

  /**
   * Log a missing translation key
   */
  logMissingKey(key: string, language: Language, attemptedFallback: boolean = false) {
    if (process.env.NODE_ENV !== 'development') return;

    const message = attemptedFallback
      ? `Missing translation "${key}" in "${language}" (fallback to es attempted)`
      : `Missing translation "${key}" in "${language}"`;

    this.issues.push({
      type: 'missing_key',
      key,
      language,
      message
    });

    console.warn(`[i18n:warn] ${message}`);
  }

  /**
   * Log untranslated key (same in both languages)
   */
  logUntranslated(key: string, language: Language, value: string) {
    if (process.env.NODE_ENV !== 'development') return;

    const message = `Untranslated key: "${key}" in "${language}" = "${value}"`;
    
    this.issues.push({
      type: 'untranslated',
      key,
      language,
      message
    });

    console.info(`[i18n:info] ${message}`);
  }

  /**
   * Log placeholder mismatch
   */
  logPlaceholderMismatch(key: string, expectedPlaceholders: string[], providedPlaceholders: string[]) {
    if (process.env.NODE_ENV !== 'development') return;

    const missing = expectedPlaceholders.filter(p => !providedPlaceholders.includes(p));
    const extra = providedPlaceholders.filter(p => !expectedPlaceholders.includes(p));

    if (missing.length > 0 || extra.length > 0) {
      const message = `Placeholder mismatch in "${key}". ` +
        (missing.length > 0 ? `Missing: [${missing.join(', ')}]` : '') +
        (extra.length > 0 ? `Extra: [${extra.join(', ')}]` : '');

      this.issues.push({
        type: 'placeholder_mismatch',
        key,
        language: 'es',
        message
      });

      console.warn(`[i18n:warn] ${message}`);
    }
  }

  /**
   * Validate all keys exist in both languages
   */
  validateCompleteness(translations: Record<Language, Record<string, string>>) {
    if (process.env.NODE_ENV !== 'development') return;

    const esKeys = Object.keys(translations.es);
    const enKeys = Object.keys(translations.en);

    const missingInEn = esKeys.filter(k => !enKeys.includes(k));
    const missingInEs = enKeys.filter(k => !esKeys.includes(k));

    if (missingInEn.length > 0) {
      console.warn(`[i18n:validate] Missing in English: ${missingInEn.join(', ')}`);
    }

    if (missingInEs.length > 0) {
      console.warn(`[i18n:validate] Missing in Spanish: ${missingInEs.join(', ')}`);
    }

    return {
      missingInEn,
      missingInEs,
      isComplete: missingInEn.length === 0 && missingInEs.length === 0
    };
  }

  /**
   * Get all logged issues
   */
  getIssues(): TranslationIssue[] {
    return [...this.issues];
  }

  /**
   * Clear logged issues
   */
  clearIssues() {
    this.issues = [];
  }

  /**
   * Print summary of all issues
   */
  printSummary() {
    if (process.env.NODE_ENV !== 'development' || this.issues.length === 0) return;

    const grouped = {
      missing_key: this.issues.filter(i => i.type === 'missing_key'),
      untranslated: this.issues.filter(i => i.type === 'untranslated'),
      placeholder_mismatch: this.issues.filter(i => i.type === 'placeholder_mismatch')
    };

    console.group('📋 i18n Translation Issues Summary');
    
    if (grouped.missing_key.length > 0) {
      console.group(`❌ Missing Keys (${grouped.missing_key.length})`);
      grouped.missing_key.forEach(i => console.log(i.message));
      console.groupEnd();
    }

    if (grouped.untranslated.length > 0) {
      console.group(`⚠️  Untranslated (${grouped.untranslated.length})`);
      grouped.untranslated.forEach(i => console.log(i.message));
      console.groupEnd();
    }

    if (grouped.placeholder_mismatch.length > 0) {
      console.group(`🔄 Placeholder Mismatches (${grouped.placeholder_mismatch.length})`);
      grouped.placeholder_mismatch.forEach(i => console.log(i.message));
      console.groupEnd();
    }

    console.groupEnd();
  }
}

export const i18nLogger = new I18nLogger();
