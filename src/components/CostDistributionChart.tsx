import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

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
}: CostDistributionChartProps) {
    const data = [
        { name: 'Sueldo Neto (Tú)', value: netAnnual, color: '#10b981' }, // emerald-500
        { name: 'IRPF (Estado)', value: irpf, color: '#f43f5e' }, // rose-500
        { name: 'S.S. Trabajador', value: employeeSS, color: '#3b82f6' }, // blue-500
        { name: 'S.S. Empresa', value: employerSS, color: '#6366f1' }, // indigo-500
    ];

    return (
        <div className="backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/60 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transition-all duration-300">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Distribución del Coste Total</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">¿A dónde va el dinero que asume la empresa?</p>
            </div>

            <div className="h-[280px] sm:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="85%"
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={6}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <RechartsTooltip
                            formatter={(value: any) => `${Number(value).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`}
                            contentStyle={{
                                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                backdropFilter: 'blur(8px)'
                            }}
                            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            wrapperStyle={{ fontSize: '12px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
