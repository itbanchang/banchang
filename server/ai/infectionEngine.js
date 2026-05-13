// ============================================================
// BCH 360° Intelligence V.10 — Infection Prevention Engine
// AI Module: HAI Rate Calculation, Outbreak Detection,
// Antimicrobial Resistance Analysis, Ward Risk Scoring
// ============================================================
import logger from '../logger.js';

/**
 * HA Thailand Benchmarks for Hospital-Acquired Infections
 */
const HA_BENCHMARKS = {
  CAUTI: { name: 'Catheter-Associated UTI', target: 3.5, unit: 'per 1,000 catheter-days' },
  CLABSI: { name: 'Central Line-Associated BSI', target: 1.5, unit: 'per 1,000 central-line-days' },
  VAP: { name: 'Ventilator-Associated Pneumonia', target: 5.0, unit: 'per 1,000 ventilator-days' },
  SSI: { name: 'Surgical Site Infection', target: 2.0, unit: 'per 100 procedures' },
  HAI_OVERALL: { name: 'Overall HAI Rate', target: 1.0, unit: '% of admissions' },
};

/**
 * ICD-10 code mappings for infection identification
 * Used as fallback when dedicated infection tracking tables are unavailable
 */
const INFECTION_ICD10 = {
  // HAI Types
  hai_pneumonia: { codes: ['J150', 'J189'], range: true, label: 'HAI-Pneumonia (VAP)' },
  hai_uti: { codes: ['N390'], range: false, label: 'HAI-UTI (CAUTI)' },
  hai_sepsis: { codes: ['A40', 'A419'], range: true, label: 'HAI-Sepsis (CLABSI)' },
  hai_ssi: { codes: ['T810', 'T819'], range: true, label: 'HAI-SSI' },

  // Communicable Diseases (Notifiable)
  tuberculosis: { codes: ['A15', 'A199'], range: true, label: 'Tuberculosis' },
  dengue: { codes: ['A90', 'A919'], range: true, label: 'Dengue Fever' },
  covid: { codes: ['U071', 'U072'], range: false, label: 'COVID-19' },
  influenza: { codes: ['J09', 'J119'], range: true, label: 'Influenza' },
  diarrhea: { codes: ['A00', 'A099'], range: true, label: 'Diarrheal Disease' },
  hepatitis: { codes: ['B15', 'B199'], range: true, label: 'Viral Hepatitis' },
  hiv: { codes: ['B20', 'B24'], range: true, label: 'HIV/AIDS' },
  malaria: { codes: ['B50', 'B549'], range: true, label: 'Malaria' },
  leptospirosis: { codes: ['A270', 'A279'], range: true, label: 'Leptospirosis' },
  chickenpox: { codes: ['B01', 'B019'], range: true, label: 'Chickenpox' },
  measles: { codes: ['B05', 'B059'], range: true, label: 'Measles' },

  // MDRO Indicators
  mrsa: { codes: ['B9562'], range: false, label: 'MRSA' },
  esbl: { codes: ['U82'], range: false, label: 'ESBL-producing organism' },
};

export class InfectionPreventionEngine {

  /**
   * Calculate HAI rate per 1,000 patient-days (or device-days)
   * @param {number} infections - Number of infection cases
   * @param {number} denominatorDays - Patient-days or device-days
   * @returns {number} Rate per 1,000
   */
  calculateHAIRate(infections, denominatorDays) {
    if (!denominatorDays || denominatorDays <= 0) return 0;
    return Math.round((infections / denominatorDays) * 1000 * 100) / 100;
  }

  /**
   * Detect potential outbreak using statistical process control
   * Alert when infection rate exceeds 2 standard deviations from baseline
   * @param {number} currentRate - Current period infection rate
   * @param {number} baselineRate - Historical baseline rate (mean)
   * @param {number} baselineSD - Standard deviation of baseline
   * @returns {Object} Outbreak assessment
   */
  detectOutbreak(currentRate, baselineRate, baselineSD) {
    if (!baselineSD || baselineSD <= 0) {
      // If no SD data, use simple threshold (2x baseline)
      const ratio = baselineRate > 0 ? currentRate / baselineRate : 0;
      return {
        alert: ratio > 2,
        zScore: ratio,
        level: ratio > 3 ? 'CRITICAL' : ratio > 2 ? 'WARNING' : 'NORMAL',
        description: ratio > 2
          ? `อัตราการติดเชื้อสูงกว่าค่าเฉลี่ย ${ratio.toFixed(1)} เท่า`
          : 'อยู่ในเกณฑ์ปกติ',
      };
    }

    const zScore = (currentRate - baselineRate) / baselineSD;
    let level = 'NORMAL';
    let description = 'อยู่ในเกณฑ์ปกติ';

    if (zScore > 3) {
      level = 'CRITICAL';
      description = `อัตราการติดเชื้อสูงเกิน 3 SD (Z=${zScore.toFixed(1)}) — ต้องสอบสวนโรคเร่งด่วน`;
    } else if (zScore > 2) {
      level = 'WARNING';
      description = `อัตราการติดเชื้อสูงเกิน 2 SD (Z=${zScore.toFixed(1)}) — ต้องเฝ้าระวังใกล้ชิด`;
    }

    return {
      alert: zScore > 2,
      zScore: Math.round(zScore * 100) / 100,
      level,
      description,
    };
  }

