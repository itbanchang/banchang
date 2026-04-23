// ============================================================
// Eval Runner — Bed Demand Forecast (daily admits per ward)
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { mape, mean, directionalAccuracy } from '../lib/stats.js';

const TARGETS = { mape_max: 0.15 };

export async function run({ days = 30 } = {}) {
    const rows = await dbQuery(`
        SELECT regdate, COUNT(*) AS admits
        FROM ipt
        WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
          AND ward != '06'
        GROUP BY regdate
        ORDER BY regdate
    `, [days + 7]);

    if (rows.length < days) {
        return { n: rows.length, pass: false, note: `need ≥ ${days} days` };
    }

    const series = rows.map(r => Number(r.admits));
    // Forecast = 7-day moving average of prior days
    const forecasts = series.map((_, i) => {
        if (i < 7) return null;
        return mean(series.slice(i - 7, i));
    });

    const pairs = series.map((a, i) => ({ a, f: forecasts[i] }))
        .filter(p => p.f != null && p.a > 0)
        .slice(-days);

    const mapeVal = mape(pairs.map(p => p.a), pairs.map(p => p.f));
    const dirAcc = directionalAccuracy(pairs.map(p => p.a), pairs.map(p => p.f));

    return {
        module: 'bedDemand',
        pass: mapeVal != null && mapeVal <= TARGETS.mape_max,
        metrics: {
            n: pairs.length,
            mape: round(mapeVal),
            directional_accuracy: round(dirAcc),
            mean_admits: round(mean(pairs.map(p => p.a))),
        },
        targets: TARGETS,
        note: '7-day MA baseline — replace with real demand forecaster',
    };
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
