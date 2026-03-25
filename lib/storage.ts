import { UserProfile, SystemSettings } from './types';

const STORAGE_KEYS = {
    PROFILES: 'linkmaster_profiles',
    ACTIVE_ID: 'linkmaster_active_profile_id',
    SYSTEM_SETTINGS: 'linkmaster_system_settings',
} as const;

// Palabras reservadas que no se pueden usar como username
const RESERVED_USERNAMES = [
    'dashboard', 'api', 'admin', 'login', 'signup', 'settings',
    'new', 'profiles', 'edit', 'delete', 'about', 'contact',
    'help', 'support', 'terms', 'privacy', 'blog',
];

/**
 * Valida que el username cumpla con las reglas
 */
export function validateUsername(username: string): { valid: boolean; error?: string } {
    // Remover espacios
    username = username.trim().toLowerCase();

    // Mínimo 3 caracteres
    if (username.length < 3) {
        return { valid: false, error: 'El username debe tener al menos 3 caracteres' };
    }

    // Máximo 30 caracteres
    if (username.length > 30) {
        return { valid: false, error: 'El username no puede tener más de 30 caracteres' };
    }

    // Solo letras minúsculas, números y guiones
    if (!/^[a-z][a-z0-9-]*$/.test(username)) {
        return { valid: false, error: 'Solo letras minúsculas, números y guiones. Debe empezar con letra' };
    }

    // No puede terminar o empezar con guión
    if (username.startsWith('-') || username.endsWith('-')) {
        return { valid: false, error: 'No puede empezar o terminar con guión' };
    }

    // No guiones consecutivos
    if (username.includes('--')) {
        return { valid: false, error: 'No se permiten guiones consecutivos' };
    }

    // No palabras reservadas
    if (RESERVED_USERNAMES.includes(username)) {
        return { valid: false, error: 'Este username está reservado' };
    }

    return { valid: true };
}

/**
 * Obtener todos los perfiles desde localStorage
 */
export function getProfiles(): UserProfile[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.PROFILES);
        if (!stored) return [];
        return JSON.parse(stored);
    } catch (error) {
        console.error('Error loading profiles:', error);
        return [];
    }
}

/**
 * Guardar todos los perfiles en localStorage
 */
function saveProfiles(profiles: UserProfile[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    } catch (error) {
        console.error('Error saving profiles:', error);
    }
}

/**
 * Obtener el ID del perfil activo
 */
export function getActiveProfileId(): string | null {
    if (typeof window === 'undefined') return null;

    try {
        return localStorage.getItem(STORAGE_KEYS.ACTIVE_ID);
    } catch (error) {
        console.error('Error loading active profile ID:', error);
        return null;
    }
}

/**
 * Establecer el perfil activo
 */
export function setActiveProfileId(id: string): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ID, id);
    } catch (error) {
        console.error('Error saving active profile ID:', error);
    }
}

/**
 * Obtener un perfil por ID
 */
export function getProfileById(id: string): UserProfile | null {
    const profiles = getProfiles();
    return profiles.find(p => p.id === id) || null;
}

/**
 * Obtener un perfil por username
 */
export function getProfileByUsername(username: string): UserProfile | null {
    const profiles = getProfiles();
    return profiles.find(p => p.username.toLowerCase() === username.toLowerCase()) || null;
}

/**
 * Verificar si un username está disponible
 */
export function isUsernameAvailable(username: string, excludeId?: string): boolean {
    const profiles = getProfiles();
    return !profiles.some(p =>
        p.username.toLowerCase() === username.toLowerCase() && p.id !== excludeId
    );
}

/**
 * Crear un nuevo perfil
 */
export function createProfile(data: {
    username: string;
    name: string;
    bio?: string;
    avatar?: string;
}): { success: boolean; profile?: UserProfile; error?: string } {
    // Validar username
    const validation = validateUsername(data.username);
    if (!validation.valid) {
        return { success: false, error: validation.error };
    }

    // Verificar disponibilidad
    if (!isUsernameAvailable(data.username)) {
        return { success: false, error: 'Este username ya está en uso' };
    }

    // Crear perfil
    const newProfile: UserProfile = {
        id: crypto.randomUUID(),
        username: data.username.toLowerCase().trim(),
        name: data.name.trim(),
        bio: data.bio?.trim() || '',
        avatar: data.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
        theme: 'light',
        appearance: {
            buttonShape: 'rounded',
            socialLayout: 'list',
            socialColorMode: 'theme',
            customBackground: undefined,
            customTextColor: undefined,
        },
        links: [],
        products: [],
        bankAccounts: [],
        businessInfo: {
            companyName: '',
            rnc: '',
            phone: '',
            email: '',
            website: '',
            address: '',
            active: false,
        },
        menu: {
            active: false,
            businessName: data.name,
            currency: 'DOP',
            showPrices: true,
            showImages: true,
            layout: 'list',
            cardStyle: 'minimal',
            note: '',
            categories: [],
            items: []
        },
        sectionOrder: ['hero', 'links', 'social'],
        catalogActive: false,
        gallery: [],
    };

    // Guardar
    const profiles = getProfiles();
    profiles.push(newProfile);
    saveProfiles(profiles);

    // Establecer como activo
    setActiveProfileId(newProfile.id);

    return { success: true, profile: newProfile };
}

/**
 * Actualizar un perfil existente
 */
