'use client';

import React, { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';

export default function FontInjector() {
    const [fonts, setFonts] = useState<string[]>([]);

    useEffect(() => {
        const settings = storage.getSystemSettings();
        if (settings.customFonts && settings.customFonts.length > 0) {
            setFonts(settings.customFonts);
        }
    }, []);

    if (fonts.length === 0) return null;

    return (
        <>
            {fonts.map((url, index) => (
                <link key={index} href={url} rel="stylesheet" />
            ))}
        </>
    );
}
