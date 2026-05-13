// ============================================================
// NcdDiseaseReport — รายงานผู้รับบริการ NCD แยกโรค
// Phase H Tier 2.5 — Source recovery
// Backend: GET /api/report/ncd-patients?start=&end=
//   Filters: main_dep=024 (OPD-only) + NCD disease groups
//   Returns: patients with disease_groups (DM/HT/DLP/IHD/Stroke/COPD/CKD1-5)
//   + computed CKD stage from eGFR (CKD-EPI 2009)
// ============================================================
import React from 'react';
import {
  KPIGrid, CardShell, GenericPatientTable, ReportShell, useReportData,
} from './_shared';

// Disease group colors (clinician convention — keep distinct hues)
const DISEASE_COLORS = {
  DM:    '#ef4444', // diabetes — red
  HT:    '#f59e0b', // hypertension — amber
  DLP:   '#eab308', // dyslipidemia — yellow
  IHD:   '#dc2626', // ischemic heart — dark red
  Stroke: '#7c3aed', // stroke — purple
  COPD:  '#0891b2', // copd — cyan
  CKD1:  '#a3e635', // ckd stages — green gradient
  CKD2:  '#84cc16',
  CKD3:  '#65a30d',
  CKD4:  '#4d7c0f',
  CKD5:  '#365314',
  CKD:   '#10b981',
};

function computeNcd(data) {
  if (!data?.patients) return null;
  const patients = data.patients;
  const diseases = data.diseases || ['DM', 'HT', 'DLP', 'IHD', 'Stroke', 'COPD', 'CKD1', 'CKD2', 'CKD3', 'CKD4', 'CKD5'];
  const labels = data.disease_labels || {};

  // Disease counts (use server-provided if available; else compute)
  let diseaseCounts;
  if (data.disease_counts) {
    diseaseCounts = data.disease_counts;
  } else {
    diseaseCounts = Object.fromEntries(diseases.map((d) => [d, 0]));
    patients.forEach((p) => {
      const groups = (p.disease_groups || '').split(',').map((s) => s.trim()).filter(Boolean);
      groups.forEach((g) => {
        if (g in diseaseCounts) diseaseCounts[g] += 1;
      });
    });
  }

  return {
    patients,
    diseases,
    labels,
    diseaseCounts,
    uniquePatients: data.unique_patients || new Set(patients.map((p) => p.hn)).size,
    totalIncome: data.total_income || 0,
    ckdTotalPatients: data.ckd_total_patients || 0,
    ckdWithEgfr: data.ckd_with_egfr || 0,
    ckdAvgEgfr: data.ckd_avg_egfr,
    dateRange: data.date_range || { start: '', end: '' },
  };
}

function buildCards(m) {
  const total = m.patients.length;
  const topDisease = Object.entries(m.diseaseCounts)
    .filter(([k]) => !k.startsWith('CKD') || k === 'CKD')
    .sort((a, b) => b[1] - a[1])[0];

  return [
    { label: 'รับบริการรวม (Visit)', icon: '🩺', value: total.toLocaleString(), unit: 'ครั้ง', color: '#10b981' },
    { label: 'ผู้ป่วยไม่ซ้ำ (HN)', icon: '👥', value: m.uniquePatients.toLocaleString(), unit: 'ราย', color: '#0ea5e9' },
    topDisease && {
      label: `เด่นสุด: ${topDisease[0]}`, icon: '📊',
      value: topDisease[1].toLocaleString(), unit: 'เคส',
      color: DISEASE_COLORS[topDisease[0]] || '#8b5cf6',
    },
    m.ckdTotalPatients > 0 && {
      label: 'CKD รวม',
      icon: '🫘',
      value: m.ckdTotalPatients.toLocaleString(),
      unit: m.ckdAvgEgfr != null ? `ราย · เฉลี่ย eGFR ${m.ckdAvgEgfr}` : 'ราย',
      color: '#4d7c0f',
    },
    { label: 'รายได้รวม', icon: '💰', value: m.totalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 }), unit: 'บาท', color: '#3b82f6' },
  ].filter(Boolean);
}

