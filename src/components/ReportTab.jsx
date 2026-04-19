// ============================================================
// BCH 360° Intelligence V.10 — Report Tab
// รายงานจำนวนผู้ป่วยในเปรียบเทียบปีงบประมาณ
// ============================================================
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

const FISCAL_MONTHS = [
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
];

function fmt(v, d = 0) {
  if (v == null || v === '' || isNaN(v)) return '—';
  return Number(v).toLocaleString('th-TH', { minimumFractionDigits: d, maximumFractionDigits: d });
}

// ─────────────────────────────────────────────────────────────
// AI Executive Narrative Builder — OPD Resource (Lab/Drug/CT-Xray)
// Deterministic rule-based qualitative analysis for executives
// ─────────────────────────────────────────────────────────────
function buildOpdResourceNarrative(data, fy1, fy2) {
  if (!data?.comparison || !data.fy1_totals || !data.fy2_totals) return null;
  const t1 = data.fy1_totals;
  const t2 = data.fy2_totals;
  const comparableMonths = data.comparable_months || 0;
  if (comparableMonths === 0) {
    return {
      headline: `ยังไม่มีเดือนที่เทียบได้ระหว่างปีงบ ${fy1} กับ ${fy2} — ระบบจะวิเคราะห์ได้เมื่อมีข้อมูลครบอย่างน้อย 1 เดือนของทั้งสองปี`,
      empty: true,
    };
  }

  const t1TotOrd = t1.lab_orders + t1.drug_orders + t1.xray_orders;
  const t1TotPx  = t1.lab_price  + t1.drug_price  + t1.xray_price;
  const t2TotOrd = t2.lab_orders + t2.drug_orders + t2.xray_orders;
  const t2TotPx  = t2.lab_price  + t2.drug_price  + t2.xray_price;

  const ordGrowth = Number(data.overall_orders_growth_pct ?? 0);
  const pxGrowth  = Number(data.overall_price_growth_pct ?? 0);

  const pct = (a, b) => (b > 0 ? Math.round(((a - b) / b) * 100) : a > 0 ? 100 : 0);
  const cat = {
    Lab:  { ord: pct(t2.lab_orders,  t1.lab_orders),  px: pct(t2.lab_price,  t1.lab_price)  },
    Drug: { ord: pct(t2.drug_orders, t1.drug_orders), px: pct(t2.drug_price, t1.drug_price) },
    Xray: { ord: pct(t2.xray_orders, t1.xray_orders), px: pct(t2.xray_price, t1.xray_price) },
  };

  const unit = {
    Lab:  { f1: t1.lab_orders  ? t1.lab_price  / t1.lab_orders  : 0, f2: t2.lab_orders  ? t2.lab_price  / t2.lab_orders  : 0 },
    Drug: { f1: t1.drug_orders ? t1.drug_price / t1.drug_orders : 0, f2: t2.drug_orders ? t2.drug_price / t2.drug_orders : 0 },
    Xray: { f1: t1.xray_orders ? t1.xray_price / t1.xray_orders : 0, f2: t2.xray_orders ? t2.xray_price / t2.xray_orders : 0 },
  };
  const unitDelta = (u) => (u.f1 > 0 ? Math.round(((u.f2 - u.f1) / u.f1) * 100) : 0);

  const shareFY1 = {
    lab:  t1TotPx > 0 ? (t1.lab_price  / t1TotPx) * 100 : 0,
    drug: t1TotPx > 0 ? (t1.drug_price / t1TotPx) * 100 : 0,
    xray: t1TotPx > 0 ? (t1.xray_price / t1TotPx) * 100 : 0,
  };
  const shareFY2 = {
    lab:  t2TotPx > 0 ? (t2.lab_price  / t2TotPx) * 100 : 0,
    drug: t2TotPx > 0 ? (t2.drug_price / t2TotPx) * 100 : 0,
    xray: t2TotPx > 0 ? (t2.xray_price / t2TotPx) * 100 : 0,
  };

  const topByValueGrowth =
    cat.Drug.px >= cat.Lab.px && cat.Drug.px >= cat.Xray.px ? { name: 'Drug (ยา)', g: cat.Drug.px } :
    cat.Lab.px  >= cat.Xray.px ? { name: 'Lab (ห้องปฏิบัติการ)', g: cat.Lab.px } :
                                 { name: 'CT / X-ray (รังสีวินิจฉัย)', g: cat.Xray.px };
  const weakByValueGrowth =
    cat.Drug.px <= cat.Lab.px && cat.Drug.px <= cat.Xray.px ? { name: 'Drug (ยา)', g: cat.Drug.px } :
    cat.Lab.px  <= cat.Xray.px ? { name: 'Lab (ห้องปฏิบัติการ)', g: cat.Lab.px } :
                                 { name: 'CT / X-ray (รังสีวินิจฉัย)', g: cat.Xray.px };

  // Seasonality — peak/dip month (by total orders)
  const comp = data.comparison.filter(c => c.fy1.has_data && c.fy2.has_data);
  let peakMonth = null, dipMonth = null, peakG = -Infinity, dipG = Infinity;
  for (const c of comp) {
    const a = c.fy1.lab_orders + c.fy1.drug_orders + c.fy1.xray_orders;
    const b = c.fy2.lab_orders + c.fy2.drug_orders + c.fy2.xray_orders;
    if (a === 0) continue;
    const g = ((b - a) / a) * 100;
    if (g > peakG) { peakG = g; peakMonth = c.month; }
    if (g < dipG)  { dipG  = g; dipMonth  = c.month; }
  }

  // Headline
  let headline;
  const gap = pxGrowth - ordGrowth;
  if (pxGrowth >= 10 && ordGrowth >= 10) {
    headline = `ทรัพยากร OPD ปีงบ ${fy2} ขยายตัวแข็งแรง — รายได้ +${pxGrowth}% จากปริมาณ +${ordGrowth}% (เทียบ ${comparableMonths} เดือน) สะท้อนการเติบโตทั้งเชิงปริมาณและคุณภาพพร้อมกัน`;
  } else if (pxGrowth >= 5 && gap >= 5) {
    headline = `รายได้ทรัพยากร OPD +${pxGrowth}% สูงกว่าการเติบโตปริมาณ (${ordGrowth}%) — Case Complexity / Acuity สูงขึ้น หรือ Unit Price ถูกปรับ ควรตรวจสอบว่าเป็นการเติบโตที่ยั่งยืนหรือชั่วคราว`;
  } else if (ordGrowth > 5 && pxGrowth < 0) {
    headline = `สัญญาณ Margin Compression — ปริมาณเพิ่ม +${ordGrowth}% แต่รายได้ลด ${pxGrowth}% บ่งชี้ราคาต่อครั้งถูกกดดัน ควรเร่งทบทวน Price List และ Formulary`;
  } else if (pxGrowth <= -5 && ordGrowth <= 0) {
    headline = `ทรัพยากร OPD หดตัวทั้งสองมิติ — ปริมาณ ${ordGrowth}% และรายได้ ${pxGrowth}% ต้องสอบสวน Root Cause (ผู้ป่วยลด, Referral Leakage, ขาดแคลนยา/รีเอเจนต์, Service Mix เปลี่ยน)`;
  } else {
    headline = `ภาพรวมทรัพยากร OPD ${pxGrowth >= 0 ? 'เติบโต' : 'หดตัว'} ${Math.abs(pxGrowth)}% เชิงมูลค่า · ปริมาณ ${ordGrowth >= 0 ? '+' : ''}${ordGrowth}% · ช่วงที่เทียบได้ ${comparableMonths} เดือน`;
  }

  // Narrative sections
  const trendAnalysis =
    `ปีงบ ${fy2} มีคำสั่งใช้ทรัพยากรรวม ${fmt(t2TotOrd)} ครั้ง (เทียบปีงบ ${fy1}: ${fmt(t1TotOrd)} ครั้ง) ` +
    `เปลี่ยนแปลง ${ordGrowth >= 0 ? '+' : ''}${ordGrowth}% ส่วนมูลค่ารวม ${fmt(t2TotPx)} บาท (ปีงบ ${fy1}: ${fmt(t1TotPx)} บาท) ` +
    `เปลี่ยนแปลง ${pxGrowth >= 0 ? '+' : ''}${pxGrowth}% — ` +
    (pxGrowth > ordGrowth + 2
      ? 'Yield ต่อคำสั่งสูงขึ้น สะท้อน Case Mix ซับซ้อนหรือการปรับอัตราค่าบริการ'
      : pxGrowth < ordGrowth - 2
        ? 'Yield ต่อคำสั่งต่ำลง อาจเกิดจาก Generic Substitution, การปรับราคาลง หรือ Case Mix อ่อนลง'
        : 'Yield ต่อคำสั่งค่อนข้างคงที่ การเติบโตสมดุลระหว่างปริมาณและมูลค่า');

  const mixInsight =
    `โครงสร้างรายได้ปีงบ ${fy2}: Drug ${shareFY2.drug.toFixed(1)}% · Lab ${shareFY2.lab.toFixed(1)}% · CT/X-ray ${shareFY2.xray.toFixed(1)}% ` +
    `(ปีงบ ${fy1}: Drug ${shareFY1.drug.toFixed(1)}% · Lab ${shareFY1.lab.toFixed(1)}% · CT/X-ray ${shareFY1.xray.toFixed(1)}%). ` +
    `หมวดที่เป็น Growth Driver หลักคือ ${topByValueGrowth.name} (+${topByValueGrowth.g}%) ` +
    `ขณะที่หมวดอ่อนแรงที่สุดคือ ${weakByValueGrowth.name} (${weakByValueGrowth.g >= 0 ? '+' : ''}${weakByValueGrowth.g}%) — ` +
    (Math.abs(shareFY2.drug - shareFY1.drug) >= 3
      ? `สัดส่วน Drug ${shareFY2.drug > shareFY1.drug ? 'ขยับขึ้น' : 'ลดลง'} ${Math.abs(shareFY2.drug - shareFY1.drug).toFixed(1)} จุด บ่งชี้พฤติกรรมการสั่งใช้เปลี่ยนไป`
      : 'โครงสร้าง Portfolio ค่อนข้างคงที่');

  const unitEcon =
    `ค่าเฉลี่ยต่อครั้ง ปีงบ ${fy2}: ` +
    `Lab ฿${fmt(Math.round(unit.Lab.f2))}/ครั้ง (${unitDelta(unit.Lab)  >= 0 ? '↑' : '↓'}${Math.abs(unitDelta(unit.Lab))}%) · ` +
    `Drug ฿${fmt(Math.round(unit.Drug.f2))}/ครั้ง (${unitDelta(unit.Drug) >= 0 ? '↑' : '↓'}${Math.abs(unitDelta(unit.Drug))}%) · ` +
    `CT/X-ray ฿${fmt(Math.round(unit.Xray.f2))}/ครั้ง (${unitDelta(unit.Xray) >= 0 ? '↑' : '↓'}${Math.abs(unitDelta(unit.Xray))}%) — ` +
    'ตัวเลขนี้สะท้อน Case Complexity และต้นทุนจริงต่อการให้บริการ ช่วยผู้บริหารเปรียบเทียบ Benchmark ระหว่างคลินิกและวางแผน Cost Control';

  const seasonalInsight = peakMonth
    ? `เดือนที่เติบโตสูงสุด: ${peakMonth} (${peakG >= 0 ? '+' : ''}${Math.round(peakG)}%) · เดือนที่อ่อนแรงสุด: ${dipMonth} (${dipG >= 0 ? '+' : ''}${Math.round(dipG)}%) — ` +
      'ช่องว่างระหว่างพีคและดิปบ่งชี้โอกาสในการวางแผน Staffing, Stock Level และ Service Capacity เชิง Seasonality'
    : 'ข้อมูลรายเดือนยังไม่เพียงพอสำหรับการวิเคราะห์ Seasonality';

  // Risks
  const risks = [];
  if (ordGrowth > 10 && pxGrowth < 0) {
    risks.push(`Margin Compression: ปริมาณ +${ordGrowth}% แต่รายได้ ${pxGrowth}% — ราคาต่อครั้งถูกกดดัน ตรวจสอบ Price List / Discount Policy`);
  }
  if (pxGrowth >= 15 && ordGrowth <= 3) {
    risks.push(`Single-source Growth: รายได้โตจาก Unit Price เป็นหลัก (+${pxGrowth}% vs +${ordGrowth}% volume) — เปราะบางต่อการปรับราคายา/รีเอเจนต์ในปีถัดไป`);
  }
  if (cat.Drug.ord > 20 || cat.Drug.px > 20) {
    risks.push(`Drug Utilization พุ่ง (+${cat.Drug.ord}% orders / +${cat.Drug.px}% value) — ตรวจสอบ Polypharmacy, ความเหมาะสมของการสั่งใช้ และ Formulary Compliance`);
  }
  if (cat.Xray.ord > 15 && cat.Xray.ord > ordGrowth * 1.5 + 5) {
    risks.push(`Imaging โตเร็วกว่าปริมาณผู้ป่วยรวม (+${cat.Xray.ord}% vs ${ordGrowth}%) — ระวัง Defensive Medicine / Over-ordering ควรทบทวน Evidence-based Guideline`);
  }
  if (pxGrowth < -10) {
    risks.push(`รายได้ทรัพยากรหดตัว ${pxGrowth}% — สัญญาณ Referral Leakage, ขาดแคลนยา/รีเอเจนต์ หรือ Service Disruption ต้องสอบสวนด่วน`);
  }
  if (Math.max(shareFY2.drug, shareFY2.lab, shareFY2.xray) > 70) {
    const dom = shareFY2.drug >= shareFY2.lab && shareFY2.drug >= shareFY2.xray ? 'Drug' : shareFY2.lab >= shareFY2.xray ? 'Lab' : 'CT/X-ray';
    risks.push(`Concentration Risk: หมวด ${dom} ครองสัดส่วนรายได้เกิน 70% — การพึ่งพาหมวดเดียวสูง หากเกิด Supply Disruption จะกระทบรายได้รวมทันที`);
  }
  if (risks.length === 0) {
    risks.push('ไม่พบ Red Flags ที่มีนัยสำคัญในช่วงที่วิเคราะห์ — แนะนำติดตามต่อเนื่องและเทียบ Benchmark ระหว่างคลินิก');
  }

  // Recommendations
  const recs = [];
  if (pxGrowth > 5) {
    recs.push(`วางแผนงบประมาณและ Supply Chain รองรับการเติบโต +${pxGrowth}% โดยเฉพาะหมวด ${topByValueGrowth.name} ซึ่งเป็น Growth Driver หลัก`);
  } else if (pxGrowth < -3) {
    recs.push(`จัดตั้ง Task Force ฟื้นฟูรายได้ทรัพยากร OPD (${pxGrowth}%) วิเคราะห์ Root Cause รายคลินิกและหมวด`);
  }
  const highOrd = cat.Lab.ord > 15 ? 'Lab' : cat.Xray.ord > 15 ? 'CT/X-ray' : cat.Drug.ord > 15 ? 'Drug' : null;
  if (highOrd) {
    recs.push(`ทบทวน Evidence-based Ordering Protocol สำหรับ ${highOrd} เพื่อคุม Unnecessary Ordering และลด Cost-per-visit`);
  }
  if (peakMonth) {
    recs.push(`ช่วง ${peakMonth} คือเดือน Peak Demand — วางแผน Staffing, Stock Level และ Preventive Maintenance ล่วงหน้า 30–60 วัน`);
  }
  recs.push('สร้าง Executive KPI Dashboard ราย 3 เดือน: Cost-per-visit · Order-per-visit · Yield-per-order แยกตามคลินิก เพื่อเปรียบเทียบ Benchmark ภายใน');
  if (cat.Drug.px > 15 || shareFY2.drug > 55) {
    recs.push('ตั้ง Pharmacy & Therapeutics Committee ทบทวน High-cost Drug List และส่งเสริม Generic Substitution เพื่อคุม Drug Expense');
  }
  if (cat.Xray.ord > 15) {
    recs.push('พัฒนา Clinical Decision Support สำหรับการสั่ง CT/X-ray ตาม ACR Appropriateness Criteria ลด Inappropriate Imaging');
  }

  return {
    headline,
    trend_analysis: trendAnalysis,
    mix_insight: mixInsight,
    unit_economics: unitEcon,
    seasonal_insight: seasonalInsight,
    risks,
    recommendations: recs,
    meta: { comparable_months: comparableMonths, fy1, fy2 },
  };
}

