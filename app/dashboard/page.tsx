'use client';

import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import { useEffect } from 'react';

export default function DashboardPage() {
    const router = useRouter();
    const { activeProfile, isLoading } = useProfiles();

    // Redirigir a /dashboard/links como página principal del dashboard
    useEffect(() => {
        if (!isLoading) {
            if (!activeProfile) {
                router.push('/dashboard/new');
            } else {
                router.push('/dashboard/analytics');
            }
        }
    }, [activeProfile, isLoading, router]);

    // Mostrar loading mientras redirige
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Cargando...</p>
            </div>
        </div>
    );
}
