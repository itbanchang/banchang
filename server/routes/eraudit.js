// ============================================================
// BCH 360° Intelligence V.10 — ER Audit (รายงานยานบาลฉาง)
// ER visits broken down by Tambon × Trauma/Non-Trauma + Disease cohorts
// (Stroke / STEMI / Sepsis / Trauma) — covers อ.บ้านฉาง catchment only
// ============================================================
import { Router } from 'express';
import { z } from 'zod';
import { validateQuery } from '../middleware/validate.js';
import { dbQuery, dbQueryHeavy } from '../db/mysql.js';
import logger from '../logger.js';

const router = Router();

// ── Tambon registry (อำเภอบ้านฉาง จังหวัดระยอง) ───────────────
// HOSxP encodes address as chwpart(2) + amppart(2) + tmbpart(2).
// All three tambon belong to อำเภอบ้านฉาง (จังหวัดระยอง = 21, อำเภอ = 02).
const TAMBON_META = [
  { code: '210201', tmb: '01', name: 'สำนักท้อน' },
  { code: '210202', tmb: '02', name: 'พลา' },
  { code: '210203', tmb: '03', name: 'บ้านฉาง' },
];

// ── Validation schemas ────────────────────────────────────────
const dateRangeSchema = z.object({
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

// ── GET /summary — monthly aggregate per tambon × er_pt_type ──
// Returns one row per (year-month, tambon) with trauma / non_trauma counts.
// Frontend slices this client-side for type filter, yearly stacks, donuts.
router.get('/summary', validateQuery(dateRangeSchema), async (req, res) => {
  try {
    const from = req.query.from || '2023-01-01';
    const to = req.query.to || '2026-12-31';

    // NOTE: GROUP BY uses raw `p.tmbpart` (not the `addressid` alias). MariaDB 10.1
    // collapses the addressid concat alias unexpectedly here — see SQL probe history.
    const cacheKey = `eraudit_summary_v2_${from}_${to}`;
    const rows = await dbQueryHeavy(cacheKey, 30, `
      SELECT
        DATE_FORMAT(e.vstdate, '%Y-%m') AS ym,
        CONCAT(p.chwpart, p.amppart, p.tmbpart) AS addressid,
        p.tmbpart AS tmb,
        SUM(CASE WHEN e.er_pt_type = '2' THEN 1 ELSE 0 END) AS trauma,
        SUM(CASE WHEN e.er_pt_type IS NULL OR e.er_pt_type != '2' THEN 1 ELSE 0 END) AS non_trauma,
        COUNT(*) AS total
      FROM er_regist e
      JOIN ovst o ON o.vn = e.vn
      JOIN patient p ON p.hn = o.hn
      WHERE e.vstdate BETWEEN ? AND ?
        AND p.chwpart = '21' AND p.amppart = '02'
        AND p.tmbpart IN ('01', '02', '03')
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m'), p.chwpart, p.amppart, p.tmbpart
      ORDER BY ym, addressid
    `, [from, to], { timeoutMs: 30000 });

    const enriched = (rows || []).map(r => {
      const meta = TAMBON_META.find(t => t.tmb === r.tmb);
      return {
        ym: r.ym,
        addressid: r.addressid,
        tambon: meta?.name || r.addressid,
        trauma: Number(r.trauma || 0),
        non_trauma: Number(r.non_trauma || 0),
        total: Number(r.total || 0),
      };
    });

    res.json({
      data_source: 'HOSxP XE · er_regist + ovst + patient (อ.บ้านฉาง)',
      rows: enriched,
      tambon_meta: TAMBON_META,
      from, to,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    logger.error('eraudit/summary failed', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// ── GET /diseases — disease cohort × tambon × month ──────────
// Stroke (I60-I64) / STEMI (I21.x) / Sepsis (A40/A41/R65.2) / Trauma (er_pt_type=2)
// Per tambon, per month, primary diagnosis only (diagtype = 1).
router.get('/diseases', validateQuery(dateRangeSchema), async (req, res) => {
  try {
    const from = req.query.from || '2023-01-01';
    const to = req.query.to || '2026-12-31';

    const cacheKey = `eraudit_diseases_v3_psy_${from}_${to}`;
    const rows = await dbQueryHeavy(cacheKey, 30, `
      SELECT
        DATE_FORMAT(e.vstdate, '%Y-%m') AS ym,
        CONCAT(p.chwpart, p.amppart, p.tmbpart) AS addressid,
        SUM(CASE WHEN od.icd10 REGEXP '^I6[0-4]' THEN 1 ELSE 0 END) AS stroke,
        SUM(CASE WHEN od.icd10 LIKE 'I21%' THEN 1 ELSE 0 END) AS stemi,
        SUM(CASE WHEN od.icd10 IN ('A40','A41','R652') OR od.icd10 LIKE 'A40%' OR od.icd10 LIKE 'A41%' THEN 1 ELSE 0 END) AS sepsis,
        SUM(CASE WHEN od.icd10 LIKE 'F%' THEN 1 ELSE 0 END) AS psychological
      FROM er_regist e
      JOIN ovst o ON o.vn = e.vn
      JOIN patient p ON p.hn = o.hn
      LEFT JOIN ovstdiag od ON od.vn = e.vn AND od.diagtype = '1'
      WHERE e.vstdate BETWEEN ? AND ?
        AND p.chwpart = '21' AND p.amppart = '02'
        AND p.tmbpart IN ('01', '02', '03')
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m'), p.chwpart, p.amppart, p.tmbpart
      ORDER BY ym, addressid
    `, [from, to], { timeoutMs: 30000 });

    res.json({
      data_source: 'HOSxP XE · er_regist + ovstdiag (primary dx, อ.บ้านฉาง)',
      rows: (rows || []).map(r => ({
        ym: r.ym,
        addressid: r.addressid,
        stroke: Number(r.stroke || 0),
        stemi: Number(r.stemi || 0),
        sepsis: Number(r.sepsis || 0),
        psychological: Number(r.psychological || 0),
      })),
      tambon_meta: TAMBON_META,
      icd_definitions: {
        stroke: 'I60–I64 (Cerebrovascular accident)',
        stemi: 'I21.x (ST-elevation Myocardial Infarction)',
        sepsis: 'A40/A41/R65.2 (Sepsis · Septic shock)',
        trauma: 'er_pt_type = 2 (rolled up from /summary)',
        psychological: 'F00–F99 (Mental & behavioural disorders, incl. Anxiety/PTSD/Depression/Substance use)',
      },
      from, to,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    logger.error('eraudit/diseases failed', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

export default router;
