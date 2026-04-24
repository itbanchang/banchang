// Probe 10.109.0.33 via MySQL connection (SSH not available)
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { resolve } from 'path';

dotenv.config({ path: resolve('C:/BCH 360° Intelligence V.10/.env') });

const conn = await mysql.createConnection({
  host: '10.109.0.33', port: 3306,
  user: process.env.MYSQL_USER, password: process.env.MYSQL_PASS,
  database: 'bchhosxpxe', connectTimeout: 5000,
});

async function q(sql) {
  try { const [r] = await conn.query(sql); return r; } catch (e) { return { error: e.message }; }
}

console.log('='.repeat(70));
console.log('10.109.0.33 — Server Probe via MySQL');
console.log('='.repeat(70));

const basic = await q(`SELECT
  @@hostname AS hostname,
  @@version AS mysql_version,
  @@version_compile_os AS os,
  @@version_compile_machine AS arch,
  @@version_comment AS comment,
  @@datadir AS datadir,
  NOW() AS server_time,
  @@system_time_zone AS tz,
  @@read_only AS readonly,
  @@max_connections AS max_conn,
  @@innodb_buffer_pool_size AS buffer_pool_bytes
`);
console.log('\n📦 System:');
console.log(basic[0]);

const uptime = await q(`SHOW GLOBAL STATUS LIKE 'Uptime'`);
console.log(`\n⏱ Uptime: ${uptime[0]?.Value ? Math.round(uptime[0].Value / 86400) + ' days' : '?'}`);

const threads = await q(`SHOW GLOBAL STATUS LIKE 'Threads_%'`);
console.log('\n🧵 Thread stats:');
threads.forEach(t => console.log(`  ${t.Variable_name}: ${t.Value}`));

const conn_stats = await q(`SHOW GLOBAL STATUS WHERE Variable_name IN ('Connections','Aborted_connects','Max_used_connections','Slow_queries','Questions')`);
console.log('\n📊 Connection stats:');
conn_stats.forEach(t => console.log(`  ${t.Variable_name}: ${Number(t.Value).toLocaleString()}`));

const diskIO = await q(`SHOW GLOBAL STATUS WHERE Variable_name IN ('Innodb_data_read','Innodb_data_written','Innodb_buffer_pool_read_requests')`);
console.log('\n💾 InnoDB I/O:');
diskIO.forEach(t => console.log(`  ${t.Variable_name}: ${Number(t.Value).toLocaleString()} bytes`));

const dbList = await q(`SHOW DATABASES`);
console.log(`\n🗃 Databases visible (${dbList.length}):`, dbList.map(d => d.Database).join(', '));

const plugins = await q(`SELECT plugin_name, plugin_status FROM information_schema.plugins WHERE plugin_status='ACTIVE' ORDER BY plugin_name LIMIT 20`);
console.log(`\n🔌 Active plugins (top 20):`);
plugins.forEach(p => console.log(`  ${p.plugin_name}`));

const usersWithGrant = await q(`
  SELECT user, host FROM mysql.user ORDER BY user, host LIMIT 20
`).catch(() => ({ error: 'no mysql.user access (expected for dataaudit role)' }));
console.log('\n👥 MySQL users:');
if (usersWithGrant.error) console.log(`  ${usersWithGrant.error}`);
else usersWithGrant.forEach(u => console.log(`  ${u.user}@${u.host}`));

const slaveStatus = await q(`SHOW SLAVE STATUS`);
if (slaveStatus.length > 0) {
  const s = slaveStatus[0];
  console.log('\n🔄 Replication:');
  console.log(`  Master: ${s.Master_Host}:${s.Master_Port}`);
  console.log(`  IO=${s.Slave_IO_Running}  SQL=${s.Slave_SQL_Running}  Lag=${s.Seconds_Behind_Master}s`);
  console.log(`  Position: ${s.Exec_Master_Log_Pos}`);
  console.log(`  Last error: ${s.Last_Error || '(none)'}`);
}

// Performance schema (if accessible)
const ps = await q(`SELECT * FROM performance_schema.threads WHERE TYPE='FOREGROUND' AND NAME LIKE '%connection%' LIMIT 5`).catch(() => null);
if (ps && !ps.error) {
  console.log(`\n🎯 Active connections: ${ps.length}`);
}

// Estimate "what else runs on this box"
const version = basic[0]?.mysql_version || '';
const os = basic[0]?.os || '';
console.log('\n🔍 Inference about 10.109.0.33:');
console.log(`  OS likely: ${os}  (e.g. "Linux" means Ubuntu/Debian)`);
console.log(`  MariaDB: ${version}`);
if (version.includes('10.1.48')) console.log(`  ⚠ MariaDB 10.1 EOL since Oct 2020`);
if (os.toLowerCase().includes('linux')) console.log(`  ✓ Linux server — install_ubuntu.sh compatible`);
console.log(`  Memory hint (buffer pool): ${(basic[0].buffer_pool_bytes / 1024**3).toFixed(1)} GB`);

await conn.end();
process.exit(0);
