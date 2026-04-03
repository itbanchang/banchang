// ============================================================
// BCH 360° Intelligence V.10 - Revenue Fiscal Year Helpers
// ============================================================
import { dbQuery } from '../db/mysql.js';

const MONTH_TH_FISCAL = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function getFiscalConfig(customStart, customEnd) {
    const now = new Date();
    const cm = now.getMonth() + 1, cy = now.getFullYear();
    const cfs = cm >= 10 ? cy : cy - 1;

    if (customStart && customEnd && DATE_RE.test(customStart) && DATE_RE.test(customEnd)) {
        // Anchor fiscal year from end date, always produce 3 fiscal years for comparison
        const s = new Date(customStart), e = new Date(customEnd);
        const eFY = e.getMonth() >= 9 ? e.getFullYear() : e.getFullYear() - 1;

        // Calculate month/day offsets relative to anchor FY for clipping each FY
        const sYearOff = s.getFullYear() - eFY;
        const sMo = String(s.getMonth() + 1).padStart(2, '0');
        const sDay = String(s.getDate()).padStart(2, '0');
        const eYearOff = e.getFullYear() - eFY;
        const eMo = String(e.getMonth() + 1).padStart(2, '0');
        const eDay = String(e.getDate()).padStart(2, '0');

        const fiscalYears = [];
        for (let o = 2; o >= 0; o--) {
            const sy = eFY - o;
            // queryStart/queryEnd: same month-day window shifted to this FY
            const qStart = `${sy + sYearOff}-${sMo}-${sDay}`;
            const qEnd = `${sy + eYearOff}-${eMo}-${eDay}`;
            fiscalYears.push({
                startYear: sy, startDate: `${sy}-10-01`, endDate: `${sy + 1}-09-30`,
                fiscalBE: sy + 543 + 1,
                queryStart: qStart, queryEnd: qEnd,
            });
        }
        return { fiscalYears, globalStart: fiscalYears[0].queryStart, globalEnd: customEnd };
    }

    const fiscalYears = [];
    for (let o = 2; o >= 0; o--) {
        const sy = cfs - o;
        fiscalYears.push({ startYear: sy, startDate: `${sy}-10-01`, endDate: `${sy + 1}-09-30`, fiscalBE: sy + 543 + 1 });
    }
    return { fiscalYears, globalStart: fiscalYears[0].startDate, globalEnd: `${cfs + 1}-09-30` };
}

export function buildFiscalResult(rows, fiscalYears, dataSource) {
    const m = new Map();
    for (const r of (rows || [])) m.set(`${r.yr}-${r.mo}`, r);
    const result = fiscalYears.map(fy => {
        const months = []; let tR = 0, tV = 0, tP = 0;
        for (let i = 0; i < 12; i++) {
            const mNum = ((9 + i) % 12) + 1, yNum = mNum >= 10 ? fy.startYear : fy.startYear + 1;
            const row = m.get(`${yNum}-${mNum}`);
            const rev = Math.round(Number(row?.revenue || 0)), vis = Number(row?.visit_count || 0), pat = Number(row?.patient_count || 0);
            tR += rev; tV += vis; tP += pat;
            months.push({ month: MONTH_TH_FISCAL[mNum], month_num: mNum, year_num: yNum, revenue: rev, visits: vis, patients: pat, has_data: vis > 0 });
        }
        return {
            fiscal_year_be: fy.fiscalBE, fiscal_label: `ปีงบ ${fy.fiscalBE}`, start_date: fy.startDate, end_date: fy.endDate,
            total_revenue: tR, total_visits: tV, total_patients: tP, avg_revenue_per_visit: tV > 0 ? Math.round(tR / tV) : 0, months
        };
    });

    // ---- Comparable Revenue: fair YoY comparison ----
    // Find which month indices have data in the LATEST fiscal year
    const latest = result[result.length - 1];
    const comparableIdx = latest.months.map((m, i) => m.has_data ? i : -1).filter(i => i >= 0);
    const comparableMonthCount = comparableIdx.length;

    // For each fiscal year, sum revenue only for those same month indices
    for (const fy of result) {
        let compRev = 0, compVis = 0;
        for (const i of comparableIdx) {
            compRev += fy.months[i]?.revenue || 0;
            compVis += fy.months[i]?.visits || 0;
        }
        fy.comparable_revenue = compRev;
        fy.comparable_visits = compVis;
        fy.comparable_months = comparableMonthCount;
    }

    return { data_source: dataSource, fiscal_years: result, timestamp: new Date().toISOString() };
}

// AI-4: Parameterized SQL — no more string interpolation
import { dbQueryHeavy } from '../db/mysql.js';

