// ============================================================
// Shared Tab Narrative Builders — Executive Quick Summary
// Lightweight rule-based analyzers for 12 hospital dashboard tabs
// Each returns { headline, headlineColor, kpi, sections }
// ============================================================

import { nn, fmt } from '@utils/formatters';
const bar = (v, good, warn) => v >= good ? '#10b981' : v >= warn ? '#f59e0b' : '#f43f5e';
const barLow = (v, maxOk, maxWarn) => v <= maxOk ? '#10b981' : v <= maxWarn ? '#f59e0b' : '#f43f5e';

// ─── OPD ─────────────────────────────────────────────────────
export function buildOPDQuickSummary(s) {
  const t = s?.opdToday;
  if (!t) return null;
  const visits = nn(t.today_total ?? t.total_visits);
  const completed = nn(t.completed);
  const stillHere = nn(t.still_here_breakdown?.likely_waiting ?? t.still_here);
  const sla = nn(t.sla_pct);
  const avgWait = nn(t.avg_total_minutes ?? t.avg_wait_minutes);
  const p90 = nn(t.p90_wait);
  const dropout = nn(t.dropout_pct);
  const capacity = nn(t.capacity_utilization);
  const throughputRate = nn(t.throughput); // rate per hour

  let headline, hlColor;
  if (p90 >= 90 || dropout >= 10) {
    headline = `🔴 OPD วันนี้มี Bottleneck — P90 Wait ${p90} นาที · Dropout ${dropout.toFixed(1)}% · ต้องเพิ่ม capacity ทันที`;
    hlColor = '#f43f5e';
  } else if (sla >= 80 && avgWait <= 30) {
    headline = `✅ OPD ทำงานได้ตามมาตรฐาน — SLA ${sla.toFixed(0)}% · Avg Wait ${avgWait.toFixed(0)} นาที · Visits ${fmt(visits)} ราย`;
    hlColor = '#10b981';
  } else {
    headline = `OPD วันนี้: ${fmt(visits)} ราย (จบแล้ว ${fmt(completed)} · ยังรอ ${fmt(stillHere)}) · SLA ${sla.toFixed(0)}% · Avg Wait ${avgWait.toFixed(0)} นาที`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Visits Today', value: fmt(visits), sub: `จบ ${fmt(completed)} · รอ ${fmt(stillHere)}`, color: '#0284c7' },
      { label: 'SLA %', value: `${sla.toFixed(0)}%`, sub: sla >= 80 ? 'ผ่านเกณฑ์' : 'ต่ำกว่าเกณฑ์', color: bar(sla, 80, 65) },
      { label: 'Avg Wait', value: `${avgWait.toFixed(0)} นาที`, sub: `P90: ${p90} นาที`, color: barLow(avgWait, 30, 45) },
      { label: 'Dropout %', value: `${dropout.toFixed(1)}%`, sub: dropout >= 10 ? 'สูง' : dropout >= 5 ? 'ปกติ' : 'ต่ำ', color: barLow(dropout, 5, 10) },
      { label: 'Throughput', value: `${throughputRate}/ชม.`, sub: throughputRate >= 20 ? 'ดี' : 'ต่ำ', color: bar(throughputRate, 20, 10) },
      { label: 'Capacity', value: `${capacity.toFixed(0)}%`, sub: capacity >= 95 ? 'เต็ม' : capacity >= 80 ? 'ใกล้เต็ม' : 'มีพื้นที่', color: capacity >= 95 ? '#f43f5e' : capacity >= 80 ? '#f59e0b' : '#10b981' },
    ],
    sections: [
      { icon: '⏱️', title: 'Wait Time & Flow', text: `Average Wait ${avgWait.toFixed(0)} นาที · P90 ${p90} นาที · SLA ${sla.toFixed(1)}%. ${p90 >= 90 ? 'Tail ยาว — บ่งชี้ bottleneck ที่จุดใดจุดหนึ่ง (คัดกรอง→พบแพทย์ หรือ รอยา)' : avgWait <= 30 ? 'Patient Flow ไหลลื่น' : 'มีพื้นที่ปรับปรุง'}`, color: barLow(p90, 60, 90) },
      { icon: '📉', title: 'Demand vs Capacity', text: `Visits ${fmt(visits)} ราย · จบแล้ว ${fmt(completed)} · ยังรอ ${fmt(stillHere)} · Throughput ${throughputRate}/ชม. · Utilization ${capacity.toFixed(0)}%. ${capacity >= 95 ? '⚠ แน่นเกิน 95% — เพิ่ม slot หรือ extended hours' : capacity <= 60 ? 'Under-utilization — marketing/outreach อาจช่วย' : 'Capacity balance ดี'}`, color: capacity >= 95 || capacity <= 60 ? '#f59e0b' : '#10b981' },
    ],
  };
}

// ─── IPD ─────────────────────────────────────────────────────
export function buildIPDQuickSummary(s) {
  const bedSum = s?.bedOccupancy?.summary;
  const alosSum = s?.alosData?.summary;
  const analytics = s?.ipdAnalytics;
  const readm = s?.readmission;
  if (!bedSum && !alosSum && !analytics) return null;

  const occ = nn(bedSum?.occupancy_rate);
  const totalBeds = nn(bedSum?.total_beds);
  const occBeds = nn(bedSum?.occupied);
  const alosVal = nn(alosSum?.overall_alos);
  const readmRate = nn(analytics?.readmit_rate);
  const readmCount = nn(analytics?.readmit_count);
  const mortRate = nn(analytics?.mortality_rate);
  const turnover = nn(analytics?.bed_turnover_rate);
  const overstayPct = nn(analytics?.overstay_pct);
  const riskyReadmit = (readm?.patients || []).filter(p => ['high', 'moderate'].includes(p?.risk_level)).length;

  let headline, hlColor;
  if (occ >= 95) {
    headline = `🔴 Bed Capacity Crisis — Occupancy ${occ.toFixed(0)}% (${occBeds}/${totalBeds}) · กระทบ admission flow · ต้อง expedite discharge`;
    hlColor = '#f43f5e';
  } else if (mortRate >= 3 || readmRate > 10) {
    headline = `⚠ IPD Quality ต้อง attention — Mortality ${mortRate.toFixed(1)}% · Readmit ${readmRate.toFixed(1)}% · ทบทวน Clinical Pathway + Discharge planning`;
    hlColor = '#f59e0b';
  } else if (alosVal > 6 || overstayPct > 20) {
    headline = `⚠ IPD Flow ต้อง attention — ALOS ${alosVal.toFixed(1)} วัน · Overstay ${overstayPct.toFixed(1)}% · Clinical Pathway review`;
    hlColor = '#f59e0b';
  } else if (occ >= 70 && occ <= 85 && alosVal <= 5 && mortRate < 2) {
    headline = `✅ IPD ทำงานใน Optimal Zone — Occupancy ${occ.toFixed(0)}% · ALOS ${alosVal.toFixed(1)} วัน · Mortality ${mortRate.toFixed(1)}% · Patient Flow ดี`;
    hlColor = '#10b981';
  } else {
    headline = `IPD: Occupancy ${occ.toFixed(0)}% (${occBeds}/${totalBeds}) · ALOS ${alosVal.toFixed(1)} วัน · Readmit ${readmRate.toFixed(1)}% · Mortality ${mortRate.toFixed(1)}%`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Occupancy', value: `${occ.toFixed(0)}%`, sub: `${occBeds}/${totalBeds} beds`, color: occ >= 95 ? '#f43f5e' : occ >= 85 ? '#f59e0b' : occ >= 70 ? '#10b981' : '#0ea5e9' },
      { label: 'ALOS', value: `${alosVal.toFixed(1)} วัน`, sub: alosVal > 6 ? 'ยาวกว่าเกณฑ์' : 'ในเกณฑ์', color: barLow(alosVal, 5, 6) },
      { label: 'Readmit Rate', value: `${readmRate.toFixed(1)}%`, sub: `${readmCount} ราย / เสี่ยง ${riskyReadmit}`, color: barLow(readmRate, 5, 10) },
      { label: 'Mortality', value: `${mortRate.toFixed(1)}%`, sub: mortRate >= 3 ? 'เกินเกณฑ์ HA' : mortRate >= 2 ? 'เฝ้าระวัง' : 'ในเกณฑ์', color: barLow(mortRate, 2, 3) },
      { label: 'Bed Turnover', value: `${turnover.toFixed(1)}x`, sub: turnover >= 3 ? 'ดี' : 'ต่ำ', color: bar(turnover, 3, 1.5) },
      { label: 'Overstay', value: `${overstayPct.toFixed(1)}%`, sub: overstayPct > 20 ? 'สูง' : 'ปกติ', color: barLow(overstayPct, 10, 20) },
    ],
    sections: [
      { icon: '🛏️', title: 'Bed Management', text: `${occBeds}/${totalBeds} เตียงถูกใช้ (${occ.toFixed(0)}%) · Turnover ${turnover.toFixed(1)}x. ${occ >= 95 ? '🔴 วิกฤต — open surge beds, expedite discharge' : occ >= 85 ? 'ใกล้เต็ม — monitor discharge pace' : occ >= 70 ? '✅ Optimal range (70-85%)' : 'Under-utilized — พิจารณา marketing / service expansion'}`, color: occ >= 95 ? '#f43f5e' : occ >= 70 ? '#10b981' : '#f59e0b' },
      { icon: '⏱️', title: 'ALOS & Overstay', text: `ALOS ${alosVal.toFixed(1)} วัน · Overstay ${overstayPct.toFixed(1)}%. ${alosVal > 6 ? 'ALOS ยาว — ทบทวน Discharge planning + Clinical Pathway' : overstayPct > 20 ? 'Overstay สูง — Daily Discharge Planning Meeting' : '✅ LOS ทำงานได้ดี'}`, color: (alosVal > 6 || overstayPct > 20) ? '#f59e0b' : '#10b981' },
      { icon: '🩺', title: 'Clinical Quality', text: `Readmit 30d ${readmRate.toFixed(1)}% (${readmCount} ราย · เสี่ยง ${riskyReadmit}) · Mortality ${mortRate.toFixed(1)}%. ${mortRate >= 3 ? '🔴 Mortality เกินเกณฑ์ HA 2% — M&M Conference + RCA' : readmRate > 10 ? '⚠ Readmit สูง — post-discharge follow-up protocol' : '✅ Quality indicators ดี'}`, color: (mortRate >= 3 || readmRate > 10) ? '#f43f5e' : '#10b981' },
    ],
  };
}

