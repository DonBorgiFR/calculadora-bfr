import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

interface CostDistributionChartProps {
    netAnnual: number;
    irpf: number;
    employeeSS: number;
    employerSS: number;
    totalCompanyCost: number;
}

export function CostDistributionChart({
    netAnnual,
    irpf,
    employeeSS,
    employerSS,
    totalCompanyCost,
}: CostDistributionChartProps) {
    const data = [
        { name: 'Sueldo Neto (Tú)', value: netAnnual, color: '#10b981' }, // emerald-500
        { name: 'IRPF (Estado)', value: irpf, color: '#f43f5e' }, // rose-500
        { name: 'S.S. Trabajador', value: employeeSS, color: '#3b82f6' }, // blue-500
        { name: 'S.S. Empresa', value: employerSS, color: '#6366f1' }, // indigo-500
    ];

    return (
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <PieChartIcon size={20} className="text-slate-500" />
                        Distribución del Coste Total
                    </h2>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 ml-1">
                        ¿A dónde va el dinero que asume la empresa?
                    </p>
                </div>
                <div className="text-right bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700/50 self-start sm:self-auto shadow-sm">
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-0.5">COSTE TOTAL O.S.</p>
                    <p className="text-lg font-black text-slate-800 dark:text-slate-200 leading-none">
                        {totalCompanyCost.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €
                    </p>
                </div>
            </div>

            <div className="h-[280px] sm:h-[350px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="85%"
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={4}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <RechartsTooltip
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={(value: any) => `${Number(value).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} €`}
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                backdropFilter: 'blur(8px)',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            wrapperStyle={{ fontSize: '12px', fontWeight: '500', paddingTop: '20px' }}
                            iconType="circle"
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Texto Central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Neto Final</span>
                    <span className="text-3xl font-light text-slate-800 dark:text-slate-100 tracking-tighter">
                        {Math.round((netAnnual / totalCompanyCost) * 100)}<span className="text-xl">%</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
