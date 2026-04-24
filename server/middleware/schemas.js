// ============================================================
// BCH 360° Intelligence V.10 — Shared Zod Validation Schemas
// Reusable query/param schemas for route validation
// ============================================================
import { z } from 'zod';

// ── Common query parameter schemas ──

/** Fiscal year comparison: ?fy1=2568&fy2=2569&start=YYYY-MM-DD&end=YYYY-MM-DD */
export const fiscalCompareQuery = z.object({
  fy1: z.coerce.number().int().min(2500).max(2700).optional(),
  fy2: z.coerce.number().int().min(2500).max(2700).optional(),
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

/** Numeric months/years for warehouse trends */
export const warehouseYearsQuery = z.object({
  years: z.coerce.number().int().min(1).max(20).optional(),
});

export const warehouseMonthsQuery = z.object({
  months: z.coerce.number().int().min(1).max(120).optional(),
});

/** AI forecast months */
export const forecastMonthsQuery = z.object({
  months: z.coerce.number().int().min(1).max(60).optional(),
});

/** EWS patient filter */
export const ewsPatientQuery = z.object({
  ward: z.string().max(20).optional(),
  level: z.enum(['low', 'medium', 'high', 'critical']).optional(),
});

/** AI insights role filter */
export const insightsQuery = z.object({
  role: z.string().max(30).optional(),
});

/** Executive export params */
export const exportDatasetParams = z.object({
  dataset: z.string().min(1).max(50),
});

export const exportMonthsQuery = z.object({
  months: z.coerce.number().int().min(1).max(120).optional(),
});

/** Infrastructure trigger */
export const triggerJobParams = z.object({
  name: z.string().min(1).max(100),
});
