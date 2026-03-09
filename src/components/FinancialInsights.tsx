import { PieChart, Home, Clock, Smartphone, Coffee, Layers } from 'lucide-react';
import { useState } from 'react';

export interface FinancialInsightsProps {
    insights: {
        budgetRule: { needs: number; wants: number; savings: number };
        maxMortgage: number;
        hourlyLifeValue: number;
    };
}

export function FinancialInsights({ insights }: FinancialInsightsProps) {
    const [financingPct, setFinancingPct] = useState(80);
    const needs = insights.budgetRule.needs;
    const wants = insights.budgetRule.wants;
    const savings = insights.budgetRule.savings;
    const mortgage = insights.maxMortgage;
    const hourly = insights.hourlyLifeValue;

    // Ejemplos de coste de vida basados en la hora
    const coffeeCost = 35 / hourly; // Cena de 35€
    const phoneCost = 800 / (hourly * 8); // Días de trabajo (8h/día)

    // Matemática Inmobiliaria Interactiva
    const loanAmount = mortgage * 222; // Multiplicador general de hipoteca al 3.5% 30A
    const houseValue = loanAmount / (financingPct / 100);
    const requiredSavings = houseValue - loanAmount + (houseValue * 0.10); // +10% de gastos de C-V aproximados

    return (
        <div className="mt-8 space-y-6 animate-fadeIn">
            <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 flex items-center gap-3">
                <span className="bg-slate-100 dark:bg-slate-800 rounded-full p-2 text-blue-500 shadow-sm">
                    <PieChart size={20} />
                </span>
                Analítica Financiera Zen
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                {/* Rule 50/30/20 Card - Zen Mode con Img */}
                <div className="relative overflow-hidden rounded-[2rem] bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-7 transition-all hover:bg-white/80 dark:hover:bg-slate-900/70 group">
                    <div className="absolute inset-0 opacity-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-opacity duration-700 group-hover:opacity-20">
                        <img src="/assets/zen_living_cost_bg.png" alt="Zen Background" className="w-full h-full object-cover" />
                    </div>

                    <div className="w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 flex items-center justify-center border border-emerald-100 dark:border-emerald-800/30 shadow-sm relative z-10">
                        <PieChart className="text-emerald-600 dark:text-emerald-400" size={24} strokeWidth={1.5} />
                    </div>

                    <h4 className="text-slate-800 dark:text-slate-100 font-semibold text-lg">Regla 50/30/20</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                        Balance ideal sugerido por Harvard para organizar tu sueldo.
                    </p>

                    <div className="mt-6 space-y-4">
                        <div className="group">
                            <div className="flex justify-between text-sm mb-1.5 font-medium">
                                <span className="text-emerald-600 dark:text-emerald-400">Necesidades 50%</span>
                                <span className="text-slate-700 dark:text-slate-200">{needs.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400 dark:bg-emerald-500 w-1/2 rounded-full transition-all group-hover:bg-emerald-500" />
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">Alquiler, comida, luz, transporte.</p>
                        </div>
                        <div className="group">
                            <div className="flex justify-between text-sm mb-1.5 font-medium">
                                <span className="text-cyan-600 dark:text-cyan-400">Caprichos 30%</span>
                                <span className="text-slate-700 dark:text-slate-200">{wants.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-400 dark:bg-cyan-500 w-[30%] rounded-full transition-all group-hover:bg-cyan-500" />
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">Ocio, compras, restaurantes, viajes.</p>
                        </div>
                        <div className="group">
                            <div className="flex justify-between text-sm mb-1.5 font-medium">
                                <span className="text-indigo-600 dark:text-indigo-400">Ahorro 20%</span>
                                <span className="text-slate-700 dark:text-slate-200">{savings.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-400 dark:bg-indigo-500 w-[20%] rounded-full transition-all group-hover:bg-indigo-500" />
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1">Inversión y fondo de emergencia.</p>
                        </div>
                    </div>
                </div>

                {/* Mortgage Capability Card - Zen Mode Interactivo */}
                <div className="relative overflow-hidden rounded-[2rem] bg-indigo-50/40 dark:bg-indigo-900/10 backdrop-blur-xl border border-indigo-100/50 dark:border-indigo-800/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-7 transition-all flex flex-col justify-between group">

                    {/* Floating 3D Icon GenImage */}
                    <div className="absolute -right-6 -top-6 w-40 h-40 opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-transform duration-700 group-hover:scale-110">
                        <img src="/assets/zen_mortgage_3d.png" alt="3D Key" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center border border-blue-200 dark:border-blue-800/30 shadow-sm">
                            <Home className="text-blue-600 dark:text-blue-400" size={24} strokeWidth={1.5} />
                        </div>

                        <h4 className="text-slate-800 dark:text-slate-100 font-semibold text-lg">Poder Adquisitivo Hipotecario</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">
                            Respetando el max 30% del BCE. Te protege dejándote un <span className="text-indigo-500 font-medium">70% libre</span> frente a imprevistos o subidas de tipos.
                        </p>
                    </div>

                    <div className="mt-6 space-y-4 relative z-10">
                        <div className="flex justify-between items-end border-b border-indigo-100 dark:border-indigo-800/40 pb-4">
                            <div>
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Cuota blindada (Max)</p>
                                <span className="text-3xl font-light tracking-tight text-slate-800 dark:text-slate-100">
                                    {mortgage.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} <span className="text-xl text-slate-400">€/mes</span>
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-indigo-500/80 dark:text-indigo-400/80 mb-1 flex items-center gap-1 justify-end"><Layers size={12} /> Financiación</p>
                                <select
                                    className="bg-white dark:bg-slate-800 border-none font-bold text-sm text-indigo-600 dark:text-indigo-400 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-indigo-500/30 p-1"
                                    value={financingPct}
                                    onChange={(e) => setFinancingPct(Number(e.target.value))}
                                >
                                    <option value={70}>70% Banco</option>
                                    <option value={80}>80% Banco</option>
                                    <option value={90}>90% Banco</option>
                                    <option value={100}>100% Banco</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-2 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Valor Casa Posible</p>
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    {houseValue.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Ahorro Requerido</p>
                                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">
                                    {financingPct === 100 ? '~ 10%' : `~${(requiredSavings / houseValue * 100).toFixed(0)}%`}
                                    <span className="text-sm font-medium text-slate-400 ml-1">
                                        ({requiredSavings.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €)
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Time Value Card - Zen Mode */}
                <div className="relative overflow-hidden rounded-[2rem] bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-7 transition-all hover:bg-white/80 dark:hover:bg-slate-900/70 flex flex-col justify-between">
                    <div className="absolute top-10 left-10 w-40 h-40 bg-orange-400/5 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div>
                        <div className="w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center border border-orange-100 dark:border-orange-800/30 shadow-sm">
                            <Clock className="text-orange-500 dark:text-orange-400" size={24} strokeWidth={1.5} />
                        </div>

                        <h4 className="text-slate-800 dark:text-slate-100 font-semibold text-lg">Tu Hora de Vida</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                            Monetiza tu tiempo para tomar decisiones de compra más sensatas.
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div>
                            <span className="text-4xl font-light tracking-tight text-slate-800 dark:text-slate-100">
                                {hourly.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} <span className="text-xl text-orange-500">€/h</span>
                            </span>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Costes reales en tiempo de trabajo:</p>

                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5">
                                <div className="bg-white dark:bg-slate-700 p-1.5 rounded-lg shadow-sm">
                                    <Coffee size={14} className="text-slate-600 dark:text-slate-300" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Cena fuera (35€)</p>
                                    <p className="text-[10px] text-slate-500">{coffeeCost.toFixed(1)} horas de tu vida</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5">
                                <div className="bg-white dark:bg-slate-700 p-1.5 rounded-lg shadow-sm">
                                    <Smartphone size={14} className="text-slate-600 dark:text-slate-300" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium text-slate-700 dark:text-slate-200">Móvil Nuevo (800€)</p>
                                    <p className="text-[10px] text-slate-500">{phoneCost.toFixed(1)} días enteros de trabajo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
