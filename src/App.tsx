import { useState, useMemo } from 'react';
import { InputPanel } from './components/InputPanel';
import { ResultsDashboard } from './components/ResultsDashboard';
import { DidacticExplanation } from './components/DidacticExplanation';
import { AboutModal } from './components/AboutModal';
import { InstallPWAPrompt } from './components/InstallPWAPrompt';
import { InteractiveCVModal } from './components/InteractiveCVModal';
import { Info } from 'lucide-react';
import { calculateFromGross, calculateFromNet } from './lib/salary-engine';
import { Region } from './lib/types';

export default function App() {
  const [amount, setAmount] = useState<string>('30000');
  const [direction, setDirection] = useState<'grossToNet' | 'netToGross'>('grossToNet');
  const [age, setAge] = useState<number>(30);
  const [disability, setDisability] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [payments, setPayments] = useState<12 | 14>(12);

  const [region, setRegion] = useState<Region>(Region.GENERAL);

  // Modal de Portfolio
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCVMOpen, setIsCVMOpen] = useState(false); // Easter Egg Modal

  // Pestañas de Resultados
  const [activeTab, setActiveTab] = useState<'nomina' | 'canasta' | 'empresa'>('nomina');

  // Fase 11: UX Minimalista
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  const result = useMemo(() => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      return null;
    }

    const info = {
      age: age || 0,
      disabilityDegree: disability,
      childrenCount: childrenCount || 0,
      payments,
      region
    };

    if (direction === 'grossToNet') {
      return calculateFromGross(num, info);
    } else {
      return calculateFromNet(num, info);
    }
  }, [amount, direction, age, disability, childrenCount, payments, region]);

  // EASTER EGG LOGIC
  // Escuchar si el usuario escribe "borja" para abrir el portfolio secreto
  import('react').then((React) => {
    React.useEffect(() => {
      let keySequence = "";
      const handleKeyDown = (e: KeyboardEvent) => {
        keySequence += e.key.toLowerCase();
        // Mantener solo los ultimos 5 caracteres
        if (keySequence.length > 5) {
          keySequence = keySequence.slice(-5);
        }
        
        if(keySequence === "borja" && !isCVMOpen) {
          setIsCVMOpen(true);
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isCVMOpen]);
  });


  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-blue-500/30 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500">
      {/* Background Animated Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-emerald-400/20 dark:bg-emerald-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <header className="mb-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 text-slate-500 dark:text-slate-400">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2c4.418 0 8 2.5 9.5 6" strokeLinecap="round" />
                <path d="M10 8v8m0-8h3a2 2 0 0 1 0 4h-3m3 0a2 2 0 0 1 0 4h-3" strokeLinecap="round" />
              </svg>
              <span className="text-sm font-light tracking-[0.4em]">BFR</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white tracking-tight">
              Calculadora de Sueldo España
            </h1>
            <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg font-medium">
              Simula tu salario neto o bruto con precisión milimétrica.
            </p>
          </div>

          {/* Controles: Portfolio & Modo Avanzado */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 lg:mt-0">
            {/* Toggle Simple / Avanzado */}
            <div className="flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 p-1.5 rounded-full border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm">
              <span className={`text-sm font-medium pl-3 transition-colors ${!isAdvancedMode ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Simple</span>
              <button
                onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-950"
                aria-label="Alternar modo avanzado"
              >
                <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${isAdvancedMode ? 'translate-x-6 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'translate-x-0 bg-white shadow-sm'}`} />
              </button>
              <span className={`text-sm font-medium pr-3 transition-colors ${isAdvancedMode ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>Avanzado</span>
            </div>

            {/* Botón Portfolio Showcase */}
            <button
              onClick={() => setIsAboutOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all font-medium text-sm backdrop-blur-md shadow-sm"
            >
              <Info size={18} />
              <span className="hidden sm:inline">Sobre el Proyecto</span>
            </button>
          </div>
        </header>

        <main className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 relative space-y-6">
            <InputPanel
              amount={amount} setAmount={setAmount}
              direction={direction} setDirection={setDirection}
              age={age} setAge={setAge}
              disability={disability} setDisability={setDisability}
              childrenCount={childrenCount} setChildrenCount={setChildrenCount}
              payments={payments} setPayments={setPayments}
              region={region} setRegion={setRegion}
            />
          </div>

          <div className="lg:col-span-7 sticky top-8">
            <ResultsDashboard
              result={result}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isAdvancedMode={isAdvancedMode}
              region={region}
            />
          </div>
        </main>

        <div className="mt-8 lg:mt-12 mb-12">
          {/* Cómo funciona tu nómina: movido tras los módulos interactivos */}
          <DidacticExplanation result={result} />
        </div>
      </div>

      {/* Footer Minimalista / Zen */}
      <footer className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 mt-12 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="h-px w-12 bg-slate-200 dark:bg-slate-800 mb-2"></div>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-default">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 21a9 9 0 1 0-2-17.8" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Built for reflection</span>
          </div>
          <p className="text-[11px] text-slate-400/70 dark:text-slate-500/80 font-light tracking-wider max-w-sm">
            La belleza de lo simple. Una matemática transparente para decisiones conscientes.
          </p>
        </div>
      </footer>

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <InteractiveCVModal isOpen={isCVMOpen} onClose={() => setIsCVMOpen(false)} />
      <InstallPWAPrompt />
    </div>
  );
}