// ─── ER ──────────────────────────────────────────────────────
export function buildERQuickSummary(s) {
  const a = s?.erAnalytics;
  const p = s?.erTodayPatients;
  const surge = s?.erSurge;
  if (!a && !p) return null;
  const avgDoc = nn(a?.avg_time_to_doctor);
  const p90Doc = nn(a?.p90_time_to_doctor);
  const lwbs = nn(a?.lwbs_rate);
  const returnVis = nn(a?.return_visit_rate);
  const ta = a?.today_acuity || {};
  const acuityPct = nn(ta.acuity_pct);
  const surgeAlert = !!surge?.surge_alert;
  const surgeLevel = surgeAlert ? 'critical' : lwbs >= 2 ? 'high' : 'normal';
  const patientsCount = nn(ta.total ?? (Array.isArray(p) ? p.length : p?.total));

  // Triage levels
  const level1 = nn(ta.resus);
  const level2 = nn(ta.emerg);
  const level12 = level1 + level2;

  let headline, hlColor;
  if (surgeLevel === 'critical' || lwbs >= 5) {
    headline = `🚨 ER Surge วิกฤต — ผู้ป่วยในห้อง ${patientsCount} ราย · LWBS ${lwbs.toFixed(1)}% · เรียก extra staff + open fast-track`;
    hlColor = '#f43f5e';
  } else if (p90Doc >= 60 || acuityPct >= 30) {
    headline = `⚠ ER Under Pressure — P90 Time-to-Doctor ${p90Doc} นาที · High Acuity ${acuityPct.toFixed(0)}% · ${patientsCount} ราย`;
    hlColor = '#f59e0b';
  } else if (avgDoc <= 30 && lwbs < 2) {
    headline = `✅ ER Flow ดี — Door-to-Doc ${avgDoc.toFixed(0)} นาที (P90 ${p90Doc}) · LWBS ${lwbs.toFixed(1)}% · ${patientsCount} ราย ณ ปัจจุบัน`;
    hlColor = '#10b981';
  } else {
    headline = `ER: ${fmt(patientsCount)} ราย ณ ปัจจุบัน · TTD ${avgDoc.toFixed(0)} นาที · LWBS ${lwbs.toFixed(1)}% · High Acuity ${acuityPct.toFixed(0)}%`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Patients Now', value: fmt(patientsCount), sub: `L1-2: ${level12} · L3+: ${patientsCount - level12}`, color: surgeLevel === 'critical' ? '#f43f5e' : surgeLevel === 'high' ? '#f59e0b' : '#10b981' },
      { label: 'Door-to-Doctor', value: `${avgDoc.toFixed(0)} นาที`, sub: `P90: ${p90Doc} นาที`, color: barLow(avgDoc, 30, 60) },
      { label: 'LWBS %', value: `${lwbs.toFixed(1)}%`, sub: lwbs >= 5 ? 'วิกฤต' : lwbs >= 2 ? 'เฝ้าระวัง' : 'ดี', color: barLow(lwbs, 2, 5) },
      { label: 'High Acuity', value: `${acuityPct.toFixed(0)}%`, sub: `L1: ${level1} · L2: ${level2}`, color: acuityPct >= 30 ? '#f43f5e' : '#0ea5e9' },
      { label: 'Return 72h', value: `${returnVis.toFixed(1)}%`, sub: 'Bounce-back rate', color: barLow(returnVis, 3, 5) },
      { label: 'Surge Status', value: surgeAlert ? '🚨 Active' : '✅ Normal', sub: surgeAlert ? 'Extra staff' : 'Baseline', color: surgeAlert ? '#f43f5e' : '#10b981' },
    ],
    sections: [
      { icon: '⚡', title: 'ER Throughput & Flow', text: `ผู้ป่วย ณ ปัจจุบัน ${fmt(patientsCount)} ราย · Door-to-Doctor ${avgDoc.toFixed(0)} นาที (P90 ${p90Doc}). ${p90Doc >= 60 ? 'Tail ยาว — bottleneck ที่ triage/physician assignment' : avgDoc === 0 && patientsCount > 0 ? 'Triage เร็ว แต่ติดตามเวลารอรักษาจริงด้วย (ดู ER Diversion)' : 'Flow ปกติ'}`, color: barLow(p90Doc, 60, 90) },
      { icon: '🚨', title: 'Acuity & Safety', text: `High Acuity ${acuityPct.toFixed(0)}% (L1 ${level1} · L2 ${level2}) · LWBS ${lwbs.toFixed(1)}% · Return 72h ${returnVis.toFixed(1)}%. ${acuityPct >= 30 ? '⚠ Case mix หนัก — staff cognitive load สูง' : lwbs >= 5 ? 'LWBS สูง — ผู้ป่วยไม่รอ เสี่ยง missed care' : '✅ Safety indicators ดี'}`, color: (acuityPct >= 30 || lwbs >= 5) ? '#f59e0b' : '#10b981' },
    ],
  };
}

