import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, ShoppingBagIcon, PhotoIcon, DocumentIcon, TableCellsIcon, ListBulletIcon, ArrowPathIcon, RectangleStackIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import { Product, CatalogConfig, CatalogLayout } from '@/lib/types';

interface CatalogEditorProps {
    products: Product[];
    catalogConfig: CatalogConfig | undefined;
    catalogActive: boolean;
    onToggleCatalog: (active: boolean) => void;
    onUpdateConfig: (config: CatalogConfig) => void;
    onAddProduct: () => void;
    onUpdateProduct: (id: string, field: string, value: any) => void;
    onDeleteProduct: (id: string) => void;
    onOptimizeProduct?: (productId: string) => void;
    loadingProductId?: string | null;
}

export default function CatalogEditor({
    products,
    catalogConfig,
    catalogActive,
    onToggleCatalog,
    onUpdateConfig,
    onAddProduct,
    onUpdateProduct,
    onDeleteProduct,
    onOptimizeProduct,
    loadingProductId
}: CatalogEditorProps) {
    const config = catalogConfig || { layout: 'grid' };
    const [uploadingId, setUploadingId] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const galleryInputRef = React.useRef<HTMLInputElement>(null);

    const layouts: { id: CatalogLayout; label: string; icon: any }[] = [
        { id: 'grid', label: 'Cuadrícula', icon: TableCellsIcon },
        { id: 'list', label: 'Lista', icon: ListBulletIcon },
        { id: 'carousel', label: 'Carrusel', icon: ArrowPathIcon },
        { id: 'banner', label: 'Banner', icon: RectangleStackIcon },
    ];

    const handleConfigChange = (field: keyof CatalogConfig, value: any) => {
        onUpdateConfig({ ...config, [field]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadingId(productId);
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdateProduct(productId, 'image', reader.result as string);
                setUploadingId(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages: string[] = [];
            let processed = 0;

            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newImages.push(reader.result as string);
                    processed++;
                    if (processed === files.length) {
                        const product = products.find(p => p.id === productId);
                        const currentGallery = product?.gallery || [];
                        onUpdateProduct(productId, 'gallery', [...currentGallery, ...newImages]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeGalleryImage = (productId: string, index: number) => {
        const product = products.find(p => p.id === productId);
        if (product && product.gallery) {
            const newGallery = [...product.gallery];
            newGallery.splice(index, 1);
            onUpdateProduct(productId, 'gallery', newGallery);
        }
    };

    // Helper to handle the actual file input change which needs to know WHICH product is being updated
    // We use a state 'uploadingId' to track which product requested the upload
    // But actually, it's cleaner to just have the input hidden and trigger it, but we need to pass the ID to the change handler.
    // A better way for list items: simple input per item or a shared ref that knows the ID.
    // Let's use a shared ref and a ref to store the current ID.
    const currentUploadIdRef = React.useRef<string | null>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentUploadIdRef.current) {
            handleImageUpload(e, currentUploadIdRef.current);
        }
    };

    const onGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (currentUploadIdRef.current) {
            handleGalleryUpload(e, currentUploadIdRef.current);
        }
    };

    const openUpload = (id: string) => {
        currentUploadIdRef.current = id;
        fileInputRef.current?.click();
    };

    const openGalleryUpload = (id: string) => {
        currentUploadIdRef.current = id;
        galleryInputRef.current?.click();
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            {/* Shared File Inputs */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onFileChange}
            />
            <input
                type="file"
                ref={galleryInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={onGalleryChange}
            />

            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tighter text-[#1e2330]">Catálogo</h2>
                    <p className="text-gray-500 font-medium">Gestiona productos, diseño y descargas</p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={catalogActive}
                        onChange={(e) => onToggleCatalog(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#502274]"></div>
                    <span className="ms-3 text-sm font-bold text-gray-700">
                        {catalogActive ? 'Activo' : 'Inactivo'}
                    </span>
                </label>
            </div>

            {catalogActive && (
                <div className="space-y-8">
                    {/* Settings Section */}
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <SparklesIcon className="w-5 h-5 text-purple-600" /> Configuración de Diseño
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-3 ml-1">Diseño</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {layouts.map((l) => (
                                        <button
                                            key={l.id}
                                            onClick={() => handleConfigChange('layout', l.id)}
                                            className={`flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all ${config.layout === l.id
                                                ? 'border-[#502274] bg-[#502274]/5 text-[#502274]'
                                                : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                                                }`}
                                        >
                                            <l.icon className="w-5 h-5" />
                                            <span className="text-[10px] font-bold">{l.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Card Colors */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-xs font-black uppercase tracking-wider text-gray-400 ml-1">Colores de Tarjeta</label>
                                    {(config.cardBackgroundColor || config.cardTextColor) && (
                                        <button
                                            onClick={() => onUpdateConfig({ ...config, cardBackgroundColor: undefined, cardTextColor: undefined })}
                                            className="text-[10px] font-bold text-red-500 hover:underline"
                                        >
                                            Resetear a Tema
                                        </button>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                                        <div className="w-8 h-8 rounded-full border shadow-sm shrink-0" style={{ backgroundColor: config.cardBackgroundColor || '#ffffff' }}></div>
                                        <input
                                            type="color"
                                            value={config.cardBackgroundColor || '#ffffff'}
                                            onChange={(e) => handleConfigChange('cardBackgroundColor', e.target.value)}
                                            className="w-0 h-0 opacity-0 overflow-hidden absolute"
                                            id="cardBgColor"
                                        />
                                        <label htmlFor="cardBgColor" className="flex-1 text-xs font-bold text-gray-600 cursor-pointer">Fondo Tarjeta</label>
                                        <label htmlFor="cardBgColor" className="text-xs text-gray-400 cursor-pointer">{config.cardBackgroundColor || 'Auto'}</label>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                                        <div className="w-8 h-8 rounded-full border shadow-sm shrink-0" style={{ backgroundColor: config.cardTextColor || '#000000' }}></div>
                                        <input
                                            type="color"
                                            value={config.cardTextColor || '#000000'}
                                            onChange={(e) => handleConfigChange('cardTextColor', e.target.value)}
                                            className="w-0 h-0 opacity-0 overflow-hidden absolute"
                                            id="cardTextColor"
                                        />
                                        <label htmlFor="cardTextColor" className="flex-1 text-xs font-bold text-gray-600 cursor-pointer">Color Texto</label>
                                        <label htmlFor="cardTextColor" className="text-xs text-gray-400 cursor-pointer">{config.cardTextColor || 'Auto'}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">PDF Catálogo (URL)</label>
                                <div className="relative">
                                    <DocumentIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={config.pdfUrl || ''}
                                        onChange={(e) => handleConfigChange('pdfUrl', e.target.value)}
                                        className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-[#502274] focus:border-[#502274]"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">Imagen de Portada (URL)</label>
                                <div className="relative">
                                    <PhotoIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={config.coverImage || ''}
                                        onChange={(e) => handleConfigChange('coverImage', e.target.value)}
                                        className="w-full bg-[#F3F3F1] border-transparent rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-[#502274] focus:border-[#502274]"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products List */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <h3 className="text-lg font-bold">Productos</h3>
                            <button onClick={onAddProduct} className="text-[#502274] font-bold text-sm flex items-center gap-1 hover:underline">
                                <PlusIcon className="w-4 h-4" /> Agregar Producto
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {products.map(product => (
                                <div key={product.id} className={`bg-white p-4 rounded-2xl border transition-all ${product.active ? 'border-gray-100 shadow-sm' : 'border-gray-100 opacity-60 bg-gray-50'}`}>
                                    <div className="flex gap-4 items-start">
                                        {/* Image Uploader */}
                                        <div
                                            onClick={() => openUpload(product.id)}
                                            className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 cursor-pointer relative group hover:ring-2 hover:ring-[#502274] transition-all"
                                        >
                                            {product.image ? (
                                                <>
                                                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <PhotoIcon className="w-6 h-6 text-white" />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-1">
                                                    <PhotoIcon className="w-6 h-6" />
                                                    <span className="text-[9px] font-bold uppercase">Subir</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-3">
                                            {/* Header: Name + Actions */}
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1 flex-1 mr-2">
                                                    <input
                                                        type="text"
                                                        value={product.name}
                                                        onChange={(e) => onUpdateProduct(product.id, 'name', e.target.value)}
                                                        className="font-bold text-base bg-transparent border-none p-0 w-full focus:ring-0 placeholder-gray-400"
                                                        placeholder="Nombre del producto"
                                                    />

                                                    {/* Type Selector */}
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => onUpdateProduct(product.id, 'type', 'standard')}
                                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-colors ${!product.type || product.type === 'standard' ? 'bg-[#502274] text-white border-[#502274]' : 'text-gray-400 border-gray-200 hover:border-gray-300'}`}
                                                        >
                                                            Normal
                                                        </button>
                                                        <button
                                                            onClick={() => onUpdateProduct(product.id, 'type', 'pdf')}
                                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-colors ${product.type === 'pdf' ? 'bg-red-600 text-white border-red-600' : 'text-gray-400 border-gray-200 hover:border-gray-300'}`}
                                                        >
                                                            PDF
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => onUpdateProduct(product.id, 'inStock', product.inStock === false ? true : false)}
                                                        className={`p-2 rounded-lg transition-colors ${product.inStock !== false ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-red-400 bg-red-50 hover:bg-red-100'}`}
                                                        title={product.inStock !== false ? "En Stock" : "Agotado"}
                                                    >
                                                        <span className="text-[10px] font-black uppercase">{product.inStock !== false ? "Stock" : "Agotado"}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => onUpdateProduct(product.id, 'active', !product.active)}
                                                        className={`p-2 rounded-lg transition-colors ${product.active ? 'text-gray-400 hover:text-gray-600' : 'text-gray-300 hover:text-gray-500'}`}
                                                        title={product.active ? "Ocultar" : "Mostrar"}
                                                    >
                                                        {product.active ? (
                                                            <EyeIcon className="w-5 h-5 text-gray-600" />
                                                        ) : (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    <button onClick={() => onDeleteProduct(product.id)} className="text-gray-300 hover:text-red-500 p-2">
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Conditional Fields */}
                                            {product.type === 'pdf' ? (
                                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <div className="relative">
                                                        <DocumentIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={product.pdfUrl || ''}
                                                            onChange={(e) => onUpdateProduct(product.id, 'pdfUrl', e.target.value)}
                                                            className="w-full bg-[#F3F3F1] border-transparent rounded-lg py-2 pl-9 pr-3 text-xs w-full focus:ring-1 focus:ring-[#502274]"
                                                            placeholder="URL del PDF (https://...)"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={product.category || ''}
                                                            onChange={(e) => onUpdateProduct(product.id, 'category', e.target.value)}
                                                            className="bg-[#F3F3F1] rounded-lg px-3 py-2 text-xs font-bold w-24 border-transparent focus:ring-1 focus:ring-[#502274]"
                                                            placeholder="Categoría"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={product.price}
                                                            onChange={(e) => onUpdateProduct(product.id, 'price', e.target.value)}
                                                            className="bg-[#F3F3F1] rounded-lg px-3 py-2 text-xs font-bold w-24 border-transparent focus:ring-1 focus:ring-[#502274]"
                                                            placeholder="Precio"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={product.description}
                                                            onChange={(e) => onUpdateProduct(product.id, 'description', e.target.value)}
                                                            className="bg-[#F3F3F1] rounded-lg px-3 py-2 text-xs w-full border-transparent focus:ring-1 focus:ring-[#502274]"
                                                            placeholder="Descripción breve..."
                                                        />
                                                        {onOptimizeProduct && (
                                                            <button
                                                                onClick={() => onOptimizeProduct(product.id)}
                                                                disabled={loadingProductId === product.id}
                                                                className="p-2 bg-white border border-dashed border-purple-200 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                                                                title="Mejorar con IA"
                                                            >
                                                                {loadingProductId === product.id ? (
                                                                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                                                ) : (
                                                                    <SparklesIcon className="w-4 h-4" />
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Variants Section */}
                                                    <div className="pt-2 border-t border-gray-100">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Variantes (Talla, Color...)</label>
                                                            <button
                                                                onClick={() => {
                                                                    const currentVariants = product.variants || [];
                                                                    const newVariant = { id: Date.now().toString(), name: 'Opción', options: [] };
                                                                    onUpdateProduct(product.id, 'variants', [...currentVariants, newVariant]);
                                                                }}
                                                                className="text-[10px] font-bold text-[#502274] flex items-center gap-1 hover:underline"
                                                            >
                                                                <PlusIcon className="w-3 h-3" /> Crear Variante
                                                            </button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {product.variants?.map((variant, vIdx) => (
                                                                <div key={variant.id} className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg">
                                                                    <input
                                                                        type="text"
                                                                        value={variant.name}
                                                                        onChange={(e) => {
                                                                            const newVariants = [...(product.variants || [])];
                                                                            newVariants[vIdx].name = e.target.value;
                                                                            onUpdateProduct(product.id, 'variants', newVariants);
                                                                        }}
                                                                        className="bg-white rounded-md px-2 py-1 text-xs font-bold w-20 border border-gray-200 focus:ring-1 focus:ring-[#502274]"
                                                                        placeholder="Nombre"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={variant.options.join(', ')}
                                                                        onChange={(e) => {
                                                                            const newVariants = [...(product.variants || [])];
                                                                            newVariants[vIdx].options = e.target.value.split(',').map(s => s.trim());
                                                                            onUpdateProduct(product.id, 'variants', newVariants);
                                                                        }}
                                                                        className="flex-1 bg-white rounded-md px-2 py-1 text-xs border border-gray-200 focus:ring-1 focus:ring-[#502274]"
                                                                        placeholder="Opciones (sep. por comas)"
                                                                    />
                                                                    <button
                                                                        onClick={() => {
                                                                            const newVariants = product.variants?.filter((_, i) => i !== vIdx);
                                                                            onUpdateProduct(product.id, 'variants', newVariants);
                                                                        }}
                                                                        className="text-gray-400 hover:text-red-500"
                                                                    >
                                                                        <TrashIcon className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            {(!product.variants || product.variants.length === 0) && (
                                                                <div className="text-xs text-gray-400 italic px-1">No hay variantes definidas.</div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Gallery Section */}
                                                    <div className="pt-2 border-t border-gray-100">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Galería de Imágenes</label>
                                                            <button
                                                                onClick={() => openGalleryUpload(product.id)}
                                                                className="text-[10px] font-bold text-[#502274] flex items-center gap-1 hover:underline"
                                                            >
                                                                <PlusIcon className="w-3 h-3" /> Añadir Fotos
                                                            </button>
                                                        </div>

                                                        {product.gallery && product.gallery.length > 0 ? (
                                                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                                                                {product.gallery.map((img, idx) => (
                                                                    <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative group">
                                                                        <img src={img} className="w-full h-full object-cover" />
                                                                        <button
                                                                            onClick={() => removeGalleryImage(product.id, idx)}
                                                                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        >
                                                                            <TrashIcon className="w-4 h-4 text-white" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div onClick={() => openGalleryUpload(product.id)} className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-[#502274]/30 hover:bg-[#502274]/5 transition-colors">
                                                                <span className="text-xs text-gray-400">Sin imágenes extra. Clic para añadir.</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function EyeIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    );
}

function EyeSlashIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
    );
}
