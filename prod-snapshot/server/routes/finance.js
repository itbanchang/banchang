// ============================================================
// Finance & RCM Routes — HOSxP XE Only, Optimized
// Phase 2: Debt Aging Analysis + Input Validation
// ============================================================
import { Router } from 'express';
import { z } from 'zod';
import hosxp from '../db/hosxpIntegration.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { validateQuery } from '../middleware/validate.js';
import { cacheMiddleware } from '../cache/redis.js';
import { cached } from '../cache/staleCache.js';
import logger from '../logger.js';
import { forecastRevenue } from '../ai/forecastEngine.js';
import { getRevenueFiscal, getRevenueFiscalByPayer } from '../helpers/fiscal.js';
import {
  generateRevenueForecastNarrative,
  generateDRGLeakageNarrative,
} from '../ai/claudeNarrative.js';
import { getFinanceCal } from '../ai/calibration.js';
import { safeError } from '../lib/safeError.js';
import { getMV } from '../db/materializedViews.js';

const router = Router();

// Background narrative cache — avoids blocking response on slow Claude API calls
const _narrativeCache = new Map();

// ============================================================
// Validation Schemas (Phase 2.4)
// ============================================================
const monthlyQuerySchema = z.object({
  year: z.coerce.number().int().min(2000).max(2700).optional(),
});

const claimsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(1000).default(100),
  offset: z.coerce.number().int().min(0).default(0),
  dateFrom: z.string().date().optional(),
  dateTo: z.string().date().optional(),
});

const debtAgingQuerySchema = z.object({
  bucket: z.enum(['0-30_days', '31-60_days', '61-90_days', '>90_days']).optional(),
  limit: z.coerce.number().int().min(1).max(500).default(100),
});

const denialAnalyticsQuerySchema = z.object({
  category: z
    .enum(['Documentation', 'Coding', 'Authorization', 'Eligibility', 'Duplicate', 'Other'])
    .optional(),
});

const ppfsComparisonQuerySchema = z.object({
  type: z.enum(['activity', 'revenue', 'los']).default('activity'),
});
const MN = [
  '',
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
];

// ---- Monthly Summary (cached 3 min) ----
router.get(
  '/monthly-summary',
  validateQuery(monthlyQuerySchema),
  cacheMiddleware(300),
  async (req, res) => {
    try {
      const rawYear = Number(req.query.year) || new Date().getFullYear();
      const year = rawYear > 2400 ? rawYear - 543 : rawYear;  // BE → CE

      // Use fiscal year (Oct-Sep) instead of calendar year
      const mo = new Date().getMonth() + 1;
      const fiscalStartYear = mo >= 10 ? year : year - 1;
      const fyStart = `${fiscalStartYear}-10-01`;
      const fyEnd = `${fiscalStartYear + 1}-09-30`;

      // Try materialized view first (instant, refreshed every 15 min)
      // NOTE: mv_fiscal_revenue columns = { yr, mo, revenue, visit_count, patient_count }
      //       (previously read `r.month`/`r.visits` which don't exist → all zeros)
      // Filter MV to current fiscal year only (MV has 12 months rolling).
      const mvData = getMV('mv_fiscal_revenue');
      let rows;
      if (mvData?.length) {
        rows = mvData
          .filter(r => {
            const yr = Number(r.yr);
            const mo = Number(r.mo);
            // In fiscal year = (yr == fiscalStartYear AND mo >= 10) OR (yr == fiscalStartYear+1 AND mo <= 9)
            return (yr === fiscalStartYear && mo >= 10) || (yr === fiscalStartYear + 1 && mo <= 9);
          })
          .map(r => ({ m: Number(r.mo), r: Number(r.revenue || 0), v: Number(r.visit_count || 0) }));
      }
      // Fallback (MV empty OR no matching rows): query fiscal year range directly
      if (!rows || rows.length === 0) {
        rows = await dbQuery(`
          SELECT MONTH(vstdate) as m, SUM(income) as r, COUNT(DISTINCT vn) as v
          FROM vn_stat
          WHERE vstdate >= ? AND vstdate <= LEAST(?, CURDATE())
          GROUP BY MONTH(vstdate) ORDER BY m
        `, [fyStart, fyEnd]).catch(() => []);
      }

      const monthly = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        month_name: MN[i + 1],
        revenue: 0,
        expense: 0,
        profit: 0,
        margin: 0,
      }));
      // Expense ratio — calibrated จากข้อมูลจริง หรือ fallback 0.82
      const EXPENSE_RATIO = getFinanceCal().expense_ratio;

      (rows || []).forEach(r => {
        const m = monthly[r.m - 1];
        if (m) {
          m.revenue = Number(r.r || 0);
          m.visits = Number(r.v || 0);
          m.expense = Math.round(m.revenue * EXPENSE_RATIO);
          m.profit = m.revenue - m.expense;
          m.margin = m.revenue > 0 ? Math.round((m.profit / m.revenue) * 100) : 0;
        }
      });
      const totR = monthly.reduce((s, m) => s + m.revenue, 0);
      const totE = monthly.reduce((s, m) => s + m.expense, 0);
      const totP = totR - totE;

      res.json({
        data_source: 'HOSxP XE',
        year,
        monthly,
        summary: {
          total_revenue: Math.round(totR),
          total_expense: Math.round(totE),
          net_profit: Math.round(totP),
          profit_margin: totR > 0 ? Math.round((totP / totR) * 100) : 0,
          expense_ratio_used: EXPENSE_RATIO,
          note: `Expense ratio ${EXPENSE_RATIO} — calibrated จากข้อมูล vn_stat 12 เดือน (auto-tune ทุก 24 ชม.)`,
        },
      });
    } catch (err) {
      safeError(res, err, 'Finance');
    }
  }
);

// ---- Claims (cached 2 min) ----
router.get('/claims', validateQuery(claimsQuerySchema), cacheMiddleware(120), async (req, res) => {
  try {
    const data = await hosxp.getClaimsData({
      limit: req.query.limit,
      offset: req.query.offset,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    });
    const claims = data || [];
    res.json({
      data_source: 'HOSxP XE',
      claims,
      stats: {
        total: claims.length,
        total_amount: claims.reduce((s, c) => s + Number(c.charge || 0), 0),
        approved_amount: claims.reduce((s, c) => s + Number(c.paid || 0), 0),
        avg_los:
          claims.length > 0
            ? Math.round((claims.reduce((s, c) => s + (c.los || 0), 0) / claims.length) * 10) / 10
            : 0,
      },
    });
  } catch (err) {
    safeError(res, err, 'Finance');
  }
});

