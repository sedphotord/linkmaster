'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { UserProfile, Link, Product, BankAccount, ThemeId, ViewMode, MenuTag, MenuItem, MenuCardStyle } from '@/lib/types';
import {
  ExternalLink, Copy, ShoppingBag, CreditCard, Check,
  Instagram, Facebook, Twitter, Youtube,
  Linkedin, Phone, Github, Globe, Mail, Share2, Briefcase, MapPin, FileText, Edit2, Lock,
  X, Download, Search, Minimize2, Plus, Minus, ShoppingCart, Trash2, Filter,
  LayoutList, ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface MobilePreviewProps {
  profile: UserProfile;
  onEditSection?: (mode: ViewMode) => void;
  device?: 'mobile' | 'desktop';
}

// Custom TikToK & Kick Icons
const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const KickIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3h6v4.5L13.5 3h6.75L12 10.5 21 21h-6.75l-4.5-5.25v5.25H3V3z" />
  </svg>
);

const XIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SpotifyIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-2.341c-.3.421-.84.539-1.261.241-3.179-1.92-7.98-2.46-11.7-1.321-.481.121-1.02-.179-1.141-.659-.12-.481.181-1.021.66-1.141 4.2-1.26 9.421-.72 13.141 1.56.419.3.539.84.24 1.32zm.12-2.401c-3.779-2.219-10.019-2.4-13.62-1.32-.6.18-1.2-.179-1.38-.72-.18-.6.18-1.2.72-1.38 4.14-1.26 10.98-1.08 15.3 1.44.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.439.3z" />
  </svg>
);

const TwitchIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M2.4 0H0v21.6h7.2V24h2.4l2.4-2.4h3.6L24 13.2V0H2.4zm19.2 12l-3.6 3.6H12l-2.4 2.4V15.6H6.059V2.4h15.542V12zM10.8 7.2h2.4V12h-2.4V7.2zm6 0h2.4V12h-2.4V7.2z" />
  </svg>
);

const DiscordIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.085 2.157 2.419 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.085 2.157 2.419 0 1.333-.946 2.419-2.157 2.419z" />
  </svg>
);

const TelegramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.37l-1.92 9.05c-.14.63-.52.78-1.05.49l-2.91-2.14-1.4 1.35c-.16.16-.29.29-.59.29l.21-2.96 5.39-4.87c.23-.21-.05-.33-.36-.12l-6.66 4.19-2.87-.9c-.62-.2-.63-.62.13-.91l11.22-4.32c.52-.19.98.11.81.85z" />
  </svg>
);

const PinterestIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.23 9.39 7.82 11.16-.11-.95-.21-2.41.04-3.45.23-.97 1.48-6.26 1.48-6.26s-.38-.75-.38-1.87c0-1.75 1.01-3.05 2.29-3.05 1.07 0 1.59.81 1.59 1.77 0 1.08-.68 2.7-1.04 4.2-.3 1.25.63 2.27 1.86 2.27 2.22 0 3.94-2.35 3.94-5.74 0-3.01-2.16-5.11-5.26-5.11-3.58 0-5.69 2.68-5.69 5.45 0 1.08.41 2.23.94 2.87.1.13.12.24.08.43-.1.35-.31 1.25-.36 1.43-.05.21-.19.26-.44.15-1.63-.76-2.65-3.15-2.65-5.07 0-4.13 3.01-7.92 8.68-7.92 4.56 0 8.11 3.25 8.11 7.59 0 4.53-2.85 8.17-6.81 8.17-1.33 0-2.58-.69-3.01-1.51l-.82 3.12c-.29 1.13-1.08 2.54-1.61 3.4 1.21.36 2.49.56 3.82.56 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
  </svg>
);

const SnapchatIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.977.157 1.124-.349.129-.437.208-.992.305-1.123.96-.149 3.156-.53 3.211-1.505.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z" />
  </svg>
);

const GmailIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 -31.5 256 256" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z" fill="#4285F4" />
      <path d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z" fill="#34A853" />
      <polygon fill="#EA4335" points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061" />
      <path d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z" fill="#FBBC04" />
      <path d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z" fill="#C5221F" />
    </g>
  </svg>
);

const RedditIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.094z" />
  </svg>
);

const AmazonIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
    <path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
  </svg>
);

const AppleMusicIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M11.965 24C5.357 24 0 18.618 0 11.983c0-6.634 5.357-12.016 11.965-12.016 6.608 0 11.966 5.382 11.966 12.016 0 6.635-5.358 12.017-11.966 12.017zm6.059-15.688v-.235c0-.684-.551-1.246-1.238-1.246-.065 0-.129.006-.192.016l-7.394 1.579c-.615.132-1.054.675-1.054 1.306v6.07a2.53 2.53 0 00-1.353-.393c-1.42 0-2.571 1.156-2.571 2.582s1.151 2.581 2.57 2.581c1.378 0 2.502-1.087 2.568-2.433v-5.228l5.827-1.232v3.66a2.529 2.529 0 00-1.353-.393c-1.419 0-2.57 1.156-2.57 2.582 0 1.426 1.151 2.582 2.57 2.582 1.379 0 2.502-1.087 2.568-2.433L18.024 8.312z" />
  </svg>
);

// Framer Motion Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};


const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};