function DiseaseBreakdown({ diseaseCounts, labels, totalPatients }) {
  const sorted = Object.entries(diseaseCounts)
    .filter(([k, v]) => v > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <CardShell title="สัดส่วนตามกลุ่มโรค NCD" subtitle={`รวม ${totalPatients.toLocaleString()} visits (1 visit อาจมีหลายโรค)`}>
      {sorted.map(([disease, count]) => {
        const pct = totalPatients > 0 ? Math.round(count / totalPatients * 100) : 0;
        const color = DISEASE_COLORS[disease] || '#94a3b8';
        const label = labels[disease] || disease;
        return (
          <div key={disease} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span title={label} style={{ fontSize: '11px', fontWeight: 700,
                color: 'var(--md-text-secondary)', maxWidth: '70%',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {label}
              </span>
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
  { key: 'age_y', label: 'อายุ', render: (p) => p.age_y ?? '-' },
  { key: 'vstdate', label: 'วันที่', cellStyle: { fontSize: '11px' } },
  { key: 'disease_groups', label: 'กลุ่มโรค', align: 'left',
    cellStyle: { textAlign: 'left', fontSize: '11px' },
    render: (p) => {
      const groups = (p.disease_groups || '').split(',').map((s) => s.trim()).filter(Boolean);
      if (groups.length === 0) return '-';
      return (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {groups.map((g) => (
            <span key={g} style={{ padding: '1px 7px', borderRadius: '99px',
              fontSize: '9px', fontWeight: 800,
              background: `${DISEASE_COLORS[g] || '#94a3b8'}15`,
              color: DISEASE_COLORS[g] || '#94a3b8',
              border: `1px solid ${DISEASE_COLORS[g] || '#94a3b8'}30` }}>
              {g}
            </span>
          ))}
        </div>
      );
    } },
  { key: 'creatinine', label: 'Cr',
    render: (p) => p.creatinine ?? '-' },
  { key: 'egfr', label: 'eGFR',
    cellStyle: { fontFamily: 'monospace', fontSize: '11px' },
    render: (p) => p.egfr ?? '-' },
  { key: 'ckd_stage', label: 'CKD Stage',
    render: (p) => p.ckd_stage ? (
      <span style={{ padding: '2px 7px', borderRadius: '99px', fontSize: '10px',
        fontWeight: 800, background: 'rgba(101,163,13,.12)', color: '#65a30d' }}>
        {p.ckd_stage}
      </span>
    ) : '-' },
  { key: 'icd10', label: 'ICD-10',
    headerStyle: { background: 'rgba(16,185,129,.06)', color: '#059669' },
    cellStyle: { background: 'rgba(16,185,129,.03)', color: '#059669',
      fontFamily: 'monospace', fontWeight: 700, fontSize: '11px' },
    render: (p) => p.icd10 || '-' },
  { key: 'income', label: 'ยอดเงิน',
    headerStyle: { background: 'rgba(59,130,246,.08)', color: '#2563eb' },
    cellStyle: { background: 'rgba(59,130,246,.04)', color: '#2563eb',
      fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
    render: (p) => (p.income || 0).toLocaleString() },
];

export function useNcdData(start, end) {
  return useReportData('/api/report/ncd-patients', start, end);
}

export default function NcdDiseaseReport({ data, displayLimit = 100 }) {
  const m = React.useMemo(() => computeNcd(data), [data]);
  return (
    <ReportShell loading={false} error={null} data={m} emptyMsg="ไม่มีข้อมูล NCD">
      {m && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <KPIGrid cards={buildCards(m)} />
          <DiseaseBreakdown diseaseCounts={m.diseaseCounts} labels={m.labels}
            totalPatients={m.patients.length} />
          <GenericPatientTable
            patients={m.patients}
            columns={COLUMNS}
            title="รายงาน NCD แยกโรค (DM·HT·DLP·IHD·Stroke·COPD·CKD)"
            icon="🩺"
            subtitle={`${m.dateRange.start} ถึง ${m.dateRange.end} · OPD only (main_dep=024)`}
            chips={[
              { bg: 'rgba(16,185,129,.1)', fg: '#059669', border: 'rgba(16,185,129,.2)',
                children: `${m.patients.length.toLocaleString()} visits` },
              { bg: 'rgba(14,165,233,.1)', fg: '#0284c7', border: 'rgba(14,165,233,.2)',
                children: `${m.uniquePatients.toLocaleString()} HN` },
              ...(m.ckdTotalPatients > 0 ? [{
                bg: 'rgba(101,163,13,.1)', fg: '#65a30d', border: 'rgba(101,163,13,.2)',
                children: `CKD ${m.ckdTotalPatients}`,
              }] : []),
            ]}
            displayLimit={displayLimit}
            minWidth="1600px"
          />
        </div>
      )}
    </ReportShell>
  );
}
