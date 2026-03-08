import {
    SS_CONSTANTS,
    PERSONAL_MINIMUMS,
    IRPF_GENERAL_BRACKETS,
    IRPF_STATE_AUTONOMIC_BRACKETS,
    IRPF_MADRID_BRACKETS,
    IRPF_CATALUNA_BRACKETS,
    IRPF_ANDALUCIA_BRACKETS
} from './tax-constants';
import { Region } from './types';
import type { IRPFBracket } from './types';

export interface PersonalInfo {
    age: number;
    disabilityDegree: number; // 0, 33, 65
    childrenCount: number;
    payments: 12 | 14;
    region: Region; // Incorporación vital para Fase 2
}

export interface CalculationResult {
    grossAnnual: number;
    grossMonthly: number;
    netAnnual: number;
    netMonthly: number;
    extraPaymentAmount: number;
    socialSecurity: {
        common: number;
        unemployment: number;
        training: number;
        mei: number;
        total: number;
    };
    irpf: {
        base: number;
        taxAmount: number;
        statePortion?: number;
        regionalPortion?: number;
        percent: number;
    };
    employerCosts: {
        common: number;
        unemployment: number;
        training: number;
        mei: number;
        fogasa: number;
        accident: number;
        total: number;
        totalCompanyCost: number; // Salario Bruto + total SS Empresa
    };
}


function getMonthlyBaseSS(grossMonthlyRatio: number): number {
    if (grossMonthlyRatio < SS_CONSTANTS.MIN_BASE) return SS_CONSTANTS.MIN_BASE;
    if (grossMonthlyRatio > SS_CONSTANTS.MAX_BASE) return SS_CONSTANTS.MAX_BASE;
    return grossMonthlyRatio;
}

function calculateSocialSecurity(grossAnnual: number) {
    const grossMonthlyRatio = grossAnnual / 12;
    const monthlyBaseSS = getMonthlyBaseSS(grossMonthlyRatio);

    const common = monthlyBaseSS * SS_CONSTANTS.RATES.COMMON_CONTINGENCIES;
    const unemployment = monthlyBaseSS * SS_CONSTANTS.RATES.UNEMPLOYMENT_GENERAL;
    const training = monthlyBaseSS * SS_CONSTANTS.RATES.PROFESSIONAL_TRAINING;
    const mei = monthlyBaseSS * SS_CONSTANTS.RATES.MEI;

    const totalMonthly = common + unemployment + training + mei;

    return {
        common: common * 12,
        unemployment: unemployment * 12,
        training: training * 12,
        mei: mei * 12,
        total: totalMonthly * 12,
    };
}

function calculateEmployerSocialSecurity(grossAnnual: number) {
    const grossMonthlyRatio = grossAnnual / 12;
    const monthlyBaseSS = getMonthlyBaseSS(grossMonthlyRatio);

    const common = monthlyBaseSS * SS_CONSTANTS.EMPLOYER_RATES.COMMON_CONTINGENCIES;
    const unemployment = monthlyBaseSS * SS_CONSTANTS.EMPLOYER_RATES.UNEMPLOYMENT_GENERAL;
    const training = monthlyBaseSS * SS_CONSTANTS.EMPLOYER_RATES.PROFESSIONAL_TRAINING;
    const mei = monthlyBaseSS * SS_CONSTANTS.EMPLOYER_RATES.MEI;
    const fogasa = monthlyBaseSS * SS_CONSTANTS.EMPLOYER_RATES.FOGASA;
    const accident = monthlyBaseSS * SS_CONSTANTS.EMPLOYER_RATES.ACCIDENT;

    const totalMonthly = common + unemployment + training + mei + fogasa + accident;

    return {
        common: common * 12,
        unemployment: unemployment * 12,
        training: training * 12,
        mei: mei * 12,
        fogasa: fogasa * 12,
        accident: accident * 12,
        total: totalMonthly * 12,
        totalCompanyCost: grossAnnual + (totalMonthly * 12)
    };
}

function calculateProgressiveTax(base: number, brackets: IRPFBracket[]): number {
    let tax = 0;
    let prevUpTo = 0;

    for (const bracket of brackets) {
        if (base > prevUpTo) {
            const taxableAmountInBracket = Math.min(base - prevUpTo, bracket.upTo - prevUpTo);
            tax += taxableAmountInBracket * bracket.rate;
            prevUpTo = bracket.upTo;
        } else {
            break;
        }
    }

    return tax;
}

