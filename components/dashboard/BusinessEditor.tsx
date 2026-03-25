import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { BusinessInfo } from '@/lib/types';

interface BusinessEditorProps {
  businessInfo: BusinessInfo;
  onUpdate: (field: keyof BusinessInfo, value: any) => void;
}

export default function BusinessEditor({ businessInfo, onUpdate }: BusinessEditorProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter text-[#1e2330]">Empresa</h2>
          <p className="text-gray-500 font-medium">Información corporativa visible</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
          <span className="text-sm font-bold text-gray-700">Mostrar en perfil</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={businessInfo.active}
              onChange={(e) => onUpdate('active', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E9C0E9] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D2E823]"></div>
          </label>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1 flex items-center gap-2">
              <Briefcase size={14} /> Empresa
            </label>
            <input
              type="text"
              value={businessInfo.companyName}
              onChange={(e) => onUpdate('companyName', e.target.value)}
              className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-bold focus:ring-[#502274] focus:border-[#502274]"
              placeholder="Nombre de la empresa"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1 flex items-center gap-2">
              <FileText size={14} /> RNC / Tax ID
            </label>
            <input
              type="text"
              value={businessInfo.rnc}
              onChange={(e) => onUpdate('rnc', e.target.value)}
              className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-mono font-medium focus:ring-[#502274] focus:border-[#502274]"
              placeholder="000-00000-0"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1 flex items-center gap-2">
              <Phone size={14} /> Teléfono
            </label>
            <input
              type="text"
              value={businessInfo.phone}
              onChange={(e) => onUpdate('phone', e.target.value)}
              className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-medium focus:ring-[#502274] focus:border-[#502274]"
              placeholder="+1 (809) ..."
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1 flex items-center gap-2">
              <Mail size={14} /> Email
            </label>
            <input
              type="email"
              value={businessInfo.email}
              onChange={(e) => onUpdate('email', e.target.value)}
              className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-medium focus:ring-[#502274] focus:border-[#502274]"
              placeholder="contacto@empresa.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1 flex items-center gap-2">
              <Globe size={14} /> Sitio Web
            </label>
            <input
              type="url"
              value={businessInfo.website}
              onChange={(e) => onUpdate('website', e.target.value)}
              className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-medium focus:ring-[#502274] focus:border-[#502274]"
              placeholder="https://www.empresa.com"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black uppercase tracking-wider text-gray-400 ml-1 flex items-center gap-2">
                <MapPin size={14} /> Mapa Interactivo
              </label>
              <div className="flex items-center gap-2 bg-[#F3F3F1] px-3 py-1.5 rounded-full border border-gray-200">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Activar Mapa</span>
                <label className="relative inline-flex items-center cursor-pointer scale-75">
                  <input
                    type="checkbox"
                    checked={businessInfo.showMap || false}
                    onChange={(e) => onUpdate('showMap', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#502274]"></div>
                </label>
              </div>
            </div>
            <input
              type="text"
              value={businessInfo.mapUrl || ''}
              onChange={(e) => onUpdate('mapUrl', e.target.value)}
              className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-medium focus:ring-[#502274] focus:border-[#502274]"
              placeholder="Pega el link de Google Maps compartido (ej: https://maps.app.goo.gl/...)"
            />
            <p className="text-[10px] text-gray-400 font-medium italic ml-1 leading-relaxed">
              * El mapa se mostrará visualmente en tu perfil si esta opción está activa y el catálogo es público.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1 flex items-center gap-2">
              <MapPin size={14} /> Dirección Física (Texto)
            </label>
            <textarea
              rows={2}
              value={businessInfo.address}
              onChange={(e) => onUpdate('address', e.target.value)}
              className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 px-4 font-medium focus:ring-[#502274] focus:border-[#502274]"
              placeholder="Av. Winston Churchill..."
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
