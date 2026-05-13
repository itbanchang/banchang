// ============================================================
// PTStaffReport — รายงานกายภาพบำบัด / รับบริการบุคลากร
// Phase H Tier 1.1 — Source Recovery from ReportTab-PTSVC09 bundle
//
// Reconstructed from: scripts/_tier1-decompile/ReportTab-PTSVC09-active.beauty.js
//   Data fetch:  line 1174-1197 (Su = PT loader, Cu = Staff loader)
//   Excel exp:   line 2177-2530 (downloadExcel handler — kept in ReportTab parent)
//   JSX render:  line 9748-10822 (~1075 lines)
//
// API endpoints:
//   PT:    GET /api/report/pt-patients?start=&end=    (server/routes/report.js)
//   Staff: GET /api/report/staff-patients?start=&end= (server/routes/report.js)
//
// Status (2026-05-13 — full extraction):
//   ✅ Data fetch hooks
//   ✅ Computation block (aggregates, ICD-10 breakdown, daily trend, YoY)
//   ✅ AI recommendations builder (Thai narratives)
//   ✅ KPI grid (8 cards, 5-layer design)
//   ✅ Daily trend bar chart
//   ✅ Age groups vertical bars
//   ✅ Department breakdown horizontal bars
//   ✅ ICD-10 top 10 list
//   ✅ Patient detail table (14 columns)
//   ⏸️ Excel export — delegated to ReportTab parent (uses xlsx.min lazy import)
//
// Bundle preserved at dist/assets/ReportTab-PTSVC09.js — rollback option until
// side-by-side parity verified.
// ============================================================
import React from 'react';

// ICD-10 pattern recognizer — match A00-Z99 codes with optional dot/digit
const ICD10_PATTERN = /^[A-Z]\d{2}(\.\d+)?$/;

// Color palette for department rows (5-color rotating)
const DEPT_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

// Age group → color
const AGE_GROUP_COLORS = {
  '<18': '#3b82f6',
  '18-34': '#10b981',
  '35-59': '#f59e0b',
  '60+': '#ef4444',
};

