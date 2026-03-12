// ============================================================
// BCH 360° Intelligence V.10 — Main App
// Material Dashboard 3 PRO — White Minimal Theme
// ============================================================
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useDashboard } from './context/DashboardContext.jsx';
import { useWebSocket } from './hooks/useWebSocket.js';
import KPICard from './components/KPICard.jsx';
import AlertBanner from './components/AlertBanner.jsx';
import DataFreshnessBar from './components/shared/DataFreshnessBar.jsx';
const AIAssistant = React.lazy(() => import('./components/AIAssistant.jsx'));
import Clock from './components/Clock.jsx';
import DrillDownModal from './components/shared/DrillDownModal.jsx';

const FinanceTab = React.lazy(() => import('./components/FinanceTab.jsx'));
// Preload the component in background
const preloadFinanceTab = () => {
    import('./components/FinanceTab.jsx');
};
const OPDTab = React.lazy(() => import('./components/OPDTab.jsx'));
const IPDTab = React.lazy(() => import('./components/IPDTab.jsx'));
const ERTab = React.lazy(() => import('./components/ERTab.jsx'));
const DentalTab = React.lazy(() => import('./components/DentalTab.jsx'));
const ThaiMedTab = React.lazy(() => import('./components/ThaiMedTab.jsx'));
const PhysTherapyTab = React.lazy(() => import('./components/PhysTherapyTab.jsx'));
const NCDTab = React.lazy(() => import('./components/NCDTab.jsx'));
const MedRecTab = React.lazy(() => import('./components/MedRecTab.jsx'));

