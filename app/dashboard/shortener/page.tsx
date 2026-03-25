'use client';

import React, { useState } from 'react';
import { useProfiles } from '@/contexts/ProfileContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Copy, ExternalLink, ArrowRight, Trash2 } from 'lucide-react';
import { storage } from '@/lib/storage';
import Dashboard from '@/components/Dashboard';

import { Link } from '@/lib/types';

export default function ShortenerPage() {
    const { activeProfile, loadProfiles } = useProfiles();
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [urlInput, setUrlInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Filter links that have a shortCode
    const shortLinks = activeProfile?.links.filter(l => l.shortCode && l.type === 'shortener') || [];

    const handleCopy = (code: string) => {
        const url = `${window.location.origin}/s/${code}`;
        navigator.clipboard.writeText(url);
        setCopiedId(code);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleShorten = async () => {
        if (!urlInput || !activeProfile) return;
        setIsLoading(true);

        // Generate simple 6-char code
        const code = Math.random().toString(36).substring(2, 8);

        const newLink: Link = {
            id: crypto.randomUUID(),
            title: 'Acortado',
            url: urlInput,
            active: false, // Hidden from profile
            type: 'shortener', // Mark as shortener-only
            shortCode: code,
            clicks: 0,
            icon: 'website'
        };

        const updatedLinks = [...activeProfile.links, newLink];
        storage.updateProfile(activeProfile.id, { links: updatedLinks });
        loadProfiles();

        setUrlInput('');
        setIsLoading(false);
    };

    const handleDelete = (linkId: string) => {
        if (!activeProfile) return;
        const updatedLinks = activeProfile.links.filter(l => l.id !== linkId);
        storage.updateProfile(activeProfile.id, { links: updatedLinks });
        loadProfiles();
    };

    const handleLogout = () => {
        window.location.href = '/';
    };

    if (!activeProfile) return null;

    const content = (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black tracking-tight">Acortador de Enlaces</h1>
                <p className="text-gray-500">Crea enlaces cortos y rastreables para tus campañas.</p>
            </div>

            {/* Input Section */}
            <div className="bg-white p-2 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-2">
                <div className="pl-4 text-gray-400">
                    <LinkIcon size={20} />
                </div>
                <input
                    type="url"
                    placeholder="Pega tu enlace largo aquí (ej. https://...)"
                    className="flex-1 bg-transparent border-none focus:ring-0 text-lg py-3"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleShorten()}
                />
                <button
                    onClick={handleShorten}
                    disabled={!urlInput || isLoading}
                    className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                    {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> : <ArrowRight size={18} />}
                    <span className="hidden sm:inline">Acortar</span>
                </button>
            </div>

            {/* Links List */}
            <div className="space-y-4">
                <h2 className="font-bold text-lg px-2">Historial de Enlaces</h2>
                {shortLinks.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-400">No has creado enlaces cortos aún</p>
                    </div>
                ) : (
                    shortLinks.map(link => (
                        <div key={link.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-black/10 transition-colors">
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-lg tracking-tight text-[#502274]">/{link.shortCode}</span>
                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{link.clicks || 0} clics</span>
                                </div>
                                <p className="text-sm text-gray-400 truncate max-w-md">{link.url}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleCopy(link.shortCode!)}
                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                                    title="Copiar enlace"
                                >
                                    {copiedId === link.shortCode ? <span className="text-green-500 font-bold text-xs">¡Copiado!</span> : <Copy size={18} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(link.id)}
                                    className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                    title="Eliminar"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={content}
        />
    );
}
