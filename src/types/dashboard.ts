// ============================================================
// BCH 360° Intelligence V.10 — Dashboard Types
// Shared type definitions for frontend components
// ============================================================

// ── KPI & Dashboard ──
export interface DashboardSummary {
  data_source: string;
  finance: FinanceSummary;
  opd: { today_visits: number; trend_visits: number | null };
  ipd: { active_admissions: number; trend_admissions: number | null; alos: number | null };
  er: { today_visits: number; trend_visits: number | null };
  beds: BedSummary;
  clinical: ClinicalSummary;
  staff: { on_duty: number | null; doctors_today: number | null };
  last_updated: string;
}

export interface FinanceSummary {
  total_revenue: number;
  revenue_this_month: number;
  total_expense: number;
  net_profit: number;
  profit_margin: number;
  trend_revenue: number | null;
  collection_rate: number | null;
  debtors_outstanding: number | null;
  denial_rate: number | null;
  denied_count: number | null;
}

export interface BedSummary {
  total: number;
  occupied: number;
  available: number;
  occupancy_rate: number;
}

export interface ClinicalSummary {
  critical_patients: number;
  high_risk_patients: number;
  total_monitored: number;
}

// ── KPI Card Props ──
export interface KPICardProps {
  title: string;
  value: number | null;
  unit?: string;
  icon?: string;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'amber' | 'cyan';
  trend?: number | null;
  trendLabel?: string;
  format?: 'number' | 'currency' | 'percent' | 'decimal';
  loading?: boolean;
  drillDownId?: string;
  drillDownEndpoint?: string;
  onDrillDown?: (id: string) => void;
  aiInsight?: string | null;
  comparison?: { label: string; value: number } | null;
}

// ── Fiscal Year ──
export interface FiscalYear {
  fiscal_year_be: number;
  fiscal_label: string;
  start_date: string;
  end_date: string;
  total_revenue: number;
  total_visits: number;
  total_patients: number;
  avg_revenue_per_visit: number;
  comparable_revenue: number;
  comparable_visits: number;
  comparable_months: number;
  months: FiscalMonth[];
}

export interface FiscalMonth {
  month: string;
  month_num: number;
  year_num: number;
  revenue: number;
  visits: number;
  patients: number;
  has_data: boolean;
}

export interface FiscalResult {
  data_source: string;
  fiscal_years: FiscalYear[];
  timestamp: string;
}

// ── Alerts ──
export interface EmergencyAlert {
  severity: 'critical' | 'warning' | 'info';
  category: string;
  message: string;
  timestamp: string;
  _resus_count?: number;
}

// ── Drill Down ──
export interface DrillDownState {
  isOpen: boolean;
  kpiId: string | null;
  title: string;
  data: unknown;
  loading: boolean;
}

// ── Auth ──
export interface User {
  username: string;
  role: UserRole;
  full_name: string;
}

export type UserRole =
  | 'admin'
  | 'director'
  | 'finance'
  | 'clinical'
  | 'nursing'
  | 'medrec'
  | 'pharmacy'
  | 'lab'
  | 'xray'
  | 'dental'
  | 'er'
  | 'quality';

// ── Dashboard Store ──
export interface DashboardState {
  activeTab: string;
  dashboardSummary: DashboardSummary | null;
  financeSummary: unknown;
  claims: unknown[];
  claimStats: unknown;
  denialAnalytics: unknown;
  revenueLeakage: unknown;
  bedOccupancy: unknown;
  admissions: unknown[];
  alosData: unknown;
  riskPatients: unknown[];
  riskStats: unknown;
  riskDistribution: unknown;
  resourceElasticity: unknown;
  emergencyAlerts: EmergencyAlert[];
  erTodayPatients: unknown[];
  erTriageStats: unknown[];
  erWaitTimeForecast: unknown;
  erBottlenecks: unknown;
  erSurge: unknown;
  erResusAlert: unknown;
  erDiversionStatus: unknown;
  ncdGoalAttainment: unknown;
  medRecToday: unknown;
  medRecAnalytics: unknown;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  lastUpdated: number | null;
  user: User;
  drillDown: DrillDownState;
}

export interface DashboardActions {
  setTab: (tab: string) => void;
  fetchData: (key: string, url: string) => Promise<unknown>;
  fetchParallel: (requests: [string, string][]) => Promise<unknown[]>;
  batchFetch: (endpointMap: Record<string, string>) => Promise<Record<string, unknown>>;
  addAlert: (alert: EmergencyAlert) => void;
  dismissAlert: (index: number) => void;
  openDrillDown: (kpiId: string, title: string, endpoint?: string) => Promise<void>;
  closeDrillDown: () => void;
  dispatch: (action: DashboardAction) => void;
}

export type DashboardAction =
  | { type: 'SET_DATA'; key: string; payload: unknown }
  | { type: 'SET_LOADING'; key: string; payload: boolean }
  | { type: 'SET_ERROR'; key: string; payload: string | null }
  | { type: 'ADD_ALERT'; payload: EmergencyAlert }
  | { type: 'DISMISS_ALERT'; payload: number }
  | { type: 'SET_LAST_UPDATED'; payload: number }
  | { type: 'OPEN_DRILL_DOWN'; kpiId: string; title: string }
  | { type: 'CLOSE_DRILL_DOWN' }
  | { type: 'SET_DRILL_DOWN_DATA'; payload: unknown };
