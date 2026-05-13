// ============================================================
// ServicePlanScorecard — MoPH Service Plan 2566-2570
// 16 สาขาบริการ ระดับ F2 รพช.
//
// Phase H Tier 4.1 — Strategic positioning (STUB)
// Next session: wire to real data from /api/service-plan or build endpoint.
// ============================================================
import React from 'react';
import { CardShell, KPIGrid } from '../reports/_shared';

// 16 Service Plan สาขา per MoPH 2566-2570
// status: 'tracked' = has KPI in BCH 360° dashboard, 'partial', 'missing'
const SERVICE_PLAN = [
  { id: 'ecs', name: 'Emergency Care System (ECS)', icon: '🚑', status: 'tracked',
    note: 'ER 18 KPIs ครบ — Door-to-Doctor, LWBS, Re-visit 48h, L1-2 Refer, ED LOS, Mortality, STEMI/Stroke bundle', tab: 'ER' },
  { id: 'cardiac', name: 'Cardiac (STEMI Bundle)', icon: '🫀', status: 'partial',
    note: 'STEMI Pre-Refer Bundle tracked. Door-to-Balloon locked by datetime compliance 0%', tab: 'ER' },
  { id: 'stroke', name: 'Stroke (Fast Track)', icon: '🧠', status: 'partial',
    note: 'Door-to-CT tracked. Door-to-Needle locked by datetime compliance 1.1%', tab: 'ER' },
  { id: 'sepsis', name: 'Sepsis Hour-1 Bundle', icon: '🤧', status: 'missing',
    note: 'Pending Tier 4.2 — lactate + BC + ATB + 30ml/kg fluid', tab: null },
  { id: 'mch', name: 'MCH (Maternal & Child Health)', icon: '🤰', status: 'missing',
    note: 'Pending Tier 4.2 — ANC ≥5 ครั้ง, LBW <7%, Maternal Mortality', tab: null },
  { id: 'ncd', name: 'NCD (DM/HT/CKD/COPD)', icon: '💉', status: 'tracked',
    note: 'NCD tab + compliance + CKD stage from eGFR', tab: 'NCD' },
  { id: 'dental', name: 'Dental (DMFT)', icon: '🦷', status: 'partial',
    note: 'Dental tab exists; DMFT scorecard pending', tab: 'Dental' },
  { id: 'thaimed', name: 'Thai/Alternative Medicine', icon: '🌿', status: 'tracked',
    note: 'ThaiMed tab', tab: 'ThaiMed' },
  { id: 'pt', name: 'Physical Therapy + PMC', icon: '🏃', status: 'tracked',
    note: 'PT/Staff Report restored Tier 1.1 (PMC office syndrome + 3 PMC PT clinics)', tab: 'Report (PT)' },
  { id: 'ltc', name: 'Long-term Care (LTC)', icon: '👴', status: 'missing',
    note: 'Pending Tier 4.2 — Elderly fall, bedridden, ADL tracking', tab: null },
  { id: 'palliative', name: 'Palliative Care', icon: '🕊️', status: 'missing',
    note: 'Pending Tier 4.2 — Z51.5 registry + symptom score', tab: null },
  { id: 'mental', name: 'Mental Health', icon: '🧠', status: 'missing',
    note: 'Pending Tier 4.2 — F00-F99 visits + suicide screening', tab: null },
  { id: 'eye', name: 'Eye Care (Cataract)', icon: '👁️', status: 'missing',
    note: 'Pending Tier 4.2 — pre-op + post-op outcome', tab: null },
  { id: 'oral', name: 'Oral Health (Dental Caries)', icon: '🦷', status: 'partial',
    note: 'Included in Dental tab', tab: 'Dental' },
  { id: 'ic', name: 'Infection Control (HAI)', icon: '🦠', status: 'partial',
    note: 'HAI placeholders only — Tier 2.x HAI Registry pending', tab: null },
  { id: 'lab', name: 'Lab + Imaging', icon: '🩸', status: 'tracked',
    note: 'Laboratory + XRAY tabs + Imaging Services Report restored Tier 2.6', tab: 'Lab' },
];

