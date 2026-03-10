import { Building2, Plus } from 'lucide-react';

interface CompanyCostsProps {
    grossAnnual: number;
    employerCosts: {
        common: number;
        unemployment: number;
        training: number;
        mei: number;
        fogasa: number;
        accident: number;
        total: number;
        totalCompanyCost: number;
    };
}

export function CompanyCosts({ grossAnnual, employerCosts }: CompanyCostsProps) {
    return (
        <div className="backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 lg:p-8 shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-2xl text-indigo-600 dark:text-indigo-400">
                    <Building2 size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Coste Total de Empresa</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Lo que realmente paga la empresa por tu puesto
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="p-4 bg-white/50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-500">Salario Bruto (Tú)</span>
                        <span className="text-base font-semibold text-slate-800 dark:text-slate-200">{grossAnnual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                    </div>
                    <div className="flex justify-between items-center mb-1 text-indigo-600 dark:text-indigo-400">
                        <div className="flex items-center gap-1">
                            <Plus size={14} />
                            <span className="text-sm font-medium">S.S. a cargo de la empresa</span>
                        </div>
                        <span className="text-base font-semibold">{employerCosts.total.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                    </div>

                    <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-3"></div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Coste Total Anual</span>
                        <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{employerCosts.totalCompanyCost.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">Desglose de cuota patronal</h3>

                <div className="flex justify-between text-sm p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                    <span className="text-slate-600 dark:text-slate-300">Contingencias Comunes (23.6%)</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{employerCosts.common.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                </div>
                <div className="flex justify-between text-sm p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                    <span className="text-slate-600 dark:text-slate-300">Desempleo (5.5%)</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{employerCosts.unemployment.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                </div>
                <div className="flex justify-between text-sm p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
                    <span className="text-slate-600 dark:text-slate-300">Formación, FOGASA, MEI y AT/EP</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">{(employerCosts.training + employerCosts.fogasa + employerCosts.mei + employerCosts.accident).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                </div>
            </div>

            <div className="mt-8 bg-indigo-500/10 dark:bg-indigo-500/5 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 text-sm">
                <p className="text-indigo-900 dark:text-indigo-300 font-medium mb-2">
                    🛡️ Auditoría de Costes Ocultos
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                    A menudo, los trabajadores no son conscientes del "salario invisible". De cada euro de tu salario bruto, la empresa debe abonar un extra (aprox. un 30% a 35%) directamente al Estado antes de que tú recibas tu nómina para sostener el Estado de Bienestar. Este es el verdadero desembolso para crear tu puesto de trabajo.
                </p>
            </div>
        </div>
    );
}
