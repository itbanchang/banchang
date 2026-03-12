// ============================================================
// BCH 360° Intelligence V.10 - Revenue Fiscal Year Helpers
// ============================================================
import { dbQuery } from '../db/mysql.js';

const MONTH_TH_FISCAL = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

export function getFiscalConfig() {
    const now = new Date();
    const cm = now.getMonth() + 1, cy = now.getFullYear();
    const cfs = cm >= 10 ? cy : cy - 1;
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
export async function getRevenueFiscal(mainDep, dataSource) {
    const { fiscalYears, globalStart, globalEnd } = getFiscalConfig();
    if (mainDep) {
        const sql = `SELECT YEAR(o.vstdate) AS yr, MONTH(o.vstdate) AS mo, SUM(v.income) AS revenue, COUNT(DISTINCT o.vn) AS visit_count, COUNT(DISTINCT o.hn) AS patient_count
       FROM ovst o INNER JOIN vn_stat v ON o.vn = v.vn WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND o.main_dep = ? AND v.income > 0
       GROUP BY YEAR(o.vstdate), MONTH(o.vstdate) ORDER BY yr, mo`;
        return buildFiscalResult(await dbQuery(sql, [globalStart, globalEnd, mainDep]), fiscalYears, dataSource);
    }
    const sql = `SELECT YEAR(vstdate) AS yr, MONTH(vstdate) AS mo, SUM(income) AS revenue, COUNT(DISTINCT vn) AS visit_count, COUNT(DISTINCT hn) AS patient_count
     FROM vn_stat WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) GROUP BY YEAR(vstdate), MONTH(vstdate) ORDER BY yr, mo`;
    return buildFiscalResult(await dbQuery(sql, [globalStart, globalEnd]), fiscalYears, dataSource);
}