function calculatePersonalMinimum(info: PersonalInfo): number {
    let minimum = PERSONAL_MINIMUMS.GENERAL;

    if (info.age >= 75) {
        minimum += PERSONAL_MINIMUMS.AGE_OVER_65 + PERSONAL_MINIMUMS.AGE_OVER_75;
    } else if (info.age >= 65) {
        minimum += PERSONAL_MINIMUMS.AGE_OVER_65;
    }

    if (info.disabilityDegree >= 65) {
        minimum += PERSONAL_MINIMUMS.DISABILITY_65;
    } else if (info.disabilityDegree >= 33) {
        minimum += PERSONAL_MINIMUMS.DISABILITY_33;
    }

    if (info.childrenCount >= 1) minimum += PERSONAL_MINIMUMS.CHILD_1;
    if (info.childrenCount >= 2) minimum += PERSONAL_MINIMUMS.CHILD_2;

    return minimum;
}

function getRegionalBrackets(region: Region): IRPFBracket[] {
    switch (region) {
        case Region.MADRID: return IRPF_MADRID_BRACKETS;
        case Region.CATALUNA: return IRPF_CATALUNA_BRACKETS;
        case Region.ANDALUCIA: return IRPF_ANDALUCIA_BRACKETS;
        default: return IRPF_GENERAL_BRACKETS; // Fallback
    }
}

export function calculateFromGross(grossAnnual: number, info: PersonalInfo): CalculationResult {
    const ss = calculateSocialSecurity(grossAnnual);
    const baseLiquidable = Math.max(0, grossAnnual - ss.total - 2000);
    const personalMinimum = calculatePersonalMinimum(info);

    let irpfTaxAmount = 0;
    let statePortion = 0;
    let regionalPortion = 0;

    if (info.region === Region.GENERAL) {
        // Cálculo Directo Estatal
        const totalTaxBeforeMinimums = calculateProgressiveTax(baseLiquidable, IRPF_GENERAL_BRACKETS);
        const taxDiscountForMinimums = calculateProgressiveTax(personalMinimum, IRPF_GENERAL_BRACKETS);
        irpfTaxAmount = Math.max(0, totalTaxBeforeMinimums - taxDiscountForMinimums);
    } else {
        // 1. Fracción Estatal Ajustada
        const stateTaxBeforeMins = calculateProgressiveTax(baseLiquidable, IRPF_STATE_AUTONOMIC_BRACKETS);
        const stateDiscountForMins = calculateProgressiveTax(personalMinimum, IRPF_STATE_AUTONOMIC_BRACKETS);
        statePortion = Math.max(0, stateTaxBeforeMins - stateDiscountForMins);

        // 2. Fracción Autonómica (Paralela)
        const regionalBrackets = getRegionalBrackets(info.region);
        const regTaxBeforeMins = calculateProgressiveTax(baseLiquidable, regionalBrackets);
        const regDiscountForMins = calculateProgressiveTax(personalMinimum, regionalBrackets);
        regionalPortion = Math.max(0, regTaxBeforeMins - regDiscountForMins);

        // Suma
        irpfTaxAmount = statePortion + regionalPortion;
    }

    const netAnnual = grossAnnual - ss.total - irpfTaxAmount;

    let netMonthly = 0;
    let extraPaymentAmount = 0;
    const irpfMonthlyRatio = irpfTaxAmount / info.payments;

    if (info.payments === 12) {
        netMonthly = netAnnual / 12;
    } else {
        const grossBaseMonthly = grossAnnual / 14;
        const ssMonthlyIn12 = ss.total / 12;
        netMonthly = grossBaseMonthly - ssMonthlyIn12 - irpfMonthlyRatio;
        extraPaymentAmount = grossBaseMonthly - irpfMonthlyRatio;
    }

    const employerCosts = calculateEmployerSocialSecurity(grossAnnual);

    return {
        grossAnnual,
        grossMonthly: grossAnnual / info.payments,
        netAnnual,
        netMonthly,
        extraPaymentAmount,
        socialSecurity: ss,
        irpf: {
            base: baseLiquidable,
            taxAmount: irpfTaxAmount,
            statePortion: info.region !== Region.GENERAL ? statePortion : undefined,
            regionalPortion: info.region !== Region.GENERAL ? regionalPortion : undefined,
            percent: parseFloat(((irpfTaxAmount / grossAnnual) * 100).toFixed(2)) || 0,
        },
        employerCosts
    };
}

export function calculateFromNet(targetNetAnnual: number, info: PersonalInfo): CalculationResult {
    let low = targetNetAnnual;
    let high = targetNetAnnual * 2.5;
    let bestAttempt = calculateFromGross(targetNetAnnual, info);

    for (let i = 0; i < 50; i++) {
        const midGross = (low + high) / 2;
        bestAttempt = calculateFromGross(midGross, info);

        if (Math.abs(bestAttempt.netAnnual - targetNetAnnual) < 0.01) {
            break;
        }

        if (bestAttempt.netAnnual < targetNetAnnual) {
            low = midGross;
        } else {
            high = midGross;
        }
    }

    return bestAttempt;
}
