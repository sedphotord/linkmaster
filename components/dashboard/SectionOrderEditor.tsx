import React, { useState } from 'react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { GripVertical, Eye, EyeOff, User, Share2, Link as LinkIcon, ShoppingBag, Utensils, CreditCard, Building2, Mail, Settings, X, Check } from 'lucide-react';
import { UserProfile, SectionType } from '../../lib/types';

interface SectionOrderEditorProps {
    profile: UserProfile;
    onUpdate: (updates: Partial<UserProfile>) => void;
}

const sectionConfig: Record<SectionType, { label: string; icon: any; hasToggle: boolean; hasSettings?: boolean }> = {
    hero: { label: 'Perfil (Foto + Bio)', icon: User, hasToggle: false },
    social: { label: 'Redes Sociales', icon: Share2, hasToggle: false },
    links: { label: 'Enlaces', icon: LinkIcon, hasToggle: false },
    catalog: { label: 'Catálogo / Tienda', icon: ShoppingBag, hasToggle: true },
    menu: { label: 'Menú de Restaurante', icon: Utensils, hasToggle: true },
    bank: { label: 'Datos Bancarios', icon: CreditCard, hasToggle: true },
    business: { label: 'Info. Negocio & Mapa', icon: Building2, hasToggle: true },
    newsletter: { label: 'Newsletter', icon: Mail, hasToggle: true, hasSettings: true },
};

