// ============================================================
// Patient Satisfaction Survey — Phase E Tier 3 (#14)
// ============================================================
// PUBLIC POST /submit  — no auth, IP rate-limited
// PUBLIC GET  /summary — aggregate only, no PHI
//
// Stored in dw_patient_satisfaction (warehouse SQLite, NOT HOSxP)
// per skill bch-hosxp-readonly-safety: app-owned data never touches HOSxP.
// ============================================================
import { Router } from 'express';
import { getWarehouseDb } from '../db/dataWarehouse.js';
import logger from '../logger.js';

const router = Router();

// ── Simple in-memory rate limit (5 submissions / IP / 10 min) ──
const rateBuckets = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function rateLimited(ip) {
    const now = Date.now();
    const bucket = rateBuckets.get(ip) || [];
    const recent = bucket.filter(t => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
        return true;
    }
    recent.push(now);
    rateBuckets.set(ip, recent);
    return false;
}

// Periodic GC of rate buckets (avoid memory growth)
setInterval(() => {
    const cutoff = Date.now() - RATE_WINDOW_MS;
    for (const [ip, times] of rateBuckets.entries()) {
        const fresh = times.filter(t => t > cutoff);
        if (fresh.length === 0) rateBuckets.delete(ip);
        else rateBuckets.set(ip, fresh);
    }
}, 60 * 1000).unref();

const ALLOWED_DEPTS = new Set(['ER', 'OPD', 'IPD', 'DENTAL', 'PHARMACY', 'LAB', 'XRAY', 'NCD', 'THAIMED', 'PT']);

// ━━━━━━ POST /api/satisfaction/submit ━━━━━━
// Body: {
//   department: 'ER' (required),
//   overall_score: 1-5 (required),
//   speed_score?: 1-5,
//   staff_score?: 1-5,
//   facility_score?: 1-5,
//   comment?: string (<=500 chars),
//   hn?: string, vn?: string,
//   source?: 'qr' | 'kiosk' | 'web' | 'tablet'
// }
router.post('/submit', (req, res) => {
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').toString().split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) {
        return res.status(429).json({ error: 'too_many_requests', message: 'รับแบบสำรวจครบจำนวนแล้ว ลองใหม่ใน 10 นาที' });
    }

    const b = req.body || {};
    const dept = String(b.department || 'ER').toUpperCase();
    if (!ALLOWED_DEPTS.has(dept)) {
        return res.status(400).json({ error: 'invalid_department', allowed: Array.from(ALLOWED_DEPTS) });
    }

    const overall = Number(b.overall_score);
    if (!Number.isInteger(overall) || overall < 1 || overall > 5) {
        return res.status(400).json({ error: 'invalid_overall_score', message: 'overall_score must be integer 1-5' });
    }

    const optInt = v => {
        if (v === null || v === undefined || v === '') return null;
        const n = Number(v);
        return (Number.isInteger(n) && n >= 1 && n <= 5) ? n : null;
    };
    const speed = optInt(b.speed_score);
    const staff = optInt(b.staff_score);
    const facility = optInt(b.facility_score);

    const comment = b.comment ? String(b.comment).slice(0, 500) : null;
    const hn = b.hn ? String(b.hn).slice(0, 16) : null;
    const vn = b.vn ? String(b.vn).slice(0, 24) : null;
    const sourceRaw = String(b.source || 'qr').toLowerCase();
    const source = ['qr', 'kiosk', 'web', 'tablet'].includes(sourceRaw) ? sourceRaw : 'qr';

    try {
        const db = getWarehouseDb();
        const stmt = db.prepare(`
            INSERT INTO dw_patient_satisfaction
                (department, hn, vn, overall_score, speed_score, staff_score, facility_score, comment, source, client_ip)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const result = stmt.run(dept, hn, vn, overall, speed, staff, facility, comment, source, ip);
        res.json({ success: true, id: result.lastInsertRowid, message: 'ขอบคุณสำหรับความคิดเห็น' });
    } catch (e) {
        logger.error('satisfaction.submit failed', { error: e.message, ip });
        res.status(500).json({ error: 'internal_error' });
    }
});

// ━━━━━━ GET /api/satisfaction/summary ━━━━━━
// ?department=ER (default ER), ?days=30 (default 30)
// Aggregate only — safe to expose without auth.
router.get('/summary', (req, res) => {
    const dept = String(req.query.department || 'ER').toUpperCase();
    if (!ALLOWED_DEPTS.has(dept)) {
        return res.status(400).json({ error: 'invalid_department' });
    }
    const days = Math.min(365, Math.max(1, parseInt(req.query.days || '30', 10)));

    try {
        const db = getWarehouseDb();
        const summary = db.prepare(`
            SELECT
                COUNT(*) AS response_count,
                ROUND(AVG(overall_score), 2) AS avg_overall,
                ROUND(AVG(speed_score),   2) AS avg_speed,
                ROUND(AVG(staff_score),   2) AS avg_staff,
                ROUND(AVG(facility_score),2) AS avg_facility,
                SUM(CASE WHEN overall_score >= 4 THEN 1 ELSE 0 END) AS satisfied_count,
                SUM(CASE WHEN overall_score <= 2 THEN 1 ELSE 0 END) AS dissatisfied_count
            FROM dw_patient_satisfaction
            WHERE department = ?
              AND visit_date >= date('now', '-' || ? || ' days', 'localtime')
        `).get(dept, days);

        const distribution = db.prepare(`
            SELECT overall_score AS score, COUNT(*) AS cnt
            FROM dw_patient_satisfaction
            WHERE department = ?
              AND visit_date >= date('now', '-' || ? || ' days', 'localtime')
            GROUP BY overall_score
            ORDER BY overall_score DESC
        `).all(dept, days);

        const recentComments = db.prepare(`
            SELECT overall_score AS score, comment, visit_date, submitted_at
            FROM dw_patient_satisfaction
            WHERE department = ?
              AND comment IS NOT NULL AND length(trim(comment)) > 0
            ORDER BY submitted_at DESC
            LIMIT 10
        `).all(dept);

        const total = Number(summary?.response_count || 0);
        const satisfiedPct = total > 0
            ? Math.round((Number(summary.satisfied_count) / total) * 100 * 10) / 10
            : 0;

        res.json({
            data_source: 'BCH warehouse (dw_patient_satisfaction)',
            department: dept,
            window_days: days,
            response_count: total,
            avg_overall: Number(summary?.avg_overall || 0),
            avg_speed: Number(summary?.avg_speed || 0),
            avg_staff: Number(summary?.avg_staff || 0),
            avg_facility: Number(summary?.avg_facility || 0),
            satisfied_count: Number(summary?.satisfied_count || 0),
            satisfied_pct: satisfiedPct,
            dissatisfied_count: Number(summary?.dissatisfied_count || 0),
            distribution: distribution.map(d => ({ score: Number(d.score), count: Number(d.cnt) })),
            recent_comments: recentComments.map(c => ({
                score: Number(c.score),
                comment: c.comment,
                visit_date: c.visit_date,
                submitted_at: c.submitted_at,
            })),
            timestamp: new Date().toISOString(),
        });
    } catch (e) {
        logger.error('satisfaction.summary failed', { error: e.message });
        res.status(500).json({ error: 'internal_error' });
    }
});

export default router;