// ---- Denial Analytics (cached 5 min) — derive from vn_stat/an_stat remain_money ----
// HOSxP XE has no explicit denial table; unpaid balance (remain_money > 0) is the best proxy
router.get(
  '/denial-analytics',
  validateQuery(denialAnalyticsQuerySchema),
  cacheMiddleware(300),
  async (req, res) => {
    try {
      const [summary, byPayer, ipdUnpaid] = await Promise.all([
        // OPD: cash/self-pay pttypes that should have paid but didn't
        dbQueryOne(`
                SELECT
                    COUNT(*) as total_visits,
                    SUM(CASE WHEN v.paid_money = 0 AND v.income > 100
                      AND v.pttype IN ('10','40','41','22','64','AA','27','WT','39','49')
                      THEN 1 ELSE 0 END) as denied_count,
                    COALESCE(SUM(CASE WHEN v.paid_money = 0 AND v.income > 100
                      AND v.pttype IN ('10','40','41','22','64','AA','27','WT','39','49')
                      THEN v.income ELSE 0 END), 0) as amount_at_risk
                FROM vn_stat v
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND v.income > 0
            `),
        // OPD outstanding by payer — only cash/self-pay pttypes
        dbQuery(`
                SELECT pt.name as payer, COUNT(*) as count,
                       COALESCE(SUM(v.income), 0) as amount
                FROM vn_stat v
                LEFT JOIN pttype pt ON v.pttype = pt.pttype
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND v.income > 100 AND v.paid_money = 0
                  AND v.pttype IN ('10','40','41','22','64','AA','27','WT','39','49')
                GROUP BY pt.name
                ORDER BY amount DESC
                LIMIT 10
            `),
        // IPD: cash/self-pay unpaid
        dbQueryOne(`
                SELECT COUNT(CASE WHEN a.paid_money = 0 AND a.income > 100
                  AND i.pttype IN ('10','40','41','22','64','AA','27','WT','39','49')
                  THEN 1 END) as ipd_denied,
                COALESCE(SUM(CASE WHEN a.paid_money = 0 AND a.income > 100
                  AND i.pttype IN ('10','40','41','22','64','AA','27','WT','39','49')
                  THEN a.income ELSE 0 END), 0) as ipd_amount
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                  AND a.income > 0
            `),
      ]);

      const total = Number(summary?.total_visits || 0);
      const denied = Number(summary?.denied_count || 0);
      const denial_rate = total > 0 ? Math.round((denied / total) * 1000) / 10 : 0;
      const opd_risk = Number(summary?.amount_at_risk || 0);
      const ipd_risk = Number(ipdUnpaid?.ipd_amount || 0);
      const totalDenied = denied + Number(ipdUnpaid?.ipd_denied || 0);

      // If no denials, get revenue breakdown by payer as useful alternative analysis
      let revenueByPayer = [];
      if (totalDenied === 0) {
        // Try MV first (instant, refreshed every 15 min)
        const mvPayer = getMV('mv_payer_revenue');
        if (mvPayer?.length) {
          // Aggregate across all months in MV data
          const payerMap = new Map();
          for (const r of mvPayer) {
            const key = r.pttype || 'unknown';
            const existing = payerMap.get(key) || { payer: r.payer_name || 'ไม่ระบุสิทธิ์', payer_code: r.pttype, visit_count: 0, total_revenue: 0 };
            existing.visit_count += Number(r.visit_count || 0);
            existing.total_revenue += Number(r.revenue || 0);
            payerMap.set(key, existing);
          }
          revenueByPayer = Array.from(payerMap.values())
            .sort((a, b) => b.total_revenue - a.total_revenue)
            .slice(0, 15)
            .map(p => ({ ...p, cash_collected: 0, net_collected: p.total_revenue, collection_pct: 100 }));
        } else {
          revenueByPayer = await dbQuery(`
                  SELECT pt.name as payer, v.pttype as payer_code,
                         COUNT(DISTINCT v.vn) as visit_count,
                         COALESCE(SUM(v.income), 0) as total_revenue,
                         COALESCE(SUM(v.paid_money), 0) as cash_collected,
                         COALESCE(SUM(v.paid_money), 0) as net_collected,
                         ROUND(100.0 * SUM(v.paid_money) / NULLIF(SUM(v.income), 0), 1) as collection_pct
                  FROM vn_stat v
                  LEFT JOIN pttype pt ON v.pttype = pt.pttype
                  WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND v.income > 0
                  GROUP BY v.pttype, pt.name
                  ORDER BY total_revenue DESC
                  LIMIT 15
              `).catch(() => []);
        }
      }

      res.json({
        data_source: 'HOSxP XE',
        note:
          totalDenied > 0
            ? 'Unpaid balances from vn_stat/an_stat (remain_money > 0)'
            : 'ไม่มีค้างชำระ — แสดง Revenue by Payer แทน',
        total_visits_30d: total,
        denial_rate,
        total_denied: totalDenied,
        amount_at_risk: opd_risk + ipd_risk,
        by_payer:
          totalDenied > 0
            ? (byPayer || []).map(r => ({
                payer: r.payer || 'ไม่ระบุสิทธิ์',
                count: r.count,
                amount: r.amount,
              }))
            : [],
        revenue_by_payer: revenueByPayer.map(r => ({
          payer: r.payer || 'ไม่ระบุสิทธิ์',
          payer_code: r.payer_code,
          visits: Number(r.visit_count),
          revenue: Number(r.total_revenue),
          cash: Number(r.cash_collected),
          collected: Number(r.net_collected),
          collection_pct: Number(r.collection_pct || 100),
        })),
        top_reasons:
          totalDenied > 0
            ? [
                { reason: 'OPD ค้างชำระ', count: denied, amount: opd_risk },
                {
                  reason: 'IPD ค้างชำระ',
                  count: Number(ipdUnpaid?.ipd_denied || 0),
                  amount: ipd_risk,
                },
              ]
            : [],
        status:
          totalDenied === 0
            ? 'excellent'
            : denial_rate > 5
              ? 'critical'
              : denial_rate > 2
                ? 'warning'
                : 'good',
        analysis:
          totalDenied === 0
            ? `ไม่มียอดค้างชำระใน 30 วัน (${total.toLocaleString()} visits) — Collection Rate สมบูรณ์`
            : `พบค้างชำระ ${totalDenied} เคส (${denial_rate}%) มูลค่า ${((opd_risk + ipd_risk) / 1e6).toFixed(2)} ล้านบาท`,
      });
    } catch (err) {
      logger.error('Denial analytics failed', { error: err.message });
      safeError(res, err, 'Finance');
    }
  }
);

