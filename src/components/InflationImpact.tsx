import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, ShieldAlert, Crosshair } from 'lucide-react';

interface InflationImpactProps {
    netMonthly: number;
    fixedExpenses: number;
}

export function InflationImpact({ netMonthly, fixedExpenses }: InflationImpactProps) {
    const [inflationRate, setInflationRate] = useState<number>(3.5); // Default moderate
    const [salaryIncrease, setSalaryIncrease] = useState<number>(2.0); // Default subida

    const generateDataOptionB = () => {
        const data = [];
        let nominalSalary = netMonthly; // Fijo (congelado)
        let costOfLiving = fixedExpenses; // Sube con inflación

        for (let year = 0; year <= 5; year++) {
            data.push({
                year: year === 0 ? 'Hoy' : `Año ${year}`,
                'Sueldo (Nominal)': Number(nominalSalary.toFixed(2)),
                'Gastos Fijos': Number(costOfLiving.toFixed(2)),
                'Capacidad Ahorro': Math.max(0, nominalSalary - costOfLiving)
            });
            if (year < 5) {
                nominalSalary = nominalSalary * (1 + (salaryIncrease / 100));
                costOfLiving = costOfLiving * (1 + (inflationRate / 100));
            }
        }
        return data;
    }

    const data = generateDataOptionB();
    const currentSavings = data[0]['Capacidad Ahorro'];
    const futureSavings = data[5]['Capacidad Ahorro'];

    return (
        <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl mt-8 animate-fadeIn text-slate-50 relative">
            {/* Background Image / Texture */}
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
                <img src="/assets/inflation_3d.png" alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                    <TrendingDown className="text-rose-500" size={28} />
                    <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-600 tracking-tight">
                        Erosión Inflacionaria
                    </h3>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                    <div className="md:col-span-4 space-y-6">
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">
                            Simula cómo la inflación y tu subida de sueldo compiten a 5 años, impactando directamente en tu capacidad de ahorro mensual.
                        </p>

                        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-5">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-300">IPC Estimado Anual</label>
                                <span className="font-black text-rose-500 text-lg">{inflationRate.toFixed(1)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.5"
                                value={inflationRate}
                                onChange={(e) => setInflationRate(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                            />

                            <div className="flex justify-between mt-3 text-xs text-slate-500 font-medium px-1">
                                <button onClick={() => setInflationRate(2)} className="hover:text-emerald-400 transition-colors">Óptimo (2%)</button>
                                <button onClick={() => setInflationRate(3.5)} className="hover:text-amber-400 transition-colors">Actual (3.5%)</button>
                                <button onClick={() => setInflationRate(7)} className="hover:text-rose-400 transition-colors">Crisis (7%)</button>
                            </div>

                            <div className="h-px w-full bg-slate-800 mb-6"></div>

                            <div className="flex justify-between items-center mb-4">
                                <label className="text-sm font-semibold text-slate-300">Subida Salarial Anual</label>
                                <span className="font-black text-emerald-500 text-lg">{salaryIncrease.toFixed(1)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="0.5"
                                value={salaryIncrease}
                                onChange={(e) => setSalaryIncrease(Number(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>

                        <div className={`p-5 rounded-2xl border ${futureSavings <= 0 ? 'bg-rose-950/40 border-rose-900/50' : 'bg-slate-900/50 border-slate-800'}`}>
                            <div className="flex items-start gap-3">
                                {futureSavings <= 0 ? <ShieldAlert className="text-rose-500 shrink-0" size={20} /> : <Crosshair className="text-amber-500 shrink-0" size={20} />}
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-200 mb-1">Impacto a 5 años</h4>
                                    {futureSavings <= 0 ? (
                                        <p className="text-xs text-slate-400">Tus gastos se comen tu sueldo. Entrarás en déficit de <span className="text-rose-400 font-bold">{Math.abs(futureSavings).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span> mensual.</p>
                                    ) : futureSavings > currentSavings ? (
                                        <p className="text-xs text-slate-400">Tu sueldo vence a la inflación. Tu ahorro subirá a <span className="text-emerald-400 font-bold">{futureSavings.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span> mensual.</p>
                                    ) : (
                                        <p className="text-xs text-slate-400">La inflación gana. Tu ahorro mensual caerá de <strong>{currentSavings.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</strong> a <span className="text-rose-400 font-bold">{futureSavings.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-8 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-5 h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorAhorro" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="year" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: 'rgba(2, 6, 23, 0.8)', borderColor: '#1e293b', borderRadius: '12px' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={(value: any) => Number(value).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                                />
                                <Area type="monotone" dataKey="Sueldo (Nominal)" stroke="#475569" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                                <Area type="monotone" dataKey="Gastos Fijos" stroke="#f43f5e" fillOpacity={1} fill="url(#colorGastos)" strokeWidth={2} />
                                <Area type="monotone" dataKey="Capacidad Ahorro" stroke="#10b981" fillOpacity={1} fill="url(#colorAhorro)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
