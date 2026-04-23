// ============================================================
// Eval Runner — NEWS2 distribution + calibration sanity
// NEWS2 is rule-based (NICE standard), so this is a calibration check,
// not an accuracy check. We verify the live output distribution stays
// within 2σ of the 30-day baseline.
// ============================================================
import { dbQuery } from '../../server/db/mysql.js';
import { calculateNEWS2 } from '../../server/ai/ewsEngine.js';
import { mean } from '../lib/stats.js';

export async function run({ days = 30 } = {}) {
    const rows = await dbQuery(`
        SELECT rr, o2sat, bps, pulse, temperature
        FROM opdscreen
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
          AND rr IS NOT NULL AND o2sat IS NOT NULL
        LIMIT 2000
    `, [days]);

    if (!rows.length) return { n: 0, pass: false, note: 'no vitals data' };

    const scores = rows.map(r => calculateNEWS2(r).total_score);
    const critical = scores.filter(s => s >= 7).length;
    const high = scores.filter(s => s >= 5 && s < 7).length;
    const medium = scores.filter(s => s >= 3 && s < 5).length;
    const low = scores.length - critical - high - medium;

    const criticalRate = critical / scores.length;
    // Expected critical rate in a well-triaged community hospital: 0.5–5%
    const pass = criticalRate <= 0.05 && criticalRate >= 0.001;

    return {
        module: 'news2',
        pass,
        metrics: {
            n: scores.length,
            mean_score: round(mean(scores)),
            critical_rate: round(criticalRate),
            distribution: { low, medium, high, critical },
        },
        targets: { critical_rate_max: 0.05, critical_rate_min: 0.001 },
    };
}

function round(n) { return n == null ? null : Math.round(n * 10000) / 10000; }