  /**
   * Analyze antimicrobial resistance patterns from ICD-10 data
   * Since HOSxP XE may not have dedicated culture tables,
   * we use ICD-10 codes that indicate resistant organisms
   * @param {Array} infectionCases - Array of infection cases with ICD codes
   * @returns {Object} Resistance analysis
   */
  analyzeResistanceFromICD(infectionCases) {
    const resistanceIndicators = {
      MRSA: { icd: 'B9562', count: 0, label: 'MRSA' },
      ESBL: { icd: 'U82', count: 0, label: 'ESBL-producing' },
      VRE: { icd: 'B9580', count: 0, label: 'VRE' },
      CRE: { icd: 'U83', count: 0, label: 'Carbapenem-resistant' },
    };

    for (const c of (infectionCases || [])) {
      const icd = c.icd10 || '';
      if (icd.startsWith('B9562')) resistanceIndicators.MRSA.count++;
      if (icd.startsWith('U82')) resistanceIndicators.ESBL.count++;
      if (icd.startsWith('B9580')) resistanceIndicators.VRE.count++;
      if (icd.startsWith('U83')) resistanceIndicators.CRE.count++;
    }

    const total = infectionCases?.length || 0;
    return {
      total_cases: total,
      mdro_indicators: Object.values(resistanceIndicators).map(r => ({
        organism: r.label,
        count: r.count,
        rate_pct: total > 0 ? Math.round((r.count / total) * 10000) / 100 : 0,
      })),
      note: 'Based on ICD-10 secondary diagnosis codes — may underestimate true resistance rates',
    };
  }

  /**
   * Estimate hand hygiene compliance impact from HAI rates
   * Literature: 10% improvement in HH compliance => ~5% reduction in HAI
   * @param {number} haiRate - Current HAI rate (%)
   * @param {number} benchmarkRate - HA Thailand benchmark rate
   * @returns {Object} Compliance impact estimate
   */
  estimateComplianceImpact(haiRate, benchmarkRate = HA_BENCHMARKS.HAI_OVERALL.target) {
    const gap = haiRate - benchmarkRate;
    const ratio = benchmarkRate > 0 ? haiRate / benchmarkRate : 1;

    let complianceEstimate, recommendation;

    if (ratio <= 1) {
      complianceEstimate = 'ดีเยี่ยม (>90%)';
      recommendation = 'รักษามาตรฐานสุขอนามัยมือ — ทำได้ดีมาก';
    } else if (ratio <= 1.5) {
      complianceEstimate = 'ดี (75-90%)';
      recommendation = 'เพิ่มการสังเกตการณ์ล้างมือ สามารถลดอัตรา HAI ได้';
    } else if (ratio <= 2) {
      complianceEstimate = 'ปานกลาง (60-75%)';
      recommendation = 'ต้องเพิ่มการอบรมและ compliance audit — เป้าหมาย >80%';
    } else {
      complianceEstimate = 'ต่ำ (<60%)';
      recommendation = 'ต้องมาตรการเร่งด่วน: Multimodal HH Strategy + Feedback + Accountability';
    }

    return {
      hai_rate: haiRate,
      benchmark: benchmarkRate,
      gap_pct: Math.round(gap * 100) / 100,
      estimated_compliance: complianceEstimate,
      recommendation,
      potential_reduction: gap > 0 ? `ถ้าปรับปรุง HH compliance +20% อาจลดอัตรา HAI ได้ ~${Math.round(gap * 0.5 * 100) / 100}%` : null,
    };
  }

