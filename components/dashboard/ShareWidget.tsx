import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import QRModal from '../QRModal';
import { Share2, Copy, QrCode, Mail, ExternalLink } from 'lucide-react';

interface ShareWidgetProps {
    profile: UserProfile;
}

export default function ShareWidget({ profile }: ShareWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const [copied, setCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const profileUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${profile.username}`;
    const displayUrl = `linkmaster.app/${profile.username}`;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    const shareOptions = [
        {
            name: 'WhatsApp',
            icon: (
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#25D366]" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(profileUrl)}`, '_blank')
        },
        {
            name: 'Facebook',
            icon: (
                <svg viewBox="0 0 24 24" className="w-full h-full text-[#1877F2]" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank')
        },
        {
            name: 'X',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-black">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`, '_blank')
        },
        {
            name: 'Email',
            icon: (
                <div className="w-full h-full bg-gray-500 rounded-full flex items-center justify-center">
                    <Mail className="w-3/4 h-3/4 text-white" />
                </div>
            ),
            action: () => window.location.href = `mailto:?body=${encodeURIComponent(profileUrl)}`
        },
    ];

    return (
        <div className="relative z-50 flex flex-col items-center" ref={containerRef}>
            {/* Styled "Bar" Button */}
            <div className="relative h-12 w-full max-w-[280px] rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">

                {/* External Link Icon (Left) */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20">
                    <a
                        href={`/${profile.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-black"
                        title="Ver perfil"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>

                <button
                    onClick={handleCopy}
                    className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full px-12 py-0.5 text-center transition-colors"
                    aria-label="Copy link"
                >
                    <div className="truncate text-sm font-medium leading-5 tracking-wide text-gray-700 group-hover:text-black transition-colors">
                        {copied ? '¡Enlace copiado!' : displayUrl}
                    </div>
                </button>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); toggleOpen(); }}
                        className={`flex items-center justify-center p-2 rounded-full transition-colors ${isOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                        aria-expanded={isOpen}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" strokeWidth="1.5" className="!size-5 h-5 w-5 text-gray-600 hover:text-black transition-colors"><path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"></path></svg>
                    </button>
                </div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-14 w-[300px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4"
                    >
                        <div className="grid grid-cols-4 gap-3 mb-4">
                            {shareOptions.map((opt) => (
                                <button
                                    key={opt.name}
                                    onClick={opt.action}
                                    className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 transition-all hover:scale-105 group/btn"
                                    title={opt.name}
                                >
                                    <div className="w-10 h-10 shadow-sm rounded-xl flex items-center justify-center bg-white border border-gray-100 group-hover/btn:shadow-md transition-all group-hover/btn:-translate-y-0.5">
                                        <div className="w-6 h-6">
                                            {opt.icon}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500">{opt.name}</span>
                                </button>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-3 flex gap-2">
                            <button
                                onClick={() => { setShowQr(true); setIsOpen(false); }}
                                className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs transition-colors"
                            >
                                <QrCode size={16} />
                                Código QR
                            </button>
                            <button
                                onClick={() => { handleCopy({ stopPropagation: () => { } } as any); setIsOpen(false); }}
                                className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-black text-white hover:bg-gray-800 font-bold text-xs transition-colors"
                            >
                                <Copy size={16} />
                                Copiar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <QRModal
                isOpen={showQr}
                onClose={() => setShowQr(false)}
                profile={profile}
            />
        </div>
    );
}
