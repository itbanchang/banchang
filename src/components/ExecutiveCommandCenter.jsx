// ============================================================
// ExecutiveCommandCenter — Bloomberg Terminal × NASA Mission Control
// BCH 360° Intelligence V.10 — Crown Jewel Component
// Premium hospital command center displayed above tab navigation
// ============================================================
import React, { useMemo, useState } from 'react';
import HealthGauge from './shared/HealthGauge.jsx';

// ── Color tokens ────────────────────────────────────────────
const TEAL = '#0f766e';
const TEAL_LIGHT = '#2dd4bf';
const EMERALD = '#10b981';
const ROSE = '#f43f5e';
const AMBER = '#f59e0b';
const SKY = '#0284c7';
const VIOLET = '#7c3aed';
const SLATE = '#64748b';

// ── Utility: safe number extraction ─────────────────────────
const n = (v, fallback = 0) => {
  const parsed = Number(v);
  return Number.isFinite(parsed) ? parsed : fallback;
};
const clamp = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v));

// ── Score computation functions ─────────────────────────────
function computeFinancialHealth(s) {
  if (!s) return 50;
  const collectionRate = n(s.collection_rate, 85);
  const collectionScore = clamp(collectionRate, 0, 100);
  const revenueThisMonth = n(s.revenue_this_month, 0);
  const revenueTarget = n(s.revenue_target, revenueThisMonth * 1.1 || 10000000);
  const revenueScore = revenueTarget > 0 ? clamp((revenueThisMonth / revenueTarget) * 100) : 50;
  const denialRate = n(s.denial_rate, 5);
  const denialScore = clamp(100 - denialRate * 5);
  return Math.round(collectionScore * 0.4 + revenueScore * 0.35 + denialScore * 0.25);
}

function computeClinicalSafety(s) {
  if (!s) return 75;
  const critical = n(s.critical_patients, 0);
  const highRisk = n(s.high_risk_patients || s.risk_patients, 0);
  return clamp(Math.round(100 - critical * 10 - highRisk * 3));
}

function computeOperational(s) {
  if (!s) return 60;
  const opdToday = n(s.opd_today, 0);
  const opdTarget = n(s.opd_target, 800);
  const opdNormalcy = opdTarget > 0 ? clamp((opdToday / opdTarget) * 100) : 50;
  const occupancy = n(s.occupancy_rate, 50);
  // Optimal bed occupancy range: 75-85%. Distance from midpoint (80) penalized.
  const occDeviation = Math.abs(occupancy - 80);
  const occScore = clamp(100 - occDeviation * 2);
  return Math.round(opdNormalcy * 0.5 + occScore * 0.5);
}

function computeQualityScore(s) {
  if (!s) return 70;
  const readmission = n(s.readmission_rate, 5);
  const mortality = n(s.mortality_rate, 1);
  const satisfaction = n(s.satisfaction_score || s.quality_score, 80);
  const readmissionScore = clamp(100 - readmission * 5);
  const mortalityScore = clamp(100 - mortality * 10);
  return Math.round(readmissionScore * 0.3 + mortalityScore * 0.3 + clamp(satisfaction) * 0.4);
}

