/**
 * Language Preference Sync Service
 * Synchronizes language preference with:
 * - localStorage (local storage)
 * - Firestore (user profile in cloud)
 * - Cross-tab communication via BroadcastChannel
 */

import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import type { Language } from '../contexts/LanguageContext';

class LanguageSyncService {
  private broadcastChannel: BroadcastChannel | null = null;
  private initialized = false;

  /**
   * Initialize the sync service
   * Sets up cross-tab communication
   */
  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    // Cross-tab communication
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('language-sync');
        this.broadcastChannel.addEventListener('message', (event) => {
          this.handleCrossTabMessage(event);
        });
      } catch (e) {
        console.warn('[LanguageSyncService] BroadcastChannel not available');
      }
    }

    // Listen to storage changes (fallback for older browsers)
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  /**
   * Load language preference from best available source:
   * 1. Firestore (if user logged in)
   * 2. localStorage (local setting)
   * 3. Browser locale
   * 4. Default: Spanish
   */
  async loadLanguagePreference(): Promise<Language> {
    try {
      const user = auth.currentUser;

      if (user && db) {
        try {
          // Try to get from Firestore
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const firestoreLanguage = userSnap.data()?.language as Language | undefined;
            if (firestoreLanguage && ['es', 'en'].includes(firestoreLanguage)) {
              // Sync to localStorage if different
              const localLanguage = localStorage.getItem('language') as Language | null;
              if (localLanguage !== firestoreLanguage) {
                localStorage.setItem('language', firestoreLanguage);
              }
              return firestoreLanguage;
            }
          }
        } catch (e) {
          console.warn('[LanguageSyncService] Error loading from Firestore:', e);
        }
      }
    } catch (e) {
      console.warn('[LanguageSyncService] Error in loadLanguagePreference:', e);
    }

    // Fallback to localStorage
    const localLanguage = localStorage.getItem('language') as Language | null;
    if (localLanguage && ['es', 'en'].includes(localLanguage)) {
      return localLanguage;
    }

    // Try browser locale
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    if (browserLang === 'en') return 'en';

    // Default to Spanish
    return 'es';
  }

  /**
   * Save language preference to both localStorage and Firestore
   */
  async saveLanguagePreference(language: Language): Promise<void> {
    // Always save to localStorage first
    localStorage.setItem('language', language);

    // Notify other tabs
    this.broadcastLanguageChange(language);

    // Save to Firestore if user is logged in
    try {
      const user = auth.currentUser;
      if (user && db) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { language }, { merge: true });
      }
    } catch (e) {
      console.warn('[LanguageSyncService] Error saving to Firestore:', e);
      // Don't throw - localStorage save was successful
    }
  }

  /**
   * Broadcast language change to other tabs
   */
  private broadcastLanguageChange(language: Language) {
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({
          type: 'languageChange',
          language
        });
      } catch (e) {
        console.warn('[LanguageSyncService] Error broadcasting message:', e);
      }
    }
  }

  /**
   * Handle messages from other tabs
   */
  private handleCrossTabMessage(event: MessageEvent) {
    if (event.data.type === 'languageChange') {
      // Dispatch event for LanguageContext to listen to
      window.dispatchEvent(new CustomEvent('languageChangeFromOtherTab', {
        detail: { language: event.data.language }
      }));
    }
  }

  /**
   * Handle storage changes (fallback for browsers without BroadcastChannel)
   */
  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'language' && event.newValue) {
      const newLanguage = event.newValue as Language;
      if (['es', 'en'].includes(newLanguage)) {
        window.dispatchEvent(new CustomEvent('languageChangeFromOtherTab', {
          detail: { language: newLanguage }
        }));
      }
    }
  }

  /**
   * Cleanup resources
   */
  destroy() {
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
    this.initialized = false;
  }
}

export const languageSyncService = new LanguageSyncService();