// ─── NCD ─────────────────────────────────────────────────────
export function buildNCDQuickSummary(s) {
  const t = s?.ncdToday;
  const a = s?.ncdAnalytics;
  if (!t && !a) return null;
  const total = nn(t?.total);
  const completed = nn(t?.completed);
  const completionTodayPct = total > 0 ? (completed / total) * 100 : 0;
  const completionRate30d = nn(a?.completion_rate);
  const completionRate = completionRate30d > 0 ? completionRate30d : completionTodayPct;
  // Prefer 30d analytics wait (more stable); fall back to today
  const avgWait = nn(a?.avg_wait_time ?? t?.avg_wait_time);
  const waitSla = nn(a?.wait_sla_pct);
  const nci = nn(a?.nci);
  const revisitRate = nn(a?.revisit_rate);
  const avgRevPerVisit = nn(a?.avg_revenue_per_visit);
  const avgDaily = nn(a?.avg_daily_visits);

  const diseases = t?.diseases || t?.disease_breakdown || {};
  const dm = nn(diseases.dm ?? diseases.DM);
  const ht = nn(diseases.ht ?? diseases.HT);
  const ckd = nn(diseases.ckd ?? diseases.CKD);

  let headline, hlColor;
  if (nci > 0 && nci < 50) {
    headline = `🔴 NCD วิกฤต — NCI ${nci}/100 · Wait ${avgWait}m (SLA ${waitSla}%) · Revisit ${revisitRate.toFixed(1)}% · ต้อง intervention ด่วน`;
    hlColor = '#f43f5e';
  } else if (avgWait >= 45 || revisitRate >= 15 || waitSla < 60) {
    headline = `⚠ NCD ต้อง attention — Wait ${avgWait}m · SLA ${waitSla}% · Revisit ${revisitRate.toFixed(1)}% · NCI ${nci}/100`;
    hlColor = '#f59e0b';
  } else if (nci >= 80 && completionRate >= 95) {
    headline = `✅ NCD Care ดีเยี่ยม — NCI ${nci}/100 · Completion ${completionRate.toFixed(1)}% · ${fmt(total)} ราย`;
    hlColor = '#10b981';
  } else {
    headline = `NCD วันนี้: ${fmt(total)} ราย (DM ${dm} · HT ${ht} · CKD ${ckd}) · NCI ${nci}/100 · Wait ${avgWait}m · SLA ${waitSla}%`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Today', value: fmt(total), sub: `จบ ${completed} · Avg daily ${Math.round(avgDaily)}`, color: '#0f766e' },
      { label: 'Disease Mix', value: `${dm}/${ht}`, sub: `DM/HT · CKD ${ckd}`, color: '#14b8a6' },
      { label: 'NCI Score', value: `${nci}/100`, sub: nci >= 80 ? 'ยอดเยี่ยม' : nci >= 60 ? 'ดี' : 'ต้องปรับ', color: bar(nci, 80, 60) },
      { label: 'Avg Wait', value: `${avgWait}m`, sub: `SLA ${waitSla}%`, color: barLow(avgWait, 30, 45) },
      { label: 'Revisit 7d', value: `${revisitRate.toFixed(1)}%`, sub: revisitRate <= 5 ? 'ดี' : revisitRate <= 15 ? 'เฝ้าระวัง' : 'สูง', color: barLow(revisitRate, 5, 15) },
      { label: 'Rev / Visit', value: `฿${fmt(avgRevPerVisit)}`, sub: avgRevPerVisit >= 1200 ? 'ดี' : 'ปกติ', color: bar(avgRevPerVisit, 1200, 800) },
    ],
    sections: [
      { icon: '🫀', title: 'NCD Clinic Flow', text: `วันนี้ ${fmt(total)} ราย (จบ ${completed}) · Avg daily ${avgDaily.toFixed(0)} · Wait ${avgWait}m (SLA ≤30m: ${waitSla}%) · Completion ${completionRate.toFixed(1)}%. ${avgWait >= 45 ? '🔴 Wait สูง — Pre-lab + Fast-track Stable NCD + เพิ่มแพทย์ช่วง Peak (07:00) + Telemedicine refill' : '✅ Flow ปกติ'}`, color: avgWait >= 45 ? '#f43f5e' : '#10b981' },
      { icon: '🏥', title: 'Disease Control Intelligence', text: `ผู้ป่วยวันนี้: DM ${dm} · HT ${ht} · CKD ${ckd}. Revisit 7d ${revisitRate.toFixed(1)}%. ${revisitRate >= 15 ? '⚠ Revisit สูง — แยก Planned (Lab follow-up, ปรับยา) vs Unplanned (BP crisis, Hypoglycemia) · Home BP/FBS monitoring · ปรับยาตั้งแต่ครั้งแรก' : '✅ Disease control ดี'}. ขาดนัด = Uncontrolled → Complication (Stroke/MI/CKD) → IPD cost สูง`, color: revisitRate >= 15 ? '#f59e0b' : '#10b981' },
      { icon: '💰', title: 'NCD Revenue & Quality Index', text: `Rev/Visit ฿${fmt(avgRevPerVisit)} · NCI ${nci}/100. ${nci < 50 ? '🔴 NCI ต่ำ — ดู lowest component (Wait/SLA/Completion/Revenue)' : nci >= 80 ? '✅ NCI ยอดเยี่ยม' : 'มีพื้นที่ปรับปรุง · เพิ่ม Annual NCD Screening + Complication screening (Eye/Foot/Kidney) · Corporate health check'}`, color: nci < 50 ? '#f43f5e' : nci >= 80 ? '#10b981' : '#f59e0b' },
    ],
  };
}