const SectionItem = ({ section, profile, onUpdate, dragControls, onEdit }: { section: SectionType, profile: UserProfile, onUpdate: (updates: Partial<UserProfile>) => void, dragControls: any, onEdit?: (section: SectionType) => void }) => {
    const config = sectionConfig[section];
    const Icon = config.icon;

    const isVisible = (() => {
        switch (section) {
            case 'catalog': return profile.catalogActive;
            case 'menu': return profile.menu?.active;
            case 'business': return profile.businessInfo?.active;
            case 'bank': return profile.bankAccounts && profile.bankAccounts.length > 0;
            case 'newsletter': return profile.newsletter?.active;
            default: return true;
        }
    })();

    const handleToggle = () => {
        switch (section) {
            case 'catalog':
                onUpdate({ catalogActive: !profile.catalogActive });
                break;
            case 'menu':
                onUpdate({ menu: { ...profile.menu, active: !profile.menu.active } });
                break;
            case 'business':
                onUpdate({ businessInfo: { ...profile.businessInfo, active: !profile.businessInfo.active } });
                break;
            case 'newsletter':
                onUpdate({ newsletter: { ...(profile.newsletter || { title: '', description: '', buttonText: '', successMessage: '', subscribers: [] }), active: !profile.newsletter?.active } });
                break;
        }
    };

    return (
        <Reorder.Item
            value={section}
            id={section}
            dragListener={false}
            dragControls={dragControls}
            className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 mb-3"
        >
            <div className="flex items-center gap-4">
                <div
                    className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 touch-none p-2"
                    onPointerDown={(e) => dragControls.start(e)}
                >
                    <GripVertical size={20} />
                </div>

                <div className={`p-3 rounded-xl ${isVisible ? 'bg-purple-50 text-[#502274]' : 'bg-gray-100 text-gray-400'}`}>
                    <Icon size={20} />
                </div>

                <div className="flex-1">
                    <h3 className={`font-bold ${isVisible ? 'text-gray-900' : 'text-gray-400'}`}>
                        {config.label}
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    {config.hasSettings && isVisible && (
                        <button
                            onClick={() => onEdit && onEdit(section)}
                            className="p-2 rounded-full text-gray-400 hover:text-[#502274] hover:bg-purple-50 transition-colors"
                            title="Configurar"
                        >
                            <Settings size={20} />
                        </button>
                    )}

                    {config.hasToggle && section !== 'bank' && (
                        <button
                            onClick={handleToggle}
                            className={`p-2 rounded-full transition-colors ${isVisible ? 'text-[#502274] hover:bg-purple-50' : 'text-gray-300 hover:bg-gray-100'}`}
                            title={isVisible ? "Ocultar sección" : "Mostrar sección"}
                        >
                            {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                    )}
                </div>

                {section === 'bank' && (
                    <div className="text-xs text-gray-400 px-2">
                        {profile.bankAccounts?.length || 0} cuentas
                    </div>
                )}
            </div>
        </Reorder.Item>
    );
};

export default function SectionOrderEditor({ profile, onUpdate }: SectionOrderEditorProps) {
    const dragControls = useDragControls();
    const [editingSection, setEditingSection] = useState<SectionType | null>(null);

    // Initial default sections plus any new ones
    const currentOrder = profile.sectionOrder || ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business'];
    // Ensure all known sections are in the list if not present (migration)
    const allSections: SectionType[] = ['hero', 'social', 'links', 'catalog', 'menu', 'bank', 'business', 'newsletter'];
    const displayOrder = [...currentOrder, ...allSections.filter(s => !currentOrder.includes(s))];

    const handleReorder = (newOrder: SectionType[]) => {
        onUpdate({ sectionOrder: newOrder });
    };

    const renderEditModal = () => {
        if (editingSection !== 'newsletter') return null;

        const config = profile.newsletter || {
            active: true, title: '', description: '', buttonText: '', successMessage: '', subscribers: []
        };

        const updateConfig = (key: string, value: string) => {
            onUpdate({
                newsletter: { ...config, [key]: value }
            });
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setEditingSection(null)}>
                <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 text-[#502274] rounded-lg">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Configurar Newsletter</h3>
                                <p className="text-xs text-gray-500">Captura correos de tus visitantes</p>
                            </div>
                        </div>
                        <button onClick={() => setEditingSection(null)} className="p-2 hover:bg-gray-200 rounded-full text-gray-500">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Título</label>
                            <input
                                type="text"
                                value={config.title}
                                onChange={e => updateConfig('title', e.target.value)}
                                placeholder="Suscríbete a mi Newsletter"
                                className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-[#502274] focus:border-[#502274]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Descripción</label>
                            <textarea
                                value={config.description}
                                onChange={e => updateConfig('description', e.target.value)}
                                placeholder="Recibe novedades y contenido exclusivo..."
                                rows={2}
                                className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-[#502274] focus:border-[#502274]"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Texto del Botón</label>
                                <input
                                    type="text"
                                    value={config.buttonText}
                                    onChange={e => updateConfig('buttonText', e.target.value)}
                                    placeholder="Suscribirse"
                                    className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-[#502274] focus:border-[#502274]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Mensaje de Éxito</label>
                                <input
                                    type="text"
                                    value={config.successMessage}
                                    onChange={e => updateConfig('successMessage', e.target.value)}
                                    placeholder="¡Gracias por suscribirte!"
                                    className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-2 text-sm focus:ring-[#502274] focus:border-[#502274]"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase">Suscriptores ({config.subscribers?.length || 0})</h4>
                            {config.subscribers && config.subscribers.length > 0 ? (
                                <div className="max-h-40 overflow-y-auto space-y-2 mb-4 bg-gray-50 p-2 rounded-xl">
                                    {config.subscribers.map((sub, i) => (
                                        <div key={i} className="text-xs flex justify-between p-2 bg-white rounded-lg shadow-sm">
                                            <span className="font-medium text-gray-700">{sub.email}</span>
                                            <span className="text-gray-400">{new Date(sub.date).toLocaleDateString()}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic mb-4">Aún no hay suscriptores.</p>
                            )}

                            <button
                                onClick={() => {
                                    if (!config.subscribers || config.subscribers.length === 0) return;
                                    const csvContent = "data:text/csv;charset=utf-8,"
                                        + "Email,Date\n"
                                        + config.subscribers.map(s => `${s.email},${s.date}`).join("\n");
                                    const encodedUri = encodeURI(csvContent);
                                    const link = document.createElement("a");
                                    link.setAttribute("href", encodedUri);
                                    link.setAttribute("download", `subscribers-${profile.username}.csv`);
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                className="w-full border-2 border-dashed border-gray-300 rounded-xl py-3 text-xs font-bold text-gray-500 hover:border-[#502274] hover:text-[#502274] transition-colors flex items-center justify-center gap-2"
                            >
                                <Share2 size={14} /> Exportar CSV
                            </button>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                        <button
                            onClick={() => setEditingSection(null)}
                            className="bg-[#502274] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#3d1a58] transition-colors shadow-lg shadow-purple-200"
                        >
                            Listo
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Organizar Secciones</h3>
                <p className="text-gray-500 text-sm">Arrastra para reordenar cómo se ve tu perfil</p>
            </div>

            <Reorder.Group axis="y" values={displayOrder} onReorder={handleReorder} className="space-y-2">
                {displayOrder.map((section) => (
                    <SectionItem
                        key={section}
                        section={section}
                        profile={profile}
                        onUpdate={onUpdate}
                        dragControls={dragControls}
                        onEdit={setEditingSection}
                    />
                ))}
            </Reorder.Group>

            {renderEditModal()}
        </div>
    );
}
