import { Target, Home, Clock } from 'lucide-react';
import type { FinancialInsightsResult } from '../lib/types';

interface FinancialInsightsProps {
    insights: FinancialInsightsResult;
}

export function FinancialInsights({ insights }: FinancialInsightsProps) {
    const { rule503020, mortgage, timeValue } = insights;

    // Regla 50/30/20 evaluador
    const isNeedsOk = rule503020.needsActual <= rule503020.needsTarget * 1.05; // 5% margen
    const isWantsOk = rule503020.wantsActual <= rule503020.wantsTarget * 1.05;
    const isSavingsOk = rule503020.savingsActual >= rule503020.savingsTarget * 0.95;

    const totalCalculated = rule503020.needsActual + rule503020.wantsActual + rule503020.savingsActual;
    const needsPct = (rule503020.needsActual / totalCalculated) * 100 || 0;
    const wantsPct = (rule503020.wantsActual / totalCalculated) * 100 || 0;
    const savingsPct = (rule503020.savingsActual / totalCalculated) * 100 || 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn mt-6">
            {/* 50/30/20 Rule */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                        <Target size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 tracking-tight">Regla 50/30/20</h4>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">Salud Financiera</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <InsightRow
                        label="Necesidades" targetPct={50} actualPct={needsPct} amount={rule503020.needsActual}
                        isOk={isNeedsOk} okColor="text-emerald-500" warnColor="text-rose-500"
                    />
                    <InsightRow
                        label="Deseos" targetPct={30} actualPct={wantsPct} amount={rule503020.wantsActual}
                        isOk={isWantsOk} okColor="text-emerald-500" warnColor="text-rose-500"
                    />
                    <InsightRow
                        label="Ahorro" targetPct={20} actualPct={savingsPct} amount={rule503020.savingsActual}
                        isOk={isSavingsOk} okColor="text-emerald-500" warnColor="text-amber-500" bold
                    />
                </div>
            </div>

            {/* Hipoteca */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                        <Home size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 tracking-tight" title="Basado en la regla de endeudamiento sano: no asumas deudas que superen tu capacidad disponible ni el 35% de tu sueldo. Calculo asume un préstamo a 30 años.">Poder Adquisitivo</h4>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">Calcula tu Hipoteca</p>
                    </div>
                </div>
                <div className="mt-auto pb-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 leading-snug">Capital máximo (100% de la hipoteca) según tu ahorro mensual actual y regla 35% BdE:</p>
                    <p className="text-4xl font-black tracking-tight text-indigo-600 dark:text-indigo-400 mb-3">
                        {mortgage.maxLoanAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                        Cuota segura a 30A: <span className="font-bold text-slate-800 dark:text-slate-200">{mortgage.maxMonthlyPayment.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}/mes</span>
                    </p>
                </div>
            </div>

            {/* Valor Tiempo */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                        <Clock size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 tracking-tight" title="Tu tiempo es finito. Cuánto tiempo trabajas en exclusiva para pagar un lujo.">El Coste de la Vida</h4>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">Tu Tiempo es Dinero</p>
                    </div>
                </div>
                <div className="mt-auto pb-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 leading-snug">Traduciendo gastos puros a horas trabajadas. Tu precio por Hora Neta trabajada es de:</p>
                    <p className="text-4xl font-black tracking-tight text-amber-600 dark:text-amber-400 mb-3">
                        {timeValue.hourlyRate.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}<span className="text-xl">/h</span>
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                        Soportar tus 'Deseos' cuesta <span className="font-bold text-slate-800 dark:text-slate-200">{(rule503020.wantsActual / timeValue.hourlyRate).toFixed(0)} horas puras</span> laborables.
                    </p>
                </div>
            </div>
        </div>
    );
}

function InsightRow({ label, targetPct, actualPct, amount, isOk, okColor, warnColor, bold = false }: { label: string, targetPct: number, actualPct: number, amount: number, isOk: boolean, okColor: string, warnColor: string, bold?: boolean }) {
    return (
        <div className={`flex justify-between items-center text-sm ${bold ? 'font-semibold' : ''}`}>
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${isOk ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                {label}:
            </span>
            <span className={`font-medium ${isOk ? okColor : warnColor} text-right leading-tight`}>
                {amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} <br className="sm:hidden" />
                <span className="opacity-70 text-[11px] ml-1 font-normal bg-slate-100 dark:bg-slate-800 py-0.5 px-1.5 rounded-sm whitespace-nowrap">
                    Tu: {actualPct.toFixed(0)}% <span className="text-slate-400 font-light mx-0.5">|</span> Ref: {targetPct}%
                </span>
            </span>
        </div>
    );
}
