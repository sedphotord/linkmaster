'use client';

import Dashboard from '@/components/Dashboard';
import { useRouter } from 'next/navigation';
import { useProfiles } from '@/contexts/ProfileContext';
import { useState } from 'react';
import {
    PlusCircleIcon,
    GlobeAltIcon,
    PencilIcon,
    TrashIcon,
    UserGroupIcon,
    CheckIcon,
    XMarkIcon,
    ArrowPathIcon,
    CameraIcon,
    EyeIcon,
    EyeSlashIcon
} from '@heroicons/react/24/outline';

export default function ProfilesPage() {
    const router = useRouter();
    const { profiles, activeProfile, setActiveProfile, deleteProfile, updateProfile } = useProfiles();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingUsername, setEditingUsername] = useState('');
    const [editError, setEditError] = useState('');
    const [uploadingPhotoId, setUploadingPhotoId] = useState<string | null>(null);

    const handleDelete = (id: string, name: string) => {
        if (confirm(`¿Estás seguro de eliminar el perfil "${name}"? Esta acción no se puede deshacer.`)) {
            setDeletingId(id);
            const result = deleteProfile(id);
            if (result.success && profiles.length > 1) {
                // Si todavía hay perfiles, seleccionar otro
                const remaining = profiles.filter(p => p.id !== id);
                if (remaining.length > 0) {
                    setActiveProfile(remaining[0]);
                }
            } else if (result.success && profiles.length === 1) {
                // Era el último perfil, redirigir a crear uno nuevo
                router.push('/dashboard/new');
            }
            setDeletingId(null);
        }
    };

    const handleToggleVisibility = (profileId: string, currentStatus: boolean = true) => {
        updateProfile(profileId, { isVisible: !currentStatus });
    };

    const handleEdit = (profileId: string) => {
        const profile = profiles.find(p => p.id === profileId);
        if (profile) {
            setActiveProfile(profile);
            router.push('/dashboard');
        }
    };

    const handleSwitchToProfile = (profile: any) => {
        setActiveProfile(profile);
        router.push('/dashboard');
    };

    const startEditingUsername = (profile: any) => {
        setEditingId(profile.id);
        setEditingUsername(profile.username);
        setEditError('');
    };

    const cancelEditingUsername = () => {
        setEditingId(null);
        setEditingUsername('');
        setEditError('');
    };

    const saveUsername = (profileId: string) => {
        if (editingUsername.trim() === '') {
            setEditError('El username no puede estar vacío');
            return;
        }

        const result = updateProfile(profileId, { username: editingUsername.trim() });

        if (result.success) {
            setEditingId(null);
            setEditingUsername('');
            setEditError('');
        } else {
            setEditError(result.error || 'Error al actualizar username');
        }
    };

    const handlePhotoUpload = (profileId: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida');
            return;
        }

        // Validar tamaño (máximo 2MB)
        if (file.size > 2 * 1024 * 1024) {
            alert('La imagen no debe superar 2MB');
            return;
        }

        setUploadingPhotoId(profileId);

        // Convertir a base64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const result = updateProfile(profileId, { avatar: base64String });

            if (!result.success) {
                alert(result.error || 'Error al subir la foto');
            }

            setUploadingPhotoId(null);
        };

        reader.onerror = () => {
            alert('Error al leer el archivo');
            setUploadingPhotoId(null);
        };

        reader.readAsDataURL(file);
    };

    const handleLogout = () => {
        router.push('/');
    };

    // Contenido de la página de perfiles que se mostrará en el área de contenido del Dashboard
    const profilesContent = (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <UserGroupIcon className="w-10 h-10 text-gray-900" />
                    <h1 className="text-4xl font-black text-gray-900">Mis Perfiles</h1>
                </div>
                <p className="text-gray-600">Gestiona todos tus perfiles de LinkMaster</p>
            </div>

            {/* Create New Button */}
            <button
                onClick={() => router.push('/dashboard/new')}
                className="w-full mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 group hover:scale-[1.02]"
            >
                <PlusCircleIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Crear Nuevo Perfil
            </button>

            {/* Profiles Grid */}
            {profiles.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center border-2 border-gray-100">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserGroupIcon className="w-12 h-12 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No tienes perfiles todavía</h2>
                    <p className="text-gray-600 mb-6">Crea tu primer perfil para comenzar</p>
                    <button
                        onClick={() => router.push('/dashboard/new')}
                        className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors"
                    >
                        Crear Mi Primer Perfil
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((profile) => (
                        <div
                            key={profile.id}
                            className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all hover:shadow-xl ${activeProfile?.id === profile.id
                                ? 'border-purple-500 ring-4 ring-purple-100'
                                : 'border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {/* Avatar & Name */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative group">
                                    <img
                                        src={profile.avatar}
                                        alt={profile.name}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-gray-100"
                                    />
                                    {/* Upload Photo Overlay */}
                                    <label
                                        htmlFor={`photo-${profile.id}`}
                                        className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        {uploadingPhotoId === profile.id ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <CameraIcon className="w-6 h-6 text-white" />
                                        )}
                                    </label>
                                    <input
                                        id={`photo-${profile.id}`}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handlePhotoUpload(profile.id, e)}
                                        disabled={uploadingPhotoId === profile.id}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-gray-900 truncate">{profile.name}</h3>

                                    {/* Editable Username */}
                                    {editingId === profile.id ? (
                                        <div className="mt-1">
                                            <div className="flex items-center gap-1">
                                                <span className="text-gray-500 text-sm">/</span>
                                                <input
                                                    type="text"
                                                    value={editingUsername}
                                                    onChange={(e) => setEditingUsername(e.target.value)}
                                                    className="text-sm bg-blue-50 border-2 border-blue-300 rounded px-2 py-0.5 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    autoFocus
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') saveUsername(profile.id);
                                                        if (e.key === 'Escape') cancelEditingUsername();
                                                    }}
                                                />
                                            </div>
                                            {editError && (
                                                <p className="text-xs text-red-600 mt-1">{editError}</p>
                                            )}
                                            <div className="flex gap-1 mt-1">
                                                <button
                                                    onClick={() => saveUsername(profile.id)}
                                                    className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                                    title="Guardar"
                                                >
                                                    <CheckIcon className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={cancelEditingUsername}
                                                    className="p-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                                                    title="Cancelar"
                                                >
                                                    <XMarkIcon className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 mt-1">
                                            <p className="text-sm text-gray-500">@{profile.username}</p>
                                            <button
                                                onClick={() => startEditingUsername(profile)}
                                                className="p-0.5 text-gray-400 hover:text-blue-600 transition-colors"
                                                title="Editar username"
                                            >
                                                <PencilIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bio */}
                            {profile.bio && (
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{profile.bio}</p>
                            )}

                            {/* Stats */}
                            <div className="flex gap-4 mb-4 pb-4 border-b border-gray-100">
                                <div className="text-center flex-1">
                                    <div className="text-2xl font-bold text-gray-900">{profile.links.length}</div>
                                    <div className="text-xs text-gray-500">Enlaces</div>
                                </div>
                                <div className="text-center flex-1">
                                    <div className="text-2xl font-bold text-gray-900">{profile.products.length}</div>
                                    <div className="text-xs text-gray-500">Productos</div>
                                </div>
                                <div className="text-center flex-1">
                                    <div className="text-2xl font-bold text-gray-900">
                                        {profile.bankAccounts.length}
                                    </div>
                                    <div className="text-xs text-gray-500">Bancos</div>
                                </div>
                            </div>

                            {/* Active Badge */}
                            {activeProfile?.id === profile.id && (
                                <div className="mb-4">
                                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                                        Perfil Activo
                                    </span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-2">
                                {activeProfile?.id !== profile.id ? (
                                    <button
                                        onClick={() => handleSwitchToProfile(profile)}
                                        className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 rounded-xl font-semibold text-sm hover:bg-purple-100 transition-colors"
                                    >
                                        <ArrowPathIcon className="w-4 h-4" />
                                        Cambiar a este perfil
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(profile.id)}
                                        className="col-span-2 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-100 transition-colors"
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                        Editar Perfil
                                    </button>
                                )}

                                <a
                                    href={`/${profile.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-xl font-semibold text-sm hover:bg-green-100 transition-colors"
                                >
                                    <GlobeAltIcon className="w-4 h-4" />
                                    Ver
                                </a>

                                {/* Visibility Toggle */}
                                <button
                                    onClick={() => handleToggleVisibility(profile.id, profile.isVisible)}
                                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm transition-colors ${profile.isVisible !== false
                                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                                        }`}
                                    title={profile.isVisible !== false ? 'Ocultar perfil' : 'Hacer visible'}
                                >
                                    {profile.isVisible !== false ? (
                                        <>
                                            <EyeIcon className="w-4 h-4" />
                                            Visible
                                        </>
                                    ) : (
                                        <>
                                            <EyeSlashIcon className="w-4 h-4" />
                                            Oculto
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => handleDelete(profile.id, profile.name)}
                                    disabled={deletingId === profile.id}
                                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                    Borrar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div >
    );

    return (
        <Dashboard onLogout={handleLogout} customContent={profilesContent} />
    );
}
