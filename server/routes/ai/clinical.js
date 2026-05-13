// ============================================================
// BCH 360° Intelligence V.10 — AI Routes: Clinical Intelligence
// Sepsis, Deterioration, Critical Labs, Ward Acuity, Fall Risk,
// Monitoring Gaps, Operational Efficiency, Quality, Daily Briefing
// ============================================================
import { Router } from 'express';
import { cached } from '../../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../../db/mysql.js';
import ai from '../../ai/aiModules.js';
import {
  generateInsights,
  detectSepsisRisk,
  analyzeDeterioration,
  getCriticalLabs,
  getWardAcuity,
  identifyFallRisk,
  getMonitoringGaps,
  getOperationalEfficiency,
  getQualityInsights,
} from '../../ai/clinicalIntelligence.js';
import { validateQuery } from '../../middleware/validate.js';
import { insightsQuery } from '../../middleware/schemas.js';
import { safeError } from '../../lib/safeError.js';

const router = Router();

// ── Clinical Insights (role-based) ──────────────────────────
router.get('/clinical-insights', validateQuery(insightsQuery), async (req, res) => {
  try {
    res.json({
      data_source: 'BCH Clinical Intelligence',
      ...(await generateInsights(req.query.role || req.user?.role || 'all')),
    });
  } catch (err) {
    safeError(res, err, 'AI');
  }
});

router.get('/clinical/sepsis', async (req, res) => {
  try {
    const d = await detectSepsisRisk();
    res.json({
      total: d.length,
      critical: d.filter(a => a.severity === 'critical').length,
      patients: d,
    });
  } catch (e) {
    safeError(res, e, 'AI');
  }
});
router.get('/clinical/deterioration', async (req, res) => {
  try {
    const d = await analyzeDeterioration();
    res.json({ total: d.length, patients: d });
  } catch (e) {
    safeError(res, e, 'AI');
  }
});
router.get('/clinical/critical-labs', async (req, res) => {
  try {
    const d = await getCriticalLabs();
    res.json({ total: d.length, alerts: d });
  } catch (e) {
    safeError(res, e, 'AI');
  }
});
router.get('/clinical/ward-acuity', async (req, res) => {
  try {
    const d = await getWardAcuity();
    res.json({ total: d.length, wards: d });
  } catch (e) {
    safeError(res, e, 'AI');
  }
});
router.get('/clinical/fall-risk', async (req, res) => {
  try {
    const d = await identifyFallRisk();
    res.json({ total: d.length, patients: d });
  } catch (e) {
    safeError(res, e, 'AI');
  }
});
router.get('/clinical/monitor-gaps', async (req, res) => {
  try {
    const d = await getMonitoringGaps();
    res.json({ total: d.length, patients: d });
  } catch (e) {
    safeError(res, e, 'AI');
  }
});
router.get('/clinical/operations', async (req, res) => {
  try {
    res.json(await getOperationalEfficiency());
  } catch (e) {
    safeError(res, e, 'AI');
  }
});
router.get('/clinical/quality', async (req, res) => {
  try {
    res.json({ indicators: await getQualityInsights() });
  } catch (e) {
    safeError(res, e, 'AI');
  }
});

// ── Mortality Risk (Simplified APACHE-II) ───────────────────
router.get(
  '/mortality-risk',
  cached('mortalityRisk', 120000, async () => {
    const patients = await dbQuery(`
    SELECT i.an, i.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as patient_name,
           TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age, p.sex,
           w.name as ward, DATEDIFF(CURDATE(), i.regdate) as los,
           o.bps, o.bpd, o.pulse, o.rr, o.temperature, o.spo2,
           (SELECT GROUP_CONCAT(d.icd10) FROM iptdiag d WHERE d.an = i.an AND d.diagtype = 1) as primary_dx
    FROM ipt i
    JOIN patient p ON i.hn = p.hn
    JOIN ward w ON i.ward = w.ward
    LEFT JOIN opdscreen o ON i.hn = o.hn AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 2 DAY)
    WHERE i.dchdate IS NULL AND i.ward != '06'
    GROUP BY i.an
  `).catch(() => []);

    const scored = patients
      .map(pt => {
        let score = 0;
        const factors = [];

        if (pt.age >= 75) {
          score += 6;
          factors.push('อายุ ≥75 ปี');
        } else if (pt.age >= 65) {
          score += 5;
          factors.push('อายุ ≥65 ปี');
        } else if (pt.age >= 55) {
          score += 3;
          factors.push('อายุ ≥55 ปี');
        }

        if (pt.bps && (pt.bps < 70 || pt.bps > 180)) {
          score += 4;
          factors.push(pt.bps < 70 ? 'Hypotension' : 'Hypertensive crisis');
        } else if (pt.bps && (pt.bps < 90 || pt.bps > 160)) {
          score += 2;
          factors.push('BP ผิดปกติ');
        }
        if (pt.pulse && (pt.pulse < 40 || pt.pulse > 150)) {
          score += 4;
          factors.push('HR ผิดปกติรุนแรง');
        } else if (pt.pulse && (pt.pulse < 55 || pt.pulse > 110)) {
          score += 2;
          factors.push('HR ผิดปกติ');
        }
        if (pt.rr && (pt.rr < 6 || pt.rr > 35)) {
          score += 4;
          factors.push('RR ผิดปกติรุนแรง');
        }
        if (pt.temperature && (pt.temperature < 34 || pt.temperature > 40)) {
          score += 4;
          factors.push('อุณหภูมิผิดปกติรุนแรง');
        }
        if (pt.spo2 && pt.spo2 < 90) {
          score += 4;
          factors.push('SpO₂ < 90%');
        } else if (pt.spo2 && pt.spo2 < 94) {
          score += 2;
          factors.push('SpO₂ ต่ำ');
        }
        if (pt.los > 14) {
          score += 3;
          factors.push(`LOS ${pt.los} วัน`);
        } else if (pt.los > 7) {
          score += 1;
          factors.push(`LOS ${pt.los} วัน`);
        }

        const risk_level =
          score >= 15 ? 'critical' : score >= 10 ? 'high' : score >= 5 ? 'moderate' : 'low';
        return { ...pt, mortality_score: score, risk_level, risk_factors: factors };
      })
      .sort((a, b) => b.mortality_score - a.mortality_score);

    return {
      data_source: 'HOSxP XE + AI Mortality Risk (Simplified APACHE-II)',
      total_patients: scored.length,
      critical: scored.filter(p => p.risk_level === 'critical').length,
      high: scored.filter(p => p.risk_level === 'high').length,
      moderate: scored.filter(p => p.risk_level === 'moderate').length,
      patients: scored.slice(0, 50),
      timestamp: new Date().toISOString(),
    };
  })
);

