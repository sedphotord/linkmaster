
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Wand2, LogOut, User, Image, Type, RectangleHorizontal, Paintbrush, Sparkles, Video, Zap, Waves, Upload, X, List, ArrowUp, ArrowDown, Grid3x3, Check } from 'lucide-react';
import { UserProfile, ThemeId } from '@/lib/types';
import { themeOptions } from '@/lib/data';
import SectionOrderEditor from './SectionOrderEditor';

interface AppearanceEditorProps {
  profile: UserProfile;
  onUpdateField: (field: keyof UserProfile, value: any) => void;
  onUpdateAppearance: (field: keyof UserProfile['appearance'] | Partial<UserProfile['appearance']>, value?: any) => void;
  onGenerateBio: () => void;
  isGeneratingBio: boolean;
  onLogout: () => void;
}


// ── Tabs ─────────────────────────────────────────
type TabId = 'header' | 'sections' | 'theme' | 'wallpaper' | 'text' | 'buttons' | 'colors' | 'footer';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'header', label: 'Header', icon: <User size={18} /> },
  {
    id: 'sections',
    label: 'Secciones',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={18} height={18}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    )
  },
  { id: 'theme', label: 'Tema', icon: <Palette size={18} /> },
  { id: 'wallpaper', label: 'Fondo', icon: <Image size={18} /> },
  { id: 'text', label: 'Texto', icon: <Type size={18} /> },
  { id: 'buttons', label: 'Tarjetas', icon: <RectangleHorizontal size={18} /> },
  { id: 'colors', label: 'Colores', icon: <Paintbrush size={18} /> },
  { id: 'footer', label: 'Footer', icon: <Sparkles size={18} /> },
];

// ── Font Options ─────────────────────────────────
const FONT_OPTIONS = [
  'Inter', 'Roboto', 'DM Sans', 'Outfit', 'Poppins',
  'Albert Sans', 'Belanosima', 'Bricolage Grotesque', 'Epilogue',
  'IBM Plex Sans', 'Lato', 'Manrope', 'Oxanium',
  'Red Hat Display', 'Rubik', 'Space Grotesk', 'Syne',
  'Playfair Display', 'BioRhyme', 'Bitter', 'Caudex',
  'Corben', 'Domine', 'Hahmlet', 'IBM Plex Serif',
  'Lora', 'Merriweather', 'Noto Serif', 'Old Standard TT',
  'PT Serif', 'Roboto Serif', 'Roboto Slab', 'Source Serif 4',
  'IBM Plex Mono', 'Space Mono', 'Shantell Sans',
  'Montserrat', 'Raleway', 'Nunito', 'Quicksand', 'Oswald',
  'M PLUS Rounded 1c'
];

// ── Theme Data ───────────────────────────────────
// Theme Data moved to @/lib/data

