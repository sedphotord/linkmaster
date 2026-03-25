'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function ShortLinkPage({ params }: { params: { code: string } }) {
    const router = useRouter();
    const { code } = params;

    useEffect(() => {
        // Find profile that has this link
        const profiles = storage.getProfiles(); // We might need a helper to search all profiles
        let foundUrl = null;

        // Iterate through all profiles to find the matching shortCode
        for (const profile of profiles) {
            const linkIndex = profile.links?.findIndex(l => l.shortCode === code);
            if (linkIndex !== -1 && linkIndex !== undefined) {
                const link = profile.links[linkIndex];
                foundUrl = link.url;

                // Increment click count
                const updatedLinks = [...profile.links];
                updatedLinks[linkIndex] = { ...link, clicks: (link.clicks || 0) + 1 };

                // We need to update the storage. 
                // Since this page is client-side, we can use storage.updateProfile if we export it or manually update.
                // storage.ts methods work with localStorage, so it should work.
                storage.updateProfile(profile.id, { links: updatedLinks });
                break;
            }
        }

        if (foundUrl) {
            // Ensure URL format
            const finalUrl = foundUrl.startsWith('http') ? foundUrl : `https://${foundUrl}`;
            window.location.href = finalUrl;
        } else {
            router.push('/404');
        }
    }, [code, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );
}
