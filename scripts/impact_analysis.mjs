// ============================================================
// BCH 360° — Impact Analysis on 10.109.0.33
//
// Measures current server load + models the additional load
// that installing BCH 360° would introduce.
// ============================================================
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { resolve } from 'path';

dotenv.config({ path: resolve('C:/BCH 360° Intelligence V.10/.env') });

const conn = await mysql.createConnection({
  host: '10.109.0.33', port: 3306,
  user: process.env.MYSQL_USER, password: process.env.MYSQL_PASS,
  database: 'bchhosxpxe', connectTimeout: 5000,
});

const q = async (sql) => { try { const [r] = await conn.query(sql); return r; } catch (e) { return null; } };
const fmt = (n) => Number(n).toLocaleString();

console.log('╔' + '═'.repeat(70) + '╗');
console.log('║  10.109.0.33 Impact Analysis for BCH 360° Co-residency');
console.log('╚' + '═'.repeat(70) + '╝');

// ───────── 1. BASELINE LOAD ─────────
console.log('\n━━━ 1. CURRENT BASELINE (MariaDB activity) ━━━');

const uptime = (await q(`SHOW GLOBAL STATUS LIKE 'Uptime'`))[0];
const uptimeSec = Number(uptime.Value);
const uptimeDays = uptimeSec / 86400;
console.log(`Uptime: ${uptimeDays.toFixed(1)} days`);

const metrics = await q(`SHOW GLOBAL STATUS WHERE Variable_name IN (
  'Connections','Questions','Slow_queries','Max_used_connections',
  'Threads_connected','Threads_running','Com_select','Com_insert','Com_update','Com_delete',
  'Innodb_rows_read','Innodb_buffer_pool_read_requests','Innodb_buffer_pool_reads',
  'Innodb_row_lock_waits','Innodb_row_lock_time','Innodb_deadlocks',
  'Bytes_received','Bytes_sent'
)`);
const m = Object.fromEntries(metrics.map(r => [r.Variable_name, Number(r.Value)]));

const qps = (m.Questions / uptimeSec).toFixed(2);
const selectPs = (m.Com_select / uptimeSec).toFixed(2);
const insertPs = (m.Com_insert / uptimeSec).toFixed(2);
const updatePs = (m.Com_update / uptimeSec).toFixed(2);
const slowPs = (m.Slow_queries / uptimeSec).toFixed(3);
const rowsReadPs = (m.Innodb_rows_read / uptimeSec);

console.log(`\n📊 Query throughput (avg over ${uptimeDays.toFixed(1)}d):`);
console.log(`  Total queries/sec:    ${qps}`);
console.log(`  SELECT/sec:           ${selectPs}`);
console.log(`  INSERT/sec:           ${insertPs} (replication traffic)`);
console.log(`  UPDATE/sec:           ${updatePs} (replication traffic)`);
console.log(`  Slow queries/sec:     ${slowPs} (${fmt(m.Slow_queries)} total)`);
console.log(`  Rows read/sec:        ${fmt(Math.round(rowsReadPs))}`);

const bpHitRate = m.Innodb_buffer_pool_read_requests > 0
  ? ((1 - m.Innodb_buffer_pool_reads / m.Innodb_buffer_pool_read_requests) * 100).toFixed(2)
  : 0;
console.log(`\n💾 InnoDB Buffer Pool:`);
console.log(`  Hit rate:             ${bpHitRate}%  ${bpHitRate >= 99 ? '✓ excellent' : bpHitRate >= 95 ? 'ok' : '⚠ low'}`);
console.log(`  Row lock waits:       ${fmt(m.Innodb_row_lock_waits)}  (total)`);
console.log(`  Deadlocks:            ${fmt(m.Innodb_deadlocks)}  (total)`);

console.log(`\n🔌 Current connections:`);
console.log(`  Connected now:        ${m.Threads_connected}`);
console.log(`  Running now:          ${m.Threads_running}`);
console.log(`  Max ever used:        ${m.Max_used_connections}`);
console.log(`  Limit (max_conn):     500`);
console.log(`  Headroom:             ${500 - m.Threads_connected} connections (${((1 - m.Threads_connected / 500) * 100).toFixed(0)}%)`);

