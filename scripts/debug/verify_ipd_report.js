// ============================================================
// Verify IPD Compare Report — Cross-check against HOSxP Master
// ============================================================
import { dbQuery, dbQueryOne } from './server/db/mysql.js';

const FY1 = 2567; // ปีงบ 2567
const FY2 = 2568; // ปีงบ 2568

function fyStartCE(beFY) {
  return beFY - 544;
}

const FISCAL_MONTHS = [
  { mo: 10, label: 'ต.ค.' },
  { mo: 11, label: 'พ.ย.' },
  { mo: 12, label: 'ธ.ค.' },
  { mo: 1, label: 'ม.ค.' },
  { mo: 2, label: 'ก.พ.' },
  { mo: 3, label: 'มี.ค.' },
  { mo: 4, label: 'เม.ย.' },
  { mo: 5, label: 'พ.ค.' },
  { mo: 6, label: 'มิ.ย.' },
  { mo: 7, label: 'ก.ค.' },
  { mo: 8, label: 'ส.ค.' },
  { mo: 9, label: 'ก.ย.' },
];

// Report values for verification (from screenshot)
const REPORT = {
  fy1: [
    { mo: 'ต.ค.', admits: 549, los: 2393, alos: 4.36, occ: 64.33, beds: 77.19, adjrw: 236.71, cmi: 0.74 },
    { mo: 'พ.ย.', admits: 549, los: 2015, alos: 3.67, occ: 55.97, beds: 67.17, adjrw: 428.08, cmi: 0.82 },
    { mo: 'ธ.ค.', admits: 555, los: 1926, alos: 3.47, occ: 51.77, beds: 62.13, adjrw: 454.88, cmi: 0.82 },
    { mo: 'ม.ค.', admits: 525, los: 2005, alos: 3.82, occ: 53.90, beds: 64.68, adjrw: 435.08, cmi: 0.83 },
    { mo: 'ก.พ.', admits: 461, los: 1757, alos: 3.81, occ: 50.49, beds: 60.59, adjrw: 400.94, cmi: 0.87 },
    { mo: 'มี.ค.', admits: 437, los: 1741, alos: 3.98, occ: 46.80, beds: 56.16, adjrw: 374.38, cmi: 0.86 },
    { mo: 'เม.ย.', admits: 445, los: 1875, alos: 4.21, occ: 52.08, beds: 62.50, adjrw: 391.21, cmi: 0.88 },
    { mo: 'พ.ค.', admits: 394, los: 2061, alos: 5.23, occ: 55.40, beds: 66.48, adjrw: 355.95, cmi: 0.90 },
    { mo: 'มิ.ย.', admits: 365, los: 1543, alos: 4.23, occ: 42.86, beds: 51.43, adjrw: 330.25, cmi: 0.90 },
    { mo: 'ก.ค.', admits: 500, los: 2077, alos: 4.15, occ: 55.83, beds: 67.00, adjrw: 423.50, cmi: 0.85 },
    { mo: 'ส.ค.', admits: 528, los: 2162, alos: 4.09, occ: 58.12, beds: 69.74, adjrw: 459.18, cmi: 0.87 },
    { mo: 'ก.ย.', admits: 535, los: 2180, alos: 4.07, occ: 60.56, beds: 72.67, adjrw: 447.47, cmi: 0.84 },
  ],
  fy2: [
    { mo: 'ต.ค.', admits: 551, los: 2350, alos: 4.26, occ: 63.17, beds: 75.81, adjrw: 505.69, cmi: 0.92 },
    { mo: 'พ.ย.', admits: 480, los: 1835, alos: 3.82, occ: 50.97, beds: 61.17, adjrw: 412.82, cmi: 0.86 },
    { mo: 'ธ.ค.', admits: 477, los: 1967, alos: 4.12, occ: 52.88, beds: 63.45, adjrw: 447.58, cmi: 0.94 },
    { mo: 'ม.ค.', admits: 542, los: 2419, alos: 4.46, occ: 65.03, beds: 78.03, adjrw: 513.16, cmi: 0.95 },
    { mo: 'ก.พ.', admits: 548, los: 3269, alos: 5.97, occ: 97.29, beds: 116.75, adjrw: 634.18, cmi: 1.16 },
    { mo: 'มี.ค.', admits: 509, los: 2521, alos: 4.95, occ: 67.77, beds: 81.32, adjrw: 541.37, cmi: 1.06 },
    { mo: 'เม.ย.', admits: 451, los: 1810, alos: 4.01, occ: 50.28, beds: 60.33, adjrw: 391.81, cmi: 0.87 },
    { mo: 'พ.ค.', admits: 454, los: 2192, alos: 4.83, occ: 58.92, beds: 70.71, adjrw: 470.96, cmi: 1.04 },
    { mo: 'มิ.ย.', admits: 463, los: 2490, alos: 5.38, occ: 69.17, beds: 83.00, adjrw: 445.81, cmi: 0.96 },
    { mo: 'ก.ค.', admits: 456, los: 2227, alos: 4.88, occ: 59.87, beds: 71.84, adjrw: 435.71, cmi: 0.96 },
    { mo: 'ส.ค.', admits: 499, los: 2737, alos: 5.48, occ: 73.58, beds: 88.29, adjrw: 508.30, cmi: 1.02 },
    { mo: 'ก.ย.', admits: 519, los: 2311, alos: 4.45, occ: 64.19, beds: 77.03, adjrw: 444.59, cmi: 0.86 },
  ],
};

