// ============================================================
// IMPLEMENTATION CHECKLIST & CODE SNIPPETS
// Tab Enhancement Guide — Ready-to-Use Code
// ============================================================

/**
PHASE 1 IMPLEMENTATION CHECKLIST
═══════════════════════════════════════════════════════════

✅ COMPLETED (Reusable Components Created):
─────────────────────────────────────────
1. AIInsightCard.jsx — Premium AI insight display
2. StatusBadge.jsx — Priority/severity badges
3. MetricCard.jsx — Individual metric cards
4. MetricsStrip.jsx — Metrics grid layout
5. HealthGauge.jsx — Circular score visualization
6. AlertBanner.jsx — Professional alert banners

⏳ READY-TO-IMPLEMENT (Next Steps):
─────────────────────────────────────────
*/

// ============================================================
// FINANCE TAB — ADD TO IMPORTS (Line 1-10)
// ============================================================
/*
ADD THESE IMPORTS:

import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';
*/

// ============================================================
// FINANCE TAB — ENHANCE AI INSIGHTS SECTION
// ============================================================
/*
REPLACE the current "Revenue Health Insight" card section with:

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
  {/* Revenue Health */}
  <AIInsightCard
    title="Revenue Health Score"
    icon="💵"
    priority={finAnalytics?.ai_insights?.revenue_health?.score >= 80 ? 'LOW' : 'MEDIUM'}
    summary={`RCM Score: ${finAnalytics?.ai_insights?.revenue_health?.score || 0}/100`}
    analysis={finAnalytics?.ai_insights?.revenue_health?.analysis || 'วิเคราะห์ประสิทธิภาพการจัดเก็บรายได้...'}
    recommendation={finAnalytics?.ai_insights?.revenue_health?.recommendation || ''}
    confidence={96}
    gradient="#8b5cf6"
    gradientFrom="rgba(139,92,246,.08)"
    gradientTo="rgba(99,102,241,.04)"
    borderColor="rgba(139,92,246,.25)"
    actionButtons={[
      { label: 'View Details', onClick: () => alert('Drill down to detail') }
    ]}
  />

  {/* Growth Strategy */}
  <AIInsightCard
    title="Revenue Growth Strategy"
    icon="🚀"
    priority="MEDIUM"
    summary={`Growth Rate: ${finAnalytics?.ai_insights?.growth_strategy?.score || 0}%`}
    analysis={finAnalytics?.ai_insights?.growth_strategy?.analysis || 'วิเคราะห์แนวโน้มการเติบโตและ CMI...'}
    recommendation={finAnalytics?.ai_insights?.growth_strategy?.recommendation || ''}
    confidence={91}
    gradient="#0ea5e9"
    gradientFrom="rgba(14,165,233,.08)"
    gradientTo="rgba(3,102,214,.04)"
    borderColor="rgba(14,165,233,.25)"
  />

  {/* Operational Efficiency */}
  <AIInsightCard
    title="Operational Efficiency"
    icon="⚙️"
    priority={finAnalytics?.ai_insights?.operational_efficiency?.status === 'efficient' ? 'LOW' : 'MEDIUM'}
    summary={`Efficiency Score: ${finAnalytics?.ai_insights?.operational_efficiency?.score || 0}%`}
    analysis={finAnalytics?.ai_insights?.operational_efficiency?.analysis || ''}
    recommendation={finAnalytics?.ai_insights?.operational_efficiency?.recommendation || ''}
    confidence={88}
    gradient="#10b981"
    gradientFrom="rgba(16,185,129,.08)"
    gradientTo="rgba(5,150,105,.04)"
    borderColor="rgba(16,185,129,.25)"
  />

  {/* Risk Management */}
  <AIInsightCard
    title="Financial Risk Index"
    icon="⚠️"
    priority={finAnalytics?.ai_insights?.risk_intelligence?.score >= 70 ? 'LOW' : 'MEDIUM'}
    summary={`Risk Level: ${Math.max(0, 100 - (finAnalytics?.ai_insights?.risk_intelligence?.score || 0))}%`}
    analysis={finAnalytics?.ai_insights?.risk_intelligence?.analysis || ''}
    recommendation={finAnalytics?.ai_insights?.risk_intelligence?.recommendation || ''}
    confidence={94}
    gradient="#f43f5e"
    gradientFrom="rgba(244,63,94,.08)"
    gradientTo="rgba(239,68,68,.04)"
    borderColor="rgba(244,63,94,.25)"
  />
</div>
*/

