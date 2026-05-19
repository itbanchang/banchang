const bu = (n, f0 = bu, M = f0.f || (f0.f = ["assets/xlsx.min-CZi5yKex.js", "assets/vendor-react-ByYOq5k4.js"])) => n.map(A0 => M[A0]);
import {
  _ as du,
  E as bE,
  h as Cu
} from "./shared-ui-OVDEF1.js";
import {
  R as AE,
  r as Z,
  j as u
} from "./vendor-react-ByYOq5k4.js";
const vE = Object.freeze({
    th: {
      padding: "7px 6px",
      fontSize: "11px",
      fontWeight: 800,
      textAlign: "center",
      whiteSpace: "nowrap",
      borderBottom: "2px solid var(--md-border)",
      color: "var(--md-text-primary)",
      letterSpacing: "0.01em"
    },
    td: {
      padding: "6px 6px",
      fontSize: "12px",
      fontWeight: 600,
      textAlign: "center",
      borderBottom: "1px solid var(--md-border)",
      color: "var(--md-text-primary)"
    },
    tdNum: {
      padding: "6px 6px",
      fontSize: "12px",
      fontWeight: 700,
      textAlign: "right",
      borderBottom: "1px solid var(--md-border)",
      fontVariantNumeric: "tabular-nums",
      color: "var(--md-text-primary)"
    },
    fy1Bg: "rgba(59,130,246,.10)",
    fy2Bg: "rgba(236,72,153,.10)",
    growthBg: "rgba(34,197,94,.08)",
    totalBg: "rgba(14,165,233,.15)"
  }),
  cu = /^[A-Z]\d/i;

function DE(n, f0, M) {
  if (!n?.comparison || !n.fy1_totals || !n.fy2_totals) return null;
  const A0 = n.fy1_totals,
    S = n.fy2_totals,
    i0 = n.comparison.filter(R0 => R0.fy1?.has_data && R0.fy2?.has_data);
  if (i0.length === 0) return {
    headline: `\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E35\u0E07\u0E1A ${f0} \u0E01\u0E31\u0E1A ${M}`,
    empty: !0
  };
  const E0 = (R0, u0 = 0) => Number.isFinite(Number(R0)) ? Number(R0) : u0,
    j0 = (R0, u0 = 0) => R0 == null || isNaN(R0) ? "\u2014" : Number(R0).toLocaleString("th-TH", {
      minimumFractionDigits: u0,
      maximumFractionDigits: u0
    }),
    Eu = E0(A0.ipd_discharge),
    Y0 = E0(S.ipd_discharge),
    G0 = E0(A0.ipd_deaths),
    I0 = E0(S.ipd_deaths),
    c0 = E0(A0.opd_deaths),
    m0 = E0(S.opd_deaths),
    C0 = E0(A0.total_deaths),
    p0 = E0(S.total_deaths),
    eu = E0(A0.ipd_early_deaths),
    a0 = E0(S.ipd_early_deaths),
    Y = Eu > 0 ? G0 / Eu * 100 : 0,
    y0 = Y0 > 0 ? I0 / Y0 * 100 : 0,
    $0 = E0(n.death_growth_pct),
    S0 = G0 > 0 ? eu / G0 * 100 : 0,
    x0 = I0 > 0 ? a0 / I0 * 100 : 0;
  let J = null,
    tu = -1 / 0;
  for (const R0 of i0) {
    const u0 = R0.fy2?.ipd_mortality_rate || 0;
    u0 > tu && (tu = u0, J = R0.month)
  }
  let v0, ou;
  y0 >= 3 ? (v0 = `\u{1F534} IPD Mortality Rate ${y0.toFixed(2)}% \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 3% \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E31\u0E49\u0E07 Mortality Review Committee \u0E20\u0E32\u0E22\u0E43\u0E19 7 \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E17\u0E1A HA accreditation`, ou = "#f43f5e") : $0 >= 20 ? (v0 = `\u26A0 \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${$0}% \u2014 \u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 FY${M} ${p0} \u0E23\u0E32\u0E22 (FY${f0} ${C0}) \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause`, ou = "#f59e0b") : y0 <= 1.5 && $0 <= 0 ? (v0 = `\u2705 Mortality Rate \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35 \u2014 IPD Rate ${y0.toFixed(2)}% \xB7 ${$0>=0?"+":""}${$0}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \xB7 Quality of Care \u0E14\u0E35`, ou = "#10b981") : (v0 = `IPD Mortality ${y0.toFixed(2)}% (FY${f0}: ${Y.toFixed(2)}%) \xB7 ${$0>=0?"+":""}${$0}% \xB7 Early Death ${x0.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 IPD`, ou = "#0ea5e9");
  const w0 = (R0, u0, Au) => R0 <= u0 ? "#10b981" : R0 <= Au ? "#f59e0b" : "#f43f5e",
    X0 = [{
      label: `IPD Mortality Rate (${M})`,
      value: `${y0.toFixed(2)}%`,
      sub: `FY${f0}: ${Y.toFixed(2)}%`,
      color: w0(y0, 1.5, 3)
    }, {
      label: "Total Deaths",
      value: j0(p0),
      sub: `${$0>=0?"+":""}${$0}% YoY`,
      color: $0 >= 10 ? "#f43f5e" : $0 >= 0 ? "#f59e0b" : "#10b981"
    }, {
      label: "IPD Deaths",
      value: j0(I0),
      sub: `Discharged ${j0(Y0)}`,
      color: "#dc2626"
    }, {
      label: "OPD Deaths",
      value: j0(m0),
      sub: "ER / \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B",
      color: "#f59e0b"
    }, {
      label: "Early Death (<48h)",
      value: j0(a0),
      sub: `${x0.toFixed(1)}% \u0E02\u0E2D\u0E07 IPD Deaths`,
      color: x0 >= 20 ? "#f43f5e" : x0 >= 10 ? "#f59e0b" : "#10b981"
    }, {
      label: "Comparable Months",
      value: `${i0.length}`,
      sub: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49",
      color: "#7c3aed"
    }],
    b0 = [];
  b0.push({
    icon: "\u{1F4CA}",
    title: "Mortality Overview",
    text: `\u0E1B\u0E35\u0E07\u0E1A ${M}: IPD \u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15 ${j0(I0)} \u0E23\u0E32\u0E22 (rate ${y0.toFixed(2)}%) \xB7 OPD \u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15 ${j0(m0)} \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E27\u0E21 ${j0(p0)}. \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A ${f0}: IPD ${j0(G0)} (rate ${Y.toFixed(2)}%) \xB7 OPD ${j0(c0)} \xB7 \u0E23\u0E27\u0E21 ${j0(C0)}. \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07 ${$0>=0?"+":""}${$0}%. ` + (y0 > Y + .3 ? "\u26A0 Rate \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D" : y0 < Y - .3 ? "\u2705 Rate \u0E25\u0E14\u0E25\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D" : "Rate \u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"),
    color: ou
  }), b0.push({
    icon: "\u23F1\uFE0F",
    title: "Early Death Pattern (LOS < 2 \u0E27\u0E31\u0E19)",
    text: `\u0E1B\u0E35\u0E07\u0E1A ${M}: Early Death ${j0(a0)} \u0E23\u0E32\u0E22 (${x0.toFixed(1)}% \u0E02\u0E2D\u0E07 IPD Deaths) \xB7 \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A ${f0}: ${j0(eu)} \u0E23\u0E32\u0E22 (${S0.toFixed(1)}%). ` + (x0 >= 30 ? "\u{1F534} >30% \u0E40\u0E1B\u0E47\u0E19 early death \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E32\u0E21\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07\u0E02\u0E2D\u0E07\u0E42\u0E23\u0E04\u0E15\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 \u0E2B\u0E23\u0E37\u0E2D admission criteria \u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E0A\u0E49\u0E32" : x0 >= 15 ? "\u26A0 Early death \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 triage / ER-to-admission flow" : "\u2705 Early death \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"),
    color: x0 >= 30 ? "#f43f5e" : x0 >= 15 ? "#f59e0b" : "#10b981"
  }), J && b0.push({
    icon: "\u{1F4C5}",
    title: "Monthly Mortality Pattern",
    text: `\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 IPD Mortality \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14: ${J} (${tu.toFixed(2)}%). ` + (tu >= 3 ? "\u0E04\u0E27\u0E23\u0E17\u0E33 Retrospective Case Review \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E14\u0E31\u0E07\u0E01\u0E25\u0E48\u0E32\u0E27 \xB7 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C case mix, staffing, equipment readiness" : "Peak \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"),
    color: tu >= 3 ? "#f59e0b" : "#10b981"
  });
  const Q0 = [];
  y0 >= 3 && Q0.push(`\u{1F534} IPD Mortality Rate ${y0.toFixed(2)}% \u0E40\u0E01\u0E34\u0E19 threshold 3% \u2014 HA standard compliance risk`), $0 >= 20 && Q0.push(`\u{1F534} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21 ${$0}% \u2014 \u0E15\u0E49\u0E2D\u0E07 M&M Conference \u0E20\u0E32\u0E22\u0E43\u0E19 14 \u0E27\u0E31\u0E19`), x0 >= 30 && Q0.push(`\u{1F534} Early Death \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 ${x0.toFixed(1)}% \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 late admission \u0E2B\u0E23\u0E37\u0E2D severity sorting \u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27`), a0 >= eu * 1.5 && eu > 0 && Q0.push(`\u{1F7E0} Early Death \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01 ${eu} \u2192 ${a0} \xB7 investigate ER-to-ward handoff`), m0 > c0 * 1.3 && c0 > 0 && Q0.push(`\u{1F7E0} OPD/ER Deaths \u0E40\u0E1E\u0E34\u0E48\u0E21 ${Math.round((m0-c0)/c0*100)}% \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 ER triage + rapid response`), J && tu >= 4 && Q0.push(`\u{1F7E0} \u0E40\u0E14\u0E37\u0E2D\u0E19 ${J} Peak Mortality ${tu.toFixed(2)}% \u2014 outlier \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E1B\u0E47\u0E19 cluster`), Q0.length === 0 && Q0.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E14\u0E49\u0E32\u0E19 Mortality \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D \u2014 Quality of Care \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35");
  const l0 = [];
  return y0 >= 3 && (l0.push("\u{1F534} P0 \xB7 \u0E15\u0E31\u0E49\u0E07 Mortality Review Board (MRB) \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u2014 review 100% IPD deaths \xB7 \u0E41\u0E22\u0E01 Preventable vs Non-preventable"), l0.push("\u{1F534} P0 \xB7 Re-train CPR/ACLS + Code Blue response \u0E17\u0E38\u0E01 ward \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19")), $0 >= 10 && I0 > 0 && l0.push("\u{1F7E0} P1 \xB7 M&M Conference \u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 focus DRG/DX \u0E17\u0E35\u0E48\u0E21\u0E35 mortality \u0E2A\u0E39\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14"), x0 >= 20 && l0.push("\u{1F7E0} P1 \xB7 ER Triage Audit \xB7 Early Warning Score (NEWS2) compliance check \xB7 ICU availability in 24/7"), J && tu >= 3 && l0.push(`\u{1F7E1} P2 \xB7 Retrospective Case Review \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${J} \xB7 deep-dive case mix + intervention timing`), I0 >= 20 && l0.push("\u{1F535} P1 \xB7 \u0E2A\u0E23\u0E49\u0E32\u0E07 Mortality Dashboard \u0E23\u0E32\u0E22 Ward / DRG \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19"), l0.push("\u{1F535} P1 \xB7 Preventable Death Reporting \u2014 \u0E41\u0E22\u0E01\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 intervention \u0E17\u0E35\u0E48\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32\u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C"), m0 > 0 && l0.push("\u{1F7E1} P2 \xB7 ER Mortality Review \u2014 focus DNR/DAMA patterns \xB7 dispatch time \xB7 resuscitation quality"), b0.push({
    icon: "\u26A0\uFE0F",
    title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 / Red Flags",
    list: Q0,
    color: "#f59e0b"
  }), b0.push({
    icon: "\u{1F4A1}",
    title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C (P0\u2013P2)",
    list: l0,
    color: "#10b981"
  }), {
    headline: v0,
    headlineColor: ou,
    kpi: X0,
    sections: b0,
    footerLeft: `IPD Discharged ${j0(Y0)} \xB7 ${i0.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \xB7 FY${f0} vs FY${M} \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function l(n, f0 = 0) {
  return n == null || n === "" || isNaN(n) ? "\u2014" : Number(n).toLocaleString("th-TH", {
    minimumFractionDigits: f0,
    maximumFractionDigits: f0
  })
}
async function uu(n, f0) {
  const M = await fetch(n, f0),
    A0 = M.headers.get("content-type") || "";
  if (!M.ok) {
    if (A0.includes("application/json")) {
      const S = await M.json();
      throw new Error(S.error || `HTTP ${M.status}`)
    }
    throw new Error(`HTTP ${M.status}`)
  }
  if (!A0.includes("json")) throw new Error("\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E01\u0E25\u0E31\u0E1A \u2014 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Backend (port 4001) \u0E17\u0E33\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48");
  return M.json()
}
const nE = {
  OPD: {
    short: "OPD",
    full: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01",
    rootCause: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14, Referral Leakage, \u0E02\u0E32\u0E14\u0E41\u0E04\u0E25\u0E19\u0E22\u0E32/\u0E23\u0E35\u0E40\u0E2D\u0E40\u0E08\u0E19\u0E15\u0E4C \u0E2B\u0E23\u0E37\u0E2D Service Mix \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19",
    pricePressure: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Price List / Discount Policy / Insurance Reimbursement Rate",
    peakPlan: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Staffing, Stock Level \u0E41\u0E25\u0E30 Preventive Maintenance",
    imagingNote: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Guideline / ACR Appropriateness Criteria"
  },
  IPD: {
    short: "IPD",
    full: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19",
    rootCause: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14\u0E25\u0E07, LOS \u0E2A\u0E31\u0E49\u0E19\u0E25\u0E07, DRG-mix \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22 Admission \u0E40\u0E02\u0E49\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E2B\u0E23\u0E37\u0E2D Bed availability \u0E25\u0E14",
    pricePressure: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A DRG Reimbursement Rate, Contractual Discount, Insurance Mix",
    peakPlan: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Bed capacity, Nurse staffing, Stock Level \u0E15\u0E32\u0E21 pattern \u0E01\u0E32\u0E23 admit",
    imagingNote: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Inpatient Imaging Protocol \u0E41\u0E25\u0E30\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07 CT/MRI \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 admission"
  }
};

function BE(n, f0, M, A0 = "OPD") {
  const S = nE[A0] || nE.OPD;
  if (!n?.comparison || !n.fy1_totals || !n.fy2_totals) return null;
  const i0 = n.fy1_totals,
    E0 = n.fy2_totals,
    j0 = n.comparable_months || 0;
  if (j0 === 0) return {
    headline: `\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E35\u0E07\u0E1A ${f0} \u0E01\u0E31\u0E1A ${M} \u2014 \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E44\u0E14\u0E49\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E23\u0E1A\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E1B\u0E35`,
    empty: !0
  };
  const Eu = i0.lab_orders + i0.drug_orders + i0.xray_orders,
    Y0 = i0.lab_price + i0.drug_price + i0.xray_price,
    G0 = E0.lab_orders + E0.drug_orders + E0.xray_orders,
    I0 = E0.lab_price + E0.drug_price + E0.xray_price,
    c0 = Number(n.overall_orders_growth_pct ?? 0),
    m0 = Number(n.overall_price_growth_pct ?? 0),
    C0 = G0 - Eu,
    p0 = I0 - Y0,
    eu = m0 - c0,
    a0 = (Q, G) => G > 0 ? Math.round((Q - G) / G * 100) : Q > 0 ? 100 : 0,
    Y = {
      Lab: {
        ord: a0(E0.lab_orders, i0.lab_orders),
        px: a0(E0.lab_price, i0.lab_price),
        absOrd: E0.lab_orders - i0.lab_orders,
        absPx: E0.lab_price - i0.lab_price
      },
      Drug: {
        ord: a0(E0.drug_orders, i0.drug_orders),
        px: a0(E0.drug_price, i0.drug_price),
        absOrd: E0.drug_orders - i0.drug_orders,
        absPx: E0.drug_price - i0.drug_price
      },
      Xray: {
        ord: a0(E0.xray_orders, i0.xray_orders),
        px: a0(E0.xray_price, i0.xray_price),
        absOrd: E0.xray_orders - i0.xray_orders,
        absPx: E0.xray_price - i0.xray_price
      }
    },
    y0 = {
      Lab: {
        f1: i0.lab_orders ? i0.lab_price / i0.lab_orders : 0,
        f2: E0.lab_orders ? E0.lab_price / E0.lab_orders : 0
      },
      Drug: {
        f1: i0.drug_orders ? i0.drug_price / i0.drug_orders : 0,
        f2: E0.drug_orders ? E0.drug_price / E0.drug_orders : 0
      },
      Xray: {
        f1: i0.xray_orders ? i0.xray_price / i0.xray_orders : 0,
        f2: E0.xray_orders ? E0.xray_price / E0.xray_orders : 0
      }
    },
    $0 = Q => Q.f1 > 0 ? Math.round((Q.f2 - Q.f1) / Q.f1 * 100) : 0,
    S0 = {
      lab: Y0 > 0 ? i0.lab_price / Y0 * 100 : 0,
      drug: Y0 > 0 ? i0.drug_price / Y0 * 100 : 0,
      xray: Y0 > 0 ? i0.xray_price / Y0 * 100 : 0
    },
    x0 = {
      lab: I0 > 0 ? E0.lab_price / I0 * 100 : 0,
      drug: I0 > 0 ? E0.drug_price / I0 * 100 : 0,
      xray: I0 > 0 ? E0.xray_price / I0 * 100 : 0
    },
    J = Math.round(x0.lab ** 2 + x0.drug ** 2 + x0.xray ** 2),
    tu = J >= 5e3 ? {
      text: "\u0E23\u0E27\u0E21\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E2A\u0E39\u0E07",
      color: "#dc2626"
    } : J >= 3500 ? {
      text: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07",
      color: "#f59e0b"
    } : {
      text: "\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E15\u0E31\u0E27\u0E14\u0E35",
      color: "#10b981"
    },
    v0 = Y.Drug.px >= Y.Lab.px && Y.Drug.px >= Y.Xray.px ? {
      name: "Drug (\u0E22\u0E32)",
      g: Y.Drug.px
    } : Y.Lab.px >= Y.Xray.px ? {
      name: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
      g: Y.Lab.px
    } : {
      name: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)",
      g: Y.Xray.px
    },
    ou = Y.Drug.px <= Y.Lab.px && Y.Drug.px <= Y.Xray.px ? {
      name: "Drug (\u0E22\u0E32)",
      g: Y.Drug.px
    } : Y.Lab.px <= Y.Xray.px ? {
      name: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
      g: Y.Lab.px
    } : {
      name: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)",
      g: Y.Xray.px
    },
    w0 = n.comparison.filter(Q => Q.fy1.has_data && Q.fy2.has_data),
    X0 = [];
  let b0 = null,
    Q0 = null,
    l0 = -1 / 0,
    R0 = 1 / 0;
  for (const Q of w0) {
    const G = Q.fy1.lab_orders + Q.fy1.drug_orders + Q.fy1.xray_orders,
      k0 = Q.fy2.lab_orders + Q.fy2.drug_orders + Q.fy2.xray_orders,
      U0 = Q.fy1.lab_price + Q.fy1.drug_price + Q.fy1.xray_price,
      q0 = Q.fy2.lab_price + Q.fy2.drug_price + Q.fy2.xray_price;
    if (G === 0) continue;
    const ru = (k0 - G) / G * 100,
      Bu = U0 > 0 ? (q0 - U0) / U0 * 100 : 0;
    X0.push({
      month: Q.month,
      g: ru,
      gPx: Bu,
      fy1Ord: G,
      fy2Ord: k0,
      fy1Px: U0,
      fy2Px: q0
    }), ru > l0 && (l0 = ru, b0 = Q.month), ru < R0 && (R0 = ru, Q0 = Q.month)
  }
  let u0 = 0,
    Au = 0;
  if (X0.length >= 2) {
    Au = X0.reduce((G, k0) => G + k0.g, 0) / X0.length;
    const Q = X0.reduce((G, k0) => G + (k0.g - Au) ** 2, 0) / X0.length;
    u0 = Math.round(Math.sqrt(Q))
  }
  const gu = u0 >= 30 ? {
    text: "\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E2A\u0E39\u0E07",
    color: "#dc2626"
  } : u0 >= 15 ? {
    text: "\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07",
    color: "#f59e0b"
  } : {
    text: "\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23",
    color: "#10b981"
  };
  let V0 = null;
  if (X0.length >= 4) {
    const Q = Math.floor(X0.length / 2),
      G = X0.slice(0, Q),
      k0 = X0.slice(X0.length - Q),
      U0 = G.reduce((nu, lu) => nu + lu.fy1Px, 0),
      q0 = G.reduce((nu, lu) => nu + lu.fy2Px, 0),
      ru = k0.reduce((nu, lu) => nu + lu.fy1Px, 0),
      Bu = k0.reduce((nu, lu) => nu + lu.fy2Px, 0),
      Su = U0 > 0 ? (q0 - U0) / U0 * 100 : 0,
      $u = ru > 0 ? (Bu - ru) / ru * 100 : 0,
      ju = $u - Su;
    V0 = {
      h1_label: `${G[0].month}\u2013${G[G.length-1].month}`,
      h2_label: `${k0[0].month}\u2013${k0[k0.length-1].month}`,
      h1_growth: Math.round(Su),
      h2_growth: Math.round($u),
      accel: Math.round(ju),
      direction: ju >= 3 ? "accelerating" : ju <= -3 ? "decelerating" : "stable"
    }
  }
  const xu = [];
  if (X0.length >= 3 && u0 > 0) {
    const Q = Math.max(u0 * 1.5, 15);
    for (const G of X0) {
      const k0 = G.g - Au;
      Math.abs(k0) >= Q && xu.push({
        month: G.month,
        growth: Math.round(G.g),
        deviation: Math.round(k0),
        direction: k0 > 0 ? "spike" : "drop"
      })
    }
  }
  const Fu = 12 / j0,
    vu = Math.round(Y0 * Fu),
    mu = Math.round(I0 * Fu),
    zu = mu - vu,
    s0 = {
      Lab: {
        label: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
        icon: "\u{1F9EA}",
        color: "#2563eb",
        share: x0.lab,
        shareFY1: S0.lab,
        unit: y0.Lab,
        absPx: Y.Lab.absPx,
        ordG: Y.Lab.ord,
        pxG: Y.Lab.px
      },
      Drug: {
        label: "Drug (\u0E22\u0E32)",
        icon: "\u{1F48A}",
        color: "#16a34a",
        share: x0.drug,
        shareFY1: S0.drug,
        unit: y0.Drug,
        absPx: Y.Drug.absPx,
        ordG: Y.Drug.ord,
        pxG: Y.Drug.px
      },
      Xray: {
        label: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35)",
        icon: "\u{1FA7B}",
        color: "#db2777",
        share: x0.xray,
        shareFY1: S0.xray,
        unit: y0.Xray,
        absPx: Y.Xray.absPx,
        ordG: Y.Xray.ord,
        pxG: Y.Xray.px
      }
    },
    Ru = {};
  for (const [Q, G] of Object.entries(s0)) {
    const k0 = $0(G.unit),
      U0 = G.share - G.shareFY1;
    let q0;
    G.pxG >= 5 && G.ordG >= 5 ? q0 = "\u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32" : G.pxG >= 5 && G.ordG < 2 ? q0 = "Value-driven \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19" : G.pxG < 0 && G.ordG > 0 ? q0 = "Margin Compression \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14" : G.pxG < -3 && G.ordG < 0 ? q0 = "\u0E2B\u0E14\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E21\u0E34\u0E15\u0E34" : q0 = "\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E43\u0E19\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1B\u0E01\u0E15\u0E34", Ru[Q] = {
      label: G.label,
      icon: G.icon,
      color: G.color,
      share: G.share.toFixed(1),
      share_delta: U0.toFixed(1),
      ord_growth: G.ordG,
      px_growth: G.pxG,
      unit_fy2: Math.round(G.unit.f2),
      unit_growth: k0,
      abs_px: G.absPx,
      driver: q0,
      narrative: `${G.label}: \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${G.ordG>=0?"+":""}${G.ordG}% \xB7 \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 ${G.pxG>=0?"+":""}${G.pxG}% (${G.absPx>=0?"+":""}${l(Math.abs(G.absPx))} \u0E1A\u0E32\u0E17) \xB7 \u0E23\u0E32\u0E04\u0E32/\u0E04\u0E23\u0E31\u0E49\u0E07 \u0E3F${l(Math.round(G.unit.f2))} (${k0>=0?"\u2191":"\u2193"}${Math.abs(k0)}%) \xB7 \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 ${G.share.toFixed(1)}% (${U0>=0?"+":""}${U0.toFixed(1)} \u0E08\u0E38\u0E14) \u2014 ${q0}`
    }
  }
  let e0;
  const Lu = m0 - c0,
    au = `${p0>=0?"+":"\u2212"}\u0E3F${l(Math.abs(p0))}`;
  m0 >= 10 && c0 >= 10 ? e0 = `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${S.short} \u0E1B\u0E35\u0E07\u0E1A ${M} \u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27\u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 +${m0}% (${au}) \u0E08\u0E32\u0E01\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${c0}% (${j0} \u0E40\u0E14\u0E37\u0E2D\u0E19) \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E17\u0E31\u0E49\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19` : m0 >= 5 && Lu >= 5 ? e0 = `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${S.short} +${m0}% (${au}) \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (${c0}%) \u2014 Yield \u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Complexity / \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A Unit Price \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E22\u0E31\u0E48\u0E07\u0E22\u0E37\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E25\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27` : c0 > 5 && m0 < 0 ? e0 = `\u26A0 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 Margin Compression \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${c0}% \u0E41\u0E15\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${m0}% (${au}) \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14\u0E14\u0E31\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E23\u0E48\u0E07\u0E17\u0E1A\u0E17\u0E27\u0E19 ${S.pricePressure}` : m0 <= -5 && c0 <= 0 ? e0 = `\u26A0 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${S.short} \u0E2B\u0E14\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E21\u0E34\u0E15\u0E34 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${c0}% \u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${m0}% (${au}) \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause \u0E14\u0E48\u0E27\u0E19 (${S.rootCause})` : e0 = `\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${S.short} ${m0>=0?"\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15":"\u0E2B\u0E14\u0E15\u0E31\u0E27"} ${Math.abs(m0)}% \u0E40\u0E0A\u0E34\u0E07\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (${au}) \xB7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${c0>=0?"+":""}${c0}% \xB7 Yield ${eu>=0?"+":""}${eu.toFixed(1)}pp \xB7 \u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 ${j0} \u0E40\u0E14\u0E37\u0E2D\u0E19`;
  const ku = Math.round(I0 / j0),
    h0 = `Run-rate \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${l(ku)} \u0E1A\u0E32\u0E17/\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E2B\u0E32\u0E01\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E44\u0E14\u0E49\u0E04\u0E23\u0E1A\u0E1B\u0E35 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${S.short} \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E44\u0E27\u0E49\u0E17\u0E35\u0E48 ${l(mu)} \u0E1A\u0E32\u0E17 (\u0E40\u0E17\u0E35\u0E22\u0E1A FY${f0} annualized: ${l(vu)} \u0E1A\u0E32\u0E17 \xB7 ${zu>=0?"\u0E1A\u0E27\u0E01":"\u0E25\u0E1A"} ${l(Math.abs(zu))} \u0E1A\u0E32\u0E17)`,
    Tu = `\u0E1B\u0E35\u0E07\u0E1A ${M} \u0E21\u0E35\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E23\u0E27\u0E21 ${l(G0)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u0E1B\u0E35\u0E07\u0E1A ${f0}: ${l(Eu)} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 ${C0>=0?"+":""}${l(Math.abs(C0))} \u0E04\u0E23\u0E31\u0E49\u0E07 / ${c0>=0?"+":""}${c0}%) \u0E2A\u0E48\u0E27\u0E19\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E23\u0E27\u0E21 ${l(I0)} \u0E1A\u0E32\u0E17 (\u0E1B\u0E35\u0E07\u0E1A ${f0}: ${l(Y0)} \u0E1A\u0E32\u0E17 \xB7 ${p0>=0?"+":""}${l(Math.abs(p0))} \u0E1A\u0E32\u0E17 / ${m0>=0?"+":""}${m0}%). Yield Gap = ${eu>=0?"+":""}${eu.toFixed(1)} percentage points \u2014 ` + (m0 > c0 + 2 ? "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19, \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E22\u0E32/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E21\u0E35\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19. " : m0 < c0 - 2 ? "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E48\u0E33\u0E25\u0E07 \u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 Generic Substitution, \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D Case Mix \u0E2D\u0E48\u0E2D\u0E19\u0E25\u0E07. " : "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32. ") + h0,
    g0 = `\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E35\u0E07\u0E1A ${M}: Drug ${x0.drug.toFixed(1)}% \xB7 Lab ${x0.lab.toFixed(1)}% \xB7 CT/X-ray ${x0.xray.toFixed(1)}% (\u0E1B\u0E35\u0E07\u0E1A ${f0}: ${S0.drug.toFixed(1)}% / ${S0.lab.toFixed(1)}% / ${S0.xray.toFixed(1)}%). Growth Driver \u0E2B\u0E25\u0E31\u0E01\u0E04\u0E37\u0E2D ${v0.name} (+${v0.g}%) \xB7 \u0E2B\u0E21\u0E27\u0E14\u0E2D\u0E48\u0E2D\u0E19\u0E41\u0E23\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14\u0E04\u0E37\u0E2D ${ou.name} (${ou.g>=0?"+":""}${ou.g}%). HHI = ${l(J)} (${tu.text}) \u2014 ` + (Math.abs(x0.drug - S0.drug) >= 3 ? `\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Drug ${x0.drug>S0.drug?"\u0E02\u0E22\u0E31\u0E1A\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(x0.drug-S0.drug).toFixed(1)} \u0E08\u0E38\u0E14 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E44\u0E1B\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D` : "Portfolio \u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D"),
    Mu = A0 === "IPD" ? "\u0E0A\u0E48\u0E27\u0E22\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 Ward / DRG \u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Cost per Admission" : "\u0E0A\u0E48\u0E27\u0E22\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Cost Control",
    Du = `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07 \u0E1B\u0E35\u0E07\u0E1A ${M}: Lab \u0E3F${l(Math.round(y0.Lab.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${$0(y0.Lab)>=0?"\u2191":"\u2193"}${Math.abs($0(y0.Lab))}% \xB7 FY${f0}: \u0E3F${l(Math.round(y0.Lab.f1))}) \xB7 Drug \u0E3F${l(Math.round(y0.Drug.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${$0(y0.Drug)>=0?"\u2191":"\u2193"}${Math.abs($0(y0.Drug))}% \xB7 FY${f0}: \u0E3F${l(Math.round(y0.Drug.f1))}) \xB7 CT/X-ray \u0E3F${l(Math.round(y0.Xray.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${$0(y0.Xray)>=0?"\u2191":"\u2193"}${Math.abs($0(y0.Xray))}% \xB7 FY${f0}: \u0E3F${l(Math.round(y0.Xray.f1))}) \u2014 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E19\u0E35\u0E49\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Complexity \u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E23\u0E34\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${Mu}. ` + (y0.Drug.f2 > y0.Drug.f1 * 1.1 ? "Drug Unit Price \u0E1E\u0E38\u0E48\u0E07\u0E40\u0E01\u0E34\u0E19 10% \u2014 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A High-cost Drug List. " : "") + (y0.Xray.f2 > y0.Xray.f1 * 1.1 ? "Imaging Unit Price \u0E1E\u0E38\u0E48\u0E07\u0E40\u0E01\u0E34\u0E19 10% \u2014 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49 CT/MRI \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19. " : "");
  let Wu;
  if (b0 && Q0) {
    const Q = Math.round(l0 - R0);
    Wu = `\u0E40\u0E14\u0E37\u0E2D\u0E19 Peak: ${b0} (${l0>=0?"+":""}${Math.round(l0)}%) \xB7 \u0E40\u0E14\u0E37\u0E2D\u0E19 Dip: ${Q0} (${R0>=0?"+":""}${Math.round(R0)}%) \xB7 Spread = ${Q} percentage points. ` + (Q >= 40 ? "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E2A\u0E39\u0E07 \u2014 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1E\u0E35\u0E04\u0E41\u0E25\u0E30\u0E14\u0E34\u0E1B\u0E21\u0E32\u0E01 \u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23 Staffing, Stock, Capacity \u0E41\u0E1A\u0E1A\u0E22\u0E37\u0E14\u0E2B\u0E22\u0E38\u0E48\u0E19" : Q >= 20 ? "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u2014 \u0E21\u0E35 Seasonality \u0E41\u0E15\u0E48\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E44\u0E14\u0E49" : "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E15\u0E48\u0E33 \u2014 Demand \u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D")
  } else Wu = "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Seasonality";
  const O0 = [];
  if (c0 > 10 && m0 < 0 && O0.push(`\u{1F534} Margin Compression: \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${c0}% \u0E41\u0E15\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${m0}% (${au}) \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14\u0E14\u0E31\u0E19 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Price List / Discount Policy / Insurance Reimbursement Rate`), m0 >= 15 && c0 <= 3 && O0.push(`\u{1F7E0} Single-source Growth: \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E42\u0E15\u0E08\u0E32\u0E01 Unit Price \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01 (+${m0}% vs +${c0}% volume) \u2014 \u0E40\u0E1B\u0E23\u0E32\u0E30\u0E1A\u0E32\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E22\u0E32/\u0E23\u0E35\u0E40\u0E2D\u0E40\u0E08\u0E19\u0E15\u0E4C/\u0E2D\u0E31\u0E15\u0E23\u0E32 \u0E2A\u0E1B\u0E2A\u0E0A. \u0E43\u0E19\u0E1B\u0E35\u0E16\u0E31\u0E14\u0E44\u0E1B`), (Y.Drug.ord > 20 || Y.Drug.px > 20) && O0.push(`\u{1F534} Drug Utilization \u0E1E\u0E38\u0E48\u0E07 (+${Y.Drug.ord}% orders / +${Y.Drug.px}% value \xB7 ${Y.Drug.absPx>=0?"+":""}\u0E3F${l(Math.abs(Y.Drug.absPx))}) \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Polypharmacy, \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49 \u0E41\u0E25\u0E30 Formulary Compliance`), Y.Xray.ord > 15 && Y.Xray.ord > c0 * 1.5 + 5 && O0.push(`\u{1F7E0} Imaging \u0E42\u0E15\u0E40\u0E23\u0E47\u0E27\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21 (+${Y.Xray.ord}% vs ${c0}%) \u2014 \u0E23\u0E30\u0E27\u0E31\u0E07 Defensive Medicine / Over-ordering \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Guideline`), m0 < -10 && O0.push(`\u{1F534} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${S.short} \u0E2B\u0E14\u0E15\u0E31\u0E27 ${m0}% (${au}) \u2014 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 ${S.rootCause} \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19\u0E14\u0E48\u0E27\u0E19`), Math.max(x0.drug, x0.lab, x0.xray) > 70) {
    const Q = x0.drug >= x0.lab && x0.drug >= x0.xray ? "Drug" : x0.lab >= x0.xray ? "Lab" : "CT/X-ray";
    O0.push(`\u{1F7E0} Concentration Risk: \u0E2B\u0E21\u0E27\u0E14 ${Q} \u0E04\u0E23\u0E2D\u0E07\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E19 70% (HHI=${l(J)}) \u2014 \u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E2B\u0E32\u0E01\u0E40\u0E01\u0E34\u0E14 Supply Disruption \u0E08\u0E30\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35`)
  }
  if (u0 >= 30 && O0.push(`\u{1F7E0} Volatility \u0E2A\u0E39\u0E07 (SD=${u0}%) \u2014 \u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Inventory \u0E41\u0E25\u0E30 Staffing \u0E22\u0E32\u0E01 \u0E04\u0E27\u0E23\u0E43\u0E0A\u0E49 Safety Stock \u0E17\u0E35\u0E48\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19`), xu.length > 0) {
    const Q = xu.slice(0, 2).map(G => `${G.month} (${G.growth>=0?"+":""}${G.growth}%)`).join(", ");
    O0.push(`\u{1F7E1} \u0E1E\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19 Outlier ${xu.length} \u0E40\u0E14\u0E37\u0E2D\u0E19: ${Q}${xu.length>2?"\u2026":""} \u2014 \u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E40\u0E0A\u0E34\u0E07 Root Cause (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01, \u0E22\u0E32\u0E02\u0E32\u0E14, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, \u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1E\u0E34\u0E40\u0E28\u0E29)`)
  }
  V0 && V0.direction === "decelerating" && O0.push(`\u{1F7E1} Momentum \u0E0A\u0E30\u0E25\u0E2D\u0E15\u0E31\u0E27 \u2014 \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07 (${V0.h2_label}) \u0E42\u0E15 ${V0.h2_growth}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 (${V0.h1_label}) ${V0.h1_growth}% \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07 ${V0.accel}pp \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E23\u0E34\u0E48\u0E21\u0E0A\u0E30\u0E25\u0E2D`), O0.length === 0 && O0.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E41\u0E25\u0E30\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01");
  const Nu = A0 === "IPD" ? "Cost-per-admission \xB7 Order-per-admission \xB7 Yield-per-DRG" : "Cost-per-visit \xB7 Order-per-visit \xB7 Yield-per-order",
    z0 = A0 === "IPD" ? "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21 Ward / DRG" : "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04",
    Ou = A0 === "IPD" ? 65 : 55,
    N0 = [];
  m0 > 5 ? N0.push(`\u{1F535} P1 \xB7 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30 Supply Chain \u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15 +${m0}% \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2B\u0E21\u0E27\u0E14 ${v0.name} \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E1B\u0E47\u0E19 Growth Driver \u0E2B\u0E25\u0E31\u0E01`) : m0 < -3 && N0.push(`\u{1F534} P0 \xB7 \u0E08\u0E31\u0E14\u0E15\u0E31\u0E49\u0E07 Task Force \u0E1F\u0E37\u0E49\u0E19\u0E1F\u0E39\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${S.short} (${m0}% \xB7 ${au}) \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Root Cause ${z0} \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19`);
  const Iu = Y.Lab.ord > 15 ? "Lab" : Y.Xray.ord > 15 ? "CT/X-ray" : Y.Drug.ord > 15 ? "Drug" : null;
  return Iu && N0.push(`\u{1F7E1} P2 \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Ordering Protocol \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${Iu} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E38\u0E21 Unnecessary Ordering \u0E41\u0E25\u0E30\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E15\u0E48\u0E2D${A0==="IPD"?"admission":"visit"} (\u0E04\u0E32\u0E14\u0E25\u0E14\u0E44\u0E14\u0E49 5\u201310%)`), b0 && N0.push(`\u{1F535} P1 \xB7 \u0E0A\u0E48\u0E27\u0E07 ${b0} \u0E04\u0E37\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19 Peak Demand \u2014 ${S.peakPlan} \u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 30\u201360 \u0E27\u0E31\u0E19`), u0 >= 20 && N0.push(`\u{1F7E1} P2 \xB7 Volatility \u0E2A\u0E39\u0E07 (SD=${u0}%) \u2014 \u0E1B\u0E23\u0E31\u0E1A Safety Stock \u0E41\u0E25\u0E30 Flexible Staffing Model \u0E40\u0E0A\u0E48\u0E19 On-call pool \u0E2B\u0E23\u0E37\u0E2D Agency staff`), V0 && V0.direction === "decelerating" && m0 > 0 && N0.push(`\u{1F7E1} P2 \xB7 Momentum \u0E0A\u0E30\u0E25\u0E2D (${V0.accel}pp) \u2014 \u0E17\u0E33 Quick Win \u0E43\u0E19\u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E35\u0E07\u0E1A ${A0==="IPD"?"\u0E40\u0E0A\u0E48\u0E19 Enhance Admission pathway, \u0E25\u0E14 AMA/DAMA":"\u0E40\u0E0A\u0E48\u0E19 Campaign \u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07, Chronic Care Follow-up"}`), N0.push(`\u{1F535} P1 \xB7 \u0E2A\u0E23\u0E49\u0E32\u0E07 Executive KPI Dashboard \u0E23\u0E32\u0E22 3 \u0E40\u0E14\u0E37\u0E2D\u0E19: ${Nu} ${z0}`), (Y.Drug.px > 15 || x0.drug > Ou) && N0.push("\u{1F534} P0 \xB7 \u0E15\u0E31\u0E49\u0E07 Pharmacy & Therapeutics Committee \u0E17\u0E1A\u0E17\u0E27\u0E19 High-cost Drug List \u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21 Generic Substitution \u0E41\u0E25\u0E30 Therapeutic Interchange"), Y.Xray.ord > 15 && N0.push(`\u{1F7E1} P2 \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32 Clinical Decision Support \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07 CT/X-ray ${S.imagingNote} (\u0E04\u0E32\u0E14\u0E25\u0E14 Inappropriate Imaging 10\u201320%)`), J >= 5e3 && N0.push(`\u{1F7E1} P2 \xB7 HHI=${l(J)} \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u2014 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Diversification \u0E02\u0E2D\u0E07 Service Portfolio \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E0A\u0E34\u0E07 Operational`), {
    headline: e0,
    kpi: {
      orders_growth_pct: c0,
      price_growth_pct: m0,
      orders_abs_diff: C0,
      price_abs_diff: p0,
      yield_delta: eu,
      volatility: u0,
      vol_level: gu,
      hhi: J,
      hhi_level: tu,
      comparable_months: j0,
      annualized_fy1: vu,
      annualized_fy2: mu,
      annualized_gap: zu,
      avg_monthly_px: ku
    },
    trend_analysis: Tu,
    momentum: V0,
    mix_insight: g0,
    unit_economics: Du,
    seasonal_insight: Wu,
    anomalies: xu,
    deep_dive: Ru,
    risks: O0,
    recommendations: N0,
    meta: {
      comparable_months: j0,
      fy1: f0,
      fy2: M
    }
  }
}

function hu({
  icon: n,
  title: f0,
  text: M,
  list: A0,
  color: S = "#7c3aed"
}) {
  return u.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderLeft: `3px solid ${S}`,
      borderRadius: "10px",
      padding: "14px 16px"
    },
    children: [u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px"
      },
      children: [u.jsx("span", {
        style: {
          fontSize: "16px"
        },
        children: n
      }), u.jsx("span", {
        style: {
          fontWeight: 800,
          fontSize: "12px",
          color: "var(--md-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        },
        children: f0
      })]
    }), M && u.jsx("p", {
      style: {
        fontSize: "13px",
        color: "var(--md-text-primary)",
        lineHeight: 1.7,
        margin: 0,
        fontWeight: 500
      },
      children: M
    }), A0 && u.jsx("ul", {
      style: {
        margin: "4px 0 0 0",
        paddingLeft: "18px"
      },
      children: A0.map((i0, E0) => u.jsx("li", {
        style: {
          fontSize: "13px",
          color: "var(--md-text-primary)",
          lineHeight: 1.7,
          fontWeight: 500,
          marginBottom: "3px"
        },
        children: i0
      }, E0))
    })]
  })
}

function wu({
  label: n,
  value: f0,
  sub: M,
  color: A0 = "#7c3aed",
  accent: S
}) {
  return u.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderTop: `3px solid ${A0}`,
      borderRadius: "10px",
      padding: "10px 12px",
      minWidth: 0
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
      children: n
    }), u.jsx("div", {
      style: {
        fontSize: "17px",
        fontWeight: 900,
        color: S || A0,
        lineHeight: 1.1
      },
      children: f0
    }), M && u.jsx("div", {
      style: {
        fontSize: "11px",
        color: "var(--md-text-tertiary)",
        marginTop: "3px",
        fontWeight: 600
      },
      children: M
    })]
  })
}

function Vu({
  item: n
}) {
  return u.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderTop: `3px solid ${n.color}`,
      borderRadius: "10px",
      padding: "14px"
    },
    children: [u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "10px"
      },
      children: [u.jsx("span", {
        style: {
          fontSize: "18px"
        },
        children: n.icon
      }), u.jsx("span", {
        style: {
          fontWeight: 900,
          fontSize: "13px",
          color: n.color
        },
        children: n.label
      })]
    }), u.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "6px",
        marginBottom: "10px"
      },
      children: [u.jsx("div", {
        style: {
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 700
        },
        children: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13"
      }), u.jsxs("div", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: n.ord_growth >= 0 ? "#16a34a" : "#dc2626",
          textAlign: "right"
        },
        children: [n.ord_growth >= 0 ? "+" : "", n.ord_growth, "%"]
      }), u.jsx("div", {
        style: {
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 700
        },
        children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32"
      }), u.jsxs("div", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: n.px_growth >= 0 ? "#16a34a" : "#dc2626",
          textAlign: "right"
        },
        children: [n.px_growth >= 0 ? "+" : "", n.px_growth, "%"]
      }), u.jsx("div", {
        style: {
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 700
        },
        children: "\u0E23\u0E32\u0E04\u0E32/\u0E04\u0E23\u0E31\u0E49\u0E07"
      }), u.jsxs("div", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          textAlign: "right"
        },
        children: ["\u0E3F", l(n.unit_fy2), " ", u.jsxs("span", {
          style: {
            fontSize: "11px",
            color: n.unit_growth >= 0 ? "#16a34a" : "#dc2626"
          },
          children: ["(", n.unit_growth >= 0 ? "\u2191" : "\u2193", Math.abs(n.unit_growth), "%)"]
        })]
      }), u.jsx("div", {
        style: {
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 700
        },
        children: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19"
      }), u.jsxs("div", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          textAlign: "right"
        },
        children: [n.share, "% ", u.jsxs("span", {
          style: {
            fontSize: "11px",
            color: Number(n.share_delta) >= 0 ? "#16a34a" : "#dc2626"
          },
          children: ["(", Number(n.share_delta) >= 0 ? "+" : "", n.share_delta, "pp)"]
        })]
      })]
    }), u.jsx("div", {
      style: {
        padding: "8px 10px",
        background: `${n.color}14`,
        borderLeft: `2px solid ${n.color}`,
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: 600,
        color: "var(--md-text-primary)",
        lineHeight: 1.5
      },
      children: n.driver
    })]
  })
}

function lE({
  data: n,
  fy1: f0,
  fy2: M,
  level: A0 = "OPD"
}) {
  const S = Z.useMemo(() => BE(n, f0, M, A0), [n, f0, M, A0]);
  if (!S) return null;
  const i0 = A0 === "IPD" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01",
    E0 = A0 === "IPD" ? "linear-gradient(135deg, rgba(219,39,119,.08), rgba(251,146,60,.05))" : "linear-gradient(135deg, rgba(124,58,237,.08), rgba(14,165,233,.05))";
  return u.jsxs("div", {
    className: "rounded-2xl overflow-hidden",
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      boxShadow: "var(--md-shadow-sm)",
      marginTop: "16px"
    },
    children: [u.jsxs("div", {
      style: {
        padding: "14px 20px",
        borderBottom: "1px solid var(--md-border)",
        background: E0,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [u.jsx("span", {
        style: {
          fontSize: "18px"
        },
        children: "\u{1F9E0}"
      }), u.jsxs("div", {
        style: {
          flex: 1,
          minWidth: 0
        },
        children: [u.jsxs("div", {
          style: {
            fontSize: "14px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: ["AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23", i0, " (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)"]
        }), u.jsx("div", {
          style: {
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            marginTop: "2px"
          },
          children: "Executive Qualitative Analysis \xB7 KPI \xB7 Trend \xB7 Momentum \xB7 Mix \xB7 Unit Econ \xB7 Volatility \xB7 Anomaly \xB7 Deep-Dive \xB7 Projection \xB7 Risks \xB7 Recommendations"
        })]
      }), u.jsx("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(124,58,237,.1)",
          color: "#7c3aed",
          border: "1px solid rgba(124,58,237,.25)"
        },
        children: "\u{1F4D0} Rule-based Analysis \xB7 12 dimensions"
      })]
    }), u.jsx("div", {
      style: {
        padding: "18px 20px"
      },
      children: S.empty ? u.jsx("div", {
        style: {
          padding: "14px 16px",
          background: "rgba(251,191,36,.08)",
          borderLeft: "3px solid #f59e0b",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--md-text-primary)"
        },
        children: S.headline
      }) : u.jsxs(u.Fragment, {
        children: [u.jsx("div", {
          style: {
            padding: "14px 16px",
            background: "rgba(124,58,237,.08)",
            borderLeft: "3px solid #7c3aed",
            borderRadius: "10px",
            marginBottom: "14px",
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--md-text-primary)",
            lineHeight: 1.6
          },
          children: S.headline
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "8px",
            marginBottom: "14px"
          },
          children: [u.jsx(wu, {
            label: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 Orders",
            value: `${S.kpi.orders_growth_pct>=0?"+":""}${S.kpi.orders_growth_pct}%`,
            sub: `${S.kpi.orders_abs_diff>=0?"+":""}${l(Math.abs(S.kpi.orders_abs_diff))} \u0E04\u0E23\u0E31\u0E49\u0E07`,
            color: S.kpi.orders_growth_pct >= 0 ? "#16a34a" : "#dc2626"
          }), u.jsx(wu, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Revenue",
            value: `${S.kpi.price_growth_pct>=0?"+":""}${S.kpi.price_growth_pct}%`,
            sub: `${S.kpi.price_abs_diff>=0?"+":""}\u0E3F${l(Math.abs(S.kpi.price_abs_diff))}`,
            color: S.kpi.price_growth_pct >= 0 ? "#16a34a" : "#dc2626"
          }), u.jsx(wu, {
            label: "Yield Delta",
            value: `${S.kpi.yield_delta>=0?"+":""}${S.kpi.yield_delta.toFixed(1)}pp`,
            sub: S.kpi.yield_delta >= 2 ? "Case Mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19" : S.kpi.yield_delta <= -2 ? "Margin \u0E16\u0E39\u0E01\u0E01\u0E14" : "\u0E2A\u0E21\u0E14\u0E38\u0E25",
            color: "#7c3aed"
          }), u.jsx(wu, {
            label: "Volatility (SD)",
            value: `${S.kpi.volatility}%`,
            sub: S.kpi.vol_level.text,
            color: S.kpi.vol_level.color,
            accent: S.kpi.vol_level.color
          }), u.jsx(wu, {
            label: "Concentration (HHI)",
            value: l(S.kpi.hhi),
            sub: S.kpi.hhi_level.text,
            color: S.kpi.hhi_level.color,
            accent: S.kpi.hhi_level.color
          }), u.jsx(wu, {
            label: `Run-rate ${M}`,
            value: `\u0E3F${l(S.kpi.avg_monthly_px)}/\u0E14.`,
            sub: `\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E35 \u0E3F${l(S.kpi.annualized_fy2)}`,
            color: "#0ea5e9"
          })]
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
            marginBottom: "10px"
          },
          children: [u.jsx(hu, {
            icon: "\u{1F4CA}",
            title: "Trend Analysis",
            text: S.trend_analysis,
            color: "#7c3aed"
          }), u.jsx(hu, {
            icon: "\u{1F9E9}",
            title: "Resource Mix & Growth Driver",
            text: S.mix_insight,
            color: "#0ea5e9"
          })]
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
            marginBottom: "10px"
          },
          children: [S.momentum ? u.jsx(hu, {
            icon: "\u{1F680}",
            title: "Momentum & Acceleration",
            text: `\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 (${S.momentum.h1_label}): ${S.momentum.h1_growth>=0?"+":""}${S.momentum.h1_growth}% \xB7 \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07 (${S.momentum.h2_label}): ${S.momentum.h2_growth>=0?"+":""}${S.momentum.h2_growth}% \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07 ${S.momentum.accel>=0?"+":""}${S.momentum.accel}pp \u2014 ${S.momentum.direction==="accelerating"?"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E23\u0E48\u0E07\u0E15\u0E31\u0E27 \u2014 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E1A\u0E27\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Q3\u2013Q4 \u0E02\u0E2D\u0E07\u0E1B\u0E35\u0E07\u0E1A":S.momentum.direction==="decelerating"?"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E30\u0E25\u0E2D \u2014 \u0E04\u0E27\u0E23\u0E17\u0E33 Quick Win \u0E41\u0E25\u0E30 Mid-year Review":"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E04\u0E07\u0E17\u0E35\u0E48 \u2014 \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E44\u0E14\u0E49"}`,
            color: S.momentum.direction === "accelerating" ? "#10b981" : S.momentum.direction === "decelerating" ? "#f59e0b" : "#0ea5e9"
          }) : u.jsx(hu, {
            icon: "\u{1F680}",
            title: "Momentum & Acceleration",
            text: "\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 4 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E33\u0E19\u0E27\u0E13 Momentum",
            color: "#94a3b8"
          }), u.jsx(hu, {
            icon: "\u{1F4A0}",
            title: "Unit Economics (\u0E1A\u0E32\u0E17/\u0E04\u0E23\u0E31\u0E49\u0E07)",
            text: S.unit_economics,
            color: "#0d9488"
          })]
        }), u.jsxs("div", {
          style: {
            marginBottom: "10px"
          },
          children: [u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 800,
              color: "var(--md-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            },
            children: [u.jsx("span", {
              children: "\u{1F52C}"
            }), " Category Deep-Dive"]
          }), u.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "10px"
            },
            children: [u.jsx(Vu, {
              item: S.deep_dive.Lab
            }), u.jsx(Vu, {
              item: S.deep_dive.Drug
            }), u.jsx(Vu, {
              item: S.deep_dive.Xray
            })]
          })]
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
            marginBottom: "10px"
          },
          children: [u.jsx(hu, {
            icon: "\u{1F5D3}\uFE0F",
            title: "Seasonal Pattern",
            text: S.seasonal_insight,
            color: "#8b5cf6"
          }), u.jsx(hu, {
            icon: "\u{1F3AF}",
            title: "Anomaly Detection",
            text: S.anomalies.length === 0 ? "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19 Outlier \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C (threshold = 1.5 \xD7 SD). \u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u2014 \u0E23\u0E30\u0E1A\u0E1A Inventory/Staffing \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33" : `\u0E1E\u0E1A ${S.anomalies.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E1A\u0E19\u0E08\u0E32\u0E01 Trend \u0E40\u0E01\u0E34\u0E19 1.5 \xD7 SD: ${S.anomalies.map(j0=>`${j0.month} (${j0.direction==="spike"?"\u25B2":"\u25BC"}${j0.growth>=0?"+":""}${j0.growth}%)`).join(" \xB7 ")} \u2014 \u0E04\u0E27\u0E23\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause \u0E40\u0E0A\u0E34\u0E07 Operational (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32, \u0E22\u0E32\u0E02\u0E32\u0E14, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, Outbreak)`,
            color: S.anomalies.length === 0 ? "#10b981" : "#f59e0b"
          })]
        }), u.jsx("div", {
          style: {
            marginBottom: "10px"
          },
          children: u.jsx(hu, {
            icon: "\u{1F4C8}",
            title: "Financial Projection \u2014 Annualized Outlook",
            text: `\u0E08\u0E32\u0E01 Run-rate ${S.kpi.comparable_months} \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Annualized FY${M}: \u0E3F${l(S.kpi.annualized_fy2)} \u0E1A\u0E32\u0E17 \xB7 Annualized FY${f0}: \u0E3F${l(S.kpi.annualized_fy1)} \u0E1A\u0E32\u0E17 \xB7 Gap = ${S.kpi.annualized_gap>=0?"+":"\u2212"}\u0E3F${l(Math.abs(S.kpi.annualized_gap))} \u0E1A\u0E32\u0E17. ${S.kpi.annualized_gap>=0?"\u0E2B\u0E32\u0E01\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E44\u0E14\u0E49\u0E04\u0E23\u0E1A\u0E1B\u0E35 \u0E08\u0E30\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19":"\u0E2B\u0E32\u0E01\u0E22\u0E31\u0E07\u0E04\u0E07\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E15\u0E48\u0E2D\u0E44\u0E1B \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E35\u0E08\u0E30\u0E2B\u0E14\u0E15\u0E31\u0E27\u0E08\u0E32\u0E01\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"} \u0E02\u0E49\u0E2D\u0E2A\u0E33\u0E04\u0E31\u0E0D: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E41\u0E1A\u0E1A Linear Extrapolation \u2014 \u0E44\u0E21\u0E48\u0E23\u0E27\u0E21 Seasonality adjustment`,
            color: "#0ea5e9"
          })
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px"
          },
          children: [u.jsx(hu, {
            icon: "\u26A0\uFE0F",
            title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 / Red Flags (\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E23\u0E49\u0E2D\u0E19)",
            list: S.risks,
            color: "#f59e0b"
          }), u.jsx(hu, {
            icon: "\u{1F4A1}",
            title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C (\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D P0\u2013P2)",
            list: S.recommendations,
            color: "#10b981"
          })]
        }), u.jsxs("div", {
          style: {
            marginTop: "14px",
            padding: "10px 14px",
            background: "var(--md-surface-2, rgba(0,0,0,.02))",
            borderRadius: "8px",
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "6px"
          },
          children: [u.jsxs("span", {
            children: ["\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25: ", S.meta.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \xB7 \u0E1B\u0E35\u0E07\u0E1A ", S.meta.fy1, " vs ", S.meta.fy2, " \xB7 12 \u0E21\u0E34\u0E15\u0E34\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"]
          }), u.jsx("span", {
            children: "\u26A0 \u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E41\u0E25\u0E30\u0E1A\u0E23\u0E34\u0E1A\u0E17\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21"
          })]
        })]
      })
    })]
  })
}

function jE() {
  const [n, f0] = Z.useState("opd-compare"), [M, A0] = Z.useState(null), [S, i0] = Z.useState(null), [E0, j0] = Z.useState(null), [Eu, Y0] = Z.useState(null), [G0, I0] = Z.useState(null), [c0, m0] = Z.useState(null), [C0, p0] = Z.useState(!0), [eu, a0] = Z.useState(null), Y = Z.useRef(null), [y0, $0] = Z.useState(null), [S0, x0] = Z.useState(null), [J, tu] = Z.useState(null), [v0, ou] = Z.useState(null), [w0, X0] = Z.useState(null), [b0, Q0] = Z.useState(null), [l0, R0] = Z.useState(null), [u0, Au] = Z.useState(null), [gu, V0] = Z.useState(null), xu = new Date, Fu = xu.getMonth() + 1, vu = xu.getFullYear(), mu = Fu >= 10 ? vu + 544 : vu + 543, zu = mu - 1, [s0, Ru] = Z.useState(zu), [e0, Lu] = Z.useState(mu), au = `${vu}-${String(Fu).padStart(2,"0")}-01`, ku = new Date().toISOString().slice(0, 10), [h0, Tu] = Z.useState(au), [g0, Mu] = Z.useState(ku), [Du, Wu] = Z.useState(au), [O0, Nu] = Z.useState(ku), [z0, Ou] = Z.useState(10), N0 = Z.useCallback(e => e ? z0 === "all" ? e : e.slice(0, z0) : [], [z0]), Iu = Z.useMemo(() => N0(S0?.patients), [S0, N0]), Q = Z.useMemo(() => {
    if (!b0?.patients) return null;
    const e = b0.patients,
      t = b0.total_income || 0,
      s = b0.unique_patients || new Set(e.map(o => o.hn)).size,
      w = e.length > 0 ? Math.round(t / e.length) : 0;
    let r = 0,
      c = 0;
    const i = {
        "<40": 0,
        "40-49": 0,
        "50-59": 0,
        "60-69": 0,
        "70+": 0
      },
      y = {},
      h = {},
      A = b0.diseases || ["DM", "HT", "DLP", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD", "Other"],
      _ = Object.fromEntries(A.map(o => [o, 0])),
      z = o => o ? /^E11/.test(o) ? "DM" : /^E78/.test(o) ? "DLP" : o === "I10" ? "HT" : /^I25/.test(o) ? "IHD" : /^I69/.test(o) ? "Stroke" : /^J44/.test(o) ? "COPD" : /^N181/.test(o) ? "CKD1" : /^N182/.test(o) ? "CKD2" : /^N183/.test(o) ? "CKD3" : /^N184/.test(o) ? "CKD4" : /^N18[56]/.test(o) ? "CKD5" : /^N18/.test(o) ? "CKD" : null : null;
    for (const o of e) {
      o.sex === "\u0E0A\u0E32\u0E22" ? r++ : o.sex === "\u0E2B\u0E0D\u0E34\u0E07" && c++;
      const $ = Number(o.age_y) || 0;
      $ < 40 ? i["<40"]++ : $ < 50 ? i["40-49"]++ : $ < 60 ? i["50-59"]++ : $ < 70 ? i["60-69"]++ : i["70+"]++;
      const a = (o.icd_pairs || "").split("||"),
        g = new Set;
      for (const N of a) {
        if (!N) continue;
        const D = N.indexOf("::"),
          C = (D >= 0 ? N.slice(0, D) : N).toUpperCase(),
          U = D >= 0 ? N.slice(D + 2) : "";
        if (!C || !cu.test(C)) continue;
        y[C] || (y[C] = {
          code: C,
          name: U,
          count: 0,
          totalInc: 0
        }), y[C].count++, y[C].totalInc += o.income || 0;
        const j = z(C);
        j && g.add(j)
      }
      o.ckd_stage && /^CKD/.test(o.ckd_stage) && (["CKD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5"].forEach(N => g.delete(N)), g.add(o.ckd_stage)), g.size === 0 && g.add("Other"), g.forEach(N => {
        N in _ && _[N]++
      });
      const b = o.pttype_name || "-";
      h[b] || (h[b] = {
        count: 0,
        income: 0
      }), h[b].count++, h[b].income += o.income || 0
    }
    const k = Math.max(...Object.values(i), 1),
      T = Object.values(y).sort((o, $) => $.count - o.count),
      P = Object.entries(h).sort((o, $) => $[1].count - o[1].count);
    let v = 0,
      F = 0,
      X = 0,
      p = 0;
    for (const o of e) o.ckd_stage && v++, o.ckd_stage && o.egfr != null && (F++, X += o.egfr), (o.ckd_stage === "CKD4" || o.ckd_stage === "CKD5") && p++;
    return {
      pts: e,
      totalIncome: t,
      uniquePatients: s,
      avgIncome: w,
      maleCount: r,
      femaleCount: c,
      ageGroups: i,
      ageMax: k,
      icdMap: y,
      topIcd: T,
      rightList: P,
      ckdCount: v,
      ckdWithEgfrCount: F,
      avgEgfr: F > 0 ? Math.round(X / F) : null,
      advancedCkd: p,
      diseaseCountsFE: _
    }
  }, [b0]), G = Z.useCallback(async () => {
    p0(!0), a0(null);
    try {
      const e = new URLSearchParams({
          start: Du,
          end: O0,
          _t: Date.now()
        }),
        t = await uu(`/api/report/ipd-compare?${e}`, {
          credentials: "include"
        });
      A0(t)
    } catch (e) {
      a0(e.message)
    }
    p0(!1)
  }, [Du, O0]), k0 = Z.useCallback(async () => {
    p0(!0), a0(null);
    try {
      const e = await uu(`/api/report/opd-compare-daterange?start=${h0}&end=${g0}&_t=${Date.now()}`, {
        credentials: "include"
      });
      i0(e)
    } catch (e) {
      a0(e.message)
    }
    p0(!1)
  }, [h0, g0]);
  Z.useCallback(async () => {
    p0(!0), a0(null);
    try {
      const e = await uu(`/api/report/resource-usage?fy1=${s0}&fy2=${e0}&_t=${Date.now()}`, {
        credentials: "include"
      });
      j0(e)
    } catch (e) {
      a0(e.message)
    }
    p0(!1)
  }, [s0, e0]);
  const U0 = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/resource-opd-monthly?fy1=${s0}&fy2=${e0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        Y0(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [s0, e0]),
    q0 = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/resource-ipd-monthly?fy1=${s0}&fy2=${e0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        I0(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [s0, e0]),
    ru = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/mortality-monthly?fy1=${s0}&fy2=${e0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        m0(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [s0, e0]),
    Bu = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/frax-patients?start=${h0}&end=${g0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        x0(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [h0, g0]),
    Su = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/pt-patients?start=${h0}&end=${g0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        tu(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [h0, g0]),
    $u = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/staff-patients?start=${h0}&end=${g0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        tu(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [h0, g0]),
    ju = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/fluoride-patients?start=${h0}&end=${g0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        ou(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [h0, g0]),
    nu = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/elderly-cxr?start=${h0}&end=${g0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        X0(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [h0, g0]),
    lu = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/ncd-patients?start=${h0}&end=${g0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        Q0(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [h0, g0]),
    Hu = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/imaging-services?start=${h0}&end=${g0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        R0(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [h0, g0]),
    Xu = Z.useCallback(async () => {
      p0(!0), a0(null);
      try {
        const e = await uu(`/api/report/pttype-services?from=${h0}&to=${g0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        Au(e)
      } catch (e) {
        a0(e.message)
      }
      p0(!1)
    }, [h0, g0]);
  Z.useEffect(() => {
    n === "ipd-compare" ? G() : n === "opd-compare" ? k0() : n === "resource-opd" ? U0() : n === "resource-ipd" ? q0() : n === "mortality" ? ru() : n === "frax" ? Bu() : n === "pt" ? Su() : n === "fluoride" ? ju() : n === "elderly-cxr" ? nu() : n === "ncd-disease" ? lu() : n === "imaging-services" ? Hu() : n === "pttype-services" ? Xu() : n === "staff-services" && $u()
  }, [n, G, k0, U0, q0, ru, Bu, Su, $u, ju, nu, lu, Hu, Xu]), Z.useEffect(() => {
    const e = setTimeout(() => {
      uu("/api/ai/report/executive-summary", {
        credentials: "include"
      }).then($0).catch(() => {})
    }, 300);
    return () => clearTimeout(e)
  }, []);
  const Uu = Z.useMemo(() => {
      if (!M?.comparison) return "";
      const e = M.comparison.filter(s => s.fy2.has_data).map(s => s.month);
      if (e.length === 0) return "";
      const t = M.fiscal_years?.fy2?.be || e0;
      return `(${e[0]} - ${e[e.length-1]} ${t})`
    }, [M, e0]),
    sE = Z.useCallback(() => {
      const e = Y.current;
      if (!e) return;
      const t = window.open("", "_blank");
      t.document.write(`
      <html><head><title>\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 ${M?.title||`${s0}-${e0}`}</title>
      <style>
        body { font-family: 'Kanit', 'Segoe UI', sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; font-size: 11px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: center; }
        th { font-weight: 700; }
        .header-fy1 { background: #dbeafe; }
        .header-fy2 { background: #fce7f3; }
        .header-growth { background: #dcfce7; }
        .row-total { background: #e0f2fe; font-weight: 800; }
        .negative { color: #dc2626; }
        .positive { color: #16a34a; }
        @media print { body { margin: 0; } }
      </style></head><body>${e.outerHTML}</body></html>
    `), t.document.close(), t.print()
    }, [s0, e0]),
    dE = Z.useCallback(() => {
      const e = (t, s) => {
        const w = t.utils.book_new(),
          r = "Sarabun",
          c = 8,
          i = {
            purpleDark: "7C3AED",
            blue: "2563EB",
            green: "10B981",
            greenDark: "047857",
            greenLight: "D1FAE5",
            amberDark: "B45309",
            amberLight: "FEF3C7",
            red: "DC2626",
            redLight: "FEE2E2",
            slate: "475569",
            slateDark: "1E293B",
            slateLight: "F1F5F9",
            slateSoft: "F8FAFC",
            white: "FFFFFF",
            text: "0F172A",
            muted: "64748B",
            stripe: "FAFBFC"
          },
          y = {
            style: "thin",
            color: {
              rgb: "E2E8F0"
            }
          },
          h = {
            style: "medium",
            color: {
              rgb: "CBD5E1"
            }
          },
          A = {
            top: y,
            bottom: y,
            left: y,
            right: y
          },
          _ = {},
          z = [],
          k = [],
          T = (W, B, L, R) => {
            const H = typeof L == "number" ? "n" : "s";
            _[t.utils.encode_cell({
              r: W,
              c: B
            })] = R ? {
              v: L,
              t: H,
              s: R
            } : {
              v: L,
              t: H
            }
          },
          P = (W, B, L, R) => z.push({
            s: {
              r: W,
              c: B
            },
            e: {
              r: L,
              c: R
            }
          }),
          v = {
            font: {
              name: r,
              sz: 22,
              bold: !0,
              color: {
                rgb: i.white
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: s.themeColor || i.purpleDark
              }
            },
            alignment: {
              horizontal: "center",
              vertical: "center"
            },
            border: {
              top: h,
              bottom: h,
              left: h,
              right: h
            }
          },
          F = {
            font: {
              name: r,
              sz: 11,
              color: {
                rgb: i.white
              },
              italic: !0
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: s.themeColorLight || "6D28D9"
              }
            },
            alignment: {
              horizontal: "center",
              vertical: "center"
            }
          },
          X = {
            font: {
              name: r,
              sz: 9,
              color: {
                rgb: i.muted
              },
              italic: !0
            },
            alignment: {
              horizontal: "right",
              vertical: "center",
              indent: 1
            }
          },
          p = W => ({
            font: {
              name: r,
              sz: 14,
              bold: !0,
              color: {
                rgb: i.white
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: W
              }
            },
            alignment: {
              horizontal: "left",
              vertical: "center",
              indent: 1
            },
            border: {
              bottom: h
            }
          }),
          o = {
            font: {
              name: r,
              sz: 11,
              bold: !0,
              color: {
                rgb: i.slateDark
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: i.slateLight
              }
            },
            alignment: {
              horizontal: "left",
              vertical: "center",
              indent: 2
            },
            border: A
          },
          $ = (W, B) => ({
            font: {
              name: r,
              sz: 18,
              bold: !0,
              color: {
                rgb: W || i.text
              }
            },
            alignment: {
              horizontal: "right",
              vertical: "center",
              indent: 1
            },
            border: A,
            numFmt: B || "#,##0"
          }),
          a = {
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: i.muted
              },
              bold: !0
            },
            alignment: {
              horizontal: "left",
              vertical: "center",
              indent: 1
            },
            border: A,
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: i.slateSoft
              }
            }
          },
          g = {
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: i.muted
              }
            },
            alignment: {
              horizontal: "left",
              vertical: "center",
              wrapText: !0,
              indent: 1
            },
            border: A,
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: i.slateSoft
              }
            }
          },
          b = W => ({
            font: {
              name: r,
              sz: 11,
              bold: !0,
              color: {
                rgb: i.white
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: W
              }
            },
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: !0
            },
            border: A
          }),
          N = (W = {}) => ({
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: i.text
              },
              ...W.font || {}
            },
            alignment: {
              horizontal: W.align || "left",
              vertical: "center",
              wrapText: !!W.wrap,
              indent: W.align === "left" ? 1 : 0
            },
            border: A,
            fill: W.bg ? {
              patternType: "solid",
              fgColor: {
                rgb: W.bg
              }
            } : void 0,
            numFmt: W.numFmt
          });
        let D = 0;
        const C = (W = 12) => {
          k[D] = {
            hpx: W
          }, D++
        };
        if (T(D, 0, `${s.titleEmoji||"\u{1F4CB}"}  ${s.titleText}`, v), P(D, 0, D, c - 1), k[D] = {
            hpx: 56
          }, D++, T(D, 0, `\u{1F4C5}  \u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25:  ${s.dateRange.start}  \u2192  ${s.dateRange.end}    \xB7    \u{1F465}  ${(s.totalCount||0).toLocaleString()} \u0E23\u0E32\u0E22${s.uniqueCount?`  /  ${s.uniqueCount.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33`:""}`, F), P(D, 0, D, c - 1), k[D] = {
            hpx: 28
          }, D++, T(D, 0, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D:  ${new Date().toLocaleString("th-TH")}    \xB7    ${s.dataSource||""}`, X), P(D, 0, D, c - 1), k[D] = {
            hpx: 18
          }, D++, C(8), s.kpis && s.kpis.length) {
          T(D, 0, "\u{1F4CA}  KPI \u0E2A\u0E23\u0E38\u0E1B", p(s.themeColor || i.purpleDark)), P(D, 0, D, c - 1), k[D] = {
            hpx: 32
          }, D++;
          for (const W of s.kpis) T(D, 0, W.label, o), P(D, 0, D, 1), T(D, 2, W.value, $(W.color, W.fmt)), P(D, 2, D, 4), T(D, 5, W.unit || "", a), T(D, 6, W.note || "", g), P(D, 6, D, 7), k[D] = {
            hpx: 32
          }, D++;
          C(12)
        }
        if (s.breakdowns && s.breakdowns.length)
          for (const W of s.breakdowns) {
            if (T(D, 0, `${W.icon||"\u{1F4C8}"}  ${W.title}`, p(W.color)), P(D, 0, D, c - 1), k[D] = {
                hpx: 32
              }, D++, W.headers) {
              const L = W.headerSegs || [
                [0, 0],
                [1, 5],
                [6, 6],
                [7, 7]
              ];
              W.headers.forEach((R, H) => {
                const [q, r0] = L[H] || [H, H];
                T(D, q, R, b(W.color)), q !== r0 && P(D, q, D, r0)
              }), k[D] = {
                hpx: 30
              }, D++
            }
            let B = 0;
            for (const L of W.rows || []) {
              const R = B % 2 === 1 ? i.stripe : void 0,
                H = W.rowSegs || [
                  [0, 0],
                  [1, 5],
                  [6, 6],
                  [7, 7]
                ];
              L.forEach((q, r0) => {
                const [o0, T0] = H[r0] || [r0, r0];
                T(D, o0, q.v, N({
                  align: q.align || (typeof q.v == "number" ? "right" : "left"),
                  numFmt: q.fmt,
                  font: q.font,
                  bg: R,
                  wrap: !!q.wrap
                })), o0 !== T0 && P(D, o0, D, T0)
              }), k[D] = {
                hpx: W.rowHeight || 24
              }, D++, B++
            }
            C(12)
          }
        if (s.insights && s.insights.length) {
          T(D, 0, "\u{1F916}  AI Insights & \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30", p(i.red)), P(D, 0, D, c - 1), k[D] = {
            hpx: 32
          }, D++, T(D, 0, "\u0E23\u0E30\u0E14\u0E31\u0E1A", b(i.red)), T(D, 1, "\u0E2B\u0E21\u0E27\u0E14", b(i.red)), P(D, 1, D, 2), T(D, 3, "\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E1A", b(i.red)), P(D, 3, D, 4), T(D, 5, "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 / Action", b(i.red)), P(D, 5, D, 7), k[D] = {
            hpx: 30
          }, D++;
          const W = {
              critical: 0,
              high: 1,
              med: 2,
              info: 3,
              good: 4,
              low: 3
            },
            B = [...s.insights].sort((R, H) => (W[R.sev] ?? 9) - (W[H.sev] ?? 9)),
            L = {
              critical: {
                label: "\u{1F534} CRITICAL",
                bg: i.redLight,
                fg: i.red
              },
              high: {
                label: "\u{1F7E0} HIGH",
                bg: "FED7AA",
                fg: "C2410C"
              },
              med: {
                label: "\u{1F7E1} MEDIUM",
                bg: i.amberLight,
                fg: i.amberDark
              },
              info: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: i.blue
              },
              good: {
                label: "\u{1F7E2} GOOD",
                bg: i.greenLight,
                fg: i.greenDark
              },
              low: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: i.blue
              }
            };
          for (const R of B) {
            const H = L[R.sev] || L.info;
            T(D, 0, H.label, {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: H.fg
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: H.bg
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: A
            }), T(D, 1, R.cat, {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: i.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: i.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: A
            }), P(D, 1, D, 2), T(D, 3, R.msg, {
              font: {
                name: r,
                sz: 10,
                bold: R.sev === "critical" || R.sev === "high",
                color: {
                  rgb: i.text
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: A,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: H.bg
                }
              }
            }), P(D, 3, D, 4), T(D, 5, R.action, {
              font: {
                name: r,
                sz: 10,
                color: {
                  rgb: i.slateDark
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: A,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: i.slateSoft
                }
              }
            }), P(D, 5, D, 7);
            const q = Math.max(Math.ceil((R.action || "").length / 80), Math.ceil((R.msg || "").length / 40), 2);
            k[D] = {
              hpx: Math.min(120, 22 + q * 16)
            }, D++
          }
          C(12)
        }
        if (s.references && s.references.length) {
          T(D, 0, "\u{1F4DA}  \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38 / \u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07", p(i.muted)), P(D, 0, D, c - 1), k[D] = {
            hpx: 30
          }, D++;
          for (const [W, B] of s.references) {
            const L = W === "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22",
              R = L ? i.greenDark : i.slateDark,
              H = L ? i.greenDark : i.muted,
              q = L ? i.greenLight : i.slateSoft;
            T(D, 0, W, N({
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: R
                }
              },
              align: "left",
              bg: q
            })), P(D, 0, D, 1), T(D, 2, B, N({
              font: {
                sz: L ? 11 : 9,
                bold: L,
                color: {
                  rgb: H
                }
              },
              align: "left",
              wrap: !0,
              bg: q
            })), P(D, 2, D, 7), k[D] = {
              hpx: 36
            }, D++
          }
        }
        _["!ref"] = t.utils.encode_range({
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: D - 1,
            c: c - 1
          }
        }), _["!merges"] = z, _["!cols"] = [{
          wch: 12
        }, {
          wch: 24
        }, {
          wch: 14
        }, {
          wch: 10
        }, {
          wch: 10
        }, {
          wch: 14
        }, {
          wch: 22
        }, {
          wch: 28
        }], _["!rows"] = k, _["!freeze"] = {
          xSplit: 0,
          ySplit: 3
        }, t.utils.book_append_sheet(w, _, "Overview");
        const U = {};
        s.patientHeader.forEach((W, B) => {
          U[t.utils.encode_cell({
            r: 0,
            c: B
          })] = {
            v: W,
            t: "s",
            s: {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: i.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: i.slate
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: !0
              },
              border: A
            }
          }
        });
        const j = s.patientIncomeCols || [];
        s.patientData.forEach((W, B) => {
          const L = B % 2 === 0 ? void 0 : i.stripe;
          W.forEach((R, H) => {
            const q = typeof R == "number",
              r0 = j.includes(H);
            U[t.utils.encode_cell({
              r: B + 1,
              c: H
            })] = {
              v: R,
              t: q ? "n" : "s",
              s: {
                font: {
                  name: r,
                  sz: 9,
                  bold: r0,
                  color: {
                    rgb: r0 ? i.green : i.text
                  }
                },
                alignment: {
                  horizontal: q ? "right" : "left",
                  vertical: "center",
                  wrapText: !1,
                  indent: q ? 0 : 1
                },
                border: A,
                fill: L ? {
                  patternType: "solid",
                  fgColor: {
                    rgb: L
                  }
                } : void 0,
                numFmt: r0 ? "#,##0.00" : q ? "#,##0" : void 0
              }
            }
          })
        }), U["!ref"] = t.utils.encode_range({
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: s.patientData.length,
            c: s.patientHeader.length - 1
          }
        }), U["!cols"] = (s.patientColWidths || s.patientHeader.map(() => 14)).map(W => ({
          wch: W
        })), U["!rows"] = [{
          hpx: 30
        }], U["!freeze"] = {
          xSplit: 0,
          ySplit: 1
        }, t.utils.book_append_sheet(w, U, s.patientSheetName || "Data"), t.writeFile(w, s.filename)
      };
      if (n === "ipd-compare") {
        if (!M?.comparison) return;
        const t = (h, A) => h > 0 ? Math.round((A - h) / h * 100) + "%" : A > 0 ? "100%" : "0%",
          s = M.fiscal_years?.fy1?.label || `\u0E1B\u0E35\u0E07\u0E1A ${s0}`,
          w = M.fiscal_years?.fy2?.label || `\u0E1B\u0E35\u0E07\u0E1A ${e0}`,
          r = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `Admit (${s})`, `D/C (${s})`, "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19", "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07", "\u0E40\u0E15\u0E35\u0E22\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E08\u0E23\u0E34\u0E07", "Sum AdjRW", "CMI", `Admit (${w})`, `D/C (${w})`, "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19", "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07", "\u0E40\u0E15\u0E35\u0E22\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E08\u0E23\u0E34\u0E07", "Sum AdjRW", "CMI", "YoY Admit %", "YoY D/C %", "YoY \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19 %", "YoY ALOS %", "YoY \u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 %", "YoY Active Bed %", "YoY AdjRW %", "YoY CMI %", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 Admit", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 D/C", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19"],
          c = M.comparison.map(h => [h.month, h.fy1.admits, h.fy1.discharges, h.fy1.total_los, h.fy1.alos, h.fy1.occupancy_rate, h.fy1.active_beds, h.fy1.sum_adjrw, h.fy1.cmi, h.fy2.admits, h.fy2.discharges, h.fy2.total_los, h.fy2.alos, h.fy2.occupancy_rate, h.fy2.active_beds, h.fy2.sum_adjrw, h.fy2.cmi, t(h.fy1.admits, h.fy2.admits), t(h.fy1.discharges, h.fy2.discharges), t(h.fy1.total_los, h.fy2.total_los), t(h.fy1.alos, h.fy2.alos), t(h.fy1.occupancy_rate, h.fy2.occupancy_rate), t(h.fy1.active_beds, h.fy2.active_beds), t(h.fy1.sum_adjrw, h.fy2.sum_adjrw), t(h.fy1.cmi, h.fy2.cmi), h.admit_diff, (h.fy2.discharges || 0) - (h.fy1.discharges || 0), h.fy2.total_los - h.fy1.total_los]),
          i = M.fy1_totals,
          y = M.fy2_totals;
        c.push(["\u0E23\u0E27\u0E21", i.admits, i.discharges, i.total_los, i.alos, i.occupancy_rate, i.active_beds, i.sum_adjrw, i.cmi, y.admits, y.discharges, y.total_los, y.alos, y.occupancy_rate, y.active_beds, y.sum_adjrw, y.cmi, t(i.admits, y.admits), t(i.discharges, y.discharges), t(i.total_los, y.total_los), t(i.alos, y.alos), t(i.occupancy_rate, y.occupancy_rate), t(i.active_beds, y.active_beds), t(i.sum_adjrw, y.sum_adjrw), t(i.cmi, y.cmi), M.overall_admit_diff, (y.discharges || 0) - (i.discharges || 0), y.total_los - i.total_los]), du(() => import("./xlsx-BuHXVOW6.js"), []).then(h => {
          const A = [r, ...c],
            _ = h.utils.aoa_to_sheet(A);
          _["!cols"] = r.map((k, T) => {
            const P = Math.max(k.length, ...c.map(v => String(v[T] ?? "").length));
            return {
              wch: Math.min(Math.max(P + 2, 8), 30)
            }
          });
          const z = h.utils.book_new();
          h.utils.book_append_sheet(z, _, "IPD Compare"), h.writeFile(z, `BCH360_IPD_Compare_${Du}_${O0}.xlsx`)
        });
        return
      }
      if (n === "frax") {
        if (!S0?.patients) return;
        const t = S0.patients;
        t.reduce((v, F) => v + (F.income || 0), 0);
        const s = new Set(t.map(v => v.hn)).size,
          w = t.length > 0 ? t.reduce((v, F) => v + (Number(F.major_osteoporotic) || 0), 0) / t.length : 0,
          r = t.length > 0 ? t.reduce((v, F) => v + (Number(F.hip_fracture) || 0), 0) / t.length : 0,
          c = t.filter(v => Number(v.major_osteoporotic) >= 20).length,
          i = t.filter(v => Number(v.hip_fracture) >= 3).length,
          y = t.length > 0 ? Math.round(t.reduce((v, F) => v + (Number(F.age) || 0), 0) / t.length) : 0,
          h = {
            "50-59": 0,
            "60-69": 0,
            "70-79": 0,
            "80+": 0
          };
        t.forEach(v => {
          const F = Number(v.age) || 0;
          F < 60 ? h["50-59"]++ : F < 70 ? h["60-69"]++ : F < 80 ? h["70-79"]++ : h["80+"]++
        });
        const A = {};
        t.forEach(v => {
          const F = v.pttype_name || "-";
          A[F] = (A[F] || 0) + 1
        });
        const _ = Object.entries(A).sort((v, F) => F[1] - v[1]),
          z = [];
        c > 0 && z.push({
          sev: "critical",
          cat: "High Fracture Risk",
          msg: `Major Osteoporotic Risk \u226520%: ${c} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 DEXA scan \u0E41\u0E25\u0E30\u0E40\u0E23\u0E34\u0E48\u0E21\u0E22\u0E32 bisphosphonate`,
          action: "\u0E19\u0E31\u0E14\u0E17\u0E33 Bone Mineral Density (DEXA) \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 Endocrinologist \xB7 vitamin D + calcium supplement \xB7 fall prevention counseling"
        }), i > 0 && z.push({
          sev: "high",
          cat: "Hip Fracture Risk",
          msg: `Hip Fracture Risk \u22653%: ${i} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E2B\u0E31\u0E01 10 \u0E1B\u0E35`,
          action: "Hip protector \xB7 home safety assessment \xB7 physical therapy \xB7 strength + balance training"
        }), w >= 10 && z.push({
          sev: "med",
          cat: "Population Risk",
          msg: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Major Risk = ${w.toFixed(1)}% \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B`,
          action: "\u0E08\u0E31\u0E14 health education \xB7 screening campaign \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A peri/postmenopausal women"
        }), z.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${y} \u0E1B\u0E35 \xB7 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E1E\u0E28\u0E2B\u0E0D\u0E34\u0E07 (FRAX guideline)`,
          action: "continue routine screening for postmenopausal women \xB7 check secondary causes of osteoporosis"
        }), z.push({
          sev: "info",
          cat: "Operational",
          msg: `\u0E23\u0E27\u0E21 ${t.length} \u0E23\u0E32\u0E22 \u0E43\u0E19 ${Math.max(1,Math.ceil((new Date(g0)-new Date(h0))/864e5)+1)} \u0E27\u0E31\u0E19`,
          action: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 DEXA slot \xB7 drug stock \xB7 F/U appointment scheduling"
        });
        const k = [{
            icon: "\u{1F465}",
            title: "\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38",
            color: "F59E0B",
            headers: ["\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38"],
            headerSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rows: Object.entries(h).map(([v, F]) => [{
              v,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: F,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? F / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: v === "80+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14" : v === "70-79" ? "\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "",
              align: "left",
              font: {
                sz: 9,
                color: {
                  rgb: "64748B"
                }
              }
            }])
          }, {
            icon: "\u{1F4B3}",
            title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 10)",
            color: "475569",
            headers: ["\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", ""],
            headerSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rows: _.slice(0, 10).map(([v, F]) => [{
              v,
              align: "left",
              wrap: !0
            }, {
              v: F,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? F / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: "",
              align: "left"
            }])
          }],
          T = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "VN", "HN", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 (kg)", "\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (cm)", "BMI", "Major Osteo. (%)", "Hip Fracture (%)"],
          P = t.map(v => [v.no, v.vn, v.hn, v.cid, v.fullname, v.sex, v.age, v.phone || "", v.vstdate, v.vsttime, v.pttype_name || "", v.weight || "", v.height || "", v.bmi ? Number(v.bmi) : "", v.major_osteoporotic, v.hip_fracture]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(v => v.x), bu([0, 1])).then(v => {
          e(v, {
            filename: `BCH360_FRAX_BoneDensity_${h0}_${g0}.xlsx`,
            titleEmoji: "\u{1F9B4}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19 FRAX Calculator (\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2B\u0E31\u0E01)",
            themeColor: "A855F7",
            themeColorLight: "7C3AED",
            dateRange: {
              start: h0,
              end: g0
            },
            dataSource: "HOSxP XE \xB7 FRAX\xAE WHO Model (Thailand) \xB7 Bone Density",
            totalCount: t.length,
            uniqueCount: s,
            kpis: [{
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19",
              value: t.length,
              unit: "\u0E23\u0E32\u0E22",
              color: "A855F7",
              fmt: "#,##0",
              note: "\u0E19\u0E31\u0E1A visit \u0E17\u0E35\u0E48\u0E17\u0E33 FRAX"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Major Osteoporotic Risk",
              value: Math.round(w * 10) / 10,
              unit: "%",
              color: w >= 20 ? "DC2626" : w >= 10 ? "F59E0B" : "10B981",
              fmt: "0.0",
              note: w >= 20 ? "\u{1F534} \u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01" : w >= 10 ? "\u26A0 \u0E2A\u0E39\u0E07" : "\u2705 \u0E1B\u0E01\u0E15\u0E34"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Hip Fracture Risk",
              value: Math.round(r * 10) / 10,
              unit: "%",
              color: r >= 3 ? "DC2626" : "10B981",
              fmt: "0.0",
              note: r >= 3 ? "\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u2705 \u0E1B\u0E01\u0E15\u0E34"
            }, {
              label: "High-risk (Major \u226520%)",
              value: c,
              unit: "\u0E23\u0E32\u0E22",
              color: c > 0 ? "DC2626" : "10B981",
              fmt: "#,##0",
              note: "\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 DEXA + \u0E40\u0E23\u0E34\u0E48\u0E21\u0E22\u0E32"
            }, {
              label: "High Hip risk (\u22653%)",
              value: i,
              unit: "\u0E23\u0E32\u0E22",
              color: i > 0 ? "DC2626" : "10B981",
              fmt: "#,##0",
              note: "\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E2B\u0E31\u0E01"
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: y,
              unit: "\u0E1B\u0E35",
              color: "7C3AED",
              fmt: "#,##0",
              note: "\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"
            }],
            breakdowns: k,
            insights: z,
            references: [
              ["FRAX Risk Threshold", "Major Osteoporotic \u226520%, Hip Fracture \u22653% \u2192 \u0E40\u0E23\u0E34\u0E48\u0E21\u0E23\u0E31\u0E01\u0E29\u0E32 (Treatment Initiation)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32", "WHO FRAX\xAE Calculator (Thailand model) \xB7 \u0E43\u0E0A\u0E49\u0E43\u0E19 peri/postmenopausal women"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "FRAX",
            patientHeader: T,
            patientData: P,
            patientColWidths: [6, 12, 10, 16, 22, 6, 6, 14, 11, 9, 22, 10, 10, 8, 16, 16],
            patientIncomeCols: []
          })
        });
        return
      }
      if (n === "pt" || n === "staff-services") {
        if (!J?.patients) return;
        const t = J.patients,
          s = t.reduce((g, b) => g + (Number(b.income) || 0), 0),
          w = new Set(t.map(g => g.hn)).size,
          r = t.length > 0 ? Math.round(s / t.length) : 0,
          c = t.filter(g => g.visit_type === "OPD").length,
          i = t.filter(g => g.visit_type === "IPD").length,
          y = t.length > 0 ? Math.round(t.reduce((g, b) => g + (Number(b.age_y) || 0), 0) / t.length) : 0,
          h = {
            "<30": 0,
            "30-44": 0,
            "45-59": 0,
            "60+": 0
          };
        t.forEach(g => {
          const b = Number(g.age_y) || 0;
          b < 30 ? h["<30"]++ : b < 45 ? h["30-44"]++ : b < 60 ? h["45-59"]++ : h["60+"]++
        });
        const A = {};
        t.forEach(g => {
          const b = (g.icd10 || "").split(",").map(D => D.trim().toUpperCase()).filter(D => cu.test(D)),
            N = (g.icd10name || "").split("|").map(D => D.trim());
          b.forEach((D, C) => {
            A[D] || (A[D] = {
              code: D,
              name: N[C] || "",
              count: 0,
              totalInc: 0
            }), A[D].count++, A[D].totalInc += g.income || 0
          })
        });
        const _ = Object.values(A).sort((g, b) => b.count - g.count).slice(0, 10),
          z = {};
        t.forEach(g => {
          const b = g.pttype_name || "-";
          z[b] || (z[b] = {
            count: 0,
            income: 0
          }), z[b].count++, z[b].income += g.income || 0
        });
        const k = Object.entries(z).sort((g, b) => b[1].count - g[1].count),
          T = {};
        t.forEach(g => {
          const b = g.department || "-";
          T[b] || (T[b] = {
            count: 0,
            income: 0
          }), T[b].count++, T[b].income += g.income || 0
        });
        const P = Object.entries(T).sort((g, b) => b[1].count - g[1].count),
          v = t.filter(g => /M53|M54|M62|M79/.test(g.icd10 || "")).length,
          F = t.filter(g => /M0[5-9]|M1[5-9]/.test(g.icd10 || "")).length,
          X = t.filter(g => /I6[0-9]|G81|G82/.test(g.icd10 || "")).length,
          p = [];
        v > t.length * .3 && p.push({
          sev: "high",
          cat: "Office Syndrome",
          msg: `Office syndrome (M53/M54/M62/M79): ${v} \u0E23\u0E32\u0E22 (${Math.round(v/t.length*100)}%)`,
          action: "\u0E08\u0E31\u0E14 ergonomic education \xB7 workplace assessment \xB7 stretching program \xB7 \u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E48\u0E07 >2 \u0E0A\u0E21.\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E19"
        }), X > 0 && p.push({
          sev: "high",
          cat: "Stroke Rehab",
          msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Stroke \u0E17\u0E35\u0E48\u0E17\u0E33 PT: ${X} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 rehab intensive`,
          action: "\u0E19\u0E31\u0E14 PT 3-5 \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 OT \u0E23\u0E48\u0E27\u0E21 \xB7 evaluate ADLs \u0E17\u0E38\u0E01 2 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 home exercise program"
        }), F > 0 && p.push({
          sev: "med",
          cat: "Arthritis",
          msg: `Arthritis cases: ${F} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 joint protection`,
          action: "pain management \xB7 range of motion exercise \xB7 weight management \xB7 pharmacotherapy review"
        }), i > 0 && p.push({
          sev: "info",
          cat: "IPD/OPD Mix",
          msg: `IPD ${i} \xB7 OPD ${c} \u0E23\u0E32\u0E22`,
          action: i > c ? "high IPD rehab load \u2014 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 inpatient PT staff" : "OPD-dominant \u2014 focus on outpatient scheduling efficiency"
        }), p.push({
          sev: "info",
          cat: "Operational",
          msg: `\u0E23\u0E27\u0E21 ${t.length} visit \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${s.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${r.toLocaleString()} \u0E1A\u0E32\u0E17/visit`,
          action: "monitor revenue per visit \xB7 \u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E25\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34"
        });
        const o = [{
            icon: "\u{1F3C6}",
            title: "Top 10 ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22",
            color: "A855F7",
            headers: ["ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E08\u0E33\u0E19\u0E27\u0E19", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 0],
              [1, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 5],
              [6, 6],
              [7, 7]
            ],
            rows: _.map(g => [{
              v: g.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: g.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: g.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: g.totalInc,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }, {
            icon: "\u{1F465}",
            title: "\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38",
            color: "F59E0B",
            headers: ["\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38"],
            headerSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rows: Object.entries(h).map(([g, b]) => [{
              v: g,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: b,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? b / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: g === "60+" ? "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \xB7 \u0E40\u0E19\u0E49\u0E19 balance + fall prevention" : g === "30-44" ? "\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \xB7 office syndrome" : "",
              align: "left",
              font: {
                sz: 9,
                color: {
                  rgb: "64748B"
                }
              }
            }])
          }, {
            icon: "\u{1F4B3}",
            title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 10)",
            color: "475569",
            headers: ["\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rows: k.slice(0, 10).map(([g, b]) => [{
              v: g,
              align: "left",
              wrap: !0
            }, {
              v: b.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? b.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: b.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }, {
            icon: "\u{1F3E5}",
            title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E41\u0E1C\u0E19\u0E01",
            color: "10B981",
            headers: ["\u0E41\u0E1C\u0E19\u0E01", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rows: P.map(([g, b]) => [{
              v: g,
              align: "left",
              wrap: !0
            }, {
              v: b.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? b.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: b.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          $ = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "Ward", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          a = t.map(g => [g.no, g.pt_name, g.hn, g.visit_type, g.pttype_name, g.age_y, g.cid, g.vstdate, g.department, g.ward_name, g.address, g.mobile_phone_number, g.icd10, g.icd10name, g.income, g.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(g => g.x), bu([0, 1])).then(g => {
          e(g, {
            filename: `BCH360_${n==="staff-services"?"StaffServices":"PhysicalTherapy"}_${h0}_${g0}.xlsx`,
            titleEmoji: "\u{1F9B5}",
            titleText: n === "staff-services" ? "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 \u0E41\u0E25\u0E30 PMC",
            themeColor: "0EA5E9",
            themeColorLight: "0284C7",
            dateRange: {
              start: h0,
              end: g0
            },
            dataSource: "HOSxP XE \xB7 \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 + PMC + \u0E28\u0E39\u0E19\u0E22\u0E4C\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 (main_dep 034, 140, 143)",
            totalCount: t.length,
            uniqueCount: w,
            kpis: [...n === "staff-services" && J?.staff_registry_count ? [{
              label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
              value: J.staff_registry_count,
              unit: "\u0E23\u0E32\u0E22",
              color: "7C3AED",
              fmt: "#,##0",
              note: `\u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${w} \u0E23\u0E32\u0E22 (${J.staff_registry_count>0?Math.round(w/J.staff_registry_count*1e3)/10:0}%)`
            }] : [], {
              label: n === "staff-services" ? "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit \u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit PT",
              value: t.length,
              unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
              color: "0EA5E9",
              fmt: "#,##0",
              note: n === "staff-services" ? "\u0E23\u0E27\u0E21 visit \u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32" : "\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E"
            }, {
              label: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)" : "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
              value: w,
              unit: "\u0E23\u0E32\u0E22",
              color: "0284C7",
              fmt: "#,##0",
              note: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: s,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E22\u0E2D\u0E14\u0E23\u0E27\u0E21\u0E08\u0E32\u0E01 vn_stat"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit",
              value: r,
              unit: "\u0E1A\u0E32\u0E17",
              color: "2563EB",
              fmt: "#,##0.00",
              note: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 visit"
            }, {
              label: "OPD / IPD",
              value: c,
              unit: `OPD (IPD: ${i})`,
              color: "A855F7",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(c/t.length*100):0}% OPD`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: y,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age"
            }],
            breakdowns: o,
            insights: p,
            references: [
              ["ICD-10 Office Syndrome", "M53 (cervicalgia), M54 (back pain), M62 (muscle), M79 (soft tissue)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32", "HOSxP XE \xB7 main_dep 034 (PT) + 140 (PMC) + 143 (\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "PT Patients",
            patientHeader: $,
            patientData: a,
            patientColWidths: [6, 22, 10, 8, 22, 6, 16, 11, 16, 14, 30, 14, 14, 30, 11, 32],
            patientIncomeCols: [14]
          })
        });
        return
      }
      if (n === "fluoride") {
        if (!v0?.patients) return;
        const t = v0.patients,
          s = t.reduce((p, o) => p + (Number(o.fluoride_price) || 0), 0),
          w = t.reduce((p, o) => p + (Number(o.income) || 0), 0),
          r = new Set(t.map(p => p.hn)).size,
          c = t.length > 0 ? Math.round(w / t.length) : 0,
          i = t.length > 0 ? Math.round(t.reduce((p, o) => p + (Number(o.age_y) || 0), 0) / t.length) : 0,
          y = {
            "25-34": 0,
            "35-44": 0,
            "45-54": 0,
            "55-59": 0
          };
        t.forEach(p => {
          const o = Number(p.age_y) || 0;
          o < 35 ? y["25-34"]++ : o < 45 ? y["35-44"]++ : o < 55 ? y["45-54"]++ : y["55-59"]++
        });
        const h = {};
        t.forEach(p => {
          const o = (p.icd10 || "").split(",").map(a => a.trim().toUpperCase()).filter(a => cu.test(a)),
            $ = (p.icd10name || "").split("|").map(a => a.trim());
          o.forEach((a, g) => {
            h[a] || (h[a] = {
              code: a,
              name: $[g] || "",
              count: 0,
              totalInc: 0
            }), h[a].count++, h[a].totalInc += p.income || 0
          })
        });
        const A = Object.values(h).sort((p, o) => o.count - p.count).slice(0, 10),
          _ = {};
        t.forEach(p => {
          const o = p.pttype_name || "-";
          _[o] || (_[o] = {
            count: 0,
            income: 0
          }), _[o].count++, _[o].income += p.income || 0
        });
        const z = Object.entries(_).sort((p, o) => o[1].count - p[1].count),
          k = t.filter(p => /K02|K03/.test(p.icd10 || "")).length,
          T = t.filter(p => /K05|K06/.test(p.icd10 || "")).length,
          P = [];
        k > 0 && P.push({
          sev: "high",
          cat: "Caries Burden",
          msg: `Dental caries (K02-K03): ${k} \u0E23\u0E32\u0E22 (${Math.round(k/t.length*100)}%)`,
          action: "Filling treatment \xB7 oral hygiene education \xB7 sugar reduction counseling \xB7 F/U 6 \u0E40\u0E14\u0E37\u0E2D\u0E19"
        }), T > 0 && P.push({
          sev: "med",
          cat: "Periodontal Disease",
          msg: `Gum disease (K05-K06): ${T} \u0E23\u0E32\u0E22`,
          action: "Scaling + root planing \xB7 oral hygiene reinforcement \xB7 F/U \u0E17\u0E38\u0E01 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19"
        }), P.push({
          sev: "info",
          cat: "Coverage",
          msg: `\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C ${t.length} \u0E23\u0E32\u0E22 \u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${s.toLocaleString()} \u0E1A\u0E32\u0E17`,
          action: "expand outreach \xB7 school/workplace dental health programs \xB7 increase coverage rate"
        }), P.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${i} \u0E1B\u0E35 \xB7 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48 ${Object.entries(y).sort((p,o)=>o[1]-p[1])[0]?.[0]} \u0E1B\u0E35`,
          action: "targeted health promotion \u0E15\u0E32\u0E21 age group \xB7 adult dental care campaign"
        }), P.push({
          sev: "good",
          cat: "Prevention",
          msg: "Fluoride varnish \u0E40\u0E1B\u0E47\u0E19 cost-effective prevention",
          action: "continue program \xB7 NNT (number needed to treat) \u0E15\u0E48\u0E33 \xB7 maintain budget"
        });
        const v = [{
            icon: "\u{1F3C6}",
            title: "Top 10 ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22",
            color: "A855F7",
            headers: ["ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E08\u0E33\u0E19\u0E27\u0E19", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 0],
              [1, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 5],
              [6, 6],
              [7, 7]
            ],
            rows: A.map(p => [{
              v: p.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: p.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: p.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: p.totalInc,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }, {
            icon: "\u{1F465}",
            title: "\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38 (25-59)",
            color: "F59E0B",
            headers: ["\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38"],
            headerSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rows: Object.entries(y).map(([p, o]) => [{
              v: p,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: o,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? o / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: "",
              align: "left"
            }])
          }, {
            icon: "\u{1F4B3}",
            title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 10)",
            color: "475569",
            headers: ["\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rows: z.slice(0, 10).map(([p, o]) => [{
              v: p,
              align: "left",
              wrap: !0
            }, {
              v: o.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? o.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: o.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          F = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E04\u0E48\u0E32\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          X = t.map(p => [p.no, p.pt_name, p.hn, p.pttype_name, p.age_y, p.cid, p.vstdate, p.department, p.address, p.mobile_phone_number, p.icd10, p.icd10name, p.fluoride_price, p.income, p.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(p => p.x), bu([0, 1])).then(p => {
          e(p, {
            filename: `BCH360_Fluoride_25_59_${h0}_${g0}.xlsx`,
            titleEmoji: "\u{1F9B7}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (25-59 \u0E1B\u0E35)",
            themeColor: "06B6D4",
            themeColorLight: "0891B2",
            dateRange: {
              start: h0,
              end: g0
            },
            dataSource: "HOSxP XE \xB7 \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \xB7 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35",
            totalCount: t.length,
            uniqueCount: r,
            kpis: [{
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit \u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C",
              value: t.length,
              unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
              color: "06B6D4",
              fmt: "#,##0",
              note: "\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A fluoride varnish"
            }, {
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
              value: r,
              unit: "\u0E23\u0E32\u0E22",
              color: "0891B2",
              fmt: "#,##0",
              note: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C",
              value: s,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: w,
              unit: "\u0E1A\u0E32\u0E17",
              color: "047857",
              fmt: "#,##0.00",
              note: "\u0E23\u0E27\u0E21\u0E17\u0E38\u0E01\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit",
              value: c,
              unit: "\u0E1A\u0E32\u0E17",
              color: "2563EB",
              fmt: "#,##0.00",
              note: "avg revenue per visit"
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: i,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "\u0E2D\u0E32\u0E22\u0E38 25-59 (target group)"
            }],
            breakdowns: v,
            insights: P,
            references: [
              ["Target Age", "25-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19) \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 dental prevention"],
              ["ICD-10 Dental", "K02-K03 (caries), K05-K06 (periodontal), Z012 (dental exam)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Fluoride 25-59",
            patientHeader: F,
            patientData: X,
            patientColWidths: [6, 22, 10, 22, 6, 16, 11, 16, 30, 14, 14, 30, 12, 11, 32],
            patientIncomeCols: [12, 13]
          })
        });
        return
      }
      if (n === "elderly-cxr") {
        if (!w0?.patients) return;
        const t = w0.patients,
          s = w0.total_income || t.reduce((a, g) => a + (Number(g.income) || 0), 0),
          w = w0.total_cxr_price || t.reduce((a, g) => a + (Number(g.cxr_price) || 0), 0),
          r = new Set(t.map(a => a.hn)).size,
          c = t.length > 0 ? Math.round(s / t.length) : 0,
          i = t.filter(a => a.sex === "\u0E0A\u0E32\u0E22").length,
          y = t.filter(a => a.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
          h = t.length > 0 ? Math.round(t.reduce((a, g) => a + (Number(g.age_y) || 0), 0) / t.length) : 0,
          A = {
            "60-64": 0,
            "65-69": 0,
            "70-74": 0,
            "75-79": 0,
            "80+": 0
          };
        t.forEach(a => {
          const g = Number(a.age_y) || 0;
          g < 65 ? A["60-64"]++ : g < 70 ? A["65-69"]++ : g < 75 ? A["70-74"]++ : g < 80 ? A["75-79"]++ : A["80+"]++
        });
        const _ = {};
        t.forEach(a => {
          const g = (a.icd10 || "").split(",").map(N => N.trim().toUpperCase()).filter(N => cu.test(N)),
            b = (a.icd10name || "").split("|").map(N => N.trim());
          g.forEach((N, D) => {
            _[N] || (_[N] = {
              code: N,
              name: b[D] || "",
              count: 0,
              totalInc: 0
            }), _[N].count++, _[N].totalInc += a.income || 0
          })
        });
        const z = Object.values(_).sort((a, g) => g.count - a.count).slice(0, 10),
          k = {};
        t.forEach(a => {
          const g = a.pttype_name || "-";
          k[g] || (k[g] = {
            count: 0,
            income: 0
          }), k[g].count++, k[g].income += a.income || 0
        });
        const T = Object.entries(k).sort((a, g) => g[1].count - a[1].count),
          P = t.filter(a => /A1[5-9]/.test(a.icd10 || "")).length,
          v = t.filter(a => /C3[3-4]/.test(a.icd10 || "")).length,
          F = t.filter(a => /J1[2-8]/.test(a.icd10 || "")).length,
          X = [];
        P > 0 && X.push({
          sev: "critical",
          cat: "TB Suspect",
          msg: `\u{1F9A0} TB-related ICD (A15-A19): ${P} \u0E23\u0E32\u0E22 \u2014 \u0E2A\u0E07\u0E2A\u0E31\u0E22\u0E27\u0E31\u0E13\u0E42\u0E23\u0E04`,
          action: "sputum AFB + Xpert MTB \xB7 contact tracing \xB7 isolate \u0E16\u0E49\u0E32\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 \xB7 DOT program enrollment"
        }), v > 0 && X.push({
          sev: "critical",
          cat: "Lung Cancer",
          msg: `Lung CA (C33-C34): ${v} \u0E23\u0E32\u0E22 \u2014 \u0E21\u0E30\u0E40\u0E23\u0E47\u0E07\u0E1B\u0E2D\u0E14`,
          action: "CT chest \xB7 pulmonologist referral \xB7 oncology consultation \xB7 staging workup"
        }), F > 0 && X.push({
          sev: "high",
          cat: "Pneumonia",
          msg: `Pneumonia (J12-J18): ${F} \u0E23\u0E32\u0E22 \u2014 \u0E1B\u0E2D\u0E14\u0E1A\u0E27\u0E21`,
          action: "sputum culture \xB7 empirical antibiotic per CURB-65 \xB7 admission \u0E16\u0E49\u0E32 severe \xB7 F/U CXR 4-6 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C"
        }), X.push({
          sev: "med",
          cat: "Screening Coverage",
          msg: `\u0E23\u0E27\u0E21 ${t.length} \u0E23\u0E32\u0E22 \xB7 \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A CXR`,
          action: "expand coverage to all elderly \xB7 annual CXR screening for high-risk groups"
        }), X.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${h} \u0E1B\u0E35 \xB7 \u0E0A\u0E32\u0E22 ${i} \u0E2B\u0E0D\u0E34\u0E07 ${y}`,
          action: "monitor age-specific yield \xB7 gender comparison \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A TB/CA detection"
        }), X.push({
          sev: "info",
          cat: "Cost Analysis",
          msg: `\u0E04\u0E48\u0E32 CXR \u0E23\u0E27\u0E21 ${w.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Visit \u0E23\u0E27\u0E21 ${s.toLocaleString()} \u0E1A\u0E32\u0E17`,
          action: "monitor CXR-to-Visit ratio \xB7 ratio \u0E2A\u0E39\u0E07 = CXR \u0E40\u0E1B\u0E47\u0E19 primary reason"
        });
        const p = [{
            icon: "\u{1F3C6}",
            title: "Top 10 ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22",
            color: "A855F7",
            headers: ["ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E08\u0E33\u0E19\u0E27\u0E19", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 0],
              [1, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 5],
              [6, 6],
              [7, 7]
            ],
            rows: z.map(a => [{
              v: a.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: a.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: a.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: a.totalInc,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }, {
            icon: "\u{1F465}",
            title: "\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38 (60+ \u0E1B\u0E35)",
            color: "F59E0B",
            headers: ["\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38"],
            headerSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rows: Object.entries(A).map(([a, g]) => [{
              v: a,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: g,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? g / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: a === "80+" ? "high frailty risk" : "",
              align: "left",
              font: {
                sz: 9,
                color: {
                  rgb: "64748B"
                }
              }
            }])
          }, {
            icon: "\u{1F4B3}",
            title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 10)",
            color: "475569",
            headers: ["\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rows: T.slice(0, 10).map(([a, g]) => [{
              v: a,
              align: "left",
              wrap: !0
            }, {
              v: g.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? g.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: g.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          o = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 CXR", "\u0E04\u0E48\u0E32 CXR", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          $ = t.map(a => [a.no, a.pt_name, a.hn, a.sex, a.age_y, a.cid, a.pttype_name, a.vstdate, a.department, a.address, a.mobile_phone_number, a.cxr_name, a.cxr_price, a.icd10, a.icd10name, a.income, a.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(a => a.x), bu([0, 1])).then(a => {
          e(a, {
            filename: `BCH360_Elderly_CXR_60plus_${h0}_${g0}.xlsx`,
            titleEmoji: "\u2622\uFE0F",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E17\u0E35\u0E48\u0E21\u0E35 Chest X-Ray",
            themeColor: "7C3AED",
            themeColorLight: "6D28D9",
            dateRange: {
              start: h0,
              end: g0
            },
            dataSource: "HOSxP XE \xB7 opitemrece CXR icode (14 \u0E23\u0E2B\u0E31\u0E2A) \xB7 \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35",
            totalCount: t.length,
            uniqueCount: r,
            kpis: [{
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit CXR",
              value: t.length,
              unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
              color: "7C3AED",
              fmt: "#,##0",
              note: "\u0E01\u0E32\u0E23 X-Ray \u0E1B\u0E2D\u0E14"
            }, {
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
              value: r,
              unit: "\u0E23\u0E32\u0E22",
              color: "A855F7",
              fmt: "#,##0",
              note: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E04\u0E48\u0E32 CXR",
              value: w,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E04\u0E48\u0E32 X-Ray"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: s,
              unit: "\u0E1A\u0E32\u0E17",
              color: "047857",
              fmt: "#,##0.00",
              note: "\u0E23\u0E27\u0E21\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E32\u0E22",
              value: i,
              unit: "\u0E23\u0E32\u0E22",
              color: "0EA5E9",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(i/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07",
              value: y,
              unit: "\u0E23\u0E32\u0E22",
              color: "EC4899",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(y/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: h,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age (\u226560)"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit",
              value: c,
              unit: "\u0E1A\u0E32\u0E17",
              color: "2563EB",
              fmt: "#,##0.00",
              note: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 visit"
            }],
            breakdowns: p,
            insights: X,
            references: [
              ["CXR ICD Codes", "14 \u0E23\u0E2B\u0E31\u0E2A (CXR AP, PA, Lordotic, Lateral, Portable, \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E)"],
              ["Target Group", "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E15\u0E32\u0E21\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E01\u0E23\u0E30\u0E17\u0E23\u0E27\u0E07\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E2A\u0E38\u0E02 (\u2260 WHO \u226565)"],
              ["Screening Focus", "TB (A15-A19), Lung CA (C33-C34), Pneumonia (J12-J18)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Elderly CXR 60+",
            patientHeader: o,
            patientData: $,
            patientColWidths: [6, 22, 10, 6, 6, 16, 22, 11, 16, 30, 14, 22, 10, 14, 30, 11, 32],
            patientIncomeCols: [12, 15]
          })
        });
        return
      }
      if (n === "pttype-services") {
        if (!u0?.groups) return;
        const t = o => Number(o || 0),
          s = new Set(gu === null ? u0.group_order || [] : gu),
          w = (u0.groups || []).filter(o => s.has(o.group_name)),
          r = (u0.summary || []).filter(o => s.has(o.group_name)),
          c = (u0.group_trend || []).filter(o => s.has(o.group_name)),
          i = w.reduce((o, $) => o + ($.total_visits || 0), 0),
          y = ["", "\u0E21.\u0E04.", "\u0E01.\u0E1E.", "\u0E21\u0E35.\u0E04.", "\u0E40\u0E21.\u0E22.", "\u0E1E.\u0E04.", "\u0E21\u0E34.\u0E22.", "\u0E01.\u0E04.", "\u0E2A.\u0E04.", "\u0E01.\u0E22.", "\u0E15.\u0E04.", "\u0E1E.\u0E22.", "\u0E18.\u0E04."],
          h = o => {
            const $ = Number(o.slice(5, 7)),
              a = Number(o.slice(0, 4));
            return `${y[$]} ${(a+543)%100}`
          },
          A = ["\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A", "\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C", "\u0E08\u0E33\u0E19\u0E27\u0E19 pttype", "OPD (\u0E04\u0E23\u0E31\u0E49\u0E07)", "OPD (\u0E04\u0E19)", "IPD (\u0E04\u0E23\u0E31\u0E49\u0E07)", "IPD (\u0E04\u0E19)", "ER (\u0E04\u0E23\u0E31\u0E49\u0E07)", "ER (\u0E04\u0E19)", "\u0E23\u0E27\u0E21 (\u0E04\u0E23\u0E31\u0E49\u0E07)", "% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"],
          _ = [...w].sort((o, $) => $.total_visits - o.total_visits),
          z = _.map((o, $) => [$ + 1, o.group_name, t(o.pttype_count), t(o.opd_visits), t(o.opd_hn), t(o.ipd_admissions), t(o.ipd_hn), t(o.er_visits), t(o.er_hn), t(o.total_visits), i > 0 ? (o.total_visits / i * 100).toFixed(2) + "%" : "0%"]),
          k = ["", "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", _.reduce((o, $) => o + ($.pttype_count || 0), 0), _.reduce((o, $) => o + $.opd_visits, 0), _.reduce((o, $) => o + $.opd_hn, 0), _.reduce((o, $) => o + $.ipd_admissions, 0), _.reduce((o, $) => o + $.ipd_hn, 0), _.reduce((o, $) => o + $.er_visits, 0), _.reduce((o, $) => o + $.er_hn, 0), i, "100%"],
          T = ["\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C", "\u0E23\u0E2B\u0E31\u0E2A pttype", "\u0E0A\u0E37\u0E48\u0E2D pttype", "OPD (\u0E04\u0E23\u0E31\u0E49\u0E07)", "OPD (\u0E04\u0E19)", "IPD (\u0E04\u0E23\u0E31\u0E49\u0E07)", "IPD (\u0E04\u0E19)", "ER (\u0E04\u0E23\u0E31\u0E49\u0E07)", "ER (\u0E04\u0E19)", "\u0E23\u0E27\u0E21 (\u0E04\u0E23\u0E31\u0E49\u0E07)"],
          P = r.map(o => [o.group_name, o.pttype, o.pttype_name, t(o.opd_visits), t(o.opd_hn), t(o.ipd_admissions), t(o.ipd_hn), t(o.er_visits), t(o.er_hn), t(o.total_visits)]),
          v = Array.from(new Set(c.map(o => o.ym))).sort(),
          F = _.map(o => o.group_name),
          X = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...F, "\u0E23\u0E27\u0E21"],
          p = v.map(o => {
            const $ = [h(o)];
            let a = 0;
            for (const g of F) {
              const b = c.find(D => D.ym === o && D.group_name === g),
                N = b ? Number(b.total || 0) : 0;
              $.push(N), a += N
            }
            return $.push(a), $
          });
        du(() => import("./xlsx-BuHXVOW6.js"), []).then(o => {
          const $ = o.utils.book_new(),
            a = o.utils.aoa_to_sheet([A, ...z, k]);
          a["!cols"] = A.map(C => ({
            wch: Math.min(Math.max(C.length + 4, 12), 28)
          })), o.utils.book_append_sheet($, a, "\u0E2A\u0E23\u0E38\u0E1B\u0E15\u0E32\u0E21\u0E2B\u0E21\u0E27\u0E14");
          const g = o.utils.aoa_to_sheet([T, ...P]);
          if (g["!cols"] = T.map(C => ({
              wch: Math.min(Math.max(C.length + 4, 12), 36)
            })), o.utils.book_append_sheet($, g, "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 pttype"), p.length > 0) {
            const C = o.utils.aoa_to_sheet([X, ...p]);
            C["!cols"] = X.map((U, j) => ({
              wch: j === 0 ? 14 : Math.min(Math.max(U.length + 4, 12), 24)
            })), o.utils.book_append_sheet($, C, "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19")
          }
          const b = (u0.age_breakdown || []).filter(C => s.has(C.group_name));
          if (b.length > 0) {
            const C = u0.age_order || ["\u0E27\u0E31\u0E22\u0E40\u0E14\u0E47\u0E01 (0-14 \u0E1B\u0E35)", "\u0E27\u0E31\u0E22\u0E23\u0E38\u0E48\u0E19/\u0E27\u0E31\u0E22\u0E2B\u0E19\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E27 (15-24 \u0E1B\u0E35)", "\u0E27\u0E31\u0E22\u0E41\u0E23\u0E07\u0E07\u0E32\u0E19 (25-59 \u0E1B\u0E35)", "\u0E27\u0E31\u0E22\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 (60 \u0E1B\u0E35\u0E02\u0E36\u0E49\u0E19\u0E44\u0E1B)", "\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38"],
              U = ["\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C", ...C, "\u0E23\u0E27\u0E21"],
              j = {};
            for (const R of b) j[R.group_name] || (j[R.group_name] = {}), j[R.group_name][R.age_group] = R.total;
            const W = _.map(R => {
                const H = [R.group_name];
                let q = 0;
                for (const r0 of C) {
                  const o0 = j[R.group_name]?.[r0] || 0;
                  H.push(o0), q += o0
                }
                return H.push(q), H
              }),
              B = ["\u0E23\u0E27\u0E21\u0E15\u0E48\u0E2D\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38"];
            for (let R = 0; R < C.length; R++) B.push(W.reduce((H, q) => H + (q[R + 1] || 0), 0));
            B.push(W.reduce((R, H) => R + (H[H.length - 1] || 0), 0));
            const L = o.utils.aoa_to_sheet([U, ...W, B]);
            L["!cols"] = U.map(R => ({
              wch: Math.min(Math.max(R.length + 4, 14), 32)
            })), o.utils.book_append_sheet($, L, "\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38 \xD7 \u0E2B\u0E21\u0E27\u0E14")
          }
          const N = [
              ["BCH 360\xB0 Intelligence \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"],
              [],
              ["\u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", `${u0.from} \u0E16\u0E36\u0E07 ${u0.to}`],
              ["\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", u0.data_source || "HOSxP XE"],
              ["\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E44\u0E1F\u0E25\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D", new Date().toLocaleString("th-TH")],
              ["\u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01", `${w.length} \u0E08\u0E32\u0E01 ${(u0.group_order||[]).length} \u0E2B\u0E21\u0E27\u0E14\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19`],
              [],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team \xB7 BOSSART"]
            ],
            D = o.utils.aoa_to_sheet(N);
          D["!cols"] = [{
            wch: 22
          }, {
            wch: 60
          }], o.utils.book_append_sheet($, D, "Meta"), o.writeFile($, `BCH360_PttypeServices_${u0.from}_${u0.to}.xlsx`)
        });
        return
      }
      if (n === "imaging-services") {
        if (!l0?.patients) return;
        const t = l0.patients,
          s = l0.services || ["XRAY", "CT", "Portable", "BMD"],
          w = l0.service_labels || {},
          r = l0.service_counts || {},
          c = l0.total_income || 0,
          i = l0.total_imaging_price || 0,
          y = l0.unique_patients || new Set(t.map(b => b.hn)).size,
          h = t.length > 0 ? Math.round(c / t.length) : 0,
          A = t.length > 0 ? Math.round(i / t.length) : 0,
          _ = t.filter(b => b.sex === "\u0E0A\u0E32\u0E22").length,
          z = t.filter(b => b.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
          k = t.length > 0 ? Math.round(t.reduce((b, N) => b + (Number(N.age_y) || 0), 0) / t.length) : 0,
          T = {
            "<20": 0,
            "20-39": 0,
            "40-59": 0,
            "60-79": 0,
            "80+": 0
          };
        t.forEach(b => {
          const N = Number(b.age_y) || 0;
          N < 20 ? T["<20"]++ : N < 40 ? T["20-39"]++ : N < 60 ? T["40-59"]++ : N < 80 ? T["60-79"]++ : T["80+"]++
        });
        const P = {};
        t.forEach(b => {
          (b.icd_pairs || "").split("||").filter(Boolean).forEach(N => {
            const [D, C] = N.split("::"), U = (D || "").toUpperCase();
            !U || !cu.test(U) || (P[U] || (P[U] = {
              code: U,
              name: C || "",
              count: 0,
              totalInc: 0
            }), P[U].count++, P[U].totalInc += b.income || 0)
          })
        });
        const v = Object.values(P).sort((b, N) => N.count - b.count).slice(0, 10),
          F = {};
        t.forEach(b => {
          const N = b.pttype_name || "-";
          F[N] || (F[N] = {
            count: 0,
            income: 0
          }), F[N].count++, F[N].income += b.income || 0
        });
        const X = Object.entries(F).sort((b, N) => N[1].count - b[1].count),
          p = [];
        r.CT > 0 && p.push({
          sev: "info",
          cat: "CT Volume",
          msg: `CT scans: ${r.CT} \u0E23\u0E32\u0E22 \u2014 \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21 high-resource imaging`,
          action: "monitor radiation dose \xB7 review CT appropriateness \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 ALARA principle"
        }), r.BMD > 0 && p.push({
          sev: "info",
          cat: "BMD Screening",
          msg: `BMD (DEXA): ${r.BMD} \u0E23\u0E32\u0E22 \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 osteoporosis`,
          action: "F/U FRAX score \xB7 vitamin D + Ca supplement \xB7 fall prevention \xB7 pharmacotherapy \u0E15\u0E32\u0E21 T-score"
        }), r.Portable > t.length * .2 && p.push({
          sev: "med",
          cat: "Portable High Use",
          msg: `Portable X-Ray \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34: ${r.Portable} \u0E04\u0E23\u0E31\u0E49\u0E07 (${Math.round(r.Portable/t.length*100)}%)`,
          action: "review portable necessity \xB7 admin-only when patient cannot transfer \xB7 cost is 40% \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32 standard"
        }), r.XRAY > 0 && p.push({
          sev: "info",
          cat: "X-Ray Volume",
          msg: `Plain X-Ray: ${r.XRAY} \u0E23\u0E32\u0E22 \u2014 \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19 high-volume`,
          action: "monitor turnaround time \xB7 digital radiography efficiency check"
        }), p.push({
          sev: "info",
          cat: "Cost Summary",
          msg: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 imaging \u0E23\u0E27\u0E21 ${i.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${A.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22`,
          action: "analyze cost-per-procedure trend \xB7 benchmark \u0E01\u0E31\u0E1A\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07"
        });
        const o = {
            XRAY: "3B82F6",
            CT: "7C3AED",
            Portable: "F59E0B",
            BMD: "EC4899"
          },
          $ = [{
            icon: "\u{1FA7B}",
            title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 Imaging",
            color: "7C3AED",
            headers: ["\u0E01\u0E25\u0E38\u0E48\u0E21", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22"],
            headerSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rows: s.map(b => [{
              v: b,
              align: "center",
              font: {
                bold: !0,
                sz: 12,
                color: {
                  rgb: o[b] || "7C3AED"
                }
              }
            }, {
              v: r[b] || 0,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? (r[b] || 0) / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: w[b] || "",
              align: "left"
            }])
          }, {
            icon: "\u{1F3C6}",
            title: "Top 10 ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22",
            color: "A855F7",
            headers: ["ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E08\u0E33\u0E19\u0E27\u0E19", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 0],
              [1, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 5],
              [6, 6],
              [7, 7]
            ],
            rows: v.map(b => [{
              v: b.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: b.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: b.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: b.totalInc,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }, {
            icon: "\u{1F465}",
            title: "\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38",
            color: "F59E0B",
            headers: ["\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38"],
            headerSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rowSegs: [
              [0, 0],
              [1, 2],
              [3, 4],
              [5, 7]
            ],
            rows: Object.entries(T).map(([b, N]) => [{
              v: b,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: N,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? N / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: b === "60-79" || b === "80+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u2014 common imaging users" : "",
              align: "left",
              font: {
                sz: 9,
                color: {
                  rgb: "64748B"
                }
              }
            }])
          }, {
            icon: "\u{1F4B3}",
            title: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 10)",
            color: "475569",
            headers: ["\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E08\u0E33\u0E19\u0E27\u0E19", "%", "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)"],
            headerSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rowSegs: [
              [0, 4],
              [5, 5],
              [6, 6],
              [7, 7]
            ],
            rows: X.slice(0, 10).map(([b, N]) => [{
              v: b,
              align: "left",
              wrap: !0
            }, {
              v: N.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? N.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: N.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          a = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 Imaging", "\u0E23\u0E2B\u0E31\u0E2A", "\u0E04\u0E48\u0E32 Imaging", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19 Visit", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          g = t.map(b => [b.no, b.pt_name, b.hn, b.sex, b.age_y, b.cid, b.pttype_name, b.vstdate, b.vsttime, b.department, b.address, b.mobile_phone_number, b.service_groups, b.service_names, b.service_codes, b.imaging_price, b.icd10, b.icd10name, b.income, b.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(b => b.x), bu([0, 1])).then(b => {
          e(b, {
            filename: `BCH360_Imaging_${h0}_${g0}.xlsx`,
            titleEmoji: "\u{1FA7B}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 XRAY / CT / Portable / BMD",
            themeColor: "7C3AED",
            themeColorLight: "6D28D9",
            dateRange: {
              start: h0,
              end: g0
            },
            dataSource: l0.data_source || "HOSxP XE \xB7 opitemrece + nondrugitems",
            totalCount: t.length,
            uniqueCount: y,
            kpis: [{
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit \u0E23\u0E27\u0E21",
              value: t.length,
              unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
              color: "7C3AED",
              fmt: "#,##0",
              note: "\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E21\u0E32 imaging \u0E17\u0E38\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17"
            }, {
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
              value: y,
              unit: "\u0E23\u0E32\u0E22",
              color: "A855F7",
              fmt: "#,##0",
              note: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Imaging \u0E23\u0E27\u0E21",
              value: i,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E04\u0E48\u0E32 X-Ray/CT/Portable/BMD"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Visit \u0E23\u0E27\u0E21",
              value: c,
              unit: "\u0E1A\u0E32\u0E17",
              color: "047857",
              fmt: "#,##0.00",
              note: "\u0E23\u0E27\u0E21\u0E17\u0E38\u0E01\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E43\u0E19 visit"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Imaging/\u0E23\u0E32\u0E22",
              value: A,
              unit: "\u0E1A\u0E32\u0E17",
              color: "0EA5E9",
              fmt: "#,##0.00",
              note: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 imaging \xF7 \u0E23\u0E32\u0E22"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Visit/\u0E23\u0E32\u0E22",
              value: h,
              unit: "\u0E1A\u0E32\u0E17",
              color: "2563EB",
              fmt: "#,##0.00",
              note: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 \u0E23\u0E32\u0E22"
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E32\u0E22",
              value: _,
              unit: "\u0E23\u0E32\u0E22",
              color: "0EA5E9",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(_/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07",
              value: z,
              unit: "\u0E23\u0E32\u0E22",
              color: "EC4899",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(z/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: k,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age"
            }],
            breakdowns: $,
            insights: p,
            references: [
              ["\u0E01\u0E32\u0E23\u0E08\u0E33\u0E41\u0E19\u0E01", "XRAY = X-ray \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B \xB7 CT = CT scan \xB7 Portable = X-ray \u0E40\u0E04\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E17\u0E35\u0E48 \xB7 BMD = Bone Density (DEXA)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "HOSxP XE \xB7 ovst + opitemrece + nondrugitems (filter \u0E15\u0E32\u0E21\u0E0A\u0E37\u0E48\u0E2D\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Imaging Patients",
            patientHeader: a,
            patientData: g,
            patientColWidths: [6, 22, 10, 6, 6, 16, 22, 11, 9, 16, 30, 14, 16, 30, 18, 12, 14, 30, 11, 32],
            patientIncomeCols: [15, 18]
          })
        });
        return
      }
      if (n === "opd-compare") {
        if (!S?.comparison) return;
        const t = (_, z) => _ > 0 ? Math.round((z - _) / _ * 100) + "%" : z > 0 ? "100%" : "0%",
          s = S.fiscal_years?.fy1?.label || "\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19",
          w = S.fiscal_years?.fy2?.label || "\u0E1B\u0E35\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19",
          r = ["visits", "patients", "revenue", "drug_cost", "lab_cost", "xray_cost", "avg_income"],
          c = ["Visit", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 X-ray", "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit"],
          i = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...c.map(_ => `${_} (${s})`), ...c.map(_ => `${_} (${w})`), ...c.map(_ => `YoY ${_} %`)],
          y = S.comparison.map(_ => [_.month, ...r.map(z => _.fy1[z]), ...r.map(z => _.fy2[z]), ...r.map(z => t(_.fy1[z], _.fy2[z]))]),
          h = S.fy1_totals,
          A = S.fy2_totals;
        y.push(["\u0E23\u0E27\u0E21", ...r.map(_ => h[_]), ...r.map(_ => A[_]), ...r.map(_ => t(h[_], A[_]))]), du(() => import("./xlsx-BuHXVOW6.js"), []).then(_ => {
          const z = _.utils.aoa_to_sheet([i, ...y]);
          z["!cols"] = i.map((T, P) => ({
            wch: Math.min(Math.max(T.length + 2, 10), 25)
          }));
          const k = _.utils.book_new();
          _.utils.book_append_sheet(k, z, "OPD Compare"), _.writeFile(k, `BCH360_OPD_Compare_${h0}_${g0}.xlsx`)
        });
        return
      }
      if (n === "resource-opd" || n === "resource-ipd") {
        const t = n === "resource-opd" ? Eu : G0;
        if (!t?.comparison) return;
        const s = n === "resource-opd" ? "OPD" : "IPD",
          w = n === "resource-opd" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19",
          r = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `Lab \u0E04\u0E23\u0E31\u0E49\u0E07 (${s0})`, `Lab \u0E1A\u0E32\u0E17 (${s0})`, `Drug \u0E04\u0E23\u0E31\u0E49\u0E07 (${s0})`, `Drug \u0E1A\u0E32\u0E17 (${s0})`, `Xray \u0E04\u0E23\u0E31\u0E49\u0E07 (${s0})`, `Xray \u0E1A\u0E32\u0E17 (${s0})`, `\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07 (${s0})`, `\u0E23\u0E27\u0E21\u0E1A\u0E32\u0E17 (${s0})`, `Lab \u0E04\u0E23\u0E31\u0E49\u0E07 (${e0})`, `Lab \u0E1A\u0E32\u0E17 (${e0})`, `Drug \u0E04\u0E23\u0E31\u0E49\u0E07 (${e0})`, `Drug \u0E1A\u0E32\u0E17 (${e0})`, `Xray \u0E04\u0E23\u0E31\u0E49\u0E07 (${e0})`, `Xray \u0E1A\u0E32\u0E17 (${e0})`, `\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07 (${e0})`, `\u0E23\u0E27\u0E21\u0E1A\u0E32\u0E17 (${e0})`, "\u0E08\u0E33\u0E19\u0E27\u0E19 %", "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 %"],
          c = (T, P) => P > 0 ? Math.round((T - P) / P * 100) : T > 0 ? 100 : 0,
          i = t.comparison.filter(T => T.fy1?.has_data || T.fy2?.has_data).map(T => {
            const P = T.fy1,
              v = T.fy2,
              F = P.lab_orders + P.drug_orders + P.xray_orders,
              X = P.lab_price + P.drug_price + P.xray_price,
              p = v.lab_orders + v.drug_orders + v.xray_orders,
              o = v.lab_price + v.drug_price + v.xray_price,
              $ = P.has_data && v.has_data ? c(p, F) : "",
              a = P.has_data && v.has_data ? c(o, X) : "";
            return [T.month, P.lab_orders || "", P.lab_price || "", P.drug_orders || "", P.drug_price || "", P.xray_orders || "", P.xray_price || "", P.has_data ? F : "", P.has_data ? X : "", v.lab_orders || "", v.lab_price || "", v.drug_orders || "", v.drug_price || "", v.xray_orders || "", v.xray_price || "", v.has_data ? p : "", v.has_data ? o : "", $ !== "" ? `${$}%` : "", a !== "" ? `${a}%` : ""]
          }),
          y = t.fy1_totals,
          h = t.fy2_totals,
          A = y.lab_orders + y.drug_orders + y.xray_orders,
          _ = y.lab_price + y.drug_price + y.xray_price,
          z = h.lab_orders + h.drug_orders + h.xray_orders,
          k = h.lab_price + h.drug_price + h.xray_price;
        i.push(["\u0E23\u0E27\u0E21", y.lab_orders, y.lab_price, y.drug_orders, y.drug_price, y.xray_orders, y.xray_price, A, _, h.lab_orders, h.lab_price, h.drug_orders, h.drug_price, h.xray_orders, h.xray_price, z, k, `${t.overall_orders_growth_pct}%`, `${t.overall_price_growth_pct}%`]), du(() => import("./xlsx-BuHXVOW6.js"), []).then(T => {
          const P = [r, ...i],
            v = T.utils.aoa_to_sheet(P);
          v["!cols"] = r.map((X, p) => {
            const o = Math.max(X.length, ...i.map($ => String($[p] ?? "").length));
            return {
              wch: Math.min(Math.max(o + 2, 8), 28)
            }
          });
          const F = T.utils.book_new();
          T.utils.book_append_sheet(F, v, `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${w}`), T.writeFile(F, `BCH360_Resource_${s}_Monthly_${s0}_${e0}.xlsx`)
        });
        return
      }
      if (n === "ncd-disease") {
        if (!Q) return;
        const {
          pts: t,
          totalIncome: s,
          uniquePatients: w,
          avgIncome: r,
          maleCount: c,
          femaleCount: i,
          ageGroups: y,
          topIcd: h,
          rightList: A,
          ckdCount: _,
          ckdWithEgfrCount: z,
          avgEgfr: k,
          advancedCkd: T
        } = Q, P = b0.diseases || ["DM", "HT", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD"], v = b0.disease_labels || {}, F = Q.diseaseCountsFE || b0.disease_counts || {}, X = {
          length: z
        }, p = h.slice(0, 10), o = [], $ = Math.max(1, Math.ceil((new Date(g0) - new Date(h0)) / 864e5) + 1), a = t.length / $, g = Math.round(a * 250);
        if (T > 0) {
          const m = Math.round(T / Math.max(_, 1) * 100);
          o.push({
            sev: "critical",
            cat: "CKD \u0E23\u0E30\u0E22\u0E30\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07",
            msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD Stage 4-5 \u0E08\u0E33\u0E19\u0E27\u0E19 ${T} \u0E23\u0E32\u0E22 (${m}% \u0E02\u0E2D\u0E07 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14)`,
            action: "\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D Nephrologist \u0E20\u0E32\u0E22\u0E43\u0E19 1 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Renal Replacement Therapy (HD/PD/KT) \xB7 \u0E09\u0E35\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19 HBV/Pneumococcal \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 dietitian (low protein diet)"
          })
        }
        const b = t.filter(m => m.egfr != null && m.egfr < 30).length;
        if (b > 0) {
          const m = Math.round(b / t.length * 100);
          o.push({
            sev: "critical",
            cat: "Renal Function",
            msg: `eGFR <30 ml/min/1.73m\xB2 (Severe CKD): ${b} \u0E23\u0E32\u0E22 (${m}%)`,
            action: "\u0E2B\u0E25\u0E35\u0E01\u0E40\u0E25\u0E35\u0E48\u0E22\u0E07 nephrotoxic drugs (NSAIDs, contrast, aminoglycosides) \xB7 \u0E1B\u0E23\u0E31\u0E1A dose \u0E22\u0E32\u0E15\u0E32\u0E21 eGFR \xB7 \u0E40\u0E23\u0E34\u0E48\u0E21 Renal team referral \xB7 counsel vascular access"
          })
        }
        const N = t.filter(m => /DM/.test(m.disease_groups) && /HT/.test(m.disease_groups) && /CKD/.test(m.disease_groups)).length;
        if (N > 0) {
          const m = Math.round(N / t.length * 100);
          o.push({
            sev: "high",
            cat: "Triple Comorbidity",
            msg: `DM + HT + CKD \u0E23\u0E48\u0E27\u0E21 ${N} \u0E23\u0E32\u0E22 (${m}%) \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 CV event \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14`,
            action: "First-line: ACEi/ARB + SGLT2i \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HbA1c <7%, BP <130/80, LDL <70 \xB7 \u0E15\u0E23\u0E27\u0E08 UACR \u0E17\u0E38\u0E01 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E07\u0E14 NSAIDs"
          })
        }
        const D = t.filter(m => /Stroke/.test(m.disease_groups) && /HT/.test(m.disease_groups)).length;
        D > 0 && o.push({
          sev: "high",
          cat: "Secondary Prevention",
          msg: `Stroke + HT ${D} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 recurrence stroke 7-10% \u0E15\u0E48\u0E2D\u0E1B\u0E35\u0E2B\u0E32\u0E01\u0E44\u0E21\u0E48\u0E04\u0E38\u0E21 BP`,
          action: "BP target <130/80 mmHg \xB7 Antiplatelet (ASA \u0E2B\u0E23\u0E37\u0E2D Clopidogrel) \xB7 Statin (LDL <70) \xB7 \u0E07\u0E14\u0E2A\u0E39\u0E1A\u0E1A\u0E38\u0E2B\u0E23\u0E35\u0E48 \xB7 physiotherapy/rehab"
        }), F.IHD > 0 && o.push({
          sev: "high",
          cat: "IHD Management",
          msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IHD ${F.IHD} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 secondary prevention \u0E40\u0E15\u0E47\u0E21\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A`,
          action: "ASA + Statin lifelong \xB7 \u03B2-blocker \u0E2B\u0E23\u0E37\u0E2D ACEi/ARB \xB7 cardiac rehab \xB7 annual ECG/Echo"
        });
        const C = t.filter(m => Number(m.age_y) >= 60).length,
          U = t.filter(m => {
            const O = (m.disease_groups || "").split(",").filter(Boolean);
            return Number(m.age_y) >= 65 && O.length >= 3
          }).length;
        if (U > 0) {
          const m = Math.round(U / t.length * 100);
          o.push({
            sev: "med",
            cat: "Polypharmacy / Geriatric",
            msg: `\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u226565 \u0E1B\u0E35 + NCD \u22653 \u0E42\u0E23\u0E04: ${U} \u0E23\u0E32\u0E22 (${m}%) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 drug interaction & falls`,
            action: "\u0E17\u0E33 medication review (Beers criteria) \xB7 \u0E25\u0E14 anticholinergic burden \xB7 screening fall risk + osteoporosis \xB7 \u0E15\u0E23\u0E27\u0E08 kidney function \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19"
          })
        }
        if (C > 0) {
          const m = Math.round(C / t.length * 100);
          o.push({
            sev: "info",
            cat: "Demographic",
            msg: `\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u226560 \u0E1B\u0E35: ${C} visit (${m}%) \u0E02\u0E2D\u0E07 NCD clinic`,
            action: "\u0E08\u0E31\u0E14 geriatric assessment \xB7 counseling cognitive decline screening \xB7 home visit \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E15\u0E34\u0E14\u0E1A\u0E49\u0E32\u0E19"
          })
        }
        const j = t.filter(m => /CKD/.test(m.disease_groups || "") && m.creatinine == null).length;
        if (j > 0) {
          const m = Math.round(j / Math.max(_, 1) * 100);
          o.push({
            sev: "med",
            cat: "Lab Monitoring Gap",
            msg: `CKD \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35 Cr \u0E43\u0E19 365 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14: ${j} \u0E23\u0E32\u0E22 (${m}% \u0E02\u0E2D\u0E07 CKD)`,
            action: "\u0E19\u0E31\u0E14 Cr/eGFR + UACR \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19 \xB7 \u0E15\u0E31\u0E49\u0E07 auto-reminder \u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A HOSxP \xB7 staging redo"
          })
        }
        const W = t.filter(m => {
          const O = (m.chief_complaint || "").toLowerCase();
          return /uncontrol|severe|crisis|admit|emergen|พบแพทย์|ฉุกเฉิน/.test(O)
        }).length;
        W > 0 && o.push({
          sev: "high",
          cat: "Disease Control",
          msg: `\u0E1E\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E04\u0E38\u0E21\u0E42\u0E23\u0E04\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E43\u0E19 CC: ${W} \u0E23\u0E32\u0E22`,
          action: "review medication adherence \xB7 titrate dose \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 intensive case management \xB7 admit \u0E2B\u0E32\u0E01\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19"
        });
        const B = t.filter(m => r > 0 && (m.income || 0) > r * 2.5).length;
        if (B > 0) {
          const m = Math.round(B / t.length * 100),
            O = t.filter(t0 => (t0.income || 0) > r * 2.5).reduce((t0, _0) => t0 + (_0.income || 0), 0);
          o.push({
            sev: "info",
            cat: "Cost Outlier",
            msg: `High-cost outliers (>2.5\xD7 avg): ${B} \u0E23\u0E32\u0E22 (${m}%) \u2014 \u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${O.toLocaleString()} \u0E1A\u0E32\u0E17`,
            action: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C resource drivers (lab/drug/imaging) \xB7 case management \xB7 \u0E43\u0E0A\u0E49 generic drugs \xB7 pharmacy intervention"
          })
        }
        const L = t.filter(m => /UC|บัตรทอง/i.test(m.pttype_name || "")).length;
        if (L > 0) {
          const m = Math.round(L / t.length * 100);
          o.push({
            sev: m > 80 ? "med" : "info",
            cat: "Payer Mix",
            msg: `UC/\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07: ${m}% (${L}/${t.length}) \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${r.toLocaleString()} \u0E1A\u0E32\u0E17/visit`,
            action: m > 80 ? "Cap budget pressure \u0E2A\u0E39\u0E07 \u2014 \u0E40\u0E19\u0E49\u0E19 disease management \u0E25\u0E14 admission \xB7 negotiate \u0E01\u0E31\u0E1A \u0E2A\u0E1B\u0E2A\u0E0A. \xB7 monitor budget impact \u0E02\u0E2D\u0E07 SGLT2i/GLP-1" : "\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2A\u0E21\u0E14\u0E38\u0E25 payer mix \xB7 monitor private/social-security trend"
          })
        }
        const R = {};
        t.forEach(m => {
          const O = (m.address || "").match(/ต\.([\u0E00-\u0E7F]+)/),
            t0 = O ? O[1] : "\u0E2D\u0E37\u0E48\u0E19\u0E46";
          R[t0] = (R[t0] || 0) + 1
        });
        const H = Object.entries(R).sort((m, O) => O[1] - m[1])[0];
        if (H && H[1] > t.length * .25) {
          const m = Math.round(H[1] / t.length * 100);
          o.push({
            sev: "info",
            cat: "Geographic Hotspot",
            msg: `\u0E15\u0E33\u0E1A\u0E25 ${H[0]} \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07: ${H[1]} \u0E23\u0E32\u0E22 (${m}%)`,
            action: "\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 community health worker / outreach NCD clinic \xB7 screening campaign \xB7 health literacy training \u0E43\u0E19\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48"
          })
        }
        const q = t.filter(m => /J45|J46/.test(m.icd10 || "")).length;
        if (q > 0) {
          const m = (F.COPD || 0) - q;
          o.push({
            sev: "info",
            cat: "Classification Note",
            msg: `\u0E01\u0E25\u0E38\u0E48\u0E21 "COPD" \u0E21\u0E35 Asthma (J45-46) \u0E1B\u0E19\u0E2D\u0E22\u0E39\u0E48 ${q} \u0E23\u0E32\u0E22 \u2014 COPD \u0E41\u0E17\u0E49: ${m} \u0E23\u0E32\u0E22`,
            action: "\u0E41\u0E22\u0E01 Asthma vs COPD \u0E43\u0E19 reporting \u0E40\u0E1E\u0E37\u0E48\u0E2D accuracy \u0E02\u0E2D\u0E07 NCD program \xB7 \u0E43\u0E0A\u0E49 inhaler protocol \u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19"
          })
        }
        o.push({
          sev: "info",
          cat: "Operational Forecast",
          msg: `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${a.toFixed(1)} visit/\u0E27\u0E31\u0E19 (${t.length} visit \u0E43\u0E19 ${$} \u0E27\u0E31\u0E19) \xB7 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E1B\u0E35 ~${g.toLocaleString()} visit`,
          action: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 manpower \xB7 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 drug stock \xB7 \u0E02\u0E22\u0E32\u0E22 slot \u0E0A\u0E48\u0E27\u0E07 peak (\u0E15.\u0E04.-\u0E01.\u0E1E.) \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 NCD clinic \u0E40\u0E1B\u0E34\u0E14\u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E1A\u0E48\u0E32\u0E22"
        });
        const r0 = t.filter(m => m.ckd_stage === "CKD3").length,
          o0 = t.filter(m => m.ckd_stage === "CKD4").length,
          T0 = t.filter(m => m.ckd_stage === "CKD5").length;
        if (r0 + o0 + T0 > 0) {
          const m = Math.round(r0 * .05),
            O = Math.round(o0 * .07),
            t0 = (T0 + O) * 936e3;
          o.push({
            sev: O > 0 ? "med" : "info",
            cat: "Projection \xB7 12 months",
            msg: `\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C: CKD3\u21924 ~${m} \u0E23\u0E32\u0E22 \xB7 CKD4\u2192ESRD ~${O} \u0E23\u0E32\u0E22 \xB7 ESRD \u0E23\u0E27\u0E21 ${T0+O} \u0E23\u0E32\u0E22 \u2192 HD cost ~${t0.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E1B\u0E35`,
            action: `\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 HD slot (~${T0+O} \u0E23\u0E32\u0E22) \xB7 vascular access creation \u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 counseling KT/PD options \xB7 negotiate \u0E01\u0E31\u0E1A \u0E2A\u0E1B\u0E2A\u0E0A. CAPD bag stock`
          })
        }
        const K0 = t.filter(m => {
          const O = m.disease_groups || "";
          return (Number(m.age_y) || 0) >= 60 && /HT/.test(O) && (/DM/.test(O) || /CKD/.test(O))
        }).length;
        if (K0 > 0) {
          const m = Math.round(K0 / t.length * 100);
          o.push({
            sev: "high",
            cat: "CV Risk Stratification",
            msg: `High CV risk (\u0E2D\u0E32\u0E22\u0E38\u226560 + HT + DM/CKD): ${K0} \u0E23\u0E32\u0E22 (${m}%)`,
            action: "Statin (LDL <70 mg/dL) \xB7 BP <130/80 \xB7 ASA primary prevention \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E15\u0E32\u0E21\u0E40\u0E04\u0E2A \xB7 ECG annually \xB7 counsel lifestyle"
          })
        }
        const J0 = (() => {
          const m = t.length > 0 ? t.filter(t0 => t0.creatinine != null).length / t.length : 0,
            O = _ > 0 ? 1 - T / _ : 1;
          return Math.round(m * 50 + O * 50)
        })();
        o.push({
          sev: J0 >= 80 ? "good" : J0 >= 60 ? "med" : "high",
          cat: "NCD Quality Score",
          msg: `NCD Quality Composite: ${J0}/100 (Lab monitoring + Severity mix)`,
          action: J0 < 60 ? "\u0E40\u0E1E\u0E34\u0E48\u0E21 annual lab screening \xB7 \u0E15\u0E31\u0E49\u0E07 quality improvement project \xB7 M&M conference \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A stage progression cases" : J0 < 80 ? "\u0E02\u0E22\u0E32\u0E22 screening coverage \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 case \u0E21\u0E35 CKD progression \xB7 maintain monitoring frequency" : "maintain current standard \xB7 \u0E40\u0E1C\u0E22\u0E41\u0E1E\u0E23\u0E48 best practice \u0E20\u0E32\u0E22\u0E43\u0E19\u0E41\u0E25\u0E30\u0E20\u0E32\u0E22\u0E19\u0E2D\u0E01"
        }), o.length === 0 && o.push({
          sev: "good",
          cat: "Overall",
          msg: "\u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D",
          action: "\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E21\u0E41\u0E1C\u0E19\u0E1B\u0E01\u0E15\u0E34 \xB7 maintain current protocols \xB7 routine quality monitoring"
        });
        const x = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 NCD", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D ICD-10", "Cr (mg/dL)", "eGFR", "CKD Stage", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          f = t.map(m => [m.no, m.pt_name, m.hn, m.sex, m.age_y ?? "", m.cid, m.pttype_name, m.vstdate, m.vsttime, m.department, m.address, m.mobile_phone_number, m.disease_groups, m.icd10, m.icd10name, m.creatinine ?? "", m.egfr ?? "", m.ckd_stage ?? "", m.income, m.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(m => m.x), bu([0, 1])).then(m => {
          const O = m.utils.book_new(),
            t0 = "Sarabun",
            _0 = 8,
            I = {
              purple: "A855F7",
              purpleDark: "7C3AED",
              blue: "2563EB",
              green: "10B981",
              greenDark: "047857",
              greenLight: "D1FAE5",
              amber: "F59E0B",
              amberDark: "B45309",
              amberLight: "FEF3C7",
              red: "DC2626",
              redLight: "FEE2E2",
              slate: "475569",
              slateDark: "1E293B",
              slateLight: "F1F5F9",
              slateSoft: "F8FAFC",
              white: "FFFFFF",
              text: "0F172A",
              muted: "64748B",
              stripe: "FAFBFC"
            },
            su = {
              style: "thin",
              color: {
                rgb: "E2E8F0"
              }
            },
            W0 = {
              style: "medium",
              color: {
                rgb: "CBD5E1"
              }
            },
            M0 = {
              top: su,
              bottom: su,
              left: su,
              right: su
            },
            iu = {},
            Pu = [],
            F0 = [],
            K = (V, d0, D0, B0) => {
              const L0 = typeof D0 == "number" ? "n" : "s";
              iu[m.utils.encode_cell({
                r: V,
                c: d0
              })] = B0 ? {
                v: D0,
                t: L0,
                s: B0
              } : {
                v: D0,
                t: L0
              }
            },
            n0 = (V, d0, D0, B0) => Pu.push({
              s: {
                r: V,
                c: d0
              },
              e: {
                r: D0,
                c: B0
              }
            }),
            fu = (V = 12) => {
              F0[d] = {
                hpx: V
              }, d++
            },
            cE = {
              font: {
                name: t0,
                sz: 22,
                bold: !0,
                color: {
                  rgb: I.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.purpleDark
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: {
                top: W0,
                bottom: W0,
                left: W0,
                right: W0
              }
            },
            pE = {
              font: {
                name: t0,
                sz: 11,
                color: {
                  rgb: I.white
                },
                italic: !0
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: "6D28D9"
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              }
            },
            hE = {
              font: {
                name: t0,
                sz: 9,
                color: {
                  rgb: I.muted
                },
                italic: !0
              },
              alignment: {
                horizontal: "right",
                vertical: "center",
                indent: 1
              }
            },
            yu = V => ({
              font: {
                name: t0,
                sz: 14,
                bold: !0,
                color: {
                  rgb: I.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: V
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                indent: 1
              },
              border: {
                bottom: W0
              }
            }),
            Ju = {
              font: {
                name: t0,
                sz: 11,
                bold: !0,
                color: {
                  rgb: I.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                indent: 2
              },
              border: M0
            },
            Qu = (V, d0) => ({
              font: {
                name: t0,
                sz: 18,
                bold: !0,
                color: {
                  rgb: V || I.text
                }
              },
              alignment: {
                horizontal: "right",
                vertical: "center",
                indent: 1
              },
              border: M0,
              numFmt: d0 || "#,##0"
            }),
            Zu = {
              font: {
                name: t0,
                sz: 10,
                color: {
                  rgb: I.muted
                },
                bold: !0
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                indent: 1
              },
              border: M0,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.slateSoft
                }
              }
            },
            uE = {
              font: {
                name: t0,
                sz: 10,
                color: {
                  rgb: I.muted
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: M0,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.slateSoft
                }
              }
            },
            P0 = V => ({
              font: {
                name: t0,
                sz: 11,
                bold: !0,
                color: {
                  rgb: I.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: V
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: !0
              },
              border: M0
            }),
            H0 = (V = {}) => ({
              font: {
                name: t0,
                sz: 10,
                color: {
                  rgb: I.text
                },
                ...V.font || {}
              },
              alignment: {
                horizontal: V.align || "left",
                vertical: "center",
                wrapText: !!V.wrap,
                indent: V.align === "left" ? 1 : 0
              },
              border: M0,
              fill: V.bg ? {
                patternType: "solid",
                fgColor: {
                  rgb: V.bg
                }
              } : void 0,
              numFmt: V.numFmt
            });
          let d = 0;
          K(d, 0, "\u{1FAC0}  \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04", cE), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 56
          }, d++, K(d, 0, `\u{1F4C5}  \u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25:  ${b0.date_range.start}  \u2192  ${b0.date_range.end}    \xB7    \u{1F465}  ${t.length.toLocaleString()} visit  /  ${w.toLocaleString()} \u0E23\u0E32\u0E22`, pE), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 28
          }, d++, K(d, 0, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D:  ${new Date().toLocaleString("th-TH")}    \xB7    ${b0.data_source||""}`, hE), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 18
          }, d++, fu(8), K(d, 0, "\u{1F4CA}  KPI \u0E2A\u0E23\u0E38\u0E1B", yu(I.purpleDark)), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 32
          }, d++;
          const gE = [
            ["\u0E08\u0E33\u0E19\u0E27\u0E19 Visit NCD", t.length, "\u0E04\u0E23\u0E31\u0E49\u0E07", I.purpleDark, "#,##0", "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E01\u0E32\u0E23\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E23\u0E27\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"],
            ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)", w, "\u0E23\u0E32\u0E22", I.purple, "#,##0", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25 \u0E19\u0E31\u0E1A 1 HN \u0E15\u0E48\u0E2D 1 \u0E04\u0E23\u0E31\u0E49\u0E07"],
            ["\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)", s, "\u0E1A\u0E32\u0E17", I.green, "#,##0.00", "\u0E22\u0E2D\u0E14 income \u0E08\u0E32\u0E01 vn_stat \u0E23\u0E27\u0E21\u0E17\u0E38\u0E01 visit"],
            ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit", r, "\u0E1A\u0E32\u0E17", I.blue, "#,##0.00", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 \u0E08\u0E33\u0E19\u0E27\u0E19 Visit"],
            ["\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E32\u0E22", c, "\u0E23\u0E32\u0E22", "0EA5E9", "#,##0", `${t.length>0?Math.round(c/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`],
            ["\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07", i, "\u0E23\u0E32\u0E22", "EC4899", "#,##0", `${t.length>0?Math.round(i/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`]
          ];
          for (const [V, d0, D0, B0, L0, pu] of gE) K(d, 0, V, Ju), n0(d, 0, d, 1), K(d, 2, d0, Qu(B0, L0)), n0(d, 2, d, 4), K(d, 5, D0, Zu), K(d, 6, pu, uE), n0(d, 6, d, 7), F0[d] = {
            hpx: 32
          }, d++;
          fu(12), K(d, 0, "\u{1FA7A}  \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 NCD", yu(I.blue)), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 32
          }, d++, K(d, 0, "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04", P0(I.blue)), K(d, 1, "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit", P0(I.blue)), n0(d, 1, d, 2), K(d, 3, "%", P0(I.blue)), n0(d, 3, d, 4), K(d, 5, "\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22 / ICD-10 Range", P0(I.blue)), n0(d, 5, d, 7), F0[d] = {
            hpx: 30
          }, d++;
          let EE = 0;
          for (const V of P) {
            const d0 = F[V] || 0,
              D0 = t.length > 0 ? d0 / t.length : 0,
              B0 = d0 > t.length * .3,
              L0 = EE % 2 === 1 ? I.stripe : void 0;
            K(d, 0, V, H0({
              font: {
                bold: !0,
                sz: 12,
                color: {
                  rgb: B0 ? I.purpleDark : I.text
                }
              },
              align: "center",
              bg: L0
            })), K(d, 1, d0, H0({
              align: "right",
              numFmt: "#,##0",
              font: {
                sz: 11,
                bold: !0
              },
              bg: L0
            })), n0(d, 1, d, 2), K(d, 3, D0, H0({
              align: "right",
              numFmt: "0.0%",
              font: {
                color: {
                  rgb: B0 ? I.green : I.slate
                },
                bold: B0,
                sz: 11
              },
              bg: L0
            })), n0(d, 3, d, 4), K(d, 5, v[V] || "", H0({
              align: "left",
              bg: L0
            })), n0(d, 5, d, 7), F0[d] = {
              hpx: 24
            }, d++, EE++
          }
          fu(12), K(d, 0, "\u{1FAD8}  \u0E2A\u0E23\u0E38\u0E1B CKD (eGFR-based \xB7 CKD-EPI 2009)", yu(I.green)), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 32
          }, d++;
          const xE = [
            ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", _, "\u0E23\u0E32\u0E22", I.green, "#,##0", "\u0E23\u0E27\u0E21 Stage 1-5 + \u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38 stage"],
            ["CKD \u0E17\u0E35\u0E48\u0E21\u0E35\u0E15\u0E23\u0E27\u0E08 Cr / eGFR", X.length, "\u0E23\u0E32\u0E22", I.green, "#,##0", `${_>0?Math.round(X.length/_*100):0}% \u0E02\u0E2D\u0E07 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`],
            ["eGFR \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", k ?? 0, "ml/min/1.73m\xB2", k != null && k < 60 ? I.amber : I.green, "#,##0", k != null && k < 60 ? "\u26A0 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34 (\u226560)" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"],
            ["CKD Stage 4-5 (severe)", T, "\u0E23\u0E32\u0E22", T > 0 ? I.red : I.green, "#,##0", T > 0 ? "\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Renal Replacement Therapy" : "\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E04\u0E2A severe"]
          ];
          for (const [V, d0, D0, B0, L0, pu] of xE) K(d, 0, V, Ju), n0(d, 0, d, 1), K(d, 2, d0, Qu(B0, L0)), n0(d, 2, d, 4), K(d, 5, D0, Zu), K(d, 6, pu, uE), n0(d, 6, d, 7), F0[d] = {
            hpx: 30
          }, d++;
          fu(12), K(d, 0, "\u{1F465}  \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38", yu(I.amber)), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 32
          }, d++, K(d, 0, "\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", P0(I.amber)), K(d, 1, "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit", P0(I.amber)), n0(d, 1, d, 3), K(d, 4, "%", P0(I.amber)), n0(d, 4, d, 5), K(d, 6, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38", P0(I.amber)), n0(d, 6, d, 7), F0[d] = {
            hpx: 30
          }, d++;
          let eE = 0;
          for (const [V, d0] of Object.entries(y)) {
            const D0 = eE % 2 === 1 ? I.stripe : void 0,
              B0 = V === "70+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \xB7 monitor frailty" : V === "60-69" ? "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E15\u0E2D\u0E19\u0E15\u0E49\u0E19" : V === "<40" ? "NCD \u0E43\u0E19\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19" : "";
            K(d, 0, V, H0({
              align: "center",
              font: {
                bold: !0,
                sz: 12
              },
              bg: D0
            })), K(d, 1, d0, H0({
              align: "right",
              numFmt: "#,##0",
              font: {
                sz: 11,
                bold: !0
              },
              bg: D0
            })), n0(d, 1, d, 3), K(d, 4, t.length > 0 ? d0 / t.length : 0, H0({
              align: "right",
              numFmt: "0.0%",
              font: {
                sz: 11
              },
              bg: D0
            })), n0(d, 4, d, 5), K(d, 6, B0, H0({
              align: "left",
              font: {
                sz: 9,
                color: {
                  rgb: I.muted
                }
              },
              bg: D0
            })), n0(d, 6, d, 7), F0[d] = {
              hpx: 24
            }, d++, eE++
          }
          fu(12), K(d, 0, "\u{1F3C6}  Top 10 ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22", yu(I.purple)), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 32
          }, d++, K(d, 0, "ICD-10", P0(I.purple)), K(d, 1, "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", P0(I.purple)), n0(d, 1, d, 5), K(d, 6, "\u0E08\u0E33\u0E19\u0E27\u0E19", P0(I.purple)), K(d, 7, "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)", P0(I.purple)), F0[d] = {
            hpx: 30
          }, d++;
          let tE = 0;
          for (const V of p) {
            const d0 = tE % 2 === 1 ? I.stripe : void 0;
            K(d, 0, V.code, H0({
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: I.purpleDark
                }
              },
              bg: d0
            })), K(d, 1, V.name || "\u2014", H0({
              align: "left",
              wrap: !0,
              bg: d0
            })), n0(d, 1, d, 5), K(d, 6, V.count, H0({
              align: "right",
              numFmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              },
              bg: d0
            })), K(d, 7, V.totalInc, H0({
              align: "right",
              numFmt: "#,##0.00",
              font: {
                color: {
                  rgb: I.green
                }
              },
              bg: d0
            })), F0[d] = {
              hpx: 26
            }, d++, tE++
          }
          fu(12), K(d, 0, "\u{1F4B3}  \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 (Top 10)", yu(I.slate)), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 32
          }, d++, K(d, 0, "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32", P0(I.slate)), n0(d, 0, d, 4), K(d, 5, "\u0E08\u0E33\u0E19\u0E27\u0E19", P0(I.slate)), K(d, 6, "%", P0(I.slate)), K(d, 7, "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)", P0(I.slate)), F0[d] = {
            hpx: 30
          }, d++;
          let rE = 0;
          for (const [V, d0] of A.slice(0, 10)) {
            const D0 = rE % 2 === 1 ? I.stripe : void 0;
            K(d, 0, V, H0({
              align: "left",
              wrap: !0,
              font: {
                sz: 10
              },
              bg: D0
            })), n0(d, 0, d, 4), K(d, 5, d0.count, H0({
              align: "right",
              numFmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              },
              bg: D0
            })), K(d, 6, t.length > 0 ? d0.count / t.length : 0, H0({
              align: "right",
              numFmt: "0.0%",
              font: {
                sz: 11
              },
              bg: D0
            })), K(d, 7, d0.income, H0({
              align: "right",
              numFmt: "#,##0.00",
              font: {
                color: {
                  rgb: I.green
                }
              },
              bg: D0
            })), F0[d] = {
              hpx: 26
            }, d++, rE++
          }
          fu(12), K(d, 0, "\u{1F916}  AI Insights & \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23", yu(I.red)), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 32
          }, d++, K(d, 0, "\u0E23\u0E30\u0E14\u0E31\u0E1A", P0(I.red)), K(d, 1, "\u0E2B\u0E21\u0E27\u0E14", P0(I.red)), n0(d, 1, d, 2), K(d, 3, "\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E1A", P0(I.red)), n0(d, 3, d, 4), K(d, 5, "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 / Action", P0(I.red)), n0(d, 5, d, 7), F0[d] = {
            hpx: 30
          }, d++;
          const oE = {
              critical: 0,
              high: 1,
              med: 2,
              info: 3,
              good: 4,
              low: 3
            },
            mE = [...o].sort((V, d0) => (oE[V.sev] ?? 9) - (oE[d0.sev] ?? 9)),
            iE = {
              critical: {
                label: "\u{1F534} CRITICAL",
                bg: I.redLight,
                fg: I.red
              },
              high: {
                label: "\u{1F7E0} HIGH",
                bg: "FED7AA",
                fg: "C2410C"
              },
              med: {
                label: "\u{1F7E1} MEDIUM",
                bg: I.amberLight,
                fg: I.amberDark
              },
              info: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: I.blue
              },
              good: {
                label: "\u{1F7E2} GOOD",
                bg: I.greenLight,
                fg: I.greenDark
              },
              low: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: I.blue
              }
            };
          for (const V of mE) {
            const d0 = iE[V.sev] || iE.info;
            K(d, 0, d0.label, {
              font: {
                name: t0,
                sz: 10,
                bold: !0,
                color: {
                  rgb: d0.fg
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: d0.bg
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: M0
            }), K(d, 1, V.cat, {
              font: {
                name: t0,
                sz: 10,
                bold: !0,
                color: {
                  rgb: I.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: M0
            }), n0(d, 1, d, 2), K(d, 3, V.msg, {
              font: {
                name: t0,
                sz: 10,
                bold: V.sev === "critical" || V.sev === "high",
                color: {
                  rgb: I.text
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: M0,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: d0.bg
                }
              }
            }), n0(d, 3, d, 4), K(d, 5, V.action, {
              font: {
                name: t0,
                sz: 10,
                color: {
                  rgb: I.slateDark
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: M0,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.slateSoft
                }
              }
            }), n0(d, 5, d, 7);
            const D0 = (V.action || "").length,
              B0 = (V.msg || "").length,
              L0 = Math.max(Math.ceil(D0 / 80), Math.ceil(B0 / 40), 2);
            F0[d] = {
              hpx: Math.min(120, 22 + L0 * 16)
            }, d++
          }
          fu(12), K(d, 0, "\u{1F4DA}  \u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E25\u0E38\u0E48\u0E21", yu(I.muted)), n0(d, 0, d, _0 - 1), F0[d] = {
            hpx: 30
          }, d++;
          const fE = [
            ["CKD-EPI 2009", "eGFR \u226590 \u2192 Stage 1  \xB7  60-89 \u2192 Stage 2  \xB7  30-59 \u2192 Stage 3  \xB7  15-29 \u2192 Stage 4  \xB7  <15 \u2192 Stage 5"],
            ["ICD-10 NCD (Specific)", "DM: E11 (Type 2)  \xB7  HT: I10 (Essential)  \xB7  DLP: E78  \xB7  IHD: I25 (Chronic)  \xB7  Stroke: I69 (Sequelae)  \xB7  COPD: J44  \xB7  CKD: N18.x"],
            ["\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "HOSxP XE \xB7 ovst + ovstdiag (main_dep=024) \xB7 \u0E01\u0E23\u0E2D\u0E07\u0E14\u0E49\u0E27\u0E22 NCD ICD-10 codes \xB7 CKD stage \u0E08\u0E32\u0E01 eGFR \u0E2B\u0E23\u0E37\u0E2D N18.x suffix"],
            ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
          ];
          for (const [V, d0] of fE) {
            const D0 = V === "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22",
              B0 = D0 ? I.greenDark : I.slateDark,
              L0 = D0 ? I.greenDark : I.muted,
              pu = D0 ? I.greenLight : I.slateSoft;
            K(d, 0, V, H0({
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: B0
                }
              },
              align: "left",
              bg: pu
            })), n0(d, 0, d, 1), K(d, 2, d0, H0({
              font: {
                sz: D0 ? 11 : 9,
                bold: D0,
                color: {
                  rgb: L0
                }
              },
              align: "left",
              wrap: !0,
              bg: pu
            })), n0(d, 2, d, 7), F0[d] = {
              hpx: 36
            }, d++
          }
          iu["!ref"] = m.utils.encode_range({
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: d - 1,
              c: _0 - 1
            }
          }), iu["!merges"] = Pu, iu["!cols"] = [{
            wch: 12
          }, {
            wch: 24
          }, {
            wch: 14
          }, {
            wch: 10
          }, {
            wch: 10
          }, {
            wch: 14
          }, {
            wch: 22
          }, {
            wch: 28
          }], iu["!rows"] = F0, iu["!freeze"] = {
            xSplit: 0,
            ySplit: 3
          }, m.utils.book_append_sheet(O, iu, "Overview");
          const _u = {};
          x.forEach((V, d0) => {
            _u[m.utils.encode_cell({
              r: 0,
              c: d0
            })] = {
              v: V,
              t: "s",
              s: {
                font: {
                  name: t0,
                  sz: 10,
                  bold: !0,
                  color: {
                    rgb: I.white
                  }
                },
                fill: {
                  patternType: "solid",
                  fgColor: {
                    rgb: I.slate
                  }
                },
                alignment: {
                  horizontal: "center",
                  vertical: "center",
                  wrapText: !0
                },
                border: M0
              }
            }
          }), f.forEach((V, d0) => {
            const D0 = d0 % 2 === 0 ? void 0 : "F8FAFC";
            V.forEach((B0, L0) => {
              const pu = typeof B0 == "number",
                Ku = L0 === 17,
                aE = L0 === 18,
                yE = L0 === 16;
              let Yu = D0,
                Gu = I.text;
              Ku && B0 && (Yu = B0 === "CKD5" ? I.redLight : B0 === "CKD4" ? "FED7AA" : B0 === "CKD3" ? "FEF3C7" : I.greenLight, Gu = B0 === "CKD5" ? I.red : B0 === "CKD4" ? "C2410C" : B0 === "CKD3" ? "B45309" : "047857"), yE && typeof B0 == "number" && (Gu = B0 < 30 ? I.red : B0 < 60 ? "B45309" : "047857"), _u[m.utils.encode_cell({
                r: d0 + 1,
                c: L0
              })] = {
                v: B0,
                t: pu ? "n" : "s",
                s: {
                  font: {
                    name: t0,
                    sz: 9,
                    bold: Ku || aE,
                    color: {
                      rgb: Gu
                    }
                  },
                  alignment: {
                    horizontal: pu ? "right" : "left",
                    vertical: "center",
                    wrapText: !1
                  },
                  border: M0,
                  fill: Yu ? {
                    patternType: "solid",
                    fgColor: {
                      rgb: Yu
                    }
                  } : void 0,
                  numFmt: aE ? "#,##0.00" : pu && !Ku ? "#,##0" : void 0
                }
              }
            })
          }), _u["!ref"] = m.utils.encode_range({
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: f.length,
              c: x.length - 1
            }
          }), _u["!cols"] = [6, 22, 10, 6, 6, 16, 24, 11, 9, 16, 30, 14, 18, 14, 30, 10, 9, 10, 11, 32].map(V => ({
            wch: V
          })), _u["!rows"] = [{
            hpx: 30
          }], _u["!freeze"] = {
            xSplit: 0,
            ySplit: 1
          }, m.utils.book_append_sheet(O, _u, "Patient Data"), m.writeFile(O, `BCH360_NCD_ByDisease_${h0}_${g0}.xlsx`)
        });
        return
      }
      if (n === "mortality") {
        if (!c0?.comparison) return;
        const t = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (${s0})`, `IPD \u0E15\u0E32\u0E22 (${s0})`, `IPD \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22% (${s0})`, `OPD \u0E15\u0E32\u0E22 (${s0})`, `\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 (${s0})`, `IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (${e0})`, `IPD \u0E15\u0E32\u0E22 (${e0})`, `IPD \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22% (${e0})`, `OPD \u0E15\u0E32\u0E22 (${e0})`, `\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 (${e0})`],
          s = c0.comparison.map(y => [y.month, y.fy1.ipd_discharge, y.fy1.ipd_deaths, y.fy1.ipd_mortality_rate, y.fy1.opd_deaths, y.fy1.total_deaths, y.fy2.ipd_discharge, y.fy2.ipd_deaths, y.fy2.ipd_mortality_rate, y.fy2.opd_deaths, y.fy2.total_deaths]),
          w = "\uFEFF" + [t.join(","), ...s.map(y => y.join(","))].join(`\r
`),
          r = new Blob([w], {
            type: "text/csv;charset=utf-8;"
          }),
          c = URL.createObjectURL(r),
          i = document.createElement("a");
        i.href = c, i.download = `BCH360_Mortality_${s0}_${e0}.csv`, i.click(), URL.revokeObjectURL(c)
      }
      if (n === "selfharm") {
        if (!Z0?.records) return;
        const t = Z0.records || [],
          s = w => w === "1" ? "\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22\u0E2B\u0E25\u0E31\u0E01" : w === "2" ? "\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22\u0E23\u0E2D\u0E07" : w === "5" ? "\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E20\u0E32\u0E22\u0E19\u0E2D\u0E01" : w || "-";
        du(() => import("./xlsx.min-CZi5yKex.js").then(w => w.x), bu([0])).then(w => {
          const r = w.x || w,
            c = ["\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23", "Source", "HN", "VN/AN", "\u0E0A\u0E37\u0E48\u0E2D-\u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04/\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38", "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 Diag", "\u0E41\u0E1C\u0E19\u0E01/\u0E27\u0E2D\u0E23\u0E4C\u0E14"],
            i = t.map(A => [String(A.service_date || "").slice(0, 10), A.source, A.hn, A.encounter, A.pt_name, A.icd10, A.dx_name, s(A.diagtype), A.dept_name]),
            y = r.utils.aoa_to_sheet([c, ...i]);
          y["!cols"] = c.map((A, _) => ({
            wch: Math.min(Math.max(A.length, ...i.map(z => String(z[_] ?? "").length)) + 2, 40)
          }));
          const h = r.utils.book_new();
          r.utils.book_append_sheet(h, y, "SelfHarm X60-X84"), r.writeFile(h, `BCH360_SelfHarm_${h0}_${g0}.xlsx`)
        })
      }
    }, [n, M, S, Eu, G0, c0, S0, J, v0, w0, b0, l0, u0, gu, Z0, s0, e0, h0, g0, Du, O0]),
    qu = Z.useMemo(() => {
      const e = [];
      for (let t = mu; t >= mu - 2; t--) e.push(t);
      return e
    }, [mu]),
    E = vE;
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
        children: "REPORT Online \u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07"
      }), u.jsx("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(2,132,199,.1)",
          color: "#0284c7"
        },
        children: n === "ipd-compare" ? "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD)" : n === "opd-compare" ? "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (OPD)" : n === "resource-opd" ? "\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (Lab/Drug/CT-Xray)" : n === "resource-ipd" ? "\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (Lab/Drug/CT-Xray)" : n === "frax" ? "FRAX Calculator (\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2B\u0E31\u0E01)" : n === "pt" ? "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 \u0E41\u0E25\u0E30 PMC" : n === "staff-services" ? "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : n === "fluoride" ? "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C 25-59 \u0E1B\u0E35" : n === "elderly-cxr" ? "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E17\u0E35\u0E48\u0E21\u0E35 CXR" : n === "ncd-disease" ? "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04" : n === "imaging-services" ? "\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 XRAY / CT / Portable / BMD" : "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 (OPD / IPD)"
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
      children: [u.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)"
        },
        children: "\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19"
      }), u.jsxs("select", {
        value: n,
        onChange: e => f0(e.target.value),
        style: {
          padding: "6px 12px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "13px",
          fontWeight: 700,
          background: "var(--md-surface)",
          color: "var(--md-text-primary)"
        },
        children: [u.jsx("option", {
          value: "opd-compare",
          children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (OPD)"
        }), u.jsx("option", {
          value: "ipd-compare",
          children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD)"
        }), u.jsx("option", {
          value: "resource-opd",
          children: "\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (Lab/Drug/CT-Xray)"
        }), u.jsx("option", {
          value: "resource-ipd",
          children: "\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (Lab/Drug/CT-Xray)"
        }), u.jsx("option", {
          value: "mortality",
          children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 (OPD / IPD)"
        }), u.jsx("option", {
          value: "frax",
          children: "FRAX Calculator (\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2B\u0E31\u0E01)"
        }), u.jsx("option", {
          value: "pt",
          children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 \u0E41\u0E25\u0E30 PMC"
        }), u.jsx("option", {
          value: "staff-services",
          children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23"
        }), u.jsx("option", {
          value: "fluoride",
          children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C 25-59 \u0E1B\u0E35"
        }), u.jsx("option", {
          value: "elderly-cxr",
          children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E17\u0E35\u0E48\u0E21\u0E35 CXR"
        }), u.jsx("option", {
          value: "ncd-disease",
          children: "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04"
        }), u.jsx("option", {
          value: "imaging-services",
          children: "\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 XRAY / CT / Portable / BMD"
        }), u.jsx("option", {
          value: "pttype-services",
          children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
        })]
      }), n === "ipd-compare" ? u.jsxs(u.Fragment, {
        children: [u.jsx("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)"
          },
          children: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"
        }), u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px"
          },
          children: [u.jsx("input", {
            type: "date",
            value: Du,
            onChange: e => Wu(e.target.value),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            }
          }), u.jsx("span", {
            style: {
              fontWeight: 800,
              color: "var(--md-text-tertiary)"
            },
            children: "\u0E16\u0E36\u0E07"
          }), u.jsx("input", {
            type: "date",
            value: O0,
            onChange: e => Nu(e.target.value),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            }
          })]
        }), u.jsx("span", {
          style: {
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            background: "rgba(124,58,237,.06)",
            padding: "3px 8px",
            borderRadius: "99px"
          },
          children: "vs \u0E0A\u0E48\u0E27\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 (\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34)"
        })]
      }) : n === "opd-compare" ? u.jsxs(u.Fragment, {
        children: [u.jsx("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)"
          },
          children: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"
        }), u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px"
          },
          children: [u.jsx("input", {
            type: "date",
            value: h0,
            onChange: e => Tu(e.target.value),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            }
          }), u.jsx("span", {
            style: {
              fontWeight: 800,
              color: "var(--md-text-tertiary)"
            },
            children: "\u0E16\u0E36\u0E07"
          }), u.jsx("input", {
            type: "date",
            value: g0,
            onChange: e => Mu(e.target.value),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            }
          })]
        }), u.jsx("span", {
          style: {
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            background: "rgba(16,185,129,.06)",
            padding: "3px 8px",
            borderRadius: "99px"
          },
          children: "vs \u0E0A\u0E48\u0E27\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 (\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34)"
        })]
      }) : n === "frax" || n === "pt" || n === "staff-services" || n === "fluoride" || n === "elderly-cxr" || n === "ncd-disease" || n === "imaging-services" || n === "pttype-services" || n === "selfharm" ? u.jsxs(u.Fragment, {
        children: [u.jsx("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)"
          },
          children: "\u0E0A\u0E48\u0E27\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"
        }), u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px"
          },
          children: [u.jsx("input", {
            type: "date",
            value: h0,
            onChange: e => Tu(e.target.value),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            }
          }), u.jsx("span", {
            style: {
              fontWeight: 800,
              color: "var(--md-text-tertiary)"
            },
            children: "\u0E16\u0E36\u0E07"
          }), u.jsx("input", {
            type: "date",
            value: g0,
            onChange: e => Mu(e.target.value),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            }
          })]
        })]
      }) : u.jsxs(u.Fragment, {
        children: [u.jsx("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)"
          },
          children: "\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13"
        }), u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px"
          },
          children: [u.jsx("select", {
            value: s0,
            onChange: e => Ru(Number(e.target.value)),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            },
            children: qu.map(e => u.jsxs("option", {
              value: e,
              children: ["\u0E1B\u0E35\u0E07\u0E1A ", e]
            }, e))
          }), u.jsx("span", {
            style: {
              fontWeight: 800,
              color: "var(--md-text-tertiary)"
            },
            children: "vs"
          }), u.jsx("select", {
            value: e0,
            onChange: e => Lu(Number(e.target.value)),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            },
            children: qu.map(e => u.jsxs("option", {
              value: e,
              children: ["\u0E1B\u0E35\u0E07\u0E1A ", e]
            }, e))
          })]
        })]
      }), u.jsx("button", {
        onClick: () => n === "ipd-compare" ? G() : n === "opd-compare" ? k0() : n === "resource-opd" ? U0() : n === "resource-ipd" ? q0() : n === "frax" ? Bu() : n === "pt" ? Su() : n === "staff-services" ? $u() : n === "fluoride" ? ju() : n === "elderly-cxr" ? nu() : n === "ncd-disease" ? lu() : n === "imaging-services" ? Hu() : n === "pttype-services" ? Xu() : n === "selfharm" ? selfharmFetch() : ru(),
        disabled: C0,
        style: {
          padding: "6px 16px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #0284c7, #7c3aed)",
          color: "#fff",
          opacity: C0 ? .5 : 1
        },
        children: C0 ? "Loading..." : "\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
      }), u.jsx("button", {
        onClick: sE,
        disabled: n === "ipd-compare" ? !M : n === "opd-compare" ? !S : n === "resource-opd" ? !Eu : n === "resource-ipd" ? !G0 : n === "frax" ? !S0 : n === "pt" || n === "staff-services" ? !J : n === "fluoride" ? !v0 : n === "elderly-cxr" ? !w0 : n === "ncd-disease" ? !b0?.patients : n === "imaging-services" ? !l0?.patients : n === "pttype-services" ? !u0?.groups : n === "selfharm" ? !Z0 : !c0,
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)",
          cursor: "pointer"
        },
        children: "Print"
      }), u.jsx("button", {
        onClick: dE,
        disabled: n === "ipd-compare" ? !M : n === "opd-compare" ? !S : n === "resource-opd" ? !Eu : n === "resource-ipd" ? !G0 : n === "frax" ? !S0 : n === "pt" || n === "staff-services" ? !J : n === "fluoride" ? !v0 : n === "elderly-cxr" ? !w0 : n === "ncd-disease" ? !b0?.patients : n === "imaging-services" ? !l0?.patients : n === "pttype-services" ? !u0?.groups : n === "selfharm" ? !Z0 : !c0,
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)",
          cursor: "pointer"
        },
        children: n === "frax" || n === "pt" || n === "staff-services" || n === "fluoride" || n === "elderly-cxr" || n === "ipd-compare" || n === "opd-compare" || n === "resource-opd" || n === "resource-ipd" || n === "ncd-disease" || n === "imaging-services" || n === "pttype-services" || n === "selfharm" ? "Excel" : "CSV"
      }), u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginLeft: "4px",
          borderLeft: "1px solid var(--md-border)",
          paddingLeft: "12px"
        },
        children: [u.jsx("span", {
          style: {
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--md-text-tertiary)"
          },
          children: "\u0E41\u0E2A\u0E14\u0E07"
        }), u.jsxs("select", {
          value: z0,
          onChange: e => Ou(e.target.value === "all" ? "all" : Number(e.target.value)),
          style: {
            padding: "5px 10px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 700,
            background: "var(--md-surface)",
            color: "var(--md-text-primary)",
            cursor: "pointer"
          },
          children: [u.jsx("option", {
            value: 10,
            children: "10 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"
          }), u.jsx("option", {
            value: 50,
            children: "50 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"
          }), u.jsx("option", {
            value: 100,
            children: "100 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"
          }), u.jsx("option", {
            value: "all",
            children: "\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
          })]
        })]
      })]
    }), eu && u.jsx("div", {
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(239,68,68,.08)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: eu
    }), C0 && u.jsx("div", {
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
        children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19..."
      })
    }), !C0 && n === "ipd-compare" && M?.comparison && (() => {
      const e = M.fy1_totals,
        t = M.fy2_totals,
        s = (r, c) => r > 0 ? Math.round((c - r) / r * 100) : 0,
        w = [{
          label: "Admit",
          pct: s(e.admits, t.admits),
          v1: e.admits,
          v2: t.admits
        }, {
          label: "Discharge",
          pct: s(e.discharges, t.discharges),
          v1: e.discharges,
          v2: t.discharges
        }, {
          label: "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19",
          pct: s(e.total_los, t.total_los),
          v1: e.total_los,
          v2: t.total_los
        }, {
          label: "ALOS",
          pct: s(e.alos, t.alos),
          v1: e.alos,
          v2: t.alos,
          dec: 2
        }, {
          label: "\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 %",
          pct: s(e.occupancy_rate, t.occupancy_rate),
          v1: e.occupancy_rate,
          v2: t.occupancy_rate,
          dec: 1
        }, {
          label: "Active Bed",
          pct: s(e.active_beds, t.active_beds),
          v1: e.active_beds,
          v2: t.active_beds,
          dec: 1
        }, {
          label: "Sum AdjRW",
          pct: s(e.sum_adjrw, t.sum_adjrw),
          v1: e.sum_adjrw,
          v2: t.sum_adjrw,
          dec: 1
        }, {
          label: "CMI",
          pct: s(e.cmi, t.cmi),
          v1: e.cmi,
          v2: t.cmi,
          dec: 2
        }];
      return u.jsxs("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)",
            marginBottom: "4px"
          },
          children: ["\u0E2A\u0E23\u0E38\u0E1B YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (", M.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49)"]
        }), u.jsxs("div", {
          style: {
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap"
          },
          children: [u.jsxs("span", {
            style: {
              padding: "2px 8px",
              borderRadius: "6px",
              background: "rgba(37,99,235,.08)",
              color: "#2563eb",
              fontWeight: 700
            },
            children: [M.fiscal_years.fy1.start, " \u2014 ", M.fiscal_years.fy1.end]
          }), u.jsx("span", {
            style: {
              fontWeight: 800,
              color: "var(--md-text-tertiary)"
            },
            children: "vs"
          }), u.jsxs("span", {
            style: {
              padding: "2px 8px",
              borderRadius: "6px",
              background: "rgba(219,39,119,.08)",
              color: "#db2777",
              fontWeight: 700
            },
            children: [M.fiscal_years.fy2.start, " \u2014 ", M.fiscal_years.fy2.end]
          })]
        }), u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px"
          },
          children: w.map((r, c) => u.jsxs("div", {
            style: {
              padding: "10px 12px",
              borderRadius: "10px",
              background: r.pct > 0 ? "rgba(16,185,129,.06)" : r.pct < 0 ? "rgba(244,63,94,.06)" : "rgba(148,163,184,.06)",
              border: `1px solid ${r.pct>0?"rgba(16,185,129,.15)":r.pct<0?"rgba(244,63,94,.15)":"rgba(148,163,184,.15)"}`
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                marginBottom: "4px"
              },
              children: r.label
            }), u.jsxs("div", {
              style: {
                fontSize: "18px",
                fontWeight: 900,
                color: r.pct > 0 ? "#10b981" : r.pct < 0 ? "#f43f5e" : "var(--md-text-secondary)"
              },
              children: [r.pct > 0 ? "\u25B2" : r.pct < 0 ? "\u25BC" : "", " ", Math.abs(r.pct), "%"]
            }), u.jsxs("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "2px"
              },
              children: [l(r.v1, r.dec || 0), " \u2192 ", l(r.v2, r.dec || 0)]
            })]
          }, c))
        }), (() => {
          const r = M.fy1_totals,
            c = M.fy2_totals,
            i = (o, $) => o > 0 ? Math.round(($ - o) / o * 100) : 0,
            y = i(r.admits, c.admits),
            h = i(r.discharges, c.discharges),
            A = i(r.total_los, c.total_los),
            _ = i(r.alos, c.alos);
          i(r.occupancy_rate, c.occupancy_rate);
          const z = i(r.sum_adjrw, c.sum_adjrw),
            k = i(r.cmi, c.cmi),
            T = M.comparable_months || 0,
            P = M.custom_range ? `${M.custom_range.start} \u2014 ${M.custom_range.end}` : M.fiscal_years?.fy2?.label || "",
            v = [],
            F = c.admits - c.discharges,
            X = r.discharges > 0 ? r.sum_adjrw / r.discharges : 0,
            p = c.discharges > 0 ? c.sum_adjrw / c.discharges : 0;
          M.total_beds * 30 * T, y < -5 ? v.push({
            icon: "\u{1F4C9}",
            color: "#dc2626",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E25\u0E14\u0E25\u0E07 ${Math.abs(y)}%`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${l(r.admits)} \u2192 ${l(c.admits)} \u0E23\u0E32\u0E22 (\u0E25\u0E14 ${l(Math.abs(c.admits-r.admits))} \u0E23\u0E32\u0E22) \xB7 D/C ${l(r.discharges)} \u2192 ${l(c.discharges)} \u0E23\u0E32\u0E22 (${h>=0?"+":""}${h}%) \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19${Math.abs(y)>15?"\u0E25\u0E14\u0E25\u0E07\u0E21\u0E32\u0E01":"\u0E25\u0E14\u0E25\u0E07"} \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E25\u0E30\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E42\u0E14\u0E22\u0E15\u0E23\u0E07`,
            actions: [{
              who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
              what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Admit Criteria \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E21\u0E35\u0E40\u0E04\u0E2A Severity \u0E2A\u0E39\u0E07\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E14\u0E39\u0E41\u0E25\u0E41\u0E1A\u0E1A OPD Observation \u0E41\u0E17\u0E19 Admit \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \u0E2B\u0E32\u0E01\u0E1E\u0E1A \u0E43\u0E2B\u0E49\u0E1B\u0E23\u0E31\u0E1A Protocol \u0E43\u0E2B\u0E49 Admit \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22"
            }, {
              who: "\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D",
              what: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Refer Out \u2014 \u0E14\u0E36\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Refer Out \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E42\u0E23\u0E04/\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \u0E2B\u0E32\u0E01\u0E1E\u0E1A\u0E27\u0E48\u0E32\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 \u0E23\u0E1E. \u0E21\u0E35\u0E28\u0E31\u0E01\u0E22\u0E20\u0E32\u0E1E\u0E14\u0E39\u0E41\u0E25\u0E44\u0E14\u0E49 \u0E43\u0E2B\u0E49\u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14 Unnecessary Refer"
            }, {
              who: "PCU/\u0E40\u0E27\u0E0A\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E0A\u0E38\u0E21\u0E0A\u0E19",
              what: "\u0E40\u0E1E\u0E34\u0E48\u0E21 Refer Back \u2014 \u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 \u0E23\u0E1E.\u0E2A\u0E15./PCU \u0E43\u0E19\u0E40\u0E04\u0E23\u0E37\u0E2D\u0E02\u0E48\u0E32\u0E22\u0E43\u0E2B\u0E49\u0E2A\u0E48\u0E07\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07 Admit \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E14\u0E39\u0E41\u0E25 \u0E41\u0E17\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D \u0E23\u0E1E.\u0E41\u0E21\u0E48\u0E02\u0E48\u0E32\u0E22 \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30 NCD \u0E17\u0E35\u0E48\u0E21\u0E35 Complication"
            }]
          }) : y > 5 ? v.push({
            icon: "\u{1F4C8}",
            color: "#16a34a",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${y}%`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${l(r.admits)} \u2192 ${l(c.admits)} \u0E23\u0E32\u0E22 (\u0E40\u0E1E\u0E34\u0E48\u0E21 ${l(c.admits-r.admits)} \u0E23\u0E32\u0E22) \u2014 \u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19\u0E41\u0E25\u0E30\u0E40\u0E15\u0E35\u0E22\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A`,
            actions: [{
              who: "\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32 Ward",
              what: "Bed Management \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E40\u0E15\u0E35\u0E22\u0E07\u0E27\u0E48\u0E32\u0E07 Real-time \u0E17\u0E38\u0E01 4 \u0E0A\u0E21. / \u0E08\u0E31\u0E14\u0E40\u0E27\u0E23\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07 Peak (\u0E08\u0E31\u0E19\u0E17\u0E23\u0E4C-\u0E1E\u0E38\u0E18)"
            }, {
              who: "\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
              what: "\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E41\u0E1C\u0E19\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E33\u0E23\u0E2D\u0E07 \u2014 \u0E2B\u0E32\u0E01\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 >85% \u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E19 3 \u0E27\u0E31\u0E19 \u0E43\u0E2B\u0E49\u0E40\u0E1B\u0E34\u0E14 Ward \u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E17\u0E31\u0E19\u0E17\u0E35 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E40\u0E1E\u0E34\u0E48\u0E21"
            }, {
              who: "ER/OPD",
              what: "Admission Flow \u2014 \u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E27\u0E25\u0E32 Admit \u0E43\u0E2B\u0E49\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E40\u0E15\u0E35\u0E22\u0E07\u0E27\u0E48\u0E32\u0E07 \u0E25\u0E14 Boarding Time \u0E43\u0E19 ER"
            }]
          }) : v.push({
            icon: "\u27A1\uFE0F",
            color: "var(--md-text-tertiary)",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E17\u0E23\u0E07\u0E15\u0E31\u0E27 (${y>=0?"+":""}${y}%)`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${l(c.admits)} \u0E23\u0E32\u0E22 \xB7 D/C ${l(c.discharges)} \u0E23\u0E32\u0E22 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23`,
            actions: []
          }), F > 20 && v.push({
            icon: "\u26A0\uFE0F",
            color: "#f59e0b",
            title: `Admit \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 D/C ${l(F)} \u0E23\u0E32\u0E22 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2A\u0E30\u0E2A\u0E21\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A`,
            detail: `Admit ${l(c.admits)} vs D/C ${l(c.discharges)} \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E43\u0E2B\u0E49\u0E40\u0E15\u0E35\u0E22\u0E07\u0E40\u0E15\u0E47\u0E21\u0E40\u0E23\u0E47\u0E27\u0E02\u0E36\u0E49\u0E19\u0E41\u0E25\u0E30 Workload \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2A\u0E39\u0E07`,
            actions: [{
              who: "\u0E17\u0E35\u0E21 D/C Planning",
              what: "Multidisciplinary Round \u0E17\u0E38\u0E01 08:30 \u0E19. \u2014 \u0E41\u0E1E\u0E17\u0E22\u0E4C + \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 + \u0E19\u0E31\u0E01\u0E2A\u0E31\u0E07\u0E04\u0E21 + \u0E40\u0E20\u0E2A\u0E31\u0E0A \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22\u0E17\u0E35\u0E48\u0E19\u0E2D\u0E19 >3 \u0E27\u0E31\u0E19 \u0E01\u0E33\u0E2B\u0E19\u0E14 Expected D/C Date \u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19"
            }, {
              who: "\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 Ward",
              what: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Barrier to Discharge \u0E17\u0E38\u0E01\u0E27\u0E31\u0E19 \u2014 \u0E23\u0E2D\u0E1C\u0E25 Lab (\u0E41\u0E08\u0E49\u0E07 Lab \u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19) / \u0E23\u0E2D\u0E22\u0E32\u0E01\u0E25\u0E31\u0E1A\u0E1A\u0E49\u0E32\u0E19 (\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E08\u0E31\u0E14\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32) / \u0E23\u0E2D\u0E0D\u0E32\u0E15\u0E34 (\u0E42\u0E17\u0E23\u0E19\u0E31\u0E14\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 1 \u0E27\u0E31\u0E19)"
            }, {
              who: "\u0E2A\u0E31\u0E07\u0E04\u0E21\u0E2A\u0E07\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C",
              what: "\u0E40\u0E04\u0E2A Social Admission \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E1E\u0E23\u0E49\u0E2D\u0E21 D/C \u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E14\u0E39\u0E41\u0E25 \u0E43\u0E2B\u0E49\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 \u0E2D\u0E1A\u0E15./\u0E40\u0E17\u0E28\u0E1A\u0E32\u0E25 \u0E08\u0E31\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 Home Care"
            }]
          }), _ > 5 ? v.push({
            icon: "\u23F1\uFE0F",
            color: "#f59e0b",
            title: `ALOS \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${_}% (${l(r.alos,2)} \u2192 ${l(c.alos,2)} \u0E27\u0E31\u0E19)`,
            detail: `\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E23\u0E27\u0E21 ${l(r.total_los)} \u2192 ${l(c.total_los)} \u0E27\u0E31\u0E19 (${A>=0?"+":""}${A}%) \u2014 \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E22\u0E32\u0E27\u0E02\u0E36\u0E49\u0E19\u0E41\u0E21\u0E49\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14\u0E25\u0E07 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32 Discharge \u0E0A\u0E49\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D\u0E21\u0E35\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19`,
            actions: [{
              who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
              what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway \u2014 Top 5 DRG \u0E17\u0E35\u0E48\u0E21\u0E35 ALOS \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32 Benchmark \u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 \u0E1B\u0E23\u0E31\u0E1A Protocol \u0E43\u0E2B\u0E49 Lean \u0E02\u0E36\u0E49\u0E19 \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E42\u0E23\u0E04 Pneumonia, Heart Failure, COPD"
            }, {
              who: "\u0E28\u0E31\u0E25\u0E22\u0E01\u0E23\u0E23\u0E21",
              what: "Fast-track Day Surgery \u2014 \u0E40\u0E04\u0E2A Appendectomy, Hernia, Cataract \u0E43\u0E2B\u0E49 D/C \u0E20\u0E32\u0E22\u0E43\u0E19 24 \u0E0A\u0E21. \u0E2B\u0E32\u0E01\u0E44\u0E21\u0E48\u0E21\u0E35 Complication \u0E25\u0E14 ALOS \u0E44\u0E14\u0E49 0.3-0.5 \u0E27\u0E31\u0E19/\u0E23\u0E32\u0E22"
            }, {
              who: "\u0E40\u0E27\u0E0A\u0E23\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19",
              what: "\u0E41\u0E22\u0E01 Social LOS \u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01 Medical LOS \u2014 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E27\u0E48\u0E32\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E2A\u0E48\u0E27\u0E19\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2B\u0E23\u0E37\u0E2D\u0E2A\u0E31\u0E07\u0E04\u0E21 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E41\u0E01\u0E49\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E15\u0E23\u0E07\u0E08\u0E38\u0E14"
            }, {
              who: "\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 Ward",
              what: "\u0E40\u0E23\u0E34\u0E48\u0E21 D/C Planning \u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E27\u0E31\u0E19 Admit \u2014 \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 Expected D/C Date \u0E20\u0E32\u0E22\u0E43\u0E19 24 \u0E0A\u0E21. \u0E41\u0E23\u0E01 + \u0E41\u0E08\u0E49\u0E07\u0E0D\u0E32\u0E15\u0E34\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E15\u0E31\u0E27"
            }]
          }) : _ < -5 ? v.push({
            icon: "\u2705",
            color: "#16a34a",
            title: `ALOS \u0E25\u0E14\u0E25\u0E07 ${Math.abs(_)}% \u2014 D/C Planning \u0E21\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E`,
            detail: `ALOS ${l(r.alos,2)} \u2192 ${l(c.alos,2)} \u0E27\u0E31\u0E19 \u2014 \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35\u0E02\u0E36\u0E49\u0E19 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Readmission Rate \u0E44\u0E21\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 (D/C \u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B)`,
            actions: [{
              who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
              what: "Monitor Readmission \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 Readmission \u0E20\u0E32\u0E22\u0E43\u0E19 28 \u0E27\u0E31\u0E19 \u0E2B\u0E32\u0E01 Rate >5% \u0E43\u0E2B\u0E49\u0E17\u0E1A\u0E17\u0E27\u0E19 D/C criteria \u0E27\u0E48\u0E32\u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48"
            }]
          }) : v.push({
            icon: "\u27A1\uFE0F",
            color: "var(--md-text-tertiary)",
            title: `ALOS \u0E17\u0E23\u0E07\u0E15\u0E31\u0E27 ${l(c.alos,2)} \u0E27\u0E31\u0E19 (${_>=0?"+":""}${_}%)`,
            detail: `\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E23\u0E27\u0E21 ${l(c.total_los)} \u0E27\u0E31\u0E19 \u2014 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19`,
            actions: []
          });
          {
            const o = [];
            y < 0 && o.push(`Volume \u0E25\u0E14 ${Math.abs(y)}%`), k < -5 && o.push(`CMI \u0E25\u0E14 ${Math.abs(k)}%`), z < -10 ? v.push({
              icon: "\u{1F4B0}",
              color: "#dc2626",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E25\u0E14\u0E25\u0E07 ${Math.abs(z)}% \u2014 ${o.join(" + ")||"\u0E15\u0E49\u0E2D\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21"}`,
              detail: `AdjRW ${l(r.sum_adjrw,1)} \u2192 ${l(c.sum_adjrw,1)} (\u0E25\u0E14 ${l(Math.abs(c.sum_adjrw-r.sum_adjrw),1)}) \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${X.toFixed(2)} \u2192 ${p.toFixed(2)} \xB7 CMI ${l(r.cmi,2)} \u2192 ${l(c.cmi,2)} \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32 Case-mix \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07`,
              actions: [{
                who: "\u0E17\u0E35\u0E21 Coding/DRG",
                what: "Audit Under-coding \u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 \u2014 \u0E2A\u0E38\u0E48\u0E21 Audit 20% \u0E02\u0E2D\u0E07\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 RW < 0.5 \u0E15\u0E23\u0E27\u0E08\u0E27\u0E48\u0E32 Coding \u0E04\u0E23\u0E1A\u0E17\u0E38\u0E01 Diagnosis (CC/MCC), \u0E43\u0E2A\u0E48 Principal Dx \u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07, \u0E44\u0E21\u0E48\u0E02\u0E32\u0E14 Procedure Code \u0E2A\u0E33\u0E04\u0E31\u0E0D \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22: \u0E40\u0E1E\u0E34\u0E48\u0E21 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 10-15%"
              }, {
                who: "\u0E41\u0E1E\u0E17\u0E22\u0E4C + Coder",
                what: "\u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21 DRG Conference \u0E17\u0E38\u0E01 2 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E40\u0E04\u0E2A High-cost \u0E17\u0E35\u0E48\u0E44\u0E14\u0E49 RW \u0E15\u0E48\u0E33, \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 Diagnosis \u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19\u0E43\u0E19 Discharge Summary, \u0E1D\u0E36\u0E01 Coder \u0E43\u0E2B\u0E21\u0E48\u0E08\u0E31\u0E1A\u0E04\u0E39\u0E48\u0E01\u0E31\u0E1A Senior Coder"
              }, {
                who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19",
                what: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E40\u0E1A\u0E34\u0E01/\u0E40\u0E1A\u0E34\u0E01\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (UC/\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19\u0E2A\u0E31\u0E07\u0E04\u0E21/\u0E02\u0E49\u0E32\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23/\u0E08\u0E48\u0E32\u0E22\u0E40\u0E2D\u0E07) \u0E15\u0E32\u0E21\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48\u0E04\u0E49\u0E32\u0E07\u0E40\u0E1A\u0E34\u0E01 \u0E25\u0E14\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2B\u0E25\u0E38\u0E14\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A"
              }, {
                who: "\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
                what: "\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E28\u0E31\u0E01\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u2014 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Top 10 DRG \u0E17\u0E35\u0E48 Refer Out \u0E27\u0E48\u0E32 \u0E23\u0E1E. \u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E23\u0E31\u0E1A\u0E14\u0E39\u0E41\u0E25\u0E40\u0E2D\u0E07\u0E44\u0E14\u0E49\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \u0E2B\u0E32\u0E01\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49 \u0E08\u0E30\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E31\u0E49\u0E07 Volume \u0E41\u0E25\u0E30 CMI \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19"
              }]
            }) : z > 10 ? v.push({
              icon: "\u{1F4B0}",
              color: "#16a34a",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${z}%`,
              detail: `AdjRW ${l(r.sum_adjrw,1)} \u2192 ${l(c.sum_adjrw,1)} \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${X.toFixed(2)} \u2192 ${p.toFixed(2)} \u2014 ${k>5?"Case-mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19":"\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21"}`,
              actions: [{
                who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
                what: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Readmission Rate \u2014 \u0E40\u0E21\u0E37\u0E48\u0E2D CMI \u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E31\u0E48\u0E19\u0E43\u0E08\u0E27\u0E48\u0E32\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 D/C \u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E41\u0E25\u0E49\u0E27\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 Admit \u0E0B\u0E49\u0E33"
              }, {
                who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
                what: "\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E17\u0E35\u0E21\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Staffing Ratio, \u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C, \u0E22\u0E32 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A High RW"
              }]
            }) : z < 0 && v.push({
              icon: "\u{1F4B0}",
              color: "#f59e0b",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E25\u0E14\u0E25\u0E07\u0E40\u0E25\u0E47\u0E01\u0E19\u0E49\u0E2D\u0E22 ${Math.abs(z)}%`,
              detail: `AdjRW ${l(r.sum_adjrw,1)} \u2192 ${l(c.sum_adjrw,1)} \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${X.toFixed(2)} \u2192 ${p.toFixed(2)}`,
              actions: [{
                who: "\u0E17\u0E35\u0E21 Coding",
                what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Coding Quality \u2014 \u0E2A\u0E38\u0E48\u0E21 Audit \u0E40\u0E04\u0E2A RW \u0E15\u0E48\u0E33\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Under-coding \u0E01\u0E48\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E08\u0E30\u0E02\u0E22\u0E32\u0E22\u0E43\u0E2B\u0E0D\u0E48\u0E02\u0E36\u0E49\u0E19"
              }]
            })
          }
          return c.occupancy_rate > 85 ? v.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#dc2626",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${l(c.occupancy_rate,1)}% \u2014 \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22 (>85%)`,
            detail: `Active Bed ${l(c.active_beds,1)}/${M.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E25\u0E49\u0E19 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E2D Admit \u0E19\u0E32\u0E19 + Workload \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2A\u0E39\u0E07 + \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 HAI`,
            actions: [{
              who: "Bed Manager",
              what: "Proactive D/C \u0E17\u0E38\u0E01 10:00 \u0E19. \u2014 Round \u0E15\u0E23\u0E27\u0E08\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21 D/C \u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E2A\u0E31\u0E48\u0E07 D/C \u0E01\u0E48\u0E2D\u0E19\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E43\u0E2B\u0E49\u0E40\u0E15\u0E35\u0E22\u0E07\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E1A Admit \u0E43\u0E2B\u0E21\u0E48\u0E15\u0E2D\u0E19\u0E1A\u0E48\u0E32\u0E22"
            }, {
              who: "ER",
              what: "\u0E25\u0E14 Boarding Time \u2014 \u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 Ward \u0E41\u0E08\u0E49\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E27\u0E48\u0E32\u0E07\u0E17\u0E31\u0E19\u0E17\u0E35 \u0E15\u0E31\u0E49\u0E07\u0E40\u0E1B\u0E49\u0E32 Admission Decision \u2192 Ward \u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 2 \u0E0A\u0E21."
            }, {
              who: "\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
              what: "Trigger \u0E40\u0E1B\u0E34\u0E14 Ward \u0E2A\u0E33\u0E23\u0E2D\u0E07 \u2014 \u0E2B\u0E32\u0E01\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 >90% \u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E19 3 \u0E27\u0E31\u0E19 \u0E43\u0E2B\u0E49\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E33\u0E23\u0E2D\u0E07 + \u0E02\u0E2D\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21"
            }]
          }) : c.occupancy_rate < 50 ? v.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#f59e0b",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${l(c.occupancy_rate,1)}% \u2014 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32 (<50%)`,
            detail: `Active Bed ${l(c.active_beds,1)}/${M.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 (\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23/\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E39\u0E1B\u0E42\u0E20\u0E04) \u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E44\u0E21\u0E48\u0E04\u0E38\u0E49\u0E21\u0E04\u0E48\u0E32`,
            actions: [{
              who: "\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
              what: "\u0E1B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07 Ward \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E1B\u0E34\u0E14\u0E23\u0E27\u0E21 Ward \u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27\u0E25\u0E14\u0E04\u0E48\u0E32\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E39\u0E1B\u0E42\u0E20\u0E04 \u0E42\u0E2D\u0E19\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E44\u0E1B\u0E40\u0E2A\u0E23\u0E34\u0E21 OPD/ER \u0E17\u0E35\u0E48\u0E02\u0E32\u0E14\u0E41\u0E04\u0E25\u0E19"
            }, {
              who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
              what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 OPD Observation \u2014 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 OPD Obs >6 \u0E0A\u0E21. \u0E27\u0E48\u0E32\u0E04\u0E27\u0E23 Admit \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22 \u0E41\u0E17\u0E19\u0E17\u0E35\u0E48\u0E08\u0E30 Observe \u0E17\u0E35\u0E48 OPD"
            }]
          }) : v.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#16a34a",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${l(c.occupancy_rate,1)}% \u2014 \u0E40\u0E01\u0E13\u0E11\u0E4C\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21 (50-85%)`,
            detail: `Active Bed ${l(c.active_beds,1)}/${M.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E2A\u0E21\u0E14\u0E38\u0E25 \u0E22\u0E31\u0E07\u0E21\u0E35\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A Surge`,
            actions: []
          }), k < -10 ? v.push({
            icon: "\u{1F4CB}",
            color: "#dc2626",
            title: `CMI \u0E25\u0E14\u0E25\u0E07 ${Math.abs(k)}% (${l(r.cmi,2)} \u2192 ${l(c.cmi,2)}) \u2014 Case-mix \u0E40\u0E1A\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D Under-coding`,
            detail: "CMI (Case Mix Index) \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E2D\u0E07\u0E42\u0E23\u0E04\u0E17\u0E35\u0E48\u0E14\u0E39\u0E41\u0E25 \u2014 CMI \u0E25\u0E14\u0E25\u0E07\u0E2D\u0E32\u0E08\u0E2B\u0E21\u0E32\u0E22\u0E16\u0E36\u0E07 1) \u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E19\u0E49\u0E2D\u0E22\u0E25\u0E07 2) Coding \u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 (Under-coding) \u0E17\u0E33\u0E43\u0E2B\u0E49\u0E44\u0E14\u0E49 RW \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E23\u0E34\u0E07",
            actions: [{
              who: "\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32 Coder",
              what: "Coding Audit \u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 \u2014 \u0E2A\u0E38\u0E48\u0E21\u0E15\u0E23\u0E27\u0E08 30 \u0E40\u0E04\u0E2A/\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 CMI < 0.5 \u0E15\u0E23\u0E27\u0E08: Principal Dx \u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E2B\u0E21, CC/MCC \u0E04\u0E23\u0E1A\u0E44\u0E2B\u0E21, Procedure Code \u0E43\u0E2A\u0E48\u0E04\u0E23\u0E1A\u0E44\u0E2B\u0E21 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E25\u0E17\u0E38\u0E01 2 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C"
            }, {
              who: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E38\u0E01\u0E2A\u0E32\u0E02\u0E32",
              what: "\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 Discharge Summary \u2014 \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 Diagnosis \u0E04\u0E23\u0E1A\u0E17\u0E38\u0E01\u0E02\u0E49\u0E2D (\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E41\u0E04\u0E48 Principal Dx) \u0E23\u0E30\u0E1A\u0E38 CC/MCC \u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19 \u0E40\u0E0A\u0E48\u0E19 DM with complication, HT with CKD \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E43\u0E2B\u0E49 Coder \u0E08\u0E31\u0E1A Code \u0E44\u0E14\u0E49\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07"
            }, {
              who: "\u0E17\u0E35\u0E21 DRG",
              what: "DRG Conference \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E30 2 \u0E04\u0E23\u0E31\u0E49\u0E07 \u2014 Case discussion \u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 RW \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E17\u0E35\u0E48\u0E04\u0E27\u0E23 + \u0E40\u0E04\u0E2A Grouper Error + \u0E40\u0E04\u0E2A Outlier \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E01\u0E31\u0E1A Benchmark \u0E2A\u0E1B\u0E2A\u0E0A."
            }, {
              who: "IT/\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25",
              what: "\u0E1E\u0E31\u0E12\u0E19\u0E32 Auto-suggest Coding \u2014 \u0E43\u0E0A\u0E49\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Lab/Drug/Procedure \u0E41\u0E19\u0E30\u0E19\u0E33 Diagnosis \u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E02\u0E32\u0E14\u0E2B\u0E32\u0E22\u0E44\u0E1B \u0E25\u0E14 Under-coding \u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34"
            }]
          }) : k > 10 && v.push({
            icon: "\u{1F4CB}",
            color: "#16a34a",
            title: `CMI \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${k}% (${l(r.cmi,2)} \u2192 ${l(c.cmi,2)}) \u2014 \u0E14\u0E39\u0E41\u0E25\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19`,
            detail: "\u0E28\u0E31\u0E01\u0E22\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E14\u0E39\u0E41\u0E25\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 Over-coding \u0E41\u0E25\u0E30 Readmission Rate \u0E44\u0E21\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21",
            actions: [{
              who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
              what: "Monitor Readmission + Mortality \u2014 CMI \u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E31\u0E48\u0E19\u0E43\u0E08\u0E27\u0E48\u0E32 Outcome \u0E14\u0E35 \u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48\u0E41\u0E04\u0E48\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E2B\u0E19\u0E31\u0E01\u0E41\u0E25\u0E49\u0E27\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E41\u0E22\u0E48"
            }, {
              who: "\u0E1D\u0E48\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23",
              what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Staffing \u2014 \u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 Nurse:Patient ratio \u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E21\u0E02\u0E49\u0E19\u0E01\u0E27\u0E48\u0E32 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E2B\u0E49\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D"
            }, {
              who: "\u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23\u0E23\u0E21",
              what: "\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E22\u0E32 High-cost \u2014 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E22\u0E32\u0E23\u0E32\u0E04\u0E32\u0E41\u0E1E\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E48\u0E2D\u0E22\u0E43\u0E19\u0E40\u0E04\u0E2A High RW \u0E43\u0E2B\u0E49\u0E21\u0E35 Stock \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49 \u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E22\u0E32"
            }]
          }), v.filter(o => o.actions.length === 0 || o.detail), v.filter(o => o.actions.length > 0), u.jsxs("div", {
            style: {
              marginTop: "12px",
              padding: "16px 18px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(99,102,241,.06), rgba(139,92,246,.04))",
              border: "1px solid rgba(99,102,241,.12)"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "14px"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "14px"
                },
                children: "\u{1F916}"
              }), u.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#6366f1"
                },
                children: "AI Insight \u2014 \u0E2A\u0E23\u0E38\u0E1B\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"
              }), u.jsxs("span", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "auto"
                },
                children: [P, " \xB7 ", T, " \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07 ", M.total_beds]
              })]
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              },
              children: v.map((o, $) => u.jsxs("div", {
                style: {
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: `${o.color}08`,
                  borderLeft: `3px solid ${o.color}`
                },
                children: [u.jsxs("div", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: o.color,
                    marginBottom: "4px"
                  },
                  children: [o.icon, " ", o.title]
                }), u.jsx("div", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--md-text-secondary)",
                    lineHeight: "1.7",
                    marginBottom: o.actions.length ? "8px" : 0
                  },
                  children: o.detail
                }), o.actions.length > 0 && u.jsxs("div", {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginTop: "6px",
                    paddingTop: "8px",
                    borderTop: `1px dashed ${o.color}20`
                  },
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#f59e0b",
                      marginBottom: "2px"
                    },
                    children: "\u{1F4A1} \u0E41\u0E19\u0E27\u0E17\u0E32\u0E07\u0E41\u0E01\u0E49\u0E44\u0E02"
                  }), o.actions.map((a, g) => u.jsxs("div", {
                    style: {
                      display: "flex",
                      gap: "6px",
                      fontSize: "12px",
                      lineHeight: "1.65"
                    },
                    children: [u.jsx("span", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 800,
                        color: "#6366f1",
                        background: "rgba(99,102,241,.08)",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                        alignSelf: "flex-start",
                        marginTop: "2px",
                        flexShrink: 0
                      },
                      children: a.who
                    }), u.jsx("span", {
                      style: {
                        fontWeight: 600,
                        color: "var(--md-text-secondary)"
                      },
                      children: a.what
                    })]
                  }, g))]
                })]
              }, $))
            })]
          })
        })()]
      })
    })(), !C0 && n === "ipd-compare" && M?.comparison && u.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)",
        borderRadius: "16px",
        overflowX: "auto",
        overflowY: "visible",
        WebkitOverflowScrolling: "touch"
      },
      children: [u.jsxs("div", {
        ref: Y,
        children: [u.jsxs("div", {
          style: {
            padding: "16px 20px",
            textAlign: "center",
            borderBottom: "2px solid var(--md-border)",
            background: "linear-gradient(135deg, rgba(2,132,199,.04), rgba(124,58,237,.04))"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "16px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: M.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [M.custom_range ? `${M.custom_range.start} \u0E16\u0E36\u0E07 ${M.custom_range.end} vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19` : Uu && `${M.fiscal_years.fy2.label} ${Uu}`, " \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07\u0E08\u0E23\u0E34\u0E07: ", M.total_beds, " \u0E40\u0E15\u0E35\u0E22\u0E07"]
          })]
        }), u.jsxs("table", {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "1600px",
            fontSize: "11px"
          },
          children: [u.jsxs("thead", {
            children: [u.jsxs("tr", {
              children: [u.jsx("th", {
                rowSpan: 2,
                style: {
                  ...E.th,
                  width: "60px",
                  borderRight: "2px solid var(--md-border)",
                  position: "sticky",
                  left: 0,
                  background: "var(--md-surface)",
                  zIndex: 2
                },
                children: "\u0E40\u0E14\u0E37\u0E2D\u0E19"
              }), u.jsx("th", {
                colSpan: 8,
                style: {
                  ...E.th,
                  background: E.fy1Bg,
                  color: "#2563eb",
                  borderRight: "2px solid var(--md-border)"
                },
                children: M.custom_range ? `${M.fiscal_years.fy1.start} \u2014 ${M.fiscal_years.fy1.end}` : `${M.fiscal_years.fy1.label} (${M.fiscal_years.fy1.start} \u2014 ${M.fiscal_years.fy1.end})`
              }), u.jsx("th", {
                colSpan: 8,
                style: {
                  ...E.th,
                  background: E.fy2Bg,
                  color: "#db2777",
                  borderRight: "2px solid var(--md-border)"
                },
                children: M.custom_range ? `${M.fiscal_years.fy2.start} \u2014 ${M.fiscal_years.fy2.end}` : `${M.fiscal_years.fy2.label} (${M.fiscal_years.fy2.start} \u2014 ${M.fiscal_years.fy2.end})`
              }), u.jsx("th", {
                colSpan: 10,
                style: {
                  ...E.th,
                  background: E.growthBg,
                  color: "#16a34a"
                },
                children: "YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (% \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07)"
              })]
            }), u.jsxs("tr", {
              children: [
                [{
                  label: `Admit
(\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32)`,
                  sep: !1
                }, {
                  label: `D/C
(\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22)`,
                  sep: !0
                }, {
                  label: "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19",
                  sep: !1
                }, {
                  label: `ALOS
(\u0E27\u0E31\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22)`,
                  sep: !0
                }, {
                  label: `\u0E04\u0E23\u0E2D\u0E07
\u0E40\u0E15\u0E35\u0E22\u0E07 %`,
                  sep: !1
                }, {
                  label: `Active
Bed`,
                  sep: !0
                }, {
                  label: `Sum
AdjRW`,
                  sep: !1
                }, {
                  label: "CMI",
                  sep: !0
                }].map((e, t) => u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    fontWeight: 700,
                    whiteSpace: "pre-line",
                    borderRight: e.sep ? "1px solid var(--md-border)" : void 0,
                    ...t === 7 ? {
                      borderRight: "2px solid var(--md-border)"
                    } : {}
                  },
                  children: e.label
                }, `fy1_${t}`)), [{
                  label: `Admit
(\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32)`,
                  sep: !1
                }, {
                  label: `D/C
(\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22)`,
                  sep: !0
                }, {
                  label: "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19",
                  sep: !1
                }, {
                  label: `ALOS
(\u0E27\u0E31\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22)`,
                  sep: !0
                }, {
                  label: `\u0E04\u0E23\u0E2D\u0E07
\u0E40\u0E15\u0E35\u0E22\u0E07 %`,
                  sep: !1
                }, {
                  label: `Active
Bed`,
                  sep: !0
                }, {
                  label: `Sum
AdjRW`,
                  sep: !1
                }, {
                  label: "CMI",
                  sep: !0
                }].map((e, t) => u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    fontWeight: 700,
                    whiteSpace: "pre-line",
                    borderRight: e.sep ? "1px solid var(--md-border)" : void 0,
                    ...t === 7 ? {
                      borderRight: "2px solid var(--md-border)"
                    } : {}
                  },
                  children: e.label
                }, `fy2_${t}`)), [{
                  label: "Admit",
                  sep: !1
                }, {
                  label: "D/C",
                  sep: !0
                }, {
                  label: "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19",
                  sep: !1
                }, {
                  label: "ALOS",
                  sep: !0
                }, {
                  label: `\u0E04\u0E23\u0E2D\u0E07
\u0E40\u0E15\u0E35\u0E22\u0E07`,
                  sep: !1
                }, {
                  label: `Active
Bed`,
                  sep: !0
                }, {
                  label: "AdjRW",
                  sep: !1
                }, {
                  label: "CMI",
                  sep: !1
                }].map((e, t) => u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    fontSize: "10px",
                    fontWeight: 700,
                    whiteSpace: "pre-line",
                    borderRight: e.sep ? "1px solid var(--md-border)" : void 0
                  },
                  children: e.label
                }, `yoy_${t}`)), u.jsxs("th", {
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    fontSize: "10px",
                    fontWeight: 700
                  },
                  children: ["\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07", u.jsx("br", {}), "Admit"]
                }), u.jsxs("th", {
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    fontSize: "10px",
                    fontWeight: 700
                  },
                  children: ["\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07", u.jsx("br", {}), "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19"]
                })
              ]
            })]
          }), u.jsxs("tbody", {
            children: [M.comparison.filter(e => e.fy1.has_data && e.fy2.has_data).map((e, t) => u.jsxs("tr", {
              style: {
                background: t % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
              },
              children: [u.jsx("td", {
                style: {
                  ...E.td,
                  fontWeight: 800,
                  position: "sticky",
                  left: 0,
                  background: t % 2 === 0 ? "var(--md-surface)" : "var(--md-surface-2, #f8fafc)",
                  zIndex: 1,
                  borderRight: "2px solid var(--md-border)"
                },
                children: e.month
              }), (() => {
                const s = "1px solid var(--md-border)";
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: E.tdNum,
                    children: l(e.fy1.admits)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: s
                    },
                    children: l(e.fy1.discharges)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(e.fy1.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: s
                    },
                    children: l(e.fy1.alos, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(e.fy1.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: s
                    },
                    children: l(e.fy1.active_beds, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(e.fy1.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: "2px solid var(--md-border)"
                    },
                    children: l(e.fy1.cmi, 2)
                  })]
                })
              })(), (() => {
                const s = "1px solid var(--md-border)";
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: E.tdNum,
                    children: l(e.fy2.admits)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: s
                    },
                    children: l(e.fy2.discharges)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(e.fy2.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: s
                    },
                    children: l(e.fy2.alos, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(e.fy2.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: s
                    },
                    children: l(e.fy2.active_beds, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(e.fy2.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: "2px solid var(--md-border)"
                    },
                    children: l(e.fy2.cmi, 2)
                  })]
                })
              })(), [
                [e.fy1.admits, e.fy2.admits, !1],
                [e.fy1.discharges, e.fy2.discharges, !0],
                [e.fy1.total_los, e.fy2.total_los, !1],
                [e.fy1.alos, e.fy2.alos, !0],
                [e.fy1.occupancy_rate, e.fy2.occupancy_rate, !1],
                [e.fy1.active_beds, e.fy2.active_beds, !0],
                [e.fy1.sum_adjrw, e.fy2.sum_adjrw, !1],
                [e.fy1.cmi, e.fy2.cmi, !1]
              ].map(([s, w, r], c) => {
                const i = s > 0 ? Math.round((w - s) / s * 100) : w > 0 ? 100 : 0;
                return u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 800,
                    fontSize: "11px",
                    color: i > 0 ? "#16a34a" : i < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                    borderRight: r ? "1px solid var(--md-border)" : void 0
                  },
                  children: [i > 0 ? "\u25B2" : i < 0 ? "\u25BC" : "", " ", Math.abs(i), "%"]
                }, `yoy_${c}`)
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 800,
                  color: e.admit_diff >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [e.admit_diff > 0 ? "+" : "", l(e.admit_diff)]
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 800,
                  color: e.fy2.total_los - e.fy1.total_los >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [e.fy2.total_los - e.fy1.total_los > 0 ? "+" : "", l(e.fy2.total_los - e.fy1.total_los)]
              })]
            }, t)), u.jsxs("tr", {
              style: {
                background: E.totalBg
              },
              children: [u.jsx("td", {
                style: {
                  ...E.td,
                  fontWeight: 900,
                  position: "sticky",
                  left: 0,
                  background: "rgba(14,165,233,.12)",
                  zIndex: 1,
                  borderRight: "2px solid var(--md-border)",
                  borderTop: "2px solid var(--md-border)"
                },
                children: "\u0E23\u0E27\u0E21"
              }), (() => {
                const e = "2px solid var(--md-border)",
                  t = "1px solid var(--md-border)",
                  s = {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: e
                  },
                  w = M.fy1_totals,
                  r = M.fy2_totals;
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: s,
                    children: l(w.admits)
                  }), u.jsx("td", {
                    style: {
                      ...s,
                      borderRight: t
                    },
                    children: l(w.discharges)
                  }), u.jsx("td", {
                    style: s,
                    children: l(w.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...s,
                      borderRight: t
                    },
                    children: l(w.alos, 2)
                  }), u.jsx("td", {
                    style: s,
                    children: l(w.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...s,
                      borderRight: t
                    },
                    children: l(w.active_beds, 2)
                  }), u.jsx("td", {
                    style: s,
                    children: l(w.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...s,
                      borderRight: e
                    },
                    children: l(w.cmi, 2)
                  }), u.jsx("td", {
                    style: s,
                    children: l(r.admits)
                  }), u.jsx("td", {
                    style: {
                      ...s,
                      borderRight: t
                    },
                    children: l(r.discharges)
                  }), u.jsx("td", {
                    style: s,
                    children: l(r.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...s,
                      borderRight: t
                    },
                    children: l(r.alos, 2)
                  }), u.jsx("td", {
                    style: s,
                    children: l(r.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...s,
                      borderRight: t
                    },
                    children: l(r.active_beds, 2)
                  }), u.jsx("td", {
                    style: s,
                    children: l(r.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...s,
                      borderRight: e
                    },
                    children: l(r.cmi, 2)
                  })]
                })
              })(), (() => {
                const e = M.fy1_totals,
                  t = M.fy2_totals;
                return [
                  [e.admits, t.admits, !1],
                  [e.discharges, t.discharges, !0],
                  [e.total_los, t.total_los, !1],
                  [e.alos, t.alos, !0],
                  [e.occupancy_rate, t.occupancy_rate, !1],
                  [e.active_beds, t.active_beds, !0],
                  [e.sum_adjrw, t.sum_adjrw, !1],
                  [e.cmi, t.cmi, !1]
                ].map(([s, w, r], c) => {
                  const i = s > 0 ? Math.round((w - s) / s * 100) : w > 0 ? 100 : 0;
                  return u.jsxs("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      borderTop: "2px solid var(--md-border)",
                      fontSize: "11px",
                      color: i > 0 ? "#16a34a" : i < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                      borderRight: r ? "1px solid var(--md-border)" : void 0
                    },
                    children: [i > 0 ? "\u25B2" : i < 0 ? "\u25BC" : "", " ", Math.abs(i), "%"]
                  }, `yoy_t_${c}`)
                })
              })(), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: "2px solid var(--md-border)",
                  color: M.overall_admit_diff >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [M.overall_admit_diff > 0 ? "+" : "", l(M.overall_admit_diff)]
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: "2px solid var(--md-border)",
                  color: M.fy2_totals.total_los - M.fy1_totals.total_los >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [M.fy2_totals.total_los - M.fy1_totals.total_los > 0 ? "+" : "", l(M.fy2_totals.total_los - M.fy1_totals.total_los)]
              })]
            })]
          })]
        })]
      }), u.jsxs("div", {
        style: {
          padding: "10px 20px",
          borderTop: "1px solid var(--md-border)",
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between"
        },
        children: [u.jsx("span", {
          children: "BCH 360\xB0 Intelligence \xB7 HOSxP XE \xB7 ipt + an_stat"
        }), u.jsx("span", {
          children: M.timestamp && new Date(M.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !C0 && n === "opd-compare" && S?.comparison && (() => {
      const e = S.fy1_totals,
        t = S.fy2_totals,
        s = (r, c) => r > 0 ? Math.round((c - r) / r * 100) : 0,
        w = [{
          label: "Visit",
          pct: s(e.visits, t.visits),
          v1: e.visits,
          v2: t.visits
        }, {
          label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 (UNQ)",
          pct: s(e.patients, t.patients),
          v1: e.patients,
          v2: t.patients
        }, {
          label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49",
          pct: s(e.revenue, t.revenue),
          v1: e.revenue,
          v2: t.revenue,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32\u0E22\u0E32",
          pct: s(e.drug_cost, t.drug_cost),
          v1: e.drug_cost,
          v2: t.drug_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32 Lab",
          pct: s(e.lab_cost, t.lab_cost),
          v1: e.lab_cost,
          v2: t.lab_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32 X-ray",
          pct: s(e.xray_cost, t.xray_cost),
          v1: e.xray_cost,
          v2: t.xray_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/Visit",
          pct: s(e.avg_income, t.avg_income),
          v1: e.avg_income,
          v2: t.avg_income,
          dec: 2,
          prefix: "\u0E3F"
        }];
      return u.jsxs("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)",
            marginBottom: "4px"
          },
          children: ["\u0E2A\u0E23\u0E38\u0E1B YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (", S.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49)"]
        }), u.jsxs("div", {
          style: {
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap"
          },
          children: [u.jsxs("span", {
            style: {
              padding: "2px 8px",
              borderRadius: "6px",
              background: "rgba(37,99,235,.08)",
              color: "#2563eb",
              fontWeight: 700
            },
            children: [S.fiscal_years.fy1.start, " \u2014 ", S.fiscal_years.fy1.end]
          }), u.jsx("span", {
            style: {
              fontWeight: 800,
              color: "var(--md-text-tertiary)"
            },
            children: "vs"
          }), u.jsxs("span", {
            style: {
              padding: "2px 8px",
              borderRadius: "6px",
              background: "rgba(16,185,129,.08)",
              color: "#10b981",
              fontWeight: 700
            },
            children: [S.fiscal_years.fy2.start, " \u2014 ", S.fiscal_years.fy2.end]
          })]
        }), u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px"
          },
          children: w.map((r, c) => u.jsxs("div", {
            style: {
              padding: "10px 12px",
              borderRadius: "10px",
              background: r.pct > 0 ? "rgba(16,185,129,.06)" : r.pct < 0 ? "rgba(244,63,94,.06)" : "rgba(148,163,184,.06)",
              border: `1px solid ${r.pct>0?"rgba(16,185,129,.15)":r.pct<0?"rgba(244,63,94,.15)":"rgba(148,163,184,.15)"}`
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                marginBottom: "4px"
              },
              children: r.label
            }), u.jsxs("div", {
              style: {
                fontSize: "18px",
                fontWeight: 900,
                color: r.pct > 0 ? "#10b981" : r.pct < 0 ? "#f43f5e" : "var(--md-text-secondary)"
              },
              children: [r.pct > 0 ? "\u25B2" : r.pct < 0 ? "\u25BC" : "", " ", Math.abs(r.pct), "%"]
            }), u.jsxs("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "2px"
              },
              children: [r.prefix || "", l(r.v1, r.dec || 0), " \u2192 ", r.prefix || "", l(r.v2, r.dec || 0)]
            })]
          }, c))
        })]
      })
    })(), !C0 && n === "opd-compare" && S?.comparison && u.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)",
        borderRadius: "16px",
        overflowX: "auto"
      },
      children: [u.jsxs("div", {
        ref: Y,
        children: [u.jsxs("div", {
          style: {
            padding: "16px 20px",
            textAlign: "center",
            borderBottom: "2px solid var(--md-border)",
            background: "linear-gradient(135deg, rgba(16,185,129,.04), rgba(59,130,246,.04))"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "16px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: S.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [S.custom_range.start, " \u0E16\u0E36\u0E07 ", S.custom_range.end, " vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07\u0E08\u0E23\u0E34\u0E07: ", S.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19"]
          })]
        }), u.jsxs("table", {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "1400px",
            fontSize: "11px"
          },
          children: [u.jsxs("thead", {
            children: [u.jsxs("tr", {
              children: [u.jsx("th", {
                rowSpan: 2,
                style: {
                  ...E.th,
                  width: "70px",
                  borderRight: "2px solid var(--md-border)",
                  position: "sticky",
                  left: 0,
                  background: "var(--md-surface)",
                  zIndex: 2
                },
                children: "\u0E40\u0E14\u0E37\u0E2D\u0E19"
              }), u.jsxs("th", {
                colSpan: 7,
                style: {
                  ...E.th,
                  background: E.fy1Bg,
                  color: "#2563eb",
                  borderRight: "2px solid var(--md-border)"
                },
                children: [S.fiscal_years.fy1.start, " \u2014 ", S.fiscal_years.fy1.end]
              }), u.jsxs("th", {
                colSpan: 7,
                style: {
                  ...E.th,
                  background: "rgba(16,185,129,.10)",
                  color: "#10b981",
                  borderRight: "2px solid var(--md-border)"
                },
                children: [S.fiscal_years.fy2.start, " \u2014 ", S.fiscal_years.fy2.end]
              }), u.jsx("th", {
                colSpan: 7,
                style: {
                  ...E.th,
                  background: E.growthBg,
                  color: "#16a34a"
                },
                children: "YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (%)"
              })]
            }), u.jsxs("tr", {
              children: [
                ["Visit", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 X-ray", "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit"].map((e, t) => u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    fontWeight: 700,
                    borderRight: t === 6 ? "2px solid var(--md-border)" : t === 1 || t === 5 ? "1px solid var(--md-border)" : void 0
                  },
                  children: e
                }, `f1_${t}`)), ["Visit", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 X-ray", "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit"].map((e, t) => u.jsx("th", {
                  style: {
                    ...E.th,
                    background: "rgba(16,185,129,.10)",
                    fontSize: "10px",
                    fontWeight: 700,
                    borderRight: t === 6 ? "2px solid var(--md-border)" : t === 1 || t === 5 ? "1px solid var(--md-border)" : void 0
                  },
                  children: e
                }, `f2_${t}`)), ["Visit", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 X-ray", "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit"].map((e, t) => u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    fontSize: "10px",
                    fontWeight: 700
                  },
                  children: e
                }, `yoy_${t}`))
              ]
            })]
          }), u.jsxs("tbody", {
            children: [S.comparison.filter(e => e.fy1.has_data || e.fy2.has_data).map((e, t) => {
              const s = (r, c) => r > 0 ? Math.round((c - r) / r * 100) : c > 0 ? 100 : 0,
                w = "1px solid var(--md-border)";
              return u.jsxs("tr", {
                style: {
                  background: t % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [u.jsx("td", {
                  style: {
                    ...E.td,
                    fontWeight: 800,
                    position: "sticky",
                    left: 0,
                    background: t % 2 === 0 ? "var(--md-surface)" : "var(--md-surface-2, #f8fafc)",
                    zIndex: 1,
                    borderRight: "2px solid var(--md-border)"
                  },
                  children: e.month
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: l(e.fy1.visits)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: w
                  },
                  children: l(e.fy1.patients)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: l(e.fy1.revenue)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: l(e.fy1.drug_cost)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: l(e.fy1.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: w
                  },
                  children: l(e.fy1.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: "2px solid var(--md-border)"
                  },
                  children: l(e.fy1.avg_income, 2)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: l(e.fy2.visits)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: w
                  },
                  children: l(e.fy2.patients)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: l(e.fy2.revenue)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: l(e.fy2.drug_cost)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: l(e.fy2.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: w
                  },
                  children: l(e.fy2.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: "2px solid var(--md-border)"
                  },
                  children: l(e.fy2.avg_income, 2)
                }), [
                  [e.fy1.visits, e.fy2.visits],
                  [e.fy1.patients, e.fy2.patients],
                  [e.fy1.revenue, e.fy2.revenue],
                  [e.fy1.drug_cost, e.fy2.drug_cost],
                  [e.fy1.lab_cost, e.fy2.lab_cost],
                  [e.fy1.xray_cost, e.fy2.xray_cost],
                  [e.fy1.avg_income, e.fy2.avg_income]
                ].map(([r, c], i) => {
                  const y = s(r, c);
                  return u.jsxs("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      fontSize: "11px",
                      color: y > 0 ? "#16a34a" : y < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                    },
                    children: [y > 0 ? "\u25B2" : y < 0 ? "\u25BC" : "", " ", Math.abs(y), "%"]
                  }, i)
                })]
              }, t)
            }), (() => {
              const e = S.fy1_totals,
                t = S.fy2_totals,
                s = "2px solid var(--md-border)",
                w = "1px solid var(--md-border)",
                r = {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: s
                },
                c = (i, y) => i > 0 ? Math.round((y - i) / i * 100) : 0;
              return u.jsxs("tr", {
                style: {
                  background: E.totalBg
                },
                children: [u.jsx("td", {
                  style: {
                    ...E.td,
                    fontWeight: 900,
                    position: "sticky",
                    left: 0,
                    background: "rgba(14,165,233,.12)",
                    zIndex: 1,
                    borderRight: s,
                    borderTop: s
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), u.jsx("td", {
                  style: r,
                  children: l(e.visits)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: w
                  },
                  children: l(e.patients)
                }), u.jsx("td", {
                  style: r,
                  children: l(e.revenue)
                }), u.jsx("td", {
                  style: r,
                  children: l(e.drug_cost)
                }), u.jsx("td", {
                  style: r,
                  children: l(e.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: w
                  },
                  children: l(e.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: s
                  },
                  children: l(e.avg_income, 2)
                }), u.jsx("td", {
                  style: r,
                  children: l(t.visits)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: w
                  },
                  children: l(t.patients)
                }), u.jsx("td", {
                  style: r,
                  children: l(t.revenue)
                }), u.jsx("td", {
                  style: r,
                  children: l(t.drug_cost)
                }), u.jsx("td", {
                  style: r,
                  children: l(t.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: w
                  },
                  children: l(t.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: s
                  },
                  children: l(t.avg_income, 2)
                }), [
                  [e.visits, t.visits],
                  [e.patients, t.patients],
                  [e.revenue, t.revenue],
                  [e.drug_cost, t.drug_cost],
                  [e.lab_cost, t.lab_cost],
                  [e.xray_cost, t.xray_cost],
                  [e.avg_income, t.avg_income]
                ].map(([i, y], h) => {
                  const A = c(i, y);
                  return u.jsxs("td", {
                    style: {
                      ...r,
                      fontWeight: 900,
                      fontSize: "11px",
                      color: A > 0 ? "#16a34a" : A < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                    },
                    children: [A > 0 ? "\u25B2" : A < 0 ? "\u25BC" : "", " ", Math.abs(A), "%"]
                  }, h)
                })]
              })
            })()]
          })]
        })]
      }), u.jsxs("div", {
        style: {
          padding: "10px 20px",
          borderTop: "1px solid var(--md-border)",
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between"
        },
        children: [u.jsx("span", {
          children: "BCH 360\xB0 Intelligence \xB7 HOSxP XE \xB7 vn_stat"
        }), u.jsx("span", {
          children: S.timestamp && new Date(S.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !C0 && n === "resource-opd" && Eu?.comparison && (() => {
      const e = Eu,
        t = e.fy1_totals,
        s = e.fy2_totals,
        w = (i, y) => y > 0 ? Math.round((i - y) / y * 100) : i > 0 ? 100 : 0;
      t.lab_orders + t.drug_orders + t.xray_orders, t.lab_price + t.drug_price + t.xray_price, s.lab_orders + s.drug_orders + s.xray_orders, s.lab_price + s.drug_price + s.xray_price;
      const r = "2px solid var(--md-border)",
        c = "1px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: c,
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: Y,
          style: {
            overflowX: "auto"
          },
          children: [u.jsxs("div", {
            style: {
              padding: "16px 20px",
              textAlign: "center",
              borderBottom: r,
              background: "linear-gradient(135deg, rgba(16,185,129,.05), rgba(59,130,246,.05))"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "16px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: e.title
            }), u.jsxs("div", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "4px"
              },
              children: ["\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A ", e.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19"]
            })]
          }), u.jsxs("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1400px"
            },
            children: [u.jsxs("thead", {
              children: [u.jsxs("tr", {
                children: [u.jsx("th", {
                  rowSpan: 3,
                  style: {
                    ...E.th,
                    width: "55px",
                    borderRight: r,
                    position: "sticky",
                    left: 0,
                    background: "var(--md-surface)",
                    zIndex: 2
                  },
                  children: "\u0E40\u0E14\u0E37\u0E2D\u0E19"
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    color: "#2563eb",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35 \u0E07\u0E1A ", s0]
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#0d9488",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35 \u0E07\u0E1A ", e0]
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    color: "#16a34a"
                  },
                  children: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A"
                })]
              }), u.jsxs("tr", {
                children: [u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: c
                  },
                  children: "Lab (\u0E15\u0E23\u0E27\u0E08\u0E17\u0E32\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: c
                  },
                  children: "Drug (\u0E22\u0E32)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: r
                  },
                  children: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: c
                  },
                  children: "Lab (\u0E15\u0E23\u0E27\u0E08\u0E17\u0E32\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: c
                  },
                  children: "Drug (\u0E22\u0E32)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: r
                  },
                  children: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)"
                }), u.jsx("th", {
                  rowSpan: 2,
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    fontSize: "10px",
                    fontWeight: 700
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19 %"
                }), u.jsx("th", {
                  rowSpan: 2,
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    fontSize: "10px",
                    fontWeight: 700
                  },
                  children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 %"
                })]
              }), u.jsxs("tr", {
                children: [u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    fontWeight: 600
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07 (\u0E04\u0E23\u0E31\u0E49\u0E07)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRight: c
                  },
                  children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    fontWeight: 600
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07 (\u0E04\u0E23\u0E31\u0E49\u0E07)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRight: c
                  },
                  children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    fontWeight: 600
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07 (\u0E04\u0E23\u0E31\u0E49\u0E07)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRight: r
                  },
                  children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    fontWeight: 600
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07 (\u0E04\u0E23\u0E31\u0E49\u0E07)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRight: c
                  },
                  children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    fontWeight: 600
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07 (\u0E04\u0E23\u0E31\u0E49\u0E07)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRight: c
                  },
                  children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    fontWeight: 600
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E31\u0E48\u0E07 (\u0E04\u0E23\u0E31\u0E49\u0E07)"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    fontWeight: 600,
                    borderRight: r
                  },
                  children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (\u0E1A\u0E32\u0E17)"
                })]
              })]
            }), u.jsxs("tbody", {
              children: [e.comparison.filter(i => i.fy1?.has_data && i.fy2?.has_data).map((i, y) => {
                const h = i.fy1,
                  A = i.fy2,
                  _ = h.lab_orders + h.drug_orders + h.xray_orders,
                  z = h.lab_price + h.drug_price + h.xray_price,
                  k = A.lab_orders + A.drug_orders + A.xray_orders,
                  T = A.lab_price + A.drug_price + A.xray_price,
                  P = w(k, _),
                  v = w(T, z),
                  F = y % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  X = y % 2 === 0 ? "var(--md-surface)" : "var(--md-surface-2, #f8fafc)";
                return u.jsxs("tr", {
                  style: {
                    background: F
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      position: "sticky",
                      left: 0,
                      background: X,
                      zIndex: 1,
                      borderRight: r
                    },
                    children: i.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: h.lab_orders ? l(h.lab_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: h.lab_price ? l(h.lab_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: h.drug_orders ? l(h.drug_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: h.drug_price ? l(h.drug_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: h.xray_orders ? l(h.xray_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: h.xray_price ? l(h.xray_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.lab_orders ? l(A.lab_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: A.lab_price ? l(A.lab_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.drug_orders ? l(A.drug_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: A.drug_price ? l(A.drug_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.xray_orders ? l(A.xray_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: A.xray_price ? l(A.xray_price) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: P >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: i.has_data ? `${P>0?"\u25B2":P<0?"\u25BC":""} ${Math.abs(P)}%` : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: v >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: i.has_data ? `${v>0?"\u25B2":v<0?"\u25BC":""} ${Math.abs(v)}%` : ""
                  })]
                }, y)
              }), u.jsxs("tr", {
                style: {
                  background: E.totalBg
                },
                children: [u.jsx("td", {
                  style: {
                    ...E.td,
                    fontWeight: 900,
                    position: "sticky",
                    left: 0,
                    background: "rgba(14,165,233,.12)",
                    zIndex: 1,
                    borderRight: r,
                    borderTop: r
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(t.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: c
                  },
                  children: l(t.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(t.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: c
                  },
                  children: l(t.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(t.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: l(t.xray_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(s.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: c
                  },
                  children: l(s.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(s.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: c
                  },
                  children: l(s.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(s.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: l(s.xray_price)
                }), u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    color: e.overall_orders_growth_pct >= 0 ? "#16a34a" : "#dc2626"
                  },
                  children: [e.overall_orders_growth_pct > 0 ? "\u25B2" : e.overall_orders_growth_pct < 0 ? "\u25BC" : "", " ", Math.abs(e.overall_orders_growth_pct), "%"]
                }), u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    color: e.overall_price_growth_pct >= 0 ? "#16a34a" : "#dc2626"
                  },
                  children: [e.overall_price_growth_pct > 0 ? "\u25B2" : e.overall_price_growth_pct < 0 ? "\u25BC" : "", " ", Math.abs(e.overall_price_growth_pct), "%"]
                })]
              })]
            })]
          })]
        }), (s0 <= 2567 || e0 <= 2567) && u.jsxs("div", {
          style: {
            padding: "10px 20px",
            borderTop: c,
            fontSize: "12px",
            fontWeight: 600,
            color: "#d97706",
            background: "rgba(251,191,36,.06)"
          },
          children: ["\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38: HOSxP \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 inc_drug \u0E0A\u0E48\u0E27\u0E07 \u0E01.\u0E22.\u2013\u0E1E.\u0E22. 2566 \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E08\u0E23\u0E34\u0E07 (~300 \u0E40\u0E17\u0E48\u0E32) \u2014 \u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E31\u0E14 outlier (inc_drug ", ">", " 25,000) \u0E2D\u0E2D\u0E01\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34"]
        }), u.jsxs("div", {
          style: {
            padding: "10px 20px",
            borderTop: c,
            fontSize: "11px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between"
          },
          children: [u.jsx("span", {
            children: "BCH 360\xB0 Intelligence \xB7 HOSxP XE \xB7 vn_stat (inc03 \xB7 inc_drug \xB7 inc04)"
          }), u.jsx("span", {
            children: e.timestamp && new Date(e.timestamp).toLocaleString("th-TH")
          })]
        })]
      })
    })(), !C0 && n === "resource-opd" && Eu?.comparison && u.jsx(lE, {
      data: Eu,
      fy1: s0,
      fy2: e0,
      level: "OPD"
    }), !C0 && n === "resource-ipd" && G0?.comparison && (() => {
      const e = G0,
        t = e.fy1_totals,
        s = e.fy2_totals,
        w = (i, y) => y > 0 ? Math.round((i - y) / y * 100) : i > 0 ? 100 : 0;
      t.lab_orders + t.drug_orders + t.xray_orders, t.lab_price + t.drug_price + t.xray_price, s.lab_orders + s.drug_orders + s.xray_orders, s.lab_price + s.drug_price + s.xray_price;
      const r = "2px solid var(--md-border)",
        c = "1px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: c,
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: Y,
          style: {
            overflowX: "auto"
          },
          children: [u.jsxs("div", {
            style: {
              padding: "16px 20px",
              textAlign: "center",
              borderBottom: r,
              background: "linear-gradient(135deg, rgba(236,72,153,.05), rgba(251,146,60,.05))"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "16px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: e.title || `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (Lab / Drug / CT-Xray) \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A ${s0} vs ${e0}`
            }), u.jsxs("div", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "4px"
              },
              children: [e.data_source, " \xB7 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E49\u0E07 2 \u0E1B\u0E35 (", e.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19)"]
            })]
          }), u.jsxs("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1100px"
            },
            children: [u.jsxs("thead", {
              children: [u.jsxs("tr", {
                children: [u.jsx("th", {
                  rowSpan: 2,
                  style: {
                    ...E.th,
                    width: "60px",
                    borderRight: r
                  },
                  children: "\u0E40\u0E14\u0E37\u0E2D\u0E19"
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    color: "#2563eb",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", s0]
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#db2777",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", e0]
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    color: "#16a34a"
                  },
                  children: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A"
                })]
              }), u.jsxs("tr", {
                children: [u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "Lab \u0E04\u0E23\u0E31\u0E49\u0E07"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "Lab \u0E1A\u0E32\u0E17"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "Drug \u0E04\u0E23\u0E31\u0E49\u0E07"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "Drug \u0E1A\u0E32\u0E17"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "Xray \u0E04\u0E23\u0E31\u0E49\u0E07"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    borderRight: r
                  },
                  children: "Xray \u0E1A\u0E32\u0E17"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "Lab \u0E04\u0E23\u0E31\u0E49\u0E07"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "Lab \u0E1A\u0E32\u0E17"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "Drug \u0E04\u0E23\u0E31\u0E49\u0E07"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "Drug \u0E1A\u0E32\u0E17"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "Xray \u0E04\u0E23\u0E31\u0E49\u0E07"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    borderRight: r
                  },
                  children: "Xray \u0E1A\u0E32\u0E17"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    fontSize: "10px"
                  },
                  children: "\u0E08\u0E33\u0E19\u0E27\u0E19 %"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    fontSize: "10px"
                  },
                  children: "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 %"
                })]
              })]
            }), u.jsxs("tbody", {
              children: [e.comparison.filter(i => i.fy1?.has_data && i.fy2?.has_data).map((i, y) => {
                const h = i.fy1,
                  A = i.fy2,
                  _ = h.lab_orders + h.drug_orders + h.xray_orders,
                  z = h.lab_price + h.drug_price + h.xray_price,
                  k = A.lab_orders + A.drug_orders + A.xray_orders,
                  T = A.lab_price + A.drug_price + A.xray_price,
                  P = w(k, _),
                  v = w(T, z),
                  F = y % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  X = !i.has_data;
                return u.jsxs("tr", {
                  style: {
                    background: F,
                    opacity: X ? .35 : 1
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      textAlign: "center",
                      borderRight: r
                    },
                    children: i.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(h.lab_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(h.lab_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(h.drug_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(h.drug_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(h.xray_orders)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: l(h.xray_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(A.lab_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(A.lab_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(A.drug_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(A.drug_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(A.xray_orders)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: l(A.xray_price)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: P >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: i.has_data && h.has_data && A.has_data ? `${P>=0?"\u25B2":"\u25BC"} ${Math.abs(P)}%` : "\u2014"
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: v >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: i.has_data && h.has_data && A.has_data ? `${v>=0?"\u25B2":"\u25BC"} ${Math.abs(v)}%` : "\u2014"
                  })]
                }, i.month)
              }), u.jsxs("tr", {
                style: {
                  background: E.totalBg
                },
                children: [u.jsx("td", {
                  style: {
                    ...E.td,
                    fontWeight: 900,
                    textAlign: "center",
                    borderRight: r,
                    borderTop: r
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(t.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(t.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(t.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(t.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(t.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: l(t.xray_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(s.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(s.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(s.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(s.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: l(s.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: l(s.xray_price)
                }), u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    color: e.overall_orders_growth_pct >= 0 ? "#16a34a" : "#dc2626"
                  },
                  children: [e.overall_orders_growth_pct >= 0 ? "\u25B2" : "\u25BC", " ", Math.abs(e.overall_orders_growth_pct), "%"]
                }), u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    color: e.overall_price_growth_pct >= 0 ? "#16a34a" : "#dc2626"
                  },
                  children: [e.overall_price_growth_pct >= 0 ? "\u25B2" : "\u25BC", " ", Math.abs(e.overall_price_growth_pct), "%"]
                })]
              })]
            })]
          })]
        }), u.jsxs("div", {
          style: {
            padding: "10px 20px",
            borderTop: c,
            fontSize: "11px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between"
          },
          children: [u.jsx("span", {
            children: e.data_source
          }), u.jsx("span", {
            children: e.timestamp && new Date(e.timestamp).toLocaleString("th-TH")
          })]
        })]
      })
    })(), !C0 && n === "resource-ipd" && G0?.comparison && u.jsx(lE, {
      data: G0,
      fy1: s0,
      fy2: e0,
      level: "IPD"
    }), !C0 && n === "mortality" && c0?.comparison && (() => {
      const e = c0,
        t = e.fy1_totals,
        s = e.fy2_totals,
        w = (i, y) => y > 0 ? Math.round((i - y) / y * 100) : i > 0 ? 100 : 0,
        r = i => i > 0 ? `${i.toFixed(2)}%` : "\u2014",
        c = "2px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: Y,
          style: {
            overflowX: "auto"
          },
          children: [u.jsxs("div", {
            style: {
              padding: "16px 20px",
              textAlign: "center",
              borderBottom: c,
              background: "linear-gradient(135deg, rgba(127,29,29,.05), rgba(239,68,68,.05))"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "16px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: e.title
            }), u.jsxs("div", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: "4px"
              },
              children: [e.data_source, " \xB7 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E49\u0E07 2 \u0E1B\u0E35 (", e.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19) \xB7 IPD \u0E15\u0E32\u0E22 = dchtype 8,9"]
            })]
          }), u.jsxs("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "1000px"
            },
            children: [u.jsxs("thead", {
              children: [u.jsxs("tr", {
                children: [u.jsx("th", {
                  rowSpan: 2,
                  style: {
                    ...E.th,
                    width: "60px",
                    borderRight: c
                  },
                  children: "\u0E40\u0E14\u0E37\u0E2D\u0E19"
                }), u.jsxs("th", {
                  colSpan: 5,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    color: "#2563eb",
                    borderRight: c
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", s0]
                }), u.jsxs("th", {
                  colSpan: 5,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#db2777",
                    borderRight: c
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", e0]
                }), u.jsx("th", {
                  rowSpan: 2,
                  style: {
                    ...E.th,
                    background: E.growthBg,
                    color: "#16a34a"
                  },
                  children: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A"
                })]
              }), u.jsxs("tr", {
                children: [u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "IPD \u0E15\u0E32\u0E22"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22%"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px"
                  },
                  children: "OPD \u0E15\u0E32\u0E22"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "10px",
                    borderRight: c
                  },
                  children: "\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "IPD \u0E15\u0E32\u0E22"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22%"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px"
                  },
                  children: "OPD \u0E15\u0E32\u0E22"
                }), u.jsx("th", {
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "10px",
                    borderRight: c
                  },
                  children: "\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22"
                })]
              })]
            }), u.jsxs("tbody", {
              children: [e.comparison.filter(i => i.fy1?.has_data && i.fy2?.has_data).map((i, y) => {
                const h = i.fy1,
                  A = i.fy2,
                  _ = w(A.total_deaths, h.total_deaths),
                  z = y % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  k = !i.has_data;
                return u.jsxs("tr", {
                  style: {
                    background: z,
                    opacity: k ? .35 : 1
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      textAlign: "center",
                      borderRight: c
                    },
                    children: i.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(h.ipd_discharge)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: h.ipd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: h.ipd_deaths > 0 ? 800 : 600
                    },
                    children: l(h.ipd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: h.ipd_mortality_rate >= 2 ? "#dc2626" : h.ipd_mortality_rate > 0 ? "#d97706" : "inherit",
                      fontWeight: 700
                    },
                    children: r(h.ipd_mortality_rate)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: h.opd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: h.opd_deaths > 0 ? 800 : 600
                    },
                    children: l(h.opd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: h.total_deaths > 0 ? "#dc2626" : "inherit",
                      borderRight: c
                    },
                    children: l(h.total_deaths)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: l(A.ipd_discharge)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: A.ipd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: A.ipd_deaths > 0 ? 800 : 600
                    },
                    children: l(A.ipd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: A.ipd_mortality_rate >= 2 ? "#dc2626" : A.ipd_mortality_rate > 0 ? "#d97706" : "inherit",
                      fontWeight: 700
                    },
                    children: r(A.ipd_mortality_rate)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: A.opd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: A.opd_deaths > 0 ? 800 : 600
                    },
                    children: l(A.opd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: A.total_deaths > 0 ? "#dc2626" : "inherit",
                      borderRight: c
                    },
                    children: l(A.total_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: _ > 0 ? "#dc2626" : _ < 0 ? "#16a34a" : "inherit"
                    },
                    children: i.has_data && h.has_data && A.has_data ? `${_>0?"\u25B2":_<0?"\u25BC":""} ${Math.abs(_)}%` : "\u2014"
                  })]
                }, i.month)
              }), u.jsxs("tr", {
                style: {
                  background: "rgba(239,68,68,.06)"
                },
                children: [u.jsx("td", {
                  style: {
                    ...E.td,
                    fontWeight: 900,
                    textAlign: "center",
                    borderRight: c,
                    borderTop: c
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c
                  },
                  children: l(t.ipd_discharge)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626"
                  },
                  children: l(t.ipd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: t.ipd_mortality_rate >= 2 ? "#dc2626" : "#d97706"
                  },
                  children: r(t.ipd_mortality_rate)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626"
                  },
                  children: l(t.opd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626",
                    borderRight: c
                  },
                  children: l(t.total_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c
                  },
                  children: l(s.ipd_discharge)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626"
                  },
                  children: l(s.ipd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: s.ipd_mortality_rate >= 2 ? "#dc2626" : "#d97706"
                  },
                  children: r(s.ipd_mortality_rate)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626"
                  },
                  children: l(s.opd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626",
                    borderRight: c
                  },
                  children: l(s.total_deaths)
                }), u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: e.death_growth_pct > 0 ? "#dc2626" : "#16a34a"
                  },
                  children: [e.death_growth_pct > 0 ? "\u25B2" : e.death_growth_pct < 0 ? "\u25BC" : "", " ", Math.abs(e.death_growth_pct), "%"]
                })]
              })]
            })]
          })]
        }), u.jsxs("div", {
          style: {
            padding: "10px 20px",
            borderTop: "1px solid var(--md-border)",
            fontSize: "11px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between"
          },
          children: [u.jsxs("span", {
            children: [e.data_source, " \xB7 IPD Early Death (LOS<2d): \u0E1B\u0E35\u0E07\u0E1A ", s0, "=", t.ipd_early_deaths, " / \u0E1B\u0E35\u0E07\u0E1A ", e0, "=", s.ipd_early_deaths]
          }), u.jsx("span", {
            children: e.timestamp && new Date(e.timestamp).toLocaleString("th-TH")
          })]
        })]
      })
    })(), !C0 && n === "mortality" && c0?.comparison && u.jsx(bE, {
      title: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
      subtitle: "Mortality Executive Analysis \xB7 IPD Rate \xB7 Early Death \xB7 OPD/ER \xB7 Peak Month \xB7 Risks \xB7 Recommendations",
      badge: "\u{1F4D0} Rule-based \xB7 Clinical Quality",
      accentColor: "#dc2626",
      headerGradient: "linear-gradient(135deg, rgba(220,38,38,.10), rgba(245,158,11,.06))",
      narrative: DE(c0, s0, e0)
    }), !C0 && n === "frax" && S0?.patients && u.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)"
      },
      children: [u.jsxs("div", {
        ref: Y,
        style: {
          overflowX: "auto"
        },
        children: [u.jsxs("div", {
          style: {
            padding: "16px 20px",
            textAlign: "center",
            borderBottom: "2px solid var(--md-border)",
            background: "linear-gradient(135deg, rgba(168,85,247,.04), rgba(236,72,153,.04))"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "16px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: S0.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [S0.date_range.start, " \u0E16\u0E36\u0E07 ", S0.date_range.end, " \xB7 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", S0.total, " \u0E23\u0E32\u0E22"]
          })]
        }), u.jsxs("table", {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "1200px"
          },
          children: [u.jsx("thead", {
            children: u.jsxs("tr", {
              children: [u.jsx("th", {
                style: {
                  ...E.th,
                  width: "40px"
                },
                children: "\u0E25\u0E33\u0E14\u0E31\u0E1A"
              }), u.jsx("th", {
                style: E.th,
                children: "VN"
              }), u.jsx("th", {
                style: E.th,
                children: "HN"
              }), u.jsx("th", {
                style: E.th,
                children: "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19"
              }), u.jsx("th", {
                style: {
                  ...E.th,
                  textAlign: "left"
                },
                children: "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25"
              }), u.jsx("th", {
                style: E.th,
                children: "\u0E2D\u0E32\u0E22\u0E38"
              }), u.jsx("th", {
                style: E.th,
                children: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C"
              }), u.jsx("th", {
                style: E.th,
                children: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"
              }), u.jsx("th", {
                style: E.th,
                children: "\u0E40\u0E27\u0E25\u0E32"
              }), u.jsx("th", {
                style: E.th,
                children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
              }), u.jsxs("th", {
                style: {
                  ...E.th,
                  background: "rgba(59,130,246,.06)"
                },
                children: ["\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01", u.jsx("br", {}), "(kg)"]
              }), u.jsxs("th", {
                style: {
                  ...E.th,
                  background: "rgba(59,130,246,.06)"
                },
                children: ["\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07", u.jsx("br", {}), "(cm)"]
              }), u.jsxs("th", {
                style: {
                  ...E.th,
                  background: "rgba(168,85,247,.08)",
                  color: "#7c3aed"
                },
                children: ["Major", u.jsx("br", {}), "Osteoporotic (%)"]
              }), u.jsxs("th", {
                style: {
                  ...E.th,
                  background: "rgba(236,72,153,.08)",
                  color: "#db2777"
                },
                children: ["Hip", u.jsx("br", {}), "Fracture (%)"]
              })]
            })
          }), u.jsx("tbody", {
            children: Iu.map((e, t) => u.jsxs("tr", {
              style: {
                background: t % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
              },
              children: [u.jsx("td", {
                style: E.td,
                children: e.no
              }), u.jsx("td", {
                style: {
                  ...E.td,
                  fontSize: "12px"
                },
                children: e.vn
              }), u.jsx("td", {
                style: E.td,
                children: e.hn
              }), u.jsx("td", {
                style: {
                  ...E.td,
                  fontSize: "12px"
                },
                children: e.cid
              }), u.jsx("td", {
                style: {
                  ...E.td,
                  textAlign: "left",
                  whiteSpace: "nowrap"
                },
                children: e.fullname
              }), u.jsx("td", {
                style: E.td,
                children: e.age
              }), u.jsx("td", {
                style: {
                  ...E.td,
                  fontSize: "12px"
                },
                children: e.phone || "\u2014"
              }), u.jsx("td", {
                style: E.td,
                children: e.vstdate
              }), u.jsx("td", {
                style: E.td,
                children: e.vsttime
              }), u.jsx("td", {
                style: {
                  ...E.td,
                  fontSize: "11px"
                },
                children: e.pttype_name || e.pttype
              }), u.jsx("td", {
                style: {
                  ...E.tdNum,
                  background: "rgba(59,130,246,.03)"
                },
                children: e.weight || "\u2014"
              }), u.jsx("td", {
                style: {
                  ...E.tdNum,
                  background: "rgba(59,130,246,.03)"
                },
                children: e.height || "\u2014"
              }), u.jsx("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 800,
                  background: "rgba(168,85,247,.04)",
                  color: e.major_osteoporotic >= 20 ? "#dc2626" : e.major_osteoporotic >= 10 ? "#ea580c" : "var(--md-text-primary)"
                },
                children: e.major_osteoporotic
              }), u.jsx("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 800,
                  background: "rgba(236,72,153,.04)",
                  color: e.hip_fracture >= 3 ? "#dc2626" : "var(--md-text-primary)"
                },
                children: e.hip_fracture
              })]
            }, e.vn || t))
          })]
        })]
      }), u.jsxs("div", {
        style: {
          padding: "10px 20px",
          borderTop: "1px solid var(--md-border)",
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
          flexWrap: "wrap"
        },
        children: [u.jsxs("span", {
          children: [z0 !== "all" && S0.patients.length > z0 && u.jsxs("span", {
            style: {
              color: "#d97706",
              marginRight: "6px"
            },
            children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", z0, " \u0E08\u0E32\u0E01 ", S0.patients.length.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 "]
          }), "FRAX\xAE WHO Model (Thailand) \xB7 HOSxP XE \xB7 Bone Density X-Ray \xB7 \u0E40\u0E1E\u0E28\u0E2B\u0E0D\u0E34\u0E07\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19"]
        }), u.jsx("span", {
          children: S0.timestamp && new Date(S0.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !C0 && n === "elderly-cxr" && w0?.patients && (() => {
      const e = w0.patients,
        t = w0.total_income || 0,
        s = w0.total_cxr_price || 0,
        w = e.length > 0 ? Math.round(t / e.length) : 0,
        r = e.filter(a => a.sex === "\u0E0A\u0E32\u0E22").length,
        c = e.filter(a => a.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
        i = {};
      e.forEach(a => {
        const g = (a.icd10 || "").trim().toUpperCase();
        g && cu.test(g) && (i[g] || (i[g] = {
          code: g,
          name: a.icd10name,
          count: 0,
          totalInc: 0
        }), i[g].count++, i[g].totalInc += a.income || 0)
      });
      const y = Object.values(i).sort((a, g) => g.count - a.count).slice(0, 10),
        h = y.length > 0 ? y[0].count : 1,
        A = {
          "60-64": 0,
          "65-69": 0,
          "70-74": 0,
          "75-79": 0,
          "80+": 0
        };
      e.forEach(a => {
        const g = Number(a.age_y) || 0;
        g < 65 ? A["60-64"]++ : g < 70 ? A["65-69"]++ : g < 75 ? A["70-74"]++ : g < 80 ? A["75-79"]++ : A["80+"]++
      });
      const _ = Math.max(...Object.values(A), 1),
        z = {
          "60-64": "#3b82f6",
          "65-69": "#10b981",
          "70-74": "#f59e0b",
          "75-79": "#ef4444",
          "80+": "#8b5cf6"
        },
        k = {};
      e.forEach(a => {
        const g = a.pttype_name || "-";
        k[g] || (k[g] = {
          count: 0,
          income: 0
        }), k[g].count++, k[g].income += a.income || 0
      });
      const T = Object.entries(k).sort((a, g) => g[1].count - a[1].count),
        P = new Set(e.map(a => a.hn).filter(Boolean)).size,
        v = Object.entries(A).reduce((a, [g, b]) => b > a[1] ? [g, b] : a, ["", 0]),
        F = y.length > 0 ? y[0] : null,
        X = T.length > 0 ? T[0] : null,
        p = e.length > 0 ? Math.round(s / e.length) : 0,
        o = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 CXR \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35: \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${w0.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${P.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E04\u0E48\u0E32 CXR \u0E23\u0E27\u0E21 ${s.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${p.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22 \xB7 \u0E0A\u0E32\u0E22 ${r} \u0E23\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07 ${c} \u0E23\u0E32\u0E22${r>0&&c>0?` (\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E2A\u0E48\u0E27\u0E19 ${(r/c).toFixed(2)}:1)`:""}`];
      if (v[0]) {
        const a = e.length > 0 ? Math.round(v[1] / e.length * 100) : 0;
        o.push(`\u{1F474} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E17\u0E33 CXR \u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${v[0]} \u0E1B\u0E35 ${v[1]} \u0E23\u0E32\u0E22 (${a}%) \u2014 ${v[0]==="80+"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E21\u0E32\u0E01 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E1B\u0E2D\u0E14\u0E2D\u0E31\u0E01\u0E40\u0E2A\u0E1A/\u0E27\u0E31\u0E13\u0E42\u0E23\u0E04\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23 follow-up \u0E17\u0E38\u0E01\u0E23\u0E32\u0E22":v[0].startsWith("60")?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E04\u0E27\u0E23\u0E17\u0E33 baseline CXR \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35":"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 COPD/IHD \u0E23\u0E48\u0E27\u0E21\u0E14\u0E49\u0E27\u0E22"}`)
      }
      if (F && cu.test(F.code) && o.push(`\u{1FA7B} \u0E1C\u0E25\u0E15\u0E23\u0E27\u0E08 CXR \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${F.code} ${F.name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${F.count} \u0E23\u0E32\u0E22 \u2014 ${F.code.startsWith("J18")?"\u0E1B\u0E2D\u0E14\u0E2D\u0E31\u0E01\u0E40\u0E2A\u0E1A \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32\u0E41\u0E25\u0E30\u0E09\u0E35\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Pneumococcal/Influenza":F.code.startsWith("J44")||F.code.startsWith("J43")?"COPD/Emphysema \u0E04\u0E27\u0E23\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A COPD clinic \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E38\u0E2B\u0E23\u0E35\u0E48":F.code.startsWith("I")?"\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08/\u0E2B\u0E25\u0E2D\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 NCD":"\u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E32\u0E21\u0E2D\u0E32\u0E22\u0E38"}`), X) {
        const [a, g] = X, b = e.length > 0 ? Math.round(g.count / e.length * 100) : 0;
        b >= 50 && o.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${a} ${g.count} \u0E23\u0E32\u0E22 (${b}%) \u2014 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 LTC \u0E02\u0E2D\u0E07\u0E0A\u0E38\u0E21\u0E0A\u0E19`)
      }
      w0.total > 0 && p > 0 && o.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22: CXR \u0E43\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E40\u0E1B\u0E47\u0E19 screening \u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A TB/COPD/Lung CA \xB7 \u0E04\u0E27\u0E23\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 coverage \u226580% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E43\u0E19\u0E40\u0E02\u0E15 \xB7 \u0E08\u0E31\u0E14\u0E17\u0E33 CXR mobile clinic \u0E2B\u0E32\u0E01\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E30\u0E14\u0E27\u0E01");
      const $ = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C CXR \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: o
      };
      return u.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        },
        children: [u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "10px"
          },
          children: [{
            label: "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 CXR",
            value: w0.total.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#7c3aed",
            gradient: "linear-gradient(135deg, rgba(124,58,237,.12), rgba(124,58,237,.04))",
            border: "rgba(124,58,237,.25)"
          }, {
            label: "\u0E04\u0E48\u0E32 CXR",
            value: s.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#10b981",
            gradient: "linear-gradient(135deg, rgba(16,185,129,.12), rgba(16,185,129,.04))",
            border: "rgba(16,185,129,.25)"
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
            value: t.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            gradient: "linear-gradient(135deg, rgba(59,130,246,.12), rgba(59,130,246,.04))",
            border: "rgba(59,130,246,.25)"
          }, {
            label: "\u0E0A\u0E32\u0E22",
            value: r.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,.12), rgba(14,165,233,.04))",
            border: "rgba(14,165,233,.25)"
          }, {
            label: "\u0E2B\u0E0D\u0E34\u0E07",
            value: c.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }, {
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32",
            value: T.length,
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            color: "#f59e0b",
            gradient: "linear-gradient(135deg, rgba(245,158,11,.12), rgba(245,158,11,.04))",
            border: "rgba(245,158,11,.25)"
          }].map((a, g) => u.jsxs("div", {
            style: {
              background: a.gradient,
              border: `1px solid ${a.border}`,
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                marginBottom: "4px"
              },
              children: a.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: a.color,
                lineHeight: 1.1
              },
              children: [a.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: a.unit
              })]
            })]
          }, g))
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "10px"
          },
          children: [u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34"
            }), T.slice(0, 8).map(([a, g], b) => {
              const N = e.length > 0 ? Math.round(g.count / e.length * 100) : 0,
                D = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                C = D[b % D.length];
              return u.jsxs("div", {
                style: {
                  marginBottom: "8px"
                },
                children: [u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "3px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-secondary)",
                      maxWidth: "70%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    title: a,
                    children: a
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: C
                    },
                    children: [g.count, " (", N, "%)"]
                  })]
                }), u.jsx("div", {
                  style: {
                    height: "6px",
                    borderRadius: "3px",
                    background: "var(--md-border)",
                    overflow: "hidden"
                  },
                  children: u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${N}%`,
                      borderRadius: "3px",
                      background: C,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, b)
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 (60+ \u0E1B\u0E35)"
            }), u.jsx("div", {
              style: {
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                height: "80px",
                paddingTop: "4px"
              },
              children: Object.entries(A).map(([a, g]) => u.jsxs("div", {
                style: {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 900,
                    color: z[a]
                  },
                  children: g
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: z[a],
                    height: `${Math.max(8,g/_*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: a
                })]
              }, a))
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "Top ICD-10 Diagnoses"
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              },
              children: y.map((a, g) => {
                const b = h > 0 ? Math.round(a.count / h * 100) : 0;
                return u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#7c3aed",
                      fontFamily: "monospace",
                      minWidth: "48px"
                    },
                    children: a.code
                  }), u.jsxs("div", {
                    style: {
                      flex: 1,
                      position: "relative",
                      height: "18px",
                      borderRadius: "4px",
                      background: "var(--md-border)",
                      overflow: "hidden"
                    },
                    children: [u.jsx("div", {
                      style: {
                        height: "100%",
                        width: `${b}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(124,58,237,.25), rgba(124,58,237,.${g===0?"5":"3"}))`,
                        transition: "width .5s ease"
                      }
                    }), u.jsx("span", {
                      style: {
                        position: "absolute",
                        left: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "var(--md-text-secondary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "calc(100% - 50px)"
                      },
                      children: a.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: a.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [a.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, g)
              })
            })]
          })]
        }), u.jsxs("div", {
          className: "rounded-2xl overflow-hidden",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            boxShadow: "0 2px 16px rgba(0,0,0,.05)"
          },
          children: [u.jsxs("div", {
            ref: Y,
            style: {
              overflowX: "auto"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "14px 24px",
                borderBottom: "2px solid var(--md-border)",
                background: "linear-gradient(135deg, rgba(124,58,237,.05), rgba(59,130,246,.05))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px"
              },
              children: [u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "20px"
                  },
                  children: "\u2622\uFE0F"
                }), u.jsxs("div", {
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "var(--md-text-primary)"
                    },
                    children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E17\u0E35\u0E48\u0E21\u0E35 Chest X-Ray"
                  }), u.jsxs("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)"
                    },
                    children: [w0.date_range.start, " \u0E16\u0E36\u0E07 ", w0.date_range.end]
                  })]
                })]
              }), u.jsxs("div", {
                style: {
                  display: "flex",
                  gap: "12px"
                },
                children: [u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(124,58,237,.1)",
                    color: "#7c3aed",
                    border: "1px solid rgba(124,58,237,.2)"
                  },
                  children: [w0.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(59,130,246,.1)",
                    color: "#2563eb",
                    border: "1px solid rgba(59,130,246,.2)"
                  },
                  children: [t.toLocaleString(), " \u0E1A\u0E32\u0E17"]
                })]
              })]
            }), u.jsxs("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "1600px"
              },
              children: [u.jsx("thead", {
                children: u.jsxs("tr", {
                  style: {
                    background: "rgba(0,0,0,.02)"
                  },
                  children: [u.jsx("th", {
                    style: {
                      ...E.th,
                      width: "36px"
                    },
                    children: "#"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      minWidth: "150px"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "HN"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E1E\u0E28"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2D\u0E32\u0E22\u0E38"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E41\u0E1C\u0E19\u0E01"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(124,58,237,.06)",
                      color: "#7c3aed",
                      textAlign: "left"
                    },
                    children: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 CXR"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(124,58,237,.06)",
                      color: "#7c3aed"
                    },
                    children: "\u0E04\u0E48\u0E32 CXR"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(16,185,129,.06)",
                      color: "#059669"
                    },
                    children: "ICD-10"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      background: "rgba(16,185,129,.06)",
                      color: "#059669"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(59,130,246,.08)",
                      color: "#2563eb"
                    },
                    children: "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"
                  })]
                })
              }), u.jsx("tbody", {
                children: N0(e).map((a, g) => {
                  const b = g % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: b,
                      transition: "background .1s"
                    },
                    onMouseEnter: N => N.currentTarget.style.background = "rgba(124,58,237,.04)",
                    onMouseLeave: N => N.currentTarget.style.background = b,
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        color: "var(--md-text-tertiary)",
                        fontSize: "11px"
                      },
                      children: a.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontWeight: 700
                      },
                      children: a.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: a.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px",
                        color: a.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899",
                        fontWeight: 700
                      },
                      children: a.sex
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 800,
                        color: Number(a.age_y) >= 80 ? "#8b5cf6" : Number(a.age_y) >= 75 ? "#ef4444" : Number(a.age_y) >= 70 ? "#f59e0b" : "#3b82f6"
                      },
                      children: a.age_y
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px"
                      },
                      children: u.jsx("span", {
                        style: {
                          padding: "2px 7px",
                          borderRadius: "6px",
                          background: "rgba(124,58,237,.08)",
                          border: "1px solid rgba(124,58,237,.12)",
                          whiteSpace: "nowrap"
                        },
                        children: a.pttype_name
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        letterSpacing: ".02em"
                      },
                      children: a.cid
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "11px"
                      },
                      children: a.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: a.department,
                      children: a.department
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "170px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: a.address,
                      children: a.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: a.mobile_phone_number || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(124,58,237,.03)",
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                        color: "#7c3aed"
                      },
                      title: a.cxr_name,
                      children: a.cxr_name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(124,58,237,.03)",
                        fontWeight: 800,
                        fontSize: "12px",
                        color: "#7c3aed"
                      },
                      children: a.cxr_price ? a.cxr_price.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        fontWeight: 800,
                        fontSize: "10px",
                        fontFamily: "monospace",
                        color: "#059669"
                      },
                      children: a.icd10 || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "170px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: a.icd10name,
                      children: a.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 900,
                        fontSize: "12px",
                        background: a.income >= 2e3 ? "rgba(59,130,246,.08)" : a.income >= 1e3 ? "rgba(59,130,246,.04)" : "transparent",
                        color: a.income >= 2e3 ? "#1d4ed8" : a.income >= 500 ? "#3b82f6" : "var(--md-text-primary)"
                      },
                      children: a.income ? a.income.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: a.chief_complaint,
                      children: a.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, a.vn || g)
                })
              }), u.jsx("tfoot", {
                children: u.jsxs("tr", {
                  style: {
                    background: "linear-gradient(90deg, rgba(124,58,237,.06), rgba(59,130,246,.06))"
                  },
                  children: [u.jsxs("td", {
                    colSpan: 12,
                    style: {
                      ...E.td,
                      textAlign: "right",
                      fontWeight: 900,
                      fontSize: "12px",
                      padding: "10px 12px",
                      borderBottom: "none"
                    },
                    children: [z0 !== "all" && w0.total > z0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", z0, " \u0E08\u0E32\u0E01 ", w0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", w0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E0A\u0E32\u0E22 ", r, " \xB7 \u0E2B\u0E0D\u0E34\u0E07 ", c, " \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", w.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#7c3aed",
                      borderBottom: "none"
                    },
                    children: s.toLocaleString(void 0, {
                      minimumFractionDigits: 2
                    })
                  }), u.jsx("td", {
                    colSpan: 2,
                    style: {
                      ...E.td,
                      borderBottom: "none"
                    }
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#1d4ed8",
                      borderBottom: "none"
                    },
                    children: t.toLocaleString(void 0, {
                      minimumFractionDigits: 2
                    })
                  }), u.jsx("td", {
                    style: {
                      ...E.td,
                      borderBottom: "none",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u0E1A\u0E32\u0E17"
                  })]
                })
              })]
            })]
          }), u.jsxs("div", {
            style: {
              padding: "8px 24px",
              borderTop: "1px solid var(--md-border)",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [u.jsx("span", {
              children: "HOSxP XE \xB7 opitemrece CXR icode (14 \u0E23\u0E2B\u0E31\u0E2A) \xB7 \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \xB7 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \xB7 LIMIT 5,000"
            }), u.jsx("span", {
              children: w0.timestamp && new Date(w0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), o.length > 0 ? u.jsx(Cu, {
          data: $,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !C0 && n === "fluoride" && v0?.patients && (() => {
      const e = v0.patients,
        t = v0.total_income || 0,
        s = v0.total_fluoride_price || 0,
        w = e.length > 0 ? Math.round(t / e.length) : 0;
      e.length > 0 && Math.max(...e.map(p => p.income || 0));
      const r = {};
      e.forEach(p => {
        const o = (p.icd10 || "").trim().toUpperCase();
        o && cu.test(o) && (r[o] || (r[o] = {
          code: o,
          name: p.icd10name,
          count: 0,
          totalInc: 0
        }), r[o].count++, r[o].totalInc += p.income || 0)
      });
      const c = Object.values(r).sort((p, o) => o.count - p.count).slice(0, 10),
        i = c.length > 0 ? c[0].count : 1,
        y = {
          "25-34": 0,
          "35-44": 0,
          "45-54": 0,
          "55-59": 0
        };
      e.forEach(p => {
        const o = Number(p.age_y) || 0;
        o < 35 ? y["25-34"]++ : o < 45 ? y["35-44"]++ : o < 55 ? y["45-54"]++ : y["55-59"]++
      });
      const h = Math.max(...Object.values(y), 1),
        A = {
          "25-34": "#3b82f6",
          "35-44": "#10b981",
          "45-54": "#f59e0b",
          "55-59": "#ef4444"
        },
        _ = {};
      e.forEach(p => {
        const o = p.pttype_name || "-";
        _[o] || (_[o] = {
          count: 0,
          income: 0
        }), _[o].count++, _[o].income += p.income || 0
      });
      const z = Object.entries(_).sort((p, o) => o[1].count - p[1].count),
        k = new Set(e.map(p => p.hn).filter(Boolean)).size,
        T = Object.entries(y).reduce((p, [o, $]) => $ > p[1] ? [o, $] : p, ["", 0]),
        P = e.length > 0 ? Math.round(s / e.length) : 0,
        v = z.length > 0 ? z[0] : null,
        F = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35): \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${v0.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${k.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C\u0E23\u0E27\u0E21 ${s.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${P.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22${P<50?" \u2014 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E04\u0E32\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A":P>150?" \u2014 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23":""}`];
      if (T[0]) {
        const p = e.length > 0 ? Math.round(T[1] / e.length * 100) : 0;
        F.push(`\u{1F465} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${T[0]} \u0E1B\u0E35 \u0E08\u0E33\u0E19\u0E27\u0E19 ${T[1]} \u0E23\u0E32\u0E22 (${p}%) \u2014 ${T[0]==="55-59"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E43\u0E01\u0E25\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E15\u0E49\u0E2D\u0E07\u0E43\u0E2B\u0E49\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E0A\u0E48\u0E2D\u0E07\u0E1B\u0E32\u0E01\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E42\u0E23\u0E04":T[0]==="25-34"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E19\u0E49\u0E19 health promotion \u0E41\u0E25\u0E30 follow-up periodic":"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E22 \u0E04\u0E27\u0E23\u0E01\u0E23\u0E30\u0E15\u0E38\u0E49\u0E19\u0E04\u0E27\u0E32\u0E21\u0E15\u0E23\u0E30\u0E2B\u0E19\u0E31\u0E01\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E0A\u0E48\u0E2D\u0E07\u0E1B\u0E32\u0E01"}`)
      }
      if (c[0] && F.push(`\u{1F9B7} \u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${c[0].code} ${c[0].name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${c[0].count} \u0E23\u0E32\u0E22 \u2014 ${c[0].code.startsWith("K02")?"\u0E1F\u0E31\u0E19\u0E1C\u0E38 \u0E04\u0E27\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1B\u0E23\u0E07\u0E1F\u0E31\u0E19\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C\u0E17\u0E35\u0E48\u0E1A\u0E49\u0E32\u0E19":"\u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E41\u0E19\u0E27\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`), v) {
        const [p, o] = v, $ = e.length > 0 ? Math.round(o.count / e.length * 100) : 0;
        $ >= 50 && F.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${p} ${o.count} \u0E23\u0E32\u0E22 (${$}%) \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19`)
      }
      v0.total < 50 && F.push(`\u26A0\uFE0F \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E48\u0E33 (${v0.total} \u0E23\u0E32\u0E22) \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E33 outreach \u0E43\u0E19\u0E0A\u0E38\u0E21\u0E0A\u0E19 \u0E40\u0E0A\u0E48\u0E19 \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E2A\u0E21., \u0E08\u0E31\u0E14\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E43\u0E19\u0E0A\u0E38\u0E21\u0E0A\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07`);
      const X = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: F
      };
      return u.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        },
        children: [u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "10px"
          },
          children: [{
            label: "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            value: v0.total.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,.12), rgba(14,165,233,.04))",
            border: "rgba(14,165,233,.25)"
          }, {
            label: "\u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C",
            value: s.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#10b981",
            gradient: "linear-gradient(135deg, rgba(16,185,129,.12), rgba(16,185,129,.04))",
            border: "rgba(16,185,129,.25)"
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
            value: t.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            gradient: "linear-gradient(135deg, rgba(59,130,246,.12), rgba(59,130,246,.04))",
            border: "rgba(59,130,246,.25)"
          }, {
            label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 / \u0E23\u0E32\u0E22",
            value: w.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#8b5cf6",
            gradient: "linear-gradient(135deg, rgba(139,92,246,.12), rgba(139,92,246,.04))",
            border: "rgba(139,92,246,.25)"
          }, {
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32",
            value: z.length,
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }].map((p, o) => u.jsxs("div", {
            style: {
              background: p.gradient,
              border: `1px solid ${p.border}`,
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                marginBottom: "4px"
              },
              children: p.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: p.color,
                lineHeight: 1.1
              },
              children: [p.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: p.unit
              })]
            })]
          }, o))
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "10px"
          },
          children: [u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34"
            }), z.map(([p, o], $) => {
              const a = e.length > 0 ? Math.round(o.count / e.length * 100) : 0,
                g = ["#0ea5e9", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"],
                b = g[$ % g.length];
              return u.jsxs("div", {
                style: {
                  marginBottom: "8px"
                },
                children: [u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "3px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-secondary)",
                      maxWidth: "70%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    title: p,
                    children: p
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: b
                    },
                    children: [o.count, " (", a, "%)"]
                  })]
                }), u.jsx("div", {
                  style: {
                    height: "6px",
                    borderRadius: "3px",
                    background: "var(--md-border)",
                    overflow: "hidden"
                  },
                  children: u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${a}%`,
                      borderRadius: "3px",
                      background: b,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, $)
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 (25-59 \u0E1B\u0E35)"
            }), u.jsx("div", {
              style: {
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                height: "80px",
                paddingTop: "4px"
              },
              children: Object.entries(y).map(([p, o]) => u.jsxs("div", {
                style: {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 900,
                    color: A[p]
                  },
                  children: o
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: A[p],
                    height: `${Math.max(8,o/h*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: p
                })]
              }, p))
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "Top ICD-10 Diagnoses"
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              },
              children: c.map((p, o) => {
                const $ = i > 0 ? Math.round(p.count / i * 100) : 0;
                return u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#0284c7",
                      fontFamily: "monospace",
                      minWidth: "48px"
                    },
                    children: p.code
                  }), u.jsxs("div", {
                    style: {
                      flex: 1,
                      position: "relative",
                      height: "18px",
                      borderRadius: "4px",
                      background: "var(--md-border)",
                      overflow: "hidden"
                    },
                    children: [u.jsx("div", {
                      style: {
                        height: "100%",
                        width: `${$}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(14,165,233,.25), rgba(14,165,233,.${o===0?"5":"3"}))`,
                        transition: "width .5s ease"
                      }
                    }), u.jsx("span", {
                      style: {
                        position: "absolute",
                        left: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "var(--md-text-secondary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "calc(100% - 50px)"
                      },
                      children: p.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: p.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [p.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, o)
              })
            })]
          })]
        }), u.jsxs("div", {
          className: "rounded-2xl overflow-hidden",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            boxShadow: "0 2px 16px rgba(0,0,0,.05)"
          },
          children: [u.jsxs("div", {
            ref: Y,
            style: {
              overflowX: "auto"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "14px 24px",
                borderBottom: "2px solid var(--md-border)",
                background: "linear-gradient(135deg, rgba(14,165,233,.05), rgba(59,130,246,.05))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px"
              },
              children: [u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "20px"
                  },
                  children: "\u{1F9B7}"
                }), u.jsxs("div", {
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "var(--md-text-primary)"
                    },
                    children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C 25-59 \u0E1B\u0E35"
                  }), u.jsxs("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)"
                    },
                    children: [v0.date_range.start, " \u0E16\u0E36\u0E07 ", v0.date_range.end]
                  })]
                })]
              }), u.jsxs("div", {
                style: {
                  display: "flex",
                  gap: "12px"
                },
                children: [u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(14,165,233,.1)",
                    color: "#0284c7",
                    border: "1px solid rgba(14,165,233,.2)"
                  },
                  children: [v0.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(59,130,246,.1)",
                    color: "#2563eb",
                    border: "1px solid rgba(59,130,246,.2)"
                  },
                  children: [t.toLocaleString(), " \u0E1A\u0E32\u0E17"]
                })]
              })]
            }), u.jsxs("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "1500px"
              },
              children: [u.jsx("thead", {
                children: u.jsxs("tr", {
                  style: {
                    background: "rgba(0,0,0,.02)"
                  },
                  children: [u.jsx("th", {
                    style: {
                      ...E.th,
                      width: "36px"
                    },
                    children: "#"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      minWidth: "150px"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "HN"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2D\u0E32\u0E22\u0E38"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E41\u0E1C\u0E19\u0E01"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(14,165,233,.06)",
                      color: "#0284c7"
                    },
                    children: "ICD-10"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      background: "rgba(14,165,233,.06)",
                      color: "#0284c7"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04 / \u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(16,185,129,.08)",
                      color: "#059669"
                    },
                    children: "\u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(59,130,246,.08)",
                      color: "#2563eb"
                    },
                    children: "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"
                  })]
                })
              }), u.jsx("tbody", {
                children: N0(e).map((p, o) => {
                  const $ = o % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: $,
                      transition: "background .1s"
                    },
                    onMouseEnter: a => a.currentTarget.style.background = "rgba(14,165,233,.05)",
                    onMouseLeave: a => a.currentTarget.style.background = $,
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        color: "var(--md-text-tertiary)",
                        fontSize: "11px"
                      },
                      children: p.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontWeight: 700
                      },
                      children: p.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: p.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px"
                      },
                      children: u.jsx("span", {
                        style: {
                          padding: "2px 7px",
                          borderRadius: "6px",
                          background: "rgba(14,165,233,.08)",
                          border: "1px solid rgba(14,165,233,.12)",
                          whiteSpace: "nowrap"
                        },
                        children: p.pttype_name
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 800,
                        color: Number(p.age_y) >= 55 ? "#ef4444" : Number(p.age_y) >= 45 ? "#f59e0b" : Number(p.age_y) >= 35 ? "#10b981" : "#3b82f6"
                      },
                      children: p.age_y
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        letterSpacing: ".02em"
                      },
                      children: p.cid
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "11px"
                      },
                      children: p.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: p.department,
                      children: p.department
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "170px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: p.address,
                      children: p.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: p.mobile_phone_number || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(14,165,233,.03)",
                        fontWeight: 800,
                        fontSize: "10px",
                        fontFamily: "monospace",
                        color: "#0284c7"
                      },
                      children: p.icd10 || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(14,165,233,.03)",
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "170px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: p.icd10name,
                      children: p.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 800,
                        fontSize: "12px",
                        background: "rgba(16,185,129,.04)",
                        color: "#059669"
                      },
                      children: p.fluoride_price ? p.fluoride_price.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 900,
                        fontSize: "12px",
                        background: p.income >= 2e3 ? "rgba(59,130,246,.08)" : p.income >= 1e3 ? "rgba(59,130,246,.04)" : "transparent",
                        color: p.income >= 2e3 ? "#1d4ed8" : p.income >= 500 ? "#3b82f6" : "var(--md-text-primary)"
                      },
                      children: p.income ? p.income.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: p.chief_complaint,
                      children: p.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, p.vn || o)
                })
              }), u.jsx("tfoot", {
                children: u.jsxs("tr", {
                  style: {
                    background: "linear-gradient(90deg, rgba(14,165,233,.06), rgba(59,130,246,.06))"
                  },
                  children: [u.jsxs("td", {
                    colSpan: 12,
                    style: {
                      ...E.td,
                      textAlign: "right",
                      fontWeight: 900,
                      fontSize: "12px",
                      padding: "10px 12px",
                      borderBottom: "none"
                    },
                    children: [z0 !== "all" && v0.total > z0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", z0, " \u0E08\u0E32\u0E01 ", v0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", v0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", w.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#059669",
                      borderBottom: "none"
                    },
                    children: s.toLocaleString(void 0, {
                      minimumFractionDigits: 2
                    })
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#1d4ed8",
                      borderBottom: "none"
                    },
                    children: t.toLocaleString(void 0, {
                      minimumFractionDigits: 2
                    })
                  }), u.jsx("td", {
                    style: {
                      ...E.td,
                      borderBottom: "none",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u0E1A\u0E32\u0E17"
                  })]
                })
              })]
            })]
          }), u.jsxs("div", {
            style: {
              padding: "8px 24px",
              borderTop: "1px solid var(--md-border)",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [u.jsx("span", {
              children: "HOSxP XE \xB7 \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (main_dep 010, \u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35) \xB7 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \xB7 LIMIT 5,000"
            }), u.jsx("span", {
              children: v0.timestamp && new Date(v0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), F.length > 0 ? u.jsx(Cu, {
          data: X,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !C0 && (n === "pt" || n === "staff-services") && J?.patients && (() => {
      const e = J.patients,
        t = J.total_income || 0,
        s = e.length > 0 ? Math.round(t / e.length) : 0;
      e.length > 0 && Math.max(...e.map(x => x.income || 0));
      const w = J.opd_count || e.filter(x => x.visit_type === "OPD").length,
        r = J.ipd_count || e.filter(x => x.visit_type === "IPD").length,
        c = J.opd_income || e.filter(x => x.visit_type === "OPD").reduce((x, f) => x + f.income, 0),
        i = J.ipd_income || e.filter(x => x.visit_type === "IPD").reduce((x, f) => x + f.income, 0),
        y = {};
      e.forEach(x => {
        const f = (x.icd10 || "").trim().toUpperCase();
        f && cu.test(f) && (y[f] || (y[f] = {
          code: f,
          name: x.icd10name,
          count: 0,
          totalInc: 0
        }), y[f].count++, y[f].totalInc += x.income || 0)
      });
      const h = Object.values(y).sort((x, f) => f.count - x.count).slice(0, 10),
        A = h.length > 0 ? h[0].count : 1,
        _ = {};
      e.forEach(x => {
        const f = x.department || "-";
        _[f] || (_[f] = {
          count: 0,
          income: 0
        }), _[f].count++, _[f].income += x.income || 0
      });
      const z = Object.entries(_).sort((x, f) => f[1].count - x[1].count),
        k = {
          "<18": 0,
          "18-34": 0,
          "35-59": 0,
          "60+": 0
        };
      e.forEach(x => {
        const f = Number(x.age_y) || 0;
        f < 18 ? k["<18"]++ : f < 35 ? k["18-34"]++ : f < 60 ? k["35-59"]++ : k["60+"]++
      });
      const T = Math.max(...Object.values(k), 1),
        P = {
          "<18": "#3b82f6",
          "18-34": "#10b981",
          "35-59": "#f59e0b",
          "60+": "#ef4444"
        },
        v = {};
      e.forEach(x => {
        const f = (x.vstdate || "").substring(0, 10);
        f && (v[f] = v[f] || {
          date: f,
          count: 0,
          income: 0
        }, v[f].count++, v[f].income += x.income || 0)
      });
      const F = Object.values(v).sort((x, f) => x.date.localeCompare(f.date)),
        X = Math.max(...F.map(x => x.count), 1),
        p = F.reduce((x, f) => x + f.income, 0),
        o = F.length > 0 ? Math.round(e.length / F.length) : 0,
        $ = J.yoy || null,
        a = (x, f) => $ == null || f == null || f === 0 ? null : Math.round((x - f) / f * 1e3) / 10,
        g = $ && $.total > 0 ? Math.round($.total_income / $.total) : null,
        b = (x, f, m) => {
          if (x == null) return null;
          const O = x >= 0;
          return {
            text: `${O?"\u25B2":"\u25BC"} ${O?"+":""}${x.toFixed(1)}%`,
            compare: `vs ${(f||0).toLocaleString()} ${m||""}`,
            fg: O ? "#059669" : "#dc2626",
            bg: O ? "rgba(16,185,129,.10)" : "rgba(239,68,68,.10)"
          }
        },
        N = n === "staff-services" ? "\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 & PMC",
        D = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
        C = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" : "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
        U = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E21\u0E48" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E2B\u0E21\u0E48",
        j = new Set(e.map(x => x.hn).filter(Boolean)).size,
        W = Object.values(e.reduce((x, f) => (f.hn && (x[f.hn] = (x[f.hn] || 0) + 1), x), {})).filter(x => x > 1).length,
        B = e.length - j,
        L = j > 0 ? Math.round(B / e.length * 100) : 0,
        R = F.length > 0 ? F.reduce((x, f) => f.count > x.count ? f : x, F[0]) : null,
        H = F.length > 0 ? F.reduce((x, f) => f.count < x.count ? f : x, F[0]) : null,
        q = z.length > 0 ? z[0] : null,
        r0 = h.length > 0 ? h[0] : null,
        o0 = $ ? a(J.total, $.total) : null,
        T0 = $ ? a(t, $.total_income) : null,
        K0 = [];
      if (K0.push(`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21${N} (${J.date_range?.start||""} \u0E16\u0E36\u0E07 ${J.date_range?.end||""}): ${C} ${J.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${j.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${s.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22${o0!=null?` \xB7 ${o0>=0?"\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(o0).toFixed(1)}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19`:""}`), T0 != null && Math.abs(T0) >= 20 && K0.push(T0 >= 0 ? `\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D ${T0.toFixed(1)}% YoY (${($.total_income||0).toLocaleString()} \u2192 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17) \u2014 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19/\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E49\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E01\u0E29\u0E32\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23` : `\u{1F4C9} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E25\u0E07 ${Math.abs(T0).toFixed(1)}% YoY \u2014 \u0E04\u0E27\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38: \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 \xB7 \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14 \xB7 \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2B\u0E32\u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A`), R && H && R.date !== H.date && F.length >= 3 && K0.push(`\u{1F4C5} \u0E27\u0E31\u0E19\u0E17\u0E35\u0E48${D}\u0E21\u0E32\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${R.date.substring(5)} (${R.count} \u0E23\u0E32\u0E22) \xB7 \u0E19\u0E49\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${H.date.substring(5)} (${H.count} \u0E23\u0E32\u0E22) \u2014 ${R.count>H.count*3?"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \u0E04\u0E27\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E27\u0E48\u0E32\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E19\u0E49\u0E2D\u0E22\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32 (\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14/\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22) \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \u0E41\u0E25\u0E30\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E23\u0E31\u0E1A\u0E20\u0E32\u0E23\u0E30\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E21\u0E32\u0E01":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E1B\u0E01\u0E15\u0E34"}`), q) {
        const [x, f] = q, m = e.length > 0 ? Math.round(f.count / e.length * 100) : 0;
        K0.push(`\u{1F3E5} \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${x.replace(/^\d+\s*/,"")} ${f.count} \u0E23\u0E32\u0E22 (${m}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${(f.income||0).toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17${m>=60?" \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E44\u0E1B\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E2D\u0E37\u0E48\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07":""}`)
      }
      if (r0 && cu.test(r0.code) && K0.push(`\u{1FA7A} \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${r0.code} ${r0.name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${r0.count} \u0E23\u0E32\u0E22 \u2014 ${r0.code.startsWith("M")?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E01\u0E25\u0E49\u0E32\u0E21\u0E40\u0E19\u0E37\u0E49\u0E2D/\u0E02\u0E49\u0E2D \u0E04\u0E27\u0E23\u0E23\u0E30\u0E1A\u0E38\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07/\u0E23\u0E30\u0E22\u0E30\u0E43\u0E2B\u0E49\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E2B\u0E31\u0E2A\u0E44\u0E14\u0E49\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33":"\u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E33 protocol \u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E"}`), j > 0 && L >= 5 && K0.push(`\u{1F501} \u0E21\u0E35${D}\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33 ${B.toLocaleString()} visits \u0E08\u0E32\u0E01 ${W.toLocaleString()} HN (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${(e.length/j).toFixed(1)} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19) \u2014 ${L>=30?"\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E2A\u0E39\u0E07\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01":"\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E1B\u0E01\u0E15\u0E34 \u2014 \u0E40\u0E19\u0E49\u0E19\u0E40\u0E0A\u0E34\u0E0D\u0E0A\u0E27\u0E19"+U+"\u0E40\u0E1E\u0E34\u0E48\u0E21"}`), A && A.length > 0 && A[0]) {
        const x = A[0],
          f = e.length > 0 ? Math.round(x.count / e.length * 100) : 0;
        f >= 50 && K0.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${x.name} ${x.count} \u0E23\u0E32\u0E22 (${f}%) \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \xB7 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 \u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18`)
      }
      const J0 = {
        data_source: `AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C${N} \xB7 HOSxP XE Live`,
        timestamp: new Date().toISOString(),
        recommendations: K0
      };
      return u.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        },
        children: [u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px"
          },
          children: [...n === "staff-services" && J.staff_registry_count ? [{
            label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
            icon: "\u{1F465}",
            value: J.staff_registry_count.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#7c3aed",
            yoy: (() => {
              const x = j,
                f = J.staff_registry_count > 0 ? Math.round(x / J.staff_registry_count * 1e3) / 10 : 0;
              return {
                text: `\u{1F4CA} \u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${x.toLocaleString()} \u0E23\u0E32\u0E22 (${f}%)`,
                compare: `\u0E44\u0E21\u0E48\u0E21\u0E32 ${(J.staff_registry_count-x).toLocaleString()} \u0E23\u0E32\u0E22`,
                fg: f >= 50 ? "#059669" : "#d97706",
                bg: f >= 50 ? "rgba(16,185,129,.10)" : "rgba(217,119,6,.10)"
              }
            })()
          }] : [], {
            label: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" : "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            icon: "\u{1F465}",
            value: (n === "staff-services" ? j : J.total).toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#10b981",
            yoy: n === "staff-services" ? (() => {
              const x = a(j, $?.unique_hn),
                f = J.total.toLocaleString(),
                m = j > 0 ? (J.total / j).toFixed(1) : "0";
              if (x == null) return {
                text: `${f} visits`,
                compare: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19`,
                fg: "#64748b",
                bg: "rgba(100,116,139,.08)"
              };
              const O = x >= 0;
              return {
                text: `${O?"\u25B2":"\u25BC"} ${O?"+":""}${x.toFixed(1)}%`,
                compare: `vs ${($?.unique_hn||0).toLocaleString()} \u0E23\u0E32\u0E22 \xB7 ${f} visits (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m}/\u0E04\u0E19)`,
                fg: O ? "#059669" : "#dc2626",
                bg: O ? "rgba(16,185,129,.10)" : "rgba(239,68,68,.10)"
              }
            })() : b(a(J.total, $?.total), $?.total, "\u0E23\u0E32\u0E22")
          }, ...n === "staff-services" ? [{
            label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            icon: "\u{1F4CB}",
            value: J.total.toLocaleString(),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#0d9488",
            yoy: b(a(J.total, $?.total), $?.total, "\u0E04\u0E23\u0E31\u0E49\u0E07")
          }] : [], {
            label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (OPD)",
            icon: "\u{1F6AA}",
            value: w.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            yoy: b(a(w, $?.opd_count), $?.opd_count, "\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD)",
            icon: "\u{1F6CF}\uFE0F",
            value: r.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ef4444",
            yoy: b(a(r, $?.ipd_count), $?.ipd_count, "\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            icon: "\u{1F4B0}",
            value: t.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            yoy: b(a(t, $?.total_income), $?.total_income, "\u0E3F")
          }, {
            label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 / \u0E23\u0E32\u0E22",
            icon: "\u{1F4CA}",
            value: s.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#8b5cf6",
            yoy: b(a(s, g), g, "\u0E3F/\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E41\u0E1C\u0E19\u0E01",
            icon: "\u{1F3E5}",
            value: z.length,
            unit: "\u0E41\u0E1C\u0E19\u0E01",
            color: "#ec4899",
            yoy: null
          }].map((x, f) => u.jsxs("div", {
            style: {
              position: "relative",
              overflow: "hidden",
              background: `linear-gradient(180deg, var(--md-surface, #fff) 0%, ${x.color}08 100%)`,
              border: `1px solid ${x.color}25`,
              borderRadius: "16px",
              padding: "16px 18px",
              transition: "transform .2s cubic-bezier(.4,0,.2,1), box-shadow .2s ease",
              cursor: "default",
              boxShadow: "0 1px 2px rgba(0,0,0,.04)"
            },
            onMouseEnter: m => {
              m.currentTarget.style.transform = "translateY(-2px)", m.currentTarget.style.boxShadow = `0 8px 24px ${x.color}25`
            },
            onMouseLeave: m => {
              m.currentTarget.style.transform = "", m.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,.04)"
            },
            children: [u.jsx("div", {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${x.color}, ${x.color}55)`
              }
            }), u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: `${x.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0
                },
                children: x.icon
              }), u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--md-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  lineHeight: 1.3
                },
                children: x.label
              })]
            }), u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                marginBottom: x.yoy ? "10px" : "2px"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "30px",
                  fontWeight: 900,
                  color: "var(--md-text-primary, #111827)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                  fontVariantNumeric: "tabular-nums"
                },
                children: x.value
              }), u.jsx("span", {
                style: {
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)"
                },
                children: x.unit
              })]
            }), x.yoy ? u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap"
              },
              children: [u.jsx("span", {
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "3px 8px",
                  borderRadius: "999px",
                  background: x.yoy.bg,
                  fontSize: "10px",
                  fontWeight: 800,
                  color: x.yoy.fg,
                  letterSpacing: "0.02em"
                },
                children: x.yoy.text
              }), u.jsx("span", {
                style: {
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: x.yoy.compare
              })]
            }) : null]
          }, f))
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "10px"
          },
          children: [u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E41\u0E1C\u0E19\u0E01"
            }), z.map(([x, f], m) => {
              const O = e.length > 0 ? Math.round(f.count / e.length * 100) : 0,
                t0 = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"],
                _0 = t0[m % t0.length];
              return u.jsxs("div", {
                style: {
                  marginBottom: "8px"
                },
                children: [u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "3px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-secondary)",
                      maxWidth: "70%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    title: x,
                    children: x.replace(/^\d+/, "")
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: _0
                    },
                    children: [f.count, " (", O, "%)"]
                  })]
                }), u.jsx("div", {
                  style: {
                    height: "6px",
                    borderRadius: "3px",
                    background: "var(--md-border)",
                    overflow: "hidden"
                  },
                  children: u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${O}%`,
                      borderRadius: "3px",
                      background: _0,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, m)
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38"
            }), u.jsx("div", {
              style: {
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                height: "80px",
                paddingTop: "4px"
              },
              children: Object.entries(k).map(([x, f]) => u.jsxs("div", {
                style: {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 900,
                    color: P[x]
                  },
                  children: f
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: P[x],
                    height: `${Math.max(8,f/T*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: x
                })]
              }, x))
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "Top ICD-10 Diagnoses"
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              },
              children: h.map((x, f) => {
                const m = A > 0 ? Math.round(x.count / A * 100) : 0;
                return u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#059669",
                      fontFamily: "monospace",
                      minWidth: "48px"
                    },
                    children: x.code
                  }), u.jsxs("div", {
                    style: {
                      flex: 1,
                      position: "relative",
                      height: "18px",
                      borderRadius: "4px",
                      background: "var(--md-border)",
                      overflow: "hidden"
                    },
                    children: [u.jsx("div", {
                      style: {
                        height: "100%",
                        width: `${m}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(16,185,129,.25), rgba(16,185,129,.${f===0?"5":"3"}))`,
                        transition: "width .5s ease"
                      }
                    }), u.jsx("span", {
                      style: {
                        position: "absolute",
                        left: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "var(--md-text-secondary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "calc(100% - 50px)"
                      },
                      children: x.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: x.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [x.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, f)
              })
            })]
          })]
        }), u.jsxs("div", {
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            borderRadius: "14px",
            padding: "14px 16px"
          },
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "10px",
              flexWrap: "wrap",
              gap: "6px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E27\u0E31\u0E19 \xB7 \u0E08\u0E33\u0E19\u0E27\u0E19 / \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
            }), u.jsxs("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-secondary)"
              },
              children: [F.length, " \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", o, " \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \xB7 \u0E23\u0E27\u0E21 ", p.toLocaleString(), " \u0E1A\u0E32\u0E17"]
            })]
          }), F.length === 0 ? u.jsx("div", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              textAlign: "center",
              padding: "20px 0"
            },
            children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01"
          }) : u.jsx("div", {
            style: {
              display: "flex",
              alignItems: "flex-end",
              gap: "6px",
              height: "120px",
              paddingTop: "16px"
            },
            children: F.map(x => u.jsxs("div", {
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                minWidth: 0
              },
              title: `${x.date} \xB7 ${x.count} \u0E23\u0E32\u0E22 \xB7 ${(x.income||0).toLocaleString()} \u0E1A\u0E32\u0E17`,
              children: [u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 900,
                  color: "#06b6d4"
                },
                children: x.count
              }), u.jsx("div", {
                style: {
                  width: "100%",
                  borderRadius: "6px 6px 0 0",
                  background: "linear-gradient(180deg, #06b6d4, #3b82f6)",
                  height: `${Math.max(8,x.count/X*80)}px`,
                  opacity: .85,
                  transition: "height .5s ease"
                }
              }), u.jsx("span", {
                style: {
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  whiteSpace: "nowrap"
                },
                children: x.date.substring(5)
              })]
            }, x.date))
          })]
        }), u.jsxs("div", {
          className: "rounded-2xl overflow-hidden",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            boxShadow: "0 2px 16px rgba(0,0,0,.05)"
          },
          children: [u.jsxs("div", {
            ref: Y,
            style: {
              overflowX: "auto"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "14px 24px",
                borderBottom: "2px solid var(--md-border)",
                background: "linear-gradient(135deg, rgba(16,185,129,.05), rgba(59,130,246,.05))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px"
              },
              children: [u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "20px"
                  },
                  children: "\u{1F3CB}\uFE0F"
                }), u.jsxs("div", {
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "var(--md-text-primary)"
                    },
                    children: "\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"
                  }), u.jsxs("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)"
                    },
                    children: [J.date_range.start, " \u0E16\u0E36\u0E07 ", J.date_range.end]
                  })]
                })]
              }), u.jsxs("div", {
                style: {
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap"
                },
                children: [u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(16,185,129,.1)",
                    color: "#059669",
                    border: "1px solid rgba(16,185,129,.2)"
                  },
                  children: [J.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(14,165,233,.1)",
                    color: "#0284c7",
                    border: "1px solid rgba(14,165,233,.2)"
                  },
                  children: ["OPD ", w]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(239,68,68,.1)",
                    color: "#dc2626",
                    border: "1px solid rgba(239,68,68,.2)"
                  },
                  children: ["IPD ", r]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(59,130,246,.1)",
                    color: "#2563eb",
                    border: "1px solid rgba(59,130,246,.2)"
                  },
                  children: [t.toLocaleString(), " \u0E1A\u0E32\u0E17"]
                })]
              })]
            }), u.jsxs("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "1600px"
              },
              children: [u.jsx("thead", {
                children: u.jsxs("tr", {
                  style: {
                    background: "rgba(0,0,0,.02)"
                  },
                  children: [u.jsx("th", {
                    style: {
                      ...E.th,
                      width: "36px"
                    },
                    children: "#"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      minWidth: "150px"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "HN"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2D\u0E32\u0E22\u0E38"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E41\u0E1C\u0E19\u0E01"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "Ward"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(16,185,129,.06)",
                      color: "#059669"
                    },
                    children: "ICD-10"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      background: "rgba(16,185,129,.06)",
                      color: "#059669"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04 / \u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(59,130,246,.08)",
                      color: "#2563eb"
                    },
                    children: "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"
                  })]
                })
              }), u.jsx("tbody", {
                children: N0(e).map((x, f) => {
                  const m = f % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent",
                    O = x.visit_type === "IPD";
                  return u.jsxs("tr", {
                    style: {
                      background: m,
                      transition: "background .1s"
                    },
                    onMouseEnter: t0 => t0.currentTarget.style.background = "rgba(59,130,246,.05)",
                    onMouseLeave: t0 => t0.currentTarget.style.background = m,
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        color: "var(--md-text-tertiary)",
                        fontSize: "11px"
                      },
                      children: x.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontWeight: 700
                      },
                      children: x.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: x.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        fontWeight: 800
                      },
                      children: u.jsx("span", {
                        style: {
                          padding: "2px 8px",
                          borderRadius: "6px",
                          background: O ? "rgba(239,68,68,.1)" : "rgba(14,165,233,.1)",
                          color: O ? "#dc2626" : "#0284c7",
                          border: `1px solid ${O?"rgba(239,68,68,.2)":"rgba(14,165,233,.2)"}`
                        },
                        children: x.visit_type
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px"
                      },
                      children: u.jsx("span", {
                        style: {
                          padding: "2px 7px",
                          borderRadius: "6px",
                          background: "rgba(139,92,246,.08)",
                          border: "1px solid rgba(139,92,246,.12)",
                          whiteSpace: "nowrap"
                        },
                        children: x.pttype_name
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 800,
                        color: Number(x.age_y) >= 60 ? "#ef4444" : Number(x.age_y) >= 35 ? "#f59e0b" : "#10b981"
                      },
                      children: x.age_y
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        letterSpacing: ".02em"
                      },
                      children: x.cid
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "11px"
                      },
                      children: x.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: x.department,
                      children: x.department
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: O ? "#dc2626" : "var(--md-text-tertiary)"
                      },
                      title: x.ward_name,
                      children: x.ward_name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "170px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: x.address,
                      children: x.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: x.mobile_phone_number || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        fontWeight: 800,
                        fontSize: "10px",
                        fontFamily: "monospace",
                        color: "#059669"
                      },
                      children: x.icd10 || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "170px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: x.icd10name,
                      children: x.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 900,
                        fontSize: "12px",
                        background: x.income >= 2e3 ? "rgba(59,130,246,.08)" : x.income >= 1e3 ? "rgba(59,130,246,.04)" : "transparent",
                        color: x.income >= 2e3 ? "#1d4ed8" : x.income >= 500 ? "#3b82f6" : "var(--md-text-primary)"
                      },
                      children: x.income ? x.income.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: x.chief_complaint,
                      children: x.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, x.vn || f)
                })
              }), u.jsx("tfoot", {
                children: u.jsxs("tr", {
                  style: {
                    background: "linear-gradient(90deg, rgba(16,185,129,.06), rgba(59,130,246,.06))"
                  },
                  children: [u.jsxs("td", {
                    colSpan: 14,
                    style: {
                      ...E.td,
                      textAlign: "right",
                      fontWeight: 900,
                      fontSize: "12px",
                      padding: "10px 12px",
                      borderBottom: "none"
                    },
                    children: [z0 !== "all" && J.total > z0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", z0, " \u0E08\u0E32\u0E01 ", J.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", J.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 OPD ", w, " (", c.toLocaleString(), " \u0E3F) \xB7 IPD ", r, " (", i.toLocaleString(), " \u0E3F) \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", s.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#1d4ed8",
                      borderBottom: "none"
                    },
                    children: t.toLocaleString(void 0, {
                      minimumFractionDigits: 2
                    })
                  }), u.jsx("td", {
                    style: {
                      ...E.td,
                      borderBottom: "none",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u0E1A\u0E32\u0E17"
                  })]
                })
              })]
            })]
          }), u.jsxs("div", {
            style: {
              padding: "8px 24px",
              borderTop: "1px solid var(--md-border)",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [u.jsx("span", {
              children: "HOSxP XE \xB7 \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 + PMC + \u0E28\u0E39\u0E19\u0E22\u0E4C\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 (main_dep 034, 140, 143) \xB7 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14 \xB7 LIMIT 5,000"
            }), u.jsx("span", {
              children: J.timestamp && new Date(J.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), K0.length > 0 ? u.jsx(Cu, {
          data: J0,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !C0 && n === "ncd-disease" && Q && (() => {
      const {
        pts: e,
        totalIncome: t,
        uniquePatients: s,
        avgIncome: w,
        maleCount: r,
        femaleCount: c,
        ageGroups: i,
        ageMax: y,
        topIcd: h,
        rightList: A
      } = Q, _ = b0.diseases || ["DM", "HT", "DLP", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD", "Other"], z = b0.disease_labels || {}, k = Q.diseaseCountsFE || b0.disease_counts || {}, T = {
        DM: "#ef4444",
        HT: "#f59e0b",
        DLP: "#eab308",
        IHD: "#dc2626",
        Stroke: "#8b5cf6",
        COPD: "#06b6d4",
        CKD1: "#34d399",
        CKD2: "#10b981",
        CKD3: "#059669",
        CKD4: "#047857",
        CKD5: "#065f46",
        CKD: "#6b7280",
        Other: "#94a3b8"
      }, P = Math.max(..._.map(C => k[C] || 0), 1), v = {
        "<40": "#06b6d4",
        "40-49": "#3b82f6",
        "50-59": "#10b981",
        "60-69": "#f59e0b",
        "70+": "#ef4444"
      }, F = h.slice(0, 10), X = F.length > 0 ? F[0].count : 1, p = _.filter(C => (k[C] || 0) > 0 && C !== "Other").sort((C, U) => (k[U] || 0) - (k[C] || 0)), o = p[0], $ = p[1], a = ["CKD1", "CKD2", "CKD3", "CKD4", "CKD5"].reduce((C, U) => C + (k[U] || 0), 0), g = (k.CKD3 || 0) + (k.CKD4 || 0) + (k.CKD5 || 0), b = e.length > 0 ? Math.round(t / e.length) : 0, N = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 NCD: ${e.length.toLocaleString()} visits \u0E08\u0E32\u0E01 ${s.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33 \xB7 \u0E0A\u0E32\u0E22 ${r} \u0E23\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07 ${c} \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${b.toLocaleString()} \u0E1A\u0E32\u0E17/visit`];
      if (o && N.push(`\u{1FA7A} \u0E42\u0E23\u0E04\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${z[o]||o} ${(k[o]||0).toLocaleString()} \u0E23\u0E32\u0E22${$?` \xB7 \u0E23\u0E2D\u0E07\u0E21\u0E32 ${z[$]||$} ${(k[$]||0).toLocaleString()} \u0E23\u0E32\u0E22`:""}${["DM","HT","DLP"].includes(o)?" \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19 NCD \u0E04\u0E27\u0E23\u0E40\u0E02\u0E49\u0E21\u0E07\u0E27\u0E14\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07 self-care + \u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25 HbA1c/BP":o==="Stroke"||o==="IHD"?" \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08\u0E2B\u0E25\u0E2D\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 specialist \u0E41\u0E25\u0E30 rehab":""}`), a > 0) {
        const C = s > 0 ? Math.round(a / s * 100) : 0,
          U = a > 0 ? Math.round(g / a * 100) : 0;
        N.push(`\u{1FAC0} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E23\u0E27\u0E21 ${a.toLocaleString()} \u0E23\u0E32\u0E22 (${C}% \u0E02\u0E2D\u0E07 HN) \xB7 \u0E23\u0E30\u0E22\u0E30 3-5 ${g.toLocaleString()} \u0E23\u0E32\u0E22 (${U}%) \u2014 ${g>=50?"\u{1F534} \u0E21\u0E35 CKD \u0E23\u0E30\u0E22\u0E30\u0E25\u0E36\u0E01\u0E08\u0E33\u0E19\u0E27\u0E19\u0E21\u0E32\u0E01 \u0E15\u0E49\u0E2D\u0E07 early referral \u0E44\u0E1B\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 nephrology + \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 dialysis":g>=10?"\u{1F7E0} \u0E04\u0E27\u0E23 monitor eGFR \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 + \u0E1B\u0E23\u0E31\u0E1A\u0E22\u0E32\u0E43\u0E2B\u0E49\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07":"\u{1F7E2} \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E22\u0E30\u0E15\u0E49\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E19\u0E49\u0E19 primary prevention"}`)
      }
      if (F[0] && N.push(`\u{1F48A} \u0E23\u0E2B\u0E31\u0E2A ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E2A\u0E38\u0E14: ${F[0].code} ${F[0].name||""} (${F[0].count} \u0E23\u0E32\u0E22) \u2014 ${F[0].code.startsWith("E11")||F[0].code.startsWith("E10")?"DM \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 complications: retinopathy, neuropathy, nephropathy":F[0].code.startsWith("I10")?"Hypertension \u0E04\u0E27\u0E23 monitor BP \u0E17\u0E38\u0E01 visit + \u0E1B\u0E23\u0E31\u0E1A lifestyle":F[0].code.startsWith("N18")?"CKD progression \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E43\u0E01\u0E25\u0E49\u0E0A\u0E34\u0E14":"\u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 comorbidities \u0E40\u0E1E\u0E37\u0E48\u0E2D holistic care"}`), (k.DM || 0) > 0 && (k.HT || 0) > 0) {
        const C = Math.min(k.DM, k.HT);
        N.push(`\u26A0\uFE0F \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 DM + HT \u0E23\u0E48\u0E27\u0E21: \u0E04\u0E32\u0E14\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${C.toLocaleString()} \u0E23\u0E32\u0E22 (overlap) \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 CV/CKD \u0E2A\u0E39\u0E07 \xB7 \u0E04\u0E27\u0E23\u0E21\u0E35 integrated NCD clinic \u0E17\u0E35\u0E48\u0E14\u0E39\u0E41\u0E25\u0E04\u0E23\u0E1A\u0E17\u0E31\u0E49\u0E07 2 \u0E42\u0E23\u0E04\u0E43\u0E19\u0E04\u0E23\u0E31\u0E49\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27 \u0E25\u0E14 visit \u0E0B\u0E49\u0E33`)
      }
      N.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22: NCD \u0E40\u0E1B\u0E47\u0E19 70% \u0E02\u0E2D\u0E07 DALYs \u0E43\u0E19\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22 \xB7 \u0E04\u0E27\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07 patient registry, integrated care pathway, telehealth follow-up \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HbA1c<7%, BP<140/90 \u0E43\u0E19\u0E17\u0E38\u0E01 guidelines");
      const D = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: N
      };
      return u.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        },
        children: [u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "10px"
          },
          children: [{
            label: "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit NCD",
            value: e.length.toLocaleString(),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#a855f7",
            gradient: "linear-gradient(135deg, rgba(168,85,247,.12), rgba(168,85,247,.04))",
            border: "rgba(168,85,247,.25)"
          }, {
            label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
            value: s.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#7c3aed",
            gradient: "linear-gradient(135deg, rgba(124,58,237,.12), rgba(124,58,237,.04))",
            border: "rgba(124,58,237,.25)"
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
            value: t.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#10b981",
            gradient: "linear-gradient(135deg, rgba(16,185,129,.12), rgba(16,185,129,.04))",
            border: "rgba(16,185,129,.25)"
          }, {
            label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit",
            value: w.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            gradient: "linear-gradient(135deg, rgba(59,130,246,.12), rgba(59,130,246,.04))",
            border: "rgba(59,130,246,.25)"
          }, {
            label: "\u0E0A\u0E32\u0E22",
            value: r.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,.12), rgba(14,165,233,.04))",
            border: "rgba(14,165,233,.25)"
          }, {
            label: "\u0E2B\u0E0D\u0E34\u0E07",
            value: c.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }].map((C, U) => u.jsxs("div", {
            style: {
              background: C.gradient,
              border: `1px solid ${C.border}`,
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                marginBottom: "4px"
              },
              children: C.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: C.color,
                lineHeight: 1.1
              },
              children: [C.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: C.unit
              })]
            })]
          }, U))
        }), (() => {
          const C = ["DM", "HT", "DLP", "IHD", "Stroke", "COPD"].filter(R => _.includes(R)),
            U = ["CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD"].filter(R => _.includes(R)),
            j = k.Other || 0,
            W = U.reduce((R, H) => R + (k[H] || 0), 0),
            B = ({
              dg: R
            }) => {
              const H = k[R] || 0,
                q = e.length > 0 ? Math.round(H / e.length * 100) : 0,
                r0 = T[R] || "#7c3aed";
              return u.jsxs("div", {
                style: {
                  background: `linear-gradient(135deg, ${r0}14, ${r0}06)`,
                  border: `1px solid ${r0}33`,
                  borderRadius: "14px",
                  padding: "14px 16px",
                  position: "relative",
                  overflow: "hidden"
                },
                children: [u.jsx("div", {
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "4px",
                    height: "100%",
                    background: r0,
                    opacity: .7
                  }
                }), u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "8px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "15px",
                      fontWeight: 900,
                      color: r0,
                      letterSpacing: ".02em"
                    },
                    children: R
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: r0,
                      opacity: .85,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: `${r0}1a`
                    },
                    children: [q, "%"]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    lineHeight: 1
                  },
                  children: [H.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "5px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: z[R],
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: z[R]
                }), u.jsx("div", {
                  style: {
                    height: "4px",
                    borderRadius: "2px",
                    background: "var(--md-border)",
                    overflow: "hidden",
                    marginTop: "8px"
                  },
                  children: u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${H/P*100}%`,
                      borderRadius: "2px",
                      background: r0,
                      transition: "width .5s ease"
                    }
                  })
                })]
              })
            },
            L = ({
              dg: R
            }) => {
              const H = k[R] || 0,
                q = W > 0 ? Math.round(H / W * 100) : 0,
                r0 = T[R] || "#10b981",
                o0 = R === "CKD" ? "?" : R.replace("CKD", "");
              return u.jsxs("div", {
                style: {
                  background: "var(--md-surface)",
                  border: `1px solid ${r0}30`,
                  borderRadius: "12px",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                },
                children: [u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#fff",
                      background: r0,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      letterSpacing: ".03em"
                    },
                    children: ["Stage ", o0]
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: [q, "%"]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: r0,
                    lineHeight: 1
                  },
                  children: [H.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "4px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: z[R],
                  style: {
                    fontSize: "9px",
                    color: "var(--md-text-tertiary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600
                  },
                  children: z[R]?.replace(/^CKD Stage \d+ /, "").replace(/^CKD /, "")
                })]
              })
            };
          return u.jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            },
            children: [u.jsxs("div", {
              children: [u.jsxs("div", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "var(--md-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "14px"
                  },
                  children: "\u{1FA7A}"
                }), u.jsx("span", {
                  children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E2B\u0E25\u0E31\u0E01 (Primary NCDs)"
                }), u.jsx("span", {
                  style: {
                    flex: 1,
                    height: "1px",
                    background: "var(--md-border)"
                  }
                })]
              }), u.jsx("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(C.length,6)}, minmax(0, 1fr))`,
                  gap: "10px"
                },
                children: C.map(R => u.jsx(B, {
                  dg: R
                }, R))
              })]
            }), U.length > 0 && u.jsxs("div", {
              children: [u.jsxs("div", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "var(--md-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "14px"
                  },
                  children: "\u{1FAD8}"
                }), u.jsx("span", {
                  children: "CKD Stage Breakdown"
                }), u.jsxs("span", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#059669",
                    padding: "1px 8px",
                    borderRadius: "99px",
                    background: "rgba(16,185,129,.1)"
                  },
                  children: ["\u0E23\u0E27\u0E21 ", W.toLocaleString(), " visit"]
                }), u.jsx("span", {
                  style: {
                    flex: 1,
                    height: "1px",
                    background: "var(--md-border)"
                  }
                })]
              }), u.jsx("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: `repeat(${U.length}, minmax(0, 1fr))`,
                  gap: "8px"
                },
                children: U.map(R => u.jsx(L, {
                  dg: R
                }, R))
              })]
            }), j > 0 && u.jsxs("div", {
              style: {
                background: "rgba(148,163,184,.04)",
                border: "1px dashed rgba(148,163,184,.4)",
                borderRadius: "12px",
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px"
              },
              children: [u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#fff",
                    background: "#94a3b8",
                    padding: "3px 10px",
                    borderRadius: "99px"
                  },
                  children: "OTHER"
                }), u.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--md-text-secondary)"
                  },
                  children: z.Other || "\u0E21\u0E32\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 NCD \u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04 NCD"
                })]
              }), u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#475569"
                  },
                  children: j.toLocaleString()
                }), u.jsx("span", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "visit"
                }), u.jsxs("span", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#94a3b8",
                    marginLeft: "4px"
                  },
                  children: ["(", e.length > 0 ? Math.round(j / e.length * 100) : 0, "%)"]
                })]
              })]
            })]
          })
        })(), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "10px"
          },
          children: [u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34"
            }), A.slice(0, 8).map(([C, U], j) => {
              const W = e.length > 0 ? Math.round(U.count / e.length * 100) : 0,
                B = ["#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                L = B[j % B.length];
              return u.jsxs("div", {
                style: {
                  marginBottom: "8px"
                },
                children: [u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "3px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-secondary)",
                      maxWidth: "70%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    title: C,
                    children: C
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: L
                    },
                    children: [U.count, " (", W, "%)"]
                  })]
                }), u.jsx("div", {
                  style: {
                    height: "6px",
                    borderRadius: "3px",
                    background: "var(--md-border)",
                    overflow: "hidden"
                  },
                  children: u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${W}%`,
                      borderRadius: "3px",
                      background: L,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, j)
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38"
            }), u.jsx("div", {
              style: {
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                height: "80px",
                paddingTop: "4px"
              },
              children: Object.entries(i).map(([C, U]) => u.jsxs("div", {
                style: {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 900,
                    color: v[C]
                  },
                  children: U
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: v[C],
                    height: `${Math.max(8,U/y*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: C
                })]
              }, C))
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "Top ICD-10 NCD"
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              },
              children: F.map((C, U) => {
                const j = X > 0 ? Math.round(C.count / X * 100) : 0;
                return u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#a855f7",
                      fontFamily: "monospace",
                      minWidth: "48px"
                    },
                    children: C.code
                  }), u.jsxs("div", {
                    style: {
                      flex: 1,
                      position: "relative",
                      height: "18px",
                      borderRadius: "4px",
                      background: "var(--md-border)",
                      overflow: "hidden"
                    },
                    children: [u.jsx("div", {
                      style: {
                        height: "100%",
                        width: `${j}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(168,85,247,.25), rgba(168,85,247,.${U===0?"5":"3"}))`,
                        transition: "width .5s ease"
                      }
                    }), u.jsx("span", {
                      style: {
                        position: "absolute",
                        left: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "var(--md-text-secondary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "calc(100% - 50px)"
                      },
                      children: C.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: C.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [C.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, U)
              })
            })]
          })]
        }), u.jsxs("div", {
          className: "rounded-2xl overflow-hidden",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            boxShadow: "0 2px 16px rgba(0,0,0,.05)"
          },
          children: [u.jsxs("div", {
            ref: Y,
            style: {
              overflowX: "auto"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "14px 24px",
                borderBottom: "2px solid var(--md-border)",
                background: "linear-gradient(135deg, rgba(168,85,247,.05), rgba(236,72,153,.05))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px"
              },
              children: [u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "20px"
                  },
                  children: "\u{1FAC0}"
                }), u.jsxs("div", {
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "var(--md-text-primary)"
                    },
                    children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04"
                  }), u.jsxs("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)"
                    },
                    children: [b0.date_range.start, " \u0E16\u0E36\u0E07 ", b0.date_range.end]
                  })]
                })]
              }), u.jsxs("div", {
                style: {
                  display: "flex",
                  gap: "12px"
                },
                children: [u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(168,85,247,.1)",
                    color: "#a855f7",
                    border: "1px solid rgba(168,85,247,.2)"
                  },
                  children: [e.length.toLocaleString(), " visit"]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(124,58,237,.1)",
                    color: "#7c3aed",
                    border: "1px solid rgba(124,58,237,.2)"
                  },
                  children: [s.toLocaleString(), " \u0E23\u0E32\u0E22"]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(16,185,129,.1)",
                    color: "#059669",
                    border: "1px solid rgba(16,185,129,.2)"
                  },
                  children: [t.toLocaleString(), " \u0E1A\u0E32\u0E17"]
                })]
              })]
            }), u.jsxs("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "1700px"
              },
              children: [u.jsx("thead", {
                children: u.jsxs("tr", {
                  style: {
                    background: "rgba(0,0,0,.02)"
                  },
                  children: [u.jsx("th", {
                    style: {
                      ...E.th,
                      width: "36px"
                    },
                    children: "#"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      minWidth: "150px"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "HN"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E1E\u0E28"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2D\u0E32\u0E22\u0E38"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E27\u0E25\u0E32"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(168,85,247,.06)",
                      color: "#a855f7"
                    },
                    children: "\u0E01\u0E25\u0E38\u0E48\u0E21 NCD"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(16,185,129,.06)",
                      color: "#059669"
                    },
                    children: "ICD-10"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      background: "rgba(16,185,129,.06)",
                      color: "#059669"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04"
                  }), u.jsxs("th", {
                    style: {
                      ...E.th,
                      background: "rgba(16,185,129,.05)",
                      color: "#047857"
                    },
                    children: ["Cr", u.jsx("br", {}), "(mg/dL)"]
                  }), u.jsxs("th", {
                    style: {
                      ...E.th,
                      background: "rgba(16,185,129,.05)",
                      color: "#047857"
                    },
                    children: ["eGFR", u.jsx("br", {}), "(ml/min)"]
                  }), u.jsxs("th", {
                    style: {
                      ...E.th,
                      background: "rgba(16,185,129,.05)",
                      color: "#047857"
                    },
                    children: ["CKD", u.jsx("br", {}), "Stage"]
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(59,130,246,.08)",
                      color: "#2563eb"
                    },
                    children: "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"
                  })]
                })
              }), u.jsx("tbody", {
                children: N0(e).map((C, U) => {
                  const j = U % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: j,
                      transition: "background .1s"
                    },
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)"
                      },
                      children: C.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                      },
                      children: C.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: C.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: C.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899"
                      },
                      children: C.sex || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: C.age_y ?? "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: C.pttype_name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: C.cid || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: C.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px",
                        color: "var(--md-text-tertiary)"
                      },
                      children: C.vsttime || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "220px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: C.address,
                      children: C.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: C.mobile_phone_number || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(168,85,247,.04)",
                        fontWeight: 800,
                        color: "#a855f7",
                        fontSize: "11px"
                      },
                      children: C.disease_groups || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#059669"
                      },
                      children: C.icd10 || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        background: "rgba(16,185,129,.03)",
                        fontSize: "11px",
                        maxWidth: "240px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: C.icd10name,
                      children: C.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.025)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        color: "var(--md-text-secondary)"
                      },
                      children: C.creatinine != null ? Number(C.creatinine).toFixed(2) : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.025)",
                        fontWeight: 800,
                        color: C.egfr == null ? "var(--md-text-tertiary)" : C.egfr < 30 ? "#dc2626" : C.egfr < 60 ? "#ea580c" : "#059669"
                      },
                      children: C.egfr != null ? C.egfr : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.025)"
                      },
                      children: C.ckd_stage ? u.jsx("span", {
                        style: {
                          padding: "2px 8px",
                          borderRadius: "99px",
                          fontSize: "10px",
                          fontWeight: 800,
                          background: C.ckd_stage === "CKD5" ? "rgba(220,38,38,.12)" : C.ckd_stage === "CKD4" ? "rgba(234,88,12,.12)" : C.ckd_stage === "CKD3" ? "rgba(245,158,11,.12)" : "rgba(16,185,129,.12)",
                          color: C.ckd_stage === "CKD5" ? "#dc2626" : C.ckd_stage === "CKD4" ? "#ea580c" : C.ckd_stage === "CKD3" ? "#d97706" : "#059669"
                        },
                        children: C.ckd_stage
                      }) : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(59,130,246,.04)",
                        fontWeight: 800,
                        color: "#2563eb"
                      },
                      children: C.income ? C.income.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: C.chief_complaint,
                      children: C.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, C.vn || U)
                })
              }), u.jsx("tfoot", {
                children: u.jsxs("tr", {
                  style: {
                    background: "linear-gradient(90deg, rgba(168,85,247,.06), rgba(59,130,246,.06))"
                  },
                  children: [u.jsxs("td", {
                    colSpan: 17,
                    style: {
                      ...E.td,
                      textAlign: "right",
                      fontWeight: 900,
                      fontSize: "12px",
                      padding: "10px 12px",
                      borderBottom: "none"
                    },
                    children: [z0 !== "all" && e.length > z0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", z0, " \u0E08\u0E32\u0E01 ", e.length.toLocaleString(), " visit \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", e.length.toLocaleString(), " visit \xB7 ", s.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", w.toLocaleString(), " \u0E1A\u0E32\u0E17/visit"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#1d4ed8",
                      borderBottom: "none"
                    },
                    children: t.toLocaleString()
                  }), u.jsx("td", {
                    style: {
                      ...E.td,
                      borderBottom: "none",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u0E1A\u0E32\u0E17"
                  })]
                })
              })]
            })]
          }), u.jsxs("div", {
            style: {
              padding: "8px 24px",
              borderTop: "1px solid var(--md-border)",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [u.jsx("span", {
              children: "HOSxP XE \xB7 ovst + ovstdiag \xB7 main_dep=024 \xB7 CKD Stage \u0E08\u0E32\u0E01 eGFR (CKD-EPI 2009) \xB7 LIMIT 5,000"
            }), u.jsx("span", {
              children: b0.timestamp && new Date(b0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), N.length > 0 ? u.jsx(Cu, {
          data: D,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !C0 && n === "imaging-services" && l0?.patients && (() => {
      const e = l0.patients,
        t = l0.services || ["XRAY", "CT", "Portable", "BMD"],
        s = l0.service_labels || {},
        w = l0.service_counts || {},
        r = l0.total_income || 0,
        c = l0.total_imaging_price || 0,
        i = l0.unique_patients || 0,
        y = e.length > 0 ? Math.round(c / e.length) : 0,
        h = e.filter(j => j.sex === "\u0E0A\u0E32\u0E22").length,
        A = e.filter(j => j.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
        _ = {
          XRAY: "#3b82f6",
          CT: "#7c3aed",
          Portable: "#f59e0b",
          BMD: "#ec4899"
        },
        z = Math.max(...t.map(j => w[j] || 0), 1),
        k = {
          "<20": 0,
          "20-39": 0,
          "40-59": 0,
          "60-79": 0,
          "80+": 0
        };
      e.forEach(j => {
        const W = Number(j.age_y) || 0;
        W < 20 ? k["<20"]++ : W < 40 ? k["20-39"]++ : W < 60 ? k["40-59"]++ : W < 80 ? k["60-79"]++ : k["80+"]++
      });
      const T = Math.max(...Object.values(k), 1),
        P = {
          "<20": "#06b6d4",
          "20-39": "#3b82f6",
          "40-59": "#10b981",
          "60-79": "#f59e0b",
          "80+": "#ef4444"
        },
        v = {};
      e.forEach(j => {
        (j.icd_pairs || "").split("||").filter(Boolean).forEach(W => {
          const [B, L] = W.split("::"), R = (B || "").trim().toUpperCase();
          !R || !cu.test(R) || (v[R] || (v[R] = {
            code: R,
            name: L || "",
            count: 0,
            totalInc: 0
          }), v[R].count++, v[R].totalInc += j.income || 0)
        })
      });
      const F = Object.values(v).sort((j, W) => W.count - j.count).slice(0, 10),
        X = F.length > 0 ? F[0].count : 1,
        p = {};
      e.forEach(j => {
        const W = j.pttype_name || "-";
        p[W] || (p[W] = {
          count: 0,
          income: 0
        }), p[W].count++, p[W].income += j.income || 0
      });
      const o = Object.entries(p).sort((j, W) => W[1].count - j[1].count),
        $ = t.reduce((j, W) => j + (w[W] || 0), 0),
        a = t.reduce((j, W) => (w[W] || 0) > (w[j] || 0) ? W : j, t[0]),
        g = Object.entries(k).reduce((j, [W, B]) => B > j[1] ? [W, B] : j, ["", 0]),
        b = e.length > 0 ? Math.round(c / e.length) : 0,
        N = F.length > 0 ? F[0] : null,
        D = o.length > 0 ? o[0] : null,
        C = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32: ${e.length.toLocaleString()} visits \u0E08\u0E32\u0E01 ${i.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33 \xB7 \u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 ${c.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${b.toLocaleString()} \u0E1A\u0E32\u0E17/visit \xB7 \u0E0A\u0E32\u0E22 ${h} / \u0E2B\u0E0D\u0E34\u0E07 ${A}`];
      if (a && $ > 0) {
        const j = Math.round((w[a] || 0) / $ * 100);
        C.push(`\u{1FA7B} \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${a} ${(w[a]||0).toLocaleString()} \u0E04\u0E23\u0E31\u0E49\u0E07 (${j}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14) \u2014 ${a==="XRAY"?"X-Ray \u0E40\u0E1B\u0E47\u0E19 routine \u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 \u0E04\u0E27\u0E23 monitor TAT \u0E43\u0E2B\u0E49 \u226430 \u0E19\u0E32\u0E17\u0E35":a==="CT"?"CT \u0E21\u0E35\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E2A\u0E39\u0E07 \u0E15\u0E49\u0E2D\u0E07 justify clinical indication \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E02\u0E49\u0E21\u0E07\u0E27\u0E14 \u0E25\u0E14 unnecessary scan":a==="Portable"?"Portable X-Ray \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E40\u0E15\u0E35\u0E22\u0E07 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E25\u0E30 infection control":"\u0E15\u0E23\u0E27\u0E08\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01 \u0E04\u0E27\u0E23\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A T-score follow-up plan"}`)
      }
      if (g[0]) {
        const j = e.length > 0 ? Math.round(g[1] / e.length * 100) : 0;
        C.push(`\u{1F465} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${g[0]} \u0E1B\u0E35 ${g[1]} \u0E23\u0E32\u0E22 (${j}%) \u2014 ${g[0]==="60-79"||g[0]==="80+"?"\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2B\u0E25\u0E31\u0E01 \u0E04\u0E27\u0E23\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 CXR + BMD \u0E40\u0E1B\u0E47\u0E19\u0E0A\u0E38\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35":g[0]==="40-59"?"\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E08\u0E32\u0E01 trauma \u0E2B\u0E23\u0E37\u0E2D chronic disease screening":"\u0E27\u0E31\u0E22\u0E2B\u0E19\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E27/\u0E40\u0E14\u0E47\u0E01 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E08\u0E32\u0E01 trauma + acute condition"}`)
      }
      if (N && C.push(`\u{1F50D} \u0E02\u0E49\u0E2D\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22: ${N.code} ${N.name||""} (${N.count} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${N.totalInc.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17) \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E15\u0E32\u0E21 ACR appropriateness criteria`), D) {
        const [j, W] = D, B = e.length > 0 ? Math.round(W.count / e.length * 100) : 0;
        B >= 40 && C.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${j} ${W.count} \u0E04\u0E23\u0E31\u0E49\u0E07 (${B}%) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${W.income.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17`)
      }
      C.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E23\u0E31\u0E07\u0E2A\u0E35: (1) \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A TAT \u0E02\u0E2D\u0E07 report turnaround \u226424 \u0E0A\u0E21. \xB7 (2) Audit indication \u0E02\u0E2D\u0E07 CT \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 (3) \u0E25\u0E14 radiation exposure \u0E15\u0E32\u0E21 ALARA \xB7 (4) Tele-radiology \u0E40\u0E1E\u0E37\u0E48\u0E2D second opinion \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19");
      const U = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: C
      };
      return u.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        },
        children: [u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "10px"
          },
          children: [{
            label: "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit",
            value: e.length.toLocaleString(),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#7c3aed",
            gradient: "linear-gradient(135deg, rgba(124,58,237,.12), rgba(124,58,237,.04))",
            border: "rgba(124,58,237,.25)"
          }, {
            label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
            value: i.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#a855f7",
            gradient: "linear-gradient(135deg, rgba(168,85,247,.12), rgba(168,85,247,.04))",
            border: "rgba(168,85,247,.25)"
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Imaging",
            value: c.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#10b981",
            gradient: "linear-gradient(135deg, rgba(16,185,129,.12), rgba(16,185,129,.04))",
            border: "rgba(16,185,129,.25)"
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Visit",
            value: r.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#047857",
            gradient: "linear-gradient(135deg, rgba(4,120,87,.12), rgba(4,120,87,.04))",
            border: "rgba(4,120,87,.25)"
          }, {
            label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Imaging/\u0E23\u0E32\u0E22",
            value: y.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            gradient: "linear-gradient(135deg, rgba(59,130,246,.12), rgba(59,130,246,.04))",
            border: "rgba(59,130,246,.25)"
          }, {
            label: "\u0E0A\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07",
            value: `${h} / ${A}`,
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,.12), rgba(14,165,233,.04))",
            border: "rgba(14,165,233,.25)"
          }].map((j, W) => u.jsxs("div", {
            style: {
              background: j.gradient,
              border: `1px solid ${j.border}`,
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".05em",
                marginBottom: "4px"
              },
              children: j.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: j.color,
                lineHeight: 1.1
              },
              children: [j.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: j.unit
              })]
            })]
          }, W))
        }), u.jsxs("div", {
          children: [u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 800,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: ".05em",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [u.jsx("span", {
              style: {
                fontSize: "14px"
              },
              children: "\u{1FA7B}"
            }), u.jsx("span", {
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 Imaging"
            }), u.jsx("span", {
              style: {
                flex: 1,
                height: "1px",
                background: "var(--md-border)"
              }
            })]
          }), u.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: `repeat(${t.length}, minmax(0, 1fr))`,
              gap: "10px"
            },
            children: t.map(j => {
              const W = w[j] || 0,
                B = e.length > 0 ? Math.round(W / e.length * 100) : 0,
                L = _[j] || "#7c3aed";
              return u.jsxs("div", {
                style: {
                  background: `linear-gradient(135deg, ${L}14, ${L}06)`,
                  border: `1px solid ${L}33`,
                  borderRadius: "14px",
                  padding: "14px 16px",
                  position: "relative",
                  overflow: "hidden"
                },
                children: [u.jsx("div", {
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "4px",
                    height: "100%",
                    background: L,
                    opacity: .7
                  }
                }), u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "8px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "15px",
                      fontWeight: 900,
                      color: L,
                      letterSpacing: ".02em"
                    },
                    children: j
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: L,
                      opacity: .85,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: `${L}1a`
                    },
                    children: [B, "%"]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    lineHeight: 1
                  },
                  children: [W.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "5px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: s[j],
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: s[j]
                }), u.jsx("div", {
                  style: {
                    height: "4px",
                    borderRadius: "2px",
                    background: "var(--md-border)",
                    overflow: "hidden",
                    marginTop: "8px"
                  },
                  children: u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${W/z*100}%`,
                      borderRadius: "2px",
                      background: L,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, j)
            })
          })]
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "10px"
          },
          children: [u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34"
            }), o.slice(0, 8).map(([j, W], B) => {
              const L = e.length > 0 ? Math.round(W.count / e.length * 100) : 0,
                R = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                H = R[B % R.length];
              return u.jsxs("div", {
                style: {
                  marginBottom: "8px"
                },
                children: [u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "3px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-secondary)",
                      maxWidth: "70%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    title: j,
                    children: j
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: H
                    },
                    children: [W.count, " (", L, "%)"]
                  })]
                }), u.jsx("div", {
                  style: {
                    height: "6px",
                    borderRadius: "3px",
                    background: "var(--md-border)",
                    overflow: "hidden"
                  },
                  children: u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${L}%`,
                      borderRadius: "3px",
                      background: H,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, B)
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38"
            }), u.jsx("div", {
              style: {
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                height: "80px",
                paddingTop: "4px"
              },
              children: Object.entries(k).map(([j, W]) => u.jsxs("div", {
                style: {
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 900,
                    color: P[j]
                  },
                  children: W
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: P[j],
                    height: `${Math.max(8,W/T*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: j
                })]
              }, j))
            })]
          }), u.jsxs("div", {
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderRadius: "14px",
              padding: "14px 16px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em",
                marginBottom: "10px"
              },
              children: "Top ICD-10"
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              },
              children: F.map((j, W) => {
                const B = X > 0 ? Math.round(j.count / X * 100) : 0;
                return u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#a855f7",
                      fontFamily: "monospace",
                      minWidth: "48px"
                    },
                    children: j.code
                  }), u.jsxs("div", {
                    style: {
                      flex: 1,
                      position: "relative",
                      height: "18px",
                      borderRadius: "4px",
                      background: "var(--md-border)",
                      overflow: "hidden"
                    },
                    children: [u.jsx("div", {
                      style: {
                        height: "100%",
                        width: `${B}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(168,85,247,.25), rgba(168,85,247,.${W===0?"5":"3"}))`,
                        transition: "width .5s ease"
                      }
                    }), u.jsx("span", {
                      style: {
                        position: "absolute",
                        left: "6px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "8px",
                        fontWeight: 700,
                        color: "var(--md-text-secondary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "calc(100% - 50px)"
                      },
                      children: j.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: j.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [j.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, W)
              })
            })]
          })]
        }), u.jsxs("div", {
          className: "rounded-2xl overflow-hidden",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            boxShadow: "0 2px 16px rgba(0,0,0,.05)"
          },
          children: [u.jsxs("div", {
            ref: Y,
            style: {
              overflowX: "auto"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "14px 24px",
                borderBottom: "2px solid var(--md-border)",
                background: "linear-gradient(135deg, rgba(124,58,237,.05), rgba(168,85,247,.05))",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px"
              },
              children: [u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "20px"
                  },
                  children: "\u{1FA7B}"
                }), u.jsxs("div", {
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "var(--md-text-primary)"
                    },
                    children: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 XRAY / CT / Portable / BMD"
                  }), u.jsxs("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)"
                    },
                    children: [l0.date_range.start, " \u0E16\u0E36\u0E07 ", l0.date_range.end]
                  })]
                })]
              }), u.jsxs("div", {
                style: {
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap"
                },
                children: [u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(124,58,237,.1)",
                    color: "#7c3aed",
                    border: "1px solid rgba(124,58,237,.2)"
                  },
                  children: [e.length.toLocaleString(), " visit"]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(168,85,247,.1)",
                    color: "#a855f7",
                    border: "1px solid rgba(168,85,247,.2)"
                  },
                  children: [i.toLocaleString(), " \u0E23\u0E32\u0E22"]
                }), u.jsxs("span", {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "99px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(16,185,129,.1)",
                    color: "#059669",
                    border: "1px solid rgba(16,185,129,.2)"
                  },
                  children: [c.toLocaleString(), " \u0E1A\u0E32\u0E17 (Imaging)"]
                })]
              })]
            }), u.jsxs("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "1700px"
              },
              children: [u.jsx("thead", {
                children: u.jsxs("tr", {
                  style: {
                    background: "rgba(0,0,0,.02)"
                  },
                  children: [u.jsx("th", {
                    style: {
                      ...E.th,
                      width: "36px"
                    },
                    children: "#"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      minWidth: "150px"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "HN"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E40\u0E1E\u0E28"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2D\u0E32\u0E22\u0E38"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                  }), u.jsx("th", {
                    style: E.th,
                    children: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(124,58,237,.06)",
                      color: "#7c3aed"
                    },
                    children: "\u0E01\u0E25\u0E38\u0E48\u0E21"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      background: "rgba(124,58,237,.06)",
                      color: "#7c3aed"
                    },
                    children: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 Imaging"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(16,185,129,.06)",
                      color: "#059669"
                    },
                    children: "\u0E04\u0E48\u0E32 Imaging"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(168,85,247,.06)",
                      color: "#a855f7"
                    },
                    children: "ICD-10"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left",
                      background: "rgba(168,85,247,.06)",
                      color: "#a855f7"
                    },
                    children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      background: "rgba(59,130,246,.08)",
                      color: "#2563eb"
                    },
                    children: "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19"
                  }), u.jsx("th", {
                    style: {
                      ...E.th,
                      textAlign: "left"
                    },
                    children: "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"
                  })]
                })
              }), u.jsx("tbody", {
                children: N0(e).map((j, W) => {
                  const B = W % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: B,
                      transition: "background .1s"
                    },
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)"
                      },
                      children: j.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                      },
                      children: j.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: j.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: j.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899"
                      },
                      children: j.sex || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: j.age_y ?? "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: j.pttype_name || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: j.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(124,58,237,.04)",
                        fontWeight: 800,
                        color: "#7c3aed",
                        fontSize: "11px"
                      },
                      children: j.service_groups || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        background: "rgba(124,58,237,.03)",
                        fontSize: "10px",
                        maxWidth: "260px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: j.service_names,
                      children: j.service_names || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.04)",
                        fontWeight: 800,
                        color: "#059669"
                      },
                      children: j.imaging_price ? j.imaging_price.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(168,85,247,.03)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#a855f7"
                      },
                      children: j.icd10 || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        background: "rgba(168,85,247,.03)",
                        fontSize: "11px",
                        maxWidth: "240px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: j.icd10name,
                      children: j.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(59,130,246,.04)",
                        fontWeight: 800,
                        color: "#2563eb"
                      },
                      children: j.income ? j.income.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontSize: "10px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: "var(--md-text-secondary)"
                      },
                      title: j.chief_complaint,
                      children: j.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, j.vn || W)
                })
              }), u.jsx("tfoot", {
                children: u.jsxs("tr", {
                  style: {
                    background: "linear-gradient(90deg, rgba(124,58,237,.06), rgba(168,85,247,.06))"
                  },
                  children: [u.jsxs("td", {
                    colSpan: 11,
                    style: {
                      ...E.td,
                      textAlign: "right",
                      fontWeight: 900,
                      fontSize: "12px",
                      padding: "10px 12px",
                      borderBottom: "none"
                    },
                    children: [z0 !== "all" && e.length > z0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", z0, " \u0E08\u0E32\u0E01 ", e.length.toLocaleString(), " visit \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", e.length.toLocaleString(), " visit \xB7 ", i.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 Imaging:"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#059669",
                      borderBottom: "none"
                    },
                    children: c.toLocaleString()
                  }), u.jsx("td", {
                    style: {
                      ...E.td,
                      borderBottom: "none"
                    }
                  }), u.jsx("td", {
                    style: {
                      ...E.td,
                      borderBottom: "none"
                    }
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#1d4ed8",
                      borderBottom: "none"
                    },
                    children: r.toLocaleString()
                  }), u.jsx("td", {
                    style: {
                      ...E.td,
                      borderBottom: "none",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: "\u0E1A\u0E32\u0E17"
                  })]
                })
              })]
            })]
          }), u.jsxs("div", {
            style: {
              padding: "8px 24px",
              borderTop: "1px solid var(--md-border)",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            },
            children: [u.jsx("span", {
              children: "HOSxP XE \xB7 ovst + opitemrece + nondrugitems \xB7 \u0E08\u0E33\u0E41\u0E19\u0E01 XRAY/CT/Portable/BMD \xB7 LIMIT 5,000"
            }), u.jsx("span", {
              children: l0.timestamp && new Date(l0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), C.length > 0 ? u.jsx(Cu, {
          data: U,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !C0 && n === "pttype-services" && u0?.groups && (() => {
      const e = u0.group_order || ["UC", "\u0E02\u0E49\u0E32\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23 / \u0E2D\u0E1B\u0E17", "\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07", "\u0E15\u0E48\u0E32\u0E07\u0E0A\u0E32\u0E15\u0E34 (1.5 \u0E40\u0E17\u0E48\u0E32)", "\u0E15\u0E48\u0E32\u0E07\u0E14\u0E49\u0E32\u0E27", "\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19\u0E2A\u0E31\u0E07\u0E04\u0E21", "\u0E1E\u0E23\u0E1A", "\u0E23\u0E31\u0E10\u0E27\u0E34\u0E2A\u0E32\u0E2B\u0E01\u0E34\u0E08", "\u0E2D\u0E37\u0E48\u0E19\u0E46"],
        t = u0.groups || [],
        s = new Set(gu === null ? e : gu),
        w = t.filter(B => s.has(B.group_name)),
        r = (u0.group_trend || []).filter(B => s.has(B.group_name)),
        c = (u0.summary || []).filter(B => s.has(B.group_name)),
        i = w.reduce((B, L) => B + (L.total_visits || 0), 0),
        y = w.reduce((B, L) => B + (L.opd_visits || 0), 0),
        h = w.reduce((B, L) => B + (L.ipd_admissions || 0), 0),
        A = w.reduce((B, L) => B + (L.er_visits || 0), 0),
        _ = w.reduce((B, L) => B + (Math.max(L.opd_hn, L.ipd_hn, L.er_hn) || 0), 0),
        z = B => Number(B || 0).toLocaleString(),
        k = [...w].sort((B, L) => L.total_visits - B.total_visits),
        T = k[0] || null,
        P = i > 0 && T ? Math.round(T.total_visits / i * 100) : 0,
        v = Array.from(new Set(r.map(B => B.ym))).sort(),
        F = k.map(B => B.group_name),
        X = v.map(B => {
          const L = {
            ym: B
          };
          for (const R of F) {
            const H = r.find(q => q.ym === B && q.group_name === R);
            L[R] = H ? H.total : 0
          }
          return L
        }),
        p = F.slice(0, 9),
        o = {
          UC: "#10b981",
          "\u0E02\u0E49\u0E32\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23 / \u0E2D\u0E1B\u0E17": "#0ea5e9",
          \u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07: "#f59e0b",
          "\u0E15\u0E48\u0E32\u0E07\u0E0A\u0E32\u0E15\u0E34 (1.5 \u0E40\u0E17\u0E48\u0E32)": "#7c3aed",
          \u0E15\u0E48\u0E32\u0E07\u0E14\u0E49\u0E32\u0E27: "#8b5cf6",
          \u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19\u0E2A\u0E31\u0E07\u0E04\u0E21: "#ec4899",
          \u0E1E\u0E23\u0E1A: "#f43f5e",
          \u0E23\u0E31\u0E10\u0E27\u0E34\u0E2A\u0E32\u0E2B\u0E01\u0E34\u0E08: "#06b6d4",
          \u0E2D\u0E37\u0E48\u0E19\u0E46: "#94a3b8"
        },
        $ = B => o[B] || "#94a3b8",
        a = F.map($),
        g = B => {
          const L = gu === null ? [...e] : [...gu],
            R = L.indexOf(B);
          R >= 0 ? L.splice(R, 1) : L.push(B), V0(L)
        },
        b = () => V0(null),
        N = () => V0([]),
        D = X.length > 0 ? X.reduce((B, L) => {
          const R = p.reduce((H, q) => H + (B[q] || 0), 0);
          return p.reduce((H, q) => H + (L[q] || 0), 0) > R ? L : B
        }, X[0]) : null,
        C = D ? D.ym : "\u2014",
        U = D ? p.reduce((B, L) => B + (D[L] || 0), 0) : 0,
        j = [];
      if (j.push(`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E0A\u0E48\u0E27\u0E07 ${u0.from} \u2192 ${u0.to}: ${z(i)} \u0E04\u0E23\u0E31\u0E49\u0E07 (OPD ${z(y)} \xB7 IPD ${z(h)} \xB7 ER ${z(A)}) \u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21 ${z(_)} \u0E23\u0E32\u0E22 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22 ${w.length} \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (\u0E08\u0E32\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${e.length} \u0E2B\u0E21\u0E27\u0E14\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19)`), T && P >= 40 && j.push(`\u{1F3E5} \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E48\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${T.group_name} \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ${P}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (${z(T.total_visits)} \u0E04\u0E23\u0E31\u0E49\u0E07) \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23 reimbursement \u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E35\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E1E\u0E34\u0E40\u0E28\u0E29`), h > 0 && y > 0) {
        const B = (h / i * 100).toFixed(1);
        j.push(`\u{1FA7A} \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 IPD ${B}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 \xB7 \u0E2B\u0E32\u0E01 IPD \u0E40\u0E01\u0E34\u0E19 15% \u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E43\u0E14 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A DRG mix \u0E41\u0E25\u0E30 AdjRW \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E40\u0E04\u0E2A\u0E08\u0E23\u0E34\u0E07`)
      }
      D && U > 0 && j.push(`\u{1F4C8} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E1E\u0E35\u0E04: ${C} \u0E21\u0E35\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 ${z(U)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u0E01\u0E25\u0E38\u0E48\u0E21 Top 5) \u2014 \u0E43\u0E0A\u0E49\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19 + \u0E22\u0E32/\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32`), j.push("\u{1F4A1} \u0E41\u0E1C\u0E19\u0E1E\u0E31\u0E12\u0E19\u0E32: 1) \u0E08\u0E31\u0E14\u0E17\u0E33 Dashboard \u0E23\u0E32\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E2A\u0E48\u0E07\u0E17\u0E35\u0E21 UM \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 2) \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C recall rate per pttype 3) Audit \u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E04\u0E48\u0E32\u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 collection rate");
      const W = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: j
      };
      return u.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        },
        children: [u.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "12px 16px"
          },
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
              flexWrap: "wrap",
              gap: 8
            },
            children: [u.jsx("div", {
              style: {
                fontSize: 12,
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "\u{1F39B}\uFE0F \u0E01\u0E23\u0E2D\u0E07\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
            }), u.jsxs("div", {
              style: {
                display: "flex",
                gap: 6
              },
              children: [u.jsx("button", {
                onClick: b,
                style: {
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 6,
                  border: "1px solid var(--md-border)",
                  background: "transparent",
                  color: "var(--md-text-secondary)",
                  cursor: "pointer"
                },
                children: "\u2705 \u0E40\u0E25\u0E37\u0E2D\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
              }), u.jsx("button", {
                onClick: N,
                style: {
                  padding: "4px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: 6,
                  border: "1px solid var(--md-border)",
                  background: "transparent",
                  color: "var(--md-text-secondary)",
                  cursor: "pointer"
                },
                children: "\u274C \u0E25\u0E49\u0E32\u0E07"
              })]
            })]
          }), u.jsx("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 8
            },
            children: e.map(B => {
              const L = s.has(B),
                R = $(B);
              return u.jsxs("label", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 8,
                  border: `1px solid ${L?R:"var(--md-border)"}`,
                  background: L ? `${R}12` : "transparent",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 700,
                  color: L ? R : "var(--md-text-tertiary)",
                  userSelect: "none"
                },
                children: [u.jsx("input", {
                  type: "checkbox",
                  checked: L,
                  onChange: () => g(B),
                  style: {
                    accentColor: R,
                    cursor: "pointer"
                  }
                }), u.jsx("span", {
                  children: B
                })]
              }, B)
            })
          })]
        }), u.jsx("div", {
          className: "glass-card",
          style: {
            padding: "14px 18px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px"
          },
          children: [{
            label: "\u{1FA7A} \u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
            value: z(i),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#0ea5e9"
          }, {
            label: "\u{1F465} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21",
            value: z(_),
            unit: "\u0E04\u0E19",
            color: "#7c3aed"
          }, {
            label: "\u{1F3E5} OPD",
            value: z(y),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#10b981"
          }, {
            label: "\u{1F6CF}\uFE0F IPD",
            value: z(h),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#f59e0b"
          }, {
            label: "\u{1F691} ER",
            value: z(A),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#f43f5e"
          }, {
            label: "\u{1F4CB} \u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01",
            value: w.length,
            unit: "\u0E2B\u0E21\u0E27\u0E14",
            color: "#ec4899"
          }].map((B, L) => u.jsxs("div", {
            style: {
              padding: "10px 12px",
              borderRadius: 10,
              background: `${B.color}10`,
              borderLeft: `4px solid ${B.color}`
            },
            children: [u.jsx("div", {
              style: {
                fontSize: 10,
                fontWeight: 800,
                color: B.color,
                textTransform: "uppercase",
                letterSpacing: ".06em"
              },
              children: B.label
            }), u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                marginTop: 4
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: 22,
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontFamily: "monospace",
                  lineHeight: 1
                },
                children: B.value
              }), u.jsx("span", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: B.unit
              })]
            })]
          }, L))
        }), X.length > 0 && (() => {
          const B = Math.min(5, k.length),
            L = k.slice(0, B),
            R = X.map(x => x.ym),
            H = ["", "\u0E21.\u0E04.", "\u0E01.\u0E1E.", "\u0E21\u0E35.\u0E04.", "\u0E40\u0E21.\u0E22.", "\u0E1E.\u0E04.", "\u0E21\u0E34.\u0E22.", "\u0E01.\u0E04.", "\u0E2A.\u0E04.", "\u0E01.\u0E22.", "\u0E15.\u0E04.", "\u0E1E.\u0E22.", "\u0E18.\u0E04."],
            q = x => {
              const f = Number(x.slice(5, 7)),
                m = Number(x.slice(0, 4)),
                O = String((m + 543) % 100).padStart(2, "0");
              return `${H[f]} ${O}`
            },
            r0 = {};
          L.forEach(x => {
            const f = x.group_name;
            let m = 0;
            for (const O of X)(O[f] || 0) > m && (m = O[f] || 0);
            r0[f] = m
          });
          const o0 = X.map(x => {
              const f = L.reduce((m, O) => m + (x[O.group_name] || 0), 0);
              return {
                ym: x.ym,
                total: f
              }
            }),
            T0 = Math.max(...o0.map(x => x.total), 1),
            K0 = x => {
              if (X.length < 2) return null;
              const f = Math.max(1, Math.floor(X.length / 2)),
                m = X.slice(0, f).reduce((_0, I) => _0 + (I[x] || 0), 0),
                O = X.slice(f).reduce((_0, I) => _0 + (I[x] || 0), 0);
              if (m === 0 && O === 0) return null;
              if (m === 0) return {
                arrow: "\u2191",
                color: "#10b981"
              };
              const t0 = (O - m) / m;
              return t0 > .1 ? {
                arrow: "\u2191",
                color: "#10b981"
              } : t0 < -.1 ? {
                arrow: "\u2193",
                color: "#f43f5e"
              } : {
                arrow: "\u2192",
                color: "#94a3b8"
              }
            },
            J0 = x => {
              const f = Math.max(.12, Math.min(.92, x));
              return Math.round(f * 255).toString(16).padStart(2, "0")
            };
          return u.jsxs("div", {
            className: "glass-card",
            style: {
              padding: "14px 18px"
            },
            children: [u.jsxs("div", {
              style: {
                marginBottom: 12
              },
              children: [u.jsx("div", {
                style: {
                  fontSize: 13,
                  fontWeight: 800,
                  color: "var(--md-text-primary)"
                },
                children: "\u{1F5D3}\uFE0F \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 Top 5 \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
              }), u.jsx("div", {
                style: {
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: 2
                },
                children: `${X.length} \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E0B\u0E25\u0E25\u0E4C\u0E22\u0E34\u0E48\u0E07\u0E40\u0E02\u0E49\u0E21 = \u0E08\u0E33\u0E19\u0E27\u0E19\u0E21\u0E32\u0E01\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E31\u0E49\u0E19`
              })]
            }), u.jsx("div", {
              style: {
                width: "100%",
                overflowX: "auto"
              },
              children: u.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: `170px repeat(${R.length}, minmax(64px, 1fr)) 90px`,
                  gap: 4,
                  minWidth: 540
                },
                children: [u.jsx("div", {
                  style: {
                    padding: "8px 10px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: ".06em"
                  },
                  children: "\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
                }), ...R.map((x, f) => u.jsx("div", {
                  style: {
                    padding: "8px 4px",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "var(--md-text-secondary)",
                    textAlign: "center",
                    borderBottom: "2px solid var(--md-divider)"
                  },
                  children: q(x)
                }, "h" + f)), u.jsx("div", {
                  style: {
                    padding: "8px 4px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: ".06em",
                    textAlign: "right"
                  },
                  children: "\u0E23\u0E27\u0E21 / Trend"
                }), ...L.flatMap((x, f) => {
                  const m = x.group_name,
                    O = $(m),
                    t0 = r0[m] || 1,
                    _0 = K0(m);
                  return [u.jsxs("div", {
                    style: {
                      padding: "10px 12px",
                      fontSize: 12,
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      borderLeft: `4px solid ${O}`,
                      background: `${O}08`,
                      borderRadius: "4px 0 0 4px"
                    },
                    children: [u.jsx("span", {
                      style: {
                        width: 22,
                        height: 22,
                        borderRadius: 4,
                        background: O,
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: f + 1
                    }), u.jsx("span", {
                      children: m
                    })]
                  }, `r${f}h`), ...R.map((I, su) => {
                    const W0 = X[su][m] || 0,
                      M0 = t0 > 0 ? W0 / t0 : 0,
                      iu = W0 > 0 ? `${O}${J0(M0*.85)}` : "transparent";
                    return u.jsxs("div", {
                      style: {
                        padding: "10px 4px",
                        textAlign: "center",
                        background: iu,
                        borderRadius: 4,
                        border: W0 > 0 ? `1px solid ${O}30` : "1px solid transparent",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        minHeight: 50
                      },
                      title: `${m} \u2014 ${q(I)}: ${z(W0)} \u0E04\u0E23\u0E31\u0E49\u0E07`,
                      children: [u.jsx("div", {
                        style: {
                          fontSize: 13,
                          fontWeight: 900,
                          fontFamily: "monospace",
                          color: W0 > 0 ? M0 > .5 ? "#fff" : "var(--md-text-primary)" : "var(--md-text-tertiary)",
                          lineHeight: 1
                        },
                        children: W0 > 0 ? z(W0) : "\u2014"
                      }), W0 > 0 && u.jsx("div", {
                        style: {
                          fontSize: 9,
                          fontWeight: 600,
                          fontFamily: "monospace",
                          color: M0 > .5 ? "rgba(255,255,255,.75)" : "var(--md-text-tertiary)"
                        },
                        children: `${Math.round(M0*100)}%`
                      })]
                    }, `r${f}c${su}`)
                  }), u.jsxs("div", {
                    style: {
                      padding: "10px 8px",
                      textAlign: "right",
                      borderRadius: "0 4px 4px 0",
                      background: `${O}10`,
                      borderRight: `4px solid ${O}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      gap: 2
                    },
                    children: [u.jsx("div", {
                      style: {
                        fontSize: 14,
                        fontWeight: 900,
                        color: O,
                        fontFamily: "monospace",
                        lineHeight: 1
                      },
                      children: z(x.total_visits)
                    }), _0 && u.jsxs("div", {
                      style: {
                        fontSize: 13,
                        fontWeight: 900,
                        color: _0.color,
                        lineHeight: 1
                      },
                      children: [_0.arrow]
                    })]
                  }, `r${f}t`)]
                }), u.jsx("div", {
                  style: {
                    padding: "8px 12px",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                    borderTop: "2px solid var(--md-divider)",
                    marginTop: 4
                  },
                  children: "\u0E23\u0E27\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19"
                }), ...o0.map((x, f) => {
                  const m = T0 > 0 ? x.total / T0 : 0;
                  return u.jsxs("div", {
                    style: {
                      padding: "8px 4px",
                      textAlign: "center",
                      borderTop: "2px solid var(--md-divider)",
                      marginTop: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4
                    },
                    children: [u.jsx("div", {
                      style: {
                        fontSize: 11,
                        fontWeight: 800,
                        fontFamily: "monospace",
                        color: "var(--md-text-primary)"
                      },
                      children: z(x.total)
                    }), u.jsx("div", {
                      style: {
                        width: "100%",
                        height: 5,
                        borderRadius: 3,
                        background: "var(--md-divider)",
                        overflow: "hidden"
                      },
                      children: u.jsx("div", {
                        style: {
                          width: `${m*100}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #0ea5e9, #7c3aed)",
                          borderRadius: 3
                        }
                      })
                    })]
                  }, "mt" + f)
                }), u.jsx("div", {
                  style: {
                    padding: "8px 8px",
                    textAlign: "right",
                    borderTop: "2px solid var(--md-divider)",
                    marginTop: 4,
                    fontSize: 13,
                    fontWeight: 900,
                    fontFamily: "monospace",
                    color: "var(--md-text-primary)"
                  },
                  children: z(o0.reduce((x, f) => x + f.total, 0))
                })]
              })
            }), u.jsx("div", {
              style: {
                fontSize: 10,
                color: "var(--md-text-tertiary)",
                marginTop: 10,
                fontStyle: "italic",
                lineHeight: 1.5
              },
              children: "\u{1F4A1} \u0E2D\u0E48\u0E32\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E44\u0E23: \u0E41\u0E15\u0E48\u0E25\u0E30\u0E41\u0E16\u0E27 = 1 \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \xB7 \u0E41\u0E15\u0E48\u0E25\u0E30\u0E04\u0E2D\u0E25\u0E31\u0E21\u0E19\u0E4C = 1 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E25\u0E02\u0E43\u0E19\u0E40\u0E0B\u0E25\u0E25\u0E4C = \u0E08\u0E33\u0E19\u0E27\u0E19\u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 % \u0E43\u0E15\u0E49\u0E40\u0E25\u0E02 = \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E01\u0E31\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E31\u0E49\u0E19 \xB7 \u0E2A\u0E35\u0E40\u0E02\u0E49\u0E21 = \u0E21\u0E32\u0E01 / \u0E2A\u0E35\u0E08\u0E32\u0E07 = \u0E19\u0E49\u0E2D\u0E22 \xB7 \u2191\u2193 = \u0E17\u0E34\u0E28\u0E17\u0E32\u0E07\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 vs \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07"
            })]
          })
        })(), u.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "14px 18px",
            overflowX: "auto"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: 12,
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: 10
            },
            children: "\u{1F4CB} \u0E15\u0E32\u0E23\u0E32\u0E07\u0E23\u0E32\u0E22\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 pttype)"
          }), u.jsxs("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
              fontVariantNumeric: "tabular-nums"
            },
            children: [u.jsx("thead", {
              children: u.jsxs("tr", {
                style: {
                  background: "var(--md-surface-2, rgba(124,58,237,.05))"
                },
                children: ["\u0E2B\u0E21\u0E27\u0E14 / \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C", "OPD (\u0E04\u0E23\u0E31\u0E49\u0E07)", "OPD (\u0E04\u0E19)", "IPD (\u0E04\u0E23\u0E31\u0E49\u0E07)", "IPD (\u0E04\u0E19)", "ER (\u0E04\u0E23\u0E31\u0E49\u0E07)", "ER (\u0E04\u0E19)", "\u0E23\u0E27\u0E21 (\u0E04\u0E23\u0E31\u0E49\u0E07)", "% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"].map((B, L) => u.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: L === 0 ? "left" : "right",
                    fontWeight: 800,
                    color: "var(--md-text-secondary)",
                    borderBottom: "2px solid var(--md-divider)",
                    fontSize: 11
                  },
                  children: B
                }, L))
              })
            }), u.jsx("tbody", {
              children: k.flatMap((B, L) => {
                const R = i > 0 ? (B.total_visits / i * 100).toFixed(1) : "0.0",
                  H = c.filter(o0 => o0.group_name === B.group_name).sort((o0, T0) => T0.total_visits - o0.total_visits),
                  q = u.jsxs("tr", {
                    style: {
                      background: `${$(B.group_name)}10`,
                      borderTop: `2px solid ${$(B.group_name)}40`,
                      borderBottom: "1px solid var(--md-divider)"
                    },
                    children: [u.jsxs("td", {
                      style: {
                        padding: "10px 10px",
                        fontWeight: 900,
                        color: $(B.group_name),
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      },
                      children: [u.jsx("span", {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: 2,
                          background: $(B.group_name),
                          display: "inline-block"
                        }
                      }), u.jsx("span", {
                        children: B.group_name
                      }), u.jsx("span", {
                        style: {
                          fontSize: 10,
                          fontWeight: 600,
                          color: "var(--md-text-tertiary)",
                          marginLeft: 4
                        },
                        children: `(${B.pttype_count} pttype)`
                      })]
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: 800
                      },
                      children: z(B.opd_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: z(B.opd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: 800
                      },
                      children: z(B.ipd_admissions)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: z(B.ipd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: 800
                      },
                      children: z(B.er_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: z(B.er_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontWeight: 900,
                        fontFamily: "monospace",
                        color: "var(--md-text-primary)"
                      },
                      children: z(B.total_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontWeight: 800,
                        color: $(B.group_name),
                        fontFamily: "monospace"
                      },
                      children: `${R}%`
                    })]
                  }, `g${L}`),
                  r0 = H.map((o0, T0) => u.jsxs("tr", {
                    style: {
                      borderBottom: "1px solid var(--md-divider)"
                    },
                    children: [u.jsxs("td", {
                      style: {
                        padding: "6px 10px 6px 28px",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: [u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)",
                          marginRight: 6
                        },
                        children: "\u21B3"
                      }), o0.pttype_name || "\u2014", u.jsx("span", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: 10,
                          color: "var(--md-text-tertiary)",
                          marginLeft: 6
                        },
                        children: `[${o0.pttype}]`
                      })]
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: z(o0.opd_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: z(o0.opd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: z(o0.ipd_admissions)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: z(o0.ipd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: z(o0.er_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: z(o0.er_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: z(o0.total_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "var(--md-text-tertiary)"
                      },
                      children: i > 0 ? `${(o0.total_visits/i*100).toFixed(1)}%` : "\u2014"
                    })]
                  }, `g${L}r${T0}`));
                return [q, ...r0]
              })
            })]
          }), u.jsx("div", {
            style: {
              marginTop: 8,
              fontSize: 10,
              color: "var(--md-text-tertiary)",
              fontStyle: "italic"
            },
            children: `\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25: ${u0.data_source||"HOSxP XE"} \xB7 \u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 ${new Date(u0.generated_at||Date.now()).toLocaleString("th-TH")}`
          })]
        }), (u0.age_breakdown || []).length > 0 && (() => {
          const B = u0.age_order || ["\u0E27\u0E31\u0E22\u0E40\u0E14\u0E47\u0E01 (0-14 \u0E1B\u0E35)", "\u0E27\u0E31\u0E22\u0E23\u0E38\u0E48\u0E19/\u0E27\u0E31\u0E22\u0E2B\u0E19\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E27 (15-24 \u0E1B\u0E35)", "\u0E27\u0E31\u0E22\u0E41\u0E23\u0E07\u0E07\u0E32\u0E19 (25-59 \u0E1B\u0E35)", "\u0E27\u0E31\u0E22\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 (60 \u0E1B\u0E35\u0E02\u0E36\u0E49\u0E19\u0E44\u0E1B)", "\u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38"],
            L = {
              "\u0E27\u0E31\u0E22\u0E40\u0E14\u0E47\u0E01 (0-14 \u0E1B\u0E35)": "\u{1F9D2}",
              "\u0E27\u0E31\u0E22\u0E23\u0E38\u0E48\u0E19/\u0E27\u0E31\u0E22\u0E2B\u0E19\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E27 (15-24 \u0E1B\u0E35)": "\u{1F9D1}\u200D\u{1F393}",
              "\u0E27\u0E31\u0E22\u0E41\u0E23\u0E07\u0E07\u0E32\u0E19 (25-59 \u0E1B\u0E35)": "\u{1F4BC}",
              "\u0E27\u0E31\u0E22\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 (60 \u0E1B\u0E35\u0E02\u0E36\u0E49\u0E19\u0E44\u0E1B)": "\u{1F474}",
              \u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38: "\u2753"
            },
            R = {
              "\u0E27\u0E31\u0E22\u0E40\u0E14\u0E47\u0E01 (0-14 \u0E1B\u0E35)": "#06b6d4",
              "\u0E27\u0E31\u0E22\u0E23\u0E38\u0E48\u0E19/\u0E27\u0E31\u0E22\u0E2B\u0E19\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E27 (15-24 \u0E1B\u0E35)": "#10b981",
              "\u0E27\u0E31\u0E22\u0E41\u0E23\u0E07\u0E07\u0E32\u0E19 (25-59 \u0E1B\u0E35)": "#f59e0b",
              "\u0E27\u0E31\u0E22\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 (60 \u0E1B\u0E35\u0E02\u0E36\u0E49\u0E19\u0E44\u0E1B)": "#ec4899",
              \u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38: "#94a3b8"
            },
            H = (u0.age_breakdown || []).filter(f => s.has(f.group_name)),
            q = {};
          for (const f of B) q[f] = 0;
          for (const f of H) q[f.age_group] = (q[f.age_group] || 0) + (f.total || 0);
          const r0 = Object.values(q).reduce((f, m) => f + m, 0),
            o0 = {};
          for (const f of k) o0[f.group_name] = {};
          for (const f of H) o0[f.group_name] || (o0[f.group_name] = {}), o0[f.group_name][f.age_group] = f.total;
          const T0 = {};
          for (const f of k) {
            let m = 0;
            for (const O of B) {
              const t0 = o0[f.group_name]?.[O] || 0;
              t0 > m && (m = t0)
            }
            T0[f.group_name] = m
          }
          const K0 = f => {
              const m = Math.max(.12, Math.min(.92, f));
              return Math.round(m * 255).toString(16).padStart(2, "0")
            },
            J0 = f => Number(f || 0).toLocaleString(),
            x = B.filter(f => q[f] > 0);
          return u.jsxs("div", {
            className: "glass-card",
            style: {
              padding: "14px 18px"
            },
            children: [u.jsxs("div", {
              style: {
                marginBottom: 12
              },
              children: [u.jsx("div", {
                style: {
                  fontSize: 13,
                  fontWeight: 800,
                  color: "var(--md-text-primary)"
                },
                children: "\u{1F465} \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38 \xD7 \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
              }), u.jsx("div", {
                style: {
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: 2
                },
                children: "\u0E23\u0E27\u0E21 OPD + IPD + ER \xB7 \u0E04\u0E33\u0E19\u0E27\u0E13\u0E2D\u0E32\u0E22\u0E38\u0E08\u0E32\u0E01 patient.birthday \u0E13 \u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E21\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"
              })]
            }), u.jsx("div", {
              style: {
                display: "grid",
                gridTemplateColumns: `repeat(${x.length}, 1fr)`,
                gap: 10,
                marginBottom: 14
              },
              children: x.map(f => {
                const m = R[f] || "#94a3b8",
                  O = r0 > 0 ? q[f] / r0 * 100 : 0;
                return u.jsxs("div", {
                  style: {
                    padding: "10px 12px",
                    borderRadius: 10,
                    background: `${m}10`,
                    borderLeft: `4px solid ${m}`
                  },
                  children: [u.jsxs("div", {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 4
                    },
                    children: [u.jsx("span", {
                      style: {
                        fontSize: 16
                      },
                      children: L[f] || "\u{1F464}"
                    }), u.jsx("span", {
                      style: {
                        fontSize: 11,
                        fontWeight: 800,
                        color: m
                      },
                      children: f
                    })]
                  }), u.jsxs("div", {
                    style: {
                      display: "flex",
                      alignItems: "baseline",
                      gap: 5
                    },
                    children: [u.jsx("span", {
                      style: {
                        fontSize: 20,
                        fontWeight: 900,
                        fontFamily: "monospace",
                        color: "var(--md-text-primary)",
                        lineHeight: 1
                      },
                      children: J0(q[f])
                    }), u.jsx("span", {
                      style: {
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), u.jsx("span", {
                      style: {
                        fontSize: 11,
                        fontWeight: 700,
                        color: m,
                        marginLeft: 4
                      },
                      children: `${O.toFixed(1)}%`
                    })]
                  })]
                }, f)
              })
            }), u.jsx("div", {
              style: {
                width: "100%",
                overflowX: "auto"
              },
              children: u.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: `170px repeat(${x.length}, minmax(90px, 1fr)) 90px`,
                  gap: 4,
                  minWidth: 480
                },
                children: [u.jsx("div", {
                  style: {
                    padding: "8px 10px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: ".06em"
                  },
                  children: "\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
                }), ...x.map((f, m) => u.jsxs("div", {
                  style: {
                    padding: "8px 4px",
                    fontSize: 11,
                    fontWeight: 800,
                    color: R[f] || "var(--md-text-secondary)",
                    textAlign: "center",
                    borderBottom: `2px solid ${R[f]||"var(--md-divider)"}40`
                  },
                  children: [u.jsx("div", {
                    style: {
                      fontSize: 14
                    },
                    children: L[f] || "\u{1F464}"
                  }), u.jsx("div", {
                    style: {
                      marginTop: 2,
                      fontSize: 10
                    },
                    children: f.replace(/\s*\(.*\)/, "")
                  })]
                }, "ah" + m)), u.jsx("div", {
                  style: {
                    padding: "8px 4px",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    textAlign: "right"
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), ...k.flatMap((f, m) => {
                  const O = $(f.group_name),
                    t0 = T0[f.group_name] || 1,
                    _0 = x.reduce((I, su) => I + (o0[f.group_name]?.[su] || 0), 0);
                  return [u.jsxs("div", {
                    style: {
                      padding: "10px 12px",
                      fontSize: 12,
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      borderLeft: `4px solid ${O}`,
                      background: `${O}08`,
                      borderRadius: "4px 0 0 4px"
                    },
                    children: [u.jsx("span", {
                      style: {
                        width: 22,
                        height: 22,
                        borderRadius: 4,
                        background: O,
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 900,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: m + 1
                    }), u.jsx("span", {
                      children: f.group_name
                    })]
                  }, `ar${m}h`), ...x.map((I, su) => {
                    const W0 = o0[f.group_name]?.[I] || 0,
                      M0 = t0 > 0 ? W0 / t0 : 0,
                      iu = R[I] || "#94a3b8",
                      Pu = W0 > 0 ? `${iu}${K0(M0*.85)}` : "transparent";
                    return u.jsxs("div", {
                      style: {
                        padding: "10px 4px",
                        textAlign: "center",
                        background: Pu,
                        borderRadius: 4,
                        border: W0 > 0 ? `1px solid ${iu}30` : "1px solid transparent",
                        minHeight: 50,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2
                      },
                      title: `${f.group_name} \u2014 ${I}: ${J0(W0)} \u0E04\u0E23\u0E31\u0E49\u0E07`,
                      children: [u.jsx("div", {
                        style: {
                          fontSize: 13,
                          fontWeight: 900,
                          fontFamily: "monospace",
                          color: W0 > 0 ? M0 > .5 ? "#fff" : "var(--md-text-primary)" : "var(--md-text-tertiary)",
                          lineHeight: 1
                        },
                        children: W0 > 0 ? J0(W0) : "\u2014"
                      }), W0 > 0 && _0 > 0 && u.jsx("div", {
                        style: {
                          fontSize: 9,
                          fontWeight: 600,
                          fontFamily: "monospace",
                          color: M0 > .5 ? "rgba(255,255,255,.75)" : "var(--md-text-tertiary)"
                        },
                        children: `${(W0/_0*100).toFixed(0)}%`
                      })]
                    }, `ar${m}c${su}`)
                  }), u.jsx("div", {
                    style: {
                      padding: "10px 8px",
                      textAlign: "right",
                      borderRadius: "0 4px 4px 0",
                      background: `${O}10`,
                      borderRight: `4px solid ${O}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "center"
                    },
                    children: u.jsx("div", {
                      style: {
                        fontSize: 13,
                        fontWeight: 900,
                        color: O,
                        fontFamily: "monospace",
                        lineHeight: 1
                      },
                      children: J0(_0)
                    })
                  }, `ar${m}t`)]
                }), u.jsx("div", {
                  style: {
                    padding: "8px 12px",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    borderTop: "2px solid var(--md-divider)",
                    marginTop: 4
                  },
                  children: "\u0E23\u0E27\u0E21\u0E15\u0E48\u0E2D\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38"
                }), ...x.map(f => {
                  const m = R[f] || "#94a3b8";
                  return u.jsx("div", {
                    style: {
                      padding: "8px 4px",
                      textAlign: "center",
                      borderTop: "2px solid var(--md-divider)",
                      marginTop: 4,
                      fontSize: 13,
                      fontWeight: 900,
                      fontFamily: "monospace",
                      color: m
                    },
                    children: J0(q[f])
                  }, "at" + f)
                }), u.jsx("div", {
                  style: {
                    padding: "8px 8px",
                    textAlign: "right",
                    borderTop: "2px solid var(--md-divider)",
                    marginTop: 4,
                    fontSize: 13,
                    fontWeight: 900,
                    fontFamily: "monospace",
                    color: "var(--md-text-primary)"
                  },
                  children: J0(r0)
                })]
              })
            }), u.jsx("div", {
              style: {
                fontSize: 10,
                color: "var(--md-text-tertiary)",
                marginTop: 10,
                fontStyle: "italic",
                lineHeight: 1.5
              },
              children: "\u{1F4A1} \u0E2D\u0E48\u0E32\u0E19\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E44\u0E23: % \u0E43\u0E15\u0E49\u0E40\u0E25\u0E02\u0E43\u0E19\u0E40\u0E0B\u0E25\u0E25\u0E4C = \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E02\u0E2D\u0E07\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E19\u0E31\u0E49\u0E19\u0E20\u0E32\u0E22\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19 \xB7 \u0E2A\u0E35\u0E40\u0E02\u0E49\u0E21 = \u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01"
            })]
          })
        })(), u.jsx(Cu, {
          data: W,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
        })]
      })
    })(), n !== "pt" && n !== "staff-services" && n !== "fluoride" && n !== "elderly-cxr" && n !== "ncd-disease" && n !== "imaging-services" && n !== "pttype-services" && n !== "ipd-compare" && u.jsx(Cu, {
      data: y0,
      theme: "default",
      title: "AI Executive Summary"
    })]
  })
}
const _E = AE.memo(jE);
export {
  _E as
  default
};