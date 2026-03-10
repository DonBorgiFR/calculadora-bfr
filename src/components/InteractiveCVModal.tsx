import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2, Briefcase, GraduationCap, Github, Linkedin, LineChart } from 'lucide-react';

interface InteractiveCVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InteractiveCVModal({ isOpen, onClose }: InteractiveCVModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 bg-slate-900/60 transition-all"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden shadow-indigo-500/10 my-8"
        >
          {/* Header Cover Banner */}
          <div className="h-32 sm:h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Animated Circles Protocol */}
            <motion.div
              animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute top-10 right-20 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl"
            />
          </div>

          <div className="px-6 sm:px-10 pb-10">
            {/* Perfil (Avatar overlap) */}
            <div className="relative flex flex-col sm:flex-row items-center sm:items-end sm:justify-between -mt-16 sm:-mt-20 mb-8 gap-4 sm:gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-slate-800 border-4 border-slate-900 shadow-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
                >
                  <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-purple-400">
                    BFR
                  </span>
                </motion.div>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-0">
                <a href="https://github.com/DonBorgiFR/calculadora-bfr" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                  <Github size={16} /> <span className="hidden sm:inline">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/borjafelixrojas/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-lg text-sm font-medium transition-colors">
                  <Linkedin size={16} /> <span className="hidden sm:inline">LinkedIn</span>
                </a>
                <a href="https://borjafelixrojas.odoo.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                  <ExternalLink size={16} /> Portfolio
                </a>
              </div>
            </div>

            {/* Title Section */}
            <div className="text-center sm:text-left mb-10">
              <motion.h1
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl font-black text-white mb-2"
              >
                Borja Félix Rojas
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                className="text-lg text-indigo-400 font-medium"
              >
                Controller de Gestión & Analista de Datos (Power BI / Python)
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="mt-4 text-slate-400 max-w-2xl leading-relaxed text-sm sm:text-base"
              >
                Ingeniero Industrial especializado en hibridar mundos: visión estratégica de negocio y dominio técnico. Transformo datos complejos en decisiones ejecutivas mediante Power BI, automatizo flujos de trabajo con código y optimizo la eficiencia corporativa.
              </motion.p>
            </div>

            {/* Grid de Contenidos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Stack Tecnológico */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4 text-white">
                    <Code2 className="text-indigo-400" />
                    <h3 className="font-bold text-lg">Tech Stack & Habilidades</h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <TechBadge label="Power BI Avanzado" color="blue" />
                    <TechBadge label="Python & SQL" color="indigo" />
                    <TechBadge label="Excel (VBA/Macros)" color="green" />
                    <TechBadge label="Control de Gestión" color="purple" />
                    <TechBadge label="Optimización Procesos" color="yellow" />
                    <TechBadge label="React / Tecnologías Web" color="red" />
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4 text-white">
                    <Briefcase className="text-indigo-400" />
                    <h3 className="font-bold text-lg">Hitos Destacados</h3>
                  </div>
                  <ul className="space-y-4">
                    <HistoryItem
                      title="Digitalización Operativa (Empresas Gasco)"
                      desc="Implementación de software Zyght y desarrollo de dashboards ejecutivos (Power BI) para trazabilidad documental y control presupuestario."
                    />
                    <HistoryItem
                      title="Optimización de Flujos (Transviña Ltda.)"
                      desc="Reducción del 30% en tiempos operativos mediante la automatización de procesos administrativos y el rediseño de sistemas de gestión."
                    />
                    <HistoryItem
                      title="Desarrollo Frontend: Calculadora BFR (Este Proyecto)"
                      desc="Motor impositivo, proyecciones indexadas de IPC a 5 años, PWA Native y UI Premium Glassmorphism."
                    />
                  </ul>
                </div>
              </motion.div>

              {/* Sidebar Derecho */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden">
                  <LineChart className="absolute -bottom-4 -right-4 w-32 h-32 text-indigo-500/10" />
                  <div className="flex items-center gap-3 mb-4 text-white relative z-10">
                    <GraduationCap className="text-indigo-400" />
                    <h3 className="font-bold text-lg">El Valor Añadido</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                    La mayoría de ingenieros no dominan el análisis financiero; la mayoría de financieros no automatizan con código. <br /><br />
                    <span className="text-white font-semibold">Yo traduzco la complejidad contable y operativa en modelos escalables de Power BI, código limpio y mayor rentabilidad industrial.</span>
                  </p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center">
                  <p className="text-slate-400 text-sm mb-4">"Has encontrado el Easter Egg del proyecto."</p>
                  <a href="mailto:bfelixrojas@gmail.com" className="inline-block w-full text-center px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors shadow-lg">
                    Contactar ahora
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Helpers
function TechBadge({ label, color }: { label: string, color: 'blue' | 'indigo' | 'green' | 'purple' | 'yellow' | 'red' }) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  }
  return (
    <div className={`px-3 py-2 rounded-lg border text-xs font-medium text-center flex items-center justify-center ${colors[color]}`}>
      {label}
    </div>
  )
}

function HistoryItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-indigo-500 before:rounded-full before:shadow-[0_0_8px_rgba(99,102,241,0.8)]">
      <h4 className="text-slate-200 font-medium text-sm">{title}</h4>
      <p className="text-slate-400 text-xs mt-1 leading-relaxed">{desc}</p>
    </li>
  )
}