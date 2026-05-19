const vu = (n, p0 = vu, z = p0.f || (p0.f = ["assets/xlsx.min-CZi5yKex.js", "assets/vendor-react-ByYOq5k4.js"])) => n.map(y0 => z[y0]);
import {
  _ as lu,
  E as mE,
  h as Du
} from "./shared-ui-OVDEF1.js";
import {
  R as fE,
  r as Y,
  j as u
} from "./vendor-react-ByYOq5k4.js";
const yE = Object.freeze({
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
  ru = /^[A-Z]\d/i;

function bE(n, p0, z) {
  if (!n?.comparison || !n.fy1_totals || !n.fy2_totals) return null;
  const y0 = n.fy1_totals,
    B = n.fy2_totals,
    E0 = n.comparison.filter(z0 => z0.fy1?.has_data && z0.fy2?.has_data);
  if (E0.length === 0) return {
    headline: `\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E35\u0E07\u0E1A ${p0} \u0E01\u0E31\u0E1A ${z}`,
    empty: !0
  };
  const G = (z0, B0 = 0) => Number.isFinite(Number(z0)) ? Number(z0) : B0,
    j0 = (z0, B0 = 0) => z0 == null || isNaN(z0) ? "\u2014" : Number(z0).toLocaleString("th-TH", {
      minimumFractionDigits: B0,
      maximumFractionDigits: B0
    }),
    Y0 = G(y0.ipd_discharge),
    L0 = G(B.ipd_discharge),
    N0 = G(y0.ipd_deaths),
    k0 = G(B.ipd_deaths),
    n0 = G(y0.opd_deaths),
    c0 = G(B.opd_deaths),
    _0 = G(y0.total_deaths),
    s0 = G(B.total_deaths),
    G0 = G(y0.ipd_early_deaths),
    e0 = G(B.ipd_early_deaths),
    N = Y0 > 0 ? N0 / Y0 * 100 : 0,
    h0 = L0 > 0 ? k0 / L0 * 100 : 0,
    S0 = G(n.death_growth_pct),
    C0 = N0 > 0 ? G0 / N0 * 100 : 0,
    l0 = k0 > 0 ? e0 / k0 * 100 : 0;
  let X = null,
    U0 = -1 / 0;
  for (const z0 of E0) {
    const B0 = z0.fy2?.ipd_mortality_rate || 0;
    B0 > U0 && (U0 = B0, X = z0.month)
  }
  let b0, Z0;
  h0 >= 3 ? (b0 = `\u{1F534} IPD Mortality Rate ${h0.toFixed(2)}% \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 3% \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E31\u0E49\u0E07 Mortality Review Committee \u0E20\u0E32\u0E22\u0E43\u0E19 7 \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E17\u0E1A HA accreditation`, Z0 = "#f43f5e") : S0 >= 20 ? (b0 = `\u26A0 \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${S0}% \u2014 \u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 FY${z} ${s0} \u0E23\u0E32\u0E22 (FY${p0} ${_0}) \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause`, Z0 = "#f59e0b") : h0 <= 1.5 && S0 <= 0 ? (b0 = `\u2705 Mortality Rate \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35 \u2014 IPD Rate ${h0.toFixed(2)}% \xB7 ${S0>=0?"+":""}${S0}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \xB7 Quality of Care \u0E14\u0E35`, Z0 = "#10b981") : (b0 = `IPD Mortality ${h0.toFixed(2)}% (FY${p0}: ${N.toFixed(2)}%) \xB7 ${S0>=0?"+":""}${S0}% \xB7 Early Death ${l0.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 IPD`, Z0 = "#0ea5e9");
  const $0 = (z0, B0, hu) => z0 <= B0 ? "#10b981" : z0 <= hu ? "#f59e0b" : "#f43f5e",
    I0 = [{
      label: `IPD Mortality Rate (${z})`,
      value: `${h0.toFixed(2)}%`,
      sub: `FY${p0}: ${N.toFixed(2)}%`,
      color: $0(h0, 1.5, 3)
    }, {
      label: "Total Deaths",
      value: j0(s0),
      sub: `${S0>=0?"+":""}${S0}% YoY`,
      color: S0 >= 10 ? "#f43f5e" : S0 >= 0 ? "#f59e0b" : "#10b981"
    }, {
      label: "IPD Deaths",
      value: j0(k0),
      sub: `Discharged ${j0(L0)}`,
      color: "#dc2626"
    }, {
      label: "OPD Deaths",
      value: j0(c0),
      sub: "ER / \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B",
      color: "#f59e0b"
    }, {
      label: "Early Death (<48h)",
      value: j0(e0),
      sub: `${l0.toFixed(1)}% \u0E02\u0E2D\u0E07 IPD Deaths`,
      color: l0 >= 20 ? "#f43f5e" : l0 >= 10 ? "#f59e0b" : "#10b981"
    }, {
      label: "Comparable Months",
      value: `${E0.length}`,
      sub: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49",
      color: "#7c3aed"
    }],
    g0 = [];
  g0.push({
    icon: "\u{1F4CA}",
    title: "Mortality Overview",
    text: `\u0E1B\u0E35\u0E07\u0E1A ${z}: IPD \u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15 ${j0(k0)} \u0E23\u0E32\u0E22 (rate ${h0.toFixed(2)}%) \xB7 OPD \u0E40\u0E2A\u0E35\u0E22\u0E0A\u0E35\u0E27\u0E34\u0E15 ${j0(c0)} \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E27\u0E21 ${j0(s0)}. \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A ${p0}: IPD ${j0(N0)} (rate ${N.toFixed(2)}%) \xB7 OPD ${j0(n0)} \xB7 \u0E23\u0E27\u0E21 ${j0(_0)}. \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07 ${S0>=0?"+":""}${S0}%. ` + (h0 > N + .3 ? "\u26A0 Rate \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D" : h0 < N - .3 ? "\u2705 Rate \u0E25\u0E14\u0E25\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D" : "Rate \u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"),
    color: Z0
  }), g0.push({
    icon: "\u23F1\uFE0F",
    title: "Early Death Pattern (LOS < 2 \u0E27\u0E31\u0E19)",
    text: `\u0E1B\u0E35\u0E07\u0E1A ${z}: Early Death ${j0(e0)} \u0E23\u0E32\u0E22 (${l0.toFixed(1)}% \u0E02\u0E2D\u0E07 IPD Deaths) \xB7 \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A ${p0}: ${j0(G0)} \u0E23\u0E32\u0E22 (${C0.toFixed(1)}%). ` + (l0 >= 30 ? "\u{1F534} >30% \u0E40\u0E1B\u0E47\u0E19 early death \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E04\u0E27\u0E32\u0E21\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07\u0E02\u0E2D\u0E07\u0E42\u0E23\u0E04\u0E15\u0E2D\u0E19\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 \u0E2B\u0E23\u0E37\u0E2D admission criteria \u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E0A\u0E49\u0E32" : l0 >= 15 ? "\u26A0 Early death \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 triage / ER-to-admission flow" : "\u2705 Early death \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"),
    color: l0 >= 30 ? "#f43f5e" : l0 >= 15 ? "#f59e0b" : "#10b981"
  }), X && g0.push({
    icon: "\u{1F4C5}",
    title: "Monthly Mortality Pattern",
    text: `\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48 IPD Mortality \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14: ${X} (${U0.toFixed(2)}%). ` + (U0 >= 3 ? "\u0E04\u0E27\u0E23\u0E17\u0E33 Retrospective Case Review \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E14\u0E31\u0E07\u0E01\u0E25\u0E48\u0E32\u0E27 \xB7 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C case mix, staffing, equipment readiness" : "Peak \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"),
    color: U0 >= 3 ? "#f59e0b" : "#10b981"
  });
  const X0 = [];
  h0 >= 3 && X0.push(`\u{1F534} IPD Mortality Rate ${h0.toFixed(2)}% \u0E40\u0E01\u0E34\u0E19 threshold 3% \u2014 HA standard compliance risk`), S0 >= 20 && X0.push(`\u{1F534} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21 ${S0}% \u2014 \u0E15\u0E49\u0E2D\u0E07 M&M Conference \u0E20\u0E32\u0E22\u0E43\u0E19 14 \u0E27\u0E31\u0E19`), l0 >= 30 && X0.push(`\u{1F534} Early Death \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 ${l0.toFixed(1)}% \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 late admission \u0E2B\u0E23\u0E37\u0E2D severity sorting \u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27`), e0 >= G0 * 1.5 && G0 > 0 && X0.push(`\u{1F7E0} Early Death \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01 ${G0} \u2192 ${e0} \xB7 investigate ER-to-ward handoff`), c0 > n0 * 1.3 && n0 > 0 && X0.push(`\u{1F7E0} OPD/ER Deaths \u0E40\u0E1E\u0E34\u0E48\u0E21 ${Math.round((c0-n0)/n0*100)}% \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 ER triage + rapid response`), X && U0 >= 4 && X0.push(`\u{1F7E0} \u0E40\u0E14\u0E37\u0E2D\u0E19 ${X} Peak Mortality ${U0.toFixed(2)}% \u2014 outlier \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E1B\u0E47\u0E19 cluster`), X0.length === 0 && X0.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E14\u0E49\u0E32\u0E19 Mortality \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D \u2014 Quality of Care \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35");
  const i0 = [];
  return h0 >= 3 && (i0.push("\u{1F534} P0 \xB7 \u0E15\u0E31\u0E49\u0E07 Mortality Review Board (MRB) \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u2014 review 100% IPD deaths \xB7 \u0E41\u0E22\u0E01 Preventable vs Non-preventable"), i0.push("\u{1F534} P0 \xB7 Re-train CPR/ACLS + Code Blue response \u0E17\u0E38\u0E01 ward \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19")), S0 >= 10 && k0 > 0 && i0.push("\u{1F7E0} P1 \xB7 M&M Conference \u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 focus DRG/DX \u0E17\u0E35\u0E48\u0E21\u0E35 mortality \u0E2A\u0E39\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14"), l0 >= 20 && i0.push("\u{1F7E0} P1 \xB7 ER Triage Audit \xB7 Early Warning Score (NEWS2) compliance check \xB7 ICU availability in 24/7"), X && U0 >= 3 && i0.push(`\u{1F7E1} P2 \xB7 Retrospective Case Review \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${X} \xB7 deep-dive case mix + intervention timing`), k0 >= 20 && i0.push("\u{1F535} P1 \xB7 \u0E2A\u0E23\u0E49\u0E32\u0E07 Mortality Dashboard \u0E23\u0E32\u0E22 Ward / DRG \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19"), i0.push("\u{1F535} P1 \xB7 Preventable Death Reporting \u2014 \u0E41\u0E22\u0E01\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 intervention \u0E17\u0E35\u0E48\u0E14\u0E35\u0E01\u0E27\u0E48\u0E32\u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C"), c0 > 0 && i0.push("\u{1F7E1} P2 \xB7 ER Mortality Review \u2014 focus DNR/DAMA patterns \xB7 dispatch time \xB7 resuscitation quality"), g0.push({
    icon: "\u26A0\uFE0F",
    title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 / Red Flags",
    list: X0,
    color: "#f59e0b"
  }), g0.push({
    icon: "\u{1F4A1}",
    title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C (P0\u2013P2)",
    list: i0,
    color: "#10b981"
  }), {
    headline: b0,
    headlineColor: Z0,
    kpi: I0,
    sections: g0,
    footerLeft: `IPD Discharged ${j0(L0)} \xB7 ${E0.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \xB7 FY${p0} vs FY${z} \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function i(n, p0 = 0) {
  return n == null || n === "" || isNaN(n) ? "\u2014" : Number(n).toLocaleString("th-TH", {
    minimumFractionDigits: p0,
    maximumFractionDigits: p0
  })
}
async function V0(n, p0) {
  const z = await fetch(n, p0),
    y0 = z.headers.get("content-type") || "";
  if (!z.ok) {
    if (y0.includes("application/json")) {
      const B = await z.json();
      throw new Error(B.error || `HTTP ${z.status}`)
    }
    throw new Error(`HTTP ${z.status}`)
  }
  if (!y0.includes("json")) throw new Error("\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E01\u0E25\u0E31\u0E1A \u2014 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Backend (port 4001) \u0E17\u0E33\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48");
  return z.json()
}
const oE = {
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

function AE(n, p0, z, y0 = "OPD") {
  const B = oE[y0] || oE.OPD;
  if (!n?.comparison || !n.fy1_totals || !n.fy2_totals) return null;
  const E0 = n.fy1_totals,
    G = n.fy2_totals,
    j0 = n.comparable_months || 0;
  if (j0 === 0) return {
    headline: `\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E35\u0E07\u0E1A ${p0} \u0E01\u0E31\u0E1A ${z} \u2014 \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E44\u0E14\u0E49\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E04\u0E23\u0E1A\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 1 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E1B\u0E35`,
    empty: !0
  };
  const Y0 = E0.lab_orders + E0.drug_orders + E0.xray_orders,
    L0 = E0.lab_price + E0.drug_price + E0.xray_price,
    N0 = G.lab_orders + G.drug_orders + G.xray_orders,
    k0 = G.lab_price + G.drug_price + G.xray_price,
    n0 = Number(n.overall_orders_growth_pct ?? 0),
    c0 = Number(n.overall_price_growth_pct ?? 0),
    _0 = N0 - Y0,
    s0 = k0 - L0,
    G0 = c0 - n0,
    e0 = (U, O) => O > 0 ? Math.round((U - O) / O * 100) : U > 0 ? 100 : 0,
    N = {
      Lab: {
        ord: e0(G.lab_orders, E0.lab_orders),
        px: e0(G.lab_price, E0.lab_price),
        absOrd: G.lab_orders - E0.lab_orders,
        absPx: G.lab_price - E0.lab_price
      },
      Drug: {
        ord: e0(G.drug_orders, E0.drug_orders),
        px: e0(G.drug_price, E0.drug_price),
        absOrd: G.drug_orders - E0.drug_orders,
        absPx: G.drug_price - E0.drug_price
      },
      Xray: {
        ord: e0(G.xray_orders, E0.xray_orders),
        px: e0(G.xray_price, E0.xray_price),
        absOrd: G.xray_orders - E0.xray_orders,
        absPx: G.xray_price - E0.xray_price
      }
    },
    h0 = {
      Lab: {
        f1: E0.lab_orders ? E0.lab_price / E0.lab_orders : 0,
        f2: G.lab_orders ? G.lab_price / G.lab_orders : 0
      },
      Drug: {
        f1: E0.drug_orders ? E0.drug_price / E0.drug_orders : 0,
        f2: G.drug_orders ? G.drug_price / G.drug_orders : 0
      },
      Xray: {
        f1: E0.xray_orders ? E0.xray_price / E0.xray_orders : 0,
        f2: G.xray_orders ? G.xray_price / G.xray_orders : 0
      }
    },
    S0 = U => U.f1 > 0 ? Math.round((U.f2 - U.f1) / U.f1 * 100) : 0,
    C0 = {
      lab: L0 > 0 ? E0.lab_price / L0 * 100 : 0,
      drug: L0 > 0 ? E0.drug_price / L0 * 100 : 0,
      xray: L0 > 0 ? E0.xray_price / L0 * 100 : 0
    },
    l0 = {
      lab: k0 > 0 ? G.lab_price / k0 * 100 : 0,
      drug: k0 > 0 ? G.drug_price / k0 * 100 : 0,
      xray: k0 > 0 ? G.xray_price / k0 * 100 : 0
    },
    X = Math.round(l0.lab ** 2 + l0.drug ** 2 + l0.xray ** 2),
    U0 = X >= 5e3 ? {
      text: "\u0E23\u0E27\u0E21\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E2A\u0E39\u0E07",
      color: "#dc2626"
    } : X >= 3500 ? {
      text: "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07",
      color: "#f59e0b"
    } : {
      text: "\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E15\u0E31\u0E27\u0E14\u0E35",
      color: "#10b981"
    },
    b0 = N.Drug.px >= N.Lab.px && N.Drug.px >= N.Xray.px ? {
      name: "Drug (\u0E22\u0E32)",
      g: N.Drug.px
    } : N.Lab.px >= N.Xray.px ? {
      name: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
      g: N.Lab.px
    } : {
      name: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)",
      g: N.Xray.px
    },
    Z0 = N.Drug.px <= N.Lab.px && N.Drug.px <= N.Xray.px ? {
      name: "Drug (\u0E22\u0E32)",
      g: N.Drug.px
    } : N.Lab.px <= N.Xray.px ? {
      name: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
      g: N.Lab.px
    } : {
      name: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E19\u0E34\u0E08\u0E09\u0E31\u0E22)",
      g: N.Xray.px
    },
    $0 = n.comparison.filter(U => U.fy1.has_data && U.fy2.has_data),
    I0 = [];
  let g0 = null,
    X0 = null,
    i0 = -1 / 0,
    z0 = 1 / 0;
  for (const U of $0) {
    const O = U.fy1.lab_orders + U.fy1.drug_orders + U.fy1.xray_orders,
      F0 = U.fy2.lab_orders + U.fy2.drug_orders + U.fy2.xray_orders,
      O0 = U.fy1.lab_price + U.fy1.drug_price + U.fy1.xray_price,
      H0 = U.fy2.lab_price + U.fy2.drug_price + U.fy2.xray_price;
    if (O === 0) continue;
    const q0 = (F0 - O) / O * 100,
      mu = O0 > 0 ? (H0 - O0) / O0 * 100 : 0;
    I0.push({
      month: U.month,
      g: q0,
      gPx: mu,
      fy1Ord: O,
      fy2Ord: F0,
      fy1Px: O0,
      fy2Px: H0
    }), q0 > i0 && (i0 = q0, g0 = U.month), q0 < z0 && (z0 = q0, X0 = U.month)
  }
  let B0 = 0,
    hu = 0;
  if (I0.length >= 2) {
    hu = I0.reduce((O, F0) => O + F0.g, 0) / I0.length;
    const U = I0.reduce((O, F0) => O + (F0.g - hu) ** 2, 0) / I0.length;
    B0 = Math.round(Math.sqrt(U))
  }
  const ku = B0 >= 30 ? {
    text: "\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E2A\u0E39\u0E07",
    color: "#dc2626"
  } : B0 >= 15 ? {
    text: "\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07",
    color: "#f59e0b"
  } : {
    text: "\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23",
    color: "#10b981"
  };
  let K0 = null;
  if (I0.length >= 4) {
    const U = Math.floor(I0.length / 2),
      O = I0.slice(0, U),
      F0 = I0.slice(I0.length - U),
      O0 = O.reduce((eu, tu) => eu + tu.fy1Px, 0),
      H0 = O.reduce((eu, tu) => eu + tu.fy2Px, 0),
      q0 = F0.reduce((eu, tu) => eu + tu.fy1Px, 0),
      mu = F0.reduce((eu, tu) => eu + tu.fy2Px, 0),
      ju = O0 > 0 ? (H0 - O0) / O0 * 100 : 0,
      _u = q0 > 0 ? (mu - q0) / q0 * 100 : 0,
      fu = _u - ju;
    K0 = {
      h1_label: `${O[0].month}\u2013${O[O.length-1].month}`,
      h2_label: `${F0[0].month}\u2013${F0[F0.length-1].month}`,
      h1_growth: Math.round(ju),
      h2_growth: Math.round(_u),
      accel: Math.round(fu),
      direction: fu >= 3 ? "accelerating" : fu <= -3 ? "decelerating" : "stable"
    }
  }
  const ou = [];
  if (I0.length >= 3 && B0 > 0) {
    const U = Math.max(B0 * 1.5, 15);
    for (const O of I0) {
      const F0 = O.g - hu;
      Math.abs(F0) >= U && ou.push({
        month: O.month,
        growth: Math.round(O.g),
        deviation: Math.round(F0),
        direction: F0 > 0 ? "spike" : "drop"
      })
    }
  }
  const du = 12 / j0,
    Su = Math.round(L0 * du),
    t0 = Math.round(k0 * du),
    $u = t0 - Su,
    r0 = {
      Lab: {
        label: "Lab (\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)",
        icon: "\u{1F9EA}",
        color: "#2563eb",
        share: l0.lab,
        shareFY1: C0.lab,
        unit: h0.Lab,
        absPx: N.Lab.absPx,
        ordG: N.Lab.ord,
        pxG: N.Lab.px
      },
      Drug: {
        label: "Drug (\u0E22\u0E32)",
        icon: "\u{1F48A}",
        color: "#16a34a",
        share: l0.drug,
        shareFY1: C0.drug,
        unit: h0.Drug,
        absPx: N.Drug.absPx,
        ordG: N.Drug.ord,
        pxG: N.Drug.px
      },
      Xray: {
        label: "CT / X-ray (\u0E23\u0E31\u0E07\u0E2A\u0E35)",
        icon: "\u{1FA7B}",
        color: "#db2777",
        share: l0.xray,
        shareFY1: C0.xray,
        unit: h0.Xray,
        absPx: N.Xray.absPx,
        ordG: N.Xray.ord,
        pxG: N.Xray.px
      }
    },
    Wu = {};
  for (const [U, O] of Object.entries(r0)) {
    const F0 = S0(O.unit),
      O0 = O.share - O.shareFY1;
    let H0;
    O.pxG >= 5 && O.ordG >= 5 ? H0 = "\u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32" : O.pxG >= 5 && O.ordG < 2 ? H0 = "Value-driven \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19" : O.pxG < 0 && O.ordG > 0 ? H0 = "Margin Compression \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14" : O.pxG < -3 && O.ordG < 0 ? H0 = "\u0E2B\u0E14\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E21\u0E34\u0E15\u0E34" : H0 = "\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E43\u0E19\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1B\u0E01\u0E15\u0E34", Wu[U] = {
      label: O.label,
      icon: O.icon,
      color: O.color,
      share: O.share.toFixed(1),
      share_delta: O0.toFixed(1),
      ord_growth: O.ordG,
      px_growth: O.pxG,
      unit_fy2: Math.round(O.unit.f2),
      unit_growth: F0,
      abs_px: O.absPx,
      driver: H0,
      narrative: `${O.label}: \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${O.ordG>=0?"+":""}${O.ordG}% \xB7 \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 ${O.pxG>=0?"+":""}${O.pxG}% (${O.absPx>=0?"+":""}${i(Math.abs(O.absPx))} \u0E1A\u0E32\u0E17) \xB7 \u0E23\u0E32\u0E04\u0E32/\u0E04\u0E23\u0E31\u0E49\u0E07 \u0E3F${i(Math.round(O.unit.f2))} (${F0>=0?"\u2191":"\u2193"}${Math.abs(F0)}%) \xB7 \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 ${O.share.toFixed(1)}% (${O0>=0?"+":""}${O0.toFixed(1)} \u0E08\u0E38\u0E14) \u2014 ${H0}`
    }
  }
  let su;
  const Ru = c0 - n0,
    Q = `${s0>=0?"+":"\u2212"}\u0E3F${i(Math.abs(s0))}`;
  c0 >= 10 && n0 >= 10 ? su = `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${B.short} \u0E1B\u0E35\u0E07\u0E1A ${z} \u0E02\u0E22\u0E32\u0E22\u0E15\u0E31\u0E27\u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 +${c0}% (${Q}) \u0E08\u0E32\u0E01\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${n0}% (${j0} \u0E40\u0E14\u0E37\u0E2D\u0E19) \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E17\u0E31\u0E49\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E01\u0E31\u0E19` : c0 >= 5 && Ru >= 5 ? su = `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${B.short} +${c0}% (${Q}) \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 (${n0}%) \u2014 Yield \u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Complexity / \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A Unit Price \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E22\u0E31\u0E48\u0E07\u0E22\u0E37\u0E19\u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1B\u0E47\u0E19\u0E1C\u0E25\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27` : n0 > 5 && c0 < 0 ? su = `\u26A0 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 Margin Compression \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${n0}% \u0E41\u0E15\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${c0}% (${Q}) \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14\u0E14\u0E31\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E23\u0E48\u0E07\u0E17\u0E1A\u0E17\u0E27\u0E19 ${B.pricePressure}` : c0 <= -5 && n0 <= 0 ? su = `\u26A0 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${B.short} \u0E2B\u0E14\u0E15\u0E31\u0E27\u0E17\u0E31\u0E49\u0E07\u0E2A\u0E2D\u0E07\u0E21\u0E34\u0E15\u0E34 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${n0}% \u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${c0}% (${Q}) \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause \u0E14\u0E48\u0E27\u0E19 (${B.rootCause})` : su = `\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${B.short} ${c0>=0?"\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15":"\u0E2B\u0E14\u0E15\u0E31\u0E27"} ${Math.abs(c0)}% \u0E40\u0E0A\u0E34\u0E07\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 (${Q}) \xB7 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 ${n0>=0?"+":""}${n0}% \xB7 Yield ${G0>=0?"+":""}${G0.toFixed(1)}pp \xB7 \u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 ${j0} \u0E40\u0E14\u0E37\u0E2D\u0E19`;
  const wu = Math.round(k0 / j0),
    d0 = `Run-rate \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${i(wu)} \u0E1A\u0E32\u0E17/\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E2B\u0E32\u0E01\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E44\u0E14\u0E49\u0E04\u0E23\u0E1A\u0E1B\u0E35 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${B.short} \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E44\u0E27\u0E49\u0E17\u0E35\u0E48 ${i(t0)} \u0E1A\u0E32\u0E17 (\u0E40\u0E17\u0E35\u0E22\u0E1A FY${p0} annualized: ${i(Su)} \u0E1A\u0E32\u0E17 \xB7 ${$u>=0?"\u0E1A\u0E27\u0E01":"\u0E25\u0E1A"} ${i(Math.abs($u))} \u0E1A\u0E32\u0E17)`,
    Mu = `\u0E1B\u0E35\u0E07\u0E1A ${z} \u0E21\u0E35\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E23\u0E27\u0E21 ${i(N0)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u0E1B\u0E35\u0E07\u0E1A ${p0}: ${i(Y0)} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 ${_0>=0?"+":""}${i(Math.abs(_0))} \u0E04\u0E23\u0E31\u0E49\u0E07 / ${n0>=0?"+":""}${n0}%) \u0E2A\u0E48\u0E27\u0E19\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E23\u0E27\u0E21 ${i(k0)} \u0E1A\u0E32\u0E17 (\u0E1B\u0E35\u0E07\u0E1A ${p0}: ${i(L0)} \u0E1A\u0E32\u0E17 \xB7 ${s0>=0?"+":""}${i(Math.abs(s0))} \u0E1A\u0E32\u0E17 / ${c0>=0?"+":""}${c0}%). Yield Gap = ${G0>=0?"+":""}${G0.toFixed(1)} percentage points \u2014 ` + (c0 > n0 + 2 ? "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19, \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E22\u0E32/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E21\u0E35\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19. " : c0 < n0 - 2 ? "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E15\u0E48\u0E33\u0E25\u0E07 \u0E2D\u0E32\u0E08\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 Generic Substitution, \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D Case Mix \u0E2D\u0E48\u0E2D\u0E19\u0E25\u0E07. " : "Yield \u0E15\u0E48\u0E2D\u0E04\u0E33\u0E2A\u0E31\u0E48\u0E07\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32. ") + d0,
    gu = `\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E35\u0E07\u0E1A ${z}: Drug ${l0.drug.toFixed(1)}% \xB7 Lab ${l0.lab.toFixed(1)}% \xB7 CT/X-ray ${l0.xray.toFixed(1)}% (\u0E1B\u0E35\u0E07\u0E1A ${p0}: ${C0.drug.toFixed(1)}% / ${C0.lab.toFixed(1)}% / ${C0.xray.toFixed(1)}%). Growth Driver \u0E2B\u0E25\u0E31\u0E01\u0E04\u0E37\u0E2D ${b0.name} (+${b0.g}%) \xB7 \u0E2B\u0E21\u0E27\u0E14\u0E2D\u0E48\u0E2D\u0E19\u0E41\u0E23\u0E07\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14\u0E04\u0E37\u0E2D ${Z0.name} (${Z0.g>=0?"+":""}${Z0.g}%). HHI = ${i(X)} (${U0.text}) \u2014 ` + (Math.abs(l0.drug - C0.drug) >= 3 ? `\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 Drug ${l0.drug>C0.drug?"\u0E02\u0E22\u0E31\u0E1A\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(l0.drug-C0.drug).toFixed(1)} \u0E08\u0E38\u0E14 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E1E\u0E24\u0E15\u0E34\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E44\u0E1B\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D` : "Portfolio \u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E40\u0E0A\u0E34\u0E07\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D"),
    Iu = y0 === "IPD" ? "\u0E0A\u0E48\u0E27\u0E22\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07 Ward / DRG \u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Cost per Admission" : "\u0E0A\u0E48\u0E27\u0E22\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Cost Control",
    xu = `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07 \u0E1B\u0E35\u0E07\u0E1A ${z}: Lab \u0E3F${i(Math.round(h0.Lab.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(h0.Lab)>=0?"\u2191":"\u2193"}${Math.abs(S0(h0.Lab))}% \xB7 FY${p0}: \u0E3F${i(Math.round(h0.Lab.f1))}) \xB7 Drug \u0E3F${i(Math.round(h0.Drug.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(h0.Drug)>=0?"\u2191":"\u2193"}${Math.abs(S0(h0.Drug))}% \xB7 FY${p0}: \u0E3F${i(Math.round(h0.Drug.f1))}) \xB7 CT/X-ray \u0E3F${i(Math.round(h0.Xray.f2))}/\u0E04\u0E23\u0E31\u0E49\u0E07 (${S0(h0.Xray)>=0?"\u2191":"\u2193"}${Math.abs(S0(h0.Xray))}% \xB7 FY${p0}: \u0E3F${i(Math.round(h0.Xray.f1))}) \u2014 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E19\u0E35\u0E49\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19 Case Complexity \u0E41\u0E25\u0E30\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E08\u0E23\u0E34\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${Iu}. ` + (h0.Drug.f2 > h0.Drug.f1 * 1.1 ? "Drug Unit Price \u0E1E\u0E38\u0E48\u0E07\u0E40\u0E01\u0E34\u0E19 10% \u2014 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A High-cost Drug List. " : "") + (h0.Xray.f2 > h0.Xray.f1 * 1.1 ? "Imaging Unit Price \u0E1E\u0E38\u0E48\u0E07\u0E40\u0E01\u0E34\u0E19 10% \u2014 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49 CT/MRI \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19. " : "");
  let Fu;
  if (g0 && X0) {
    const U = Math.round(i0 - z0);
    Fu = `\u0E40\u0E14\u0E37\u0E2D\u0E19 Peak: ${g0} (${i0>=0?"+":""}${Math.round(i0)}%) \xB7 \u0E40\u0E14\u0E37\u0E2D\u0E19 Dip: ${X0} (${z0>=0?"+":""}${Math.round(z0)}%) \xB7 Spread = ${U} percentage points. ` + (U >= 40 ? "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E2A\u0E39\u0E07 \u2014 \u0E0A\u0E48\u0E2D\u0E07\u0E27\u0E48\u0E32\u0E07\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1E\u0E35\u0E04\u0E41\u0E25\u0E30\u0E14\u0E34\u0E1B\u0E21\u0E32\u0E01 \u0E15\u0E49\u0E2D\u0E07\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23 Staffing, Stock, Capacity \u0E41\u0E1A\u0E1A\u0E22\u0E37\u0E14\u0E2B\u0E22\u0E38\u0E48\u0E19" : U >= 20 ? "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \u2014 \u0E21\u0E35 Seasonality \u0E41\u0E15\u0E48\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E44\u0E14\u0E49" : "\u0E04\u0E27\u0E32\u0E21\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19\u0E15\u0E48\u0E33 \u2014 Demand \u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D")
  } else Fu = "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Seasonality";
  const x0 = [];
  if (n0 > 10 && c0 < 0 && x0.push(`\u{1F534} Margin Compression: \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 +${n0}% \u0E41\u0E15\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${c0}% (${Q}) \u2014 \u0E23\u0E32\u0E04\u0E32\u0E15\u0E48\u0E2D\u0E04\u0E23\u0E31\u0E49\u0E07\u0E16\u0E39\u0E01\u0E01\u0E14\u0E14\u0E31\u0E19 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Price List / Discount Policy / Insurance Reimbursement Rate`), c0 >= 15 && n0 <= 3 && x0.push(`\u{1F7E0} Single-source Growth: \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E42\u0E15\u0E08\u0E32\u0E01 Unit Price \u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E25\u0E31\u0E01 (+${c0}% vs +${n0}% volume) \u2014 \u0E40\u0E1B\u0E23\u0E32\u0E30\u0E1A\u0E32\u0E07\u0E15\u0E48\u0E2D\u0E01\u0E32\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E32\u0E04\u0E32\u0E22\u0E32/\u0E23\u0E35\u0E40\u0E2D\u0E40\u0E08\u0E19\u0E15\u0E4C/\u0E2D\u0E31\u0E15\u0E23\u0E32 \u0E2A\u0E1B\u0E2A\u0E0A. \u0E43\u0E19\u0E1B\u0E35\u0E16\u0E31\u0E14\u0E44\u0E1B`), (N.Drug.ord > 20 || N.Drug.px > 20) && x0.push(`\u{1F534} Drug Utilization \u0E1E\u0E38\u0E48\u0E07 (+${N.Drug.ord}% orders / +${N.Drug.px}% value \xB7 ${N.Drug.absPx>=0?"+":""}\u0E3F${i(Math.abs(N.Drug.absPx))}) \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Polypharmacy, \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07\u0E43\u0E0A\u0E49 \u0E41\u0E25\u0E30 Formulary Compliance`), N.Xray.ord > 15 && N.Xray.ord > n0 * 1.5 + 5 && x0.push(`\u{1F7E0} Imaging \u0E42\u0E15\u0E40\u0E23\u0E47\u0E27\u0E01\u0E27\u0E48\u0E32\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21 (+${N.Xray.ord}% vs ${n0}%) \u2014 \u0E23\u0E30\u0E27\u0E31\u0E07 Defensive Medicine / Over-ordering \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Guideline`), c0 < -10 && x0.push(`\u{1F534} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${B.short} \u0E2B\u0E14\u0E15\u0E31\u0E27 ${c0}% (${Q}) \u2014 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13 ${B.rootCause} \u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19\u0E14\u0E48\u0E27\u0E19`), Math.max(l0.drug, l0.lab, l0.xray) > 70) {
    const U = l0.drug >= l0.lab && l0.drug >= l0.xray ? "Drug" : l0.lab >= l0.xray ? "Lab" : "CT/X-ray";
    x0.push(`\u{1F7E0} Concentration Risk: \u0E2B\u0E21\u0E27\u0E14 ${U} \u0E04\u0E23\u0E2D\u0E07\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E19 70% (HHI=${i(X)}) \u2014 \u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E2B\u0E32\u0E01\u0E40\u0E01\u0E34\u0E14 Supply Disruption \u0E08\u0E30\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35`)
  }
  if (B0 >= 30 && x0.push(`\u{1F7E0} Volatility \u0E2A\u0E39\u0E07 (SD=${B0}%) \u2014 \u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E1C\u0E31\u0E19\u0E1C\u0E27\u0E19 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Inventory \u0E41\u0E25\u0E30 Staffing \u0E22\u0E32\u0E01 \u0E04\u0E27\u0E23\u0E43\u0E0A\u0E49 Safety Stock \u0E17\u0E35\u0E48\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19`), ou.length > 0) {
    const U = ou.slice(0, 2).map(O => `${O.month} (${O.growth>=0?"+":""}${O.growth}%)`).join(", ");
    x0.push(`\u{1F7E1} \u0E1E\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19 Outlier ${ou.length} \u0E40\u0E14\u0E37\u0E2D\u0E19: ${U}${ou.length>2?"\u2026":""} \u2014 \u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19\u0E40\u0E2B\u0E15\u0E38\u0E1C\u0E25\u0E40\u0E0A\u0E34\u0E07 Root Cause (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32\u0E2D\u0E2D\u0E01, \u0E22\u0E32\u0E02\u0E32\u0E14, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, \u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1E\u0E34\u0E40\u0E28\u0E29)`)
  }
  K0 && K0.direction === "decelerating" && x0.push(`\u{1F7E1} Momentum \u0E0A\u0E30\u0E25\u0E2D\u0E15\u0E31\u0E27 \u2014 \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07 (${K0.h2_label}) \u0E42\u0E15 ${K0.h2_growth}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 (${K0.h1_label}) ${K0.h1_growth}% \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07 ${K0.accel}pp \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E23\u0E34\u0E48\u0E21\u0E0A\u0E30\u0E25\u0E2D`), x0.length === 0 && x0.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A Red Flags \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E41\u0E25\u0E30\u0E40\u0E17\u0E35\u0E22\u0E1A Benchmark \u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01");
  const Pu = y0 === "IPD" ? "Cost-per-admission \xB7 Order-per-admission \xB7 Yield-per-DRG" : "Cost-per-visit \xB7 Order-per-visit \xB7 Yield-per-order",
    iu = y0 === "IPD" ? "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21 Ward / DRG" : "\u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04",
    Lu = y0 === "IPD" ? 65 : 55,
    M0 = [];
  c0 > 5 ? M0.push(`\u{1F535} P1 \xB7 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E41\u0E25\u0E30 Supply Chain \u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15 +${c0}% \u0E42\u0E14\u0E22\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E2B\u0E21\u0E27\u0E14 ${b0.name} \u0E0B\u0E36\u0E48\u0E07\u0E40\u0E1B\u0E47\u0E19 Growth Driver \u0E2B\u0E25\u0E31\u0E01`) : c0 < -3 && M0.push(`\u{1F534} P0 \xB7 \u0E08\u0E31\u0E14\u0E15\u0E31\u0E49\u0E07 Task Force \u0E1F\u0E37\u0E49\u0E19\u0E1F\u0E39\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${B.short} (${c0}% \xB7 ${Q}) \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C Root Cause ${iu} \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19`);
  const Bu = N.Lab.ord > 15 ? "Lab" : N.Xray.ord > 15 ? "CT/X-ray" : N.Drug.ord > 15 ? "Drug" : null;
  return Bu && M0.push(`\u{1F7E1} P2 \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 Evidence-based Ordering Protocol \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${Bu} \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E38\u0E21 Unnecessary Ordering \u0E41\u0E25\u0E30\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E15\u0E48\u0E2D${y0==="IPD"?"admission":"visit"} (\u0E04\u0E32\u0E14\u0E25\u0E14\u0E44\u0E14\u0E49 5\u201310%)`), g0 && M0.push(`\u{1F535} P1 \xB7 \u0E0A\u0E48\u0E27\u0E07 ${g0} \u0E04\u0E37\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19 Peak Demand \u2014 ${B.peakPlan} \u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 30\u201360 \u0E27\u0E31\u0E19`), B0 >= 20 && M0.push(`\u{1F7E1} P2 \xB7 Volatility \u0E2A\u0E39\u0E07 (SD=${B0}%) \u2014 \u0E1B\u0E23\u0E31\u0E1A Safety Stock \u0E41\u0E25\u0E30 Flexible Staffing Model \u0E40\u0E0A\u0E48\u0E19 On-call pool \u0E2B\u0E23\u0E37\u0E2D Agency staff`), K0 && K0.direction === "decelerating" && c0 > 0 && M0.push(`\u{1F7E1} P2 \xB7 Momentum \u0E0A\u0E30\u0E25\u0E2D (${K0.accel}pp) \u2014 \u0E17\u0E33 Quick Win \u0E43\u0E19\u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E35\u0E07\u0E1A ${y0==="IPD"?"\u0E40\u0E0A\u0E48\u0E19 Enhance Admission pathway, \u0E25\u0E14 AMA/DAMA":"\u0E40\u0E0A\u0E48\u0E19 Campaign \u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07, Chronic Care Follow-up"}`), M0.push(`\u{1F535} P1 \xB7 \u0E2A\u0E23\u0E49\u0E32\u0E07 Executive KPI Dashboard \u0E23\u0E32\u0E22 3 \u0E40\u0E14\u0E37\u0E2D\u0E19: ${Pu} ${iu}`), (N.Drug.px > 15 || l0.drug > Lu) && M0.push("\u{1F534} P0 \xB7 \u0E15\u0E31\u0E49\u0E07 Pharmacy & Therapeutics Committee \u0E17\u0E1A\u0E17\u0E27\u0E19 High-cost Drug List \u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21 Generic Substitution \u0E41\u0E25\u0E30 Therapeutic Interchange"), N.Xray.ord > 15 && M0.push(`\u{1F7E1} P2 \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32 Clinical Decision Support \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E2A\u0E31\u0E48\u0E07 CT/X-ray ${B.imagingNote} (\u0E04\u0E32\u0E14\u0E25\u0E14 Inappropriate Imaging 10\u201320%)`), X >= 5e3 && M0.push(`\u{1F7E1} P2 \xB7 HHI=${i(X)} \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E21\u0E27\u0E14\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u2014 \u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Diversification \u0E02\u0E2D\u0E07 Service Portfolio \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E0A\u0E34\u0E07 Operational`), {
    headline: su,
    kpi: {
      orders_growth_pct: n0,
      price_growth_pct: c0,
      orders_abs_diff: _0,
      price_abs_diff: s0,
      yield_delta: G0,
      volatility: B0,
      vol_level: ku,
      hhi: X,
      hhi_level: U0,
      comparable_months: j0,
      annualized_fy1: Su,
      annualized_fy2: t0,
      annualized_gap: $u,
      avg_monthly_px: wu
    },
    trend_analysis: Mu,
    momentum: K0,
    mix_insight: gu,
    unit_economics: xu,
    seasonal_insight: Fu,
    anomalies: ou,
    deep_dive: Wu,
    risks: x0,
    recommendations: M0,
    meta: {
      comparable_months: j0,
      fy1: p0,
      fy2: z
    }
  }
}

function nu({
  icon: n,
  title: p0,
  text: z,
  list: y0,
  color: B = "#7c3aed"
}) {
  return u.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderLeft: `3px solid ${B}`,
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
        children: p0
      })]
    }), z && u.jsx("p", {
      style: {
        fontSize: "13px",
        color: "var(--md-text-primary)",
        lineHeight: 1.7,
        margin: 0,
        fontWeight: 500
      },
      children: z
    }), y0 && u.jsx("ul", {
      style: {
        margin: "4px 0 0 0",
        paddingLeft: "18px"
      },
      children: y0.map((E0, G) => u.jsx("li", {
        style: {
          fontSize: "13px",
          color: "var(--md-text-primary)",
          lineHeight: 1.7,
          fontWeight: 500,
          marginBottom: "3px"
        },
        children: E0
      }, G))
    })]
  })
}

