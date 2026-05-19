import {
  R as c0,
  r as C,
  j as u,
  F as X0
} from "./vendor-react-ByYOq5k4.js";
import {
  b as U0,
  a as J0,
  T as G0,
  i as Y0,
  E as q0,
  l as Z0,
  S as v0,
  K as x0,
  h as uu
} from "./shared-ui-OVDEF1.js";
import {
  R as N,
  c as p0,
  a as H,
  X as M,
  Y as O,
  T as K,
  B as Y,
  e as Eu,
  C as A0,
  A as g0
} from "./vendor-charts-C5q2M-g3.js";
const q = {
  1: {
    name: "Level 1",
    color: "#f43f5e",
    label: "Resus"
  },
  2: {
    name: "Level 2",
    color: "#f59e0b",
    label: "Emerg"
  },
  3: {
    name: "Level 3",
    color: "#eab308",
    label: "Urgent"
  },
  4: {
    name: "Level 4",
    color: "#10b981",
    label: "Semi"
  },
  5: {
    name: "Level 5",
    color: "#94a3b8",
    label: "Non"
  }
};

function eu() {
  const n = U0(E => ({
      erSurge: E.erSurge,
      erTodayPatients: E.erTodayPatients,
      erTriageStats: E.erTriageStats,
      erAnalytics: E.erAnalytics,
      erResusAlert: E.erResusAlert,
      erDiversionStatus: E.erDiversionStatus,
      loading: E.loading,
      erBottlenecks: E.erBottlenecks,
      erRevenueFiscal: E.erRevenueFiscal,
      erAIv2: E.erAIv2,
      erDataQuality: E.erDataQuality,
      erPatientSat: E.erPatientSat,
      erTrends: E.erTrends
    })),
    {
      fetchData: g
    } = J0(),
    c = n.erSurge,
    h = n.erTodayPatients || [],
    f0 = n.erTriageStats || [],
    d = n.erAnalytics,
    V = n.erResusAlert,
    S0 = n.erDiversionStatus,
    R = n.erDataQuality,
    D0 = n.erPatientSat,
    B = n.erTrends,
    v = n.loading,
    [B0, Z] = C.useState(!0),
    [au, nu] = C.useState(!1);
  C.useEffect(() => {
    if (V) {
      Z(!0);
      const E = setTimeout(() => Z(!1), 5 * 60 * 1e3);
      return () => clearTimeout(E)
    }
  }, [V]), C.useEffect(() => {
    g("erSurge", "/api/ai/er-surge"), g("erTodayPatients", "/api/er/today-patients"), g("erTriageStats", "/api/er/triage-stats"), g("erBottlenecks", "/api/er/flow-bottlenecks"), g("erAnalytics", "/api/er/analytics"), g("erRevenueFiscal", "/api/er/revenue-fiscal"), g("erDiversionStatus", "/api/er/diversion-status"), g("erDataQuality", "/api/er/data-quality"), g("erPatientSat", "/api/satisfaction/summary?department=ER&days=30"), g("erTrends", "/api/er/trends?months=12");
    const E = setTimeout(() => g("erAIv2", "/api/ai/er/optimization"), 500);
    return () => clearTimeout(E)
  }, [g]);
  const _0 = C.useMemo(() => c?.hourly_forecast ? c.hourly_forecast.map(E => ({
      name: E.label,
      predicted: E.predicted,
      actual: E.actual,
      isFuture: E.is_future
    })) : [], [c]),
    m = C.useMemo(() => {
      if (!d) return {
        problems: [],
        urgencyScore: 0,
        urgencyColor: "#10b981",
        urgencyLabel: "\u0E1B\u0E01\u0E15\u0E34",
        forecast: {
          intensity: "Normal",
          nextPeak: "\u2014",
          predicted: 0
        },
        staffing: {
          status: "Optimal",
          recommendation: "Baseline Staffing",
          color: "#10b981"
        },
        strategicKPIs: []
      };
      const E = d || {},
        i = E.today_acuity || {},
        r = h.length,
        t = [],
        a = E.avg_time_to_doctor ?? 0,
        l = E.p90_time_to_doctor ?? 0,
        o = E.lwbs_rate ?? 0,
        p = E.return_visit_rate ?? 0;
      if (i.acuity_pct, l > 45) {
        const y = l > 60;
        t.push({
          priority: 1,
          severity: y ? "critical" : "warning",
          title: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 10% \u0E23\u0E2D\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E19\u0E32\u0E19\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 (P90 : ${l} \u0E19\u0E32\u0E17\u0E35)`,
          rootCause: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E17\u0E49\u0E32\u0E22 10% (P90) \u0E15\u0E49\u0E2D\u0E07\u0E23\u0E2D\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E19\u0E32\u0E19\u0E40\u0E01\u0E34\u0E19\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E21\u0E32\u0E01 \u0E41\u0E2A\u0E14\u0E07\u0E16\u0E36\u0E07\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E02\u0E2D\u0E07\u0E23\u0E30\u0E1A\u0E1A\u0E04\u0E31\u0E14\u0E41\u0E22\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 (Triage) \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E02\u0E32\u0E14\u0E41\u0E04\u0E25\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 (Peak Hour) \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E2A\u0E33\u0E04\u0E31\u0E0D \u0E44\u0E14\u0E49\u0E41\u0E01\u0E48 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01\u0E15\u0E31\u0E27\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E43\u0E14\u0E40\u0E27\u0E25\u0E32\u0E2B\u0E19\u0E36\u0E48\u0E07 \u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E15\u0E32\u0E23\u0E32\u0E07\u0E40\u0E27\u0E23\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
          cascadeEffect: "\u0E01\u0E32\u0E23\u0E23\u0E2D\u0E19\u0E32\u0E19\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E1A\u0E32\u0E07\u0E23\u0E32\u0E22\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E01\u0E48\u0E2D\u0E19\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E23\u0E31\u0E01\u0E29\u0E32 (LWBS) \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E23\u0E2D\u0E2D\u0E22\u0E39\u0E48\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E17\u0E23\u0E38\u0E14\u0E25\u0E07\u0E02\u0E2D\u0E07\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E41\u0E25\u0E30\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32",
          fixFirst: "\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 : (1) \u0E40\u0E1B\u0E34\u0E14\u0E0A\u0E48\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E14\u0E48\u0E27\u0E19 (Fast-Track Lane) \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E44\u0E21\u0E48\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E17\u0E31\u0E19\u0E17\u0E35 (2) \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E23\u0E2D\u0E40\u0E01\u0E34\u0E19 45 \u0E19\u0E32\u0E17\u0E35\u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E0B\u0E49\u0E33\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 (3) \u0E40\u0E23\u0E35\u0E22\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E41\u0E25\u0E30\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19",
          color: y ? "#f43f5e" : "#f59e0b"
        })
      }
      if (a > 15 && l <= 45 && t.push({
          priority: 2,
          severity: "warning",
          title: `\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (${a} \u0E19\u0E32\u0E17\u0E35)`,
          rootCause: `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E23\u0E34\u0E48\u0E21\u0E40\u0E01\u0E34\u0E19\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 15 \u0E19\u0E32\u0E17\u0E35 \u0E42\u0E14\u0E22\u0E21\u0E35\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E23\u0E27\u0E21 ${i.total||0} \u0E23\u0E32\u0E22 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E23\u0E34\u0E48\u0E21\u0E2B\u0E19\u0E32\u0E41\u0E19\u0E48\u0E19\u0E41\u0E25\u0E30\u0E21\u0E35\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E08\u0E30\u0E40\u0E01\u0E34\u0E14\u0E20\u0E32\u0E27\u0E30\u0E04\u0E2D\u0E02\u0E27\u0E14\u0E43\u0E19\u0E40\u0E23\u0E47\u0E27 \u0E46 \u0E19\u0E35\u0E49`,
          fixFirst: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 : (1) \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E23\u0E2D\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E22\u0E49\u0E32\u0E22\u0E40\u0E02\u0E49\u0E32\u0E2B\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (Boarding Patients) (2) \u0E40\u0E23\u0E48\u0E07\u0E01\u0E23\u0E30\u0E1A\u0E27\u0E19\u0E01\u0E32\u0E23\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32\u0E19\u0E2D\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E04\u0E25\u0E35\u0E22\u0E23\u0E4C\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19 (3) \u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E01\u0E31\u0E1A\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E35\u0E48\u0E22\u0E27\u0E02\u0E49\u0E2D\u0E07 (Lab \xB7 Radiology \xB7 Pharmacy) \u0E43\u0E2B\u0E49\u0E40\u0E23\u0E48\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25",
          color: "#f59e0b"
        }), o > 2) {
        const y = o > 5;
        t.push({
          priority: 3,
          severity: y ? "critical" : "warning",
          title: `\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E2D\u0E2D\u0E01\u0E01\u0E48\u0E2D\u0E19\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07 (LWBS ${o}%)`,
          rootCause: "\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E17\u0E35\u0E48\u0E22\u0E32\u0E27\u0E19\u0E32\u0E19\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E1A\u0E32\u0E07\u0E23\u0E32\u0E22\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E01\u0E48\u0E2D\u0E19\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E08\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C (Left Without Being Seen) \u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E44\u0E21\u0E48\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19 \u0E2B\u0E23\u0E37\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E21\u0E48\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19",
          cascadeEffect: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E33\u0E04\u0E31\u0E0D \u0E44\u0E14\u0E49\u0E41\u0E01\u0E48 (1) \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E2D\u0E2D\u0E01\u0E44\u0E1B\u0E2D\u0E32\u0E08\u0E21\u0E35\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E17\u0E23\u0E38\u0E14\u0E25\u0E07\u0E17\u0E35\u0E48\u0E1A\u0E49\u0E32\u0E19 (2) \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E17\u0E32\u0E07\u0E01\u0E0E\u0E2B\u0E21\u0E32\u0E22 (Malpractice Risk) \u0E2B\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E01\u0E34\u0E14\u0E20\u0E32\u0E27\u0E30\u0E41\u0E17\u0E23\u0E01\u0E0B\u0E49\u0E2D\u0E19 (3) \u0E01\u0E23\u0E30\u0E17\u0E1A\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E32\u0E21\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 HA \u0E41\u0E25\u0E30 JCI",
          fixFirst: "\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 : (1) \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E04\u0E31\u0E14\u0E41\u0E22\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 (Triage Nurse) \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0B\u0E49\u0E33\u0E17\u0E38\u0E01 20 \u0E19\u0E32\u0E17\u0E35 (2) \u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E04\u0E34\u0E27\u0E41\u0E25\u0E30\u0E40\u0E27\u0E25\u0E32\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E43\u0E2B\u0E49\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E23\u0E32\u0E1A\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D (3) \u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E49\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E41\u0E25\u0E30\u0E0D\u0E32\u0E15\u0E34\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08",
          color: y ? "#f43f5e" : "#f59e0b"
        })
      }
      p > 3 && t.push({
        priority: 4,
        severity: "warning",
        title: `\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E0B\u0E49\u0E33\u0E20\u0E32\u0E22\u0E43\u0E19 72 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07 (${p}%)`,
        rootCause: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19\u0E0B\u0E49\u0E33\u0E20\u0E32\u0E22\u0E43\u0E19\u0E40\u0E27\u0E25\u0E32\u0E2D\u0E31\u0E19\u0E2A\u0E31\u0E49\u0E19 \u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E2B\u0E25\u0E31\u0E01 \u0E44\u0E14\u0E49\u0E41\u0E01\u0E48 (1) \u0E2D\u0E32\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E17\u0E38\u0E40\u0E25\u0E32\u0E2B\u0E25\u0E31\u0E07\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 (2) \u0E01\u0E32\u0E23\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22\u0E43\u0E19\u0E04\u0E23\u0E31\u0E49\u0E07\u0E41\u0E23\u0E01\u0E44\u0E21\u0E48\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07 (3) \u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E44\u0E21\u0E48\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19 (4) \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E02\u0E32\u0E14\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E1A\u0E49\u0E32\u0E19",
        cascadeEffect: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2A\u0E30\u0E2A\u0E21\u0E17\u0E35\u0E48\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E15\u0E49\u0E19\u0E17\u0E35\u0E48\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E17\u0E35\u0E48\u0E2A\u0E16\u0E32\u0E1A\u0E31\u0E19\u0E23\u0E31\u0E1A\u0E23\u0E2D\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E (\u0E2A\u0E23\u0E1E./JCI) \u0E43\u0E0A\u0E49\u0E43\u0E19\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E48\u0E2D\u0E2D\u0E32\u0E22\u0E38\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E23\u0E2D\u0E07",
        fixFirst: "\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E25\u0E14\u0E01\u0E32\u0E23\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33 : (1) \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E42\u0E14\u0E22\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 (Audit Committee) (2) \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 (Discharge Criteria) \u0E43\u0E2B\u0E49\u0E23\u0E31\u0E14\u0E01\u0E38\u0E21 (3) \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E19\u0E31\u0E14\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E20\u0E32\u0E22\u0E43\u0E19 48 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07 (4) \u0E08\u0E31\u0E14\u0E17\u0E33\u0E2A\u0E37\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E15\u0E19\u0E40\u0E2D\u0E07\u0E17\u0E35\u0E48\u0E1A\u0E49\u0E32\u0E19\u0E43\u0E2B\u0E49\u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E07\u0E48\u0E32\u0E22",
        color: "#f59e0b"
      }), c?.surge_alert && t.push({
        priority: 0,
        severity: "critical",
        title: `\u{1F6A8} AI Surge Advisory: \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 +${c.next_4h_predicted} \u0E23\u0E32\u0E22`,
        rootCause: "\u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 4 \u0E0A\u0E21. \u0E02\u0E49\u0E32\u0E07\u0E2B\u0E19\u0E49\u0E32",
        cascadeEffect: "\u0E2B\u0E32\u0E01\u0E44\u0E21\u0E48\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E23\u0E31\u0E1A\u0E21\u0E37\u0E2D \u0E08\u0E30\u0E40\u0E01\u0E34\u0E14\u0E27\u0E34\u0E01\u0E24\u0E15 overcrowding",
        fixFirst: "Activate Surge Staffing \u0E41\u0E25\u0E30\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 IPD beds \u0E17\u0E31\u0E19\u0E17\u0E35",
        color: "#f43f5e"
      });
      const A = t.filter(y => y.severity === "critical").length,
        b = t.filter(y => y.severity === "warning").length,
        f = Math.min(10, A * 3 + b * 1.5),
        j = f >= 7 ? "#f43f5e" : f >= 4 ? "#f59e0b" : "#10b981",
        z = f >= 7 ? "\u0E27\u0E34\u0E01\u0E24\u0E15" : f >= 4 ? "\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u0E1B\u0E01\u0E15\u0E34",
        F = [{
          icon: "\u23F1\uFE0F",
          label: "Triage SLA",
          value: `${E.sla_pass_rate||0}%`,
          sub: "Target Compliance",
          color: (E.sla_pass_rate || 0) > 85 ? "#10b981" : "#f59e0b"
        }, {
          icon: "\u{1FA7A}",
          label: "P90 Wait",
          value: `${l}m`,
          sub: "90th Percentile",
          color: l < 45 ? "#10b981" : "#f43f5e"
        }, {
          icon: "\u{1F6B6}",
          label: "LWBS",
          value: `${o}%`,
          sub: "\u0E2D\u0E2D\u0E01\u0E01\u0E48\u0E2D\u0E19\u0E15\u0E23\u0E27\u0E08",
          color: o > 2 ? "#f43f5e" : "#10b981"
        }, {
          icon: "\u{1F504}",
          label: "Return 72h",
          value: `${p}%`,
          sub: "\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33",
          color: p > 3 ? "#f43f5e" : "#10b981"
        }, {
          icon: "\u{1F3E5}",
          label: "Admit Rate",
          value: `${E.admit_rate||0}%`,
          sub: "\u0E2D\u0E31\u0E15\u0E23\u0E32 Admit",
          color: "#8b5cf6"
        }, {
          icon: "\u{1F3AF}",
          label: "EPI Score",
          value: `${E.epi||0}/100`,
          sub: "ER Perf Index",
          color: (E.epi || 0) < 70 ? "#f43f5e" : "#10b981"
        }, {
          icon: "\u{1F9EA}",
          label: "Lab Cycle",
          value: `${n.erBottlenecks?.averages?.lab||0}m`,
          sub: "Turnaround Time",
          color: (n.erBottlenecks?.averages?.lab || 0) > 60 ? "#f43f5e" : "#10b981"
        }, {
          icon: "\u{1F4B0}",
          label: "Rev/Visit",
          value: `\u0E3F${(E.avg_cost_per_visit||0).toLocaleString()}`,
          sub: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E23\u0E32\u0E22",
          color: "#8b5cf6"
        }];
      return {
        problems: t.sort((y, S) => y.priority - S.priority),
        urgencyScore: f,
        urgencyColor: j,
        urgencyLabel: z,
        strategicKPIs: F,
        forecast: {
          intensity: c?.surge_alert ? "High" : r > 25 ? "Heavy" : "Normal",
          nextPeak: E.peak_hour?.label || "\u2014",
          predicted: c?.next_4h_predicted || 0
        },
        staffing: {
          status: c?.surge_alert ? "Overstrained" : r > 30 ? "Tight" : "Optimal",
          recommendation: c?.surge_alert ? "Activate Surge Team" : r > 30 ? "Request Support" : "Baseline Staffing",
          color: c?.surge_alert ? "#f43f5e" : r > 30 ? "#f59e0b" : "#10b981"
        }
      }
    }, [d, h, c, n.erBottlenecks]);
  C.useMemo(() => {
    const E = d?.today_acuity || {};
    return [{
      id: 1,
      val: E.resus
    }, {
      id: 2,
      val: E.emerg
    }, {
      id: 3,
      val: E.urgent
    }, {
      id: 4,
      val: E.semi
    }, {
      id: 5,
      val: E.non_urg
    }].map(i => ({
      name: q[i.id]?.label || `L${i.id}`,
      value: Number(i.val || 0),
      fill: q[i.id]?.color || "#94a3b8"
    }))
  }, [d]);
  const C0 = C.useCallback(({
    index: E,
    style: i
  }) => {
    const r = h[E];
    if (!r) return null;
    const t = q[r.triage_id] || q[5];
    return u.jsxs("div", {
      style: {
        ...i,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0 1.25rem",
        borderBottom: "1px solid var(--md-divider)",
        background: "transparent",
        transition: "background 0.15s"
      },
      onMouseEnter: a => a.currentTarget.style.background = "rgba(124,58,237,.03)",
      onMouseLeave: a => a.currentTarget.style.background = "transparent",
      children: [u.jsx("div", {
        style: {
          width: "40px",
          fontSize: "var(--fs-2xs)",
          fontWeight: 700,
          color: "var(--md-text-tertiary)"
        },
        children: r.enter_er_time?.substring(11, 16) || "\u2014"
      }), u.jsxs("div", {
        style: {
          flex: 1,
          minWidth: 0
        },
        children: [u.jsx("p", {
          style: {
            margin: 0,
            fontSize: "var(--fs-sm)",
            fontWeight: 700,
            color: "var(--md-text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          },
          children: r.name
        }), u.jsxs("p", {
          style: {
            margin: 0,
            fontSize: "var(--fs-2xs)",
            color: "var(--md-text-tertiary)",
            fontWeight: 500
          },
          children: [r.hn, " \xB7 ", r.age, "y ", r.sex === "1" ? "M" : "F"]
        })]
      }), u.jsx("div", {
        style: {
          width: "64px",
          textAlign: "center"
        },
        children: u.jsx("span", {
          style: {
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 700,
            background: `${t.color}15`,
            color: t.color
          },
          children: t.label
        })
      }), u.jsx("div", {
        style: {
          width: "60px",
          textAlign: "center"
        },
        children: r.news2?.score >= 5 ? u.jsx("span", {
          style: {
            fontSize: "12px",
            fontWeight: 700,
            color: "#f43f5e",
            background: "rgba(244,63,94,.1)",
            padding: "2px 6px",
            borderRadius: "8px"
          },
          children: "Critical"
        }) : u.jsxs("span", {
          style: {
            fontSize: "var(--fs-2xs)",
            fontWeight: 700,
            color: "var(--md-text-tertiary)"
          },
          children: ["Score: ", r.news2?.score || 0]
        })
      }), u.jsx("div", {
        style: {
          width: "48px",
          textAlign: "right"
        },
        children: u.jsxs("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 600,
            color: r.stay_minutes > 120 ? "#f43f5e" : r.stay_minutes > 60 ? "#f59e0b" : "#10b981"
          },
          children: [r.stay_minutes || 0, "m"]
        })
      })]
    })
  }, [h]);
  return v.erAnalytics ? u.jsx(G0, {}) : !d && !h.length ? u.jsx(Y0, {
    icon: "\u{1F691}",
    title: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ER",
    description: "\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19\u0E44\u0E14\u0E49\u0E43\u0E19\u0E02\u0E13\u0E30\u0E19\u0E35\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D HOSxP XE"
  }) : u.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    role: "region",
    "aria-label": "\u0E41\u0E1C\u0E19\u0E01 ER \u2014 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19",
    children: [u.jsx(q0, {
      title: "AI Executive Quick Summary \u2014 ER",
      subtitle: "Surge \xB7 Time-to-Doctor \xB7 LWBS \xB7 Acuity",
      badge: "\u{1F4D0} Quick Summary",
      accentColor: "#dc2626",
      headerGradient: "linear-gradient(135deg, rgba(220,38,38,.10), rgba(245,158,11,.05))",
      narrative: Z0(n)
    }), V && B0 && u.jsx(tu, {
      alert: V,
      onDismiss: () => Z(!1)
    }), u.jsx(iu, {
      data: S0,
      loading: v.erDiversionStatus
    }), u.jsx(v0, {
      name: "AI Intelligence Feed",
      children: !v.erTodayPatients && d && u.jsxs("div", {
        style: {
          display: "flex",
          gap: "12px",
          marginBottom: "1rem",
          overflowX: "auto",
          paddingBottom: "4px"
        },
        children: [u.jsxs("div", {
          className: "glass-card",
          style: {
            flex: "1 1 300px",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            borderLeft: `4px solid ${m.urgencyColor}`,
            background: `${m.urgencyColor}05`
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "24px"
            },
            children: "\u{1F916}"
          }), u.jsxs("div", {
            style: {
              flex: 1
            },
            children: [u.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 600,
                color: m.urgencyColor,
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              },
              children: "AI Executive Intelligence"
            }), u.jsx("p", {
              style: {
                margin: "2px 0 0",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--md-text-primary)"
              },
              children: m.problems[0]?.title || "ER Operations \u0E1B\u0E01\u0E15\u0E34"
            }), u.jsxs("p", {
              style: {
                margin: "2px 0 0",
                fontSize: "12px",
                color: "var(--md-text-secondary)",
                fontWeight: 500
              },
              children: ["Urgency: ", m.urgencyLabel, " (", m.urgencyScore, "/10)"]
            })]
          })]
        }), u.jsxs("div", {
          className: "glass-card",
          style: {
            flex: "0 0 220px",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderLeft: "4px solid #10b981",
            background: "rgba(16,185,129,.05)"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "24px"
            },
            children: "\u{1F4C8}"
          }), u.jsxs("div", {
            children: [u.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 600,
                color: "#10b981",
                textTransform: "uppercase"
              },
              children: "Surge Forecast"
            }), u.jsxs("p", {
              style: {
                margin: "2px 0 0",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--md-text-primary)"
              },
              children: [m.forecast.intensity, " Load"]
            }), u.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: ["Peak at ", m.forecast.nextPeak]
            })]
          })]
        }), u.jsxs("div", {
          className: "glass-card",
          style: {
            flex: "0 0 240px",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderLeft: `4px solid ${m.staffing.color}`,
            background: `${m.staffing.color}05`
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "24px"
            },
            children: "\u{1F465}"
          }), u.jsxs("div", {
            children: [u.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 600,
                color: m.staffing.color,
                textTransform: "uppercase"
              },
              children: "Staffing Recommendation"
            }), u.jsx("p", {
              style: {
                margin: "2px 0 0",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--md-text-primary)"
              },
              children: m.staffing.recommendation
            })]
          })]
        })]
      })
    }), u.jsx("div", {
      style: {
        marginBottom: "1.25rem"
      },
      children: u.jsxs("div", {
        style: {
          padding: "1.25rem 1.5rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(244,63,94,.12) 0%, rgba(239,68,68,.06) 100%)",
          border: "1px solid rgba(244,63,94,.2)",
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden"
        },
        children: [u.jsx("div", {
          style: {
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,63,94,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), v.erTodayPatients ? u.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          },
          children: [u.jsx("div", {
            className: "skeleton",
            style: {
              height: "12px",
              width: "80px"
            }
          }), u.jsx("div", {
            className: "skeleton",
            style: {
              height: "40px",
              width: "120px"
            }
          }), u.jsx("div", {
            className: "skeleton",
            style: {
              height: "8px",
              width: "100%",
              borderRadius: "99px"
            }
          })]
        }) : (() => {
          const E = h.length,
            i = h.filter(o => Number(o.triage_id) === 1).length,
            r = h.filter(o => Number(o.triage_id) === 2).length,
            t = h.filter(o => Number(o.triage_id) === 3).length,
            a = Math.max(0, E - i - r - t),
            l = E > 0 ? Math.round(h.reduce((o, p) => o + (p.stay_minutes || 0), 0) / E) : 0;
          return u.jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              position: "relative",
              zIndex: 1
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              },
              children: [u.jsx("p", {
                style: {
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#f43f5e",
                  margin: 0
                },
                children: "\u{1F691} Live ER \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19"
              }), u.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600,
                  background: "rgba(244,63,94,.08)",
                  padding: "2px 8px",
                  borderRadius: "99px"
                },
                children: "Real-time"
              })]
            }), u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "8px"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "32px",
                  fontWeight: 900,
                  color: "#f43f5e",
                  letterSpacing: "-0.04em",
                  lineHeight: 1
                },
                children: E
              }), u.jsx("span", {
                style: {
                  fontSize: "14px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: "\u0E23\u0E32\u0E22"
              }), u.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: ["Avg Stay: ", u.jsxs("strong", {
                  style: {
                    color: l > 120 ? "#f43f5e" : "#0ea5e9"
                  },
                  children: [l, "m"]
                })]
              })]
            }), u.jsxs("div", {
              children: [u.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "3px"
                },
                children: [u.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#f43f5e"
                  },
                  children: ["\u{1F534} L1: ", i, "  \u{1F7E0} L2: ", r]
                }), u.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#10b981"
                  },
                  children: ["\u{1F7E1} L3: ", t, "  \u{1F7E2} L4-5: ", Math.max(0, a)]
                })]
              }), u.jsxs("div", {
                style: {
                  height: "6px",
                  borderRadius: "99px",
                  overflow: "hidden",
                  background: "rgba(148,163,184,.12)",
                  display: "flex",
                  gap: "2px"
                },
                children: [i > 0 && u.jsx("div", {
                  style: {
                    flex: i,
                    background: "#f43f5e",
                    borderRadius: "99px",
                    transition: "flex 0.8s ease"
                  }
                }), r > 0 && u.jsx("div", {
                  style: {
                    flex: r,
                    background: "#f59e0b",
                    borderRadius: "99px",
                    transition: "flex 0.8s ease"
                  }
                }), t > 0 && u.jsx("div", {
                  style: {
                    flex: t,
                    background: "#eab308",
                    borderRadius: "99px",
                    transition: "flex 0.8s ease"
                  }
                }), a > 0 && u.jsx("div", {
                  style: {
                    flex: Math.max(0, a),
                    background: "#10b981",
                    borderRadius: "99px",
                    transition: "flex 0.8s ease"
                  }
                })]
              })]
            })]
          })
        })()]
      })
    }), u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px"
      },
      children: [u.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #f43f5e, #8b5cf6)",
          borderRadius: "99px"
        }
      }), u.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "\u{1FA7A} \u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 (On-Duty)"
      }), u.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(244,63,94,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP Activity Logs"
      })]
    }), u.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "12px"
      },
      children: [u.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        },
        children: [u.jsxs("div", {
          style: {
            padding: "12px 16px",
            background: "rgba(244,63,94,.05)",
            borderBottom: "1px solid rgba(244,63,94,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [u.jsx("span", {
              style: {
                fontSize: "18px"
              },
              children: "\u{1F468}\u200D\u2695\uFE0F"
            }), u.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "#f43f5e"
              },
              children: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E40\u0E27\u0E23 (ER)"
            })]
          }), u.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#f43f5e",
              opacity: .8
            },
            children: d?.on_duty?.doctors?.length || 0
          })]
        }), u.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: v.erAnalytics ? Array(3).fill(0).map((E, i) => u.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "12px"
            }
          }, i)) : d?.on_duty?.doctors?.length > 0 ? d.on_duty.doctors.map((E, i) => u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "12px",
              borderBottom: "1px solid rgba(0,0,0,0.03)"
            },
            children: [u.jsx("div", {
              style: {
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #f43f5e, #fb7185)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: (E.staff_name || "").substring(0, 2).replace(/[นพ]\./, "").trim() || "D"
            }), u.jsxs("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: [u.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--md-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                },
                children: E.staff_name || "Unknown"
              }), u.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "ER Physician"
              })]
            }), u.jsxs("div", {
              style: {
                textAlign: "right"
              },
              children: [u.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 900,
                  color: "#f43f5e"
                },
                children: E.total_count
              }), u.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "\u0E40\u0E04\u0E2A"
              })]
            })]
          }, i)) : u.jsx("div", {
            style: {
              padding: "1rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: u.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
            })
          })
        })]
      }), u.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        },
        children: [u.jsxs("div", {
          style: {
            padding: "12px 16px",
            background: "rgba(124,58,237,.05)",
            borderBottom: "1px solid rgba(124,58,237,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [u.jsx("span", {
              style: {
                fontSize: "18px"
              },
              children: "\u{1F469}\u200D\u2695\uFE0F"
            }), u.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "#8b5cf6"
              },
              children: "\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19 (ER)"
            })]
          }), u.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#8b5cf6",
              opacity: .8
            },
            children: d?.on_duty?.nurses?.length || 0
          })]
        }), u.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: v.erAnalytics ? Array(3).fill(0).map((E, i) => u.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "12px"
            }
          }, i)) : d?.on_duty?.nurses?.length > 0 ? d.on_duty.nurses.map((E, i) => {
            const r = new Date().getHours(),
              t = r < 12 && E.morning_count > 0 || r >= 12 && r < 17 && E.afternoon_count > 0 || r >= 17 && E.night_count > 0;
            return u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "12px",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              children: [u.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: t ? "linear-gradient(135deg, #8b5cf6, #8b5cf6)" : "rgba(0,0,0,0.05)",
                  color: t ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [E.staff_name?.substring(0, 1) || "N", t && u.jsx("span", {
                  style: {
                    position: "absolute",
                    bottom: "-1px",
                    right: "-1px",
                    width: "8px",
                    height: "8px",
                    background: "#2dce89",
                    border: "1.5px solid #fff",
                    borderRadius: "50%"
                  }
                })]
              }), u.jsxs("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--md-text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  children: E.staff_name
                }), u.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "3px",
                    marginTop: "3px"
                  },
                  children: [u.jsxs("span", {
                    title: "\u0E40\u0E0A\u0E49\u0E32",
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: E.morning_count > 0 ? "#8b5cf6" : "#ccc"
                    },
                    children: ["\u{1F305}", E.morning_count || 0]
                  }), u.jsxs("span", {
                    title: "\u0E1A\u0E48\u0E32\u0E22",
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: E.afternoon_count > 0 ? "#fb6340" : "#ccc"
                    },
                    children: ["\u2600\uFE0F", E.afternoon_count || 0]
                  }), u.jsxs("span", {
                    title: "\u0E14\u0E36\u0E01",
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: E.night_count > 0 ? "#1e293b" : "#ccc"
                    },
                    children: ["\u{1F319}", E.night_count || 0]
                  })]
                })]
              }), u.jsxs("div", {
                style: {
                  textAlign: "right"
                },
                children: [u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 900,
                    color: "#8b5cf6"
                  },
                  children: E.total_count
                }), u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "\u0E07\u0E32\u0E19"
                })]
              })]
            }, i)
          }) : u.jsx("div", {
            style: {
              padding: "1rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: u.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
            })
          })
        })]
      }), u.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        },
        children: [u.jsxs("div", {
          style: {
            padding: "12px 16px",
            background: "rgba(14,165,233,.05)",
            borderBottom: "1px solid rgba(14,165,233,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [u.jsx("span", {
              style: {
                fontSize: "18px"
              },
              children: "\u{1F3E2}"
            }), u.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "#0ea5e9"
              },
              children: "\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E2A\u0E19\u0E31\u0E1A\u0E2A\u0E19\u0E38\u0E19 (ER)"
            })]
          }), u.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#0ea5e9",
              opacity: .8
            },
            children: d?.on_duty?.staff?.length || 0
          })]
        }), u.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: v.erAnalytics ? Array(3).fill(0).map((E, i) => u.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "12px"
            }
          }, i)) : d?.on_duty?.staff?.length > 0 ? d.on_duty.staff.map((E, i) => {
            const r = new Date().getHours(),
              t = r < 12 && E.morning_count > 0 || r >= 12 && r < 17 && E.afternoon_count > 0 || r >= 17 && E.night_count > 0;
            return u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "12px",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              children: [u.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: t ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "rgba(0,0,0,0.05)",
                  color: t ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [E.staff_name?.substring(0, 1) || "S", t && u.jsx("span", {
                  style: {
                    position: "absolute",
                    bottom: "-1px",
                    right: "-1px",
                    width: "8px",
                    height: "8px",
                    background: "#2dce89",
                    border: "1.5px solid #fff",
                    borderRadius: "50%"
                  }
                })]
              }), u.jsxs("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--md-text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  children: E.staff_name
                }), u.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "3px",
                    marginTop: "3px"
                  },
                  children: [u.jsxs("span", {
                    title: "\u0E40\u0E0A\u0E49\u0E32",
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: E.morning_count > 0 ? "#0ea5e9" : "#ccc"
                    },
                    children: ["\u{1F305}", E.morning_count || 0]
                  }), u.jsxs("span", {
                    title: "\u0E1A\u0E48\u0E32\u0E22",
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: E.afternoon_count > 0 ? "#fb6340" : "#ccc"
                    },
                    children: ["\u2600\uFE0F", E.afternoon_count || 0]
                  }), u.jsxs("span", {
                    title: "\u0E14\u0E36\u0E01",
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: E.night_count > 0 ? "#1e293b" : "#ccc"
                    },
                    children: ["\u{1F319}", E.night_count || 0]
                  })]
                })]
              }), u.jsxs("div", {
                style: {
                  textAlign: "right"
                },
                children: [u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 900,
                    color: "#0ea5e9"
                  },
                  children: E.total_count
                }), u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "\u0E07\u0E32\u0E19"
                })]
              })]
            }, i)
          }) : u.jsx("div", {
            style: {
              padding: "1rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: u.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
            })
          })
        })]
      })]
    }), d && (() => {
      const E = d || {},
        i = E.avg_time_to_doctor ?? 0,
        r = E.p90_time_to_doctor ?? 0,
        t = E.lwbs_rate ?? 0,
        a = E.sla_pass_rate ?? 0,
        l = E.return_visit_rate ?? 0,
        o = E.epi ?? 0,
        p = E.return_48h_rate ?? 0,
        A = E.triage_accuracy?.over_triage_pct ?? 0,
        b = E.triage_accuracy?.under_triage_pct ?? 0,
        f = E.time_to_refer?.l12_within_30m_pct ?? 0,
        j = E.time_to_refer?.l12_total ?? 0,
        z = E.time_to_refer?.l12_within_30m ?? 0,
        F = E.ed_los?.within_4hr_pct ?? 0,
        y = E.ed_los?.avg_los_min ?? 0,
        S = E.door_to_ct?.total ?? 0,
        R0 = E.door_to_ct?.avg_min ?? 0,
        k0 = E.door_to_ct?.within_25m ?? 0,
        Q = E.door_to_ct?.within_25m_pct ?? 0,
        X = E.ed_mortality?.rate_pct ?? 0,
        T0 = E.ed_mortality?.within_24h_count ?? 0,
        U = E.stemi_bundle?.overall_bundle_pct ?? 0,
        W = E.stemi_bundle?.total_cases_365d ?? 0,
        z0 = E.stemi_bundle?.asa_pct ?? 0,
        F0 = E.stemi_bundle?.clopidogrel_pct ?? 0,
        u0 = E.stemi_bundle?.statin_pct ?? 0,
        D = E.refer_breakdown || {
          total: 0,
          time_critical_pct: 0,
          by_level: []
        },
        $ = E.repeat_er_28d?.rate_pct ?? 0,
        W0 = E.repeat_er_28d?.same_dx_count ?? 0,
        $0 = E.avg_time_to_doctor_valid_only ?? 0,
        h0 = E.valid_ttd_count ?? 0,
        E0 = (R?.fields || []).find(e => e.id === "ttd_validity")?.compliance_pct ?? null,
        L = E0 !== null && E0 < 50,
        J = L ? `\u26A0\uFE0F Data Quality \u0E15\u0E48\u0E33 (TTD \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E41\u0E22\u0E01\u0E02\u0E31\u0E49\u0E19\u0E15\u0E2D\u0E19\u0E40\u0E1E\u0E35\u0E22\u0E07 ${E0}%) \u2014 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E19\u0E35\u0E49\u0E22\u0E31\u0E07\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 \u0E14\u0E39 Data Quality Monitor` : null,
        e0 = new Date().toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short"
        }),
        t0 = (e, s, x, T, l0) => u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0 12px",
            paddingBottom: "10px",
            borderBottom: `1px solid ${e}20`
          },
          children: [u.jsx("div", {
            style: {
              width: "4px",
              height: "32px",
              background: e,
              borderRadius: "99px"
            }
          }), u.jsx("span", {
            style: {
              fontSize: "22px"
            },
            children: s
          }), u.jsxs("div", {
            style: {
              flex: 1
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "14px",
                fontWeight: 900,
                color: "var(--md-text-primary)",
                letterSpacing: "-0.01em"
              },
              children: x
            }), u.jsx("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                marginTop: "2px"
              },
              children: T
            })]
          }), u.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: e,
              background: `${e}15`,
              padding: "5px 12px",
              borderRadius: "99px",
              whiteSpace: "nowrap"
            },
            children: l0
          })]
        }),
        k = [{
          label: "Door-to-Doctor",
          tier: 1,
          thLabel: "\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
          value: `${i} min`,
          color: L ? "#94a3b8" : i <= 10 ? "#10b981" : i <= 20 ? "#f59e0b" : "#ef4444",
          icon: "\u23F1\uFE0F",
          sub: h0 > 0 ? `\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E04\u0E2A\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E41\u0E22\u0E01: ${$0} min (${h0} \u0E40\u0E04\u0E2A)` : null,
          desc: `P90: ${r} min | \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22: ${i} min`,
          meaning: "\u0E40\u0E27\u0E25\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E02\u0E49\u0E32\u0E1B\u0E23\u0E30\u0E15\u0E39 ER \u0E08\u0E19\u0E16\u0E36\u0E07\u0E44\u0E14\u0E49\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C \u0E22\u0E34\u0E48\u0E07\u0E19\u0E49\u0E2D\u0E22\u0E22\u0E34\u0E48\u0E07\u0E14\u0E35 \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Deterioration",
          calc: "AVG(doctor_seen_time \u2212 enter_er_time) [minutes]",
          dataSource: "er_regist + er_nursing_detail (HOSxP XE)",
          period: `\u{1F4C5} \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${e0}`,
          target: "\u2264 10 min (L1-2) / \u2264 30 min (L3)",
          benchmark: "JCI: \u226410m (Resus) | \u0E2A\u0E1B\u0E2A\u0E0A.: \u226430m",
          aiTip: J || (i <= 15 ? "\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E23\u0E47\u0E27" : "\u0E0A\u0E49\u0E32\u0E01\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Boarding \u0E41\u0E25\u0E30 Fast-track")
        }, {
          label: "LWBS Rate",
          tier: 2,
          thLabel: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E2D\u0E2D\u0E01\u0E01\u0E48\u0E2D\u0E19\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C",
          value: `${t}%`,
          color: L ? "#94a3b8" : t <= 2 ? "#10b981" : t <= 5 ? "#f59e0b" : "#ef4444",
          icon: "\u{1F6B6}",
          desc: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E2D\u0E2D\u0E01\u0E01\u0E48\u0E2D\u0E19\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08 (LWBS)",
          meaning: "Left Without Being Seen \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2D\u0E2D\u0E01\u0E01\u0E48\u0E2D\u0E19\u0E15\u0E23\u0E27\u0E08 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E1E\u0E36\u0E07\u0E1E\u0E2D\u0E43\u0E08\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
          calc: "(LWBS Patients \xF7 Total ER Visits) \xD7 100",
          dataSource: "er_regist + ovst (HOSxP XE)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2264 2%",
          benchmark: "ACEP: \u22642% | \u0E2A\u0E1B\u0E2A\u0E0A.: \u22645%",
          aiTip: J || (t <= 2 ? "LWBS \u0E15\u0E48\u0E33 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E1E\u0E36\u0E07\u0E1E\u0E2D\u0E43\u0E08" : "\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19 \u2014 \u0E08\u0E31\u0E14 Re-assessment \u0E17\u0E38\u0E01 20 \u0E19\u0E32\u0E17\u0E35")
        }, {
          label: "Triage SLA",
          tier: 1,
          thLabel: "\u0E04\u0E27\u0E32\u0E21\u0E15\u0E23\u0E07\u0E40\u0E27\u0E25\u0E32 Triage",
          value: `${a}%`,
          color: L ? "#94a3b8" : a >= 85 ? "#10b981" : a >= 70 ? "#f59e0b" : "#ef4444",
          icon: "\u2705",
          desc: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E15\u0E32\u0E21\u0E23\u0E30\u0E14\u0E31\u0E1A Triage \u0E15\u0E23\u0E07\u0E40\u0E27\u0E25\u0E32",
          meaning: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E20\u0E32\u0E22\u0E43\u0E19\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E15\u0E32\u0E21\u0E23\u0E30\u0E14\u0E31\u0E1A Triage (L1: \u0E17\u0E31\u0E19\u0E17\u0E35, L2: \u226415m, L3: \u226430m)",
          calc: "(Cases within SLA \xF7 Total Cases) \xD7 100 [\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21 Triage Level]",
          dataSource: "er_regist + er_nursing_detail (HOSxP XE)",
          period: `\u{1F4C5} \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${e0}`,
          target: "\u2265 85%",
          benchmark: "JCI: \u226590% | HA: \u226585%",
          aiTip: J || (a >= 85 ? "SLA \u0E14\u0E35 \u2014 \u0E23\u0E31\u0E01\u0E29\u0E32\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E" : "\u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E1E\u0E35\u0E04")
        }, {
          label: "Return Visit 72h",
          tier: 2,
          thLabel: "\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E20\u0E32\u0E22\u0E43\u0E19 72 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
          value: `${l}%`,
          color: l <= 3 ? "#10b981" : l <= 5 ? "#f59e0b" : "#ef4444",
          icon: "\u{1F504}",
          desc: `\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33 ${l}% \u0E08\u0E32\u0E01 ER \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`,
          meaning: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 ER \u0E20\u0E32\u0E22\u0E43\u0E19 72 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E15\u0E49\u0E19",
          calc: "(Return Visits 72h \xF7 Total Discharges) \xD7 100",
          dataSource: "er_regist (HOSxP XE)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2264 3%",
          benchmark: "ACEP: \u22643% | HA: \u22645%",
          aiTip: l <= 3 ? "\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E14\u0E35" : "\u0E2A\u0E39\u0E07 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Discharge Criteria"
        }, {
          label: "EPI Score",
          tier: 3,
          thLabel: "\u0E14\u0E31\u0E0A\u0E19\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E ER",
          value: `${o}/100`,
          color: L ? "#94a3b8" : o >= 80 ? "#10b981" : o >= 60 ? "#f59e0b" : "#ef4444",
          icon: "\u{1F9E0}",
          sub: o >= 80 ? "\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : o >= 60 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07",
          desc: "ER Performance Index \u2014 \u0E04\u0E30\u0E41\u0E19\u0E19 AI \u0E23\u0E27\u0E21",
          meaning: "\u0E04\u0E30\u0E41\u0E19\u0E19\u0E23\u0E27\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E ER \u0E08\u0E32\u0E01 AI \u0E16\u0E48\u0E27\u0E07\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 Time-to-Doc, SLA, LWBS, Return Visit",
          calc: "SLA\xD730% + (100\u2212LWBS%)\xD720% + TTD_Score\xD730% + (100\u2212Return%)\xD720%",
          dataSource: "\u0E04\u0E33\u0E19\u0E27\u0E13\u0E08\u0E32\u0E01 KPI 1-4 (Composite)",
          period: `\u{1F4C5} \u0E1B\u0E23\u0E30\u0E21\u0E27\u0E25\u0E1C\u0E25 ${e0}`,
          target: "\u2265 80",
          benchmark: "BCH Internal: \u226580 = \u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21",
          aiTip: J || (o >= 80 ? "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 \u2014 \u0E14\u0E39 KPI \u0E17\u0E35\u0E48\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14")
        }, {
          label: "Re-visit 48h",
          tier: 2,
          thLabel: "\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33 48 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
          value: `${p}%`,
          color: p <= 3 ? "#10b981" : p <= 5 ? "#f59e0b" : "#ef4444",
          icon: "\u23F0",
          desc: `\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 ER \u0E20\u0E32\u0E22\u0E43\u0E19 48 \u0E0A\u0E21. ${p}%`,
          meaning: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 ER \u0E20\u0E32\u0E22\u0E43\u0E19 48 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07 \u2014 \u0E40\u0E01\u0E13\u0E11\u0E4C\u0E2B\u0E25\u0E31\u0E01\u0E02\u0E2D\u0E07 \u0E2A\u0E18. \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E1A\u0E37\u0E49\u0E2D\u0E07\u0E15\u0E49\u0E19",
          calc: "(Return \u226448h \xF7 Total ER Visits) \xD7 100",
          dataSource: "er_regist + ovst (HOSxP XE)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2264 3%",
          benchmark: "MoPH ECS: \u22643% | HA: \u22645%",
          aiTip: p <= 3 ? "\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E2A\u0E18." : "\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Discharge Criteria \u0E41\u0E25\u0E30 Follow-up Plan"
        }, {
          label: "Triage Accuracy",
          tier: 1,
          thLabel: "\u0E04\u0E27\u0E32\u0E21\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07",
          value: `${A}% / ${b}%`,
          color: A <= 15 && b <= 5 ? "#10b981" : b > 5 ? "#ef4444" : "#f59e0b",
          icon: "\u{1F3AF}",
          sub: "Over / Under",
          desc: `Over: ${A}% (L1-2 \u0E44\u0E21\u0E48\u0E27\u0E34\u0E01\u0E24\u0E15) \xB7 Under: ${b}% (L4-5 \u0E01\u0E25\u0E31\u0E1A\u0E27\u0E34\u0E01\u0E24\u0E15)`,
          meaning: "Over-triage = L1-2 \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 admit/refer (\u0E04\u0E31\u0E14\u0E40\u0E02\u0E49\u0E21\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B) \xB7 Under-triage = L4-5 \u0E17\u0E35\u0E48\u0E25\u0E07\u0E40\u0E2D\u0E22 admit/refer (\u0E1E\u0E25\u0E32\u0E14\u0E40\u0E04\u0E2A\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07)",
          calc: "Over: % L1-2 \u0E44\u0E21\u0E48\u0E21\u0E35 critical outcome \xB7 Under: % L4-5 \u0E21\u0E35 critical outcome",
          dataSource: "er_regist + an_stat + referout (HOSxP XE)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "Over \u2264 15% \xB7 Under \u2264 5%",
          benchmark: "MoPH ECS Service Plan",
          aiTip: b > 5 ? "\u26A0\uFE0F Under-triage \u0E2A\u0E39\u0E07 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 L4-5 \u0E2D\u0E32\u0E08 deteriorate, \u0E17\u0E1A\u0E17\u0E27\u0E19 Triage Protocol" : A > 15 ? "Over-triage \u0E2A\u0E39\u0E07 \u2014 \u0E2A\u0E34\u0E49\u0E19\u0E40\u0E1B\u0E25\u0E37\u0E2D\u0E07\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 Resus" : "\u0E01\u0E32\u0E23 Triage \u0E41\u0E21\u0E48\u0E19\u0E22\u0E33\u0E15\u0E32\u0E21\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19"
        }, {
          label: "L1-2 Refer \u226430m",
          tier: 1,
          thLabel: "\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E27\u0E34\u0E01\u0E24\u0E15\u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E19\u0E32\u0E17\u0E35",
          value: `${f}%`,
          color: j < 3 ? "#94a3b8" : f >= 90 ? "#10b981" : f >= 70 ? "#f59e0b" : "#ef4444",
          icon: "\u{1F6A8}",
          sub: j < 3 ? "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E19\u0E49\u0E2D\u0E22" : `${z}/${j} \u0E23\u0E32\u0E22`,
          desc: "L1-2 (Resus/Emergency) \u0E17\u0E35\u0E48 refer call \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E19\u0E32\u0E17\u0E35",
          meaning: "\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E02\u0E49\u0E32 ER \u0E16\u0E36\u0E07\u0E42\u0E17\u0E23\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 Refer (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Time-critical patient) \u2014 \u0E40\u0E01\u0E13\u0E11\u0E4C \u0E23\u0E1E\u0E0A. F2",
          calc: "(L1-2 Refers \u226430m \xF7 Total L1-2 Refers) \xD7 100",
          dataSource: "er_regist + referout (HOSxP XE)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2265 90%",
          benchmark: "MoPH ECS F2: \u226590%",
          aiTip: j < 3 ? `${j} \u0E23\u0E32\u0E22 \u2014 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E19\u0E49\u0E2D\u0E22 \u0E14\u0E39\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E44\u0E14\u0E49\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19` : f >= 90 ? "\u0E23\u0E30\u0E1A\u0E1A Refer Time-Critical \u0E44\u0E14\u0E49\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : "\u0E0A\u0E49\u0E32\u0E01\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 STEMI/Stroke Pathway \u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E35\u0E21 Refer"
        }, {
          label: "ED LOS \u22644hr",
          tier: 1,
          thLabel: "\u0E40\u0E27\u0E25\u0E32\u0E23\u0E27\u0E21\u0E43\u0E19 ER \u2264 4 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
          value: `${F}%`,
          color: F >= 90 ? "#10b981" : F >= 75 ? "#f59e0b" : "#ef4444",
          icon: "\u23F3",
          sub: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${y} \u0E19\u0E32\u0E17\u0E35`,
          desc: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 ER \u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 4 \u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07",
          meaning: "ED Length of Stay \u2014 \u0E40\u0E27\u0E25\u0E32\u0E23\u0E27\u0E21\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22/Admit/Refer (\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C)",
          calc: "(Visits \u2264240m \xF7 Total visits with doctor) \xD7 100",
          dataSource: "er_regist (doctor_tx_time IS NOT NULL)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2265 90%",
          benchmark: "MoPH ECS: \u226590%",
          aiTip: F >= 90 ? "Throughput \u0E1C\u0E48\u0E32\u0E19\u0E40\u0E1B\u0E49\u0E32" : "\u0E21\u0E35 Patient Boarding \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A IPD bed availability"
        }, {
          label: "Door-to-CT \u226425m",
          tier: 1,
          thLabel: "Stroke FT \u2014 CT \u0E20\u0E32\u0E22\u0E43\u0E19 25 \u0E19\u0E32\u0E17\u0E35",
          value: S < 3 ? "N too low" : `${Q}%`,
          color: S < 3 ? "#94a3b8" : Q >= 80 ? "#10b981" : Q >= 60 ? "#f59e0b" : "#ef4444",
          icon: "\u{1F9E0}",
          sub: S < 3 ? `${S} \u0E40\u0E04\u0E2A` : `${k0}/${S} \xB7 avg ${R0}m`,
          desc: "CT Brain Request \u0E20\u0E32\u0E22\u0E43\u0E19 25 \u0E19\u0E32\u0E17\u0E35 (Stroke Fast Track)",
          meaning: "\u0E40\u0E27\u0E25\u0E32\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E16\u0E36\u0E07 ER \u2192 \u0E02\u0E2D CT Brain \u2014 \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 Stroke Service Plan",
          calc: "(CT Brain orders \u226425m from arrival \xF7 Total) \xD7 100",
          dataSource: "er_regist + xray_report (codes 234, 235)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2264 25 \u0E19\u0E32\u0E17\u0E35, \u2265 80% pass",
          benchmark: "MoPH Stroke FT: \u226425 \u0E19\u0E32\u0E17\u0E35",
          aiTip: S < 3 ? `${S} \u0E40\u0E04\u0E2A \u2014 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E19\u0E49\u0E2D\u0E22\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A benchmark` : Q >= 80 ? "Pathway \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E40\u0E1B\u0E49\u0E32" : "\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E07\u0E32\u0E19\u0E17\u0E35\u0E21 X-ray + \u0E04\u0E27\u0E32\u0E21\u0E1E\u0E23\u0E49\u0E2D\u0E21 Radiologist"
        }, {
          label: "ED Mortality",
          tier: 2,
          thLabel: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E43\u0E19 ER",
          value: `${X}%`,
          color: X <= .5 ? "#10b981" : X <= 1 ? "#f59e0b" : "#ef4444",
          icon: "\u26B0\uFE0F",
          sub: `${T0} \u0E23\u0E32\u0E22 (90 \u0E27\u0E31\u0E19)`,
          desc: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E43\u0E19\u0E27\u0E31\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19/24 \u0E0A\u0E21. \u0E2B\u0E25\u0E31\u0E07\u0E40\u0E02\u0E49\u0E32 ER",
          meaning: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E17\u0E35\u0E48 ER \u0E20\u0E32\u0E22\u0E43\u0E19 24 \u0E0A\u0E21. \u2014 KPI \u0E2B\u0E25\u0E31\u0E01\u0E14\u0E49\u0E32\u0E19 Patient Safety \u0E15\u0E32\u0E21 \u0E2A\u0E18.",
          calc: "(\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 ER \u0E17\u0E35\u0E48\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E20\u0E32\u0E22\u0E43\u0E19 24 \u0E0A\u0E21. \xF7 Total ER Visits) \xD7 100",
          dataSource: "er_regist + patient.deathday (HOSxP XE)",
          period: "\u{1F4C5} 90 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2264 0.5%",
          benchmark: "MoPH ECS: \u2264 0.5% (\u0E23\u0E1E\u0E0A.)",
          aiTip: X <= .5 ? "\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C Patient Safety" : "\u0E17\u0E1A\u0E17\u0E27\u0E19 Critical Care Pathway + \u0E23\u0E30\u0E1A\u0E1A Resuscitation"
        }, {
          label: "STEMI Pre-Refer Bundle",
          tier: 2,
          thLabel: "\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E01\u0E48\u0E2D\u0E19 Refer \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 STEMI",
          value: W > 0 ? `${U}%` : "N too low",
          color: W < 5 ? "#94a3b8" : U >= 95 ? "#10b981" : U >= 75 ? "#f59e0b" : "#ef4444",
          icon: "\u{1FAC0}",
          sub: `STEMI ${W} \u0E40\u0E04\u0E2A (365\u0E27\u0E31\u0E19)`,
          extra: W > 0 ? u.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "8px"
            },
            children: [{
              name: "ASA",
              val: z0
            }, {
              name: "Clopidogrel",
              val: F0
            }, {
              name: "Statin",
              val: u0
            }].map((e, s) => {
              const x = e.val >= 95 ? "#10b981" : e.val >= 70 ? "#f59e0b" : "#ef4444";
              return u.jsxs("div", {
                style: {
                  padding: "10px 8px",
                  borderRadius: "12px",
                  background: `${x}08`,
                  border: `1px solid ${x}25`,
                  textAlign: "center"
                },
                children: [u.jsx("div", {
                  style: {
                    fontSize: "18px",
                    fontWeight: 900,
                    color: x,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums"
                  },
                  children: `${e.val}%`
                }), u.jsx("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    marginTop: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em"
                  },
                  children: e.name
                }), u.jsx("div", {
                  style: {
                    marginTop: "6px",
                    height: "4px",
                    borderRadius: "99px",
                    background: `${x}15`,
                    overflow: "hidden"
                  },
                  children: u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${Math.min(100,e.val)}%`,
                      background: x,
                      borderRadius: "99px"
                    }
                  })
                })]
              }, s)
            })
          }) : null,
          desc: "Bundle ASA + Clopidogrel + Statin \u0E01\u0E48\u0E2D\u0E19 refer (Cardiac Pathway)",
          meaning: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 STEMI (ICD-10 I21.x) \u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E04\u0E23\u0E1A ASA + Clopidogrel + Statin \u0E01\u0E48\u0E2D\u0E19\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D \u2014 \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 Cardiac Pathway",
          calc: "\u0E23\u0E27\u0E21\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 3 \u0E2D\u0E07\u0E04\u0E4C\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A: % \u0E44\u0E14\u0E49 ASA + % \u0E44\u0E14\u0E49 Clopidogrel + % \u0E44\u0E14\u0E49 Statin \xF7 3",
          dataSource: "er_regist + ovstdiag (I21) + opitemrece (HOSxP XE)",
          period: "\u{1F4C5} 365 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2265 95% \u0E17\u0E38\u0E01\u0E2D\u0E07\u0E04\u0E4C\u0E1B\u0E23\u0E30\u0E01\u0E2D\u0E1A",
          benchmark: "MoPH Cardiac Service Plan",
          aiTip: W < 5 ? `${W} \u0E40\u0E04\u0E2A STEMI \u2014 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E19\u0E49\u0E2D\u0E22\u0E40\u0E01\u0E34\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A benchmark` : u0 < 50 ? `\u26A0\uFE0F Statin \u0E15\u0E48\u0E33 ${u0}% \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 STEMI checklist \u0E01\u0E48\u0E2D\u0E19 refer` : U >= 95 ? "Bundle \u0E04\u0E23\u0E1A\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : "\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 Bundle compliance \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Pathway"
        }, {
          label: "Refer-out by \u0E23\u0E30\u0E14\u0E31\u0E1A",
          tier: 3,
          thLabel: "\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E23\u0E30\u0E14\u0E31\u0E1A ECS",
          value: `${D.time_critical_pct}%`,
          color: "#8b5cf6",
          icon: "\u{1F4E4}",
          sub: `\u0E23\u0E27\u0E21 ${D.total} \u0E23\u0E32\u0E22 \xB7 TC ${D.time_critical_count}`,
          extra: D.total > 0 ? (() => {
            const e = {
              1: "#f43f5e",
              2: "#f59e0b",
              3: "#eab308",
              4: "#10b981",
              5: "#94a3b8"
            };
            return u.jsxs("div", {
              children: [u.jsx("div", {
                style: {
                  display: "flex",
                  height: "10px",
                  borderRadius: "99px",
                  overflow: "hidden",
                  background: "rgba(148,163,184,.12)"
                },
                children: (D.by_level || []).map((s, x) => u.jsx("div", {
                  style: {
                    flex: s.count,
                    background: e[s.type_id] || "#94a3b8",
                    transition: "flex 0.6s ease"
                  },
                  title: `L${s.type_id} ${s.name_th}: ${s.count} \u0E23\u0E32\u0E22 (${s.pct}%)`
                }, x))
              }), u.jsx("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  gap: "4px"
                },
                children: (D.by_level || []).map((s, x) => u.jsxs("div", {
                  style: {
                    flex: 1,
                    textAlign: "center",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: e[s.type_id] || "#94a3b8"
                  },
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900
                    },
                    children: s.count
                  }), u.jsx("div", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      marginTop: "2px",
                      color: "var(--md-text-tertiary)",
                      textTransform: "uppercase"
                    },
                    children: `L${s.type_id}`
                  })]
                }, x))
              })]
            })
          })() : null,
          desc: "\u0E01\u0E32\u0E23 Refer \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21 MoPH ECS 5 \u0E23\u0E30\u0E14\u0E31\u0E1A (Life-threatening \u2192 Non-acute)",
          meaning: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E01\u0E32\u0E23 Refer \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E15\u0E32\u0E21\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19 MoPH ECS \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E02\u0E35\u0E14\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16 \u0E23\u0E1E.",
          calc: "% Time-critical (L1+L2) \u0E08\u0E32\u0E01 Total Refer \xB7 " + (D.by_level || []).map(e => `L${e.type_id}: ${e.count}`).join(" \xB7 "),
          dataSource: "er_regist + referout + referout_emergency_type (HOSxP XE)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21",
          benchmark: "MoPH ECS 5 \u0E23\u0E30\u0E14\u0E31\u0E1A",
          aiTip: D.time_critical_pct > 40 ? `Time-critical ${D.time_critical_pct}% \u2014 \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E02\u0E35\u0E14\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16` : "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23 Refer \u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E15\u0E32\u0E21\u0E17\u0E35\u0E48\u0E04\u0E32\u0E14"
        }, {
          label: "Repeat ER 28d (\u0E42\u0E23\u0E04\u0E40\u0E14\u0E34\u0E21)",
          tier: 3,
          thLabel: "\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 ER \u0E20\u0E32\u0E22\u0E43\u0E19 28 \u0E27\u0E31\u0E19 \u0E42\u0E23\u0E04\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19",
          value: `${$}%`,
          color: $ <= 5 ? "#10b981" : $ <= 10 ? "#f59e0b" : "#ef4444",
          icon: "\u{1F501}",
          sub: `${W0} \u0E23\u0E32\u0E22`,
          desc: `\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E14\u0E49\u0E27\u0E22 ICD-10 \u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19\u0E20\u0E32\u0E22\u0E43\u0E19 28 \u0E27\u0E31\u0E19 ${$}%`,
          meaning: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 ER \u0E20\u0E32\u0E22\u0E43\u0E19 28 \u0E27\u0E31\u0E19\u0E14\u0E49\u0E27\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E40\u0E14\u0E34\u0E21 \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 + Discharge planning",
          calc: "(Repeat ER \u0E20\u0E32\u0E22\u0E43\u0E19 28 \u0E27\u0E31\u0E19 + ICD-10 chapter \u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19 \xF7 Total ER Visits) \xD7 100",
          dataSource: "er_regist + ovstdiag (HOSxP XE)",
          period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
          target: "\u2264 5% (\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21)",
          benchmark: "MoPH Quality (Chronic disease management)",
          aiTip: $ > 10 ? "\u{1F534} \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Discharge plan, Follow-up clinic, Chronic disease pathway" : $ > 5 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32 \u2014 \u0E14\u0E39\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E17\u0E35\u0E48\u0E01\u0E25\u0E31\u0E1A\u0E0B\u0E49\u0E33\u0E1A\u0E48\u0E2D\u0E22" : "\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C"
        }, (() => {
          const e = D0 || {},
            s = Number(e.response_count || 0),
            x = Number(e.avg_overall || 0),
            T = Number(e.satisfied_pct || 0),
            l0 = s === 0 ? "#94a3b8" : T >= 85 ? "#10b981" : T >= 70 ? "#f59e0b" : "#ef4444";
          return {
            label: "Patient Satisfaction",
            tier: 3,
            thLabel: "\u0E04\u0E27\u0E32\u0E21\u0E1E\u0E36\u0E07\u0E1E\u0E2D\u0E43\u0E08\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
            value: s > 0 ? `${x.toFixed(1)}/5` : "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1C\u0E25",
            color: l0,
            icon: "\u2B50",
            sub: s > 0 ? `${T}% \u0E1E\u0E2D\u0E43\u0E08 \xB7 ${s} \u0E1C\u0E25` : "\u0E23\u0E2D\u0E41\u0E2A\u0E01\u0E19 QR \u0E17\u0E35\u0E48\u0E08\u0E38\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            extra: s > 0 ? u.jsx("div", {
              style: {
                display: "flex",
                gap: "4px",
                alignItems: "flex-end",
                height: "44px"
              },
              children: [5, 4, 3, 2, 1].map(P => {
                const y0 = (e.distribution || []).find(d0 => d0.score === P),
                  o0 = y0 ? y0.count : 0,
                  V0 = Math.max(1, ...(e.distribution || []).map(d0 => d0.count)),
                  Q0 = o0 > 0 ? Math.max(8, o0 / V0 * 100) : 4,
                  b0 = P >= 4 ? "#10b981" : P === 3 ? "#f59e0b" : "#ef4444";
                return u.jsxs("div", {
                  style: {
                    flex: 1,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end"
                  },
                  children: [u.jsx("div", {
                    style: {
                      height: `${Q0}%`,
                      background: b0,
                      borderRadius: "4px 4px 0 0",
                      minHeight: "4px",
                      transition: "height 0.4s"
                    }
                  }), u.jsx("div", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: b0,
                      marginTop: "2px"
                    },
                    children: `${P}\u2605`
                  }), u.jsx("div", {
                    style: {
                      fontSize: "10px",
                      color: "var(--md-text-tertiary)",
                      fontWeight: 700
                    },
                    children: o0
                  })]
                }, P)
              })
            }) : null,
            desc: s > 0 ? `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E1E\u0E36\u0E07\u0E1E\u0E2D\u0E43\u0E08 ${T}% (${e.satisfied_count||0}/${s})` : '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1C\u0E25\u0E15\u0E2D\u0E1A\u0E23\u0E31\u0E1A \u2014 \u0E1E\u0E34\u0E21\u0E1E\u0E4C QR "/survey?dept=ER" \u0E15\u0E34\u0E14\u0E08\u0E38\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ER',
            meaning: "\u0E04\u0E30\u0E41\u0E19\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E08\u0E32\u0E01\u0E41\u0E1A\u0E1A\u0E2A\u0E2D\u0E1A\u0E16\u0E32\u0E21\u0E41\u0E2A\u0E01\u0E19 QR \u0E2B\u0E25\u0E31\u0E07\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01 ER (1-5 \u0E14\u0E32\u0E27) \u2014 \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 HA \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E43\u0E19\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
            calc: "AVG(overall_score) \xB7 % \u0E17\u0E35\u0E48\u0E43\u0E2B\u0E49 \u2265 4 \u0E14\u0E32\u0E27 = \u0E1E\u0E2D\u0E43\u0E08",
            dataSource: "dw_patient_satisfaction (warehouse SQLite)",
            period: "\u{1F4C5} 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07",
            target: "\u2265 85% \u0E1E\u0E2D\u0E43\u0E08",
            benchmark: "HA: \u2265 85% | \u0E2A\u0E23\u0E1E.: \u2265 80%",
            aiTip: s === 0 ? "\u0E1E\u0E34\u0E21\u0E1E\u0E4C QR code \u2192 /survey?dept=ER \u0E15\u0E34\u0E14\u0E17\u0E35\u0E48\u0E08\u0E38\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 real-time" : T >= 85 ? "\u0E04\u0E30\u0E41\u0E19\u0E19\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 \u0E23\u0E31\u0E01\u0E29\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E15\u0E48\u0E2D\u0E44\u0E1B" : "\u0E17\u0E1A\u0E17\u0E27\u0E19\u0E04\u0E33\u0E15\u0E34\u0E0A\u0E21 + \u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22\u0E17\u0E35\u0E48\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E04\u0E30\u0E41\u0E19\u0E19\u0E25\u0E14"
          }
        })()],
        w0 = k.filter(e => e.tier === 1),
        L0 = k.filter(e => e.tier === 2),
        I0 = k.filter(e => e.tier === 3),
        _ = e => e.color === "#94a3b8" || e.color === "#8b5cf6" ? "na" : e.color === "#10b981" || e.color === "#10b981" ? "pass" : e.color === "#f59e0b" ? "warn" : "fail",
        w = k.filter(e => _(e) !== "na"),
        i0 = w.filter(e => _(e) === "pass").length,
        r0 = w.filter(e => _(e) === "warn").length,
        m0 = w.filter(e => _(e) === "fail").length,
        I = w.length > 0 ? Math.round(i0 / w.length * 100) : 0,
        a0 = e => {
          const s = k.filter(x => x.tier === e && _(x) !== "na");
          return {
            pass: s.filter(x => _(x) === "pass").length,
            total: s.length
          }
        },
        P0 = a0(1),
        N0 = a0(2),
        H0 = a0(3),
        n0 = k.filter(e => _(e) === "fail").map(e => e.thLabel),
        M0 = n0[0] || (r0 > 0 ? k.filter(e => _(e) === "warn")[0]?.thLabel : "\u0E44\u0E21\u0E48\u0E21\u0E35"),
        G = I >= 80 ? "#10b981" : I >= 60 ? "#f59e0b" : "#ef4444",
        O0 = I >= 80 ? "\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : I >= 60 ? "\u0E1E\u0E2D\u0E43\u0E0A\u0E49" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07",
        K0 = u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "minmax(220px, 1.5fr) auto auto auto minmax(180px, 1fr)",
            gap: "20px",
            padding: "22px 26px",
            borderRadius: "16px",
            background: `linear-gradient(135deg, ${G}10 0%, rgba(124,58,237,.05) 100%)`,
            border: `1.5px solid ${G}25`,
            marginTop: "8px",
            marginBottom: "4px",
            alignItems: "center",
            boxShadow: `0 8px 24px -8px ${G}20`
          },
          children: [u.jsxs("div", {
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                fontWeight: 600,
                color: G,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              },
              children: ["\u{1F4CB}", "Compliance Summary"]
            }), u.jsx("div", {
              style: {
                fontSize: "18px",
                fontWeight: 900,
                color: "var(--md-text-primary)",
                marginTop: "4px",
                letterSpacing: "-0.01em"
              },
              children: `\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C ${i0}/${w.length} KPI (${I}%) \xB7 ${O0}`
            }), u.jsx("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 KPI ER \u0E15\u0E32\u0E21\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH ECS Service Plan \xB7 30 \u0E27\u0E31\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07"
            })]
          }), u.jsxs("div", {
            style: {
              textAlign: "center"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "24px",
                fontWeight: 900,
                color: "#10b981",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums"
              },
              children: i0
            }), u.jsxs("div", {
              style: {
                fontSize: "10px",
                color: "#10b981",
                fontWeight: 600,
                marginTop: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: ["\u2713 \u0E1C\u0E48\u0E32\u0E19"]
            })]
          }), u.jsxs("div", {
            style: {
              textAlign: "center"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "24px",
                fontWeight: 900,
                color: "#f59e0b",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums"
              },
              children: r0
            }), u.jsxs("div", {
              style: {
                fontSize: "10px",
                color: "#f59e0b",
                fontWeight: 600,
                marginTop: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: ["\u26A0 \u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07"]
            })]
          }), u.jsxs("div", {
            style: {
              textAlign: "center"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "24px",
                fontWeight: 900,
                color: "#ef4444",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums"
              },
              children: m0
            }), u.jsxs("div", {
              style: {
                fontSize: "10px",
                color: "#ef4444",
                fontWeight: 600,
                marginTop: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: ["\u2717 \u0E44\u0E21\u0E48\u0E1C\u0E48\u0E32\u0E19"]
            })]
          }), u.jsxs("div", {
            style: {
              textAlign: "right",
              borderLeft: "1px solid rgba(0,0,0,.08)",
              paddingLeft: "18px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "10px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em"
              },
              children: "\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E14\u0E48\u0E27\u0E19"
            }), u.jsx("div", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: m0 > 0 ? "#ef4444" : r0 > 0 ? "#f59e0b" : "#10b981",
                marginTop: "6px",
                lineHeight: 1.3
              },
              children: M0
            }), n0.length > 1 && u.jsx("div", {
              style: {
                fontSize: "10px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                marginTop: "2px"
              },
              children: `+ \u0E2D\u0E35\u0E01 ${n0.length-1} \u0E15\u0E31\u0E27`
            })]
          })]
        }),
        s0 = (e, s) => u.jsxs("span", {
          children: [u.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 900
            },
            children: `${e.pass}/${e.total}`
          }), u.jsx("span", {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              marginLeft: "4px",
              opacity: .8
            },
            children: "\u0E1C\u0E48\u0E32\u0E19"
          })]
        });
      return u.jsxs(u.Fragment, {
        children: [K0, t0("#f43f5e", "\u{1F6A8}", "Tier 1 \u2014 KPI \u0E27\u0E34\u0E01\u0E24\u0E15\u0E40\u0E27\u0E25\u0E32 (Time-Critical)", "\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E2A\u0E18./HA \xB7 \u0E1C\u0E39\u0E49\u0E15\u0E23\u0E27\u0E08\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23\u0E40\u0E02\u0E15\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E39", s0(P0, "#f43f5e")), u.jsx(x0, {
          kpis: w0
        }), t0("#f59e0b", "\u{1FA7A}", "Tier 2 \u2014 \u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 (Clinical Quality)", "\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22 \xB7 \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 Service Plan", s0(N0, "#f59e0b")), u.jsx(x0, {
          kpis: L0
        }), t0("#0ea5e9", "\u{1F4CA}", "Tier 3 \u2014 \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E07\u0E32\u0E19 (Operational)", "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E23\u0E30\u0E1A\u0E1A + \u0E14\u0E31\u0E0A\u0E19\u0E35\u0E23\u0E27\u0E21 \xB7 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21", s0(H0, "#0ea5e9")), u.jsx(x0, {
          kpis: I0
        })]
      })
    })(), R && Array.isArray(R.fields) && u.jsxs("div", {
      style: {
        marginTop: "8px"
      },
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "20px 0 12px",
          paddingBottom: "10px",
          borderBottom: "1px solid rgba(124,58,237,.20)"
        },
        children: [u.jsx("div", {
          style: {
            width: "4px",
            height: "32px",
            background: "#8b5cf6",
            borderRadius: "99px"
          }
        }), u.jsx("span", {
          style: {
            fontSize: "22px"
          },
          children: "\u{1F50D}"
        }), u.jsxs("div", {
          style: {
            flex: 1
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "14px",
              fontWeight: 900,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.01em"
            },
            children: "Data Quality Monitor \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E01\u0E32\u0E23\u0E01\u0E23\u0E2D\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
          }), u.jsx("div", {
            style: {
              fontSize: "11px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              marginTop: "2px"
            },
            children: "\u0E1F\u0E34\u0E25\u0E14\u0E4C HOSxP \u0E17\u0E35\u0E48\u0E21\u0E35\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E01\u0E23\u0E2D\u0E01 \u2014 \u0E40\u0E1B\u0E47\u0E19 KPI \u0E17\u0E35\u0E48 unlock \u0E44\u0E14\u0E49\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E17\u0E35\u0E21\u0E40\u0E23\u0E34\u0E48\u0E21\u0E01\u0E23\u0E2D\u0E01"
          })]
        }), u.jsx("span", {
          style: {
            fontSize: "11px",
            fontWeight: 600,
            color: "#8b5cf6",
            background: "rgba(124,58,237,.15)",
            padding: "5px 12px",
            borderRadius: "99px",
            whiteSpace: "nowrap"
          },
          children: `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${R.overall_compliance_pct||0}%`
        })]
      }), u.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "12px"
        },
        children: (R.fields || []).map((E, i) => {
          const r = E.compliance_pct >= E.target_pct,
            t = E.total === 0 ? "#94a3b8" : r ? "#10b981" : E.compliance_pct >= E.target_pct * .5 ? "#f59e0b" : "#ef4444";
          return u.jsxs("div", {
            className: "glass-card",
            style: {
              padding: "16px",
              borderLeft: `4px solid ${t}`,
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px"
              },
              children: [u.jsxs("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [u.jsx("div", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--md-text-primary)",
                    letterSpacing: "-0.01em"
                  },
                  children: E.name_th
                }), u.jsx("div", {
                  style: {
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600,
                    marginTop: "2px",
                    fontFamily: "'JetBrains Mono', monospace"
                  },
                  children: E.table
                })]
              }), u.jsxs("div", {
                style: {
                  textAlign: "right"
                },
                children: [u.jsx("div", {
                  style: {
                    fontSize: "24px",
                    fontWeight: 900,
                    color: t,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums"
                  },
                  children: `${E.compliance_pct}%`
                }), u.jsx("div", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    marginTop: "2px"
                  },
                  children: `${E.filled}/${E.total}`
                })]
              })]
            }), u.jsx("div", {
              style: {
                height: "6px",
                borderRadius: "99px",
                background: `${t}15`,
                overflow: "hidden"
              },
              children: u.jsx("div", {
                style: {
                  height: "100%",
                  width: `${Math.min(100,E.compliance_pct)}%`,
                  background: t,
                  borderRadius: "99px",
                  transition: "width 0.6s"
                }
              })
            }), u.jsxs("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                lineHeight: 1.5
              },
              children: [u.jsxs("div", {
                style: {
                  fontWeight: 600
                },
                children: [u.jsx("span", {
                  style: {
                    color: "#8b5cf6",
                    fontWeight: 600
                  },
                  children: "\u{1F465} "
                }), `\u0E1C\u0E39\u0E49\u0E01\u0E23\u0E2D\u0E01: ${E.who_fills}`]
              }), u.jsxs("div", {
                style: {
                  fontWeight: 600,
                  marginTop: "2px"
                },
                children: [u.jsx("span", {
                  style: {
                    color: "#0ea5e9",
                    fontWeight: 600
                  },
                  children: "\u{1F4FA} "
                }), E.hosxp_screen]
              }), u.jsxs("div", {
                style: {
                  fontWeight: 600,
                  marginTop: "2px"
                },
                children: [u.jsx("span", {
                  style: {
                    color: "#10b981",
                    fontWeight: 600
                  },
                  children: "\u{1F511} "
                }), `Unlock: ${E.unlocks_kpi}`]
              })]
            }), u.jsxs("div", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: t,
                background: `${t}08`,
                padding: "8px 10px",
                borderRadius: "8px",
                borderLeft: `2px solid ${t}`
              },
              children: [u.jsx("span", {
                children: "\u{1F4A1} Action: "
              }), E.action]
            })]
          }, i)
        })
      }), R.note && u.jsx("div", {
        style: {
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontStyle: "italic",
          marginTop: "8px",
          textAlign: "center"
        },
        children: R.note
      })]
    }), B && Array.isArray(B.series) && B.series.length > 0 && u.jsxs("div", {
      style: {
        marginTop: "20px"
      },
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "20px 0 12px",
          paddingBottom: "10px",
          borderBottom: "1px solid rgba(14,165,233,.20)"
        },
        children: [u.jsx("div", {
          style: {
            width: "4px",
            height: "32px",
            background: "#0ea5e9",
            borderRadius: "99px"
          }
        }), u.jsx("span", {
          style: {
            fontSize: "22px"
          },
          children: "\u{1F4C8}"
        }), u.jsxs("div", {
          style: {
            flex: 1
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "14px",
              fontWeight: 900,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.01em"
            },
            children: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21 12 \u0E40\u0E14\u0E37\u0E2D\u0E19 (KPI Trends)"
          }), u.jsx("div", {
            style: {
              fontSize: "11px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              marginTop: "2px"
            },
            children: `\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 ${B.months_window||12} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 \xB7 ${B.kpi_defs?.length||14} \u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14`
          })]
        }), u.jsx("span", {
          style: {
            fontSize: "11px",
            fontWeight: 600,
            color: "#0ea5e9",
            background: "rgba(14,165,233,.12)",
            padding: "5px 12px",
            borderRadius: "99px",
            whiteSpace: "nowrap"
          },
          children: `${B.kpi_defs?.length||14} KPI`
        })]
      }), u.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "12px"
        },
        children: (B.kpi_defs || []).map((E, i) => {
          const r = (B.series || []).map(z => ({
              month: (z.month || "").slice(5),
              value: Number(z[E.id] ?? 0)
            })),
            t = r[r.length - 1]?.value || 0,
            a = r[r.length - 2]?.value || 0,
            l = a > 0 ? Math.round((t - a) / a * 100) : a === 0 && t > 0 ? 100 : 0,
            o = l > 5 ? "\u2197" : l < -5 ? "\u2198" : "\u2192",
            p = E.higher_better === null ? null : E.higher_better ? l > 0 : l < 0,
            A = E.higher_better === null ? "#8b5cf6" : p === !0 ? "#10b981" : p === !1 ? "#ef4444" : "#94a3b8",
            b = E.target == null ? null : E.higher_better ? t >= E.target : t <= E.target,
            f = b == null ? "#0ea5e9" : b ? "#10b981" : "#ef4444",
            j = E.unit === "%" ? `${t}%` : E.unit === "min" ? `${t}m` : t.toLocaleString();
          return u.jsxs("div", {
            className: "glass-card",
            style: {
              padding: "12px 14px",
              borderRadius: "12px",
              borderLeft: `3px solid ${f}`,
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "8px"
              },
              children: [u.jsxs("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [u.jsx("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em"
                  },
                  children: E.name_th
                }), u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "baseline",
                    gap: "6px",
                    marginTop: "2px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "18px",
                      fontWeight: 900,
                      color: f,
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums"
                    },
                    children: j
                  }), E.target != null && u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      color: "var(--md-text-tertiary)",
                      fontWeight: 700
                    },
                    children: `\u0E40\u0E1B\u0E49\u0E32 ${E.higher_better?"\u2265":"\u2264"} ${E.target}${E.unit==="%"?"%":""}`
                  })]
                })]
              }), u.jsxs("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: A,
                  background: `${A}15`,
                  padding: "3px 8px",
                  borderRadius: "99px",
                  whiteSpace: "nowrap"
                },
                children: [o, " ", `${l>=0?"+":""}${l}%`]
              })]
            }), u.jsx("div", {
              style: {
                height: "90px",
                marginLeft: "-8px"
              },
              children: u.jsx(N, {
                width: "100%",
                height: "100%",
                children: u.jsxs(p0, {
                  data: r,
                  margin: {
                    top: 4,
                    right: 4,
                    left: 0,
                    bottom: -8
                  },
                  children: [u.jsx(H, {
                    strokeDasharray: "2 2",
                    vertical: !1,
                    stroke: "rgba(0,0,0,.05)"
                  }), u.jsx(M, {
                    dataKey: "month",
                    tick: {
                      fontSize: 8,
                      fill: "#94a3b8"
                    },
                    axisLine: !1,
                    tickLine: !1,
                    interval: 1
                  }), u.jsx(O, {
                    tick: {
                      fontSize: 8,
                      fill: "#94a3b8"
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 28
                  }), u.jsx(K, {
                    contentStyle: {
                      fontSize: "10px",
                      borderRadius: "8px",
                      border: "1px solid rgba(0,0,0,.08)"
                    }
                  }), u.jsx(g0, {
                    type: "monotone",
                    dataKey: "value",
                    fill: `${f}1a`,
                    stroke: f,
                    strokeWidth: 2,
                    dot: {
                      r: 2,
                      fill: f
                    },
                    activeDot: {
                      r: 4
                    }
                  })]
                })
              })
            })]
          }, i)
        })
      })]
    }), u.jsx(v0, {
      name: "Live Patients & Analytics",
      children: u.jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
        children: [u.jsxs("div", {
          className: "glass-card flex flex-col",
          style: {
            height: "400px"
          },
          children: [u.jsx("div", {
            className: "px-5 py-4 border-b border-[var(--md-divider)] flex justify-between items-center",
            children: u.jsxs("div", {
              className: "flex items-center gap-2",
              children: [u.jsx("h3", {
                className: "text-[13px] font-bold text-[var(--md-text-primary)] uppercase tracking-tight",
                children: "Active ER Patients"
              }), u.jsx("span", {
                className: "bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold",
                children: h.length
              })]
            })
          }), u.jsxs("div", {
            className: "flex-1 min-h-0",
            children: [u.jsx(X0, {
              height: 340,
              itemCount: h.length,
              itemSize: 50,
              width: "100%",
              children: C0
            }), h.length === 0 && u.jsxs("div", {
              className: "h-full flex flex-col items-center justify-center opacity-40",
              children: [u.jsx("span", {
                className: "text-4xl mb-2",
                children: "\u{1F3E5}"
              }), u.jsx("p", {
                className: "text-sm font-medium",
                children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A ER \u0E02\u0E13\u0E30\u0E19\u0E35\u0E49"
              })]
            })]
          })]
        }), u.jsxs("div", {
          className: "glass-card flex flex-col",
          style: {
            height: "400px",
            padding: "1.25rem"
          },
          children: [u.jsx("h3", {
            className: "text-[11px] font-bold text-[var(--md-text-tertiary)] uppercase tracking-wider mb-4",
            children: "Volume & Efficiency Trends"
          }), u.jsxs("div", {
            className: "flex-1",
            children: [u.jsx("p", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                marginBottom: "8px"
              },
              children: "\u{1F550} Hourly Load (30 Day Average)"
            }), u.jsx(N, {
              width: "100%",
              height: 120,
              children: u.jsxs(p0, {
                data: d?.hourly_heatmap || [],
                children: [u.jsx(H, {
                  strokeDasharray: "3 3",
                  stroke: "rgba(203,213,225,.2)",
                  vertical: !1
                }), u.jsx(M, {
                  dataKey: "hour",
                  tick: {
                    fontSize: 8
                  },
                  tickFormatter: E => `${E}h`
                }), u.jsx(O, {
                  hide: !0
                }), u.jsx(K, {
                  contentStyle: {
                    fontSize: "12px"
                  }
                }), u.jsx(Y, {
                  dataKey: "avg",
                  radius: [3, 3, 0, 0],
                  children: (d?.hourly_heatmap || []).map((E, i) => u.jsx(Eu, {
                    fill: E.avg >= 3 ? "#f43f5e" : "#8b5cf6"
                  }, i))
                })]
              })
            }), u.jsxs("div", {
              className: "mt-6",
              children: [u.jsx("p", {
                style: {
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  textTransform: "uppercase",
                  marginBottom: "8px"
                },
                children: "\u{1F4C8} Monthly Trend (Visits & Criticality)"
              }), u.jsx(N, {
                width: "100%",
                height: 120,
                children: u.jsxs(A0, {
                  data: d?.monthly_trend || [],
                  children: [u.jsx(H, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.2)",
                    vertical: !1
                  }), u.jsx(M, {
                    dataKey: "month",
                    tick: {
                      fontSize: 9
                    }
                  }), u.jsx(O, {
                    hide: !0
                  }), u.jsx(K, {
                    contentStyle: {
                      fontSize: "12px"
                    }
                  }), u.jsx(g0, {
                    type: "monotone",
                    dataKey: "visits",
                    fill: "rgba(124,58,237,.1)",
                    stroke: "#8b5cf6",
                    strokeWidth: 2
                  }), u.jsx(Y, {
                    dataKey: "critical",
                    fill: "rgba(244,63,94,.4)",
                    barSize: 10,
                    radius: [2, 2, 0, 0]
                  })]
                })
              })]
            })]
          })]
        })]
      })
    }), !v.erAnalytics && m.problems.length > 0 && u.jsxs(u.Fragment, {
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "-4px"
        },
        children: [u.jsx("div", {
          style: {
            width: "3px",
            height: "18px",
            background: "linear-gradient(180deg, #f43f5e, #f59e0b)",
            borderRadius: "99px"
          }
        }), u.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 600,
            color: "var(--md-text-primary)",
            letterSpacing: "-0.01em"
          },
          children: "\u{1F525} AI Deep Root-Cause & Performance Recovery"
        })]
      }), u.jsx("div", {
        className: "glass-card",
        style: {
          padding: "1.5rem",
          border: `1.5px solid ${m.urgencyColor}25`
        },
        children: u.jsx("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          },
          children: m.problems.map((E, i) => u.jsxs("div", {
            style: {
              borderRadius: "12px",
              border: `1.5px solid ${E.color}20`,
              background: `${E.color}04`,
              overflow: "hidden"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "10px 16px",
                borderBottom: `1px solid ${E.color}15`,
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: `linear-gradient(90deg, ${E.color}10, transparent)`
              },
              children: [E.priority > 0 && u.jsx("span", {
                style: {
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: E.color,
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                },
                children: E.priority
              }), u.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--md-text-primary)"
                },
                children: E.title
              })]
            }), u.jsxs("div", {
              style: {
                padding: "12px 16px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px"
              },
              children: [u.jsxs("div", {
                style: {
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(244,63,94,.03)",
                  borderLeft: "3px solid #f43f5e"
                },
                children: [u.jsx("p", {
                  style: {
                    margin: "0 0 6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#f43f5e",
                    letterSpacing: "0.02em"
                  },
                  children: "\u{1F50D} \u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E02\u0E2D\u0E07\u0E1B\u0E31\u0E0D\u0E2B\u0E32"
                }), u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    lineHeight: 1.6,
                    fontWeight: 500
                  },
                  children: E.rootCause
                })]
              }), u.jsxs("div", {
                style: {
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(245,158,11,.03)",
                  borderLeft: "3px solid #f59e0b"
                },
                children: [u.jsx("p", {
                  style: {
                    margin: "0 0 6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#f59e0b",
                    letterSpacing: "0.02em"
                  },
                  children: "\u26A1 \u0E1C\u0E25\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07"
                }), u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    lineHeight: 1.6,
                    fontWeight: 500
                  },
                  children: E.cascadeEffect
                })]
              }), u.jsxs("div", {
                style: {
                  padding: "12px",
                  borderRadius: "12px",
                  background: "rgba(124,58,237,.04)",
                  borderLeft: "3px solid #8b5cf6"
                },
                children: [u.jsx("p", {
                  style: {
                    margin: "0 0 6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#8b5cf6",
                    letterSpacing: "0.02em"
                  },
                  children: "\u{1F680} \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E41\u0E25\u0E30\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23"
                }), u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    lineHeight: 1.6,
                    fontWeight: 500
                  },
                  children: E.fixFirst
                })]
              })]
            })]
          }, i))
        })
      })]
    }), u.jsx("div", {
      className: "grid grid-cols-1 gap-4",
      children: u.jsxs("div", {
        className: "chart-container",
        children: [u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem"
          },
          children: [u.jsx("h3", {
            style: {
              fontSize: "var(--fs-md)",
              fontWeight: 600,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.01em"
            },
            children: "\u{1F691} ER Performance Dynamics"
          }), u.jsxs("div", {
            style: {
              display: "flex",
              gap: "12px"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "5px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8b5cf6"
                }
              }), " ", u.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: "Actual"
              })]
            }), u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "5px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#8b5cf6",
                  border: "1px solid #8b5cf6",
                  opacity: .5
                }
              }), " ", u.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: "Predicted"
              })]
            })]
          })]
        }), u.jsx(N, {
          width: "100%",
          height: 250,
          children: u.jsxs(A0, {
            data: _0,
            children: [u.jsx(H, {
              vertical: !1,
              strokeDasharray: "3 3",
              stroke: "rgba(203,213,225,.3)"
            }), u.jsx(M, {
              dataKey: "name",
              tick: {
                fill: "#6b7280",
                fontSize: 10,
                fontWeight: 700
              },
              axisLine: !1,
              tickLine: !1
            }), u.jsx(O, {
              tick: {
                fill: "#9ca3af",
                fontSize: 10,
                fontWeight: 600
              },
              axisLine: !1,
              tickLine: !1
            }), u.jsx(K, {
              contentStyle: {
                background: "#fff",
                border: "1px solid #e8eaf2",
                borderRadius: "12px",
                fontSize: "12px"
              }
            }), u.jsx(g0, {
              type: "monotone",
              dataKey: "predicted",
              fill: "rgba(139,92,246,.05)",
              stroke: "#8b5cf6",
              strokeWidth: 2,
              strokeDasharray: "5 5",
              dot: !1
            }), u.jsx(Y, {
              dataKey: "actual",
              fill: "#8b5cf6",
              radius: [4, 4, 0, 0],
              barSize: 20
            })]
          })
        })]
      })
    }), u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px"
      },
      children: [u.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #f43f5e, #ef4444)",
          borderRadius: "99px"
        }
      }), u.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 600,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ER \u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13"
      }), u.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(244,63,94,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP XE Data Intelligence"
      })]
    }), u.jsx("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: v.erRevenueFiscal ? u.jsx("div", {
        className: "skeleton h-[300px] w-full"
      }) : (() => {
        const E = n.erRevenueFiscal?.fiscal_years || [];
        if (E.length === 0) return null;
        const i = ["#94a3b8", "#fb7185", "#f43f5e"],
          r = ["\u0E15.\u0E04.", "\u0E1E.\u0E22.", "\u0E18.\u0E04.", "\u0E21.\u0E04.", "\u0E01.\u0E1E.", "\u0E21\u0E35.\u0E04.", "\u0E40\u0E21.\u0E22.", "\u0E1E.\u0E04.", "\u0E21\u0E34.\u0E22.", "\u0E01.\u0E04.", "\u0E2A.\u0E04.", "\u0E01.\u0E22."].map((t, a) => {
            const l = {
              month: t
            };
            return E.forEach((o, p) => {
              l[`fy${p}`] = o.months[a]?.revenue || 0
            }), l
          });
        return u.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          },
          children: [u.jsx("div", {
            className: "grid grid-cols-3 gap-3",
            children: E.map((t, a) => u.jsxs("div", {
              style: {
                padding: "12px",
                borderRadius: "12px",
                border: `1px solid ${i[a]}20`,
                background: `${i[a]}05`
              },
              children: [u.jsxs("div", {
                className: "flex items-center gap-2 mb-1",
                children: [u.jsx("div", {
                  className: "w-2 h-2 rounded-full",
                  style: {
                    background: i[a]
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: i[a]
                  },
                  children: t.fiscal_label
                })]
              }), u.jsxs("p", {
                style: {
                  fontSize: "18px",
                  fontWeight: 900,
                  color: i[a]
                },
                children: ["\u0E3F", (t.total_revenue / 1e6).toFixed(1), "M"]
              }), u.jsxs("p", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)"
                },
                children: [t.total_visits.toLocaleString(), " visits"]
              })]
            }, a))
          }), u.jsx(N, {
            width: "100%",
            height: 220,
            children: u.jsxs(p0, {
              data: r,
              children: [u.jsx(H, {
                strokeDasharray: "3 3",
                vertical: !1,
                stroke: "rgba(203,213,225,.2)"
              }), u.jsx(M, {
                dataKey: "month",
                tick: {
                  fontSize: 10
                },
                axisLine: !1,
                tickLine: !1
              }), u.jsx(O, {
                hide: !0
              }), u.jsx(K, {
                contentStyle: {
                  fontSize: "12px",
                  borderRadius: "12px"
                }
              }), E.map((t, a) => u.jsx(Y, {
                dataKey: `fy${a}`,
                fill: i[a],
                radius: [3, 3, 0, 0],
                opacity: a === E.length - 1 ? 1 : .4
              }, a))]
            })
          })]
        })
      })()
    }), u.jsx("div", {
      className: "text-center opacity-30 py-4",
      children: u.jsx("p", {
        className: "text-[10px] font-bold tracking-widest text-[var(--md-text-tertiary)] uppercase",
        children: "BCH ER Intelligence \xB7 Protocol v10.4 \xB7 High Fidelity Analytics"
      })
    }), u.jsx(uu, {
      data: n.erAIv2,
      theme: "default",
      title: "AI ER Intelligence"
    })]
  })
}

function tu({
  alert: n,
  onDismiss: g
}) {
  const [c, h] = c0.useState(!0);
  return c0.useEffect(() => {
    const f0 = setInterval(() => h(d => !d), 700);
    return () => clearInterval(f0)
  }, []), u.jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 20px",
      borderRadius: "12px",
      border: "2px solid #f43f5e",
      background: c ? "rgba(244,63,94,.18)" : "rgba(244,63,94,.08)",
      transition: "background 0.3s",
      boxShadow: c ? "0 0 20px rgba(244,63,94,.35)" : "0 0 6px rgba(244,63,94,.1)"
    },
    children: [u.jsx("span", {
      style: {
        fontSize: "24px",
        flexShrink: 0
      },
      children: "\u{1F534}"
    }), u.jsxs("div", {
      style: {
        flex: 1
      },
      children: [u.jsx("p", {
        style: {
          margin: 0,
          fontSize: "14px",
          fontWeight: 900,
          color: "#f43f5e",
          letterSpacing: "0.02em"
        },
        children: "TRIAGE LEVEL 1 \u2014 RESUSCITATION ALERT"
      }), u.jsx("p", {
        style: {
          margin: "2px 0 0",
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--md-text-primary)"
        },
        children: n.message
      }), u.jsxs("p", {
        style: {
          margin: "2px 0 0",
          fontSize: "12px",
          color: "var(--md-text-tertiary)"
        },
        children: ["WebSocket Push \xB7 ", new Date(n.timestamp).toLocaleTimeString("th-TH")]
      })]
    }), u.jsx("button", {
      onClick: g,
      style: {
        flexShrink: 0,
        padding: "6px 14px",
        borderRadius: "8px",
        border: "1px solid #f43f5e",
        background: "transparent",
        color: "#f43f5e",
        fontSize: "12px",
        fontWeight: 700,
        cursor: "pointer"
      },
      children: "\u0E23\u0E31\u0E1A\u0E17\u0E23\u0E32\u0E1A"
    })]
  })
}
const j0 = {
  open: {
    color: "#10b981",
    bg: "rgba(16,185,129,.08)",
    icon: "\u2705",
    label: "\u0E40\u0E1B\u0E34\u0E14\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
    labelEn: "OPEN"
  },
  caution: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,.08)",
    icon: "\u26A0\uFE0F",
    label: "\u0E23\u0E30\u0E27\u0E31\u0E07 \u2014 \u0E2D\u0E32\u0E08\u0E25\u0E48\u0E32\u0E0A\u0E49\u0E32",
    labelEn: "CAUTION"
  },
  diverted: {
    color: "#f43f5e",
    bg: "rgba(244,63,94,.08)",
    icon: "\u{1F6AB}",
    label: "\u0E1B\u0E34\u0E14\u0E23\u0E31\u0E1A\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27",
    labelEn: "DIVERTED"
  }
};

function iu({
  data: n,
  loading: g
}) {
  if (g) return u.jsx("div", {
    className: "skeleton",
    style: {
      height: "72px",
      borderRadius: "12px"
    }
  });
  if (!n) return null;
  const c = j0[n.status] || j0.open;
  return u.jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "14px 20px",
      borderRadius: "12px",
      border: `1.5px solid ${c.color}30`,
      background: c.bg
    },
    children: [u.jsx("span", {
      style: {
        fontSize: "24px",
        flexShrink: 0
      },
      children: c.icon
    }), u.jsxs("div", {
      style: {
        flex: 1
      },
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "2px"
        },
        children: [u.jsxs("span", {
          style: {
            fontSize: "12px",
            fontWeight: 900,
            color: c.color,
            letterSpacing: "0.06em"
          },
          children: ["ER DIVERSION STATUS: ", c.labelEn]
        }), u.jsxs("span", {
          style: {
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--md-text-secondary)"
          },
          children: ["\u2014 ", c.label]
        })]
      }), u.jsxs("p", {
        style: {
          margin: 0,
          fontSize: "12px",
          color: "var(--md-text-secondary)",
          fontWeight: 500
        },
        children: [n.reason, " \xB7 ", "\u0E23\u0E2D ", n.waiting_count, " \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", n.avg_wait_min, " \u0E19\u0E32\u0E17\u0E35", n.resus_count > 0 && ` \xB7 Resus ${n.resus_count} \u0E23\u0E32\u0E22`, n.long_wait_count > 0 && ` \xB7 \u0E23\u0E2D>2\u0E0A\u0E21. ${n.long_wait_count} \u0E23\u0E32\u0E22`]
      })]
    }), u.jsxs("div", {
      style: {
        flexShrink: 0,
        textAlign: "right"
      },
      children: [u.jsxs("div", {
        style: {
          fontSize: "22px",
          fontWeight: 900,
          color: c.color
        },
        children: [n.critical_pct, "%"]
      }), u.jsx("div", {
        style: {
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 700
        },
        children: "Critical Cases"
      })]
    })]
  })
}
const ru = c0.memo(eu);
export {
  ru as
  default
};