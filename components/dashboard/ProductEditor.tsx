import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, SparklesIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Product } from '@/lib/types';

interface ProductEditorProps {
  products: Product[];
  catalogActive: boolean;
  onToggleCatalog: (active: boolean) => void;
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
  onOptimizeDescription?: (productId: string) => void;
  loadingProductId?: string | null;
}

export default function ProductEditor({
  products,
  catalogActive,
  onToggleCatalog,
  onAdd,
  onUpdate,
  onDelete,
  onOptimizeDescription: onOptimize,
  loadingProductId: loadingId,
}: ProductEditorProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter text-[#1e2330]">Catalogo</h2>
          <p className="text-gray-500 font-medium">Vende tus productos o servicios</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onAdd} className="bg-[#502274] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#3d1a59] hover:scale-105 transition-all shadow-lg">
            <PlusIcon className="w-5 h-5" strokeWidth={3} /> Agregar
          </button>

          {/* Toggle */}
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
      </div>

      <div className="grid grid-cols-1 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-2xl shrink-0 overflow-hidden relative group border border-gray-200">
                {product.image ? (
                  <img src={product.image} alt="Product" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingBagIcon className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Cambiar</span>
                </div>
              </div>
              <div className="flex-1 w-full space-y-4">
                <div className="flex justify-between gap-4">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => onUpdate(product.id, 'name', e.target.value)}
                    className="font-bold text-xl bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-[#502274] focus:ring-0 p-0 w-full transition-colors"
                    placeholder="Nombre del producto"
                  />
                  <button onClick={() => onDelete(product.id)} className="text-gray-300 hover:text-red-500 transition-colors"><TrashIcon className="w-5 h-5" /></button>
                </div>
                <div className="flex gap-4">
                  <div className="relative w-32">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="text"
                      value={product.price.replace('$', '')}
                      onChange={(e) => onUpdate(product.id, 'price', `$${e.target.value}`)}
                      className="w-full bg-[#F3F3F1] border-transparent text-sm rounded-xl py-3 pl-7 pr-3 font-bold focus:ring-[#502274] focus:border-[#502274]"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="text"
                      value={product.category || ''}
                      onChange={(e) => onUpdate(product.id, 'category', e.target.value)}
                      className="w-full bg-[#F3F3F1] border-transparent text-sm rounded-xl py-3 px-4 font-bold focus:ring-[#502274] focus:border-[#502274]"
                      placeholder="Categoría"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => onUpdate(product.id, 'description', e.target.value)}
                      className="w-full bg-[#F3F3F1] border-transparent text-sm rounded-xl py-3 px-4 focus:ring-[#502274] focus:border-[#502274]"
                      placeholder="Descripcion corta"
                    />
                    {onOptimize && (
                      <button
                        onClick={() => onOptimize(product.id)}
                        disabled={loadingId === product.id}
                        className="absolute right-3 top-2.5 text-[#502274] hover:scale-110 transition-transform p-1 bg-white rounded-md shadow-sm"
                        title="Mejorar con IA"
                      >
                        {loadingId === product.id ? (
                          <span className="animate-spin block h-4 w-4 border-2 border-[#502274] rounded-full border-t-transparent"></span>
                        ) : (
                          <SparklesIcon className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
