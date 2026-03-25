'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag, CreditCard, Check, ChevronDown, ChevronUp,
  BarChart2, Globe, Share2, Instagram, Youtube, Twitter,
  Music, Video, DollarSign, Facebook, Linkedin, Mail
} from 'lucide-react';
import MobilePreview from './MobilePreview';
import Navbar from './Navbar';
import { UserProfile, SystemSettings } from '@/lib/types';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { storage } from '@/lib/storage';

// --- Mock Data for Previews ---

// --- Mock Data for Previews ---

const demoProfiles: UserProfile[] = [
  {
    id: 'demo-1',
    name: "Sofía Creator",
    username: "sofia-creadora",
    bio: "Diseñadora Digital | Content Creator 🎨\nAyudo a creativos a monetizar su pasión.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    theme: 'purple',
    appearance: {
      buttonShape: 'rounded',
      socialLayout: 'list',
      socialColorMode: 'theme',
      customBackground: undefined,
      customTextColor: undefined
    },
    links: [
      { id: '1', title: 'Mi Portfolio 2024', url: '#', active: true, icon: 'website' },
      { id: '2', title: 'Tutoriales en YouTube', url: '#', active: true, icon: 'youtube' },
      { id: '3', title: 'Reserva una Asesoría', url: '#', active: true, icon: 'website' },
    ],
    products: [
      { id: '1', name: 'Pack Iconos 3D Premium', price: '$29', description: '200 iconos 4K', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200', active: true },
    ],
    bankAccounts: [],
    businessInfo: { companyName: "", rnc: "", phone: "", email: "", website: "", address: "", active: false },
    menu: { active: false, businessName: '', currency: 'DOP', showPrices: true, showImages: true, layout: 'list', cardStyle: 'classic', note: '', categories: [], items: [] },
    catalogActive: true,
    gallery: [],
    sectionOrder: ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business']
  },
  {
    id: 'demo-2',
    name: "Marco Fitness",
    username: "marco-fit",
    bio: "Entrenador Personal 💪\nTransforma tu cuerpo en 90 días.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    theme: 'mint',
    appearance: {
      buttonShape: 'rounded',
      socialLayout: 'list',
      socialColorMode: 'theme',
      customBackground: undefined,
      customTextColor: undefined
    },
    links: [
      { id: '1', title: 'Plan de Entrenamiento', url: '#', active: true, icon: 'website' },
      { id: '2', title: 'Reto 30 Días', url: '#', active: true, icon: 'youtube' },
      { id: '3', title: 'Recetas Saludables', url: '#', active: true, icon: 'website' },
    ],
    products: [
      { id: '1', name: 'Plan de Comidas', price: '$19', description: 'Menú semanal', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200', active: true },
    ],
    bankAccounts: [],
    businessInfo: { companyName: "", rnc: "", phone: "", email: "", website: "", address: "", active: false },
    menu: { active: false, businessName: '', currency: 'DOP', showPrices: true, showImages: true, layout: 'list', cardStyle: 'classic', note: '', categories: [], items: [] },
    catalogActive: true,
    gallery: [],
    sectionOrder: ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business']
  },
  {
    id: 'demo-3',
    name: "Elena Art",
    username: "elena-art Gallery",
    bio: "Ilustradora & Artista 🖌️\nPrints y comisiones abiertas.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    theme: 'sunset',
    appearance: {
      buttonShape: 'square',
      socialLayout: 'list',
      socialColorMode: 'theme',
      customBackground: undefined,
      customTextColor: undefined
    },
    links: [
      { id: '1', title: 'Comisiones', url: '#', active: true, icon: 'website' },
      { id: '2', title: 'Tienda de Prints', url: '#', active: true, icon: 'store' },
    ],
    products: [
      { id: '3', name: 'Original Watercolor', price: '$150', description: 'Pieza única', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=200', active: true },
    ],
    bankAccounts: [],
    businessInfo: { companyName: "", rnc: "", phone: "", email: "", website: "", address: "", active: false },
    menu: { active: false, businessName: '', currency: 'DOP', showPrices: true, showImages: true, layout: 'list', cardStyle: 'classic', note: '', categories: [], items: [] },
    catalogActive: true,
    gallery: [],
    sectionOrder: ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business']
  }
];

// --- Components ---

// --- FAQ Component ---

const FaqItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border border-gray-200 rounded-3xl bg-white overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        className="w-full py-6 px-8 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span className="text-xl font-bold text-[#1e2330] pr-8">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#D2E823] text-[#254f1a]' : 'bg-gray-100 text-gray-500'}`}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-8 px-8 text-gray-600 leading-relaxed max-w-3xl">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

const CreatorCard = ({ image, name }: { image: string, name: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="relative group overflow-hidden rounded-[2.5rem] bg-gray-200 aspect-square"
  >
    <img src={image} alt={name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
    <div className="absolute bottom-6 left-6 text-white font-bold text-xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
      {name}
    </div>
  </motion.div>
);

interface LandingPageProps {
  onLogin: () => void;
}

// Animation Variants
const fadeInUpBlur: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function LandingPage({ onLogin }: LandingPageProps) {
  const [username, setUsername] = useState('');
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Admin Settings
  const [settings, setSettings] = useState<SystemSettings>(storage.getSystemSettings());

  useEffect(() => {
    // Poll for settings changes (since we don't have a real subscription)
    const interval = setInterval(() => {
      const current = storage.getSystemSettings();
      if (JSON.stringify(current) !== JSON.stringify(settings)) {
        setSettings(current);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [settings]);

  const heroTitle = settings.landingHeroTitle || "Todo lo que eres, en un solo link.";
  const heroSubtitle = settings.landingHeroSubtitle || "Únete a más de 50M de personas que usan LinkMaster para su link in bio. Un solo enlace para ayudarte a compartir todo lo que creas, curas y vendes.";
  const heroButton = settings.landingHeroButtonText || "Reclama tu LinkMaster";
  // Default Image: 3D Phone or Custom? 
  // If custom image is set, we might replace the whole phone section or just background.
  // For now let's keep the phone animation as it's complex and just change text.

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Rotation Effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsRotating(true);
      setTimeout(() => {
        setCurrentProfileIndex((prev) => (prev + 1) % demoProfiles.length);
      }, 900); // Switch content halfway through rotation (1.8s duration)
      setTimeout(() => {
        setIsRotating(false);
      }, 1800);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden selection:bg-[#D2E823] selection:text-[#254f1a]">

      {/* Navbar implementation remains same... */}
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header
        className="bg-[#00CAEA] min-h-screen flex flex-col pt-32 relative overflow-hidden"
        style={settings.landingSecondaryColor ? { backgroundColor: settings.landingSecondaryColor } : undefined}
      >
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8 z-10 text-white"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* ... Hero Content (Text, Input, Buttons) ... */}
            <motion.h1 variants={fadeInUpBlur} className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
              {heroTitle}
            </motion.h1>
            <motion.p variants={fadeInUpBlur} className="text-xl font-medium max-w-lg leading-relaxed text-white/90">
              {heroSubtitle}
            </motion.p>
            <motion.div variants={fadeInUpBlur} className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="bg-white rounded-lg p-4 flex-1 flex items-center shadow-lg focus-within:ring-2 ring-black transition-all">
                <span className="text-gray-400 font-bold whitespace-nowrap">linkmaster.app/</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="tu-nombre"
                  className="w-full outline-none bg-transparent font-bold ml-1 text-black placeholder-gray-400"
                />
              </div>
              <a href="/register" className="bg-[#1e2330] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-black transition-colors whitespace-nowrap">
                {heroButton}
              </a>
            </motion.div>
          </motion.div>

          {/* 3D Rotating Phone Section */}
          <div className="relative h-full min-h-[500px] flex items-center justify-center perspective-1000">
            {/* Floating Elements (Background Collage) - Now 3D Animated */}
            <motion.div
              animate={{
                rotateY: isRotating ? 360 : 0,
                rotateX: [10, -10, 10], // Gentle floating tilt
                y: [0, -20, 0] // Gentle float
              }}
              transition={{
                rotateY: { duration: 1.8, ease: "easeInOut", times: [0, 1] },
                rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-0 right-10 w-64 h-80 rounded-[2rem] overflow-hidden bg-purple-200 shadow-xl border-4 border-black z-10 hidden md:block"
            >
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-80" />
            </motion.div>

            <motion.div
              animate={{
                rotateY: isRotating ? -360 : 0, // Rotate opposite direction
                rotateX: [-10, 10, -10],
                y: [0, 20, 0]
              }}
              transition={{
                rotateY: { duration: 1.8, ease: "easeInOut", times: [0, 1] },
                rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-10 left-10 w-56 h-72 rounded-[2rem] overflow-hidden bg-blue-200 shadow-xl border-4 border-black z-10 hidden md:block"
            >
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-80" />
            </motion.div>

            {/* Main Phone */}
            <motion.div
              initial={{ opacity: 0, y: 100, filter: 'blur(20px)' }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                rotateY: isRotating ? 360 : 0
              }}
              transition={{
                duration: 1.2, // Initial entry
                rotateY: { duration: 1.8, ease: "easeInOut" } // Rotation duration
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 scale-75 md:scale-90"
            >
              <div className="w-[394px] h-[854px] bg-black rounded-[3rem] p-3 shadow-2xl relative">
                {/* Shiny Bezel Reflection */}
                <div className="absolute inset-0 rounded-[3rem] border-[6px] border-gray-800 pointer-events-none z-50"></div>
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white">
                  <MobilePreview
                    key={currentProfileIndex} // Force re-render on change
                    profile={demoProfiles[currentProfileIndex]}
                    device="mobile"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Customization Video Section */}
      <section className="bg-[#502274] text-[#E9C0E9] py-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#E9C0E9]"
          >
            <video
              autoPlay
              playsInline
              loop
              muted
              className="w-full h-auto object-cover"
              poster="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/692eb9b488731835c528bb18_capture_1764669836574.webp"
            >
              <source src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.webm" type="video/webm" />
              <source src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="order-1 lg:order-2 space-y-8 text-center lg:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUpBlur}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-[#00CAEA]"
            >
              Crea y personaliza tu LinkMaster en minutos
            </motion.h2>
            <motion.p
              variants={fadeInUpBlur}
              className="text-xl font-medium leading-relaxed text-white opacity-90 max-w-lg mx-auto lg:mx-0"
            >
              Conecta todo tu contenido de redes sociales, sitios web, tiendas y más en un solo enlace en tu bio. Personaliza cada detalle o deja que LinkMASTER lo mejore automáticamente para que coincida con tu marca y genere más clics.
            </motion.p>
            <div className="pt-4">
              <a
                href="/register"
                className="inline-block bg-[#00CAEA] text-white px-10 py-5 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-lg hover:shadow-[#00CAEA]/20"
              >
                Comenzar gratis
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Red Section: Share */}
      <section className="bg-[#780016] text-[#E9C0E9] py-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUpBlur} className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white">
              Compártelo donde quieras.
            </motion.h2>
            <motion.p variants={fadeInUpBlur} className="text-xl font-medium leading-relaxed text-white/90">
              Agrega tu URL única de LinkMaster a todas las plataformas donde está tu audiencia. Luego usa tu código QR para llevar tráfico offline a tu mundo online.
            </motion.p>
            <motion.button onClick={onLogin} variants={fadeInUpBlur} className="bg-[#E9C0E9] text-[#780016] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors">
              Empieza ahora
            </motion.button>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Animated Social Cards */}
            <motion.div variants={fadeInUpBlur} className="bg-white p-6 rounded-3xl aspect-square flex flex-col items-center justify-center gap-4 transform translate-y-8 shadow-[0_20px_0_rgba(0,0,0,0.2)]">
              <Instagram size={48} className="text-pink-600" />
              <span className="text-[#780016] font-bold">Instagram</span>
            </motion.div>
            <motion.div variants={fadeInUpBlur} className="bg-[#00CAEA] p-6 rounded-3xl aspect-square flex flex-col items-center justify-center gap-4 shadow-[0_20px_0_rgba(0,0,0,0.2)]">
              <Globe size={48} className="text-white" />
              <span className="text-white font-bold">Web</span>
            </motion.div>
            <motion.div variants={fadeInUpBlur} className="bg-[#E9C0E9] p-6 rounded-3xl aspect-square flex flex-col items-center justify-center gap-4 transform -translate-y-8 shadow-[0_20px_0_rgba(0,0,0,0.2)]">
              <Youtube size={48} className="text-red-600" />
              <span className="text-[#780016] font-bold">Youtube</span>
            </motion.div>
            <motion.div variants={fadeInUpBlur} className="bg-[#2563EB] p-6 rounded-3xl aspect-square flex flex-col items-center justify-center gap-4 shadow-[0_20px_0_rgba(0,0,0,0.2)]">
              <Share2 size={48} className="text-white" />
              <span className="text-white font-bold">QR Code</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="bg-[#F3F3F1] py-32 px-6 md:px-12">
        <motion.div
          className="max-w-[1200px] mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#1e2330] mb-6">
            Analiza tu audiencia y mantenlos enganchados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Rastrea tu engagement a lo largo del tiempo, monitorea ingresos y aprende qué convierte mejor.
          </p>
        </motion.div>

        <motion.div
          className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUpBlur} className="bg-[#502274] rounded-[2rem] p-8 text-white flex flex-col justify-between min-h-[200px]">
            <BarChart2 size={32} className="opacity-50" />
            <div>
              <div className="text-4xl font-bold mb-1">12,453</div>
              <div className="text-sm font-medium opacity-70">Visitas totales</div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUpBlur} className="bg-[#780016] rounded-[2rem] p-8 text-white flex flex-col justify-between min-h-[200px]">
            <CreditCard size={32} className="opacity-50" />
            <div>
              <div className="text-4xl font-bold mb-1">$4,290</div>
              <div className="text-sm font-medium opacity-70">Ventas en Catálogo</div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUpBlur} className="bg-[#00CAEA] rounded-[2rem] p-8 text-white flex flex-col justify-between min-h-[200px]">
            <ShoppingBag size={32} className="opacity-50" />
            <div>
              <div className="text-4xl font-bold mb-1">8.5%</div>
              <div className="text-sm font-medium opacity-70">Tasa de Conversión</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Creators Grid */}
      <section className="bg-white py-20 px-4">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-4xl md:text-5xl font-black text-[#1e2330] mb-12 tracking-tighter"
        >
          El link in bio en el que confían los creadores
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-[1600px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUpBlur}><CreatorCard name="Selena" image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" /></motion.div>
          <motion.div variants={fadeInUpBlur}><CreatorCard name="TechDaily" image="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=300" /></motion.div>
          <motion.div variants={fadeInUpBlur}><CreatorCard name="Chef Mike" image="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=300" /></motion.div>
          <motion.div variants={fadeInUpBlur}><CreatorCard name="YogaWithMe" image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300" /></motion.div>
          <motion.div variants={fadeInUpBlur}><CreatorCard name="Indie Band" image="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=300" /></motion.div>
          <motion.div variants={fadeInUpBlur}><CreatorCard name="HBO Max" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" /></motion.div>
        </motion.div>
      </section>

      {/* Monetization / Features */}
      <section className="bg-[#F3F3F1] py-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="space-y-8 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Card 1 */}
            <motion.div variants={fadeInUpBlur} className="bg-[#E9C0E9] p-10 rounded-[2.5rem] relative overflow-hidden group">
              <h3 className="text-3xl font-black text-[#502274] mb-4 pr-10">Comparte contenido de formas ilimitadas</h3>
              <div className="flex gap-2 mb-4">
                <span className="bg-white p-2 rounded-full"><Music size={20} /></span>
                <span className="bg-white p-2 rounded-full"><Video size={20} /></span>
              </div>
              <img src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=300" className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full object-cover border-4 border-white transform group-hover:scale-110 transition-transform" />
            </motion.div>
            {/* Card 2 */}
            <motion.div variants={fadeInUpBlur} className="bg-[#00CAEA] p-10 rounded-[2.5rem] relative overflow-hidden group">
              <h3 className="text-3xl font-black text-white mb-4 pr-20">Vende productos y colecta pagos</h3>
              <div className="bg-[#0f172a] text-[#00CAEA] inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm">
                <DollarSign size={16} /> Comisiones 0%
              </div>
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=300" className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full object-cover border-4 border-black transform group-hover:scale-110 transition-transform" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#2563EB] rounded-[2.5rem] p-12 text-white flex flex-col items-center text-center justify-center relative overflow-hidden"
          >
            <div className="z-10 space-y-6">
              <h3 className="text-4xl md:text-5xl font-black leading-tight">
                Crece, posee e involucra a tu audiencia.
              </h3>
              <button onClick={onLogin} className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                Explora los planes
              </button>
            </div>
            <div className="mt-12 transform scale-110 md:scale-125 translate-y-10">
              <MobilePreview profile={{
                ...demoProfiles[0],
                theme: 'blue',
                products: [
                  { id: '1', name: 'Curso de Marketing', price: '$49', description: 'Aprende a vender', image: 'https://picsum.photos/200', active: true },
                  { id: '2', name: 'Ebook PDF', price: '$12', description: 'Descarga inmediata', image: 'https://picsum.photos/201', active: true }
                ]
              }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured In */}
      <section className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-black text-gray-900 mb-10">Como aparece en...</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50">
            <span className="text-2xl font-serif font-bold">TechCrunch</span>
            <span className="text-2xl font-serif font-bold italic">Forbes</span>
            <span className="text-2xl font-sans font-bold">Insider</span>
            <span className="text-2xl font-mono font-bold">VICE</span>
            <span className="text-2xl font-serif font-bold">Vogue</span>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#F3F3F1] py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#00CAEA] mb-8">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#1e2330] leading-tight mb-6">
            “LinkMaster simplifica el proceso para que los creadores compartan múltiples partes de sí mismos en un solo enlace inclusivo.”
          </h2>
          <p className="text-lg font-medium text-gray-500">
            Riley Lemon, Youtuber & Creador
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-32 px-6 md:px-12">
        <div className="max-w-[1000px] mx-auto">
          <motion.div
            className="text-center mb-20 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-[#1e2330] tracking-tighter">
              Preguntas <span className="text-[#502274] bg-[#E9C0E9] px-2 rounded-lg transform -rotate-2 inline-block">frecuentes</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              Todo lo que necesitas saber para empezar a construir tu presencia online.
            </p>
          </motion.div>

          {/* FAQ Categories / List */}
          <div className="space-y-4">
            <FaqItem
              question="¿Qué es LinkMaster y para qué sirve?"
              answer="LinkMaster es una herramienta que te permite agrupar todos tus enlaces importantes en una sola página personalizada. Es ideal para usar en biografías de redes sociales como Instagram, TikTok o Twitter que solo permiten un enlace."
              isOpen={openFaqIndex === 0}
              onClick={() => toggleFaq(0)}
            />
            <FaqItem
              question="¿Puedo usar mi propio dominio personalizado?"
              answer="¡Sí! En nuestros planes Pro y Business puedes conectar tu propio dominio (ej. enlaces.tu-marca.com) para una experiencia totalmente profesional y alineada con tu branding."
              isOpen={openFaqIndex === 1}
              onClick={() => toggleFaq(1)}
            />
            <FaqItem
              question="¿Cómo funcionan los pagos y comisiones?"
              answer="LinkMaster se integra directamente con plataformas de pago. En el plan gratuito cobramos una pequeña comisión por transacción. En los planes de pago, ¡la comisión es del 0%! El dinero va directo a tu cuenta bancaria."
              isOpen={openFaqIndex === 2}
              onClick={() => toggleFaq(2)}
            />
            <FaqItem
              question="¿Puedo personalizar el diseño de mi página?"
              answer="Totalmente. Ofrecemos docenas de plantillas profesionales, pero también puedes crear la tuya desde cero eligiendo colores, fuentes, estilos de botones y fondos animados. Tu imaginación es el límite."
              isOpen={openFaqIndex === 3}
              onClick={() => toggleFaq(3)}
            />
            <FaqItem
              question="¿Tengo acceso a analíticas y estadísticas?"
              answer="Sí, desde el primer día. Podrás ver cuántas personas visitan tu perfil, de dónde vienen (país, red social) y en qué enlaces hacen más clic. Los planes superiores ofrecen datos más detallados e integración con Google Analytics."
              isOpen={openFaqIndex === 4}
              onClick={() => toggleFaq(4)}
            />
            <FaqItem
              question="¿Es seguro y privado?"
              answer="La seguridad es nuestra prioridad. Utilizamos encriptación SSL en todas las páginas y cumplimos con las normas GDPR. Tus datos y los de tus visitantes están protegidos."
              isOpen={openFaqIndex === 5}
              onClick={() => toggleFaq(5)}
            />
          </div>

          <div className="text-center mt-16">
            <p className="text-lg font-medium text-gray-600 mb-6">¿Tienes más preguntas?</p>
            <button className="bg-[#1e2330] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
              <Mail size={20} /> Contáctanos
            </button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#502274] py-40 px-6 text-center relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 left-10 w-64 h-64 bg-[#E9C0E9] rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-10 w-96 h-96 bg-[#00CAEA] rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-10">
          <h2 className="text-5xl md:text-7xl font-black text-[#00CAEA] leading-none tracking-tight">
            Impulsa tu rincón en internet hoy.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="bg-white rounded-lg p-4 flex-1 flex items-center shadow-lg">
              <span className="text-gray-400 font-bold">linkmaster.app/</span>
              <input
                type="text"
                placeholder="tu-nombre"
                className="w-full outline-none bg-transparent font-bold ml-1 text-black placeholder-gray-400"
              />
            </div>
            <button onClick={onLogin} className="bg-[#00CAEA] text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform whitespace-nowrap">
              Únete gratis
            </button>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h4 className="font-bold text-lg mb-6">Compañía</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li><a href="#" className="hover:underline">Blog LinkMaster</a></li>
              <li><a href="#" className="hover:underline">Ingeniería</a></li>
              <li><a href="#" className="hover:underline">Carreras</a></li>
              <li><a href="#" className="hover:underline">Prensa</a></li>
              <li><a href="#" className="hover:underline">Bien social</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Comunidad</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li><a href="#" className="hover:underline">LinkMaster para Empresas</a></li>
              <li><a href="#" className="hover:underline">Donaciones</a></li>
              <li><a href="#" className="hover:underline">Embajadores</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Soporte</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li><a href="#" className="hover:underline">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:underline">Estado del sistema</a></li>
              <li><a href="#" className="hover:underline">Reportar violación</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-600 text-sm font-medium">
              <li><a href="#" className="hover:underline">Privacidad</a></li>
              <li><a href="#" className="hover:underline">Términos</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-gray-200">
          <div className="flex gap-4">
            <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" className="w-6 h-auto" alt="US" />
            </button>
            <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg" className="w-6 h-auto" alt="MX" />
            </button>
          </div>
          <div className="flex gap-6">
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><Instagram size={20} /></a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><Twitter size={20} /></a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><Facebook size={20} /></a>
            <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><Linkedin size={20} /></a>
          </div>
        </div>

        <div className="text-center mt-12 text-xs text-gray-500 font-medium max-w-2xl mx-auto">
          Reconocemos a los Custodios Tradicionales de la tierra en la que trabajamos. Rendimos respeto a los Ancianos pasados, presentes y emergentes.
        </div>
      </footer>
    </div>
  );
}