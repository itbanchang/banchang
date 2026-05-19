// ============================================================
// BCH 360° — MR Audit (Medical Record / เวชระเบียน) routes
// ------------------------------------------------------------
// READ:  HOSxP XE (ipt, ipt_discharge, iptdiag, ipd_nurse_note,
//         ipt_discharge_summary_note, asm_discharge_planning, ward)
// WRITE: sidecar SQLite — table mr_audit_status (migration 004)
//
// Endpoints (all mounted under /api/mr-audit, auth = role 'medrec'):
//   GET  /summary               aggregate counts for KPI cards
//   GET  /list?ward=&from=&to=&status=&completeness=
//                                paginated AN list with completeness check
//   GET  /detail/:an            full AN detail (assessments + notes + audit history)
//   GET  /history/:an           audit history rows for one AN
//   POST /audit                 write a new audit row to sidecar
// ============================================================
import { Router } from 'express';
import { dbQueryHeavy, dbQuery } from '../db/mysql.js';
import sidecar from '../db/sidecar.js';
import logger from '../logger.js';

const router = Router();

// ── Date range helper (for Section 1 + Section 2 endpoints) ──
// Supports either ?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD (preferred)
// or ?days=N (fallback — last N days ending today).
function getDateRange(req, fallbackDays) {
    const s = String(req.query.start_date || '');
    const e = String(req.query.end_date || '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(s) && /^\d{4}-\d{2}-\d{2}$/.test(e)) {
        // Compute days span (inclusive)
        const sd = new Date(s + 'T00:00:00');
        const ed = new Date(e + 'T00:00:00');
        const days = Math.max(0, Math.round((ed - sd) / 86400000)) + 1;
        return { start: s, end: e, days, key: s + '_' + e };
    }
    const days = Math.min(parseInt(req.query.days) || fallbackDays, 365);
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);
    const startStr = startDate.toISOString().slice(0, 10);
    return { start: startStr, end: todayStr, days, key: 'd' + days };
}

// ── Sidecar prepared statements (built once, reused) ──
const stmtInsertAudit = sidecar.prepare(`
    INSERT INTO mr_audit_status (an, status, comment, flagged_items, audited_by)
    VALUES (?, ?, ?, ?, ?)
`);
const stmtLatestForAn = sidecar.prepare(`
    SELECT * FROM v_mr_audit_latest WHERE an = ?
`);
const stmtHistoryForAn = sidecar.prepare(`
    SELECT * FROM mr_audit_status WHERE an = ? ORDER BY audited_at DESC
`);
const stmtAllLatest = sidecar.prepare(`
    SELECT an, status, comment, flagged_items, audited_by, audited_at
    FROM   v_mr_audit_latest
`);

// ── Completeness scoring ──
// ════════════════════════════════════════════════════════════
// Phase I.4 (2026-05-15) — 20-point completeness audit
// per MRA Guideline 2563 (Section G roadmap Phase 1)
// ════════════════════════════════════════════════════════════
// Groups: A diagnosis(5) · B documentation(5) · C nursing+plan(5) · D discharge+mortality(5)
// NA-able: A5 (only if trauma PDX), C5 (only if DM admit), D5 (only if died)
// Score = passes / (20 - NAs) × 100  →  target ≥85%
// Backward-compat: pdx, dch_summary, nurse_notes, dch_plan keys preserved for UI.
const DEATH_DCHSTTS = new Set(['4', '04', '09', '9', '13']);

function scoreCompleteness(row) {
    const losDays = Math.max(1, row.los_days || 1);
    const noteDays = row.nurse_note_days || 0;
    const dchStts = String(row.dchstts ?? '').trim();
    const dchType = String(row.dchtype ?? '').trim();
    const summaryText = String(row.audit_summary_text ?? '').trim();
    const isTrauma = (row.pdx_is_trauma || 0) > 0;
    const isDM = (row.is_dm || 0) > 0;
    const died = DEATH_DCHSTTS.has(dchStts);

    // ── Group A: Diagnosis Specificity (5 checks, 1 NA-able) ──
    const A = {
        pdx_exists: (row.pdx_count || 0) > 0 ? 1 : 0,
        pdx_single: (row.pdx_count || 0) === 1 ? 1 : 0,
        pdx_not_z_code: (row.pdx_is_z_code || 0) === 0 ? 1 : 0,
        has_secondary_dx: (row.sdx_count || 0) > 0 ? 1 : 0,
        trauma_external_cause: isTrauma ? ((row.has_ext_cause || 0) > 0 ? 1 : 0) : 'na',
    };
    // ── Group B: Discharge Documentation Completeness (5) ──
    const B = {
        dch_summary_row: (row.dch_summary || 0) > 0 ? 1 : 0,
        dch_summary_filled: summaryText.length >= 50 ? 1 : 0,
        doc_confirmed_final: row.doc_summary === 'Y' ? 1 : 0,
        mr_audited: row.hosxp_mr_audit === 'Y' ? 1 : 0,
        coding_done: row.coding_done === 'Y' ? 1 : 0,
    };
    // ── Group C: Nursing / Discharge Plan (5, 1 NA-able) ──
    const C = {
        nurse_notes_cover_los: noteDays >= losDays ? 1 : 0,
        nurse_notes_dense: noteDays >= losDays * 2 ? 1 : 0,
        dch_plan_row: (row.dch_plan || 0) > 0 ? 1 : 0,
        los_reasonable: (row.los_days || 0) > 0 && (row.los_days || 0) < 60 ? 1 : 0,
        dtx_if_dm: isDM ? ((row.dtx_count || 0) > 0 ? 1 : 0) : 'na',
    };
    // ── Group D: Discharge / Mortality (5, 1 NA-able) ──
    const D = {
        dchstts_set: dchStts.length > 0 ? 1 : 0,
        dchtype_set: dchType.length > 0 ? 1 : 0,
        dch_doctor_set: (row.dch_doctor && String(row.dch_doctor).trim().length > 0) ? 1 : 0,
        ward_consistent: (row.ward && row.ward_name) ? 1 : 0,
        death_cause_coded: died ? ((row.has_death_cause_code || 0) > 0 ? 1 : 0) : 'na',
    };

    // Aggregate — count NAs out of denominator
    const allChecks = { ...A, ...B, ...C, ...D };
    let passes = 0, fails = 0, nas = 0;
    const failed_keys = [];
    for (const [k, v] of Object.entries(allChecks)) {
        if (v === 'na') nas++;
        else if (v === 1) passes++;
        else { fails++; failed_keys.push(k); }
    }
    const denom = 20 - nas;
    const score = denom > 0 ? Math.round((passes / denom) * 100) : 0;

    return {
        // 20-check breakdown
        groups: { A, B, C, D },
        passes, fails, nas, denominator: denom,
        failed_checks: failed_keys,
        score,                  // 0-100 (≥85% = pass)
        // Backward-compat keys (existing UI relies on these)
        pdx: A.pdx_exists,
        dch_summary: B.dch_summary_row,
        nurse_notes: C.nurse_notes_cover_los,
        dch_plan: C.dch_plan_row,
    };
}

// Phase I.4 — Static catalog of 20 checks for UI rendering + audit transparency
const AUDIT_CRITERIA = {
    version: '2563-phase1',
    target_pct: 85,
    benchmark: 'MRA Guideline 2563 (สรพ./สปสช.) — Section G Phase 1',
    groups: {
        A: {
            name: 'Diagnosis Specificity',
            section_2563: 'Section 1.1, 1.2',
            checks: [
                { key: 'pdx_exists', label: 'PDX exists (มี Principal Diagnosis)' },
                { key: 'pdx_single', label: 'Single PDX only (มี PDX ตัวเดียว)' },
                { key: 'pdx_not_z_code', label: 'PDX is specific (ไม่ใช่ Z-code symptom)' },
                { key: 'has_secondary_dx', label: 'Secondary Dx recorded (มีโรคร่วม/แทรก)' },
                { key: 'trauma_external_cause', label: 'External cause for trauma (NA if not trauma)' },
            ],
        },
        B: {
            name: 'Discharge Documentation',
            section_2563: 'Section 1.6, 1.9 + workflow',
            checks: [
                { key: 'dch_summary_row', label: 'Discharge Summary row exists' },
                { key: 'dch_summary_filled', label: 'Discharge Summary text ≥50 chars' },
                { key: 'doc_confirmed_final', label: 'Doctor confirmed Final Summary' },
                { key: 'mr_audited', label: 'HOSxP MR Audited' },
                { key: 'coding_done', label: 'Coding Done' },
            ],
        },
        C: {
            name: 'Nursing + Discharge Plan',
            section_2563: 'Section 12 + DTX',
            checks: [
                { key: 'nurse_notes_cover_los', label: 'Nursing Notes cover LOS' },
                { key: 'nurse_notes_dense', label: 'Nursing Notes ≥2/day (LOS×2)' },
                { key: 'dch_plan_row', label: 'Discharge Plan row exists' },
                { key: 'los_reasonable', label: 'LOS between 1 and 60 days' },
                { key: 'dtx_if_dm', label: 'DTX Sheet for DM admit (NA if not DM)' },
            ],
        },
        D: {
            name: 'Discharge / Mortality',
            section_2563: 'Section 1.7, 1.8, 1.9',
            checks: [
                { key: 'dchstts_set', label: 'Discharge status set' },
                { key: 'dchtype_set', label: 'Discharge type set' },
                { key: 'dch_doctor_set', label: 'Discharging doctor recorded' },
                { key: 'ward_consistent', label: 'Ward + name consistent' },
                { key: 'death_cause_coded', label: 'Cause of death coded if died (NA if alive)' },
            ],
        },
    },
};

// ── Build base SQL (LEFT JOINs + completeness sub-selects) ──
// Phase I.4 — extended with 7 new sub-selects for the 20-check audit:
//   pdx_is_z_code, pdx_is_trauma (Group A: specificity + trauma NA flag)
//   sdx_count                    (Group A: comorbidity)
//   has_ext_cause                (Group A: external cause)
//   is_dm                        (Group C: DTX NA flag)
//   dtx_count                    (Group C: DTX presence — already in summary, now per-row)
//   has_death_cause_code         (Group D: cause-of-death coding)
//   dchstts, dchtype (already in ipt.* — explicitly select)
function baseSql() {
    return `
        SELECT
            i.an, i.hn, i.ward, w.name AS ward_name,
            i.regdate, i.regtime, i.dchdate, i.dchtime,
            i.dchstts, i.dchtype,
            i.pttype, i.adjrw, i.rw, i.drg,
            i.admdoctor AS adm_doctor, i.dch_doctor,
            DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate) AS los_days,
            id.confirm_final_summary  AS doc_summary,
            id.confirm_audit_summary  AS hosxp_mr_audit,
            id.confirm_coding_summary AS coding_done,
            id.audit_summary_text,
            CONCAT(IFNULL(p.pname,''), IFNULL(p.fname,''), ' ', IFNULL(p.lname,'')) AS pt_name,
            (SELECT COUNT(*) FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') AS pdx_count,
            (SELECT MAX(CASE WHEN LEFT(d.icd10,1) = 'Z' THEN 1 ELSE 0 END)
                FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') AS pdx_is_z_code,
            (SELECT MAX(CASE WHEN LEFT(d.icd10,1) IN ('S','T') THEN 1 ELSE 0 END)
                FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') AS pdx_is_trauma,
            (SELECT COUNT(*) FROM iptdiag d WHERE d.an = i.an AND d.diagtype IN ('2','3','4','5')) AS sdx_count,
            (SELECT MAX(CASE WHEN LEFT(d.icd10,1) IN ('V','W','X','Y') THEN 1 ELSE 0 END)
                FROM iptdiag d WHERE d.an = i.an) AS has_ext_cause,
            (SELECT MAX(CASE WHEN d.icd10 BETWEEN 'E10' AND 'E149' THEN 1 ELSE 0 END)
                FROM iptdiag d WHERE d.an = i.an) AS is_dm,
            (SELECT COUNT(*) FROM assessment_head ah WHERE ah.vnan = i.an AND ah.assessment_form_id = 108) AS dtx_count,
            (SELECT MAX(CASE WHEN LEFT(d.icd10,1) = 'R' OR d.icd10 LIKE 'R96%' OR d.icd10 LIKE 'R98%' THEN 1 ELSE 0 END)
                FROM iptdiag d WHERE d.an = i.an) AS has_death_cause_code,
            (SELECT COUNT(*) FROM ipt_discharge_summary_note dsn WHERE dsn.an = i.an) AS dch_summary,
            (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an) AS nurse_note_days,
            (SELECT COUNT(*) FROM asm_discharge_planning dp WHERE dp.an = i.an) AS dch_plan
        FROM ipt i
        LEFT JOIN ipt_discharge id ON id.an = i.an
        LEFT JOIN ward w           ON w.ward = i.ward
        LEFT JOIN patient p        ON p.hn  = i.hn
    `;
}