// ─── Pharmacy ────────────────────────────────────────────────
export function buildPharmacyQuickSummary(s) {
  const t = s?.pharmacyToday;
  const a = s?.pharmacyAnalytics;
  if (!t && !a) return null;
  const totalRx = nn(t?.total_prescriptions ?? a?.total_prescriptions);
  const opdRx = nn(t?.opd_prescriptions);
  const ipdRx = nn(t?.ipd_prescriptions);
  const totalValue = nn(t?.total_value);
  const genericRatio = nn(a?.generic_ratio);
  const costPerRx = nn(a?.drug_cost_per_rx);
  const avgDaily = nn(a?.avg_daily_rx);
  const revCostRatio = nn(a?.rev_cost_ratio);
  const ppi = nn(a?.ppi);
  const pharmacistCount = nn(a?.on_duty?.pharmacists?.length);
  const rxPerPharmacist = pharmacistCount > 0 ? Math.round(totalRx / pharmacistCount) : 0;

  let headline, hlColor;
  if (genericRatio < 30) {
    headline = `🔴 Generic Adoption วิกฤต — ${genericRatio.toFixed(1)}% (เป้า ≥80%) · PPI ${ppi}/100 · ต้องกำหนดนโยบาย Generic First ด่วน`;
    hlColor = '#f43f5e';
  } else if (genericRatio < 50 || revCostRatio < 1) {
    headline = `⚠ Generic Substitution ต่ำ — ${genericRatio.toFixed(1)}% · Rev/Cost ${revCostRatio.toFixed(2)} · เสียโอกาสประหยัดต้นทุน`;
    hlColor = '#f59e0b';
  } else if (genericRatio >= 75 && revCostRatio >= 1.3 && ppi >= 75) {
    headline = `✅ เภสัชกรรมมีประสิทธิภาพดี — Generic ${genericRatio.toFixed(0)}% · Rev/Cost ${revCostRatio.toFixed(2)} · PPI ${ppi}/100`;
    hlColor = '#10b981';
  } else {
    headline = `Pharmacy: ${fmt(totalRx)} Rx (OPD ${opdRx} · IPD ${ipdRx}) · Generic ${genericRatio.toFixed(1)}% · Cost/Rx ฿${fmt(costPerRx)} · PPI ${ppi}/100`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Rx Today', value: fmt(totalRx), sub: `OPD ${opdRx} · IPD ${ipdRx}`, color: '#10b981' },
      { label: 'Generic %', value: `${genericRatio.toFixed(1)}%`, sub: genericRatio >= 75 ? 'ดี' : genericRatio >= 50 ? 'ปานกลาง' : 'ต่ำ', color: bar(genericRatio, 75, 50) },
      { label: 'Cost / Rx', value: `฿${fmt(costPerRx)}`, sub: costPerRx <= 300 ? 'ดี' : costPerRx <= 500 ? 'ปานกลาง' : 'สูง', color: barLow(costPerRx, 300, 500) },
      { label: 'Rev / Cost', value: revCostRatio.toFixed(2), sub: revCostRatio >= 1.3 ? 'กำไรดี' : revCostRatio >= 1 ? 'พอใช้' : 'ขาดทุน', color: bar(revCostRatio, 1.3, 1) },
      { label: 'PPI Score', value: `${ppi}/100`, sub: ppi >= 75 ? 'ยอดเยี่ยม' : ppi >= 50 ? 'ปานกลาง' : 'ต้องปรับ', color: bar(ppi, 75, 50) },
      { label: 'Workload', value: pharmacistCount > 0 ? `${rxPerPharmacist}/คน` : `${fmt(Math.round(avgDaily))}/วัน`, sub: pharmacistCount > 0 ? `${pharmacistCount} เภสัชกร` : 'Avg daily', color: '#7c3aed' },
    ],
    sections: [
      { icon: '💊', title: 'Formulary & Generic Policy', text: `Generic ${genericRatio.toFixed(1)}% (เป้า ≥80%) · Cost/Rx ฿${fmt(costPerRx)} · ยอดจ่ายยาวันนี้ ${fmt(totalRx)} Rx (OPD ${opdRx} · IPD ${ipdRx}) มูลค่า ฿${fmt(totalValue)}. ${genericRatio < 30 ? '🔴 Generic ต่ำมาก — เพิ่มทุก 10% ประหยัดต้นทุนได้มีนัยสำคัญ' : genericRatio < 50 ? '⚠ ยัง substitute ได้อีกมาก — P&T Committee ทบทวน formulary' : '✅ Formulary mix ดี'}`, color: bar(genericRatio, 75, 50) },
      { icon: '📊', title: 'Margin & Performance Index', text: `Rev/Cost ${revCostRatio.toFixed(2)} · PPI ${ppi}/100. ${revCostRatio < 1 ? '🔴 ขาดทุน — ทบทวน pricing' : revCostRatio >= 1.3 ? '✅ Margin ดี' : 'Margin บาง'}${ppi >= 75 ? ' · PPI ยอดเยี่ยม' : ppi >= 50 ? ' · PPI มีพื้นที่ปรับปรุง' : ' · PPI ต่ำ — ตรวจสอบ lowest component'}`, color: (revCostRatio >= 1.3 && ppi >= 75) ? '#10b981' : (revCostRatio < 1) ? '#f43f5e' : '#f59e0b' },
    ],
  };
}

// ─── Laboratory ──────────────────────────────────────────────
export function buildLabQuickSummary(s) {
  const t = s?.labToday;
  const a = s?.labAnalytics;
  if (!t && !a) return null;
  const totalOrders = nn(t?.total_orders);
  const completedN = nn(t?.completed);
  const pendingN = nn(t?.pending);
  const uniquePt = nn(t?.unique_patients);
  const criticalValuesCount = Array.isArray(t?.critical_values) ? t.critical_values.length : nn(t?.critical_values_count);
  const avgTAT = nn(a?.avg_tat);
  const p90TAT = nn(a?.p90_tat);
  const tatSla = nn(a?.tat_sla_pct);
  const lpi = nn(a?.lpi);
  const completion30d = nn(a?.completion_rate);
  const todayCompletion = totalOrders > 0 ? Math.round((completedN / totalOrders) * 100) : 0;
  const completion = completion30d > 0 ? completion30d : todayCompletion;
  const abnormal = nn(t?.abnormal_rate ?? a?.abnormal_rate);

  let headline, hlColor;
  if (criticalValuesCount >= 10 || p90TAT >= 180) {
    headline = `🔴 Lab วิกฤต — Critical Values ${criticalValuesCount} ราย · P90 TAT ${p90TAT}m (SLA ${tatSla}%) · ต้องรายงานแพทย์ทันที`;
    hlColor = '#f43f5e';
  } else if (criticalValuesCount >= 5 || avgTAT >= 120 || completion < 70 || tatSla < 50) {
    headline = `⚠ Lab ต้อง attention — Critical ${criticalValuesCount} · TAT ${avgTAT}m (SLA ${tatSla}%) · Completion ${completion.toFixed(0)}% · LPI ${lpi}`;
    hlColor = '#f59e0b';
  } else if (avgTAT <= 60 && completion >= 90 && tatSla >= 85) {
    headline = `✅ Lab TAT ยอดเยี่ยม — ${fmt(totalOrders)} orders · Avg ${avgTAT}m · SLA ${tatSla}% · LPI ${lpi}/100`;
    hlColor = '#10b981';
  } else {
    headline = `Lab: ${fmt(totalOrders)} orders (จบ ${completedN} · ค้าง ${pendingN}) · TAT ${avgTAT}m (P90 ${p90TAT}) · SLA ${tatSla}% · Critical ${criticalValuesCount}`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Orders Today', value: fmt(totalOrders), sub: `จบ ${completedN} · ค้าง ${pendingN}`, color: '#0ea5e9' },
      { label: '🚨 Critical Values', value: fmt(criticalValuesCount), sub: criticalValuesCount > 0 ? 'ต้องแจ้งแพทย์' : 'ไม่มี', color: criticalValuesCount >= 10 ? '#f43f5e' : criticalValuesCount >= 5 ? '#f59e0b' : criticalValuesCount > 0 ? '#f59e0b' : '#10b981' },
      { label: 'Avg TAT', value: `${avgTAT}m`, sub: `P90: ${p90TAT}m`, color: barLow(avgTAT, 60, 120) },
      { label: 'TAT SLA', value: `${tatSla}%`, sub: '≤60m', color: bar(tatSla, 85, 70) },
      { label: 'Completion', value: `${completion.toFixed(0)}%`, sub: completion >= 90 ? 'ดี' : 'ต้องปรับ', color: bar(completion, 90, 75) },
      { label: 'LPI Score', value: `${lpi}/100`, sub: lpi >= 80 ? 'ดี' : lpi >= 60 ? 'ปานกลาง' : 'ต่ำ', color: bar(lpi, 80, 60) },
    ],
    sections: [
      { icon: '⏱️', title: 'Turnaround Time & SLA', text: `Avg TAT ${avgTAT}m · P90 ${p90TAT}m · SLA ${tatSla}% (≤60m). ${p90TAT >= 180 ? '🔴 Tail ยาวมาก — instrument downtime หรือ batch processing' : avgTAT <= 60 && tatSla >= 85 ? '✅ Fast TAT · impact clinical rapid' : 'TAT กระทบ Clinical Decision — เพิ่ม STAT lane · ตรวจ Pre-analytical delays'}`, color: p90TAT >= 180 ? '#f43f5e' : barLow(p90TAT, 120, 180) },
      { icon: '🚨', title: 'Critical Values & Safety', text: `Critical Values วันนี้ ${criticalValuesCount} ราย · Unique Patients ${uniquePt} · Abnormal Rate ${abnormal.toFixed(1)}%. ${criticalValuesCount >= 10 ? '🔴 Critical values สูงมาก — ยืนยันว่าแพทย์เจ้าของไข้ได้รับแจ้งครบทุกราย (WHO Critical Value Protocol)' : criticalValuesCount > 0 ? '⚠ ต้องแจ้งแพทย์ทุกราย + บันทึก Closed-loop communication' : '✅ ไม่มี Critical Values'}`, color: criticalValuesCount >= 10 ? '#f43f5e' : criticalValuesCount > 0 ? '#f59e0b' : '#10b981' },
      { icon: '🔬', title: 'Throughput & Completion', text: `${fmt(totalOrders)} orders · จบ ${completedN} · ค้าง ${pendingN} (Completion ${completion.toFixed(1)}%) · LPI ${lpi}/100. ${pendingN > 150 ? '⚠ Pending สูง — backlog risk · เพิ่มคน/เปิด STAT queue' : completion < 70 ? 'Completion ต่ำ — ตรวจ LIS Interface + Sample rejection' : '✅ Throughput ดี'}`, color: pendingN > 150 || completion < 70 ? '#f59e0b' : '#10b981' },
    ],
  };
}

