
export interface Link {
  id: string;
  title: string;
  url: string;
  active: boolean;
  icon?: 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'tiktok' | 'linkedin' | 'whatsapp' | 'github' | 'website' | 'email' | 'store';
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  url?: string;
  active: boolean;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  clabe?: string; // Standard for Mexico/Latin America
  beneficiary: string;
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

export type ButtonShape = 'pill' | 'rounded' | 'square';
export type SocialLayout = 'list' | 'top_row' | 'bottom_row';
export type SocialColorMode = 'theme' | 'brand';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  theme: ThemeId;
  appearance: {
    buttonShape: ButtonShape;
    socialLayout: SocialLayout;
    socialColorMode: SocialColorMode;
    customBackground?: string;
    customTextColor?: string;
  };
  links: Link[];
  products: Product[];
  bankAccounts: BankAccount[];
  businessInfo: BusinessInfo;
}

export type ViewMode = 'links' | 'catalog' | 'bank' | 'business' | 'settings';