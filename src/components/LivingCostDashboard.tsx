import { useState } from 'react';
import { Home, ShoppingBasket, Zap, TrainFront, Coffee, Wallet, AlertTriangle, Users, Smartphone, Shield, Dumbbell, Plane, Activity } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Tooltip } from 'recharts';

interface LivingCostDashboardProps {
    netMonthly: number;
}

export function LivingCostDashboard({ netMonthly }: LivingCostDashboardProps) {
    // Estado Inicial con Valores Promedio en España (KI)
    const [rent, setRent] = useState(700);
    const [food, setFood] = useState(250);
    const [utilities, setUtilities] = useState(120);
    const [transport, setTransport] = useState(50);
    const [leisure, setLeisure] = useState(100);
    const [pets, setPets] = useState(0);
    const [subscriptions, setSubscriptions] = useState(30);
    const [insurance, setInsurance] = useState(50);
    const [sports, setSports] = useState(40);
    const [travel, setTravel] = useState(0);

    const totalExpenses = rent + food + utilities + transport + leisure + pets + subscriptions + insurance + sports + travel;
    const remaining = netMonthly - totalExpenses;
    const isDeficit = remaining < 0;

    // Calculo matemático de progreso (0% a 100% maximo, clamping para Gauge)
    const expensePercentage = Math.min((totalExpenses / netMonthly) * 100, 100) || 0;

    const data = [
        { name: 'Gastos Base', value: totalExpenses, color: isDeficit ? '#f43f5e' : '#f59e0b' },
        { name: 'Ahorro', value: isDeficit ? 0 : remaining, color: '#10b981' }
    ];

    const expenseBreakdown = [
        { name: 'Vivienda', value: rent, fill: 'bg-blue-500', color: 'text-blue-500' },
        { name: 'Comida', value: food, fill: 'bg-emerald-500', color: 'text-emerald-500' },
        { name: 'Ocio', value: leisure, fill: 'bg-pink-500', color: 'text-pink-500' },
        { name: 'Transporte', value: transport, fill: 'bg-indigo-500', color: 'text-indigo-500' },
        { name: 'Servicios', value: utilities, fill: 'bg-amber-500', color: 'text-amber-500' },
        { name: 'Otros', value: pets + subscriptions + insurance + sports + travel, fill: 'bg-purple-500', color: 'text-purple-500' }
    ].filter(i => i.value > 0).sort((a, b) => b.value - a.value);

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">

            {/* Visualización de Capacidad de Ahorro */}
            <div className={`p-8 rounded-3xl relative overflow-hidden transition-all duration-300 shadow-xl border ${isDeficit ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 animate-shake' : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'}`}>

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">

                    {/* Gauge Matemático Minimalista con Recharts */}
                    <div className="relative w-40 h-40 shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={75}
                                    startAngle={225}
                                    endAngle={-45}
                                    dataKey="value"
                                    stroke="none"
                                    isAnimationActive={true}
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    formatter={(value: any) => Number(value).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                            </RechartsPie>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Restante</span>
                            <span className={`text-xl font-bold tracking-tight ${isDeficit ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                                {expensePercentage.toFixed(0)}%
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2 mb-2">
                            {isDeficit ? <AlertTriangle size={20} className="text-rose-500" /> : <Wallet size={20} className="text-emerald-500" />}
                            {isDeficit ? 'Déficit Mensual' : 'Capacidad de Ahorro Mínima'}
                        </h3>
                        <p className={`text-5xl font-black mb-2 tracking-tighter ${isDeficit ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            {remaining.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            De tus {netMonthly.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} netos, asumes {totalExpenses.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })} fijos.
                        </p>
                    </div>
                </div>

                {/* Decorative Background Fill Progress */}
                <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 animate-fill"
                    style={{ width: `${expensePercentage}%`, color: isDeficit ? 'var(--color-rose-500)' : 'var(--color-emerald-500)' }}
                />
            </div>

            {/* Formulario de Gastos */}
            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-slate-800/60 rounded-3xl p-6 shadow-xl">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                    Ajusta tu Nivel de Vida
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CostInput label="Vivienda (Alquil/Hip)" icon={<Home size={16} />} value={rent} setValue={setRent} max={3000} />
                    <CostInput label="Alimentación" icon={<ShoppingBasket size={16} />} value={food} setValue={setFood} max={1000} />
                    <CostInput label="Servicios (Luz, Int)" icon={<Zap size={16} />} value={utilities} setValue={setUtilities} max={500} />
                    <CostInput label="Transporte" icon={<TrainFront size={16} />} value={transport} setValue={setTransport} max={500} />
                    <CostInput label="Seguros (Salud, Coche)" icon={<Shield size={16} />} value={insurance} setValue={setInsurance} max={400} />
                    <CostInput label="Ocio y Cenas" icon={<Coffee size={16} />} value={leisure} setValue={setLeisure} max={1500} />
                    <CostInput label="Mascotas / Hijos" icon={<Users size={16} />} value={pets} setValue={setPets} max={1000} />
                    <CostInput label="Suscripciones y Apps" icon={<Smartphone size={16} />} value={subscriptions} setValue={setSubscriptions} max={300} />
                    <CostInput label="Deporte y Gimnasio" icon={<Dumbbell size={16} />} value={sports} setValue={setSports} max={300} />
                    <CostInput label="Viajes / Ahorro Vacaciones" icon={<Plane size={16} />} value={travel} setValue={setTravel} max={1000} />
                </div>
            </div>

            {/* Termómetro Zen de Gastos (Fase 11.3) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm overflow-hidden relative">
                <div className="absolute inset-0 opacity-[0.03] z-0 mix-blend-luminosity">
                    <img src="/assets/zen_living_cost_bg.png" alt="" className="w-full h-full object-cover" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                    <div>
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                            <Activity className="text-blue-500" size={18} />
                            Termómetro de tu Sueldo
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Visualiza cómo se consume tu tope neto de <strong>{netMonthly.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</strong>.
                        </p>
                    </div>
                </div>

                <div className="relative z-10">
                    {/* Barra de Progreso del Sueldo (100%) */}
                    <div className="h-6 sm:h-8 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner relative group border border-slate-200/50 dark:border-slate-700/50">
                        {expenseBreakdown.map((item, idx) => {
                            const pct = Math.min((item.value / netMonthly) * 100, 100);
                            if (pct <= 0) return null;
                            return (
                                <div
                                    key={idx}
                                    className={`h-full ${item.fill} transition-all duration-500 ease-out border-r border-white/20 last:border-0 hover:brightness-110 flex items-center justify-center`}
                                    style={{ width: `${pct}%` }}
                                    title={`${item.name}: ${item.value}€`}
                                >
                                    {pct > 5 && <span className="text-[10px] font-bold text-white/90 drop-shadow-sm px-1 truncate">{pct.toFixed(0)}%</span>}
                                </div>
                            )
                        })}
                        {/* Espacio vacío = Ahorro / Déficit ya se sobrepasa visualmente si pasa de 100 */}
                    </div>

                    {/* Leyenda Analítica Minimalista */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {expenseBreakdown.map((item, idx) => {
                            const pct = ((item.value / netMonthly) * 100).toFixed(1);
                            return (
                                <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/30">
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${item.fill} shadow-sm`} />
                                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate">{item.name}</span>
                                    </div>
                                    <span className={`text-lg font-black tracking-tight ${item.color}`}>
                                        {item.value}<span className="text-sm font-medium opacity-60 ml-0.5">€</span>
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400 mt-0.5">{pct}% del sueldo</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}

function CostInput({ label, icon, value, setValue, max }: { label: string, icon: React.ReactNode, value: number, setValue: (val: number) => void, max: number }) {
    return (
        <div className="bg-white/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-white/60 dark:border-slate-700/50 hover:border-blue-500/30 transition-all shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                {/* Ahora el label no corta el texto (sin truncate, con whitespace-normal) */}
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-start sm:items-center gap-2.5 w-full">
                    <span className="text-blue-500 dark:text-blue-400 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl shrink-0 shadow-sm">{icon}</span>
                    <span className="whitespace-normal leading-tight">{label}</span>
                </label>
                <div className="relative shrink-0 flex items-center w-full sm:w-auto mt-2 sm:mt-0">
                    <input
                        type="number"
                        min="0"
                        max={max * 2}
                        value={value === 0 ? '' : value}
                        onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setValue(val);
                        }}
                        placeholder="0"
                        className="w-full sm:w-28 font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-2 pr-8 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-inner"
                    />
                    <span className="absolute right-3 text-slate-400 text-sm font-bold pointer-events-none">€</span>
                </div>
            </div>
            <input
                type="range"
                min="0"
                max={max}
                step="10"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
        </div>
    );
}
