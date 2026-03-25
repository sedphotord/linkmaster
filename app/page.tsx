'use client';

import LandingPage from '@/components/LandingPage';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/login');
    };

    return <LandingPage onLogin={handleLogin} />;
}
