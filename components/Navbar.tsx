'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed w-full z-50 top-4 px-4 md:px-10"
        >
            <div className="bg-white rounded-full py-4 px-8 flex justify-between items-center shadow-sm max-w-[1400px] mx-auto">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <img src="/logoLinkMaster.svg" alt="LinkMaster" className="w-10 h-10" />
                        <span className="text-2xl font-black tracking-tighter text-gray-900">LinkMaster</span>
                    </Link>
                    <div className="hidden md:flex gap-6 text-gray-600 font-medium text-sm">
                        <Link href="/templates" className="hover:text-black transition-colors">Plantillas</Link>
                        <Link href="/marketplace" className="hover:text-black transition-colors">Marketplace</Link>
                        <Link href="/discover" className="hover:text-black transition-colors">Descubrir</Link>
                        <Link href="/pricing" className="hover:text-black transition-colors">Precios</Link>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href="/login" className="px-5 py-3 bg-[#E9E9E9] hover:bg-[#dcdcdc] rounded-lg font-bold text-sm transition-colors">
                        Log in
                    </Link>
                    <Link href="/register" className="px-6 py-3 bg-[#00CAEA] text-white rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30">
                        Regístrate gratis
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
