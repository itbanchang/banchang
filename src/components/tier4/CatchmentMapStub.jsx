// ============================================================
// CatchmentMapStub — Catchment heatmap by ตำบล (Sub-district)
// Phase H Tier 4.1 — STUB for next session
//
// Will show where BCH's patients come from (origin by ตำบล) using Leaflet.
// Heatmap intensity = visit count. Click for breakdown by sex/age/sub-district.
//
// Data source: pt_addr.add_subdist + thaiaddress lookup
// ============================================================
import React from 'react';
import { CardShell } from '../reports/_shared';

// Banchang district (อำเภอบ้านฉาง) ตำบล — primary catchment
const BANCHANG_TUMBONS = [
  { code: '210101', name: 'บ้านฉาง (main)', expected: 'high' },
  { code: '210102', name: 'พลา', expected: 'high' },
  { code: '210103', name: 'สำนักท้อน', expected: 'medium' },
];

// Nearby districts (เมืองระยอง · ปลวกแดง · นิคมพัฒนา) — secondary catchment
const NEARBY_DISTRICTS = [
  { code: '2101', name: 'อ.บ้านฉาง', distance: '0 km', status: 'primary' },
  { code: '2103', name: 'อ.ปลวกแดง', distance: '15 km', status: 'secondary' },
  { code: '2107', name: 'อ.นิคมพัฒนา', distance: '20 km', status: 'secondary' },
  { code: '2101*', name: 'อ.เมืองระยอง', distance: '25 km', status: 'fringe' },
];

export default function CatchmentMapStub() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <CardShell title="🗺️ Catchment Heatmap — แหล่งที่อยู่ผู้รับบริการ"
        subtitle="Tier 4.1 stub · Pending Leaflet integration">
        <div style={{
          background: 'rgba(99,102,241,.04)',
          border: '1px dashed rgba(99,102,241,.2)',
          borderRadius: '12px',
          padding: '40px 20px',
          textAlign: 'center',
          minHeight: '300px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '48px', marginBottom: '12px' }}>🗺️</span>
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
            Catchment Heatmap (placeholder)
          </div>
          <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)', marginTop: '6px' }}>
            Next session: npm install leaflet react-leaflet + build endpoint
            /api/catchment/by-tumbon
          </div>
        </div>
      </CardShell>

      <CardShell title="ตำบลในเขต อ.บ้านฉาง (primary catchment)"
        subtitle="3 ตำบลหลัก — patient origin breakdown">
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {BANCHANG_TUMBONS.map((t) => (
            <div key={t.code} style={{
              padding: '12px 14px',
              background: 'var(--md-surface)',
              border: '1px solid var(--md-border)',
              borderLeft: '3px solid #10b981',
              borderRadius: '10px',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 800,
                color: 'var(--md-text-primary)' }}>{t.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)' }}>
                ตำบล code: {t.code}
              </div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#059669',
                marginTop: '4px' }}>
                {t.expected === 'high' ? '🔥 คาดว่ามาก' : '📊 ปานกลาง'}
              </div>
            </div>
          ))}
        </div>
      </CardShell>

      <CardShell title="อำเภอใกล้เคียง (secondary/fringe catchment)"
        subtitle="4 อำเภอ · ระยอง">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {NEARBY_DISTRICTS.map((d) => (
            <div key={d.code} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 12px', borderRadius: '8px',
              background: d.status === 'primary' ? 'rgba(16,185,129,.06)'
                : d.status === 'secondary' ? 'rgba(245,158,11,.06)'
                : 'rgba(148,163,184,.06)',
              borderLeft: `3px solid ${d.status === 'primary' ? '#10b981'
                : d.status === 'secondary' ? '#f59e0b' : '#94a3b8'}`,
            }}>
              <span style={{ fontSize: '14px' }}>📍</span>
              <span style={{ flex: 1, fontSize: '12px', fontWeight: 700,
                color: 'var(--md-text-primary)' }}>{d.name}</span>
              <span style={{ fontSize: '10px', fontWeight: 600,
                color: 'var(--md-text-tertiary)' }}>{d.distance}</span>
              <span style={{ fontSize: '9px', fontWeight: 800,
                padding: '2px 8px', borderRadius: '99px',
                background: d.status === 'primary' ? 'rgba(16,185,129,.15)'
                  : d.status === 'secondary' ? 'rgba(245,158,11,.15)'
                  : 'rgba(148,163,184,.15)',
                color: d.status === 'primary' ? '#059669'
                  : d.status === 'secondary' ? '#d97706' : '#475569',
              }}>
                {d.status === 'primary' ? 'หลัก' : d.status === 'secondary' ? 'รอง' : 'ขอบ'}
              </span>
            </div>
          ))}
        </div>
      </CardShell>

      <div style={{ padding: '12px 16px', borderRadius: '10px',
        background: 'rgba(99,102,241,.05)', border: '1px dashed rgba(99,102,241,.2)',
        fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6 }}>
        <strong>📋 Tier 4.1 stub:</strong> Build <code>/api/catchment/by-tumbon</code> endpoint
        querying <code>pt_addr</code> + <code>thaiaddress</code> for visit origin distribution.
        Add Leaflet map with Thailand-specific tile layer (HDC or OpenStreetMap-TH).
        Show patient count + average distance + same-day refer rate per ตำบล.
      </div>
    </div>
  );
}
