import {
  R as u0,
  r as M,
  j as u
} from "./vendor-react-ByYOq5k4.js";
import {
  E as d0,
  q as r
} from "./shared-ui-OVDEF1.js";
import {
  R as E0,
  c as n0,
  a as e0,
  X as t0,
  Y,
  T as r0,
  L as s0,
  B as i0,
  g as p0,
  b as a0
} from "./vendor-charts-C5q2M-g3.js";
const o0 = E => {
    const t = E.getFullYear(),
      i = String(E.getMonth() + 1).padStart(2, "0"),
      l = String(E.getDate()).padStart(2, "0");
    return `${t}-${i}-${l}`
  },
  q = () => o0(new Date),
  N = E => {
    if (!E.length) return 0;
    const t = [...E].sort((l, g) => l - g),
      i = Math.floor(t.length / 2);
    return t.length % 2 === 0 ? (t[i - 1] + t[i]) / 2 : t[i]
  };

function l0(E, t, i) {
  const l = [...t].sort((s, b) => (b.total_visits || 0) - (s.total_visits || 0)).findIndex(s => s.code === E.code) + 1,
    g = Math.round((1 - (l - 1) / Math.max(1, t.length)) * 100),
    h = [...t].sort((s, b) => (b.total_revenue || 0) - (s.total_revenue || 0)).findIndex(s => s.code === E.code) + 1,
    x = N(t.map(s => s.total_visits || 0)),
    p = N(t.map(s => s.revenue_per_visit || 0).filter(s => s > 0)),
    a = N(t.map(s => Number(s.orders_per_visit) || 0).filter(s => s > 0)),
    z = (E.opd_visits || 0) + (E.ipd_admissions || 0),
    D = z > 0 ? (E.ipd_admissions || 0) / z : 0,
    d = (E.ipd_admissions || 0) === 0 ? "OPD-only (\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19)" : D > .15 ? `IPD-heavy (${Math.round(D*100)}% \u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07)` : `Balanced (OPD ${Math.round((1-D)*100)}% \xB7 IPD ${Math.round(D*100)}%)`,
    P = D > .15 ? "#db2777" : (E.ipd_admissions || 0) === 0 ? "#7c3aed" : "#10b981",
    A = (E.opd_visits || 0) / Math.max(1, i),
    j = A > 50 ? "\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 (\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout)" : A > 30 ? "\u0E2A\u0E39\u0E07 (\u0E40\u0E2B\u0E19\u0E37\u0E48\u0E2D\u0E22\u0E41\u0E15\u0E48\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49)" : A > 15 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : A > 5 ? "\u0E15\u0E48\u0E33 (\u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22)" : "\u0E15\u0E48\u0E33\u0E21\u0E32\u0E01",
    V = A > 50 ? "#f43f5e" : A > 30 ? "#f59e0b" : "#10b981",
    v = Number(E.orders_per_visit) || 0,
    F = Number(E.revenue_per_visit) || 0,
    I = a > 0 && v > a * 1.5 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E21\u0E32\u0E01" : a > 0 && v > a * 1.2 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : a > 0 && v < a * .5 ? "\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34",
    T = p > 0 && F > p * 1.5 ? "\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 (case-mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E23\u0E32\u0E04\u0E32\u0E2A\u0E39\u0E07)" : p > 0 && F > p * 1.2 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : p > 0 && F < p * .5 ? "\u0E15\u0E48\u0E33 (case \u0E07\u0E48\u0E32\u0E22\u0E2B\u0E23\u0E37\u0E2D\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E1A\u0E34\u0E01\u0E15\u0E48\u0E33)" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34",
    f = [],
    W = [],
    R = [];
  g >= 90 ? f.push(`Top ${Math.max(1,100-g)}% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ${l}/${t.length})`) : g >= 75 && f.push(`Top 25% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ${l}/${t.length})`), F > p * 1.2 && f.push(`\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22\u0E2A\u0E39\u0E07 \u0E3F${r(F)} (\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 ${Math.round((F/Math.max(1,p)-1)*100)}%) \u2014 case-mix \u0E21\u0E35\u0E04\u0E38\u0E13\u0E04\u0E48\u0E32\u0E17\u0E32\u0E07\u0E40\u0E28\u0E23\u0E29\u0E10\u0E01\u0E34\u0E08`), D > .15 && f.push(`\u0E23\u0E31\u0E1A IPD \u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D (${E.ipd_admissions} \u0E23\u0E32\u0E22 \xB7 ${Math.round(D*100)}% \u0E02\u0E2D\u0E07 workload) \u2014 \u0E40\u0E2A\u0E23\u0E34\u0E21\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`), v > 0 && v < a * 1.2 && v > a * .7 && f.push(`Orders/Visit \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (${v}) \u2014 Clinical Pathway \u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21`), A > 50 ? W.push(`\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${Math.round(A)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \xB7 \u0E40\u0E01\u0E13\u0E11\u0E4C 30\u201350) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout`) : A > 30 && (E.ipd_admissions || 0) > 30 && W.push(`\u26A0 OPD ${Math.round(A)}/\u0E27\u0E31\u0E19 + IPD ${E.ipd_admissions} \u0E23\u0E32\u0E22 \u2014 \u0E20\u0E32\u0E23\u0E30\u0E0B\u0E49\u0E2D\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07`), a > 0 && v > a * 1.5 && W.push(`\u26A0 Orders/Visit = ${v} \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (${a.toFixed(2)}) \u0E21\u0E32\u0E01 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Appropriateness`), (E.opd_visits || 0) > 100 && v > 0 && v < .2 && W.push(`\u26A0 Orders/Visit \u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 (${v}) \u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u2014 \u0E2D\u0E32\u0E08 Under-investigation`), (E.ipd_admissions || 0) === 0 && g >= 75 && W.push("\u0E41\u0E1E\u0E17\u0E22\u0E4C OPD-only \u0E41\u0E15\u0E48\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E39\u0E07 \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E43\u0E2B\u0E49\u0E23\u0E48\u0E27\u0E21 IPD rotation"), p > 0 && F < p * .4 && (E.opd_visits || 0) > 100 && W.push(`\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07\u0E21\u0E32\u0E01 (\u0E3F${r(F)} vs \u0E3F${r(p)}) \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Payer Mix \u0E41\u0E25\u0E30 Coding`), (E.lab_orders || 0) === 0 && (E.xray_orders || 0) === 0 && (E.opd_visits || 0) > 50 && W.push(`\u0E44\u0E21\u0E48\u0E21\u0E35 Lab/X-Ray Orders \u0E40\u0E25\u0E22\u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01`), A > 50 && R.push("\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30 OPD \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E08\u0E33\u0E01\u0E31\u0E14 Quota \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E0A\u0E48\u0E27\u0E22"), a > 0 && v > a * 1.5 && R.push("\u0E23\u0E48\u0E27\u0E21\u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21 Clinical Guideline \u2014 \u0E25\u0E14 Over-investigation"), F < p * .5 && (E.opd_visits || 0) > 200 && R.push("\u0E17\u0E1A\u0E17\u0E27\u0E19 Coding/Billing \u2014 \u0E2D\u0E32\u0E08\u0E21\u0E35 Revenue Leak"), (E.ipd_admissions || 0) === 0 && g >= 75 && R.push("\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E40\u0E02\u0E49\u0E32 IPD \u2014 \u0E40\u0E2A\u0E23\u0E34\u0E21 Team Flexibility"), W.length === 0 && f.length >= 2 && R.push("\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E14\u0E35 \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E40\u0E1B\u0E47\u0E19 Mentor / \u0E1C\u0E39\u0E49\u0E0A\u0E48\u0E27\u0E22\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Pathway");
  const K = c0(E, t, {
    visitPercentile: g,
    totalDoctors: t.length,
    dailyVisits: A,
    medRevPerVisit: p,
    medOrdersPerVisit: a,
    opv: v,
    rpv: F,
    periodDays: i
  });
  return {
    visitRank: l,
    visitPercentile: g,
    revRank: h,
    totalDoctors: t.length,
    pattern: d,
    patternColor: P,
    workloadLevel: j,
    workloadColor: V,
    ordEff: I,
    revEff: T,
    dailyVisits: A,
    medVisits: x,
    medRevPerVisit: p,
    medOrdersPerVisit: a,
    strengths: f,
    concerns: W,
    recs: R,
    deepRecs: K
  }
}

