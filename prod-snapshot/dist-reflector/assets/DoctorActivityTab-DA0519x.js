import {
  R as Z,
  r as z,
  j as u
} from "./vendor-react-ByYOq5k4.js";
import {
  E as e0,
  q as r
} from "./shared-ui-OVDEF1.js";
import {
  R as o0,
  a as n0,
  X as d0,
  Y as t0,
  T as a0,
  L as s0,
  g as l0,
  b as u0
} from "./vendor-charts-C5q2M-g3.js";
const E0 = E => {
    const t = E.getFullYear(),
      o = String(E.getMonth() + 1).padStart(2, "0"),
      c = String(E.getDate()).padStart(2, "0");
    return `${t}-${o}-${c}`
  },
  Y = () => E0(new Date),
  U = E => {
    if (!E.length) return 0;
    const t = [...E].sort((c, m) => c - m),
      o = Math.floor(t.length / 2);
    return t.length % 2 === 0 ? (t[o - 1] + t[o]) / 2 : t[o]
  };

function r0(E, t, o) {
  const c = [...t].sort((s, _) => (_.total_visits || 0) - (s.total_visits || 0)).findIndex(s => s.code === E.code) + 1,
    m = Math.round((1 - (c - 1) / Math.max(1, t.length)) * 100),
    A = [...t].sort((s, _) => (_.total_revenue || 0) - (s.total_revenue || 0)).findIndex(s => s.code === E.code) + 1,
    g = U(t.map(s => s.total_visits || 0)),
    h = U(t.map(s => s.revenue_per_visit || 0).filter(s => s > 0)),
    p = U(t.map(s => Number(s.orders_per_visit) || 0).filter(s => s > 0)),
    T = (E.opd_visits || 0) + (E.ipd_admissions || 0),
    $ = T > 0 ? (E.ipd_admissions || 0) / T : 0,
    a = (E.ipd_admissions || 0) === 0 ? "OPD-only (\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19)" : $ > .15 ? `IPD-heavy (${Math.round($*100)}% \u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07)` : `Balanced (OPD ${Math.round((1-$)*100)}% \xB7 IPD ${Math.round($*100)}%)`,
    F = $ > .15 ? "#db2777" : (E.ipd_admissions || 0) === 0 ? "#7c3aed" : "#10b981",
    B = (E.opd_visits || 0) / Math.max(1, o),
    W = B > 50 ? "\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 (\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout)" : B > 30 ? "\u0E2A\u0E39\u0E07 (\u0E40\u0E2B\u0E19\u0E37\u0E48\u0E2D\u0E22\u0E41\u0E15\u0E48\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49)" : B > 15 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : B > 5 ? "\u0E15\u0E48\u0E33 (\u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22)" : "\u0E15\u0E48\u0E33\u0E21\u0E32\u0E01",
    H = B > 50 ? "#f43f5e" : B > 30 ? "#f59e0b" : "#10b981",
    D = Number(E.orders_per_visit) || 0,
    w = Number(E.revenue_per_visit) || 0,
    L = p > 0 && D > p * 1.5 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E21\u0E32\u0E01" : p > 0 && D > p * 1.2 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : p > 0 && D < p * .5 ? "\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34",
    V = h > 0 && w > h * 1.5 ? "\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 (case-mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E23\u0E32\u0E04\u0E32\u0E2A\u0E39\u0E07)" : h > 0 && w > h * 1.2 ? "\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : h > 0 && w < h * .5 ? "\u0E15\u0E48\u0E33 (case \u0E07\u0E48\u0E32\u0E22\u0E2B\u0E23\u0E37\u0E2D\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E1A\u0E34\u0E01\u0E15\u0E48\u0E33)" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34",
    j = [],
    R = [],
    O = [];
  m >= 90 ? j.push(`Top ${Math.max(1,100-m)}% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ${c}/${t.length})`) : m >= 75 && j.push(`Top 25% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ${c}/${t.length})`), w > h * 1.2 && j.push(`\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22\u0E2A\u0E39\u0E07 \u0E3F${r(w)} (\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 ${Math.round((w/Math.max(1,h)-1)*100)}%) \u2014 case-mix \u0E21\u0E35\u0E04\u0E38\u0E13\u0E04\u0E48\u0E32\u0E17\u0E32\u0E07\u0E40\u0E28\u0E23\u0E29\u0E10\u0E01\u0E34\u0E08`), $ > .15 && j.push(`\u0E23\u0E31\u0E1A IPD \u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D (${E.ipd_admissions} \u0E23\u0E32\u0E22 \xB7 ${Math.round($*100)}% \u0E02\u0E2D\u0E07 workload) \u2014 \u0E40\u0E2A\u0E23\u0E34\u0E21\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`), D > 0 && D < p * 1.2 && D > p * .7 && j.push(`Orders/Visit \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (${D}) \u2014 Clinical Pathway \u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21`), B > 50 ? R.push(`\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${Math.round(B)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \xB7 \u0E40\u0E01\u0E13\u0E11\u0E4C 30\u201350) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout`) : B > 30 && (E.ipd_admissions || 0) > 30 && R.push(`\u26A0 OPD ${Math.round(B)}/\u0E27\u0E31\u0E19 + IPD ${E.ipd_admissions} \u0E23\u0E32\u0E22 \u2014 \u0E20\u0E32\u0E23\u0E30\u0E0B\u0E49\u0E2D\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07`), p > 0 && D > p * 1.5 && R.push(`\u26A0 Orders/Visit = ${D} \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (${p.toFixed(2)}) \u0E21\u0E32\u0E01 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Appropriateness`), (E.opd_visits || 0) > 100 && D > 0 && D < .2 && R.push(`\u26A0 Orders/Visit \u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 (${D}) \u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u2014 \u0E2D\u0E32\u0E08 Under-investigation`), (E.ipd_admissions || 0) === 0 && m >= 75 && R.push("\u0E41\u0E1E\u0E17\u0E22\u0E4C OPD-only \u0E41\u0E15\u0E48\u0E20\u0E32\u0E23\u0E30\u0E2A\u0E39\u0E07 \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E43\u0E2B\u0E49\u0E23\u0E48\u0E27\u0E21 IPD rotation"), h > 0 && w < h * .4 && (E.opd_visits || 0) > 100 && R.push(`\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07\u0E21\u0E32\u0E01 (\u0E3F${r(w)} vs \u0E3F${r(h)}) \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Payer Mix \u0E41\u0E25\u0E30 Coding`), (E.lab_orders || 0) === 0 && (E.xray_orders || 0) === 0 && (E.opd_visits || 0) > 50 && R.push(`\u0E44\u0E21\u0E48\u0E21\u0E35 Lab/X-Ray Orders \u0E40\u0E25\u0E22\u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01`), B > 50 && O.push("\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30 OPD \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E08\u0E33\u0E01\u0E31\u0E14 Quota \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E0A\u0E48\u0E27\u0E22"), p > 0 && D > p * 1.5 && O.push("\u0E23\u0E48\u0E27\u0E21\u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21 Clinical Guideline \u2014 \u0E25\u0E14 Over-investigation"), w < h * .5 && (E.opd_visits || 0) > 200 && O.push("\u0E17\u0E1A\u0E17\u0E27\u0E19 Coding/Billing \u2014 \u0E2D\u0E32\u0E08\u0E21\u0E35 Revenue Leak"), (E.ipd_admissions || 0) === 0 && m >= 75 && O.push("\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E40\u0E02\u0E49\u0E32 IPD \u2014 \u0E40\u0E2A\u0E23\u0E34\u0E21 Team Flexibility"), R.length === 0 && j.length >= 2 && O.push("\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E14\u0E35 \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E40\u0E1B\u0E47\u0E19 Mentor / \u0E1C\u0E39\u0E49\u0E0A\u0E48\u0E27\u0E22\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Pathway");
  const G = x0(E, t, {
    visitPercentile: m,
    totalDoctors: t.length,
    dailyVisits: B,
    medRevPerVisit: h,
    medOrdersPerVisit: p,
    opv: D,
    rpv: w,
    periodDays: o
  });
  return {
    visitRank: c,
    visitPercentile: m,
    revRank: A,
    totalDoctors: t.length,
    pattern: a,
    patternColor: F,
    workloadLevel: W,
    workloadColor: H,
    ordEff: L,
    revEff: V,
    dailyVisits: B,
    medVisits: g,
    medRevPerVisit: h,
    medOrdersPerVisit: p,
    strengths: j,
    concerns: R,
    recs: O,
    deepRecs: G
  }
}

