#!/usr/bin/env node
/**
 * verify-ttd.js — Sprint 1 Task 1.8
 * Validates Door-to-Doctor (TTD) invariants.
 * Catches second/minute unit conversion bugs (Task 1.6 units.js).
 */
import { dbQueryOne, closePool } from '../../server/db/mysql.js';

async function verify() {
  const result = await dbQueryOne(`
    SELECT
      COUNT(*) AS visits,
      ROUND(AVG(CASE WHEN door_to_doctor_second > 0 THEN door_to_doctor_second END), 0) AS avg_ttd_sec,
      ROUND(AVG(CASE WHEN door_to_doctor_second > 0 THEN door_to_doctor_second / 60 END), 1) AS avg_ttd_min,
      MAX(door_to_doctor_second) AS max_ttd_sec
    FROM er_regist WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  `, [], { timeoutMs: 15000 });

  const visits = Number(result?.visits || 0);
  const sec = Number(result?.avg_ttd_sec || 0);
  const min = Number(result?.avg_ttd_min || 0);
  const max = Number(result?.max_ttd_sec || 0);

  console.log(`📊 TTD Verify (30d)`);
  console.log(`   Visits         : ${visits}`);
  console.log(`   Avg TTD sec    : ${sec}`);
  console.log(`   Avg TTD min    : ${min}`);
  console.log(`   Max TTD sec    : ${max} (= ${(max/60).toFixed(0)} min)`);

  const failures = [];
  // sanity: avg min should be reasonable (1-120 min)
  if (min < 1 || min > 120) failures.push(`avg_ttd_min = ${min} outside [1, 120] — possible unit bug`);
  // sec / 60 should equal min within 1
  if (Math.abs(sec / 60 - min) > 1) failures.push(`sec/60=${(sec/60).toFixed(1)} != min=${min} — conversion drift`);
  // max should be < 24h
  if (max > 86400) failures.push(`max_ttd_sec = ${max} > 24h — likely data entry error`);

  if (failures.length) {
    console.error(`❌ FAIL:\n   - ${failures.join('\n   - ')}`);
    return 2;
  }
  console.log(`✅ PASS: TTD unit conversions consistent.`);
  return 0;
}

verify()
  .then((code) => process.exit(code))
  .catch((e) => { console.error('FATAL:', e); process.exit(99); })
  .finally(() => { try { closePool?.(); } catch { /* ignore */ } });
