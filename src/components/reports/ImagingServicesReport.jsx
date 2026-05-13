// ============================================================
// ImagingServicesReport — บริการ XRAY / CT / Portable / BMD
// Phase H Tier 2.6 — Source recovery
// Backend: GET /api/report/imaging-services?start=&end=
//   4 modality groups classified by nondrugitems.name pattern matching
// ============================================================
import React from 'react';
import {
  KPIGrid, CardShell, GenericPatientTable, ReportShell, useReportData,
} from './_shared';

const SERVICE_COLORS = {
  XRAY:     '#3b82f6',
  CT:       '#7c3aed',
  Portable: '#f59e0b',
  BMD:      '#ec4899',
};

function computeImaging(data) {
  if (!data?.patients) return null;
  const patients = data.patients;
  const services = data.services || ['XRAY', 'CT', 'Portable', 'BMD'];
  const labels = data.service_labels || {};
  const counts = data.service_counts || Object.fromEntries(services.map((s) => [s, 0]));

  return {
    patients,
    services,
    labels,
    counts,
    totalImagingPrice: data.total_imaging_price || 0,
    totalIncome: data.total_income || 0,
    uniquePatients: data.unique_patients || new Set(patients.map((p) => p.hn)).size,
    dateRange: data.date_range || { start: '', end: '' },
  };
}

function buildCards(m) {
  return [
    { label: 'รับบริการ Imaging', icon: '📷', value: m.patients.length.toLocaleString(), unit: 'ครั้ง', color: '#10b981' },
    { label: 'HN ไม่ซ้ำ', icon: '👥', value: m.uniquePatients.toLocaleString(), unit: 'ราย', color: '#0ea5e9' },
    { label: 'XRAY', icon: '🩻', value: m.counts.XRAY.toLocaleString(), unit: 'ครั้ง', color: SERVICE_COLORS.XRAY },
    { label: 'CT', icon: '🧠', value: m.counts.CT.toLocaleString(), unit: 'ครั้ง', color: SERVICE_COLORS.CT },
    { label: 'Portable', icon: '🛏️', value: m.counts.Portable.toLocaleString(), unit: 'ครั้ง', color: SERVICE_COLORS.Portable },
    { label: 'BMD', icon: '🦴', value: m.counts.BMD.toLocaleString(), unit: 'ครั้ง', color: SERVICE_COLORS.BMD },
    { label: 'ค่า Imaging', icon: '💰', value: m.totalImagingPrice.toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'บาท', color: '#3b82f6' },
  ];
}

function ServiceMix({ counts, labels, totalPatients }) {
  const sorted = Object.entries(counts).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  return (
    <CardShell title="สัดส่วน Modality"
      subtitle={`${totalPatients.toLocaleString()} visits (1 visit อาจมี modality หลายชนิด)`}>
      {sorted.map(([svc, count]) => {
        const pct = totalPatients > 0 ? Math.round(count / totalPatients * 100) : 0;
        const color = SERVICE_COLORS[svc] || '#94a3b8';
        const label = labels[svc] || svc;
        return (
          <div key={svc} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span title={label} style={{ fontSize: '11px', fontWeight: 700,
                color: 'var(--md-text-secondary)' }}>{label}</span>
              <span style={{ fontSize: '11px', fontWeight: 800, color }}>
                {count} ({pct}%)
              </span>
            </div>
            <div style={{ height: '8px', borderRadius: '4px',
              background: 'var(--md-border)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, borderRadius: '4px',
                background: color, transition: 'width .5s ease' }} />
            </div>
          </div>
        );
      })}
    </CardShell>
  );
}

