'use client';

import Dashboard from '@/components/Dashboard';
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';
import { useRouter } from 'next/navigation';

export default function AnalyticsPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
    };

    return (
        <Dashboard
            onLogout={handleLogout}
            customContent={
                <AnalyticsDashboard />
            }
        />
    );
}
