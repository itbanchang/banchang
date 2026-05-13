// ============================================================
// FluorideReport — รายงานการเคลือบฟลูออไรด์ 25-59 ปี
// Phase H Tier 2.1 — Source recovery from ReportTab-PTSVC09 bundle
//
// Bundle reference: scripts/_tier1-decompile/ReportTab-PTSVC09-active.beauty.js
//   Data loader: line 1198-1209 (Du)
//   JSX render:  line 2531+ (Excel), patient list elsewhere
//
// Backend: GET /api/report/fluoride-patients?start=&end=
//   Filter: opitemrece icode=3004640 + age 25-59 + dental dept
// ============================================================
import React from 'react';
import {
  KPIGrid, CardShell, DeptBreakdown, AgeGroups, Icd10Top10, DailyTrend,
  GenericPatientTable, ReportShell, useReportData,
  buildYoyChip, aggregateIcd10, aggregateByDept, buildDailyTrend,
  TD_STYLE,
} from './_shared';

const AGE_BUCKETS_2559 = { '25-34': 0, '35-44': 0, '45-54': 0, '55-59': 0 };

function computeFluoride(data) {
  if (!data?.patients) return null;
  const patients = data.patients;
  const totalIncome = data.total_income ?? patients.reduce((s, p) => s + p.income, 0);
  const totalFluoridePrice = data.total_fluoride_price ?? patients.reduce((s, p) => s + (p.fluoride_price || 0), 0);
  const avgIncomePerVisit = patients.length > 0 ? Math.round(totalIncome / patients.length) : 0;
  const uniqueHn = new Set(patients.map((p) => p.hn).filter(Boolean)).size;

  const ageGroups = { ...AGE_BUCKETS_2559 };
  patients.forEach((p) => {
    const a = Number(p.age_y) || 0;
    if (a < 35) ageGroups['25-34'] += 1;
    else if (a < 45) ageGroups['35-44'] += 1;
    else if (a < 55) ageGroups['45-54'] += 1;
    else ageGroups['55-59'] += 1;
  });
  const ageGroupMax = Math.max(...Object.values(ageGroups), 1);

  const top10 = aggregateIcd10(patients);
  const top10Max = top10.length > 0 ? top10[0].count : 1;
  const deptList = aggregateByDept(patients);
  const dailyTrend = buildDailyTrend(patients);
  const dailyMaxCount = Math.max(...dailyTrend.map((d) => d.count), 1);

  return {
    patients, totalIncome, totalFluoridePrice, avgIncomePerVisit, uniqueHn,
    ageGroups, ageGroupMax, top10, top10Max, deptList,
    dailyTrend, dailyMaxCount,
    dateRange: data.date_range || { start: '', end: '' },
  };
}

function buildCards(m) {
  return [
    { label: 'ผู้รับบริการ (Visit)', icon: '🦷', value: m.patients.length.toLocaleString(), unit: 'ครั้ง', color: '#10b981' },
    { label: 'HN ไม่ซ้ำ', icon: '👥', value: m.uniqueHn.toLocaleString(), unit: 'ราย', color: '#0ea5e9' },
    { label: 'ค่าฟลูออไรด์', icon: '💊', value: m.totalFluoridePrice.toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'บาท', color: '#8b5cf6' },
    { label: 'รายได้รวม', icon: '💰', value: m.totalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'บาท', color: '#3b82f6' },
    { label: 'เฉลี่ย / ราย', icon: '📊', value: m.avgIncomePerVisit.toLocaleString(), unit: 'บาท', color: '#f59e0b' },
    { label: 'แผนก', icon: '🏥', value: m.deptList.length, unit: 'แผนก', color: '#ec4899' },
  ];
}

