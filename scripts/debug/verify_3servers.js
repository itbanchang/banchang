// ============================================================
// Verify IPD Data Consistency Across All 3 HOSxP Servers
// Slave1 (10.1.0.3) vs Master (10.109.0.240) vs Slave2 (10.1.0.239)
// ============================================================
import mysql from 'mysql2/promise';

const SERVERS = {
  slave1: {
    label: 'Slave1 (10.1.0.3)',
    host: '10.1.0.3', database: 'bchhosxpxe',
    user: 'dataaudit', password: 'dataaudit', port: 3306,
  },
  master: {
    label: 'Master (10.109.0.240)',
    host: '10.109.0.240', database: 'bchhosxpxe',
    user: 'bch', password: '10828@adminbch', port: 3306,
  },
  slave2: {
    label: 'Slave2 (10.1.0.239)',
    host: '10.1.0.239', database: 'bchhosxpxe',
    user: 'root', password: 'boom123', port: 3306,
  },
};

const POOL_OPTS = {
  waitForConnections: true,
  connectionLimit: 5,
  connectTimeout: 10000,
  charset: 'utf8mb4',
  timezone: '+07:00',
  decimalNumbers: true,
  supportBigNumbers: true,
  bigNumberStrings: false,
  dateStrings: true,
};

const FY1 = 2567;
const FY2 = 2568;

function fyStartCE(beFY) { return beFY - 544; }

const FISCAL_MONTHS = [
  { mo: 10, label: 'ต.ค.' }, { mo: 11, label: 'พ.ย.' }, { mo: 12, label: 'ธ.ค.' },
  { mo: 1, label: 'ม.ค.' },  { mo: 2, label: 'ก.พ.' },  { mo: 3, label: 'มี.ค.' },
  { mo: 4, label: 'เม.ย.' }, { mo: 5, label: 'พ.ค.' },  { mo: 6, label: 'มิ.ย.' },
  { mo: 7, label: 'ก.ค.' },  { mo: 8, label: 'ส.ค.' },  { mo: 9, label: 'ก.ย.' },
];