// ── Insight generation ──────────────────────────────────────
function generateInsights(summary, clinicalInsights) {
  const insights = [];
  // Extract counts from clinical intelligence structure: {doctor:[], nurse:[], admin:[], summary:{}}
  const doctorAlerts = clinicalInsights?.doctor || [];
  const sepsisAlert = doctorAlerts.find(d => d.id === 'sepsis_alert');
  const deteriorAlert = doctorAlerts.find(d => d.id === 'deterioration_alert');
  const labAlert = doctorAlerts.find(d => d.id === 'critical_labs');
  const totalClinical = (sepsisAlert?.count || 0) + (deteriorAlert?.count || 0) + (labAlert?.count || 0);

  // Clinical risk insight — from real data
  if (totalClinical > 0) {
    const parts = [];
    if (sepsisAlert?.count > 0) parts.push(`Sepsis risk ${sepsisAlert.count} ราย`);
    if (deteriorAlert?.count > 0) parts.push(`Deteriorating ${deteriorAlert.count} ราย`);
    if (labAlert?.count > 0) parts.push(`Critical lab ${labAlert.count} รายการ`);
    insights.push({
      type: 'clinical', severity: sepsisAlert?.priority === 'critical' || deteriorAlert?.priority === 'critical' ? 'critical' : 'warning',
      icon: '🔬', title: 'Clinical Risk Alert', titleTh: 'แจ้งเตือนความเสี่ยงทางคลินิก',
      text: parts.join(' · ') + ' — ต้องดำเนินการ', color: ROSE,
    });
  } else {
    const critical = n(summary?.critical_patients, 0);
    insights.push({
      type: 'clinical',
      severity: critical > 3 ? 'critical' : critical > 0 ? 'warning' : 'stable',
      icon: '🔬', title: 'Clinical Risk Alert', titleTh: 'แจ้งเตือนความเสี่ยงทางคลินิก',
      text: critical > 3 ? `${critical} critical patients — sepsis screening recommended`
        : critical > 0 ? `${critical} patient(s) under monitoring — vitals stable`
          : 'All patients within safe parameters',
      color: critical > 3 ? ROSE : critical > 0 ? AMBER : EMERALD,
    });
  }

  // Financial insight
  const revenue = n(summary?.revenue_this_month, 0);
  const revenueYtd = n(summary?.revenue_ytd, 0);
  const collectionRate = n(summary?.collection_rate, 85);
  insights.push({
    type: 'financial',
    severity: collectionRate < 80 ? 'warning' : 'stable',
    icon: '💹',
    title: 'Financial Intelligence',
    titleTh: 'วิเคราะห์การเงิน',
    text: revenue > 0
      ? `Monthly revenue ฿${(revenue / 1e6).toFixed(1)}M | YTD ฿${(revenueYtd / 1e6).toFixed(1)}M — ${collectionRate >= 85 ? 'collection rate on target' : 'collection rate below target, review pending claims'}`
      : 'Revenue data syncing — financial analytics will refresh at next cycle',
    color: collectionRate < 80 ? AMBER : TEAL,
  });

  // Operational insight
  const opd = n(summary?.opd_today, 0);
  const er = n(summary?.er_today, 0);
  const occupancy = n(summary?.occupancy_rate, 0);
  insights.push({
    type: 'operational',
    severity: occupancy > 90 ? 'critical' : occupancy > 80 ? 'warning' : 'stable',
    icon: '⚙️',
    title: 'Operational Status',
    titleTh: 'สถานะการดำเนินงาน',
    text: `OPD ${opd} visits | ER ${er} cases | Bed occupancy ${occupancy}% — ${occupancy > 90 ? 'SURGE PROTOCOL: activate overflow beds' : occupancy > 80 ? 'approaching capacity, monitor admissions' : 'capacity within normal range'}`,
    color: occupancy > 90 ? ROSE : occupancy > 80 ? AMBER : EMERALD,
  });

  return insights;
}

