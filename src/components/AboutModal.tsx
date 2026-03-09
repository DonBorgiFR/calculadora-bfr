import { X, Code2, Lightbulb, AlertCircle, UserCircle2 } from 'lucide-react';
import { useEffect } from 'react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    // Evitar scroll en el body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
            {/* Backdrop con Blur */}
            <div
                className="absolute inset-0 bg-slate-900/60 dark:bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Ventana Modal */}
            <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col scale-95 animate-[scaleIn_0.3s_ease-out_forwards]">

                {/* Botón de Cierre */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Contenido Scrolleable */}
                <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">

                    <div className="text-center mb-10 mt-4">
                        <span className="text-sm font-light tracking-[0.4em] text-slate-500 dark:text-slate-400 mb-3 block uppercase">Showcase</span>
                        <h2 className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white">
                            Arquitectura del Proyecto
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {/* Fortaleza: Ingeniería */}
                        <div className="flex gap-4 sm:gap-6 items-start">
                            <div className="p-3 sm:p-4 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0">
                                <Code2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ingeniería de Precisión O(log n)</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                    Construida con React 18, Vite y TypeScript estricto. La característica más robusta de esta herramienta no es su diseño, sino su motor. Integra un algoritmo de <strong>Búsqueda Binaria</strong> de cálculo inverso (Neto a Bruto) capaz de iterar la fiscalidad progresiva con un margen de error inferior a 0.005 €.
                                </p>
                            </div>
                        </div>

                        {/* Fortaleza: UI/UX Zen */}
                        <div className="flex gap-4 sm:gap-6 items-start">
                            <div className="p-3 sm:p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                                <Lightbulb size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Filosofía "Built for Reflection"</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                    Diseño de autor basado en el minimalismo Zen. Emplea técnicas de <strong>Glassmorphism</strong>, enfoque Mobile-First y está renderizado con Tailwind CSS sin depender de librerías de componentes pesadas. El objetivo: hacer que la carga cognitiva de la matemática fiscal desaparezca a favor de la visualización de datos fluida.
                                </p>
                            </div>
                        </div>

                        {/* Limitaciones */}
                        <div className="flex gap-4 sm:gap-6 items-start">
                            <div className="p-3 sm:p-4 rounded-2xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 shrink-0">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Limitaciones Actuales (Roadmap)</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base mb-3">
                                    Para mantener la pureza del algoritmo y el rendimiento <em>Client-Side</em> (sin Backend), existen alcances limitados:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                                    <li>Calcula con extrema precisión el Régimen General de España (Dato Estatal), pero obvia las micro-variaciones autonómicas específicas.</li>
                                    <li>No contempla regímenes forales especiales (País Vasco y Navarra).</li>
                                    <li>Asume un contrato indefinido estándar para los costes patronales.</li>
                                </ul>
                            </div>
                        </div>
                        {/* Autor perfil */}
                        <div className="flex gap-4 sm:gap-6 items-start">
                            <div className="p-3 sm:p-4 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                                <UserCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Sobre el Autor</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                    Desarrollado por <strong>Borja Félix Rojas</strong>, Ingeniero Civil Industrial especializado en Control de Gestión y Análisis de Datos (BI/Excel). Con una visión enfocada en la eficiencia operativa, esta herramienta materializa la intersección perfecta entre la innovación técnica, la precisión y el diseño centrado en el usuario.
                                </p>
                                <div className="mt-3 flex gap-3">
                                    <a href="https://www.linkedin.com/in/borjafelixrojas/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                        Conectar en LinkedIn &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center text-sm text-slate-400 dark:text-slate-500 font-medium">
                        Desarrollado por <a href="https://borjafelixrojas.odoo.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">BFR</a> · {new Date().getFullYear()}
                    </div>
                </div>
            </div>
        </div>
    );
}
