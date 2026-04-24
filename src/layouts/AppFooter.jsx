// ============================================================
// BCH 360° Intelligence V.10 — App Footer Layout Component
// Extracted from App.jsx for separation of concerns
// ============================================================
import React from 'react';

/**
 * @param {{ systemStatus: object|null, onShowTeam: () => void }} props
 */
export default function AppFooter({ systemStatus, onShowTeam }) {
  return (
    <footer
      className="mt-auto border-t"
      style={{
        background: 'var(--md-surface)',
        borderColor: 'var(--md-border)',
        boxShadow: '0 -1px 0 var(--md-divider)',
      }}
    >
      <div
        className="max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-5 py-5
                        flex flex-wrap items-center justify-between gap-3"
        style={{ fontSize: 11, fontWeight: 600, color: 'var(--md-text-secondary)' }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span style={{ color: 'var(--md-text-tertiary)', fontWeight: 600 }}>© 2026</span>

          <span style={badgeStyle('rgba(15,118,110,.08)', '#0f766e')}>AI PROJECT</span>

          <span
            className="font-bold"
            style={{ color: 'var(--md-primary)', letterSpacing: '-0.01em' }}
          >
            BCH 360° Intelligence
          </span>

          <span style={{ color: 'var(--md-text-tertiary)' }}>v10.4.0</span>
          <Dot />

          <span style={badgeStyle('rgba(244,63,94,.08)', '#f43f5e')}>
            SYSTEM ANALYST &amp; DEVELOPMENT BY
          </span>
          <span style={{ fontWeight: 800, color: '#f43f5e', letterSpacing: '-0.01em' }}>
            BOSSART
          </span>
          <Dot />

          <span style={badgeStyle('rgba(14,165,233,.08)', '#0ea5e9')}>
            TESTER &amp; SUPPORTED BY
          </span>
          <span style={{ fontWeight: 800, color: '#0ea5e9', letterSpacing: '-0.01em' }}>
            ITBANCHANG TEAM
          </span>
          <Dot />

          <button
            onClick={onShowTeam}
            style={{
              ...badgeStyle('rgba(109,40,217,.08)', '#6d28d9'),
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(109,40,217,.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(109,40,217,.08)';
            }}
          >
            🏗️ Project Team &amp; Standards
          </button>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="uppercase tracking-wider">Predictive Load: Optimized</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="uppercase tracking-wider">
              Node: {systemStatus?.mysql_host || 'Cloud'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Helper sub-components ── */
function Dot() {
  return <span style={{ color: 'var(--md-border)' }}>·</span>;
}

function badgeStyle(bg, color) {
  return {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    background: bg,
    padding: '2px 6px',
    borderRadius: '4px',
    color,
  };
}
