// ============================================================
// BCH 360° Intelligence V.10 — Server API Types
// Shared type definitions for backend modules
// ============================================================

// ── Database ──
export interface DBQueryOptions {
  timeoutMs?: number;
}

export interface QueryMetrics {
  total: number;
  errors: number;
  avg_query_ms: number;
  killed_timeout: number;
  circuit_breaker_state: 'CLOSED' | 'OPEN' | 'HALF_OPEN';
}

export interface SemaphoreStats {
  running: number;
  queued: number;
  max: number;
}

export interface ServerProfile {
  id: string;
  host: string;
  port: number;
  database: string;
  label: string;
}

// ── Self-Heal ──
export type ErrorSeverity = 'critical' | 'warning' | 'info';

export interface ErrorPattern {
  id: string;
  match: RegExp;
  severity: ErrorSeverity;
  module: string;
  diagnosis: string;
  suggestedFix: string | null;
  autoFix: string | null;
}

export interface HealRecord {
  timestamp: string;
  pattern_id: string;
  severity: ErrorSeverity;
  module: string;
  diagnosis: string;
  error_message: string;
  context: string;
  auto_fix: string | null;
  fix_result: HealResult | null;
  suggested_fix: string | null;
  count_last_hour: number;
}

export interface HealResult {
  success: boolean;
  action: string;
  error?: string;
}

export interface HealingStats {
  total_errors_last_hour: number;
  auto_fixed: number;
  failed_fixes: number;
  needs_human: number;
  uptime_hours: number;
  memory_mb: number;
  memory_max_mb: number;
  by_pattern: Array<{
    pattern_id: string;
    count: number;
    last_seen: string;
    diagnosis: string;
    auto_fixable: boolean;
  }>;
  recent_actions: HealRecord[];
  error_patterns: Array<{
    id: string;
    module: string;
    severity: ErrorSeverity;
    diagnosis: string;
    auto_fixable: boolean;
  }>;
}

export interface HealthCheckResult {
  status: 'healthy' | 'warning' | 'critical';
  checked_at: string;
  issues: HealthIssue[];
  memory: { heap_used_mb: number; heap_total_mb: number; pct: number };
  uptime_hours: number;
}

export interface HealthIssue {
  severity: ErrorSeverity;
  module: string;
  issue: string;
  autoFix: string | null;
  fix_applied?: boolean;
  fix_result?: HealResult;
}

// ── Alert Engine ──
export interface AlertRule {
  id: string;
  name: string;
  severity: ErrorSeverity;
  check: () => AlertCheckResult;
  cooldown_ms: number;
}

export interface AlertCheckResult {
  fired: boolean;
  value?: number | string;
  message?: string;
}

export interface FiredAlert {
  id: string;
  name: string;
  severity: ErrorSeverity;
  message: string;
  value: number | string;
  fired_at: string;
}

export interface AlertStatus {
  status: 'healthy' | 'warning' | 'critical';
  active_alerts: FiredAlert[];
  active_count: number;
  by_severity: Record<ErrorSeverity, number>;
  total_fired: number;
  recent: FiredAlert[];
  checked_at: string;
  rules: Array<{
    id: string;
    name: string;
    severity: ErrorSeverity;
    cooldown_ms: number;
    last_fired: string | null;
  }>;
}

// ── Forecast ──
export interface ForecastResult {
  forecast: Array<{
    month: string;
    predicted: number;
    lower: number;
    upper: number;
  }>;
  model: string;
  trend_direction: 'increasing' | 'decreasing' | 'stable';
  yoy_growth_pct: number;
  seasonal_index: Record<number, number>;
  narrative?: ForecastNarrative | null;
}

export interface ForecastNarrative {
  headline: string;
  trend_analysis: string;
  seasonal_insight: string;
  risks: string[];
  recommendations: string[];
  model_note: string;
}

// ── EWS ──
export interface EWSScore {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  action: string;
  components: Record<string, number>;
}

export interface EWSSummary {
  critical: number;
  high: number;
  medium: number;
  low: number;
  total_patients: number;
  alerts: Array<{
    hn: string;
    name: string;
    ward: string;
    ews: EWSScore;
  }>;
}

// ── FHIR ──
export interface FHIRPatient {
  resourceType: 'Patient';
  id: string;
  identifier: Array<{ system: string; value: string }>;
  name: Array<{ text: string }>;
  gender: string;
  birthDate: string;
}

export interface FHIREncounter {
  resourceType: 'Encounter';
  id: string;
  status: string;
  class: { code: string };
  period: { start: string; end?: string };
  diagnosis?: Array<{ condition: { display: string } }>;
}
