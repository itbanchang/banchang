// ============================================================
// BCH 360° Intelligence V.10 — Shared API Types
// ทุก API response type กำหนดที่นี่ — ใช้ร่วมกันทั้ง frontend
// ============================================================

// ── Generic API Response Wrapper ──
export interface ApiResponse<T> {
  data: T;
  data_source?: string;
  timestamp?: string;
}

export interface ApiError {
  error: string;
  message?: string;
  details?: Array<{ field: string; message: string; code?: string }>;
  statusCode?: number;
}

// ── Auth Types ──
export interface User {
  id?: string;
  username: string;
  role: 'director' | 'finance' | 'clinical' | 'nursing' | 'medrec' | 'admin';
  full_name: string;
}

export interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  tokens: null; // httpOnly cookies — never in JS
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<{ user: User }>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean | null>;
  isAuthenticated: boolean;
}

// ── Dashboard Summary ──
export interface DashboardSummary {
  finance?: {
    total_revenue: number;
    monthly_revenue: number;
    trend_revenue: number;
    collection_rate: number;
  };
  beds?: {
    total_beds: number;
    occupied: number;
    available: number;
    occupancy_rate: number;
  };
  opd?: {
    today_total: number;
    completed: number;
    avg_wait_mins: number;
  };
  er?: {
    today_total: number;
    critical: number;
    avg_wait: number;
  };
}

// ── System Status ──
export interface SystemStatus {
  mysql_connected: boolean;
  mysql_host?: string;
  uptime: number;
  db_latency_ms: number;
  timestamp: string;
}

// ── OPD Types ──
export interface OPDWaitStep {
  registration_to_screening: number;
  screening_to_doctor: number;
  doctor_to_pharmacy: number;
  pharmacy_to_finance: number;
}

export interface OPDPatient {
  vn: string;
  hn: string;
  name: string;
  age: number;
  sex: string;
  vsttime: string;
  oqueue: string;
  cur_dep: string;
  clinic_name: string;
  current_status: string;
  total_minutes: number;
  ovstost: string;
  cur_dep_time?: string;
  doctor_time?: string;
  outtime?: string;
  finance_time?: string;
  wait_registration?: number | null;
  wait_screening?: number | null;
  wait_doctor?: number | null;
  wait_pharmacy?: number | null;
}

export interface OPDHourlyEntry {
  hour: number;
  label: string;
  count: number;
  completed?: number;
  waiting?: number;
}

export interface OPDTodayData {
  data_source: string;
  today_total: number;
  completed: number;
  still_here: number;
  is_holiday: boolean;
  op_hours: string;
  male: number;
  female: number;
  new_patient: number;
  revisit_patient: number;
  sla_pct: number;
  max_wait: number;
  waiting_doctor: number;
  peak_hour: number;
  throughput: number;
  avg_total_minutes: number;
  wait_steps: OPDWaitStep;
  wait_stddev: number;
  dropout_count: number;
  dropout_pct: number;
  doctor_yield_pct: number;
  completion_rate: number;
  capacity_utilization: number;
  median_wait: number;
  p90_wait: number;
  revisit_7d_count: number;
  revisit_7d_pct: number;
  avg_revenue_per_visit: number;
  total_opd_revenue: number;
  pte_ratio: number;
  sqi: number;
  sqi_components: Record<string, { score: number; weight: number; label: string; desc: string }>;
  hourly: OPDHourlyEntry[];
  hourly_yesterday: OPDHourlyEntry[];
  hourly_prediction: Array<OPDHourlyEntry & { confidence: number }>;
  patients: OPDPatient[];
  active_doctors_list: Array<{ code: string; name: string; total_count: number }>;
  active_nurses_list: Array<{ username: string; staff_name: string; screen_count: number }>;
  active_staff_list: Array<{ username: string; staff_name: string; screen_count: number }>;
  yesterday_total: number;
  yesterday_avg_wait: number;
  today_vs_yesterday_pct: number;
}

// ── IPD Types ──
export interface IPDSummary {
  total_admitted: number;
  total_beds: number;
  occupied: number;
  available: number;
  occupancy_rate: number;
  avg_los: number;
  discharged_today: number;
}

// ── Finance Types ──
export interface FinanceSummary {
  total_revenue: number;
  total_expense: number;
  net_income: number;
  collection_rate: number;
  trend_revenue: number;
}
