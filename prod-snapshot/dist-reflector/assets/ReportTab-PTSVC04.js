const Du = (n, g0 = Du, W = g0.f || (g0.f = ["assets/xlsx.min-CZi5yKex.js", "assets/vendor-react-ByYOq5k4.js"])) => n.map(b0 => W[b0]);
import {
  _ as pu,
  E as yE,
  h as Bu
} from "./shared-ui-OVDEF1.js";
import {
  R as bE,
  r as Q,
  j as u
} from "./vendor-react-ByYOq5k4.js";
const AE = Object.freeze({
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
  au = /^[A-Z]\d/i;

function vE(n, g0, W) {
  if (!n?.comparison || !n.fy1_totals || !n.fy2_totals) return null;
  const b0 = n.fy1_totals,
    D = n.fy2_totals,
    t0 = n.comparison.filter(W0 => W0.fy1?.has_data && W0.fy2?.has_data);
  if (t0.length === 0) return {
    headline: `\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E35\u0E07\u0E1A ${g0} \u0E01\u0E31\u0E1A ${W}`,
    empty: !0
  };
  const Z = (W0, y0 = 0) => Number.isFinite(Number(W0)) ? Number(W0) : y0,
    j0 = (W0, y0 = 0) => W0 == null || isNaN(W0) ? "\u2014" : Number(W0).toLocaleString("th-TH", {
      minimumFractionDigits: y0,
      maximumFractionDigits: y0
    }),
    Q0 = Z(b0.ipd_discharge),
    X0 = Z(D.ipd_discharge),
    K0 = Z(b0.ipd_deaths),
    M0 = Z(D.ipd_deaths),
    l0 = Z(b0.opd_deaths),
    x0 = Z(D.opd_deaths),
    _0 = Z(b0.total_deaths),
    d0 = Z(D.total_deaths),
    Z0 = Z(b0.ipd_early_deaths),
    r0 = Z(D.ipd_early_deaths),
    K = Q0 > 0 ? K0 / Q0 * 100 : 0,
    m0 = X0 > 0 ? M0 / X0 * 100 : 0,
    S0 = Z(n.death_growth_pct),
    C0 = K0 > 0 ? Z0 / K0 * 100 : 0,
    c0 = M0 > 0 ? r0 / M0 * 100 : 0;
  let Y = null,
    uu = -1 / 0;
  for (const W0 of t0) {
    const y0 = W0.fy2?.ipd_mortality_rate || 0;
    y0 > uu && (uu = y0, Y = W0.month)
  }
  let A0, eu;
  m0 >= 3 ? (A0 = `\u{1F534} IPD Mortality Rate ${m0.toFixed(2)}% \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 3% \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E31\u0E49\u0E07 Mortality Review Committee \u0E20\u0E32\u0E22\u0E43\u0E19 7 \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E17\u0E1A HA accreditation`, eu = "#f43f5e") : S0 >= 20 ? (A0 = `\u26A0 \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${S0}% \u2014 \u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 FY${W} ${d0} \u0E23\u0E32\u0E22 (FY${g0} ${_0}) \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause`, eu = "#f59e0b") : m0 <= 1.5 && S0 <= 0 ? (A0 = `\u2705 Mortality Rate \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35 \u2014 IPD Rate ${m0.toFixed(2)}% \xB7 ${S0>=0?"+":""}${S0}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \xB7 Quality of Care \u0E14\u0E35`, eu = "#10b981") : (A0 = `IPD Mortality ${m0.toFixed(2)}% (FY${g0}: ${K.toFixed(2)}%) \xB7 ${S0>=0?"+":""}${S0}% \xB7 Early Death ${c0.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 IPD`, eu = "#0ea5e9");
  const $0 = (W0, y0, mu) => W0 <= y0 ? "#10b981" : W0 <= mu ? "#f59e0b" : "#f43f5e",
    H0 = [{
      label: `IPD Mortality Rate (${W})`,
      value: `${m0.toFixed(2)}%`,
      sub: `FY${g0}: ${K.toFixed(2)}%`,
      color: $0(m0, 1.5, 3)
    }, {
      label: "Total Deaths",
      value: j0(d0),
      sub: `${S0>=0?"+":""}${S0}% YoY`,
      color: S0 >= 10 ? "#f43f5e" : S0 >= 0 ? "#f59e0b" : "#10b981"
    }, {
      label: "IPD Deaths",
      value: j0(M0),
      sub: `Discharged ${j0(X0)}`,
      color: "#dc2626"
    }, {
      label: "OPD Deaths",
      value: j0(x0),
      sub: "ER / \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B",
      color: "#f59e0b"
    }, {
      label: "Early Death (<48h)",
      value: j0(r0),
      sub: `${c0.toFixed(1)}% \u0E02\u0E2D\u0E07 IPD Deaths`,
      color: c0 >= 20 ? "#f43f5e" : c0 >= 10 ? "#f59e0b" : "#10b981"
    }, {
      label: "Comparable Months",
      value: `${t0.length}`,
      sub: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49",
      color: "#7c3aed"
    }],
    f0 = [];
  f0.push({
    icon: "\u{1F4CA}",
    title: "Mortality Overview",
    text: `\u0E1B\u0E35\u0E07\u0E1A ${W}: IPD \u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15 ${j0(M0)} \u0E23\u0E32\u0E22 (rate ${m0.toFixed(2)}%) \xB7 OPD \u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15 ${j0(x0)} \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E27\u0E21 ${j0(d0)}. \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A ${g0}: IPD ${j0(K0)} (rate ${K.toFixed(2)}%) \xB7 OPD ${j0(l0)} \xB7 \u0E23\u0E27\u0E21 ${j0(_0)}. \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07 ${S0>=0?"+":""}${S0}%. ` + (m0 > K + .3 ? "\u26A0 Rate \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D" : m0 < K - .3 ? "\u2705 Rate \u0E25\u0E14\u0E25\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D" : "Rate \u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"),
    color: eu
  }), f0.push({
    icon: "\u23F1\uFE0F",
    title: "Early Death Pattern (LOS < 2 \u0E27\u0E31\u0E19)",
    text: `\u0E1B\u0E35\u0E07\u0E1A ${W}: Early Death ${j0(r0)} \u0E23\u0E32\u0E22 (${c0.toFixed(1)}% \u0E02\u0E2D\u0E07 IPD Deaths) \xB7 \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A ${g0}: ${j0(Z0)} \u0E23\u0E32\u0E22 (${C0.toFixed(1)}%). ` + (c0 >= 30 ? "\u{1F534} >30% \u0E40\u0E1B\u0E47\u0E19 early death \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E32\u0E21\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07\u0E02\u0E2D\u0E07\u0E42\u0E23\u0E04\u0E15\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 \u0E2B\u0E23\u0E37\u0E2D admission criteria \u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E0A\u0E49\u0E32" : c0 >= 15 ? "\u26A0 Early death \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 triage / ER-to-admission flow" : "\u2705 Early death \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"),
    color: c0 >= 30 ? "#f43f5e" : c0 >= 15 ? "#f59e0b" : "#10b981"
  }), Y && f0.push({
    icon: "\u{1F4C5}",
    title: "Monthly Mortality Pattern",
    text: `\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 IPD Mortality \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14: ${Y} (${uu.toFixed(2)}%). ` + (uu >= 3 ? "\u0E04\u0E27\u0E23\u0E17\u0E33 Retrospective Case Review \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E14\u0E31\u0E07\u0E01\u0E25\u0E48\u0E32\u0E27 \xB7 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C case mix, staffing, equipment readiness" : "Peak \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"),
    color: uu >= 3 ? "#f59e0b" : "#10b981"
  });
  const U0 = [];
  m0 >= 3 && U0.push(`\u{1F534} IPD Mortality Rate ${m0.toFixed(2)}% \u0E40\u0E01\u0E34\u0E19 threshold 3% \u2014 HA standard compliance risk`), S0 >= 20 && U0.push(`\u{1F534} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21 ${S0}% \u2014 \u0E15\u0E49\u0E2D\u0E07 M&M Conference \u0E20\u0E32\u0E22\u0E43\u0E19 14 \u0E27\u0E31\u0E19`), c0 >= 30 && U0.push(`\u{1F534} Early Death \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 ${c0.toFixed(1)}% \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 late admission \u0E2B\u0E23\u0E37\u0E2D severity sorting \u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27`), r0 >= Z0 * 1.5 && Z0 > 0 && U0.push(`\u{1F7E0} Early Death \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01 ${Z0} \u2192 ${r0} \xB7 investigate ER-to-ward handoff`), x0 > l0 * 1.3 && l0 > 0 && U0.push(`\u{1F7E0} OPD/ER Deaths \u0E40\u0E1E\u0E34\u0E48\u0E21 ${Math.round((x0-l0)/l0*100)}% \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 ER triage + rapid response`), Y && uu >= 4 && U0.push(`\u{1F7E0} \u0E40\u0E14\u0E37\u0E2D\u0E19 ${Y} Peak Mortality ${uu.toFixed(2)}% \u2014 outlier \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E1B\u0E47\u0E19 cluster`), U0.length === 0 && U0.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E14\u0E49\u0E32\u0E19 Mortality \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D \u2014 Quality of Care \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35");
  const a0 = [];
  return m0 >= 3 && (a0.push("\u{1F534} P0 \xB7 \u0E15\u0E31\u0E49\u0E07 Mortality Review Board (MRB) \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u2014 review 100% IPD deaths \xB7 \u0E41\u0E22\u0E01 Preventable vs Non-preventable"), a0.push("\u{1F534} P0 \xB7 Re-train CPR/ACLS + Code Blue response \u0E17\u0E38\u0E01 ward \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19")), S0 >= 10 && M0 > 0 && a0.push("\u{1F7E0} P1 \xB7 M&M Conference \u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 focus DRG/DX \u0E17\u0E35\u0E48\u0E21\u0E35 mortality \u0E2A\u0E39\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14"), c0 >= 20 && a0.push("\u{1F7E0} P1 \xB7 ER Triage Audit \xB7 Early Warning Score (NEWS2) compliance check \xB7 ICU availability in 24/7"), Y && uu >= 3 && a0.push(`\u{1F7E1} P2 \xB7 Retrospective Case Review \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${Y} \xB7 deep-dive case mix + intervention timing`), M0 >= 20 && a0.push("\u{1F535} P1 \xB7 \u0E2A\u0E23\u0E49\u0E32\u0E07 Mortality Dashboard \u0E23\u0E32\u0E22 Ward / DRG \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19"), a0.push("\u{1F535} P1 \xB7 Preventable Death Reporting \u2014 \u0E41\u0E22\u0E01\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 intervention \u0E17\u0E35\u0E48\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32\u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C"), x0 > 0 && a0.push("\u{1F7E1} P2 \xB7 ER Mortality Review \u2014 focus DNR/DAMA patterns \xB7 dispatch time \xB7 resuscitation quality"), f0.push({
    icon: "\u26A0\uFE0F",
    title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 / Red Flags",
    list: U0,
    color: "#f59e0b"
  }), f0.push({
    icon: "\u{1F4A1}",
    title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C (P0\u2013P2)",
    list: a0,
    color: "#10b981"
  }), {
    headline: A0,
    headlineColor: eu,
    kpi: H0,
    sections: f0,
    footerLeft: `IPD Discharged ${j0(X0)} \xB7 ${t0.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \xB7 FY${g0} vs FY${W} \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function a(n, g0 = 0) {
  return n == null || n === "" || isNaN(n) ? "\u2014" : Number(n).toLocaleString("th-TH", {
    minimumFractionDigits: g0,
    maximumFractionDigits: g0
  })
}
async function J0(n, g0) {
  const W = await fetch(n, g0),
    b0 = W.headers.get("content-type") || "";
  if (!W.ok) {
    if (b0.includes("application/json")) {
      const D = await W.json();
      throw new Error(D.error || `HTTP ${W.status}`)
    }
    throw new Error(`HTTP ${W.status}`)
  }
  if (!b0.includes("json")) throw new Error("\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E01\u0E25\u0E31\u0E1A \u2014 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Backend (port 4001) \u0E17\u0E33\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48");
  return W.json()
}
const aE = {
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

function DE(n, g0, W, b0 = "OPD") {
  const D = aE[b0] || aE.OPD;
  if (!n?.comparison || !n.fy1_totals || !n.fy2_totals) return null;
  const t0 = n.fy1_totals,
    Z = n.fy2_totals,
    j0 = n.comparable_months || 0;
  if (j0 === 0) return {
    headline: `\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E35\u0E07\u0E1A ${g0} \u0E01\u0E31\u0E1A ${W} \u2014 \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E44\u0E14\u0E49\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E23\u0E1A\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E1B\u0E35`,
    empty: !0
  };
  const Q0 = t0.lab_orders + t0.drug_orders + t0.xray_orders,
    X0 = t0.lab_price + t0.drug_price + t0.xray_price,
    K0 = Z.lab_orders + Z.drug_orders + Z.xray_orders,
    M0 = Z.lab_price + Z.drug_price + Z.xray_price,
    l0 = Number(n.overall_orders_growth_pct ?? 0),
    x0 = Number(n.overall_price_growth_pct ?? 0),
    _0 = K0 - Q0,
    d0 = M0 - X0,
    Z0 = x0 - l0,
    r0 = (J, G) => G > 0 ? Math.round((J - G) / G * 100) : J > 0 ? 100 : 0,
    K = {
      Lab: {
        ord: r0(Z.lab_orders, t0.lab_orders),
        px: r0(Z.lab_price, t0.lab_price),
        absOrd: Z.lab_orders - t0.lab_orders,
        absPx: Z.lab_price - t0.lab_price
      },
      Drug: {
        ord: r0(Z.drug_orders, t0.drug_orders),
        px: r0(Z.drug_price, t0.drug_price),
        absOrd: Z.drug_orders - t0.drug_orders,
        absPx: Z.drug_price - t0.drug_price
      },
      Xray: {
        ord: r0(Z.xray_orders, t0.xray_orders),
        px: r0(Z.xray_price, t0.xray_price),
        absOrd: Z.xray_orders - t0.xray_orders,
        absPx: Z.xray_price - t0.xray_price
      }
    },
    m0 = {
      Lab: {
        f1: t0.lab_orders ? t0.lab_price / t0.lab_orders : 0,
        f2: Z.lab_orders ? Z.lab_price / Z.lab_orders : 0
      },
      Drug: {
        f1: t0.drug_orders ? t0.drug_price / t0.drug_orders : 0,
        f2: Z.drug_orders ? Z.drug_price / Z.drug_orders : 0
      },
      Xray: {
        f1: t0.xray_orders ? t0.xray_price / t0.xray_orders : 0,
        f2: Z.xray_orders ? Z.xray_price / Z.xray_orders : 0
      }
    },
    S0 = J => J.f1 > 0 ? Math.round((J.f2 - J.f1) / J.f1 * 100) : 0,
    C0 = {
      lab: X0 > 0 ? t0.lab_price / X0 * 100 : 0,
      drug: X0 > 0 ? t0.drug_price / X0 * 100 : 0,
      xray: X0 > 0 ? t0.xray_price / X0 * 100 : 0
    },
    c0 = {
      lab: M0 > 0 ? Z.lab_price / M0 * 100 : 0,
      drug: M0 > 0 ? Z.drug_price / M0 * 100 : 0,
      xray: M0 > 0 ? Z.xray_price / M0 * 100 : 0
    },
    Y = Math.round(c0.lab ** 2 + c0.drug ** 2 + c0.xray ** 2),
    uu = Y >= 5e3 ? {
      text: "\u0E23\u0E27\u0E21\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E2A\u0E39\u0E07",
      color: "#dc2626"
    } : Y >= 3500 ? {
      text: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07",
      color: "#f59e0b"
    } : {
      text: "\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E15\u0E31\u0E27\u0E14\u0E35",
      color: "#10b981"
    },
    A0 = K.Drug.px >= K.Lab.px && K.Drug.px >= K.Xray.px ? {
      name: "Drug (\u0E22\u0E32)",
      g: K.Drug.px
    } : K.Lab.px >= K.Xray.px ? {
      name: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
      g: K.Lab.px
    } : {
      name: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)",
      g: K.Xray.px
    },
    eu = K.Drug.px <= K.Lab.px && K.Drug.px <= K.Xray.px ? {
      name: "Drug (\u0E22\u0E32)",
      g: K.Drug.px
    } : K.Lab.px <= K.Xray.px ? {
      name: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
      g: K.Lab.px
    } : {
      name: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)",
      g: K.Xray.px
    },
    $0 = n.comparison.filter(J => J.fy1.has_data && J.fy2.has_data),
    H0 = [];
  let f0 = null,
    U0 = null,
    a0 = -1 / 0,
    W0 = 1 / 0;
  for (const J of $0) {
    const G = J.fy1.lab_orders + J.fy1.drug_orders + J.fy1.xray_orders,
      k0 = J.fy2.lab_orders + J.fy2.drug_orders + J.fy2.xray_orders,
      V0 = J.fy1.lab_price + J.fy1.drug_price + J.fy1.xray_price,
      Y0 = J.fy2.lab_price + J.fy2.drug_price + J.fy2.xray_price;
    if (G === 0) continue;
    const Eu = (k0 - G) / G * 100,
      bu = V0 > 0 ? (Y0 - V0) / V0 * 100 : 0;
    H0.push({
      month: J.month,
      g: Eu,
      gPx: bu,
      fy1Ord: G,
      fy2Ord: k0,
      fy1Px: V0,
      fy2Px: Y0
    }), Eu > a0 && (a0 = Eu, f0 = J.month), Eu < W0 && (W0 = Eu, U0 = J.month)
  }
  let y0 = 0,
    mu = 0;
  if (H0.length >= 2) {
    mu = H0.reduce((G, k0) => G + k0.g, 0) / H0.length;
    const J = H0.reduce((G, k0) => G + (k0.g - mu) ** 2, 0) / H0.length;
    y0 = Math.round(Math.sqrt(J))
  }
  const ju = y0 >= 30 ? {
    text: "\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E2A\u0E39\u0E07",
    color: "#dc2626"
  } : y0 >= 15 ? {
    text: "\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07",
    color: "#f59e0b"
  } : {
    text: "\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23",
    color: "#10b981"
  };
  let G0 = null;
  if (H0.length >= 4) {
    const J = Math.floor(H0.length / 2),
      G = H0.slice(0, J),
      k0 = H0.slice(H0.length - J),
      V0 = G.reduce((ou, iu) => ou + iu.fy1Px, 0),
      Y0 = G.reduce((ou, iu) => ou + iu.fy2Px, 0),
      Eu = k0.reduce((ou, iu) => ou + iu.fy1Px, 0),
      bu = k0.reduce((ou, iu) => ou + iu.fy2Px, 0),
      _u = V0 > 0 ? (Y0 - V0) / V0 * 100 : 0,
      Cu = Eu > 0 ? (bu - Eu) / Eu * 100 : 0,
      Au = Cu - _u;
    G0 = {
      h1_label: `${G[0].month}\u2013${G[G.length-1].month}`,
      h2_label: `${k0[0].month}\u2013${k0[k0.length-1].month}`,
      h1_growth: Math.round(_u),
      h2_growth: Math.round(Cu),
      accel: Math.round(Au),
      direction: Au >= 3 ? "accelerating" : Au <= -3 ? "decelerating" : "stable"
    }
  }
  const lu = [];
  if (H0.length >= 3 && y0 > 0) {
    const J = Math.max(y0 * 1.5, 15);
    for (const G of H0) {
      const k0 = G.g - mu;
      Math.abs(k0) >= J && lu.push({
        month: G.month,
        growth: Math.round(G.g),
        deviation: Math.round(k0),
        direction: k0 > 0 ? "spike" : "drop"
      })
    }
  }
  const wu = 12 / j0,
    fu = Math.round(X0 * wu),
    du = Math.round(M0 * wu),
    Fu = du - fu,
    n0 = {
      Lab: {
        label: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
        icon: "\u{1F9EA}",
        color: "#2563eb",
        share: c0.lab,
        shareFY1: C0.lab,
        unit: m0.Lab,
        absPx: K.Lab.absPx,
        ordG: K.Lab.ord,
        pxG: K.Lab.px
      },
      Drug: {
        label: "Drug (\u0E22\u0E32)",
        icon: "\u{1F48A}",
        color: "#16a34a",
        share: c0.drug,
        shareFY1: C0.drug,
        unit: m0.Drug,
        absPx: K.Drug.absPx,
        ordG: K.Drug.ord,
        pxG: K.Drug.px
      },
      Xray: {
        label: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35)",
        icon: "\u{1FA7B}",
        color: "#db2777",
        share: c0.xray,
        shareFY1: C0.xray,
        unit: m0.Xray,
        absPx: K.Xray.absPx,
        ordG: K.Xray.ord,
        pxG: K.Xray.px
      }
    },
    Wu = {};
  for (const [J, G] of Object.entries(n0)) {
    const k0 = S0(G.unit),
      V0 = G.share - G.shareFY1;
    let Y0;
    G.pxG >= 5 && G.ordG >= 5 ? Y0 = "\u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32" : G.pxG >= 5 && G.ordG < 2 ? Y0 = "Value-driven \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19" : G.pxG < 0 && G.ordG > 0 ? Y0 = "Margin Compression \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14" : G.pxG < -3 && G.ordG < 0 ? Y0 = "\u0E2B\u0E14\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E21\u0E34\u0E15\u0E34" : Y0 = "\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E43\u0E19\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1B\u0E01\u0E15\u0E34", Wu[J] = {
      label: G.label,
      icon: G.icon,
      color: G.color,
      share: G.share.toFixed(1),
      share_delta: V0.toFixed(1),
      ord_growth: G.ordG,
      px_growth: G.pxG,
      unit_fy2: Math.round(G.unit.f2),
      unit_growth: k0,
      abs_px: G.absPx,
      driver: Y0,
      narrative: `${G.label}: \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${G.ordG>=0?"+":""}${G.ordG}% \xB7 \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 ${G.pxG>=0?"+":""}${G.pxG}% (${G.absPx>=0?"+":""}${a(Math.abs(G.absPx))} \u0E1A\u0E32\u0E17) \xB7 \u0E23\u0E32\u0E04\u0E32/\u0E04\u0E23\u0E31\u0E49\u0E07 \u0E3F${a(Math.round(G.unit.f2))} (${k0>=0?"\u2191":"\u2193"}${Math.abs(k0)}%) \xB7 \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 ${G.share.toFixed(1)}% (${V0>=0?"+":""}${V0.toFixed(1)} \u0E08\u0E38\u0E14) \u2014 ${Y0}`
    }
  }
  let u0;
  const Pu = x0 - l0,
    ru = `${d0>=0?"+":"\u2212"}\u0E3F${a(Math.abs(d0))}`;
  x0 >= 10 && l0 >= 10 ? u0 = `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} \u0E1B\u0E35\u0E07\u0E1A ${W} \u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27\u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 +${x0}% (${ru}) \u0E08\u0E32\u0E01\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${l0}% (${j0} \u0E40\u0E14\u0E37\u0E2D\u0E19) \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E17\u0E31\u0E49\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19` : x0 >= 5 && Pu >= 5 ? u0 = `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} +${x0}% (${ru}) \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (${l0}%) \u2014 Yield \u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Complexity / \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A Unit Price \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E22\u0E31\u0E48\u0E07\u0E22\u0E37\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E25\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27` : l0 > 5 && x0 < 0 ? u0 = `\u26A0 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 Margin Compression \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${l0}% \u0E41\u0E15\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${x0}% (${ru}) \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14\u0E14\u0E31\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E23\u0E48\u0E07\u0E17\u0E1A\u0E17\u0E27\u0E19 ${D.pricePressure}` : x0 <= -5 && l0 <= 0 ? u0 = `\u26A0 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} \u0E2B\u0E14\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E21\u0E34\u0E15\u0E34 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${l0}% \u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${x0}% (${ru}) \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause \u0E14\u0E48\u0E27\u0E19 (${D.rootCause})` : u0 = `\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} ${x0>=0?"\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15":"\u0E2B\u0E14\u0E15\u0E31\u0E27"} ${Math.abs(x0)}% \u0E40\u0E0A\u0E34\u0E07\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (${ru}) \xB7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${l0>=0?"+":""}${l0}% \xB7 Yield ${Z0>=0?"+":""}${Z0.toFixed(1)}pp \xB7 \u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 ${j0} \u0E40\u0E14\u0E37\u0E2D\u0E19`;
  const zu = Math.round(M0 / j0),
    p0 = `Run-rate \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${a(zu)} \u0E1A\u0E32\u0E17/\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E2B\u0E32\u0E01\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E44\u0E14\u0E49\u0E04\u0E23\u0E1A\u0E1B\u0E35 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E44\u0E27\u0E49\u0E17\u0E35\u0E48 ${a(du)} \u0E1A\u0E32\u0E17 (\u0E40\u0E17\u0E35\u0E22\u0E1A FY${g0} annualized: ${a(fu)} \u0E1A\u0E32\u0E17 \xB7 ${Fu>=0?"\u0E1A\u0E27\u0E01":"\u0E25\u0E1A"} ${a(Math.abs(Fu))} \u0E1A\u0E32\u0E17)`,
    Ru = `\u0E1B\u0E35\u0E07\u0E1A ${W} \u0E21\u0E35\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E23\u0E27\u0E21 ${a(K0)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u0E1B\u0E35\u0E07\u0E1A ${g0}: ${a(Q0)} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 ${_0>=0?"+":""}${a(Math.abs(_0))} \u0E04\u0E23\u0E31\u0E49\u0E07 / ${l0>=0?"+":""}${l0}%) \u0E2A\u0E48\u0E27\u0E19\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E23\u0E27\u0E21 ${a(M0)} \u0E1A\u0E32\u0E17 (\u0E1B\u0E35\u0E07\u0E1A ${g0}: ${a(X0)} \u0E1A\u0E32\u0E17 \xB7 ${d0>=0?"+":""}${a(Math.abs(d0))} \u0E1A\u0E32\u0E17 / ${x0>=0?"+":""}${x0}%). Yield Gap = ${Z0>=0?"+":""}${Z0.toFixed(1)} percentage points \u2014 ` + (x0 > l0 + 2 ? "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19, \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E22\u0E32/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E21\u0E35\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19. " : x0 < l0 - 2 ? "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E48\u0E33\u0E25\u0E07 \u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 Generic Substitution, \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D Case Mix \u0E2D\u0E48\u0E2D\u0E19\u0E25\u0E07. " : "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32. ") + p0,
    h0 = `\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E35\u0E07\u0E1A ${W}: Drug ${c0.drug.toFixed(1)}% \xB7 Lab ${c0.lab.toFixed(1)}% \xB7 CT/X-ray ${c0.xray.toFixed(1)}% (\u0E1B\u0E35\u0E07\u0E1A ${g0}: ${C0.drug.toFixed(1)}% / ${C0.lab.toFixed(1)}% / ${C0.xray.toFixed(1)}%). Growth Driver \u0E2B\u0E25\u0E31\u0E01\u0E04\u0E37\u0E2D ${A0.name} (+${A0.g}%) \xB7 \u0E2B\u0E21\u0E27\u0E14\u0E2D\u0E48\u0E2D\u0E19\u0E41\u0E23\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14\u0E04\u0E37\u0E2D ${eu.name} (${eu.g>=0?"+":""}${eu.g}%). HHI = ${a(Y)} (${uu.text}) \u2014 ` + (Math.abs(c0.drug - C0.drug) >= 3 ? `\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Drug ${c0.drug>C0.drug?"\u0E02\u0E22\u0E31\u0E1A\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(c0.drug-C0.drug).toFixed(1)} \u0E08\u0E38\u0E14 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E44\u0E1B\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D` : "Portfolio \u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D"),
    Mu = b0 === "IPD" ? "\u0E0A\u0E48\u0E27\u0E22\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 Ward / DRG \u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Cost per Admission" : "\u0E0A\u0E48\u0E27\u0E22\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Cost Control",
    yu = `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07 \u0E1B\u0E35\u0E07\u0E1A ${W}: Lab \u0E3F${a(Math.round(m0.Lab.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(m0.Lab)>=0?"\u2191":"\u2193"}${Math.abs(S0(m0.Lab))}% \xB7 FY${g0}: \u0E3F${a(Math.round(m0.Lab.f1))}) \xB7 Drug \u0E3F${a(Math.round(m0.Drug.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(m0.Drug)>=0?"\u2191":"\u2193"}${Math.abs(S0(m0.Drug))}% \xB7 FY${g0}: \u0E3F${a(Math.round(m0.Drug.f1))}) \xB7 CT/X-ray \u0E3F${a(Math.round(m0.Xray.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(m0.Xray)>=0?"\u2191":"\u2193"}${Math.abs(S0(m0.Xray))}% \xB7 FY${g0}: \u0E3F${a(Math.round(m0.Xray.f1))}) \u2014 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E19\u0E35\u0E49\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Complexity \u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E23\u0E34\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${Mu}. ` + (m0.Drug.f2 > m0.Drug.f1 * 1.1 ? "Drug Unit Price \u0E1E\u0E38\u0E48\u0E07\u0E40\u0E01\u0E34\u0E19 10% \u2014 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A High-cost Drug List. " : "") + (m0.Xray.f2 > m0.Xray.f1 * 1.1 ? "Imaging Unit Price \u0E1E\u0E38\u0E48\u0E07\u0E40\u0E01\u0E34\u0E19 10% \u2014 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49 CT/MRI \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19. " : "");
  let ku;
  if (f0 && U0) {
    const J = Math.round(a0 - W0);
    ku = `\u0E40\u0E14\u0E37\u0E2D\u0E19 Peak: ${f0} (${a0>=0?"+":""}${Math.round(a0)}%) \xB7 \u0E40\u0E14\u0E37\u0E2D\u0E19 Dip: ${U0} (${W0>=0?"+":""}${Math.round(W0)}%) \xB7 Spread = ${J} percentage points. ` + (J >= 40 ? "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E2A\u0E39\u0E07 \u2014 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1E\u0E35\u0E04\u0E41\u0E25\u0E30\u0E14\u0E34\u0E1B\u0E21\u0E32\u0E01 \u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23 Staffing, Stock, Capacity \u0E41\u0E1A\u0E1A\u0E22\u0E37\u0E14\u0E2B\u0E22\u0E38\u0E48\u0E19" : J >= 20 ? "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u2014 \u0E21\u0E35 Seasonality \u0E41\u0E15\u0E48\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E44\u0E14\u0E49" : "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E15\u0E48\u0E33 \u2014 Demand \u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D")
  } else ku = "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Seasonality";
  const N0 = [];
  if (l0 > 10 && x0 < 0 && N0.push(`\u{1F534} Margin Compression: \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${l0}% \u0E41\u0E15\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${x0}% (${ru}) \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14\u0E14\u0E31\u0E19 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Price List / Discount Policy / Insurance Reimbursement Rate`), x0 >= 15 && l0 <= 3 && N0.push(`\u{1F7E0} Single-source Growth: \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E42\u0E15\u0E08\u0E32\u0E01 Unit Price \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01 (+${x0}% vs +${l0}% volume) \u2014 \u0E40\u0E1B\u0E23\u0E32\u0E30\u0E1A\u0E32\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E22\u0E32/\u0E23\u0E35\u0E40\u0E2D\u0E40\u0E08\u0E19\u0E15\u0E4C/\u0E2D\u0E31\u0E15\u0E23\u0E32 \u0E2A\u0E1B\u0E2A\u0E0A. \u0E43\u0E19\u0E1B\u0E35\u0E16\u0E31\u0E14\u0E44\u0E1B`), (K.Drug.ord > 20 || K.Drug.px > 20) && N0.push(`\u{1F534} Drug Utilization \u0E1E\u0E38\u0E48\u0E07 (+${K.Drug.ord}% orders / +${K.Drug.px}% value \xB7 ${K.Drug.absPx>=0?"+":""}\u0E3F${a(Math.abs(K.Drug.absPx))}) \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Polypharmacy, \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49 \u0E41\u0E25\u0E30 Formulary Compliance`), K.Xray.ord > 15 && K.Xray.ord > l0 * 1.5 + 5 && N0.push(`\u{1F7E0} Imaging \u0E42\u0E15\u0E40\u0E23\u0E47\u0E27\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21 (+${K.Xray.ord}% vs ${l0}%) \u2014 \u0E23\u0E30\u0E27\u0E31\u0E07 Defensive Medicine / Over-ordering \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Guideline`), x0 < -10 && N0.push(`\u{1F534} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} \u0E2B\u0E14\u0E15\u0E31\u0E27 ${x0}% (${ru}) \u2014 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 ${D.rootCause} \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19\u0E14\u0E48\u0E27\u0E19`), Math.max(c0.drug, c0.lab, c0.xray) > 70) {
    const J = c0.drug >= c0.lab && c0.drug >= c0.xray ? "Drug" : c0.lab >= c0.xray ? "Lab" : "CT/X-ray";
    N0.push(`\u{1F7E0} Concentration Risk: \u0E2B\u0E21\u0E27\u0E14 ${J} \u0E04\u0E23\u0E2D\u0E07\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E19 70% (HHI=${a(Y)}) \u2014 \u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E2B\u0E32\u0E01\u0E40\u0E01\u0E34\u0E14 Supply Disruption \u0E08\u0E30\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35`)
  }
  if (y0 >= 30 && N0.push(`\u{1F7E0} Volatility \u0E2A\u0E39\u0E07 (SD=${y0}%) \u2014 \u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Inventory \u0E41\u0E25\u0E30 Staffing \u0E22\u0E32\u0E01 \u0E04\u0E27\u0E23\u0E43\u0E0A\u0E49 Safety Stock \u0E17\u0E35\u0E48\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19`), lu.length > 0) {
    const J = lu.slice(0, 2).map(G => `${G.month} (${G.growth>=0?"+":""}${G.growth}%)`).join(", ");
    N0.push(`\u{1F7E1} \u0E1E\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19 Outlier ${lu.length} \u0E40\u0E14\u0E37\u0E2D\u0E19: ${J}${lu.length>2?"\u2026":""} \u2014 \u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E40\u0E0A\u0E34\u0E07 Root Cause (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01, \u0E22\u0E32\u0E02\u0E32\u0E14, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, \u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1E\u0E34\u0E40\u0E28\u0E29)`)
  }
  G0 && G0.direction === "decelerating" && N0.push(`\u{1F7E1} Momentum \u0E0A\u0E30\u0E25\u0E2D\u0E15\u0E31\u0E27 \u2014 \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07 (${G0.h2_label}) \u0E42\u0E15 ${G0.h2_growth}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 (${G0.h1_label}) ${G0.h1_growth}% \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07 ${G0.accel}pp \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E23\u0E34\u0E48\u0E21\u0E0A\u0E30\u0E25\u0E2D`), N0.length === 0 && N0.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E41\u0E25\u0E30\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01");
  const Lu = b0 === "IPD" ? "Cost-per-admission \xB7 Order-per-admission \xB7 Yield-per-DRG" : "Cost-per-visit \xB7 Order-per-visit \xB7 Yield-per-order",
    F0 = b0 === "IPD" ? "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21 Ward / DRG" : "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04",
    Nu = b0 === "IPD" ? 65 : 55,
    L0 = [];
  x0 > 5 ? L0.push(`\u{1F535} P1 \xB7 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30 Supply Chain \u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15 +${x0}% \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2B\u0E21\u0E27\u0E14 ${A0.name} \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E1B\u0E47\u0E19 Growth Driver \u0E2B\u0E25\u0E31\u0E01`) : x0 < -3 && L0.push(`\u{1F534} P0 \xB7 \u0E08\u0E31\u0E14\u0E15\u0E31\u0E49\u0E07 Task Force \u0E1F\u0E37\u0E49\u0E19\u0E1F\u0E39\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} (${x0}% \xB7 ${ru}) \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Root Cause ${F0} \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19`);
  const Tu = K.Lab.ord > 15 ? "Lab" : K.Xray.ord > 15 ? "CT/X-ray" : K.Drug.ord > 15 ? "Drug" : null;
  return Tu && L0.push(`\u{1F7E1} P2 \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Ordering Protocol \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${Tu} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E38\u0E21 Unnecessary Ordering \u0E41\u0E25\u0E30\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E15\u0E48\u0E2D${b0==="IPD"?"admission":"visit"} (\u0E04\u0E32\u0E14\u0E25\u0E14\u0E44\u0E14\u0E49 5\u201310%)`), f0 && L0.push(`\u{1F535} P1 \xB7 \u0E0A\u0E48\u0E27\u0E07 ${f0} \u0E04\u0E37\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19 Peak Demand \u2014 ${D.peakPlan} \u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 30\u201360 \u0E27\u0E31\u0E19`), y0 >= 20 && L0.push(`\u{1F7E1} P2 \xB7 Volatility \u0E2A\u0E39\u0E07 (SD=${y0}%) \u2014 \u0E1B\u0E23\u0E31\u0E1A Safety Stock \u0E41\u0E25\u0E30 Flexible Staffing Model \u0E40\u0E0A\u0E48\u0E19 On-call pool \u0E2B\u0E23\u0E37\u0E2D Agency staff`), G0 && G0.direction === "decelerating" && x0 > 0 && L0.push(`\u{1F7E1} P2 \xB7 Momentum \u0E0A\u0E30\u0E25\u0E2D (${G0.accel}pp) \u2014 \u0E17\u0E33 Quick Win \u0E43\u0E19\u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E35\u0E07\u0E1A ${b0==="IPD"?"\u0E40\u0E0A\u0E48\u0E19 Enhance Admission pathway, \u0E25\u0E14 AMA/DAMA":"\u0E40\u0E0A\u0E48\u0E19 Campaign \u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07, Chronic Care Follow-up"}`), L0.push(`\u{1F535} P1 \xB7 \u0E2A\u0E23\u0E49\u0E32\u0E07 Executive KPI Dashboard \u0E23\u0E32\u0E22 3 \u0E40\u0E14\u0E37\u0E2D\u0E19: ${Lu} ${F0}`), (K.Drug.px > 15 || c0.drug > Nu) && L0.push("\u{1F534} P0 \xB7 \u0E15\u0E31\u0E49\u0E07 Pharmacy & Therapeutics Committee \u0E17\u0E1A\u0E17\u0E27\u0E19 High-cost Drug List \u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21 Generic Substitution \u0E41\u0E25\u0E30 Therapeutic Interchange"), K.Xray.ord > 15 && L0.push(`\u{1F7E1} P2 \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32 Clinical Decision Support \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07 CT/X-ray ${D.imagingNote} (\u0E04\u0E32\u0E14\u0E25\u0E14 Inappropriate Imaging 10\u201320%)`), Y >= 5e3 && L0.push(`\u{1F7E1} P2 \xB7 HHI=${a(Y)} \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u2014 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Diversification \u0E02\u0E2D\u0E07 Service Portfolio \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E0A\u0E34\u0E07 Operational`), {
    headline: u0,
    kpi: {
      orders_growth_pct: l0,
      price_growth_pct: x0,
      orders_abs_diff: _0,
      price_abs_diff: d0,
      yield_delta: Z0,
      volatility: y0,
      vol_level: ju,
      hhi: Y,
      hhi_level: uu,
      comparable_months: j0,
      annualized_fy1: fu,
      annualized_fy2: du,
      annualized_gap: Fu,
      avg_monthly_px: zu
    },
    trend_analysis: Ru,
    momentum: G0,
    mix_insight: h0,
    unit_economics: yu,
    seasonal_insight: ku,
    anomalies: lu,
    deep_dive: Wu,
    risks: N0,
    recommendations: L0,
    meta: {
      comparable_months: j0,
      fy1: g0,
      fy2: W
    }
  }
}