// ── Daily Briefing ───────────────────────────────────────────
router.get(
  '/daily-briefing',
  cached('dailyBriefing', 300000, async () => {
    const [revenue, visits, ipd, er, mortality, readmit, sepsis, labs] = await Promise.allSettled([
      dbQueryOne(`SELECT SUM(income) as today_rev FROM vn_stat WHERE vstdate = CURDATE()`),
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) as opd, COUNT(DISTINCT CASE WHEN ptstatus='1' THEN vn END) as new_pt FROM ovst WHERE vstdate = CURDATE()`
      ),
      dbQuery(`SELECT w.name as ward, COUNT(*) as census, SUM(CASE WHEN DATEDIFF(CURDATE(), i.regdate) > 7 THEN 1 ELSE 0 END) as long_stay
             FROM ipt i JOIN ward w ON i.ward = w.ward WHERE i.dchdate IS NULL AND i.ward != '06' GROUP BY i.ward, w.name`),
      dbQueryOne(
        `SELECT COUNT(*) as total, SUM(CASE WHEN er_pt_type IN ('1','2') THEN 1 ELSE 0 END) as critical FROM er_regist WHERE vstdate = CURDATE()`
      ),
      dbQueryOne(
        `SELECT COUNT(*) as deaths FROM an_stat WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchstts = '09'`
      ),
      ai.getReadmissionRisk().catch(() => []),
      detectSepsisRisk().catch(() => []),
      getCriticalLabs().catch(() => []),
    ]);

    const todayRev = revenue.status === 'fulfilled' ? Number(revenue.value?.today_rev || 0) : 0;
    const opdVisits = visits.status === 'fulfilled' ? visits.value?.opd || 0 : 0;
    const erTotal = er.status === 'fulfilled' ? er.value?.total || 0 : 0;
    const erCritical = er.status === 'fulfilled' ? er.value?.critical || 0 : 0;
    const ipdWards = ipd.status === 'fulfilled' ? ipd.value || [] : [];
    const ipdCensus = ipdWards.reduce((s, w) => s + (w.census || 0), 0);
    const longStay = ipdWards.reduce((s, w) => s + (w.long_stay || 0), 0);
    const highRiskReadmit =
      readmit.status === 'fulfilled'
        ? readmit.value?.filter(p => p.risk_level === 'high').length || 0
        : 0;
    const sepsisAlerts = sepsis.status === 'fulfilled' ? sepsis.value?.length || 0 : 0;
    const criticalLabCount = labs.status === 'fulfilled' ? labs.value?.length || 0 : 0;
    const deaths30d = mortality.status === 'fulfilled' ? mortality.value?.deaths || 0 : 0;

    const actions = [];
    if (sepsisAlerts > 0)
      actions.push({
        priority: 'critical',
        icon: '🔴',
        text: `Sepsis alert: ${sepsisAlerts} ราย ต้อง Blood culture + ATB ภายใน 1 ชม.`,
      });
    if (criticalLabCount > 0)
      actions.push({
        priority: 'critical',
        icon: '🧪',
        text: `Critical lab: ${criticalLabCount} รายการ ต้องรายงานแพทย์ทันที`,
      });
    if (erCritical > 0)
      actions.push({
        priority: 'high',
        icon: '🚑',
        text: `ER Resuscitation/Emergency: ${erCritical} ราย`,
      });
    if (highRiskReadmit > 0)
      actions.push({
        priority: 'high',
        icon: '🔄',
        text: `Readmission risk สูง: ${highRiskReadmit} ราย ต้อง Discharge Planning`,
      });
    if (longStay > 0)
      actions.push({
        priority: 'medium',
        icon: '🏥',
        text: `Long stay >7 วัน: ${longStay} ราย พิจารณา DC`,
      });

    return {
      data_source: 'BCH AI Daily Briefing',
      date: new Date().toLocaleDateString('th-TH', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      executive_summary: {
        revenue: { today: todayRev, formatted: `฿${(todayRev / 1000).toFixed(0)}K` },
        opd: {
          visits: opdVisits,
          new_patients: visits.status === 'fulfilled' ? visits.value?.new_pt || 0 : 0,
        },
        ipd: { census: ipdCensus, long_stay: longStay, wards: ipdWards },
        er: { total: erTotal, critical: erCritical },
        mortality_30d: deaths30d,
      },
      ai_alerts: {
        sepsis: sepsisAlerts,
        critical_labs: criticalLabCount,
        readmission_high_risk: highRiskReadmit,
      },
      priority_actions: actions,
      timestamp: new Date().toISOString(),
    };
  })
);

export default router;
