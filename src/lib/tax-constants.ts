import type { IRPFBracket } from './types';

export const SS_CONSTANTS = {
    MIN_BASE: 1323.00,
    MAX_BASE: 4720.50,
    RATES: {
        COMMON_CONTINGENCIES: 0.0470,
        UNEMPLOYMENT_GENERAL: 0.0155,
        PROFESSIONAL_TRAINING: 0.0010,
        MEI: 0.0012,
    },
    EMPLOYER_RATES: {
        COMMON_CONTINGENCIES: 0.2360,
        UNEMPLOYMENT_GENERAL: 0.0550,
        PROFESSIONAL_TRAINING: 0.0060,
        MEI: 0.0058,
        FOGASA: 0.0020,
        ACCIDENT: 0.0150, // Promedio oficinas
    }
};

export const PERSONAL_MINIMUMS = {
    GENERAL: 5550,
    AGE_OVER_65: 1150,
    AGE_OVER_75: 1400,
    DISABILITY_33: 3000,
    DISABILITY_65: 9000,
    CHILD_1: 2400,
    CHILD_2: 2700,
};

// 1. Tabla General Completa (Si no se selecciona autonomía)
export const IRPF_GENERAL_BRACKETS: IRPFBracket[] = [
    { upTo: 12450.00, rate: 0.19 },
    { upTo: 20200.00, rate: 0.24 },
    { upTo: 35200.00, rate: 0.30 },
    { upTo: 60000.00, rate: 0.37 },
    { upTo: 300000.00, rate: 0.45 },
    { upTo: Infinity, rate: 0.47 },
];

// 2. Tabla Estatal para Régimen Autonómico (Aproximadamente la mitad de la carga)
export const IRPF_STATE_AUTONOMIC_BRACKETS: IRPFBracket[] = [
    { upTo: 12450.00, rate: 0.0950 },
    { upTo: 20200.00, rate: 0.1200 },
    { upTo: 35200.00, rate: 0.1500 },
    { upTo: 60000.00, rate: 0.1850 },
    { upTo: 300000.00, rate: 0.2250 },
    { upTo: Infinity, rate: 0.2450 },
];

// 3. Tablas Autonómicas / Regionales
export const IRPF_MADRID_BRACKETS: IRPFBracket[] = [
    { upTo: 13696.00, rate: 0.0828 },
    { upTo: 22213.20, rate: 0.1027 },
    { upTo: 37022.00, rate: 0.1326 },
    { upTo: 59235.20, rate: 0.1724 },
    { upTo: Infinity, rate: 0.2050 },
];

export const IRPF_CATALUNA_BRACKETS: IRPFBracket[] = [
    { upTo: 12450.00, rate: 0.1050 },
    { upTo: 17707.20, rate: 0.1200 },
    { upTo: 33007.20, rate: 0.1400 },
    { upTo: 53407.20, rate: 0.1880 },
    { upTo: 90000.00, rate: 0.2150 },
    { upTo: 120000.00, rate: 0.2350 },
    { upTo: 175000.00, rate: 0.2450 },
    { upTo: Infinity, rate: 0.2550 },
];

export const IRPF_ANDALUCIA_BRACKETS: IRPFBracket[] = [
    { upTo: 13000.00, rate: 0.0950 },
    { upTo: 21000.00, rate: 0.1200 },
    { upTo: 35200.00, rate: 0.1500 },
    { upTo: 60000.00, rate: 0.1850 },
    { upTo: Infinity, rate: 0.2250 },
];

export const IRPF_VALENCIA_BRACKETS: IRPFBracket[] = [
    { upTo: 12450.00, rate: 0.0900 },
    { upTo: 17000.00, rate: 0.1200 },
    { upTo: 30000.00, rate: 0.1500 },
    { upTo: 50000.00, rate: 0.1900 },
    { upTo: 65000.00, rate: 0.2350 },
    { upTo: 90000.00, rate: 0.2450 },
    { upTo: 120000.00, rate: 0.2550 },
    { upTo: Infinity, rate: 0.2950 },
];

export const IRPF_GALICIA_BRACKETS: IRPFBracket[] = [
    { upTo: 12450.00, rate: 0.0900 },
    { upTo: 20200.00, rate: 0.1175 },
    { upTo: 27700.00, rate: 0.1550 },
    { upTo: 35200.00, rate: 0.1700 },
    { upTo: 47600.00, rate: 0.1900 },
    { upTo: 60000.00, rate: 0.2150 },
    { upTo: Infinity, rate: 0.2250 },
];

export const IRPF_BALEARES_BRACKETS: IRPFBracket[] = [
    { upTo: 10000.00, rate: 0.0850 },
    { upTo: 18000.00, rate: 0.1175 },
    { upTo: 30000.00, rate: 0.1475 },
    { upTo: 48000.00, rate: 0.1775 },
    { upTo: 70000.00, rate: 0.1925 },
    { upTo: 90000.00, rate: 0.2325 },
    { upTo: 120000.00, rate: 0.2425 },
    { upTo: Infinity, rate: 0.2500 }
];
