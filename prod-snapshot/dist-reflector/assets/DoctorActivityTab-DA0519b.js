import {
  R as Z,
  r as R,
  j as u
} from "./vendor-react-ByYOq5k4.js";
import {
  E as e0,
  q as r
} from "./shared-ui-OVDEF1.js";
import {
  R as t0,
  c as x0,
  a as r0,
  X as i0,
  Y as u0,
  T as o0,
  L as d0,
  B as n0,
  g as p0,
  b as a0
} from "./vendor-charts-C5q2M-g3.js";
const E0 = E => {
    const t = E.getFullYear(),
      o = String(E.getMonth() + 1).padStart(2, "0"),
      l = String(E.getDate()).padStart(2, "0");
    return `${t}-${o}-${l}`
  },
  Y = () => E0(new Date),
  Q = E => {
    if (!E.length) return 0;
    const t = [...E].sort((l, A) => l - A),
      o = Math.floor(t.length / 2);
    return t.length % 2 === 0 ? (t[o - 1] + t[o]) / 2 : t[o]
  };

function s0(E, t, o) {
  const l = [...t].sort((a, _) => (_.total_visits || 0) - (a.total_visits || 0)).findIndex(a => a.code === E.code) + 1,
    A = Math.round((1 - (l - 1) / Math.max(1, t.length)) * 100),
    g = [...t].sort((a, _) => (_.total_revenue || 0) - (a.total_revenue || 0)).findIndex(a => a.code === E.code) + 1,
    x = Q(t.map(a => a.total_visits || 0)),
    p = Q(t.map(a => a.revenue_per_visit || 0).filter(a => a > 0)),
    s = Q(t.map(a => Number(a.orders_per_visit) || 0).filter(a => a > 0)),
    I = (E.opd_visits || 0) + (E.ipd_admissions || 0),
    j = I > 0 ? (E.ipd_admissions || 0) / I : 0,
    d = (E.ipd_admissions || 0) === 0 ? "OPD-only (\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19)" : j > .15 ? `IPD-heavy (${Math.round(j*100)}% \u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07)` : `Balanced (OPD ${Math.round((1-j)*100)}% \xB7 IPD ${Math.round(j*100)}%)`,
    W = j > .15 ? "#db2777" : (E.ipd_admissions || 0) === 0 ? "#7c3aed" : "#10b981",
    B = (E.opd_visits || 0) / Math.max(1, o),
    S = B > 50 ? "\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 (\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout)" : B > 30 ? "\u0E2A\u0E39\u0E07 (\u0E40\u0E2B\u0E19\u0E37\u0E48\u0E2D\u0E22\u0E41\u0E15\u0E48\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49)" : B > 15 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : B > 5 ? "\u0E15\u0E48\u0E33 (\u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22)" : "\u0E15\u0E48\u0E33\u0E21\u0E32\u0E01",
    H = B > 50 ? "#f43f5e" : B > 30 ? "#f59e0b" : "#10b981",
    v = Number(E.orders_per_visit) || 0,
    F = Number(E.revenue_per_visit) || 0,
    T = s > 0 && v > s * 1.5 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E21\u0E32\u0E01" : s > 0 && v > s * 1.2 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : s > 0 && v < s * .5 ? "\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34",
    L = p > 0 && F > p * 1.5 ? "\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 (case-mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E23\u0E32\u0E04\u0E32\u0E2A\u0E39\u0E07)" : p > 0 && F > p * 1.2 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : p > 0 && F < p * .5 ? "\u0E15\u0E48\u0E33 (case \u0E07\u0E48\u0E32\u0E22\u0E2B\u0E23\u0E37\u0E2D\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E1A\u0E34\u0E01\u0E15\u0E48\u0E33)" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34",
    $ = [],
    w = [],
    O = [];
  A >= 90 ? $.push(`Top ${Math.max(1,100-A)}% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ${l}/${t.length})`) : A >= 75 && $.push(`Top 25% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ${l}/${t.length})`), F > p * 1.2 && $.push(`\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22\u0E2A\u0E39\u0E07 \u0E3F${r(F)} (\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 ${Math.round((F/Math.max(1,p)-1)*100)}%) \u2014 case-mix \u0E21\u0E35\u0E04\u0E38\u0E13\u0E04\u0E48\u0E32\u0E17\u0E32\u0E07\u0E40\u0E28\u0E23\u0E29\u0E10\u0E01\u0E34\u0E08`), j > .15 && $.push(`\u0E23\u0E31\u0E1A IPD \u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D (${E.ipd_admissions} \u0E23\u0E32\u0E22 \xB7 ${Math.round(j*100)}% \u0E02\u0E2D\u0E07 workload) \u2014 \u0E40\u0E2A\u0E23\u0E34\u0E21\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`), v > 0 && v < s * 1.2 && v > s * .7 && $.push(`Orders/Visit \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (${v}) \u2014 Clinical Pathway \u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21`), B > 50 ? w.push(`\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${Math.round(B)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \xB7 \u0E40\u0E01\u0E13\u0E11\u0E4C 30\u201350) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout`) : B > 30 && (E.ipd_admissions || 0) > 30 && w.push(`\u26A0 OPD ${Math.round(B)}/\u0E27\u0E31\u0E19 + IPD ${E.ipd_admissions} \u0E23\u0E32\u0E22 \u2014 \u0E20\u0E32\u0E23\u0E30\u0E0B\u0E49\u0E2D\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07`), s > 0 && v > s * 1.5 && w.push(`\u26A0 Orders/Visit = ${v} \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (${s.toFixed(2)}) \u0E21\u0E32\u0E01 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Appropriateness`), (E.opd_visits || 0) > 100 && v > 0 && v < .2 && w.push(`\u26A0 Orders/Visit \u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 (${v}) \u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u2014 \u0E2D\u0E32\u0E08 Under-investigation`), (E.ipd_admissions || 0) === 0 && A >= 75 && w.push("\u0E41\u0E1E\u0E17\u0E22\u0E4C OPD-only \u0E41\u0E15\u0E48\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E39\u0E07 \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E43\u0E2B\u0E49\u0E23\u0E48\u0E27\u0E21 IPD rotation"), p > 0 && F < p * .4 && (E.opd_visits || 0) > 100 && w.push(`\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07\u0E21\u0E32\u0E01 (\u0E3F${r(F)} vs \u0E3F${r(p)}) \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Payer Mix \u0E41\u0E25\u0E30 Coding`), (E.lab_orders || 0) === 0 && (E.xray_orders || 0) === 0 && (E.opd_visits || 0) > 50 && w.push(`\u0E44\u0E21\u0E48\u0E21\u0E35 Lab/X-Ray Orders \u0E40\u0E25\u0E22\u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01`), B > 50 && O.push("\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30 OPD \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E08\u0E33\u0E01\u0E31\u0E14 Quota \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E0A\u0E48\u0E27\u0E22"), s > 0 && v > s * 1.5 && O.push("\u0E23\u0E48\u0E27\u0E21\u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21 Clinical Guideline \u2014 \u0E25\u0E14 Over-investigation"), F < p * .5 && (E.opd_visits || 0) > 200 && O.push("\u0E17\u0E1A\u0E17\u0E27\u0E19 Coding/Billing \u2014 \u0E2D\u0E32\u0E08\u0E21\u0E35 Revenue Leak"), (E.ipd_admissions || 0) === 0 && A >= 75 && O.push("\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E40\u0E02\u0E49\u0E32 IPD \u2014 \u0E40\u0E2A\u0E23\u0E34\u0E21 Team Flexibility"), w.length === 0 && $.length >= 2 && O.push("\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E14\u0E35 \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E40\u0E1B\u0E47\u0E19 Mentor / \u0E1C\u0E39\u0E49\u0E0A\u0E48\u0E27\u0E22\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Pathway");
  const G = c0(E, t, {
    visitPercentile: A,
    totalDoctors: t.length,
    dailyVisits: B,
    medRevPerVisit: p,
    medOrdersPerVisit: s,
    opv: v,
    rpv: F,
    periodDays: o
  });
  return {
    visitRank: l,
    visitPercentile: A,
    revRank: g,
    totalDoctors: t.length,
    pattern: d,
    patternColor: W,
    workloadLevel: S,
    workloadColor: H,
    ordEff: T,
    revEff: L,
    dailyVisits: B,
    medVisits: x,
    medRevPerVisit: p,
    medOrdersPerVisit: s,
    strengths: $,
    concerns: w,
    recs: O,
    deepRecs: G
  }
}

