'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import { storage } from '@/lib/storage';
import { ArrowLeft, User, AtSign, MessageSquare, Loader2, Check, X } from 'lucide-react';

export default function NewProfilePage() {
    const router = useRouter();
    const { createProfile } = useProfiles();

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        bio: '',
    });

    const [errors, setErrors] = useState<{
        username?: string;
        name?: string;
    }>({});

    const [isChecking, setIsChecking] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Validar username en tiempo real
    const checkUsername = async (username: string) => {
        if (!username || username.length < 3) {
            setUsernameAvailable(null);
            return;
        }

        setIsChecking(true);

        // Validar formato
        const validation = storage.validateUsername(username);
        if (!validation.valid) {
            setErrors(prev => ({ ...prev, username: validation.error }));
            setUsernameAvailable(false);
            setIsChecking(false);
            return;
        }

        // Verificar disponibilidad
        const available = storage.isUsernameAvailable(username);
        setUsernameAvailable(available);

        if (!available) {
            setErrors(prev => ({ ...prev, username: 'Este username ya está en uso' }));
        } else {
            setErrors(prev => ({ ...prev, username: undefined }));
        }

        setIsChecking(false);
    };

    const handleUsernameChange = (value: string) => {
        const cleaned = value.toLowerCase().trim();
        setFormData(prev => ({ ...prev, username: cleaned }));

        // Debounce check
        setTimeout(() => checkUsername(cleaned), 500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar nombre
        if (!formData.name.trim()) {
            setErrors(prev => ({ ...prev, name: 'El nombre es requerido' }));
            return;
        }

        // Validar username
        if (!formData.username || formData.username.length < 3) {
            setErrors(prev => ({ ...prev, username: 'El username debe tener al menos 3 caracteres' }));
            return;
        }

        if (!usernameAvailable) {
            return;
        }

        setIsCreating(true);

        const result = await createProfile(
            formData.username,
            formData.name,
            formData.bio
        );

        if (result.success) {
            router.push('/dashboard');
        } else {
            setErrors(prev => ({ ...prev, username: result.error }));
            setIsCreating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver
                    </button>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Crear Nuevo Perfil</h1>
                    <p className="text-gray-600">Crea un perfil único con tu propio link personalizado</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
                    {/* Username Field */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <AtSign size={16} />
                                Username *
                            </div>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                                linkmaster.com/
                            </div>
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => handleUsernameChange(e.target.value)}
                                placeholder="tu-nombre"
                                className={`w-full pl-40 pr-12 py-4 border-2 rounded-xl font-medium transition-all ${errors.username
                                        ? 'border-red-300 focus:border-red-500'
                                        : usernameAvailable
                                            ? 'border-green-300 focus:border-green-500'
                                            : 'border-gray-200 focus:border-blue-500'
                                    } focus:outline-none`}
                                required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                {isChecking && <Loader2 size={20} className="animate-spin text-gray-400" />}
                                {!isChecking && usernameAvailable === true && (
                                    <Check size={20} className="text-green-500" />
                                )}
                                {!isChecking && usernameAvailable === false && (
                                    <X size={20} className="text-red-500" />
                                )}
                            </div>
                        </div>
                        {errors.username && (
                            <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                        )}
                        {usernameAvailable && (
                            <p className="mt-2 text-sm text-green-600">✓ Username disponible</p>
                        )}
                        <p className="mt-2 text-xs text-gray-500">
                            Solo letras minúsculas, números y guiones. Mínimo 3 caracteres.
                        </p>
                    </div>

                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                Nombre *
                            </div>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Tu Nombre o Marca"
                            className={`w-full px-4 py-4 border-2 rounded-xl font-medium transition-all ${errors.name
                                    ? 'border-red-300 focus:border-red-500'
                                    : 'border-gray-200 focus:border-blue-500'
                                } focus:outline-none`}
                            required
                            maxLength={50}
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    {/* Bio Field */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <MessageSquare size={16} />
                                Bio (opcional)
                            </div>
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                            placeholder="Cuéntale al mundo sobre ti..."
                            rows={3}
                            className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl font-medium focus:outline-none focus:border-blue-500 transition-all resize-none"
                            maxLength={150}
                        />
                        <p className="mt-2 text-xs text-gray-500 text-right">
                            {formData.bio.length}/150
                        </p>
                    </div>

                    {/* Preview */}
                    {formData.username && (
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                            <p className="text-sm font-bold text-blue-900 mb-2">Tu link será:</p>
                            <p className="text-lg font-black text-blue-600">
                                linkmaster.com/{formData.username}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating || !usernameAvailable || !formData.name}
                            className="flex-1 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isCreating ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Creando...
                                </>
                            ) : (
                                'Crear Perfil'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
