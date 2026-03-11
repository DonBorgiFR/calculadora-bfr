import {
    SS_CONSTANTS,
    PERSONAL_MINIMUMS,
    IRPF_GENERAL_BRACKETS,
    IRPF_STATE_AUTONOMIC_BRACKETS,
    IRPF_MADRID_BRACKETS,
    IRPF_CATALUNA_BRACKETS,
    IRPF_ANDALUCIA_BRACKETS,
    IRPF_VALENCIA_BRACKETS,
    IRPF_GALICIA_BRACKETS,
    IRPF_BALEARES_BRACKETS
} from './tax-constants';
import { Region } from './types';
import type { IRPFBracket, FinancialInsightsResult } from './types';

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
    financialInsights: {
        budgetRule: { needs: number; wants: number; savings: number };
        maxMortgage: number;
        hourlyLifeValue: number;
        investment?: {
            monthlyContribution: number;
            projected10Years: number;
        };
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

    // Tramos familiares (Hijos)
    if (info.childrenCount >= 1) minimum += PERSONAL_MINIMUMS.CHILD_1;
    if (info.childrenCount >= 2) minimum += PERSONAL_MINIMUMS.CHILD_2;
    if (info.childrenCount >= 3) minimum += PERSONAL_MINIMUMS.CHILD_3;
    if (info.childrenCount >= 4) {
        const extraChildren = info.childrenCount - 3;
        minimum += PERSONAL_MINIMUMS.CHILD_4_PLUS * extraChildren;
    }

    return minimum;
}

function getRegionalBrackets(region: Region): IRPFBracket[] {
    switch (region) {
        case Region.MADRID: return IRPF_MADRID_BRACKETS;
        case Region.CATALUNA: return IRPF_CATALUNA_BRACKETS;
        case Region.ANDALUCIA: return IRPF_ANDALUCIA_BRACKETS;
        case Region.VALENCIA: return IRPF_VALENCIA_BRACKETS;
        case Region.GALICIA: return IRPF_GALICIA_BRACKETS;
        case Region.BALEARES: return IRPF_BALEARES_BRACKETS;
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

    // Inversión teórica basada en la regla 50/30/20 (20% de ahorro ahorrado consistentemente)
    const genericSavings = netMonthly * 0.20;
    const invRate = 0.07 / 12; // 7% anual
    const genericProjected10Years = genericSavings * ((Math.pow(1 + invRate, 120) - 1) / invRate) * (1 + invRate);

    // KI: Inteligencia Financiera
    const financialInsights = {
        budgetRule: {
            needs: netMonthly * 0.50,
            wants: netMonthly * 0.30,
            savings: genericSavings
        },
        // 30% del sueldo neto
        maxMortgage: netMonthly * 0.30,
        // Jornada estándar de 1760h / 12 meses -> ~146.6h mes. O Net Anual / 1760.
        // Vamos a usar Net Annual / 1760
        hourlyLifeValue: netAnnual / 1760,
        investment: {
            monthlyContribution: genericSavings,
            projected10Years: genericProjected10Years
        }
    };

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
        employerCosts,
        financialInsights
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

export function calculateInsights(
    netMonthly: number,
    expenses: { housing: number; food: number; utilities: number; transport: number; pets: number; insurance: number; leisure: number; subscriptions: number; sports: number; travel: number }
): FinancialInsightsResult {
    const needsActual = expenses.housing + expenses.food + expenses.utilities + expenses.transport + expenses.pets + expenses.insurance;
    const wantsActual = expenses.leisure + expenses.subscriptions + expenses.sports + expenses.travel;
    const totalExpenses = needsActual + wantsActual;
    const savingsActual = Math.max(netMonthly - totalExpenses, 0);

    const needsTarget = netMonthly * 0.50;
    const wantsTarget = netMonthly * 0.30;
    const savingsTarget = netMonthly * 0.20;

    // Regla Hipoteca Banco de España: 35% máximo de capacidad de endeudamiento.
    // Además, limitamos a la capacidad real de ahorro.
    // Calculo financiero de capital máximo: Valor Actual de una Anualidad (Préstamo Francés).
    // Interés asumido 3.5% anual (0.035 / 12), a 30 años (360 meses).
    const maxMonthlyPayment = Math.max(0, Math.min(netMonthly * 0.35, savingsActual));
    const monthlyRate = 0.035 / 12;
    const numPayments = 360; // 30 years
    const maxLoanAmount = maxMonthlyPayment * ((1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate);

    // Valor Tiempo: Asumiendo jornada completa normalizada legal 160h.
    const hourlyRate = netMonthly / 160;

    // Inversión: Proyección a 10 años (120 meses) con interés anual del 7% (0.07 / 12)
    const investmentRate = 0.07 / 12;
    const investmentMonths = 120; // 10 years
    let projected10Years = 0;
    if (savingsActual > 0) {
        projected10Years = savingsActual * ((Math.pow(1 + investmentRate, investmentMonths) - 1) / investmentRate) * (1 + investmentRate);
    }

    return {
        rule503020: {
            needsTarget,
            wantsTarget,
            savingsTarget,
            needsActual,
            wantsActual,
            savingsActual
        },
        mortgage: {
            maxMonthlyPayment,
            maxLoanAmount
        },
        timeValue: {
            hourlyRate
        },
        investment: {
            monthlyContribution: savingsActual,
            projected10Years
        }
    };
}
