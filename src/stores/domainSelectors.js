// ============================================================
// BCH 360° Intelligence V.10 — Domain-Specific Selectors
// Fine-grained selectors to prevent cross-domain re-renders
// Usage: const finance = useFinanceSelector();
// ============================================================
import { useDashboardStore } from '../context/DashboardContext.jsx';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

// ── Finance Domain ──
export function useFinanceSelector() {
  const store = useDashboardStore();
  return useStore(store, useShallow(s => ({
    financeSummary: s.financeSummary,
    claims: s.claims,
    claimStats: s.claimStats,
    denialAnalytics: s.denialAnalytics,
    revenueLeakage: s.revenueLeakage,
    denialPrediction: s.denialPrediction,
    underCharging: s.underCharging,
    paymentVariance: s.paymentVariance,
    paymentPropensity: s.paymentPropensity,
    ppfsComparison: s.ppfsComparison,
    revenueForecast: s.revenueForecast,
    drgLeakage: s.drgLeakage,
    loading: s.loading,
    errors: s.errors,
  })));
}

// ── IPD Domain ──
export function useIPDSelector() {
  const store = useDashboardStore();
  return useStore(store, useShallow(s => ({
    bedOccupancy: s.bedOccupancy,
    alosData: s.alosData,
    admissions: s.admissions,
    bedDemand: s.bedDemand,
    readmission: s.readmission,
    losPrediction: s.losPrediction,
    ipdAnalytics: s.ipdAnalytics,
    ipdRevenueFiscal: s.ipdRevenueFiscal,
    bedFlow: s.bedFlow,
    dischargePlanning: s.dischargePlanning,
    medRecToday: s.medRecToday,
    loading: s.loading,
  })));
}

// ── OPD Domain ──
export function useOPDSelector() {
  const store = useDashboardStore();
  return useStore(store, useShallow(s => ({
    opdToday: s.opdToday,
    opdMonthlyFiscal: s.opdMonthlyFiscal,
    opdRevenueFiscal: s.opdRevenueFiscal,
    opdFlowPrediction: s.opdFlowPrediction,
    opdWaitOptimizer: s.opdWaitOptimizer,
    loading: s.loading,
  })));
}

// ── ER Domain ──
export function useERSelector() {
  const store = useDashboardStore();
  return useStore(store, useShallow(s => ({
    erTodayPatients: s.erTodayPatients,
    erTriageStats: s.erTriageStats,
    erWaitTimeForecast: s.erWaitTimeForecast,
    erBottlenecks: s.erBottlenecks,
    erSurge: s.erSurge,
    erResusAlert: s.erResusAlert,
    erDiversionStatus: s.erDiversionStatus,
    erAnalytics: s.erAnalytics,
    erRevenueFiscal: s.erRevenueFiscal,
    loading: s.loading,
  })));
}

// ── Clinical Domain ──
export function useClinicalSelector() {
  const store = useDashboardStore();
  return useStore(store, useShallow(s => ({
    riskPatients: s.riskPatients,
    riskStats: s.riskStats,
    riskDistribution: s.riskDistribution,
    resourceElasticity: s.resourceElasticity,
    loading: s.loading,
  })));
}

// ── Department tabs (generic pattern) ──
export function useDeptSelector(prefix) {
  const store = useDashboardStore();
  return useStore(store, useShallow(s => ({
    today: s[`${prefix}Today`],
    analytics: s[`${prefix}Analytics`],
    revenueFiscal: s[`${prefix}RevenueFiscal`],
    ai: s[`${prefix}AI`],
    loading: s.loading,
  })));
}

// ── Global/Shared ──
export function useGlobalSelector() {
  const store = useDashboardStore();
  return useStore(store, useShallow(s => ({
    activeTab: s.activeTab,
    dashboardSummary: s.dashboardSummary,
    emergencyAlerts: s.emergencyAlerts,
    lastUpdated: s.lastUpdated,
    user: s.user,
    drillDown: s.drillDown,
  })));
}
