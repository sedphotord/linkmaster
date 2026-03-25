'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const templates = [
    { id: 1, name: "Minimalist", category: "Personal", color: "bg-[#F3F3F1]", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Neon Dark", category: "Gamer", color: "bg-black", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Pastel Dream", category: "Artist", color: "bg-[#E9C0E9]", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "Business Pro", category: "Professional", color: "bg-[#2563EB]", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    { id: 5, name: "Eco Green", category: "Nature", color: "bg-[#254f1a]", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400" },
    { id: 6, name: "Vibrant Pop", category: "Music", color: "bg-[#D2E823]", image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400" },
];

export default function TemplatesPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#D2E823] selection:text-[#254f1a]">
            <Navbar />

            <main className="pt-32 px-6 md:px-12 max-w-[1400px] mx-auto pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1e2330]">
                        Plantillas para <span className="text-[#2563EB]">cualquier estilo</span>.
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Empieza con un diseño profesional y personalízalo a tu gusto.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group cursor-pointer"
                        >
                            <div className={`rounded-[2.5rem] overflow-hidden aspect-[9/16] relative shadow-xl ${template.color} border border-gray-100`}>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 z-10">
                                    <button className="bg-white text-black px-6 py-3 rounded-full font-bold transform scale-90 group-hover:scale-100 transition-transform">
                                        Usar esta plantilla
                                    </button>
                                </div>
                                <img src={template.image} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt={template.name} />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-bold text-[#1e2330]">{template.name}</h3>
                                <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">{template.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