// ============================================================
// OPD TAB — ENHANCEMENT TEMPLATE
// ============================================================
/*
ADD new section BEFORE the existing hourly chart:

{/* 🚨 OPD Surge Alert (If applicable) */}
{opd?.avg_total_minutes > 45 && (
  <AlertBanner
    severity={opd?.avg_total_minutes > 60 ? 'critical' : 'warning'}
    title="OPD SURGE Detected"
    message={`Wait time: ${opd?.avg_total_minutes}m (P90: ${opd?.p90_wait}m). Current: ${patients.length} patients in queue.`}
    icon="🚨"
    actions={[
      { label: 'Activate Fast Track', onClick: () => {}, primary: true },
      { label: 'View Queue', onClick: () => {} }
    ]}
  />
)}

{/* Efficiency Metrics Strip */}
<MetricsStrip
  metrics={[
    {
      label: 'SLA Compliance',
      value: opd?.sla_pct || 0,
      unit: '%',
      target: 90,
      trend: opd?.sla_trend || 0,
      status: opd?.sla_pct >= 90 ? 'success' : 'warning',
      icon: '✓',
      gradient: '#10b981'
    },
    {
      label: 'Wait Time (P90)',
      value: opd?.p90_wait || 0,
      unit: 'm',
      target: 45,
      trend: opd?.wait_trend || 0,
      status: opd?.p90_wait <= 45 ? 'success' : 'critical',
      icon: '⏱️'
    },
    {
      label: 'Throughput',
      value: Math.round(opd?.throughput || 0),
      unit: '/hr',
      target: 30,
      trend: opd?.throughput_trend || 0,
      status: opd?.throughput >= 25 ? 'success' : 'warning',
      icon: '📊'
    },
    {
      label: 'DPI Score',
      value: computeDPI(opd),
      unit: '/100',
      target: 75,
      trend: 0,
      status: computeDPI(opd) >= 75 ? 'success' : 'warning',
      icon: '🎯'
    }
  ]}
  columns={4}
  gap="12px"
/>
*/

// ============================================================
// IPD TAB — BED DEMAND ENHANCEMENT
// ============================================================
/*
REPLACE the bed demand alert with:

{bedDemand?.alert_count > 0 && (
  <AlertBanner
    severity="critical"
    title="Neural Bed Demand Forecast"
    message={`${bedDemand.alert_count} wards projected to reach >85% occupancy within 24-72h`}
    icon="🧠"
    actions={[
      { label: 'View Forecast', onClick: () => {}, primary: true },
      { label: 'Mitigation Plan', onClick: () => {} }
    ]}
  />
)}

{/* Bed Occupancy Metrics */}
<MetricsStrip
  metrics={[
    {
      label: 'Overall Occupancy',
      value: bedOccupancy?.summary?.overall_rate || 0,
      unit: '%',
      target: 75,
      trend: bedOccupancy?.summary?.trend || 0,
      status: bedOccupancy?.summary?.overall_rate >= 70 ? 'success' : 'warning',
      icon: '🛏️',
      gradient: '#7c3aed'
    },
    {
      label: 'Avg LOS',
      value: alosData?.avg_los || 0,
      unit: 'd',
      target: 4,
      trend: alosData?.los_trend || 0,
      status: alosData?.avg_los <= 4 ? 'success' : 'warning',
      icon: '📅'
    },
    {
      label: 'Readmit Risk',
      value: readmission?.high_risk_count || 0,
      unit: 'patients',
      target: 5,
      trend: 0,
      status: readmission?.high_risk_count <= 5 ? 'success' : 'critical',
      icon: '⚠️'
    },
    {
      label: 'Discharge Ready',
      value: today?.discharge_ready || 0,
      unit: 'beds',
      target: 0,
      trend: 0,
      status: 'info',
      icon: '✓'
    }
  ]}
/>
*/

// ============================================================
// ER TAB — COMMAND CENTER LAYOUT
// ============================================================
/*
ADD at the top of ER Tab JSX:

{/* 🚑 ER Command Center */}
{erAnalytics && (
  <div className="space-y-4">
    <AlertBanner
      severity={erAnalytics.urgency_level > 7 ? 'critical' : 'warning'}
      title={`ER COMMAND CENTER — Current Census: ${erTodayPatients.length} patients`}
      message={`Status: ${erAnalytics.urgency_level > 7 ? '🔴 RED SURGE' : '🟡 YELLOW'} | Predicted +4h: ${Math.round((erSurge?.predicted_4h || 0) * 1.3)} patients`}
      icon="🚑"
      actions={[
        { label: 'Activate Surge Protocol', onClick: () => {}, primary: true },
        { label: 'Call Additional Staff', onClick: () => {} }
      ]}
    />
    
    {/* Surge Metrics Gauge */}
    <HealthGauge
      score={100 - erAnalytics.urgency_level * 10}
      max={100}
      label="ER Status Health"
      icon="🏥"
      color={erAnalytics.urgency_level > 7 ? '#f43f5e' : '#f59e0b'}
      size="md"
    />
    
    {/* Triage Breakdown Metrics */}
    <MetricsStrip
      metrics={[
        {
          label: 'P90 Time-to-Doc',
          value: erAnalytics.p90_time_to_doctor || 0,
          unit: 'm',
          target: 30,
          trend: 0,
          status: erAnalytics.p90_time_to_doctor <= 30 ? 'success' : 'critical',
          icon: '👨‍⚕️',
          gradient: '#0ea5e9'
        },
        {
          label: 'LWBS Rate',
          value: erAnalytics.lwbs_rate || 0,
          unit: '%',
          target: 2,
          trend: 0,
          status: erAnalytics.lwbs_rate < 2 ? 'success' : 'critical',
          icon: '🚪'
        },
        {
          label: 'Current Census',
          value: erTodayPatients.length,
          unit: 'pts',
          target: 35,
          trend: 0,
          status: erTodayPatients.length > 35 ? 'critical' : 'normal',
          icon: '👥'
        },
        {
          label: 'Return Rate',
          value: erAnalytics.return_visit_rate || 0,
          unit: '%',
          target: 5,
          trend: 0,
          status: erAnalytics.return_visit_rate < 5 ? 'success' : 'warning',
          icon: '🔄'
        }
      ]}
      columns={4}
    />
  </div>
)}
*/

