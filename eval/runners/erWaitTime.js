// ============================================================
// Eval Runner — ER Wait Time Forecast (hourly mean wait, mape)
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { mape, mean } from '../lib/stats.js';

const TARGETS = { mape_max: 0.20 };

export async function run({ hours = 24 * 7 } = {}) {
    const rows = await dbQuery(`
        SELECT DATE_FORMAT(e.register_time, '%Y-%m-%d %H:00') AS hr,
               AVG(TIMESTAMPDIFF(MINUTE, e.register_time, COALESCE(n.seen_by_md_time, e.doctor_contact_time))) AS avg_wait
        FROM er_regist e
        LEFT JOIN er_nursing_detail n ON n.vn = e.vn
        WHERE e.register_time >= DATE_SUB(NOW(), INTERVAL ? HOUR)
          AND (n.seen_by_md_time IS NOT NULL OR e.doctor_contact_time IS NOT NULL)
        GROUP BY DATE_FORMAT(e.register_time, '%Y-%m-%d %H:00')
        ORDER BY hr
    `, [hours]).catch(() => []);

    if (rows.length < 24) {
        return { n: rows.length, pass: false, note: 'insufficient data or columns missing' };
    }

    const actuals = rows.map(r => Number(r.avg_wait)).filter(v => Number.isFinite(v));
    // Forecast = 24-hour rolling mean
    const forecasts = actuals.map((_, i) => {
        if (i < 24) return null;
        return mean(actuals.slice(i - 24, i));
    });
    const pairs = actuals.map((a, i) => ({ a, f: forecasts[i] })).filter(p => p.f != null && p.a > 0);
    const mapeVal = mape(pairs.map(p => p.a), pairs.map(p => p.f));

    return {
        module: 'erWaitTime',
        pass: mapeVal != null && mapeVal <= TARGETS.mape_max,
        metrics: {
            n: pairs.length,
            mape: round(mapeVal),
            mean_actual: round(mean(pairs.map(p => p.a))),
            mean_forecast: round(mean(pairs.map(p => p.f))),
        },
        targets: TARGETS,
        note: '24h moving-avg baseline',
    };
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
