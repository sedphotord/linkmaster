import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '@/lib/types';
import {
    X, Copy, Link as LinkIcon, Facebook, Linkedin,
    Send, Twitter, Mail
} from 'lucide-react';
import { themeOptions } from '@/lib/data';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: UserProfile;
}

export default function ShareModal({ isOpen, onClose, profile }: ShareModalProps) {
    const [copied, setCopied] = useState(false);
    const profileUrl = `${window.location.origin}/${profile.username}`;
    const ap = profile.appearance;

    const handleCopy = () => {
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Determine background style for the card preview
    let cardStyle = {};
    if (ap.wallpaperStyle === 'image' && ap.customBackground) {
        cardStyle = { backgroundImage: `url(${ap.customBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    } else if (ap.wallpaperStyle === 'gradient' && ap.backgroundColor) {
        cardStyle = { background: `linear-gradient(to bottom, ${ap.backgroundColor}, ${ap.gradientColor2 || ap.backgroundColor})` };
    } else if (ap.backgroundColor) {
        cardStyle = { backgroundColor: ap.backgroundColor };
    } else {
        // Fallback to theme preset if no custom overrides
        const theme = themeOptions.find(t => t.id === profile.theme);
        if (theme) {
            // We'd ideally need the specific CSS classes or values from the theme config
            // For now, we'll try to approximate or use a class if possible, but inline styles are safer for this dynamic modal
            // If we can't easily get the color, we default to the theme's 'bg' class but apply it to the div
            // Since 'bg' is a tailwind class (e.g. bg-gray-900), passing it as className is better
        }
    }

    // Helper to get theme class if no custom style
    const theme = themeOptions.find(t => t.id === profile.theme);
    // If no custom background, we apply the first color of the theme to the card background
    // We do NOT use a class 'bg-gray-900' because themes define hex colors in 'colors' array
    const themeBgStyle = !ap.customBackground && !ap.backgroundColor && theme ? { backgroundColor: theme.colors[0] } : {};

    // Combine custom styles with theme fallback
    const finalCardStyle = { ...cardStyle, ...themeBgStyle };

    // Determine text color brightness for header
    // Simple heuristic: if theme is 'light', text is dark. Otherwise text is white.
    const isLightTheme = profile.theme === 'light' || profile.theme === 'air' || profile.theme === 'mineral' || profile.theme === 'bliss' || profile.theme === 'mint';
    const textColorClass = isLightTheme && !ap.backgroundColor ? 'text-gray-900' : 'text-white';


    const shareOptions = [
        {
            name: 'Copiar',
            icon: <LinkIcon size={24} />,
            action: handleCopy,
            color: 'bg-gray-100 text-gray-700'
        },
        {
            name: 'WhatsApp',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(profileUrl)}`, '_blank'),
            color: 'bg-[#25D366]'
        },
        {
            name: 'Facebook',
            icon: <Facebook size={24} className="text-white" />,
            action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`, '_blank'),
            color: 'bg-[#1877F2]'
        },
        {
            name: 'X',
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}`, '_blank'),
            color: 'bg-black'
        },
        {
            name: 'Messenger',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.56 5.47 3.99 7.15l-.57 2.1c-.24.88.69 1.63 1.48 1.19l2.25-1.24c.91.25 1.88.39 2.85.39 5.52 0 10-4.03 10-9s-4.48-9-10-9zm1.19 11.31l-2.61-2.77c-.19-.2-.51-.2-.7 0l-3.56 3.79c-.39.41-1 .04-.76-.43l2.84-5.53c.19-.2.51-.2.7 0l2.61 2.77c.19.2.51.2.7 0l3.56-3.79c.39-.41 1-.04.77.43l-2.85 5.53c-.19.2-.51.2-.7 0z" />
                </svg>
            ),
            action: () => window.open(`fb-messenger://share/?link=${encodeURIComponent(profileUrl)}`, '_blank'),
            color: 'bg-gradient-to-tr from-[#006AFF] to-[#00B2FF]'
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin size={24} className="text-white" />,
            action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`, '_blank'),
            color: 'bg-[#0A66C2]'
        },
        {
            name: 'Telegram',
            icon: <Send size={24} className="text-white" />,
            action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(profileUrl)}`, '_blank'),
            color: 'bg-[#0088cc]'
        },
        {
            name: 'Email',
            icon: <Mail size={24} className="text-white" />,
            action: () => window.location.href = `mailto:?body=${encodeURIComponent(profileUrl)}`,
            color: 'bg-gray-600'
        },
        {
            name: 'Snapchat',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M12.005 2.03c-3.692 0-6.287 3.018-6.082 5.094.026.257.075.50.154.717.3 1.185-.75 2.162-1.748 1.956-.546-.11-1.282.47-1.182 1.353.05.438.35.804.747 1.012 1.096.574 1.166 1.761.643 2.502-.27.382-.016.924.475 1.048.883.224 1.83.67 1.83 1.285 0 .284-.132.392-.265.5-.237.193-.532.433-.523 1.05.01.646.6 1.05 1.134 1.416.368.252.61.417.652.68.083.504-.42 1.178-2.613.882-.288-.04-.543.18-.543.473 0 .445.545.69 1.173.87 1.033.296 2.593.742 3.864.742h.56c1.272 0 2.831-.446 3.864-.74 1.058-.304 1.173-.872 1.173-.872 0-.292-.255-.512-.543-.472-2.193.296-2.697-.38-2.613-.883.042-.262.284-.427.652-.68.534-.365 1.124-.77 1.134-1.415.01-.617-.286-.857-.523-1.05-.133-.108-.265-.216-.265-.5 0-.616.947-1.062 1.83-1.286.49-.124.744-.666.475-1.048-.523-.74-.453-1.928.643-2.502.397-.208.697-.574.747-1.012.1-.883-.636-1.463-1.182-1.353-.998.206-2.048-.77-1.748-1.956.08-.217.128-.46.154-.717.205-2.076-2.39-5.094-6.082-5.094" />
                </svg>
            ),
            action: () => window.open(`https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(profileUrl)}`, '_blank'),
            color: 'bg-[#FFFC00] text-black [&>svg]:text-black' // Custom text color for bright yellow background
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[9999] backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[10000] bg-white rounded-t-3xl md:rounded-2xl md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px] max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-100">
                            <h3 className="font-bold text-lg text-center w-full ml-8">Compartir LinkMaster</h3>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* Profile Card Preview */}
                            <div
                                className={`rounded-3xl p-8 flex flex-col items-center justify-center shadow-xl relative overflow-hidden group min-h-[220px] ${textColorClass} transition-colors duration-300`}
                                style={finalCardStyle}
                            >
                                {/* Overlay for contrast if needed */}
                                <div className="absolute inset-0 bg-black/20" />

                                <div className="z-10 flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 mb-4 shadow-lg bg-white/10 backdrop-blur-sm">
                                        {profile.avatar ? (
                                            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className={`w-full h-full flex items-center justify-center text-3xl font-bold ${textColorClass}`}>
                                                {profile.name?.[0]}
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="text-xl font-bold mb-1 shadow-black/10 drop-shadow-md">@{profile.username}</h2>
                                    <div className="flex items-center gap-1.5 text-sm font-medium bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-md">
                                        <LinkIcon size={12} />
                                        <span>linkmaster.app/{profile.username}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Share Options */}
                            <div className="flex gap-4 overflow-x-auto pb-4 pt-2 no-scrollbar snap-x px-2">
                                {shareOptions.map((option) => (
                                    <button
                                        key={option.name}
                                        onClick={option.action}
                                        className="flex flex-col items-center gap-3 min-w-[72px] snap-center group transition-all"
                                    >
                                        <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:-translate-y-1 ${option.color}`}>
                                            {option.icon}
                                        </div>
                                        <span className="text-xs font-bold text-gray-500 whitespace-nowrap group-hover:text-gray-900 transition-colors">{option.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* CTA / Footer */}
                            <div className="bg-gray-50 rounded-2xl p-5 text-center space-y-4">
                                <div>
                                    <h4 className="font-bold text-gray-900">Únete a {profile.username} en LinkMaster</h4>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Crea tu propio bio link gratis. La única herramienta que necesitas para compartir todo lo que creas.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <a href="/" className="flex-1 bg-black text-white py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">
                                        Regístrate gratis
                                    </a>
                                    <a href="/" className="flex-1 bg-white border border-gray-200 text-gray-900 py-3 rounded-full font-bold text-sm hover:bg-gray-50 transition-colors">
                                        Descubre más
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