async function verify() {
  const TOTAL_BEDS = 120;
  const issues = [];
  const ok = [];

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  IPD Report Deep Verification — ปีงบ 2567 vs 2568');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // ── 1. Verify monthly Admit counts directly ──
  console.log('\n📊 [1/6] ตรวจสอบจำนวน Admit รายเดือน...');
  for (const fy of [FY1, FY2]) {
    const fyStart = fyStartCE(fy);
    const reportData = fy === FY1 ? REPORT.fy1 : REPORT.fy2;

    for (let i = 0; i < FISCAL_MONTHS.length; i++) {
      const fm = FISCAL_MONTHS[i];
      const calYear = fm.mo >= 10 ? fyStart : fyStart + 1;
      const startDate = `${calYear}-${String(fm.mo).padStart(2, '0')}-01`;
      const endDate = `${calYear}-${String(fm.mo).padStart(2, '0')}-${new Date(calYear, fm.mo, 0).getDate()}`;

      const row = await dbQueryOne(
        `SELECT COUNT(DISTINCT an) AS admits
         FROM ipt
         WHERE dchdate IS NOT NULL
           AND ward != '06'
           AND dchdate >= ? AND dchdate <= ?`,
        [startDate, endDate]
      );

      const dbAdmits = Number(row?.admits || 0);
      const rptAdmits = reportData[i].admits;
      const match = dbAdmits === rptAdmits;

      if (!match) {
        const diff = dbAdmits - rptAdmits;
        issues.push(`❌ ปีงบ ${fy} ${fm.label}: Admit DB=${dbAdmits} vs Report=${rptAdmits} (ต่าง ${diff > 0 ? '+' : ''}${diff})`);
        console.log(`  ❌ ปีงบ ${fy} ${fm.label}: DB=${dbAdmits} Report=${rptAdmits} (Δ${diff > 0 ? '+' : ''}${diff})`);
      } else {
        ok.push(`✅ ปีงบ ${fy} ${fm.label}: Admit=${dbAdmits}`);
      }
    }
  }

  // ── 2. Verify total patient days (LOS) for selected months ──
  console.log('\n📊 [2/6] ตรวจสอบวันนอน (LOS) spot check...');
  const spotChecks = [
    { fy: FY2, moIdx: 4, label: 'ก.พ. 2568 (peak)' },   // Feb - highest occupancy
    { fy: FY2, moIdx: 8, label: 'มิ.ย. 2568' },           // Jun
    { fy: FY1, moIdx: 0, label: 'ต.ค. 2566' },            // Oct FY1
    { fy: FY1, moIdx: 7, label: 'พ.ค. 2567' },            // May FY1
  ];

  for (const sc of spotChecks) {
    const fyStart = fyStartCE(sc.fy);
    const fm = FISCAL_MONTHS[sc.moIdx];
    const calYear = fm.mo >= 10 ? fyStart : fyStart + 1;
    const startDate = `${calYear}-${String(fm.mo).padStart(2, '0')}-01`;
    const endDate = `${calYear}-${String(fm.mo).padStart(2, '0')}-${new Date(calYear, fm.mo, 0).getDate()}`;

    const row = await dbQueryOne(
      `SELECT SUM(DATEDIFF(dchdate, regdate)) AS total_los
       FROM ipt
       WHERE dchdate IS NOT NULL
         AND ward != '06'
         AND dchdate >= ? AND dchdate <= ?`,
      [startDate, endDate]
    );

    const dbLOS = Number(row?.total_los || 0);
    const rptData = sc.fy === FY1 ? REPORT.fy1[sc.moIdx] : REPORT.fy2[sc.moIdx];
    const rptLOS = rptData.los;
    const match = dbLOS === rptLOS;

    if (!match) {
      issues.push(`❌ ${sc.label}: LOS DB=${dbLOS} vs Report=${rptLOS} (Δ${dbLOS - rptLOS})`);
      console.log(`  ❌ ${sc.label}: LOS DB=${dbLOS} Report=${rptLOS} (Δ${dbLOS - rptLOS})`);
    } else {
      ok.push(`✅ ${sc.label}: LOS=${dbLOS}`);
      console.log(`  ✅ ${sc.label}: LOS=${dbLOS}`);
    }
  }

  // ── 3. Verify AdjRW / CMI calculation ──
  console.log('\n📊 [3/6] ตรวจสอบ AdjRW & CMI...');
  for (const sc of spotChecks) {
    const fyStart = fyStartCE(sc.fy);
    const fm = FISCAL_MONTHS[sc.moIdx];
    const calYear = fm.mo >= 10 ? fyStart : fyStart + 1;
    const startDate = `${calYear}-${String(fm.mo).padStart(2, '0')}-01`;
    const endDate = `${calYear}-${String(fm.mo).padStart(2, '0')}-${new Date(calYear, fm.mo, 0).getDate()}`;

    const row = await dbQueryOne(
      `SELECT
         ROUND(SUM(COALESCE(i.adjrw, a.rw, 0)), 2) AS sum_adjrw,
         ROUND(AVG(CASE WHEN COALESCE(i.adjrw, a.rw) > 0 THEN COALESCE(i.adjrw, a.rw) END), 2) AS cmi
       FROM ipt i
       LEFT JOIN an_stat a ON i.an = a.an
       WHERE i.dchdate IS NOT NULL
         AND i.ward != '06'
         AND i.dchdate >= ? AND i.dchdate <= ?`,
      [startDate, endDate]
    );

    const dbAdjRW = Number(row?.sum_adjrw || 0);
    const dbCMI = Number(row?.cmi || 0);
    const rptData = sc.fy === FY1 ? REPORT.fy1[sc.moIdx] : REPORT.fy2[sc.moIdx];

    const adjrwMatch = Math.abs(dbAdjRW - rptData.adjrw) < 0.5;
    const cmiMatch = Math.abs(dbCMI - rptData.cmi) < 0.02;

    if (!adjrwMatch) {
      issues.push(`❌ ${sc.label}: AdjRW DB=${dbAdjRW} vs Report=${rptData.adjrw}`);
      console.log(`  ❌ ${sc.label}: AdjRW DB=${dbAdjRW} Report=${rptData.adjrw}`);
    } else {
      ok.push(`✅ ${sc.label}: AdjRW=${dbAdjRW}`);
      console.log(`  ✅ ${sc.label}: AdjRW=${dbAdjRW} ≈ ${rptData.adjrw}`);
    }

    if (!cmiMatch) {
      issues.push(`❌ ${sc.label}: CMI DB=${dbCMI} vs Report=${rptData.cmi}`);
      console.log(`  ❌ ${sc.label}: CMI DB=${dbCMI} Report=${rptData.cmi}`);
    } else {
      ok.push(`✅ ${sc.label}: CMI=${dbCMI}`);
      console.log(`  ✅ ${sc.label}: CMI=${dbCMI} ≈ ${rptData.cmi}`);
    }
  }

  // ── 4. Verify occupancy rate calculation ──
  console.log('\n📊 [4/6] ตรวจสอบ Occupancy Rate (สูตรคำนวณ)...');
  // ก.พ. 2568: LOS=3269, Days=28 (2025 is not leap), Beds=120
  const feb2025Days = new Date(2025, 2, 0).getDate(); // Feb 2025
  const febOccCalc = Math.round((3269 / (TOTAL_BEDS * feb2025Days)) * 10000) / 100;
  const febActiveBeds = Math.round((3269 / feb2025Days) * 100) / 100;
  console.log(`  ก.พ. 2568: LOS=3269, Days=${feb2025Days}, Beds=${TOTAL_BEDS}`);
  console.log(`  คำนวณ Occ = ${3269}/(${TOTAL_BEDS}×${feb2025Days}) × 100 = ${febOccCalc}% (Report: 97.29%)`);
  console.log(`  คำนวณ Active Beds = ${3269}/${feb2025Days} = ${febActiveBeds} (Report: 116.75)`);
  if (Math.abs(febOccCalc - 97.29) < 0.1) {
    ok.push('✅ ก.พ. 2568 Occupancy Rate calculation correct');
    console.log('  ✅ สูตร Occupancy Rate ถูกต้อง');
  } else {
    issues.push(`❌ ก.พ. 2568 Occupancy Rate mismatch: calc=${febOccCalc} vs report=97.29`);
    console.log(`  ❌ Occupancy Rate ไม่ตรง: calc=${febOccCalc} vs report=97.29`);
  }

  // ── 5. Check ward='06' exclusion count ──
  console.log('\n📊 [5/6] ตรวจสอบ ward=06 exclusion...');
  for (const fy of [FY1, FY2]) {
    const start = `${fyStartCE(fy)}-10-01`;
    const end = `${fyStartCE(fy) + 1}-09-30`;

    const excluded = await dbQueryOne(
      `SELECT COUNT(DISTINCT an) AS cnt
       FROM ipt
       WHERE dchdate IS NOT NULL
         AND ward = '06'
         AND dchdate >= ? AND dchdate <= ?`,
      [start, end]
    );

    const total = await dbQueryOne(
      `SELECT COUNT(DISTINCT an) AS cnt
       FROM ipt
       WHERE dchdate IS NOT NULL
         AND dchdate >= ? AND dchdate <= ?`,
      [start, end]
    );

    console.log(`  ปีงบ ${fy}: Ward 06 excluded = ${excluded?.cnt || 0} cases (จากทั้งหมด ${total?.cnt || 0})`);
  }

  // ── 6. Grand total verification ──
  console.log('\n📊 [6/6] ตรวจสอบยอดรวมทั้งปี...');
  for (const fy of [FY1, FY2]) {
    const start = `${fyStartCE(fy)}-10-01`;
    const end = `${fyStartCE(fy) + 1}-09-30`;

    const row = await dbQueryOne(
      `SELECT
         COUNT(DISTINCT i.an) AS admits,
         SUM(DATEDIFF(i.dchdate, i.regdate)) AS total_los,
         ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 2) AS alos,
         ROUND(SUM(COALESCE(i.adjrw, a.rw, 0)), 2) AS sum_adjrw,
         ROUND(AVG(CASE WHEN COALESCE(i.adjrw, a.rw) > 0 THEN COALESCE(i.adjrw, a.rw) END), 2) AS cmi
       FROM ipt i
       LEFT JOIN an_stat a ON i.an = a.an
       WHERE i.dchdate IS NOT NULL
         AND i.ward != '06'
         AND i.dchdate >= ? AND i.dchdate <= LEAST(?, CURDATE())`,
      [start, end]
    );

    const rptTotal = fy === FY1
      ? { admits: 5843, los: 23735, alos: 4.06, adjrw: 4737.63, cmi: 0.85 }
      : { admits: 5949, los: 28128, alos: 4.73, adjrw: 5751.98, cmi: 0.97 };

    const dbAdmits = Number(row?.admits || 0);
    const dbLOS = Number(row?.total_los || 0);
    const dbALOS = Number(row?.alos || 0);
    const dbAdjRW = Number(row?.sum_adjrw || 0);
    const dbCMI = Number(row?.cmi || 0);

    console.log(`\n  ── ปีงบ ${fy} ──`);
    console.log(`  Admit:  DB=${dbAdmits.toLocaleString()} | Report=${rptTotal.admits.toLocaleString()} | ${dbAdmits === rptTotal.admits ? '✅' : '❌ Δ' + (dbAdmits - rptTotal.admits)}`);
    console.log(`  LOS:    DB=${dbLOS.toLocaleString()} | Report=${rptTotal.los.toLocaleString()} | ${dbLOS === rptTotal.los ? '✅' : '❌ Δ' + (dbLOS - rptTotal.los)}`);
    console.log(`  ALOS:   DB=${dbALOS} | Report=${rptTotal.alos} | ${Math.abs(dbALOS - rptTotal.alos) < 0.02 ? '✅' : '❌'}`);
    console.log(`  AdjRW:  DB=${dbAdjRW} | Report=${rptTotal.adjrw} | ${Math.abs(dbAdjRW - rptTotal.adjrw) < 1 ? '✅' : '❌ Δ' + (dbAdjRW - rptTotal.adjrw).toFixed(2)}`);
    console.log(`  CMI:    DB=${dbCMI} | Report=${rptTotal.cmi} | ${Math.abs(dbCMI - rptTotal.cmi) < 0.02 ? '✅' : '❌'}`);

    if (dbAdmits !== rptTotal.admits) issues.push(`❌ ปีงบ ${fy} Total Admit: DB=${dbAdmits} vs Report=${rptTotal.admits}`);
    if (dbLOS !== rptTotal.los) issues.push(`❌ ปีงบ ${fy} Total LOS: DB=${dbLOS} vs Report=${rptTotal.los}`);
  }

  // ── Summary ──
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  ✅ Passed: ${ok.length}`);
  console.log(`  ❌ Issues: ${issues.length}`);
  if (issues.length > 0) {
    console.log('\n  Issues found:');
    issues.forEach(i => console.log(`    ${i}`));
  } else {
    console.log('\n  🎉 ข้อมูลรายงาน IPD Compare ตรงกับ Database ทุกรายการ!');
  }

  process.exit(0);
}

verify().catch(err => {
  console.error('Verification failed:', err.message);
  process.exit(1);
});
