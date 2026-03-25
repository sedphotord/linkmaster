'use client';

import React, { useState, useEffect } from 'react';
import { Palette, Image as ImageIcon, Type, Plus, Trash2, Edit, Save, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { SystemSettings, DesignTemplate, DesignAsset } from '@/lib/types';

export default function AdminDesignPage() {
    const [activeTab, setActiveTab] = useState<'templates' | 'assets' | 'fonts'>('templates');
    const [settings, setSettings] = useState<SystemSettings>(storage.getSystemSettings());
    const [newFontUrl, setNewFontUrl] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setSettings(storage.getSystemSettings());
    }, []);

    const saveSettings = (newSettings: SystemSettings) => {
        setIsSaving(true);
        storage.saveSystemSettings(newSettings);
        setSettings(newSettings);
        setTimeout(() => setIsSaving(false), 500);
    };

    // --- Font Handlers ---
    const handleSaveFonts = () => {
        if (newFontUrl && newFontUrl.includes('fonts.googleapis.com')) {
            const currentFonts = settings.customFonts || [];
            if (!currentFonts.includes(newFontUrl)) {
                saveSettings({ ...settings, customFonts: [...currentFonts, newFontUrl] });
            }
            setNewFontUrl('');
        }
    };

    const removeFont = (urlToRemove: string) => {
        const currentFonts = settings.customFonts || [];
        saveSettings({ ...settings, customFonts: currentFonts.filter(url => url !== urlToRemove) });
    };

    // --- Template Handlers ---
    const deleteTemplate = (id: number) => {
        if (!confirm('¿Eliminar tema?')) return;
        const currentTemplates = settings.designTemplates || [];
        saveSettings({ ...settings, designTemplates: currentTemplates.filter(t => t.id !== id) });
    };

    const addTemplate = () => {
        const name = prompt('Nombre del nuevo tema:');
        if (!name) return;
        const newTemplate: DesignTemplate = {
            id: Date.now(),
            name,
            users: 0,
            preview: 'bg-gray-100 border-gray-300' // Default placeholder
        };
        const currentTemplates = settings.designTemplates || [];
        saveSettings({ ...settings, designTemplates: [...currentTemplates, newTemplate] });
    };

    // --- Asset Handlers ---
    const deleteAsset = (id: number) => {
        if (!confirm('¿Eliminar recurso?')) return;
        const currentAssets = settings.designAssets || [];
        saveSettings({ ...settings, designAssets: currentAssets.filter(a => a.id !== id) });
    };

    const addAsset = () => {
        const name = prompt('Nombre del recurso:');
        if (!name) return;
        const type = prompt('Tipo (background/icon/font):', 'background') as 'background' | 'icon' | 'font';
        const newAsset: DesignAsset = {
            id: Date.now(),
            name,
            type: type || 'background',
            downloads: 0
        };
        const currentAssets = settings.designAssets || [];
        saveSettings({ ...settings, designAssets: [...currentAssets, newAsset] });
    };

    const templates = settings.designTemplates || [];
    const assets = settings.designAssets || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Constructor Visual</h1>
                    <p className="text-gray-500">Gestiona temas, recursos y tipografías globales.</p>
                </div>
                {activeTab !== 'fonts' && (
                    <button
                        onClick={activeTab === 'templates' ? addTemplate : addAsset}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                    >
                        <Plus size={18} />
                        {activeTab === 'templates' ? 'Nuevo Tema' : 'Nuevo Asset'}
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit">
                <button
                    onClick={() => setActiveTab('templates')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'templates' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <div className="flex items-center gap-2"><Palette size={16} /> Temas</div>
                </button>
                <button
                    onClick={() => setActiveTab('assets')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'assets' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <div className="flex items-center gap-2"><ImageIcon size={16} /> Assets</div>
                </button>
                <button
                    onClick={() => setActiveTab('fonts')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'fonts' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <div className="flex items-center gap-2"><Type size={16} /> Fuentes</div>
                </button>
            </div>

            {/* Content Area */}
            <div className="grid gap-6">

                {activeTab === 'templates' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group relative">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => deleteTemplate(item.id)} className="p-2 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50"><Trash2 size={16} /></button>
                                </div>
                                <div className={`h-32 rounded-xl mb-4 ${item.preview} border-2 flex items-center justify-center`}>
                                    <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded">Preview</span>
                                </div>
                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                <p className="text-xs text-gray-500">{item.users} usuarios</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'assets' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assets.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => deleteAsset(item.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={16} /></button>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-xl"><ImageIcon size={24} className="text-gray-400" /></div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-xs text-gray-500">{item.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'fonts' && (
                    <div className="space-y-6">
                        {/* Add Font Section */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Añadir Google Font</h3>
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Google Fonts URL</label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            value={newFontUrl}
                                            onChange={(e) => setNewFontUrl(e.target.value)}
                                            placeholder="https://fonts.googleapis.com/css2?family=Roboto..."
                                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={handleSaveFonts}
                                    disabled={!newFontUrl}
                                    className="px-6 py-2 bg-black text-white rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 transition-all flex items-center gap-2"
                                >
                                    <Plus size={18} /> Añadir
                                </button>
                            </div>
                        </div>

                        {/* Fonts List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {settings.customFonts?.map((url, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center"
                                >
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-gray-900 truncate w-full text-sm">{url.split('family=')[1]?.split('&')[0] || 'Custom Font'}</p>
                                        <p className="text-xs text-gray-500 truncate w-48">{url}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFont(url)}
                                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </motion.div>
                            ))}
                            {(!settings.customFonts || settings.customFonts.length === 0) && (
                                <p className="text-gray-400 text-sm col-span-2 text-center py-8">No hay fuentes personalizadas instaladas.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
