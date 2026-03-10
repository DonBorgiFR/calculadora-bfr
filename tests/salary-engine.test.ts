import { describe, it, expect } from 'vitest';
import { calculateFromGross, calculateFromNet } from '../src/lib/salary-engine';
import { Region } from '../src/lib/types';

describe('Salary Engine', () => {
    it('should calculate common gross to net accurately', () => {
        // Simple case: 30000 gross, 12 payments, single, no children, no disability, General
        const result = calculateFromGross(30000, {
            age: 30,
            disabilityDegree: 0,
            childrenCount: 0,
            payments: 12,
            region: Region.GENERAL
        });

        expect(result.grossAnnual).toBe(30000);
        expect(result.socialSecurity.total).toBeGreaterThan(0);
        expect(result.irpf.taxAmount).toBeGreaterThan(0);
        expect(result.netAnnual).toBeLessThan(30000);
        expect(Math.abs(result.netAnnual - (result.grossAnnual - result.socialSecurity.total - result.irpf.taxAmount))).toBeLessThan(0.01);
    });

    it('should calculate different IRPF for Madrid', () => {
        const info = { age: 30, disabilityDegree: 0, childrenCount: 0, payments: 12 as 12 | 14, region: Region.GENERAL };
        const resultGeneral = calculateFromGross(40000, info);

        const infoMadrid = { ...info, region: Region.MADRID };
        const resultMadrid = calculateFromGross(40000, infoMadrid);

        // Madrid usually has lower taxes
        expect(resultMadrid.irpf.taxAmount).not.toBe(resultGeneral.irpf.taxAmount);
    });

    it('should calculate net to gross efficiently', () => {
        const info = { age: 30, disabilityDegree: 0, childrenCount: 0, payments: 12 as 12 | 14, region: Region.GENERAL };
        const targetNetAnnual = 24000;

        const result = calculateFromNet(targetNetAnnual, info);

        // Allowed deviation is hardcoded to 0.01 in the loop
        expect(Math.abs(result.netAnnual - targetNetAnnual)).toBeLessThan(0.02);
        expect(result.grossAnnual).toBeGreaterThan(targetNetAnnual);
    });
});
