#!/usr/bin/env node
/**
 * verify-mortality.js — Sprint 1 Task 1.8
 * Validates ED Mortality dual metric (ED-only vs 24h) and IPD Mortality with palliative exclusion.
 *
 * Run: node scripts/verify/verify-mortality.js
 *
 * Expected:
 *   - ED ed_only_rate_pct ≤ 24h rate_pct (strict subset)
 *   - IPD mortality_unexpected_pct ≤ mortality_pct (excludes Z51.5)
 *   - Both ≤ 5% (sanity ceiling for BCH F2)
 */
import { dbQueryOne, closePool } from '../../server/db/mysql.js';

async function verify() {
  const [erMort, ipdMort] = await Promise.all([
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT e.vn) AS total,
        SUM(CASE WHEN p.deathday = e.vstdate THEN 1 ELSE 0 END) AS same_day,
        SUM(CASE WHEN p.deathday BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS within_24h
      FROM er_regist e JOIN ovst o ON o.vn = e.vn JOIN patient p ON p.hn = o.hn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
    `, [], { timeoutMs: 30000 }),
    dbQueryOne(`
      SELECT
        COUNT(*) AS discharges,
        SUM(CASE WHEN ipt.dchtype IN ('09','9') THEN 1 ELSE 0 END) AS deaths_all,
        SUM(CASE
          WHEN ipt.dchtype IN ('09','9')
           AND NOT EXISTS (SELECT 1 FROM ipt_diag d WHERE d.an = ipt.an AND (d.icd10 LIKE 'Z51.5%' OR d.icd10 = 'Z515'))
          THEN 1 ELSE 0 END) AS deaths_unexpected
      FROM ipt WHERE ipt.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND ipt.dchdate IS NOT NULL AND ipt.ward != '06'
    `, [], { timeoutMs: 30000 }),
  ]);

  const erTotal = Number(erMort?.total || 0);
  const erSameDay = Number(erMort?.same_day || 0);
  const er24h = Number(erMort?.within_24h || 0);
  const erEdOnlyPct = erTotal > 0 ? +(erSameDay / erTotal * 100).toFixed(2) : 0;
  const er24hPct = erTotal > 0 ? +(er24h / erTotal * 100).toFixed(2) : 0;

  const ipdTotal = Number(ipdMort?.discharges || 0);
  const ipdAll = Number(ipdMort?.deaths_all || 0);
  const ipdUnexp = Number(ipdMort?.deaths_unexpected || 0);
  const ipdAllPct = ipdTotal > 0 ? +(ipdAll / ipdTotal * 100).toFixed(2) : 0;
  const ipdUnexpPct = ipdTotal > 0 ? +(ipdUnexp / ipdTotal * 100).toFixed(2) : 0;

  console.log(`📊 ED Mortality (90d window)`);
  console.log(`   Total ER visits  : ${erTotal}`);
  console.log(`   ตายใน ED         : ${erSameDay} (${erEdOnlyPct}%)`);
  console.log(`   ตายใน 24h        : ${er24h} (${er24hPct}%)`);
  console.log(`📊 IPD Mortality (30d window)`);
  console.log(`   Total discharges : ${ipdTotal}`);
  console.log(`   เสียชีวิต (รวม)   : ${ipdAll} (${ipdAllPct}%)`);
  console.log(`   ไม่นับ Palliative: ${ipdUnexp} (${ipdUnexpPct}%)`);

  const failures = [];
  if (erEdOnlyPct > er24hPct) failures.push(`ED-only (${erEdOnlyPct}%) > 24h (${er24hPct}%) — invariant broken`);
  if (ipdUnexpPct > ipdAllPct) failures.push(`IPD unexpected (${ipdUnexpPct}%) > all (${ipdAllPct}%) — invariant broken`);
  if (er24hPct > 5) failures.push(`ED 24h mortality ${er24hPct}% > 5% sanity ceiling`);
  if (ipdAllPct > 5) failures.push(`IPD mortality ${ipdAllPct}% > 5% sanity ceiling`);

  if (failures.length) {
    console.error(`❌ FAIL:\n   - ${failures.join('\n   - ')}`);
    return 2;
  }
  console.log(`✅ PASS: all mortality invariants hold.`);
  return 0;
}

verify()
  .then((code) => process.exit(code))
  .catch((e) => { console.error('FATAL:', e); process.exit(99); })
  .finally(() => { try { closePool?.(); } catch { /* ignore */ } });
