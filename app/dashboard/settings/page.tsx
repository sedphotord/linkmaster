'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfiles } from '@/contexts/ProfileContext';
import Dashboard from '@/components/Dashboard';
import { User, Lock, Mail, Shield, Check, Camera } from 'lucide-react';

export default function SettingsPage() {
    const { activeProfile, updateProfile } = useProfiles();
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Local state for form fields
    const [name, setName] = useState(activeProfile?.name || '');
    const [email, setEmail] = useState('sofia@example.com'); // Mock email
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [twoFactor, setTwoFactor] = useState(false);

    if (!activeProfile) return null;

    const handleUpdateProfile = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            updateProfile(activeProfile.id, { name });
            setLoading(false);
            showSuccess('Perfil actualizado correctamente');
        }, 1000);
    };

    const handleUpdateSecurity = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setCurrentPassword('');
            setNewPassword('');
            showSuccess('Configuración de seguridad actualizada');
        }, 1000);
    }

    const showSuccess = (msg: string) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(''), 3000);
    };

    const handleLogout = () => {
        // Implement logout logic here or import from context if available
        // For now just redirect
        window.location.href = '/';
    };

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={
                <div className="max-w-4xl mx-auto space-y-8 pb-32">
                    <div className="space-y-1">
                        <h2 className="text-4xl font-black tracking-tighter text-gray-900 leading-none">Configuración</h2>
                        <p className="text-gray-500 font-medium text-lg">Administra tu cuenta y seguridad</p>
                    </div>

                    {successMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-green-50 text-green-700 p-4 rounded-xl font-bold flex items-center gap-2 border border-green-100"
                        >
                            <Check size={20} /> {successMsg}
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Helper Column / Sidenav (Optional, or just layout) */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center">
                                <div className="relative inline-block">
                                    <img
                                        src={activeProfile.avatar}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mx-auto"
                                    />
                                    <button className="absolute bottom-0 right-0 bg-[#1e2330] text-white p-2 rounded-full hover:scale-110 transition-transform">
                                        <Camera size={14} />
                                    </button>
                                </div>
                                <h3 className="font-bold text-lg mt-4 text-gray-900">{activeProfile.name}</h3>
                                <p className="text-gray-500 text-sm">@{activeProfile.username}</p>
                            </div>
                        </div>

                        {/* Forms */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Profile Section */}
                            <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                                <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <User size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Información del Perfil</h3>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 rounded-xl px-4 py-3 font-medium transition-all outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de Usuario</label>
                                        <input
                                            type="text"
                                            value={activeProfile.username}
                                            disabled
                                            className="w-full bg-gray-100 text-gray-400 border-transparent rounded-xl px-4 py-3 font-medium cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-400 mt-2 ml-1">El nombre de usuario no se puede cambiar.</p>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={handleUpdateProfile}
                                            disabled={loading}
                                            className="bg-[#1e2330] text-white px-6 py-3 rounded-full font-bold hover:scale-[1.02] active:scale-95 transition-all text-sm"
                                        >
                                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Security Section */}
                            <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                                <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <Shield size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Seguridad</h3>
                                </div>

                                <div className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 rounded-xl pl-10 pr-4 py-3 font-medium transition-all outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-50 my-2"></div>

                                    {/* Password */}
                                    <div className="space-y-4">
                                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                            <Lock size={16} className="text-gray-400" />
                                            Cambiar Contraseña
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="password"
                                                placeholder="Contraseña actual"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 rounded-xl px-4 py-3 font-medium transition-all outline-none"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Nueva contraseña"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 rounded-xl px-4 py-3 font-medium transition-all outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-50 my-2"></div>

                                    {/* 2FA */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Verificación en 2 pasos</h4>
                                            <p className="text-sm text-gray-500">Aumenta la seguridad de tu cuenta.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} className="sr-only peer" />
                                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#2563EB]"></div>
                                        </label>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            onClick={handleUpdateSecurity}
                                            className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-all text-sm"
                                        >
                                            Actualizar Seguridad
                                        </button>
                                    </div>
                                </div>
                            </section>

                            {/* Developer Tools */}
                            <section className="bg-gray-900 text-white p-8 rounded-[2rem] border border-gray-800 shadow-xl space-y-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00CAEA] opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                                        <div className="p-2 bg-gray-800 text-[#00CAEA] rounded-lg">
                                            <Shield size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white">Zona de Desarrollador</h3>
                                            <p className="text-gray-400 text-sm">Herramientas avanzadas de administración</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 flex items-center justify-between">
                                        <div>
                                            <div className="font-bold text-white mb-1">Modo Super Admin</div>
                                            <div className="text-xs text-gray-400">Habilita acceso al dashboard de administración global.</div>
                                        </div>
                                        <button
                                            onClick={() => updateProfile(activeProfile.id, { isAdmin: !activeProfile.isAdmin })}
                                            className={`px-4 py-2 rounded-xl font-bold transition-all ${activeProfile.isAdmin
                                                ? 'bg-[#00CAEA] text-white shadow-lg shadow-cyan-900/50'
                                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                                }`}
                                        >
                                            {activeProfile.isAdmin ? 'Activado' : 'Activar'}
                                        </button>
                                    </div>
                                    {activeProfile.isAdmin && (
                                        <div className="pt-2">
                                            <a href="/admin" className="block w-full text-center py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors cursor-pointer">
                                                Ir al Dashboard Admin
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            }
        />
    );
}