  /**
   * Calculate ward-level infection risk scores
   * Based on: HAI rate, occupancy, patient acuity (CMI), LOS
   * @param {Array} wardData - Array of ward-level data
   * @returns {Array} Ward risk scores sorted by risk
   */
  calculateWardRiskScores(wardData) {
    if (!wardData || wardData.length === 0) return [];

    return wardData.map(ward => {
      // Normalize each factor to 0-100 scale
      const haiScore = Math.min(100, (ward.hai_rate_pct || 0) * 35);  // Weight: 35%
      const occupancyScore = Math.min(100, (ward.occupancy_pct || 0));  // Weight: 20%
      const acuityScore = Math.min(100, ((ward.cmi || 1) - 0.5) * 50); // Weight: 25%
      const losScore = Math.min(100, ((ward.avg_los || 3) / 14) * 100); // Weight: 20%

      const riskScore = Math.round(
        haiScore * 0.35 +
        occupancyScore * 0.20 +
        acuityScore * 0.25 +
        losScore * 0.20
      );

      let riskLevel, color;
      if (riskScore >= 70) { riskLevel = 'HIGH'; color = '#ef4444'; }
      else if (riskScore >= 40) { riskLevel = 'MODERATE'; color = '#f59e0b'; }
      else { riskLevel = 'LOW'; color = '#10b981'; }

      return {
        ward_name: ward.ward_name,
        ward_code: ward.ward_code,
        risk_score: riskScore,
        risk_level: riskLevel,
        color,
        factors: {
          hai_contribution: Math.round(haiScore * 0.35),
          occupancy_contribution: Math.round(occupancyScore * 0.20),
          acuity_contribution: Math.round(acuityScore * 0.25),
          los_contribution: Math.round(losScore * 0.20),
        },
        raw: {
          hai_rate_pct: ward.hai_rate_pct || 0,
          occupancy_pct: ward.occupancy_pct || 0,
          cmi: ward.cmi || 0,
          avg_los: ward.avg_los || 0,
          hai_cases: ward.hai_cases || 0,
          admissions: ward.admissions || 0,
        },
      };
    }).sort((a, b) => b.risk_score - a.risk_score);
  }

  /**
   * Classify infection as community-acquired vs hospital-acquired
   * Rule: If infection ICD appears as secondary dx AND admission > 48 hours, likely HAI
   * @param {string} diagtype - '1' = primary, '2' = secondary
   * @param {number} daysSinceAdmission - Days between admission and diagnosis
   * @returns {string} 'HAI' | 'CAI' | 'UNKNOWN'
   */
  classifyInfectionOrigin(diagtype, daysSinceAdmission) {
    if (diagtype === '1' || diagtype === 1) return 'CAI'; // Primary dx = community
    if (daysSinceAdmission >= 2) return 'HAI'; // Secondary dx after 48h = HAI
    return 'UNKNOWN';
  }

  /**
   * Generate HAI prevention recommendations based on data
   * @param {Object} summary - HAI summary data
   * @returns {Array} List of recommendations
   */
  generateRecommendations(summary) {
    const recs = [];

    if ((summary?.hai_rate_pct || 0) > HA_BENCHMARKS.HAI_OVERALL.target) {
      recs.push({
        priority: 'HIGH',
        area: 'HAI Rate',
        message: `อัตรา HAI (${summary.hai_rate_pct}%) สูงกว่าเกณฑ์ HA Thailand (${HA_BENCHMARKS.HAI_OVERALL.target}%)`,
        action: 'ทบทวน Hand Hygiene Protocol, Standard Precautions, และ Device Bundle',
      });
    }

    if ((summary?.uti_count || 0) > 0) {
      recs.push({
        priority: 'MODERATE',
        area: 'CAUTI Prevention',
        message: `พบ CAUTI ${summary.uti_count} ราย — ทบทวน catheter indication`,
        action: 'ประเมิน Catheter Necessity Daily, ถอด catheter ที่ไม่จำเป็น',
      });
    }

    if ((summary?.pneumonia_count || 0) > 0) {
      recs.push({
        priority: 'MODERATE',
        area: 'VAP Prevention',
        message: `พบ VAP/HAP ${summary.pneumonia_count} ราย`,
        action: 'ทบทวน VAP Bundle: Head elevation, Oral care, Sedation vacation, SBT',
      });
    }

    if ((summary?.ssi_count || 0) > 0) {
      recs.push({
        priority: 'MODERATE',
        area: 'SSI Prevention',
        message: `พบ SSI ${summary.ssi_count} ราย`,
        action: 'ทบทวน Surgical Safety Checklist, Antibiotic Prophylaxis Timing',
      });
    }

    if ((summary?.sepsis_count || 0) > 0) {
      recs.push({
        priority: 'HIGH',
        area: 'Sepsis/CLABSI',
        message: `พบ Sepsis/BSI ${summary.sepsis_count} ราย`,
        action: 'ทบทวน Central Line Bundle, Line Necessity, Aseptic Technique',
      });
    }

    if (recs.length === 0) {
      recs.push({
        priority: 'INFO',
        area: 'Overall',
        message: 'อัตรา HAI อยู่ในเกณฑ์ดี',
        action: 'รักษามาตรฐาน IC ต่อไป — ทำได้ดี',
      });
    }

    return recs;
  }

  /**
   * Get HA Thailand benchmarks for reference
   */
  getBenchmarks() {
    return HA_BENCHMARKS;
  }

  /**
   * Get ICD-10 infection code mappings
   */
  getInfectionICD10() {
    return INFECTION_ICD10;
  }
}

export const infectionEngine = new InfectionPreventionEngine();
export default infectionEngine;