// ---- Revenue Leakage — unbilled/underbilled detection from vn_stat vs rcpt_print ----
router.get('/revenue-leakage', cacheMiddleware(300), async (req, res) => {
  try {
    const leakages = await dbQuery(`
            SELECT v.vn, v.hn, v.vstdate,
                   v.income as billed_amount,
                   COALESCE(r.total_amount, 0) as collected_amount,
                   (v.income - COALESCE(r.total_amount, 0) - COALESCE(v.paid_money, 0)) as unbilled_gap,
                   pt.name as payer
            FROM vn_stat v
            LEFT JOIN rcpt_print r ON v.vn = r.vn
            LEFT JOIN pttype pt ON v.pttype = pt.pttype
            WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
              AND v.income > 0
              AND (v.income - COALESCE(r.total_amount, 0) - COALESCE(v.paid_money, 0)) > 100
            ORDER BY unbilled_gap DESC
            LIMIT 50
        `);
    const total_leakage = (leakages || []).reduce((s, r) => s + Number(r.unbilled_gap || 0), 0);
    res.json({
      data_source: 'HOSxP XE',
      leakages: leakages || [],
      total_leakage: Math.round(total_leakage),
    });
  } catch (err) {
    safeError(res, err, 'Finance');
  }
});

router.post('/predict-denial', async (req, res) => {
  try {
    const { vn, pttype, income } = req.body;
    // Derive risk from remain_money pattern for this payer type in last 30 days
    const stats = await dbQueryOne(
      `
            SELECT COUNT(*) as total,
                   SUM(CASE WHEN remain_money > 0 THEN 1 ELSE 0 END) as denied
            FROM vn_stat v
            LEFT JOIN patient p ON v.hn = p.hn
            WHERE p.pttype = ? AND v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
              AND v.income > 0
        `,
      [pttype || '']
    );
    const t = Number(stats?.total || 0);
    const d = Number(stats?.denied || 0);
    const risk_score = t > 0 ? Math.round((d / t) * 100) : 0;
    res.json({
      vn,
      risk_score,
      factors:
        risk_score > 20
          ? [
              {
                factor: `สิทธิ ${pttype} มีอัตราค้างชำระ ${risk_score}% ใน 30 วัน`,
                severity: 'high',
              },
            ]
          : [],
    });
  } catch (err) {
    safeError(res, err, 'Finance');
  }
});

// ---- Revenue by Payer — Fiscal Year Comparison (cached 5 min — heavy query) ----
router.get('/revenue-by-payer-fiscal', cacheMiddleware(300), async (req, res) => {
  try {
    const data = await getRevenueFiscalByPayer(req.query.start, req.query.end);
    res.json(data);
  } catch (err) {
    logger.error('Revenue by payer fiscal failed', { error: err.message });
    safeError(res, err, 'Finance');
  }
});

