
export interface Link {
    id: string;
    title: string;
    url: string;
    active: boolean;
    icon?: 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'tiktok' | 'linkedin' | 'whatsapp' | 'github' | 'website' | 'email' | 'store' | 'phone' | 'location' | 'spotify' | 'twitch' | 'discord' | 'telegram' | 'pinterest' | 'snapchat' | 'reddit' | 'amazon' | 'apple_music';
    customColor?: string;
    customTextColor?: string;
    shortCode?: string;
    clicks?: number;
    type?: 'profile' | 'shortener';
}

export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
    url?: string;
    active: boolean;
    type?: 'standard' | 'pdf';
    pdfUrl?: string;
    gallery?: string[]; // Multiple images for standard products
    category?: string;
    inStock?: boolean; // Default true
    variants?: ProductVariant[];
}

export interface ProductVariant {
    id: string;
    name: string; // e.g. "Size", "Color"
    options: string[]; // e.g. ["S", "M", "L", "Red", "Blue"]
    priceModifier?: number; // Optional
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    clabe?: string; // Standard for Mexico/Latin America
    beneficiary: string;
    cedula?: string;
    accountType?: 'ahorro' | 'corriente' | 'nomina';
    currency?: 'DOP' | 'USD' | 'EUR';
    active: boolean;
}

export interface BusinessInfo {
    companyName: string;
    rnc: string; // Tax ID
    phone: string;
    email: string;
    website: string;
    address: string;
    mapUrl?: string;
    active: boolean;
    showMap?: boolean;
}

export type ThemeId =
    | 'custom'
    | 'light' | 'dark' | 'blue' | 'purple'
    | 'sunset' | 'forest' | 'luxury' | 'cyber'
    | 'mint' | 'blush' | 'midnight' | 'coffee'
    | 'vibrant' | 'concrete' | 'red-velvet'
    // New Themes
    | 'agate' | 'air' | 'astrid' | 'aura' | 'bliss'
    | 'blocks' | 'bloom' | 'breeze' | 'encore'
    | 'grid' | 'groove' | 'haven' | 'lake' | 'mineral'
    | 'nourish' | 'rise' | 'sweat' | 'tress' | 'twilight' | 'vox';

export type ButtonShape = 'pill' | 'rounded' | 'square' | 'sharp' | 'soft';
export type SocialLayout = 'list' | 'top_row' | 'bottom_row' | 'grid';
export type SocialIconStyle = 'filled' | 'outline' | 'transparent';
export type SocialIconShape = 'circle' | 'rounded' | 'square';
export type SocialColorMode = 'theme' | 'brand';

export type MenuTag = 'vegetariano' | 'vegano' | 'sin_gluten' | 'picante' | 'popular' | 'nuevo';
export type MenuLayout = 'list' | 'grid';
export type MenuCardStyle = 'classic' | 'card' | 'minimal' | 'compact' | 'magazine';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    image?: string;
    tags: MenuTag[];
    available: boolean;
    categoryId: string;
}

export interface MenuCategory {
    id: string;
    name: string;
    icon: string; // category color identifier
    order: number;
    active: boolean;
}

export interface MenuConfig {
    active: boolean;
    businessName: string;
    currency: 'DOP' | 'USD' | 'EUR';
    showPrices: boolean;
    showImages: boolean;
    layout: MenuLayout;
    cardStyle: MenuCardStyle;
    note: string;
    categories: MenuCategory[];
    items: MenuItem[];
}

export interface UserProfile {
    id: string;
    name: string;
    username: string;
    email?: string;
    bio: string;
    avatar: string;
    theme: ThemeId;
    appearance: {
        // Buttons
        buttonShape: ButtonShape;
        socialLayout: SocialLayout;
        socialColorMode: SocialColorMode;
        socialIconStyle?: SocialIconStyle;
        socialIconShape?: SocialIconShape;
        customTextColor?: string;

        // Header
        profileImageLayout?: 'classic' | 'hero';
        coverImage?: string; // For Hero layout
        verified?: boolean; // Verified badge
        titleStyle?: 'text' | 'logo';
        titleSize?: 'small' | 'large';
        titleFont?: string;
        titleColor?: string;

        // Wallpaper
        wallpaperStyle?: 'fill' | 'gradient' | 'blur' | 'pattern' | 'image' | 'video';
        backgroundColor?: string;
        gradientColor2?: string;
        customBackground?: string; // Image URL
        customVideo?: string;     // Video URL
        wallpaperNoise?: boolean;
        wallpaperAnimate?: boolean;
        wallpaperBlur?: number;    // Filter blur (px)
        wallpaperSaturation?: number; // Filter saturate (%)

        // Text
        pageFont?: string;
        pageTextColor?: string;

        // Buttons extended
        buttonStyle?: 'solid' | 'glass' | 'outline';
        buttonRoundness?: 'square' | 'round' | 'rounder' | 'full';
        buttonColor?: string;
        buttonTextColor?: string;

        // Footer
        showBranding?: boolean;
        footerText?: string;
    };
    links: Link[];
    products: Product[];
    catalogActive?: boolean;
    gallery: { id: string; url: string; title?: string }[];
    bankAccounts: BankAccount[];
    businessInfo: BusinessInfo;
    menu: MenuConfig;
    catalogConfig?: CatalogConfig;
    sectionOrder: SectionType[];
    isVisible?: boolean; // Controls public visibility