const BACKGROUND_LIBRARY = [
  { id: 'natural', label: 'Efecto Natural', items: ['03c6c1d3de17b1bbdc97bd1d614548b7.jpg', '0c7cdecc4e0928beb7a15a69e5bbd033.jpg', '1d34527aba601ab5c257ada8c448932e.jpg', '2bcf6e2466da85435600ef5011057898.jpg', '47560b95df565c38219e2eeabdbba8dd.jpg', '49c9e9d5e31fe14b89adbf5a50a11d1e.jpg', '81bb5e14ff64c1c54a3075a8b17214f8.jpg', 'd48993dc5aa53a2224607b4f3925f441.jpg'] },
  { id: 'patrones', label: 'Patrones', items: ['0b665ae751a37750c1f15f2d424d7770.jpg', '13fa2020f67f73726635b8d0ba5bd3a9.jpg', '1fd8092f860e795e99ea277261e7b1fb.jpg', '3d2be09190612bec1856d4227f251d91.jpg', '41257b1019454331f7790b9446591149.jpg', '4a9acc78ecd35a087a7140320fd24112.jpg', '586e37b7d25790acfc83f9b4dcf53262.jpg', '664150bf5fcd9b5c913fa253d13642d9.jpg', '9a893ea33e5a31377c37ad858af490b5.jpg', 'a22d67537871c83747cfcc01152476fe.jpg', 'a666224949ed0445ceee5511641a2e4b.jpg', 'c67cb7d12bffc91112ec10e702bd22d9.jpg', 'ce51ac4b04e9f563028636bd59224d78.jpg'] },
  { id: 'holographics', label: 'Holográficos', items: ['0aa94c87d49b90d72b804507b8a7f7d4.jpg', '3525342aa7d7772e161c52959ce79766.jpg', 'ac9fbfcf4aabb56bfddf58eb579b4708.jpg'] },
  { id: 'gradiente', label: 'Gradientes', items: ['0b60b6e4efd7d08363f9ba2e82dca6c8.jpg', '1a1dd07d4343f59383ae9fa915f9700c.jpg', '1bb8eb8b1040861da3bb4e651ff7962b.jpg', '27ae1c57a182c06f1274afd8cfe26c8c.jpg', '414903bcec3deb383e6a3438dc1f6a9a.jpg', '596db23b9cc516f27b24927e0d4d6480.jpg', '5c257cfdd7117e908df8b9f304bf1899.jpg', '7d99a1fd7864acdc6363fea1d6a87c67.jpg', '89e4eb4e9075233d991b74e95a99c56d.jpg', '9f86419624cc697d813bf1e9ac20399a.jpg', 'descarga.png', 'e6d9c1002b5e7d5b55f82603f03a89db.jpg', 'f75c256509b445ed91abc8946679cf60.jpg'] }
];

// ── Color Input Helper ───────────────────────────
function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 mb-2">{label}</label>
      <div className="flex items-center gap-2 bg-[#F3F3F1] rounded-xl px-3 py-2.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 bg-transparent border-none text-sm font-mono font-medium focus:ring-0 p-0"
        />
        <input
          type="color"
          value={value?.startsWith('#') ? value : '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 p-0 rounded-full cursor-pointer border-2 border-gray-200"
        />
      </div>
    </div>
  );
}

