// ============================================================
// ElderlyCxrReport — รายงานผู้สูงอายุ 60+ ที่มี CXR
// Phase H Tier 2.2 — Source recovery
// Backend: GET /api/report/elderly-cxr?start=&end=
//   Filter: opitemrece icode in CXR_ICODES + age 60+
// ============================================================
import React from 'react';
import {
  KPIGrid, AgeGroups, Icd10Top10, DeptBreakdown, DailyTrend,
  GenericPatientTable, ReportShell, useReportData,
  aggregateIcd10, aggregateByDept, buildDailyTrend, CardShell,
} from './_shared';

const AGE_BUCKETS_60 = { '60-69': 0, '70-79': 0, '80+': 0 };

function computeElderly(data) {
  if (!data?.patients) return null;
  const patients = data.patients;
  const totalIncome = data.total_income ?? patients.reduce((s, p) => s + p.income, 0);
  const totalCxrPrice = data.total_cxr_price ?? patients.reduce((s, p) => s + (p.cxr_price || 0), 0);
  const uniqueHn = new Set(patients.map((p) => p.hn).filter(Boolean)).size;

  // Gender split
  const maleCount = patients.filter((p) => p.sex === '1' || p.sex === 'ช').length;
  const femaleCount = patients.filter((p) => p.sex === '2' || p.sex === 'ญ').length;

  const ageGroups = { ...AGE_BUCKETS_60 };
  patients.forEach((p) => {
    const a = Number(p.age_y) || 0;
    if (a < 70) ageGroups['60-69'] += 1;
    else if (a < 80) ageGroups['70-79'] += 1;
    else ageGroups['80+'] += 1;
  });
  const ageGroupMax = Math.max(...Object.values(ageGroups), 1);

  const top10 = aggregateIcd10(patients);
  const top10Max = top10.length > 0 ? top10[0].count : 1;
  const deptList = aggregateByDept(patients);
  const dailyTrend = buildDailyTrend(patients);
  const dailyMaxCount = Math.max(...dailyTrend.map((d) => d.count), 1);

  return {
    patients, totalIncome, totalCxrPrice, uniqueHn,
    maleCount, femaleCount,
    ageGroups, ageGroupMax, top10, top10Max, deptList,
    dailyTrend, dailyMaxCount,
    dateRange: data.date_range || { start: '', end: '' },
  };
}

function buildCards(m) {
  const malePct = m.patients.length > 0 ? Math.round(m.maleCount / m.patients.length * 100) : 0;
  const femalePct = m.patients.length > 0 ? Math.round(m.femaleCount / m.patients.length * 100) : 0;
  return [
    { label: 'ผู้รับบริการ CXR', icon: '🫁', value: m.patients.length.toLocaleString(), unit: 'ครั้ง', color: '#10b981' },
    { label: 'HN ไม่ซ้ำ', icon: '👥', value: m.uniqueHn.toLocaleString(), unit: 'ราย', color: '#0ea5e9' },
    { label: 'เพศชาย', icon: '👨', value: m.maleCount.toLocaleString(), unit: `ราย (${malePct}%)`, color: '#3b82f6' },
    { label: 'เพศหญิง', icon: '👩', value: m.femaleCount.toLocaleString(), unit: `ราย (${femalePct}%)`, color: '#ec4899' },
    { label: 'ค่า CXR', icon: '📷', value: m.totalCxrPrice.toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'บาท', color: '#8b5cf6' },
    { label: 'รายได้รวม', icon: '💰', value: m.totalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'บาท', color: '#f59e0b' },
  ];
}