export async function getRevenueFiscal(mainDep, dataSource, customStart, customEnd) {
    const { fiscalYears, globalStart, globalEnd } = getFiscalConfig(customStart, customEnd);
    const cacheKey = `revenueFiscal_${Array.isArray(mainDep) ? mainDep.join('_') : (mainDep || 'all')}`;
    const ttl = 60; // 1 hour cache for historical data

    if (mainDep) {
        const isArray = Array.isArray(mainDep);
        const depParams = isArray ? mainDep : [mainDep];
        const placeholders = isArray ? mainDep.map(() => '?').join(',') : '?';

        // FAST PATH: Do the join in Javascript to bypass MariaDB query planner timeouts on heavy 3 year cross-table joins
        const ovstRows = await dbQueryHeavy(`dental_ovst_vns_${cacheKey}`, 360,
            `SELECT vn, hn FROM ovst WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND main_dep IN (${placeholders})`,
            [globalStart, globalEnd, ...depParams], { timeoutMs: 25000 });

        const vns = new Set(ovstRows.map(r => r.vn));

        const vnStatRows = await dbQueryHeavy(`dental_vnstat_${cacheKey}`, 360,
            `SELECT vn, hn, vstdate, income FROM vn_stat WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND income > 0`,
            [globalStart, globalEnd], { timeoutMs: 25000 });

        // Filter vnStat locally
        const filtered = vnStatRows.filter(r => vns.has(r.vn));

        // Aggregate into yr/mo structure locally
        const aggMap = {};
        for (const row of filtered) {
            const dt = new Date(row.vstdate);
            const key = `${dt.getFullYear()}-${dt.getMonth() + 1}`;
            if (!aggMap[key]) aggMap[key] = { yr: dt.getFullYear(), mo: dt.getMonth() + 1, revenue: 0, vns: new Set(), hns: new Set() };
            aggMap[key].revenue += Number(row.income) || 0;
            aggMap[key].vns.add(row.vn);
            aggMap[key].hns.add(row.hn);
        }

        const finalRows = Object.values(aggMap).map(v => ({ yr: v.yr, mo: v.mo, revenue: v.revenue, visit_count: v.vns.size, patient_count: v.hns.size }));
        finalRows.sort((a, b) => a.yr - b.yr || a.mo - b.mo);

        return buildFiscalResult(finalRows, fiscalYears, dataSource);
    }
    const sql = `SELECT YEAR(vstdate) AS yr, MONTH(vstdate) AS mo, SUM(income) AS revenue, COUNT(DISTINCT vn) AS visit_count, COUNT(DISTINCT hn) AS patient_count
     FROM vn_stat WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) GROUP BY YEAR(vstdate), MONTH(vstdate) ORDER BY yr, mo`;
    return buildFiscalResult(await dbQueryHeavy(cacheKey, ttl, sql, [globalStart, globalEnd], { timeoutMs: 25000 }), fiscalYears, dataSource);
}

/**
 * รายได้แยกตามสิทธิ์ ระดับปีงบประมาณ (3 ปี × top payers)
 */
