// ============================================================
// _shared.jsx — Reusable building blocks for report components
// Phase H Tier 1.3 — Extracted from PTStaffReport (commit f078441)
//
// Use across all reports (PT/Staff, Fluoride, Elderly-CXR, Mortality, FRAX,
// NCD-disease, Imaging-services) to maintain visual consistency without
// duplicating card/chart/table primitives.
// ============================================================
import React from 'react';

export const ICD10_PATTERN = /^[A-Z]\d{2}(\.\d+)?$/;

export const DEPT_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

export const AGE_GROUP_COLORS = {
  '<18': '#3b82f6',
  '18-34': '#10b981',
  '35-59': '#f59e0b',
  '60+': '#ef4444',
  '25-34': '#10b981',
  '35-44': '#3b82f6',
  '45-54': '#f59e0b',
  '55-59': '#ef4444',
  '60-69': '#3b82f6',
  '70-79': '#f59e0b',
  '80+': '#ef4444',
};

// ============================================================
// buildYoyChip — colored pill for YoY delta
// ============================================================
export function buildYoyChip(delta, prior, unit) {
  if (delta == null) return null;
  const up = delta >= 0;
  return {
    text: `${up ? '▲' : '▼'} ${up ? '+' : ''}${delta.toFixed(1)}%`,
    compare: `vs ${(prior || 0).toLocaleString()} ${unit || ''}`,
    fg: up ? '#059669' : '#dc2626',
    bg: up ? 'rgba(16,185,129,.10)' : 'rgba(239,68,68,.10)',
  };
}