const COLUMNS = [
  { key: 'no', label: '#', width: '36px',
    cellStyle: { color: 'var(--md-text-tertiary)', fontSize: '11px' } },
  { key: 'pt_name', label: 'ชื่อ-สกุล', align: 'left',
    cellStyle: { textAlign: 'left', whiteSpace: 'nowrap', fontWeight: 700 } },
  { key: 'hn', label: 'HN', cellStyle: { fontFamily: 'monospace', fontSize: '11px' } },
  { key: 'sex', label: 'เพศ', render: (p) => {
    const m = p.sex === '1' || p.sex === 'ช';
    const f = p.sex === '2' || p.sex === 'ญ';
    return m ? '♂' : f ? '♀' : '-';
  } },
  { key: 'age_y', label: 'อายุ', render: (p) => p.age_y ?? '-' },
  { key: 'vstdate', label: 'วันที่', cellStyle: { fontSize: '11px' } },
  { key: 'department', label: 'แผนก', cellStyle: { fontSize: '11px' },
    render: (p) => p.department || '-' },
  { key: 'service_groups', label: 'Modality', align: 'left',
    cellStyle: { textAlign: 'left', fontSize: '11px' },
    render: (p) => {
      const groups = (p.service_groups || '').split(',').map((s) => s.trim()).filter(Boolean);
      if (groups.length === 0) return '-';
      return (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {groups.map((g) => (
            <span key={g} style={{ padding: '2px 8px', borderRadius: '6px',
              fontSize: '10px', fontWeight: 800,
              background: `${SERVICE_COLORS[g] || '#94a3b8'}15`,
              color: SERVICE_COLORS[g] || '#94a3b8',
              border: `1px solid ${SERVICE_COLORS[g] || '#94a3b8'}30` }}>
              {g}
            </span>
          ))}
        </div>
      );
    } },
  { key: 'service_names', label: 'บริการ', align: 'left',
    cellStyle: { textAlign: 'left', fontSize: '11px',
      maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' },
    render: (p) => p.service_names || '-' },
  { key: 'icd10', label: 'ICD-10',
    headerStyle: { background: 'rgba(16,185,129,.06)', color: '#059669' },
    cellStyle: { background: 'rgba(16,185,129,.03)', color: '#059669',
      fontFamily: 'monospace', fontWeight: 700, fontSize: '11px' },
    render: (p) => p.icd10 || '-' },
  { key: 'imaging_price', label: 'ค่า Imaging',
    headerStyle: { background: 'rgba(139,92,246,.06)', color: '#7c3aed' },
    cellStyle: { background: 'rgba(139,92,246,.03)', color: '#7c3aed',
      fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => (p.imaging_price || 0).toLocaleString() },
  { key: 'income', label: 'ยอดเงิน',
    headerStyle: { background: 'rgba(59,130,246,.08)', color: '#2563eb' },
    cellStyle: { background: 'rgba(59,130,246,.04)', color: '#2563eb',
      fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => (p.income || 0).toLocaleString() },
];

export function useImagingData(start, end) {
  return useReportData('/api/report/imaging-services', start, end);
}

export default function ImagingServicesReport({ data, displayLimit = 100 }) {
  const m = React.useMemo(() => computeImaging(data), [data]);
  return (
    <ReportShell loading={false} error={null} data={m} emptyMsg="ไม่มีข้อมูล Imaging">
      {m && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <KPIGrid cards={buildCards(m)} />
          <ServiceMix counts={m.counts} labels={m.labels}
            totalPatients={m.patients.length} />
          <GenericPatientTable
            patients={m.patients}
            columns={COLUMNS}
            title="บริการ XRAY / CT / Portable / BMD"
            icon="📷"
            subtitle={`${m.dateRange.start} ถึง ${m.dateRange.end}`}
            chips={[
              { bg: 'rgba(16,185,129,.1)', fg: '#059669', border: 'rgba(16,185,129,.2)',
                children: `${m.patients.length.toLocaleString()} visits` },
              { bg: 'rgba(59,130,246,.1)', fg: SERVICE_COLORS.XRAY, border: 'rgba(59,130,246,.2)',
                children: `XRAY ${m.counts.XRAY}` },
              { bg: 'rgba(124,58,237,.1)', fg: SERVICE_COLORS.CT, border: 'rgba(124,58,237,.2)',
                children: `CT ${m.counts.CT}` },
              { bg: 'rgba(245,158,11,.1)', fg: SERVICE_COLORS.Portable, border: 'rgba(245,158,11,.2)',
                children: `Portable ${m.counts.Portable}` },
              { bg: 'rgba(236,72,153,.1)', fg: SERVICE_COLORS.BMD, border: 'rgba(236,72,153,.2)',
                children: `BMD ${m.counts.BMD}` },
            ]}
            displayLimit={displayLimit}
            minWidth="1600px"
          />
        </div>
      )}
    </ReportShell>
  );
}