// ---- PPFS Comparison: ผลงาน ปีงบ 68 vs 69 (cached 5 min) ----
router.get(
  '/ppfs-comparison',
  validateQuery(ppfsComparisonQuerySchema),
  cacheMiddleware(300),
  async (req, res) => {
    try {
      const data = await hosxp.getPPFSComparison();
      const rows = (data || []).filter(r => r.c68 > 0 || r.c69 > 0); // Only show activities with data

      // Compute totals: cases and revenue for period comparison
      const total_cases_p1 = rows.reduce((s, r) => s + (r.c68 || 0), 0);
      const total_cases_p2 = rows.reduce((s, r) => s + (r.c69 || 0), 0);
      const total_rev_p1 = rows.reduce((s, r) => s + (r.rev68 || 0), 0);
      const total_rev_p2 = rows.reduce((s, r) => s + (r.rev69 || 0), 0);
      const growth_pct =
        total_cases_p1 > 0
          ? Math.round(((total_cases_p2 - total_cases_p1) / total_cases_p1) * 100)
          : 0;

      res.json({
        data_source: 'HOSxP XE · pp_special',
        note: 'เปรียบเทียบผลงาน PPFS ปีงบประมาณ 2568 (ต.ค.67-ก.พ.68) vs 2569 (ต.ค.68-ก.พ.69)',
        // Period labels
        period_1_label: 'ปีงบ 2568 (ต.ค.67-ก.พ.68)',
        period_2_label: 'ปีงบ 2569 (ต.ค.68-ก.พ.69)',
        // Totals
        total_cases_p1,
        total_cases_p2,
        total_rev_p1: Math.round(total_rev_p1),
        total_rev_p2: Math.round(total_rev_p2),
        growth_pct,
        // Legacy fields for backward compat (frontend may use these)
        total_budget: Math.round(total_rev_p1),
        total_actual: Math.round(total_rev_p2),
        budget_used_pct:
          total_rev_p1 > 0 ? Math.round((total_rev_p2 / total_rev_p1) * 1000) / 10 : 0,
        // Activity details
        ppfs: rows,
        activity_count: rows.length,
      });
    } catch (err) {
      safeError(res, err, 'Finance');
    }
  }
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Finance Analytics — scores computed from real DB metrics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/analytics', cacheMiddleware(300), async (req, res) => {
  try {
    const yr = new Date().getFullYear();
    const mo = new Date().getMonth() + 1;
    const prevMo = mo === 1 ? 12 : mo - 1;
    const prevYr = mo === 1 ? yr - 1 : yr;
    const curStart = `${yr}-${String(mo).padStart(2, '0')}-01`;
    const prevStart = `${prevYr}-${String(prevMo).padStart(2, '0')}-01`;
    const prevEnd = `${yr}-${String(mo).padStart(2, '0')}-01`;

    // Fiscal year calculation (Thai fiscal: Oct-Sep)
    const fyBE = mo >= 10 ? yr + 544 : yr + 543;
    const fyStartCE = fyBE - 544;
    const fyStart = `${fyStartCE}-10-01`;
    const prevFyStart = `${fyStartCE - 1}-10-01`;
    const prevFyEnd = `${fyStartCE}-09-30`;

    // Payer category classification (Thai public hospital context):
    //   - FFS     = self-pay / private insurance / พรบ / รัฐวิสาหกิจ / ต่างด้าว / ต่างชาติ (should collect 95%+)
    //   - Capitation = UC/บัตรทอง/PP/ฟอกไต/ประกันสังคม-in-network (100% outstanding BY DESIGN)
    //   - Government = เบิกจ่ายตรง/กรมบัญชีกลาง/อปท (slow-pay but billable)
    const FFS_PTTYPES = "'10','40','41','22','64','AA','27','WT','39','49'";
    const GOV_PTTYPES = "'23','29','24','25','26','28'";

    const [
      collectionRate,
      ffsCollection,
      prevMonth,
      curMonth,
      denialStats,
      ytdRevenue,
      prevYtdRevenue,
      arBalanceResult,
    ] = await Promise.all([
      // Overall collection rate (ALL payers — includes Capitation so will be low)
      dbQueryOne(
        `SELECT
            COALESCE(SUM(income), 0) as billed,
            COALESCE(SUM(paid_money), 0) as collected,
            COALESCE(SUM(income) - SUM(paid_money), 0) as outstanding
          FROM vn_stat
          WHERE vstdate >= ? AND vstdate < DATE_ADD(?, INTERVAL 1 MONTH) AND income > 0`,
        [curStart, curStart]
      ),
      // FFS-only collection (TRUE collection — excludes Capitation)
      dbQueryOne(
        `SELECT
            COALESCE(SUM(income), 0) as billed,
            COALESCE(SUM(paid_money), 0) as collected,
            COUNT(*) as visits
          FROM vn_stat
          WHERE vstdate >= ? AND income > 0 AND pttype IN (${FFS_PTTYPES})`,
        [fyStart]
      ),
      // Previous month revenue
      dbQueryOne(
        `SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE vstdate >= ? AND vstdate < ?`,
        [prevStart, prevEnd]
      ),
      // Current month revenue
      dbQueryOne(
        `SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE vstdate >= ? AND vstdate < DATE_ADD(?, INTERVAL 1 MONTH)`,
        [curStart, curStart]
      ),
      // Unpaid visits: only count cash/self-pay pttypes where paid_money should be > 0
      // UC (A0,00,01,02,A1,A2,50,etc.), PP (79,PS), ฟอกไต (56,57,58,70), ฝากครรภ์ (98) = no copay expected
      // Only flag pttypes that SHOULD have payment: 10(เงินสด), 40(พรบ), 41(ปกส), 22(รัฐวิสาหกิจ), 64(ต่างด้าว), AA(ต่างชาติ), 23(กรมบัญชีกลาง), 29(อปท)
      dbQueryOne(`
        SELECT COUNT(*) as total,
          SUM(CASE WHEN paid_money = 0 AND income > 100
            AND v.pttype IN ('10','40','41','22','64','AA','27','WT','39','49')
            THEN 1 ELSE 0 END) as unpaid_visits,
          ROUND(SUM(CASE WHEN paid_money = 0 AND income > 100
            AND v.pttype IN ('10','40','41','22','64','AA','27','WT','39','49')
            THEN income ELSE 0 END)) as unpaid_amount
        FROM vn_stat v WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND v.income > 0`),
      // YTD revenue — fiscal year (Oct to current)
      dbQueryOne(
        `SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE vstdate >= ? AND vstdate <= CURDATE()`,
        [fyStart]
      ),
      // Previous fiscal year — same period (Oct to same month/day previous year)
      dbQueryOne(
        `SELECT COALESCE(SUM(income), 0) as r FROM vn_stat
         WHERE vstdate >= ? AND vstdate <= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)`,
        [prevFyStart]
      ),
      // A/R Balance: outstanding = income - paid_money for current fiscal year
      dbQueryOne(
        `SELECT COALESCE(SUM(income - paid_money), 0) as ar_balance,
                COUNT(CASE WHEN paid_money = 0 AND income > 100 THEN 1 END) as ar_cases
         FROM vn_stat WHERE vstdate >= ? AND income > 0 AND paid_money < income`,
        [fyStart]
      ),
    ]);

    const billed = Number(collectionRate?.billed || 0);
    const collected = Number(collectionRate?.collected || 0);
    const outstanding = Number(collectionRate?.outstanding || 0);
    // Overall collection rate (includes Capitation — low by design)
    const collRate = billed > 0 ? Math.round((collected / billed) * 100) : 0;

    // TRUE collection rate — FFS only (self-pay/insurance/พรบ/ต่างด้าว)
    const ffsBilled = Number(ffsCollection?.billed || 0);
    const ffsCollected = Number(ffsCollection?.collected || 0);
    const ffsCollRate = ffsBilled > 0 ? Math.round((ffsCollected / ffsBilled) * 100) : 0;
    const ffsVisits = Number(ffsCollection?.visits || 0);

    const prevRev = Number(prevMonth?.r || 0);
    const curRev = Number(curMonth?.r || 0);
    const growthPct = prevRev > 0 ? Math.round(((curRev - prevRev) / prevRev) * 100) : 0;

    // Unpaid visits (income > ฿100 but paid_money = 0 — likely pending claim settlement)
    const unpaidVisits = Number(denialStats?.unpaid_visits || 0);
    const totalCount = Number(denialStats?.total || 1);
    const unpaidAmount = Number(denialStats?.unpaid_amount || 0);
    const denialRate = Math.round((unpaidVisits / totalCount) * 100);

    // Year-over-year growth — fiscal year (Oct-Sep), same period comparison
    const ytdRev = Number(ytdRevenue?.r || 0);
    const prevYtdRev = Number(prevYtdRevenue?.r || 0);
    const yoyGrowthPct =
      prevYtdRev > 0 ? Math.round(((ytdRev - prevYtdRev) / prevYtdRev) * 100) : 0;

    // Days in A/R calculation — fiscal year
    const arBalance = Number(arBalanceResult?.ar_balance || 0);
    const arCases = Number(arBalanceResult?.ar_cases || 0);
    const fyStartDate = new Date(fyStartCE, 9, 1); // Oct 1
    const daysInPeriod = Math.max(1, Math.ceil((new Date() - fyStartDate) / (1000 * 60 * 60 * 24)));
    const avgDailyRevenue = ytdRev / daysInPeriod;
    const daysInAr = avgDailyRevenue > 0 ? Math.round(arBalance / avgDailyRevenue) : 0;

    // MoM pro-rata: ปรับ current month ตามจำนวนวันที่ผ่านไป (เดือนยังไม่ครบ)
    const today = new Date();
    const dayOfMonth = today.getDate();
    const daysInMonth = new Date(yr, mo, 0).getDate();
    const proRataRevenue =
      daysInMonth > 0 ? Math.round(curRev * (daysInMonth / dayOfMonth)) : curRev;
    const momProRata = prevRev > 0 ? Math.round(((proRataRevenue - prevRev) / prevRev) * 100) : 0;

    // Score computation from real metrics
    const revenueScore = Math.min(100, Math.max(0, collRate));
    // Risk score penalizes BOTH denial AND slow A/R collection:
    //   - Every 1% denial costs 3 points
    //   - Every 30 days beyond 45-day target costs 10 points (cap at -60)
    const arPenalty = Math.min(60, Math.max(0, Math.round(((daysInAr || 0) - 45) / 30) * 10));
    const riskScore = Math.min(100, Math.max(0, 100 - denialRate * 3 - arPenalty));
    // Growth score uses YoY (reliable) weighted 60% + MoM pro-rata 40%
    const growthScore = Math.min(
      100,
      Math.max(0, Math.round(50 + yoyGrowthPct * 0.6 + momProRata * 0.4))
    );
    const efficiencyScore = Math.min(
      100,
      Math.max(0, collRate > 0 ? Math.round((collRate + riskScore) / 2) : 70)
    );

    // Expense estimate — calibrated from real data
    const expenseRatio = getFinanceCal().expense_ratio;
    const estExpense = Math.round(ytdRev * expenseRatio);
    const estProfit = Math.round(ytdRev - estExpense);
    const profitMargin = ytdRev > 0 ? Math.round((estProfit / ytdRev) * 100) : 0;

    res.json({
      data_source: 'HOSxP XE',
      timestamp: new Date().toISOString(),
      metrics: {
        collection_rate: collRate,                // Overall (low because Capitation)
        ffs_collection_rate: ffsCollRate,         // TRUE collection — FFS only
        ffs_billed: Math.round(ffsBilled),
        ffs_collected: Math.round(ffsCollected),
        ffs_visits: ffsVisits,
        growth_pct: growthPct,
        growth_pct_prorata: momProRata,
        yoy_growth_pct: yoyGrowthPct,
        denial_rate: denialRate,
        unpaid_visits: unpaidVisits,
        unpaid_amount: Math.round(unpaidAmount),
        cur_month_revenue: Math.round(curRev),
        cur_month_prorata: proRataRevenue,
        prev_month_revenue: Math.round(prevRev),
        ytd_revenue: Math.round(ytdRev),
        prev_ytd_revenue: Math.round(prevYtdRev),
        days_in_ar: daysInAr,
        ar_balance: Math.round(arBalance),
        est_expense: estExpense,
        est_profit: estProfit,
        profit_margin: profitMargin,
      },
      ai_insights: {
        revenue_health: {
          title: 'Revenue Health',
          score: revenueScore,
          status: revenueScore >= 80 ? 'optimal' : revenueScore >= 60 ? 'warning' : 'critical',
          analysis: `อัตราจัดเก็บรายได้ ${collRate}% · เดือนนี้ ${(curRev / 1e6).toFixed(2)} ล้าน (${dayOfMonth}/${daysInMonth} วัน) · ประมาณเต็มเดือน ${(proRataRevenue / 1e6).toFixed(2)} ล้านบาท`,
          recommendation:
            revenueScore >= 80
              ? `รักษาระดับการจัดเก็บ — ลูกหนี้คงค้าง ${(arBalance / 1e6).toFixed(2)} ล้าน · Days in A/R ${daysInAr} วัน`
              : 'เร่งติดตามหนี้ค้างชำระ — ตรวจสอบ Aging Report',
        },
        growth_strategy: {
          title: 'Growth Strategy',
          score: growthScore,
          status: yoyGrowthPct >= 5 ? 'expanding' : yoyGrowthPct >= 0 ? 'stable' : 'declining',
          analysis: `YoY Growth +${yoyGrowthPct}% (YTD ${(ytdRev / 1e6).toFixed(1)}M vs ปีก่อน ${(prevYtdRev / 1e6).toFixed(1)}M) · MoM ${momProRata >= 0 ? '+' : ''}${momProRata}% (pro-rata เต็มเดือน)`,
          recommendation:
            yoyGrowthPct >= 5
              ? `เติบโตดี +${yoyGrowthPct}% YoY — รักษา Service Mix, ขยายบริการที่ทำรายได้สูง`
              : yoyGrowthPct >= 0
                ? 'ทรงตัว — วิเคราะห์ Revenue Source ที่มีศักยภาพเติบโต'
                : 'รายได้ลดลง YoY — ตรวจสอบปริมาณผู้ป่วย, Service Mix, และนโยบายสิทธิ์',
        },
        operational_efficiency: {
          title: 'Operational Efficiency',
          score: efficiencyScore,
          status: efficiencyScore >= 80 ? 'efficient' : efficiencyScore >= 60 ? 'moderate' : 'low',
          analysis: `Collection rate ${collRate}% · Denial rate ${denialRate}% (${unpaidVisits} เคส) · Profit margin ${profitMargin}% (est.)`,
          recommendation:
            denialRate > 10
              ? 'ลดอัตราการปฏิเสธเบิก — ตรวจสอบ Coding accuracy และเอกสารประกอบ'
              : collRate >= 90
                ? `ประสิทธิภาพดี — กำไรประมาณ ${(estProfit / 1e6).toFixed(1)} ล้าน (Expense ratio 82%)`
                : 'ปรับปรุง Collection process — ติดตาม Claim status',
        },
        risk_intelligence: {
          title: 'Risk Index',
          score: riskScore,
          status: riskScore >= 80 ? 'safe' : riskScore >= 60 ? 'moderate' : 'high',
          analysis: `A/R ค้างรับ ${(arBalance / 1e6).toFixed(2)} ล้าน · Days in A/R ${daysInAr} วัน · Denial Rate ${denialRate}% (${unpaidVisits} เคส ค้างบันทึก)`,
          recommendation: (() => {
            // Use actual A/R days to write truthful recommendation
            if (daysInAr > 90) return `🔴 A/R ${daysInAr} วัน (เป้า ≤ 45) — วิเคราะห์ Aging Bucket · เร่งเบิกสิทธิ์ค้างรับ · ตาม e-Claim + Reconciliation`;
            if (daysInAr > 60) return `🟠 A/R ${daysInAr} วัน (เป้า ≤ 45) — ติดตามหนี้ค้าง · วิเคราะห์ payer-type A/R Aging`;
            if (daysInAr > 45) return `🟡 A/R ${daysInAr} วัน (เป้า ≤ 45) — อยู่ในเกณฑ์เฝ้าระวัง · ทบทวน Billing Cycle`;
            return `✅ A/R ${daysInAr} วัน — อยู่ในเกณฑ์มาตรฐาน Cash Flow หมุนเวียนปกติ`;
          })(),
        },
      },
    });
  } catch (err) {
    logger.error('Finance analytics failed', { error: err.message });
    safeError(res, err, 'Finance');
  }
});