// ── Font Selector ────────────────────────────────
function FontSelect({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#F3F3F1] border-none rounded-xl py-3 px-4 text-sm font-medium focus:ring-[#502274] focus:ring-2 cursor-pointer"
      >
        {FONT_OPTIONS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
      </select>
    </div>
  );
}

// ── Toggle Group ─────────────────────────────────
function ToggleGroup({ label, options, value, onChange }: {
  label: string;
  options: { id: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 mb-3">{label}</label>
      <div className="flex bg-[#F3F3F1] rounded-xl p-1 gap-1">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${value === opt.id
              ? 'bg-white shadow-sm text-[#502274]'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════
export default function AppearanceEditor({ profile, onUpdateField, onUpdateAppearance, onGenerateBio, isGeneratingBio, onLogout }: AppearanceEditorProps) {
  const [activeTab, setActiveTab] = useState<TabId>('header');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Persist changes explicitly
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const wallImageInputRef = useRef<HTMLInputElement>(null);
  const wallVideoInputRef = useRef<HTMLInputElement>(null);

  const ap = profile.appearance;

  // Cover Upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Imagen muy grande (max 5MB)'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateAppearance('coverImage', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Wallpaper Upload
  const handleWallpaperUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert('Archivo muy grande (max 10MB)'); return; }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'image') {
        onUpdateAppearance('customBackground', reader.result as string);
        onUpdateAppearance('wallpaperStyle', 'image');
      } else {
        onUpdateAppearance('customVideo', reader.result as string);
        onUpdateAppearance('wallpaperStyle', 'video');
      }
    };
    reader.readAsDataURL(file);
  };

  // Avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Imagen muy grande (max 5MB)'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onUpdateField('avatar', reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // ─── HEADER TAB ──────────────────────────
  const HeaderTab = () => (
    <div className="space-y-7">
      {/* Profile Image */}
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-3">Imagen de Perfil</label>
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
            <img src={profile.avatar} className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 group-hover:border-[#502274] transition-colors" alt="Avatar" />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-[10px] font-bold uppercase">Editar</span>
            </div>
          </div>
          <button
            onClick={() => avatarInputRef.current?.click()}
            className="px-4 py-2 bg-[#F3F3F1] rounded-xl text-sm font-bold hover:bg-gray-200 transition"
          >
            Editar
          </button>
          <input ref={avatarInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
        </div>
      </div>

      <ToggleGroup
        label="Layout de imagen"
        options={[
          { id: 'classic', label: 'Clasico', icon: <User size={14} /> },
          { id: 'hero', label: 'Hero', icon: <Image size={14} /> },
        ]}
        value={ap.profileImageLayout || 'classic'}
        onChange={(v) => onUpdateAppearance('profileImageLayout', v)}
      />

      {/* Hero Cover Image (Only if Hero) */}
      <AnimatePresence>
        {ap.profileImageLayout === 'hero' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#F3F3F1] p-4 rounded-xl space-y-6 mb-4">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Portada del Hero</label>

                {/* Cover Library */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Pre-diseñados</p>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                    {BACKGROUND_LIBRARY.map(cat => (
                      <div key={cat.id} className="space-y-2">
                        <h4 className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter opacity-70">{cat.label}</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {cat.items.map(img => (
                            <button
                              key={img}
                              onClick={() => onUpdateAppearance('coverImage', `/backgrouds/${cat.id}/${img}`)}
                              className={`aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${ap.coverImage === `/backgrouds/${cat.id}/${img}` ? 'border-[#502274] ring-2 ring-purple-100 shadow-md' : 'border-transparent bg-gray-200'}`}
                            >
                              <img src={`/backgrouds/${cat.id}/${img}`} className="w-full h-full object-cover" alt={cat.label} />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tu propia imagen</p>
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#502274] transition-colors cursor-pointer group" onClick={() => coverInputRef.current?.click()}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-gray-400 group-hover:text-[#502274] transition-colors shadow-sm"><Image size={18} /></div>
                    <span className="text-xs font-bold text-gray-600">Sube tu Imagen</span>
                  </div>
                  <Upload size={14} className="text-gray-400" />
                </div>
                <input ref={coverInputRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verified Badge */}
      <div className="flex items-center justify-between bg-[#F3F3F1] p-3 rounded-xl mb-2">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.2,6.84-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" fill="#00B6FF"></path>
          </svg>
          <span className="text-sm font-bold text-gray-700">Perfil Verificado</span>
        </div>
        <div className="flex bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => onUpdateAppearance('verified', true)}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${ap.verified ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
          >
            Si
          </button>
          <button
            onClick={() => onUpdateAppearance('verified', false)}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${!ap.verified ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
          >
            No
          </button>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-2">Titulo</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => onUpdateField('name', e.target.value)}
          className="w-full bg-[#F3F3F1] border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-[#502274] focus:ring-2"
          placeholder="@tuusuario"
        />
      </div>

      {/* Title Style */}
      <ToggleGroup
        label="Estilo del titulo"
        options={[
          { id: 'text', label: 'Texto' },
          { id: 'logo', label: 'Logo' },
        ]}
        value={ap.titleStyle || 'text'}
        onChange={(v) => onUpdateAppearance('titleStyle', v)}
      />

      {/* Title Size */}
      <ToggleGroup
        label="Tamaño"
        options={[
          { id: 'small', label: 'Small' },
          { id: 'large', label: 'Large' },
        ]}
        value={ap.titleSize || 'small'}
        onChange={(v) => onUpdateAppearance('titleSize', v)}
      />

      {/* Title Font */}
      <FontSelect
        label="Fuente del titulo"
        value={ap.titleFont || 'Inter'}
        onChange={(v) => onUpdateAppearance('titleFont', v)}
      />

      {/* Title Color */}
      <ColorInput
        label="Color del titulo"
        value={ap.titleColor || '#000000'}
        onChange={(v) => onUpdateAppearance('titleColor', v)}
      />

      {/* Bio */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-bold text-gray-500">Biografia</label>
          <button
            onClick={onGenerateBio}
            disabled={isGeneratingBio}
            className="text-xs text-[#502274] bg-purple-50 px-3 py-1 rounded-lg flex items-center gap-1.5 hover:bg-[#E9C0E9] transition-colors font-bold"
          >
            <Wand2 size={12} /> {isGeneratingBio ? 'Generando...' : 'Mejorar con IA'}
          </button>
        </div>
        <textarea
          rows={3}
          value={profile.bio}
          onChange={(e) => onUpdateField('bio', e.target.value)}
          className="w-full bg-[#F3F3F1] border-none rounded-xl py-3 px-4 text-sm focus:ring-[#502274] focus:ring-2"
          placeholder="Cuentanos sobre ti..."
        />
      </div>

      {/* Username */}
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-2">Tu LinkMaster</label>
        <div className="flex items-center bg-[#F3F3F1] rounded-xl px-4 py-3">
          <span className="text-gray-400 font-bold text-sm select-none mr-1">linkmaster.app/</span>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => onUpdateField('username', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-[#1e2330] flex-1 w-full"
            placeholder="tu-usuario"
          />
        </div>
      </div>
    </div >
  );

  // ─── THEME TAB ───────────────────────────
  const ThemeTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
        {themeOptions.map((theme) => (
          <button
            key={theme.id}
            onClick={() => {
              onUpdateField('theme', theme.id);
              // Reset appearance overrides to let theme background show (Batched Update)
              onUpdateAppearance({
                wallpaperStyle: undefined,
                customBackground: undefined,
                backgroundColor: undefined,
                gradientColor2: undefined,
                pageFont: undefined,
                pageTextColor: undefined,
                titleFont: undefined,
                titleColor: undefined,
              });
            }}
            className={`aspect-square rounded-2xl border-3 relative overflow-hidden transition-all hover:scale-105 active:scale-95 group ${profile.theme === theme.id
              ? 'ring-3 ring-[#502274] ring-offset-2'
              : 'border-transparent hover:ring-2 hover:ring-gray-200'
              }`}
          >
            {/* Two-tone swatch */}
            <div className="absolute inset-0 flex">
              <div className="flex-1" style={{ backgroundColor: theme.colors[0] }} />
              <div className="w-1/3" style={{ backgroundColor: theme.colors[1] }} />
            </div>
            {/* Name badge */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap">
              {theme.name}
            </div>
            {/* Custom icon */}
            {theme.id === 'custom' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Palette size={24} className="text-gray-400" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Custom theme colors */}
      <AnimatePresence>
        {profile.theme === 'custom' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-[#F3F3F1] p-5 rounded-2xl space-y-4 border-2 border-dashed border-[#502274]/20">
              <p className="text-xs font-bold text-[#502274] uppercase tracking-wider">Personalizacion Custom</p>
              <ColorInput label="Fondo" value={ap.customBackground || '#ffffff'} onChange={(v) => onUpdateAppearance('customBackground', v)} />
              <ColorInput label="Color de Texto" value={ap.customTextColor || '#000000'} onChange={(v) => onUpdateAppearance('customTextColor', v)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // ─── WALLPAPER TAB ───────────────────────
  const WallpaperTab = () => {
    const style = ap.wallpaperStyle || 'fill';
    const bg1 = ap.backgroundColor || '#ffffff';
    const bg2 = ap.gradientColor2 || '#e2e8f0';

    const PRESET_GRADIENTS = [
      { bg1: '#fbc2eb', bg2: '#a6c1ee' },
      { bg1: '#84fab0', bg2: '#8fd3f4' },
      { bg1: '#a1c4fd', bg2: '#c2e9fb' },
      { bg1: '#ff9a9e', bg2: '#fecfef' },
      { bg1: '#fccb90', bg2: '#d57eeb' },
      { bg1: '#e0c3fc', bg2: '#8ec5fc' },
      { bg1: '#4facfe', bg2: '#00f2fe' },
      { bg1: '#43e97b', bg2: '#38f9d7' },
      { bg1: '#fa709a', bg2: '#fee140' },
      { bg1: '#30cfd0', bg2: '#330867' },
    ];

    return (
      <div className="space-y-7">
        {/* Style Grid */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-3">Estilo de fondo</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { id: 'fill', label: 'Color', icon: <div className="w-full h-full rounded-lg bg-gray-200" style={{ backgroundColor: bg1 }} /> },
              { id: 'gradient', label: 'Gradiente', icon: <div className="w-full h-full rounded-lg" style={{ background: `linear-gradient(135deg, ${bg1}, ${bg2})` }} /> },
              { id: 'blur', label: 'Blur', icon: <div className="w-full h-full rounded-lg bg-gray-200 backdrop-blur-sm border border-white/20" /> },
              { id: 'pattern', label: 'Patron', icon: <div className="w-full h-full rounded-lg bg-gray-100" style={{ backgroundImage: 'repeating-conic-gradient(#00000010 0 25%, transparent 0 50%)', backgroundSize: '10px 10px' }} /> },
              { id: 'image', label: 'Imagen', icon: <Image size={20} className="text-gray-400" /> },
              { id: 'video', label: 'Video', icon: <Video size={20} className="text-gray-400" /> },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => {
                  if (opt.id === 'image') wallImageInputRef.current?.click();
                  else if (opt.id === 'video') wallVideoInputRef.current?.click();
                  else onUpdateAppearance('wallpaperStyle', opt.id);
                }}
                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all p-2 ${style === opt.id ? 'border-[#502274] bg-purple-50' : 'border-gray-100 hover:border-gray-200'
                  }`}
              >
                <div className="flex-1 flex items-center justify-center w-full h-8 overflow-hidden">{opt.icon}</div>
                <span className="text-[10px] font-bold text-gray-500">{opt.label}</span>
              </button>
            ))}
          </div>
          <input type="file" ref={wallImageInputRef} className="hidden" accept="image/*" onChange={(e) => handleWallpaperUpload(e, 'image')} />
          <input type="file" ref={wallVideoInputRef} className="hidden" accept="video/*" onChange={(e) => handleWallpaperUpload(e, 'video')} />
        </div>

        {/* Conditional Controls */}
        {style === 'fill' && <ColorInput label="Color solido" value={bg1} onChange={(v) => onUpdateAppearance('backgroundColor', v)} />}

        {(style === 'gradient' || style === 'blur' || style === 'pattern') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <ColorInput label="Color 1" value={bg1} onChange={(v) => onUpdateAppearance('backgroundColor', v)} />
              <ColorInput label="Color 2" value={bg2} onChange={(v) => onUpdateAppearance('gradientColor2', v)} />
            </div>

            {/* Pre-made Gradients */}
            {style === 'gradient' && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-3">Gradientes Pre-diseñados</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_GRADIENTS.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onUpdateAppearance('backgroundColor', g.bg1);
                        onUpdateAppearance('gradientColor2', g.bg2);
                      }}
                      className="w-10 h-10 rounded-full border border-gray-100 shadow-sm hover:scale-110 transition-transform"
                      style={{ background: `linear-gradient(135deg, ${g.bg1}, ${g.bg2})` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Animate Toggle */}
            {style === 'gradient' && (
              <div className="flex items-center justify-between bg-[#F3F3F1] p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 text-[#502274] rounded-lg"><Zap size={16} /></div>
                  <span className="text-xs font-bold text-gray-700">Animar Gradiente</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={ap.wallpaperAnimate || false} onChange={(e) => onUpdateAppearance('wallpaperAnimate', e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#502274]"></div>
                </label>
              </div>
            )}
          </motion.div>
        )}

        {/* Background Library Section */}
        <div className="space-y-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Biblioteca de Fondos</p>

          {BACKGROUND_LIBRARY.map(cat => (
            <div key={cat.id} className="space-y-3">
              <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> {cat.label}
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {cat.items.map(img => (
                  <button
                    key={img}
                    onClick={() => {
                      onUpdateAppearance({
                        wallpaperStyle: 'image',
                        customBackground: `${cat.id}/${img}`
                      });
                    }}
                    className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${ap.customBackground === `${cat.id}/${img}` ? 'border-[#502274] ring-2 ring-purple-100 shadow-md' : 'border-transparent bg-gray-100 hover:border-gray-300'}`}
                  >
                    <img src={`/backgrouds/${cat.id}/${img}`} className="w-full h-full object-cover" alt={cat.label} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Filter Sliders */}
        <div className="bg-[#F3F3F1] p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 text-[#502274]">
            <Zap size={16} />
            <p className="text-xs font-bold uppercase tracking-wider">Filtros de Fondo</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-gray-600">Desenfoque (Blur)</label>
                <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-lg border border-gray-200">
                  {ap.wallpaperBlur || 0}px
                </span>
              </div>
              <input
                type="range" min="0" max="25"
                value={ap.wallpaperBlur || 0}
                onChange={(e) => onUpdateAppearance('wallpaperBlur', parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#502274]"
              />
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-gray-600">Saturación</label>
                <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-lg border border-gray-200">
                  {ap.wallpaperSaturation || 100}%
                </span>
              </div>
              <input
                type="range" min="0" max="200"
                value={ap.wallpaperSaturation || 100}
                onChange={(e) => onUpdateAppearance('wallpaperSaturation', parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#502274]"
              />
            </div>
          </div>
        </div>

        {/* Noise Toggle */}
        <div className="flex items-center justify-between bg-[#F3F3F1] p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-200 text-gray-600 rounded-lg"><Waves size={16} /></div>
            <span className="text-xs font-bold text-gray-700">Ruido (Noise)</span>
          </div>
          <div className="flex bg-gray-200 p-1 rounded-lg">
            <button onClick={() => onUpdateAppearance('wallpaperNoise', true)} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${ap.wallpaperNoise ? 'bg-white shadow-sm text-[#502274]' : 'text-gray-500'}`}>Activado</button>
            <button onClick={() => onUpdateAppearance('wallpaperNoise', false)} className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${!ap.wallpaperNoise ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}>Desactivado</button>
          </div>
        </div>

      </div>
    );
  };

  // ─── TEXT TAB ────────────────────────────
  const TextTab = () => (
    <div className="space-y-7">
      <FontSelect label="Fuente de la pagina" value={ap.pageFont || 'DM Sans'} onChange={(v) => onUpdateAppearance('pageFont', v)} />
      <ColorInput label="Color de texto de pagina" value={ap.pageTextColor || '#ffffff'} onChange={(v) => onUpdateAppearance('pageTextColor', v)} />
      <div className="border-t border-gray-100 pt-5" />
      <FontSelect label="Fuente del titulo" value={ap.titleFont || 'Inter'} onChange={(v) => onUpdateAppearance('titleFont', v)} />
      <ColorInput label="Color del titulo" value={ap.titleColor || '#000000'} onChange={(v) => onUpdateAppearance('titleColor', v)} />
      <ToggleGroup
        label="Tamaño del titulo"
        options={[
          { id: 'small', label: 'Small' },
          { id: 'large', label: 'Large' },
        ]}
        value={ap.titleSize || 'small'}
        onChange={(v) => onUpdateAppearance('titleSize', v)}
      />
    </div>
  );

  // ─── CARDS TAB ─────────────────────────
  const CardsTab = () => (
    <div className="space-y-7">
      {/* Card/Button Style */}
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-3">Estilo de Tarjetas y Botones</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'solid', label: 'Solido', preview: 'bg-gray-800' },
            { id: 'glass', label: 'Glass', preview: 'bg-gray-200/60 backdrop-blur border border-gray-300' },
            { id: 'outline', label: 'Outline', preview: 'bg-transparent border-2 border-gray-800' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => onUpdateAppearance('buttonStyle', opt.id)}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${(ap.buttonStyle || 'solid') === opt.id ? 'border-[#502274] bg-purple-50' : 'border-gray-100 hover:border-gray-300'
                }`}
            >
              <div className={`w-full h-8 rounded-lg ${opt.preview}`} />
              <span className="text-[10px] font-bold text-gray-600">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Corner Roundness */}
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-3">Redondez de esquinas</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'square', label: 'Square', radius: 'rounded-none' },
            { id: 'round', label: 'Round', radius: 'rounded-md' },
            { id: 'rounder', label: 'Rounder', radius: 'rounded-xl' },
            { id: 'full', label: 'Full', radius: 'rounded-full' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => onUpdateAppearance('buttonRoundness', opt.id)}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${(ap.buttonRoundness || 'round') === opt.id ? 'border-[#502274] bg-purple-50' : 'border-gray-100 hover:border-gray-300'
                }`}
            >
              <div className={`w-10 h-6 border-2 border-gray-400 ${opt.radius}`} />
              <span className="text-[10px] font-bold text-gray-600">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Button Color & Text Color */}
      <ColorInput label="Color del boton" value={ap.buttonColor || '#ffffff'} onChange={(v) => onUpdateAppearance('buttonColor', v)} />
      <ColorInput label="Color del texto del boton" value={ap.buttonTextColor || '#888888'} onChange={(v) => onUpdateAppearance('buttonTextColor', v)} />

      {/* Legacy: Button Shape for social icons */}
      <div className="border-t border-gray-100 pt-5">
        <ToggleGroup
          label="Forma de Enlaces"
          options={[
            { id: 'pill', label: 'Redondo' },
            { id: 'rounded', label: 'Semi' },
            { id: 'square', label: 'Cuadrado' },
          ]}
          value={ap.buttonShape}
          onChange={(v) => onUpdateAppearance('buttonShape', v)}
        />
      </div>

      {/* Social Icon Layout & Style */}
      <div className="border-t border-gray-100 pt-5 space-y-5">

        {/* Layout */}
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-3">Layout de iconos sociales</label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'list', label: 'Lista', icon: <List size={16} /> },
              { id: 'top_row', label: 'Arriba', icon: <ArrowUp size={16} /> },
              { id: 'bottom_row', label: 'Abajo', icon: <ArrowDown size={16} /> },
              { id: 'grid', label: 'Grid', icon: <Grid3x3 size={16} /> },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => onUpdateAppearance('socialLayout', opt.id)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${ap.socialLayout === opt.id ? 'border-[#502274] bg-purple-50 text-[#502274]' : 'border-gray-100 hover:border-gray-300 text-gray-400'
                  }`}
              >
                {opt.icon}
                <span className="text-[10px] font-bold text-gray-600">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <ToggleGroup
          label="Estilo de iconos"
          options={[
            { id: 'filled', label: 'Relleno' },
            { id: 'outline', label: 'Borde' },
            { id: 'transparent', label: 'Transparent' },
          ]}
          value={ap.socialIconStyle || 'filled'}
          onChange={(v) => onUpdateAppearance('socialIconStyle', v)}
        />

        {/* Shape */}
        <ToggleGroup
          label="Forma de iconos"
          options={[
            { id: 'circle', label: 'Circulo' },
            { id: 'rounded', label: 'Redondeado' },
            { id: 'square', label: 'Cuadrado' },
          ]}
          value={ap.socialIconShape || 'circle'}
          onChange={(v) => onUpdateAppearance('socialIconShape', v)}
        />
        {/* Load Example Data */}
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => {
              if (confirm('¿Cargar iconos sociales de ejemplo? Esto reemplazará tus links actuales.')) {
                onUpdateField('links', [
                  { id: '1', title: 'Instagram', url: 'https://instagram.com', active: true, icon: 'instagram' },
                  { id: '2', title: 'Facebook', url: 'https://facebook.com', active: true, icon: 'facebook' },
                  { id: '3', title: 'WhatsApp', url: 'https://wa.me/', active: true, icon: 'whatsapp' },
                  { id: '4', title: 'Website', url: 'https://mysite.com', active: true, icon: 'website' },
                  { id: '5', title: 'Tienda', url: 'https://myshop.com', active: true, icon: 'store' },
                ]);
              }
            }}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 font-bold text-xs hover:border-[#502274] hover:text-[#502274] transition-colors flex items-center justify-center gap-2"
          >
            <Upload size={14} /> Cargar Iconos de Ejemplo
          </button>
        </div>
      </div>
    </div>
  );

  // ─── COLORS TAB ──────────────────────────
  const ColorsTab = () => (
    <div className="space-y-7">
      {/* Social Icon Layout - Moved to ButtonsTab */}

      {/* Social Color Mode */}
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-3">Color de iconos sociales</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onUpdateAppearance('socialColorMode', 'theme')}
            className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${ap.socialColorMode === 'theme' ? 'border-[#502274] bg-purple-50' : 'border-gray-100 hover:border-gray-300'
              }`}
          >
            <div className="w-7 h-7 rounded-full bg-gray-800" />
            <span className="text-xs font-bold text-gray-700">Tema del perfil</span>
          </button>
          <button
            onClick={() => onUpdateAppearance('socialColorMode', 'brand')}
            className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${ap.socialColorMode === 'brand' ? 'border-[#502274] bg-purple-50' : 'border-gray-100 hover:border-gray-300'
              }`}
          >
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-[#E1306C]" />
              <div className="w-5 h-5 rounded-full bg-[#1877F2]" />
              <div className="w-5 h-5 rounded-full bg-[#25D366]" />
            </div>
            <span className="text-xs font-bold text-gray-700">Originales</span>
          </button>
        </div>
      </div>
    </div>
  );

  // ─── FOOTER TAB ──────────────────────────
  const FooterTab = () => (
    <div className="space-y-7">
      {/* Show Branding */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-800">Mostrar branding LinkMaster</p>
          <p className="text-xs text-gray-500">Muestra "Hecho con LinkMaster" al final</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={ap.showBranding !== false}
            onChange={(e) => onUpdateAppearance('showBranding', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#502274]" />
        </label>
      </div>

      {/* Footer Text */}
      <div>
        <label className="block text-xs font-bold text-gray-500 mb-2">Texto del footer</label>
        <input
          type="text"
          value={ap.footerText || ''}
          onChange={(e) => onUpdateAppearance('footerText', e.target.value)}
          className="w-full bg-[#F3F3F1] border-none rounded-xl py-3 px-4 text-sm focus:ring-[#502274] focus:ring-2"
          placeholder="Derechos reservados, etc."
        />
      </div>
    </div>
  );

  // ─── TAB CONTENT RENDERER ────────────────
  const renderTabContent = () => {
    switch (activeTab) {
      case 'header': return <HeaderTab />;
      case 'sections': return <SectionOrderEditor profile={profile} onUpdate={(updates) => Object.entries(updates).forEach(([k, v]) => onUpdateField(k as keyof UserProfile, v))} />;
      case 'theme': return <ThemeTab />;
      case 'wallpaper': return <WallpaperTab />;
      case 'text': return <TextTab />;
      case 'buttons': return <CardsTab />;
      case 'colors': return <ColorsTab />;
      case 'footer': return <FooterTab />;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter text-[#1e2330]">Diseno</h2>
          <p className="text-gray-500 font-medium">Personaliza cada detalle de tu perfil</p>
        </div>
        <button onClick={onLogout} className="md:hidden text-red-600 text-sm font-medium flex items-center gap-1">
          <LogOut size={16} /> Salir
        </button>
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-32 shrink-0 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${activeTab === tab.id
                ? 'bg-[#502274] text-white shadow-lg shadow-[#502274]/20'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="flex-1 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>

          {/* Floating Save Button inside Content */}
          <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`
                px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all transform active:scale-95 flex items-center gap-3 shadow-lg
                ${saveSuccess
                  ? 'bg-green-500 text-white shadow-green-100'
                  : 'bg-[#502274] text-white hover:bg-[#3d1a58] hover:-translate-y-1 shadow-purple-100'
                }
                ${isSaving ? 'opacity-80' : ''}
              `}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </>
              ) : saveSuccess ? (
                <>
                  <Check size={18} />
                  ¡Cambios Guardados!
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}