// ============================================================
// NCD TAB — COMPLETE ENHANCEMENT
// ============================================================
/*
ADD AI Risk Stratification section at top:

{/* 🧠 AI Risk Stratification Panel */}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
  {/* High Risk Card */}
  <AIInsightCard
    title="High Risk Patients"
    icon="🔴"
    priority="HIGH"
    summary={`${aiRiskScore.high_risk_count} patients at critical risk`}
    analysis="Require immediate case management intervention and close monitoring"
    recommendation="Schedule appointments with care coordinator within 48 hours"
    confidence={98}
    gradient="#f43f5e"
    actionButtons={[
      { label: 'View List', onClick: () => {}, primary: true }
    ]}
  />

  {/* Medium Risk Card */}
  <AIInsightCard
    title="Medium Risk Patients"
    icon="🟡"
    priority="MEDIUM"
    summary={`${aiRiskScore.medium_risk_count} patients need monitoring`}
    analysis="Stable but require regular follow-ups and medication review"
    recommendation="Schedule routine check-ups every 3 months with medication reconciliation"
    confidence={94}
    gradient="#f59e0b"
  />

  {/* Low Risk Card */}
  <AIInsightCard
    title="Low Risk - Stable Cohort"
    icon="🟢"
    priority="LOW"
    summary={`${aiRiskScore.low_risk_count} patients well-controlled`}
    analysis="Good disease management and excellent compliance patterns"
    recommendation="Continue preventive care program and lifestyle education"
    confidence={97}
    gradient="#10b981"
  />
</div>

{/* NCD Risk & Outcome Metrics */}
<MetricsStrip
  metrics={[
    {
      label: 'A1C Target (%)',
      value: ncdAnalytics.a1c_target_rate || 0,
      unit: '%',
      target: 80,
      trend: ncdAnalytics.a1c_trend || 0,
      status: ncdAnalytics.a1c_target_rate >= 70 ? 'success' : 'warning',
      icon: '🩸'
    },
    {
      label: 'BP Control (%)',
      value: ncdAnalytics.bp_control_rate || 0,
      unit: '%',
      target: 85,
      trend: ncdAnalytics.bp_trend || 0,
      status: ncdAnalytics.bp_control_rate >= 75 ? 'success' : 'warning',
      icon: '❤️'
    },
    {
      label: 'Med Adherence',
      value: ncdAnalytics.adherence_rate || 0,
      unit: '%',
      target: 80,
      trend: ncdAnalytics.adherence_trend || 0,
      status: ncdAnalytics.adherence_rate >= 75 ? 'success' : 'warning',
      icon: '💊'
    },
    {
      label: 'Complication Rate',
      value: ncdAnalytics.complication_rate || 0,
      unit: '%',
      target: 5,
      trend: ncdAnalytics.complication_trend || 0,
      status: ncdAnalytics.complication_rate < 8 ? 'success' : 'critical',
      icon: '⚠️'
    }
  ]}
/>
*/

// ============================================================
// PHYS THERAPY TAB — NEW ENHANCEMENT
// ============================================================
/*
ADD Rehabilitation Progress & Outcome Metrics:

{/* 🏋️ Therapy Metrics Dashboard */}
<MetricsStrip
  metrics={[
    {
      label: 'Avg ROM Improvement',
      value: 45,
      unit: '%',
      target: 50,
      trend: 5.2,
      status: 'success',
      icon: '📈'
    },
    {
      label: 'Pain Reduction (Avg)',
      value: 3.2,
      unit: '/10',
      target: '< 2',
      trend: -8.5,
      status: 'warning',
      icon: '😊'
    },
    {
      label: 'Discharge Rate',
      value: 68,
      unit: '%',
      target: 75,
      trend: 3.1,
      status: 'warning',
      icon: '✓'
    },
    {
      label: 'Patient Satisfaction',
      value: 4.6,
      unit: '/5',
      target: 4.5,
      trend: 2.3,
      status: 'success',
      icon: '⭐'
    }
  ]}