async function queryServer(pool, sql, params) {
  const conn = await pool.getConnection();
  try {
    await conn.query('SET SESSION TRANSACTION READ ONLY');
    const [rows] = await conn.query({ sql, timeout: 30000 }, params);
    return rows;
  } finally {
    conn.release();
  }
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  IPD Data Consistency Check — 3 Servers');
  console.log('  Slave1 (10.1.0.3) vs Master (10.109.0.240) vs Slave2 (10.1.0.239)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Create connection pools
  const pools = {};
  const connected = {};

  for (const [id, srv] of Object.entries(SERVERS)) {
    try {
      pools[id] = mysql.createPool({ ...srv, ...POOL_OPTS });
      // Test connection
      await queryServer(pools[id], 'SELECT 1 AS ok', []);
      connected[id] = true;
      console.log(`  ✅ ${srv.label} — Connected`);
    } catch (err) {
      connected[id] = false;
      console.log(`  ❌ ${srv.label} — FAILED: ${err.message}`);
    }
  }

  const activeServers = Object.keys(pools).filter(id => connected[id]);
  if (activeServers.length < 2) {
    console.log('\n⚠️  ต้องเชื่อมต่อได้อย่างน้อย 2 server จึงจะเปรียบเทียบได้');
    process.exit(1);
  }

  console.log(`\n  เชื่อมต่อสำเร็จ ${activeServers.length}/3 servers\n`);

  const issues = [];
  const results = {}; // { serverId: { fy: { month: data } } }

  // ═══════════════════════════════════════════════════════════
  // TEST 1: Monthly Admit & LOS per FY
  // ═══════════════════════════════════════════════════════════
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('  [1/4] Admit & วันนอน รายเดือน');
  console.log('═══════════════════════════════════════════════════════════════════════');

  for (const id of activeServers) {
    results[id] = {};
    for (const fy of [FY1, FY2]) {
      results[id][fy] = {};
      const fyStart = `${fyStartCE(fy)}-10-01`;
      const fyEnd = `${fyStartCE(fy) + 1}-09-30`;

      const rows = await queryServer(pools[id],
        `SELECT
           YEAR(i.dchdate) AS yr, MONTH(i.dchdate) AS mo,
           COUNT(DISTINCT i.an) AS admits,
           SUM(DATEDIFF(i.dchdate, i.regdate)) AS total_los,
           ROUND(SUM(COALESCE(i.adjrw, a.rw, 0)), 2) AS sum_adjrw,
           ROUND(AVG(CASE WHEN COALESCE(i.adjrw, a.rw) > 0 THEN COALESCE(i.adjrw, a.rw) END), 2) AS cmi
         FROM ipt i
         LEFT JOIN an_stat a ON i.an = a.an
         WHERE i.dchdate IS NOT NULL AND i.ward != '06'
           AND i.dchdate >= ? AND i.dchdate <= LEAST(?, CURDATE())
         GROUP BY YEAR(i.dchdate), MONTH(i.dchdate)
         ORDER BY yr, mo`,
        [fyStart, fyEnd]
      );

      for (const r of rows) {
        const key = `${r.yr}-${String(r.mo).padStart(2, '0')}`;
        results[id][fy][key] = {
          admits: Number(r.admits),
          los: Number(r.total_los),
          adjrw: Number(r.sum_adjrw),
          cmi: Number(r.cmi),
        };
      }
    }
  }

  // Compare monthly data
  const refServer = activeServers[0];
  for (const fy of [FY1, FY2]) {
    console.log(`\n  ── ปีงบ ${fy} ──`);
    const fyStart = fyStartCE(fy);

    for (const fm of FISCAL_MONTHS) {
      const calYear = fm.mo >= 10 ? fyStart : fyStart + 1;
      const key = `${calYear}-${String(fm.mo).padStart(2, '0')}`;
      const refData = results[refServer][fy][key];
      if (!refData) continue;

      let line = `  ${fm.label} (${key}):`;
      let allMatch = true;

      for (const id of activeServers) {
        const d = results[id][fy][key] || { admits: 0, los: 0, adjrw: 0, cmi: 0 };
        const label = id.padEnd(7);
        line += `  ${label} A=${String(d.admits).padStart(4)} L=${String(d.los).padStart(5)} RW=${String(d.adjrw).padStart(8)} CMI=${d.cmi}`;

        if (id !== refServer) {
          const admitDiff = d.admits - refData.admits;
          const losDiff = d.los - refData.los;
          const rwDiff = Math.abs(d.adjrw - refData.adjrw);

          if (admitDiff !== 0 || losDiff !== 0 || rwDiff > 1) {
            allMatch = false;
            line += ` ❌`;
            if (admitDiff !== 0) issues.push(`❌ ปีงบ${fy} ${fm.label}: Admit ${refServer}=${refData.admits} vs ${id}=${d.admits} (Δ${admitDiff})`);
            if (losDiff !== 0) issues.push(`❌ ปีงบ${fy} ${fm.label}: LOS ${refServer}=${refData.los} vs ${id}=${d.los} (Δ${losDiff})`);
            if (rwDiff > 1) issues.push(`❌ ปีงบ${fy} ${fm.label}: AdjRW ${refServer}=${refData.adjrw} vs ${id}=${d.adjrw} (Δ${rwDiff.toFixed(2)})`);
          }
        }
      }
      if (allMatch) line += '  ✅';
      console.log(line);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // TEST 2: Grand Totals
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log('  [2/4] ยอดรวมทั้งปีงบ');
  console.log('═══════════════════════════════════════════════════════════════════════');

  for (const fy of [FY1, FY2]) {
    console.log(`\n  ── ปีงบ ${fy} ──`);
    const totals = {};

    for (const id of activeServers) {
      const months = results[id][fy];
      let admits = 0, los = 0, adjrw = 0;
      for (const d of Object.values(months)) {
        admits += d.admits;
        los += d.los;
        adjrw += d.adjrw;
      }
      totals[id] = { admits, los, adjrw: Math.round(adjrw * 100) / 100 };
      console.log(`  ${id.padEnd(7)}: Admit=${String(admits).toLocaleString().padStart(6)} | LOS=${String(los).padStart(6)} | AdjRW=${adjrw.toFixed(2).padStart(9)}`);
    }

    // Cross-compare
    for (let i = 1; i < activeServers.length; i++) {
      const a = activeServers[0], b = activeServers[i];
      const da = totals[a], db = totals[b];
      if (da.admits !== db.admits) issues.push(`❌ ปีงบ${fy} Total Admit: ${a}=${da.admits} vs ${b}=${db.admits} (Δ${db.admits - da.admits})`);
      if (da.los !== db.los) issues.push(`❌ ปีงบ${fy} Total LOS: ${a}=${da.los} vs ${b}=${db.los} (Δ${db.los - da.los})`);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // TEST 3: Replication Lag Check
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log('  [3/4] Replication Lag — ข้อมูลล่าสุดในแต่ละ Server');
  console.log('═══════════════════════════════════════════════════════════════════════');

  for (const id of activeServers) {
    try {
      const rows = await queryServer(pools[id],
        `SELECT MAX(i.dchdate) AS last_dch, MAX(i.regdate) AS last_reg,
                (SELECT MAX(vstdate) FROM vn_stat) AS last_opd
         FROM ipt i WHERE i.dchdate IS NOT NULL`,
        []
      );
      const r = rows[0];
      console.log(`  ${SERVERS[id].label}:`);
      console.log(`    Last discharge: ${r.last_dch}`);
      console.log(`    Last register:  ${r.last_reg}`);
      console.log(`    Last OPD visit: ${r.last_opd}`);
    } catch (err) {
      console.log(`  ${SERVERS[id].label}: ⚠️ ${err.message}`);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // TEST 4: Row Count Comparison (ipt table)
  // ═══════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════');
  console.log('  [4/4] Row Count — จำนวนแถวใน ipt, an_stat, vn_stat');
  console.log('═══════════════════════════════════════════════════════════════════════');

  const tables = ['ipt', 'an_stat', 'vn_stat'];
  const rowCounts = {};

  for (const id of activeServers) {
    rowCounts[id] = {};
    for (const tbl of tables) {
      try {
        const rows = await queryServer(pools[id],
          `SELECT COUNT(*) AS cnt FROM ${tbl}`, []);
        rowCounts[id][tbl] = Number(rows[0].cnt);
      } catch (err) {
        rowCounts[id][tbl] = `ERR: ${err.message}`;
      }
    }
  }

  for (const tbl of tables) {
    let line = `  ${tbl.padEnd(10)}:`;
    const vals = [];
    for (const id of activeServers) {
      const cnt = rowCounts[id][tbl];
      line += `  ${id.padEnd(7)}=${typeof cnt === 'number' ? cnt.toLocaleString().padStart(12) : cnt}`;
      if (typeof cnt === 'number') vals.push(cnt);
    }
    const allSame = vals.length > 1 && vals.every(v => v === vals[0]);
    if (allSame) {
      line += '  ✅';
    } else if (vals.length > 1) {
      const diff = Math.max(...vals) - Math.min(...vals);
      line += `  ⚠️ Δ${diff.toLocaleString()}`;
      issues.push(`⚠️ ${tbl} row count differs: ${vals.join(' vs ')} (Δ${diff})`);
    }
    console.log(line);
  }

  // ═══════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Servers tested: ${activeServers.map(id => SERVERS[id].label).join(', ')}`);

  if (issues.length === 0) {
    console.log('\n  🎉 ข้อมูล IPD ตรงกันทุก Server — Replication สมบูรณ์!\n');
  } else {
    console.log(`\n  ⚠️ พบความแตกต่าง ${issues.length} รายการ:\n`);
    issues.forEach(i => console.log(`    ${i}`));
    console.log('');
  }

  // Cleanup
  for (const id of activeServers) {
    await pools[id].end();
  }

  process.exit(issues.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
