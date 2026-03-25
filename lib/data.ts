import { UserProfile, ThemeId } from './types';
import { storage } from './storage';

export const themeOptions: { id: ThemeId; name: string; colors: string[]; }[] = [
    { id: 'custom', name: 'Custom', colors: ['#ffffff', '#f3f3f1'] },
    { id: 'agate', name: 'Agate', colors: ['#10b981', '#064e3b'] },
    { id: 'air', name: 'Air', colors: ['#f8fafc', '#e2e8f0'] },
    { id: 'astrid', name: 'Astrid', colors: ['#0f172a', '#1e293b'] },
    { id: 'aura', name: 'Aura', colors: ['#fef3c7', '#f59e0b'] },
    { id: 'bliss', name: 'Bliss', colors: ['#e5e7eb', '#9ca3af'] },
    { id: 'blocks', name: 'Blocks', colors: ['#7c3aed', '#4c1d95'] },
    { id: 'bloom', name: 'Bloom', colors: ['#db2777', '#831843'] },
    { id: 'breeze', name: 'Breeze', colors: ['#fbcfe8', '#f9a8d4'] },
    { id: 'encore', name: 'Encore', colors: ['#171717', '#262626'] },
    { id: 'grid', name: 'Grid', colors: ['#d9f99d', '#84cc16'] },
    { id: 'groove', name: 'Groove', colors: ['#f97316', '#ea580c'] },
    { id: 'haven', name: 'Haven', colors: ['#d6d3d1', '#a8a29e'] },
    { id: 'lake', name: 'Lake', colors: ['#1e293b', '#334155'] },
    { id: 'mineral', name: 'Mineral', colors: ['#fff7ed', '#fdba74'] },
    { id: 'nourish', name: 'Nourish', colors: ['#4d7c0f', '#365314'] },
    { id: 'rise', name: 'Rise', colors: ['#fb923c', '#f97316'] },
    { id: 'sweat', name: 'Sweat', colors: ['#3b82f6', '#1d4ed8'] },
    { id: 'tress', name: 'Tress', colors: ['#92400e', '#78350f'] },
    { id: 'twilight', name: 'Twilight', colors: ['#581c87', '#3b0764'] },
    { id: 'vox', name: 'Vox', colors: ['#7f1d1d', '#991b1b'] },
    { id: 'light', name: 'Light', colors: ['#ffffff', '#f3f4f6'] },
    { id: 'dark', name: 'Dark', colors: ['#000000', '#111827'] },
    { id: 'blue', name: 'Blue', colors: ['#2563eb', '#1d4ed8'] },
    { id: 'purple', name: 'Purple', colors: ['#7c3aed', '#6d28d9'] },
    { id: 'sunset', name: 'Sunset', colors: ['#f59e0b', '#ef4444'] },
    { id: 'forest', name: 'Forest', colors: ['#059669', '#047857'] },
    { id: 'luxury', name: 'Luxury', colors: ['#1f2937', '#d4af37'] },
    { id: 'cyber', name: 'Cyber', colors: ['#0f0f23', '#00ff41'] },
    { id: 'mint', name: 'Mint', colors: ['#d1fae5', '#6ee7b7'] },
    { id: 'blush', name: 'Blush', colors: ['#fce7f3', '#f9a8d4'] },
    { id: 'midnight', name: 'Midnight', colors: ['#0f172a', '#6366f1'] },
    { id: 'coffee', name: 'Coffee', colors: ['#78350f', '#d4a574'] },
    { id: 'vibrant', name: 'Vibrant', colors: ['#dc2626', '#fbbf24'] },
    { id: 'concrete', name: 'Concrete', colors: ['#6b7280', '#9ca3af'] },
    { id: 'red-velvet', name: 'Red Velvet', colors: ['#991b1b', '#7f1d1d'] },
];