// Phase I.4 — expose 20-check catalog for UI rendering
router.get('/audit-criteria', (req, res) => {
    res.json(AUDIT_CRITERIA);
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/summary
//   aggregate counts (no filter — last 30 days)
// ─────────────────────────────────────────────────────────────
router.get('/summary', async (req, res) => {
    try {
        const days = Math.min(parseInt(req.query.days) || 30, 365);
        const sql = `
            SELECT
                COUNT(*) AS total_disch,
                SUM(CASE WHEN id.confirm_final_summary  = 'Y' THEN 1 ELSE 0 END) AS doc_confirmed,
                SUM(CASE WHEN id.confirm_audit_summary  = 'Y' THEN 1 ELSE 0 END) AS hosxp_mr_audited,
                SUM(CASE WHEN id.confirm_coding_summary = 'Y' THEN 1 ELSE 0 END) AS coding_done,
                AVG(DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate)) AS avg_los
            FROM ipt i
            LEFT JOIN ipt_discharge id ON id.an = i.an
            WHERE i.dchdate IS NOT NULL
              AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
        `;
        // DTX Sheet completeness for DM admits (form_id=108 "[IPD]-[CHANG] DTX Sheet")
        // Counts admits with PDX OR secondary diagnosis E10-E14 (any DM type).
        const dtxSql = `
            SELECT
                COUNT(DISTINCT i.an) AS dm_admits,
                COUNT(DISTINCT CASE WHEN ah.assessment_head_id IS NOT NULL THEN i.an END) AS dm_with_dtx,
                COUNT(DISTINCT CASE WHEN ah.assessment_head_id IS NULL     THEN i.an END) AS dm_without_dtx
            FROM ipt i
            INNER JOIN iptdiag d ON d.an = i.an
            LEFT JOIN assessment_head ah ON ah.vnan = i.an AND ah.assessment_form_id = 108
            WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
              AND d.icd10 BETWEEN 'E10' AND 'E149'
        `;
        const [rows, dtxRows] = await Promise.all([
            dbQueryHeavy(`mr_audit_summary_${days}`, 5, sql),
            dbQueryHeavy(`mr_audit_dtx_dm_${days}`, 10, dtxSql),
        ]);
        const r = rows[0] || {};
        const dtx = dtxRows[0] || {};
        const dmTotal = Number(dtx.dm_admits || 0);
        const dmWithDtx = Number(dtx.dm_with_dtx || 0);
        const dmWithoutDtx = Number(dtx.dm_without_dtx || 0);

        // Sidecar audit status counts
        const sideRows = stmtAllLatest.all();
        const sideAn = new Set(sideRows.map(s => s.an));
        const sideCounts = sideRows.reduce((acc, s) => {
            acc[s.status] = (acc[s.status] || 0) + 1;
            return acc;
        }, {});

        res.json({
            data_source: 'HOSxP XE (ipt + ipt_discharge + iptdiag + assessment_head) + sidecar mr_audit_status',
            window_days: days,
            total_disch: Number(r.total_disch || 0),
            doc_confirmed: Number(r.doc_confirmed || 0),
            hosxp_mr_audited: Number(r.hosxp_mr_audited || 0),
            coding_done: Number(r.coding_done || 0),
            avg_los: Number(r.avg_los || 0).toFixed(1),
            mr_audit_in_sidecar: sideAn.size,
            mr_audit_by_status: sideCounts,
            dtx_dm: {
                dm_admits: dmTotal,
                dm_with_dtx: dmWithDtx,
                dm_without_dtx: dmWithoutDtx,
                completion_pct: dmTotal > 0 ? Math.round((dmWithDtx / dmTotal) * 1000) / 10 : 0,
            },
        });
    } catch (err) {
        logger.error('[mr-audit/summary]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/analytics
//   roll-up for the MRA dashboard tab:
//     • headline KPIs (total / complete% / avg score / confirmed/audited/coded%)
//     • monthly_trend (12 mo) → completeness rate per month
//     • by_ward + by_doctor breakdowns with defect mix
//     • defect_breakdown (Content vs Format)
// ─────────────────────────────────────────────────────────────
router.get('/analytics', async (req, res) => {
    try {
        // Default 90 days, cap 180. Slave1 has a 25s SQL timeout and the 4
        // correlated sub-selects in baseSql() are O(N rows) — 90d ≈ 3s, 180d ≈ 15s.
        const days = Math.min(parseInt(req.query.days) || 90, 180);
        // Phase I.4 (2026-05-15): cache key bumped — baseSql() + scoreCompleteness now 20-check
        const cacheKey = `mr_audit_analytics_v2_20check_${days}`;
        const sql = `
            ${baseSql()}
            WHERE i.dchdate IS NOT NULL
              AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
        `;
        const rows = await dbQueryHeavy(cacheKey, 15, sql);

        // Doctor name lookup (one cheap query, cached separately)
        const docRows = await dbQueryHeavy(
            'mr_audit_doctor_lookup', 1440,
            `SELECT code, name FROM doctor WHERE active = 'Y'`
        ).catch(() => []);
        const docName = new Map(docRows.map(d => [d.code, d.name]));

        // Score each row + tag content/format defects
        const scored = rows.map(r => {
            const c = scoreCompleteness(r);
            return { ...r, ...c };
        });

        // ── Headline KPIs ──
        const total = scored.length;
        const complete = scored.filter(r => r.score === 100).length;
        const partial  = scored.filter(r => r.score > 0 && r.score < 100).length;
        const empty    = scored.filter(r => r.score === 0).length;
        const avgScore = total > 0
            ? Math.round((scored.reduce((s, r) => s + r.score, 0) / total) * 10) / 10
            : 0;
        const docConfirmed = scored.filter(r => r.doc_summary === 'Y').length;
        const hosxpAudited = scored.filter(r => r.hosxp_mr_audit === 'Y').length;
        const codingDone   = scored.filter(r => r.coding_done   === 'Y').length;
        const pct = n => total > 0 ? Math.round((n / total) * 1000) / 10 : 0;

        // ── Monthly trend (last 12 months from now) ──
        const monthMap = new Map();
        for (const r of scored) {
            if (!r.dchdate) continue;
            const ym = (r.dchdate instanceof Date
                ? r.dchdate.toISOString().slice(0, 7)
                : String(r.dchdate).slice(0, 7));
            if (!monthMap.has(ym)) monthMap.set(ym, { ym, total: 0, score_sum: 0, complete: 0 });
            const m = monthMap.get(ym);
            m.total++;
            m.score_sum += r.score;
            if (r.score === 100) m.complete++;
        }
        const monthly_trend = [...monthMap.values()]
            .sort((a, b) => a.ym.localeCompare(b.ym))
            .map(m => ({
                ym: m.ym,
                total: m.total,
                complete: m.complete,
                complete_pct: m.total ? Math.round((m.complete / m.total) * 1000) / 10 : 0,
                avg_score:    m.total ? Math.round((m.score_sum / m.total) * 10) / 10 : 0,
            }));

        // ── By ward (department) ──
        const wardMap = new Map();
        for (const r of scored) {
            const key = r.ward || '?';
            if (!wardMap.has(key)) {
                wardMap.set(key, {
                    ward: key, ward_name: r.ward_name || '(ไม่ระบุ)',
                    total: 0, score_sum: 0, complete: 0,
                    defects: { pdx: 0, dch_summary: 0, nurse_notes: 0, dch_plan: 0 },
                });
            }
            const w = wardMap.get(key);
            w.total++;
            w.score_sum += r.score;
            if (r.score === 100) w.complete++;
            if (!r.pdx)         w.defects.pdx++;
            if (!r.dch_summary) w.defects.dch_summary++;
            if (!r.nurse_notes) w.defects.nurse_notes++;
            if (!r.dch_plan)    w.defects.dch_plan++;
        }
        const by_ward = [...wardMap.values()]
            .map(w => ({
                ...w,
                avg_score:    w.total ? Math.round((w.score_sum / w.total) * 10) / 10 : 0,
                complete_pct: w.total ? Math.round((w.complete  / w.total) * 1000) / 10 : 0,
            }))
            .sort((a, b) => b.total - a.total);

        // ── By doctor (use dch_doctor — the discharging physician) ──
        const docMap = new Map();
        for (const r of scored) {
            const key = r.dch_doctor || '?';
            if (key === '?' || !key) continue;
            if (!docMap.has(key)) {
                docMap.set(key, {
                    code: key, name: docName.get(key) || '(ไม่พบในระบบ)',
                    total: 0, score_sum: 0, complete: 0,
                    defects: { pdx: 0, dch_summary: 0, nurse_notes: 0, dch_plan: 0 },
                });
            }
            const d = docMap.get(key);
            d.total++;
            d.score_sum += r.score;
            if (r.score === 100) d.complete++;
            if (!r.pdx)         d.defects.pdx++;
            if (!r.dch_summary) d.defects.dch_summary++;
            if (!r.nurse_notes) d.defects.nurse_notes++;
            if (!r.dch_plan)    d.defects.dch_plan++;
        }
        const by_doctor = [...docMap.values()]
            .filter(d => d.total >= 3)
            .map(d => ({
                ...d,
                avg_score:    d.total ? Math.round((d.score_sum / d.total) * 10) / 10 : 0,
                complete_pct: d.total ? Math.round((d.complete  / d.total) * 1000) / 10 : 0,
            }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 30);

        // ── Defect breakdown (Content vs Format) ──
        // Content = ส่วนเนื้อหา (PDX, Discharge Summary, Discharge Plan)
        // Format  = ส่วนรูปแบบ/ความครบถ้วน (Nurse Notes coverage)
        const defect_breakdown = {
            content: {
                pdx_missing:         scored.filter(r => !r.pdx).length,
                dch_summary_missing: scored.filter(r => !r.dch_summary).length,
                dch_plan_missing:    scored.filter(r => !r.dch_plan).length,
            },
            format: {
                nurse_notes_insufficient: scored.filter(r => !r.nurse_notes).length,
            },
        };
        const total_defects =
            defect_breakdown.content.pdx_missing +
            defect_breakdown.content.dch_summary_missing +
            defect_breakdown.content.dch_plan_missing +
            defect_breakdown.format.nurse_notes_insufficient;

        res.json({
            data_source: 'HOSxP XE (ipt + ipt_discharge + iptdiag + ipd_nurse_note + asm_discharge_planning + ipt_discharge_summary_note)',
            window_days: days,
            generated_at: new Date().toISOString(),
            kpis: {
                total, complete, partial, empty,
                complete_pct: pct(complete),
                avg_score:    avgScore,
                doc_confirmed: docConfirmed, doc_confirmed_pct: pct(docConfirmed),
                hosxp_audited: hosxpAudited, audited_pct:      pct(hosxpAudited),
                coding_done:   codingDone,   coding_pct:       pct(codingDone),
            },
            monthly_trend,
            by_ward,
            by_doctor,
            defect_breakdown,
            total_defects,
        });
    } catch (err) {
        logger.error('[mr-audit/analytics]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/list
//   filtered AN list with completeness + sidecar status merged
// ─────────────────────────────────────────────────────────────
router.get('/list', async (req, res) => {
    try {
        const ward = (req.query.ward || '').trim();
        const status = (req.query.status || '').trim();           // sidecar status filter
        const completenessMax = parseInt(req.query.completeness_max) || null; // e.g. 75 = only show <75%
        const days = Math.min(parseInt(req.query.days) || 30, 365);
        const limit = Math.min(parseInt(req.query.limit) || 100, 500);

        const params = [];
        let where = `WHERE i.dchdate IS NOT NULL AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)`;
        if (ward) {
            where += ` AND i.ward = ?`;
            params.push(ward);
        }

        const sql = `
            ${baseSql()}
            ${where}
            ORDER BY i.dchdate DESC, i.an DESC
            LIMIT ${limit}
        `;
        // Phase I.4: cache key bumped — baseSql() returns 7 new columns
        const cacheKey = `mr_audit_list_v2_20check_${days}_${ward || 'all'}_${limit}`;
        const rows = await dbQueryHeavy(cacheKey, 2, sql, params);

        // Merge sidecar audit status (latest per AN)
        const sideMap = new Map(stmtAllLatest.all().map(s => [s.an, s]));

        const enriched = rows.map(r => {
            const completeness = scoreCompleteness(r);
            const side = sideMap.get(r.an) || null;
            return {
                ...r,
                completeness,
                mr_audit: side
                    ? {
                          status: side.status,
                          comment: side.comment,
                          flagged_items: side.flagged_items ? JSON.parse(side.flagged_items) : [],
                          audited_by: side.audited_by,
                          audited_at: side.audited_at,
                      }
                    : null,
            };
        });

        // Apply post-filters (completeness / status)
        const filtered = enriched.filter(r => {
            if (status === 'unaudited' && r.mr_audit) return false;
            if (status && status !== 'unaudited' && (!r.mr_audit || r.mr_audit.status !== status)) return false;
            if (completenessMax !== null && r.completeness.score > completenessMax) return false;
            return true;
        });

        res.json({
            data_source: 'HOSxP XE + sidecar mr_audit_status',
            count: filtered.length,
            window_days: days,
            filters: { ward, status, completeness_max: completenessMax },
            rows: filtered,
        });
    } catch (err) {
        logger.error('[mr-audit/list]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/detail/:an
//   full detail of one AN (header + diag + notes + assessments)
// ─────────────────────────────────────────────────────────────
router.get('/detail/:an', async (req, res) => {
    const an = String(req.params.an || '').replace(/[^0-9]/g, '');
    if (!an) return res.status(400).json({ error: 'invalid AN' });

    try {
        const headerSql = `${baseSql()} WHERE i.an = ? LIMIT 1`;
        const [headerRows, diagRows, dchSummaryRows, nurseSampleRows, assessRows, planRows] = await Promise.all([
            dbQuery(headerSql, [an]),
            dbQuery(
                `SELECT diagtype, icd10, diagnosis_note, doctor, entry_datetime
                 FROM iptdiag WHERE an = ? ORDER BY diagtype, diag_no`,
                [an]
            ),
            dbQuery(
                `SELECT doctor_code, summary_datetime, LEFT(summary_note_text, 500) AS preview
                 FROM ipt_discharge_summary_note WHERE an = ?
                 ORDER BY summary_datetime DESC LIMIT 5`,
                [an]
            ),
            dbQuery(
                `SELECT note_date, COUNT(*) AS note_count,
                        AVG(temperature) AS avg_temp,
                        AVG(pulse) AS avg_pulse,
                        AVG(bp_systolic) AS avg_sbp
                 FROM ipd_nurse_note WHERE an = ?
                 GROUP BY note_date ORDER BY note_date`,
                [an]
            ),
            dbQuery(
                `SELECT ah.assessment_head_id, af.assessment_form_name, ah.assessment_head_datetime, ah.assessment_head_staff
                 FROM assessment_head ah
                 LEFT JOIN assessment_form af ON af.assessment_form_id = ah.assessment_form_id
                 WHERE ah.an = ? ORDER BY ah.assessment_head_datetime DESC`,
                [an]
            ),
            dbQuery(
                `SELECT asm_discharge_planning_id, assessment_head_id
                 FROM asm_discharge_planning WHERE an = ? LIMIT 5`,
                [an]
            ),
        ]);

        if (!headerRows[0]) return res.status(404).json({ error: 'AN not found' });

        const header = headerRows[0];
        const completeness = scoreCompleteness(header);

        const auditHistory = stmtHistoryForAn.all(an).map(h => ({
            ...h,
            flagged_items: h.flagged_items ? JSON.parse(h.flagged_items) : [],
        }));

        res.json({
            data_source: 'HOSxP XE detail + sidecar history',
            header: { ...header, completeness },
            diagnoses: diagRows,
            discharge_summaries: dchSummaryRows,
            nurse_notes_by_day: nurseSampleRows,
            assessments: assessRows,
            discharge_plans: planRows,
            audit_history: auditHistory,
        });
    } catch (err) {
        logger.error('[mr-audit/detail]', { an, error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/history/:an
// ─────────────────────────────────────────────────────────────
router.get('/history/:an', (req, res) => {
    const an = String(req.params.an || '').replace(/[^0-9]/g, '');
    if (!an) return res.status(400).json({ error: 'invalid AN' });
    const rows = stmtHistoryForAn.all(an).map(h => ({
        ...h,
        flagged_items: h.flagged_items ? JSON.parse(h.flagged_items) : [],
    }));
    res.json({ an, count: rows.length, rows });
});

// ─────────────────────────────────────────────────────────────
// POST /api/mr-audit/audit   { an, status, comment?, flagged_items? }
// ─────────────────────────────────────────────────────────────
router.post('/audit', (req, res) => {
    const { an, status, comment, flagged_items } = req.body || {};
    if (!an || !/^\d+$/.test(String(an))) {
        return res.status(400).json({ error: 'an required (numeric)' });
    }
    if (!['pending', 'verified', 'flagged', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'status must be pending|verified|flagged|rejected' });
    }
    const user = req.user?.username || req.user?.id || 'unknown';
    const flaggedJson = Array.isArray(flagged_items) ? JSON.stringify(flagged_items) : null;

    try {
        const result = stmtInsertAudit.run(
            String(an),
            status,
            comment ? String(comment).slice(0, 1000) : null,
            flaggedJson,
            String(user)
        );
        const latest = stmtLatestForAn.get(String(an));
        res.json({
            ok: true,
            audit_id: result.lastInsertRowid,
            latest: latest
                ? { ...latest, flagged_items: latest.flagged_items ? JSON.parse(latest.flagged_items) : [] }
                : null,
        });
    } catch (err) {
        logger.error('[mr-audit/audit]', { an, status, error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// PDF (HTML) helpers — browser-printable reports for AN with
// assessment_head ≥ 1.  We return HTML pages that auto-print
// on load; the user picks "Save as PDF" from the print dialog.
// No PDF library / no Thai-font binary — Kanit comes from Google Fonts.
// ─────────────────────────────────────────────────────────────
const escapeHtml = (s) =>
    String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const fmtDateTH = (s) => {
    if (!s) return '—';
    const d = new Date(s);
    if (isNaN(d)) return String(s);
    return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
};
const fmtDateTimeTH = (s) => {
    if (!s) return '—';
    const d = new Date(s);
    if (isNaN(d)) return String(s);
    return d.toLocaleString('th-TH', { hour12: false });
};

function htmlShell(title, bodyHtml) {
    return `<!DOCTYPE html>
<html lang="th"><head>
<meta charset="UTF-8">
<title>${escapeHtml(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 12mm 10mm; }
* { box-sizing: border-box; }
html, body { font-family: 'Kanit', system-ui, sans-serif; color: #0f172a; font-size: 12px; line-height: 1.5; margin: 0; padding: 0; background: #f8fafc; }
.page { background: white; max-width: 21cm; margin: 16px auto; padding: 18mm 14mm; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
@media print { body { background: white; } .page { box-shadow: none; margin: 0; max-width: 100%; padding: 0; } .no-print { display: none !important; } .page-break { page-break-after: always; } }
h1 { font-size: 18px; font-weight: 700; margin: 0 0 4px; color: #0f172a; }
h2 { font-size: 14px; font-weight: 600; margin: 18px 0 8px; padding-bottom: 4px; border-bottom: 2px solid #7c3aed; color: #5b21b6; }
.muted { color: #64748b; font-size: 11px; }
.brand { color: #7c3aed; font-weight: 600; letter-spacing: .5px; font-size: 10px; text-transform: uppercase; }
table { width: 100%; border-collapse: collapse; font-size: 11px; }
th, td { padding: 6px 8px; border-bottom: 1px solid #e2e8f0; text-align: left; vertical-align: top; }
th { background: #f1f5f9; font-weight: 600; color: #475569; font-size: 10px; text-transform: uppercase; letter-spacing: .3px; }
.kv { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px 16px; margin: 8px 0 12px; }
.kv > div > .lbl { color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: .3px; margin-bottom: 2px; }
.kv > div > .val { font-weight: 500; font-size: 12px; }
.bar { display: inline-block; width: 100px; height: 6px; background: #f1f5f9; border-radius: 3px; vertical-align: middle; margin-right: 6px; overflow: hidden; }
.bar > i { display: block; height: 100%; }
.score { font-weight: 700; font-variant-numeric: tabular-nums; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 600; border: 1px solid; white-space: nowrap; }
.b-green { background: #dcfce7; color: #166534; border-color: #86efac; }
.b-amber { background: #fef3c7; color: #92400e; border-color: #fcd34d; }
.b-red   { background: #fee2e2; color: #991b1b; border-color: #fca5a5; }
.b-slate { background: #f1f5f9; color: #475569; border-color: #cbd5e1; }
.b-purple{ background: #ede9fe; color: #5b21b6; border-color: #c4b5fd; }
.b-blue  { background: #dbeafe; color: #1e40af; border-color: #93c5fd; }
.toolbar { position: fixed; top: 8px; right: 8px; z-index: 99; display: flex; gap: 6px; }
.toolbar button { padding: 8px 14px; background: #7c3aed; color: white; border: 0; border-radius: 6px; font: inherit; font-weight: 600; font-size: 12px; cursor: pointer; }
.toolbar button.secondary { background: white; color: #475569; border: 1px solid #cbd5e1; }
.checkbox-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
.checkbox-row label { display: flex; gap: 6px; align-items: center; font-size: 11px; }
.sig-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px; padding-top: 16px; }
.sig-line { border-top: 1px solid #475569; padding-top: 4px; font-size: 10px; color: #64748b; text-align: center; }
.foot { margin-top: 24px; font-size: 10px; color: #94a3b8; text-align: center; }
ul { margin: 4px 0; padding-left: 18px; }
li { margin: 2px 0; }
</style>
</head><body>
<div class="toolbar no-print">
    <button onclick="window.print()">🖨 พิมพ์ / บันทึก PDF (Ctrl+P)</button>
    <button class="secondary" onclick="window.close()">ปิด</button>
</div>
${bodyHtml}
</body></html>`;
}

function compBadge(score) {
    const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : score >= 25 ? '#f97316' : '#dc2626';
    return `<span class="bar"><i style="width:${score}%;background:${color}"></i></span><span class="score" style="color:${color}">${score}%</span>`;
}

const STATUS_LABEL_TH = {
    verified: { class: 'b-green', label: 'ผ่านการตรวจ' },
    flagged: { class: 'b-amber', label: 'ติดธง' },
    pending: { class: 'b-blue', label: 'รอตรวจสอบ' },
    rejected: { class: 'b-red', label: 'ไม่ผ่าน' },
};

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/pdf/list
//   HTML list of ANs that have assessment_head >= 1
// ─────────────────────────────────────────────────────────────
router.get('/pdf/list', async (req, res) => {
    try {
        const ward = (req.query.ward || '').trim();
        const days = Math.min(parseInt(req.query.days) || 30, 365);
        const status = (req.query.status || '').trim();
        const completenessMax = parseInt(req.query.completeness_max) || null;
        const limit = Math.min(parseInt(req.query.limit) || 200, 500);

        const params = [];
        let where = `WHERE i.dchdate IS NOT NULL AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)`;
        if (ward) { where += ` AND i.ward = ?`; params.push(ward); }

        // Same shape as /list, but with extra assessment_count + assessment_count >= 1 filter
        const sql = `
            SELECT
                i.an, i.hn, i.ward, w.name AS ward_name,
                i.regdate, i.dchdate, i.pttype, i.adjrw, i.drg,
                i.admdoctor AS adm_doctor, i.dch_doctor,
                DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate) AS los_days,
                id.confirm_final_summary  AS doc_summary,
                id.confirm_audit_summary  AS hosxp_mr_audit,
                id.confirm_coding_summary AS coding_done,
                CONCAT(IFNULL(p.pname,''), IFNULL(p.fname,''), ' ', IFNULL(p.lname,'')) AS pt_name,
                (SELECT COUNT(*) FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') AS pdx_count,
                (SELECT COUNT(*) FROM ipt_discharge_summary_note dsn WHERE dsn.an = i.an) AS dch_summary,
                (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an) AS nurse_note_days,
                (SELECT COUNT(*) FROM asm_discharge_planning dp WHERE dp.an = i.an) AS dch_plan,
                (SELECT COUNT(*) FROM assessment_head ah WHERE ah.an = i.an) AS assessment_count
            FROM ipt i
            LEFT JOIN ipt_discharge id ON id.an = i.an
            LEFT JOIN ward w           ON w.ward = i.ward
            LEFT JOIN patient p        ON p.hn  = i.hn
            ${where}
            HAVING assessment_count >= 1
            ORDER BY i.dchdate DESC, i.an DESC
            LIMIT ${limit}
        `;
        const rows = await dbQueryHeavy(`mr_audit_pdf_list_${days}_${ward || 'all'}_${limit}`, 2, sql, params);

        // Merge sidecar status
        const sideMap = new Map(stmtAllLatest.all().map((s) => [s.an, s]));

        // Apply post-filters (same as /list)
        const enriched = rows
            .map((r) => ({ ...r, completeness: scoreCompleteness(r), mr_audit: sideMap.get(r.an) || null }))
            .filter((r) => {
                if (status === 'unaudited' && r.mr_audit) return false;
                if (status && status !== 'unaudited' && (!r.mr_audit || r.mr_audit.status !== status)) return false;
                if (completenessMax !== null && r.completeness.score > completenessMax) return false;
                return true;
            });

        const filterSummary = [
            ward ? `Ward ${ward}` : 'ทุก ward',
            `ย้อนหลัง ${days} วัน`,
            status ? `สถานะ: ${STATUS_LABEL_TH[status]?.label || status}` : 'ทุกสถานะ',
            completenessMax !== null ? `ความครบถ้วน ≤ ${completenessMax}%` : 'ความครบถ้วนทุกระดับ',
            `Assessment ≥ 1`,
        ].join(' · ');

        const tbody = enriched
            .map((r) => {
                const sideBadge = r.mr_audit
                    ? `<span class="badge ${STATUS_LABEL_TH[r.mr_audit.status]?.class || 'b-slate'}">${STATUS_LABEL_TH[r.mr_audit.status]?.label || r.mr_audit.status}</span>`
                    : `<span class="badge b-slate">ยังไม่ตรวจ</span>`;
                return `<tr>
                    <td><strong style="color:#7c3aed">${escapeHtml(r.an)}</strong></td>
                    <td>${escapeHtml(r.pt_name || '—')}<br><span class="muted">HN ${escapeHtml(r.hn)}</span></td>
                    <td>${escapeHtml(r.ward)}<br><span class="muted">${escapeHtml(r.ward_name || '')}</span></td>
                    <td>${fmtDateTH(r.regdate)}<br><span class="muted">→ ${fmtDateTH(r.dchdate)}</span></td>
                    <td>${r.los_days}</td>
                    <td>${escapeHtml(r.pttype || '—')}</td>
                    <td>${r.adjrw != null ? Number(r.adjrw).toFixed(3) : '—'}</td>
                    <td><strong>${r.assessment_count}</strong></td>
                    <td>${compBadge(r.completeness.score)}</td>
                    <td>${r.doc_summary === 'Y' ? '<span class="badge b-green">Y</span>' : '<span class="badge b-red">N</span>'}</td>
                    <td>${r.hosxp_mr_audit === 'Y' ? '<span class="badge b-green">Y</span>' : '<span class="badge b-red">N</span>'}</td>
                    <td>${sideBadge}</td>
                </tr>`;
            })
            .join('');

        const html = htmlShell(
            `รายชื่อ AN ที่มี assessment — ${filterSummary}`,
            `<div class="page">
                <div class="brand">BCH 360° · Medical Record Audit</div>
                <h1>รายชื่อ AN ที่มี Assessment ใน HOSxP IPD Paperless</h1>
                <div class="muted">${escapeHtml(filterSummary)} · พิมพ์ ${fmtDateTimeTH(new Date())} · จำนวน <strong>${enriched.length}</strong> ราย</div>
                <h2>รายชื่อ</h2>
                <table>
                    <thead><tr>
                        <th>AN</th><th>ชื่อ · HN</th><th>Ward</th><th>Admit → Discharge</th><th>LOS</th>
                        <th>Pttype</th><th>AdjRW</th><th>Asm</th><th>ครบถ้วน</th><th>Doc</th><th>HOSxP MR</th><th>MR Audit</th>
                    </tr></thead>
                    <tbody>${tbody || '<tr><td colspan="12" style="text-align:center;color:#94a3b8;padding:24px">ไม่พบข้อมูล</td></tr>'}</tbody>
                </table>
                <div class="foot">BCH 360° Intelligence V.10 · MR Audit Report · เอกสารภายในโรงพยาบาล</div>
            </div>`
        );

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
    } catch (err) {
        logger.error('[mr-audit/pdf/list]', { error: err.message });
        res.status(500).send(`<pre>${escapeHtml(err.message)}</pre>`);
    }
});

// ─────────────────────────────────────────────────────────────
// DFM (Delphi Form) parser — extracts the visual layout that
// HOSxP designed for each assessment_form, so we can render
// "looks like the HOSxP form" PDFs.
// ─────────────────────────────────────────────────────────────
function decodeDelphiString(raw) {
    let out = '';
    let i = 0;
    while (i < raw.length) {
        const ch = raw[i];
        if (ch === "'") {
            i++;
            while (i < raw.length) {
                if (raw[i] === "'" && raw[i + 1] === "'") { out += "'"; i += 2; continue; }
                if (raw[i] === "'") { i++; break; }
                out += raw[i]; i++;
            }
        } else if (ch === '#') {
            i++;
            let num = '';
            while (i < raw.length && /\d/.test(raw[i])) { num += raw[i]; i++; }
            if (num) {
                const cp = Number(num);
                if (cp >= 0x20 || cp === 0x0a || cp === 0x0d || cp === 0x09) out += String.fromCodePoint(cp);
            }
        } else {
            i++;
        }
    }
    return out;
}

function parseDfmValue(raw) {
    const t = raw.trim();
    if (!t) return '';
    if (t.startsWith("'") || t.startsWith('#')) return decodeDelphiString(t);
    if (/^-?\d+$/.test(t)) return Number(t);
    if (/^-?\d+\.\d+$/.test(t)) return Number(t);
    if (t === 'True') return true;
    if (t === 'False') return false;
    return t;
}

function parseDfm(text) {
    if (!text) return null;
    const lines = text.split(/\r?\n/);
    const ref = { i: 0 };

    function parseObj() {
        while (ref.i < lines.length && !/^\s*object\s+/.test(lines[ref.i])) ref.i++;
        if (ref.i >= lines.length) return null;
        const m = lines[ref.i].match(/^\s*object\s+([A-Za-z0-9_]+):\s*([A-Za-z0-9_.]+)/);
        if (!m) { ref.i++; return null; }
        ref.i++;
        const obj = { name: m[1], cls: m[2], props: {}, children: [] };

        while (ref.i < lines.length) {
            const line = lines[ref.i];
            const trimmed = line.trim();
            if (trimmed === 'end') { ref.i++; return obj; }
            if (/^object\s+/.test(trimmed)) {
                const child = parseObj();
                if (child) obj.children.push(child);
                continue;
            }
            const pm = trimmed.match(/^([A-Za-z0-9_.]+)\s*=\s*(.*)$/);
            if (pm) {
                const key = pm[1];
                let val = pm[2];
                ref.i++;
                // Empty value on same line → continuation
                if (val.trim() === '') {
                    if (ref.i < lines.length) { val = lines[ref.i]; ref.i++; }
                }
                // Multi-line concatenation (Delphi `+`)
                while (val.trimEnd().endsWith('+') && ref.i < lines.length) {
                    val = val.trimEnd().slice(0, -1) + lines[ref.i];
                    ref.i++;
                }
                // Bracket lists < ... > — skip whole block
                if (val.trim() === '<' || val.trim().endsWith('= <')) {
                    while (ref.i < lines.length && !lines[ref.i].trim().endsWith('>')) ref.i++;
                    if (ref.i < lines.length) ref.i++;
                    obj.props[key] = '';
                    continue;
                }
                // Paren lists ( ... ) on multi-line
                if (val.trim().startsWith('(') && !val.trim().endsWith(')')) {
                    while (ref.i < lines.length && !lines[ref.i].includes(')')) ref.i++;
                    if (ref.i < lines.length) ref.i++;
                    obj.props[key] = '';
                    continue;
                }
                try { obj.props[key] = parseDfmValue(val); }
                catch { obj.props[key] = val; }
                continue;
            }
            ref.i++;
        }
        return obj;
    }
    return parseObj();
}

// ─────────────────────────────────────────────────────────────
// Render DFM tree to absolute-positioned HTML.  Scales the form
// down so it fits a printable A4 width.
// ─────────────────────────────────────────────────────────────
function renderFormFromDfm(dfm, valueRow, header) {
    if (!dfm) return null;

    // Find the meaningful "root" — usually NotifyPanel has dummy huge size,
    // but the first real container child has the form's actual dimensions.
    let root = dfm;
    if ((root.cls === 'TNotifyPanel' || /Panel/.test(root.cls)) && root.children.length === 1) {
        // Single child case: descend
    }

    // Total bounds — explore tree, find max (Left+Width, Top+Height) reachable
    // from root (treat root.Left, root.Top as 0 for absolute origin).
    let maxX = 0, maxY = 0;
    function bounds(node, px, py) {
        const l = (node.props.Left || 0);
        const t = (node.props.Top || 0);
        const x = px + l;
        const y = py + t;
        const w = (node.props.Width || 0);
        const h = (node.props.Height || 0);
        if (x + w > maxX) maxX = x + w;
        if (y + h > maxY) maxY = y + h;
        for (const c of node.children) bounds(c, x, y);
    }
    for (const c of root.children) bounds(c, 0, 0);
    if (maxX === 0) maxX = 1000;
    if (maxY === 0) maxY = 600;

    // Cap absurd sizes (some root NotifyPanels are 2480x3508 but real content is smaller)
    if (maxX > 1600) maxX = 1600;

    const PAGE_PX = 740;             // A4 portrait usable width @ 96dpi
    const scale = PAGE_PX / maxX;
    const scaledW = Math.round(maxX * scale);
    const scaledH = Math.round(maxY * scale);

    // Render
    const parts = [];
    const pixel = (n) => Math.round((n || 0) * scale);

    function fmtValue(v) {
        if (v == null || v === '') return '';
        if (v instanceof Date) return v.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
        const s = String(v);
        if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
            const d = new Date(s);
            if (!isNaN(d)) return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        return s;
    }

    function specialValue(name) {
        switch (name) {
            case 'PatientName': return header?.pt_name || '';
            case 'HN':          return header?.hn || '';
            case 'AN':          return header?.an || '';
            case 'Ward':        return `${header?.ward || ''} ${header?.ward_name || ''}`.trim();
            case 'AgeCurrent':  return ''; // we don't fetch DOB; skip
            default:            return null;
        }
    }

    function getCaption(node) {
        const c = node.props.Caption;
        if (!c && c !== 0) return '';
        return String(c);
    }

    function escHtml(s) {
        return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function walk(node, px, py) {
        const x = px + (node.props.Left || 0);
        const y = py + (node.props.Top || 0);
        const w = (node.props.Width || 0);
        const h = (node.props.Height || 0);
        const cls = node.cls;
        const name = node.name;

        const sx = pixel(x), sy = pixel(y), sw = pixel(w || 100), sh = pixel(h || 24);
        const baseStyle = `position:absolute; left:${sx}px; top:${sy}px;`;

        // Containers — draw as panel boxes if they have caption or color
        if (cls === 'QuestionPanel' || cls === 'TQuestionTabSheet' || /Panel$/.test(cls)) {
            const cap = getCaption(node);
            const isHeaderPanel = node.props.Color && /Gradient|InactiveCaption/.test(String(node.props.Color));
            // Skip the giant root NotifyPanel
            if (cls !== 'TNotifyPanel' && w > 0 && h > 0) {
                const bg = isHeaderPanel ? '#e0e7ff' : 'transparent';
                const border = (cap || isHeaderPanel) ? '1px solid #cbd5e1' : 'none';
                parts.push(
                    `<div style="${baseStyle} width:${sw}px; height:${sh}px; background:${bg}; border:${border}; border-radius:3px; box-sizing:border-box; padding:1px 4px; font-weight:${isHeaderPanel ? 600 : 400}; color:#0f172a; font-size:10px; display:flex; align-items:center;">${escHtml(cap)}</div>`
                );
            }
        }
        // Labels — fixed text at position
        else if (cls === 'TQuestionLabel' || cls === 'TLabel' || cls === 'TcxLabel') {
            const cap = getCaption(node);
            if (cap) {
                parts.push(
                    `<div style="${baseStyle} max-width:${pixel(maxX - x)}px; font-size:10px; color:#0f172a; line-height:1.3;">${escHtml(cap)}</div>`
                );
            }
        }
        // Inputs — text/date/etc with value
        else if (cls === 'TQuestionTextEdit' || cls === 'TcxTextEdit' || cls === 'TQuestionDate' || cls === 'TcxDateEdit' || cls === 'TQuestionMemo' || cls === 'TcxMemo' || cls === 'TQuestionComboBox' || cls === 'TcxComboBox' || cls === 'TcxLookupComboBox' || cls === 'TQuestionCurrencyEdit' || cls === 'TcxCurrencyEdit' || cls === 'TcxSpinEdit' || cls === 'TLMDSpinEdit' || cls === 'TQuestionRadioGroup' || cls === 'TRadioGroup' || cls === 'TLMDCheckGroup' || cls === 'TQuestionCheckBox' || cls === 'TcxCheckBox') {
            const colName = node.props.QuestionItemsName;
            const dataValue = colName && valueRow ? valueRow[colName] : null;
            const text = fmtValue(dataValue);
            const isFilled = !!text;
            // For radio/checkbox → render the chosen option text inside a box
            parts.push(
                `<div style="${baseStyle} width:${sw}px; min-height:${Math.max(20, sh)}px; border:1px dashed ${isFilled ? '#7c3aed' : '#cbd5e1'}; background:${isFilled ? '#fef3c7' : 'white'}; box-sizing:border-box; padding:1px 5px; font-size:10px; color:#0f172a; line-height:1.3; overflow:hidden;" title="${escHtml(colName || '')}">${escHtml(text)}</div>`
            );
        }
        // Special pre-bound fields
        else if (specialValue(name) !== null) {
            const val = specialValue(name);
            parts.push(
                `<div style="${baseStyle} width:${sw}px; min-height:${Math.max(20, sh)}px; border-bottom:1px solid #475569; padding:1px 4px; font-size:10px; font-weight:600; color:#0f172a;">${escHtml(val)}</div>`
            );
        }

        // Recurse
        for (const child of node.children) walk(child, x, y);
    }
    for (const c of root.children) walk(c, 0, 0);

    return {
        html: `<div style="position:relative; width:${scaledW}px; height:${scaledH}px; margin:0 auto;">${parts.join('')}</div>`,
        scaledW, scaledH, scale,
    };
}

// ─────────────────────────────────────────────────────────────
// Hospital identity (for document chrome)
// ─────────────────────────────────────────────────────────────
const HOSPITAL = {
    name_th: 'โรงพยาบาลบ้านฉาง',
    name_en: 'Banchang Hospital',
    code: '10828',
    address: 'อำเภอบ้านฉาง  จังหวัดระยอง',
    // Inline SVG logo (purple square with white "B" + green dot — matches favicon)
    logoSvg: `<svg width="46" height="46" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="lg1" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#6d28d9"/>
        </linearGradient></defs>
        <rect width="64" height="64" rx="14" fill="url(#lg1)"/>
        <text x="32" y="44" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-weight="900" font-size="32" fill="white">B</text>
        <circle cx="52" cy="12" r="5" fill="#10b981"/>
    </svg>`,
};

// ─────────────────────────────────────────────────────────────
// Document-style renderer — proper medical-record format with
// hospital banner + patient block + form sections + signatures + footer.
// Uses the already-extracted `fields` array from loadAssessmentInstances
// for content (no need to re-parse DFM for data).  When DFM is available,
// we additionally use it to detect section headers (panels with captions
// using clGradientInactiveCaption color → column/section labels).
// ─────────────────────────────────────────────────────────────
function extractDfmSections(dfm) {
    if (!dfm) return [];
    const headers = []; // {caption, x, y, w, h}
    const inputClsRe = /TQuestion(TextEdit|Date|Memo|ComboBox|RadioGroup|CurrencyEdit|CheckBox)|Tcx(TextEdit|DateEdit|Memo|ComboBox|LookupComboBox|CurrencyEdit|SpinEdit|CheckBox)|TLMD(SpinEdit|CheckGroup)|TRadioGroup/;
    function hasInputDescendant(node) {
        if (inputClsRe.test(node.cls)) return true;
        for (const c of node.children) if (hasInputDescendant(c)) return true;
        return false;
    }
    function walk(node, px, py) {
        const x = px + (node.props.Left || 0);
        const y = py + (node.props.Top || 0);
        const w = node.props.Width || 0;
        const h = node.props.Height || 0;
        const cap = node.props.Caption;
        const color = String(node.props.Color || '');
        const isPanel = /Panel|TabSheet/.test(node.cls) && node.cls !== 'TNotifyPanel';
        // Heuristic: a "section" is either
        //   (a) a panel with a caption that contains input descendants, or
        //   (b) a node with the classic "header" colors (Gradient/InactiveCaption/SkyBlue/MoneyGreen/Cream/InfoBk).
        const capStr = cap ? String(cap).trim() : '';
        const isHeaderColor = /Gradient|InactiveCaption|SkyBlue|MoneyGreen|Cream|InfoBk/.test(color);
        if (capStr.length >= 2 && (
            isHeaderColor ||
            (isPanel && hasInputDescendant(node))
        )) {
            headers.push({ caption: capStr, x, y, w, h });
        }
        for (const c of node.children) walk(c, x, y);
    }
    for (const c of dfm.children) walk(c, 0, 0);
    return headers;
}

// Walk DFM tree to find every input field's column-name → absolute Y position.
// Used to group fields under their nearest section header for structured rendering.
function extractFieldPositions(dfm) {
    if (!dfm) return new Map();
    const map = new Map(); // columnName → {x, y, label?}
    const inputClasses = /TQuestionTextEdit|TcxTextEdit|TQuestionDate|TcxDateEdit|TQuestionMemo|TcxMemo|TQuestionComboBox|TcxComboBox|TcxLookupComboBox|TQuestionCurrencyEdit|TcxCurrencyEdit|TcxSpinEdit|TLMDSpinEdit|TQuestionRadioGroup|TRadioGroup|TLMDCheckGroup|TQuestionCheckBox|TcxCheckBox/;
    function walk(node, px, py) {
        const x = px + (node.props.Left || 0);
        const y = py + (node.props.Top || 0);
        if (inputClasses.test(node.cls)) {
            const col = node.props.QuestionItemsName;
            if (col && !map.has(col)) {
                map.set(col, { x, y, caption: node.props.Caption || null });
            }
        }
        for (const c of node.children) walk(c, x, y);
    }
    for (const c of dfm.children) walk(c, 0, 0);
    return map;
}

function renderFormDocument(opts) {
    const { instance, header, fields, dfm, pageNum, pageTotal } = opts;

    const escHtml = (s) =>
        String(s ?? '')
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

    const fmtFieldValue = (v) => {
        if (v == null || v === '') return '<span style="color:#cbd5e1">—</span>';
        if (v instanceof Date) return escHtml(fmtDateTH(v));
        if (typeof v === 'object') return escHtml(JSON.stringify(v));
        const s = String(v);
        if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
            const d = new Date(s);
            if (!isNaN(d)) return escHtml(fmtDateTH(s));
        }
        return escHtml(s).replace(/\n/g, '<br>');
    };

    // ── Custom renderer: DTX Sheet (form_id=108) — date×time grid layout ──
    // Mirrors HOSxP UI: rows = dates (asm_date1-10), cols = times (asm_date50-53).
    // BS values follow pattern: asm_text<(col-1)*10 + row>. Drugs cluster at asm_text40+.
    const renderDtxSheetGrid = (vRow) => {
        if (!vRow) return null;
        const dates = [];
        for (let r = 1; r <= 10; r++) {
            const d = vRow[`asm_date${r}`];
            if (d && !(typeof d === 'string' && /^[A-Za-z]/.test(d) && !/^\d/.test(d))) {
                dates.push({ row: r, date: d });
            }
        }
        const times = [];
        for (let c = 50; c <= 53; c++) {
            const t = vRow[`asm_date${c}`];
            times.push({ col: c - 49, time: t || null });
        }
        if (dates.length === 0) return null;

        const fmtTimeShort = (t) => {
            if (!t) return '—';
            const s = String(t);
            return s.slice(0, 5);
        };
        const fmtRowDate = (d) => {
            if (!d) return '—';
            try {
                const dt = d instanceof Date ? d : new Date(d);
                if (!isNaN(dt)) {
                    const day = dt.getDate();
                    const monNames = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
                    return `${day} ${monNames[dt.getMonth()]} ${dt.getFullYear() + 543}`;
                }
            } catch {}
            return String(d);
        };

        const headerCells = times.map((t, i) => `
            <th style="background:#f1f5f9; padding:6px 8px; font-size:10px; font-weight:700; color:#475569; text-align:center; border:1px solid #cbd5e1;">
                <div style="font-size:9px; color:#94a3b8;">Time ${i + 1}</div>
                <div style="font-size:11px; color:#0f172a; font-variant-numeric:tabular-nums;">${escHtml(fmtTimeShort(t.time))}</div>
            </th>`).join('');

        const drugs = ['50%glucose', 'RI', 'NPH', 'Mixt'];
        const drugBaseStarts = [42, 52, 62, 72]; // text42 = drug name col 1 row 1; +10 per col

        const dataRowsHtml = dates.map(d => {
            const cells = times.map(t => {
                const bsKey = `asm_text${(t.col - 1) * 10 + d.row}`;
                const bs = vRow[bsKey];
                const drugKey = `asm_text${drugBaseStarts[t.col - 1] + d.row}`;
                const drug = vRow[drugKey];
                const doseKey = `asm_n${(t.col - 1) * 10 + d.row}`;
                const dose = vRow[doseKey];
                const hasData = (bs && bs !== '') || (drug && drug !== '');
                return `
                    <td style="padding:6px 8px; border:1px solid #e2e8f0; vertical-align:top; background:${hasData ? '#fefce8' : 'white'}; min-width:90px;">
                        ${bs && bs !== '' ? `<div style="font-size:14px; font-weight:700; color:#0f172a; font-variant-numeric:tabular-nums;">BS ${escHtml(String(bs))}</div>` : '<div style="font-size:10px; color:#cbd5e1;">—</div>'}
                        ${drug && drug !== '' ? `<div style="font-size:10px; color:#7c3aed; margin-top:2px; font-weight:600;">${escHtml(String(drug))}${dose ? ` <span style="color:#0f172a">${escHtml(String(dose))}</span>` : ''}</div>` : ''}
                    </td>`;
            }).join('');
            return `
                <tr>
                    <td style="background:#fafafa; padding:6px 10px; font-size:11px; font-weight:600; color:#475569; border:1px solid #cbd5e1; white-space:nowrap;">
                        ${escHtml(fmtRowDate(d.date))}
                    </td>
                    ${cells}
                </tr>`;
        }).join('');

        const drugLegend = drugs.map((dr, i) => `<span style="padding:2px 8px; background:#ede9fe; color:#5b21b6; border-radius:99px; font-size:9px; font-weight:700; margin-right:4px;">${escHtml(dr)}</span>`).join('');

        return `
            <div style="margin-bottom:10px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                <span style="font-size:10px; color:#64748b; font-weight:600; letter-spacing:.3px;">DTX Sheet · BS + Insulin tracking:</span>
                ${drugLegend}
                <span style="font-size:9px; color:#94a3b8;">cells with values highlighted in yellow</span>
            </div>
            <table style="width:100%; border-collapse:collapse; border:1px solid #cbd5e1; border-radius:6px; overflow:hidden;">
                <thead>
                    <tr>
                        <th style="background:#7c3aed; color:white; padding:8px 10px; font-size:11px; font-weight:600; text-align:center; border:1px solid #6d28d9; min-width:120px;">Date</th>
                        ${headerCells}
                    </tr>
                </thead>
                <tbody>${dataRowsHtml}</tbody>
            </table>
        `;
    };

    // Group fields into sections using DFM header captions when available
    const sectionHeaders = extractDfmSections(dfm);
    let bodyHtml;
    const isDtxSheet = instance && instance.form_id === 108;

    // Render fields as sectioned cards. Strategy: group by column prefix
    // (e.g. asm_a*, asm_c*, asm_n*) — HOSxP form designers typically reserve
    // one prefix-letter per logical section. Falls back to DFM section captions
    // if column prefix doesn't yield useful groups.
    const tryDfmRender = () => {
        if (isDtxSheet || fields.length < 30) return null;
        try {
            // Build prefix → group label map (uses first non-empty Caption/note we see)
            const prefixGroups = new Map(); // prefix → { fields: [], label: "" }
            const prefixOf = (col) => {
                const m = String(col).match(/^([a-z_]*?[a-z])\d*$/i);
                if (m) return m[1].toLowerCase();
                return col.toLowerCase();
            };
            for (const f of fields) {
                const p = prefixOf(f.col);
                if (!prefixGroups.has(p)) prefixGroups.set(p, { prefix: p, fields: [], firstCol: f.col });
                prefixGroups.get(p).fields.push(f);
            }

            // Try to enrich each group with a section title from DFM (find section header
            // with the smallest Y that's >= the Y of the FIRST field in this group).
            const sections = extractDfmSections(dfm);
            const positions = extractFieldPositions(dfm);
            const sortedSections = [...sections].sort((a, b) => a.y - b.y);

            const groupArr = [...prefixGroups.values()];
            // Sort groups by the position of their first field (preserve form order)
            groupArr.sort((a, b) => {
                const pa = positions.get(a.fields[0]?.col)?.y ?? 9999999;
                const pb = positions.get(b.fields[0]?.col)?.y ?? 9999999;
                return pa - pb;
            });

            // Assign section title from DFM if available (the section header just above
            // the group's first field's Y position)
            const usedSections = new Set();
            for (const g of groupArr) {
                const firstY = positions.get(g.fields[0]?.col)?.y;
                if (firstY != null) {
                    let bestCaption = '';
                    for (const sec of sortedSections) {
                        if (sec.y <= firstY + 5) bestCaption = sec.caption;
                        else break;
                    }
                    if (bestCaption && bestCaption.length >= 3 && bestCaption.length <= 60) {
                        // Avoid using same DFM section title for many groups (often the outer "main" panel)
                        const base = bestCaption.replace(/\s+\(\d+\)$/, '');
                        const usedKey = base.slice(0, 30);
                        if (!usedSections.has(usedKey)) {
                            g.title = bestCaption;
                            usedSections.add(usedKey);
                        }
                    }
                }
                if (!g.title) g.title = `ส่วน ${g.prefix.replace(/^asm_?/, '').toUpperCase()}`;
            }

            const renderRows = (list) => list.map((f, i) => `
                <tr style="background:${i % 2 ? '#fafafa' : 'white'}">
                    <td style="padding:7px 12px; border-bottom:1px solid #f1f5f9; vertical-align:top; width:42%;">
                        <div style="color:#0f172a; font-weight:500; font-size:11px; line-height:1.4;">${escHtml(f.label || f.col)}</div>
                        ${f.label && f.label !== f.col ? `<div style="font-size:9px; color:#cbd5e1; font-family:monospace; margin-top:2px;">${escHtml(f.col)}</div>` : ''}
                    </td>
                    <td style="padding:7px 12px; border-bottom:1px solid #f1f5f9; vertical-align:top; color:#0f172a; font-size:11px; line-height:1.4;">
                        ${fmtFieldValue(f.value)}
                    </td>
                </tr>
            `).join('');

            const renderCard = (title, list, color) => {
                if (!list || list.length === 0) return '';
                return `
                    <div style="margin-bottom:14px; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; background:white; box-shadow:0 1px 2px rgba(15,23,42,.04);">
                        <div style="padding:10px 16px; background:linear-gradient(135deg, ${color}, ${color}dd); color:white; font-size:13px; font-weight:700; display:flex; justify-content:space-between; align-items:center;">
                            <span>${escHtml(title)}</span>
                            <span style="font-size:10px; font-weight:500; opacity:.9; padding:2px 8px; background:rgba(255,255,255,.18); border-radius:99px;">${list.length} ฟิลด์</span>
                        </div>
                        <table style="width:100%; border-collapse:collapse;">
                            <tbody>${renderRows(list)}</tbody>
                        </table>
                    </div>
                `;
            };

            const cardColors = ['#7c3aed', '#0284c7', '#059669', '#d97706', '#dc2626', '#0891b2', '#be185d', '#475569', '#ea580c', '#16a34a', '#9333ea', '#0e7490'];
            const cards = groupArr
                .filter(g => g.fields.length > 0)
                .map((g, idx) => renderCard(g.title, g.fields, cardColors[idx % cardColors.length]));

            if (cards.length === 0) return null;

            return `
                <div style="margin-bottom:10px; padding:8px 14px; background:#f5f3ff; border-radius:6px; border-left:3px solid #7c3aed; font-size:10px; color:#5b21b6; font-weight:600;">
                    📋 ${groupArr.length} ส่วน · ${fields.length} ฟิลด์ · จัดกลุ่มตาม column prefix แล้ว enrich หัวข้อจาก DFM
                </div>
                ${cards.join('')}
            `;
        } catch (e) {
            logger.warn('[mr-audit/document-layout] sectioned render failed', { error: e.message, form_id: instance?.form_id });
            return null;
        }
    };

    let dfmRenderHtml = null;

    if (fields.length === 0) {
        bodyHtml = `<div style="padding:24px; text-align:center; color:#94a3b8; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:8px;">
            ⚠ ไม่พบข้อมูลในตาราง <code>${escHtml(instance.form_table || '?')}</code> สำหรับ head_id=${instance.head_id}
        </div>`;
    } else if (isDtxSheet) {
        const dtxHtml = renderDtxSheetGrid(instance.valueRow);
        bodyHtml = dtxHtml || `<div style="padding:18px; text-align:center; color:#94a3b8;">⚠ DTX Sheet มีข้อมูลแต่ไม่ครบสำหรับ render grid</div>`;
    } else if ((dfmRenderHtml = tryDfmRender()) != null) {
        bodyHtml = dfmRenderHtml;
    } else {
        // Banner section (top headers like FOCUS/GOAL/ACTIVE/RESOLVED) — show as info chips
        const topHeaderChips = sectionHeaders
            .filter(h => h.y < 200 && h.caption.length < 40 && h.caption.length > 0)
            .slice(0, 8)
            .map(h => `<span style="padding:2px 10px; background:#ede9fe; color:#5b21b6; border-radius:999px; font-size:10px; font-weight:600;">${escHtml(h.caption)}</span>`)
            .join(' ');

        const rowsHtml = fields.map((f, i) => `
            <tr style="background:${i % 2 ? '#fafafa' : 'white'}">
                <td style="padding:8px 12px; border-bottom:1px solid #f1f5f9; vertical-align:top; width:42%;">
                    <strong style="color:#0f172a; font-weight:500;">${escHtml(f.label || f.col)}</strong>
                    ${f.label && f.label !== f.col ? `<div style="font-size:9px; color:#94a3b8; margin-top:2px; font-family:monospace;">${escHtml(f.col)}</div>` : ''}
                </td>
                <td style="padding:8px 12px; border-bottom:1px solid #f1f5f9; vertical-align:top; color:#0f172a;">
                    ${fmtFieldValue(f.value)}
                </td>
            </tr>
        `).join('');

        bodyHtml = `
            ${topHeaderChips ? `<div style="margin-bottom:14px; display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                <span style="font-size:10px; color:#64748b; font-weight:600; letter-spacing:.3px;">หัวข้อในแบบฟอร์ม:</span> ${topHeaderChips}
            </div>` : ''}
            <table style="width:100%; border-collapse:collapse; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">
                <thead><tr style="background:#7c3aed; color:white;">
                    <th style="padding:9px 12px; text-align:left; font-size:11px; font-weight:600; letter-spacing:.4px; width:42%;">หัวข้อ / Label</th>
                    <th style="padding:9px 12px; text-align:left; font-size:11px; font-weight:600; letter-spacing:.4px;">คำตอบ / Value</th>
                </tr></thead>
                <tbody>${rowsHtml}</tbody>
            </table>
        `;
    }

    // Patient block — using header context
    const patientBlock = `
        <table style="width:100%; border-collapse:collapse; border:1px solid #cbd5e1; border-radius:8px; overflow:hidden; margin-bottom:14px; background:#fafafa;">
            <tbody>
                <tr>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600; width:14%;">ชื่อ-สกุล</th>
                    <td style="padding:6px 10px; font-size:12px; font-weight:500; width:36%;">${escHtml(header.pt_name || '—')}</td>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600; width:14%;">HN</th>
                    <td style="padding:6px 10px; font-size:12px; font-weight:500;">${escHtml(header.hn || '—')}</td>
                </tr>
                <tr>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600;">AN</th>
                    <td style="padding:6px 10px; font-size:12px; font-weight:600; color:#7c3aed;">${escHtml(header.an || '—')}</td>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600;">หอผู้ป่วย</th>
                    <td style="padding:6px 10px; font-size:12px; font-weight:500;">${escHtml(header.ward || '—')}${header.ward_name ? ` <span style="color:#64748b; font-size:10px;">${escHtml(header.ward_name)}</span>` : ''}</td>
                </tr>
                <tr>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600;">วันที่รับ</th>
                    <td style="padding:6px 10px; font-size:12px;">${escHtml(fmtDateTH(header.regdate))} ${header.regtime ? `<span style="color:#64748b; font-size:10px;">${escHtml(String(header.regtime).slice(0, 5))}</span>` : ''}</td>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600;">วันที่จำหน่าย</th>
                    <td style="padding:6px 10px; font-size:12px;">${escHtml(fmtDateTH(header.dchdate))} ${header.dchtime ? `<span style="color:#64748b; font-size:10px;">${escHtml(String(header.dchtime).slice(0, 5))}</span>` : ''}</td>
                </tr>
                <tr>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600;">ระยะเวลานอน</th>
                    <td style="padding:6px 10px; font-size:12px;">${escHtml(String(header.los_days || 0))} วัน</td>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600;">สิทธิ์การรักษา</th>
                    <td style="padding:6px 10px; font-size:12px;">${escHtml(header.pttype || '—')}</td>
                </tr>
                <tr>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600;">แพทย์รับเข้า</th>
                    <td style="padding:6px 10px; font-size:12px;">${escHtml(header.adm_doctor || '—')}</td>
                    <th style="background:#f1f5f9; padding:6px 10px; font-size:10px; color:#475569; text-align:right; font-weight:600;">แพทย์จำหน่าย</th>
                    <td style="padding:6px 10px; font-size:12px;">${escHtml(header.dch_doctor || '—')}</td>
                </tr>
            </tbody>
        </table>
    `;

    // Hospital banner
    const banner = `
        <header style="display:flex; align-items:center; gap:14px; padding-bottom:10px; border-bottom:3px double #7c3aed; margin-bottom:14px;">
            <div style="flex:0 0 auto;">${HOSPITAL.logoSvg}</div>
            <div style="flex:1;">
                <div style="font-size:16px; font-weight:700; color:#0f172a; line-height:1.1;">${escHtml(HOSPITAL.name_th)}</div>
                <div style="font-size:10px; color:#64748b; margin-top:1px;">${escHtml(HOSPITAL.name_en)} · รหัสสถานพยาบาล ${escHtml(HOSPITAL.code)}</div>
                <div style="font-size:10px; color:#64748b;">${escHtml(HOSPITAL.address)}</div>
            </div>
            <div style="text-align:right; font-size:10px; color:#64748b; line-height:1.4;">
                <div style="font-weight:700; color:#dc2626; letter-spacing:.5px; font-size:9px;">CONFIDENTIAL</div>
                <div>เอกสารทางการแพทย์</div>
                <div>Medical Record Document</div>
            </div>
        </header>
    `;

    // Form title section
    const titleBlock = `
        <div style="text-align:center; margin-bottom:16px;">
            <div style="font-size:9px; color:#7c3aed; font-weight:600; letter-spacing:1px; text-transform:uppercase;">Assessment Form Export</div>
            <h1 style="font-size:18px; font-weight:700; color:#0f172a; margin:4px 0 2px; letter-spacing:.2px;">${escHtml(instance.form_name || `Form #${instance.form_id}`)}</h1>
            <div style="font-size:10px; color:#64748b;">บันทึกเมื่อ ${escHtml(fmtDateTimeTH(instance.datetime))} โดย ${escHtml(instance.staff || '—')}</div>
        </div>
    `;

    // Signature block
    const signature = `
        <section style="margin-top:24px; display:grid; grid-template-columns:1fr 1fr; gap:24px;">
            <div>
                <div style="font-size:10px; color:#64748b; margin-bottom:36px;">ผู้บันทึก / Recorder</div>
                <div style="border-top:1px solid #475569; padding-top:4px; text-align:center;">
                    <div style="font-size:11px; color:#0f172a; font-weight:500;">${escHtml(instance.staff || '____________________')}</div>
                    <div style="font-size:9px; color:#94a3b8; margin-top:2px;">${escHtml(fmtDateTimeTH(instance.datetime))}</div>
                </div>
            </div>
            <div>
                <div style="font-size:10px; color:#64748b; margin-bottom:36px;">ผู้ตรวจสอบ / MR Audit</div>
                <div style="border-top:1px solid #475569; padding-top:4px; text-align:center;">
                    <div style="font-size:11px; color:#94a3b8; font-style:italic;">ลงชื่อ ____________________</div>
                    <div style="font-size:9px; color:#94a3b8; margin-top:2px;">วันที่ ____________________</div>
                </div>
            </div>
        </section>
    `;

    // Footer
    const footer = `
        <footer style="margin-top:16px; padding-top:8px; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between; font-size:9px; color:#94a3b8;">
            <div>เลขที่: form#${instance.form_id} · head#${instance.head_id} · table=<code>${escHtml(instance.form_table || '?')}</code></div>
            <div>หน้า ${pageNum || 1}/${pageTotal || 1} · พิมพ์ ${escHtml(fmtDateTimeTH(new Date()))}</div>
        </footer>
        <div style="margin-top:6px; font-size:8px; color:#cbd5e1; text-align:center; letter-spacing:.5px;">★ เอกสารทางการแพทย์ของ ${escHtml(HOSPITAL.name_th)} · ห้ามเผยแพร่หรือทำซ้ำโดยไม่ได้รับอนุญาต ★</div>
    `;

    return banner + titleBlock + patientBlock + bodyHtml + signature + footer;
}

// ─────────────────────────────────────────────────────────────
// Assessment instance loader
//   Given a list of assessment_head_id (already validated to belong
//   to one AN), return an array of fully-hydrated assessment objects:
//   { head, form, items, values }
// Schema (HOSxP):
//   assessment_head        (head_id, form_id, an, datetime, staff)
//   assessment_form        (form_id, name, form_table)
//   assessment_items       (form_id, column, note=label, component_id)
//   <form_table> dynamic   (assessment_head_id, ...form columns...)
// SECURITY: form_table comes from the DB, NEVER from user input.
//   We still re-check the regex defensively before interpolating.
// ─────────────────────────────────────────────────────────────
const SAFE_TABLE_RE = /^[a-zA-Z0-9_]+$/;
const SKIP_VALUE_COLS = new Set(['vnan', 'vn', 'an', 'hn', 'patient_type', 'assessment_head_id']);

async function loadAssessmentInstances(an, ids) {
    if (!ids.length) return [];
    // 1. Pull head rows + form metadata, scoped to this AN
    const placeholders = ids.map(() => '?').join(',');
    const headRows = await dbQuery(
        `SELECT ah.assessment_head_id, ah.assessment_form_id, ah.assessment_head_datetime,
                ah.assessment_head_staff, ah.an, af.assessment_form_name, af.assessment_form_table,
                af.assessment_form_dfm
         FROM   assessment_head ah
         LEFT JOIN assessment_form af ON af.assessment_form_id = ah.assessment_form_id
         WHERE  ah.assessment_head_id IN (${placeholders}) AND ah.an = ?`,
        [...ids, an]
    );
    if (headRows.length === 0) return [];

    // 2. For each unique form_id, fetch item labels
    const formIds = [...new Set(headRows.map(r => r.assessment_form_id).filter(Boolean))];
    const itemMaps = new Map(); // form_id -> Map(column -> label)
    if (formIds.length) {
        const ph = formIds.map(() => '?').join(',');
        const itemRows = await dbQuery(
            `SELECT assessment_form_id, assessment_items_column, assessment_items_note,
                    assessment_component_id, assessment_items_id
             FROM   assessment_items
             WHERE  assessment_form_id IN (${ph})
             ORDER  BY assessment_form_id, assessment_items_id`,
            formIds
        );
        for (const it of itemRows) {
            if (!itemMaps.has(it.assessment_form_id)) itemMaps.set(it.assessment_form_id, []);
            itemMaps.get(it.assessment_form_id).push(it);
        }
    }

    // 3. For each head row, load the form-table row (dynamic SQL — safe-checked)
    const out = [];
    for (const id of ids) {
        const head = headRows.find(r => Number(r.assessment_head_id) === Number(id));
        if (!head) continue;
        const ftable = head.assessment_form_table;
        let valueRow = null;
        if (ftable && SAFE_TABLE_RE.test(ftable)) {
            try {
                const r = await dbQuery(
                    `SELECT * FROM \`${ftable}\` WHERE assessment_head_id = ? LIMIT 1`,
                    [head.assessment_head_id]
                );
                valueRow = r[0] || null;
            } catch (err) {
                logger.warn('[mr-audit/loadAssessment] dynamic table read failed', {
                    table: ftable, head_id: head.assessment_head_id, error: err.message,
                });
            }
        }

        const items = itemMaps.get(head.assessment_form_id) || [];
        const labelByCol = new Map(items.map(it => [it.assessment_items_column, it.assessment_items_note || '']));

        // Build ordered field list from the form-items definition first
        // (preserves form designer's intended order); then append any
        // columns that exist in the row but weren't in items list.
        const fields = [];
        const seen = new Set();
        if (valueRow) {
            for (const it of items) {
                const col = it.assessment_items_column;
                if (!col || seen.has(col)) continue;
                seen.add(col);
                if (!(col in valueRow)) continue;
                const v = valueRow[col];
                if (v === null || v === '' || v === undefined) continue;
                fields.push({ col, label: it.assessment_items_note || col, value: v, component: it.assessment_component_id });
            }
            // Append any extra non-meta columns
            for (const [col, v] of Object.entries(valueRow)) {
                if (seen.has(col)) continue;
                if (SKIP_VALUE_COLS.has(col)) continue;
                if (col.endsWith('_id')) continue;
                if (v === null || v === '' || v === undefined) continue;
                fields.push({ col, label: labelByCol.get(col) || col, value: v });
            }
        }

        out.push({
            head_id: head.assessment_head_id,
            form_id: head.assessment_form_id,
            form_name: head.assessment_form_name,
            form_table: ftable,
            datetime: head.assessment_head_datetime,
            staff: head.assessment_head_staff,
            field_count: fields.length,
            fields,
            valueRow,
            dfm: head.assessment_form_dfm || null,
        });
    }
    return out;
}

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/pdf/assessments/:an?ids=hd1,hd2,...
//   Render selected assessments in user-supplied order, each as
//   its own page (page-break-after) with form fields rendered as
//   key-value pairs.
// ─────────────────────────────────────────────────────────────
router.get('/pdf/assessments/:an', async (req, res) => {
    const an = String(req.params.an || '').replace(/[^0-9]/g, '');
    if (!an) return res.status(400).send('invalid AN');

    const idsParam = String(req.query.ids || '');
    const ids = idsParam.split(',').map(s => s.trim()).filter(s => /^\d+$/.test(s)).map(Number);
    if (ids.length === 0) return res.status(400).send('ids query param required (comma-separated assessment_head_id list)');
    if (ids.length > 30) return res.status(400).send('too many ids (max 30)');

    // layout: 'document' (default — medical record style) | 'form' (DFM-positioned replica) | 'fields' (raw key-value table)
    const rawLayout = (req.query.layout || 'document').toLowerCase();
    const layout = ['document', 'form', 'fields'].includes(rawLayout) ? rawLayout : 'document';

    try {
        const headerRows = await dbQuery(`${baseSql()} WHERE i.an = ? LIMIT 1`, [an]);
        const header = headerRows[0];
        if (!header) return res.status(404).send('AN not found');

        const instances = await loadAssessmentInstances(an, ids);
        if (instances.length === 0) {
            return res.status(404).send(htmlShell(`AN ${an} — no assessments`,
                `<div class="page"><div class="brand">BCH 360° · Medical Record Audit</div><h1>AN ${escapeHtml(an)} ไม่มี assessment ตาม ids ที่ระบุ</h1></div>`));
        }

        const fmtFieldValue = (v) => {
            if (v == null) return '—';
            if (v instanceof Date) return fmtDateTH(v);
            if (typeof v === 'object') return escapeHtml(JSON.stringify(v));
            const s = String(v);
            if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
                const d = new Date(s);
                if (!isNaN(d)) return escapeHtml(fmtDateTH(s));
            }
            return escapeHtml(s).replace(/\n/g, '<br>');
        };

        const renderFieldsTable = (a) =>
            a.field_count === 0
                ? `<div class="muted">⚠ ไม่พบข้อมูลในตาราง <code>${escapeHtml(a.form_table || '?')}</code> สำหรับ head_id=${a.head_id}</div>`
                : `<table>
                    <colgroup><col style="width:40%"><col style="width:60%"></colgroup>
                    <thead><tr><th>หัวข้อ</th><th>คำตอบ</th></tr></thead>
                    <tbody>${a.fields.map(f => `
                        <tr>
                            <td><strong>${escapeHtml(f.label || f.col)}</strong>${f.label && f.label !== f.col ? `<br><span class="muted" style="font-size:9px">${escapeHtml(f.col)}</span>` : ''}</td>
                            <td>${fmtFieldValue(f.value)}</td>
                        </tr>`).join('')}</tbody>
                  </table>`;

        const renderFormLayout = (a) => {
            try {
                const tree = parseDfm(a.dfm);
                const rendered = tree ? renderFormFromDfm(tree, a.valueRow, header) : null;
                if (!rendered) return null;
                return `<div style="border:1px solid #cbd5e1; border-radius:6px; background:#fafafa; padding:12px;">${rendered.html}</div>
                        <div class="muted" style="margin-top:6px; font-size:9px">Layout จาก HOSxP form designer · scale ${rendered.scale.toFixed(2)} · ${rendered.scaledW}×${rendered.scaledH}px</div>`;
            } catch (err) {
                logger.warn('[mr-audit/pdf/assessments] DFM render failed', { head_id: a.head_id, error: err.message });
                return null;
            }
        };

        const sections = instances
            .map((a, idx) => {
                let body;
                if (layout === 'document') {
                    let dfmTree = null;
                    try { dfmTree = parseDfm(a.dfm); } catch {}
                    body = renderFormDocument({
                        instance: a, header, fields: a.fields, dfm: dfmTree,
                        pageNum: idx + 1, pageTotal: instances.length,
                    });
                    return `<div class="page" style="${idx > 0 ? 'page-break-before: always;' : ''}">${body}</div>`;
                }
                if (layout === 'form') {
                    const formHtml = a.dfm ? renderFormLayout(a) : null;
                    body = formHtml || renderFieldsTable(a);
                    const note = !formHtml && a.dfm
                        ? '<div class="muted" style="margin-bottom:8px">⚠ ไม่สามารถ render layout ตามฟอร์ม HOSxP — แสดงแบบ key-value แทน</div>'
                        : '';
                    return `<div class="page" style="${idx > 0 ? 'page-break-before: always;' : ''}">
                        <div class="brand">BCH 360° · Assessment Form Export · ${idx + 1} / ${instances.length}</div>
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
                            <div>
                                <h1 style="font-size:16px">${escapeHtml(a.form_name || `Form #${a.form_id}`)}</h1>
                                <div class="muted">AN ${escapeHtml(header.an)} · HN ${escapeHtml(header.hn)} · ${escapeHtml(header.pt_name || '')} · Ward ${escapeHtml(header.ward)}</div>
                            </div>
                            <div style="text-align:right; font-size:11px">
                                <div class="muted">บันทึกเมื่อ</div>
                                <div><strong>${fmtDateTimeTH(a.datetime)}</strong></div>
                                <div class="muted" style="margin-top:4px">โดย ${escapeHtml(a.staff || '—')}</div>
                                <div class="muted" style="margin-top:4px">head_id ${a.head_id} · form_id ${a.form_id}</div>
                            </div>
                        </div>
                        <h2>เนื้อหาแบบประเมิน${a.field_count ? ` (${a.field_count} fields)` : ''}</h2>
                        ${note}${body}
                        <div class="foot">${escapeHtml(a.form_name || '')} · ${escapeHtml(a.form_table || '')} · พิมพ์ ${fmtDateTimeTH(new Date())}</div>
                    </div>`;
                }
                // fields fallback
                body = renderFieldsTable(a);
                return `<div class="page" style="${idx > 0 ? 'page-break-before: always;' : ''}">
                    <div class="brand">BCH 360° · Assessment Form Export · ${idx + 1} / ${instances.length}</div>
                    <h1 style="font-size:16px">${escapeHtml(a.form_name || `Form #${a.form_id}`)}</h1>
                    <div class="muted">AN ${escapeHtml(header.an)} · HN ${escapeHtml(header.hn)} · ${escapeHtml(header.pt_name || '')} · Ward ${escapeHtml(header.ward)}</div>
                    <h2>เนื้อหาแบบประเมิน${a.field_count ? ` (${a.field_count} fields)` : ''}</h2>
                    ${body}
                    <div class="foot">${escapeHtml(a.form_name || '')} · ${escapeHtml(a.form_table || '')} · พิมพ์ ${fmtDateTimeTH(new Date())}</div>
                </div>`;
            })
            .join('');

        // 3-way layout toggle bar
        const toggleStyle = (active) => `padding:5px 12px; border-radius:5px; background:${active ? '#7c3aed' : '#f1f5f9'}; color:${active ? 'white' : '#475569'}; text-decoration:none; font-weight:600; font-size:11px;`;
        const toggleBar = `<div class="no-print" style="position:fixed; top:8px; left:8px; z-index:99; background:white; border:1px solid #cbd5e1; border-radius:8px; padding:6px 8px; display:flex; gap:4px; align-items:center; box-shadow:0 2px 8px rgba(0,0,0,.08);">
            <span style="color:#64748b; font-size:10px; font-weight:600;">รูปแบบ:</span>
            <a href="?ids=${ids.join(',')}&layout=document" style="${toggleStyle(layout === 'document')}">📜 มาตรฐานเวชระเบียน</a>
            <a href="?ids=${ids.join(',')}&layout=form" style="${toggleStyle(layout === 'form')}">📋 ตามฟอร์ม HOSxP</a>
            <a href="?ids=${ids.join(',')}&layout=fields" style="${toggleStyle(layout === 'fields')}">📊 ตาราง key-value</a>
        </div>`;

        const html = htmlShell(
            `Assessments — AN ${header.an} (${instances.length} ฟอร์ม) · layout=${layout}`,
            toggleBar + sections
        );
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
    } catch (err) {
        logger.error('[mr-audit/pdf/assessments]', { an, error: err.message });
        res.status(500).send(`<pre>${escapeHtml(err.message)}</pre>`);
    }
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/pdf/detail/:an
//   Per-AN audit worksheet HTML
// ─────────────────────────────────────────────────────────────
router.get('/pdf/detail/:an', async (req, res) => {
    const an = String(req.params.an || '').replace(/[^0-9]/g, '');
    if (!an) return res.status(400).send('invalid AN');

    try {
        const headerSql = `${baseSql()} WHERE i.an = ? LIMIT 1`;
        const [headerRows, diagRows, dchSummaryRows, nurseSampleRows, assessRows] = await Promise.all([
            dbQuery(headerSql, [an]),
            dbQuery(
                `SELECT diagtype, icd10, diagnosis_note, doctor, entry_datetime
                 FROM iptdiag WHERE an = ? ORDER BY diagtype, diag_no`,
                [an]
            ),
            dbQuery(
                `SELECT doctor_code, summary_datetime, LEFT(summary_note_text, 800) AS preview
                 FROM ipt_discharge_summary_note WHERE an = ?
                 ORDER BY summary_datetime DESC LIMIT 5`,
                [an]
            ),
            dbQuery(
                `SELECT note_date, COUNT(*) AS note_count,
                        AVG(temperature) AS avg_temp,
                        AVG(pulse) AS avg_pulse,
                        AVG(bp_systolic) AS avg_sbp,
                        AVG(bp_diastolic) AS avg_dbp
                 FROM ipd_nurse_note WHERE an = ?
                 GROUP BY note_date ORDER BY note_date`,
                [an]
            ),
            dbQuery(
                `SELECT ah.assessment_head_id, af.assessment_form_name, ah.assessment_head_datetime, ah.assessment_head_staff
                 FROM assessment_head ah
                 LEFT JOIN assessment_form af ON af.assessment_form_id = ah.assessment_form_id
                 WHERE ah.an = ? ORDER BY ah.assessment_head_datetime DESC`,
                [an]
            ),
        ]);

        if (!headerRows[0]) return res.status(404).send('AN not found');
        if (assessRows.length === 0) {
            return res.status(404).send(
                htmlShell(
                    `AN ${an} — ไม่มี assessment`,
                    `<div class="page">
                        <div class="brand">BCH 360° · Medical Record Audit</div>
                        <h1>AN ${escapeHtml(an)} ยังไม่มี Assessment ใน HOSxP</h1>
                        <p class="muted">เอกสารนี้ใช้สำหรับ AN ที่มี <strong>assessment_head ≥ 1</strong> เท่านั้น</p>
                    </div>`
                )
            );
        }

        const header = headerRows[0];
        const completeness = scoreCompleteness(header);
        const auditHistory = stmtHistoryForAn.all(an).map((h) => ({
            ...h,
            flagged_items: h.flagged_items ? JSON.parse(h.flagged_items) : [],
        }));

        const COMP_LABELS = {
            pdx: 'Primary Dx',
            dch_summary: 'Discharge Summary',
            nurse_notes: 'Nursing Notes ครบ LOS',
            dch_plan: 'Discharge Planning',
        };

        const compChips = Object.entries(COMP_LABELS)
            .map(([k, label]) => {
                const ok = completeness[k];
                return `<span class="badge ${ok ? 'b-green' : 'b-red'}">${ok ? '✓' : '✗'} ${escapeHtml(label)}</span>`;
            })
            .join(' ');

        const diagHtml = diagRows.length
            ? diagRows
                  .map(
                      (d) =>
                          `<span class="badge ${d.diagtype === '1' ? 'b-purple' : 'b-slate'}"><strong>${d.diagtype === '1' ? 'PDX' : `Sec.${escapeHtml(d.diagtype)}`}</strong> ${escapeHtml(d.icd10 || '')}${d.diagnosis_note ? ` (${escapeHtml(d.diagnosis_note)})` : ''}</span>`
                  )
                  .join(' ')
            : '<span class="muted">⚠ ยังไม่มีการลง Diagnosis</span>';

        const nurseHtml = nurseSampleRows.length
            ? `<table><thead><tr><th>วันที่</th><th>จำนวนครั้ง</th><th>Temp °C</th><th>Pulse</th><th>BP (mmHg)</th></tr></thead><tbody>${nurseSampleRows
                  .map(
                      (d) =>
                          `<tr><td>${fmtDateTH(d.note_date)}</td><td>${d.note_count}</td><td>${Number(d.avg_temp || 0).toFixed(1)}</td><td>${Math.round(d.avg_pulse || 0)}</td><td>${Math.round(d.avg_sbp || 0)}/${Math.round(d.avg_dbp || 0)}</td></tr>`
                  )
                  .join('')}</tbody></table>`
            : '<span class="muted">ยังไม่มี nursing notes</span>';

        const assessHtml = `<table><thead><tr><th>วัน-เวลา</th><th>แบบประเมิน</th><th>ผู้บันทึก</th></tr></thead><tbody>${assessRows
            .map(
                (a) =>
                    `<tr><td>${fmtDateTimeTH(a.assessment_head_datetime)}</td><td>${escapeHtml(a.assessment_form_name || `form#${a.assessment_form_id || '?'}`)}</td><td>${escapeHtml(a.assessment_head_staff || '—')}</td></tr>`
            )
            .join('')}</tbody></table>`;

        const dchSumHtml = dchSummaryRows.length
            ? dchSummaryRows
                  .map(
                      (d) =>
                          `<div style="margin:8px 0;padding:8px 10px;background:#fafafa;border-left:3px solid #7c3aed;border-radius:4px;"><div class="muted">${escapeHtml(d.doctor_code || '—')} · ${fmtDateTimeTH(d.summary_datetime)}</div><div style="white-space:pre-wrap;font-size:11px;margin-top:4px">${escapeHtml(d.preview || '')}</div></div>`
                  )
                  .join('')
            : '<span class="muted">⚠ ยังไม่มี Discharge Summary Note</span>';

        const auditHistHtml = auditHistory.length
            ? auditHistory
                  .map((h) => {
                      const lbl = STATUS_LABEL_TH[h.status] || { class: 'b-slate', label: h.status };
                      return `<div style="margin:6px 0;padding:8px 10px;background:#fafafa;border-radius:4px;border:1px solid #e2e8f0">
                          <div><span class="badge ${lbl.class}">${escapeHtml(lbl.label)}</span> <span class="muted">โดย ${escapeHtml(h.audited_by)} · ${fmtDateTimeTH(h.audited_at)}</span></div>
                          ${h.comment ? `<div style="margin-top:4px">${escapeHtml(h.comment)}</div>` : ''}
                          ${h.flagged_items?.length ? `<div class="muted" style="margin-top:4px">Flags: ${h.flagged_items.map((k) => escapeHtml(COMP_LABELS[k] || k)).join(', ')}</div>` : ''}
                      </div>`;
                  })
                  .join('')
            : '<span class="muted">ยังไม่มีบันทึกในระบบ sidecar</span>';

        const html = htmlShell(
            `AN ${header.an} — MR Audit Worksheet`,
            `<div class="page">
                <div class="brand">BCH 360° · Medical Record Audit Worksheet</div>
                <h1>AN ${escapeHtml(header.an)} — ${escapeHtml(header.pt_name || '—')}</h1>
                <div class="muted">พิมพ์ ${fmtDateTimeTH(new Date())} · เอกสารนี้สำหรับ MR audit เฉพาะ AN ที่มี assessment ≥ 1</div>

                <div class="kv">
                    <div><div class="lbl">HN</div><div class="val">${escapeHtml(header.hn)}</div></div>
                    <div><div class="lbl">หอผู้ป่วย</div><div class="val">${escapeHtml(header.ward)} · ${escapeHtml(header.ward_name || '')}</div></div>
                    <div><div class="lbl">Admit → Discharge</div><div class="val">${fmtDateTH(header.regdate)} → ${fmtDateTH(header.dchdate)}</div></div>
                    <div><div class="lbl">LOS</div><div class="val">${header.los_days} วัน</div></div>
                    <div><div class="lbl">Pttype</div><div class="val">${escapeHtml(header.pttype || '—')}</div></div>
                    <div><div class="lbl">DRG</div><div class="val">${escapeHtml(header.drg || 'ยังไม่ group')}</div></div>
                    <div><div class="lbl">AdjRW</div><div class="val">${header.adjrw != null ? Number(header.adjrw).toFixed(3) : '—'}</div></div>
                    <div><div class="lbl">Adm Doctor / Dch Doctor</div><div class="val">${escapeHtml(header.adm_doctor || '—')} / ${escapeHtml(header.dch_doctor || '—')}</div></div>
                </div>

                <h2>ความครบถ้วน · Completeness</h2>
                <div>${compBadge(completeness.score)}</div>
                <div style="margin-top:8px">${compChips}</div>

                <h2>HOSxP Audit Flags</h2>
                <div>
                    Doctor Final Summary: ${header.doc_summary === 'Y' ? '<span class="badge b-green">Y</span>' : '<span class="badge b-red">N</span>'}
                    &nbsp;&nbsp; HOSxP MR Audit: ${header.hosxp_mr_audit === 'Y' ? '<span class="badge b-green">Y</span>' : '<span class="badge b-red">N</span>'}
                    &nbsp;&nbsp; Coding Done: ${header.coding_done === 'Y' ? '<span class="badge b-green">Y</span>' : '<span class="badge b-red">N</span>'}
                </div>
                ${header.audit_summary_text ? `<div class="muted" style="margin-top:6px">Note: ${escapeHtml(header.audit_summary_text)}</div>` : ''}

                <h2>Diagnoses (${diagRows.length})</h2>
                <div>${diagHtml}</div>

                <h2>Nursing Notes by Day (${nurseSampleRows.length})</h2>
                ${nurseHtml}

                <h2>Assessments (${assessRows.length})</h2>
                ${assessHtml}

                <h2>Discharge Summary Notes (${dchSummaryRows.length})</h2>
                ${dchSumHtml}

                <h2>ประวัติการตรวจสอบ (Sidecar)</h2>
                ${auditHistHtml}

                <h2>บันทึกผลการตรวจ (สำหรับลงนาม)</h2>
                <div>ผลการตรวจ:
                    <span class="checkbox-row">
                        <label><input type="checkbox"> ผ่านการตรวจ</label>
                        <label><input type="checkbox"> ติดธง (ขอแก้)</label>
                        <label><input type="checkbox"> ไม่ผ่าน</label>
                    </span>
                </div>
                <div style="margin-top:10px">รายการที่ติดธง:
                    <span class="checkbox-row">
                        ${Object.entries(COMP_LABELS).map(([k, l]) => `<label><input type="checkbox"> ${escapeHtml(l)}</label>`).join(' ')}
                    </span>
                </div>
                <div style="margin-top:10px">ความเห็น:</div>
                <div style="border:1px solid #cbd5e1;border-radius:6px;min-height:60px;padding:8px;margin-top:4px"></div>

                <div class="sig-grid">
                    <div><div style="height:48px"></div><div class="sig-line">ผู้ตรวจสอบ (เวชระเบียน)</div></div>
                    <div><div style="height:48px"></div><div class="sig-line">หัวหน้างานเวชระเบียน</div></div>
                </div>

                <div class="foot">BCH 360° Intelligence V.10 · MR Audit Worksheet · AN ${escapeHtml(header.an)} · เอกสารภายในโรงพยาบาล</div>
            </div>`
        );

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
    } catch (err) {
        logger.error('[mr-audit/pdf/detail]', { an, error: err.message });
        res.status(500).send(`<pre>${escapeHtml(err.message)}</pre>`);
    }
});

// ─────────────────────────────────────────────────────────────
// Staff CID services report
//   Read CID list from sidecar.staff_cid_list (active='Y')
//   For each CID match patient.cid → aggregate OPD/IPD over date range
//   Default range = current Thai fiscal year (Oct 1 → today)
// ─────────────────────────────────────────────────────────────
const stmtAllStaffCids = sidecar.prepare(
    `SELECT cid, note FROM staff_cid_list WHERE active = 'Y' ORDER BY cid_id`
);

function currentThaiFy() {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const fyYear = m >= 10 ? y : y - 1;
    return {
        start: `${fyYear}-10-01`,
        end:   today.toISOString().slice(0, 10),
        fy_be: fyYear + 544, // Thai BE for label
    };
}

router.get('/staff-cid-services', async (req, res) => {
    try {
        const fy = currentThaiFy();
        const start = String(req.query.start || fy.start).slice(0, 10);
        const end   = String(req.query.end   || fy.end).slice(0, 10);

        // 1. Pull CID list from sidecar
        const cidRows = stmtAllStaffCids.all();
        const cids = cidRows.map(r => r.cid);
        if (cids.length === 0) {
            return res.json({ rows: [], totals: {}, count: 0, message: 'staff_cid_list is empty' });
        }

        // 2. Build SQL with IN clause + 6 sub-selects per row
        const ph = cids.map(() => '?').join(',');
        const sql = `
            SELECT
                p.cid, p.hn,
                CONCAT(IFNULL(p.pname,''), IFNULL(p.fname,''), ' ', IFNULL(p.lname,'')) AS pt_name,
                p.sex,
                CASE WHEN p.birthday IS NOT NULL AND p.birthday > '1900-01-01'
                     THEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) ELSE NULL END AS age,
                (SELECT COUNT(*) FROM ovst o
                 WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ?
                   AND (o.an IS NULL OR o.an = '')) AS opd_visits,
                (SELECT COUNT(*) FROM ipt i
                 WHERE i.hn = p.hn AND i.regdate BETWEEN ? AND ?) AS ipd_admits,
                (SELECT IFNULL(SUM(v.income), 0) FROM ovst o
                 LEFT JOIN vn_stat v ON v.vn = o.vn
                 WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ?) AS opd_income,
                (SELECT IFNULL(SUM(i.ot), 0) FROM ipt i
                 WHERE i.hn = p.hn AND i.regdate BETWEEN ? AND ?) AS ipd_income,
                (SELECT MAX(o.vstdate) FROM ovst o
                 WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ?) AS last_opd_date,
                (SELECT MAX(i.regdate) FROM ipt i
                 WHERE i.hn = p.hn AND i.regdate BETWEEN ? AND ?) AS last_ipd_date,
                (SELECT pttype FROM ovst o
                 WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ?
                 GROUP BY pttype ORDER BY COUNT(*) DESC LIMIT 1) AS top_pttype,
                (SELECT k.department FROM ovst o
                 LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
                 WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ?
                   AND o.main_dep IS NOT NULL AND o.main_dep != ''
                 GROUP BY o.main_dep ORDER BY COUNT(*) DESC LIMIT 1) AS top_dept
            FROM patient p
            WHERE p.cid IN (${ph})
        `;
        const params = [];
        // 8 sub-queries each take (start, end): opd_visits, ipd_admits,
        // opd_income, ipd_income, last_opd_date, last_ipd_date, top_pttype, top_dept
        for (let i = 0; i < 8; i++) params.push(start, end);
        params.push(...cids);

        const rows = await dbQueryHeavy(
            `staff_cid_${start}_${end}_${cids.length}`,
            10,
            sql,
            params
        );

        // 3. Compute total income + classify
        const enriched = rows.map(r => ({
            ...r,
            total_income: Number(r.opd_income || 0) + Number(r.ipd_income || 0),
            last_visit: [r.last_opd_date, r.last_ipd_date].filter(Boolean).sort().pop() || null,
            has_visit: Number(r.opd_visits || 0) > 0 || Number(r.ipd_admits || 0) > 0,
        }));

        // 4. Find missing (CIDs in list but no patient match)
        const matchedCids = new Set(enriched.map(r => r.cid));
        const missingCids = cids.filter(c => !matchedCids.has(c));

        // 5. Compute totals
        const totals = enriched.reduce((acc, r) => ({
            opd_visits:   acc.opd_visits   + Number(r.opd_visits   || 0),
            ipd_admits:   acc.ipd_admits   + Number(r.ipd_admits   || 0),
            opd_income:   acc.opd_income   + Number(r.opd_income   || 0),
            ipd_income:   acc.ipd_income   + Number(r.ipd_income   || 0),
            total_income: acc.total_income + Number(r.total_income || 0),
            with_visits:  acc.with_visits  + (r.has_visit ? 1 : 0),
        }), { opd_visits: 0, ipd_admits: 0, opd_income: 0, ipd_income: 0, total_income: 0, with_visits: 0 });

        res.json({
            data_source: 'HOSxP XE patient/ovst/ipt + sidecar staff_cid_list',
            window: { start, end, fy_be: fy.fy_be },
            cid_total: cids.length,
            matched: enriched.length,
            missing: missingCids.length,
            missing_cids: missingCids,
            with_visits: totals.with_visits,
            without_visits: enriched.length - totals.with_visits,
            totals,
            rows: enriched,
        });
    } catch (err) {
        logger.error('[mr-audit/staff-cid-services]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// PDF export of staff-CID-services (HTML auto-print, document style)
// ─────────────────────────────────────────────────────────────
router.get('/staff-cid-services/pdf', async (req, res) => {
    try {
        // Re-fetch via the data endpoint logic (simpler: duplicate the call)
        // To keep code DRY, we'd extract a helper; for now inline the same query.
        const fy = currentThaiFy();
        const start = String(req.query.start || fy.start).slice(0, 10);
        const end   = String(req.query.end   || fy.end).slice(0, 10);
        const cids  = stmtAllStaffCids.all().map(r => r.cid);
        if (cids.length === 0) return res.send(htmlShell('CID list empty', '<div class="page"><h1>staff_cid_list ว่าง</h1></div>'));

        const ph = cids.map(() => '?').join(',');
        const sql = `
            SELECT p.cid, p.hn,
                CONCAT(IFNULL(p.pname,''), IFNULL(p.fname,''), ' ', IFNULL(p.lname,'')) AS pt_name,
                CASE WHEN p.birthday IS NOT NULL AND p.birthday > '1900-01-01'
                     THEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) ELSE NULL END AS age,
                (SELECT COUNT(*) FROM ovst o
                 WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ? AND (o.an IS NULL OR o.an = '')) AS opd_visits,
                (SELECT COUNT(*) FROM ipt i
                 WHERE i.hn = p.hn AND i.regdate BETWEEN ? AND ?) AS ipd_admits,
                (SELECT IFNULL(SUM(v.income), 0) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn
                 WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ?) AS opd_income,
                (SELECT IFNULL(SUM(i.ot), 0) FROM ipt i WHERE i.hn = p.hn AND i.regdate BETWEEN ? AND ?) AS ipd_income,
                (SELECT MAX(o.vstdate) FROM ovst o WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ?) AS last_opd_date,
                (SELECT pttype FROM ovst o WHERE o.hn = p.hn AND o.vstdate BETWEEN ? AND ?
                 GROUP BY pttype ORDER BY COUNT(*) DESC LIMIT 1) AS top_pttype
            FROM patient p WHERE p.cid IN (${ph})
        `;
        const params = [];
        for (let i = 0; i < 6; i++) params.push(start, end);
        params.push(...cids);
        const rows = await dbQueryHeavy(`staff_cid_pdf_${start}_${end}_${cids.length}`, 10, sql, params);

        const enriched = rows.map(r => ({
            ...r,
            total_income: Number(r.opd_income || 0) + Number(r.ipd_income || 0),
            has_visit: Number(r.opd_visits || 0) > 0 || Number(r.ipd_admits || 0) > 0,
        }));

        const totals = enriched.reduce((acc, r) => ({
            opd: acc.opd + Number(r.opd_visits || 0),
            ipd: acc.ipd + Number(r.ipd_admits || 0),
            inc: acc.inc + Number(r.total_income || 0),
            withV: acc.withV + (r.has_visit ? 1 : 0),
        }), { opd: 0, ipd: 0, inc: 0, withV: 0 });

        const tbody = enriched
            .sort((a, b) => Number(b.total_income || 0) - Number(a.total_income || 0))
            .map((r, i) => `<tr>
                <td>${i + 1}</td>
                <td>${escapeHtml(r.cid)}</td>
                <td>${escapeHtml(r.hn || '—')}</td>
                <td>${escapeHtml(r.pt_name || '—')}</td>
                <td style="text-align:center">${r.age != null ? r.age : '—'}</td>
                <td style="text-align:right">${escapeHtml(String(r.opd_visits || 0))}</td>
                <td style="text-align:right">${escapeHtml(String(r.ipd_admits || 0))}</td>
                <td style="text-align:right">${Number(r.total_income || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                <td>${escapeHtml(fmtDateTH(r.last_opd_date))}</td>
                <td>${escapeHtml(r.top_pttype || '—')}</td>
            </tr>`)
            .join('');

        const html = htmlShell(
            `รายงานการรับบริการของบุคลากร — ${start} ถึง ${end}`,
            `<div class="toolbar no-print">
                <button onclick="window.print()">🖨 พิมพ์ / บันทึก PDF</button>
                <button class="secondary" onclick="window.close()">ปิด</button>
            </div>
            <div class="page">
                <div class="brand">BCH 360° · Staff CID Service Audit</div>
                <h1>รายงานการรับบริการของบุคลากร · ตรวจสอบ CID</h1>
                <div class="muted">โรงพยาบาลบ้านฉาง · ปีงบประมาณ ${fy.fy_be} · ช่วง ${escapeHtml(start)} ถึง ${escapeHtml(end)} · พิมพ์ ${fmtDateTimeTH(new Date())}</div>

                <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:14px 0;">
                    <div style="padding:8px 12px;background:#ede9fe;border-radius:6px;border-top:3px solid #7c3aed;">
                        <div style="font-size:10px;color:#5b21b6;font-weight:600;">CID ทั้งหมด</div>
                        <div style="font-size:18px;font-weight:700">${cids.length.toLocaleString()}</div>
                    </div>
                    <div style="padding:8px 12px;background:#dcfce7;border-radius:6px;border-top:3px solid #10b981;">
                        <div style="font-size:10px;color:#166534;font-weight:600;">มาใช้บริการ</div>
                        <div style="font-size:18px;font-weight:700">${totals.withV.toLocaleString()} <span style="font-size:11px;color:#64748b">(${(totals.withV/cids.length*100).toFixed(1)}%)</span></div>
                    </div>
                    <div style="padding:8px 12px;background:#fef3c7;border-radius:6px;border-top:3px solid #f59e0b;">
                        <div style="font-size:10px;color:#92400e;font-weight:600;">OPD รวม</div>
                        <div style="font-size:18px;font-weight:700">${totals.opd.toLocaleString()} ครั้ง</div>
                    </div>
                    <div style="padding:8px 12px;background:#dbeafe;border-radius:6px;border-top:3px solid #3b82f6;">
                        <div style="font-size:10px;color:#1e40af;font-weight:600;">IPD รวม</div>
                        <div style="font-size:18px;font-weight:700">${totals.ipd.toLocaleString()} ครั้ง</div>
                    </div>
                    <div style="padding:8px 12px;background:#fee2e2;border-radius:6px;border-top:3px solid #dc2626;">
                        <div style="font-size:10px;color:#991b1b;font-weight:600;">รายได้รวม</div>
                        <div style="font-size:18px;font-weight:700">${totals.inc.toLocaleString('en-US',{maximumFractionDigits:0})} ฿</div>
                    </div>
                </div>

                <table>
                    <thead><tr>
                        <th>#</th><th>CID</th><th>HN</th><th>ชื่อ-สกุล</th><th>อายุ</th>
                        <th>OPD</th><th>IPD</th><th>รายได้รวม</th><th>ครั้งล่าสุด</th><th>สิทธิ์หลัก</th>
                    </tr></thead>
                    <tbody>${tbody}</tbody>
                </table>
                <div class="foot">เอกสารทางการแพทย์ภายในโรงพยาบาล · BCH 360° · ${cids.length} CID, ${enriched.length} matched, ${cids.length - enriched.length} not in patient table</div>
            </div>`
        );
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(html);
    } catch (err) {
        logger.error('[mr-audit/staff-cid-services/pdf]', { error: err.message });
        res.status(500).send(`<pre>${escapeHtml(err.message)}</pre>`);
    }
});

// ════════════════════════════════════════════════════════════
// Source-recovered endpoints (originally lived in prod bundle only,
// backported from bch360:stable to bring git in sync) — 2026-05-17
//   - GET /trend?months=12
//   - GET /by-department?days=30
//   - GET /by-doctor?days=30
//   - GET /defect-categories?days=30
// ════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/trend?months=12
//   monthly completeness rate (avg score 0-100) + counts
// ─────────────────────────────────────────────────────────────
router.get('/trend', async (req, res) => {
    try {
        const months = Math.min(parseInt(req.query.months) || 12, 24);
        const sql = `
            SELECT
                DATE_FORMAT(i.dchdate, '%Y-%m')                                                  AS ym,
                COUNT(*)                                                                          AS discharges,
                AVG(DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate))                            AS avg_los,
                SUM(CASE WHEN id.confirm_final_summary  = 'Y' THEN 1 ELSE 0 END)                  AS doc_confirmed,
                SUM(CASE WHEN id.confirm_audit_summary  = 'Y' THEN 1 ELSE 0 END)                  AS hosxp_mr_audited,
                SUM(CASE WHEN id.confirm_coding_summary = 'Y' THEN 1 ELSE 0 END)                  AS coding_done,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM iptdiag d WHERE d.an=i.an AND d.diagtype='1') THEN 1 ELSE 0 END) AS has_pdx,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM ipt_discharge_summary_note dsn WHERE dsn.an=i.an) THEN 1 ELSE 0 END) AS has_dch_summary,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM asm_discharge_planning dp WHERE dp.an=i.an) THEN 1 ELSE 0 END) AS has_dch_plan,
                SUM(CASE WHEN (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an=i.an) >=
                              DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate) THEN 1 ELSE 0 END) AS has_nurse_notes
            FROM ipt i
            LEFT JOIN ipt_discharge id ON id.an = i.an
            WHERE i.dchdate IS NOT NULL
              AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL ${months} MONTH)
              AND i.dchdate <  DATE_FORMAT(CURDATE(), '%Y-%m-01')
            GROUP BY DATE_FORMAT(i.dchdate, '%Y-%m')
            ORDER BY ym
        `;
        const rows = await dbQueryHeavy(`mr_audit_trend_${months}`, 60, sql);
        const enriched = rows.map(r => {
            const n = Number(r.discharges) || 1;
            const contentScore = (
                (Number(r.has_pdx)         || 0) +
                (Number(r.has_dch_summary) || 0) +
                (Number(r.has_nurse_notes) || 0) +
                (Number(r.has_dch_plan)    || 0)
            ) / (4 * n) * 100;
            return {
                ym: r.ym,
                discharges: Number(r.discharges) || 0,
                avg_los: Number(r.avg_los || 0),
                doc_confirmed_pct:    n ? Math.round(Number(r.doc_confirmed)    / n * 1000) / 10 : 0,
                hosxp_audited_pct:    n ? Math.round(Number(r.hosxp_mr_audited) / n * 1000) / 10 : 0,
                coding_done_pct:      n ? Math.round(Number(r.coding_done)      / n * 1000) / 10 : 0,
                content_completeness: Math.round(contentScore * 10) / 10,
            };
        });
        res.json({
            data_source: 'HOSxP XE (ipt + ipt_discharge + iptdiag + nurse_note + dch_planning)',
            months,
            rows: enriched,
            generated_at: new Date().toISOString(),
        });
    } catch (err) {
        logger.error('[mr-audit/trend]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/by-department?days=30
//   per-ward summary (avg completeness, defect rate)
// ─────────────────────────────────────────────────────────────
router.get('/by-department', async (req, res) => {
    try {
        const days = Math.min(parseInt(req.query.days) || 30, 365);
        const sql = `
            SELECT
                i.ward,
                w.name AS ward_name,
                COUNT(*) AS discharges,
                AVG(DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate)) AS avg_los,
                SUM(CASE WHEN id.confirm_final_summary  = 'Y' THEN 1 ELSE 0 END) AS doc_confirmed,
                SUM(CASE WHEN id.confirm_audit_summary  = 'Y' THEN 1 ELSE 0 END) AS hosxp_mr_audited,
                SUM(CASE WHEN id.confirm_coding_summary = 'Y' THEN 1 ELSE 0 END) AS coding_done,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM iptdiag d WHERE d.an=i.an AND d.diagtype='1') THEN 1 ELSE 0 END) AS has_pdx,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM ipt_discharge_summary_note dsn WHERE dsn.an=i.an) THEN 1 ELSE 0 END) AS has_dch_summary,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM asm_discharge_planning dp WHERE dp.an=i.an) THEN 1 ELSE 0 END) AS has_dch_plan,
                SUM(CASE WHEN (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an=i.an) >=
                              DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate) THEN 1 ELSE 0 END) AS has_nurse_notes
            FROM ipt i
            LEFT JOIN ipt_discharge id ON id.an = i.an
            LEFT JOIN ward w           ON w.ward = i.ward
            WHERE i.dchdate IS NOT NULL
              AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
            GROUP BY i.ward, w.name
            ORDER BY discharges DESC
        `;
        const rows = await dbQueryHeavy(`mr_audit_by_dept_${days}`, 15, sql);
        const enriched = rows.map(r => {
            const n = Number(r.discharges) || 1;
            return {
                ward: r.ward,
                ward_name: r.ward_name || `(ward ${r.ward})`,
                discharges: Number(r.discharges) || 0,
                avg_los: Number(r.avg_los || 0).toFixed(1),
                doc_confirmed_pct: n ? Math.round(Number(r.doc_confirmed) / n * 1000) / 10 : 0,
                hosxp_audited_pct: n ? Math.round(Number(r.hosxp_mr_audited) / n * 1000) / 10 : 0,
                coding_done_pct:   n ? Math.round(Number(r.coding_done) / n * 1000) / 10 : 0,
                content_completeness: Math.round(((
                    (Number(r.has_pdx) || 0) +
                    (Number(r.has_dch_summary) || 0) +
                    (Number(r.has_nurse_notes) || 0) +
                    (Number(r.has_dch_plan) || 0)
                ) / (4 * n) * 100) * 10) / 10,
                defects_pdx:         (Number(r.discharges) || 0) - (Number(r.has_pdx) || 0),
                defects_dch_summary: (Number(r.discharges) || 0) - (Number(r.has_dch_summary) || 0),
                defects_nurse_notes: (Number(r.discharges) || 0) - (Number(r.has_nurse_notes) || 0),
                defects_dch_plan:    (Number(r.discharges) || 0) - (Number(r.has_dch_plan) || 0),
            };
        });
        res.json({
            data_source: 'HOSxP XE',
            window_days: days,
            rows: enriched,
            generated_at: new Date().toISOString(),
        });
    } catch (err) {
        logger.error('[mr-audit/by-department]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/by-doctor?days=30
//   per-discharge-doctor summary
// ─────────────────────────────────────────────────────────────
router.get('/by-doctor', async (req, res) => {
    try {
        const days = Math.min(parseInt(req.query.days) || 30, 365);
        const sql = `
            SELECT
                i.dch_doctor AS doctor_code,
                doc.name     AS doctor_name,
                COUNT(*) AS discharges,
                SUM(CASE WHEN id.confirm_final_summary  = 'Y' THEN 1 ELSE 0 END) AS doc_confirmed,
                SUM(CASE WHEN id.confirm_audit_summary  = 'Y' THEN 1 ELSE 0 END) AS hosxp_mr_audited,
                SUM(CASE WHEN id.confirm_coding_summary = 'Y' THEN 1 ELSE 0 END) AS coding_done,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM iptdiag d WHERE d.an=i.an AND d.diagtype='1') THEN 1 ELSE 0 END) AS has_pdx,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM ipt_discharge_summary_note dsn WHERE dsn.an=i.an) THEN 1 ELSE 0 END) AS has_dch_summary,
                SUM(CASE WHEN EXISTS(SELECT 1 FROM asm_discharge_planning dp WHERE dp.an=i.an) THEN 1 ELSE 0 END) AS has_dch_plan,
                SUM(CASE WHEN (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an=i.an) >=
                              DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate) THEN 1 ELSE 0 END) AS has_nurse_notes
            FROM ipt i
            LEFT JOIN ipt_discharge id ON id.an = i.an
            LEFT JOIN doctor doc       ON doc.code = i.dch_doctor
            WHERE i.dchdate IS NOT NULL
              AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
              AND i.dch_doctor IS NOT NULL
              AND i.dch_doctor <> ''
            GROUP BY i.dch_doctor, doc.name
            HAVING COUNT(*) >= 3
            ORDER BY discharges DESC
            LIMIT 50
        `;
        const rows = await dbQueryHeavy(`mr_audit_by_doctor_${days}`, 15, sql);
        const enriched = rows.map(r => {
            const n = Number(r.discharges) || 1;
            return {
                doctor_code: r.doctor_code,
                doctor_name: r.doctor_name || `(แพทย์ ${r.doctor_code})`,
                discharges: Number(r.discharges) || 0,
                doc_confirmed_pct: n ? Math.round(Number(r.doc_confirmed) / n * 1000) / 10 : 0,
                hosxp_audited_pct: n ? Math.round(Number(r.hosxp_mr_audited) / n * 1000) / 10 : 0,
                coding_done_pct:   n ? Math.round(Number(r.coding_done) / n * 1000) / 10 : 0,
                content_completeness: Math.round(((
                    (Number(r.has_pdx) || 0) +
                    (Number(r.has_dch_summary) || 0) +
                    (Number(r.has_nurse_notes) || 0) +
                    (Number(r.has_dch_plan) || 0)
                ) / (4 * n) * 100) * 10) / 10,
                defects_pdx:         (Number(r.discharges) || 0) - (Number(r.has_pdx) || 0),
                defects_dch_summary: (Number(r.discharges) || 0) - (Number(r.has_dch_summary) || 0),
                defects_nurse_notes: (Number(r.discharges) || 0) - (Number(r.has_nurse_notes) || 0),
                defects_dch_plan:    (Number(r.discharges) || 0) - (Number(r.has_dch_plan) || 0),
            };
        });
        res.json({
            data_source: 'HOSxP XE',
            window_days: days,
            rows: enriched,
            generated_at: new Date().toISOString(),
        });
    } catch (err) {
        logger.error('[mr-audit/by-doctor]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/defect-categories?days=30
//   defect counts split into Content (clinical record) vs Format (workflow confirmations)
// ─────────────────────────────────────────────────────────────
router.get('/defect-categories', async (req, res) => {
    try {
        const days = Math.min(parseInt(req.query.days) || 30, 365);
        const sql = `
            SELECT
                COUNT(*) AS total_disch,
                SUM(CASE WHEN NOT EXISTS(SELECT 1 FROM iptdiag d WHERE d.an=i.an AND d.diagtype='1') THEN 1 ELSE 0 END) AS miss_pdx,
                SUM(CASE WHEN NOT EXISTS(SELECT 1 FROM ipt_discharge_summary_note dsn WHERE dsn.an=i.an) THEN 1 ELSE 0 END) AS miss_dch_summary,
                SUM(CASE WHEN NOT EXISTS(SELECT 1 FROM asm_discharge_planning dp WHERE dp.an=i.an) THEN 1 ELSE 0 END) AS miss_dch_plan,
                SUM(CASE WHEN (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an=i.an) <
                              DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate) THEN 1 ELSE 0 END) AS miss_nurse_notes,
                SUM(CASE WHEN COALESCE(id.confirm_final_summary,'N')  <> 'Y' THEN 1 ELSE 0 END) AS miss_doc_confirm,
                SUM(CASE WHEN COALESCE(id.confirm_audit_summary,'N')  <> 'Y' THEN 1 ELSE 0 END) AS miss_audit_confirm,
                SUM(CASE WHEN COALESCE(id.confirm_coding_summary,'N') <> 'Y' THEN 1 ELSE 0 END) AS miss_coding_confirm
            FROM ipt i
            LEFT JOIN ipt_discharge id ON id.an = i.an
            WHERE i.dchdate IS NOT NULL
              AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL ${days} DAY)
        `;
        const rows = await dbQueryHeavy(`mr_audit_defects_${days}`, 15, sql);
        const r = rows[0] || {};
        const total = Number(r.total_disch) || 1;
        const pct = v => total ? Math.round((Number(v) || 0) / total * 1000) / 10 : 0;

        res.json({
            data_source: 'HOSxP XE',
            window_days: days,
            total_disch: Number(r.total_disch || 0),
            content: [
                { key: 'pdx',          label: 'ไม่บันทึก Principal Diagnosis', count: Number(r.miss_pdx || 0),          pct: pct(r.miss_pdx) },
                { key: 'dch_summary',  label: 'ไม่มี Discharge Summary',         count: Number(r.miss_dch_summary || 0), pct: pct(r.miss_dch_summary) },
                { key: 'nurse_notes',  label: 'Nursing Notes ไม่ครบ LOS',         count: Number(r.miss_nurse_notes || 0), pct: pct(r.miss_nurse_notes) },
                { key: 'dch_plan',     label: 'ไม่มี Discharge Planning',         count: Number(r.miss_dch_plan || 0),    pct: pct(r.miss_dch_plan) },
            ],
            format: [
                { key: 'doc_confirm',    label: 'แพทย์ยังไม่ยืนยัน Final Summary', count: Number(r.miss_doc_confirm || 0),    pct: pct(r.miss_doc_confirm) },
                { key: 'audit_confirm',  label: 'ยังไม่ผ่าน HOSxP MR Audit',         count: Number(r.miss_audit_confirm || 0),  pct: pct(r.miss_audit_confirm) },
                { key: 'coding_confirm', label: 'ยังไม่ Coding เสร็จสมบูรณ์',         count: Number(r.miss_coding_confirm || 0), pct: pct(r.miss_coding_confirm) },
            ],
            generated_at: new Date().toISOString(),
        });
    } catch (err) {
        logger.error('[mr-audit/defect-categories]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ════════════════════════════════════════════════════════════
// Sprint 1 (2026-05-17) — ICD Quality Audit
// Implements เกณฑ์ สนย. (กระทรวงสาธารณสุข) B-rules + C1 from
// "การตรวจสอบและควบคุมคุณภาพข้อมูลในระบบบริการสุขภาพ" (เล่มน้ำเงิน, 2558)
// ════════════════════════════════════════════════════════════
// IPD scope (Sprint 1):
//   B2 — external cause (V/W/X/Y) used as principal diagnosis
//   B3 — S/T diagnosis without external cause companion
//   B7 — O80-O84 (labour) as principal with other O codes
//   B8 — T31.0-T31.9 (burn percentage) as principal
//   B9 — V00-Y34 with less than 5 characters
//   B10 — Z47.x / Z48.x (postoperative care) used with S/T codes
//   C1 — poor-quality codes: J06.9, D22.9, L02.9, L03.9, T07, T14.x, Z34.9
//
// OPD scope (deferred to Sprint 2): B1, B4, B5, B6
// HOSxP icd10 format: WITHOUT dot (e.g. E149 = E14.9, J069 = J06.9)
// ════════════════════════════════════════════════════════════

// Poor-quality C1 codes (no-dot variant in HOSxP) → display label
const C1_POOR_CODES = {
    'J069': { display: 'J06.9', label: 'URI, unspecified' },
    'D229': { display: 'D22.9', label: 'Melanocytic nevus, unspecified' },
    'L029': { display: 'L02.9', label: 'Cutaneous abscess, unspecified' },
    'L039': { display: 'L03.9', label: 'Cellulitis, unspecified' },
    'T07':  { display: 'T07',   label: 'Multiple unspecified injuries' },
    'T140': { display: 'T14.0', label: 'Superficial injury, unspecified body region' },
    'T141': { display: 'T14.1', label: 'Open wound, unspecified body region' },
    'T142': { display: 'T14.2', label: 'Fracture, unspecified body region' },
    'T143': { display: 'T14.3', label: 'Dislocation/sprain, unspecified body region' },
    'T144': { display: 'T14.4', label: 'Nerve injury, unspecified body region' },
    'T145': { display: 'T14.5', label: 'Blood vessel injury, unspecified body region' },
    'T146': { display: 'T14.6', label: 'Tendon/muscle injury, unspecified body region' },
    'T147': { display: 'T14.7', label: 'Crushing injury, unspecified body region' },
    'T148': { display: 'T14.8', label: 'Other injury, unspecified body region' },
    'T149': { display: 'T14.9', label: 'Injury, unspecified' },
    'Z349': { display: 'Z34.9', label: 'Supervision of normal pregnancy, unspecified' },
};

// B-rule labels for UI rendering
// Applicability: I = IPD only, O = OPD only, B = Both
const B_RULE_META = {
    B1:  { label: 'B1 — รหัส Z เป็นโรครอง (ยกเว้น Z11-Z13.9 screening)', severity: 'medium', scope: 'O' },
    B2:  { label: 'B2 — ใช้สาเหตุภายนอก (V/W/X/Y) เป็นรหัสโรคหลัก',     severity: 'high',   scope: 'B' },
    B3:  { label: 'B3 — รหัสบาดเจ็บ (S/T) ไม่มีสาเหตุภายนอก V/W/X/Y กำกับ', severity: 'high',   scope: 'B' },
    B4:  { label: 'B4 — Z23-Z27 (วัคซีน) + Z00-Z02 (ตรวจสุขภาพ) ร่วม',     severity: 'medium', scope: 'O' },
    B5:  { label: 'B5 — ฉีดยา/พ่นยา (901/903/908) ไม่ต้องให้รหัส ICD',   severity: 'medium', scope: 'O' },
    B6:  { label: 'B6 — Z76.8 ใช้ร่วมกับรหัสอื่น (ต้องอยู่เดี่ยว)',        severity: 'medium', scope: 'O' },
    B7:  { label: 'B7 — O80-O84 (การคลอด) เป็นรหัสหลัก แต่มี O code อื่นร่วม', severity: 'medium', scope: 'I' },
    B8:  { label: 'B8 — T31.0-T31.9 (% บาดแผลไหม้) ใช้เป็นรหัสโรคหลัก',  severity: 'high',   scope: 'B' },
    B9:  { label: 'B9 — V00-Y34 ใส่รหัสไม่ครบ 5 ตำแหน่ง',                 severity: 'medium', scope: 'B' },
    B10: { label: 'B10 — Z47.x / Z48.x (post-op care) ใช้ร่วมกับรหัส S/T', severity: 'medium', scope: 'B' },
};

// B5 procedure codes — fee schedule codes for injection/spray/inhalation
// (สนย. คู่มือเล่มน้ำเงิน 2558 — กฎ B5)
const B5_PROCEDURE_CODES = new Set([
    '901-81-70', '903-81-70', '908-81-70',
    '9018170', '9038170', '9088170',          // dot-stripped variants
]);

// Z11.0 – Z13.9 (screening) — allowed as secondary OPD code
function isScreeningZ(icd) {
    if (!icd) return false;
    // Z11, Z110-Z119, Z12, Z120-Z129, Z13, Z130-Z139
    return /^Z1[123]\d?$/.test(icd);
}

// Check if an icd10 code is in O80-O84 range (no-dot: O80, O800..O849)
function isLabourO80(icd) {
    if (!icd) return false;
    if (icd === 'O80' || icd === 'O81' || icd === 'O82' || icd === 'O83' || icd === 'O84') return true;
    // 4-character forms like O800, O801, O849
    if (/^O8[0-4]\d$/.test(icd)) return true;
    return false;
}

// Check if an icd10 code starts with O (any O code)
function isOCode(icd) {
    return icd && icd.charAt(0) === 'O';
}

// Apply B-rules + C1 to a single encounter (IPD AN or OPD visit).
// `ctx` = { id, hn, dateLabel, group, doctor } — used for example violators.
// `codes` = [{ diagtype, icd10, len }]
// `procedureCodes` = Set of icode strings (for B5 — OPD only)
// `applicableRules` = Array of rule names ['B1','B2',...] to evaluate
// Returns: { violations: { rule: [examples] }, c1Hits: { code: count } }
function applyBRules(ctx, codes, procedureCodes, applicableRules) {
    const violations = {};
    for (const r of applicableRules) violations[r] = [];
    const c1Hits = new Map();

    const principalCodes = codes.filter(c => c.diagtype === '1');
    const secondaryCodes = codes.filter(c => c.diagtype !== '1');
    const hasST = codes.some(c => /^[ST]/.test(c.icd10));
    const hasExt = codes.some(c => /^[VWXY]/.test(c.icd10));
    const hasZ47Z48 = codes.some(c => /^Z4[78]/.test(c.icd10));
    const hasZ23_27 = codes.some(c => /^Z2[3-7]/.test(c.icd10));
    const hasZ00_02 = codes.some(c => /^Z0[0-2]/.test(c.icd10));
    const hasZ768 = codes.some(c => c.icd10 === 'Z768' || c.icd10 === 'Z76.8');
    const has_b5_proc = procedureCodes ? Array.from(procedureCodes).some(p => B5_PROCEDURE_CODES.has(p)) : false;

    function record(rule, payload) {
        if (!violations[rule]) return;
        violations[rule].push({ ...ctx, ...payload });
    }

    // B1 (OPD): Z code as secondary (not principal), except Z11-Z13 screening
    if (applicableRules.includes('B1')) {
        for (const c of secondaryCodes) {
            if (/^Z/.test(c.icd10) && !isScreeningZ(c.icd10)) {
                record('B1', { icd10: c.icd10 });
            }
        }
    }

    // B2: external cause as primary
    if (applicableRules.includes('B2')) {
        for (const p of principalCodes) {
            if (/^[VWXY]/.test(p.icd10)) record('B2', { icd10: p.icd10 });
        }
    }

    // B3: S/T diagnosis without external cause
    if (applicableRules.includes('B3')) {
        if (hasST && !hasExt) {
            const stExamples = codes.filter(c => /^[ST]/.test(c.icd10)).slice(0, 2).map(c => c.icd10).join(', ');
            record('B3', { icd10: stExamples });
        }
    }

    // B4 (OPD): vaccine + general exam in same visit
    if (applicableRules.includes('B4')) {
        if (hasZ23_27 && hasZ00_02) {
            const vacCode = codes.find(c => /^Z2[3-7]/.test(c.icd10));
            const examCode = codes.find(c => /^Z0[0-2]/.test(c.icd10));
            record('B4', { icd10: `${vacCode?.icd10 || 'Z23-Z27'} + ${examCode?.icd10 || 'Z00-Z02'}` });
        }
    }

    // B5 (OPD): procedure code 901-81-70 / 903-81-70 / 908-81-70 + has ICD code recorded
    if (applicableRules.includes('B5')) {
        if (has_b5_proc && codes.length > 0) {
            const proc = procedureCodes ? Array.from(procedureCodes).find(p => B5_PROCEDURE_CODES.has(p)) : null;
            record('B5', { icd10: `proc:${proc || 'B5'} + ICD ${codes[0].icd10}` });
        }
    }

    // B6 (OPD): Z76.8 used together with other codes
    if (applicableRules.includes('B6')) {
        if (hasZ768 && codes.length > 1) {
            const others = codes.filter(c => c.icd10 !== 'Z768' && c.icd10 !== 'Z76.8').slice(0, 2).map(c => c.icd10).join(', ');
            record('B6', { icd10: `Z76.8 + ${others}` });
        }
    }

    // B7 (IPD): O80-O84 as primary + has other O codes
    if (applicableRules.includes('B7')) {
        for (const p of principalCodes) {
            if (isLabourO80(p.icd10)) {
                const otherO = codes.filter(c => isOCode(c.icd10) && !isLabourO80(c.icd10));
                if (otherO.length > 0) {
                    record('B7', { icd10: `${p.icd10} + ${otherO.slice(0, 2).map(c => c.icd10).join(', ')}` });
                }
            }
        }
    }

    // B8: T31 as primary
    if (applicableRules.includes('B8')) {
        for (const p of principalCodes) {
            if (/^T31/.test(p.icd10)) record('B8', { icd10: p.icd10 });
        }
    }

    // B9: V/W/X/Y external cause < 5 characters
    if (applicableRules.includes('B9')) {
        for (const c of codes) {
            if (/^[VWXY]/.test(c.icd10) && c.icd10.length < 5) {
                record('B9', { icd10: c.icd10 });
            }
        }
    }

    // B10: Z47/Z48 (post-op care) used with S/T
    if (applicableRules.includes('B10')) {
        if (hasZ47Z48 && hasST) {
            const z47z48 = codes.find(c => /^Z4[78]/.test(c.icd10));
            const stCode = codes.find(c => /^[ST]/.test(c.icd10));
            record('B10', { icd10: `${z47z48?.icd10 || 'Z47/Z48'} + ${stCode?.icd10 || 'S/T'}` });
        }
    }

    // C1: poor-quality codes
    for (const c of codes) {
        if (C1_POOR_CODES[c.icd10]) {
            c1Hits.set(c.icd10, (c1Hits.get(c.icd10) || 0) + 1);
        }
    }

    return { violations, c1Hits };
}

// Format result helper — shared by IPD + OPD paths
function buildIcdAuditResult({ type, days, encounters, applicableRules, dataSource }) {
    const violations = {};
    for (const r of applicableRules) violations[r] = [];
    const c1Found = new Map();
    let totalCodes = 0;
    const totalEncounters = encounters.size;

    for (const [, info] of encounters) {
        totalCodes += info.codes.length;
        const { violations: v, c1Hits } = applyBRules(
            info.ctx, info.codes, info.procedureCodes || null, applicableRules
        );
        for (const rule of applicableRules) {
            if (v[rule]) violations[rule].push(...v[rule]);
        }
        for (const [code, n] of c1Hits) {
            c1Found.set(code, (c1Found.get(code) || 0) + n);
        }
    }

    const errors_by_rule = {};
    for (const rule of applicableRules) {
        const list = violations[rule] || [];
        errors_by_rule[rule] = {
            ...B_RULE_META[rule],
            count: list.length,
            pct_of_encounters: totalEncounters > 0 ? Math.round((list.length / totalEncounters) * 1000) / 10 : 0,
            examples: list.slice(0, 5),
        };
    }

    const c1Total = Array.from(c1Found.values()).reduce((a, b) => a + b, 0);
    const c1_breakdown = Array.from(c1Found.entries())
        .map(([code, count]) => ({
            code: C1_POOR_CODES[code].display,
            label: C1_POOR_CODES[code].label,
            count,
            pct_of_codes: totalCodes > 0 ? Math.round((count / totalCodes) * 1000) / 10 : 0,
        }))
        .sort((a, b) => b.count - a.count);

    // Score
    let highCount = 0, medCount = 0;
    for (const rule of applicableRules) {
        const sev = B_RULE_META[rule]?.severity;
        if (sev === 'high') highCount += violations[rule].length;
        else if (sev === 'medium') medCount += violations[rule].length;
    }
    const totalIssuesWeighted = highCount * 3 + medCount * 1 + c1Total * 0.5;
    const score = totalCodes > 0
        ? Math.max(0, Math.round((100 - (totalIssuesWeighted / totalCodes) * 100) * 10) / 10)
        : 100;
    const grade =
        score >= 95 ? 'A' :
        score >= 85 ? 'B' :
        score >= 70 ? 'C' :
        score >= 55 ? 'D' : 'F';

    return {
        data_source: dataSource,
        standard: 'การตรวจสอบและควบคุมคุณภาพข้อมูล สนย. 2558 (เล่มน้ำเงิน)',
        type, window_days: days,
        total_encounters: totalEncounters,
        total_ans: type === 'ipd' ? totalEncounters : undefined,
        total_visits: type === 'opd' ? totalEncounters : undefined,
        total_codes: totalCodes,
        applicable_rules: applicableRules,
        errors_by_rule,
        poor_quality_codes_c1: {
            total: c1Total,
            pct_of_codes: totalCodes > 0 ? Math.round((c1Total / totalCodes) * 1000) / 10 : 0,
            by_code: c1_breakdown,
        },
        score,
        grade,
        target_score: 95,
        generated_at: new Date().toISOString(),
    };
}

// IPD path — uses ipt + iptdiag
async function auditIcdIpd(range) {
    const sql = `
        SELECT
            i.an, i.hn, i.dchdate, i.ward, i.dch_doctor,
            d.diagtype, d.icd10, LENGTH(d.icd10) AS icd10_len
        FROM ipt i
        INNER JOIN iptdiag d ON d.an = i.an
        WHERE i.dchdate IS NOT NULL
          AND i.dchdate BETWEEN '${range.start}' AND '${range.end}'
          AND d.icd10 IS NOT NULL AND d.icd10 <> ''
        ORDER BY i.an, d.diagtype, d.icd10
    `;
    const rows = await dbQueryHeavy(`mr_audit_icd_quality_ipd_${range.key}`, 10, sql);

    const encounters = new Map();
    for (const r of rows) {
        if (!encounters.has(r.an)) {
            encounters.set(r.an, {
                ctx: { an: r.an, hn: r.hn, dchdate: r.dchdate, ward: r.ward, dch_doctor: r.dch_doctor },
                codes: [],
            });
        }
        encounters.get(r.an).codes.push({
            diagtype: String(r.diagtype || ''),
            icd10: String(r.icd10 || '').toUpperCase().trim(),
            len: Number(r.icd10_len || 0),
        });
    }

    return buildIcdAuditResult({
        type: 'ipd', days: range.days, encounters,
        applicableRules: ['B2', 'B3', 'B7', 'B8', 'B9', 'B10'],
        dataSource: 'HOSxP XE (ipt + iptdiag) · เกณฑ์ สนย. B-rules + C1',
    });
}

// OPD path — uses ovst + ovstdiag + opitemrece (for B5 procedure codes)
async function auditIcdOpd(range) {
    // 1. Pull all ovstdiag rows with ovst metadata
    const diagSql = `
        SELECT
            o.vn, o.hn, o.vstdate, o.main_dep AS clinic, o.doctor,
            d.diagtype, d.icd10, LENGTH(d.icd10) AS icd10_len
        FROM ovst o
        INNER JOIN ovstdiag d ON d.vn = o.vn
        WHERE o.vstdate BETWEEN '${range.start}' AND '${range.end}'
          AND d.icd10 IS NOT NULL AND d.icd10 <> ''
        ORDER BY o.vn, d.diagtype, d.icd10
    `;
    const diagRows = await dbQueryHeavy(`mr_audit_icd_quality_opd_diag_${range.key}`, 10, diagSql);

    // 2. Pull procedure codes for B5 — only for VNs we already have
    const procSql = `
        SELECT DISTINCT o.vn, op.icode
        FROM ovst o
        INNER JOIN opitemrece op ON op.vn = o.vn
        WHERE o.vstdate BETWEEN '${range.start}' AND '${range.end}'
          AND (op.icode IN ('901-81-70', '903-81-70', '908-81-70')
            OR op.icode IN ('9018170', '9038170', '9088170'))
    `;
    let procRows = [];
    try {
        procRows = await dbQueryHeavy(`mr_audit_icd_quality_opd_proc_${range.key}`, 10, procSql);
    } catch (e) {
        // If opitemrece column "icode" doesn't exist, B5 will return 0 silently
        logger.warn('[mr-audit/icd-quality-audit OPD] B5 procedure query failed (skipping)', { error: e.message });
    }
    const procByVn = new Map();
    for (const p of procRows) {
        if (!procByVn.has(p.vn)) procByVn.set(p.vn, new Set());
        procByVn.get(p.vn).add(String(p.icode || '').trim());
    }

    // 3. Build encounters map
    const encounters = new Map();
    for (const r of diagRows) {
        if (!encounters.has(r.vn)) {
            encounters.set(r.vn, {
                ctx: { vn: r.vn, hn: r.hn, vstdate: r.vstdate, clinic: r.clinic, doctor: r.doctor },
                codes: [],
                procedureCodes: procByVn.get(r.vn) || null,
            });
        }
        encounters.get(r.vn).codes.push({
            diagtype: String(r.diagtype || ''),
            icd10: String(r.icd10 || '').toUpperCase().trim(),
            len: Number(r.icd10_len || 0),
        });
    }

    return buildIcdAuditResult({
        type: 'opd', days: range.days, encounters,
        applicableRules: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B8', 'B9', 'B10'],
        dataSource: 'HOSxP XE (ovst + ovstdiag + opitemrece) · เกณฑ์ สนย. B-rules + C1',
    });
}

// ─────────────────────────────────────────────────────────────
// GET /api/mr-audit/icd-quality-audit?days=30&type=ipd|opd
//   ICD coding quality audit per Bureau of Policy & Strategy
//   (สนย.) rules B1-B10 + C1
//   - IPD: B2/B3/B7/B8/B9/B10 + C1
//   - OPD: B1/B2/B3/B4/B5/B6/B8/B9/B10 + C1
// ─────────────────────────────────────────────────────────────
router.get('/icd-quality-audit', async (req, res) => {
    try {
        const range = getDateRange(req, 30);
        const type = String(req.query.type || 'ipd').toLowerCase();

        if (type !== 'ipd' && type !== 'opd') {
            return res.status(400).json({
                error: 'type must be ipd or opd',
            });
        }

        const result = type === 'opd'
            ? await auditIcdOpd(range)
            : await auditIcdIpd(range);

        res.json(result);
    } catch (err) {
        logger.error('[mr-audit/icd-quality-audit]', { type: req.query.type, error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// Data Quality Form — Auto-derive per เกณฑ์ สนย. 2558 (blue book)
//   OPD Form A1: max 17 pts (วันเวลา 1 + CC 2 + Hx 3 + PE 4 + Dx 4 + Tx 3)
//   IPD Form:    max 27 pts (DS1 4 + DS2 3 + Hx 4 + PE 4 + Progress 4 + Op 4 NA + OB 4 NA + Nurse 4)
//   AUTO-DERIVE caveat: checks EXISTENCE of HOSxP fields only.
//     Cannot judge quality (e.g., "Hx is detailed enough" or "PDx is clinically correct").
//     Full audit requires human review.
// ─────────────────────────────────────────────────────────────

function gradeFromPct(pct) {
    if (pct >= 85) return 'A';
    if (pct >= 70) return 'B';
    if (pct >= 50) return 'C';
    return 'D';
}

function trimStr(v) {
    return (v == null) ? '' : String(v).trim();
}

async function dataQualityFormOpd(range) {
    const sql = `
        SELECT
            o.vn, o.hn, o.vstdate, o.vsttime, o.doctor, o.main_dep,
            s.cc, s.pe, s.bps, s.bpd, s.pulse, s.temperature, s.rr,
            s.his_begin_date, s.his_severity, s.his_cause,
            (SELECT COUNT(*) FROM ovstdiag d WHERE d.vn = o.vn AND d.diagtype = '1') AS pdx_cnt,
            (SELECT COUNT(*) FROM ovstdiag d WHERE d.vn = o.vn) AS dx_cnt,
            (SELECT COUNT(*) FROM opitemrece op WHERE op.vn = o.vn) AS rx_cnt
        FROM ovst o
        LEFT JOIN opdscreen s ON s.vn = o.vn
        WHERE o.vstdate BETWEEN '${range.start}' AND '${range.end}'
        ORDER BY o.vstdate DESC
        LIMIT 1000
    `;
    const rows = await dbQueryHeavy(`mr_audit_dq_opd_${range.key}`, 10, sql);

    const sectionAgg = {
        datetime: { sum: 0, count: 0, max: 1 },
        cc:       { sum: 0, count: 0, max: 2 },
        hx:       { sum: 0, count: 0, max: 3 },
        pe:       { sum: 0, count: 0, max: 4 },
        dx:       { sum: 0, count: 0, max: 4 },
        tx:       { sum: 0, count: 0, max: 3 },
    };
    let totalSum = 0;

    const records = rows.map(r => {
        const sec = {};
        sec.datetime = (r.vstdate && r.vsttime) ? 1 : 0;
        const cc = trimStr(r.cc);
        sec.cc = (cc ? 1 : 0) + (cc.length >= 10 ? 1 : 0);
        sec.hx = (r.his_begin_date ? 1 : 0)
               + (trimStr(r.his_severity) ? 1 : 0)
               + (trimStr(r.his_cause) ? 1 : 0);
        sec.pe = (trimStr(r.pe) ? 1 : 0)
               + (r.bps && r.bpd ? 1 : 0)
               + (r.pulse ? 1 : 0)
               + (r.temperature ? 1 : 0);
        sec.dx = (r.pdx_cnt >= 1 ? 2 : 0)
               + (r.dx_cnt >= 2 ? 1 : 0)
               + (r.pdx_cnt >= 1 ? 1 : 0);
        sec.tx = (r.rx_cnt >= 1 ? 1 : 0)
               + (r.rx_cnt >= 1 ? 1 : 0)
               + (r.doctor ? 1 : 0);

        const total = sec.datetime + sec.cc + sec.hx + sec.pe + sec.dx + sec.tx;
        totalSum += total;
        Object.keys(sectionAgg).forEach(k => { sectionAgg[k].sum += sec[k]; sectionAgg[k].count++; });

        return {
            vn: r.vn, hn: r.hn,
            vstdate: r.vstdate, doctor: r.doctor, clinic: r.main_dep,
            sections: sec, total, max: 17,
            pct: Math.round(total / 17 * 1000) / 10,
        };
    });

    const sections = [
        { code: 'datetime', label: 'วัน-เวลาที่ตรวจ', max: 1 },
        { code: 'cc',       label: 'อาการสำคัญ (CC)', max: 2 },
        { code: 'hx',       label: 'ประวัติเจ็บป่วยปัจจุบัน (Hx)', max: 3 },
        { code: 'pe',       label: 'ตรวจร่างกาย (PE)', max: 4 },
        { code: 'dx',       label: 'วินิจฉัย (Dx)', max: 4 },
        { code: 'tx',       label: 'การรักษา (Tx)', max: 3 },
    ].map(s => {
        const a = sectionAgg[s.code];
        const avg = a.count ? a.sum / a.count : 0;
        return {
            ...s,
            avg: Math.round(avg * 100) / 100,
            avg_pct: Math.round(avg / s.max * 1000) / 10,
            full_count: records.filter(r => r.sections[s.code] === s.max).length,
            zero_count: records.filter(r => r.sections[s.code] === 0).length,
        };
    });

    const avgScore = records.length ? totalSum / records.length : 0;
    const pct = Math.round(avgScore / 17 * 1000) / 10;

    return {
        type: 'opd', days: range.days,
        count: records.length,
        max_score: 17,
        avg_score: Math.round(avgScore * 10) / 10,
        pct,
        grade: gradeFromPct(pct),
        sections,
        records: records.slice(0, 50),
        data_source: 'HOSxP XE (ovst + opdscreen + ovstdiag + opitemrece) · เกณฑ์ สนย. Form A1 OPD',
        method: 'auto-derive (existence-only)',
        note: 'Auto-derive: ตรวจ existence ของ field ใน HOSxP. ไม่ได้วัด clinical quality. Full audit ต้อง manual review.',
    };
}

async function dataQualityFormIpd(range) {
    const sql = `
        SELECT
            i.an, i.hn, i.regdate, i.dchdate, i.admdoctor, i.dch_doctor, i.ward,
            i.dchstts, i.dchtype,
            DATEDIFF(i.dchdate, i.regdate) AS los_days,
            ds.summary_note_text, ds.doctor_code AS ds_doctor,
            id.discharge_order_status, id.discharge_note, id.audit_summary_text,
            (SELECT COUNT(*) FROM iptdiag dx WHERE dx.an = i.an AND dx.diagtype IN ('1','5')) AS admit_dx_cnt,
            (SELECT COUNT(*) FROM ipd_nurse_note nn WHERE nn.an = i.an AND (nn.temperature IS NOT NULL OR nn.bp_systolic IS NOT NULL)) AS vital_cnt,
            (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an AND (nn.temperature IS NOT NULL OR nn.bp_systolic IS NOT NULL)) AS vital_days,
            (SELECT COUNT(*) FROM ipd_doctor_order od WHERE od.an = i.an) AS order_cnt,
            (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an) AS nurse_days,
            (SELECT COUNT(*) FROM iptoprt op WHERE op.an = i.an) AS op_cnt,
            (SELECT COUNT(*) FROM ipt_labour lb WHERE lb.an = i.an) AS labour_cnt,
            (SELECT COUNT(*) FROM ipt_pregnancy pg WHERE pg.an = i.an) AS preg_cnt
        FROM ipt i
        LEFT JOIN ipt_discharge_summary_note ds ON ds.an = i.an
        LEFT JOIN ipt_discharge id ON id.an = i.an
        WHERE i.dchdate IS NOT NULL
          AND i.dchdate BETWEEN '${range.start}' AND '${range.end}'
        ORDER BY i.dchdate DESC
        LIMIT 500
    `;
    const rows = await dbQueryHeavy(`mr_audit_dq_ipd_${range.key}`, 10, sql);

    const sectionAgg = {
        ds1:      { sum: 0, count: 0, max: 4 },
        ds2:      { sum: 0, count: 0, max: 3 },
        hx:       { sum: 0, count: 0, max: 4 },
        pe:       { sum: 0, count: 0, max: 4 },
        progress: { sum: 0, count: 0, max: 4 },
        op:       { sum: 0, count: 0, max: 4, na: 0 },
        ob:       { sum: 0, count: 0, max: 4, na: 0 },
        nurse:    { sum: 0, count: 0, max: 4 },
    };
    let totalSum = 0;
    let totalMaxSum = 0;

    const records = rows.map(r => {
        const sec = {};
        const summary = trimStr(r.summary_note_text);
        const los = Math.max(0, Number(r.los_days) || 0);

        sec.ds1 = (summary ? 1 : 0)
                + (summary.length >= 50 ? 1 : 0)
                + (summary.length >= 200 ? 1 : 0)
                + (r.ds_doctor ? 1 : 0);
        sec.ds2 = (r.dchstts ? 1 : 0)
                + (r.dchtype ? 1 : 0)
                + (r.dch_doctor ? 1 : 0);
        const cc = Number(r.admit_dx_cnt) || 0;
        sec.hx = (cc >= 1 ? 2 : 0) + (cc >= 2 ? 1 : 0) + (cc >= 3 ? 1 : 0);
        const vc = Number(r.vital_cnt) || 0;
        const vd = Number(r.vital_days) || 0;
        sec.pe = (vc >= 1 ? 1 : 0)
               + (vc >= 4 ? 1 : 0)
               + (vd >= 1 ? 1 : 0)
               + (vd >= Math.max(1, los) ? 1 : 0);
        const oc = Number(r.order_cnt) || 0;
        sec.progress = (oc >= 1 ? 1 : 0)
                     + (oc >= 5 ? 1 : 0)
                     + (oc >= 10 ? 1 : 0)
                     + (oc >= Math.max(5, los * 3) ? 1 : 0);
        const opCnt = Number(r.op_cnt) || 0;
        if (opCnt === 0) sec.op = null;
        else sec.op = 1 + (opCnt >= 1 ? 3 : 0);
        const lbCnt = Number(r.labour_cnt) || 0;
        const pgCnt = Number(r.preg_cnt) || 0;
        if (lbCnt === 0 && pgCnt === 0) sec.ob = null;
        else sec.ob = 1 + ((lbCnt + pgCnt) >= 1 ? 3 : 0);
        const nd = Number(r.nurse_days) || 0;
        sec.nurse = (nd >= 1 ? 1 : 0)
                  + (nd >= Math.ceil(los / 2) ? 1 : 0)
                  + (nd >= los ? 1 : 0)
                  + (nd >= Math.max(1, los) ? 1 : 0);

        let total = sec.ds1 + sec.ds2 + sec.hx + sec.pe + sec.progress + sec.nurse;
        let max = 4 + 3 + 4 + 4 + 4 + 4;
        if (sec.op !== null) { total += sec.op; max += 4; }
        if (sec.ob !== null) { total += sec.ob; max += 4; }

        totalSum += total;
        totalMaxSum += max;

        ['ds1', 'ds2', 'hx', 'pe', 'progress', 'nurse'].forEach(k => {
            sectionAgg[k].sum += sec[k]; sectionAgg[k].count++;
        });
        if (sec.op === null) sectionAgg.op.na++;
        else { sectionAgg.op.sum += sec.op; sectionAgg.op.count++; }
        if (sec.ob === null) sectionAgg.ob.na++;
        else { sectionAgg.ob.sum += sec.ob; sectionAgg.ob.count++; }

        return {
            an: r.an, hn: r.hn,
            regdate: r.regdate, dchdate: r.dchdate,
            ward: r.ward, doctor: r.dch_doctor,
            los_days: los,
            sections: sec, total, max,
            pct: max > 0 ? Math.round(total / max * 1000) / 10 : 0,
        };
    });

    const sections = [
        { code: 'ds1', label: 'Discharge Summary part 1 (เนื้อหา)', max: 4 },
        { code: 'ds2', label: 'Discharge Summary part 2 (admin)',    max: 3 },
        { code: 'hx',  label: 'ประวัติการเจ็บป่วย (Hx)',              max: 4 },
        { code: 'pe',  label: 'ตรวจร่างกาย / Vital Signs',           max: 4 },
        { code: 'progress', label: 'Progress Notes (orders)',         max: 4 },
        { code: 'op',  label: 'Operative Note (NA-able)',             max: 4, naAble: true },
        { code: 'ob',  label: 'Labour / Pregnancy (NA-able)',         max: 4, naAble: true },
        { code: 'nurse', label: 'Nurse Notes (cover LOS)',            max: 4 },
    ].map(s => {
        const a = sectionAgg[s.code];
        const avg = a.count ? a.sum / a.count : 0;
        return {
            ...s,
            avg: Math.round(avg * 100) / 100,
            avg_pct: Math.round(avg / s.max * 1000) / 10,
            count: a.count,
            na: a.na || 0,
            full_count: records.filter(r => r.sections[s.code] === s.max).length,
            zero_count: records.filter(r => r.sections[s.code] === 0).length,
        };
    });

    const avgPct = records.length && totalMaxSum > 0 ? (totalSum / totalMaxSum * 100) : 0;
    const avgScore = records.length ? totalSum / records.length : 0;
    const pct = Math.round(avgPct * 10) / 10;

    return {
        type: 'ipd', days: range.days,
        count: records.length,
        max_score: 27,
        avg_score: Math.round(avgScore * 10) / 10,
        pct,
        grade: gradeFromPct(pct),
        sections,
        records: records.slice(0, 50),
        data_source: 'HOSxP XE (ipt + ipt_discharge + ipt_discharge_summary_note + ipt_vital_sign + ipd_doctor_order + ipd_nurse_note + iptoprt + ipt_labour) · เกณฑ์ สนย. IPD',
        method: 'auto-derive (existence-only)',
        note: 'Auto-derive: ตรวจ existence ของ field. NA-able sections (Op, OB) excluded from max if irrelevant. Full audit ต้อง manual review.',
    };
}

router.get('/data-quality-form', async (req, res) => {
    try {
        const range = getDateRange(req, 30);
        const type = String(req.query.type || 'ipd').toLowerCase();
        if (type !== 'ipd' && type !== 'opd') {
            return res.status(400).json({ error: 'type must be ipd or opd' });
        }
        const result = type === 'opd'
            ? await dataQualityFormOpd(range)
            : await dataQualityFormIpd(range);
        res.json(result);
    } catch (err) {
        logger.error('[mr-audit/data-quality-form]', { type: req.query.type, error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// Phase 1C — Error Symbols Distribution (Y/A/B/C/D/E/F/G/H)
//   เกณฑ์ สนย. 2558 (blue book) — Form A2/A4 หน้า 134-138 + 151-152
//   Y = ถูกต้อง (no errors detected)
//   A = ผิดพลาด — wrong code (clinical context required, auto-NA)
//   B = ให้รหัสโดยไม่มีคำวินิจฉัย — encounter with no PDx (diagtype='1')
//   C = รหัสด้อยคุณภาพ — C1 list (J06.9, D22.9, L02.9, L03.9, T07, T14.x, Z34.9)
//   D = ตัวเลขไม่ครบ — V00-Y34 < 5 chars (= B9)
//   E = ใช้สาเหตุภายนอกเป็นโรคหลัก — V/W/X/Y as PDx (= partial of B8)
//   F = ตัวเลขเกิน — codes > 5 chars (rare)
//   G = ควรมีแต่ไม่มี — missing required code (clinical context, auto-NA)
//   H = ไม่ควรมีแต่มี — Z76.8 with other codes (= B6) / inappropriate code combo
// ─────────────────────────────────────────────────────────────

const SYMBOL_DEFS = {
    Y: { label: 'ถูกต้อง',                 desc: 'ไม่พบ error',                                  color: '#10b981', kind: 'good' },
    A: { label: 'ผิดพลาด',                 desc: 'รหัสไม่ตรง dx (ต้องใช้ clinical context)',     color: '#94a3b8', kind: 'na' },
    B: { label: 'ให้รหัสโดยไม่มีคำวินิจฉัย',  desc: 'encounter ไม่มี PDx',                          color: '#f59e0b', kind: 'error' },
    C: { label: 'รหัสด้อยคุณภาพ',           desc: 'C1: J06.9, D22.9, L02.9, L03.9, T07, T14.x, Z34.9', color: '#f59e0b', kind: 'error' },
    D: { label: 'ตัวเลขไม่ครบ',             desc: 'V00-Y34 < 5 ตำแหน่ง (= B9)',                  color: '#ef4444', kind: 'error' },
    E: { label: 'ใช้สาเหตุภายนอกเป็นโรคหลัก', desc: 'V/W/X/Y เป็น PDx (= ส่วน B8)',                color: '#ef4444', kind: 'error' },
    F: { label: 'ตัวเลขเกิน',               desc: 'รหัส > 5 ตำแหน่ง',                            color: '#f97316', kind: 'error' },
    G: { label: 'ควรมีแต่ไม่มี',            desc: 'รหัสที่ควรมี (ต้องใช้ clinical context)',       color: '#94a3b8', kind: 'na' },
    H: { label: 'ไม่ควรมีแต่มี',            desc: 'Z76.8 ใช้ร่วมกับรหัสอื่น (= B6)',              color: '#f97316', kind: 'error' },
};

const C1_LIST = new Set(['J069', 'D229', 'L029', 'L039', 'T07', 'Z349']);
// T14.0-T14.9 — match with regex below

// AI guidance per symbol — recommendations + responsible role
// Aligned with เกณฑ์ สนย. 2558 (blue book) Form A2/A4 + ICD-10-TM
const SYMBOL_GUIDANCE = {
    Y: {
        summary: 'ไม่พบ error ใน auto-derive rules — รหัสมีคุณภาพ. รักษามาตรฐานปัจจุบัน',
        actions: [
            'สุ่ม audit 5% รายไตรมาส โดย MR audit committee เพื่อ verify เปรียบเทียบกับ chart',
            'จัด refresher training ให้ coder ทุก 6 เดือน',
        ],
        responsible: 'MR Audit Committee',
        severity: 'good',
    },
    A: {
        summary: 'รหัสไม่ตรง Dx — ระบบ auto ตรวจไม่ได้ ต้อง manual review เปรียบเทียบ chart',
        actions: [
            'สุ่ม audit ขั้นต่ำ 5% ของ encounter (≥40 records) ตามเกณฑ์ สนย.',
            'MR audit committee เปิด chart เปรียบเทียบ written Dx กับ ICD code',
            'รายการที่พบผิด → ส่งคืน coder แก้ + แจ้งแพทย์เจ้าของไข้รับทราบ',
        ],
        responsible: 'MR clerk + Coder + Audit committee',
        severity: 'manual',
    },
    B: {
        summary: 'Encounter ไม่มี Principal Dx (diagtype=1) — กระทบ DRG grouping + การเบิกจ่าย สปสช./ประกันสังคม',
        actions: [
            'เปิด HOSxP → ipt screen ของ AN → ต้องมี diagnosis ที่ "เป็นโรคหลัก" (diagtype=1)',
            'แพทย์เจ้าของไข้ต้องระบุ "โรคหลัก" ในใบ Discharge Summary ให้ชัดเจน',
            'Coder ตรวจสอบทุก AN ก่อนคลิก confirm_coding_summary',
            'จัดทำ daily report list AN ที่ยังไม่มี PDx ส่ง coder รายเช้า',
        ],
        responsible: 'แพทย์เจ้าของไข้ + Coder',
        severity: 'high',
    },
    C: {
        summary: 'รหัสด้อยคุณภาพ (C1 list) — ระบุไม่ละเอียดพอ กระทบ DRG grouping + การเบิกจ่าย',
        perCodeFixes: [
            { code: 'J06.9', label: 'URI unspecified', fix: 'ระบุ specific site เช่น J04.0 (laryngitis), J02.9 (pharyngitis), J00 (common cold)' },
            { code: 'D22.9', label: 'Melanocytic nevus unspecified', fix: 'ระบุตำแหน่ง D22.0-D22.7 (face/scalp/trunk/limb)' },
            { code: 'L02.9', label: 'Cutaneous abscess unspecified', fix: 'ระบุตำแหน่ง L02.0-L02.8' },
            { code: 'L03.9', label: 'Cellulitis unspecified', fix: 'ระบุตำแหน่ง L03.0-L03.8' },
            { code: 'T07',   label: 'Multiple injuries unspecified', fix: 'ระบุแต่ละ injury แยก (S code ต่างตำแหน่ง)' },
            { code: 'T14.x', label: 'Injury unspecified body region', fix: 'ระบุตำแหน่งจริงใช้ S00-T03 ขึ้นไปแทน' },
            { code: 'Z34.9', label: 'Normal pregnancy unspecified', fix: 'ระบุ trimester (Z34.0 first / Z34.8 other)' },
        ],
        actions: [
            'ตรวจหาตำแหน่ง/รายละเอียดเพิ่มเติมใน chart (history + PE + lab)',
            'ปรึกษาแพทย์เจ้าของไข้ถ้าข้อมูลในเวชระเบียนไม่ชัด',
            'อัปเดต ICD-10-TM book ฉบับล่าสุดที่ workstation coder',
        ],
        responsible: 'Coder (ปรึกษาแพทย์เมื่อจำเป็น)',
        severity: 'medium',
    },
    D: {
        summary: 'External cause (V/W/X/Y) ไม่ครบ 5 ตำแหน่ง — เกณฑ์ B9 ของ สนย.',
        actions: [
            'ตัวอักษรที่ 5 บอก activity ขณะเกิดเหตุ:',
            '  • 0 = sports activity',
            '  • 1 = leisure activity',
            '  • 2 = while working for income',
            '  • 3 = other types of work',
            '  • 4 = resting, sleeping, eating',
            '  • 8 = other specified activities',
            '  • 9 = unspecified activity (ใช้เมื่อไม่มีข้อมูล)',
            'ตัวอย่าง: V01 → V01.9 → V019 (5 ตำแหน่ง)',
            'เปิด iptdiag/ovstdiag ตามรหัสที่ flag → เติมหลักที่ 5',
        ],
        responsible: 'Coder',
        severity: 'high',
    },
    E: {
        summary: 'External cause (V/W/X/Y) เป็น PDx — เกณฑ์ห้าม external เป็นโรคหลัก',
        actions: [
            'PDx ต้องเป็นโรคหลักจากการบาดเจ็บ (S00-T98) ไม่ใช่ external cause',
            'เปลี่ยน diagtype จาก "1" → "5" (External cause)',
            'เพิ่มรหัส injury (S/T) เป็น PDx แทน',
            'ตัวอย่าง: V010 ที่เป็น PDx → ย้ายเป็น diagtype=5, เพิ่ม S064 (intracranial injury) เป็น PDx',
        ],
        responsible: 'Coder + แพทย์เจ้าของไข้',
        severity: 'high',
    },
    F: {
        summary: 'รหัส ICD-10 เกิน 5 ตำแหน่ง — ส่วนใหญ่เกิดจาก typo',
        actions: [
            'ICD-10 มาตรฐาน WHO ไม่เกิน 5 ตำแหน่ง',
            'ตรวจ list ที่ flag → ตัด trailing character ออก',
            'หากเป็น ICD-10-TM (Thai modification) บางรหัสยาวกว่ามาตรฐาน — confirm กับ coder lead',
            'ฝึกการกรอกรหัสด้วย code book/lookup ลด typo',
        ],
        responsible: 'Coder',
        severity: 'medium',
    },
    G: {
        summary: 'ควรมีรหัสแต่ไม่มี — ต้องอ่าน chart manual',
        actions: [
            'พบบ่อย: complication / comorbidity ที่บันทึกใน chart แต่ลืม code',
            'Audit ผ่าน MR committee เปรียบเทียบ Dx ใน chart vs ICD code',
            'รายการที่พบขาด → coder เพิ่มรหัส (diagtype=2 comorbidity, =3 complication, =5 external)',
        ],
        responsible: 'MR Audit Committee',
        severity: 'manual',
    },
    H: {
        summary: 'Z76.8 ใช้ร่วมกับรหัสอื่น — Z76.8 ต้องใช้เดี่ยว',
        actions: [
            'Z76.8 = persons encountering health services in other specified circumstances (admin visit)',
            'ห้ามใช้ร่วมกับรหัสโรคจริง',
            'ถ้ามีโรคจริง → ตัด Z76.8 ออก เก็บเฉพาะรหัสโรค',
            'ถ้าเป็น well-baby check / preventive only → ใช้ Z76.8 เดี่ยว ไม่มีรหัสโรค',
        ],
        responsible: 'Coder',
        severity: 'medium',
    },
};

function classifyCodeSymbols(code, diagtype, otherCodesOnEncounter) {
    code = String(code || '').toUpperCase().replace(/\./g, '');
    const symbols = new Set();
    const len = code.length;

    // D — V00-Y34 < 5 chars
    if (/^[VWXY]/.test(code) && len < 5) symbols.add('D');
    // F — > 5 chars
    if (len > 5) symbols.add('F');
    // E — V/W/X/Y as PDx
    if (String(diagtype) === '1' && /^[VWXY]/.test(code)) symbols.add('E');
    // C — C1 low-quality list
    if (C1_LIST.has(code)) symbols.add('C');
    if (/^T14[0-9]/.test(code)) symbols.add('C');
    // H — Z76.8 with other codes
    if ((code === 'Z768' || code === 'Z76.8' || code === 'Z76') && otherCodesOnEncounter > 0) symbols.add('H');

    return Array.from(symbols);
}

async function errorSymbolsAudit(type, range) {
    let sql, encKey, codesField;
    if (type === 'opd') {
        sql = `
            SELECT o.vn AS enc, d.diagtype, d.icd10
            FROM ovst o
            INNER JOIN ovstdiag d ON d.vn = o.vn
            WHERE o.vstdate BETWEEN '${range.start}' AND '${range.end}'
              AND d.icd10 IS NOT NULL AND d.icd10 <> ''
        `;
        encKey = 'vn';
    } else {
        sql = `
            SELECT i.an AS enc, d.diagtype, d.icd10
            FROM ipt i
            INNER JOIN iptdiag d ON d.an = i.an
            WHERE i.dchdate IS NOT NULL
              AND i.dchdate BETWEEN '${range.start}' AND '${range.end}'
              AND d.icd10 IS NOT NULL AND d.icd10 <> ''
        `;
        encKey = 'an';
    }
    const rows = await dbQueryHeavy(`mr_audit_symbols_${type}_${range.key}`, 10, sql);

    // Group codes by encounter so we can check "other codes on encounter" for symbol H
    const byEnc = new Map();
    for (const r of rows) {
        if (!byEnc.has(r.enc)) byEnc.set(r.enc, []);
        byEnc.get(r.enc).push(r);
    }

    // Count encounters with no PDx (Symbol B = encounter-level)
    let encBNoPdx = 0;
    let totalEnc = 0;
    for (const [, codes] of byEnc) {
        totalEnc++;
        const hasPdx = codes.some(c => String(c.diagtype) === '1');
        if (!hasPdx) encBNoPdx++;
    }

    // Count per-code symbols
    const counts = { Y: 0, A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0 };
    let totalCodes = 0;

    for (const [enc, codes] of byEnc) {
        for (const c of codes) {
            totalCodes++;
            const others = codes.length - 1;
            const symbols = classifyCodeSymbols(c.icd10, c.diagtype, others);
            if (symbols.length === 0) {
                counts.Y++;
            } else {
                symbols.forEach(s => { counts[s]++; });
            }
        }
    }

    // Symbol B is encounter-level — but we report it per encounter (not per code)
    // Adjust: report B as encounter count
    counts.B = encBNoPdx;

    const symbols = Object.keys(SYMBOL_DEFS).map(code => {
        const def = SYMBOL_DEFS[code];
        const cnt = counts[code] || 0;
        const denom = code === 'B' ? totalEnc : totalCodes;
        const pct = denom > 0 ? (cnt / denom * 100) : 0;
        return {
            code,
            label: def.label,
            desc: def.desc,
            color: def.color,
            kind: def.kind,
            count: cnt,
            denom,
            pct: Math.round(pct * 100) / 100,
            auto_na: def.kind === 'na',
        };
    });

    return {
        type, days: range.days,
        total_encounters: totalEnc,
        total_codes: totalCodes,
        symbols,
        data_source: type === 'opd'
            ? 'HOSxP XE (ovst + ovstdiag) · เกณฑ์ สนย. Form A2/A4'
            : 'HOSxP XE (ipt + iptdiag) · เกณฑ์ สนย. Form A2/A4',
        method: 'rule-based classification per code',
        note: 'Symbols A และ G ต้องใช้ clinical context (judgement) — auto-derive ระบุเป็น NA. Y = code ที่ไม่ติด rule D/C/E/F/H. Symbol B วัดที่ encounter level (no PDx). อื่นๆ วัดที่ code level.',
    };
}

router.get('/error-symbols', async (req, res) => {
    try {
        const range = getDateRange(req, 30);
        const type = String(req.query.type || 'ipd').toLowerCase();
        if (type !== 'ipd' && type !== 'opd') {
            return res.status(400).json({ error: 'type must be ipd or opd' });
        }
        const result = await errorSymbolsAudit(type, range);
        res.json(result);
    } catch (err) {
        logger.error('[mr-audit/error-symbols]', { type: req.query.type, error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// GET /api/mr-audit/error-symbols-detail?symbol=D&type=ipd&start_date=&end_date=
// Return list of encounters/codes that trigger a specific symbol
router.get('/error-symbols-detail', async (req, res) => {
    try {
        const range = getDateRange(req, 30);
        const type = String(req.query.type || 'ipd').toLowerCase();
        const symbol = String(req.query.symbol || '').toUpperCase();
        if (type !== 'ipd' && type !== 'opd') {
            return res.status(400).json({ error: 'type must be ipd or opd' });
        }
        if (!SYMBOL_DEFS[symbol]) {
            return res.status(400).json({ error: 'unknown symbol' });
        }

        const def = SYMBOL_DEFS[symbol];

        // A and G are clinical-judgement → return explanation only
        if (def.kind === 'na') {
            return res.json({
                symbol, label: def.label, desc: def.desc, type, days: range.days,
                kind: 'na',
                records: [],
                guidance: SYMBOL_GUIDANCE[symbol] || null,
                note: symbol === 'A'
                    ? 'Symbol A = ผิดพลาด (รหัสไม่ตรง dx) — ต้องใช้ clinical judgement เปรียบเทียบ Dx ใน chart กับ ICD code. ระบบ auto ตรวจไม่ได้.'
                    : 'Symbol G = ควรมีรหัสแต่ไม่มี — ต้องอ่าน chart เพื่อหา Dx ที่ควรถูก code แต่ไม่ได้ลงรหัส. ระบบ auto ตรวจไม่ได้.',
            });
        }

        // Pull all rows in window
        let baseSql;
        if (type === 'opd') {
            baseSql = `
                SELECT o.vn AS encounter, o.hn, o.vstdate AS event_date, o.main_dep AS dept, o.doctor,
                       d.diagtype, d.icd10, LENGTH(d.icd10) AS code_len
                FROM ovst o
                INNER JOIN ovstdiag d ON d.vn = o.vn
                WHERE o.vstdate BETWEEN '${range.start}' AND '${range.end}'
                  AND d.icd10 IS NOT NULL AND d.icd10 <> ''
            `;
        } else {
            baseSql = `
                SELECT i.an AS encounter, i.hn, i.dchdate AS event_date, i.ward AS dept, i.dch_doctor AS doctor,
                       d.diagtype, d.icd10, LENGTH(d.icd10) AS code_len
                FROM ipt i
                INNER JOIN iptdiag d ON d.an = i.an
                WHERE i.dchdate IS NOT NULL
                  AND i.dchdate BETWEEN '${range.start}' AND '${range.end}'
                  AND d.icd10 IS NOT NULL AND d.icd10 <> ''
            `;
        }
        const rows = await dbQueryHeavy(`mr_audit_symbols_raw_${type}_${range.key}`, 10, baseSql);

        // Group by encounter for B + H + Y
        const byEnc = new Map();
        for (const r of rows) {
            if (!byEnc.has(r.encounter)) byEnc.set(r.encounter, []);
            byEnc.get(r.encounter).push(r);
        }

        const matches = [];

        if (symbol === 'B') {
            for (const [enc, codes] of byEnc) {
                const hasPdx = codes.some(c => String(c.diagtype) === '1');
                if (!hasPdx) {
                    const first = codes[0];
                    matches.push({
                        encounter: enc, hn: first.hn,
                        event_date: first.event_date, dept: first.dept, doctor: first.doctor,
                        icd10: codes.map(c => c.icd10).join(', '),
                        code_count: codes.length,
                    });
                }
            }
        } else if (symbol === 'Y') {
            for (const r of rows) {
                const code = String(r.icd10 || '').toUpperCase().replace(/\./g, '');
                const len = code.length;
                const isD = /^[VWXY]/.test(code) && len < 5;
                const isF = len > 5;
                const isE = String(r.diagtype) === '1' && /^[VWXY]/.test(code);
                const isC = C1_LIST.has(code) || /^T14[0-9]/.test(code);
                const others = (byEnc.get(r.encounter) || []).length - 1;
                const isH = (code === 'Z768' || code === 'Z76') && others > 0;
                if (!isD && !isF && !isE && !isC && !isH) {
                    matches.push({
                        encounter: r.encounter, hn: r.hn,
                        event_date: r.event_date, dept: r.dept, doctor: r.doctor,
                        icd10: r.icd10, diagtype: r.diagtype,
                    });
                }
            }
        } else {
            // Per-code rules: C, D, E, F, H
            for (const r of rows) {
                const code = String(r.icd10 || '').toUpperCase().replace(/\./g, '');
                const len = code.length;
                let hit = false;
                if (symbol === 'D' && /^[VWXY]/.test(code) && len < 5) hit = true;
                else if (symbol === 'F' && len > 5) hit = true;
                else if (symbol === 'E' && String(r.diagtype) === '1' && /^[VWXY]/.test(code)) hit = true;
                else if (symbol === 'C' && (C1_LIST.has(code) || /^T14[0-9]/.test(code))) hit = true;
                else if (symbol === 'H') {
                    const others = (byEnc.get(r.encounter) || []).length - 1;
                    if ((code === 'Z768' || code === 'Z76') && others > 0) hit = true;
                }
                if (hit) {
                    matches.push({
                        encounter: r.encounter, hn: r.hn,
                        event_date: r.event_date, dept: r.dept, doctor: r.doctor,
                        icd10: r.icd10, diagtype: r.diagtype, code_len: r.code_len,
                    });
                }
            }
        }

        matches.sort((a, b) => String(b.event_date || '').localeCompare(String(a.event_date || '')));
        const totalMatches = matches.length;
        const records = matches.slice(0, 500);

        res.json({
            symbol, label: def.label, desc: def.desc, type, days: range.days,
            kind: def.kind,
            total: totalMatches,
            returned: records.length,
            records,
            guidance: SYMBOL_GUIDANCE[symbol] || null,
            note: totalMatches > records.length
                ? `แสดง ${records.length} จากทั้งหมด ${totalMatches} รายการ`
                : null,
        });
    } catch (err) {
        logger.error('[mr-audit/error-symbols-detail]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ═══════════════════════════════════════════════════════════════════════
// SECTION 2 — สปสช. (MRA Guideline 2563) — Phase 2A/2B/2C/2D
// ═══════════════════════════════════════════════════════════════════════
//  12 IPD content sections × 9 criteria (Section 2 = 7) = ~106 จุดตรวจ
//  Auto-derive: existence check from HOSxP (limited — full audit ต้อง manual)
//  Manual audit: sidecar tables mr_audit_2563_score + mr_audit_2563_overall
// ═══════════════════════════════════════════════════════════════════════

const SAPSACH_SECTIONS = [
    { code: 'DS_DX',   label: 'Discharge Summary: Dx + Operation', maxC: 9, naAble: false },
    { code: 'DS_OTH',  label: 'Discharge Summary: Others',         maxC: 7, naAble: false },
    { code: 'CONSENT', label: 'Informed Consent',                  maxC: 9, naAble: false },
    { code: 'HX',      label: 'History',                            maxC: 9, naAble: false },
    { code: 'PE',      label: 'Physical Examination',               maxC: 9, naAble: false },
    { code: 'PROG',    label: "Progress Note + Doctor's Order",     maxC: 9, naAble: false },
    { code: 'CONSULT', label: 'Consultation Record',                maxC: 9, naAble: true  },
    { code: 'ANES',    label: 'Anesthetic Record',                  maxC: 9, naAble: true  },
    { code: 'OP',      label: 'Operative Note',                     maxC: 9, naAble: true  },
    { code: 'LABOUR',  label: 'Labour Record',                      maxC: 9, naAble: true  },
    { code: 'REHAB',   label: 'Rehabilitation Record',              maxC: 9, naAble: true  },
    { code: 'NURSE',   label: "Nurses' Note",                        maxC: 9, naAble: false },
];

const SAPSACH_CRITERIA = {
    DS_DX: [
        'PDx เป็น clinical term + เพียงโรคเดียว สอดคล้อง ER',
        'Comorbidity/Complication/External cause เป็น clinical term',
        'Procedure/Operation ถูกต้องครบถ้วน',
        'วัน-เวลา เริ่ม/สิ้นสุดการทำหัตถการ OR',
        'ไม่ใช้ตัวย่อใน Dx + procedure + ลายมือชัด',
        'Clinical summary ครบ 5 ประเด็น',
        'สาเหตุการตาย (ถ้าเสียชีวิต) สอดคล้อง ER',
        'Discharge status + type ถูกต้อง',
        'ลายมือชื่อแพทย์ + เลขใบประกอบวิชาชีพ',
    ],
    DS_OTH: [
        'ชื่อ-สกุล-เพศ-อายุ',
        'เลขประจำตัวประชาชน/passport/ใบต่างด้าว',
        'ที่อยู่ปัจจุบัน',
        'ชื่อ รพ. + HN + AN ตรงทุกแห่ง',
        'วัน-เวลา admit + discharge',
        'LOS + total leave days',
        'ชื่อผู้ให้รหัสโรค + ผู้ให้รหัสหัตถการ',
    ],
    CONSENT: [
        'ชื่อ-สกุล ผู้ป่วย',
        'ลายมือ + ชื่อ + ตำแหน่ง ผู้ให้คำอธิบาย',
        'ลายมือชื่อ ผู้ยินยอม',
        'พยานฝ่ายผู้ป่วย 1 คน',
        'พยานฝ่าย รพ. 1 คน',
        'รายละเอียดเหตุผล/วิธีการรักษา',
        'ทางเลือก · ข้อดี · ข้อเสีย',
        'ระยะเวลา · ผล · ความเสี่ยง · ภาวะแทรกซ้อน',
        'วัน-เดือน-ปี + เวลา ที่ยินยอม',
    ],
    HX: [
        'Chief complaint + ระยะเวลา',
        'Present illness — 5W2H อย่างน้อย 3 ข้อ',
        'การรักษาที่ได้มาแล้ว / ประวัติการรักษาเดิม',
        'Past illness ที่เกี่ยวข้อง',
        'ประวัติแพ้ยา/แพ้อื่นๆ พร้อมระบุชื่อ',
        'Family/Personal/Social history',
        'Review of system ทุกระบบ',
        'ลายมือแพทย์ + เลขใบประกอบ',
        'ระบุแหล่งที่มาของข้อมูล',
    ],
    PE: [
        'Vital signs: T, P, R, BP',
        'น้ำหนัก + ส่วนสูง',
        'ตรวจร่างกาย ดู-คลำ-เคาะ-ฟัง',
        'วาดรูป/graphic แสดงสิ่งผิดปกติ',
        'ตรวจทุกระบบ',
        'Problem list สรุปปัญหา',
        'Provisional diagnosis',
        'แผนการรักษา (ไม่ใช่แค่ "admit")',
        'ลายมือแพทย์ + เลขใบประกอบ',
    ],
    PROG: [
        'วัน-เดือน-ปี + เวลา ทุกครั้งที่บันทึก',
        'บันทึกทุกวันใน 3 วันแรก',
        'SOAP ครบใน 3 วันแรก',
        'บันทึกทุกครั้งที่มี change',
        'SOAP ครบทุกครั้งของ change',
        'แปลผล investigation + Dx ใหม่',
        'บันทึกในตำแหน่งที่หน่วยกำหนด',
        'ลายมือแพทย์',
        "Doctor's order ลง วัน-เวลา + ลายมือ",
    ],
    CONSULT: [
        'วัน-เวลา + ความรีบด่วน + หน่วยที่ขอ',
        'ปัญหาที่ต้องการปรึกษา',
        'ประวัติ + PE + การรักษาโดยย่อ',
        'ลายมือผู้ขอ + เลขใบประกอบ',
        'ผลการตรวจเพิ่ม + Dx ของผู้รับ',
        'ความเห็น/แผน/คำแนะนำ',
        'วัน-เวลา ที่ผู้รับมาตรวจ',
        'ลายมือผู้รับ + เลขใบประกอบ',
        'บันทึกตรงตำแหน่งที่หน่วยกำหนด',
    ],
    ANES: [
        'Status + วิธีให้ยาระงับ',
        'Pre-op diagnosis ตรงกับ Dx แพทย์',
        'ชนิด + ชื่อ operation ตรง',
        'Pre-anesthetic evaluation',
        'Vital signs ทุก 5 นาที',
        'Intake/output/blood loss',
        'Recovery room 1 ชม.',
        'Post-anesthetic round + ปัญหา',
        'ลายมือชื่อวิสัญญีแพทย์/พยาบาล',
    ],
    OP: [
        'ข้อมูลผู้ป่วย ครบ',
        'Pre-op + post-op diagnosis',
        'ชื่อ procedure สอดคล้อง',
        'สิ่งที่ตรวจพบ สอดคล้องกับ post-op Dx',
        'รายละเอียดวิธีทำ',
        'ภาวะแทรกซ้อน + blood loss',
        'วัน-เวลา เริ่ม-สิ้นสุด',
        'คณะผู้ร่วม + วิธีให้ยาระงับ',
        'ลายมือแพทย์ + เลขใบประกอบ',
    ],
    LABOUR: [
        'Obstetric history + ANC',
        'ระยะรอคลอด: VS · contraction · dilation',
        'ระยะเวลาแต่ละ stage',
        'หัตถการคลอด/ข้อบ่งชี้',
        'คำสั่ง+ยา ก่อน/ระหว่าง/หลังคลอด',
        'วัน-เวลาทารกคลอด + เพศ + น้ำหนัก',
        'Post-partum: placenta · complication · VS',
        'Apgar (1,5,10 นาที)',
        'ลายมือแพทย์/พยาบาลผู้ทำคลอด',
    ],
    REHAB: [
        'ประวัติ chief complaint + อดีต',
        'ตรวจร่างกายที่เกี่ยวข้อง',
        'Diagnosis + ปัญหาที่ต้องฟื้นฟู',
        'เป้าหมาย + แผน + ชนิดบำบัด',
        'บันทึกการรักษาแต่ละครั้ง',
        'ประเมินผล + ความก้าวหน้า',
        'สรุปผล + แผนจำหน่าย',
        'Home program + family education',
        'ลายมือแพทย์เวชศาสตร์ฟื้นฟู',
    ],
    NURSE: [
        'การประเมินแรกรับ + เวลาแรกรับ',
        'ระบุปัญหาทางการพยาบาล',
        'กิจกรรมการพยาบาล + ประเมินซ้ำ',
        'ประเมินการตอบสนอง + บันทึกหัตถการ',
        'ให้ข้อมูล ทั้งร่างกาย/จิตใจ',
        'Discharge plan',
        'ประสานการดูแลต่อเนื่อง',
        'การจำหน่าย — สรุปอาการ/ส่งต่อ',
        'วัน-เวลา + ลายมือทุกครั้ง',
    ],
};

const stmt2563ScoresForAn = sidecar.prepare(`
    SELECT section_code, criterion_no, score, comment, updated_by, updated_at
    FROM   mr_audit_2563_score
    WHERE  an = ?
    ORDER BY section_code, criterion_no
`);
const stmt2563UpsertScore = sidecar.prepare(`
    INSERT INTO mr_audit_2563_score (an, section_code, criterion_no, score, comment, updated_by)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(an, section_code, criterion_no) DO UPDATE SET
        score = excluded.score,
        comment = excluded.comment,
        updated_by = excluded.updated_by,
        updated_at = datetime('now','localtime')
`);
const stmt2563OverallForAn = sidecar.prepare(`
    SELECT finding, comment, updated_by, updated_at
    FROM mr_audit_2563_overall
    WHERE an = ?
`);
const stmt2563UpsertOverall = sidecar.prepare(`
    INSERT INTO mr_audit_2563_overall (an, finding, comment, updated_by)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(an) DO UPDATE SET
        finding = excluded.finding,
        comment = excluded.comment,
        updated_by = excluded.updated_by,
        updated_at = datetime('now','localtime')
`);
const stmt2563AnsWithAudit = sidecar.prepare(`
    SELECT DISTINCT an FROM mr_audit_2563_score
    UNION
    SELECT DISTINCT an FROM mr_audit_2563_overall
`);
const stmt2563OverallCounts = sidecar.prepare(`
    SELECT finding, COUNT(*) AS c FROM mr_audit_2563_overall GROUP BY finding
`);
const stmt2563AnAggregateScore = sidecar.prepare(`
    SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN score = 1 THEN 1 ELSE 0 END) AS passes,
        SUM(CASE WHEN score = 0 THEN 1 ELSE 0 END) AS fails,
        SUM(CASE WHEN score IS NULL THEN 1 ELSE 0 END) AS nas
    FROM mr_audit_2563_score
    WHERE an = ?
