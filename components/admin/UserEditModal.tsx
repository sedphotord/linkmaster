'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { X, Save, Shield, ShieldOff, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UserProfile;
    onSave: (id: string, updates: Partial<UserProfile>) => void;
}

export default function UserEditModal({ isOpen, onClose, user, onSave }: UserEditModalProps) {
    const [formData, setFormData] = useState<Partial<UserProfile>>({});

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                username: user.username,
                email: user.email || '',
                bio: user.bio,
                subscriptionPlan: user.subscriptionPlan || 'free',
                isBanned: user.isBanned || false,
                isAdmin: user.isAdmin || false,
                appearance: { ...user.appearance, verified: user.appearance.verified || false }
            });
        }
    }, [user]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAppearanceChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            appearance: { ...prev.appearance, [field]: value }
        } as any));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(user.id, formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                <h3 className="text-xl font-bold text-gray-900">Editar Usuario</h3>
                                <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1">
                                <form id="edit-user-form" onSubmit={handleSubmit} className="space-y-4">
                                    {/* Avatar Preview */}
                                    <div className="flex justify-center mb-6">
                                        <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden ring-4 ring-white shadow-lg">
                                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Nombre</label>
                                            <input
                                                type="text"
                                                value={formData.name || ''}
                                                onChange={(e) => handleChange('name', e.target.value)}
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00CAEA]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Usuario</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                                                <input
                                                    type="text"
                                                    value={formData.username || ''}
                                                    onChange={(e) => handleChange('username', e.target.value)}
                                                    className="w-full pl-7 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00CAEA]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email || ''}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00CAEA]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Bio</label>
                                        <textarea
                                            value={formData.bio || ''}
                                            onChange={(e) => handleChange('bio', e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00CAEA] resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Plan de Suscripción</label>
                                        <select
                                            value={formData.subscriptionPlan || 'free'}
                                            onChange={(e) => handleChange('subscriptionPlan', e.target.value)}
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00CAEA]"
                                        >
                                            <option value="free">Free</option>
                                            <option value="pro">Pro</option>
                                            <option value="business">Business</option>
                                        </select>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={formData.appearance?.verified || false}
                                                onChange={(e) => handleAppearanceChange('verified', e.target.checked)}
                                                className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-gray-900 flex items-center gap-1">Verificado <ShieldCheck size={14} className="text-blue-500" /></span>
                                                <span className="text-xs text-gray-500">Muestra badge azul</span>
                                            </div>
                                        </label>

                                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={formData.isAdmin || false}
                                                onChange={(e) => handleChange('isAdmin', e.target.checked)}
                                                className="w-5 h-5 text-black rounded focus:ring-black"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-gray-900 flex items-center gap-1">Admin <Shield size={14} /></span>
                                                <span className="text-xs text-gray-500">Acceso total</span>
                                            </div>
                                        </label>
                                    </div>
                                </form>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 rounded-xl text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    form="edit-user-form"
                                    type="submit"
                                    className="px-6 py-2 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-colors flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
