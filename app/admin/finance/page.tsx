'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Tag, Plus, Edit, Trash2, CheckCircle, Percent, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { storage } from '@/lib/storage';
import { SystemSettings, Plan, Coupon } from '@/lib/types';

export default function AdminFinancePage() {
    const [activeTab, setActiveTab] = useState<'plans' | 'coupons'>('plans');
    const [settings, setSettings] = useState<SystemSettings>(storage.getSystemSettings());
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setSettings(storage.getSystemSettings());
    }, []);

    const saveSettings = (newSettings: SystemSettings) => {
        setIsSaving(true);
        storage.saveSystemSettings(newSettings);
        setSettings(newSettings);
        setTimeout(() => setIsSaving(false), 500);
    };

    // --- Plan Handlers ---
    const togglePlanStatus = (id: number) => {
        if (!settings.plans) return;
        const updatedPlans = settings.plans.map(p =>
            p.id === id ? { ...p, active: !p.active } : p
        );
        saveSettings({ ...settings, plans: updatedPlans });
    };

    const deletePlan = (id: number) => {
        if (!confirm('¿Estás seguro de eliminar este plan?')) return;
        if (!settings.plans) return;
        const updatedPlans = settings.plans.filter(p => p.id !== id);
        saveSettings({ ...settings, plans: updatedPlans });
    };

    const addPlan = () => {
        const name = prompt('Nombre del Plan:');
        if (!name) return;
        const price = Number(prompt('Precio ($):', '10'));
        const newPlan: Plan = {
            id: Date.now(),
            name,
            price,
            interval: 'month',
            features: ['Nuevas funcionalidades'],
            active: true
        };
        saveSettings({ ...settings, plans: [...(settings.plans || []), newPlan] });
    };

    // --- Coupon Handlers ---
    const deleteCoupon = (id: number) => {
        if (!confirm('¿Eliminar cupón?')) return;
        if (!settings.coupons) return;
        const updatedCoupons = settings.coupons.filter(c => c.id !== id);
        saveSettings({ ...settings, coupons: updatedCoupons });
    };

    const addCoupon = () => {
        const code = prompt('Código del Cupón:');
        if (!code) return;
        const discount = prompt('Descuento (ej: 20%):', '20%');
        const newCoupon: Coupon = {
            id: Date.now(),
            code: code.toUpperCase(),
            discount: discount || '0%',
            uses: 0,
            maxUses: 100,
            expiry: '2024-12-31',
            status: 'active'
        };
        saveSettings({ ...settings, coupons: [...(settings.coupons || []), newCoupon] });
    };

    const plans = settings.plans || [];
    const coupons = settings.coupons || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Finanzas y Planes</h1>
                    <p className="text-gray-500">Configura los niveles de suscripción y promociones.</p>
                </div>
                <button
                    onClick={activeTab === 'plans' ? addPlan : addCoupon}
                    className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                    <Plus size={18} />
                    {activeTab === 'plans' ? 'Nuevo Plan' : 'Crear Cupón'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
                <button
                    onClick={() => setActiveTab('plans')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'plans' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <div className="flex items-center gap-2"><CreditCard size={16} /> Planes</div>
                </button>
                <button
                    onClick={() => setActiveTab('coupons')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'coupons' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    <div className="flex items-center gap-2"><Tag size={16} /> Cupones</div>
                </button>
            </div>

            <div className="grid gap-6">
                {activeTab === 'plans' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <motion.div
                                key={plan.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => deletePlan(plan.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={16} /></button>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-xl font-black text-gray-900">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mt-1">
                                        <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                                        <span className="text-sm text-gray-500">/{plan.interval}</span>
                                    </div>
                                </div>
                                <div className="space-y-3 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle size={14} className="text-green-500 shrink-0" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                    <button
                                        onClick={() => togglePlanStatus(plan.id)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${plan.active ? 'bg-green-100 text-green-600 hover:bg-red-100 hover:text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-600'}`}
                                    >
                                        {plan.active ? 'Activo' : 'Archivado'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === 'coupons' && coupons.map((coupon) => (
                    <motion.div
                        key={coupon.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-pink-100 text-pink-600 rounded-xl">
                                <Percent size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 font-mono tracking-wider">{coupon.code}</h3>
                                <p className="text-sm text-gray-500">{coupon.discount} Descuento • Expira: {coupon.expiry}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">{coupon.uses} / {coupon.maxUses}</p>
                                <p className="text-xs text-gray-400">Usos</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${coupon.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                }`}>
                                {coupon.status === 'active' ? 'Activo' : 'Expirado'}
                            </span>
                            <button
                                onClick={() => deleteCoupon(coupon.id)}
                                className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