// ── Format helpers ──────────────────────────────────────────
const fmtNum = (v) => {
  const num = n(v);
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K`;
  return num.toLocaleString();
};

const fmtCurrency = (v) => `฿${fmtNum(v)}`;

// ── Styles ──────────────────────────────────────────────────
const containerStyle = {
  position: 'relative',
  borderRadius: '20px',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid var(--md-border)',
  boxShadow: 'var(--md-shadow-xl, 0 20px 40px rgba(15,23,42,.08))',
  overflow: 'hidden',
  marginBottom: '1.5rem',
};

const gradientTopBorder = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '3px',
  background: `linear-gradient(90deg, ${TEAL}, ${TEAL_LIGHT}, ${EMERALD}, ${SKY}, ${VIOLET})`,
  borderRadius: '20px 20px 0 0',
  zIndex: 2,
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: '10px',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: 'var(--md-text-tertiary)',
};

const headerBarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 24px 12px',
};

const sectionDivider = {
  height: '1px',
  margin: '0 24px',
  background: 'linear-gradient(90deg, transparent, var(--md-border), transparent)',
};

// ── Sub-components ──────────────────────────────────────────

/** Compact metric tile for the Live Operations grid */
const OpsTile = React.memo(function OpsTile({ icon, label, value, unit, trend, color = TEAL }) {
  const trendColor = trend > 0 ? EMERALD : trend < 0 ? ROSE : SLATE;
  const trendArrow = trend > 0 ? '▲' : trend < 0 ? '▼' : '—';

  return (
    <div
      style={{
        padding: '12px 14px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
        border: `1px solid ${color}25`,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
        cursor: 'default',
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}60`;
        e.currentTarget.style.boxShadow = `0 4px 20px ${color}20`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}25`;
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
        <span style={{ fontSize: '14px', lineHeight: 1, flexShrink: 0 }}>{icon}</span>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--md-text-tertiary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {label}
        </span>
      </div>
      {/* Value row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', minWidth: 0 }}>
        <span
          style={{
            fontSize: '20px',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: 'var(--md-text-primary)',
            lineHeight: 1,
          }}
        >
          {value ?? '—'}
        </span>
        {unit && (
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
            {unit}
          </span>
        )}
      </div>
      {/* Trend */}
      {trend !== undefined && trend !== null && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '9px', fontWeight: 900, color: trendColor, lineHeight: 1 }}>
            {trendArrow}
          </span>
          <span style={{ fontSize: '10px', fontWeight: 800, color: trendColor }}>
            {Math.abs(trend)}%
          </span>
        </div>
      )}
    </div>
  );
});

/** AI Insight card */
const InsightCard = React.memo(function InsightCard({ icon, title, titleTh, text, color, severity }) {
  const severityBg =
    severity === 'critical'
      ? `${ROSE}12`
      : severity === 'warning'
        ? `${AMBER}12`
        : `${EMERALD}10`;
  const severityBorder =
    severity === 'critical' ? `${ROSE}35` : severity === 'warning' ? `${AMBER}35` : `${EMERALD}25`;
  const severityLabel =
    severity === 'critical' ? 'CRITICAL' : severity === 'warning' ? 'MONITOR' : 'STABLE';
  const severityDot =
    severity === 'critical' ? ROSE : severity === 'warning' ? AMBER : EMERALD;

  return (
    <div
      style={{
        padding: '14px 16px',
        borderRadius: '14px',
        background: `linear-gradient(135deg, ${severityBg}, transparent)`,
        border: `1px solid ${severityBorder}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: '1 1 0',
        minWidth: 0,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 24px ${color}18`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'none';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px', lineHeight: 1 }}>{icon}</span>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: '11px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--md-text-primary)',
                lineHeight: 1.2,
              }}
            >
              {title}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '9px',
                fontWeight: 600,
                color: 'var(--md-text-tertiary)',
                lineHeight: 1.3,
              }}
            >
              {titleTh}
            </p>
          </div>
        </div>
        {/* Severity badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '999px',
            background: `${severityDot}18`,
            border: `1px solid ${severityDot}40`,
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: severityDot,
              boxShadow: `0 0 6px ${severityDot}80`,
              animation: severity === 'critical' ? 'ecc-pulse 1.5s infinite' : 'none',
            }}
          />
          <span style={{ fontSize: '8px', fontWeight: 900, color: severityDot, letterSpacing: '0.1em' }}>
            {severityLabel}
          </span>
        </div>
      </div>
      {/* Body */}
      <p
        style={{
          margin: 0,
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--md-text-secondary)',
          lineHeight: 1.55,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {text}
      </p>
    </div>
  );
});

/** Live pulse indicator */
const LivePulse = React.memo(function LivePulse({ isLive }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isLive ? EMERALD : SLATE,
          boxShadow: isLive ? `0 0 8px ${EMERALD}80` : 'none',
          animation: isLive ? 'ecc-pulse 2s infinite' : 'none',
        }}
      />
      <span
        style={{
          fontSize: '10px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: isLive ? EMERALD : SLATE,
        }}
      >
        {isLive ? 'LIVE' : 'OFFLINE'}
      </span>
    </div>
  );
});

// ── Keyframe injection (once) ───────────────────────────────
const STYLE_ID = 'ecc-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes ecc-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }
    @keyframes ecc-scan {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
  `;
  document.head.appendChild(style);
}

