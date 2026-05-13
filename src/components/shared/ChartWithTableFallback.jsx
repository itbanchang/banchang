// ============================================================
// ChartWithTableFallback — Wraps any chart with a "View as table"
// toggle for accessibility (WCAG AA 1.1.1 Non-text Content + 4.1.3 Status Messages).
//
// Phase H Tier 3.4 — A11y baseline
//
// Usage:
//   <ChartWithTableFallback
//     title="Daily Trend"
//     data={[{date: '2026-05-13', count: 42}, ...]}
//     columns={[
//       { key: 'date', label: 'วันที่' },
//       { key: 'count', label: 'จำนวน', format: v => v.toLocaleString() },
//     ]}
//   >
//     {/* The chart component as children */}
//     <DailyTrend ... />
//   </ChartWithTableFallback>
//
// Renders chart by default. Toggle button switches to <table> for screen
// readers + keyboard users + audit export.
// ============================================================
import React from 'react';

export default function ChartWithTableFallback({
  title,
  data = [],
  columns = [],
  children,
  defaultMode = 'chart', // 'chart' | 'table'
}) {
  const [mode, setMode] = React.useState(defaultMode);

  const toggleId = React.useId();
  const tableId = `${toggleId}-table`;
  const chartId = `${toggleId}-chart`;

  return (
    <div role="region" aria-labelledby={`${toggleId}-title`}>
      {/* Header: title + toggle */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '8px', gap: '8px', flexWrap: 'wrap',
      }}>
        <h3 id={`${toggleId}-title`} style={{
          margin: 0, fontSize: '13px', fontWeight: 800,
          color: 'var(--md-text-primary)',
        }}>
          {title}
        </h3>
        <div role="tablist" aria-label="View mode" style={{
          display: 'inline-flex', gap: '4px', padding: '2px',
          background: 'var(--md-border)', borderRadius: '6px',
        }}>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'chart'}
            aria-controls={chartId}
            onClick={() => setMode('chart')}
            style={{
              padding: '4px 10px', fontSize: '11px', fontWeight: 700,
              border: 'none', borderRadius: '4px',
              background: mode === 'chart' ? 'var(--md-surface, #fff)' : 'transparent',
              color: mode === 'chart' ? 'var(--md-text-primary)' : 'var(--md-text-secondary)',
              cursor: 'pointer',
              boxShadow: mode === 'chart' ? '0 1px 2px rgba(0,0,0,.06)' : 'none',
            }}
          >
            📊 กราฟ
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'table'}
            aria-controls={tableId}
            onClick={() => setMode('table')}
            style={{
              padding: '4px 10px', fontSize: '11px', fontWeight: 700,
              border: 'none', borderRadius: '4px',
              background: mode === 'table' ? 'var(--md-surface, #fff)' : 'transparent',
              color: mode === 'table' ? 'var(--md-text-primary)' : 'var(--md-text-secondary)',
              cursor: 'pointer',
              boxShadow: mode === 'table' ? '0 1px 2px rgba(0,0,0,.06)' : 'none',
            }}
          >
            📋 ตาราง
          </button>
        </div>
      </div>

      {/* Chart view */}
      <div id={chartId} role="tabpanel" hidden={mode !== 'chart'}>
        {children}
      </div>

      {/* Table view */}
      <div id={tableId} role="tabpanel" hidden={mode !== 'table'}>
        {data.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center',
            color: 'var(--md-text-tertiary)' }}>
            ไม่มีข้อมูล
          </div>
        ) : (
          <div style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse', fontSize: '12px',
              fontVariantNumeric: 'tabular-nums',
            }}>
              <thead>
                <tr style={{ background: 'rgba(0,0,0,.03)',
                  position: 'sticky', top: 0, zIndex: 1 }}>
                  {columns.map((col) => (
                    <th key={col.key} scope="col" style={{
                      padding: '6px 10px', textAlign: col.align || 'left',
                      fontSize: '10px', fontWeight: 800,
                      color: 'var(--md-text-secondary)',
                      textTransform: 'uppercase', letterSpacing: '.04em',
                      borderBottom: '2px solid var(--md-border)',
                    }}>
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} style={{
                    background: idx % 2 ? 'rgba(0,0,0,.015)' : 'transparent',
                  }}>
                    {columns.map((col) => (
                      <td key={col.key} style={{
                        padding: '6px 10px', textAlign: col.align || 'left',
                        borderBottom: '1px solid var(--md-border)',
                      }}>
                        {col.format ? col.format(row[col.key], row) : (row[col.key] ?? '-')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
