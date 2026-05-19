import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';
import getDb from '../db/connection.js';
import logger from '../logger.js';

// ── DRG Kanban SQLite schema (auto-create) ──
try {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS drg_kanban (
      an TEXT PRIMARY KEY,
      hn TEXT,
      patient_name TEXT,
      ward TEXT,
      category TEXT DEFAULT 'pdx',
      issue TEXT,
      ai_suggest TEXT,
      est_revenue INTEGER DEFAULT 0,
      status TEXT DEFAULT 'pending',
      assigned_to TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now','localtime')),
      updated_at TEXT DEFAULT (datetime('now','localtime'))
    );
    CREATE INDEX IF NOT EXISTS idx_kanban_status ON drg_kanban(status);
  `);
} catch (e) { /* table may already exist */ }

const router = Router();
const fiscalYearStart = "CONCAT(IF(MONTH(CURDATE()) >= 10, YEAR(CURDATE()), YEAR(CURDATE()) - 1), '-10-01')";

router.get('/today', cached('mrToday_v12', 60000, async () => {
  const [summary, pttype, dep, hourly, audit, coders, pendingWards, clinicWait, ipdSummary, ipdCoders, ipdCodersDaily, ipdCodersFiscal, ipdCodersTrendFY] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(o.vn) as total_visits,
        COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN p.firstday = CURDATE() THEN 1 ELSE 0 END) as new_patients,
        SUM(CASE WHEN p.firstday != CURDATE() OR p.firstday IS NULL THEN 1 ELSE 0 END) as old_patients,
        SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 15 THEN 1 ELSE 0 END) as children,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 1) as avg_reg_time,
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service2)) / 60 ELSE NULL END), 1) as avg_proc_time,
        SUM(CASE WHEN (SELECT 1 FROM ovstdiag WHERE vn = o.vn LIMIT 1) IS NULL THEN v.income ELSE 0 END) as pending_revenue
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      INNER JOIN vn_stat v ON o.vn = v.vn
      LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate = CURDATE()
    `).catch(() => null),
    dbQuery(`
      SELECT pt.name as pttype_name, COUNT(*) as cnt
      FROM ovst o
      LEFT JOIN pttype pt ON o.pttype = pt.pttype
      WHERE o.vstdate = CURDATE()
      GROUP BY o.pttype ORDER BY cnt DESC LIMIT 5
    `).catch(() => []),
    dbQuery(`
      SELECT d.department as dep_name, COUNT(*) as cnt
      FROM ovst o
      LEFT JOIN kskdepartment d ON o.main_dep = d.depcode
      WHERE o.vstdate = CURDATE()
      GROUP BY o.main_dep ORDER BY cnt DESC LIMIT 5
    `).catch(() => []),
    dbQuery(`
      SELECT HOUR(vsttime) as hour, COUNT(*) as count
      FROM ovst WHERE vstdate = CURDATE() AND vsttime IS NOT NULL
      GROUP BY HOUR(vsttime) ORDER BY hour
    `).catch(() => []),
    // OPD Coding audit: only count visits with doctor encounter (has spclty = clinical dept)
    // Exclude lab-only, pharmacy refill, non-clinical visits
    dbQueryOne(`
      SELECT
        COUNT(o.vn) as audit_total,
        SUM(CASE WHEN EXISTS (SELECT 1 FROM ovstdiag d WHERE d.vn = o.vn) THEN 1 ELSE 0 END) as audit_coded
      FROM ovst o
      INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate = CURDATE()
        AND v.income > 0
        AND o.main_dep IS NOT NULL AND o.main_dep != ''
    `).catch(() => null),
    dbQuery(`
      SELECT 
        COALESCE(u.name, d.staff) as coder_name, 
        COUNT(DISTINCT d.vn) as coded_count 
      FROM ovstdiag d
      LEFT JOIN opduser u ON d.staff = u.loginname
      WHERE d.vstdate = CURDATE() AND d.staff IS NOT NULL AND d.staff != '' 
        AND COALESCE(u.name, d.staff) NOT LIKE 'พญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'นพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'น.ส.ธนัชพร%'
      GROUP BY d.staff, u.name
      ORDER BY coded_count DESC LIMIT 5
    `).catch(() => []),
    dbQuery(`
      SELECT 
        w.name as ward_name, 
        COUNT(i.an) as pending_count 
      FROM ipt i 
      INNER JOIN ward w ON i.ward = w.ward 
      WHERE i.dchdate IS NOT NULL 
        AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND NOT EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an)
      GROUP BY i.ward, w.name 
      ORDER BY pending_count DESC 
      LIMIT 5
    `).catch(() => []),
    dbQuery(`
      SELECT c.name as clinic_name, 
        ROUND(AVG(TIMESTAMPDIFF(MINUTE, o.vsttime, st.service2)), 0) as avg_wait
      FROM ovst o
      INNER JOIN clinic c ON o.main_dep = c.clinic
      INNER JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate = CURDATE() AND st.service2 IS NOT NULL
      GROUP BY c.clinic, c.name
      ORDER BY avg_wait DESC LIMIT 5
    `).catch(() => []),
    // IPD coding rate: exclude last 3 days (grace period) for coding rate denominator
    // but include all 30 days for RW/CMI metrics
    dbQueryOne(`
      SELECT
        COUNT(i.an) as ipd_dch_30d,
        SUM(CASE WHEN i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY) THEN 1 ELSE 0 END) as ipd_dch_eligible,
        SUM(CASE WHEN i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an) THEN 1 ELSE 0 END) as ipd_coded_30d,
        SUM(CASE WHEN i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND i.adjrw IS NOT NULL THEN 1 ELSE 0 END) as ipd_drg_calculated_30d,
        ROUND(SUM(i.adjrw), 2) as total_rw_30d,
        ROUND(AVG(i.adjrw), 2) as avg_rw_30d,
        ROUND(AVG(CASE WHEN a.rw > 0 THEN a.rw END), 4) as cmi,
        ROUND(AVG(CASE WHEN i.adjrw > 0 THEN i.adjrw END), 4) as adj_cmi,
        ROUND(SUM(CASE WHEN a.rw > 0 THEN a.rw ELSE 0 END), 2) as total_base_rw,
        SUM(CASE WHEN i.adjrw IS NOT NULL AND i.adjrw < a.rw THEN 1 ELSE 0 END) as rw_reduced_cases,
        ROUND(SUM(CASE WHEN i.adjrw IS NOT NULL THEN GREATEST(a.rw - i.adjrw, 0) ELSE 0 END), 2) as rw_loss,
        ROUND(AVG((SELECT DATEDIFF(MIN(d.modify_datetime), i.dchdate) FROM iptdiag d WHERE d.an = i.an)), 1) as avg_coding_days
      FROM ipt i
      LEFT JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate <= CURDATE()
    `).catch(() => null),
    dbQuery(`
      SELECT 
        COALESCE(u.name, d.staff) as coder_name, 
        COUNT(DISTINCT d.an) as coded_count 
      FROM iptdiag d
      LEFT JOIN opduser u ON d.staff = u.loginname
      WHERE d.modify_datetime >= DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND d.staff IS NOT NULL AND d.staff != ''
        AND COALESCE(u.name, d.staff) NOT LIKE 'พญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'นพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'น.ส.ธนัชพร%'
      GROUP BY d.staff, u.name
      ORDER BY coded_count DESC LIMIT 5
    `).catch(() => []),
    dbQuery(`
      SELECT 
        DATE(d.modify_datetime) as record_date, 
        COALESCE(u.name, d.staff) as coder_name, 
        COUNT(DISTINCT d.an) as coded_count 
      FROM iptdiag d
      LEFT JOIN opduser u ON d.staff = u.loginname
      WHERE d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') AND d.staff IS NOT NULL AND d.staff != ''
        AND COALESCE(u.name, d.staff) NOT LIKE 'พญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'นพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'น.ส.ธนัชพร%'
      GROUP BY record_date, coder_name
      ORDER BY record_date ASC
    `).catch(() => []),
    dbQuery(`
      SELECT 
        COALESCE(u.name, d.staff) as coder_name,
        COUNT(DISTINCT CASE WHEN d.modify_datetime >= ${fiscalYearStart} THEN d.an END) as fiscal_total,
        COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN d.an END) as current_month_total,
        COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH) ,'%Y-%m-01') 
                             AND d.modify_datetime < DATE_FORMAT(CURDATE() ,'%Y-%m-01') 
                             AND DAY(d.modify_datetime) <= DAY(CURDATE()) THEN d.an END) as prev_month_total,
        ROUND(COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') AND d.diagtype IN ('2','3') THEN d.an END) /
              NULLIF(COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN d.an END), 0), 2) as cc_rate,
        ROUND(SUM(CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN 1 ELSE 0 END) / 
              NULLIF(COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN d.an END), 0), 2) as diag_per_case,
        ROUND(SUM(CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') AND d.diagtype = '1' THEN 1 ELSE 0 END) / 
              NULLIF(COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN d.an END), 0), 2) as type1_per_case,
        ROUND(SUM(CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') AND d.diagtype = '2' THEN 1 ELSE 0 END) / 
              NULLIF(COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN d.an END), 0), 2) as type2_per_case,
        ROUND(SUM(CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') AND d.diagtype = '3' THEN 1 ELSE 0 END) / 
              NULLIF(COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN d.an END), 0), 2) as type3_per_case,
        ROUND(SUM(CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') AND d.diagtype = '4' THEN 1 ELSE 0 END) / 
              NULLIF(COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN d.an END), 0), 2) as type4_per_case,
        ROUND(SUM(CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') AND d.diagtype = '5' THEN 1 ELSE 0 END) / 
              NULLIF(COUNT(DISTINCT CASE WHEN d.modify_datetime >= DATE_FORMAT(CURDATE() ,'%Y-%m-01') THEN d.an END), 0), 2) as type5_per_case
      FROM iptdiag d
      LEFT JOIN opduser u ON d.staff = u.loginname
      WHERE d.modify_datetime >= ${fiscalYearStart}
        AND d.staff IS NOT NULL AND d.staff != ''
        AND COALESCE(u.name, d.staff) NOT LIKE 'พญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'นพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'น.ส.ธนัชพร%'
      GROUP BY d.staff, u.name
      ORDER BY current_month_total DESC LIMIT 10
    `).catch(() => []),
    dbQuery(`
      SELECT 
        DATE_FORMAT(d.modify_datetime, '%Y-%m') as month_key,
        COALESCE(u.name, d.staff) as coder_name,
        COUNT(DISTINCT d.an) as coded_count
      FROM iptdiag d
      LEFT JOIN opduser u ON d.staff = u.loginname
      WHERE d.modify_datetime >= ${fiscalYearStart}
        AND d.staff IS NOT NULL AND d.staff != ''
        AND COALESCE(u.name, d.staff) NOT LIKE 'พญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'นพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'น.ส.ธนัชพร%'
      GROUP BY month_key, d.staff, u.name
      ORDER BY month_key ASC
    `).catch(() => [])
  ]);

  const hArr = Array.from({ length: 24 }, (_, i) => ({
    hour: i, label: `${String(i).padStart(2, '0')}:00`, count: 0
  }));
  (hourly || []).forEach(h => { if (hArr[h.hour]) hArr[h.hour].count = Number(h.count || 0); });

  const auditTotal = Number(audit?.audit_total || 0);
  const auditCoded = Number(audit?.audit_coded || 0);
  const qualityScore = auditTotal > 0 ? Math.round((auditCoded / auditTotal) * 100) : 100;

  const ipdAuditTotal = Number(ipdSummary?.ipd_dch_30d || 0);
  const ipdEligible = Number(ipdSummary?.ipd_dch_eligible || 0);
  const ipdAuditCoded = Number(ipdSummary?.ipd_coded_30d || 0);
  const ipdDrgCalculated = Number(ipdSummary?.ipd_drg_calculated_30d || 0);
  // Use eligible (excluding 3-day grace period) for coding rate
  const ipdQualityScore = ipdEligible > 0 ? Math.round((ipdAuditCoded / ipdEligible) * 100) : 100;
  const ipdDrgScore = ipdEligible > 0 ? Math.round((ipdDrgCalculated / ipdEligible) * 100) : 100;

  return {
    ...(summary || {}),
    new_patients: Number(summary?.new_patients || 0),
    old_patients: Number(summary?.old_patients || 0),
    avg_reg_time: Number(summary?.avg_reg_time || 0),
    avg_proc_time: Number(summary?.avg_proc_time || 0),
    pending_revenue: Number(summary?.pending_revenue || 0),
    quality_score: qualityScore,
    top_pttype: (pttype || []).map(p => ({ name: p.pttype_name || 'ไม่ระบุ', count: Number(p.cnt || 0) })),
    top_departments: (dep || []).map(d => ({ name: d.dep_name || 'ไม่ระบุ', count: Number(d.cnt || 0) })),
    hourly: hArr,
    audit_total: auditTotal,
    audit_coded: auditCoded,
    pending_codes: Math.max(0, auditTotal - auditCoded),
    coders: (coders || []).map(c => ({ name: c.coder_name || 'ไม่ระบุ', count: Number(c.coded_count || 0) })),

    // IPD Data
    ipd_audit_total: ipdEligible,
    ipd_audit_coded: ipdAuditCoded,
    ipd_pending_codes: Math.max(0, ipdEligible - ipdAuditCoded),
    ipd_drg_calculated: ipdDrgCalculated,
    ipd_quality_score: ipdQualityScore,
    ipd_drg_score: ipdDrgScore,
    ipd_total_rw: Number(ipdSummary?.total_rw_30d || 0),
    ipd_avg_rw: Number(ipdSummary?.avg_rw_30d || 0),
    ipd_cmi: Number(ipdSummary?.cmi || 0),
    ipd_adj_cmi: Number(ipdSummary?.adj_cmi || 0),
    ipd_total_base_rw: Number(ipdSummary?.total_base_rw || 0),
    ipd_rw_reduced_cases: Number(ipdSummary?.rw_reduced_cases || 0),
    ipd_rw_loss: Number(ipdSummary?.rw_loss || 0),
    ipd_avg_coding_days: Number(ipdSummary?.avg_coding_days || 0),
    ipd_coders: (ipdCoders || []).map(c => ({ name: c.coder_name || 'ไม่ระบุ', count: Number(c.coded_count || 0) })),
    pending_wards: (pendingWards || []).map(w => ({ ward: w.ward_name || 'ไม่ระบุ', count: Number(w.pending_count || 0) })),
    ipd_coders_daily: (ipdCodersDaily || []).map(c => ({ date: c.record_date, name: c.coder_name || 'ไม่ระบุ', count: Number(c.coded_count || 0) })),
    ipd_coders_fiscal: (ipdCodersFiscal || []).map(row => ({
      name: row.coder_name || 'ไม่ระบุ',
      fiscal_total: Number(row.fiscal_total || 0),
      current_month_total: Number(row.current_month_total || 0),
      prev_month_total: Number(row.prev_month_total || 0),
      cc_rate: Number(row.cc_rate || 0),
      diag_per_case: Number(row.diag_per_case || 0)
    })),

    ipd_coders_trend_fy: (ipdCodersTrendFY || []).map(row => ({
      month: row.month_key,
      name: row.coder_name || 'ไม่ระบุ',
      count: Number(row.coded_count || 0)
    })),
    clinic_wait: (clinicWait || []).map(cw => ({ clinic: cw.clinic_name, wait: Number(cw.avg_wait || 0) })),
    timestamp: new Date().toISOString()
  };
}));