// ============================================================
// KPICard — 5-layer design (accent bar · icon tile · label · value · YoY chip)
// ============================================================
export function KPICard({ card }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(180deg, var(--md-surface, #fff) 0%, ${card.color}08 100%)`,
        border: `1px solid ${card.color}25`,
        borderRadius: '16px',
        padding: '16px 18px',
        transition: 'transform .2s cubic-bezier(.4,0,.2,1), box-shadow .2s ease',
        cursor: 'default',
        boxShadow: hover ? `0 8px 24px ${card.color}25` : '0 1px 2px rgba(0,0,0,.04)',
        transform: hover ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${card.color}, ${card.color}55)` }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px',
          background: `${card.color}15`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '18px', flexShrink: 0 }} aria-hidden="true">
          {card.icon}
        </div>
        <span style={{ fontSize: '11px', fontWeight: 800,
          color: 'var(--md-text-secondary)', textTransform: 'uppercase',
          letterSpacing: '.06em' }}>{card.label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px',
        marginBottom: card.yoy ? '8px' : 0 }}>
        <span style={{ fontSize: '28px', fontWeight: 900, color: card.color,
          fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {card.value}
        </span>
        <span style={{ fontSize: '12px', fontWeight: 700,
          color: 'var(--md-text-tertiary)' }}>{card.unit}</span>
      </div>
      {card.yoy && (
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2px',
          padding: '4px 10px', borderRadius: '99px', background: card.yoy.bg,
          fontSize: '10px', fontWeight: 700, color: card.yoy.fg, maxWidth: '100%' }}>
          <span style={{ whiteSpace: 'nowrap' }}>{card.yoy.text}</span>
          {card.yoy.compare && (
            <span style={{ fontSize: '9px', opacity: 0.85, whiteSpace: 'normal' }}>
              {card.yoy.compare}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// KPIGrid — auto-fit grid layout for KPI cards
// ============================================================
export function KPIGrid({ cards }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
    }}>
      {cards.map((card, idx) => <KPICard key={idx} card={card} />)}
    </div>
  );
}

// ============================================================
// CardShell — surface for non-KPI sections
// ============================================================
export function CardShell({ title, subtitle, children }) {
  return (
    <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)',
      borderRadius: '14px', padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
        <div style={{ fontSize: '11px', fontWeight: 800,
          color: 'var(--md-text-tertiary)', textTransform: 'uppercase',
          letterSpacing: '.04em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '10px', fontWeight: 700,
          color: 'var(--md-text-secondary)' }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

// ============================================================
// Chip — rounded pill for header strips
// ============================================================
export function Chip({ bg, fg, border, children }) {
  return (
    <span style={{ padding: '4px 12px', borderRadius: '99px', fontSize: '11px',
      fontWeight: 800, background: bg, color: fg, border: `1px solid ${border}` }}>
      {children}
    </span>
  );
}

// ============================================================
// DeptBreakdown — สัดส่วนแผนก (horizontal bars)
// ============================================================
export function DeptBreakdown({ deptList, totalPatients, title = 'สัดส่วนแผนก' }) {
  return (
    <CardShell title={title}>
      {deptList.map(([name, info], idx) => {
        const pct = totalPatients > 0 ? Math.round(info.count / totalPatients * 100) : 0;
        const color = DEPT_COLORS[idx % DEPT_COLORS.length];
        return (
          <div key={idx} style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span title={name} style={{ fontSize: '10px', fontWeight: 700,
                color: 'var(--md-text-secondary)', maxWidth: '70%', overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {name.replace(/^\d+/, '')}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 800, color }}>
                {info.count} ({pct}%)
              </span>
            </div>
            <div style={{ height: '6px', borderRadius: '3px',
              background: 'var(--md-border)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, borderRadius: '3px',
                background: color, transition: 'width .5s ease' }} />
            </div>
          </div>
        );
      })}
    </CardShell>
  );
}

// ============================================================
// AgeGroups — กลุ่มอายุ (vertical bars, color-coded)
// ============================================================
export function AgeGroups({ ageGroups, ageGroupMax, title = 'กลุ่มอายุ' }) {
  return (
    <CardShell title={title}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px',
        height: '80px', paddingTop: '4px' }}>
        {Object.entries(ageGroups).map(([label, count]) => {
          const color = AGE_GROUP_COLORS[label] || '#94a3b8';
          return (
            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color }}>{count}</span>
              <div style={{ width: '100%', borderRadius: '6px 6px 0 0',
                background: color,
                height: `${Math.max(8, count / ageGroupMax * 60)}px`,
                opacity: 0.8, transition: 'height .5s ease' }} />
              <span style={{ fontSize: '8px', fontWeight: 700,
                color: 'var(--md-text-tertiary)' }}>{label}</span>
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}

// ============================================================
// Icd10Top10 — Top 10 ICD-10 diagnoses (horizontal bars + name overlay)
// ============================================================
export function Icd10Top10({ top10Icd10, top10MaxCount, title = 'Top ICD-10 Diagnoses' }) {
  return (
    <CardShell title={title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {top10Icd10.map((item, idx) => {
          const pct = top10MaxCount > 0 ? Math.round(item.count / top10MaxCount * 100) : 0;
          const intensity = idx === 0 ? '5' : '3';
          return (
            <div key={item.code} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669',
                fontFamily: 'monospace', minWidth: '48px' }}>{item.code}</span>
              <div style={{ flex: 1, position: 'relative', height: '18px',
                borderRadius: '4px', background: 'var(--md-border)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, borderRadius: '4px',
                  background: `linear-gradient(90deg, rgba(16,185,129,.25), rgba(16,185,129,.${intensity}))`,
                  transition: 'width .5s ease' }} />
                <span style={{ position: 'absolute', left: '6px', top: '50%',
                  transform: 'translateY(-50%)', fontSize: '8px', fontWeight: 700,
                  color: 'var(--md-text-secondary)', whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                  maxWidth: 'calc(100% - 50px)' }}>{item.name}</span>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800,
                color: 'var(--md-text-primary)', minWidth: '28px',
                textAlign: 'right' }}>{item.count}</span>
            </div>
          );
        })}
      </div>
    </CardShell>
  );
}

// ============================================================
// DailyTrend — แนวโน้มรายวัน (vertical bars + hover tooltip)
// ============================================================
export function DailyTrend({ dailyTrend, dailyMaxCount, subtitle, title = 'แนวโน้มรายวัน · จำนวน / รายได้' }) {
  if (dailyTrend.length === 0) {
    return (
      <CardShell title={title}>
        <div style={{ fontSize: '11px', fontWeight: 600,
          color: 'var(--md-text-tertiary)', textAlign: 'center', padding: '20px 0' }}>
          {'ไม่มีข้อมูลในช่วงเวลาที่เลือก'}
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell title={title} subtitle={subtitle}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px',
        height: '120px', paddingTop: '16px', overflowX: 'auto' }}>
        {dailyTrend.map((day) => (
          <div
            key={day.date}
            title={`${day.date} · ${day.count} ราย · ${(day.income || 0).toLocaleString()} บาท`}
            style={{ flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '4px', minWidth: 0 }}
          >
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#06b6d4' }}>
              {day.count}
            </span>
            <div style={{ width: '100%', borderRadius: '6px 6px 0 0',
              background: 'linear-gradient(180deg, #06b6d4, #3b82f6)',
              height: `${Math.max(8, day.count / dailyMaxCount * 80)}px`,
              opacity: 0.85, transition: 'height .5s ease' }} />
            <span style={{ fontSize: '9px', fontWeight: 700,
              color: 'var(--md-text-tertiary)', whiteSpace: 'nowrap' }}>
              {day.date.substring(5)}
            </span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ============================================================
// Generic PatientTable — used by all patient-list reports
// columns: array of { key, label, render?, align?, width?, headerStyle?, cellStyle? }
// ============================================================
const TH_STYLE = {
  padding: '10px 8px',
  fontSize: '10px',
  fontWeight: 900,
  color: 'var(--md-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '.04em',
  borderBottom: '2px solid var(--md-border)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
};

const TD_STYLE = {
  padding: '8px',
  fontSize: '12px',
  color: 'var(--md-text-primary)',
  textAlign: 'center',
  borderBottom: '1px solid var(--md-border)',
};

export { TH_STYLE, TD_STYLE };

function GenericRow({ patient, idx, columns }) {
  const bgRow = idx % 2 !== 0 ? 'var(--md-surface-2, rgba(0,0,0,.015))' : 'transparent';
  const [bg, setBg] = React.useState(bgRow);
  React.useEffect(() => setBg(bgRow), [bgRow]);

  return (
    <tr
      style={{ background: bg, transition: 'background .1s' }}
      onMouseEnter={() => setBg('rgba(59,130,246,.05)')}
      onMouseLeave={() => setBg(bgRow)}
    >
      {columns.map((col) => (
        <td key={col.key} style={{ ...TD_STYLE, ...(col.cellStyle || {}) }}>
          {col.render ? col.render(patient, idx) : (patient[col.key] ?? '-')}
        </td>
      ))}
    </tr>
  );
}

export function GenericPatientTable({
  patients, columns, title, icon = '📋', subtitle, chips = [],
  displayLimit = 100, minWidth = '1200px',
}) {
  const visible = displayLimit === 'all' ? patients : patients.slice(0, displayLimit);

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)',
        boxShadow: '0 2px 16px rgba(0,0,0,.05)' }}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{
          padding: '14px 24px',
          borderBottom: '2px solid var(--md-border)',
          background: 'linear-gradient(135deg, rgba(16,185,129,.05), rgba(59,130,246,.05))',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }} aria-hidden="true">{icon}</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 900,
                color: 'var(--md-text-primary)' }}>{title}</div>
              {subtitle && (
                <div style={{ fontSize: '11px', fontWeight: 600,
                  color: 'var(--md-text-tertiary)' }}>{subtitle}</div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {chips.map((c, idx) => (
              <Chip key={idx} bg={c.bg} fg={c.fg} border={c.border}>{c.children}</Chip>
            ))}
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,.02)' }}>
              {columns.map((col) => (
                <th key={col.key} style={{
                  ...TH_STYLE,
                  ...(col.headerStyle || {}),
                  ...(col.width ? { width: col.width } : {}),
                  ...(col.align === 'left' ? { textAlign: 'left' } : {}),
                }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((p, idx) => (
              <GenericRow key={p.vn || p.hn || idx} patient={p} idx={idx} columns={columns} />
            ))}
          </tbody>
        </table>

        {patients.length > visible.length && (
          <div style={{ padding: '12px 24px', fontSize: '11px',
            color: 'var(--md-text-tertiary)', textAlign: 'center',
            background: 'rgba(0,0,0,.015)' }}>
            แสดง {visible.length} จาก {patients.length} ราย
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Common report wrapper — empty/error states + content
// ============================================================
export function ReportShell({ loading, error, data, children, emptyMsg }) {
  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center',
        color: 'var(--md-text-tertiary)' }}>
        กำลังโหลดข้อมูล...
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ padding: '16px', borderRadius: '12px',
        background: 'rgba(239,68,68,.08)', color: '#dc2626',
        border: '1px solid rgba(239,68,68,.2)' }}>
        ❌ {error}
      </div>
    );
  }
  if (!data) {
    return (
      <div style={{ padding: '32px', textAlign: 'center',
        color: 'var(--md-text-tertiary)' }}>
        {emptyMsg || 'ไม่มีข้อมูล'}
      </div>
    );
  }
  return children;
}

// ============================================================
// useReportData — generic fetcher pattern (date-range based)
// ============================================================
export function useReportData(endpoint, start, end) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const load = React.useCallback(async () => {
    if (!start || !end) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${endpoint}?start=${start}&end=${end}&_t=${Date.now()}`,
        { credentials: 'include' },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [endpoint, start, end]);

  return { data, loading, error, load };
}

