'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { UserProfile } from '@/lib/types';
import { getProfileByUsername } from '@/lib/storage';
import { demoProfile } from '@/lib/data';
import PublicProfile from '@/components/PublicProfile';
import { useAnalytics } from '@/lib/analytics';

export default function UserProfilePage() {
    const params = useParams();
    const username = params?.username as string;
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { trackView } = useAnalytics();

    useEffect(() => {
        if (username) {
            const storedProfile = getProfileByUsername(username);
            if (storedProfile) {
                setProfile(storedProfile);
                trackView(storedProfile.id);
            } else if (username === 'techsolutions-rd') {
                setProfile(demoProfile);
                trackView(demoProfile.id);
            }
            setLoading(false);
        }
    }, [username]);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md px-4">
                    <h1 className="text-6xl font-black mb-4">404</h1>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Perfil no encontrado</h2>
                    <p className="text-gray-600 mb-6">
                        El perfil <code className="bg-gray-200 px-2 py-1 rounded">/{username}</code> no existe.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    >
                        Ir al inicio
                    </a>
                </div>
            </div>
        );
    }

    // Check visibility (allow access if it's the demo profile or isVisible is true/undefined)
    if (profile.isVisible === false) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md px-4">
                    <h1 className="text-4xl font-black mb-4 text-gray-400">Privado</h1>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Este perfil no está disponible</h2>
                    <p className="text-gray-600 mb-6">
                        El usuario ha configurado este perfil como privado temporalmente.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-[#1e2330] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    return <PublicProfile profile={profile} />;
}
