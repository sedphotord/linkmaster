'use client';

import React, { useState, useEffect } from 'react';
import { useProfiles } from '@/contexts/ProfileContext';
import { Save, AlertTriangle, ShieldCheck, MessageSquare, Bell, Globe, Code, Key, CreditCard } from 'lucide-react';
import { storage } from '@/lib/storage';
import { SystemSettings } from '@/lib/types';
import { motion } from 'framer-motion';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SystemSettings>({
        maintenanceMode: false,
        allowRegistrations: true,
        globalAnnouncement: '',
        welcomeMessage: '¡Bienvenido a LinkMaster!'
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const current = storage.getSystemSettings();
        setSettings(current);
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        try {
            storage.saveSystemSettings(settings);
            setMessage({ type: 'success', text: 'Configuración guardada correctamente.' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Error al guardar la configuración.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Configuración del Sistema</h1>
                <p className="text-gray-500">Ajustes globales de la plataforma.</p>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}
                >
                    {message.type === 'success' ? <ShieldCheck size={20} /> : <AlertTriangle size={20} />}
                    <span className="font-medium">{message.text}</span>
                </motion.div>
            )}

            <div className="grid gap-6">
                {/* Maintenance Mode */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                <AlertTriangle size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Modo Mantenimiento</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.maintenanceMode}
                                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                        </label>
                    </div>
                    <p className="text-sm text-gray-500">
                        Si se activa, solo los administradores podrán acceder a la plataforma. Los usuarios verán una pantalla de mantenimiento.
                    </p>
                </section>

                {/* Registration Control */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Registro de Usuarios</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.allowRegistrations}
                                onChange={(e) => setSettings({ ...settings, allowRegistrations: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                    </div>
                    <p className="text-sm text-gray-500">
                        Permitir que nuevos usuarios se registren en la plataforma. Desactivar para cerrar el acceso a nuevos miembros.
                    </p>
                </section>

                {/* Global Announcement */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <Bell size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Anuncio Global</h3>
                    </div>
                    <div className="space-y-3">
                        <textarea
                            value={settings.globalAnnouncement || ''}
                            onChange={(e) => setSettings({ ...settings, globalAnnouncement: e.target.value })}
                            placeholder="Escribe un mensaje para mostrar a todos los usuarios..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-none"
                        />
                        <p className="text-xs text-gray-400">
                            Este mensaje aparecerá en la parte superior del dashboard de todos los usuarios.
                        </p>
                    </div>
                </section>

                {/* Welcome Message */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                            <MessageSquare size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Mensaje de Bienvenida</h3>
                    </div>
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={settings.welcomeMessage}
                            onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                            placeholder="¡Bienvenido a LinkMaster!"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </section>

                {/* SEO Global */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                            <Globe size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">SEO Global</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Título del Sitio</label>
                            <input
                                type="text"
                                value={settings.seoTitle || ''}
                                onChange={(e) => setSettings({ ...settings, seoTitle: e.target.value })}
                                placeholder="LinkMaster - Tu Bio Link"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Descripción Meta</label>
                            <textarea
                                value={settings.seoDescription || ''}
                                onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
                                placeholder="La mejor plataforma para tus enlaces..."
                                rows={2}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            />
                        </div>
                    </div>
                </section>

                {/* External Scripts */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                            <Code size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Gestor de Scripts</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Google Analytics ID</label>
                            <input
                                type="text"
                                value={settings.googleAnalyticsId || ''}
                                onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                                placeholder="G-XXXXXXXXXX"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Facebook Pixel ID</label>
                            <input
                                type="text"
                                value={settings.facebookPixelId || ''}
                                onChange={(e) => setSettings({ ...settings, facebookPixelId: e.target.value })}
                                placeholder="1234567890"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono text-sm"
                            />
                        </div>
                    </div>
                </section>

                {/* Payment Gateways */}
                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
                            <CreditCard size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Pasarelas de Pago</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Stripe Public Key</label>
                            <div className="relative">
                                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={settings.stripePublicKey || ''}
                                    onChange={(e) => setSettings({ ...settings, stripePublicKey: e.target.value })}
                                    placeholder="pk_live_..."
                                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">PayPal Client ID</label>
                            <div className="relative">
                                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={settings.paypalClientId || ''}
                                    onChange={(e) => setSettings({ ...settings, paypalClientId: e.target.value })}
                                    placeholder="AbC..."
                                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Save Button */}
                <div className="flex justify-end pt-4 pb-10">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors disabled:opacity-50 shadow-lg shadow-gray-200"
                    >
                        {isSaving ? (
                            <>Guardando...</>
                        ) : (
                            <>
                                <Save size={20} />
                                Guardar Toda la Configuración
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