// ─────────────────────────────────────────────────────────────
// Presentational card used by AI Analysis panel
// ─────────────────────────────────────────────────────────────
function AINarrativeCard({ icon, title, text, list, color = '#7c3aed' }) {
  return (
    <div style={{
      background: 'var(--md-surface)',
      border: '1px solid var(--md-border)',
      borderLeft: `3px solid ${color}`,
      borderRadius: '10px',
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px' }}>{icon}</span>
        <span style={{ fontWeight: 800, fontSize: '12px', color: 'var(--md-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
      </div>
      {text && (
        <p style={{ fontSize: '13px', color: 'var(--md-text-primary)', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
          {text}
        </p>
      )}
      {list && (
        <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
          {list.map((item, i) => (
            <li key={i} style={{ fontSize: '13px', color: 'var(--md-text-primary)', lineHeight: 1.7, fontWeight: 500, marginBottom: '3px' }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AI Executive Analysis Panel — OPD Resource report
// ─────────────────────────────────────────────────────────────
function OpdResourceAIExecutive({ data, fy1, fy2 }) {
  const narrative = useMemo(() => buildOpdResourceNarrative(data, fy1, fy2), [data, fy1, fy2]);
  if (!narrative) return null;

  return (
    <div className="rounded-2xl overflow-hidden" style={{
      background: 'var(--md-surface)',
      border: '1px solid var(--md-border)',
      boxShadow: 'var(--md-shadow-sm)',
      marginTop: '16px',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid var(--md-border)',
        background: 'linear-gradient(135deg, rgba(124,58,237,.08), rgba(14,165,233,.05))',
        display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '18px' }}>🧠</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
            AI วิเคราะห์เชิงคุณภาพ — ทรัพยากรผู้ป่วยนอก (สำหรับผู้บริหาร)
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
            Executive Qualitative Analysis · Growth · Mix · Unit Economics · Risks · Recommendations
          </div>
        </div>
        <span style={{
          fontSize: '10px', fontWeight: 700,
          padding: '3px 10px', borderRadius: '99px',
          background: 'rgba(124,58,237,.1)', color: '#7c3aed',
          border: '1px solid rgba(124,58,237,.25)',
        }}>
          📐 Rule-based Analysis
        </span>
      </div>

      <div style={{ padding: '18px 20px' }}>
        {narrative.empty ? (
          <div style={{
            padding: '14px 16px',
            background: 'rgba(251,191,36,.08)',
            borderLeft: '3px solid #f59e0b',
            borderRadius: '10px',
            fontSize: '13px', fontWeight: 600, color: 'var(--md-text-primary)',
          }}>
            {narrative.headline}
          </div>
        ) : (
          <>
            {/* Headline */}
            <div style={{
              padding: '14px 16px',
              background: 'rgba(124,58,237,.08)',
              borderLeft: '3px solid #7c3aed',
              borderRadius: '10px',
              marginBottom: '14px',
              fontSize: '14px', fontWeight: 700, color: 'var(--md-text-primary)', lineHeight: 1.6,
            }}>
              {narrative.headline}
            </div>

            {/* Row 1: Trend + Mix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '10px', marginBottom: '10px' }}>
              <AINarrativeCard icon="📊" title="Trend Analysis" text={narrative.trend_analysis} color="#7c3aed" />
              <AINarrativeCard icon="🧩" title="Resource Mix & Growth Driver" text={narrative.mix_insight} color="#0ea5e9" />
            </div>

            {/* Row 2: Unit Economics + Seasonality */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '10px', marginBottom: '10px' }}>
              <AINarrativeCard icon="💠" title="Unit Economics (บาท/ครั้ง)" text={narrative.unit_economics} color="#0d9488" />
              <AINarrativeCard icon="🗓️" title="Seasonal Pattern" text={narrative.seasonal_insight} color="#8b5cf6" />
            </div>

            {/* Row 3: Risks + Recommendations */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '10px' }}>
              <AINarrativeCard icon="⚠️" title="ความเสี่ยง / Red Flags" list={narrative.risks} color="#f59e0b" />
              <AINarrativeCard icon="💡" title="ข้อเสนอแนะเชิงกลยุทธ์" list={narrative.recommendations} color="#10b981" />
            </div>

            {/* Footer */}
            <div style={{
              marginTop: '14px',
              padding: '10px 14px',
              background: 'var(--md-surface-2, rgba(0,0,0,.02))',
              borderRadius: '8px',
              fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600,
              display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px',
            }}>
              <span>ฐานข้อมูล: {narrative.meta.comparable_months} เดือนที่เทียบได้ · ปีงบ {narrative.meta.fy1} vs {narrative.meta.fy2}</span>
              <span>⚠ การตัดสินใจเชิงนโยบายควรพิจารณาข้อมูลทางคลินิกและบริบทเพิ่มเติม</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ReportTab() {
  const [reportType, setReportType] = useState('opd-compare');
  const [ipdData, setIpdData] = useState(null);
  const [opdData, setOpdData] = useState(null);
  const [resourceData, setResourceData] = useState(null);
  const [resOpdMonthly, setResOpdMonthly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  // Default: current FY vs previous FY
  const now = new Date();
  const cm = now.getMonth() + 1;
  const cy = now.getFullYear();
  const defaultFY2 = cm >= 10 ? cy + 544 : cy + 543;
  const defaultFY1 = defaultFY2 - 1;

  const [fy1, setFy1] = useState(defaultFY1);
  const [fy2, setFy2] = useState(defaultFY2);

  const fetchIPDCompare = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/report/ipd-compare?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setIpdData(d);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  const fetchOPDCompare = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/report/opd-compare?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setOpdData(d);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  const fetchResourceUsage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/report/resource-usage?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setResourceData(d);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  const fetchResOpdMonthly = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/report/resource-opd-monthly?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setResOpdMonthly(d);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  useEffect(() => {
    if (reportType === 'ipd-compare') fetchIPDCompare();
    else if (reportType === 'opd-compare') fetchOPDCompare();
    else if (reportType === 'resource-opd') fetchResOpdMonthly();
    else if (reportType === 'resource-ipd') fetchResourceUsage();
  }, [reportType, fetchIPDCompare, fetchOPDCompare, fetchResourceUsage, fetchResOpdMonthly]);

  // Determine which months of fy2 have data for the subtitle
  const fy2DataMonths = useMemo(() => {
    if (!ipdData?.comparison) return '';
    const months = ipdData.comparison.filter(c => c.fy2.has_data).map(c => c.month);
    if (months.length === 0) return '';
    return `(${months[0]} - ${months[months.length - 1]} ${fy2})`;
  }, [ipdData, fy2]);

  // Print handler
  const handlePrint = useCallback(() => {
    const printContent = tableRef.current;
    if (!printContent) return;
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>รายงานผู้ป่วยใน ${fy1}-${fy2}</title>
      <style>
        body { font-family: 'Kanit', 'Segoe UI', sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; font-size: 11px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: center; }
        th { font-weight: 700; }
        .header-fy1 { background: #dbeafe; }
        .header-fy2 { background: #fce7f3; }
        .header-growth { background: #dcfce7; }
        .row-total { background: #e0f2fe; font-weight: 800; }
        .negative { color: #dc2626; }
        .positive { color: #16a34a; }
        @media print { body { margin: 0; } }
      </style></head><body>${printContent.outerHTML}</body></html>
    `);
    win.document.close();
    win.print();
  }, [fy1, fy2]);

  // CSV export
  const handleExport = useCallback(() => {
    if (reportType === 'ipd-compare') {
      if (!ipdData?.comparison) return;
      const cols = [
        'เดือน',
        'จำนวน Admit (ปีงบ ' + fy1 + ')',
        'วันนอน',
        'วันนอนเฉลี่ย',
        'อัตราครองเตียง',
        'เตียงที่ใช้จริง',
        'Sum AdjRW',
        'CMI',
        'จำนวน Admit (ปีงบ ' + fy2 + ')',
        'วันนอน',
        'วันนอนเฉลี่ย',
        'อัตราครองเตียง',
        'เตียงที่ใช้จริง',
        'Sum AdjRW',
        'CMI',
        'เติบโต %',
        'ส่วนต่าง Admit',
      ];

      const rows = ipdData.comparison.map(c => [
        c.month,
        c.fy1.admits,
        c.fy1.total_los,
        c.fy1.alos,
        c.fy1.occupancy_rate,
        c.fy1.active_beds,
        c.fy1.sum_adjrw,
        c.fy1.cmi,
        c.fy2.admits,
        c.fy2.total_los,
        c.fy2.alos,
        c.fy2.occupancy_rate,
        c.fy2.active_beds,
        c.fy2.sum_adjrw,
        c.fy2.cmi,
        c.growth_pct + '%',
        c.admit_diff,
      ]);

      const t1 = ipdData.fy1_totals;
      const t2 = ipdData.fy2_totals;
      rows.push([
        'รวม',
        t1.admits,
        t1.total_los,
        t1.alos,
        t1.occupancy_rate,
        t1.active_beds,
        t1.sum_adjrw,
        t1.cmi,
        t2.admits,
        t2.total_los,
        t2.alos,
        t2.occupancy_rate,
        t2.active_beds,
        t2.sum_adjrw,
        t2.cmi,
        ipdData.overall_growth_pct + '%',
        ipdData.overall_admit_diff,
      ]);

      const csv = '\uFEFF' + [cols.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BCH360_IPD_Compare_${fy1}_${fy2}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (reportType === 'resource-opd') {
      if (!resOpdMonthly?.comparison) return;
      const cols = [
        'เดือน',
        `Lab ครั้ง (${fy1})`, `Lab บาท (${fy1})`,
        `Drug ครั้ง (${fy1})`, `Drug บาท (${fy1})`,
        `Xray ครั้ง (${fy1})`, `Xray บาท (${fy1})`,
        `Lab ครั้ง (${fy2})`, `Lab บาท (${fy2})`,
        `Drug ครั้ง (${fy2})`, `Drug บาท (${fy2})`,
        `Xray ครั้ง (${fy2})`, `Xray บาท (${fy2})`,
        'จำนวน %', 'มูลค่า %',
      ];
      const rows = resOpdMonthly.comparison.map(c => {
        const m1 = c.fy1, m2 = c.fy2;
        return [
          c.month,
          m1.lab_orders, m1.lab_price, m1.drug_orders, m1.drug_price, m1.xray_orders, m1.xray_price,
          m2.lab_orders, m2.lab_price, m2.drug_orders, m2.drug_price, m2.xray_orders, m2.xray_price,
          '', '',
        ];
      });
      const csv = '\uFEFF' + [cols.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BCH360_Resource_OPD_Monthly_${fy1}_${fy2}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (reportType === 'resource-ipd') {
      if (!resourceData) return;
      const level = 'inpatient';
      const cols = [
        'รายการ',
        `จำนวนที่สั่ง ปีงบ ${fy1}`,
        `Total Price ปีงบ ${fy1}`,
        `จำนวนที่สั่ง ปีงบ ${fy2}`,
        `Total Price ปีงบ ${fy2}`,
        'Growth Orders %',
        'Growth Price %',
      ];

      const categories = ['Lab', 'Drug', 'CT / X-ray'];
      const rows = [];
      for (const cat of categories) {
        const r1 = resourceData[level][cat]?.fy1 || { orders: 0, total_price: 0 };
        const r2 = resourceData[level][cat]?.fy2 || { orders: 0, total_price: 0 };
        const growthOrd = r1.orders > 0
          ? Math.round(((r2.orders - r1.orders) / r1.orders) * 100) : 0;
        const growthPrice = r1.total_price > 0
          ? Math.round(((r2.total_price - r1.total_price) / Math.abs(r1.total_price)) * 100) : 0;
        rows.push([cat, r1.orders, r1.total_price, r2.orders, r2.total_price, `${growthOrd}%`, `${growthPrice}%`]);
      }

      const csv = '\uFEFF' + [cols.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BCH360_Resource_IPD_${fy1}_${fy2}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [reportType, ipdData, resourceData, resOpdMonthly, fy1, fy2]);

  // ── FY selector options ──
  const fyOptions = useMemo(() => {
    const opts = [];
    for (let y = defaultFY2; y >= defaultFY2 - 2; y--) opts.push(y);
    return opts;
  }, [defaultFY2]);

  // ── Styles ──
  const S = {
    th: {
      padding: '8px 10px',
      fontSize: '12px',
      fontWeight: 800,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      borderBottom: '2px solid var(--md-border)',
      color: 'var(--md-text-primary)',
    },
    td: {
      padding: '7px 10px',
      fontSize: '12px',
      fontWeight: 600,
      textAlign: 'center',
      borderBottom: '1px solid var(--md-border)',
      color: 'var(--md-text-primary)',
    },
    tdNum: {
      padding: '7px 10px',
      fontSize: '12px',
      fontWeight: 600,
      textAlign: 'right',
      borderBottom: '1px solid var(--md-border)',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--md-text-primary)',
    },
    fy1Bg: 'rgba(59,130,246,.06)',
    fy2Bg: 'rgba(236,72,153,.06)',
    growthBg: 'rgba(34,197,94,.06)',
    totalBg: 'rgba(14,165,233,.08)',
  };

  return (
    <div className="space-y-5 animate-fade-in pb-10">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div
          style={{
            width: '4px',
            height: '24px',
            background: 'linear-gradient(180deg, #0284c7, #7c3aed)',
            borderRadius: '99px',
          }}
        />
        <h2
          style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}
        >
          REPORT Online โรงพยาบาลบ้านฉาง
        </h2>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '99px',
            background: 'rgba(2,132,199,.1)',
            color: '#0284c7',
          }}
        >
          {reportType === 'ipd-compare'
            ? 'จำนวนผู้ป่วยใน (IPD)'
            : reportType === 'opd-compare'
              ? 'จำนวนผู้ป่วยนอก (OPD)'
              : reportType === 'resource-opd'
                ? 'ทรัพยากร ผู้ป่วยนอก (Lab/Drug/CT-Xray)'
                : 'ทรัพยากร ผู้ป่วยใน (Lab/Drug/CT-Xray)'}
        </span>
      </div>

      {/* Controls */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: 'var(--md-surface)',
          border: '1px solid var(--md-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)' }}>
          เลือกรายงาน
        </span>
        <select
          value={reportType}
          onChange={e => setReportType(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid var(--md-border)',
            fontSize: '13px',
            fontWeight: 700,
            background: 'var(--md-surface)',
            color: 'var(--md-text-primary)',
          }}
        >
          <option value="opd-compare">จำนวนผู้ป่วยนอก (OPD)</option>
          <option value="ipd-compare">จำนวนผู้ป่วยใน (IPD)</option>
          <option value="resource-opd">ทรัพยากร ผู้ป่วยนอก (Lab/Drug/CT-Xray)</option>
          <option value="resource-ipd">ทรัพยากร ผู้ป่วยใน (Lab/Drug/CT-Xray)</option>
        </select>

        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)' }}>
          ปีงบประมาณ
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <select
            value={fy1}
            onChange={e => setFy1(Number(e.target.value))}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--md-border)',
              fontSize: '13px',
              fontWeight: 700,
              background: 'var(--md-surface)',
              color: 'var(--md-text-primary)',
            }}
          >
            {fyOptions.map(y => (
              <option key={y} value={y}>
                ปีงบ {y}
              </option>
            ))}
          </select>
          <span style={{ fontWeight: 800, color: 'var(--md-text-tertiary)' }}>vs</span>
          <select
            value={fy2}
            onChange={e => setFy2(Number(e.target.value))}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--md-border)',
              fontSize: '13px',
              fontWeight: 700,
              background: 'var(--md-surface)',
              color: 'var(--md-text-primary)',
            }}
          >
            {fyOptions.map(y => (
              <option key={y} value={y}>
                ปีงบ {y}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() =>
            reportType === 'ipd-compare' ? fetchIPDCompare()
              : reportType === 'opd-compare' ? fetchOPDCompare()
                : reportType === 'resource-opd' ? fetchResOpdMonthly()
                  : fetchResourceUsage()
          }
          disabled={loading}
          style={{
            padding: '6px 16px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #0284c7, #7c3aed)',
            color: '#fff',
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Loading...' : 'โหลดข้อมูล'}
        </button>

        <button
          onClick={handlePrint}
          disabled={reportType === 'ipd-compare' ? !ipdData : reportType === 'opd-compare' ? !opdData : reportType === 'resource-opd' ? !resOpdMonthly : !resourceData}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid var(--md-border)',
            background: 'var(--md-surface)',
            color: 'var(--md-text-secondary)',
            cursor: 'pointer',
          }}
        >
          Print
        </button>
        <button
          onClick={handleExport}
          disabled={reportType === 'ipd-compare' ? !ipdData : reportType === 'opd-compare' ? !opdData : reportType === 'resource-opd' ? !resOpdMonthly : !resourceData}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid var(--md-border)',
            background: 'var(--md-surface)',
            color: 'var(--md-text-secondary)',
            cursor: 'pointer',
          }}
        >
          CSV
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(239,68,68,.08)',
            color: '#dc2626',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <div
          className="rounded-2xl p-8 animate-pulse"
          style={{
            background: 'var(--md-surface)',
            border: '1px solid var(--md-border)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>
            กำลังโหลดรายงาน...
          </div>
        </div>
      )}

      {/* Report Table */}
      {!loading && reportType === 'ipd-compare' && ipdData?.comparison && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--md-surface)',
            border: '1px solid var(--md-border)',
            boxShadow: 'var(--md-shadow-sm)',
          }}
        >
          <div ref={tableRef} style={{ overflowX: 'auto' }}>
            {/* Title */}
            <div
              style={{
                padding: '16px 20px',
                textAlign: 'center',
                borderBottom: '2px solid var(--md-border)',
                background: 'linear-gradient(135deg, rgba(2,132,199,.04), rgba(124,58,237,.04))',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                {ipdData.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--md-text-tertiary)',
                  marginTop: '4px',
                }}
              >
                {fy2DataMonths && `${ipdData.fiscal_years.fy2.label} ${fy2DataMonths}`}
                {' · เตียงจริง: '}
                {ipdData.total_beds} เตียง
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
              <thead>
                {/* Row 1: FY group headers */}
                <tr>
                  <th
                    rowSpan={2}
                    style={{
                      ...S.th,
                      width: '60px',
                      borderRight: '2px solid var(--md-border)',
                      position: 'sticky',
                      left: 0,
                      background: 'var(--md-surface)',
                      zIndex: 2,
                    }}
                  >
                    เดือน
                  </th>
                  <th
                    colSpan={7}
                    style={{
                      ...S.th,
                      background: S.fy1Bg,
                      color: '#2563eb',
                      borderRight: '2px solid var(--md-border)',
                    }}
                  >
                    ปี งบ {fy1}
                  </th>
                  <th
                    colSpan={7}
                    style={{
                      ...S.th,
                      background: S.fy2Bg,
                      color: '#db2777',
                      borderRight: '2px solid var(--md-border)',
                    }}
                  >
                    ปี งบ {fy2} {fy2DataMonths}
                  </th>
                  <th colSpan={2} style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>
                    เปรียบเทียบ
                  </th>
                </tr>
                {/* Row 2: Column headers */}
                <tr>
                  {[
                    'จำนวน Admit',
                    'วันนอน',
                    'วันนอนเฉลี่ย',
                    'อัตราครองเตียง',
                    'เตียงที่ใช้จริง\n(Actived Bed)',
                    'Sum AdjRW',
                    'CMI',
                  ].map((h, i) => (
                    <th
                      key={`fy1_${i}`}
                      style={{
                        ...S.th,
                        background: S.fy1Bg,
                        fontSize: '10px',
                        fontWeight: 700,
                        borderRight: i === 6 ? '2px solid var(--md-border)' : undefined,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                  {[
                    'จำนวน Admit',
                    'วันนอน',
                    'วันนอนเฉลี่ย',
                    'อัตราครองเตียง',
                    'เตียงที่ใช้จริง\n(Actived Bed)',
                    'Sum AdjRW',
                    'CMI',
                  ].map((h, i) => (
                    <th
                      key={`fy2_${i}`}
                      style={{
                        ...S.th,
                        background: S.fy2Bg,
                        fontSize: '10px',
                        fontWeight: 700,
                        borderRight: i === 6 ? '2px solid var(--md-border)' : undefined,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                  <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>
                    จำนวนผู้ป่วยใน
                    <br />
                    เติบโต
                  </th>
                  <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>
                    ส่วนต่าง
                    <br />
                    Admit
                  </th>
                </tr>
              </thead>
              <tbody>
                {ipdData.comparison.map((c, i) => (
                  <tr
                    key={i}
                    style={{
                      background:
                        i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))',
                    }}
                  >
                    <td
                      style={{
                        ...S.td,
                        fontWeight: 800,
                        position: 'sticky',
                        left: 0,
                        background:
                          i % 2 === 0 ? 'var(--md-surface)' : 'var(--md-surface-2, #f8fafc)',
                        zIndex: 1,
                        borderRight: '2px solid var(--md-border)',
                      }}
                    >
                      {c.month}
                    </td>
                    <td style={S.tdNum}>{fmt(c.fy1.admits)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.total_los)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.alos, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.occupancy_rate, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.active_beds, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.sum_adjrw, 2)}</td>
                    <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>
                      {fmt(c.fy1.cmi, 2)}
                    </td>
                    <td style={S.tdNum}>{fmt(c.fy2.admits)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.total_los)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.alos, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.occupancy_rate, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.active_beds, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.sum_adjrw, 2)}</td>
                    <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>
                      {fmt(c.fy2.cmi, 2)}
                    </td>
                    <td
                      style={{
                        ...S.tdNum,
                        fontWeight: 800,
                        color: c.growth_pct >= 0 ? '#16a34a' : '#dc2626',
                      }}
                    >
                      {c.growth_pct > 0 ? '▲' : c.growth_pct < 0 ? '▼' : ''} {Math.abs(c.growth_pct)}%
                    </td>
                    <td
                      style={{
                        ...S.tdNum,
                        fontWeight: 800,
                        color: c.admit_diff >= 0 ? '#16a34a' : '#dc2626',
                      }}
                    >
                      {c.admit_diff > 0 ? '▲' : c.admit_diff < 0 ? '▼' : ''}{' '}
                      {fmt(Math.abs(c.admit_diff))}
                    </td>
                  </tr>
                ))}

                <tr style={{ background: S.totalBg }}>
                  <td
                    style={{
                      ...S.td,
                      fontWeight: 900,
                      position: 'sticky',
                      left: 0,
                      background: 'rgba(14,165,233,.12)',
                      zIndex: 1,
                      borderRight: '2px solid var(--md-border)',
                      borderTop: '2px solid var(--md-border)',
                    }}
                  >
                    รวม
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.admits)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.total_los)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.alos, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.occupancy_rate, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.active_beds, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.sum_adjrw, 2)}
                  </td>
                  <td
                    style={{
                      ...S.tdNum,
                      fontWeight: 900,
                      borderTop: '2px solid var(--md-border)',
                      borderRight: '2px solid var(--md-border)',
                    }}
                  >
                    {fmt(ipdData.fy1_totals.cmi, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.admits)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.total_los)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.alos, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.occupancy_rate, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.active_beds, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.sum_adjrw, 2)}
                  </td>
                  <td
                    style={{
                      ...S.tdNum,
                      fontWeight: 900,
                      borderTop: '2px solid var(--md-border)',
                      borderRight: '2px solid var(--md-border)',
                    }}
                  >
                    {fmt(ipdData.fy2_totals.cmi, 2)}
                  </td>
                  <td
                    style={{
                      ...S.tdNum,
                      fontWeight: 900,
                      borderTop: '2px solid var(--md-border)',
                      color: ipdData.overall_growth_pct >= 0 ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {ipdData.overall_growth_pct > 0 ? '▲' : ipdData.overall_growth_pct < 0 ? '▼' : ''} {Math.abs(ipdData.overall_growth_pct)}%
                  </td>
                  <td
                    style={{
                      ...S.tdNum,
                      fontWeight: 900,
                      borderTop: '2px solid var(--md-border)',
                      color: ipdData.overall_admit_diff >= 0 ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {ipdData.overall_admit_diff > 0 ? '▲' : ipdData.overall_admit_diff < 0 ? '▼' : ''}{' '}
                    {fmt(Math.abs(ipdData.overall_admit_diff))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '10px 20px',
              borderTop: '1px solid var(--md-border)',
              fontSize: '10px',
              color: 'var(--md-text-tertiary)',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>BCH 360° Intelligence · HOSxP XE · ipt + an_stat</span>
            <span>{ipdData.timestamp && new Date(ipdData.timestamp).toLocaleString('th-TH')}</span>
          </div>
        </div>
      )}

      {/* ── OPD Compare Table ── */}
      {!loading && reportType === 'opd-compare' && opdData?.comparison && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', boxShadow: 'var(--md-shadow-sm)' }}
        >
          <div ref={tableRef} style={{ overflowX: 'auto' }}>
            <div style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '2px solid var(--md-border)', background: 'linear-gradient(135deg, rgba(16,185,129,.04), rgba(59,130,246,.04))' }}>
              <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{opdData.title}</div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                {opdData.fiscal_years.fy2.label} · ข้อมูลเปรียบเทียบ {opdData.comparable_months} เดือน
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr>
                  <th rowSpan={2} style={{ ...S.th, width: '60px', borderRight: '2px solid var(--md-border)', position: 'sticky', left: 0, background: 'var(--md-surface)', zIndex: 2 }}>เดือน</th>
                  <th colSpan={4} style={{ ...S.th, background: S.fy1Bg, color: '#2563eb', borderRight: '2px solid var(--md-border)' }}>ปี งบ {fy1}</th>
                  <th colSpan={4} style={{ ...S.th, background: S.fy2Bg, color: '#0d9488', borderRight: '2px solid var(--md-border)' }}>ปี งบ {fy2}</th>
                  <th colSpan={2} style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>เปรียบเทียบ</th>
                </tr>
                <tr>
                  {['จำนวน Visit', 'ผู้ป่วย (UNQ)', 'รายได้', 'รายได้เฉลี่ย/Visit'].map((h, i) => (
                    <th key={`fy1_${i}`} style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', fontWeight: 700, borderRight: i === 3 ? '2px solid var(--md-border)' : undefined }}>{h}</th>
                  ))}
                  {['จำนวน Visit', 'ผู้ป่วย (UNQ)', 'รายได้', 'รายได้เฉลี่ย/Visit'].map((h, i) => (
                    <th key={`fy2_${i}`} style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', fontWeight: 700, borderRight: i === 3 ? '2px solid var(--md-border)' : undefined }}>{h}</th>
                  ))}
                  <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>จำนวน Visit<br />เติบโต</th>
                  <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>ส่วนต่าง<br />Visit</th>
                </tr>
              </thead>
              <tbody>
                {opdData.comparison.map((c, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                    <td style={{ ...S.td, fontWeight: 800, position: 'sticky', left: 0, background: i % 2 === 0 ? 'var(--md-surface)' : 'var(--md-surface-2, #f8fafc)', zIndex: 1, borderRight: '2px solid var(--md-border)' }}>{c.month}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.visits)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.patients)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.revenue)}</td>
                    <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>{fmt(c.fy1.avg_income, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.visits)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.patients)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.revenue)}</td>
                    <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>{fmt(c.fy2.avg_income, 2)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 800, color: c.growth_pct >= 0 ? '#16a34a' : '#dc2626' }}>
                      {c.growth_pct > 0 ? '▲' : c.growth_pct < 0 ? '▼' : ''} {Math.abs(c.growth_pct)}%
                    </td>
                    <td style={{ ...S.tdNum, fontWeight: 800, color: c.visit_diff >= 0 ? '#16a34a' : '#dc2626' }}>
                      {c.visit_diff > 0 ? '▲' : c.visit_diff < 0 ? '▼' : ''} {fmt(Math.abs(c.visit_diff))}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr style={{ background: S.totalBg }}>
                  <td style={{ ...S.td, fontWeight: 900, position: 'sticky', left: 0, background: 'rgba(14,165,233,.12)', zIndex: 1, borderRight: '2px solid var(--md-border)', borderTop: '2px solid var(--md-border)' }}>รวม</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy1_totals.visits)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy1_totals.patients)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy1_totals.revenue)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', borderRight: '2px solid var(--md-border)' }}>{fmt(opdData.fy1_totals.avg_income, 2)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy2_totals.visits)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy2_totals.patients)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy2_totals.revenue)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', borderRight: '2px solid var(--md-border)' }}>{fmt(opdData.fy2_totals.avg_income, 2)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: opdData.overall_growth_pct >= 0 ? '#16a34a' : '#dc2626' }}>
                    {opdData.overall_growth_pct > 0 ? '▲' : opdData.overall_growth_pct < 0 ? '▼' : ''} {Math.abs(opdData.overall_growth_pct)}%
                  </td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: opdData.overall_visit_diff >= 0 ? '#16a34a' : '#dc2626' }}>
                    {opdData.overall_visit_diff > 0 ? '▲' : opdData.overall_visit_diff < 0 ? '▼' : ''} {fmt(Math.abs(opdData.overall_visit_diff))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 20px', borderTop: '1px solid var(--md-border)', fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            <span>BCH 360° Intelligence · HOSxP XE · vn_stat</span>
            <span>{opdData.timestamp && new Date(opdData.timestamp).toLocaleString('th-TH')}</span>
          </div>
        </div>
      )}

      {/* ── Resource OPD Monthly Table (ทรัพยากร ผู้ป่วยนอก — รายเดือน) ── */}
      {!loading && reportType === 'resource-opd' && resOpdMonthly?.comparison && (() => {
        const d = resOpdMonthly;
        const t1 = d.fy1_totals;
        const t2 = d.fy2_totals;
        const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : a > 0 ? 100 : 0;

        // Totals for comparison row
        const t1TotalOrders = t1.lab_orders + t1.drug_orders + t1.xray_orders;
        const t1TotalPrice = t1.lab_price + t1.drug_price + t1.xray_price;
        const t2TotalOrders = t2.lab_orders + t2.drug_orders + t2.xray_orders;
        const t2TotalPrice = t2.lab_price + t2.drug_price + t2.xray_price;

        const border2 = '2px solid var(--md-border)';
        const border1 = '1px solid var(--md-border)';

        return (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: border1, boxShadow: 'var(--md-shadow-sm)' }}>
            <div ref={tableRef} style={{ overflowX: 'auto' }}>
              {/* Title */}
              <div style={{ padding: '16px 20px', textAlign: 'center', borderBottom: border2, background: 'linear-gradient(135deg, rgba(16,185,129,.05), rgba(59,130,246,.05))' }}>
                <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                  {d.title}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                  เปรียบเทียบ {d.comparable_months} เดือน
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1400px' }}>
                <thead>
                  {/* Row 1: FY group headers */}
                  <tr>
                    <th rowSpan={3} style={{ ...S.th, width: '55px', borderRight: border2, position: 'sticky', left: 0, background: 'var(--md-surface)', zIndex: 2 }}>
                      เดือน
                    </th>
                    <th colSpan={6} style={{ ...S.th, background: S.fy1Bg, color: '#2563eb', borderRight: border2 }}>
                      ปี งบ {fy1}
                    </th>
                    <th colSpan={6} style={{ ...S.th, background: S.fy2Bg, color: '#0d9488', borderRight: border2 }}>
                      ปี งบ {fy2}
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>
                      เปรียบเทียบ
                    </th>
                  </tr>
                  {/* Row 2: Category headers */}
                  <tr>
                    <th colSpan={2} style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', fontWeight: 700, borderRight: border1 }}>
                      Lab (ตรวจทางห้องปฏิบัติการ)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', fontWeight: 700, borderRight: border1 }}>
                      Drug (ยา)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', fontWeight: 700, borderRight: border2 }}>
                      CT / X-ray (รังสีวินิจฉัย)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', fontWeight: 700, borderRight: border1 }}>
                      Lab (ตรวจทางห้องปฏิบัติการ)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', fontWeight: 700, borderRight: border1 }}>
                      Drug (ยา)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', fontWeight: 700, borderRight: border2 }}>
                      CT / X-ray (รังสีวินิจฉัย)
                    </th>
                    <th rowSpan={2} style={{ ...S.th, background: S.growthBg, fontSize: '9px', fontWeight: 700 }}>
                      จำนวน %
                    </th>
                    <th rowSpan={2} style={{ ...S.th, background: S.growthBg, fontSize: '9px', fontWeight: 700 }}>
                      มูลค่า %
                    </th>
                  </tr>
                  {/* Row 3: Sub-column headers */}
                  <tr>
                    {/* FY1 columns */}
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600, borderRight: border1 }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600, borderRight: border1 }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600, borderRight: border2 }}>มูลค่า (บาท)</th>
                    {/* FY2 columns */}
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600, borderRight: border1 }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600, borderRight: border1 }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600, borderRight: border2 }}>มูลค่า (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {d.comparison.map((c, i) => {
                    const m1 = c.fy1, m2 = c.fy2;
                    const totalOrd1 = m1.lab_orders + m1.drug_orders + m1.xray_orders;
                    const totalPrice1 = m1.lab_price + m1.drug_price + m1.xray_price;
                    const totalOrd2 = m2.lab_orders + m2.drug_orders + m2.xray_orders;
                    const totalPrice2 = m2.lab_price + m2.drug_price + m2.xray_price;
                    const ordGrowth = pct(totalOrd2, totalOrd1);
                    const priceGrowth = pct(totalPrice2, totalPrice1);
                    const rowBg = i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))';
                    const stickyBg = i % 2 === 0 ? 'var(--md-surface)' : 'var(--md-surface-2, #f8fafc)';

                    return (
                      <tr key={i} style={{ background: rowBg }}>
                        <td style={{ ...S.td, fontWeight: 800, position: 'sticky', left: 0, background: stickyBg, zIndex: 1, borderRight: border2 }}>{c.month}</td>
                        {/* FY1: Lab */}
                        <td style={S.tdNum}>{m1.lab_orders ? fmt(m1.lab_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border1 }}>{m1.lab_price ? fmt(m1.lab_price) : ''}</td>
                        {/* FY1: Drug */}
                        <td style={S.tdNum}>{m1.drug_orders ? fmt(m1.drug_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border1 }}>{m1.drug_price ? fmt(m1.drug_price) : ''}</td>
                        {/* FY1: Xray */}
                        <td style={S.tdNum}>{m1.xray_orders ? fmt(m1.xray_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border2 }}>{m1.xray_price ? fmt(m1.xray_price) : ''}</td>
                        {/* FY2: Lab */}
                        <td style={S.tdNum}>{m2.lab_orders ? fmt(m2.lab_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border1 }}>{m2.lab_price ? fmt(m2.lab_price) : ''}</td>
                        {/* FY2: Drug */}
                        <td style={S.tdNum}>{m2.drug_orders ? fmt(m2.drug_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border1 }}>{m2.drug_price ? fmt(m2.drug_price) : ''}</td>
                        {/* FY2: Xray */}
                        <td style={S.tdNum}>{m2.xray_orders ? fmt(m2.xray_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border2 }}>{m2.xray_price ? fmt(m2.xray_price) : ''}</td>
                        {/* Comparison */}
                        <td style={{ ...S.tdNum, fontWeight: 800, color: ordGrowth >= 0 ? '#16a34a' : '#dc2626' }}>
                          {c.has_data ? `${ordGrowth > 0 ? '▲' : ordGrowth < 0 ? '▼' : ''} ${Math.abs(ordGrowth)}%` : ''}
                        </td>
                        <td style={{ ...S.tdNum, fontWeight: 800, color: priceGrowth >= 0 ? '#16a34a' : '#dc2626' }}>
                          {c.has_data ? `${priceGrowth > 0 ? '▲' : priceGrowth < 0 ? '▼' : ''} ${Math.abs(priceGrowth)}%` : ''}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Total Row (รวม) */}
                  <tr style={{ background: S.totalBg }}>
                    <td style={{ ...S.td, fontWeight: 900, position: 'sticky', left: 0, background: 'rgba(14,165,233,.12)', zIndex: 1, borderRight: border2, borderTop: border2 }}>รวม</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t1.lab_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border1 }}>{fmt(t1.lab_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t1.drug_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border1 }}>{fmt(t1.drug_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t1.xray_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border2 }}>{fmt(t1.xray_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t2.lab_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border1 }}>{fmt(t2.lab_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t2.drug_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border1 }}>{fmt(t2.drug_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t2.xray_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border2 }}>{fmt(t2.xray_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, color: d.overall_orders_growth_pct >= 0 ? '#16a34a' : '#dc2626' }}>
                      {d.overall_orders_growth_pct > 0 ? '▲' : d.overall_orders_growth_pct < 0 ? '▼' : ''} {Math.abs(d.overall_orders_growth_pct)}%
                    </td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, color: d.overall_price_growth_pct >= 0 ? '#16a34a' : '#dc2626' }}>
                      {d.overall_price_growth_pct > 0 ? '▲' : d.overall_price_growth_pct < 0 ? '▼' : ''} {Math.abs(d.overall_price_growth_pct)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note */}
            {(fy1 <= 2567 || fy2 <= 2567) && (
              <div style={{ padding: '10px 20px', borderTop: border1, fontSize: '11px', fontWeight: 600, color: '#d97706', background: 'rgba(251,191,36,.06)' }}>
                หมายเหตุ: HOSxP บันทึก inc_drug ช่วง ก.ย.–พ.ย. 2566 สูงเกินจริง (~300 เท่า) — ระบบตัด outlier (inc_drug {'>'} 25,000) ออกอัตโนมัติ
              </div>
            )}

            {/* Footer */}
            <div style={{ padding: '10px 20px', borderTop: border1, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              <span>BCH 360° Intelligence · HOSxP XE · vn_stat (inc03 · inc_drug · inc04)</span>
              <span>{d.timestamp && new Date(d.timestamp).toLocaleString('th-TH')}</span>
            </div>
          </div>
        );
      })()}

      {/* ── AI Executive Qualitative Analysis — shown under OPD Resource table ── */}
      {!loading && reportType === 'resource-opd' && resOpdMonthly?.comparison && (
        <OpdResourceAIExecutive data={resOpdMonthly} fy1={fy1} fy2={fy2} />
      )}

      {/* ── Resource IPD Table (yearly summary — unchanged) ── */}
      {!loading && reportType === 'resource-ipd' && resourceData && (() => {
        const level = 'inpatient';
        const levelTH = 'ผู้ป่วยใน (IPD)';
        const gradBg = 'linear-gradient(135deg, rgba(236,72,153,.05), rgba(251,146,60,.05))';
        const accentColor = '#db2777';
        const categories = ['Lab', 'Drug', 'CT / X-ray'];

        let totalFy1Orders = 0, totalFy1Price = 0, totalFy2Orders = 0, totalFy2Price = 0;
        const catRows = categories.map(cat => {
          const r1 = resourceData[level][cat]?.fy1 || { orders: 0, total_price: 0 };
          const r2 = resourceData[level][cat]?.fy2 || { orders: 0, total_price: 0 };
          totalFy1Orders += r1.orders;
          totalFy1Price += r1.total_price;
          totalFy2Orders += r2.orders;
          totalFy2Price += r2.total_price;
          const growthOrd = r1.orders > 0 ? Math.round(((r2.orders - r1.orders) / r1.orders) * 100) : r2.orders > 0 ? 100 : 0;
          const growthPrice = r1.total_price > 0 ? Math.round(((r2.total_price - r1.total_price) / Math.abs(r1.total_price)) * 100) : r2.total_price > 0 ? 100 : 0;
          return { cat, r1, r2, growthOrd, growthPrice };
        });
        const totalGrowthOrd = totalFy1Orders > 0 ? Math.round(((totalFy2Orders - totalFy1Orders) / totalFy1Orders) * 100) : 0;
        const totalGrowthPrice = totalFy1Price > 0 ? Math.round(((totalFy2Price - totalFy1Price) / Math.abs(totalFy1Price)) * 100) : 0;

        return (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', boxShadow: 'var(--md-shadow-sm)' }}>
            <div ref={tableRef} style={{ overflowX: 'auto' }}>
              <div style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '2px solid var(--md-border)', background: gradBg }}>
                <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                  รายงานการใช้ทรัพยากรสำคัญในโรงพยาบาล — {levelTH}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                  เปรียบเทียบปีงบประมาณ {fy1} vs {fy2}
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                <thead>
                  <tr>
                    <th rowSpan={2} style={{ ...S.th, width: '140px', borderRight: '2px solid var(--md-border)' }}>รายการ</th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy1Bg, color: '#2563eb', borderRight: '2px solid var(--md-border)' }}>ปีงบ {fy1}</th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy2Bg, color: accentColor, borderRight: '2px solid var(--md-border)' }}>ปีงบ {fy2}</th>
                    <th colSpan={2} style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>เปรียบเทียบ</th>
                  </tr>
                  <tr>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '10px' }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', borderRight: '2px solid var(--md-border)' }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '10px' }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', borderRight: '2px solid var(--md-border)' }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>จำนวน %</th>
                    <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>มูลค่า %</th>
                  </tr>
                </thead>
                <tbody>
                  {catRows.map((row, idx) => (
                    <tr key={row.cat} style={{ background: idx % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                      <td style={{ ...S.td, fontWeight: 800, borderRight: '2px solid var(--md-border)', textAlign: 'left', paddingLeft: '16px' }}>
                        {row.cat === 'Lab' ? 'Lab (ตรวจทางห้องปฏิบัติการ)' : row.cat === 'Drug' ? 'Drug (ยา)' : 'CT / X-ray (รังสีวินิจฉัย)'}
                      </td>
                      <td style={S.tdNum}>{fmt(row.r1.orders)}</td>
                      <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>{fmt(row.r1.total_price)}</td>
                      <td style={S.tdNum}>{fmt(row.r2.orders)}</td>
                      <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>{fmt(row.r2.total_price)}</td>
                      <td style={{ ...S.tdNum, fontWeight: 800, color: row.growthOrd >= 0 ? '#16a34a' : '#dc2626' }}>
                        {row.growthOrd > 0 ? '▲' : row.growthOrd < 0 ? '▼' : ''} {Math.abs(row.growthOrd)}%
                      </td>
                      <td style={{ ...S.tdNum, fontWeight: 800, color: row.growthPrice >= 0 ? '#16a34a' : '#dc2626' }}>
                        {row.growthPrice > 0 ? '▲' : row.growthPrice < 0 ? '▼' : ''} {Math.abs(row.growthPrice)}%
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: S.totalBg }}>
                    <td style={{ ...S.td, fontWeight: 900, borderRight: '2px solid var(--md-border)', borderTop: '2px solid var(--md-border)', textAlign: 'left', paddingLeft: '16px' }}>รวมทั้งหมด</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(totalFy1Orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', borderRight: '2px solid var(--md-border)' }}>{fmt(totalFy1Price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(totalFy2Orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', borderRight: '2px solid var(--md-border)' }}>{fmt(totalFy2Price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: totalGrowthOrd >= 0 ? '#16a34a' : '#dc2626' }}>
                      {totalGrowthOrd > 0 ? '▲' : totalGrowthOrd < 0 ? '▼' : ''} {Math.abs(totalGrowthOrd)}%
                    </td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: totalGrowthPrice >= 0 ? '#16a34a' : '#dc2626' }}>
                      {totalGrowthPrice > 0 ? '▲' : totalGrowthPrice < 0 ? '▼' : ''} {Math.abs(totalGrowthPrice)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ padding: '10px 20px', borderTop: '1px solid var(--md-border)', fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              <span>BCH 360° Intelligence · HOSxP XE · an_stat (inc03 · inc12 · inc04)</span>
              <span>{resourceData.timestamp && new Date(resourceData.timestamp).toLocaleString('th-TH')}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
