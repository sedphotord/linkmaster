'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/lib/types';
import { storage } from '@/lib/storage';
import { createNewProfile } from '@/lib/data';

interface ProfileContextType {
    profiles: UserProfile[];
    activeProfile: UserProfile | null;
    setActiveProfile: (profile: UserProfile) => void;
    createProfile: (username: string, name: string, bio?: string) => Promise<{ success: boolean; profile?: UserProfile; error?: string }>;
    updateProfile: (id: string, updates: Partial<UserProfile>) => { success: boolean; error?: string };
    deleteProfile: (id: string) => { success: boolean; error?: string };
    loadProfiles: () => void;
    isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [activeProfile, setActiveProfileState] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar perfiles al montar
    useEffect(() => {
        loadProfiles();
    }, []);

    const loadProfiles = () => {
        setIsLoading(true);
        const loadedProfiles = storage.getProfiles();
        setProfiles(loadedProfiles);

        // Cargar perfil activo
        const activeId = storage.getActiveProfileId();
        if (activeId) {
            const active = loadedProfiles.find(p => p.id === activeId);
            setActiveProfileState(active || null);
        } else if (loadedProfiles.length > 0) {
            // Si hay perfiles pero no hay activo, activar el primero
            setActiveProfileState(loadedProfiles[0]);
            storage.setActiveProfileId(loadedProfiles[0].id);
        }

        setIsLoading(false);
    };

    const setActiveProfile = (profile: UserProfile) => {
        setActiveProfileState(profile);
        storage.setActiveProfileId(profile.id);
    };

    const createProfileFn = async (
        username: string,
        name: string,
        bio?: string
    ): Promise<{ success: boolean; profile?: UserProfile; error?: string }> => {
        const result = storage.createProfile({ username, name, bio });

        if (result.success && result.profile) {
            loadProfiles();
            setActiveProfile(result.profile);
        }

        return result;
    };

    const updateProfileFn = (id: string, updates: Partial<UserProfile>) => {
        const result = storage.updateProfile(id, updates);

        if (result.success) {
            loadProfiles();

            // Si se actualizó el perfil activo, actualizar estado
            if (activeProfile && activeProfile.id === id) {
                const updated = storage.getProfileById(id);
                if (updated) {
                    setActiveProfileState(updated);
                }
            }
        }

        return result;
    };

    const deleteProfileFn = (id: string) => {
        const result = storage.deleteProfile(id);

        if (result.success) {
            loadProfiles();

            // Si se eliminó el perfil activo, limpiar
            if (activeProfile && activeProfile.id === id) {
                setActiveProfileState(null);
            }
        }

        return result;
    };

    return (
        <ProfileContext.Provider
            value={{
                profiles,
                activeProfile,
                setActiveProfile,
                createProfile: createProfileFn,
                updateProfile: updateProfileFn,
                deleteProfile: deleteProfileFn,
                loadProfiles,
                isLoading,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfiles() {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfiles must be used within a ProfileProvider');
    }
    return context;
}
