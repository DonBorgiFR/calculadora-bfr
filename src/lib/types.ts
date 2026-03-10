export enum Region {
    GENERAL = 'general',
    MADRID = 'madrid',
    CATALUNA = 'cataluna',
    ANDALUCIA = 'andalucia',
    VALENCIA = 'valencia',
    GALICIA = 'galicia',
    BALEARES = 'baleares'
}

export interface IRPFBracket {
    upTo: number;
    rate: number;
}

export interface FinancialInsightsResult {
    rule503020: {
        needsTarget: number;
        wantsTarget: number;
        savingsTarget: number;
        needsActual: number;
        wantsActual: number;
        savingsActual: number;
    };
    mortgage: {
        maxMonthlyPayment: number;
        maxLoanAmount: number;
    };
    timeValue: {
        hourlyRate: number;
    };
}
