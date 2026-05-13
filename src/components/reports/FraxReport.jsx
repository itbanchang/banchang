// ============================================================
// FraxReport — FRAX Calculator: ประเมินความเสี่ยงกระดูกหัก (Female ≥60y)
// Phase H Tier 2.4 — Source recovery
// Backend: GET /api/report/frax-patients?start=&end=
//   FRAX log-trilinear interpolation on 1210-point Thai female grid
// ============================================================
import React from 'react';
import {
  KPIGrid, CardShell, GenericPatientTable, ReportShell, useReportData,
} from './_shared';

// FRAX risk tier thresholds (WHO + Thai guideline):
//   Major: ≥20% = HIGH (treat) · 10-20 = MOD · <10 = LOW
//   Hip:   ≥3%  = HIGH (treat) · 1.5-3 = MOD · <1.5 = LOW
function fraxTier(major, hip) {
  if (major >= 20 || hip >= 3) return { tier: 'HIGH', label: 'สูง', color: '#dc2626', bg: 'rgba(239,68,68,.12)' };
  if (major >= 10 || hip >= 1.5) return { tier: 'MOD', label: 'ปานกลาง', color: '#d97706', bg: 'rgba(245,158,11,.12)' };
  return { tier: 'LOW', label: 'ต่ำ', color: '#059669', bg: 'rgba(16,185,129,.12)' };
}

function bmiCategory(bmi) {
  if (!bmi) return { label: '-', color: '#94a3b8' };
  const b = Number(bmi);
  if (b < 18.5) return { label: 'ผอม', color: '#3b82f6' };
  if (b < 23) return { label: 'ปกติ', color: '#059669' };
  if (b < 25) return { label: 'น้ำหนักเกิน', color: '#d97706' };
  if (b < 30) return { label: 'อ้วน I', color: '#ea580c' };
  return { label: 'อ้วน II+', color: '#dc2626' };
}

function computeFrax(data) {
  if (!data?.patients) return null;
  const patients = data.patients;

  // Risk distribution
  const tierCounts = { HIGH: 0, MOD: 0, LOW: 0 };
  patients.forEach((p) => {
    const t = fraxTier(p.major_osteoporotic, p.hip_fracture);
    tierCounts[t.tier] += 1;
  });

  // Age buckets
  const ageGroups = { '60-69': 0, '70-79': 0, '80+': 0 };
  patients.forEach((p) => {
    const a = Number(p.age) || 0;
    if (a < 70) ageGroups['60-69'] += 1;
    else if (a < 80) ageGroups['70-79'] += 1;
    else ageGroups['80+'] += 1;
  });

  // BMI distribution
  const bmiBuckets = { 'ผอม': 0, 'ปกติ': 0, 'น้ำหนักเกิน': 0, 'อ้วน I': 0, 'อ้วน II+': 0 };
  patients.forEach((p) => {
    const cat = bmiCategory(p.bmi).label;
    if (cat in bmiBuckets) bmiBuckets[cat] += 1;
  });

  // Average scores
  const avgMajor = patients.length > 0
    ? patients.reduce((s, p) => s + (p.major_osteoporotic || 0), 0) / patients.length
    : 0;
  const avgHip = patients.length > 0
    ? patients.reduce((s, p) => s + (p.hip_fracture || 0), 0) / patients.length
    : 0;

  return {
    patients, tierCounts, ageGroups, bmiBuckets,
    avgMajor: avgMajor.toFixed(2), avgHip: avgHip.toFixed(2),
    totalBoneDensity: data.total_bone_density || 0,
    dateRange: data.date_range || { start: '', end: '' },
  };
}

function buildCards(m) {
  const total = m.patients.length;
  const highPct = total > 0 ? Math.round(m.tierCounts.HIGH / total * 100) : 0;
  return [
    { label: 'ผู้รับการประเมิน', icon: '🦴', value: total.toLocaleString(), unit: 'ราย', color: '#10b981' },
    { label: 'เสี่ยงสูง (HIGH)', icon: '🔴', value: m.tierCounts.HIGH.toLocaleString(), unit: `ราย (${highPct}%)`, color: '#dc2626' },
    { label: 'ปานกลาง (MOD)', icon: '🟠', value: m.tierCounts.MOD.toLocaleString(), unit: 'ราย', color: '#d97706' },
    { label: 'ต่ำ (LOW)', icon: '🟢', value: m.tierCounts.LOW.toLocaleString(), unit: 'ราย', color: '#059669' },
    { label: 'Major Fracture เฉลี่ย', icon: '📊', value: `${m.avgMajor}%`, unit: '10y risk', color: '#3b82f6' },
    { label: 'Hip Fracture เฉลี่ย', icon: '🦵', value: `${m.avgHip}%`, unit: '10y risk', color: '#8b5cf6' },
  ];
}

