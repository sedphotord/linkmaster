'use client';

import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import LinkEditor from '@/components/dashboard/LinkEditor';

export default function LinksPage() {
    const router = useRouter();
    const { activeProfile, updateProfile } = useProfiles();

    const handleLogout = () => {
        router.push('/');
    };

    if (!activeProfile) {
        return null;
    }

    const handleAddLink = (initialData?: { icon?: string, title?: string, url?: string }) => {
        const newLink = {
            id: Date.now().toString(),
            title: initialData?.title || 'Nuevo Enlace',
            url: initialData?.url || 'https://',
            active: true,
            icon: (initialData?.icon || 'website') as any
        };
        updateProfile(activeProfile.id, {
            links: [newLink, ...activeProfile.links]
        });
    };

    const handleUpdateLink = (linkId: string, updates: any) => {
        const updatedLinks = activeProfile.links.map(link =>
            link.id === linkId ? { ...link, ...updates } : link
        );
        updateProfile(activeProfile.id, { links: updatedLinks });
    };

    const handleDeleteLink = (linkId: string) => {
        updateProfile(activeProfile.id, {
            links: activeProfile.links.filter(l => l.id !== linkId)
        });
    };

    const handleReorder = (newLinks: any[]) => {
        updateProfile(activeProfile.id, { links: newLinks });
    };

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={
                <LinkEditor
                    links={activeProfile.links}
                    onAdd={handleAddLink}
                    onUpdate={handleUpdateLink}
                    onDelete={handleDeleteLink}
                    onReorder={handleReorder}
                />
            }
        />
    );
}
