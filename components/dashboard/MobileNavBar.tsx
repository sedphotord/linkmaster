'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LinkIcon,
    PaintBrushIcon,
    ChartBarIcon,
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    ShoppingBagIcon,
    ClipboardDocumentListIcon,
    CreditCardIcon,
    BriefcaseIcon,
    UserCircleIcon,
    EyeIcon,
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { useProfiles } from '@/contexts/ProfileContext';
import ProfileSelector from './ProfileSelector'; // We might need a adapted version or reuse this one

interface MobileNavBarProps {
    onOpenPreview: () => void;
    onLogout: () => void;
}

export default function MobileNavBar({ onOpenPreview, onLogout }: MobileNavBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const { activeProfile } = useProfiles();

    const mainNavItems = [
        { id: 'links', label: 'Enlaces', icon: LinkIcon, path: '/dashboard/links' },
        { id: 'appearance', label: 'Apariencia', icon: PaintBrushIcon, path: '/dashboard/appearance' },
        { id: 'preview', label: 'Vista', icon: EyeIcon, action: onOpenPreview },
        { id: 'analytics', label: 'Estadísticas', icon: ChartBarIcon, path: '/dashboard/analytics' },
        { id: 'menu', label: 'Menú', icon: Bars3Icon, action: () => setIsMoreOpen(true) },
    ];

    const secondaryNavItems = [
        { id: 'shortener', label: 'Acortador', icon: LinkIcon, path: '/dashboard/shortener' },
        { id: 'catalog', label: 'Catálogo', icon: ShoppingBagIcon, path: '/dashboard/catalog' },
        { id: 'menu_rest', label: 'Menú Rest', icon: ClipboardDocumentListIcon, path: '/dashboard/menu' },
        { id: 'bank', label: 'Bancos', icon: CreditCardIcon, path: '/dashboard/bank' },
        { id: 'business', label: 'Empresa', icon: BriefcaseIcon, path: '/dashboard/business' },
    ];

    const handleNavigate = (path: string) => {
        router.push(path);
        setIsMoreOpen(false);
    };

    return (
        <>
            {/* Fixed Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 z-50 flex justify-between items-center pb-safe">
                {mainNavItems.map((item) => {
                    const isActive = item.path === pathname;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => item.path ? handleNavigate(item.path) : item.action?.()}
                            className={`flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? 'stroke-2' : ''}`} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* "More" Drawer Overlay */}
            <AnimatePresence>
                {isMoreOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden"
                            onClick={() => setIsMoreOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl p-6 md:hidden max-h-[85vh] overflow-y-auto pb-safe-offset"
                        >
                            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Menú Principal</h2>
                                <button
                                    onClick={() => setIsMoreOpen(false)}
                                    className="p-2 bg-gray-100 rounded-full text-gray-500 px-2"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Profile Section */}
                            <div className="mb-8">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Perfil Activo</h3>
                                <ProfileSelector />
                            </div>

                            {/* Secondary Links */}
                            <div className="space-y-2 mb-8">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Herramientas</h3>
                                {secondaryNavItems.map((item) => {
                                    const isActive = pathname === item.path;
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigate(item.path)}
                                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-purple-50 text-purple-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center justify-center gap-2 text-red-600 font-medium py-3 rounded-xl hover:bg-red-50 transition-colors"
                                >
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
