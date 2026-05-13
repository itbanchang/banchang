// ============================================================
// MortalityReport — รายงานการตาย (OPD / IPD เปรียบเทียบ FY)
// Phase H Tier 2.3 — Source recovery
// Backend: GET /api/report/mortality-monthly?fy1=&fy2=
//   Returns FY1 vs FY2 monthly comparison + totals
//   Includes: ipd_discharge, ipd_deaths, ipd_mortality_rate, opd_deaths, total_deaths
// ============================================================
import React from 'react';
import { KPIGrid, CardShell, ReportShell } from './_shared';

const FY_MONTHS = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.',
  'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

function computeMortality(data) {
  if (!data?.comparison) return null;
  return {
    title: data.title || 'รายงานการตาย',
    fy1: data.fiscal_years?.fy1 || { be: '?' },
    fy2: data.fiscal_years?.fy2 || { be: '?' },
    fy1Totals: data.fy1_totals || {},
    fy2Totals: data.fy2_totals || {},
    comparison: data.comparison,
    comparableMonths: data.comparable_months || 0,
    deathGrowthPct: data.death_growth_pct ?? 0,
    ipdDeathGrowthPct: data.ipd_death_growth_pct ?? 0,
  };
}

function pct(a, b) {
  return b > 0 ? Math.round((a - b) / b * 100) : a > 0 ? 100 : 0;
}

function fmtPct(v) {
  if (v == null || v === 0) return '—';
  return `${v.toFixed(2)}%`;
}

function buildCards(m) {
  const t1 = m.fy1Totals;
  const t2 = m.fy2Totals;
  return [
    {
      label: `IPD ตาย ปี งบ ${m.fy1.be}`,
      icon: '⚰️',
      value: (t1.ipd_deaths || 0).toLocaleString(),
      unit: `ราย · ${fmtPct(t1.ipd_mortality_rate)}`,
      color: '#3b82f6',
    },
    {
      label: `IPD ตาย ปี งบ ${m.fy2.be}`,
      icon: '⚰️',
      value: (t2.ipd_deaths || 0).toLocaleString(),
      unit: `ราย · ${fmtPct(t2.ipd_mortality_rate)}`,
      color: '#ec4899',
      yoy: m.ipdDeathGrowthPct !== 0 ? {
        text: `${m.ipdDeathGrowthPct >= 0 ? '▲' : '▼'} ${m.ipdDeathGrowthPct >= 0 ? '+' : ''}${m.ipdDeathGrowthPct}%`,
        compare: `YoY vs ปี ${m.fy1.be}`,
        fg: m.ipdDeathGrowthPct >= 0 ? '#dc2626' : '#059669',
        bg: m.ipdDeathGrowthPct >= 0 ? 'rgba(239,68,68,.10)' : 'rgba(16,185,129,.10)',
      } : null,
    },
    {
      label: 'ตายรวม ปี งบ ' + m.fy1.be,
      icon: '📊',
      value: (t1.total_deaths || 0).toLocaleString(),
      unit: 'ราย',
      color: '#64748b',
    },
    {
      label: 'ตายรวม ปี งบ ' + m.fy2.be,
      icon: '📊',
      value: (t2.total_deaths || 0).toLocaleString(),
      unit: 'ราย',
      color: '#dc2626',
      yoy: m.deathGrowthPct !== 0 ? {
        text: `${m.deathGrowthPct >= 0 ? '▲' : '▼'} ${m.deathGrowthPct >= 0 ? '+' : ''}${m.deathGrowthPct}%`,
        compare: `YoY all deaths`,
        fg: m.deathGrowthPct >= 0 ? '#dc2626' : '#059669',
        bg: m.deathGrowthPct >= 0 ? 'rgba(239,68,68,.10)' : 'rgba(16,185,129,.10)',
      } : null,
    },
    {
      label: 'เดือนเปรียบเทียบได้',
      icon: '📅',
      value: m.comparableMonths,
      unit: 'เดือน',
      color: '#8b5cf6',
    },
  ];
}

