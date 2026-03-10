import { useState, useEffect } from 'react';
import { Region } from './types';

export interface SavedSimulation {
  id: string; // Timestamp
  name: string;
  grossSalary: number;
  netSalary: number;
  livingCosts: number;
  freeSavings: number;
  region: Region;
  dateSaved: number;
}

export function useSimulations() {
  const [simulations, setSimulations] = useState<SavedSimulation[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    const saved = localStorage.getItem('bfr_saved_simulations');
    if (saved) {
      try {
        setSimulations(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved simulations:', e);
      }
    }
  }, []);

  // Guardar datos
  const saveSimulation = (sim: Omit<SavedSimulation, 'id' | 'dateSaved'>) => {
    if (simulations.length >= 3) {
      // Si ya hay 3, reemplazar la más antigua o rechazar
      return false; 
    }

    const newSim: SavedSimulation = {
      ...sim,
      id: Date.now().toString(),
      dateSaved: Date.now(),
    };

    const updated = [...simulations, newSim];
    setSimulations(updated);
    localStorage.setItem('bfr_saved_simulations', JSON.stringify(updated));
    return true;
  };

  const removeSimulation = (id: string) => {
    const updated = simulations.filter(s => s.id !== id);
    setSimulations(updated);
    localStorage.setItem('bfr_saved_simulations', JSON.stringify(updated));
  };

  const clearAll = () => {
    setSimulations([]);
    localStorage.removeItem('bfr_saved_simulations');
  }

  return {
    simulations,
    saveSimulation,
    removeSimulation,
    clearAll,
    canSaveMore: simulations.length < 3
  };
}