// ─── X-Ray ───────────────────────────────────────────────────
export function buildXRAYQuickSummary(s) {
  const t = s?.xrayToday;
  const a = s?.xrayAnalytics;
  if (!t && !a) return null;
  const totalReq = nn(t?.total_requests ?? t?.total);
  const completed = nn(t?.completed);
  const waiting = nn(t?.waiting);
  const completionRate = totalReq > 0 ? (completed / totalReq) * 100 : 0;
  const avgWait = nn(t?.avg_wait_time ?? a?.avg_wait_time);
  const p90Wait = nn(a?.p90_wait_time);
  const waitSla = nn(a?.wait_sla_pct);
  const avgTAT = nn(t?.avg_tat ?? a?.avg_tat);
  const revPerVisit = nn(a?.avg_revenue_per_visit);
  const rpi = nn(a?.rpi);

  let headline, hlColor;
  if (p90Wait >= 300 || rpi < 50) {
    headline = `🔴 X-Ray วิกฤต — P90 Wait ${p90Wait} นาที · Wait SLA ${waitSla}% · RPI ${rpi}/100 · peak-hour bottleneck`;
    hlColor = '#f43f5e';
  } else if (avgWait >= 60 || completionRate < 75 || waitSla < 70) {
    headline = `⚠ X-Ray Queue สะสม — Avg Wait ${avgWait}m · P90 ${p90Wait}m · Completion ${completionRate.toFixed(0)}% · SLA ${waitSla}%`;
    hlColor = '#f59e0b';
  } else if (completionRate >= 90 && avgWait <= 30 && p90Wait < 60) {
    headline = `✅ Radiology Flow ดี — ${fmt(totalReq)} requests · Wait ${avgWait}m (P90 ${p90Wait}m) · SLA ${waitSla}%`;
    hlColor = '#10b981';
  } else {
    headline = `X-Ray: ${fmt(totalReq)} requests · Completion ${completionRate.toFixed(0)}% · Wait ${avgWait}m (P90 ${p90Wait}m) · SLA ${waitSla}%`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Requests', value: fmt(totalReq), sub: `จบ ${completed} · รอ ${waiting}`, color: '#06b6d4' },
      { label: 'Completion', value: `${completionRate.toFixed(0)}%`, sub: completionRate >= 90 ? 'ดี' : 'ต้องปรับ', color: bar(completionRate, 90, 75) },
      { label: 'Avg Wait', value: `${avgWait} นาที`, sub: 'Queue avg', color: barLow(avgWait, 30, 60) },
      { label: 'P90 Wait', value: `${p90Wait} นาที`, sub: p90Wait >= 300 ? 'วิกฤต' : p90Wait >= 60 ? 'เฝ้าระวัง' : 'ดี', color: p90Wait >= 300 ? '#f43f5e' : p90Wait >= 60 ? '#f59e0b' : '#10b981' },
      { label: 'Wait SLA', value: `${waitSla}%`, sub: '≤30 นาที', color: bar(waitSla, 85, 70) },
      { label: 'Revenue/Visit', value: `฿${fmt(Math.round(revPerVisit))}`, sub: rpi > 0 ? `RPI ${rpi}/100` : 'Per case', color: rpi >= 75 ? '#10b981' : rpi >= 50 ? '#f59e0b' : rpi > 0 ? '#f43f5e' : '#7c3aed' },
    ],
    sections: [
      { icon: '🩻', title: 'Radiology Throughput & Wait', text: `${fmt(totalReq)} requests · จบ ${completed} · รอ ${waiting} (Completion ${completionRate.toFixed(0)}%) · Avg Wait ${avgWait}m · P90 ${p90Wait}m · SLA ${waitSla}%. ${p90Wait >= 300 ? '🔴 P90 Wait สูงผิดปกติ — bottleneck ที่ peak hours (08:00)' : completionRate < 75 ? '⚠ Backlog accumulating — staff or equipment issue' : '✅ Throughput ดี'}`, color: p90Wait >= 300 ? '#f43f5e' : bar(completionRate, 90, 75) },
      { icon: '💰', title: 'Service Mix & Value', text: `Revenue/Visit ฿${fmt(Math.round(revPerVisit))} ${revPerVisit >= 2000 ? '(Service mix ดี — CT/Advanced imaging สัดส่วนสูง)' : revPerVisit >= 500 ? '(Mix ปกติ — Plain Film + CT)' : '(Mix เน้น Plain Film)'} ${rpi > 0 ? `· RPI ${rpi}/100 ${rpi >= 75 ? 'ยอดเยี่ยม' : rpi >= 50 ? 'ปานกลาง' : 'ต้องปรับ — ดู lowest component'}` : ''}`, color: '#7c3aed' },
    ],
  };
}

// ─── Dental ──────────────────────────────────────────────────
export function buildDentalQuickSummary(s) {
  const t = s?.dentalToday;
  const a = s?.dentalAnalytics;
  if (!t && !a) return null;
  const total = nn(t?.total);
  const completedN = nn(t?.completed);
  const completionRate = a?.completion_rate != null ? nn(a.completion_rate)
    : (total > 0 ? Math.round((completedN / total) * 100) : 0);
  const avgWait = nn(t?.avg_wait_time ?? a?.avg_wait_time);
  const p90Wait = nn(a?.p90_wait_time);
  const revPerVisit = nn(a?.avg_revenue_per_visit);

  let headline, hlColor;
  if (avgWait >= 45 || completionRate < 70) {
    headline = `⚠ คลินิกทันตกรรม ต้อง attention — Wait ${avgWait} นาที · Completion ${completionRate.toFixed(0)}%`;
    hlColor = '#f59e0b';
  } else if (completionRate >= 85 && avgWait <= 20) {
    headline = `✅ ทันตกรรม Flow ดี — ${fmt(total)} เคส · Wait ${avgWait} นาที · Completion ${completionRate.toFixed(0)}%`;
    hlColor = '#10b981';
  } else {
    headline = `Dental วันนี้: ${fmt(total)} เคส · Wait ${avgWait} นาที · Completion ${completionRate.toFixed(0)}%`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Cases Today', value: fmt(total), sub: 'Total appointments', color: '#f59e0b' },
      { label: 'Completion', value: `${completionRate.toFixed(0)}%`, sub: 'Attended rate', color: bar(completionRate, 85, 70) },
      { label: 'Avg Wait', value: `${avgWait} นาที`, sub: `P90: ${p90Wait}`, color: barLow(avgWait, 20, 45) },
      { label: 'Revenue/Visit', value: `฿${fmt(Math.round(revPerVisit))}`, sub: 'Avg', color: '#7c3aed' },
    ],
    sections: [
      { icon: '🦷', title: 'Dental Clinic Flow', text: `${fmt(total)} เคส · Wait ${avgWait} นาที (P90 ${p90Wait}) · Completion ${completionRate.toFixed(0)}%. ${completionRate < 70 ? 'No-show rate สูง · ส่ง reminder เพิ่ม' : 'Schedule efficiency ดี'}`, color: bar(completionRate, 85, 70) },
    ],
  };
}

