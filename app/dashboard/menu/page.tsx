'use client';

import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import MenuEditor from '@/components/dashboard/MenuEditor';
import { MenuConfig } from '@/lib/types';

export default function MenuPage() {
    const router = useRouter();
    const { activeProfile, updateProfile } = useProfiles();

    const handleLogout = () => {
        router.push('/');
    };

    if (!activeProfile) {
        return null;
    }

    // Ensure menu exists (backwards compatibility for profiles created before menu feature)
    const menu: MenuConfig = activeProfile.menu || {
        active: false,
        businessName: '',
        currency: 'DOP',
        showPrices: true,
        showImages: true,
        layout: 'list',
        cardStyle: 'classic',
        note: '',
        categories: [],
        items: [],
    };

    const handleUpdateMenu = (updates: Partial<MenuConfig>) => {
        updateProfile(activeProfile.id, {
            menu: { ...menu, ...updates }
        });
    };

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={
                <MenuEditor
                    menu={menu}
                    onUpdate={handleUpdateMenu}
                />
            }
        />
    );
}