// ============================================================
// Helper: bucket ages into common ranges
// ============================================================
export function bucketAges(patients, buckets = ['<18', '18-34', '35-59', '60+']) {
  const out = {};
  buckets.forEach((b) => { out[b] = 0; });
  patients.forEach((p) => {
    const age = Number(p.age_y) || 0;
    if (age < 18 && buckets.includes('<18')) out['<18'] += 1;
    else if (age < 35 && buckets.includes('18-34')) out['18-34'] += 1;
    else if (age < 60 && buckets.includes('35-59')) out['35-59'] += 1;
    else if (buckets.includes('60+')) out['60+'] += 1;
  });
  return out;
}

// ============================================================
// Helper: aggregate by ICD-10 (top N)
// ============================================================
export function aggregateIcd10(patients, topN = 10) {
  const map = {};
  patients.forEach((p) => {
    const code = (p.icd10 || '').trim().toUpperCase();
    if (!code || !ICD10_PATTERN.test(code)) return;
    if (!map[code]) {
      map[code] = { code, name: p.icd10name, count: 0, totalInc: 0 };
    }
    map[code].count += 1;
    map[code].totalInc += p.income || 0;
  });
  return Object.values(map).sort((a, b) => b.count - a.count).slice(0, topN);
}

// ============================================================
// Helper: aggregate by department
// ============================================================
export function aggregateByDept(patients, key = 'department') {
  const map = {};
  patients.forEach((p) => {
    const d = p[key] || '-';
    if (!map[d]) map[d] = { count: 0, income: 0 };
    map[d].count += 1;
    map[d].income += p.income || 0;
  });
  return Object.entries(map).sort((a, b) => b[1].count - a[1].count);
}

// ============================================================
// Helper: daily trend builder
// ============================================================
export function buildDailyTrend(patients) {
  const map = {};
  patients.forEach((p) => {
    const date = (p.vstdate || '').substring(0, 10);
    if (!date) return;
    if (!map[date]) map[date] = { date, count: 0, income: 0 };
    map[date].count += 1;
    map[date].income += p.income || 0;
  });
  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}
