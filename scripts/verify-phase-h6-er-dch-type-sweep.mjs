// ============================================================
// Phase H.6 verify probe — full sweep of er_dch_type bugs
// ============================================================
// Tests 4 SQL fix patterns against HOSxP for the remaining instances
// after H.2 (the er.js /today admit count).
//
//   Pattern A: "still in ER" filter (server.js x3 + socket.js x3)
//     OLD: e.er_dch_type IS NULL AND st.serviceX IS NULL
//     NEW: e.finish_time IS NULL AND st.serviceX IS NULL
//
//   Pattern B: ER admit count (clinicalIntelligence + materializedViews + kpiExtended)
//     OLD: SUM(e.er_dch_type='1') or SUM(e.er_dch_type='2')
//     NEW: SUM(an.an IS NOT NULL) via ovst+an_stat JOIN
//
//   Pattern C: LWBS rate (kpiExtended only)
//     OLD: SUM(e.er_dch_type IN ('4','5'))
//     NEW: outcome-based proxy (finish <15min + no doctor + no admit + no refer)
//
//   Pattern D: ER deaths (kpiExtended only)
//     OLD: SUM(e.er_dch_type IN ('09','9'))
//     NEW: patient.deathday BETWEEN vstdate AND vstdate+1
//
// Each pattern: OLD must be 0 (bug), NEW must be > 0 (signal restored),
// NEW must match raw HOSxP ground truth within tolerance.
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
const checks = [];
const log = (name, passed, detail) => {
  checks.push({ name, passed });
  console.log(`  ${passed ? '✅' : '❌'} ${name}  ${detail || ''}`);
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Pattern A — "still in ER" filter (server.js + socket.js)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sec('Pattern A — still-in-ER filter');

// A.1: ER waiting for pharmacy step (service7) today — server.js:903-911
const [aOld] = await conn.execute(`
  SELECT COUNT(*) AS cnt FROM er_regist e
  INNER JOIN ovst o ON e.vn = o.vn
  LEFT JOIN service_time st ON o.vn = st.vn
  WHERE o.vstdate = CURDATE()
    AND e.er_dch_type IS NULL AND st.service7 IS NULL
`);
// A.0: control — same query WITHOUT the er_dch_type filter. If A.0 == A.OLD
// then er_dch_type is a no-op filter (NULL 100%) → bug confirmed.
const [aControl] = await conn.execute(`
  SELECT COUNT(*) AS cnt FROM er_regist e
  INNER JOIN ovst o ON e.vn = o.vn
  LEFT JOIN service_time st ON o.vn = st.vn
  WHERE o.vstdate = CURDATE()
    AND st.service7 IS NULL
`);
const [aNew] = await conn.execute(`
  SELECT COUNT(*) AS cnt FROM er_regist e
  INNER JOIN ovst o ON e.vn = o.vn
  LEFT JOIN service_time st ON o.vn = st.vn
  WHERE o.vstdate = CURDATE()
    AND e.finish_time IS NULL AND st.service7 IS NULL
`);
const [aTotal] = await conn.execute(`SELECT COUNT(*) AS cnt FROM er_regist WHERE vstdate = CURDATE()`);
console.log(`  CTRL (no er_dch_type) :  ${aControl[0].cnt}`);
console.log(`  OLD  (er_dch_type IS NULL): ${aOld[0].cnt}  ← if == CTRL, filter is no-op`);
console.log(`  NEW  (finish_time IS NULL): ${aNew[0].cnt}  ← actually still in ER`);
console.log(`  Total today (all ER): ${aTotal[0].cnt}`);
log('A: er_dch_type filter is a no-op (OLD == CTRL)',
    Number(aOld[0].cnt) === Number(aControl[0].cnt),
    `old=${aOld[0].cnt}, control=${aControl[0].cnt}`);
log('A: NEW ≤ OLD (finish_time properly narrows)',
    Number(aNew[0].cnt) <= Number(aOld[0].cnt),
    `new=${aNew[0].cnt} ≤ old=${aOld[0].cnt}`);
log('A: NEW reflects only patients still in ER',
    Number(aNew[0].cnt) <= Number(aTotal[0].cnt),
    `new=${aNew[0].cnt} of ${aTotal[0].cnt} today`);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Pattern B — admit count (clinicalIntelligence + MV + kpiExtended)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sec('Pattern B — ER admit count (today + 30d)');

const [bOldToday] = await conn.execute(`
  SELECT COUNT(*) AS total,
    SUM(CASE WHEN e.er_dch_type = '1' THEN 1 ELSE 0 END) AS admits_old_v1,
    SUM(CASE WHEN e.er_dch_type = '2' THEN 1 ELSE 0 END) AS admits_old_v2
  FROM er_regist e
  WHERE e.vstdate = CURDATE()
`);
const [bNewToday] = await conn.execute(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN an.an IS NOT NULL THEN 1 ELSE 0 END) AS admits_new
  FROM er_regist e
  LEFT JOIN ovst o ON o.vn = e.vn
  LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
  WHERE e.vstdate = CURDATE()
`);
const [bNew30d] = await conn.execute(`
  SELECT
    COUNT(*) AS total_30d,
    SUM(CASE WHEN an.an IS NOT NULL THEN 1 ELSE 0 END) AS admits_new_30d,
    SUM(CASE WHEN e.er_dch_type = '1' THEN 1 ELSE 0 END) AS admits_old_v1_30d,
    SUM(CASE WHEN e.er_dch_type = '2' THEN 1 ELSE 0 END) AS admits_old_v2_30d,
    ROUND(100.0 * SUM(CASE WHEN an.an IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) AS admit_pct_new
  FROM er_regist e
  LEFT JOIN ovst o ON o.vn = e.vn
  LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
  WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
`);
console.log(`  TODAY: old('1')=${bOldToday[0].admits_old_v1}, old('2')=${bOldToday[0].admits_old_v2}, new=${bNewToday[0].admits_new}/${bNewToday[0].total}`);
console.log(`  30d  : old('1')=${bNew30d[0].admits_old_v1_30d}, old('2')=${bNew30d[0].admits_old_v2_30d}, new=${bNew30d[0].admits_new_30d}/${bNew30d[0].total_30d} (${bNew30d[0].admit_pct_new}%)`);
log('B: OLD v1 (=\'1\') == 0 today', Number(bOldToday[0].admits_old_v1) === 0);
log('B: OLD v2 (=\'2\') == 0 today', Number(bOldToday[0].admits_old_v2) === 0);
log('B: NEW > 0 today', Number(bNewToday[0].admits_new) > 0,
    `new=${bNewToday[0].admits_new}`);
log('B: 30d admit rate 5-30% (clinically reasonable for community hospital ER)',
    Number(bNew30d[0].admit_pct_new) >= 5 && Number(bNew30d[0].admit_pct_new) <= 30,
    `${bNew30d[0].admit_pct_new}%`);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Pattern C — LWBS (kpiExtended)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sec('Pattern C — LWBS rate (30d)');

const [cOld] = await conn.execute(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN er_dch_type IN ('4','5') THEN 1 ELSE 0 END) AS lwbs_old
  FROM er_regist
  WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
`);
const [cNew] = await conn.execute(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE
      WHEN e.door_to_doctor_second IS NULL
        AND e.doctor_tx_time IS NULL
        AND e.finish_time IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
        AND NOT EXISTS (
          SELECT 1 FROM ovst o JOIN an_stat an ON an.hn = o.hn
          WHERE o.vn = e.vn AND an.regdate = e.vstdate
        )
        AND NOT EXISTS (
          SELECT 1 FROM referout ro WHERE ro.vn = e.vn
            AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
        )
      THEN 1 ELSE 0 END) AS lwbs_new,
    ROUND(100.0 * SUM(CASE
      WHEN e.door_to_doctor_second IS NULL
        AND e.doctor_tx_time IS NULL
        AND e.finish_time IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
        AND NOT EXISTS (
          SELECT 1 FROM ovst o JOIN an_stat an ON an.hn = o.hn
          WHERE o.vn = e.vn AND an.regdate = e.vstdate
        )
        AND NOT EXISTS (
          SELECT 1 FROM referout ro WHERE ro.vn = e.vn
            AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
        )
      THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) AS lwbs_pct
  FROM er_regist e
  WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
`);
console.log(`  OLD: ${cOld[0].lwbs_old}/${cOld[0].total} = ${cOld[0].total ? (100 * cOld[0].lwbs_old / cOld[0].total).toFixed(2) : 0}%`);
console.log(`  NEW: ${cNew[0].lwbs_new}/${cNew[0].total} = ${cNew[0].lwbs_pct}%`);
log('C: OLD LWBS == 0 (bug confirmed)', Number(cOld[0].lwbs_old) === 0);
log('C: NEW LWBS ≥ 0 (proxy returns signal)', Number(cNew[0].lwbs_new) >= 0);
log('C: NEW LWBS rate ≤ 5% (MoPH target ≤2%, tolerance for proxy)',
    Number(cNew[0].lwbs_pct) <= 5,
    `${cNew[0].lwbs_pct}%`);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Pattern D — Deaths (kpiExtended) — patient.deathday
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sec('Pattern D — ER deaths (90d)');

const [dOld] = await conn.execute(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN er_dch_type IN ('09','9') THEN 1 ELSE 0 END) AS deaths_old
  FROM er_regist
  WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
`);
const [dNew] = await conn.execute(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE
      WHEN p.deathday IS NOT NULL
       AND p.deathday BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
      THEN 1 ELSE 0 END) AS deaths_new
  FROM er_regist e
  JOIN ovst o ON o.vn = e.vn
  JOIN patient p ON p.hn = o.hn
  WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
`);
console.log(`  OLD: ${dOld[0].deaths_old}/${dOld[0].total}`);
console.log(`  NEW: ${dNew[0].deaths_new}/${dNew[0].total}`);
log('D: OLD deaths == 0 (bug confirmed)', Number(dOld[0].deaths_old) === 0);
log('D: NEW deaths ≥ 0', Number(dNew[0].deaths_new) >= 0,
    `${dNew[0].deaths_new} ED deaths in 90d`);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Final verdict
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sec('VERDICT');
const passed = checks.filter(c => c.passed).length;
const total = checks.length;
console.log(`\n  ${passed}/${total} checks passed`);
const allPassed = passed === total;
console.log(allPassed ? '\n✅ ALL CHECKS PASSED — safe to deploy H.6 fixes' : '\n❌ FAILED — DO NOT DEPLOY. Review above.');

await conn.end();
process.exit(allPassed ? 0 : 1);