const TABS = [
    { id: 'finance', label: 'ศูนย์จัดเก็บรายได้', icon: '💰', desc: 'รายได้ · ค่าใช้จ่าย · AI Forecast' },
    { id: 'opd', label: 'OPD ผู้ป่วยนอก', icon: '⏱️', desc: 'ระยะเวลารอคอย · สถานะคลินิก' },
    { id: 'ipd', label: 'IPD ผู้ป่วยใน', icon: '🏥', desc: 'เตียง · การนอน · AI พยากรณ์' },
    { id: 'er', label: 'ห้องฉุกเฉิน', icon: '🚑', desc: 'สถานะ ER · AI Surge Alert' },
    { id: 'dental', label: 'ทันตกรรม', icon: '🦷', desc: 'คลินิกฟัน · DPI Analytics' },
    { id: 'thaimed', label: 'แพทย์แผนไทย', icon: '🌿', desc: 'นวด · สมุนไพร · TPI Analytics' },
    { id: 'phystherapy', label: 'กายภาพบำบัด', icon: '🏋️', desc: 'Rehab · PT · PPI Analytics' },
    { id: 'ncd', label: 'NCD', icon: '🫀', desc: 'DM · HT · CKD · NCI Analytics' },
    { id: 'medrec', label: 'Medical Record Audit', icon: '📇', desc: 'Audit · Coding Quality Analytics' },
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
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', margin: '2rem 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
                    <h3 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '0.5rem' }}>
                        เกิดข้อผิดพลาดในการแสดงผล{this.props.tabName ? ` — ${this.props.tabName}` : ''}
                    </h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-secondary)', marginBottom: '0.5rem' }}>
                        {this.state.error?.message || 'Unknown error'}
                    </p>
                    <p style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', marginBottom: '1.5rem', fontFamily: "'JetBrains Mono', monospace" }}>
                        💡 ลองกดปุ่มด้านล่างเพื่อรีเซ็ต หรือเปลี่ยน Tab แล้วกลับมาใหม่
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        style={{
                            background: 'var(--md-primary)', color: '#fff',
                            padding: '0.625rem 2rem', borderRadius: '0.75rem',
                            fontWeight: 700, fontSize: 'var(--fs-sm)',
                            border: 'none', cursor: 'pointer',
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
    const { state, setTab, fetchData } = useDashboard();
    const { activeTab, dashboardSummary } = state;
    const [systemStatus, setSystemStatus] = useState(null);
    const [aiHub, setAiHub] = useState(null);

    // ── Dark Mode ──
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('bch-dark-mode') === 'true';
        }
        return false;
    });

    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        localStorage.setItem('bch-dark-mode', darkMode);
    }, [darkMode]);

    useWebSocket();

    useEffect(() => {
        fetchData('dashboardSummary', '/api/dashboard/summary');
        fetch('/api/system/status').then(r => r.json()).then(setSystemStatus).catch(() => { });
        fetch('/api/ai/hub').then(r => r.json()).then(setAiHub).catch(() => { });

        const interval = setInterval(() => {
            fetchData('dashboardSummary', '/api/dashboard/summary');
            fetch('/api/ai/hub').then(r => r.json()).then(setAiHub).catch(() => { });
        }, 30000);

        // ⚡ Preload FinanceTab after brief delay to avoid blocking LCP/TBT
        setTimeout(preloadFinanceTab, 100);

        return () => clearInterval(interval);
    }, [fetchData]);

    const summary = dashboardSummary;
    const isLive = systemStatus?.mysql_connected;

    // ── Force Refresh handler (for DataFreshnessBar) ──
    const handleForceRefresh = useCallback(() => {
        fetchData('dashboardSummary', '/api/dashboard/summary');
        fetch('/api/system/status').then(r => r.json()).then(setSystemStatus).catch(() => { });
        fetch('/api/ai/hub').then(r => r.json()).then(setAiHub).catch(() => { });
    }, [fetchData]);

    return (
        <div className="min-h-screen" style={{ background: 'var(--md-bg)' }}>

            {/* ===================================================
                HEADER — Material AppBar
            =================================================== */}
            <header
                className="sticky top-0 z-50 backdrop-blur-md border-b"
                style={{
                    background: darkMode ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.92)',
                    borderColor: 'var(--md-border)',
                    boxShadow: darkMode ? '0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,.2)' : '0 1px 0 var(--md-divider), 0 2px 8px rgba(0,0,0,.04)',
                }}
            >
                <div className="max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-5 py-2.5">
                    <div className="flex items-center justify-between gap-4">

                        {/* Brand */}
                        <div className="flex items-center gap-3">
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
                                <h1 className="text-[17px] font-black tracking-tight leading-none flex items-center gap-1.5"
                                    style={{ color: 'var(--md-text-primary)' }}>
                                    BCH
                                    <span style={{ color: 'var(--md-primary)' }}>360°</span>
                                    <span className="text-gray-400 font-normal text-[13px] tracking-wider">Intelligence</span>
                                </h1>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
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
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Global Scan</p>
                                <Clock />
                            </div>

                            {/* Dark Mode Toggle */}
                            <button
                                id="dark-mode-toggle"
                                onClick={() => setDarkMode(prev => !prev)}
                                title={darkMode ? 'เปลี่ยนเป็น Light Mode' : 'เปลี่ยนเป็น Dark Mode'}
                                style={{
                                    width: '36px', height: '36px', borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: darkMode ? 'rgba(45,212,191,0.15)' : 'rgba(15,23,42,0.06)',
                                    border: `1px solid ${darkMode ? 'rgba(45,212,191,0.3)' : 'rgba(0,0,0,0.06)'}`,
                                    cursor: 'pointer', transition: 'all 0.3s ease',
                                    fontSize: '16px',
                                }}
                            >
                                {darkMode ? '☀️' : '🌙'}
                            </button>

                            {/* Avatar */}
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm"
                                style={{ background: 'linear-gradient(135deg,#0f766e,#0284c7)' }}
                            >
                                {(state.user?.full_name || 'Admin').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
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

                {/* Mobile KPIs */}
                <div className="grid grid-cols-2 lg:hidden gap-2 mb-3">
                    <KPICard
                        title="รายได้รวม" value={summary?.finance?.total_revenue}
                        format="currency" icon="💰" color="blue"
                        trend={summary?.finance?.trend_revenue}
                        trendLabel="vs เดือนก่อน"
                        loading={!summary}
                        drillDownId="finance_revenue"
                        drillDownEndpoint="/api/finance/drilldown?type=revenue"
                    />
                    <KPICard
                        title="อัตราครองเตียง" value={summary?.beds?.occupancy_rate}
                        format="percent" icon="🛏️" color="green"
                        loading={!summary}
                        drillDownId="ipd_beds"
                        drillDownEndpoint="/api/ipd/drilldown?type=beds"
                    />
                </div>

                {/* ===================================================
                    TAB NAVIGATION — Material Expanded Tabs
                =================================================== */}
                <div
                    className="mb-5 sticky z-40"
                    style={{ top: '64px' }}
                >
                    {/* Tab pill wrapper — flex-wrap to prevent items from being hidden */}
                    <div
                        className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl w-full"
                        style={{
                            background: 'var(--md-surface)',
                            border: '1px solid var(--md-border)',
                            boxShadow: 'var(--md-shadow-sm)',
                        }}
                    >
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                id={`tab-${tab.id}`}
                                onClick={() => setTab(tab.id)}
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
                                    background: activeTab === tab.id
                                        ? 'var(--md-primary)'
                                        : 'transparent',
                                    boxShadow: activeTab === tab.id
                                        ? '0 4px 14px rgba(15, 118, 110, .28)'
                                        : 'none',
                                    minWidth: '150px',
                                }}
                            >
                                {/* Icon */}
                                <span style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}>
                                    {tab.icon}
                                </span>

                                {/* Label stack */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px' }}>
                                    <span style={{
                                        fontSize: 'var(--fs-base)',     /* 15px */
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.04em',
                                        lineHeight: 1,
                                        color: activeTab === tab.id ? '#fff' : 'var(--md-text-primary)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {tab.label}
                                    </span>
                                    <span style={{
                                        fontSize: '11px',    /* 11px */
                                        fontWeight: 600,
                                        letterSpacing: '0.04em',
                                        lineHeight: 1,
                                        opacity: activeTab === tab.id ? 0.85 : 0.65,
                                        color: activeTab === tab.id ? '#fff' : 'var(--md-text-secondary)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {tab.desc}
                                    </span>
                                </div>

                                {/* Active indicator dot */}
                                {activeTab === tab.id && (
                                    <span style={{
                                        width: '6px', height: '6px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.7)',
                                        flexShrink: 0,
                                        marginLeft: 'auto',
                                    }} />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <ErrorBoundary key={activeTab} tabName={TABS.find(t => t.id === activeTab)?.label || activeTab}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <div className="min-h-[600px] mb-10 animate-fade-in" style={{ animationDuration: '0.5s' }}>
                            {activeTab === 'finance' && <FinanceTab />}
                            {activeTab === 'opd' && <OPDTab />}
                            {activeTab === 'ipd' && <IPDTab />}
                            {activeTab === 'er' && <ERTab />}
                            {activeTab === 'dental' && <DentalTab />}
                            {activeTab === 'thaimed' && <ThaiMedTab />}
                            {activeTab === 'phystherapy' && <PhysTherapyTab />}
                            {activeTab === 'ncd' && <NCDTab />}
                            {activeTab === 'medrec' && <MedRecTab />}
                        </div>
                    </Suspense>
                </ErrorBoundary>

                {/* AI Assistant */}
                <Suspense fallback={null}>
                    <AIAssistant />
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
                <div className="max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-5 py-5
                                flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold text-gray-400">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span style={{ color: 'var(--md-text-tertiary)', fontWeight: 600 }}>© 2026</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(15, 118, 110, .08)', padding: '2px 6px', borderRadius: '4px', color: '#0f766e' }}>AI PROJECT</span>
                        <span className="font-bold" style={{ color: 'var(--md-primary)', letterSpacing: '-0.01em' }}>BCH 360° Intelligence</span>
                        <span style={{ color: 'var(--md-text-tertiary)' }}>v10.4.0</span>
                        <span className="text-gray-300">·</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(244,63,94,.08)', padding: '2px 6px', borderRadius: '4px', color: '#f43f5e' }}>SYSTEM ANALYST & DEVELOPMENT BY</span>
                        <span style={{ fontWeight: 800, color: '#f43f5e', letterSpacing: '-0.01em' }}>BOSSART</span>
                        <span className="text-gray-300">·</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(14,165,233,.08)', padding: '2px 6px', borderRadius: '4px', color: '#0ea5e9' }}>SUPPORTED BY</span>
                        <span style={{ fontWeight: 800, color: '#0ea5e9', letterSpacing: '-0.01em' }}>ITBANCHANG TEAM</span>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="uppercase tracking-wider">Predictive Load: Optimized</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5">
                            <span className="uppercase tracking-wider">Node: {systemStatus?.mysql_host || 'Cloud'}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
