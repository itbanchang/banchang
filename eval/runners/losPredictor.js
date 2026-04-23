// ============================================================
// Eval Runner — LOS Predictor (days; MAE + MAPE)
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { mape, mean } from '../lib/stats.js';

const TARGETS = { mae_max_days: 1.5, mape_max: 0.25 };

export async function run({ days = 90 } = {}) {
    const admits = await dbQuery(`
        SELECT regdate, dchdate, ward, adjrw
        FROM ipt
        WHERE dchdate IS NOT NULL
          AND dchdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
          AND ward != '06'
        LIMIT 1000
    `, [days]);

    if (!admits.length) return { n: 0, pass: false, note: 'no admits in window' };

    // Heuristic forecast: LOS = 3 + 2*adjrw (replace with real predictor)
    const preds = admits.map(a => ({
        predicted: 3 + 2 * Number(a.adjrw || 0),
        actual: Math.max(0, Math.round((new Date(a.dchdate) - new Date(a.regdate)) / 86_400_000)),
    })).filter(p => p.actual > 0);

    const abs = preds.map(p => Math.abs(p.predicted - p.actual));
    const mae = mean(abs);
    const mapeVal = mape(preds.map(p => p.actual), preds.map(p => p.predicted));

    return {
        module: 'losPredictor',
        pass: mae <= TARGETS.mae_max_days && mapeVal != null && mapeVal <= TARGETS.mape_max,
        metrics: {
            n: preds.length,
            mae_days: round(mae),
            mape: round(mapeVal),
            mean_actual: round(mean(preds.map(p => p.actual))),
            mean_predicted: round(mean(preds.map(p => p.predicted))),
        },
        targets: TARGETS,
        note: 'heuristic `3 + 2*adjrw` — replace with server/ai/losPredictor',
    };
}

function round(n) { return n == null ? null : Math.round(n * 100) / 100; }
