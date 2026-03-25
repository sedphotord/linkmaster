'use client';

import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const plans = [
    {
        name: "Gratis",
        price: "$0",
        period: "para siempre",
        description: "Para tu link-in-bio personal",
        features: ["Enlaces ilimitados", "Temas básicos", "Analíticas de clics", "Donaciones"],
        cta: "Comenzar gratis",
        popular: false,
        color: "bg-white",
        textColor: "text-gray-900"
    },
    {
        name: "Pro",
        price: "$9",
        period: "al mes",
        description: "Para creadores y negocios",
        features: ["Todo lo de Gratis", "Temas Premium y Fuentes", "Analíticas detalladas", "Integraciones (Mailchimp, etc)", "Sin logo de LinkMaster"],
        cta: "Prueba Pro gratis",
        popular: true,
        color: "bg-[#502274]",
        textColor: "text-white"
    },
    {
        name: "Business",
        price: "$24",
        period: "al mes",
        description: "Para agencias y marcas",
        features: ["Todo lo de Pro", "Gestión de múltiples links", "Acceso de equipo", "Soporte prioritario", "Exportación de datos"],
        cta: "Contactar Ventas",
        popular: false,
        color: "bg-[#D2E823]",
        textColor: "text-[#254f1a]"
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#F3F3F1] font-sans selection:bg-[#D2E823] selection:text-[#254f1a]">
            <Navbar />

            <main className="pt-32 px-6 md:px-12 max-w-[1400px] mx-auto pb-20">
                <div className="text-center mb-20 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1e2330]">
                        Planes simples y <span className="text-[#502274]">transparentes</span>.
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Empieza gratis y escala a medida que crece tu audiencia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative p-10 rounded-[2.5rem] ${plan.color} ${plan.textColor} ${plan.popular ? 'shadow-2xl scale-105 border-4 border-[#D2E823]' : 'shadow-lg'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#D2E823] text-[#254f1a] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1 shadow-md">
                                    <Star size={12} fill="#254f1a" /> Más Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline mb-4">
                                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                                <span className="ml-2 font-medium opacity-70">/ {plan.period}</span>
                            </div>
                            <p className="font-medium opacity-80 mb-8 pb-8 border-b border-current border-opacity-10">{plan.description}</p>

                            <ul className="space-y-4 mb-10">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 font-medium text-sm">
                                        <Check size={18} strokeWidth={3} className={plan.popular ? "text-[#D2E823]" : "text-[#502274]"} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 ${plan.popular ? 'bg-[#D2E823] text-[#254f1a]' : 'bg-[#1e2330] text-white hover:bg-black'}`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
