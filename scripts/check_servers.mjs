// ============================================================
// BCH 360° — MySQL Server Health Check
// Usage: node scripts/check_servers.mjs
// ============================================================
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const SERVERS = [
  {
    id: 'slave1', role: 'Read Replica (active default)',
    host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, pass: process.env.MYSQL_PASS,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
  },
  {
    id: 'master', role: 'Master',
    host: process.env.MYSQL_MASTER_HOST, user: process.env.MYSQL_MASTER_USER, pass: process.env.MYSQL_MASTER_PASS,
    port: parseInt(process.env.MYSQL_MASTER_PORT || '3306'),
  },
  {
    id: 'slave2', role: 'Read Replica 2',
    host: process.env.MYSQL_SLAVE2_HOST, user: process.env.MYSQL_SLAVE2_USER, pass: process.env.MYSQL_SLAVE2_PASS,
    port: parseInt(process.env.MYSQL_SLAVE2_PORT || '3306'),
  },
];

console.log('='.repeat(70));
console.log('BCH 360° Intelligence V.10 — MySQL Server Health Check');
console.log('='.repeat(70));

for (const s of SERVERS) {
  console.log(`\n🔍 ${s.id.toUpperCase()}  (${s.role})  ${s.host}:${s.port}`);
  console.log(`   user=${s.user || 'MISSING'}`);
  if (!s.host || !s.user) {
    console.log('   ❌ config incomplete in .env');
    continue;
  }
  const t0 = Date.now();
  try {
    const conn = await mysql.createConnection({
      host: s.host, port: s.port, user: s.user, password: s.pass,
      database: 'bchhosxpxe', connectTimeout: 4000,
    });
    const connMs = Date.now() - t0;
    const [verRows] = await conn.query('SELECT VERSION() AS v, @@hostname AS h, NOW() AS ts, @@read_only AS ro');
    const ver = verRows[0];

    const [szRows] = await conn.query(`
      SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024 / 1024, 1) AS gb,
             COUNT(*) AS tables
      FROM information_schema.tables WHERE table_schema = 'bchhosxpxe'
    `);
    const sz = szRows[0];

    // Recent activity probe
    const [actRows] = await conn.query(`
      SELECT
        (SELECT COUNT(*) FROM ovst WHERE vstdate = CURDATE()) AS ovst_today,
        (SELECT COUNT(*) FROM ovst WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)) AS ovst_yest,
        (SELECT COUNT(*) FROM ipt WHERE regdate = CURDATE()) AS ipt_today,
        (SELECT MAX(vstdate) FROM ovst) AS last_ovst,
        (SELECT MAX(regdate) FROM ipt) AS last_ipt
    `).catch(() => [[{ ovst_today: '?', ovst_yest: '?', ipt_today: '?', last_ovst: '?', last_ipt: '?' }]]);
    const act = actRows[0];

    // Replication status
    const [replRows] = await conn.query(`SHOW SLAVE STATUS`).catch(() => [[]]);
    const [masterRows] = await conn.query(`SHOW MASTER STATUS`).catch(() => [[]]);

    console.log(`   ✅ Connect in ${connMs}ms`);
    console.log(`   MySQL: ${ver.v}  ·  Host: ${ver.h}  ·  ServerTime: ${ver.ts}  ·  read_only=${ver.ro}`);
    console.log(`   Database: bchhosxpxe  ·  ${sz.tables} tables  ·  ${sz.gb} GB`);
    console.log(`   Activity: ovst today=${act.ovst_today} · yesterday=${act.ovst_yest} · ipt today=${act.ipt_today}`);
    console.log(`   Latest:   ovst=${act.last_ovst}  ·  ipt=${act.last_ipt}`);

    if (replRows.length > 0) {
      const r = replRows[0];
      const lagSec = r.Seconds_Behind_Master;
      const lagMsg = lagSec == null ? 'NULL (connection issue)' : lagSec === 0 ? `${lagSec}s ✓ fresh` : `${lagSec}s lag ${lagSec > 60 ? '⚠' : ''}`;
      console.log(`   Replication: IO=${r.Slave_IO_Running} · SQL=${r.Slave_SQL_Running} · Lag=${lagMsg}`);
      console.log(`                Master: ${r.Master_Host}:${r.Master_Port}  ·  Position: ${r.Exec_Master_Log_Pos}`);
      if (r.Last_Error) console.log(`   ⚠ Last Error: ${r.Last_Error.substring(0, 200)}`);
    } else if (masterRows.length > 0) {
      const m = masterRows[0];
      console.log(`   Role: MASTER  ·  Binlog: ${m.File}:${m.Position}`);
    } else {
      console.log(`   Replication: no slave/master status (possibly standalone)`);
    }

    await conn.end();
  } catch (e) {
    const code = e.code || 'ERR';
    console.log(`   ❌ ${code}: ${e.message.substring(0, 150)}`);
  }
}

console.log(`\n${'─'.repeat(70)}`);
console.log(`Active server in app: MYSQL_SERVER=${process.env.MYSQL_SERVER || 'slave1 (default)'}`);
console.log('─'.repeat(70));
process.exit(0);
