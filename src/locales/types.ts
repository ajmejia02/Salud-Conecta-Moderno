import type { Language } from '../contexts/LanguageContext';

export interface Locales {
    es: {
        'nav.triage': string;
        'nav.pharmacy': string;
        'nav.search': string;
        'nav.rewards': string;
        'nav.activity': string;
        'nav.history': string;
        'nav.appointments': string;
        'nav.membership': string;
        'nav.dashboard': string;
        'header.emergency': string;
        'header.notifications': string;
    };
    en: {
        'nav.triage': string;
        'nav.pharmacy': string;
        'nav.search': string;
        'nav.rewards': string;
        'nav.activity': string;
        'nav.history': string;
        'nav.appointments': string;
        'nav.membership': string;
        'nav.dashboard': string;
        'header.emergency': string;
        'header.notifications': string;
    };
}

export type IlluminateLanguage = Language;