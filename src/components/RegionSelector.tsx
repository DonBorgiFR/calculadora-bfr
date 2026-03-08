import { useState, useRef, useEffect } from 'react';
import { Region } from '../lib/types';
import { Map, ChevronDown, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface RegionSelectorProps {
    value: Region;
    onChange: (region: Region) => void;
}

const REGIONS = [
    { id: Region.GENERAL, name: 'Régimen Común General' },
    { id: Region.MADRID, name: 'Comunidad de Madrid' },
    { id: Region.CATALUNA, name: 'Cataluña' },
    { id: Region.ANDALUCIA, name: 'Andalucía' }
];

export function RegionSelector({ value, onChange }: RegionSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click for desktop
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedRegion = REGIONS.find(r => r.id === value) || REGIONS[0];

    return (
        <div className="relative w-full" ref={containerRef}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <Map size={16} className="text-amber-500" /> Comunidad Autónoma
            </label>

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:ring-2 focus:ring-amber-500/50 text-slate-900 dark:text-white transition-all shadow-sm hover:bg-white dark:hover:bg-slate-900"
            >
                <span className="font-semibold">{selectedRegion.name}</span>
                <ChevronDown
                    size={20}
                    className={cn("text-slate-400 transition-transform duration-300", isOpen && "rotate-180")}
                />
            </button>

            {/* Overlay for Mobile (Bottom Sheet) */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Bottom Sheet (Mobile) / Absolute Dropdown (Desktop) */}
            <div
                className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 md:absolute md:top-full md:bottom-auto md:mt-2 md:rounded-2xl border-t md:border border-white/20 dark:border-slate-700 backdrop-blur-3xl bg-white/80 dark:bg-slate-900/80 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    // Mobile states
                    isOpen ? "translate-y-0" : "translate-y-full md:translate-y-0 md:opacity-0 md:pointer-events-none",
                    // Desktop states
                    "md:transition-opacity md:duration-200",
                    isOpen ? "md:opacity-100 md:pointer-events-auto" : ""
                )}
            >
                {/* Mobile Handle */}
                <div className="flex justify-center pt-3 pb-1 md:hidden">
                    <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                </div>

                <div className="p-4 md:p-2 space-y-1">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 md:hidden px-2">
                        Selecciona Región
                    </h3>

                    {REGIONS.map((region) => {
                        const isSelected = region.id === value;
                        return (
                            <button
                                key={region.id}
                                onClick={() => {
                                    onChange(region.id);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full flex items-center justify-between py-3 md:py-2.5 px-4 rounded-xl transition-all",
                                    isSelected
                                        ? "bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-100 font-bold"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                                )}
                            >
                                {region.name}
                                {isSelected && <Check size={18} className="text-amber-600 dark:text-amber-400" />}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
