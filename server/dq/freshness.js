// ============================================================
// DQ Freshness — how old is the newest row in each table?
// ============================================================
import { dbQuery } from '../db/mysql.js';

// Targets confirmed against bchhosxpxe schema 2026-04-23.
// See docs/data-dictionary/core-tables.md for column layouts.
const TARGETS = [
    { source: 'ovst',         sql: `SELECT MAX(CONCAT(vstdate, ' ', vsttime)) AS latest FROM ovst`,                               targetMin: 15 },
    { source: 'ipt',          sql: `SELECT MAX(regdate) AS latest FROM ipt`,                                                       targetMin: 60 },
    { source: 'er_regist',    sql: `SELECT MAX(register_time) AS latest FROM er_regist`,                                           targetMin: 5 },
    { source: 'opdscreen',    sql: `SELECT MAX(CONCAT(vstdate, ' ', COALESCE(entry_time, '00:00'))) AS latest FROM opdscreen`,      targetMin: 15 },
    { source: 'opitemrece',   sql: `SELECT MAX(CONCAT(vstdate, ' ', rxtime)) AS latest FROM opitemrece`,                            targetMin: 60 },
    // Stage-wise OPD wait times (was wrongly called 'opd_service' in the skill):
    { source: 'service_time', sql: `SELECT MAX(CONCAT(vstdate, ' ', COALESCE(service7, service2, service1, '00:00'))) AS latest FROM service_time`, targetMin: 30 },
    // Pharmacy dispensing (was wrongly called 'drug_receive' in the skill):
    { source: 'opi_dispense', sql: `SELECT MAX(modify_datetime) AS latest FROM opi_dispense`,                                      targetMin: 60 },
];

export async function checkFreshness() {
    const now = Date.now();
    const out = await Promise.all(TARGETS.map(async t => {
        try {
            const [row] = await dbQuery(t.sql);
            if (!row?.latest) {
                return { check: `freshness.${t.source}`, source: t.source, pass: false, severity: 'warning', reason: 'no rows' };
            }
            const latest = new Date(row.latest).getTime();
            const ageMinutes = Math.round((now - latest) / 60_000);
            const pass = ageMinutes <= t.targetMin;
            return {
                check: `freshness.${t.source}`,
                source: t.source,
                pass,
                severity: pass ? 'ok' : (ageMinutes > t.targetMin * 3 ? 'danger' : 'warning'),
                age_minutes: ageMinutes,
                target_minutes: t.targetMin,
                latest: row.latest,
            };
        } catch (err) {
            return { check: `freshness.${t.source}`, source: t.source, pass: false, severity: 'danger', error: err.message };
        }
    }));
    return out;
}
