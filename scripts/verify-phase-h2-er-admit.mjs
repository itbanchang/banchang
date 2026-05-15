// ============================================================
// Phase H.2 verify probe — ER admission count (er_dch_type bug)
// ============================================================
// Validates that the new outcome-based admission counting produces
// non-zero values that match raw HOSxP an_stat data.
//
// Tests 3 SQL variants:
//   OLD: SUM(CASE WHEN e.er_dch_type = '2' THEN 1 ELSE 0 END)
//        → 0 always at BCH (er_dch_type NULL 100%)
//   NEW: outcome-based via ovst + an_stat JOIN
//        → real admit count
//   RAW: direct an_stat lookup for ER cohort today
//        → ground truth
//
// Acceptance:
//   - NEW > 0 (proves bug fix produces real signal)
//   - |NEW - RAW| <= 2 (small tolerance for cohort boundary)
//   - OLD == 0 (proves the bug exists right now)
// ============================================================
import mysql from 'mysql2/promise';
import 'dotenv/config';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  charset: 'utf8mb4',
});

const sec = (s) => console.log(`\n━━━ ${s} ━━━`);

// 1) OLD SQL — what's currently in production
sec('1) OLD SQL (production right now)');
const [oldRows] = await conn.execute(`
  SELECT COUNT(*) AS total,
    SUM(CASE WHEN e.er_dch_type = '2' THEN 1 ELSE 0 END) AS admitted_old,
    SUM(CASE WHEN e.er_dch_type IS NULL THEN 1 ELSE 0 END) AS null_count,
    SUM(CASE WHEN e.er_dch_type IS NOT NULL THEN 1 ELSE 0 END) AS notnull_count
  FROM er_regist e
  WHERE e.vstdate = CURDATE()
`);
console.log(oldRows[0]);
const old = oldRows[0];

// 2) NEW SQL — outcome-based (matches Phase A pattern at er.js:248-267)
sec('2) NEW SQL (outcome-based — proposed fix)');
const [newRows] = await conn.execute(`
  SELECT COUNT(*) AS total,
    SUM(CASE WHEN an.an IS NOT NULL THEN 1 ELSE 0 END) AS admitted_new,
    SUM(CASE WHEN ro.referout_id IS NOT NULL THEN 1 ELSE 0 END) AS refer_out,
    SUM(CASE WHEN an.an IS NULL AND ro.referout_id IS NULL THEN 1 ELSE 0 END) AS discharge
  FROM er_regist e
  LEFT JOIN ovst o ON o.vn = e.vn
  LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
  LEFT JOIN referout ro ON ro.vn = e.vn
    AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
  WHERE e.vstdate = CURDATE()
`);
console.log(newRows[0]);
const _new = newRows[0];

// 3) RAW HOSxP — direct an_stat lookup for today's ER cohort
sec('3) RAW HOSxP (ground truth via an_stat)');
const [rawRows] = await conn.execute(`
  SELECT COUNT(DISTINCT an.an) AS admitted_raw
  FROM er_regist e
  JOIN ovst o ON o.vn = e.vn
  JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
  WHERE e.vstdate = CURDATE()
`);
console.log(rawRows[0]);
const raw = rawRows[0];

// 4) Trend — 30-day to confirm pattern is consistent
sec('4) 30-day trend (sanity check — non-zero proportion)');
const [trendRows] = await conn.execute(`
  SELECT
    COUNT(*) AS visits_30d,
    SUM(CASE WHEN e.er_dch_type = '2' THEN 1 ELSE 0 END) AS old_admits_30d,
    SUM(CASE WHEN an.an IS NOT NULL THEN 1 ELSE 0 END) AS new_admits_30d,
    ROUND(100.0 * SUM(CASE WHEN an.an IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) AS admit_pct_new
  FROM er_regist e
  LEFT JOIN ovst o ON o.vn = e.vn
  LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
  WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
`);
console.log(trendRows[0]);
const trend = trendRows[0];

// 5) Verdict
sec('VERDICT');
const oldZero = Number(old.admitted_old) === 0;
const newPositive = Number(_new.admitted_new) > 0;
const matchesRaw = Math.abs(Number(_new.admitted_new) - Number(raw.admitted_raw)) <= 2;
const nullConfirmed = Number(old.null_count) === Number(old.total);
const trendOk = Number(trend.new_admits_30d) > 0 && Number(trend.old_admits_30d) === 0;

console.log('');
console.log(`  ✓ OLD == 0 (bug confirmed)            : ${oldZero ? '✅' : '❌'}  (old=${old.admitted_old})`);
console.log(`  ✓ er_dch_type NULL 100% confirmed     : ${nullConfirmed ? '✅' : '❌'}  (null=${old.null_count}/${old.total})`);
console.log(`  ✓ NEW > 0 (fix produces signal)       : ${newPositive ? '✅' : '❌'}  (new=${_new.admitted_new})`);
console.log(`  ✓ NEW matches RAW within ±2           : ${matchesRaw ? '✅' : '❌'}  (new=${_new.admitted_new} raw=${raw.admitted_raw})`);
console.log(`  ✓ 30-day trend: NEW>0 + OLD==0        : ${trendOk ? '✅' : '❌'}  (30d new=${trend.new_admits_30d}, old=${trend.old_admits_30d}, pct=${trend.admit_pct_new}%)`);

const allPassed = oldZero && nullConfirmed && newPositive && matchesRaw && trendOk;
console.log('');
console.log(allPassed ? '✅ ALL CHECKS PASSED — safe to deploy H.2 fix' : '❌ FAILED — DO NOT DEPLOY. Investigate above.');

await conn.end();
process.exit(allPassed ? 0 : 1);
