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
// 4 binary checks for IPD paperless completeness:
//   1. has primary diagnosis (iptdiag.diagtype='1')
//   2. has discharge summary note (ipt_discharge_summary_note row)
//   3. nursing notes cover the LOS (note_days >= los_days)
//   4. has discharge planning (asm_discharge_planning row)
function scoreCompleteness(row) {
    const losDays = Math.max(1, row.los_days || 1);
    const noteDays = row.nurse_note_days || 0;
    const checks = {
        pdx: (row.pdx_count || 0) > 0 ? 1 : 0,
        dch_summary: (row.dch_summary || 0) > 0 ? 1 : 0,
        nurse_notes: noteDays >= losDays ? 1 : 0,
        dch_plan: (row.dch_plan || 0) > 0 ? 1 : 0,
    };
    const total = Object.values(checks).reduce((a, b) => a + b, 0);
    return { ...checks, score: Math.round((total / 4) * 100) };
}

// ── Build base SQL (LEFT JOINs + completeness sub-selects) ──
function baseSql() {
    return `
        SELECT
            i.an, i.hn, i.ward, w.name AS ward_name,
            i.regdate, i.regtime, i.dchdate, i.dchtime,
            i.pttype, i.adjrw, i.rw, i.drg,
            i.admdoctor AS adm_doctor, i.dch_doctor,
            DATEDIFF(IFNULL(i.dchdate, CURDATE()), i.regdate) AS los_days,
            id.confirm_final_summary  AS doc_summary,
            id.confirm_audit_summary  AS hosxp_mr_audit,
            id.confirm_coding_summary AS coding_done,
            id.audit_summary_text,
            CONCAT(IFNULL(p.pname,''), IFNULL(p.fname,''), ' ', IFNULL(p.lname,'')) AS pt_name,
            (SELECT COUNT(*) FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') AS pdx_count,
            (SELECT COUNT(*) FROM ipt_discharge_summary_note dsn WHERE dsn.an = i.an) AS dch_summary,
            (SELECT COUNT(DISTINCT note_date) FROM ipd_nurse_note nn WHERE nn.an = i.an) AS nurse_note_days,
            (SELECT COUNT(*) FROM asm_discharge_planning dp WHERE dp.an = i.an) AS dch_plan
        FROM ipt i
        LEFT JOIN ipt_discharge id ON id.an = i.an
        LEFT JOIN ward w           ON w.ward = i.ward
        LEFT JOIN patient p        ON p.hn  = i.hn
    `;
}

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
        const cacheKey = `mr_audit_list_${days}_${ward || 'all'}_${limit}`;
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

export default router;
