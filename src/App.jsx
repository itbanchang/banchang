// ============================================================
// BCH 360° Intelligence V.10 — Main App
// Material Dashboard 3 PRO — White Minimal Theme
// ============================================================
import React, { useEffect, useState, Suspense } from 'react';
import { useDashboard } from './context/DashboardContext.jsx';
import { useWebSocket } from './hooks/useWebSocket.js';
import KPICard from './components/KPICard.jsx';
import AlertBanner from './components/AlertBanner.jsx';
import AIAssistant from './components/AIAssistant.jsx';
import DailyBriefing from './components/DailyBriefing.jsx';

const FinanceTab = React.lazy(() => import('./components/FinanceTab.jsx'));
const OPDTab = React.lazy(() => import('./components/OPDTab.jsx'));
const IPDTab = React.lazy(() => import('./components/IPDTab.jsx'));
const ERTab = React.lazy(() => import('./components/ERTab.jsx'));
const DentalTab = React.lazy(() => import('./components/DentalTab.jsx'));
const ThaiMedTab = React.lazy(() => import('./components/ThaiMedTab.jsx'));
const PhysTherapyTab = React.lazy(() => import('./components/PhysTherapyTab.jsx'));
const NCDTab = React.lazy(() => import('./components/NCDTab.jsx'));

