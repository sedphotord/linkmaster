'use client';

import React, { useState, useEffect } from 'react';
import { useAnalytics } from '@/lib/analytics';
import { useProfiles } from '@/contexts/ProfileContext';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';
import {
    EyeIcon,
    CursorArrowRaysIcon,
    ArrowTrendingUpIcon,
    CalendarDaysIcon,
    MapPinIcon
} from '@heroicons/react/24/solid';

export default function AnalyticsDashboard() {
    const { activeProfile } = useProfiles();
    const { getStats, getTotalViews, getTotalClicks } = useAnalytics();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!activeProfile || !mounted) return null;

    const realStats = getStats(activeProfile.id);
    const realTotalViews = getTotalViews(activeProfile.id);
    const realTotalClicks = getTotalClicks(activeProfile.id);

    // --- Mock Data Generator (if no real data) ---
    const useMock = realTotalViews === 0;

    const stats = useMock ? generateMockDailyStats() : realStats;
    const totalViews = useMock ? 12450 : realTotalViews;
    const totalClicks = useMock ? 3840 : realTotalClicks;
    const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0.0';

    // Chart Data
    const chartData = useMock ? generateMockChartData() : stats.slice(-7).map(day => ({
        date: new Date(day.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
        vistas: day.views,
        clics: Object.values(day.clicks).reduce((a, b) => (Number(a) || 0) + (Number(b) || 0), 0)
    }));

    // Mock Extra Data (Top Links, Locations, Devices)
    const topLinks = [
        { name: 'WhatsApp Business', clicks: 1250, percent: 35 },
        { name: 'Catálogo PDF', clicks: 840, percent: 22 },
        { name: 'Instagram', clicks: 620, percent: 16 },
        { name: 'Sitio Web', clicks: 450, percent: 12 },
    ];

    const locations = [
        { name: 'Santo Domingo', value: 65 },
        { name: 'Santiago', value: 20 },
        { name: 'Punta Cana', value: 10 },
        { name: 'Otros', value: 5 },
    ];

    const devices = [
        { name: 'Móvil', value: 85, color: '#3B82F6' },
        { name: 'Escritorio', value: 15, color: '#A855F7' },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        Estadísticas
                        {useMock && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">Modo Demo</span>}
                    </h2>
                    <p className="text-slate-500 font-medium">Rendimiento de tu perfil en tiempo real</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2 text-sm font-bold text-slate-600 self-start md:self-auto">
                    <CalendarDaysIcon className="w-5 h-5 text-slate-400" />
                    Últimos 7 días
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Visitas Totales"
                    value={totalViews.toLocaleString()}
                    icon={EyeIcon}
                    color="text-blue-600"
                    bg="bg-blue-50"
                    trend="+12%"
                />
                <MetricCard
                    title="Clics en Enlaces"
                    value={totalClicks.toLocaleString()}
                    icon={CursorArrowRaysIcon}
                    color="text-purple-600"
                    bg="bg-purple-50"
                    trend="+5%"
                />
                <MetricCard
                    title="CTR (Tasa de Clics)"
                    value={`${ctr}%`}
                    icon={ArrowTrendingUpIcon}
                    color="text-green-600"
                    bg="bg-green-50"
                    trend="+2.4%"
                />
            </div>

            {/* Main Chart */}
            <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-6 bg-slate-800 rounded-full"></span>
                    Tendencia de Visitas
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorVistas" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                                cursor={{ stroke: '#3B82F6', strokeWidth: 2, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="vistas"
                                stroke="#3B82F6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorVistas)"
                                animationDuration={1500}
                                dot={{ fill: '#3B82F6', strokeWidth: 2, stroke: '#fff', r: 4 }}
                                activeDot={{ r: 8, strokeWidth: 0 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Links */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                        Enlaces Más Populares
                    </h3>
                    <div className="space-y-6">
                        {topLinks.map((link, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-slate-700">{link.name}</span>
                                    <span className="text-sm font-bold text-slate-500">{link.clicks} clics</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${link.percent}%` }}
                                        transition={{ duration: 1, delay: 0.2 * i }}
                                        className="h-full bg-purple-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Devices & Locations */}
                <div className="space-y-8">
                    {/* Devices */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                            Dispositivos
                        </h3>
                        <div className="flex items-center justify-around">
                            <div className="w-[150px] h-[150px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={devices}
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {devices.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-3">
                                {devices.map((device, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                                        <span className="font-bold text-slate-600">{device.name}</span>
                                        <span className="font-bold text-slate-800">{device.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2">
                            <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                            Ubicación
                        </h3>
                        <div className="space-y-4">
                            {locations.map((loc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                            <MapPinIcon className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-slate-700">{loc.name}</span>
                                    </div>
                                    <span className="font-black text-slate-800">{loc.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, icon: Icon, color, bg, trend }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                <Icon className={`w-24 h-24 ${color}`} />
            </div>

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <p className="text-slate-500 text-sm font-bold mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">{value}</h3>
                    {trend && <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{trend}</span>}
                </div>
            </div>
        </motion.div>
    );
}

// Helpers for mock data
function generateMockDailyStats() {
    return []; // We handle this in generateMockChartData directly
}

function generateMockChartData() {
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    return days.map(day => ({
        date: day,
        vistas: Math.floor(Math.random() * 2000) + 1000,
        clics: Math.floor(Math.random() * 500) + 200
    }));
}