const STATUS_CONFIG = {
  tracked: { color: '#059669', icon: '✅', label: 'มี KPI ครอบคลุม' },
  partial: { color: '#d97706', icon: '🟡', label: 'มีบางส่วน' },
  missing: { color: '#dc2626', icon: '🔴', label: 'ยังไม่มี' },
};

function getCounts() {
  const tracked = SERVICE_PLAN.filter((s) => s.status === 'tracked').length;
  const partial = SERVICE_PLAN.filter((s) => s.status === 'partial').length;
  const missing = SERVICE_PLAN.filter((s) => s.status === 'missing').length;
  return { tracked, partial, missing, total: SERVICE_PLAN.length };
}

function ServiceCard({ service }) {
  const cfg = STATUS_CONFIG[service.status];
  return (
    <div style={{
      background: 'var(--md-surface)',
      border: `1px solid ${cfg.color}30`,
      borderLeft: `3px solid ${cfg.color}`,
      borderRadius: '10px',
      padding: '12px 14px',
      transition: 'transform .15s ease',
      cursor: service.tab ? 'pointer' : 'default',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
        <span style={{ fontSize: '20px' }} aria-hidden="true">{service.icon}</span>
        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-primary)', flex: 1 }}>
          {service.name}
        </span>
        <span style={{ fontSize: '14px' }} aria-hidden="true">{cfg.icon}</span>
      </div>
      <div style={{ fontSize: '10px', fontWeight: 600,
        color: 'var(--md-text-secondary)', lineHeight: 1.5,
        marginBottom: service.tab ? '4px' : 0 }}>
        {service.note}
      </div>
      {service.tab && (
        <span style={{ fontSize: '9px', fontWeight: 800, color: cfg.color,
          background: `${cfg.color}10`, padding: '2px 6px', borderRadius: '4px' }}>
          ➜ ดูในแท็บ {service.tab}
        </span>
      )}
    </div>
  );
}

export default function ServicePlanScorecard() {
  const counts = getCounts();
  const coveragePct = Math.round((counts.tracked + counts.partial * 0.5) / counts.total * 100);

  const cards = [
    { label: 'มีครอบคลุม', icon: '✅', value: counts.tracked, unit: `/${counts.total} สาขา`, color: '#059669' },
    { label: 'มีบางส่วน', icon: '🟡', value: counts.partial, unit: `/${counts.total} สาขา`, color: '#d97706' },
    { label: 'ยังไม่มี', icon: '🔴', value: counts.missing, unit: `/${counts.total} สาขา`, color: '#dc2626' },
    { label: 'Coverage Score', icon: '📊', value: `${coveragePct}%`,
      unit: 'weighted', color: coveragePct >= 80 ? '#059669' : coveragePct >= 60 ? '#d97706' : '#dc2626' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <CardShell title="MoPH Service Plan 2566-2570 — 16 สาขา รพช. F2"
        subtitle={`ครอบคลุม ${counts.tracked}/${counts.total} เต็ม · ${counts.partial}/${counts.total} บางส่วน · Coverage Score ${coveragePct}%`}>
        <KPIGrid cards={cards} />
      </CardShell>

      <CardShell title="รายการสาขาทั้งหมด" subtitle={`Tier 4.1 stub — wire to real KPIs in next session`}>
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
          {SERVICE_PLAN.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </CardShell>

      <div style={{ padding: '12px 16px', borderRadius: '10px',
        background: 'rgba(99,102,241,.05)', border: '1px dashed rgba(99,102,241,.2)',
        fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6 }}>
        <strong>📋 Next-session work:</strong> Wire each service to its actual KPIs via
        <code> /api/service-plan</code> endpoint. Add status auto-computation from KPI thresholds.
        Add roadmap link per missing สาขา. Add export-to-PDF for ผู้ตรวจราชการเขตสุขภาพที่ 6.
      </div>
    </div>
  );
}
