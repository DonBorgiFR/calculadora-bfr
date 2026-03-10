import { useMemo } from 'react';
import { useSimulations } from '../lib/useSimulations';
import { Trophy, TrendingUp, X, MapPin } from 'lucide-react';
import { Region } from '../lib/types';

// Helper inline para formato de moneda (dado que utils.ts fallaba en import)
const formatCurrency = (amount: number) => amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

export function OffersComparator() {
  const { simulations, removeSimulation } = useSimulations();

  // Encontrar ganador (mayor ahorro libre)
  const winnerId = useMemo(() => {
    if (simulations.length < 2) return null;
    const sorted = [...simulations].sort((a, b) => b.freeSavings - a.freeSavings);
    return sorted[0].id;
  }, [simulations]);

  if (simulations.length === 0) return null;

  return (
    <div className="mt-12 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
      {/* Background glow si hay ganador */}
      {winnerId && (
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <Trophy className="text-emerald-400" />
            Comparador de Ofertas
          </h2>
          <p className="text-slate-400 text-sm mt-1">Has guardado {simulations.length}/3 simulaciones para decidir tu futuro.</p>
        </div>
      </div>

      {/* MOBILE-FIRST CAROUSEL: snap-x, overflow-x-auto. DESKTOP: grid cols */}
      <div className="flex overflow-x-auto pb-6 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 snap-x snap-mandatory hide-scrollbar">
        {simulations.map((sim, index) => {
          const isWinner = sim.id === winnerId;
          const formatRegion = (r: Region) => r.charAt(0).toUpperCase() + r.slice(1);

          return (
            <div 
              key={sim.id} 
              className={`flex-none w-[85vw] sm:w-auto snap-center bg-slate-800/80 backdrop-blur-md rounded-2xl p-5 border relative transition-all duration-300 ${isWinner ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20' : 'border-slate-700/50 hover:border-slate-600'}`}
            >
              <button 
                onClick={() => removeSimulation(sim.id)}
                className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors p-1"
                aria-label="Eliminar simulación"
              >
                <X size={16} />
              </button>

              <div className="mb-4 pr-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-900/50 px-2 py-1 rounded-md">
                  Oferta {index + 1}
                </span>
                <h3 className="text-lg font-bold text-white mt-2 truncate">{sim.name}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                  <MapPin size={12} /> {formatRegion(sim.region)}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">Bruto Anual</p>
                  <p className="font-medium text-slate-200">{formatCurrency(sim.grossSalary)}</p>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/20 rounded-xl p-3">
                  <p className="text-xs text-indigo-300 mb-1 font-medium">Neto Anual</p>
                  <p className="font-bold text-white text-lg">{formatCurrency(sim.netSalary)}</p>
                </div>

                <div className={`rounded-xl p-4 border relative overflow-hidden ${isWinner ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900/30 border-slate-700/50'}`}>
                  {isWinner && (
                     <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-400/20 blur-xl" />
                  )}
                  <p className={`text-xs mb-1 font-medium flex items-center gap-1.5 ${isWinner ? 'text-emerald-400' : 'text-slate-400'}`}>
                    <TrendingUp size={14} /> Capacidad Ahorro Libre
                  </p>
                  <p className={`font-black text-xl ${isWinner ? 'text-emerald-400' : 'text-white'}`}>
                    {formatCurrency(sim.freeSavings)} <span className="text-xs font-normal">/mes</span>
                  </p>
                  {isWinner && <p className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-wider mt-1.5">Mejor Opción</p>}
                </div>
              </div>

            </div>
          );
        })}
      </div>
      
      {/* Scroll indicator Mobile Only */}
      {simulations.length > 1 && (
         <div className="sm:hidden text-center text-xs text-slate-500 mt-2 flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-slate-700"></span>
            Desliza para comparar
            <span className="w-8 h-[1px] bg-slate-700"></span>
         </div>
      )}
    </div>
  );
}
