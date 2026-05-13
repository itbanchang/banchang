// ============================================================
// PaTrackerStub — MoPH Performance Agreement (PA) tracker
// Phase H Tier 4.1 — STUB for next session
//
// Will track BCH's quarterly Performance Agreement with เขตสุขภาพที่ 6.
// Categories: HPC (Health Promotion), Service Excellence, People, Governance.
// ============================================================
import React from 'react';
import { CardShell, KPIGrid } from '../reports/_shared';

const PA_CATEGORIES = [
  {
    id: 'hpc', name: 'ตัวชี้วัดยุทธศาสตร์ที่ 1: HPC (Health Promotion)', icon: '🏃',
    indicators: [
      { name: 'NCD compliance + Follow-up', source: 'BCH 360° NCD tab', status: 'tracked' },
      { name: 'Vaccination coverage', source: '/api/hpc/vax (pending)', status: 'missing' },
      { name: 'Screening coverage', source: '/api/hpc/screen (pending)', status: 'missing' },
    ],
  },
  {
    id: 'service', name: 'ตัวชี้วัดยุทธศาสตร์ที่ 2: Service Excellence (PP&P)', icon: '🏥',
    indicators: [
      { name: 'ER 18 KPIs (MoPH ECS)', source: 'BCH 360° ER tab', status: 'tracked' },
      { name: 'IPD readmit 30d', source: 'BCH 360° IPD tab', status: 'tracked' },
      { name: 'STEMI Bundle 95%', source: 'BCH 360° ER tab', status: 'tracked' },
      { name: 'MCH (ANC, LBW, Maternal Mortality)', source: 'Pending Tier 4.2', status: 'missing' },
      { name: 'Sepsis Hour-1 Bundle', source: 'Pending Tier 4.2', status: 'missing' },
    ],
  },
  {
    id: 'people', name: 'ตัวชี้วัดยุทธศาสตร์ที่ 3: People Excellence', icon: '👥',
    indicators: [
      { name: 'Headcount (doctors + staff)', source: 'BSC Learning & Growth (stub)', status: 'partial' },
      { name: 'Training hours / employee', source: 'Pending Tier 4.2 — dw_staff_training', status: 'missing' },
      { name: 'Cert compliance (ACLS/BLS/NRP)', source: 'Pending Tier 4.2', status: 'missing' },
      { name: 'Turnover rate', source: 'Pending Tier 4.2', status: 'missing' },
    ],
  },
  {
    id: 'gov', name: 'ตัวชี้วัดยุทธศาสตร์ที่ 4: Governance Excellence', icon: '⚖️',
    indicators: [
      { name: 'RBAC + Audit log', source: 'server/middleware/audit.js', status: 'tracked' },
      { name: 'PDPA compliance', source: 'maskingMiddleware + hashed HN', status: 'tracked' },
      { name: 'EOC drill compliance', source: 'Pending Tier 4.2', status: 'missing' },
      { name: 'IC training compliance', source: 'Pending Tier 4.2', status: 'missing' },
    ],
  },
];

const STATUS = {
  tracked: { color: '#059669', icon: '✅' },
  partial: { color: '#d97706', icon: '🟡' },
  missing: { color: '#dc2626', icon: '🔴' },
};

function countByStatus(category) {
  const counts = { tracked: 0, partial: 0, missing: 0 };
  category.indicators.forEach((i) => { counts[i.status] = (counts[i.status] || 0) + 1; });
  return counts;
}

export default function PaTrackerStub() {
  const allIndicators = PA_CATEGORIES.flatMap((c) => c.indicators);
  const overallTracked = allIndicators.filter((i) => i.status === 'tracked').length;
  const overallPartial = allIndicators.filter((i) => i.status === 'partial').length;
  const overallTotal = allIndicators.length;
  const readinessScore = Math.round((overallTracked + overallPartial * 0.5) / overallTotal * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <CardShell title="MoPH Performance Agreement (PA) Tracker"
        subtitle={`เขตสุขภาพที่ 6 · Readiness Score ${readinessScore}% (${overallTracked}/${overallTotal} tracked)`}>
        <KPIGrid cards={[
          { label: 'PA Indicators ที่ track', icon: '📊', value: overallTracked, unit: `/${overallTotal} ตัว`, color: '#059669' },
          { label: 'มีบางส่วน', icon: '🟡', value: overallPartial, unit: 'ตัว', color: '#d97706' },
          { label: 'ยังไม่ track', icon: '🔴', value: overallTotal - overallTracked - overallPartial, unit: 'ตัว', color: '#dc2626' },
          { label: 'Readiness Score', icon: '🎯', value: `${readinessScore}%`,
            unit: 'weighted', color: readinessScore >= 80 ? '#059669' : readinessScore >= 60 ? '#d97706' : '#dc2626' },
        ]} />
      </CardShell>

      {PA_CATEGORIES.map((cat) => {
        const counts = countByStatus(cat);
        return (
          <CardShell key={cat.id}
            title={`${cat.icon} ${cat.name}`}
            subtitle={`${counts.tracked}/${cat.indicators.length} tracked · ${counts.partial} partial · ${counts.missing} missing`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {cat.indicators.map((ind) => {
                const s = STATUS[ind.status];
                return (
                  <div key={ind.name} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 12px', borderRadius: '8px',
                    background: `${s.color}06`,
                    borderLeft: `3px solid ${s.color}`,
                  }}>
                    <span aria-hidden="true">{s.icon}</span>
                    <span style={{ flex: 1, fontSize: '12px', fontWeight: 700,
                      color: 'var(--md-text-primary)' }}>{ind.name}</span>
                    <span style={{ fontSize: '10px', fontWeight: 600,
                      color: 'var(--md-text-tertiary)' }}>{ind.source}</span>
                  </div>
                );
              })}
            </div>
          </CardShell>
        );
      })}

      <div style={{ padding: '12px 16px', borderRadius: '10px',
        background: 'rgba(99,102,241,.05)', border: '1px dashed rgba(99,102,241,.2)',
        fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6 }}>
        <strong>📋 Tier 4.1 stub:</strong> Wire to MoPH PA quarterly submission API
        (if available) OR manual entry per quarter via warehouse-feature pattern.
        Add export to MoPH HDC format for ผู้อำนวยการเขตสุขภาพที่ 6 submission.
      </div>
    </div>
  );
}