`);

async function sapsachAutoDeriveRows(range) {
    const sql = `
        SELECT
            i.an, i.hn, i.dchdate, i.regdate, i.ward, i.dch_doctor,
            i.dchstts, i.dchtype, DATEDIFF(i.dchdate, i.regdate) AS los_days,
            ds.summary_note_text, ds.doctor_code AS ds_doctor,
            id.discharge_order_status,
            (SELECT COUNT(*) FROM iptdiag dx WHERE dx.an = i.an) AS dx_cnt,
            (SELECT COUNT(*) FROM iptdiag dx WHERE dx.an = i.an AND dx.diagtype = '1') AS pdx_cnt,
            (SELECT COUNT(*) FROM ipd_nurse_note nn WHERE nn.an = i.an AND (nn.temperature IS NOT NULL OR nn.bp_systolic IS NOT NULL)) AS vital_cnt,
            (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an AND (nn.temperature IS NOT NULL OR nn.bp_systolic IS NOT NULL)) AS vital_days,
            (SELECT COUNT(*) FROM ipd_doctor_order od WHERE od.an = i.an) AS order_cnt,
            (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an) AS nurse_days,
            (SELECT COUNT(*) FROM iptoprt op WHERE op.an = i.an) AS op_cnt,
            (SELECT COUNT(*) FROM ipt_labour lb WHERE lb.an = i.an) AS labour_cnt,
            (SELECT COUNT(*) FROM ipt_pregnancy pg WHERE pg.an = i.an) AS preg_cnt,
            (SELECT COUNT(*) FROM ipt_consent_list cl WHERE cl.an = i.an) AS consent_cnt
        FROM ipt i
        LEFT JOIN ipt_discharge_summary_note ds ON ds.an = i.an
        LEFT JOIN ipt_discharge id ON id.an = i.an
        WHERE i.dchdate IS NOT NULL
          AND i.dchdate BETWEEN '${range.start}' AND '${range.end}'
        ORDER BY i.dchdate DESC
        LIMIT 1000
    `;
    const rows = await dbQueryHeavy(`mr_audit_sapsach_${range.key}`, 10, sql);
    return rows.map(r => sapsachClassify(r));
}

function sapsachClassify(r) {
    const los = Math.max(0, Number(r.los_days) || 0);
    const summary = String(r.summary_note_text || '').trim();
    const sections = {};

    if (r.pdx_cnt >= 1 && summary.length >= 50) sections.DS_DX = 'present';
    else if (r.pdx_cnt >= 1 || summary.length > 0) sections.DS_DX = 'partial';
    else sections.DS_DX = 'missing';

    if (r.dchstts && r.dchtype && r.dch_doctor && r.dchdate && r.regdate) sections.DS_OTH = 'present';
    else if (r.dchstts || r.dchtype || r.dch_doctor) sections.DS_OTH = 'partial';
    else sections.DS_OTH = 'missing';

    sections.CONSENT = Number(r.consent_cnt) >= 1 ? 'present' : 'missing';

    if (r.dx_cnt >= 2) sections.HX = 'present';
    else if (r.dx_cnt >= 1) sections.HX = 'partial';
    else sections.HX = 'missing';

    if (r.vital_cnt >= 4 && r.vital_days >= Math.max(1, los)) sections.PE = 'present';
    else if (r.vital_cnt >= 1) sections.PE = 'partial';
    else sections.PE = 'missing';

    if (r.order_cnt >= Math.max(5, los * 2)) sections.PROG = 'present';
    else if (r.order_cnt >= 1) sections.PROG = 'partial';
    else sections.PROG = 'missing';

    sections.CONSULT = 'na';

    if (r.op_cnt > 0) sections.ANES = 'present';
    else sections.ANES = 'na';

    if (r.op_cnt >= 1) sections.OP = 'present';
    else sections.OP = 'na';

    if (Number(r.labour_cnt) >= 1 || Number(r.preg_cnt) >= 1) sections.LABOUR = 'present';
    else sections.LABOUR = 'na';

    sections.REHAB = 'na';

    if (r.nurse_days >= los) sections.NURSE = 'present';
    else if (r.nurse_days >= 1) sections.NURSE = 'partial';
    else sections.NURSE = 'missing';

    return {
        an: r.an, hn: r.hn,
        regdate: r.regdate, dchdate: r.dchdate,
        ward: r.ward, doctor: r.dch_doctor, los_days: los,
        sections,
    };
}

router.get('/sapsach-summary', async (req, res) => {
    try {
        const range = getDateRange(req, 180);
        const rows = await sapsachAutoDeriveRows(range);

        const aggMap = {};
        SAPSACH_SECTIONS.forEach(s => { aggMap[s.code] = { present: 0, partial: 0, missing: 0, na: 0 }; });
        rows.forEach(r => {
            SAPSACH_SECTIONS.forEach(s => {
                const st = r.sections[s.code];
                if (st && aggMap[s.code][st] != null) aggMap[s.code][st]++;
            });
        });

        const auditedAns = stmt2563AnsWithAudit.all().map(x => x.an);
        const auditedSet = new Set(auditedAns);
        const overallCounts = stmt2563OverallCounts.all();
        const overallMap = { inadequate: 0, no_issue: 0, in_question: 0 };
        overallCounts.forEach(r => { overallMap[r.finding] = r.c; });

        const sections = SAPSACH_SECTIONS.map(s => {
            const agg = aggMap[s.code];
            const totalApplicable = agg.present + agg.partial + agg.missing;
            const presentPct = totalApplicable > 0 ? (agg.present / totalApplicable * 100) : 0;
            return {
                code: s.code,
                label: s.label,
                maxCriteria: s.maxC,
                naAble: s.naAble,
                autoDerive: {
                    present: agg.present,
                    partial: agg.partial,
                    missing: agg.missing,
                    na: agg.na,
                    presentPct: Math.round(presentPct * 10) / 10,
                },
            };
        });

        const sample = rows.slice(0, 50).map(r => ({
            an: r.an, hn: r.hn,
            regdate: r.regdate, dchdate: r.dchdate,
            ward: r.ward, doctor: r.doctor, los_days: r.los_days,
            sections: r.sections,
            manualAudited: auditedSet.has(r.an),
        }));

        res.json({
            days: range.days,
            start_date: range.start,
            end_date: range.end,
            total_ans: rows.length,
            sections,
            sample,
            manualAuditStats: {
                totalAuditedAns: auditedAns.length,
                overallFindings: overallMap,
            },
            data_source: 'HOSxP XE + sidecar SQLite (mr_audit_2563_score/overall) · เกณฑ์ สปสช. 2563',
            method: 'auto-derive existence (per-section) + manual audit (per-criterion 12×9)',
            note: 'Auto-derive แสดงว่า section มี/ไม่มีข้อมูล — ไม่ได้วัด clinical quality. Full audit ต้อง manual ตามเกณฑ์ 12 sections × 9 criteria (~106 จุด)',
        });
    } catch (err) {
        logger.error('[mr-audit/sapsach-summary]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

router.get('/sapsach-detail/:an', async (req, res) => {
    try {
        const an = String(req.params.an);
        const sql = `
            SELECT
                i.an, i.hn, i.dchdate, i.regdate, i.ward, i.dch_doctor,
                i.dchstts, i.dchtype, DATEDIFF(i.dchdate, i.regdate) AS los_days,
                ds.summary_note_text, ds.doctor_code AS ds_doctor,
                (SELECT COUNT(*) FROM iptdiag dx WHERE dx.an = i.an) AS dx_cnt,
                (SELECT COUNT(*) FROM iptdiag dx WHERE dx.an = i.an AND dx.diagtype = '1') AS pdx_cnt,
                (SELECT COUNT(*) FROM ipd_nurse_note nn WHERE nn.an = i.an AND (nn.temperature IS NOT NULL OR nn.bp_systolic IS NOT NULL)) AS vital_cnt,
                (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an AND (nn.temperature IS NOT NULL OR nn.bp_systolic IS NOT NULL)) AS vital_days,
                (SELECT COUNT(*) FROM ipd_doctor_order od WHERE od.an = i.an) AS order_cnt,
                (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an) AS nurse_days,
                (SELECT COUNT(*) FROM iptoprt op WHERE op.an = i.an) AS op_cnt,
                (SELECT COUNT(*) FROM ipt_labour lb WHERE lb.an = i.an) AS labour_cnt,
                (SELECT COUNT(*) FROM ipt_pregnancy pg WHERE pg.an = i.an) AS preg_cnt,
                (SELECT COUNT(*) FROM ipt_consent_list cl WHERE cl.an = i.an) AS consent_cnt
            FROM ipt i
            LEFT JOIN ipt_discharge_summary_note ds ON ds.an = i.an
            LEFT JOIN ipt_discharge id ON id.an = i.an
            WHERE i.an = ?
            LIMIT 1
        `;
        const rows = await dbQuery(sql, [an]);
        if (!rows.length) return res.status(404).json({ error: 'AN not found' });
        const auto = sapsachClassify(rows[0]);

        const scoreRows = stmt2563ScoresForAn.all(an);
        const scoreGrid = {};
        SAPSACH_SECTIONS.forEach(s => {
            scoreGrid[s.code] = Array(s.maxC).fill(null).map(() => ({ score: null, comment: null }));
        });
        scoreRows.forEach(r => {
            const sec = scoreGrid[r.section_code];
            if (sec && r.criterion_no >= 1 && r.criterion_no <= sec.length) {
                sec[r.criterion_no - 1] = {
                    score: r.score,
                    comment: r.comment,
                    updated_by: r.updated_by,
                    updated_at: r.updated_at,
                };
            }
        });

        const agg = stmt2563AnAggregateScore.get(an);
        const passes = agg.passes || 0;
        const fails = agg.fails || 0;
        const totalScored = passes + fails;
        const passPct = totalScored > 0 ? (passes / totalScored * 100) : null;
        let manualGrade = null;
        if (passPct != null) {
            if (passPct >= 85) manualGrade = 'A';
            else if (passPct >= 70) manualGrade = 'B';
            else if (passPct >= 50) manualGrade = 'C';
            else manualGrade = 'D';
        }

        const overallRow = stmt2563OverallForAn.get(an);

        res.json({
            an,
            patient: {
                hn: auto.hn, ward: auto.ward,
                regdate: auto.regdate, dchdate: auto.dchdate,
                doctor: auto.doctor, los_days: auto.los_days,
            },
            autoDerive: { sections: auto.sections },
            manualAudit: {
                grid: scoreGrid,
                aggregate: {
                    passes, fails,
                    nas: agg.nas || 0,
                    total: totalScored,
                    passPct: passPct != null ? Math.round(passPct * 10) / 10 : null,
                    grade: manualGrade,
                },
            },
            overall: overallRow || null,
            sections: SAPSACH_SECTIONS,
            criteria: SAPSACH_CRITERIA,
        });
    } catch (err) {
        logger.error('[mr-audit/sapsach-detail]', { an: req.params.an, error: err.message });
        res.status(500).json({ error: err.message });
    }
});

router.post('/sapsach-score/:an', (req, res) => {
    try {
        const an = String(req.params.an);
        const scores = Array.isArray(req.body?.scores) ? req.body.scores : [];
        const user = req.user?.username || 'unknown';
        if (!scores.length) return res.status(400).json({ error: 'scores array required' });

        const sectionCodes = new Set(SAPSACH_SECTIONS.map(s => s.code));
        const tx = sidecar.transaction((items) => {
            for (const it of items) {
                if (!sectionCodes.has(it.section_code)) continue;
                const n = parseInt(it.criterion_no);
                if (!Number.isInteger(n) || n < 1 || n > 9) continue;
                const s = it.score;
                const validScore = s === null || s === 0 || s === 1 ? s : null;
                stmt2563UpsertScore.run(an, it.section_code, n, validScore, it.comment || null, user);
            }
        });
        tx(scores);
        res.json({ success: true, saved: scores.length });
    } catch (err) {
        logger.error('[mr-audit/sapsach-score POST]', { an: req.params.an, error: err.message });
        res.status(500).json({ error: err.message });
    }
});

router.post('/sapsach-overall/:an', (req, res) => {
    try {
        const an = String(req.params.an);
        const { finding, comment } = req.body || {};
        const user = req.user?.username || 'unknown';
        if (!['inadequate', 'no_issue', 'in_question'].includes(finding)) {
            return res.status(400).json({ error: 'finding must be inadequate/no_issue/in_question' });
        }
        stmt2563UpsertOverall.run(an, finding, comment || null, user);
        res.json({ success: true, finding });
    } catch (err) {
        logger.error('[mr-audit/sapsach-overall POST]', { an: req.params.an, error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ─────────────────────────────────────────────────────────────
// AI Pre-fill — auto-score the HIGH-CONFIDENCE criteria from HOSxP
// ─────────────────────────────────────────────────────────────
//  เกณฑ์ที่ตอบจาก field HOSxP ได้ชัด ~ 15-20 จุด / AN จาก 106
//  Inserted as updated_by='auto' so UI can show "Auto" badge.
//  INSERT OR IGNORE — ไม่ทับ row ที่ manual บันทึกไว้แล้ว.
// ─────────────────────────────────────────────────────────────

const stmt2563AutoInsert = sidecar.prepare(`
    INSERT OR IGNORE INTO mr_audit_2563_score
        (an, section_code, criterion_no, score, comment, updated_by)
    VALUES (?, ?, ?, ?, ?, 'auto')
