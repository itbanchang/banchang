// ============================================================
// Clinical Risk Routes — HOSxP XE Only, Optimized
// Professional Data Analytics KPIs Edition
// ============================================================
import { Router } from 'express';
import hosxp from '../db/hosxpIntegration.js';
import { cacheMiddleware } from '../cache/redis.js';

const router = Router();

// ---- Risk scoring based on age + stay days ----
function scorePatient(p) {
  let riskLevel = 'low', ews = 1;
  if (p.stay_days > 30 || p.age > 80) { riskLevel = 'critical'; ews = 10; }
  else if (p.stay_days > 14 || p.age > 70) { riskLevel = 'high'; ews = 7; }
  else if (p.stay_days > 7 || p.age > 60) { riskLevel = 'moderate'; ews = 4; }
  return { ...p, risk_level: riskLevel, ews_score: ews };
}

// ---- Patients (cached 2 min) ----
router.get('/patients', cacheMiddleware(120), async (req, res) => {
  try {
    const raw = await hosxp.getHighRiskPatients();
    const patients = (raw || []).map(p => scorePatient({
      patient_id: p.hn, patient_name: p.name, age: p.age, gender: p.sex,
      ward_name: p.ward, admission_date: p.regdate, stay_days: p.stay_days,
      assigned_team: p.doctor || 'N/A', diagnosis_code: p.icd10,
      diagnosis_name: p.dx_name, payer_type: p.payer, an: p.an
    }));
    patients.sort((a, b) => b.ews_score - a.ews_score);

    const stats = {
      total: patients.length,
      critical: patients.filter(p => p.risk_level === 'critical').length,
      high: patients.filter(p => p.risk_level === 'high').length,
      moderate: patients.filter(p => p.risk_level === 'moderate').length,
      low: patients.filter(p => p.risk_level === 'low').length,
      avg_ews: patients.length > 0 ? Math.round(patients.reduce((s, p) => s + p.ews_score, 0) / patients.length * 10) / 10 : 0
    };
    res.json({ data_source: 'HOSxP XE', patients, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- Vitals ----
router.get('/vitals/:patient_id', async (req, res) => {
  try {
    const vitals = await hosxp.getPatientVitals(req.params.patient_id);
    res.json({ data_source: 'HOSxP XE', vitals: vitals || [], patient_id: req.params.patient_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- Risk Distribution (cached 5 min) ----
router.get('/risk-distribution', cacheMiddleware(300), async (req, res) => {
  try {
    const raw = await hosxp.getHighRiskPatients();
    const patients = (raw || []).map(p => scorePatient({
      age: p.age, gender: p.sex, stay_days: p.stay_days
    }));

    const dist = {};
    patients.forEach(p => {
      if (!dist[p.risk_level]) dist[p.risk_level] = { risk_level: p.risk_level, count: 0, totalAge: 0 };
      dist[p.risk_level].count++;
      dist[p.risk_level].totalAge += (p.age || 0);
    });

    const byAge = {};
    patients.forEach(p => {
      const a = p.age || 0;
      const g = a < 20 ? '0-19' : a < 40 ? '20-39' : a < 60 ? '40-59' : a < 80 ? '60-79' : '80+';
      const k = `${g}_${p.risk_level}`;
      if (!byAge[k]) byAge[k] = { age_group: g, risk_level: p.risk_level, count: 0 };
      byAge[k].count++;
    });

    res.json({
      data_source: 'HOSxP XE',
      distribution: Object.values(dist).map(d => ({
        risk_level: d.risk_level, count: d.count,
        avg_age: d.count > 0 ? Math.round(d.totalAge / d.count) : 0
      })),
      by_age: Object.values(byAge).sort((a, b) => a.age_group.localeCompare(b.age_group))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/calculate-ews', (req, res) => {
  const { systolic_bp, heart_rate, respiratory_rate, temperature, spo2 } = req.body;
  let score = 0;
  if (systolic_bp <= 90 || systolic_bp >= 220) score += 3;
  else if (systolic_bp <= 100 || systolic_bp >= 200) score += 2;
  if (heart_rate <= 40 || heart_rate >= 130) score += 3;
  else if (heart_rate >= 110) score += 2;
  if (respiratory_rate <= 8 || respiratory_rate >= 25) score += 3;
  if (temperature <= 35 || temperature >= 39) score += 2;
  if (spo2 && spo2 < 92) score += 3;
  else if (spo2 && spo2 < 94) score += 2;
  res.json({ ews_score: score, risk_level: score >= 7 ? 'critical' : score >= 5 ? 'high' : score >= 3 ? 'moderate' : 'low' });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔬 Professional Clinical Analytics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/analytics', cacheMiddleware(300), async (req, res) => {
  try {
    const { dbQuery, dbQueryOne } = await import('../db/mysql.js');
    const { getEWSSummary } = await import('../ai/ewsEngine.js');

    // ━━ ALL queries in PARALLEL ━━
    const [
      ewsData,
      vitalStability,
      mortalityTrend,
      elderlyRisk,
      losDistribution,
      sepsisScreen,
      fallRisk,
      nursingLoad,
      diagTop,
      readmitClinical
    ] = await Promise.all([

      // 1. EWS Summary (reuse existing engine)
      getEWSSummary().catch(() => null),

      // 2. Vital Signs Stability — ค่าเฉลี่ย + σ ของ vital signs ผู้ป่วย IPD (7 วัน)
      dbQueryOne(`
        SELECT
          ROUND(AVG(os.bps), 0) as avg_sbp,
          ROUND(STDDEV(os.bps), 1) as sd_sbp,
          ROUND(AVG(os.bpd), 0) as avg_dbp,
          ROUND(AVG(os.pulse), 0) as avg_hr,
          ROUND(STDDEV(os.pulse), 1) as sd_hr,
          ROUND(AVG(os.temperature), 1) as avg_temp,
          ROUND(STDDEV(os.temperature), 2) as sd_temp,
          ROUND(AVG(os.rr), 1) as avg_rr,
          ROUND(STDDEV(os.rr), 1) as sd_rr,
          ROUND(AVG(os.o2sat), 1) as avg_spo2,
          ROUND(STDDEV(os.o2sat), 1) as sd_spo2,
          COUNT(*) as total_measurements,
          COUNT(DISTINCT o.hn) as patients_measured
        FROM opdscreen os
        INNER JOIN ovst o ON os.vn = o.vn
        INNER JOIN ipt i ON o.hn = i.hn AND i.dchdate IS NULL
        WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
          AND os.bps > 0
      `).catch(() => null),

      // 3. Mortality Trend — 6 เดือนย้อนหลัง
      dbQuery(`
        SELECT
          DATE_FORMAT(i.dchdate, '%Y-%m') as month,
          COUNT(*) as total_dch,
          SUM(CASE WHEN i.dchtype = '09' OR i.dchtype = '9' THEN 1 ELSE 0 END) as deaths,
          ROUND(100.0 * SUM(CASE WHEN i.dchtype = '09' OR i.dchtype = '9' THEN 1 ELSE 0 END)
            / NULLIF(COUNT(*), 0), 2) as mortality_rate
        FROM ipt i
        WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
          AND i.dchdate IS NOT NULL
          AND i.ward != '06'
        GROUP BY DATE_FORMAT(i.dchdate, '%Y-%m')
        ORDER BY month
      `).catch(() => []),

      // 4. ผู้ป่วยกลุ่มเสี่ยงสูง — สูงอายุ + LOS ยาว + comorbidity
      dbQueryOne(`
        SELECT
          COUNT(*) as total_current,
          SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) >= 75 THEN 1 ELSE 0 END) as very_elderly,
          SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) >= 60 AND TIMESTAMPDIFF(YEAR, p.birthday, NOW()) < 75 THEN 1 ELSE 0 END) as elderly,
          SUM(CASE WHEN DATEDIFF(NOW(), i.regdate) > 14 THEN 1 ELSE 0 END) as long_stay,
          SUM(CASE WHEN DATEDIFF(NOW(), i.regdate) > 7 AND DATEDIFF(NOW(), i.regdate) <= 14 THEN 1 ELSE 0 END) as medium_stay,
          SUM(CASE WHEN DATEDIFF(NOW(), i.regdate) <= 7 THEN 1 ELSE 0 END) as short_stay,
          ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, NOW())), 1) as avg_age,
          ROUND(AVG(DATEDIFF(NOW(), i.regdate)), 1) as avg_los_current
        FROM ipt i
        INNER JOIN patient p ON i.hn = p.hn
        WHERE i.dchdate IS NULL AND i.ward != '06'
      `).catch(() => null),

      // 5. LOS Distribution — ผู้ป่วยปัจจุบัน กระจายตาม LOS range
      dbQuery(`
        SELECT
          CASE
            WHEN DATEDIFF(NOW(), i.regdate) <= 3 THEN '1-3 วัน'
            WHEN DATEDIFF(NOW(), i.regdate) <= 7 THEN '4-7 วัน'
            WHEN DATEDIFF(NOW(), i.regdate) <= 14 THEN '8-14 วัน'
            WHEN DATEDIFF(NOW(), i.regdate) <= 30 THEN '15-30 วัน'
            ELSE '>30 วัน'
          END as los_range,
          COUNT(*) as count,
          ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, NOW())), 0) as avg_age
        FROM ipt i
        INNER JOIN patient p ON i.hn = p.hn
        WHERE i.dchdate IS NULL AND i.ward != '06'
        GROUP BY los_range
        ORDER BY MIN(DATEDIFF(NOW(), i.regdate))
      `).catch(() => []),

      // 6. Sepsis Screening Proxy — ผู้ป่วยที่มี vital signs ผิดปกติหลายตัว
      dbQueryOne(`
        SELECT
          COUNT(DISTINCT o.hn) as screened,
          SUM(CASE WHEN os.bps < 100 AND os.pulse > 90 AND os.temperature > 38.0 THEN 1 ELSE 0 END) as sirs_positive,
          SUM(CASE WHEN os.bps < 90 THEN 1 ELSE 0 END) as hypotension,
          SUM(CASE WHEN os.pulse > 100 THEN 1 ELSE 0 END) as tachycardia,
          SUM(CASE WHEN os.temperature > 38.3 THEN 1 ELSE 0 END) as fever,
          SUM(CASE WHEN os.o2sat < 94 AND os.o2sat > 0 THEN 1 ELSE 0 END) as hypoxia
        FROM opdscreen os
        INNER JOIN ovst o ON os.vn = o.vn
        INNER JOIN ipt i ON o.hn = i.hn AND i.dchdate IS NULL
        WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 DAY)
          AND os.bps > 0
      `).catch(() => null),

      // 7. Fall Risk Stratification — อายุ + LOS + ประวัติ
      dbQueryOne(`
        SELECT
          SUM(CASE
            WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) >= 65 AND DATEDIFF(NOW(), i.regdate) > 3 THEN 1
            ELSE 0 END) as high_fall_risk,
          SUM(CASE
            WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) >= 60 OR DATEDIFF(NOW(), i.regdate) > 7 THEN 1
            ELSE 0 END) as moderate_fall_risk,
          COUNT(*) as total_current
        FROM ipt i
        INNER JOIN patient p ON i.hn = p.hn
        WHERE i.dchdate IS NULL AND i.ward != '06'
      `).catch(() => null),

      // 8. Nursing Load per Ward — จำนวนผู้ป่วยต่อ ward (proxy nursing intensity)
      dbQuery(`
        SELECT
          w.name as ward,
          COUNT(*) as patient_count,
          SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, NOW()) >= 65 THEN 1 ELSE 0 END) as elderly_count,
          SUM(CASE WHEN DATEDIFF(NOW(), i.regdate) > 14 THEN 1 ELSE 0 END) as long_stay_count,
          ROUND(AVG(DATEDIFF(NOW(), i.regdate)), 1) as avg_los
        FROM ipt i
        INNER JOIN patient p ON i.hn = p.hn
        LEFT JOIN ward w ON i.ward = w.ward
        WHERE i.dchdate IS NULL AND i.ward != '06'
        GROUP BY w.ward, w.name
        ORDER BY patient_count DESC
      `).catch(() => []),

      // 9. Top Diagnoses — การวินิจฉัยที่พบบ่อย (ผู้ป่วยปัจจุบัน)
      dbQuery(`
        SELECT
          i.pdx as icd10,
          icd.icdname as dx_name,
          COUNT(*) as count,
          ROUND(AVG(DATEDIFF(NOW(), i.regdate)), 1) as avg_los,
          ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, NOW())), 0) as avg_age
        FROM ipt i
        INNER JOIN patient p ON i.hn = p.hn
        LEFT JOIN icd101 icd ON i.pdx = icd.code
        WHERE i.dchdate IS NULL AND i.ward != '06' AND i.pdx IS NOT NULL AND i.pdx != ''
        GROUP BY i.pdx, icd.icdname
        ORDER BY count DESC
        LIMIT 10
      `).catch(() => []),

      // 10. Clinical Readmission — re-admit ที่อาจสัมพันธ์กับคุณภาพการดูแล
      dbQueryOne(`
        SELECT
          COUNT(DISTINCT i2.an) as readmit_count,
          COUNT(DISTINCT i1.an) as total_dch,
          ROUND(100.0 * COUNT(DISTINCT i2.an) / NULLIF(COUNT(DISTINCT i1.an), 0), 1) as readmit_rate_7d
        FROM ipt i1
        LEFT JOIN ipt i2
          ON i1.hn = i2.hn
          AND i2.an != i1.an
          AND i2.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 7 DAY)
        WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND i1.dchdate IS NOT NULL
          AND i1.ward != '06'
      `).catch(() => null)
    ]);

    // ━━ Process EWS data for advanced analytics ━━
    const patients = ewsData?.patients || [];
    const totalPts = patients.length;

    // EWS Distribution (for visualization)
    const ewsDistribution = Array.from({ length: 11 }, (_, score) => ({
      score,
      count: patients.filter(p => p.ews.score === score).length,
      label: score >= 7 ? 'Critical' : score >= 5 ? 'High' : score >= 3 ? 'Medium' : 'Low',
      color: score >= 7 ? '#f43f5e' : score >= 5 ? '#f59e0b' : score >= 3 ? '#0ea5e9' : '#10b981',
    }));

    // Red Flag Analysis
    const redFlagCount = patients.filter(p => p.ews.has_red_flag).length;
    const redFlagPct = totalPts > 0 ? Math.round((redFlagCount / totalPts) * 100 * 10) / 10 : 0;

    // Patients without recent vitals (Missing Data Risk)
    const noVitals = patients.filter(p => !p.vitals?.bps).length;
    const noVitalsPct = totalPts > 0 ? Math.round((noVitals / totalPts) * 100 * 10) / 10 : 0;

    // Vital Stability Score (0-100): Lower σ = more stable = higher score
    const vs = vitalStability || {};
    const sbpStability = Math.max(0, 100 - (Number(vs.sd_sbp || 30) * 3));
    const hrStability = Math.max(0, 100 - (Number(vs.sd_hr || 20) * 3));
    const tempStability = Math.max(0, 100 - (Number(vs.sd_temp || 0.5) * 80));
    const spo2Stability = Math.max(0, 100 - (Number(vs.sd_spo2 || 3) * 10));
    const vitalStabilityScore = Math.round((sbpStability + hrStability + tempStability + spo2Stability) / 4);

    // ━━ Clinical Safety Index (CSI) — Composite 0-100 ━━
    // Weight: EWS Profile 30% + Vital Stability 25% + Risk Population 20% + Monitoring Completeness 15% + Readmission 10%
    const criticalPct = totalPts > 0 ? (ewsData?.critical || 0) / totalPts : 0;
    const highPct = totalPts > 0 ? (ewsData?.high || 0) / totalPts : 0;
    const ewsProfileScore = Math.max(0, Math.round(100 - (criticalPct * 300) - (highPct * 100)));
    const monitoringScore = Math.max(0, Math.round(100 - noVitalsPct * 2));
    const riskPopScore = Math.max(0, Math.round(100 - (Number(elderlyRisk?.very_elderly || 0) / Math.max(1, totalPts)) * 200));
    const readmitPenalty = Math.max(0, Math.round(100 - Number(readmitClinical?.readmit_rate_7d || 0) * 10));

    const csi = Math.round(
      (ewsProfileScore * 0.30) +
      (vitalStabilityScore * 0.25) +
      (riskPopScore * 0.20) +
      (monitoringScore * 0.15) +
      (readmitPenalty * 0.10)
    );

    // Format mortality trend
    const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const mortTrend = (mortalityTrend || []).map(m => ({
      month: MONTH_TH[parseInt(m.month?.split('-')[1])] || m.month,
      total_dch: Number(m.total_dch || 0),
      deaths: Number(m.deaths || 0),
      mortality_rate: Number(m.mortality_rate || 0),
    }));

    // Fall risk percentage
    const fallHigh = Number(fallRisk?.high_fall_risk || 0);
    const fallMod = Number(fallRisk?.moderate_fall_risk || 0);
    const fallTotal = Number(fallRisk?.total_current || 0);

    res.json({
      data_source: 'HOSxP XE + AI NEWS2',

      // ━━ Composite Score ━━
      csi,  // Clinical Safety Index 0-100
      csi_components: {
        ews_profile: ewsProfileScore,
        vital_stability: vitalStabilityScore,
        risk_population: riskPopScore,
        monitoring: monitoringScore,
        readmit_penalty: readmitPenalty,
      },

      // ━━ EWS Advanced ━━
      ews_distribution: ewsDistribution,
      red_flag_count: redFlagCount,
      red_flag_pct: redFlagPct,
      no_vitals_count: noVitals,
      no_vitals_pct: noVitalsPct,

      // ━━ Vital Signs Stability ━━
      vital_stability_score: vitalStabilityScore,
      vitals_summary: {
        avg_sbp: Number(vs.avg_sbp || 0),
        sd_sbp: Number(vs.sd_sbp || 0),
        avg_dbp: Number(vs.avg_dbp || 0),
        avg_hr: Number(vs.avg_hr || 0),
        sd_hr: Number(vs.sd_hr || 0),
        avg_temp: Number(vs.avg_temp || 0),
        sd_temp: Number(vs.sd_temp || 0),
        avg_rr: Number(vs.avg_rr || 0),
        sd_rr: Number(vs.sd_rr || 0),
        avg_spo2: Number(vs.avg_spo2 || 0),
        sd_spo2: Number(vs.sd_spo2 || 0),
        total_measurements: Number(vs.total_measurements || 0),
        patients_measured: Number(vs.patients_measured || 0),
      },

      // ━━ Sepsis Screening ━━
      sepsis: {
        screened: Number(sepsisScreen?.screened || 0),
        sirs_positive: Number(sepsisScreen?.sirs_positive || 0),
        hypotension: Number(sepsisScreen?.hypotension || 0),
        tachycardia: Number(sepsisScreen?.tachycardia || 0),
        fever: Number(sepsisScreen?.fever || 0),
        hypoxia: Number(sepsisScreen?.hypoxia || 0),
      },

      // ━━ Fall Risk ━━
      fall_risk: {
        high: fallHigh,
        moderate: fallMod,
        total: fallTotal,
        high_pct: fallTotal > 0 ? Math.round((fallHigh / fallTotal) * 100 * 10) / 10 : 0,
      },

      // ━━ Patient Risk Profile ━━
      risk_profile: {
        total: Number(elderlyRisk?.total_current || 0),
        very_elderly: Number(elderlyRisk?.very_elderly || 0),
        elderly: Number(elderlyRisk?.elderly || 0),
        long_stay: Number(elderlyRisk?.long_stay || 0),
        medium_stay: Number(elderlyRisk?.medium_stay || 0),
        short_stay: Number(elderlyRisk?.short_stay || 0),
        avg_age: Number(elderlyRisk?.avg_age || 0),
        avg_los: Number(elderlyRisk?.avg_los_current || 0),
      },

      // ━━ LOS Distribution ━━
      los_distribution: (losDistribution || []).map(d => ({
        range: d.los_range,
        count: Number(d.count || 0),
        avg_age: Number(d.avg_age || 0),
      })),

      // ━━ Mortality Trend ━━
      mortality_trend: mortTrend,

      // ━━ Nursing Load ━━
      nursing_load: (nursingLoad || []).map(w => ({
        ward: w.ward || 'Unknown',
        patients: Number(w.patient_count || 0),
        elderly: Number(w.elderly_count || 0),
        long_stay: Number(w.long_stay_count || 0),
        avg_los: Number(w.avg_los || 0),
        // Intensity score: patients + elderly bonus + long-stay bonus
        intensity: Number(w.patient_count || 0) + Math.round(Number(w.elderly_count || 0) * 0.5) + Number(w.long_stay_count || 0),
      })),

      // ━━ Top Diagnoses ━━
      top_diagnoses: (diagTop || []).map(d => ({
        icd10: d.icd10,
        name: d.dx_name || d.icd10,
        count: Number(d.count || 0),
        avg_los: Number(d.avg_los || 0),
        avg_age: Number(d.avg_age || 0),
      })),

      // ━━ Readmission (7-day clinical) ━━
      readmit_7d: {
        count: Number(readmitClinical?.readmit_count || 0),
        total: Number(readmitClinical?.total_dch || 0),
        rate: Number(readmitClinical?.readmit_rate_7d || 0),
      },

      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
