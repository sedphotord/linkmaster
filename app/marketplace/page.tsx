'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Twitter, ShoppingCart, Music, Video, Mail, BarChart2 } from 'lucide-react';

const integrations = [
    { id: 1, name: "Instagram Feed", category: "Social", icon: Instagram, color: "text-pink-600", bg: "bg-pink-100" },
    { id: 2, name: "YouTube Video", category: "Social", icon: Youtube, color: "text-red-600", bg: "bg-red-100" },
    { id: 3, name: "Shopify Store", category: "Commerce", icon: ShoppingCart, color: "text-green-600", bg: "bg-green-100" },
    { id: 4, name: "Spotify Player", category: "Music", icon: Music, color: "text-green-500", bg: "bg-green-50" },
    { id: 5, name: "Twitch Stream", category: "Video", icon: Video, color: "text-purple-600", bg: "bg-purple-100" },
    { id: 6, name: "Mailchimp", category: "Marketing", icon: Mail, color: "text-yellow-600", bg: "bg-yellow-100" },
    { id: 7, name: "Twitter Tweets", category: "Social", icon: Twitter, color: "text-blue-400", bg: "bg-blue-100" },
    { id: 8, name: "Google Analytics", category: "Analytics", icon: BarChart2, color: "text-orange-600", bg: "bg-orange-100" },
];

export default function MarketplacePage() {
    return (
        <div className="min-h-screen bg-[#F3F3F1] font-sans selection:bg-[#D2E823] selection:text-[#254f1a]">
            <Navbar />

            <main className="pt-32 px-6 md:px-12 max-w-[1400px] mx-auto pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16 space-y-6"
                >
                    <span className="bg-[#D2E823] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-[#254f1a]">Integraciones</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1e2330]">
                        Conecta tus apps favoritas.
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Amplía el poder de tu LinkMaster con cientos de integraciones en un solo clic.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {integrations.map((app, index) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-gray-200"
                        >
                            <div className={`w-16 h-16 rounded-2xl ${app.bg} ${app.color} flex items-center justify-center mb-6`}>
                                <app.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1e2330] mb-2">{app.name}</h3>
                            <p className="text-gray-400 font-medium">{app.category}</p>
                            <button className="mt-6 w-full py-3 rounded-xl border-2 border-gray-100 font-bold text-gray-600 hover:border-[#1e2330] hover:text-[#1e2330] transition-colors">
                                Instalar
                            </button>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
