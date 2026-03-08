
import { Calculator, User, Users, FileText, Activity } from 'lucide-react';
import { RegionSelector } from './RegionSelector';
import { Region } from '../lib/types';

interface InputPanelProps {
    amount: string;
    setAmount: (val: string) => void;
    direction: 'grossToNet' | 'netToGross';
    setDirection: (val: 'grossToNet' | 'netToGross') => void;
    age: number;
    setAge: (val: number) => void;
    disability: number;
    setDisability: (val: number) => void;
    childrenCount: number;
    setChildrenCount: (val: number) => void;
    payments: 12 | 14;
    setPayments: (val: 12 | 14) => void;
    region: Region;
    setRegion: (val: Region) => void;
}

export function InputPanel({
    amount, setAmount,
    direction, setDirection,
    age, setAge,
    disability, setDisability,
    childrenCount, setChildrenCount,
    payments, setPayments,
    region, setRegion
}: InputPanelProps) {
    return (
        <div className="backdrop-blur-2xl bg-white/40 dark:bg-slate-900/40 border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 lg:p-8 shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                    <Calculator size={24} />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-slate-100 dark:to-slate-400">
                    Datos Salariales
                </h2>
            </div>

            <div className="space-y-6">
                {/* Direction Toggle */}
                <div className="flex p-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl">
                    <button
                        onClick={() => setDirection('grossToNet')}
                        className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${direction === 'grossToNet'
                            ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                    >
                        De Bruto a Neto
                    </button>
                    <button
                        onClick={() => setDirection('netToGross')}
                        className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${direction === 'netToGross'
                            ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                    >
                        De Neto a Bruto
                    </button>
                </div>

                {/* Amount */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Importe Anual (€)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min="0"
                            max="10000000"
                            value={amount}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (val <= 10000000) setAmount(e.target.value);
                            }}
                            className="w-full text-2xl font-semibold bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 px-5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-900 dark:text-white"
                            placeholder="Ej: 30000"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">€/año</span>
                    </div>
                </div>

                <RegionSelector value={region} onChange={setRegion} />

                {/* Pagas */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <FileText size={16} className="text-blue-500" />
                        Estructura de Pagas
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {[12, 14].map((p) => (
                            <button
                                key={p}
                                onClick={() => setPayments(p as 12 | 14)}
                                className={`py-3 rounded-xl border font-medium transition-all ${payments === p
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300'
                                    : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {p} Pagas
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent my-6" />

                {/* Variables Personales */}
                <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                <User size={16} className="text-purple-500" /> Edad
                            </label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                                className="w-full bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-purple-500/50 text-slate-900 dark:text-white transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                <Users size={16} className="text-emerald-500" /> Hijos
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={childrenCount}
                                onChange={(e) => setChildrenCount(Number(e.target.value))}
                                className="w-full bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-900 dark:text-white transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                            <Activity size={16} className="text-rose-500" /> Discapacidad
                        </label>
                        <select
                            value={disability}
                            onChange={(e) => setDisability(Number(e.target.value))}
                            className="w-full bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-rose-500/50 text-slate-900 dark:text-white dropdown-icon appearance-none transition-all"
                        >
                            <option value={0}>Sin discapacidad (&lt; 33%)</option>
                            <option value={33}>Discapacidad ≥ 33%</option>
                            <option value={65}>Discapacidad ≥ 65%</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
