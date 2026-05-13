// ============================================================
// BCH 360° Intelligence V.10 — Main App
// Material Dashboard 3 PRO — White Minimal Theme
// ============================================================
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useAuth } from './hooks/useAuth.js';
import { useAIInsights } from './hooks/useAIInsights.js';
import { createBoundFetch } from './utils/fetchWithTokenRefresh.js';
import LoginForm from './components/LoginForm.jsx';
import { useShallowDashboardSelector, useDashboardActions } from './context/DashboardContext.jsx';
import { useWebSocket } from './hooks/useWebSocket.js';
import KPICardV2 from './components/KPICardV2.jsx';
import AlertBanner from './components/AlertBanner.jsx';
import DataFreshnessBar from './components/shared/DataFreshnessBar.jsx';
import Sidebar from './components/Sidebar.jsx';
const AIAssistant = React.lazy(() => import('./components/AIAssistant.jsx'));
import Clock from './components/Clock.jsx';
import DrillDownModal from './components/shared/DrillDownModal.jsx';
import ProjectTeamPanel from './components/ProjectTeamPanel.jsx';
const ExecutiveCommandCenter = React.lazy(() => import('./components/ExecutiveCommandCenter.jsx'));
const ServerSettings = React.lazy(() => import('./components/ServerSettings.jsx'));

const FinanceTab = React.lazy(() => import('./components/FinanceTab.jsx'));
const OPDTab = React.lazy(() => import('./components/OPDTab.jsx'));
const IPDTab = React.lazy(() => import('./components/IPDTab.jsx'));

// Preload high-priority tabs in background
const preloadPriorityTabs = () => {
  import('./components/FinanceTab.jsx');
  import('./components/OPDTab.jsx');
  import('./components/IPDTab.jsx');
};
const ERTab = React.lazy(() => import('./components/ERTab.jsx'));
const ErauditTab = React.lazy(() => import('./components/ErauditTab.jsx'));
const DentalTab = React.lazy(() => import('./components/DentalTab.jsx'));
const ThaiMedTab = React.lazy(() => import('./components/ThaiMedTab.jsx'));
const PhysTherapyTab = React.lazy(() => import('./components/PhysTherapyTab.jsx'));
const NCDTab = React.lazy(() => import('./components/NCDTab.jsx'));
const MedRecTab = React.lazy(() => import('./components/MedRecTab.jsx'));
const XRAYTab = React.lazy(() => import('./components/XRAYTab.jsx'));
const PharmacyTab = React.lazy(() => import('./components/PharmacyTab.jsx'));
const LaboratoryTab = React.lazy(() => import('./components/LaboratoryTab.jsx'));
const QualityTab = React.lazy(() => import('./components/QualityTab.jsx'));
const CompareTab = React.lazy(() => import('./components/CompareTab.jsx'));
const ReportTab = React.lazy(() => import('./components/ReportTab.jsx'));
const EvolutionTab = React.lazy(() => import('./components/EvolutionTab.jsx'));
const CustomerInsightTab = React.lazy(() => import('./components/CustomerInsightTab.jsx'));
const ITTab = React.lazy(() => import('./components/ITTab.jsx'));
const StrategicTab = React.lazy(() => import('./components/StrategicTab.jsx'));

const TABS = [
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
  { id: 'eraudit', label: 'ห้องฉุกเฉิน (Audit)', icon: '📍', desc: 'แยกตำบล · Trauma/Non-Trauma · Stroke/STEMI/Sepsis' },
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
  { id: 'evolution', label: 'Self-Upgrade', icon: '🧬', desc: 'Learning Journal · Evolution Log' },
  { id: 'strategic', label: 'กลยุทธ์ (Strategic)', icon: '🌟', desc: 'MoPH Service Plan · PA Tracker · Catchment' },
  { id: 'it', label: 'แผนกเทคโนโลยีสารสนเทศ', icon: '🖥️', desc: 'Server · Cache · Jobs · DB Cluster' },
];