// Perfil de ejemplo para nuevos usuarios
export function createNewProfile(): UserProfile {
    return {
        id: crypto.randomUUID(),
        name: '',
        username: '',
        bio: '',
        avatar: 'https://ui-avatars.com/api/?name=User&background=random',
        theme: 'light',

        appearance: {
            buttonShape: 'rounded',
            buttonStyle: 'solid',
            buttonColor: '#000000',
            buttonTextColor: '#FFFFFF',
            socialLayout: 'list',
            socialColorMode: 'theme',
            socialIconStyle: 'filled',
            socialIconShape: 'circle',
            customBackground: undefined,
            customTextColor: undefined,
            // Header
            profileImageLayout: 'classic',
            coverImage: undefined,
            verified: false,
            titleStyle: 'text',
            titleSize: 'large',
            titleFont: 'Inter',
            titleColor: '#000000',
            // Wallpaper
            wallpaperStyle: undefined, // Default to theme
            backgroundColor: '#ffffff',
            gradientColor2: '#e2e8f0',
            customVideo: undefined,
            wallpaperNoise: false,
            wallpaperAnimate: false,
            wallpaperBlur: 0,
            wallpaperSaturation: 100,
            // Text
            pageFont: 'Inter',
            pageTextColor: '#000000',
            // Footer
            showBranding: true,
            footerText: ''
        },
        links: [
            { id: '1', title: 'Instagram', url: 'https://instagram.com', active: true, icon: 'instagram' },
            { id: '2', title: 'Facebook', url: 'https://facebook.com', active: true, icon: 'facebook' },
            { id: '3', title: 'WhatsApp', url: 'https://wa.me/', active: true, icon: 'whatsapp' },
        ],
        gallery: [],
        products: [],
        catalogActive: true,
        bankAccounts: [],
        businessInfo: {
            companyName: '',
            rnc: '',
            phone: '',
            email: '',
            website: '',
            address: '',
            active: false
        },
        menu: {
            active: false,
            businessName: '',
            currency: 'DOP',
            showPrices: true,
            showImages: true,
            layout: 'list',
            cardStyle: 'classic',
            note: '',
            categories: [],
            items: []
        },
        sectionOrder: ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business'],
        isVisible: true
    };
}

export const linkmasterProfile: UserProfile = {
    id: crypto.randomUUID(),
    name: '',
    username: '',
    bio: '',
    avatar: 'https://ui-avatars.com/api/?name=User&background=random',
    theme: 'light',

    appearance: {
        buttonShape: 'rounded',
        buttonStyle: 'solid',
        buttonColor: '#000000',
        buttonTextColor: '#FFFFFF',
        socialLayout: 'list',
        socialColorMode: 'theme',
        socialIconStyle: 'filled',
        socialIconShape: 'circle',
        customBackground: undefined,
        customTextColor: undefined,
        // Header
        profileImageLayout: 'classic',
        coverImage: undefined,
        verified: false,
        titleStyle: 'text',
        titleSize: 'large',
        titleFont: 'Inter',
        titleColor: '#000000',
        // Wallpaper
        wallpaperStyle: undefined, // Default to theme
        backgroundColor: '#ffffff',
        gradientColor2: '#e2e8f0',
        customVideo: undefined,
        wallpaperNoise: false,
        wallpaperAnimate: false,
        wallpaperBlur: 0,
        wallpaperSaturation: 100,
        // Text
        pageFont: 'Inter',
        pageTextColor: '#000000',
        // Footer
        showBranding: true,
        footerText: ''
    },
    links: [],
    gallery: [],
    products: [],
    catalogActive: true,
    bankAccounts: [],
    businessInfo: {
        companyName: '',
        rnc: '',
        phone: '',
        email: '',
        website: '',
        address: '',
        active: false
    },
    menu: {
        active: false,
        businessName: '',
        currency: 'DOP',
        showPrices: true,
        showImages: true,
        layout: 'list',
        cardStyle: 'classic',
        note: '',
        categories: [],
        items: []
    },
    sectionOrder: ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business'],
    isVisible: true
};