// ─── ThaiMed (TTM) ───────────────────────────────────────────
export function buildThaiMedQuickSummary(s) {
  const t = s?.ttmToday;
  const a = s?.ttmAnalytics;
  if (!t && !a) return null;
  const totalToday = nn(t?.total);
  const completedToday = nn(t?.completed);
  const waiting = nn(t?.waiting);
  const avgDaily = nn(a?.avg_daily_visits);
  const avgWait = nn(a?.avg_wait_time);
  const completionRate = nn(a?.completion_rate);
  const revisitRate = nn(a?.revisit_rate);
  const avgRevPerVisit = nn(a?.avg_revenue_per_visit);
  const totalRevenue = nn(a?.total_revenue);
  const tpi = nn(a?.tpi);
  const todayComplete = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  let headline, hlColor;
  if (tpi > 0 && tpi < 50) {
    headline = `🔴 TTM วิกฤต — TPI ${tpi}/100 · Wait ${avgWait}m · Rev/Visit ฿${fmt(avgRevPerVisit)} · Revisit ${revisitRate.toFixed(1)}% · ต้อง intervention ด่วน`;
    hlColor = '#f43f5e';
  } else if (avgWait >= 60 || revisitRate >= 15 || avgRevPerVisit < 300) {
    headline = `⚠ TTM ต้อง attention — Wait ${avgWait}m · Revisit ${revisitRate.toFixed(1)}% · Rev/Visit ฿${fmt(avgRevPerVisit)} · TPI ${tpi}/100`;
    hlColor = '#f59e0b';
  } else if (tpi >= 80 && completionRate >= 95) {
    headline = `✅ แพทย์แผนไทย ประสิทธิภาพดี — TPI ${tpi}/100 · Completion ${completionRate.toFixed(1)}% · Avg daily ${avgDaily.toFixed(0)} visits`;
    hlColor = '#10b981';
  } else {
    headline = `TTM: วันนี้ ${fmt(totalToday)} ราย · Avg daily ${avgDaily.toFixed(0)} · Wait ${avgWait}m · Rev/Visit ฿${fmt(avgRevPerVisit)} · TPI ${tpi}/100`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Today', value: fmt(totalToday), sub: `จบ ${completedToday} (${todayComplete}%) · รอ ${waiting}`, color: '#65a30d' },
      { label: 'Avg Daily', value: fmt(Math.round(avgDaily)), sub: '30d rolling', color: '#84cc16' },
      { label: 'TPI Score', value: `${tpi}/100`, sub: tpi >= 80 ? 'ดีเยี่ยม' : tpi >= 60 ? 'มาตรฐาน' : 'ต้องปรับ', color: bar(tpi, 80, 60) },
      { label: 'Avg Wait', value: `${avgWait}m`, sub: avgWait <= 15 ? 'ดี' : avgWait <= 30 ? 'ปานกลาง' : 'สูง', color: barLow(avgWait, 15, 30) },
      { label: 'Rev / Visit', value: `฿${fmt(avgRevPerVisit)}`, sub: avgRevPerVisit >= 400 ? 'ดี' : avgRevPerVisit >= 300 ? 'ปกติ' : 'ต่ำ', color: bar(avgRevPerVisit, 400, 300) },
      { label: 'Revisit 7d', value: `${revisitRate.toFixed(1)}%`, sub: revisitRate <= 5 ? 'ดี' : revisitRate <= 15 ? 'เฝ้าระวัง' : 'สูง', color: barLow(revisitRate, 5, 15) },
    ],
    sections: [
      { icon: '🌿', title: 'TTM Service Flow', text: `วันนี้ ${fmt(totalToday)} ราย · จบ ${completedToday} (${todayComplete}%) · รอ ${waiting} · Avg daily ${avgDaily.toFixed(1)} visits · Completion ${completionRate.toFixed(1)}%. ${avgWait >= 60 ? '🔴 Wait time สูง — appointment system + เพิ่ม Therapist ช่วง Peak' : avgDaily < 20 ? 'Under-utilized — marketing + cross-referral' : '✅ Flow ปกติ'}`, color: avgWait >= 60 ? '#f43f5e' : avgDaily >= 30 ? '#10b981' : '#f59e0b' },
      { icon: '💰', title: 'Revenue & Service Mix', text: `Rev/Visit ฿${fmt(avgRevPerVisit)} · Revenue 30d ฿${fmt(totalRevenue)}. ${avgRevPerVisit < 300 ? '⚠ ต่ำ — ตรวจ Under-billing (สมุนไพร/น้ำมัน) · จัด Package (นวด+ประคบ+อบ+ยาหม้อ)' : '✅ Mix เหมาะสม'}`, color: avgRevPerVisit >= 400 ? '#10b981' : avgRevPerVisit >= 300 ? '#f59e0b' : '#f43f5e' },
      { icon: '🩹', title: 'Quality & Outcomes', text: `TPI ${tpi}/100 · Completion ${completionRate.toFixed(1)}% · Revisit 7d ${revisitRate.toFixed(1)}%. ${revisitRate >= 15 ? '⚠ Revisit สูง — แยก Planned vs Unplanned · Allergy screening · Post-treatment instruction' : tpi < 50 ? '🔴 TPI ต่ำ — ดู lowest component (Wait/Completion/Revenue/SLA)' : '✅ Outcomes ดี'}`, color: (tpi < 50 || revisitRate >= 15) ? '#f43f5e' : tpi >= 80 ? '#10b981' : '#f59e0b' },
    ],
  };
}