function x0(E, t, o) {
  const {
    visitPercentile: c,
    dailyVisits: m,
    medRevPerVisit: A,
    medOrdersPerVisit: g,
    opv: h,
    rpv: p,
    periodDays: T
  } = o, $ = [], a = E.name || E.code;
  if (m > 50) {
    const F = Math.round(m - 40);
    $.push({
      priority: "P0",
      icon: "\u{1F6A8}",
      title: "\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E25\u0E30\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Burnout",
      color: "#f43f5e",
      situation: `${a} \u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${Math.round(m)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 (\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C OPD \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 30\u201350 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${F} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19) \u0E15\u0E25\u0E2D\u0E14\u0E0A\u0E48\u0E27\u0E07 ${T} \u0E27\u0E31\u0E19 \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout \u0E2A\u0E39\u0E07 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22 \u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E41\u0E25\u0E30\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E04\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E19\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27`,
      rootCause: "\u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 (1) \u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D\u0E15\u0E48\u0E2D Demand \xB7 (2) \u0E23\u0E30\u0E1A\u0E1A\u0E19\u0E31\u0E14\u0E2B\u0E21\u0E32\u0E22\u0E44\u0E21\u0E48\u0E21\u0E35 Quota Cap \u0E15\u0E48\u0E2D\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 (3) \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 Provider \u0E40\u0E14\u0E34\u0E21\u0E17\u0E33\u0E43\u0E2B\u0E49 load \u0E01\u0E23\u0E30\u0E08\u0E38\u0E01 \xB7 (4) \u0E44\u0E21\u0E48\u0E21\u0E35 Triage \u0E17\u0E35\u0E48\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A case \u0E40\u0E1A\u0E32\u0E44\u0E1B\u0E2B\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E48\u0E27\u0E21",
      actions: ["**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E01\u0E33\u0E2B\u0E19\u0E14 Quota Cap \u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27 45 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19/\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19 HOSxP Appointment Module \u2014 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 IT \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E15\u0E31\u0E49\u0E07 warning \u0E40\u0E21\u0E37\u0E48\u0E2D slot \u0E40\u0E15\u0E47\u0E21", `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Case-mix \u0E02\u0E2D\u0E07 ${a} \u2014 \u0E41\u0E22\u0E01 Simple (\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E22\u0E32/follow-up) \u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01 Complex \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Redistribute`, "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14 Pharmacist-led Refill Clinic + Nurse Practitioner Clinic \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Stable NCD/Chronic \u2014 \u0E25\u0E14 OPD Load 15\u201320%", "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49\u0E43\u0E19\u0E01\u0E32\u0E23\u0E08\u0E49\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C GP \u0E40\u0E1E\u0E34\u0E48\u0E21 1 \u0E17\u0E48\u0E32\u0E19 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 Part-time Specialist 1\u20132 \u0E27\u0E31\u0E19/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C", `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Monitor Daily Visits \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 \u0E04\u0E38\u0E22 1-on-1 \u0E01\u0E31\u0E1A ${a} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\u0E17\u0E23\u0E32\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 Burnout (\u0E19\u0E2D\u0E19/\u0E2D\u0E32\u0E23\u0E21\u0E13\u0E4C/\u0E04\u0E27\u0E32\u0E21\u0E23\u0E39\u0E49\u0E2A\u0E36\u0E01\u0E15\u0E48\u0E2D\u0E07\u0E32\u0E19)`],
      target: `\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19 ${a} \u0E40\u0E2B\u0E25\u0E37\u0E2D \u2264 45 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \u0E20\u0E32\u0E22\u0E43\u0E19 8 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 MBI Score (Maslach Burnout Inventory) Emotional Exhaustion <16`,
      timeline: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 8 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 + \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + HR",
      expectedOutcome: `\u0E25\u0E14 Burnout Risk \xB7 \u0E04\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C Top Performer \xB7 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E14\u0E49 Consultation Time \u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D (\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.max(2,Math.round(480/m))} \u0E19\u0E32\u0E17\u0E35/\u0E23\u0E32\u0E22 \u0E2D\u0E32\u0E08\u0E44\u0E21\u0E48\u0E1E\u0E2D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Complex Case)`
    })
  }
  if (A > 0 && p < A * .6 && (E.opd_visits || 0) > 200) {
    const F = Math.round(A - p),
      B = Math.round(F * (E.opd_visits || 0));
    $.push({
      priority: "P0",
      icon: "\u{1F4B0}",
      title: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Revenue Leak \u0E41\u0E25\u0E30 Coding Quality",
      color: "#dc2626",
      situation: `${a} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \u0E3F${r(p)}/\u0E23\u0E32\u0E22 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(A)}/\u0E23\u0E32\u0E22 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.round((1-p/A)*100)}% \xB7 \u0E08\u0E32\u0E01\u0E08\u0E33\u0E19\u0E27\u0E19 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${T} \u0E27\u0E31\u0E19 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23 Revenue Gap \u0E2A\u0E39\u0E07\u0E16\u0E36\u0E07 \u0E3F${r(B)} \xB7 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E44\u0E14\u0E49\u0E2B\u0E25\u0E32\u0E22\u0E14\u0E49\u0E32\u0E19\u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19`,
      rootCause: "\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 4 \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38 (\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E04\u0E27\u0E32\u0E21\u0E19\u0E48\u0E32\u0E08\u0E30\u0E40\u0E1B\u0E47\u0E19): (1) **ICD-10/ICD-9 Coding \u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A** \u2014 \u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E30\u0E1A\u0E38 Secondary Dx \u0E2B\u0E23\u0E37\u0E2D Comorbidity \xB7 (2) **\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01** \u2014 \u0E19\u0E27\u0E14/\u0E09\u0E35\u0E14\u0E22\u0E32/Counseling \u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E44\u0E14\u0E49 \xB7 (3) **Payer Mix \u0E40\u0E2D\u0E35\u0E22\u0E07\u0E44\u0E1B\u0E17\u0E32\u0E07 UC/\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07** \u2014 case-mix \u0E40\u0E19\u0E49\u0E19 Simple/Follow-up \xB7 (4) **\u0E43\u0E1A\u0E40\u0E1A\u0E34\u0E01\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A** (\u0E2A\u0E1B\u0E2A\u0E0A. e-Claim format)",
      actions: [`**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E14\u0E36\u0E07 30 records \u0E02\u0E2D\u0E07 ${a} \u0E41\u0E1A\u0E1A\u0E2A\u0E38\u0E48\u0E21 (stratified by pttype) \xB7 MedRec audit \u0E17\u0E33 Chart Review \u0E40\u0E17\u0E35\u0E22\u0E1A Documentation vs Billed`, `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E1E\u0E1A ${a} \u0E17\u0E1A\u0E17\u0E27\u0E19 Coding Basics \u2014 Secondary Dx, Comorbidity (CC/MCC), Procedure Code (ICD-9-CM)`, "**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 3**: \u0E1B\u0E23\u0E31\u0E1A\u0E43\u0E0A\u0E49 **Coding Checklist** \u0E43\u0E19 HOSxP \u2014 Alert \u0E16\u0E49\u0E32 Primary Dx \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E17\u0E35\u0E48\u0E21\u0E31\u0E01 CC/MCC (DM, HT, CKD) \u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38 Secondary", `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E40\u0E17\u0E35\u0E22\u0E1A Payer Mix \u0E02\u0E2D\u0E07 ${a} \u0E01\u0E31\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E21\u0E35 Revenue/Visit \u0E2A\u0E39\u0E07 \u2014 \u0E14\u0E39\u0E27\u0E48\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C FFS (\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E15\u0E23\u0E07/\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19) \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E17\u0E48\u0E32\u0E44\u0E23`, `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Quarterly Audit \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A MedRec \xB7 \u0E27\u0E31\u0E14 Revenue/Visit \u0E02\u0E2D\u0E07 ${a} \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19`],
      target: `\u0E40\u0E1E\u0E34\u0E48\u0E21 Revenue/Visit \u0E02\u0E2D\u0E07 ${a} \u0E08\u0E32\u0E01 \u0E3F${r(p)} \u0E40\u0E1B\u0E47\u0E19 \u0E3F${r(Math.round(A*.85))} \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Revenue Recovery \u2265 \u0E3F${r(Math.round(B*.3))}`,
      timeline: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E40\u0E04\u0E2A + Medical Record Audit Team + Billing Department",
      expectedOutcome: "Revenue Recovery \xB7 \u0E1B\u0E23\u0E31\u0E1A Coding Quality \xB7 \u0E25\u0E14 Claim Rejection Rate \xB7 Bench-mark Coding Quality \u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E48\u0E32\u0E19\u0E2D\u0E37\u0E48\u0E19"
    })
  }
  if (g > 0 && h > g * 1.5) {
    const F = Math.round((h - g) * (E.opd_visits || 0));
    $.push({
      priority: "P1",
      icon: "\u{1F9EA}",
      title: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway \u0E41\u0E25\u0E30 Order Appropriateness",
      color: "#f59e0b",
      situation: `${a} \u0E21\u0E35 Orders/Visit = ${h} \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (${g.toFixed(2)}) \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${Math.round((h/g-1)*100)}% \xB7 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E01\u0E34\u0E19 ${r(F)} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${T} \u0E27\u0E31\u0E19 \xB7 \u0E2D\u0E32\u0E08\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Over-investigation \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E0B\u0E49\u0E33\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`,
      rootCause: "(1) **Defensive Medicine** \u2014 \u0E01\u0E25\u0E31\u0E27\u0E1E\u0E25\u0E32\u0E14 \xB7 (2) **\u0E44\u0E21\u0E48\u0E21\u0E35 Clinical Decision Support** \u0E43\u0E19 HOSxP \xB7 (3) **\u0E44\u0E21\u0E48\u0E17\u0E23\u0E32\u0E1A\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19** \u0E02\u0E2D\u0E07\u0E41\u0E15\u0E48\u0E25\u0E30 Order \xB7 (4) **\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E23\u0E35\u0E22\u0E01\u0E23\u0E49\u0E2D\u0E07** \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C UC",
      actions: ["**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21 Peer Review \u0E43\u0E0A\u0E49 Choosing Wisely Thailand Guidelines \xB7 \u0E40\u0E25\u0E37\u0E2D\u0E01 5 Orders \u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07\u0E1A\u0E48\u0E2D\u0E22\u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 (\u0E40\u0E0A\u0E48\u0E19 CBC \u0E0B\u0E49\u0E33\u0E43\u0E19 7 \u0E27\u0E31\u0E19 \xB7 LFT \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A HT \u0E17\u0E35\u0E48\u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21\u0E44\u0E14\u0E49)", "**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: Build Clinical Decision Support (CDS) \u0E43\u0E19 HOSxP \u2014 Alert \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E48\u0E07\u0E0B\u0E49\u0E33\u0E43\u0E19 30 \u0E27\u0E31\u0E19 + \u0E41\u0E2A\u0E14\u0E07\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E42\u0E14\u0E22\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13", `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14 Academic Session \u0E01\u0E31\u0E1A ${a} + \u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-Based Indication \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Top Orders`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2**: Monitor Orders/Visit \u0E02\u0E2D\u0E07 ${a} \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 Comparison \u0E01\u0E31\u0E1A Peer Group (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19)`, "**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Lab Stewardship Program \u2014 \u0E41\u0E2A\u0E14\u0E07 Utilization Report \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E2B\u0E47\u0E19\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E40\u0E2D\u0E07"],
      target: `\u0E25\u0E14 Orders/Visit \u0E02\u0E2D\u0E07 ${a} \u0E08\u0E32\u0E01 ${h} \u2192 \u2264 ${(g*1.2).toFixed(2)} \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19 Lab/X-Ray \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E3F${r(Math.round(F*150))} (\u0E2A\u0E21\u0E21\u0E15\u0E34 \u0E3F150/order)`,
      timeline: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
      owner: "\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + Clinical Pharmacist + Lab Director",
      expectedOutcome: "\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19 \xB7 \u0E25\u0E14\u0E01\u0E32\u0E23\u0E23\u0E1A\u0E01\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \xB7 Clinical Appropriateness \u0E14\u0E35\u0E02\u0E36\u0E49\u0E19 \xB7 Benchmark \u0E17\u0E35\u0E48\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E0A\u0E49\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E19\u0E44\u0E14\u0E49"
    })
  }
  return (E.opd_visits || 0) > 100 && h > 0 && h < .2 && $.push({
    priority: "P1",
    icon: "\u{1F52C}",
    title: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49\u0E02\u0E2D\u0E07 Under-investigation",
    color: "#f59e0b",
    situation: `${a} \u0E21\u0E35 Orders/Visit \u0E40\u0E1E\u0E35\u0E22\u0E07 ${h} (\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 ${g.toFixed(2)} \u0E21\u0E32\u0E01) \u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \xB7 \u0E2D\u0E32\u0E08\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 (1) \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19 Follow-up \u0E17\u0E35\u0E48 stable \u0E2B\u0E23\u0E37\u0E2D (2) \u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E19\u0E49\u0E2D\u0E22\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E08\u0E19 Miss Diagnosis`,
    rootCause: "\u0E15\u0E49\u0E2D\u0E07\u0E41\u0E22\u0E01 2 scenario: (A) **Healthy pattern**: \u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E23\u0E37\u0E49\u0E2D\u0E23\u0E31\u0E07\u0E44\u0E14\u0E49\u0E14\u0E35\u0E08\u0E19 stable \xB7 (B) **Risk pattern**: \u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 investigate \u0E15\u0E32\u0E21\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 CPG \xB7 \u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Case-mix \u0E08\u0E30\u0E1A\u0E2D\u0E01\u0E44\u0E14\u0E49",
    actions: [`**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E14\u0E36\u0E07 Sample 30 records \u0E02\u0E2D\u0E07 ${a} \xB7 MedRec Audit \u0E15\u0E23\u0E27\u0E08\u0E27\u0E48\u0E32 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 DM/HT/CKD \u0E44\u0E14\u0E49 Annual Lab Screening \u0E15\u0E32\u0E21 CPG \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48`, `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E16\u0E49\u0E32 Audit \u0E1E\u0E1A Missing Screening \u2014 \u0E1E\u0E1A ${a} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E17\u0E1A\u0E17\u0E27\u0E19 CPG + Generate Alert \u0E43\u0E19 HOSxP \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Overdue Screening`, "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E27\u0E31\u0E14 Clinical Quality Indicators: HbA1c <7 \xB7 BP <140/90 \xB7 LDL <100 \xB7 \u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C HA", "**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Outcome \u2014 Readmission Rate, ER Visit, \u0E20\u0E32\u0E27\u0E30\u0E41\u0E17\u0E23\u0E01\u0E0B\u0E49\u0E2D\u0E19 \xB7 \u0E16\u0E49\u0E32 Outcome \u0E14\u0E35\u0E41\u0E21\u0E49 Orders \u0E15\u0E48\u0E33 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E47\u0E19 Healthy Pattern"],
    target: `\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 Scenario \u0E20\u0E32\u0E22\u0E43\u0E19 4 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 \u0E16\u0E49\u0E32\u0E40\u0E1B\u0E47\u0E19 Risk Pattern \u2192 Orders/Visit \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E17\u0E35\u0E48 \u2265 ${g.toFixed(2)} \u0E20\u0E32\u0E22\u0E43\u0E19 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C`,
    timeline: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 12 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
    owner: "Medical Record Audit + \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + Quality Assurance",
    expectedOutcome: "\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Missed Diagnosis \xB7 \u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 Clinical Quality \xB7 \u0E2B\u0E32\u0E01\u0E40\u0E1B\u0E47\u0E19 Healthy Pattern \u0E43\u0E2B\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E19\u0E41\u0E1A\u0E1A"
  }), (E.ipd_admissions || 0) === 0 && c >= 75 && $.push({
    priority: "P2",
    icon: "\u{1F3E5}",
    title: "\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E40\u0E02\u0E49\u0E32 IPD \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E2A\u0E23\u0E34\u0E21 Team Flexibility",
    color: "#3b82f6",
    situation: `${a} \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19 Top ${Math.max(1,100-c)}% \u0E14\u0E49\u0E32\u0E19\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 OPD \u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IPD \u0E40\u0E25\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${T} \u0E27\u0E31\u0E19 \xB7 \u0E02\u0E32\u0E14\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E31\u0E01\u0E29\u0E30\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Complex \u0E41\u0E25\u0E30\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E35\u0E21 IPD \u0E02\u0E32\u0E14\u0E01\u0E32\u0E23\u0E2A\u0E19\u0E31\u0E1A\u0E2A\u0E19\u0E38\u0E19\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 peak`,
    rootCause: `\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 (1) ${a} \u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E14\u0E49\u0E32\u0E19 OPD \u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07 \xB7 (2) \u0E44\u0E21\u0E48\u0E21\u0E35\u0E15\u0E32\u0E23\u0E32\u0E07\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 IPD \xB7 (3) \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E40\u0E09\u0E1E\u0E32\u0E30 OPD \u0E40\u0E1E\u0E23\u0E32\u0E30 workflow \u0E23\u0E39\u0E49\u0E08\u0E31\u0E01`,
    actions: [`**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E1E\u0E39\u0E14\u0E04\u0E38\u0E22\u0E01\u0E31\u0E1A ${a} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E21\u0E31\u0E04\u0E23\u0E43\u0E08\u0E43\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A IPD`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E08\u0E31\u0E14\u0E17\u0E33\u0E15\u0E32\u0E23\u0E32\u0E07 IPD Rotation \u2014 ${a} \u0E23\u0E31\u0E1A Admission \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 2\u20134 \u0E23\u0E32\u0E22/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C (case \u0E44\u0E21\u0E48 complex)`, "**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: Mentorship \u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD senior \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Complex Case", `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 Outcome Metrics (ALOS, Readmission) \u0E02\u0E2D\u0E07 ${a} \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E01\u0E31\u0E1A IPD Pool`],
    target: `${a} \u0E23\u0E31\u0E1A IPD \u2265 8 \u0E23\u0E32\u0E22/\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Outcome metrics \u0E44\u0E21\u0E48\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 IPD Pool`,
    timeline: "\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27 3 \u0E40\u0E14\u0E37\u0E2D\u0E19",
    owner: `\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + ${a} + \u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E21 IPD`,
    expectedOutcome: `Team Flexibility \u0E40\u0E1E\u0E34\u0E48\u0E21 \xB7 \u0E25\u0E14 Single Point of Failure \xB7 ${a} \u0E1E\u0E31\u0E12\u0E19\u0E32 Comprehensive Skill`
  }), (E.lab_orders || 0) === 0 && (E.xray_orders || 0) === 0 && (E.opd_visits || 0) > 50 && $.push({
    priority: "P0",
    icon: "\u26A0\uFE0F",
    title: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08",
    color: "#dc2626",
    situation: `${a} \u0E44\u0E21\u0E48\u0E21\u0E35 Lab/X-Ray Orders \u0E40\u0E25\u0E22\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A HOSxP \u0E41\u0E21\u0E49\u0E21\u0E35 OPD ${r(E.opd_visits)} \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Volume \u0E02\u0E19\u0E32\u0E14\u0E19\u0E35\u0E49 \xB7 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E2B\u0E23\u0E37\u0E2D data pipeline`,
    rootCause: `(1) ${a} \u0E2A\u0E31\u0E48\u0E07\u0E1C\u0E48\u0E32\u0E19\u0E0A\u0E48\u0E2D\u0E07\u0E17\u0E32\u0E07\u0E2D\u0E37\u0E48\u0E19 (Paper / Verbal) \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E40\u0E02\u0E49\u0E32 HOSxP \xB7 (2) \u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E1C\u0E39\u0E49\u0E2A\u0E31\u0E48\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E2D\u0E37\u0E48\u0E19 (\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25) \xB7 (3) Data mapping \u0E1C\u0E34\u0E14 (doctor_code \u0E44\u0E21\u0E48 match) \xB7 (4) \u0E2A\u0E48\u0E07 ${a} \u0E08\u0E23\u0E34\u0E07\u0E46 \u0E41\u0E15\u0E48\u0E16\u0E39\u0E01 Lab/X-Ray block`,
    actions: [`**\u0E17\u0E31\u0E19\u0E17\u0E35**: \u0E15\u0E23\u0E27\u0E08 HOSxP Order History \u0E02\u0E2D\u0E07 OPD ${a} 1 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \xB7 \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32 Orders \u0E44\u0E1B\u0E2D\u0E22\u0E39\u0E48\u0E01\u0E31\u0E1A login \u0E2D\u0E37\u0E48\u0E19`, `**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1**: \u0E1E\u0E1A ${a} \u0E2A\u0E2D\u0E1A\u0E16\u0E32\u0E21 workflow \u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 IT \u0E15\u0E23\u0E27\u0E08 audit log`, "**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2**: \u0E2B\u0E32\u0E01\u0E40\u0E1B\u0E47\u0E19 Data Mapping Issue \u2192 \u0E41\u0E01\u0E49 doctor_code mapping \u0E43\u0E19 HOSxP \xB7 \u0E2B\u0E32\u0E01\u0E40\u0E1B\u0E47\u0E19 Workflow Issue \u2192 training \u0E41\u0E25\u0E30 SOP", "**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Monitor Orders \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E17\u0E38\u0E01\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C"],
    target: `Orders/Visit \u0E02\u0E2D\u0E07 ${a} \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E17\u0E35\u0E48\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1B\u0E01\u0E15\u0E34 (\u2265 0.3) \u0E20\u0E32\u0E22\u0E43\u0E19 4 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C`,
    timeline: "\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 4 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C",
    owner: `IT + MedRec + ${a}`,
    expectedOutcome: "\u0E04\u0E27\u0E32\u0E21\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \xB7 Compliance \u0E14\u0E49\u0E32\u0E19 Documentation \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35 Revenue Leak \u0E08\u0E32\u0E01 Missing Orders"
  }), m >= 20 && m <= 50 && h >= g * .7 && h <= g * 1.3 && p >= A * .8 && c >= 50 && $.push({
    priority: "P2",
    icon: "\u{1F31F}",
    title: "\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E1B\u0E47\u0E19 Clinical Mentor / Champion",
    color: "#10b981",
    situation: `${a} \u0E21\u0E35\u0E1C\u0E25\u0E07\u0E32\u0E19\u0E23\u0E2D\u0E1A\u0E14\u0E49\u0E32\u0E19 \u2014 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21 (${Math.round(m)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19) \xB7 Orders/Visit \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${h}) \xB7 Revenue/Visit \u0E43\u0E01\u0E25\u0E49\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (\u0E3F${r(p)}) \xB7 \u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19 Role Model \u0E41\u0E25\u0E30\u0E0A\u0E48\u0E27\u0E22\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E35\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C`,
    rootCause: "\u0E41\u0E2A\u0E14\u0E07\u0E16\u0E36\u0E07 Clinical Competence \u0E41\u0E25\u0E30 Workflow Efficiency \u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E16\u0E48\u0E32\u0E22\u0E17\u0E2D\u0E14",
    actions: [`**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 1**: \u0E40\u0E0A\u0E34\u0E0D ${a} \u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21\u0E17\u0E35\u0E21\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Pathway / CPG \u0E1B\u0E23\u0E30\u0E08\u0E33\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 2\u20133**: Mentorship Program \u2014 ${a} \u0E40\u0E1B\u0E47\u0E19 Mentor \u0E43\u0E2B\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E2B\u0E21\u0E48 1\u20132 \u0E17\u0E48\u0E32\u0E19 \xB7 Shadow OPD 1\u20132 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C`, `**\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 3**: \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22 Role "Clinical Champion" \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E02\u0E2D\u0E07 ${a}`, `**\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07**: Case Conference \u0E1B\u0E23\u0E30\u0E08\u0E33\u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 ${a} \u0E19\u0E33\u0E40\u0E2A\u0E19\u0E2D Interesting Case`],
    target: `\u0E1C\u0E39\u0E49\u0E16\u0E39\u0E01 Mentor 2 \u0E17\u0E48\u0E32\u0E19 \u0E21\u0E35 Revenue/Visit \u0E41\u0E25\u0E30 Orders/Visit \u0E40\u0E02\u0E49\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E20\u0E32\u0E22\u0E43\u0E19 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 ${a} \u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A Recognition (Award/Bonus)`,
    timeline: "\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27 6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
    owner: "\u0E1C\u0E39\u0E49\u0E2D\u0E33\u0E19\u0E27\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1C\u0E19\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C + HR",
    expectedOutcome: "\u0E22\u0E01\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E17\u0E35\u0E21 \xB7 Retention \u0E02\u0E2D\u0E07 Top Performer \xB7 Knowledge Transfer \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E23\u0E38\u0E48\u0E19"
  }), $
}
const q = E => {
  const t = E.filter(g => g >= 0),
    o = t.length;
  if (o === 0) return 0;
  const c = [...t].sort((g, h) => g - h);
  let m = 0,
    A = 0;
  for (let g = 0; g < o; g++) m += (2 * (g + 1) - o - 1) * c[g], A += c[g];
  return A > 0 ? m / (o * A) : 0
};

function p0(E) {
  if (!E?.summary || !E?.doctors) return {
    headline: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E30\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E40\u0E21\u0E37\u0E48\u0E2D data \u0E1E\u0E23\u0E49\u0E2D\u0E21",
    empty: !0
  };
  const t = E.summary,
    o = E.doctors || [],
    c = t.opd_doctors || 0,
    m = t.opd_visits || 0,
    A = t.avg_visits_per_doctor || 0,
    g = t.total_revenue || 0,
    h = E.period?.days || (E.period?.start && E.period?.end ? Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1) : 30);
  if (!o.length) return {
    headline: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49",
    headlineColor: "#94a3b8",
    kpi: [],
    sections: [],
    footerLeft: "\u2014"
  };
  const p = o.map(i => i.total_visits || 0),
    T = o.map(i => i.total_revenue || 0),
    $ = o.map(i => Number(i.orders_per_visit) || 0),
    a = o.map(i => Number(i.revenue_per_visit) || 0),
    F = [...o].sort((i, k) => (k.total_visits || 0) - (i.total_visits || 0)),
    B = F[0],
    W = Math.round(U(p)),
    H = Math.max(...p),
    D = Math.min(...p),
    w = Math.round(H / Math.max(1, h)),
    L = p.reduce((i, k) => i + k, 0),
    V = T.reduce((i, k) => i + k, 0),
    j = V > 0 ? Math.round((B?.total_revenue || 0) / V * 100) : 0,
    R = F.slice(0, 10),
    O = L > 0 ? Math.round(R.reduce((i, k) => i + k.total_visits, 0) / L * 100) : 0,
    G = Math.max(1, Math.ceil(o.length * .2)),
    s = F.slice(0, G),
    _ = L > 0 ? Math.round(s.reduce((i, k) => i + k.total_visits, 0) / L * 100) : 0,
    J = q(p),
    P = Math.round(J * 100),
    K = q(T),
    X = Math.round(K * 100),
    N = [...o].filter(i => i.total_visits > 0).sort((i, k) => (k.revenue_per_visit || 0) - (i.revenue_per_visit || 0)),
    Q = N[0],
    e = N[N.length - 1],
    d = Math.round(U(a.filter(i => i > 0))),
    y = Number(U($.filter(i => i > 0)).toFixed(2)),
    x = [...o].sort((i, k) => (k.orders_per_visit || 0) - (i.orders_per_visit || 0))[0],
    f = [...o].filter(i => i.opd_visits > 50).sort((i, k) => (i.orders_per_visit || 0) - (k.orders_per_visit || 0))[0],
    I = .05,
    M = o.filter(i => {
      const k = (i.opd_visits || 0) + (i.ipd_admissions || 0);
      return k > 0 && (i.ipd_admissions || 0) / k > I
    }).length,
    C = o.filter(i => (i.ipd_admissions || 0) === 0).length,
    l = o.filter(i => (i.ipd_admissions || 0) > 0).length,
    v = l - M;
  let S, b;
  A > 100 ? (S = `\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C ${c} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${A} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${P}/100 \xB7 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E33\u0E25\u0E31\u0E07\u0E41\u0E25\u0E30 Workload Balance`, b = "#f43f5e") : o.length > 10 && O > 80 ? (S = `\u26A0 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2D\u0E35\u0E22\u0E07\u0E21\u0E32\u0E01 \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 10 \u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A ${O}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \xB7 Gini ${P}/100 \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 Load Balancing`, b = "#f59e0b") : P > 50 ? (S = `\u26A0 Gini Coefficient \u0E2A\u0E39\u0E07 (${P}/100) \u2014 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \xB7 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling \u0E41\u0E25\u0E30 Cross-training`, b = "#f59e0b") : (S = `\u2713 \u0E41\u0E1E\u0E17\u0E22\u0E4C ${c} \u0E17\u0E48\u0E32\u0E19 \xB7 ${r(m)} \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${A} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${P}/100 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(Math.round(g))}`, b = "#10b981");
  const n = [{
    icon: "\u{1F468}\u200D\u2695\uFE0F",
    title: "1. \u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01 (Workload Analysis)",
    list: [`**\u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E08\u0E23\u0E34\u0E07** ${c} \u0E17\u0E48\u0E32\u0E19 (OPD) \xB7 ${t.ipd_doctors||0} \u0E17\u0E48\u0E32\u0E19 (IPD) \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${h} \u0E27\u0E31\u0E19`, `**\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${A} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 (Median)** ${W} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14** ${r(H)} \u0E23\u0E32\u0E22 (${w}/\u0E27\u0E31\u0E19) \xB7 **\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** ${r(D)} \u0E23\u0E32\u0E22`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14-\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** = ${H-D>0?Math.round(H/Math.max(1,D)):1} \u0E40\u0E17\u0E48\u0E32 \xB7 ${H/Math.max(1,D)>20?"\u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07\u0E21\u0E32\u0E01 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":H/Math.max(1,D)>10?"\u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 Burnout":"\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E17\u0E35\u0E48\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"}`, `**Benchmark \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A**: \u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 OPD \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 30\u201350 \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19/\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A 1 \u0E23\u0E31\u0E1A ${w} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 ${w>50?"\u26A0 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E01 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout":w>30?"\xB7 \u0E2A\u0E39\u0E07\u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49":"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22"}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21**: ${A>100?"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21":A>50?"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u2014 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49":"\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49 \u2014 \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"}`],
    color: A > 100 ? "#f43f5e" : A > 50 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4CA}",
    title: "2. \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 (Gini Coefficient & Pareto Analysis)",
    list: [`**Gini Coefficient (\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E02\u0E2D\u0E07\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19)** = ${P}/100 \xB7 ${P>60?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01":P>40?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E15\u0E48\u0E33 \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"} \xB7 (\u0E40\u0E01\u0E13\u0E11\u0E4C: 0\u201330 \u0E2A\u0E21\u0E14\u0E38\u0E25 \xB7 31\u201350 \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \xB7 >50 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33)`, `**Pareto 80/20 Test**: \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 20% (${G} \u0E17\u0E48\u0E32\u0E19) \u0E23\u0E31\u0E1A ${_}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${_>80?"\xB7 \u0E15\u0E23\u0E07\u0E15\u0E32\u0E21 Pareto Principle \u2014 \u0E20\u0E32\u0E23\u0E30\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Key Physician \u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01":_>60?"\xB7 \u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07 Pareto":"\xB7 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32 Pareto"}`, `**Top ${Math.min(10,o.length)} \u0E41\u0E1E\u0E17\u0E22\u0E4C** \u0E23\u0E31\u0E1A ${O}% \xB7 **Top 1** (${B?.name||"\u2014"}) \u0E23\u0E31\u0E1A ${Math.round((B?.total_visits||0)/L*100)}% (${r(B?.total_visits||0)} \u0E23\u0E32\u0E22)`, `**Gini \u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49** = ${X}/100 \xB7 ${X>60?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07":X>40?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E14\u0E49\u0E32\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E21\u0E14\u0E38\u0E25"} \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E02\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B**: ${P>50&&O>80?"\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E49\u0E2D\u0E22\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u2014 \u0E04\u0E27\u0E23\u0E25\u0E07\u0E17\u0E38\u0E19 Cross-training \u0E41\u0E25\u0E30\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19":P>40?"\u0E21\u0E35\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`],
    color: P > 50 ? "#f43f5e" : P > 35 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4B0}",
    title: "3. \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E40\u0E0A\u0E34\u0E07\u0E40\u0E28\u0E23\u0E29\u0E10\u0E01\u0E34\u0E08 (Revenue Efficiency)",
    list: [`**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21\u0E08\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C** \u0E3F${r(Math.round(V))} \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u0E3F${r(Math.round(V/Math.max(1,o.length)))}/\u0E41\u0E1E\u0E17\u0E22\u0E4C`, `**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22 (Revenue per Visit)** \u2014 \u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(d)}/\u0E23\u0E32\u0E22 \xB7 \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 ${Q?`${Q.name} \u0E3F${r(Q.revenue_per_visit)}/\u0E23\u0E32\u0E22`:"\u2014"} \xB7 \u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14 ${e?`${e.name} \u0E3F${r(e.revenue_per_visit)}/\u0E23\u0E32\u0E22`:"\u2014"}`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07 Revenue/Visit** = ${Q&&e&&e.revenue_per_visit>0?Math.round(Q.revenue_per_visit/e.revenue_per_visit):"\u2014"} \u0E40\u0E17\u0E48\u0E32 \u2014 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 case-mix (\u0E42\u0E23\u0E04\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E23\u0E32\u0E04\u0E32\u0E2A\u0E39\u0E07) \u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22`, `**Top Earner**: ${B?.name||"\u2014"} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(B?.total_revenue||0)} (${j}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E1E\u0E17\u0E22\u0E4C) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E23\u0E32\u0E22 \u0E3F${r(B?.revenue_per_visit||0)}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${j>25?"\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19 25% \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2B\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22":j>15?"\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07":"\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35 \u0E44\u0E21\u0E48\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E40\u0E14\u0E35\u0E22\u0E27"}`],
    color: j > 25 ? "#f43f5e" : j > 15 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F9EA}",
    title: "4. \u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 (Clinical Order Management)",
    list: [`**Lab Orders \u0E23\u0E27\u0E21** ${r(t.lab_orders)} \xB7 **X-Ray Orders \u0E23\u0E27\u0E21** ${r(t.xray_orders)} \xB7 **Orders/Visit \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${y}`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14**: ${x?`${x.name} \u2014 ${x.orders_per_visit} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07/\u0E23\u0E32\u0E22`:"\u2014"} ${x&&x.orders_per_visit>2?"\u26A0 \u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E01\u0E15\u0E34\u0E21\u0E32\u0E01 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway \u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E17\u0E35\u0E48\u0E40\u0E01\u0E34\u0E14\u0E02\u0E36\u0E49\u0E19":""}`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** (\u0E17\u0E35\u0E48\u0E21\u0E35 OPD > 50 \u0E23\u0E32\u0E22): ${f?`${f.name} \u2014 ${f.orders_per_visit} \u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07/\u0E23\u0E32\u0E22`:"\u2014"} ${f&&f.orders_per_visit<.2?"\xB7 \u0E2D\u0E32\u0E08\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 Under-investigation \u0E2B\u0E23\u0E37\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23":""}`, `**Lab : X-Ray Ratio** = ${t.xray_orders>0?(t.lab_orders/t.xray_orders).toFixed(1):"\u2014"} : 1 ${t.lab_orders/Math.max(1,t.xray_orders)>10?"\xB7 Lab \u0E40\u0E14\u0E48\u0E19 (\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E01\u0E31\u0E1A NCD/MedOPD)":t.lab_orders/Math.max(1,t.xray_orders)>5?"\xB7 \u0E2A\u0E21\u0E14\u0E38\u0E25":"\xB7 X-Ray \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E01\u0E31\u0E1A Ortho/ER)"}`, "**\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30**: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Clinical Variation \u2014 \u0E04\u0E27\u0E32\u0E21\u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E02\u0E2D\u0E07 Orders/Visit \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E22\u0E30 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E23\u0E08\u0E31\u0E14\u0E17\u0E33 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21"],
    color: x && x.orders_per_visit > 2 ? "#f59e0b" : "#0ea5e9"
  }, {
    icon: "\u{1F3E5}",
    title: "5. \u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E01\u0E32\u0E23\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 (Practice Pattern)",
    list: [`**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IPD \u0E08\u0E23\u0E34\u0E07** ${l} \u0E17\u0E48\u0E32\u0E19 (${Math.round(l/Math.max(1,o.length)*100)}%) \u2014 \u0E23\u0E27\u0E21 ${r(t.ipd_admissions)} Admission \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30 OPD (\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A IPD \u0E40\u0E25\u0E22)** ${C} \u0E17\u0E48\u0E32\u0E19 (${Math.round(C/Math.max(1,o.length)*100)}%)`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD-heavy (IPD > 5% \u0E02\u0E2D\u0E07 Visit)** ${M} \u0E17\u0E48\u0E32\u0E19 (${Math.round(M/Math.max(1,o.length)*100)}%) \u2014 \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Admission \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E0A\u0E38\u0E21\u0E0A\u0E19`, `**\u0E41\u0E1E\u0E17\u0E22\u0E4C Balanced (\u0E23\u0E31\u0E1A IPD \u0E41\u0E15\u0E48 \u2264 5%)** ${v} \u0E17\u0E48\u0E32\u0E19 (${Math.round(v/Math.max(1,o.length)*100)}%) \u2014 \u0E14\u0E39\u0E41\u0E25\u0E17\u0E31\u0E49\u0E07 OPD \u0E41\u0E25\u0E30 IPD \u0E43\u0E19\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E1B\u0E01\u0E15\u0E34`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${l>=10?`\u0E21\u0E35\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A IPD \u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D (${l} \u0E17\u0E48\u0E32\u0E19)`:l>=5?`\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD \u0E1E\u0E2D\u0E43\u0E0A\u0E49\u0E41\u0E15\u0E48\u0E04\u0E27\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21 (${l} \u0E17\u0E48\u0E32\u0E19)`:`\u26A0 \u0E41\u0E1E\u0E17\u0E22\u0E4C IPD \u0E19\u0E49\u0E2D\u0E22\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (${l} \u0E17\u0E48\u0E32\u0E19) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25`}`, `**Cross-coverage**: ${C>o.length*.6?"\u26A0 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E44\u0E21\u0E48\u0E23\u0E31\u0E1A IPD \u2014 \u0E04\u0E27\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 IPD":"\u0E01\u0E32\u0E23\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19 OPD/IPD \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"}`],
    color: l < 5 ? "#f43f5e" : C > o.length * .6 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u26A0",
    title: "6. \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E1A\u0E15\u0E32 (Key Risk Signals)",
    list: [`**Top-Doctor Dependency** \u2014 Top 1 \u0E23\u0E31\u0E1A ${Math.round((B?.total_visits||0)/Math.max(1,L)*100)}% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22, ${j}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${Math.round((B?.total_visits||0)/Math.max(1,L)*100)>20?"\u26A0 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E2B\u0E32\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22":"\u2713 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"}`, `**Burnout Risk** \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34 > 1,500 \u0E23\u0E32\u0E22/${h} \u0E27\u0E31\u0E19 \u0E21\u0E35 ${o.filter(i=>i.total_visits>1500).length} \u0E17\u0E48\u0E32\u0E19 ${o.filter(i=>i.total_visits>1500).length>3?"\u26A0 \u0E2B\u0E25\u0E32\u0E22\u0E17\u0E48\u0E32\u0E19\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout \u0E2A\u0E39\u0E07":""}`, `**Workload Inequality (Gini)** = ${P}/100 ${P>50?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07":"\u2713 \u0E1B\u0E01\u0E15\u0E34"} \xB7 \u0E2B\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19 60 \u0E04\u0E27\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E17\u0E31\u0E19\u0E17\u0E35`, `**Clinical Variation** \u2014 \u0E0A\u0E48\u0E27\u0E07 Orders/Visit \u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E15\u0E48\u0E25\u0E30\u0E17\u0E48\u0E32\u0E19\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19 ${x&&f&&f.orders_per_visit>0?Math.round(x.orders_per_visit/Math.max(.01,f.orders_per_visit)):"\u2014"} \u0E40\u0E17\u0E48\u0E32 \u2014 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Appropriateness`, `**Revenue Concentration** \u2014 Top 20% \u0E02\u0E2D\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E23\u0E49\u0E32\u0E07 ${_}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${_>80?"\u26A0 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E01\u0E25\u0E38\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E08\u0E33\u0E01\u0E31\u0E14":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35"}`],
    color: P > 50 || j > 25 ? "#f43f5e" : "#f59e0b"
  }, {
    icon: "\u{1F3AF}",
    title: "7. \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E41\u0E25\u0E30\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E40\u0E0A\u0E34\u0E07\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23 (Recommendations)",
    list: [A > 100 ? `**\u0E21\u0E32\u0E15\u0E23\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19** \u2014 \u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C (${A} \u0E23\u0E32\u0E22/\u0E17\u0E48\u0E32\u0E19) \xB7 \u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E08\u0E49\u0E32\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21 \u0E2B\u0E23\u0E37\u0E2D\u0E02\u0E22\u0E32\u0E22\u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E02\u0E22\u0E32\u0E22 Sub-specialty` : null, P > 50 ? `**Workload Rebalancing** \u2014 Gini ${P}/100 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E14\u0E38\u0E25 \xB7 \u0E08\u0E31\u0E14 Scheduling \u0E43\u0E2B\u0E49\u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E41\u0E25\u0E30\u0E01\u0E33\u0E2B\u0E19\u0E14 Quota \u0E15\u0E48\u0E2D\u0E41\u0E1E\u0E17\u0E22\u0E4C` : null, j > 25 ? `**\u0E25\u0E14\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Doctor** \u2014 ${B?.name} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${j}% \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E23\u0E38\u0E48\u0E19\u0E16\u0E31\u0E14\u0E44\u0E1B\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E14\u0E41\u0E17\u0E19 (Succession Plan)` : null, x && x.orders_per_visit > 2 ? "**\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway** \u2014 Orders/Visit \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 \xB7 \u0E15\u0E31\u0E49\u0E07 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14 Over-investigation" : null, l < 5 ? `**\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C IPD** \u2014 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19\u0E21\u0E35\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A IPD \u0E40\u0E1E\u0E35\u0E22\u0E07 ${l} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19` : null, "**\u0E23\u0E30\u0E1A\u0E1A\u0E41\u0E23\u0E07\u0E08\u0E39\u0E07\u0E43\u0E08 (Incentive)** \u2014 \u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A Bonus \u0E17\u0E35\u0E48\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E25\u0E30\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E (\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27) \xB7 \u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E42\u0E22\u0E07\u0E01\u0E31\u0E1A\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14 HA/KPI", "**Cross-training** \u2014 \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E08\u0E32\u0E01\u0E01\u0E32\u0E23\u0E02\u0E32\u0E14\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23 \xB7 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E04\u0E27\u0E23\u0E21\u0E35\u0E17\u0E31\u0E01\u0E29\u0E30\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21 2\u20133 \u0E42\u0E23\u0E04\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2B\u0E25\u0E31\u0E01", "**\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19** \u2014 \u0E43\u0E0A\u0E49 Dashboard \u0E19\u0E35\u0E49\u0E17\u0E1A\u0E17\u0E27\u0E19 Workload Balance \u0E41\u0E25\u0E30 Revenue Concentration \u0E40\u0E1B\u0E47\u0E19\u0E1B\u0E23\u0E30\u0E08\u0E33"].filter(Boolean),
    color: "#7c3aed"
  }];
  return {
    headline: S,
    headlineColor: b,
    kpi: [{
      label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48",
      value: r(c),
      sub: `OPD ${c} \xB7 IPD ${t.ipd_doctors||0}`,
      color: "#0284c7"
    }, {
      label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 OPD",
      value: r(m),
      sub: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${A} \xB7 Median ${W}`,
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
      value: `\u0E3F${r(Math.round(g))}`,
      sub: `Top 1: ${j}%`,
      color: "#10b981"
    }],
    sections: n,
    footerLeft: `${o.length} \u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 ${E.period.days?`\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${E.period.days} \u0E27\u0E31\u0E19`:`${E.period.start} \u2192 ${E.period.end}`} \xB7 HOSxP XE \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function c0(E) {
  if (!E?.summary || !E?.dentists) return {
    headline: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \u2014 AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E30\u0E1B\u0E23\u0E32\u0E01\u0E0F\u0E40\u0E21\u0E37\u0E48\u0E2D data \u0E1E\u0E23\u0E49\u0E2D\u0E21",
    empty: !0
  };
  const t = E.dentists || [],
    o = E.summary.dental_doctors || 0,
    c = E.summary.total_dentists || 0,
    m = E.summary.dental_visits || 0,
    A = E.summary.dental_revenue || 0,
    g = E.period?.days || (E.period?.start && E.period?.end ? Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1) : 30);
  if (!t.length) return {
    headline: `\u2014 \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07${g>1?` ${g} \u0E27\u0E31\u0E19`:"\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"} \u2014 \u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E47\u0E19\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E1F\u0E31\u0E19 \u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 case \u0E1C\u0E48\u0E32\u0E19\u0E23\u0E30\u0E1A\u0E1A`,
    headlineColor: "#94a3b8",
    kpi: [],
    sections: [{
      icon: "\u2139\uFE0F",
      title: "\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49",
      list: ["**\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01** \u2014 \u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E2D\u0E32\u0E08\u0E1B\u0E34\u0E14\u0E17\u0E33\u0E01\u0E32\u0E23\u0E43\u0E19\u0E27\u0E31\u0E19\u0E40\u0E2A\u0E32\u0E23\u0E4C-\u0E2D\u0E32\u0E17\u0E34\u0E15\u0E22\u0E4C \u0E2B\u0E23\u0E37\u0E2D\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23", '**\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E40\u0E27\u0E25\u0E32\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23** \u2014 \u0E16\u0E49\u0E32\u0E14\u0E39\u0E0A\u0E48\u0E27\u0E07 "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49" \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E0A\u0E49\u0E32\u0E01\u0E48\u0E2D\u0E19\u0E40\u0E1B\u0E34\u0E14\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E08\u0E30\u0E22\u0E31\u0E07\u0E40\u0E1B\u0E47\u0E19 0', "**Refer-out** \u2014 Case \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E17\u0E35\u0E48\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E2D\u0E32\u0E08\u0E16\u0E39\u0E01\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D\u0E44\u0E1B\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2D\u0E37\u0E48\u0E19", `**\u0E25\u0E2D\u0E07\u0E40\u0E25\u0E37\u0E2D\u0E01 "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"** \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27 \u2014 \u0E21\u0E35\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C ${c} \u0E17\u0E48\u0E32\u0E19\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A`],
      color: "#06b6d4"
    }],
    footerLeft: `${c} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49`
  };
  const h = o > 0 ? Math.round(m / o) : 0,
    p = Math.round(m / Math.max(1, g) / Math.max(1, o) * 10) / 10,
    T = [...t].sort((s, _) => (_.opd_visits || 0) - (s.opd_visits || 0))[0],
    $ = Math.round(U(t.map(s => s.opd_visits || 0))),
    a = Math.max(...t.map(s => s.opd_visits || 0)),
    F = Math.min(...t.map(s => s.opd_visits || 0)),
    B = [...t].sort((s, _) => (_.total_revenue || 0) - (s.total_revenue || 0))[0],
    W = A > 0 ? Math.round((B.total_revenue || 0) / A * 100) : 0,
    H = Math.round(U(t.map(s => s.revenue_per_visit || 0).filter(s => s > 0))),
    D = Math.round(q(t.map(s => s.opd_visits || 0)) * 100),
    w = Math.round(q(t.map(s => s.total_revenue || 0)) * 100),
    L = t.reduce((s, _) => s + (_.lab_orders || 0) + (_.xray_orders || 0), 0),
    V = m > 0 ? (L / m).toFixed(2) : "0.00",
    j = c > 0 ? Math.round(o / c * 100) : 0;
  let R, O;
  p > 30 ? (R = `\u26A0 \u0E20\u0E32\u0E23\u0E30\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E39\u0E07 \u2014 ${o} \u0E17\u0E48\u0E32\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${p} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 (\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 20-30 \u0E40\u0E04\u0E2A) \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout`, O = "#f43f5e") : W > 35 ? (R = `\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top 1 \u0E2A\u0E39\u0E07 \u2014 ${B.name} = ${W}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2B\u0E32\u0E01\u0E25\u0E32\u0E2D\u0E2D\u0E01/\u0E25\u0E32\u0E1B\u0E48\u0E27\u0E22`, O = "#f59e0b") : j < 60 && c >= 3 ? (R = `\u26A0 Utilization \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E15\u0E48\u0E33 \u2014 ${o}/${c} \u0E17\u0E48\u0E32\u0E19 (${j}%) \u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 rebalance \u0E15\u0E32\u0E23\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01`, O = "#f59e0b") : (R = `\u2713 \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C ${o}/${c} \u0E17\u0E48\u0E32\u0E19 \xB7 ${r(m)} \u0E40\u0E04\u0E2A \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${h} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 Gini ${D}/100 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u0E3F${r(Math.round(A))}`, O = "#10b981");
  const G = [{
    icon: "\u{1F9B7}",
    title: "1. \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
    list: [`**\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19** ${o}/${c} \u0E17\u0E48\u0E32\u0E19 (${j}% \u0E02\u0E2D\u0E07 roster) \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 ${g} \u0E27\u0E31\u0E19`, `**\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${h} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07** ${$} \u0E40\u0E04\u0E2A/\u0E17\u0E48\u0E32\u0E19 \xB7 **\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14** ${r(a)} (${T?.name||"\u2014"}) \xB7 **\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14** ${r(F)}`, `**\u0E20\u0E32\u0E23\u0E30\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19** \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${p} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 ${p>30?"\u26A0 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 20-30 \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout":p>20?"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19":"\xB7 \u0E22\u0E31\u0E07\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49 \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E02\u0E22\u0E32\u0E22\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"}`, `**\u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E17\u0E48\u0E32\u0E19** = ${F>0?Math.round(a/Math.max(1,F)):a>0?"\u2014":"1"} \u0E40\u0E17\u0E48\u0E32 ${a>0&&F>0&&a/F>5?"\xB7 \u26A0 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E49\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Scheduling":"\xB7 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"}`],
    color: p > 30 ? "#f43f5e" : p > 20 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4CA}",
    title: "2. \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (Gini Analysis)",
    list: [`**Gini \u0E40\u0E04\u0E2A** = ${D}/100 \xB7 ${D>50?"\u26A0 \u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E2A\u0E39\u0E07 \u2014 Case \u0E42\u0E2B\u0E25\u0E14\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E32\u0E07\u0E17\u0E48\u0E32\u0E19":D>35?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"}`, `**Gini \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49** = ${w}/100 \xB7 ${w>50?"\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top \u0E19\u0E49\u0E2D\u0E22\u0E04\u0E19":w>35?"\u0E40\u0E2B\u0E25\u0E37\u0E48\u0E2D\u0E21\u0E25\u0E49\u0E33\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u2713 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2A\u0E21\u0E14\u0E38\u0E25"}`, `**Top 1 (${B?.name||"\u2014"})** \u0E23\u0E31\u0E1A ${Math.round((T?.opd_visits||0)/Math.max(1,m)*100)}% \u0E02\u0E2D\u0E07\u0E40\u0E04\u0E2A \xB7 ${W}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E23\u0E38\u0E1B**: ${D>50||W>35?"\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E49\u0E2D\u0E22\u0E2A\u0E39\u0E07 \u2014 \u0E04\u0E27\u0E23\u0E25\u0E07\u0E17\u0E38\u0E19 scheduling \u0E43\u0E2B\u0E21\u0E48\u0E41\u0E25\u0E30\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E38\u0E01\u0E17\u0E48\u0E32\u0E19":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`],
    color: D > 50 || W > 35 ? "#f43f5e" : D > 35 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F4B0}",
    title: "3. \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (Revenue Efficiency)",
    list: [`**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21** \u0E3F${r(Math.round(A))} \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u0E3F${r(Math.round(A/Math.max(1,o)))}/\u0E17\u0E48\u0E32\u0E19`, `**\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E40\u0E04\u0E2A (Revenue per Case)** \u2014 \u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(H)}/\u0E40\u0E04\u0E2A \xB7 Top Earner: ${B?.name||"\u2014"} \u0E3F${r(B?.revenue_per_visit||0)}/\u0E40\u0E04\u0E2A`, `**Top Earner \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21** ${B?.name||"\u2014"} = \u0E3F${r(Math.round(B?.total_revenue||0))} (${W}%) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/\u0E40\u0E04\u0E2A \u0E3F${r(B?.revenue_per_visit||0)}`, `**\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19**: ${W>40?"\u26A0 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Dentist \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B":W>25?"\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top Dentist \u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07":"\u2713 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E14\u0E35 \u0E44\u0E21\u0E48\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E40\u0E14\u0E35\u0E22\u0E27"}`],
    color: W > 40 ? "#f43f5e" : W > 25 ? "#f59e0b" : "#10b981"
  }, {
    icon: "\u{1F9EA}",
    title: "4. \u0E01\u0E32\u0E23\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08 (Order Management)",
    list: [`**Lab Orders \u0E23\u0E27\u0E21** ${r(t.reduce((s,_)=>s+(_.lab_orders||0),0))} \xB7 **X-Ray Orders \u0E23\u0E27\u0E21** ${r(t.reduce((s,_)=>s+(_.xray_orders||0),0))} \xB7 **Orders/\u0E40\u0E04\u0E2A \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22** ${V}`, `**\u0E02\u0E49\u0E2D\u0E2A\u0E31\u0E07\u0E40\u0E01\u0E15**: \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E43\u0E0A\u0E49 X-Ray (Panoramic, Bitewing, Periapical) \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 Lab \xB7 Orders/Case ${parseFloat(V)>.8?"\u0E2A\u0E39\u0E07 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A X-Ray indication":parseFloat(V)>.3?"\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C":"\u0E15\u0E48\u0E33 \u2014 \u0E2D\u0E32\u0E08\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 routine treatment \u0E42\u0E14\u0E22\u0E44\u0E21\u0E48\u0E15\u0E49\u0E2D\u0E07 imaging"}`, "**\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30**: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Clinical Variation \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 Orders/Case \u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19\u0E21\u0E32\u0E01 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E23\u0E08\u0E31\u0E14 Clinical Guidelines \u0E23\u0E48\u0E27\u0E21"],
    color: "#0ea5e9"
  }, {
    icon: "\u{1F3AF}",
    title: "5. \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
    list: [j < 60 && c >= 3 ? `**Rebalance \u0E15\u0E32\u0E23\u0E32\u0E07** \u2014 ${o}/${c} \u0E17\u0E48\u0E32\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E07\u0E32\u0E19 (${j}%) \xB7 \u0E2D\u0E32\u0E08\u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E43\u0E2B\u0E49\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48 active \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30` : null, W > 35 ? `**\u0E25\u0E14\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Top 1** \u2014 ${B?.name} \u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${W}% \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E48\u0E32\u0E19\u0E2D\u0E37\u0E48\u0E19\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E17\u0E14\u0E41\u0E17\u0E19 (Succession Plan)` : null, D > 50 ? `**Workload Rebalancing** \u2014 Gini ${D}/100 \xB7 \u0E08\u0E31\u0E14 Scheduling \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E40\u0E04\u0E2A\u0E41\u0E25\u0E30\u0E01\u0E33\u0E2B\u0E19\u0E14 Quota` : null, p > 30 ? `**\u0E25\u0E14\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19** \u2014 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${p} \u0E40\u0E04\u0E2A/\u0E27\u0E31\u0E19/\u0E17\u0E48\u0E32\u0E19 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C part-time \u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E37\u0E14\u0E40\u0E27\u0E25\u0E32 per-case` : null, "**Recall Program** \u2014 \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21\u0E21\u0E35\u0E28\u0E31\u0E01\u0E22\u0E20\u0E32\u0E1E recall \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E14\u0E34\u0E21 (\u0E02\u0E39\u0E14\u0E2B\u0E34\u0E19\u0E1B\u0E39\u0E19 6 \u0E40\u0E14\u0E37\u0E2D\u0E19, \u0E1F\u0E31\u0E19\u0E1C\u0E38\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 3 \u0E40\u0E14\u0E37\u0E2D\u0E19) \xB7 \u0E0A\u0E48\u0E27\u0E22\u0E23\u0E31\u0E01\u0E29\u0E32\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 stable", "**\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C** \u2014 \u0E14\u0E39 Trends \u0E41\u0E25\u0E30 Utilization \u0E43\u0E19 Dashboard \u0E19\u0E35\u0E49\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \xB7 \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E1B\u0E47\u0E19 7 \u0E27\u0E31\u0E19/30 \u0E27\u0E31\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E2B\u0E47\u0E19 pattern"].filter(Boolean),
    color: "#7c3aed"
  }];
  return {
    headline: R,
    headlineColor: O,
    kpi: [],
    sections: G,
    footerLeft: `${t.length} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C \xB7 ${E.period.days?`\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 ${E.period.days} \u0E27\u0E31\u0E19`:`${E.period.start} \u2192 ${E.period.end}`} \xB7 HOSxP XE \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function i0({
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
    o = c => u.jsx("div", {
      style: {
        fontSize: "10px",
        fontWeight: 800,
        color: "var(--md-text-tertiary)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "3px"
      },
      children: c
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
        children: E.actions.map((c, m) => u.jsx("li", {
          style: {
            fontSize: "12px",
            lineHeight: 1.7,
            color: "var(--md-text-primary)",
            fontWeight: 500,
            marginBottom: "4px"
          },
          dangerouslySetInnerHTML: {
            __html: c.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
          }
        }, m))
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

function g0({
  doctor: E,
  analysis: t,
  rank: o
}) {
  const c = (A, g, h, p) => u.jsxs("div", {
      style: {
        flex: "1 1 180px",
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderTop: `3px solid ${p}`,
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
        children: A
      }), u.jsx("div", {
        style: {
          fontSize: "16px",
          fontWeight: 900,
          color: "var(--md-text-primary)",
          marginTop: "2px"
        },
        children: g
      }), h && u.jsx("div", {
        style: {
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--md-text-tertiary)",
          marginTop: "2px"
        },
        children: h
      })]
    }),
    m = (A, g, h, p) => u.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderLeft: `3px solid ${p}`,
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
        children: [A, " ", g]
      }), h.length === 0 ? u.jsx("div", {
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
        children: h.map((T, $) => u.jsx("li", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-primary)",
            lineHeight: 1.6,
            fontWeight: 500,
            marginBottom: "3px"
          },
          children: T
        }, $))
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
      children: [c("\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E01\u0E32\u0E23\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34 (Pattern)", t.pattern, "IPD:OPD ratio", t.patternColor), c("\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19", t.workloadLevel, `${t.dailyVisits.toFixed(1)} \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19`, t.workloadColor), c("\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E23\u0E27\u0E08", t.ordEff, `Orders/Visit = ${E.orders_per_visit} (\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 ${t.medOrdersPerVisit.toFixed(2)})`, "#0ea5e9"), c("\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", t.revEff, `\u0E3F${r(E.revenue_per_visit)}/\u0E23\u0E32\u0E22 (\u0E04\u0E48\u0E32\u0E01\u0E25\u0E32\u0E07 \u0E3F${r(Math.round(t.medRevPerVisit))})`, "#10b981")]
    }), u.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      },
      children: [m("\u2705", "\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19 (Strengths)", t.strengths, "#10b981"), m("\u26A0", "\u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19\u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 (Concerns)", t.concerns, "#f59e0b"), m("\u{1F3AF}", "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E1A\u0E38\u0E04\u0E04\u0E25", t.recs, "#7c3aed")]
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
      }), t.deepRecs.map((A, g) => u.jsx(i0, {
        rec: A
      }, g))]
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

function h0() {
  const [E, t] = z.useState(null), [o, c] = z.useState(!0), [m, A] = z.useState(null), [g, h] = z.useState("today"), [p, T] = z.useState(1), [$, a] = z.useState(Y()), [F, B] = z.useState(Y()), [W, H] = z.useState("total_visits"), [D, w] = z.useState(() => new Set), [L, V] = z.useState(!1), [j, R] = z.useState(null), [O, G] = z.useState(() => new Set), [s, _] = z.useState(!1), J = z.useCallback(e => {
    w(d => {
      const y = new Set(d);
      return y.has(e) ? y.delete(e) : y.add(e), y
    })
  }, []), P = z.useCallback(async () => {
    c(!0), A(null);
    try {
      const e = Y(),
        d = E0(new Date(Date.now() - 864e5)),
        y = (() => {
          const M = new Date;
          return M.setDate(1), E0(M)
        })();
      let x;
      switch (g) {
        case "today":
          x = "days=1";
          break;
        case "yesterday":
          x = `start=${d}&end=${d}`;
          break;
        case "mtd":
          x = `start=${y}&end=${e}`;
          break;
        case "7d":
          x = "days=7";
          break;
        case "30d":
          x = "days=30";
          break;
        case "custom":
          x = `start=${$}&end=${F}`;
          break;
        default:
          x = "days=1"
      }
      const f = await fetch(`/api/doctor/activity-summary?${x}`, {
        credentials: "include"
      });
      if (!f.ok) throw new Error(`HTTP ${f.status}`);
      const I = await f.json();
      t(I)
    } catch (e) {
      A(e.message)
    }
    c(!1)
  }, [g, p, $, F]);
  z.useEffect(() => {
    P()
  }, [P]);
  const K = z.useMemo(() => E?.doctors ? [...E.doctors].sort((e, d) => (d[W] || 0) - (e[W] || 0)) : [], [E, W]),
    X = z.useMemo(() => K.length ? K.slice(0, 3).map(e => ({
      name: (e.name || "").replace(/^(นพ\.|พญ\.|ศ\.|รศ\.|ผศ\.)/, ""),
      OPD: e.opd_visits,
      IPD: e.ipd_admissions,
      Orders: e.total_orders
    })) : [], [K]),
    N = z.useMemo(() => {
      const e = (E?.dentists || []).slice().sort((d, y) => (y.opd_visits || 0) - (d.opd_visits || 0));
      return e.length ? e.slice(0, 3).map(d => ({
        name: (d.name || "").replace(/^(ทพ\.|ทพญ\.)/, ""),
        OPD: d.opd_visits || 0,
        Orders: (d.lab_orders || 0) + (d.xray_orders || 0)
      })) : []
    }, [E]),
    Q = z.useMemo(() => E?.trend_7d ? E.trend_7d.map(e => ({
      date: new Date(e.date).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short"
      }),
      doctors: e.doctors || 0,
      dentists: e.dentists || 0,
      visits: e.visits || 0
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
        onClick: () => h(e.k),
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          border: g === e.k ? "none" : "1px solid var(--md-border)",
          fontSize: "12px",
          fontWeight: 800,
          cursor: "pointer",
          background: g === e.k ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "var(--md-bg)",
          color: g === e.k ? "#fff" : "var(--md-text-secondary)",
          transition: "all 0.15s",
          boxShadow: g === e.k ? "0 2px 8px rgba(2,132,199,.25)" : "none"
        },
        children: e.label
      }, e.k)), g === "custom" && u.jsxs("div", {
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
          value: $,
          max: F,
          onChange: e => a(e.target.value),
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
          value: F,
          min: $,
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
    }), m && u.jsxs("div", {
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(239,68,68,.08)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: ["\u26A0 ", m]
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
      const e = p0(E);
      if (!e) return null;
      const d = ["all_doctors", "doctors", "opd", "ipd", "gini", "top20", "revenue", "all_dentists", "dentists", "dentists", "dentists"],
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
      const x = y.slice(0, 7),
        f = y.slice(7),
        I = (C, l, v) => u.jsxs("div", {
          onClick: () => R(d[v]),
          role: "button",
          tabIndex: 0,
          onKeyDown: S => {
            (S.key === "Enter" || S.key === " ") && (S.preventDefault(), R(d[v]))
          },
          style: {
            background: "var(--md-surface)",
            border: j === d[v] ? `2px solid ${C.color||"#7c3aed"}` : "1px solid var(--md-border)",
            borderTop: `3px solid ${C.color||"#7c3aed"}`,
            borderRadius: "10px",
            padding: "10px 12px",
            minWidth: 0,
            cursor: "pointer",
            transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
            outline: "none"
          },
          onMouseEnter: S => {
            S.currentTarget.style.transform = "translateY(-1px)", S.currentTarget.style.boxShadow = `0 4px 12px ${C.color||"#7c3aed"}40`
          },
          onMouseLeave: S => {
            S.currentTarget.style.transform = "", S.currentTarget.style.boxShadow = ""
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
        }, v),
        M = (C, l, v) => u.jsxs("div", {
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
              background: v,
              borderRadius: "99px"
            }
          }), u.jsxs("div", {
            style: {
              fontSize: "13px",
              fontWeight: 900,
              color: "var(--md-text-primary)",
              letterSpacing: "0.02em"
            },
            children: [C, " ", l]
          })]
        });
      return u.jsxs(z.Fragment, {
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
              children: [x.length, " KPI"]
            })]
          }), u.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "10px"
            },
            children: x.map((C, l) => I(C, l, l))
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
            children: f.map((C, l) => I(C, l, l + 7))
          })]
        }), !1, j && u.jsxs("div", {
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
                    filter: n => n.ipd_admissions > 0,
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
                l = C[j] || C.doctors;
              let v = [...(l.dataKey ? E[l.dataKey] : E.doctors) || []];
              l.filter && (v = v.filter(l.filter)), v.sort((n, i) => l.asc ? (n[l.sortKey] || 0) - (i[l.sortKey] || 0) : (i[l.sortKey] || 0) - (n[l.sortKey] || 0)), l.limit && (v = v.slice(0, l.limit));
              const S = v.reduce((n, i) => n + (i[l.sortKey] || 0), 0),
                b = n => l.showCols.includes(n);
              return [u.jsxs("div", {
                style: {
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--md-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                  background: `linear-gradient(135deg, ${l.color}14, transparent)`
                },
                children: [u.jsxs("div", {
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "16px",
                      fontWeight: 900,
                      color: "var(--md-text-primary)"
                    },
                    children: l.title
                  }), u.jsx("div", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-secondary)",
                      marginTop: "4px",
                      lineHeight: 1.5
                    },
                    children: l.desc
                  })]
                }), u.jsx("button", {
                  type: "button",
                  onClick: () => R(null),
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
                children: v.length === 0 ? u.jsx("div", {
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
                      }), b("opd") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "OPD"
                      }), b("ipd") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "IPD"
                      }), b("orders") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "Orders"
                      }), b("total") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E27\u0E21"
                      }), b("opdRev") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 OPD"
                      }), b("ipdRev") && u.jsx("th", {
                        style: {
                          textAlign: "right",
                          padding: "8px 6px",
                          fontWeight: 800,
                          color: "var(--md-text-tertiary)",
                          fontSize: "11px"
                        },
                        children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 IPD"
                      }), b("rev") && u.jsx("th", {
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
                    children: [...v.map((n, i) => {
                      const k = S > 0 ? Math.round((n[l.sortKey] || 0) / S * 100) : 0;
                      return u.jsxs("tr", {
                        style: {
                          borderBottom: "1px solid var(--md-divider)"
                        },
                        children: [u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            fontWeight: 700,
                            color: i < 3 ? l.color : "var(--md-text-tertiary)"
                          },
                          children: i === 0 ? "\u{1F947}" : i === 1 ? "\u{1F948}" : i === 2 ? "\u{1F949}" : `#${i+1}`
                        }), u.jsxs("td", {
                          style: {
                            padding: "8px 6px",
                            fontWeight: 700,
                            color: "var(--md-text-primary)"
                          },
                          children: [n.name || n.code, n.position ? u.jsx("div", {
                            style: {
                              fontSize: "10px",
                              color: "var(--md-text-tertiary)",
                              fontWeight: 500
                            },
                            children: n.position
                          }) : null]
                        }), b("opd") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#7c3aed"
                          },
                          children: r(n.opd_visits || 0)
                        }), b("ipd") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#db2777"
                          },
                          children: r(n.ipd_admissions || 0)
                        }), b("orders") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: r((n.lab_orders || 0) + (n.xray_orders || 0))
                        }), b("total") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700
                          },
                          children: r(n.total_visits || 0)
                        }), b("opdRev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: `\u0E3F${r(Math.round(n.opd_revenue||0))}`
                        }), b("ipdRev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 600
                          },
                          children: `\u0E3F${r(Math.round(n.ipd_revenue||0))}`
                        }), b("rev") && u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: "#10b981"
                          },
                          children: `\u0E3F${r(Math.round(n.total_revenue||0))}`
                        }), u.jsx("td", {
                          style: {
                            padding: "8px 6px",
                            textAlign: "right",
                            fontWeight: 700,
                            color: l.color
                          },
                          children: `${k}%`
                        })]
                      }, n.code || i)
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
                        children: `\u0E23\u0E27\u0E21 (${v.length} \u0E17\u0E48\u0E32\u0E19)`
                      }), b("opd") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#7c3aed"
                        },
                        children: r(v.reduce((n, i) => n + (i.opd_visits || 0), 0))
                      }), b("ipd") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#db2777"
                        },
                        children: r(v.reduce((n, i) => n + (i.ipd_admissions || 0), 0))
                      }), b("orders") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: r(v.reduce((n, i) => n + ((i.lab_orders || 0) + (i.xray_orders || 0)), 0))
                      }), b("total") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: r(v.reduce((n, i) => n + (i.total_visits || 0), 0))
                      }), b("opdRev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: `\u0E3F${r(Math.round(v.reduce((n,i)=>n+(i.opd_revenue||0),0)))}`
                      }), b("ipdRev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900
                        },
                        children: `\u0E3F${r(Math.round(v.reduce((n,i)=>n+(i.ipd_revenue||0),0)))}`
                      }), b("rev") && u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: "#10b981"
                        },
                        children: `\u0E3F${r(Math.round(v.reduce((n,i)=>n+(i.total_revenue||0),0)))}`
                      }), u.jsx("td", {
                        style: {
                          padding: "10px 6px",
                          textAlign: "right",
                          fontWeight: 900,
                          color: l.color
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
          narrative: c0(E)
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap"
        },
        children: [u.jsxs("div", {
          style: {
            fontSize: "14px",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: ["\u{1F3C6} \u0E41\u0E1E\u0E17\u0E22\u0E4C Top 3 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21 ", W === "total_visits" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : W === "opd_visits" ? "OPD Visits" : W === "ipd_admissions" ? "IPD Admissions" : W === "total_orders" ? "Lab/X-Ray Orders" : "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"]
        }), u.jsx("span", {
          style: {
            fontSize: "10px",
            fontWeight: 800,
            color: "#fff",
            background: "linear-gradient(135deg,#7c3aed,#0ea5e9)",
            padding: "3px 10px",
            borderRadius: "999px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            boxShadow: "0 2px 6px rgba(124,58,237,0.3)"
          },
          children: "Leaderboard v2 \xB7 2026-05-19"
        })]
      }), (function() {
        var e = Math.max.apply(null, X.map(function(f) {
            return f.OPD || 0
          }).concat([1])),
          d = Math.max.apply(null, X.map(function(f) {
            return f.IPD || 0
          }).concat([1])),
          y = Math.max.apply(null, X.map(function(f) {
            return f.Orders || 0
          }).concat([1])),
          x = [{
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
          children: X.map(function(f, I) {
            var M = x[I] || x[2],
              C = (f.OPD || 0) + (f.IPD || 0),
              l = C > 0 ? ((f.Orders || 0) / C).toFixed(2) : "\u2014",
              v = (f.name || "").trim(),
              S = v.split(/\s+/),
              b = S.length >= 2 ? (S[0].charAt(0) || "") + (S[S.length - 1].charAt(0) || "") : v.slice(0, 2);
            b || (b = "\u2014");
            var n = [{
              label: "OPD",
              value: f.OPD || 0,
              max: e,
              color: "#7c3aed",
              bg: "rgba(124,58,237,0.12)"
            }, {
              label: "IPD",
              value: f.IPD || 0,
              max: d,
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
                border: "1px solid " + M.border,
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: M.glow,
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              },
              children: [u.jsxs("div", {
                style: {
                  background: M.accent,
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
                  children: ["\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A #", String(I + 1)]
                }), u.jsx("span", {
                  style: {
                    fontSize: "18px"
                  },
                  children: M.medal
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
                      background: M.avatar,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "14px",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    },
                    children: b
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
                      children: v
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
                  children: n.map(function(i) {
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
                      children: l
                    })]
                  })]
                })]
              })]
            }, I)
          })
        })
      })()]
    }), !o && E && N.length > 0 && u.jsxs("div", {
      className: "rounded-2xl p-5",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap"
        },
        children: [u.jsx("div", {
          style: {
            fontSize: "14px",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: "\u{1F9B7} \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C Top 3 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
        }), u.jsx("span", {
          style: {
            fontSize: "10px",
            fontWeight: 800,
            color: "#fff",
            background: "linear-gradient(135deg,#06b6d4,#0891b2)",
            padding: "3px 10px",
            borderRadius: "999px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            boxShadow: "0 2px 6px rgba(6,182,212,0.3)"
          },
          children: "Leaderboard v2 \xB7 2026-05-19"
        })]
      }), (function() {
        var e = Math.max.apply(null, N.map(function(x) {
            return x.OPD || 0
          }).concat([1])),
          d = Math.max.apply(null, N.map(function(x) {
            return x.Orders || 0
          }).concat([1])),
          y = [{
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
          children: N.map(function(x, f) {
            var I = y[f] || y[2],
              M = x.OPD || 0,
              C = M > 0 ? ((x.Orders || 0) / M).toFixed(2) : "\u2014",
              l = (x.name || "").trim(),
              v = l.split(/\s+/),
              S = v.length >= 2 ? (v[0].charAt(0) || "") + (v[v.length - 1].charAt(0) || "") : l.slice(0, 2);
            S || (S = "\u2014");
            var b = [{
              label: "OPD",
              value: x.OPD || 0,
              max: e,
              color: "#06b6d4",
              bg: "rgba(6,182,212,0.12)"
            }, {
              label: "\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07",
              value: x.Orders || 0,
              max: d,
              color: "#0ea5e9",
              bg: "rgba(14,165,233,0.12)"
            }];
            return u.jsxs("div", {
              style: {
                background: "var(--md-surface)",
                border: "1px solid " + I.border,
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: I.glow,
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              },
              children: [u.jsxs("div", {
                style: {
                  background: I.accent,
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
                  children: ["\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A #", String(f + 1)]
                }), u.jsx("span", {
                  style: {
                    fontSize: "18px"
                  },
                  children: I.medal
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
                      background: I.avatar,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: "14px",
                      flexShrink: 0,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    },
                    children: S
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
                      children: l
                    }), u.jsx("div", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginTop: "4px"
                      },
                      children: "Top Dentist"
                    })]
                  })]
                }), u.jsx("div", {
                  children: b.map(function(n) {
                    var i = n.max > 0 ? Math.min(100, n.value / n.max * 100) : 0;
                    return u.jsxs("div", {
                      style: {
                        marginBottom: "12px"
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
                          children: n.label
                        }), u.jsx("span", {
                          style: {
                            fontSize: "16px",
                            fontWeight: 800,
                            color: n.value > 0 ? n.color : "var(--md-text-tertiary)",
                            fontFeatureSettings: '"tnum"'
                          },
                          children: n.value
                        })]
                      }), u.jsx("div", {
                        style: {
                          height: "6px",
                          background: n.bg,
                          borderRadius: "999px",
                          overflow: "hidden"
                        },
                        children: u.jsx("div", {
                          style: {
                            height: "100%",
                            width: i + "%",
                            background: n.color,
                            borderRadius: "999px",
                            transition: "width 0.6s ease"
                          }
                        })
                      })]
                    }, n.label)
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
                      children: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 OPD"
                    }), u.jsxs("div", {
                      style: {
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        fontFeatureSettings: '"tnum"',
                        marginTop: "2px"
                      },
                      children: [M, u.jsx("span", {
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
                      children: C
                    })]
                  })]
                })]
              })]
            }, f)
          })
        })
      })()]
    }), !o && E && Q.length > 0 && u.jsxs("div", {
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
        children: "\u{1F4C8} \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19 7 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \u2014 \u0E08\u0E33\u0E19\u0E27\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C + \u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C \u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E41\u0E25\u0E30\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22"
      }), u.jsx(o0, {
        width: "100%",
        height: 260,
        children: u.jsxs(l0, {
          data: Q,
          margin: {
            top: 10,
            right: 20,
            left: 10,
            bottom: 10
          },
          children: [u.jsx(n0, {
            strokeDasharray: "3 3",
            stroke: "var(--md-divider)"
          }), u.jsx(d0, {
            dataKey: "date",
            tick: {
              fill: "#6b7280",
              fontSize: 11
            }
          }), u.jsx(t0, {
            yAxisId: "left",
            tick: {
              fill: "#9ca3af",
              fontSize: 11
            },
            label: {
              value: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23 (\u0E17\u0E48\u0E32\u0E19)",
              angle: -90,
              position: "insideLeft",
              offset: 8,
              style: {
                fontSize: 10,
                fill: "#9ca3af",
                fontWeight: 700
              }
            }
          }), u.jsx(t0, {
            yAxisId: "right",
            orientation: "right",
            tick: {
              fill: "#9ca3af",
              fontSize: 11
            },
            label: {
              value: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 (\u0E04\u0E19)",
              angle: 90,
              position: "insideRight",
              offset: 8,
              style: {
                fontSize: 10,
                fill: "#9ca3af",
                fontWeight: 700
              }
            }
          }), u.jsx(a0, {
            contentStyle: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "8px",
              fontSize: "12px"
            }
          }), u.jsx(s0, {
            wrapperStyle: {
              fontSize: "12px",
              fontWeight: 700
            }
          }), u.jsx(u0, {
            yAxisId: "left",
            type: "monotone",
            dataKey: "doctors",
            stroke: "#0284c7",
            strokeWidth: 2,
            name: "\u0E41\u0E1E\u0E17\u0E22\u0E4C",
            dot: {
              r: 4,
              fill: "#0284c7"
            }
          }), u.jsx(u0, {
            yAxisId: "left",
            type: "monotone",
            dataKey: "dentists",
            stroke: "#06b6d4",
            strokeWidth: 2,
            name: "\u0E17\u0E31\u0E19\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C",
            dot: {
              r: 4,
              fill: "#06b6d4"
            }
          }), u.jsx(u0, {
            yAxisId: "right",
            type: "monotone",
            dataKey: "visits",
            stroke: "#7c3aed",
            strokeWidth: 2,
            name: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
            dot: {
              r: 4,
              fill: "#7c3aed"
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
            L ? (w(new Set), V(!1)) : (w(new Set(K.map(e => e.code))), V(!0))
          },
          style: {
            padding: "6px 14px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 800,
            cursor: "pointer",
            background: L ? "linear-gradient(135deg, #0284c7, #7c3aed)" : "var(--md-surface)",
            color: L ? "#fff" : "var(--md-text-primary)"
          },
          children: L ? "\u25BC \u0E0B\u0E48\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14" : "\u25B6 \u0E41\u0E2A\u0E14\u0E07\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E17\u0E38\u0E01\u0E41\u0E1E\u0E17\u0E22\u0E4C"
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
            children: K.map((e, d) => {
              const y = D.has(e.code),
                x = y ? r0(e, K, E.period?.days ? E.period.days : Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1)) : null;
              return u.jsxs(Z.Fragment, {
                children: [u.jsxs("tr", {
                  onClick: () => J(e.code),
                  style: {
                    borderBottom: "1px solid var(--md-divider)",
                    background: y ? "rgba(2,132,199,.05)" : d % 2 === 0 ? "transparent" : "rgba(0,0,0,.02)",
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
                      color: d < 3 ? "#0284c7" : "var(--md-text-tertiary)",
                      fontSize: "12px"
                    },
                    children: d === 0 ? "\u{1F947}" : d === 1 ? "\u{1F948}" : d === 2 ? "\u{1F949}" : `#${d+1}`
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
                }), y && x && u.jsx("tr", {
                  style: {
                    background: "rgba(2,132,199,.03)",
                    borderBottom: "1px solid var(--md-divider)"
                  },
                  children: u.jsx("td", {
                    colSpan: 10,
                    style: {
                      padding: "16px 24px"
                    },
                    children: u.jsx(g0, {
                      doctor: e,
                      analysis: x,
                      rank: d + 1
                    })
                  })
                })]
              }, e.code || d)
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
            s ? (G(new Set), _(!1)) : (G(new Set((E.dentists || []).map(e => e.code))), _(!0))
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
            children: [...E.dentists.map((e, d) => {
              const y = O.has(e.code),
                x = E.period?.days || Math.max(1, Math.round((new Date(E.period.end) - new Date(E.period.start)) / 864e5) + 1),
                f = y ? r0(e, E.dentists, x) : null;
              return u.jsxs(Z.Fragment, {
                children: [u.jsxs("tr", {
                  onClick: () => G(I => {
                    const M = new Set(I);
                    return M.has(e.code) ? M.delete(e.code) : M.add(e.code), M
                  }),
                  style: {
                    borderBottom: "1px solid var(--md-divider)",
                    background: y ? "rgba(6,182,212,.06)" : d % 2 === 0 ? "transparent" : "rgba(0,0,0,.02)",
                    cursor: "pointer"
                  },
                  children: [u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      fontWeight: 800,
                      color: d < 3 ? "#06b6d4" : "var(--md-text-tertiary)",
                      fontSize: "12px"
                    },
                    children: d === 0 ? "\u{1F947}" : d === 1 ? "\u{1F948}" : d === 2 ? "\u{1F949}" : `#${d+1}`
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
                    children: u.jsx(i0, {
                      doctor: e,
                      analysis: f,
                      rank: d + 1
                    })
                  })
                })]
              }, e.code || d)
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
                children: r(E.dentists.reduce((e, d) => e + (d.opd_visits || 0), 0))
              }), u.jsx("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900
                },
                children: r(E.dentists.reduce((e, d) => e + (d.lab_orders || 0), 0))
              }), u.jsx("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900
                },
                children: r(E.dentists.reduce((e, d) => e + (d.xray_orders || 0), 0))
              }), u.jsx("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900,
                  color: "var(--md-text-secondary)"
                },
                children: (() => {
                  const e = E.dentists.reduce((y, x) => y + (x.opd_visits || 0), 0),
                    d = E.dentists.reduce((y, x) => y + (x.lab_orders || 0) + (x.xray_orders || 0), 0);
                  return e > 0 ? (d / e).toFixed(2) : "0"
                })()
              }), u.jsxs("td", {
                style: {
                  padding: "12px 12px",
                  textAlign: "right",
                  fontWeight: 900,
                  color: "#10b981"
                },
                children: ["\u0E3F", r(Math.round(E.dentists.reduce((e, d) => e + (d.total_revenue || 0), 0)))]
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
const A0 = Z.memo(h0);
export {
  A0 as
  default
};