import React, { useState } from 'react';
import { UserProfile } from '@/lib/types';
import { Mail, CheckCircle, Smartphone } from 'lucide-react';

interface NewsletterBlockProps {
    profile: UserProfile;
}

export default function NewsletterBlock({ profile }: NewsletterBlockProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const config = profile.newsletter;

    if (!config || !config.active) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
        }, 1500);

        // TODO: In real implementation, save to backend/storage
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 mb-8">
            <div className={`
                ${profile.theme === 'dark' ? 'bg-gray-800/50' : 'bg-white/80'} 
                backdrop-blur-md rounded-3xl p-8 border border-gray-100 shadow-sm text-center
            `}>
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <Mail className="w-6 h-6" />
                    </div>
                </div>

                <h3 className={`text-2xl font-black mb-2 ${profile.appearance?.pageTextColor || 'text-gray-900'}`}>
                    {config.title || 'Suscríbete a mi Newsletter'}
                </h3>
                <p className={`mb-6 ${profile.appearance?.pageTextColor ? 'opacity-80' : 'text-gray-500'}`}>
                    {config.description || 'Recibe mis últimas novedades y contenido exclusivo.'}
                </p>

                {status === 'success' ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-bold">{config.successMessage || '¡Gracias por suscribirte!'}</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            required
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 rounded-xl border-gray-200 py-3 px-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow text-gray-900"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`
                                font-bold py-3 px-6 rounded-xl transition-all hover:scale-105 active:scale-95
                                ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}
                            `}
                            style={{
                                backgroundColor: profile.appearance?.buttonColor || '#000000',
                                color: profile.appearance?.buttonTextColor || '#ffffff'
                            }}
                        >
                            {status === 'loading' ? 'Enviando...' : (config.buttonText || 'Suscribirse')}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