    // Admin & System Fields
    isAdmin?: boolean;
    isBanned?: boolean;
    subscriptionPlan?: 'free' | 'pro' | 'business';
    createdAt?: string; // ISO Date
}

export type CatalogLayout = 'grid' | 'list' | 'carousel' | 'banner';

export interface CatalogConfig {
    layout: CatalogLayout;
    pdfUrl?: string;
    coverImage?: string;
    galleryImages?: string[];
    buttonText?: string; // e.g. "Descargar Catálogo"
    cardBackgroundColor?: string; // Custom override
    cardTextColor?: string;       // Custom override
}

// Newsletter
export interface Subscriber {
    email: string;
    date: string; // ISO
}

export interface NewsletterConfig {
    active: boolean;
    title: string;
    description: string;
    buttonText: string;
    successMessage: string;
    subscribers: Subscriber[];
}

// Crypto
export interface CryptoWallet {
    id: string;
    currency: 'BTC' | 'ETH' | 'SOL' | 'USDT';
    address: string;
    qrCode?: string; // Generated on the fly usually, but maybe stored
    label?: string; // e.g., "My Metamask"
    active: boolean;
}

export interface UserProfile {
    // ... existing fields ...
    newsletter?: NewsletterConfig;
    cryptoWallets?: CryptoWallet[];
    // ...
}

export type SectionType = 'hero' | 'links' | 'catalog' | 'menu' | 'business' | 'social' | 'bank' | 'newsletter';

export type ViewMode = 'links' | 'catalog' | 'bank' | 'business' | 'menu' | 'settings';

export interface Plan {
    id: number;
    name: string;
    price: number;
    interval: 'month' | 'year' | 'forever';
    features: string[];
    active: boolean;
}

export interface Coupon {
    id: number;
    code: string;
    discount: string;
    uses: number;
    maxUses: number;
    expiry: string;
    status: 'active' | 'expired';
}

export interface DomainRequest {
    id: number;
    user: string;
    domain: string;
    status: 'pending' | 'active' | 'rejected';
    date: string;
}

export interface DesignTemplate {
    id: number;
    name: string;
    users: number;
    preview: string;
}

export interface DesignAsset {
    id: number;
    name: string;
    type: 'background' | 'icon' | 'font';
    downloads: number;
}

export interface AppModule {
    id: string;
    name: string;
    active: boolean;
    icon: string;
}

export interface SystemSettings {
    maintenanceMode: boolean;
    allowRegistrations: boolean;
    globalAnnouncement: string | null;
    welcomeMessage: string;

    // SaaS Engine
    plans?: Plan[];
    coupons?: Coupon[];

    // Domains
    domains?: DomainRequest[];

    // Design
    designTemplates?: DesignTemplate[];
    designAssets?: DesignAsset[];

    // Content Modules
    modules?: AppModule[];

    // SEO Global
    seoTitle?: string;
    seoDescription?: string;

    // Scripts
    googleAnalyticsId?: string;
    facebookPixelId?: string;

    // Gateways
    stripePublicKey?: string;
    paypalClientId?: string;

    // Content
    blockedWords?: string[];
    enableAds?: boolean;
    adBannerCode?: string;

    // Landing Page Customization
    landingHeroTitle?: string;
    landingHeroSubtitle?: string;
    landingHeroButtonText?: string;
    landingHeroImage?: string; // URL or Base64
    landingPrimaryColor?: string; // Hex code
    landingSecondaryColor?: string; // Hex code

    // Fonts
    customFonts?: string[]; // Array of Google Fonts URLs
}