// ---- Professional Drill-Down (cached 2 min) ----
router.get('/drilldown', cacheMiddleware(120), async (req, res) => {
  const { type } = req.query;
  try {
    if (type === 'revenue') {
      const [deptRows, summaryRows] = await Promise.all([
        hosxp.getRevenueByDeptTop10(),
        hosxp.getRevenueBreakdownSummary(),
      ]);

      return res.json({
        breakdown: summaryRows || { opd: 0, ipd: 0, other: 0 },
        byDept: (deptRows || []).map(r => ({
          name: r.dept_name,
          visits: r.total_visits,
          revenue: r.total_revenue,
        })),
      });
    }
    res.status(400).json({ error: 'Unsupported drill-down type' });
  } catch (err) {
    safeError(res, err, 'Finance');
  }
});

// ============================================================
// 🟡 PHASE 2.2: Debt Aging Analysis & Collection Management
// ============================================================

// ---- GET /api/finance/debt-aging — Aging bucket summary ----
router.get('/debt-aging', async (req, res) => {
  try {
    logger.info('Fetching debt aging summary');

    const summary = await dbQuery(`
            SELECT 
                CASE
                    WHEN remain_money = 0 THEN 'paid'
                    WHEN DATEDIFF(CURDATE(), due_date) < 0 THEN 'not_due'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 30 THEN '0-30_days'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 60 THEN '31-60_days'
                    WHEN DATEDIFF(CURDATE(), due_date) <= 90 THEN '61-90_days'
                    ELSE '>90_days'
                END as aging_bucket,
                COUNT(DISTINCT hn) as patient_count,
                COUNT(*) as debt_incident_count,
                SUM(remain_money) as total_debt_amount,
                MIN(due_date) as oldest_debt_date,
                AVG(remain_money) as avg_debt_amount
            FROM (
                SELECT hn, remain_money, DATE_ADD(vstdate, INTERVAL 30 DAY) as due_date
                FROM vn_stat
                WHERE remain_money > 0
                UNION ALL
                SELECT hn, remain_money, DATE_ADD(regdate, INTERVAL 60 DAY) as due_date
                FROM ipt i
                JOIN an_stat a ON i.an = a.an
                WHERE a.remain_money > 0 AND i.dchdate IS NOT NULL
            ) debt_aging
            GROUP BY aging_bucket
            ORDER BY 
                FIELD(aging_bucket, '>90_days', '61-90_days', '31-60_days', '0-30_days', 'not_due', 'paid')
        `);

    res.json({
      timestamp: new Date().toISOString(),
      data_source: 'HOSxP XE + AN_STAT',
      summary: summary || [],
      total_unpaid: summary.reduce((s, row) => {
        if (row.aging_bucket !== 'paid' && row.aging_bucket !== 'not_due') {
          return s + (row.total_debt_amount || 0);
        }
        return s;
      }, 0),
    });
  } catch (err) {
    logger.error('Debt aging fetch failed', { error: err.message });
    safeError(res, err, 'Finance');
  }
});

