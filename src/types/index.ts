// ============================================================
// BCH 360° Intelligence V.10 — Core Type Definitions
// Central barrel export for all shared types
// ============================================================

// Re-export everything from domain type files
export * from './dashboard';
export * from './api';

// ============================================================
// Additional Core Types
// ============================================================

// ── Monthly Data ──
export interface MonthlyData {
  month: string;
  month_num: number;
  year: number;
  revenue: number;
  visits: number;
  patients: number;
  avg_revenue_per_visit: number;
}

// ── Patient Visit ──
export interface PatientVisit {
  vn: string;
  hn: string;
  patient_name: string;
  age: number;
  sex: 'M' | 'F';
  visit_date: string;
  visit_time: string;
  clinic: string;
  department: string;
  status: string;
  total_minutes: number;
  doctor_name?: string;
  diagnosis?: string;
  revenue?: number;
}

// ── IPD Admission ──
export interface IPDAdmission {
  an: string;
  hn: string;
  patient_name: string;
  age: number;
  sex: 'M' | 'F';
  admit_date: string;
  ward: string;
  bed_no: string;
  attending_doctor: string;
  diagnosis: string;
  los_days: number;
  discharge_date?: string;
  discharge_status?: string;
  drg?: string;
  total_charge?: number;
}

// ── Pharmacy Analytics ──
export interface PharmacyAnalytics {
  total_prescriptions: number;
  total_items: number;
  total_cost: number;
  avg_items_per_prescription: number;
  avg_wait_minutes: number;
  controlled_drug_count: number;
  high_alert_count: number;
  top_drugs: DrugItem[];
}

// ── Drug Item ──
export interface DrugItem {
  drug_code: string;
  drug_name: string;
  generic_name?: string;
  category: string;
  quantity_dispensed: number;
  unit_cost: number;
  total_cost: number;
  is_high_alert: boolean;
  is_controlled: boolean;
}

// ── Generic API Response Wrapper (re-exported from api.ts as ApiResponse) ──
// Use ApiResponse<T> from './api' for API calls

// ── Auth User (alias for User from api.ts with AuthUser name) ──
export type AuthUser = import('./api').User;
