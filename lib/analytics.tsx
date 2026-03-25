'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Tipos de datos para Analytics
export interface DailyStats {
    date: string; // YYYY-MM-DD
    views: number;
    clicks: Record<string, number>; // linkId -> count
}

export interface AnalyticsData {
    [profileId: string]: DailyStats[];
}

interface AnalyticsContextType {
    trackView: (profileId: string) => void;
    trackClick: (profileId: string, linkId: string) => void;
    getStats: (profileId: string) => DailyStats[];
    getTotalViews: (profileId: string) => number;
    getTotalClicks: (profileId: string) => number;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const STORAGE_KEY = 'linkmaster_analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<AnalyticsData>({});

    // Cargar datos al inicio
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setData(JSON.parse(stored));
            } catch (e) {
                console.error("Error loading analytics", e);
            }
        }
    }, []);

    // Guardar datos cuando cambian
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, [data]);

    const getToday = () => new Date().toISOString().split('T')[0];

    const trackView = (profileId: string) => {
        setData(prev => {
            const profileStats = prev[profileId] || [];
            const today = getToday();
            const todayIndex = profileStats.findIndex(s => s.date === today);

            if (todayIndex >= 0) {
                // Actualizar hoy
                const updated = [...profileStats];
                updated[todayIndex] = {
                    ...updated[todayIndex],
                    views: updated[todayIndex].views + 1
                };
                return { ...prev, [profileId]: updated };
            } else {
                // Nuevo día
                return {
                    ...prev,
                    [profileId]: [...profileStats, { date: today, views: 1, clicks: {} }]
                };
            }
        });
    };

    const trackClick = (profileId: string, linkId: string) => {
        setData(prev => {
            const profileStats = prev[profileId] || [];
            const today = getToday();
            const todayIndex = profileStats.findIndex(s => s.date === today);

            if (todayIndex >= 0) {
                const updated = [...profileStats];
                const currentClicks = updated[todayIndex].clicks[linkId] || 0;
                updated[todayIndex] = {
                    ...updated[todayIndex],
                    clicks: { ...updated[todayIndex].clicks, [linkId]: currentClicks + 1 }
                };
                return { ...prev, [profileId]: updated };
            } else {
                return {
                    ...prev,
                    [profileId]: [...profileStats, { date: today, views: 1, clicks: { [linkId]: 1 } }]
                };
            }
        });
    };

    const getStats = (profileId: string) => {
        return data[profileId] || [];
    };

    const getTotalViews = (profileId: string) => {
        const stats = data[profileId] || [];
        return stats.reduce((acc, curr) => acc + curr.views, 0);
    };

    const getTotalClicks = (profileId: string) => {
        const stats = data[profileId] || [];
        return stats.reduce((acc, curr) => {
            const clicks = Object.values(curr.clicks).reduce((a, b) => a + b, 0);
            return acc + clicks;
        }, 0);
    };

    return (
        <AnalyticsContext.Provider value={{ trackView, trackClick, getStats, getTotalViews, getTotalClicks }}>
            {children}
        </AnalyticsContext.Provider>
    );
}

export function useAnalytics() {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
}
