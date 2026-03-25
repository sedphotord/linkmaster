'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

const creators = [
    { id: 1, name: "Selena", category: "Music", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "TechDaily", category: "Tech", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Chef Mike", category: "Food", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "YogaWithMe", category: "Wellness", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
    { id: 5, name: "Indie Band", category: "Music", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400" },
    { id: 6, name: "HBO Max", category: "Entertainment", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    // ... more
    { id: 7, name: "Art Gallery", category: "Art", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400" },
    { id: 8, name: "Podcast Pro", category: "Media", image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=400" },
];

export default function DiscoverPage() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-[#D2E823] selection:text-[#254f1a]">
            <Navbar />

            <main className="pt-32 px-6 md:px-12 max-w-[1400px] mx-auto pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20 space-y-4"
                >
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-[#1e2330]">
                        Inspiración <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">ilimitada</span>.
                    </h1>
                    <p className="text-xl text-gray-400 font-medium tracking-wide uppercase">
                        Descubre a los creadores más influyentes
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {creators.map((creator, index) => (
                        <motion.div
                            key={creator.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer bg-gray-100"
                        >
                            <img src={creator.image} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={creator.name} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-2 inline-block border border-white/30">{creator.category}</span>
                                <h3 className="text-2xl font-black">{creator.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
