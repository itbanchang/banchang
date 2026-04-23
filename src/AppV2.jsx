// ============================================================
// AppV2 — Modern shell wrapping the existing tab components.
//
// Replaces App.jsx's 780-line monolith with a slim layout:
//   - AppShell / Sidebar / AppHeader (responsive, grouped nav)
//   - ExecutiveCommandCenterV2 as the landing page
//   - Command palette (Cmd/Ctrl+K)
//   - Theme toggle (light / dark, persisted)
//   - Tabs lazy-loaded exactly like App.jsx (backward-compat)
//
// Legacy App.jsx stays in place for backward compat during migration.
// Promote by updating main.jsx to `import App from './AppV2.jsx'`.
// ============================================================
import React, { Suspense, useEffect, useMemo, useState, useCallback } from 'react';
import { useAuth } from './hooks/useAuth.js';
import LoginForm from './components/LoginForm.jsx';
import { useShallowDashboardSelector, useDashboardActions } from './context/DashboardContext.jsx';
import AppShell from './components/shared/AppShell.jsx';
import Sidebar from './components/shared/Sidebar.jsx';
import AppHeader from './components/shared/AppHeader.jsx';
import CommandPalette from './components/shared/CommandPalette.jsx';
import SubErrorBoundary from './components/shared/SubErrorBoundary.jsx';

// Lazy-load tabs — same pattern as App.jsx.
const ExecutiveCommandCenterV2 = React.lazy(() => import('./components/ExecutiveCommandCenterV2.jsx'));
const FinanceTab      = React.lazy(() => import('./components/FinanceTabV2.jsx'));
const OPDTab          = React.lazy(() => import('./components/OPDTab.jsx'));
const IPDTab          = React.lazy(() => import('./components/IPDTabV2.jsx'));
const ERTab           = React.lazy(() => import('./components/ERTabV2.jsx'));
const DentalTab       = React.lazy(() => import('./components/DentalTab.jsx'));
const ThaiMedTab      = React.lazy(() => import('./components/ThaiMedTab.jsx'));
const PhysTherapyTab  = React.lazy(() => import('./components/PhysTherapyTab.jsx'));
const NCDTab          = React.lazy(() => import('./components/NCDTab.jsx'));
const DialysisTab     = React.lazy(() => import('./components/DialysisTab.jsx'));
const MedRecTab       = React.lazy(() => import('./components/MedRecTab.jsx'));
const XRAYTab         = React.lazy(() => import('./components/XRAYTab.jsx'));
const PharmacyTab     = React.lazy(() => import('./components/PharmacyTab.jsx'));
const LaboratoryTab   = React.lazy(() => import('./components/LaboratoryTab.jsx'));
const QualityTab      = React.lazy(() => import('./components/QualityTab.jsx'));
const CompareTab      = React.lazy(() => import('./components/CompareTab.jsx'));
const ReportTab       = React.lazy(() => import('./components/ReportTab.jsx'));
const EvolutionTab    = React.lazy(() => import('./components/EvolutionTab.jsx'));
const CustomerInsightTab = React.lazy(() => import('./components/CustomerInsightTab.jsx'));
const DataQualityTab  = React.lazy(() => import('./components/DataQualityTab.jsx'));

// Nav groups — map identical ids to the switch below.
const NAV_GROUPS = [
    {
        title: 'Overview',
        items: [
            { id: 'executive', label: 'Executive',       icon: '🎯', desc: 'ภาพรวมผู้บริหาร' },
            { id: 'finance',   label: 'ศูนย์จัดเก็บรายได้', icon: '💰', desc: 'Revenue · AI Forecast' },
            { id: 'report',    label: 'Report',           icon: '📋', desc: 'REPORT Online' },
            { id: 'compare',   label: 'เปรียบเทียบปีงบ',  icon: '📊', desc: 'YoY · 3 ปีงบ' },
        ],
    },
    {
        title: 'Clinical',
        items: [
            { id: 'opd',         label: 'OPD',        icon: '⏱️', desc: 'ผู้ป่วยนอก · Wait Time' },
            { id: 'ipd',         label: 'IPD',        icon: '🏥', desc: 'ผู้ป่วยใน · Bed · AI' },
            { id: 'er',          label: 'ER',         icon: '🚑', desc: 'ห้องฉุกเฉิน · Surge' },
            { id: 'ncd',         label: 'NCD',        icon: '🫀', desc: 'DM · HT · CKD' },
            { id: 'dialysis',    label: 'ไตเทียม',     icon: '🩸', desc: 'Dialysis Analytics' },
        ],
    },
    {
        title: 'Specialties',
        items: [
            { id: 'dental',       label: 'ทันตกรรม',   icon: '🦷', desc: 'Dental DPI' },
            { id: 'thaimed',      label: 'แพทย์แผนไทย', icon: '🌿', desc: 'Thai Med TPI' },
            { id: 'phystherapy',  label: 'กายภาพบำบัด', icon: '🏋️', desc: 'Rehab PPI' },
            { id: 'xray',         label: 'รังสีวิทยา',  icon: '☢️', desc: 'X-Ray · CT · MRI' },
            { id: 'pharmacy',     label: 'เภสัชกรรม',  icon: '💊', desc: 'Rx Analytics' },
            { id: 'lab',          label: 'ห้องปฏิบัติการ', icon: '🔬', desc: 'Lab TAT' },
        ],
    },
    {
        title: 'Audit & Insight',
        items: [
            { id: 'medrec',           label: 'MedRec Audit',     icon: '📇', desc: 'Coding Quality' },
            { id: 'quality',          label: 'คุณภาพ HA',         icon: '⭐', desc: 'HA Thailand QPI' },
            { id: 'customer-insight', label: 'Customer Insight', icon: '🎯', desc: 'สิทธิ · การเบิก' },
            { id: 'evolution',        label: 'Self-Upgrade',     icon: '🧬', desc: 'Learning Journal' },
        ],
    },
    {
        title: 'System',
        items: [
            { id: 'dq', label: 'Data Quality', icon: '🛡️', desc: 'Schema · Freshness · Anomaly' },
        ],
    },
];

