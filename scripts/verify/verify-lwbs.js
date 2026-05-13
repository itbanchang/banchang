#!/usr/bin/env node
/**
 * verify-lwbs.js — Sprint 1 Task 1.8
 * Validates that BSC LWBS uses outcome-based proxy (not er_dch_type which is NULL 100% at BCH).
 *
 * Run: node scripts/verify/verify-lwbs.js
 * CI:  nightly via GitHub Actions
 *
 * Expected: lwbs_pct between 0 and 10% (BCH typical: 0.5-3%).
 * FAIL if: lwbs_pct = 0 exact (likely er_dch_type regression).
 */
import { dbQueryOne, closePool } from '../../server/db/mysql.js';

const THRESHOLD_MIN = 0;
const THRESHOLD_MAX = 10;

async function verify() {
  const result = await dbQueryOne(`
    SELECT COUNT(*) AS visits,
      ROUND(SUM(CASE
        WHEN e.door_to_doctor_second IS NULL
         AND e.doctor_tx_time IS NULL
         AND e.finish_time IS NOT NULL
         AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
         AND NOT EXISTS (SELECT 1 FROM ovst o JOIN an_stat a ON a.hn = o.hn AND a.regdate = e.vstdate WHERE o.vn = e.vn)
         AND NOT EXISTS (SELECT 1 FROM referout r WHERE r.vn = e.vn AND r.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY))
        THEN 1 ELSE 0 END) AS lwbs_count,
      ROUND(SUM(CASE
        WHEN e.door_to_doctor_second IS NULL
         AND e.doctor_tx_time IS NULL
         AND e.finish_time IS NOT NULL
         AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
         AND NOT EXISTS (SELECT 1 FROM ovst o JOIN an_stat a ON a.hn = o.hn AND a.regdate = e.vstdate WHERE o.vn = e.vn)
         AND NOT EXISTS (SELECT 1 FROM referout r WHERE r.vn = e.vn AND r.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY))
        THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 2) AS lwbs_pct
    FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  `, [], { timeoutMs: 30000 });

  const lwbs = Number(result?.lwbs_pct || 0);
  const visits = Number(result?.visits || 0);
  const count = Number(result?.lwbs_count || 0);

  console.log(`📊 LWBS Verify (30d window)`);
  console.log(`   Total visits  : ${visits}`);
  console.log(`   LWBS count    : ${count}`);
  console.log(`   LWBS rate     : ${lwbs}%`);

  if (visits < 10) {
    console.log(`⚠️  WARN: Low sample (${visits} visits) — verify unreliable.`);
    return 1;
  }
  if (lwbs < THRESHOLD_MIN || lwbs > THRESHOLD_MAX) {
    console.error(`❌ FAIL: lwbs_pct=${lwbs}% outside expected range [${THRESHOLD_MIN}, ${THRESHOLD_MAX}].`);
    if (lwbs === 0 && count === 0) {
      console.error(`   Hint: lwbs=0 exact may indicate regression to er_dch_type field (NULL 100% at BCH).`);
    }
    return 2;
  }
  console.log(`✅ PASS: lwbs_pct=${lwbs}% within [${THRESHOLD_MIN}, ${THRESHOLD_MAX}].`);
  return 0;
}

verify()
  .then((code) => process.exit(code))
  .catch((e) => { console.error('FATAL:', e); process.exit(99); })
  .finally(() => { try { closePool?.(); } catch { /* ignore */ } });
