'use client';

import React, { useState, useEffect } from 'react';
import { Globe, CheckCircle, XCircle, Search, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { SystemSettings, DomainRequest } from '@/lib/types';

export default function AdminDomainsPage() {
    const [settings, setSettings] = useState<SystemSettings>(storage.getSystemSettings());
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setSettings(storage.getSystemSettings());
    }, []);

    const handleAction = (id: number, newStatus: 'active' | 'rejected') => {
        if (!settings.domains) return;

        const updatedDomains = settings.domains.map(d =>
            d.id === id ? { ...d, status: newStatus } : d
        );

        const newSettings = { ...settings, domains: updatedDomains };
        storage.saveSystemSettings(newSettings);
        setSettings(newSettings);
    };

    const domains = settings.domains || [];

    const filteredDomains = domains.filter(d =>
        d.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dominios</h1>
                    <p className="text-gray-500">Gestiona las solicitudes de dominios personalizados.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar dominio o usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00CAEA] w-64"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {filteredDomains.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4"
                    >
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className={`p-3 rounded-xl shrink-0 ${item.status === 'active' ? 'bg-green-100 text-green-600' :
                                item.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                    'bg-yellow-100 text-yellow-600'
                                }`}>
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    {item.domain}
                                    <a href={`https://${item.domain}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                                        <ExternalLink size={14} />
                                    </a>
                                </h3>
                                <p className="text-sm text-gray-500">@{item.user} • Solicitado el {item.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                            {item.status === 'pending' ? (
                                <>
                                    <button
                                        onClick={() => handleAction(item.id, 'active')}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
                                    >
                                        <CheckCircle size={16} /> Aprobar
                                    </button>
                                    <button
                                        onClick={() => handleAction(item.id, 'rejected')}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-bold hover:bg-red-100 hover:text-red-600 transition-colors"
                                    >
                                        <XCircle size={16} /> Rechazar
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className={`px-4 py-1 rounded-full text-sm font-bold ${item.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {item.status === 'active' ? 'Activo' : 'Rechazado'}
                                    </span>
                                    {/* Allow changing status back if needed, or just delete? For now, keep as is but maybe add reset? user didn't ask.*/}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {filteredDomains.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        No se encontraron dominios
                    </div>
                )}
            </div>
        </div>
    );
}