const ALL_ITEMS = NAV_GROUPS.flatMap(g => g.items.map(it => ({ ...it, group: g.title })));

function useTheme() {
    const [dark, setDark] = useState(() => {
        try {
            const stored = localStorage.getItem('bch360.theme');
            if (stored) return stored === 'dark';
            return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
        } catch { return false; }
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add('dark'); else root.classList.remove('dark');
        try { localStorage.setItem('bch360.theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
    }, [dark]);

    const toggle = useCallback(() => setDark(v => !v), []);
    return { dark, toggle };
}

function useClock() {
    const [now, setNow] = useState(() => new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    useEffect(() => {
        const t = setInterval(() => setNow(new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })), 1000);
        return () => clearInterval(t);
    }, []);
    return now;
}

function TabFallback({ label }) {
    return (
        <div className="flex items-center justify-center min-h-[50vh] text-[color:var(--md-text-tertiary)] text-fs-sm animate-pulse-soft">
            กำลังโหลด {label}…
        </div>
    );
}

function renderTab(activeTab, { summary, clinicalInsights, revenueTrend }) {
    const label = ALL_ITEMS.find(i => i.id === activeTab)?.label || activeTab;
    const fallback = <TabFallback label={label} />;
    const wrap = (Component, extras) => (
        <SubErrorBoundary label={label}>
            <Suspense fallback={fallback}>
                <Component {...extras} />
            </Suspense>
        </SubErrorBoundary>
    );

    switch (activeTab) {
        case 'executive':        return wrap(ExecutiveCommandCenterV2, { summary, clinicalInsights, revenueTrend });
        case 'finance':          return wrap(FinanceTab);
        case 'opd':              return wrap(OPDTab);
        case 'ipd':              return wrap(IPDTab);
        case 'er':               return wrap(ERTab);
        case 'dental':           return wrap(DentalTab);
        case 'thaimed':          return wrap(ThaiMedTab);
        case 'phystherapy':      return wrap(PhysTherapyTab);
        case 'ncd':              return wrap(NCDTab);
        case 'dialysis':         return wrap(DialysisTab);
        case 'medrec':           return wrap(MedRecTab);
        case 'xray':             return wrap(XRAYTab);
        case 'pharmacy':         return wrap(PharmacyTab);
        case 'lab':              return wrap(LaboratoryTab);
        case 'quality':          return wrap(QualityTab);
        case 'compare':          return wrap(CompareTab);
        case 'report':           return wrap(ReportTab);
        case 'evolution':        return wrap(EvolutionTab);
        case 'customer-insight': return wrap(CustomerInsightTab);
        case 'dq':               return wrap(DataQualityTab);
        default:                 return wrap(ExecutiveCommandCenterV2, { summary, clinicalInsights, revenueTrend });
    }
}

export default function AppV2() {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const { activeTab, summary, clinicalInsights, revenueTrend, alertsCount, user } = useShallowDashboardSelector(s => ({
        activeTab: s.activeTab || 'executive',
        summary: s.dashboardSummary,
        clinicalInsights: s.clinicalInsights,
        revenueTrend: s.revenueTrend30d,
        alertsCount: (s.emergencyAlerts?.length) || 0,
        user: s.user,
    }));
    const { setTab, fetchData, dispatch } = useDashboardActions();
    const { dark, toggle: toggleTheme } = useTheme();
    const now = useClock();

    const [cmdOpen, setCmdOpen] = useState(false);

    // Fetch exec summary once authenticated
    useEffect(() => {
        if (!isAuthenticated) return;
        fetchData?.('dashboardSummary',  '/api/dashboard/summary');
        fetchData?.('clinicalInsights',  '/api/clinical/insights');
        fetchData?.('revenueTrend30d',   '/api/finance/revenue-trend?days=30');
    }, [isAuthenticated, fetchData]);

    // Cmd/Ctrl+K — open command palette
    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setCmdOpen(v => !v);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const handleNavigate = useCallback((id) => {
        setTab?.(id);
        setCmdOpen(false);
    }, [setTab]);

    const activeItem = useMemo(() => ALL_ITEMS.find(it => it.id === activeTab), [activeTab]);

    // ── Auth gate ────────────────────────────────────────────
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[color:var(--md-bg)] text-[color:var(--md-text-secondary)]">
                กำลังตรวจสอบสิทธิ์…
            </div>
        );
    }
    if (!isAuthenticated) {
        return <LoginForm />;
    }

    // ── Main shell ──────────────────────────────────────────
    return (
        <>
            <AppShell
                sidebar={
                    <Sidebar
                        activeId={activeTab}
                        onNavigate={handleNavigate}
                        groups={NAV_GROUPS}
                    />
                }
                header={
                    <AppHeader
                        title={activeItem?.label || 'Dashboard'}
                        subtitle={activeItem?.desc}
                        now={now}
                        dark={dark}
                        onToggleTheme={toggleTheme}
                        onSearchClick={() => setCmdOpen(true)}
                        alertCount={alertsCount}
                        user={user}
                        onLogout={() => dispatch?.({ type: 'LOGOUT' })}
                    />
                }
            >
                {renderTab(activeTab, { summary, clinicalInsights, revenueTrend })}
            </AppShell>

            <CommandPalette
                open={cmdOpen}
                onClose={() => setCmdOpen(false)}
                items={ALL_ITEMS}
                onSelect={handleNavigate}
            />
        </>
    );
}
