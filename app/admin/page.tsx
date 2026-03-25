'use client';

import React, { useMemo } from 'react';
import { useProfiles } from '@/contexts/ProfileContext';
import { Users, UserPlus, CreditCard, Ban, TrendingUp, DollarSign, Activity, Globe, Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

// --- Mock Data Generators ---

const generateGrowthData = () => {
    const data = [];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    let users = 120;
    let revenue = 1500;

    for (const month of months) {
        users += Math.floor(Math.random() * 50) + 10;
        revenue += Math.floor(Math.random() * 800) + 200;
        data.push({
            name: month,
            users,
            revenue,
            active: Math.floor(users * 0.8)
        });
    }
    return data;
};

const generateActivityData = () => {
    return [
        { name: 'Lun', visits: 4000, clicks: 2400 },
        { name: 'Mar', visits: 3000, clicks: 1398 },
        { name: 'Mie', visits: 2000, clicks: 9800 },
        { name: 'Jue', visits: 2780, clicks: 3908 },
        { name: 'Vie', visits: 1890, clicks: 4800 },
        { name: 'Sab', visits: 2390, clicks: 3800 },
        { name: 'Dom', visits: 3490, clicks: 4300 },
    ];
};

const generateRecentActivity = () => {
    const actions = [
        { user: 'alex_design', action: 'Actualizó su perfil', time: 'hace 2 min', type: 'update' },
        { user: 'cafe_central', action: 'Nuevo suscriptor PRO', time: 'hace 15 min', type: 'subscription' },
        { user: 'maria_art', action: 'Creó un nuevo producto', time: 'hace 32 min', type: 'product' },
        { user: 'john_doe', action: 'Se registró', time: 'hace 1 hora', type: 'signup' },
        { user: 'tech_store', action: 'Actualizó catálogo', time: 'hace 2 horas', type: 'update' },
    ];
    return actions;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AdminDashboard() {
    const { profiles } = useProfiles();

    const stats = useMemo(() => {
        const totalUsers = profiles.length; // Real data mixed with mock baseline
        const bannedUsers = profiles.filter(p => p.isBanned).length;
        const proUsers = profiles.filter(p => p.subscriptionPlan === 'pro').length;
        const businessUsers = profiles.filter(p => p.subscriptionPlan === 'business').length;

        // Mock baseline to look "advanced" if few real users
        const mockBaseUsers = 1240;
        const displayTotal = totalUsers > 5 ? totalUsers : totalUsers + mockBaseUsers;

        // Revenue
        const estimatedRevenue = (proUsers * 9) + (businessUsers * 29) + 14500; // Mock base revenue

        return {
            totalUsers: displayTotal,
            bannedUsers,
            proUsers: proUsers + 120, // Mock base
            businessUsers: businessUsers + 45, // Mock base
            estimatedRevenue
        };
    }, [profiles]);

    const growthData = useMemo(() => generateGrowthData(), []);
    const activityData = useMemo(() => generateActivityData(), []);
    const recentActivity = useMemo(() => generateRecentActivity(), []);

    const deviceData = [
        { name: 'Móvil', value: 65 },
        { name: 'Desktop', value: 30 },
        { name: 'Tablet', value: 5 },
    ];

    const planData = [
        { name: 'Free', value: 600 },
        { name: 'Pro', value: stats.proUsers },
        { name: 'Business', value: stats.businessUsers },
    ];

    const statCards = [
        { label: 'Usuarios Totales', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'bg-blue-500', textColor: 'text-blue-500', trend: '+12%' },
        { label: 'Ingresos Mensuales', value: `$${stats.estimatedRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500', textColor: 'text-green-500', trend: '+8.2%' },
        { label: 'Suscripciones Activas', value: stats.proUsers + stats.businessUsers, icon: CreditCard, color: 'bg-purple-500', textColor: 'text-purple-500', trend: '+5.1%' },
        { label: 'Tasa de Actividad', value: '84%', icon: Activity, color: 'bg-orange-500', textColor: 'text-orange-500', trend: '+2.4%' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Panel de Control</h1>
                    <p className="text-gray-500">Visión general del rendimiento de la plataforma.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
                        Exportar Reporte
                    </button>
                    <button className="px-4 py-2 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800">
                        Ver Analytics
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                                    <Icon size={24} className={stat.textColor} />
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                                    <TrendingUp size={12} /> {stat.trend}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Charts Section 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue & Growth */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Crecimiento e Ingresos</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" name="Ingresos ($)" />
                                <Area type="monotone" dataKey="users" stroke="#82ca9d" fillOpacity={1} fill="url(#colorUsers)" name="Usuarios" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Activity Bar Chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Actividad Semanal</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="visits" fill="#000000" radius={[4, 4, 0, 0]} name="Visitas" />
                                <Bar dataKey="clicks" fill="#00CAEA" radius={[4, 4, 0, 0]} name="Clics" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Charts Section 2 & Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Device Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Dispositivos</h3>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deviceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {deviceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Smartphone size={16} className="text-[#0088FE]" /> Móvil
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Monitor size={16} className="text-[#00C49F]" /> Desktop
                        </div>
                    </div>
                </div>

                {/* Plan Distribution */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución de Planes</h3>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={planData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {planData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#94a3b8', '#a855f7', '#000000'][index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-xs font-bold text-gray-500">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-400"></div> Free</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Pro</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-black"></div> Business</span>
                    </div>
                </div>

                {/* Activity Feed and Top Performers */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1 flex flex-col gap-6">
                    {/* Top Performers */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Creadores</h3>
                        <div className="space-y-4">
                            {[
                                { name: 'alex.design', views: '45k', growth: '+12%' },
                                { name: 'cafe.central', views: '32k', growth: '+8%' },
                                { name: 'tech.store', views: '28k', growth: '+15%' },
                            ].map((user, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 text-xs font-bold flex items-center justify-center">
                                            {i + 1}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-gray-900">@{user.name}</span>
                                            <span className="text-xs text-green-500 font-bold">{user.growth}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm text-gray-900">{user.views}</p>
                                        <p className="text-xs text-gray-400">visitas</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Actividad Reciente</h3>
                        <div className="space-y-4">
                            {recentActivity.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                                    ${item.type === 'signup' ? 'bg-blue-100 text-blue-600' :
                                            item.type === 'subscription' ? 'bg-green-100 text-green-600' :
                                                'bg-gray-100 text-gray-600'}`}
                                    >
                                        {item.type === 'signup' ? <UserPlus size={14} /> :
                                            item.type === 'subscription' ? <DollarSign size={14} /> :
                                                <Activity size={14} />}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            <span className="font-bold">@{item.user}</span> {item.action}
                                        </p>
                                        <p className="text-xs text-gray-400">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 text-sm text-center text-gray-500 hover:text-gray-900 font-medium transition-colors">
                            Ver todo el historial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
