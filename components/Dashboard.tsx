'use client';

import React, { useState } from 'react';
import { UserProfile, Link, Product, BankAccount } from '@/lib/types';
import MobilePreview from './MobilePreview';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfiles } from '@/contexts/ProfileContext';

// Subcomponents
import MobileNavBar from './dashboard/MobileNavBar';

// Subcomponents
import Sidebar from './dashboard/Sidebar';
import LinkEditor from './dashboard/LinkEditor';
import ProductEditor from './dashboard/ProductEditor';
import BankEditor from './dashboard/BankEditor';
import BusinessEditor from './dashboard/BusinessEditor';
import AppearanceEditor from './dashboard/AppearanceEditor';
import ShareWidget from './dashboard/ShareWidget';

interface DashboardProps {
  onLogout: () => void;
  customContent?: React.ReactNode;
}

export default function Dashboard({ onLogout, customContent }: DashboardProps) {
  // Use ProfileContext instead of local state
  const { activeProfile, updateProfile } = useProfiles();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Kept for logic compatibility but unused on mobile now
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  // AI Loading States
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  // If no active profile, show message (this shouldn't happen due to redirect in page.tsx)
  if (!activeProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay perfil activo</h2>
          <p className="text-gray-600">Por favor, selecciona o crea un perfil</p>
        </div>
      </div>
    );
  }

  // Auto-save helper function
  const saveProfile = (updates: Partial<UserProfile>) => {
    updateProfile(activeProfile.id, updates);
  };

  // --- Field Handlers ---

  const handleUpdateField = (field: keyof UserProfile, value: any) => {
    saveProfile({ [field]: value });
  };

  const handleUpdateAppearance = (field: keyof UserProfile['appearance'] | Partial<UserProfile['appearance']>, value?: any) => {
    if (typeof field === 'object') {
      saveProfile({
        appearance: {
          ...activeProfile.appearance,
          ...field,
        },
      });
    } else {
      saveProfile({
        appearance: {
          ...activeProfile.appearance,
          [field]: value,
        },
      });
    }
  };

  const handleUpdateBusinessInfo = (field: keyof UserProfile['businessInfo'], value: any) => {
    saveProfile({
      businessInfo: {
        ...activeProfile.businessInfo,
        [field]: value,
      },
    });
  };

  const handleGenerateBio = async () => {
    setIsGeneratingBio(true);
    const keywords = activeProfile.bio.length > 5 ? activeProfile.bio : "Emprendedor, Negocios, Profesional";

    try {
      const response = await fetch('/api/gemini/bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: activeProfile.name, keywords }),
      });
      const data = await response.json();
      handleUpdateField('bio', data.bio || 'Error generando bio');
    } catch (error) {
      console.error('Error generating bio:', error);
      handleUpdateField('bio', 'Error: No se pudo generar la biografía');
    }

    setIsGeneratingBio(false);
  };

  const handleOptimizeDescription = async (productId: string) => {
    const product = activeProfile.products.find(p => p.id === productId);
    if (!product) return;

    setLoadingProduct(productId);

    try {
      const response = await fetch('/api/gemini/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          currentDescription: product.description
        }),
      });
      const data = await response.json();

      updateProfile(activeProfile.id, {
        products: activeProfile.products.map(prod =>
          prod.id === productId ? { ...prod, description: data.description || product.description } : prod
        )
      });
    } catch (error) {
      console.error('Error optimizing description:', error);
    }

    setLoadingProduct(null);
  };

  // --- CRUD Operations
  // Link CRUD
  const handleAddLink = () => {
    const newLink: Link = {
      id: crypto.randomUUID(),
      title: '',
      url: '',
      active: true
    };
    saveProfile({ links: [...activeProfile.links, newLink] });
  };

  const handleUpdateLink = (linkId: string, updates: Partial<Link>) => {
    const updatedLinks = activeProfile.links.map(link =>
      link.id === linkId ? { ...link, ...updates } : link
    );
    saveProfile({ links: updatedLinks });
  };

  const handleDeleteLink = (linkId: string) => {
    saveProfile({ links: activeProfile.links.filter(l => l.id !== linkId) });
  };

  // Product CRUD
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: '',
      price: '',
      description: '',
      image: '',
      active: true
    };
    saveProfile({ products: [...activeProfile.products, newProduct] });
  };

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    const updatedProducts = activeProfile.products.map(product =>
      product.id === productId ? { ...product, ...updates } : product
    );
    saveProfile({ products: updatedProducts });
  };

  const handleDeleteProduct = (productId: string) => {
    saveProfile({ products: activeProfile.products.filter(p => p.id !== productId) });
  };

  // Bank Account CRUD
  const handleAddBankAccount = () => {
    const newAccount: BankAccount = {
      id: crypto.randomUUID(),
      bankName: '',
      accountNumber: '',
      beneficiary: '',
      active: true,
      clabe: ''
    };
    saveProfile({ bankAccounts: [...activeProfile.bankAccounts, newAccount] });
  };

  const handleUpdateBankAccount = (accountId: string, updates: Partial<BankAccount>) => {
    const updatedAccounts = activeProfile.bankAccounts.map(account =>
      account.id === accountId ? { ...account, ...updates } : account
    );
    saveProfile({ bankAccounts: updatedAccounts });
  };

  const handleDeleteBankAccount = (accountId: string) => {
    saveProfile({ bankAccounts: activeProfile.bankAccounts.filter(a => a.id !== accountId) });
  };

  const renderContent = () => {
    // This function is no longer used since each page has its own content
    // Keeping it for backwards compatibility in case old code calls it
    return null;
  };

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row font-sans bg-[#F3F3F1] text-[#1e2330] overflow-hidden">

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative pb-24 md:pb-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-8 mt-4 md:mt-0">
          <AnimatePresence mode='wait'>
            {customContent}
          </AnimatePresence>
        </div>
      </main>

      {/* Fixed Mobile Preview Column (Right Side) - Desktop Only */}
      <div className="hidden lg:flex w-[480px] bg-white border-l border-gray-200 flex-col items-center justify-center shrink-0 relative shadow-xl p-6 gap-6">
        <ShareWidget profile={activeProfile} />
        <div className="w-[394px] h-[780px] scale-90 origin-top">
          <MobilePreview profile={activeProfile} device="mobile" />
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <MobileNavBar
        onOpenPreview={() => setIsMobilePreviewOpen(true)}
        onLogout={onLogout}
      />

      {/* Mobile Preview Modal */}
      <AnimatePresence>
        {isMobilePreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:hidden"
            onClick={() => setIsMobilePreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[375px] h-[80vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setIsMobilePreviewOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-full h-full overflow-y-auto">
                <MobilePreview profile={activeProfile} device="mobile" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}