// ============================================================
// BCH 360° Intelligence V.10 — Disease Surveillance Routes
// อ้างอิง: พรบ.โรคติดต่อ พ.ศ. 2558 + ประกาศ ก.สธ.
// ติดตามรายงานผู้ป่วยโรคติดต่ออันตราย (ม.3) + เฝ้าระวัง (ม.5)
// Data: ovst + ovstdiag + vn_stat (OPD)   ·   an_stat (IPD)
// ============================================================
import { Router } from 'express';
import { dbQueryHeavy } from '../db/mysql.js';
import { DANGEROUS_DISEASES, WATCH_DISEASES } from '../data/diseaseSurveillanceCodes.js';
import logger from '../logger.js';

const router = Router();

const ROLLING_DAYS = 30; // ดูย้อนหลัง 30 วัน

// Build a SQL LIKE/OR clause for a single disease's codes.
// Codes like "A98.0" matched as: icd10='A98.0' OR icd10 LIKE 'A98.0%'.
// Use `prefix` flag to also match without the dot ('A980').
function buildOrClause(column, codes) {
  const parts = [];
  const params = [];
  for (const c of codes) {
    parts.push(`${column} = ?`, `${column} LIKE ?`);
    params.push(c, `${c}%`);
    if (c.includes('.')) {
      const noDot = c.replace('.', '');
      parts.push(`${column} = ?`, `${column} LIKE ?`);
      params.push(noDot, `${noDot}%`);
    }
  }
  return { sql: parts.join(' OR '), params };
}

// Lightweight per-disease count query — OPD (ovstdiag + ovst) and IPD (an_stat.pdx)
// Cache 30 min per disease (ICD-10 results are slow-moving; ER will see the patient long before this card refreshes anyway)
async function countDisease(diseaseKey, codes, section, fromDate) {
  const { sql: opdWhere, params: opdParams } = buildOrClause('od.icd10', codes);
  const { sql: ipdWhere, params: ipdParams } = buildOrClause('a.pdx',    codes);

  const cacheKey = `dsv_${section}_${diseaseKey}_${fromDate}`;

  const [opdRows, ipdRows] = await Promise.all([
    dbQueryHeavy(
      `${cacheKey}_opd`, 30,
      `SELECT COUNT(DISTINCT o.vn) AS visits,
              COUNT(DISTINCT o.hn) AS patients,
              MAX(o.vstdate)        AS latest_date
       FROM ovst o
       INNER JOIN ovstdiag od ON o.vn = od.vn
       WHERE o.vstdate >= ?
         AND (${opdWhere})`,
      [fromDate, ...opdParams]
    ).catch(err => {
      logger.warn(`[diseaseSurveillance] OPD query failed for ${diseaseKey}: ${err.message}`);
      return [{ visits: 0, patients: 0, latest_date: null }];
    }),
    dbQueryHeavy(
      `${cacheKey}_ipd`, 30,
      `SELECT COUNT(DISTINCT a.an) AS admissions,
              COUNT(DISTINCT a.hn) AS patients,
              MAX(a.dchdate)       AS latest_date
       FROM an_stat a
       WHERE a.dchdate >= ?
         AND (${ipdWhere})`,
      [fromDate, ...ipdParams]
    ).catch(err => {
      logger.warn(`[diseaseSurveillance] IPD query failed for ${diseaseKey}: ${err.message}`);
      return [{ admissions: 0, patients: 0, latest_date: null }];
    }),
  ]);

  const opd = opdRows[0] || {};
  const ipd = ipdRows[0] || {};
  const latest = [opd.latest_date, ipd.latest_date]
    .filter(Boolean)
    .map(d => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d).slice(0, 10)))
    .sort()
    .pop() || null;

  return {
    opd_visits: Number(opd.visits) || 0,
    ipd_admissions: Number(ipd.admissions) || 0,
    patients: (Number(opd.patients) || 0) + (Number(ipd.patients) || 0),
    latest_date: latest,
  };
}

