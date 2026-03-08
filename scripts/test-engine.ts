import { calculateFromGross, calculateFromNet, PersonalInfo } from '../src/lib/salary-engine';
import { Region } from '../src/lib/types';

const baseInfo: PersonalInfo = { age: 30, disabilityDegree: 0, childrenCount: 0, payments: 12, region: Region.GENERAL };

console.log("--- TEST AUTONÓMICO: BRUTO (30.000€) A NETO ---");
const grossGeneral = calculateFromGross(30000, { ...baseInfo, region: Region.GENERAL });
const grossMadrid = calculateFromGross(30000, { ...baseInfo, region: Region.MADRID });
const grossCataluna = calculateFromGross(30000, { ...baseInfo, region: Region.CATALUNA });

console.log(`[GENERAL]  Neto Anual: ${grossGeneral.netAnnual.toFixed(2)} € | IRPF: ${grossGeneral.irpf.taxAmount.toFixed(2)} €`);
console.log(`[MADRID]   Neto Anual: ${grossMadrid.netAnnual.toFixed(2)} € | IRPF: ${grossMadrid.irpf.taxAmount.toFixed(2)} € `);
console.log(`[CATALUÑA] Neto Anual: ${grossCataluna.netAnnual.toFixed(2)} € | IRPF: ${grossCataluna.irpf.taxAmount.toFixed(2)} € `);

console.log("\n--- TEST AUTONÓMICO DE CONVERGENCIA INVERSA: NETO (25.000€) A BRUTO ---");
const targetNet = 25000;
const netMadrid = calculateFromNet(targetNet, { ...baseInfo, region: Region.MADRID });
const netCataluna = calculateFromNet(targetNet, { ...baseInfo, region: Region.CATALUNA });

console.log(`[MADRID] Para ganar 25.000€ limpios, necesitas pedir un Bruto de: ${netMadrid.grossAnnual.toFixed(2)} €`);
console.log(`[MADRID] Desviación Matemática Búsqueda Binaria: ${Math.abs(netMadrid.netAnnual - targetNet).toFixed(4)} €`);

console.log(`[CATALUÑA] Para ganar 25.000€ limpios, necesitas pedir un Bruto de: ${netCataluna.grossAnnual.toFixed(2)} €`);
console.log(`[CATALUÑA] Desviación Matemática Búsqueda Binaria: ${Math.abs(netCataluna.netAnnual - targetNet).toFixed(4)} €`);
