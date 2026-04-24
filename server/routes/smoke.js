// ============================================================
// /api/smoke — public functional smoke test
//
// Why this exists: /healthz / /api/health only confirm the process
// is alive. They returned HTTP 200 even when V2's UI was completely
// broken (sidebar showed, main content blank). promote.sh polls THIS
// endpoint after deploy and refuses to sign off unless status is "ok".
//
// Checks (each is fast — endpoint must complete <1s):
//   1. db          MySQL ping (SELECT 1)
//   2. db_today    Sample row count from a known-busy table for today
//   3. asset       dist/index.html exists, contains expected marker
//
// Returns 200 when status is "ok", 503 otherwise. Public — no auth.
// ============================================================

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbQueryOne, isMySQLConnected } from '../db/mysql.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_INDEX = path.resolve(__dirname, '..', '..', 'dist', 'index.html');

router.get('/', async (_req, res) => {
    const started = Date.now();
    const checks = {};
    let overallOk = true;

    // 1. DB ping
    try {
        if (!isMySQLConnected()) throw new Error('pool not connected');
        const t0 = Date.now();
        await dbQueryOne('SELECT 1 AS ok');
        checks.db = { ok: true, latency_ms: Date.now() - t0 };
    } catch (err) {
        checks.db = { ok: false, error: err.message };
        overallOk = false;
    }

    // 2. Sample query — count today's OPD visits.
    // `ovst` is HOSxP's outpatient visit table; `vstdate` is the visit date.
    // A zero count before lunch is unusual; we treat it as a soft-warn (still ok)
    // so this doesn't false-fail at 02:00. Only DB error counts as failure.
    try {
        const t0 = Date.now();
        const row = await dbQueryOne(
            "SELECT COUNT(*) AS n FROM ovst WHERE vstdate = CURDATE()"
        );
        checks.db_today = {
            ok: true,
            latency_ms: Date.now() - t0,
            ovst_today: Number(row?.n ?? 0),
        };
    } catch (err) {
        checks.db_today = { ok: false, error: err.message };
        overallOk = false;
    }

    // 3. Frontend asset — index.html must exist and reference our app
    try {
        const stat = fs.statSync(DIST_INDEX); // throws if missing
        const head = fs.readFileSync(DIST_INDEX, 'utf-8').slice(0, 2000);
        const hasAppRoot = head.includes('id="root"') || head.includes("id='root'");
        if (!hasAppRoot) throw new Error('index.html missing #root mount point');
        checks.asset = { ok: true, size_bytes: stat.size };
    } catch (err) {
        checks.asset = { ok: false, error: err.message };
        overallOk = false;
    }

    res.status(overallOk ? 200 : 503).json({
        status: overallOk ? 'ok' : 'fail',
        elapsed_ms: Date.now() - started,
        version: '10.0.0',
        checked_at: new Date().toISOString(),
        checks,
    });
});

export default router;