/* ----- Utility: คำนวณ trend % เทียบกับค่าก่อนหน้า ----------- */
function calcTrend(current, previous) {
  if (!previous || previous === 0) return null;
  return Math.round(((current - previous) / Math.abs(previous)) * 100);
}

/* ----- Loading Spinner ---------------------------------------- */
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
        <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
      </div>
    </div>
  );
}

/* ----- Error Boundary (Enhanced: shows tab name + retry) ------- */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error(`[ErrorBoundary] ${this.props.tabName || 'Unknown'} crashed:`, error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          className="glass-card"
          style={{ padding: '3rem', textAlign: 'center', margin: '2rem 0' }}
        >
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
          <h3
            style={{
              fontSize: 'var(--fs-xl)',
              fontWeight: 800,
              color: 'var(--md-text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            เกิดข้อผิดพลาดในการแสดงผล{this.props.tabName ? ` — ${this.props.tabName}` : ''}
          </h3>
          <p
            style={{
              fontSize: 'var(--fs-sm)',
              color: 'var(--md-text-secondary)',
              marginBottom: '0.5rem',
            }}
          >
            {this.state.error?.message || 'Unknown error'}
          </p>
          <p
            style={{
              fontSize: '10px',
              color: 'var(--md-text-tertiary)',
              marginBottom: '1.5rem',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            💡 ลองกดปุ่มด้านล่างเพื่อรีเซ็ต หรือเปลี่ยน Tab แล้วกลับมาใหม่
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              background: 'var(--md-primary)',
              color: '#fff',
              padding: '0.625rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: 700,
              fontSize: 'var(--fs-sm)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(15,118,110,.3)',
            }}
          >
            🔄 ลองใหม่อีกครั้ง
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ----- Mini KPI chip in header -------------------------------- */

/* ============================================================== */
export default function App() {
  // ── All hooks MUST be called before any conditional returns ──
  const { user: authUser, isAuthenticated, loading: authLoading, tokens, refreshAccessToken } = useAuth();
  const isAdmin = authUser?.role === 'admin' || authUser?.role === 'director';
  const visibleTabs = isAdmin ? TABS : TABS.filter(t => t.id !== 'it');
  const state = useShallowDashboardSelector(s => ({ activeTab: s.activeTab, dashboardSummary: s.dashboardSummary, user: s.user }));
  const { setTab, fetchData } = useDashboardActions();
  const { activeTab, dashboardSummary } = state;
  const [systemStatus, setSystemStatus] = useState(null);
  const [aiHub, setAiHub] = useState(null);
  const [showTeamPanel, setShowTeamPanel] = useState(false);
  const [showServerSettings, setShowServerSettings] = useState(false);
  const [summaryTimedOut, setSummaryTimedOut] = useState(false);

  // ── Sidebar state (incremental V2 feature, April 2026) ──
  const [sidebarOpen, setSidebarOpen] = useState(false);   // mobile drawer
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try { return localStorage.getItem('bch-sidebar-collapsed') === '1'; } catch { return false; }
  });
  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed(v => {
      const next = !v;
      try { localStorage.setItem('bch-sidebar-collapsed', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  };
  // Ctrl/Cmd+B toggles collapse on desktop, drawer on mobile
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        if (window.matchMedia('(max-width: 1023px)').matches) {
          setSidebarOpen(v => !v);
        } else {
          toggleSidebarCollapsed();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const {
    insights,
    anomalies,
    prediction,
    clinicalInsights,
    loading: insightsLoading,
  } = useAIInsights(true);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bch-dark-mode') === 'true';
    }
    return false;
  });

  const apiFetch = useCallback(
    (url, opts) => createBoundFetch(tokens, refreshAccessToken)(url, opts),
    [tokens?.accessToken, refreshAccessToken]
  );

  const refreshAllData = useCallback(() => {
    fetchData('dashboardSummary', '/api/dashboard/summary');
    apiFetch('/api/system/status')
      .then(r => (r.ok ? r.json() : null))
      .then(d => d && setSystemStatus(d))
      .catch(() => {});
    // /api/ai/hub removed — endpoint not implemented
  }, [fetchData, apiFetch]);

  useWebSocket();

  useEffect(() => {
    const t = setTimeout(() => setSummaryTimedOut(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('bch-dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!isAuthenticated) return;
    refreshAllData();
    const interval = setInterval(refreshAllData, 120000); // 2 min — reduced from 30s to lower server load
    const preloadTimer = setTimeout(preloadPriorityTabs, 100);
    return () => {
      clearInterval(interval);
      clearTimeout(preloadTimer);
    };
  }, [refreshAllData, isAuthenticated]);

  // ── Drill-down handler ──
  const handleDrillDown = useCallback(
    ({ id, title, endpoint }) => {
      if (id.startsWith('finance')) setTab('finance');
      else if (id.startsWith('opd')) setTab('opd');
      else if (id.startsWith('ipd')) setTab('ipd');
      else if (id.startsWith('er')) setTab('er');
    },
    [setTab]
  );

  // ── Action handler for AI insights ──
  const handleAIAction = useCallback(
    action => {
      if (action === 'revenue_analysis') setTab('finance');
      if (action === 'collection_analysis') setTab('finance');
      if (action === 'denial_analysis') setTab('finance');
    },
    [setTab]
  );

  // ── Conditional returns AFTER all hooks ──
  if (authLoading) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const summary = dashboardSummary;
  const isLive = systemStatus?.mysql_connected;
  const handleForceRefresh = refreshAllData;

  return (
    <div className="min-h-screen" style={{ background: 'var(--md-bg)' }}>
      {/* Sidebar (incremental V2) */}
      <Sidebar
        tabs={visibleTabs}
        activeTab={activeTab}
        onSelect={setTab}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapsed}
        brand={{ title: 'BCH 360°', subtitle: 'Hospital Intelligence' }}
      />

      {/* Content area shifts right on desktop to clear the fixed sidebar */}
      <div className={'transition-[padding] duration-300 ' + (sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[240px]')}>
      {/* ===================================================
                HEADER — Material AppBar
            =================================================== */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          background: darkMode ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.92)',
          borderColor: 'var(--md-border)',
          boxShadow: darkMode
            ? '0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,.2)'
            : '0 1px 0 var(--md-divider), 0 2px 8px rgba(0,0,0,.04)',
        }}
      >
        <div className="max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-5 py-2.5">
          <div className="flex items-center justify-between gap-4">
            {/* Brand */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger — opens sidebar drawer */}
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="เปิดเมนู"
                title="เปิดเมนู (Ctrl/Cmd+B)"
                className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[color:var(--md-surface-2)] transition-colors"
                style={{ color: 'var(--md-text-primary)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
              {/* Logo badge */}
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-base font-black shadow-md"
                  style={{ background: 'linear-gradient(135deg,#0f766e,#059669)' }}
                >
                  B
                </div>
                {/* Online dot */}
                <span
                  className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                  style={{ background: isLive ? '#10b981' : '#94a3b8' }}
                />
              </div>

              {/* Name */}
              <div>
                <h1
                  className="text-[17px] font-black tracking-tight leading-none flex items-center gap-1.5"
                  style={{ color: 'var(--md-text-primary)' }}
                >
                  BCH
                  <span style={{ color: 'var(--md-primary)' }}>360°</span>
                  <span
                    style={{
                      color: 'var(--md-text-secondary)',
                      fontWeight: 400,
                      fontSize: 13,
                      letterSpacing: '0.05em',
                    }}
                  >
                    Intelligence
                  </span>
                </h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: isLive ? '#10b981' : '#f59e0b' }}
                  />
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.18em',
                      color: 'var(--md-text-secondary)',
                      margin: 0,
                    }}
                  >
                    {isLive ? 'System Online' : 'Connecting…'}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Data Freshness Bar ── */}
            <div className="hidden md:flex">
              <DataFreshnessBar onForceRefresh={handleForceRefresh} />
            </div>

            {/* Right: clock + avatar */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--md-text-tertiary)',
                    margin: 0,
                  }}
                >
                  Global Scan
                </p>
                <Clock />
              </div>

              {/* Dark Mode Toggle */}
              <button
                id="dark-mode-toggle"
                onClick={() => setDarkMode(prev => !prev)}
                title={darkMode ? 'เปลี่ยนเป็น Light Mode' : 'เปลี่ยนเป็น Dark Mode'}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: darkMode ? 'rgba(45,212,191,0.15)' : 'rgba(15,23,42,0.06)',
                  border: `1px solid ${darkMode ? 'rgba(45,212,191,0.3)' : 'rgba(0,0,0,0.06)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '16px',
                }}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Server Settings */}
              <button
                onClick={() => setShowServerSettings(true)}
                title="Database Server Settings"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(15,118,110,0.08)',
                  border: '1px solid rgba(15,118,110,0.15)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '16px',
                }}
              >
                ⚙️
              </button>

              {/* Avatar */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm"
                style={{ background: 'linear-gradient(135deg,#0f766e,#0284c7)' }}
              >
                {(state.user?.full_name || 'Admin')
                  .split(' ')
                  .map(w => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================
                MAIN CONTENT
            =================================================== */}
      <main className="max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-4 sm:px-5 py-4">
        {/* Alert banner */}
        <AlertBanner />

        {/* ══════ Executive Command Center ══════ */}
        <div className="hidden lg:block mb-5">
          <Suspense
            fallback={
              <div
                className="rounded-2xl p-8 animate-pulse"
                style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}
              >
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="h-28 rounded-xl"
                      style={{ background: 'var(--md-border)' }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div
                      key={i}
                      className="h-16 rounded-lg"
                      style={{ background: 'var(--md-border)' }}
                    />
                  ))}
                </div>
              </div>
            }
          >
            <ExecutiveCommandCenter
              summary={summary}
              systemStatus={systemStatus}
              isLive={isLive}
              clinicalInsights={clinicalInsights}
            />
          </Suspense>
        </div>

        {/* Mobile KPIs */}
        <div className="grid grid-cols-2 lg:hidden gap-2 mb-3">
          <KPICardV2
            title="รายได้รวม"
            value={summary?.finance?.total_revenue}
            format="currency"
            icon="💰"
            color="blue"
            trend={summary?.finance?.trend_revenue}
            trendLabel="vs เดือนก่อน"
            loading={!summary && !summaryTimedOut}
            drillDownId="finance_revenue"
            drillDownEndpoint="/api/finance/drilldown?type=revenue"
            aiInsight={
              summary?.finance?.trend_revenue > 5
                ? `Strong growth at ${summary?.finance?.trend_revenue}% - excellent momentum`
                : null
            }
          />
          <KPICardV2
            title="อัตราครองเตียง"
            value={summary?.beds?.occupancy_rate}
            format="percent"
            icon="🛏️"
            color="green"
            loading={!summary && !summaryTimedOut}
            drillDownId="ipd_beds"
            drillDownEndpoint="/api/ipd/drilldown?type=beds"
            aiInsight={
              summary?.beds?.occupancy_rate > 85
                ? `High bed occupancy at ${summary?.beds?.occupancy_rate}% - plan for expansion`
                : 'Adequate bed availability'
            }
          />
        </div>

        {/* TAB NAVIGATION moved to Sidebar (see src/components/Sidebar.jsx) */}

        {/* Tab Content */}
        <ErrorBoundary
          key={activeTab}
          tabName={visibleTabs.find(t => t.id === activeTab)?.label || activeTab}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <div
              className="min-h-[600px] mb-10 animate-fade-in"
              style={{ animationDuration: '0.5s' }}
            >
              {activeTab === 'finance' && <FinanceTab />}
              {activeTab === 'opd' && <OPDTab />}
              {activeTab === 'ipd' && <IPDTab />}
              {activeTab === 'er' && <ERTab />}
              {activeTab === 'eraudit' && <ErauditTab />}
              {activeTab === 'dental' && <DentalTab />}
              {activeTab === 'xray' && <XRAYTab />}
              {activeTab === 'thaimed' && <ThaiMedTab />}
              {activeTab === 'phystherapy' && <PhysTherapyTab />}
              {activeTab === 'ncd' && <NCDTab />}
              {activeTab === 'medrec' && <MedRecTab />}
              {activeTab === 'pharmacy' && <PharmacyTab />}
              {activeTab === 'lab' && <LaboratoryTab />}
              {activeTab === 'quality' && <QualityTab />}
              {activeTab === 'report' && <ReportTab />}
              {activeTab === 'compare' && <CompareTab />}
              {activeTab === 'customer-insight' && <CustomerInsightTab />}
              {activeTab === 'evolution' && <EvolutionTab />}
              {activeTab === 'strategic' && <StrategicTab />}
              {activeTab === 'it' && isAdmin && <ITTab />}
              {activeTab === 'it' && !isAdmin && (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', margin: '2rem 0' }}>
                  <div style={{ fontSize: 48, marginBottom: '1rem' }}>🔒</div>
                  <h3 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '0.5rem' }}>
                    ไม่มีสิทธิ์เข้าถึงแผนกเทคโนโลยีสารสนเทศ
                  </h3>
                  <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-secondary)' }}>
                    หน้านี้สงวนสำหรับผู้ดูแลระบบ (admin) เท่านั้น
                  </p>
                </div>
              )}
            </div>
          </Suspense>
        </ErrorBoundary>

        {/* AI Assistant — น้องขวัญใจ */}
        <Suspense fallback={null}>
          <AIAssistant clinicalData={clinicalInsights} />
        </Suspense>

        {/* Drill Down Modal */}
        <DrillDownModal />
      </main>

      {/* ===================================================
                FOOTER
            =================================================== */}
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
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(15, 118, 110, .08)',
                padding: '2px 6px',
                borderRadius: '4px',
                color: '#0f766e',
              }}
            >
              AI PROJECT
            </span>
            <span
              className="font-bold"
              style={{ color: 'var(--md-primary)', letterSpacing: '-0.01em' }}
            >
              BCH 360° Intelligence
            </span>
            <span style={{ color: 'var(--md-text-tertiary)' }}>v10.4.0</span>
            <span style={{ color: 'var(--md-border)' }}>·</span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(244,63,94,.08)',
                padding: '2px 6px',
                borderRadius: '4px',
                color: '#f43f5e',
              }}
            >
              SYSTEM ANALYST & DEVELOPMENT BY
            </span>
            <span style={{ fontWeight: 800, color: '#f43f5e', letterSpacing: '-0.01em' }}>
              BOSSART
            </span>
            <span style={{ color: 'var(--md-border)' }}>·</span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(14,165,233,.08)',
                padding: '2px 6px',
                borderRadius: '4px',
                color: '#0ea5e9',
              }}
            >
              TESTER & SUPPORTED BY
            </span>
            <span style={{ fontWeight: 800, color: '#0ea5e9', letterSpacing: '-0.01em' }}>
              ITBANCHANG TEAM
            </span>
            <span style={{ color: 'var(--md-border)' }}>·</span>
            <button
              onClick={() => setShowTeamPanel(true)}
              style={{
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(109,40,217,.08)',
                padding: '2px 8px',
                borderRadius: '4px',
                color: '#6d28d9',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(109,40,217,.15)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(109,40,217,.08)';
              }}
            >
              🏗️ Project Team & Standards
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

      {/* Project Team & Standards Panel */}
      <ProjectTeamPanel isOpen={showTeamPanel} onClose={() => setShowTeamPanel(false)} />

      {/* Server Settings Panel */}
      <Suspense fallback={null}>
        <ServerSettings open={showServerSettings} onClose={() => setShowServerSettings(false)} />
      </Suspense>
      </div>{/* /content-area (sidebar padding wrapper) */}
    </div>
  );
}
