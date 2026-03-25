'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { UserProfile, MenuItem, MenuCategory } from '@/lib/types';
import { getProfileByUsername } from '@/lib/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Minus, Plus, Search, ChevronLeft, Store } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';

export default function KioskPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const username = params?.username as string;
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { trackView } = useAnalytics();

    // Kiosk specific state
    const [tableNumber, setTableNumber] = useState<string>('');
    const [showTableModal, setShowTableModal] = useState(true);
    const [cart, setCart] = useState<{ item: MenuItem; quantity: number; notes?: string }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (username) {
            const stored = getProfileByUsername(username);
            if (stored) {
                setProfile(stored);
                trackView(stored.id);
                // Pre-select first category
                if (stored.menu?.categories.length > 0) {
                    setSelectedCategory(stored.menu.categories[0].id);
                }
            }
            setLoading(false);
        }
    }, [username]);

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.item.id === item.id);
            if (existing) {
                return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { item, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId: string) => {
        setCart(prev => prev.filter(i => i.item.id !== itemId));
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setCart(prev => prev.map(i => {
            if (i.item.id === itemId) {
                const newQty = Math.max(0, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }).filter(i => i.quantity > 0));
    };

    const handleCheckout = () => {
        if (!profile || !profile.businessInfo.phone) return;

        const total = cart.reduce((acc, curr) => acc + (curr.item.price || 0) * curr.quantity, 0);
        let message = `Hola, quiero hacer un pedido para la *Mesa ${tableNumber}*:\n\n`;

        cart.forEach(line => {
            message += `• ${line.quantity}x ${line.item.name} - $${((line.item.price || 0) * line.quantity).toFixed(2)}\n`;
        });

        message += `\n*Total: $${total.toFixed(2)}*`;

        const url = `https://wa.me/${profile.businessInfo.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
    if (!profile || !profile.menu?.active) return <div className="min-h-screen flex items-center justify-center">Menú no disponible</div>;

    const filteredItems = profile.menu.items.filter(item => {
        const matchesCategory = selectedCategory ? item.categoryId === selectedCategory : true;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch && item.available;
    });

    const activeCategories = profile.menu.categories.filter(c => c.active);

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            {/* Sticky Header */}
            <div className="sticky top-0 z-30 bg-white shadow-sm px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        {profile.avatar && <img src={profile.avatar} className="w-8 h-8 rounded-full" />}
                        <h1 className="font-bold text-lg leading-none">{profile.menu.businessName || profile.name}</h1>
                    </div>
                    <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold">
                        Mesa {tableNumber || '?'}
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {activeCategories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === cat.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar en el menú..."
                        className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-black"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {filteredItems.map(item => (
                        <div key={item.id} onClick={() => addToCart(item)} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform">
                            {item.image && (
                                <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden">
                                    <img src={item.image} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-sm leading-tight text-gray-900 line-clamp-2">{item.name}</h3>
                                <p className="text-xs font-bold text-gray-500 mt-1">${(Number(item.price) || 0).toFixed(2)}</p>
                            </div>
                            <button className="mt-auto w-full bg-black/5 hover:bg-black/10 text-black text-xs font-bold py-2 rounded-lg">
                                Agregar
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Cart Button */}
            <AnimatePresence>
                {cart.length > 0 && (
                    <motion.div
                        initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
                        className="fixed bottom-4 left-4 right-4 z-40"
                    >
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="w-full bg-black text-white p-4 rounded-2xl shadow-xl flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                                    {cart.reduce((a, b) => a + b.quantity, 0)}
                                </div>
                                <div className="text-left">
                                    <p className="text-xs opacity-70">Total pedido</p>
                                    <p className="font-bold text-lg">${cart.reduce((a, b) => a + (Number(b.item.price) || 0) * b.quantity, 0).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-bold">
                                Ver Carrito <ShoppingCart size={18} />
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table Selector Modal */}
            <AnimatePresence>
                {!tableNumber && showTableModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
                        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-white w-full max-w-sm rounded-[2rem] p-8 text-center shadow-2xl">
                            <Store className="w-12 h-12 mx-auto mb-4 text-black" />
                            <h2 className="text-2xl font-black text-gray-900 mb-2">¡Bienvenido!</h2>
                            <p className="text-gray-500 mb-6">Para empezar, por favor indícanos tu número de mesa.</p>

                            <div className="grid grid-cols-4 gap-3 mb-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                    <button
                                        key={num}
                                        onClick={() => setTableNumber(num.toString())}
                                        className="aspect-square rounded-xl bg-gray-50 hover:bg-black hover:text-white font-bold text-lg transition-colors border-2 border-transparent hover:border-black"
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <input
                                    type="text"
                                    placeholder="Otro #"
                                    className="w-20 text-center font-bold border-b-2 border-gray-200 focus:border-black outline-none p-2"
                                    onChange={e => setTableNumber(e.target.value)}
                                />
                                <button
                                    onClick={() => tableNumber && setShowTableModal(false)}
                                    className="bg-black text-white px-6 py-2 rounded-xl font-bold disabled:opacity-50"
                                    disabled={!tableNumber}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
                            onClick={() => setIsCartOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            className="bg-white w-full max-w-md h-[85vh] rounded-t-[2.5rem] shadow-2xl pointer-events-auto flex flex-col p-6 absolute bottom-0"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-black">Tu Pedido</h2>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-4">
                                {cart.map(line => (
                                    <div key={line.item.id} className="flex gap-4 items-center">
                                        {line.item.image && <img src={line.item.image} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm">{line.item.name}</h4>
                                            <p className="text-xs text-gray-500">${(Number(line.item.price) || 0).toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
                                            <button onClick={() => updateQuantity(line.item.id, -1)} className="p-2 bg-white rounded-lg shadow-sm"><Minus size={14} /></button>
                                            <span className="font-bold text-sm w-4 text-center">{line.quantity}</span>
                                            <button onClick={() => updateQuantity(line.item.id, 1)} className="p-2 bg-white rounded-lg shadow-sm"><Plus size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 border-t pt-4">
                                <div className="flex justify-between mb-4 text-lg font-black">
                                    <span>Total</span>
                                    <span>${cart.reduce((a, b) => a + (Number(b.item.price) || 0) * b.quantity, 0).toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 transition-all"
                                >
                                    Enviar pedido por WhatsApp
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