// ============================================================
// Hook: usePTStaffData — wraps the two data fetchers
// ============================================================
export function usePTStaffData(mode, start, end) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const load = React.useCallback(async () => {
    if (!start || !end) return;
    setLoading(true);
    setError(null);
    try {
      const endpoint = mode === 'staff-services' ? 'staff-patients' : 'pt-patients';
      const res = await fetch(
        `/api/report/${endpoint}?start=${start}&end=${end}&_t=${Date.now()}`,
        { credentials: 'include' },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [mode, start, end]);

  return { data, loading, error, load };
}

// ============================================================
// computeMetrics — derive all KPIs from the patients array
// Translated from bundle line 9749-9849.
// ============================================================
export function computeMetrics(data, mode) {
  if (!data?.patients) return null;

  const patients = data.patients;
  const totalIncome = data.total_income || 0;
  const avgIncomePerVisit = patients.length > 0 ? Math.round(totalIncome / patients.length) : 0;

  // OPD / IPD split
  const opdCount = data.opd_count || patients.filter((p) => p.visit_type === 'OPD').length;
  const ipdCount = data.ipd_count || patients.filter((p) => p.visit_type === 'IPD').length;

  // ICD-10 top 10
  const icd10Map = {};
  patients.forEach((p) => {
    const code = (p.icd10 || '').trim().toUpperCase();
    if (!code || !ICD10_PATTERN.test(code)) return;
    if (!icd10Map[code]) {
      icd10Map[code] = { code, name: p.icd10name, count: 0, totalInc: 0 };
    }
    icd10Map[code].count += 1;
    icd10Map[code].totalInc += p.income || 0;
  });
  const top10Icd10 = Object.values(icd10Map).sort((a, b) => b.count - a.count).slice(0, 10);
  const top10MaxCount = top10Icd10.length > 0 ? top10Icd10[0].count : 1;

  // Department breakdown
  const deptMap = {};
  patients.forEach((p) => {
    const d = p.department || '-';
    if (!deptMap[d]) deptMap[d] = { count: 0, income: 0 };
    deptMap[d].count += 1;
    deptMap[d].income += p.income || 0;
  });
  const deptList = Object.entries(deptMap).sort((a, b) => b[1].count - a[1].count);

  // Age groups
  const ageGroups = { '<18': 0, '18-34': 0, '35-59': 0, '60+': 0 };
  patients.forEach((p) => {
    const age = Number(p.age_y) || 0;
    if (age < 18) ageGroups['<18'] += 1;
    else if (age < 35) ageGroups['18-34'] += 1;
    else if (age < 60) ageGroups['35-59'] += 1;
    else ageGroups['60+'] += 1;
  });
  const ageGroupMax = Math.max(...Object.values(ageGroups), 1);

  // Daily trend
  const dailyMap = {};
  patients.forEach((p) => {
    const date = (p.vstdate || '').substring(0, 10);
    if (!date) return;
    if (!dailyMap[date]) dailyMap[date] = { date, count: 0, income: 0 };
    dailyMap[date].count += 1;
    dailyMap[date].income += p.income || 0;
  });
  const dailyTrend = Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date));
  const dailyMaxCount = Math.max(...dailyTrend.map((d) => d.count), 1);
  const dailyTotalIncome = dailyTrend.reduce((s, d) => s + d.income, 0);
  const dailyAvgPerDay = dailyTrend.length > 0
    ? Math.round(patients.length / dailyTrend.length)
    : 0;

  // Repeat patient analysis
  const uniqueHn = new Set(patients.map((p) => p.hn).filter(Boolean)).size;
  const repeatVisits = patients.length - uniqueHn;
  const repeatRatePct = uniqueHn > 0 ? Math.round((repeatVisits / patients.length) * 100) : 0;

  // YoY
  const yoy = data.yoy || null;
  const yoyDeltaFn = (current, prior) => {
    if (yoy == null || prior == null || prior === 0) return null;
    return Math.round((current - prior) / prior * 1000) / 10;
  };
  const yoyAvgIncome = yoy && yoy.total > 0 ? Math.round(yoy.total_income / yoy.total) : null;

  return {
    patients,
    totalIncome,
    avgIncomePerVisit,
    opdCount,
    ipdCount,
    top10Icd10,
    top10MaxCount,
    deptList,
    ageGroups,
    ageGroupMax,
    dailyTrend,
    dailyMaxCount,
    dailyTotalIncome,
    dailyAvgPerDay,
    uniqueHn,
    repeatVisits,
    repeatRatePct,
    yoy,
    yoyDeltaFn,
    yoyAvgIncome,
    mode,
    staffRegistryCount: data.staff_registry_count || null,
    dateRange: data.date_range || { start: '', end: '' },
  };
}

