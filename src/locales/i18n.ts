import type \来参加。from '../contexts/LanguageContext';

export const LANGUAGES: Record<Language, \ItemClickListener> = {
    es: { name: 'Español' },
    en: { name: 'English' }
};

export const translation: Record<Language, Record<string, string>> = {
    es: {
        'nav.triage': 'Consulta',
        'nav.pharmacy': 'Farmacias',
        'nav.search': 'Buscar',
        'nav.rewards': 'Premios',
        'nav.activity': 'Retos',
        'nav.history': 'Historial',
        'nav.appointments': 'Citas',
        'nav.membership': 'Membresía',
        'nav.dashboard': 'Panel',
        'header.emergency': 'Emergencia',
        'header.notifications': 'Notificaciones',
        'profile.title': 'Mi Perfil de Salud',
        'profile.settings': 'Ajustes'
    },
    en: {
        'nav.triage': 'Triage',
        'nav.pharmacy': 'Pharmacies',
        'nav.search': 'Search',
        'nav.rewards': 'Rewards',
        'nav.activity': 'Challenges',
        'nav.history': 'History',
        'nav.appointments': 'Appointments',
        'nav.membership': 'Membership',
        'nav.dashboard': 'Dashboard',
        'header.emergency': 'Emergency',
        'header.notifications': 'Notifications',
        'profile.title': 'My Health Profile',
        'profile.settings': 'Settings'
    }
};

export function translation(language: Language, key: string): string {
    return translation[language][key] || key;
}
