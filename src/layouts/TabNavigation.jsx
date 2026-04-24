// ============================================================
// BCH 360° Intelligence V.10 — Tab Navigation Layout Component
// Extracted from App.jsx — uses Component Map for O(1) lookup
// ============================================================
import React, { Suspense } from 'react';

// Lazy-loaded tab components — no change from App.jsx
const FinanceTab = React.lazy(() => import('../components/FinanceTab.jsx'));
const OPDTab = React.lazy(() => import('../components/OPDTab.jsx'));
const IPDTab = React.lazy(() => import('../components/IPDTab.jsx'));
const ERTab = React.lazy(() => import('../components/ERTab.jsx'));
const DentalTab = React.lazy(() => import('../components/DentalTab.jsx'));
const ThaiMedTab = React.lazy(() => import('../components/ThaiMedTab.jsx'));
const PhysTherapyTab = React.lazy(() => import('../components/PhysTherapyTab.jsx'));
const NCDTab = React.lazy(() => import('../components/NCDTab.jsx'));
const MedRecTab = React.lazy(() => import('../components/MedRecTab.jsx'));
const XRAYTab = React.lazy(() => import('../components/XRAYTab.jsx'));
const PharmacyTab = React.lazy(() => import('../components/PharmacyTab.jsx'));
const LaboratoryTab = React.lazy(() => import('../components/LaboratoryTab.jsx'));
const QualityTab = React.lazy(() => import('../components/QualityTab.jsx'));
const CompareTab = React.lazy(() => import('../components/CompareTab.jsx'));
const ReportTab = React.lazy(() => import('../components/ReportTab.jsx'));
const DoctorActivityTab = React.lazy(() => import('../components/DoctorActivityTab.jsx'));
const AuditLogTab = React.lazy(() => import('../components/AuditLogTab.jsx'));
const CustomerInsightTab = React.lazy(() => import('../components/CustomerInsightTab.jsx'));

// ── O(1) Component Map — replaces &&-chain ──
const TAB_COMPONENTS = {
  finance: FinanceTab,
  opd: OPDTab,
  ipd: IPDTab,
  er: ERTab,
  dental: DentalTab,
  xray: XRAYTab,
  pharmacy: PharmacyTab,
  lab: LaboratoryTab,
  thaimed: ThaiMedTab,
  phystherapy: PhysTherapyTab,
  ncd: NCDTab,
  medrec: MedRecTab,
  quality: QualityTab,
  report: ReportTab,
  compare: CompareTab,
  'customer-insight': CustomerInsightTab,
  'doctor-activity': DoctorActivityTab,
  'audit-log': AuditLogTab,
};