function c0(E, t, o) {
  const {
    visitPercentile: l,
    dailyVisits: A,
    medRevPerVisit: g,
    medOrdersPerVisit: x,
    opv: p,
    rpv: s,
    periodDays: I
  } = o, j = [], d = E.name || E.code;
  if (A > 50) {
    const W = Math.round(A - 40);
    j.push({
      priority: "P0",
      icon: "\u{1F6A8}",
      title: "\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E25\u0E30\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Burnout",
      color: "#f43f5e",
      situation: `${d} \u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${Math.round(A)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 (\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C OPD \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 30\u201350 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${W} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19) \u0E15\u0E25\u0E2D\u0E14\u0E0A\u0E48\u0E27\u0E07 ${I} \u0E27\u0E31\u0E19 \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout \u0E2A\u0E39\u0E07 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22 \u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E41\u0E25\u0E30\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E04\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E19\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27`,
      rootCause: "\u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 (1) \u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D\u0E15\u0E48\u0E2D Demand \xB7 (2) \u0E23\u0E30\u0E1A\u0E1A\u0E19\u0E31\u0E14\u0E2B\u0E21\u0E32\u0E22\u0E44\u0E21\u0E48\u0E21\u0E35 Quota Cap \u0E15\u0E48\u0E2D\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 (3) \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 Provider \u0E40\u0E14\u0E34\u0E21\u0E17\u0E33\u0E43\u0E2B\u0E49 load \u0E01\u0E23\u0E30\u0E08\u0E38\u0E01 \xB7 (4) \u0E44\u0E21\u0E48\u0E21\u0E35 Triage \u0E17\u0E35\u0E48\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A case \u0E40\u0E1A\u0E32\u0E44\u0E1B\u0E2B\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E48\u0E27\u0E21",
      actions: ["**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E01\u0E33\u0E2B\u0E19\u0E14 Quota Cap \u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27 45 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19/\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19 HOSxP Appointment Module \u2014 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 IT \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E15\u0E31\u0E49\u0E07 warning \u0E40\u0E21\u0E37\u0E48\u0E2D slot \u0E40\u0E15\u0E47\u0E21", `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Case-mix \u0E02\u0E2D\u0E07 ${d} \u2014 \u0E41\u0E22\u0E01 Simple (\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E22\u0E32/follow-up) \u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01 Complex \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Redistribute`, "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14 Pharmacist-led Refill Clinic + Nurse Practitioner Clinic \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Stable NCD/Chronic \u2014 \u0E25\u0E14 OPD Load 15\u201320%", "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49\u0E43\u0E19\u0E01\u0E32\u0E23\u0E08\u0E49\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C GP \u0E40\u0E1E\u0E34\u0E48\u0E21 1 \u0E17\u0E48\u0E32\u0E19 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 Part-time Specialist 1\u20132 \u0E27\u0E31\u0E19/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C", `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Monitor Daily Visits \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 \u0E04\u0E38\u0E22 1-on-1 \u0E01\u0E31\u0E1A ${d} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\u0E17\u0E23\u0E32\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 Burnout (\u0E19\u0E2D\u0E19/\u0E2D\u0E32\u0E23\u0E21\u0E13\u0E4C/\u0E04\u0E27\u0E32\u0E21\u0E23\u0E39\u0E49\u0E2A\u0E36\u0E01\u0E15\u0E48\u0E2D\u0E07\u0E32\u0E19)`],
      target: `\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19 ${d} \u0E40\u0E2B\u0E25\u0E37\u0E2D \u2264 45 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \u0E20\u0E32\u0E22\u0E43\u0E19 8 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 MBI Score (Maslach Burnout Inventory) Emotional Exhaustion <16`,
      timeline: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 8 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 + \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + HR",
      expectedOutcome: `\u0E25\u0E14 Burnout Risk \xB7 \u0E04\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C Top Performer \xB7 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E14\u0E49 Consultation Time \u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D (\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.max(2,Math.round(480/A))} \u0E19\u0E32\u0E17\u0E35/\u0E23\u0E32\u0E22 \u0E2D\u0E32\u0E08\u0E44\u0E21\u0E48\u0E1E\u0E2D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Complex Case)`
    })
  }
  if (g > 0 && s < g * .6 && (E.opd_visits || 0) > 200) {
    const W = Math.round(g - s),
      B = Math.round(W * (E.opd_visits || 0));
    j.push({
      priority: "P0",
      icon: "\u{1F4B0}",
      title: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Revenue Leak \u0E41\u0E25\u0E30 Coding Quality",
      color: "#dc2626",
      situation: `${d} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \u0E3F${r(s)}/\u0E23\u0E32\u0E22 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(g)}/\u0E23\u0E32\u0E22 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.round((1-s/g)*100)}% \xB7 \u0E08\u0E32\u0E01\u0E08\u0E33\u0E19\u0E27\u0E19 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${I} \u0E27\u0E31\u0E19 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23 Revenue Gap \u0E2A\u0E39\u0E07\u0E16\u0E36\u0E07 \u0E3F${r(B)} \xB7 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E44\u0E14\u0E49\u0E2B\u0E25\u0E32\u0E22\u0E14\u0E49\u0E32\u0E19\u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19`,
      rootCause: "\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 4 \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38 (\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E04\u0E27\u0E32\u0E21\u0E19\u0E48\u0E32\u0E08\u0E30\u0E40\u0E1B\u0E47\u0E19): (1) **ICD-10/ICD-9 Coding \u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A** \u2014 \u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E30\u0E1A\u0E38 Secondary Dx \u0E2B\u0E23\u0E37\u0E2D Comorbidity \xB7 (2) **\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01** \u2014 \u0E19\u0E27\u0E14/\u0E09\u0E35\u0E14\u0E22\u0E32/Counseling \u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E44\u0E14\u0E49 \xB7 (3) **Payer Mix \u0E40\u0E2D\u0E35\u0E22\u0E07\u0E44\u0E1B\u0E17\u0E32\u0E07 UC/\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07** \u2014 case-mix \u0E40\u0E19\u0E49\u0E19 Simple/Follow-up \xB7 (4) **\u0E43\u0E1A\u0E40\u0E1A\u0E34\u0E01\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A** (\u0E2A\u0E1B\u0E2A\u0E0A. e-Claim format)",
      actions: [`**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E14\u0E36\u0E07 30 records \u0E02\u0E2D\u0E07 ${d} \u0E41\u0E1A\u0E1A\u0E2A\u0E38\u0E48\u0E21 (stratified by pttype) \xB7 MedRec audit \u0E17\u0E33 Chart Review \u0E40\u0E17\u0E35\u0E22\u0E1A Documentation vs Billed`, `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E1E\u0E1A ${d} \u0E17\u0E1A\u0E17\u0E27\u0E19 Coding Basics \u2014 Secondary Dx, Comorbidity (CC/MCC), Procedure Code (ICD-9-CM)`, "**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 3**: \u0E1B\u0E23\u0E31\u0E1A\u0E43\u0E0A\u0E49 **Coding Checklist** \u0E43\u0E19 HOSxP \u2014 Alert \u0E16\u0E49\u0E32 Primary Dx \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E17\u0E35\u0E48\u0E21\u0E31\u0E01 CC/MCC (DM, HT, CKD) \u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38 Secondary", `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E40\u0E17\u0E35\u0E22\u0E1A Payer Mix \u0E02\u0E2D\u0E07 ${d} \u0E01\u0E31\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E21\u0E35 Revenue/Visit \u0E2A\u0E39\u0E07 \u2014 \u0E14\u0E39\u0E27\u0E48\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C FFS (\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E15\u0E23\u0E07/\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19) \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E23`, `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Quarterly Audit \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A MedRec \xB7 \u0E27\u0E31\u0E14 Revenue/Visit \u0E02\u0E2D\u0E07 ${d} \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19`],
      target: `\u0E40\u0E1E\u0E34\u0E48\u0E21 Revenue/Visit \u0E02\u0E2D\u0E07 ${d} \u0E08\u0E32\u0E01 \u0E3F${r(s)} \u0E40\u0E1B\u0E47\u0E19 \u0E3F${r(Math.round(g*.85))} \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Revenue Recovery \u2265 \u0E3F${r(Math.round(B*.3))}`,
      timeline: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E40\u0E04\u0E2A + Medical Record Audit Team + Billing Department",
      expectedOutcome: "Revenue Recovery \xB7 \u0E1B\u0E23\u0E31\u0E1A Coding Quality \xB7 \u0E25\u0E14 Claim Rejection Rate \xB7 Bench-mark Coding Quality \u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E48\u0E32\u0E19\u0E2D\u0E37\u0E48\u0E19"
    })
  }
  if (x > 0 && p > x * 1.5) {
    const W = Math.round((p - x) * (E.opd_visits || 0));
    j.push({
      priority: "P1",
      icon: "\u{1F9EA}",
      title: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway \u0E41\u0E25\u0E30 Order Appropriateness",
      color: "#f59e0b",
      situation: `${d} \u0E21\u0E35 Orders/Visit = ${p} \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (${x.toFixed(2)}) \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.round((p/x-1)*100)}% \xB7 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E01\u0E34\u0E19 ${r(W)} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${I} \u0E27\u0E31\u0E19 \xB7 \u0E2D\u0E32\u0E08\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Over-investigation \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E0B\u0E49\u0E33\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`,
      rootCause: "(1) **Defensive Medicine** \u2014 \u0E01\u0E25\u0E31\u0E27\u0E1E\u0E25\u0E32\u0E14 \xB7 (2) **\u0E44\u0E21\u0E48\u0E21\u0E35 Clinical Decision Support** \u0E43\u0E19 HOSxP \xB7 (3) **\u0E44\u0E21\u0E48\u0E17\u0E23\u0E32\u0E1A\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19** \u0E02\u0E2D\u0E07\u0E41\u0E15\u0E48\u0E25\u0E30 Order \xB7 (4) **\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E23\u0E35\u0E22\u0E01\u0E23\u0E49\u0E2D\u0E07** \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C UC",
      actions: ["**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21 Peer Review \u0E43\u0E0A\u0E49 Choosing Wisely Thailand Guidelines \xB7 \u0E40\u0E25\u0E37\u0E2D\u0E01 5 Orders \u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07\u0E1A\u0E48\u0E2D\u0E22\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 (\u0E40\u0E0A\u0E48\u0E19 CBC \u0E0B\u0E49\u0E33\u0E43\u0E19 7 \u0E27\u0E31\u0E19 \xB7 LFT \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A HT \u0E17\u0E35\u0E48\u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21\u0E44\u0E14\u0E49)", "**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: Build Clinical Decision Support (CDS) \u0E43\u0E19 HOSxP \u2014 Alert \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E49\u0E33\u0E43\u0E19 30 \u0E27\u0E31\u0E19 + \u0E41\u0E2A\u0E14\u0E07\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E42\u0E14\u0E22\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13", `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14 Academic Session \u0E01\u0E31\u0E1A ${d} + \u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-Based Indication \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Top Orders`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2**: Monitor Orders/Visit \u0E02\u0E2D\u0E07 ${d} \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 Comparison \u0E01\u0E31\u0E1A Peer Group (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19)`, "**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Lab Stewardship Program \u2014 \u0E41\u0E2A\u0E14\u0E07 Utilization Report \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E2B\u0E47\u0E19\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07"],
      target: `\u0E25\u0E14 Orders/Visit \u0E02\u0E2D\u0E07 ${d} \u0E08\u0E32\u0E01 ${p} \u2192 \u2264 ${(x*1.2).toFixed(2)} \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19 Lab/X-Ray \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E3F${r(Math.round(W*150))} (\u0E2A\u0E21\u0E21\u0E15\u0E34 \u0E3F150/order)`,
      timeline: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + Clinical Pharmacist + Lab Director",
      expectedOutcome: "\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19 \xB7 \u0E25\u0E14\u0E01\u0E32\u0E23\u0E23\u0E1A\u0E01\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \xB7 Clinical Appropriateness \u0E14\u0E35\u0E02\u0E36\u0E49\u0E19 \xB7 Benchmark \u0E17\u0E35\u0E48\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E0A\u0E49\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E19\u0E44\u0E14\u0E49"
    })
  }
  return (E.opd_visits || 0) > 100 && p > 0 && p < .2 && j.push({
    priority: "P1",
    icon: "\u{1F52C}",
    title: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49\u0E02\u0E2D\u0E07 Under-investigation",
    color: "#f59e0b",
    situation: `${d} \u0E21\u0E35 Orders/Visit \u0E40\u0E1E\u0E35\u0E22\u0E07 ${p} (\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 ${x.toFixed(2)} \u0E21\u0E32\u0E01) \u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \xB7 \u0E2D\u0E32\u0E08\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 (1) \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19 Follow-up \u0E17\u0E35\u0E48 stable \u0E2B\u0E23\u0E37\u0E2D (2) \u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E19\u0E49\u0E2D\u0E22\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E08\u0E19 Miss Diagnosis`,
    rootCause: "\u0E15\u0E49\u0E2D\u0E07\u0E41\u0E22\u0E01 2 scenario: (A) **Healthy pattern**: \u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E23\u0E37\u0E49\u0E2D\u0E23\u0E31\u0E07\u0E44\u0E14\u0E49\u0E14\u0E35\u0E08\u0E19 stable \xB7 (B) **Risk pattern**: \u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 investigate \u0E15\u0E32\u0E21\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 CPG \xB7 \u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Case-mix \u0E08\u0E30\u0E1A\u0E2D\u0E01\u0E44\u0E14\u0E49",
    actions: [`**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E14\u0E36\u0E07 Sample 30 records \u0E02\u0E2D\u0E07 ${d} \xB7 MedRec Audit \u0E15\u0E23\u0E27\u0E08\u0E27\u0E48\u0E32 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 DM/HT/CKD \u0E44\u0E14\u0E49 Annual Lab Screening \u0E15\u0E32\u0E21 CPG \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48`, `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E16\u0E49\u0E32 Audit \u0E1E\u0E1A Missing Screening \u2014 \u0E1E\u0E1A ${d} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E17\u0E1A\u0E17\u0E27\u0E19 CPG + Generate Alert \u0E43\u0E19 HOSxP \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Overdue Screening`, "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E27\u0E31\u0E14 Clinical Quality Indicators: HbA1c <7 \xB7 BP <140/90 \xB7 LDL <100 \xB7 \u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C HA", "**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Outcome \u2014 Readmission Rate, ER Visit, \u0E20\u0E32\u0E27\u0E30\u0E41\u0E17\u0E23\u0E01\u0E0B\u0E49\u0E2D\u0E19 \xB7 \u0E16\u0E49\u0E32 Outcome \u0E14\u0E35\u0E41\u0E21\u0E49 Orders \u0E15\u0E48\u0E33 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E47\u0E19 Healthy Pattern"],
    target: `\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 Scenario \u0E20\u0E32\u0E22\u0E43\u0E19 4 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 \u0E16\u0E49\u0E32\u0E40\u0E1B\u0E47\u0E19 Risk Pattern \u2192 Orders/Visit \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E17\u0E35\u0E48 \u2265 ${x.toFixed(2)} \u0E20\u0E32\u0E22\u0E43\u0E19 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C`,
    timeline: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
    owner: "Medical Record Audit + \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + Quality Assurance",
    expectedOutcome: "\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Missed Diagnosis \xB7 \u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 Clinical Quality \xB7 \u0E2B\u0E32\u0E01\u0E40\u0E1B\u0E47\u0E19 Healthy Pattern \u0E43\u0E2B\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E19\u0E41\u0E1A\u0E1A"
  }), (E.ipd_admissions || 0) === 0 && l >= 75 && j.push({
    priority: "P2",
    icon: "\u{1F3E5}",
    title: "\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E40\u0E02\u0E49\u0E32 IPD \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E2A\u0E23\u0E34\u0E21 Team Flexibility",
    color: "#3b82f6",
    situation: `${d} \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19 Top ${Math.max(1,100-l)}% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 OPD \u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IPD \u0E40\u0E25\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${I} \u0E27\u0E31\u0E19 \xB7 \u0E02\u0E32\u0E14\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E31\u0E01\u0E29\u0E30\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Complex \u0E41\u0E25\u0E30\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E35\u0E21 IPD \u0E02\u0E32\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E19\u0E31\u0E1A\u0E2A\u0E19\u0E38\u0E19\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 peak`,
    rootCause: `\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 (1) ${d} \u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E14\u0E49\u0E32\u0E19 OPD \u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07 \xB7 (2) \u0E44\u0E21\u0E48\u0E21\u0E35\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 IPD \xB7 (3) \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30 OPD \u0E40\u0E1E\u0E23\u0E32\u0E30 workflow \u0E23\u0E39\u0E49\u0E08\u0E31\u0E01`,
    actions: [`**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E1E\u0E39\u0E14\u0E04\u0E38\u0E22\u0E01\u0E31\u0E1A ${d} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E43\u0E08\u0E43\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A IPD`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14\u0E17\u0E33\u0E15\u0E32\u0E23\u0E32\u0E07 IPD Rotation \u2014 ${d} \u0E23\u0E31\u0E1A Admission \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 2\u20134 \u0E23\u0E32\u0E22/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C (case \u0E44\u0E21\u0E48 complex)`, "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: Mentorship \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD senior \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Complex Case", `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 Outcome Metrics (ALOS, Readmission) \u0E02\u0E2D\u0E07 ${d} \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E01\u0E31\u0E1A IPD Pool`],
    target: `${d} \u0E23\u0E31\u0E1A IPD \u2265 8 \u0E23\u0E32\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Outcome metrics \u0E44\u0E21\u0E48\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 IPD Pool`,
    timeline: "\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27 3 \u0E40\u0E14\u0E37\u0E2D\u0E19",
    owner: `\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + ${d} + \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E21 IPD`,
    expectedOutcome: `Team Flexibility \u0E40\u0E1E\u0E34\u0E48\u0E21 \xB7 \u0E25\u0E14 Single Point of Failure \xB7 ${d} \u0E1E\u0E31\u0E12\u0E19\u0E32 Comprehensive Skill`
  }), (E.lab_orders || 0) === 0 && (E.xray_orders || 0) === 0 && (E.opd_visits || 0) > 50 && j.push({
    priority: "P0",
    icon: "\u26A0\uFE0F",
    title: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08",
    color: "#dc2626",
    situation: `${d} \u0E44\u0E21\u0E48\u0E21\u0E35 Lab/X-Ray Orders \u0E40\u0E25\u0E22\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A HOSxP \u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Volume \u0E02\u0E19\u0E32\u0E14\u0E19\u0E35\u0E49 \xB7 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E2B\u0E23\u0E37\u0E2D data pipeline`,
    rootCause: `(1) ${d} \u0E2A\u0E31\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E0A\u0E48\u0E2D\u0E07\u0E17\u0E32\u0E07\u0E2D\u0E37\u0E48\u0E19 (Paper / Verbal) \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E40\u0E02\u0E49\u0E32 HOSxP \xB7 (2) \u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E1C\u0E39\u0E49\u0E2A\u0E31\u0E48\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E2D\u0E37\u0E48\u0E19 (\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25) \xB7 (3) Data mapping \u0E1C\u0E34\u0E14 (doctor_code \u0E44\u0E21\u0E48 match) \xB7 (4) \u0E2A\u0E48\u0E07 ${d} \u0E08\u0E23\u0E34\u0E07\u0E46 \u0E41\u0E15\u0E48\u0E16\u0E39\u0E01 Lab/X-Ray block`,
    actions: [`**\u0E17\u0E31\u0E19\u0E17\u0E35**: \u0E15\u0E23\u0E27\u0E08 HOSxP Order History \u0E02\u0E2D\u0E07 OPD ${d} 1 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \xB7 \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32 Orders \u0E44\u0E1B\u0E2D\u0E22\u0E39\u0E48\u0E01\u0E31\u0E1A login \u0E2D\u0E37\u0E48\u0E19`, `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E1E\u0E1A ${d} \u0E2A\u0E2D\u0E1A\u0E16\u0E32\u0E21 workflow \u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 IT \u0E15\u0E23\u0E27\u0E08 audit log`, "**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E2B\u0E32\u0E01\u0E40\u0E1B\u0E47\u0E19 Data Mapping Issue \u2192 \u0E41\u0E01\u0E49 doctor_code mapping \u0E43\u0E19 HOSxP \xB7 \u0E2B\u0E32\u0E01\u0E40\u0E1B\u0E47\u0E19 Workflow Issue \u2192 training \u0E41\u0E25\u0E30 SOP", "**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Monitor Orders \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E17\u0E38\u0E01\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C"],
    target: `Orders/Visit \u0E02\u0E2D\u0E07 ${d} \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E17\u0E35\u0E48\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1B\u0E01\u0E15\u0E34 (\u2265 0.3) \u0E20\u0E32\u0E22\u0E43\u0E19 4 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C`,
    timeline: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 4 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
    owner: `IT + MedRec + ${d}`,
    expectedOutcome: "\u0E04\u0E27\u0E32\u0E21\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \xB7 Compliance \u0E14\u0E49\u0E32\u0E19 Documentation \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35 Revenue Leak \u0E08\u0E32\u0E01 Missing Orders"
  }), A >= 20 && A <= 50 && p >= x * .7 && p <= x * 1.3 && s >= g * .8 && l >= 50 && j.push({
    priority: "P2",
    icon: "\u{1F31F}",
    title: "\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E1B\u0E47\u0E19 Clinical Mentor / Champion",
    color: "#10b981",
    situation: `${d} \u0E21\u0E35\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E23\u0E2D\u0E1A\u0E14\u0E49\u0E32\u0E19 \u2014 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21 (${Math.round(A)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19) \xB7 Orders/Visit \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${p}) \xB7 Revenue/Visit \u0E43\u0E01\u0E25\u0E49\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (\u0E3F${r(s)}) \xB7 \u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19 Role Model \u0E41\u0E25\u0E30\u0E0A\u0E48\u0E27\u0E22\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C`,
    rootCause: "\u0E41\u0E2A\u0E14\u0E07\u0E16\u0E36\u0E07 Clinical Competence \u0E41\u0E25\u0E30 Workflow Efficiency \u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E16\u0E48\u0E32\u0E22\u0E17\u0E2D\u0E14",
    actions: [`**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E40\u0E0A\u0E34\u0E0D ${d} \u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21\u0E17\u0E35\u0E21\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Pathway / CPG \u0E1B\u0E23\u0E30\u0E08\u0E33\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: Mentorship Program \u2014 ${d} \u0E40\u0E1B\u0E47\u0E19 Mentor \u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E2B\u0E21\u0E48 1\u20132 \u0E17\u0E48\u0E32\u0E19 \xB7 Shadow OPD 1\u20132 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 3**: \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22 Role "Clinical Champion" \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E02\u0E2D\u0E07 ${d}`, `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Case Conference \u0E1B\u0E23\u0E30\u0E08\u0E33\u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 ${d} \u0E19\u0E33\u0E40\u0E2A\u0E19\u0E2D Interesting Case`],
    target: `\u0E1C\u0E39\u0E49\u0E16\u0E39\u0E01 Mentor 2 \u0E17\u0E48\u0E32\u0E19 \u0E21\u0E35 Revenue/Visit \u0E41\u0E25\u0E30 Orders/Visit \u0E40\u0E02\u0E49\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E20\u0E32\u0E22\u0E43\u0E19 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 ${d} \u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A Recognition (Award/Bonus)`,
    timeline: "\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27 6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
    owner: "\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + HR",
    expectedOutcome: "\u0E22\u0E01\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E17\u0E35\u0E21 \xB7 Retention \u0E02\u0E2D\u0E07 Top Performer \xB7 Knowledge Transfer \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E23\u0E38\u0E48\u0E19"
  }), j
}
const q = E => {
  const t = E.filter(x => x >= 0),
    o = t.length;
  if (o === 0) return 0;
  const l = [...t].sort((x, p) => x - p);
  let A = 0,
    g = 0;
  for (let x = 0; x < o; x++) A += (2 * (x + 1) - o - 1) * l[x], g += l[x];
  return g > 0 ? A / (o * g) : 0
};

function h0(E) {
  if (!E?.summary || !E?.doctors) return {
    headline: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E30\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E40\u0E21\u0E37\u0E48\u0E2D data \u0E1E\u0E23\u0E49\u0E2D\u0E21",
    empty: !0
  };
  const t = E.summary,
    o = E.doctors || [],
    l = t.opd_doctors || 0,
    A = t.opd_visits || 0,
    g = t.avg_visits_per_doctor || 0,
    x = t.total_revenue || 0,
    p = E.period?.days || (E.period?.start && E.period?.end ? Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1) : 30);
  if (!o.length) return {
    headline: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49",
    headlineColor: "#94a3b8",
    kpi: [],
    sections: [],
    footerLeft: "\u2014"
  };
  const s = o.map(i => i.total_visits || 0),
    I = o.map(i => i.total_revenue || 0),
    j = o.map(i => Number(i.orders_per_visit) || 0),
    d = o.map(i => Number(i.revenue_per_visit) || 0),
    W = [...o].sort((i, k) => (k.total_visits || 0) - (i.total_visits || 0)),
    B = W[0],
    S = Math.round(Q(s)),
    H = Math.max(...s),
    v = Math.min(...s),
    F = Math.round(H / Math.max(1, p)),
    T = s.reduce((i, k) => i + k, 0),
    L = I.reduce((i, k) => i + k, 0),
    $ = L > 0 ? Math.round((B?.total_revenue || 0) / L * 100) : 0,
    w = W.slice(0, 10),
    O = T > 0 ? Math.round(w.reduce((i, k) => i + k.total_visits, 0) / T * 100) : 0,
    G = Math.max(1, Math.ceil(o.length * .2)),
    a = W.slice(0, G),
    _ = T > 0 ? Math.round(a.reduce((i, k) => i + k.total_visits, 0) / T * 100) : 0,
    J = q(s),
    P = Math.round(J * 100),
    K = q(I),
    X = Math.round(K * 100),
    U = [...o].filter(i => i.total_visits > 0).sort((i, k) => (k.revenue_per_visit || 0) - (i.revenue_per_visit || 0)),
    N = U[0],
    e = U[U.length - 1],
    n = Math.round(Q(d.filter(i => i > 0))),
    y = Number(Q(j.filter(i => i > 0)).toFixed(2)),
    m = [...o].sort((i, k) => (k.orders_per_visit || 0) - (i.orders_per_visit || 0))[0],
    f = [...o].filter(i => i.opd_visits > 50).sort((i, k) => (i.orders_per_visit || 0) - (k.orders_per_visit || 0))[0],
    V = .05,
    z = o.filter(i => {
      const k = (i.opd_visits || 0) + (i.ipd_admissions || 0);
      return k > 0 && (i.ipd_admissions || 0) / k > V
    }).length,
    C = o.filter(i => (i.ipd_admissions || 0) === 0).length,
    c = o.filter(i => (i.ipd_admissions || 0) > 0).length,
    b = c - z;
  let M, D;
  g > 100 ? (M = `\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C ${l} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${g} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${P}/100 \xB7 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E33\u0E25\u0E31\u0E07\u0E41\u0E25\u0E30 Workload Balance`, D = "#f43f5e") : o.length > 10 && O > 80 ? (M = `\u26A0 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2D\u0E35\u0E22\u0E07\u0E21\u0E32\u0E01 \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 10 \u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A ${O}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \xB7 Gini ${P}/100 \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 Load Balancing`, D = "#f59e0b") : P > 50 ? (M = `\u26A0 Gini Coefficient \u0E2A\u0E39\u0E07 (${P}/100) \u2014 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \xB7 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling \u0E41\u0E25\u0E30 Cross-training`, D = "#f59e0b") : (M = `\u2713 \u0E41\u0E1E\u0E17\u0E22\u0E4C ${l} \u0E17\u0E48\u0E32\u0E19 \xB7 ${r(A)} \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${g} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${P}/100 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(Math.round(x))}`, D = "#10b981");
  const h = [{
    icon: "\u{1F468}\u200D\u2695\uFE0F",
    title: "1. \u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01 (Workload Analysis)",
    list: [`**\u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E08\u0E23\u0E34\u0E07** ${l} \u0E17\u0E48\u0E32\u0E19 (OPD) \xB7 ${t.ipd_doctors||0} \u0E17\u0E48\u0E32\u0E19 (IPD) \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${p} \u0E27\u0E31\u0E19`, `**\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${g} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (Median)** ${S} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14** ${r(H)} \u0E23\u0E32\u0E22 (${F}/\u0E27\u0E31\u0E19) \xB7 **\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** ${r(v)} \u0E23\u0E32\u0E22`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14-\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** = ${H-v>0?Math.round(H/Math.max(1,v)):1} \u0E40\u0E17\u0E48\u0E32 \xB7 ${H/Math.max(1,v)>20?"\u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07\u0E21\u0E32\u0E01 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":H/Math.max(1,v)>10?"\u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 Burnout":"\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E17\u0E35\u0E48\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"}`, `**Benchmark \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A**: \u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 OPD \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 30\u201350 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19/\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A 1 \u0E23\u0E31\u0E1A ${F} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 ${F>50?"\u26A0 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E01 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout":F>30?"\xB7 \u0E2A\u0E39\u0E07\u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49":"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22"}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21**: ${g>100?"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21":g>50?"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u2014 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49":"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49 \u2014 \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"}`],
    color: g > 100 ? "#f43f5e" : g > 50 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4CA}",
    title: "2. \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (Gini Coefficient & Pareto Analysis)",
    list: [`**Gini Coefficient (\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19)** = ${P}/100 \xB7 ${P>60?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01":P>40?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E15\u0E48\u0E33 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"} \xB7 (\u0E40\u0E01\u0E13\u0E11\u0E4C: 0\u201330 \u0E2A\u0E21\u0E14\u0E38\u0E25 \xB7 31\u201350 \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \xB7 >50 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33)`, `**Pareto 80/20 Test**: \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 20% (${G} \u0E17\u0E48\u0E32\u0E19) \u0E23\u0E31\u0E1A ${_}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${_>80?"\xB7 \u0E15\u0E23\u0E07\u0E15\u0E32\u0E21 Pareto Principle \u2014 \u0E20\u0E32\u0E23\u0E30\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Key Physician \u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01":_>60?"\xB7 \u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07 Pareto":"\xB7 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32 Pareto"}`, `**Top ${Math.min(10,o.length)} \u0E41\u0E1E\u0E17\u0E22\u0E4C** \u0E23\u0E31\u0E1A ${O}% \xB7 **Top 1** (${B?.name||"\u2014"}) \u0E23\u0E31\u0E1A ${Math.round((B?.total_visits||0)/T*100)}% (${r(B?.total_visits||0)} \u0E23\u0E32\u0E22)`, `**Gini \u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49** = ${X}/100 \xB7 ${X>60?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07":X>40?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E21\u0E14\u0E38\u0E25"} \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E02\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B**: ${P>50&&O>80?"\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E49\u0E2D\u0E22\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u2014 \u0E04\u0E27\u0E23\u0E25\u0E07\u0E17\u0E38\u0E19 Cross-training \u0E41\u0E25\u0E30\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19":P>40?"\u0E21\u0E35\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`],
    color: P > 50 ? "#f43f5e" : P > 35 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4B0}",
    title: "3. \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E40\u0E0A\u0E34\u0E07\u0E40\u0E28\u0E23\u0E29\u0E10\u0E01\u0E34\u0E08 (Revenue Efficiency)",
    list: [`**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21\u0E08\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C** \u0E3F${r(Math.round(L))} \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u0E3F${r(Math.round(L/Math.max(1,o.length)))}/\u0E41\u0E1E\u0E17\u0E22\u0E4C`, `**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22 (Revenue per Visit)** \u2014 \u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(n)}/\u0E23\u0E32\u0E22 \xB7 \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 ${N?`${N.name} \u0E3F${r(N.revenue_per_visit)}/\u0E23\u0E32\u0E22`:"\u2014"} \xB7 \u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14 ${e?`${e.name} \u0E3F${r(e.revenue_per_visit)}/\u0E23\u0E32\u0E22`:"\u2014"}`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07 Revenue/Visit** = ${N&&e&&e.revenue_per_visit>0?Math.round(N.revenue_per_visit/e.revenue_per_visit):"\u2014"} \u0E40\u0E17\u0E48\u0E32 \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 case-mix (\u0E42\u0E23\u0E04\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E23\u0E32\u0E04\u0E32\u0E2A\u0E39\u0E07) \u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22`, `**Top Earner**: ${B?.name||"\u2014"} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(B?.total_revenue||0)} (${$}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22 \u0E3F${r(B?.revenue_per_visit||0)}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${$>25?"\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19 25% \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2B\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22":$>15?"\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07":"\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35 \u0E44\u0E21\u0E48\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E40\u0E14\u0E35\u0E22\u0E27"}`],
    color: $ > 25 ? "#f43f5e" : $ > 15 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F9EA}",
    title: "4. \u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 (Clinical Order Management)",
    list: [`**Lab Orders \u0E23\u0E27\u0E21** ${r(t.lab_orders)} \xB7 **X-Ray Orders \u0E23\u0E27\u0E21** ${r(t.xray_orders)} \xB7 **Orders/Visit \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${y}`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14**: ${m?`${m.name} \u2014 ${m.orders_per_visit} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07/\u0E23\u0E32\u0E22`:"\u2014"} ${m&&m.orders_per_visit>2?"\u26A0 \u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E01\u0E15\u0E34\u0E21\u0E32\u0E01 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway \u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E34\u0E14\u0E02\u0E36\u0E49\u0E19":""}`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** (\u0E17\u0E35\u0E48\u0E21\u0E35 OPD > 50 \u0E23\u0E32\u0E22): ${f?`${f.name} \u2014 ${f.orders_per_visit} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07/\u0E23\u0E32\u0E22`:"\u2014"} ${f&&f.orders_per_visit<.2?"\xB7 \u0E2D\u0E32\u0E08\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 Under-investigation \u0E2B\u0E23\u0E37\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23":""}`, `**Lab : X-Ray Ratio** = ${t.xray_orders>0?(t.lab_orders/t.xray_orders).toFixed(1):"\u2014"} : 1 ${t.lab_orders/Math.max(1,t.xray_orders)>10?"\xB7 Lab \u0E40\u0E14\u0E48\u0E19 (\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E01\u0E31\u0E1A NCD/MedOPD)":t.lab_orders/Math.max(1,t.xray_orders)>5?"\xB7 \u0E2A\u0E21\u0E14\u0E38\u0E25":"\xB7 X-Ray \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E01\u0E31\u0E1A Ortho/ER)"}`, "**\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30**: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Clinical Variation \u2014 \u0E04\u0E27\u0E32\u0E21\u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E02\u0E2D\u0E07 Orders/Visit \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E22\u0E30 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E23\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21"],
    color: m && m.orders_per_visit > 2 ? "#f59e0b" : "#0ea5e9"
  }, {
    icon: "\u{1F3E5}",
    title: "5. \u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E01\u0E32\u0E23\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 (Practice Pattern)",
    list: [`**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IPD \u0E08\u0E23\u0E34\u0E07** ${c} \u0E17\u0E48\u0E32\u0E19 (${Math.round(c/Math.max(1,o.length)*100)}%) \u2014 \u0E23\u0E27\u0E21 ${r(t.ipd_admissions)} Admission \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30 OPD (\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A IPD \u0E40\u0E25\u0E22)** ${C} \u0E17\u0E48\u0E32\u0E19 (${Math.round(C/Math.max(1,o.length)*100)}%)`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD-heavy (IPD > 5% \u0E02\u0E2D\u0E07 Visit)** ${z} \u0E17\u0E48\u0E32\u0E19 (${Math.round(z/Math.max(1,o.length)*100)}%) \u2014 \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Admission \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E0A\u0E38\u0E21\u0E0A\u0E19`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C Balanced (\u0E23\u0E31\u0E1A IPD \u0E41\u0E15\u0E48 \u2264 5%)** ${b} \u0E17\u0E48\u0E32\u0E19 (${Math.round(b/Math.max(1,o.length)*100)}%) \u2014 \u0E14\u0E39\u0E41\u0E25\u0E17\u0E31\u0E49\u0E07 OPD \u0E41\u0E25\u0E30 IPD \u0E43\u0E19\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E01\u0E15\u0E34`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${c>=10?`\u0E21\u0E35\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A IPD \u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D (${c} \u0E17\u0E48\u0E32\u0E19)`:c>=5?`\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD \u0E1E\u0E2D\u0E43\u0E0A\u0E49\u0E41\u0E15\u0E48\u0E04\u0E27\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21 (${c} \u0E17\u0E48\u0E32\u0E19)`:`\u26A0 \u0E41\u0E1E\u0E17\u0E22\u0E4C IPD \u0E19\u0E49\u0E2D\u0E22\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (${c} \u0E17\u0E48\u0E32\u0E19) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`}`, `**Cross-coverage**: ${C>o.length*.6?"\u26A0 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A IPD \u2014 \u0E04\u0E27\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 IPD":"\u0E01\u0E32\u0E23\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 OPD/IPD \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"}`],
    color: c < 5 ? "#f43f5e" : C > o.length * .6 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u26A0",
    title: "6. \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E1A\u0E15\u0E32 (Key Risk Signals)",
    list: [`**Top-Doctor Dependency** \u2014 Top 1 \u0E23\u0E31\u0E1A ${Math.round((B?.total_visits||0)/Math.max(1,T)*100)}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22, ${$}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${Math.round((B?.total_visits||0)/Math.max(1,T)*100)>20?"\u26A0 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E2B\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22":"\u2713 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"}`, `**Burnout Risk** \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34 > 1,500 \u0E23\u0E32\u0E22/${p} \u0E27\u0E31\u0E19 \u0E21\u0E35 ${o.filter(i=>i.total_visits>1500).length} \u0E17\u0E48\u0E32\u0E19 ${o.filter(i=>i.total_visits>1500).length>3?"\u26A0 \u0E2B\u0E25\u0E32\u0E22\u0E17\u0E48\u0E32\u0E19\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout \u0E2A\u0E39\u0E07":""}`, `**Workload Inequality (Gini)** = ${P}/100 ${P>50?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07":"\u2713 \u0E1B\u0E01\u0E15\u0E34"} \xB7 \u0E2B\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19 60 \u0E04\u0E27\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E17\u0E31\u0E19\u0E17\u0E35`, `**Clinical Variation** \u2014 \u0E0A\u0E48\u0E27\u0E07 Orders/Visit \u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E15\u0E48\u0E25\u0E30\u0E17\u0E48\u0E32\u0E19\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19 ${m&&f&&f.orders_per_visit>0?Math.round(m.orders_per_visit/Math.max(.01,f.orders_per_visit)):"\u2014"} \u0E40\u0E17\u0E48\u0E32 \u2014 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Appropriateness`, `**Revenue Concentration** \u2014 Top 20% \u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E23\u0E49\u0E32\u0E07 ${_}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${_>80?"\u26A0 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E01\u0E25\u0E38\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E08\u0E33\u0E01\u0E31\u0E14":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35"}`],
    color: P > 50 || $ > 25 ? "#f43f5e" : "#f59e0b"
  }, {
    icon: "\u{1F3AF}",
    title: "7. \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E41\u0E25\u0E30\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E34\u0E07\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23 (Recommendations)",
    list: [g > 100 ? `**\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19** \u2014 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${g} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19) \xB7 \u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E08\u0E49\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21 \u0E2B\u0E23\u0E37\u0E2D\u0E02\u0E22\u0E32\u0E22\u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E02\u0E22\u0E32\u0E22 Sub-specialty` : null, P > 50 ? `**Workload Rebalancing** \u2014 Gini ${P}/100 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E14\u0E38\u0E25 \xB7 \u0E08\u0E31\u0E14 Scheduling \u0E43\u0E2B\u0E49\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E41\u0E25\u0E30\u0E01\u0E33\u0E2B\u0E19\u0E14 Quota \u0E15\u0E48\u0E2D\u0E41\u0E1E\u0E17\u0E22\u0E4C` : null, $ > 25 ? `**\u0E25\u0E14\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor** \u2014 ${B?.name} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${$}% \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E38\u0E48\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E14\u0E41\u0E17\u0E19 (Succession Plan)` : null, m && m.orders_per_visit > 2 ? "**\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway** \u2014 Orders/Visit \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 \xB7 \u0E15\u0E31\u0E49\u0E07 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14 Over-investigation" : null, c < 5 ? `**\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD** \u2014 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E21\u0E35\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A IPD \u0E40\u0E1E\u0E35\u0E22\u0E07 ${c} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19` : null, "**\u0E23\u0E30\u0E1A\u0E1A\u0E41\u0E23\u0E07\u0E08\u0E39\u0E07\u0E43\u0E08 (Incentive)** \u2014 \u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A Bonus \u0E17\u0E35\u0E48\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E25\u0E30\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E (\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27) \xB7 \u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E42\u0E22\u0E07\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14 HA/KPI", "**Cross-training** \u2014 \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E02\u0E32\u0E14\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23 \xB7 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E04\u0E27\u0E23\u0E21\u0E35\u0E17\u0E31\u0E01\u0E29\u0E30\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21 2\u20133 \u0E42\u0E23\u0E04\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2B\u0E25\u0E31\u0E01", "**\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19** \u2014 \u0E43\u0E0A\u0E49 Dashboard \u0E19\u0E35\u0E49\u0E17\u0E1A\u0E17\u0E27\u0E19 Workload Balance \u0E41\u0E25\u0E30 Revenue Concentration \u0E40\u0E1B\u0E47\u0E19\u0E1B\u0E23\u0E30\u0E08\u0E33"].filter(Boolean),
    color: "#7c3aed"
  }];
  return {
    headline: M,
    headlineColor: D,
    kpi: [{
      label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48",
      value: r(l),
      sub: `OPD ${l} \xB7 IPD ${t.ipd_doctors||0}`,
      color: "#0284c7"
    }, {
      label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 OPD",
      value: r(A),
      sub: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${g} \xB7 Median ${S}`,
      color: "#7c3aed"
    }, {
      label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IPD",
      value: r(t.ipd_admissions),
      sub: `\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD ${t.ipd_doctors||0} \u0E17\u0E48\u0E32\u0E19`,
      color: "#db2777"
    }, {
      label: "Gini Coefficient",
      value: `${P}/100`,
      sub: P > 50 ? "\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07" : P > 35 ? "\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E2A\u0E21\u0E14\u0E38\u0E25",
      color: P > 50 ? "#f43f5e" : P > 35 ? "#f59e0b" : "#10b981"
    }, {
      label: "Top 20% Share",
      value: `${_}%`,
      sub: _ > 80 ? "Pareto \u2014 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E39\u0E07" : "\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E01\u0E15\u0E34",
      color: _ > 80 ? "#f59e0b" : "#10b981"
    }, {
      label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
      value: `\u0E3F${r(Math.round(x))}`,
      sub: `Top 1: ${$}%`,
      color: "#10b981"
    }],
    sections: h,
    footerLeft: `${o.length} \u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 ${E.period.days?`\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${E.period.days} \u0E27\u0E31\u0E19`:`${E.period.start} \u2192 ${E.period.end}`} \xB7 HOSxP XE \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function g0(E) {
  if (!E?.summary || !E?.dentists) return {
    headline: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \u2014 AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E30\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E40\u0E21\u0E37\u0E48\u0E2D data \u0E1E\u0E23\u0E49\u0E2D\u0E21",
    empty: !0
  };
  const t = E.dentists || [],
    o = E.summary.dental_doctors || 0,
    l = E.summary.total_dentists || 0,
    A = E.summary.dental_visits || 0,
    g = E.summary.dental_revenue || 0,
    x = E.period?.days || (E.period?.start && E.period?.end ? Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1) : 30);
  if (!t.length) return {
    headline: `\u2014 \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07${x>1?` ${x} \u0E27\u0E31\u0E19`:"\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"} \u2014 \u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E47\u0E19\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E1F\u0E31\u0E19 \u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 case \u0E1C\u0E48\u0E32\u0E19\u0E23\u0E30\u0E1A\u0E1A`,
    headlineColor: "#94a3b8",
    kpi: [],
    sections: [{
      icon: "\u2139\uFE0F",
      title: "\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49",
      list: ["**\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01** \u2014 \u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E2D\u0E32\u0E08\u0E1B\u0E34\u0E14\u0E17\u0E33\u0E01\u0E32\u0E23\u0E43\u0E19\u0E27\u0E31\u0E19\u0E40\u0E2A\u0E32\u0E23\u0E4C-\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C \u0E2B\u0E23\u0E37\u0E2D\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23", '**\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E40\u0E27\u0E25\u0E32\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23** \u2014 \u0E16\u0E49\u0E32\u0E14\u0E39\u0E0A\u0E48\u0E27\u0E07 "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49" \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E0A\u0E49\u0E32\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E1B\u0E34\u0E14\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E08\u0E30\u0E22\u0E31\u0E07\u0E40\u0E1B\u0E47\u0E19 0', "**Refer-out** \u2014 Case \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E17\u0E35\u0E48\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E2D\u0E32\u0E08\u0E16\u0E39\u0E01\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D\u0E44\u0E1B\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2D\u0E37\u0E48\u0E19", `**\u0E25\u0E2D\u0E07\u0E40\u0E25\u0E37\u0E2D\u0E01 "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"** \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27 \u2014 \u0E21\u0E35\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C ${l} \u0E17\u0E48\u0E32\u0E19\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A`],
      color: "#06b6d4"
    }],
    footerLeft: `${l} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49`
  };
  const p = o > 0 ? Math.round(A / o) : 0,
    s = Math.round(A / Math.max(1, x) / Math.max(1, o) * 10) / 10,
    I = [...t].sort((a, _) => (_.opd_visits || 0) - (a.opd_visits || 0))[0],
    j = Math.round(Q(t.map(a => a.opd_visits || 0))),
    d = Math.max(...t.map(a => a.opd_visits || 0)),
    W = Math.min(...t.map(a => a.opd_visits || 0)),
    B = [...t].sort((a, _) => (_.total_revenue || 0) - (a.total_revenue || 0))[0],
    S = g > 0 ? Math.round((B.total_revenue || 0) / g * 100) : 0,
    H = Math.round(Q(t.map(a => a.revenue_per_visit || 0).filter(a => a > 0))),
    v = Math.round(q(t.map(a => a.opd_visits || 0)) * 100),
    F = Math.round(q(t.map(a => a.total_revenue || 0)) * 100),
    T = t.reduce((a, _) => a + (_.lab_orders || 0) + (_.xray_orders || 0), 0),
    L = A > 0 ? (T / A).toFixed(2) : "0.00",
    $ = l > 0 ? Math.round(o / l * 100) : 0;
  let w, O;
  s > 30 ? (w = `\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07 \u2014 ${o} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${s} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 (\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 20-30 \u0E40\u0E04\u0E2A) \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout`, O = "#f43f5e") : S > 35 ? (w = `\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top 1 \u0E2A\u0E39\u0E07 \u2014 ${B.name} = ${S}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2B\u0E32\u0E01\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22`, O = "#f59e0b") : $ < 60 && l >= 3 ? (w = `\u26A0 Utilization \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E15\u0E48\u0E33 \u2014 ${o}/${l} \u0E17\u0E48\u0E32\u0E19 (${$}%) \u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 rebalance \u0E15\u0E32\u0E23\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01`, O = "#f59e0b") : (w = `\u2713 \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C ${o}/${l} \u0E17\u0E48\u0E32\u0E19 \xB7 ${r(A)} \u0E40\u0E04\u0E2A \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${p} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${v}/100 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(Math.round(g))}`, O = "#10b981");
  const G = [{
    icon: "\u{1F9B7}",
    title: "1. \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
    list: [`**\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19** ${o}/${l} \u0E17\u0E48\u0E32\u0E19 (${$}% \u0E02\u0E2D\u0E07 roster) \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${x} \u0E27\u0E31\u0E19`, `**\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${p} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07** ${j} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14** ${r(d)} (${I?.name||"\u2014"}) \xB7 **\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** ${r(W)}`, `**\u0E20\u0E32\u0E23\u0E30\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19** \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${s} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 ${s>30?"\u26A0 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 20-30 \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout":s>20?"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19":"\xB7 \u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49 \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"}`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E17\u0E48\u0E32\u0E19** = ${W>0?Math.round(d/Math.max(1,W)):d>0?"\u2014":"1"} \u0E40\u0E17\u0E48\u0E32 ${d>0&&W>0&&d/W>5?"\xB7 \u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"}`],
    color: s > 30 ? "#f43f5e" : s > 20 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4CA}",
    title: "2. \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (Gini Analysis)",
    list: [`**Gini \u0E40\u0E04\u0E2A** = ${v}/100 \xB7 ${v>50?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07 \u2014 Case \u0E42\u0E2B\u0E25\u0E14\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E32\u0E07\u0E17\u0E48\u0E32\u0E19":v>35?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"}`, `**Gini \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49** = ${F}/100 \xB7 ${F>50?"\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top \u0E19\u0E49\u0E2D\u0E22\u0E04\u0E19":F>35?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"}`, `**Top 1 (${B?.name||"\u2014"})** \u0E23\u0E31\u0E1A ${Math.round((I?.opd_visits||0)/Math.max(1,A)*100)}% \u0E02\u0E2D\u0E07\u0E40\u0E04\u0E2A \xB7 ${S}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B**: ${v>50||S>35?"\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E49\u0E2D\u0E22\u0E2A\u0E39\u0E07 \u2014 \u0E04\u0E27\u0E23\u0E25\u0E07\u0E17\u0E38\u0E19 scheduling \u0E43\u0E2B\u0E21\u0E48\u0E41\u0E25\u0E30\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`],
    color: v > 50 || S > 35 ? "#f43f5e" : v > 35 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4B0}",
    title: "3. \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (Revenue Efficiency)",
    list: [`**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21** \u0E3F${r(Math.round(g))} \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u0E3F${r(Math.round(g/Math.max(1,o)))}/\u0E17\u0E48\u0E32\u0E19`, `**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E40\u0E04\u0E2A (Revenue per Case)** \u2014 \u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(H)}/\u0E40\u0E04\u0E2A \xB7 Top Earner: ${B?.name||"\u2014"} \u0E3F${r(B?.revenue_per_visit||0)}/\u0E40\u0E04\u0E2A`, `**Top Earner \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21** ${B?.name||"\u2014"} = \u0E3F${r(Math.round(B?.total_revenue||0))} (${S}%) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E40\u0E04\u0E2A \u0E3F${r(B?.revenue_per_visit||0)}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${S>40?"\u26A0 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Dentist \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B":S>25?"\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Dentist \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35 \u0E44\u0E21\u0E48\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E40\u0E14\u0E35\u0E22\u0E27"}`],
    color: S > 40 ? "#f43f5e" : S > 25 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F9EA}",
    title: "4. \u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 (Order Management)",
    list: [`**Lab Orders \u0E23\u0E27\u0E21** ${r(t.reduce((a,_)=>a+(_.lab_orders||0),0))} \xB7 **X-Ray Orders \u0E23\u0E27\u0E21** ${r(t.reduce((a,_)=>a+(_.xray_orders||0),0))} \xB7 **Orders/\u0E40\u0E04\u0E2A \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${L}`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E31\u0E07\u0E40\u0E01\u0E15**: \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E43\u0E0A\u0E49 X-Ray (Panoramic, Bitewing, Periapical) \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 Lab \xB7 Orders/Case ${parseFloat(L)>.8?"\u0E2A\u0E39\u0E07 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A X-Ray indication":parseFloat(L)>.3?"\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C":"\u0E15\u0E48\u0E33 \u2014 \u0E2D\u0E32\u0E08\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 routine treatment \u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E15\u0E49\u0E2D\u0E07 imaging"}`, "**\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30**: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Clinical Variation \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 Orders/Case \u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19\u0E21\u0E32\u0E01 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E23\u0E08\u0E31\u0E14 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21"],
    color: "#0ea5e9"
  }, {
    icon: "\u{1F3AF}",
    title: "5. \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
    list: [$ < 60 && l >= 3 ? `**Rebalance \u0E15\u0E32\u0E23\u0E32\u0E07** \u2014 ${o}/${l} \u0E17\u0E48\u0E32\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 (${$}%) \xB7 \u0E2D\u0E32\u0E08\u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E43\u0E2B\u0E49\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48 active \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30` : null, S > 35 ? `**\u0E25\u0E14\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top 1** \u2014 ${B?.name} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${S}% \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E48\u0E32\u0E19\u0E2D\u0E37\u0E48\u0E19\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E14\u0E41\u0E17\u0E19 (Succession Plan)` : null, v > 50 ? `**Workload Rebalancing** \u2014 Gini ${v}/100 \xB7 \u0E08\u0E31\u0E14 Scheduling \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E40\u0E04\u0E2A\u0E41\u0E25\u0E30\u0E01\u0E33\u0E2B\u0E19\u0E14 Quota` : null, s > 30 ? `**\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19** \u2014 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${s} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C part-time \u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E37\u0E14\u0E40\u0E27\u0E25\u0E32 per-case` : null, "**Recall Program** \u2014 \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E21\u0E35\u0E28\u0E31\u0E01\u0E22\u0E20\u0E32\u0E1E recall \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E14\u0E34\u0E21 (\u0E02\u0E39\u0E14\u0E2B\u0E34\u0E19\u0E1B\u0E39\u0E19 6 \u0E40\u0E14\u0E37\u0E2D\u0E19, \u0E1F\u0E31\u0E19\u0E1C\u0E38\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 3 \u0E40\u0E14\u0E37\u0E2D\u0E19) \xB7 \u0E0A\u0E48\u0E27\u0E22\u0E23\u0E31\u0E01\u0E29\u0E32\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 stable", "**\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C** \u2014 \u0E14\u0E39 Trends \u0E41\u0E25\u0E30 Utilization \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \xB7 \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E1B\u0E47\u0E19 7 \u0E27\u0E31\u0E19/30 \u0E27\u0E31\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E2B\u0E47\u0E19 pattern"].filter(Boolean),
    color: "#7c3aed"
  }];
  return {
    headline: w,
    headlineColor: O,
    kpi: [],
    sections: G,
    footerLeft: `${t.length} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 ${E.period.days?`\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${E.period.days} \u0E27\u0E31\u0E19`:`${E.period.start} \u2192 ${E.period.end}`} \xB7 HOSxP XE \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function l0({
  rec: E
}) {
  const t = {
      P0: {
        bg: "rgba(220,38,38,.1)",
        color: "#dc2626",
        label: "P0 \xB7 \u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19"
      },
      P1: {
        bg: "rgba(245,158,11,.1)",
        color: "#d97706",
        label: "P1 \xB7 \u0E2A\u0E33\u0E04\u0E31\u0E0D"
      },
      P2: {
        bg: "rgba(59,130,246,.1)",
        color: "#2563eb",
        label: "P2 \xB7 \u0E1B\u0E01\u0E15\u0E34"
      }
    } [E.priority] || {
      bg: "rgba(107,114,128,.1)",
      color: "#6b7280",
      label: "R \xB7 \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B"
    },
    o = l => u.jsx("div", {
      style: {
        fontSize: "10px",
        fontWeight: 800,
        color: "var(--md-text-tertiary)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "3px"
      },
      children: l
    });
  return u.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderLeft: `4px solid ${E.color}`,
      borderRadius: "10px",
      padding: "14px 18px"
    },
    children: [u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
        flexWrap: "wrap"
      },
      children: [u.jsx("span", {
        style: {
          fontSize: "18px"
        },
        children: E.icon
      }), u.jsx("span", {
        style: {
          fontSize: "13px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: E.title
      }), u.jsx("span", {
        style: {
          fontSize: "10px",
          fontWeight: 800,
          padding: "3px 10px",
          borderRadius: "99px",
          background: t.bg,
          color: t.color,
          letterSpacing: "0.03em"
        },
        children: t.label
      }), E.timeline && u.jsxs("span", {
        style: {
          fontSize: "10px",
          fontWeight: 600,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(107,114,128,.08)",
          color: "var(--md-text-secondary)"
        },
        children: ["\u23F1 ", E.timeline]
      })]
    }), E.situation && u.jsxs("div", {
      style: {
        marginBottom: "10px"
      },
      children: [o("\u{1F4CC} \u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"), u.jsx("div", {
        style: {
          fontSize: "12px",
          lineHeight: 1.7,
          color: "var(--md-text-primary)",
          fontWeight: 500
        },
        children: E.situation
      })]
    }), E.rootCause && u.jsxs("div", {
      style: {
        marginBottom: "10px",
        padding: "8px 12px",
        background: "rgba(245,158,11,.04)",
        borderRadius: "8px"
      },
      children: [o("\u{1F50D} \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 (Root Cause Hypothesis)"), u.jsx("div", {
        style: {
          fontSize: "12px",
          lineHeight: 1.7,
          color: "var(--md-text-primary)",
          fontWeight: 500
        },
        children: E.rootCause
      })]
    }), E.actions && E.actions.length > 0 && u.jsxs("div", {
      style: {
        marginBottom: "10px"
      },
      children: [o("\u{1F3AF} \u0E41\u0E1C\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23 (Action Plan)"), u.jsx("ol", {
        style: {
          margin: "4px 0 0 0",
          paddingLeft: "20px"
        },
        children: E.actions.map((l, A) => u.jsx("li", {
          style: {
            fontSize: "12px",
            lineHeight: 1.7,
            color: "var(--md-text-primary)",
            fontWeight: 500,
            marginBottom: "4px"
          },
          dangerouslySetInnerHTML: {
            __html: l.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
          }
        }, A))
      })]
    }), u.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "8px"
      },
      children: [E.target && u.jsxs("div", {
        style: {
          padding: "8px 12px",
          background: "rgba(16,185,129,.06)",
          borderRadius: "8px",
          borderLeft: "2px solid #10b981"
        },
        children: [o("\u2705 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 / KPI"), u.jsx("div", {
          style: {
            fontSize: "11.5px",
            lineHeight: 1.6,
            color: "var(--md-text-primary)",
            fontWeight: 600
          },
          children: E.target
        })]
      }), E.owner && u.jsxs("div", {
        style: {
          padding: "8px 12px",
          background: "rgba(124,58,237,.04)",
          borderRadius: "8px",
          borderLeft: "2px solid #7c3aed"
        },
        children: [o("\u{1F465} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A"), u.jsx("div", {
          style: {
            fontSize: "11.5px",
            lineHeight: 1.6,
            color: "var(--md-text-primary)",
            fontWeight: 600
          },
          children: E.owner
        })]
      }), E.expectedOutcome && u.jsxs("div", {
        style: {
          padding: "8px 12px",
          background: "rgba(14,165,233,.04)",
          borderRadius: "8px",
          borderLeft: "2px solid #0ea5e9"
        },
        children: [o("\u{1F381} \u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E17\u0E35\u0E48\u0E04\u0E32\u0E14\u0E2B\u0E27\u0E31\u0E07"), u.jsx("div", {
          style: {
            fontSize: "11.5px",
            lineHeight: 1.6,
            color: "var(--md-text-primary)",
            fontWeight: 600
          },
          children: E.expectedOutcome
        })]
      })]
    })]
  })
}

function A0({
  doctor: E,
  analysis: t,
  rank: o
}) {
  const l = (g, x, p, s) => u.jsxs("div", {
      style: {
        flex: "1 1 180px",
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderTop: `3px solid ${s}`,
        borderRadius: "10px",
        padding: "10px 14px"
      },
      children: [u.jsx("div", {
        style: {
          fontSize: "10px",
          fontWeight: 700,
          color: "var(--md-text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.04em"
        },
        children: g
      }), u.jsx("div", {
        style: {
          fontSize: "16px",
          fontWeight: 900,
          color: "var(--md-text-primary)",
          marginTop: "2px"
        },
        children: x
      }), p && u.jsx("div", {
        style: {
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--md-text-tertiary)",
          marginTop: "2px"
        },
        children: p
      })]
    }),
    A = (g, x, p, s) => u.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderLeft: `3px solid ${s}`,
        borderRadius: "10px",
        padding: "10px 14px",
        flex: "1 1 300px",
        minWidth: "300px"
      },
      children: [u.jsxs("div", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)",
          marginBottom: "6px"
        },
        children: [g, " ", x]
      }), p.length === 0 ? u.jsx("div", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 500
        },
        children: "\u2014 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E35\u0E49 \u2014"
      }) : u.jsx("ul", {
        style: {
          margin: 0,
          paddingLeft: "18px"
        },
        children: p.map((I, j) => u.jsx("li", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-primary)",
            lineHeight: 1.6,
            fontWeight: 500,
            marginBottom: "3px"
          },
          children: I
        }, j))
      })]
    });
  return u.jsxs("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    },
    children: [u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [u.jsx("div", {
        style: {
          width: "3px",
          height: "20px",
          background: "linear-gradient(180deg, #0284c7, #7c3aed)",
          borderRadius: "99px"
        }
      }), u.jsxs("div", {
        style: {
          fontSize: "13px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: ["\u{1F50D} \u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01 \u2014 ", E.name || E.code]
      }), u.jsxs("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(2,132,199,.1)",
          color: "#0284c7"
        },
        children: ["\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ", o, " \xB7 Percentile ", t.visitPercentile]
      })]
    }), u.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      },
      children: [l("\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E01\u0E32\u0E23\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34 (Pattern)", t.pattern, "IPD:OPD ratio", t.patternColor), l("\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19", t.workloadLevel, `${t.dailyVisits.toFixed(1)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19`, t.workloadColor), l("\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08", t.ordEff, `Orders/Visit = ${E.orders_per_visit} (\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 ${t.medOrdersPerVisit.toFixed(2)})`, "#0ea5e9"), l("\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", t.revEff, `\u0E3F${r(E.revenue_per_visit)}/\u0E23\u0E32\u0E22 (\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(Math.round(t.medRevPerVisit))})`, "#10b981")]
    }), u.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      },
      children: [A("\u2705", "\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19 (Strengths)", t.strengths, "#10b981"), A("\u26A0", "\u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19\u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 (Concerns)", t.concerns, "#f59e0b"), A("\u{1F3AF}", "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E1A\u0E38\u0E04\u0E04\u0E25", t.recs, "#7c3aed")]
    }), t.deepRecs && t.deepRecs.length > 0 && u.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      },
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "4px"
        },
        children: [u.jsx("span", {
          style: {
            fontSize: "14px"
          },
          children: "\u{1F9E0}"
        }), u.jsxs("span", {
          style: {
            fontSize: "13px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: ["AI \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01 \u2014 \u0E41\u0E1C\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34 (", t.deepRecs.length, " \u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19)"]
        }), u.jsx("span", {
          style: {
            fontSize: "10px",
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: "99px",
            background: "rgba(124,58,237,.1)",
            color: "#7c3aed"
          },
          children: "Rule-based AI \xB7 Evidence-informed"
        })]
      }), t.deepRecs.map((g, x) => u.jsx(l0, {
        rec: g
      }, x))]
    }), u.jsxs("div", {
      style: {
        background: "rgba(2,132,199,.04)",
        border: "1px dashed rgba(2,132,199,.2)",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "12px",
        lineHeight: 1.7,
        color: "var(--md-text-primary)",
        fontWeight: 500
      },
      children: [u.jsx("b", {
        children: "\u{1F4DD} \u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E0A\u0E34\u0E07\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23:"
      }), " ", E.name || E.code, " \u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E43\u0E19\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A ", u.jsx("b", {
        children: t.pattern
      }), " \xB7 \u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 OPD ", r(E.opd_visits), " \u0E23\u0E32\u0E22 \xB7 IPD ", r(E.ipd_admissions), " \u0E23\u0E32\u0E22 \xB7 \u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 Lab ", r(E.lab_orders), " \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07 \xB7 X-Ray ", r(E.xray_orders), " \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F", r(E.total_revenue), " (\u0E3F", r(E.revenue_per_visit), "/\u0E23\u0E32\u0E22) \xB7 \u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 ", t.visitRank, "/", t.totalDoctors, " \xB7 \u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ", t.revRank, "/", t.totalDoctors, " \xB7 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19", u.jsx("b", {
        style: {
          color: t.workloadColor
        },
        children: t.workloadLevel
      }), " \xB7 Orders/Visit ", t.ordEff, " \xB7 Revenue/Visit ", t.revEff, " \xB7 ", t.strengths.length > 0 ? `\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19 ${t.strengths.length} \u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19` : "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19\u0E40\u0E14\u0E48\u0E19\u0E0A\u0E31\u0E14", " \xB7 ", t.concerns.length > 0 ? `\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 ${t.concerns.length} \u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19` : "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19\u0E19\u0E48\u0E32\u0E01\u0E31\u0E07\u0E27\u0E25"]
    })]
  })
}

function B0() {
  const [E, t] = R.useState(null), [o, l] = R.useState(!0), [A, g] = R.useState(null), [x, p] = R.useState("today"), [s, I] = R.useState(1), [j, d] = R.useState(Y()), [W, B] = R.useState(Y()), [S, H] = R.useState("total_visits"), [v, F] = R.useState(() => new Set), [T, L] = R.useState(!1), [$, w] = R.useState(null), [O, G] = R.useState(() => new Set), [a, _] = R.useState(!1), J = R.useCallback(e => {
    F(n => {
      const y = new Set(n);
      return y.has(e) ? y.delete(e) : y.add(e), y
    })
  }, []), P = R.useCallback(async () => {
    l(!0), g(null);
    try {
      const e = Y(),
        n = E0(new Date(Date.now() - 864e5)),
        y = (() => {
          const z = new Date;
          return z.setDate(1), E0(z)
        })();
      let m;
      switch (x) {
        case "today":
          m = "days=1";
          break;
        case "yesterday":
          m = `start=${n}&end=${n}`;
          break;
        case "mtd":
          m = `start=${y}&end=${e}`;
          break;
        case "7d":
          m = "days=7";
          break;
        case "30d":
          m = "days=30";
          break;
        case "custom":
          m = `start=${j}&end=${W}`;
          break;
        default:
          m = "days=1"
      }
      const f = await fetch(`/api/doctor/activity-summary?${m}`, {
        credentials: "include"
      });
      if (!f.ok) throw new Error(`HTTP ${f.status}`);
      const V = await f.json();
      t(V)
    } catch (e) {
      g(e.message)
    }
    l(!1)
  }, [x, s, j, W]);
  R.useEffect(() => {
    P()
  }, [P]);
  const K = R.useMemo(() => E?.doctors ? [...E.doctors].sort((e, n) => (n[S] || 0) - (e[S] || 0)) : [], [E, S]),
    X = R.useMemo(() => K.length ? K.slice(0, 3).map(e => ({
      name: (e.name || "").replace(/^(นพ\.|พญ\.|ศ\.|รศ\.|ผศ\.)/, ""),
      OPD: e.opd_visits,
      IPD: e.ipd_admissions,
      Orders: e.total_orders
    })) : [], [K]),
    U = R.useMemo(() => {
      const e = (E?.dentists || []).slice().sort((n, y) => (y.opd_visits || 0) - (n.opd_visits || 0));
      return e.length ? e.slice(0, 3).map(n => ({
        name: (n.name || "").replace(/^(ทพ\.|ทพญ\.)/, ""),
        OPD: n.opd_visits || 0,
        Orders: (n.lab_orders || 0) + (n.xray_orders || 0)
      })) : []
    }, [E]),
    N = R.useMemo(() => E?.trend_7d ? E.trend_7d.map(e => ({
      date: new Date(e.date).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short"
      }),
      doctors: e.doctors,
      visits: e.visits
    })) : [], [E]);
  return u.jsxs("div", {
    className: "space-y-5 animate-fade-in pb-10",
    children: [u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [u.jsx("div", {
        style: {
          width: "4px",
          height: "24px",
          background: "linear-gradient(180deg, #0284c7, #7c3aed)",
          borderRadius: "99px"
        }
      }), u.jsx("h2", {
        style: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "\u{1F468}\u200D\u2695\uFE0F \u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E25\u0E30\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C"
      }), u.jsx("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(2,132,199,.1)",
          color: "#0284c7"
        },
        children: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 \xB7 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 \xB7 \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
      })]
    }), u.jsxs("div", {
      className: "rounded-2xl p-4",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap"
      },
      children: [u.jsxs("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px"
        },
        children: ["\u{1F4C5}", " \u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"]
      }), ...[{
        k: "today",
        label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"
      }, {
        k: "yesterday",
        label: "\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19"
      }, {
        k: "mtd",
        label: "MTD (\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49)"
      }, {
        k: "7d",
        label: "7 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
      }, {
        k: "30d",
        label: "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
      }, {
        k: "custom",
        label: "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E2D\u0E07"
      }].map(e => u.jsx("button", {
        type: "button",
        onClick: () => p(e.k),
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          border: x === e.k ? "none" : "1px solid var(--md-border)",
          fontSize: "12px",
          fontWeight: 800,
          cursor: "pointer",
          background: x === e.k ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "var(--md-bg)",
          color: x === e.k ? "#fff" : "var(--md-text-secondary)",
          transition: "all 0.15s",
          boxShadow: x === e.k ? "0 2px 8px rgba(2,132,199,.25)" : "none"
        },
        children: e.label
      }, e.k)), x === "custom" && u.jsxs("div", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginLeft: "4px",
          paddingLeft: "8px",
          borderLeft: "1px solid var(--md-border)"
        },
        children: [u.jsx("input", {
          type: "date",
          value: j,
          max: W,
          onChange: e => d(e.target.value),
          style: {
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "13px",
            fontWeight: 700,
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          }
        }), u.jsx("span", {
          style: {
            fontSize: "12px",
            fontWeight: 700,
            color: "var(--md-text-tertiary)"
          },
          children: "\u0E16\u0E36\u0E07"
        }), u.jsx("input", {
          type: "date",
          value: W,
          min: j,
          max: Y(),
          onChange: e => B(e.target.value),
          style: {
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "13px",
            fontWeight: 700,
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          }
        })]
      })]
    }), A && u.jsxs("div", {
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(239,68,68,.08)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: ["\u26A0 ", A]
    }), o && u.jsx("div", {
      className: "rounded-2xl p-8 animate-pulse",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        textAlign: "center"
      },
      children: u.jsx("div", {
        style: {
          fontSize: "14px",
          color: "var(--md-text-tertiary)",
          fontWeight: 700
        },
        children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C..."
      })
    }), !o && E && (() => {
      const e = h0(E);
      if (!e) return null;
      const n = ["all_doctors", "doctors", "opd", "ipd", "gini", "top20", "revenue", "all_dentists", "dentists", "dentists", "dentists"],
        y = [];
      E.summary && E.summary.total_doctors !== void 0 && y.push({
        label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
        value: r(E.summary.total_doctors || 0),
        sub: `active \u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A \xB7 \u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 ${E.summary.opd_doctors||0} \u0E17\u0E48\u0E32\u0E19`,
        color: "#1e40af"
      }), y.push(...e.kpi || []), E.summary && E.summary.dental_doctors !== void 0 && y.push({
        label: "\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
        value: r(E.summary.total_dentists || 0),
        sub: `active \u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A \xB7 \u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 ${E.summary.dental_doctors||0} \u0E17\u0E48\u0E32\u0E19`,
        color: "#0e7490"
      }, {
        label: "\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48",
        value: r(E.summary.dental_doctors || 0),
        sub: `${(E.dentists||[]).length} \u0E17\u0E48\u0E32\u0E19 active`,
        color: "#06b6d4"
      }, {
        label: "\u0E40\u0E04\u0E2A\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 OPD",
        value: r(E.summary.dental_visits || 0),
        sub: "\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49",
        color: "#0ea5e9"
      }, {
        label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
        value: `\u0E3F${r(Math.round(E.summary.dental_revenue||0))}`,
        sub: "\u0E23\u0E27\u0E21\u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19",
        color: "#10b981"
      });
      const m = y.slice(0, 7),
        f = y.slice(7),
        V = (C, c, b) => u.jsxs("div", {
          onClick: () => w(n[b]),
          role: "button",
          tabIndex: 0,
          onKeyDown: M => {
            (M.key === "Enter" || M.key === " ") && (M.preventDefault(), w(n[b]))
          },
          style: {
            background: "var(--md-surface)",
            border: $ === n[b] ? `2px solid ${C.color||"#7c3aed"}` : "1px solid var(--md-border)",
            borderTop: `3px solid ${C.color||"#7c3aed"}`,
            borderRadius: "10px",
            padding: "10px 12px",
            minWidth: 0,
            cursor: "pointer",
            transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
            outline: "none"
          },
          onMouseEnter: M => {
            M.currentTarget.style.transform = "translateY(-1px)", M.currentTarget.style.boxShadow = `0 4px 12px ${C.color||"#7c3aed"}40`
          },
          onMouseLeave: M => {
            M.currentTarget.style.transform = "", M.currentTarget.style.boxShadow = ""
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "11px",
              fontWeight: 800,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            children: C.label
          }), u.jsx("div", {
            style: {
              fontSize: "17px",
              fontWeight: 900,
              color: C.accent || C.color || "#7c3aed",
              lineHeight: 1.1
            },
            children: C.value
          }), u.jsx("div", {
            style: {
              fontSize: "11px",
              color: "var(--md-text-tertiary)",
              marginTop: "3px",
              fontWeight: 600
            },
            children: `${C.sub||""} \xB7 \u{1F50D} \u0E04\u0E25\u0E34\u0E01\u0E14\u0E39`
          })]
        }, b),
        z = (C, c, b) => u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
            marginTop: "4px"
          },
          children: [u.jsx("div", {
            style: {
              width: "4px",
              height: "18px",
              background: b,
              borderRadius: "99px"
            }
          }), u.jsxs("div", {
            style: {
              fontSize: "13px",
              fontWeight: 900,
              color: "var(--md-text-primary)",
              letterSpacing: "0.02em"
            },
            children: [C, " ", c]
          })]
        });
      return u.jsxs(R.Fragment, {
        children: [u.jsxs("div", {
          style: {
            marginTop: "16px",
            padding: "14px 16px 16px 16px",
            background: "linear-gradient(135deg, rgba(2,132,199,.08), rgba(2,132,199,.02))",
            border: "2px solid rgba(2,132,199,.35)",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(2,132,199,.06)"
          },
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "12px",
              flexWrap: "wrap"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "6px",
                  height: "26px",
                  background: "linear-gradient(180deg, #0284c7, #0369a1)",
                  borderRadius: "99px"
                }
              }), u.jsx("div", {
                style: {
                  fontSize: "11px",
                  fontWeight: 900,
                  color: "#0284c7",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase"
                },
                children: "Section 1"
              }), u.jsx("div", {
                style: {
                  fontSize: "15px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)"
                },
                children: "\u{1F468}\u200D\u2695\uFE0F \u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C"
              })]
            }), u.jsxs("div", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: "99px",
                background: "rgba(2,132,199,.15)",
                color: "#0284c7"
              },
              children: [m.length, " KPI"]
            })]
          }), u.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "10px"
            },
            children: m.map((C, c) => V(C, c, c))
          })]
        }), f.length > 0 && u.jsxs("div", {
          style: {
            marginTop: "16px",
            padding: "14px 16px 16px 16px",
            background: "linear-gradient(135deg, rgba(6,182,212,.08), rgba(6,182,212,.02))",
            border: "2px solid rgba(6,182,212,.4)",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(6,182,212,.06)"
          },
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "12px",
              flexWrap: "wrap"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "6px",
                  height: "26px",
                  background: "linear-gradient(180deg, #06b6d4, #0891b2)",
                  borderRadius: "99px"
                }
              }), u.jsx("div", {
                style: {
                  fontSize: "11px",
                  fontWeight: 900,
                  color: "#06b6d4",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase"
                },
                children: "Section 2"
              }), u.jsx("div", {
                style: {
                  fontSize: "15px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)"
                },
                children: "\u{1F9B7} \u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C"
              })]
            }), u.jsxs("div", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: "99px",
                background: "rgba(6,182,212,.15)",
                color: "#0891b2"
              },
              children: [f.length, " KPI"]
            })]
          }), u.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "10px"
            },
            children: f.map((C, c) => V(C, c, c + 7))
          })]
        }), !1, $ && u.jsxs("div", {
          ref: C => {
            C && setTimeout(() => C.scrollIntoView({
              behavior: "smooth",
              block: "nearest"
            }), 50)
          },
          style: {
            marginTop: "12px"
          },
          children: [u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "3px solid #0284c7",
              borderRadius: "16px",
              width: "100%",
              maxHeight: "75vh",
              overflow: "auto",
              boxShadow: "0 12px 40px rgba(2,132,199,.35)"
            },
            children: (() => {
              const C = {
                  doctors: {
                    title: "\u{1F468}\u200D\u2695\uFE0F \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49",
                    color: "#0284c7",
                    sortKey: "total_visits",
                    showCols: ["opd", "ipd", "orders", "rev"],
                    desc: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21 OPD \u0E2B\u0E23\u0E37\u0E2D IPD \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21"
                  },
                  opd: {
                    title: "\u{1F3E5} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (OPD) \u2014 \u0E23\u0E32\u0E22\u0E41\u0E1E\u0E17\u0E22\u0E4C",
                    color: "#7c3aed",
                    sortKey: "opd_visits",
                    showCols: ["opd", "orders", "rev"],
                    desc: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 OPD \u0E17\u0E35\u0E48\u0E41\u0E15\u0E48\u0E25\u0E30\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E15\u0E23\u0E27\u0E08\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49"
                  },
                  ipd: {
                    title: "\u{1F6CF}\uFE0F \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD) \u2014 \u0E23\u0E32\u0E22\u0E41\u0E1E\u0E17\u0E22\u0E4C",
                    color: "#db2777",
                    sortKey: "ipd_admissions",
                    showCols: ["ipd", "rev"],
                    filter: h => h.ipd_admissions > 0,
                    desc: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A admit \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49"
                  },
                  gini: {
                    title: "\u{1F4CA} Gini Coefficient \u2014 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19",
                    color: "#0ea5e9",
                    sortKey: "total_visits",
                    asc: !0,
                    showCols: ["opd", "ipd", "total"],
                    desc: "\u0E40\u0E23\u0E35\u0E22\u0E07\u0E08\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E20\u0E32\u0E23\u0E30\u0E19\u0E49\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14\u0E44\u0E1B\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 (Lorenz order). \u0E40\u0E01\u0E13\u0E11\u0E4C: 0-30 \u0E2A\u0E21\u0E14\u0E38\u0E25 \xB7 31-50 \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \xB7 >50 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33"
                  },
                  top20: {
                    title: "\u{1F3C6} Top 20% Share \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
                    color: "#f59e0b",
                    sortKey: "total_visits",
                    limit: Math.max(1, Math.ceil((E.doctors || []).length * .2)),
                    showCols: ["opd", "ipd", "total", "rev"],
                    desc: "\u0E41\u0E1E\u0E17\u0E22\u0E4C Top 20% \u2014 \u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 workload \u0E2A\u0E39\u0E07"
                  },
                  revenue: {
                    title: "\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u2014 \u0E23\u0E32\u0E22\u0E41\u0E1E\u0E17\u0E22\u0E4C",
                    color: "#10b981",
                    sortKey: "total_revenue",
                    showCols: ["opd", "ipd", "opdRev", "ipdRev", "rev"],
                    desc: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E35\u0E48\u0E41\u0E15\u0E48\u0E25\u0E30\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E23\u0E49\u0E32\u0E07 (OPD + IPD)"
                  },
                  dentists: {
                    title: "\u{1F9B7} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49",
                    color: "#06b6d4",
                    sortKey: "opd_visits",
                    showCols: ["opd", "orders", "rev"],
                    desc: "\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E04\u0E2A OPD \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
                    dataKey: "dentists"
                  },
                  all_doctors: {
                    title: "\u{1F468}\u200D\u2695\uFE0F \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u2014 Master Roster",
                    color: "#1e40af",
                    sortKey: "total_visits",
                    showCols: ["opd", "ipd", "orders", "rev"],
                    desc: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19\u0E43\u0E19 roster (active \u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A \u0E21\u0E35\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21 30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14) \u2014 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01 \u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19\u0E08\u0E30\u0E41\u0E2A\u0E14\u0E07\u0E23\u0E27\u0E21 \u0E41\u0E21\u0E49\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 case",
                    dataKey: "all_doctors"
                  },
                  all_dentists: {
                    title: "\u{1F9B7} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u2014 Master Roster",
                    color: "#0e7490",
                    sortKey: "opd_visits",
                    showCols: ["opd", "orders", "rev"],
                    desc: "\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19\u0E43\u0E19 roster (active \u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A \u0E21\u0E35\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21 30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14) \u2014 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E08\u0E33\u0E19\u0E27\u0E19\u0E40\u0E04\u0E2A OPD \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01 \u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19\u0E08\u0E30\u0E41\u0E2A\u0E14\u0E07\u0E23\u0E27\u0E21 \u0E41\u0E21\u0E49\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 case",
                    dataKey: "all_dentists"
                  }
                },
                c = C[$] || C.doctors;
              let b = [...(c.dataKey ? E[c.dataKey] : E.doctors) || []];
              c.filter && (b = b.filter(c.filter)), b.sort((h, i) => c.asc ? (h[c.sortKey] || 0) - (i[c.sortKey] || 0) : (i[c.sortKey] || 0) - (h[c.sortKey] || 0)), c.limit && (b = b.slice(0, c.limit));
              const M = b.reduce((h, i) => h + (i[c.sortKey] || 0), 0),
                D = h => c.showCols.includes(h);
              return [u.jsxs("div", {
                style: {
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--md-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  background: `linear-gradient(135deg, ${c.color}14, transparent)`
                },
                children: [u.jsxs("div", {
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "16px",
                      fontWeight: 900,
                      color: "var(--md-text-primary)"
                    },
                    children: c.title
                  }), u.jsx("div", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-secondary)",
                      marginTop: "4px",
                      lineHeight: 1.5
                    },
                    children: c.desc
                  })]
                }), u.jsx("button", {
                  type: "button",
                  onClick: () => w(null),
                  style: {
                    background: "transparent",
                    border: "1px solid var(--md-border)",
                    borderRadius: "8px",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "var(--md-text-secondary)",
                    flexShrink: 0
                  },
                  children: "\u2715"
                })]
              }), u.jsx("div", {
                style: {
                  padding: "16px 20px",
                  overflowX: "auto"
                },
                children: b.length === 0 ? u.jsx("div", {
                  style: {
                    padding: "30px",
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: "\u2014 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E35\u0E49 \u2014"
                }) : u.jsxs("table", {
                  style: {
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "12px"
                  },
                  children: [u.jsx("thead", {
                    children: u.jsxs("tr", {
                      style: {
                        borderBottom: "2px solid var(--md-border)"
                      },
                      children: [u.jsx("th", {
                        style: {
                          textAlign: "left",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "#"
                      }), u.jsx("th", {
                        style: {
                          textAlign: "left",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E41\u0E1E\u0E17\u0E22\u0E4C"
                      }), D("opd") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "OPD"
                      }), D("ipd") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "IPD"
                      }), D("orders") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "Orders"
                      }), D("total") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E27\u0E21"
                      }), D("opdRev") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 OPD"
                      }), D("ipdRev") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 IPD"
                      }), D("rev") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21"
                      }), u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19"
                      })]
                    })
                  }), u.jsxs("tbody", {
                    children: [...b.map((h, i) => {
                      const k = M > 0 ? Math.round((h[c.sortKey] || 0) / M * 100) : 0;
                      return u.jsxs("tr", {
                        style: {
                          borderBottom: "1px solid var(--md-divider)"
                        },
                        children: [u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            fontWeight: 700,
                            color: i < 3 ? c.color : "var(--md-text-tertiary)"
                          },
                          children: i === 0 ? "\u{1F947}" : i === 1 ? "\u{1F948}" : i === 2 ? "\u{1F949}" : `#${i+1}`
                        }), u.jsxs("td", {
                          style: {
                            padding: "8px 6px",
                            fontWeight: 700,
                            color: "var(--md-text-primary)"
                          },
                          children: [h.name || h.code, h.position ? u.jsx("div", {
                            style: {
                              fontSize: "10px",
                              color: "var(--md-text-tertiary)",
                              fontWeight: 500
                            },
                            children: h.position
                          }) : null]
                        }), D("opd") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#7c3aed"
                          },
                          children: r(h.opd_visits || 0)
                        }), D("ipd") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#db2777"
                          },
                          children: r(h.ipd_admissions || 0)
                        }), D("orders") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: r((h.lab_orders || 0) + (h.xray_orders || 0))
                        }), D("total") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700
                          },
                          children: r(h.total_visits || 0)
                        }), D("opdRev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: `\u0E3F${r(Math.round(h.opd_revenue||0))}`
                        }), D("ipdRev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: `\u0E3F${r(Math.round(h.ipd_revenue||0))}`
                        }), D("rev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#10b981"
                          },
                          children: `\u0E3F${r(Math.round(h.total_revenue||0))}`
                        }), u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: c.color
                          },
                          children: `${k}%`
                        })]
                      }, h.code || i)
                    }), u.jsxs("tr", {
                      style: {
                        borderTop: "2px solid var(--md-border)",
                        background: "rgba(0,0,0,.02)"
                      },
                      children: [u.jsx("td", {
                        colSpan: 2,
                        style: {
                          padding: "10px 6px",
                          fontWeight: 900,
                          color: "var(--md-text-primary)"
                        },
                        children: `\u0E23\u0E27\u0E21 (${b.length} \u0E17\u0E48\u0E32\u0E19)`
                      }), D("opd") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#7c3aed"
                        },
                        children: r(b.reduce((h, i) => h + (i.opd_visits || 0), 0))
                      }), D("ipd") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#db2777"
                        },
                        children: r(b.reduce((h, i) => h + (i.ipd_admissions || 0), 0))
                      }), D("orders") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: r(b.reduce((h, i) => h + ((i.lab_orders || 0) + (i.xray_orders || 0)), 0))
                      }), D("total") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: r(b.reduce((h, i) => h + (i.total_visits || 0), 0))
                      }), D("opdRev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: `\u0E3F${r(Math.round(b.reduce((h,i)=>h+(i.opd_revenue||0),0)))}`
                      }), D("ipdRev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: `\u0E3F${r(Math.round(b.reduce((h,i)=>h+(i.ipd_revenue||0),0)))}`
                      }), D("rev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#10b981"
                        },
                        children: `\u0E3F${r(Math.round(b.reduce((h,i)=>h+(i.total_revenue||0),0)))}`
                      }), u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: c.color
                        },
                        children: "100%"
                      })]
                    })]
                  })]
                })
              })]
            })()
          })]
        }), u.jsx(e0, {
          title: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
          subtitle: "Doctor Productivity \xB7 Workload Balance \xB7 Revenue per Physician",
          badge: "\u{1F4D0} Rule-based Analysis",
          accentColor: "#0284c7",
          headerGradient: "linear-gradient(135deg, rgba(2,132,199,.10), rgba(124,58,237,.06))",
          narrative: {
            ...e,
            kpi: []
          }
        }), u.jsx(e0, {
          title: "\u{1F9B7} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
          subtitle: "Dental Productivity \xB7 Workload Balance \xB7 Revenue per Dentist",
          badge: "\u{1F4D0} Rule-based Analysis",
          accentColor: "#06b6d4",
          headerGradient: "linear-gradient(135deg, rgba(6,182,212,.10), rgba(8,145,178,.06))",
          narrative: g0(E)
        })]
      })
    })(), !o && E && X.length > 0 && u.jsxs("div", {
      className: "rounded-2xl p-5",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [u.jsxs("div", {
        style: {
          fontSize: "14px",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          marginBottom: "12px"
        },
        children: ["\u{1F4CA} \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 3 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21 ", S === "total_visits" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : S === "opd_visits" ? "OPD Visits" : S === "ipd_admissions" ? "IPD Admissions" : S === "total_orders" ? "Lab/X-Ray Orders" : "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"]
      }), function() {
        var e = Math.max.apply(null, X.map(function(f) {
            return f.OPD || 0
          }).concat([1])),
          n = Math.max.apply(null, X.map(function(f) {
            return f.IPD || 0
          }).concat([1])),
          y = Math.max.apply(null, X.map(function(f) {
            return f.Orders || 0
          }).concat([1])),
          m = [{
            accent: "linear-gradient(135deg,#fbbf24,#f59e0b)",
            border: "rgba(245,158,11,0.35)",
            glow: "0 10px 30px rgba(245,158,11,0.15)",
            medal: "\u{1F947}",
            avatar: "linear-gradient(135deg,#f59e0b,#d97706)"
          }, {
            accent: "linear-gradient(135deg,#94a3b8,#64748b)",
            border: "rgba(100,116,139,0.35)",
            glow: "0 10px 30px rgba(100,116,139,0.15)",
            medal: "\u{1F948}",
            avatar: "linear-gradient(135deg,#64748b,#475569)"
          }, {
            accent: "linear-gradient(135deg,#fb923c,#ea580c)",
            border: "rgba(234,88,12,0.35)",
            glow: "0 10px 30px rgba(234,88,12,0.15)",
            medal: "\u{1F949}",
            avatar: "linear-gradient(135deg,#ea580c,#c2410c)"
          }];
        return u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px"
          },
          children: X.map(function(f, V) {
            var z = m[V] || m[2],
              C = (f.OPD || 0) + (f.IPD || 0),
              c = C > 0 ? ((f.Orders || 0) / C).toFixed(2) : "\u2014",
              b = (f.name || "").trim(),
              M = b.split(/\s+/),
              D = M.length >= 2 ? (M[0].charAt(0) || "") + (M[M.length - 1].charAt(0) || "") : b.slice(0, 2);
            D || (D = "\u2014");
            var h = [{
              label: "OPD",
              value: f.OPD || 0,
              max: e,
              color: "#7c3aed",
              bg: "rgba(124,58,237,0.12)"
            }, {
              label: "IPD",
              value: f.IPD || 0,
              max: n,
              color: "#db2777",
              bg: "rgba(219,39,119,0.12)"
            }, {
              label: "\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07",
              value: f.Orders || 0,
              max: y,
              color: "#0ea5e9",
              bg: "rgba(14,165,233,0.12)"
            }];
            return u.jsxs("div", {
              style: {
                background: "var(--md-surface)",
                border: "1px solid " + z.border,
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: z.glow,
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              },
              children: [u.jsxs("div", {
                style: {
                  background: z.accent,
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                },
                children: [u.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                  },
                  children: ["\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A #", String(V + 1)]
                }), u.jsx("span", {
                  style: {
                    fontSize: "18px"
                  },
                  children: z.medal
                })]
              }), u.jsxs("div", {
                style: {
                  padding: "16px"
                },
                children: [u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px"
                  },
                  children: [u.jsx("div", {
                    style: {
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: z.avatar,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "14px",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    },
                    children: D
                  }), u.jsxs("div", {
                    style: {
                      minWidth: 0,
                      flex: 1
                    },
                    children: [u.jsx("div", {
                      style: {
                        fontSize: "14px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.2
                      },
                      children: b
                    }), u.jsx("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginTop: "4px"
                      },
                      children: "Top Performer"
                    })]
                  })]
                }), u.jsx("div", {
                  children: h.map(function(i) {
                    var k = i.max > 0 ? Math.min(100, i.value / i.max * 100) : 0;
                    return u.jsxs("div", {
                      style: {
                        marginBottom: "10px"
                      },
                      children: [u.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: "4px"
                        },
                        children: [u.jsx("span", {
                          style: {
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--md-text-secondary)",
                            letterSpacing: "0.04em"
                          },
                          children: i.label
                        }), u.jsx("span", {
                          style: {
                            fontSize: "16px",
                            fontWeight: 800,
                            color: i.value > 0 ? i.color : "var(--md-text-tertiary)",
                            fontFeatureSettings: '"tnum"'
                          },
                          children: i.value
                        })]
                      }), u.jsx("div", {
                        style: {
                          height: "6px",
                          background: i.bg,
                          borderRadius: "999px",
                          overflow: "hidden"
                        },
                        children: u.jsx("div", {
                          style: {
                            height: "100%",
                            width: k + "%",
                            background: i.color,
                            borderRadius: "999px",
                            transition: "width 0.6s ease"
                          }
                        })
                      })]
                    }, i.label)
                  })
                }), u.jsxs("div", {
                  style: {
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px dashed var(--md-border)",
                    display: "flex",
                    justifyContent: "space-between"
                  },
                  children: [u.jsxs("div", {
                    children: [u.jsx("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em"
                      },
                      children: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21"
                    }), u.jsxs("div", {
                      style: {
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        fontFeatureSettings: '"tnum"',
                        marginTop: "2px"
                      },
                      children: [C, u.jsx("span", {
                        style: {
                          fontSize: "11px",
                          color: "var(--md-text-secondary)",
                          marginLeft: "4px",
                          fontWeight: 600
                        },
                        children: "\u0E23\u0E32\u0E22"
                      })]
                    })]
                  }), u.jsxs("div", {
                    style: {
                      textAlign: "right"
                    },
                    children: [u.jsx("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em"
                      },
                      children: "Orders/Visit"
                    }), u.jsx("div", {
                      style: {
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "#0ea5e9",
                        fontFeatureSettings: '"tnum"',
                        marginTop: "2px"
                      },
                      children: c
                    })]
                  })]
                })]
              })]
            }, V)
          })
        })
      }()]
    }), !o && E && U.length > 0 && u.jsxs("div", {
      className: "rounded-2xl p-5",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [u.jsx("div", {
        style: {
          fontSize: "14px",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          marginBottom: "12px"
        },
        children: "\u{1F9B7} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C Top 3 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
      }), u.jsx(t0, {
        width: "100%",
        height: 360,
        children: u.jsxs(x0, {
          data: U,
          margin: {
            top: 10,
            right: 20,
            left: 10,
            bottom: 140
          },
          children: [u.jsx(r0, {
            strokeDasharray: "3 3",
            stroke: "var(--md-divider)"
          }), u.jsx(i0, {
            dataKey: "name",
            angle: -40,
            textAnchor: "end",
            interval: 0,
            height: 140,
            tick: {
              fill: "#6b7280",
              fontSize: 11
            }
          }), u.jsx(u0, {
            tick: {
              fill: "#9ca3af",
              fontSize: 11
            }
          }), u.jsx(o0, {
            contentStyle: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "8px",
              fontSize: "12px"
            }
          }), u.jsx(d0, {}), u.jsx(n0, {
            dataKey: "OPD",
            fill: "#06b6d4",
            radius: [6, 6, 0, 0]
          }), u.jsx(n0, {
            dataKey: "Orders",
            fill: "#0ea5e9",
            radius: [6, 6, 0, 0]
          })]
        })
      })]
    }), !o && E && N.length > 0 && u.jsxs("div", {
      className: "rounded-2xl p-5",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [u.jsx("div", {
        style: {
          fontSize: "14px",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          marginBottom: "12px"
        },
        children: "\u{1F4C8} \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19 7 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \u2014 \u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E41\u0E25\u0E30\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22"
      }), u.jsx(t0, {
        width: "100%",
        height: 240,
        children: u.jsxs(p0, {
          data: N,
          margin: {
            top: 10,
            right: 20,
            left: 10,
            bottom: 10
          },
          children: [u.jsx(r0, {
            strokeDasharray: "3 3",
            stroke: "var(--md-divider)"
          }), u.jsx(i0, {
            dataKey: "date",
            tick: {
              fill: "#6b7280",
              fontSize: 11
            }
          }), u.jsx(u0, {
            yAxisId: "left",
            tick: {
              fill: "#9ca3af",
              fontSize: 11
            }
          }), u.jsx(u0, {
            yAxisId: "right",
            orientation: "right",
            tick: {
              fill: "#9ca3af",
              fontSize: 11
            }
          }), u.jsx(o0, {
            contentStyle: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "8px",
              fontSize: "12px"
            }
          }), u.jsx(d0, {}), u.jsx(a0, {
            yAxisId: "left",
            type: "monotone",
            dataKey: "doctors",
            stroke: "#0284c7",
            strokeWidth: 2,
            name: "\u0E41\u0E1E\u0E17\u0E22\u0E4C",
            dot: {
              r: 4
            }
          }), u.jsx(a0, {
            yAxisId: "right",
            type: "monotone",
            dataKey: "visits",
            stroke: "#7c3aed",
            strokeWidth: 2,
            name: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
            dot: {
              r: 4
            }
          })]
        })
      })]
    }), !o && E && K.length > 0 && u.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [u.jsxs("div", {
        style: {
          padding: "14px 20px",
          borderBottom: "1px solid var(--md-border)",
          background: "linear-gradient(135deg, rgba(2,132,199,.06), rgba(124,58,237,.04))",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap"
        },
        children: [u.jsxs("div", {
          children: [u.jsxs("div", {
            style: {
              fontSize: "14px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: ["\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21 (", K.length, " \u0E17\u0E48\u0E32\u0E19)"]
          }), u.jsx("div", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "2px"
            },
            children: E.period?.days ? `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${E.period.days} \u0E27\u0E31\u0E19 \xB7 \u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E41\u0E16\u0E27\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E23\u0E32\u0E22\u0E41\u0E1E\u0E17\u0E22\u0E4C` : `\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ${E.period.start} \u2192 ${E.period.end} \xB7 \u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E41\u0E16\u0E27\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E23\u0E32\u0E22\u0E41\u0E1E\u0E17\u0E22\u0E4C`
          })]
        }), u.jsx("button", {
          type: "button",
          onClick: () => {
            T ? (F(new Set), L(!1)) : (F(new Set(K.map(e => e.code))), L(!0))
          },
          style: {
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 800,
            cursor: "pointer",
            background: T ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "var(--md-surface)",
            color: T ? "#fff" : "var(--md-text-primary)"
          },
          children: T ? "\u25BC \u0E0B\u0E48\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : "\u25B6 \u0E41\u0E2A\u0E14\u0E07\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E17\u0E38\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C"
        })]
      }), u.jsx("div", {
        style: {
          overflowX: "auto"
        },
        children: u.jsxs("table", {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
            minWidth: "900px"
          },
          children: [u.jsx("thead", {
            children: u.jsxs("tr", {
              style: {
                background: "var(--md-surface-2)",
                borderBottom: "2px solid var(--md-border)"
              },
              children: [u.jsx("th", {
                style: {
                  padding: "10px 6px",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px",
                  width: "28px"
                }
              }), u.jsx("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: "\u0E25\u0E33\u0E14\u0E31\u0E1A"
              }), u.jsx("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: "\u0E41\u0E1E\u0E17\u0E22\u0E4C"
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["OPD", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E23\u0E32\u0E22)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["IPD", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E23\u0E32\u0E22)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["Lab", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["X-Ray", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["Orders/Visit", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07/\u0E23\u0E32\u0E22)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E1A\u0E32\u0E17)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22)"
                })]
              })]
            })
          }), u.jsx("tbody", {
            children: K.map((e, n) => {
              const y = v.has(e.code),
                m = y ? s0(e, K, E.period?.days ? E.period.days : Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1)) : null;
              return u.jsxs(Z.Fragment, {
                children: [u.jsxs("tr", {
                  onClick: () => J(e.code),
                  style: {
                    borderBottom: "1px solid var(--md-divider)",
                    background: y ? "rgba(2,132,199,.05)" : n % 2 === 0 ? "transparent" : "rgba(0,0,0,.02)",
                    cursor: "pointer"
                  },
                  children: [u.jsx("td", {
                    style: {
                      padding: "10px 6px",
                      textAlign: "center",
                      fontWeight: 800,
                      color: "#0284c7",
                      fontSize: "14px"
                    },
                    children: y ? "\u25BC" : "\u25B6"
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      fontWeight: 800,
                      color: n < 3 ? "#0284c7" : "var(--md-text-tertiary)",
                      fontSize: "12px"
                    },
                    children: n === 0 ? "\u{1F947}" : n === 1 ? "\u{1F948}" : n === 2 ? "\u{1F949}" : `#${n+1}`
                  }), u.jsxs("td", {
                    style: {
                      padding: "10px 12px",
                      fontWeight: 700,
                      color: "var(--md-text-primary)"
                    },
                    children: [u.jsx("div", {
                      children: e.name || e.code
                    }), e.position && u.jsx("div", {
                      style: {
                        fontSize: "10px",
                        color: "var(--md-text-tertiary)",
                        fontWeight: 500
                      },
                      children: e.position
                    })]
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#7c3aed"
                    },
                    children: r(e.opd_visits)
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#db2777"
                    },
                    children: r(e.ipd_admissions)
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600
                    },
                    children: r(e.lab_orders)
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600
                    },
                    children: r(e.xray_orders)
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: e.orders_per_visit > 3 ? "#f59e0b" : "var(--md-text-secondary)"
                    },
                    children: e.orders_per_visit
                  }), u.jsxs("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 800,
                      color: "#10b981"
                    },
                    children: ["\u0E3F", r(e.total_revenue)]
                  }), u.jsxs("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: "var(--md-text-secondary)"
                    },
                    children: ["\u0E3F", r(e.revenue_per_visit)]
                  })]
                }), y && m && u.jsx("tr", {
                  style: {
                    background: "rgba(2,132,199,.03)",
                    borderBottom: "1px solid var(--md-divider)"
                  },
                  children: u.jsx("td", {
                    colSpan: 10,
                    style: {
                      padding: "16px 24px"
                    },
                    children: u.jsx(A0, {
                      doctor: e,
                      analysis: m,
                      rank: n + 1
                    })
                  })
                })]
              }, e.code || n)
            })
          })]
        })
      }), u.jsxs("div", {
        style: {
          padding: "10px 20px",
          borderTop: "1px solid var(--md-border)",
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "6px"
        },
        children: [u.jsx("span", {
          children: E.data_source
        }), u.jsxs("span", {
          children: ["\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ", E.as_of && new Date(E.as_of).toLocaleString("th-TH")]
        })]
      })]
    }), !o && E && (E.dentists || []).length > 0 && u.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [u.jsxs("div", {
        style: {
          padding: "14px 20px",
          borderBottom: "1px solid var(--md-border)",
          background: "linear-gradient(135deg, rgba(6,182,212,.06), rgba(8,145,178,.04))",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap"
        },
        children: [u.jsxs("div", {
          children: [u.jsxs("div", {
            style: {
              fontSize: "14px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: ["\u{1F9B7} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21 (", E.dentists.length, " \u0E17\u0E48\u0E32\u0E19)"]
          }), u.jsx("div", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "2px"
            },
            children: E.period?.days ? `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${E.period.days} \u0E27\u0E31\u0E19 \xB7 \u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E41\u0E16\u0E27\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E23\u0E32\u0E22\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C` : `\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ${E.period.start} \u2192 ${E.period.end} \xB7 \u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E41\u0E16\u0E27\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E23\u0E32\u0E22\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C`
          })]
        }), u.jsx("button", {
          type: "button",
          onClick: () => {
            a ? (G(new Set), _(!1)) : (G(new Set((E.dentists || []).map(e => e.code))), _(!0))
          },
          style: {
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 800,
            cursor: "pointer",
            background: a ? "linear-gradient(135deg, #06b6d4, #0891b2)" : "var(--md-surface)",
            color: a ? "#fff" : "var(--md-text-primary)"
          },
          children: a ? "\u25BC \u0E0B\u0E48\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : "\u25B6 \u0E41\u0E2A\u0E14\u0E07\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E17\u0E38\u0E01\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C"
        })]
      }), u.jsx("div", {
        style: {
          overflowX: "auto"
        },
        children: u.jsxs("table", {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
            minWidth: "700px"
          },
          children: [u.jsx("thead", {
            children: u.jsxs("tr", {
              style: {
                background: "var(--md-surface-2, rgba(6,182,212,.04))",
                borderBottom: "2px solid var(--md-border)"
              },
              children: [u.jsx("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: "\u0E25\u0E33\u0E14\u0E31\u0E1A"
              }), u.jsx("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: "\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C"
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["\u0E40\u0E04\u0E2A OPD", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E23\u0E32\u0E22)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["Lab", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["X-Ray", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["Orders/Visit", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07/\u0E23\u0E32\u0E22)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E1A\u0E32\u0E17)"
                })]
              }), u.jsxs("th", {
                style: {
                  padding: "10px 12px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: ["\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E40\u0E04\u0E2A", u.jsx("div", {
                  style: {
                    fontSize: "9px",
                    fontWeight: 500,
                    opacity: .7
                  },
                  children: "(\u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22)"
                })]
              })]
            })
          }), u.jsxs("tbody", {
            children: [...E.dentists.map((e, n) => {
              const y = O.has(e.code),
                m = E.period?.days || Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1),
                f = y ? s0(e, E.dentists, m) : null;
              return u.jsxs(Z.Fragment, {
                children: [u.jsxs("tr", {
                  onClick: () => G(V => {
                    const z = new Set(V);
                    return z.has(e.code) ? z.delete(e.code) : z.add(e.code), z
                  }),
                  style: {
                    borderBottom: "1px solid var(--md-divider)",
                    background: y ? "rgba(6,182,212,.06)" : n % 2 === 0 ? "transparent" : "rgba(0,0,0,.02)",
                    cursor: "pointer"
                  },
                  children: [u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      fontWeight: 800,
                      color: n < 3 ? "#06b6d4" : "var(--md-text-tertiary)",
                      fontSize: "12px"
                    },
                    children: n === 0 ? "\u{1F947}" : n === 1 ? "\u{1F948}" : n === 2 ? "\u{1F949}" : `#${n+1}`
                  }), u.jsxs("td", {
                    style: {
                      padding: "10px 12px",
                      fontWeight: 700,
                      color: "var(--md-text-primary)"
                    },
                    children: [u.jsx("div", {
                      children: e.name || e.code
                    }), e.position ? u.jsx("div", {
                      style: {
                        fontSize: "10px",
                        color: "var(--md-text-tertiary)",
                        fontWeight: 500
                      },
                      children: e.position
                    }) : null]
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#06b6d4"
                    },
                    children: r(e.opd_visits || 0)
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600
                    },
                    children: r(e.lab_orders || 0)
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600
                    },
                    children: r(e.xray_orders || 0)
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: e.orders_per_visit > 3 ? "#f59e0b" : "var(--md-text-secondary)"
                    },
                    children: e.orders_per_visit || 0
                  }), u.jsxs("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#10b981"
                    },
                    children: ["\u0E3F", r(Math.round(e.total_revenue || 0))]
                  }), u.jsxs("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "right",
                      fontWeight: 600,
                      color: "var(--md-text-secondary)"
                    },
                    children: ["\u0E3F", r(e.revenue_per_visit || 0)]
                  })]
                }), y && u.jsx("tr", {
                  children: u.jsx("td", {
                    colSpan: 8,
                    style: {
                      padding: "16px 20px",
                      background: "rgba(6,182,212,.03)",
                      borderBottom: "1px solid var(--md-divider)"
                    },
                    children: u.jsx(l0, {
                      doctor: e,
                      analysis: f,
                      rank: n + 1
                    })
                  })
                })]
              }, e.code || n)
            }), u.jsxs("tr", {
              style: {
                borderTop: "2px solid var(--md-border)",
                background: "rgba(6,182,212,.04)",
                fontWeight: 900
              },
              children: [u.jsx("td", {
                colSpan: 2,
                style: {
                  padding: "12px 12px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)"
                },
                children: `\u0E23\u0E27\u0E21 (${E.dentists.length} \u0E17\u0E48\u0E32\u0E19)`
              }), u.jsx("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900,
                  color: "#06b6d4"
                },
                children: r(E.dentists.reduce((e, n) => e + (n.opd_visits || 0), 0))
              }), u.jsx("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900
                },
                children: r(E.dentists.reduce((e, n) => e + (n.lab_orders || 0), 0))
              }), u.jsx("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900
                },
                children: r(E.dentists.reduce((e, n) => e + (n.xray_orders || 0), 0))
              }), u.jsx("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900,
                  color: "var(--md-text-secondary)"
                },
                children: (() => {
                  const e = E.dentists.reduce((y, m) => y + (m.opd_visits || 0), 0),
                    n = E.dentists.reduce((y, m) => y + (m.lab_orders || 0) + (m.xray_orders || 0), 0);
                  return e > 0 ? (n / e).toFixed(2) : "0"
                })()
              }), u.jsxs("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900,
                  color: "#10b981"
                },
                children: ["\u0E3F", r(Math.round(E.dentists.reduce((e, n) => e + (n.total_revenue || 0), 0)))]
              }), u.jsx("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)"
                },
                children: "\u2014"
              })]
            })]
          })]
        })
      })]
    }), !o && E && K.length === 0 && u.jsxs("div", {
      className: "rounded-2xl p-8",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        textAlign: "center"
      },
      children: [u.jsx("div", {
        style: {
          fontSize: "36px",
          marginBottom: "12px"
        },
        children: "\u{1F468}\u200D\u2695\uFE0F"
      }), u.jsx("div", {
        style: {
          fontSize: "14px",
          color: "var(--md-text-tertiary)",
          fontWeight: 700
        },
        children: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01"
      })]
    })]
  })
}
const m0 = Z.memo(B0);
export {
  m0 as
  default
};