'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-[112vh] bg-[#F3F3F1] flex font-sans overflow-hidden">

            {/* Left Panel - Visual/Bento Style */}
            <div className="hidden lg:flex w-1/2 p-6 flex-col justify-between relative overflow-hidden bg-[#0f172a] text-[#00CAEA] m-4 rounded-[2.5rem]">
                <div className="absolute top-0 right-0 w-full h-full opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#00CAEA 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                <div className="z-10 mt-8 ml-8">
                    <div className="flex items-center gap-3">
                        <img src="/logoLinkMaster.svg" alt="LinkMaster" className="w-12 h-12" />
                        <span className="text-3xl font-black tracking-tighter text-white">LinkMaster</span>
                    </div>
                </div>

                <div className="z-10 flex flex-col items-center justify-center flex-1">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Decorative Phone/Card */}
                        <div className="w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 transform -rotate-6 shadow-2xl">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200)' }}></div>
                                <div>
                                    <div className="h-4 w-24 bg-white/20 rounded mb-2"></div>
                                    <div className="h-3 w-16 bg-white/10 rounded"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-12 w-full bg-[#00CAEA] rounded-xl flex items-center justify-center text-white font-bold">Ver Portfolio</div>
                                <div className="h-12 w-full bg-white/10 rounded-xl"></div>
                                <div className="h-12 w-full bg-white/10 rounded-xl"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="z-10 p-8">
                    <p className="text-2xl font-medium leading-relaxed max-w-md">
                        "LinkMaster transformó mi bio en una tienda online real. Mis conversiones subieron un 200%."
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#00CAEA] flex items-center justify-center text-white font-bold text-xs"><Check size={16} /></div>
                        <span className="font-bold text-white">Sofía, Creadora Digital</span>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
                <Link href="/" className="absolute top-8 left-8 p-3 rounded-full hover:bg-gray-200 transition-colors">
                    <ArrowLeft size={24} className="text-gray-600" />
                </Link>

                <div className="w-full max-w-md space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-5xl font-black tracking-tighter mb-4 text-[#1e2330]">Bienvenido de nuevo</h2>
                        <p className="text-gray-500 text-lg">Ingresa a tu cuenta para gestionar tu LinkMaster.</p>
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


                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email o usuario</label>
                            <input
                                type="email"
                                className="w-full px-6 py-4 bg-white rounded-2xl border-2 border-transparent focus:border-[#00CAEA] focus:ring-0 transition-all outline-none font-medium text-lg placeholder-gray-400"
                                placeholder="hola@ejemplo.com"
                                defaultValue="demo@linkmaster.app"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-gray-700">Contraseña</label>
                                <a href="#" className="text-sm font-medium text-gray-500 hover:text-[#00CAEA]">¿Olvidaste tu contraseña?</a>
                            </div>
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
                            className="w-full bg-[#00CAEA] text-white py-4 rounded-full font-black text-xl hover:bg-[#00b5d1] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 mt-4 shadow-lg shadow-cyan-500/30"
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-gray-500 font-medium">
                            ¿No tienes una cuenta? {' '}
                            <Link href="/register" className="text-[#00CAEA] font-bold hover:underline decoration-2 underline-offset-4">
                                Únete gratis a LinkMaster
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