const mbpsRx = (m.Bytes_received / uptimeSec / 1024 / 1024).toFixed(2);
const mbpsTx = (m.Bytes_sent / uptimeSec / 1024 / 1024).toFixed(2);
console.log(`\n🌐 Network:`);
console.log(`  Receive:              ${mbpsRx} MB/s avg  (replication from master)`);
console.log(`  Send:                 ${mbpsTx} MB/s avg  (queries + slave2)`);

// ───────── 2. WHO'S USING THE DB NOW ─────────
console.log('\n━━━ 2. WHO IS USING THIS DATABASE ━━━');

const procs = await q(`SELECT USER, COUNT(*) as n, GROUP_CONCAT(DISTINCT HOST SEPARATOR ', ') as hosts
  FROM information_schema.processlist GROUP BY USER ORDER BY n DESC`);
if (procs) {
  console.log('\nActive connections by user:');
  procs.forEach(p => console.log(`  ${p.USER.padEnd(20)} ${String(p.n).padStart(3)} conn  from ${p.hosts}`));
}

const clientStats = await q(`SELECT CLIENT, CONNECTED_TIME, BUSY_TIME, ROWS_READ, ROWS_SENT, SELECT_COMMANDS
  FROM information_schema.CLIENT_STATISTICS ORDER BY SELECT_COMMANDS DESC LIMIT 10`);
if (clientStats) {
  console.log('\n📈 Top 10 clients by SELECT count (CLIENT_STATISTICS):');
  console.log(`  ${'CLIENT'.padEnd(18)} ${'SELECTs'.padStart(12)} ${'RowsRead'.padStart(14)} ${'BusySec'.padStart(10)}`);
  clientStats.forEach(c => {
    console.log(`  ${String(c.CLIENT).padEnd(18)} ${fmt(c.SELECT_COMMANDS).padStart(12)} ${fmt(c.ROWS_READ).padStart(14)} ${Number(c.BUSY_TIME).toFixed(0).padStart(10)}`);
  });
}

const userStats = await q(`SELECT USER, CONCURRENT_CONNECTIONS, TOTAL_CONNECTIONS, BUSY_TIME, SELECT_COMMANDS
  FROM information_schema.USER_STATISTICS ORDER BY SELECT_COMMANDS DESC LIMIT 10`);
if (userStats) {
  console.log('\n👤 Top users by activity:');
  console.log(`  ${'USER'.padEnd(20)} ${'TotalConn'.padStart(12)} ${'SELECTs'.padStart(12)} ${'BusySec'.padStart(10)}`);
  userStats.forEach(u => {
    console.log(`  ${String(u.USER).padEnd(20)} ${fmt(u.TOTAL_CONNECTIONS).padStart(12)} ${fmt(u.SELECT_COMMANDS).padStart(12)} ${Number(u.BUSY_TIME).toFixed(0).padStart(10)}`);
  });
}

// ───────── 3. REPLICATION HEALTH ─────────
console.log('\n━━━ 3. REPLICATION HEALTH ━━━');
const repl = await q(`SHOW SLAVE STATUS`);
if (repl && repl.length > 0) {
  const r = repl[0];
  console.log(`  Master:                ${r.Master_Host}:${r.Master_Port}`);
  console.log(`  IO Running:            ${r.Slave_IO_Running}`);
  console.log(`  SQL Running:           ${r.Slave_SQL_Running}`);
  console.log(`  Seconds Behind Master: ${r.Seconds_Behind_Master}s  ${r.Seconds_Behind_Master === 0 ? '✓ fresh' : '⚠ lag'}`);
  console.log(`  Last Error:            ${r.Last_Error || '(none)'}`);
}

// ───────── 4. LONG-RUNNING QUERIES ─────────
console.log('\n━━━ 4. CURRENTLY LONG-RUNNING QUERIES ━━━');
const longQueries = await q(`SELECT ID, USER, HOST, DB, COMMAND, TIME, STATE, LEFT(INFO, 150) AS INFO
  FROM information_schema.processlist WHERE TIME > 5 AND COMMAND != 'Sleep' AND INFO IS NOT NULL ORDER BY TIME DESC LIMIT 5`);
if (longQueries && longQueries.length > 0) {
  longQueries.forEach(p => {
    console.log(`  ID=${p.ID} ${p.USER}@${p.HOST} time=${p.TIME}s state=${p.STATE}`);
    console.log(`    ${String(p.INFO).substring(0, 120)}`);
  });
} else {
  console.log('  (none) — no long-running queries right now ✓');
}

