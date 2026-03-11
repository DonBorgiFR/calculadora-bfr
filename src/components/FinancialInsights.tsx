import { PieChart, Home, Clock, Smartphone, Coffee, Layers, Flame, TrendingUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export interface FinancialInsightsProps {
    insights: {
        budgetRule: { needs: number; wants: number; savings: number };
        maxMortgage: number;
        hourlyLifeValue: number;
        investment?: {
            monthlyContribution: number;
            projected10Years: number;
        };
    };
}

// Helper para el acordeón minimialista
function AccordionItem({ id, activeId, setActiveId, title, subtitle, icon: Icon, iconColor, iconBg, bgElement, children }: any) {
    const isActive = activeId === id;
    
    return (
        <div className={`relative rounded-[2rem] border transition-all duration-500 overflow-hidden ${
            isActive
                ? "border-slate-200/50 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/60 shadow-xl backdrop-blur-xl"
                : "border-transparent bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 backdrop-blur-md cursor-pointer shadow-sm group"
        }`}>
            {/* Fondo decorativo (solo visible al expandir o al hacer hover) */}
            <div className={`transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
                {bgElement}
            </div>

            <div 
                className="relative z-20 flex items-center justify-between p-5 sm:p-7 select-none cursor-pointer"
                onClick={() => setActiveId(isActive ? null : id)}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300 ${iconBg} ${isActive ? 'scale-110' : ''}`}>
                        <Icon className={iconColor} size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h4 className="text-slate-800 dark:text-slate-100 font-semibold text-lg">{title}</h4>
                        {!isActive && subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5 pr-4 line-clamp-1">{subtitle}</p>}
                    </div>
                </div>
                <div className={`shrink-0 p-2 rounded-full transition-colors ${isActive ? 'bg-slate-200 dark:bg-slate-800' : 'bg-transparent'}`}>
                    <ChevronDown
                        size={20}
                        className={`text-slate-400 transition-transform duration-500 ${isActive ? "rotate-180" : ""}`}
                    />
                </div>
            </div>
            
            <div className={`relative z-20 grid transition-all duration-500 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                    <div className="px-5 sm:px-7 pb-7 pt-0">
                        {subtitle && <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed border-b border-slate-100 dark:border-slate-800/80 pb-4">{subtitle}</p>}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function FinancialInsights({ insights }: FinancialInsightsProps) {
    const [activeInsight, setActiveInsight] = useState<string | null>('503020'); // Abierto por defecto
    const [financingPct, setFinancingPct] = useState(80);
    const [inflationRate, setInflationRate] = useState(3.5);

    const needs = insights.budgetRule.needs;
    const wants = insights.budgetRule.wants;
    const savings = insights.budgetRule.savings;
    const mortgage = insights.maxMortgage;
    const hourly = insights.hourlyLifeValue;

    // Ejemplos de coste de vida
    const coffeeCost = 35 / hourly;
    const phoneCost = 800 / (hourly * 8);

    // Matemática Inmobiliaria
    const loanAmount = mortgage * 222;
    const houseValue = loanAmount / (financingPct / 100);
    const requiredSavings = houseValue - loanAmount + (houseValue * 0.10);

    // Matemática de Inflación
    const annualSavings = savings * 12;
    const realPurchasingPower = annualSavings / (1 + (inflationRate / 100));
    const annualLoss = annualSavings - realPurchasingPower;
    const monthlyLoss = annualLoss / 12;

    return (
        <div className="mt-8 space-y-6 animate-fadeIn">
            <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 flex items-center gap-3">
                <span className="bg-slate-100 dark:bg-slate-800 rounded-full p-2 text-blue-500 shadow-sm">
                    <PieChart size={20} />
                </span>
                Analítica Financiera Zen
            </h3>

            <div className="flex flex-col gap-4">

                {/* 1. Rule 50/30/20 */}
                <AccordionItem
                    id="503020"
                    activeId={activeInsight}
                    setActiveId={setActiveInsight}
                    title="Regla 50/30/20"
                    subtitle="Balance sugerido por Harvard para organizar tu sueldo y alcanzar la libertad financiera."
                    icon={PieChart}
                    iconColor="text-emerald-600 dark:text-emerald-400"
                    iconBg="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 border-[0.5px] border-emerald-100 dark:border-emerald-800/30"
                    bgElement={
                        <div className="absolute inset-0 opacity-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
                            <img src="/assets/zen_living_cost_bg.png" alt="Zen" className="w-full h-full object-cover" />
                        </div>
                    }
                >
                    <div className="space-y-4">
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
                </AccordionItem>

                {/* 2. Mortgage */}
                <AccordionItem
                    id="mortgage"
                    activeId={activeInsight}
                    setActiveId={setActiveInsight}
                    title="Poder Adquisitivo Hipotecario"
                    subtitle="Cuota calculada según BC para dejarte un 70% libre frente a subidas de tipos."
                    icon={Home}
                    iconColor="text-blue-600 dark:text-blue-400"
                    iconBg="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 border-[0.5px] border-blue-200 dark:border-blue-800/30"
                    bgElement={
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-400/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                    }
                >
                    <div className="space-y-4">
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
                </AccordionItem>

                {/* 3. Time Value */}
                <AccordionItem
                    id="time"
                    activeId={activeInsight}
                    setActiveId={setActiveInsight}
                    title="Tu Hora de Vida"
                    subtitle="Monetiza tu tiempo para tomar decisiones de compra más sensatas y evitar caprichos."
                    icon={Clock}
                    iconColor="text-orange-500 dark:text-orange-400"
                    iconBg="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 border-[0.5px] border-orange-100 dark:border-orange-800/30"
                    bgElement={
                        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-400/5 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                    }
                >
                    <div className="space-y-4">
                        <div>
                            <span className="text-4xl font-light tracking-tight text-slate-800 dark:text-slate-100">
                                {hourly.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} <span className="text-xl text-orange-500">€/h</span>
                            </span>
                        </div>

                        <div className="pt-4  space-y-3">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Costes reales en tiempo de trabajo:</p>

                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5 border border-slate-100 dark:border-slate-800">
                                <div className="bg-white dark:bg-slate-700 p-1.5 rounded-lg shadow-sm">
                                    <Coffee size={14} className="text-slate-600 dark:text-slate-300" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">Cena fuera (35€)</p>
                                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{coffeeCost.toFixed(1)} horas de tu vida</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5 border border-slate-100 dark:border-slate-800">
                                <div className="bg-white dark:bg-slate-700 p-1.5 rounded-lg shadow-sm">
                                    <Smartphone size={14} className="text-slate-600 dark:text-slate-300" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-800 dark:text-slate-200">Móvil Nuevo (800€)</p>
                                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{phoneCost.toFixed(1)} días enteros de trabajo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AccordionItem>

                {/* 4. Inflation */}
                <AccordionItem
                    id="inflation"
                    activeId={activeInsight}
                    setActiveId={setActiveInsight}
                    title="El Ladrón Invisible"
                    subtitle={`Tus ${savings.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}€/mes pierden valor adquisitivo con la inflación si los dejas parados.`}
                    icon={Flame}
                    iconColor="text-rose-500 dark:text-rose-400"
                    iconBg="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/40 dark:to-red-900/40 border-[0.5px] border-rose-200 dark:border-rose-800/30"
                    bgElement={
                        <div className="absolute -left-10 bottom-0 w-40 h-40 bg-rose-400/5 dark:bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                    }
                >
                    <div className="flex justify-end items-start mb-5 relative z-20">
                        <div className="text-right">
                            <p className="text-[10px] uppercase font-bold text-rose-500/70 dark:text-rose-400/70 tracking-wider mb-1">Escenario IPC</p>
                            <select
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-rose-200 dark:border-rose-800 font-bold text-xs text-rose-600 dark:text-rose-400 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-rose-400/50 p-1.5 shadow-sm"
                                value={inflationRate}
                                onChange={(e) => setInflationRate(Number(e.target.value))}
                            >
                                <option value={2.0}>BCE (2.0%)</option>
                                <option value={3.5}>Presión (3.5%)</option>
                                <option value={5.5}>Geopolítica (5.5%)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2 relative z-10">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Pérdida de poder adquisitivo</p>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-light tracking-tight text-rose-600 dark:text-rose-400">
                                    -{monthlyLoss.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} <span className="text-xl">€</span>
                                </span>
                                <span className="text-sm font-medium text-rose-400/70 dark:text-rose-500/70 mb-1">/ mes</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed bg-white/50 dark:bg-slate-900/50 p-3 rounded-xl border border-rose-100/50 dark:border-rose-900/30 shadow-sm">
                                En 1 año, tus ahorros anuales comprarán el equivalente a <strong className="text-lg text-rose-600 dark:text-rose-400 font-bold mx-1">{annualLoss.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}€</strong> menos.
                            </p>
                        </div>
                    </div>
                </AccordionItem>

                {/* 5. Investment */}
                {insights.investment && (
                    <AccordionItem
                        id="investment"
                        activeId={activeInsight}
                        setActiveId={setActiveInsight}
                        title="Proyección de Inversión"
                        subtitle={`Invirtiendo ${insights.investment.monthlyContribution.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}€ al mes al 7% anual (S&P 500) a largo plazo.`}
                        icon={TrendingUp}
                        iconColor="text-emerald-500 dark:text-emerald-400"
                        iconBg="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/40 dark:to-teal-900/40 border-[0.5px] border-emerald-200 dark:border-emerald-800/30"
                        bgElement={
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/5 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                        }
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Ahorro Tradicional (Sin rent.)</p>
                                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                                    {(insights.investment.monthlyContribution * 120).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-emerald-500/80 dark:text-emerald-400/80 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                                    Valor a 10 Años <Flame size={12}/>
                                </p>
                                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                                    {insights.investment.projected10Years.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
                                </p>
                                <p className="text-[10px] text-emerald-500 mt-1 bg-emerald-100/50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full inline-block">
                                    +{ (insights.investment.projected10Years - (insights.investment.monthlyContribution * 120)).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }€ extra
                                </p>
                            </div>
                        </div>
                    </AccordionItem>
                )}

            </div>
        </div>
    );
}