const TH = {
  padding: '8px',
  fontSize: '10px',
  fontWeight: 900,
  color: 'var(--md-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '.04em',
  borderBottom: '2px solid var(--md-border)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};
const TD = {
  padding: '8px',
  fontSize: '12px',
  borderBottom: '1px solid var(--md-border)',
  textAlign: 'center',
  fontVariantNumeric: 'tabular-nums',
};
const FY1_BG = 'rgba(219,234,254,.4)';
const FY2_BG = 'rgba(252,231,243,.4)';

function MortalityComparisonTable({ comparison, fy1, fy2, fy1Totals, fy2Totals }) {
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)',
        boxShadow: '0 2px 16px rgba(0,0,0,.05)' }}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ padding: '16px 20px', textAlign: 'center',
          borderBottom: '2px solid var(--md-border)',
          background: 'linear-gradient(135deg, rgba(127,29,29,.05), rgba(239,68,68,.05))' }}>
          <div style={{ fontSize: '16px', fontWeight: 900,
            color: 'var(--md-text-primary)' }}>
            รายงานการตาย OPD / IPD เปรียบเทียบ ปี งบ {fy1.be} vs {fy2.be}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600,
            color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
            HOSxP XE · ipt (dchtype 8,9) + death table · IPD ตาย = dchtype 8,9
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
          <thead>
            <tr>
              <th rowSpan={2} style={{ ...TH, width: '60px',
                borderRight: '2px solid var(--md-border)' }}>เดือน</th>
              <th colSpan={5} style={{ ...TH, background: FY1_BG, color: '#2563eb',
                borderRight: '2px solid var(--md-border)' }}>ปี งบ {fy1.be}</th>
              <th colSpan={5} style={{ ...TH, background: FY2_BG, color: '#db2777',
                borderRight: '2px solid var(--md-border)' }}>ปี งบ {fy2.be}</th>
              <th rowSpan={2} style={{ ...TH, background: 'rgba(220,252,231,.3)',
                color: '#059669', minWidth: '80px' }}>%ตาย YoY</th>
            </tr>
            <tr>
              <th style={{ ...TH, background: FY1_BG, fontSize: '9px' }}>Disch</th>
              <th style={{ ...TH, background: FY1_BG, fontSize: '9px' }}>ตาย IPD</th>
              <th style={{ ...TH, background: FY1_BG, fontSize: '9px' }}>% ตาย</th>
              <th style={{ ...TH, background: FY1_BG, fontSize: '9px' }}>ตาย OPD</th>
              <th style={{ ...TH, background: FY1_BG, fontSize: '9px',
                borderRight: '2px solid var(--md-border)' }}>รวม</th>
              <th style={{ ...TH, background: FY2_BG, fontSize: '9px' }}>Disch</th>
              <th style={{ ...TH, background: FY2_BG, fontSize: '9px' }}>ตาย IPD</th>
              <th style={{ ...TH, background: FY2_BG, fontSize: '9px' }}>% ตาย</th>
              <th style={{ ...TH, background: FY2_BG, fontSize: '9px' }}>ตาย OPD</th>
              <th style={{ ...TH, background: FY2_BG, fontSize: '9px',
                borderRight: '2px solid var(--md-border)' }}>รวม</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => {
              const f1 = row.fy1;
              const f2 = row.fy2;
              const yoyPct = pct(f2.total_deaths, f1.total_deaths);
              const has1 = f1.has_data;
              const has2 = f2.has_data;
              return (
                <tr key={row.month}>
                  <td style={{ ...TD, fontWeight: 800, fontSize: '11px',
                    borderRight: '2px solid var(--md-border)' }}>{row.month}</td>
                  <td style={{ ...TD, background: FY1_BG, opacity: has1 ? 1 : 0.4 }}>
                    {has1 ? f1.ipd_discharge?.toLocaleString() : '—'}
                  </td>
                  <td style={{ ...TD, background: FY1_BG, opacity: has1 ? 1 : 0.4,
                    color: '#dc2626', fontWeight: 700 }}>
                    {has1 ? f1.ipd_deaths?.toLocaleString() : '—'}
                  </td>
                  <td style={{ ...TD, background: FY1_BG, opacity: has1 ? 1 : 0.4,
                    color: f1.ipd_mortality_rate >= 2 ? '#dc2626' : 'inherit',
                    fontWeight: f1.ipd_mortality_rate >= 2 ? 700 : 400 }}>
                    {has1 ? fmtPct(f1.ipd_mortality_rate) : '—'}
                  </td>
                  <td style={{ ...TD, background: FY1_BG, opacity: has1 ? 1 : 0.4 }}>
                    {has1 ? f1.opd_deaths?.toLocaleString() : '—'}
                  </td>
                  <td style={{ ...TD, background: FY1_BG, opacity: has1 ? 1 : 0.4,
                    fontWeight: 700, borderRight: '2px solid var(--md-border)' }}>
                    {has1 ? f1.total_deaths?.toLocaleString() : '—'}
                  </td>
                  <td style={{ ...TD, background: FY2_BG, opacity: has2 ? 1 : 0.4 }}>
                    {has2 ? f2.ipd_discharge?.toLocaleString() : '—'}
                  </td>
                  <td style={{ ...TD, background: FY2_BG, opacity: has2 ? 1 : 0.4,
                    color: '#dc2626', fontWeight: 700 }}>
                    {has2 ? f2.ipd_deaths?.toLocaleString() : '—'}
                  </td>
                  <td style={{ ...TD, background: FY2_BG, opacity: has2 ? 1 : 0.4,
                    color: f2.ipd_mortality_rate >= 2 ? '#dc2626' : 'inherit',
                    fontWeight: f2.ipd_mortality_rate >= 2 ? 700 : 400 }}>
                    {has2 ? fmtPct(f2.ipd_mortality_rate) : '—'}
                  </td>
                  <td style={{ ...TD, background: FY2_BG, opacity: has2 ? 1 : 0.4 }}>
                    {has2 ? f2.opd_deaths?.toLocaleString() : '—'}
                  </td>
                  <td style={{ ...TD, background: FY2_BG, opacity: has2 ? 1 : 0.4,
                    fontWeight: 700, borderRight: '2px solid var(--md-border)' }}>
                    {has2 ? f2.total_deaths?.toLocaleString() : '—'}
                  </td>
                  <td style={{ ...TD,
                    background: yoyPct >= 0 ? 'rgba(239,68,68,.05)' : 'rgba(16,185,129,.05)',
                    color: yoyPct >= 0 ? '#dc2626' : '#059669',
                    fontWeight: 800 }}>
                    {has1 && has2 ? `${yoyPct >= 0 ? '+' : ''}${yoyPct}%` : '—'}
                  </td>
                </tr>
              );
            })}
            {/* Totals row */}
            <tr style={{ background: 'rgba(0,0,0,.04)', fontWeight: 900 }}>
              <td style={{ ...TD, fontWeight: 900, borderRight: '2px solid var(--md-border)' }}>รวม</td>
              <td style={{ ...TD, background: FY1_BG, fontWeight: 900 }}>{fy1Totals.ipd_discharge?.toLocaleString() || 0}</td>
              <td style={{ ...TD, background: FY1_BG, fontWeight: 900, color: '#dc2626' }}>{fy1Totals.ipd_deaths?.toLocaleString() || 0}</td>
              <td style={{ ...TD, background: FY1_BG, fontWeight: 900 }}>{fmtPct(fy1Totals.ipd_mortality_rate)}</td>
              <td style={{ ...TD, background: FY1_BG, fontWeight: 900 }}>{fy1Totals.opd_deaths?.toLocaleString() || 0}</td>
              <td style={{ ...TD, background: FY1_BG, fontWeight: 900,
                borderRight: '2px solid var(--md-border)' }}>{fy1Totals.total_deaths?.toLocaleString() || 0}</td>
              <td style={{ ...TD, background: FY2_BG, fontWeight: 900 }}>{fy2Totals.ipd_discharge?.toLocaleString() || 0}</td>
              <td style={{ ...TD, background: FY2_BG, fontWeight: 900, color: '#dc2626' }}>{fy2Totals.ipd_deaths?.toLocaleString() || 0}</td>
              <td style={{ ...TD, background: FY2_BG, fontWeight: 900 }}>{fmtPct(fy2Totals.ipd_mortality_rate)}</td>
              <td style={{ ...TD, background: FY2_BG, fontWeight: 900 }}>{fy2Totals.opd_deaths?.toLocaleString() || 0}</td>
              <td style={{ ...TD, background: FY2_BG, fontWeight: 900,
                borderRight: '2px solid var(--md-border)' }}>{fy2Totals.total_deaths?.toLocaleString() || 0}</td>
              <td style={{ ...TD, fontWeight: 900,
                color: pct(fy2Totals.total_deaths, fy1Totals.total_deaths) >= 0 ? '#dc2626' : '#059669' }}>
                {pct(fy2Totals.total_deaths, fy1Totals.total_deaths) >= 0 ? '+' : ''}
                {pct(fy2Totals.total_deaths, fy1Totals.total_deaths)}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function useMortalityData(fy1, fy2) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const load = React.useCallback(async () => {
    if (!fy1 || !fy2) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(
        `/api/report/mortality-monthly?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`,
        { credentials: 'include' },
      );
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      setData(j);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  return { data, loading, error, load };
}

export default function MortalityReport({ data }) {
  const m = React.useMemo(() => computeMortality(data), [data]);
  return (
    <ReportShell loading={false} error={null} data={m} emptyMsg="ไม่มีข้อมูลการตาย">
      {m && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <KPIGrid cards={buildCards(m)} />
          <MortalityComparisonTable
            comparison={m.comparison}
            fy1={m.fy1}
            fy2={m.fy2}
            fy1Totals={m.fy1Totals}
            fy2Totals={m.fy2Totals}
          />
        </div>
      )}
    </ReportShell>
  );
}