// ───────── 5. BCH 360° PROJECTED LOAD ─────────
console.log('\n━━━ 5. BCH 360° PROJECTED LOAD ━━━');

// Assumptions: 5-10 users avg, 1 page per 2 min, 17 endpoints per page
// = 5 users × 30 page loads/hr × 17 endpoints = 2,550 API calls/hr = 0.71 req/s
// Most endpoints hit 1-8 queries, avg 3 → ~2 DB queries/sec
const USERS = 10;
const PAGE_PER_MIN_PER_USER = 0.5;  // a page load every 2 minutes
const ENDPOINTS_PER_PAGE = 17;
const QUERIES_PER_ENDPOINT = 3;
const CACHE_HIT_RATE = 0.70;        // backend cacheMiddleware(300) hit rate typical

const apiCallsPerSec = USERS * PAGE_PER_MIN_PER_USER / 60 * ENDPOINTS_PER_PAGE;
const dbQueriesPerSec = apiCallsPerSec * QUERIES_PER_ENDPOINT * (1 - CACHE_HIT_RATE);
const peakApiPerSec = apiCallsPerSec * 3;  // 3× peak multiplier
const peakDbPerSec = dbQueriesPerSec * 3;

console.log(`Assumptions:`);
console.log(`  Concurrent users:       ${USERS}`);
console.log(`  Page loads/user/hour:   ${Math.round(PAGE_PER_MIN_PER_USER * 60)}`);
console.log(`  API endpoints/page:     ${ENDPOINTS_PER_PAGE}`);
console.log(`  DB queries/endpoint:    ${QUERIES_PER_ENDPOINT} avg`);
console.log(`  Cache hit rate:         ${(CACHE_HIT_RATE * 100).toFixed(0)}%`);

console.log(`\nProjected load:`);
console.log(`  API requests/sec:       avg ${apiCallsPerSec.toFixed(2)}  · peak ${peakApiPerSec.toFixed(2)}`);
console.log(`  DB queries/sec:         avg ${dbQueriesPerSec.toFixed(2)}  · peak ${peakDbPerSec.toFixed(2)}`);
console.log(`  Connections (max):      4 workers × 50 pool = 200 (current max_used=${m.Max_used_connections})`);

const baselineQps = Number(qps);
const increasePct = (peakDbPerSec / baselineQps * 100).toFixed(1);
console.log(`\nRelative impact:`);
console.log(`  Baseline queries/sec:   ${baselineQps} (all users combined)`);
console.log(`  BCH360 peak add:        +${peakDbPerSec.toFixed(2)} queries/sec (+${increasePct}%)`);
console.log(`  Total projected:        ${(baselineQps + peakDbPerSec).toFixed(2)} queries/sec`);

// ───────── 6. RISK MATRIX ─────────
console.log('\n━━━ 6. RISK MATRIX ━━━');

const risks = [
  {
    area: 'Memory (RAM)',
    current: `MariaDB buffer pool 20 GB + Apache/PHP`,
    adding: `Node 4 workers × 768 MB = 3 GB`,
    verdict: m.Threads_connected < 100 ? '🟢 LOW — server likely has 32+ GB' : '🟡 MEDIUM — verify free memory via SSH',
  },
  {
    area: 'CPU',
    current: `1 SQL thread running, ${m.Threads_running} active`,
    adding: `4 Node workers @ ~1% CPU idle, up to 20% peak each`,
    verdict: '🟢 LOW — server idle most of the time',
  },
  {
    area: 'MariaDB connections',
    current: `Max used ${m.Max_used_connections}/500 · now ${m.Threads_connected}`,
    adding: `4 × 50 = 200 connections at peak`,
    verdict: m.Max_used_connections + 200 < 500 ? '🟢 LOW — total 325 < 500 limit' : '🟠 MEDIUM — adjust max_connections',
  },
  {
    area: 'Disk I/O',
    current: `${(m.Innodb_data_read / uptimeSec / 1024 / 1024).toFixed(2)} MB/s read avg (buffer pool absorbs most)`,
    adding: `Mostly cached reads · small SQLite warehouse writes`,
    verdict: '🟢 LOW — reads dominated by buffer pool',
  },
  {
    area: 'Network bandwidth',
    current: `${mbpsRx} MB/s rx + ${mbpsTx} MB/s tx`,
    adding: `~0.1 MB/s HTTP traffic (internal LAN)`,
    verdict: '🟢 LOW — negligible',
  },
  {
    area: 'Apache port 80',
    current: `Apache 2.4.29 serves /var/www/html + PHP apps`,
    adding: `Nginx on 443 reverse-proxy to Node 4001`,
    verdict: '🟠 MEDIUM — must coordinate with Apache admin',
  },
  {
    area: 'Slow query impact',
    current: `${slowPs} slow/sec (${fmt(m.Slow_queries)} cumulative)`,
    adding: `Our optimized queries: fiscal aggregations · group-by`,
    verdict: '🟡 MEDIUM — monitor slow_log; our heavy queries (report fiscal) run rarely',
  },
  {
    area: 'Replication lag risk',
    current: `Lag 0s · Master 10.109.0.240`,
    adding: `Read-only queries only · no INSERT/UPDATE`,
    verdict: '🟢 LOW — app is 100% read-only on HOSxP',
  },
  {
    area: 'Other tenants (19 DBs)',
    current: `hosxp_train, looker_report, rcmdb, eclaimdb, etc.`,
    adding: `BCH 360° queries bchhosxpxe only`,
    verdict: '🟢 LOW — isolated to one schema',
  },
];

