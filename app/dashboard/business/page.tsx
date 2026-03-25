'use client';

import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import BusinessEditor from '@/components/dashboard/BusinessEditor';
import { BusinessInfo } from '@/lib/types';

export default function BusinessPage() {
    const router = useRouter();
    const { activeProfile, updateProfile } = useProfiles();

    const handleLogout = () => {
        router.push('/');
    };

    if (!activeProfile) {
        return null;
    }

    const handleUpdateBusinessInfo = (field: keyof BusinessInfo, value: any) => {
        updateProfile(activeProfile.id, {
            businessInfo: { ...activeProfile.businessInfo, [field]: value }
        });
    };

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={
                <BusinessEditor
                    businessInfo={activeProfile.businessInfo}
                    onUpdate={handleUpdateBusinessInfo}
                />
            }
        />
    );
}