// ---- GET /api/finance/debt-aging/details — Detailed patient list by bucket ----
router.get('/debt-aging/details', validateQuery(debtAgingQuerySchema), async (req, res) => {
  try {
    const bucket = req.query.bucket || '>90_days';
    const limit = req.query.limit || 100;

    logger.info('Fetching debt aging details', { bucket, limit });

    const details = await dbQuery(
      `
            SELECT 
                vs.hn, vs.vn,
                p.fname, p.lname, TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age_y, p.sex, p.pttype,
                vs.remain_money, 
                DATE_ADD(vs.vstdate, INTERVAL 30 DAY) as due_date,
                DATEDIFF(CURDATE(), DATE_ADD(vs.vstdate, INTERVAL 30 DAY)) as days_overdue,
                CASE
                    WHEN DATEDIFF(CURDATE(), DATE_ADD(vs.vstdate, INTERVAL 30 DAY)) <= 30 THEN '0-30_days'
                    WHEN DATEDIFF(CURDATE(), DATE_ADD(vs.vstdate, INTERVAL 30 DAY)) <= 60 THEN '31-60_days'
                    WHEN DATEDIFF(CURDATE(), DATE_ADD(vs.vstdate, INTERVAL 30 DAY)) <= 90 THEN '61-90_days'
                    ELSE '>90_days'
                END as aging_bucket
            FROM vn_stat vs
            JOIN patient p ON vs.hn = p.hn
            WHERE vs.remain_money > 0
            HAVING aging_bucket = ?
            ORDER BY days_overdue DESC
            LIMIT ?
        `,
      [bucket, limit]
    );

    // Apply data masking for finance role
    const maskedDetails = details.map(d => ({
      hn: d.hn,
      vn: d.vn,
      remain_money: d.remain_money,
      due_date: d.due_date,
      days_overdue: d.days_overdue,
      aging_bucket: d.aging_bucket,
      age_y: d.age_y,
      sex: d.sex,
      pttype: d.pttype,
      // NO: fname, lname (PDPA masking for finance)
    }));

    res.json({
      aging_bucket: bucket,
      patient_count: maskedDetails.length,
      total_amount: maskedDetails.reduce((s, d) => s + (d.remain_money || 0), 0),
      details: maskedDetails,
    });
  } catch (err) {
    logger.error('Debt aging details fetch failed', {
      error: err.message,
      bucket: req.query.bucket,
    });
    safeError(res, err, 'Finance');
  }
});

