'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-[112vh] bg-[#F3F3F1] flex font-sans overflow-hidden">

            {/* Visual Side (Right on Desktop) - Dark Theme */}
            <div className="hidden lg:flex w-1/2 p-6 flex-col justify-between relative order-2 overflow-hidden bg-[#0f172a] text-white m-4 rounded-[2.5rem]">
                <div className="absolute top-0 left-0 w-full h-full opacity-10"
                    style={{ backgroundImage: 'linear-gradient(45deg, #00CAEA 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                </div>

                {/* Decorative Blobs */}
                <div className="bg-[#00CAEA] absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"></div>
                <div className="bg-purple-500 absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20"></div>

                <div className="z-10 mt-8 mr-8 text-right">
                    <div className="inline-flex items-center gap-3">
                        <span className="text-3xl font-black tracking-tighter text-white">LinkMaster</span>
                        <img src="/logoLinkMaster.svg" alt="LinkMaster" className="w-12 h-12" />
                    </div>
                </div>

                <div className="z-10 flex flex-col items-center justify-center flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative text-center"
                    >
                        <h3 className="text-6xl font-black tracking-tighter mb-6 leading-none">
                            Tu audiencia <br />
                            <span className="text-[#00CAEA]">te espera.</span>
                        </h3>

                        <div className="flex justify-center gap-4">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col items-center w-32">
                                <Star className="text-[#00CAEA] mb-2" size={32} fill="#00CAEA" />
                                <span className="font-bold text-2xl">4.9/5</span>
                                <span className="text-xs opacity-70">Valoración</span>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex flex-col items-center w-32">
                                <Zap className="text-[#00CAEA] mb-2" size={32} fill="#00CAEA" />
                                <span className="font-bold text-2xl">⚡️</span>
                                <span className="text-xs opacity-70">Setup Rápido</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="z-10 p-8">
                    <div className="flex -space-x-4 mb-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0f172a] bg-gray-300 bg-cover" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${10 + i})` }}></div>
                        ))}
                        <div className="w-12 h-12 rounded-full border-4 border-[#0f172a] bg-[#00CAEA] flex items-center justify-center text-white font-bold text-xs">+50M</div>
                    </div>
                    <p className="font-medium opacity-90">Únete a la comunidad de creadores más grande del mundo.</p>
                </div>
            </div>

            {/* Form Side (Left on Desktop) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative order-1">
                <Link href="/" className="absolute top-8 left-8 p-3 rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={24} className="text-gray-600" />
                </Link>

                <div className="w-full max-w-md space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-5xl font-black tracking-tighter mb-4 text-[#1e2330]">Crea tu cuenta</h2>
                        <p className="text-gray-500 text-lg">Comienza gratis. No requiere tarjeta de crédito.</p>
                    </div>

                    {/* Social Auth Buttons */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-gray-100 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-gray-100 font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all">
                            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="w-5 h-5" alt="Apple" />
                            Apple
                        </button>
                    </div>

                    <div className="relative flex items-center justify-center my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <span className="relative px-4 bg-[#F3F3F1] text-gray-400 text-sm font-bold uppercase tracking-wider">O con email</span>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Nombre de usuario</label>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">linkmaster.app/</span>
                                <input
                                    type="text"
                                    className="w-full pl-40 pr-6 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-[#00CAEA] focus:ring-0 transition-all outline-none font-medium text-lg placeholder-gray-400"
                                    placeholder="tu-nombre"
                                    defaultValue="sofia-creadora"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-[#00CAEA] focus:ring-0 transition-all outline-none font-medium text-lg placeholder-gray-400"
                                defaultValue="sofia@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-[#00CAEA] focus:ring-0 transition-all outline-none font-medium text-lg placeholder-gray-400"
                                    defaultValue="password123"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#00CAEA] text-white py-4 rounded-full font-black text-xl hover:bg-[#00b5d1] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 mt-6 shadow-lg shadow-cyan-500/30"
                        >
                            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-gray-500 font-medium">
                            ¿Ya tienes una cuenta? {' '}
                            <Link href="/login" className="text-[#00CAEA] font-bold hover:underline decoration-2 underline-offset-4">
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