function su({
  icon: n,
  title: g0,
  text: W,
  list: b0,
  color: D = "#7c3aed"
}) {
  return u.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderLeft: `3px solid ${D}`,
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
        children: g0
      })]
    }), W && u.jsx("p", {
      style: {
        fontSize: "13px",
        color: "var(--md-text-primary)",
        lineHeight: 1.7,
        margin: 0,
        fontWeight: 500
      },
      children: W
    }), b0 && u.jsx("ul", {
      style: {
        margin: "4px 0 0 0",
        paddingLeft: "18px"
      },
      children: b0.map((t0, Z) => u.jsx("li", {
        style: {
          fontSize: "13px",
          color: "var(--md-text-primary)",
          lineHeight: 1.7,
          fontWeight: 500,
          marginBottom: "3px"
        },
        children: t0
      }, Z))
    })]
  })
}

function $u({
  label: n,
  value: g0,
  sub: W,
  color: b0 = "#7c3aed",
  accent: D
}) {
  return u.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderTop: `3px solid ${b0}`,
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
        color: D || b0,
        lineHeight: 1.1
      },
      children: g0
    }), W && u.jsx("div", {
      style: {
        fontSize: "11px",
        color: "var(--md-text-tertiary)",
        marginTop: "3px",
        fontWeight: 600
      },
      children: W
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
        children: ["\u0E3F", a(n.unit_fy2), " ", u.jsxs("span", {
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

function nE({
  data: n,
  fy1: g0,
  fy2: W,
  level: b0 = "OPD"
}) {
  const D = Q.useMemo(() => DE(n, g0, W, b0), [n, g0, W, b0]);
  if (!D) return null;
  const t0 = b0 === "IPD" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01",
    Z = b0 === "IPD" ? "linear-gradient(135deg, rgba(219,39,119,.08), rgba(251,146,60,.05))" : "linear-gradient(135deg, rgba(124,58,237,.08), rgba(14,165,233,.05))";
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
        background: Z,
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
          children: ["AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23", t0, " (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)"]
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
      children: D.empty ? u.jsx("div", {
        style: {
          padding: "14px 16px",
          background: "rgba(251,191,36,.08)",
          borderLeft: "3px solid #f59e0b",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--md-text-primary)"
        },
        children: D.headline
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
          children: D.headline
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "8px",
            marginBottom: "14px"
          },
          children: [u.jsx($u, {
            label: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 Orders",
            value: `${D.kpi.orders_growth_pct>=0?"+":""}${D.kpi.orders_growth_pct}%`,
            sub: `${D.kpi.orders_abs_diff>=0?"+":""}${a(Math.abs(D.kpi.orders_abs_diff))} \u0E04\u0E23\u0E31\u0E49\u0E07`,
            color: D.kpi.orders_growth_pct >= 0 ? "#16a34a" : "#dc2626"
          }), u.jsx($u, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Revenue",
            value: `${D.kpi.price_growth_pct>=0?"+":""}${D.kpi.price_growth_pct}%`,
            sub: `${D.kpi.price_abs_diff>=0?"+":""}\u0E3F${a(Math.abs(D.kpi.price_abs_diff))}`,
            color: D.kpi.price_growth_pct >= 0 ? "#16a34a" : "#dc2626"
          }), u.jsx($u, {
            label: "Yield Delta",
            value: `${D.kpi.yield_delta>=0?"+":""}${D.kpi.yield_delta.toFixed(1)}pp`,
            sub: D.kpi.yield_delta >= 2 ? "Case Mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19" : D.kpi.yield_delta <= -2 ? "Margin \u0E16\u0E39\u0E01\u0E01\u0E14" : "\u0E2A\u0E21\u0E14\u0E38\u0E25",
            color: "#7c3aed"
          }), u.jsx($u, {
            label: "Volatility (SD)",
            value: `${D.kpi.volatility}%`,
            sub: D.kpi.vol_level.text,
            color: D.kpi.vol_level.color,
            accent: D.kpi.vol_level.color
          }), u.jsx($u, {
            label: "Concentration (HHI)",
            value: a(D.kpi.hhi),
            sub: D.kpi.hhi_level.text,
            color: D.kpi.hhi_level.color,
            accent: D.kpi.hhi_level.color
          }), u.jsx($u, {
            label: `Run-rate ${W}`,
            value: `\u0E3F${a(D.kpi.avg_monthly_px)}/\u0E14.`,
            sub: `\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E35 \u0E3F${a(D.kpi.annualized_fy2)}`,
            color: "#0ea5e9"
          })]
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
            marginBottom: "10px"
          },
          children: [u.jsx(su, {
            icon: "\u{1F4CA}",
            title: "Trend Analysis",
            text: D.trend_analysis,
            color: "#7c3aed"
          }), u.jsx(su, {
            icon: "\u{1F9E9}",
            title: "Resource Mix & Growth Driver",
            text: D.mix_insight,
            color: "#0ea5e9"
          })]
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
            marginBottom: "10px"
          },
          children: [D.momentum ? u.jsx(su, {
            icon: "\u{1F680}",
            title: "Momentum & Acceleration",
            text: `\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 (${D.momentum.h1_label}): ${D.momentum.h1_growth>=0?"+":""}${D.momentum.h1_growth}% \xB7 \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07 (${D.momentum.h2_label}): ${D.momentum.h2_growth>=0?"+":""}${D.momentum.h2_growth}% \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07 ${D.momentum.accel>=0?"+":""}${D.momentum.accel}pp \u2014 ${D.momentum.direction==="accelerating"?"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E23\u0E48\u0E07\u0E15\u0E31\u0E27 \u2014 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E1A\u0E27\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Q3\u2013Q4 \u0E02\u0E2D\u0E07\u0E1B\u0E35\u0E07\u0E1A":D.momentum.direction==="decelerating"?"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E30\u0E25\u0E2D \u2014 \u0E04\u0E27\u0E23\u0E17\u0E33 Quick Win \u0E41\u0E25\u0E30 Mid-year Review":"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E04\u0E07\u0E17\u0E35\u0E48 \u2014 \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E44\u0E14\u0E49"}`,
            color: D.momentum.direction === "accelerating" ? "#10b981" : D.momentum.direction === "decelerating" ? "#f59e0b" : "#0ea5e9"
          }) : u.jsx(su, {
            icon: "\u{1F680}",
            title: "Momentum & Acceleration",
            text: "\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 4 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E33\u0E19\u0E27\u0E13 Momentum",
            color: "#94a3b8"
          }), u.jsx(su, {
            icon: "\u{1F4A0}",
            title: "Unit Economics (\u0E1A\u0E32\u0E17/\u0E04\u0E23\u0E31\u0E49\u0E07)",
            text: D.unit_economics,
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
              item: D.deep_dive.Lab
            }), u.jsx(Vu, {
              item: D.deep_dive.Drug
            }), u.jsx(Vu, {
              item: D.deep_dive.Xray
            })]
          })]
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
            marginBottom: "10px"
          },
          children: [u.jsx(su, {
            icon: "\u{1F5D3}\uFE0F",
            title: "Seasonal Pattern",
            text: D.seasonal_insight,
            color: "#8b5cf6"
          }), u.jsx(su, {
            icon: "\u{1F3AF}",
            title: "Anomaly Detection",
            text: D.anomalies.length === 0 ? "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19 Outlier \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C (threshold = 1.5 \xD7 SD). \u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u2014 \u0E23\u0E30\u0E1A\u0E1A Inventory/Staffing \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33" : `\u0E1E\u0E1A ${D.anomalies.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E1A\u0E19\u0E08\u0E32\u0E01 Trend \u0E40\u0E01\u0E34\u0E19 1.5 \xD7 SD: ${D.anomalies.map(j0=>`${j0.month} (${j0.direction==="spike"?"\u25B2":"\u25BC"}${j0.growth>=0?"+":""}${j0.growth}%)`).join(" \xB7 ")} \u2014 \u0E04\u0E27\u0E23\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause \u0E40\u0E0A\u0E34\u0E07 Operational (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32, \u0E22\u0E32\u0E02\u0E32\u0E14, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, Outbreak)`,
            color: D.anomalies.length === 0 ? "#10b981" : "#f59e0b"
          })]
        }), u.jsx("div", {
          style: {
            marginBottom: "10px"
          },
          children: u.jsx(su, {
            icon: "\u{1F4C8}",
            title: "Financial Projection \u2014 Annualized Outlook",
            text: `\u0E08\u0E32\u0E01 Run-rate ${D.kpi.comparable_months} \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Annualized FY${W}: \u0E3F${a(D.kpi.annualized_fy2)} \u0E1A\u0E32\u0E17 \xB7 Annualized FY${g0}: \u0E3F${a(D.kpi.annualized_fy1)} \u0E1A\u0E32\u0E17 \xB7 Gap = ${D.kpi.annualized_gap>=0?"+":"\u2212"}\u0E3F${a(Math.abs(D.kpi.annualized_gap))} \u0E1A\u0E32\u0E17. ${D.kpi.annualized_gap>=0?"\u0E2B\u0E32\u0E01\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E44\u0E14\u0E49\u0E04\u0E23\u0E1A\u0E1B\u0E35 \u0E08\u0E30\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19":"\u0E2B\u0E32\u0E01\u0E22\u0E31\u0E07\u0E04\u0E07\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E15\u0E48\u0E2D\u0E44\u0E1B \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E35\u0E08\u0E30\u0E2B\u0E14\u0E15\u0E31\u0E27\u0E08\u0E32\u0E01\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"} \u0E02\u0E49\u0E2D\u0E2A\u0E33\u0E04\u0E31\u0E0D: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E41\u0E1A\u0E1A Linear Extrapolation \u2014 \u0E44\u0E21\u0E48\u0E23\u0E27\u0E21 Seasonality adjustment`,
            color: "#0ea5e9"
          })
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px"
          },
          children: [u.jsx(su, {
            icon: "\u26A0\uFE0F",
            title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 / Red Flags (\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E23\u0E49\u0E2D\u0E19)",
            list: D.risks,
            color: "#f59e0b"
          }), u.jsx(su, {
            icon: "\u{1F4A1}",
            title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C (\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D P0\u2013P2)",
            list: D.recommendations,
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
            children: ["\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25: ", D.meta.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \xB7 \u0E1B\u0E35\u0E07\u0E1A ", D.meta.fy1, " vs ", D.meta.fy2, " \xB7 12 \u0E21\u0E34\u0E15\u0E34\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"]
          }), u.jsx("span", {
            children: "\u26A0 \u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E41\u0E25\u0E30\u0E1A\u0E23\u0E34\u0E1A\u0E17\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21"
          })]
        })]
      })
    })]
  })
}

