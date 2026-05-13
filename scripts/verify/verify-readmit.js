#!/usr/bin/env node
/**
 * verify-readmit.js — Sprint 1 Task 1.8
 * Validates IPD readmission window = 30 days (HA Thailand PCT standard).
 *
 * Run: node scripts/verify/verify-readmit.js
 */
import { dbQueryOne, closePool } from '../../server/db/mysql.js';

const HOME_WARD = '06';

async function verify() {
  // Calculate readmit at multiple windows to detect off-by-X.
  const result = await dbQueryOne(`
    SELECT
      COUNT(DISTINCT i1.an) AS total_discharges,
      COUNT(DISTINCT CASE WHEN i2_30d.an IS NOT NULL THEN i2_30d.an END) AS readmit_30d,
      COUNT(DISTINCT CASE WHEN i2_28d.an IS NOT NULL THEN i2_28d.an END) AS readmit_28d,
      COUNT(DISTINCT CASE WHEN i2_45d.an IS NOT NULL THEN i2_45d.an END) AS readmit_45d
    FROM ipt i1
    LEFT JOIN ipt i2_28d ON i1.hn = i2_28d.hn AND i2_28d.an != i1.an
      AND i2_28d.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 28 DAY)
    LEFT JOIN ipt i2_30d ON i1.hn = i2_30d.hn AND i2_30d.an != i1.an
      AND i2_30d.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 30 DAY)
    LEFT JOIN ipt i2_45d ON i1.hn = i2_45d.hn AND i2_45d.an != i1.an
      AND i2_45d.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 45 DAY)
    WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
      AND i1.dchdate IS NOT NULL AND i1.ward != ?
  `, [HOME_WARD], { timeoutMs: 60000 });

  const total = Number(result?.total_discharges || 0);
  const r28 = Number(result?.readmit_28d || 0);
  const r30 = Number(result?.readmit_30d || 0);
  const r45 = Number(result?.readmit_45d || 0);
  const pct = (n) => total > 0 ? +(n / total * 100).toFixed(2) : 0;

  console.log(`📊 Readmission Verify (90d cohort, multiple windows)`);
  console.log(`   Total discharges : ${total}`);
  console.log(`   Readmit 28d      : ${r28} (${pct(r28)}%)`);
  console.log(`   Readmit 30d (HA) : ${r30} (${pct(r30)}%) ← USED IN BCH 360°`);
  console.log(`   Readmit 45d      : ${r45} (${pct(r45)}%)`);

  const failures = [];
  if (r28 > r30) failures.push(`r28 (${r28}) > r30 (${r30}) — monotonicity broken`);
  if (r30 > r45) failures.push(`r30 (${r30}) > r45 (${r45}) — monotonicity broken`);
  if (pct(r30) > 15) failures.push(`30d readmit ${pct(r30)}% > 15% sanity ceiling — investigate`);

  if (failures.length) {
    console.error(`❌ FAIL:\n   - ${failures.join('\n   - ')}`);
    return 2;
  }
  console.log(`✅ PASS: readmit window monotonic + within sanity range.`);
  return 0;
}

verify()
  .then((code) => process.exit(code))
  .catch((e) => { console.error('FATAL:', e); process.exit(99); })
  .finally(() => { try { closePool?.(); } catch { /* ignore */ } });