// ── Main Component ──────────────────────────────────────────
function ExecutiveCommandCenter({ summary, systemStatus, isLive, clinicalInsights }) {
  const [collapsed, setCollapsed] = useState(true);

  // ─── Flatten nested summary into flat structure ───────────
  const s = useMemo(() => {
    if (!summary) return null;
    const f = summary.finance || {};
    const o = summary.opd || {};
    const i = summary.ipd || {};
    const e = summary.er || {};
    const b = summary.beds || {};
    const c = summary.clinical || {};
    const st = summary.staff || {};
    return {
      // Finance
      revenue_this_month: f.revenue_this_month ?? f.total_revenue,
      total_revenue: f.total_revenue,
      collection_rate: f.collection_rate,
      denial_rate: f.denial_rate,
      trend_revenue: f.trend_revenue,
      debtors_outstanding: f.debtors_outstanding,
      // OPD
      opd_today: o.today_visits,
      trend_opd: o.trend_visits,
      // IPD
      ipd_current: i.active_admissions,
      trend_ipd: i.trend_admissions,
      alos: i.alos,
      // ER
      er_today: e.today_visits,
      trend_er: e.trend_visits,
      // Beds
      total_beds: b.total,
      beds_occupied: b.occupied,
      beds_available: b.available,
      occupancy_rate: b.occupancy_rate,
      // Clinical
      critical_patients: c.critical_patients,
      high_risk_patients: c.high_risk_patients,
      total_monitored: c.total_monitored,
      // Staff
      staff_on_duty: st.on_duty,
      doctors_today: st.doctors_today,
    };
  }, [summary]);

  // ─── Computed scores (memoized) ─────────────────────────
  const scores = useMemo(() => {
    const financial = computeFinancialHealth(s);
    const clinical = computeClinicalSafety(s);
    const operational = computeOperational(s);
    const quality = computeQualityScore(s);
    const overall = Math.round(
      financial * 0.25 + clinical * 0.30 + operational * 0.25 + quality * 0.20
    );
    return { overall, financial, clinical, operational, quality };
  }, [s]);

  // ─── Live operation metrics (memoized) ──────────────────
  const ops = useMemo(() => [
    {
      icon: '💰',
      label: 'รายได้เดือนนี้',
      value: s?.revenue_this_month ? fmtCurrency(s.revenue_this_month) : '—',
      unit: '',
      trend: s?.trend_revenue != null ? n(s.trend_revenue) : null,
      color: TEAL,
    },
    {
      icon: '⏱️',
      label: 'OPD วันนี้',
      value: s?.opd_today != null ? n(s.opd_today).toLocaleString() : '—',
      unit: 'visits',
      trend: s?.trend_opd != null ? n(s.trend_opd) : null,
      color: SKY,
    },
    {
      icon: '🏥',
      label: 'IPD ปัจจุบัน',
      value: s?.ipd_current != null ? n(s.ipd_current).toLocaleString() : '—',
      unit: 'pts',
      trend: s?.trend_ipd != null ? n(s.trend_ipd) : null,
      color: VIOLET,
    },
    {
      icon: '🚑',
      label: 'ER วันนี้',
      value: s?.er_today != null ? n(s.er_today).toLocaleString() : '—',
      unit: 'cases',
      trend: s?.trend_er != null ? n(s.trend_er) : null,
      color: ROSE,
    },
    {
      icon: '🛏️',
      label: 'เตียงว่าง',
      value: s?.beds_occupied != null ? `${n(s.beds_occupied)}/${n(s.total_beds)}` : '—',
      unit: s?.occupancy_rate != null ? `${n(s.occupancy_rate)}%` : '',
      trend: null,
      color: AMBER,
    },
    {
      icon: '👨‍⚕️',
      label: 'Staff On-Duty',
      value: s?.staff_on_duty != null ? n(s.staff_on_duty) : '—',
      unit: '',
      trend: null,
      color: EMERALD,
    },
    {
      icon: '🚨',
      label: 'Critical Pts',
      value: s?.critical_patients != null ? n(s.critical_patients) : '—',
      unit: 'pts',
      trend: null,
      color: ROSE,
    },
    {
      icon: '📊',
      label: 'Quality Score',
      value: scores.quality,
      unit: '/100',
      trend: null,
      color: TEAL,
    },
  ], [s, scores.quality]);

  // ─── AI Insights (memoized) ─────────────────────────────
  const insights = useMemo(
    () => generateInsights(s, clinicalInsights),
    [s, clinicalInsights]
  );

  // ─── Timestamp ──────────────────────────────────────────
  const timestamp = useMemo(() => {
    const now = new Date();
    return now.toLocaleString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }, [isLive]); // re-derive when live status changes; parent re-render provides real-time

  // ── Render ────────────────────────────────────────────────
  return (
    <>
      {/* ── Desktop / Tablet (lg+) ─────────────────────────── */}
      <div className="hidden lg:block" style={containerStyle}>
        {/* Gradient top accent */}
        <div style={gradientTopBorder} />

        {/* Scanning light effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '30%',
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${TEAL_LIGHT}90, transparent)`,
            animation: isLive ? 'ecc-scan 3s linear infinite' : 'none',
            zIndex: 3,
            borderRadius: '20px 20px 0 0',
          }}
        />

        {/* ── Header bar ────────────────────────────────────── */}
        <div style={headerBarStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${TEAL}, ${TEAL_LIGHT})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${TEAL}40`,
              }}
            >
              <span style={{ fontSize: '16px', lineHeight: 1 }}>🎛️</span>
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '13px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--md-text-primary)',
                  lineHeight: 1.2,
                }}
              >
                Executive Command Center
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--md-text-tertiary)',
                  letterSpacing: '0.06em',
                }}
              >
                BCH 360° INTELLIGENCE ・ {timestamp}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LivePulse isLive={isLive} />
            <button
              onClick={() => setCollapsed((c) => !c)}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--md-border)',
                borderRadius: '8px',
                padding: '4px 10px',
                cursor: 'pointer',
                fontSize: '10px',
                fontWeight: 800,
                color: 'var(--md-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'var(--md-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = 'var(--md-text-tertiary)';
              }}
              aria-label={collapsed ? 'Expand command center' : 'Collapse command center'}
            >
              {collapsed ? '▼ EXPAND' : '▲ COLLAPSE'}
            </button>
          </div>
        </div>

        {/* Collapsible body */}
        <div
          style={{
            maxHeight: collapsed ? '0px' : '800px',
            overflow: 'hidden',
            transition: 'max-height 0.5s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {/* ═══════════════════════════════════════════════════
              ROW 1 — Hospital Pulse (HealthGauges)
              ═══════════════════════════════════════════════════ */}
          <div style={{ padding: '4px 24px 16px' }}>
            <p style={{ ...sectionTitleStyle, marginBottom: '14px' }}>
              ◆ Hospital Pulse
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                justifyItems: 'center',
              }}
            >
              <HealthGauge
                score={scores.overall}
                label="Overall Health"
                icon="🏥"
                size="sm"
                color={TEAL}
              />
              <HealthGauge
                score={scores.financial}
                label="Financial Health"
                icon="💰"
                size="sm"
                color={EMERALD}
              />
              <HealthGauge
                score={scores.clinical}
                label="Clinical Safety"
                icon="🩺"
                size="sm"
                color={ROSE}
              />
              <HealthGauge
                score={scores.operational}
                label="Operational"
                icon="⚙️"
                size="sm"
                color={SKY}
              />
            </div>
          </div>

          <div style={sectionDivider} />

          {/* ═══════════════════════════════════════════════════
              ROW 2 — Live Operations (8 compact tiles)
              ═══════════════════════════════════════════════════ */}
          <div style={{ padding: '14px 24px 16px' }}>
            <p style={{ ...sectionTitleStyle, marginBottom: '12px' }}>
              ◆ Live Operations
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
              }}
            >
              {ops.map((op, i) => (
                <OpsTile key={i} {...op} />
              ))}
            </div>
          </div>

          <div style={sectionDivider} />

          {/* ═══════════════════════════════════════════════════
              ROW 3 — AI Intelligence (3 insight cards)
              ═══════════════════════════════════════════════════ */}
          <div style={{ padding: '14px 24px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <p style={sectionTitleStyle}>◆ AI Intelligence</p>
              <span
                style={{
                  fontSize: '8px',
                  fontWeight: 900,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: `${VIOLET}20`,
                  color: VIOLET,
                  letterSpacing: '0.1em',
                }}
              >
                CLAUDE AI
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {insights.map((ins, i) => (
                <InsightCard key={i} {...ins} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Compact Version (< lg) ──────────────────── */}
      <div className="block lg:hidden" style={{ ...containerStyle, padding: '12px 16px' }}>
        <div style={gradientTopBorder} />

        {/* Mobile header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🎛️</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--md-text-primary)',
              }}
            >
              Command Center
            </span>
          </div>
          <LivePulse isLive={isLive} />
        </div>

        {/* Mobile: 4 mini gauges in a row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          {[
            { score: scores.overall, label: 'Overall', icon: '🏥' },
            { score: scores.financial, label: 'Finance', icon: '💰' },
            { score: scores.clinical, label: 'Clinical', icon: '🩺' },
            { score: scores.operational, label: 'Ops', icon: '⚙️' },
          ].map((g, i) => {
            const scoreColor = g.score >= 80 ? EMERALD : g.score >= 60 ? AMBER : ROSE;
            return (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  padding: '8px 4px',
                  borderRadius: '10px',
                  background: `${scoreColor}08`,
                  border: `1px solid ${scoreColor}20`,
                }}
              >
                <div style={{ fontSize: '14px', marginBottom: '2px' }}>{g.icon}</div>
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 900,
                    color: scoreColor,
                    lineHeight: 1,
                  }}
                >
                  {g.score}
                </div>
                <div
                  style={{
                    fontSize: '8px',
                    fontWeight: 800,
                    color: 'var(--md-text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginTop: '2px',
                  }}
                >
                  {g.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Key metrics strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '6px',
          }}
        >
          {ops.slice(0, 4).map((op, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 8px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--md-border)',
              }}
            >
              <span style={{ fontSize: '12px' }}>{op.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '8px',
                    fontWeight: 800,
                    color: 'var(--md-text-tertiary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {op.label}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 900,
                    color: 'var(--md-text-primary)',
                    lineHeight: 1,
                  }}
                >
                  {op.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default React.memo(ExecutiveCommandCenter);