`);
const stmt2563DeleteAuto = sidecar.prepare(`
    DELETE FROM mr_audit_2563_score WHERE an = ? AND updated_by = 'auto'
`);

// SQL ที่ extend จาก sapsachAutoDeriveRows + เพิ่ม fields ที่ใช้ pre-fill
async function sapsachPrefillQuery(whereClause, params, limit) {
    const sql = `
        SELECT
            i.an, i.hn, i.regdate, i.dchdate, i.admdoctor, i.dch_doctor, i.ward,
            i.dchstts, i.dchtype, DATEDIFF(i.dchdate, i.regdate) AS los_days,
            CONCAT_WS(' ', p.pname, p.fname, p.lname) AS pt_name, p.sex AS pt_sex, p.cid AS pt_cid, p.addrpart AS pt_addr, p.drugallergy AS pt_drug_allergy,
            ds.summary_note_text, ds.doctor_code AS ds_doctor,
            id.discharge_order_status,
            (SELECT COUNT(*) FROM iptdiag dx WHERE dx.an = i.an) AS dx_cnt,
            (SELECT COUNT(*) FROM iptdiag dx WHERE dx.an = i.an AND dx.diagtype = '1') AS pdx_cnt,
            (SELECT COUNT(*) FROM iptdiag dx WHERE dx.an = i.an AND dx.diagtype != '1') AS comorbid_cnt,
            (SELECT COUNT(*) FROM ipd_nurse_note nn WHERE nn.an = i.an
                AND nn.temperature IS NOT NULL AND nn.pulse IS NOT NULL
                AND nn.respiratory_rate IS NOT NULL AND nn.bp_systolic IS NOT NULL) AS full_vital_cnt,
            (SELECT COUNT(*) FROM ipd_nurse_note nn WHERE nn.an = i.an AND nn.weight IS NOT NULL) AS weight_cnt,
            (SELECT COUNT(*) FROM ipd_doctor_order od WHERE od.an = i.an) AS order_cnt,
            (SELECT COUNT(DISTINCT DATE(od.order_date)) FROM ipd_doctor_order od WHERE od.an = i.an
                AND od.order_date >= i.regdate AND od.order_date <= DATE_ADD(i.regdate, INTERVAL 3 DAY)) AS days_in_first3,
            (SELECT COUNT(*) FROM ipd_doctor_order od WHERE od.an = i.an AND od.doctor_code IS NOT NULL) AS order_signed_cnt,
            (SELECT COUNT(*) FROM ipd_nurse_note nn WHERE nn.an = i.an) AS nurse_cnt,
            (SELECT COUNT(*) FROM ipd_nurse_note nn WHERE nn.an = i.an AND nn.staff IS NOT NULL) AS nurse_signed_cnt,
            (SELECT COUNT(*) FROM iptoprt op WHERE op.an = i.an) AS op_cnt,
            (SELECT COUNT(*) FROM iptoprt op WHERE op.an = i.an AND op.doctor IS NOT NULL) AS op_signed_cnt,
            (SELECT COUNT(*) FROM iptoprt op WHERE op.an = i.an AND op.opdate IS NOT NULL AND op.optime IS NOT NULL) AS op_time_cnt,
            (SELECT COUNT(*) FROM ipt_labour lb WHERE lb.an = i.an) AS labour_cnt,
            (SELECT COUNT(*) FROM ipt_pregnancy pg WHERE pg.an = i.an) AS preg_cnt,
            (SELECT COUNT(*) FROM ipt_consent_list cl WHERE cl.an = i.an) AS consent_cnt,
            (SELECT COUNT(*) FROM opd_allergy aa WHERE aa.hn = i.hn) AS allergy_cnt,
            (SELECT COUNT(*) FROM iptdeath dd WHERE dd.an = i.an) AS death_cnt
        FROM ipt i
        LEFT JOIN patient p ON p.hn = i.hn
        LEFT JOIN ipt_discharge_summary_note ds ON ds.an = i.an
        LEFT JOIN ipt_discharge id ON id.an = i.an
        ${whereClause}
        ORDER BY i.dchdate DESC
        LIMIT ${limit}
    `;
    return dbQuery(sql, params);
}

// Compute auto scores for one AN row. Returns array of {section_code, criterion_no, score}
function computeAutoScores(r) {
    const out = [];
    const summary = String(r.summary_note_text || '').trim();
    const pdxOK    = Number(r.pdx_cnt) === 1;
    const opCnt    = Number(r.op_cnt) || 0;
    const isOB     = (Number(r.labour_cnt) || 0) + (Number(r.preg_cnt) || 0) > 0;
    const isDead   = Number(r.death_cnt) > 0;

    // DS_DX — Discharge Summary: Dx + Operation
    out.push({ section_code: 'DS_DX', criterion_no: 1, score: pdxOK ? 1 : 0 });
    // #2 Comorbidity — only score 1 if there's > 1 dx (comorbid recorded); otherwise leave manual
    if (Number(r.comorbid_cnt) > 0) {
        out.push({ section_code: 'DS_DX', criterion_no: 2, score: 1 });
    }
    // #3 Procedure (NA if no op; check op_signed)
    out.push({ section_code: 'DS_DX', criterion_no: 3, score: opCnt > 0 ? (Number(r.op_signed_cnt) > 0 ? 1 : 0) : null });
    // #4 OR วัน-เวลา (NA if no op)
    out.push({ section_code: 'DS_DX', criterion_no: 4, score: opCnt > 0 ? (Number(r.op_time_cnt) > 0 ? 1 : 0) : null });
    // #6 Clinical summary 5 ประเด็น — proxy: length >= 200 = present, < 50 = fail
    if (summary.length >= 200) out.push({ section_code: 'DS_DX', criterion_no: 6, score: 1 });
    else if (summary.length < 50) out.push({ section_code: 'DS_DX', criterion_no: 6, score: 0 });
    // #7 สาเหตุการตาย (NA if alive)
    out.push({ section_code: 'DS_DX', criterion_no: 7, score: isDead ? 1 : null });
    // #8 Discharge status + type
    out.push({ section_code: 'DS_DX', criterion_no: 8, score: (r.dchstts && r.dchtype) ? 1 : 0 });
    // #9 ลายมือชื่อแพทย์
    out.push({ section_code: 'DS_DX', criterion_no: 9, score: r.dch_doctor ? 1 : 0 });

    // DS_OTH — Discharge Summary: Others (7 criteria)
    out.push({ section_code: 'DS_OTH', criterion_no: 1, score: r.pt_name ? 1 : 0 });
    out.push({ section_code: 'DS_OTH', criterion_no: 2, score: r.pt_cid ? 1 : 0 });
    out.push({ section_code: 'DS_OTH', criterion_no: 3, score: r.pt_addr ? 1 : 0 });
    out.push({ section_code: 'DS_OTH', criterion_no: 4, score: (r.hn && r.an) ? 1 : 0 });
    out.push({ section_code: 'DS_OTH', criterion_no: 5, score: (r.regdate && r.dchdate) ? 1 : 0 });
    out.push({ section_code: 'DS_OTH', criterion_no: 6, score: (Number(r.los_days) >= 0) ? 1 : 0 });
    out.push({ section_code: 'DS_OTH', criterion_no: 7, score: r.ds_doctor ? 1 : 0 });

    // CONSENT — only #1 (existence)
    if (Number(r.consent_cnt) > 0) out.push({ section_code: 'CONSENT', criterion_no: 1, score: 1 });
    else out.push({ section_code: 'CONSENT', criterion_no: 1, score: 0 });

    // HX — #5 (allergy: opd_allergy OR patient.drugallergy) + #8 (signed)
    const hasAllergyInfo = Number(r.allergy_cnt) > 0 || (r.pt_drug_allergy && String(r.pt_drug_allergy).trim());
    out.push({ section_code: 'HX', criterion_no: 5, score: hasAllergyInfo ? 1 : 0 });
    out.push({ section_code: 'HX', criterion_no: 8, score: r.admdoctor || r.dch_doctor ? 1 : 0 });

    // PE — #1 (vitals) + #2 (weight) + #9 (signed)
    out.push({ section_code: 'PE', criterion_no: 1, score: Number(r.full_vital_cnt) > 0 ? 1 : 0 });
    out.push({ section_code: 'PE', criterion_no: 2, score: Number(r.weight_cnt) > 0 ? 1 : 0 });
    out.push({ section_code: 'PE', criterion_no: 9, score: Number(r.nurse_signed_cnt) > 0 ? 1 : 0 });

    // PROG — #1 (timestamp) + #2 (3 days in first 3) + #9 (order signed)
    out.push({ section_code: 'PROG', criterion_no: 1, score: Number(r.order_cnt) > 0 ? 1 : 0 });
    const los = Math.max(0, Number(r.los_days) || 0);
    const targetDays = Math.min(3, los + 1);
    out.push({ section_code: 'PROG', criterion_no: 2, score: Number(r.days_in_first3) >= targetDays ? 1 : 0 });
    out.push({ section_code: 'PROG', criterion_no: 9, score: Number(r.order_signed_cnt) > 0 ? 1 : 0 });

    // CONSULT — all manual (no HOSxP source) — leave blank

    // ANES — NA if no op; if op exists assume signed
    if (opCnt === 0) {
        for (let i = 1; i <= 9; i++) out.push({ section_code: 'ANES', criterion_no: i, score: null });
    } else {
        // Mark only existence + signed (other anes details require record review)
        out.push({ section_code: 'ANES', criterion_no: 9, score: Number(r.op_signed_cnt) > 0 ? 1 : 0 });
    }

    // OP — NA if no op
    if (opCnt === 0) {
        for (let i = 1; i <= 9; i++) out.push({ section_code: 'OP', criterion_no: i, score: null });
    } else {
        // #7 วัน-เวลา + #9 signed (auto-derivable)
        out.push({ section_code: 'OP', criterion_no: 7, score: Number(r.op_time_cnt) > 0 ? 1 : 0 });
        out.push({ section_code: 'OP', criterion_no: 9, score: Number(r.op_signed_cnt) > 0 ? 1 : 0 });
    }

    // LABOUR — NA if not OB
    if (!isOB) {
        for (let i = 1; i <= 9; i++) out.push({ section_code: 'LABOUR', criterion_no: i, score: null });
    }
    // else: leave for manual

    // REHAB — always NA at BCH (no rehab service visibility)
    for (let i = 1; i <= 9; i++) out.push({ section_code: 'REHAB', criterion_no: i, score: null });

    // NURSE — #1 (first nurse note) + #9 (signed)
    out.push({ section_code: 'NURSE', criterion_no: 1, score: Number(r.nurse_cnt) > 0 ? 1 : 0 });
    out.push({ section_code: 'NURSE', criterion_no: 9, score: Number(r.nurse_signed_cnt) > 0 ? 1 : 0 });

    return out;
}

router.post('/sapsach-auto-prefill', async (req, res) => {
    try {
        const targetAn = req.query.an ? String(req.query.an) : null;
        const force = String(req.query.force || 'false') === 'true';
        const range = getDateRange(req, 180);
        let rows;
        if (targetAn) {
            rows = await sapsachPrefillQuery('WHERE i.an = ?', [targetAn], 1);
        } else {
            // Batch mode — AN in window
            rows = await sapsachPrefillQuery(
                `WHERE i.dchdate IS NOT NULL AND i.dchdate BETWEEN '${range.start}' AND '${range.end}'`,
                [], 1000
            );
        }

        let ansProcessed = 0;
        let scoresInserted = 0;
        let ansSkipped = 0;

        const tx = sidecar.transaction((items) => {
            for (const it of items) {
                const info = stmt2563AutoInsert.run(
                    it.an, it.section_code, it.criterion_no, it.score, it.comment || null
                );
                if (info.changes > 0) scoresInserted++;
            }
        });

        for (const r of rows) {
            // Skip if AN already has manual scores (unless force)
            const existing = sidecar.prepare(
                `SELECT COUNT(*) AS c FROM mr_audit_2563_score WHERE an = ? AND updated_by != 'auto'`
            ).get(r.an);
            if (existing.c > 0 && !force) {
                ansSkipped++;
                continue;
            }
            if (force) stmt2563DeleteAuto.run(r.an);

            const scores = computeAutoScores(r).map(s => ({ ...s, an: r.an }));
            tx(scores);
            ansProcessed++;
        }

        res.json({
            success: true,
            mode: targetAn ? 'single' : 'batch',
            ans_processed: ansProcessed,
            ans_skipped: ansSkipped,
            scores_inserted: scoresInserted,
            note: ansSkipped > 0
                ? 'Some AN skipped (have manual scores). Use ?force=true to overwrite auto rows.'
                : 'Auto-prefill ใส่เฉพาะ row ที่ HIGH-confidence (~25 จุด/AN). User เปิด modal มาตรวจ + ใส่ส่วนที่เหลือเองได้',
        });
    } catch (err) {
        logger.error('[mr-audit/sapsach-auto-prefill]', { error: err.message });
        res.status(500).json({ error: err.message });
    }
});

export default router;
