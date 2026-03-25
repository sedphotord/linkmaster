'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import { ChevronDown, Check, Plus, Users } from 'lucide-react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function ProfileSelector() {
    const router = useRouter();
    const { profiles, activeProfile, setActiveProfile } = useProfiles();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSelectProfile = (profile: typeof activeProfile) => {
        if (profile) {
            setActiveProfile(profile);
            // Optional: keep expanded or close it
            // setIsExpanded(false); 
        }
    };

    if (!activeProfile) {
        return (
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 text-center">
                <p className="text-xs font-bold text-yellow-800 mb-2">Sin perfil activo</p>
                <button
                    onClick={() => router.push('/dashboard/new')}
                    className="w-full bg-yellow-400 text-yellow-900 text-xs px-3 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                >
                    Crear Perfil
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 rounded-2xl p-2 transition-all duration-200">
            {/* Main Toggle Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full bg-white border border-gray-100 rounded-xl p-3 flex items-center justify-between hover:shadow-sm hover:border-gray-200 transition-all shadow-sm"
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <img
                        src={activeProfile.avatar}
                        alt={activeProfile.name}
                        className="w-9 h-9 rounded-full object-cover border border-gray-100 shrink-0"
                    />
                    <div className="text-left truncate min-w-0">
                        <div className="font-bold text-gray-900 text-sm truncate">{activeProfile.name}</div>
                        <div className="text-xs text-gray-500 truncate">@{activeProfile.username}</div>
                    </div>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-gray-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Inline Expanded Area */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-1 pl-1 pr-1">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider py-2 pl-2">Mis Perfiles</div>
                    {profiles.map((profile) => (
                        <button
                            key={profile.id}
                            onClick={() => handleSelectProfile(profile)}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors group ${activeProfile.id === profile.id
                                ? 'bg-white shadow-sm border border-gray-100'
                                : 'hover:bg-gray-200/50'
                                }`}
                        >
                            <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-7 h-7 rounded-full object-cover opacity-80 group-hover:opacity-100"
                            />
                            <div className="flex-1 text-left truncate">
                                <span className={`text-sm font-medium truncate ${activeProfile.id === profile.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'}`}>
                                    @{profile.username}
                                </span>
                            </div>
                            {activeProfile.id === profile.id && (
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            )}
                        </button>
                    ))}

                    <div className="pt-2 mt-2 border-t border-gray-200/50 space-y-1">
                        <button
                            onClick={() => router.push('/dashboard/settings')}
                            className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-bold text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all"
                        >
                            <Cog6ToothIcon className="w-4 h-4" strokeWidth={2} />
                            Configuración
                        </button>
                        <button
                            onClick={() => router.push('/dashboard/new')}
                            className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-bold text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all"
                        >
                            <Plus size={14} strokeWidth={3} />
                            Nuevo Perfil
                        </button>
                        <button
                            onClick={() => router.push('/dashboard/profiles')}
                            className="w-full flex items-center gap-2 p-2 rounded-lg text-xs font-bold text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all"
                        >
                            <Users size={14} strokeWidth={3} />
                            Gestionar Todos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
