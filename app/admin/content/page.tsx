'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Megaphone, ShieldAlert, ToggleLeft, ToggleRight, Save, Plus, X, Video, Music, Map, Play, Youtube, Mail, Link as LinkIcon, Sparkles, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { SystemSettings, AppModule } from '@/lib/types';

const moduleIcons: Record<string, any> = {
    tiktok: Video,
    youtube: Youtube,
    spotify: Music,
    maps: Map,
    newsletter: Mail,
    shortener: LinkIcon,
    ai_assistant: Sparkles,
    qr_art: QrCode,
    default: Layers
};

export default function AdminContentPage() {
    const [activeTab, setActiveTab] = useState<'modules' | 'ads' | 'moderation'>('modules');
    const [settings, setSettings] = useState<SystemSettings>(storage.getSystemSettings());
    const [isSaving, setIsSaving] = useState(false);

    // Local state for inputs
    const [newWord, setNewWord] = useState('');
    const [adCode, setAdCode] = useState('');

    useEffect(() => {
        const current = storage.getSystemSettings();
        setSettings(current);
        setAdCode(current.adBannerCode || '');
    }, []);

    const saveSettings = (newSettings: SystemSettings) => {
        setIsSaving(true);
        storage.saveSystemSettings(newSettings);
        setSettings(newSettings);
        setTimeout(() => setIsSaving(false), 500);
    };

    // --- Module Handlers ---
    const toggleModule = (id: string) => {
        if (!settings.modules) return;
        const updatedModules = settings.modules.map(m =>
            m.id === id ? { ...m, active: !m.active } : m
        );
        saveSettings({ ...settings, modules: updatedModules });
    };

    // --- Ads Handlers ---
    const handleSaveAds = () => {
        saveSettings({ ...settings, adBannerCode: adCode, enableAds: !!adCode });
    };

    // --- Moderation Handlers ---
    const addWord = () => {
        const currentWords = settings.blockedWords || [];
        if (newWord && !currentWords.includes(newWord)) {
            const updatedWords = [...currentWords, newWord];
            saveSettings({ ...settings, blockedWords: updatedWords });
            setNewWord('');
        }
    };

    const removeWord = (word: string) => {
        const currentWords = settings.blockedWords || [];
        const updatedWords = currentWords.filter(w => w !== word);
        saveSettings({ ...settings, blockedWords: updatedWords });
    };

    const modules = settings.modules || [];
    const badWords = settings.blockedWords || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Contenido y Seguridad</h1>
                    <p className="text-gray-500">Controla módulos, publicidad y moderación.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
                <button
                    onClick={() => setActiveTab('modules')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'modules' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <div className="flex items-center gap-2"><Layers size={16} /> Módulos</div>
                </button>
                <button
                    onClick={() => setActiveTab('ads')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'ads' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <div className="flex items-center gap-2"><Megaphone size={16} /> Publicidad</div>
                </button>
                <button
                    onClick={() => setActiveTab('moderation')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'moderation' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <div className="flex items-center gap-2"><ShieldAlert size={16} /> Moderación</div>
                </button>
            </div>

            <div className="grid gap-6">

                {activeTab === 'modules' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {modules.map((module) => {
                            const IconComponent = moduleIcons[module.id] || moduleIcons.default;
                            return (
                                <motion.div
                                    key={module.id}
                                    layout
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
                                            <IconComponent size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{module.name}</h3>
                                            <p className="text-xs text-gray-500">{module.active ? 'Activo en perfiles' : 'Deshabilitado globalmente'}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleModule(module.id)}
                                        className={`text-2xl transition-colors ${module.active ? 'text-green-500' : 'text-gray-300'}`}
                                    >
                                        {module.active ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {activeTab === 'ads' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Código de Publicidad Global</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Este código HTML/JS se insertará automáticamente en los perfiles de los usuarios del plan
                            <span className="font-bold text-gray-800"> FREE</span>.
                        </p>
                        <textarea
                            value={adCode}
                            onChange={(e) => setAdCode(e.target.value)}
                            className="w-full h-48 p-4 rounded-xl border border-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            placeholder="<!-- Pegar código de AdSense o Banner aquí -->"
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleSaveAds}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                            >
                                <Save size={18} /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'moderation' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Filtro de Seguridad (Bad Words)</h3>
                        <div className="flex gap-2 mb-6">
                            <input
                                type="text"
                                value={newWord}
                                onChange={(e) => setNewWord(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addWord()}
                                placeholder="Añadir palabra prohibida..."
                                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button
                                onClick={addWord}
                                className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200"
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {badWords.length > 0 ? badWords.map((word) => (
                                <span key={word} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2 group hover:bg-red-50 hover:text-red-600 transition-colors">
                                    {word}
                                    <button onClick={() => removeWord(word)} className="opacity-0 group-hover:opacity-100">
                                        <X size={14} />
                                    </button>
                                </span>
                            )) : (
                                <p className="text-gray-400 text-sm">No hay palabras bloqueadas.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