const COLUMNS = [
  { key: 'no', label: '#', width: '36px', cellStyle: { color: 'var(--md-text-tertiary)', fontSize: '11px' } },
  { key: 'pt_name', label: 'ชื่อ-สกุล', align: 'left',
    cellStyle: { textAlign: 'left', whiteSpace: 'nowrap', fontWeight: 700 } },
  { key: 'hn', label: 'HN', cellStyle: { fontFamily: 'monospace', fontSize: '11px' } },
  { key: 'age_y', label: 'อายุ', render: (p) => p.age_y ?? '-' },
  { key: 'cid', label: 'เลขบัตรประชาชน',
    cellStyle: { fontFamily: 'monospace', fontSize: '10px' },
    render: (p) => p.cid || '-' },
  { key: 'vstdate', label: 'วันที่', cellStyle: { fontSize: '11px' } },
  { key: 'department', label: 'แผนก', cellStyle: { fontSize: '11px' } },
  { key: 'address', label: 'ที่อยู่', align: 'left',
    cellStyle: { textAlign: 'left', fontSize: '11px', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' },
    render: (p) => p.address || '-' },
  { key: 'mobile_phone_number', label: 'เบอร์โทร',
    cellStyle: { fontFamily: 'monospace', fontSize: '11px' },
    render: (p) => p.mobile_phone_number || '-' },
  { key: 'fluoride_price', label: 'ค่าฟลูออไรด์',
    headerStyle: { background: 'rgba(139,92,246,.06)', color: '#7c3aed' },
    cellStyle: { background: 'rgba(139,92,246,.03)', color: '#7c3aed', fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => (p.fluoride_price || 0).toLocaleString() },
  { key: 'income', label: 'ยอดเงิน',
    headerStyle: { background: 'rgba(59,130,246,.08)', color: '#2563eb' },
    cellStyle: { background: 'rgba(59,130,246,.04)', color: '#2563eb', fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => (p.income || 0).toLocaleString() },
];

export function useFluorideData(start, end) {
  return useReportData('/api/report/fluoride-patients', start, end);
}

export default function FluorideReport({ data, displayLimit = 100 }) {
  const m = React.useMemo(() => computeFluoride(data), [data]);
  return (
    <ReportShell loading={false} error={null} data={m} emptyMsg="ไม่มีข้อมูลเคลือบฟลูออไรด์">
      {m && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <KPIGrid cards={buildCards(m)} />
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            <DeptBreakdown deptList={m.deptList} totalPatients={m.patients.length} />
            <AgeGroups ageGroups={m.ageGroups} ageGroupMax={m.ageGroupMax}
              title="กลุ่มอายุ (25-59 ปี)" />
            <Icd10Top10 top10Icd10={m.top10} top10MaxCount={m.top10Max} />
          </div>
          <DailyTrend dailyTrend={m.dailyTrend} dailyMaxCount={m.dailyMaxCount}
            subtitle={`${m.dailyTrend.length} วัน · เคลือบ ${m.patients.length.toLocaleString()} ครั้ง · รวม ${m.totalFluoridePrice.toLocaleString()} บาท (ค่าฟลูออไรด์)`} />
          <GenericPatientTable
            patients={m.patients}
            columns={COLUMNS}
            title="รายละเอียดการเคลือบฟลูออไรด์"
            icon="🦷"
            subtitle={`${m.dateRange.start} ถึง ${m.dateRange.end}`}
            chips={[
              { bg: 'rgba(16,185,129,.1)', fg: '#059669', border: 'rgba(16,185,129,.2)',
                children: `${m.patients.length.toLocaleString()} ครั้ง` },
              { bg: 'rgba(139,92,246,.1)', fg: '#7c3aed', border: 'rgba(139,92,246,.2)',
                children: `${m.totalFluoridePrice.toLocaleString()} บาท (ฟลูออไรด์)` },
              { bg: 'rgba(59,130,246,.1)', fg: '#2563eb', border: 'rgba(59,130,246,.2)',
                children: `${m.totalIncome.toLocaleString()} บาท (รวม)` },
            ]}
            displayLimit={displayLimit}
            minWidth="1400px"
          />
        </div>
      )}
    </ReportShell>
  );
}
