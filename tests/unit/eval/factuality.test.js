// ============================================================
// Factuality checker — detect orphan numbers in Claude output
// ============================================================
import { describe, it, expect } from 'vitest';
import { checkNumbersMatch, collectNumbers } from '../../../eval/lib/factuality.js';

describe('collectNumbers', () => {
    it('finds numbers in nested objects', () => {
        const out = collectNumbers({ a: 1, b: { c: [2, 3], d: '4.5 million' } });
        expect(out.has(1)).toBe(true);
        expect(out.has(2)).toBe(true);
        expect(out.has(3)).toBe(true);
        expect(out.has(4.5)).toBe(true);
    });

    it('adds rounded and millions-form variants for large numbers', () => {
        const out = collectNumbers({ revenue: 12_345_678 });
        // Original + millions form (~12.3) should both be present
        expect(out.has(12_345_678)).toBe(true);
        expect([...out].some(n => Math.abs(n - 12.3) < 0.2)).toBe(true);
    });
});

describe('checkNumbersMatch', () => {
    it('passes when all numbers in text come from inputs', () => {
        const inputs = { admits: 12, revenue: 1_234_000 };
        const text = 'วันนี้มีผู้ป่วยใน 12 ราย รายได้ 1,234,000 บาท';
        const r = checkNumbersMatch(text, inputs);
        expect(r.pass).toBe(true);
        expect(r.orphans).toEqual([]);
    });

    it('fails when text invents a number', () => {
        const inputs = { admits: 12 };
        const text = 'วันนี้มีผู้ป่วยใน 12 ราย รับยา 99999 คน';  // 99999 not in inputs
        const r = checkNumbersMatch(text, inputs);
        expect(r.pass).toBe(false);
        expect(r.orphans).toContain(99999);
    });

    it('accepts close-enough numbers (rounding tolerance)', () => {
        const inputs = { pct: 0.7523 };
        const text = 'อัตรา 75% เป้าหมายอยู่ที่ 0.75';
        const r = checkNumbersMatch(text, inputs);
        // 75 from "75%" and 0.75 should both be considered close to 0.7523 via rounded variants
        expect(r.pass).toBe(true);
    });
});
