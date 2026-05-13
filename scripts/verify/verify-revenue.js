#!/usr/bin/env node
/**
 * verify-revenue.js — Sprint 1 Task 1.8
 * Validates Revenue: Billed vs Collected invariants.
 *
 * Invariants:
 *   - collected ≤ billed (cannot collect more than billed)
 *   - 0 ≤ collection_rate ≤ 100
 *   - billed > 0 if visits > 0
 */
import { dbQueryOne, closePool } from '../../server/db/mysql.js';

async function verify() {
  const result = await dbQueryOne(`
    SELECT
      COUNT(*) AS rows_,
      SUM(income) AS billed,
      SUM(paid_money) AS collected,
      ROUND(SUM(paid_money) / NULLIF(SUM(income), 0) * 100, 1) AS collection_rate
    FROM vn_stat WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND income > 0
  `, [], { timeoutMs: 15000 });

  const rows = Number(result?.rows_ || 0);
  const billed = Number(result?.billed || 0);
  const collected = Number(result?.collected || 0);
  const rate = Number(result?.collection_rate || 0);

  console.log(`📊 Revenue Verify (30d)`);
  console.log(`   Rows in vn_stat  : ${rows}`);
  console.log(`   Billed (income)  : ${billed.toLocaleString()} บาท`);
  console.log(`   Collected        : ${collected.toLocaleString()} บาท`);
  console.log(`   Outstanding      : ${(billed - collected).toLocaleString()} บาท`);
  console.log(`   Collection Rate  : ${rate}%`);

  const failures = [];
  if (collected > billed) failures.push(`collected (${collected}) > billed (${billed}) — impossible`);
  if (rate < 0 || rate > 100) failures.push(`collection_rate ${rate}% outside [0, 100]`);
  if (rows > 100 && billed === 0) failures.push(`${rows} vn_stat rows but billed = 0 — schema issue?`);

  if (failures.length) {
    console.error(`❌ FAIL:\n   - ${failures.join('\n   - ')}`);
    return 2;
  }
  console.log(`✅ PASS: revenue invariants hold.`);
  return 0;
}

verify()
  .then((code) => process.exit(code))
  .catch((e) => { console.error('FATAL:', e); process.exit(99); })
  .finally(() => { try { closePool?.(); } catch { /* ignore */ } });
