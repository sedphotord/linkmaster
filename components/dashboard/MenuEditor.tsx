'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash2, ChevronUp, ChevronDown, Eye, EyeOff, Settings, X,
    ImageIcon, Tag, Upload, LayoutGrid, LayoutList, Palette
} from 'lucide-react';
import { MenuConfig, MenuCategory, MenuItem, MenuTag, MenuCardStyle } from '@/lib/types';

// ========== CONSTANTS ==========

const MENU_TAGS: { id: MenuTag; label: string; color: string }[] = [
    { id: 'popular', label: 'Popular', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    { id: 'nuevo', label: 'Nuevo', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'vegetariano', label: 'Vegetariano', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: 'vegano', label: 'Vegano', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { id: 'sin_gluten', label: 'Sin Gluten', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    { id: 'picante', label: 'Picante', color: 'bg-red-100 text-red-700 border-red-200' },
];

const CATEGORY_COLORS = [
    '#502274', '#2563EB', '#059669', '#D97706', '#DC2626',
    '#7C3AED', '#0891B2', '#BE185D', '#4F46E5', '#0D9488',
];

const CARD_STYLES: { id: MenuCardStyle; label: string; description: string }[] = [
    { id: 'classic', label: 'Clásico', description: 'Imagen a la izquierda con texto' },
    { id: 'card', label: 'Tarjeta', description: 'Imagen grande arriba, texto abajo' },
    { id: 'minimal', label: 'Minimal', description: 'Solo texto y precio, líneas limpias' },
    { id: 'compact', label: 'Compacto', description: 'Fila condensada con precio' },
    { id: 'magazine', label: 'Magazine', description: 'Imagen de fondo con overlay' },
];

// ========== IMAGE UPLOAD HELPER ==========

function useImageUpload(onUpload: (dataUrl: string) => void) {
    const inputRef = useRef<HTMLInputElement>(null);

    const trigger = () => inputRef.current?.click();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return;
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen debe ser menor a 5 MB');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                onUpload(reader.result);
            }
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    };

    const Input = (
        <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
        />
    );

    return { trigger, Input };
}

// ========== PROPS ==========

interface MenuEditorProps {
    menu: MenuConfig;
    onUpdate: (updates: Partial<MenuConfig>) => void;
}

// ========== CATEGORY MANAGER ==========

function CategoryManager({
    categories,
    activeCategory,
    setActiveCategory,
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
    onReorder,
}: {
    categories: MenuCategory[];
    activeCategory: string | null;
    setActiveCategory: (id: string | null) => void;
    onAddCategory: () => void;
    onUpdateCategory: (id: string, updates: Partial<MenuCategory>) => void;
    onDeleteCategory: (id: string) => void;
    onReorder: (id: string, direction: 'up' | 'down') => void;
}) {
    const [editingId, setEditingId] = useState<string | null>(null);

    const sorted = [...categories].sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-400">Secciones</h3>
                <button
                    onClick={onAddCategory}
                    className="text-xs font-bold text-[#502274] hover:text-[#3d1a59] flex items-center gap-1 transition-colors"
                >
                    <Plus size={14} /> Nueva sección
                </button>
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === null
                            ? 'bg-[#502274] text-white shadow-lg scale-105'
                            : 'bg-[#F3F3F1] text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Todos
                </button>

                {sorted.map((cat, idx) => (
                    <div key={cat.id} className="relative group">
                        <button
                            onClick={() => setActiveCategory(cat.id)}
                            onDoubleClick={() => setEditingId(cat.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${activeCategory === cat.id
                                    ? 'text-white shadow-lg scale-105'
                                    : 'bg-[#F3F3F1] text-gray-600 hover:bg-gray-200'
                                } ${!cat.active ? 'opacity-40' : ''}`}
                            style={activeCategory === cat.id ? { backgroundColor: cat.icon || '#502274' } : {}}
                        >
                            <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: cat.icon || '#502274' }}
                            />
                            {editingId === cat.id ? (
                                <input
                                    type="text"
                                    value={cat.name}
                                    onChange={(e) => onUpdateCategory(cat.id, { name: e.target.value })}
                                    onBlur={() => setEditingId(null)}
                                    onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                                    className="bg-transparent border-b border-current/30 outline-none w-24 text-sm"
                                    autoFocus
                                />
                            ) : (
                                <span>{cat.name}</span>
                            )}
                        </button>

                        {/* Hover controls */}
                        <div className="absolute -top-2 -right-2 hidden group-hover:flex gap-0.5 z-10">
                            {idx > 0 && (
                                <button
                                    onClick={() => onReorder(cat.id, 'up')}
                                    className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                                    title="Mover arriba"
                                >
                                    <ChevronUp size={10} />
                                </button>
                            )}
                            {idx < sorted.length - 1 && (
                                <button
                                    onClick={() => onReorder(cat.id, 'down')}
                                    className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                                    title="Mover abajo"
                                >
                                    <ChevronDown size={10} />
                                </button>
                            )}
                            <button
                                onClick={() => onUpdateCategory(cat.id, { active: !cat.active })}
                                className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100"
                            >
                                {cat.active ? <Eye size={10} className="text-green-600" /> : <EyeOff size={10} className="text-gray-400" />}
                            </button>
                            <button
                                onClick={() => onDeleteCategory(cat.id)}
                                className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-100"
                            >
                                <X size={10} className="text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expanded row when category selected for editing: color picker */}
            {editingId && (() => {
                const cat = categories.find(c => c.id === editingId);
                return cat ? (
                    <div className="flex items-center gap-2 px-2">
                        <span className="text-xs text-gray-400 font-bold">Color:</span>
                        {CATEGORY_COLORS.map(color => (
                            <button
                                key={color}
                                onClick={() => onUpdateCategory(cat.id, { icon: color })}
                                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-125 ${cat.icon === color ? 'border-gray-800 scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                ) : null;
            })()}
        </div>
    );
}

// ========== ITEM CARD (Editor) ==========

function MenuItemCard({
    item,
    categories,
    showImages,
    onUpdate,
    onDelete,
}: {
    item: MenuItem;
    categories: MenuCategory[];
    showImages: boolean;
    onUpdate: (updates: Partial<MenuItem>) => void;
    onDelete: () => void;
}) {
    const [showTagPicker, setShowTagPicker] = useState(false);

    const imgUpload = useImageUpload((dataUrl) => onUpdate({ image: dataUrl }));

    const toggleTag = (tag: MenuTag) => {
        const newTags = item.tags.includes(tag)
            ? item.tags.filter(t => t !== tag)
            : [...item.tags, tag];
        onUpdate({ tags: newTags });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm relative group hover:border-[#D2E823] transition-all ${!item.available ? 'opacity-60' : ''
                }`}
        >
            <div className="p-5">
                <div className="flex gap-4">
                    {/* Image upload area */}
                    {showImages && (
                        <div className="relative w-20 h-20 rounded-xl bg-[#F3F3F1] flex-shrink-0 overflow-hidden group/img">
                            {imgUpload.Input}
                            {item.image ? (
                                <>
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-1">
                                        <button onClick={imgUpload.trigger} className="p-1 bg-white/80 rounded-full">
                                            <Upload size={12} />
                                        </button>
                                        <button onClick={() => onUpdate({ image: '' })} className="p-1 bg-white/80 rounded-full">
                                            <X size={12} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <button
                                    onClick={imgUpload.trigger}
                                    className="w-full h-full flex flex-col items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
                                >
                                    <Upload size={16} className="text-gray-400" />
                                    <span className="text-[8px] text-gray-400 font-bold">SUBIR</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Content fields */}
                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => onUpdate({ name: e.target.value })}
                                className="font-bold text-gray-900 bg-transparent border-0 p-0 w-full focus:ring-0 text-base"
                                placeholder="Nombre del plato"
                            />
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                    onClick={() => onUpdate({ available: !item.available })}
                                    className={`p-1.5 rounded-lg transition-colors ${item.available ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                                    title={item.available ? 'Disponible' : 'Agotado'}
                                >
                                    {item.available ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                                <button
                                    onClick={onDelete}
                                    className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <input
                            type="text"
                            value={item.description}
                            onChange={(e) => onUpdate({ description: e.target.value })}
                            className="text-sm text-gray-500 bg-transparent border-0 p-0 w-full focus:ring-0"
                            placeholder="Descripcion breve..."
                        />

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-400 font-bold">$</span>
                                <input
                                    type="text"
                                    value={item.price}
                                    onChange={(e) => onUpdate({ price: e.target.value })}
                                    className="font-bold text-[#502274] bg-transparent border-0 p-0 w-24 focus:ring-0 text-base"
                                    placeholder="0.00"
                                />
                            </div>

                            <select
                                value={item.categoryId}
                                onChange={(e) => onUpdate({ categoryId: e.target.value })}
                                className="text-xs bg-[#F3F3F1] border-0 rounded-lg px-2 py-1 font-medium text-gray-600 cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                    {item.tags.map(tagId => {
                        const tag = MENU_TAGS.find(t => t.id === tagId);
                        return tag ? (
                            <span
                                key={tagId}
                                onClick={() => toggleTag(tagId)}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border cursor-pointer hover:opacity-70 ${tag.color}`}
                            >
                                {tag.label} ×
                            </span>
                        ) : null;
                    })}

                    <div className="relative">
                        <button
                            onClick={() => setShowTagPicker(!showTagPicker)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                        >
                            <Tag size={10} /> + Tag
                        </button>

                        {showTagPicker && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowTagPicker(false)} />
                                <div className="absolute bottom-full mb-1 left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-2 w-40">
                                    {MENU_TAGS.filter(t => !item.tags.includes(t.id)).map(tag => (
                                        <button
                                            key={tag.id}
                                            onClick={() => { toggleTag(tag.id); setShowTagPicker(false); }}
                                            className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-50 flex items-center gap-2"
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full`}
                                                style={{ backgroundColor: tag.color.includes('amber') ? '#D97706' : tag.color.includes('blue') ? '#2563EB' : tag.color.includes('emerald') ? '#059669' : tag.color.includes('green') ? '#16A34A' : tag.color.includes('orange') ? '#EA580C' : '#DC2626' }}
                                            />
                                            {tag.label}
                                        </button>
                                    ))}
                                    {MENU_TAGS.filter(t => !item.tags.includes(t.id)).length === 0 && (
                                        <p className="text-xs text-gray-400 text-center py-2">Todos asignados</p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ========== MAIN MENU EDITOR ==========

export default function MenuEditor({ menu, onUpdate }: MenuEditorProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showSettings, setShowSettings] = useState(false);

    // --- Category CRUD ---
    const addCategory = () => {
        const colorIdx = menu.categories.length % CATEGORY_COLORS.length;
        const newCat: MenuCategory = {
            id: Date.now().toString(),
            name: 'Nueva Seccion',
            icon: CATEGORY_COLORS[colorIdx],
            order: menu.categories.length,
            active: true,
        };
        onUpdate({ categories: [...menu.categories, newCat] });
        setActiveCategory(newCat.id);
    };

    const updateCategory = (id: string, updates: Partial<MenuCategory>) => {
        onUpdate({
            categories: menu.categories.map(c => c.id === id ? { ...c, ...updates } : c),
        });
    };

    const deleteCategory = (id: string) => {
        if (!confirm('Eliminar esta seccion y todos sus items?')) return;
        onUpdate({
            categories: menu.categories.filter(c => c.id !== id),
            items: menu.items.filter(i => i.categoryId !== id),
        });
        if (activeCategory === id) setActiveCategory(null);
    };

    const reorderCategory = (id: string, direction: 'up' | 'down') => {
        const sorted = [...menu.categories].sort((a, b) => a.order - b.order);
        const idx = sorted.findIndex(c => c.id === id);
        if (direction === 'up' && idx > 0) {
            const swapId = sorted[idx - 1].id;
            const currentOrder = sorted[idx].order;
            const swapOrder = sorted[idx - 1].order;
            onUpdate({
                categories: menu.categories.map(c => {
                    if (c.id === id) return { ...c, order: swapOrder };
                    if (c.id === swapId) return { ...c, order: currentOrder };
                    return c;
                }),
            });
        } else if (direction === 'down' && idx < sorted.length - 1) {
            const swapId = sorted[idx + 1].id;
            const currentOrder = sorted[idx].order;
            const swapOrder = sorted[idx + 1].order;
            onUpdate({
                categories: menu.categories.map(c => {
                    if (c.id === id) return { ...c, order: swapOrder };
                    if (c.id === swapId) return { ...c, order: currentOrder };
                    return c;
                }),
            });
        }
    };

    // --- Item CRUD ---
    const addItem = () => {
        const targetCategoryId = activeCategory || menu.categories[0]?.id;
        if (!targetCategoryId) {
            alert('Primero crea una seccion');
            return;
        }
        const newItem: MenuItem = {
            id: Date.now().toString(),
            name: '',
            description: '',
            price: '',
            image: '',
            tags: [],
            available: true,
            categoryId: targetCategoryId,
        };
        onUpdate({ items: [...menu.items, newItem] });
    };

    const updateItem = (id: string, updates: Partial<MenuItem>) => {
        onUpdate({
            items: menu.items.map(i => i.id === id ? { ...i, ...updates } : i),
        });
    };

    const deleteItem = (id: string) => {
        onUpdate({ items: menu.items.filter(i => i.id !== id) });
    };

    // Filter items
    const filteredItems = activeCategory
        ? menu.items.filter(i => i.categoryId === activeCategory)
        : menu.items;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tighter text-[#1e2330]">Menu</h2>
                    <p className="text-gray-500 font-medium">Gestiona el menu de tu restaurante o negocio</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className={`p-3 rounded-full transition-colors ${showSettings ? 'bg-[#502274] text-white' : 'bg-[#F3F3F1] text-gray-600 hover:bg-gray-200'}`}
                    >
                        <Settings size={20} />
                    </button>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={menu.active}
                            onChange={(e) => onUpdate({ active: e.target.checked })}
                            className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#502274]"></div>
                        <span className="ms-3 text-sm font-bold text-gray-700">
                            {menu.active ? 'Activo' : 'Inactivo'}
                        </span>
                    </label>
                </div>
            </div>

            {/* Settings Panel */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-5">
                            <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                <Settings size={14} /> Configuracion del Menu
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Nombre del Negocio</label>
                                    <input
                                        type="text"
                                        value={menu.businessName}
                                        onChange={(e) => onUpdate({ businessName: e.target.value })}
                                        className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-2.5 px-4 font-bold text-gray-800 focus:ring-[#502274] focus:border-[#502274]"
                                        placeholder="Ej: Restaurante El Fogon"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Moneda</label>
                                    <div className="flex gap-2">
                                        {(['DOP', 'USD', 'EUR'] as const).map(curr => (
                                            <button
                                                key={curr}
                                                onClick={() => onUpdate({ currency: curr })}
                                                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${menu.currency === curr
                                                        ? 'bg-[#502274] text-white shadow-lg'
                                                        : 'bg-[#F3F3F1] text-gray-600 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {curr === 'DOP' ? 'RD$ DOP' : curr === 'USD' ? '$ USD' : 'EUR'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <label className="flex items-center gap-2 p-3 bg-[#F3F3F1] rounded-xl cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={menu.showPrices}
                                        onChange={(e) => onUpdate({ showPrices: e.target.checked })}
                                        className="rounded text-[#502274] focus:ring-[#502274]"
                                    />
                                    <span className="text-xs font-bold text-gray-700">Precios</span>
                                </label>
                                <label className="flex items-center gap-2 p-3 bg-[#F3F3F1] rounded-xl cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={menu.showImages}
                                        onChange={(e) => onUpdate({ showImages: e.target.checked })}
                                        className="rounded text-[#502274] focus:ring-[#502274]"
                                    />
                                    <span className="text-xs font-bold text-gray-700">Imagenes</span>
                                </label>

                                {/* Layout toggle */}
                                <div className="flex items-center gap-2 p-3 bg-[#F3F3F1] rounded-xl">
                                    <button
                                        onClick={() => onUpdate({ layout: 'list' })}
                                        className={`p-1.5 rounded-lg transition-colors ${menu.layout === 'list' ? 'bg-[#502274] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                        title="Vista lista"
                                    >
                                        <LayoutList size={16} />
                                    </button>
                                    <button
                                        onClick={() => onUpdate({ layout: 'grid' })}
                                        className={`p-1.5 rounded-lg transition-colors ${menu.layout === 'grid' ? 'bg-[#502274] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                        title="Vista cuadricula"
                                    >
                                        <LayoutGrid size={16} />
                                    </button>
                                    <span className="text-xs font-bold text-gray-500 ml-1">
                                        {menu.layout === 'grid' ? 'Grid' : 'Lista'}
                                    </span>
                                </div>
                            </div>

                            {/* Card style selector */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                                    <Palette size={12} /> Estilo de tarjeta
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {CARD_STYLES.map(style => (
                                        <button
                                            key={style.id}
                                            onClick={() => onUpdate({ cardStyle: style.id })}
                                            className={`p-3 rounded-xl border-2 transition-all text-center ${menu.cardStyle === style.id
                                                    ? 'border-[#502274] bg-[#502274]/5 shadow-md'
                                                    : 'border-gray-100 hover:border-gray-300'
                                                }`}
                                        >
                                            <p className="text-xs font-bold text-gray-800">{style.label}</p>
                                            <p className="text-[9px] text-gray-400 mt-0.5 leading-tight">{style.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Nota (pie de menu)</label>
                                <input
                                    type="text"
                                    value={menu.note}
                                    onChange={(e) => onUpdate({ note: e.target.value })}
                                    className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-2.5 px-4 text-sm text-gray-600 focus:ring-[#502274] focus:border-[#502274]"
                                    placeholder="Ej: * ITBIS no incluido. Propinas no incluidas."
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Categories / Sections */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <CategoryManager
                    categories={menu.categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    onAddCategory={addCategory}
                    onUpdateCategory={updateCategory}
                    onDeleteCategory={deleteCategory}
                    onReorder={reorderCategory}
                />
            </div>

            {/* Items */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-gray-400">
                    Items ({filteredItems.length})
                </h3>
                <button
                    onClick={addItem}
                    className="bg-[#502274] text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#3d1a59] hover:scale-105 transition-all shadow-lg"
                >
                    <Plus size={16} strokeWidth={3} /> Agregar Item
                </button>
            </div>

            <div className="space-y-3">
                {filteredItems.length === 0 && (
                    <div className="bg-white p-10 rounded-[2rem] border border-dashed border-gray-300 text-center">
                        <ImageIcon size={36} className="mx-auto mb-3 text-gray-300" />
                        <h3 className="text-lg font-bold text-gray-700 mb-1">Sin items en esta seccion</h3>
                        <p className="text-gray-400 text-sm">
                            {menu.categories.length === 0
                                ? 'Crea una seccion primero, luego agrega items'
                                : 'Agrega items a tu menu con el boton de arriba'}
                        </p>
                    </div>
                )}

                <AnimatePresence>
                    {filteredItems.map(item => (
                        <MenuItemCard
                            key={item.id}
                            item={item}
                            categories={menu.categories}
                            showImages={menu.showImages}
                            onUpdate={(updates) => updateItem(item.id, updates)}
                            onDelete={() => deleteItem(item.id)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