/** Tab definition list (used for nav bar rendering) */
export const TABS = [
  { id: 'report', label: 'Report', icon: '📋', desc: 'REPORT Online โรงพยาบาลบ้านฉาง' },
  { id: 'compare', label: 'เปรียบเทียบปีงบ', icon: '📊', desc: 'YoY · 3 ปีงบ · ทุกแผนก' },
  {
    id: 'finance',
    label: 'ศูนย์จัดเก็บรายได้',
    icon: '💰',
    desc: 'รายได้ · ค่าใช้จ่าย · AI Forecast',
  },
  { id: 'opd', label: 'OPD ผู้ป่วยนอก', icon: '⏱️', desc: 'ระยะเวลารอคอย · สถานะคลินิก' },
  { id: 'ipd', label: 'IPD ผู้ป่วยใน', icon: '🏥', desc: 'เตียง · การนอน · AI พยากรณ์' },
  { id: 'er', label: 'ห้องฉุกเฉิน', icon: '🚑', desc: 'สถานะ ER · AI Surge Alert' },
  { id: 'dental', label: 'ทันตกรรม', icon: '🦷', desc: 'คลินิกฟัน · DPI Analytics' },
  { id: 'xray', label: 'รังสีวิทยา', icon: '☢️', desc: 'X-Ray · CT · MRI' },
  { id: 'pharmacy', label: 'เภสัชกรรม', icon: '💊', desc: 'ยา · Generic · PPI Analytics' },
  { id: 'lab', label: 'ห้องปฏิบัติการ', icon: '🔬', desc: 'TAT · Abnormal · LPI Analytics' },
  { id: 'thaimed', label: 'แพทย์แผนไทย', icon: '🌿', desc: 'นวด · สมุนไพร · TPI Analytics' },
  { id: 'phystherapy', label: 'กายภาพบำบัด', icon: '🏋️', desc: 'Rehab · PT · PPI Analytics' },
  { id: 'ncd', label: 'NCD', icon: '🫀', desc: 'DM · HT · CKD · NCI Analytics' },
  {
    id: 'medrec',
    label: 'Medical Record Audit',
    icon: '📇',
    desc: 'Audit · Coding Quality Analytics',
  },
  { id: 'quality', label: 'คุณภาพ HA', icon: '⭐', desc: 'HA Thailand · QPI Analytics' },
  {
    id: 'customer-insight',
    label: 'Customer Insight',
    icon: '🎯',
    desc: 'คัดกรองผู้รับบริการ · สิทธิ · การเบิกจ่าย',
  },
  {
    id: 'doctor-activity',
    label: 'ผลผลิตแพทย์',
    icon: '👨‍⚕️',
    desc: 'OPD · IPD · Orders · Revenue',
  },
  {
    id: 'audit-log',
    label: 'Audit Log',
    icon: '🔍',
    desc: 'ประวัติการเข้าใช้ · Admin only',
    adminOnly: true,
  },
];

/** Loading Spinner — shared between app and tabs */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
        <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
      </div>
    </div>
  );
}

/**
 * Tab Navigation bar
 * @param {{ activeTab: string, onTabChange: (id: string) => void }} props
 */
export function TabNavBar({ activeTab, onTabChange, userRole }) {
  // Filter admin-only tabs based on role
  const visibleTabs = TABS.filter(t => !t.adminOnly || userRole === 'admin');
  return (
    <div className="mb-5 sticky z-40" style={{ top: '64px' }}>
      <div
        className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl w-full"
        style={{
          background: 'var(--md-surface)',
          border: '1px solid var(--md-border)',
          boxShadow: 'var(--md-shadow-sm)',
        }}
      >
        {visibleTabs.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className="md-tab-item"
            data-active={activeTab === tab.id}
            style={{
              flex: '1 1 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.625rem',
              padding: '0.625rem 1.25rem',
              borderRadius: '0.75rem',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === tab.id ? 'var(--md-primary)' : 'transparent',
              boxShadow: activeTab === tab.id ? '0 4px 14px rgba(15, 118, 110, .28)' : 'none',
              minWidth: '150px',
            }}
          >
            <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}>{tab.icon}</span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '3px',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--fs-base)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  color: activeTab === tab.id ? '#fff' : 'var(--md-text-primary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  opacity: activeTab === tab.id ? 0.85 : 0.65,
                  color: activeTab === tab.id ? '#fff' : 'var(--md-text-secondary)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.desc}
              </span>
            </div>

            {activeTab === tab.id && (
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.7)',
                  flexShrink: 0,
                  marginLeft: 'auto',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Active Tab Content renderer — uses O(1) Component Map
 * @param {{ activeTab: string }} props
 */
export function TabContent({ activeTab }) {
  const ActiveComponent = TAB_COMPONENTS[activeTab];
  if (!ActiveComponent) return null;

  return (
    <div className="min-h-[600px] mb-10 animate-fade-in" style={{ animationDuration: '0.5s' }}>
      <Suspense fallback={<LoadingSpinner />}>
        <ActiveComponent />
      </Suspense>
    </div>
  );
}

/** Preload high-priority tabs into browser cache in background */
export function preloadPriorityTabs() {
  import('../components/FinanceTab.jsx');
  import('../components/OPDTab.jsx');
  import('../components/IPDTab.jsx');
}