// ---- POST /api/finance/debt-aging/record-payment — Log debt payment ----
router.post('/debt-aging/record-payment', async (req, res) => {
  try {
    const { hn, payment_amount, payment_date, payment_method, notes } = req.body;

    const parsedAmount = Number(payment_amount);
    if (!hn || !payment_amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ error: 'Missing or invalid required fields: hn, payment_amount (must be > 0)' });
    }

    logger.info('Recording debt payment', {
      hn,
      payment_amount,
      payment_method,
      user: req.user?.username,
    });

    // Update vn_stat remain_money — deduct exactly parsedAmount, guard against over-payment
    const result = await dbQuery(
      `
            UPDATE vn_stat
            SET remain_money = GREATEST(0, remain_money - ?),
                paid_money = paid_money + ?,
                last_update = NOW()
            WHERE hn = ? AND remain_money > 0
            LIMIT 1
        `,
      [parsedAmount, parsedAmount, hn]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No active debt found for this patient' });
    }

    res.json({
      success: true,
      message: 'Payment recorded successfully',
      hn,
      payment_amount,
      payment_method: payment_method || 'cash',
      recorded_at: new Date().toISOString(),
      recorded_by: req.user?.username || 'system',
    });
  } catch (err) {
    logger.error('Payment recording failed', { error: err.message });
    safeError(res, err, 'Finance');
  }
});

// ============================================================
// 🤖 Revenue Forecast 3 เดือน — Holt-Winters + Claude AI Narrative
// Cache 10 นาที (Claude API ต้นทุนสูง)
// ============================================================
router.get(
  '/revenue-forecast',
  cached('revForecast_v1', 600000, async () => {
    // 1. คำนวณ Holt-Winters forecast 3 เดือน
    const forecast = await forecastRevenue(3);
    if (forecast.error) return { error: forecast.error };

    // 2. Claude AI narrative — non-blocking: return cached narrative or generate in background
    const cachedNarrative = _narrativeCache.get('revForecast');
    if (!cachedNarrative) {
      // Fire-and-forget: generate narrative in background for next request
      generateRevenueForecastNarrative(forecast)
        .then(n => _narrativeCache.set('revForecast', { text: n, ts: Date.now() }))
        .catch(() => {});
    } else if (Date.now() - cachedNarrative.ts > 600000) {
      // Stale narrative — refresh in background
      generateRevenueForecastNarrative(forecast)
        .then(n => _narrativeCache.set('revForecast', { text: n, ts: Date.now() }))
        .catch(() => {});
    }

    return {
      data_source: 'HOSxP XE + Holt-Winters + Claude AI',
      generated_at: new Date().toISOString(),
      ...forecast,
      narrative: cachedNarrative?.text || null,
    };
  })
);