export function updateProfile(id: string, updates: Partial<UserProfile>): { success: boolean; error?: string } {
    const profiles = getProfiles();
    const index = profiles.findIndex(p => p.id === id);

    if (index === -1) {
        return { success: false, error: 'Perfil no encontrado' };
    }

    // Si se está actualizando el username, validar
    if (updates.username && updates.username !== profiles[index].username) {
        const validation = validateUsername(updates.username);
        if (!validation.valid) {
            return { success: false, error: validation.error };
        }

        if (!isUsernameAvailable(updates.username, id)) {
            return { success: false, error: 'Este username ya está en uso' };
        }

        updates.username = updates.username.toLowerCase().trim();
    }

    // Actualizar
    profiles[index] = { ...profiles[index], ...updates };
    saveProfiles(profiles);

    return { success: true };
}

/**
 * Eliminar un perfil
 */
export function deleteProfile(id: string): { success: boolean; error?: string } {
    const profiles = getProfiles();
    const filtered = profiles.filter(p => p.id !== id);

    if (filtered.length === profiles.length) {
        return { success: false, error: 'Perfil no encontrado' };
    }

    saveProfiles(filtered);

    // Si era el activo, limpiar
    if (getActiveProfileId() === id) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_ID);
    }

    return { success: true };
}

/**
 * Obtener todos los usernames (para SSG)
 */
export function getAllUsernames(): string[] {
    const profiles = getProfiles();
    return profiles.map(p => p.username);
}

/**
 * Exportar la interfaz unificada
 */
export const storage = {
    getProfiles,
    getActiveProfileId,
    setActiveProfileId,
    getProfileById,
    getProfileByUsername,
    isUsernameAvailable,
    createProfile,
    updateProfile,
    deleteProfile,
    getAllUsernames,
    validateUsername,

    // --- System Settings ---
    saveSystemSettings: (settings: SystemSettings) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(STORAGE_KEYS.SYSTEM_SETTINGS, JSON.stringify(settings));
            }
        } catch (e) {
            console.error('Error saving system settings', e);
        }
    },

    getSystemSettings: (): SystemSettings => {
        try {
            if (typeof window !== 'undefined') {
                const data = localStorage.getItem(STORAGE_KEYS.SYSTEM_SETTINGS);
                if (data) return JSON.parse(data);
            }
        } catch (e) {
            console.error('Error parsing system settings', e);
        }
        // Default settings
        return {
            maintenanceMode: false,
            allowRegistrations: true,
            globalAnnouncement: null,
            welcomeMessage: '¡Bienvenido a LinkMaster!',
            seoTitle: 'LinkMaster - Tu Bio Link Profesional',

            // SaaS Engine
            plans: [
                { id: 1, name: 'Free', price: 0, interval: 'forever', features: ['1 Link', 'Basic Analytics'], active: true },
                { id: 2, name: 'Pro', price: 9, interval: 'month', features: ['Unlimited Links', 'Custom Domain', 'Remove Branding'], active: true },
                { id: 3, name: 'Business', price: 29, interval: 'month', features: ['All Pro features', 'Priority Support', 'API Access'], active: true },
            ],
            coupons: [
                { id: 1, code: 'WELCOME20', discount: '20%', uses: 45, maxUses: 100, expiry: '2024-12-31', status: 'active' },
                { id: 2, code: 'BLACKFRIDAY', discount: '50%', uses: 120, maxUses: 500, expiry: '2024-11-30', status: 'expired' },
            ],

            // Domains
            domains: [
                { id: 1, user: 'alex_design', domain: 'alex.design', status: 'pending', date: '2024-03-10' },
                { id: 2, user: 'cafe_central', domain: 'cafecentral.com', status: 'active', date: '2024-03-08' },
                { id: 3, user: 'tech_store', domain: 'techstore.io', status: 'rejected', date: '2024-03-05' },
                { id: 4, user: 'maria_art', domain: 'maria.art', status: 'pending', date: '2024-03-12' },
            ],

            // Design
            designTemplates: [
                { id: 1, name: 'Minimalist Dark', users: 1205, preview: 'bg-gray-900 border-gray-800' },
                { id: 2, name: 'Neon Vibes', users: 850, preview: 'bg-black border-purple-500' },
                { id: 3, name: 'Summer Breeze', users: 600, preview: 'bg-blue-100 border-blue-300' },
            ],
            designAssets: [
                { id: 1, name: 'Gradient Pack 1', type: 'background', downloads: 340 },
                { id: 2, name: 'Social Icons 3D', type: 'icon', downloads: 120 },
            ],

            // Content Modules
            modules: [
                { id: 'tiktok', name: 'TikTok Integration', active: true, icon: 'video' },
                { id: 'youtube', name: 'YouTube Embeds', active: true, icon: 'youtube' },
                { id: 'spotify', name: 'Spotify Player', active: true, icon: 'music' },
                { id: 'maps', name: 'Google Maps', active: false, icon: 'map' },
                { id: 'newsletter', name: 'Newsletter Module', active: true, icon: 'mail' },
                { id: 'shortener', name: 'Link Shortener', active: true, icon: 'link' },
                { id: 'ai_assistant', name: 'AI Magic Writer', active: true, icon: 'sparkles' },
                { id: 'qr_art', name: 'QR Code Art', active: true, icon: 'qr-code' },
            ]
        };
    }
};