export async function getRevenueFiscalByPayer(customStart, customEnd) {
    const { fiscalYears, globalStart, globalEnd } = getFiscalConfig(customStart, customEnd);

    // Step 1: ดึง payer mapping (เล็ก ~50 rows)
    const payerMap = {};
    const ptRows = await dbQueryHeavy('ptypeMap', 1440, `SELECT pttype, name FROM pttype`, [], { timeoutMs: 5000 });
    for (const r of (ptRows || [])) payerMap[r.pttype] = r.name;

    // Step 2: ดึงจาก vn_stat.pttype โดยตรง (ไม่ JOIN ovst — เร็วกว่ามาก)
    const allRows = [];
    for (const fy of fiscalYears) {
        const qStart = fy.queryStart || fy.startDate;
        const qEnd = fy.queryEnd || fy.endDate;
        const fyRows = await dbQueryHeavy(`revByPayer_v2_${fy.fiscalBE}_${qStart}_${qEnd}`, 120, `
            SELECT YEAR(v.vstdate) AS yr, MONTH(v.vstdate) AS mo,
                   COALESCE(v.pttype, '??') AS payer_code,
                   SUM(v.income) AS revenue,
                   COUNT(DISTINCT v.vn) AS visit_count
            FROM vn_stat v
            WHERE v.vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND v.income > 0
            GROUP BY YEAR(v.vstdate), MONTH(v.vstdate), v.pttype
        `, [qStart, qEnd], { timeoutMs: 25000 }).catch(() => []);
        allRows.push(...(fyRows || []));
    }
    const rows = allRows;

    // Map payer_code → name in JS (avoid slow JOIN)
    // After merge, use the target pttype's name
    for (const r of (rows || [])) {
        const mergedCode = PTTYPE_MERGE_MAP[r.payer_code];
        r.payer = payerMap[mergedCode || r.payer_code] || payerMap[r.payer_code] || 'ไม่ระบุสิทธิ์';
        if (mergedCode) r.payer_code = mergedCode; // reassign to merged code
    }

    // Normalize key function + map merged/legacy pttypes for fair YoY comparison
    // สิทธิ์ที่ถูกยุบรวมเข้า UC ตั้งแต่ปีงบ 2568:
    //   77 (ผู้สูงอายุ), 71 (เด็ก 0-12), 72 (ผู้มีรายได้น้อย), 74 (ผู้พิการ),
    //   73 (นักเรียน), 33 (อสม.), 32 (ผู้นำชุมชน), 75 (ทหารผ่านศึก), 76 (ภิกษุ)
    // → ยุบเข้า A0 (UC ไม่ร่วมจ่าย) เพื่อเปรียบเทียบ fair
    const PTTYPE_MERGE_MAP = {
      '77': 'A0', '71': 'A0', '72': 'A0', '74': 'A0', '73': 'A0',
      '33': 'A0', '32': 'A0', '75': 'A0', '76': 'A0',
      // ตจว. variants → map to their UC equivalent
      '87': 'A1', '91': 'A2', '92': 'A2', '93': 'A2', '94': 'A2',
      '81': 'A1', '82': 'A1', '83': 'A1', '84': 'A1',
      '95': 'A2', '96': 'A2', '13': 'A2', '53': 'A2',
    };
    const pKey = (code) => {
      if (!code || code === '??') return '_none_';
      return PTTYPE_MERGE_MAP[code] || code;
    };

    // Aggregate by payer across all months → get top payers by total revenue
    const payerTotals = {};
    for (const r of (rows || [])) {
        const key = pKey(r.payer_code);
        if (!payerTotals[key]) payerTotals[key] = { payer: r.payer, payer_code: r.payer_code, revenue: 0, visits: 0 };
        payerTotals[key].revenue += Number(r.revenue || 0);
        payerTotals[key].visits += Number(r.visit_count || 0);
    }
    const topPayers = Object.values(payerTotals).sort((a, b) => b.revenue - a.revenue).slice(0, 15);
    const topPayerKeys = new Set(topPayers.map(p => pKey(p.payer_code)));

    // Pre-index rows by yr-mo-payer for O(1) lookup (was O(n) scan per month×payer)
    const rowIndex = new Map(); // key: "yr-mo-payerKey" → { revenue, visits }
    for (const r of (rows || [])) {
        const key = pKey(r.payer_code);
        if (!topPayerKeys.has(key)) continue;
        const mapKey = `${r.yr}-${r.mo}-${key}`;
        const existing = rowIndex.get(mapKey);
        const rev = Number(r.revenue || 0);
        const vis = Number(r.visit_count || 0);
        if (existing) {
            existing.revenue += rev;
            existing.visits += vis;
        } else {
            rowIndex.set(mapKey, { revenue: rev, visits: vis });
        }
    }

    // Build fiscal year structure per payer — O(FY × 12 × topPayers) with O(1) lookups
    const result = fiscalYears.map(fy => {
        const payerData = {};
        for (const tp of topPayers) {
            payerData[pKey(tp.payer_code)] = { payer: tp.payer, payer_code: tp.payer_code, total_revenue: 0, total_visits: 0, months: {} };
        }

        for (let i = 0; i < 12; i++) {
            const mNum = ((9 + i) % 12) + 1;
            const yNum = mNum >= 10 ? fy.startYear : fy.startYear + 1;

            for (const tp of topPayers) {
                const key = pKey(tp.payer_code);
                const entry = rowIndex.get(`${yNum}-${mNum}-${key}`);
                if (!entry) continue;
                payerData[key].total_revenue += entry.revenue;
                payerData[key].total_visits += entry.visits;
                payerData[key].months[mNum] = (payerData[key].months[mNum] || 0) + entry.revenue;
            }
        }

        return {
            fiscal_year_be: fy.fiscalBE,
            fiscal_label: `ปีงบ ${fy.fiscalBE}`,
            query_start: fy.queryStart || fy.startDate,
            query_end: fy.queryEnd || fy.endDate,
            payers: Object.values(payerData).sort((a, b) => b.total_revenue - a.total_revenue),
        };
    });

    // ---- Comparable Period: fair YoY per payer ----
    // Find which fiscal month indices have ANY revenue in the LATEST fiscal year (across all payers)
    const latestFY = result[result.length - 1];
    const comparableMonthNums = new Set();
    for (const p of latestFY.payers) {
        for (const [mNum, rev] of Object.entries(p.months)) {
            if (rev > 0) comparableMonthNums.add(Number(mNum));
        }
    }
    const comparableMonths = comparableMonthNums.size;

    // For each FY + payer, compute comparable_revenue (only months present in latest FY)
    for (const fy of result) {
        for (const p of fy.payers) {
            let compRev = 0, compVis = 0;
            for (const mNum of comparableMonthNums) {
                compRev += p.months[mNum] || 0;
            }
            p.comparable_revenue = compRev;
        }
        // Also add FY-level comparable info
        fy.comparable_months = comparableMonths;
    }

    return {
        data_source: 'HOSxP XE · vn_stat + pttype',
        fiscal_years: result,
        top_payers: topPayers,
        comparable_months: comparableMonths,
        timestamp: new Date().toISOString(),
    };
}
