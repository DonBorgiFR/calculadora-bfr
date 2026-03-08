import type { CalculationResult } from '../lib/salary-engine';
import { PieChart, TrendingDown, AlignVerticalSpaceAround, Wallet } from 'lucide-react';
import { CompanyCosts } from './CompanyCosts';
import { CostDistributionChart } from './CostDistributionChart';

interface ResultsDashboardProps {
    result: CalculationResult | null;
}

export function ResultsDashboard({ result }: ResultsDashboardProps) {
    if (!result) return (
        <div className="h-full flex items-center justify-center p-8 text-slate-400 dark:text-slate-500">
            Introduce un importe para ver el cálculo al instante.
        </div>
    );

    const irpfPct = result.irpf.percent;
    const ssTotal = result.socialSecurity.total;
    const employerTotal = result.employerCosts.total;
    const ssPct = (ssTotal / result.grossAnnual) * 100;
    const netPct = (result.netAnnual / result.grossAnnual) * 100;

    return (
        <div className="flex flex-col h-full space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                    <PieChart size={24} />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                    Resultados
                </h2>
            </div>

            {/* Main Net Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="relative z-10">
                    <p className="text-emerald-50 font-medium mb-1 flex items-center gap-2">
                        <Wallet size={18} /> Sueldo Neto Mensual
                    </p>
                    <div className="text-5xl font-black tracking-tight mt-2 mb-4">
                        {result.netMonthly.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-3xl font-bold text-emerald-200">€</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-emerald-400/30 pt-4 mt-4">
                        <div>
                            <p className="text-sm text-emerald-100">Neto Anual</p>
                            <p className="text-xl font-semibold">{result.netAnnual.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                        </div>
                        {result.extraPaymentAmount > 0 && (
                            <div className="text-right">
                                <p className="text-sm text-emerald-100">Paga Extra (x2)</p>
                                <p className="text-xl font-semibold">{result.extraPaymentAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            </div>

            {/* Breakdown Bar */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-800/60 shadow-xl">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <AlignVerticalSpaceAround size={16} /> Distribución del Bruto Anual ({result.grossAnnual.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })})
                </h3>

                <div className="h-6 w-full flex rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800/80 mt-2 shadow-inner">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
                        style={{ width: `${netPct}%` }}
                        title={`Neto: ${netPct.toFixed(1)}%`}
                    />
                    <div
                        className="h-full bg-rose-500 transition-all duration-1000 ease-out"
                        style={{ width: `${irpfPct}%` }}
                        title={`IRPF: ${irpfPct.toFixed(1)}%`}
                    />
                    <div
                        className="h-full bg-blue-500 transition-all duration-1000 ease-out"
                        style={{ width: `${ssPct}%` }}
                        title={`Seguridad Social: ${ssPct.toFixed(1)}%`}
                    />
                </div>

                <div className="flex flex-wrap justify-between mt-4 text-xs font-medium space-y-2 sm:space-y-0">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-slate-700 dark:text-slate-300">Neto ({netPct.toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                        <span className="text-slate-700 dark:text-slate-300">IRPF ({irpfPct.toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <span className="text-slate-700 dark:text-slate-300">S.S. ({ssPct.toFixed(1)}%)</span>
                    </div>
                </div>
            </div>

            {/* Deductions Detailed Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1">
                <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/30 dark:to-orange-950/20 border border-rose-100 dark:border-rose-900/30 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-1">
                            <TrendingDown size={16} />
                            <span className="font-semibold text-sm">Retención IRPF</span>
                        </div>
                        <p className="text-xs text-rose-500/80 dark:text-rose-400/70 mt-1">Tipo Efectivo: {result.irpf.percent}%</p>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-4">
                        -{result.irpf.taxAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
                    <div>
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                            <TrendingDown size={16} />
                            <span className="font-semibold text-sm">Seguridad Social</span>
                        </div>
                        <p className="text-xs text-blue-500/80 dark:text-blue-400/70 mt-1">Total anual a cargo del empleado</p>
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mt-4">
                        -{result.socialSecurity.total.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </div>
                </div>
            </div>

            {/* FASE 3: UI 360º (Costes Empresa y Gráfico Donut) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
                <CostDistributionChart
                    netAnnual={result.netAnnual}
                    irpf={result.irpf.taxAmount}
                    employeeSS={ssTotal}
                    employerSS={employerTotal}
                    totalCompanyCost={result.employerCosts.totalCompanyCost}
                />
                <CompanyCosts
                    grossAnnual={result.grossAnnual}
                    employerCosts={result.employerCosts}
                />
            </div>
        </div>
    );
}