// ─── PhysTherapy ─────────────────────────────────────────────
export function buildPhysTherapyQuickSummary(s) {
  const t = s?.ptToday;
  const a = s?.ptAnalytics;
  if (!t && !a) return null;
  const total = nn(t?.total);
  const completed = nn(t?.completed);
  const waiting = nn(t?.waiting);
  const avgWait = nn(a?.avg_wait_time);
  const completionRate = nn(a?.completion_rate);
  const revisitRate = nn(a?.revisit_rate);
  const avgRevPerVisit = nn(a?.avg_revenue_per_visit);
  const totalRevenue = nn(a?.total_revenue);
  const avgDaily = nn(a?.avg_daily_visits);
  const ppi = nn(a?.ppi);
  const dropoutCount = nn(a?.dropout_count);

  let headline, hlColor;
  if (ppi > 0 && ppi < 50) {
    headline = `🔴 PT วิกฤต — PPI ${ppi}/100 · Wait ${avgWait}m · Revisit ${revisitRate.toFixed(1)}% · ต้อง intervention ด่วน`;
    hlColor = '#f43f5e';
  } else if (avgWait >= 60 || revisitRate >= 15 || completionRate < 80) {
    headline = `⚠ กายภาพบำบัด ต้อง attention — Wait ${avgWait}m · Revisit ${revisitRate.toFixed(1)}% · Completion ${completionRate.toFixed(1)}% · PPI ${ppi}/100`;
    hlColor = '#f59e0b';
  } else if (ppi >= 80 && completionRate >= 95) {
    headline = `✅ PT ประสิทธิภาพดี — PPI ${ppi}/100 · Completion ${completionRate.toFixed(1)}% · ${fmt(total)} sessions วันนี้`;
    hlColor = '#10b981';
  } else {
    headline = `PT: วันนี้ ${fmt(total)} · Avg daily ${avgDaily.toFixed(0)} · Wait ${avgWait}m · Rev/Visit ฿${fmt(avgRevPerVisit)} · PPI ${ppi}/100`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Today', value: fmt(total), sub: `จบ ${completed} · รอ ${waiting}`, color: '#e11d48' },
      { label: 'Avg Daily', value: fmt(Math.round(avgDaily)), sub: '30d rolling', color: '#f43f5e' },
      { label: 'PPI Score', value: `${ppi}/100`, sub: ppi >= 80 ? 'ดีเยี่ยม' : ppi >= 60 ? 'มาตรฐาน' : 'ต้องปรับ', color: bar(ppi, 80, 60) },
      { label: 'Avg Wait', value: `${avgWait}m`, sub: avgWait <= 15 ? 'ดี' : avgWait <= 30 ? 'ปกติ' : 'สูง', color: barLow(avgWait, 15, 30) },
      { label: 'Rev / Visit', value: `฿${fmt(avgRevPerVisit)}`, sub: avgRevPerVisit >= 700 ? 'ดี' : avgRevPerVisit >= 400 ? 'ปกติ' : 'ต่ำ', color: bar(avgRevPerVisit, 700, 400) },
      { label: 'Completion', value: `${completionRate.toFixed(1)}%`, sub: `Dropout ${dropoutCount}`, color: bar(completionRate, 95, 85) },
    ],
    sections: [
      { icon: '🏋️', title: 'PT Session Flow', text: `วันนี้ ${fmt(total)} · จบ ${completed} · รอ ${waiting} · Avg daily ${avgDaily.toFixed(1)} sessions · Completion ${completionRate.toFixed(1)}% (Dropout ${dropoutCount}). ${avgWait >= 60 ? '🔴 Wait สูง — Appointment + Buffer time + เพิ่ม Physio ช่วง Peak (08:00)' : '✅ Flow ปกติ'}`, color: avgWait >= 60 ? '#f43f5e' : '#10b981' },
      { icon: '💰', title: 'Revenue & Mix', text: `Rev/Visit ฿${fmt(avgRevPerVisit)} · Revenue 30d ฿${fmt(totalRevenue)}. ${avgRevPerVisit < 400 ? '⚠ ต่ำ — ตรวจ Billing completeness' : avgRevPerVisit >= 700 ? '✅ Service mix ดี (Sports PT/Advanced modality)' : 'Mix ปกติ'} · โอกาส: Rehab packages · Hydrotherapy · Sports medicine`, color: avgRevPerVisit >= 700 ? '#10b981' : avgRevPerVisit >= 400 ? '#f59e0b' : '#f43f5e' },
      { icon: '🔄', title: 'Quality & Outcomes', text: `PPI ${ppi}/100 · Completion ${completionRate.toFixed(1)}% · Revisit 7d ${revisitRate.toFixed(1)}%. ${revisitRate >= 15 ? 'Revisit สูง — แยก Planned PT vs Unplanned (pain/complication) · audit graded exercise progression' : ppi < 50 ? '🔴 PPI ต่ำ — ดู lowest component (Wait/SLA)' : '✅ Outcomes ดี — รักษามาตรฐาน + Outcome measurement (ROM/Pain score)'}`, color: (ppi < 50 || revisitRate >= 15) ? '#f43f5e' : ppi >= 80 ? '#10b981' : '#f59e0b' },
    ],
  };
}

// ─── Quality (HA) ────────────────────────────────────────────
export function buildQualityQuickSummary(s) {
  const t = s?.qualityToday;
  const a = s?.qualityAnalytics;
  if (!t && !a) return null;
  const qpi = nn(a?.qpi_score);
  const readmRate = nn(a?.readmit_rate ?? a?.readmission_rate);
  const mortRate = nn(a?.mortality_rate);
  const haiRate = nn(a?.hai_rate);
  const dischargePlan = nn(a?.dch_plan_rate ?? a?.discharge_planning ?? a?.discharge_before_noon_pct);
  const docCompleteness = nn(a?.doc_completeness);
  const amaRate = nn(a?.ama_rate);

  let headline, hlColor;
  if (qpi < 70) {
    headline = `🔴 Quality Score ต่ำ (${qpi}/100) — ทบทวน HA standards · prepare for re-accreditation`;
    hlColor = '#f43f5e';
  } else if (mortRate >= 3 || haiRate >= 5) {
    headline = `⚠ Quality Risk — Mortality ${mortRate.toFixed(2)}% · HAI ${haiRate.toFixed(1)}% · ต้อง Quality Huddle`;
    hlColor = '#f59e0b';
  } else if (qpi >= 85) {
    headline = `✅ Quality Performance ยอดเยี่ยม — QPI ${qpi}/100 · HAI ${haiRate.toFixed(1)}% · Readmit ${readmRate.toFixed(1)}%`;
    hlColor = '#10b981';
  } else {
    headline = `Quality: QPI ${qpi}/100 · Readmit ${readmRate.toFixed(1)}% · Mortality ${mortRate.toFixed(2)}% · HAI ${haiRate.toFixed(1)}%`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'QPI Score', value: `${qpi}/100`, sub: qpi >= 85 ? 'ยอดเยี่ยม' : qpi >= 70 ? 'ดี' : 'ต่ำ', color: bar(qpi, 85, 70) },
      { label: 'Readmit Rate', value: `${readmRate.toFixed(1)}%`, sub: 'HA <5%', color: barLow(readmRate, 5, 10) },
      { label: 'Mortality', value: `${mortRate.toFixed(2)}%`, sub: 'HA <2%', color: barLow(mortRate, 2, 3) },
      { label: 'HAI Rate', value: `${haiRate.toFixed(2)}%`, sub: 'IC <1%', color: barLow(haiRate, 1, 2) },
      { label: 'Discharge Plan', value: `${dischargePlan.toFixed(1)}%`, sub: '>95%', color: bar(dischargePlan, 95, 80) },
      { label: 'Doc Complete', value: `${docCompleteness.toFixed(1)}%`, sub: 'IM Domain', color: bar(docCompleteness, 90, 70) },
    ],
    sections: [
      { icon: '⭐', title: 'HA Accreditation Pulse', text: `QPI ${qpi}/100 · 5 Domain composite (PCT · IC · MED · ENV · IM). ${qpi >= 85 ? '✅ พร้อม re-accreditation' : qpi >= 70 ? 'ต้องปรับบางจุด · เน้น domain ที่ต่ำสุด' : '🔴 ต้อง intervention plan · Case Conference + M&M + IC Round'}`, color: bar(qpi, 85, 70) },
      { icon: '🛡️', title: 'Patient Safety Indicators', text: `Mortality ${mortRate.toFixed(2)}% (HA <2%) · HAI ${haiRate.toFixed(2)}% (IC <1%) · Readmit ${readmRate.toFixed(1)}% (HA <5%) · AMA ${amaRate.toFixed(2)}%. ${(mortRate >= 3 || haiRate >= 1 || readmRate >= 5) ? '⚠ ตัวชี้วัดเกินเกณฑ์ HA — เร่ง M&M Conference + IC Review + Readmission Prevention' : '✅ Safety indicators ดี'}`, color: (mortRate >= 3 || haiRate >= 1 || readmRate >= 5) ? '#f43f5e' : '#10b981' },
      { icon: '📋', title: 'Compliance & Documentation', text: `Discharge Planning ${dischargePlan.toFixed(1)}% · Documentation ${docCompleteness.toFixed(1)}% · AMA ${amaRate.toFixed(2)}%. ${docCompleteness < 70 ? '🔴 Documentation ต่ำ — กระทบ audit/claim · ฝึก Coder + checklist' : dischargePlan < 95 ? 'Dch Plan ต่ำกว่าเกณฑ์ — ใช้ checklist ก่อนจำหน่าย' : '✅ Compliance ดี'}`, color: docCompleteness < 70 ? '#f43f5e' : (dischargePlan < 95 ? '#f59e0b' : '#10b981') },
    ],
  };
}