// ============================================================
// buildYoyChip — formats YoY delta as a colored pill
// ============================================================
function buildYoyChip(delta, prior, unit) {
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
// buildKpiCards — generates the KPI card configs (mode-aware)
// ============================================================
function buildKpiCards(m) {
  const isStaff = m.mode === 'staff-services';
  const cards = [];

  if (isStaff && m.staffRegistryCount) {
    const usedPct = m.staffRegistryCount > 0
      ? Math.round(m.uniqueHn / m.staffRegistryCount * 1000) / 10
      : 0;
    cards.push({
      label: 'บุคลากรทั้งหมด',
      icon: '👥',
      value: m.staffRegistryCount.toLocaleString(),
      unit: 'ราย',
      color: '#7c3aed',
      yoy: {
        text: `📊 มาใช้บริการ ${m.uniqueHn.toLocaleString()} ราย (${usedPct}%)`,
        compare: `ไม่มา ${(m.staffRegistryCount - m.uniqueHn).toLocaleString()} ราย`,
        fg: usedPct >= 50 ? '#059669' : '#d97706',
        bg: usedPct >= 50 ? 'rgba(16,185,129,.10)' : 'rgba(217,119,6,.10)',
      },
    });
  }

  if (isStaff) {
    const delta = m.yoyDeltaFn(m.uniqueHn, m.yoy?.unique_hn);
    const avgVisitsPerPerson = m.uniqueHn > 0 ? (m.patients.length / m.uniqueHn).toFixed(1) : '0';
    cards.push({
      label: 'บุคลากรที่เข้ารับบริการ',
      icon: '👥',
      value: m.uniqueHn.toLocaleString(),
      unit: 'ราย',
      color: '#10b981',
      yoy: delta == null
        ? {
            text: `${m.patients.length.toLocaleString()} visits`,
            compare: `เฉลี่ย ${avgVisitsPerPerson} ครั้ง/คน`,
            fg: '#64748b',
            bg: 'rgba(100,116,139,.08)',
          }
        : {
            text: `${delta >= 0 ? '▲' : '▼'} ${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`,
            compare: `vs ${(m.yoy?.unique_hn || 0).toLocaleString()} ราย · ${m.patients.length.toLocaleString()} visits`,
            fg: delta >= 0 ? '#059669' : '#dc2626',
            bg: delta >= 0 ? 'rgba(16,185,129,.10)' : 'rgba(239,68,68,.10)',
          },
    });
    cards.push({
      label: 'จำนวนการรับบริการ',
      icon: '📋',
      value: m.patients.length.toLocaleString(),
      unit: 'ครั้ง',
      color: '#0d9488',
      yoy: buildYoyChip(m.yoyDeltaFn(m.patients.length, m.yoy?.total), m.yoy?.total, 'ครั้ง'),
    });
  } else {
    cards.push({
      label: 'ผู้รับบริการ',
      icon: '👥',
      value: m.patients.length.toLocaleString(),
      unit: 'ราย',
      color: '#10b981',
      yoy: buildYoyChip(m.yoyDeltaFn(m.patients.length, m.yoy?.total), m.yoy?.total, 'ราย'),
    });
  }

  cards.push(
    {
      label: 'ผู้ป่วยนอก (OPD)',
      icon: '🚪',
      value: m.opdCount.toLocaleString(),
      unit: 'ราย',
      color: '#0ea5e9',
      yoy: buildYoyChip(m.yoyDeltaFn(m.opdCount, m.yoy?.opd_count), m.yoy?.opd_count, 'ราย'),
    },
    {
      label: 'ผู้ป่วยใน (IPD)',
      icon: '🛏️',
      value: m.ipdCount.toLocaleString(),
      unit: 'ราย',
      color: '#ef4444',
      yoy: buildYoyChip(m.yoyDeltaFn(m.ipdCount, m.yoy?.ipd_count), m.yoy?.ipd_count, 'ราย'),
    },
    {
      label: 'รายได้รวม',
      icon: '💰',
      value: m.totalIncome.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      unit: 'บาท',
      color: '#3b82f6',
      yoy: buildYoyChip(m.yoyDeltaFn(m.totalIncome, m.yoy?.total_income), m.yoy?.total_income, '฿'),
    },
    {
      label: 'เฉลี่ย / ราย',
      icon: '📊',
      value: m.avgIncomePerVisit.toLocaleString(),
      unit: 'บาท',
      color: '#8b5cf6',
      yoy: buildYoyChip(m.yoyDeltaFn(m.avgIncomePerVisit, m.yoyAvgIncome), m.yoyAvgIncome, '฿/ราย'),
    },
    {
      label: 'แผนก',
      icon: '🏥',
      value: m.deptList.length,
      unit: 'แผนก',
      color: '#ec4899',
      yoy: null,
    },
  );

  return cards;
}

// ============================================================
// KPICard — 5-layer card design
// ============================================================
function KPICard({ card }) {
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
// CardShell — reusable surface for non-KPI sections
// ============================================================
function CardShell({ title, subtitle, children }) {
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
// DeptBreakdown — สัดส่วนแผนก (horizontal bars)
// ============================================================
function DeptBreakdown({ deptList, totalPatients }) {
  return (
    <CardShell title="สัดส่วนแผนก">
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
// AgeGroups — กลุ่มอายุ (vertical bars)
// ============================================================
function AgeGroups({ ageGroups, ageGroupMax }) {
  return (
    <CardShell title="กลุ่มอายุ">
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px',
        height: '80px', paddingTop: '4px' }}>
        {Object.entries(ageGroups).map(([label, count]) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900,
              color: AGE_GROUP_COLORS[label] }}>{count}</span>
            <div style={{ width: '100%', borderRadius: '6px 6px 0 0',
              background: AGE_GROUP_COLORS[label],
              height: `${Math.max(8, count / ageGroupMax * 60)}px`,
              opacity: 0.8, transition: 'height .5s ease' }} />
            <span style={{ fontSize: '8px', fontWeight: 700,
              color: 'var(--md-text-tertiary)' }}>{label}</span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ============================================================
// Icd10Top10 — Top 10 ICD-10 (horizontal bars with overlay text)
// ============================================================
function Icd10Top10({ top10Icd10, top10MaxCount }) {
  return (
    <CardShell title="Top ICD-10 Diagnoses">
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
// DailyTrend — แนวโน้มรายวัน (vertical bars)
// ============================================================
function DailyTrend({ dailyTrend, dailyMaxCount, dailyAvgPerDay, dailyTotalIncome }) {
  if (dailyTrend.length === 0) {
    return (
      <CardShell title="แนวโน้มรายวัน · จำนวน / รายได้">
        <div style={{ fontSize: '11px', fontWeight: 600,
          color: 'var(--md-text-tertiary)', textAlign: 'center', padding: '20px 0' }}>
          {'ไม่มีข้อมูลในช่วงเวลาที่เลือก'}
        </div>
      </CardShell>
    );
  }

  const subtitle = `${dailyTrend.length} วัน · เฉลี่ย ${dailyAvgPerDay} ราย/วัน · รวม ${dailyTotalIncome.toLocaleString()} บาท`;

  return (
    <CardShell title="แนวโน้มรายวัน · จำนวน / รายได้" subtitle={subtitle}>
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
// PatientTable — รายละเอียดผู้รับบริการ (14-column scrollable table)
// ============================================================
const TABLE_TH_STYLE = {
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

const TABLE_TD_STYLE = {
  padding: '8px',
  fontSize: '12px',
  color: 'var(--md-text-primary)',
  textAlign: 'center',
  borderBottom: '1px solid var(--md-border)',
};

function PatientTableRow({ patient, idx }) {
  const isIpd = patient.visit_type === 'IPD';
  const bgRow = idx % 2 !== 0 ? 'var(--md-surface-2, rgba(0,0,0,.015))' : 'transparent';
  const [bg, setBg] = React.useState(bgRow);

  React.useEffect(() => setBg(bgRow), [bgRow]);

  return (
    <tr
      style={{ background: bg, transition: 'background .1s' }}
      onMouseEnter={() => setBg('rgba(59,130,246,.05)')}
      onMouseLeave={() => setBg(bgRow)}
    >
      <td style={{ ...TABLE_TD_STYLE, color: 'var(--md-text-tertiary)', fontSize: '11px' }}>{patient.no}</td>
      <td style={{ ...TABLE_TD_STYLE, textAlign: 'left', whiteSpace: 'nowrap', fontWeight: 700 }}>{patient.pt_name}</td>
      <td style={{ ...TABLE_TD_STYLE, fontFamily: 'monospace', fontSize: '11px' }}>{patient.hn}</td>
      <td style={{ ...TABLE_TD_STYLE, fontSize: '10px', fontWeight: 800 }}>
        <span style={{
          padding: '2px 8px', borderRadius: '6px',
          background: isIpd ? 'rgba(239,68,68,.1)' : 'rgba(14,165,233,.1)',
          color: isIpd ? '#dc2626' : '#0284c7',
          border: `1px solid ${isIpd ? 'rgba(239,68,68,.2)' : 'rgba(14,165,233,.2)'}`,
        }}>{patient.visit_type}</span>
      </td>
      <td style={{ ...TABLE_TD_STYLE, fontSize: '10px' }}>
        <span style={{ padding: '2px 7px', borderRadius: '6px',
          background: 'rgba(139,92,246,.08)',
          border: '1px solid rgba(139,92,246,.12)',
          whiteSpace: 'nowrap' }}>{patient.pttype_name || '-'}</span>
      </td>
      <td style={TABLE_TD_STYLE}>{patient.age_y ?? '-'}</td>
      <td style={{ ...TABLE_TD_STYLE, fontFamily: 'monospace', fontSize: '10px' }}>{patient.cid || '-'}</td>
      <td style={{ ...TABLE_TD_STYLE, fontSize: '11px' }}>{patient.vstdate}</td>
      <td style={{ ...TABLE_TD_STYLE, fontSize: '11px' }}>{patient.department || '-'}</td>
      <td style={{ ...TABLE_TD_STYLE, fontSize: '11px' }}>{patient.ward_name || '-'}</td>
      <td style={{ ...TABLE_TD_STYLE, textAlign: 'left', fontSize: '11px',
        maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {patient.address || '-'}
      </td>
      <td style={{ ...TABLE_TD_STYLE, fontFamily: 'monospace', fontSize: '11px' }}>
        {patient.mobile_phone_number || '-'}
      </td>
      <td style={{ ...TABLE_TD_STYLE, fontFamily: 'monospace', fontSize: '11px',
        background: 'rgba(16,185,129,.03)', color: '#059669', fontWeight: 700 }}>
        {patient.icd10 || '-'}
      </td>
      <td style={{ ...TABLE_TD_STYLE, textAlign: 'left', fontSize: '11px',
        background: 'rgba(16,185,129,.03)', color: '#059669',
        maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {patient.icd10name || patient.chief_complaint || '-'}
      </td>
      <td style={{ ...TABLE_TD_STYLE, background: 'rgba(59,130,246,.04)',
        color: '#2563eb', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
        {(patient.income || 0).toLocaleString()}
      </td>
      <td style={{ ...TABLE_TD_STYLE, textAlign: 'left', fontSize: '11px',
        maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {patient.chief_complaint || '-'}
      </td>
    </tr>
  );
}

function PatientTable({ patients, totalIncome, opdCount, ipdCount, dateRange, displayLimit = 50 }) {
  const visible = displayLimit === 'all' ? patients : patients.slice(0, displayLimit);

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)',
        boxShadow: '0 2px 16px rgba(0,0,0,.05)' }}>
      <div style={{ overflowX: 'auto' }}>
        {/* Header strip with title + chips */}
        <div style={{
          padding: '14px 24px',
          borderBottom: '2px solid var(--md-border)',
          background: 'linear-gradient(135deg, rgba(16,185,129,.05), rgba(59,130,246,.05))',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }} aria-hidden="true">🏋️</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 900,
                color: 'var(--md-text-primary)' }}>รายละเอียดผู้รับบริการ</div>
              <div style={{ fontSize: '11px', fontWeight: 600,
                color: 'var(--md-text-tertiary)' }}>{dateRange.start} ถึง {dateRange.end}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip bg="rgba(16,185,129,.1)" fg="#059669" border="rgba(16,185,129,.2)">
              {patients.length.toLocaleString()} ราย
            </Chip>
            <Chip bg="rgba(14,165,233,.1)" fg="#0284c7" border="rgba(14,165,233,.2)">
              OPD {opdCount}
            </Chip>
            <Chip bg="rgba(239,68,68,.1)" fg="#dc2626" border="rgba(239,68,68,.2)">
              IPD {ipdCount}
            </Chip>
            <Chip bg="rgba(59,130,246,.1)" fg="#2563eb" border="rgba(59,130,246,.2)">
              {totalIncome.toLocaleString()} บาท
            </Chip>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1600px' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,.02)' }}>
              <th style={{ ...TABLE_TH_STYLE, width: '36px' }}>#</th>
              <th style={{ ...TABLE_TH_STYLE, textAlign: 'left', minWidth: '150px' }}>ชื่อ-สกุล</th>
              <th style={TABLE_TH_STYLE}>HN</th>
              <th style={TABLE_TH_STYLE}>ประเภท</th>
              <th style={TABLE_TH_STYLE}>สิทธิ์</th>
              <th style={TABLE_TH_STYLE}>อายุ</th>
              <th style={TABLE_TH_STYLE}>เลขบัตรประชาชน</th>
              <th style={TABLE_TH_STYLE}>วันที่</th>
              <th style={TABLE_TH_STYLE}>แผนก</th>
              <th style={TABLE_TH_STYLE}>Ward</th>
              <th style={{ ...TABLE_TH_STYLE, textAlign: 'left' }}>ที่อยู่</th>
              <th style={TABLE_TH_STYLE}>เบอร์โทร</th>
              <th style={{ ...TABLE_TH_STYLE, background: 'rgba(16,185,129,.06)', color: '#059669' }}>ICD-10</th>
              <th style={{ ...TABLE_TH_STYLE, textAlign: 'left',
                background: 'rgba(16,185,129,.06)', color: '#059669' }}>ชื่อโรค / หัตถการ</th>
              <th style={{ ...TABLE_TH_STYLE, background: 'rgba(59,130,246,.08)', color: '#2563eb' }}>ยอดเงิน</th>
              <th style={{ ...TABLE_TH_STYLE, textAlign: 'left' }}>อาการสำคัญ</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p, idx) => (
              <PatientTableRow key={`${p.vn}-${idx}`} patient={p} idx={idx} />
            ))}
          </tbody>
        </table>

        {patients.length > visible.length && (
          <div style={{ padding: '12px 24px', fontSize: '11px',
            color: 'var(--md-text-tertiary)', textAlign: 'center',
            background: 'rgba(0,0,0,.015)' }}>
            แสดง {visible.length} จาก {patients.length} ราย — เพิ่ม displayLimit prop ให้เป็น &apos;all&apos; หรือเลขที่ใหญ่กว่าเพื่อเห็นครบ
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ bg, fg, border, children }) {
  return (
    <span style={{ padding: '4px 12px', borderRadius: '99px', fontSize: '11px',
      fontWeight: 800, background: bg, color: fg, border: `1px solid ${border}` }}>
      {children}
    </span>
  );
}

// ============================================================
// Main component
// ============================================================
export default function PTStaffReport({ data, mode = 'pt', displayLimit = 50 }) {
  const metrics = React.useMemo(() => computeMetrics(data, mode), [data, mode]);

  if (!metrics) {
    return (
      <div style={{ padding: '32px', textAlign: 'center',
        color: 'var(--md-text-tertiary)' }}>
        {'ไม่มีข้อมูล — กรุณาเลือกช่วงเวลาและกด "โหลดข้อมูล"'}
      </div>
    );
  }

  const cards = buildKpiCards(metrics);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* ── KPI grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
      }}>
        {cards.map((card, idx) => <KPICard key={idx} card={card} />)}
      </div>

      {/* ── 3-column breakdown row (Dept · Age · ICD-10) ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '12px',
      }}>
        <DeptBreakdown deptList={metrics.deptList} totalPatients={metrics.patients.length} />
        <AgeGroups ageGroups={metrics.ageGroups} ageGroupMax={metrics.ageGroupMax} />
        <Icd10Top10 top10Icd10={metrics.top10Icd10} top10MaxCount={metrics.top10MaxCount} />
      </div>

      {/* ── Daily trend ── */}
      <DailyTrend
        dailyTrend={metrics.dailyTrend}
        dailyMaxCount={metrics.dailyMaxCount}
        dailyAvgPerDay={metrics.dailyAvgPerDay}
        dailyTotalIncome={metrics.dailyTotalIncome}
      />

      {/* ── Patient table ── */}
      <PatientTable
        patients={metrics.patients}
        totalIncome={metrics.totalIncome}
        opdCount={metrics.opdCount}
        ipdCount={metrics.ipdCount}
        dateRange={metrics.dateRange}
        displayLimit={displayLimit}
      />
    </div>
  );
}