const COLUMNS = [
  { key: 'no', label: '#', width: '36px',
    cellStyle: { color: 'var(--md-text-tertiary)', fontSize: '11px' } },
  { key: 'fullname', label: 'ชื่อ-สกุล', align: 'left',
    cellStyle: { textAlign: 'left', whiteSpace: 'nowrap', fontWeight: 700 } },
  { key: 'hn', label: 'HN', cellStyle: { fontFamily: 'monospace', fontSize: '11px' } },
  { key: 'age', label: 'อายุ', render: (p) => p.age ?? '-' },
  { key: 'weight', label: 'นน. (kg)', render: (p) => p.weight ?? '-' },
  { key: 'height', label: 'สส. (cm)', render: (p) => p.height ?? '-' },
  { key: 'bmi', label: 'BMI', render: (p) => {
    if (!p.bmi) return '-';
    const c = bmiCategory(p.bmi);
    return (
      <span style={{ color: c.color, fontWeight: 700 }}>{p.bmi}</span>
    );
  } },
  { key: 'major_osteoporotic', label: 'Major %',
    headerStyle: { background: 'rgba(59,130,246,.08)', color: '#2563eb' },
    cellStyle: { background: 'rgba(59,130,246,.04)', color: '#2563eb',
      fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => p.major_osteoporotic?.toFixed(2) ?? '-' },
  { key: 'hip_fracture', label: 'Hip %',
    headerStyle: { background: 'rgba(139,92,246,.08)', color: '#7c3aed' },
    cellStyle: { background: 'rgba(139,92,246,.04)', color: '#7c3aed',
      fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => p.hip_fracture?.toFixed(2) ?? '-' },
  { key: 'tier', label: 'ความเสี่ยง', render: (p) => {
    const t = fraxTier(p.major_osteoporotic, p.hip_fracture);
    return (
      <span style={{ padding: '2px 10px', borderRadius: '99px',
        background: t.bg, color: t.color, fontSize: '10px', fontWeight: 800 }}>
        {t.label}
      </span>
    );
  } },
  { key: 'vstdate', label: 'วันที่', cellStyle: { fontSize: '11px' } },
  { key: 'pttype_name', label: 'สิทธิ์',
    cellStyle: { fontSize: '11px' }, render: (p) => p.pttype_name || '-' },
  { key: 'phone', label: 'เบอร์โทร',
    cellStyle: { fontFamily: 'monospace', fontSize: '11px' },
    render: (p) => p.phone || '-' },
];

function RiskDistribution({ tierCounts, total }) {
  const buckets = [
    { tier: 'HIGH', label: 'เสี่ยงสูง — ควรรักษา', color: '#dc2626', count: tierCounts.HIGH },
    { tier: 'MOD', label: 'ปานกลาง — ติดตามใกล้ชิด', color: '#d97706', count: tierCounts.MOD },
    { tier: 'LOW', label: 'ต่ำ — ดูแลทั่วไป', color: '#059669', count: tierCounts.LOW },
  ];
  return (
    <CardShell title="การกระจายความเสี่ยง" subtitle={`รวม ${total.toLocaleString()} ราย`}>
      {buckets.map((b) => {
        const pct = total > 0 ? Math.round(b.count / total * 100) : 0;
        return (
          <div key={b.tier} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: b.color }}>{b.label}</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color: b.color }}>
                {b.count} ({pct}%)
              </span>
            </div>
            <div style={{ height: '8px', borderRadius: '4px',
              background: 'var(--md-border)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, borderRadius: '4px',
                background: b.color, transition: 'width .5s ease' }} />
            </div>
          </div>
        );
      })}
    </CardShell>
  );
}

export function useFraxData(start, end) {
  return useReportData('/api/report/frax-patients', start, end);
}

export default function FraxReport({ data, displayLimit = 100 }) {
  const m = React.useMemo(() => computeFrax(data), [data]);
  return (
    <ReportShell loading={false} error={null} data={m} emptyMsg="ไม่มีข้อมูล FRAX">
      {m && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <KPIGrid cards={buildCards(m)} />
          <RiskDistribution tierCounts={m.tierCounts} total={m.patients.length} />
          <GenericPatientTable
            patients={m.patients}
            columns={COLUMNS}
            title="FRAX 10-Year Fracture Risk · ผู้หญิง ≥60 ปี"
            icon="🦴"
            subtitle={`${m.dateRange.start} ถึง ${m.dateRange.end} · BMD บันทึก ${m.totalBoneDensity.toLocaleString()} เคส`}
            chips={[
              { bg: 'rgba(239,68,68,.1)', fg: '#dc2626', border: 'rgba(239,68,68,.2)',
                children: `🔴 HIGH ${m.tierCounts.HIGH}` },
              { bg: 'rgba(245,158,11,.1)', fg: '#d97706', border: 'rgba(245,158,11,.2)',
                children: `🟠 MOD ${m.tierCounts.MOD}` },
              { bg: 'rgba(16,185,129,.1)', fg: '#059669', border: 'rgba(16,185,129,.2)',
                children: `🟢 LOW ${m.tierCounts.LOW}` },
            ]}
            displayLimit={displayLimit}
            minWidth="1500px"
          />
        </div>
      )}
    </ReportShell>
  );
}
