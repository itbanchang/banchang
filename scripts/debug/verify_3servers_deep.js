// ============================================================
// Deep Anomaly Detection — All 3 HOSxP Servers
// อ้างอิง Master เป็นหลัก ตรวจหาความผิดปกติ
// ============================================================
import mysql from 'mysql2/promise';

const SERVERS = {
  master: {
    id: 'master', label: 'Master (10.109.0.240)',
    host: '10.109.0.240', database: 'bchhosxpxe',
    user: 'bch', password: '10828@adminbch', port: 3306,
  },
  slave1: {
    id: 'slave1', label: 'Slave1 (10.1.0.3)',
    host: '10.1.0.3', database: 'bchhosxpxe',
    user: 'dataaudit', password: 'dataaudit', port: 3306,
  },
  slave2: {
    id: 'slave2', label: 'Slave2 (10.1.0.239)',
    host: '10.1.0.239', database: 'bchhosxpxe',
    user: 'root', password: 'boom123', port: 3306,
  },
};

const POOL_OPTS = {
  waitForConnections: true, connectionLimit: 5, connectTimeout: 10000,
  charset: 'utf8mb4', timezone: '+07:00', decimalNumbers: true,
  supportBigNumbers: true, bigNumberStrings: false, dateStrings: true,
};

async function q(pool, sql, params = []) {
  const conn = await pool.getConnection();
  try {
    await conn.query('SET SESSION TRANSACTION READ ONLY');
    const [rows] = await conn.query({ sql, timeout: 60000 }, params);
    return rows;
  } finally { conn.release(); }
}

async function q1(pool, sql, params = []) {
  const rows = await q(pool, sql, params);
  return rows[0] || null;
}

function pct(a, b) {
  if (b === 0) return a === 0 ? '0%' : '∞';
  return ((a - b) / b * 100).toFixed(2) + '%';
}

