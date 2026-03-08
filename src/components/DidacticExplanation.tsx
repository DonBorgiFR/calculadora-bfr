import { useState } from 'react';
import { Landmark, Briefcase, Handshake, ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CalculationResult } from '../lib/salary-engine';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DidacticExplanationProps {
    result: CalculationResult | null;
}

export function DidacticExplanation({ result }: DidacticExplanationProps) {
    const [activeStep, setActiveStep] = useState<number | null>(1);

    const formatEuro = (val: number) => val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

    const STEPS = [
        {
            id: 1,
            title: 'Pagas a Hacienda (IRPF)',
            icon: Landmark,
            color: 'text-rose-500 dark:text-rose-400',
            bg: 'bg-rose-100 dark:bg-rose-500/20',
            description: result
                ? `De tus ${formatEuro(result.grossAnnual)} iniciales, el Estado y tu Comunidad Autónoma retienen ${formatEuro(result.irpf.taxAmount)}, lo que representa un esfuerzo fiscal directo del ${result.irpf.percent}%. Este porcentaje es progresivo e incrementa por tramos.`
                : 'Es el impuesto sobre la renta. Se calcula progresivamente por tramos, dependiendo de tus ingresos, situación familiar y tu comunidad autónoma. Financia los servicios públicos generales.'
        },
        {
            id: 2,
            title: 'Cotizas para tu Futuro (S.S. Empleado)',
            icon: Handshake,
            color: 'text-blue-500 dark:text-blue-400',
            bg: 'bg-blue-100 dark:bg-blue-500/20',
            description: result
                ? `Se descuentan ${formatEuro(result.socialSecurity.total)} (un ${((result.socialSecurity.total / result.grossAnnual) * 100).toFixed(1)}%) para tu jubilación, sanidad y prestaciones. Descontando esto y el IRPF, tu sueldo neto final para gastar se queda en ${formatEuro(result.netAnnual)} limpios.`
                : 'La parte de Seguridad Social que te descuentan a ti. Se usa para pagar pensiones, sanidad pública y tu futura prestación por desempleo si la necesitases.'
        },
        {
            id: 3,
            title: 'Tu Empresa Asume (S.S. Empresa)',
            icon: Briefcase,
            color: 'text-indigo-500 dark:text-indigo-400',
            bg: 'bg-indigo-100 dark:bg-indigo-500/20',
            description: result
                ? `Pero la historia no acaba aquí. Para poder pagarte ese sueldo bruto, tu empresa debe abonar un "impuesto oculto" de ${formatEuro(result.employerCosts.total)} adicionales (más de un 30% extra) a la Seguridad Social. El "Coste Real" de tu contratación asciende a la friolera de ${formatEuro(result.employerCosts.totalCompanyCost)} anuales.`
                : 'La gran mayoría de la cuota a la Seguridad Social (más de un 30% adicional a tu sueldo bruto) la paga la empresa por ti. Esto es lo que forma tu Coste Real de Empresa.'
        }
    ];

    return (
        <div className="backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 lg:p-8 shadow-2xl transition-all duration-300 h-full">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">¿Cómo funciona tu nómina?</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Explicación paso a paso libre de jerga legal</p>
            </div>

            <div className="space-y-4">
                {STEPS.map((step) => {
                    const isActive = activeStep === step.id;
                    const Icon = step.icon;

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer",
                                isActive
                                    ? "border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 shadow-md"
                                    : "border-transparent bg-white/30 dark:bg-slate-800/30 hover:bg-white/50 dark:hover:bg-slate-800/50"
                            )}
                            onClick={() => setActiveStep(isActive ? null : step.id)}
                        >
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-xl transition-colors", isActive ? step.bg : "bg-slate-100 dark:bg-slate-800")}>
                                        <Icon size={20} className={isActive ? step.color : "text-slate-500 dark:text-slate-400"} />
                                    </div>
                                    <h3 className={cn("font-bold transition-colors", isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>
                                        {step.id}. {step.title}
                                    </h3>
                                </div>
                                <ChevronDown
                                    size={20}
                                    className={cn("text-slate-400 transition-transform duration-300", isActive && "rotate-180")}
                                />
                            </div>

                            <div
                                className={cn(
                                    "grid transition-all duration-300 ease-in-out",
                                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-4 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed ml-12">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