function c0(E, t, i) {
  const {
    visitPercentile: l,
    dailyVisits: g,
    medRevPerVisit: h,
    medOrdersPerVisit: x,
    opv: p,
    rpv: a,
    periodDays: z
  } = i, D = [], d = E.name || E.code;
  if (g > 50) {
    const P = Math.round(g - 40);
    D.push({
      priority: "P0",
      icon: "\u{1F6A8}",
      title: "\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E25\u0E30\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Burnout",
      color: "#f43f5e",
      situation: `${d} \u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${Math.round(g)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 (\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C OPD \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 30\u201350 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${P} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19) \u0E15\u0E25\u0E2D\u0E14\u0E0A\u0E48\u0E27\u0E07 ${z} \u0E27\u0E31\u0E19 \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout \u0E2A\u0E39\u0E07 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22 \u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E41\u0E25\u0E30\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E04\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E19\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27`,
      rootCause: "\u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 (1) \u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D\u0E15\u0E48\u0E2D Demand \xB7 (2) \u0E23\u0E30\u0E1A\u0E1A\u0E19\u0E31\u0E14\u0E2B\u0E21\u0E32\u0E22\u0E44\u0E21\u0E48\u0E21\u0E35 Quota Cap \u0E15\u0E48\u0E2D\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 (3) \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 Provider \u0E40\u0E14\u0E34\u0E21\u0E17\u0E33\u0E43\u0E2B\u0E49 load \u0E01\u0E23\u0E30\u0E08\u0E38\u0E01 \xB7 (4) \u0E44\u0E21\u0E48\u0E21\u0E35 Triage \u0E17\u0E35\u0E48\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A case \u0E40\u0E1A\u0E32\u0E44\u0E1B\u0E2B\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E48\u0E27\u0E21",
      actions: ["**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E01\u0E33\u0E2B\u0E19\u0E14 Quota Cap \u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27 45 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19/\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19 HOSxP Appointment Module \u2014 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 IT \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E15\u0E31\u0E49\u0E07 warning \u0E40\u0E21\u0E37\u0E48\u0E2D slot \u0E40\u0E15\u0E47\u0E21", `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Case-mix \u0E02\u0E2D\u0E07 ${d} \u2014 \u0E41\u0E22\u0E01 Simple (\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E22\u0E32/follow-up) \u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01 Complex \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Redistribute`, "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14 Pharmacist-led Refill Clinic + Nurse Practitioner Clinic \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Stable NCD/Chronic \u2014 \u0E25\u0E14 OPD Load 15\u201320%", "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49\u0E43\u0E19\u0E01\u0E32\u0E23\u0E08\u0E49\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C GP \u0E40\u0E1E\u0E34\u0E48\u0E21 1 \u0E17\u0E48\u0E32\u0E19 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 Part-time Specialist 1\u20132 \u0E27\u0E31\u0E19/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C", `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Monitor Daily Visits \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 \u0E04\u0E38\u0E22 1-on-1 \u0E01\u0E31\u0E1A ${d} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\u0E17\u0E23\u0E32\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 Burnout (\u0E19\u0E2D\u0E19/\u0E2D\u0E32\u0E23\u0E21\u0E13\u0E4C/\u0E04\u0E27\u0E32\u0E21\u0E23\u0E39\u0E49\u0E2A\u0E36\u0E01\u0E15\u0E48\u0E2D\u0E07\u0E32\u0E19)`],
      target: `\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19 ${d} \u0E40\u0E2B\u0E25\u0E37\u0E2D \u2264 45 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \u0E20\u0E32\u0E22\u0E43\u0E19 8 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 MBI Score (Maslach Burnout Inventory) Emotional Exhaustion <16`,
      timeline: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 8 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 + \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + HR",
      expectedOutcome: `\u0E25\u0E14 Burnout Risk \xB7 \u0E04\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C Top Performer \xB7 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E14\u0E49 Consultation Time \u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D (\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.max(2,Math.round(480/g))} \u0E19\u0E32\u0E17\u0E35/\u0E23\u0E32\u0E22 \u0E2D\u0E32\u0E08\u0E44\u0E21\u0E48\u0E1E\u0E2D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Complex Case)`
    })
  }
  if (h > 0 && a < h * .6 && (E.opd_visits || 0) > 200) {
    const P = Math.round(h - a),
      A = Math.round(P * (E.opd_visits || 0));
    D.push({
      priority: "P0",
      icon: "\u{1F4B0}",
      title: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Revenue Leak \u0E41\u0E25\u0E30 Coding Quality",
      color: "#dc2626",
      situation: `${d} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \u0E3F${r(a)}/\u0E23\u0E32\u0E22 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(h)}/\u0E23\u0E32\u0E22 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.round((1-a/h)*100)}% \xB7 \u0E08\u0E32\u0E01\u0E08\u0E33\u0E19\u0E27\u0E19 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${z} \u0E27\u0E31\u0E19 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23 Revenue Gap \u0E2A\u0E39\u0E07\u0E16\u0E36\u0E07 \u0E3F${r(A)} \xB7 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E44\u0E14\u0E49\u0E2B\u0E25\u0E32\u0E22\u0E14\u0E49\u0E32\u0E19\u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19`,
      rootCause: "\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 4 \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38 (\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E04\u0E27\u0E32\u0E21\u0E19\u0E48\u0E32\u0E08\u0E30\u0E40\u0E1B\u0E47\u0E19): (1) **ICD-10/ICD-9 Coding \u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A** \u2014 \u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E30\u0E1A\u0E38 Secondary Dx \u0E2B\u0E23\u0E37\u0E2D Comorbidity \xB7 (2) **\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01** \u2014 \u0E19\u0E27\u0E14/\u0E09\u0E35\u0E14\u0E22\u0E32/Counseling \u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E44\u0E14\u0E49 \xB7 (3) **Payer Mix \u0E40\u0E2D\u0E35\u0E22\u0E07\u0E44\u0E1B\u0E17\u0E32\u0E07 UC/\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07** \u2014 case-mix \u0E40\u0E19\u0E49\u0E19 Simple/Follow-up \xB7 (4) **\u0E43\u0E1A\u0E40\u0E1A\u0E34\u0E01\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A** (\u0E2A\u0E1B\u0E2A\u0E0A. e-Claim format)",
      actions: [`**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E14\u0E36\u0E07 30 records \u0E02\u0E2D\u0E07 ${d} \u0E41\u0E1A\u0E1A\u0E2A\u0E38\u0E48\u0E21 (stratified by pttype) \xB7 MedRec audit \u0E17\u0E33 Chart Review \u0E40\u0E17\u0E35\u0E22\u0E1A Documentation vs Billed`, `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E1E\u0E1A ${d} \u0E17\u0E1A\u0E17\u0E27\u0E19 Coding Basics \u2014 Secondary Dx, Comorbidity (CC/MCC), Procedure Code (ICD-9-CM)`, "**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 3**: \u0E1B\u0E23\u0E31\u0E1A\u0E43\u0E0A\u0E49 **Coding Checklist** \u0E43\u0E19 HOSxP \u2014 Alert \u0E16\u0E49\u0E32 Primary Dx \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E17\u0E35\u0E48\u0E21\u0E31\u0E01 CC/MCC (DM, HT, CKD) \u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38 Secondary", `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E40\u0E17\u0E35\u0E22\u0E1A Payer Mix \u0E02\u0E2D\u0E07 ${d} \u0E01\u0E31\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E21\u0E35 Revenue/Visit \u0E2A\u0E39\u0E07 \u2014 \u0E14\u0E39\u0E27\u0E48\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C FFS (\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E15\u0E23\u0E07/\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19) \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E23`, `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Quarterly Audit \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A MedRec \xB7 \u0E27\u0E31\u0E14 Revenue/Visit \u0E02\u0E2D\u0E07 ${d} \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19`],
      target: `\u0E40\u0E1E\u0E34\u0E48\u0E21 Revenue/Visit \u0E02\u0E2D\u0E07 ${d} \u0E08\u0E32\u0E01 \u0E3F${r(a)} \u0E40\u0E1B\u0E47\u0E19 \u0E3F${r(Math.round(h*.85))} \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Revenue Recovery \u2265 \u0E3F${r(Math.round(A*.3))}`,
      timeline: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E40\u0E04\u0E2A + Medical Record Audit Team + Billing Department",
      expectedOutcome: "Revenue Recovery \xB7 \u0E1B\u0E23\u0E31\u0E1A Coding Quality \xB7 \u0E25\u0E14 Claim Rejection Rate \xB7 Bench-mark Coding Quality \u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E48\u0E32\u0E19\u0E2D\u0E37\u0E48\u0E19"
    })
  }
  if (x > 0 && p > x * 1.5) {
    const P = Math.round((p - x) * (E.opd_visits || 0));
    D.push({
      priority: "P1",
      icon: "\u{1F9EA}",
      title: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway \u0E41\u0E25\u0E30 Order Appropriateness",
      color: "#f59e0b",
      situation: `${d} \u0E21\u0E35 Orders/Visit = ${p} \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (${x.toFixed(2)}) \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.round((p/x-1)*100)}% \xB7 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E01\u0E34\u0E19 ${r(P)} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${z} \u0E27\u0E31\u0E19 \xB7 \u0E2D\u0E32\u0E08\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Over-investigation \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E0B\u0E49\u0E33\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`,
      rootCause: "(1) **Defensive Medicine** \u2014 \u0E01\u0E25\u0E31\u0E27\u0E1E\u0E25\u0E32\u0E14 \xB7 (2) **\u0E44\u0E21\u0E48\u0E21\u0E35 Clinical Decision Support** \u0E43\u0E19 HOSxP \xB7 (3) **\u0E44\u0E21\u0E48\u0E17\u0E23\u0E32\u0E1A\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19** \u0E02\u0E2D\u0E07\u0E41\u0E15\u0E48\u0E25\u0E30 Order \xB7 (4) **\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E23\u0E35\u0E22\u0E01\u0E23\u0E49\u0E2D\u0E07** \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C UC",
      actions: ["**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21 Peer Review \u0E43\u0E0A\u0E49 Choosing Wisely Thailand Guidelines \xB7 \u0E40\u0E25\u0E37\u0E2D\u0E01 5 Orders \u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07\u0E1A\u0E48\u0E2D\u0E22\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 (\u0E40\u0E0A\u0E48\u0E19 CBC \u0E0B\u0E49\u0E33\u0E43\u0E19 7 \u0E27\u0E31\u0E19 \xB7 LFT \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A HT \u0E17\u0E35\u0E48\u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21\u0E44\u0E14\u0E49)", "**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: Build Clinical Decision Support (CDS) \u0E43\u0E19 HOSxP \u2014 Alert \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E49\u0E33\u0E43\u0E19 30 \u0E27\u0E31\u0E19 + \u0E41\u0E2A\u0E14\u0E07\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E42\u0E14\u0E22\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13", `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14 Academic Session \u0E01\u0E31\u0E1A ${d} + \u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-Based Indication \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Top Orders`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2**: Monitor Orders/Visit \u0E02\u0E2D\u0E07 ${d} \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 Comparison \u0E01\u0E31\u0E1A Peer Group (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19)`, "**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Lab Stewardship Program \u2014 \u0E41\u0E2A\u0E14\u0E07 Utilization Report \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E2B\u0E47\u0E19\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07"],
      target: `\u0E25\u0E14 Orders/Visit \u0E02\u0E2D\u0E07 ${d} \u0E08\u0E32\u0E01 ${p} \u2192 \u2264 ${(x*1.2).toFixed(2)} \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19 Lab/X-Ray \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E3F${r(Math.round(P*150))} (\u0E2A\u0E21\u0E21\u0E15\u0E34 \u0E3F150/order)`,
      timeline: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + Clinical Pharmacist + Lab Director",
      expectedOutcome: "\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19 \xB7 \u0E25\u0E14\u0E01\u0E32\u0E23\u0E23\u0E1A\u0E01\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \xB7 Clinical Appropriateness \u0E14\u0E35\u0E02\u0E36\u0E49\u0E19 \xB7 Benchmark \u0E17\u0E35\u0E48\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E0A\u0E49\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E19\u0E44\u0E14\u0E49"
    })
  }
  return (E.opd_visits || 0) > 100 && p > 0 && p < .2 && D.push({
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
  }), (E.ipd_admissions || 0) === 0 && l >= 75 && D.push({
    priority: "P2",
    icon: "\u{1F3E5}",
    title: "\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E40\u0E02\u0E49\u0E32 IPD \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E2A\u0E23\u0E34\u0E21 Team Flexibility",
    color: "#3b82f6",
    situation: `${d} \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19 Top ${Math.max(1,100-l)}% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 OPD \u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IPD \u0E40\u0E25\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${z} \u0E27\u0E31\u0E19 \xB7 \u0E02\u0E32\u0E14\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E31\u0E01\u0E29\u0E30\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Complex \u0E41\u0E25\u0E30\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E35\u0E21 IPD \u0E02\u0E32\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E19\u0E31\u0E1A\u0E2A\u0E19\u0E38\u0E19\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 peak`,
    rootCause: `\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 (1) ${d} \u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E14\u0E49\u0E32\u0E19 OPD \u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07 \xB7 (2) \u0E44\u0E21\u0E48\u0E21\u0E35\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 IPD \xB7 (3) \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30 OPD \u0E40\u0E1E\u0E23\u0E32\u0E30 workflow \u0E23\u0E39\u0E49\u0E08\u0E31\u0E01`,
    actions: [`**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E1E\u0E39\u0E14\u0E04\u0E38\u0E22\u0E01\u0E31\u0E1A ${d} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E43\u0E08\u0E43\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A IPD`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14\u0E17\u0E33\u0E15\u0E32\u0E23\u0E32\u0E07 IPD Rotation \u2014 ${d} \u0E23\u0E31\u0E1A Admission \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 2\u20134 \u0E23\u0E32\u0E22/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C (case \u0E44\u0E21\u0E48 complex)`, "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: Mentorship \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD senior \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Complex Case", `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 Outcome Metrics (ALOS, Readmission) \u0E02\u0E2D\u0E07 ${d} \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E01\u0E31\u0E1A IPD Pool`],
    target: `${d} \u0E23\u0E31\u0E1A IPD \u2265 8 \u0E23\u0E32\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Outcome metrics \u0E44\u0E21\u0E48\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 IPD Pool`,
    timeline: "\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27 3 \u0E40\u0E14\u0E37\u0E2D\u0E19",
    owner: `\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + ${d} + \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E21 IPD`,
    expectedOutcome: `Team Flexibility \u0E40\u0E1E\u0E34\u0E48\u0E21 \xB7 \u0E25\u0E14 Single Point of Failure \xB7 ${d} \u0E1E\u0E31\u0E12\u0E19\u0E32 Comprehensive Skill`
  }), (E.lab_orders || 0) === 0 && (E.xray_orders || 0) === 0 && (E.opd_visits || 0) > 50 && D.push({
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
  }), g >= 20 && g <= 50 && p >= x * .7 && p <= x * 1.3 && a >= h * .8 && l >= 50 && D.push({
    priority: "P2",
    icon: "\u{1F31F}",
    title: "\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E1B\u0E47\u0E19 Clinical Mentor / Champion",
    color: "#10b981",
    situation: `${d} \u0E21\u0E35\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E23\u0E2D\u0E1A\u0E14\u0E49\u0E32\u0E19 \u2014 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21 (${Math.round(g)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19) \xB7 Orders/Visit \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${p}) \xB7 Revenue/Visit \u0E43\u0E01\u0E25\u0E49\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (\u0E3F${r(a)}) \xB7 \u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19 Role Model \u0E41\u0E25\u0E30\u0E0A\u0E48\u0E27\u0E22\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C`,
    rootCause: "\u0E41\u0E2A\u0E14\u0E07\u0E16\u0E36\u0E07 Clinical Competence \u0E41\u0E25\u0E30 Workflow Efficiency \u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E16\u0E48\u0E32\u0E22\u0E17\u0E2D\u0E14",
    actions: [`**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E40\u0E0A\u0E34\u0E0D ${d} \u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21\u0E17\u0E35\u0E21\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Pathway / CPG \u0E1B\u0E23\u0E30\u0E08\u0E33\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: Mentorship Program \u2014 ${d} \u0E40\u0E1B\u0E47\u0E19 Mentor \u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E2B\u0E21\u0E48 1\u20132 \u0E17\u0E48\u0E32\u0E19 \xB7 Shadow OPD 1\u20132 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 3**: \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22 Role "Clinical Champion" \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E02\u0E2D\u0E07 ${d}`, `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Case Conference \u0E1B\u0E23\u0E30\u0E08\u0E33\u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 ${d} \u0E19\u0E33\u0E40\u0E2A\u0E19\u0E2D Interesting Case`],
    target: `\u0E1C\u0E39\u0E49\u0E16\u0E39\u0E01 Mentor 2 \u0E17\u0E48\u0E32\u0E19 \u0E21\u0E35 Revenue/Visit \u0E41\u0E25\u0E30 Orders/Visit \u0E40\u0E02\u0E49\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E20\u0E32\u0E22\u0E43\u0E19 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 ${d} \u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A Recognition (Award/Bonus)`,
    timeline: "\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27 6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
    owner: "\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + HR",
    expectedOutcome: "\u0E22\u0E01\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E17\u0E35\u0E21 \xB7 Retention \u0E02\u0E2D\u0E07 Top Performer \xB7 Knowledge Transfer \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E23\u0E38\u0E48\u0E19"
  }), D
}
const J = E => {
  const t = E.filter(x => x >= 0),
    i = t.length;
  if (i === 0) return 0;
  const l = [...t].sort((x, p) => x - p);
  let g = 0,
    h = 0;
  for (let x = 0; x < i; x++) g += (2 * (x + 1) - i - 1) * l[x], h += l[x];
  return h > 0 ? g / (i * h) : 0
};

function h0(E) {
  if (!E?.summary || !E?.doctors) return {
    headline: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E30\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E40\u0E21\u0E37\u0E48\u0E2D data \u0E1E\u0E23\u0E49\u0E2D\u0E21",
    empty: !0
  };
  const t = E.summary,
    i = E.doctors || [],
    l = t.opd_doctors || 0,
    g = t.opd_visits || 0,
    h = t.avg_visits_per_doctor || 0,
    x = t.total_revenue || 0,
    p = E.period?.days || (E.period?.start && E.period?.end ? Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1) : 30);
  if (!i.length) return {
    headline: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49",
    headlineColor: "#94a3b8",
    kpi: [],
    sections: [],
    footerLeft: "\u2014"
  };
  const a = i.map(o => o.total_visits || 0),
    z = i.map(o => o.total_revenue || 0),
    D = i.map(o => Number(o.orders_per_visit) || 0),
    d = i.map(o => Number(o.revenue_per_visit) || 0),
    P = [...i].sort((o, k) => (k.total_visits || 0) - (o.total_visits || 0)),
    A = P[0],
    j = Math.round(N(a)),
    V = Math.max(...a),
    v = Math.min(...a),
    F = Math.round(V / Math.max(1, p)),
    I = a.reduce((o, k) => o + k, 0),
    T = z.reduce((o, k) => o + k, 0),
    f = T > 0 ? Math.round((A?.total_revenue || 0) / T * 100) : 0,
    W = P.slice(0, 10),
    R = I > 0 ? Math.round(W.reduce((o, k) => o + k.total_visits, 0) / I * 100) : 0,
    K = Math.max(1, Math.ceil(i.length * .2)),
    s = P.slice(0, K),
    b = I > 0 ? Math.round(s.reduce((o, k) => o + k.total_visits, 0) / I * 100) : 0,
    Z = J(a),
    _ = Math.round(Z * 100),
    H = J(z),
    Q = Math.round(H * 100),
    U = [...i].filter(o => o.total_visits > 0).sort((o, k) => (k.revenue_per_visit || 0) - (o.revenue_per_visit || 0)),
    G = U[0],
    e = U[U.length - 1],
    n = Math.round(N(d.filter(o => o > 0))),
    y = Number(N(D.filter(o => o > 0)).toFixed(2)),
    m = [...i].sort((o, k) => (k.orders_per_visit || 0) - (o.orders_per_visit || 0))[0],
    w = [...i].filter(o => o.opd_visits > 50).sort((o, k) => (o.orders_per_visit || 0) - (k.orders_per_visit || 0))[0],
    X = .05,
    L = i.filter(o => {
      const k = (o.opd_visits || 0) + (o.ipd_admissions || 0);
      return k > 0 && (o.ipd_admissions || 0) / k > X
    }).length,
    S = i.filter(o => (o.ipd_admissions || 0) === 0).length,
    c = i.filter(o => (o.ipd_admissions || 0) > 0).length,
    $ = c - L;
  let O, C;
  h > 100 ? (O = `\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C ${l} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${h} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${_}/100 \xB7 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E33\u0E25\u0E31\u0E07\u0E41\u0E25\u0E30 Workload Balance`, C = "#f43f5e") : i.length > 10 && R > 80 ? (O = `\u26A0 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2D\u0E35\u0E22\u0E07\u0E21\u0E32\u0E01 \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 10 \u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A ${R}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \xB7 Gini ${_}/100 \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 Load Balancing`, C = "#f59e0b") : _ > 50 ? (O = `\u26A0 Gini Coefficient \u0E2A\u0E39\u0E07 (${_}/100) \u2014 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \xB7 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling \u0E41\u0E25\u0E30 Cross-training`, C = "#f59e0b") : (O = `\u2713 \u0E41\u0E1E\u0E17\u0E22\u0E4C ${l} \u0E17\u0E48\u0E32\u0E19 \xB7 ${r(g)} \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${h} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${_}/100 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(Math.round(x))}`, C = "#10b981");
  const B = [{
    icon: "\u{1F468}\u200D\u2695\uFE0F",
    title: "1. \u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01 (Workload Analysis)",
    list: [`**\u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E08\u0E23\u0E34\u0E07** ${l} \u0E17\u0E48\u0E32\u0E19 (OPD) \xB7 ${t.ipd_doctors||0} \u0E17\u0E48\u0E32\u0E19 (IPD) \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${p} \u0E27\u0E31\u0E19`, `**\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${h} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (Median)** ${j} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14** ${r(V)} \u0E23\u0E32\u0E22 (${F}/\u0E27\u0E31\u0E19) \xB7 **\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** ${r(v)} \u0E23\u0E32\u0E22`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14-\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** = ${V-v>0?Math.round(V/Math.max(1,v)):1} \u0E40\u0E17\u0E48\u0E32 \xB7 ${V/Math.max(1,v)>20?"\u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07\u0E21\u0E32\u0E01 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":V/Math.max(1,v)>10?"\u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 Burnout":"\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E17\u0E35\u0E48\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"}`, `**Benchmark \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A**: \u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 OPD \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 30\u201350 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19/\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A 1 \u0E23\u0E31\u0E1A ${F} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 ${F>50?"\u26A0 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E01 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout":F>30?"\xB7 \u0E2A\u0E39\u0E07\u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49":"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22"}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21**: ${h>100?"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21":h>50?"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u2014 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49":"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49 \u2014 \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"}`],
    color: h > 100 ? "#f43f5e" : h > 50 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4CA}",
    title: "2. \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (Gini Coefficient & Pareto Analysis)",
    list: [`**Gini Coefficient (\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19)** = ${_}/100 \xB7 ${_>60?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01":_>40?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E15\u0E48\u0E33 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"} \xB7 (\u0E40\u0E01\u0E13\u0E11\u0E4C: 0\u201330 \u0E2A\u0E21\u0E14\u0E38\u0E25 \xB7 31\u201350 \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \xB7 >50 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33)`, `**Pareto 80/20 Test**: \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 20% (${K} \u0E17\u0E48\u0E32\u0E19) \u0E23\u0E31\u0E1A ${b}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${b>80?"\xB7 \u0E15\u0E23\u0E07\u0E15\u0E32\u0E21 Pareto Principle \u2014 \u0E20\u0E32\u0E23\u0E30\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Key Physician \u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01":b>60?"\xB7 \u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07 Pareto":"\xB7 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32 Pareto"}`, `**Top ${Math.min(10,i.length)} \u0E41\u0E1E\u0E17\u0E22\u0E4C** \u0E23\u0E31\u0E1A ${R}% \xB7 **Top 1** (${A?.name||"\u2014"}) \u0E23\u0E31\u0E1A ${Math.round((A?.total_visits||0)/I*100)}% (${r(A?.total_visits||0)} \u0E23\u0E32\u0E22)`, `**Gini \u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49** = ${Q}/100 \xB7 ${Q>60?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07":Q>40?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E21\u0E14\u0E38\u0E25"} \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E02\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B**: ${_>50&&R>80?"\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E49\u0E2D\u0E22\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u2014 \u0E04\u0E27\u0E23\u0E25\u0E07\u0E17\u0E38\u0E19 Cross-training \u0E41\u0E25\u0E30\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19":_>40?"\u0E21\u0E35\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`],
    color: _ > 50 ? "#f43f5e" : _ > 35 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4B0}",
    title: "3. \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E40\u0E0A\u0E34\u0E07\u0E40\u0E28\u0E23\u0E29\u0E10\u0E01\u0E34\u0E08 (Revenue Efficiency)",
    list: [`**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21\u0E08\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C** \u0E3F${r(Math.round(T))} \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u0E3F${r(Math.round(T/Math.max(1,i.length)))}/\u0E41\u0E1E\u0E17\u0E22\u0E4C`, `**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22 (Revenue per Visit)** \u2014 \u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(n)}/\u0E23\u0E32\u0E22 \xB7 \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 ${G?`${G.name} \u0E3F${r(G.revenue_per_visit)}/\u0E23\u0E32\u0E22`:"\u2014"} \xB7 \u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14 ${e?`${e.name} \u0E3F${r(e.revenue_per_visit)}/\u0E23\u0E32\u0E22`:"\u2014"}`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07 Revenue/Visit** = ${G&&e&&e.revenue_per_visit>0?Math.round(G.revenue_per_visit/e.revenue_per_visit):"\u2014"} \u0E40\u0E17\u0E48\u0E32 \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 case-mix (\u0E42\u0E23\u0E04\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E23\u0E32\u0E04\u0E32\u0E2A\u0E39\u0E07) \u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22`, `**Top Earner**: ${A?.name||"\u2014"} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(A?.total_revenue||0)} (${f}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22 \u0E3F${r(A?.revenue_per_visit||0)}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${f>25?"\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19 25% \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2B\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22":f>15?"\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07":"\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35 \u0E44\u0E21\u0E48\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E40\u0E14\u0E35\u0E22\u0E27"}`],
    color: f > 25 ? "#f43f5e" : f > 15 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F9EA}",
    title: "4. \u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 (Clinical Order Management)",
    list: [`**Lab Orders \u0E23\u0E27\u0E21** ${r(t.lab_orders)} \xB7 **X-Ray Orders \u0E23\u0E27\u0E21** ${r(t.xray_orders)} \xB7 **Orders/Visit \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${y}`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14**: ${m?`${m.name} \u2014 ${m.orders_per_visit} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07/\u0E23\u0E32\u0E22`:"\u2014"} ${m&&m.orders_per_visit>2?"\u26A0 \u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E01\u0E15\u0E34\u0E21\u0E32\u0E01 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway \u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E34\u0E14\u0E02\u0E36\u0E49\u0E19":""}`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** (\u0E17\u0E35\u0E48\u0E21\u0E35 OPD > 50 \u0E23\u0E32\u0E22): ${w?`${w.name} \u2014 ${w.orders_per_visit} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07/\u0E23\u0E32\u0E22`:"\u2014"} ${w&&w.orders_per_visit<.2?"\xB7 \u0E2D\u0E32\u0E08\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 Under-investigation \u0E2B\u0E23\u0E37\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23":""}`, `**Lab : X-Ray Ratio** = ${t.xray_orders>0?(t.lab_orders/t.xray_orders).toFixed(1):"\u2014"} : 1 ${t.lab_orders/Math.max(1,t.xray_orders)>10?"\xB7 Lab \u0E40\u0E14\u0E48\u0E19 (\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E01\u0E31\u0E1A NCD/MedOPD)":t.lab_orders/Math.max(1,t.xray_orders)>5?"\xB7 \u0E2A\u0E21\u0E14\u0E38\u0E25":"\xB7 X-Ray \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E01\u0E31\u0E1A Ortho/ER)"}`, "**\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30**: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Clinical Variation \u2014 \u0E04\u0E27\u0E32\u0E21\u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E02\u0E2D\u0E07 Orders/Visit \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E22\u0E30 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E23\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21"],
    color: m && m.orders_per_visit > 2 ? "#f59e0b" : "#0ea5e9"
  }, {
    icon: "\u{1F3E5}",
    title: "5. \u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E01\u0E32\u0E23\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 (Practice Pattern)",
    list: [`**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IPD \u0E08\u0E23\u0E34\u0E07** ${c} \u0E17\u0E48\u0E32\u0E19 (${Math.round(c/Math.max(1,i.length)*100)}%) \u2014 \u0E23\u0E27\u0E21 ${r(t.ipd_admissions)} Admission \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30 OPD (\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A IPD \u0E40\u0E25\u0E22)** ${S} \u0E17\u0E48\u0E32\u0E19 (${Math.round(S/Math.max(1,i.length)*100)}%)`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD-heavy (IPD > 5% \u0E02\u0E2D\u0E07 Visit)** ${L} \u0E17\u0E48\u0E32\u0E19 (${Math.round(L/Math.max(1,i.length)*100)}%) \u2014 \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Admission \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E0A\u0E38\u0E21\u0E0A\u0E19`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C Balanced (\u0E23\u0E31\u0E1A IPD \u0E41\u0E15\u0E48 \u2264 5%)** ${$} \u0E17\u0E48\u0E32\u0E19 (${Math.round($/Math.max(1,i.length)*100)}%) \u2014 \u0E14\u0E39\u0E41\u0E25\u0E17\u0E31\u0E49\u0E07 OPD \u0E41\u0E25\u0E30 IPD \u0E43\u0E19\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E01\u0E15\u0E34`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${c>=10?`\u0E21\u0E35\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A IPD \u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D (${c} \u0E17\u0E48\u0E32\u0E19)`:c>=5?`\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD \u0E1E\u0E2D\u0E43\u0E0A\u0E49\u0E41\u0E15\u0E48\u0E04\u0E27\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21 (${c} \u0E17\u0E48\u0E32\u0E19)`:`\u26A0 \u0E41\u0E1E\u0E17\u0E22\u0E4C IPD \u0E19\u0E49\u0E2D\u0E22\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (${c} \u0E17\u0E48\u0E32\u0E19) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`}`, `**Cross-coverage**: ${S>i.length*.6?"\u26A0 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A IPD \u2014 \u0E04\u0E27\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 IPD":"\u0E01\u0E32\u0E23\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 OPD/IPD \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"}`],
    color: c < 5 ? "#f43f5e" : S > i.length * .6 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u26A0",
    title: "6. \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E1A\u0E15\u0E32 (Key Risk Signals)",
    list: [`**Top-Doctor Dependency** \u2014 Top 1 \u0E23\u0E31\u0E1A ${Math.round((A?.total_visits||0)/Math.max(1,I)*100)}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22, ${f}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${Math.round((A?.total_visits||0)/Math.max(1,I)*100)>20?"\u26A0 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E2B\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22":"\u2713 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"}`, `**Burnout Risk** \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34 > 1,500 \u0E23\u0E32\u0E22/${p} \u0E27\u0E31\u0E19 \u0E21\u0E35 ${i.filter(o=>o.total_visits>1500).length} \u0E17\u0E48\u0E32\u0E19 ${i.filter(o=>o.total_visits>1500).length>3?"\u26A0 \u0E2B\u0E25\u0E32\u0E22\u0E17\u0E48\u0E32\u0E19\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout \u0E2A\u0E39\u0E07":""}`, `**Workload Inequality (Gini)** = ${_}/100 ${_>50?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07":"\u2713 \u0E1B\u0E01\u0E15\u0E34"} \xB7 \u0E2B\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19 60 \u0E04\u0E27\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E17\u0E31\u0E19\u0E17\u0E35`, `**Clinical Variation** \u2014 \u0E0A\u0E48\u0E27\u0E07 Orders/Visit \u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E15\u0E48\u0E25\u0E30\u0E17\u0E48\u0E32\u0E19\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19 ${m&&w&&w.orders_per_visit>0?Math.round(m.orders_per_visit/Math.max(.01,w.orders_per_visit)):"\u2014"} \u0E40\u0E17\u0E48\u0E32 \u2014 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Appropriateness`, `**Revenue Concentration** \u2014 Top 20% \u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E23\u0E49\u0E32\u0E07 ${b}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${b>80?"\u26A0 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E01\u0E25\u0E38\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E08\u0E33\u0E01\u0E31\u0E14":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35"}`],
    color: _ > 50 || f > 25 ? "#f43f5e" : "#f59e0b"
  }, {
    icon: "\u{1F3AF}",
    title: "7. \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E41\u0E25\u0E30\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E34\u0E07\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23 (Recommendations)",
    list: [h > 100 ? `**\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19** \u2014 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${h} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19) \xB7 \u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E08\u0E49\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21 \u0E2B\u0E23\u0E37\u0E2D\u0E02\u0E22\u0E32\u0E22\u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E02\u0E22\u0E32\u0E22 Sub-specialty` : null, _ > 50 ? `**Workload Rebalancing** \u2014 Gini ${_}/100 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E14\u0E38\u0E25 \xB7 \u0E08\u0E31\u0E14 Scheduling \u0E43\u0E2B\u0E49\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E41\u0E25\u0E30\u0E01\u0E33\u0E2B\u0E19\u0E14 Quota \u0E15\u0E48\u0E2D\u0E41\u0E1E\u0E17\u0E22\u0E4C` : null, f > 25 ? `**\u0E25\u0E14\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor** \u2014 ${A?.name} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${f}% \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E38\u0E48\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E14\u0E41\u0E17\u0E19 (Succession Plan)` : null, m && m.orders_per_visit > 2 ? "**\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway** \u2014 Orders/Visit \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 \xB7 \u0E15\u0E31\u0E49\u0E07 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14 Over-investigation" : null, c < 5 ? `**\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD** \u2014 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E21\u0E35\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A IPD \u0E40\u0E1E\u0E35\u0E22\u0E07 ${c} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19` : null, "**\u0E23\u0E30\u0E1A\u0E1A\u0E41\u0E23\u0E07\u0E08\u0E39\u0E07\u0E43\u0E08 (Incentive)** \u2014 \u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A Bonus \u0E17\u0E35\u0E48\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E25\u0E30\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E (\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27) \xB7 \u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E42\u0E22\u0E07\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14 HA/KPI", "**Cross-training** \u2014 \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E02\u0E32\u0E14\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23 \xB7 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E04\u0E27\u0E23\u0E21\u0E35\u0E17\u0E31\u0E01\u0E29\u0E30\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21 2\u20133 \u0E42\u0E23\u0E04\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2B\u0E25\u0E31\u0E01", "**\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19** \u2014 \u0E43\u0E0A\u0E49 Dashboard \u0E19\u0E35\u0E49\u0E17\u0E1A\u0E17\u0E27\u0E19 Workload Balance \u0E41\u0E25\u0E30 Revenue Concentration \u0E40\u0E1B\u0E47\u0E19\u0E1B\u0E23\u0E30\u0E08\u0E33"].filter(Boolean),
    color: "#7c3aed"
  }];
  return {
    headline: O,
    headlineColor: C,
    kpi: [{
      label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48",
      value: r(l),
      sub: `OPD ${l} \xB7 IPD ${t.ipd_doctors||0}`,
      color: "#0284c7"
    }, {
      label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 OPD",
      value: r(g),
      sub: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${h} \xB7 Median ${j}`,
      color: "#7c3aed"
    }, {
      label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IPD",
      value: r(t.ipd_admissions),
      sub: `\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD ${t.ipd_doctors||0} \u0E17\u0E48\u0E32\u0E19`,
      color: "#db2777"
    }, {
      label: "Gini Coefficient",
      value: `${_}/100`,
      sub: _ > 50 ? "\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07" : _ > 35 ? "\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E2A\u0E21\u0E14\u0E38\u0E25",
      color: _ > 50 ? "#f43f5e" : _ > 35 ? "#f59e0b" : "#10b981"
    }, {
      label: "Top 20% Share",
      value: `${b}%`,
      sub: b > 80 ? "Pareto \u2014 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E39\u0E07" : "\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E01\u0E15\u0E34",
      color: b > 80 ? "#f59e0b" : "#10b981"
    }, {
      label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
      value: `\u0E3F${r(Math.round(x))}`,
      sub: `Top 1: ${f}%`,
      color: "#10b981"
    }],
    sections: B,
    footerLeft: `${i.length} \u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 ${E.period.days?`\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${E.period.days} \u0E27\u0E31\u0E19`:`${E.period.start} \u2192 ${E.period.end}`} \xB7 HOSxP XE \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function g0(E) {
  if (!E?.summary || !E?.dentists) return {
    headline: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \u2014 AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E30\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E40\u0E21\u0E37\u0E48\u0E2D data \u0E1E\u0E23\u0E49\u0E2D\u0E21",
    empty: !0
  };
  const t = E.dentists || [],
    i = E.summary.dental_doctors || 0,
    l = E.summary.total_dentists || 0,
    g = E.summary.dental_visits || 0,
    h = E.summary.dental_revenue || 0,
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
  const p = i > 0 ? Math.round(g / i) : 0,
    a = Math.round(g / Math.max(1, x) / Math.max(1, i) * 10) / 10,
    z = [...t].sort((s, b) => (b.opd_visits || 0) - (s.opd_visits || 0))[0],
    D = Math.round(N(t.map(s => s.opd_visits || 0))),
    d = Math.max(...t.map(s => s.opd_visits || 0)),
    P = Math.min(...t.map(s => s.opd_visits || 0)),
    A = [...t].sort((s, b) => (b.total_revenue || 0) - (s.total_revenue || 0))[0],
    j = h > 0 ? Math.round((A.total_revenue || 0) / h * 100) : 0,
    V = Math.round(N(t.map(s => s.revenue_per_visit || 0).filter(s => s > 0))),
    v = Math.round(J(t.map(s => s.opd_visits || 0)) * 100),
    F = Math.round(J(t.map(s => s.total_revenue || 0)) * 100),
    I = t.reduce((s, b) => s + (b.lab_orders || 0) + (b.xray_orders || 0), 0),
    T = g > 0 ? (I / g).toFixed(2) : "0.00",
    f = l > 0 ? Math.round(i / l * 100) : 0;
  let W, R;
  a > 30 ? (W = `\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07 \u2014 ${i} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${a} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 (\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 20-30 \u0E40\u0E04\u0E2A) \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout`, R = "#f43f5e") : j > 35 ? (W = `\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top 1 \u0E2A\u0E39\u0E07 \u2014 ${A.name} = ${j}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2B\u0E32\u0E01\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22`, R = "#f59e0b") : f < 60 && l >= 3 ? (W = `\u26A0 Utilization \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E15\u0E48\u0E33 \u2014 ${i}/${l} \u0E17\u0E48\u0E32\u0E19 (${f}%) \u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 rebalance \u0E15\u0E32\u0E23\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01`, R = "#f59e0b") : (W = `\u2713 \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C ${i}/${l} \u0E17\u0E48\u0E32\u0E19 \xB7 ${r(g)} \u0E40\u0E04\u0E2A \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${p} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${v}/100 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(Math.round(h))}`, R = "#10b981");
  const K = [{
    icon: "\u{1F9B7}",
    title: "1. \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
    list: [`**\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19** ${i}/${l} \u0E17\u0E48\u0E32\u0E19 (${f}% \u0E02\u0E2D\u0E07 roster) \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${x} \u0E27\u0E31\u0E19`, `**\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${p} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07** ${D} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14** ${r(d)} (${z?.name||"\u2014"}) \xB7 **\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** ${r(P)}`, `**\u0E20\u0E32\u0E23\u0E30\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19** \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${a} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 ${a>30?"\u26A0 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 20-30 \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout":a>20?"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19":"\xB7 \u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49 \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"}`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E17\u0E48\u0E32\u0E19** = ${P>0?Math.round(d/Math.max(1,P)):d>0?"\u2014":"1"} \u0E40\u0E17\u0E48\u0E32 ${d>0&&P>0&&d/P>5?"\xB7 \u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"}`],
    color: a > 30 ? "#f43f5e" : a > 20 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4CA}",
    title: "2. \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (Gini Analysis)",
    list: [`**Gini \u0E40\u0E04\u0E2A** = ${v}/100 \xB7 ${v>50?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07 \u2014 Case \u0E42\u0E2B\u0E25\u0E14\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E32\u0E07\u0E17\u0E48\u0E32\u0E19":v>35?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"}`, `**Gini \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49** = ${F}/100 \xB7 ${F>50?"\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top \u0E19\u0E49\u0E2D\u0E22\u0E04\u0E19":F>35?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"}`, `**Top 1 (${A?.name||"\u2014"})** \u0E23\u0E31\u0E1A ${Math.round((z?.opd_visits||0)/Math.max(1,g)*100)}% \u0E02\u0E2D\u0E07\u0E40\u0E04\u0E2A \xB7 ${j}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B**: ${v>50||j>35?"\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E49\u0E2D\u0E22\u0E2A\u0E39\u0E07 \u2014 \u0E04\u0E27\u0E23\u0E25\u0E07\u0E17\u0E38\u0E19 scheduling \u0E43\u0E2B\u0E21\u0E48\u0E41\u0E25\u0E30\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`],
    color: v > 50 || j > 35 ? "#f43f5e" : v > 35 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4B0}",
    title: "3. \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (Revenue Efficiency)",
    list: [`**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21** \u0E3F${r(Math.round(h))} \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u0E3F${r(Math.round(h/Math.max(1,i)))}/\u0E17\u0E48\u0E32\u0E19`, `**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E40\u0E04\u0E2A (Revenue per Case)** \u2014 \u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(V)}/\u0E40\u0E04\u0E2A \xB7 Top Earner: ${A?.name||"\u2014"} \u0E3F${r(A?.revenue_per_visit||0)}/\u0E40\u0E04\u0E2A`, `**Top Earner \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21** ${A?.name||"\u2014"} = \u0E3F${r(Math.round(A?.total_revenue||0))} (${j}%) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E40\u0E04\u0E2A \u0E3F${r(A?.revenue_per_visit||0)}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${j>40?"\u26A0 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Dentist \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B":j>25?"\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Dentist \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35 \u0E44\u0E21\u0E48\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E40\u0E14\u0E35\u0E22\u0E27"}`],
    color: j > 40 ? "#f43f5e" : j > 25 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F9EA}",
    title: "4. \u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 (Order Management)",
    list: [`**Lab Orders \u0E23\u0E27\u0E21** ${r(t.reduce((s,b)=>s+(b.lab_orders||0),0))} \xB7 **X-Ray Orders \u0E23\u0E27\u0E21** ${r(t.reduce((s,b)=>s+(b.xray_orders||0),0))} \xB7 **Orders/\u0E40\u0E04\u0E2A \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${T}`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E31\u0E07\u0E40\u0E01\u0E15**: \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E43\u0E0A\u0E49 X-Ray (Panoramic, Bitewing, Periapical) \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 Lab \xB7 Orders/Case ${parseFloat(T)>.8?"\u0E2A\u0E39\u0E07 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A X-Ray indication":parseFloat(T)>.3?"\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C":"\u0E15\u0E48\u0E33 \u2014 \u0E2D\u0E32\u0E08\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 routine treatment \u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E15\u0E49\u0E2D\u0E07 imaging"}`, "**\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30**: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Clinical Variation \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 Orders/Case \u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19\u0E21\u0E32\u0E01 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E23\u0E08\u0E31\u0E14 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21"],
    color: "#0ea5e9"
  }, {
    icon: "\u{1F3AF}",
    title: "5. \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
    list: [f < 60 && l >= 3 ? `**Rebalance \u0E15\u0E32\u0E23\u0E32\u0E07** \u2014 ${i}/${l} \u0E17\u0E48\u0E32\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 (${f}%) \xB7 \u0E2D\u0E32\u0E08\u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E43\u0E2B\u0E49\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48 active \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30` : null, j > 35 ? `**\u0E25\u0E14\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top 1** \u2014 ${A?.name} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${j}% \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E48\u0E32\u0E19\u0E2D\u0E37\u0E48\u0E19\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E14\u0E41\u0E17\u0E19 (Succession Plan)` : null, v > 50 ? `**Workload Rebalancing** \u2014 Gini ${v}/100 \xB7 \u0E08\u0E31\u0E14 Scheduling \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E40\u0E04\u0E2A\u0E41\u0E25\u0E30\u0E01\u0E33\u0E2B\u0E19\u0E14 Quota` : null, a > 30 ? `**\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19** \u2014 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${a} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C part-time \u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E37\u0E14\u0E40\u0E27\u0E25\u0E32 per-case` : null, "**Recall Program** \u2014 \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E21\u0E35\u0E28\u0E31\u0E01\u0E22\u0E20\u0E32\u0E1E recall \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E14\u0E34\u0E21 (\u0E02\u0E39\u0E14\u0E2B\u0E34\u0E19\u0E1B\u0E39\u0E19 6 \u0E40\u0E14\u0E37\u0E2D\u0E19, \u0E1F\u0E31\u0E19\u0E1C\u0E38\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 3 \u0E40\u0E14\u0E37\u0E2D\u0E19) \xB7 \u0E0A\u0E48\u0E27\u0E22\u0E23\u0E31\u0E01\u0E29\u0E32\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 stable", "**\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C** \u2014 \u0E14\u0E39 Trends \u0E41\u0E25\u0E30 Utilization \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \xB7 \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E1B\u0E47\u0E19 7 \u0E27\u0E31\u0E19/30 \u0E27\u0E31\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E2B\u0E47\u0E19 pattern"].filter(Boolean),
    color: "#7c3aed"
  }];
  return {
    headline: W,
    headlineColor: R,
    kpi: [],
    sections: K,
    footerLeft: `${t.length} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 ${E.period.days?`\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${E.period.days} \u0E27\u0E31\u0E19`:`${E.period.start} \u2192 ${E.period.end}`} \xB7 HOSxP XE \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function x0({
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
    i = l => u.jsx("div", {
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
      children: [i("\u{1F4CC} \u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"), u.jsx("div", {
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
      children: [i("\u{1F50D} \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 (Root Cause Hypothesis)"), u.jsx("div", {
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
      children: [i("\u{1F3AF} \u0E41\u0E1C\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23 (Action Plan)"), u.jsx("ol", {
        style: {
          margin: "4px 0 0 0",
          paddingLeft: "20px"
        },
        children: E.actions.map((l, g) => u.jsx("li", {
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
        }, g))
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
        children: [i("\u2705 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 / KPI"), u.jsx("div", {
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
        children: [i("\u{1F465} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A"), u.jsx("div", {
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
        children: [i("\u{1F381} \u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E17\u0E35\u0E48\u0E04\u0E32\u0E14\u0E2B\u0E27\u0E31\u0E07"), u.jsx("div", {
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
  rank: i
}) {
  const l = (h, x, p, a) => u.jsxs("div", {
      style: {
        flex: "1 1 180px",
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderTop: `3px solid ${a}`,
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
        children: h
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
    g = (h, x, p, a) => u.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderLeft: `3px solid ${a}`,
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
        children: [h, " ", x]
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
        children: p.map((z, D) => u.jsx("li", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-primary)",
            lineHeight: 1.6,
            fontWeight: 500,
            marginBottom: "3px"
          },
          children: z
        }, D))
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
        children: ["\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ", i, " \xB7 Percentile ", t.visitPercentile]
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
      children: [g("\u2705", "\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19 (Strengths)", t.strengths, "#10b981"), g("\u26A0", "\u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19\u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 (Concerns)", t.concerns, "#f59e0b"), g("\u{1F3AF}", "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E1A\u0E38\u0E04\u0E04\u0E25", t.recs, "#7c3aed")]
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
      }), t.deepRecs.map((h, x) => u.jsx(x0, {
        rec: h
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
  const [E, t] = M.useState(null), [i, l] = M.useState(!0), [g, h] = M.useState(null), [x, p] = M.useState("today"), [a, z] = M.useState(1), [D, d] = M.useState(q()), [P, A] = M.useState(q()), [j, V] = M.useState("total_visits"), [v, F] = M.useState(() => new Set), [I, T] = M.useState(!1), [f, W] = M.useState(null), [R, K] = M.useState(() => new Set), [s, b] = M.useState(!1), Z = M.useCallback(e => {
    F(n => {
      const y = new Set(n);
      return y.has(e) ? y.delete(e) : y.add(e), y
    })
  }, []), _ = M.useCallback(async () => {
    l(!0), h(null);
    try {
      const e = q(),
        n = o0(new Date(Date.now() - 864e5)),
        y = (() => {
          const L = new Date;
          return L.setDate(1), o0(L)
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
          m = `start=${D}&end=${P}`;
          break;
        default:
          m = "days=1"
      }
      const w = await fetch(`/api/doctor/activity-summary?${m}`, {
        credentials: "include"
      });
      if (!w.ok) throw new Error(`HTTP ${w.status}`);
      const X = await w.json();
      t(X)
    } catch (e) {
      h(e.message)
    }
    l(!1)
  }, [x, a, D, P]);
  M.useEffect(() => {
    _()
  }, [_]);
  const H = M.useMemo(() => E?.doctors ? [...E.doctors].sort((e, n) => (n[j] || 0) - (e[j] || 0)) : [], [E, j]),
    Q = M.useMemo(() => H.length ? H.slice(0, 3).map(e => ({
      name: (e.name || "").replace(/^(นพ\.|พญ\.|ศ\.|รศ\.|ผศ\.)/, ""),
      OPD: e.opd_visits,
      IPD: e.ipd_admissions,
      Orders: e.total_orders
    })) : [], [H]),
    U = M.useMemo(() => {
      const e = (E?.dentists || []).slice().sort((n, y) => (y.opd_visits || 0) - (n.opd_visits || 0));
      return e.length ? e.slice(0, 3).map(n => ({
        name: (n.name || "").replace(/^(ทพ\.|ทพญ\.)/, ""),
        OPD: n.opd_visits || 0,
        Orders: (n.lab_orders || 0) + (n.xray_orders || 0)
      })) : []
    }, [E]),
    G = M.useMemo(() => E?.trend_7d ? E.trend_7d.map(e => ({
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
          value: D,
          max: P,
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
          value: P,
          min: D,
          max: q(),
          onChange: e => A(e.target.value),
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
    }), g && u.jsxs("div", {
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(239,68,68,.08)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: ["\u26A0 ", g]
    }), i && u.jsx("div", {
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
    }), !i && E && (() => {
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
        w = y.slice(7),
        X = (S, c, $) => u.jsxs("div", {
          onClick: () => W(n[$]),
          role: "button",
          tabIndex: 0,
          onKeyDown: O => {
            (O.key === "Enter" || O.key === " ") && (O.preventDefault(), W(n[$]))
          },
          style: {
            background: "var(--md-surface)",
            border: f === n[$] ? `2px solid ${S.color||"#7c3aed"}` : "1px solid var(--md-border)",
            borderTop: `3px solid ${S.color||"#7c3aed"}`,
            borderRadius: "10px",
            padding: "10px 12px",
            minWidth: 0,
            cursor: "pointer",
            transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
            outline: "none"
          },
          onMouseEnter: O => {
            O.currentTarget.style.transform = "translateY(-1px)", O.currentTarget.style.boxShadow = `0 4px 12px ${S.color||"#7c3aed"}40`
          },
          onMouseLeave: O => {
            O.currentTarget.style.transform = "", O.currentTarget.style.boxShadow = ""
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
            children: S.label
          }), u.jsx("div", {
            style: {
              fontSize: "17px",
              fontWeight: 900,
              color: S.accent || S.color || "#7c3aed",
              lineHeight: 1.1
            },
            children: S.value
          }), u.jsx("div", {
            style: {
              fontSize: "11px",
              color: "var(--md-text-tertiary)",
              marginTop: "3px",
              fontWeight: 600
            },
            children: `${S.sub||""} \xB7 \u{1F50D} \u0E04\u0E25\u0E34\u0E01\u0E14\u0E39`
          })]
        }, $),
        L = (S, c, $) => u.jsxs("div", {
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
              background: $,
              borderRadius: "99px"
            }
          }), u.jsxs("div", {
            style: {
              fontSize: "13px",
              fontWeight: 900,
              color: "var(--md-text-primary)",
              letterSpacing: "0.02em"
            },
            children: [S, " ", c]
          })]
        });
      return u.jsxs(M.Fragment, {
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
            children: m.map((S, c) => X(S, c, c))
          })]
        }), w.length > 0 && u.jsxs("div", {
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
              children: [w.length, " KPI"]
            })]
          }), u.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "10px"
            },
            children: w.map((S, c) => X(S, c, c + 7))
          })]
        }), !1, f && u.jsxs("div", {
          ref: S => {
            S && setTimeout(() => S.scrollIntoView({
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
              const S = {
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
                    filter: B => B.ipd_admissions > 0,
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
                c = S[f] || S.doctors;
              let $ = [...(c.dataKey ? E[c.dataKey] : E.doctors) || []];
              c.filter && ($ = $.filter(c.filter)), $.sort((B, o) => c.asc ? (B[c.sortKey] || 0) - (o[c.sortKey] || 0) : (o[c.sortKey] || 0) - (B[c.sortKey] || 0)), c.limit && ($ = $.slice(0, c.limit));
              const O = $.reduce((B, o) => B + (o[c.sortKey] || 0), 0),
                C = B => c.showCols.includes(B);
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
                  onClick: () => W(null),
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
                children: $.length === 0 ? u.jsx("div", {
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
                      }), C("opd") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "OPD"
                      }), C("ipd") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "IPD"
                      }), C("orders") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "Orders"
                      }), C("total") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E27\u0E21"
                      }), C("opdRev") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 OPD"
                      }), C("ipdRev") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 IPD"
                      }), C("rev") && u.jsx("th", {
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
                    children: [...$.map((B, o) => {
                      const k = O > 0 ? Math.round((B[c.sortKey] || 0) / O * 100) : 0;
                      return u.jsxs("tr", {
                        style: {
                          borderBottom: "1px solid var(--md-divider)"
                        },
                        children: [u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            fontWeight: 700,
                            color: o < 3 ? c.color : "var(--md-text-tertiary)"
                          },
                          children: o === 0 ? "\u{1F947}" : o === 1 ? "\u{1F948}" : o === 2 ? "\u{1F949}" : `#${o+1}`
                        }), u.jsxs("td", {
                          style: {
                            padding: "8px 6px",
                            fontWeight: 700,
                            color: "var(--md-text-primary)"
                          },
                          children: [B.name || B.code, B.position ? u.jsx("div", {
                            style: {
                              fontSize: "10px",
                              color: "var(--md-text-tertiary)",
                              fontWeight: 500
                            },
                            children: B.position
                          }) : null]
                        }), C("opd") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#7c3aed"
                          },
                          children: r(B.opd_visits || 0)
                        }), C("ipd") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#db2777"
                          },
                          children: r(B.ipd_admissions || 0)
                        }), C("orders") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: r((B.lab_orders || 0) + (B.xray_orders || 0))
                        }), C("total") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700
                          },
                          children: r(B.total_visits || 0)
                        }), C("opdRev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: `\u0E3F${r(Math.round(B.opd_revenue||0))}`
                        }), C("ipdRev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: `\u0E3F${r(Math.round(B.ipd_revenue||0))}`
                        }), C("rev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#10b981"
                          },
                          children: `\u0E3F${r(Math.round(B.total_revenue||0))}`
                        }), u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: c.color
                          },
                          children: `${k}%`
                        })]
                      }, B.code || o)
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
                        children: `\u0E23\u0E27\u0E21 (${$.length} \u0E17\u0E48\u0E32\u0E19)`
                      }), C("opd") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#7c3aed"
                        },
                        children: r($.reduce((B, o) => B + (o.opd_visits || 0), 0))
                      }), C("ipd") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#db2777"
                        },
                        children: r($.reduce((B, o) => B + (o.ipd_admissions || 0), 0))
                      }), C("orders") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: r($.reduce((B, o) => B + ((o.lab_orders || 0) + (o.xray_orders || 0)), 0))
                      }), C("total") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: r($.reduce((B, o) => B + (o.total_visits || 0), 0))
                      }), C("opdRev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: `\u0E3F${r(Math.round($.reduce((B,o)=>B+(o.opd_revenue||0),0)))}`
                      }), C("ipdRev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: `\u0E3F${r(Math.round($.reduce((B,o)=>B+(o.ipd_revenue||0),0)))}`
                      }), C("rev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#10b981"
                        },
                        children: `\u0E3F${r(Math.round($.reduce((B,o)=>B+(o.total_revenue||0),0)))}`
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
        }), u.jsx(d0, {
          title: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
          subtitle: "Doctor Productivity \xB7 Workload Balance \xB7 Revenue per Physician",
          badge: "\u{1F4D0} Rule-based Analysis",
          accentColor: "#0284c7",
          headerGradient: "linear-gradient(135deg, rgba(2,132,199,.10), rgba(124,58,237,.06))",
          narrative: {
            ...e,
            kpi: []
          }
        }), u.jsx(d0, {
          title: "\u{1F9B7} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
          subtitle: "Dental Productivity \xB7 Workload Balance \xB7 Revenue per Dentist",
          badge: "\u{1F4D0} Rule-based Analysis",
          accentColor: "#06b6d4",
          headerGradient: "linear-gradient(135deg, rgba(6,182,212,.10), rgba(8,145,178,.06))",
          narrative: g0(E)
        })]
      })
    })(), !i && E && Q.length > 0 && u.jsxs("div", {
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
        children: ["\u{1F4CA} \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 3 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21 ", j === "total_visits" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : j === "opd_visits" ? "OPD Visits" : j === "ipd_admissions" ? "IPD Admissions" : j === "total_orders" ? "Lab/X-Ray Orders" : "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"]
      }), u.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px"
        },
        children: [
          ["OPD", "OPD (\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01)", "#7c3aed"],
          ["IPD", "IPD (\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19)", "#db2777"],
          ["Orders", "\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07 Lab/X-Ray", "#0ea5e9"]
        ].map(function(e) {
          var n = e[0],
            y = e[1],
            m = e[2];
          return u.jsxs("div", {
            children: [u.jsx("div", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: m,
                marginBottom: "8px",
                textAlign: "center",
                letterSpacing: "0.02em"
              },
              children: y
            }), u.jsx(E0, {
              width: "100%",
              height: 300,
              children: u.jsxs(n0, {
                data: Q,
                margin: {
                  top: 6,
                  right: 12,
                  left: 6,
                  bottom: 100
                },
                children: [u.jsx(e0, {
                  strokeDasharray: "3 3",
                  stroke: "var(--md-divider)"
                }), u.jsx(t0, {
                  dataKey: "name",
                  angle: -40,
                  textAnchor: "end",
                  interval: 0,
                  height: 100,
                  tick: {
                    fill: "#6b7280",
                    fontSize: 10
                  }
                }), u.jsx(Y, {
                  tick: {
                    fill: "#9ca3af",
                    fontSize: 10
                  },
                  allowDecimals: !1
                }), u.jsx(r0, {
                  contentStyle: {
                    background: "var(--md-surface)",
                    border: "1px solid var(--md-border)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }
                }), u.jsx(i0, {
                  dataKey: n,
                  fill: m,
                  radius: [6, 6, 0, 0]
                })]
              })
            })]
          }, n)
        })
      })]
    }), !i && E && U.length > 0 && u.jsxs("div", {
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
      }), u.jsx(E0, {
        width: "100%",
        height: 360,
        children: u.jsxs(n0, {
          data: U,
          margin: {
            top: 10,
            right: 20,
            left: 10,
            bottom: 140
          },
          children: [u.jsx(e0, {
            strokeDasharray: "3 3",
            stroke: "var(--md-divider)"
          }), u.jsx(t0, {
            dataKey: "name",
            angle: -40,
            textAnchor: "end",
            interval: 0,
            height: 140,
            tick: {
              fill: "#6b7280",
              fontSize: 11
            }
          }), u.jsx(Y, {
            tick: {
              fill: "#9ca3af",
              fontSize: 11
            }
          }), u.jsx(r0, {
            contentStyle: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "8px",
              fontSize: "12px"
            }
          }), u.jsx(s0, {}), u.jsx(i0, {
            dataKey: "OPD",
            fill: "#06b6d4",
            radius: [6, 6, 0, 0]
          }), u.jsx(i0, {
            dataKey: "Orders",
            fill: "#0ea5e9",
            radius: [6, 6, 0, 0]
          })]
        })
      })]
    }), !i && E && G.length > 0 && u.jsxs("div", {
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
      }), u.jsx(E0, {
        width: "100%",
        height: 240,
        children: u.jsxs(p0, {
          data: G,
          margin: {
            top: 10,
            right: 20,
            left: 10,
            bottom: 10
          },
          children: [u.jsx(e0, {
            strokeDasharray: "3 3",
            stroke: "var(--md-divider)"
          }), u.jsx(t0, {
            dataKey: "date",
            tick: {
              fill: "#6b7280",
              fontSize: 11
            }
          }), u.jsx(Y, {
            yAxisId: "left",
            tick: {
              fill: "#9ca3af",
              fontSize: 11
            }
          }), u.jsx(Y, {
            yAxisId: "right",
            orientation: "right",
            tick: {
              fill: "#9ca3af",
              fontSize: 11
            }
          }), u.jsx(r0, {
            contentStyle: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "8px",
              fontSize: "12px"
            }
          }), u.jsx(s0, {}), u.jsx(a0, {
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
    }), !i && E && H.length > 0 && u.jsxs("div", {
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
            children: ["\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E25\u0E30\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21 (", H.length, " \u0E17\u0E48\u0E32\u0E19)"]
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
            I ? (F(new Set), T(!1)) : (F(new Set(H.map(e => e.code))), T(!0))
          },
          style: {
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 800,
            cursor: "pointer",
            background: I ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "var(--md-surface)",
            color: I ? "#fff" : "var(--md-text-primary)"
          },
          children: I ? "\u25BC \u0E0B\u0E48\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : "\u25B6 \u0E41\u0E2A\u0E14\u0E07\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E17\u0E38\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C"
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
            children: H.map((e, n) => {
              const y = v.has(e.code),
                m = y ? l0(e, H, E.period?.days ? E.period.days : Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1)) : null;
              return u.jsxs(u0.Fragment, {
                children: [u.jsxs("tr", {
                  onClick: () => Z(e.code),
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
    }), !i && E && (E.dentists || []).length > 0 && u.jsxs("div", {
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
            s ? (K(new Set), b(!1)) : (K(new Set((E.dentists || []).map(e => e.code))), b(!0))
          },
          style: {
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 800,
            cursor: "pointer",
            background: s ? "linear-gradient(135deg, #06b6d4, #0891b2)" : "var(--md-surface)",
            color: s ? "#fff" : "var(--md-text-primary)"
          },
          children: s ? "\u25BC \u0E0B\u0E48\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : "\u25B6 \u0E41\u0E2A\u0E14\u0E07\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E17\u0E38\u0E01\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C"
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
              const y = R.has(e.code),
                m = E.period?.days || Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1),
                w = y ? l0(e, E.dentists, m) : null;
              return u.jsxs(u0.Fragment, {
                children: [u.jsxs("tr", {
                  onClick: () => K(X => {
                    const L = new Set(X);
                    return L.has(e.code) ? L.delete(e.code) : L.add(e.code), L
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
                    children: u.jsx(x0, {
                      doctor: e,
                      analysis: w,
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
    }), !i && E && H.length === 0 && u.jsxs("div", {
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
const m0 = u0.memo(B0);
export {
  m0 as
  default
};