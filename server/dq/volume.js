// ============================================================
// DQ Volume — z-score anomaly vs 30-day same-day-of-week baseline
// ============================================================
import { dbQuery } from '../db/mysql.js';

const CHECKS = [
    { id: 'opd_today',    sql_today: `SELECT COUNT(*) AS n FROM ovst WHERE vstdate = CURDATE()`,
      sql_base:  `SELECT DATE(vstdate) AS d, COUNT(*) AS n FROM ovst
                  WHERE vstdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 60 DAY) AND DATE_SUB(CURDATE(), INTERVAL 1 DAY)
                    AND DAYOFWEEK(vstdate) = DAYOFWEEK(CURDATE())
                  GROUP BY DATE(vstdate)` },
    { id: 'ipt_today',    sql_today: `SELECT COUNT(*) AS n FROM ipt WHERE regdate = CURDATE()`,
      sql_base:  `SELECT DATE(regdate) AS d, COUNT(*) AS n FROM ipt
                  WHERE regdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 60 DAY) AND DATE_SUB(CURDATE(), INTERVAL 1 DAY)
                    AND DAYOFWEEK(regdate) = DAYOFWEEK(CURDATE())
                  GROUP BY DATE(regdate)` },
    { id: 'er_today',     sql_today: `SELECT COUNT(*) AS n FROM er_regist WHERE DATE(register_time) = CURDATE()`,
      sql_base:  `SELECT DATE(register_time) AS d, COUNT(*) AS n FROM er_regist
                  WHERE register_time BETWEEN DATE_SUB(CURDATE(), INTERVAL 60 DAY) AND DATE_SUB(CURDATE(), INTERVAL 1 DAY)
                    AND DAYOFWEEK(register_time) = DAYOFWEEK(CURDATE())
                  GROUP BY DATE(register_time)` },
];

function stats(arr) {
    if (!arr.length) return { mean: 0, std: 1 };
    const mean = arr.reduce((s, x) => s + x, 0) / arr.length;
    const variance = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / arr.length;
    return { mean, std: Math.max(Math.sqrt(variance), 1) };
}

export async function checkVolumes() {
    return Promise.all(CHECKS.map(async c => {
        try {
            const [today] = await dbQuery(c.sql_today);
            const baseline = await dbQuery(c.sql_base);
            const values = baseline.map(r => Number(r.n));
            const { mean, std } = stats(values);
            const todayN = Number(today?.n || 0);
            const z = (todayN - mean) / std;
            const absZ = Math.abs(z);
            const severity = absZ > 4 ? 'danger' : absZ > 2.5 ? 'warning' : 'ok';
            return {
                check: `volume.${c.id}`,
                pass: severity === 'ok',
                severity,
                today: todayN,
                baseline_mean: Math.round(mean),
                baseline_std: Math.round(std * 10) / 10,
                z_score: Math.round(z * 100) / 100,
                samples: values.length,
            };
        } catch (err) {
            return { check: `volume.${c.id}`, pass: false, severity: 'warning', error: err.message };
        }
    }));
}