const TABS = [
    { id: 'finance', label: 'ศูนย์จัดเก็บรายได้', icon: '💰', desc: 'รายได้ · ค่าใช้จ่าย · AI Forecast' },
    { id: 'opd', label: 'OPD ผู้ป่วยนอก', icon: '⏱️', desc: 'ระยะเวลารอคอย · สถานะคลินิก' },
    { id: 'ipd', label: 'IPD ผู้ป่วยใน', icon: '🏥', desc: 'เตียง · การนอน · AI พยากรณ์' },
    { id: 'er', label: 'ห้องฉุกเฉิน', icon: '🚑', desc: 'สถานะ ER · AI Surge Alert' },
    { id: 'dental', label: 'ทันตกรรม', icon: '🦷', desc: 'คลินิกฟัน · DPI Analytics' },
    { id: 'thaimed', label: 'แพทย์แผนไทย', icon: '🌿', desc: 'นวด · สมุนไพร · TPI Analytics' },
    { id: 'phystherapy', label: 'กายภาพบำบัด', icon: '🏋️', desc: 'Rehab · PT · PPI Analytics' },
    { id: 'ncd', label: 'NCD', icon: '🫀', desc: 'DM · HT · CKD · NCI Analytics' },
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

/* ----- Error Boundary ----------------------------------------- */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, info) {
        console.error('Tab Error:', error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', margin: '2rem 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
                    <h3 style={{ fontSize: 'var(--fs-xl)', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '0.5rem' }}>
                        เกิดข้อผิดพลาดในการแสดงผล
                    </h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-secondary)', marginBottom: '1.5rem' }}>
                        {this.state.error?.message || 'Unknown error'}
                    </p>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        style={{
                            background: 'var(--md-primary)', color: '#fff',
                            padding: '0.625rem 2rem', borderRadius: '0.75rem',
                            fontWeight: 700, fontSize: 'var(--fs-sm)',
                            border: 'none', cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(124,58,237,.3)',
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
function MiniKPI({ label, value, color, icon }) {
    return (
        <div className="flex items-center gap-2.5">
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base shadow-md"
                style={{ background: `${color}15`, color }}
            >
                {icon}
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{label}</span>
                <span className="text-[13px] font-bold text-gray-800 mt-0.5">{value}</span>
            </div>
        </div>
    );
}

/* ----- Vertical divider --------------------------------------- */
function HDivider() {
    return <div className="hidden xl:block w-px h-6 bg-gray-200" />;
}

/* ============================================================== */
export default function App() {
    const { state, setTab, fetchData } = useDashboard();
    const { activeTab, dashboardSummary } = state;
    const [currentTime, setCurrentTime] = useState(new Date());
    const [systemStatus, setSystemStatus] = useState(null);
    const [aiHub, setAiHub] = useState(null);

    useWebSocket();

    useEffect(() => {
        fetchData('dashboardSummary', '/api/dashboard/summary');
        fetch('/api/system/status').then(r => r.json()).then(setSystemStatus).catch(() => { });
        fetch('/api/ai/hub').then(r => r.json()).then(setAiHub).catch(() => { });

        const interval = setInterval(() => {
            fetchData('dashboardSummary', '/api/dashboard/summary');
            fetch('/api/ai/hub').then(r => r.json()).then(setAiHub).catch(() => { });
        }, 30000);
        return () => clearInterval(interval);
    }, [fetchData]);

    useEffect(() => {
        const ticker = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(ticker);
    }, []);

    const summary = dashboardSummary;
    const isLive = systemStatus?.mysql_connected;

    return (
        <div className="min-h-screen" style={{ background: 'var(--md-bg)' }}>

            {/* ===================================================
                HEADER — Material AppBar
            =================================================== */}
            <header
                className="sticky top-0 z-50 backdrop-blur-md border-b"
                style={{
                    background: 'rgba(255,255,255,0.92)',
                    borderColor: 'var(--md-border)',
                    boxShadow: '0 1px 0 var(--md-divider), 0 2px 8px rgba(0,0,0,.04)',
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
                                    style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}
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
                                <h1 className="text-[15px] font-black tracking-tight leading-none flex items-center gap-1.5"
                                    style={{ color: 'var(--md-text-primary)' }}>
                                    BCH
                                    <span style={{ color: 'var(--md-primary)' }}>360°</span>
                                    <span className="text-gray-400 font-normal text-xs tracking-wider">Intelligence</span>
                                </h1>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400">
                                        {isLive ? 'System Online' : 'Connecting…'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mini KPIs */}
                        <div className="hidden xl:flex items-center gap-5">
                            {summary && (
                                <>
                                    <MiniKPI label="Revenue" value={`฿${((summary.finance?.total_revenue || 0) / 1e6).toFixed(1)}M`} color="#7c3aed" icon="📈" />
                                    <HDivider />
                                    <MiniKPI label="Bed Occ." value={`${summary.beds?.occupancy_rate || 0}%`} color="#10b981" icon="🛏️" />
                                    <HDivider />
                                    <MiniKPI label="Risk Cases" value={aiHub?.ews?.critical || summary.clinical?.critical_patients || 0} color="#f43f5e" icon="🚨" />
                                </>
                            )}
                        </div>

                        {/* Right: clock + avatar */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Global Scan</p>
                                <p className="text-xs font-mono font-bold text-gray-700 mt-0.5">
                                    {currentTime.toLocaleTimeString('th-TH')}
                                </p>
                            </div>

                            {/* Avatar */}
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm"
                                style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)' }}
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
                    />
                    <KPICard
                        title="อัตราครองเตียง" value={summary?.beds?.occupancy_rate}
                        format="percent" icon="🛏️" color="green"
                        loading={!summary}
                    />
                </div>

                {/* ===================================================
                    TAB NAVIGATION — Material Expanded Tabs
                =================================================== */}
                <div
                    className="mb-5 overflow-x-auto scrollbar-hide sticky z-40"
                    style={{ top: '64px' }}
                >
                    {/* Tab pill wrapper — full-width on large screens */}
                    <div
                        className="flex items-center gap-1.5 p-1.5 rounded-2xl w-full"
                        style={{
                            background: 'var(--md-surface)',
                            border: '1px solid var(--md-border)',
                            boxShadow: 'var(--md-shadow-sm)',
                            minWidth: 'max-content',
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
                                    flex: '1 1 0',
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
                                        ? '0 4px 14px rgba(124,58,237,.28)'
                                        : 'none',
                                    minWidth: '9rem',
                                }}
                            >
                                {/* Icon */}
                                <span style={{ fontSize: '1.25rem', lineHeight: 1, flexShrink: 0 }}>
                                    {tab.icon}
                                </span>

                                {/* Label stack */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                                    <span style={{
                                        fontSize: 'var(--fs-sm)',     /* 12px */
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                        lineHeight: 1,
                                        color: activeTab === tab.id ? '#fff' : 'var(--md-text-primary)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {tab.label}
                                    </span>
                                    <span style={{
                                        fontSize: 'var(--fs-2xs)',    /* 10px */
                                        fontWeight: 500,
                                        letterSpacing: '0.04em',
                                        lineHeight: 1,
                                        opacity: activeTab === tab.id ? 0.75 : 0.55,
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
                <ErrorBoundary>
                    <Suspense fallback={<LoadingSpinner />}>
                        <div className="min-h-[600px] mb-10">
                            {activeTab === 'finance' && <FinanceTab />}
                            {activeTab === 'opd' && <OPDTab />}
                            {activeTab === 'ipd' && <IPDTab />}
                            {activeTab === 'er' && <ERTab />}
                            {activeTab === 'dental' && <DentalTab />}
                            {activeTab === 'thaimed' && <ThaiMedTab />}
                            {activeTab === 'phystherapy' && <PhysTherapyTab />}
                            {activeTab === 'ncd' && <NCDTab />}
                        </div>
                    </Suspense>
                </ErrorBoundary>

                {/* AI Assistant & Flash Briefing */}
                <AIAssistant />
                <DailyBriefing />
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
                        <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'rgba(124,58,237,.08)', padding: '2px 6px', borderRadius: '4px', color: '#7c3aed' }}>AI PROJECT</span>
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
