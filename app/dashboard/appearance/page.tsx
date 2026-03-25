'use client';

import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import AppearanceEditor from '@/components/dashboard/AppearanceEditor';
import { useState } from 'react';

export default function AppearancePage() {
    const router = useRouter();
    const { activeProfile, updateProfile } = useProfiles();
    const [isGeneratingBio, setIsGeneratingBio] = useState(false);

    const handleLogout = () => {
        router.push('/');
    };

    if (!activeProfile) {
        return null;
    }

    const handleUpdateField = (field: any, value: any) => {
        updateProfile(activeProfile.id, { [field]: value });
    };

    const handleUpdateAppearance = (field: any, value: any) => {
        if (typeof field === 'object') {
            updateProfile(activeProfile.id, {
                appearance: { ...activeProfile.appearance, ...field }
            });
        } else {
            updateProfile(activeProfile.id, {
                appearance: { ...activeProfile.appearance, [field]: value }
            });
        }
    };

    const handleGenerateBio = async () => {
        setIsGeneratingBio(true);
        try {
            const response = await fetch('/api/gemini/bio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: activeProfile.name || activeProfile.username,
                    keywords: activeProfile.bio || 'Creativo, Profesional'
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.bio) {
                    handleUpdateField('bio', data.bio);
                }
            }
        } catch (error) {
            console.error('Error generating bio:', error);
        } finally {
            setIsGeneratingBio(false);
        }
    };

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={
                <AppearanceEditor
                    profile={activeProfile}
                    onUpdateField={handleUpdateField}
                    onUpdateAppearance={handleUpdateAppearance}
                    onGenerateBio={handleGenerateBio}
                    isGeneratingBio={isGeneratingBio}
                    onLogout={handleLogout}
                />
            }
        />
    );
}