function Cu({
  label: n,
  value: p0,
  sub: z,
  color: y0 = "#7c3aed",
  accent: B
}) {
  return u.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderTop: `3px solid ${y0}`,
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
        color: B || y0,
        lineHeight: 1.1
      },
      children: p0
    }), z && u.jsx("div", {
      style: {
        fontSize: "11px",
        color: "var(--md-text-tertiary)",
        marginTop: "3px",
        fontWeight: 600
      },
      children: z
    })]
  })
}

function Xu({
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
        children: ["\u0E3F", i(n.unit_fy2), " ", u.jsxs("span", {
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

function iE({
  data: n,
  fy1: p0,
  fy2: z,
  level: y0 = "OPD"
}) {
  const B = Y.useMemo(() => AE(n, p0, z, y0), [n, p0, z, y0]);
  if (!B) return null;
  const E0 = y0 === "IPD" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01",
    G = y0 === "IPD" ? "linear-gradient(135deg, rgba(219,39,119,.08), rgba(251,146,60,.05))" : "linear-gradient(135deg, rgba(124,58,237,.08), rgba(14,165,233,.05))";
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
        background: G,
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
          children: ["AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23", E0, " (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)"]
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
      children: B.empty ? u.jsx("div", {
        style: {
          padding: "14px 16px",
          background: "rgba(251,191,36,.08)",
          borderLeft: "3px solid #f59e0b",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--md-text-primary)"
        },
        children: B.headline
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
          children: B.headline
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "8px",
            marginBottom: "14px"
          },
          children: [u.jsx(Cu, {
            label: "\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13 Orders",
            value: `${B.kpi.orders_growth_pct>=0?"+":""}${B.kpi.orders_growth_pct}%`,
            sub: `${B.kpi.orders_abs_diff>=0?"+":""}${i(Math.abs(B.kpi.orders_abs_diff))} \u0E04\u0E23\u0E31\u0E49\u0E07`,
            color: B.kpi.orders_growth_pct >= 0 ? "#16a34a" : "#dc2626"
          }), u.jsx(Cu, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Revenue",
            value: `${B.kpi.price_growth_pct>=0?"+":""}${B.kpi.price_growth_pct}%`,
            sub: `${B.kpi.price_abs_diff>=0?"+":""}\u0E3F${i(Math.abs(B.kpi.price_abs_diff))}`,
            color: B.kpi.price_growth_pct >= 0 ? "#16a34a" : "#dc2626"
          }), u.jsx(Cu, {
            label: "Yield Delta",
            value: `${B.kpi.yield_delta>=0?"+":""}${B.kpi.yield_delta.toFixed(1)}pp`,
            sub: B.kpi.yield_delta >= 2 ? "Case Mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19" : B.kpi.yield_delta <= -2 ? "Margin \u0E16\u0E39\u0E01\u0E01\u0E14" : "\u0E2A\u0E21\u0E14\u0E38\u0E25",
            color: "#7c3aed"
          }), u.jsx(Cu, {
            label: "Volatility (SD)",
            value: `${B.kpi.volatility}%`,
            sub: B.kpi.vol_level.text,
            color: B.kpi.vol_level.color,
            accent: B.kpi.vol_level.color
          }), u.jsx(Cu, {
            label: "Concentration (HHI)",
            value: i(B.kpi.hhi),
            sub: B.kpi.hhi_level.text,
            color: B.kpi.hhi_level.color,
            accent: B.kpi.hhi_level.color
          }), u.jsx(Cu, {
            label: `Run-rate ${z}`,
            value: `\u0E3F${i(B.kpi.avg_monthly_px)}/\u0E14.`,
            sub: `\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E35 \u0E3F${i(B.kpi.annualized_fy2)}`,
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
            text: B.trend_analysis,
            color: "#7c3aed"
          }), u.jsx(nu, {
            icon: "\u{1F9E9}",
            title: "Resource Mix & Growth Driver",
            text: B.mix_insight,
            color: "#0ea5e9"
          })]
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px",
            marginBottom: "10px"
          },
          children: [B.momentum ? u.jsx(nu, {
            icon: "\u{1F680}",
            title: "Momentum & Acceleration",
            text: `\u0E04\u0E23\u0E36\u0E48\u0E07\u0E41\u0E23\u0E01 (${B.momentum.h1_label}): ${B.momentum.h1_growth>=0?"+":""}${B.momentum.h1_growth}% \xB7 \u0E04\u0E23\u0E36\u0E48\u0E07\u0E2B\u0E25\u0E31\u0E07 (${B.momentum.h2_label}): ${B.momentum.h2_growth>=0?"+":""}${B.momentum.h2_growth}% \xB7 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07 ${B.momentum.accel>=0?"+":""}${B.momentum.accel}pp \u2014 ${B.momentum.direction==="accelerating"?"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E40\u0E23\u0E48\u0E07\u0E15\u0E31\u0E27 \u2014 \u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E1A\u0E27\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Q3\u2013Q4 \u0E02\u0E2D\u0E07\u0E1B\u0E35\u0E07\u0E1A":B.momentum.direction==="decelerating"?"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E01\u0E33\u0E25\u0E31\u0E07\u0E0A\u0E30\u0E25\u0E2D \u2014 \u0E04\u0E27\u0E23\u0E17\u0E33 Quick Win \u0E41\u0E25\u0E30 Mid-year Review":"\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E04\u0E07\u0E17\u0E35\u0E48 \u2014 \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E40\u0E2A\u0E16\u0E35\u0E22\u0E23 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E44\u0E14\u0E49"}`,
            color: B.momentum.direction === "accelerating" ? "#10b981" : B.momentum.direction === "decelerating" ? "#f59e0b" : "#0ea5e9"
          }) : u.jsx(nu, {
            icon: "\u{1F680}",
            title: "Momentum & Acceleration",
            text: "\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22 4 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E04\u0E33\u0E19\u0E27\u0E13 Momentum",
            color: "#94a3b8"
          }), u.jsx(nu, {
            icon: "\u{1F4A0}",
            title: "Unit Economics (\u0E1A\u0E32\u0E17/\u0E04\u0E23\u0E31\u0E49\u0E07)",
            text: B.unit_economics,
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
            children: [u.jsx(Xu, {
              item: B.deep_dive.Lab
            }), u.jsx(Xu, {
              item: B.deep_dive.Drug
            }), u.jsx(Xu, {
              item: B.deep_dive.Xray
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
            text: B.seasonal_insight,
            color: "#8b5cf6"
          }), u.jsx(nu, {
            icon: "\u{1F3AF}",
            title: "Anomaly Detection",
            text: B.anomalies.length === 0 ? "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E14\u0E37\u0E2D\u0E19 Outlier \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E17\u0E35\u0E48\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C (threshold = 1.5 \xD7 SD). \u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E15\u0E48\u0E2D\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u2014 \u0E23\u0E30\u0E1A\u0E1A Inventory/Staffing \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33" : `\u0E1E\u0E1A ${B.anomalies.length} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E1A\u0E19\u0E08\u0E32\u0E01 Trend \u0E40\u0E01\u0E34\u0E19 1.5 \xD7 SD: ${B.anomalies.map(j0=>`${j0.month} (${j0.direction==="spike"?"\u25B2":"\u25BC"}${j0.growth>=0?"+":""}${j0.growth}%)`).join(" \xB7 ")} \u2014 \u0E04\u0E27\u0E23\u0E2A\u0E2D\u0E1A\u0E2A\u0E27\u0E19 Root Cause \u0E40\u0E0A\u0E34\u0E07 Operational (\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E25\u0E32, \u0E22\u0E32\u0E02\u0E32\u0E14, \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19, Outbreak)`,
            color: B.anomalies.length === 0 ? "#10b981" : "#f59e0b"
          })]
        }), u.jsx("div", {
          style: {
            marginBottom: "10px"
          },
          children: u.jsx(nu, {
            icon: "\u{1F4C8}",
            title: "Financial Projection \u2014 Annualized Outlook",
            text: `\u0E08\u0E32\u0E01 Run-rate ${B.kpi.comparable_months} \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 Annualized FY${z}: \u0E3F${i(B.kpi.annualized_fy2)} \u0E1A\u0E32\u0E17 \xB7 Annualized FY${p0}: \u0E3F${i(B.kpi.annualized_fy1)} \u0E1A\u0E32\u0E17 \xB7 Gap = ${B.kpi.annualized_gap>=0?"+":"\u2212"}\u0E3F${i(Math.abs(B.kpi.annualized_gap))} \u0E1A\u0E32\u0E17. ${B.kpi.annualized_gap>=0?"\u0E2B\u0E32\u0E01\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E44\u0E14\u0E49\u0E04\u0E23\u0E1A\u0E1B\u0E35 \u0E08\u0E30\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19":"\u0E2B\u0E32\u0E01\u0E22\u0E31\u0E07\u0E04\u0E07\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E19\u0E35\u0E49\u0E15\u0E48\u0E2D\u0E44\u0E1B \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E15\u0E47\u0E21\u0E1B\u0E35\u0E08\u0E30\u0E2B\u0E14\u0E15\u0E31\u0E27\u0E08\u0E32\u0E01\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"} \u0E02\u0E49\u0E2D\u0E2A\u0E33\u0E04\u0E31\u0E0D: \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E41\u0E1A\u0E1A Linear Extrapolation \u2014 \u0E44\u0E21\u0E48\u0E23\u0E27\u0E21 Seasonality adjustment`,
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
            list: B.risks,
            color: "#f59e0b"
          }), u.jsx(nu, {
            icon: "\u{1F4A1}",
            title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C (\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D P0\u2013P2)",
            list: B.recommendations,
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
            children: ["\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25: ", B.meta.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49 \xB7 \u0E1B\u0E35\u0E07\u0E1A ", B.meta.fy1, " vs ", B.meta.fy2, " \xB7 12 \u0E21\u0E34\u0E15\u0E34\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"]
          }), u.jsx("span", {
            children: "\u26A0 \u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E41\u0E25\u0E30\u0E1A\u0E23\u0E34\u0E1A\u0E17\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21"
          })]
        })]
      })
    })]
  })
}