// ── GET /api/disease-surveillance/active ────────────────────
// Returns alert summary for the last 30 days, grouped by section.
// Light enough to call on every dashboard load (cached at HOSxP layer).
router.get('/active', async (req, res) => {
  try {
    const today = new Date();
    const from = new Date(today.getTime() - ROLLING_DAYS * 86400000)
      .toISOString().slice(0, 10);

    // Run all diseases in parallel (~ 1 SQL each — ovstdiag has index on icd10)
    const [dangerousResults, watchResults] = await Promise.all([
      Promise.all(DANGEROUS_DISEASES.map(async d => ({
        ...d,
        ...(await countDisease(d.key, d.codes, 'dangerous', from)),
      }))),
      Promise.all(WATCH_DISEASES.map(async d => ({
        ...d,
        ...(await countDisease(d.key, d.codes, 'watch', from)),
      }))),
    ]);

    // Strip diseases with zero hits to keep payload small
    const dangerous = dangerousResults.filter(d => d.patients > 0)
      .sort((a, b) => b.patients - a.patients);
    const watch = watchResults.filter(d => d.patients > 0)
      .sort((a, b) => b.patients - a.patients);

    const summary = {
      window_days: ROLLING_DAYS,
      from,
      to: today.toISOString().slice(0, 10),
      dangerous_count: dangerous.reduce((s, d) => s + d.patients, 0),
      dangerous_diseases: dangerous.length,
      watch_count: watch.reduce((s, d) => s + d.patients, 0),
      watch_diseases: watch.length,
      // alert level: red if any dangerous case, amber if watch only, none otherwise
      level: dangerous.length > 0 ? 'critical' :
             watch.length      > 0 ? 'warn'     : 'none',
      dangerous,
      watch,
      generated_at: new Date().toISOString(),
      legal_reference: 'พระราชบัญญัติโรคติดต่อ พ.ศ. 2558 (ม.3 + ม.5)',
    };

    res.json(summary);
  } catch (e) {
    logger.error(`[diseaseSurveillance] /active failed: ${e.message}`);
    res.status(500).json({ error: e.message });
  }
});

