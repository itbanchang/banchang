const vu = (n, g0 = vu, k = g0.f || (g0.f = ["assets/xlsx.min-CZi5yKex.js", "assets/vendor-react-ByYOq5k4.js"])) => n.map(A0 => k[A0]);
import {
  _ as du,
  E as yE,
  h as Du
} from "./shared-ui-OVDEF1.js";
import {
  R as bE,
  r as J,
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
  iu = /^[A-Z]\d/i;

function vE(n, g0, k) {
  if (!n?.comparison || !n.fy1_totals || !n.fy2_totals) return null;
  const A0 = n.fy1_totals,
    D = n.fy2_totals,
    t0 = n.comparison.filter(k0 => k0.fy1?.has_data && k0.fy2?.has_data);
  if (t0.length === 0) return {
    headline: `\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E35\u0E07\u0E1A ${g0} \u0E01\u0E31\u0E1A ${k}`,
    empty: !0
  };
  const Q = (k0, y0 = 0) => Number.isFinite(Number(k0)) ? Number(k0) : y0,
    j0 = (k0, y0 = 0) => k0 == null || isNaN(k0) ? "\u2014" : Number(k0).toLocaleString("th-TH", {
      minimumFractionDigits: y0,
      maximumFractionDigits: y0
    }),
    J0 = Q(A0.ipd_discharge),
    H0 = Q(D.ipd_discharge),
    X0 = Q(A0.ipd_deaths),
    R0 = Q(D.ipd_deaths),
    s0 = Q(A0.opd_deaths),
    h0 = Q(D.opd_deaths),
    _0 = Q(A0.total_deaths),
    l0 = Q(D.total_deaths),
    Q0 = Q(A0.ipd_early_deaths),
    r0 = Q(D.ipd_early_deaths),
    H = J0 > 0 ? X0 / J0 * 100 : 0,
    x0 = H0 > 0 ? R0 / H0 * 100 : 0,
    S0 = Q(n.death_growth_pct),
    C0 = X0 > 0 ? Q0 / X0 * 100 : 0,
    d0 = R0 > 0 ? r0 / R0 * 100 : 0;
  let V = null,
    Z0 = -1 / 0;
  for (const k0 of t0) {
    const y0 = k0.fy2?.ipd_mortality_rate || 0;
    y0 > Z0 && (Z0 = y0, V = k0.month)
  }
  let v0, Eu;
  x0 >= 3 ? (v0 = `\u{1F534} IPD Mortality Rate ${x0.toFixed(2)}% \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 3% \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E31\u0E49\u0E07 Mortality Review Committee \u0E20\u0E32\u0E22\u0E43\u0E19 7 \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E17\u0E1A HA accreditation`, Eu = "#f43f5e") : S0 >= 20 ? (v0 = `\u26A0 \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${S0}% \u2014 \u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 FY${k} ${l0} \u0E23\u0E32\u0E22 (FY${g0} ${_0}) \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause`, Eu = "#f59e0b") : x0 <= 1.5 && S0 <= 0 ? (v0 = `\u2705 Mortality Rate \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35 \u2014 IPD Rate ${x0.toFixed(2)}% \xB7 ${S0>=0?"+":""}${S0}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \xB7 Quality of Care \u0E14\u0E35`, Eu = "#10b981") : (v0 = `IPD Mortality ${x0.toFixed(2)}% (FY${g0}: ${H.toFixed(2)}%) \xB7 ${S0>=0?"+":""}${S0}% \xB7 Early Death ${d0.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 IPD`, Eu = "#0ea5e9");
  const $0 = (k0, y0, hu) => k0 <= y0 ? "#10b981" : k0 <= hu ? "#f59e0b" : "#f43f5e",
    N0 = [{
      label: `IPD Mortality Rate (${k})`,
      value: `${x0.toFixed(2)}%`,
      sub: `FY${g0}: ${H.toFixed(2)}%`,
      color: $0(x0, 1.5, 3)
    }, {
      label: "Total Deaths",
      value: j0(l0),
      sub: `${S0>=0?"+":""}${S0}% YoY`,
      color: S0 >= 10 ? "#f43f5e" : S0 >= 0 ? "#f59e0b" : "#10b981"
    }, {
      label: "IPD Deaths",
      value: j0(R0),
      sub: `Discharged ${j0(H0)}`,
      color: "#dc2626"
    }, {
      label: "OPD Deaths",
      value: j0(h0),
      sub: "ER / \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B",
      color: "#f59e0b"
    }, {
      label: "Early Death (<48h)",
      value: j0(r0),
      sub: `${d0.toFixed(1)}% \u0E02\u0E2D\u0E07 IPD Deaths`,
      color: d0 >= 20 ? "#f43f5e" : d0 >= 10 ? "#f59e0b" : "#10b981"
    }, {
      label: "Comparable Months",
      value: `${t0.length}`,
      sub: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49",
      color: "#7c3aed"
    }],
    m0 = [];
  m0.push({
    icon: "\u{1F4CA}",
    title: "Mortality Overview",
    text: `\u0E1B\u0E35\u0E07\u0E1A ${k}: IPD \u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15 ${j0(R0)} \u0E23\u0E32\u0E22 (rate ${x0.toFixed(2)}%) \xB7 OPD \u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15 ${j0(h0)} \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E27\u0E21 ${j0(l0)}. \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A ${g0}: IPD ${j0(X0)} (rate ${H.toFixed(2)}%) \xB7 OPD ${j0(s0)} \xB7 \u0E23\u0E27\u0E21 ${j0(_0)}. \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07 ${S0>=0?"+":""}${S0}%. ` + (x0 > H + .3 ? "\u26A0 Rate \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D" : x0 < H - .3 ? "\u2705 Rate \u0E25\u0E14\u0E25\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D" : "Rate \u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"),
    color: Eu
  }), m0.push({
    icon: "\u23F1\uFE0F",
    title: "Early Death Pattern (LOS < 2 \u0E27\u0E31\u0E19)",
    text: `\u0E1B\u0E35\u0E07\u0E1A ${k}: Early Death ${j0(r0)} \u0E23\u0E32\u0E22 (${d0.toFixed(1)}% \u0E02\u0E2D\u0E07 IPD Deaths) \xB7 \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A ${g0}: ${j0(Q0)} \u0E23\u0E32\u0E22 (${C0.toFixed(1)}%). ` + (d0 >= 30 ? "\u{1F534} >30% \u0E40\u0E1B\u0E47\u0E19 early death \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E32\u0E21\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07\u0E02\u0E2D\u0E07\u0E42\u0E23\u0E04\u0E15\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 \u0E2B\u0E23\u0E37\u0E2D admission criteria \u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E0A\u0E49\u0E32" : d0 >= 15 ? "\u26A0 Early death \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 triage / ER-to-admission flow" : "\u2705 Early death \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"),
    color: d0 >= 30 ? "#f43f5e" : d0 >= 15 ? "#f59e0b" : "#10b981"
  }), V && m0.push({
    icon: "\u{1F4C5}",
    title: "Monthly Mortality Pattern",
    text: `\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 IPD Mortality \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14: ${V} (${Z0.toFixed(2)}%). ` + (Z0 >= 3 ? "\u0E04\u0E27\u0E23\u0E17\u0E33 Retrospective Case Review \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E14\u0E31\u0E07\u0E01\u0E25\u0E48\u0E32\u0E27 \xB7 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C case mix, staffing, equipment readiness" : "Peak \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"),
    color: Z0 >= 3 ? "#f59e0b" : "#10b981"
  });
  const Y0 = [];
  x0 >= 3 && Y0.push(`\u{1F534} IPD Mortality Rate ${x0.toFixed(2)}% \u0E40\u0E01\u0E34\u0E19 threshold 3% \u2014 HA standard compliance risk`), S0 >= 20 && Y0.push(`\u{1F534} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21 ${S0}% \u2014 \u0E15\u0E49\u0E2D\u0E07 M&M Conference \u0E20\u0E32\u0E22\u0E43\u0E19 14 \u0E27\u0E31\u0E19`), d0 >= 30 && Y0.push(`\u{1F534} Early Death \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 ${d0.toFixed(1)}% \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 late admission \u0E2B\u0E23\u0E37\u0E2D severity sorting \u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27`), r0 >= Q0 * 1.5 && Q0 > 0 && Y0.push(`\u{1F7E0} Early Death \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01 ${Q0} \u2192 ${r0} \xB7 investigate ER-to-ward handoff`), h0 > s0 * 1.3 && s0 > 0 && Y0.push(`\u{1F7E0} OPD/ER Deaths \u0E40\u0E1E\u0E34\u0E48\u0E21 ${Math.round((h0-s0)/s0*100)}% \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 ER triage + rapid response`), V && Z0 >= 4 && Y0.push(`\u{1F7E0} \u0E40\u0E14\u0E37\u0E2D\u0E19 ${V} Peak Mortality ${Z0.toFixed(2)}% \u2014 outlier \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E1B\u0E47\u0E19 cluster`), Y0.length === 0 && Y0.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E14\u0E49\u0E32\u0E19 Mortality \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D \u2014 Quality of Care \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35");
  const i0 = [];
  return x0 >= 3 && (i0.push("\u{1F534} P0 \xB7 \u0E15\u0E31\u0E49\u0E07 Mortality Review Board (MRB) \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u2014 review 100% IPD deaths \xB7 \u0E41\u0E22\u0E01 Preventable vs Non-preventable"), i0.push("\u{1F534} P0 \xB7 Re-train CPR/ACLS + Code Blue response \u0E17\u0E38\u0E01 ward \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19")), S0 >= 10 && R0 > 0 && i0.push("\u{1F7E0} P1 \xB7 M&M Conference \u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 focus DRG/DX \u0E17\u0E35\u0E48\u0E21\u0E35 mortality \u0E2A\u0E39\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14"), d0 >= 20 && i0.push("\u{1F7E0} P1 \xB7 ER Triage Audit \xB7 Early Warning Score (NEWS2) compliance check \xB7 ICU availability in 24/7"), V && Z0 >= 3 && i0.push(`\u{1F7E1} P2 \xB7 Retrospective Case Review \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${V} \xB7 deep-dive case mix + intervention timing`), R0 >= 20 && i0.push("\u{1F535} P1 \xB7 \u0E2A\u0E23\u0E49\u0E32\u0E07 Mortality Dashboard \u0E23\u0E32\u0E22 Ward / DRG \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19"), i0.push("\u{1F535} P1 \xB7 Preventable Death Reporting \u2014 \u0E41\u0E22\u0E01\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 intervention \u0E17\u0E35\u0E48\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32\u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C"), h0 > 0 && i0.push("\u{1F7E1} P2 \xB7 ER Mortality Review \u2014 focus DNR/DAMA patterns \xB7 dispatch time \xB7 resuscitation quality"), m0.push({
    icon: "\u26A0\uFE0F",
    title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 / Red Flags",
    list: Y0,
    color: "#f59e0b"
  }), m0.push({
    icon: "\u{1F4A1}",
    title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C (P0\u2013P2)",
    list: i0,
    color: "#10b981"
  }), {
    headline: v0,
    headlineColor: Eu,
    kpi: N0,
    sections: m0,
    footerLeft: `IPD Discharged ${j0(H0)} \xB7 ${t0.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \xB7 FY${g0} vs FY${k} \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function a(n, g0 = 0) {
  return n == null || n === "" || isNaN(n) ? "\u2014" : Number(n).toLocaleString("th-TH", {
    minimumFractionDigits: g0,
    maximumFractionDigits: g0
  })
}
async function q0(n, g0) {
  const k = await fetch(n, g0),
    A0 = k.headers.get("content-type") || "";
  if (!k.ok) {
    if (A0.includes("application/json")) {
      const D = await k.json();
      throw new Error(D.error || `HTTP ${k.status}`)
    }
    throw new Error(`HTTP ${k.status}`)
  }
  if (!A0.includes("json")) throw new Error("\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E01\u0E25\u0E31\u0E1A \u2014 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Backend (port 4001) \u0E17\u0E33\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48");
  return k.json()
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

function DE(n, g0, k, A0 = "OPD") {
  const D = aE[A0] || aE.OPD;
  if (!n?.comparison || !n.fy1_totals || !n.fy2_totals) return null;
  const t0 = n.fy1_totals,
    Q = n.fy2_totals,
    j0 = n.comparable_months || 0;
  if (j0 === 0) return {
    headline: `\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E35\u0E07\u0E1A ${g0} \u0E01\u0E31\u0E1A ${k} \u2014 \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E44\u0E14\u0E49\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E23\u0E1A\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E1B\u0E35`,
    empty: !0
  };
  const J0 = t0.lab_orders + t0.drug_orders + t0.xray_orders,
    H0 = t0.lab_price + t0.drug_price + t0.xray_price,
    X0 = Q.lab_orders + Q.drug_orders + Q.xray_orders,
    R0 = Q.lab_price + Q.drug_price + Q.xray_price,
    s0 = Number(n.overall_orders_growth_pct ?? 0),
    h0 = Number(n.overall_price_growth_pct ?? 0),
    _0 = X0 - J0,
    l0 = R0 - H0,
    Q0 = h0 - s0,
    r0 = (q, X) => X > 0 ? Math.round((q - X) / X * 100) : q > 0 ? 100 : 0,
    H = {
      Lab: {
        ord: r0(Q.lab_orders, t0.lab_orders),
        px: r0(Q.lab_price, t0.lab_price),
        absOrd: Q.lab_orders - t0.lab_orders,
        absPx: Q.lab_price - t0.lab_price
      },
      Drug: {
        ord: r0(Q.drug_orders, t0.drug_orders),
        px: r0(Q.drug_price, t0.drug_price),
        absOrd: Q.drug_orders - t0.drug_orders,
        absPx: Q.drug_price - t0.drug_price
      },
      Xray: {
        ord: r0(Q.xray_orders, t0.xray_orders),
        px: r0(Q.xray_price, t0.xray_price),
        absOrd: Q.xray_orders - t0.xray_orders,
        absPx: Q.xray_price - t0.xray_price
      }
    },
    x0 = {
      Lab: {
        f1: t0.lab_orders ? t0.lab_price / t0.lab_orders : 0,
        f2: Q.lab_orders ? Q.lab_price / Q.lab_orders : 0
      },
      Drug: {
        f1: t0.drug_orders ? t0.drug_price / t0.drug_orders : 0,
        f2: Q.drug_orders ? Q.drug_price / Q.drug_orders : 0
      },
      Xray: {
        f1: t0.xray_orders ? t0.xray_price / t0.xray_orders : 0,
        f2: Q.xray_orders ? Q.xray_price / Q.xray_orders : 0
      }
    },
    S0 = q => q.f1 > 0 ? Math.round((q.f2 - q.f1) / q.f1 * 100) : 0,
    C0 = {
      lab: H0 > 0 ? t0.lab_price / H0 * 100 : 0,
      drug: H0 > 0 ? t0.drug_price / H0 * 100 : 0,
      xray: H0 > 0 ? t0.xray_price / H0 * 100 : 0
    },
    d0 = {
      lab: R0 > 0 ? Q.lab_price / R0 * 100 : 0,
      drug: R0 > 0 ? Q.drug_price / R0 * 100 : 0,
      xray: R0 > 0 ? Q.xray_price / R0 * 100 : 0
    },
    V = Math.round(d0.lab ** 2 + d0.drug ** 2 + d0.xray ** 2),
    Z0 = V >= 5e3 ? {
      text: "\u0E23\u0E27\u0E21\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E2A\u0E39\u0E07",
      color: "#dc2626"
    } : V >= 3500 ? {
      text: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07",
      color: "#f59e0b"
    } : {
      text: "\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E15\u0E31\u0E27\u0E14\u0E35",
      color: "#10b981"
    },
    v0 = H.Drug.px >= H.Lab.px && H.Drug.px >= H.Xray.px ? {
      name: "Drug (\u0E22\u0E32)",
      g: H.Drug.px
    } : H.Lab.px >= H.Xray.px ? {
      name: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
      g: H.Lab.px
    } : {
      name: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)",
      g: H.Xray.px
    },
    Eu = H.Drug.px <= H.Lab.px && H.Drug.px <= H.Xray.px ? {
      name: "Drug (\u0E22\u0E32)",
      g: H.Drug.px
    } : H.Lab.px <= H.Xray.px ? {
      name: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
      g: H.Lab.px
    } : {
      name: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)",
      g: H.Xray.px
    },
    $0 = n.comparison.filter(q => q.fy1.has_data && q.fy2.has_data),
    N0 = [];
  let m0 = null,
    Y0 = null,
    i0 = -1 / 0,
    k0 = 1 / 0;
  for (const q of $0) {
    const X = q.fy1.lab_orders + q.fy1.drug_orders + q.fy1.xray_orders,
      z0 = q.fy2.lab_orders + q.fy2.drug_orders + q.fy2.xray_orders,
      G0 = q.fy1.lab_price + q.fy1.drug_price + q.fy1.xray_price,
      V0 = q.fy2.lab_price + q.fy2.drug_price + q.fy2.xray_price;
    if (X === 0) continue;
    const uu = (z0 - X) / X * 100,
      mu = G0 > 0 ? (V0 - G0) / G0 * 100 : 0;
    N0.push({
      month: q.month,
      g: uu,
      gPx: mu,
      fy1Ord: X,
      fy2Ord: z0,
      fy1Px: G0,
      fy2Px: V0
    }), uu > i0 && (i0 = uu, m0 = q.month), uu < k0 && (k0 = uu, Y0 = q.month)
  }
  let y0 = 0,
    hu = 0;
  if (N0.length >= 2) {
    hu = N0.reduce((X, z0) => X + z0.g, 0) / N0.length;
    const q = N0.reduce((X, z0) => X + (z0.g - hu) ** 2, 0) / N0.length;
    y0 = Math.round(Math.sqrt(q))
  }
  const Bu = y0 >= 30 ? {
    text: "\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E2A\u0E39\u0E07",
    color: "#dc2626"
  } : y0 >= 15 ? {
    text: "\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07",
    color: "#f59e0b"
  } : {
    text: "\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23",
    color: "#10b981"
  };
  let K0 = null;
  if (N0.length >= 4) {
    const q = Math.floor(N0.length / 2),
      X = N0.slice(0, q),
      z0 = N0.slice(N0.length - q),
      G0 = X.reduce((ru, ou) => ru + ou.fy1Px, 0),
      V0 = X.reduce((ru, ou) => ru + ou.fy2Px, 0),
      uu = z0.reduce((ru, ou) => ru + ou.fy1Px, 0),
      mu = z0.reduce((ru, ou) => ru + ou.fy2Px, 0),
      ju = G0 > 0 ? (V0 - G0) / G0 * 100 : 0,
      _u = uu > 0 ? (mu - uu) / uu * 100 : 0,
      fu = _u - ju;
    K0 = {
      h1_label: `${X[0].month}\u2013${X[X.length-1].month}`,
      h2_label: `${z0[0].month}\u2013${z0[z0.length-1].month}`,
      h1_growth: Math.round(ju),
      h2_growth: Math.round(_u),
      accel: Math.round(fu),
      direction: fu >= 3 ? "accelerating" : fu <= -3 ? "decelerating" : "stable"
    }
  }
  const su = [];
  if (N0.length >= 3 && y0 > 0) {
    const q = Math.max(y0 * 1.5, 15);
    for (const X of N0) {
      const z0 = X.g - hu;
      Math.abs(z0) >= q && su.push({
        month: X.month,
        growth: Math.round(X.g),
        deviation: Math.round(z0),
        direction: z0 > 0 ? "spike" : "drop"
      })
    }
  }
  const Su = 12 / j0,
    gu = Math.round(H0 * Su),
    lu = Math.round(R0 * Su),
    $u = lu - gu,
    a0 = {
      Lab: {
        label: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
        icon: "\u{1F9EA}",
        color: "#2563eb",
        share: d0.lab,
        shareFY1: C0.lab,
        unit: x0.Lab,
        absPx: H.Lab.absPx,
        ordG: H.Lab.ord,
        pxG: H.Lab.px
      },
      Drug: {
        label: "Drug (\u0E22\u0E32)",
        icon: "\u{1F48A}",
        color: "#16a34a",
        share: d0.drug,
        shareFY1: C0.drug,
        unit: x0.Drug,
        absPx: H.Drug.absPx,
        ordG: H.Drug.ord,
        pxG: H.Drug.px
      },
      Xray: {
        label: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35)",
        icon: "\u{1FA7B}",
        color: "#db2777",
        share: d0.xray,
        shareFY1: C0.xray,
        unit: x0.Xray,
        absPx: H.Xray.absPx,
        ordG: H.Xray.ord,
        pxG: H.Xray.px
      }
    },
    ku = {};
  for (const [q, X] of Object.entries(a0)) {
    const z0 = S0(X.unit),
      G0 = X.share - X.shareFY1;
    let V0;
    X.pxG >= 5 && X.ordG >= 5 ? V0 = "\u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32" : X.pxG >= 5 && X.ordG < 2 ? V0 = "Value-driven \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19" : X.pxG < 0 && X.ordG > 0 ? V0 = "Margin Compression \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14" : X.pxG < -3 && X.ordG < 0 ? V0 = "\u0E2B\u0E14\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E21\u0E34\u0E15\u0E34" : V0 = "\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E43\u0E19\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1B\u0E01\u0E15\u0E34", ku[q] = {
      label: X.label,
      icon: X.icon,
      color: X.color,
      share: X.share.toFixed(1),
      share_delta: G0.toFixed(1),
      ord_growth: X.ordG,
      px_growth: X.pxG,
      unit_fy2: Math.round(X.unit.f2),
      unit_growth: z0,
      abs_px: X.absPx,
      driver: V0,
      narrative: `${X.label}: \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${X.ordG>=0?"+":""}${X.ordG}% \xB7 \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 ${X.pxG>=0?"+":""}${X.pxG}% (${X.absPx>=0?"+":""}${a(Math.abs(X.absPx))} \u0E1A\u0E32\u0E17) \xB7 \u0E23\u0E32\u0E04\u0E32/\u0E04\u0E23\u0E31\u0E49\u0E07 \u0E3F${a(Math.round(X.unit.f2))} (${z0>=0?"\u2191":"\u2193"}${Math.abs(z0)}%) \xB7 \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 ${X.share.toFixed(1)}% (${G0>=0?"+":""}${G0.toFixed(1)} \u0E08\u0E38\u0E14) \u2014 ${V0}`
    }
  }
  let Z;
  const Iu = h0 - s0,
    tu = `${l0>=0?"+":"\u2212"}\u0E3F${a(Math.abs(l0))}`;
  h0 >= 10 && s0 >= 10 ? Z = `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} \u0E1B\u0E35\u0E07\u0E1A ${k} \u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27\u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 +${h0}% (${tu}) \u0E08\u0E32\u0E01\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${s0}% (${j0} \u0E40\u0E14\u0E37\u0E2D\u0E19) \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E17\u0E31\u0E49\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19` : h0 >= 5 && Iu >= 5 ? Z = `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} +${h0}% (${tu}) \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (${s0}%) \u2014 Yield \u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Complexity / \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A Unit Price \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E22\u0E31\u0E48\u0E07\u0E22\u0E37\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E25\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27` : s0 > 5 && h0 < 0 ? Z = `\u26A0 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 Margin Compression \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${s0}% \u0E41\u0E15\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${h0}% (${tu}) \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14\u0E14\u0E31\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E23\u0E48\u0E07\u0E17\u0E1A\u0E17\u0E27\u0E19 ${D.pricePressure}` : h0 <= -5 && s0 <= 0 ? Z = `\u26A0 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} \u0E2B\u0E14\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E21\u0E34\u0E15\u0E34 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${s0}% \u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${h0}% (${tu}) \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause \u0E14\u0E48\u0E27\u0E19 (${D.rootCause})` : Z = `\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} ${h0>=0?"\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15":"\u0E2B\u0E14\u0E15\u0E31\u0E27"} ${Math.abs(h0)}% \u0E40\u0E0A\u0E34\u0E07\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (${tu}) \xB7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${s0>=0?"+":""}${s0}% \xB7 Yield ${Q0>=0?"+":""}${Q0.toFixed(1)}pp \xB7 \u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 ${j0} \u0E40\u0E14\u0E37\u0E2D\u0E19`;
  const wu = Math.round(R0 / j0),
    c0 = `Run-rate \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${a(wu)} \u0E1A\u0E32\u0E17/\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E2B\u0E32\u0E01\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E44\u0E14\u0E49\u0E04\u0E23\u0E1A\u0E1B\u0E35 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E44\u0E27\u0E49\u0E17\u0E35\u0E48 ${a(lu)} \u0E1A\u0E32\u0E17 (\u0E40\u0E17\u0E35\u0E22\u0E1A FY${g0} annualized: ${a(gu)} \u0E1A\u0E32\u0E17 \xB7 ${$u>=0?"\u0E1A\u0E27\u0E01":"\u0E25\u0E1A"} ${a(Math.abs($u))} \u0E1A\u0E32\u0E17)`,
    Wu = `\u0E1B\u0E35\u0E07\u0E1A ${k} \u0E21\u0E35\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E23\u0E27\u0E21 ${a(X0)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u0E1B\u0E35\u0E07\u0E1A ${g0}: ${a(J0)} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 ${_0>=0?"+":""}${a(Math.abs(_0))} \u0E04\u0E23\u0E31\u0E49\u0E07 / ${s0>=0?"+":""}${s0}%) \u0E2A\u0E48\u0E27\u0E19\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E23\u0E27\u0E21 ${a(R0)} \u0E1A\u0E32\u0E17 (\u0E1B\u0E35\u0E07\u0E1A ${g0}: ${a(H0)} \u0E1A\u0E32\u0E17 \xB7 ${l0>=0?"+":""}${a(Math.abs(l0))} \u0E1A\u0E32\u0E17 / ${h0>=0?"+":""}${h0}%). Yield Gap = ${Q0>=0?"+":""}${Q0.toFixed(1)} percentage points \u2014 ` + (h0 > s0 + 2 ? "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19, \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E22\u0E32/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E21\u0E35\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19. " : h0 < s0 - 2 ? "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E48\u0E33\u0E25\u0E07 \u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 Generic Substitution, \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D Case Mix \u0E2D\u0E48\u0E2D\u0E19\u0E25\u0E07. " : "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32. ") + c0,
    p0 = `\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E35\u0E07\u0E1A ${k}: Drug ${d0.drug.toFixed(1)}% \xB7 Lab ${d0.lab.toFixed(1)}% \xB7 CT/X-ray ${d0.xray.toFixed(1)}% (\u0E1B\u0E35\u0E07\u0E1A ${g0}: ${C0.drug.toFixed(1)}% / ${C0.lab.toFixed(1)}% / ${C0.xray.toFixed(1)}%). Growth Driver \u0E2B\u0E25\u0E31\u0E01\u0E04\u0E37\u0E2D ${v0.name} (+${v0.g}%) \xB7 \u0E2B\u0E21\u0E27\u0E14\u0E2D\u0E48\u0E2D\u0E19\u0E41\u0E23\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14\u0E04\u0E37\u0E2D ${Eu.name} (${Eu.g>=0?"+":""}${Eu.g}%). HHI = ${a(V)} (${Z0.text}) \u2014 ` + (Math.abs(d0.drug - C0.drug) >= 3 ? `\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Drug ${d0.drug>C0.drug?"\u0E02\u0E22\u0E31\u0E1A\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(d0.drug-C0.drug).toFixed(1)} \u0E08\u0E38\u0E14 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E44\u0E1B\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D` : "Portfolio \u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D"),
    Ru = A0 === "IPD" ? "\u0E0A\u0E48\u0E27\u0E22\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 Ward / DRG \u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Cost per Admission" : "\u0E0A\u0E48\u0E27\u0E22\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Cost Control",
    xu = `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07 \u0E1B\u0E35\u0E07\u0E1A ${k}: Lab \u0E3F${a(Math.round(x0.Lab.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(x0.Lab)>=0?"\u2191":"\u2193"}${Math.abs(S0(x0.Lab))}% \xB7 FY${g0}: \u0E3F${a(Math.round(x0.Lab.f1))}) \xB7 Drug \u0E3F${a(Math.round(x0.Drug.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(x0.Drug)>=0?"\u2191":"\u2193"}${Math.abs(S0(x0.Drug))}% \xB7 FY${g0}: \u0E3F${a(Math.round(x0.Drug.f1))}) \xB7 CT/X-ray \u0E3F${a(Math.round(x0.Xray.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(x0.Xray)>=0?"\u2191":"\u2193"}${Math.abs(S0(x0.Xray))}% \xB7 FY${g0}: \u0E3F${a(Math.round(x0.Xray.f1))}) \u2014 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E19\u0E35\u0E49\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Complexity \u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E23\u0E34\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${Ru}. ` + (x0.Drug.f2 > x0.Drug.f1 * 1.1 ? "Drug Unit Price \u0E1E\u0E38\u0E48\u0E07\u0E40\u0E01\u0E34\u0E19 10% \u2014 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A High-cost Drug List. " : "") + (x0.Xray.f2 > x0.Xray.f1 * 1.1 ? "Imaging Unit Price \u0E1E\u0E38\u0E48\u0E07\u0E40\u0E01\u0E34\u0E19 10% \u2014 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49 CT/MRI \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19. " : "");
  let Fu;
  if (m0 && Y0) {
    const q = Math.round(i0 - k0);
    Fu = `\u0E40\u0E14\u0E37\u0E2D\u0E19 Peak: ${m0} (${i0>=0?"+":""}${Math.round(i0)}%) \xB7 \u0E40\u0E14\u0E37\u0E2D\u0E19 Dip: ${Y0} (${k0>=0?"+":""}${Math.round(k0)}%) \xB7 Spread = ${q} percentage points. ` + (q >= 40 ? "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E2A\u0E39\u0E07 \u2014 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1E\u0E35\u0E04\u0E41\u0E25\u0E30\u0E14\u0E34\u0E1B\u0E21\u0E32\u0E01 \u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23 Staffing, Stock, Capacity \u0E41\u0E1A\u0E1A\u0E22\u0E37\u0E14\u0E2B\u0E22\u0E38\u0E48\u0E19" : q >= 20 ? "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u2014 \u0E21\u0E35 Seasonality \u0E41\u0E15\u0E48\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E44\u0E14\u0E49" : "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E15\u0E48\u0E33 \u2014 Demand \u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D")
  } else Fu = "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Seasonality";
  const P0 = [];
  if (s0 > 10 && h0 < 0 && P0.push(`\u{1F534} Margin Compression: \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${s0}% \u0E41\u0E15\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${h0}% (${tu}) \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14\u0E14\u0E31\u0E19 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Price List / Discount Policy / Insurance Reimbursement Rate`), h0 >= 15 && s0 <= 3 && P0.push(`\u{1F7E0} Single-source Growth: \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E42\u0E15\u0E08\u0E32\u0E01 Unit Price \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01 (+${h0}% vs +${s0}% volume) \u2014 \u0E40\u0E1B\u0E23\u0E32\u0E30\u0E1A\u0E32\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E22\u0E32/\u0E23\u0E35\u0E40\u0E2D\u0E40\u0E08\u0E19\u0E15\u0E4C/\u0E2D\u0E31\u0E15\u0E23\u0E32 \u0E2A\u0E1B\u0E2A\u0E0A. \u0E43\u0E19\u0E1B\u0E35\u0E16\u0E31\u0E14\u0E44\u0E1B`), (H.Drug.ord > 20 || H.Drug.px > 20) && P0.push(`\u{1F534} Drug Utilization \u0E1E\u0E38\u0E48\u0E07 (+${H.Drug.ord}% orders / +${H.Drug.px}% value \xB7 ${H.Drug.absPx>=0?"+":""}\u0E3F${a(Math.abs(H.Drug.absPx))}) \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Polypharmacy, \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49 \u0E41\u0E25\u0E30 Formulary Compliance`), H.Xray.ord > 15 && H.Xray.ord > s0 * 1.5 + 5 && P0.push(`\u{1F7E0} Imaging \u0E42\u0E15\u0E40\u0E23\u0E47\u0E27\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21 (+${H.Xray.ord}% vs ${s0}%) \u2014 \u0E23\u0E30\u0E27\u0E31\u0E07 Defensive Medicine / Over-ordering \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Guideline`), h0 < -10 && P0.push(`\u{1F534} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} \u0E2B\u0E14\u0E15\u0E31\u0E27 ${h0}% (${tu}) \u2014 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 ${D.rootCause} \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19\u0E14\u0E48\u0E27\u0E19`), Math.max(d0.drug, d0.lab, d0.xray) > 70) {
    const q = d0.drug >= d0.lab && d0.drug >= d0.xray ? "Drug" : d0.lab >= d0.xray ? "Lab" : "CT/X-ray";
    P0.push(`\u{1F7E0} Concentration Risk: \u0E2B\u0E21\u0E27\u0E14 ${q} \u0E04\u0E23\u0E2D\u0E07\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E19 70% (HHI=${a(V)}) \u2014 \u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E2B\u0E32\u0E01\u0E40\u0E01\u0E34\u0E14 Supply Disruption \u0E08\u0E30\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35`)
  }
  if (y0 >= 30 && P0.push(`\u{1F7E0} Volatility \u0E2A\u0E39\u0E07 (SD=${y0}%) \u2014 \u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Inventory \u0E41\u0E25\u0E30 Staffing \u0E22\u0E32\u0E01 \u0E04\u0E27\u0E23\u0E43\u0E0A\u0E49 Safety Stock \u0E17\u0E35\u0E48\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19`), su.length > 0) {
    const q = su.slice(0, 2).map(X => `${X.month} (${X.growth>=0?"+":""}${X.growth}%)`).join(", ");
    P0.push(`\u{1F7E1} \u0E1E\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19 Outlier ${su.length} \u0E40\u0E14\u0E37\u0E2D\u0E19: ${q}${su.length>2?"\u2026":""} \u2014 \u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E40\u0E0A\u0E34\u0E07 Root Cause (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01, \u0E22\u0E32\u0E02\u0E32\u0E14, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, \u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1E\u0E34\u0E40\u0E28\u0E29)`)
  }
  K0 && K0.direction === "decelerating" && P0.push(`\u{1F7E1} Momentum \u0E0A\u0E30\u0E25\u0E2D\u0E15\u0E31\u0E27 \u2014 \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07 (${K0.h2_label}) \u0E42\u0E15 ${K0.h2_growth}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 (${K0.h1_label}) ${K0.h1_growth}% \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07 ${K0.accel}pp \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E23\u0E34\u0E48\u0E21\u0E0A\u0E30\u0E25\u0E2D`), P0.length === 0 && P0.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E41\u0E25\u0E30\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01");
  const Pu = A0 === "IPD" ? "Cost-per-admission \xB7 Order-per-admission \xB7 Yield-per-DRG" : "Cost-per-visit \xB7 Order-per-visit \xB7 Yield-per-order",
    F0 = A0 === "IPD" ? "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21 Ward / DRG" : "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04",
    Lu = A0 === "IPD" ? 65 : 55,
    I0 = [];
  h0 > 5 ? I0.push(`\u{1F535} P1 \xB7 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30 Supply Chain \u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15 +${h0}% \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2B\u0E21\u0E27\u0E14 ${v0.name} \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E1B\u0E47\u0E19 Growth Driver \u0E2B\u0E25\u0E31\u0E01`) : h0 < -3 && I0.push(`\u{1F534} P0 \xB7 \u0E08\u0E31\u0E14\u0E15\u0E31\u0E49\u0E07 Task Force \u0E1F\u0E37\u0E49\u0E19\u0E1F\u0E39\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${D.short} (${h0}% \xB7 ${tu}) \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Root Cause ${F0} \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19`);
  const Mu = H.Lab.ord > 15 ? "Lab" : H.Xray.ord > 15 ? "CT/X-ray" : H.Drug.ord > 15 ? "Drug" : null;
  return Mu && I0.push(`\u{1F7E1} P2 \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Ordering Protocol \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${Mu} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E38\u0E21 Unnecessary Ordering \u0E41\u0E25\u0E30\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E15\u0E48\u0E2D${A0==="IPD"?"admission":"visit"} (\u0E04\u0E32\u0E14\u0E25\u0E14\u0E44\u0E14\u0E49 5\u201310%)`), m0 && I0.push(`\u{1F535} P1 \xB7 \u0E0A\u0E48\u0E27\u0E07 ${m0} \u0E04\u0E37\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19 Peak Demand \u2014 ${D.peakPlan} \u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 30\u201360 \u0E27\u0E31\u0E19`), y0 >= 20 && I0.push(`\u{1F7E1} P2 \xB7 Volatility \u0E2A\u0E39\u0E07 (SD=${y0}%) \u2014 \u0E1B\u0E23\u0E31\u0E1A Safety Stock \u0E41\u0E25\u0E30 Flexible Staffing Model \u0E40\u0E0A\u0E48\u0E19 On-call pool \u0E2B\u0E23\u0E37\u0E2D Agency staff`), K0 && K0.direction === "decelerating" && h0 > 0 && I0.push(`\u{1F7E1} P2 \xB7 Momentum \u0E0A\u0E30\u0E25\u0E2D (${K0.accel}pp) \u2014 \u0E17\u0E33 Quick Win \u0E43\u0E19\u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E35\u0E07\u0E1A ${A0==="IPD"?"\u0E40\u0E0A\u0E48\u0E19 Enhance Admission pathway, \u0E25\u0E14 AMA/DAMA":"\u0E40\u0E0A\u0E48\u0E19 Campaign \u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07, Chronic Care Follow-up"}`), I0.push(`\u{1F535} P1 \xB7 \u0E2A\u0E23\u0E49\u0E32\u0E07 Executive KPI Dashboard \u0E23\u0E32\u0E22 3 \u0E40\u0E14\u0E37\u0E2D\u0E19: ${Pu} ${F0}`), (H.Drug.px > 15 || d0.drug > Lu) && I0.push("\u{1F534} P0 \xB7 \u0E15\u0E31\u0E49\u0E07 Pharmacy & Therapeutics Committee \u0E17\u0E1A\u0E17\u0E27\u0E19 High-cost Drug List \u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21 Generic Substitution \u0E41\u0E25\u0E30 Therapeutic Interchange"), H.Xray.ord > 15 && I0.push(`\u{1F7E1} P2 \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32 Clinical Decision Support \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07 CT/X-ray ${D.imagingNote} (\u0E04\u0E32\u0E14\u0E25\u0E14 Inappropriate Imaging 10\u201320%)`), V >= 5e3 && I0.push(`\u{1F7E1} P2 \xB7 HHI=${a(V)} \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u2014 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Diversification \u0E02\u0E2D\u0E07 Service Portfolio \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E0A\u0E34\u0E07 Operational`), {
    headline: Z,
    kpi: {
      orders_growth_pct: s0,
      price_growth_pct: h0,
      orders_abs_diff: _0,
      price_abs_diff: l0,
      yield_delta: Q0,
      volatility: y0,
      vol_level: Bu,
      hhi: V,
      hhi_level: Z0,
      comparable_months: j0,
      annualized_fy1: gu,
      annualized_fy2: lu,
      annualized_gap: $u,
      avg_monthly_px: wu
    },
    trend_analysis: Wu,
    momentum: K0,
    mix_insight: p0,
    unit_economics: xu,
    seasonal_insight: Fu,
    anomalies: su,
    deep_dive: ku,
    risks: P0,
    recommendations: I0,
    meta: {
      comparable_months: j0,
      fy1: g0,
      fy2: k
    }
  }
}

