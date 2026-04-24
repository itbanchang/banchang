// ============================================================
// Shared Executive AI Panel — reusable across all tabs
// Rule-based client-side narrative renderer for executives
// ============================================================
import React from 'react';
import { fmt as fmtNum } from '@utils/formatters';

export function AINarrativeCard({ icon, title, text, list, color = '#7c3aed' }) {
  return (
    <div style={{
      background: 'var(--md-surface)',
      border: '1px solid var(--md-border)',
      borderLeft: `3px solid ${color}`,
      borderRadius: '10px',
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px' }}>{icon}</span>
        <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--md-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
      </div>
      {text && (
        <p style={{ fontSize: '13px', color: 'var(--md-text-primary)', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
          {text}
        </p>
      )}
      {list && (
        <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
          {list.map((item, i) => (
            <li key={i} style={{ fontSize: '13px', color: 'var(--md-text-primary)', lineHeight: 1.7, fontWeight: 500, marginBottom: '3px' }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AIKPITile({ label, value, sub, color = '#7c3aed', accent }) {
  return (
    <div style={{
      background: 'var(--md-surface)',
      border: '1px solid var(--md-border)',
      borderTop: `3px solid ${color}`,
      borderRadius: '10px',
      padding: '10px 12px',
      minWidth: 0,
    }}>
      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
      <div style={{ fontSize: '17px', fontWeight: 900, color: accent || color, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '3px', fontWeight: 600 }}>{sub}</div>}
    </div>
  );
}

/**
 * Generic Executive AI Panel
 * @param {Object} props
 * @param {string} props.title - panel title
 * @param {string} props.subtitle - subtitle under title
 * @param {string} props.badge - badge text (e.g., "📐 Rule-based Analysis")
 * @param {string} props.accentColor - primary accent color
 * @param {string} props.headerGradient - CSS linear-gradient for header
 * @param {Object} props.narrative - structured narrative data
 * @param {string} props.narrative.headline - headline text
 * @param {string} [props.narrative.headlineColor] - headline accent color
 * @param {Array} [props.narrative.kpi] - array of {label, value, sub, color, accent}
 * @param {Array} props.narrative.sections - array of {icon, title, text|list, color}
 * @param {string} [props.narrative.footer] - footer text (right side)
 * @param {string} [props.narrative.footerLeft] - footer text (left side)
 * @param {boolean} [props.narrative.empty] - show empty state message
 */
export function ExecutiveAIPanel({
  title = 'AI Executive Analysis',
  subtitle,
  badge = '📐 Rule-based Analysis',
  accentColor = '#7c3aed',
  headerGradient,
  narrative,
}) {
  if (!narrative) return null;
  const hlColor = narrative.headlineColor || accentColor;
  const defaultGradient = `linear-gradient(135deg, ${accentColor}14, ${accentColor}08)`;

  return (
    <div className="rounded-2xl overflow-hidden" style={{
      background: 'var(--md-surface)',
      border: '1px solid var(--md-border)',
      boxShadow: 'var(--md-shadow-sm)',
      marginTop: '16px',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 20px',
        borderBottom: '1px solid var(--md-border)',
        background: headerGradient || defaultGradient,
        display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '18px' }}>🧠</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
              {subtitle}
            </div>
          )}
        </div>
        <span style={{
          fontSize: '11px', fontWeight: 700,
          padding: '3px 10px', borderRadius: '99px',
          background: `${accentColor}18`, color: accentColor,
          border: `1px solid ${accentColor}40`,
        }}>
          {badge}
        </span>
      </div>

      <div style={{ padding: '18px 20px' }}>
        {narrative.empty ? (
          <div style={{
            padding: '14px 16px',
            background: 'rgba(251,191,36,.08)',
            borderLeft: '3px solid #f59e0b',
            borderRadius: '10px',
            fontSize: '13px', fontWeight: 600, color: 'var(--md-text-primary)',
          }}>
            {narrative.headline}
          </div>
        ) : (
          <>
            {/* Headline */}
            {narrative.headline && (
              <div style={{
                padding: '14px 16px',
                background: `${hlColor}14`,
                borderLeft: `3px solid ${hlColor}`,
                borderRadius: '10px',
                marginBottom: '14px',
                fontSize: '14px', fontWeight: 700, color: 'var(--md-text-primary)', lineHeight: 1.6,
              }}>
                {narrative.headline}
              </div>
            )}

            {/* KPI Scorecard */}
            {Array.isArray(narrative.kpi) && narrative.kpi.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '8px',
                marginBottom: '14px',
              }}>
                {narrative.kpi.map((k, i) => (
                  <AIKPITile key={i} {...k} />
                ))}
              </div>
            )}

            {/* Narrative Sections (2-column grid) */}
            {Array.isArray(narrative.sections) && narrative.sections.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '10px',
              }}>
                {narrative.sections.map((s, i) => (
                  <AINarrativeCard key={i} {...s} />
                ))}
              </div>
            )}

            {/* Footer */}
            {(narrative.footer || narrative.footerLeft) && (
              <div style={{
                marginTop: '14px',
                padding: '10px 14px',
                background: 'var(--md-surface-2, rgba(0,0,0,.02))',
                borderRadius: '8px',
                fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600,
                display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px',
              }}>
                <span>{narrative.footerLeft || ''}</span>
                <span>{narrative.footer || '⚠ การตัดสินใจเชิงนโยบายควรพิจารณาข้อมูลทางคลินิกและบริบทเพิ่มเติม'}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export { fmtNum };

export default ExecutiveAIPanel;