// ============================================================
// 🔍 DRG Revenue Leakage Detection — Undercoding Analysis
// Cache 5 นาที
// ============================================================
router.get(
  '/drg-leakage',
  cached('drgLeakage_v2', 300000, async () => {
    const T = (p, ms) =>
      Promise.race([p.catch(() => null), new Promise(r => setTimeout(() => r(null), ms))]);

    const [noCCMCC, noCCCount, lowRW, lowRWCount, byWard, totalCases] = await Promise.all([
      // เคสที่มีแค่ diagtype=1 (PDx) ไม่มี CC/MCC (diagtype 2 หรือ 3) — top 50 ตัวอย่าง
      T(
        dbQuery(`
            SELECT
                i.an, i.ward, w.name as ward_name,
                DATEDIFF(i.dchdate, i.regdate) as los,
                COALESCE(a.rw, 0) as rw, COALESCE(a.drg, '') as drg,
                d.icd10 as pdx, ic.name as pdx_name
            FROM ipt i
            INNER JOIN ward w ON i.ward = w.ward
            LEFT JOIN an_stat a ON i.an = a.an
            LEFT JOIN iptdiag d ON d.an = i.an AND d.diagtype = '1'
            LEFT JOIN icd101 ic ON ic.code = d.icd10
            WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
              AND i.dchdate IS NOT NULL AND COALESCE(a.rw, 0) > 0
              AND NOT EXISTS (SELECT 1 FROM iptdiag d2 WHERE d2.an = i.an AND d2.diagtype IN ('2','3'))
            ORDER BY los DESC, rw ASC LIMIT 50
        `),
        8000
      ),

      // จำนวน No CC/MCC ทั้งหมด (ไม่ LIMIT)
      T(
        dbQueryOne(`
            SELECT COUNT(DISTINCT i.an) as cnt
            FROM ipt i LEFT JOIN an_stat a ON i.an = a.an
            WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate IS NOT NULL
              AND COALESCE(a.rw, 0) > 0
              AND NOT EXISTS (SELECT 1 FROM iptdiag d2 WHERE d2.an = i.an AND d2.diagtype IN ('2','3'))
        `),
        5000
      ),

      // เคส LOS สูง / RW ต่ำ — top 50 ตัวอย่าง
      T(
        dbQuery(`
            SELECT
                i.an, i.ward, w.name as ward_name,
                DATEDIFF(i.dchdate, i.regdate) as los,
                COALESCE(a.rw, 0) as rw, COALESCE(a.drg, '') as drg,
                ROUND(DATEDIFF(i.dchdate, i.regdate) / GREATEST(COALESCE(a.rw, 0.1), 0.1), 1) as los_per_rw
            FROM ipt i
            INNER JOIN ward w ON i.ward = w.ward
            LEFT JOIN an_stat a ON i.an = a.an
            WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate IS NOT NULL
              AND DATEDIFF(i.dchdate, i.regdate) >= 3 AND COALESCE(a.rw, 0) < 0.6
              AND EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an)
            ORDER BY los_per_rw DESC LIMIT 50
        `),
        8000
      ),

      // จำนวน Low RW ทั้งหมด (ไม่ LIMIT)
      T(
        dbQueryOne(`
            SELECT COUNT(DISTINCT i.an) as cnt
            FROM ipt i LEFT JOIN an_stat a ON i.an = a.an
            WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate IS NOT NULL
              AND DATEDIFF(i.dchdate, i.regdate) >= 3 AND COALESCE(a.rw, 0) < 0.6
              AND EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an)
        `),
        5000
      ),

      // สรุปรายหอ: กี่เคส, RW รวม, ประมาณ RW ที่หายไป
      T(
        dbQuery(`
            SELECT
                w.name as ward,
                COUNT(DISTINCT i.an) as case_count,
                ROUND(SUM(COALESCE(a.rw, 0)), 2) as total_rw,
                ROUND(SUM(COALESCE(a.rw, 0)) * 0.3, 2) as estimated_rw_loss,
                ROUND(SUM(COALESCE(a.rw, 0)) * 0.3 * 8000, 0) as estimated_baht_loss
            FROM ipt i
            INNER JOIN ward w ON i.ward = w.ward
            LEFT JOIN an_stat a ON i.an = a.an
            WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
              AND i.dchdate IS NOT NULL
              AND COALESCE(a.rw, 0) > 0
              AND NOT EXISTS (
                SELECT 1 FROM iptdiag d2 WHERE d2.an = i.an AND d2.diagtype IN ('2','3')
              )
            GROUP BY i.ward, w.name
            ORDER BY estimated_rw_loss DESC
            LIMIT 10
        `),
        8000
      ),

      // จำนวนเคสทั้งหมดที่วิเคราะห์
      T(
        dbQueryOne(`
            SELECT COUNT(DISTINCT i.an) as total
            FROM ipt i
            LEFT JOIN an_stat a ON i.an = a.an
            WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
              AND i.dchdate IS NOT NULL
              AND COALESCE(a.rw, 0) > 0
        `),
        5000
      ),
    ]);

    const noCCList = noCCMCC || [];
    const lowRWList = lowRW || [];
    const wardList = byWard || [];

    // ใช้ count จริงจาก query ไม่ LIMIT (ไม่ใช่ array.length ที่ถูก cap ที่ 50)
    const actualNoCCCount = Number(noCCCount?.cnt || noCCList.length);
    const actualLowRWCount = Number(lowRWCount?.cnt || lowRWList.length);

    // ประมาณ RW ที่หายไป — ค่า calibrated จากข้อมูลจริง (auto-tune ทุก 24 ชม.)
    const fc = getFinanceCal();
    const RW_PRICE = fc.rw_price;
    const CC_RW_GAIN = fc.cc_rw_gain;
    const LOW_RW_GAIN = fc.low_rw_gain;
    const noCCLoss = actualNoCCCount * CC_RW_GAIN * RW_PRICE;
    const lowRWLoss = actualLowRWCount * LOW_RW_GAIN * RW_PRICE;
    const total_estimated_loss = Math.round(noCCLoss + lowRWLoss);
    const totalRWLoss =
      Math.round((actualNoCCCount * CC_RW_GAIN + actualLowRWCount * LOW_RW_GAIN) * 10) / 10;

    const leakageData = {
      total_cases: Number(totalCases?.total || 0),
      no_cc_mcc_count: actualNoCCCount,
      low_rw_count: actualLowRWCount,
      total_estimated_loss,
      estimated_rw_loss: totalRWLoss,
      rw_price_used: RW_PRICE,
      by_ward: wardList.map(w => ({
        ward: w.ward,
        case_count: Number(w.case_count || 0),
        total_rw: Number(w.total_rw || 0),
        estimated_rw_loss: Number(w.estimated_rw_loss || 0),
        estimated_baht_loss: Number(w.estimated_baht_loss || 0),
      })),
      no_cc_mcc_cases: noCCList.map(c => ({
        an: c.an,
        ward: c.ward_name || c.ward,
        los: Number(c.los || 0),
        rw: Number(c.rw || 0),
        drg: c.drg,
        pdx: c.pdx,
        pdx_name: c.pdx_name || c.pdx,
        issue: 'no_cc_mcc',
        potential_rw_gain: CC_RW_GAIN,
      })),
      low_rw_cases: lowRWList.map(c => ({
        an: c.an,
        ward: c.ward_name || c.ward,
        los: Number(c.los || 0),
        rw: Number(c.rw || 0),
        drg: c.drg,
        los_per_rw: Number(c.los_per_rw || 0),
        issue: 'low_rw_vs_los',
        potential_rw_gain: LOW_RW_GAIN,
      })),
    };

    // Claude AI narrative — non-blocking: return cached or generate in background
    const cachedDRGNarrative = _narrativeCache.get('drgLeakage');
    if (!cachedDRGNarrative || Date.now() - cachedDRGNarrative.ts > 300000) {
      generateDRGLeakageNarrative(leakageData)
        .then(n => _narrativeCache.set('drgLeakage', { text: n, ts: Date.now() }))
        .catch(() => {});
    }

    return {
      data_source: 'HOSxP XE + DRG Algorithm + Claude AI',
      generated_at: new Date().toISOString(),
      methodology: 'CC/MCC absence detection + LOS/RW ratio outlier analysis',
      rw_price_note: `ราคา RW ≈ ฿${RW_PRICE.toLocaleString()} (Global Budget 2569 — ประมาณการ)`,
      ...leakageData,
      narrative: cachedDRGNarrative?.text || null,
    };
  })
);

// ---- Revenue Fiscal — 3-year hospital-wide comparison ----
router.get('/revenue-fiscal', cached('financeRevenueFiscal', 3600000, (req) => getRevenueFiscal(null, 'HOSxP XE · vn_stat (hospital-wide)', req?.query?.start, req?.query?.end)));

export default router;
