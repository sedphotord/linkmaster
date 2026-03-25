'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown, Wallet } from 'lucide-react';
import { CryptoWallet } from '@/lib/types';

interface CryptoBlockProps {
    wallets: CryptoWallet[];
    themeConfig: any;
}

const COINS = [
    { code: 'BTC', name: 'Bitcoin', color: '#F7931A' },
    { code: 'ETH', name: 'Ethereum', color: '#627EEA' },
    { code: 'SOL', name: 'Solana', color: '#14F195' },
    { code: 'USDT', name: 'Tether', color: '#26A17B' },
];

export default function CryptoBlock({ wallets, themeConfig }: CryptoBlockProps) {
    const [openWalletId, setOpenWalletId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const activeWallets = wallets.filter(w => w.active);

    if (activeWallets.length === 0) return null;

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const toggleWallet = (id: string) => {
        setOpenWalletId(prev => prev === id ? null : id);
    };

    return (
        <div className="space-y-3 w-full max-w-md mx-auto">
            <h3 className={`text-center text-xs font-bold uppercase tracking-widest opacity-60 mb-2 ${themeConfig.text}`}>
                Crypto Wallets
            </h3>

            {activeWallets.map(wallet => {
                const coinInfo = COINS.find(c => c.code === wallet.currency);
                const isOpen = openWalletId === wallet.id;

                return (
                    <motion.div
                        key={wallet.id}
                        layout
                        onClick={() => toggleWallet(wallet.id)}
                        className={`
                            relative overflow-hidden cursor-pointer
                            bg-white/10 backdrop-blur-md border border-white/20 shadow-sm
                            hover:bg-white/15 transition-colors rounded-2xl
                        `}
                    >
                        {/* Header */}
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm"
                                    style={{ backgroundColor: coinInfo?.color || '#333' }}
                                >
                                    {wallet.currency[0]}
                                </div>
                                <div className="text-left">
                                    <h4 className={`font-bold text-sm ${themeConfig.text}`}>{coinInfo?.name}</h4>
                                    <p className={`text-[10px] opacity-70 ${themeConfig.text}`}>{wallet.currency}</p>
                                </div>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${themeConfig.text}`}
                            />
                        </div>

                        {/* Expanded Content */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-white/10 bg-black/5"
                                >
                                    <div className="p-4 flex flex-col items-center gap-4">
                                        {/* QR Code */}
                                        <div className="bg-white p-2 rounded-xl shadow-sm">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${wallet.address}&bgcolor=ffffff&color=000000`}
                                                alt={`${wallet.currency} QR`}
                                                className="w-32 h-32"
                                            />
                                        </div>

                                        {/* Address & Copy */}
                                        <div className="w-full">
                                            <p className={`text-[10px] text-center mb-1 opacity-60 uppercase tracking-wider ${themeConfig.text}`}>Dirección de Depósito</p>
                                            <div
                                                className="flex items-center gap-2 bg-black/10 rounded-xl p-2 pl-3 group/copy hover:bg-black/20 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleCopy(wallet.address, wallet.id);
                                                }}
                                            >
                                                <p className="flex-1 font-mono text-xs truncate opacity-80 select-all">
                                                    {wallet.address}
                                                </p>
                                                <button className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-black transition-colors">
                                                    {copiedId === wallet.id ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
