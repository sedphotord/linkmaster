'use client';

import { useProfiles } from '@/contexts/ProfileContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { activeProfile, isLoading } = useProfiles();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            if (!activeProfile) {
                router.push('/login');
            } else if (!activeProfile.isAdmin) {
                router.push('/dashboard');
            } else {
                setIsAuthorized(true);
            }
        }
    }, [activeProfile, isLoading, router]);

    if (isLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
        );
    }

    return <>{children}</>;
}