// ─── Finance (RCM) ───────────────────────────────────────────
export function buildFinanceQuickSummary(s) {
  const summary = s?.financeSummary?.summary;
  const metrics = s?.financeAnalytics?.metrics;
  const d = s?.denialAnalytics;
  const leak = s?.drgLeakage;
  if (!summary && !metrics) return null;
  // Prefer finAnalytics.metrics (MTD/YTD) — falls back to financeSummary.summary
  const revenueMtd = nn(metrics?.mtd_revenue ?? metrics?.revenue_this_month ?? metrics?.cur_month_revenue);
  const revenueYtd = nn(metrics?.ytd_revenue ?? summary?.total_revenue);
  const revenue = revenueMtd > 0 ? revenueMtd : revenueYtd;
  const yoyGrowth = nn(metrics?.yoy_growth_pct ?? summary?.yoy_growth);
  const momGrowth = nn(metrics?.growth_pct_prorata ?? metrics?.growth_pct);
  // FFS Collection = TRUE collection rate (excludes Capitation 100% Outstanding by design)
  // Fall back to overall if backend doesn't provide FFS split
  const ffsCollection = nn(metrics?.ffs_collection_rate ?? metrics?.collection_rate);
  const overallCollection = nn(metrics?.collection_rate);
  // Outstanding Rate = unpaid FFS visits (previously mislabeled as "Denial Rate")
  const outstandingRate = nn(metrics?.denial_rate ?? d?.denial_rate);
  const unpaidVisits = nn(metrics?.unpaid_visits ?? d?.total_denied);
  const daysAR = nn(metrics?.days_in_ar);
  const drgLeakage = nn(leak?.total_estimated_loss ?? leak?.estimated_loss);
  const profitMargin = nn(metrics?.profit_margin ?? summary?.profit_margin);

  let headline, hlColor;
  if (outstandingRate >= 7 || ffsCollection < 80) {
    headline = `🔴 FFS Collection ต่ำ — จัดเก็บ FFS ${ffsCollection.toFixed(1)}% · ค้างบันทึก ${outstandingRate.toFixed(1)}% (${unpaidVisits} เคส) · ต้อง RCM audit`;
    hlColor = '#f43f5e';
  } else if (daysAR > 90) {
    headline = `🔴 A/R ${daysAR} วัน (เป้า ≤ 45) — เร่ง Aging Review + e-Claim Reconciliation`;
    hlColor = '#f43f5e';
  } else if (yoyGrowth < -5 || daysAR > 60) {
    headline = `⚠ Financial Pressure — Revenue ${yoyGrowth >= 0 ? '+' : ''}${yoyGrowth.toFixed(1)}% · AR Days ${daysAR}`;
    hlColor = '#f59e0b';
  } else if (ffsCollection >= 90 && yoyGrowth >= 5) {
    headline = `✅ การเงินแข็งแรง — Revenue +${yoyGrowth.toFixed(1)}% · FFS Collection ${ffsCollection.toFixed(1)}% · Margin ${profitMargin.toFixed(1)}%`;
    hlColor = '#10b981';
  } else {
    headline = `Finance: Revenue ฿${fmt(Math.round(revenue / 1e6))}M (${yoyGrowth >= 0 ? '+' : ''}${yoyGrowth.toFixed(1)}%) · FFS Collection ${ffsCollection.toFixed(1)}% · A/R ${daysAR}d`;
    hlColor = '#0ea5e9';
  }

  return {
    headline, headlineColor: hlColor,
    kpi: [
      { label: 'Revenue YTD', value: `฿${fmt(Math.round(revenueYtd / 1e6))}M`, sub: `${yoyGrowth >= 0 ? '+' : ''}${yoyGrowth.toFixed(1)}% YoY · MoM ${momGrowth >= 0 ? '+' : ''}${momGrowth.toFixed(1)}%`, color: yoyGrowth >= 5 ? '#10b981' : yoyGrowth >= 0 ? '#0ea5e9' : '#f43f5e' },
      { label: 'Revenue MTD', value: `฿${fmt(Math.round(revenueMtd / 1e6))}M`, sub: 'เดือนนี้', color: '#0ea5e9' },
      { label: 'FFS Collection', value: `${ffsCollection.toFixed(1)}%`, sub: `FFS เท่านั้น · รวม ${overallCollection.toFixed(1)}%`, color: bar(ffsCollection, 90, 80) },
      { label: 'FFS Outstanding', value: `${outstandingRate.toFixed(1)}%`, sub: `${unpaidVisits} เคส ค้างบันทึก (ไม่ใช่ Denial)`, color: barLow(outstandingRate, 3, 5) },
      { label: 'A/R Days', value: `${daysAR}`, sub: daysAR <= 45 ? '✅ อยู่ในเกณฑ์' : daysAR <= 60 ? '⚠ เฝ้าระวัง' : '🔴 เกินเกณฑ์ เร่ง Follow-up', color: barLow(daysAR, 45, 60) },
      { label: 'DRG Leakage', value: `฿${fmt(Math.round(drgLeakage / 1000))}K`, sub: 'Potential loss', color: drgLeakage >= 500000 ? '#f43f5e' : '#f59e0b' },
      { label: 'Profit Margin', value: `${profitMargin.toFixed(1)}%`, sub: profitMargin >= 15 ? 'ดี' : profitMargin >= 5 ? 'พอใช้' : 'บาง', color: bar(profitMargin, 15, 5) },
    ],
    sections: [
      { icon: '💰', title: 'Revenue Cycle Health (FFS-focused)',
        text: `YTD Revenue ฿${fmt(Math.round(revenueYtd))} (${yoyGrowth >= 0 ? '+' : ''}${yoyGrowth.toFixed(1)}% YoY) · MTD ฿${fmt(Math.round(revenueMtd))} (${momGrowth >= 0 ? '+' : ''}${momGrowth.toFixed(1)}% MoM Pro-rata) · FFS Collection ${ffsCollection.toFixed(1)}% (รวม ${overallCollection.toFixed(1)}%) · Outstanding ${outstandingRate.toFixed(1)}% (${unpaidVisits} เคส). ${(outstandingRate >= 7 || ffsCollection < 80) ? '🔴 ต้องทำ RCM audit ด่วนสำหรับ FFS' : ffsCollection >= 90 ? '✅ FFS Revenue Cycle ทำงานดี' : 'FFS มีพื้นที่ปรับปรุง'}`,
        color: ffsCollection >= 90 && outstandingRate <= 5 ? '#10b981' : '#f59e0b' },
      { icon: '⏳', title: 'A/R & Cash Flow',
        text: `A/R Days ${daysAR} วัน (เป้า ≤ 45). ${daysAR > 90 ? '🔴 A/R ค้างเกิน 90 วัน — เร่ง Aging Review + e-Claim Reconciliation ด่วน' : daysAR > 60 ? '⚠ A/R ค้าง 60–90 วัน — ติดตาม Gov เบิกจ่ายตรง' : daysAR > 45 ? '🟡 A/R เฝ้าระวัง — ทบทวน Billing Cycle' : '✅ Cash Flow หมุนเวียนปกติ'}`,
        color: daysAR > 90 ? '#f43f5e' : daysAR > 60 ? '#f59e0b' : '#10b981' },
      { icon: '🔍', title: 'DRG Leakage & Coding',
        text: `DRG Leakage ประมาณ ฿${fmt(Math.round(drgLeakage))}${drgLeakage >= 200000 ? ' — แนะนำ Coding Audit (ICD-10 Secondary Dx, CC/MCC)' : ' — อยู่ในเกณฑ์ยอมรับได้'}`,
        color: drgLeakage >= 500000 ? '#f43f5e' : drgLeakage >= 200000 ? '#f59e0b' : '#10b981' },
      { icon: '📊', title: 'Profitability',
        text: `Profit Margin ${profitMargin.toFixed(1)}% · Revenue YTD ฿${fmt(Math.round(revenueYtd))}. ${profitMargin >= 15 ? '✅ กำไรดี' : profitMargin >= 5 ? 'กำไรพอใช้ — ตรวจสอบต้นทุน' : profitMargin > 0 ? '⚠ Margin บาง — ทบทวนโครงสร้างต้นทุน' : '🔴 ขาดทุน — ต้อง restructuring ด่วน'}`,
        color: profitMargin >= 15 ? '#10b981' : profitMargin >= 5 ? '#f59e0b' : '#f43f5e' },
    ],
  };
}
