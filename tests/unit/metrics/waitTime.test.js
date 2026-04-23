// ============================================================
// Metric: opd.waitTime — classification + shape tests
// ============================================================
import { describe, it, expect, vi } from 'vitest';
import { classify, result } from '../../../server/metrics/_shared.js';
import { metric } from '../../../server/metrics/opd/waitTime.js';

describe('classify', () => {
    it('returns good below target', () => {
        expect(classify(30, metric.thresholds)).toBe('good');
    });

    it('returns warning above target but below danger', () => {
        expect(classify(50, metric.thresholds)).toBe('warning');
    });

    it('returns danger above warning', () => {
        expect(classify(70, metric.thresholds)).toBe('danger');
    });

    it('returns unknown for null/undefined', () => {
        expect(classify(null, metric.thresholds)).toBe('unknown');
        expect(classify(undefined, metric.thresholds)).toBe('unknown');
    });
});

describe('result', () => {
    it('includes metric id and status + color', () => {
        const r = result(metric, 30);
        expect(r.id).toBe(metric.id);
        expect(r.value).toBe(30);
        expect(r.status).toBe('good');
        expect(r.color).toMatch(/^#[0-9a-f]{6}$/i);
        expect(r.label).toEqual(metric.label);
    });

    it('passes through extras', () => {
        const r = result(metric, 50, { sample_size: 123 });
        expect(r.sample_size).toBe(123);
        expect(r.status).toBe('warning');
    });
});

describe('opd.waitTime metric shape', () => {
    it('declares required fields', () => {
        expect(metric).toMatchObject({
            id: expect.any(String),
            label: { th: expect.any(String), en: expect.any(String) },
            unit: expect.any(String),
            target: expect.any(Number),
            thresholds: expect.any(Object),
            owner: expect.any(String),
            reviewed: expect.any(String),
        });
    });

    it('reviewed date is ISO-ish (YYYY-MM-DD)', () => {
        expect(metric.reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
});
