'use client';

import React from 'react';
import AdminRoute from '@/components/admin/AdminRoute';
import Link from 'next/link';
import { useProfiles } from '@/contexts/ProfileContext';
import { LayoutDashboard, Users, LogOut, Settings, Globe, Palette, CreditCard, ShieldAlert, LayoutTemplate } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { ProfileProvider } from '@/contexts/ProfileContext';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { activeProfile } = useProfiles();
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { label: 'Landing Page', href: '/admin/landing', icon: LayoutTemplate },
        { label: 'Usuarios', href: '/admin/users', icon: Users },
        { label: 'Dominios', href: '/admin/domains', icon: Globe },
        { label: 'Visual Builder', href: '/admin/design', icon: Palette },
        { label: 'Finanzas', href: '/admin/finance', icon: CreditCard },
        { label: 'Contenido', href: '/admin/content', icon: ShieldAlert },
        { label: 'Configuración', href: '/admin/settings', icon: Settings },
    ];

    return (
        <AdminRoute>
            <div className="min-h-screen bg-gray-50 flex">
                {/* Admin Sidebar */}
                <aside className="w-64 bg-[#1e2330] text-white flex flex-col fixed h-full z-20">
                    <div className="p-6 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                            <img src="/logoLinkMaster.svg" alt="Admin" className="w-8 h-8" />
                            <span className="font-bold text-xl tracking-tight">Super Admin</span>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                        ? 'bg-[#00CAEA] text-white shadow-lg shadow-cyan-900/20'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-800">
                        <div className="flex items-center gap-3 px-4 py-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                                {activeProfile?.avatar ? (
                                    <img src={activeProfile.avatar} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-600" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{activeProfile?.username}</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            <LogOut size={16} />
                            Volver al App
                        </Link>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </AdminRoute>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProfileProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </ProfileProvider>
    );
}
