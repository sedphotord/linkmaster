'use client';

import React, { useState, useEffect } from 'react';
import { LayoutTemplate, ImageIcon, Type, Palette, Save, Eye } from 'lucide-react';
import { storage } from '@/lib/storage';
import { SystemSettings } from '@/lib/types';

export default function AdminLandingPage() {
    const [settings, setSettings] = useState<SystemSettings>(storage.getSystemSettings());
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setSettings(storage.getSystemSettings());
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        storage.saveSystemSettings(settings);
        setTimeout(() => setIsSaving(false), 1000);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Landing Page</h1>
                    <p className="text-gray-500">Personaliza la página de inicio pública.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                    <Eye size={18} /> Ver Página
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Hero Section */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><LayoutTemplate size={20} /></div>
                        <h3 className="text-lg font-bold text-gray-900">Sección Hero</h3>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Título Principal</label>
                        <input
                            type="text"
                            value={settings.landingHeroTitle || ''}
                            onChange={(e) => setSettings({ ...settings, landingHeroTitle: e.target.value })}
                            placeholder="El Único Enlace que Necesitas"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Subtítulo</label>
                        <textarea
                            value={settings.landingHeroSubtitle || ''}
                            onChange={(e) => setSettings({ ...settings, landingHeroSubtitle: e.target.value })}
                            placeholder="Conecta tu audiencia con todo lo que haces..."
                            rows={3}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Texto del Botón</label>
                        <input
                            type="text"
                            value={settings.landingHeroButtonText || ''}
                            onChange={(e) => setSettings({ ...settings, landingHeroButtonText: e.target.value })}
                            placeholder="Empezar Gratis"
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </section>

                {/* Visuals & Colors */}
                <div className="space-y-6">
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><ImageIcon size={20} /></div>
                            <h3 className="text-lg font-bold text-gray-900">Visuales</h3>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">URL Imagen Hero</label>
                            <input
                                type="text"
                                value={settings.landingHeroImage || ''}
                                onChange={(e) => setSettings({ ...settings, landingHeroImage: e.target.value })}
                                placeholder="https://..."
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <p className="text-xs text-gray-400 mt-1">Recomendado: VNsparent PNG o WebP</p>
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-pink-100 text-pink-600 rounded-lg"><Palette size={20} /></div>
                            <h3 className="text-lg font-bold text-gray-900">Colores de Marca</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Primario</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={settings.landingPrimaryColor || '#000000'}
                                        onChange={(e) => setSettings({ ...settings, landingPrimaryColor: e.target.value })}
                                        className="w-10 h-10 rounded-lg border-0 p-0 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={settings.landingPrimaryColor || '#000000'}
                                        onChange={(e) => setSettings({ ...settings, landingPrimaryColor: e.target.value })}
                                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 font-mono text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Secundario</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={settings.landingSecondaryColor || '#00CAEA'}
                                        onChange={(e) => setSettings({ ...settings, landingSecondaryColor: e.target.value })}
                                        className="w-10 h-10 rounded-lg border-0 p-0 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={settings.landingSecondaryColor || '#00CAEA'}
                                        onChange={(e) => setSettings({ ...settings, landingSecondaryColor: e.target.value })}
                                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 font-mono text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Sticky Save Button */}
            <div className="fixed bottom-6 right-8">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                    {isSaving ? 'Guardando...' : <><Save size={20} /> Guardar Cambios</>}
                </button>
            </div>
        </div>
    );
}