const COLUMNS = [
  { key: 'no', label: '#', width: '36px', cellStyle: { color: 'var(--md-text-tertiary)', fontSize: '11px' } },
  { key: 'pt_name', label: 'ชื่อ-สกุล', align: 'left',
    cellStyle: { textAlign: 'left', whiteSpace: 'nowrap', fontWeight: 700 } },
  { key: 'hn', label: 'HN', cellStyle: { fontFamily: 'monospace', fontSize: '11px' } },
  { key: 'sex', label: 'เพศ', render: (p) => {
    const m = p.sex === '1' || p.sex === 'ช';
    const f = p.sex === '2' || p.sex === 'ญ';
    return m ? '♂ ชาย' : f ? '♀ หญิง' : '-';
  } },
  { key: 'age_y', label: 'อายุ', render: (p) => p.age_y ?? '-' },
  { key: 'vstdate', label: 'วันที่', cellStyle: { fontSize: '11px' } },
  { key: 'department', label: 'แผนก', cellStyle: { fontSize: '11px' }, render: (p) => p.department || '-' },
  { key: 'cxr_name', label: 'ชนิด CXR', align: 'left',
    cellStyle: { textAlign: 'left', fontSize: '11px' },
    render: (p) => p.cxr_name || '-' },
  { key: 'icd10', label: 'ICD-10',
    headerStyle: { background: 'rgba(16,185,129,.06)', color: '#059669' },
    cellStyle: { background: 'rgba(16,185,129,.03)', color: '#059669',
      fontFamily: 'monospace', fontWeight: 700, fontSize: '11px' },
    render: (p) => p.icd10 || '-' },
  { key: 'icd10name', label: 'ชื่อโรค', align: 'left',
    cellStyle: { textAlign: 'left', fontSize: '11px', maxWidth: '200px',
      overflow: 'hidden', textOverflow: 'ellipsis' },
    render: (p) => p.icd10name || '-' },
  { key: 'cxr_price', label: 'ค่า CXR',
    headerStyle: { background: 'rgba(139,92,246,.06)', color: '#7c3aed' },
    cellStyle: { background: 'rgba(139,92,246,.03)', color: '#7c3aed',
      fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => (p.cxr_price || 0).toLocaleString() },
  { key: 'income', label: 'ยอดเงิน',
    headerStyle: { background: 'rgba(59,130,246,.08)', color: '#2563eb' },
    cellStyle: { background: 'rgba(59,130,246,.04)', color: '#2563eb',
      fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => (p.income || 0).toLocaleString() },
];

function GenderSplitCard({ maleCount, femaleCount, total }) {
  const malePct = total > 0 ? Math.round(maleCount / total * 100) : 0;
  const femalePct = total > 0 ? Math.round(femaleCount / total * 100) : 0;
  return (
    <CardShell title="สัดส่วนเพศ" subtitle={`รวม ${total.toLocaleString()} ครั้ง`}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
        <div style={{ flex: 1, padding: '12px', borderRadius: '12px',
          background: 'rgba(59,130,246,.06)', textAlign: 'center' }}>
          <div style={{ fontSize: '20px' }} aria-hidden="true">👨</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#3b82f6',
            fontVariantNumeric: 'tabular-nums' }}>{maleCount.toLocaleString()}</div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6' }}>
            ชาย ({malePct}%)
          </div>
        </div>
        <div style={{ flex: 1, padding: '12px', borderRadius: '12px',
          background: 'rgba(236,72,153,.06)', textAlign: 'center' }}>
          <div style={{ fontSize: '20px' }} aria-hidden="true">👩</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#ec4899',
            fontVariantNumeric: 'tabular-nums' }}>{femaleCount.toLocaleString()}</div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#ec4899' }}>
            หญิง ({femalePct}%)
          </div>
        </div>
      </div>
    </CardShell>
  );
}

export function useElderlyCxrData(start, end) {
  return useReportData('/api/report/elderly-cxr', start, end);
}

export default function ElderlyCxrReport({ data, displayLimit = 100 }) {
  const m = React.useMemo(() => computeElderly(data), [data]);
  return (
    <ReportShell loading={false} error={null} data={m} emptyMsg="ไม่มีข้อมูล Elderly CXR">
      {m && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <KPIGrid cards={buildCards(m)} />
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            <GenderSplitCard maleCount={m.maleCount} femaleCount={m.femaleCount} total={m.patients.length} />
            <AgeGroups ageGroups={m.ageGroups} ageGroupMax={m.ageGroupMax}
              title="กลุ่มอายุ (60+ ปี)" />
            <DeptBreakdown deptList={m.deptList} totalPatients={m.patients.length} />
            <Icd10Top10 top10Icd10={m.top10} top10MaxCount={m.top10Max} />
          </div>
          <DailyTrend dailyTrend={m.dailyTrend} dailyMaxCount={m.dailyMaxCount}
            subtitle={`${m.dailyTrend.length} วัน · ${m.patients.length.toLocaleString()} ครั้ง CXR · รวม ${m.totalCxrPrice.toLocaleString()} บาท`} />
          <GenericPatientTable
            patients={m.patients}
            columns={COLUMNS}
            title="รายละเอียดผู้สูงอายุที่มี CXR"
            icon="🫁"
            subtitle={`${m.dateRange.start} ถึง ${m.dateRange.end}`}
            chips={[
              { bg: 'rgba(16,185,129,.1)', fg: '#059669', border: 'rgba(16,185,129,.2)',
                children: `${m.patients.length.toLocaleString()} ครั้ง` },
              { bg: 'rgba(59,130,246,.1)', fg: '#3b82f6', border: 'rgba(59,130,246,.2)',
                children: `ชาย ${m.maleCount.toLocaleString()}` },
              { bg: 'rgba(236,72,153,.1)', fg: '#ec4899', border: 'rgba(236,72,153,.2)',
                children: `หญิง ${m.femaleCount.toLocaleString()}` },
            ]}
            displayLimit={displayLimit}
            minWidth="1500px"
          />
        </div>
      )}
    </ReportShell>
  );
}
