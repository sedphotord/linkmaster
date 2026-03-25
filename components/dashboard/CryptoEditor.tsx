'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Copy, Wallet, Check } from 'lucide-react';
import { CryptoWallet } from '@/lib/types';

interface CryptoEditorProps {
    wallets: CryptoWallet[];
    onUpdate: (wallets: CryptoWallet[]) => void;
}

const COINS = [
    { code: 'BTC', name: 'Bitcoin', color: '#F7931A' },
    { code: 'ETH', name: 'Ethereum', color: '#627EEA' },
    { code: 'SOL', name: 'Solana', color: '#14F195' },
    { code: 'USDT', name: 'Tether (TRC20)', color: '#26A17B' },
];

export default function CryptoEditor({ wallets, onUpdate }: CryptoEditorProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleAddWallet = (currency: 'BTC' | 'ETH' | 'SOL' | 'USDT') => {
        const newWallet: CryptoWallet = {
            id: Date.now().toString(),
            currency,
            address: '',
            active: true
        };
        onUpdate([...wallets, newWallet]);
    };

    const handleUpdateWallet = (id: string, address: string) => {
        const updated = wallets.map(w => w.id === id ? { ...w, address } : w);
        onUpdate(updated);
    };

    const handleDeleteWallet = (id: string) => {
        onUpdate(wallets.filter(w => w.id !== id));
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black tracking-tighter text-[#1e2330]">Crypto Wallets</h2>
                    <p className="text-gray-500 font-medium">Recibe pagos en criptomonedas directamente a tu wallet.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Coin Selector */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {COINS.map(coin => (
                        <button
                            key={coin.code}
                            onClick={() => handleAddWallet(coin.code as any)}
                            className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all"
                        >
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: coin.color }}>
                                {coin.code[0]}
                            </div>
                            <span className="font-bold text-gray-700">{coin.name}</span>
                            <div className="flex items-center gap-1 text-xs text-purple-600 font-bold">
                                <Plus size={12} /> Agregar
                            </div>
                        </button>
                    ))}
                </div>

                {wallets.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <Wallet size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-400 font-medium">No tienes wallets configuradas.</p>
                        <p className="text-gray-400 text-sm">Selecciona una criptomoneda arriba para empezar.</p>
                    </div>
                )}

                <AnimatePresence>
                    {wallets.map(wallet => {
                        const coinInfo = COINS.find(c => c.code === wallet.currency);
                        return (
                            <motion.div
                                key={wallet.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group"
                            >
                                <button
                                    onClick={() => handleDeleteWallet(wallet.id)}
                                    className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors p-2"
                                >
                                    <Trash2 size={20} />
                                </button>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg shrink-0"
                                        style={{ backgroundColor: coinInfo?.color || '#000' }}
                                    >
                                        {wallet.currency}
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-lg">{coinInfo?.name}</h3>
                                            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full font-mono">{wallet.currency}</span>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={wallet.address}
                                                onChange={(e) => handleUpdateWallet(wallet.id, e.target.value)}
                                                placeholder={`Ingresa tu dirección de ${coinInfo?.name}...`}
                                                className="w-full bg-gray-50 text-gray-800 font-mono text-sm py-3 pl-4 pr-12 rounded-xl focus:ring-2 focus:ring-[#502274] focus:outline-none transition-all"
                                            />
                                            {wallet.address && (
                                                <button
                                                    onClick={() => handleCopy(wallet.address, wallet.id)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50"
                                                >
                                                    {copiedId === wallet.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                                </button>
                                            )}
                                        </div>
                                        {wallet.address && (
                                            <p className="text-[10px] text-gray-400 pl-1">
                                                Asegúrate de que esta dirección corresponda a la red correcta ({wallet.currency}).
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