function vE() {
  const [n, p0] = Y.useState("opd-compare"), [z, y0] = Y.useState(null), [B, E0] = Y.useState(null), [G, j0] = Y.useState(null), [Y0, L0] = Y.useState(null), [N0, k0] = Y.useState(null), [n0, c0] = Y.useState(null), [_0, s0] = Y.useState(!0), [G0, e0] = Y.useState(null), N = Y.useRef(null), [h0, S0] = Y.useState(null), [C0, l0] = Y.useState(null), [X, U0] = Y.useState(null), [b0, Z0] = Y.useState(null), [$0, I0] = Y.useState(null), [g0, X0] = Y.useState(null), [i0, z0] = Y.useState(null), [B0, hu] = Y.useState(null), ku = new Date, K0 = ku.getMonth() + 1, ou = ku.getFullYear(), du = K0 >= 10 ? ou + 544 : ou + 543, Su = du - 1, [t0, $u] = Y.useState(Su), [r0, Wu] = Y.useState(du), su = `${ou}-${String(K0).padStart(2,"0")}-01`, Ru = new Date().toISOString().slice(0, 10), [Q, wu] = Y.useState(su), [d0, Mu] = Y.useState(Ru), [gu, Iu] = Y.useState(su), [xu, Fu] = Y.useState(Ru), [x0, Pu] = Y.useState(10), iu = Y.useCallback(e => e ? x0 === "all" ? e : e.slice(0, x0) : [], [x0]), Lu = Y.useMemo(() => iu(C0?.patients), [C0, iu]), M0 = Y.useMemo(() => {
    if (!g0?.patients) return null;
    const e = g0.patients,
      t = g0.total_income || 0,
      d = g0.unique_patients || new Set(e.map(l => l.hn)).size,
      k = e.length > 0 ? Math.round(t / e.length) : 0;
    let r = 0,
      h = 0;
    const a = {
        "<40": 0,
        "40-49": 0,
        "50-59": 0,
        "60-69": 0,
        "70+": 0
      },
      x = {},
      g = {},
      A = g0.diseases || ["DM", "HT", "DLP", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD", "Other"],
      $ = Object.fromEntries(A.map(l => [l, 0])),
      I = l => l ? /^E11/.test(l) ? "DM" : /^E78/.test(l) ? "DLP" : l === "I10" ? "HT" : /^I25/.test(l) ? "IHD" : /^I69/.test(l) ? "Stroke" : /^J44/.test(l) ? "COPD" : /^N181/.test(l) ? "CKD1" : /^N182/.test(l) ? "CKD2" : /^N183/.test(l) ? "CKD3" : /^N184/.test(l) ? "CKD4" : /^N18[56]/.test(l) ? "CKD5" : /^N18/.test(l) ? "CKD" : null : null;
    for (const l of e) {
      l.sex === "\u0E0A\u0E32\u0E22" ? r++ : l.sex === "\u0E2B\u0E0D\u0E34\u0E07" && h++;
      const v = Number(l.age_y) || 0;
      v < 40 ? a["<40"]++ : v < 50 ? a["40-49"]++ : v < 60 ? a["50-59"]++ : v < 70 ? a["60-69"]++ : a["70+"]++;
      const o = (l.icd_pairs || "").split("||"),
        c = new Set;
      for (const R of o) {
        if (!R) continue;
        const b = R.indexOf("::"),
          j = (b >= 0 ? R.slice(0, b) : R).toUpperCase(),
          K = b >= 0 ? R.slice(b + 2) : "";
        if (!j || !ru.test(j)) continue;
        x[j] || (x[j] = {
          code: j,
          name: K,
          count: 0,
          totalInc: 0
        }), x[j].count++, x[j].totalInc += l.income || 0;
        const _ = I(j);
        _ && c.add(_)
      }
      l.ckd_stage && /^CKD/.test(l.ckd_stage) && (["CKD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5"].forEach(R => c.delete(R)), c.add(l.ckd_stage)), c.size === 0 && c.add("Other"), c.forEach(R => {
        R in $ && $[R]++
      });
      const m = l.pttype_name || "-";
      g[m] || (g[m] = {
        count: 0,
        income: 0
      }), g[m].count++, g[m].income += l.income || 0
    }
    const S = Math.max(...Object.values(a), 1),
      w = Object.values(x).sort((l, v) => v.count - l.count),
      W = Object.entries(g).sort((l, v) => v[1].count - l[1].count);
    let f = 0,
      C = 0,
      V = 0,
      p = 0;
    for (const l of e) l.ckd_stage && f++, l.ckd_stage && l.egfr != null && (C++, V += l.egfr), (l.ckd_stage === "CKD4" || l.ckd_stage === "CKD5") && p++;
    return {
      pts: e,
      totalIncome: t,
      uniquePatients: d,
      avgIncome: k,
      maleCount: r,
      femaleCount: h,
      ageGroups: a,
      ageMax: S,
      icdMap: x,
      topIcd: w,
      rightList: W,
      ckdCount: f,
      ckdWithEgfrCount: C,
      avgEgfr: C > 0 ? Math.round(V / C) : null,
      advancedCkd: p,
      diseaseCountsFE: $
    }
  }, [g0]), Bu = Y.useCallback(async () => {
    s0(!0), e0(null);
    try {
      const e = new URLSearchParams({
          start: gu,
          end: xu,
          _t: Date.now()
        }),
        t = await V0(`/api/report/ipd-compare?${e}`, {
          credentials: "include"
        });
      y0(t)
    } catch (e) {
      e0(e.message)
    }
    s0(!1)
  }, [gu, xu]), U = Y.useCallback(async () => {
    s0(!0), e0(null);
    try {
      const e = await V0(`/api/report/opd-compare-daterange?start=${Q}&end=${d0}&_t=${Date.now()}`, {
        credentials: "include"
      });
      E0(e)
    } catch (e) {
      e0(e.message)
    }
    s0(!1)
  }, [Q, d0]);
  Y.useCallback(async () => {
    s0(!0), e0(null);
    try {
      const e = await V0(`/api/report/resource-usage?fy1=${t0}&fy2=${r0}&_t=${Date.now()}`, {
        credentials: "include"
      });
      j0(e)
    } catch (e) {
      e0(e.message)
    }
    s0(!1)
  }, [t0, r0]);
  const O = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/resource-opd-monthly?fy1=${t0}&fy2=${r0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        L0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [t0, r0]),
    F0 = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/resource-ipd-monthly?fy1=${t0}&fy2=${r0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        k0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [t0, r0]),
    O0 = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/mortality-monthly?fy1=${t0}&fy2=${r0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        c0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [t0, r0]),
    H0 = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/frax-patients?start=${Q}&end=${d0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        l0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [Q, d0]),
    q0 = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/pt-patients?start=${Q}&end=${d0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        U0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [Q, d0]),
    mu = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/staff-patients?start=${Q}&end=${d0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        U0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [Q, d0]),
    ju = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/fluoride-patients?start=${Q}&end=${d0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        Z0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [Q, d0]),
    _u = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/elderly-cxr?start=${Q}&end=${d0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        I0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [Q, d0]),
    fu = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/ncd-patients?start=${Q}&end=${d0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        X0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [Q, d0]),
    eu = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/imaging-services?start=${Q}&end=${d0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        z0(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [Q, d0]),
    tu = Y.useCallback(async () => {
      s0(!0), e0(null);
      try {
        const e = await V0(`/api/report/pttype-services?from=${Q}&to=${d0}&_t=${Date.now()}`, {
          credentials: "include"
        });
        hu(e)
      } catch (e) {
        e0(e.message)
      }
      s0(!1)
    }, [Q, d0]);
  Y.useEffect(() => {
    n === "ipd-compare" ? Bu() : n === "opd-compare" ? U() : n === "resource-opd" ? O() : n === "resource-ipd" ? F0() : n === "mortality" ? O0() : n === "frax" ? H0() : n === "pt" ? q0() : n === "fluoride" ? ju() : n === "elderly-cxr" ? _u() : n === "ncd-disease" ? fu() : n === "imaging-services" ? eu() : n === "pttype-services" ? tu() : n === "staff-services" && mu()
  }, [n, Bu, U, O, F0, O0, H0, q0, mu, ju, _u, fu, eu, tu]), Y.useEffect(() => {
    const e = setTimeout(() => {
      V0("/api/ai/report/executive-summary", {
        credentials: "include"
      }).then(S0).catch(() => {})
    }, 300);
    return () => clearTimeout(e)
  }, []);
  const Ku = Y.useMemo(() => {
      if (!z?.comparison) return "";
      const e = z.comparison.filter(d => d.fy2.has_data).map(d => d.month);
      if (e.length === 0) return "";
      const t = z.fiscal_years?.fy2?.be || r0;
      return `(${e[0]} - ${e[e.length-1]} ${t})`
    }, [z, r0]),
    aE = Y.useCallback(() => {
      const e = N.current;
      if (!e) return;
      const t = window.open("", "_blank");
      t.document.write(`
      <html><head><title>\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 ${z?.title||`${t0}-${r0}`}</title>
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
    }, [t0, r0]),
    nE = Y.useCallback(() => {
      const e = (t, d) => {
        const k = t.utils.book_new(),
          r = "Sarabun",
          h = 8,
          a = {
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
          g = {
            style: "medium",
            color: {
              rgb: "CBD5E1"
            }
          },
          A = {
            top: x,
            bottom: x,
            left: x,
            right: x
          },
          $ = {},
          I = [],
          S = [],
          w = (F, J, q, P) => {
            const Z = typeof q == "number" ? "n" : "s";
            $[t.utils.encode_cell({
              r: F,
              c: J
            })] = P ? {
              v: q,
              t: Z,
              s: P
            } : {
              v: q,
              t: Z
            }
          },
          W = (F, J, q, P) => I.push({
            s: {
              r: F,
              c: J
            },
            e: {
              r: q,
              c: P
            }
          }),
          f = {
            font: {
              name: r,
              sz: 22,
              bold: !0,
              color: {
                rgb: a.white
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: d.themeColor || a.purpleDark
              }
            },
            alignment: {
              horizontal: "center",
              vertical: "center"
            },
            border: {
              top: g,
              bottom: g,
              left: g,
              right: g
            }
          },
          C = {
            font: {
              name: r,
              sz: 11,
              color: {
                rgb: a.white
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
          V = {
            font: {
              name: r,
              sz: 9,
              color: {
                rgb: a.muted
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
                rgb: a.white
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
              bottom: g
            }
          }),
          l = {
            font: {
              name: r,
              sz: 11,
              bold: !0,
              color: {
                rgb: a.slateDark
              }
            },
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: a.slateLight
              }
            },
            alignment: {
              horizontal: "left",
              vertical: "center",
              indent: 2
            },
            border: A
          },
          v = (F, J) => ({
            font: {
              name: r,
              sz: 18,
              bold: !0,
              color: {
                rgb: F || a.text
              }
            },
            alignment: {
              horizontal: "right",
              vertical: "center",
              indent: 1
            },
            border: A,
            numFmt: J || "#,##0"
          }),
          o = {
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: a.muted
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
                rgb: a.slateSoft
              }
            }
          },
          c = {
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: a.muted
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
                rgb: a.slateSoft
              }
            }
          },
          m = F => ({
            font: {
              name: r,
              sz: 11,
              bold: !0,
              color: {
                rgb: a.white
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
          R = (F = {}) => ({
            font: {
              name: r,
              sz: 10,
              color: {
                rgb: a.text
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
        let b = 0;
        const j = (F = 12) => {
          S[b] = {
            hpx: F
          }, b++
        };
        if (w(b, 0, `${d.titleEmoji||"\u{1F4CB}"}  ${d.titleText}`, f), W(b, 0, b, h - 1), S[b] = {
            hpx: 56
          }, b++, w(b, 0, `\u{1F4C5}  \u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25:  ${d.dateRange.start}  \u2192  ${d.dateRange.end}    \xB7    \u{1F465}  ${(d.totalCount||0).toLocaleString()} \u0E23\u0E32\u0E22${d.uniqueCount?`  /  ${d.uniqueCount.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33`:""}`, C), W(b, 0, b, h - 1), S[b] = {
            hpx: 28
          }, b++, w(b, 0, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D:  ${new Date().toLocaleString("th-TH")}    \xB7    ${d.dataSource||""}`, V), W(b, 0, b, h - 1), S[b] = {
            hpx: 18
          }, b++, j(8), d.kpis && d.kpis.length) {
          w(b, 0, "\u{1F4CA}  KPI \u0E2A\u0E23\u0E38\u0E1B", p(d.themeColor || a.purpleDark)), W(b, 0, b, h - 1), S[b] = {
            hpx: 32
          }, b++;
          for (const F of d.kpis) w(b, 0, F.label, l), W(b, 0, b, 1), w(b, 2, F.value, v(F.color, F.fmt)), W(b, 2, b, 4), w(b, 5, F.unit || "", o), w(b, 6, F.note || "", c), W(b, 6, b, 7), S[b] = {
            hpx: 32
          }, b++;
          j(12)
        }
        if (d.breakdowns && d.breakdowns.length)
          for (const F of d.breakdowns) {
            if (w(b, 0, `${F.icon||"\u{1F4C8}"}  ${F.title}`, p(F.color)), W(b, 0, b, h - 1), S[b] = {
                hpx: 32
              }, b++, F.headers) {
              const q = F.headerSegs || [
                [0, 0],
                [1, 5],
                [6, 6],
                [7, 7]
              ];
              F.headers.forEach((P, Z) => {
                const [A0, f0] = q[Z] || [Z, Z];
                w(b, A0, P, m(F.color)), A0 !== f0 && W(b, A0, b, f0)
              }), S[b] = {
                hpx: 30
              }, b++
            }
            let J = 0;
            for (const q of F.rows || []) {
              const P = J % 2 === 1 ? a.stripe : void 0,
                Z = F.rowSegs || [
                  [0, 0],
                  [1, 5],
                  [6, 6],
                  [7, 7]
                ];
              q.forEach((A0, f0) => {
                const [uu, J0] = Z[f0] || [f0, f0];
                w(b, uu, A0.v, R({
                  align: A0.align || (typeof A0.v == "number" ? "right" : "left"),
                  numFmt: A0.fmt,
                  font: A0.font,
                  bg: P,
                  wrap: !!A0.wrap
                })), uu !== J0 && W(b, uu, b, J0)
              }), S[b] = {
                hpx: F.rowHeight || 24
              }, b++, J++
            }
            j(12)
          }
        if (d.insights && d.insights.length) {
          w(b, 0, "\u{1F916}  AI Insights & \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30", p(a.red)), W(b, 0, b, h - 1), S[b] = {
            hpx: 32
          }, b++, w(b, 0, "\u0E23\u0E30\u0E14\u0E31\u0E1A", m(a.red)), w(b, 1, "\u0E2B\u0E21\u0E27\u0E14", m(a.red)), W(b, 1, b, 2), w(b, 3, "\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E1A", m(a.red)), W(b, 3, b, 4), w(b, 5, "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 / Action", m(a.red)), W(b, 5, b, 7), S[b] = {
            hpx: 30
          }, b++;
          const F = {
              critical: 0,
              high: 1,
              med: 2,
              info: 3,
              good: 4,
              low: 3
            },
            J = [...d.insights].sort((P, Z) => (F[P.sev] ?? 9) - (F[Z.sev] ?? 9)),
            q = {
              critical: {
                label: "\u{1F534} CRITICAL",
                bg: a.redLight,
                fg: a.red
              },
              high: {
                label: "\u{1F7E0} HIGH",
                bg: "FED7AA",
                fg: "C2410C"
              },
              med: {
                label: "\u{1F7E1} MEDIUM",
                bg: a.amberLight,
                fg: a.amberDark
              },
              info: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: a.blue
              },
              good: {
                label: "\u{1F7E2} GOOD",
                bg: a.greenLight,
                fg: a.greenDark
              },
              low: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: a.blue
              }
            };
          for (const P of J) {
            const Z = q[P.sev] || q.info;
            w(b, 0, Z.label, {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: Z.fg
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: Z.bg
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: A
            }), w(b, 1, P.cat, {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: a.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: a.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: A
            }), W(b, 1, b, 2), w(b, 3, P.msg, {
              font: {
                name: r,
                sz: 10,
                bold: P.sev === "critical" || P.sev === "high",
                color: {
                  rgb: a.text
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
                  rgb: Z.bg
                }
              }
            }), W(b, 3, b, 4), w(b, 5, P.action, {
              font: {
                name: r,
                sz: 10,
                color: {
                  rgb: a.slateDark
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
                  rgb: a.slateSoft
                }
              }
            }), W(b, 5, b, 7);
            const A0 = Math.max(Math.ceil((P.action || "").length / 80), Math.ceil((P.msg || "").length / 40), 2);
            S[b] = {
              hpx: Math.min(120, 22 + A0 * 16)
            }, b++
          }
          j(12)
        }
        if (d.references && d.references.length) {
          w(b, 0, "\u{1F4DA}  \u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38 / \u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07", p(a.muted)), W(b, 0, b, h - 1), S[b] = {
            hpx: 30
          }, b++;
          for (const [F, J] of d.references) {
            const q = F === "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22",
              P = q ? a.greenDark : a.slateDark,
              Z = q ? a.greenDark : a.muted,
              A0 = q ? a.greenLight : a.slateSoft;
            w(b, 0, F, R({
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: P
                }
              },
              align: "left",
              bg: A0
            })), W(b, 0, b, 1), w(b, 2, J, R({
              font: {
                sz: q ? 11 : 9,
                bold: q,
                color: {
                  rgb: Z
                }
              },
              align: "left",
              wrap: !0,
              bg: A0
            })), W(b, 2, b, 7), S[b] = {
              hpx: 36
            }, b++
          }
        }
        $["!ref"] = t.utils.encode_range({
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: b - 1,
            c: h - 1
          }
        }), $["!merges"] = I, $["!cols"] = [{
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
        }], $["!rows"] = S, $["!freeze"] = {
          xSplit: 0,
          ySplit: 3
        }, t.utils.book_append_sheet(k, $, "Overview");
        const K = {};
        d.patientHeader.forEach((F, J) => {
          K[t.utils.encode_cell({
            r: 0,
            c: J
          })] = {
            v: F,
            t: "s",
            s: {
              font: {
                name: r,
                sz: 10,
                bold: !0,
                color: {
                  rgb: a.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: a.slate
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
        const _ = d.patientIncomeCols || [];
        d.patientData.forEach((F, J) => {
          const q = J % 2 === 0 ? void 0 : a.stripe;
          F.forEach((P, Z) => {
            const A0 = typeof P == "number",
              f0 = _.includes(Z);
            K[t.utils.encode_cell({
              r: J + 1,
              c: Z
            })] = {
              v: P,
              t: A0 ? "n" : "s",
              s: {
                font: {
                  name: r,
                  sz: 9,
                  bold: f0,
                  color: {
                    rgb: f0 ? a.green : a.text
                  }
                },
                alignment: {
                  horizontal: A0 ? "right" : "left",
                  vertical: "center",
                  wrapText: !1,
                  indent: A0 ? 0 : 1
                },
                border: A,
                fill: q ? {
                  patternType: "solid",
                  fgColor: {
                    rgb: q
                  }
                } : void 0,
                numFmt: f0 ? "#,##0.00" : A0 ? "#,##0" : void 0
              }
            }
          })
        }), K["!ref"] = t.utils.encode_range({
          s: {
            r: 0,
            c: 0
          },
          e: {
            r: d.patientData.length,
            c: d.patientHeader.length - 1
          }
        }), K["!cols"] = (d.patientColWidths || d.patientHeader.map(() => 14)).map(F => ({
          wch: F
        })), K["!rows"] = [{
          hpx: 30
        }], K["!freeze"] = {
          xSplit: 0,
          ySplit: 1
        }, t.utils.book_append_sheet(k, K, d.patientSheetName || "Data"), t.writeFile(k, d.filename)
      };
      if (n === "ipd-compare") {
        if (!z?.comparison) return;
        const t = (g, A) => g > 0 ? Math.round((A - g) / g * 100) + "%" : A > 0 ? "100%" : "0%",
          d = z.fiscal_years?.fy1?.label || `\u0E1B\u0E35\u0E07\u0E1A ${t0}`,
          k = z.fiscal_years?.fy2?.label || `\u0E1B\u0E35\u0E07\u0E1A ${r0}`,
          r = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `Admit (${d})`, `D/C (${d})`, "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19", "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07", "\u0E40\u0E15\u0E35\u0E22\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E08\u0E23\u0E34\u0E07", "Sum AdjRW", "CMI", `Admit (${k})`, `D/C (${k})`, "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19", "\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07", "\u0E40\u0E15\u0E35\u0E22\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E08\u0E23\u0E34\u0E07", "Sum AdjRW", "CMI", "YoY Admit %", "YoY D/C %", "YoY \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19 %", "YoY ALOS %", "YoY \u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 %", "YoY Active Bed %", "YoY AdjRW %", "YoY CMI %", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 Admit", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 D/C", "\u0E2A\u0E48\u0E27\u0E19\u0E15\u0E48\u0E32\u0E07 \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19"],
          h = z.comparison.map(g => [g.month, g.fy1.admits, g.fy1.discharges, g.fy1.total_los, g.fy1.alos, g.fy1.occupancy_rate, g.fy1.active_beds, g.fy1.sum_adjrw, g.fy1.cmi, g.fy2.admits, g.fy2.discharges, g.fy2.total_los, g.fy2.alos, g.fy2.occupancy_rate, g.fy2.active_beds, g.fy2.sum_adjrw, g.fy2.cmi, t(g.fy1.admits, g.fy2.admits), t(g.fy1.discharges, g.fy2.discharges), t(g.fy1.total_los, g.fy2.total_los), t(g.fy1.alos, g.fy2.alos), t(g.fy1.occupancy_rate, g.fy2.occupancy_rate), t(g.fy1.active_beds, g.fy2.active_beds), t(g.fy1.sum_adjrw, g.fy2.sum_adjrw), t(g.fy1.cmi, g.fy2.cmi), g.admit_diff, (g.fy2.discharges || 0) - (g.fy1.discharges || 0), g.fy2.total_los - g.fy1.total_los]),
          a = z.fy1_totals,
          x = z.fy2_totals;
        h.push(["\u0E23\u0E27\u0E21", a.admits, a.discharges, a.total_los, a.alos, a.occupancy_rate, a.active_beds, a.sum_adjrw, a.cmi, x.admits, x.discharges, x.total_los, x.alos, x.occupancy_rate, x.active_beds, x.sum_adjrw, x.cmi, t(a.admits, x.admits), t(a.discharges, x.discharges), t(a.total_los, x.total_los), t(a.alos, x.alos), t(a.occupancy_rate, x.occupancy_rate), t(a.active_beds, x.active_beds), t(a.sum_adjrw, x.sum_adjrw), t(a.cmi, x.cmi), z.overall_admit_diff, (x.discharges || 0) - (a.discharges || 0), x.total_los - a.total_los]), lu(() => import("./xlsx-BuHXVOW6.js"), []).then(g => {
          const A = [r, ...h],
            $ = g.utils.aoa_to_sheet(A);
          $["!cols"] = r.map((S, w) => {
            const W = Math.max(S.length, ...h.map(f => String(f[w] ?? "").length));
            return {
              wch: Math.min(Math.max(W + 2, 8), 30)
            }
          });
          const I = g.utils.book_new();
          g.utils.book_append_sheet(I, $, "IPD Compare"), g.writeFile(I, `BCH360_IPD_Compare_${gu}_${xu}.xlsx`)
        });
        return
      }
      if (n === "frax") {
        if (!C0?.patients) return;
        const t = C0.patients;
        t.reduce((f, C) => f + (C.income || 0), 0);
        const d = new Set(t.map(f => f.hn)).size,
          k = t.length > 0 ? t.reduce((f, C) => f + (Number(C.major_osteoporotic) || 0), 0) / t.length : 0,
          r = t.length > 0 ? t.reduce((f, C) => f + (Number(C.hip_fracture) || 0), 0) / t.length : 0,
          h = t.filter(f => Number(f.major_osteoporotic) >= 20).length,
          a = t.filter(f => Number(f.hip_fracture) >= 3).length,
          x = t.length > 0 ? Math.round(t.reduce((f, C) => f + (Number(C.age) || 0), 0) / t.length) : 0,
          g = {
            "50-59": 0,
            "60-69": 0,
            "70-79": 0,
            "80+": 0
          };
        t.forEach(f => {
          const C = Number(f.age) || 0;
          C < 60 ? g["50-59"]++ : C < 70 ? g["60-69"]++ : C < 80 ? g["70-79"]++ : g["80+"]++
        });
        const A = {};
        t.forEach(f => {
          const C = f.pttype_name || "-";
          A[C] = (A[C] || 0) + 1
        });
        const $ = Object.entries(A).sort((f, C) => C[1] - f[1]),
          I = [];
        h > 0 && I.push({
          sev: "critical",
          cat: "High Fracture Risk",
          msg: `Major Osteoporotic Risk \u226520%: ${h} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 DEXA scan \u0E41\u0E25\u0E30\u0E40\u0E23\u0E34\u0E48\u0E21\u0E22\u0E32 bisphosphonate`,
          action: "\u0E19\u0E31\u0E14\u0E17\u0E33 Bone Mineral Density (DEXA) \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 Endocrinologist \xB7 vitamin D + calcium supplement \xB7 fall prevention counseling"
        }), a > 0 && I.push({
          sev: "high",
          cat: "Hip Fracture Risk",
          msg: `Hip Fracture Risk \u22653%: ${a} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2A\u0E30\u0E42\u0E1E\u0E01\u0E2B\u0E31\u0E01 10 \u0E1B\u0E35`,
          action: "Hip protector \xB7 home safety assessment \xB7 physical therapy \xB7 strength + balance training"
        }), k >= 10 && I.push({
          sev: "med",
          cat: "Population Risk",
          msg: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 Major Risk = ${k.toFixed(1)}% \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B`,
          action: "\u0E08\u0E31\u0E14 health education \xB7 screening campaign \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A peri/postmenopausal women"
        }), I.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${x} \u0E1B\u0E35 \xB7 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E1E\u0E28\u0E2B\u0E0D\u0E34\u0E07 (FRAX guideline)`,
          action: "continue routine screening for postmenopausal women \xB7 check secondary causes of osteoporosis"
        }), I.push({
          sev: "info",
          cat: "Operational",
          msg: `\u0E23\u0E27\u0E21 ${t.length} \u0E23\u0E32\u0E22 \u0E43\u0E19 ${Math.max(1,Math.ceil((new Date(d0)-new Date(Q))/864e5)+1)} \u0E27\u0E31\u0E19`,
          action: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 DEXA slot \xB7 drug stock \xB7 F/U appointment scheduling"
        });
        const S = [{
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
            rows: Object.entries(g).map(([f, C]) => [{
              v: f,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: C,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? C / t.length : 0,
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
            rows: $.slice(0, 10).map(([f, C]) => [{
              v: f,
              align: "left",
              wrap: !0
            }, {
              v: C,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? C / t.length : 0,
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
          w = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "VN", "HN", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "\u0E40\u0E1E\u0E28", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E40\u0E27\u0E25\u0E32", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E19\u0E49\u0E33\u0E2B\u0E19\u0E31\u0E01 (kg)", "\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07 (cm)", "BMI", "Major Osteo. (%)", "Hip Fracture (%)"],
          W = t.map(f => [f.no, f.vn, f.hn, f.cid, f.fullname, f.sex, f.age, f.phone || "", f.vstdate, f.vsttime, f.pttype_name || "", f.weight || "", f.height || "", f.bmi ? Number(f.bmi) : "", f.major_osteoporotic, f.hip_fracture]);
        lu(() => import("./xlsx.min-CZi5yKex.js").then(f => f.x), vu([0, 1])).then(f => {
          e(f, {
            filename: `BCH360_FRAX_BoneDensity_${Q}_${d0}.xlsx`,
            titleEmoji: "\u{1F9B4}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19 FRAX Calculator (\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01\u0E2B\u0E31\u0E01)",
            themeColor: "A855F7",
            themeColorLight: "7C3AED",
            dateRange: {
              start: Q,
              end: d0
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
              value: h,
              unit: "\u0E23\u0E32\u0E22",
              color: h > 0 ? "DC2626" : "10B981",
              fmt: "#,##0",
              note: "\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 DEXA + \u0E40\u0E23\u0E34\u0E48\u0E21\u0E22\u0E32"
            }, {
              label: "High Hip risk (\u22653%)",
              value: a,
              unit: "\u0E23\u0E32\u0E22",
              color: a > 0 ? "DC2626" : "10B981",
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
            breakdowns: S,
            insights: I,
            references: [
              ["FRAX Risk Threshold", "Major Osteoporotic \u226520%, Hip Fracture \u22653% \u2192 \u0E40\u0E23\u0E34\u0E48\u0E21\u0E23\u0E31\u0E01\u0E29\u0E32 (Treatment Initiation)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32", "WHO FRAX\xAE Calculator (Thailand model) \xB7 \u0E43\u0E0A\u0E49\u0E43\u0E19 peri/postmenopausal women"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "FRAX",
            patientHeader: w,
            patientData: W,
            patientColWidths: [6, 12, 10, 16, 22, 6, 6, 14, 11, 9, 22, 10, 10, 8, 16, 16],
            patientIncomeCols: []
          })
        });
        return
      }
      if (n === "pt" || n === "staff-services") {
        if (!X?.patients) return;
        const t = X.patients,
          d = t.reduce((c, m) => c + (Number(m.income) || 0), 0),
          k = new Set(t.map(c => c.hn)).size,
          r = t.length > 0 ? Math.round(d / t.length) : 0,
          h = t.filter(c => c.visit_type === "OPD").length,
          a = t.filter(c => c.visit_type === "IPD").length,
          x = t.length > 0 ? Math.round(t.reduce((c, m) => c + (Number(m.age_y) || 0), 0) / t.length) : 0,
          g = {
            "<30": 0,
            "30-44": 0,
            "45-59": 0,
            "60+": 0
          };
        t.forEach(c => {
          const m = Number(c.age_y) || 0;
          m < 30 ? g["<30"]++ : m < 45 ? g["30-44"]++ : m < 60 ? g["45-59"]++ : g["60+"]++
        });
        const A = {};
        t.forEach(c => {
          const m = (c.icd10 || "").split(",").map(b => b.trim().toUpperCase()).filter(b => ru.test(b)),
            R = (c.icd10name || "").split("|").map(b => b.trim());
          m.forEach((b, j) => {
            A[b] || (A[b] = {
              code: b,
              name: R[j] || "",
              count: 0,
              totalInc: 0
            }), A[b].count++, A[b].totalInc += c.income || 0
          })
        });
        const $ = Object.values(A).sort((c, m) => m.count - c.count).slice(0, 10),
          I = {};
        t.forEach(c => {
          const m = c.pttype_name || "-";
          I[m] || (I[m] = {
            count: 0,
            income: 0
          }), I[m].count++, I[m].income += c.income || 0
        });
        const S = Object.entries(I).sort((c, m) => m[1].count - c[1].count),
          w = {};
        t.forEach(c => {
          const m = c.department || "-";
          w[m] || (w[m] = {
            count: 0,
            income: 0
          }), w[m].count++, w[m].income += c.income || 0
        });
        const W = Object.entries(w).sort((c, m) => m[1].count - c[1].count),
          f = t.filter(c => /M53|M54|M62|M79/.test(c.icd10 || "")).length,
          C = t.filter(c => /M0[5-9]|M1[5-9]/.test(c.icd10 || "")).length,
          V = t.filter(c => /I6[0-9]|G81|G82/.test(c.icd10 || "")).length,
          p = [];
        f > t.length * .3 && p.push({
          sev: "high",
          cat: "Office Syndrome",
          msg: `Office syndrome (M53/M54/M62/M79): ${f} \u0E23\u0E32\u0E22 (${Math.round(f/t.length*100)}%)`,
          action: "\u0E08\u0E31\u0E14 ergonomic education \xB7 workplace assessment \xB7 stretching program \xB7 \u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E19\u0E31\u0E48\u0E07 >2 \u0E0A\u0E21.\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E01\u0E31\u0E19"
        }), V > 0 && p.push({
          sev: "high",
          cat: "Stroke Rehab",
          msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Stroke \u0E17\u0E35\u0E48\u0E17\u0E33 PT: ${V} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 rehab intensive`,
          action: "\u0E19\u0E31\u0E14 PT 3-5 \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 OT \u0E23\u0E48\u0E27\u0E21 \xB7 evaluate ADLs \u0E17\u0E38\u0E01 2 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 home exercise program"
        }), C > 0 && p.push({
          sev: "med",
          cat: "Arthritis",
          msg: `Arthritis cases: ${C} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 joint protection`,
          action: "pain management \xB7 range of motion exercise \xB7 weight management \xB7 pharmacotherapy review"
        }), a > 0 && p.push({
          sev: "info",
          cat: "IPD/OPD Mix",
          msg: `IPD ${a} \xB7 OPD ${h} \u0E23\u0E32\u0E22`,
          action: a > h ? "high IPD rehab load \u2014 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 inpatient PT staff" : "OPD-dominant \u2014 focus on outpatient scheduling efficiency"
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
            rows: $.map(c => [{
              v: c.code,
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: "7C3AED"
                }
              }
            }, {
              v: c.name || "\u2014",
              align: "left",
              wrap: !0
            }, {
              v: c.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: c.totalInc,
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
            rows: Object.entries(g).map(([c, m]) => [{
              v: c,
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
              v: c === "60+" ? "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \xB7 \u0E40\u0E19\u0E49\u0E19 balance + fall prevention" : c === "30-44" ? "\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \xB7 office syndrome" : "",
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
            rows: S.slice(0, 10).map(([c, m]) => [{
              v: c,
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
            rows: W.map(([c, m]) => [{
              v: c,
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
          v = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "Ward", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          o = t.map(c => [c.no, c.pt_name, c.hn, c.visit_type, c.pttype_name, c.age_y, c.cid, c.vstdate, c.department, c.ward_name, c.address, c.mobile_phone_number, c.icd10, c.icd10name, c.income, c.chief_complaint]);
        lu(() => import("./xlsx.min-CZi5yKex.js").then(c => c.x), vu([0, 1])).then(c => {
          e(c, {
            filename: `BCH360_${n==="staff-services"?"StaffServices":"PhysicalTherapy"}_${Q}_${d0}.xlsx`,
            titleEmoji: "\u{1F9B5}",
            titleText: n === "staff-services" ? "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 \u0E41\u0E25\u0E30 PMC",
            themeColor: "0EA5E9",
            themeColorLight: "0284C7",
            dateRange: {
              start: Q,
              end: d0
            },
            dataSource: "HOSxP XE \xB7 \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 + PMC + \u0E28\u0E39\u0E19\u0E22\u0E4C\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07 (main_dep 034, 140, 143)",
            totalCount: t.length,
            uniqueCount: k,
            kpis: [...n === "staff-services" && X?.staff_registry_count ? [{
              label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
              value: X.staff_registry_count,
              unit: "\u0E23\u0E32\u0E22",
              color: "7C3AED",
              fmt: "#,##0",
              note: `\u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${k} \u0E23\u0E32\u0E22 (${X.staff_registry_count>0?Math.round(k/X.staff_registry_count*1e3)/10:0}%)`
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
              value: h,
              unit: `OPD (IPD: ${a})`,
              color: "A855F7",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(h/t.length*100):0}% OPD`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: x,
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
            patientHeader: v,
            patientData: o,
            patientColWidths: [6, 22, 10, 8, 22, 6, 16, 11, 16, 14, 30, 14, 14, 30, 11, 32],
            patientIncomeCols: [14]
          })
        });
        return
      }
      if (n === "fluoride") {
        if (!b0?.patients) return;
        const t = b0.patients,
          d = t.reduce((p, l) => p + (Number(l.fluoride_price) || 0), 0),
          k = t.reduce((p, l) => p + (Number(l.income) || 0), 0),
          r = new Set(t.map(p => p.hn)).size,
          h = t.length > 0 ? Math.round(k / t.length) : 0,
          a = t.length > 0 ? Math.round(t.reduce((p, l) => p + (Number(l.age_y) || 0), 0) / t.length) : 0,
          x = {
            "25-34": 0,
            "35-44": 0,
            "45-54": 0,
            "55-59": 0
          };
        t.forEach(p => {
          const l = Number(p.age_y) || 0;
          l < 35 ? x["25-34"]++ : l < 45 ? x["35-44"]++ : l < 55 ? x["45-54"]++ : x["55-59"]++
        });
        const g = {};
        t.forEach(p => {
          const l = (p.icd10 || "").split(",").map(o => o.trim().toUpperCase()).filter(o => ru.test(o)),
            v = (p.icd10name || "").split("|").map(o => o.trim());
          l.forEach((o, c) => {
            g[o] || (g[o] = {
              code: o,
              name: v[c] || "",
              count: 0,
              totalInc: 0
            }), g[o].count++, g[o].totalInc += p.income || 0
          })
        });
        const A = Object.values(g).sort((p, l) => l.count - p.count).slice(0, 10),
          $ = {};
        t.forEach(p => {
          const l = p.pttype_name || "-";
          $[l] || ($[l] = {
            count: 0,
            income: 0
          }), $[l].count++, $[l].income += p.income || 0
        });
        const I = Object.entries($).sort((p, l) => l[1].count - p[1].count),
          S = t.filter(p => /K02|K03/.test(p.icd10 || "")).length,
          w = t.filter(p => /K05|K06/.test(p.icd10 || "")).length,
          W = [];
        S > 0 && W.push({
          sev: "high",
          cat: "Caries Burden",
          msg: `Dental caries (K02-K03): ${S} \u0E23\u0E32\u0E22 (${Math.round(S/t.length*100)}%)`,
          action: "Filling treatment \xB7 oral hygiene education \xB7 sugar reduction counseling \xB7 F/U 6 \u0E40\u0E14\u0E37\u0E2D\u0E19"
        }), w > 0 && W.push({
          sev: "med",
          cat: "Periodontal Disease",
          msg: `Gum disease (K05-K06): ${w} \u0E23\u0E32\u0E22`,
          action: "Scaling + root planing \xB7 oral hygiene reinforcement \xB7 F/U \u0E17\u0E38\u0E01 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19"
        }), W.push({
          sev: "info",
          cat: "Coverage",
          msg: `\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C ${t.length} \u0E23\u0E32\u0E22 \u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${d.toLocaleString()} \u0E1A\u0E32\u0E17`,
          action: "expand outreach \xB7 school/workplace dental health programs \xB7 increase coverage rate"
        }), W.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${a} \u0E1B\u0E35 \xB7 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48 ${Object.entries(x).sort((p,l)=>l[1]-p[1])[0]?.[0]} \u0E1B\u0E35`,
          action: "targeted health promotion \u0E15\u0E32\u0E21 age group \xB7 adult dental care campaign"
        }), W.push({
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
            rows: Object.entries(x).map(([p, l]) => [{
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
            rows: I.slice(0, 10).map(([p, l]) => [{
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
          C = ["\u0E25\u0E33\u0E14\u0E31\u0E1A", "\u0E0A\u0E37\u0E48\u0E2D-\u0E2A\u0E01\u0E38\u0E25", "HN", "\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E2D\u0E32\u0E22\u0E38", "\u0E40\u0E25\u0E02\u0E1A\u0E31\u0E15\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E0A\u0E19", "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48", "\u0E41\u0E1C\u0E19\u0E01", "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48", "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23", "ICD-10", "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", "\u0E04\u0E48\u0E32\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C", "\u0E22\u0E2D\u0E14\u0E40\u0E07\u0E34\u0E19", "\u0E2D\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E33\u0E04\u0E31\u0E0D"],
          V = t.map(p => [p.no, p.pt_name, p.hn, p.pttype_name, p.age_y, p.cid, p.vstdate, p.department, p.address, p.mobile_phone_number, p.icd10, p.icd10name, p.fluoride_price, p.income, p.chief_complaint]);
        lu(() => import("./xlsx.min-CZi5yKex.js").then(p => p.x), vu([0, 1])).then(p => {
          e(p, {
            filename: `BCH360_Fluoride_25_59_${Q}_${d0}.xlsx`,
            titleEmoji: "\u{1F9B7}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (25-59 \u0E1B\u0E35)",
            themeColor: "06B6D4",
            themeColorLight: "0891B2",
            dateRange: {
              start: Q,
              end: d0
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
              value: h,
              unit: "\u0E1A\u0E32\u0E17",
              color: "2563EB",
              fmt: "#,##0.00",
              note: "avg revenue per visit"
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: a,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "\u0E2D\u0E32\u0E22\u0E38 25-59 (target group)"
            }],
            breakdowns: f,
            insights: W,
            references: [
              ["Target Age", "25-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19) \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 dental prevention"],
              ["ICD-10 Dental", "K02-K03 (caries), K05-K06 (periodontal), Z012 (dental exam)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Fluoride 25-59",
            patientHeader: C,
            patientData: V,
            patientColWidths: [6, 22, 10, 22, 6, 16, 11, 16, 30, 14, 14, 30, 12, 11, 32],
            patientIncomeCols: [12, 13]
          })
        });
        return
      }
      if (n === "elderly-cxr") {
        if (!$0?.patients) return;
        const t = $0.patients,
          d = $0.total_income || t.reduce((o, c) => o + (Number(c.income) || 0), 0),
          k = $0.total_cxr_price || t.reduce((o, c) => o + (Number(c.cxr_price) || 0), 0),
          r = new Set(t.map(o => o.hn)).size,
          h = t.length > 0 ? Math.round(d / t.length) : 0,
          a = t.filter(o => o.sex === "\u0E0A\u0E32\u0E22").length,
          x = t.filter(o => o.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
          g = t.length > 0 ? Math.round(t.reduce((o, c) => o + (Number(c.age_y) || 0), 0) / t.length) : 0,
          A = {
            "60-64": 0,
            "65-69": 0,
            "70-74": 0,
            "75-79": 0,
            "80+": 0
          };
        t.forEach(o => {
          const c = Number(o.age_y) || 0;
          c < 65 ? A["60-64"]++ : c < 70 ? A["65-69"]++ : c < 75 ? A["70-74"]++ : c < 80 ? A["75-79"]++ : A["80+"]++
        });
        const $ = {};
        t.forEach(o => {
          const c = (o.icd10 || "").split(",").map(R => R.trim().toUpperCase()).filter(R => ru.test(R)),
            m = (o.icd10name || "").split("|").map(R => R.trim());
          c.forEach((R, b) => {
            $[R] || ($[R] = {
              code: R,
              name: m[b] || "",
              count: 0,
              totalInc: 0
            }), $[R].count++, $[R].totalInc += o.income || 0
          })
        });
        const I = Object.values($).sort((o, c) => c.count - o.count).slice(0, 10),
          S = {};
        t.forEach(o => {
          const c = o.pttype_name || "-";
          S[c] || (S[c] = {
            count: 0,
            income: 0
          }), S[c].count++, S[c].income += o.income || 0
        });
        const w = Object.entries(S).sort((o, c) => c[1].count - o[1].count),
          W = t.filter(o => /A1[5-9]/.test(o.icd10 || "")).length,
          f = t.filter(o => /C3[3-4]/.test(o.icd10 || "")).length,
          C = t.filter(o => /J1[2-8]/.test(o.icd10 || "")).length,
          V = [];
        W > 0 && V.push({
          sev: "critical",
          cat: "TB Suspect",
          msg: `\u{1F9A0} TB-related ICD (A15-A19): ${W} \u0E23\u0E32\u0E22 \u2014 \u0E2A\u0E07\u0E2A\u0E31\u0E22\u0E27\u0E31\u0E13\u0E42\u0E23\u0E04`,
          action: "sputum AFB + Xpert MTB \xB7 contact tracing \xB7 isolate \u0E16\u0E49\u0E32\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19 \xB7 DOT program enrollment"
        }), f > 0 && V.push({
          sev: "critical",
          cat: "Lung Cancer",
          msg: `Lung CA (C33-C34): ${f} \u0E23\u0E32\u0E22 \u2014 \u0E21\u0E30\u0E40\u0E23\u0E47\u0E07\u0E1B\u0E2D\u0E14`,
          action: "CT chest \xB7 pulmonologist referral \xB7 oncology consultation \xB7 staging workup"
        }), C > 0 && V.push({
          sev: "high",
          cat: "Pneumonia",
          msg: `Pneumonia (J12-J18): ${C} \u0E23\u0E32\u0E22 \u2014 \u0E1B\u0E2D\u0E14\u0E1A\u0E27\u0E21`,
          action: "sputum culture \xB7 empirical antibiotic per CURB-65 \xB7 admission \u0E16\u0E49\u0E32 severe \xB7 F/U CXR 4-6 \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C"
        }), V.push({
          sev: "med",
          cat: "Screening Coverage",
          msg: `\u0E23\u0E27\u0E21 ${t.length} \u0E23\u0E32\u0E22 \xB7 \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A CXR`,
          action: "expand coverage to all elderly \xB7 annual CXR screening for high-risk groups"
        }), V.push({
          sev: "info",
          cat: "Demographic",
          msg: `\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${g} \u0E1B\u0E35 \xB7 \u0E0A\u0E32\u0E22 ${a} \u0E2B\u0E0D\u0E34\u0E07 ${x}`,
          action: "monitor age-specific yield \xB7 gender comparison \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A TB/CA detection"
        }), V.push({
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
            rows: I.map(o => [{
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
            rows: Object.entries(A).map(([o, c]) => [{
              v: o,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: c,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? c / t.length : 0,
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
            rows: w.slice(0, 10).map(([o, c]) => [{
              v: o,
              align: "left",
              wrap: !0
            }, {
              v: c.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? c.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: c.income,
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
          v = t.map(o => [o.no, o.pt_name, o.hn, o.sex, o.age_y, o.cid, o.pttype_name, o.vstdate, o.department, o.address, o.mobile_phone_number, o.cxr_name, o.cxr_price, o.icd10, o.icd10name, o.income, o.chief_complaint]);
        lu(() => import("./xlsx.min-CZi5yKex.js").then(o => o.x), vu([0, 1])).then(o => {
          e(o, {
            filename: `BCH360_Elderly_CXR_60plus_${Q}_${d0}.xlsx`,
            titleEmoji: "\u2622\uFE0F",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E17\u0E35\u0E48\u0E21\u0E35 Chest X-Ray",
            themeColor: "7C3AED",
            themeColorLight: "6D28D9",
            dateRange: {
              start: Q,
              end: d0
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
              value: a,
              unit: "\u0E23\u0E32\u0E22",
              color: "0EA5E9",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(a/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07",
              value: x,
              unit: "\u0E23\u0E32\u0E22",
              color: "EC4899",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(x/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: g,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age (\u226560)"
            }, {
              label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit",
              value: h,
              unit: "\u0E1A\u0E32\u0E17",
              color: "2563EB",
              fmt: "#,##0.00",
              note: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 visit"
            }],
            breakdowns: p,
            insights: V,
            references: [
              ["CXR ICD Codes", "14 \u0E23\u0E2B\u0E31\u0E2A (CXR AP, PA, Lordotic, Lateral, Portable, \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E)"],
              ["Target Group", "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35 \u0E15\u0E32\u0E21\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E01\u0E23\u0E30\u0E17\u0E23\u0E27\u0E07\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E2A\u0E38\u0E02 (\u2260 WHO \u226565)"],
              ["Screening Focus", "TB (A15-A19), Lung CA (C33-C34), Pneumonia (J12-J18)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Elderly CXR 60+",
            patientHeader: l,
            patientData: v,
            patientColWidths: [6, 22, 10, 6, 6, 16, 22, 11, 16, 30, 14, 22, 10, 14, 30, 11, 32],
            patientIncomeCols: [12, 15]
          })
        });
        return
      }
      if (n === "imaging-services") {
        if (!i0?.patients) return;
        const t = i0.patients,
          d = i0.services || ["XRAY", "CT", "Portable", "BMD"],
          k = i0.service_labels || {},
          r = i0.service_counts || {},
          h = i0.total_income || 0,
          a = i0.total_imaging_price || 0,
          x = i0.unique_patients || new Set(t.map(m => m.hn)).size,
          g = t.length > 0 ? Math.round(h / t.length) : 0,
          A = t.length > 0 ? Math.round(a / t.length) : 0,
          $ = t.filter(m => m.sex === "\u0E0A\u0E32\u0E22").length,
          I = t.filter(m => m.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
          S = t.length > 0 ? Math.round(t.reduce((m, R) => m + (Number(R.age_y) || 0), 0) / t.length) : 0,
          w = {
            "<20": 0,
            "20-39": 0,
            "40-59": 0,
            "60-79": 0,
            "80+": 0
          };
        t.forEach(m => {
          const R = Number(m.age_y) || 0;
          R < 20 ? w["<20"]++ : R < 40 ? w["20-39"]++ : R < 60 ? w["40-59"]++ : R < 80 ? w["60-79"]++ : w["80+"]++
        });
        const W = {};
        t.forEach(m => {
          (m.icd_pairs || "").split("||").filter(Boolean).forEach(R => {
            const [b, j] = R.split("::"), K = (b || "").toUpperCase();
            !K || !ru.test(K) || (W[K] || (W[K] = {
              code: K,
              name: j || "",
              count: 0,
              totalInc: 0
            }), W[K].count++, W[K].totalInc += m.income || 0)
          })
        });
        const f = Object.values(W).sort((m, R) => R.count - m.count).slice(0, 10),
          C = {};
        t.forEach(m => {
          const R = m.pttype_name || "-";
          C[R] || (C[R] = {
            count: 0,
            income: 0
          }), C[R].count++, C[R].income += m.income || 0
        });
        const V = Object.entries(C).sort((m, R) => R[1].count - m[1].count),
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
          msg: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 imaging \u0E23\u0E27\u0E21 ${a.toLocaleString()} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${A.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22`,
          action: "analyze cost-per-procedure trend \xB7 benchmark \u0E01\u0E31\u0E1A\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07"
        });
        const l = {
            XRAY: "3B82F6",
            CT: "7C3AED",
            Portable: "F59E0B",
            BMD: "EC4899"
          },
          v = [{
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
            rows: d.map(m => [{
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
              v: k[m] || "",
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
            rows: Object.entries(w).map(([m, R]) => [{
              v: m,
              align: "center",
              font: {
                bold: !0,
                sz: 12
              }
            }, {
              v: R,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? R / t.length : 0,
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
            rows: V.slice(0, 10).map(([m, R]) => [{
              v: m,
              align: "left",
              wrap: !0
            }, {
              v: R.count,
              align: "right",
              fmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              }
            }, {
              v: t.length > 0 ? R.count / t.length : 0,
              align: "right",
              fmt: "0.0%",
              font: {
                sz: 11
              }
            }, {
              v: R.income,
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
          c = t.map(m => [m.no, m.pt_name, m.hn, m.sex, m.age_y, m.cid, m.pttype_name, m.vstdate, m.vsttime, m.department, m.address, m.mobile_phone_number, m.service_groups, m.service_names, m.service_codes, m.imaging_price, m.icd10, m.icd10name, m.income, m.chief_complaint]);
        lu(() => import("./xlsx.min-CZi5yKex.js").then(m => m.x), vu([0, 1])).then(m => {
          e(m, {
            filename: `BCH360_Imaging_${Q}_${d0}.xlsx`,
            titleEmoji: "\u{1FA7B}",
            titleText: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 XRAY / CT / Portable / BMD",
            themeColor: "7C3AED",
            themeColorLight: "6D28D9",
            dateRange: {
              start: Q,
              end: d0
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
              value: a,
              unit: "\u0E1A\u0E32\u0E17",
              color: "10B981",
              fmt: "#,##0.00",
              note: "\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E04\u0E48\u0E32 X-Ray/CT/Portable/BMD"
            }, {
              label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Visit \u0E23\u0E27\u0E21",
              value: h,
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
              value: g,
              unit: "\u0E1A\u0E32\u0E17",
              color: "2563EB",
              fmt: "#,##0.00",
              note: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 \u0E23\u0E32\u0E22"
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E32\u0E22",
              value: $,
              unit: "\u0E23\u0E32\u0E22",
              color: "0EA5E9",
              fmt: "#,##0",
              note: `${t.length>0?Math.round($/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07",
              value: I,
              unit: "\u0E23\u0E32\u0E22",
              color: "EC4899",
              fmt: "#,##0",
              note: `${t.length>0?Math.round(I/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`
            }, {
              label: "\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22",
              value: S,
              unit: "\u0E1B\u0E35",
              color: "F59E0B",
              fmt: "#,##0",
              note: "mean age"
            }],
            breakdowns: v,
            insights: p,
            references: [
              ["\u0E01\u0E32\u0E23\u0E08\u0E33\u0E41\u0E19\u0E01", "XRAY = X-ray \u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B \xB7 CT = CT scan \xB7 Portable = X-ray \u0E40\u0E04\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E17\u0E35\u0E48 \xB7 BMD = Bone Density (DEXA)"],
              ["\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "HOSxP XE \xB7 ovst + opitemrece + nondrugitems (filter \u0E15\u0E32\u0E21\u0E0A\u0E37\u0E48\u0E2D\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23)"],
              ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
            ],
            patientSheetName: "Imaging Patients",
            patientHeader: o,
            patientData: c,
            patientColWidths: [6, 22, 10, 6, 6, 16, 22, 11, 9, 16, 30, 14, 16, 30, 18, 12, 14, 30, 11, 32],
            patientIncomeCols: [15, 18]
          })
        });
        return
      }
      if (n === "opd-compare") {
        if (!B?.comparison) return;
        const t = ($, I) => $ > 0 ? Math.round((I - $) / $ * 100) + "%" : I > 0 ? "100%" : "0%",
          d = B.fiscal_years?.fy1?.label || "\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19",
          k = B.fiscal_years?.fy2?.label || "\u0E1B\u0E35\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19",
          r = ["visits", "patients", "revenue", "drug_cost", "lab_cost", "xray_cost", "avg_income"],
          h = ["Visit", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49", "\u0E04\u0E48\u0E32\u0E22\u0E32", "\u0E04\u0E48\u0E32 Lab", "\u0E04\u0E48\u0E32 X-ray", "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit"],
          a = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", ...h.map($ => `${$} (${d})`), ...h.map($ => `${$} (${k})`), ...h.map($ => `YoY ${$} %`)],
          x = B.comparison.map($ => [$.month, ...r.map(I => $.fy1[I]), ...r.map(I => $.fy2[I]), ...r.map(I => t($.fy1[I], $.fy2[I]))]),
          g = B.fy1_totals,
          A = B.fy2_totals;
        x.push(["\u0E23\u0E27\u0E21", ...r.map($ => g[$]), ...r.map($ => A[$]), ...r.map($ => t(g[$], A[$]))]), lu(() => import("./xlsx-BuHXVOW6.js"), []).then($ => {
          const I = $.utils.aoa_to_sheet([a, ...x]);
          I["!cols"] = a.map((w, W) => ({
            wch: Math.min(Math.max(w.length + 2, 10), 25)
          }));
          const S = $.utils.book_new();
          $.utils.book_append_sheet(S, I, "OPD Compare"), $.writeFile(S, `BCH360_OPD_Compare_${Q}_${d0}.xlsx`)
        });
        return
      }
      if (n === "resource-opd" || n === "resource-ipd") {
        const t = n === "resource-opd" ? Y0 : N0;
        if (!t?.comparison) return;
        const d = n === "resource-opd" ? "OPD" : "IPD",
          k = n === "resource-opd" ? "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19",
          r = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `Lab \u0E04\u0E23\u0E31\u0E49\u0E07 (${t0})`, `Lab \u0E1A\u0E32\u0E17 (${t0})`, `Drug \u0E04\u0E23\u0E31\u0E49\u0E07 (${t0})`, `Drug \u0E1A\u0E32\u0E17 (${t0})`, `Xray \u0E04\u0E23\u0E31\u0E49\u0E07 (${t0})`, `Xray \u0E1A\u0E32\u0E17 (${t0})`, `\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07 (${t0})`, `\u0E23\u0E27\u0E21\u0E1A\u0E32\u0E17 (${t0})`, `Lab \u0E04\u0E23\u0E31\u0E49\u0E07 (${r0})`, `Lab \u0E1A\u0E32\u0E17 (${r0})`, `Drug \u0E04\u0E23\u0E31\u0E49\u0E07 (${r0})`, `Drug \u0E1A\u0E32\u0E17 (${r0})`, `Xray \u0E04\u0E23\u0E31\u0E49\u0E07 (${r0})`, `Xray \u0E1A\u0E32\u0E17 (${r0})`, `\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07 (${r0})`, `\u0E23\u0E27\u0E21\u0E1A\u0E32\u0E17 (${r0})`, "\u0E08\u0E33\u0E19\u0E27\u0E19 %", "\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 %"],
          h = (w, W) => W > 0 ? Math.round((w - W) / W * 100) : w > 0 ? 100 : 0,
          a = t.comparison.filter(w => w.fy1?.has_data || w.fy2?.has_data).map(w => {
            const W = w.fy1,
              f = w.fy2,
              C = W.lab_orders + W.drug_orders + W.xray_orders,
              V = W.lab_price + W.drug_price + W.xray_price,
              p = f.lab_orders + f.drug_orders + f.xray_orders,
              l = f.lab_price + f.drug_price + f.xray_price,
              v = W.has_data && f.has_data ? h(p, C) : "",
              o = W.has_data && f.has_data ? h(l, V) : "";
            return [w.month, W.lab_orders || "", W.lab_price || "", W.drug_orders || "", W.drug_price || "", W.xray_orders || "", W.xray_price || "", W.has_data ? C : "", W.has_data ? V : "", f.lab_orders || "", f.lab_price || "", f.drug_orders || "", f.drug_price || "", f.xray_orders || "", f.xray_price || "", f.has_data ? p : "", f.has_data ? l : "", v !== "" ? `${v}%` : "", o !== "" ? `${o}%` : ""]
          }),
          x = t.fy1_totals,
          g = t.fy2_totals,
          A = x.lab_orders + x.drug_orders + x.xray_orders,
          $ = x.lab_price + x.drug_price + x.xray_price,
          I = g.lab_orders + g.drug_orders + g.xray_orders,
          S = g.lab_price + g.drug_price + g.xray_price;
        a.push(["\u0E23\u0E27\u0E21", x.lab_orders, x.lab_price, x.drug_orders, x.drug_price, x.xray_orders, x.xray_price, A, $, g.lab_orders, g.lab_price, g.drug_orders, g.drug_price, g.xray_orders, g.xray_price, I, S, `${t.overall_orders_growth_pct}%`, `${t.overall_price_growth_pct}%`]), lu(() => import("./xlsx-BuHXVOW6.js"), []).then(w => {
          const W = [r, ...a],
            f = w.utils.aoa_to_sheet(W);
          f["!cols"] = r.map((V, p) => {
            const l = Math.max(V.length, ...a.map(v => String(v[p] ?? "").length));
            return {
              wch: Math.min(Math.max(l + 2, 8), 28)
            }
          });
          const C = w.utils.book_new();
          w.utils.book_append_sheet(C, f, `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 ${k}`), w.writeFile(C, `BCH360_Resource_${d}_Monthly_${t0}_${r0}.xlsx`)
        });
        return
      }
      if (n === "ncd-disease") {
        if (!M0) return;
        const {
          pts: t,
          totalIncome: d,
          uniquePatients: k,
          avgIncome: r,
          maleCount: h,
          femaleCount: a,
          ageGroups: x,
          topIcd: g,
          rightList: A,
          ckdCount: $,
          ckdWithEgfrCount: I,
          avgEgfr: S,
          advancedCkd: w
        } = M0, W = g0.diseases || ["DM", "HT", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD"], f = g0.disease_labels || {}, C = M0.diseaseCountsFE || g0.disease_counts || {}, V = {
          length: I
        }, p = g.slice(0, 10), l = [], v = Math.max(1, Math.ceil((new Date(d0) - new Date(Q)) / 864e5) + 1), o = t.length / v, c = Math.round(o * 250);
        if (w > 0) {
          const D = Math.round(w / Math.max($, 1) * 100);
          l.push({
            sev: "critical",
            cat: "CKD \u0E23\u0E30\u0E22\u0E30\u0E23\u0E38\u0E19\u0E41\u0E23\u0E07",
            msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD Stage 4-5 \u0E08\u0E33\u0E19\u0E27\u0E19 ${w} \u0E23\u0E32\u0E22 (${D}% \u0E02\u0E2D\u0E07 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14)`,
            action: "\u0E2A\u0E48\u0E07\u0E15\u0E48\u0E2D Nephrologist \u0E20\u0E32\u0E22\u0E43\u0E19 1 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Renal Replacement Therapy (HD/PD/KT) \xB7 \u0E09\u0E35\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19 HBV/Pneumococcal \xB7 \u0E1B\u0E23\u0E36\u0E01\u0E29\u0E32 dietitian (low protein diet)"
          })
        }
        const m = t.filter(D => D.egfr != null && D.egfr < 30).length;
        if (m > 0) {
          const D = Math.round(m / t.length * 100);
          l.push({
            sev: "critical",
            cat: "Renal Function",
            msg: `eGFR <30 ml/min/1.73m\xB2 (Severe CKD): ${m} \u0E23\u0E32\u0E22 (${D}%)`,
            action: "\u0E2B\u0E25\u0E35\u0E01\u0E40\u0E25\u0E35\u0E48\u0E22\u0E07 nephrotoxic drugs (NSAIDs, contrast, aminoglycosides) \xB7 \u0E1B\u0E23\u0E31\u0E1A dose \u0E22\u0E32\u0E15\u0E32\u0E21 eGFR \xB7 \u0E40\u0E23\u0E34\u0E48\u0E21 Renal team referral \xB7 counsel vascular access"
          })
        }
        const R = t.filter(D => /DM/.test(D.disease_groups) && /HT/.test(D.disease_groups) && /CKD/.test(D.disease_groups)).length;
        if (R > 0) {
          const D = Math.round(R / t.length * 100);
          l.push({
            sev: "high",
            cat: "Triple Comorbidity",
            msg: `DM + HT + CKD \u0E23\u0E48\u0E27\u0E21 ${R} \u0E23\u0E32\u0E22 (${D}%) \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 CV event \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14`,
            action: "First-line: ACEi/ARB + SGLT2i \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HbA1c <7%, BP <130/80, LDL <70 \xB7 \u0E15\u0E23\u0E27\u0E08 UACR \u0E17\u0E38\u0E01 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E07\u0E14 NSAIDs"
          })
        }
        const b = t.filter(D => /Stroke/.test(D.disease_groups) && /HT/.test(D.disease_groups)).length;
        b > 0 && l.push({
          sev: "high",
          cat: "Secondary Prevention",
          msg: `Stroke + HT ${b} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 recurrence stroke 7-10% \u0E15\u0E48\u0E2D\u0E1B\u0E35\u0E2B\u0E32\u0E01\u0E44\u0E21\u0E48\u0E04\u0E38\u0E21 BP`,
          action: "BP target <130/80 mmHg \xB7 Antiplatelet (ASA \u0E2B\u0E23\u0E37\u0E2D Clopidogrel) \xB7 Statin (LDL <70) \xB7 \u0E07\u0E14\u0E2A\u0E39\u0E1A\u0E1A\u0E38\u0E2B\u0E23\u0E35\u0E48 \xB7 physiotherapy/rehab"
        }), C.IHD > 0 && l.push({
          sev: "high",
          cat: "IHD Management",
          msg: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 IHD ${C.IHD} \u0E23\u0E32\u0E22 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23 secondary prevention \u0E40\u0E15\u0E47\u0E21\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A`,
          action: "ASA + Statin lifelong \xB7 \u03B2-blocker \u0E2B\u0E23\u0E37\u0E2D ACEi/ARB \xB7 cardiac rehab \xB7 annual ECG/Echo"
        });
        const j = t.filter(D => Number(D.age_y) >= 60).length,
          K = t.filter(D => {
            const u0 = (D.disease_groups || "").split(",").filter(Boolean);
            return Number(D.age_y) >= 65 && u0.length >= 3
          }).length;
        if (K > 0) {
          const D = Math.round(K / t.length * 100);
          l.push({
            sev: "med",
            cat: "Polypharmacy / Geriatric",
            msg: `\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u226565 \u0E1B\u0E35 + NCD \u22653 \u0E42\u0E23\u0E04: ${K} \u0E23\u0E32\u0E22 (${D}%) \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 drug interaction & falls`,
            action: "\u0E17\u0E33 medication review (Beers criteria) \xB7 \u0E25\u0E14 anticholinergic burden \xB7 screening fall risk + osteoporosis \xB7 \u0E15\u0E23\u0E27\u0E08 kidney function \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19"
          })
        }
        if (j > 0) {
          const D = Math.round(j / t.length * 100);
          l.push({
            sev: "info",
            cat: "Demographic",
            msg: `\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u226560 \u0E1B\u0E35: ${j} visit (${D}%) \u0E02\u0E2D\u0E07 NCD clinic`,
            action: "\u0E08\u0E31\u0E14 geriatric assessment \xB7 counseling cognitive decline screening \xB7 home visit \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E15\u0E34\u0E14\u0E1A\u0E49\u0E32\u0E19"
          })
        }
        const _ = t.filter(D => /CKD/.test(D.disease_groups || "") && D.creatinine == null).length;
        if (_ > 0) {
          const D = Math.round(_ / Math.max($, 1) * 100);
          l.push({
            sev: "med",
            cat: "Lab Monitoring Gap",
            msg: `CKD \u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35 Cr \u0E43\u0E19 365 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14: ${_} \u0E23\u0E32\u0E22 (${D}% \u0E02\u0E2D\u0E07 CKD)`,
            action: "\u0E19\u0E31\u0E14 Cr/eGFR + UACR \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19 \xB7 \u0E15\u0E31\u0E49\u0E07 auto-reminder \u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A HOSxP \xB7 staging redo"
          })
        }
        const F = t.filter(D => {
          const u0 = (D.chief_complaint || "").toLowerCase();
          return /uncontrol|severe|crisis|admit|emergen|พบแพทย์|ฉุกเฉิน/.test(u0)
        }).length;
        F > 0 && l.push({
          sev: "high",
          cat: "Disease Control",
          msg: `\u0E1E\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E04\u0E38\u0E21\u0E42\u0E23\u0E04\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E43\u0E19 CC: ${F} \u0E23\u0E32\u0E22`,
          action: "review medication adherence \xB7 titrate dose \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 intensive case management \xB7 admit \u0E2B\u0E32\u0E01\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19"
        });
        const J = t.filter(D => r > 0 && (D.income || 0) > r * 2.5).length;
        if (J > 0) {
          const D = Math.round(J / t.length * 100),
            u0 = t.filter(m0 => (m0.income || 0) > r * 2.5).reduce((m0, P0) => m0 + (P0.income || 0), 0);
          l.push({
            sev: "info",
            cat: "Cost Outlier",
            msg: `High-cost outliers (>2.5\xD7 avg): ${J} \u0E23\u0E32\u0E22 (${D}%) \u2014 \u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${u0.toLocaleString()} \u0E1A\u0E32\u0E17`,
            action: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C resource drivers (lab/drug/imaging) \xB7 case management \xB7 \u0E43\u0E0A\u0E49 generic drugs \xB7 pharmacy intervention"
          })
        }
        const q = t.filter(D => /UC|บัตรทอง/i.test(D.pttype_name || "")).length;
        if (q > 0) {
          const D = Math.round(q / t.length * 100);
          l.push({
            sev: D > 80 ? "med" : "info",
            cat: "Payer Mix",
            msg: `UC/\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07: ${D}% (${q}/${t.length}) \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${r.toLocaleString()} \u0E1A\u0E32\u0E17/visit`,
            action: D > 80 ? "Cap budget pressure \u0E2A\u0E39\u0E07 \u2014 \u0E40\u0E19\u0E49\u0E19 disease management \u0E25\u0E14 admission \xB7 negotiate \u0E01\u0E31\u0E1A \u0E2A\u0E1B\u0E2A\u0E0A. \xB7 monitor budget impact \u0E02\u0E2D\u0E07 SGLT2i/GLP-1" : "\u0E23\u0E31\u0E01\u0E29\u0E32\u0E2A\u0E21\u0E14\u0E38\u0E25 payer mix \xB7 monitor private/social-security trend"
          })
        }
        const P = {};
        t.forEach(D => {
          const u0 = (D.address || "").match(/ต\.([\u0E00-\u0E7F]+)/),
            m0 = u0 ? u0[1] : "\u0E2D\u0E37\u0E48\u0E19\u0E46";
          P[m0] = (P[m0] || 0) + 1
        });
        const Z = Object.entries(P).sort((D, u0) => u0[1] - D[1])[0];
        if (Z && Z[1] > t.length * .25) {
          const D = Math.round(Z[1] / t.length * 100);
          l.push({
            sev: "info",
            cat: "Geographic Hotspot",
            msg: `\u0E15\u0E33\u0E1A\u0E25 ${Z[0]} \u0E21\u0E35\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07: ${Z[1]} \u0E23\u0E32\u0E22 (${D}%)`,
            action: "\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 community health worker / outreach NCD clinic \xB7 screening campaign \xB7 health literacy training \u0E43\u0E19\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48"
          })
        }
        const A0 = t.filter(D => /J45|J46/.test(D.icd10 || "")).length;
        if (A0 > 0) {
          const D = (C.COPD || 0) - A0;
          l.push({
            sev: "info",
            cat: "Classification Note",
            msg: `\u0E01\u0E25\u0E38\u0E48\u0E21 "COPD" \u0E21\u0E35 Asthma (J45-46) \u0E1B\u0E19\u0E2D\u0E22\u0E39\u0E48 ${A0} \u0E23\u0E32\u0E22 \u2014 COPD \u0E41\u0E17\u0E49: ${D} \u0E23\u0E32\u0E22`,
            action: "\u0E41\u0E22\u0E01 Asthma vs COPD \u0E43\u0E19 reporting \u0E40\u0E1E\u0E37\u0E48\u0E2D accuracy \u0E02\u0E2D\u0E07 NCD program \xB7 \u0E43\u0E0A\u0E49 inhaler protocol \u0E41\u0E15\u0E01\u0E15\u0E48\u0E32\u0E07\u0E01\u0E31\u0E19"
          })
        }
        l.push({
          sev: "info",
          cat: "Operational Forecast",
          msg: `\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${o.toFixed(1)} visit/\u0E27\u0E31\u0E19 (${t.length} visit \u0E43\u0E19 ${v} \u0E27\u0E31\u0E19) \xB7 \u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E1B\u0E35 ~${c.toLocaleString()} visit`,
          action: "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 manpower \xB7 \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 drug stock \xB7 \u0E02\u0E22\u0E32\u0E22 slot \u0E0A\u0E48\u0E27\u0E07 peak (\u0E15.\u0E04.-\u0E01.\u0E1E.) \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 NCD clinic \u0E40\u0E1B\u0E34\u0E14\u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E1A\u0E48\u0E32\u0E22"
        });
        const f0 = t.filter(D => D.ckd_stage === "CKD3").length,
          uu = t.filter(D => D.ckd_stage === "CKD4").length,
          J0 = t.filter(D => D.ckd_stage === "CKD5").length;
        if (f0 + uu + J0 > 0) {
          const D = Math.round(f0 * .05),
            u0 = Math.round(uu * .07),
            m0 = (J0 + u0) * 936e3;
          l.push({
            sev: u0 > 0 ? "med" : "info",
            cat: "Projection \xB7 12 months",
            msg: `\u0E04\u0E32\u0E14\u0E01\u0E32\u0E23\u0E13\u0E4C: CKD3\u21924 ~${D} \u0E23\u0E32\u0E22 \xB7 CKD4\u2192ESRD ~${u0} \u0E23\u0E32\u0E22 \xB7 ESRD \u0E23\u0E27\u0E21 ${J0+u0} \u0E23\u0E32\u0E22 \u2192 HD cost ~${m0.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E1B\u0E35`,
            action: `\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 HD slot (~${J0+u0} \u0E23\u0E32\u0E22) \xB7 vascular access creation \u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 counseling KT/PD options \xB7 negotiate \u0E01\u0E31\u0E1A \u0E2A\u0E1B\u0E2A\u0E0A. CAPD bag stock`
          })
        }
        const Q0 = t.filter(D => {
          const u0 = D.disease_groups || "";
          return (Number(D.age_y) || 0) >= 60 && /HT/.test(u0) && (/DM/.test(u0) || /CKD/.test(u0))
        }).length;
        if (Q0 > 0) {
          const D = Math.round(Q0 / t.length * 100);
          l.push({
            sev: "high",
            cat: "CV Risk Stratification",
            msg: `High CV risk (\u0E2D\u0E32\u0E22\u0E38\u226560 + HT + DM/CKD): ${Q0} \u0E23\u0E32\u0E22 (${D}%)`,
            action: "Statin (LDL <70 mg/dL) \xB7 BP <130/80 \xB7 ASA primary prevention \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E15\u0E32\u0E21\u0E40\u0E04\u0E2A \xB7 ECG annually \xB7 counsel lifestyle"
          })
        }
        const yu = (() => {
          const D = t.length > 0 ? t.filter(m0 => m0.creatinine != null).length / t.length : 0,
            u0 = $ > 0 ? 1 - w / $ : 1;
          return Math.round(D * 50 + u0 * 50)
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
          T = t.map(D => [D.no, D.pt_name, D.hn, D.sex, D.age_y ?? "", D.cid, D.pttype_name, D.vstdate, D.vsttime, D.department, D.address, D.mobile_phone_number, D.disease_groups, D.icd10, D.icd10name, D.creatinine ?? "", D.egfr ?? "", D.ckd_stage ?? "", D.income, D.chief_complaint]);
        lu(() => import("./xlsx.min-CZi5yKex.js").then(D => D.x), vu([0, 1])).then(D => {
          const u0 = D.utils.book_new(),
            m0 = "Sarabun",
            P0 = 8,
            M = {
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
            Eu = {
              top: Tu,
              bottom: Tu,
              left: Tu,
              right: Tu
            },
            bu = {},
            Yu = [],
            w0 = [],
            L = (H, a0, v0, D0) => {
              const R0 = typeof v0 == "number" ? "n" : "s";
              bu[D.utils.encode_cell({
                r: H,
                c: a0
              })] = D0 ? {
                v: v0,
                t: R0,
                s: D0
              } : {
                v: v0,
                t: R0
              }
            },
            o0 = (H, a0, v0, D0) => Yu.push({
              s: {
                r: H,
                c: a0
              },
              e: {
                r: v0,
                c: D0
              }
            }),
            cu = (H = 12) => {
              w0[s] = {
                hpx: H
              }, s++
            },
            sE = {
              font: {
                name: m0,
                sz: 22,
                bold: !0,
                color: {
                  rgb: M.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: M.purpleDark
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
            lE = {
              font: {
                name: m0,
                sz: 11,
                color: {
                  rgb: M.white
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
            dE = {
              font: {
                name: m0,
                sz: 9,
                color: {
                  rgb: M.muted
                },
                italic: !0
              },
              alignment: {
                horizontal: "right",
                vertical: "center",
                indent: 1
              }
            },
            pu = H => ({
              font: {
                name: m0,
                sz: 14,
                bold: !0,
                color: {
                  rgb: M.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: H
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
            Gu = {
              font: {
                name: m0,
                sz: 11,
                bold: !0,
                color: {
                  rgb: M.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: M.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                indent: 2
              },
              border: Eu
            },
            Uu = (H, a0) => ({
              font: {
                name: m0,
                sz: 18,
                bold: !0,
                color: {
                  rgb: H || M.text
                }
              },
              alignment: {
                horizontal: "right",
                vertical: "center",
                indent: 1
              },
              border: Eu,
              numFmt: a0 || "#,##0"
            }),
            qu = {
              font: {
                name: m0,
                sz: 10,
                color: {
                  rgb: M.muted
                },
                bold: !0
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                indent: 1
              },
              border: Eu,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: M.slateSoft
                }
              }
            },
            Ju = {
              font: {
                name: m0,
                sz: 10,
                color: {
                  rgb: M.muted
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: Eu,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: M.slateSoft
                }
              }
            },
            W0 = H => ({
              font: {
                name: m0,
                sz: 11,
                bold: !0,
                color: {
                  rgb: M.white
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: H
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: !0
              },
              border: Eu
            }),
            T0 = (H = {}) => ({
              font: {
                name: m0,
                sz: 10,
                color: {
                  rgb: M.text
                },
                ...H.font || {}
              },
              alignment: {
                horizontal: H.align || "left",
                vertical: "center",
                wrapText: !!H.wrap,
                indent: H.align === "left" ? 1 : 0
              },
              border: Eu,
              fill: H.bg ? {
                patternType: "solid",
                fgColor: {
                  rgb: H.bg
                }
              } : void 0,
              numFmt: H.numFmt
            });
          let s = 0;
          L(s, 0, "\u{1FAC0}  \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04", sE), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 56
          }, s++, L(s, 0, `\u{1F4C5}  \u0E0A\u0E48\u0E27\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25:  ${g0.date_range.start}  \u2192  ${g0.date_range.end}    \xB7    \u{1F465}  ${t.length.toLocaleString()} visit  /  ${k.toLocaleString()} \u0E23\u0E32\u0E22`, lE), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 28
          }, s++, L(s, 0, `\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D:  ${new Date().toLocaleString("th-TH")}    \xB7    ${g0.data_source||""}`, dE), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 18
          }, s++, cu(8), L(s, 0, "\u{1F4CA}  KPI \u0E2A\u0E23\u0E38\u0E1B", pu(M.purpleDark)), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 32
          }, s++;
          const cE = [
            ["\u0E08\u0E33\u0E19\u0E27\u0E19 Visit NCD", t.length, "\u0E04\u0E23\u0E31\u0E49\u0E07", M.purpleDark, "#,##0", "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E01\u0E32\u0E23\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E23\u0E27\u0E21\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32"],
            ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33)", k, "\u0E23\u0E32\u0E22", M.purple, "#,##0", "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25 \u0E19\u0E31\u0E1A 1 HN \u0E15\u0E48\u0E2D 1 \u0E04\u0E23\u0E31\u0E49\u0E07"],
            ["\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (Visit)", d, "\u0E1A\u0E32\u0E17", M.green, "#,##0.00", "\u0E22\u0E2D\u0E14 income \u0E08\u0E32\u0E01 vn_stat \u0E23\u0E27\u0E21\u0E17\u0E38\u0E01 visit"],
            ["\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/Visit", r, "\u0E1A\u0E32\u0E17", M.blue, "#,##0.00", "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \xF7 \u0E08\u0E33\u0E19\u0E27\u0E19 Visit"],
            ["\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E0A\u0E32\u0E22", h, "\u0E23\u0E32\u0E22", "0EA5E9", "#,##0", `${t.length>0?Math.round(h/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`],
            ["\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2B\u0E0D\u0E34\u0E07", a, "\u0E23\u0E32\u0E22", "EC4899", "#,##0", `${t.length>0?Math.round(a/t.length*100):0}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`]
          ];
          for (const [H, a0, v0, D0, R0, au] of cE) L(s, 0, H, Gu), o0(s, 0, s, 1), L(s, 2, a0, Uu(D0, R0)), o0(s, 2, s, 4), L(s, 5, v0, qu), L(s, 6, au, Ju), o0(s, 6, s, 7), w0[s] = {
            hpx: 32
          }, s++;
          cu(12), L(s, 0, "\u{1FA7A}  \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04 NCD", pu(M.blue)), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 32
          }, s++, L(s, 0, "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04", W0(M.blue)), L(s, 1, "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit", W0(M.blue)), o0(s, 1, s, 2), L(s, 3, "%", W0(M.blue)), o0(s, 3, s, 4), L(s, 5, "\u0E04\u0E33\u0E2D\u0E18\u0E34\u0E1A\u0E32\u0E22 / ICD-10 Range", W0(M.blue)), o0(s, 5, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          let Qu = 0;
          for (const H of W) {
            const a0 = C[H] || 0,
              v0 = t.length > 0 ? a0 / t.length : 0,
              D0 = a0 > t.length * .3,
              R0 = Qu % 2 === 1 ? M.stripe : void 0;
            L(s, 0, H, T0({
              font: {
                bold: !0,
                sz: 12,
                color: {
                  rgb: D0 ? M.purpleDark : M.text
                }
              },
              align: "center",
              bg: R0
            })), L(s, 1, a0, T0({
              align: "right",
              numFmt: "#,##0",
              font: {
                sz: 11,
                bold: !0
              },
              bg: R0
            })), o0(s, 1, s, 2), L(s, 3, v0, T0({
              align: "right",
              numFmt: "0.0%",
              font: {
                color: {
                  rgb: D0 ? M.green : M.slate
                },
                bold: D0,
                sz: 11
              },
              bg: R0
            })), o0(s, 3, s, 4), L(s, 5, f[H] || "", T0({
              align: "left",
              bg: R0
            })), o0(s, 5, s, 7), w0[s] = {
              hpx: 24
            }, s++, Qu++
          }
          cu(12), L(s, 0, "\u{1FAD8}  \u0E2A\u0E23\u0E38\u0E1B CKD (eGFR-based \xB7 CKD-EPI 2009)", pu(M.green)), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 32
          }, s++;
          const pE = [
            ["\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14", $, "\u0E23\u0E32\u0E22", M.green, "#,##0", "\u0E23\u0E27\u0E21 Stage 1-5 + \u0E44\u0E21\u0E48\u0E23\u0E30\u0E1A\u0E38 stage"],
            ["CKD \u0E17\u0E35\u0E48\u0E21\u0E35\u0E15\u0E23\u0E27\u0E08 Cr / eGFR", V.length, "\u0E23\u0E32\u0E22", M.green, "#,##0", `${$>0?Math.round(V.length/$*100):0}% \u0E02\u0E2D\u0E07 CKD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14`],
            ["eGFR \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22", S ?? 0, "ml/min/1.73m\xB2", S != null && S < 60 ? M.amber : M.green, "#,##0", S != null && S < 60 ? "\u26A0 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34 (\u226560)" : "\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"],
            ["CKD Stage 4-5 (severe)", w, "\u0E23\u0E32\u0E22", w > 0 ? M.red : M.green, "#,##0", w > 0 ? "\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 Renal Replacement Therapy" : "\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E04\u0E2A severe"]
          ];
          for (const [H, a0, v0, D0, R0, au] of pE) L(s, 0, H, Gu), o0(s, 0, s, 1), L(s, 2, a0, Uu(D0, R0)), o0(s, 2, s, 4), L(s, 5, v0, qu), L(s, 6, au, Ju), o0(s, 6, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          cu(12), L(s, 0, "\u{1F465}  \u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E2D\u0E32\u0E22\u0E38", pu(M.amber)), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 32
          }, s++, L(s, 0, "\u0E0A\u0E48\u0E27\u0E07\u0E2D\u0E32\u0E22\u0E38", W0(M.amber)), L(s, 1, "\u0E08\u0E33\u0E19\u0E27\u0E19 Visit", W0(M.amber)), o0(s, 1, s, 3), L(s, 4, "%", W0(M.amber)), o0(s, 4, s, 5), L(s, 6, "\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38", W0(M.amber)), o0(s, 6, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          let Zu = 0;
          for (const [H, a0] of Object.entries(x)) {
            const v0 = Zu % 2 === 1 ? M.stripe : void 0,
              D0 = H === "70+" ? "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \xB7 monitor frailty" : H === "60-69" ? "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E15\u0E2D\u0E19\u0E15\u0E49\u0E19" : H === "<40" ? "NCD \u0E43\u0E19\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19" : "";
            L(s, 0, H, T0({
              align: "center",
              font: {
                bold: !0,
                sz: 12
              },
              bg: v0
            })), L(s, 1, a0, T0({
              align: "right",
              numFmt: "#,##0",
              font: {
                sz: 11,
                bold: !0
              },
              bg: v0
            })), o0(s, 1, s, 3), L(s, 4, t.length > 0 ? a0 / t.length : 0, T0({
              align: "right",
              numFmt: "0.0%",
              font: {
                sz: 11
              },
              bg: v0
            })), o0(s, 4, s, 5), L(s, 6, D0, T0({
              align: "left",
              font: {
                sz: 9,
                color: {
                  rgb: M.muted
                }
              },
              bg: v0
            })), o0(s, 6, s, 7), w0[s] = {
              hpx: 24
            }, s++, Zu++
          }
          cu(12), L(s, 0, "\u{1F3C6}  Top 10 ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22", pu(M.purple)), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 32
          }, s++, L(s, 0, "ICD-10", W0(M.purple)), L(s, 1, "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04", W0(M.purple)), o0(s, 1, s, 5), L(s, 6, "\u0E08\u0E33\u0E19\u0E27\u0E19", W0(M.purple)), L(s, 7, "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)", W0(M.purple)), w0[s] = {
            hpx: 30
          }, s++;
          let uE = 0;
          for (const H of p) {
            const a0 = uE % 2 === 1 ? M.stripe : void 0;
            L(s, 0, H.code, T0({
              align: "center",
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: M.purpleDark
                }
              },
              bg: a0
            })), L(s, 1, H.name || "\u2014", T0({
              align: "left",
              wrap: !0,
              bg: a0
            })), o0(s, 1, s, 5), L(s, 6, H.count, T0({
              align: "right",
              numFmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              },
              bg: a0
            })), L(s, 7, H.totalInc, T0({
              align: "right",
              numFmt: "#,##0.00",
              font: {
                color: {
                  rgb: M.green
                }
              },
              bg: a0
            })), w0[s] = {
              hpx: 26
            }, s++, uE++
          }
          cu(12), L(s, 0, "\u{1F4B3}  \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 (Top 10)", pu(M.slate)), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 32
          }, s++, L(s, 0, "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32", W0(M.slate)), o0(s, 0, s, 4), L(s, 5, "\u0E08\u0E33\u0E19\u0E27\u0E19", W0(M.slate)), L(s, 6, "%", W0(M.slate)), L(s, 7, "\u0E23\u0E27\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (\u0E1A\u0E32\u0E17)", W0(M.slate)), w0[s] = {
            hpx: 30
          }, s++;
          let EE = 0;
          for (const [H, a0] of A.slice(0, 10)) {
            const v0 = EE % 2 === 1 ? M.stripe : void 0;
            L(s, 0, H, T0({
              align: "left",
              wrap: !0,
              font: {
                sz: 10
              },
              bg: v0
            })), o0(s, 0, s, 4), L(s, 5, a0.count, T0({
              align: "right",
              numFmt: "#,##0",
              font: {
                bold: !0,
                sz: 11
              },
              bg: v0
            })), L(s, 6, t.length > 0 ? a0.count / t.length : 0, T0({
              align: "right",
              numFmt: "0.0%",
              font: {
                sz: 11
              },
              bg: v0
            })), L(s, 7, a0.income, T0({
              align: "right",
              numFmt: "#,##0.00",
              font: {
                color: {
                  rgb: M.green
                }
              },
              bg: v0
            })), w0[s] = {
              hpx: 26
            }, s++, EE++
          }
          cu(12), L(s, 0, "\u{1F916}  AI Insights & \u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01/\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23", pu(M.red)), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 32
          }, s++, L(s, 0, "\u0E23\u0E30\u0E14\u0E31\u0E1A", W0(M.red)), L(s, 1, "\u0E2B\u0E21\u0E27\u0E14", W0(M.red)), o0(s, 1, s, 2), L(s, 3, "\u0E2A\u0E34\u0E48\u0E07\u0E17\u0E35\u0E48\u0E1E\u0E1A", W0(M.red)), o0(s, 3, s, 4), L(s, 5, "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 / Action", W0(M.red)), o0(s, 5, s, 7), w0[s] = {
            hpx: 30
          }, s++;
          const eE = {
              critical: 0,
              high: 1,
              med: 2,
              info: 3,
              good: 4,
              low: 3
            },
            hE = [...l].sort((H, a0) => (eE[H.sev] ?? 9) - (eE[a0.sev] ?? 9)),
            tE = {
              critical: {
                label: "\u{1F534} CRITICAL",
                bg: M.redLight,
                fg: M.red
              },
              high: {
                label: "\u{1F7E0} HIGH",
                bg: "FED7AA",
                fg: "C2410C"
              },
              med: {
                label: "\u{1F7E1} MEDIUM",
                bg: M.amberLight,
                fg: M.amberDark
              },
              info: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: M.blue
              },
              good: {
                label: "\u{1F7E2} GOOD",
                bg: M.greenLight,
                fg: M.greenDark
              },
              low: {
                label: "\u{1F535} INFO",
                bg: "DBEAFE",
                fg: M.blue
              }
            };
          for (const H of hE) {
            const a0 = tE[H.sev] || tE.info;
            L(s, 0, a0.label, {
              font: {
                name: m0,
                sz: 10,
                bold: !0,
                color: {
                  rgb: a0.fg
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: a0.bg
                }
              },
              alignment: {
                horizontal: "center",
                vertical: "center"
              },
              border: Eu
            }), L(s, 1, H.cat, {
              font: {
                name: m0,
                sz: 10,
                bold: !0,
                color: {
                  rgb: M.slateDark
                }
              },
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: M.slateLight
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: Eu
            }), o0(s, 1, s, 2), L(s, 3, H.msg, {
              font: {
                name: m0,
                sz: 10,
                bold: H.sev === "critical" || H.sev === "high",
                color: {
                  rgb: M.text
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: Eu,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: a0.bg
                }
              }
            }), o0(s, 3, s, 4), L(s, 5, H.action, {
              font: {
                name: m0,
                sz: 10,
                color: {
                  rgb: M.slateDark
                }
              },
              alignment: {
                horizontal: "left",
                vertical: "center",
                wrapText: !0,
                indent: 1
              },
              border: Eu,
              fill: {
                patternType: "solid",
                fgColor: {
                  rgb: M.slateSoft
                }
              }
            }), o0(s, 5, s, 7);
            const v0 = (H.action || "").length,
              D0 = (H.msg || "").length,
              R0 = Math.max(Math.ceil(v0 / 80), Math.ceil(D0 / 40), 2);
            w0[s] = {
              hpx: Math.min(120, 22 + R0 * 16)
            }, s++
          }
          cu(12), L(s, 0, "\u{1F4DA}  \u0E2D\u0E49\u0E32\u0E07\u0E2D\u0E34\u0E07\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E25\u0E38\u0E48\u0E21", pu(M.muted)), o0(s, 0, s, P0 - 1), w0[s] = {
            hpx: 30
          }, s++;
          const gE = [
            ["CKD-EPI 2009", "eGFR \u226590 \u2192 Stage 1  \xB7  60-89 \u2192 Stage 2  \xB7  30-59 \u2192 Stage 3  \xB7  15-29 \u2192 Stage 4  \xB7  <15 \u2192 Stage 5"],
            ["ICD-10 NCD (Specific)", "DM: E11 (Type 2)  \xB7  HT: I10 (Essential)  \xB7  DLP: E78  \xB7  IHD: I25 (Chronic)  \xB7  Stroke: I69 (Sequelae)  \xB7  COPD: J44  \xB7  CKD: N18.x"],
            ["\u0E17\u0E35\u0E48\u0E21\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "HOSxP XE \xB7 ovst + ovstdiag (main_dep=024) \xB7 \u0E01\u0E23\u0E2D\u0E07\u0E14\u0E49\u0E27\u0E22 NCD ICD-10 codes \xB7 CKD stage \u0E08\u0E32\u0E01 eGFR \u0E2B\u0E23\u0E37\u0E2D N18.x suffix"],
            ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22", "IT Banchang Team >> \u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25      \u2705 APPROVED      \u{1F6E1}\uFE0F VERIFIED"]
          ];
          for (const [H, a0] of gE) {
            const v0 = H === "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E42\u0E14\u0E22",
              D0 = v0 ? M.greenDark : M.slateDark,
              R0 = v0 ? M.greenDark : M.muted,
              au = v0 ? M.greenLight : M.slateSoft;
            L(s, 0, H, T0({
              font: {
                bold: !0,
                sz: 11,
                color: {
                  rgb: D0
                }
              },
              align: "left",
              bg: au
            })), o0(s, 0, s, 1), L(s, 2, a0, T0({
              font: {
                sz: v0 ? 11 : 9,
                bold: v0,
                color: {
                  rgb: R0
                }
              },
              align: "left",
              wrap: !0,
              bg: au
            })), o0(s, 2, s, 7), w0[s] = {
              hpx: 36
            }, s++
          }
          bu["!ref"] = D.utils.encode_range({
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: s - 1,
              c: P0 - 1
            }
          }), bu["!merges"] = Yu, bu["!cols"] = [{
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
          }, D.utils.book_append_sheet(u0, bu, "Overview");
          const Au = {};
          y.forEach((H, a0) => {
            Au[D.utils.encode_cell({
              r: 0,
              c: a0
            })] = {
              v: H,
              t: "s",
              s: {
                font: {
                  name: m0,
                  sz: 10,
                  bold: !0,
                  color: {
                    rgb: M.white
                  }
                },
                fill: {
                  patternType: "solid",
                  fgColor: {
                    rgb: M.slate
                  }
                },
                alignment: {
                  horizontal: "center",
                  vertical: "center",
                  wrapText: !0
                },
                border: Eu
              }
            }
          }), T.forEach((H, a0) => {
            const v0 = a0 % 2 === 0 ? void 0 : "F8FAFC";
            H.forEach((D0, R0) => {
              const au = typeof D0 == "number",
                Nu = R0 === 17,
                rE = R0 === 18,
                xE = R0 === 16;
              let Ou = v0,
                Hu = M.text;
              Nu && D0 && (Ou = D0 === "CKD5" ? M.redLight : D0 === "CKD4" ? "FED7AA" : D0 === "CKD3" ? "FEF3C7" : M.greenLight, Hu = D0 === "CKD5" ? M.red : D0 === "CKD4" ? "C2410C" : D0 === "CKD3" ? "B45309" : "047857"), xE && typeof D0 == "number" && (Hu = D0 < 30 ? M.red : D0 < 60 ? "B45309" : "047857"), Au[D.utils.encode_cell({
                r: a0 + 1,
                c: R0
              })] = {
                v: D0,
                t: au ? "n" : "s",
                s: {
                  font: {
                    name: m0,
                    sz: 9,
                    bold: Nu || rE,
                    color: {
                      rgb: Hu
                    }
                  },
                  alignment: {
                    horizontal: au ? "right" : "left",
                    vertical: "center",
                    wrapText: !1
                  },
                  border: Eu,
                  fill: Ou ? {
                    patternType: "solid",
                    fgColor: {
                      rgb: Ou
                    }
                  } : void 0,
                  numFmt: rE ? "#,##0.00" : au && !Nu ? "#,##0" : void 0
                }
              }
            })
          }), Au["!ref"] = D.utils.encode_range({
            s: {
              r: 0,
              c: 0
            },
            e: {
              r: T.length,
              c: y.length - 1
            }
          }), Au["!cols"] = [6, 22, 10, 6, 6, 16, 24, 11, 9, 16, 30, 14, 18, 14, 30, 10, 9, 10, 11, 32].map(H => ({
            wch: H
          })), Au["!rows"] = [{
            hpx: 30
          }], Au["!freeze"] = {
            xSplit: 0,
            ySplit: 1
          }, D.utils.book_append_sheet(u0, Au, "Patient Data"), D.writeFile(u0, `BCH360_NCD_ByDisease_${Q}_${d0}.xlsx`)
        });
        return
      }
      if (n === "mortality") {
        if (!n0?.comparison) return;
        const t = ["\u0E40\u0E14\u0E37\u0E2D\u0E19", `IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (${t0})`, `IPD \u0E15\u0E32\u0E22 (${t0})`, `IPD \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22% (${t0})`, `OPD \u0E15\u0E32\u0E22 (${t0})`, `\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 (${t0})`, `IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 (${r0})`, `IPD \u0E15\u0E32\u0E22 (${r0})`, `IPD \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E15\u0E32\u0E22% (${r0})`, `OPD \u0E15\u0E32\u0E22 (${r0})`, `\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22 (${r0})`],
          d = n0.comparison.map(x => [x.month, x.fy1.ipd_discharge, x.fy1.ipd_deaths, x.fy1.ipd_mortality_rate, x.fy1.opd_deaths, x.fy1.total_deaths, x.fy2.ipd_discharge, x.fy2.ipd_deaths, x.fy2.ipd_mortality_rate, x.fy2.opd_deaths, x.fy2.total_deaths]),
          k = "\uFEFF" + [t.join(","), ...d.map(x => x.join(","))].join(`\r
`),
          r = new Blob([k], {
            type: "text/csv;charset=utf-8;"
          }),
          h = URL.createObjectURL(r),
          a = document.createElement("a");
        a.href = h, a.download = `BCH360_Mortality_${t0}_${r0}.csv`, a.click(), URL.revokeObjectURL(h)
      }
    }, [n, z, B, Y0, N0, n0, C0, X, b0, $0, g0, t0, r0, Q, d0, gu, xu]),
    Vu = Y.useMemo(() => {
      const e = [];
      for (let t = du; t >= du - 2; t--) e.push(t);
      return e
    }, [du]),
    E = yE;
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
        onChange: e => p0(e.target.value),
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
            value: gu,
            onChange: e => Iu(e.target.value),
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
            value: Q,
            onChange: e => wu(e.target.value),
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
            value: d0,
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
            value: Q,
            onChange: e => wu(e.target.value),
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
            value: d0,
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
            value: t0,
            onChange: e => $u(Number(e.target.value)),
            style: {
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid var(--md-border)",
              fontSize: "13px",
              fontWeight: 700,
              background: "var(--md-surface)",
              color: "var(--md-text-primary)"
            },
            children: Vu.map(e => u.jsxs("option", {
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
            value: r0,
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
            children: Vu.map(e => u.jsxs("option", {
              value: e,
              children: ["\u0E1B\u0E35\u0E07\u0E1A ", e]
            }, e))
          })]
        })]
      }), u.jsx("button", {
        onClick: () => n === "ipd-compare" ? Bu() : n === "opd-compare" ? U() : n === "resource-opd" ? O() : n === "resource-ipd" ? F0() : n === "frax" ? H0() : n === "pt" ? q0() : n === "staff-services" ? mu() : n === "fluoride" ? ju() : n === "elderly-cxr" ? _u() : n === "ncd-disease" ? fu() : n === "imaging-services" ? eu() : n === "pttype-services" ? tu() : O0(),
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
        onClick: aE,
        disabled: n === "ipd-compare" ? !z : n === "opd-compare" ? !B : n === "resource-opd" ? !Y0 : n === "resource-ipd" ? !N0 : n === "frax" ? !C0 : n === "pt" || n === "staff-services" ? !X : n === "fluoride" ? !b0 : n === "elderly-cxr" ? !$0 : n === "ncd-disease" ? !g0?.patients : n === "imaging-services" ? !i0?.patients : n === "pttype-services" ? !B0?.summary : !n0,
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
        onClick: nE,
        disabled: n === "ipd-compare" ? !z : n === "opd-compare" ? !B : n === "resource-opd" ? !Y0 : n === "resource-ipd" ? !N0 : n === "frax" ? !C0 : n === "pt" || n === "staff-services" ? !X : n === "fluoride" ? !b0 : n === "elderly-cxr" ? !$0 : n === "ncd-disease" ? !g0?.patients : n === "imaging-services" ? !i0?.patients : n === "pttype-services" ? !B0?.summary : !n0,
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
          value: x0,
          onChange: e => Pu(e.target.value === "all" ? "all" : Number(e.target.value)),
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
    }), G0 && u.jsx("div", {
      style: {
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(239,68,68,.08)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: G0
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
    }), !_0 && n === "ipd-compare" && z?.comparison && (() => {
      const e = z.fy1_totals,
        t = z.fy2_totals,
        d = (r, h) => r > 0 ? Math.round((h - r) / r * 100) : 0,
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
          children: ["\u0E2A\u0E23\u0E38\u0E1B YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (", z.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49)"]
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
            children: [z.fiscal_years.fy1.start, " \u2014 ", z.fiscal_years.fy1.end]
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
            children: [z.fiscal_years.fy2.start, " \u2014 ", z.fiscal_years.fy2.end]
          })]
        }), u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px"
          },
          children: k.map((r, h) => u.jsxs("div", {
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
              children: [i(r.v1, r.dec || 0), " \u2192 ", i(r.v2, r.dec || 0)]
            })]
          }, h))
        }), (() => {
          const r = z.fy1_totals,
            h = z.fy2_totals,
            a = (l, v) => l > 0 ? Math.round((v - l) / l * 100) : 0,
            x = a(r.admits, h.admits),
            g = a(r.discharges, h.discharges),
            A = a(r.total_los, h.total_los),
            $ = a(r.alos, h.alos);
          a(r.occupancy_rate, h.occupancy_rate);
          const I = a(r.sum_adjrw, h.sum_adjrw),
            S = a(r.cmi, h.cmi),
            w = z.comparable_months || 0,
            W = z.custom_range ? `${z.custom_range.start} \u2014 ${z.custom_range.end}` : z.fiscal_years?.fy2?.label || "",
            f = [],
            C = h.admits - h.discharges,
            V = r.discharges > 0 ? r.sum_adjrw / r.discharges : 0,
            p = h.discharges > 0 ? h.sum_adjrw / h.discharges : 0;
          z.total_beds * 30 * w, x < -5 ? f.push({
            icon: "\u{1F4C9}",
            color: "#dc2626",
            title: `\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 Admit \u0E25\u0E14\u0E25\u0E07 ${Math.abs(x)}%`,
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${i(r.admits)} \u2192 ${i(h.admits)} \u0E23\u0E32\u0E22 (\u0E25\u0E14 ${i(Math.abs(h.admits-r.admits))} \u0E23\u0E32\u0E22) \xB7 D/C ${i(r.discharges)} \u2192 ${i(h.discharges)} \u0E23\u0E32\u0E22 (${g>=0?"+":""}${g}%) \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19${Math.abs(x)>15?"\u0E25\u0E14\u0E25\u0E07\u0E21\u0E32\u0E01":"\u0E25\u0E14\u0E25\u0E07"} \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E25\u0E30\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E42\u0E14\u0E22\u0E15\u0E23\u0E07`,
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
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${i(r.admits)} \u2192 ${i(h.admits)} \u0E23\u0E32\u0E22 (\u0E40\u0E1E\u0E34\u0E48\u0E21 ${i(h.admits-r.admits)} \u0E23\u0E32\u0E22) \u2014 \u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19\u0E41\u0E25\u0E30\u0E40\u0E15\u0E35\u0E22\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A`,
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
            detail: `\u0E23\u0E31\u0E1A\u0E40\u0E02\u0E49\u0E32 ${i(h.admits)} \u0E23\u0E32\u0E22 \xB7 D/C ${i(h.discharges)} \u0E23\u0E32\u0E22 \u2014 \u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19\u0E04\u0E07\u0E17\u0E35\u0E48 \u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23`,
            actions: []
          }), C > 20 && f.push({
            icon: "\u26A0\uFE0F",
            color: "#f59e0b",
            title: `Admit \u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32 D/C ${i(C)} \u0E23\u0E32\u0E22 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E2A\u0E30\u0E2A\u0E21\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A`,
            detail: `Admit ${i(h.admits)} vs D/C ${i(h.discharges)} \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E04\u0E49\u0E32\u0E07\u0E43\u0E19\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E43\u0E2B\u0E49\u0E40\u0E15\u0E35\u0E22\u0E07\u0E40\u0E15\u0E47\u0E21\u0E40\u0E23\u0E47\u0E27\u0E02\u0E36\u0E49\u0E19\u0E41\u0E25\u0E30 Workload \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2A\u0E39\u0E07`,
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
          }), $ > 5 ? f.push({
            icon: "\u23F1\uFE0F",
            color: "#f59e0b",
            title: `ALOS \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${$}% (${i(r.alos,2)} \u2192 ${i(h.alos,2)} \u0E27\u0E31\u0E19)`,
            detail: `\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E23\u0E27\u0E21 ${i(r.total_los)} \u2192 ${i(h.total_los)} \u0E27\u0E31\u0E19 (${A>=0?"+":""}${A}%) \u2014 \u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E22\u0E32\u0E27\u0E02\u0E36\u0E49\u0E19\u0E41\u0E21\u0E49\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14\u0E25\u0E07 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32 Discharge \u0E0A\u0E49\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D\u0E21\u0E35\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19`,
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
          }) : $ < -5 ? f.push({
            icon: "\u2705",
            color: "#16a34a",
            title: `ALOS \u0E25\u0E14\u0E25\u0E07 ${Math.abs($)}% \u2014 D/C Planning \u0E21\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E`,
            detail: `ALOS ${i(r.alos,2)} \u2192 ${i(h.alos,2)} \u0E27\u0E31\u0E19 \u2014 \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35\u0E02\u0E36\u0E49\u0E19 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Readmission Rate \u0E44\u0E21\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 (D/C \u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B)`,
            actions: [{
              who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
              what: "Monitor Readmission \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 Readmission \u0E20\u0E32\u0E22\u0E43\u0E19 28 \u0E27\u0E31\u0E19 \u0E2B\u0E32\u0E01 Rate >5% \u0E43\u0E2B\u0E49\u0E17\u0E1A\u0E17\u0E27\u0E19 D/C criteria \u0E27\u0E48\u0E32\u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48"
            }]
          }) : f.push({
            icon: "\u27A1\uFE0F",
            color: "var(--md-text-tertiary)",
            title: `ALOS \u0E17\u0E23\u0E07\u0E15\u0E31\u0E27 ${i(h.alos,2)} \u0E27\u0E31\u0E19 (${$>=0?"+":""}${$}%)`,
            detail: `\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E23\u0E27\u0E21 ${i(h.total_los)} \u0E27\u0E31\u0E19 \u2014 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19`,
            actions: []
          });
          {
            const l = [];
            x < 0 && l.push(`Volume \u0E25\u0E14 ${Math.abs(x)}%`), S < -5 && l.push(`CMI \u0E25\u0E14 ${Math.abs(S)}%`), I < -10 ? f.push({
              icon: "\u{1F4B0}",
              color: "#dc2626",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E25\u0E14\u0E25\u0E07 ${Math.abs(I)}% \u2014 ${l.join(" + ")||"\u0E15\u0E49\u0E2D\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E1E\u0E34\u0E48\u0E21"}`,
              detail: `AdjRW ${i(r.sum_adjrw,1)} \u2192 ${i(h.sum_adjrw,1)} (\u0E25\u0E14 ${i(Math.abs(h.sum_adjrw-r.sum_adjrw),1)}) \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${V.toFixed(2)} \u2192 ${p.toFixed(2)} \xB7 CMI ${i(r.cmi,2)} \u2192 ${i(h.cmi,2)} \u2014 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E41\u0E2A\u0E14\u0E07\u0E27\u0E48\u0E32 Case-mix \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07`,
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
            }) : I > 10 ? f.push({
              icon: "\u{1F4B0}",
              color: "#16a34a",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${I}%`,
              detail: `AdjRW ${i(r.sum_adjrw,1)} \u2192 ${i(h.sum_adjrw,1)} \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${V.toFixed(2)} \u2192 ${p.toFixed(2)} \u2014 ${S>5?"Case-mix \u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E02\u0E36\u0E49\u0E19":"\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E1E\u0E34\u0E48\u0E21"}`,
              actions: [{
                who: "\u0E04\u0E13\u0E30\u0E01\u0E23\u0E23\u0E21\u0E01\u0E32\u0E23 UM",
                what: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Readmission Rate \u2014 \u0E40\u0E21\u0E37\u0E48\u0E2D CMI \u0E2A\u0E39\u0E07\u0E02\u0E36\u0E49\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E21\u0E31\u0E48\u0E19\u0E43\u0E08\u0E27\u0E48\u0E32\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E40\u0E01\u0E34\u0E14\u0E08\u0E32\u0E01 D/C \u0E40\u0E23\u0E47\u0E27\u0E40\u0E01\u0E34\u0E19\u0E41\u0E25\u0E49\u0E27\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32 Admit \u0E0B\u0E49\u0E33"
              }, {
                who: "\u0E1D\u0E48\u0E32\u0E22\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
                what: "\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E17\u0E35\u0E21\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Staffing Ratio, \u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C, \u0E22\u0E32 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A High RW"
              }]
            }) : I < 0 && f.push({
              icon: "\u{1F4B0}",
              color: "#f59e0b",
              title: `\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 (AdjRW) \u0E25\u0E14\u0E25\u0E07\u0E40\u0E25\u0E47\u0E01\u0E19\u0E49\u0E2D\u0E22 ${Math.abs(I)}%`,
              detail: `AdjRW ${i(r.sum_adjrw,1)} \u2192 ${i(h.sum_adjrw,1)} \xB7 RW \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E23\u0E32\u0E22 ${V.toFixed(2)} \u2192 ${p.toFixed(2)}`,
              actions: [{
                who: "\u0E17\u0E35\u0E21 Coding",
                what: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Coding Quality \u2014 \u0E2A\u0E38\u0E48\u0E21 Audit \u0E40\u0E04\u0E2A RW \u0E15\u0E48\u0E33\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Under-coding \u0E01\u0E48\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E08\u0E30\u0E02\u0E22\u0E32\u0E22\u0E43\u0E2B\u0E0D\u0E48\u0E02\u0E36\u0E49\u0E19"
              }]
            })
          }
          return h.occupancy_rate > 85 ? f.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#dc2626",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${i(h.occupancy_rate,1)}% \u2014 \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22 (>85%)`,
            detail: `Active Bed ${i(h.active_beds,1)}/${z.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E25\u0E49\u0E19 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E2D Admit \u0E19\u0E32\u0E19 + Workload \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E2A\u0E39\u0E07 + \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 HAI`,
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
          }) : h.occupancy_rate < 50 ? f.push({
            icon: "\u{1F6CF}\uFE0F",
            color: "#f59e0b",
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${i(h.occupancy_rate,1)}% \u2014 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32 (<50%)`,
            detail: `Active Bed ${i(h.active_beds,1)}/${z.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 (\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23/\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E39\u0E1B\u0E42\u0E20\u0E04) \u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E44\u0E21\u0E48\u0E04\u0E38\u0E49\u0E21\u0E04\u0E48\u0E32`,
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
            title: `\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07 ${i(h.occupancy_rate,1)}% \u2014 \u0E40\u0E01\u0E13\u0E11\u0E4C\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21 (50-85%)`,
            detail: `Active Bed ${i(h.active_beds,1)}/${z.total_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \u2014 \u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E2A\u0E21\u0E14\u0E38\u0E25 \u0E22\u0E31\u0E07\u0E21\u0E35\u0E40\u0E15\u0E35\u0E22\u0E07\u0E2A\u0E33\u0E23\u0E2D\u0E07\u0E23\u0E2D\u0E07\u0E23\u0E31\u0E1A Surge`,
            actions: []
          }), S < -10 ? f.push({
            icon: "\u{1F4CB}",
            color: "#dc2626",
            title: `CMI \u0E25\u0E14\u0E25\u0E07 ${Math.abs(S)}% (${i(r.cmi,2)} \u2192 ${i(h.cmi,2)}) \u2014 Case-mix \u0E40\u0E1A\u0E32\u0E25\u0E07 \u0E2B\u0E23\u0E37\u0E2D Under-coding`,
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
          }) : S > 10 && f.push({
            icon: "\u{1F4CB}",
            color: "#16a34a",
            title: `CMI \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 ${S}% (${i(r.cmi,2)} \u2192 ${i(h.cmi,2)}) \u2014 \u0E14\u0E39\u0E41\u0E25\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E21\u0E32\u0E01\u0E02\u0E36\u0E49\u0E19`,
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
                children: [W, " \xB7 ", w, " \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07 ", z.total_beds]
              })]
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              },
              children: f.map((l, v) => u.jsxs("div", {
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
                  }), l.actions.map((o, c) => u.jsxs("div", {
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
                  }, c))]
                })]
              }, v))
            })]
          })
        })()]
      })
    })(), !_0 && n === "ipd-compare" && z?.comparison && u.jsxs("div", {
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
        ref: N,
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
            children: z.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [z.custom_range ? `${z.custom_range.start} \u0E16\u0E36\u0E07 ${z.custom_range.end} vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19` : Ku && `${z.fiscal_years.fy2.label} ${Ku}`, " \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07\u0E08\u0E23\u0E34\u0E07: ", z.total_beds, " \u0E40\u0E15\u0E35\u0E22\u0E07"]
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
                children: z.custom_range ? `${z.fiscal_years.fy1.start} \u2014 ${z.fiscal_years.fy1.end}` : `${z.fiscal_years.fy1.label} (${z.fiscal_years.fy1.start} \u2014 ${z.fiscal_years.fy1.end})`
              }), u.jsx("th", {
                colSpan: 8,
                style: {
                  ...E.th,
                  background: E.fy2Bg,
                  color: "#db2777",
                  borderRight: "2px solid var(--md-border)"
                },
                children: z.custom_range ? `${z.fiscal_years.fy2.start} \u2014 ${z.fiscal_years.fy2.end}` : `${z.fiscal_years.fy2.label} (${z.fiscal_years.fy2.start} \u2014 ${z.fiscal_years.fy2.end})`
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
            children: [z.comparison.filter(e => e.fy1.has_data && e.fy2.has_data).map((e, t) => u.jsxs("tr", {
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
                    children: i(e.fy1.admits)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: i(e.fy1.discharges)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(e.fy1.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: i(e.fy1.alos, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(e.fy1.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: i(e.fy1.active_beds, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(e.fy1.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: "2px solid var(--md-border)"
                    },
                    children: i(e.fy1.cmi, 2)
                  })]
                })
              })(), (() => {
                const d = "1px solid var(--md-border)";
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: E.tdNum,
                    children: i(e.fy2.admits)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: i(e.fy2.discharges)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(e.fy2.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: i(e.fy2.alos, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(e.fy2.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: d
                    },
                    children: i(e.fy2.active_beds, 2)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(e.fy2.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: "2px solid var(--md-border)"
                    },
                    children: i(e.fy2.cmi, 2)
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
              ].map(([d, k, r], h) => {
                const a = d > 0 ? Math.round((k - d) / d * 100) : k > 0 ? 100 : 0;
                return u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 800,
                    fontSize: "11px",
                    color: a > 0 ? "#16a34a" : a < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                    borderRight: r ? "1px solid var(--md-border)" : void 0
                  },
                  children: [a > 0 ? "\u25B2" : a < 0 ? "\u25BC" : "", " ", Math.abs(a), "%"]
                }, `yoy_${h}`)
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 800,
                  color: e.admit_diff >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [e.admit_diff > 0 ? "+" : "", i(e.admit_diff)]
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 800,
                  color: e.fy2.total_los - e.fy1.total_los >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [e.fy2.total_los - e.fy1.total_los > 0 ? "+" : "", i(e.fy2.total_los - e.fy1.total_los)]
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
                  k = z.fy1_totals,
                  r = z.fy2_totals;
                return u.jsxs(u.Fragment, {
                  children: [u.jsx("td", {
                    style: d,
                    children: i(k.admits)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: i(k.discharges)
                  }), u.jsx("td", {
                    style: d,
                    children: i(k.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: i(k.alos, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: i(k.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: i(k.active_beds, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: i(k.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: e
                    },
                    children: i(k.cmi, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: i(r.admits)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: i(r.discharges)
                  }), u.jsx("td", {
                    style: d,
                    children: i(r.total_los)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: i(r.alos, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: i(r.occupancy_rate, 2)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: t
                    },
                    children: i(r.active_beds, 2)
                  }), u.jsx("td", {
                    style: d,
                    children: i(r.sum_adjrw, 2)
                  }), u.jsx("td", {
                    style: {
                      ...d,
                      borderRight: e
                    },
                    children: i(r.cmi, 2)
                  })]
                })
              })(), (() => {
                const e = z.fy1_totals,
                  t = z.fy2_totals;
                return [
                  [e.admits, t.admits, !1],
                  [e.discharges, t.discharges, !0],
                  [e.total_los, t.total_los, !1],
                  [e.alos, t.alos, !0],
                  [e.occupancy_rate, t.occupancy_rate, !1],
                  [e.active_beds, t.active_beds, !0],
                  [e.sum_adjrw, t.sum_adjrw, !1],
                  [e.cmi, t.cmi, !1]
                ].map(([d, k, r], h) => {
                  const a = d > 0 ? Math.round((k - d) / d * 100) : k > 0 ? 100 : 0;
                  return u.jsxs("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      borderTop: "2px solid var(--md-border)",
                      fontSize: "11px",
                      color: a > 0 ? "#16a34a" : a < 0 ? "#dc2626" : "var(--md-text-tertiary)",
                      borderRight: r ? "1px solid var(--md-border)" : void 0
                    },
                    children: [a > 0 ? "\u25B2" : a < 0 ? "\u25BC" : "", " ", Math.abs(a), "%"]
                  }, `yoy_t_${h}`)
                })
              })(), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: "2px solid var(--md-border)",
                  color: z.overall_admit_diff >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [z.overall_admit_diff > 0 ? "+" : "", i(z.overall_admit_diff)]
              }), u.jsxs("td", {
                style: {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: "2px solid var(--md-border)",
                  color: z.fy2_totals.total_los - z.fy1_totals.total_los >= 0 ? "#16a34a" : "#dc2626"
                },
                children: [z.fy2_totals.total_los - z.fy1_totals.total_los > 0 ? "+" : "", i(z.fy2_totals.total_los - z.fy1_totals.total_los)]
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
          children: z.timestamp && new Date(z.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !_0 && n === "opd-compare" && B?.comparison && (() => {
      const e = B.fy1_totals,
        t = B.fy2_totals,
        d = (r, h) => r > 0 ? Math.round((h - r) / r * 100) : 0,
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
          children: ["\u0E2A\u0E23\u0E38\u0E1B YoY \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A (", B.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E44\u0E14\u0E49)"]
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
            children: [B.fiscal_years.fy1.start, " \u2014 ", B.fiscal_years.fy1.end]
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
            children: [B.fiscal_years.fy2.start, " \u2014 ", B.fiscal_years.fy2.end]
          })]
        }), u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "8px"
          },
          children: k.map((r, h) => u.jsxs("div", {
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
              children: [r.prefix || "", i(r.v1, r.dec || 0), " \u2192 ", r.prefix || "", i(r.v2, r.dec || 0)]
            })]
          }, h))
        })]
      })
    })(), !_0 && n === "opd-compare" && B?.comparison && u.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)",
        borderRadius: "16px",
        overflowX: "auto"
      },
      children: [u.jsxs("div", {
        ref: N,
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
            children: B.title
          }), u.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginTop: "4px"
            },
            children: [B.custom_range.start, " \u0E16\u0E36\u0E07 ", B.custom_range.end, " vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 \xB7 \u0E40\u0E15\u0E35\u0E22\u0E07\u0E08\u0E23\u0E34\u0E07: ", B.comparable_months, " \u0E40\u0E14\u0E37\u0E2D\u0E19"]
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
                children: [B.fiscal_years.fy1.start, " \u2014 ", B.fiscal_years.fy1.end]
              }), u.jsxs("th", {
                colSpan: 7,
                style: {
                  ...E.th,
                  background: "rgba(16,185,129,.10)",
                  color: "#10b981",
                  borderRight: "2px solid var(--md-border)"
                },
                children: [B.fiscal_years.fy2.start, " \u2014 ", B.fiscal_years.fy2.end]
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
            children: [B.comparison.filter(e => e.fy1.has_data || e.fy2.has_data).map((e, t) => {
              const d = (r, h) => r > 0 ? Math.round((h - r) / r * 100) : h > 0 ? 100 : 0,
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
                  children: i(e.fy1.visits)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: k
                  },
                  children: i(e.fy1.patients)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: i(e.fy1.revenue)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: i(e.fy1.drug_cost)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: i(e.fy1.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: k
                  },
                  children: i(e.fy1.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: "2px solid var(--md-border)"
                  },
                  children: i(e.fy1.avg_income, 2)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: i(e.fy2.visits)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: k
                  },
                  children: i(e.fy2.patients)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: i(e.fy2.revenue)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: i(e.fy2.drug_cost)
                }), u.jsx("td", {
                  style: E.tdNum,
                  children: i(e.fy2.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: k
                  },
                  children: i(e.fy2.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    borderRight: "2px solid var(--md-border)"
                  },
                  children: i(e.fy2.avg_income, 2)
                }), [
                  [e.fy1.visits, e.fy2.visits],
                  [e.fy1.patients, e.fy2.patients],
                  [e.fy1.revenue, e.fy2.revenue],
                  [e.fy1.drug_cost, e.fy2.drug_cost],
                  [e.fy1.lab_cost, e.fy2.lab_cost],
                  [e.fy1.xray_cost, e.fy2.xray_cost],
                  [e.fy1.avg_income, e.fy2.avg_income]
                ].map(([r, h], a) => {
                  const x = d(r, h);
                  return u.jsxs("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      fontSize: "11px",
                      color: x > 0 ? "#16a34a" : x < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                    },
                    children: [x > 0 ? "\u25B2" : x < 0 ? "\u25BC" : "", " ", Math.abs(x), "%"]
                  }, a)
                })]
              }, t)
            }), (() => {
              const e = B.fy1_totals,
                t = B.fy2_totals,
                d = "2px solid var(--md-border)",
                k = "1px solid var(--md-border)",
                r = {
                  ...E.tdNum,
                  fontWeight: 900,
                  borderTop: d
                },
                h = (a, x) => a > 0 ? Math.round((x - a) / a * 100) : 0;
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
                  children: i(e.visits)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: k
                  },
                  children: i(e.patients)
                }), u.jsx("td", {
                  style: r,
                  children: i(e.revenue)
                }), u.jsx("td", {
                  style: r,
                  children: i(e.drug_cost)
                }), u.jsx("td", {
                  style: r,
                  children: i(e.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: k
                  },
                  children: i(e.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: d
                  },
                  children: i(e.avg_income, 2)
                }), u.jsx("td", {
                  style: r,
                  children: i(t.visits)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: k
                  },
                  children: i(t.patients)
                }), u.jsx("td", {
                  style: r,
                  children: i(t.revenue)
                }), u.jsx("td", {
                  style: r,
                  children: i(t.drug_cost)
                }), u.jsx("td", {
                  style: r,
                  children: i(t.lab_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: k
                  },
                  children: i(t.xray_cost)
                }), u.jsx("td", {
                  style: {
                    ...r,
                    borderRight: d
                  },
                  children: i(t.avg_income, 2)
                }), [
                  [e.visits, t.visits],
                  [e.patients, t.patients],
                  [e.revenue, t.revenue],
                  [e.drug_cost, t.drug_cost],
                  [e.lab_cost, t.lab_cost],
                  [e.xray_cost, t.xray_cost],
                  [e.avg_income, t.avg_income]
                ].map(([a, x], g) => {
                  const A = h(a, x);
                  return u.jsxs("td", {
                    style: {
                      ...r,
                      fontWeight: 900,
                      fontSize: "11px",
                      color: A > 0 ? "#16a34a" : A < 0 ? "#dc2626" : "var(--md-text-tertiary)"
                    },
                    children: [A > 0 ? "\u25B2" : A < 0 ? "\u25BC" : "", " ", Math.abs(A), "%"]
                  }, g)
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
          children: B.timestamp && new Date(B.timestamp).toLocaleString("th-TH")
        })]
      })]
    }), !_0 && n === "resource-opd" && Y0?.comparison && (() => {
      const e = Y0,
        t = e.fy1_totals,
        d = e.fy2_totals,
        k = (a, x) => x > 0 ? Math.round((a - x) / x * 100) : a > 0 ? 100 : 0;
      t.lab_orders + t.drug_orders + t.xray_orders, t.lab_price + t.drug_price + t.xray_price, d.lab_orders + d.drug_orders + d.xray_orders, d.lab_price + d.drug_price + d.xray_price;
      const r = "2px solid var(--md-border)",
        h = "1px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: h,
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: N,
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
                  children: ["\u0E1B\u0E35 \u0E07\u0E1A ", t0]
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#0d9488",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35 \u0E07\u0E1A ", r0]
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
                    borderRight: h
                  },
                  children: "Lab (\u0E15\u0E23\u0E27\u0E08\u0E17\u0E32\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: h
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
                    borderRight: h
                  },
                  children: "Lab (\u0E15\u0E23\u0E27\u0E08\u0E17\u0E32\u0E07\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23)"
                }), u.jsx("th", {
                  colSpan: 2,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    fontSize: "11px",
                    fontWeight: 700,
                    borderRight: h
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
                    borderRight: h
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
                    borderRight: h
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
                    borderRight: h
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
                    borderRight: h
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
              children: [e.comparison.filter(a => a.fy1?.has_data && a.fy2?.has_data).map((a, x) => {
                const g = a.fy1,
                  A = a.fy2,
                  $ = g.lab_orders + g.drug_orders + g.xray_orders,
                  I = g.lab_price + g.drug_price + g.xray_price,
                  S = A.lab_orders + A.drug_orders + A.xray_orders,
                  w = A.lab_price + A.drug_price + A.xray_price,
                  W = k(S, $),
                  f = k(w, I),
                  C = x % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  V = x % 2 === 0 ? "var(--md-surface)" : "var(--md-surface-2, #f8fafc)";
                return u.jsxs("tr", {
                  style: {
                    background: C
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      position: "sticky",
                      left: 0,
                      background: V,
                      zIndex: 1,
                      borderRight: r
                    },
                    children: a.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: g.lab_orders ? i(g.lab_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: h
                    },
                    children: g.lab_price ? i(g.lab_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: g.drug_orders ? i(g.drug_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: h
                    },
                    children: g.drug_price ? i(g.drug_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: g.xray_orders ? i(g.xray_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: g.xray_price ? i(g.xray_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.lab_orders ? i(A.lab_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: h
                    },
                    children: A.lab_price ? i(A.lab_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.drug_orders ? i(A.drug_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: h
                    },
                    children: A.drug_price ? i(A.drug_price) : ""
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: A.xray_orders ? i(A.xray_orders) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: A.xray_price ? i(A.xray_price) : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: W >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: a.has_data ? `${W>0?"\u25B2":W<0?"\u25BC":""} ${Math.abs(W)}%` : ""
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: f >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: a.has_data ? `${f>0?"\u25B2":f<0?"\u25BC":""} ${Math.abs(f)}%` : ""
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
                  children: i(t.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: h
                  },
                  children: i(t.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(t.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: h
                  },
                  children: i(t.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(t.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: i(t.xray_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(d.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: h
                  },
                  children: i(d.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(d.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: h
                  },
                  children: i(d.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(d.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: i(d.xray_price)
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
        }), (t0 <= 2567 || r0 <= 2567) && u.jsxs("div", {
          style: {
            padding: "10px 20px",
            borderTop: h,
            fontSize: "12px",
            fontWeight: 600,
            color: "#d97706",
            background: "rgba(251,191,36,.06)"
          },
          children: ["\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E2B\u0E15\u0E38: HOSxP \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 inc_drug \u0E0A\u0E48\u0E27\u0E07 \u0E01.\u0E22.\u2013\u0E1E.\u0E22. 2566 \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E08\u0E23\u0E34\u0E07 (~300 \u0E40\u0E17\u0E48\u0E32) \u2014 \u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E31\u0E14 outlier (inc_drug ", ">", " 25,000) \u0E2D\u0E2D\u0E01\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34"]
        }), u.jsxs("div", {
          style: {
            padding: "10px 20px",
            borderTop: h,
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
    })(), !_0 && n === "resource-opd" && Y0?.comparison && u.jsx(iE, {
      data: Y0,
      fy1: t0,
      fy2: r0,
      level: "OPD"
    }), !_0 && n === "resource-ipd" && N0?.comparison && (() => {
      const e = N0,
        t = e.fy1_totals,
        d = e.fy2_totals,
        k = (a, x) => x > 0 ? Math.round((a - x) / x * 100) : a > 0 ? 100 : 0;
      t.lab_orders + t.drug_orders + t.xray_orders, t.lab_price + t.drug_price + t.xray_price, d.lab_orders + d.drug_orders + d.xray_orders, d.lab_price + d.drug_price + d.xray_price;
      const r = "2px solid var(--md-border)",
        h = "1px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: h,
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: N,
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
              children: e.title || `\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (Lab / Drug / CT-Xray) \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A ${t0} vs ${r0}`
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
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", t0]
                }), u.jsxs("th", {
                  colSpan: 6,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#db2777",
                    borderRight: r
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", r0]
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
              children: [e.comparison.filter(a => a.fy1?.has_data && a.fy2?.has_data).map((a, x) => {
                const g = a.fy1,
                  A = a.fy2,
                  $ = g.lab_orders + g.drug_orders + g.xray_orders,
                  I = g.lab_price + g.drug_price + g.xray_price,
                  S = A.lab_orders + A.drug_orders + A.xray_orders,
                  w = A.lab_price + A.drug_price + A.xray_price,
                  W = k(S, $),
                  f = k(w, I),
                  C = x % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  V = !a.has_data;
                return u.jsxs("tr", {
                  style: {
                    background: C,
                    opacity: V ? .35 : 1
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      textAlign: "center",
                      borderRight: r
                    },
                    children: a.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(g.lab_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(g.lab_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(g.drug_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(g.drug_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(g.xray_orders)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: i(g.xray_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(A.lab_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(A.lab_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(A.drug_orders)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(A.drug_price)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(A.xray_orders)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      borderRight: r
                    },
                    children: i(A.xray_price)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: W >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: a.has_data && g.has_data && A.has_data ? `${W>=0?"\u25B2":"\u25BC"} ${Math.abs(W)}%` : "\u2014"
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: f >= 0 ? "#16a34a" : "#dc2626"
                    },
                    children: a.has_data && g.has_data && A.has_data ? `${f>=0?"\u25B2":"\u25BC"} ${Math.abs(f)}%` : "\u2014"
                  })]
                }, a.month)
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
                  children: i(t.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(t.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(t.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(t.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(t.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: i(t.xray_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(d.lab_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(d.lab_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(d.drug_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(d.drug_price)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r
                  },
                  children: i(d.xray_orders)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: r,
                    borderRight: r
                  },
                  children: i(d.xray_price)
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
            borderTop: h,
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
    })(), !_0 && n === "resource-ipd" && N0?.comparison && u.jsx(iE, {
      data: N0,
      fy1: t0,
      fy2: r0,
      level: "IPD"
    }), !_0 && n === "mortality" && n0?.comparison && (() => {
      const e = n0,
        t = e.fy1_totals,
        d = e.fy2_totals,
        k = (a, x) => x > 0 ? Math.round((a - x) / x * 100) : a > 0 ? 100 : 0,
        r = a => a > 0 ? `${a.toFixed(2)}%` : "\u2014",
        h = "2px solid var(--md-border)";
      return u.jsxs("div", {
        className: "rounded-2xl overflow-hidden",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          boxShadow: "var(--md-shadow-sm)"
        },
        children: [u.jsxs("div", {
          ref: N,
          style: {
            overflowX: "auto"
          },
          children: [u.jsxs("div", {
            style: {
              padding: "16px 20px",
              textAlign: "center",
              borderBottom: h,
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
                    borderRight: h
                  },
                  children: "\u0E40\u0E14\u0E37\u0E2D\u0E19"
                }), u.jsxs("th", {
                  colSpan: 5,
                  style: {
                    ...E.th,
                    background: E.fy1Bg,
                    color: "#2563eb",
                    borderRight: h
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", t0]
                }), u.jsxs("th", {
                  colSpan: 5,
                  style: {
                    ...E.th,
                    background: E.fy2Bg,
                    color: "#db2777",
                    borderRight: h
                  },
                  children: ["\u0E1B\u0E35\u0E07\u0E1A ", r0]
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
                    borderRight: h
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
                    borderRight: h
                  },
                  children: "\u0E23\u0E27\u0E21\u0E15\u0E32\u0E22"
                })]
              })]
            }), u.jsxs("tbody", {
              children: [e.comparison.filter(a => a.fy1?.has_data && a.fy2?.has_data).map((a, x) => {
                const g = a.fy1,
                  A = a.fy2,
                  $ = k(A.total_deaths, g.total_deaths),
                  I = x % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))",
                  S = !a.has_data;
                return u.jsxs("tr", {
                  style: {
                    background: I,
                    opacity: S ? .35 : 1
                  },
                  children: [u.jsx("td", {
                    style: {
                      ...E.td,
                      fontWeight: 800,
                      textAlign: "center",
                      borderRight: h
                    },
                    children: a.month
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(g.ipd_discharge)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: g.ipd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: g.ipd_deaths > 0 ? 800 : 600
                    },
                    children: i(g.ipd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: g.ipd_mortality_rate >= 2 ? "#dc2626" : g.ipd_mortality_rate > 0 ? "#d97706" : "inherit",
                      fontWeight: 700
                    },
                    children: r(g.ipd_mortality_rate)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: g.opd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: g.opd_deaths > 0 ? 800 : 600
                    },
                    children: i(g.opd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: g.total_deaths > 0 ? "#dc2626" : "inherit",
                      borderRight: h
                    },
                    children: i(g.total_deaths)
                  }), u.jsx("td", {
                    style: E.tdNum,
                    children: i(A.ipd_discharge)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      color: A.ipd_deaths > 0 ? "#dc2626" : "inherit",
                      fontWeight: A.ipd_deaths > 0 ? 800 : 600
                    },
                    children: i(A.ipd_deaths)
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
                    children: i(A.opd_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: A.total_deaths > 0 ? "#dc2626" : "inherit",
                      borderRight: h
                    },
                    children: i(A.total_deaths)
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 800,
                      color: $ > 0 ? "#dc2626" : $ < 0 ? "#16a34a" : "inherit"
                    },
                    children: a.has_data && g.has_data && A.has_data ? `${$>0?"\u25B2":$<0?"\u25BC":""} ${Math.abs($)}%` : "\u2014"
                  })]
                }, a.month)
              }), u.jsxs("tr", {
                style: {
                  background: "rgba(239,68,68,.06)"
                },
                children: [u.jsx("td", {
                  style: {
                    ...E.td,
                    fontWeight: 900,
                    textAlign: "center",
                    borderRight: h,
                    borderTop: h
                  },
                  children: "\u0E23\u0E27\u0E21"
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h
                  },
                  children: i(t.ipd_discharge)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
                    color: "#dc2626"
                  },
                  children: i(t.ipd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
                    color: t.ipd_mortality_rate >= 2 ? "#dc2626" : "#d97706"
                  },
                  children: r(t.ipd_mortality_rate)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
                    color: "#dc2626"
                  },
                  children: i(t.opd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
                    color: "#dc2626",
                    borderRight: h
                  },
                  children: i(t.total_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h
                  },
                  children: i(d.ipd_discharge)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
                    color: "#dc2626"
                  },
                  children: i(d.ipd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
                    color: d.ipd_mortality_rate >= 2 ? "#dc2626" : "#d97706"
                  },
                  children: r(d.ipd_mortality_rate)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
                    color: "#dc2626"
                  },
                  children: i(d.opd_deaths)
                }), u.jsx("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
                    color: "#dc2626",
                    borderRight: h
                  },
                  children: i(d.total_deaths)
                }), u.jsxs("td", {
                  style: {
                    ...E.tdNum,
                    fontWeight: 900,
                    borderTop: h,
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
            children: [e.data_source, " \xB7 IPD Early Death (LOS<2d): \u0E1B\u0E35\u0E07\u0E1A ", t0, "=", t.ipd_early_deaths, " / \u0E1B\u0E35\u0E07\u0E1A ", r0, "=", d.ipd_early_deaths]
          }), u.jsx("span", {
            children: e.timestamp && new Date(e.timestamp).toLocaleString("th-TH")
          })]
        })]
      })
    })(), !_0 && n === "mortality" && n0?.comparison && u.jsx(mE, {
      title: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E22 (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
      subtitle: "Mortality Executive Analysis \xB7 IPD Rate \xB7 Early Death \xB7 OPD/ER \xB7 Peak Month \xB7 Risks \xB7 Recommendations",
      badge: "\u{1F4D0} Rule-based \xB7 Clinical Quality",
      accentColor: "#dc2626",
      headerGradient: "linear-gradient(135deg, rgba(220,38,38,.10), rgba(245,158,11,.06))",
      narrative: bE(n0, t0, r0)
    }), !_0 && n === "frax" && C0?.patients && u.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)"
      },
      children: [u.jsxs("div", {
        ref: N,
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
            children: Lu.map((e, t) => u.jsxs("tr", {
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
          children: [x0 !== "all" && C0.patients.length > x0 && u.jsxs("span", {
            style: {
              color: "#d97706",
              marginRight: "6px"
            },
            children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", x0, " \u0E08\u0E32\u0E01 ", C0.patients.length.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 "]
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
        r = e.filter(o => o.sex === "\u0E0A\u0E32\u0E22").length,
        h = e.filter(o => o.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
        a = {};
      e.forEach(o => {
        const c = (o.icd10 || "").trim().toUpperCase();
        c && ru.test(c) && (a[c] || (a[c] = {
          code: c,
          name: o.icd10name,
          count: 0,
          totalInc: 0
        }), a[c].count++, a[c].totalInc += o.income || 0)
      });
      const x = Object.values(a).sort((o, c) => c.count - o.count).slice(0, 10),
        g = x.length > 0 ? x[0].count : 1,
        A = {
          "60-64": 0,
          "65-69": 0,
          "70-74": 0,
          "75-79": 0,
          "80+": 0
        };
      e.forEach(o => {
        const c = Number(o.age_y) || 0;
        c < 65 ? A["60-64"]++ : c < 70 ? A["65-69"]++ : c < 75 ? A["70-74"]++ : c < 80 ? A["75-79"]++ : A["80+"]++
      });
      const $ = Math.max(...Object.values(A), 1),
        I = {
          "60-64": "#3b82f6",
          "65-69": "#10b981",
          "70-74": "#f59e0b",
          "75-79": "#ef4444",
          "80+": "#8b5cf6"
        },
        S = {};
      e.forEach(o => {
        const c = o.pttype_name || "-";
        S[c] || (S[c] = {
          count: 0,
          income: 0
        }), S[c].count++, S[c].income += o.income || 0
      });
      const w = Object.entries(S).sort((o, c) => c[1].count - o[1].count),
        W = new Set(e.map(o => o.hn).filter(Boolean)).size,
        f = Object.entries(A).reduce((o, [c, m]) => m > o[1] ? [c, m] : o, ["", 0]),
        C = x.length > 0 ? x[0] : null,
        V = w.length > 0 ? w[0] : null,
        p = e.length > 0 ? Math.round(d / e.length) : 0,
        l = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 CXR \u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E1B\u0E35: \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${$0.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${W.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E04\u0E48\u0E32 CXR \u0E23\u0E27\u0E21 ${d.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${p.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22 \xB7 \u0E0A\u0E32\u0E22 ${r} \u0E23\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07 ${h} \u0E23\u0E32\u0E22${r>0&&h>0?` (\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E2A\u0E48\u0E27\u0E19 ${(r/h).toFixed(2)}:1)`:""}`];
      if (f[0]) {
        const o = e.length > 0 ? Math.round(f[1] / e.length * 100) : 0;
        l.push(`\u{1F474} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E17\u0E33 CXR \u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${f[0]} \u0E1B\u0E35 ${f[1]} \u0E23\u0E32\u0E22 (${o}%) \u2014 ${f[0]==="80+"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E21\u0E32\u0E01 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E1B\u0E2D\u0E14\u0E2D\u0E31\u0E01\u0E40\u0E2A\u0E1A/\u0E27\u0E31\u0E13\u0E42\u0E23\u0E04\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23 follow-up \u0E17\u0E38\u0E01\u0E23\u0E32\u0E22":f[0].startsWith("60")?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E04\u0E27\u0E23\u0E17\u0E33 baseline CXR \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35":"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E01\u0E25\u0E32\u0E07 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 COPD/IHD \u0E23\u0E48\u0E27\u0E21\u0E14\u0E49\u0E27\u0E22"}`)
      }
      if (C && ru.test(C.code) && l.push(`\u{1FA7B} \u0E1C\u0E25\u0E15\u0E23\u0E27\u0E08 CXR \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${C.code} ${C.name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${C.count} \u0E23\u0E32\u0E22 \u2014 ${C.code.startsWith("J18")?"\u0E1B\u0E2D\u0E14\u0E2D\u0E31\u0E01\u0E40\u0E2A\u0E1A \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32\u0E41\u0E25\u0E30\u0E09\u0E35\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19 Pneumococcal/Influenza":C.code.startsWith("J44")||C.code.startsWith("J43")?"COPD/Emphysema \u0E04\u0E27\u0E23\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A COPD clinic \u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E40\u0E25\u0E34\u0E01\u0E1A\u0E38\u0E2B\u0E23\u0E35\u0E48":C.code.startsWith("I")?"\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08/\u0E2B\u0E25\u0E2D\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 NCD":"\u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E41\u0E25\u0E30\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E15\u0E32\u0E21\u0E2D\u0E32\u0E22\u0E38"}`), V) {
        const [o, c] = V, m = e.length > 0 ? Math.round(c.count / e.length * 100) : 0;
        m >= 50 && l.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${o} ${c.count} \u0E23\u0E32\u0E22 (${m}%) \u2014 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E2D\u0E1A\u0E04\u0E25\u0E38\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 LTC \u0E02\u0E2D\u0E07\u0E0A\u0E38\u0E21\u0E0A\u0E19`)
      }
      $0.total > 0 && p > 0 && l.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22: CXR \u0E43\u0E19\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 60+ \u0E40\u0E1B\u0E47\u0E19 screening \u0E2A\u0E33\u0E04\u0E31\u0E0D\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A TB/COPD/Lung CA \xB7 \u0E04\u0E27\u0E23\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 coverage \u226580% \u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E43\u0E19\u0E40\u0E02\u0E15 \xB7 \u0E08\u0E31\u0E14\u0E17\u0E33 CXR mobile clinic \u0E2B\u0E32\u0E01\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E30\u0E14\u0E27\u0E01");
      const v = {
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
            value: h.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }, {
            label: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32",
            value: w.length,
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            color: "#f59e0b",
            gradient: "linear-gradient(135deg, rgba(245,158,11,.12), rgba(245,158,11,.04))",
            border: "rgba(245,158,11,.25)"
          }].map((o, c) => u.jsxs("div", {
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
          }, c))
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
            }), w.slice(0, 8).map(([o, c], m) => {
              const R = e.length > 0 ? Math.round(c.count / e.length * 100) : 0,
                b = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                j = b[m % b.length];
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
                      color: j
                    },
                    children: [c.count, " (", R, "%)"]
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
                      width: `${R}%`,
                      borderRadius: "3px",
                      background: j,
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
              children: Object.entries(A).map(([o, c]) => u.jsxs("div", {
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
                    color: I[o]
                  },
                  children: c
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: I[o],
                    height: `${Math.max(8,c/$*60)}px`,
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
              children: x.map((o, c) => {
                const m = g > 0 ? Math.round(o.count / g * 100) : 0;
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
                        background: `linear-gradient(90deg, rgba(124,58,237,.25), rgba(124,58,237,.${c===0?"5":"3"}))`,
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
                }, c)
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
            ref: N,
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
                children: iu(e).map((o, c) => {
                  const m = c % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: m,
                      transition: "background .1s"
                    },
                    onMouseEnter: R => R.currentTarget.style.background = "rgba(124,58,237,.04)",
                    onMouseLeave: R => R.currentTarget.style.background = m,
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
                  }, o.vn || c)
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
                    children: [x0 !== "all" && $0.total > x0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", x0, " \u0E08\u0E32\u0E01 ", $0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", $0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E0A\u0E32\u0E22 ", r, " \xB7 \u0E2B\u0E0D\u0E34\u0E07 ", h, " \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", k.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
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
        }), l.length > 0 ? u.jsx(Du, {
          data: v,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "fluoride" && b0?.patients && (() => {
      const e = b0.patients,
        t = b0.total_income || 0,
        d = b0.total_fluoride_price || 0,
        k = e.length > 0 ? Math.round(t / e.length) : 0;
      e.length > 0 && Math.max(...e.map(p => p.income || 0));
      const r = {};
      e.forEach(p => {
        const l = (p.icd10 || "").trim().toUpperCase();
        l && ru.test(l) && (r[l] || (r[l] = {
          code: l,
          name: p.icd10name,
          count: 0,
          totalInc: 0
        }), r[l].count++, r[l].totalInc += p.income || 0)
      });
      const h = Object.values(r).sort((p, l) => l.count - p.count).slice(0, 10),
        a = h.length > 0 ? h[0].count : 1,
        x = {
          "25-34": 0,
          "35-44": 0,
          "45-54": 0,
          "55-59": 0
        };
      e.forEach(p => {
        const l = Number(p.age_y) || 0;
        l < 35 ? x["25-34"]++ : l < 45 ? x["35-44"]++ : l < 55 ? x["45-54"]++ : x["55-59"]++
      });
      const g = Math.max(...Object.values(x), 1),
        A = {
          "25-34": "#3b82f6",
          "35-44": "#10b981",
          "45-54": "#f59e0b",
          "55-59": "#ef4444"
        },
        $ = {};
      e.forEach(p => {
        const l = p.pttype_name || "-";
        $[l] || ($[l] = {
          count: 0,
          income: 0
        }), $[l].count++, $[l].income += p.income || 0
      });
      const I = Object.entries($).sort((p, l) => l[1].count - p[1].count),
        S = new Set(e.map(p => p.hn).filter(Boolean)).size,
        w = Object.entries(x).reduce((p, [l, v]) => v > p[1] ? [l, v] : p, ["", 0]),
        W = e.length > 0 ? Math.round(d / e.length) : 0,
        f = I.length > 0 ? I[0] : null,
        C = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C (\u0E2D\u0E32\u0E22\u0E38 25-59 \u0E1B\u0E35): \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${b0.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${S.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E04\u0E48\u0E32\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C\u0E23\u0E27\u0E21 ${d.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${W.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22${W<50?" \u2014 \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E2D\u0E32\u0E08\u0E21\u0E35\u0E01\u0E32\u0E23\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E23\u0E32\u0E04\u0E32\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A":W>150?" \u2014 \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23":""}`];
      if (w[0]) {
        const p = e.length > 0 ? Math.round(w[1] / e.length * 100) : 0;
        C.push(`\u{1F465} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${w[0]} \u0E1B\u0E35 \u0E08\u0E33\u0E19\u0E27\u0E19 ${w[1]} \u0E23\u0E32\u0E22 (${p}%) \u2014 ${w[0]==="55-59"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E43\u0E01\u0E25\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 \u0E15\u0E49\u0E2D\u0E07\u0E43\u0E2B\u0E49\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E0A\u0E48\u0E2D\u0E07\u0E1B\u0E32\u0E01\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E42\u0E23\u0E04":w[0]==="25-34"?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E19\u0E49\u0E19 health promotion \u0E41\u0E25\u0E30 follow-up periodic":"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E01\u0E25\u0E32\u0E07\u0E27\u0E31\u0E22 \u0E04\u0E27\u0E23\u0E01\u0E23\u0E30\u0E15\u0E38\u0E49\u0E19\u0E04\u0E27\u0E32\u0E21\u0E15\u0E23\u0E30\u0E2B\u0E19\u0E31\u0E01\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E0A\u0E48\u0E2D\u0E07\u0E1B\u0E32\u0E01"}`)
      }
      if (h[0] && C.push(`\u{1F9B7} \u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${h[0].code} ${h[0].name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${h[0].count} \u0E23\u0E32\u0E22 \u2014 ${h[0].code.startsWith("K02")?"\u0E1F\u0E31\u0E19\u0E1C\u0E38 \u0E04\u0E27\u0E23\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E01\u0E32\u0E23\u0E43\u0E2B\u0E49\u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1B\u0E23\u0E07\u0E1F\u0E31\u0E19\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C\u0E17\u0E35\u0E48\u0E1A\u0E49\u0E32\u0E19":"\u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E41\u0E19\u0E27\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E41\u0E25\u0E30\u0E2A\u0E48\u0E07\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E17\u0E35\u0E48\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`), f) {
        const [p, l] = f, v = e.length > 0 ? Math.round(l.count / e.length * 100) : 0;
        v >= 50 && C.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${p} ${l.count} \u0E23\u0E32\u0E22 (${v}%) \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19`)
      }
      b0.total < 50 && C.push(`\u26A0\uFE0F \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E15\u0E48\u0E33 (${b0.total} \u0E23\u0E32\u0E22) \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E33 outreach \u0E43\u0E19\u0E0A\u0E38\u0E21\u0E0A\u0E19 \u0E40\u0E0A\u0E48\u0E19 \u0E01\u0E32\u0E23\u0E1B\u0E23\u0E30\u0E0A\u0E32\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E1C\u0E48\u0E32\u0E19\u0E2D\u0E2A\u0E21., \u0E08\u0E31\u0E14\u0E01\u0E34\u0E08\u0E01\u0E23\u0E23\u0E21\u0E43\u0E19\u0E0A\u0E38\u0E21\u0E0A\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07`);
      const V = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E40\u0E04\u0E25\u0E37\u0E2D\u0E1A\u0E1F\u0E25\u0E39\u0E2D\u0E2D\u0E44\u0E23\u0E14\u0E4C \xB7 HOSxP XE Live",
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
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "10px"
          },
          children: [{
            label: "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            value: b0.total.toLocaleString(),
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
            value: I.length,
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
            }), I.map(([p, l], v) => {
              const o = e.length > 0 ? Math.round(l.count / e.length * 100) : 0,
                c = ["#0ea5e9", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"],
                m = c[v % c.length];
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
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38 (25-59 \u0E1B\u0E35)"
            }), u.jsx("div", {
              style: {
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                height: "80px",
                paddingTop: "4px"
              },
              children: Object.entries(x).map(([p, l]) => u.jsxs("div", {
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
                    height: `${Math.max(8,l/g*60)}px`,
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
              children: h.map((p, l) => {
                const v = a > 0 ? Math.round(p.count / a * 100) : 0;
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
                        width: `${v}%`,
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
            ref: N,
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
                    background: "rgba(14,165,233,.1)",
                    color: "#0284c7",
                    border: "1px solid rgba(14,165,233,.2)"
                  },
                  children: [b0.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                children: iu(e).map((p, l) => {
                  const v = l % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: v,
                      transition: "background .1s"
                    },
                    onMouseEnter: o => o.currentTarget.style.background = "rgba(14,165,233,.05)",
                    onMouseLeave: o => o.currentTarget.style.background = v,
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
                    children: [x0 !== "all" && b0.total > x0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", x0, " \u0E08\u0E32\u0E01 ", b0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", b0.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", k.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
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
              children: b0.timestamp && new Date(b0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), C.length > 0 ? u.jsx(Du, {
          data: V,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && (n === "pt" || n === "staff-services") && X?.patients && (() => {
      const e = X.patients,
        t = X.total_income || 0,
        d = e.length > 0 ? Math.round(t / e.length) : 0;
      e.length > 0 && Math.max(...e.map(y => y.income || 0));
      const k = X.opd_count || e.filter(y => y.visit_type === "OPD").length,
        r = X.ipd_count || e.filter(y => y.visit_type === "IPD").length,
        h = X.opd_income || e.filter(y => y.visit_type === "OPD").reduce((y, T) => y + T.income, 0),
        a = X.ipd_income || e.filter(y => y.visit_type === "IPD").reduce((y, T) => y + T.income, 0),
        x = {};
      e.forEach(y => {
        const T = (y.icd10 || "").trim().toUpperCase();
        T && ru.test(T) && (x[T] || (x[T] = {
          code: T,
          name: y.icd10name,
          count: 0,
          totalInc: 0
        }), x[T].count++, x[T].totalInc += y.income || 0)
      });
      const g = Object.values(x).sort((y, T) => T.count - y.count).slice(0, 10),
        A = g.length > 0 ? g[0].count : 1,
        $ = {};
      e.forEach(y => {
        const T = y.department || "-";
        $[T] || ($[T] = {
          count: 0,
          income: 0
        }), $[T].count++, $[T].income += y.income || 0
      });
      const I = Object.entries($).sort((y, T) => T[1].count - y[1].count),
        S = {
          "<18": 0,
          "18-34": 0,
          "35-59": 0,
          "60+": 0
        };
      e.forEach(y => {
        const T = Number(y.age_y) || 0;
        T < 18 ? S["<18"]++ : T < 35 ? S["18-34"]++ : T < 60 ? S["35-59"]++ : S["60+"]++
      });
      const w = Math.max(...Object.values(S), 1),
        W = {
          "<18": "#3b82f6",
          "18-34": "#10b981",
          "35-59": "#f59e0b",
          "60+": "#ef4444"
        },
        f = {};
      e.forEach(y => {
        const T = (y.vstdate || "").substring(0, 10);
        T && (f[T] = f[T] || {
          date: T,
          count: 0,
          income: 0
        }, f[T].count++, f[T].income += y.income || 0)
      });
      const C = Object.values(f).sort((y, T) => y.date.localeCompare(T.date)),
        V = Math.max(...C.map(y => y.count), 1),
        p = C.reduce((y, T) => y + T.income, 0),
        l = C.length > 0 ? Math.round(e.length / C.length) : 0,
        v = X.yoy || null,
        o = (y, T) => v == null || T == null || T === 0 ? null : Math.round((y - T) / T * 1e3) / 10,
        c = v && v.total > 0 ? Math.round(v.total_income / v.total) : null,
        m = (y, T, D) => {
          if (y == null) return null;
          const u0 = y >= 0;
          return {
            text: `${u0?"\u25B2":"\u25BC"} ${u0?"+":""}${y.toFixed(1)}%`,
            compare: `vs ${(T||0).toLocaleString()} ${D||""}`,
            fg: u0 ? "#059669" : "#dc2626",
            bg: u0 ? "rgba(16,185,129,.10)" : "rgba(239,68,68,.10)"
          }
        },
        R = n === "staff-services" ? "\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 & PMC",
        b = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
        j = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" : "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
        K = n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E21\u0E48" : "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E2B\u0E21\u0E48",
        _ = new Set(e.map(y => y.hn).filter(Boolean)).size,
        F = Object.values(e.reduce((y, T) => (T.hn && (y[T.hn] = (y[T.hn] || 0) + 1), y), {})).filter(y => y > 1).length,
        J = e.length - _,
        q = _ > 0 ? Math.round(J / e.length * 100) : 0,
        P = C.length > 0 ? C.reduce((y, T) => T.count > y.count ? T : y, C[0]) : null,
        Z = C.length > 0 ? C.reduce((y, T) => T.count < y.count ? T : y, C[0]) : null,
        A0 = I.length > 0 ? I[0] : null,
        f0 = g.length > 0 ? g[0] : null,
        uu = v ? o(X.total, v.total) : null,
        J0 = v ? o(t, v.total_income) : null,
        Q0 = [];
      if (Q0.push(`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21${R} (${X.date_range?.start||""} \u0E16\u0E36\u0E07 ${X.date_range?.end||""}): ${j} ${X.total.toLocaleString()} \u0E23\u0E32\u0E22 (\u0E08\u0E32\u0E01 ${_.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${d.toLocaleString()} \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22${uu!=null?` \xB7 ${uu>=0?"\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(uu).toFixed(1)}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27\u0E01\u0E31\u0E19\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19`:""}`), J0 != null && Math.abs(J0) >= 20 && Q0.push(J0 >= 0 ? `\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D ${J0.toFixed(1)}% YoY (${(v.total_income||0).toLocaleString()} \u2192 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17) \u2014 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19/\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E49\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E01\u0E29\u0E32\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23` : `\u{1F4C9} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E25\u0E07 ${Math.abs(J0).toFixed(1)}% YoY \u2014 \u0E04\u0E27\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38: \u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E41\u0E1B\u0E25\u0E07\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 \xB7 \u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E25\u0E14 \xB7 \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2B\u0E32\u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A`), P && Z && P.date !== Z.date && C.length >= 3 && Q0.push(`\u{1F4C5} \u0E27\u0E31\u0E19\u0E17\u0E35\u0E48${b}\u0E21\u0E32\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${P.date.substring(5)} (${P.count} \u0E23\u0E32\u0E22) \xB7 \u0E19\u0E49\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${Z.date.substring(5)} (${Z.count} \u0E23\u0E32\u0E22) \u2014 ${P.count>Z.count*3?"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D \u0E04\u0E27\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E27\u0E48\u0E32\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E19\u0E49\u0E2D\u0E22\u0E21\u0E35\u0E1B\u0E31\u0E0D\u0E2B\u0E32 (\u0E27\u0E31\u0E19\u0E2B\u0E22\u0E38\u0E14/\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22) \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \u0E41\u0E25\u0E30\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E23\u0E31\u0E1A\u0E20\u0E32\u0E23\u0E30\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E21\u0E32\u0E01":"\u0E01\u0E32\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07\u0E1B\u0E01\u0E15\u0E34"}`), A0) {
        const [y, T] = A0, D = e.length > 0 ? Math.round(T.count / e.length * 100) : 0;
        Q0.push(`\u{1F3E5} \u0E2B\u0E19\u0E48\u0E27\u0E22\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${y.replace(/^\d+\s*/,"")} ${T.count} \u0E23\u0E32\u0E22 (${D}% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${(T.income||0).toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17${D>=60?" \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \u0E04\u0E27\u0E23\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E20\u0E32\u0E23\u0E30\u0E44\u0E1B\u0E2B\u0E19\u0E48\u0E27\u0E22\u0E2D\u0E37\u0E48\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07":""}`)
      }
      if (f0 && ru.test(f0.code) && Q0.push(`\u{1FA7A} \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${f0.code} ${f0.name||""} \u0E08\u0E33\u0E19\u0E27\u0E19 ${f0.count} \u0E23\u0E32\u0E22 \u2014 ${f0.code.startsWith("M")?"\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E01\u0E25\u0E49\u0E32\u0E21\u0E40\u0E19\u0E37\u0E49\u0E2D/\u0E02\u0E49\u0E2D \u0E04\u0E27\u0E23\u0E23\u0E30\u0E1A\u0E38\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07/\u0E23\u0E30\u0E22\u0E30\u0E43\u0E2B\u0E49\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E2B\u0E31\u0E2A\u0E44\u0E14\u0E49\u0E41\u0E21\u0E48\u0E19\u0E22\u0E33":"\u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E17\u0E33 protocol \u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E"}`), _ > 0 && q >= 5 && Q0.push(`\u{1F501} \u0E21\u0E35${b}\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33 ${J.toLocaleString()} visits \u0E08\u0E32\u0E01 ${F.toLocaleString()} HN (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${(e.length/_).toFixed(1)} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19) \u2014 ${q>=30?"\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E2A\u0E39\u0E07\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E02\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E23\u0E31\u0E01\u0E29\u0E32 \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01":"\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33\u0E1B\u0E01\u0E15\u0E34 \u2014 \u0E40\u0E19\u0E49\u0E19\u0E40\u0E0A\u0E34\u0E0D\u0E0A\u0E27\u0E19"+K+"\u0E40\u0E1E\u0E34\u0E48\u0E21"}`), A && A.length > 0 && A[0]) {
        const y = A[0],
          T = e.length > 0 ? Math.round(y.count / e.length * 100) : 0;
        T >= 50 && Q0.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${y.name} ${y.count} \u0E23\u0E32\u0E22 (${T}%) \u2014 \u0E21\u0E35\u0E01\u0E32\u0E23\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E35\u0E22\u0E27\u0E2A\u0E39\u0E07 \xB7 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E43\u0E2B\u0E49\u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19 \u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18`)
      }
      const yu = {
        data_source: `AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C${R} \xB7 HOSxP XE Live`,
        timestamp: new Date().toISOString(),
        recommendations: Q0
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
          children: [...n === "staff-services" && X.staff_registry_count ? [{
            label: "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
            icon: "\u{1F465}",
            value: X.staff_registry_count.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#7c3aed",
            yoy: (() => {
              const y = _,
                T = X.staff_registry_count > 0 ? Math.round(y / X.staff_registry_count * 1e3) / 10 : 0;
              return {
                text: `\u{1F4CA} \u0E21\u0E32\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 ${y.toLocaleString()} \u0E23\u0E32\u0E22 (${T}%)`,
                compare: `\u0E44\u0E21\u0E48\u0E21\u0E32 ${(X.staff_registry_count-y).toLocaleString()} \u0E23\u0E32\u0E22`,
                fg: T >= 50 ? "#059669" : "#d97706",
                bg: T >= 50 ? "rgba(16,185,129,.10)" : "rgba(217,119,6,.10)"
              }
            })()
          }] : [], {
            label: n === "staff-services" ? "\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23\u0E17\u0E35\u0E48\u0E40\u0E02\u0E49\u0E32\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23" : "\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            icon: "\u{1F465}",
            value: (n === "staff-services" ? _ : X.total).toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#10b981",
            yoy: n === "staff-services" ? (() => {
              const y = o(_, v?.unique_hn),
                T = X.total.toLocaleString(),
                D = _ > 0 ? (X.total / _).toFixed(1) : "0";
              if (y == null) return {
                text: `${T} visits`,
                compare: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${D} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19`,
                fg: "#64748b",
                bg: "rgba(100,116,139,.08)"
              };
              const u0 = y >= 0;
              return {
                text: `${u0?"\u25B2":"\u25BC"} ${u0?"+":""}${y.toFixed(1)}%`,
                compare: `vs ${(v?.unique_hn||0).toLocaleString()} \u0E23\u0E32\u0E22 \xB7 ${T} visits (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${D}/\u0E04\u0E19)`,
                fg: u0 ? "#059669" : "#dc2626",
                bg: u0 ? "rgba(16,185,129,.10)" : "rgba(239,68,68,.10)"
              }
            })() : m(o(X.total, v?.total), v?.total, "\u0E23\u0E32\u0E22")
          }, ...n === "staff-services" ? [{
            label: "\u0E08\u0E33\u0E19\u0E27\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
            icon: "\u{1F4CB}",
            value: X.total.toLocaleString(),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            color: "#0d9488",
            yoy: m(o(X.total, v?.total), v?.total, "\u0E04\u0E23\u0E31\u0E49\u0E07")
          }] : [], {
            label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01 (OPD)",
            icon: "\u{1F6AA}",
            value: k.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            yoy: m(o(k, v?.opd_count), v?.opd_count, "\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD)",
            icon: "\u{1F6CF}\uFE0F",
            value: r.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ef4444",
            yoy: m(o(r, v?.ipd_count), v?.ipd_count, "\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            icon: "\u{1F4B0}",
            value: t.toLocaleString(void 0, {
              maximumFractionDigits: 0
            }),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#3b82f6",
            yoy: m(o(t, v?.total_income), v?.total_income, "\u0E3F")
          }, {
            label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 / \u0E23\u0E32\u0E22",
            icon: "\u{1F4CA}",
            value: d.toLocaleString(),
            unit: "\u0E1A\u0E32\u0E17",
            color: "#8b5cf6",
            yoy: m(o(d, c), c, "\u0E3F/\u0E23\u0E32\u0E22")
          }, {
            label: "\u0E41\u0E1C\u0E19\u0E01",
            icon: "\u{1F3E5}",
            value: I.length,
            unit: "\u0E41\u0E1C\u0E19\u0E01",
            color: "#ec4899",
            yoy: null
          }].map((y, T) => u.jsxs("div", {
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
            onMouseEnter: D => {
              D.currentTarget.style.transform = "translateY(-2px)", D.currentTarget.style.boxShadow = `0 8px 24px ${y.color}25`
            },
            onMouseLeave: D => {
              D.currentTarget.style.transform = "", D.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,.04)"
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
          }, T))
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
            }), I.map(([y, T], D) => {
              const u0 = e.length > 0 ? Math.round(T.count / e.length * 100) : 0,
                m0 = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"],
                P0 = m0[D % m0.length];
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
                      color: P0
                    },
                    children: [T.count, " (", u0, "%)"]
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
                      width: `${u0}%`,
                      borderRadius: "3px",
                      background: P0,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, D)
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
              children: Object.entries(S).map(([y, T]) => u.jsxs("div", {
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
                    color: W[y]
                  },
                  children: T
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: W[y],
                    height: `${Math.max(8,T/w*60)}px`,
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
              children: g.map((y, T) => {
                const D = A > 0 ? Math.round(y.count / A * 100) : 0;
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
                        width: `${D}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(16,185,129,.25), rgba(16,185,129,.${T===0?"5":"3"}))`,
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
                }, T)
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
              children: [C.length, " \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", l, " \u0E23\u0E32\u0E22/\u0E27\u0E31\u0E19 \xB7 \u0E23\u0E27\u0E21 ", p.toLocaleString(), " \u0E1A\u0E32\u0E17"]
            })]
          }), C.length === 0 ? u.jsx("div", {
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
            children: C.map(y => u.jsxs("div", {
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
                  height: `${Math.max(8,y.count/V*80)}px`,
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
            ref: N,
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
                    children: [X.date_range.start, " \u0E16\u0E36\u0E07 ", X.date_range.end]
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
                  children: [X.total.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                children: iu(e).map((y, T) => {
                  const D = T % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent",
                    u0 = y.visit_type === "IPD";
                  return u.jsxs("tr", {
                    style: {
                      background: D,
                      transition: "background .1s"
                    },
                    onMouseEnter: m0 => m0.currentTarget.style.background = "rgba(59,130,246,.05)",
                    onMouseLeave: m0 => m0.currentTarget.style.background = D,
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
                          background: u0 ? "rgba(239,68,68,.1)" : "rgba(14,165,233,.1)",
                          color: u0 ? "#dc2626" : "#0284c7",
                          border: `1px solid ${u0?"rgba(239,68,68,.2)":"rgba(14,165,233,.2)"}`
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
                        color: u0 ? "#dc2626" : "var(--md-text-tertiary)"
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
                  }, y.vn || T)
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
                    children: [x0 !== "all" && X.total > x0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", x0, " \u0E08\u0E32\u0E01 ", X.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", X.total.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 OPD ", k, " (", h.toLocaleString(), " \u0E3F) \xB7 IPD ", r, " (", a.toLocaleString(), " \u0E3F) \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", d.toLocaleString(), " \u0E1A\u0E32\u0E17/\u0E23\u0E32\u0E22"]
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
              children: X.timestamp && new Date(X.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), Q0.length > 0 ? u.jsx(Du, {
          data: yu,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "ncd-disease" && M0 && (() => {
      const {
        pts: e,
        totalIncome: t,
        uniquePatients: d,
        avgIncome: k,
        maleCount: r,
        femaleCount: h,
        ageGroups: a,
        ageMax: x,
        topIcd: g,
        rightList: A
      } = M0, $ = g0.diseases || ["DM", "HT", "DLP", "IHD", "Stroke", "COPD", "CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD", "Other"], I = g0.disease_labels || {}, S = M0.diseaseCountsFE || g0.disease_counts || {}, w = {
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
      }, W = Math.max(...$.map(j => S[j] || 0), 1), f = {
        "<40": "#06b6d4",
        "40-49": "#3b82f6",
        "50-59": "#10b981",
        "60-69": "#f59e0b",
        "70+": "#ef4444"
      }, C = g.slice(0, 10), V = C.length > 0 ? C[0].count : 1, p = $.filter(j => (S[j] || 0) > 0 && j !== "Other").sort((j, K) => (S[K] || 0) - (S[j] || 0)), l = p[0], v = p[1], o = ["CKD1", "CKD2", "CKD3", "CKD4", "CKD5"].reduce((j, K) => j + (S[K] || 0), 0), c = (S.CKD3 || 0) + (S.CKD4 || 0) + (S.CKD5 || 0), m = e.length > 0 ? Math.round(t / e.length) : 0, R = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21 NCD: ${e.length.toLocaleString()} visits \u0E08\u0E32\u0E01 ${d.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33 \xB7 \u0E0A\u0E32\u0E22 ${r} \u0E23\u0E32\u0E22 / \u0E2B\u0E0D\u0E34\u0E07 ${h} \u0E23\u0E32\u0E22 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 ${t.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m.toLocaleString()} \u0E1A\u0E32\u0E17/visit`];
      if (l && R.push(`\u{1FA7A} \u0E42\u0E23\u0E04\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${I[l]||l} ${(S[l]||0).toLocaleString()} \u0E23\u0E32\u0E22${v?` \xB7 \u0E23\u0E2D\u0E07\u0E21\u0E32 ${I[v]||v} ${(S[v]||0).toLocaleString()} \u0E23\u0E32\u0E22`:""}${["DM","HT","DLP"].includes(l)?" \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19 NCD \u0E04\u0E27\u0E23\u0E40\u0E02\u0E49\u0E21\u0E07\u0E27\u0E14\u0E40\u0E23\u0E37\u0E48\u0E2D\u0E07 self-care + \u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25 HbA1c/BP":l==="Stroke"||l==="IHD"?" \u2014 \u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08\u0E2B\u0E25\u0E2D\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E14 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E39\u0E07 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19 specialist \u0E41\u0E25\u0E30 rehab":""}`), o > 0) {
        const j = d > 0 ? Math.round(o / d * 100) : 0,
          K = o > 0 ? Math.round(c / o * 100) : 0;
        R.push(`\u{1FAC0} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E23\u0E27\u0E21 ${o.toLocaleString()} \u0E23\u0E32\u0E22 (${j}% \u0E02\u0E2D\u0E07 HN) \xB7 \u0E23\u0E30\u0E22\u0E30 3-5 ${c.toLocaleString()} \u0E23\u0E32\u0E22 (${K}%) \u2014 ${c>=50?"\u{1F534} \u0E21\u0E35 CKD \u0E23\u0E30\u0E22\u0E30\u0E25\u0E36\u0E01\u0E08\u0E33\u0E19\u0E27\u0E19\u0E21\u0E32\u0E01 \u0E15\u0E49\u0E2D\u0E07 early referral \u0E44\u0E1B\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 nephrology + \u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 dialysis":c>=10?"\u{1F7E0} \u0E04\u0E27\u0E23 monitor eGFR \u0E17\u0E38\u0E01 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 + \u0E1B\u0E23\u0E31\u0E1A\u0E22\u0E32\u0E43\u0E2B\u0E49\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07":"\u{1F7E2} \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E23\u0E30\u0E22\u0E30\u0E15\u0E49\u0E19 \u0E04\u0E27\u0E23\u0E40\u0E19\u0E49\u0E19 primary prevention"}`)
      }
      if (C[0] && R.push(`\u{1F48A} \u0E23\u0E2B\u0E31\u0E2A ICD-10 \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22\u0E2A\u0E38\u0E14: ${C[0].code} ${C[0].name||""} (${C[0].count} \u0E23\u0E32\u0E22) \u2014 ${C[0].code.startsWith("E11")||C[0].code.startsWith("E10")?"DM \u0E04\u0E27\u0E23\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 complications: retinopathy, neuropathy, nephropathy":C[0].code.startsWith("I10")?"Hypertension \u0E04\u0E27\u0E23 monitor BP \u0E17\u0E38\u0E01 visit + \u0E1B\u0E23\u0E31\u0E1A lifestyle":C[0].code.startsWith("N18")?"CKD progression \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E43\u0E01\u0E25\u0E49\u0E0A\u0E34\u0E14":"\u0E04\u0E27\u0E23\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 comorbidities \u0E40\u0E1E\u0E37\u0E48\u0E2D holistic care"}`), (S.DM || 0) > 0 && (S.HT || 0) > 0) {
        const j = Math.min(S.DM, S.HT);
        R.push(`\u26A0\uFE0F \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 DM + HT \u0E23\u0E48\u0E27\u0E21: \u0E04\u0E32\u0E14\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${j.toLocaleString()} \u0E23\u0E32\u0E22 (overlap) \u2014 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 CV/CKD \u0E2A\u0E39\u0E07 \xB7 \u0E04\u0E27\u0E23\u0E21\u0E35 integrated NCD clinic \u0E17\u0E35\u0E48\u0E14\u0E39\u0E41\u0E25\u0E04\u0E23\u0E1A\u0E17\u0E31\u0E49\u0E07 2 \u0E42\u0E23\u0E04\u0E43\u0E19\u0E04\u0E23\u0E31\u0E49\u0E07\u0E40\u0E14\u0E35\u0E22\u0E27 \u0E25\u0E14 visit \u0E0B\u0E49\u0E33`)
      }
      R.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22: NCD \u0E40\u0E1B\u0E47\u0E19 70% \u0E02\u0E2D\u0E07 DALYs \u0E43\u0E19\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28\u0E44\u0E17\u0E22 \xB7 \u0E04\u0E27\u0E23\u0E2A\u0E23\u0E49\u0E32\u0E07 patient registry, integrated care pathway, telehealth follow-up \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 HbA1c<7%, BP<140/90 \u0E43\u0E19\u0E17\u0E38\u0E01 guidelines");
      const b = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C NCD \u0E41\u0E22\u0E01\u0E42\u0E23\u0E04 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: R
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
            value: h.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#ec4899",
            gradient: "linear-gradient(135deg, rgba(236,72,153,.12), rgba(236,72,153,.04))",
            border: "rgba(236,72,153,.25)"
          }].map((j, K) => u.jsxs("div", {
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
          }, K))
        }), (() => {
          const j = ["DM", "HT", "DLP", "IHD", "Stroke", "COPD"].filter(P => $.includes(P)),
            K = ["CKD1", "CKD2", "CKD3", "CKD4", "CKD5", "CKD"].filter(P => $.includes(P)),
            _ = S.Other || 0,
            F = K.reduce((P, Z) => P + (S[Z] || 0), 0),
            J = ({
              dg: P
            }) => {
              const Z = S[P] || 0,
                A0 = e.length > 0 ? Math.round(Z / e.length * 100) : 0,
                f0 = w[P] || "#7c3aed";
              return u.jsxs("div", {
                style: {
                  background: `linear-gradient(135deg, ${f0}14, ${f0}06)`,
                  border: `1px solid ${f0}33`,
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
                    background: f0,
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
                      color: f0,
                      letterSpacing: ".02em"
                    },
                    children: P
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: f0,
                      opacity: .85,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: `${f0}1a`
                    },
                    children: [A0, "%"]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)",
                    lineHeight: 1
                  },
                  children: [Z.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "5px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: I[P],
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: I[P]
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
                      width: `${Z/W*100}%`,
                      borderRadius: "2px",
                      background: f0,
                      transition: "width .5s ease"
                    }
                  })
                })]
              })
            },
            q = ({
              dg: P
            }) => {
              const Z = S[P] || 0,
                A0 = F > 0 ? Math.round(Z / F * 100) : 0,
                f0 = w[P] || "#10b981",
                uu = P === "CKD" ? "?" : P.replace("CKD", "");
              return u.jsxs("div", {
                style: {
                  background: "var(--md-surface)",
                  border: `1px solid ${f0}30`,
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
                      background: f0,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      letterSpacing: ".03em"
                    },
                    children: ["Stage ", uu]
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)"
                    },
                    children: [A0, "%"]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: f0,
                    lineHeight: 1
                  },
                  children: [Z.toLocaleString(), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      marginLeft: "4px"
                    },
                    children: "visit"
                  })]
                }), u.jsx("div", {
                  title: I[P],
                  style: {
                    fontSize: "9px",
                    color: "var(--md-text-tertiary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontWeight: 600
                  },
                  children: I[P]?.replace(/^CKD Stage \d+ /, "").replace(/^CKD /, "")
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
                  gridTemplateColumns: `repeat(${Math.min(j.length,6)}, minmax(0, 1fr))`,
                  gap: "10px"
                },
                children: j.map(P => u.jsx(J, {
                  dg: P
                }, P))
              })]
            }), K.length > 0 && u.jsxs("div", {
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
                  gridTemplateColumns: `repeat(${K.length}, minmax(0, 1fr))`,
                  gap: "8px"
                },
                children: K.map(P => u.jsx(q, {
                  dg: P
                }, P))
              })]
            }), _ > 0 && u.jsxs("div", {
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
                  children: I.Other || "\u0E21\u0E32\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01 NCD \u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04 NCD"
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
                  children: _.toLocaleString()
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
                  children: ["(", e.length > 0 ? Math.round(_ / e.length * 100) : 0, "%)"]
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
            }), A.slice(0, 8).map(([j, K], _) => {
              const F = e.length > 0 ? Math.round(K.count / e.length * 100) : 0,
                J = ["#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                q = J[_ % J.length];
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
                      color: q
                    },
                    children: [K.count, " (", F, "%)"]
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
                      background: q,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, _)
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
              children: Object.entries(a).map(([j, K]) => u.jsxs("div", {
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
                    color: f[j]
                  },
                  children: K
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: f[j],
                    height: `${Math.max(8,K/x*60)}px`,
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
              children: "Top ICD-10 NCD"
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              },
              children: C.map((j, K) => {
                const _ = V > 0 ? Math.round(j.count / V * 100) : 0;
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
                        width: `${_}%`,
                        borderRadius: "4px",
                        background: `linear-gradient(90deg, rgba(168,85,247,.25), rgba(168,85,247,.${K===0?"5":"3"}))`,
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
                }, K)
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
            ref: N,
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
                    children: [g0.date_range.start, " \u0E16\u0E36\u0E07 ", g0.date_range.end]
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
                children: iu(e).map((j, K) => {
                  const _ = K % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: _,
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
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: j.cid || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: j.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px",
                        color: "var(--md-text-tertiary)"
                      },
                      children: j.vsttime || "\u2014"
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
                      title: j.address,
                      children: j.address || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: j.mobile_phone_number || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(168,85,247,.04)",
                        fontWeight: 800,
                        color: "#a855f7",
                        fontSize: "11px"
                      },
                      children: j.disease_groups || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.03)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#059669"
                      },
                      children: j.icd10 || "\u2014"
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
                      title: j.icd10name,
                      children: j.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.025)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        color: "var(--md-text-secondary)"
                      },
                      children: j.creatinine != null ? Number(j.creatinine).toFixed(2) : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.025)",
                        fontWeight: 800,
                        color: j.egfr == null ? "var(--md-text-tertiary)" : j.egfr < 30 ? "#dc2626" : j.egfr < 60 ? "#ea580c" : "#059669"
                      },
                      children: j.egfr != null ? j.egfr : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(16,185,129,.025)"
                      },
                      children: j.ckd_stage ? u.jsx("span", {
                        style: {
                          padding: "2px 8px",
                          borderRadius: "99px",
                          fontSize: "10px",
                          fontWeight: 800,
                          background: j.ckd_stage === "CKD5" ? "rgba(220,38,38,.12)" : j.ckd_stage === "CKD4" ? "rgba(234,88,12,.12)" : j.ckd_stage === "CKD3" ? "rgba(245,158,11,.12)" : "rgba(16,185,129,.12)",
                          color: j.ckd_stage === "CKD5" ? "#dc2626" : j.ckd_stage === "CKD4" ? "#ea580c" : j.ckd_stage === "CKD3" ? "#d97706" : "#059669"
                        },
                        children: j.ckd_stage
                      }) : "\u2014"
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
                  }, j.vn || K)
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
                    children: [x0 !== "all" && e.length > x0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", x0, " \u0E08\u0E32\u0E01 ", e.length.toLocaleString(), " visit \xB7"]
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
              children: g0.timestamp && new Date(g0.timestamp).toLocaleString("th-TH")
            })]
          })]
        }), R.length > 0 ? u.jsx(Du, {
          data: b,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "imaging-services" && i0?.patients && (() => {
      const e = i0.patients,
        t = i0.services || ["XRAY", "CT", "Portable", "BMD"],
        d = i0.service_labels || {},
        k = i0.service_counts || {},
        r = i0.total_income || 0,
        h = i0.total_imaging_price || 0,
        a = i0.unique_patients || 0,
        x = e.length > 0 ? Math.round(h / e.length) : 0,
        g = e.filter(_ => _.sex === "\u0E0A\u0E32\u0E22").length,
        A = e.filter(_ => _.sex === "\u0E2B\u0E0D\u0E34\u0E07").length,
        $ = {
          XRAY: "#3b82f6",
          CT: "#7c3aed",
          Portable: "#f59e0b",
          BMD: "#ec4899"
        },
        I = Math.max(...t.map(_ => k[_] || 0), 1),
        S = {
          "<20": 0,
          "20-39": 0,
          "40-59": 0,
          "60-79": 0,
          "80+": 0
        };
      e.forEach(_ => {
        const F = Number(_.age_y) || 0;
        F < 20 ? S["<20"]++ : F < 40 ? S["20-39"]++ : F < 60 ? S["40-59"]++ : F < 80 ? S["60-79"]++ : S["80+"]++
      });
      const w = Math.max(...Object.values(S), 1),
        W = {
          "<20": "#06b6d4",
          "20-39": "#3b82f6",
          "40-59": "#10b981",
          "60-79": "#f59e0b",
          "80+": "#ef4444"
        },
        f = {};
      e.forEach(_ => {
        (_.icd_pairs || "").split("||").filter(Boolean).forEach(F => {
          const [J, q] = F.split("::"), P = (J || "").trim().toUpperCase();
          !P || !ru.test(P) || (f[P] || (f[P] = {
            code: P,
            name: q || "",
            count: 0,
            totalInc: 0
          }), f[P].count++, f[P].totalInc += _.income || 0)
        })
      });
      const C = Object.values(f).sort((_, F) => F.count - _.count).slice(0, 10),
        V = C.length > 0 ? C[0].count : 1,
        p = {};
      e.forEach(_ => {
        const F = _.pttype_name || "-";
        p[F] || (p[F] = {
          count: 0,
          income: 0
        }), p[F].count++, p[F].income += _.income || 0
      });
      const l = Object.entries(p).sort((_, F) => F[1].count - _[1].count),
        v = t.reduce((_, F) => _ + (k[F] || 0), 0),
        o = t.reduce((_, F) => (k[F] || 0) > (k[_] || 0) ? F : _, t[0]),
        c = Object.entries(S).reduce((_, [F, J]) => J > _[1] ? [F, J] : _, ["", 0]),
        m = e.length > 0 ? Math.round(h / e.length) : 0,
        R = C.length > 0 ? C[0] : null,
        b = l.length > 0 ? l[0] : null,
        j = [`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32: ${e.length.toLocaleString()} visits \u0E08\u0E32\u0E01 ${a.toLocaleString()} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33 \xB7 \u0E04\u0E48\u0E32\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 ${h.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m.toLocaleString()} \u0E1A\u0E32\u0E17/visit \xB7 \u0E0A\u0E32\u0E22 ${g} / \u0E2B\u0E0D\u0E34\u0E07 ${A}`];
      if (o && v > 0) {
        const _ = Math.round((k[o] || 0) / v * 100);
        j.push(`\u{1FA7B} \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${o} ${(k[o]||0).toLocaleString()} \u0E04\u0E23\u0E31\u0E49\u0E07 (${_}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14) \u2014 ${o==="XRAY"?"X-Ray \u0E40\u0E1B\u0E47\u0E19 routine \u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 \u0E04\u0E27\u0E23 monitor TAT \u0E43\u0E2B\u0E49 \u226430 \u0E19\u0E32\u0E17\u0E35":o==="CT"?"CT \u0E21\u0E35\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E2A\u0E39\u0E07 \u0E15\u0E49\u0E2D\u0E07 justify clinical indication \u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E02\u0E49\u0E21\u0E07\u0E27\u0E14 \u0E25\u0E14 unnecessary scan":o==="Portable"?"Portable X-Ray \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E40\u0E15\u0E35\u0E22\u0E07 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E41\u0E25\u0E30 infection control":"\u0E15\u0E23\u0E27\u0E08\u0E01\u0E23\u0E30\u0E14\u0E39\u0E01 \u0E04\u0E27\u0E23\u0E2A\u0E2D\u0E14\u0E04\u0E25\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E1A T-score follow-up plan"}`)
      }
      if (c[0]) {
        const _ = e.length > 0 ? Math.round(c[1] / e.length * 100) : 0;
        j.push(`\u{1F465} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${c[0]} \u0E1B\u0E35 ${c[1]} \u0E23\u0E32\u0E22 (${_}%) \u2014 ${c[0]==="60-79"||c[0]==="80+"?"\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2B\u0E25\u0E31\u0E01 \u0E04\u0E27\u0E23\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 CXR + BMD \u0E40\u0E1B\u0E47\u0E19\u0E0A\u0E38\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E1B\u0E23\u0E30\u0E08\u0E33\u0E1B\u0E35":c[0]==="40-59"?"\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19 \u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E08\u0E32\u0E01 trauma \u0E2B\u0E23\u0E37\u0E2D chronic disease screening":"\u0E27\u0E31\u0E22\u0E2B\u0E19\u0E38\u0E48\u0E21\u0E2A\u0E32\u0E27/\u0E40\u0E14\u0E47\u0E01 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E48\u0E27\u0E19\u0E43\u0E2B\u0E0D\u0E48\u0E08\u0E32\u0E01 trauma + acute condition"}`)
      }
      if (R && j.push(`\u{1F50D} \u0E02\u0E49\u0E2D\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E1A\u0E48\u0E2D\u0E22: ${R.code} ${R.name||""} (${R.count} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${R.totalInc.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17) \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21\u0E15\u0E32\u0E21 ACR appropriateness criteria`), b) {
        const [_, F] = b, J = e.length > 0 ? Math.round(F.count / e.length * 100) : 0;
        J >= 40 && j.push(`\u{1F3AB} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${_} ${F.count} \u0E04\u0E23\u0E31\u0E49\u0E07 (${J}%) \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${F.income.toLocaleString(void 0,{maximumFractionDigits:0})} \u0E1A\u0E32\u0E17`)
      }
      j.push("\u{1F4A1} \u0E41\u0E19\u0E30\u0E19\u0E33\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E23\u0E31\u0E07\u0E2A\u0E35: (1) \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A TAT \u0E02\u0E2D\u0E07 report turnaround \u226424 \u0E0A\u0E21. \xB7 (2) Audit indication \u0E02\u0E2D\u0E07 CT \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 (3) \u0E25\u0E14 radiation exposure \u0E15\u0E32\u0E21 ALARA \xB7 (4) Tele-radiology \u0E40\u0E1E\u0E37\u0E48\u0E2D second opinion \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19");
      const K = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32 \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: j
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
            value: a.toLocaleString(),
            unit: "\u0E23\u0E32\u0E22",
            color: "#a855f7",
            gradient: "linear-gradient(135deg, rgba(168,85,247,.12), rgba(168,85,247,.04))",
            border: "rgba(168,85,247,.25)"
          }, {
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 Imaging",
            value: h.toLocaleString(void 0, {
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
            value: `${g} / ${A}`,
            unit: "\u0E23\u0E32\u0E22",
            color: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,.12), rgba(14,165,233,.04))",
            border: "rgba(14,165,233,.25)"
          }].map((_, F) => u.jsxs("div", {
            style: {
              background: _.gradient,
              border: `1px solid ${_.border}`,
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
              children: _.label
            }), u.jsxs("div", {
              style: {
                fontSize: "22px",
                fontWeight: 900,
                color: _.color,
                lineHeight: 1.1
              },
              children: [_.value, u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginLeft: "4px"
                },
                children: _.unit
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
            children: t.map(_ => {
              const F = k[_] || 0,
                J = e.length > 0 ? Math.round(F / e.length * 100) : 0,
                q = $[_] || "#7c3aed";
              return u.jsxs("div", {
                style: {
                  background: `linear-gradient(135deg, ${q}14, ${q}06)`,
                  border: `1px solid ${q}33`,
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
                    background: q,
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
                      color: q,
                      letterSpacing: ".02em"
                    },
                    children: _
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: q,
                      opacity: .85,
                      padding: "2px 8px",
                      borderRadius: "99px",
                      background: `${q}1a`
                    },
                    children: [J, "%"]
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
                  title: d[_],
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "6px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: d[_]
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
                      width: `${F/I*100}%`,
                      borderRadius: "2px",
                      background: q,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, _)
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
            }), l.slice(0, 8).map(([_, F], J) => {
              const q = e.length > 0 ? Math.round(F.count / e.length * 100) : 0,
                P = ["#7c3aed", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0ea5e9", "#8b5cf6"],
                Z = P[J % P.length];
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
                    title: _,
                    children: _
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: Z
                    },
                    children: [F.count, " (", q, "%)"]
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
                      width: `${q}%`,
                      borderRadius: "3px",
                      background: Z,
                      transition: "width .5s ease"
                    }
                  })
                })]
              }, J)
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
              children: Object.entries(S).map(([_, F]) => u.jsxs("div", {
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
                    color: W[_]
                  },
                  children: F
                }), u.jsx("div", {
                  style: {
                    width: "100%",
                    borderRadius: "6px 6px 0 0",
                    background: W[_],
                    height: `${Math.max(8,F/w*60)}px`,
                    opacity: .8,
                    transition: "height .5s ease"
                  }
                }), u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: _
                })]
              }, _))
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
              children: C.map((_, F) => {
                const J = V > 0 ? Math.round(_.count / V * 100) : 0;
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
                    children: _.code
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
                        width: `${J}%`,
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
                      children: _.name
                    })]
                  }), u.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      minWidth: "28px",
                      textAlign: "right"
                    },
                    children: _.count
                  }), u.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      minWidth: "50px",
                      textAlign: "right"
                    },
                    children: [_.totalInc.toLocaleString(), " \u0E3F"]
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
            ref: N,
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
                  children: [a.toLocaleString(), " \u0E23\u0E32\u0E22"]
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
                  children: [h.toLocaleString(), " \u0E1A\u0E32\u0E17 (Imaging)"]
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
                children: iu(e).map((_, F) => {
                  const J = F % 2 !== 0 ? "var(--md-surface-2, rgba(0,0,0,.015))" : "transparent";
                  return u.jsxs("tr", {
                    style: {
                      background: J,
                      transition: "background .1s"
                    },
                    children: [u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)"
                      },
                      children: _.no
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        textAlign: "left",
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                      },
                      children: _.pt_name
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontFamily: "monospace",
                        fontSize: "11px"
                      },
                      children: _.hn
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontWeight: 700,
                        color: _.sex === "\u0E0A\u0E32\u0E22" ? "#0ea5e9" : "#ec4899"
                      },
                      children: _.sex || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: _.age_y ?? "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        fontSize: "11px"
                      },
                      children: _.pttype_name || "\u2014"
                    }), u.jsx("td", {
                      style: E.td,
                      children: _.vstdate
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(124,58,237,.04)",
                        fontWeight: 800,
                        color: "#7c3aed",
                        fontSize: "11px"
                      },
                      children: _.service_groups || "\u2014"
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
                      title: _.service_names,
                      children: _.service_names || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(16,185,129,.04)",
                        fontWeight: 800,
                        color: "#059669"
                      },
                      children: _.imaging_price ? _.imaging_price.toLocaleString() : "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.td,
                        background: "rgba(168,85,247,.03)",
                        fontFamily: "monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#a855f7"
                      },
                      children: _.icd10 || "\u2014"
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
                      title: _.icd10name,
                      children: _.icd10name || "\u2014"
                    }), u.jsx("td", {
                      style: {
                        ...E.tdNum,
                        background: "rgba(59,130,246,.04)",
                        fontWeight: 800,
                        color: "#2563eb"
                      },
                      children: _.income ? _.income.toLocaleString() : "\u2014"
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
                      title: _.chief_complaint,
                      children: _.chief_complaint || u.jsx("span", {
                        style: {
                          color: "var(--md-text-tertiary)"
                        },
                        children: "\u2014"
                      })
                    })]
                  }, _.vn || F)
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
                    children: [x0 !== "all" && e.length > x0 && u.jsxs("span", {
                      style: {
                        color: "#d97706",
                        marginRight: "6px"
                      },
                      children: ["\u{1F4CB} \u0E41\u0E2A\u0E14\u0E07 ", x0, " \u0E08\u0E32\u0E01 ", e.length.toLocaleString(), " visit \xB7"]
                    }), "\u0E23\u0E27\u0E21 ", e.length.toLocaleString(), " visit \xB7 ", a.toLocaleString(), " \u0E23\u0E32\u0E22 \xB7 Imaging:"]
                  }), u.jsx("td", {
                    style: {
                      ...E.tdNum,
                      fontWeight: 900,
                      fontSize: "13px",
                      padding: "10px 8px",
                      color: "#059669",
                      borderBottom: "none"
                    },
                    children: h.toLocaleString()
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
        }), j.length > 0 ? u.jsx(Du, {
          data: K,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
        }) : null]
      })
    })(), !_0 && n === "pttype-services" && B0?.summary && (() => {
      const e = B0.summary || [],
        t = B0.trend || [],
        d = e.reduce((v, o) => v + (o.total_visits || 0), 0),
        k = e.reduce((v, o) => v + (o.opd_visits || 0), 0),
        r = e.reduce((v, o) => v + (o.ipd_admissions || 0), 0),
        h = e.reduce((v, o) => v + (o.er_visits || 0), 0),
        a = e.reduce((v, o) => v + (o.total_unique_hn_estimate || 0), 0),
        x = v => Number(v || 0).toLocaleString(),
        g = e[0] || null,
        A = d > 0 && g ? Math.round(g.total_visits / d * 100) : 0,
        $ = e.slice(0, 5).map(v => String(v.pttype)),
        S = Array.from(new Set(t.map(v => v.ym))).sort().map(v => {
          const o = {
            ym: v
          };
          for (const c of e.slice(0, 5)) {
            const m = t.find(R => R.ym === v && String(R.pttype) === String(c.pttype));
            o[c.pttype_name || `\u0E23\u0E2B\u0E31\u0E2A ${c.pttype}`] = m ? m.total : 0
          }
          return o
        }),
        w = e.slice(0, 5).map(v => v.pttype_name || `\u0E23\u0E2B\u0E31\u0E2A ${v.pttype}`),
        W = ["#0ea5e9", "#7c3aed", "#10b981", "#f43f5e", "#f59e0b", "#ec4899", "#06b6d4", "#8b5cf6"],
        f = S.length > 0 ? S.reduce((v, o) => {
          const c = w.reduce((R, b) => R + (v[b] || 0), 0);
          return w.reduce((R, b) => R + (o[b] || 0), 0) > c ? o : v
        }, S[0]) : null,
        C = f ? f.ym : "\u2014",
        V = f ? w.reduce((v, o) => v + (f[o] || 0), 0) : 0,
        p = [];
      if (p.push(`\u{1F4CA} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E0A\u0E48\u0E27\u0E07 ${B0.from} \u2192 ${B0.to}: ${x(d)} \u0E04\u0E23\u0E31\u0E49\u0E07 (OPD ${x(k)} \xB7 IPD ${x(r)} \xB7 ER ${x(h)}) \u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21 ${x(a)} \u0E23\u0E32\u0E22 \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22 ${e.length} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C`), g && A >= 40 && p.push(`\u{1F3E5} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E14\u0E48\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${g.pttype_name} \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ${A}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (${x(g.total_visits)} \u0E04\u0E23\u0E31\u0E49\u0E07) \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23 reimbursement \u0E01\u0E25\u0E38\u0E48\u0E21\u0E19\u0E35\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E1E\u0E34\u0E40\u0E28\u0E29`), r > 0 && k > 0) {
        const v = (r / d * 100).toFixed(1);
        p.push(`\u{1FA7A} \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 IPD ${v}% \u0E02\u0E2D\u0E07\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 \xB7 \u0E2B\u0E32\u0E01 IPD \u0E40\u0E01\u0E34\u0E19 15% \u0E43\u0E19\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E43\u0E14 \u0E04\u0E27\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A DRG mix \u0E41\u0E25\u0E30 AdjRW \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E04\u0E27\u0E32\u0E21\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E40\u0E04\u0E2A\u0E08\u0E23\u0E34\u0E07`)
      }
      f && V > 0 && p.push(`\u{1F4C8} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E1E\u0E35\u0E04: ${C} \u0E21\u0E35\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E23\u0E27\u0E21 ${x(V)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u0E01\u0E25\u0E38\u0E48\u0E21 Top 5) \u2014 \u0E43\u0E0A\u0E49\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19 + \u0E22\u0E32/\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C\u0E25\u0E48\u0E27\u0E07\u0E2B\u0E19\u0E49\u0E32`), p.push("\u{1F4A1} \u0E41\u0E1C\u0E19\u0E1E\u0E31\u0E12\u0E19\u0E32: 1) \u0E08\u0E31\u0E14\u0E17\u0E33 Dashboard \u0E23\u0E32\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E2A\u0E48\u0E07\u0E17\u0E35\u0E21 UM \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 2) \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C recall rate per pttype 3) Audit \u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23\u0E40\u0E23\u0E35\u0E22\u0E01\u0E40\u0E01\u0E47\u0E1A\u0E04\u0E48\u0E32\u0E23\u0E31\u0E01\u0E29\u0E32\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 collection rate");
      const l = {
        data_source: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \xB7 HOSxP XE Live",
        timestamp: new Date().toISOString(),
        recommendations: p
      };
      return u.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "14px"
        },
        children: [u.jsx("div", {
          className: "glass-card",
          style: {
            padding: "14px 18px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px"
          },
          children: [{
            label: "\u{1FA7A} \u0E04\u0E23\u0E31\u0E49\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
            value: x(d),
            color: "#0ea5e9"
          }, {
            label: "\u{1F465} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E27\u0E21",
            value: x(a),
            color: "#7c3aed"
          }, {
            label: "\u{1F3E5} OPD",
            value: x(k),
            color: "#10b981"
          }, {
            label: "\u{1F6CF}\uFE0F IPD",
            value: x(r),
            color: "#f59e0b"
          }, {
            label: "\u{1F691} ER",
            value: x(h),
            color: "#f43f5e"
          }, {
            label: "\u{1F4CB} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C",
            value: e.length,
            color: "#ec4899"
          }].map((v, o) => u.jsxs("div", {
            style: {
              padding: "10px 12px",
              borderRadius: 10,
              background: `${v.color}10`,
              borderLeft: `4px solid ${v.color}`
            },
            children: [u.jsx("div", {
              style: {
                fontSize: 10,
                fontWeight: 800,
                color: v.color,
                textTransform: "uppercase",
                letterSpacing: ".06em"
              },
              children: v.label
            }), u.jsx("div", {
              style: {
                fontSize: 22,
                fontWeight: 900,
                color: "var(--md-text-primary)",
                fontFamily: "monospace",
                marginTop: 4
              },
              children: v.value
            })]
          }, o))
        }), S.length > 0 && (() => {
          const v = S.reduce((o, c) => {
            const m = w.reduce((R, b) => R + (c[b] || 0), 0);
            return m > o ? m : o
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
                children: w.map((o, c) => u.jsxs("div", {
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
                      background: W[c % W.length]
                    }
                  }), u.jsx("span", {
                    style: {
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--md-text-secondary)"
                    },
                    children: o
                  })]
                }, c))
              })]
            }), u.jsx("div", {
              style: {
                display: "grid",
                gridTemplateColumns: `repeat(${S.length}, minmax(0, 1fr))`,
                gap: 6,
                alignItems: "end",
                height: 220
              },
              children: S.map((o, c) => {
                const m = w.reduce((b, j) => b + (o[j] || 0), 0),
                  R = v > 0 ? m / v * 100 : 0;
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
                    children: x(m)
                  }), u.jsx("div", {
                    style: {
                      width: "100%",
                      height: `${R}%`,
                      display: "flex",
                      flexDirection: "column-reverse",
                      borderRadius: "6px 6px 0 0",
                      overflow: "hidden",
                      minHeight: 4
                    },
                    children: w.map((b, j) => {
                      const K = o[b] || 0,
                        _ = m > 0 ? K / m * 100 : 0;
                      return u.jsx("div", {
                        style: {
                          height: `${_}%`,
                          background: W[j % W.length],
                          minHeight: K > 0 ? 2 : 0
                        },
                        title: `${b}: ${x(K)}`
                      }, j)
                    })
                  }), u.jsx("div", {
                    style: {
                      fontSize: 9,
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)",
                      fontFamily: "monospace"
                    },
                    children: o.ym.slice(5)
                  })]
                }, c)
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
            children: "\u{1F4CB} \u0E15\u0E32\u0E23\u0E32\u0E07\u0E23\u0E32\u0E22\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
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
                children: ["\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C", "\u0E23\u0E2B\u0E31\u0E2A", "OPD \u0E04\u0E23\u0E31\u0E49\u0E07", "OPD HN", "IPD \u0E04\u0E23\u0E31\u0E49\u0E07", "IPD HN", "ER \u0E04\u0E23\u0E31\u0E49\u0E07", "ER HN", "\u0E23\u0E27\u0E21\u0E04\u0E23\u0E31\u0E49\u0E07", "% \u0E02\u0E2D\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"].map((v, o) => u.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: o === 0 ? "left" : "right",
                    fontWeight: 800,
                    color: "var(--md-text-secondary)",
                    borderBottom: "2px solid var(--md-divider)",
                    fontSize: 11
                  },
                  children: v
                }, o))
              })
            }), u.jsx("tbody", {
              children: e.map((v, o) => {
                const c = d > 0 ? (v.total_visits / d * 100).toFixed(1) : "0.0";
                return u.jsxs("tr", {
                  style: {
                    borderBottom: "1px solid var(--md-divider)"
                  },
                  children: [u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      fontWeight: 700,
                      color: "var(--md-text-primary)"
                    },
                    children: v.pttype_name || "\u2014"
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      color: "var(--md-text-tertiary)",
                      fontFamily: "monospace"
                    },
                    children: v.pttype || "\u2014"
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      fontFamily: "monospace"
                    },
                    children: x(v.opd_visits)
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      fontFamily: "monospace",
                      color: "var(--md-text-tertiary)"
                    },
                    children: x(v.opd_hn)
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      fontFamily: "monospace"
                    },
                    children: x(v.ipd_admissions)
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      fontFamily: "monospace",
                      color: "var(--md-text-tertiary)"
                    },
                    children: x(v.ipd_hn)
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      fontFamily: "monospace"
                    },
                    children: x(v.er_visits)
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      fontFamily: "monospace",
                      color: "var(--md-text-tertiary)"
                    },
                    children: x(v.er_hn)
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      fontWeight: 900,
                      fontFamily: "monospace",
                      color: "var(--md-text-primary)"
                    },
                    children: x(v.total_visits)
                  }), u.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "#7c3aed",
                      fontFamily: "monospace"
                    },
                    children: `${c}%`
                  })]
                }, o)
              })
            })]
          }), u.jsx("div", {
            style: {
              marginTop: 8,
              fontSize: 10,
              color: "var(--md-text-tertiary)",
              fontStyle: "italic"
            },
            children: `\u0E41\u0E2B\u0E25\u0E48\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25: ${B0.data_source||"HOSxP XE"} \xB7 \u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 ${new Date(B0.generated_at||Date.now()).toLocaleString("th-TH")}`
          })]
        }), u.jsx(Du, {
          data: l,
          theme: "default",
          title: "\u{1F9E0} AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \u2014 \u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E22\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C"
        })]
      })
    })(), n !== "pt" && n !== "staff-services" && n !== "fluoride" && n !== "elderly-cxr" && n !== "ncd-disease" && n !== "imaging-services" && n !== "pttype-services" && n !== "ipd-compare" && u.jsx(Du, {
      data: h0,
      theme: "default",
      title: "AI Executive Summary"
    })]
  })
}
const DE = fE.memo(vE);
export {
  DE as
  default
};