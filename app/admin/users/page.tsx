'use client';

import React, { useState } from 'react';
import { useProfiles } from '@/contexts/ProfileContext';
import { UserProfile } from '@/lib/types';
import { Search, MoreVertical, Shield, ShieldOff, LogIn, Trash2, Edit, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UserEditModal from '@/components/admin/UserEditModal';

export default function AdminUsersPage() {
    const { profiles, updateProfile, deleteProfile, setActiveProfile } = useProfiles();
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
    const router = useRouter();

    const filteredProfiles = profiles.filter(p =>
        p.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBanToggle = (profile: UserProfile) => {
        if (confirm(`¿Estás seguro de que quieres ${profile.isBanned ? 'desbanear' : 'banear'} a @${profile.username}?`)) {
            updateProfile(profile.id, { isBanned: !profile.isBanned });
        }
    };

    const handleLoginAs = (profile: UserProfile) => {
        if (confirm(`¿Iniciar sesión como @${profile.username}?`)) {
            setActiveProfile(profile);
            router.push('/dashboard');
        }
    }

    const handleDelete = (id: string, username: string) => {
        if (confirm(`PELIGRO: ¿Estás seguro de que quieres ELIMINAR PERMANENTEMENTE a @${username}? Esta acción no se puede deshacer.`)) {
            deleteProfile(id);
        }
    }

    const handlePlanChange = (id: string, newPlan: 'free' | 'pro' | 'business') => {
        updateProfile(id, { subscriptionPlan: newPlan });
    }

    const handleSaveUser = (id: string, updates: Partial<UserProfile>) => {
        updateProfile(id, updates);
        setEditingUser(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Usuarios</h1>
                    <p className="text-gray-500">Gestiona todos los usuarios registrados.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00CAEA] w-64"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Usuario</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Plan</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm">Estado</th>
                            <th className="px-6 py-4 font-bold text-gray-500 text-sm text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {filteredProfiles.map(profile => (
                            <tr key={profile.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                            <img src={profile.avatar} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{profile.name}</div>
                                            <div className="text-sm text-gray-500">@{profile.username}</div>
                                        </div>
                                        {profile.isAdmin && (
                                            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full">ADMIN</span>
                                        )}
                                        {profile.appearance?.verified && (
                                            <span className="text-blue-500" title="Verificado">
                                                <ShieldCheck size={14} fill="currentColor" className="text-white" />
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={profile.subscriptionPlan || 'free'}
                                        onChange={(e) => handlePlanChange(profile.id, e.target.value as any)}
                                        className="bg-transparent font-medium text-sm border-none focus:ring-0 cursor-pointer hover:text-[#00CAEA]"
                                    >
                                        <option value="free">Free</option>
                                        <option value="pro">Pro</option>
                                        <option value="business">Business</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    {profile.isBanned ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                                            Baneado
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs font-bold">
                                            Activo
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setEditingUser(profile)}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-blue-600"
                                            title="Editar usuario"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleLoginAs(profile)}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-black"
                                            title="Iniciar sesión como este usuario"
                                        >
                                            <LogIn size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleBanToggle(profile)}
                                            className={`p-2 hover:bg-gray-100 rounded-lg ${profile.isBanned ? 'text-green-600' : 'text-orange-500'}`}
                                            title={profile.isBanned ? "Desbanear" : "Banear"}
                                        >
                                            {profile.isBanned ? <Shield size={18} /> : <ShieldOff size={18} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(profile.id, profile.username)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"
                                            title="Eliminar usuario"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingUser && (
                <UserEditModal
                    isOpen={!!editingUser}
                    onClose={() => setEditingUser(null)}
                    user={editingUser}
                    onSave={handleSaveUser}
                />
            )}
        </div>
    );
}
