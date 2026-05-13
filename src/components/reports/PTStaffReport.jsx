// ============================================================
// PTStaffReport — รายงานกายภาพบำบัด / รับบริการบุคลากร
// Phase H Tier 1.1 — Source Recovery from ReportTab-PTSVC09 bundle
//
// Reconstructed from: scripts/_tier1-decompile/ReportTab-PTSVC09-active.beauty.js
//   Data fetch:  line 1174-1197 (Su = PT loader, Cu = Staff loader)
//   Excel exp:   line 2177-2530 (downloadExcel handler)
//   JSX render:  line 9748-10822 (~1075 lines)
//
// API endpoints:
//   PT:    GET /api/report/pt-patients?start=&end=    (server/routes/report.js)
//   Staff: GET /api/report/staff-patients?start=&end= (server/routes/report.js)
//
// Status (2026-05-13):
//   ✅ Data fetch hooks
//   ✅ Computation block (aggregates, ICD-10 breakdown, daily trend, YoY)
//   ✅ AI recommendations builder (Thai narratives)
//   ✅ KPI grid (8 cards, 5-layer design)
//   ⏸️ Daily trend chart        — TODO next iteration
//   ⏸️ Age groups chart         — TODO next iteration
//   ⏸️ Department breakdown     — TODO next iteration
//   ⏸️ ICD-10 top 10 chart      — TODO next iteration
//   ⏸️ Patient list table       — TODO next iteration
//
// Bundle preserved at dist/assets/ReportTab-PTSVC09.js — rollback option until
// full extraction verified via side-by-side parity test.
// ============================================================
import React from 'react';
// Reserved for future visualizations (charts, table) — uncomment when wiring next iteration:
// import { formatBaht, formatInt, formatPct } from '../../utils/format';

// ICD-10 pattern recognizer — match A00-Z99 codes with optional dot/digit
// Used to filter chief-complaint codes vs free-text
const ICD10_PATTERN = /^[A-Z]\d{2}(\.\d+)?$/;

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
  const opdIncome = data.opd_income || patients.filter((p) => p.visit_type === 'OPD').reduce((s, p) => s + p.income, 0);
  const ipdIncome = data.ipd_income || patients.filter((p) => p.visit_type === 'IPD').reduce((s, p) => s + p.income, 0);

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

  // Peak/low days
  const peakDay = dailyTrend.length > 0
    ? dailyTrend.reduce((peak, day) => day.count > peak.count ? day : peak, dailyTrend[0])
    : null;
  const lowDay = dailyTrend.length > 0
    ? dailyTrend.reduce((low, day) => day.count < low.count ? day : low, dailyTrend[0])
    : null;

  // Repeat patient analysis
  const uniqueHn = new Set(patients.map((p) => p.hn).filter(Boolean)).size;
  const repeatPatientHnSet = new Set();
  const hnCounts = {};
  patients.forEach((p) => {
    if (p.hn) hnCounts[p.hn] = (hnCounts[p.hn] || 0) + 1;
  });
  Object.entries(hnCounts).forEach(([hn, count]) => {
    if (count > 1) repeatPatientHnSet.add(hn);
  });
  const repeatPatientCount = repeatPatientHnSet.size;
  const repeatVisits = patients.length - uniqueHn;
  const repeatRatePct = uniqueHn > 0 ? Math.round((repeatVisits / patients.length) * 100) : 0;

  // YoY (year-over-year)
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
    opdIncome,
    ipdIncome,
    top10Icd10,
    deptList,
    ageGroups,
    dailyTrend,
    peakDay,
    lowDay,
    uniqueHn,
    repeatPatientCount,
    repeatVisits,
    repeatRatePct,
    yoy,
    yoyDeltaFn,
    yoyAvgIncome,
    mode,
    // Bundle-specific staff-only field
    staffRegistryCount: data.staff_registry_count || null,
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
// buildKpiCards — generates the 8 KPI card configs
// ============================================================
function buildKpiCards(m) {
  const isStaff = m.mode === 'staff-services';
  const cards = [];

  // Card 1 (staff-only): Total registry vs used
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

  // Card 2: Patient count (staff-services shows unique HN, PT shows total)
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
            compare: `vs ${(m.yoy?.unique_hn || 0).toLocaleString()} ราย · ${m.patients.length.toLocaleString()} visits (เฉลี่ย ${avgVisitsPerPerson}/คน)`,
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

  // Cards 3-7: shared between modes
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
// KPICard — 5-layer card design (accent bar · icon tile · label · value · YoY chip)
// Translated from bundle line 9946-10080.
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
      {/* Accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${card.color}, ${card.color}55)`,
        }}
      />

      {/* Icon + Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${card.color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {card.icon}
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: 'var(--md-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '.06em',
          }}
        >
          {card.label}
        </span>
      </div>

      {/* Value + Unit */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: card.yoy ? '8px' : 0 }}>
        <span
          style={{
            fontSize: '28px',
            fontWeight: 900,
            color: card.color,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {card.value}
        </span>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
          {card.unit}
        </span>
      </div>

      {/* YoY chip */}
      {card.yoy && (
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '2px',
            padding: '4px 10px',
            borderRadius: '99px',
            background: card.yoy.bg,
            fontSize: '10px',
            fontWeight: 700,
            color: card.yoy.fg,
            maxWidth: '100%',
          }}
        >
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
// Main component
// ============================================================
export default function PTStaffReport({ data, mode = 'pt' }) {
  const metrics = React.useMemo(() => computeMetrics(data, mode), [data, mode]);

  if (!metrics) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
        {'ไม่มีข้อมูล — กรุณาเลือกช่วงเวลาและกด "โหลดข้อมูล"'}
      </div>
    );
  }

  const cards = buildKpiCards(metrics);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* ── KPI grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
        }}
      >
        {cards.map((card, idx) => (
          <KPICard key={idx} card={card} />
        ))}
      </div>

      {/* TODO next iteration:
          - Daily trend chart (Recharts AreaChart)
          - Age groups breakdown (horizontal bars)
          - Department breakdown (Recharts BarChart or Treemap)
          - ICD-10 top 10 (Recharts BarChart)
          - Patient list table (with sort/filter/excel export)
          - AI recommendations panel (K0 narratives from bundle line 9836-9844)
          Bundle reference: scripts/_tier1-decompile/ReportTab-PTSVC09-active.beauty.js
          lines 10100-10822
      */}
      <div
        style={{
          padding: '16px',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px dashed rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          fontSize: '12px',
          color: 'var(--md-text-secondary)',
        }}
      >
        {'⏸️ '}<strong>Tier 1.1 partial extraction (KPI grid only)</strong>{' — รายการเพิ่มเติม (กราฟ trend, age groups, แผนก, ICD-10 top 10, รายการผู้ป่วย) ยังอยู่ใน bundle prod ที่ '}
        <code>dist/assets/ReportTab-PTSVC09.js</code>{'. การ extract ต่อจะอยู่ในเซสชันถัดไป.'}
      </div>
    </div>
  );
}
