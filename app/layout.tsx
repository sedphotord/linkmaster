import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const googleSans = localFont({
    src: [
        {
            path: './fonts/GoogleSans-VariableFont.ttf',
            style: 'normal',
        },
        {
            path: './fonts/GoogleSans-Italic-VariableFont.ttf',
            style: 'italic',
        },
    ],
    variable: '--font-google-sans',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'LinkMaster - Tu Bio Link Profesional',
    description: 'Crea tu página de bio links personalizada con catálogo de productos y más',
    keywords: ['bio link', 'linktree', 'social media', 'catálogo', 'productos'],
    icons: {
        icon: '/logoLinkMaster.svg',
    },
};

import { AnalyticsProvider } from '@/lib/analytics';
import FontInjector from '@/components/FontInjector';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={`${googleSans.variable} font-sans antialiased`}>
                <FontInjector />
                <AnalyticsProvider>
                    {children}
                </AnalyticsProvider>
            </body>
        </html>
    );
}