// ── Per-disease tambon breakdown (patient address) ───────────
// Returns OPD/IPD patient counts grouped by ตำบล/อำเภอ/จังหวัด.
// Joins ovstdiag/an_stat to patient.{chwpart,amppart,tmbpart} → thaiaddress (codetype='3').
async function tambonBreakdown(diseaseKey, codes, section, fromDate) {
  const { sql: opdWhere, params: opdParams } = buildOrClause('od.icd10', codes);
  const { sql: ipdWhere, params: ipdParams } = buildOrClause('a.pdx',    codes);

  const cacheKey = `dsv_tambon_${section}_${diseaseKey}_${fromDate}`;

  const [opdRows, ipdRows] = await Promise.all([
    dbQueryHeavy(
      `${cacheKey}_opd`, 30,
      `SELECT p.chwpart, p.amppart, p.tmbpart,
              COUNT(DISTINCT o.vn) AS visits,
              COUNT(DISTINCT o.hn) AS patients,
              MAX(o.vstdate)       AS latest_date
         FROM ovst o
         INNER JOIN ovstdiag od ON o.vn = od.vn
         INNER JOIN patient   p  ON o.hn = p.hn
         WHERE o.vstdate >= ?
           AND (${opdWhere})
         GROUP BY p.chwpart, p.amppart, p.tmbpart`,
      [fromDate, ...opdParams]
    ).catch(err => {
      logger.warn(`[diseaseSurveillance] OPD tambon query failed for ${diseaseKey}: ${err.message}`);
      return [];
    }),
    dbQueryHeavy(
      `${cacheKey}_ipd`, 30,
      `SELECT p.chwpart, p.amppart, p.tmbpart,
              COUNT(DISTINCT a.an) AS admissions,
              COUNT(DISTINCT a.hn) AS patients,
              MAX(a.dchdate)       AS latest_date
         FROM an_stat a
         INNER JOIN patient p ON a.hn = p.hn
         WHERE a.dchdate >= ?
           AND (${ipdWhere})
         GROUP BY p.chwpart, p.amppart, p.tmbpart`,
      [fromDate, ...ipdParams]
    ).catch(err => {
      logger.warn(`[diseaseSurveillance] IPD tambon query failed for ${diseaseKey}: ${err.message}`);
      return [];
    }),
  ]);

  const merged = new Map();
  const keyOf = r => `${r.chwpart || ''}_${r.amppart || ''}_${r.tmbpart || ''}`;
  const toIsoDate = d => (d instanceof Date ? d.toISOString().slice(0, 10) :
                        (d ? String(d).slice(0, 10) : null));

  for (const r of opdRows) {
    merged.set(keyOf(r), {
      chwpart: r.chwpart, amppart: r.amppart, tmbpart: r.tmbpart,
      opd_visits:     Number(r.visits)     || 0,
      ipd_admissions: 0,
      patients:       Number(r.patients)   || 0,
      latest_date:    toIsoDate(r.latest_date),
    });
  }
  for (const r of ipdRows) {
    const k = keyOf(r);
    if (!merged.has(k)) {
      merged.set(k, {
        chwpart: r.chwpart, amppart: r.amppart, tmbpart: r.tmbpart,
        opd_visits: 0, ipd_admissions: 0, patients: 0, latest_date: null,
      });
    }
    const e = merged.get(k);
    e.ipd_admissions = Number(r.admissions) || 0;
    e.patients      += Number(r.patients)   || 0;
    const ipdLatest = toIsoDate(r.latest_date);
    if (ipdLatest && (!e.latest_date || ipdLatest > e.latest_date)) e.latest_date = ipdLatest;
  }

  // Resolve tambon names from thaiaddress (cache 24h, single shared lookup)
  const nameRows = await dbQueryHeavy(
    'dsv_thaiaddress_tambon_names', 1440,
    `SELECT chwpart, amppart, tmbpart, name, full_name
       FROM thaiaddress
       WHERE codetype = '3'`,
    []
  ).catch(err => {
    logger.warn(`[diseaseSurveillance] thaiaddress lookup failed: ${err.message}`);
    return [];
  });
  const nameMap = new Map();
  for (const r of nameRows) nameMap.set(`${r.chwpart}_${r.amppart}_${r.tmbpart}`, { name: r.name, full_name: r.full_name });

  return [...merged.values()]
    .filter(e => e.patients > 0)
    .map(e => {
      const k = `${e.chwpart}_${e.amppart}_${e.tmbpart}`;
      const lookup = nameMap.get(k) || {};
      return {
        ...e,
        tambon_name: lookup.name || (e.tmbpart ? `(ตำบล ${e.tmbpart})` : '(ไม่ระบุที่อยู่)'),
        full_name:   lookup.full_name || null,
      };
    })
    .sort((a, b) => b.patients - a.patients);
}

// ── GET /api/disease-surveillance/by-tambon ──────────────────
// Query: ?key=covid19&section=dangerous   (section ∈ dangerous|watch)
router.get('/by-tambon', async (req, res) => {
  try {
    const { key, section = 'watch' } = req.query;
    if (!key) return res.status(400).json({ error: 'missing required query param: key' });

    const list = section === 'dangerous' ? DANGEROUS_DISEASES : WATCH_DISEASES;
    const disease = list.find(d => d.key === key);
    if (!disease) return res.status(404).json({ error: `unknown disease key: ${key}` });

    const today = new Date();
    const from = new Date(today.getTime() - ROLLING_DAYS * 86400000)
      .toISOString().slice(0, 10);

    const tambons = await tambonBreakdown(key, disease.codes, section, from);

    res.json({
      disease,
      section,
      window_days:    ROLLING_DAYS,
      from,
      to:             today.toISOString().slice(0, 10),
      total_patients: tambons.reduce((s, r) => s + r.patients, 0),
      tambons,
      generated_at:   new Date().toISOString(),
    });
  } catch (e) {
    logger.error(`[diseaseSurveillance] /by-tambon failed: ${e.message}`);
    res.status(500).json({ error: e.message });
  }
});

// ── GET /api/disease-surveillance/catalog ────────────────────
// Returns full reference list (no DB hit) — for admin/audit views
router.get('/catalog', (req, res) => {
  res.json({
    legal_reference: 'พระราชบัญญัติโรคติดต่อ พ.ศ. 2558 + ประกาศ ก.สธ.',
    dangerous: DANGEROUS_DISEASES,
    watch:     WATCH_DISEASES,
  });
});

export default router;
