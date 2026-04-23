// ============================================================
// EWS Engine — boundary tests for NEWS2 scoring
// ============================================================
import { describe, it, expect } from 'vitest';
import { calculateNEWS2 } from '../../../server/ai/ewsEngine.js';

describe('calculateNEWS2', () => {
    it('returns low risk with 0 score for normal vitals', () => {
        const r = calculateNEWS2({ rr: 16, o2sat: 98, bps: 120, pulse: 72, temperature: 36.8 });
        expect(r.total_score).toBe(0);
        expect(r.risk_level).toBe('low');
        expect(r.has_red_flag).toBe(false);
    });

    it('flags critical for severe vitals', () => {
        const r = calculateNEWS2({ rr: 26, o2sat: 90, bps: 85, pulse: 135, temperature: 35.0 });
        expect(r.total_score).toBeGreaterThanOrEqual(7);
        expect(r.risk_level).toBe('critical');
        expect(r.has_red_flag).toBe(true);
    });

    it('handles missing vitals (all undefined) as low risk', () => {
        const r = calculateNEWS2({});
        expect(r.total_score).toBe(0);
        expect(r.risk_level).toBe('low');
    });

    it('supports alternate field names', () => {
        const r1 = calculateNEWS2({ rr: 12, o2sat: 98, bps: 120, pulse: 72, temperature: 37 });
        const r2 = calculateNEWS2({ rr: 12, spo2: 98, systolic_bp: 120, heart_rate: 72, temp: 37 });
        expect(r1.total_score).toBe(r2.total_score);
    });

    describe('RR boundaries', () => {
        it.each([
            [{ rr: 8 }, 3, true],      // ≤ 8 → 3 pts + red flag
            [{ rr: 10 }, 1, false],    // 9-11 → 1 pt
            [{ rr: 16 }, 0, false],    // 12-20 → 0 pts
            [{ rr: 22 }, 2, false],    // 21-24 → 2 pts
            [{ rr: 26 }, 3, true],     // ≥ 25 → 3 pts + red flag
        ])('RR %j scores %d pts (red flag: %s)', (vitals, expected, redFlag) => {
            const r = calculateNEWS2({ ...vitals, o2sat: 98, bps: 120, pulse: 72, temperature: 37 });
            expect(r.breakdown.respiratory_rate.score).toBe(expected);
            expect(r.breakdown.respiratory_rate.flag).toBe(redFlag);
        });
    });

    describe('SpO2 boundaries', () => {
        it.each([
            [{ o2sat: 91 }, 3],
            [{ o2sat: 93 }, 2],
            [{ o2sat: 95 }, 1],
            [{ o2sat: 98 }, 0],
        ])('SpO2 %j scores %d pts', (vitals, expected) => {
            const r = calculateNEWS2({ rr: 16, ...vitals, bps: 120, pulse: 72, temperature: 37 });
            expect(r.breakdown.spo2.score).toBe(expected);
        });
    });
});