function nu({
  icon: n,
  title: g0,
  text: k,
  list: A0,
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
    }), k && u.jsx("p", {
      style: {
        fontSize: "13px",
        color: "var(--md-text-primary)",
        lineHeight: 1.7,
        margin: 0,
        fontWeight: 500
      },
      children: k
    }), A0 && u.jsx("ul", {
      style: {
        margin: "4px 0 0 0",
        paddingLeft: "18px"
      },
      children: A0.map((t0, Q) => u.jsx("li", {
        style: {
          fontSize: "13px",
          color: "var(--md-text-primary)",
          lineHeight: 1.7,
          fontWeight: 500,
          marginBottom: "3px"
        },
        children: t0
      }, Q))
    })]
  })
}

function Cu({
  label: n,
  value: g0,
  sub: k,
  color: A0 = "#7c3aed",
  accent: D
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
        color: D || A0,
        lineHeight: 1.1
      },
      children: g0
    }), k && u.jsx("div", {
      style: {
        fontSize: "11px",
        color: "var(--md-text-tertiary)",
        marginTop: "3px",
        fontWeight: 600
      },
      children: k
    })]
  })
}

function Gu({
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
  fy2: k,
  level: A0 = "OPD"
}) {
  const D = J.useMemo(() => DE(n, g0, k, A0), [n, g0, k, A0]);
  if (!D) return null;
  const t0 = A0 === "IPD" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01",
    Q = A0 === "IPD" ? "linear-gradient(135deg, rgba(219,39,119,.08), rgba(251,146,60,.05))" : "linear-gradient(135deg, rgba(124,58,237,.08), rgba(14,165,233,.05))";
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
        background: Q,
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
          children: [u.jsx(Cu, {
            label: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 Orders",
            value: `${D.kpi.orders_growth_pct>=0?"+":""}${D.kpi.orders_growth_pct}%`,
            sub: `${D.kpi.orders_abs_diff>=0?"+":""}${a(Math.abs(D.kpi.orders_abs_diff))} \u0E04\u0E23\u0E31\u0E49\u0E07`,
            color: D.kpi.orders_growth_pct >= 0 ? "#16a34a" : "#dc2626"
          }), u.jsx(Cu, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Revenue",
            value: `${D.kpi.price_growth_pct>=0?"+":""}${D.kpi.price_growth_pct}%`,
            sub: `${D.kpi.price_abs_diff>=0?"+":""}\u0E3F${a(Math.abs(D.kpi.price_abs_diff))}`,
            color: D.kpi.price_growth_pct >= 0 ? "#16a34a" : "#dc2626"
          }), u.jsx(Cu, {
            label: "Yield Delta",
            value: `${D.kpi.yield_delta>=0?"+":""}${D.kpi.yield_delta.toFixed(1)}pp`,
            sub: D.kpi.yield_delta >= 2 ? "Case Mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19" : D.kpi.yield_delta <= -2 ? "Margin \u0E16\u0E39\u0E01\u0E01\u0E14" : "\u0E2A\u0E21\u0E14\u0E38\u0E25",
            color: "#7c3aed"
          }), u.jsx(Cu, {
            label: "Volatility (SD)",
            value: `${D.kpi.volatility}%`,
            sub: D.kpi.vol_level.text,
            color: D.kpi.vol_level.color,
            accent: D.kpi.vol_level.color
          }), u.jsx(Cu, {
            label: "Concentration (HHI)",
            value: a(D.kpi.hhi),
            sub: D.kpi.hhi_level.text,
            color: D.kpi.hhi_level.color,
            accent: D.kpi.hhi_level.color
          }), u.jsx(Cu, {
            label: `Run-rate ${k}`,
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
          children: [u.jsx(nu, {
            icon: "\u{1F4CA}",
            title: "Trend Analysis",
            text: D.trend_analysis,
            color: "#7c3aed"
          }), u.jsx(nu, {
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
          children: [D.momentum ? u.jsx(nu, {
            icon: "\u{1F680}",
            title: "Momentum & Acceleration",
            text: `\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 (${D.momentum.h1_label}): ${D.momentum.h1_growth>=0?"+":""}${D.momentum.h1_growth}% \xB7 \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07 (${D.momentum.h2_label}): ${D.momentum.h2_growth>=0?"+":""}${D.momentum.h2_growth}% \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07 ${D.momentum.accel>=0?"+":""}${D.momentum.accel}pp \u2014 ${D.momentum.direction==="accelerating"?"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E23\u0E48\u0E07\u0E15\u0E31\u0E27 \u2014 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E1A\u0E27\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Q3\u2013Q4 \u0E02\u0E2D\u0E07\u0E1B\u0E35\u0E07\u0E1A":D.momentum.direction==="decelerating"?"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E30\u0E25\u0E2D \u2014 \u0E04\u0E27\u0E23\u0E17\u0E33 Quick Win \u0E41\u0E25\u0E30 Mid-year Review":"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E04\u0E07\u0E17\u0E35\u0E48 \u2014 \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E44\u0E14\u0E49"}`,
            color: D.momentum.direction === "accelerating" ? "#10b981" : D.momentum.direction === "decelerating" ? "#f59e0b" : "#0ea5e9"
          }) : u.jsx(nu, {
            icon: "\u{1F680}",
            title: "Momentum & Acceleration",
            text: "\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 4 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E33\u0E19\u0E27\u0E13 Momentum",
            color: "#94a3b8"
          }), u.jsx(nu, {
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
            children: [u.jsx(Gu, {
              item: D.deep_dive.Lab
            }), u.jsx(Gu, {
              item: D.deep_dive.Drug
            }), u.jsx(Gu, {
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
          children: [u.jsx(nu, {
            icon: "\u{1F5D3}\uFE0F",
            title: "Seasonal Pattern",
            text: D.seasonal_insight,
            color: "#8b5cf6"
          }), u.jsx(nu, {
            icon: "\u{1F3AF}",
            title: "Anomaly Detection",
            text: D.anomalies.length === 0 ? "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19 Outlier \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C (threshold = 1.5 \xD7 SD). \u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u2014 \u0E23\u0E30\u0E1A\u0E1A Inventory/Staffing \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33" : `\u0E1E\u0E1A ${D.anomalies.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E1A\u0E19\u0E08\u0E32\u0E01 Trend \u0E40\u0E01\u0E34\u0E19 1.5 \xD7 SD: ${D.anomalies.map(j0=>`${j0.month} (${j0.direction==="spike"?"\u25B2":"\u25BC"}${j0.growth>=0?"+":""}${j0.growth}%)`).join(" \xB7 ")} \u2014 \u0E04\u0E27\u0E23\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause \u0E40\u0E0A\u0E34\u0E07 Operational (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32, \u0E22\u0E32\u0E02\u0E32\u0E14, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, Outbreak)`,
            color: D.anomalies.length === 0 ? "#10b981" : "#f59e0b"
          })]
        }), u.jsx("div", {
          style: {
            marginBottom: "10px"
          },
          children: u.jsx(nu, {
            icon: "\u{1F4C8}",
            title: "Financial Projection \u2014 Annualized Outlook",
            text: `\u0E08\u0E32\u0E01 Run-rate ${D.kpi.comparable_months} \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Annualized FY${k}: \u0E3F${a(D.kpi.annualized_fy2)} \u0E1A\u0E32\u0E17 \xB7 Annualized FY${g0}: \u0E3F${a(D.kpi.annualized_fy1)} \u0E1A\u0E32\u0E17 \xB7 Gap = ${D.kpi.annualized_gap>=0?"+":"\u2212"}\u0E3F${a(Math.abs(D.kpi.annualized_gap))} \u0E1A\u0E32\u0E17. ${D.kpi.annualized_gap>=0?"\u0E2B\u0E32\u0E01\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E44\u0E14\u0E49\u0E04\u0E23\u0E1A\u0E1B\u0E35 \u0E08\u0E30\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19":"\u0E2B\u0E32\u0E01\u0E22\u0E31\u0E07\u0E04\u0E07\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E15\u0E48\u0E2D\u0E44\u0E1B \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E35\u0E08\u0E30\u0E2B\u0E14\u0E15\u0E31\u0E27\u0E08\u0E32\u0E01\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"} \u0E02\u0E49\u0E2D\u0E2A\u0E33\u0E04\u0E31\u0E0D: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E41\u0E1A\u0E1A Linear Extrapolation \u2014 \u0E44\u0E21\u0E48\u0E23\u0E27\u0E21 Seasonality adjustment`,
            color: "#0ea5e9"
          })
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px"
          },
          children: [u.jsx(nu, {
            icon: "\u26A0\uFE0F",
            title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 / Red Flags (\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E23\u0E49\u0E2D\u0E19)",
            list: D.risks,
            color: "#f59e0b"
          }), u.jsx(nu, {
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
  const [n, g0] = J.useState("opd-compare"), [k, A0] = J.useState(null), [D, t0] = J.useState(null), [Q, j0] = J.useState(null), [J0, H0] = J.useState(null), [X0, R0] = J.useState(null), [s0, h0] = J.useState(null), [_0, l0] = J.useState(!0), [Q0, r0] = J.useState(null), H = J.useRef(null), [x0, S0] = J.useState(null), [C0, d0] = J.useState(null), [V, Z0] = J.useState(null), [v0, Eu] = J.useState(null), [$0, N0] = J.useState(null), [m0, Y0] = J.useState(null), [i0, k0] = J.useState(null), [y0, hu] = J.useState(null), [Bu, K0] = J.useState(null), su = new Date, Su = su.getMonth() + 1, gu = su.getFullYear(), lu = Su >= 10 ? gu + 544 : gu + 543, $u = lu - 1, [a0, ku] = J.useState($u), [Z, Iu] = J.useState(lu), tu = `${gu}-${String(Su).padStart(2,"0")}-01`, wu = new Date().toISOString().slice(0, 10), [c0, Wu] = J.useState(tu), [p0, Ru] = J.useState(wu), [xu, Fu] = J.useState(tu), [P0, Pu] = J.useState(wu), [F0, Lu] = J.useState(10), I0 = J.useCallback(e => e ? F0 === "all" ? e : e.slice(0, F0) : [], [F0]), Mu = J.useMemo(() => I0(C0?.patients), [C0, I0]), q = J.useMemo(() => {
    if (!m0?.patients) return null;
    const e = m0.patients,
      t = m0.total_income || 0,
      c = m0.unique_patients || new Set(e.map(l => l.hn)).size,
      z = e.length > 0 ? Math.round(t / e.length) : 0;
    let r = 0,
      p = 0;
    const i = {
        "<40": 0,
        "40-49": 0,
        "50-59": 0,
        "60-69": 0,
        "70+": 0
      },
      x = {},
      h = {},
      b = m0.diseases || ["DM", "HT", "DLP", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD", "Other"],
      C = Object.fromEntries(b.map(l => [l, 0])),
      $ = l => l ? /^E11/.test(l) ? "DM" : /^E78/.test(l) ? "DLP" : l === "I10" ? "HT" : /^I25/.test(l) ? "IHD" : /^I69/.test(l) ? "Stroke" : /^J44/.test(l) ? "COPD" : /^N181/.test(l) ? "CKD1" : /^N182/.test(l) ? "CKD2" : /^N183/.test(l) ? "CKD3" : /^N184/.test(l) ? "CKD4" : /^N18[56]/.test(l) ? "CKD5" : /^N18/.test(l) ? "CKD" : null : null;
    for (const l of e) {
      l.sex === "\u0E0A\u0E32\u0E22" ? r++ : l.sex === "\u0E2B\u0E0D\u0E34\u0E07" && p++;
      const P = Number(l.age_y) || 0;
      P < 40 ? i["<40"]++ : P < 50 ? i["40-49"]++ : P < 60 ? i["50-59"]++ : P < 70 ? i["60-69"]++ : i["70+"]++;
      const o = (l.icd_pairs || "").split("||"),
        g = new Set;
      for (const L of o) {
        if (!L) continue;
        const A = L.indexOf("::"),
          S = (A >= 0 ? L.slice(0, A) : L).toUpperCase(),
          U = A >= 0 ? L.slice(A + 2) : "";
        if (!S || !iu.test(S)) continue;
        x[S] || (x[S] = {
          code: S,
          name: U,
          count: 0,
          totalInc: 0
        }), x[S].count++, x[S].totalInc += l.income || 0;
        const B = $(S);
        B && g.add(B)
      }
      l.ckd_stage && /^CKD/.test(l.ckd_stage) && (["CKD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5"].forEach(L => g.delete(L)), g.add(l.ckd_stage)), g.size === 0 && g.add("Other"), g.forEach(L => {
        L in C && C[L]++
      });
      const m = l.pttype_name || "-";
      h[m] || (h[m] = {
        count: 0,
        income: 0
      }), h[m].count++, h[m].income += l.income || 0
    }
    const F = Math.max(...Object.values(i), 1),
      W = Object.values(x).sort((l, P) => P.count - l.count),
      R = Object.entries(h).sort((l, P) => P[1].count - l[1].count);
    let f = 0,
      _ = 0,
      Y = 0,
      d = 0;
    for (const l of e) l.ckd_stage && f++, l.ckd_stage && l.egfr != null && (_++, Y += l.egfr), (l.ckd_stage === "CKD4" || l.ckd_stage === "CKD5") && d++;
    return {
      pts: e,
      totalIncome: t,
      uniquePatients: c,
      avgIncome: z,
      maleCount: r,
      femaleCount: p,
      ageGroups: i,
      ageMax: F,
      icdMap: x,
      topIcd: W,
      rightList: R,
      ckdCount: f,
      ckdWithEgfrCount: _,
      avgEgfr: _ > 0 ? Math.round(Y / _) : null,
      advancedCkd: d,
      diseaseCountsFE: C
    }
  }, [m0]), X = J.useCallback(async () => {
    l0(!0), r0(null);
    try {
      const e = new URLSearchParams({
          start: xu,
          end: P0,
          _t: Date.now()
        }),
        t = await q0(`/api/report/ipd-compare?${e}`, {
          credentials: "include"
        });
      A0(t)
    } catch (e) {
      r0(e.message)
    }
    l0(!1)
  }, [xu, P0]), z0 = J.useCallback(async () => {
    l0(!0), r0(null);
    try {
      const e = await q0(`/api/report/opd-compare-daterange?start=${c0}&end=${p0}&_t=${Date.now()}`, {
        credentials: "include"
      });
      t0(e)
    } catch (e) {
      r0(e.message)
    }
    l0(!1)
  }, [c0, p0]);
  J.useCallback(async () => {
    l0(!0), r0(null);
    try {
      const e = await q0(`/api/report/resource-usage?fy1=${a0}&fy2=${Z}&_t=${Date.now()}`, {
        credentials: "include"
      });
      j0(e)
    } catch (e) {
      r0(e.message)
    }
    l0(!1)
  }, [a0, Z]);
  const G0 = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/resource-opd-monthly?fy1=${a0}&fy2=${Z}&_t=${Date.now()}`, {
          credentials: "include"
        });
        H0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [a0, Z]),
    V0 = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/resource-ipd-monthly?fy1=${a0}&fy2=${Z}&_t=${Date.now()}`, {
          credentials: "include"
        });
        R0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [a0, Z]),
    uu = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/mortality-monthly?fy1=${a0}&fy2=${Z}&_t=${Date.now()}`, {
          credentials: "include"
        });
        h0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [a0, Z]),
    mu = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/frax-patients?start=${c0}&end=${p0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        d0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [c0, p0]),
    ju = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/pt-patients?start=${c0}&end=${p0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        Z0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [c0, p0]),
    _u = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/staff-patients?start=${c0}&end=${p0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        Z0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [c0, p0]),
    fu = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/fluoride-patients?start=${c0}&end=${p0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        Eu(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [c0, p0]),
    ru = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/elderly-cxr?start=${c0}&end=${p0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        N0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [c0, p0]),
    ou = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/ncd-patients?start=${c0}&end=${p0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        Y0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [c0, p0]),
    Nu = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/imaging-services?start=${c0}&end=${p0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        k0(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [c0, p0]),
    Ou = J.useCallback(async () => {
      l0(!0), r0(null);
      try {
        const e = await q0(`/api/report/pttype-services?from=${c0}&to=${p0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        hu(e)
      } catch (e) {
        r0(e.message)
      }
      l0(!1)
    }, [c0, p0]);
  J.useEffect(() => {
    n === "ipd-compare" ? X() : n === "opd-compare" ? z0() : n === "resource-opd" ? G0() : n === "resource-ipd" ? V0() : n === "mortality" ? uu() : n === "frax" ? mu() : n === "pt" ? ju() : n === "fluoride" ? fu() : n === "elderly-cxr" ? ru() : n === "ncd-disease" ? ou() : n === "imaging-services" ? Nu() : n === "pttype-services" ? Ou() : n === "staff-services" && _u()
  }, [n, X, z0, G0, V0, uu, mu, ju, _u, fu, ru, ou, Nu, Ou]), J.useEffect(() => {
    const e = setTimeout(() => {
      q0("/api/ai/report/executive-summary", {
        credentials: "include"
      }).then(S0).catch(() => {})
    }, 300);
    return () => clearTimeout(e)
  }, []);
  const Vu = J.useMemo(() => {
      if (!k?.comparison) return "";
      const e = k.comparison.filter(c => c.fy2.has_data).map(c => c.month);
      if (e.length === 0) return "";
      const t = k.fiscal_years?.fy2?.be || Z;
      return `(${e[0]} - ${e[e.length-1]} ${t})`
    }, [k, Z]),
    sE = J.useCallback(() => {
      const e = H.current;
      if (!e) return;
      const t = window.open("", "_blank");
      t.document.write(`
      <html><head><title>\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 ${k?.title||`${a0}-${Z}`}</title>
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
    }, [a0, Z]),
    lE = J.useCallback(() => {
      const e = (t, c) => {
        const z = t.utils.book_new(),
          r = "Sarabun",
          p = 8,
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
          x = {
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
          b = {
            top: x,
            bottom: x,
            left: x,
            right: x
          },
          C = {},
          $ = [],
          F = [],
          W = (w, j, M, T) => {
            const G = typeof M == "number" ? "n" : "s";
            C[t.utils.encode_cell({
              r: w,
              c: j
            })] = T ? {
              v: M,
              t: G,
              s: T
            } : {
              v: M,
              t: G
            }
          },
          R = (w, j, M, T) => $.push({
            s: {
              r: w,
              c: j
            },
            e: {
              r: M,
              c: T
            }
          }),
          f = {
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
                rgb: c.themeColor || i.purpleDark
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
                rgb: i.white
              },
              italic: !0
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: c.themeColorLight || "6D28D9"
              }
            },
            alignment: {
              horizontal: "center",
              vertical: "center"
            }
          },
          Y = {
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
          d = w => ({
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
                rgb: w
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
            border: b
          },
          P = (w, j) => ({
            font: {
              name: r,
              sz: 18,
              bold: !0,
              color: {
                rgb: w || i.text
              }
            },
            alignment: {
              horizontal: "right",
              vertical: "center",
              indent: 1
            },
            border: b,
            numFmt: j || "#,##0"
          }),
          o = {
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
            border: b,
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
            border: b,
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: i.slateSoft
              }
            }
          },
          m = w => ({
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
                rgb: w
              }
            },
            alignment: {
              horizontal: "center",
              vertical: "center",
              wrapText: !0
            },
            border: b
          }),
          L = (w = {}) => ({
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: i.text
              },
              ...w.font || {}
            },
            alignment: {
              horizontal: w.align || "left",
              vertical: "center",
              wrapText: !!w.wrap,
              indent: w.align === "left" ? 1 : 0
            },
            border: b,
            fill: w.bg ? {
              patternType: "solid",
              fgColor: {
                rgb: w.bg
              }
            } : void 0,
            numFmt: w.numFmt
          });
        let A = 0;
        const S = (w = 12) => {
          F[A] = {
            hpx: w
          }, A++
        };
        if (W(A, 0, `${c.titleEmoji||"\u{1F4CB}"}  ${c.titleText}`, f), R(A, 0, A, p - 1), F[A] = {
            hpx: 56
          }, A++, W(A, 0, `\u{1F4C5}  \u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25:  ${c.dateRange.start}  \u2192  ${c.dateRange.end}    \xB7    \u{1F465}  ${(c.totalCount||0).toLocaleString()} \u0E23\u0E32\u0E22${c.uniqueCount?`  /  ${c.uniqueCount.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33`:""}`, _), R(A, 0, A, p - 1), F[A] = {
            hpx: 28
          }, A++, W(A, 0, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D:  ${new Date().toLocaleString("th-TH")}    \xB7    ${c.dataSource||""}`, Y), R(A, 0, A, p - 1), F[A] = {
            hpx: 18
          }, A++, S(8), c.kpis && c.kpis.length) {
          W(A, 0, "\u{1F4CA}  KPI \u0E2A\u0E23\u0E38\u0E1B", d(c.themeColor || i.purpleDark)), R(A, 0, A, p - 1), F[A] = {
            hpx: 32
          }, A++;
          for (const w of c.kpis) W(A, 0, w.label, l), R(A, 0, A, 1), W(A, 2, w.value, P(w.color, w.fmt)), R(A, 2, A, 4), W(A, 5, w.unit || "", o), W(A, 6, w.note || "", g), R(A, 6, A, 7), F[A] = {
            hpx: 32
          }, A++;
          S(12)
        }
        if (c.breakdowns && c.breakdowns.length)
          for (const w of c.breakdowns) {
            if (W(A, 0, `${w.icon||"\u{1F4C8}"}  ${w.title}`, d(w.color)), R(A, 0, A, p - 1), F[A] = {
                hpx: 32
              }, A++, w.headers) {
              const M = w.headerSegs || [
                [0, 0],
                [1, 5],
                [6, 6],
                [7, 7]
              ];
              w.headers.forEach((T, G) => {
                const [E0, u0] = M[G] || [G, G];
                W(A, E0, T, m(w.color)), E0 !== u0 && R(A, E0, A, u0)
              }), F[A] = {
                hpx: 30
              }, A++
            }
            let j = 0;
            for (const M of w.rows || []) {
              const T = j % 2 === 1 ? i.stripe : void 0,
                G = w.rowSegs || [
                  [0, 0],
                  [1, 5],
                  [6, 6],
                  [7, 7]
                ];
              M.forEach((E0, u0) => {
                const [b0, W0] = G[u0] || [u0, u0];
                W(A, b0, E0.v, L({
                  align: E0.align || (typeof E0.v == "number" ? "right" : "left"),
                  numFmt: E0.fmt,
                  font: E0.font,
                  bg: T,
                  wrap: !!E0.wrap
                })), b0 !== W0 && R(A, b0, A, W0)
              }), F[A] = {
                hpx: w.rowHeight || 24
              }, A++, j++
            }
            S(12)
          }
        if (c.insights && c.insights.length) {
          W(A, 0, "\u{1F916}  AI Insights & \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30", d(i.red)), R(A, 0, A, p - 1), F[A] = {
            hpx: 32
          }, A++, W(A, 0, "\u0E23\u0E30\u0E14\u0E31\u0E1A", m(i.red)), W(A, 1, "\u0E2B\u0E21\u0E27\u0E14", m(i.red)), R(A, 1, A, 2), W(A, 3, "\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E1A", m(i.red)), R(A, 3, A, 4), W(A, 5, "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 / Action", m(i.red)), R(A, 5, A, 7), F[A] = {
            hpx: 30
          }, A++;
          const w = {
              critical: 0,
              high: 1,
              med: 2,
              info: 3,
              good: 4,
              low: 3
            },
            j = [...c.insights].sort((T, G) => (w[T.sev] ?? 9) - (w[G.sev] ?? 9)),
            M = {
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
          for (const T of j) {
            const G = M[T.sev] || M.info;
            W(A, 0, G.label, {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: G.fg
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: G.bg
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: b
            }), W(A, 1, T.cat, {
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
              border: b
            }), R(A, 1, A, 2), W(A, 3, T.msg, {
              font: {
                name: r,
                sz: 10,
                bold: T.sev === "critical" || T.sev === "high",
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
              border: b,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: G.bg
                }
              }
            }), R(A, 3, A, 4), W(A, 5, T.action, {
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
              border: b,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: i.slateSoft
                }
              }
            }), R(A, 5, A, 7);
            const E0 = Math.max(Math.ceil((T.action || "").length / 80), Math.ceil((T.msg || "").length / 40), 2);
            F[A] = {
              hpx: Math.min(120, 22 + E0 * 16)
            }, A++
          }
          S(12)
        }
        if (c.references && c.references.length) {
          W(A, 0, "\u{1F4DA}  \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38 / \u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07", d(i.muted)), R(A, 0, A, p - 1), F[A] = {
            hpx: 30
          }, A++;
          for (const [w, j] of c.references) {
            const M = w === "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22",
              T = M ? i.greenDark : i.slateDark,
              G = M ? i.greenDark : i.muted,
              E0 = M ? i.greenLight : i.slateSoft;
            W(A, 0, w, L({
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: T
                }
              },
              align: "left",
              bg: E0
            })), R(A, 0, A, 1), W(A, 2, j, L({
              font: {
                sz: M ? 11 : 9,
                bold: M,
                color: {
                  rgb: G
                }
              },
              align: "left",
              wrap: !0,
              bg: E0
            })), R(A, 2, A, 7), F[A] = {
              hpx: 36
            }, A++
          }
        }
        C["!ref"] = t.utils.encode_range({
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: A - 1,
            c: p - 1
          }
        }), C["!merges"] = $, C["!cols"] = [{
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
        }], C["!rows"] = F, C["!freeze"] = {
          xSplit: 0,
          ySplit: 3
        }, t.utils.book_append_sheet(z, C, "Overview");
        const U = {};
        c.patientHeader.forEach((w, j) => {
          U[t.utils.encode_cell({
            r: 0,
            c: j
          })] = {
            v: w,
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
              border: b
            }
          }
        });
        const B = c.patientIncomeCols || [];
        c.patientData.forEach((w, j) => {
          const M = j % 2 === 0 ? void 0 : i.stripe;
          w.forEach((T, G) => {
            const E0 = typeof T == "number",
              u0 = B.includes(G);
            U[t.utils.encode_cell({
              r: j + 1,
              c: G
            })] = {
              v: T,
              t: E0 ? "n" : "s",
              s: {
                font: {
                  name: r,
                  sz: 9,
                  bold: u0,
                  color: {
                    rgb: u0 ? i.green : i.text
                  }
                },
                alignment: {
                  horizontal: E0 ? "right" : "left",
                  vertical: "center",
                  wrapText: !1,
                  indent: E0 ? 0 : 1
                },
                border: b,
                fill: M ? {
                  patternType: "solid",
                  fgColor: {
                    rgb: M
                  }
                } : void 0,
                numFmt: u0 ? "#,##0.00" : E0 ? "#,##0" : void 0
              }
            }
          })
        }), U["!ref"] = t.utils.encode_range({
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: c.patientData.length,
            c: c.patientHeader.length - 1
          }
        }), U["!cols"] = (c.patientColWidths || c.patientHeader.map(() => 14)).map(w => ({
          wch: w
        })), U["!rows"] = [{
          hpx: 30
        }], U["!freeze"] = {
          xSplit: 0,
          ySplit: 1
        }, t.utils.book_append_sheet(z, U, c.patientSheetName || "Data"), t.writeFile(z, c.filename)
      };
      if (n === "ipd-compare") {
        if (!k?.comparison) return;
        const t = (h, b) => h > 0 ? Math.round((b - h) / h * 100) + "%" : b > 0 ? "100%" : "0%",
          c = k.fiscal_years?.fy1?.label || `\u0E1B\u0E35\u0E07\u0E1A ${a0}`,
          z = k.fiscal_years?.fy2?.label || `\u0E1B\u0E35\u0E07\u0E1A ${Z}`,
          r = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `Admit (${c})`, `D/C (${c})`, "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19", "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07", "\u0E40\u0E15\u0E35\u0E22\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E08\u0E23\u0E34\u0E07", "Sum AdjRW", "CMI", `Admit (${z})`, `D/C (${z})`, "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19", "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07", "\u0E40\u0E15\u0E35\u0E22\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E08\u0E23\u0E34\u0E07", "Sum AdjRW", "CMI", "YoY Admit %", "YoY D/C %", "YoY \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19 %", "YoY ALOS %", "YoY \u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 %", "YoY Active Bed %", "YoY AdjRW %", "YoY CMI %", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 Admit", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 D/C", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19"],
          p = k.comparison.map(h => [h.month, h.fy1.admits, h.fy1.discharges, h.fy1.total_los, h.fy1.alos, h.fy1.occupancy_rate, h.fy1.active_beds, h.fy1.sum_adjrw, h.fy1.cmi, h.fy2.admits, h.fy2.discharges, h.fy2.total_los, h.fy2.alos, h.fy2.occupancy_rate, h.fy2.active_beds, h.fy2.sum_adjrw, h.fy2.cmi, t(h.fy1.admits, h.fy2.admits), t(h.fy1.discharges, h.fy2.discharges), t(h.fy1.total_los, h.fy2.total_los), t(h.fy1.alos, h.fy2.alos), t(h.fy1.occupancy_rate, h.fy2.occupancy_rate), t(h.fy1.active_beds, h.fy2.active_beds), t(h.fy1.sum_adjrw, h.fy2.sum_adjrw), t(h.fy1.cmi, h.fy2.cmi), h.admit_diff, (h.fy2.discharges || 0) - (h.fy1.discharges || 0), h.fy2.total_los - h.fy1.total_los]),
          i = k.fy1_totals,
          x = k.fy2_totals;
        p.push(["\u0E23\u0E27\u0E21", i.admits, i.discharges, i.total_los, i.alos, i.occupancy_rate, i.active_beds, i.sum_adjrw, i.cmi, x.admits, x.discharges, x.total_los, x.alos, x.occupancy_rate, x.active_beds, x.sum_adjrw, x.cmi, t(i.admits, x.admits), t(i.discharges, x.discharges), t(i.total_los, x.total_los), t(i.alos, x.alos), t(i.occupancy_rate, x.occupancy_rate), t(i.active_beds, x.active_beds), t(i.sum_adjrw, x.sum_adjrw), t(i.cmi, x.cmi), k.overall_admit_diff, (x.discharges || 0) - (i.discharges || 0), x.total_los - i.total_los]), du(() => import("./xlsx-BuHXVOW6.js"), []).then(h => {
          const b = [r, ...p],
            C = h.utils.aoa_to_sheet(b);
          C["!cols"] = r.map((F, W) => {
            const R = Math.max(F.length, ...p.map(f => String(f[W] ?? "").length));
            return {
              wch: Math.min(Math.max(R + 2, 8), 30)
            }
          });
          const $ = h.utils.book_new();
          h.utils.book_append_sheet($, C, "IPD Compare"), h.writeFile($, `BCH360_IPD_Compare_${xu}_${P0}.xlsx`)
        });
        return
      }
      if (n === "frax") {
        if (!C0?.patients) return;
        const t = C0.patients;
        t.reduce((f, _) => f + (_.income || 0), 0);
        const c = new Set(t.map(f => f.hn)).size,
          z = t.length > 0 ? t.reduce((f, _) => f + (Number(_.major_osteoporotic) || 0), 0) / t.length : 0,
          r = t.length > 0 ? t.reduce((f, _) => f + (Number(_.hip_fracture) || 0), 0) / t.length : 0,
          p = t.filter(f => Number(f.major_osteoporotic) >= 20).length,
          i = t.filter(f => Number(f.hip_fracture) >= 3).length,
          x = t.length > 0 ? Math.round(t.reduce((f, _) => f + (Number(_.age) || 0), 0) / t.length) : 0,
          h = {
            "50-59": 0,
            "60-69": 0,
            "70-79": 0,
            "80+": 0
          };
        t.forEach(f => {
          const _ = Number(f.age) || 0;
          _ < 60 ? h["50-59"]++ : _ < 70 ? h["60-69"]++ : _ < 80 ? h["70-79"]++ : h["80+"]++
        });
        const b = {};
        t.forEach(f => {
          const _ = f.pttype_name || "-";
          b[_] = (b[_] || 0) + 1
        });
        const C = Object.entries(b).sort((f, _) => _[1] - f[1]),
          $ = [];
        p > 0 && $.push({
          sev: "critical",
          cat: "High Fracture Risk",
          msg: `Major Osteoporotic Risk \u226520%: ${p} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 DEXA scan \u0E41\u0E25\u0E30\u0E40\u0E23\u0E34\u0E48\u0E21\u0E22\u0E32 bisphosphonate`,
          action: "\u0E19\u0E31\u0E14\u0E17\u0E33 Bone Mineral Density (DEXA) \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 Endocrinologist \xB7 vitamin D + calcium supplement \xB7 fall prevention counseling"
        }), i > 0 && $.push({
          sev: "high",
          cat: "Hip Fracture Risk",
          msg: `Hip Fracture Risk \u22653%: ${i} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E2B\u0E31\u0E01 10 \u0E1B\u0E35`,
          action: "Hip protector \xB7 home safety assessment \xB7 physical therapy \xB7 strength + balance training"
        }), z >= 10 && $.push({
          sev: "med",
          cat: "Population Risk",
          msg: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Major Risk = ${z.toFixed(1)}% \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B`,
          action: "\u0E08\u0E31\u0E14 health education \xB7 screening campaign \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A peri/postmenopausal women"
        }), $.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${x} \u0E1B\u0E35 \xB7 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E1E\u0E28\u0E2B\u0E0D\u0E34\u0E07 (FRAX guideline)`,
          action: "continue routine screening for postmenopausal women \xB7 check secondary causes of osteoporosis"
        }), $.push({
          sev: "info",
          cat: "Operational",
          msg: `\u0E23\u0E27\u0E21 ${t.length} \u0E23\u0E32\u0E22 \u0E43\u0E19 ${Math.max(1,Math.ceil((new Date(p0)-new Date(c0))/864e5)+1)} \u0E27\u0E31\u0E19`,
          action: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 DEXA slot \xB7 drug stock \xB7 F/U appointment scheduling"
        });
        const F = [{
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
            rows: Object.entries(h).map(([f, _]) => [{
              v: f,
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
              v: f === "80+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14" : f === "70-79" ? "\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "",
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
            rows: C.slice(0, 10).map(([f, _]) => [{
              v: f,
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
          W = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "VN", "HN", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 (kg)", "\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (cm)", "BMI", "Major Osteo. (%)", "Hip Fracture (%)"],
          R = t.map(f => [f.no, f.vn, f.hn, f.cid, f.fullname, f.sex, f.age, f.phone || "", f.vstdate, f.vsttime, f.pttype_name || "", f.weight || "", f.height || "", f.bmi ? Number(f.bmi) : "", f.major_osteoporotic, f.hip_fracture]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(f => f.x), vu([0, 1])).then(f => {
          e(f, {
            filename: `BCH360_FRAX_BoneDensity_${c0}_${p0}.xlsx`,
            titleEmoji: "\u{1F9B4}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19 FRAX Calculator (\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2B\u0E31\u0E01)",
            themeColor: "A855F7",
            themeColorLight: "7C3AED",
            dateRange: {
              start: c0,
              end: p0
            },
            dataSource: "HOSxP XE \xB7 FRAX\xAE WHO Model (Thailand) \xB7 Bone Density",
            totalCount: t.length,
            uniqueCount: c,
            kpis: [{
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19",
              value: t.length,
              unit: "\u0E23\u0E32\u0E22",
              color: "A855F7",
              fmt: "#,##0",
              note: "\u0E19\u0E31\u0E1A visit \u0E17\u0E35\u0E48\u0E17\u0E33 FRAX"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Major Osteoporotic Risk",
              value: Math.round(z * 10) / 10,
              unit: "%",
              color: z >= 20 ? "DC2626" : z >= 10 ? "F59E0B" : "10B981",
              fmt: "0.0",
              note: z >= 20 ? "\u{1F534} \u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01" : z >= 10 ? "\u26A0 \u0E2A\u0E39\u0E07" : "\u2705 \u0E1B\u0E01\u0E15\u0E34"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Hip Fracture Risk",
              value: Math.round(r * 10) / 10,
              unit: "%",
              color: r >= 3 ? "DC2626" : "10B981",
              fmt: "0.0",
              note: r >= 3 ? "\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u2705 \u0E1B\u0E01\u0E15\u0E34"
            }, {
              label: "High-risk (Major \u226520%)",
              value: p,
              unit: "\u0E23\u0E32\u0E22",
              color: p > 0 ? "DC2626" : "10B981",
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
              value: x,
              unit: "\u0E1B\u0E35",
              color: "7C3AED",
              fmt: "#,##0",
              note: "\u0E2D\u0E32\u0E22\u0E38\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"
            }],
            breakdowns: F,
            insights: $,
            references: [
              ["FRAX Risk Threshold", "Major Osteoporotic \u226520%, Hip Fracture \u22653% \u2192 \u0E40\u0E23\u0E34\u0E48\u0E21\u0E23\u0E31\u0E01\u0E29\u0E32 (Treatment Initiation)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32", "WHO FRAX\xAE Calculator (Thailand model) \xB7 \u0E43\u0E0A\u0E49\u0E43\u0E19 peri/postmenopausal women"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "FRAX",
            patientHeader: W,
            patientData: R,
            patientColWidths: [6, 12, 10, 16, 22, 6, 6, 14, 11, 9, 22, 10, 10, 8, 16, 16],
            patientIncomeCols: []
          })
        });
        return
      }
      if (n === "pt" || n === "staff-services") {
        if (!V?.patients) return;
        const t = V.patients,
          c = t.reduce((g, m) => g + (Number(m.income) || 0), 0),
          z = new Set(t.map(g => g.hn)).size,
          r = t.length > 0 ? Math.round(c / t.length) : 0,
          p = t.filter(g => g.visit_type === "OPD").length,
          i = t.filter(g => g.visit_type === "IPD").length,
          x = t.length > 0 ? Math.round(t.reduce((g, m) => g + (Number(m.age_y) || 0), 0) / t.length) : 0,
          h = {
            "<30": 0,
            "30-44": 0,
            "45-59": 0,
            "60+": 0
          };
        t.forEach(g => {
          const m = Number(g.age_y) || 0;
          m < 30 ? h["<30"]++ : m < 45 ? h["30-44"]++ : m < 60 ? h["45-59"]++ : h["60+"]++
        });
        const b = {};
        t.forEach(g => {
          const m = (g.icd10 || "").split(",").map(A => A.trim().toUpperCase()).filter(A => iu.test(A)),
            L = (g.icd10name || "").split("|").map(A => A.trim());
          m.forEach((A, S) => {
            b[A] || (b[A] = {
              code: A,
              name: L[S] || "",
              count: 0,
              totalInc: 0
            }), b[A].count++, b[A].totalInc += g.income || 0
          })
        });
        const C = Object.values(b).sort((g, m) => m.count - g.count).slice(0, 10),
          $ = {};
        t.forEach(g => {
          const m = g.pttype_name || "-";
          $[m] || ($[m] = {
            count: 0,
            income: 0
          }), $[m].count++, $[m].income += g.income || 0
        });
        const F = Object.entries($).sort((g, m) => m[1].count - g[1].count),
          W = {};
        t.forEach(g => {
          const m = g.department || "-";
          W[m] || (W[m] = {
            count: 0,
            income: 0
          }), W[m].count++, W[m].income += g.income || 0
        });
        const R = Object.entries(W).sort((g, m) => m[1].count - g[1].count),
          f = t.filter(g => /M53|M54|M62|M79/.test(g.icd10 || "")).length,
          _ = t.filter(g => /M0[5-9]|M1[5-9]/.test(g.icd10 || "")).length,
          Y = t.filter(g => /I6[0-9]|G81|G82/.test(g.icd10 || "")).length,
          d = [];
        f > t.length * .3 && d.push({
          sev: "high",
          cat: "Office Syndrome",
          msg: `Office syndrome (M53/M54/M62/M79): ${f} \u0E23\u0E32\u0E22 (${Math.round(f/t.length*100)}%)`,
          action: "\u0E08\u0E31\u0E14 ergonomic education \xB7 workplace assessment \xB7 stretching program \xB7 \u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E48\u0E07 >2 \u0E0A\u0E21.\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E19"
        }), Y > 0 && d.push({
          sev: "high",
          cat: "Stroke Rehab",
          msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Stroke \u0E17\u0E35\u0E48\u0E17\u0E33 PT: ${Y} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 rehab intensive`,
          action: "\u0E19\u0E31\u0E14 PT 3-5 \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 OT \u0E23\u0E48\u0E27\u0E21 \xB7 evaluate ADLs \u0E17\u0E38\u0E01 2 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 home exercise program"
        }), _ > 0 && d.push({
          sev: "med",
          cat: "Arthritis",
          msg: `Arthritis cases: ${_} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 joint protection`,
          action: "pain management \xB7 range of motion exercise \xB7 weight management \xB7 pharmacotherapy review"
        }), i > 0 && d.push({
          sev: "info",
          cat: "IPD/OPD Mix",
          msg: `IPD ${i} \xB7 OPD ${p} \u0E23\u0E32\u0E22`,
          action: i > p ? "high IPD rehab load \u2014 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 inpatient PT staff" : "OPD-dominant \u2014 focus on outpatient scheduling efficiency"
        }), d.push({
          sev: "info",
          cat: "Operational",
          msg: `\u0E23\u0E27\u0E21 ${t.length} visit \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${c.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${r.toLocaleString()} \u0E1A\u0E32\u0E17/visit`,
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
            rows: C.map(g => [{
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
            rows: Object.entries(h).map(([g, m]) => [{
              v: g,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: m,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? m / t.length : 0,
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
            rows: F.slice(0, 10).map(([g, m]) => [{
              v: g,
              align: "left",
              wrap: !0
            }, {
              v: m.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? m.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: m.income,
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
            rows: R.map(([g, m]) => [{
              v: g,
              align: "left",
              wrap: !0
            }, {
              v: m.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? m.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: m.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          P = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "Ward", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          o = t.map(g => [g.no, g.pt_name, g.hn, g.visit_type, g.pttype_name, g.age_y, g.cid, g.vstdate, g.department, g.ward_name, g.address, g.mobile_phone_number, g.icd10, g.icd10name, g.income, g.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(g => g.x), vu([0, 1])).then(g => {
          e(g, {
            filename: `BCH360_${n==="staff-services"?"StaffServices":"PhysicalTherapy"}_${c0}_${p0}.xlsx`,
            titleEmoji: "\u{1F9B5}",
            titleText: n === "staff-services" ? "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 \u0E41\u0E25\u0E30 PMC",
            themeColor: "0EA5E9",
            themeColorLight: "0284C7",
            dateRange: {
              start: c0,
              end: p0
            },
            dataSource: "HOSxP XE \xB7 \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 + PMC + \u0E28\u0E39\u0E19\u0E22\u0E4C\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 (main_dep 034, 140, 143)",
            totalCount: t.length,
            uniqueCount: z,
            kpis: [...n === "staff-services" && V?.staff_registry_count ? [{
              label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
              value: V.staff_registry_count,
              unit: "\u0E23\u0E32\u0E22",
              color: "7C3AED",
              fmt: "#,##0",
              note: `\u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${z} \u0E23\u0E32\u0E22 (${V.staff_registry_count>0?Math.round(z/V.staff_registry_count*1e3)/10:0}%)`
            }] : [], {
              label: n === "staff-services" ? "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit \u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit PT",
              value: t.length,
              unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
              color: "0EA5E9",
              fmt: "#,##0",
              note: n === "staff-services" ? "\u0E23\u0E27\u0E21 visit \u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32" : "\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E"
            }, {
              label: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)" : "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
              value: z,
              unit: "\u0E23\u0E32\u0E22",
              color: "0284C7",
              fmt: "#,##0",
              note: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: c,
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
              value: p,
              unit: `OPD (IPD: ${i})`,
              color: "A855F7",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(p/t.length*100):0}% OPD`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: x,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age"
            }],
            breakdowns: l,
            insights: d,
            references: [
              ["ICD-10 Office Syndrome", "M53 (cervicalgia), M54 (back pain), M62 (muscle), M79 (soft tissue)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32", "HOSxP XE \xB7 main_dep 034 (PT) + 140 (PMC) + 143 (\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "PT Patients",
            patientHeader: P,
            patientData: o,
            patientColWidths: [6, 22, 10, 8, 22, 6, 16, 11, 16, 14, 30, 14, 14, 30, 11, 32],
            patientIncomeCols: [14]
          })
        });
        return
      }
      if (n === "fluoride") {
        if (!v0?.patients) return;
        const t = v0.patients,
          c = t.reduce((d, l) => d + (Number(l.fluoride_price) || 0), 0),
          z = t.reduce((d, l) => d + (Number(l.income) || 0), 0),
          r = new Set(t.map(d => d.hn)).size,
          p = t.length > 0 ? Math.round(z / t.length) : 0,
          i = t.length > 0 ? Math.round(t.reduce((d, l) => d + (Number(l.age_y) || 0), 0) / t.length) : 0,
          x = {
            "25-34": 0,
            "35-44": 0,
            "45-54": 0,
            "55-59": 0
          };
        t.forEach(d => {
          const l = Number(d.age_y) || 0;
          l < 35 ? x["25-34"]++ : l < 45 ? x["35-44"]++ : l < 55 ? x["45-54"]++ : x["55-59"]++
        });
        const h = {};
        t.forEach(d => {
          const l = (d.icd10 || "").split(",").map(o => o.trim().toUpperCase()).filter(o => iu.test(o)),
            P = (d.icd10name || "").split("|").map(o => o.trim());
          l.forEach((o, g) => {
            h[o] || (h[o] = {
              code: o,
              name: P[g] || "",
              count: 0,
              totalInc: 0
            }), h[o].count++, h[o].totalInc += d.income || 0
          })
        });
        const b = Object.values(h).sort((d, l) => l.count - d.count).slice(0, 10),
          C = {};
        t.forEach(d => {
          const l = d.pttype_name || "-";
          C[l] || (C[l] = {
            count: 0,
            income: 0
          }), C[l].count++, C[l].income += d.income || 0
        });
        const $ = Object.entries(C).sort((d, l) => l[1].count - d[1].count),
          F = t.filter(d => /K02|K03/.test(d.icd10 || "")).length,
          W = t.filter(d => /K05|K06/.test(d.icd10 || "")).length,
          R = [];
        F > 0 && R.push({
          sev: "high",
          cat: "Caries Burden",
          msg: `Dental caries (K02-K03): ${F} \u0E23\u0E32\u0E22 (${Math.round(F/t.length*100)}%)`,
          action: "Filling treatment \xB7 oral hygiene education \xB7 sugar reduction counseling \xB7 F/U 6 \u0E40\u0E14\u0E37\u0E2D\u0E19"
        }), W > 0 && R.push({
          sev: "med",
          cat: "Periodontal Disease",
          msg: `Gum disease (K05-K06): ${W} \u0E23\u0E32\u0E22`,
          action: "Scaling + root planing \xB7 oral hygiene reinforcement \xB7 F/U \u0E17\u0E38\u0E01 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19"
        }), R.push({
          sev: "info",
          cat: "Coverage",
          msg: `\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C ${t.length} \u0E23\u0E32\u0E22 \u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${c.toLocaleString()} \u0E1A\u0E32\u0E17`,
          action: "expand outreach \xB7 school/workplace dental health programs \xB7 increase coverage rate"
        }), R.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${i} \u0E1B\u0E35 \xB7 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48 ${Object.entries(x).sort((d,l)=>l[1]-d[1])[0]?.[0]} \u0E1B\u0E35`,
          action: "targeted health promotion \u0E15\u0E32\u0E21 age group \xB7 adult dental care campaign"
        }), R.push({
          sev: "good",
          cat: "Prevention",
          msg: "Fluoride varnish \u0E40\u0E1B\u0E47\u0E19 cost-effective prevention",
          action: "continue program \xB7 NNT (number needed to treat) \u0E15\u0E48\u0E33 \xB7 maintain budget"
        });
        const f = [{
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
            rows: b.map(d => [{
              v: d.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: d.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: d.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: d.totalInc,
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
            rows: Object.entries(x).map(([d, l]) => [{
              v: d,
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
            rows: $.slice(0, 10).map(([d, l]) => [{
              v: d,
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
          Y = t.map(d => [d.no, d.pt_name, d.hn, d.pttype_name, d.age_y, d.cid, d.vstdate, d.department, d.address, d.mobile_phone_number, d.icd10, d.icd10name, d.fluoride_price, d.income, d.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(d => d.x), vu([0, 1])).then(d => {
          e(d, {
            filename: `BCH360_Fluoride_25_59_${c0}_${p0}.xlsx`,
            titleEmoji: "\u{1F9B7}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (25-59 \u0E1B\u0E35)",
            themeColor: "06B6D4",
            themeColorLight: "0891B2",
            dateRange: {
              start: c0,
              end: p0
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
              value: c,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: z,
              unit: "\u0E1A\u0E32\u0E17",
              color: "047857",
              fmt: "#,##0.00",
              note: "\u0E23\u0E27\u0E21\u0E17\u0E38\u0E01\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit",
              value: p,
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
            breakdowns: f,
            insights: R,
            references: [
              ["Target Age", "25-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19) \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 dental prevention"],
              ["ICD-10 Dental", "K02-K03 (caries), K05-K06 (periodontal), Z012 (dental exam)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Fluoride 25-59",
            patientHeader: _,
            patientData: Y,
            patientColWidths: [6, 22, 10, 22, 6, 16, 11, 16, 30, 14, 14, 30, 12, 11, 32],
            patientIncomeCols: [12, 13]
          })
        });
        return
      }
      if (n === "elderly-cxr") {
        if (!$0?.patients) return;
        const t = $0.patients,
          c = $0.total_income || t.reduce((o, g) => o + (Number(g.income) || 0), 0),
          z = $0.total_cxr_price || t.reduce((o, g) => o + (Number(g.cxr_price) || 0), 0),
          r = new Set(t.map(o => o.hn)).size,
          p = t.length > 0 ? Math.round(c / t.length) : 0,
          i = t.filter(o => o.sex === "\u0E0A\u0E32\u0E22").length,
          x = t.filter(o => o.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
          h = t.length > 0 ? Math.round(t.reduce((o, g) => o + (Number(g.age_y) || 0), 0) / t.length) : 0,
          b = {
            "60-64": 0,
            "65-69": 0,
            "70-74": 0,
            "75-79": 0,
            "80+": 0
          };
        t.forEach(o => {
          const g = Number(o.age_y) || 0;
          g < 65 ? b["60-64"]++ : g < 70 ? b["65-69"]++ : g < 75 ? b["70-74"]++ : g < 80 ? b["75-79"]++ : b["80+"]++
        });
        const C = {};
        t.forEach(o => {
          const g = (o.icd10 || "").split(",").map(L => L.trim().toUpperCase()).filter(L => iu.test(L)),
            m = (o.icd10name || "").split("|").map(L => L.trim());
          g.forEach((L, A) => {
            C[L] || (C[L] = {
              code: L,
              name: m[A] || "",
              count: 0,
              totalInc: 0
            }), C[L].count++, C[L].totalInc += o.income || 0
          })
        });
        const $ = Object.values(C).sort((o, g) => g.count - o.count).slice(0, 10),
          F = {};
        t.forEach(o => {
          const g = o.pttype_name || "-";
          F[g] || (F[g] = {
            count: 0,
            income: 0
          }), F[g].count++, F[g].income += o.income || 0
        });
        const W = Object.entries(F).sort((o, g) => g[1].count - o[1].count),
          R = t.filter(o => /A1[5-9]/.test(o.icd10 || "")).length,
          f = t.filter(o => /C3[3-4]/.test(o.icd10 || "")).length,
          _ = t.filter(o => /J1[2-8]/.test(o.icd10 || "")).length,
          Y = [];
        R > 0 && Y.push({
          sev: "critical",
          cat: "TB Suspect",
          msg: `\u{1F9A0} TB-related ICD (A15-A19): ${R} \u0E23\u0E32\u0E22 \u2014 \u0E2A\u0E07\u0E2A\u0E31\u0E22\u0E27\u0E31\u0E13\u0E42\u0E23\u0E04`,
          action: "sputum AFB + Xpert MTB \xB7 contact tracing \xB7 isolate \u0E16\u0E49\u0E32\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 \xB7 DOT program enrollment"
        }), f > 0 && Y.push({
          sev: "critical",
          cat: "Lung Cancer",
          msg: `Lung CA (C33-C34): ${f} \u0E23\u0E32\u0E22 \u2014 \u0E21\u0E30\u0E40\u0E23\u0E47\u0E07\u0E1B\u0E2D\u0E14`,
          action: "CT chest \xB7 pulmonologist referral \xB7 oncology consultation \xB7 staging workup"
        }), _ > 0 && Y.push({
          sev: "high",
          cat: "Pneumonia",
          msg: `Pneumonia (J12-J18): ${_} \u0E23\u0E32\u0E22 \u2014 \u0E1B\u0E2D\u0E14\u0E1A\u0E27\u0E21`,
          action: "sputum culture \xB7 empirical antibiotic per CURB-65 \xB7 admission \u0E16\u0E49\u0E32 severe \xB7 F/U CXR 4-6 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C"
        }), Y.push({
          sev: "med",
          cat: "Screening Coverage",
          msg: `\u0E23\u0E27\u0E21 ${t.length} \u0E23\u0E32\u0E22 \xB7 \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A CXR`,
          action: "expand coverage to all elderly \xB7 annual CXR screening for high-risk groups"
        }), Y.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${h} \u0E1B\u0E35 \xB7 \u0E0A\u0E32\u0E22 ${i} \u0E2B\u0E0D\u0E34\u0E07 ${x}`,
          action: "monitor age-specific yield \xB7 gender comparison \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A TB/CA detection"
        }), Y.push({
          sev: "info",
          cat: "Cost Analysis",
          msg: `\u0E04\u0E48\u0E32 CXR \u0E23\u0E27\u0E21 ${z.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Visit \u0E23\u0E27\u0E21 ${c.toLocaleString()} \u0E1A\u0E32\u0E17`,
          action: "monitor CXR-to-Visit ratio \xB7 ratio \u0E2A\u0E39\u0E07 = CXR \u0E40\u0E1B\u0E47\u0E19 primary reason"
        });
        const d = [{
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
            rows: $.map(o => [{
              v: o.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: o.name || "\u2014",
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
              v: o.totalInc,
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
            rows: Object.entries(b).map(([o, g]) => [{
              v: o,
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
              v: o === "80+" ? "high frailty risk" : "",
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
            rows: W.slice(0, 10).map(([o, g]) => [{
              v: o,
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
          l = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 CXR", "\u0E04\u0E48\u0E32 CXR", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          P = t.map(o => [o.no, o.pt_name, o.hn, o.sex, o.age_y, o.cid, o.pttype_name, o.vstdate, o.department, o.address, o.mobile_phone_number, o.cxr_name, o.cxr_price, o.icd10, o.icd10name, o.income, o.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(o => o.x), vu([0, 1])).then(o => {
          e(o, {
            filename: `BCH360_Elderly_CXR_60plus_${c0}_${p0}.xlsx`,
            titleEmoji: "\u2622\uFE0F",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E17\u0E35\u0E48\u0E21\u0E35 Chest X-Ray",
            themeColor: "7C3AED",
            themeColorLight: "6D28D9",
            dateRange: {
              start: c0,
              end: p0
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
              value: z,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E04\u0E48\u0E32 X-Ray"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)",
              value: c,
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
              value: x,
              unit: "\u0E23\u0E32\u0E22",
              color: "EC4899",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(x/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: h,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age (\u226560)"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit",
              value: p,
              unit: "\u0E1A\u0E32\u0E17",
              color: "2563EB",
              fmt: "#,##0.00",
              note: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 visit"
            }],
            breakdowns: d,
            insights: Y,
            references: [
              ["CXR ICD Codes", "14 \u0E23\u0E2B\u0E31\u0E2A (CXR AP, PA, Lordotic, Lateral, Portable, \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E)"],
              ["Target Group", "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E15\u0E32\u0E21\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E01\u0E23\u0E30\u0E17\u0E23\u0E27\u0E07\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E2A\u0E38\u0E02 (\u2260 WHO \u226565)"],
              ["Screening Focus", "TB (A15-A19), Lung CA (C33-C34), Pneumonia (J12-J18)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Elderly CXR 60+",
            patientHeader: l,
            patientData: P,
            patientColWidths: [6, 22, 10, 6, 6, 16, 22, 11, 16, 30, 14, 22, 10, 14, 30, 11, 32],
            patientIncomeCols: [12, 15]
          })
        });
        return
      }
      if (n === "imaging-services") {
        if (!i0?.patients) return;
        const t = i0.patients,
          c = i0.services || ["XRAY", "CT", "Portable", "BMD"],
          z = i0.service_labels || {},
          r = i0.service_counts || {},
          p = i0.total_income || 0,
          i = i0.total_imaging_price || 0,
          x = i0.unique_patients || new Set(t.map(m => m.hn)).size,
          h = t.length > 0 ? Math.round(p / t.length) : 0,
          b = t.length > 0 ? Math.round(i / t.length) : 0,
          C = t.filter(m => m.sex === "\u0E0A\u0E32\u0E22").length,
          $ = t.filter(m => m.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
          F = t.length > 0 ? Math.round(t.reduce((m, L) => m + (Number(L.age_y) || 0), 0) / t.length) : 0,
          W = {
            "<20": 0,
            "20-39": 0,
            "40-59": 0,
            "60-79": 0,
            "80+": 0
          };
        t.forEach(m => {
          const L = Number(m.age_y) || 0;
          L < 20 ? W["<20"]++ : L < 40 ? W["20-39"]++ : L < 60 ? W["40-59"]++ : L < 80 ? W["60-79"]++ : W["80+"]++
        });
        const R = {};
        t.forEach(m => {
          (m.icd_pairs || "").split("||").filter(Boolean).forEach(L => {
            const [A, S] = L.split("::"), U = (A || "").toUpperCase();
            !U || !iu.test(U) || (R[U] || (R[U] = {
              code: U,
              name: S || "",
              count: 0,
              totalInc: 0
            }), R[U].count++, R[U].totalInc += m.income || 0)
          })
        });
        const f = Object.values(R).sort((m, L) => L.count - m.count).slice(0, 10),
          _ = {};
        t.forEach(m => {
          const L = m.pttype_name || "-";
          _[L] || (_[L] = {
            count: 0,
            income: 0
          }), _[L].count++, _[L].income += m.income || 0
        });
        const Y = Object.entries(_).sort((m, L) => L[1].count - m[1].count),
          d = [];
        r.CT > 0 && d.push({
          sev: "info",
          cat: "CT Volume",
          msg: `CT scans: ${r.CT} \u0E23\u0E32\u0E22 \u2014 \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21 high-resource imaging`,
          action: "monitor radiation dose \xB7 review CT appropriateness \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 ALARA principle"
        }), r.BMD > 0 && d.push({
          sev: "info",
          cat: "BMD Screening",
          msg: `BMD (DEXA): ${r.BMD} \u0E23\u0E32\u0E22 \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 osteoporosis`,
          action: "F/U FRAX score \xB7 vitamin D + Ca supplement \xB7 fall prevention \xB7 pharmacotherapy \u0E15\u0E32\u0E21 T-score"
        }), r.Portable > t.length * .2 && d.push({
          sev: "med",
          cat: "Portable High Use",
          msg: `Portable X-Ray \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34: ${r.Portable} \u0E04\u0E23\u0E31\u0E49\u0E07 (${Math.round(r.Portable/t.length*100)}%)`,
          action: "review portable necessity \xB7 admin-only when patient cannot transfer \xB7 cost is 40% \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32 standard"
        }), r.XRAY > 0 && d.push({
          sev: "info",
          cat: "X-Ray Volume",
          msg: `Plain X-Ray: ${r.XRAY} \u0E23\u0E32\u0E22 \u2014 \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19 high-volume`,
          action: "monitor turnaround time \xB7 digital radiography efficiency check"
        }), d.push({
          sev: "info",
          cat: "Cost Summary",
          msg: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 imaging \u0E23\u0E27\u0E21 ${i.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${b.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22`,
          action: "analyze cost-per-procedure trend \xB7 benchmark \u0E01\u0E31\u0E1A\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07"
        });
        const l = {
            XRAY: "3B82F6",
            CT: "7C3AED",
            Portable: "F59E0B",
            BMD: "EC4899"
          },
          P = [{
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
            rows: c.map(m => [{
              v: m,
              align: "center",
              font: {
                bold: !0,
                sz: 12,
                color: {
                  rgb: l[m] || "7C3AED"
                }
              }
            }, {
              v: r[m] || 0,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? (r[m] || 0) / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: z[m] || "",
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
            rows: f.map(m => [{
              v: m.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: m.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: m.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: m.totalInc,
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
            rows: Object.entries(W).map(([m, L]) => [{
              v: m,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: L,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? L / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: m === "60-79" || m === "80+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u2014 common imaging users" : "",
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
            rows: Y.slice(0, 10).map(([m, L]) => [{
              v: m,
              align: "left",
              wrap: !0
            }, {
              v: L.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? L.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: L.income,
              align: "right",
              fmt: "#,##0.00",
              font: {
                color: {
                  rgb: "10B981"
                }
              }
            }])
          }],
          o = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23", "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23 Imaging", "\u0E23\u0E2B\u0E31\u0E2A", "\u0E04\u0E48\u0E32 Imaging", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19 Visit", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          g = t.map(m => [m.no, m.pt_name, m.hn, m.sex, m.age_y, m.cid, m.pttype_name, m.vstdate, m.vsttime, m.department, m.address, m.mobile_phone_number, m.service_groups, m.service_names, m.service_codes, m.imaging_price, m.icd10, m.icd10name, m.income, m.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(m => m.x), vu([0, 1])).then(m => {
          e(m, {
            filename: `BCH360_Imaging_${c0}_${p0}.xlsx`,
            titleEmoji: "\u{1FA7B}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 XRAY / CT / Portable / BMD",
            themeColor: "7C3AED",
            themeColorLight: "6D28D9",
            dateRange: {
              start: c0,
              end: p0
            },
            dataSource: i0.data_source || "HOSxP XE \xB7 opitemrece + nondrugitems",
            totalCount: t.length,
            uniqueCount: x,
            kpis: [{
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit \u0E23\u0E27\u0E21",
              value: t.length,
              unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
              color: "7C3AED",
              fmt: "#,##0",
              note: "\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E21\u0E32 imaging \u0E17\u0E38\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17"
            }, {
              label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)",
              value: x,
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
              value: p,
              unit: "\u0E1A\u0E32\u0E17",
              color: "047857",
              fmt: "#,##0.00",
              note: "\u0E23\u0E27\u0E21\u0E17\u0E38\u0E01\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E43\u0E19 visit"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Imaging/\u0E23\u0E32\u0E22",
              value: b,
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
              value: $,
              unit: "\u0E23\u0E32\u0E22",
              color: "EC4899",
              fmt: "#,##0",
              note: `${t.length>0?Math.round($/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: F,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age"
            }],
            breakdowns: P,
            insights: d,
            references: [
              ["\u0E01\u0E32\u0E23\u0E08\u0E33\u0E41\u0E19\u0E01", "XRAY = X-ray \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B \xB7 CT = CT scan \xB7 Portable = X-ray \u0E40\u0E04\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E17\u0E35\u0E48 \xB7 BMD = Bone Density (DEXA)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "HOSxP XE \xB7 ovst + opitemrece + nondrugitems (filter \u0E15\u0E32\u0E21\u0E0A\u0E37\u0E48\u0E2D\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Imaging Patients",
            patientHeader: o,
            patientData: g,
            patientColWidths: [6, 22, 10, 6, 6, 16, 22, 11, 9, 16, 30, 14, 16, 30, 18, 12, 14, 30, 11, 32],
            patientIncomeCols: [15, 18]
          })
        });
        return
      }
      if (n === "opd-compare") {
        if (!D?.comparison) return;
        const t = (C, $) => C > 0 ? Math.round(($ - C) / C * 100) + "%" : $ > 0 ? "100%" : "0%",
          c = D.fiscal_years?.fy1?.label || "\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19",
          z = D.fiscal_years?.fy2?.label || "\u0E1B\u0E35\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19",
          r = ["visits", "patients", "revenue", "drug_cost", "lab_cost", "xray_cost", "avg_income"],
          p = ["Visit", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 X-ray", "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit"],
          i = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...p.map(C => `${C} (${c})`), ...p.map(C => `${C} (${z})`), ...p.map(C => `YoY ${C} %`)],
          x = D.comparison.map(C => [C.month, ...r.map($ => C.fy1[$]), ...r.map($ => C.fy2[$]), ...r.map($ => t(C.fy1[$], C.fy2[$]))]),
          h = D.fy1_totals,
          b = D.fy2_totals;
        x.push(["\u0E23\u0E27\u0E21", ...r.map(C => h[C]), ...r.map(C => b[C]), ...r.map(C => t(h[C], b[C]))]), du(() => import("./xlsx-BuHXVOW6.js"), []).then(C => {
          const $ = C.utils.aoa_to_sheet([i, ...x]);
          $["!cols"] = i.map((W, R) => ({
            wch: Math.min(Math.max(W.length + 2, 10), 25)
          }));
          const F = C.utils.book_new();
          C.utils.book_append_sheet(F, $, "OPD Compare"), C.writeFile(F, `BCH360_OPD_Compare_${c0}_${p0}.xlsx`)
        });
        return
      }
      if (n === "resource-opd" || n === "resource-ipd") {
        const t = n === "resource-opd" ? J0 : X0;
        if (!t?.comparison) return;
        const c = n === "resource-opd" ? "OPD" : "IPD",
          z = n === "resource-opd" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19",
          r = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `Lab \u0E04\u0E23\u0E31\u0E49\u0E07 (${a0})`, `Lab \u0E1A\u0E32\u0E17 (${a0})`, `Drug \u0E04\u0E23\u0E31\u0E49\u0E07 (${a0})`, `Drug \u0E1A\u0E32\u0E17 (${a0})`, `Xray \u0E04\u0E23\u0E31\u0E49\u0E07 (${a0})`, `Xray \u0E1A\u0E32\u0E17 (${a0})`, `\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07 (${a0})`, `\u0E23\u0E27\u0E21\u0E1A\u0E32\u0E17 (${a0})`, `Lab \u0E04\u0E23\u0E31\u0E49\u0E07 (${Z})`, `Lab \u0E1A\u0E32\u0E17 (${Z})`, `Drug \u0E04\u0E23\u0E31\u0E49\u0E07 (${Z})`, `Drug \u0E1A\u0E32\u0E17 (${Z})`, `Xray \u0E04\u0E23\u0E31\u0E49\u0E07 (${Z})`, `Xray \u0E1A\u0E32\u0E17 (${Z})`, `\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07 (${Z})`, `\u0E23\u0E27\u0E21\u0E1A\u0E32\u0E17 (${Z})`, "\u0E08\u0E33\u0E19\u0E27\u0E19 %", "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 %"],
          p = (W, R) => R > 0 ? Math.round((W - R) / R * 100) : W > 0 ? 100 : 0,
          i = t.comparison.filter(W => W.fy1?.has_data || W.fy2?.has_data).map(W => {
            const R = W.fy1,
              f = W.fy2,
              _ = R.lab_orders + R.drug_orders + R.xray_orders,
              Y = R.lab_price + R.drug_price + R.xray_price,
              d = f.lab_orders + f.drug_orders + f.xray_orders,
              l = f.lab_price + f.drug_price + f.xray_price,
              P = R.has_data && f.has_data ? p(d, _) : "",
              o = R.has_data && f.has_data ? p(l, Y) : "";
            return [W.month, R.lab_orders || "", R.lab_price || "", R.drug_orders || "", R.drug_price || "", R.xray_orders || "", R.xray_price || "", R.has_data ? _ : "", R.has_data ? Y : "", f.lab_orders || "", f.lab_price || "", f.drug_orders || "", f.drug_price || "", f.xray_orders || "", f.xray_price || "", f.has_data ? d : "", f.has_data ? l : "", P !== "" ? `${P}%` : "", o !== "" ? `${o}%` : ""]
          }),
          x = t.fy1_totals,
          h = t.fy2_totals,
          b = x.lab_orders + x.drug_orders + x.xray_orders,
          C = x.lab_price + x.drug_price + x.xray_price,
          $ = h.lab_orders + h.drug_orders + h.xray_orders,
          F = h.lab_price + h.drug_price + h.xray_price;
        i.push(["\u0E23\u0E27\u0E21", x.lab_orders, x.lab_price, x.drug_orders, x.drug_price, x.xray_orders, x.xray_price, b, C, h.lab_orders, h.lab_price, h.drug_orders, h.drug_price, h.xray_orders, h.xray_price, $, F, `${t.overall_orders_growth_pct}%`, `${t.overall_price_growth_pct}%`]), du(() => import("./xlsx-BuHXVOW6.js"), []).then(W => {
          const R = [r, ...i],
            f = W.utils.aoa_to_sheet(R);
          f["!cols"] = r.map((Y, d) => {
            const l = Math.max(Y.length, ...i.map(P => String(P[d] ?? "").length));
            return {
              wch: Math.min(Math.max(l + 2, 8), 28)
            }
          });
          const _ = W.utils.book_new();
          W.utils.book_append_sheet(_, f, `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${z}`), W.writeFile(_, `BCH360_Resource_${c}_Monthly_${a0}_${Z}.xlsx`)
        });
        return
      }
      if (n === "ncd-disease") {
        if (!q) return;
        const {
          pts: t,
          totalIncome: c,
          uniquePatients: z,
          avgIncome: r,
          maleCount: p,
          femaleCount: i,
          ageGroups: x,
          topIcd: h,
          rightList: b,
          ckdCount: C,
          ckdWithEgfrCount: $,
          avgEgfr: F,
          advancedCkd: W
        } = q, R = m0.diseases || ["DM", "HT", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD"], f = m0.disease_labels || {}, _ = q.diseaseCountsFE || m0.disease_counts || {}, Y = {
          length: $
        }, d = h.slice(0, 10), l = [], P = Math.max(1, Math.ceil((new Date(p0) - new Date(c0)) / 864e5) + 1), o = t.length / P, g = Math.round(o * 250);
        if (W > 0) {
          const v = Math.round(W / Math.max(C, 1) * 100);
          l.push({
            sev: "critical",
            cat: "CKD \u0E23\u0E30\u0E22\u0E30\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07",
            msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD Stage 4-5 \u0E08\u0E33\u0E19\u0E27\u0E19 ${W} \u0E23\u0E32\u0E22 (${v}% \u0E02\u0E2D\u0E07 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14)`,
            action: "\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D Nephrologist \u0E20\u0E32\u0E22\u0E43\u0E19 1 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Renal Replacement Therapy (HD/PD/KT) \xB7 \u0E09\u0E35\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19 HBV/Pneumococcal \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 dietitian (low protein diet)"
          })
        }
        const m = t.filter(v => v.egfr != null && v.egfr < 30).length;
        if (m > 0) {
          const v = Math.round(m / t.length * 100);
          l.push({
            sev: "critical",
            cat: "Renal Function",
            msg: `eGFR <30 ml/min/1.73m\xB2 (Severe CKD): ${m} \u0E23\u0E32\u0E22 (${v}%)`,
            action: "\u0E2B\u0E25\u0E35\u0E01\u0E40\u0E25\u0E35\u0E48\u0E22\u0E07 nephrotoxic drugs (NSAIDs, contrast, aminoglycosides) \xB7 \u0E1B\u0E23\u0E31\u0E1A dose \u0E22\u0E32\u0E15\u0E32\u0E21 eGFR \xB7 \u0E40\u0E23\u0E34\u0E48\u0E21 Renal team referral \xB7 counsel vascular access"
          })
        }
        const L = t.filter(v => /DM/.test(v.disease_groups) && /HT/.test(v.disease_groups) && /CKD/.test(v.disease_groups)).length;
        if (L > 0) {
          const v = Math.round(L / t.length * 100);
          l.push({
            sev: "high",
            cat: "Triple Comorbidity",
            msg: `DM + HT + CKD \u0E23\u0E48\u0E27\u0E21 ${L} \u0E23\u0E32\u0E22 (${v}%) \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 CV event \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14`,
            action: "First-line: ACEi/ARB + SGLT2i \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HbA1c <7%, BP <130/80, LDL <70 \xB7 \u0E15\u0E23\u0E27\u0E08 UACR \u0E17\u0E38\u0E01 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E07\u0E14 NSAIDs"
          })
        }
        const A = t.filter(v => /Stroke/.test(v.disease_groups) && /HT/.test(v.disease_groups)).length;
        A > 0 && l.push({
          sev: "high",
          cat: "Secondary Prevention",
          msg: `Stroke + HT ${A} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 recurrence stroke 7-10% \u0E15\u0E48\u0E2D\u0E1B\u0E35\u0E2B\u0E32\u0E01\u0E44\u0E21\u0E48\u0E04\u0E38\u0E21 BP`,
          action: "BP target <130/80 mmHg \xB7 Antiplatelet (ASA \u0E2B\u0E23\u0E37\u0E2D Clopidogrel) \xB7 Statin (LDL <70) \xB7 \u0E07\u0E14\u0E2A\u0E39\u0E1A\u0E1A\u0E38\u0E2B\u0E23\u0E35\u0E48 \xB7 physiotherapy/rehab"
        }), _.IHD > 0 && l.push({
          sev: "high",
          cat: "IHD Management",
          msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IHD ${_.IHD} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 secondary prevention \u0E40\u0E15\u0E47\u0E21\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A`,
          action: "ASA + Statin lifelong \xB7 \u03B2-blocker \u0E2B\u0E23\u0E37\u0E2D ACEi/ARB \xB7 cardiac rehab \xB7 annual ECG/Echo"
        });
        const S = t.filter(v => Number(v.age_y) >= 60).length,
          U = t.filter(v => {
            const e0 = (v.disease_groups || "").split(",").filter(Boolean);
            return Number(v.age_y) >= 65 && e0.length >= 3
          }).length;
        if (U > 0) {
          const v = Math.round(U / t.length * 100);
          l.push({
            sev: "med",
            cat: "Polypharmacy / Geriatric",
            msg: `\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u226565 \u0E1B\u0E35 + NCD \u22653 \u0E42\u0E23\u0E04: ${U} \u0E23\u0E32\u0E22 (${v}%) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 drug interaction & falls`,
            action: "\u0E17\u0E33 medication review (Beers criteria) \xB7 \u0E25\u0E14 anticholinergic burden \xB7 screening fall risk + osteoporosis \xB7 \u0E15\u0E23\u0E27\u0E08 kidney function \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19"
          })
        }
        if (S > 0) {
          const v = Math.round(S / t.length * 100);
          l.push({
            sev: "info",
            cat: "Demographic",
            msg: `\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u226560 \u0E1B\u0E35: ${S} visit (${v}%) \u0E02\u0E2D\u0E07 NCD clinic`,
            action: "\u0E08\u0E31\u0E14 geriatric assessment \xB7 counseling cognitive decline screening \xB7 home visit \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E15\u0E34\u0E14\u0E1A\u0E49\u0E32\u0E19"
          })
        }
        const B = t.filter(v => /CKD/.test(v.disease_groups || "") && v.creatinine == null).length;
        if (B > 0) {
          const v = Math.round(B / Math.max(C, 1) * 100);
          l.push({
            sev: "med",
            cat: "Lab Monitoring Gap",
            msg: `CKD \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35 Cr \u0E43\u0E19 365 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14: ${B} \u0E23\u0E32\u0E22 (${v}% \u0E02\u0E2D\u0E07 CKD)`,
            action: "\u0E19\u0E31\u0E14 Cr/eGFR + UACR \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19 \xB7 \u0E15\u0E31\u0E49\u0E07 auto-reminder \u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A HOSxP \xB7 staging redo"
          })
        }
        const w = t.filter(v => {
          const e0 = (v.chief_complaint || "").toLowerCase();
          return /uncontrol|severe|crisis|admit|emergen|พบแพทย์|ฉุกเฉิน/.test(e0)
        }).length;
        w > 0 && l.push({
          sev: "high",
          cat: "Disease Control",
          msg: `\u0E1E\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E04\u0E38\u0E21\u0E42\u0E23\u0E04\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E43\u0E19 CC: ${w} \u0E23\u0E32\u0E22`,
          action: "review medication adherence \xB7 titrate dose \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 intensive case management \xB7 admit \u0E2B\u0E32\u0E01\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19"
        });
        const j = t.filter(v => r > 0 && (v.income || 0) > r * 2.5).length;
        if (j > 0) {
          const v = Math.round(j / t.length * 100),
            e0 = t.filter(f0 => (f0.income || 0) > r * 2.5).reduce((f0, O0) => f0 + (O0.income || 0), 0);
          l.push({
            sev: "info",
            cat: "Cost Outlier",
            msg: `High-cost outliers (>2.5\xD7 avg): ${j} \u0E23\u0E32\u0E22 (${v}%) \u2014 \u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${e0.toLocaleString()} \u0E1A\u0E32\u0E17`,
            action: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C resource drivers (lab/drug/imaging) \xB7 case management \xB7 \u0E43\u0E0A\u0E49 generic drugs \xB7 pharmacy intervention"
          })
        }
        const M = t.filter(v => /UC|บัตรทอง/i.test(v.pttype_name || "")).length;
        if (M > 0) {
          const v = Math.round(M / t.length * 100);
          l.push({
            sev: v > 80 ? "med" : "info",
            cat: "Payer Mix",
            msg: `UC/\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07: ${v}% (${M}/${t.length}) \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${r.toLocaleString()} \u0E1A\u0E32\u0E17/visit`,
            action: v > 80 ? "Cap budget pressure \u0E2A\u0E39\u0E07 \u2014 \u0E40\u0E19\u0E49\u0E19 disease management \u0E25\u0E14 admission \xB7 negotiate \u0E01\u0E31\u0E1A \u0E2A\u0E1B\u0E2A\u0E0A. \xB7 monitor budget impact \u0E02\u0E2D\u0E07 SGLT2i/GLP-1" : "\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2A\u0E21\u0E14\u0E38\u0E25 payer mix \xB7 monitor private/social-security trend"
          })
        }
        const T = {};
        t.forEach(v => {
          const e0 = (v.address || "").match(/ต\.([\u0E00-\u0E7F]+)/),
            f0 = e0 ? e0[1] : "\u0E2D\u0E37\u0E48\u0E19\u0E46";
          T[f0] = (T[f0] || 0) + 1
        });
        const G = Object.entries(T).sort((v, e0) => e0[1] - v[1])[0];
        if (G && G[1] > t.length * .25) {
          const v = Math.round(G[1] / t.length * 100);
          l.push({
            sev: "info",
            cat: "Geographic Hotspot",
            msg: `\u0E15\u0E33\u0E1A\u0E25 ${G[0]} \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07: ${G[1]} \u0E23\u0E32\u0E22 (${v}%)`,
            action: "\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 community health worker / outreach NCD clinic \xB7 screening campaign \xB7 health literacy training \u0E43\u0E19\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48"
          })
        }
        const E0 = t.filter(v => /J45|J46/.test(v.icd10 || "")).length;
        if (E0 > 0) {
          const v = (_.COPD || 0) - E0;
          l.push({
            sev: "info",
            cat: "Classification Note",
            msg: `\u0E01\u0E25\u0E38\u0E48\u0E21 "COPD" \u0E21\u0E35 Asthma (J45-46) \u0E1B\u0E19\u0E2D\u0E22\u0E39\u0E48 ${E0} \u0E23\u0E32\u0E22 \u2014 COPD \u0E41\u0E17\u0E49: ${v} \u0E23\u0E32\u0E22`,
            action: "\u0E41\u0E22\u0E01 Asthma vs COPD \u0E43\u0E19 reporting \u0E40\u0E1E\u0E37\u0E48\u0E2D accuracy \u0E02\u0E2D\u0E07 NCD program \xB7 \u0E43\u0E0A\u0E49 inhaler protocol \u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19"
          })
        }
        l.push({
          sev: "info",
          cat: "Operational Forecast",
          msg: `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${o.toFixed(1)} visit/\u0E27\u0E31\u0E19 (${t.length} visit \u0E43\u0E19 ${P} \u0E27\u0E31\u0E19) \xB7 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E1B\u0E35 ~${g.toLocaleString()} visit`,
          action: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 manpower \xB7 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 drug stock \xB7 \u0E02\u0E22\u0E32\u0E22 slot \u0E0A\u0E48\u0E27\u0E07 peak (\u0E15.\u0E04.-\u0E01.\u0E1E.) \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 NCD clinic \u0E40\u0E1B\u0E34\u0E14\u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E1A\u0E48\u0E32\u0E22"
        });
        const u0 = t.filter(v => v.ckd_stage === "CKD3").length,
          b0 = t.filter(v => v.ckd_stage === "CKD4").length,
          W0 = t.filter(v => v.ckd_stage === "CKD5").length;
        if (u0 + b0 + W0 > 0) {
          const v = Math.round(u0 * .05),
            e0 = Math.round(b0 * .07),
            f0 = (W0 + e0) * 936e3;
          l.push({
            sev: e0 > 0 ? "med" : "info",
            cat: "Projection \xB7 12 months",
            msg: `\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C: CKD3\u21924 ~${v} \u0E23\u0E32\u0E22 \xB7 CKD4\u2192ESRD ~${e0} \u0E23\u0E32\u0E22 \xB7 ESRD \u0E23\u0E27\u0E21 ${W0+e0} \u0E23\u0E32\u0E22 \u2192 HD cost ~${f0.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E1B\u0E35`,
            action: `\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 HD slot (~${W0+e0} \u0E23\u0E32\u0E22) \xB7 vascular access creation \u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 counseling KT/PD options \xB7 negotiate \u0E01\u0E31\u0E1A \u0E2A\u0E1B\u0E2A\u0E0A. CAPD bag stock`
          })
        }
        const U0 = t.filter(v => {
          const e0 = v.disease_groups || "";
          return (Number(v.age_y) || 0) >= 60 && /HT/.test(e0) && (/DM/.test(e0) || /CKD/.test(e0))
        }).length;
        if (U0 > 0) {
          const v = Math.round(U0 / t.length * 100);
          l.push({
            sev: "high",
            cat: "CV Risk Stratification",
            msg: `High CV risk (\u0E2D\u0E32\u0E22\u0E38\u226560 + HT + DM/CKD): ${U0} \u0E23\u0E32\u0E22 (${v}%)`,
            action: "Statin (LDL <70 mg/dL) \xB7 BP <130/80 \xB7 ASA primary prevention \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E15\u0E32\u0E21\u0E40\u0E04\u0E2A \xB7 ECG annually \xB7 counsel lifestyle"
          })
        }
        const yu = (() => {
          const v = t.length > 0 ? t.filter(f0 => f0.creatinine != null).length / t.length : 0,
            e0 = C > 0 ? 1 - W / C : 1;
          return Math.round(v * 50 + e0 * 50)
        })();
        l.push({
          sev: yu >= 80 ? "good" : yu >= 60 ? "med" : "high",
          cat: "NCD Quality Score",
          msg: `NCD Quality Composite: ${yu}/100 (Lab monitoring + Severity mix)`,
          action: yu < 60 ? "\u0E40\u0E1E\u0E34\u0E48\u0E21 annual lab screening \xB7 \u0E15\u0E31\u0E49\u0E07 quality improvement project \xB7 M&M conference \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A stage progression cases" : yu < 80 ? "\u0E02\u0E22\u0E32\u0E22 screening coverage \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 case \u0E21\u0E35 CKD progression \xB7 maintain monitoring frequency" : "maintain current standard \xB7 \u0E40\u0E1C\u0E22\u0E41\u0E1E\u0E23\u0E48 best practice \u0E20\u0E32\u0E22\u0E43\u0E19\u0E41\u0E25\u0E30\u0E20\u0E32\u0E22\u0E19\u0E2D\u0E01"
        }), l.length === 0 && l.push({
          sev: "good",
          cat: "Overall",
          msg: "\u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D",
          action: "\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E21\u0E41\u0E1C\u0E19\u0E1B\u0E01\u0E15\u0E34 \xB7 maintain current protocols \xB7 routine quality monitoring"
        });
        const y = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 NCD", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D ICD-10", "Cr (mg/dL)", "eGFR", "CKD Stage", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          N = t.map(v => [v.no, v.pt_name, v.hn, v.sex, v.age_y ?? "", v.cid, v.pttype_name, v.vstdate, v.vsttime, v.department, v.address, v.mobile_phone_number, v.disease_groups, v.icd10, v.icd10name, v.creatinine ?? "", v.egfr ?? "", v.ckd_stage ?? "", v.income, v.chief_complaint]);
        du(() => import("./xlsx.min-CZi5yKex.js").then(v => v.x), vu([0, 1])).then(v => {
          const e0 = v.utils.book_new(),
            f0 = "Sarabun",
            O0 = 8,
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
            Tu = {
              style: "thin",
              color: {
                rgb: "E2E8F0"
              }
            },
            zu = {
              style: "medium",
              color: {
                rgb: "CBD5E1"
              }
            },
            eu = {
              top: Tu,
              bottom: Tu,
              left: Tu,
              right: Tu
            },
            bu = {},
            Uu = [],
            w0 = [],
            O = (K, n0, D0, B0) => {
              const T0 = typeof D0 == "number" ? "n" : "s";
              bu[v.utils.encode_cell({
                r: K,
                c: n0
              })] = B0 ? {
                v: D0,
                t: T0,
                s: B0
              } : {
                v: D0,
                t: T0
              }
            },
            o0 = (K, n0, D0, B0) => Uu.push({
              s: {
                r: K,
                c: n0
              },
              e: {
                r: D0,
                c: B0
              }
            }),
            cu = (K = 12) => {
              w0[s] = {
                hpx: K
              }, s++
            },
            dE = {
              font: {
                name: f0,
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
                top: zu,
                bottom: zu,
                left: zu,
                right: zu
              }
            },
            cE = {
              font: {
                name: f0,
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
            pE = {
              font: {
                name: f0,
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
            pu = K => ({
              font: {
                name: f0,
                sz: 14,
                bold: !0,
                color: {
                  rgb: I.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: K
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                indent: 1
              },
              border: {
                bottom: zu
              }
            }),
            qu = {
              font: {
                name: f0,
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
              border: eu
            },
            Ju = (K, n0) => ({
              font: {
                name: f0,
                sz: 18,
                bold: !0,
                color: {
                  rgb: K || I.text
                }
              },
              alignment: {
                horizontal: "right",
                vertical: "center",
                indent: 1
              },
              border: eu,
              numFmt: n0 || "#,##0"
            }),
            Qu = {
              font: {
                name: f0,
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
              border: eu,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.slateSoft
                }
              }
            },
            Zu = {
              font: {
                name: f0,
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
              border: eu,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.slateSoft
                }
              }
            },
            M0 = K => ({
              font: {
                name: f0,
                sz: 11,
                bold: !0,
                color: {
                  rgb: I.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: K
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: !0
              },
              border: eu
            }),
            L0 = (K = {}) => ({
              font: {
                name: f0,
                sz: 10,
                color: {
                  rgb: I.text
                },
                ...K.font || {}
              },
              alignment: {
                horizontal: K.align || "left",
                vertical: "center",
                wrapText: !!K.wrap,
                indent: K.align === "left" ? 1 : 0
              },
              border: eu,
              fill: K.bg ? {
                patternType: "solid",
                fgColor: {
                  rgb: K.bg
                }
              } : void 0,
              numFmt: K.numFmt
            });
          let s = 0;
          O(s, 0, "\u{1FAC0}  \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04", dE), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 56
          }, s++, O(s, 0, `\u{1F4C5}  \u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25:  ${m0.date_range.start}  \u2192  ${m0.date_range.end}    \xB7    \u{1F465}  ${t.length.toLocaleString()} visit  /  ${z.toLocaleString()} \u0E23\u0E32\u0E22`, cE), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 28
          }, s++, O(s, 0, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D:  ${new Date().toLocaleString("th-TH")}    \xB7    ${m0.data_source||""}`, pE), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 18
          }, s++, cu(8), O(s, 0, "\u{1F4CA}  KPI \u0E2A\u0E23\u0E38\u0E1B", pu(I.purpleDark)), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 32
          }, s++;
          const hE = [
            ["\u0E08\u0E33\u0E19\u0E27\u0E19 Visit NCD", t.length, "\u0E04\u0E23\u0E31\u0E49\u0E07", I.purpleDark, "#,##0", "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E01\u0E32\u0E23\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E23\u0E27\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"],
            ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)", z, "\u0E23\u0E32\u0E22", I.purple, "#,##0", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25 \u0E19\u0E31\u0E1A 1 HN \u0E15\u0E48\u0E2D 1 \u0E04\u0E23\u0E31\u0E49\u0E07"],
            ["\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)", c, "\u0E1A\u0E32\u0E17", I.green, "#,##0.00", "\u0E22\u0E2D\u0E14 income \u0E08\u0E32\u0E01 vn_stat \u0E23\u0E27\u0E21\u0E17\u0E38\u0E01 visit"],
            ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit", r, "\u0E1A\u0E32\u0E17", I.blue, "#,##0.00", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 \u0E08\u0E33\u0E19\u0E27\u0E19 Visit"],
            ["\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E32\u0E22", p, "\u0E23\u0E32\u0E22", "0EA5E9", "#,##0", `${t.length>0?Math.round(p/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`],
            ["\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07", i, "\u0E23\u0E32\u0E22", "EC4899", "#,##0", `${t.length>0?Math.round(i/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`]
          ];
          for (const [K, n0, D0, B0, T0, au] of hE) O(s, 0, K, qu), o0(s, 0, s, 1), O(s, 2, n0, Ju(B0, T0)), o0(s, 2, s, 4), O(s, 5, D0, Qu), O(s, 6, au, Zu), o0(s, 6, s, 7), w0[s] = {
            hpx: 32
          }, s++;
          cu(12), O(s, 0, "\u{1FA7A}  \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 NCD", pu(I.blue)), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 32
          }, s++, O(s, 0, "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04", M0(I.blue)), O(s, 1, "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit", M0(I.blue)), o0(s, 1, s, 2), O(s, 3, "%", M0(I.blue)), o0(s, 3, s, 4), O(s, 5, "\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22 / ICD-10 Range", M0(I.blue)), o0(s, 5, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          let uE = 0;
          for (const K of R) {
            const n0 = _[K] || 0,
              D0 = t.length > 0 ? n0 / t.length : 0,
              B0 = n0 > t.length * .3,
              T0 = uE % 2 === 1 ? I.stripe : void 0;
            O(s, 0, K, L0({
              font: {
                bold: !0,
                sz: 12,
                color: {
                  rgb: B0 ? I.purpleDark : I.text
                }
              },
              align: "center",
              bg: T0
            })), O(s, 1, n0, L0({
              align: "right",
              numFmt: "#,##0",
              font: {
                sz: 11,
                bold: !0
              },
              bg: T0
            })), o0(s, 1, s, 2), O(s, 3, D0, L0({
              align: "right",
              numFmt: "0.0%",
              font: {
                color: {
                  rgb: B0 ? I.green : I.slate
                },
                bold: B0,
                sz: 11
              },
              bg: T0
            })), o0(s, 3, s, 4), O(s, 5, f[K] || "", L0({
              align: "left",
              bg: T0
            })), o0(s, 5, s, 7), w0[s] = {
              hpx: 24
            }, s++, uE++
          }
          cu(12), O(s, 0, "\u{1FAD8}  \u0E2A\u0E23\u0E38\u0E1B CKD (eGFR-based \xB7 CKD-EPI 2009)", pu(I.green)), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 32
          }, s++;
          const gE = [
            ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", C, "\u0E23\u0E32\u0E22", I.green, "#,##0", "\u0E23\u0E27\u0E21 Stage 1-5 + \u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38 stage"],
            ["CKD \u0E17\u0E35\u0E48\u0E21\u0E35\u0E15\u0E23\u0E27\u0E08 Cr / eGFR", Y.length, "\u0E23\u0E32\u0E22", I.green, "#,##0", `${C>0?Math.round(Y.length/C*100):0}% \u0E02\u0E2D\u0E07 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`],
            ["eGFR \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", F ?? 0, "ml/min/1.73m\xB2", F != null && F < 60 ? I.amber : I.green, "#,##0", F != null && F < 60 ? "\u26A0 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34 (\u226560)" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"],
            ["CKD Stage 4-5 (severe)", W, "\u0E23\u0E32\u0E22", W > 0 ? I.red : I.green, "#,##0", W > 0 ? "\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Renal Replacement Therapy" : "\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E04\u0E2A severe"]
          ];
          for (const [K, n0, D0, B0, T0, au] of gE) O(s, 0, K, qu), o0(s, 0, s, 1), O(s, 2, n0, Ju(B0, T0)), o0(s, 2, s, 4), O(s, 5, D0, Qu), O(s, 6, au, Zu), o0(s, 6, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          cu(12), O(s, 0, "\u{1F465}  \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38", pu(I.amber)), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 32
          }, s++, O(s, 0, "\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", M0(I.amber)), O(s, 1, "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit", M0(I.amber)), o0(s, 1, s, 3), O(s, 4, "%", M0(I.amber)), o0(s, 4, s, 5), O(s, 6, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38", M0(I.amber)), o0(s, 6, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          let EE = 0;
          for (const [K, n0] of Object.entries(x)) {
            const D0 = EE % 2 === 1 ? I.stripe : void 0,
              B0 = K === "70+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \xB7 monitor frailty" : K === "60-69" ? "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E15\u0E2D\u0E19\u0E15\u0E49\u0E19" : K === "<40" ? "NCD \u0E43\u0E19\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19" : "";
            O(s, 0, K, L0({
              align: "center",
              font: {
                bold: !0,
                sz: 12
              },
              bg: D0
            })), O(s, 1, n0, L0({
              align: "right",
              numFmt: "#,##0",
              font: {
                sz: 11,
                bold: !0
              },
              bg: D0
            })), o0(s, 1, s, 3), O(s, 4, t.length > 0 ? n0 / t.length : 0, L0({
              align: "right",
              numFmt: "0.0%",
              font: {
                sz: 11
              },
              bg: D0
            })), o0(s, 4, s, 5), O(s, 6, B0, L0({
              align: "left",
              font: {
                sz: 9,
                color: {
                  rgb: I.muted
                }
              },
              bg: D0
            })), o0(s, 6, s, 7), w0[s] = {
              hpx: 24
            }, s++, EE++
          }
          cu(12), O(s, 0, "\u{1F3C6}  Top 10 ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22", pu(I.purple)), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 32
          }, s++, O(s, 0, "ICD-10", M0(I.purple)), O(s, 1, "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", M0(I.purple)), o0(s, 1, s, 5), O(s, 6, "\u0E08\u0E33\u0E19\u0E27\u0E19", M0(I.purple)), O(s, 7, "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)", M0(I.purple)), w0[s] = {
            hpx: 30
          }, s++;
          let eE = 0;
          for (const K of d) {
            const n0 = eE % 2 === 1 ? I.stripe : void 0;
            O(s, 0, K.code, L0({
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: I.purpleDark
                }
              },
              bg: n0
            })), O(s, 1, K.name || "\u2014", L0({
              align: "left",
              wrap: !0,
              bg: n0
            })), o0(s, 1, s, 5), O(s, 6, K.count, L0({
              align: "right",
              numFmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              },
              bg: n0
            })), O(s, 7, K.totalInc, L0({
              align: "right",
              numFmt: "#,##0.00",
              font: {
                color: {
                  rgb: I.green
                }
              },
              bg: n0
            })), w0[s] = {
              hpx: 26
            }, s++, eE++
          }
          cu(12), O(s, 0, "\u{1F4B3}  \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 (Top 10)", pu(I.slate)), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 32
          }, s++, O(s, 0, "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32", M0(I.slate)), o0(s, 0, s, 4), O(s, 5, "\u0E08\u0E33\u0E19\u0E27\u0E19", M0(I.slate)), O(s, 6, "%", M0(I.slate)), O(s, 7, "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)", M0(I.slate)), w0[s] = {
            hpx: 30
          }, s++;
          let tE = 0;
          for (const [K, n0] of b.slice(0, 10)) {
            const D0 = tE % 2 === 1 ? I.stripe : void 0;
            O(s, 0, K, L0({
              align: "left",
              wrap: !0,
              font: {
                sz: 10
              },
              bg: D0
            })), o0(s, 0, s, 4), O(s, 5, n0.count, L0({
              align: "right",
              numFmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              },
              bg: D0
            })), O(s, 6, t.length > 0 ? n0.count / t.length : 0, L0({
              align: "right",
              numFmt: "0.0%",
              font: {
                sz: 11
              },
              bg: D0
            })), O(s, 7, n0.income, L0({
              align: "right",
              numFmt: "#,##0.00",
              font: {
                color: {
                  rgb: I.green
                }
              },
              bg: D0
            })), w0[s] = {
              hpx: 26
            }, s++, tE++
          }
          cu(12), O(s, 0, "\u{1F916}  AI Insights & \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23", pu(I.red)), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 32
          }, s++, O(s, 0, "\u0E23\u0E30\u0E14\u0E31\u0E1A", M0(I.red)), O(s, 1, "\u0E2B\u0E21\u0E27\u0E14", M0(I.red)), o0(s, 1, s, 2), O(s, 3, "\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E1A", M0(I.red)), o0(s, 3, s, 4), O(s, 5, "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 / Action", M0(I.red)), o0(s, 5, s, 7), w0[s] = {
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
            xE = [...l].sort((K, n0) => (rE[K.sev] ?? 9) - (rE[n0.sev] ?? 9)),
            oE = {
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
          for (const K of xE) {
            const n0 = oE[K.sev] || oE.info;
            O(s, 0, n0.label, {
              font: {
                name: f0,
                sz: 10,
                bold: !0,
                color: {
                  rgb: n0.fg
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: n0.bg
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: eu
            }), O(s, 1, K.cat, {
              font: {
                name: f0,
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
              border: eu
            }), o0(s, 1, s, 2), O(s, 3, K.msg, {
              font: {
                name: f0,
                sz: 10,
                bold: K.sev === "critical" || K.sev === "high",
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
              border: eu,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: n0.bg
                }
              }
            }), o0(s, 3, s, 4), O(s, 5, K.action, {
              font: {
                name: f0,
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
              border: eu,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: I.slateSoft
                }
              }
            }), o0(s, 5, s, 7);
            const D0 = (K.action || "").length,
              B0 = (K.msg || "").length,
              T0 = Math.max(Math.ceil(D0 / 80), Math.ceil(B0 / 40), 2);
            w0[s] = {
              hpx: Math.min(120, 22 + T0 * 16)
            }, s++
          }
          cu(12), O(s, 0, "\u{1F4DA}  \u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E25\u0E38\u0E48\u0E21", pu(I.muted)), o0(s, 0, s, O0 - 1), w0[s] = {
            hpx: 30
          }, s++;
          const mE = [
            ["CKD-EPI 2009", "eGFR \u226590 \u2192 Stage 1  \xB7  60-89 \u2192 Stage 2  \xB7  30-59 \u2192 Stage 3  \xB7  15-29 \u2192 Stage 4  \xB7  <15 \u2192 Stage 5"],
            ["ICD-10 NCD (Specific)", "DM: E11 (Type 2)  \xB7  HT: I10 (Essential)  \xB7  DLP: E78  \xB7  IHD: I25 (Chronic)  \xB7  Stroke: I69 (Sequelae)  \xB7  COPD: J44  \xB7  CKD: N18.x"],
            ["\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "HOSxP XE \xB7 ovst + ovstdiag (main_dep=024) \xB7 \u0E01\u0E23\u0E2D\u0E07\u0E14\u0E49\u0E27\u0E22 NCD ICD-10 codes \xB7 CKD stage \u0E08\u0E32\u0E01 eGFR \u0E2B\u0E23\u0E37\u0E2D N18.x suffix"],
            ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
          ];
          for (const [K, n0] of mE) {
            const D0 = K === "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22",
              B0 = D0 ? I.greenDark : I.slateDark,
              T0 = D0 ? I.greenDark : I.muted,
              au = D0 ? I.greenLight : I.slateSoft;
            O(s, 0, K, L0({
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: B0
                }
              },
              align: "left",
              bg: au
            })), o0(s, 0, s, 1), O(s, 2, n0, L0({
              font: {
                sz: D0 ? 11 : 9,
                bold: D0,
                color: {
                  rgb: T0
                }
              },
              align: "left",
              wrap: !0,
              bg: au
            })), o0(s, 2, s, 7), w0[s] = {
              hpx: 36
            }, s++
          }
          bu["!ref"] = v.utils.encode_range({
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: s - 1,
              c: O0 - 1
            }
          }), bu["!merges"] = Uu, bu["!cols"] = [{
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
          }], bu["!rows"] = w0, bu["!freeze"] = {
            xSplit: 0,
            ySplit: 3
          }, v.utils.book_append_sheet(e0, bu, "Overview");
          const Au = {};
          y.forEach((K, n0) => {
            Au[v.utils.encode_cell({
              r: 0,
              c: n0
            })] = {
              v: K,
              t: "s",
              s: {
                font: {
                  name: f0,
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
                border: eu
              }
            }
          }), N.forEach((K, n0) => {
            const D0 = n0 % 2 === 0 ? void 0 : "F8FAFC";
            K.forEach((B0, T0) => {
              const au = typeof B0 == "number",
                Hu = T0 === 17,
                iE = T0 === 18,
                fE = T0 === 16;
              let Xu = D0,
                Ku = I.text;
              Hu && B0 && (Xu = B0 === "CKD5" ? I.redLight : B0 === "CKD4" ? "FED7AA" : B0 === "CKD3" ? "FEF3C7" : I.greenLight, Ku = B0 === "CKD5" ? I.red : B0 === "CKD4" ? "C2410C" : B0 === "CKD3" ? "B45309" : "047857"), fE && typeof B0 == "number" && (Ku = B0 < 30 ? I.red : B0 < 60 ? "B45309" : "047857"), Au[v.utils.encode_cell({
                r: n0 + 1,
                c: T0
              })] = {
                v: B0,
                t: au ? "n" : "s",
                s: {
                  font: {
                    name: f0,
                    sz: 9,
                    bold: Hu || iE,
                    color: {
                      rgb: Ku
                    }
                  },
                  alignment: {
                    horizontal: au ? "right" : "left",
                    vertical: "center",
                    wrapText: !1
                  },
                  border: eu,
                  fill: Xu ? {
                    patternType: "solid",
                    fgColor: {
                      rgb: Xu
                    }
                  } : void 0,
                  numFmt: iE ? "#,##0.00" : au && !Hu ? "#,##0" : void 0
                }
              }
            })
          }), Au["!ref"] = v.utils.encode_range({
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: N.length,
              c: y.length - 1
            }
          }), Au["!cols"] = [6, 22, 10, 6, 6, 16, 24, 11, 9, 16, 30, 14, 18, 14, 30, 10, 9, 10, 11, 32].map(K => ({
            wch: K
          })), Au["!rows"] = [{
            hpx: 30
          }], Au["!freeze"] = {
            xSplit: 0,
            ySplit: 1
          }, v.utils.book_append_sheet(e0, Au, "Patient Data"), v.writeFile(e0, `BCH360_NCD_ByDisease_${c0}_${p0}.xlsx`)
        });
        return
      }
      if (n === "mortality") {
        if (!s0?.comparison) return;
        const t = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (${a0})`, `IPD \u0E15\u0E32\u0E22 (${a0})`, `IPD \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22% (${a0})`, `OPD \u0E15\u0E32\u0E22 (${a0})`, `\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 (${a0})`, `IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (${Z})`, `IPD \u0E15\u0E32\u0E22 (${Z})`, `IPD \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22% (${Z})`, `OPD \u0E15\u0E32\u0E22 (${Z})`, `\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 (${Z})`],
          c = s0.comparison.map(x => [x.month, x.fy1.ipd_discharge, x.fy1.ipd_deaths, x.fy1.ipd_mortality_rate, x.fy1.opd_deaths, x.fy1.total_deaths, x.fy2.ipd_discharge, x.fy2.ipd_deaths, x.fy2.ipd_mortality_rate, x.fy2.opd_deaths, x.fy2.total_deaths]),
          z = "\uFEFF" + [t.join(","), ...c.map(x => x.join(","))].join(`\r
`),
          r = new Blob([z], {
            type: "text/csv;charset=utf-8;"
          }),
          p = URL.createObjectURL(r),
          i = document.createElement("a");
        i.href = p, i.download = `BCH360_Mortality_${a0}_${Z}.csv`, i.click(), URL.revokeObjectURL(p)
      }
    }, [n, k, D, J0, X0, s0, C0, V, v0, $0, m0, a0, Z, c0, p0, xu, P0]),
    Yu = J.useMemo(() => {
      const e = [];
      for (let t = lu; t >= lu - 2; t--) e.push(t);
      return e
    }, [lu]),
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
            value: xu,
            onChange: e => Fu(e.target.value),
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
            value: P0,
            onChange: e => Pu(e.target.value),
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
            value: c0,
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
            value: c0,
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
            value: a0,
            onChange: e => ku(Number(e.target.value)),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            },
            children: Yu.map(e => u.jsxs("option", {
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
            value: Z,
            onChange: e => Iu(Number(e.target.value)),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            },
            children: Yu.map(e => u.jsxs("option", {
              value: e,
              children: ["\u0E1B\u0E35\u0E07\u0E1A ", e]
            }, e))
          })]
        })]
      }), u.jsx("button", {
        onClick: () => n === "ipd-compare" ? X() : n === "opd-compare" ? z0() : n === "resource-opd" ? G0() : n === "resource-ipd" ? V0() : n === "frax" ? mu() : n === "pt" ? ju() : n === "staff-services" ? _u() : n === "fluoride" ? fu() : n === "elderly-cxr" ? ru() : n === "ncd-disease" ? ou() : n === "imaging-services" ? Nu() : n === "pttype-services" ? Ou() : uu(),
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
        disabled: n === "ipd-compare" ? !k : n === "opd-compare" ? !D : n === "resource-opd" ? !J0 : n === "resource-ipd" ? !X0 : n === "frax" ? !C0 : n === "pt" || n === "staff-services" ? !V : n === "fluoride" ? !v0 : n === "elderly-cxr" ? !$0 : n === "ncd-disease" ? !m0?.patients : n === "imaging-services" ? !i0?.patients : n === "pttype-services" ? !y0?.groups : !s0,
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
        disabled: n === "ipd-compare" ? !k : n === "opd-compare" ? !D : n === "resource-opd" ? !J0 : n === "resource-ipd" ? !X0 : n === "frax" ? !C0 : n === "pt" || n === "staff-services" ? !V : n === "fluoride" ? !v0 : n === "elderly-cxr" ? !$0 : n === "ncd-disease" ? !m0?.patients : n === "imaging-services" ? !i0?.patients : n === "pttype-services" ? !y0?.groups : !s0,
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
          onChange: e => Lu(e.target.value === "all" ? "all" : Number(e.target.value)),
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
    }), Q0 && u.jsx("div", {
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(239,68,68,.08)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: Q0
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
    }), !_0 && n === "ipd-compare" && k?.comparison && (() => {
      const e = k.fy1_totals,
        t = k.fy2_totals,
        c = (r, p) => r > 0 ? Math.round((p - r) / r * 100) : 0,
        z = [{
          label: "Admit",
          pct: c(e.admits, t.admits),
          v1: e.admits,
          v2: t.admits
        }, {
          label: "Discharge",
          pct: c(e.discharges, t.discharges),
          v1: e.discharges,
          v2: t.discharges
        }, {
          label: "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19",
          pct: c(e.total_los, t.total_los),
          v1: e.total_los,
          v2: t.total_los
        }, {
          label: "ALOS",
          pct: c(e.alos, t.alos),
          v1: e.alos,
          v2: t.alos,
          dec: 2
        }, {
          label: "\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 %",
          pct: c(e.occupancy_rate, t.occupancy_rate),
          v1: e.occupancy_rate,
          v2: t.occupancy_rate,
          dec: 1
        }, {
          label: "Active Bed",
          pct: c(e.active_beds, t.active_beds),
          v1: e.active_beds,
          v2: t.active_beds,
          dec: 1
        }, {
          label: "Sum AdjRW",
          pct: c(e.sum_adjrw, t.sum_adjrw),
          v1: e.sum_adjrw,
          v2: t.sum_adjrw,
          dec: 1
        }, {
          label: "CMI",
          pct: c(e.cmi, t.cmi),
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
          children: ["\u0E2A\u0E23\u0E38\u0E1B YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (", k.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49)"]
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
            children: [k.fiscal_years.fy1.start, " \u2014 ", k.fiscal_years.fy1.end]
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
            children: [k.fiscal_years.fy2.start, " \u2014 ", k.fiscal_years.fy2.end]
          })]
        }), u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px"
          },
          children: z.map((r, p) => u.jsxs("div", {
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
          }, p))
        }), (() => {
          const r = k.fy1_totals,
            p = k.fy2_totals,
            i = (l, P) => l > 0 ? Math.round((P - l) / l * 100) : 0,
            x = i(r.admits, p.admits),
            h = i(r.discharges, p.discharges),
            b = i(r.total_los, p.total_los),
            C = i(r.alos, p.alos);
          i(r.occupancy_rate, p.occupancy_rate);
          const $ = i(r.sum_adjrw, p.sum_adjrw),
            F = i(r.cmi, p.cmi),
            W = k.comparable_months || 0,
            R = k.custom_range ? `${k.custom_range.start} \u2014 ${k.custom_range.end}` : k.fiscal_years?.fy2?.label || "",
            f = [],
            _ = p.admits - p.discharges,
            Y = r.discharges > 0 ? r.sum_adjrw / r.discharges : 0,
            d = p.discharges > 0 ? p.sum_adjrw / p.discharges : 0;
          k.total_beds * 30 * W, x < -5 ? f.push({
            icon: "\u{1F4C9}",
            color: "#dc2626",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E25\u0E14\u0E25\u0E07 ${Math.abs(x)}%`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${a(r.admits)} \u2192 ${a(p.admits)} \u0E23\u0E32\u0E22 (\u0E25\u0E14 ${a(Math.abs(p.admits-r.admits))} \u0E23\u0E32\u0E22) \xB7 D/C ${a(r.discharges)} \u2192 ${a(p.discharges)} \u0E23\u0E32\u0E22 (${h>=0?"+":""}${h}%) \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19${Math.abs(x)>15?"\u0E25\u0E14\u0E25\u0E07\u0E21\u0E32\u0E01":"\u0E25\u0E14\u0E25\u0E07"} \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E25\u0E30\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E42\u0E14\u0E22\u0E15\u0E23\u0E07`,
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
          }) : x > 5 ? f.push({
            icon: "\u{1F4C8}",
            color: "#16a34a",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${x}%`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${a(r.admits)} \u2192 ${a(p.admits)} \u0E23\u0E32\u0E22 (\u0E40\u0E1E\u0E34\u0E48\u0E21 ${a(p.admits-r.admits)} \u0E23\u0E32\u0E22) \u2014 \u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19\u0E41\u0E25\u0E30\u0E40\u0E15\u0E35\u0E22\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A`,
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
          }) : f.push({
            icon: "\u27A1\uFE0F",
            color: "var(--md-text-tertiary)",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E17\u0E23\u0E07\u0E15\u0E31\u0E27 (${x>=0?"+":""}${x}%)`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${a(p.admits)} \u0E23\u0E32\u0E22 \xB7 D/C ${a(p.discharges)} \u0E23\u0E32\u0E22 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23`,
            actions: []
          }), _ > 20 && f.push({
            icon: "\u26A0\uFE0F",
            color: "#f59e0b",
            title: `Admit \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 D/C ${a(_)} \u0E23\u0E32\u0E22 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2A\u0E30\u0E2A\u0E21\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A`,
            detail: `Admit ${a(p.admits)} vs D/C ${a(p.discharges)} \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E43\u0E2B\u0E49\u0E40\u0E15\u0E35\u0E22\u0E07\u0E40\u0E15\u0E47\u0E21\u0E40\u0E23\u0E47\u0E27\u0E02\u0E36\u0E49\u0E19\u0E41\u0E25\u0E30 Workload \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2A\u0E39\u0E07`,
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
          }), C > 5 ? f.push({
            icon: "\u23F1\uFE0F",
            color: "#f59e0b",
            title: `ALOS \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${C}% (${a(r.alos,2)} \u2192 ${a(p.alos,2)} \u0E27\u0E31\u0E19)`,
            detail: `\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E23\u0E27\u0E21 ${a(r.total_los)} \u2192 ${a(p.total_los)} \u0E27\u0E31\u0E19 (${b>=0?"+":""}${b}%) \u2014 \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E22\u0E32\u0E27\u0E02\u0E36\u0E49\u0E19\u0E41\u0E21\u0E49\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14\u0E25\u0E07 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32 Discharge \u0E0A\u0E49\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D\u0E21\u0E35\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19`,
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
          }) : C < -5 ? f.push({
            icon: "\u2705",
            color: "#16a34a",
            title: `ALOS \u0E25\u0E14\u0E25\u0E07 ${Math.abs(C)}% \u2014 D/C Planning \u0E21\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E`,
            detail: `ALOS ${a(r.alos,2)} \u2192 ${a(p.alos,2)} \u0E27\u0E31\u0E19 \u2014 \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35\u0E02\u0E36\u0E49\u0E19 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Readmission Rate \u0E44\u0E21\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 (D/C \u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B)`,
            actions: [{
              who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
              what: "Monitor Readmission \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 Readmission \u0E20\u0E32\u0E22\u0E43\u0E19 28 \u0E27\u0E31\u0E19 \u0E2B\u0E32\u0E01 Rate >5% \u0E43\u0E2B\u0E49\u0E17\u0E1A\u0E17\u0E27\u0E19 D/C criteria \u0E27\u0E48\u0E32\u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48"
            }]
          }) : f.push({
            icon: "\u27A1\uFE0F",
            color: "var(--md-text-tertiary)",
            title: `ALOS \u0E17\u0E23\u0E07\u0E15\u0E31\u0E27 ${a(p.alos,2)} \u0E27\u0E31\u0E19 (${C>=0?"+":""}${C}%)`,
            detail: `\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E23\u0E27\u0E21 ${a(p.total_los)} \u0E27\u0E31\u0E19 \u2014 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19`,
            actions: []
          });
          {
            const l = [];
            x < 0 && l.push(`Volume \u0E25\u0E14 ${Math.abs(x)}%`), F < -5 && l.push(`CMI \u0E25\u0E14 ${Math.abs(F)}%`), $ < -10 ? f.push({
              icon: "\u{1F4B0}",
              color: "#dc2626",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E25\u0E14\u0E25\u0E07 ${Math.abs($)}% \u2014 ${l.join(" + ")||"\u0E15\u0E49\u0E2D\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21"}`,
              detail: `AdjRW ${a(r.sum_adjrw,1)} \u2192 ${a(p.sum_adjrw,1)} (\u0E25\u0E14 ${a(Math.abs(p.sum_adjrw-r.sum_adjrw),1)}) \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${Y.toFixed(2)} \u2192 ${d.toFixed(2)} \xB7 CMI ${a(r.cmi,2)} \u2192 ${a(p.cmi,2)} \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32 Case-mix \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07`,
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
            }) : $ > 10 ? f.push({
              icon: "\u{1F4B0}",
              color: "#16a34a",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${$}%`,
              detail: `AdjRW ${a(r.sum_adjrw,1)} \u2192 ${a(p.sum_adjrw,1)} \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${Y.toFixed(2)} \u2192 ${d.toFixed(2)} \u2014 ${F>5?"Case-mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19":"\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21"}`,
              actions: [{
                who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
                what: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Readmission Rate \u2014 \u0E40\u0E21\u0E37\u0E48\u0E2D CMI \u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E31\u0E48\u0E19\u0E43\u0E08\u0E27\u0E48\u0E32\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 D/C \u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E41\u0E25\u0E49\u0E27\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 Admit \u0E0B\u0E49\u0E33"
              }, {
                who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
                what: "\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E17\u0E35\u0E21\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Staffing Ratio, \u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C, \u0E22\u0E32 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A High RW"
              }]
            }) : $ < 0 && f.push({
              icon: "\u{1F4B0}",
              color: "#f59e0b",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E25\u0E14\u0E25\u0E07\u0E40\u0E25\u0E47\u0E01\u0E19\u0E49\u0E2D\u0E22 ${Math.abs($)}%`,
              detail: `AdjRW ${a(r.sum_adjrw,1)} \u2192 ${a(p.sum_adjrw,1)} \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${Y.toFixed(2)} \u2192 ${d.toFixed(2)}`,
              actions: [{
                who: "\u0E17\u0E35\u0E21 Coding",
                what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Coding Quality \u2014 \u0E2A\u0E38\u0E48\u0E21 Audit \u0E40\u0E04\u0E2A RW \u0E15\u0E48\u0E33\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Under-coding \u0E01\u0E48\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E08\u0E30\u0E02\u0E22\u0E32\u0E22\u0E43\u0E2B\u0E0D\u0E48\u0E02\u0E36\u0E49\u0E19"
              }]
            })
          }
          return p.occupancy_rate > 85 ? f.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#dc2626",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${a(p.occupancy_rate,1)}% \u2014 \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22 (>85%)`,
            detail: `Active Bed ${a(p.active_beds,1)}/${k.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E25\u0E49\u0E19 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E2D Admit \u0E19\u0E32\u0E19 + Workload \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2A\u0E39\u0E07 + \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 HAI`,
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
          }) : p.occupancy_rate < 50 ? f.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#f59e0b",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${a(p.occupancy_rate,1)}% \u2014 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32 (<50%)`,
            detail: `Active Bed ${a(p.active_beds,1)}/${k.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 (\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23/\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E39\u0E1B\u0E42\u0E20\u0E04) \u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E44\u0E21\u0E48\u0E04\u0E38\u0E49\u0E21\u0E04\u0E48\u0E32`,
            actions: [{
              who: "\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
              what: "\u0E1B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07 Ward \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E1B\u0E34\u0E14\u0E23\u0E27\u0E21 Ward \u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27\u0E25\u0E14\u0E04\u0E48\u0E32\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E39\u0E1B\u0E42\u0E20\u0E04 \u0E42\u0E2D\u0E19\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E44\u0E1B\u0E40\u0E2A\u0E23\u0E34\u0E21 OPD/ER \u0E17\u0E35\u0E48\u0E02\u0E32\u0E14\u0E41\u0E04\u0E25\u0E19"
            }, {
              who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
              what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 OPD Observation \u2014 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 OPD Obs >6 \u0E0A\u0E21. \u0E27\u0E48\u0E32\u0E04\u0E27\u0E23 Admit \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22 \u0E41\u0E17\u0E19\u0E17\u0E35\u0E48\u0E08\u0E30 Observe \u0E17\u0E35\u0E48 OPD"
            }]
          }) : f.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#16a34a",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${a(p.occupancy_rate,1)}% \u2014 \u0E40\u0E01\u0E13\u0E11\u0E4C\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21 (50-85%)`,
            detail: `Active Bed ${a(p.active_beds,1)}/${k.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E2A\u0E21\u0E14\u0E38\u0E25 \u0E22\u0E31\u0E07\u0E21\u0E35\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A Surge`,
            actions: []
          }), F < -10 ? f.push({
            icon: "\u{1F4CB}",
            color: "#dc2626",
            title: `CMI \u0E25\u0E14\u0E25\u0E07 ${Math.abs(F)}% (${a(r.cmi,2)} \u2192 ${a(p.cmi,2)}) \u2014 Case-mix \u0E40\u0E1A\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D Under-coding`,
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
          }) : F > 10 && f.push({
            icon: "\u{1F4CB}",
            color: "#16a34a",
            title: `CMI \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${F}% (${a(r.cmi,2)} \u2192 ${a(p.cmi,2)}) \u2014 \u0E14\u0E39\u0E41\u0E25\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19`,
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
          }), f.filter(l => l.actions.length === 0 || l.detail), f.filter(l => l.actions.length > 0), u.jsxs("div", {
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
                children: [R, " \xB7 ", W, " \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07 ", k.total_beds]
              })]
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              },
              children: f.map((l, P) => u.jsxs("div", {
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
                  }), l.actions.map((o, g) => u.jsxs("div", {
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
                      children: o.who
                    }), u.jsx("span", {
                      style: {
                        fontWeight: 600,
                        color: "var(--md-text-secondary)"
                      },
                      children: o.what
                    })]
                  }, g))]
                })]
              }, P))
            })]
          })
        })()]
      })
    })(), !_0 && n === "ipd-compare" && k?.comparison && u.jsxs("div", {
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
        ref: H,
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
            children: k.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [k.custom_range ? `${k.custom_range.start} \u0E16\u0E36\u0E07 ${k.custom_range.end} vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19` : Vu && `${k.fiscal_years.fy2.label} ${Vu}`, " \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07\u0E08\u0E23\u0E34\u0E07: ", k.total_beds, " \u0E40\u0E15\u0E35\u0E22\u0E07"]
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
                children: k.custom_range ? `${k.fiscal_years.fy1.start} \u2014 ${k.fiscal_years.fy1.end}` : `${k.fiscal_years.fy1.label} (${k.fiscal_years.fy1.start} \u2014 ${k.fiscal_years.fy1.end})`
              }), u.jsx("th", {
                colSpan: 8,
                style: {
                  ...E.th,
                  background: E.fy2Bg,
                  color: "#db2777",
                  borderRight: "2px solid var(--md-border)"
                },
                children: k.custom_range ? `${k.fiscal_years.fy2.start} \u2014 ${k.fiscal_years.fy2.end}` : `${k.fiscal_years.fy2.label} (${k.fiscal_years.fy2.start} \u2014 ${k.fiscal_years.fy2.end})`
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
            children: [k.comparison.filter(e => e.fy1.has_data && e.fy2.has_data).map((e, t) => u.jsxs("tr", {
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
                const c = "1px solid var(--md-border)";
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy1.admits)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: a(e.fy1.discharges)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy1.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: a(e.fy1.alos, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy1.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
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
                const c = "1px solid var(--md-border)";
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy2.admits)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: a(e.fy2.discharges)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy2.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
                    },
                    children: a(e.fy2.alos, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(e.fy2.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: c
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
              ].map(([c, z, r], p) => {
                const i = c > 0 ? Math.round((z - c) / c * 100) : z > 0 ? 100 : 0;
                return u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 800,
                    fontSize: "11px",
                    color: i > 0 ? "#16a34a" : i < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                    borderRight: r ? "1px solid var(--md-border)" : void 0
                  },
                  children: [i > 0 ? "\u25B2" : i < 0 ? "\u25BC" : "", " ", Math.abs(i), "%"]
                }, `yoy_${p}`)
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
                  c = {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: e
                  },
                  z = k.fy1_totals,
                  r = k.fy2_totals;
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: c,
                    children: a(z.admits)
                  }), u.jsx("td", {
                    style: {
                      ...c,
                      borderRight: t
                    },
                    children: a(z.discharges)
                  }), u.jsx("td", {
                    style: c,
                    children: a(z.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...c,
                      borderRight: t
                    },
                    children: a(z.alos, 2)
                  }), u.jsx("td", {
                    style: c,
                    children: a(z.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...c,
                      borderRight: t
                    },
                    children: a(z.active_beds, 2)
                  }), u.jsx("td", {
                    style: c,
                    children: a(z.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...c,
                      borderRight: e
                    },
                    children: a(z.cmi, 2)
                  }), u.jsx("td", {
                    style: c,
                    children: a(r.admits)
                  }), u.jsx("td", {
                    style: {
                      ...c,
                      borderRight: t
                    },
                    children: a(r.discharges)
                  }), u.jsx("td", {
                    style: c,
                    children: a(r.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...c,
                      borderRight: t
                    },
                    children: a(r.alos, 2)
                  }), u.jsx("td", {
                    style: c,
                    children: a(r.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...c,
                      borderRight: t
                    },
                    children: a(r.active_beds, 2)
                  }), u.jsx("td", {
                    style: c,
                    children: a(r.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...c,
                      borderRight: e
                    },
                    children: a(r.cmi, 2)
                  })]
                })
              })(), (() => {
                const e = k.fy1_totals,
                  t = k.fy2_totals;
                return [
                  [e.admits, t.admits, !1],
                  [e.discharges, t.discharges, !0],
                  [e.total_los, t.total_los, !1],
                  [e.alos, t.alos, !0],
                  [e.occupancy_rate, t.occupancy_rate, !1],
                  [e.active_beds, t.active_beds, !0],
                  [e.sum_adjrw, t.sum_adjrw, !1],
                  [e.cmi, t.cmi, !1]
                ].map(([c, z, r], p) => {
                  const i = c > 0 ? Math.round((z - c) / c * 100) : z > 0 ? 100 : 0;
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
                  }, `yoy_t_${p}`)
                })
              })(), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: "2px solid var(--md-border)",
                  color: k.overall_admit_diff >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [k.overall_admit_diff > 0 ? "+" : "", a(k.overall_admit_diff)]
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: "2px solid var(--md-border)",
                  color: k.fy2_totals.total_los - k.fy1_totals.total_los >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [k.fy2_totals.total_los - k.fy1_totals.total_los > 0 ? "+" : "", a(k.fy2_totals.total_los - k.fy1_totals.total_los)]
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
          children: k.timestamp && new Date(k.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !_0 && n === "opd-compare" && D?.comparison && (() => {
      const e = D.fy1_totals,
        t = D.fy2_totals,
        c = (r, p) => r > 0 ? Math.round((p - r) / r * 100) : 0,
        z = [{
          label: "Visit",
          pct: c(e.visits, t.visits),
          v1: e.visits,
          v2: t.visits
        }, {
          label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 (UNQ)",
          pct: c(e.patients, t.patients),
          v1: e.patients,
          v2: t.patients
        }, {
          label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49",
          pct: c(e.revenue, t.revenue),
          v1: e.revenue,
          v2: t.revenue,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32\u0E22\u0E32",
          pct: c(e.drug_cost, t.drug_cost),
          v1: e.drug_cost,
          v2: t.drug_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32 Lab",
          pct: c(e.lab_cost, t.lab_cost),
          v1: e.lab_cost,
          v2: t.lab_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E04\u0E48\u0E32 X-ray",
          pct: c(e.xray_cost, t.xray_cost),
          v1: e.xray_cost,
          v2: t.xray_cost,
          prefix: "\u0E3F"
        }, {
          label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49/Visit",
          pct: c(e.avg_income, t.avg_income),
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
          children: z.map((r, p) => u.jsxs("div", {
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
          }, p))
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
        ref: H,
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
              const c = (r, p) => r > 0 ? Math.round((p - r) / r * 100) : p > 0 ? 100 : 0,
                z = "1px solid var(--md-border)";
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
                    borderRight: z
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
                    borderRight: z
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
                    borderRight: z
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
                    borderRight: z
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
                ].map(([r, p], i) => {
                  const x = c(r, p);
                  return u.jsxs("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      fontSize: "11px",
                      color: x > 0 ? "#16a34a" : x < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                    },
                    children: [x > 0 ? "\u25B2" : x < 0 ? "\u25BC" : "", " ", Math.abs(x), "%"]
                  }, i)
                })]
              }, t)
            }), (() => {
              const e = D.fy1_totals,
                t = D.fy2_totals,
                c = "2px solid var(--md-border)",
                z = "1px solid var(--md-border)",
                r = {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: c
                },
                p = (i, x) => i > 0 ? Math.round((x - i) / i * 100) : 0;
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
                    borderRight: c,
                    borderTop: c
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), u.jsx("td", {
                  style: r,
                  children: a(e.visits)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: z
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
                    borderRight: z
                  },
                  children: a(e.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: c
                  },
                  children: a(e.avg_income, 2)
                }), u.jsx("td", {
                  style: r,
                  children: a(t.visits)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: z
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
                    borderRight: z
                  },
                  children: a(t.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: c
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
                ].map(([i, x], h) => {
                  const b = p(i, x);
                  return u.jsxs("td", {
                    style: {
                      ...r,
                      fontWeight: 900,
                      fontSize: "11px",
                      color: b > 0 ? "#16a34a" : b < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                    },
                    children: [b > 0 ? "\u25B2" : b < 0 ? "\u25BC" : "", " ", Math.abs(b), "%"]
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
    }), !_0 && n === "resource-opd" && J0?.comparison && (() => {
      const e = J0,
        t = e.fy1_totals,
        c = e.fy2_totals,
        z = (i, x) => x > 0 ? Math.round((i - x) / x * 100) : i > 0 ? 100 : 0;
      t.lab_orders + t.drug_orders + t.xray_orders, t.lab_price + t.drug_price + t.xray_price, c.lab_orders + c.drug_orders + c.xray_orders, c.lab_price + c.drug_price + c.xray_price;
      const r = "2px solid var(--md-border)",
        p = "1px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: p,
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: H,
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
                  children: ["\u0E1B\u0E35 \u0E07\u0E1A ", a0]
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#0d9488",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35 \u0E07\u0E1A ", Z]
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
                    borderRight: p
                  },
                  children: "Lab (\u0E15\u0E23\u0E27\u0E08\u0E17\u0E32\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: p
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
                    borderRight: p
                  },
                  children: "Lab (\u0E15\u0E23\u0E27\u0E08\u0E17\u0E32\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: p
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
                    borderRight: p
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
                    borderRight: p
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
                    borderRight: p
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
                    borderRight: p
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
              children: [e.comparison.filter(i => i.fy1?.has_data && i.fy2?.has_data).map((i, x) => {
                const h = i.fy1,
                  b = i.fy2,
                  C = h.lab_orders + h.drug_orders + h.xray_orders,
                  $ = h.lab_price + h.drug_price + h.xray_price,
                  F = b.lab_orders + b.drug_orders + b.xray_orders,
                  W = b.lab_price + b.drug_price + b.xray_price,
                  R = z(F, C),
                  f = z(W, $),
                  _ = x % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  Y = x % 2 === 0 ? "var(--md-surface)" : "var(--md-surface-2, #f8fafc)";
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
                      background: Y,
                      zIndex: 1,
                      borderRight: r
                    },
                    children: i.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: h.lab_orders ? a(h.lab_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: p
                    },
                    children: h.lab_price ? a(h.lab_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: h.drug_orders ? a(h.drug_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: p
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
                    children: b.lab_orders ? a(b.lab_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: p
                    },
                    children: b.lab_price ? a(b.lab_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: b.drug_orders ? a(b.drug_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: p
                    },
                    children: b.drug_price ? a(b.drug_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: b.xray_orders ? a(b.xray_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: b.xray_price ? a(b.xray_price) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: R >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: i.has_data ? `${R>0?"\u25B2":R<0?"\u25BC":""} ${Math.abs(R)}%` : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: f >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: i.has_data ? `${f>0?"\u25B2":f<0?"\u25BC":""} ${Math.abs(f)}%` : ""
                  })]
                }, x)
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
                    borderRight: p
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
                    borderRight: p
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
                  children: a(c.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: p
                  },
                  children: a(c.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(c.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: p
                  },
                  children: a(c.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(c.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: a(c.xray_price)
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
        }), (a0 <= 2567 || Z <= 2567) && u.jsxs("div", {
          style: {
            padding: "10px 20px",
            borderTop: p,
            fontSize: "12px",
            fontWeight: 600,
            color: "#d97706",
            background: "rgba(251,191,36,.06)"
          },
          children: ["\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38: HOSxP \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 inc_drug \u0E0A\u0E48\u0E27\u0E07 \u0E01.\u0E22.\u2013\u0E1E.\u0E22. 2566 \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E08\u0E23\u0E34\u0E07 (~300 \u0E40\u0E17\u0E48\u0E32) \u2014 \u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E31\u0E14 outlier (inc_drug ", ">", " 25,000) \u0E2D\u0E2D\u0E01\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34"]
        }), u.jsxs("div", {
          style: {
            padding: "10px 20px",
            borderTop: p,
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
    })(), !_0 && n === "resource-opd" && J0?.comparison && u.jsx(nE, {
      data: J0,
      fy1: a0,
      fy2: Z,
      level: "OPD"
    }), !_0 && n === "resource-ipd" && X0?.comparison && (() => {
      const e = X0,
        t = e.fy1_totals,
        c = e.fy2_totals,
        z = (i, x) => x > 0 ? Math.round((i - x) / x * 100) : i > 0 ? 100 : 0;
      t.lab_orders + t.drug_orders + t.xray_orders, t.lab_price + t.drug_price + t.xray_price, c.lab_orders + c.drug_orders + c.xray_orders, c.lab_price + c.drug_price + c.xray_price;
      const r = "2px solid var(--md-border)",
        p = "1px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: p,
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: H,
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
              children: e.title || `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (Lab / Drug / CT-Xray) \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A ${a0} vs ${Z}`
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
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", a0]
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#db2777",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", Z]
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
              children: [e.comparison.filter(i => i.fy1?.has_data && i.fy2?.has_data).map((i, x) => {
                const h = i.fy1,
                  b = i.fy2,
                  C = h.lab_orders + h.drug_orders + h.xray_orders,
                  $ = h.lab_price + h.drug_price + h.xray_price,
                  F = b.lab_orders + b.drug_orders + b.xray_orders,
                  W = b.lab_price + b.drug_price + b.xray_price,
                  R = z(F, C),
                  f = z(W, $),
                  _ = x % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  Y = !i.has_data;
                return u.jsxs("tr", {
                  style: {
                    background: _,
                    opacity: Y ? .35 : 1
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
                    children: a(b.lab_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(b.lab_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(b.drug_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(b.drug_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(b.xray_orders)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: a(b.xray_price)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: R >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: i.has_data && h.has_data && b.has_data ? `${R>=0?"\u25B2":"\u25BC"} ${Math.abs(R)}%` : "\u2014"
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: f >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: i.has_data && h.has_data && b.has_data ? `${f>=0?"\u25B2":"\u25BC"} ${Math.abs(f)}%` : "\u2014"
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
                  children: a(c.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(c.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(c.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(c.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: a(c.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: a(c.xray_price)
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
            borderTop: p,
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
    })(), !_0 && n === "resource-ipd" && X0?.comparison && u.jsx(nE, {
      data: X0,
      fy1: a0,
      fy2: Z,
      level: "IPD"
    }), !_0 && n === "mortality" && s0?.comparison && (() => {
      const e = s0,
        t = e.fy1_totals,
        c = e.fy2_totals,
        z = (i, x) => x > 0 ? Math.round((i - x) / x * 100) : i > 0 ? 100 : 0,
        r = i => i > 0 ? `${i.toFixed(2)}%` : "\u2014",
        p = "2px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: H,
          style: {
            overflowX: "auto"
          },
          children: [u.jsxs("div", {
            style: {
              padding: "16px 20px",
              textAlign: "center",
              borderBottom: p,
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
                    borderRight: p
                  },
                  children: "\u0E40\u0E14\u0E37\u0E2D\u0E19"
                }), u.jsxs("th", {
                  colSpan: 5,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    color: "#2563eb",
                    borderRight: p
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", a0]
                }), u.jsxs("th", {
                  colSpan: 5,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#db2777",
                    borderRight: p
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", Z]
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
                    borderRight: p
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
                    borderRight: p
                  },
                  children: "\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22"
                })]
              })]
            }), u.jsxs("tbody", {
              children: [e.comparison.filter(i => i.fy1?.has_data && i.fy2?.has_data).map((i, x) => {
                const h = i.fy1,
                  b = i.fy2,
                  C = z(b.total_deaths, h.total_deaths),
                  $ = x % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  F = !i.has_data;
                return u.jsxs("tr", {
                  style: {
                    background: $,
                    opacity: F ? .35 : 1
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      textAlign: "center",
                      borderRight: p
                    },
                    children: i.month
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
                      borderRight: p
                    },
                    children: a(h.total_deaths)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: a(b.ipd_discharge)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: b.ipd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: b.ipd_deaths > 0 ? 800 : 600
                    },
                    children: a(b.ipd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: b.ipd_mortality_rate >= 2 ? "#dc2626" : b.ipd_mortality_rate > 0 ? "#d97706" : "inherit",
                      fontWeight: 700
                    },
                    children: r(b.ipd_mortality_rate)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: b.opd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: b.opd_deaths > 0 ? 800 : 600
                    },
                    children: a(b.opd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: b.total_deaths > 0 ? "#dc2626" : "inherit",
                      borderRight: p
                    },
                    children: a(b.total_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: C > 0 ? "#dc2626" : C < 0 ? "#16a34a" : "inherit"
                    },
                    children: i.has_data && h.has_data && b.has_data ? `${C>0?"\u25B2":C<0?"\u25BC":""} ${Math.abs(C)}%` : "\u2014"
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
                    borderRight: p,
                    borderTop: p
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p
                  },
                  children: a(t.ipd_discharge)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
                    color: "#dc2626"
                  },
                  children: a(t.ipd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
                    color: t.ipd_mortality_rate >= 2 ? "#dc2626" : "#d97706"
                  },
                  children: r(t.ipd_mortality_rate)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
                    color: "#dc2626"
                  },
                  children: a(t.opd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
                    color: "#dc2626",
                    borderRight: p
                  },
                  children: a(t.total_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p
                  },
                  children: a(c.ipd_discharge)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
                    color: "#dc2626"
                  },
                  children: a(c.ipd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
                    color: c.ipd_mortality_rate >= 2 ? "#dc2626" : "#d97706"
                  },
                  children: r(c.ipd_mortality_rate)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
                    color: "#dc2626"
                  },
                  children: a(c.opd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
                    color: "#dc2626",
                    borderRight: p
                  },
                  children: a(c.total_deaths)
                }), u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: p,
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
            children: [e.data_source, " \xB7 IPD Early Death (LOS<2d): \u0E1B\u0E35\u0E07\u0E1A ", a0, "=", t.ipd_early_deaths, " / \u0E1B\u0E35\u0E07\u0E1A ", Z, "=", c.ipd_early_deaths]
          }), u.jsx("span", {
            children: e.timestamp && new Date(e.timestamp).toLocaleString("th-TH")
          })]
        })]
      })
    })(), !_0 && n === "mortality" && s0?.comparison && u.jsx(yE, {
      title: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
      subtitle: "Mortality Executive Analysis \xB7 IPD Rate \xB7 Early Death \xB7 OPD/ER \xB7 Peak Month \xB7 Risks \xB7 Recommendations",
      badge: "\u{1F4D0} Rule-based \xB7 Clinical Quality",
      accentColor: "#dc2626",
      headerGradient: "linear-gradient(135deg, rgba(220,38,38,.10), rgba(245,158,11,.06))",
      narrative: vE(s0, a0, Z)
    }), !_0 && n === "frax" && C0?.patients && u.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)"
      },
      children: [u.jsxs("div", {
        ref: H,
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
            children: Mu.map((e, t) => u.jsxs("tr", {
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
        c = $0.total_cxr_price || 0,
        z = e.length > 0 ? Math.round(t / e.length) : 0,
        r = e.filter(o => o.sex === "\u0E0A\u0E32\u0E22").length,
        p = e.filter(o => o.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
        i = {};
      e.forEach(o => {
        const g = (o.icd10 || "").trim().toUpperCase();
        g && iu.test(g) && (i[g] || (i[g] = {
          code: g,
          name: o.icd10name,
          count: 0,
          totalInc: 0
        }), i[g].count++, i[g].totalInc += o.income || 0)
      });
      const x = Object.values(i).sort((o, g) => g.count - o.count).slice(0, 10),
        h = x.length > 0 ? x[0].count : 1,
        b = {
          "60-64": 0,
          "65-69": 0,
          "70-74": 0,
          "75-79": 0,
          "80+": 0
        };
      e.forEach(o => {
        const g = Number(o.age_y) || 0;
        g < 65 ? b["60-64"]++ : g < 70 ? b["65-69"]++ : g < 75 ? b["70-74"]++ : g < 80 ? b["75-79"]++ : b["80+"]++
      });
      const C = Math.max(...Object.values(b), 1),
        $ = {
          "60-64": "#3b82f6",
          "65-69": "#10b981",
          "70-74": "#f59e0b",
          "75-79": "#ef4444",
          "80+": "#8b5cf6"
        },
        F = {};
      e.forEach(o => {
        const g = o.pttype_name || "-";
        F[g] || (F[g] = {
          count: 0,
          income: 0
        }), F[g].count++, F[g].income += o.income || 0
      });
      const W = Object.entries(F).sort((o, g) => g[1].count - o[1].count),
        R = new Set(e.map(o => o.hn).filter(Boolean)).size,
        f = Object.entries(b).reduce((o, [g, m]) => m > o[1] ? [g, m] : o, ["", 0]),
        _ = x.length > 0 ? x[0] : null,
        Y = W.length > 0 ? W[0] : null,
        d = e.length > 0 ? Math.round(c / e.length) : 0,
        l = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 CXR \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35: \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${$0.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${R.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E04\u0E48\u0E32 CXR \u0E23\u0E27\u0E21 ${c.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${d.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22 \xB7 \u0E0A\u0E32\u0E22 ${r} \u0E23\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07 ${p} \u0E23\u0E32\u0E22${r>0&&p>0?` (\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E2A\u0E48\u0E27\u0E19 ${(r/p).toFixed(2)}:1)`:""}`];
      if (f[0]) {
        const o = e.length > 0 ? Math.round(f[1] / e.length * 100) : 0;
        l.push(`\u{1F474} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E17\u0E33 CXR \u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${f[0]} \u0E1B\u0E35 ${f[1]} \u0E23\u0E32\u0E22 (${o}%) \u2014 ${f[0]==="80+"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E21\u0E32\u0E01 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E1B\u0E2D\u0E14\u0E2D\u0E31\u0E01\u0E40\u0E2A\u0E1A/\u0E27\u0E31\u0E13\u0E42\u0E23\u0E04\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23 follow-up \u0E17\u0E38\u0E01\u0E23\u0E32\u0E22":f[0].startsWith("60")?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E04\u0E27\u0E23\u0E17\u0E33 baseline CXR \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35":"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 COPD/IHD \u0E23\u0E48\u0E27\u0E21\u0E14\u0E49\u0E27\u0E22"}`)
      }
      if (_ && iu.test(_.code) && l.push(`\u{1FA7B} \u0E1C\u0E25\u0E15\u0E23\u0E27\u0E08 CXR \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${_.code} ${_.name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${_.count} \u0E23\u0E32\u0E22 \u2014 ${_.code.startsWith("J18")?"\u0E1B\u0E2D\u0E14\u0E2D\u0E31\u0E01\u0E40\u0E2A\u0E1A \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32\u0E41\u0E25\u0E30\u0E09\u0E35\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Pneumococcal/Influenza":_.code.startsWith("J44")||_.code.startsWith("J43")?"COPD/Emphysema \u0E04\u0E27\u0E23\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A COPD clinic \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E38\u0E2B\u0E23\u0E35\u0E48":_.code.startsWith("I")?"\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08/\u0E2B\u0E25\u0E2D\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 NCD":"\u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E32\u0E21\u0E2D\u0E32\u0E22\u0E38"}`), Y) {
        const [o, g] = Y, m = e.length > 0 ? Math.round(g.count / e.length * 100) : 0;
        m >= 50 && l.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${o} ${g.count} \u0E23\u0E32\u0E22 (${m}%) \u2014 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 LTC \u0E02\u0E2D\u0E07\u0E0A\u0E38\u0E21\u0E0A\u0E19`)
      }
      $0.total > 0 && d > 0 && l.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22: CXR \u0E43\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E40\u0E1B\u0E47\u0E19 screening \u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A TB/COPD/Lung CA \xB7 \u0E04\u0E27\u0E23\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 coverage \u226580% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E43\u0E19\u0E40\u0E02\u0E15 \xB7 \u0E08\u0E31\u0E14\u0E17\u0E33 CXR mobile clinic \u0E2B\u0E32\u0E01\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E30\u0E14\u0E27\u0E01");
      const P = {
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
            value: c.toLocaleString(void 0, {
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
            value: p.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }, {
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32",
            value: W.length,
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            color: "#f59e0b",
            gradient: "linear-gradient(135deg, rgba(245,158,11,.12), rgba(245,158,11,.04))",
            border: "rgba(245,158,11,.25)"
          }].map((o, g) => u.jsxs("div", {
            style: {
              background: o.gradient,
              border: `1px solid ${o.border}`,
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
              children: o.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: o.color,
                lineHeight: 1.1
              },
              children: [o.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: o.unit
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
            }), W.slice(0, 8).map(([o, g], m) => {
              const L = e.length > 0 ? Math.round(g.count / e.length * 100) : 0,
                A = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                S = A[m % A.length];
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
                    title: o,
                    children: o
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: S
                    },
                    children: [g.count, " (", L, "%)"]
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
                      background: S,
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
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 (60+ \u0E1B\u0E35)"
            }), u.jsx("div", {
              style: {
                display: "flex",
                alignItems: "flex-end",
                gap: "6px",
                height: "80px",
                paddingTop: "4px"
              },
              children: Object.entries(b).map(([o, g]) => u.jsxs("div", {
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
                    color: $[o]
                  },
                  children: g
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: $[o],
                    height: `${Math.max(8,g/C*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: o
                })]
              }, o))
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
              children: x.map((o, g) => {
                const m = h > 0 ? Math.round(o.count / h * 100) : 0;
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
                    children: o.code
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
                      children: o.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: o.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [o.totalInc.toLocaleString(), " \u0E3F"]
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
            ref: H,
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
                children: I0(e).map((o, g) => {
                  const m = g % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: m,
                      transition: "background .1s"
                    },
                    onMouseEnter: L => L.currentTarget.style.background = "rgba(124,58,237,.04)",
                    onMouseLeave: L => L.currentTarget.style.background = m,
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        color: "var(--md-text-tertiary)",
                        fontSize: "11px"
                      },
                      children: o.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontWeight: 700
                      },
                      children: o.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: o.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px",
                        color: o.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899",
                        fontWeight: 700
                      },
                      children: o.sex
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 800,
                        color: Number(o.age_y) >= 80 ? "#8b5cf6" : Number(o.age_y) >= 75 ? "#ef4444" : Number(o.age_y) >= 70 ? "#f59e0b" : "#3b82f6"
                      },
                      children: o.age_y
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
                        children: o.pttype_name
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        letterSpacing: ".02em"
                      },
                      children: o.cid
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "11px"
                      },
                      children: o.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: o.department,
                      children: o.department
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
                      title: o.address,
                      children: o.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: o.mobile_phone_number || u.jsx("span", {
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
                      title: o.cxr_name,
                      children: o.cxr_name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(124,58,237,.03)",
                        fontWeight: 800,
                        fontSize: "12px",
                        color: "#7c3aed"
                      },
                      children: o.cxr_price ? o.cxr_price.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        fontWeight: 800,
                        fontSize: "10px",
                        fontFamily: "monospace",
                        color: "#059669"
                      },
                      children: o.icd10 || "\u2014"
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
                      title: o.icd10name,
                      children: o.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 900,
                        fontSize: "12px",
                        background: o.income >= 2e3 ? "rgba(59,130,246,.08)" : o.income >= 1e3 ? "rgba(59,130,246,.04)" : "transparent",
                        color: o.income >= 2e3 ? "#1d4ed8" : o.income >= 500 ? "#3b82f6" : "var(--md-text-primary)"
                      },
                      children: o.income ? o.income.toLocaleString() : "\u2014"
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
                      title: o.chief_complaint,
                      children: o.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, o.vn || g)
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
                    }), "\u0E23\u0E27\u0E21 ", $0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E0A\u0E32\u0E22 ", r, " \xB7 \u0E2B\u0E0D\u0E34\u0E07 ", p, " \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", z.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#7c3aed",
                      borderBottom: "none"
                    },
                    children: c.toLocaleString(void 0, {
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
        }), l.length > 0 ? u.jsx(Du, {
          data: P,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "fluoride" && v0?.patients && (() => {
      const e = v0.patients,
        t = v0.total_income || 0,
        c = v0.total_fluoride_price || 0,
        z = e.length > 0 ? Math.round(t / e.length) : 0;
      e.length > 0 && Math.max(...e.map(d => d.income || 0));
      const r = {};
      e.forEach(d => {
        const l = (d.icd10 || "").trim().toUpperCase();
        l && iu.test(l) && (r[l] || (r[l] = {
          code: l,
          name: d.icd10name,
          count: 0,
          totalInc: 0
        }), r[l].count++, r[l].totalInc += d.income || 0)
      });
      const p = Object.values(r).sort((d, l) => l.count - d.count).slice(0, 10),
        i = p.length > 0 ? p[0].count : 1,
        x = {
          "25-34": 0,
          "35-44": 0,
          "45-54": 0,
          "55-59": 0
        };
      e.forEach(d => {
        const l = Number(d.age_y) || 0;
        l < 35 ? x["25-34"]++ : l < 45 ? x["35-44"]++ : l < 55 ? x["45-54"]++ : x["55-59"]++
      });
      const h = Math.max(...Object.values(x), 1),
        b = {
          "25-34": "#3b82f6",
          "35-44": "#10b981",
          "45-54": "#f59e0b",
          "55-59": "#ef4444"
        },
        C = {};
      e.forEach(d => {
        const l = d.pttype_name || "-";
        C[l] || (C[l] = {
          count: 0,
          income: 0
        }), C[l].count++, C[l].income += d.income || 0
      });
      const $ = Object.entries(C).sort((d, l) => l[1].count - d[1].count),
        F = new Set(e.map(d => d.hn).filter(Boolean)).size,
        W = Object.entries(x).reduce((d, [l, P]) => P > d[1] ? [l, P] : d, ["", 0]),
        R = e.length > 0 ? Math.round(c / e.length) : 0,
        f = $.length > 0 ? $[0] : null,
        _ = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35): \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${v0.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${F.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C\u0E23\u0E27\u0E21 ${c.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${R.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22${R<50?" \u2014 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E04\u0E32\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A":R>150?" \u2014 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23":""}`];
      if (W[0]) {
        const d = e.length > 0 ? Math.round(W[1] / e.length * 100) : 0;
        _.push(`\u{1F465} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${W[0]} \u0E1B\u0E35 \u0E08\u0E33\u0E19\u0E27\u0E19 ${W[1]} \u0E23\u0E32\u0E22 (${d}%) \u2014 ${W[0]==="55-59"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E43\u0E01\u0E25\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E15\u0E49\u0E2D\u0E07\u0E43\u0E2B\u0E49\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E0A\u0E48\u0E2D\u0E07\u0E1B\u0E32\u0E01\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E42\u0E23\u0E04":W[0]==="25-34"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E19\u0E49\u0E19 health promotion \u0E41\u0E25\u0E30 follow-up periodic":"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E22 \u0E04\u0E27\u0E23\u0E01\u0E23\u0E30\u0E15\u0E38\u0E49\u0E19\u0E04\u0E27\u0E32\u0E21\u0E15\u0E23\u0E30\u0E2B\u0E19\u0E31\u0E01\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E0A\u0E48\u0E2D\u0E07\u0E1B\u0E32\u0E01"}`)
      }
      if (p[0] && _.push(`\u{1F9B7} \u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${p[0].code} ${p[0].name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${p[0].count} \u0E23\u0E32\u0E22 \u2014 ${p[0].code.startsWith("K02")?"\u0E1F\u0E31\u0E19\u0E1C\u0E38 \u0E04\u0E27\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1B\u0E23\u0E07\u0E1F\u0E31\u0E19\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C\u0E17\u0E35\u0E48\u0E1A\u0E49\u0E32\u0E19":"\u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E41\u0E19\u0E27\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`), f) {
        const [d, l] = f, P = e.length > 0 ? Math.round(l.count / e.length * 100) : 0;
        P >= 50 && _.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${d} ${l.count} \u0E23\u0E32\u0E22 (${P}%) \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19`)
      }
      v0.total < 50 && _.push(`\u26A0\uFE0F \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E48\u0E33 (${v0.total} \u0E23\u0E32\u0E22) \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E33 outreach \u0E43\u0E19\u0E0A\u0E38\u0E21\u0E0A\u0E19 \u0E40\u0E0A\u0E48\u0E19 \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E2A\u0E21., \u0E08\u0E31\u0E14\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E43\u0E19\u0E0A\u0E38\u0E21\u0E0A\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07`);
      const Y = {
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
            value: v0.total.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,.12), rgba(14,165,233,.04))",
            border: "rgba(14,165,233,.25)"
          }, {
            label: "\u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C",
            value: c.toLocaleString(void 0, {
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
            value: z.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#8b5cf6",
            gradient: "linear-gradient(135deg, rgba(139,92,246,.12), rgba(139,92,246,.04))",
            border: "rgba(139,92,246,.25)"
          }, {
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32",
            value: $.length,
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }].map((d, l) => u.jsxs("div", {
            style: {
              background: d.gradient,
              border: `1px solid ${d.border}`,
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
              children: d.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: d.color,
                lineHeight: 1.1
              },
              children: [d.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: d.unit
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
            }), $.map(([d, l], P) => {
              const o = e.length > 0 ? Math.round(l.count / e.length * 100) : 0,
                g = ["#0ea5e9", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"],
                m = g[P % g.length];
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
                    title: d,
                    children: d
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: m
                    },
                    children: [l.count, " (", o, "%)"]
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
                      width: `${o}%`,
                      borderRadius: "3px",
                      background: m,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, P)
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
              children: Object.entries(x).map(([d, l]) => u.jsxs("div", {
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
                    color: b[d]
                  },
                  children: l
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: b[d],
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
                  children: d
                })]
              }, d))
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
              children: p.map((d, l) => {
                const P = i > 0 ? Math.round(d.count / i * 100) : 0;
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
                    children: d.code
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
                        width: `${P}%`,
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
                      children: d.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: d.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [d.totalInc.toLocaleString(), " \u0E3F"]
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
            ref: H,
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
                children: I0(e).map((d, l) => {
                  const P = l % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: P,
                      transition: "background .1s"
                    },
                    onMouseEnter: o => o.currentTarget.style.background = "rgba(14,165,233,.05)",
                    onMouseLeave: o => o.currentTarget.style.background = P,
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        color: "var(--md-text-tertiary)",
                        fontSize: "11px"
                      },
                      children: d.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontWeight: 700
                      },
                      children: d.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: d.hn
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
                        children: d.pttype_name
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 800,
                        color: Number(d.age_y) >= 55 ? "#ef4444" : Number(d.age_y) >= 45 ? "#f59e0b" : Number(d.age_y) >= 35 ? "#10b981" : "#3b82f6"
                      },
                      children: d.age_y
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        letterSpacing: ".02em"
                      },
                      children: d.cid
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "11px"
                      },
                      children: d.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: d.department,
                      children: d.department
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
                      title: d.address,
                      children: d.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: d.mobile_phone_number || u.jsx("span", {
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
                      children: d.icd10 || "\u2014"
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
                      title: d.icd10name,
                      children: d.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 800,
                        fontSize: "12px",
                        background: "rgba(16,185,129,.04)",
                        color: "#059669"
                      },
                      children: d.fluoride_price ? d.fluoride_price.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 900,
                        fontSize: "12px",
                        background: d.income >= 2e3 ? "rgba(59,130,246,.08)" : d.income >= 1e3 ? "rgba(59,130,246,.04)" : "transparent",
                        color: d.income >= 2e3 ? "#1d4ed8" : d.income >= 500 ? "#3b82f6" : "var(--md-text-primary)"
                      },
                      children: d.income ? d.income.toLocaleString() : "\u2014"
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
                      title: d.chief_complaint,
                      children: d.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, d.vn || l)
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
                    children: [F0 !== "all" && v0.total > F0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", F0, " \u0E08\u0E32\u0E01 ", v0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", v0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", z.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#059669",
                      borderBottom: "none"
                    },
                    children: c.toLocaleString(void 0, {
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
        }), _.length > 0 ? u.jsx(Du, {
          data: Y,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && (n === "pt" || n === "staff-services") && V?.patients && (() => {
      const e = V.patients,
        t = V.total_income || 0,
        c = e.length > 0 ? Math.round(t / e.length) : 0;
      e.length > 0 && Math.max(...e.map(y => y.income || 0));
      const z = V.opd_count || e.filter(y => y.visit_type === "OPD").length,
        r = V.ipd_count || e.filter(y => y.visit_type === "IPD").length,
        p = V.opd_income || e.filter(y => y.visit_type === "OPD").reduce((y, N) => y + N.income, 0),
        i = V.ipd_income || e.filter(y => y.visit_type === "IPD").reduce((y, N) => y + N.income, 0),
        x = {};
      e.forEach(y => {
        const N = (y.icd10 || "").trim().toUpperCase();
        N && iu.test(N) && (x[N] || (x[N] = {
          code: N,
          name: y.icd10name,
          count: 0,
          totalInc: 0
        }), x[N].count++, x[N].totalInc += y.income || 0)
      });
      const h = Object.values(x).sort((y, N) => N.count - y.count).slice(0, 10),
        b = h.length > 0 ? h[0].count : 1,
        C = {};
      e.forEach(y => {
        const N = y.department || "-";
        C[N] || (C[N] = {
          count: 0,
          income: 0
        }), C[N].count++, C[N].income += y.income || 0
      });
      const $ = Object.entries(C).sort((y, N) => N[1].count - y[1].count),
        F = {
          "<18": 0,
          "18-34": 0,
          "35-59": 0,
          "60+": 0
        };
      e.forEach(y => {
        const N = Number(y.age_y) || 0;
        N < 18 ? F["<18"]++ : N < 35 ? F["18-34"]++ : N < 60 ? F["35-59"]++ : F["60+"]++
      });
      const W = Math.max(...Object.values(F), 1),
        R = {
          "<18": "#3b82f6",
          "18-34": "#10b981",
          "35-59": "#f59e0b",
          "60+": "#ef4444"
        },
        f = {};
      e.forEach(y => {
        const N = (y.vstdate || "").substring(0, 10);
        N && (f[N] = f[N] || {
          date: N,
          count: 0,
          income: 0
        }, f[N].count++, f[N].income += y.income || 0)
      });
      const _ = Object.values(f).sort((y, N) => y.date.localeCompare(N.date)),
        Y = Math.max(..._.map(y => y.count), 1),
        d = _.reduce((y, N) => y + N.income, 0),
        l = _.length > 0 ? Math.round(e.length / _.length) : 0,
        P = V.yoy || null,
        o = (y, N) => P == null || N == null || N === 0 ? null : Math.round((y - N) / N * 1e3) / 10,
        g = P && P.total > 0 ? Math.round(P.total_income / P.total) : null,
        m = (y, N, v) => {
          if (y == null) return null;
          const e0 = y >= 0;
          return {
            text: `${e0?"\u25B2":"\u25BC"} ${e0?"+":""}${y.toFixed(1)}%`,
            compare: `vs ${(N||0).toLocaleString()} ${v||""}`,
            fg: e0 ? "#059669" : "#dc2626",
            bg: e0 ? "rgba(16,185,129,.10)" : "rgba(239,68,68,.10)"
          }
        },
        L = n === "staff-services" ? "\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 & PMC",
        A = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
        S = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" : "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
        U = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E21\u0E48" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E2B\u0E21\u0E48",
        B = new Set(e.map(y => y.hn).filter(Boolean)).size,
        w = Object.values(e.reduce((y, N) => (N.hn && (y[N.hn] = (y[N.hn] || 0) + 1), y), {})).filter(y => y > 1).length,
        j = e.length - B,
        M = B > 0 ? Math.round(j / e.length * 100) : 0,
        T = _.length > 0 ? _.reduce((y, N) => N.count > y.count ? N : y, _[0]) : null,
        G = _.length > 0 ? _.reduce((y, N) => N.count < y.count ? N : y, _[0]) : null,
        E0 = $.length > 0 ? $[0] : null,
        u0 = h.length > 0 ? h[0] : null,
        b0 = P ? o(V.total, P.total) : null,
        W0 = P ? o(t, P.total_income) : null,
        U0 = [];
      if (U0.push(`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21${L} (${V.date_range?.start||""} \u0E16\u0E36\u0E07 ${V.date_range?.end||""}): ${S} ${V.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${B.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${c.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22${b0!=null?` \xB7 ${b0>=0?"\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(b0).toFixed(1)}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19`:""}`), W0 != null && Math.abs(W0) >= 20 && U0.push(W0 >= 0 ? `\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D ${W0.toFixed(1)}% YoY (${(P.total_income||0).toLocaleString()} \u2192 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17) \u2014 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19/\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E49\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E01\u0E29\u0E32\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23` : `\u{1F4C9} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E25\u0E07 ${Math.abs(W0).toFixed(1)}% YoY \u2014 \u0E04\u0E27\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38: \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 \xB7 \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14 \xB7 \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2B\u0E32\u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A`), T && G && T.date !== G.date && _.length >= 3 && U0.push(`\u{1F4C5} \u0E27\u0E31\u0E19\u0E17\u0E35\u0E48${A}\u0E21\u0E32\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${T.date.substring(5)} (${T.count} \u0E23\u0E32\u0E22) \xB7 \u0E19\u0E49\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${G.date.substring(5)} (${G.count} \u0E23\u0E32\u0E22) \u2014 ${T.count>G.count*3?"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \u0E04\u0E27\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E27\u0E48\u0E32\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E19\u0E49\u0E2D\u0E22\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32 (\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14/\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22) \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \u0E41\u0E25\u0E30\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E23\u0E31\u0E1A\u0E20\u0E32\u0E23\u0E30\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E21\u0E32\u0E01":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E1B\u0E01\u0E15\u0E34"}`), E0) {
        const [y, N] = E0, v = e.length > 0 ? Math.round(N.count / e.length * 100) : 0;
        U0.push(`\u{1F3E5} \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${y.replace(/^\d+\s*/,"")} ${N.count} \u0E23\u0E32\u0E22 (${v}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${(N.income||0).toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17${v>=60?" \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E44\u0E1B\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E2D\u0E37\u0E48\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07":""}`)
      }
      if (u0 && iu.test(u0.code) && U0.push(`\u{1FA7A} \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${u0.code} ${u0.name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${u0.count} \u0E23\u0E32\u0E22 \u2014 ${u0.code.startsWith("M")?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E01\u0E25\u0E49\u0E32\u0E21\u0E40\u0E19\u0E37\u0E49\u0E2D/\u0E02\u0E49\u0E2D \u0E04\u0E27\u0E23\u0E23\u0E30\u0E1A\u0E38\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07/\u0E23\u0E30\u0E22\u0E30\u0E43\u0E2B\u0E49\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E2B\u0E31\u0E2A\u0E44\u0E14\u0E49\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33":"\u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E33 protocol \u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E"}`), B > 0 && M >= 5 && U0.push(`\u{1F501} \u0E21\u0E35${A}\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33 ${j.toLocaleString()} visits \u0E08\u0E32\u0E01 ${w.toLocaleString()} HN (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${(e.length/B).toFixed(1)} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19) \u2014 ${M>=30?"\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E2A\u0E39\u0E07\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01":"\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E1B\u0E01\u0E15\u0E34 \u2014 \u0E40\u0E19\u0E49\u0E19\u0E40\u0E0A\u0E34\u0E0D\u0E0A\u0E27\u0E19"+U+"\u0E40\u0E1E\u0E34\u0E48\u0E21"}`), b && b.length > 0 && b[0]) {
        const y = b[0],
          N = e.length > 0 ? Math.round(y.count / e.length * 100) : 0;
        N >= 50 && U0.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${y.name} ${y.count} \u0E23\u0E32\u0E22 (${N}%) \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \xB7 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 \u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18`)
      }
      const yu = {
        data_source: `AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C${L} \xB7 HOSxP XE Live`,
        timestamp: new Date().toISOString(),
        recommendations: U0
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
          children: [...n === "staff-services" && V.staff_registry_count ? [{
            label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
            icon: "\u{1F465}",
            value: V.staff_registry_count.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#7c3aed",
            yoy: (() => {
              const y = B,
                N = V.staff_registry_count > 0 ? Math.round(y / V.staff_registry_count * 1e3) / 10 : 0;
              return {
                text: `\u{1F4CA} \u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${y.toLocaleString()} \u0E23\u0E32\u0E22 (${N}%)`,
                compare: `\u0E44\u0E21\u0E48\u0E21\u0E32 ${(V.staff_registry_count-y).toLocaleString()} \u0E23\u0E32\u0E22`,
                fg: N >= 50 ? "#059669" : "#d97706",
                bg: N >= 50 ? "rgba(16,185,129,.10)" : "rgba(217,119,6,.10)"
              }
            })()
          }] : [], {
            label: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" : "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            icon: "\u{1F465}",
            value: (n === "staff-services" ? B : V.total).toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#10b981",
            yoy: n === "staff-services" ? (() => {
              const y = o(B, P?.unique_hn),
                N = V.total.toLocaleString(),
                v = B > 0 ? (V.total / B).toFixed(1) : "0";
              if (y == null) return {
                text: `${N} visits`,
                compare: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${v} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19`,
                fg: "#64748b",
                bg: "rgba(100,116,139,.08)"
              };
              const e0 = y >= 0;
              return {
                text: `${e0?"\u25B2":"\u25BC"} ${e0?"+":""}${y.toFixed(1)}%`,
                compare: `vs ${(P?.unique_hn||0).toLocaleString()} \u0E23\u0E32\u0E22 \xB7 ${N} visits (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${v}/\u0E04\u0E19)`,
                fg: e0 ? "#059669" : "#dc2626",
                bg: e0 ? "rgba(16,185,129,.10)" : "rgba(239,68,68,.10)"
              }
            })() : m(o(V.total, P?.total), P?.total, "\u0E23\u0E32\u0E22")
          }, ...n === "staff-services" ? [{
            label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            icon: "\u{1F4CB}",
            value: V.total.toLocaleString(),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#0d9488",
            yoy: m(o(V.total, P?.total), P?.total, "\u0E04\u0E23\u0E31\u0E49\u0E07")
          }] : [], {
            label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (OPD)",
            icon: "\u{1F6AA}",
            value: z.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            yoy: m(o(z, P?.opd_count), P?.opd_count, "\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD)",
            icon: "\u{1F6CF}\uFE0F",
            value: r.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ef4444",
            yoy: m(o(r, P?.ipd_count), P?.ipd_count, "\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            icon: "\u{1F4B0}",
            value: t.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            yoy: m(o(t, P?.total_income), P?.total_income, "\u0E3F")
          }, {
            label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 / \u0E23\u0E32\u0E22",
            icon: "\u{1F4CA}",
            value: c.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#8b5cf6",
            yoy: m(o(c, g), g, "\u0E3F/\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E41\u0E1C\u0E19\u0E01",
            icon: "\u{1F3E5}",
            value: $.length,
            unit: "\u0E41\u0E1C\u0E19\u0E01",
            color: "#ec4899",
            yoy: null
          }].map((y, N) => u.jsxs("div", {
            style: {
              position: "relative",
              overflow: "hidden",
              background: `linear-gradient(180deg, var(--md-surface, #fff) 0%, ${y.color}08 100%)`,
              border: `1px solid ${y.color}25`,
              borderRadius: "16px",
              padding: "16px 18px",
              transition: "transform .2s cubic-bezier(.4,0,.2,1), box-shadow .2s ease",
              cursor: "default",
              boxShadow: "0 1px 2px rgba(0,0,0,.04)"
            },
            onMouseEnter: v => {
              v.currentTarget.style.transform = "translateY(-2px)", v.currentTarget.style.boxShadow = `0 8px 24px ${y.color}25`
            },
            onMouseLeave: v => {
              v.currentTarget.style.transform = "", v.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,.04)"
            },
            children: [u.jsx("div", {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${y.color}, ${y.color}55)`
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
                  background: `${y.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0
                },
                children: y.icon
              }), u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--md-text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: ".06em",
                  lineHeight: 1.3
                },
                children: y.label
              })]
            }), u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                marginBottom: y.yoy ? "10px" : "2px"
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
                children: y.value
              }), u.jsx("span", {
                style: {
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)"
                },
                children: y.unit
              })]
            }), y.yoy ? u.jsxs("div", {
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
                  background: y.yoy.bg,
                  fontSize: "10px",
                  fontWeight: 800,
                  color: y.yoy.fg,
                  letterSpacing: "0.02em"
                },
                children: y.yoy.text
              }), u.jsx("span", {
                style: {
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: y.yoy.compare
              })]
            }) : null]
          }, N))
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
            }), $.map(([y, N], v) => {
              const e0 = e.length > 0 ? Math.round(N.count / e.length * 100) : 0,
                f0 = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"],
                O0 = f0[v % f0.length];
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
                    title: y,
                    children: y.replace(/^\d+/, "")
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: O0
                    },
                    children: [N.count, " (", e0, "%)"]
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
                      width: `${e0}%`,
                      borderRadius: "3px",
                      background: O0,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, v)
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
              children: Object.entries(F).map(([y, N]) => u.jsxs("div", {
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
                    color: R[y]
                  },
                  children: N
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: R[y],
                    height: `${Math.max(8,N/W*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: y
                })]
              }, y))
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
              children: h.map((y, N) => {
                const v = b > 0 ? Math.round(y.count / b * 100) : 0;
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
                    children: y.code
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
                        width: `${v}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(16,185,129,.25), rgba(16,185,129,.${N===0?"5":"3"}))`,
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
                      children: y.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: y.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [y.totalInc.toLocaleString(), " \u0E3F"]
                  })]
                }, N)
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
              children: [_.length, " \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", l, " \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \xB7 \u0E23\u0E27\u0E21 ", d.toLocaleString(), " \u0E1A\u0E32\u0E17"]
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
            children: _.map(y => u.jsxs("div", {
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                minWidth: 0
              },
              title: `${y.date} \xB7 ${y.count} \u0E23\u0E32\u0E22 \xB7 ${(y.income||0).toLocaleString()} \u0E1A\u0E32\u0E17`,
              children: [u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 900,
                  color: "#06b6d4"
                },
                children: y.count
              }), u.jsx("div", {
                style: {
                  width: "100%",
                  borderRadius: "6px 6px 0 0",
                  background: "linear-gradient(180deg, #06b6d4, #3b82f6)",
                  height: `${Math.max(8,y.count/Y*80)}px`,
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
                children: y.date.substring(5)
              })]
            }, y.date))
          })]
        }), u.jsxs("div", {
          className: "rounded-2xl overflow-hidden",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)",
            boxShadow: "0 2px 16px rgba(0,0,0,.05)"
          },
          children: [u.jsxs("div", {
            ref: H,
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
                    children: [V.date_range.start, " \u0E16\u0E36\u0E07 ", V.date_range.end]
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
                  children: [V.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                  children: ["OPD ", z]
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
                children: I0(e).map((y, N) => {
                  const v = N % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent",
                    e0 = y.visit_type === "IPD";
                  return u.jsxs("tr", {
                    style: {
                      background: v,
                      transition: "background .1s"
                    },
                    onMouseEnter: f0 => f0.currentTarget.style.background = "rgba(59,130,246,.05)",
                    onMouseLeave: f0 => f0.currentTarget.style.background = v,
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        color: "var(--md-text-tertiary)",
                        fontSize: "11px"
                      },
                      children: y.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        fontWeight: 700
                      },
                      children: y.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: y.hn
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
                          background: e0 ? "rgba(239,68,68,.1)" : "rgba(14,165,233,.1)",
                          color: e0 ? "#dc2626" : "#0284c7",
                          border: `1px solid ${e0?"rgba(239,68,68,.2)":"rgba(14,165,233,.2)"}`
                        },
                        children: y.visit_type
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
                        children: y.pttype_name
                      })
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 800,
                        color: Number(y.age_y) >= 60 ? "#ef4444" : Number(y.age_y) >= 35 ? "#f59e0b" : "#10b981"
                      },
                      children: y.age_y
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px",
                        letterSpacing: ".02em"
                      },
                      children: y.cid
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                        fontSize: "11px"
                      },
                      children: y.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "130px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      title: y.department,
                      children: y.department
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "10px",
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: e0 ? "#dc2626" : "var(--md-text-tertiary)"
                      },
                      title: y.ward_name,
                      children: y.ward_name || "\u2014"
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
                      title: y.address,
                      children: y.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: y.mobile_phone_number || u.jsx("span", {
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
                      children: y.icd10 || "\u2014"
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
                      title: y.icd10name,
                      children: y.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        fontWeight: 900,
                        fontSize: "12px",
                        background: y.income >= 2e3 ? "rgba(59,130,246,.08)" : y.income >= 1e3 ? "rgba(59,130,246,.04)" : "transparent",
                        color: y.income >= 2e3 ? "#1d4ed8" : y.income >= 500 ? "#3b82f6" : "var(--md-text-primary)"
                      },
                      children: y.income ? y.income.toLocaleString() : "\u2014"
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
                      title: y.chief_complaint,
                      children: y.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, y.vn || N)
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
                    children: [F0 !== "all" && V.total > F0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", F0, " \u0E08\u0E32\u0E01 ", V.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", V.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 OPD ", z, " (", p.toLocaleString(), " \u0E3F) \xB7 IPD ", r, " (", i.toLocaleString(), " \u0E3F) \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", c.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
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
              children: V.timestamp && new Date(V.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), U0.length > 0 ? u.jsx(Du, {
          data: yu,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "ncd-disease" && q && (() => {
      const {
        pts: e,
        totalIncome: t,
        uniquePatients: c,
        avgIncome: z,
        maleCount: r,
        femaleCount: p,
        ageGroups: i,
        ageMax: x,
        topIcd: h,
        rightList: b
      } = q, C = m0.diseases || ["DM", "HT", "DLP", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD", "Other"], $ = m0.disease_labels || {}, F = q.diseaseCountsFE || m0.disease_counts || {}, W = {
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
      }, R = Math.max(...C.map(S => F[S] || 0), 1), f = {
        "<40": "#06b6d4",
        "40-49": "#3b82f6",
        "50-59": "#10b981",
        "60-69": "#f59e0b",
        "70+": "#ef4444"
      }, _ = h.slice(0, 10), Y = _.length > 0 ? _[0].count : 1, d = C.filter(S => (F[S] || 0) > 0 && S !== "Other").sort((S, U) => (F[U] || 0) - (F[S] || 0)), l = d[0], P = d[1], o = ["CKD1", "CKD2", "CKD3", "CKD4", "CKD5"].reduce((S, U) => S + (F[U] || 0), 0), g = (F.CKD3 || 0) + (F.CKD4 || 0) + (F.CKD5 || 0), m = e.length > 0 ? Math.round(t / e.length) : 0, L = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 NCD: ${e.length.toLocaleString()} visits \u0E08\u0E32\u0E01 ${c.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33 \xB7 \u0E0A\u0E32\u0E22 ${r} \u0E23\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07 ${p} \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m.toLocaleString()} \u0E1A\u0E32\u0E17/visit`];
      if (l && L.push(`\u{1FA7A} \u0E42\u0E23\u0E04\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${$[l]||l} ${(F[l]||0).toLocaleString()} \u0E23\u0E32\u0E22${P?` \xB7 \u0E23\u0E2D\u0E07\u0E21\u0E32 ${$[P]||P} ${(F[P]||0).toLocaleString()} \u0E23\u0E32\u0E22`:""}${["DM","HT","DLP"].includes(l)?" \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19 NCD \u0E04\u0E27\u0E23\u0E40\u0E02\u0E49\u0E21\u0E07\u0E27\u0E14\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07 self-care + \u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25 HbA1c/BP":l==="Stroke"||l==="IHD"?" \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08\u0E2B\u0E25\u0E2D\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 specialist \u0E41\u0E25\u0E30 rehab":""}`), o > 0) {
        const S = c > 0 ? Math.round(o / c * 100) : 0,
          U = o > 0 ? Math.round(g / o * 100) : 0;
        L.push(`\u{1FAC0} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E23\u0E27\u0E21 ${o.toLocaleString()} \u0E23\u0E32\u0E22 (${S}% \u0E02\u0E2D\u0E07 HN) \xB7 \u0E23\u0E30\u0E22\u0E30 3-5 ${g.toLocaleString()} \u0E23\u0E32\u0E22 (${U}%) \u2014 ${g>=50?"\u{1F534} \u0E21\u0E35 CKD \u0E23\u0E30\u0E22\u0E30\u0E25\u0E36\u0E01\u0E08\u0E33\u0E19\u0E27\u0E19\u0E21\u0E32\u0E01 \u0E15\u0E49\u0E2D\u0E07 early referral \u0E44\u0E1B\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 nephrology + \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 dialysis":g>=10?"\u{1F7E0} \u0E04\u0E27\u0E23 monitor eGFR \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 + \u0E1B\u0E23\u0E31\u0E1A\u0E22\u0E32\u0E43\u0E2B\u0E49\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07":"\u{1F7E2} \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E22\u0E30\u0E15\u0E49\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E19\u0E49\u0E19 primary prevention"}`)
      }
      if (_[0] && L.push(`\u{1F48A} \u0E23\u0E2B\u0E31\u0E2A ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E2A\u0E38\u0E14: ${_[0].code} ${_[0].name||""} (${_[0].count} \u0E23\u0E32\u0E22) \u2014 ${_[0].code.startsWith("E11")||_[0].code.startsWith("E10")?"DM \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 complications: retinopathy, neuropathy, nephropathy":_[0].code.startsWith("I10")?"Hypertension \u0E04\u0E27\u0E23 monitor BP \u0E17\u0E38\u0E01 visit + \u0E1B\u0E23\u0E31\u0E1A lifestyle":_[0].code.startsWith("N18")?"CKD progression \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E43\u0E01\u0E25\u0E49\u0E0A\u0E34\u0E14":"\u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 comorbidities \u0E40\u0E1E\u0E37\u0E48\u0E2D holistic care"}`), (F.DM || 0) > 0 && (F.HT || 0) > 0) {
        const S = Math.min(F.DM, F.HT);
        L.push(`\u26A0\uFE0F \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 DM + HT \u0E23\u0E48\u0E27\u0E21: \u0E04\u0E32\u0E14\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${S.toLocaleString()} \u0E23\u0E32\u0E22 (overlap) \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 CV/CKD \u0E2A\u0E39\u0E07 \xB7 \u0E04\u0E27\u0E23\u0E21\u0E35 integrated NCD clinic \u0E17\u0E35\u0E48\u0E14\u0E39\u0E41\u0E25\u0E04\u0E23\u0E1A\u0E17\u0E31\u0E49\u0E07 2 \u0E42\u0E23\u0E04\u0E43\u0E19\u0E04\u0E23\u0E31\u0E49\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27 \u0E25\u0E14 visit \u0E0B\u0E49\u0E33`)
      }
      L.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22: NCD \u0E40\u0E1B\u0E47\u0E19 70% \u0E02\u0E2D\u0E07 DALYs \u0E43\u0E19\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22 \xB7 \u0E04\u0E27\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07 patient registry, integrated care pathway, telehealth follow-up \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HbA1c<7%, BP<140/90 \u0E43\u0E19\u0E17\u0E38\u0E01 guidelines");
      const A = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: L
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
            value: c.toLocaleString(),
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
            value: z.toLocaleString(),
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
            value: p.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }].map((S, U) => u.jsxs("div", {
            style: {
              background: S.gradient,
              border: `1px solid ${S.border}`,
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
              children: S.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: S.color,
                lineHeight: 1.1
              },
              children: [S.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: S.unit
              })]
            })]
          }, U))
        }), (() => {
          const S = ["DM", "HT", "DLP", "IHD", "Stroke", "COPD"].filter(T => C.includes(T)),
            U = ["CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD"].filter(T => C.includes(T)),
            B = F.Other || 0,
            w = U.reduce((T, G) => T + (F[G] || 0), 0),
            j = ({
              dg: T
            }) => {
              const G = F[T] || 0,
                E0 = e.length > 0 ? Math.round(G / e.length * 100) : 0,
                u0 = W[T] || "#7c3aed";
              return u.jsxs("div", {
                style: {
                  background: `linear-gradient(135deg, ${u0}14, ${u0}06)`,
                  border: `1px solid ${u0}33`,
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
                    background: u0,
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
                      color: u0,
                      letterSpacing: ".02em"
                    },
                    children: T
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: u0,
                      opacity: .85,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: `${u0}1a`
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
                  children: [G.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "5px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: $[T],
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: $[T]
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
                      width: `${G/R*100}%`,
                      borderRadius: "2px",
                      background: u0,
                      transition: "width .5s ease"
                    }
                  })
                })]
              })
            },
            M = ({
              dg: T
            }) => {
              const G = F[T] || 0,
                E0 = w > 0 ? Math.round(G / w * 100) : 0,
                u0 = W[T] || "#10b981",
                b0 = T === "CKD" ? "?" : T.replace("CKD", "");
              return u.jsxs("div", {
                style: {
                  background: "var(--md-surface)",
                  border: `1px solid ${u0}30`,
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
                      background: u0,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      letterSpacing: ".03em"
                    },
                    children: ["Stage ", b0]
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
                    color: u0,
                    lineHeight: 1
                  },
                  children: [G.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "4px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: $[T],
                  style: {
                    fontSize: "9px",
                    color: "var(--md-text-tertiary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600
                  },
                  children: $[T]?.replace(/^CKD Stage \d+ /, "").replace(/^CKD /, "")
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
                  gridTemplateColumns: `repeat(${Math.min(S.length,6)}, minmax(0, 1fr))`,
                  gap: "10px"
                },
                children: S.map(T => u.jsx(j, {
                  dg: T
                }, T))
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
                  children: ["\u0E23\u0E27\u0E21 ", w.toLocaleString(), " visit"]
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
                children: U.map(T => u.jsx(M, {
                  dg: T
                }, T))
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
                  children: $.Other || "\u0E21\u0E32\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 NCD \u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04 NCD"
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
            }), b.slice(0, 8).map(([S, U], B) => {
              const w = e.length > 0 ? Math.round(U.count / e.length * 100) : 0,
                j = ["#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                M = j[B % j.length];
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
                    title: S,
                    children: S
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: M
                    },
                    children: [U.count, " (", w, "%)"]
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
                      width: `${w}%`,
                      borderRadius: "3px",
                      background: M,
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
              children: Object.entries(i).map(([S, U]) => u.jsxs("div", {
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
                    color: f[S]
                  },
                  children: U
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: f[S],
                    height: `${Math.max(8,U/x*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: S
                })]
              }, S))
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
              children: _.map((S, U) => {
                const B = Y > 0 ? Math.round(S.count / Y * 100) : 0;
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
                    children: S.code
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
                      children: S.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: S.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [S.totalInc.toLocaleString(), " \u0E3F"]
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
            ref: H,
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
                    children: [m0.date_range.start, " \u0E16\u0E36\u0E07 ", m0.date_range.end]
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
                  children: [c.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                children: I0(e).map((S, U) => {
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
                      children: S.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                      },
                      children: S.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: S.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: S.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899"
                      },
                      children: S.sex || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: S.age_y ?? "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: S.pttype_name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: S.cid || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: S.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px",
                        color: "var(--md-text-tertiary)"
                      },
                      children: S.vsttime || "\u2014"
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
                      title: S.address,
                      children: S.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: S.mobile_phone_number || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(168,85,247,.04)",
                        fontWeight: 800,
                        color: "#a855f7",
                        fontSize: "11px"
                      },
                      children: S.disease_groups || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#059669"
                      },
                      children: S.icd10 || "\u2014"
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
                      title: S.icd10name,
                      children: S.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.025)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        color: "var(--md-text-secondary)"
                      },
                      children: S.creatinine != null ? Number(S.creatinine).toFixed(2) : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.025)",
                        fontWeight: 800,
                        color: S.egfr == null ? "var(--md-text-tertiary)" : S.egfr < 30 ? "#dc2626" : S.egfr < 60 ? "#ea580c" : "#059669"
                      },
                      children: S.egfr != null ? S.egfr : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.025)"
                      },
                      children: S.ckd_stage ? u.jsx("span", {
                        style: {
                          padding: "2px 8px",
                          borderRadius: "99px",
                          fontSize: "10px",
                          fontWeight: 800,
                          background: S.ckd_stage === "CKD5" ? "rgba(220,38,38,.12)" : S.ckd_stage === "CKD4" ? "rgba(234,88,12,.12)" : S.ckd_stage === "CKD3" ? "rgba(245,158,11,.12)" : "rgba(16,185,129,.12)",
                          color: S.ckd_stage === "CKD5" ? "#dc2626" : S.ckd_stage === "CKD4" ? "#ea580c" : S.ckd_stage === "CKD3" ? "#d97706" : "#059669"
                        },
                        children: S.ckd_stage
                      }) : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(59,130,246,.04)",
                        fontWeight: 800,
                        color: "#2563eb"
                      },
                      children: S.income ? S.income.toLocaleString() : "\u2014"
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
                      title: S.chief_complaint,
                      children: S.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, S.vn || U)
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
                    }), "\u0E23\u0E27\u0E21 ", e.length.toLocaleString(), " visit \xB7 ", c.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", z.toLocaleString(), " \u0E1A\u0E32\u0E17/visit"]
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
              children: m0.timestamp && new Date(m0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), L.length > 0 ? u.jsx(Du, {
          data: A,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "imaging-services" && i0?.patients && (() => {
      const e = i0.patients,
        t = i0.services || ["XRAY", "CT", "Portable", "BMD"],
        c = i0.service_labels || {},
        z = i0.service_counts || {},
        r = i0.total_income || 0,
        p = i0.total_imaging_price || 0,
        i = i0.unique_patients || 0,
        x = e.length > 0 ? Math.round(p / e.length) : 0,
        h = e.filter(B => B.sex === "\u0E0A\u0E32\u0E22").length,
        b = e.filter(B => B.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
        C = {
          XRAY: "#3b82f6",
          CT: "#7c3aed",
          Portable: "#f59e0b",
          BMD: "#ec4899"
        },
        $ = Math.max(...t.map(B => z[B] || 0), 1),
        F = {
          "<20": 0,
          "20-39": 0,
          "40-59": 0,
          "60-79": 0,
          "80+": 0
        };
      e.forEach(B => {
        const w = Number(B.age_y) || 0;
        w < 20 ? F["<20"]++ : w < 40 ? F["20-39"]++ : w < 60 ? F["40-59"]++ : w < 80 ? F["60-79"]++ : F["80+"]++
      });
      const W = Math.max(...Object.values(F), 1),
        R = {
          "<20": "#06b6d4",
          "20-39": "#3b82f6",
          "40-59": "#10b981",
          "60-79": "#f59e0b",
          "80+": "#ef4444"
        },
        f = {};
      e.forEach(B => {
        (B.icd_pairs || "").split("||").filter(Boolean).forEach(w => {
          const [j, M] = w.split("::"), T = (j || "").trim().toUpperCase();
          !T || !iu.test(T) || (f[T] || (f[T] = {
            code: T,
            name: M || "",
            count: 0,
            totalInc: 0
          }), f[T].count++, f[T].totalInc += B.income || 0)
        })
      });
      const _ = Object.values(f).sort((B, w) => w.count - B.count).slice(0, 10),
        Y = _.length > 0 ? _[0].count : 1,
        d = {};
      e.forEach(B => {
        const w = B.pttype_name || "-";
        d[w] || (d[w] = {
          count: 0,
          income: 0
        }), d[w].count++, d[w].income += B.income || 0
      });
      const l = Object.entries(d).sort((B, w) => w[1].count - B[1].count),
        P = t.reduce((B, w) => B + (z[w] || 0), 0),
        o = t.reduce((B, w) => (z[w] || 0) > (z[B] || 0) ? w : B, t[0]),
        g = Object.entries(F).reduce((B, [w, j]) => j > B[1] ? [w, j] : B, ["", 0]),
        m = e.length > 0 ? Math.round(p / e.length) : 0,
        L = _.length > 0 ? _[0] : null,
        A = l.length > 0 ? l[0] : null,
        S = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32: ${e.length.toLocaleString()} visits \u0E08\u0E32\u0E01 ${i.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33 \xB7 \u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 ${p.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m.toLocaleString()} \u0E1A\u0E32\u0E17/visit \xB7 \u0E0A\u0E32\u0E22 ${h} / \u0E2B\u0E0D\u0E34\u0E07 ${b}`];
      if (o && P > 0) {
        const B = Math.round((z[o] || 0) / P * 100);
        S.push(`\u{1FA7B} \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${o} ${(z[o]||0).toLocaleString()} \u0E04\u0E23\u0E31\u0E49\u0E07 (${B}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14) \u2014 ${o==="XRAY"?"X-Ray \u0E40\u0E1B\u0E47\u0E19 routine \u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 \u0E04\u0E27\u0E23 monitor TAT \u0E43\u0E2B\u0E49 \u226430 \u0E19\u0E32\u0E17\u0E35":o==="CT"?"CT \u0E21\u0E35\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E2A\u0E39\u0E07 \u0E15\u0E49\u0E2D\u0E07 justify clinical indication \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E02\u0E49\u0E21\u0E07\u0E27\u0E14 \u0E25\u0E14 unnecessary scan":o==="Portable"?"Portable X-Ray \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E40\u0E15\u0E35\u0E22\u0E07 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E25\u0E30 infection control":"\u0E15\u0E23\u0E27\u0E08\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01 \u0E04\u0E27\u0E23\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A T-score follow-up plan"}`)
      }
      if (g[0]) {
        const B = e.length > 0 ? Math.round(g[1] / e.length * 100) : 0;
        S.push(`\u{1F465} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${g[0]} \u0E1B\u0E35 ${g[1]} \u0E23\u0E32\u0E22 (${B}%) \u2014 ${g[0]==="60-79"||g[0]==="80+"?"\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2B\u0E25\u0E31\u0E01 \u0E04\u0E27\u0E23\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 CXR + BMD \u0E40\u0E1B\u0E47\u0E19\u0E0A\u0E38\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35":g[0]==="40-59"?"\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E08\u0E32\u0E01 trauma \u0E2B\u0E23\u0E37\u0E2D chronic disease screening":"\u0E27\u0E31\u0E22\u0E2B\u0E19\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E27/\u0E40\u0E14\u0E47\u0E01 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E08\u0E32\u0E01 trauma + acute condition"}`)
      }
      if (L && S.push(`\u{1F50D} \u0E02\u0E49\u0E2D\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22: ${L.code} ${L.name||""} (${L.count} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${L.totalInc.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17) \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E15\u0E32\u0E21 ACR appropriateness criteria`), A) {
        const [B, w] = A, j = e.length > 0 ? Math.round(w.count / e.length * 100) : 0;
        j >= 40 && S.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${B} ${w.count} \u0E04\u0E23\u0E31\u0E49\u0E07 (${j}%) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${w.income.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17`)
      }
      S.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E23\u0E31\u0E07\u0E2A\u0E35: (1) \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A TAT \u0E02\u0E2D\u0E07 report turnaround \u226424 \u0E0A\u0E21. \xB7 (2) Audit indication \u0E02\u0E2D\u0E07 CT \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 (3) \u0E25\u0E14 radiation exposure \u0E15\u0E32\u0E21 ALARA \xB7 (4) Tele-radiology \u0E40\u0E1E\u0E37\u0E48\u0E2D second opinion \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19");
      const U = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: S
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
            value: p.toLocaleString(void 0, {
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
            value: x.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            gradient: "linear-gradient(135deg, rgba(59,130,246,.12), rgba(59,130,246,.04))",
            border: "rgba(59,130,246,.25)"
          }, {
            label: "\u0E0A\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07",
            value: `${h} / ${b}`,
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,.12), rgba(14,165,233,.04))",
            border: "rgba(14,165,233,.25)"
          }].map((B, w) => u.jsxs("div", {
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
          }, w))
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
              const w = z[B] || 0,
                j = e.length > 0 ? Math.round(w / e.length * 100) : 0,
                M = C[B] || "#7c3aed";
              return u.jsxs("div", {
                style: {
                  background: `linear-gradient(135deg, ${M}14, ${M}06)`,
                  border: `1px solid ${M}33`,
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
                    background: M,
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
                      color: M,
                      letterSpacing: ".02em"
                    },
                    children: B
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: M,
                      opacity: .85,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: `${M}1a`
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
                  children: [w.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "5px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: c[B],
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: c[B]
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
                      width: `${w/$*100}%`,
                      borderRadius: "2px",
                      background: M,
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
            }), l.slice(0, 8).map(([B, w], j) => {
              const M = e.length > 0 ? Math.round(w.count / e.length * 100) : 0,
                T = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                G = T[j % T.length];
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
                      color: G
                    },
                    children: [w.count, " (", M, "%)"]
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
                      width: `${M}%`,
                      borderRadius: "3px",
                      background: G,
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
              children: Object.entries(F).map(([B, w]) => u.jsxs("div", {
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
                    color: R[B]
                  },
                  children: w
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: R[B],
                    height: `${Math.max(8,w/W*60)}px`,
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
              children: _.map((B, w) => {
                const j = Y > 0 ? Math.round(B.count / Y * 100) : 0;
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
                        background: `linear-gradient(90deg, rgba(168,85,247,.25), rgba(168,85,247,.${w===0?"5":"3"}))`,
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
                }, w)
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
            ref: H,
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
                    children: [i0.date_range.start, " \u0E16\u0E36\u0E07 ", i0.date_range.end]
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
                  children: [p.toLocaleString(), " \u0E1A\u0E32\u0E17 (Imaging)"]
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
                children: I0(e).map((B, w) => {
                  const j = w % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
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
                  }, B.vn || w)
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
                    children: p.toLocaleString()
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
              children: i0.timestamp && new Date(i0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), S.length > 0 ? u.jsx(Du, {
          data: U,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "pttype-services" && y0?.groups && (() => {
      const e = y0.group_order || ["UC", "\u0E02\u0E49\u0E32\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23 / \u0E2D\u0E1B\u0E17", "\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07", "\u0E15\u0E48\u0E32\u0E07\u0E0A\u0E32\u0E15\u0E34 (1.5 \u0E40\u0E17\u0E48\u0E32)", "\u0E15\u0E48\u0E32\u0E07\u0E14\u0E49\u0E32\u0E27", "\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19\u0E2A\u0E31\u0E07\u0E04\u0E21", "\u0E1E\u0E23\u0E1A", "\u0E23\u0E31\u0E10\u0E27\u0E34\u0E2A\u0E32\u0E2B\u0E01\u0E34\u0E08", "\u0E2D\u0E37\u0E48\u0E19\u0E46"],
        t = y0.groups || [],
        c = new Set(Bu === null ? e : Bu),
        z = t.filter(j => c.has(j.group_name)),
        r = (y0.group_trend || []).filter(j => c.has(j.group_name)),
        p = (y0.summary || []).filter(j => c.has(j.group_name)),
        i = z.reduce((j, M) => j + (M.total_visits || 0), 0),
        x = z.reduce((j, M) => j + (M.opd_visits || 0), 0),
        h = z.reduce((j, M) => j + (M.ipd_admissions || 0), 0),
        b = z.reduce((j, M) => j + (M.er_visits || 0), 0),
        C = z.reduce((j, M) => j + (Math.max(M.opd_hn, M.ipd_hn, M.er_hn) || 0), 0),
        $ = j => Number(j || 0).toLocaleString(),
        F = [...z].sort((j, M) => M.total_visits - j.total_visits),
        W = F[0] || null,
        R = i > 0 && W ? Math.round(W.total_visits / i * 100) : 0,
        f = Array.from(new Set(r.map(j => j.ym))).sort(),
        _ = F.map(j => j.group_name),
        Y = f.map(j => {
          const M = {
            ym: j
          };
          for (const T of _) {
            const G = r.find(E0 => E0.ym === j && E0.group_name === T);
            M[T] = G ? G.total : 0
          }
          return M
        }),
        d = _.slice(0, 9),
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
        P = j => l[j] || "#94a3b8",
        o = _.map(P),
        g = j => {
          const M = Bu === null ? [...e] : [...Bu],
            T = M.indexOf(j);
          T >= 0 ? M.splice(T, 1) : M.push(j), K0(M)
        },
        m = () => K0(null),
        L = () => K0([]),
        A = Y.length > 0 ? Y.reduce((j, M) => {
          const T = d.reduce((E0, u0) => E0 + (j[u0] || 0), 0);
          return d.reduce((E0, u0) => E0 + (M[u0] || 0), 0) > T ? M : j
        }, Y[0]) : null,
        S = A ? A.ym : "\u2014",
        U = A ? d.reduce((j, M) => j + (A[M] || 0), 0) : 0,
        B = [];
      if (B.push(`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E0A\u0E48\u0E27\u0E07 ${y0.from} \u2192 ${y0.to}: ${$(i)} \u0E04\u0E23\u0E31\u0E49\u0E07 (OPD ${$(x)} \xB7 IPD ${$(h)} \xB7 ER ${$(b)}) \u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21 ${$(C)} \u0E23\u0E32\u0E22 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22 ${z.length} \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C (\u0E08\u0E32\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${e.length} \u0E2B\u0E21\u0E27\u0E14\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19)`), W && R >= 40 && B.push(`\u{1F3E5} \u0E2B\u0E21\u0E27\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E48\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${W.group_name} \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ${R}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (${$(W.total_visits)} \u0E04\u0E23\u0E31\u0E49\u0E07) \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23 reimbursement \u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E35\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E1E\u0E34\u0E40\u0E28\u0E29`), h > 0 && x > 0) {
        const j = (h / i * 100).toFixed(1);
        B.push(`\u{1FA7A} \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 IPD ${j}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 \xB7 \u0E2B\u0E32\u0E01 IPD \u0E40\u0E01\u0E34\u0E19 15% \u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E43\u0E14 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A DRG mix \u0E41\u0E25\u0E30 AdjRW \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E40\u0E04\u0E2A\u0E08\u0E23\u0E34\u0E07`)
      }
      A && U > 0 && B.push(`\u{1F4C8} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E1E\u0E35\u0E04: ${S} \u0E21\u0E35\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 ${$(U)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u0E01\u0E25\u0E38\u0E48\u0E21 Top 5) \u2014 \u0E43\u0E0A\u0E49\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19 + \u0E22\u0E32/\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32`), B.push("\u{1F4A1} \u0E41\u0E1C\u0E19\u0E1E\u0E31\u0E12\u0E19\u0E32: 1) \u0E08\u0E31\u0E14\u0E17\u0E33 Dashboard \u0E23\u0E32\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E2A\u0E48\u0E07\u0E17\u0E35\u0E21 UM \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 2) \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C recall rate per pttype 3) Audit \u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E04\u0E48\u0E32\u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 collection rate");
      const w = {
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
                onClick: m,
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
                onClick: L,
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
              const M = c.has(j),
                T = P(j);
              return u.jsxs("label", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 8,
                  border: `1px solid ${M?T:"var(--md-border)"}`,
                  background: M ? `${T}12` : "transparent",
                  cursor: "pointer",
                  fontSize: 11,
                  fontWeight: 700,
                  color: M ? T : "var(--md-text-tertiary)",
                  userSelect: "none"
                },
                children: [u.jsx("input", {
                  type: "checkbox",
                  checked: M,
                  onChange: () => g(j),
                  style: {
                    accentColor: T,
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
            value: $(i),
            color: "#0ea5e9"
          }, {
            label: "\u{1F465} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21",
            value: $(C),
            color: "#7c3aed"
          }, {
            label: "\u{1F3E5} OPD",
            value: $(x),
            color: "#10b981"
          }, {
            label: "\u{1F6CF}\uFE0F IPD",
            value: $(h),
            color: "#f59e0b"
          }, {
            label: "\u{1F691} ER",
            value: $(b),
            color: "#f43f5e"
          }, {
            label: "\u{1F4CB} \u0E2B\u0E21\u0E27\u0E14\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01",
            value: z.length,
            color: "#ec4899"
          }].map((j, M) => u.jsxs("div", {
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
          }, M))
        }), Y.length > 0 && (() => {
          const j = Y.reduce((M, T) => {
            const G = d.reduce((E0, u0) => E0 + (T[u0] || 0), 0);
            return G > M ? G : M
          }, 0);
          return u.jsxs("div", {
            className: "glass-card",
            style: {
              padding: "14px 18px"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
                flexWrap: "wrap",
                gap: 8
              },
              children: [u.jsx("div", {
                style: {
                  fontSize: 12,
                  fontWeight: 800,
                  color: "var(--md-text-primary)"
                },
                children: "\u{1F4C8} \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 Top 5 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
              }), u.jsx("div", {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12
                },
                children: d.map((M, T) => u.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 5
                  },
                  children: [u.jsx("span", {
                    style: {
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: o[T % o.length]
                    }
                  }), u.jsx("span", {
                    style: {
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--md-text-secondary)"
                    },
                    children: M
                  })]
                }, T))
              })]
            }), u.jsx("div", {
              style: {
                display: "grid",
                gridTemplateColumns: `repeat(${Y.length}, minmax(0, 1fr))`,
                gap: 6,
                alignItems: "end",
                height: 220
              },
              children: Y.map((M, T) => {
                const G = d.reduce((u0, b0) => u0 + (M[b0] || 0), 0),
                  E0 = j > 0 ? G / j * 100 : 0;
                return u.jsxs("div", {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4
                  },
                  children: [u.jsx("div", {
                    style: {
                      fontSize: 9,
                      fontWeight: 800,
                      color: "var(--md-text-tertiary)",
                      fontFamily: "monospace"
                    },
                    children: $(G)
                  }), u.jsx("div", {
                    style: {
                      width: "100%",
                      height: `${E0}%`,
                      display: "flex",
                      flexDirection: "column-reverse",
                      borderRadius: "6px 6px 0 0",
                      overflow: "hidden",
                      minHeight: 4
                    },
                    children: d.map((u0, b0) => {
                      const W0 = M[u0] || 0,
                        U0 = G > 0 ? W0 / G * 100 : 0;
                      return u.jsx("div", {
                        style: {
                          height: `${U0}%`,
                          background: o[b0 % o.length],
                          minHeight: W0 > 0 ? 2 : 0
                        },
                        title: `${u0}: ${$(W0)}`
                      }, b0)
                    })
                  }), u.jsx("div", {
                    style: {
                      fontSize: 9,
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)",
                      fontFamily: "monospace"
                    },
                    children: M.ym.slice(5)
                  })]
                }, T)
              })
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
                children: ["\u0E2B\u0E21\u0E27\u0E14 / \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C", "OPD \u0E04\u0E23\u0E31\u0E49\u0E07", "OPD HN", "IPD \u0E04\u0E23\u0E31\u0E49\u0E07", "IPD HN", "ER \u0E04\u0E23\u0E31\u0E49\u0E07", "ER HN", "\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07", "% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"].map((j, M) => u.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: M === 0 ? "left" : "right",
                    fontWeight: 800,
                    color: "var(--md-text-secondary)",
                    borderBottom: "2px solid var(--md-divider)",
                    fontSize: 11
                  },
                  children: j
                }, M))
              })
            }), u.jsx("tbody", {
              children: F.flatMap((j, M) => {
                const T = i > 0 ? (j.total_visits / i * 100).toFixed(1) : "0.0",
                  G = p.filter(b0 => b0.group_name === j.group_name).sort((b0, W0) => W0.total_visits - b0.total_visits),
                  E0 = u.jsxs("tr", {
                    style: {
                      background: `${P(j.group_name)}10`,
                      borderTop: `2px solid ${P(j.group_name)}40`,
                      borderBottom: "1px solid var(--md-divider)"
                    },
                    children: [u.jsxs("td", {
                      style: {
                        padding: "10px 10px",
                        fontWeight: 900,
                        color: P(j.group_name),
                        display: "flex",
                        alignItems: "center",
                        gap: 8
                      },
                      children: [u.jsx("span", {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: 2,
                          background: P(j.group_name),
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
                      children: $(j.opd_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: $(j.opd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: 800
                      },
                      children: $(j.ipd_admissions)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: $(j.ipd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontWeight: 800
                      },
                      children: $(j.er_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        color: "var(--md-text-tertiary)"
                      },
                      children: $(j.er_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontWeight: 900,
                        fontFamily: "monospace",
                        color: "var(--md-text-primary)"
                      },
                      children: $(j.total_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "10px 10px",
                        textAlign: "right",
                        fontWeight: 800,
                        color: P(j.group_name),
                        fontFamily: "monospace"
                      },
                      children: `${T}%`
                    })]
                  }, `g${M}`),
                  u0 = G.map((b0, W0) => u.jsxs("tr", {
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
                      }), b0.pttype_name || "\u2014", u.jsx("span", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: 10,
                          color: "var(--md-text-tertiary)",
                          marginLeft: 6
                        },
                        children: `[${b0.pttype}]`
                      })]
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: $(b0.opd_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: $(b0.opd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: $(b0.ipd_admissions)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: $(b0.ipd_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: $(b0.er_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-tertiary)"
                      },
                      children: $(b0.er_hn)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "var(--md-text-secondary)"
                      },
                      children: $(b0.total_visits)
                    }), u.jsx("td", {
                      style: {
                        padding: "6px 10px",
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "var(--md-text-tertiary)"
                      },
                      children: i > 0 ? `${(b0.total_visits/i*100).toFixed(1)}%` : "\u2014"
                    })]
                  }, `g${M}r${W0}`));
                return [E0, ...u0]
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
        }), u.jsx(Du, {
          data: w,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
        })]
      })
    })(), n !== "pt" && n !== "staff-services" && n !== "fluoride" && n !== "elderly-cxr" && n !== "ncd-disease" && n !== "imaging-services" && n !== "pttype-services" && n !== "ipd-compare" && u.jsx(Du, {
      data: x0,
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