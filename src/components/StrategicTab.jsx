// ============================================================
// StrategicTab — Tier 4 Strategic Positioning Hub
// Phase H Tier 4.1 — Wired stubs (Service Plan / PA / Catchment)
//
// Sub-tab switcher between:
//   📋 Service Plan Scorecard (MoPH 2566-2570, 16 สาขา)
//   📊 Performance Agreement (MoPH PA, 4 categories, 16 indicators)
//   🗺️ Catchment Map (ตำบล + อำเภอ, Leaflet pending)
//
// Each sub-tab is a Tier 4 stub component — replace with real data
// integration in next sessions.
// ============================================================
import React from 'react';
import ServicePlanScorecard from './tier4/ServicePlanScorecard.jsx';
import PaTrackerStub from './tier4/PaTrackerStub.jsx';
import CatchmentMapStub from './tier4/CatchmentMapStub.jsx';

const SUB_TABS = [
  { id: 'service-plan', label: 'Service Plan', icon: '📋',
    desc: 'MoPH 16 สาขา · Coverage Score' },
  { id: 'pa-tracker', label: 'PA Tracker', icon: '📊',
    desc: 'Performance Agreement · เขตสุขภาพ 6' },
  { id: 'catchment', label: 'Catchment Map', icon: '🗺️',
    desc: 'แหล่งผู้รับบริการ · ตำบล' },
];

export default function StrategicTab() {
  const [activeSub, setActiveSub] = React.useState('service-plan');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '14px 18px',
        background: 'linear-gradient(135deg, rgba(99,102,241,.06), rgba(168,85,247,.06))',
        border: '1px solid rgba(99,102,241,.15)',
        borderRadius: '14px',
      }}>
        <span style={{ fontSize: '24px' }} aria-hidden="true">🌟</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: 900,
            color: 'var(--md-text-primary)' }}>
            กลยุทธ์ (Strategic Positioning) — Tier 4
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600,
            color: 'var(--md-text-secondary)' }}>
            ภาพรวมเชิงกลยุทธ์ของ รพ.บ้านฉาง · MoPH Service Plan · PA · catchment
          </div>
        </div>
      </div>

      {/* Sub-tab nav */}
      <div role="tablist" aria-label="Strategic sub-views"
        style={{
          display: 'flex', gap: '6px',
          padding: '4px',
          background: 'var(--md-border)',
          borderRadius: '10px',
          flexWrap: 'wrap',
        }}>
        {SUB_TABS.map((sub) => {
          const active = activeSub === sub.id;
          return (
            <button
              key={sub.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveSub(sub.id)}
              title={sub.desc}
              style={{
                flex: '1 1 auto',
                minWidth: '140px',
                padding: '10px 16px',
                fontSize: '12px',
                fontWeight: 800,
                border: 'none',
                borderRadius: '8px',
                background: active
                  ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                  : 'var(--md-surface, #fff)',
                color: active ? '#fff' : 'var(--md-text-secondary)',
                cursor: 'pointer',
                boxShadow: active ? '0 2px 8px rgba(99,102,241,.3)' : 'none',
                transition: 'all .15s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <span aria-hidden="true">{sub.icon}</span>
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-tab content */}
      <div role="tabpanel" aria-labelledby={`tab-${activeSub}`}>
        {activeSub === 'service-plan' && <ServicePlanScorecard />}
        {activeSub === 'pa-tracker' && <PaTrackerStub />}
        {activeSub === 'catchment' && <CatchmentMapStub />}
      </div>

      {/* Roadmap context */}
      <div style={{
        padding: '12px 16px', borderRadius: '10px',
        background: 'rgba(99,102,241,.04)',
        border: '1px dashed rgba(99,102,241,.2)',
        fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6,
      }}>
        <strong>📌 Tier 4 Strategic Positioning</strong> —
        ส่วนนี้รวม 3 มุมมองเชิงกลยุทธ์: (1) MoPH Service Plan 2566-2570 · 16 สาขา F2,
        (2) Performance Agreement กับเขตสุขภาพที่ 6, (3) Catchment map แหล่งที่อยู่ของผู้รับบริการ.
        ทั้ง 3 เป็น stub ที่รอ wire กับข้อมูลจริงในเซสชันถัดไป (
        <code>/api/service-plan</code>, <code>/api/pa/quarterly</code>,
        <code>/api/catchment/by-tumbon</code> + Leaflet).
        ดูแผนเต็มที่ <code>docs/roadmap-remaining-tiers.md</code>.
      </div>
    </div>
  );
}