// Perfiles mock de ejemplo (solo para SSR/SSG cuando localStorage no esta disponible)
const mockProfiles: UserProfile[] = [
    {
        id: 'demo-1',
        name: 'El Fogon Criollo',
        username: 'elfogon',
        bio: 'Restaurante dominicano con sabor autentico. Comida criolla, mariscos y mas. Abierto de lunes a domingo.',
        avatar: 'https://ui-avatars.com/api/?name=El+Fogon&background=DC2626&color=fff&size=200',
        theme: 'sunset',
        appearance: {
            buttonShape: 'rounded',
            socialLayout: 'top_row',
            socialColorMode: 'brand',
            socialIconStyle: 'filled',
            socialIconShape: 'circle',
            customBackground: undefined,
            customTextColor: undefined
        },
        links: [
            { id: 'l1', title: 'Reservaciones WhatsApp', url: 'https://wa.me/18095551234', active: true, icon: 'whatsapp' },
            { id: 'l2', title: 'Siguenos en Instagram', url: 'https://instagram.com/elfogon', active: true, icon: 'instagram' },
            { id: 'l3', title: 'Pagina Web Oficial', url: 'https://elfogon.com.do', active: true, icon: 'website' },
            { id: 'l4', title: 'Facebook', url: 'https://facebook.com/elfogon', active: true, icon: 'facebook' },
            { id: 'l5', title: 'Pedidos Online', url: 'https://elfogon.com.do/pedidos', active: true, icon: 'store' },
            { id: 'l6', title: 'Email Catering', url: 'mailto:catering@elfogon.com.do', active: true, icon: 'email' },
        ],
        gallery: [],
        products: [
            {
                id: 'p1',
                name: 'Bandera Dominicana',
                price: 'RD$350',
                description: 'Arroz blanco, habichuelas rojas, carne guisada y ensalada',
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400',
                active: true
            },
            {
                id: 'p2',
                name: 'Chivo Guisado',
                price: 'RD$550',
                description: 'Chivo liniero al estilo tradicional con arroz y habichuelas',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
                active: true
            },
            {
                id: 'p3',
                name: 'Pescado Frito con Tostones',
                price: 'RD$650',
                description: 'Chillo entero frito crujiente con tostones y ensalada',
                image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=400',
                active: true
            },
            {
                id: 'p4',
                name: 'Mofongo de Camaron',
                price: 'RD$750',
                description: 'Mofongo relleno de camarones al ajillo',
                image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400',
                active: true
            },
        ],
        catalogActive: true,
        bankAccounts: [
            {
                id: 'b1',
                bankName: 'Banco Popular Dominicano',
                accountNumber: '799-123456-0',
                beneficiary: 'El Fogon Criollo SRL',
                clabe: '',
                accountType: 'corriente',
                currency: 'DOP',
                active: true
            },
            {
                id: 'b2',
                bankName: 'Banreservas',
                accountNumber: '010-234567-8',
                beneficiary: 'El Fogon Criollo SRL',
                clabe: '',
                accountType: 'ahorro',
                currency: 'USD',
                active: true
            },
        ],
        businessInfo: {
            companyName: 'El Fogon Criollo SRL',
            rnc: '131-56789-1',
            phone: '(809) 555-1234',
            email: 'info@elfogon.com.do',
            website: 'https://elfogon.com.do',
            address: 'Calle El Conde #45, Zona Colonial, Santo Domingo',
            active: true
        },
        menu: {
            active: true,
            businessName: 'El Fogon Criollo',
            currency: 'DOP',
            showPrices: true,
            showImages: true,
            layout: 'list',
            cardStyle: 'classic',
            note: '* ITBIS incluido. Propina 10% sugerida.',
            categories: [
                { id: 'cat1', name: 'Entradas', icon: '#DC2626', order: 0, active: true },
                { id: 'cat2', name: 'Platos Fuertes', icon: '#D97706', order: 1, active: true },
                { id: 'cat3', name: 'Mariscos', icon: '#0891B2', order: 2, active: true },
                { id: 'cat4', name: 'Bebidas', icon: '#059669', order: 3, active: true },
                { id: 'cat5', name: 'Postres', icon: '#BE185D', order: 4, active: true },
            ],
            items: [
                { id: 'm1', name: 'Tostones con Queso', description: 'Tostones crujientes con queso derretido y salsa rosa', price: '250', image: '', tags: ['popular'], available: true, categoryId: 'cat1' },
                { id: 'm2', name: 'Yaroa de Pollo', description: 'Platano maduro con pollo, queso y salsa', price: '320', image: '', tags: ['popular', 'nuevo'], available: true, categoryId: 'cat1' },
                { id: 'm3', name: 'Empanadas de Carne', description: 'Tres empanadas criollas con salsa picante', price: '180', image: '', tags: [], available: true, categoryId: 'cat1' },
                { id: 'm4', name: 'Bandera Dominicana', description: 'Arroz, habichuelas, carne guisada y ensalada', price: '350', image: '', tags: ['popular'], available: true, categoryId: 'cat2' },
                { id: 'm5', name: 'Chivo Guisado', description: 'Chivo liniero al estilo tradicional', price: '550', image: '', tags: [], available: true, categoryId: 'cat2' },
                { id: 'm6', name: 'Pollo al Horno', description: 'Medio pollo horneado con especias criollas', price: '450', image: '', tags: [], available: true, categoryId: 'cat2' },
                { id: 'm7', name: 'Mofongo de Cerdo', description: 'Mofongo relleno de cerdo guisado', price: '420', image: '', tags: ['popular'], available: true, categoryId: 'cat2' },
                { id: 'm8', name: 'Camarones al Ajillo', description: 'Camarones salteados en salsa de ajo y mantequilla', price: '750', image: '', tags: ['nuevo'], available: true, categoryId: 'cat3' },
                { id: 'm9', name: 'Pescado Frito', description: 'Chillo entero frito con tostones y ensalada', price: '650', image: '', tags: ['popular'], available: true, categoryId: 'cat3' },
                { id: 'm10', name: 'Lambí Guisado', description: 'Lambi en salsa criolla con arroz blanco', price: '850', image: '', tags: [], available: false, categoryId: 'cat3' },
                { id: 'm11', name: 'Jugo Natural', description: 'Chinola, naranja, limon o piña', price: '120', image: '', tags: ['vegano'], available: true, categoryId: 'cat4' },
                { id: 'm12', name: 'Morir Soñando', description: 'Leche con jugo de naranja y azucar', price: '150', image: '', tags: ['popular'], available: true, categoryId: 'cat4' },
                { id: 'm13', name: 'Presidente Fria', description: 'Cerveza Presidente bien fria', price: '200', image: '', tags: [], available: true, categoryId: 'cat4' },
                { id: 'm14', name: 'Habichuelas con Dulce', description: 'Postre tradicional dominicano cremoso', price: '180', image: '', tags: ['vegetariano', 'popular'], available: true, categoryId: 'cat5' },
                { id: 'm15', name: 'Flan de Coco', description: 'Flan casero de coco con caramelo', price: '200', image: '', tags: ['vegetariano'], available: true, categoryId: 'cat5' },
            ]
        },
        sectionOrder: ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business'],
        isVisible: true
    },
];

/**
 * Obtener perfil por username
 * Intenta primero desde localStorage, luego mock data
 */
export async function getProfileByUsername(username: string): Promise<UserProfile | null> {
    // Simular async para mantener compatibilidad con futuras llamadas a BD
    await new Promise(resolve => setTimeout(resolve, 0));

    // Intentar obtener desde localStorage (client-side)
    if (typeof window !== 'undefined') {
        const profile = storage.getProfileByUsername(username);
        if (profile) return profile;
    }

    // Fallback a mock profiles (para SSR)
    const profile = mockProfiles.find(p => p.username === username);
    return profile || null;
}

/**
 * Obtener todos los usernames disponibles
 */
export async function getAllUsernames(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 0));

    // Combinar usernames de localStorage y mock
    const storageUsernames = typeof window !== 'undefined' ? storage.getAllUsernames() : [];
    const mockUsernames = mockProfiles.map(p => p.username);

    // Unir y eliminar duplicados
    return [...new Set([...storageUsernames, ...mockUsernames])];
}

export const demoProfile = mockProfiles[0];
