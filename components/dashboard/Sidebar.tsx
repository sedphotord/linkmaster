import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  LinkIcon,
  ShoppingBagIcon,
  BuildingLibraryIcon,
  BriefcaseIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  RectangleStackIcon,
  ChevronDownIcon,
  ChartBarIcon,
  ShareIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import { useProfiles } from '@/contexts/ProfileContext';
import { useRouter, usePathname } from 'next/navigation';
import ProfileSelector from './ProfileSelector';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  onLogout
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { activeProfile } = useProfiles();

  const navItems = [
    { id: 'analytics', label: 'Estadísticas', icon: ChartBarIcon, path: '/dashboard/analytics' },
    { id: 'links', label: 'Enlaces', icon: CursorArrowRaysIcon, path: '/dashboard/links' },
    { id: 'shortener', label: 'Acortador', icon: LinkIcon, path: '/dashboard/shortener' },
    { id: 'catalog', label: 'Catálogo', icon: ShoppingBagIcon, path: '/dashboard/catalog' },
    { id: 'menu', label: 'Menú', icon: ClipboardDocumentListIcon, path: '/dashboard/menu' },
    { id: 'bank', label: 'Bancos', icon: BuildingLibraryIcon, path: '/dashboard/bank' },
    { id: 'business', label: 'Empresa', icon: BriefcaseIcon, path: '/dashboard/business' },
    { id: 'appearance', label: 'Apariencia', icon: PaintBrushIcon, path: '/dashboard/appearance' },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Removed - Handled by Bottom Nav */}

      <motion.aside
        className={`hidden md:flex fixed md:static inset-y-0 left-0 z-40 w-72 bg-white md:bg-transparent flex-col md:p-6 shrink-0`}
      >
        <div className="h-full bg-white md:rounded-[2.5rem] p-6 shadow-xl md:shadow-none border border-gray-100 md:border-none flex flex-col justify-between relative">
          <div>
            <div className="mb-10 px-2 flex items-center gap-2">
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => handleNavigate('/dashboard/links')}
              >
                <img src="/logoLinkMaster.svg" alt="LinkMaster Logo" className="w-8 h-8 md:w-10 md:h-10" />
                <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-900">
                  LinkMaster
                </span>
              </div>
            </div>

            {/* Profile Selector */}
            <div className="mb-6">
              <ProfileSelector />
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${isActive
                      ? 'bg-[#F3F3F1] text-black shadow-inner'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                      }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#502274]' : ''}`} strokeWidth={1.5} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-gray-100">
            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" /> Cerrar Sesión
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
