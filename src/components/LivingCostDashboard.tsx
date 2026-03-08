import { useState } from 'react';
import { Home, ShoppingBasket, Zap, TrainFront, Coffee, Wallet, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { calculateInsights } from '../lib/salary-engine';
import { FinancialInsights } from './FinancialInsights';

interface LivingCostDashboardProps {
    netMonthly: number;
}

export function LivingCostDashboard({ netMonthly }: LivingCostDashboardProps) {
    // Estado Inicial con Valores Promedio en España (KI)
    const [rent, setRent] = useState(700);
    const [food, setFood] = useState(250);
    const [utilities, setUtilities] = useState(120);
    const [transport, setTransport] = useState(50);
    const [leisure, setLeisure] = useState(150);

    const totalExpenses = rent + food + utilities + transport + leisure;
    const remaining = netMonthly - totalExpenses;
    const isDeficit = remaining < 0;

    // Calculo matemático de progreso (0% a 100% maximo, clamping para Gauge)
    const expensePercentage = Math.min((totalExpenses / netMonthly) * 100, 100) || 0;

    const data = [
        { name: 'Gastos Base', value: totalExpenses, color: isDeficit ? '#f43f5e' : '#f59e0b' },
        { name: 'Ahorro', value: isDeficit ? 0 : remaining, color: '#10b981' }
    ];

    const insights = calculateInsights(netMonthly, { housing: rent, food, utilities, transport, leisure });

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">

            {/* Visualización de Capacidad de Ahorro */}
            <div className={`p-8 rounded-3xl relative overflow-hidden transition-all duration-300 shadow-xl border ${isDeficit ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 animate-shake' : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'}`}>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">

                    {/* Gauge Matemático Minimalista con Recharts */}
                    <div className="relative w-40 h-40 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={75}
                                    startAngle={225}
                                    endAngle={-45}
                                    dataKey="value"
                                    stroke="none"
                                    isAnimationActive={true}
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: any) => Number(value).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Restante</span>
                            <span className={`text-xl font-bold tracking-tight ${isDeficit ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                {expensePercentage.toFixed(0)}%
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2 mb-2">
                            {isDeficit ? <AlertTriangle size={20} className="text-rose-500" /> : <Wallet size={20} className="text-emerald-500" />}
                            {isDeficit ? 'Déficit Mensual' : 'Capacidad de Ahorro Mínima'}
                        </h3>
                        <p className={`text-5xl font-black mb-2 tracking-tighter ${isDeficit ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {remaining.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            De tus {netMonthly.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} netos, asumes {totalExpenses.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} fijos.
                        </p>
                    </div>
                </div>

                {/* Decorative Background Fill Progress */}
                <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 animate-fill"
                    style={{ width: `${expensePercentage}%`, color: isDeficit ? 'var(--color-rose-500)' : 'var(--color-emerald-500)' }}
                />
            </div>

            {/* Formulario de Gastos */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 shadow-xl">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                    Ajusta tu Nivel de Vida
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CostInput label="Vivienda (Alquiler/Hipoteca)" icon={<Home size={16} />} value={rent} setValue={setRent} max={3000} />
                    <CostInput label="Alimentación" icon={<ShoppingBasket size={16} />} value={food} setValue={setFood} max={1000} />
                    <CostInput label="Servicios (Luz, Internet)" icon={<Zap size={16} />} value={utilities} setValue={setUtilities} max={500} />
                    <CostInput label="Transporte" icon={<TrainFront size={16} />} value={transport} setValue={setTransport} max={500} />
                    <CostInput label="Ocio y Ropa" icon={<Coffee size={16} />} value={leisure} setValue={setLeisure} max={1500} />
                </div>
            </div>

            {/* Fase 11: Píldoras de Inteligencia Financiera */}
            <FinancialInsights insights={insights} />

        </div>
    );
}

function CostInput({ label, icon, value, setValue, max }: { label: string, icon: React.ReactNode, value: number, setValue: (val: number) => void, max: number }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="text-slate-400">{icon}</span> {label}
                </label>
                <span className="font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-sm">
                    {value} €
                </span>
            </div>
            <input
                type="range"
                min="0"
                max={max}
                step="10"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
        </div>
    );
}