const MobilePreview: React.FC<MobilePreviewProps> = ({ profile, onEditSection, device = 'mobile' }) => {
  const [mounted, setMounted] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const ap = profile.appearance;

  // E-commerce State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<{ product: Product; variant?: string; price: number; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({}); // { "Size": "M", "Color": "Red" }

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadQr = async () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(`https://linkmaster.app/${profile.username}`)}&color=000000&bgcolor=ffffff&margin=20`;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${profile.username}-qr.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) { console.error('Error downloading QR', e); }
  };

  // Cart Helpers
  const addToCart = (product: Product) => {
    const variantKey = Object.values(selectedVariant).join(' / ');
    const finalPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.variant === variantKey);
      if (existing) {
        return prev.map(item =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, variant: variantKey || undefined, price: finalPrice, quantity: 1 }];
    });
    setSelectedProduct(null);
    setSelectedVariant({});
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => prev.map((item, i) => {
      if (i !== index) return item;
      const newQty = Math.max(0, item.quantity + delta);
      return { ...item, quantity: newQty };
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const phone = profile.businessInfo?.phone || '';
    if (!phone) {
      alert("Este perfil no tiene un número de WhatsApp configurado.");
      return;
    }

    let message = `Hola, me gustaría hacer un pedido:\n\n`;
    cart.forEach(item => {
      const variantStr = item.variant ? ` (${item.variant})` : '';
      message += `• ${item.quantity}x ${item.product.name}${variantStr} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\nTotal: $${cartTotal.toFixed(2)}`;

    const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const renderCartModal = () => {
    if (!mounted) return null;
    return createPortal(
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex justify-end"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#F3F3F1] h-full shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-[#502274]" />
                  <h2 className="font-bold text-lg">Tu Carrito ({cart.reduce((a, b) => a + b.quantity, 0)})</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 opacity-60">
                    <ShoppingBag size={48} />
                    <p className="font-medium">Tu carrito está vacío</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-[#502274] font-bold text-sm hover:underline">
                      Volver al catálogo
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl shadow-sm flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                        {item.product.image ? (
                          <img src={item.product.image} className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingBag className="w-full h-full p-4 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-sm line-clamp-1">{item.product.name}</h4>
                          {item.variant && <p className="text-xs text-gray-500 font-medium">{item.variant}</p>}
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="font-bold text-[#502274]">${item.price * item.quantity}</span>
                          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(idx, -1)} className="p-1 hover:text-red-500 transition-colors disabled:opacity-30" disabled={item.quantity <= 1}>
                              <Minus size={14} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(idx, 1)} className="p-1 hover:text-green-600 transition-colors">
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-gray-300 hover:text-red-500 h-fit">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 font-medium">Total Estimado</span>
                    <span className="text-2xl font-black text-[#502274]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon size={20} className="text-white fill-white" />
                    <span>Pedir por WhatsApp</span>
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  };

  // Fix: Ensure portal renders only on client

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted && isCartOpen) return null; // Prevent hydration mismatch for portal


  // --- DYNAMIC FONTS ---
  // Generate Google Fonts URL
  const fonts = [ap.pageFont, ap.titleFont].filter(Boolean);
  const uniqueFonts = Array.from(new Set(fonts));
  const fontQuery = uniqueFonts.map(f => f?.replace(/ /g, '+')).join('&family=');
  const fontUrl = uniqueFonts.length > 0 ? `https://fonts.googleapis.com/css2?family=${fontQuery}:wght@400;500;600;700;800;900&display=swap` : '';

  // --- THEME SYSTEM CONFIGURATION ---
  const getThemeConfig = (themeId: ThemeId) => {
    const glassStyle = "bg-white/10 backdrop-blur-md border border-white/20 text-white";
    const solidLightStyle = "bg-white border border-gray-200 text-slate-800 shadow-sm";
    const solidDarkStyle = "bg-[#2a2a2a] border border-[#333] text-white shadow-sm";

    switch (themeId) {
      case 'custom': return {
        bg: '', // Handled by inline style
        text: '', // Handled by inline style
        font: 'font-sans',
        button: 'bg-black/5 hover:bg-black/10 transition backdrop-blur-sm',
        card: 'bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm',
        accent: 'opacity-70'
      };
      case 'agate': return {
        bg: 'bg-gradient-to-br from-emerald-500 via-teal-700 to-cyan-900',
        text: 'text-white',
        font: 'font-playfair',
        button: 'bg-white/20 backdrop-blur border border-white/30 text-white hover:bg-white/30',
        card: 'bg-white/10 backdrop-blur border border-white/20 text-white',
        accent: 'text-emerald-100'
      };
      case 'air': return {
        bg: 'bg-[#F5F7FA]',
        text: 'text-slate-600',
        font: 'font-sans',
        button: 'bg-white shadow-sm text-slate-600 hover:shadow-md transition-all',
        card: 'bg-white border border-gray-100 shadow-sm text-slate-600',
        accent: 'text-slate-400'
      };
      case 'astrid': return {
        bg: 'bg-[#0f172a]', // Simplified star field
        text: 'text-white',
        font: 'font-space',
        button: 'bg-slate-800/80 backdrop-blur text-white border border-slate-700 hover:bg-slate-700',
        card: 'bg-slate-900/80 border border-slate-700 text-white',
        accent: 'text-blue-200'
      };
      case 'aura': return {
        bg: 'bg-gradient-to-b from-[#eef2f3] to-[#8e9eab]',
        text: 'text-slate-700',
        font: 'font-lora',
        button: 'bg-white/60 backdrop-blur text-slate-800 hover:bg-white/80',
        card: 'bg-white/70 backdrop-blur shadow-sm text-slate-800',
        accent: 'text-slate-500'
      };
      case 'bliss': return {
        bg: 'bg-[#e5e5e5]', // Placeholder for B&W photo
        text: 'text-gray-900',
        font: 'font-playfair',
        button: 'bg-white/80 backdrop-blur text-black border border-white hover:bg-white',
        card: 'bg-white/90 shadow-md text-black',
        accent: 'text-gray-500'
      };
      case 'blocks': return {
        bg: 'bg-[#701a75]',
        text: 'text-white',
        font: 'font-inter',
        button: 'bg-[#d946ef] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] transition-all',
        card: 'bg-[#a21caf] text-white border-2 border-[#f0abfc]',
        accent: 'text-fuchsia-200'
      };
      case 'bloom': return {
        bg: 'bg-gradient-to-t from-[#9333ea] to-[#db2777]',
        text: 'text-white',
        font: 'font-poppins',
        button: 'bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20',
        card: 'bg-black/20 backdrop-blur border border-white/10 text-white',
        accent: 'text-pink-100'
      };
      case 'breeze': return {
        bg: 'bg-gradient-to-br from-[#fbc2eb] to-[#a6c1ee]',
        text: 'text-slate-800',
        font: 'font-quicksand',
        button: 'bg-white/40 backdrop-blur hover:bg-white/60 text-slate-900',
        card: 'bg-white/60 backdrop-blur text-slate-900',
        accent: 'text-slate-600'
      };
      case 'encore': return {
        bg: 'bg-neutral-900',
        text: 'text-neutral-200',
        font: 'font-oswald uppercase tracking-wider',
        button: 'bg-transparent border border-neutral-600 text-neutral-200 hover:bg-neutral-800',
        card: 'bg-neutral-800 border border-neutral-700 text-neutral-200',
        accent: 'text-neutral-500'
      };
      case 'grid': return {
        bg: 'bg-[#f0fdf4] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]',
        text: 'text-black',
        font: 'font-mono',
        button: 'bg-[#bef264] border-2 border-black text-black hover:bg-[#d9f99d] shadow-[2px_2px_0px_0px_#000]',
        card: 'bg-white border-2 border-black text-black shadow-[4px_4px_0px_0px_#000]',
        accent: 'text-gray-600'
      };
      case 'groove': return {
        bg: 'bg-gradient-to-r from-[#f97316] to-[#ec4899]',
        text: 'text-white',
        font: 'font-space',
        button: 'bg-black/20 backdrop-blur border-2 border-white/20 hover:bg-black/30',
        card: 'bg-black/40 backdrop-blur border border-white/10 text-white',
        accent: 'text-orange-100'
      };
      case 'haven': return {
        bg: 'bg-[#d6d3d1]',
        text: 'text-[#44403c]',
        font: 'font-lora',
        button: 'bg-[#f5f5f4] shadow-sm hover:bg-white transition-colors text-[#44403c]',
        card: 'bg-[#e7e5e4] border border-[#a8a29e] text-[#44403c]',
        accent: 'text-[#78716c]'
      };
      case 'lake': return {
        bg: 'bg-gradient-to-b from-slate-900 to-slate-800',
        text: 'text-slate-100',
        font: 'font-inter',
        button: 'bg-slate-700/50 backdrop-blur hover:bg-slate-600/50 text-white border border-slate-600/50',
        card: 'bg-slate-800/80 backdrop-blur border border-slate-700 text-white',
        accent: 'text-sky-400'
      };
      case 'mineral': return {
        bg: 'bg-[#FAF7F2]',
        text: 'text-[#431407]',
        font: 'font-inter',
        button: 'bg-white border border-[#E5E0D8] hover:border-[#D9D2C7] text-[#431407] shadow-sm',
        card: 'bg-white shadow-sm border border-[#E5E0D8] text-[#431407]',
        accent: 'text-orange-800/60'
      };
      case 'nourish': return {
        bg: 'bg-[#4B5320]',
        text: 'text-[#F1F5E1]',
        font: 'font-merriweather',
        button: 'bg-[#3A4118] border border-[#5B642C] hover:bg-[#2D3312] text-white transition-colors',
        card: 'bg-[#3A4118] border border-[#5B642C] text-[#F1F5E1]',
        accent: 'text-[#C5D191]'
      };
      case 'rise': return {
        bg: 'bg-gradient-to-br from-[#FF4D4D] via-[#F9CB28] to-[#FF4D4D] bg-[size:200%_200%] animate-[gradient_8s_ease_infinite]',
        text: 'text-white',
        font: 'font-sans',
        button: 'bg-white/20 backdrop-blur border border-white/40 hover:bg-white/30 transition-all',
        card: 'bg-black/10 backdrop-blur border border-white/20 text-white',
        accent: 'text-white/80'
      };
      case 'sweat': return {
        bg: 'bg-[#0055FF]',
        text: 'text-white',
        font: 'font-oswald uppercase italic tracking-tighter',
        button: 'bg-white text-[#0055FF] font-black hover:bg-black hover:text-white transition-all transform skew-x-[-10deg]',
        card: 'bg-white/10 backdrop-blur-lg border-2 border-white text-white font-bold',
        accent: 'text-blue-200'
      };
      case 'tress': return {
        bg: 'bg-[#2C1810] bg-[url("https://www.transparenttextures.com/patterns/wood-pattern.png")]',
        text: 'text-[#DDC4A2]',
        font: 'font-playfair',
        button: 'bg-[#3D2B1F] border border-[#5D4037] hover:bg-[#1E110A] text-[#DDC4A2]',
        card: 'bg-[#1E110A]/80 backdrop-blur border border-[#5D4037] text-[#DDC4A2]',
        accent: 'text-[#B08968]'
      };
      case 'twilight': return {
        bg: 'bg-gradient-to-b from-[#1A1A2E] via-[#16213E] to-[#0F3460]',
        text: 'text-[#E94560]',
        font: 'font-poppins',
        button: 'bg-[#E94560] text-white hover:bg-[#C62A48] shadow-[0_0_15px_rgba(233,69,96,0.3)]',
        card: 'bg-[#1A1A2E]/90 border border-[#E94560]/30 text-white',
        accent: 'text-[#E94560]/60'
      };
      case 'vox': return {
        bg: 'bg-black',
        text: 'text-[#FF0000]',
        font: 'font-oswald',
        button: 'bg-[#FF0000] text-white uppercase tracking-[0.2em] font-black hover:bg-white hover:text-black transition-all',
        card: 'bg-white/5 border-l-4 border-[#FF0000] text-white p-6',
        accent: 'text-[#FF0000] animate-pulse'
      };
      case 'sunset': return {
        bg: 'bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-600',
        text: 'text-white',
        font: 'font-quicksand',
        button: 'bg-white/20 backdrop-blur border border-white/30 text-white hover:bg-white/30',
        card: 'bg-white/20 backdrop-blur border border-white/30 text-white',
        accent: 'text-pink-100'
      };
      case 'forest': return {
        bg: 'bg-[#1e3a29]',
        text: 'text-[#e2e8f0]',
        font: 'font-merriweather',
        button: 'bg-[#2f5740] border border-[#407355] text-white hover:bg-[#3d6e52]',
        card: 'bg-[#2f5740] border border-[#407355] text-white',
        accent: 'text-[#8fc3a3]'
      };
      case 'luxury': return {
        bg: 'bg-black',
        text: 'text-[#d4af37]',
        font: 'font-playfair',
        button: 'bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black',
        card: 'bg-[#111] border border-[#d4af37] text-[#d4af37]',
        accent: 'text-[#8a701f]'
      };
      case 'cyber': return {
        bg: 'bg-[#0b0c15]',
        text: 'text-[#00ff9d]',
        font: 'font-mono',
        button: 'bg-[#0b0c15] border-2 border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black shadow-[4px_4px_0px_0px_#00ff9d]',
        card: 'bg-[#0b0c15] border-2 border-[#00ff9d] text-[#00ff9d]',
        accent: 'text-[#00ff9d]'
      };
      case 'mint': return {
        bg: 'bg-[#e0f2f1]',
        text: 'text-[#00695c]',
        font: 'font-work',
        button: 'bg-white shadow-md text-[#004d40] border-0 hover:shadow-lg',
        card: 'bg-white/80 border border-[#b2dfdb] text-[#004d40]',
        accent: 'text-[#004d40]'
      };
      case 'blush': return {
        bg: 'bg-[#fdf2f8]',
        text: 'text-[#831843]',
        font: 'font-lora',
        button: 'bg-white border border-pink-200 text-[#9d174d] hover:border-pink-300',
        card: 'bg-white/80 border border-pink-200 text-[#831843]',
        accent: 'text-pink-400'
      };
      case 'midnight': return {
        bg: 'bg-[#1e1b4b]',
        text: 'text-[#e0e7ff]',
        font: 'font-space',
        button: 'bg-[#312e81] border border-[#4338ca] text-white hover:bg-[#3730a3]',
        card: 'bg-[#312e81] border border-[#4338ca] text-white',
        accent: 'text-[#818cf8]'
      };
      case 'coffee': return {
        bg: 'bg-[#4B3621]',
        text: 'text-[#E6DCC3]',
        font: 'font-lora',
        button: 'bg-[#6F4E37] text-[#E6DCC3] border border-[#8B4513] hover:bg-[#7f5b41]',
        card: 'bg-[#6F4E37] text-[#E6DCC3] border border-[#8B4513]',
        accent: 'text-[#D2B48C]'
      };
      case 'vibrant': return {
        bg: 'bg-[#fbbf24]',
        text: 'text-black',
        font: 'font-oswald uppercase tracking-wider',
        button: 'bg-black text-white border-none transform hover:-translate-y-1',
        card: 'bg-black text-white border-none',
        accent: 'text-yellow-400'
      };
      case 'concrete': return {
        bg: 'bg-[#9ca3af]',
        text: 'text-[#1f2937]',
        font: 'font-mono',
        button: 'bg-[#d1d5db] border-b-4 border-[#4b5563] text-black active:border-b-0 active:translate-y-1',
        card: 'bg-[#d1d5db] border-4 border-[#4b5563] text-black',
        accent: 'text-[#4b5563]'
      };
      case 'red-velvet': return {
        bg: 'bg-[#7f1d1d]',
        text: 'text-[#fecaca]',
        font: 'font-playfair',
        button: 'bg-[#991b1b] border border-[#b91c1c] text-white hover:bg-[#b91c1c]',
        card: 'bg-[#991b1b] border border-[#b91c1c] text-white',
        accent: 'text-[#fca5a5]'
      };
      default: return {
        bg: 'bg-white',
        text: 'text-black',
        font: 'font-sans',
        button: 'bg-gray-100 hover:bg-gray-200',
        card: 'bg-gray-50 border border-gray-200',
        accent: 'text-gray-400'
      };
    }
  };


  const baseThemeConfig = getThemeConfig(profile.theme);

  // --- APPEARANCE MERGE LOGIC ---
  const customStyle: React.CSSProperties = {};
  let finalBgClass = baseThemeConfig.bg;

  // Wallpaper / Background Logic
  if (ap.wallpaperStyle || (profile.theme === 'custom' && ap.customBackground)) {
    // If using custom settings, clear the theme's background class to avoid conflicts
    finalBgClass = '';

    // Legacy Custom Theme Support
    if (profile.theme === 'custom') {
      const isUrl = ap.customBackground?.startsWith('http') || ap.customBackground?.startsWith('/') || ap.customBackground?.startsWith('data:');
      customStyle.backgroundImage = isUrl ? `url(${ap.customBackground})` : (ap.customBackground ? `url(/backgrouds/${ap.customBackground})` : undefined);
      customStyle.backgroundSize = '900px auto';
      customStyle.backgroundPosition = 'top center';
      customStyle.backgroundRepeat = 'no-repeat';
      customStyle.backgroundColor = !isUrl ? ap.customBackground : undefined;
      customStyle.color = ap.customTextColor;
    }
    // New Appearance Support
    else if (ap.wallpaperStyle) {
      const bg1 = ap.backgroundColor || '#ffffff';
      const bg2 = ap.gradientColor2 || '#e2e8f0';

      // Path normalization for internal backgrounds
      let bgUrl = ap.customBackground || '';
      const isLibImage = bgUrl && !bgUrl.startsWith('http') && !bgUrl.startsWith('data:') && !bgUrl.startsWith('/');
      if (isLibImage) bgUrl = `/backgrouds/${bgUrl}`;

      if (ap.wallpaperStyle === 'fill' || (ap.wallpaperStyle as any) === 'flat') customStyle.backgroundColor = bg1;
      if (ap.wallpaperStyle === 'gradient') {
        customStyle.backgroundImage = `linear-gradient(135deg, ${bg1}, ${bg2})`;
        if (ap.wallpaperAnimate) {
          customStyle.backgroundSize = '400% 400%';
          customStyle.animation = 'gradient 15s ease infinite';
        }
      }
      if (ap.wallpaperStyle === 'image') {
        customStyle.backgroundImage = `url(${bgUrl})`;
        customStyle.backgroundSize = '900px auto';
        customStyle.backgroundPosition = 'top center';
        customStyle.backgroundRepeat = 'no-repeat';
      }
      if (ap.wallpaperStyle === 'pattern') {
        customStyle.backgroundColor = bg1;
        customStyle.backgroundImage = `repeating-conic-gradient(${bg2}33 0% 25%, transparent 0% 50%)`; // 33 hex = ~20% opacity
        customStyle.backgroundSize = '24px 24px';
      }
      if (ap.wallpaperStyle === 'blur') {
        customStyle.backgroundColor = bg1;
        customStyle.backdropFilter = 'blur(10px)';
      }
    }
  }

  // Filter Logic - Construct filter string
  const blurVal = ap.wallpaperBlur ?? 0;
  const satVal = ap.wallpaperSaturation ?? 100;
  const backgroundFilter = (blurVal > 0 || satVal !== 100)
    ? `blur(${blurVal}px) saturate(${satVal}%)`
    : undefined;

  // Text Color Override
  if (ap.pageTextColor) {
    customStyle.color = ap.pageTextColor;
  }

  const themeConfig = {
    ...baseThemeConfig,
    bg: finalBgClass,
    text: ap.pageTextColor ? '' : baseThemeConfig.text, // Clear class if custom color
    font: ap.pageFont ? 'preview-page-font' : baseThemeConfig.font, // Use custom font class
  };

  // Button Shape Logic
  const getShapeClass = () => {
    switch (ap.buttonShape) {
      case 'pill': return 'rounded-full';
      case 'square': return 'rounded-none';
      case 'sharp': return 'rounded-sm';
      case 'soft': return 'rounded-3xl';
      case 'rounded': default: return 'rounded-xl';
    }
  };
  const shapeClass = getShapeClass();
  const cardShapeClass = profile.appearance.buttonShape === 'square' ? 'rounded-sm' : 'rounded-2xl';

  const getLinkIcon = (iconName?: string) => {
    switch (iconName) {
      case 'instagram': return Instagram;
      case 'facebook': return Facebook;
      case 'twitter': return XIcon;
      case 'youtube': return Youtube;
      case 'tiktok': return TikTokIcon;
      case 'kick': return KickIcon;
      case 'linkedin': return Linkedin;
      case 'whatsapp': return WhatsAppIcon;
      case 'spotify': return SpotifyIcon;
      case 'twitch': return TwitchIcon;
      case 'discord': return DiscordIcon;
      case 'telegram': return TelegramIcon;
      case 'pinterest': return PinterestIcon;
      case 'snapchat': return SnapchatIcon;
      case 'reddit': return RedditIcon;
      case 'amazon': return AmazonIcon;
      case 'apple_music': return AppleMusicIcon;
      case 'github': return Github;
      case 'email': return Mail;
      case 'phone': return Phone;
      case 'location': return MapPin;
      case 'store': return ShoppingBag;
      default: return Globe;
    }
  };

  // Specific Branded Styles
  const getBrandStyle = (iconName?: string) => {
    const base = "transition-all duration-300 transform border-none text-white shadow-md hover:scale-[1.02] hover:shadow-lg";
    switch (iconName) {
      case 'instagram': return `${base} bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]`;
      case 'facebook': return `${base} bg-[#1877F2]`;
      case 'twitter': return `${base} bg-[#000000]`; // Update to X (Black)
      case 'youtube': return `${base} bg-[#FF0000]`;
      case 'tiktok': return `${base} bg-[#000000]`;
      case 'kick': return `${base} bg-[#53FC18] !text-black`;
      case 'linkedin': return `${base} bg-[#0A66C2]`;
      case 'whatsapp': return `${base} bg-[#25D366]`;
      case 'spotify': return `${base} bg-[#1DB954]`;
      case 'twitch': return `${base} bg-[#9146FF]`;
      case 'discord': return `${base} bg-[#5865F2]`;
      case 'telegram': return `${base} bg-[#26A5E4]`;
      case 'pinterest': return `${base} bg-[#E60023]`;
      case 'snapchat': return `${base} bg-[#FFFC00] text-black border border-black/5`;
      case 'reddit': return `${base} bg-[#FF4500]`;
      case 'amazon': return `${base} bg-[#FFFFFF] text-black border border-[#FF9900]/20`;
      case 'apple_music': return `${base} bg-[#FA243C]`;
      case 'github': return `${base} bg-[#24292e]`;
      case 'website': return `${base} bg-[#1e3a8a]`; // Dark Blue
      default: return themeConfig.button;
    }
  };

  const getBrandColorOnly = (iconName?: string) => {
    switch (iconName) {
      case 'instagram': return 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)';
      case 'facebook': return '#1877F2';
      case 'twitter': return '#000000';
      case 'youtube': return '#FF0000';
      case 'tiktok': return '#000000';
      case 'kick': return '#53FC18';
      case 'linkedin': return '#0A66C2';
      case 'whatsapp': return '#25D366';
      case 'spotify': return '#1DB954';
      case 'twitch': return '#9146FF';
      case 'discord': return '#5865F2';
      case 'telegram': return '#26A5E4';
      case 'pinterest': return '#E60023';
      case 'snapchat': return '#FFFC00';
      case 'reddit': return '#FF4500';
      case 'amazon': return '#DAA520'; // Gold/Orange for text context
      case 'apple_music': return '#FA243C';
      case 'github': return '#24292e';
      case 'website': return '#1e3a8a'; // Dark Blue
      case 'store': return '#ea580c';
      default: return undefined;
    }
  };

  const getBrandTextColor = (iconName?: string) => {
    switch (iconName) {
      case 'snapchat':
      case 'amazon':
      case 'kick':
      case 'lemon8':
      case 'airchat':
      case 'clubhouse':
      case 'website':
        return 'black';
      default:
        return 'white';
    }
  };

  // Filter links
  // Filter links
  const socialTypes = [
    'instagram', 'facebook', 'twitter', 'youtube', 'tiktok', 'linkedin', 'whatsapp',
    'github', 'email', 'website', 'store', 'phone', 'location', 'spotify', 'twitch',
    'discord', 'telegram', 'pinterest', 'snapchat', 'reddit', 'amazon', 'apple_music',
    'threads', 'whatsapp_channel', 'airchat', 'android_play_store', 'apple_app_store',
    'apple_podcast', 'bandcamp', 'bereal', 'bluesky', 'cameo', 'clubhouse', 'etsy',
    'kick', 'mastodon', 'patreon', 'payment', 'poshmark', 'signal', 'soundcloud',
    'substack', 'rednote', 'lemon8', 'bandsintown'
  ];
  const activeLinks = profile.links.filter(l => l.active);
  const socialLinks = activeLinks.filter(l => l.icon && socialTypes.includes(l.icon));
  const otherLinks = activeLinks.filter(l => !l.icon || !socialTypes.includes(l.icon));

  // Layout Logic
  const isRowLayout = ['top_row', 'bottom_row', 'grid'].includes(profile.appearance.socialLayout);
  const linksToDisplayInList = isRowLayout ? otherLinks : activeLinks;

  const renderSocialRow = () => {
    const isGrid = profile.appearance.socialLayout === 'grid';
    const iconStyle = profile.appearance.socialIconStyle || 'filled';
    const iconShape = profile.appearance.socialIconShape || 'circle';

    // Shape classes
    const shapeClass = iconShape === 'circle' ? 'rounded-full'
      : iconShape === 'rounded' ? 'rounded-xl'
        : 'rounded-md';

    return (
      <motion.div
        variants={itemVariants}
        className={isGrid
          ? "grid grid-cols-4 gap-4 px-4 mb-6"
          : "flex flex-wrap justify-center gap-3 px-2 mb-4"
        }
      >
        {socialLinks.map(link => {
          const Icon = getLinkIcon(link.icon);
          const useBrandColor = profile.appearance.socialColorMode === 'brand';
          const brandColor = useBrandColor ? getBrandColorOnly(link.icon) : undefined;

          // Style classes
          let buttonClass = `flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${shapeClass} `;
          let iconSize = 22;

          if (isGrid) {
            buttonClass += "w-full aspect-square ";
            iconSize = 28;
          } else {
            buttonClass += "w-12 h-12 ";
          }

          const dynamicStyle: React.CSSProperties = {};

          if (iconStyle === 'filled') {
            if (useBrandColor) {
              dynamicStyle.background = brandColor;
              dynamicStyle.color = getBrandTextColor(link.icon);
            } else {
              buttonClass += themeConfig.button; // Uses theme bg/text
              if (profile.theme === 'light') dynamicStyle.backgroundColor = 'white'; // Fallback
            }
          } else if (iconStyle === 'outline') {
            buttonClass += "border-2 ";
            if (useBrandColor) {
              dynamicStyle.borderColor = brandColor;
              dynamicStyle.color = brandColor;
            } else {
              // Determine theme color for border ?? defaulting to current text color logic
              buttonClass += "border-current ";
              // We might need to handle theme specific border color?
            }
          } else { // transparent
            if (useBrandColor) {
              dynamicStyle.color = brandColor;
            }
            // For theme mode, it inherits text color
          }

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass}
              style={dynamicStyle}
            >
              <Icon size={iconSize} />
            </a>
          );
        })}
      </motion.div>
    );
  };

  const renderGalleryModal = () => {
    const images = selectedProduct ? [selectedProduct.image, ...(selectedProduct.gallery || [])].filter(Boolean) : [];
    if (typeof window === 'undefined') return null;

    return createPortal(
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <button
              className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedProduct(null); }}
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-sm space-y-4 relative z-10" onClick={(e) => e.stopPropagation()}>
              <div className="aspect-square w-full rounded-2xl overflow-hidden relative bg-black/50">
                <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar">
                  {images.map((img, idx) => (
                    <img key={idx} src={img} className="w-full h-full object-contain snap-center shrink-0" />
                  ))}
                </div>
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-3 py-1.5 rounded-full text-white text-xs font-medium backdrop-blur-md">
                    Desliza para ver más
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl p-5 text-left shadow-2xl">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl text-black leading-tight">{selectedProduct.name}</h3>
                  {selectedProduct.inStock === false && (
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-md uppercase">Agotado</span>
                  )}
                </div>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed max-h-[100px] overflow-y-auto">{selectedProduct.description}</p>

                {/* Variants Selector */}
                {selectedProduct.variants && selectedProduct.variants.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {selectedProduct.variants.map(variant => (
                      <div key={variant.id}>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{variant.name}</label>
                        <div className="flex flex-wrap gap-2">
                          {variant.options.map(opt => (
                            <button
                              key={opt}
                              onClick={() => setSelectedVariant(prev => ({ ...prev, [variant.name]: opt }))}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedVariant[variant.name] === opt
                                ? 'bg-[#502274] text-white border-[#502274]'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100 gap-3">
                  <span className="font-black text-2xl text-[#502274] whitespace-nowrap">{selectedProduct.price}</span>

                  <div className="flex gap-2 flex-1 justify-end">
                    {selectedProduct.url ? (
                      <a
                        href={selectedProduct.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#502274] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-purple-900/20 active:scale-95 transition-all text-center flex-1"
                      >
                        Ver Enlace
                      </a>
                    ) : selectedProduct.inStock === false ? (
                      <button disabled className="bg-gray-100 text-gray-400 px-6 py-2.5 rounded-xl text-sm font-bold w-full cursor-not-allowed">
                        No Disponible
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => addToCart(selectedProduct)}
                          disabled={selectedProduct.variants?.some(v => !selectedVariant[v.name])}
                          className="bg-[#502274] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-purple-900/20 active:scale-95 transition-all flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={16} />
                          <span>Agregar</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  };

  const renderCatalogSection = () => {
    // Filter active products
    let activeProducts = profile.products.filter(p => p.active !== false);

    // Get unique categories
    const categories = Array.from(new Set(activeProducts.map(p => p.category).filter(Boolean))) as string[];

    // Apply filters
    if (searchTerm) {
      activeProducts = activeProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      activeProducts = activeProducts.filter(p => p.category === selectedCategory);
    }

    if (profile.catalogActive === false || (activeProducts.length === 0 && !searchTerm && !selectedCategory)) return null;

    const config = profile.catalogConfig || { layout: 'grid' };

    // Custom Card Styles
    const cardStyle = {
      backgroundColor: config.cardBackgroundColor || undefined, // undefined falls back to CSS/Theme
      color: config.cardTextColor || undefined,
    };

    return (
      <motion.div variants={itemVariants} className="mt-8 relative px-4">
        {renderGalleryModal()}

        {/* Header with Search and Categories */}
        <div className="flex flex-col items-center justify-center gap-4 mb-6 opacity-90">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Catálogo</span>
          </div>

          {/* Search Bar */}
          <div className="w-full relative max-w-xs">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={14} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 shadow-sm"
            />
          </div>

          {/* Category Chips */}
          {categories.length > 0 && (
            <div className="w-full overflow-x-auto pb-2 -mx-4 px-4 flex gap-2 justify-start md:justify-center hide-scrollbar">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all ${!selectedCategory ? 'bg-black text-white shadow-md' : 'bg-white/50 text-gray-600 hover:bg-white'}`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-black text-white shadow-md' : 'bg-white/50 text-gray-600 hover:bg-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
        {renderGalleryModal()}

        {/* Header with optional PDF */}
        <div className="flex flex-col items-center justify-center gap-3 mb-6 opacity-80">
          <div className="flex items-center gap-2">
            <ShoppingBag size={14} />
            <span className="text-xs font-bold uppercase tracking-widest">Catálogo</span>
          </div>

          {config.pdfUrl && (
            <a href={config.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-current/10 hover:bg-current/20 px-4 py-2 rounded-full transition-colors border border-current/10">
              <Download size={14} />
              <span className="text-xs font-bold">{config.buttonText || 'Descargar PDF'}</span>
            </a>
          )}
        </div>

        {/* Optional Cover Image */}
        {config.coverImage && (
          <div className="w-full h-40 rounded-2xl overflow-hidden mb-6 relative shadow-md">
            <img src={config.coverImage} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <div className={
          config.layout === 'grid' ? "grid grid-cols-2 gap-3" :
            config.layout === 'list' ? "flex flex-col gap-3" :
              config.layout === 'banner' ? "flex flex-col gap-4" :
                "flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4"
        }>
          {activeProducts.map(product => {
            const isPdf = product.type === 'pdf';
            const handleClick = () => {
              if (isPdf && product.pdfUrl) {
                window.open(product.pdfUrl, '_blank');
              } else if (!isPdf) {
                setSelectedProduct(product);
              }
            };

            // Banner Layout Specifics
            if (config.layout === 'banner') {
              return (
                <div
                  key={product.id}
                  onClick={handleClick}
                  className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg cursor-pointer group bg-gray-900"
                >
                  {product.image && <img src={product.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        {product.category && (
                          <span className="inline-block bg-[#502274] text-white text-[10px] font-bold px-2 py-0.5 rounded-md mb-1 shadow-sm">
                            {product.category}
                          </span>
                        )}
                        <h4 className="text-white font-bold text-lg leading-tight">{product.name}</h4>
                        <p className="text-white/80 text-xs mt-1 line-clamp-1">{product.description}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-lg font-bold text-sm">
                        {isPdf ? <FileText size={16} /> : product.price}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={product.id}
                onClick={handleClick}
                style={{ ...resolveCardInlineStyle(), ...cardStyle }}
                className={`
                   overflow-hidden flex flex-col ${resolveCardStyle('card')}
                   ${config.layout === 'list' ? 'flex-row h-24' : 'flex-col'}
                   ${config.layout === 'carousel' ? 'min-w-[150px] w-[150px] snap-center aspect-[3/4]' : ''}
                   ${ap.buttonShape === 'pill' ? 'rounded-3xl' : ''}
                   cursor-pointer hover:opacity-95 transition-opacity
                 `}
              >
                <div className={`
                   bg-gray-200 relative overflow-hidden
                   ${config.layout === 'list' ? 'w-24 h-full shrink-0' : 'aspect-square w-full'}
                `}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {isPdf ? <FileText size={24} /> : <ShoppingBag size={24} />}
                    </div>
                  )}

                  {/* Category Badge */}
                  {product.category && (
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm z-10">
                      {product.category}
                    </div>
                  )}

                  {/* PDF Overlay Badge */}
                  {isPdf && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="bg-red-600 text-white rounded-full p-2 shadow-lg scale-75">
                        <FileText size={16} />
                      </div>
                    </div>
                  )}

                  {!isPdf && config.layout !== 'list' && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                      {product.price}
                    </div>
                  )}
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="font-bold text-xs leading-tight mb-1 truncate">{product.name}</h4>
                    {isPdf && <span className="text-[9px] uppercase font-black text-red-500 tracking-wider">PDF Catalogo</span>}
                    {!isPdf && config.layout === 'list' && (
                      <p className="text-[10px] opacity-70 line-clamp-2 leading-relaxed">{product.description}</p>
                    )}
                  </div>

                  {!isPdf && (
                    <div className="flex items-center justify-between gap-2 mt-2">
                      {config.layout === 'list' && <span className="font-bold text-sm shrink-0">{product.price}</span>}
                      <button className={`w-full py-1.5 rounded-lg text-xs font-bold bg-current/10 hover:bg-current/20 truncate`}>
                        {config.layout === 'carousel' ? 'Ver Detalles' : 'Ver'}
                      </button>
                    </div>
                  )}

                  {isPdf && (
                    <div className="mt-2">
                      <button className="w-full py-1.5 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-1">
                        <Download size={10} /> Descargar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };



  // NOTE: For brevity I am defaulting full implementation of Menu/Bank/Business to simplify message size constraints.
  // Ideally I should copy the full code. 
  // Given the size limit, I will use a placeholder or trust the user to copy-paste? 
  // No, I must implement it. I'll focus on structure first.

  const renderBusinessSection = () => {
    if (!profile.businessInfo?.active) return null;
    return (
      <motion.div variants={itemVariants} className="mt-8">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
          <Briefcase size={14} />
          <span className="text-xs font-bold uppercase tracking-widest">Información Empresarial</span>
        </div>

        <div className={`p-5 shadow-xl overflow-hidden ${resolveCardStyle('card')} ${ap.buttonShape === 'pill' ? 'rounded-3xl' : ''}`} style={resolveCardInlineStyle()}>
          <div className="flex justify-between items-center mb-5 border-b border-current/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-current/10">
                <Briefcase className="text-current" size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold opacity-70">Empresa</p>
                <p className="font-bold text-sm leading-tight">{profile.businessInfo.companyName}</p>
              </div>
            </div>
            <button onClick={() => handleCopy(profile.businessInfo.companyName, 'name')} className="opacity-70 hover:opacity-100">
              {copiedId === 'name' ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          <div className="space-y-3">
            {profile.businessInfo.rnc && (
              <div className="bg-black/5 rounded-xl p-3 flex justify-between items-center group hover:bg-black/10 transition">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-current/10 opacity-80"><FileText size={14} /></div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-70">RNC / Tax ID</p>
                    <p className="font-mono text-xs">{profile.businessInfo.rnc}</p>
                  </div>
                </div>
                <button onClick={() => handleCopy(profile.businessInfo.rnc!, 'rnc')} className="opacity-50 hover:opacity-100">
                  {copiedId === 'rnc' ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            )}
            {profile.businessInfo.phone && (
              <div className="bg-black/5 rounded-xl p-3 flex justify-between items-center group hover:bg-black/10 transition">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-current/10 opacity-80"><Phone size={14} /></div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-70">Teléfono</p>
                    <p className="text-xs">{profile.businessInfo.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleCopy(profile.businessInfo.phone!, 'phone')} className="opacity-50 hover:opacity-100 p-1">
                    {copiedId === 'phone' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <a href={`tel:${profile.businessInfo.phone}`} className="opacity-50 hover:opacity-100 p-1">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
            {profile.businessInfo.email && (
              <div className="bg-black/5 rounded-xl p-3 flex justify-between items-center group hover:bg-black/10 transition">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-current/10 opacity-80"><Mail size={14} /></div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-70">Email</p>
                    <p className="text-xs truncate max-w-[120px]">{profile.businessInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleCopy(profile.businessInfo.email!, 'email')} className="opacity-50 hover:opacity-100 p-1">
                    {copiedId === 'email' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <a href={`mailto:${profile.businessInfo.email}`} className="opacity-50 hover:opacity-100 p-1">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
            {profile.businessInfo.website && (
              <div className="bg-black/5 rounded-xl p-3 flex justify-between items-center group hover:bg-black/10 transition">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-current/10 opacity-80"><Globe size={14} /></div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-70">Web</p>
                    <p className="text-xs truncate max-w-[120px]">{profile.businessInfo.website}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleCopy(profile.businessInfo.website!, 'website')} className="opacity-50 hover:opacity-100 p-1">
                    {copiedId === 'website' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <a href={profile.businessInfo.website} target="_blank" rel="noreferrer" className="opacity-50 hover:opacity-100 p-1">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
            {profile.businessInfo.address && (
              <div className="bg-black/5 rounded-xl p-3 flex justify-between items-center group hover:bg-black/10 transition">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded bg-current/10 opacity-80"><MapPin size={14} /></div>
                  <div>
                    <p className="text-[9px] uppercase font-bold opacity-70">Dirección</p>
                    <p className="text-xs line-clamp-2 max-w-[120px]">{profile.businessInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleCopy(profile.businessInfo.address!, 'address')} className="opacity-50 hover:opacity-100 p-1">
                    {copiedId === 'address' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <a href={profile.businessInfo.mapUrl || `https://maps.google.com/?q=${profile.businessInfo.address}`} target="_blank" rel="noreferrer" className="opacity-50 hover:opacity-100 p-1">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}

            {/* Visual Map Module */}
            {profile.businessInfo.showMap && (profile.businessInfo.address || profile.businessInfo.mapUrl) && (
              <div className="mt-4 rounded-xl overflow-hidden border border-current/10 shadow-inner bg-black/5 aspect-video relative group/map">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: profile.theme === 'dark' ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(profile.businessInfo.mapUrl || profile.businessInfo.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // --- Modern Menu Helpers ---
  const getMenuTagStyle = (tagId: string) => {
    const styles: Record<string, string> = {
      'popular': 'bg-amber-100 text-amber-700 border-amber-200',
      'nuevo': 'bg-blue-100 text-blue-700 border-blue-200',
      'vegetariano': 'bg-green-100 text-green-700 border-green-200',
      'vegano': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'sin_gluten': 'bg-orange-100 text-orange-700 border-orange-200',
      'picante': 'bg-red-100 text-red-700 border-red-200',
    };
    return styles[tagId] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const renderMenuItem = (item: MenuItem, style: MenuCardStyle, showImage: boolean, showPrice: boolean, currency: string) => {
    // Tag badges
    const renderTags = () => (
      <div className="flex flex-wrap gap-1 mt-1">
        {item.tags.map(tag => (
          <span key={tag} className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold uppercase ${getMenuTagStyle(tag)}`}>
            {tag.replace('_', ' ')}
          </span>
        ))}
      </div>
    );

    // Price formatting
    const priceDisplay = showPrice && item.price ? (
      <span className="font-bold text-[#502274] text-sm">
        {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'RD$'} {item.price}
      </span>
    ) : null;

    if (style === 'compact') {
      return (
        <div key={item.id} className="flex items-center justify-between py-2 border-b border-dashed border-gray-200 last:border-0 group">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-baseline gap-2">
              <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
              {renderTags()}
            </div>
            {item.description && <p className="text-xs text-gray-500 truncate group-hover:whitespace-normal transition-all">{item.description}</p>}
          </div>
          {priceDisplay}
        </div>
      );
    }

    if (style === 'minimal') {
      return (
        <div key={item.id} className="py-3 group">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-gray-800 uppercase tracking-wide text-sm">{item.name}</h4>
            <div className="flex-1 mx-2 border-b-2 border-dotted border-gray-200 relative -top-1.5"></div>
            {priceDisplay}
          </div>
          {item.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed max-w-[90%]">{item.description}</p>}
          {item.tags.length > 0 && <div className="mt-1">{renderTags()}</div>}
        </div>
      );
    }

    if (style === 'magazine') {
      return (
        <div key={item.id} className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm group">
          {item.image ? (
            <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              <ImageIcon size={24} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
            <div className="flex justify-between items-end">
              <div>
                <h4 className="font-bold text-white text-base leading-tight">{item.name}</h4>
                {item.tags.length > 0 && <div className="mt-1 opacity-90">{renderTags()}</div>}
              </div>
              {priceDisplay && <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-white font-bold text-sm">{priceDisplay}</div>}
            </div>
          </div>
        </div>
      );
    }

    // Classic & Card styles share structure
    const isCard = style === 'card';
    return (
      <div key={item.id} className={`bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex gap-3 ${isCard ? 'flex-col' : 'items-start'}`}>
        {showImage && item.image && (
          <div className={`${isCard ? 'w-full aspect-video rounded-lg' : 'w-20 h-20 rounded-lg shrink-0'} bg-gray-100 overflow-hidden`}>
            <img src={item.image} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 w-full">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-gray-800 text-sm leading-tight">{item.name}</h4>
            {priceDisplay}
          </div>
          {item.description && <p className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2">{item.description}</p>}
          {item.tags.length > 0 && <div className="mt-2">{renderTags()}</div>}
        </div>
      </div>
    );
  };

  const renderMenuSection = () => {
    const menu = profile.menu;
    if (!menu?.active || menu.categories.length === 0) return null;

    // Active items only
    const activeCategories = menu.categories.filter(c => c.active).sort((a, b) => a.order - b.order);
    const activeItems = menu.items.filter(i => i.available);

    if (activeCategories.length === 0) return null;

    const isGrid = menu.layout === 'grid';

    return (
      <motion.div variants={itemVariants} className="mt-8 relative scroll-mt-20 group/section" id="preview-menu-section">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
          <div className="p-1.5 rounded-lg bg-black/5">
            <LayoutList size={14} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">{menu.businessName || 'Menú Digital'}</span>
          {onEditSection && (
            <button onClick={() => onEditSection('menu')} className="opacity-0 group-hover/section:opacity-100 p-1 bg-white/20 rounded-full hover:bg-white/40 transition">
              <Edit2 size={10} />
            </button>
          )}
        </div>

        {/* Sticky Category Nav - inside scrollable container */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100 mb-6 p-1.5 overflow-x-auto flex gap-1 snap-x hide-scrollbar mx-2">
          {activeCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                document.getElementById(`preview-cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="snap-start shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:bg-black/5 whitespace-nowrap flex items-center gap-1.5"
              style={{ color: cat.icon || '#000' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8 px-2">
          {activeCategories.map(cat => {
            const items = activeItems.filter(i => i.categoryId === cat.id);
            if (items.length === 0) return null;

            return (
              <div key={cat.id} id={`preview-cat-${cat.id}`} className="scroll-mt-24">
                <h3 className="font-black text-lg text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full" style={{ backgroundColor: cat.icon || '#000' }} />
                  {cat.name}
                </h3>

                <div className={`
                                    ${isGrid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-2'}
                                `}>
                  {items.map(item => renderMenuItem(item, menu.cardStyle, menu.showImages, menu.showPrices, menu.currency))}
                </div>
              </div>
            );
          })}
        </div>

        {menu.note && (
          <div className="mt-8 text-center px-4 py-4 bg-gray-50 rounded-xl text-xs text-gray-400 italic">
            {menu.note}
          </div>
        )}
      </motion.div>
    );
  };

  const renderBankSection = () => {
    if (!profile.bankAccounts.some(b => b.active)) return null;
    return (
      <motion.div variants={itemVariants} className="mt-8">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
          <CreditCard size={14} />
          <span className="text-xs font-bold uppercase tracking-widest">Datos Bancarios</span>
        </div>

        <div className="space-y-3">
          {profile.bankAccounts.filter(b => b.active).map(bank => (
            <div key={bank.id} className={`p-5 relative overflow-hidden shadow-lg ${resolveCardStyle('card')} ${ap.buttonShape === 'pill' ? 'rounded-3xl' : ''}`} style={resolveCardInlineStyle()}>
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-current/10 flex items-center justify-center">
                    <CreditCard size={16} />
                  </div>
                  <h4 className="font-bold text-sm tracking-wide">{bank.bankName}</h4>
                </div>
                <button
                  onClick={() => handleCopy(`${bank.accountNumber}\n${bank.clabe || ''}`, bank.id)}
                  className="p-1.5 rounded-lg transition-colors hover:bg-current/10"
                >
                  {copiedId === bank.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="space-y-3 relative z-10">
                <div>
                  <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">Número de Cuenta</p>
                  <div className="flex justify-between items-center">
                    <p className="font-mono text-sm font-medium tracking-wide">{bank.accountNumber}</p>
                    <button
                      onClick={() => handleCopy(bank.accountNumber, `acc-${bank.id}`)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-current/10 opacity-70 hover:opacity-100"
                    >
                      {copiedId === `acc-${bank.id}` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
                {bank.beneficiary && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">Titular / Beneficiario</p>
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-sm tracking-wide">{bank.beneficiary}</p>
                      <button
                        onClick={() => handleCopy(bank.beneficiary, `ben-${bank.id}`)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-current/10 opacity-70 hover:opacity-100"
                      >
                        {copiedId === `ben-${bank.id}` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}
                {bank.cedula && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">Cédula</p>
                    <div className="flex justify-between items-center">
                      <p className="font-mono text-sm font-medium tracking-wide">{bank.cedula}</p>
                      <button
                        onClick={() => handleCopy(bank.cedula!, `ced-${bank.id}`)}
                        className="p-1.5 rounded-lg transition-colors hover:bg-current/10 opacity-70 hover:opacity-100"
                      >
                        {copiedId === `ced-${bank.id}` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderHeroSection = () => (
    <div className={`
      relative shrink-0 flex flex-col pt-12 pb-12 px-6
      ${ap.profileImageLayout === 'hero' ? 'items-start text-left text-white min-h-[320px] justify-end mt-4' : 'items-center text-center'}
    `}>
      {ap.profileImageLayout === 'hero' && (
        <>
          {ap.coverImage ? (
            <img src={ap.coverImage} className="absolute inset-0 w-full h-full object-cover z-0 rounded-3xl" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 z-0 rounded-3xl" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-0 rounded-3xl" />
        </>
      )}

      <motion.div
        initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`
          relative z-10 overflow-hidden shadow-lg mb-4
          ${ap.profileImageLayout === 'hero' ? 'w-24 h-24 rounded-full border-2 border-white/50' : 'w-24 h-24 rounded-full border-4 border-white/20'}
        `}
      >
        <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <h2
          className={`flex items-center gap-1.5 font-bold leading-tight tracking-tight preview-title-font ${ap.titleSize === 'large' ? 'text-3xl' : ap.titleSize === 'small' ? 'text-lg' : 'text-xl'}`}
          style={{ color: ap.profileImageLayout === 'hero' ? 'white' : ap.titleColor }}
        >
          {profile.name}
          {ap.verified && (
            <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" fill="#00B6FF"></path>
            </svg>
          )}
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.3 }}
        className={`text-sm mt-2 max-w-[260px] font-medium leading-relaxed preview-page-font relative z-10 ${ap.profileImageLayout === 'hero' ? 'opacity-90 text-gray-200' : 'opacity-80'}`}
      >
        {profile.bio}
      </motion.p>
    </div>
  );

  const renderSocialSection = () => {
    // Only render if row layout (grid/row). List layout is handled in Links section.
    if (!isRowLayout || socialLinks.length === 0) return null;
    return renderSocialRow(); // Reuse existing renderSocialRow which returns the div
  };


  const renderLinksSection = () => (
    <div className="space-y-3">
      {linksToDisplayInList.map(link => {
        const Icon = getLinkIcon(link.icon);
        const isBrand = socialTypes.includes(link.icon || '') || ['website', 'store', 'phone', 'location'].includes(link.icon || '');
        const isPill = shapeClass === 'rounded-full'; // Infer from shapeClass variable in scope

        // NOTE: We need to use 'profile.appearance.buttonShape' directly because shapeClass might be for icons only
        const btnShape = profile.appearance.buttonShape;
        const isBtnPill = btnShape === 'pill';
        const getSubtitle = () => {
          if (link.icon === 'whatsapp' || link.icon === 'phone') {
            return link.url.replace('https://wa.me/', '').replace('tel:', '').replace('https://api.whatsapp.com/send?phone=', '');
          }
          if (link.icon === 'location') {
            return 'Ver direcciÃ³n';
          }
          return '';
        };
        const subtitle = getSubtitle();
        const iconBoxClass = isPill
          ? 'bg-transparent text-current'
          : (isBrand ? 'bg-white/20 text-white' : 'bg-black/5');

        return (
          <motion.a
            key={link.id}
            variants={itemVariants}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={!isBrand ? resolveCardInlineStyle() : {}}
            className={`
          relative group w-full min-h-[56px] px-2 flex items-center justify-between
          ${isBrand ? getBrandStyle(link.icon) : resolveCardStyle('button')}
          ${shapeClass}
        `}
          >
            <div className={`
          absolute left-1.5 top-1.5 bottom-1.5 w-[46px]
          flex items-center justify-center
          ${iconBoxClass}
          ${isPill ? 'rounded-full' : (profile.appearance.buttonShape === 'rounded' ? 'rounded-lg' : 'rounded-sm')}
        `}>
              <Icon size={24} className={isPill && isBrand ? "text-white" : ""} />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center min-w-0 pl-12 pr-10">
              <span className="w-full text-center font-bold tracking-wide text-sm truncate">
                {link.title}
              </span>
              {subtitle && (
                <span className="text-[10px] opacity-60 font-medium truncate">
                  {subtitle}
                </span>
              )}
            </div>

            <div className={`absolute right-4 opacity-70 group-hover:translate-x-1 transition-transform`}>
              <ExternalLink size={18} />
            </div>
          </motion.a>
        );
      })}
    </div>
  );



  // Helper to resolve card/button styles
  const resolveCardStyle = (type: 'button' | 'card') => {
    const style = ap.buttonStyle;
    // If no style set (or default solid) AND no custom colors/roundness -> use theme
    if ((!style || style === 'solid') && !ap.buttonColor && !ap.buttonTextColor && !ap.buttonRoundness) {
      return type === 'button' ? themeConfig.button : themeConfig.card;
    }

    // otherwise generate custom class
    let cls = "transition-all duration-300 ";
    // Roundness
    const r = ap.buttonRoundness || 'round';
    if (r === 'square') cls += 'rounded-none ';
    else if (r === 'round') cls += 'rounded-md ';
    else if (r === 'rounder') cls += 'rounded-xl ';
    // For full roundness on cards, we usually don't want circle, but large radius
    else if (r === 'full') cls += 'rounded-[2rem] ';

    // Style Variants
    if (style === 'glass') cls += 'bg-white/10 backdrop-blur-md border border-white/20 shadow-sm hover:bg-white/20 ';
    else if (style === 'outline') cls += 'bg-transparent border-2 border-current hover:bg-white/5 ';
    else { // solid custom or default solid with custom roundness
      cls += 'border-none shadow-sm hover:brightness-110 ';
      if (!ap.buttonColor) cls += 'bg-white text-black '; // Default solid base if color missing but roundness changed
    }
    return cls;
  };

  const resolveCardInlineStyle = () => {
    const s: any = {};
    if (ap.buttonColor) {
      if (ap.buttonStyle === 'outline') {
        s.borderColor = ap.buttonColor;
        s.color = ap.buttonColor;
      } else {
        s.backgroundColor = ap.buttonColor;
      }
    }
    if (ap.buttonTextColor) s.color = ap.buttonTextColor;
    return s;
  };

  // Common content rendering to be used in both Desktop and Mobile frames
  const renderContent = () => {
    // Separate background style from content styles
    const bgStyle: React.CSSProperties = {
      ...customStyle,
      filter: backgroundFilter, // Apply blur/saturation here
      transform: backgroundFilter ? 'scale(1.1)' : undefined, // Scale slightly when blurred to avoid white edges
      position: 'absolute',
      inset: 0,
      zIndex: 0,
    };

    // Content Style (text color only)
    const contentStyle: React.CSSProperties = {
      color: customStyle.color,
    };

    return (
      <div
        className={`h-full w-full overflow-hidden relative flex flex-col ${themeConfig.bg} ${themeConfig.text} ${themeConfig.font} ${device === 'mobile' ? 'rounded-[2rem]' : ''}`}
        style={contentStyle}
      >
        {/* Background Layer (custom colors/images) */}
        {(ap.wallpaperStyle || (profile.theme === 'custom' && ap.customBackground)) && (
          <div style={bgStyle} className="pointer-events-none absolute inset-0 z-0" />
        )}

        {ap.wallpaperStyle === 'video' && ap.customVideo && (
          <video src={ap.customVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
        )}
        {ap.wallpaperNoise && (
          <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />
        )}

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
          {/* Share Button */}
          <button
            onClick={() => setShowQr(true)}
            className="absolute top-4 right-4 z-20 opacity-60 hover:opacity-100 cursor-pointer transition-opacity outline-none"
          >
            <div className={`p-2 rounded-full backdrop-blur-sm ${profile.theme === 'light' || profile.theme === 'custom' ? 'bg-black/5' : 'bg-white/20'}`}>
              <Share2 size={16} className="text-current" />
            </div>
          </button>

          {/* QR Modal via Portal */}
          {showQr && createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setShowQr(false)}>
              <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowQr(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
                  <X size={24} />
                </button>

                <div className="text-center space-y-4 pt-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-4 border-white shadow-lg">
                    <img src={profile.avatar} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">@{profile.username}</h3>
                    <p className="text-sm text-slate-500 font-medium">Comparte tu perfil con el mundo</p>
                  </div>


                  <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 shadow-inner mx-auto w-fit">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://linkmaster.app/${profile.username}`)}&color=000000&bgcolor=ffffff&margin=10`}
                      alt="QR Code"
                      className="w-48 h-48 mix-blend-multiply"
                    />
                  </div>

                  {/* Copy Link Area */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-3 group">
                    <p className="text-xs font-mono text-slate-500 overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                      linkmaster.app/{profile.username}
                    </p>
                    <button
                      onClick={() => handleCopy(`https://linkmaster.app/${profile.username}`, 'modal-copy')}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
                    >
                      {copiedId === 'modal-copy' ? (
                        <>
                          <Check size={12} className="text-green-500" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy size={12} className="text-slate-400" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    onClick={downloadQr}
                    className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Download size={18} /> Descargar QR
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}

          {/* Content Constraints: Always behave like PublicProfile (max-w-md mx-auto) */}
          <div className="w-full max-w-md mx-auto min-h-full flex flex-col transition-all duration-300">
            <motion.div
              className={`px-4 space-y-4 pb-12 flex-1 ${ap.profileImageLayout === 'hero' ? 'mt-0' : 'pt-0'}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {(profile.sectionOrder || ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business']).map(section => (
                <React.Fragment key={section}>
                  {(() => {
                    switch (section) {
                      case 'hero': return renderHeroSection();
                      case 'social': return renderSocialSection();
                      case 'links': return renderLinksSection();
                      case 'catalog': return renderCatalogSection();
                      case 'menu': return renderMenuSection();
                      case 'bank': return renderBankSection();
                      case 'business': return renderBusinessSection();
                      default: return null;
                    }
                  })()}
                </React.Fragment>
              ))}
            </motion.div>

            {/* Footer Branding */}
            <motion.div variants={itemVariants} className="pb-8 pt-8 text-center opacity-60 space-y-2">
              {ap.footerText && <p className="text-xs font-medium preview-page-font">{ap.footerText}</p>}
              {(ap.showBranding !== false) && (
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-70">Powered by LinkMaster</p>
              )}
            </motion.div>
          </div>

        </div>

        {/* Cart Modal */}
        {renderCartModal()}

        {/* Floating Cart Button */}
        <AnimatePresence>
          {cart.length > 0 && !isCartOpen && (
            <motion.button
              initial={{ scale: 0, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 100 }}
              onClick={() => setIsCartOpen(true)}
              className="absolute bottom-6 z-[9900] bg-[#502274] text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform border-4 border-white"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
              <span>Ver Carrito (${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)})</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  };
  const dynamicStyles = (
    <>
      {fontUrl && <link href={fontUrl} rel="stylesheet" />}
      <style>{`
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .preview-page-font { font-family: '${ap.pageFont || 'inherit'}', sans-serif; }
        .preview-title-font { font-family: '${ap.titleFont || 'inherit'}', sans-serif; }
      `}</style>
    </>
  );

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
      {dynamicStyles}
      {/* Main Screen Content - Hidden scrollbar */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
        {renderContent()}
      </div>
    </div>
  );
};

export default MobilePreview;