function fmt(n) {
  return typeof n === 'number' ? n.toLocaleString() : String(n);
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Deep Anomaly Detection — 3 HOSxP Servers (Reference: Master)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const pools = {};
  const active = [];

  for (const [id, srv] of Object.entries(SERVERS)) {
    try {
      const { label, id: _id, ...connOpts } = srv;
      pools[id] = mysql.createPool({ ...connOpts, ...POOL_OPTS });
      await q(pools[id], 'SELECT 1');
      active.push(id);
      console.log(`  ✅ ${srv.label}`);
    } catch (err) {
      console.log(`  ❌ ${srv.label} — ${err.message}`);
    }
  }

  if (!active.includes('master')) {
    console.log('\n❌ Master ไม่สามารถเชื่อมต่อได้ — ยกเลิกการตรวจสอบ');
    process.exit(1);
  }

  const slaves = active.filter(id => id !== 'master');
  const issues = [];
  const warnings = [];

  // ═══════════════════════════════════════════════════════════════
  // TEST 1: Row Count — ตารางหลักทั้งหมด
  // ═══════════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('  [1/8] Row Count — ตารางหลัก HOSxP');
  console.log('═══════════════════════════════════════════════════════════════════════════');

  const TABLES = [
    'ipt', 'an_stat', 'vn_stat', 'ovst', 'opitemrece', 'iptopitemrece',
    'lab_head', 'lab_order', 'xray_head', 'drugitems', 'patient', 'doctor',
    'ward', 'kskdepartment', 'icd101', 'ovstdiag', 'iptdiag',
    'er_regist', 'er_nursing_detail',
    'dtmain', 'dental_visit',
    'physicaltherapy_visit',
  ];

  const rowCounts = {};
  for (const id of active) rowCounts[id] = {};

  for (const tbl of TABLES) {
    for (const id of active) {
      try {
        const r = await q1(pools[id], `SELECT COUNT(*) AS cnt FROM \`${tbl}\``);
        rowCounts[id][tbl] = Number(r?.cnt || 0);
      } catch {
        rowCounts[id][tbl] = null; // table doesn't exist
      }
    }

    const master = rowCounts.master[tbl];
    if (master === null) continue;

    let line = `  ${tbl.padEnd(25)}  Master=${fmt(master).padStart(12)}`;
    let status = '✅';

    for (const sid of slaves) {
      const val = rowCounts[sid][tbl];
      if (val === null) {
        line += `  ${sid}=N/A`;
        continue;
      }
      const diff = val - master;
      line += `  ${sid}=${fmt(val).padStart(12)}`;

      if (diff !== 0) {
        const pctDiff = master > 0 ? Math.abs(diff / master * 100).toFixed(3) : '∞';
        line += ` (Δ${diff > 0 ? '+' : ''}${fmt(diff)}, ${pctDiff}%)`;
        if (Math.abs(diff) > 0) {
          status = Math.abs(diff) > 10 ? '❌' : '⚠️';
          const msg = `${tbl}: ${sid} ${diff > 0 ? 'มากกว่า' : 'น้อยกว่า'} Master ${fmt(Math.abs(diff))} rows (${pctDiff}%)`;
          if (Math.abs(diff) > 10) issues.push(msg); else warnings.push(msg);
        }
      }
    }
    line += `  ${status}`;
    console.log(line);
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST 2: Replication Status / Lag
  // ═══════════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('  [2/8] Replication Status & Lag');
  console.log('═══════════════════════════════════════════════════════════════════════════');

  for (const sid of slaves) {
    try {
      const rows = await q(pools[sid], 'SHOW SLAVE STATUS');
      if (rows.length > 0) {
        const s = rows[0];
        const lag = s.Seconds_Behind_Master;
        const ioRunning = s.Slave_IO_Running;
        const sqlRunning = s.Slave_SQL_Running;
        const lastErr = s.Last_Error || 'None';

        console.log(`  ${SERVERS[sid].label}:`);
        console.log(`    IO Running:    ${ioRunning === 'Yes' ? '✅' : '❌'} ${ioRunning}`);
        console.log(`    SQL Running:   ${sqlRunning === 'Yes' ? '✅' : '❌'} ${sqlRunning}`);
        console.log(`    Seconds Behind: ${lag === null ? '⚠️ NULL (not replicating?)' : lag <= 5 ? `✅ ${lag}s` : `❌ ${lag}s`}`);
        if (lastErr !== 'None' && lastErr !== '') {
          console.log(`    Last Error:    ❌ ${lastErr}`);
          issues.push(`${sid} replication error: ${lastErr}`);
        }
        if (ioRunning !== 'Yes') issues.push(`${sid} Slave_IO_Running = ${ioRunning}`);
        if (sqlRunning !== 'Yes') issues.push(`${sid} Slave_SQL_Running = ${sqlRunning}`);
        if (lag !== null && lag > 60) issues.push(`${sid} replication lag = ${lag}s`);
        else if (lag !== null && lag > 5) warnings.push(`${sid} replication lag = ${lag}s`);
      } else {
        console.log(`  ${SERVERS[sid].label}: ไม่ใช่ slave (ไม่มี SHOW SLAVE STATUS)`);
      }
    } catch (err) {
      console.log(`  ${SERVERS[sid].label}: ⚠️ Cannot check — ${err.message}`);
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST 3: Latest Records — ข้อมูลล่าสุด
  // ═══════════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('  [3/8] Latest Records — ข้อมูลล่าสุดในแต่ละตาราง');
  console.log('═══════════════════════════════════════════════════════════════════════════');

  const LATEST_QUERIES = [
    { label: 'OPD (vn_stat.vstdate)', sql: 'SELECT MAX(vstdate) AS d FROM vn_stat' },
    { label: 'IPD Admit (ipt.regdate)', sql: 'SELECT MAX(regdate) AS d FROM ipt' },
    { label: 'IPD Discharge (ipt.dchdate)', sql: 'SELECT MAX(dchdate) AS d FROM ipt WHERE dchdate IS NOT NULL' },
    { label: 'Lab (lab_head.order_date)', sql: 'SELECT MAX(order_date) AS d FROM lab_head' },
    { label: 'X-ray (xray_head.order_date)', sql: 'SELECT MAX(order_date) AS d FROM xray_head' },
    { label: 'ER (er_regist.enter_er_time)', sql: 'SELECT MAX(enter_er_time) AS d FROM er_regist' },
    { label: 'OPD Diag (ovstdiag)', sql: 'SELECT MAX(vstdate) AS d FROM ovstdiag' },
  ];

  for (const lq of LATEST_QUERIES) {
    let line = `  ${lq.label.padEnd(35)}`;
    const dates = {};
    for (const id of active) {
      try {
        const r = await q1(pools[id], lq.sql);
        dates[id] = r?.d || 'NULL';
      } catch {
        dates[id] = 'ERR';
      }
      line += `  ${id}=${dates[id]}`;
    }

    // Compare slaves to master
    let status = '✅';
    for (const sid of slaves) {
      if (dates[sid] !== dates.master && dates[sid] !== 'ERR') {
        status = '⚠️';
        warnings.push(`${lq.label}: ${sid}=${dates[sid]} vs Master=${dates.master}`);
      }
    }
    line += `  ${status}`;
    console.log(line);
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST 4: Today's Data Count — ข้อมูลวันนี้
  // ═══════════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('  [4/8] Today\'s Data — จำนวนข้อมูลวันนี้');
  console.log('═══════════════════════════════════════════════════════════════════════════');

  const TODAY_QUERIES = [
    { label: 'OPD visits today', sql: "SELECT COUNT(*) AS cnt FROM vn_stat WHERE vstdate = CURDATE()" },
    { label: 'IPD admits today', sql: "SELECT COUNT(*) AS cnt FROM ipt WHERE regdate = CURDATE()" },
    { label: 'IPD discharge today', sql: "SELECT COUNT(*) AS cnt FROM ipt WHERE dchdate = CURDATE()" },
    { label: 'Lab orders today', sql: "SELECT COUNT(*) AS cnt FROM lab_head WHERE order_date = CURDATE()" },
    { label: 'X-ray orders today', sql: "SELECT COUNT(*) AS cnt FROM xray_head WHERE order_date = CURDATE()" },
    { label: 'ER visits today', sql: "SELECT COUNT(*) AS cnt FROM er_regist WHERE DATE(enter_er_time) = CURDATE()" },
  ];

  for (const tq of TODAY_QUERIES) {
    let line = `  ${tq.label.padEnd(25)}`;
    const vals = {};
    for (const id of active) {
      try {
        const r = await q1(pools[id], tq.sql);
        vals[id] = Number(r?.cnt || 0);
      } catch {
        vals[id] = 'ERR';
      }
      line += `  ${id}=${String(vals[id]).padStart(6)}`;
    }

    let status = '✅';
    for (const sid of slaves) {
      if (typeof vals[sid] === 'number' && typeof vals.master === 'number' && vals[sid] !== vals.master) {
        const diff = vals[sid] - vals.master;
        status = Math.abs(diff) > 5 ? '❌' : '⚠️';
        line += ` (Δ${diff > 0 ? '+' : ''}${diff})`;
        if (Math.abs(diff) > 5) issues.push(`${tq.label}: ${sid}=${vals[sid]} vs Master=${vals.master}`);
        else warnings.push(`${tq.label}: ${sid}=${vals[sid]} vs Master=${vals.master} (Δ${diff})`);
      }
    }
    line += `  ${status}`;
    console.log(line);
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST 5: Checksum — ข้อมูล IPD สำคัญ (ปีงบ 2568)
  // ═══════════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('  [5/8] IPD Checksum — ปีงบ 2568 (Admit, LOS, AdjRW per month)');
  console.log('═══════════════════════════════════════════════════════════════════════════');

  const MONTHS_68 = [
    { mo: '2024-10', label: 'ต.ค.' }, { mo: '2024-11', label: 'พ.ย.' }, { mo: '2024-12', label: 'ธ.ค.' },
    { mo: '2025-01', label: 'ม.ค.' }, { mo: '2025-02', label: 'ก.พ.' }, { mo: '2025-03', label: 'มี.ค.' },
    { mo: '2025-04', label: 'เม.ย.' }, { mo: '2025-05', label: 'พ.ค.' }, { mo: '2025-06', label: 'มิ.ย.' },
    { mo: '2025-07', label: 'ก.ค.' }, { mo: '2025-08', label: 'ส.ค.' }, { mo: '2025-09', label: 'ก.ย.' },
  ];

  for (const m of MONTHS_68) {
    const start = `${m.mo}-01`;
    const [yr, mn] = m.mo.split('-').map(Number);
    const end = `${m.mo}-${new Date(yr, mn, 0).getDate()}`;

    const vals = {};
    for (const id of active) {
      const r = await q1(pools[id],
        `SELECT COUNT(DISTINCT an) AS admits, SUM(DATEDIFF(dchdate, regdate)) AS los,
                ROUND(SUM(COALESCE(adjrw, 0)), 2) AS adjrw
         FROM ipt WHERE dchdate IS NOT NULL AND ward != '06'
           AND dchdate >= ? AND dchdate <= ?`, [start, end]);
      vals[id] = { admits: Number(r?.admits || 0), los: Number(r?.los || 0), adjrw: Number(r?.adjrw || 0) };
    }

    let line = `  ${m.label}`;
    let status = '✅';
    for (const id of active) {
      line += `  ${id}: A=${String(vals[id].admits).padStart(4)} L=${String(vals[id].los).padStart(5)} RW=${String(vals[id].adjrw).padStart(7)}`;
    }
    for (const sid of slaves) {
      if (vals[sid].admits !== vals.master.admits || vals[sid].los !== vals.master.los) {
        status = '❌';
        issues.push(`IPD ${m.label}: ${sid} A=${vals[sid].admits}/L=${vals[sid].los} vs Master A=${vals.master.admits}/L=${vals.master.los}`);
      } else if (Math.abs(vals[sid].adjrw - vals.master.adjrw) > 0.5) {
        status = '⚠️';
        warnings.push(`IPD ${m.label}: ${sid} AdjRW=${vals[sid].adjrw} vs Master=${vals.master.adjrw}`);
      }
    }
    line += `  ${status}`;
    console.log(line);
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST 6: OPD Checksum — ข้อมูล OPD ย้อนหลัง 6 เดือน
  // ═══════════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('  [6/8] OPD Checksum — ย้อนหลัง 6 เดือน');
  console.log('═══════════════════════════════════════════════════════════════════════════');

  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yr = d.getFullYear();
    const mn = d.getMonth() + 1;
    const start = `${yr}-${String(mn).padStart(2, '0')}-01`;
    const end = `${yr}-${String(mn).padStart(2, '0')}-${new Date(yr, mn, 0).getDate()}`;
    const label = `${yr}-${String(mn).padStart(2, '0')}`;

    const vals = {};
    for (const id of active) {
      const r = await q1(pools[id],
        `SELECT COUNT(*) AS visits, ROUND(SUM(COALESCE(income, 0)), 0) AS income
         FROM vn_stat WHERE vstdate >= ? AND vstdate <= ?`, [start, end]);
      vals[id] = { visits: Number(r?.visits || 0), income: Number(r?.income || 0) };
    }

    let line = `  ${label}`;
    let status = '✅';
    for (const id of active) {
      line += `  ${id}: V=${fmt(vals[id].visits).padStart(7)} Inc=${fmt(vals[id].income).padStart(12)}`;
    }
    for (const sid of slaves) {
      if (vals[sid].visits !== vals.master.visits) {
        status = '❌';
        const diff = vals[sid].visits - vals.master.visits;
        issues.push(`OPD ${label}: ${sid} visits=${vals[sid].visits} vs Master=${vals.master.visits} (Δ${diff})`);
      }
    }
    line += `  ${status}`;
    console.log(line);
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST 7: Finance / Revenue Checksum
  // ═══════════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('  [7/8] Revenue Checksum — รายได้ OPD + IPD ย้อนหลัง 3 เดือน');
  console.log('═══════════════════════════════════════════════════════════════════════════');

  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yr = d.getFullYear();
    const mn = d.getMonth() + 1;
    const start = `${yr}-${String(mn).padStart(2, '0')}-01`;
    const end = `${yr}-${String(mn).padStart(2, '0')}-${new Date(yr, mn, 0).getDate()}`;
    const label = `${yr}-${String(mn).padStart(2, '0')}`;

    const vals = {};
    for (const id of active) {
      try {
        const opd = await q1(pools[id],
          `SELECT ROUND(SUM(COALESCE(income,0)),0) AS rev, ROUND(SUM(COALESCE(uc_money,0)),0) AS uc,
                  ROUND(SUM(COALESCE(inc_drug,0)),0) AS drug, ROUND(SUM(COALESCE(inc_lab,0)),0) AS lab
           FROM vn_stat WHERE vstdate >= ? AND vstdate <= ?`, [start, end]);
        const ipd = await q1(pools[id],
          `SELECT ROUND(SUM(COALESCE(income,0)),0) AS rev
           FROM an_stat WHERE dchdate >= ? AND dchdate <= ?`, [start, end]);
        vals[id] = {
          opd_rev: Number(opd?.rev || 0), uc: Number(opd?.uc || 0),
          drug: Number(opd?.drug || 0), lab: Number(opd?.lab || 0),
          ipd_rev: Number(ipd?.rev || 0),
        };
      } catch {
        vals[id] = { opd_rev: 0, uc: 0, drug: 0, lab: 0, ipd_rev: 0 };
      }
    }

    console.log(`  ── ${label} ──`);
    let status = '✅';
    for (const id of active) {
      const v = vals[id];
      console.log(`    ${id.padEnd(7)}: OPD Rev=${fmt(v.opd_rev).padStart(12)} | UC=${fmt(v.uc).padStart(10)} | Drug=${fmt(v.drug).padStart(10)} | Lab=${fmt(v.lab).padStart(10)} | IPD Rev=${fmt(v.ipd_rev).padStart(12)}`);
    }
    for (const sid of slaves) {
      const m = vals.master, s = vals[sid];
      if (m.opd_rev !== s.opd_rev || m.ipd_rev !== s.ipd_rev) {
        status = '❌';
        if (m.opd_rev !== s.opd_rev) issues.push(`Revenue ${label}: ${sid} OPD=${s.opd_rev} vs Master=${m.opd_rev}`);
        if (m.ipd_rev !== s.ipd_rev) issues.push(`Revenue ${label}: ${sid} IPD=${s.ipd_rev} vs Master=${m.ipd_rev}`);
      }
    }
    console.log(`    Status: ${status}`);
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST 8: Auto-Increment / Latest IDs
  // ═══════════════════════════════════════════════════════════════
  console.log('\n═══════════════════════════════════════════════════════════════════════════');
  console.log('  [8/8] Latest Record IDs — ตรวจสอบ auto-increment sync');
  console.log('═══════════════════════════════════════════════════════════════════════════');

  const ID_QUERIES = [
    { label: 'Latest VN (ovst)', sql: 'SELECT MAX(vn) AS id FROM ovst' },
    { label: 'Latest AN (ipt)', sql: 'SELECT MAX(an) AS id FROM ipt' },
    { label: 'Latest HN (patient)', sql: 'SELECT MAX(hn) AS id FROM patient' },
    { label: 'Latest lab_order_number', sql: 'SELECT MAX(lab_order_number) AS id FROM lab_head' },
    { label: 'Latest xray_order_number', sql: 'SELECT MAX(xray_order_number) AS id FROM xray_head' },
  ];

  for (const iq of ID_QUERIES) {
    const vals = {};
    for (const id of active) {
      try {
        const r = await q1(pools[id], iq.sql);
        vals[id] = r?.id || 'NULL';
      } catch {
        vals[id] = 'ERR';
      }
    }

    let line = `  ${iq.label.padEnd(30)}`;
    let status = '✅';
    for (const id of active) {
      line += `  ${id}=${String(vals[id]).padStart(12)}`;
    }
    for (const sid of slaves) {
      if (String(vals[sid]) !== String(vals.master)) {
        status = '⚠️';
        warnings.push(`${iq.label}: ${sid}=${vals[sid]} vs Master=${vals.master}`);
      }
    }
    line += `  ${status}`;
    console.log(line);
  }

  // ═══════════════════════════════════════════════════════════════
  // FINAL SUMMARY
  // ═══════════════════════════════════════════════════════════════
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  FINAL SUMMARY — อ้างอิง Master เป็นหลัก');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Servers: ${active.map(id => SERVERS[id].label).join(' | ')}`);
  console.log(`  Reference: Master (10.109.0.240)`);

  if (issues.length === 0 && warnings.length === 0) {
    console.log('\n  🎉 ไม่พบความผิดปกติ — ทุก Server ข้อมูลตรงกับ Master 100%\n');
  } else {
    if (issues.length > 0) {
      console.log(`\n  ❌ Critical Issues (${issues.length}):`);
      issues.forEach(i => console.log(`    ❌ ${i}`));
    }
    if (warnings.length > 0) {
      console.log(`\n  ⚠️  Warnings (${warnings.length}):`);
      warnings.forEach(w => console.log(`    ⚠️  ${w}`));
    }

    // Server health score
    console.log('\n  ── Server Health Score ──');
    for (const sid of slaves) {
      const sIssues = issues.filter(i => i.includes(sid)).length;
      const sWarnings = warnings.filter(w => w.includes(sid)).length;
      const score = Math.max(0, 100 - sIssues * 10 - sWarnings * 2);
      const bar = '█'.repeat(Math.round(score / 5)) + '░'.repeat(20 - Math.round(score / 5));
      const emoji = score >= 95 ? '🟢' : score >= 80 ? '🟡' : '🔴';
      console.log(`    ${emoji} ${SERVERS[sid].label}: ${bar} ${score}/100 (${sIssues} issues, ${sWarnings} warnings)`);
    }
    console.log('');
  }

  for (const id of active) await pools[id].end();
  process.exit(issues.length > 0 ? 1 : 0);
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