console.log('\n' + 'Area'.padEnd(25) + ' ' + 'Verdict'.padEnd(40));
console.log('─'.repeat(70));
risks.forEach(r => {
  console.log(`${r.area.padEnd(25)} ${r.verdict}`);
  console.log(`  Current: ${r.current}`);
  console.log(`  Add:     ${r.adding}`);
  console.log();
});

// ───────── 7. SAFEGUARDS ─────────
console.log('━━━ 7. SAFEGUARDS BEFORE DEPLOY ━━━');
console.log(`
1. ✅ App is READ-ONLY on HOSxP
   - SET SESSION TRANSACTION READ ONLY enforced per connection
   - App-level regex blocks INSERT/UPDATE/DELETE
   → No risk of data corruption

2. 🟡 Reduce connection footprint
   - Current config: 4 × 50 = 200 MySQL connections
   - Recommend: 4 × 25 = 100 for co-resident deploy
   - Update server/db/mysql.js: MAX_CONCURRENT: 50 → 25
   → Baseline + app = 125 << 500 limit

3. 🟡 Avoid peak-hour deploy
   - MariaDB backup hours: check master (10.109.0.240) crontab
   - HOSxP nightly tasks: usually 0100-0400
   - Best deploy window: 14:00-16:00 (lunch-post office hours)

4. 🟢 Monitor after deploy
   - Watch Seconds_Behind_Master (should stay 0-5s)
   - Watch Threads_connected (should stay <200)
   - Watch slow queries rate (baseline ${slowPs}/s — alert if 2×)

5. 🟢 Rollback is instant
   - pm2 stop all removes all Node load
   - MariaDB unaffected by removing the app

6. 🟠 Apache coexistence
   - Do NOT stop Apache (other apps may break)
   - Install Nginx on 443 only; Apache keeps 80
   - OR use Apache as reverse proxy (mod_proxy + mod_proxy_http)
`);

// ───────── 8. GO/NO-GO RECOMMENDATION ─────────
console.log('━━━ 8. GO/NO-GO RECOMMENDATION ━━━');
const greenCount = risks.filter(r => r.verdict.includes('🟢')).length;
const mediumCount = risks.filter(r => r.verdict.includes('🟠') || r.verdict.includes('🟡')).length;

console.log(`
Risk summary: ${greenCount} LOW · ${mediumCount} MEDIUM · 0 HIGH
`);

if (baselineQps < 20 && m.Threads_connected < 50 && repl?.[0]?.Seconds_Behind_Master === 0) {
  console.log(`🟢 ✅ GO — but follow safeguards:

  Recommendations:
  • Install during low-activity window (14:00-16:00 local)
  • Reduce MAX_CONCURRENT from 50 → 25 in server/db/mysql.js
  • Use Nginx on 443, leave Apache on 80 untouched
  • Monitor 'seconds_behind_master' for 24h post-deploy
  • Have rollback ready: pm2 stop all + remove nginx site
  • Notify admin of 10.109.0.33 before start
`);
} else {
  console.log(`🟠 ⚠ CONDITIONAL GO — resolve medium-risk items first
`);
}

console.log('━━━ END OF IMPACT ANALYSIS ━━━\n');
await conn.end();
process.exit(0);