/>

{/* Therapist Utilization */}
<HealthGauge
  score={82}
  max={100}
  label="Team Utilization"
  icon="👨‍⚕️"
  color="#8b5cf6"
  size="md"
  showSegments
  segments={[
    { label: 'Manual Therapy', value: 85, color: '#8b5cf6' },
    { label: 'Rehab Exercise', value: 78, color: '#0ea5e9' },
    { label: 'Electrotherapy', value: 82, color: '#10b981' }
  ]}
/>
*/

// ============================================================
// MED REC TAB — AUDIT DASHBOARD
// ============================================================
/*
ADD Quality Audit Section:

{/* 📊 Medical Record Audit Dashboard */}
<div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
  {/* Overall Quality Score */}
  <HealthGauge
    score={medRecAudit?.overall_quality_score || 78}
    max={100}
    label="Audit Quality Score"
    icon="📋"
    color="#7c3aed"
    showSegments
    segments={[
      { label: 'Documentation', value: medRecAudit?.documentation_score || 0, color: '#7c3aed' },
      { label: 'Coding', value: medRecAudit?.coding_score || 0, color: '#0ea5e9' },
      { label: 'Compliance', value: medRecAudit?.compliance_score || 0, color: '#10b981' }
    ]}
  />

  {/* Audit Metrics */}
  <MetricsStrip
    metrics={[
      {
        label: 'Charts Audited',
        value: medRecAudit?.charts_audited || 0,
        unit: 'charts',
        target: 50,
        status: 'info',
        icon: '📑'
      },
      {
        label: 'Accuracy Rate',
        value: medRecAudit?.accuracy_rate || 0,
        unit: '%',
        target: 95,
        trend: medRecAudit?.accuracy_trend || 0,
        status: medRecAudit?.accuracy_rate >= 95 ? 'success' : 'warning',
        icon: '✓'
      },
      {
        label: 'Denial Loss',
        value: medRecAudit?.denial_loss || 0,
        unit: 'K฿',
        target: '<100',
        status: medRecAudit?.denial_loss < 100 ? 'success' : 'critical',
        icon: '💰'
      },
      {
        label: 'Overdue Chts',
        value: medRecAudit?.overdue_charts || 0,
        unit: 'charts',
        target: '<5',
        status: medRecAudit?.overdue_charts < 5 ? 'success' : 'critical',
        icon: '⏰'
      }
    ]}
  />
</div>

{/* Denial Root Cause Analysis */}
<div style={{ marginTop: '16px' }}>
  <h3>Denial Root Cause Analysis</h3>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
    {medRecAudit?.denial_breakdown?.map((dc, idx) => (
      <AIInsightCard
        key={idx}
        title={dc.reason}
        icon={idx === 0 ? '🔴' : idx === 1 ? '🟠' : '🟡'}
        priority={idx === 0 ? 'HIGH' : 'MEDIUM'}
        summary={`${dc.count} claims (${dc.percentage}%)`}
        recommendation={dc.fix_recommendation}
        confidence={90}
      />
    ))}
  </div>
</div>
*/

// ============================================================
// GLOBAL COLORS & STYLES REFERENCE
// ============================================================
/*
Revenue & Finance:     #7c3aed (Purple)
Clinical Operations:   #6366f1 (Indigo)
Claims & Billing:      #f43f5e (Rose)
Staffing & HR:         #8b5cf6 (Purple Lighter)
OPD/Outpatient:        #0ea5e9 (Sky Blue)
IPD/Inpatient:         #7c3aed (Indigo)
ER Emergency:          #f43f5e (Rose)
Success/Good:          #10b981 (Emerald)
Warning/Caution:       #f59e0b (Amber)
Critical/Alert:        #f43f5e (Rose)
Info/Informational:    #3b82f6 (Blue)
*/

// ============================================================
// IMPLEMENTATION TIMELINE
// ============================================================
/*
✅ DONE (Today):
  • Created 6 reusable components
  • Created component documentation

📅 NEXT (Next 1-2 hours):
  • Add imports to FinanceTab
  • Add imports to OPDTab, IPDTab, ERTab
  • Update imports in DentalTab, XRAYTab
  • Enhance NCD, PhysTherapy, MedRec tabs

✨ RESULT:
  • All tabs use professional components
  • Consistent design system across all dashboards
  • AI insights prominently featured
  • Premium glassmorphic design throughout
*/
