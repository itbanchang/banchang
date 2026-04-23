// ============================================================
// Eval Runner — Revenue Forecast (Holt-Winters walk-forward)
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { mape, directionalAccuracy, mean } from '../lib/stats.js';

const TARGETS = { mape_max: 0.10, ci_coverage_min: 0.90, ci_coverage_max: 0.98 };

export async function run({ lookbackMonths = 6 } = {}) {
    // Walk-forward: compare actual monthly revenue to what the forecast
    // WOULD have produced using only prior months.
    const rows = await dbQuery(`
        SELECT DATE_FORMAT(vstdate, '%Y-%m') AS month,
               COALESCE(SUM(income), 0) AS revenue
        FROM vn_stat
        WHERE vstdate >= DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL ? MONTH)
          AND vstdate < DATE_FORMAT(CURDATE(), '%Y-%m-01')
        GROUP BY DATE_FORMAT(vstdate, '%Y-%m')
        ORDER BY month
    `, [lookbackMonths + 12]);  // +12 so forecaster has seasonal context

    if (rows.length < 12) {
        return { n: rows.length, pass: false, note: 'need ≥ 12 months for walk-forward' };
    }

    const actuals = rows.map(r => Number(r.revenue));
    // Simple naive forecast: same month prior year. Replace with real Holt-Winters
    // once server/ai/forecastEngine.js exports a walk-forward API.
    const forecasts = actuals.map((_, i) => i >= 12 ? actuals[i - 12] : null);

    const pairs = actuals
        .map((a, i) => ({ a, f: forecasts[i] }))
        .filter(p => p.f != null)
        .slice(-lookbackMonths);

    const mapeVal = mape(pairs.map(p => p.a), pairs.map(p => p.f));
    const dirAcc = directionalAccuracy(pairs.map(p => p.a), pairs.map(p => p.f));

    return {
        module: 'revenueForecast',
        pass: mapeVal != null && mapeVal <= TARGETS.mape_max,
        metrics: {
            n: pairs.length,
            mape: round(mapeVal),
            directional_accuracy: round(dirAcc),
            avg_actual: round(mean(pairs.map(p => p.a))),
            avg_forecast: round(mean(pairs.map(p => p.f))),
        },
        targets: TARGETS,
        note: 'naive YoY forecast — replace with forecastEngine.js walk-forward',
    };
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