function BE() {
  const [n, g0] = Q.useState("opd-compare"), [W, b0] = Q.useState(null), [D, t0] = Q.useState(null), [Z, j0] = Q.useState(null), [Q0, X0] = Q.useState(null), [K0, M0] = Q.useState(null), [l0, x0] = Q.useState(null), [_0, d0] = Q.useState(!0), [Z0, r0] = Q.useState(null), K = Q.useRef(null), [m0, S0] = Q.useState(null), [C0, c0] = Q.useState(null), [Y, uu] = Q.useState(null), [A0, eu] = Q.useState(null), [$0, H0] = Q.useState(null), [f0, U0] = Q.useState(null), [a0, W0] = Q.useState(null), [y0, mu] = Q.useState(null), [ju, G0] = Q.useState(null), lu = new Date, wu = lu.getMonth() + 1, fu = lu.getFullYear(), du = wu >= 10 ? fu + 544 : fu + 543, Fu = du - 1, [n0, Wu] = Q.useState(Fu), [u0, Pu] = Q.useState(du), ru = `${fu}-${String(wu).padStart(2,"0")}-01`, zu = new Date().toISOString().slice(0, 10), [p0, Ru] = Q.useState(ru), [h0, Mu] = Q.useState(zu), [yu, ku] = Q.useState(ru), [N0, Lu] = Q.useState(zu), [F0, Nu] = Q.useState(10), L0 = Q.useCallback(e => e ? F0 === "all" ? e : e.slice(0, F0) : [], [F0]), Tu = Q.useMemo(() => L0(C0?.patients), [C0, L0]), J = Q.useMemo(() => {
    if (!f0?.patients) return null;
    const e = f0.patients,
      t = f0.total_income || 0,
      d = f0.unique_patients || new Set(e.map(l => l.hn)).size,
      k = e.length > 0 ? Math.round(t / e.length) : 0;
    let r = 0,
      c = 0;
    const o = {
        "<40": 0,
        "40-49": 0,
        "50-59": 0,
        "60-69": 0,
        "70+": 0
      },
      m = {},
      h = {},
      A = f0.diseases || ["DM", "HT", "DLP", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD", "Other"],
      C = Object.fromEntries(A.map(l => [l, 0])),
      S = l => l ? /^E11/.test(l) ? "DM" : /^E78/.test(l) ? "DLP" : l === "I10" ? "HT" : /^I25/.test(l) ? "IHD" : /^I69/.test(l) ? "Stroke" : /^J44/.test(l) ? "COPD" : /^N181/.test(l) ? "CKD1" : /^N182/.test(l) ? "CKD2" : /^N183/.test(l) ? "CKD3" : /^N184/.test(l) ? "CKD4" : /^N18[56]/.test(l) ? "CKD5" : /^N18/.test(l) ? "CKD" : null : null;
    for (const l of e) {
      l.sex === "\u0E0A\u0E32\u0E22" ? r++ : l.sex === "\u0E2B\u0E0D\u0E34\u0E07" && c++;
      const L = Number(l.age_y) || 0;
      L < 40 ? o["<40"]++ : L < 50 ? o["40-49"]++ : L < 60 ? o["50-59"]++ : L < 70 ? o["60-69"]++ : o["70+"]++;
      const i = (l.icd_pairs || "").split("||"),
        x = new Set;
      for (const N of i) {
        if (!N) continue;
        const v = N.indexOf("::"),
          $ = (v >= 0 ? N.slice(0, v) : N).toUpperCase(),
          U = v >= 0 ? N.slice(v + 2) : "";
        if (!$ || !au.test($)) continue;
        m[$] || (m[$] = {
          code: $,
          name: U,
          count: 0,
          totalInc: 0
        }), m[$].count++, m[$].totalInc += l.income || 0;
        const B = S($);
        B && x.add(B)
      }
      l.ckd_stage && /^CKD/.test(l.ckd_stage) && (["CKD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5"].forEach(N => x.delete(N)), x.add(l.ckd_stage)), x.size === 0 && x.add("Other"), x.forEach(N => {
        N in C && C[N]++
      });
      const f = l.pttype_name || "-";
      h[f] || (h[f] = {
        count: 0,
        income: 0
      }), h[f].count++, h[f].income += l.income || 0
    }
    const w = Math.max(...Object.values(o), 1),
      R = Object.values(m).sort((l, L) => L.count - l.count),
      M = Object.entries(h).sort((l, L) => L[1].count - l[1].count);
    let b = 0,
      _ = 0,
      H = 0,
      p = 0;
    for (const l of e) l.ckd_stage && b++, l.ckd_stage && l.egfr != null && (_++, H += l.egfr), (l.ckd_stage === "CKD4" || l.ckd_stage === "CKD5") && p++;
    return {
      pts: e,
      totalIncome: t,
      uniquePatients: d,
      avgIncome: k,
      maleCount: r,
      femaleCount: c,
      ageGroups: o,
      ageMax: w,
      icdMap: m,
      topIcd: R,
      rightList: M,
      ckdCount: b,
      ckdWithEgfrCount: _,
      avgEgfr: _ > 0 ? Math.round(H / _) : null,
      advancedCkd: p,
      diseaseCountsFE: C
    }
  }, [f0]), G = Q.useCallback(async () => {
    d0(!0), r0(null);
    try {
      const e = new URLSearchParams({
          start: yu,
          end: N0,
          _t: Date.now()
        }),
        t = await J0(`/api/report/ipd-compare?${e}`, {
          credentials: "include"
        });
      b0(t)
    } catch (e) {
      r0(e.message)
    }
    d0(!1)
  }, [yu, N0]), k0 = Q.useCallback(async () => {
    d0(!0), r0(null);
    try {
      const e = await J0(`/api/report/opd-compare-daterange?start=${p0}&end=${h0}&_t=${Date.now()}`, {
        credentials: "include"
      });
      t0(e)
    } catch (e) {
      r0(e.message)
    }
    d0(!1)
  }, [p0, h0]);
  Q.useCallback(async () => {
    d0(!0), r0(null);
    try {
      const e = await J0(`/api/report/resource-usage?fy1=${n0}&fy2=${u0}&_t=${Date.now()}`, {
        credentials: "include"
      });
      j0(e)
    } catch (e) {
      r0(e.message)
    }
    d0(!1)
  }, [n0, u0]);
  const V0 = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/resource-opd-monthly?fy1=${n0}&fy2=${u0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        X0(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [n0, u0]),
    Y0 = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/resource-ipd-monthly?fy1=${n0}&fy2=${u0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        M0(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [n0, u0]),
    Eu = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/mortality-monthly?fy1=${n0}&fy2=${u0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        x0(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [n0, u0]),
    bu = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/frax-patients?start=${p0}&end=${h0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        c0(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [p0, h0]),
    _u = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/pt-patients?start=${p0}&end=${h0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        uu(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [p0, h0]),
    Cu = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/staff-patients?start=${p0}&end=${h0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        uu(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [p0, h0]),
    Au = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/fluoride-patients?start=${p0}&end=${h0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        eu(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [p0, h0]),
    ou = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/elderly-cxr?start=${p0}&end=${h0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        H0(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [p0, h0]),
    iu = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/ncd-patients?start=${p0}&end=${h0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        U0(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [p0, h0]),
    Ou = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/imaging-services?start=${p0}&end=${h0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        W0(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [p0, h0]),
    Hu = Q.useCallback(async () => {
      d0(!0), r0(null);
      try {
        const e = await J0(`/api/report/pttype-services?from=${p0}&to=${h0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        mu(e)
      } catch (e) {
        r0(e.message)
      }
      d0(!1)
    }, [p0, h0]);
  Q.useEffect(() => {
    n === "ipd-compare" ? G() : n === "opd-compare" ? k0() : n === "resource-opd" ? V0() : n === "resource-ipd" ? Y0() : n === "mortality" ? Eu() : n === "frax" ? bu() : n === "pt" ? _u() : n === "fluoride" ? Au() : n === "elderly-cxr" ? ou() : n === "ncd-disease" ? iu() : n === "imaging-services" ? Ou() : n === "pttype-services" ? Hu() : n === "staff-services" && Cu()
  }, [n, G, k0, V0, Y0, Eu, bu, _u, Cu, Au, ou, iu, Ou, Hu]), Q.useEffect(() => {
    const e = setTimeout(() => {
      J0("/api/ai/report/executive-summary", {
        credentials: "include"
      }).then(S0).catch(() => {})
    }, 300);
    return () => clearTimeout(e)
  }, []);
  const Yu = Q.useMemo(() => {
      if (!W?.comparison) return "";
      const e = W.comparison.filter(d => d.fy2.has_data).map(d => d.month);
      if (e.length === 0) return "";
      const t = W.fiscal_years?.fy2?.be || u0;
      return `(${e[0]} - ${e[e.length-1]} ${t})`
    }, [W, u0]),
    sE = Q.useCallback(() => {
      const e = K.current;
      if (!e) return;
      const t = window.open("", "_blank");
      t.document.write(`
      <html><head><title>\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 ${W?.title||`${n0}-${u0}`}</title>
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
    }, [n0, u0]),
    lE = Q.useCallback(() => {
      const e = (t, d) => {
        const k = t.utils.book_new(),
          r = "Sarabun",
          c = 8,
          o = {
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
          m = {
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
            top: m,
            bottom: m,
            left: m,
            right: m
          },
          C = {},
          S = [],
          w = [],
          R = (F, j, I, P) => {
            const q = typeof I == "number" ? "n" : "s";
            C[t.utils.encode_cell({
              r: F,
              c: j
            })] = P ? {
              v: I,
              t: q,
              s: P
            } : {
              v: I,
              t: q
            }
          },
          M = (F, j, I, P) => S.push({
            s: {
              r: F,
              c: j
            },
            e: {
              r: I,
              c: P
            }
          }),
          b = {
            font: {
              name: r,
              sz: 22,
              bold: !0,
              color: {
                rgb: o.white
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: d.themeColor || o.purpleDark
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
          _ = {
            font: {
              name: r,
              sz: 11,
              color: {
                rgb: o.white
              },
              italic: !0
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: d.themeColorLight || "6D28D9"
              }
            },
            alignment: {
              horizontal: "center",
              vertical: "center"
            }
          },
          H = {
            font: {
              name: r,
              sz: 9,
              color: {
                rgb: o.muted
              },
              italic: !0
            },
            alignment: {
              horizontal: "right",
              vertical: "center",
              indent: 1
            }
          },
          p = F => ({
            font: {
              name: r,
              sz: 14,
              bold: !0,
              color: {
                rgb: o.white
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: F
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
          l = {
            font: {
              name: r,
              sz: 11,
              bold: !0,
              color: {
                rgb: o.slateDark
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: o.slateLight
              }
            },
            alignment: {
              horizontal: "left",
              vertical: "center",
              indent: 2
            },
            border: A
          },
          L = (F, j) => ({
            font: {
              name: r,
              sz: 18,
              bold: !0,
              color: {
                rgb: F || o.text
              }
            },
            alignment: {
              horizontal: "right",
              vertical: "center",
              indent: 1
            },
            border: A,
            numFmt: j || "#,##0"
          }),
          i = {
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: o.muted
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
                rgb: o.slateSoft
              }
            }
          },
          x = {
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: o.muted
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
                rgb: o.slateSoft
              }
            }
          },
          f = F => ({
            font: {
              name: r,
              sz: 11,
              bold: !0,
              color: {
                rgb: o.white
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: F
              }
            },
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: !0
            },
            border: A
          }),
          N = (F = {}) => ({
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: o.text
              },
              ...F.font || {}
            },
            alignment: {
              horizontal: F.align || "left",
              vertical: "center",
              wrapText: !!F.wrap,
              indent: F.align === "left" ? 1 : 0
            },
            border: A,
            fill: F.bg ? {
              patternType: "solid",
              fgColor: {
                rgb: F.bg
              }
            } : void 0,
            numFmt: F.numFmt
          });
        let v = 0;
        const $ = (F = 12) => {
          w[v] = {
            hpx: F
          }, v++
        };
        if (R(v, 0, `${d.titleEmoji||"\u{1F4CB}"}  ${d.titleText}`, b), M(v, 0, v, c - 1), w[v] = {
            hpx: 56
          }, v++, R(v, 0, `\u{1F4C5}  \u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25:  ${d.dateRange.start}  \u2192  ${d.dateRange.end}    \xB7    \u{1F465}  ${(d.totalCount||0).toLocaleString()} \u0E23\u0E32\u0E22${d.uniqueCount?`  /  ${d.uniqueCount.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33`:""}`, _), M(v, 0, v, c - 1), w[v] = {
            hpx: 28
          }, v++, R(v, 0, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D:  ${new Date().toLocaleString("th-TH")}    \xB7    ${d.dataSource||""}`, H), M(v, 0, v, c - 1), w[v] = {
            hpx: 18
          }, v++, $(8), d.kpis && d.kpis.length) {
          R(v, 0, "\u{1F4CA}  KPI \u0E2A\u0E23\u0E38\u0E1B", p(d.themeColor || o.purpleDark)), M(v, 0, v, c - 1), w[v] = {
            hpx: 32
          }, v++;
          for (const F of d.kpis) R(v, 0, F.label, l), M(v, 0, v, 1), R(v, 2, F.value, L(F.color, F.fmt)), M(v, 2, v, 4), R(v, 5, F.unit || "", i), R(v, 6, F.note || "", x), M(v, 6, v, 7), w[v] = {
            hpx: 32
          }, v++;
          $(12)
        }
        if (d.breakdowns && d.breakdowns.length)
          for (const F of d.breakdowns) {
            if (R(v, 0, `${F.icon||"\u{1F4C8}"}  ${F.title}`, p(F.color)), M(v, 0, v, c - 1), w[v] = {
                hpx: 32
              }, v++, F.headers) {
              const I = F.headerSegs || [
                [0, 0],
                [1, 5],
                [6, 6],
                [7, 7]
              ];
              F.headers.forEach((P, q) => {
                const [E0, e0] = I[q] || [q, q];
                R(v, E0, P, f(F.color)), E0 !== e0 && M(v, E0, v, e0)
              }), w[v] = {
                hpx: 30
              }, v++
            }
            let j = 0;
            for (const I of F.rows || []) {
              const P = j % 2 === 1 ? o.stripe : void 0,
                q = F.rowSegs || [
                  [0, 0],
                  [1, 5],
                  [6, 6],
                  [7, 7]
                ];
              I.forEach((E0, e0) => {
                const [v0, T0] = q[e0] || [e0, e0];
                R(v, v0, E0.v, N({
                  align: E0.align || (typeof E0.v == "number" ? "right" : "left"),
                  numFmt: E0.fmt,
                  font: E0.font,
                  bg: P,
                  wrap: !!E0.wrap
                })), v0 !== T0 && M(v, v0, v, T0)
              }), w[v] = {
                hpx: F.rowHeight || 24
              }, v++, j++
            }
            $(12)
          }
        if (d.insights && d.insights.length) {
          R(v, 0, "\u{1F916}  AI Insights & \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30", p(o.red)), M(v, 0, v, c - 1), w[v] = {
            hpx: 32
          }, v++, R(v, 0, "\u0E23\u0E30\u0E14\u0E31\u0E1A", f(o.red)), R(v, 1, "\u0E2B\u0E21\u0E27\u0E14", f(o.red)), M(v, 1, v, 2), R(v, 3, "\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E1A", f(o.red)), M(v, 3, v, 4), R(v, 5, "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 / Action", f(o.red)), M(v, 5, v, 7), w[v] = {
            hpx: 30
          }, v++;
          const F = {
              critical: 0,
              high: 1,
              med: 2,
              info: 3,
              good: 4,
              low: 3
            },
            j = [...d.insights].sort((P, q) => (F[P.sev] ?? 9) - (F[q.sev] ?? 9)),
            I = {
              critical: {
                label: "\u{1F534} CRITICAL",
                bg: o.redLight,
                fg: o.red
              },
              high: {
                label: "\u{1F7E0} HIGH",
                bg: "FED7AA",
                fg: "C2410C"
              },
              med: {
                label: "\u{1F7E1} MEDIUM",
                bg: o.amberLight,
                fg: o.amberDark
              },
              info: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: o.blue
              },
              good: {
                label: "\u{1F7E2} GOOD",
                bg: o.greenLight,
                fg: o.greenDark
              },
              low: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: o.blue
              }
            };
          for (const P of j) {
            const q = I[P.sev] || I.info;
            R(v, 0, q.label, {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: q.fg
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: q.bg
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: A
            }), R(v, 1, P.cat, {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: o.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: o.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: A
            }), M(v, 1, v, 2), R(v, 3, P.msg, {
              font: {
                name: r,
                sz: 10,
                bold: P.sev === "critical" || P.sev === "high",
                color: {
                  rgb: o.text
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
                  rgb: q.bg
                }
              }
            }), M(v, 3, v, 4), R(v, 5, P.action, {
              font: {
                name: r,
                sz: 10,
                color: {
                  rgb: o.slateDark
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
                  rgb: o.slateSoft
                }
              }
            }), M(v, 5, v, 7);
            const E0 = Math.max(Math.ceil((P.action || "").length / 80), Math.ceil((P.msg || "").length / 40), 2);
            w[v] = {
              hpx: Math.min(120, 22 + E0 * 16)
            }, v++
          }
          $(12)
        }
        if (d.references && d.references.length) {
          R(v, 0, "\u{1F4DA}  \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38 / \u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07", p(o.muted)), M(v, 0, v, c - 1), w[v] = {
            hpx: 30
          }, v++;
          for (const [F, j] of d.references) {
            const I = F === "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22",
              P = I ? o.greenDark : o.slateDark,
              q = I ? o.greenDark : o.muted,
              E0 = I ? o.greenLight : o.slateSoft;
            R(v, 0, F, N({
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: P
                }
              },
              align: "left",
              bg: E0
            })), M(v, 0, v, 1), R(v, 2, j, N({
              font: {
                sz: I ? 11 : 9,
                bold: I,
                color: {
                  rgb: q
                }
              },
              align: "left",
              wrap: !0,
              bg: E0
            })), M(v, 2, v, 7), w[v] = {
              hpx: 36
            }, v++
          }
        }
        C["!ref"] = t.utils.encode_range({
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: v - 1,
            c: c - 1
          }
        }), C["!merges"] = S, C["!cols"] = [{
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
        }], C["!rows"] = w, C["!freeze"] = {
          xSplit: 0,
          ySplit: 3
        }, t.utils.book_append_sheet(k, C, "Overview");
        const U = {};
        d.patientHeader.forEach((F, j) => {
          U[t.utils.encode_cell({
            r: 0,
            c: j
          })] = {
            v: F,
            t: "s",
            s: {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: o.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: o.slate
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
        const B = d.patientIncomeCols || [];
        d.patientData.forEach((F, j) => {
          const I = j % 2 === 0 ? void 0 : o.stripe;
          F.forEach((P, q) => {
            const E0 = typeof P == "number",
              e0 = B.includes(q);
            U[t.utils.encode_cell({
              r: j + 1,
              c: q
            })] = {
              v: P,
              t: E0 ? "n" : "s",
              s: {
                font: {
                  name: r,
                  sz: 9,
                  bold: e0,
                  color: {
                    rgb: e0 ? o.green : o.text
                  }
                },
                alignment: {
                  horizontal: E0 ? "right" : "left",
                  vertical: "center",
                  wrapText: !1,
                  indent: E0 ? 0 : 1
                },
                border: A,
                fill: I ? {
                  patternType: "solid",
                  fgColor: {
                    rgb: I
                  }
                } : void 0,
                numFmt: e0 ? "#,##0.00" : E0 ? "#,##0" : void 0
              }
            }
          })
        }), U["!ref"] = t.utils.encode_range({
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: d.patientData.length,
            c: d.patientHeader.length - 1
          }
        }), U["!cols"] = (d.patientColWidths || d.patientHeader.map(() => 14)).map(F => ({
          wch: F
        })), U["!rows"] = [{
          hpx: 30
        }], U["!freeze"] = {
          xSplit: 0,
          ySplit: 1
        }, t.utils.book_append_sheet(k, U, d.patientSheetName || "Data"), t.writeFile(k, d.filename)
      };
      if (n === "ipd-compare") {
        if (!W?.comparison) return;
        const t = (h, A) => h > 0 ? Math.round((A - h) / h * 100) + "%" : A > 0 ? "100%" : "0%",
          d = W.fiscal_years?.fy1?.label || `\u0E1B\u0E35\u0E07\u0E1A ${n0}`,
          k = W.fiscal_years?.fy2?.label || `\u0E1B\u0E35\u0E07\u0E1A ${u0}`,
          r = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `Admit (${d})`, `D/C (${d})`, "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19", "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07", "\u0E40\u0E15\u0E35\u0E22\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E08\u0E23\u0E34\u0E07", "Sum AdjRW", "CMI", `Admit (${k})`, `D/C (${k})`, "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19", "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07", "\u0E40\u0E15\u0E35\u0E22\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E08\u0E23\u0E34\u0E07", "Sum AdjRW", "CMI", "YoY Admit %", "YoY D/C %", "YoY \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19 %", "YoY ALOS %", "YoY \u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 %", "YoY Active Bed %", "YoY AdjRW %", "YoY CMI %", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 Admit", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 D/C", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19"],
          c = W.comparison.map(h => [h.month, h.fy1.admits, h.fy1.discharges, h.fy1.total_los, h.fy1.alos, h.fy1.occupancy_rate, h.fy1.active_beds, h.fy1.sum_adjrw, h.fy1.cmi, h.fy2.admits, h.fy2.discharges, h.fy2.total_los, h.fy2.alos, h.fy2.occupancy_rate, h.fy2.active_beds, h.fy2.sum_adjrw, h.fy2.cmi, t(h.fy1.admits, h.fy2.admits), t(h.fy1.discharges, h.fy2.discharges), t(h.fy1.total_los, h.fy2.total_los), t(h.fy1.alos, h.fy2.alos), t(h.fy1.occupancy_rate, h.fy2.occupancy_rate), t(h.fy1.active_beds, h.fy2.active_beds), t(h.fy1.sum_adjrw, h.fy2.sum_adjrw), t(h.fy1.cmi, h.fy2.cmi), h.admit_diff, (h.fy2.discharges || 0) - (h.fy1.discharges || 0), h.fy2.total_los - h.fy1.total_los]),
          o = W.fy1_totals,
          m = W.fy2_totals;
        c.push(["\u0E23\u0E27\u0E21", o.admits, o.discharges, o.total_los, o.alos, o.occupancy_rate, o.active_beds, o.sum_adjrw, o.cmi, m.admits, m.discharges, m.total_los, m.alos, m.occupancy_rate, m.active_beds, m.sum_adjrw, m.cmi, t(o.admits, m.admits), t(o.discharges, m.discharges), t(o.total_los, m.total_los), t(o.alos, m.alos), t(o.occupancy_rate, m.occupancy_rate), t(o.active_beds, m.active_beds), t(o.sum_adjrw, m.sum_adjrw), t(o.cmi, m.cmi), W.overall_admit_diff, (m.discharges || 0) - (o.discharges || 0), m.total_los - o.total_los]), pu(() => import("./xlsx-BuHXVOW6.js"), []).then(h => {
          const A = [r, ...c],
            C = h.utils.aoa_to_sheet(A);
          C["!cols"] = r.map((w, R) => {
            const M = Math.max(w.length, ...c.map(b => String(b[R] ?? "").length));
            return {
              wch: Math.min(Math.max(M + 2, 8), 30)
            }
          });
          const S = h.utils.book_new();
          h.utils.book_append_sheet(S, C, "IPD Compare"), h.writeFile(S, `BCH360_IPD_Compare_${yu}_${N0}.xlsx`)
        });
        return
      }
      if (n === "frax") {
        if (!C0?.patients) return;
        const t = C0.patients;
        t.reduce((b, _) => b + (_.income || 0), 0);
        const d = new Set(t.map(b => b.hn)).size,
          k = t.length > 0 ? t.reduce((b, _) => b + (Number(_.major_osteoporotic) || 0), 0) / t.length : 0,
          r = t.length > 0 ? t.reduce((b, _) => b + (Number(_.hip_fracture) || 0), 0) / t.length : 0,
          c = t.filter(b => Number(b.major_osteoporotic) >= 20).length,
          o = t.filter(b => Number(b.hip_fracture) >= 3).length,
          m = t.length > 0 ? Math.round(t.reduce((b, _) => b + (Number(_.age) || 0), 0) / t.length) : 0,
          h = {
            "50-59": 0,
            "60-69": 0,
            "70-79": 0,
            "80+": 0
          };
        t.forEach(b => {
          const _ = Number(b.age) || 0;
          _ < 60 ? h["50-59"]++ : _ < 70 ? h["60-69"]++ : _ < 80 ? h["70-79"]++ : h["80+"]++
        });
        const A = {};
        t.forEach(b => {
          const _ = b.pttype_name || "-";
          A[_] = (A[_] || 0) + 1
        });
        const C = Object.entries(A).sort((b, _) => _[1] - b[1]),
          S = [];
        c > 0 && S.push({
          sev: "critical",
          cat: "High Fracture Risk",
          msg: `Major Osteoporotic Risk \u226520%: ${c} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 DEXA scan \u0E41\u0E25\u0E30\u0E40\u0E23\u0E34\u0E48\u0E21\u0E22\u0E32 bisphosphonate`,
          action: "\u0E19\u0E31\u0E14\u0E17\u0E33 Bone Mineral Density (DEXA) \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 Endocrinologist \xB7 vitamin D + calcium supplement \xB7 fall prevention counseling"
        }), o > 0 && S.push({
          sev: "high",
          cat: "Hip Fracture Risk",
          msg: `Hip Fracture Risk \u22653%: ${o} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E2B\u0E31\u0E01 10 \u0E1B\u0E35`,
          action: "Hip protector \xB7 home safety assessment \xB7 physical therapy \xB7 strength + balance training"
        }), k >= 10 && S.push({
          sev: "med",
          cat: "Population Risk",
          msg: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Major Risk = ${k.toFixed(1)}% \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B`,
          action: "\u0E08\u0E31\u0E14 health education \xB7 screening campaign \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A peri/postmenopausal women"
        }), S.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m} \u0E1B\u0E35 \xB7 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E1E\u0E28\u0E2B\u0E0D\u0E34\u0E07 (FRAX guideline)`,
          action: "continue routine screening for postmenopausal women \xB7 check secondary causes of osteoporosis"
        }), S.push({
          sev: "info",
          cat: "Operational",
          msg: `\u0E23\u0E27\u0E21 ${t.length} \u0E23\u0E32\u0E22 \u0E43\u0E19 ${Math.max(1,Math.ceil((new Date(h0)-new Date(p0))/864e5)+1)} \u0E27\u0E31\u0E19`,
          action: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 DEXA slot \xB7 drug stock \xB7 F/U appointment scheduling"
        });
        const w = [{
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
            rows: Object.entries(h).map(([b, _]) => [{
              v: b,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: _,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? _ / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: b === "80+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14" : b === "70-79" ? "\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "",
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
            rows: C.slice(0, 10).map(([b, _]) => [{
              v: b,
              align: "left",
              wrap: !0
            }, {
              v: _,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? _ / t.length : 0,
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
          R = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "VN", "HN", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 (kg)", "\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (cm)", "BMI", "Major Osteo. (%)", "Hip Fracture (%)"],
          M = t.map(b => [b.no, b.vn, b.hn, b.cid, b.fullname, b.sex, b.age, b.phone || "", b.vstdate, b.vsttime, b.pttype_name || "", b.weight || "", b.height || "", b.bmi ? Number(b.bmi) : "", b.major_osteoporotic, b.hip_fracture]);
        pu(() => import("./xlsx.min-CZi5yKex.js").then(b => b.x), Du([0, 1])).then(b => {
          e(b, {
            filename: `BCH360_FRAX_BoneDensity_${p0}_${h0}.xlsx`,
            titleEmoji: "\u{1F9B4}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19 FRAX Calculator (\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2B\u0E31\u0E01)",
            themeColor: "A855F7",
            themeColorLight: "7C3AED",
            dateRange: {
              start: p0,
              end: h0
            },
            dataSource: "HOSxP XE \xB7 FRAX\xAE WHO Model (Thailand) \xB7 Bone Density",
            totalCount: t.length,
            uniqueCount: d,
            kpis: [{
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19",
              value: t.length,
              unit: "\u0E23\u0E32\u0E22",
              color: "A855F7",
              fmt: "#,##0",
              note: "\u0E19\u0E31\u0E1A visit \u0E17\u0E35\u0E48\u0E17\u0E33 FRAX"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Major Osteoporotic Risk",
              value: Math.round(k * 10) / 10,
              unit: "%",
              color: k >= 20 ? "DC2626" : k >= 10 ? "F59E0B" : "10B981",
              fmt: "0.0",
              note: k >= 20 ? "\u{1F534} \u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01" : k >= 10 ? "\u26A0 \u0E2A\u0E39\u0E07" : "\u2705 \u0E1B\u0E01\u0E15\u0E34"
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
              value: o,
              unit: "\u0E23\u0E32\u0E22",
              color: o > 0 ? "DC2626" : "10B981",
              fmt: "#,##0",
              note: "\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E2B\u0E31\u0E01"
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: m,
              unit: "\u0E1B\u0E35",
              color: "7C3AED",
              fmt: "#,##0",
              note: "\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"
            }],
            breakdowns: w,
            insights: S,
            references: [
              ["FRAX Risk Threshold", "Major Osteoporotic \u226520%, Hip Fracture \u22653% \u2192 \u0E40\u0E23\u0E34\u0E48\u0E21\u0E23\u0E31\u0E01\u0E29\u0E32 (Treatment Initiation)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32", "WHO FRAX\xAE Calculator (Thailand model) \xB7 \u0E43\u0E0A\u0E49\u0E43\u0E19 peri/postmenopausal women"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "FRAX",
            patientHeader: R,
            patientData: M,
            patientColWidths: [6, 12, 10, 16, 22, 6, 6, 14, 11, 9, 22, 10, 10, 8, 16, 16],
            patientIncomeCols: []
          })
        });
        return
      }
      if (n === "pt" || n === "staff-services") {
        if (!Y?.patients) return;
        const t = Y.patients,
          d = t.reduce((x, f) => x + (Number(f.income) || 0), 0),
          k = new Set(t.map(x => x.hn)).size,
          r = t.length > 0 ? Math.round(d / t.length) : 0,
          c = t.filter(x => x.visit_type === "OPD").length,
          o = t.filter(x => x.visit_type === "IPD").length,
          m = t.length > 0 ? Math.round(t.reduce((x, f) => x + (Number(f.age_y) || 0), 0) / t.length) : 0,
          h = {
            "<30": 0,
            "30-44": 0,
            "45-59": 0,
            "60+": 0
          };
        t.forEach(x => {
          const f = Number(x.age_y) || 0;
          f < 30 ? h["<30"]++ : f < 45 ? h["30-44"]++ : f < 60 ? h["45-59"]++ : h["60+"]++
        });
        const A = {};
        t.forEach(x => {
          const f = (x.icd10 || "").split(",").map(v => v.trim().toUpperCase()).filter(v => au.test(v)),
            N = (x.icd10name || "").split("|").map(v => v.trim());
          f.forEach((v, $) => {
            A[v] || (A[v] = {
              code: v,
              name: N[$] || "",
              count: 0,
              totalInc: 0
            }), A[v].count++, A[v].totalInc += x.income || 0
          })
        });
        const C = Object.values(A).sort((x, f) => f.count - x.count).slice(0, 10),
          S = {};
        t.forEach(x => {
          const f = x.pttype_name || "-";
          S[f] || (S[f] = {
            count: 0,
            income: 0
          }), S[f].count++, S[f].income += x.income || 0
        });
        const w = Object.entries(S).sort((x, f) => f[1].count - x[1].count),
          R = {};
        t.forEach(x => {
          const f = x.department || "-";
          R[f] || (R[f] = {
            count: 0,
            income: 0
          }), R[f].count++, R[f].income += x.income || 0
        });
        const M = Object.entries(R).sort((x, f) => f[1].count - x[1].count),
          b = t.filter(x => /M53|M54|M62|M79/.test(x.icd10 || "")).length,
          _ = t.filter(x => /M0[5-9]|M1[5-9]/.test(x.icd10 || "")).length,
          H = t.filter(x => /I6[0-9]|G81|G82/.test(x.icd10 || "")).length,
          p = [];
        b > t.length * .3 && p.push({
          sev: "high",
          cat: "Office Syndrome",
          msg: `Office syndrome (M53/M54/M62/M79): ${b} \u0E23\u0E32\u0E22 (${Math.round(b/t.length*100)}%)`,
          action: "\u0E08\u0E31\u0E14 ergonomic education \xB7 workplace assessment \xB7 stretching program \xB7 \u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E48\u0E07 >2 \u0E0A\u0E21.\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E19"
        }), H > 0 && p.push({
          sev: "high",
          cat: "Stroke Rehab",
          msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Stroke \u0E17\u0E35\u0E48\u0E17\u0E33 PT: ${H} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 rehab intensive`,
          action: "\u0E19\u0E31\u0E14 PT 3-5 \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 OT \u0E23\u0E48\u0E27\u0E21 \xB7 evaluate ADLs \u0E17\u0E38\u0E01 2 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 home exercise program"
        }), _ > 0 && p.push({
          sev: "med",
          cat: "Arthritis",
          msg: `Arthritis cases: ${_} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 joint protection`,
          action: "pain management \xB7 range of motion exercise \xB7 weight management \xB7 pharmacotherapy review"
        }), o > 0 && p.push({
          sev: "info",
          cat: "IPD/OPD Mix",
          msg: `IPD ${o} \xB7 OPD ${c} \u0E23\u0E32\u0E22`,
          action: o > c ? "high IPD rehab load \u2014 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 inpatient PT staff" : "OPD-dominant \u2014 focus on outpatient scheduling efficiency"
        }), p.push({
          sev: "info",
          cat: "Operational",
          msg: `\u0E23\u0E27\u0E21 ${t.length} visit \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${d.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${r.toLocaleString()} \u0E1A\u0E32\u0E17/visit`,
          action: "monitor revenue per visit \xB7 \u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E15\u0E32\u0E21\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E25\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34"
        });
        const l = [{
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
            rows: C.map(x => [{
              v: x.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: x.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: x.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: x.totalInc,
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
            rows: Object.entries(h).map(([x, f]) => [{
              v: x,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: f,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? f / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: x === "60+" ? "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \xB7 \u0E40\u0E19\u0E49\u0E19 balance + fall prevention" : x === "30-44" ? "\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \xB7 office syndrome" : "",
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
            rows: w.slice(0, 10).map(([x, f]) => [{
              v: x,
              align: "left",
              wrap: !0
            }, {
              v: f.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? f.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: f.income,
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
            rows: M.map(([x, f]) => [{
              v: x,
              align: "left",
              wrap: !0
            }, {
              v: f.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? f.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: f.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          L = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "Ward", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          i = t.map(x => [x.no, x.pt_name, x.hn, x.visit_type, x.pttype_name, x.age_y, x.cid, x.vstdate, x.department, x.ward_name, x.address, x.mobile_phone_number, x.icd10, x.icd10name, x.income, x.chief_complaint]);
        pu(() => import("./xlsx.min-CZi5yKex.js").then(x => x.x), Du([0, 1])).then(x => {
          e(x, {
            filename: `BCH360_${n==="staff-services"?"StaffServices":"PhysicalTherapy"}_${p0}_${h0}.xlsx`,
            titleEmoji: "\u{1F9B5}",
            titleText: n === "staff-services" ? "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 \u0E41\u0E25\u0E30 PMC",
            themeColor: "0EA5E9",
            themeColorLight: "0284C7",
            dateRange: {
              start: p0,
              end: h0
            },
            dataSource: "HOSxP XE \xB7 \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 + PMC + \u0E28\u0E39\u0E19\u0E22\u0E4C\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 (main_dep 034, 140, 143)",
            totalCount: t.length,
            uniqueCount: k,
            kpis: [...n === "staff-services" && Y?.staff_registry_count ? [{
              label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
              value: Y.staff_registry_count,
              unit: "\u0E23\u0E32\u0E22",
              color: "7C3AED",
              fmt: "#,##0",
              note: `\u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${k} \u0E23\u0E32\u0E22 (${Y.staff_registry_count>0?Math.round(k/Y.staff_registry_count*1e3)/10:0}%)`
            }] : [], {
              label: n === "staff-services" ? "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit \u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit PT",
              value: t.length,
              unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
              color: "0EA5E9",
              fmt: "#,##0",
              note: n === "staff-services" ? "\u0E23\u0E27\u0E21 visit \u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32" : "\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E"
            }, {
              label: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)" : "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
              value: k,
              unit: "\u0E23\u0E32\u0E22",
              color: "0284C7",
              fmt: "#,##0",
              note: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: d,
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
              unit: `OPD (IPD: ${o})`,
              color: "A855F7",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(c/t.length*100):0}% OPD`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: m,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age"
            }],
            breakdowns: l,
            insights: p,
            references: [
              ["ICD-10 Office Syndrome", "M53 (cervicalgia), M54 (back pain), M62 (muscle), M79 (soft tissue)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32", "HOSxP XE \xB7 main_dep 034 (PT) + 140 (PMC) + 143 (\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "PT Patients",
            patientHeader: L,
            patientData: i,
            patientColWidths: [6, 22, 10, 8, 22, 6, 16, 11, 16, 14, 30, 14, 14, 30, 11, 32],
            patientIncomeCols: [14]
          })
        });
        return
      }
      if (n === "fluoride") {
        if (!A0?.patients) return;
        const t = A0.patients,
          d = t.reduce((p, l) => p + (Number(l.fluoride_price) || 0), 0),
          k = t.reduce((p, l) => p + (Number(l.income) || 0), 0),
          r = new Set(t.map(p => p.hn)).size,
          c = t.length > 0 ? Math.round(k / t.length) : 0,
          o = t.length > 0 ? Math.round(t.reduce((p, l) => p + (Number(l.age_y) || 0), 0) / t.length) : 0,
          m = {
            "25-34": 0,
            "35-44": 0,
            "45-54": 0,
            "55-59": 0
          };
        t.forEach(p => {
          const l = Number(p.age_y) || 0;
          l < 35 ? m["25-34"]++ : l < 45 ? m["35-44"]++ : l < 55 ? m["45-54"]++ : m["55-59"]++
        });
        const h = {};
        t.forEach(p => {
          const l = (p.icd10 || "").split(",").map(i => i.trim().toUpperCase()).filter(i => au.test(i)),
            L = (p.icd10name || "").split("|").map(i => i.trim());
          l.forEach((i, x) => {
            h[i] || (h[i] = {
              code: i,
              name: L[x] || "",
              count: 0,
              totalInc: 0
            }), h[i].count++, h[i].totalInc += p.income || 0
          })
        });
        const A = Object.values(h).sort((p, l) => l.count - p.count).slice(0, 10),
          C = {};
        t.forEach(p => {
          const l = p.pttype_name || "-";
          C[l] || (C[l] = {
            count: 0,
            income: 0
          }), C[l].count++, C[l].income += p.income || 0
        });
        const S = Object.entries(C).sort((p, l) => l[1].count - p[1].count),
          w = t.filter(p => /K02|K03/.test(p.icd10 || "")).length,
          R = t.filter(p => /K05|K06/.test(p.icd10 || "")).length,
          M = [];
        w > 0 && M.push({
          sev: "high",
          cat: "Caries Burden",
          msg: `Dental caries (K02-K03): ${w} \u0E23\u0E32\u0E22 (${Math.round(w/t.length*100)}%)`,
          action: "Filling treatment \xB7 oral hygiene education \xB7 sugar reduction counseling \xB7 F/U 6 \u0E40\u0E14\u0E37\u0E2D\u0E19"
        }), R > 0 && M.push({
          sev: "med",
          cat: "Periodontal Disease",
          msg: `Gum disease (K05-K06): ${R} \u0E23\u0E32\u0E22`,
          action: "Scaling + root planing \xB7 oral hygiene reinforcement \xB7 F/U \u0E17\u0E38\u0E01 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19"
        }), M.push({
          sev: "info",
          cat: "Coverage",
          msg: `\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C ${t.length} \u0E23\u0E32\u0E22 \u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${d.toLocaleString()} \u0E1A\u0E32\u0E17`,
          action: "expand outreach \xB7 school/workplace dental health programs \xB7 increase coverage rate"
        }), M.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${o} \u0E1B\u0E35 \xB7 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48 ${Object.entries(m).sort((p,l)=>l[1]-p[1])[0]?.[0]} \u0E1B\u0E35`,
          action: "targeted health promotion \u0E15\u0E32\u0E21 age group \xB7 adult dental care campaign"
        }), M.push({
          sev: "good",
          cat: "Prevention",
          msg: "Fluoride varnish \u0E40\u0E1B\u0E47\u0E19 cost-effective prevention",
          action: "continue program \xB7 NNT (number needed to treat) \u0E15\u0E48\u0E33 \xB7 maintain budget"
        });
        const b = [{
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
            rows: Object.entries(m).map(([p, l]) => [{
              v: p,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: l,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? l / t.length : 0,
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
            rows: S.slice(0, 10).map(([p, l]) => [{
              v: p,
              align: "left",
              wrap: !0
            }, {
              v: l.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? l.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: l.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          _ = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E04\u0E48\u0E32\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          H = t.map(p => [p.no, p.pt_name, p.hn, p.pttype_name, p.age_y, p.cid, p.vstdate, p.department, p.address, p.mobile_phone_number, p.icd10, p.icd10name, p.fluoride_price, p.income, p.chief_complaint]);
        pu(() => import("./xlsx.min-CZi5yKex.js").then(p => p.x), Du([0, 1])).then(p => {
          e(p, {
            filename: `BCH360_Fluoride_25_59_${p0}_${h0}.xlsx`,
            titleEmoji: "\u{1F9B7}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (25-59 \u0E1B\u0E35)",
            themeColor: "06B6D4",
            themeColorLight: "0891B2",
            dateRange: {
              start: p0,
              end: h0
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
              value: d,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: k,
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
              value: o,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "\u0E2D\u0E32\u0E22\u0E38 25-59 (target group)"
            }],
            breakdowns: b,
            insights: M,
            references: [
              ["Target Age", "25-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19) \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 dental prevention"],
              ["ICD-10 Dental", "K02-K03 (caries), K05-K06 (periodontal), Z012 (dental exam)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Fluoride 25-59",
            patientHeader: _,
            patientData: H,
            patientColWidths: [6, 22, 10, 22, 6, 16, 11, 16, 30, 14, 14, 30, 12, 11, 32],
            patientIncomeCols: [12, 13]
          })
        });
        return
      }
      if (n === "elderly-cxr") {
        if (!$0?.patients) return;
        const t = $0.patients,
          d = $0.total_income || t.reduce((i, x) => i + (Number(x.income) || 0), 0),
          k = $0.total_cxr_price || t.reduce((i, x) => i + (Number(x.cxr_price) || 0), 0),
          r = new Set(t.map(i => i.hn)).size,
          c = t.length > 0 ? Math.round(d / t.length) : 0,
          o = t.filter(i => i.sex === "\u0E0A\u0E32\u0E22").length,
          m = t.filter(i => i.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
          h = t.length > 0 ? Math.round(t.reduce((i, x) => i + (Number(x.age_y) || 0), 0) / t.length) : 0,
          A = {
            "60-64": 0,
            "65-69": 0,
            "70-74": 0,
            "75-79": 0,
            "80+": 0
          };
        t.forEach(i => {
          const x = Number(i.age_y) || 0;
          x < 65 ? A["60-64"]++ : x < 70 ? A["65-69"]++ : x < 75 ? A["70-74"]++ : x < 80 ? A["75-79"]++ : A["80+"]++
        });
        const C = {};
        t.forEach(i => {
          const x = (i.icd10 || "").split(",").map(N => N.trim().toUpperCase()).filter(N => au.test(N)),
            f = (i.icd10name || "").split("|").map(N => N.trim());
          x.forEach((N, v) => {
            C[N] || (C[N] = {
              code: N,
              name: f[v] || "",
              count: 0,
              totalInc: 0
            }), C[N].count++, C[N].totalInc += i.income || 0
          })
        });
        const S = Object.values(C).sort((i, x) => x.count - i.count).slice(0, 10),
          w = {};
        t.forEach(i => {
          const x = i.pttype_name || "-";
          w[x] || (w[x] = {
            count: 0,
            income: 0
          }), w[x].count++, w[x].income += i.income || 0
        });
        const R = Object.entries(w).sort((i, x) => x[1].count - i[1].count),
          M = t.filter(i => /A1[5-9]/.test(i.icd10 || "")).length,
          b = t.filter(i => /C3[3-4]/.test(i.icd10 || "")).length,
          _ = t.filter(i => /J1[2-8]/.test(i.icd10 || "")).length,
          H = [];
        M > 0 && H.push({
          sev: "critical",
          cat: "TB Suspect",
          msg: `\u{1F9A0} TB-related ICD (A15-A19): ${M} \u0E23\u0E32\u0E22 \u2014 \u0E2A\u0E07\u0E2A\u0E31\u0E22\u0E27\u0E31\u0E13\u0E42\u0E23\u0E04`,
          action: "sputum AFB + Xpert MTB \xB7 contact tracing \xB7 isolate \u0E16\u0E49\u0E32\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 \xB7 DOT program enrollment"
        }), b > 0 && H.push({
          sev: "critical",
          cat: "Lung Cancer",
          msg: `Lung CA (C33-C34): ${b} \u0E23\u0E32\u0E22 \u2014 \u0E21\u0E30\u0E40\u0E23\u0E47\u0E07\u0E1B\u0E2D\u0E14`,
          action: "CT chest \xB7 pulmonologist referral \xB7 oncology consultation \xB7 staging workup"
        }), _ > 0 && H.push({
          sev: "high",
          cat: "Pneumonia",
          msg: `Pneumonia (J12-J18): ${_} \u0E23\u0E32\u0E22 \u2014 \u0E1B\u0E2D\u0E14\u0E1A\u0E27\u0E21`,
          action: "sputum culture \xB7 empirical antibiotic per CURB-65 \xB7 admission \u0E16\u0E49\u0E32 severe \xB7 F/U CXR 4-6 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C"
        }), H.push({
          sev: "med",
          cat: "Screening Coverage",
          msg: `\u0E23\u0E27\u0E21 ${t.length} \u0E23\u0E32\u0E22 \xB7 \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A CXR`,
          action: "expand coverage to all elderly \xB7 annual CXR screening for high-risk groups"
        }), H.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${h} \u0E1B\u0E35 \xB7 \u0E0A\u0E32\u0E22 ${o} \u0E2B\u0E0D\u0E34\u0E07 ${m}`,
          action: "monitor age-specific yield \xB7 gender comparison \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A TB/CA detection"
        }), H.push({
          sev: "info",
          cat: "Cost Analysis",
          msg: `\u0E04\u0E48\u0E32 CXR \u0E23\u0E27\u0E21 ${k.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Visit \u0E23\u0E27\u0E21 ${d.toLocaleString()} \u0E1A\u0E32\u0E17`,
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
            rows: S.map(i => [{
              v: i.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: i.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: i.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: i.totalInc,
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
            rows: Object.entries(A).map(([i, x]) => [{
              v: i,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: x,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? x / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: i === "80+" ? "high frailty risk" : "",
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
            rows: R.slice(0, 10).map(([i, x]) => [{
              v: i,
              align: "left",
              wrap: !0
            }, {
              v: x.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? x.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: x.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          l = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 CXR", "\u0E04\u0E48\u0E32 CXR", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          L = t.map(i => [i.no, i.pt_name, i.hn, i.sex, i.age_y, i.cid, i.pttype_name, i.vstdate, i.department, i.address, i.mobile_phone_number, i.cxr_name, i.cxr_price, i.icd10, i.icd10name, i.income, i.chief_complaint]);
        pu(() => import("./xlsx.min-CZi5yKex.js").then(i => i.x), Du([0, 1])).then(i => {
          e(i, {
            filename: `BCH360_Elderly_CXR_60plus_${p0}_${h0}.xlsx`,
            titleEmoji: "\u2622\uFE0F",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E17\u0E35\u0E48\u0E21\u0E35 Chest X-Ray",
            themeColor: "7C3AED",
            themeColorLight: "6D28D9",
            dateRange: {
              start: p0,
              end: h0
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
              value: k,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E04\u0E48\u0E32 X-Ray"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: d,
              unit: "\u0E1A\u0E32\u0E17",
              color: "047857",
              fmt: "#,##0.00",
              note: "\u0E23\u0E27\u0E21\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E32\u0E22",
              value: o,
              unit: "\u0E23\u0E32\u0E22",
              color: "0EA5E9",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(o/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07",
              value: m,
              unit: "\u0E23\u0E32\u0E22",
              color: "EC4899",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(m/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
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
            insights: H,
            references: [
              ["CXR ICD Codes", "14 \u0E23\u0E2B\u0E31\u0E2A (CXR AP, PA, Lordotic, Lateral, Portable, \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E)"],
              ["Target Group", "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E15\u0E32\u0E21\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E01\u0E23\u0E30\u0E17\u0E23\u0E27\u0E07\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E2A\u0E38\u0E02 (\u2260 WHO \u226565)"],
              ["Screening Focus", "TB (A15-A19), Lung CA (C33-C34), Pneumonia (J12-J18)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Elderly CXR 60+",
            patientHeader: l,
            patientData: L,
            patientColWidths: [6, 22, 10, 6, 6, 16, 22, 11, 16, 30, 14, 22, 10, 14, 30, 11, 32],
            patientIncomeCols: [12, 15]
          })
        });
        return
      }
      if (n === "imaging-services") {
        if (!a0?.patients) return;
        const t = a0.patients,
          d = a0.services || ["XRAY", "CT", "Portable", "BMD"],
          k = a0.service_labels || {},
          r = a0.service_counts || {},
          c = a0.total_income || 0,
          o = a0.total_imaging_price || 0,
          m = a0.unique_patients || new Set(t.map(f => f.hn)).size,
          h = t.length > 0 ? Math.round(c / t.length) : 0,
          A = t.length > 0 ? Math.round(o / t.length) : 0,
          C = t.filter(f => f.sex === "\u0E0A\u0E32\u0E22").length,
          S = t.filter(f => f.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
          w = t.length > 0 ? Math.round(t.reduce((f, N) => f + (Number(N.age_y) || 0), 0) / t.length) : 0,
          R = {
            "<20": 0,
            "20-39": 0,
            "40-59": 0,
            "60-79": 0,
            "80+": 0
          };
        t.forEach(f => {
          const N = Number(f.age_y) || 0;
          N < 20 ? R["<20"]++ : N < 40 ? R["20-39"]++ : N < 60 ? R["40-59"]++ : N < 80 ? R["60-79"]++ : R["80+"]++
        });
        const M = {};
        t.forEach(f => {
          (f.icd_pairs || "").split("||").filter(Boolean).forEach(N => {
            const [v, $] = N.split("::"), U = (v || "").toUpperCase();
            !U || !au.test(U) || (M[U] || (M[U] = {
              code: U,
              name: $ || "",
              count: 0,
              totalInc: 0
            }), M[U].count++, M[U].totalInc += f.income || 0)
          })
        });
        const b = Object.values(M).sort((f, N) => N.count - f.count).slice(0, 10),
          _ = {};
        t.forEach(f => {
          const N = f.pttype_name || "-";
          _[N] || (_[N] = {
            count: 0,
            income: 0
          }), _[N].count++, _[N].income += f.income || 0
        });
        const H = Object.entries(_).sort((f, N) => N[1].count - f[1].count),
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
          msg: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 imaging \u0E23\u0E27\u0E21 ${o.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${A.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22`,
          action: "analyze cost-per-procedure trend \xB7 benchmark \u0E01\u0E31\u0E1A\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07"
        });
        const l = {
            XRAY: "3B82F6",
            CT: "7C3AED",
            Portable: "F59E0B",
            BMD: "EC4899"
          },
          L = [{
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
            rows: d.map(f => [{
              v: f,
              align: "center",
              font: {
                bold: !0,
                sz: 12,
                color: {
                  rgb: l[f] || "7C3AED"
                }
              }
            }, {
              v: r[f] || 0,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? (r[f] || 0) / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: k[f] || "",
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
            rows: b.map(f => [{
              v: f.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: f.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: f.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: f.totalInc,
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
            rows: Object.entries(R).map(([f, N]) => [{
              v: f,
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
              v: f === "60-79" || f === "80+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u2014 common imaging users" : "",
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
            rows: H.slice(0, 10).map(([f, N]) => [{
              v: f,
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
          i = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 Imaging", "\u0E23\u0E2B\u0E31\u0E2A", "\u0E04\u0E48\u0E32 Imaging", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19 Visit", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          x = t.map(f => [f.no, f.pt_name, f.hn, f.sex, f.age_y, f.cid, f.pttype_name, f.vstdate, f.vsttime, f.department, f.address, f.mobile_phone_number, f.service_groups, f.service_names, f.service_codes, f.imaging_price, f.icd10, f.icd10name, f.income, f.chief_complaint]);
        pu(() => import("./xlsx.min-CZi5yKex.js").then(f => f.x), Du([0, 1])).then(f => {
          e(f, {
            filename: `BCH360_Imaging_${p0}_${h0}.xlsx`,
            titleEmoji: "\u{1FA7B}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 XRAY / CT / Portable / BMD",
            themeColor: "7C3AED",
            themeColorLight: "6D28D9",
            dateRange: {
              start: p0,
              end: h0
            },
            dataSource: a0.data_source || "HOSxP XE \xB7 opitemrece + nondrugitems",
            totalCount: t.length,
            uniqueCount: m,
            kpis: [{
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit \u0E23\u0E27\u0E21",
              value: t.length,
              unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
              color: "7C3AED",
              fmt: "#,##0",
              note: "\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E21\u0E32 imaging \u0E17\u0E38\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17"
            }, {
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
              value: m,
              unit: "\u0E23\u0E32\u0E22",
              color: "A855F7",
              fmt: "#,##0",
              note: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Imaging \u0E23\u0E27\u0E21",
              value: o,
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
              value: C,
              unit: "\u0E23\u0E32\u0E22",
              color: "0EA5E9",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(C/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07",
              value: S,
              unit: "\u0E23\u0E32\u0E22",
              color: "EC4899",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(S/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: w,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age"
            }],
            breakdowns: L,
            insights: p,
            references: [
              ["\u0E01\u0E32\u0E23\u0E08\u0E33\u0E41\u0E19\u0E01", "XRAY = X-ray \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B \xB7 CT = CT scan \xB7 Portable = X-ray \u0E40\u0E04\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E17\u0E35\u0E48 \xB7 BMD = Bone Density (DEXA)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "HOSxP XE \xB7 ovst + opitemrece + nondrugitems (filter \u0E15\u0E32\u0E21\u0E0A\u0E37\u0E48\u0E2D\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Imaging Patients",
            patientHeader: i,
            patientData: x,
            patientColWidths: [6, 22, 10, 6, 6, 16, 22, 11, 9, 16, 30, 14, 16, 30, 18, 12, 14, 30, 11, 32],
            patientIncomeCols: [15, 18]
          })
        });
        return
      }
      if (n === "opd-compare") {
        if (!D?.comparison) return;
        const t = (C, S) => C > 0 ? Math.round((S - C) / C * 100) + "%" : S > 0 ? "100%" : "0%",
          d = D.fiscal_years?.fy1?.label || "\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19",
          k = D.fiscal_years?.fy2?.label || "\u0E1B\u0E35\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19",
          r = ["visits", "patients", "revenue", "drug_cost", "lab_cost", "xray_cost", "avg_income"],
          c = ["Visit", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 X-ray", "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit"],
          o = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...c.map(C => `${C} (${d})`), ...c.map(C => `${C} (${k})`), ...c.map(C => `YoY ${C} %`)],
          m = D.comparison.map(C => [C.month, ...r.map(S => C.fy1[S]), ...r.map(S => C.fy2[S]), ...r.map(S => t(C.fy1[S], C.fy2[S]))]),
          h = D.fy1_totals,
          A = D.fy2_totals;
        m.push(["\u0E23\u0E27\u0E21", ...r.map(C => h[C]), ...r.map(C => A[C]), ...r.map(C => t(h[C], A[C]))]), pu(() => import("./xlsx-BuHXVOW6.js"), []).then(C => {
          const S = C.utils.aoa_to_sheet([o, ...m]);
          S["!cols"] = o.map((R, M) => ({
            wch: Math.min(Math.max(R.length + 2, 10), 25)
          }));
          const w = C.utils.book_new();
          C.utils.book_append_sheet(w, S, "OPD Compare"), C.writeFile(w, `BCH360_OPD_Compare_${p0}_${h0}.xlsx`)
        });
        return
      }
      if (n === "resource-opd" || n === "resource-ipd") {
        const t = n === "resource-opd" ? Q0 : K0;
        if (!t?.comparison) return;
        const d = n === "resource-opd" ? "OPD" : "IPD",
          k = n === "resource-opd" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19",
          r = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `Lab \u0E04\u0E23\u0E31\u0E49\u0E07 (${n0})`, `Lab \u0E1A\u0E32\u0E17 (${n0})`, `Drug \u0E04\u0E23\u0E31\u0E49\u0E07 (${n0})`, `Drug \u0E1A\u0E32\u0E17 (${n0})`, `Xray \u0E04\u0E23\u0E31\u0E49\u0E07 (${n0})`, `Xray \u0E1A\u0E32\u0E17 (${n0})`, `\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07 (${n0})`, `\u0E23\u0E27\u0E21\u0E1A\u0E32\u0E17 (${n0})`, `Lab \u0E04\u0E23\u0E31\u0E49\u0E07 (${u0})`, `Lab \u0E1A\u0E32\u0E17 (${u0})`, `Drug \u0E04\u0E23\u0E31\u0E49\u0E07 (${u0})`, `Drug \u0E1A\u0E32\u0E17 (${u0})`, `Xray \u0E04\u0E23\u0E31\u0E49\u0E07 (${u0})`, `Xray \u0E1A\u0E32\u0E17 (${u0})`, `\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07 (${u0})`, `\u0E23\u0E27\u0E21\u0E1A\u0E32\u0E17 (${u0})`, "\u0E08\u0E33\u0E19\u0E27\u0E19 %", "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 %"],
          c = (R, M) => M > 0 ? Math.round((R - M) / M * 100) : R > 0 ? 100 : 0,
          o = t.comparison.filter(R => R.fy1?.has_data || R.fy2?.has_data).map(R => {
            const M = R.fy1,
              b = R.fy2,
              _ = M.lab_orders + M.drug_orders + M.xray_orders,
              H = M.lab_price + M.drug_price + M.xray_price,
              p = b.lab_orders + b.drug_orders + b.xray_orders,
              l = b.lab_price + b.drug_price + b.xray_price,
              L = M.has_data && b.has_data ? c(p, _) : "",
              i = M.has_data && b.has_data ? c(l, H) : "";
            return [R.month, M.lab_orders || "", M.lab_price || "", M.drug_orders || "", M.drug_price || "", M.xray_orders || "", M.xray_price || "", M.has_data ? _ : "", M.has_data ? H : "", b.lab_orders || "", b.lab_price || "", b.drug_orders || "", b.drug_price || "", b.xray_orders || "", b.xray_price || "", b.has_data ? p : "", b.has_data ? l : "", L !== "" ? `${L}%` : "", i !== "" ? `${i}%` : ""]
          }),
          m = t.fy1_totals,
          h = t.fy2_totals,
          A = m.lab_orders + m.drug_orders + m.xray_orders,
          C = m.lab_price + m.drug_price + m.xray_price,
          S = h.lab_orders + h.drug_orders + h.xray_orders,
          w = h.lab_price + h.drug_price + h.xray_price;
        o.push(["\u0E23\u0E27\u0E21", m.lab_orders, m.lab_price, m.drug_orders, m.drug_price, m.xray_orders, m.xray_price, A, C, h.lab_orders, h.lab_price, h.drug_orders, h.drug_price, h.xray_orders, h.xray_price, S, w, `${t.overall_orders_growth_pct}%`, `${t.overall_price_growth_pct}%`]), pu(() => import("./xlsx-BuHXVOW6.js"), []).then(R => {
          const M = [r, ...o],
            b = R.utils.aoa_to_sheet(M);
          b["!cols"] = r.map((H, p) => {
            const l = Math.max(H.length, ...o.map(L => String(L[p] ?? "").length));
            return {
              wch: Math.min(Math.max(l + 2, 8), 28)
            }
          });
          const _ = R.utils.book_new();
          R.utils.book_append_sheet(_, b, `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${k}`), R.writeFile(_, `BCH360_Resource_${d}_Monthly_${n0}_${u0}.xlsx`)
        });
        return
      }
      if (n === "ncd-disease") {
        if (!J) return;
        const {
          pts: t,
          totalIncome: d,
          uniquePatients: k,
          avgIncome: r,
          maleCount: c,
          femaleCount: o,
          ageGroups: m,
          topIcd: h,
          rightList: A,
          ckdCount: C,
          ckdWithEgfrCount: S,
          avgEgfr: w,
          advancedCkd: R
        } = J, M = f0.diseases || ["DM", "HT", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD"], b = f0.disease_labels || {}, _ = J.diseaseCountsFE || f0.disease_counts || {}, H = {
          length: S
        }, p = h.slice(0, 10), l = [], L = Math.max(1, Math.ceil((new Date(h0) - new Date(p0)) / 864e5) + 1), i = t.length / L, x = Math.round(i * 250);
        if (R > 0) {
          const y = Math.round(R / Math.max(C, 1) * 100);
          l.push({
            sev: "critical",
            cat: "CKD \u0E23\u0E30\u0E22\u0E30\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07",
            msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD Stage 4-5 \u0E08\u0E33\u0E19\u0E27\u0E19 ${R} \u0E23\u0E32\u0E22 (${y}% \u0E02\u0E2D\u0E07 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14)`,
            action: "\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D Nephrologist \u0E20\u0E32\u0E22\u0E43\u0E19 1 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Renal Replacement Therapy (HD/PD/KT) \xB7 \u0E09\u0E35\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19 HBV/Pneumococcal \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 dietitian (low protein diet)"
          })
        }
        const f = t.filter(y => y.egfr != null && y.egfr < 30).length;
        if (f > 0) {
          const y = Math.round(f / t.length * 100);
          l.push({
            sev: "critical",
            cat: "Renal Function",
            msg: `eGFR <30 ml/min/1.73m\xB2 (Severe CKD): ${f} \u0E23\u0E32\u0E22 (${y}%)`,
            action: "\u0E2B\u0E25\u0E35\u0E01\u0E40\u0E25\u0E35\u0E48\u0E22\u0E07 nephrotoxic drugs (NSAIDs, contrast, aminoglycosides) \xB7 \u0E1B\u0E23\u0E31\u0E1A dose \u0E22\u0E32\u0E15\u0E32\u0E21 eGFR \xB7 \u0E40\u0E23\u0E34\u0E48\u0E21 Renal team referral \xB7 counsel vascular access"
          })
        }
        const N = t.filter(y => /DM/.test(y.disease_groups) && /HT/.test(y.disease_groups) && /CKD/.test(y.disease_groups)).length;
        if (N > 0) {
          const y = Math.round(N / t.length * 100);
          l.push({
            sev: "high",
            cat: "Triple Comorbidity",
            msg: `DM + HT + CKD \u0E23\u0E48\u0E27\u0E21 ${N} \u0E23\u0E32\u0E22 (${y}%) \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 CV event \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14`,
            action: "First-line: ACEi/ARB + SGLT2i \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HbA1c <7%, BP <130/80, LDL <70 \xB7 \u0E15\u0E23\u0E27\u0E08 UACR \u0E17\u0E38\u0E01 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E07\u0E14 NSAIDs"
          })
        }
        const v = t.filter(y => /Stroke/.test(y.disease_groups) && /HT/.test(y.disease_groups)).length;
        v > 0 && l.push({
          sev: "high",
          cat: "Secondary Prevention",
          msg: `Stroke + HT ${v} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 recurrence stroke 7-10% \u0E15\u0E48\u0E2D\u0E1B\u0E35\u0E2B\u0E32\u0E01\u0E44\u0E21\u0E48\u0E04\u0E38\u0E21 BP`,
          action: "BP target <130/80 mmHg \xB7 Antiplatelet (ASA \u0E2B\u0E23\u0E37\u0E2D Clopidogrel) \xB7 Statin (LDL <70) \xB7 \u0E07\u0E14\u0E2A\u0E39\u0E1A\u0E1A\u0E38\u0E2B\u0E23\u0E35\u0E48 \xB7 physiotherapy/rehab"
        }), _.IHD > 0 && l.push({
          sev: "high",
          cat: "IHD Management",
          msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IHD ${_.IHD} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 secondary prevention \u0E40\u0E15\u0E47\u0E21\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A`,
          action: "ASA + Statin lifelong \xB7 \u03B2-blocker \u0E2B\u0E23\u0E37\u0E2D ACEi/ARB \xB7 cardiac rehab \xB7 annual ECG/Echo"
        });
        const $ = t.filter(y => Number(y.age_y) >= 60).length,
          U = t.filter(y => {
            const O = (y.disease_groups || "").split(",").filter(Boolean);
            return Number(y.age_y) >= 65 && O.length >= 3
          }).length;
        if (U > 0) {
          const y = Math.round(U / t.length * 100);
          l.push({
            sev: "med",
            cat: "Polypharmacy / Geriatric",
            msg: `\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u226565 \u0E1B\u0E35 + NCD \u22653 \u0E42\u0E23\u0E04: ${U} \u0E23\u0E32\u0E22 (${y}%) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 drug interaction & falls`,
            action: "\u0E17\u0E33 medication review (Beers criteria) \xB7 \u0E25\u0E14 anticholinergic burden \xB7 screening fall risk + osteoporosis \xB7 \u0E15\u0E23\u0E27\u0E08 kidney function \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19"
          })
        }
        if ($ > 0) {
          const y = Math.round($ / t.length * 100);
          l.push({
            sev: "info",
            cat: "Demographic",
            msg: `\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u226560 \u0E1B\u0E35: ${$} visit (${y}%) \u0E02\u0E2D\u0E07 NCD clinic`,
            action: "\u0E08\u0E31\u0E14 geriatric assessment \xB7 counseling cognitive decline screening \xB7 home visit \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E15\u0E34\u0E14\u0E1A\u0E49\u0E32\u0E19"
          })
        }
        const B = t.filter(y => /CKD/.test(y.disease_groups || "") && y.creatinine == null).length;
        if (B > 0) {
          const y = Math.round(B / Math.max(C, 1) * 100);
          l.push({
            sev: "med",
            cat: "Lab Monitoring Gap",
            msg: `CKD \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35 Cr \u0E43\u0E19 365 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14: ${B} \u0E23\u0E32\u0E22 (${y}% \u0E02\u0E2D\u0E07 CKD)`,
            action: "\u0E19\u0E31\u0E14 Cr/eGFR + UACR \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19 \xB7 \u0E15\u0E31\u0E49\u0E07 auto-reminder \u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A HOSxP \xB7 staging redo"
          })
        }
        const F = t.filter(y => {
          const O = (y.chief_complaint || "").toLowerCase();
          return /uncontrol|severe|crisis|admit|emergen|พบแพทย์|ฉุกเฉิน/.test(O)
        }).length;
        F > 0 && l.push({
          sev: "high",
          cat: "Disease Control",
          msg: `\u0E1E\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E04\u0E38\u0E21\u0E42\u0E23\u0E04\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E43\u0E19 CC: ${F} \u0E23\u0E32\u0E22`,
          action: "review medication adherence \xB7 titrate dose \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 intensive case management \xB7 admit \u0E2B\u0E32\u0E01\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19"
        });
        const j = t.filter(y => r > 0 && (y.income || 0) > r * 2.5).length;
        if (j > 0) {
          const y = Math.round(j / t.length * 100),
            O = t.filter(i0 => (i0.income || 0) > r * 2.5).reduce((i0, z0) => i0 + (z0.income || 0), 0);
          l.push({
            sev: "info",
            cat: "Cost Outlier",
            msg: `High-cost outliers (>2.5\xD7 avg): ${j} \u0E23\u0E32\u0E22 (${y}%) \u2014 \u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${O.toLocaleString()} \u0E1A\u0E32\u0E17`,
            action: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C resource drivers (lab/drug/imaging) \xB7 case management \xB7 \u0E43\u0E0A\u0E49 generic drugs \xB7 pharmacy intervention"
          })
        }
        const I = t.filter(y => /UC|บัตรทอง/i.test(y.pttype_name || "")).length;
        if (I > 0) {
          const y = Math.round(I / t.length * 100);
          l.push({
            sev: y > 80 ? "med" : "info",
            cat: "Payer Mix",
            msg: `UC/\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07: ${y}% (${I}/${t.length}) \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${r.toLocaleString()} \u0E1A\u0E32\u0E17/visit`,
            action: y > 80 ? "Cap budget pressure \u0E2A\u0E39\u0E07 \u2014 \u0E40\u0E19\u0E49\u0E19 disease management \u0E25\u0E14 admission \xB7 negotiate \u0E01\u0E31\u0E1A \u0E2A\u0E1B\u0E2A\u0E0A. \xB7 monitor budget impact \u0E02\u0E2D\u0E07 SGLT2i/GLP-1" : "\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2A\u0E21\u0E14\u0E38\u0E25 payer mix \xB7 monitor private/social-security trend"
          })
        }
        const P = {};
        t.forEach(y => {
          const O = (y.address || "").match(/ต\.([\u0E00-\u0E7F]+)/),
            i0 = O ? O[1] : "\u0E2D\u0E37\u0E48\u0E19\u0E46";
          P[i0] = (P[i0] || 0) + 1
        });
        const q = Object.entries(P).sort((y, O) => O[1] - y[1])[0];
        if (q && q[1] > t.length * .25) {
          const y = Math.round(q[1] / t.length * 100);
          l.push({
            sev: "info",
            cat: "Geographic Hotspot",
            msg: `\u0E15\u0E33\u0E1A\u0E25 ${q[0]} \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07: ${q[1]} \u0E23\u0E32\u0E22 (${y}%)`,
            action: "\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 community health worker / outreach NCD clinic \xB7 screening campaign \xB7 health literacy training \u0E43\u0E19\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48"
          })
        }
        const E0 = t.filter(y => /J45|J46/.test(y.icd10 || "")).length;
        if (E0 > 0) {
          const y = (_.COPD || 0) - E0;
          l.push({
            sev: "info",
            cat: "Classification Note",
            msg: `\u0E01\u0E25\u0E38\u0E48\u0E21 "COPD" \u0E21\u0E35 Asthma (J45-46) \u0E1B\u0E19\u0E2D\u0E22\u0E39\u0E48 ${E0} \u0E23\u0E32\u0E22 \u2014 COPD \u0E41\u0E17\u0E49: ${y} \u0E23\u0E32\u0E22`,
            action: "\u0E41\u0E22\u0E01 Asthma vs COPD \u0E43\u0E19 reporting \u0E40\u0E1E\u0E37\u0E48\u0E2D accuracy \u0E02\u0E2D\u0E07 NCD program \xB7 \u0E43\u0E0A\u0E49 inhaler protocol \u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19"
          })
        }
        l.push({
          sev: "info",
          cat: "Operational Forecast",
          msg: `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${i.toFixed(1)} visit/\u0E27\u0E31\u0E19 (${t.length} visit \u0E43\u0E19 ${L} \u0E27\u0E31\u0E19) \xB7 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E1B\u0E35 ~${x.toLocaleString()} visit`,
          action: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 manpower \xB7 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 drug stock \xB7 \u0E02\u0E22\u0E32\u0E22 slot \u0E0A\u0E48\u0E27\u0E07 peak (\u0E15.\u0E04.-\u0E01.\u0E1E.) \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 NCD clinic \u0E40\u0E1B\u0E34\u0E14\u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E1A\u0E48\u0E32\u0E22"
        });
        const e0 = t.filter(y => y.ckd_stage === "CKD3").length,
          v0 = t.filter(y => y.ckd_stage === "CKD4").length,
          T0 = t.filter(y => y.ckd_stage === "CKD5").length;
        if (e0 + v0 + T0 > 0) {
          const y = Math.round(e0 * .05),
            O = Math.round(v0 * .07),
            i0 = (T0 + O) * 936e3;
          l.push({
            sev: O > 0 ? "med" : "info",
            cat: "Projection \xB7 12 months",
            msg: `\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C: CKD3\u21924 ~${y} \u0E23\u0E32\u0E22 \xB7 CKD4\u2192ESRD ~${O} \u0E23\u0E32\u0E22 \xB7 ESRD \u0E23\u0E27\u0E21 ${T0+O} \u0E23\u0E32\u0E22 \u2192 HD cost ~${i0.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E1B\u0E35`,
            action: `\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 HD slot (~${T0+O} \u0E23\u0E32\u0E22) \xB7 vascular access creation \u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 counseling KT/PD options \xB7 negotiate \u0E01\u0E31\u0E1A \u0E2A\u0E1B\u0E2A\u0E0A. CAPD bag stock`
          })
        }
        const q0 = t.filter(y => {
          const O = y.disease_groups || "";
          return (Number(y.age_y) || 0) >= 60 && /HT/.test(O) && (/DM/.test(O) || /CKD/.test(O))
        }).length;
        if (q0 > 0) {
          const y = Math.round(q0 / t.length * 100);
          l.push({
            sev: "high",
            cat: "CV Risk Stratification",
            msg: `High CV risk (\u0E2D\u0E32\u0E22\u0E38\u226560 + HT + DM/CKD): ${q0} \u0E23\u0E32\u0E22 (${y}%)`,
            action: "Statin (LDL <70 mg/dL) \xB7 BP <130/80 \xB7 ASA primary prevention \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E15\u0E32\u0E21\u0E40\u0E04\u0E2A \xB7 ECG annually \xB7 counsel lifestyle"
          })
        }
        const cu = (() => {
          const y = t.length > 0 ? t.filter(i0 => i0.creatinine != null).length / t.length : 0,
            O = C > 0 ? 1 - R / C : 1;
          return Math.round(y * 50 + O * 50)
        })();
        l.push({
          sev: cu >= 80 ? "good" : cu >= 60 ? "med" : "high",
          cat: "NCD Quality Score",
          msg: `NCD Quality Composite: ${cu}/100 (Lab monitoring + Severity mix)`,
          action: cu < 60 ? "\u0E40\u0E1E\u0E34\u0E48\u0E21 annual lab screening \xB7 \u0E15\u0E31\u0E49\u0E07 quality improvement project \xB7 M&M conference \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A stage progression cases" : cu < 80 ? "\u0E02\u0E22\u0E32\u0E22 screening coverage \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 case \u0E21\u0E35 CKD progression \xB7 maintain monitoring frequency" : "maintain current standard \xB7 \u0E40\u0E1C\u0E22\u0E41\u0E1E\u0E23\u0E48 best practice \u0E20\u0E32\u0E22\u0E43\u0E19\u0E41\u0E25\u0E30\u0E20\u0E32\u0E22\u0E19\u0E2D\u0E01"
        }), l.length === 0 && l.push({
          sev: "good",
          cat: "Overall",
          msg: "\u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D",
          action: "\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E21\u0E41\u0E1C\u0E19\u0E1B\u0E01\u0E15\u0E34 \xB7 maintain current protocols \xB7 routine quality monitoring"
        });
        const g = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 NCD", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D ICD-10", "Cr (mg/dL)", "eGFR", "CKD Stage", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          z = t.map(y => [y.no, y.pt_name, y.hn, y.sex, y.age_y ?? "", y.cid, y.pttype_name, y.vstdate, y.vsttime, y.department, y.address, y.mobile_phone_number, y.disease_groups, y.icd10, y.icd10name, y.creatinine ?? "", y.egfr ?? "", y.ckd_stage ?? "", y.income, y.chief_complaint]);
        pu(() => import("./xlsx.min-CZi5yKex.js").then(y => y.x), Du([0, 1])).then(y => {
          const O = y.utils.book_new(),
            i0 = "Sarabun",
            z0 = 8,
            T = {
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
            Su = {
              style: "thin",
              color: {
                rgb: "E2E8F0"
              }
            },
            hu = {
              style: "medium",
              color: {
                rgb: "CBD5E1"
              }
            },
            R0 = {
              top: Su,
              bottom: Su,
              left: Su,
              right: Su
            },
            tu = {},
            Iu = [],
            w0 = [],
            X = (V, s0, D0, B0) => {
              const P0 = typeof D0 == "number" ? "n" : "s";
              tu[y.utils.encode_cell({
                r: V,
                c: s0
              })] = B0 ? {
                v: D0,
                t: P0,
                s: B0
              } : {
                v: D0,
                t: P0
              }
            },
            o0 = (V, s0, D0, B0) => Iu.push({
              s: {
                r: V,
                c: s0
              },
              e: {
                r: D0,
                c: B0
              }
            }),
            xu = (V = 12) => {
              w0[s] = {
                hpx: V
              }, s++
            },
            dE = {
              font: {
                name: i0,
                sz: 22,
                bold: !0,
                color: {
                  rgb: T.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: T.purpleDark
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: {
                top: hu,
                bottom: hu,
                left: hu,
                right: hu
              }
            },
            cE = {
              font: {
                name: i0,
                sz: 11,
                color: {
                  rgb: T.white
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
            pE = {
              font: {
                name: i0,
                sz: 9,
                color: {
                  rgb: T.muted
                },
                italic: !0
              },
              alignment: {
                horizontal: "right",
                vertical: "center",
                indent: 1
              }
            },
            gu = V => ({
              font: {
                name: i0,
                sz: 14,
                bold: !0,
                color: {
                  rgb: T.white
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
                bottom: hu
              }
            }),
            qu = {
              font: {
                name: i0,
                sz: 11,
                bold: !0,
                color: {
                  rgb: T.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: T.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                indent: 2
              },
              border: R0
            },
            Ju = (V, s0) => ({
              font: {
                name: i0,
                sz: 18,
                bold: !0,
                color: {
                  rgb: V || T.text
                }
              },
              alignment: {
                horizontal: "right",
                vertical: "center",
                indent: 1
              },
              border: R0,
              numFmt: s0 || "#,##0"
            }),
            Qu = {
              font: {
                name: i0,
                sz: 10,
                color: {
                  rgb: T.muted
                },
                bold: !0
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                indent: 1
              },
              border: R0,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: T.slateSoft
                }
              }
            },
            Zu = {
              font: {
                name: i0,
                sz: 10,
                color: {
                  rgb: T.muted
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: R0,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: T.slateSoft
                }
              }
            },
            I0 = V => ({
              font: {
                name: i0,
                sz: 11,
                bold: !0,
                color: {
                  rgb: T.white
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
              border: R0
            }),
            O0 = (V = {}) => ({
              font: {
                name: i0,
                sz: 10,
                color: {
                  rgb: T.text
                },
                ...V.font || {}
              },
              alignment: {
                horizontal: V.align || "left",
                vertical: "center",
                wrapText: !!V.wrap,
                indent: V.align === "left" ? 1 : 0
              },
              border: R0,
              fill: V.bg ? {
                patternType: "solid",
                fgColor: {
                  rgb: V.bg
                }
              } : void 0,
              numFmt: V.numFmt
            });
          let s = 0;
          X(s, 0, "\u{1FAC0}  \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04", dE), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 56
          }, s++, X(s, 0, `\u{1F4C5}  \u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25:  ${f0.date_range.start}  \u2192  ${f0.date_range.end}    \xB7    \u{1F465}  ${t.length.toLocaleString()} visit  /  ${k.toLocaleString()} \u0E23\u0E32\u0E22`, cE), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 28
          }, s++, X(s, 0, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D:  ${new Date().toLocaleString("th-TH")}    \xB7    ${f0.data_source||""}`, pE), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 18
          }, s++, xu(8), X(s, 0, "\u{1F4CA}  KPI \u0E2A\u0E23\u0E38\u0E1B", gu(T.purpleDark)), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 32
          }, s++;
          const hE = [
            ["\u0E08\u0E33\u0E19\u0E27\u0E19 Visit NCD", t.length, "\u0E04\u0E23\u0E31\u0E49\u0E07", T.purpleDark, "#,##0", "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E01\u0E32\u0E23\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E23\u0E27\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"],
            ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)", k, "\u0E23\u0E32\u0E22", T.purple, "#,##0", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25 \u0E19\u0E31\u0E1A 1 HN \u0E15\u0E48\u0E2D 1 \u0E04\u0E23\u0E31\u0E49\u0E07"],
            ["\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)", d, "\u0E1A\u0E32\u0E17", T.green, "#,##0.00", "\u0E22\u0E2D\u0E14 income \u0E08\u0E32\u0E01 vn_stat \u0E23\u0E27\u0E21\u0E17\u0E38\u0E01 visit"],
            ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit", r, "\u0E1A\u0E32\u0E17", T.blue, "#,##0.00", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 \u0E08\u0E33\u0E19\u0E27\u0E19 Visit"],
            ["\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E32\u0E22", c, "\u0E23\u0E32\u0E22", "0EA5E9", "#,##0", `${t.length>0?Math.round(c/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`],
            ["\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07", o, "\u0E23\u0E32\u0E22", "EC4899", "#,##0", `${t.length>0?Math.round(o/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`]
          ];
          for (const [V, s0, D0, B0, P0, nu] of hE) X(s, 0, V, qu), o0(s, 0, s, 1), X(s, 2, s0, Ju(B0, P0)), o0(s, 2, s, 4), X(s, 5, D0, Qu), X(s, 6, nu, Zu), o0(s, 6, s, 7), w0[s] = {
            hpx: 32
          }, s++;
          xu(12), X(s, 0, "\u{1FA7A}  \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 NCD", gu(T.blue)), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 32
          }, s++, X(s, 0, "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04", I0(T.blue)), X(s, 1, "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit", I0(T.blue)), o0(s, 1, s, 2), X(s, 3, "%", I0(T.blue)), o0(s, 3, s, 4), X(s, 5, "\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22 / ICD-10 Range", I0(T.blue)), o0(s, 5, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          let uE = 0;
          for (const V of M) {
            const s0 = _[V] || 0,
              D0 = t.length > 0 ? s0 / t.length : 0,
              B0 = s0 > t.length * .3,
              P0 = uE % 2 === 1 ? T.stripe : void 0;
            X(s, 0, V, O0({
              font: {
                bold: !0,
                sz: 12,
                color: {
                  rgb: B0 ? T.purpleDark : T.text
                }
              },
              align: "center",
              bg: P0
            })), X(s, 1, s0, O0({
              align: "right",
              numFmt: "#,##0",
              font: {
                sz: 11,
                bold: !0
              },
              bg: P0
            })), o0(s, 1, s, 2), X(s, 3, D0, O0({
              align: "right",
              numFmt: "0.0%",
              font: {
                color: {
                  rgb: B0 ? T.green : T.slate
                },
                bold: B0,
                sz: 11
              },
              bg: P0
            })), o0(s, 3, s, 4), X(s, 5, b[V] || "", O0({
              align: "left",
              bg: P0
            })), o0(s, 5, s, 7), w0[s] = {
              hpx: 24
            }, s++, uE++
          }
          xu(12), X(s, 0, "\u{1FAD8}  \u0E2A\u0E23\u0E38\u0E1B CKD (eGFR-based \xB7 CKD-EPI 2009)", gu(T.green)), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 32
          }, s++;
          const xE = [
            ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", C, "\u0E23\u0E32\u0E22", T.green, "#,##0", "\u0E23\u0E27\u0E21 Stage 1-5 + \u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38 stage"],
            ["CKD \u0E17\u0E35\u0E48\u0E21\u0E35\u0E15\u0E23\u0E27\u0E08 Cr / eGFR", H.length, "\u0E23\u0E32\u0E22", T.green, "#,##0", `${C>0?Math.round(H.length/C*100):0}% \u0E02\u0E2D\u0E07 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`],
            ["eGFR \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", w ?? 0, "ml/min/1.73m\xB2", w != null && w < 60 ? T.amber : T.green, "#,##0", w != null && w < 60 ? "\u26A0 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34 (\u226560)" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"],
            ["CKD Stage 4-5 (severe)", R, "\u0E23\u0E32\u0E22", R > 0 ? T.red : T.green, "#,##0", R > 0 ? "\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Renal Replacement Therapy" : "\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E04\u0E2A severe"]
          ];
          for (const [V, s0, D0, B0, P0, nu] of xE) X(s, 0, V, qu), o0(s, 0, s, 1), X(s, 2, s0, Ju(B0, P0)), o0(s, 2, s, 4), X(s, 5, D0, Qu), X(s, 6, nu, Zu), o0(s, 6, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          xu(12), X(s, 0, "\u{1F465}  \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38", gu(T.amber)), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 32
          }, s++, X(s, 0, "\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", I0(T.amber)), X(s, 1, "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit", I0(T.amber)), o0(s, 1, s, 3), X(s, 4, "%", I0(T.amber)), o0(s, 4, s, 5), X(s, 6, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38", I0(T.amber)), o0(s, 6, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          let EE = 0;
          for (const [V, s0] of Object.entries(m)) {
            const D0 = EE % 2 === 1 ? T.stripe : void 0,
              B0 = V === "70+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \xB7 monitor frailty" : V === "60-69" ? "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E15\u0E2D\u0E19\u0E15\u0E49\u0E19" : V === "<40" ? "NCD \u0E43\u0E19\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19" : "";
            X(s, 0, V, O0({
              align: "center",
              font: {
                bold: !0,
                sz: 12
              },
              bg: D0
            })), X(s, 1, s0, O0({
              align: "right",
              numFmt: "#,##0",
              font: {
                sz: 11,
                bold: !0
              },
              bg: D0
            })), o0(s, 1, s, 3), X(s, 4, t.length > 0 ? s0 / t.length : 0, O0({
              align: "right",
              numFmt: "0.0%",
              font: {
                sz: 11
              },
              bg: D0
            })), o0(s, 4, s, 5), X(s, 6, B0, O0({
              align: "left",
              font: {
                sz: 9,
                color: {
                  rgb: T.muted
                }
              },
              bg: D0
            })), o0(s, 6, s, 7), w0[s] = {
              hpx: 24
            }, s++, EE++
          }
          xu(12), X(s, 0, "\u{1F3C6}  Top 10 ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22", gu(T.purple)), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 32
          }, s++, X(s, 0, "ICD-10", I0(T.purple)), X(s, 1, "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", I0(T.purple)), o0(s, 1, s, 5), X(s, 6, "\u0E08\u0E33\u0E19\u0E27\u0E19", I0(T.purple)), X(s, 7, "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)", I0(T.purple)), w0[s] = {
            hpx: 30
          }, s++;
          let eE = 0;
          for (const V of p) {
            const s0 = eE % 2 === 1 ? T.stripe : void 0;
            X(s, 0, V.code, O0({
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: T.purpleDark
                }
              },
              bg: s0
            })), X(s, 1, V.name || "\u2014", O0({
              align: "left",
              wrap: !0,
              bg: s0
            })), o0(s, 1, s, 5), X(s, 6, V.count, O0({
              align: "right",
              numFmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              },
              bg: s0
            })), X(s, 7, V.totalInc, O0({
              align: "right",
              numFmt: "#,##0.00",
              font: {
                color: {
                  rgb: T.green
                }
              },
              bg: s0
            })), w0[s] = {
              hpx: 26
            }, s++, eE++
          }
          xu(12), X(s, 0, "\u{1F4B3}  \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 (Top 10)", gu(T.slate)), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 32
          }, s++, X(s, 0, "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32", I0(T.slate)), o0(s, 0, s, 4), X(s, 5, "\u0E08\u0E33\u0E19\u0E27\u0E19", I0(T.slate)), X(s, 6, "%", I0(T.slate)), X(s, 7, "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)", I0(T.slate)), w0[s] = {
            hpx: 30
          }, s++;
          let tE = 0;
          for (const [V, s0] of A.slice(0, 10)) {
            const D0 = tE % 2 === 1 ? T.stripe : void 0;
            X(s, 0, V, O0({
              align: "left",
              wrap: !0,
              font: {
                sz: 10
              },
              bg: D0
            })), o0(s, 0, s, 4), X(s, 5, s0.count, O0({
              align: "right",
              numFmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              },
              bg: D0
            })), X(s, 6, t.length > 0 ? s0.count / t.length : 0, O0({
              align: "right",
              numFmt: "0.0%",
              font: {
                sz: 11
              },
              bg: D0
            })), X(s, 7, s0.income, O0({
              align: "right",
              numFmt: "#,##0.00",
              font: {
                color: {
                  rgb: T.green
                }
              },
              bg: D0
            })), w0[s] = {
              hpx: 26
            }, s++, tE++
          }
          xu(12), X(s, 0, "\u{1F916}  AI Insights & \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23", gu(T.red)), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 32
          }, s++, X(s, 0, "\u0E23\u0E30\u0E14\u0E31\u0E1A", I0(T.red)), X(s, 1, "\u0E2B\u0E21\u0E27\u0E14", I0(T.red)), o0(s, 1, s, 2), X(s, 3, "\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E1A", I0(T.red)), o0(s, 3, s, 4), X(s, 5, "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 / Action", I0(T.red)), o0(s, 5, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          const rE = {
              critical: 0,
              high: 1,
              med: 2,
              info: 3,
              good: 4,
              low: 3
            },
            gE = [...l].sort((V, s0) => (rE[V.sev] ?? 9) - (rE[s0.sev] ?? 9)),
            oE = {
              critical: {
                label: "\u{1F534} CRITICAL",
                bg: T.redLight,
                fg: T.red
              },
              high: {
                label: "\u{1F7E0} HIGH",
                bg: "FED7AA",
                fg: "C2410C"
              },
              med: {
                label: "\u{1F7E1} MEDIUM",
                bg: T.amberLight,
                fg: T.amberDark
              },
              info: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: T.blue
              },
              good: {
                label: "\u{1F7E2} GOOD",
                bg: T.greenLight,
                fg: T.greenDark
              },
              low: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: T.blue
              }
            };
          for (const V of gE) {
            const s0 = oE[V.sev] || oE.info;
            X(s, 0, s0.label, {
              font: {
                name: i0,
                sz: 10,
                bold: !0,
                color: {
                  rgb: s0.fg
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: s0.bg
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: R0
            }), X(s, 1, V.cat, {
              font: {
                name: i0,
                sz: 10,
                bold: !0,
                color: {
                  rgb: T.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: T.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: R0
            }), o0(s, 1, s, 2), X(s, 3, V.msg, {
              font: {
                name: i0,
                sz: 10,
                bold: V.sev === "critical" || V.sev === "high",
                color: {
                  rgb: T.text
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: R0,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: s0.bg
                }
              }
            }), o0(s, 3, s, 4), X(s, 5, V.action, {
              font: {
                name: i0,
                sz: 10,
                color: {
                  rgb: T.slateDark
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: R0,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: T.slateSoft
                }
              }
            }), o0(s, 5, s, 7);
            const D0 = (V.action || "").length,
              B0 = (V.msg || "").length,
              P0 = Math.max(Math.ceil(D0 / 80), Math.ceil(B0 / 40), 2);
            w0[s] = {
              hpx: Math.min(120, 22 + P0 * 16)
            }, s++
          }
          xu(12), X(s, 0, "\u{1F4DA}  \u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E25\u0E38\u0E48\u0E21", gu(T.muted)), o0(s, 0, s, z0 - 1), w0[s] = {
            hpx: 30
          }, s++;
          const mE = [
            ["CKD-EPI 2009", "eGFR \u226590 \u2192 Stage 1  \xB7  60-89 \u2192 Stage 2  \xB7  30-59 \u2192 Stage 3  \xB7  15-29 \u2192 Stage 4  \xB7  <15 \u2192 Stage 5"],
            ["ICD-10 NCD (Specific)", "DM: E11 (Type 2)  \xB7  HT: I10 (Essential)  \xB7  DLP: E78  \xB7  IHD: I25 (Chronic)  \xB7  Stroke: I69 (Sequelae)  \xB7  COPD: J44  \xB7  CKD: N18.x"],
            ["\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "HOSxP XE \xB7 ovst + ovstdiag (main_dep=024) \xB7 \u0E01\u0E23\u0E2D\u0E07\u0E14\u0E49\u0E27\u0E22 NCD ICD-10 codes \xB7 CKD stage \u0E08\u0E32\u0E01 eGFR \u0E2B\u0E23\u0E37\u0E2D N18.x suffix"],
            ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
          ];
          for (const [V, s0] of mE) {
            const D0 = V === "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22",
              B0 = D0 ? T.greenDark : T.slateDark,
              P0 = D0 ? T.greenDark : T.muted,
              nu = D0 ? T.greenLight : T.slateSoft;
            X(s, 0, V, O0({
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: B0
                }
              },
              align: "left",
              bg: nu
            })), o0(s, 0, s, 1), X(s, 2, s0, O0({
              font: {
                sz: D0 ? 11 : 9,
                bold: D0,
                color: {
                  rgb: P0
                }
              },
              align: "left",
              wrap: !0,
              bg: nu
            })), o0(s, 2, s, 7), w0[s] = {
              hpx: 36
            }, s++
          }
          tu["!ref"] = y.utils.encode_range({
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: s - 1,
              c: z0 - 1
            }
          }), tu["!merges"] = Iu, tu["!cols"] = [{
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
          }], tu["!rows"] = w0, tu["!freeze"] = {
            xSplit: 0,
            ySplit: 3
          }, y.utils.book_append_sheet(O, tu, "Overview");
          const vu = {};
          g.forEach((V, s0) => {
            vu[y.utils.encode_cell({
              r: 0,
              c: s0
            })] = {
              v: V,
              t: "s",
              s: {
                font: {
                  name: i0,
                  sz: 10,
                  bold: !0,
                  color: {
                    rgb: T.white
                  }
                },
                fill: {
                  patternType: "solid",
                  fgColor: {
                    rgb: T.slate
                  }
                },
                alignment: {
                  horizontal: "center",
                  vertical: "center",
                  wrapText: !0
                },
                border: R0
              }
            }
          }), z.forEach((V, s0) => {
            const D0 = s0 % 2 === 0 ? void 0 : "F8FAFC";
            V.forEach((B0, P0) => {
              const nu = typeof B0 == "number",
                Xu = P0 === 17,
                iE = P0 === 18,
                fE = P0 === 16;
              let Ku = D0,
                Gu = T.text;
              Xu && B0 && (Ku = B0 === "CKD5" ? T.redLight : B0 === "CKD4" ? "FED7AA" : B0 === "CKD3" ? "FEF3C7" : T.greenLight, Gu = B0 === "CKD5" ? T.red : B0 === "CKD4" ? "C2410C" : B0 === "CKD3" ? "B45309" : "047857"), fE && typeof B0 == "number" && (Gu = B0 < 30 ? T.red : B0 < 60 ? "B45309" : "047857"), vu[y.utils.encode_cell({
                r: s0 + 1,
                c: P0
              })] = {
                v: B0,
                t: nu ? "n" : "s",
                s: {
                  font: {
                    name: i0,
                    sz: 9,
                    bold: Xu || iE,
                    color: {
                      rgb: Gu
                    }
                  },
                  alignment: {
                    horizontal: nu ? "right" : "left",
                    vertical: "center",
                    wrapText: !1
                  },
                  border: R0,
                  fill: Ku ? {
                    patternType: "solid",
                    fgColor: {
                      rgb: Ku
                    }
                  } : void 0,
                  numFmt: iE ? "#,##0.00" : nu && !Xu ? "#,##0" : void 0
                }
              }
            })
          }), vu["!ref"] = y.utils.encode_range({
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: z.length,
              c: g.length - 1
            }
          }), vu["!cols"] = [6, 22, 10, 6, 6, 16, 24, 11, 9, 16, 30, 14, 18, 14, 30, 10, 9, 10, 11, 32].map(V => ({
            wch: V
          })), vu["!rows"] = [{
            hpx: 30
          }], vu["!freeze"] = {
            xSplit: 0,
            ySplit: 1
          }, y.utils.book_append_sheet(O, vu, "Patient Data"), y.writeFile(O, `BCH360_NCD_ByDisease_${p0}_${h0}.xlsx`)
        });
        return
      }
      if (n === "mortality") {
        if (!l0?.comparison) return;
        const t = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (${n0})`, `IPD \u0E15\u0E32\u0E22 (${n0})`, `IPD \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22% (${n0})`, `OPD \u0E15\u0E32\u0E22 (${n0})`, `\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 (${n0})`, `IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (${u0})`, `IPD \u0E15\u0E32\u0E22 (${u0})`, `IPD \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22% (${u0})`, `OPD \u0E15\u0E32\u0E22 (${u0})`, `\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 (${u0})`],
          d = l0.comparison.map(m => [m.month, m.fy1.ipd_discharge, m.fy1.ipd_deaths, m.fy1.ipd_mortality_rate, m.fy1.opd_deaths, m.fy1.total_deaths, m.fy2.ipd_discharge, m.fy2.ipd_deaths, m.fy2.ipd_mortality_rate, m.fy2.opd_deaths, m.fy2.total_deaths]),
          k = "\uFEFF" + [t.join(","), ...d.map(m => m.join(","))].join(`\r
`),
          r = new Blob([k], {
            type: "text/csv;charset=utf-8;"
          }),
          c = URL.createObjectURL(r),
          o = document.createElement("a");
        o.href = c, o.download = `BCH360_Mortality_${n0}_${u0}.csv`, o.click(), URL.revokeObjectURL(c)
      }
    }, [n, W, D, Q0, K0, l0, C0, Y, A0, $0, f0, n0, u0, p0, h0, yu, N0]),
    Uu = Q.useMemo(() => {
      const e = [];
      for (let t = du; t >= du - 2; t--) e.push(t);
      return e
    }, [du]),
    E = AE;
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
        onChange: e => g0(e.target.value),
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
            value: yu,
            onChange: e => ku(e.target.value),
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
            value: N0,
            onChange: e => Lu(e.target.value),
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
            value: p0,
            onChange: e => Ru(e.target.value),
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
            value: h0,
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
      }) : n === "frax" || n === "pt" || n === "staff-services" || n === "fluoride" || n === "elderly-cxr" || n === "ncd-disease" || n === "imaging-services" || n === "pttype-services" ? u.jsxs(u.Fragment, {
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
            value: p0,
            onChange: e => Ru(e.target.value),
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
            value: h0,
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
            value: n0,
            onChange: e => Wu(Number(e.target.value)),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            },
            children: Uu.map(e => u.jsxs("option", {
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
            value: u0,
            onChange: e => Pu(Number(e.target.value)),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            },
            children: Uu.map(e => u.jsxs("option", {
              value: e,
              children: ["\u0E1B\u0E35\u0E07\u0E1A ", e]
            }, e))
          })]
        })]
      }), u.jsx("button", {
        onClick: () => n === "ipd-compare" ? G() : n === "opd-compare" ? k0() : n === "resource-opd" ? V0() : n === "resource-ipd" ? Y0() : n === "frax" ? bu() : n === "pt" ? _u() : n === "staff-services" ? Cu() : n === "fluoride" ? Au() : n === "elderly-cxr" ? ou() : n === "ncd-disease" ? iu() : n === "imaging-services" ? Ou() : n === "pttype-services" ? Hu() : Eu(),
        disabled: _0,
        style: {
          padding: "6px 16px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #0284c7, #7c3aed)",
          color: "#fff",
          opacity: _0 ? .5 : 1
        },
        children: _0 ? "Loading..." : "\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
      }), u.jsx("button", {
        onClick: sE,
        disabled: n === "ipd-compare" ? !W : n === "opd-compare" ? !D : n === "resource-opd" ? !Q0 : n === "resource-ipd" ? !K0 : n === "frax" ? !C0 : n === "pt" || n === "staff-services" ? !Y : n === "fluoride" ? !A0 : n === "elderly-cxr" ? !$0 : n === "ncd-disease" ? !f0?.patients : n === "imaging-services" ? !a0?.patients : n === "pttype-services" ? !y0?.groups : !l0,
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
        onClick: lE,
        disabled: n === "ipd-compare" ? !W : n === "opd-compare" ? !D : n === "resource-opd" ? !Q0 : n === "resource-ipd" ? !K0 : n === "frax" ? !C0 : n === "pt" || n === "staff-services" ? !Y : n === "fluoride" ? !A0 : n === "elderly-cxr" ? !$0 : n === "ncd-disease" ? !f0?.patients : n === "imaging-services" ? !a0?.patients : n === "pttype-services" ? !y0?.groups : !l0,
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
        children: n === "frax" || n === "pt" || n === "staff-services" || n === "fluoride" || n === "elderly-cxr" || n === "ipd-compare" || n === "opd-compare" || n === "resource-opd" || n === "resource-ipd" || n === "ncd-disease" || n === "imaging-services" || n === "pttype-services" ? "Excel" : "CSV"
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
          value: F0,
          onChange: e => Nu(e.target.value === "all" ? "all" : Number(e.target.value)),
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
    }), Z0 && u.jsx("div", {
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(239,68,68,.08)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: Z0
    }), _0 && u.jsx("div", {
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
    }), !_0 && n === "ipd-compare" && W?.comparison && (() => {
      const e = W.fy1_totals,
        t = W.fy2_totals,
        d = (r, c) => r > 0 ? Math.round((c - r) / r * 100) : 0,
        k = [{
          label: "Admit",
          pct: d(e.admits, t.admits),
          v1: e.admits,
          v2: t.admits
        }, {
          label: "Discharge",
          pct: d(e.discharges, t.discharges),
          v1: e.discharges,
          v2: t.discharges
        }, {
          label: "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19",
          pct: d(e.total_los, t.total_los),
          v1: e.total_los,
          v2: t.total_los
        }, {
          label: "ALOS",
          pct: d(e.alos, t.alos),
          v1: e.alos,
          v2: t.alos,
          dec: 2
        }, {
          label: "\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 %",
          pct: d(e.occupancy_rate, t.occupancy_rate),
          v1: e.occupancy_rate,
          v2: t.occupancy_rate,
          dec: 1
        }, {
          label: "Active Bed",
          pct: d(e.active_beds, t.active_beds),
          v1: e.active_beds,
          v2: t.active_beds,
          dec: 1
        }, {
          label: "Sum AdjRW",
          pct: d(e.sum_adjrw, t.sum_adjrw),
          v1: e.sum_adjrw,
          v2: t.sum_adjrw,
          dec: 1
        }, {
          label: "CMI",
          pct: d(e.cmi, t.cmi),
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
          children: ["\u0E2A\u0E23\u0E38\u0E1B YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (", W.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49)"]
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
            children: [W.fiscal_years.fy1.start, " \u2014 ", W.fiscal_years.fy1.end]
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
            children: [W.fiscal_years.fy2.start, " \u2014 ", W.fiscal_years.fy2.end]
          })]
        }), u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px"
          },
          children: k.map((r, c) => u.jsxs("div", {
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
              children: [a(r.v1, r.dec || 0), " \u2192 ", a(r.v2, r.dec || 0)]
            })]
          }, c))
        }), (() => {
          const r = W.fy1_totals,
            c = W.fy2_totals,
            o = (l, L) => l > 0 ? Math.round((L - l) / l * 100) : 0,
            m = o(r.admits, c.admits),
            h = o(r.discharges, c.discharges),
            A = o(r.total_los, c.total_los),
            C = o(r.alos, c.alos);
          o(r.occupancy_rate, c.occupancy_rate);
          const S = o(r.sum_adjrw, c.sum_adjrw),
            w = o(r.cmi, c.cmi),
            R = W.comparable_months || 0,
            M = W.custom_range ? `${W.custom_range.start} \u2014 ${W.custom_range.end}` : W.fiscal_years?.fy2?.label || "",
            b = [],
            _ = c.admits - c.discharges,
            H = r.discharges > 0 ? r.sum_adjrw / r.discharges : 0,
            p = c.discharges > 0 ? c.sum_adjrw / c.discharges : 0;
          W.total_beds * 30 * R, m < -5 ? b.push({
            icon: "\u{1F4C9}",
            color: "#dc2626",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E25\u0E14\u0E25\u0E07 ${Math.abs(m)}%`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${a(r.admits)} \u2192 ${a(c.admits)} \u0E23\u0E32\u0E22 (\u0E25\u0E14 ${a(Math.abs(c.admits-r.admits))} \u0E23\u0E32\u0E22) \xB7 D/C ${a(r.discharges)} \u2192 ${a(c.discharges)} \u0E23\u0E32\u0E22 (${h>=0?"+":""}${h}%) \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19${Math.abs(m)>15?"\u0E25\u0E14\u0E25\u0E07\u0E21\u0E32\u0E01":"\u0E25\u0E14\u0E25\u0E07"} \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E25\u0E30\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E42\u0E14\u0E22\u0E15\u0E23\u0E07`,
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
          }) : m > 5 ? b.push({
            icon: "\u{1F4C8}",
            color: "#16a34a",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${m}%`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${a(r.admits)} \u2192 ${a(c.admits)} \u0E23\u0E32\u0E22 (\u0E40\u0E1E\u0E34\u0E48\u0E21 ${a(c.admits-r.admits)} \u0E23\u0E32\u0E22) \u2014 \u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19\u0E41\u0E25\u0E30\u0E40\u0E15\u0E35\u0E22\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A`,
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
          }) : b.push({
            icon: "\u27A1\uFE0F",
            color: "var(--md-text-tertiary)",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E17\u0E23\u0E07\u0E15\u0E31\u0E27 (${m>=0?"+":""}${m}%)`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${a(c.admits)} \u0E23\u0E32\u0E22 \xB7 D/C ${a(c.discharges)} \u0E23\u0E32\u0E22 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23`,
            actions: []
          }), _ > 20 && b.push({
            icon: "\u26A0\uFE0F",
            color: "#f59e0b",
            title: `Admit \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 D/C ${a(_)} \u0E23\u0E32\u0E22 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2A\u0E30\u0E2A\u0E21\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A`,
            detail: `Admit ${a(c.admits)} vs D/C ${a(c.discharges)} \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E43\u0E2B\u0E49\u0E40\u0E15\u0E35\u0E22\u0E07\u0E40\u0E15\u0E47\u0E21\u0E40\u0E23\u0E47\u0E27\u0E02\u0E36\u0E49\u0E19\u0E41\u0E25\u0E30 Workload \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2A\u0E39\u0E07`,
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
          }), C > 5 ? b.push({
            icon: "\u23F1\uFE0F",
            color: "#f59e0b",
            title: `ALOS \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${C}% (${a(r.alos,2)} \u2192 ${a(c.alos,2)} \u0E27\u0E31\u0E19)`,
            detail: `\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E23\u0E27\u0E21 ${a(r.total_los)} \u2192 ${a(c.total_los)} \u0E27\u0E31\u0E19 (${A>=0?"+":""}${A}%) \u2014 \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E22\u0E32\u0E27\u0E02\u0E36\u0E49\u0E19\u0E41\u0E21\u0E49\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14\u0E25\u0E07 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32 Discharge \u0E0A\u0E49\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D\u0E21\u0E35\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19`,
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
          }) : C < -5 ? b.push({
            icon: "\u2705",
            color: "#16a34a",
            title: `ALOS \u0E25\u0E14\u0E25\u0E07 ${Math.abs(C)}% \u2014 D/C Planning \u0E21\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E`,
            detail: `ALOS ${a(r.alos,2)} \u2192 ${a(c.alos,2)} \u0E27\u0E31\u0E19 \u2014 \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35\u0E02\u0E36\u0E49\u0E19 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Readmission Rate \u0E44\u0E21\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 (D/C \u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B)`,
            actions: [{
              who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
              what: "Monitor Readmission \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 Readmission \u0E20\u0E32\u0E22\u0E43\u0E19 28 \u0E27\u0E31\u0E19 \u0E2B\u0E32\u0E01 Rate >5% \u0E43\u0E2B\u0E49\u0E17\u0E1A\u0E17\u0E27\u0E19 D/C criteria \u0E27\u0E48\u0E32\u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48"
            }]
          }) : b.push({
            icon: "\u27A1\uFE0F",
            color: "var(--md-text-tertiary)",
            title: `ALOS \u0E17\u0E23\u0E07\u0E15\u0E31\u0E27 ${a(c.alos,2)} \u0E27\u0E31\u0E19 (${C>=0?"+":""}${C}%)`,
            detail: `\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E23\u0E27\u0E21 ${a(c.total_los)} \u0E27\u0E31\u0E19 \u2014 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19`,
            actions: []
          });
          {
            const l = [];
            m < 0 && l.push(`Volume \u0E25\u0E14 ${Math.abs(m)}%`), w < -5 && l.push(`CMI \u0E25\u0E14 ${Math.abs(w)}%`), S < -10 ? b.push({
              icon: "\u{1F4B0}",
              color: "#dc2626",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E25\u0E14\u0E25\u0E07 ${Math.abs(S)}% \u2014 ${l.join(" + ")||"\u0E15\u0E49\u0E2D\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21"}`,
              detail: `AdjRW ${a(r.sum_adjrw,1)} \u2192 ${a(c.sum_adjrw,1)} (\u0E25\u0E14 ${a(Math.abs(c.sum_adjrw-r.sum_adjrw),1)}) \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${H.toFixed(2)} \u2192 ${p.toFixed(2)} \xB7 CMI ${a(r.cmi,2)} \u2192 ${a(c.cmi,2)} \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32 Case-mix \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07`,
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
            }) : S > 10 ? b.push({
              icon: "\u{1F4B0}",
              color: "#16a34a",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${S}%`,
              detail: `AdjRW ${a(r.sum_adjrw,1)} \u2192 ${a(c.sum_adjrw,1)} \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${H.toFixed(2)} \u2192 ${p.toFixed(2)} \u2014 ${w>5?"Case-mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19":"\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21"}`,
              actions: [{
                who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
                what: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Readmission Rate \u2014 \u0E40\u0E21\u0E37\u0E48\u0E2D CMI \u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E31\u0E48\u0E19\u0E43\u0E08\u0E27\u0E48\u0E32\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 D/C \u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E41\u0E25\u0E49\u0E27\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 Admit \u0E0B\u0E49\u0E33"
              }, {
                who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
                what: "\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E17\u0E35\u0E21\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Staffing Ratio, \u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C, \u0E22\u0E32 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A High RW"
              }]
            }) : S < 0 && b.push({
              icon: "\u{1F4B0}",
              color: "#f59e0b",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E25\u0E14\u0E25\u0E07\u0E40\u0E25\u0E47\u0E01\u0E19\u0E49\u0E2D\u0E22 ${Math.abs(S)}%`,
              detail: `AdjRW ${a(r.sum_adjrw,1)} \u2192 ${a(c.sum_adjrw,1)} \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${H.toFixed(2)} \u2192 ${p.toFixed(2)}`,
              actions: [{
                who: "\u0E17\u0E35\u0E21 Coding",
                what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Coding Quality \u2014 \u0E2A\u0E38\u0E48\u0E21 Audit \u0E40\u0E04\u0E2A RW \u0E15\u0E48\u0E33\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Under-coding \u0E01\u0E48\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E08\u0E30\u0E02\u0E22\u0E32\u0E22\u0E43\u0E2B\u0E0D\u0E48\u0E02\u0E36\u0E49\u0E19"
              }]
            })
          }
          return c.occupancy_rate > 85 ? b.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#dc2626",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${a(c.occupancy_rate,1)}% \u2014 \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22 (>85%)`,
            detail: `Active Bed ${a(c.active_beds,1)}/${W.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E25\u0E49\u0E19 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E2D Admit \u0E19\u0E32\u0E19 + Workload \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2A\u0E39\u0E07 + \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 HAI`,
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
          }) : c.occupancy_rate < 50 ? b.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#f59e0b",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${a(c.occupancy_rate,1)}% \u2014 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32 (<50%)`,
            detail: `Active Bed ${a(c.active_beds,1)}/${W.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 (\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23/\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E39\u0E1B\u0E42\u0E20\u0E04) \u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E44\u0E21\u0E48\u0E04\u0E38\u0E49\u0E21\u0E04\u0E48\u0E32`,
            actions: [{
              who: "\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
              what: "\u0E1B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07 Ward \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E1B\u0E34\u0E14\u0E23\u0E27\u0E21 Ward \u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27\u0E25\u0E14\u0E04\u0E48\u0E32\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E39\u0E1B\u0E42\u0E20\u0E04 \u0E42\u0E2D\u0E19\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E44\u0E1B\u0E40\u0E2A\u0E23\u0E34\u0E21 OPD/ER \u0E17\u0E35\u0E48\u0E02\u0E32\u0E14\u0E41\u0E04\u0E25\u0E19"
            }, {
              who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
              what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 OPD Observation \u2014 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 OPD Obs >6 \u0E0A\u0E21. \u0E27\u0E48\u0E32\u0E04\u0E27\u0E23 Admit \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22 \u0E41\u0E17\u0E19\u0E17\u0E35\u0E48\u0E08\u0E30 Observe \u0E17\u0E35\u0E48 OPD"
            }]
          }) : b.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#16a34a",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${a(c.occupancy_rate,1)}% \u2014 \u0E40\u0E01\u0E13\u0E11\u0E4C\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21 (50-85%)`,
            detail: `Active Bed ${a(c.active_beds,1)}/${W.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E2A\u0E21\u0E14\u0E38\u0E25 \u0E22\u0E31\u0E07\u0E21\u0E35\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A Surge`,
            actions: []
          }), w < -10 ? b.push({
            icon: "\u{1F4CB}",
            color: "#dc2626",
            title: `CMI \u0E25\u0E14\u0E25\u0E07 ${Math.abs(w)}% (${a(r.cmi,2)} \u2192 ${a(c.cmi,2)}) \u2014 Case-mix \u0E40\u0E1A\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D Under-coding`,
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
          }) : w > 10 && b.push({
            icon: "\u{1F4CB}",
            color: "#16a34a",
            title: `CMI \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${w}% (${a(r.cmi,2)} \u2192 ${a(c.cmi,2)}) \u2014 \u0E14\u0E39\u0E41\u0E25\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19`,
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
          }), b.filter(l => l.actions.length === 0 || l.detail), b.filter(l => l.actions.length > 0), u.jsxs("div", {
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
                children: [M, " \xB7 ", R, " \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07 ", W.total_beds]
              })]
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              },
              children: b.map((l, L) => u.jsxs("div", {
                style: {
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: `${l.color}08`,
                  borderLeft: `3px solid ${l.color}`
                },
                children: [u.jsxs("div", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: l.color,
                    marginBottom: "4px"
                  },
                  children: [l.icon, " ", l.title]
                }), u.jsx("div", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--md-text-secondary)",
                    lineHeight: "1.7",
                    marginBottom: l.actions.length ? "8px" : 0
                  },
                  children: l.detail
                }), l.actions.length > 0 && u.jsxs("div", {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    marginTop: "6px",
                    paddingTop: "8px",
                    borderTop: `1px dashed ${l.color}20`
                  },
                  children: [u.jsx("div", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#f59e0b",
                      marginBottom: "2px"
                    },
                    children: "\u{1F4A1} \u0E41\u0E19\u0E27\u0E17\u0E32\u0E07\u0E41\u0E01\u0E49\u0E44\u0E02"
                  }), l.actions.map((i, x) => u.jsxs("div", {
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
                      children: i.who
                    }), u.jsx("span", {
                      style: {
                        fontWeight: 600,
                        color: "var(--md-text-secondary)"
                      },
                      children: i.what
                    })]
                  }, x))]
                })]
              }, L))
            })]
          })
        })()]
      })
    })(), !_0 && n === "ipd-compare" && W?.comparison && u.jsxs("div", {
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
        ref: K,
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
            children: W.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [W.custom_range ? `${W.custom_range.start} \u0E16\u0E36\u0E07 ${W.custom_range.end} vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19` : Yu && `${W.fiscal_years.fy2.label} ${Yu}`, " \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07\u0E08\u0E23\u0E34\u0E07: ", W.total_beds, " \u0E40\u0E15\u0E35\u0E22\u0E07"]
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
                children: W.custom_range ? `${W.fiscal_years.fy1.start} \u2014 ${W.fiscal_years.fy1.end}` : `${W.fiscal_years.fy1.label} (${W.fiscal_years.fy1.start} \u2014 ${W.fiscal_years.fy1.end})`
              }), u.jsx("th", {
                colSpan: 8,
                style: {
                  ...E.th,
                  background: E.fy2Bg,
                  color: "#db2777",
                  borderRight: "2px solid var(--md-border)"
                },
                children: W.custom_range ? `${W.fiscal_years.fy2.start} \u2014 ${W.fiscal_years.fy2.end}` : `${W.fiscal_years.fy2.label} (${W.fiscal_years.fy2.start} \u2014 ${W.fiscal_years.fy2.end})`
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
            children: [W.comparison.filter(e => e.fy1.has_data && e.fy2.has_data).map((e, t) => u.jsxs("tr", {
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
                const d = "1px solid var(--md-border)";
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy1.admits)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: a(e.fy1.discharges)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy1.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: a(e.fy1.alos, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy1.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: a(e.fy1.active_beds, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy1.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: "2px solid var(--md-border)"
                    },
                    children: a(e.fy1.cmi, 2)
                  })]
                })
              })(), (() => {
                const d = "1px solid var(--md-border)";
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy2.admits)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: a(e.fy2.discharges)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy2.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: a(e.fy2.alos, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy2.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: a(e.fy2.active_beds, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy2.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: "2px solid var(--md-border)"
                    },
                    children: a(e.fy2.cmi, 2)
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
              ].map(([d, k, r], c) => {
                const o = d > 0 ? Math.round((k - d) / d * 100) : k > 0 ? 100 : 0;
                return u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 800,
                    fontSize: "11px",
                    color: o > 0 ? "#16a34a" : o < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                    borderRight: r ? "1px solid var(--md-border)" : void 0
                  },
                  children: [o > 0 ? "\u25B2" : o < 0 ? "\u25BC" : "", " ", Math.abs(o), "%"]
                }, `yoy_${c}`)
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 800,
                  color: e.admit_diff >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [e.admit_diff > 0 ? "+" : "", a(e.admit_diff)]
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 800,
                  color: e.fy2.total_los - e.fy1.total_los >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [e.fy2.total_los - e.fy1.total_los > 0 ? "+" : "", a(e.fy2.total_los - e.fy1.total_los)]
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
                  d = {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: e
                  },
                  k = W.fy1_totals,
                  r = W.fy2_totals;
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: d,
                    children: a(k.admits)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: a(k.discharges)
                  }), u.jsx("td", {
                    style: d,
                    children: a(k.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: a(k.alos, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: a(k.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: a(k.active_beds, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: a(k.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: e
                    },
                    children: a(k.cmi, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: a(r.admits)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: a(r.discharges)
                  }), u.jsx("td", {
                    style: d,
                    children: a(r.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: a(r.alos, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: a(r.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: a(r.active_beds, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: a(r.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: e
                    },
                    children: a(r.cmi, 2)
                  })]
                })
              })(), (() => {
                const e = W.fy1_totals,
                  t = W.fy2_totals;
                return [
                  [e.admits, t.admits, !1],
                  [e.discharges, t.discharges, !0],
                  [e.total_los, t.total_los, !1],
                  [e.alos, t.alos, !0],
                  [e.occupancy_rate, t.occupancy_rate, !1],
                  [e.active_beds, t.active_beds, !0],
                  [e.sum_adjrw, t.sum_adjrw, !1],
                  [e.cmi, t.cmi, !1]
                ].map(([d, k, r], c) => {
                  const o = d > 0 ? Math.round((k - d) / d * 100) : k > 0 ? 100 : 0;
                  return u.jsxs("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      borderTop: "2px solid var(--md-border)",
                      fontSize: "11px",
                      color: o > 0 ? "#16a34a" : o < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                      borderRight: r ? "1px solid var(--md-border)" : void 0
                    },
                    children: [o > 0 ? "\u25B2" : o < 0 ? "\u25BC" : "", " ", Math.abs(o), "%"]
                  }, `yoy_t_${c}`)
                })
              })(), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: "2px solid var(--md-border)",
                  color: W.overall_admit_diff >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [W.overall_admit_diff > 0 ? "+" : "", a(W.overall_admit_diff)]
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: "2px solid var(--md-border)",
                  color: W.fy2_totals.total_los - W.fy1_totals.total_los >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [W.fy2_totals.total_los - W.fy1_totals.total_los > 0 ? "+" : "", a(W.fy2_totals.total_los - W.fy1_totals.total_los)]
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
          children: W.timestamp && new Date(W.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !_0 && n === "opd-compare" && D?.comparison && (() => {
      const e = D.fy1_totals,
        t = D.fy2_totals,
        d = (r, c) => r > 0 ? Math.round((c - r) / r * 100) : 0,
        k = [{
          label: "Visit",
          pct: d(e.visits, t.visits),
          v1: e.visits,
          v2: t.visits
        }, {
          label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 (UNQ)",
          pct: d(e.patients, t.patients),
          v1: e.patients,
          v2: t.patients
        }, {
          label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49",
          pct: d(e.revenue, t.revenue),
          v1: e.revenue,
          v2: t.revenue,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32\u0E22\u0E32",
          pct: d(e.drug_cost, t.drug_cost),
          v1: e.drug_cost,
          v2: t.drug_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32 Lab",
          pct: d(e.lab_cost, t.lab_cost),
          v1: e.lab_cost,
          v2: t.lab_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32 X-ray",
          pct: d(e.xray_cost, t.xray_cost),
          v1: e.xray_cost,
          v2: t.xray_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/Visit",
          pct: d(e.avg_income, t.avg_income),
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
          children: ["\u0E2A\u0E23\u0E38\u0E1B YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (", D.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49)"]
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
            children: [D.fiscal_years.fy1.start, " \u2014 ", D.fiscal_years.fy1.end]
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
            children: [D.fiscal_years.fy2.start, " \u2014 ", D.fiscal_years.fy2.end]
          })]
        }), u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px"
          },
          children: k.map((r, c) => u.jsxs("div", {
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
              children: [r.prefix || "", a(r.v1, r.dec || 0), " \u2192 ", r.prefix || "", a(r.v2, r.dec || 0)]
            })]
          }, c))
        })]
      })
    })(), !_0 && n === "opd-compare" && D?.comparison && u.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)",
        borderRadius: "16px",
        overflowX: "auto"
      },
      children: [u.jsxs("div", {
        ref: K,
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
            children: D.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [D.custom_range.start, " \u0E16\u0E36\u0E07 ", D.custom_range.end, " vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07\u0E08\u0E23\u0E34\u0E07: ", D.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19"]
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
                children: [D.fiscal_years.fy1.start, " \u2014 ", D.fiscal_years.fy1.end]
              }), u.jsxs("th", {
                colSpan: 7,
                style: {
                  ...E.th,
                  background: "rgba(16,185,129,.10)",
                  color: "#10b981",
                  borderRight: "2px solid var(--md-border)"
                },
                children: [D.fiscal_years.fy2.start, " \u2014 ", D.fiscal_years.fy2.end]
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
            children: [D.comparison.filter(e => e.fy1.has_data || e.fy2.has_data).map((e, t) => {
              const d = (r, c) => r > 0 ? Math.round((c - r) / r * 100) : c > 0 ? 100 : 0,
                k = "1px solid var(--md-border)";
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
                  children: a(e.fy1.visits)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: k
                  },
                  children: a(e.fy1.patients)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: a(e.fy1.revenue)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: a(e.fy1.drug_cost)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: a(e.fy1.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: k
                  },
                  children: a(e.fy1.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: "2px solid var(--md-border)"
                  },
                  children: a(e.fy1.avg_income, 2)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: a(e.fy2.visits)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: k
                  },
                  children: a(e.fy2.patients)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: a(e.fy2.revenue)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: a(e.fy2.drug_cost)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: a(e.fy2.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: k
                  },
                  children: a(e.fy2.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: "2px solid var(--md-border)"
                  },
                  children: a(e.fy2.avg_income, 2)
                }), [
                  [e.fy1.visits, e.fy2.visits],
                  [e.fy1.patients, e.fy2.patients],
                  [e.fy1.revenue, e.fy2.revenue],
                  [e.fy1.drug_cost, e.fy2.drug_cost],
                  [e.fy1.lab_cost, e.fy2.lab_cost],
                  [e.fy1.xray_cost, e.fy2.xray_cost],
                  [e.fy1.avg_income, e.fy2.avg_income]
                ].map(([r, c], o) => {
                  const m = d(r, c);
                  return u.jsxs("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      fontSize: "11px",
                      color: m > 0 ? "#16a34a" : m < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                    },
                    children: [m > 0 ? "\u25B2" : m < 0 ? "\u25BC" : "", " ", Math.abs(m), "%"]
                  }, o)
                })]
              }, t)
            }), (() => {
              const e = D.fy1_totals,
                t = D.fy2_totals,
                d = "2px solid var(--md-border)",
                k = "1px solid var(--md-border)",
                r = {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: d
                },
                c = (o, m) => o > 0 ? Math.round((m - o) / o * 100) : 0;
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
                    borderRight: d,
                    borderTop: d
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), u.jsx("td", {
                  style: r,
                  children: a(e.visits)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: k
                  },
                  children: a(e.patients)
                }), u.jsx("td", {
                  style: r,
                  children: a(e.revenue)
                }), u.jsx("td", {
                  style: r,
                  children: a(e.drug_cost)
                }), u.jsx("td", {
                  style: r,
                  children: a(e.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: k
                  },
                  children: a(e.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: d
                  },
                  children: a(e.avg_income, 2)
                }), u.jsx("td", {
                  style: r,
                  children: a(t.visits)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: k
                  },
                  children: a(t.patients)
                }), u.jsx("td", {
                  style: r,
                  children: a(t.revenue)
                }), u.jsx("td", {
                  style: r,
                  children: a(t.drug_cost)
                }), u.jsx("td", {
                  style: r,
                  children: a(t.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: k
                  },
                  children: a(t.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: d
                  },
                  children: a(t.avg_income, 2)
                }), [
                  [e.visits, t.visits],
                  [e.patients, t.patients],
                  [e.revenue, t.revenue],
                  [e.drug_cost, t.drug_cost],
                  [e.lab_cost, t.lab_cost],
                  [e.xray_cost, t.xray_cost],
                  [e.avg_income, t.avg_income]
                ].map(([o, m], h) => {
                  const A = c(o, m);
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
          children: D.timestamp && new Date(D.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !_0 && n === "resource-opd" && Q0?.comparison && (() => {
      const e = Q0,
        t = e.fy1_totals,
        d = e.fy2_totals,
        k = (o, m) => m > 0 ? Math.round((o - m) / m * 100) : o > 0 ? 100 : 0;
      t.lab_orders + t.drug_orders + t.xray_orders, t.lab_price + t.drug_price + t.xray_price, d.lab_orders + d.drug_orders + d.xray_orders, d.lab_price + d.drug_price + d.xray_price;
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
          ref: K,
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
                  children: ["\u0E1B\u0E35 \u0E07\u0E1A ", n0]
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#0d9488",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35 \u0E07\u0E1A ", u0]
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
              children: [e.comparison.filter(o => o.fy1?.has_data && o.fy2?.has_data).map((o, m) => {
                const h = o.fy1,
                  A = o.fy2,
                  C = h.lab_orders + h.drug_orders + h.xray_orders,
                  S = h.lab_price + h.drug_price + h.xray_price,
                  w = A.lab_orders + A.drug_orders + A.xray_orders,
                  R = A.lab_price + A.drug_price + A.xray_price,
                  M = k(w, C),
                  b = k(R, S),
                  _ = m % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  H = m % 2 === 0 ? "var(--md-surface)" : "var(--md-surface-2, #f8fafc)";
                return u.jsxs("tr", {
                  style: {
                    background: _
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      position: "sticky",
                      left: 0,
                      background: H,
                      zIndex: 1,
                      borderRight: r
                    },
                    children: o.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: h.lab_orders ? a(h.lab_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: h.lab_price ? a(h.lab_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: h.drug_orders ? a(h.drug_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: h.drug_price ? a(h.drug_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: h.xray_orders ? a(h.xray_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: h.xray_price ? a(h.xray_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.lab_orders ? a(A.lab_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: A.lab_price ? a(A.lab_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.drug_orders ? a(A.drug_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: A.drug_price ? a(A.drug_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.xray_orders ? a(A.xray_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: A.xray_price ? a(A.xray_price) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: M >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: o.has_data ? `${M>0?"\u25B2":M<0?"\u25BC":""} ${Math.abs(M)}%` : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: b >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: o.has_data ? `${b>0?"\u25B2":b<0?"\u25BC":""} ${Math.abs(b)}%` : ""
                  })]
                }, m)
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
                  children: a(t.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: c
                  },
                  children: a(t.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(t.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: c
                  },
                  children: a(t.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(t.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: a(t.xray_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(d.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: c
                  },
                  children: a(d.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(d.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: c
                  },
                  children: a(d.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(d.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: a(d.xray_price)
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
        }), (n0 <= 2567 || u0 <= 2567) && u.jsxs("div", {
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
    })(), !_0 && n === "resource-opd" && Q0?.comparison && u.jsx(nE, {
      data: Q0,
      fy1: n0,
      fy2: u0,
      level: "OPD"
    }), !_0 && n === "resource-ipd" && K0?.comparison && (() => {
      const e = K0,
        t = e.fy1_totals,
        d = e.fy2_totals,
        k = (o, m) => m > 0 ? Math.round((o - m) / m * 100) : o > 0 ? 100 : 0;
      t.lab_orders + t.drug_orders + t.xray_orders, t.lab_price + t.drug_price + t.xray_price, d.lab_orders + d.drug_orders + d.xray_orders, d.lab_price + d.drug_price + d.xray_price;
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
          ref: K,
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
              children: e.title || `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (Lab / Drug / CT-Xray) \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A ${n0} vs ${u0}`
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
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", n0]
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#db2777",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", u0]
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
              children: [e.comparison.filter(o => o.fy1?.has_data && o.fy2?.has_data).map((o, m) => {
                const h = o.fy1,
                  A = o.fy2,
                  C = h.lab_orders + h.drug_orders + h.xray_orders,
                  S = h.lab_price + h.drug_price + h.xray_price,
                  w = A.lab_orders + A.drug_orders + A.xray_orders,
                  R = A.lab_price + A.drug_price + A.xray_price,
                  M = k(w, C),
                  b = k(R, S),
                  _ = m % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  H = !o.has_data;
                return u.jsxs("tr", {
                  style: {
                    background: _,
                    opacity: H ? .35 : 1
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      textAlign: "center",
                      borderRight: r
                    },
                    children: o.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(h.lab_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(h.lab_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(h.drug_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(h.drug_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(h.xray_orders)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: a(h.xray_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(A.lab_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(A.lab_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(A.drug_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(A.drug_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(A.xray_orders)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: a(A.xray_price)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: M >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: o.has_data && h.has_data && A.has_data ? `${M>=0?"\u25B2":"\u25BC"} ${Math.abs(M)}%` : "\u2014"
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: b >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: o.has_data && h.has_data && A.has_data ? `${b>=0?"\u25B2":"\u25BC"} ${Math.abs(b)}%` : "\u2014"
                  })]
                }, o.month)
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
                  children: a(t.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(t.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(t.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(t.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(t.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: a(t.xray_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(d.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(d.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(d.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(d.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(d.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: a(d.xray_price)
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
    })(), !_0 && n === "resource-ipd" && K0?.comparison && u.jsx(nE, {
      data: K0,
      fy1: n0,
      fy2: u0,
      level: "IPD"
    }), !_0 && n === "mortality" && l0?.comparison && (() => {
      const e = l0,
        t = e.fy1_totals,
        d = e.fy2_totals,
        k = (o, m) => m > 0 ? Math.round((o - m) / m * 100) : o > 0 ? 100 : 0,
        r = o => o > 0 ? `${o.toFixed(2)}%` : "\u2014",
        c = "2px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: K,
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
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", n0]
                }), u.jsxs("th", {
                  colSpan: 5,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#db2777",
                    borderRight: c
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", u0]
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
              children: [e.comparison.filter(o => o.fy1?.has_data && o.fy2?.has_data).map((o, m) => {
                const h = o.fy1,
                  A = o.fy2,
                  C = k(A.total_deaths, h.total_deaths),
                  S = m % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  w = !o.has_data;
                return u.jsxs("tr", {
                  style: {
                    background: S,
                    opacity: w ? .35 : 1
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      textAlign: "center",
                      borderRight: c
                    },
                    children: o.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(h.ipd_discharge)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: h.ipd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: h.ipd_deaths > 0 ? 800 : 600
                    },
                    children: a(h.ipd_deaths)
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
                    children: a(h.opd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: h.total_deaths > 0 ? "#dc2626" : "inherit",
                      borderRight: c
                    },
                    children: a(h.total_deaths)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(A.ipd_discharge)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: A.ipd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: A.ipd_deaths > 0 ? 800 : 600
                    },
                    children: a(A.ipd_deaths)
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
                    children: a(A.opd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: A.total_deaths > 0 ? "#dc2626" : "inherit",
                      borderRight: c
                    },
                    children: a(A.total_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: C > 0 ? "#dc2626" : C < 0 ? "#16a34a" : "inherit"
                    },
                    children: o.has_data && h.has_data && A.has_data ? `${C>0?"\u25B2":C<0?"\u25BC":""} ${Math.abs(C)}%` : "\u2014"
                  })]
                }, o.month)
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
                  children: a(t.ipd_discharge)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626"
                  },
                  children: a(t.ipd_deaths)
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
                  children: a(t.opd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626",
                    borderRight: c
                  },
                  children: a(t.total_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c
                  },
                  children: a(d.ipd_discharge)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626"
                  },
                  children: a(d.ipd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: d.ipd_mortality_rate >= 2 ? "#dc2626" : "#d97706"
                  },
                  children: r(d.ipd_mortality_rate)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626"
                  },
                  children: a(d.opd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: c,
                    color: "#dc2626",
                    borderRight: c
                  },
                  children: a(d.total_deaths)
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
            children: [e.data_source, " \xB7 IPD Early Death (LOS<2d): \u0E1B\u0E35\u0E07\u0E1A ", n0, "=", t.ipd_early_deaths, " / \u0E1B\u0E35\u0E07\u0E1A ", u0, "=", d.ipd_early_deaths]
          }), u.jsx("span", {
            children: e.timestamp && new Date(e.timestamp).toLocaleString("th-TH")
          })]
        })]
      })
    })(), !_0 && n === "mortality" && l0?.comparison && u.jsx(yE, {
      title: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
      subtitle: "Mortality Executive Analysis \xB7 IPD Rate \xB7 Early Death \xB7 OPD/ER \xB7 Peak Month \xB7 Risks \xB7 Recommendations",
      badge: "\u{1F4D0} Rule-based \xB7 Clinical Quality",
      accentColor: "#dc2626",
      headerGradient: "linear-gradient(135deg, rgba(220,38,38,.10), rgba(245,158,11,.06))",
      narrative: vE(l0, n0, u0)
    }), !_0 && n === "frax" && C0?.patients && u.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)"
      },
      children: [u.jsxs("div", {
        ref: K,
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
            children: C0.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [C0.date_range.start, " \u0E16\u0E36\u0E07 ", C0.date_range.end, " \xB7 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", C0.total, " \u0E23\u0E32\u0E22"]
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
            children: Tu.map((e, t) => u.jsxs("tr", {
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
          children: [F0 !== "all" && C0.patients.length > F0 && u.jsxs("span", {
            style: {
              color: "#d97706",
              marginRight: "6px"
            },
            children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", F0, " \u0E08\u0E32\u0E01 ", C0.patients.length.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 "]
          }), "FRAX\xAE WHO Model (Thailand) \xB7 HOSxP XE \xB7 Bone Density X-Ray \xB7 \u0E40\u0E1E\u0E28\u0E2B\u0E0D\u0E34\u0E07\u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19"]
        }), u.jsx("span", {
          children: C0.timestamp && new Date(C0.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !_0 && n === "elderly-cxr" && $0?.patients && (() => {
      const e = $0.patients,
        t = $0.total_income || 0,
        d = $0.total_cxr_price || 0,
        k = e.length > 0 ? Math.round(t / e.length) : 0,
        r = e.filter(i => i.sex === "\u0E0A\u0E32\u0E22").length,
        c = e.filter(i => i.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
        o = {};
      e.forEach(i => {
        const x = (i.icd10 || "").trim().toUpperCase();
        x && au.test(x) && (o[x] || (o[x] = {
          code: x,
          name: i.icd10name,
          count: 0,
          totalInc: 0
        }), o[x].count++, o[x].totalInc += i.income || 0)
      });
      const m = Object.values(o).sort((i, x) => x.count - i.count).slice(0, 10),
        h = m.length > 0 ? m[0].count : 1,
        A = {
          "60-64": 0,
          "65-69": 0,
          "70-74": 0,
          "75-79": 0,
          "80+": 0
        };
      e.forEach(i => {
        const x = Number(i.age_y) || 0;
        x < 65 ? A["60-64"]++ : x < 70 ? A["65-69"]++ : x < 75 ? A["70-74"]++ : x < 80 ? A["75-79"]++ : A["80+"]++
      });
      const C = Math.max(...Object.values(A), 1),
        S = {
          "60-64": "#3b82f6",
          "65-69": "#10b981",
          "70-74": "#f59e0b",
          "75-79": "#ef4444",
          "80+": "#8b5cf6"
        },
        w = {};
      e.forEach(i => {
        const x = i.pttype_name || "-";
        w[x] || (w[x] = {
          count: 0,
          income: 0
        }), w[x].count++, w[x].income += i.income || 0
      });
      const R = Object.entries(w).sort((i, x) => x[1].count - i[1].count),
        M = new Set(e.map(i => i.hn).filter(Boolean)).size,
        b = Object.entries(A).reduce((i, [x, f]) => f > i[1] ? [x, f] : i, ["", 0]),
        _ = m.length > 0 ? m[0] : null,
        H = R.length > 0 ? R[0] : null,
        p = e.length > 0 ? Math.round(d / e.length) : 0,
        l = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 CXR \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35: \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${$0.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${M.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E04\u0E48\u0E32 CXR \u0E23\u0E27\u0E21 ${d.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${p.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22 \xB7 \u0E0A\u0E32\u0E22 ${r} \u0E23\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07 ${c} \u0E23\u0E32\u0E22${r>0&&c>0?` (\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E2A\u0E48\u0E27\u0E19 ${(r/c).toFixed(2)}:1)`:""}`];
      if (b[0]) {
        const i = e.length > 0 ? Math.round(b[1] / e.length * 100) : 0;
        l.push(`\u{1F474} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E17\u0E33 CXR \u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${b[0]} \u0E1B\u0E35 ${b[1]} \u0E23\u0E32\u0E22 (${i}%) \u2014 ${b[0]==="80+"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E21\u0E32\u0E01 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E1B\u0E2D\u0E14\u0E2D\u0E31\u0E01\u0E40\u0E2A\u0E1A/\u0E27\u0E31\u0E13\u0E42\u0E23\u0E04\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23 follow-up \u0E17\u0E38\u0E01\u0E23\u0E32\u0E22":b[0].startsWith("60")?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E04\u0E27\u0E23\u0E17\u0E33 baseline CXR \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35":"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 COPD/IHD \u0E23\u0E48\u0E27\u0E21\u0E14\u0E49\u0E27\u0E22"}`)
      }
      if (_ && au.test(_.code) && l.push(`\u{1FA7B} \u0E1C\u0E25\u0E15\u0E23\u0E27\u0E08 CXR \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${_.code} ${_.name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${_.count} \u0E23\u0E32\u0E22 \u2014 ${_.code.startsWith("J18")?"\u0E1B\u0E2D\u0E14\u0E2D\u0E31\u0E01\u0E40\u0E2A\u0E1A \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32\u0E41\u0E25\u0E30\u0E09\u0E35\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Pneumococcal/Influenza":_.code.startsWith("J44")||_.code.startsWith("J43")?"COPD/Emphysema \u0E04\u0E27\u0E23\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A COPD clinic \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E38\u0E2B\u0E23\u0E35\u0E48":_.code.startsWith("I")?"\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08/\u0E2B\u0E25\u0E2D\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 NCD":"\u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E32\u0E21\u0E2D\u0E32\u0E22\u0E38"}`), H) {
        const [i, x] = H, f = e.length > 0 ? Math.round(x.count / e.length * 100) : 0;
        f >= 50 && l.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${i} ${x.count} \u0E23\u0E32\u0E22 (${f}%) \u2014 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 LTC \u0E02\u0E2D\u0E07\u0E0A\u0E38\u0E21\u0E0A\u0E19`)
      }
      $0.total > 0 && p > 0 && l.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22: CXR \u0E43\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E40\u0E1B\u0E47\u0E19 screening \u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A TB/COPD/Lung CA \xB7 \u0E04\u0E27\u0E23\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 coverage \u226580% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E43\u0E19\u0E40\u0E02\u0E15 \xB7 \u0E08\u0E31\u0E14\u0E17\u0E33 CXR mobile clinic \u0E2B\u0E32\u0E01\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E30\u0E14\u0E27\u0E01");
      const L = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C CXR \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: l
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
            value: $0.total.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#7c3aed",
            gradient: "linear-gradient(135deg, rgba(124,58,237,.12), rgba(124,58,237,.04))",
            border: "rgba(124,58,237,.25)"
          }, {
            label: "\u0E04\u0E48\u0E32 CXR",
            value: d.toLocaleString(void 0, {
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
            value: R.length,
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            color: "#f59e0b",
            gradient: "linear-gradient(135deg, rgba(245,158,11,.12), rgba(245,158,11,.04))",
            border: "rgba(245,158,11,.25)"
          }].map((i, x) => u.jsxs("div", {
            style: {
              background: i.gradient,
              border: `1px solid ${i.border}`,
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
              children: i.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: i.color,
                lineHeight: 1.1
              },
              children: [i.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: i.unit
              })]
            })]
          }, x))
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
            }), R.slice(0, 8).map(([i, x], f) => {
              const N = e.length > 0 ? Math.round(x.count / e.length * 100) : 0,
                v = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                $ = v[f % v.length];
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
                    title: i,
                    children: i
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: $
                    },
                    children: [x.count, " (", N, "%)"]
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
                      background: $,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, f)
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
              children: Object.entries(A).map(([i, x]) => u.jsxs("div", {
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
                    color: S[i]
                  },
                  children: x
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: S[i],
                    height: `${Math.max(8,x/C*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: i
                })]
              }, i))
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
              children: m.map((i, x) => {
                const f = h > 0 ? Math.round(i.count / h * 100) : 0;
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
                    children: i.code
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
                        width: `${f}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(124,58,237,.25), rgba(124,58,237,.${x===0?"5":"3"}))`,
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
                      children: i.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: i.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [i.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, x)
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
            ref: K,
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
                    children: [$0.date_range.start, " \u0E16\u0E36\u0E07 ", $0.date_range.end]
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
                  children: [$0.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                children: L0(e).map((i, x) => {
                  const f = x % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: f,
                      transition: "background .1s"
                    },
                    onMouseEnter: N => N.currentTarget.style.background = "rgba(124,58,237,.04)",
                    onMouseLeave: N => N.currentTarget.style.background = f,
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        color: "var(--md-text-tertiary)",
                        fontSize: "11px"
                      },
                      children: i.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontWeight: 700
                      },
                      children: i.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: i.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px",
                        color: i.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899",
                        fontWeight: 700
                      },
                      children: i.sex
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 800,
                        color: Number(i.age_y) >= 80 ? "#8b5cf6" : Number(i.age_y) >= 75 ? "#ef4444" : Number(i.age_y) >= 70 ? "#f59e0b" : "#3b82f6"
                      },
                      children: i.age_y
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
                        children: i.pttype_name
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        letterSpacing: ".02em"
                      },
                      children: i.cid
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "11px"
                      },
                      children: i.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: i.department,
                      children: i.department
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
                      title: i.address,
                      children: i.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: i.mobile_phone_number || u.jsx("span", {
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
                      title: i.cxr_name,
                      children: i.cxr_name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(124,58,237,.03)",
                        fontWeight: 800,
                        fontSize: "12px",
                        color: "#7c3aed"
                      },
                      children: i.cxr_price ? i.cxr_price.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        fontWeight: 800,
                        fontSize: "10px",
                        fontFamily: "monospace",
                        color: "#059669"
                      },
                      children: i.icd10 || "\u2014"
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
                      title: i.icd10name,
                      children: i.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 900,
                        fontSize: "12px",
                        background: i.income >= 2e3 ? "rgba(59,130,246,.08)" : i.income >= 1e3 ? "rgba(59,130,246,.04)" : "transparent",
                        color: i.income >= 2e3 ? "#1d4ed8" : i.income >= 500 ? "#3b82f6" : "var(--md-text-primary)"
                      },
                      children: i.income ? i.income.toLocaleString() : "\u2014"
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
                      title: i.chief_complaint,
                      children: i.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, i.vn || x)
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
                    children: [F0 !== "all" && $0.total > F0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", F0, " \u0E08\u0E32\u0E01 ", $0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", $0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E0A\u0E32\u0E22 ", r, " \xB7 \u0E2B\u0E0D\u0E34\u0E07 ", c, " \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", k.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#7c3aed",
                      borderBottom: "none"
                    },
                    children: d.toLocaleString(void 0, {
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
              children: $0.timestamp && new Date($0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), l.length > 0 ? u.jsx(Bu, {
          data: L,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "fluoride" && A0?.patients && (() => {
      const e = A0.patients,
        t = A0.total_income || 0,
        d = A0.total_fluoride_price || 0,
        k = e.length > 0 ? Math.round(t / e.length) : 0;
      e.length > 0 && Math.max(...e.map(p => p.income || 0));
      const r = {};
      e.forEach(p => {
        const l = (p.icd10 || "").trim().toUpperCase();
        l && au.test(l) && (r[l] || (r[l] = {
          code: l,
          name: p.icd10name,
          count: 0,
          totalInc: 0
        }), r[l].count++, r[l].totalInc += p.income || 0)
      });
      const c = Object.values(r).sort((p, l) => l.count - p.count).slice(0, 10),
        o = c.length > 0 ? c[0].count : 1,
        m = {
          "25-34": 0,
          "35-44": 0,
          "45-54": 0,
          "55-59": 0
        };
      e.forEach(p => {
        const l = Number(p.age_y) || 0;
        l < 35 ? m["25-34"]++ : l < 45 ? m["35-44"]++ : l < 55 ? m["45-54"]++ : m["55-59"]++
      });
      const h = Math.max(...Object.values(m), 1),
        A = {
          "25-34": "#3b82f6",
          "35-44": "#10b981",
          "45-54": "#f59e0b",
          "55-59": "#ef4444"
        },
        C = {};
      e.forEach(p => {
        const l = p.pttype_name || "-";
        C[l] || (C[l] = {
          count: 0,
          income: 0
        }), C[l].count++, C[l].income += p.income || 0
      });
      const S = Object.entries(C).sort((p, l) => l[1].count - p[1].count),
        w = new Set(e.map(p => p.hn).filter(Boolean)).size,
        R = Object.entries(m).reduce((p, [l, L]) => L > p[1] ? [l, L] : p, ["", 0]),
        M = e.length > 0 ? Math.round(d / e.length) : 0,
        b = S.length > 0 ? S[0] : null,
        _ = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35): \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${A0.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${w.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C\u0E23\u0E27\u0E21 ${d.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${M.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22${M<50?" \u2014 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E04\u0E32\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A":M>150?" \u2014 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23":""}`];
      if (R[0]) {
        const p = e.length > 0 ? Math.round(R[1] / e.length * 100) : 0;
        _.push(`\u{1F465} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${R[0]} \u0E1B\u0E35 \u0E08\u0E33\u0E19\u0E27\u0E19 ${R[1]} \u0E23\u0E32\u0E22 (${p}%) \u2014 ${R[0]==="55-59"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E43\u0E01\u0E25\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E15\u0E49\u0E2D\u0E07\u0E43\u0E2B\u0E49\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E0A\u0E48\u0E2D\u0E07\u0E1B\u0E32\u0E01\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E42\u0E23\u0E04":R[0]==="25-34"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E19\u0E49\u0E19 health promotion \u0E41\u0E25\u0E30 follow-up periodic":"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E22 \u0E04\u0E27\u0E23\u0E01\u0E23\u0E30\u0E15\u0E38\u0E49\u0E19\u0E04\u0E27\u0E32\u0E21\u0E15\u0E23\u0E30\u0E2B\u0E19\u0E31\u0E01\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E0A\u0E48\u0E2D\u0E07\u0E1B\u0E32\u0E01"}`)
      }
      if (c[0] && _.push(`\u{1F9B7} \u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${c[0].code} ${c[0].name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${c[0].count} \u0E23\u0E32\u0E22 \u2014 ${c[0].code.startsWith("K02")?"\u0E1F\u0E31\u0E19\u0E1C\u0E38 \u0E04\u0E27\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1B\u0E23\u0E07\u0E1F\u0E31\u0E19\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C\u0E17\u0E35\u0E48\u0E1A\u0E49\u0E32\u0E19":"\u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E41\u0E19\u0E27\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`), b) {
        const [p, l] = b, L = e.length > 0 ? Math.round(l.count / e.length * 100) : 0;
        L >= 50 && _.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${p} ${l.count} \u0E23\u0E32\u0E22 (${L}%) \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19`)
      }
      A0.total < 50 && _.push(`\u26A0\uFE0F \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E48\u0E33 (${A0.total} \u0E23\u0E32\u0E22) \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E33 outreach \u0E43\u0E19\u0E0A\u0E38\u0E21\u0E0A\u0E19 \u0E40\u0E0A\u0E48\u0E19 \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E2A\u0E21., \u0E08\u0E31\u0E14\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E43\u0E19\u0E0A\u0E38\u0E21\u0E0A\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07`);
      const H = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: _
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
            value: A0.total.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,.12), rgba(14,165,233,.04))",
            border: "rgba(14,165,233,.25)"
          }, {
            label: "\u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C",
            value: d.toLocaleString(void 0, {
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
            value: k.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#8b5cf6",
            gradient: "linear-gradient(135deg, rgba(139,92,246,.12), rgba(139,92,246,.04))",
            border: "rgba(139,92,246,.25)"
          }, {
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32",
            value: S.length,
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }].map((p, l) => u.jsxs("div", {
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
          }, l))
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
            }), S.map(([p, l], L) => {
              const i = e.length > 0 ? Math.round(l.count / e.length * 100) : 0,
                x = ["#0ea5e9", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"],
                f = x[L % x.length];
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
                      color: f
                    },
                    children: [l.count, " (", i, "%)"]
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
                      width: `${i}%`,
                      borderRadius: "3px",
                      background: f,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, L)
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
              children: Object.entries(m).map(([p, l]) => u.jsxs("div", {
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
                  children: l
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: A[p],
                    height: `${Math.max(8,l/h*60)}px`,
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
              children: c.map((p, l) => {
                const L = o > 0 ? Math.round(p.count / o * 100) : 0;
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
                        width: `${L}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(14,165,233,.25), rgba(14,165,233,.${l===0?"5":"3"}))`,
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
                }, l)
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
            ref: K,
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
                    children: [A0.date_range.start, " \u0E16\u0E36\u0E07 ", A0.date_range.end]
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
                  children: [A0.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                children: L0(e).map((p, l) => {
                  const L = l % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: L,
                      transition: "background .1s"
                    },
                    onMouseEnter: i => i.currentTarget.style.background = "rgba(14,165,233,.05)",
                    onMouseLeave: i => i.currentTarget.style.background = L,
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
                  }, p.vn || l)
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
                    children: [F0 !== "all" && A0.total > F0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", F0, " \u0E08\u0E32\u0E01 ", A0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", A0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", k.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#059669",
                      borderBottom: "none"
                    },
                    children: d.toLocaleString(void 0, {
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
              children: A0.timestamp && new Date(A0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), _.length > 0 ? u.jsx(Bu, {
          data: H,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && (n === "pt" || n === "staff-services") && Y?.patients && (() => {
      const e = Y.patients,
        t = Y.total_income || 0,
        d = e.length > 0 ? Math.round(t / e.length) : 0;
      e.length > 0 && Math.max(...e.map(g => g.income || 0));
      const k = Y.opd_count || e.filter(g => g.visit_type === "OPD").length,
        r = Y.ipd_count || e.filter(g => g.visit_type === "IPD").length,
        c = Y.opd_income || e.filter(g => g.visit_type === "OPD").reduce((g, z) => g + z.income, 0),
        o = Y.ipd_income || e.filter(g => g.visit_type === "IPD").reduce((g, z) => g + z.income, 0),
        m = {};
      e.forEach(g => {
        const z = (g.icd10 || "").trim().toUpperCase();
        z && au.test(z) && (m[z] || (m[z] = {
          code: z,
          name: g.icd10name,
          count: 0,
          totalInc: 0
        }), m[z].count++, m[z].totalInc += g.income || 0)
      });
      const h = Object.values(m).sort((g, z) => z.count - g.count).slice(0, 10),
        A = h.length > 0 ? h[0].count : 1,
        C = {};
      e.forEach(g => {
        const z = g.department || "-";
        C[z] || (C[z] = {
          count: 0,
          income: 0
        }), C[z].count++, C[z].income += g.income || 0
      });
      const S = Object.entries(C).sort((g, z) => z[1].count - g[1].count),
        w = {
          "<18": 0,
          "18-34": 0,
          "35-59": 0,
          "60+": 0
        };
      e.forEach(g => {
        const z = Number(g.age_y) || 0;
        z < 18 ? w["<18"]++ : z < 35 ? w["18-34"]++ : z < 60 ? w["35-59"]++ : w["60+"]++
      });
      const R = Math.max(...Object.values(w), 1),
        M = {
          "<18": "#3b82f6",
          "18-34": "#10b981",
          "35-59": "#f59e0b",
          "60+": "#ef4444"
        },
        b = {};
      e.forEach(g => {
        const z = (g.vstdate || "").substring(0, 10);
        z && (b[z] = b[z] || {
          date: z,
          count: 0,
          income: 0
        }, b[z].count++, b[z].income += g.income || 0)
      });
      const _ = Object.values(b).sort((g, z) => g.date.localeCompare(z.date)),
        H = Math.max(..._.map(g => g.count), 1),
        p = _.reduce((g, z) => g + z.income, 0),
        l = _.length > 0 ? Math.round(e.length / _.length) : 0,
        L = Y.yoy || null,
        i = (g, z) => L == null || z == null || z === 0 ? null : Math.round((g - z) / z * 1e3) / 10,
        x = L && L.total > 0 ? Math.round(L.total_income / L.total) : null,
        f = (g, z, y) => {
          if (g == null) return null;
          const O = g >= 0;
          return {
            text: `${O?"\u25B2":"\u25BC"} ${O?"+":""}${g.toFixed(1)}%`,
            compare: `vs ${(z||0).toLocaleString()} ${y||""}`,
            fg: O ? "#059669" : "#dc2626",
            bg: O ? "rgba(16,185,129,.10)" : "rgba(239,68,68,.10)"
          }
        },
        N = n === "staff-services" ? "\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 & PMC",
        v = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
        $ = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" : "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
        U = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E21\u0E48" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E2B\u0E21\u0E48",
        B = new Set(e.map(g => g.hn).filter(Boolean)).size,
        F = Object.values(e.reduce((g, z) => (z.hn && (g[z.hn] = (g[z.hn] || 0) + 1), g), {})).filter(g => g > 1).length,
        j = e.length - B,
        I = B > 0 ? Math.round(j / e.length * 100) : 0,
        P = _.length > 0 ? _.reduce((g, z) => z.count > g.count ? z : g, _[0]) : null,
        q = _.length > 0 ? _.reduce((g, z) => z.count < g.count ? z : g, _[0]) : null,
        E0 = S.length > 0 ? S[0] : null,
        e0 = h.length > 0 ? h[0] : null,
        v0 = L ? i(Y.total, L.total) : null,
        T0 = L ? i(t, L.total_income) : null,
        q0 = [];
      if (q0.push(`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21${N} (${Y.date_range?.start||""} \u0E16\u0E36\u0E07 ${Y.date_range?.end||""}): ${$} ${Y.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${B.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${d.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22${v0!=null?` \xB7 ${v0>=0?"\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(v0).toFixed(1)}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19`:""}`), T0 != null && Math.abs(T0) >= 20 && q0.push(T0 >= 0 ? `\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D ${T0.toFixed(1)}% YoY (${(L.total_income||0).toLocaleString()} \u2192 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17) \u2014 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19/\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E49\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E01\u0E29\u0E32\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23` : `\u{1F4C9} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E25\u0E07 ${Math.abs(T0).toFixed(1)}% YoY \u2014 \u0E04\u0E27\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38: \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 \xB7 \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14 \xB7 \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2B\u0E32\u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A`), P && q && P.date !== q.date && _.length >= 3 && q0.push(`\u{1F4C5} \u0E27\u0E31\u0E19\u0E17\u0E35\u0E48${v}\u0E21\u0E32\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${P.date.substring(5)} (${P.count} \u0E23\u0E32\u0E22) \xB7 \u0E19\u0E49\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${q.date.substring(5)} (${q.count} \u0E23\u0E32\u0E22) \u2014 ${P.count>q.count*3?"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \u0E04\u0E27\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E27\u0E48\u0E32\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E19\u0E49\u0E2D\u0E22\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32 (\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14/\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22) \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \u0E41\u0E25\u0E30\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E23\u0E31\u0E1A\u0E20\u0E32\u0E23\u0E30\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E21\u0E32\u0E01":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E1B\u0E01\u0E15\u0E34"}`), E0) {
        const [g, z] = E0, y = e.length > 0 ? Math.round(z.count / e.length * 100) : 0;
        q0.push(`\u{1F3E5} \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${g.replace(/^\d+\s*/,"")} ${z.count} \u0E23\u0E32\u0E22 (${y}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${(z.income||0).toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17${y>=60?" \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E44\u0E1B\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E2D\u0E37\u0E48\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07":""}`)
      }
      if (e0 && au.test(e0.code) && q0.push(`\u{1FA7A} \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${e0.code} ${e0.name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${e0.count} \u0E23\u0E32\u0E22 \u2014 ${e0.code.startsWith("M")?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E01\u0E25\u0E49\u0E32\u0E21\u0E40\u0E19\u0E37\u0E49\u0E2D/\u0E02\u0E49\u0E2D \u0E04\u0E27\u0E23\u0E23\u0E30\u0E1A\u0E38\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07/\u0E23\u0E30\u0E22\u0E30\u0E43\u0E2B\u0E49\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E2B\u0E31\u0E2A\u0E44\u0E14\u0E49\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33":"\u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E33 protocol \u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E"}`), B > 0 && I >= 5 && q0.push(`\u{1F501} \u0E21\u0E35${v}\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33 ${j.toLocaleString()} visits \u0E08\u0E32\u0E01 ${F.toLocaleString()} HN (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${(e.length/B).toFixed(1)} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19) \u2014 ${I>=30?"\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E2A\u0E39\u0E07\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01":"\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E1B\u0E01\u0E15\u0E34 \u2014 \u0E40\u0E19\u0E49\u0E19\u0E40\u0E0A\u0E34\u0E0D\u0E0A\u0E27\u0E19"+U+"\u0E40\u0E1E\u0E34\u0E48\u0E21"}`), A && A.length > 0 && A[0]) {
        const g = A[0],
          z = e.length > 0 ? Math.round(g.count / e.length * 100) : 0;
        z >= 50 && q0.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${g.name} ${g.count} \u0E23\u0E32\u0E22 (${z}%) \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \xB7 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 \u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18`)
      }
      const cu = {
        data_source: `AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C${N} \xB7 HOSxP XE Live`,
        timestamp: new Date().toISOString(),
        recommendations: q0
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
          children: [...n === "staff-services" && Y.staff_registry_count ? [{
            label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
            icon: "\u{1F465}",
            value: Y.staff_registry_count.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#7c3aed",
            yoy: (() => {
              const g = B,
                z = Y.staff_registry_count > 0 ? Math.round(g / Y.staff_registry_count * 1e3) / 10 : 0;
              return {
                text: `\u{1F4CA} \u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${g.toLocaleString()} \u0E23\u0E32\u0E22 (${z}%)`,
                compare: `\u0E44\u0E21\u0E48\u0E21\u0E32 ${(Y.staff_registry_count-g).toLocaleString()} \u0E23\u0E32\u0E22`,
                fg: z >= 50 ? "#059669" : "#d97706",
                bg: z >= 50 ? "rgba(16,185,129,.10)" : "rgba(217,119,6,.10)"
              }
            })()
          }] : [], {
            label: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" : "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            icon: "\u{1F465}",
            value: (n === "staff-services" ? B : Y.total).toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#10b981",
            yoy: n === "staff-services" ? (() => {
              const g = i(B, L?.unique_hn),
                z = Y.total.toLocaleString(),
                y = B > 0 ? (Y.total / B).toFixed(1) : "0";
              if (g == null) return {
                text: `${z} visits`,
                compare: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${y} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19`,
                fg: "#64748b",
                bg: "rgba(100,116,139,.08)"
              };
              const O = g >= 0;
              return {
                text: `${O?"\u25B2":"\u25BC"} ${O?"+":""}${g.toFixed(1)}%`,
                compare: `vs ${(L?.unique_hn||0).toLocaleString()} \u0E23\u0E32\u0E22 \xB7 ${z} visits (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${y}/\u0E04\u0E19)`,
                fg: O ? "#059669" : "#dc2626",
                bg: O ? "rgba(16,185,129,.10)" : "rgba(239,68,68,.10)"
              }
            })() : f(i(Y.total, L?.total), L?.total, "\u0E23\u0E32\u0E22")
          }, ...n === "staff-services" ? [{
            label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            icon: "\u{1F4CB}",
            value: Y.total.toLocaleString(),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#0d9488",
            yoy: f(i(Y.total, L?.total), L?.total, "\u0E04\u0E23\u0E31\u0E49\u0E07")
          }] : [], {
            label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (OPD)",
            icon: "\u{1F6AA}",
            value: k.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            yoy: f(i(k, L?.opd_count), L?.opd_count, "\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD)",
            icon: "\u{1F6CF}\uFE0F",
            value: r.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ef4444",
            yoy: f(i(r, L?.ipd_count), L?.ipd_count, "\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            icon: "\u{1F4B0}",
            value: t.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            yoy: f(i(t, L?.total_income), L?.total_income, "\u0E3F")
          }, {
            label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 / \u0E23\u0E32\u0E22",
            icon: "\u{1F4CA}",
            value: d.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#8b5cf6",
            yoy: f(i(d, x), x, "\u0E3F/\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E41\u0E1C\u0E19\u0E01",
            icon: "\u{1F3E5}",
            value: S.length,
            unit: "\u0E41\u0E1C\u0E19\u0E01",
            color: "#ec4899",
            yoy: null
          }].map((g, z) => u.jsxs("div", {
            style: {
              position: "relative",
              overflow: "hidden",
              background: `linear-gradient(180deg, var(--md-surface, #fff) 0%, ${g.color}08 100%)`,
              border: `1px solid ${g.color}25`,
              borderRadius: "16px",
              padding: "16px 18px",
              transition: "transform .2s cubic-bezier(.4,0,.2,1), box-shadow .2s ease",
              cursor: "default",
              boxShadow: "0 1px 2px rgba(0,0,0,.04)"
            },
            onMouseEnter: y => {
              y.currentTarget.style.transform = "translateY(-2px)", y.currentTarget.style.boxShadow = `0 8px 24px ${g.color}25`
            },
            onMouseLeave: y => {
              y.currentTarget.style.transform = "", y.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,.04)"
            },
            children: [u.jsx("div", {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${g.color}, ${g.color}55)`
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
                  background: `${g.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0
                },
                children: g.icon
              }), u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--md-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  lineHeight: 1.3
                },
                children: g.label
              })]
            }), u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                marginBottom: g.yoy ? "10px" : "2px"
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
                children: g.value
              }), u.jsx("span", {
                style: {
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)"
                },
                children: g.unit
              })]
            }), g.yoy ? u.jsxs("div", {
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
                  background: g.yoy.bg,
                  fontSize: "10px",
                  fontWeight: 800,
                  color: g.yoy.fg,
                  letterSpacing: "0.02em"
                },
                children: g.yoy.text
              }), u.jsx("span", {
                style: {
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: g.yoy.compare
              })]
            }) : null]
          }, z))
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
            }), S.map(([g, z], y) => {
              const O = e.length > 0 ? Math.round(z.count / e.length * 100) : 0,
                i0 = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"],
                z0 = i0[y % i0.length];
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
                    title: g,
                    children: g.replace(/^\d+/, "")
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: z0
                    },
                    children: [z.count, " (", O, "%)"]
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
                      background: z0,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, y)
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
              children: Object.entries(w).map(([g, z]) => u.jsxs("div", {
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
                    color: M[g]
                  },
                  children: z
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: M[g],
                    height: `${Math.max(8,z/R*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: g
                })]
              }, g))
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
              children: h.map((g, z) => {
                const y = A > 0 ? Math.round(g.count / A * 100) : 0;
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
                    children: g.code
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
                        width: `${y}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(16,185,129,.25), rgba(16,185,129,.${z===0?"5":"3"}))`,
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
                      children: g.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: g.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [g.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, z)
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
              children: [_.length, " \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", l, " \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \xB7 \u0E23\u0E27\u0E21 ", p.toLocaleString(), " \u0E1A\u0E32\u0E17"]
            })]
          }), _.length === 0 ? u.jsx("div", {
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
            children: _.map(g => u.jsxs("div", {
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                minWidth: 0
              },
              title: `${g.date} \xB7 ${g.count} \u0E23\u0E32\u0E22 \xB7 ${(g.income||0).toLocaleString()} \u0E1A\u0E32\u0E17`,
              children: [u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 900,
                  color: "#06b6d4"
                },
                children: g.count
              }), u.jsx("div", {
                style: {
                  width: "100%",
                  borderRadius: "6px 6px 0 0",
                  background: "linear-gradient(180deg, #06b6d4, #3b82f6)",
                  height: `${Math.max(8,g.count/H*80)}px`,
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
                children: g.date.substring(5)
              })]
            }, g.date))
          })]
        }), u.jsxs("div", {
          className: "rounded-2xl overflow-hidden",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            boxShadow: "0 2px 16px rgba(0,0,0,.05)"
          },
          children: [u.jsxs("div", {
            ref: K,
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
                    children: [Y.date_range.start, " \u0E16\u0E36\u0E07 ", Y.date_range.end]
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
                  children: [Y.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                  children: ["OPD ", k]
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
                children: L0(e).map((g, z) => {
                  const y = z % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent",
                    O = g.visit_type === "IPD";
                  return u.jsxs("tr", {
                    style: {
                      background: y,
                      transition: "background .1s"
                    },
                    onMouseEnter: i0 => i0.currentTarget.style.background = "rgba(59,130,246,.05)",
                    onMouseLeave: i0 => i0.currentTarget.style.background = y,
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        color: "var(--md-text-tertiary)",
                        fontSize: "11px"
                      },
                      children: g.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontWeight: 700
                      },
                      children: g.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: g.hn
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
                        children: g.visit_type
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
                        children: g.pttype_name
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 800,
                        color: Number(g.age_y) >= 60 ? "#ef4444" : Number(g.age_y) >= 35 ? "#f59e0b" : "#10b981"
                      },
                      children: g.age_y
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        letterSpacing: ".02em"
                      },
                      children: g.cid
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "11px"
                      },
                      children: g.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: g.department,
                      children: g.department
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
                      title: g.ward_name,
                      children: g.ward_name || "\u2014"
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
                      title: g.address,
                      children: g.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: g.mobile_phone_number || u.jsx("span", {
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
                      children: g.icd10 || "\u2014"
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
                      title: g.icd10name,
                      children: g.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 900,
                        fontSize: "12px",
                        background: g.income >= 2e3 ? "rgba(59,130,246,.08)" : g.income >= 1e3 ? "rgba(59,130,246,.04)" : "transparent",
                        color: g.income >= 2e3 ? "#1d4ed8" : g.income >= 500 ? "#3b82f6" : "var(--md-text-primary)"
                      },
                      children: g.income ? g.income.toLocaleString() : "\u2014"
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
                      title: g.chief_complaint,
                      children: g.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, g.vn || z)
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
                    children: [F0 !== "all" && Y.total > F0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", F0, " \u0E08\u0E32\u0E01 ", Y.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", Y.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 OPD ", k, " (", c.toLocaleString(), " \u0E3F) \xB7 IPD ", r, " (", o.toLocaleString(), " \u0E3F) \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", d.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
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
              children: Y.timestamp && new Date(Y.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), q0.length > 0 ? u.jsx(Bu, {
          data: cu,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "ncd-disease" && J && (() => {
      const {
        pts: e,
        totalIncome: t,
        uniquePatients: d,
        avgIncome: k,
        maleCount: r,
        femaleCount: c,
        ageGroups: o,
        ageMax: m,
        topIcd: h,
        rightList: A
      } = J, C = f0.diseases || ["DM", "HT", "DLP", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD", "Other"], S = f0.disease_labels || {}, w = J.diseaseCountsFE || f0.disease_counts || {}, R = {
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
      }, M = Math.max(...C.map($ => w[$] || 0), 1), b = {
        "<40": "#06b6d4",
        "40-49": "#3b82f6",
        "50-59": "#10b981",
        "60-69": "#f59e0b",
        "70+": "#ef4444"
      }, _ = h.slice(0, 10), H = _.length > 0 ? _[0].count : 1, p = C.filter($ => (w[$] || 0) > 0 && $ !== "Other").sort(($, U) => (w[U] || 0) - (w[$] || 0)), l = p[0], L = p[1], i = ["CKD1", "CKD2", "CKD3", "CKD4", "CKD5"].reduce(($, U) => $ + (w[U] || 0), 0), x = (w.CKD3 || 0) + (w.CKD4 || 0) + (w.CKD5 || 0), f = e.length > 0 ? Math.round(t / e.length) : 0, N = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 NCD: ${e.length.toLocaleString()} visits \u0E08\u0E32\u0E01 ${d.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33 \xB7 \u0E0A\u0E32\u0E22 ${r} \u0E23\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07 ${c} \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${f.toLocaleString()} \u0E1A\u0E32\u0E17/visit`];
      if (l && N.push(`\u{1FA7A} \u0E42\u0E23\u0E04\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${S[l]||l} ${(w[l]||0).toLocaleString()} \u0E23\u0E32\u0E22${L?` \xB7 \u0E23\u0E2D\u0E07\u0E21\u0E32 ${S[L]||L} ${(w[L]||0).toLocaleString()} \u0E23\u0E32\u0E22`:""}${["DM","HT","DLP"].includes(l)?" \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19 NCD \u0E04\u0E27\u0E23\u0E40\u0E02\u0E49\u0E21\u0E07\u0E27\u0E14\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07 self-care + \u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25 HbA1c/BP":l==="Stroke"||l==="IHD"?" \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08\u0E2B\u0E25\u0E2D\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 specialist \u0E41\u0E25\u0E30 rehab":""}`), i > 0) {
        const $ = d > 0 ? Math.round(i / d * 100) : 0,
          U = i > 0 ? Math.round(x / i * 100) : 0;
        N.push(`\u{1FAC0} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E23\u0E27\u0E21 ${i.toLocaleString()} \u0E23\u0E32\u0E22 (${$}% \u0E02\u0E2D\u0E07 HN) \xB7 \u0E23\u0E30\u0E22\u0E30 3-5 ${x.toLocaleString()} \u0E23\u0E32\u0E22 (${U}%) \u2014 ${x>=50?"\u{1F534} \u0E21\u0E35 CKD \u0E23\u0E30\u0E22\u0E30\u0E25\u0E36\u0E01\u0E08\u0E33\u0E19\u0E27\u0E19\u0E21\u0E32\u0E01 \u0E15\u0E49\u0E2D\u0E07 early referral \u0E44\u0E1B\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 nephrology + \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 dialysis":x>=10?"\u{1F7E0} \u0E04\u0E27\u0E23 monitor eGFR \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 + \u0E1B\u0E23\u0E31\u0E1A\u0E22\u0E32\u0E43\u0E2B\u0E49\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07":"\u{1F7E2} \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E22\u0E30\u0E15\u0E49\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E19\u0E49\u0E19 primary prevention"}`)
      }
      if (_[0] && N.push(`\u{1F48A} \u0E23\u0E2B\u0E31\u0E2A ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E2A\u0E38\u0E14: ${_[0].code} ${_[0].name||""} (${_[0].count} \u0E23\u0E32\u0E22) \u2014 ${_[0].code.startsWith("E11")||_[0].code.startsWith("E10")?"DM \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 complications: retinopathy, neuropathy, nephropathy":_[0].code.startsWith("I10")?"Hypertension \u0E04\u0E27\u0E23 monitor BP \u0E17\u0E38\u0E01 visit + \u0E1B\u0E23\u0E31\u0E1A lifestyle":_[0].code.startsWith("N18")?"CKD progression \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E43\u0E01\u0E25\u0E49\u0E0A\u0E34\u0E14":"\u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 comorbidities \u0E40\u0E1E\u0E37\u0E48\u0E2D holistic care"}`), (w.DM || 0) > 0 && (w.HT || 0) > 0) {
        const $ = Math.min(w.DM, w.HT);
        N.push(`\u26A0\uFE0F \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 DM + HT \u0E23\u0E48\u0E27\u0E21: \u0E04\u0E32\u0E14\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${$.toLocaleString()} \u0E23\u0E32\u0E22 (overlap) \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 CV/CKD \u0E2A\u0E39\u0E07 \xB7 \u0E04\u0E27\u0E23\u0E21\u0E35 integrated NCD clinic \u0E17\u0E35\u0E48\u0E14\u0E39\u0E41\u0E25\u0E04\u0E23\u0E1A\u0E17\u0E31\u0E49\u0E07 2 \u0E42\u0E23\u0E04\u0E43\u0E19\u0E04\u0E23\u0E31\u0E49\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27 \u0E25\u0E14 visit \u0E0B\u0E49\u0E33`)
      }
      N.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22: NCD \u0E40\u0E1B\u0E47\u0E19 70% \u0E02\u0E2D\u0E07 DALYs \u0E43\u0E19\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22 \xB7 \u0E04\u0E27\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07 patient registry, integrated care pathway, telehealth follow-up \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HbA1c<7%, BP<140/90 \u0E43\u0E19\u0E17\u0E38\u0E01 guidelines");
      const v = {
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
            value: d.toLocaleString(),
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
            value: k.toLocaleString(),
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
          }].map(($, U) => u.jsxs("div", {
            style: {
              background: $.gradient,
              border: `1px solid ${$.border}`,
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
              children: $.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: $.color,
                lineHeight: 1.1
              },
              children: [$.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: $.unit
              })]
            })]
          }, U))
        }), (() => {
          const $ = ["DM", "HT", "DLP", "IHD", "Stroke", "COPD"].filter(P => C.includes(P)),
            U = ["CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD"].filter(P => C.includes(P)),
            B = w.Other || 0,
            F = U.reduce((P, q) => P + (w[q] || 0), 0),
            j = ({
              dg: P
            }) => {
              const q = w[P] || 0,
                E0 = e.length > 0 ? Math.round(q / e.length * 100) : 0,
                e0 = R[P] || "#7c3aed";
              return u.jsxs("div", {
                style: {
                  background: `linear-gradient(135deg, ${e0}14, ${e0}06)`,
                  border: `1px solid ${e0}33`,
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
                    background: e0,
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
                      color: e0,
                      letterSpacing: ".02em"
                    },
                    children: P
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: e0,
                      opacity: .85,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: `${e0}1a`
                    },
                    children: [E0, "%"]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    lineHeight: 1
                  },
                  children: [q.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "5px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: S[P],
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: S[P]
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
                      width: `${q/M*100}%`,
                      borderRadius: "2px",
                      background: e0,
                      transition: "width .5s ease"
                    }
                  })
                })]
              })
            },
            I = ({
              dg: P
            }) => {
              const q = w[P] || 0,
                E0 = F > 0 ? Math.round(q / F * 100) : 0,
                e0 = R[P] || "#10b981",
                v0 = P === "CKD" ? "?" : P.replace("CKD", "");
              return u.jsxs("div", {
                style: {
                  background: "var(--md-surface)",
                  border: `1px solid ${e0}30`,
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
                      background: e0,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      letterSpacing: ".03em"
                    },
                    children: ["Stage ", v0]
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: [E0, "%"]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: e0,
                    lineHeight: 1
                  },
                  children: [q.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "4px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: S[P],
                  style: {
                    fontSize: "9px",
                    color: "var(--md-text-tertiary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600
                  },
                  children: S[P]?.replace(/^CKD Stage \d+ /, "").replace(/^CKD /, "")
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
                  gridTemplateColumns: `repeat(${Math.min($.length,6)}, minmax(0, 1fr))`,
                  gap: "10px"
                },
                children: $.map(P => u.jsx(j, {
                  dg: P
                }, P))
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
                  children: ["\u0E23\u0E27\u0E21 ", F.toLocaleString(), " visit"]
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
                children: U.map(P => u.jsx(I, {
                  dg: P
                }, P))
              })]
            }), B > 0 && u.jsxs("div", {
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
                  children: S.Other || "\u0E21\u0E32\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 NCD \u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04 NCD"
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
                  children: B.toLocaleString()
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
                  children: ["(", e.length > 0 ? Math.round(B / e.length * 100) : 0, "%)"]
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
            }), A.slice(0, 8).map(([$, U], B) => {
              const F = e.length > 0 ? Math.round(U.count / e.length * 100) : 0,
                j = ["#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                I = j[B % j.length];
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
                    title: $,
                    children: $
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: I
                    },
                    children: [U.count, " (", F, "%)"]
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
                      width: `${F}%`,
                      borderRadius: "3px",
                      background: I,
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
              children: Object.entries(o).map(([$, U]) => u.jsxs("div", {
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
                    color: b[$]
                  },
                  children: U
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: b[$],
                    height: `${Math.max(8,U/m*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: $
                })]
              }, $))
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
              children: _.map(($, U) => {
                const B = H > 0 ? Math.round($.count / H * 100) : 0;
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
                    children: $.code
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
                      children: $.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: $.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [$.totalInc.toLocaleString(), " \u0E3F"]
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
            ref: K,
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
                    children: [f0.date_range.start, " \u0E16\u0E36\u0E07 ", f0.date_range.end]
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
                  children: [d.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                children: L0(e).map(($, U) => {
                  const B = U % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
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
                      children: $.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                      },
                      children: $.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: $.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: $.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899"
                      },
                      children: $.sex || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: $.age_y ?? "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: $.pttype_name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: $.cid || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: $.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px",
                        color: "var(--md-text-tertiary)"
                      },
                      children: $.vsttime || "\u2014"
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
                      title: $.address,
                      children: $.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: $.mobile_phone_number || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(168,85,247,.04)",
                        fontWeight: 800,
                        color: "#a855f7",
                        fontSize: "11px"
                      },
                      children: $.disease_groups || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#059669"
                      },
                      children: $.icd10 || "\u2014"
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
                      title: $.icd10name,
                      children: $.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.025)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        color: "var(--md-text-secondary)"
                      },
                      children: $.creatinine != null ? Number($.creatinine).toFixed(2) : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.025)",
                        fontWeight: 800,
                        color: $.egfr == null ? "var(--md-text-tertiary)" : $.egfr < 30 ? "#dc2626" : $.egfr < 60 ? "#ea580c" : "#059669"
                      },
                      children: $.egfr != null ? $.egfr : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.025)"
                      },
                      children: $.ckd_stage ? u.jsx("span", {
                        style: {
                          padding: "2px 8px",
                          borderRadius: "99px",
                          fontSize: "10px",
                          fontWeight: 800,
                          background: $.ckd_stage === "CKD5" ? "rgba(220,38,38,.12)" : $.ckd_stage === "CKD4" ? "rgba(234,88,12,.12)" : $.ckd_stage === "CKD3" ? "rgba(245,158,11,.12)" : "rgba(16,185,129,.12)",
                          color: $.ckd_stage === "CKD5" ? "#dc2626" : $.ckd_stage === "CKD4" ? "#ea580c" : $.ckd_stage === "CKD3" ? "#d97706" : "#059669"
                        },
                        children: $.ckd_stage
                      }) : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(59,130,246,.04)",
                        fontWeight: 800,
                        color: "#2563eb"
                      },
                      children: $.income ? $.income.toLocaleString() : "\u2014"
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
                      title: $.chief_complaint,
                      children: $.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, $.vn || U)
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
                    children: [F0 !== "all" && e.length > F0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", F0, " \u0E08\u0E32\u0E01 ", e.length.toLocaleString(), " visit \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", e.length.toLocaleString(), " visit \xB7 ", d.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", k.toLocaleString(), " \u0E1A\u0E32\u0E17/visit"]
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
              children: f0.timestamp && new Date(f0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), N.length > 0 ? u.jsx(Bu, {
          data: v,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "imaging-services" && a0?.patients && (() => {
      const e = a0.patients,
        t = a0.services || ["XRAY", "CT", "Portable", "BMD"],
        d = a0.service_labels || {},
        k = a0.service_counts || {},
        r = a0.total_income || 0,
        c = a0.total_imaging_price || 0,
        o = a0.unique_patients || 0,
        m = e.length > 0 ? Math.round(c / e.length) : 0,
        h = e.filter(B => B.sex === "\u0E0A\u0E32\u0E22").length,
        A = e.filter(B => B.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
        C = {
          XRAY: "#3b82f6",
          CT: "#7c3aed",
          Portable: "#f59e0b",
          BMD: "#ec4899"
        },
        S = Math.max(...t.map(B => k[B] || 0), 1),
        w = {
          "<20": 0,
          "20-39": 0,
          "40-59": 0,
          "60-79": 0,
          "80+": 0
        };
      e.forEach(B => {
        const F = Number(B.age_y) || 0;
        F < 20 ? w["<20"]++ : F < 40 ? w["20-39"]++ : F < 60 ? w["40-59"]++ : F < 80 ? w["60-79"]++ : w["80+"]++
      });
      const R = Math.max(...Object.values(w), 1),
        M = {
          "<20": "#06b6d4",
          "20-39": "#3b82f6",
          "40-59": "#10b981",
          "60-79": "#f59e0b",
          "80+": "#ef4444"
        },
        b = {};
      e.forEach(B => {
        (B.icd_pairs || "").split("||").filter(Boolean).forEach(F => {
          const [j, I] = F.split("::"), P = (j || "").trim().toUpperCase();
          !P || !au.test(P) || (b[P] || (b[P] = {
            code: P,
            name: I || "",
            count: 0,
            totalInc: 0
          }), b[P].count++, b[P].totalInc += B.income || 0)
        })
      });
      const _ = Object.values(b).sort((B, F) => F.count - B.count).slice(0, 10),
        H = _.length > 0 ? _[0].count : 1,
        p = {};
      e.forEach(B => {
        const F = B.pttype_name || "-";
        p[F] || (p[F] = {
          count: 0,
          income: 0
        }), p[F].count++, p[F].income += B.income || 0
      });
      const l = Object.entries(p).sort((B, F) => F[1].count - B[1].count),
        L = t.reduce((B, F) => B + (k[F] || 0), 0),
        i = t.reduce((B, F) => (k[F] || 0) > (k[B] || 0) ? F : B, t[0]),
        x = Object.entries(w).reduce((B, [F, j]) => j > B[1] ? [F, j] : B, ["", 0]),
        f = e.length > 0 ? Math.round(c / e.length) : 0,
        N = _.length > 0 ? _[0] : null,
        v = l.length > 0 ? l[0] : null,
        $ = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32: ${e.length.toLocaleString()} visits \u0E08\u0E32\u0E01 ${o.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33 \xB7 \u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 ${c.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${f.toLocaleString()} \u0E1A\u0E32\u0E17/visit \xB7 \u0E0A\u0E32\u0E22 ${h} / \u0E2B\u0E0D\u0E34\u0E07 ${A}`];
      if (i && L > 0) {
        const B = Math.round((k[i] || 0) / L * 100);
        $.push(`\u{1FA7B} \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${i} ${(k[i]||0).toLocaleString()} \u0E04\u0E23\u0E31\u0E49\u0E07 (${B}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14) \u2014 ${i==="XRAY"?"X-Ray \u0E40\u0E1B\u0E47\u0E19 routine \u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 \u0E04\u0E27\u0E23 monitor TAT \u0E43\u0E2B\u0E49 \u226430 \u0E19\u0E32\u0E17\u0E35":i==="CT"?"CT \u0E21\u0E35\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E2A\u0E39\u0E07 \u0E15\u0E49\u0E2D\u0E07 justify clinical indication \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E02\u0E49\u0E21\u0E07\u0E27\u0E14 \u0E25\u0E14 unnecessary scan":i==="Portable"?"Portable X-Ray \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E40\u0E15\u0E35\u0E22\u0E07 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E25\u0E30 infection control":"\u0E15\u0E23\u0E27\u0E08\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01 \u0E04\u0E27\u0E23\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A T-score follow-up plan"}`)
      }
      if (x[0]) {
        const B = e.length > 0 ? Math.round(x[1] / e.length * 100) : 0;
        $.push(`\u{1F465} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${x[0]} \u0E1B\u0E35 ${x[1]} \u0E23\u0E32\u0E22 (${B}%) \u2014 ${x[0]==="60-79"||x[0]==="80+"?"\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2B\u0E25\u0E31\u0E01 \u0E04\u0E27\u0E23\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 CXR + BMD \u0E40\u0E1B\u0E47\u0E19\u0E0A\u0E38\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35":x[0]==="40-59"?"\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E08\u0E32\u0E01 trauma \u0E2B\u0E23\u0E37\u0E2D chronic disease screening":"\u0E27\u0E31\u0E22\u0E2B\u0E19\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E27/\u0E40\u0E14\u0E47\u0E01 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E08\u0E32\u0E01 trauma + acute condition"}`)
      }
      if (N && $.push(`\u{1F50D} \u0E02\u0E49\u0E2D\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22: ${N.code} ${N.name||""} (${N.count} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${N.totalInc.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17) \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E15\u0E32\u0E21 ACR appropriateness criteria`), v) {
        const [B, F] = v, j = e.length > 0 ? Math.round(F.count / e.length * 100) : 0;
        j >= 40 && $.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${B} ${F.count} \u0E04\u0E23\u0E31\u0E49\u0E07 (${j}%) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${F.income.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17`)
      }
      $.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E23\u0E31\u0E07\u0E2A\u0E35: (1) \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A TAT \u0E02\u0E2D\u0E07 report turnaround \u226424 \u0E0A\u0E21. \xB7 (2) Audit indication \u0E02\u0E2D\u0E07 CT \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 (3) \u0E25\u0E14 radiation exposure \u0E15\u0E32\u0E21 ALARA \xB7 (4) Tele-radiology \u0E40\u0E1E\u0E37\u0E48\u0E2D second opinion \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19");
      const U = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: $
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
            value: o.toLocaleString(),
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
            value: m.toLocaleString(),
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
          }].map((B, F) => u.jsxs("div", {
            style: {
              background: B.gradient,
              border: `1px solid ${B.border}`,
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
              children: B.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: B.color,
                lineHeight: 1.1
              },
              children: [B.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: B.unit
              })]
            })]
          }, F))
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
            children: t.map(B => {
              const F = k[B] || 0,
                j = e.length > 0 ? Math.round(F / e.length * 100) : 0,
                I = C[B] || "#7c3aed";
              return u.jsxs("div", {
                style: {
                  background: `linear-gradient(135deg, ${I}14, ${I}06)`,
                  border: `1px solid ${I}33`,
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
                    background: I,
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
                      color: I,
                      letterSpacing: ".02em"
                    },
                    children: B
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: I,
                      opacity: .85,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: `${I}1a`
                    },
                    children: [j, "%"]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    lineHeight: 1
                  },
                  children: [F.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "5px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: d[B],
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: d[B]
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
                      width: `${F/S*100}%`,
                      borderRadius: "2px",
                      background: I,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, B)
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
            }), l.slice(0, 8).map(([B, F], j) => {
              const I = e.length > 0 ? Math.round(F.count / e.length * 100) : 0,
                P = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                q = P[j % P.length];
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
                    title: B,
                    children: B
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: q
                    },
                    children: [F.count, " (", I, "%)"]
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
                      width: `${I}%`,
                      borderRadius: "3px",
                      background: q,
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
              children: Object.entries(w).map(([B, F]) => u.jsxs("div", {
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
                    color: M[B]
                  },
                  children: F
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: M[B],
                    height: `${Math.max(8,F/R*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: B
                })]
              }, B))
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
              children: _.map((B, F) => {
                const j = H > 0 ? Math.round(B.count / H * 100) : 0;
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
                    children: B.code
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
                        background: `linear-gradient(90deg, rgba(168,85,247,.25), rgba(168,85,247,.${F===0?"5":"3"}))`,
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
                      children: B.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: B.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [B.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, F)
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
            ref: K,
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
                    children: [a0.date_range.start, " \u0E16\u0E36\u0E07 ", a0.date_range.end]
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
                  children: [o.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                children: L0(e).map((B, F) => {
                  const j = F % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
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
                      children: B.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                      },
                      children: B.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: B.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: B.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899"
                      },
                      children: B.sex || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: B.age_y ?? "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: B.pttype_name || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: B.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(124,58,237,.04)",
                        fontWeight: 800,
                        color: "#7c3aed",
                        fontSize: "11px"
                      },
                      children: B.service_groups || "\u2014"
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
                      title: B.service_names,
                      children: B.service_names || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.04)",
                        fontWeight: 800,
                        color: "#059669"
                      },
                      children: B.imaging_price ? B.imaging_price.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(168,85,247,.03)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#a855f7"
                      },
                      children: B.icd10 || "\u2014"
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
                      title: B.icd10name,
                      children: B.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(59,130,246,.04)",
                        fontWeight: 800,
                        color: "#2563eb"
                      },
                      children: B.income ? B.income.toLocaleString() : "\u2014"
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
                      title: B.chief_complaint,
                      children: B.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, B.vn || F)
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
                    children: [F0 !== "all" && e.length > F0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", F0, " \u0E08\u0E32\u0E01 ", e.length.toLocaleString(), " visit \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", e.length.toLocaleString(), " visit \xB7 ", o.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 Imaging:"]
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
              children: a0.timestamp && new Date(a0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), $.length > 0 ? u.jsx(Bu, {
          data: U,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "pttype-services" && y0?.groups && (() => {
      const e = y0.group_order || ["UC", "\u0E02\u0E49\u0E32\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23 / \u0E2D\u0E1B\u0E17", "\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07", "\u0E15\u0E48\u0E32\u0E07\u0E0A\u0E32\u0E15\u0E34 (1.5 \u0E40\u0E17\u0E48\u0E32)", "\u0E15\u0E48\u0E32\u0E07\u0E14\u0E49\u0E32\u0E27", "\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19\u0E2A\u0E31\u0E07\u0E04\u0E21", "\u0E1E\u0E23\u0E1A", "\u0E23\u0E31\u0E10\u0E27\u0E34\u0E2A\u0E32\u0E2B\u0E01\u0E34\u0E08", "\u0E2D\u0E37\u0E48\u0E19\u0E46"],
        t = y0.groups || [],
        d = new Set(ju === null ? e : ju),
        k = t.filter(j => d.has(j.group_name)),
        r = (y0.group_trend || []).filter(j => d.has(j.group_name)),
        c = (y0.summary || []).filter(j => d.has(j.group_name)),
        o = k.reduce((j, I) => j + (I.total_visits || 0), 0),
        m = k.reduce((j, I) => j + (I.opd_visits || 0), 0),
        h = k.reduce((j, I) => j + (I.ipd_admissions || 0), 0),
        A = k.reduce((j, I) => j + (I.er_visits || 0), 0),
        C = k.reduce((j, I) => j + (Math.max(I.opd_hn, I.ipd_hn, I.er_hn) || 0), 0),
        S = j => Number(j || 0).toLocaleString(),
        w = [...k].sort((j, I) => I.total_visits - j.total_visits),
        R = w[0] || null,
        M = o > 0 && R ? Math.round(R.total_visits / o * 100) : 0,
        b = Array.from(new Set(r.map(j => j.ym))).sort(),
        _ = w.map(j => j.group_name),
        H = b.map(j => {
          const I = {
            ym: j
          };
          for (const P of _) {
            const q = r.find(E0 => E0.ym === j && E0.group_name === P);
            I[P] = q ? q.total : 0
          }
          return I
        }),
        p = _.slice(0, 9),
        l = {
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
        L = j => l[j] || "#94a3b8",
        i = _.map(L),
        x = j => {
          const I = ju === null ? [...e] : [...ju],
            P = I.indexOf(j);
          P >= 0 ? I.splice(P, 1) : I.push(j), G0(I)
        },
        f = () => G0(null),
        N = () => G0([]),
        v = H.length > 0 ? H.reduce((j, I) => {
          const P = p.reduce((E0, e0) => E0 + (j[e0] || 0), 0);
          return p.reduce((E0, e0) => E0 + (I[e0] || 0), 0) > P ? I : j
        }, H[0]) : null,
        $ = v ? v.ym : "\u2014",
        U = v ? p.reduce((j, I) => j + (v[I] || 0), 0) : 0,
        B = [];
      if (B.push(`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E0A\u0E48\u0E27\u0E07 ${y0.from} \u2192 ${y0.to}: ${S(o)} \u0E04\u0E23\u0E31\u0E49\u0E07 (OPD ${S(m)} \xB7 IPD ${S(h)} \xB7 ER ${S(A)}) \u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21 ${S(C)} \u0E23\u0E32\u0E22 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22 ${k.length} \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (\u0E08\u0E32\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${e.length} \u0E2B\u0E21\u0E27\u0E14\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19)`), R && M >= 40 && B.push(`\u{1F3E5} \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E48\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${R.group_name} \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ${M}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (${S(R.total_visits)} \u0E04\u0E23\u0E31\u0E49\u0E07) \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23 reimbursement \u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E35\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E1E\u0E34\u0E40\u0E28\u0E29`), h > 0 && m > 0) {
        const j = (h / o * 100).toFixed(1);
        B.push(`\u{1FA7A} \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 IPD ${j}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 \xB7 \u0E2B\u0E32\u0E01 IPD \u0E40\u0E01\u0E34\u0E19 15% \u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E43\u0E14 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A DRG mix \u0E41\u0E25\u0E30 AdjRW \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E40\u0E04\u0E2A\u0E08\u0E23\u0E34\u0E07`)
      }
      v && U > 0 && B.push(`\u{1F4C8} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E1E\u0E35\u0E04: ${$} \u0E21\u0E35\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 ${S(U)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u0E01\u0E25\u0E38\u0E48\u0E21 Top 5) \u2014 \u0E43\u0E0A\u0E49\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19 + \u0E22\u0E32/\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32`), B.push("\u{1F4A1} \u0E41\u0E1C\u0E19\u0E1E\u0E31\u0E12\u0E19\u0E32: 1) \u0E08\u0E31\u0E14\u0E17\u0E33 Dashboard \u0E23\u0E32\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E2A\u0E48\u0E07\u0E17\u0E35\u0E21 UM \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 2) \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C recall rate per pttype 3) Audit \u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E04\u0E48\u0E32\u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 collection rate");
      const F = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: B
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
                onClick: f,
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
            children: e.map(j => {
              const I = d.has(j),
                P = L(j);
              return u.jsxs("label", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 8,
                  border: `1px solid ${I?P:"var(--md-border)"}`,
                  background: I ? `${P}12` : "transparent",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 700,
                  color: I ? P : "var(--md-text-tertiary)",
                  userSelect: "none"
                },
                children: [u.jsx("input", {
                  type: "checkbox",
                  checked: I,
                  onChange: () => x(j),
                  style: {
                    accentColor: P,
                    cursor: "pointer"
                  }
                }), u.jsx("span", {
                  children: j
                })]
              }, j)
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
            value: S(o),
            color: "#0ea5e9"
          }, {
            label: "\u{1F465} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21",
            value: S(C),
            color: "#7c3aed"
          }, {
            label: "\u{1F3E5} OPD",
            value: S(m),
            color: "#10b981"
          }, {
            label: "\u{1F6CF}\uFE0F IPD",
            value: S(h),
            color: "#f59e0b"
          }, {
            label: "\u{1F691} ER",
            value: S(A),
            color: "#f43f5e"
          }, {
            label: "\u{1F4CB} \u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01",
            value: k.length,
            color: "#ec4899"
          }].map((j, I) => u.jsxs("div", {
            style: {
              padding: "10px 12px",
              borderRadius: 10,
              background: `${j.color}10`,
              borderLeft: `4px solid ${j.color}`
            },
            children: [u.jsx("div", {
              style: {
                fontSize: 10,
                fontWeight: 800,
                color: j.color,
                textTransform: "uppercase",
                letterSpacing: ".06em"
              },
              children: j.label
            }), u.jsx("div", {
              style: {
                fontSize: 22,
                fontWeight: 900,
                color: "var(--md-text-primary)",
                fontFamily: "monospace",
                marginTop: 4
              },
              children: j.value
            })]
          }, I))
        }), H.length > 0 && (() => {
          const j = Math.min(5, w.length),
            I = w.slice(0, j),
            P = H.map(g => g.ym),
            q = ["", "\u0E21.\u0E04.", "\u0E01.\u0E1E.", "\u0E21\u0E35.\u0E04.", "\u0E40\u0E21.\u0E22.", "\u0E1E.\u0E04.", "\u0E21\u0E34.\u0E22.", "\u0E01.\u0E04.", "\u0E2A.\u0E04.", "\u0E01.\u0E22.", "\u0E15.\u0E04.", "\u0E1E.\u0E22.", "\u0E18.\u0E04."],
            E0 = g => {
              const z = Number(g.slice(5, 7)),
                y = Number(g.slice(0, 4)),
                O = String((y + 543) % 100).padStart(2, "0");
              return `${q[z]} ${O}`
            },
            e0 = {};
          I.forEach(g => {
            const z = g.group_name;
            let y = 0;
            for (const O of H)(O[z] || 0) > y && (y = O[z] || 0);
            e0[z] = y
          });
          const v0 = H.map(g => {
              const z = I.reduce((y, O) => y + (g[O.group_name] || 0), 0);
              return {
                ym: g.ym,
                total: z
              }
            }),
            T0 = Math.max(...v0.map(g => g.total), 1),
            q0 = g => {
              if (H.length < 2) return null;
              const z = Math.max(1, Math.floor(H.length / 2)),
                y = H.slice(0, z).reduce((z0, T) => z0 + (T[g] || 0), 0),
                O = H.slice(z).reduce((z0, T) => z0 + (T[g] || 0), 0);
              if (y === 0 && O === 0) return null;
              if (y === 0) return {
                arrow: "\u2191",
                color: "#10b981"
              };
              const i0 = (O - y) / y;
              return i0 > .1 ? {
                arrow: "\u2191",
                color: "#10b981"
              } : i0 < -.1 ? {
                arrow: "\u2193",
                color: "#f43f5e"
              } : {
                arrow: "\u2192",
                color: "#94a3b8"
              }
            },
            cu = g => {
              const z = Math.max(.12, Math.min(.92, g));
              return Math.round(z * 255).toString(16).padStart(2, "0")
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
                children: `${H.length} \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E0B\u0E25\u0E25\u0E4C\u0E22\u0E34\u0E48\u0E07\u0E40\u0E02\u0E49\u0E21 = \u0E08\u0E33\u0E19\u0E27\u0E19\u0E21\u0E32\u0E01\u0E43\u0E19\u0E2B\u0E21\u0E27\u0E14\u0E19\u0E31\u0E49\u0E19`
              })]
            }), u.jsx("div", {
              style: {
                width: "100%",
                overflowX: "auto"
              },
              children: u.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: `170px repeat(${P.length}, minmax(64px, 1fr)) 90px`,
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
                }), ...P.map((g, z) => u.jsx("div", {
                  style: {
                    padding: "8px 4px",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "var(--md-text-secondary)",
                    textAlign: "center",
                    borderBottom: "2px solid var(--md-divider)"
                  },
                  children: E0(g)
                }, "h" + z)), u.jsx("div", {
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
                }), ...I.flatMap((g, z) => {
                  const y = g.group_name,
                    O = L(y),
                    i0 = e0[y] || 1,
                    z0 = q0(y);
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
                      children: z + 1
                    }), u.jsx("span", {
                      children: y
                    })]
                  }, `r${z}h`), ...P.map((Su, hu) => {
                    const R0 = H[hu][y] || 0,
                      tu = i0 > 0 ? R0 / i0 : 0,
                      Iu = R0 > 0 ? `${O}${cu(tu*.85)}` : "transparent";
                    return u.jsxs("div", {
                      style: {
                        padding: "10px 4px",
                        textAlign: "center",
                        background: Iu,
                        borderRadius: 4,
                        border: R0 > 0 ? `1px solid ${O}30` : "1px solid transparent",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        minHeight: 50
                      },
                      title: `${y} \u2014 ${E0(Su)}: ${S(R0)} \u0E04\u0E23\u0E31\u0E49\u0E07`,
                      children: [u.jsx("div", {
                        style: {
                          fontSize: 13,
                          fontWeight: 900,
                          fontFamily: "monospace",
                          color: R0 > 0 ? tu > .5 ? "#fff" : "var(--md-text-primary)" : "var(--md-text-tertiary)",
                          lineHeight: 1
                        },
                        children: R0 > 0 ? S(R0) : "\u2014"
                      }), R0 > 0 && u.jsx("div", {
                        style: {
                          fontSize: 9,
                          fontWeight: 600,
                          fontFamily: "monospace",
                          color: tu > .5 ? "rgba(255,255,255,.75)" : "var(--md-text-tertiary)"
                        },
                        children: `${Math.round(tu*100)}%`
                      })]
                    }, `r${z}c${hu}`)
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
                      children: S(g.total_visits)
                    }), z0 && u.jsxs("div", {
                      style: {
                        fontSize: 13,
                        fontWeight: 900,
                        color: z0.color,
                        lineHeight: 1
                      },
                      children: [z0.arrow]
                    })]
                  }, `r${z}t`)]
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
                }), ...v0.map((g, z) => {
                  const y = T0 > 0 ? g.total / T0 : 0;
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
                      children: S(g.total)
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
                          width: `${y*100}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #0ea5e9, #7c3aed)",
                          borderRadius: 3
                        }
                      })
                    })]
                  }, "mt" + z)
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
                  children: S(v0.reduce((g, z) => g + z.total, 0))
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
                children: ["\u0E2B\u0E21\u0E27\u0E14 / \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C", "OPD \u0E04\u0E23\u0E31\u0E49\u0E07", "OPD HN", "IPD \u0E04\u0E23\u0E31\u0E49\u0E07", "IPD HN", "ER \u0E04\u0E23\u0E31\u0E49\u0E07", "ER HN", "\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07", "% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"].map((j, I) => u.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: I === 0 ? "left" : "right",
                    fontWeight: 800,
                    color: "var(--md-text-secondary)",
                    borderBottom: "2px solid var(--md-divider)",
                    fontSize: 11
                  },
                  children: j
                }, I))
              })
            }), u.jsx("tbody", {
              children: w.flatMap((j, I) => {
                const P = o > 0 ? (j.total_visits / o * 100).toFixed(1) : "0.0",
                  q = c.filter(v0 => v0.group_name === j.group_name).sort((v0, T0) => T0.total_visits - v0.total_visits),
                  E0 = u.jsxs("tr", {
                    style: {
                      background: `${L(j.group_name)}10`,
                      borderTop: `2px solid ${L(j.group_name)}40`,
                      borderBottom: "1px solid var(--md-divider)"
                    },
                    children: [u.jsxs("td", {
                      style: {
                        padding: "10px 10px",
                        fontWeight: 900,
                        color: L(j.group_name),
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      },
                      children: [u.jsx("span", {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: 2,
                          background: L(j.group_name),
                          display: "inline-block"
                        }
                      }), u.jsx("span", {
                        children: j.group_name
                      }), u.jsx("span", {
                        style: {
                          fontSize: 10,
                          fontWeight: 600,
                          color: "var(--md-text-tertiary)",
                          marginLeft: 4
                        },
                        children: `(${j.pttype_count} pttype)`
                      })]
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: 800
                      },
                      children: S(j.opd_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: S(j.opd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: 800
                      },
                      children: S(j.ipd_admissions)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: S(j.ipd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: 800
                      },
                      children: S(j.er_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: S(j.er_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontWeight: 900,
                        fontFamily: "monospace",
                        color: "var(--md-text-primary)"
                      },
                      children: S(j.total_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontWeight: 800,
                        color: L(j.group_name),
                        fontFamily: "monospace"
                      },
                      children: `${P}%`
                    })]
                  }, `g${I}`),
                  e0 = q.map((v0, T0) => u.jsxs("tr", {
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
                      }), v0.pttype_name || "\u2014", u.jsx("span", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: 10,
                          color: "var(--md-text-tertiary)",
                          marginLeft: 6
                        },
                        children: `[${v0.pttype}]`
                      })]
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: S(v0.opd_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: S(v0.opd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: S(v0.ipd_admissions)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: S(v0.ipd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: S(v0.er_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: S(v0.er_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: S(v0.total_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "var(--md-text-tertiary)"
                      },
                      children: o > 0 ? `${(v0.total_visits/o*100).toFixed(1)}%` : "\u2014"
                    })]
                  }, `g${I}r${T0}`));
                return [E0, ...e0]
              })
            })]
          }), u.jsx("div", {
            style: {
              marginTop: 8,
              fontSize: 10,
              color: "var(--md-text-tertiary)",
              fontStyle: "italic"
            },
            children: `\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25: ${y0.data_source||"HOSxP XE"} \xB7 \u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 ${new Date(y0.generated_at||Date.now()).toLocaleString("th-TH")}`
          })]
        }), u.jsx(Bu, {
          data: F,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
        })]
      })
    })(), n !== "pt" && n !== "staff-services" && n !== "fluoride" && n !== "elderly-cxr" && n !== "ncd-disease" && n !== "imaging-services" && n !== "pttype-services" && n !== "ipd-compare" && u.jsx(Bu, {
      data: m0,
      theme: "default",
      title: "AI Executive Summary"
    })]
  })
}
const jE = bE.memo(BE);
export {
  jE as
  default
};