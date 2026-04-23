// ============================================================
// DQ Invariants — relational consistency checks
// ============================================================
import { dbQuery } from '../db/mysql.js';

const INVARIANTS = [
    {
        id: 'opitemrece_orphan',
        desc: 'Every opitemrece row should have a matching ovst.vn',
        sql: `SELECT COUNT(*) AS cnt
              FROM opitemrece o
              LEFT JOIN ovst v ON o.vn = v.vn
              WHERE o.vn IS NOT NULL AND v.vn IS NULL
                AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`,
        threshold: { max: 0 },
    },
    {
        id: 'ipt_discharge_before_admit',
        desc: 'dchdate cannot be before regdate',
        sql: `SELECT COUNT(*) AS cnt FROM ipt
              WHERE dchdate IS NOT NULL AND dchdate < regdate
                AND regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`,
        threshold: { max: 0 },
    },
    {
        id: 'ovst_pdx_null_rate',
        desc: 'Primary diagnosis should be filled on > 95% of completed visits',
        sql: `SELECT SUM(CASE WHEN pdx IS NULL OR pdx = '' THEN 1 ELSE 0 END) AS cnt,
                     COUNT(*) AS total
              FROM ovst
              WHERE vstdate = CURDATE()
                AND (ovstost IS NULL OR ovstost NOT IN ('00','98'))`,
        threshold: { maxRate: 0.05 },
    },
];

export async function checkInvariants() {
    return Promise.all(INVARIANTS.map(async inv => {
        try {
            const [row] = await dbQuery(inv.sql);
            const cnt = Number(row?.cnt || 0);
            const total = Number(row?.total || 0);
            let pass, detail;
            if (inv.threshold.max != null) {
                pass = cnt <= inv.threshold.max;
                detail = { violations: cnt };
            } else if (inv.threshold.maxRate != null) {
                const rate = total > 0 ? cnt / total : 0;
                pass = rate <= inv.threshold.maxRate;
                detail = { rate, violations: cnt, total, max_rate: inv.threshold.maxRate };
            }
            return {
                check: `invariant.${inv.id}`,
                desc: inv.desc,
                pass,
                severity: pass ? 'ok' : 'warning',
                ...detail,
            };
        } catch (err) {
            return { check: `invariant.${inv.id}`, pass: false, severity: 'warning', error: err.message };
        }
    }));
}