router.get('/analytics', cached('mrAnalytics_v2', 120000, async () => {
  const [summary, monthly, audit30, hourlyBenchmark] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(*) as total_visits,
      COUNT(DISTINCT DATE(o.vstdate)) as days,
      SUM(CASE WHEN p.firstday = o.vstdate THEN 1 ELSE 0 END) as new_patients,
      SUM(CASE WHEN (SELECT 1 FROM ovstdiag WHERE vn = o.vn LIMIT 1) IS NULL THEN v.income ELSE 0 END) as revenue_loss_30d,
      (SELECT SUM(CASE WHEN (SELECT 1 FROM iptdiag WHERE an = a.an LIMIT 1) IS NULL THEN a.income ELSE 0 END) 
       FROM an_stat a WHERE a.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) as ipd_revenue_loss_30d
      FROM ovst o 
      INNER JOIN patient p ON o.hn = p.hn
      INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),
    dbQuery(`
      SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month,
      COUNT(*) as total_visits,
      SUM(CASE WHEN p.firstday = o.vstdate THEN 1 ELSE 0 END) as new_patients
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month
    `).catch(() => []),
    dbQueryOneHeavy('mrAudit30d', 60, `
      SELECT 
        COUNT(o.vn) as audit_total,
        SUM(CASE WHEN EXISTS (SELECT 1 FROM ovstdiag d WHERE d.vn = o.vn) THEN 1 ELSE 0 END) as audit_coded
      FROM ovst o FORCE INDEX (ix_vstdate)
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),
    dbQueryHeavy('mrHourlyBenchmark30d', 240, `
      SELECT HOUR(o.vsttime) as hr, COUNT(*) / COUNT(DISTINCT o.vstdate) as avg_visits
      FROM ovst o FORCE INDEX (ix_vstdate)
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY HOUR(o.vsttime)
      ORDER BY hr
    `).catch(() => [])
  ]);

  const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

  return {
    total_visits: Number(summary?.total_visits || 0),
    avg_daily_visits: summary?.days ? Math.round(Number(summary.total_visits) / Number(summary.days)) : 0,
    new_patients: Number(summary?.new_patients || 0),
    old_patients: Number(summary?.old_patients || 0),
    revenue_loss_30d: Number(summary?.revenue_loss_30d || 0),
    ipd_revenue_loss_30d: Number(summary?.ipd_revenue_loss_30d || 0),
    audit_total: Number(audit30?.audit_total || 0),
    audit_coded: Number(audit30?.audit_coded || 0),
    pending_codes: Math.max(0, Number(audit30?.audit_total || 0) - Number(audit30?.audit_coded || 0)),
    monthly: (monthly || []).map(m => ({
      month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
      visits: Number(m.total_visits || 0),
      new_patients: Number(m.new_patients || 0)
    })),
    hourly_benchmark: (hourlyBenchmark || []).map(h => ({ hr: h.hr, avg: Number(h.avg_visits || 0) })),
    ai_insights: {
      revenue_impact: {
        total_pending: Number(summary?.revenue_loss_30d || 0) + Number(summary?.ipd_revenue_loss_30d || 0),
        opd_pending: Number(summary?.revenue_loss_30d || 0),
        ipd_pending: Number(summary?.ipd_revenue_loss_30d || 0),
        status: (Number(summary?.revenue_loss_30d || 0) + Number(summary?.ipd_revenue_loss_30d || 0)) > 1000000 ? 'critical' : (Number(summary?.revenue_loss_30d || 0) + Number(summary?.ipd_revenue_loss_30d || 0)) > 500000 ? 'warning' : 'good',
        recommendation: (Number(summary?.revenue_loss_30d || 0) + Number(summary?.ipd_revenue_loss_30d || 0)) > 500000 ? '🚨 เร่งสรุปชาร์ตค้างจ่ายเพื่อดึงกระแสเงินสด (Cash Flow)' : '✅ การสรุปชาร์ตอยู่ในเกณฑ์ดีเยี่ยม'
      },
      coding_productivity: {
        score: audit30?.audit_total > 0 ? Math.round((audit30.audit_coded / audit30.audit_total) * 100) : 100,
        pending_count: Math.max(0, Number(audit30?.audit_total || 0) - Number(audit30?.audit_coded || 0)),
        status: (Number(audit30?.audit_total || 0) - Number(audit30?.audit_coded || 0)) > 500 ? 'critical' : 'stable'
      },
      operational_alert: (summary?.revenue_loss_30d || 0) > 1000000 ? 'พบ Revenue Leakage สูงผิดปกติจากการสรุปรหัสโรคที่ล่าช้า' : null
    },
    timestamp: new Date().toISOString()
  };
}));

// ━━━━━━ CMI Analytics — Case Mix Index Deep Analysis ━━━━━━
router.get('/cmi', cached('mrCMI_v3', 600000, async () => {
  const fiscalStart = `CONCAT(IF(MONTH(CURDATE()) >= 10, YEAR(CURDATE()), YEAR(CURDATE()) - 1), '-10-01')`;

  const [overall, monthly, byWard, byDRG, severity, coderCMI] = await Promise.all([
    // 1. Overall CMI (fiscal year)
    dbQueryOneHeavy('cmi_overall_fy', 120, `
      SELECT
        COUNT(*) AS total_cases,
        SUM(CASE WHEN a.rw > 0 THEN 1 ELSE 0 END) AS drg_cases,
        ROUND(AVG(CASE WHEN a.rw > 0 THEN a.rw END), 4) AS cmi,
        ROUND(AVG(CASE WHEN i.adjrw > 0 THEN i.adjrw END), 4) AS adj_cmi,
        ROUND(SUM(CASE WHEN a.rw > 0 THEN a.rw ELSE 0 END), 2) AS total_rw,
        ROUND(SUM(CASE WHEN i.adjrw > 0 THEN i.adjrw ELSE 0 END), 2) AS total_adjrw,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) AS alos,
        ROUND(AVG(a.income)) AS avg_income,
        ROUND(SUM(a.income)) AS total_income,
        ROUND(AVG(CASE WHEN a.rw > 0 THEN a.income / a.rw END)) AS revenue_per_rw,
        SUM(CASE WHEN i.adjrw IS NOT NULL AND i.adjrw < a.rw THEN 1 ELSE 0 END) AS cases_rw_reduced,
        ROUND(SUM(CASE WHEN i.adjrw IS NOT NULL THEN a.rw - i.adjrw ELSE 0 END), 2) AS total_rw_loss
      FROM ipt i
      JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= ${fiscalStart} AND i.dchdate IS NOT NULL AND i.ward != '06'
    `).catch(() => null),

    // 2. CMI monthly trend (fiscal year)
    dbQueryHeavy('cmi_monthly_fy', 120, `
      SELECT
        DATE_FORMAT(i.dchdate, '%Y-%m') AS month,
        COUNT(*) AS cases,
        ROUND(AVG(CASE WHEN a.rw > 0 THEN a.rw END), 4) AS cmi,
        ROUND(AVG(CASE WHEN i.adjrw > 0 THEN i.adjrw END), 4) AS adj_cmi,
        ROUND(SUM(CASE WHEN a.rw > 0 THEN a.rw ELSE 0 END), 2) AS total_rw,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) AS alos,
        ROUND(AVG(a.income)) AS avg_income
      FROM ipt i
      JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= ${fiscalStart} AND i.dchdate IS NOT NULL AND i.ward != '06' AND a.rw > 0
      GROUP BY DATE_FORMAT(i.dchdate, '%Y-%m')
      ORDER BY month
    `).catch(() => []),

    // 3. CMI by ward
    dbQueryHeavy('cmi_by_ward', 120, `
      SELECT
        w.name AS ward_name,
        COUNT(*) AS cases,
        ROUND(AVG(CASE WHEN a.rw > 0 THEN a.rw END), 4) AS cmi,
        ROUND(AVG(CASE WHEN i.adjrw > 0 THEN i.adjrw END), 4) AS adj_cmi,
        ROUND(SUM(CASE WHEN a.rw > 0 THEN a.rw ELSE 0 END), 2) AS total_rw,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) AS alos,
        ROUND(AVG(a.income)) AS avg_income,
        SUM(CASE WHEN i.adjrw IS NOT NULL AND i.adjrw < a.rw THEN 1 ELSE 0 END) AS rw_reduced_cases,
        ROUND(SUM(CASE WHEN i.adjrw IS NOT NULL THEN GREATEST(a.rw - i.adjrw, 0) ELSE 0 END), 2) AS rw_loss
      FROM ipt i
      JOIN an_stat a ON i.an = a.an
      JOIN ward w ON i.ward = w.ward
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND i.dchdate IS NOT NULL AND i.ward != '06'
      GROUP BY w.name
      HAVING cases >= 5
      ORDER BY cmi DESC
    `).catch(() => []),

    // 4. Top DRGs by volume and RW
    dbQueryHeavy('cmi_top_drg', 120, `
      SELECT
        a.drg,
        MIN(SUBSTRING_INDEX(icd.tname, ' ', 5)) AS drg_desc,
        COUNT(*) AS cases,
        ROUND(AVG(a.rw), 4) AS avg_rw,
        ROUND(SUM(a.rw), 2) AS total_rw,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) AS alos,
        ROUND(AVG(a.income)) AS avg_income,
        ROUND(SUM(a.income)) AS total_income
      FROM ipt i
      JOIN an_stat a ON i.an = a.an
      LEFT JOIN iptdiag id ON i.an = id.an AND id.diagtype = 1
      LEFT JOIN icd101 icd ON id.icd10 = icd.code
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND i.dchdate IS NOT NULL
        AND a.drg IS NOT NULL AND a.drg != '' AND i.ward != '06'
      GROUP BY a.drg
      HAVING cases >= 3
      ORDER BY total_rw DESC
      LIMIT 20
    `).catch(() => []),

    // 5. CMI by severity (RW bands)
    dbQueryHeavy('cmi_severity', 120, `
      SELECT
        CASE
          WHEN a.rw >= 3.0 THEN 'Very High (RW≥3)'
          WHEN a.rw >= 2.0 THEN 'High (RW 2-3)'
          WHEN a.rw >= 1.0 THEN 'Moderate (RW 1-2)'
          WHEN a.rw >= 0.5 THEN 'Low (RW 0.5-1)'
          ELSE 'Very Low (RW<0.5)'
        END AS severity_band,
        COUNT(*) AS cases,
        ROUND(AVG(a.rw), 4) AS avg_rw,
        ROUND(SUM(a.rw), 2) AS total_rw,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) AS alos,
        ROUND(AVG(a.income)) AS avg_income,
        ROUND(SUM(a.income)) AS total_income
      FROM ipt i
      JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND i.dchdate IS NOT NULL
        AND a.rw > 0 AND i.ward != '06'
      GROUP BY severity_band
      ORDER BY avg_rw DESC
    `).catch(() => []),

    // 6. CMI by coder (who coded → impact on RW)
    dbQueryHeavy('cmi_by_coder', 120, `
      SELECT
        COALESCE(u.name, d.staff) AS coder_name,
        COUNT(DISTINCT d.an) AS cases_coded,
        ROUND(AVG(a.rw), 4) AS avg_rw_coded,
        ROUND(AVG(CASE WHEN i.adjrw > 0 THEN i.adjrw END), 4) AS avg_adjrw_coded,
        ROUND(SUM(a.rw), 2) AS total_rw,
        ROUND(AVG(
          (SELECT COUNT(*) FROM iptdiag d2 WHERE d2.an = d.an AND d2.diagtype IN ('2','3'))
        ), 1) AS avg_cc_per_case
      FROM iptdiag d
      JOIN ipt i ON d.an = i.an
      JOIN an_stat a ON i.an = a.an
      LEFT JOIN opduser u ON d.staff = u.loginname
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND i.dchdate IS NOT NULL
        AND d.diagtype = '1' AND d.staff IS NOT NULL AND d.staff != ''
        AND COALESCE(u.name, d.staff) NOT LIKE 'พญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'นพ.%'
        AND COALESCE(u.name, d.staff) NOT LIKE 'ทพญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพ.%'
        AND a.rw > 0
      GROUP BY d.staff, u.name
      HAVING cases_coded >= 5
      ORDER BY total_rw DESC
      LIMIT 10
    `).catch(() => []),
  ]);

  // ── Compute CMI insights ──
  const cmi = Number(overall?.cmi || 0);
  const adjCmi = Number(overall?.adj_cmi || 0);
  const rwLoss = Number(overall?.total_rw_loss || 0);
  const rwLossCases = Number(overall?.cases_rw_reduced || 0);
  const totalCases = Number(overall?.total_cases || 0);
  const revenuePerRW = Number(overall?.revenue_per_rw || 8350);

  // HA Thailand F2 benchmark CMI
  const CMI_BENCHMARK = 0.80;

  const insights = {
    cmi_status: cmi >= 1.0 ? 'excellent' : cmi >= CMI_BENCHMARK ? 'good' : cmi >= 0.6 ? 'below_benchmark' : 'critical',
    cmi_vs_benchmark: cmi > 0 ? Math.round(((cmi - CMI_BENCHMARK) / CMI_BENCHMARK) * 100) : 0,
    rw_adjustment_impact: {
      cases_reduced: rwLossCases,
      total_rw_loss: rwLoss,
      estimated_revenue_loss: Math.round(rwLoss * revenuePerRW),
      pct_cases_reduced: totalCases > 0 ? Math.round((rwLossCases / totalCases) * 100) : 0,
    },
    coding_quality: {
      avg_cc_rate: (coderCMI || []).reduce((s, c) => s + Number(c.avg_cc_per_case || 0), 0) / Math.max((coderCMI || []).length, 1),
      top_coder_rw: (coderCMI || [])[0]?.coder_name || '—',
    },
    recommendations: [],
  };

  // Generate recommendations
  if (cmi < CMI_BENCHMARK) {
    insights.recommendations.push(`CMI ${cmi.toFixed(3)} ต่ำกว่า benchmark ${CMI_BENCHMARK} — ทบทวน CC/MCC coding เพื่อเพิ่ม RW`);
  }
  if (rwLoss > 5) {
    insights.recommendations.push(`RW ถูกปรับลดรวม ${rwLoss.toFixed(1)} RW (≈฿${Math.round(rwLoss * revenuePerRW).toLocaleString()}) — ตรวจสอบ LOS outlier`);
  }
  if (adjCmi > 0 && adjCmi < cmi * 0.85) {
    insights.recommendations.push(`AdjRW (${adjCmi.toFixed(3)}) ต่ำกว่า Base RW (${cmi.toFixed(3)}) ≥15% — ตรวจสอบ LOS trimpoint`);
  }
  const lowRWWards = (byWard || []).filter(w => Number(w.cmi) < 0.5 && Number(w.cases) >= 10);
  if (lowRWWards.length > 0) {
    insights.recommendations.push(`Ward ที่ CMI ต่ำมาก: ${lowRWWards.map(w => w.ward_name).join(', ')} — ตรวจสอบ coding completeness`);
  }
  if (insights.recommendations.length === 0) {
    insights.recommendations.push('CMI อยู่ในเกณฑ์ดี — ดำเนินการ coding ตามมาตรฐานต่อไป');
  }

  const MTH = ['','ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

  return {
    data_source: 'HOSxP XE · an_stat + ipt + ipt_drg_result',
    timestamp: new Date().toISOString(),
    period: 'Fiscal Year',

    summary: {
      cmi: cmi,
      adj_cmi: adjCmi,
      total_rw: Number(overall?.total_rw || 0),
      total_adjrw: Number(overall?.total_adjrw || 0),
      total_cases: totalCases,
      drg_cases: Number(overall?.drg_cases || 0),
      alos: Number(overall?.alos || 0),
      avg_income: Number(overall?.avg_income || 0),
      total_income: Number(overall?.total_income || 0),
      revenue_per_rw: revenuePerRW,
      benchmark: CMI_BENCHMARK,
    },

    monthly_trend: (monthly || []).map(m => ({
      month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
      month_key: m.month,
      cases: Number(m.cases),
      cmi: Number(m.cmi),
      adj_cmi: Number(m.adj_cmi || 0),
      total_rw: Number(m.total_rw),
      alos: Number(m.alos),
      avg_income: Number(m.avg_income),
    })),

    by_ward: (byWard || []).map(w => ({
      ward: w.ward_name,
      cases: Number(w.cases),
      cmi: Number(w.cmi),
      adj_cmi: Number(w.adj_cmi || 0),
      total_rw: Number(w.total_rw),
      alos: Number(w.alos),
      avg_income: Number(w.avg_income),
      rw_reduced: Number(w.rw_reduced_cases),
      rw_loss: Number(w.rw_loss),
    })),

    top_drg: (byDRG || []).map(d => ({
      drg: d.drg,
      description: d.drg_desc || d.drg,
      cases: Number(d.cases),
      avg_rw: Number(d.avg_rw),
      total_rw: Number(d.total_rw),
      alos: Number(d.alos),
      avg_income: Number(d.avg_income),
      total_income: Number(d.total_income),
    })),

    severity_distribution: severity || [],

    coder_cmi: (coderCMI || []).map(c => ({
      coder: c.coder_name,
      cases: Number(c.cases_coded),
      avg_rw: Number(c.avg_rw_coded),
      avg_adjrw: Number(c.avg_adjrw_coded || 0),
      total_rw: Number(c.total_rw),
      avg_cc_per_case: Number(c.avg_cc_per_case || 0),
    })),

    insights,
  };
}));

// ━━━━━━ DRG Optimization AI — Fiscal Year (Real Data) ━━━━━━
router.get('/drg-optimization', cached('drgOptimization_v13', 360000, async () => {
  const fiscalYearStart = `CONCAT(IF(MONTH(CURDATE()) >= 10, YEAR(CURDATE()), YEAR(CURDATE()) - 1), '-10-01')`;

  try {
    // 1. PDx Optimization (Unspecified PDx)
    const pdxCases = await dbQueryHeavy('mrPdxOptimization', 360, `
          SELECT p.hn, i.an, REPLACE(CONCAT(p.pname, p.fname, ' ', p.lname), '  ', ' ') as name, w.name as ward,
                 d.icd10 as original_pdx, a.rw,
                 GROUP_CONCAT(DISTINCT IF(lo.lab_items_name_ref IS NULL, NULL, CONCAT(lo.lab_items_name_ref, ' [', IFNULL(lo.lab_order_result, ''), ']')) SEPARATOR ', ') as abnormal_labs
          FROM ipt i
          INNER JOIN patient p ON i.hn = p.hn
          INNER JOIN ward w ON i.ward = w.ward
          INNER JOIN an_stat a ON i.an = a.an
          INNER JOIN iptdiag d ON i.an = d.an AND d.diagtype = '1'
          LEFT JOIN lab_head lh ON lh.hn = i.hn AND lh.order_date BETWEEN i.regdate AND i.dchdate
          LEFT JOIN lab_order lo ON lo.lab_order_number = lh.lab_order_number 
            AND lo.abnormal_result = 'Y' 
            AND (lo.lab_items_name_ref LIKE '%WBC%' OR lo.lab_items_name_ref LIKE '%Cultur%' OR lo.lab_items_name_ref LIKE '%Hemo%' OR lo.lab_items_name_ref LIKE '%Stool%')
          WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            AND d.icd10 IN ('J189', 'K358', 'A419', 'I64', 'N201', 'A099', 'N390')
          GROUP BY p.hn, i.an, name, ward, original_pdx, a.rw
          ORDER BY i.dchdate DESC
          LIMIT 30
      `).catch(() => []);

    // 2. LOS Alert (Short/Long Stay)
    const losCases = await dbQueryHeavy('mrLosAlerts', 360, `
          SELECT p.hn, i.an, REPLACE(CONCAT(p.pname, p.fname, ' ', p.lname), '  ', ' ') as name, w.name as ward,
                 DATEDIFF(i.dchdate, i.regdate) as los, a.income, idr.rw, idr.adjrw, idr.wtlos
          FROM ipt i
          INNER JOIN patient p ON i.hn = p.hn
          INNER JOIN ward w ON i.ward = w.ward
          INNER JOIN an_stat a ON i.an = a.an
          LEFT JOIN ipt_drg_result idr ON idr.an = i.an
          WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            AND (DATEDIFF(i.dchdate, i.regdate) <= 1 OR DATEDIFF(i.dchdate, i.regdate) >= 14)
            AND i.dchdate <= CURDATE()
          ORDER BY i.dchdate DESC
          LIMIT 30
      `).catch(() => []);

    // 3. MCC/CC Missing (High severity but missing secondary dx)
    const mccCases = await dbQueryHeavy('mrMccMissing', 360, `
          SELECT p.hn, i.an, REPLACE(CONCAT(p.pname, p.fname, ' ', p.lname), '  ', ' ') as name, w.name as ward,
                 a.income, a.rw, GROUP_CONCAT(DISTINCT IF(lo.lab_items_name_ref IS NULL, NULL, CONCAT(lo.lab_items_name_ref, ' [', IFNULL(lo.lab_order_result, ''), ']')) SEPARATOR ', ') as abnormal_labs
          FROM ipt i
          INNER JOIN patient p ON i.hn = p.hn
          INNER JOIN ward w ON i.ward = w.ward
          INNER JOIN an_stat a ON i.an = a.an
          LEFT JOIN lab_head lh ON lh.hn = i.hn AND lh.order_date BETWEEN i.regdate AND i.dchdate
          LEFT JOIN lab_order lo ON lo.lab_order_number = lh.lab_order_number 
            AND lo.abnormal_result = 'Y' 
            AND (lo.lab_items_name_ref LIKE '%Creatinine%' OR lo.lab_items_name_ref LIKE '%Lactate%' OR lo.lab_items_name_ref LIKE '%BUN%' OR lo.lab_items_name_ref LIKE '%WBC%' OR lo.lab_items_name_ref LIKE '%Hemo%')
          WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            AND a.income > 30000
            AND a.rw > 0 AND a.rw < 1.0
            AND EXISTS (SELECT 1 FROM iptdiag dx WHERE dx.an = i.an AND dx.diagtype = '1')
          GROUP BY p.hn, i.an, name, ward, a.income, a.rw
          ORDER BY i.dchdate DESC
          LIMIT 30
      `).catch(err => { logger.error('MCC query error', { error: err.message }); return []; });

    // 4. Abnormal Labs Alerts (Detect potential CC/MCC from Lab)
    //    Include existing diagnoses to avoid recommending codes already present
    const labCases = await dbQueryHeavy('mrAbnormalLabs_v2', 120, `
          SELECT p.hn, i.an, REPLACE(CONCAT(p.pname, p.fname, ' ', p.lname), '  ', ' ') as name, w.name as ward,
                 lo.lab_items_name_ref as lab_name, lo.lab_order_result as lab_result, lo.lab_items_normal_value_ref as lab_normal, a.income, a.rw,
                 (SELECT GROUP_CONCAT(dx.icd10 SEPARATOR ',') FROM iptdiag dx WHERE dx.an = i.an) as existing_dx
          FROM ipt i
          INNER JOIN patient p ON i.hn = p.hn
          INNER JOIN ward w ON i.ward = w.ward
          INNER JOIN an_stat a ON i.an = a.an
          INNER JOIN lab_head lh ON lh.hn = i.hn AND lh.order_date BETWEEN i.regdate AND i.dchdate
          INNER JOIN lab_order lo ON lo.lab_order_number = lh.lab_order_number
          WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            AND lo.abnormal_result = 'Y'
          ORDER BY lh.order_date DESC
          LIMIT 200
      `).catch(err => { logger.error('Lab query error', { error: err.message }); return []; });

    // Build AI Insights
    const pdxMapped = (pdxCases || []).map(c => {
      let baseSuggest = 'ตรวจสอบความเจาะจงของรหัสโรค';
      let estRevenue = 4200;
      if (c.original_pdx === 'J189') { baseSuggest = 'เปลี่ยนเป็น J15.0 (+ RW 0.8)'; estRevenue = 8400; }
      else if (c.original_pdx === 'K358') { baseSuggest = 'เปลี่ยนเป็น K35.2 (+ RW 1.2)'; estRevenue = 12500; }
      else if (c.original_pdx === 'A419') { baseSuggest = 'เปลี่ยนเป็น A41.51 (+ RW 0.5)'; estRevenue = 5000; }
      else if (c.original_pdx === 'I64') { baseSuggest = 'เปลี่ยนเป็น I63.4 (+ RW 1.0)'; estRevenue = 10000; }
      else if (c.original_pdx === 'N201') { baseSuggest = 'เปลี่ยนเป็น N13.2 (+ RW 0.4)'; estRevenue = 4200; }
      else if (c.original_pdx === 'A099') { baseSuggest = 'เจาะจงเชื้อโรค A09.0 (+ RW 0.5)'; estRevenue = 3000; }
      else if (c.original_pdx === 'N390') { baseSuggest = 'ระบุเชื้อก่อโรค เช่น B96.2 (E.coli) หรือ B96.0 (Mycoplasma) เป็น secondary dx (+CC/MCC)'; estRevenue = 3500; }

      let issue = `PDx เดิม: ${c.original_pdx} (RW ${c.rw || 0}) Unspecified`;
      let aiSuggest = baseSuggest;

      let labsStr = c.abnormal_labs ? c.abnormal_labs : '';
      if (labsStr) {
        if (labsStr.length > 90) labsStr = labsStr.substring(0, 90) + '...';
        issue = `PDx เดิม: ${c.original_pdx} (RW ${c.rw || 0}) ── 🩸 พบผล Lab: ${labsStr}`;
        aiSuggest = `AI เสนอ: ${baseSuggest} และอ้างอิงจากผล Lab ควรแจ้งเตือนแพทย์ทบทวนชาร์ต`;
      } else {
        aiSuggest = `AI เสนอ: ${baseSuggest} (ควรตรวจสอบประวัติเพิ่มเติม)`;
      }

      return { hn: c.hn, an: c.an, name: c.name, ward: c.ward, issue, aiSuggest, estRevenue };
    });

    const losMapped = (losCases || []).map(c => {
      let stayType = c.los <= 1 ? 'Short Stay Outlier' : 'Long Stay Outlier';

      let rwData = '';
      let warningText = '';
      if (c.rw && c.adjrw) {
        const diff = (c.rw - c.adjrw).toFixed(4);
        if (c.rw > c.adjrw) {
          warningText = ` (สูญเสีย AdjRW -${diff})`;
        } else if (c.rw < c.adjrw) {
          warningText = ` (AdjRW เพิ่มขึ้น +${Math.abs(diff).toFixed(4)})`;
        }
        rwData = `(RW Base ${c.rw.toFixed(4)} 📉 AdjRW เหลือ ${c.adjrw.toFixed(4)})`;
      } else {
        rwData = `(รอประมวลผล RW System)`;
      }

      let issue = `ค่ารักษา ฿${Number(c.income || 0).toLocaleString()} บ. ${rwData} ── ⏱️ วันนอน ${c.los} วัน (${stayType})`;
      let aiSuggest = c.los <= 1
        ? `AI เสนอ: ถูกปรับลด AdjRW ตรวจสอบเกณฑ์ One Day Surgery ให้ถูกต้อง${warningText}`
        : `AI เสนอ: วันนอนนานผิดปกติ ระบุ Medical Necessity แจ้ง CDI ให้แพทย์ทบทวนชาร์ต${warningText}`;

      return { hn: c.hn, an: c.an, name: c.name, ward: c.ward, issue, aiSuggest };
    });

    const mccMapped = (mccCases || []).map(c => {
      let issue = `ค่ารักษา ฿${Number(c.income || 0).toLocaleString()} บ. (RW ${c.rw || 0}) แต่ไม่มีระบุ CC/MCC`;
      let aiSuggest = 'AI หาสัญญาณ Sepsis/AKI จากการวินิจฉัยเพิ่มเติม';
      let estRevenue = 12500;

      let labs = c.abnormal_labs ? c.abnormal_labs.toLowerCase() : '';
      let detected = [];
      if (labs.includes('creatinine') || labs.includes('bun')) detected.push('AKI');
      if (labs.includes('wbc') || labs.includes('hemo') || labs.includes('lactate')) detected.push('Sepsis/Infection');

      if (detected.length > 0) {
        let labsStr = c.abnormal_labs;
        if (labsStr.length > 90) labsStr = labsStr.substring(0, 90) + '...';
        issue = `ค่ารักษา ฿${Number(c.income || 0).toLocaleString()} บ. (RW ${c.rw || 0}) ── 🩸 วิกฤต: ${labsStr}`;
        aiSuggest = `AI สงสัยพยาธิสภาพ ${detected.join(', ')} ขาดการระบุรหัส CC/MCC ควรเตือนแพทย์ทบทวนชาร์ต!`;
      }

      return { hn: c.hn, an: c.an, name: c.name, ward: c.ward, issue, aiSuggest, estRevenue };
    });

    const labMapped = [];
    const seenLabAn = new Set();
    // Map suggested ICD-10 to check if already coded
    const suggestedIcdMap = {
      hypokalemia: 'E876', hyperkalemia: 'E875',
      hyponatremia: 'E871', hypernatremia: 'E870',
      aki: 'N179', sepsis: 'A419', malnutrition: 'E43',
      nstemi: 'I21', acidosis: 'E872',
    };
    (labCases || []).forEach(c => {
      const key = c.an + '-' + c.lab_name;
      if (seenLabAn.has(key)) return;
      seenLabAn.add(key);

      const existingDx = (c.existing_dx || '').replace(/\./g, '');

      let issue = `ค่ารักษา ฿${Number(c.income || 0).toLocaleString()} บ. (RW ${c.rw || 0}) ── 🩸 วิกฤต: ${c.lab_name} [${c.lab_result}] (ปกติ: ${c.lab_normal})`;
      let aiSuggest = 'AI เสนอ: ตรวจสอบการลงรหัส CC/MCC เพิ่มเติม';
      let estRevenue = 4500;
      let isCritical = false;
      let suggestedKey = null;

      const ln = (c.lab_name || '').toLowerCase();
      const res = parseFloat(c.lab_result);
      if (!isNaN(res)) {
        if (ln.includes('potassium') || ln === 'k') {
          if (res < 3.0) { aiSuggest = 'AI เสนอ: พิจารณาลงรหัส Hypokalemia (E87.6) (+RW)'; estRevenue = 6000; isCritical = true; suggestedKey = 'hypokalemia'; }
          else if (res > 5.5) { aiSuggest = 'AI เสนอ: พิจารณาลงรหัส Hyperkalemia (E87.5) (+RW)'; estRevenue = 7000; isCritical = true; suggestedKey = 'hyperkalemia'; }
        } else if (ln.includes('sodium') || ln === 'na') {
          if (res < 130) { aiSuggest = 'AI เสนอ: พิจารณาลงรหัส Hyponatremia (E87.1) (+RW)'; estRevenue = 7500; isCritical = true; suggestedKey = 'hyponatremia'; }
          else if (res > 150) { aiSuggest = 'AI เสนอ: พิจารณาลงรหัส Hypernatremia (E87.0) (+RW)'; estRevenue = 7500; isCritical = true; suggestedKey = 'hypernatremia'; }
        } else if (ln.includes('creatinine') || ln === 'cr') {
          if (res > 1.5) { aiSuggest = 'AI เสนอ: ตรวจสอบ Acute Kidney Injury (N17.9) (+RW)'; estRevenue = 15000; isCritical = true; suggestedKey = 'aki'; }
        } else if (ln.includes('lactate')) {
          if (res > 2.0) { aiSuggest = 'AI เสนอ: พิจารณาสัญญาณ Sepsis/Septic Shock (A41.9) (+RW)'; estRevenue = 20000; isCritical = true; suggestedKey = 'sepsis'; }
        } else if (ln.includes('albumin')) {
          if (res < 2.5) { aiSuggest = 'AI เสนอ: พิจารณาลงรหัส Severe Malnutrition (E43) (+RW)'; estRevenue = 12000; isCritical = true; suggestedKey = 'malnutrition'; }
        } else if (ln.includes('trop') || ln.includes('troponin')) {
          aiSuggest = 'AI เสนอ: ตรวจสอบประวัติเจ็บหน้าอก พิจารณา NSTEMI/STEMI (I21.-) (+RW)'; estRevenue = 25000; isCritical = true; suggestedKey = 'nstemi';
        } else if (ln === 'ph' || ln === 'blood ph' || ln === 'arterial ph' || ln.includes('ph (blood')) {
          if (res < 7.35) { aiSuggest = 'AI เสนอ: ภาวะ Acidosis (E87.2) ส่งผลต่อความรุนแรง (+RW) ควรแจ้งแพทย์'; estRevenue = 8000; isCritical = true; suggestedKey = 'acidosis'; }
        } else if (ln.includes('neutrophil') && res > 80) {
          aiSuggest = 'AI เสนอ: พิจารณา Neutrophilia สัมพันธ์กับ Infection/Sepsis — ตรวจสอบ CC/MCC'; estRevenue = 6000; isCritical = true; suggestedKey = 'sepsis';
        }
      }

      // Skip if the suggested ICD-10 is already coded
      if (isCritical && suggestedKey && suggestedIcdMap[suggestedKey]) {
        if (existingDx.includes(suggestedIcdMap[suggestedKey])) return;
      }

      if (isCritical) {
        labMapped.push({ hn: c.hn, an: c.an, name: c.name, ward: c.ward, issue, aiSuggest, estRevenue });
      }
    });

    return {
      pdxOptimization: pdxMapped,
      losAlert: losMapped,
      mccMissing: mccMapped,
      labAlerts: labMapped.slice(0, 30),
      pdxRevenue: pdxMapped.reduce((sum, c) => sum + (c.estRevenue || 0), 0),
      mccRevenue: mccMapped.reduce((sum, c) => sum + (c.estRevenue || 0), 0),
      labRevenue: labMapped.slice(0, 30).reduce((sum, c) => sum + (c.estRevenue || 0), 0),
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    logger.error('DRG Optimization API error', { error: error.message });
    return { error: error.message };
  }
}));

// ━━━━━━ Revenue Recovery Tracker — AI Recommendation Follow-up ━━━━━━
router.get('/revenue-recovery', cached('mrRevenueRecovery', 600000, async () => {
  try {
    // 1. PDx cases with unspecified codes → check if PDx was changed (improved)
    const pdxRecovery = await dbQueryHeavy('mrPdxRecovery', 120, `
      SELECT
        COUNT(DISTINCT i.an) as total_flagged,
        SUM(CASE WHEN d_now.icd10 != d_orig.icd10 THEN 1 ELSE 0 END) as pdx_changed,
        SUM(CASE WHEN d_now.icd10 != d_orig.icd10 THEN COALESCE(a.rw, 0) * 8350 ELSE 0 END) as est_recovered
      FROM ipt i
      INNER JOIN an_stat a ON i.an = a.an
      INNER JOIN iptdiag d_orig ON i.an = d_orig.an AND d_orig.diagtype = '1'
      INNER JOIN iptdiag d_now ON i.an = d_now.an AND d_now.diagtype = '1'
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND d_orig.icd10 IN ('J189', 'K358', 'A419', 'I64', 'N201', 'A099', 'N390')
    `).catch(() => ({}));

    // 2. Cases that had no CC/MCC → check if secondary dx was added
    const ccRecovery = await dbQueryHeavy('mrCCRecovery', 120, `
      SELECT
        COUNT(DISTINCT base.an) as total_flagged,
        SUM(CASE WHEN has_cc.an IS NOT NULL THEN 1 ELSE 0 END) as cc_added,
        SUM(CASE WHEN has_cc.an IS NOT NULL THEN COALESCE(a.rw, 0) * 2000 ELSE 0 END) as est_recovered
      FROM (
        SELECT DISTINCT i.an
        FROM ipt i
        INNER JOIN an_stat a ON i.an = a.an
        WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND a.income > 30000 AND a.rw > 0 AND a.rw < 1.0
          AND EXISTS (SELECT 1 FROM iptdiag dx WHERE dx.an = i.an AND dx.diagtype = '1')
      ) base
      INNER JOIN an_stat a ON base.an = a.an
      LEFT JOIN (
        SELECT DISTINCT an FROM iptdiag WHERE diagtype IN ('2','3')
      ) has_cc ON base.an = has_cc.an
    `).catch(() => ({}));

    // 3. Lab→Dx: cases with critical labs → check if suggested ICD was coded
    const labRecovery = await dbQueryHeavy('mrLabRecovery', 120, `
      SELECT
        COUNT(DISTINCT i.an) as total_flagged,
        SUM(CASE WHEN dx_added.an IS NOT NULL THEN 1 ELSE 0 END) as dx_added,
        SUM(CASE WHEN dx_added.an IS NOT NULL THEN 8350 ELSE 0 END) as est_recovered
      FROM ipt i
      INNER JOIN lab_head lh ON lh.hn = i.hn AND lh.order_date BETWEEN i.regdate AND i.dchdate
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      LEFT JOIN (
        SELECT DISTINCT d.an FROM iptdiag d WHERE d.diagtype != '1'
          AND (d.icd10 LIKE 'E87%' OR d.icd10 LIKE 'N17%' OR d.icd10 LIKE 'A41%' OR d.icd10 LIKE 'E43%' OR d.icd10 LIKE 'I21%')
      ) dx_added ON i.an = dx_added.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND lo.abnormal_result = 'Y'
        AND (lo.lab_items_name_ref LIKE '%Potassium%' OR lo.lab_items_name_ref LIKE '%Creatinine%'
          OR lo.lab_items_name_ref LIKE '%Troponin%' OR lo.lab_items_name_ref LIKE '%Lactate%'
          OR lo.lab_items_name_ref LIKE '%Albumin%')
    `).catch(() => ({}));

    // 4. Overall DRG optimization: RW changes after coding review
    const rwRecovery = await dbQueryHeavy('mrRWRecovery', 120, `
      SELECT
        COUNT(DISTINCT i.an) as total_cases,
        SUM(CASE WHEN i.adjrw > a.rw THEN 1 ELSE 0 END) as rw_increased,
        ROUND(SUM(CASE WHEN i.adjrw > a.rw THEN (i.adjrw - a.rw) * 8350 ELSE 0 END)) as rw_gain_revenue,
        SUM(CASE WHEN i.adjrw < a.rw THEN 1 ELSE 0 END) as rw_decreased,
        ROUND(SUM(CASE WHEN i.adjrw < a.rw THEN (a.rw - i.adjrw) * 8350 ELSE 0 END)) as rw_loss_revenue
      FROM ipt i
      INNER JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND a.rw > 0 AND i.adjrw IS NOT NULL
    `).catch(() => ({}));

    const pdxFlagged = Number(pdxRecovery?.total_flagged || 0);
    const pdxChanged = Number(pdxRecovery?.pdx_changed || 0);
    const ccFlagged = Number(ccRecovery?.total_flagged || 0);
    const ccAdded = Number(ccRecovery?.cc_added || 0);
    const labFlagged = Number(labRecovery?.total_flagged || 0);
    const labDxAdded = Number(labRecovery?.dx_added || 0);

    const totalFlagged = pdxFlagged + ccFlagged + labFlagged;
    const totalActioned = pdxChanged + ccAdded + labDxAdded;
    const conversionRate = totalFlagged > 0 ? Math.round((totalActioned / totalFlagged) * 100) : 0;

    const totalPotential = Number(pdxRecovery?.est_recovered || 0) + Number(ccRecovery?.est_recovered || 0) + Number(labRecovery?.est_recovered || 0);
    const totalRecovered = totalPotential; // Approximate: if dx was added, assume full recovery

    return {
      data_source: 'HOSxP XE · iptdiag + an_stat + lab_order',
      summary: {
        total_flagged: totalFlagged,
        total_actioned: totalActioned,
        conversion_rate: conversionRate,
        potential_revenue: totalPotential,
        recovered_revenue: totalRecovered,
      },
      categories: [
        { type: 'PDx Optimization', icon: '🎯', flagged: pdxFlagged, actioned: pdxChanged, rate: pdxFlagged > 0 ? Math.round((pdxChanged / pdxFlagged) * 100) : 0, revenue: Number(pdxRecovery?.est_recovered || 0) },
        { type: 'CC/MCC Missing', icon: '📋', flagged: ccFlagged, actioned: ccAdded, rate: ccFlagged > 0 ? Math.round((ccAdded / ccFlagged) * 100) : 0, revenue: Number(ccRecovery?.est_recovered || 0) },
        { type: 'Lab → Diagnosis', icon: '🩸', flagged: labFlagged, actioned: labDxAdded, rate: labFlagged > 0 ? Math.round((labDxAdded / labFlagged) * 100) : 0, revenue: Number(labRecovery?.est_recovered || 0) },
      ],
      rw_impact: {
        total_cases: Number(rwRecovery?.total_cases || 0),
        rw_increased: Number(rwRecovery?.rw_increased || 0),
        rw_gain: Number(rwRecovery?.rw_gain_revenue || 0),
        rw_decreased: Number(rwRecovery?.rw_decreased || 0),
        rw_loss: Number(rwRecovery?.rw_loss_revenue || 0),
      },
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    logger.error('Revenue recovery error', { error: err.message });
    return { summary: {}, categories: [], rw_impact: {} };
  }
}));

// ━━━━━━ Coding Quality Heatmap — Coder × Ward ━━━━━━
router.get('/coding-heatmap', cached('mrCodingHeatmap', 1800000, async () => {
  try {
    // Query: per coder × ward → diagnosis depth, CC rate, case count (30 days)
    const rows = await dbQueryHeavy('mrHeatmap_v1', 60, `
      SELECT
        COALESCE(u.name, d.staff) as coder_name,
        w.name as ward_name,
        COUNT(DISTINCT d.an) as case_count,
        -- CC/MCC rate: % of cases with at least one secondary dx (diagtype 2 or 3)
        ROUND(100.0 * COUNT(DISTINCT CASE WHEN d.diagtype IN ('2','3') THEN d.an END)
          / NULLIF(COUNT(DISTINCT d.an), 0), 0) as cc_rate,
        -- Avg diagnoses per case
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT d.an), 0), 1) as diag_per_case,
        -- Diagnosis depth breakdown
        ROUND(SUM(CASE WHEN d.diagtype = '1' THEN 1 ELSE 0 END) / NULLIF(COUNT(DISTINCT d.an), 0), 2) as pdx_per_case,
        ROUND(SUM(CASE WHEN d.diagtype = '2' THEN 1 ELSE 0 END) / NULLIF(COUNT(DISTINCT d.an), 0), 2) as cc_per_case,
        ROUND(SUM(CASE WHEN d.diagtype = '3' THEN 1 ELSE 0 END) / NULLIF(COUNT(DISTINCT d.an), 0), 2) as mcc_per_case,
        ROUND(SUM(CASE WHEN d.diagtype IN ('4','5') THEN 1 ELSE 0 END) / NULLIF(COUNT(DISTINCT d.an), 0), 2) as proc_per_case
      FROM iptdiag d
      INNER JOIN ipt i ON d.an = i.an
      INNER JOIN ward w ON i.ward = w.ward
      LEFT JOIN opduser u ON d.staff = u.loginname
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND d.staff IS NOT NULL AND d.staff != ''
        AND COALESCE(u.name, d.staff) NOT LIKE 'นพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'พญ.%'
        AND COALESCE(u.name, d.staff) NOT LIKE 'ทพญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพ.%'
      GROUP BY d.staff, u.name, i.ward, w.name
      HAVING COUNT(DISTINCT d.an) >= 3
      ORDER BY coder_name, case_count DESC
    `).catch(() => []);

    // Build matrix structure
    const coders = new Map();
    const wards = new Set();
    for (const r of (rows || [])) {
      wards.add(r.ward_name);
      if (!coders.has(r.coder_name)) coders.set(r.coder_name, { name: r.coder_name, total_cases: 0, avg_cc: 0, wards: {} });
      const c = coders.get(r.coder_name);
      c.total_cases += Number(r.case_count);
      c.wards[r.ward_name] = {
        cases: Number(r.case_count),
        cc_rate: Number(r.cc_rate),
        diag_per_case: Number(r.diag_per_case),
        pdx: Number(r.pdx_per_case),
        cc: Number(r.cc_per_case),
        mcc: Number(r.mcc_per_case),
        proc: Number(r.proc_per_case),
      };
    }

    // Calculate avg CC rate per coder
    for (const c of coders.values()) {
      const wardEntries = Object.values(c.wards);
      const totalCases = wardEntries.reduce((s, w) => s + w.cases, 0);
      c.avg_cc = totalCases > 0
        ? Math.round(wardEntries.reduce((s, w) => s + w.cc_rate * w.cases, 0) / totalCases)
        : 0;
    }

    // Find weak spots (coder × ward with low CC rate)
    const weakSpots = [];
    for (const c of coders.values()) {
      for (const [ward, data] of Object.entries(c.wards)) {
        if (data.cc_rate < 50 && data.cases >= 5) {
          weakSpots.push({
            coder: c.name, ward, cases: data.cases, cc_rate: data.cc_rate,
            diag_per_case: data.diag_per_case,
            recommendation: data.cc_rate === 0
              ? `${c.name} ไม่มี CC/MCC เลยใน ${ward} (${data.cases} เคส) — ต้องอบรมเร่งด่วน`
              : `${c.name} CC Rate ต่ำ ${data.cc_rate}% ใน ${ward} — ควร peer review`,
          });
        }
      }
    }
    weakSpots.sort((a, b) => a.cc_rate - b.cc_rate);

    return {
      data_source: 'HOSxP XE · iptdiag + ward + opduser',
      coders: Array.from(coders.values()).sort((a, b) => b.total_cases - a.total_cases),
      wards: Array.from(wards).sort(),
      weak_spots: weakSpots.slice(0, 10),
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    logger.error('Coding heatmap error', { error: err.message });
    return { coders: [], wards: [], weak_spots: [] };
  }
}));

// ━━━━━━ Coding Turnaround Trend — Weekly × Coder (12 weeks) ━━━━━━
router.get('/turnaround-trend', cached('mrTurnaroundTrend', 1800000, async () => {
  try {
    const rows = await dbQueryHeavy('mrTATrend_v1', 60, `
      SELECT
        YEARWEEK(i.dchdate, 1) as yw,
        MIN(i.dchdate) as week_start,
        COALESCE(u.name, d.staff) as coder_name,
        COUNT(DISTINCT d.an) as cases,
        ROUND(AVG(DATEDIFF(MIN_DT.first_code, i.dchdate)), 1) as avg_days
      FROM ipt i
      INNER JOIN (
        SELECT an, MIN(modify_datetime) as first_code, staff
        FROM iptdiag
        WHERE modify_datetime >= DATE_SUB(CURDATE(), INTERVAL 84 DAY)
          AND staff IS NOT NULL AND staff != ''
        GROUP BY an, staff
      ) MIN_DT ON i.an = MIN_DT.an
      INNER JOIN iptdiag d ON d.an = i.an AND d.staff = MIN_DT.staff
      LEFT JOIN opduser u ON d.staff = u.loginname
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 84 DAY)
        AND i.dchdate IS NOT NULL
        AND COALESCE(u.name, d.staff) NOT LIKE 'นพ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'พญ.%'
        AND COALESCE(u.name, d.staff) NOT LIKE 'ทพญ.%' AND COALESCE(u.name, d.staff) NOT LIKE 'ทพ.%'
      GROUP BY YEARWEEK(i.dchdate, 1), MIN(i.dchdate), d.staff, u.name
      HAVING COUNT(DISTINCT d.an) >= 1
      ORDER BY yw ASC, coder_name
    `).catch(() => []);

    // Build week × coder matrix
    const weekMap = new Map();
    const coderSet = new Set();
    for (const r of (rows || [])) {
      const wk = r.week_start?.toISOString?.()?.slice(0, 10) || r.week_start?.slice?.(0, 10) || String(r.yw);
      if (!weekMap.has(wk)) weekMap.set(wk, { week: wk, coders: {}, total_cases: 0, avg_all: 0 });
      const w = weekMap.get(wk);
      coderSet.add(r.coder_name);
      w.coders[r.coder_name] = { cases: Number(r.cases), avg_days: Number(r.avg_days) };
      w.total_cases += Number(r.cases);
    }

    // Calculate overall avg per week
    for (const w of weekMap.values()) {
      const entries = Object.values(w.coders);
      const totalCases = entries.reduce((s, e) => s + e.cases, 0);
      w.avg_all = totalCases > 0
        ? Math.round(entries.reduce((s, e) => s + e.avg_days * e.cases, 0) / totalCases * 10) / 10
        : 0;
    }

    const weeks = Array.from(weekMap.values()).sort((a, b) => a.week.localeCompare(b.week));
    const coders = Array.from(coderSet).sort();

    // Format week labels
    const formatted = weeks.map(w => {
      const d = new Date(w.week);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;
      const entry = { week: w.week, label, avg_all: w.avg_all, total_cases: w.total_cases };
      for (const c of coders) entry[c] = w.coders[c]?.avg_days ?? null;
      return entry;
    });

    return {
      data_source: 'HOSxP XE · iptdiag + ipt',
      weeks: formatted,
      coders,
      target_days: 3,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    logger.error('Turnaround trend error', { error: err.message });
    return { weeks: [], coders: [], target_days: 3 };
  }
}));

// ━━━━━━ DRG Kanban Board — CRUD ━━━━━━
// GET: list all cards (with optional status filter)
router.get('/kanban', (req, res) => {
  try {
    const db = getDb();
    const status = req.query.status;
    const rows = status
      ? db.prepare('SELECT * FROM drg_kanban WHERE status = ? ORDER BY updated_at DESC').all(status)
      : db.prepare('SELECT * FROM drg_kanban ORDER BY CASE status WHEN "pending" THEN 1 WHEN "review" THEN 2 WHEN "completed" THEN 3 WHEN "recovered" THEN 4 END, updated_at DESC').all();

    // Count by status
    const counts = db.prepare('SELECT status, COUNT(*) as cnt, SUM(est_revenue) as total_rev FROM drg_kanban GROUP BY status').all();
    const summary = { pending: 0, review: 0, completed: 0, recovered: 0, total_revenue: 0 };
    for (const r of counts) {
      summary[r.status] = r.cnt;
      summary.total_revenue += Number(r.total_rev || 0);
    }

    res.json({ cards: rows, summary, timestamp: new Date().toISOString() });
  } catch (err) {
    logger.error('Kanban GET error', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// POST: sync from DRG optimization → create cards that don't exist yet
router.post('/kanban/sync', async (req, res) => {
  try {
    const db = getDb();
    const drgOpt = req.body?.cases || [];

    const insert = db.prepare(`
      INSERT OR IGNORE INTO drg_kanban (an, hn, patient_name, ward, category, issue, ai_suggest, est_revenue)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let added = 0;
    const tx = db.transaction((cases) => {
      for (const c of cases) {
        const result = insert.run(c.an, c.hn, c.name, c.ward, c.category || 'pdx', c.issue, c.aiSuggest, c.estRevenue || 0);
        if (result.changes > 0) added++;
      }
    });
    tx(drgOpt);

    res.json({ added, total: db.prepare('SELECT COUNT(*) as cnt FROM drg_kanban').get().cnt });
  } catch (err) {
    logger.error('Kanban sync error', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// PATCH: update card status (drag & drop)
router.patch('/kanban/:an', (req, res) => {
  try {
    const db = getDb();
    const { status, assigned_to, notes } = req.body;
    const an = req.params.an;

    const sets = [];
    const vals = [];
    if (status) { sets.push('status = ?'); vals.push(status); }
    if (assigned_to !== undefined) { sets.push('assigned_to = ?'); vals.push(assigned_to); }
    if (notes !== undefined) { sets.push('notes = ?'); vals.push(notes); }
    sets.push("updated_at = datetime('now','localtime')");
    vals.push(an);

    db.prepare(`UPDATE drg_kanban SET ${sets.join(', ')} WHERE an = ?`).run(...vals);

    const updated = db.prepare('SELECT * FROM drg_kanban WHERE an = ?').get(an);
    res.json({ success: true, card: updated });
  } catch (err) {
    logger.error('Kanban PATCH error', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

// DELETE: remove card
router.delete('/kanban/:an', (req, res) => {
  try {
    const db = getDb();
    db.prepare('DELETE FROM drg_kanban WHERE an = ?').run(req.params.an);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- Revenue Fiscal — hospital-wide (MedRec covers all coding) ----
router.get('/revenue-fiscal', cached('medrecRevenueFiscal', 3600000, (req) => getRevenueFiscal(null, 'HOSxP XE · vn_stat (MedRec)', req?.query?.start, req?.query?.end)));

export default router;
