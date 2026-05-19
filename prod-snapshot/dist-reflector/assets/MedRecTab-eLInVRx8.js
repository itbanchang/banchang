import {
  R as _0,
  r as l0,
  j as u
} from "./vendor-react-ByYOq5k4.js";
import {
  b as H0,
  a as G0,
  M as N0,
  S as n0,
  g as K0,
  h as V0,
  E as U0,
  q as u0
} from "./shared-ui-OVDEF1.js";
import {
  R as d0,
  c as W0,
  a as h0,
  X as m0,
  Y as f0,
  T as b0,
  B as w0,
  g as z0,
  L as Y0,
  b as D0,
  d as q0,
  P as M0,
  f as I0,
  e as T0
} from "./vendor-charts-C5q2M-g3.js";

function X0({
  today: s,
  analytics: l,
  drgOpt: r,
  recovery: B,
  heatmap: g
}) {
  if (!(s || l || r || B)) return {
    headline: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Medical Record Audit \u2014 AI \u0E08\u0E30\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D data \u0E1E\u0E23\u0E49\u0E2D\u0E21",
    empty: !0
  };
  const p = (F, U = 0) => Number.isFinite(Number(F)) ? Number(F) : U,
    j = p(s?.audit_total),
    A = p(s?.audit_coded),
    z = Math.max(j - A, 0),
    y = j > 0 ? A / j * 100 : 100,
    X = (s?.hourly || []).reduce((F, U) => U.ipd_count + U.opd_count > (F?.ipd_count || 0) + (F?.opd_count || 0) ? U : F, null),
    V = (r?.pdxOptimization || r?.pdx_optimization || []).length,
    I = (r?.mccMissing || r?.mcc_missing || []).length,
    O = (r?.labAlerts || r?.lab_alerts || []).length,
    w = V + I + O,
    N = p(r?.pdxRevenue),
    _ = p(r?.mccRevenue),
    Q = p(r?.labRevenue),
    Z = N + _ + Q,
    S = Z > 0 ? Z : p(B?.recovery_potential || B?.total_potential),
    C = w > 0 ? w : p(B?.total_cases || B?.case_count),
    $ = s?.opd_coders || [],
    e0 = s?.ipd_coders_fiscal || s?.ipd_coders || [],
    Y = g?.by_coder || [],
    f = [...$, ...e0].length > 0 ? [...$, ...e0] : Y,
    v = f.slice().sort((F, U) => (U.total_cases ?? U.cases ?? U.count ?? 0) - (F.total_cases ?? F.cases ?? F.count ?? 0))[0],
    M = f.length,
    W = f.reduce((F, U) => F + (U.total_cases ?? U.cases ?? U.count ?? 0), 0),
    E0 = M > 0 ? W / M : 0,
    k = v ? v.total_cases ?? v.cases ?? v.count ?? 0 : 0,
    P = W > 0 ? k / W * 100 : 0;
  let G, H;
  z >= 20 || y < 70 ? (G = `\u{1F534} \u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E49\u0E32\u0E07\u0E21\u0E32\u0E01 \u2014 \u0E04\u0E49\u0E32\u0E07 ${z} \u0E23\u0E32\u0E22 \u0E08\u0E32\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${j} \u0E23\u0E32\u0E22 (\u0E17\u0E33\u0E40\u0E2A\u0E23\u0E47\u0E08 ${y.toFixed(1)}%) \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E17\u0E33\u0E43\u0E2B\u0E49 \u0E23\u0E1E.\u0E40\u0E01\u0E47\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E08\u0E32\u0E01 \u0E2A\u0E1B\u0E2A\u0E0A.\u0E44\u0E21\u0E48\u0E17\u0E31\u0E19`, H = "#f43f5e") : w >= 15 || S >= 1e5 ? (G = `\u26A0 \u0E1E\u0E1A\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E40\u0E01\u0E47\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07 \u2014 \u0E21\u0E35 ${w} \u0E23\u0E32\u0E22 \u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E23\u0E2B\u0E31\u0E2A\u0E44\u0E14\u0E49 \xB7 \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E23\u0E27\u0E21\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E3F${u0(S)} \xB7 \u0E04\u0E27\u0E23\u0E43\u0E2B\u0E49\u0E17\u0E35\u0E21\u0E40\u0E23\u0E48\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23`, H = "#f59e0b") : y >= 90 && w < 5 ? (G = `\u2705 \u0E23\u0E30\u0E1A\u0E1A\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04\u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \u2014 \u0E17\u0E33\u0E44\u0E14\u0E49 ${y.toFixed(1)}% \xB7 \u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E40\u0E1E\u0E35\u0E22\u0E07 ${w} \u0E23\u0E32\u0E22 \xB7 \u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21`, H = "#10b981") : (G = `\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21: \u0E40\u0E2A\u0E23\u0E47\u0E08 ${A} \u0E08\u0E32\u0E01 ${j} \u0E23\u0E32\u0E22 (${y.toFixed(1)}%) \xB7 \u0E08\u0E38\u0E14\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 ${w} \u0E23\u0E32\u0E22 \xB7 \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 \u0E3F${u0(S)}`, H = "#0ea5e9");
  const r0 = (F, U, j0) => F >= U ? "#10b981" : F >= j0 ? "#f59e0b" : "#f43f5e",
    B0 = [{
      label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
      value: u0(j),
      sub: `\u0E40\u0E2A\u0E23\u0E47\u0E08 ${A} \xB7 \u0E04\u0E49\u0E32\u0E07 ${z}`,
      color: "#0ea5e9"
    }, {
      label: "% \u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E40\u0E2A\u0E23\u0E47\u0E08",
      value: `${y.toFixed(1)}%`,
      sub: y >= 90 ? "\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : y >= 75 ? "\u0E14\u0E35" : "\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C",
      color: r0(y, 90, 75)
    }, {
      label: "\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A",
      value: u0(w),
      sub: `\u0E42\u0E23\u0E04\u0E2B\u0E25\u0E31\u0E01\u0E44\u0E21\u0E48\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 ${V} \xB7 \u0E02\u0E32\u0E14\u0E42\u0E23\u0E04\u0E41\u0E17\u0E23\u0E01 ${I} \xB7 \u0E21\u0E35\u0E1C\u0E25\u0E41\u0E25\u0E1B\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 ${O}`,
      color: w >= 15 ? "#f43f5e" : w >= 5 ? "#f59e0b" : "#10b981"
    }, {
      label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E40\u0E01\u0E47\u0E1A\u0E04\u0E37\u0E19\u0E44\u0E14\u0E49",
      value: `\u0E3F${u0(S)}`,
      sub: `${C} \u0E23\u0E32\u0E22`,
      color: "#7c3aed"
    }, {
      label: "\u0E17\u0E35\u0E21\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
      value: u0(M),
      sub: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${E0.toFixed(0)} \u0E23\u0E32\u0E22/\u0E04\u0E19`,
      color: "#6366f1"
    }, {
      label: "% \u0E07\u0E32\u0E19\u0E02\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E17\u0E33\u0E21\u0E32\u0E01\u0E2A\u0E38\u0E14",
      value: `${P.toFixed(0)}%`,
      sub: P > 50 ? "\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01\u0E2D\u0E22\u0E39\u0E48\u0E01\u0E31\u0E1A\u0E04\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27" : "\u0E41\u0E1A\u0E48\u0E07\u0E07\u0E32\u0E19\u0E2A\u0E21\u0E14\u0E38\u0E25",
      color: P > 50 ? "#f59e0b" : "#10b981"
    }],
    i0 = [],
    p0 = `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E21\u0E35\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A ${j} \u0E23\u0E32\u0E22 \xB7 \u0E17\u0E33\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27 ${A} \u0E23\u0E32\u0E22 (${y.toFixed(1)}%) \xB7 \u0E22\u0E31\u0E07\u0E04\u0E49\u0E32\u0E07\u0E2D\u0E22\u0E39\u0E48 ${z} \u0E23\u0E32\u0E22` + (X ? ` \u0E0A\u0E48\u0E27\u0E07\u0E04\u0E19\u0E40\u0E22\u0E2D\u0E30\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${X.hour}:00 \u0E19. (${X.opd_count+X.ipd_count} \u0E23\u0E32\u0E22) \u2014 \u0E04\u0E27\u0E23\u0E08\u0E31\u0E14\u0E04\u0E19\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E0A\u0E48\u0E27\u0E07\u0E19\u0E35\u0E49` : "") + (z >= 20 ? " \u26A0 \u0E04\u0E49\u0E32\u0E07\u0E40\u0E01\u0E34\u0E19 20 \u0E23\u0E32\u0E22 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E01\u0E47\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E08\u0E32\u0E01 \u0E2A\u0E1B\u0E2A\u0E0A.\u0E44\u0E21\u0E48\u0E17\u0E31\u0E19\u0E41\u0E25\u0E30\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E2A\u0E14\u0E02\u0E2D\u0E07 \u0E23\u0E1E." : z >= 10 ? " \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E43\u0E01\u0E25\u0E49\u0E0A\u0E34\u0E14" : " \u0E07\u0E32\u0E19\u0E04\u0E49\u0E32\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1B\u0E01\u0E15\u0E34");
  i0.push({
    icon: "\u{1F4CB}",
    title: "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
    text: p0,
    color: r0(y, 90, 75)
  });
  const g0 = `\u0E1E\u0E1A\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E23\u0E2B\u0E31\u0E2A\u0E23\u0E27\u0E21 ${w} \u0E23\u0E32\u0E22: \u0E23\u0E30\u0E1A\u0E38\u0E42\u0E23\u0E04\u0E2B\u0E25\u0E31\u0E01\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 ${V} \u0E23\u0E32\u0E22 \xB7 \u0E02\u0E32\u0E14\u0E42\u0E23\u0E04\u0E41\u0E17\u0E23\u0E01\u0E0B\u0E49\u0E2D\u0E19/\u0E42\u0E23\u0E04\u0E23\u0E48\u0E27\u0E21 ${I} \u0E23\u0E32\u0E22 \xB7 \u0E21\u0E35\u0E1C\u0E25\u0E41\u0E25\u0E1B\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ${O} \u0E23\u0E32\u0E22 ` + (I >= 10 ? `\u{1F534} \u0E02\u0E32\u0E14\u0E42\u0E23\u0E04\u0E41\u0E17\u0E23\u0E01 ${I} \u0E23\u0E32\u0E22 \u2014 \u0E16\u0E49\u0E32\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E14\u0E49\u0E41\u0E15\u0E48\u0E25\u0E30\u0E23\u0E32\u0E22 \u0E23\u0E1E.\u0E08\u0E30\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E3F2,500\u2013\u0E3F6,700/\u0E23\u0E32\u0E22` : "") + (V >= 5 ? `\u0E23\u0E30\u0E1A\u0E38\u0E42\u0E23\u0E04\u0E2B\u0E25\u0E31\u0E01\u0E44\u0E21\u0E48\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14 ${V} \u0E23\u0E32\u0E22 \u2014 \u0E04\u0E27\u0E23\u0E1B\u0E23\u0E31\u0E1A\u0E43\u0E2B\u0E49\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E42\u0E23\u0E04\u0E08\u0E23\u0E34\u0E07\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14` : "") + (O >= 5 ? ` \u0E21\u0E35\u0E1C\u0E25\u0E41\u0E25\u0E1B\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 ${O} \u0E23\u0E32\u0E22 \u2014 \u0E2D\u0E32\u0E08\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E42\u0E23\u0E04\u0E41\u0E17\u0E23\u0E01\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E41\u0E1E\u0E17\u0E22\u0E4C` : "");
  if (i0.push({
      icon: "\u{1F3AF}",
      title: "\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E23\u0E2B\u0E31\u0E2A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49",
      text: g0,
      color: w >= 10 ? "#f59e0b" : "#10b981"
    }), S > 0 || C > 0) {
    const F = `\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E04\u0E37\u0E19\u0E44\u0E14\u0E49 \u0E3F${u0(S)} \u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 ${C} \u0E23\u0E32\u0E22 ` + (S >= 5e5 ? "\u{1F680} \u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 \u2014 \u0E04\u0E27\u0E23\u0E15\u0E31\u0E49\u0E07\u0E17\u0E35\u0E21\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E01\u0E34\u0E08\u0E40\u0E23\u0E48\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E17\u0E31\u0E19\u0E17\u0E35" : S >= 1e5 ? "\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E04\u0E38\u0E49\u0E21\u0E04\u0E48\u0E32\u0E17\u0E33 \u2014 \u0E40\u0E23\u0E34\u0E48\u0E21\u0E08\u0E32\u0E01\u0E23\u0E32\u0E22\u0E17\u0E35\u0E48\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E39\u0E07\u0E01\u0E48\u0E2D\u0E19" : "\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E40\u0E25\u0E47\u0E01\u0E19\u0E49\u0E2D\u0E22 \u2014 \u0E25\u0E2D\u0E07\u0E17\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E19\u0E41\u0E1A\u0E1A\u0E01\u0E48\u0E2D\u0E19") + " \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22\u0E20\u0E32\u0E22\u0E43\u0E19 14 \u0E27\u0E31\u0E19 \u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E21\u0E14\u0E40\u0E27\u0E25\u0E32\u0E22\u0E37\u0E48\u0E19\u0E40\u0E1A\u0E34\u0E01 \u0E2A\u0E1B\u0E2A\u0E0A.";
    i0.push({
      icon: "\u{1F4B0}",
      title: "\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E35\u0E48\u0E15\u0E01\u0E2B\u0E25\u0E48\u0E19",
      text: F,
      color: "#7c3aed"
    })
  }
  if (f.length > 0) {
    let F = `\u0E17\u0E35\u0E21\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E21\u0E35\u0E04\u0E19\u0E17\u0E33\u0E07\u0E32\u0E19 ${M} \u0E04\u0E19 \xB7 \u0E07\u0E32\u0E19\u0E23\u0E27\u0E21 ${u0(W)} \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${E0.toFixed(0)} \u0E23\u0E32\u0E22/\u0E04\u0E19`;
    v && (F += ` \u0E17\u0E33\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${v.coder_name||v.name} ${u0(v.total_cases||v.cases)} \u0E23\u0E32\u0E22 (${P.toFixed(0)}% \u0E02\u0E2D\u0E07\u0E07\u0E32\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14)`), P > 50 ? F += " \u26A0 \u0E07\u0E32\u0E19\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01\u0E2D\u0E22\u0E39\u0E48\u0E01\u0E31\u0E1A\u0E04\u0E19\u0E40\u0E14\u0E35\u0E22\u0E27 \u0E40\u0E01\u0E34\u0E19\u0E04\u0E23\u0E36\u0E48\u0E07\u0E02\u0E2D\u0E07\u0E07\u0E32\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E04\u0E19\u0E19\u0E31\u0E49\u0E19\u0E17\u0E33\u0E07\u0E32\u0E19\u0E2B\u0E19\u0E31\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B \u0E41\u0E25\u0E30\u0E16\u0E49\u0E32\u0E40\u0E02\u0E32\u0E25\u0E32/\u0E2D\u0E2D\u0E01\u0E08\u0E30\u0E17\u0E33\u0E43\u0E2B\u0E49\u0E07\u0E32\u0E19\u0E2B\u0E22\u0E38\u0E14\u0E0A\u0E30\u0E07\u0E31\u0E01" : P > 35 ? F += " \u0E07\u0E32\u0E19\u0E22\u0E31\u0E07\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E44\u0E21\u0E48\u0E40\u0E17\u0E48\u0E32\u0E01\u0E31\u0E19 \u2014 \u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E08\u0E31\u0E14\u0E2A\u0E23\u0E23\u0E43\u0E2B\u0E21\u0E48\u0E43\u0E2B\u0E49\u0E2A\u0E21\u0E14\u0E38\u0E25" : F += " \u0E17\u0E35\u0E21\u0E41\u0E1A\u0E48\u0E07\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E14\u0E35", i0.push({
      icon: "\u{1F465}",
      title: "\u0E01\u0E32\u0E23\u0E41\u0E1A\u0E48\u0E07\u0E07\u0E32\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E17\u0E35\u0E21",
      text: F,
      color: P > 50 ? "#f59e0b" : "#10b981"
    })
  }
  const J = [];
  z >= 20 && J.push(`\u{1F534} \u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E49\u0E32\u0E07 ${z} \u0E23\u0E32\u0E22 \u2014 \u0E16\u0E49\u0E32\u0E22\u0E37\u0E48\u0E19\u0E40\u0E1A\u0E34\u0E01\u0E25\u0E48\u0E32\u0E0A\u0E49\u0E32 \u0E2A\u0E1B\u0E2A\u0E0A.\u0E2D\u0E32\u0E08\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18\u0E2B\u0E23\u0E37\u0E2D\u0E08\u0E48\u0E32\u0E22\u0E40\u0E07\u0E34\u0E19\u0E04\u0E37\u0E19\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E17\u0E35\u0E48\u0E04\u0E27\u0E23`), y < 70 && J.push(`\u{1F534} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E15\u0E48\u0E33 (${y.toFixed(1)}%) \u2014 \u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E17\u0E31\u0E49\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E41\u0E25\u0E30\u0E1B\u0E23\u0E34\u0E21\u0E32\u0E13\u0E07\u0E32\u0E19 \xB7 \u0E04\u0E27\u0E23\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E19 \u0E2B\u0E23\u0E37\u0E2D\u0E17\u0E1A\u0E17\u0E27\u0E19\u0E02\u0E31\u0E49\u0E19\u0E15\u0E2D\u0E19\u0E01\u0E32\u0E23\u0E17\u0E33\u0E07\u0E32\u0E19`), I >= 10 && J.push(`\u{1F7E0} \u0E02\u0E32\u0E14\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E42\u0E23\u0E04\u0E41\u0E17\u0E23\u0E01\u0E0B\u0E49\u0E2D\u0E19/\u0E42\u0E23\u0E04\u0E23\u0E48\u0E27\u0E21 ${I} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E22\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E44\u0E14\u0E49\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E3F${u0(I*5e3)}\u2013\u0E3F${u0(I*8e3)}`), V >= 10 && J.push(`\u{1F7E0} \u0E23\u0E30\u0E1A\u0E38\u0E42\u0E23\u0E04\u0E2B\u0E25\u0E31\u0E01\u0E44\u0E21\u0E48\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E1E\u0E2D ${V} \u0E23\u0E32\u0E22 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E16\u0E39\u0E01\u0E08\u0E31\u0E14\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1A\u0E34\u0E01\u0E1C\u0E34\u0E14\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 \u0E04\u0E27\u0E23\u0E17\u0E1A\u0E17\u0E27\u0E19\u0E01\u0E32\u0E23\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04\u0E2B\u0E25\u0E31\u0E01`), P > 50 && M >= 3 && J.push(`\u{1F7E1} \u0E07\u0E32\u0E19\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01 \u2014 1 \u0E04\u0E19 \u0E23\u0E31\u0E1A ${P.toFixed(0)}% \u0E02\u0E2D\u0E07\u0E07\u0E32\u0E19\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E04\u0E19\u0E19\u0E35\u0E49\u0E25\u0E32/\u0E2D\u0E2D\u0E01`), O >= 5 && J.push(`\u{1F7E1} \u0E21\u0E35\u0E1C\u0E25\u0E41\u0E25\u0E1B\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 ${O} \u0E23\u0E32\u0E22 \u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49\u0E42\u0E23\u0E04\u0E41\u0E17\u0E23\u0E01 \u0E41\u0E15\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01`), S >= 5e5 && J.push(`\u{1F7E0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E2D\u0E40\u0E01\u0E47\u0E1A\u0E04\u0E37\u0E19 \u0E3F${u0(S)} \u2014 \u0E40\u0E01\u0E34\u0E19 14 \u0E27\u0E31\u0E19\u0E08\u0E30\u0E2B\u0E21\u0E14\u0E40\u0E27\u0E25\u0E32\u0E22\u0E37\u0E48\u0E19\u0E40\u0E1A\u0E34\u0E01 \u0E2A\u0E1B\u0E2A\u0E0A.`), J.length === 0 && J.push("\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E40\u0E15\u0E37\u0E2D\u0E19 \u2014 \u0E07\u0E32\u0E19\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35");
  const K = [];
  return z >= 20 && K.push(`\u{1F534} \u0E14\u0E48\u0E27\u0E19\u0E21\u0E32\u0E01 \xB7 \u0E40\u0E04\u0E25\u0E35\u0E22\u0E23\u0E4C\u0E07\u0E32\u0E19\u0E04\u0E49\u0E32\u0E07\u0E17\u0E31\u0E19\u0E17\u0E35 \u2014 \u0E21\u0E2D\u0E1A\u0E2B\u0E21\u0E32\u0E22 OT \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E2A\u0E23\u0E34\u0E21\u0E04\u0E19\u0E0A\u0E31\u0E48\u0E27\u0E04\u0E23\u0E32\u0E27 \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22: \u0E25\u0E49\u0E32\u0E07 ${z} \u0E23\u0E32\u0E22 \u0E20\u0E32\u0E22\u0E43\u0E19 48 \u0E0A\u0E21.`), I >= 10 && K.push(`\u{1F534} \u0E14\u0E48\u0E27\u0E19\u0E21\u0E32\u0E01 \xB7 \u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23\u0E40\u0E01\u0E47\u0E1A\u0E42\u0E23\u0E04\u0E41\u0E17\u0E23\u0E01/\u0E42\u0E23\u0E04\u0E23\u0E48\u0E27\u0E21 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 ${I} \u0E23\u0E32\u0E22 \u0E17\u0E35\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E0A\u0E35\u0E49 \xB7 \u0E04\u0E32\u0E14\u0E44\u0E14\u0E49\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E1E\u0E34\u0E48\u0E21 \u0E3F${u0(I*6500)}`), V >= 10 && K.push("\u{1F7E0} \u0E2A\u0E33\u0E04\u0E31\u0E0D \xB7 \u0E08\u0E31\u0E14\u0E2D\u0E1A\u0E23\u0E21\u0E01\u0E32\u0E23\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04\u0E2B\u0E25\u0E31\u0E01 (ICD-10) \u2014 \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E16\u0E39\u0E01\u0E40\u0E1A\u0E34\u0E01\u0E44\u0E14\u0E49\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E17\u0E35\u0E48\u0E04\u0E27\u0E23"), S >= 1e5 && K.push(`\u{1F7E0} \u0E2A\u0E33\u0E04\u0E31\u0E0D \xB7 \u0E40\u0E23\u0E48\u0E07\u0E01\u0E39\u0E49\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E04\u0E37\u0E19 \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22\u0E20\u0E32\u0E22\u0E43\u0E19 14 \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E14\u0E49 ${Math.round(S*.7).toLocaleString()} \u0E1A\u0E32\u0E17`), P > 50 && M >= 3 && K.push("\u{1F7E1} \u0E04\u0E27\u0E23\u0E17\u0E33 \xB7 \u0E1D\u0E36\u0E01\u0E1D\u0E19\u0E02\u0E49\u0E32\u0E21\u0E17\u0E35\u0E21 + \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E07\u0E32\u0E19 \u2014 \u0E2A\u0E2D\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E2D\u0E35\u0E01 2 \u0E04\u0E19\u0E43\u0E19\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19 \xB7 \u0E25\u0E14\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E07\u0E32\u0E19\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01"), y < 85 && K.push("\u{1F7E1} \u0E04\u0E27\u0E23\u0E17\u0E33 \xB7 \u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A \u2014 \u0E43\u0E0A\u0E49 AI \u0E0A\u0E48\u0E27\u0E22\u0E41\u0E19\u0E30\u0E19\u0E33\u0E23\u0E2B\u0E31\u0E2A \u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E15\u0E48\u0E2D\u0E23\u0E32\u0E22 20-30%"), K.push("\u{1F535} \u0E2A\u0E33\u0E04\u0E31\u0E0D \xB7 \u0E17\u0E33\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C: \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E07\u0E32\u0E19\u0E04\u0E49\u0E32\u0E07 \xB7 % \u0E01\u0E32\u0E23\u0E40\u0E01\u0E47\u0E1A\u0E42\u0E23\u0E04\u0E41\u0E17\u0E23\u0E01 \xB7 \u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48\u0E01\u0E39\u0E49\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14"), M > 0 && K.push("\u{1F535} \u0E2A\u0E33\u0E04\u0E31\u0E0D \xB7 \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E31\u0E19 \u2014 \u0E2A\u0E38\u0E48\u0E21\u0E15\u0E23\u0E27\u0E08 10% \u0E02\u0E2D\u0E07\u0E07\u0E32\u0E19\u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E22\u0E01\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A"), f.length === 0 && K.push("\u{1F7E1} \u0E04\u0E27\u0E23\u0E17\u0E33 \xB7 \u0E40\u0E23\u0E34\u0E48\u0E21\u0E40\u0E01\u0E47\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E01\u0E32\u0E23\u0E17\u0E33\u0E07\u0E32\u0E19\u0E02\u0E2D\u0E07\u0E17\u0E35\u0E21\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E43\u0E19 workflow"), i0.push({
    icon: "\u26A0\uFE0F",
    title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E41\u0E25\u0E30\u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E23\u0E30\u0E27\u0E31\u0E07",
    list: J,
    color: "#f59e0b"
  }), i0.push({
    icon: "\u{1F4A1}",
    title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30 (\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19)",
    list: K,
    color: "#10b981"
  }), {
    headline: G,
    headlineColor: H,
    kpi: B0,
    sections: i0,
    footerLeft: `\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25: ${j} \u0E40\u0E04\u0E2A \xB7 ${M} coders \xB7 ${w} gaps \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}
const E = {
    opd: "#0284c7",
    ipd: "#059669",
    coder: "#7c3aed",
    warn: "#f59e0b",
    danger: "#e11d48",
    ok: "#10b981",
    text: "var(--md-text-primary)",
    sub: "var(--md-text-secondary)",
    muted: "var(--md-text-tertiary)",
    surface: "var(--md-surface)",
    border: "var(--md-border)",
    bg: "var(--md-bg)"
  },
  a0 = ["#e11d48", "#0284c7", "#059669", "#f59e0b", "#7c3aed", "#0ea5e9", "#ec4899"];

function t0(s) {
  return s >= 90 ? E.ok : s >= 70 ? E.warn : E.danger
}

function a(s, l = 0) {
  if (s == null || s === "") return "\u2014";
  const r = Number(s);
  return isNaN(r) ? "\u2014" : r.toLocaleString("th-TH", {
    minimumFractionDigits: l,
    maximumFractionDigits: l
  })
}

function o0({
  color: s,
  icon: l,
  title: r,
  sub: B,
  badge: g,
  children: p
}) {
  return u.jsxs("div", {
    style: {
      borderRadius: "20px",
      border: `1px solid ${s}30`,
      overflow: "hidden",
      background: E.surface,
      boxShadow: `0 4px 24px ${s}12`
    },
    children: [u.jsxs("div", {
      style: {
        padding: "1.25rem 1.75rem",
        background: `linear-gradient(135deg, ${s}14 0%, ${s}06 100%)`,
        borderBottom: `2px solid ${s}25`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px"
      },
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px"
        },
        children: [u.jsx("div", {
          style: {
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${s}, ${s}cc)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            boxShadow: `0 4px 12px ${s}40`
          },
          children: l
        }), u.jsxs("div", {
          children: [u.jsx("div", {
            style: {
              fontSize: "17px",
              fontWeight: 900,
              color: E.text,
              letterSpacing: "-0.01em"
            },
            children: r
          }), B && u.jsx("div", {
            style: {
              fontSize: "12px",
              color: E.muted,
              fontWeight: 600,
              marginTop: "2px"
            },
            children: B
          })]
        })]
      }), g && u.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: s,
          background: `${s}18`,
          border: `1px solid ${s}30`,
          padding: "4px 12px",
          borderRadius: "99px"
        },
        children: g
      })]
    }), u.jsx("div", {
      style: {
        padding: "1.5rem 1.75rem"
      },
      children: p
    })]
  })
}

function R({
  icon: s,
  label: l,
  value: r,
  sub: B,
  color: g,
  size: p = "md",
  progress: j,
  target: A
}) {
  const z = p === "lg" ? "36px" : "28px";
  return u.jsxs("div", {
    style: {
      borderRadius: "16px",
      padding: "1.25rem",
      background: E.bg,
      border: `1px solid ${E.border}`,
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    },
    children: [u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      },
      children: [u.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: E.muted
        },
        children: l
      }), u.jsx("span", {
        style: {
          fontSize: "20px"
        },
        children: s
      })]
    }), u.jsx("div", {
      style: {
        fontSize: z,
        fontWeight: 900,
        color: g || E.text,
        letterSpacing: "-0.02em",
        lineHeight: 1
      },
      children: r
    }), B && u.jsx("div", {
      style: {
        fontSize: "12px",
        color: E.sub,
        fontWeight: 600
      },
      children: B
    }), j != null && u.jsxs("div", {
      children: [u.jsx("div", {
        style: {
          height: "4px",
          background: `${g}20`,
          borderRadius: "4px",
          overflow: "hidden",
          marginTop: "6px"
        },
        children: u.jsx("div", {
          style: {
            height: "100%",
            width: `${Math.min(j,100)}%`,
            background: g,
            borderRadius: "4px",
            transition: "width 0.6s ease"
          }
        })
      }), A && u.jsx("div", {
        style: {
          fontSize: "11px",
          color: E.muted,
          fontWeight: 600,
          marginTop: "4px"
        },
        children: A
      })]
    })]
  })
}

function C0({
  score: s,
  label: l,
  color: r
}) {
  const B = Math.min(s ?? 0, 100),
    g = 2 * Math.PI * 16,
    p = B / 100 * g;
  return u.jsxs("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px"
    },
    children: [u.jsxs("svg", {
      width: "80",
      height: "80",
      viewBox: "0 0 36 36",
      style: {
        transform: "rotate(-90deg)"
      },
      children: [u.jsx("circle", {
        cx: "18",
        cy: "18",
        r: "16",
        fill: "none",
        stroke: `${r}20`,
        strokeWidth: "3"
      }), u.jsx("circle", {
        cx: "18",
        cy: "18",
        r: "16",
        fill: "none",
        stroke: r,
        strokeWidth: "3",
        strokeDasharray: `${p.toFixed(1)} ${g.toFixed(1)}`,
        strokeLinecap: "round",
        style: {
          transition: "stroke-dasharray 0.8s ease"
        }
      })]
    }), u.jsx("div", {
      style: {
        marginTop: "-68px",
        textAlign: "center",
        zIndex: 1,
        position: "relative"
      },
      children: u.jsxs("div", {
        style: {
          fontSize: "18px",
          fontWeight: 900,
          color: r,
          lineHeight: 1,
          paddingTop: "24px"
        },
        children: [s ?? "\u2014", "%"]
      })
    }), u.jsx("div", {
      style: {
        marginTop: "4px",
        fontSize: "12px",
        fontWeight: 700,
        color: E.muted,
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "0.06em"
      },
      children: l
    })]
  })
}

function A0({
  label: s,
  color: l
}) {
  return u.jsx("span", {
    style: {
      fontSize: "11px",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: l,
      background: `${l}18`,
      border: `1px solid ${l}30`,
      padding: "2px 8px",
      borderRadius: "99px"
    },
    children: s
  })
}

function y0({
  rank: s,
  name: l,
  count: r,
  total: B,
  color: g,
  extra: p
}) {
  const j = B > 0 ? Math.round(r / B * 100) : 0;
  return u.jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 0",
      borderBottom: `1px solid ${E.border}`
    },
    children: [u.jsx("div", {
      style: {
        width: "28px",
        height: "28px",
        borderRadius: "8px",
        flexShrink: 0,
        background: s <= 3 ? g : `${g}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: 900,
        color: s <= 3 ? "#fff" : g
      },
      children: s
    }), u.jsxs("div", {
      style: {
        flex: 1,
        minWidth: 0
      },
      children: [u.jsx("div", {
        style: {
          fontSize: "13px",
          fontWeight: 700,
          color: E.text,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        children: l
      }), u.jsx("div", {
        style: {
          height: "4px",
          background: `${g}20`,
          borderRadius: "4px",
          overflow: "hidden",
          marginTop: "4px"
        },
        children: u.jsx("div", {
          style: {
            height: "100%",
            width: `${j}%`,
            background: g,
            borderRadius: "4px"
          }
        })
      })]
    }), u.jsxs("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      },
      children: [u.jsx("div", {
        style: {
          fontSize: "16px",
          fontWeight: 900,
          color: g,
          lineHeight: 1
        },
        children: r.toLocaleString()
      }), p && u.jsx("div", {
        style: {
          fontSize: "11px",
          color: E.muted,
          fontWeight: 600,
          marginTop: "2px"
        },
        children: p
      })]
    })]
  })
}

function x0() {
  return u.jsx("div", {
    style: {
      height: "1px",
      background: E.border,
      margin: "1.25rem 0"
    }
  })
}

function Q0(s, l, r) {
  const B = H => Number.isFinite(Number(H)) ? Number(H) : 0,
    g = B(s.cc_rate),
    p = B(s.diag_per_case),
    j = B(s.fiscal_total),
    A = B(s.current_month_total),
    z = B(s.prev_month_total),
    y = z > 0 ? Math.round((A - z) / z * 100) : 0,
    X = l.length,
    V = l.reduce((H, r0) => H + B(r0.fiscal_total), 0),
    I = V > 0 ? j / V * 100 : 0,
    O = l.reduce((H, r0) => H + B(r0.cc_rate), 0) / Math.max(1, X),
    w = l.reduce((H, r0) => H + B(r0.diag_per_case), 0) / Math.max(1, X),
    N = O > 0 ? (g - O) / O * 100 : 0,
    _ = w > 0 ? (p - w) / w * 100 : 0,
    Q = Math.round((1 - (r - 1) / Math.max(1, X)) * 100);
  let Z, S, C;
  g < .3 || p < 1.5 ? (Z = "P0", S = "#dc2626", C = "P0 \xB7 \u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19") : g < .6 || p < 2.5 || y < -30 ? (Z = "P1", S = "#f59e0b", C = "P1 \xB7 \u0E2A\u0E33\u0E04\u0E31\u0E0D") : g < .8 || p < 3.5 ? (Z = "P2", S = "#0ea5e9", C = "P2 \xB7 \u0E1B\u0E01\u0E15\u0E34") : (Z = "P3", S = "#10b981", C = "P3 \xB7 \u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21");
  let $ = "";
  j > V * .4 ? $ = "\u26A0 \u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19\u0E40\u0E01\u0E34\u0E19\u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19 (>40% \u0E02\u0E2D\u0E07\u0E17\u0E35\u0E21) \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Burnout" : j > V * .25 ? $ = "\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2B\u0E19\u0E31\u0E01 \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : j < V * .05 ? $ = "\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E40\u0E1A\u0E32 \xB7 \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A\u0E40\u0E1E\u0E34\u0E48\u0E21" : $ = "\u0E20\u0E32\u0E23\u0E30\u0E07\u0E32\u0E19\u0E2A\u0E21\u0E14\u0E38\u0E25";
  const e0 = `${s.name} \u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A ${j.toLocaleString()} \u0E40\u0E04\u0E2A\u0E43\u0E19\u0E1B\u0E35\u0E07\u0E1A\u0E2F \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ${I.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E17\u0E35\u0E21 (\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ${r}/${X} \xB7 Top ${100-Q}%) \xB7 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49 ${A} \u0E40\u0E04\u0E2A${y!==0?` (${y>=0?"+":""}${y}% MoM)`:""} \xB7 CC Rate ${(g*100).toFixed(0)}% (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E17\u0E35\u0E21 ${(O*100).toFixed(0)}% \xB7 ${N>=0?"+":""}${N.toFixed(0)}%) \xB7 Dx/Case ${p.toFixed(1)} (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E17\u0E35\u0E21 ${w.toFixed(1)} \xB7 ${_>=0?"+":""}${_.toFixed(0)}%)`,
    Y = [];
  g < .3 ? Y.push("\u{1F534} CC Rate <30% \u2014 Coder \u0E2D\u0E32\u0E08\u0E21\u0E2D\u0E07\u0E02\u0E49\u0E32\u0E21 Secondary Dx \u0E08\u0E32\u0E01 Lab results \xB7 Imaging \xB7 Vitals \xB7 \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49 review chart notes \u0E04\u0E23\u0E1A") : g < .6 && Y.push("\u{1F7E1} CC Rate 30-60% \u2014 \u0E21\u0E35 Secondary Dx \u0E1A\u0E49\u0E32\u0E07\u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E1A\u0E39\u0E23\u0E13\u0E4C \xB7 \u0E2D\u0E32\u0E08\u0E1E\u0E25\u0E32\u0E14 comorbidity \u0E23\u0E2D\u0E07"), p < 2 ? Y.push("\u{1F534} Dx/Case <2 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E31\u0E01\u0E21\u0E35\u0E2B\u0E25\u0E32\u0E22 diagnosis \u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01 code \u0E04\u0E23\u0E1A \xB7 \u0E1E\u0E25\u0E32\u0E14 chronic conditions") : p < 3 && Y.push("\u{1F7E1} Dx/Case 2-3 \u2014 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07 \xB7 \u0E2D\u0E32\u0E08\u0E22\u0E31\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E44\u0E14\u0E49\u0E2D\u0E35\u0E01"), y < -30 ? Y.push(`\u{1F4C9} Productivity \u0E25\u0E14\u0E25\u0E07 ${Math.abs(y)}% MoM \u2014 \u0E2D\u0E32\u0E08\u0E25\u0E32\u0E07\u0E32\u0E19 \xB7 \u0E21\u0E35 backlog \xB7 \u0E2B\u0E23\u0E37\u0E2D complexity \u0E40\u0E1E\u0E34\u0E48\u0E21`) : y > 30 && Y.push(`\u{1F4C8} Productivity \u0E40\u0E1E\u0E34\u0E48\u0E21 ${y}% MoM \u2014 \u0E23\u0E30\u0E27\u0E31\u0E07 Quality trade-off`), Y.length === 0 && Y.push("\u2705 \u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35 \xB7 \u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2A\u0E31\u0E0D\u0E0D\u0E32\u0E13\u0E1B\u0E31\u0E0D\u0E2B\u0E32");
  const f = [];
  g >= .8 && f.push(`CC Rate ${(g*100).toFixed(0)}% \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${N.toFixed(0)}% \xB7 Coding Completeness \u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21`), p >= 3.5 && f.push(`Dx/Case ${p.toFixed(1)} \u0E2A\u0E39\u0E07 \xB7 \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 comorbidity \u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19`), Q >= 75 && f.push(`\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15 Top ${100-Q}% \xB7 \u0E23\u0E31\u0E1A\u0E1C\u0E34\u0E14\u0E0A\u0E2D\u0E1A ${I.toFixed(0)}% \u0E02\u0E2D\u0E07\u0E17\u0E35\u0E21`), y > 0 && y < 30 && f.push(`Productivity \u0E42\u0E15\u0E2A\u0E21\u0E48\u0E33\u0E40\u0E2A\u0E21\u0E2D +${y}% MoM`), f.length === 0 && f.push("\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19\u0E40\u0E09\u0E1E\u0E32\u0E30 \xB7 \u0E04\u0E27\u0E23\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19");
  const v = [];
  g < .3 ? v.push(`\u{1F534} CC Rate ${(g*100).toFixed(0)}% \u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Revenue Loss \xB7 DRG downgrade`) : g < .6 && v.push(`\u{1F7E1} CC Rate ${(g*100).toFixed(0)}% \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 (\u0E40\u0E1B\u0E49\u0E32 \u226570%)`), p < 2 && v.push(`\u{1F534} Dx/Case ${p.toFixed(1)} \u0E15\u0E48\u0E33 \xB7 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E31\u0E01\u0E21\u0E35 3+ diagnoses \xB7 \u0E2D\u0E32\u0E08 miss chronic conditions`), y < -30 && v.push(`\u26A0 \u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E25\u0E14 ${Math.abs(y)}% MoM \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A backlog \u0E2B\u0E23\u0E37\u0E2D absence`), j > V * .5 && v.push(`\u26A0 \u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19\u0E21\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B (${I.toFixed(0)}% \u0E02\u0E2D\u0E07\u0E17\u0E35\u0E21) \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 Quality drop`), v.length === 0 && v.push("\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07\u0E43\u0E19\u0E17\u0E31\u0E19\u0E17\u0E35");
  const M = [];
  g < .6 && (M.push("**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 1** \u2014 Audit 20 records \u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 \xB7 \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E01\u0E31\u0E1A Lab results + Vitals signs \xB7 \u0E23\u0E30\u0E1A\u0E38 missed CC/MCC"), M.push("**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 2** \u2014 \u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21 CC/MCC workshop \xB7 learn Top 10 comorbidity codes (DM CC, HT CC, CKD stage, obesity)"), M.push("**\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E17\u0E35\u0E48 3-4** \u2014 \u0E1B\u0E23\u0E31\u0E1A\u0E43\u0E0A\u0E49 Coding Checklist + Pre-review 5 records/\u0E27\u0E31\u0E19 \u0E01\u0E48\u0E2D\u0E19 finalize")), p < 2.5 && M.push("**\u0E23\u0E30\u0E22\u0E30\u0E01\u0E25\u0E32\u0E07** \u2014 \u0E43\u0E0A\u0E49 Chart Review template \xB7 \u0E1A\u0E31\u0E07\u0E04\u0E31\u0E1A\u0E14\u0E39 Problem List \xB7 Past Medical History \xB7 Medications \u0E17\u0E38\u0E01 case"), y < -30 && M.push("**\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19** \u2014 \u0E1E\u0E1A Coder 1-on-1 \xB7 \u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38 backlog \xB7 \u0E08\u0E31\u0E14\u0E2A\u0E23\u0E23 workload \u0E43\u0E2B\u0E21\u0E48\u0E2B\u0E23\u0E37\u0E2D\u0E2B\u0E32\u0E04\u0E19\u0E0A\u0E48\u0E27\u0E22"), g >= .8 && p >= 3.5 && (M.push("**\u0E23\u0E30\u0E22\u0E30\u0E22\u0E32\u0E27** \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E40\u0E1B\u0E47\u0E19 Coding Champion \xB7 Mentor coder \u0E2D\u0E37\u0E48\u0E19 \xB7 \u0E23\u0E48\u0E27\u0E21\u0E08\u0E31\u0E14\u0E17\u0E33 internal guidelines"), M.push("**Recognition** \u2014 \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E43\u0E19 HR \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 performance bonus")), M.length === 0 && M.push("**\u0E15\u0E48\u0E2D\u0E44\u0E1B** \u2014 \u0E23\u0E31\u0E01\u0E29\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 \xB7 \u0E40\u0E02\u0E49\u0E32\u0E23\u0E48\u0E27\u0E21 monthly coding calibration meeting");
  const W = Math.min(.85, g + .15),
    E0 = Math.min(4, p + .5),
    k = [];
  g < .7 && k.push(`CC Rate ${(g*100).toFixed(0)}% \u2192 **${(W*100).toFixed(0)}%** \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19`), p < 3 && k.push(`Dx/Case ${p.toFixed(1)} \u2192 **${E0.toFixed(1)}** \u0E20\u0E32\u0E22\u0E43\u0E19 3 \u0E40\u0E14\u0E37\u0E2D\u0E19`), k.length === 0 && k.push("\u0E23\u0E31\u0E01\u0E29\u0E32 KPI \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 \xB7 \u0E21\u0E38\u0E48\u0E07\u0E2A\u0E39\u0E48 Coding Champion status");
  const P = (W - g) * j * 15e3 * .08,
    G = Math.max(0, Math.round(P));
  return {
    priority: Z,
    priorityColor: S,
    priorityLabel: C,
    percentile: Q,
    rank: r,
    total: X,
    share: I,
    ccRateVsAvg: N,
    dxVsAvg: _,
    momGrowth: y,
    workloadStatus: $,
    situation: e0,
    rootCauses: Y,
    strengths: f,
    concerns: v,
    actions: M,
    targets: k,
    expectedRevenue: G
  }
}

function Z0({
  coder: s,
  insight: l
}) {
  const r = p => u.jsx("div", {
      style: {
        fontSize: "10px",
        fontWeight: 800,
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "4px"
      },
      children: p
    }),
    B = (p, j, A, z) => u.jsxs("div", {
      style: {
        flex: "1 1 180px",
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderTop: `3px solid ${z}`,
        borderRadius: "10px",
        padding: "10px 14px"
      },
      children: [u.jsx("div", {
        style: {
          fontSize: "10px",
          fontWeight: 700,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.04em"
        },
        children: p
      }), u.jsx("div", {
        style: {
          fontSize: "16px",
          fontWeight: 900,
          color: "#0f172a",
          marginTop: "3px"
        },
        children: j
      }), A && u.jsx("div", {
        style: {
          fontSize: "11px",
          fontWeight: 600,
          color: "#64748b",
          marginTop: "2px"
        },
        children: A
      })]
    }),
    g = (p, j, A, z) => u.jsxs("div", {
      style: {
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderLeft: `3px solid ${z}`,
        borderRadius: "10px",
        padding: "10px 14px",
        flex: "1 1 280px",
        minWidth: "280px"
      },
      children: [u.jsxs("div", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "#475569",
          marginBottom: "6px"
        },
        children: [p, " ", j]
      }), A.length === 0 ? u.jsx("div", {
        style: {
          fontSize: "12px",
          color: "#94a3b8",
          fontWeight: 500
        },
        children: "\u2014 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u2014"
      }) : u.jsx("ul", {
        style: {
          margin: 0,
          paddingLeft: "18px"
        },
        children: A.map((y, X) => u.jsx("li", {
          style: {
            fontSize: "12px",
            color: "#0f172a",
            lineHeight: 1.6,
            fontWeight: 500,
            marginBottom: "3px"
          },
          dangerouslySetInnerHTML: {
            __html: y.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
          }
        }, X))
      })]
    });
  return u.jsxs("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "14px"
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
          width: "4px",
          height: "22px",
          background: "linear-gradient(180deg, #7c3aed, #a855f7)",
          borderRadius: "99px"
        }
      }), u.jsxs("div", {
        style: {
          fontSize: "14px",
          fontWeight: 900,
          color: "#0f172a"
        },
        children: ["\u{1F9E0} AI Deep Insight \u2014 ", s.name]
      }), u.jsx("span", {
        style: {
          fontSize: "10px",
          fontWeight: 800,
          padding: "3px 10px",
          borderRadius: "99px",
          background: `${l.priorityColor}15`,
          color: l.priorityColor,
          letterSpacing: "0.03em"
        },
        children: l.priorityLabel
      }), u.jsxs("span", {
        style: {
          fontSize: "10px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(124,58,237,.1)",
          color: "#7c3aed"
        },
        children: ["\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A ", l.rank, "/", l.total, " \xB7 Percentile ", l.percentile]
      })]
    }), u.jsxs("div", {
      style: {
        background: "rgba(14,165,233,.05)",
        border: "1px dashed rgba(14,165,233,.25)",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "12.5px",
        lineHeight: 1.7,
        color: "#0f172a",
        fontWeight: 500
      },
      children: ["\u{1F4CC} ", u.jsx("b", {
        children: "\u0E2A\u0E16\u0E32\u0E19\u0E01\u0E32\u0E23\u0E13\u0E4C\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19:"
      }), " ", l.situation]
    }), u.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      },
      children: [B("Share \u0E02\u0E2D\u0E07\u0E17\u0E35\u0E21", `${l.share.toFixed(1)}%`, `${s.fiscal_total?.toLocaleString()||0} \u0E40\u0E04\u0E2A`, "#7c3aed"), B("CC Rate vs Team", `${l.ccRateVsAvg>=0?"+":""}${l.ccRateVsAvg.toFixed(0)}%`, `${(Number(s.cc_rate)*100).toFixed(0)}% vs \u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E17\u0E35\u0E21`, Math.abs(l.ccRateVsAvg) < 10 ? "#10b981" : l.ccRateVsAvg < 0 ? "#f43f5e" : "#10b981"), B("Dx/Case vs Team", `${l.dxVsAvg>=0?"+":""}${l.dxVsAvg.toFixed(0)}%`, `${Number(s.diag_per_case).toFixed(1)} vs \u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22`, Math.abs(l.dxVsAvg) < 15 ? "#10b981" : l.dxVsAvg < 0 ? "#f43f5e" : "#10b981"), B("Workload Status", l.workloadStatus.length > 30 ? l.workloadStatus.substring(0, 28) + ".." : l.workloadStatus, `MoM ${l.momGrowth>=0?"+":""}${l.momGrowth}%`, "#f59e0b")]
    }), u.jsxs("div", {
      style: {
        background: "rgba(245,158,11,.06)",
        border: "1px solid rgba(245,158,11,.2)",
        borderRadius: "10px",
        padding: "10px 14px"
      },
      children: [r("\u{1F50D} \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49 (Root Cause)"), u.jsx("ul", {
        style: {
          margin: "3px 0 0 0",
          paddingLeft: "18px"
        },
        children: l.rootCauses.map((p, j) => u.jsx("li", {
          style: {
            fontSize: "12px",
            lineHeight: 1.7,
            color: "#0f172a",
            fontWeight: 500,
            marginBottom: "3px"
          },
          children: p
        }, j))
      })]
    }), u.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      },
      children: [g("\u2705", "\u0E08\u0E38\u0E14\u0E40\u0E14\u0E48\u0E19 (Strengths)", l.strengths, "#10b981"), g("\u26A0", "\u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19\u0E04\u0E27\u0E23\u0E1B\u0E23\u0E31\u0E1A (Concerns)", l.concerns, "#f59e0b"), g("\u{1F3AF}", "\u0E41\u0E1C\u0E19\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23 (Action Plan)", l.actions, "#7c3aed")]
    }), u.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "8px"
      },
      children: [u.jsxs("div", {
        style: {
          background: "rgba(16,185,129,.06)",
          border: "1px solid rgba(16,185,129,.25)",
          borderRadius: "10px",
          padding: "10px 14px"
        },
        children: [r("\u{1F3AF} \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 KPI (3 \u0E40\u0E14\u0E37\u0E2D\u0E19)"), u.jsx("ul", {
          style: {
            margin: "3px 0 0 0",
            paddingLeft: "18px"
          },
          children: l.targets.map((p, j) => u.jsx("li", {
            style: {
              fontSize: "12px",
              lineHeight: 1.6,
              color: "#065f46",
              fontWeight: 600,
              marginBottom: "3px"
            },
            dangerouslySetInnerHTML: {
              __html: p.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
            }
          }, j))
        })]
      }), u.jsxs("div", {
        style: {
          background: "rgba(14,165,233,.06)",
          border: "1px solid rgba(14,165,233,.25)",
          borderRadius: "10px",
          padding: "10px 14px"
        },
        children: [r("\u{1F4B0} \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E1C\u0E25\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"), u.jsxs("div", {
          style: {
            fontSize: "16px",
            fontWeight: 900,
            color: "#0284c7",
            marginTop: "2px"
          },
          children: ["\u0E3F", l.expectedRevenue.toLocaleString()]
        }), u.jsx("div", {
          style: {
            fontSize: "11px",
            fontWeight: 600,
            color: "#475569",
            marginTop: "2px"
          },
          children: "\u0E16\u0E49\u0E32\u0E1A\u0E23\u0E23\u0E25\u0E38\u0E40\u0E1B\u0E49\u0E32 CC Rate \xB7 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E08\u0E32\u0E01 DRG upgrade effect 8%"
        })]
      })]
    })]
  })
}

function J0() {
  const s = H0(e => ({
      medRecToday: e.medRecToday,
      medRecAnalytics: e.medRecAnalytics,
      medRecDrgOpt: e.medRecDrgOpt,
      medRecFiscal: e.medRecFiscal,
      medRecHeatmap: e.medRecHeatmap,
      medRecTATrend: e.medRecTATrend,
      medRecRecovery: e.medRecRecovery,
      medRecAI: e.medRecAI
    })),
    {
      fetchData: l
    } = G0(),
    r = s.medRecToday || {};
  s.medRecAnalytics;
  const [B, g] = l0.useState(() => new Set), p = l0.useCallback(e => {
    g(i => {
      const c = new Set(i);
      return c.has(e) ? c.delete(e) : c.add(e), c
    })
  }, []), j = s.medRecDrgOpt || {}, A = j, z = s.medRecFiscal || {};
  l0.useEffect(() => {
    l("medRecToday", "/api/medrec/today"), l("medRecAnalytics", "/api/medrec/analytics"), l("medRecDrgOpt", "/api/medrec/drg-optimization"), l("medRecFiscal", "/api/medrec/revenue-fiscal"), l("medRecHeatmap", "/api/medrec/coding-heatmap"), l("medRecTATrend", "/api/medrec/turnaround-trend"), l("medRecRecovery", "/api/medrec/revenue-recovery");
    const e = setTimeout(() => l("medRecAI", "/api/ai/medrec/optimization"), 600);
    return () => clearTimeout(e)
  }, [l]);
  const y = l0.useMemo(() => (r.hourly || []).filter(e => e.hour >= 6 && e.hour <= 20), [r.hourly]),
    {
      trendData: X,
      trendCoders: V,
      fiscalLabel: I
    } = l0.useMemo(() => {
      if (!r.ipd_coders_trend_fy?.length) return {
        trendData: [],
        trendCoders: [],
        fiscalLabel: ""
      };
      const e = ["", "\u0E21.\u0E04.", "\u0E01.\u0E1E.", "\u0E21\u0E35.\u0E04.", "\u0E40\u0E21.\u0E22.", "\u0E1E.\u0E04.", "\u0E21\u0E34.\u0E22.", "\u0E01.\u0E04.", "\u0E2A.\u0E04.", "\u0E01.\u0E22.", "\u0E15.\u0E04.", "\u0E1E.\u0E22.", "\u0E18.\u0E04."],
        i = {},
        c = new Set;
      r.ipd_coders_trend_fy.forEach(m => {
        const [, D] = m.month.split("-"), h = m.month;
        i[h] || (i[h] = {
          month: h,
          label: e[parseInt(D)] || m.month
        }), i[h][m.name] = m.count, c.add(m.name)
      });
      const n = Object.values(i).sort((m, D) => m.month.localeCompare(D.month)),
        o = Array.from(c).map(m => ({
          name: m,
          total: r.ipd_coders_trend_fy.filter(D => D.name === m).reduce((D, h) => D + h.count, 0)
        })).sort((m, D) => D.total - m.total).slice(0, 5),
        t = new Date,
        d = t.getMonth() >= 9 ? t.getFullYear() : t.getFullYear() - 1;
      return {
        trendData: n,
        trendCoders: o.map(m => m.name),
        fiscalLabel: `\u0E1B\u0E35\u0E07\u0E1A ${d+1+543}`
      }
    }, [r.ipd_coders_trend_fy]),
    O = r.audit_total ?? 0,
    w = r.audit_coded ?? 0,
    N = r.pending_codes ?? 0,
    _ = r.quality_score ?? 0,
    Q = r.ipd_audit_total ?? 0,
    Z = r.ipd_audit_coded ?? 0,
    S = r.ipd_pending_codes ?? 0,
    C = r.ipd_quality_score ?? 0,
    $ = r.ipd_drg_score ?? 0,
    e0 = r.ipd_total_rw ?? 0,
    Y = r.ipd_avg_rw ?? 0,
    f = r.ipd_cmi ?? 0,
    v = r.ipd_adj_cmi ?? 0,
    M = r.ipd_total_base_rw ?? 0,
    W = r.ipd_rw_loss ?? 0,
    E0 = r.ipd_rw_reduced_cases ?? 0,
    k = r.ipd_avg_coding_days ?? 0,
    P = r.coders || [],
    G = r.ipd_coders_fiscal || r.ipd_coders || [],
    H = r.pending_wards || [],
    r0 = l0.useMemo(() => [{
      label: "OPD Coded",
      value: `${_}%`,
      icon: "\u2705",
      status: _ >= 90 ? "success" : _ >= 70 ? "warning" : "critical",
      target: "\u0E40\u0E1B\u0E49\u0E32 \u226595%"
    }, {
      label: "IPD Coding",
      value: `${C}%`,
      icon: "\u{1F4CA}",
      status: C >= 90 ? "success" : C >= 70 ? "warning" : "critical",
      target: "\u0E40\u0E1B\u0E49\u0E32 \u226595%"
    }, {
      label: "DRG Rate",
      value: `${$}%`,
      icon: "\u{1F9EE}",
      status: $ >= 90 ? "success" : $ >= 70 ? "warning" : "critical",
      target: "\u0E40\u0E1B\u0E49\u0E32 100%"
    }, {
      label: "CMI",
      value: f ? f.toFixed(3) : "\u2014",
      icon: "\u{1F3AF}",
      status: f >= 1 ? "success" : f >= .8 ? "normal" : "warning",
      target: "Benchmark \u22650.8"
    }, {
      label: "AdjCMI",
      value: v ? v.toFixed(3) : "\u2014",
      icon: "\u{1F4D0}",
      status: v >= f ? "success" : "warning",
      target: v >= f ? "\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E14" : "\u0E16\u0E39\u0E01\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E14"
    }, {
      label: "Total RW",
      value: a(e0, 2),
      icon: "\u2696\uFE0F",
      gradient: "#059669",
      status: "normal",
      target: "30 \u0E27\u0E31\u0E19"
    }, {
      label: "RW Loss",
      value: W > 0 ? `-${a(W,2)}` : "0",
      unit: `(${E0} cases)`,
      icon: "\u{1F4C9}",
      status: W > 5 ? "critical" : W > 0 ? "warning" : "success",
      target: "\u0E16\u0E39\u0E01\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E14\u0E08\u0E32\u0E01 LOS"
    }, {
      label: "Coding Days",
      value: k ? `${a(k,1)}` : "\u2014",
      unit: "\u0E27\u0E31\u0E19",
      icon: "\u23F1\uFE0F",
      status: (k ?? 0) <= 3 ? "success" : "warning",
      target: "\u0E40\u0E1B\u0E49\u0E32 \u22643 \u0E27\u0E31\u0E19"
    }], [r, _, C, $, f, v, e0, W, E0, k]),
    B0 = l0.useMemo(() => {
      const e = Math.round((_ + C + $) / 3);
      return [{
        title: "MRI Score (Medical Record Index)",
        icon: "\u2B50",
        priority: e >= 90 ? "LOW" : e >= 70 ? "MEDIUM" : "HIGH",
        summary: `MRI ${e}/100 -- \u0E04\u0E33\u0E19\u0E27\u0E13\u0E08\u0E32\u0E01 OPD Coding (${_}%) + IPD Coding (${C}%) + DRG Rate (${$}%) -- ${e>=90?"\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19\u0E17\u0E38\u0E01\u0E21\u0E34\u0E15\u0E34":e>=70?"\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E1A\u0E32\u0E07\u0E08\u0E38\u0E14":"\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E48\u0E07\u0E41\u0E01\u0E49\u0E44\u0E02"}`,
        analysis: `OPD Audit: ${a(w)}/${a(O)} coded (${_}%) | IPD Audit: ${a(Z)}/${a(Q)} coded (${C}%) | DRG Calculated: ${$}% | Avg Coding Time: ${k?a(k,1):"\u2014"} \u0E27\u0E31\u0E19`,
        recommendation: e >= 90 ? "\u0E04\u0E07\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E17\u0E33 Internal audit \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E25\u0E14\u0E40\u0E27\u0E25\u0E32\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E43\u0E2B\u0E49 <2 \u0E27\u0E31\u0E19" : "\u0E40\u0E23\u0E48\u0E07\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E49\u0E32\u0E07: (1) Assign pending cases (2) \u0E2D\u0E1A\u0E23\u0E21 Coder \u0E43\u0E2B\u0E21\u0E48 (3) AI-assisted coding",
        gradient: "#059669",
        gradientFrom: "rgba(5,150,105,.08)",
        gradientTo: "rgba(2,132,199,.04)",
        borderColor: "rgba(5,150,105,.25)",
        confidence: 93
      }, {
        title: "Coding Accuracy & Completeness",
        icon: "\u{1F3AF}",
        priority: N > 20 || S > 10 ? "HIGH" : N > 5 || S > 3 ? "MEDIUM" : "LOW",
        summary: `OPD Pending: ${a(N)} \u0E23\u0E32\u0E22 | IPD Pending: ${a(S)} \u0E23\u0E32\u0E22 -- ${N===0&&S===0?"\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E49\u0E32\u0E07\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A":"\u0E21\u0E35\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E49\u0E32\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23"}`,
        analysis: `OPD: ${N>0?`${a(N)} \u0E23\u0E32\u0E22 pending revenue \u2248 \u0E3F${r.pending_revenue?Number(r.pending_revenue).toLocaleString():"\u2014"}`:"\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E49\u0E32\u0E07"} | IPD: ${S>0?`${a(S)} \u0E23\u0E32\u0E22 pending \u2014 wards: ${H.slice(0,3).map(i=>i.ward).join(", ")||"N/A"}`:"\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E49\u0E32\u0E07"}`,
        recommendation: N > 0 || S > 0 ? "\u0E40\u0E23\u0E48\u0E07 Clear pending: (1) \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22 workload \u0E43\u0E2B\u0E49 Coders (2) Priority: IPD cases \u0E01\u0E48\u0E2D\u0E19 (impact DRG) (3) Timeline: \u0E20\u0E32\u0E22\u0E43\u0E19\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49" : "\u0E04\u0E07\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E20\u0E32\u0E22\u0E43\u0E19 SLA \u0E17\u0E38\u0E01\u0E27\u0E31\u0E19",
        gradient: "#0284c7",
        gradientFrom: "rgba(2,132,199,.08)",
        gradientTo: "rgba(14,165,233,.04)",
        borderColor: "rgba(2,132,199,.25)",
        confidence: 90
      }, {
        title: "CMI & DRG Intelligence",
        icon: "\u{1F3AF}",
        priority: f < .7 ? "HIGH" : f < .8 ? "MEDIUM" : "LOW",
        summary: `CMI ${f.toFixed(3)} (Benchmark \u22650.80) | AdjCMI ${v.toFixed(3)} | RW Loss: ${W>0?"-"+a(W,2)+" ("+E0+" cases)":"\u0E44\u0E21\u0E48\u0E21\u0E35"} -- ${f>=.8?"CMI \u2265 Benchmark \u0E14\u0E35":"CMI \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32 Benchmark \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A CC/MCC"}`,
        analysis: `CMI (Base RW): ${f.toFixed(3)} | AdjCMI (\u0E2B\u0E25\u0E31\u0E07\u0E1B\u0E23\u0E31\u0E1A LOS): ${v.toFixed(3)} | Base RW \u0E23\u0E27\u0E21: ${a(M,2)} | AdjRW \u0E23\u0E27\u0E21: ${a(e0,2)} | ${W>0?`\u0E16\u0E39\u0E01\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E14 ${a(W,2)} RW (${E0} cases) \u2248 \u0E3F${a(Math.round(W*8350))}`:"\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E14 RW"} | DRG Rate: ${$}%`,
        recommendation: f < .8 ? "\u0E40\u0E1E\u0E34\u0E48\u0E21 CMI: (1) \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A CC/MCC \u0E17\u0E38\u0E01 case income >20K (2) Review Unspecified PDx (3) \u0E40\u0E1B\u0E49\u0E32 CMI \u22650.80" : W > 5 ? `RW \u0E16\u0E39\u0E01\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E14 ${a(W,2)} \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A LOS trimpoint \u0E41\u0E25\u0E30 AdjRW criteria` : "CMI & DRG \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35 \u2014 Focus: CC/MCC completeness + DRG grouper alignment",
        gradient: "#7c3aed",
        gradientFrom: "rgba(124,58,237,.08)",
        gradientTo: "rgba(99,102,241,.04)",
        borderColor: "rgba(124,58,237,.25)",
        confidence: 88
      }, {
        title: "Staff Productivity Analysis",
        icon: "\u{1F469}\u200D\u{1F4BB}",
        priority: (k ?? 0) > 5 ? "HIGH" : (k ?? 0) > 3 ? "MEDIUM" : "LOW",
        summary: `Avg Coding Time: ${k?a(k,1):"\u2014"} \u0E27\u0E31\u0E19 | OPD Coders: ${P.length} | IPD Coders: ${G.length} -- ${(k??0)<=3?"Turnaround \u0E14\u0E35 \u0E20\u0E32\u0E22\u0E43\u0E19 SLA":"Turnaround \u0E0A\u0E49\u0E32 \u0E40\u0E01\u0E34\u0E19 SLA"}`,
        analysis: `OPD Top Coder: ${P[0]?.name??"N/A"} (${P[0]?.count??0} cases) | IPD Top Coder: ${G[0]?.name??"N/A"} (${G[0]?.current_month_total??G[0]?.count??0} cases) | Workload distribution: ${P.length+G.length} active coders`,
        recommendation: (k ?? 0) > 3 ? "\u0E25\u0E14 Turnaround: (1) Assign deadline per case (2) \u0E40\u0E1E\u0E34\u0E48\u0E21 Coder / AI-assist (3) Priority queue for IPD (4) \u0E40\u0E1B\u0E49\u0E32 \u22642 \u0E27\u0E31\u0E19" : "\u0E04\u0E07\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u0E17\u0E33 Performance Dashboard \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \u0E41\u0E08\u0E01\u0E23\u0E32\u0E07\u0E27\u0E31\u0E25 Top Coder",
        gradient: "#f59e0b",
        gradientFrom: "rgba(245,158,11,.08)",
        gradientTo: "rgba(234,179,8,.04)",
        borderColor: "rgba(245,158,11,.25)",
        confidence: 86
      }]
    }, [r, _, O, w, N, Q, Z, S, C, $, e0, Y, f, v, M, W, E0, k, P, G, H, j]),
    i0 = Math.round(((_ || 0) + (C || 0) + ($ || 0)) / 3),
    p0 = Math.round(Math.min(100, (f || 0) * 100)),
    g0 = Math.max(0, 100 - Math.round((k || 0) * 5)),
    J = Math.max(0, 100 - Math.round((r?.pending_revenue || 0) / 5e3)),
    K = Math.round(i0 * .3 + p0 * .25 + g0 * .2 + J * .25),
    F = K >= 85 ? "#10b981" : K >= 65 ? "#f59e0b" : "#ef4444",
    U = K >= 85 ? "\u2705" : K >= 65 ? "\u26A0\uFE0F" : "\u{1F534}",
    j0 = K >= 85 ? "\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E14\u0E35" : K >= 65 ? "\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E48\u0E07\u0E41\u0E01\u0E49\u0E44\u0E02",
    P0 = [{
      label: "\u{1F4CB} \u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
      score: i0,
      sub: `OPD ${_}% \xB7 IPD ${C}% \xB7 DRG ${$}%`
    }, {
      label: "\u{1FA7A} \u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E",
      score: p0,
      sub: `CMI ${(f||0).toFixed(2)} (\u0E40\u0E1B\u0E49\u0E32 1.00)`
    }, {
      label: "\u26A1 \u0E04\u0E27\u0E32\u0E21\u0E40\u0E23\u0E47\u0E27",
      score: g0,
      sub: `${k||0} \u0E27\u0E31\u0E19 (\u0E40\u0E1B\u0E49\u0E32 \u22643)`
    }, {
      label: "\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49",
      score: J,
      sub: `\u0E23\u0E2D\u0E40\u0E01\u0E47\u0E1A \u0E3F${(r?.pending_revenue||0).toLocaleString()}`
    }];
  return u.jsxs("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
      paddingBottom: "3rem"
    },
    children: [u.jsxs("div", {
      style: {
        background: `linear-gradient(135deg, ${F}12 0%, var(--md-surface) 100%)`,
        border: `2px solid ${F}30`,
        borderRadius: "20px",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
        boxShadow: `0 4px 20px ${F}15`
      },
      children: [u.jsxs("div", {
        style: {
          flexShrink: 0,
          minWidth: "180px"
        },
        children: [u.jsx("div", {
          style: {
            fontSize: "11px",
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontWeight: 800,
            marginBottom: "6px"
          },
          children: "\u{1F3E5} \u0E14\u0E31\u0E0A\u0E19\u0E35\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25"
        }), u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "baseline",
            gap: "6px"
          },
          children: [u.jsx("span", {
            style: {
              fontSize: "56px",
              fontWeight: 900,
              color: F,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              fontVariantNumeric: "tabular-nums"
            },
            children: K
          }), u.jsx("span", {
            style: {
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: "/100"
          })]
        }), u.jsxs("div", {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 14px",
            borderRadius: "999px",
            background: `${F}18`,
            color: F,
            fontSize: "12px",
            fontWeight: 800,
            marginTop: "10px",
            border: `1px solid ${F}40`
          },
          children: [U, " ", j0]
        })]
      }), u.jsx("div", {
        style: {
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "10px",
          minWidth: "260px"
        },
        children: P0.map((e, i) => u.jsxs("div", {
          style: {
            padding: "10px 12px",
            borderRadius: "12px",
            background: "var(--md-surface-2, rgba(0,0,0,.03))",
            borderLeft: `3px solid ${e.score>=85?"#10b981":e.score>=65?"#f59e0b":"#ef4444"}`
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--md-text-secondary)",
              marginBottom: "3px"
            },
            children: e.label
          }), u.jsxs("div", {
            style: {
              fontSize: "20px",
              fontWeight: 900,
              color: e.score >= 85 ? "#10b981" : e.score >= 65 ? "#f59e0b" : "#ef4444",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums"
            },
            children: [e.score, u.jsx("span", {
              style: {
                fontSize: "10px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                marginLeft: "2px"
              },
              children: "/100"
            })]
          }), u.jsx("div", {
            style: {
              fontSize: "9px",
              color: "var(--md-text-tertiary)",
              marginTop: "3px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            title: e.sub,
            children: e.sub
          })]
        }, i))
      })]
    }), u.jsx(N0, {
      metrics: r0
    }), u.jsx(n0, {
      name: "AI Medical Record Intelligence",
      children: u.jsxs("div", {
        children: [u.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px"
          },
          children: [u.jsx("div", {
            style: {
              width: "4px",
              height: "20px",
              borderRadius: "4px",
              background: "linear-gradient(180deg, #059669, #7c3aed)"
            }
          }), u.jsx("span", {
            style: {
              fontSize: "14px",
              fontWeight: 900,
              color: E.text,
              letterSpacing: "-0.01em"
            },
            children: "\u{1F9E0} AI Medical Record Intelligence"
          }), u.jsx(A0, {
            label: "4 Analytics Modules",
            color: E.ipd
          })]
        }), u.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "12px"
          },
          children: B0.map((e, i) => u.jsx(K0, {
            ...e
          }, i))
        })]
      })
    }), u.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        padding: "1rem 1.5rem",
        borderRadius: "16px",
        background: E.surface,
        border: `1px solid ${E.border}`
      },
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px"
        },
        children: [u.jsx("div", {
          style: {
            width: "44px",
            height: "44px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #059669, #0284c7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
            boxShadow: "0 4px 16px rgba(5,150,105,.3)"
          },
          children: "\u{1F4C7}"
        }), u.jsxs("div", {
          children: [u.jsx("div", {
            style: {
              fontSize: "18px",
              fontWeight: 900,
              color: E.text,
              letterSpacing: "-0.01em"
            },
            children: "Medical Record Audit"
          }), u.jsx("div", {
            style: {
              fontSize: "12px",
              color: E.muted,
              fontWeight: 600
            },
            children: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04 \u2014 HOSxP XE Live"
          })]
        })]
      }), u.jsxs("div", {
        style: {
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexWrap: "wrap"
        },
        children: [u.jsx(A0, {
          label: "OPD Live",
          color: E.opd
        }), u.jsx(A0, {
          label: "IPD 30 \u0E27\u0E31\u0E19",
          color: E.ipd
        }), u.jsx(A0, {
          label: `\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${r.timestamp?new Date(r.timestamp).toLocaleTimeString("th-TH",{hour:"2-digit",minute:"2-digit"}):"\u2014"}`,
          color: E.muted
        })]
      })]
    }), u.jsxs(o0, {
      color: E.opd,
      icon: "\u{1F535}",
      title: "OPD \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01",
      sub: "Out-Patient Department \xB7 \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
      badge: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 Real-time",
      children: [u.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "1.5rem"
        },
        children: [u.jsx(R, {
          icon: "\u{1F465}",
          label: "\u0E1C\u0E39\u0E49\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
          value: a(r.total_visits),
          sub: `${a(r.unique_patients)} HN \u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33`,
          color: E.opd,
          size: "lg"
        }), u.jsx(R, {
          icon: "\u{1F195}",
          label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E2B\u0E21\u0E48",
          value: a(r.new_patients),
          sub: `${r.total_visits>0?Math.round(r.new_patients/r.total_visits*100):0}% \u0E02\u0E2D\u0E07\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49`,
          color: E.opd,
          progress: r.total_visits > 0 ? r.new_patients / r.total_visits * 100 : 0
        }), u.jsx(R, {
          icon: "\u{1F504}",
          label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E40\u0E01\u0E48\u0E32",
          value: a(r.old_patients),
          sub: `${r.total_visits>0?Math.round(r.old_patients/r.total_visits*100):0}% \u0E02\u0E2D\u0E07\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49`,
          color: "#64748b"
        }), u.jsx(R, {
          icon: "\u{1F474}",
          label: "\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38 (\u226560)",
          value: a(r.elderly),
          sub: `\u0E40\u0E14\u0E47\u0E01 (\u226415) ${a(r.children)} \u0E23\u0E32\u0E22`,
          color: E.warn
        }), u.jsx(R, {
          icon: "\u23F1\uFE0F",
          label: "\u0E23\u0E2D\u0E23\u0E31\u0E1A\u0E1A\u0E31\u0E15\u0E23 (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22)",
          value: r.avg_reg_time ? `${a(r.avg_reg_time,1)} \u0E19.` : "\u2014",
          sub: "\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19",
          color: r.avg_reg_time > 30 ? E.danger : E.ok
        }), u.jsx(R, {
          icon: "\u23F3",
          label: "\u0E23\u0E2D\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22)",
          value: r.avg_proc_time ? `${a(r.avg_proc_time,1)} \u0E19.` : "\u2014",
          sub: "\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E40\u0E23\u0E35\u0E22\u0E01\u0E04\u0E34\u0E27",
          color: r.avg_proc_time > 60 ? E.danger : E.ok
        })]
      }), u.jsx(x0, {}), u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "stretch",
          gap: "16px",
          flexWrap: "wrap"
        },
        children: [u.jsxs("div", {
          style: {
            padding: "1.25rem 1.5rem",
            borderRadius: "16px",
            background: E.bg,
            border: `1px solid ${E.border}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "140px"
          },
          children: [u.jsx(C0, {
            score: _,
            label: "Audit OPD",
            color: t0(_)
          }), u.jsx("div", {
            style: {
              marginTop: "8px",
              fontSize: "12px",
              fontWeight: 700,
              color: E.muted,
              textAlign: "center"
            },
            children: _ >= 90 ? "\u2705 \u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C" : _ >= 70 ? "\u26A0\uFE0F \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07" : "\u274C \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C"
          })]
        }), u.jsxs("div", {
          style: {
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "12px"
          },
          children: [u.jsx(R, {
            icon: "\u{1F4CB}",
            label: "OPD \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
            value: a(O),
            color: E.opd
          }), u.jsx(R, {
            icon: "\u2705",
            label: "Coded \u0E41\u0E25\u0E49\u0E27",
            value: a(w),
            sub: `${O>0?Math.round(w/O*100):0}%`,
            color: E.ok,
            progress: O > 0 ? w / O * 100 : 0,
            target: "\u0E40\u0E1B\u0E49\u0E32 100%"
          }), u.jsx(R, {
            icon: "\u{1F534}",
            label: "\u0E23\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
            value: a(N),
            color: N > 0 ? E.danger : E.ok,
            sub: N > 0 ? "\u0E15\u0E49\u0E2D\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23" : "\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"
          }), u.jsx(R, {
            icon: "\u{1F4B0}",
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
            value: r.pending_revenue > 0 ? `\u0E3F${Number(r.pending_revenue).toLocaleString()}` : "\u2014",
            color: E.warn,
            sub: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"
          })]
        })]
      }), u.jsx(x0, {}), u.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px"
        },
        children: [u.jsxs("div", {
          style: {
            borderRadius: "14px",
            background: E.bg,
            border: `1px solid ${E.border}`,
            padding: "1rem"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "13px",
              fontWeight: 800,
              color: E.text,
              marginBottom: "1rem"
            },
            children: "\u{1F4C8} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E32\u0E22\u0E0A\u0E31\u0E48\u0E27\u0E42\u0E21\u0E07 (06:00\u201320:00)"
          }), u.jsx(d0, {
            width: "100%",
            height: 160,
            children: u.jsxs(W0, {
              data: y,
              margin: {
                top: 4,
                right: 8,
                left: -20,
                bottom: 0
              },
              children: [u.jsx(h0, {
                strokeDasharray: "3 3",
                stroke: `${E.opd}15`,
                vertical: !1
              }), u.jsx(m0, {
                dataKey: "label",
                tick: {
                  fontSize: 9,
                  fill: E.muted
                },
                interval: 2
              }), u.jsx(f0, {
                tick: {
                  fontSize: 9,
                  fill: E.muted
                }
              }), u.jsx(b0, {
                contentStyle: {
                  fontSize: 11,
                  borderRadius: 8,
                  background: E.surface,
                  border: `1px solid ${E.border}`
                }
              }), u.jsx(w0, {
                dataKey: "count",
                fill: E.opd,
                radius: [4, 4, 0, 0],
                name: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22"
              })]
            })
          })]
        }), u.jsxs("div", {
          style: {
            borderRadius: "14px",
            background: E.bg,
            border: `1px solid ${E.border}`,
            padding: "1rem"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "13px",
              fontWeight: 800,
              color: E.text,
              marginBottom: "0.5rem"
            },
            children: "\u{1F469}\u200D\u{1F4BB} OPD Coders \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49"
          }), P.length === 0 ? u.jsx("div", {
            style: {
              textAlign: "center",
              color: E.muted,
              fontSize: "13px",
              padding: "2rem 0"
            },
            children: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
          }) : P.map((e, i) => u.jsx(y0, {
            rank: i + 1,
            name: e.name,
            count: e.count,
            total: P.reduce((c, n) => c + n.count, 0),
            color: a0[i % a0.length]
          }, i))]
        }), u.jsxs("div", {
          style: {
            borderRadius: "14px",
            background: E.bg,
            border: `1px solid ${E.border}`,
            padding: "1rem"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "13px",
              fontWeight: 800,
              color: E.text,
              marginBottom: "0.5rem"
            },
            children: "\u{1F3E2} \u0E41\u0E1C\u0E19\u0E01 Top 5 (\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49)"
          }), (r.top_departments || []).map((e, i) => u.jsx(y0, {
            rank: i + 1,
            name: e.name,
            count: e.count,
            total: (r.top_departments || []).reduce((c, n) => c + n.count, 0),
            color: E.opd
          }, i)), (r.top_departments || []).length === 0 && u.jsx("div", {
            style: {
              textAlign: "center",
              color: E.muted,
              fontSize: "13px",
              padding: "2rem 0"
            },
            children: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
          })]
        })]
      })]
    }), u.jsxs(o0, {
      color: E.ipd,
      icon: "\u{1F7E2}",
      title: "IPD \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19",
      sub: "In-Patient Department \xB7 \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
      badge: "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "flex-start",
          marginBottom: "1.5rem"
        },
        children: [u.jsxs("div", {
          style: {
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            padding: "1.25rem 2rem",
            borderRadius: "16px",
            background: E.bg,
            border: `1px solid ${E.border}`
          },
          children: [u.jsx(C0, {
            score: C,
            label: "Coding Completeness",
            color: t0(C)
          }), u.jsx(C0, {
            score: $,
            label: "DRG Calculated",
            color: t0($)
          })]
        }), u.jsxs("div", {
          style: {
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px"
          },
          children: [u.jsx(R, {
            icon: "\u{1F4C1}",
            label: "IPD \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 30 \u0E27\u0E31\u0E19",
            value: a(Q),
            color: E.ipd,
            size: "lg"
          }), u.jsx(R, {
            icon: "\u2705",
            label: "Coded \u0E41\u0E25\u0E49\u0E27",
            value: a(Z),
            sub: `${Q>0?Math.round(Z/Q*100):0}%`,
            color: E.ok,
            progress: Q > 0 ? Z / Q * 100 : 0,
            target: "\u0E40\u0E1B\u0E49\u0E32 100%"
          }), u.jsx(R, {
            icon: "\u{1F534}",
            label: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
            value: a(S),
            color: S > 0 ? E.danger : E.ok,
            sub: S > 0 ? "\u0E15\u0E49\u0E2D\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23" : "\u0E40\u0E23\u0E35\u0E22\u0E1A\u0E23\u0E49\u0E2D\u0E22"
          }), u.jsx(R, {
            icon: "\u23F1\uFE0F",
            label: "\u0E40\u0E27\u0E25\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
            value: k ? `${a(k,1)} \u0E27\u0E31\u0E19` : "\u2014",
            color: k > 3 ? E.warn : E.ok,
            sub: "\u0E2B\u0E25\u0E31\u0E07\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22"
          })]
        })]
      }), u.jsx(x0, {}), u.jsxs("div", {
        style: {
          marginBottom: "1rem"
        },
        children: [u.jsx("div", {
          style: {
            fontSize: "13px",
            fontWeight: 800,
            color: E.text,
            marginBottom: "12px"
          },
          children: "\u{1F3AF} Case Mix Index (CMI) & DRG"
        }), u.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "12px"
          },
          children: [u.jsx(R, {
            icon: "\u{1F3AF}",
            label: "CMI (Base RW)",
            value: f ? f.toFixed(3) : "\u2014",
            color: f >= .8 ? E.ok : E.warn,
            size: "lg",
            sub: f >= 1 ? "\u2705 Excellent" : f >= .8 ? "\u2705 \u2265 Benchmark" : "\u26A0\uFE0F \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32 0.80"
          }), u.jsx(R, {
            icon: "\u{1F4D0}",
            label: "AdjCMI (\u0E2B\u0E25\u0E31\u0E07 LOS)",
            value: v ? v.toFixed(3) : "\u2014",
            color: v >= f ? E.ok : E.warn,
            sub: v >= f ? "\u2705 \u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E14" : `\u26A0\uFE0F \u0E25\u0E14\u0E25\u0E07 ${(f-v).toFixed(3)}`
          }), u.jsx(R, {
            icon: "\u2696\uFE0F",
            label: "Total RW",
            value: a(e0, 2),
            color: E.ipd,
            sub: `Base: ${a(M,2)}`
          }), u.jsx(R, {
            icon: "\u{1F4C9}",
            label: "RW \u0E16\u0E39\u0E01\u0E1B\u0E23\u0E31\u0E1A\u0E25\u0E14",
            value: W > 0 ? `-${a(W,2)}` : "0",
            color: W > 5 ? E.danger : W > 0 ? E.warn : E.ok,
            sub: E0 > 0 ? `${E0} cases \u2248 \u0E3F${a(Math.round(W*8350))}` : "\u0E44\u0E21\u0E48\u0E21\u0E35"
          }), u.jsx(R, {
            icon: "\u{1F9EE}",
            label: "DRG Rate",
            value: `${$}%`,
            color: t0($),
            progress: $,
            target: "\u0E40\u0E1B\u0E49\u0E32 100%"
          }), u.jsx(R, {
            icon: "\u{1F3E5}",
            label: "Coding Rate",
            value: `${C}%`,
            color: t0(C),
            progress: C,
            target: "\u0E40\u0E1B\u0E49\u0E32 \u2265 95%"
          })]
        })]
      }), u.jsx(x0, {}), u.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px"
        },
        children: [u.jsxs("div", {
          style: {
            borderRadius: "14px",
            background: E.bg,
            border: `1px solid ${E.border}`,
            padding: "1rem"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "13px",
              fontWeight: 800,
              color: E.text,
              marginBottom: "0.5rem"
            },
            children: "\u{1F534} Ward \u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A (Top 5)"
          }), H.length === 0 ? u.jsx("div", {
            style: {
              textAlign: "center",
              color: E.ok,
              fontSize: "13px",
              fontWeight: 700,
              padding: "1.5rem 0"
            },
            children: "\u2705 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E49\u0E32\u0E07\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A"
          }) : H.map((e, i) => u.jsx(y0, {
            rank: i + 1,
            name: e.ward,
            count: e.count,
            total: H.reduce((c, n) => c + n.count, 0),
            color: E.danger,
            extra: "cases"
          }, i))]
        }), u.jsxs("div", {
          style: {
            borderRadius: "14px",
            background: E.bg,
            border: `1px solid ${E.border}`,
            padding: "1rem"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "13px",
              fontWeight: 800,
              color: E.text,
              marginBottom: "0.5rem"
            },
            children: "\u{1F469}\u200D\u{1F4BB} IPD Coders \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49"
          }), G.length === 0 ? u.jsx("div", {
            style: {
              textAlign: "center",
              color: E.muted,
              fontSize: "13px",
              padding: "2rem 0"
            },
            children: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
          }) : G.slice(0, 5).map((e, i) => {
            const c = e.current_month_total ?? e.count ?? 0,
              n = G.slice(0, 5).reduce((o, t) => o + (t.current_month_total ?? t.count ?? 0), 0);
            return u.jsx(y0, {
              rank: i + 1,
              name: e.name,
              count: c,
              total: n,
              color: a0[i % a0.length],
              extra: e.cc_rate != null ? `CC ${(e.cc_rate*100).toFixed(0)}%` : void 0
            }, i)
          })]
        })]
      })]
    }), u.jsxs(o0, {
      color: E.coder,
      icon: "\u{1F7E3}",
      title: "Coder Performance",
      sub: `\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04${I?` \xB7 ${I}`:""}`,
      badge: "\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
      children: [G.length > 0 && u.jsxs(u.Fragment, {
        children: [u.jsxs("div", {
          style: {
            fontSize: "13px",
            fontWeight: 800,
            color: E.text,
            marginBottom: "12px"
          },
          children: ["\u{1F4CA} \u0E2A\u0E16\u0E34\u0E15\u0E34\u0E23\u0E32\u0E22\u0E1A\u0E38\u0E04\u0E04\u0E25 \u2014 IPD Coder (", I, ")"]
        }), u.jsx("div", {
          style: {
            overflowX: "auto",
            borderRadius: "12px",
            border: `1px solid ${E.border}`
          },
          children: u.jsxs("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px"
            },
            children: [u.jsx("thead", {
              children: u.jsx("tr", {
                style: {
                  background: `${E.coder}12`,
                  borderBottom: `2px solid ${E.coder}25`
                },
                children: ["#", "\u0E0A\u0E37\u0E48\u0E2D Coder", "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49", "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19", "\u0E1B\u0E35\u0E07\u0E1A\u0E2F \u0E23\u0E27\u0E21", "CC Rate", "Diag/Case", "RW Type 1"].map((e, i) => u.jsx("th", {
                  style: {
                    padding: "10px 12px",
                    textAlign: i <= 1 ? "left" : "center",
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: E.coder,
                    whiteSpace: "nowrap"
                  },
                  children: e
                }, i))
              })
            }), u.jsx("tbody", {
              children: G.slice(0, 8).map((e, i) => {
                const c = e.current_month_total ?? 0,
                  n = e.prev_month_total ?? 0,
                  o = c - n;
                return u.jsxs("tr", {
                  style: {
                    borderBottom: `1px solid ${E.border}`,
                    background: i % 2 === 0 ? "transparent" : `${E.coder}04`
                  },
                  children: [u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      fontWeight: 900,
                      color: E.coder
                    },
                    children: i + 1
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      fontWeight: 700,
                      color: E.text,
                      whiteSpace: "nowrap"
                    },
                    children: e.name
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "center",
                      fontWeight: 900,
                      color: E.coder
                    },
                    children: a(c)
                  }), u.jsxs("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "center",
                      color: E.sub
                    },
                    children: [a(n), n > 0 && u.jsxs("span", {
                      style: {
                        marginLeft: "4px",
                        fontSize: "11px",
                        color: o >= 0 ? E.ok : E.danger
                      },
                      children: [o >= 0 ? "\u25B2" : "\u25BC", Math.abs(o)]
                    })]
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "center",
                      fontWeight: 700,
                      color: E.text
                    },
                    children: a(e.fiscal_total)
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "center",
                      color: e.cc_rate >= .5 ? E.ok : E.warn,
                      fontWeight: 700
                    },
                    children: e.cc_rate != null ? `${(e.cc_rate*100).toFixed(0)}%` : "\u2014"
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "center",
                      color: E.sub
                    },
                    children: e.diag_per_case != null ? a(e.diag_per_case, 1) : "\u2014"
                  }), u.jsx("td", {
                    style: {
                      padding: "10px 12px",
                      textAlign: "center",
                      color: E.sub
                    },
                    children: e.type1_per_case != null ? a(e.type1_per_case, 1) : "\u2014"
                  })]
                }, i)
              })
            })]
          })
        }), u.jsx(x0, {})]
      }), X.length > 0 && u.jsxs("div", {
        style: {
          borderRadius: "14px",
          background: E.bg,
          border: `1px solid ${E.border}`,
          padding: "1rem"
        },
        children: [u.jsxs("div", {
          style: {
            fontSize: "13px",
            fontWeight: 800,
            color: E.text,
            marginBottom: "1rem"
          },
          children: ["\u{1F4C8} \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E01\u0E32\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A IPD \u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 (", I, ")"]
        }), u.jsx(d0, {
          width: "100%",
          height: 220,
          children: u.jsxs(z0, {
            data: X,
            margin: {
              top: 4,
              right: 16,
              left: -20,
              bottom: 0
            },
            children: [u.jsx(h0, {
              strokeDasharray: "3 3",
              stroke: `${E.coder}15`,
              vertical: !1
            }), u.jsx(m0, {
              dataKey: "label",
              tick: {
                fontSize: 10,
                fill: E.muted
              }
            }), u.jsx(f0, {
              tick: {
                fontSize: 10,
                fill: E.muted
              }
            }), u.jsx(b0, {
              contentStyle: {
                fontSize: 11,
                borderRadius: 8,
                background: E.surface,
                border: `1px solid ${E.border}`
              }
            }), u.jsx(Y0, {
              wrapperStyle: {
                fontSize: 11
              }
            }), V.map((e, i) => u.jsx(D0, {
              type: "monotone",
              dataKey: e,
              name: e,
              stroke: a0[i % a0.length],
              strokeWidth: 2,
              dot: !1,
              connectNulls: !0
            }, e))]
          })
        })]
      }), u.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginTop: "1.5rem"
        },
        children: [u.jsx(R, {
          icon: "\u{1F4CA}",
          label: "OPD Coding Rate \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
          value: `${_}%`,
          color: t0(_),
          progress: _,
          target: "\u0E40\u0E1B\u0E49\u0E32 \u2265 95%"
        }), u.jsx(R, {
          icon: "\u{1F4CA}",
          label: "IPD Coding Rate 30 \u0E27\u0E31\u0E19",
          value: `${C}%`,
          color: t0(C),
          progress: C,
          target: "\u0E40\u0E1B\u0E49\u0E32 \u2265 95%"
        }), u.jsx(R, {
          icon: "\u2696\uFE0F",
          label: "DRG Calculation Rate",
          value: `${$}%`,
          color: t0($),
          progress: $,
          target: "\u0E40\u0E1B\u0E49\u0E32 100%"
        }), u.jsx(R, {
          icon: "\u23F1\uFE0F",
          label: "\u0E40\u0E27\u0E25\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A",
          value: k ? `${a(k,1)} \u0E27\u0E31\u0E19` : "\u2014",
          color: k > 3 ? E.warn : E.ok,
          sub: "\u0E2B\u0E25\u0E31\u0E07\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 \xB7 \u0E40\u0E1B\u0E49\u0E32 \u2264 3 \u0E27\u0E31\u0E19"
        })]
      })]
    }), u.jsxs(o0, {
      color: "#f59e0b",
      icon: "\u{1F4B0}",
      title: "Revenue & Fiscal Summary",
      sub: "\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E41\u0E25\u0E30\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 DRG \u0E15\u0E32\u0E21\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
      badge: "\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
      children: [u.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
          marginBottom: "1.5rem"
        },
        children: [u.jsx(R, {
          icon: "\u2696\uFE0F",
          label: "Total RW (30 \u0E27\u0E31\u0E19)",
          value: a(e0, 2),
          color: E.ipd,
          size: "lg"
        }), u.jsx(R, {
          icon: "\u{1F4CA}",
          label: "Avg RW / Case",
          value: a(Y, 2),
          color: Y >= 1 ? E.ok : E.warn,
          sub: Y >= 1 ? "RW \u2265 1.0 \u0E14\u0E35" : "RW < 1.0 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A"
        }), u.jsx(R, {
          icon: "\u{1F4B0}",
          label: "OPD Pending Revenue",
          value: r.pending_revenue > 0 ? `\u0E3F${Number(r.pending_revenue).toLocaleString()}` : "\u2014",
          color: E.warn,
          sub: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 OPD \u0E23\u0E2D\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A"
        }), u.jsx(R, {
          icon: "\u{1F4CB}",
          label: "OPD Coding Rate",
          value: `${_}%`,
          color: t0(_),
          progress: _,
          target: "\u0E40\u0E1B\u0E49\u0E32 \u2265 95%"
        }), u.jsx(R, {
          icon: "\u{1F4CA}",
          label: "IPD Coding Rate",
          value: `${C}%`,
          color: t0(C),
          progress: C,
          target: "\u0E40\u0E1B\u0E49\u0E32 \u2265 95%"
        }), u.jsx(R, {
          icon: "\u{1F9EE}",
          label: "DRG Calculation",
          value: `${$}%`,
          color: t0($),
          progress: $,
          target: "\u0E40\u0E1B\u0E49\u0E32 100%"
        })]
      }), (z.fiscal_years || []).length > 0 && (() => {
        const e = z.fiscal_years,
          i = ["#94a3b8", "#059669", "#f59e0b"],
          c = ["\u0E15.\u0E04.", "\u0E1E.\u0E22.", "\u0E18.\u0E04.", "\u0E21.\u0E04.", "\u0E01.\u0E1E.", "\u0E21\u0E35.\u0E04.", "\u0E40\u0E21.\u0E22.", "\u0E1E.\u0E04.", "\u0E21\u0E34.\u0E22.", "\u0E01.\u0E04.", "\u0E2A.\u0E04.", "\u0E01.\u0E22."].map((n, o) => {
            const t = {
              month: n
            };
            return e.forEach((d, m) => {
              t[`fy${m}`] = d.months?.[o]?.revenue || d.months?.[o]?.rw || 0
            }), t
          });
        return u.jsxs("div", {
          style: {
            borderRadius: "14px",
            background: E.bg,
            border: `1px solid ${E.border}`,
            padding: "1rem"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "13px",
              fontWeight: 800,
              color: E.text,
              marginBottom: "1rem"
            },
            children: "\u{1F4C8} \u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 / RW \u0E15\u0E32\u0E21\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13"
          }), u.jsx("div", {
            style: {
              display: "flex",
              gap: "12px",
              marginBottom: "12px",
              flexWrap: "wrap"
            },
            children: e.map((n, o) => u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  background: i[o % 3]
                }
              }), u.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: E.sub
                },
                children: n.fiscal_label || `FY${o+1}`
              }), n.total_revenue && u.jsxs("span", {
                style: {
                  fontSize: "11px",
                  color: E.muted
                },
                children: ["\u0E3F", (n.total_revenue / 1e6).toFixed(1), "M"]
              }), n.total_rw && u.jsxs("span", {
                style: {
                  fontSize: "11px",
                  color: E.muted
                },
                children: ["RW ", a(n.total_rw, 1)]
              })]
            }, o))
          }), u.jsx(d0, {
            width: "100%",
            height: 220,
            children: u.jsxs(W0, {
              data: c,
              margin: {
                top: 4,
                right: 12,
                left: -20,
                bottom: 0
              },
              children: [u.jsx(h0, {
                strokeDasharray: "3 3",
                stroke: `${E.muted}15`,
                vertical: !1
              }), u.jsx(m0, {
                dataKey: "month",
                tick: {
                  fontSize: 9,
                  fill: E.muted
                }
              }), u.jsx(f0, {
                tick: {
                  fontSize: 9,
                  fill: E.muted
                },
                tickFormatter: n => n >= 1e6 ? `${(n/1e6).toFixed(0)}M` : n >= 1e3 ? `${(n/1e3).toFixed(0)}K` : `${n}`
              }), u.jsx(b0, {
                contentStyle: {
                  fontSize: 11,
                  borderRadius: 8,
                  background: E.surface,
                  border: `1px solid ${E.border}`
                }
              }), e.map((n, o) => u.jsx(w0, {
                dataKey: `fy${o}`,
                name: n.fiscal_label || `\u0E1B\u0E35\u0E07\u0E1A ${n.be||o+1}`,
                fill: i[o % 3],
                radius: [3, 3, 0, 0],
                barSize: e.length <= 2 ? 18 : 12,
                opacity: o === e.length - 1 ? 1 : .5
              }, o))]
            })
          })]
        })
      })()]
    }), u.jsx(n0, {
      name: "AI Coder Assistant & DRG Optimization",
      children: u.jsxs(o0, {
        color: "#7c3aed",
        icon: "\u{1F916}",
        title: "AI Coder Assistant",
        sub: "\u0E23\u0E30\u0E1A\u0E1A\u0E0A\u0E48\u0E27\u0E22\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E01\u0E32\u0E23 Coding \u0E14\u0E49\u0E27\u0E22 AI",
        badge: "DRG Optimization",
        children: [r?.ipd_coders_fiscal?.length > 0 && u.jsxs("div", {
          style: {
            marginBottom: "20px"
          },
          children: [u.jsx("div", {
            style: {
              fontSize: "12px",
              fontWeight: 800,
              color: E.text,
              marginBottom: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.06em"
            },
            children: "\u{1F464} Coder Performance \u2014 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"
          }), u.jsx("div", {
            style: {
              fontSize: "11px",
              color: E.sub,
              marginBottom: "8px"
            },
            children: "\u{1F4A1} \u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E41\u0E16\u0E27\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E01\u0E32\u0E23\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01 (Deep AI Insight) \u2014 action plan, targets, expected revenue impact"
          }), u.jsx("div", {
            style: {
              overflowX: "auto"
            },
            children: u.jsxs("table", {
              style: {
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px"
              },
              children: [u.jsx("thead", {
                children: u.jsx("tr", {
                  style: {
                    borderBottom: `2px solid ${E.border}`
                  },
                  children: ["", "#", "Coder", "Cases (FY)", "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49", "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19", "CC Rate", "Dx/Case", "AI Assessment"].map(e => u.jsx("th", {
                    style: {
                      padding: "8px 6px",
                      textAlign: e === "Coder" ? "left" : "center",
                      fontWeight: 700,
                      color: E.muted,
                      fontSize: "11px",
                      textTransform: "uppercase"
                    },
                    children: e
                  }, e))
                })
              }), u.jsx("tbody", {
                children: r.ipd_coders_fiscal.slice(0, 10).map((e, i) => {
                  const c = Number(e.cc_rate || 0),
                    n = Number(e.diag_per_case || 0),
                    o = Number(e.current_month_total || 0),
                    t = Number(e.prev_month_total || 0),
                    d = t > 0 ? Math.round((o - t) / t * 100) : 0;
                  let m = "",
                    D = E.ok,
                    h = "\u2705";
                  c < .3 ? (m = "CC Rate \u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Secondary Dx", D = E.danger, h = "\u{1F534}") : c < .6 ? (m = "\u0E40\u0E1E\u0E34\u0E48\u0E21 CC/MCC \u2014 \u0E15\u0E23\u0E27\u0E08 Lab + Vitals", D = E.warn, h = "\u{1F7E1}") : n < 2 ? (m = "Dx/Case \u0E19\u0E49\u0E2D\u0E22 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Chart Review", D = E.warn, h = "\u{1F7E1}") : m = "\u0E14\u0E35 \u2014 \u0E23\u0E31\u0E01\u0E29\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19";
                  const b = B.has(e.name),
                    T = b ? Q0(e, r.ipd_coders_fiscal, i + 1) : null;
                  return u.jsxs(_0.Fragment, {
                    children: [u.jsxs("tr", {
                      onClick: () => p(e.name),
                      style: {
                        borderBottom: `1px solid ${E.border}`,
                        background: b ? "#7c3aed10" : i % 2 === 0 ? "transparent" : `${E.muted}05`,
                        cursor: "pointer"
                      },
                      children: [u.jsx("td", {
                        style: {
                          padding: "8px 6px",
                          textAlign: "center",
                          color: "#7c3aed",
                          fontWeight: 800,
                          fontSize: "14px"
                        },
                        children: b ? "\u25BC" : "\u25B6"
                      }), u.jsx("td", {
                        style: {
                          padding: "8px 6px",
                          textAlign: "center",
                          fontWeight: 800,
                          color: i < 3 ? "#7c3aed" : E.muted,
                          fontSize: "12px"
                        },
                        children: i < 3 ? ["\u{1F947}", "\u{1F948}", "\u{1F949}"][i] : i + 1
                      }), u.jsx("td", {
                        style: {
                          padding: "8px 6px",
                          fontWeight: 700,
                          color: E.text,
                          maxWidth: "160px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        },
                        children: e.name
                      }), u.jsx("td", {
                        style: {
                          padding: "8px 6px",
                          textAlign: "center",
                          fontWeight: 800,
                          color: "#7c3aed"
                        },
                        children: a(e.fiscal_total)
                      }), u.jsxs("td", {
                        style: {
                          padding: "8px 6px",
                          textAlign: "center"
                        },
                        children: [u.jsx("span", {
                          style: {
                            fontWeight: 700
                          },
                          children: a(o)
                        }), d !== 0 && u.jsxs("span", {
                          style: {
                            fontSize: "10px",
                            fontWeight: 700,
                            marginLeft: "3px",
                            color: d >= 0 ? E.ok : E.danger
                          },
                          children: [d >= 0 ? "\u2191" : "\u2193", Math.abs(d), "%"]
                        })]
                      }), u.jsx("td", {
                        style: {
                          padding: "8px 6px",
                          textAlign: "center",
                          color: E.sub
                        },
                        children: a(t)
                      }), u.jsx("td", {
                        style: {
                          padding: "8px 6px",
                          textAlign: "center"
                        },
                        children: u.jsxs("span", {
                          style: {
                            fontWeight: 700,
                            fontSize: "11px",
                            padding: "2px 6px",
                            borderRadius: "6px",
                            background: c >= .6 ? `${E.ok}15` : c >= .3 ? `${E.warn}15` : `${E.danger}15`,
                            color: c >= .6 ? E.ok : c >= .3 ? E.warn : E.danger
                          },
                          children: [(c * 100).toFixed(0), "%"]
                        })
                      }), u.jsx("td", {
                        style: {
                          padding: "8px 6px",
                          textAlign: "center",
                          fontWeight: 700,
                          color: n >= 3 ? E.ok : n >= 2 ? E.warn : E.danger
                        },
                        children: n.toFixed(1)
                      }), u.jsxs("td", {
                        style: {
                          padding: "8px 6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: D
                        },
                        children: [h, " ", m]
                      })]
                    }), b && T && u.jsx("tr", {
                      style: {
                        background: "#7c3aed05",
                        borderBottom: "2px solid #7c3aed30"
                      },
                      children: u.jsx("td", {
                        colSpan: 9,
                        style: {
                          padding: "16px 20px"
                        },
                        children: u.jsx(Z0, {
                          coder: e,
                          insight: T
                        })
                      })
                    })]
                  }, i)
                })
              })]
            })
          })]
        }), A && u.jsxs("div", {
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px"
            },
            children: [u.jsx("div", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: E.text,
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: "\u{1F9E0} AI \u0E1E\u0E1A\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E40\u0E1E\u0E34\u0E48\u0E21 Revenue \u2014 DRG Optimization"
            }), u.jsx("div", {
              style: {
                display: "flex",
                gap: "8px"
              },
              children: [{
                label: "PDx Optimize",
                count: A.pdxOptimization?.length || 0,
                revenue: A.pdxRevenue,
                color: "#7c3aed"
              }, {
                label: "CC/MCC Missing",
                count: A.mccMissing?.length || 0,
                revenue: A.mccRevenue,
                color: "#f59e0b"
              }, {
                label: "Lab \u2192 Dx",
                count: A.labAlerts?.length || 0,
                revenue: A.labRevenue,
                color: "#dc2626"
              }].map((e, i) => u.jsxs("span", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "8px",
                  background: `${e.color}12`,
                  color: e.color,
                  border: `1px solid ${e.color}25`
                },
                children: [e.label, ": ", e.count, " \u0E40\u0E04\u0E2A \xB7 \u0E3F", (e.revenue || 0).toLocaleString()]
              }, i))
            })]
          }), [{
            key: "labAlerts",
            title: "\u{1FA78} Lab \u2192 Diagnosis (\u0E1E\u0E1A\u0E1C\u0E25 Lab \u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 \u2192 \u0E41\u0E19\u0E30\u0E19\u0E33 ICD-10)",
            color: "#dc2626",
            items: A.labAlerts || []
          }, {
            key: "mccMissing",
            title: "\u{1F4CB} CC/MCC Missing (\u0E44\u0E21\u0E48\u0E21\u0E35 Secondary Diagnosis)",
            color: "#f59e0b",
            items: A.mccMissing || []
          }, {
            key: "pdxOptimization",
            title: "\u{1F3AF} PDx Optimization (\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E08\u0E33\u0E40\u0E1E\u0E32\u0E30)",
            color: "#7c3aed",
            items: A.pdxOptimization || []
          }, {
            key: "losAlert",
            title: "\u23F1\uFE0F LOS Alert (\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34)",
            color: "#0284c7",
            items: A.losAlert || []
          }].map(e => e.items.length === 0 ? null : u.jsxs("div", {
            style: {
              marginBottom: "16px",
              borderRadius: "14px",
              border: `1px solid ${e.color}20`,
              overflow: "hidden"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "10px 14px",
                background: `${e.color}08`,
                borderBottom: `1px solid ${e.color}15`,
                fontSize: "12px",
                fontWeight: 800,
                color: e.color
              },
              children: [e.title, " (", e.items.length, " \u0E40\u0E04\u0E2A)"]
            }), u.jsxs("div", {
              style: {
                maxHeight: "300px",
                overflowY: "auto"
              },
              children: [e.items.slice(0, 10).map((i, c) => u.jsxs("div", {
                style: {
                  padding: "10px 14px",
                  borderBottom: `1px solid ${E.border}`,
                  fontSize: "12px"
                },
                children: [u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px"
                  },
                  children: [u.jsxs("span", {
                    style: {
                      fontWeight: 700,
                      color: E.text
                    },
                    children: [u.jsxs("span", {
                      style: {
                        fontSize: "10px",
                        background: `${E.muted}15`,
                        padding: "1px 4px",
                        borderRadius: "3px",
                        marginRight: "4px",
                        fontFamily: "monospace"
                      },
                      children: ["AN:", i.an]
                    }), i.name, u.jsx("span", {
                      style: {
                        fontSize: "11px",
                        color: E.sub,
                        marginLeft: "6px"
                      },
                      children: i.ward
                    })]
                  }), i.estRevenue > 0 && u.jsxs("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 800,
                      color: E.ok,
                      background: `${E.ok}12`,
                      padding: "2px 8px",
                      borderRadius: "6px"
                    },
                    children: ["+\u0E3F", i.estRevenue.toLocaleString()]
                  })]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "11px",
                    color: E.sub,
                    marginBottom: "3px",
                    lineHeight: 1.5
                  },
                  children: ["\u26A0\uFE0F ", i.issue]
                }), u.jsxs("div", {
                  style: {
                    fontSize: "11px",
                    color: e.color,
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: "8px",
                    background: `${e.color}06`,
                    borderLeft: `3px solid ${e.color}`,
                    lineHeight: 1.5
                  },
                  children: ["\u{1F916} ", i.aiSuggest]
                })]
              }, c)), e.items.length > 10 && u.jsxs("div", {
                style: {
                  padding: "8px 14px",
                  textAlign: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: E.muted
                },
                children: ["+", e.items.length - 10, " \u0E40\u0E04\u0E2A\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21"]
              })]
            })]
          }, e.key)), u.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginTop: "12px"
            },
            children: [{
              label: "PDx Optimization",
              value: A.pdxRevenue,
              color: "#7c3aed",
              desc: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E23\u0E2B\u0E31\u0E2A\u0E42\u0E23\u0E04\u0E43\u0E2B\u0E49\u0E08\u0E33\u0E40\u0E1E\u0E32\u0E30"
            }, {
              label: "CC/MCC Missing",
              value: A.mccRevenue,
              color: "#f59e0b",
              desc: "\u0E40\u0E1E\u0E34\u0E48\u0E21 Secondary Diagnosis"
            }, {
              label: "Lab \u2192 Diagnosis",
              value: A.labRevenue,
              color: "#dc2626",
              desc: "\u0E41\u0E1B\u0E25\u0E07\u0E1C\u0E25 Lab \u0E40\u0E1B\u0E47\u0E19 ICD-10"
            }].map((e, i) => u.jsxs("div", {
              style: {
                padding: "14px",
                borderRadius: "14px",
                background: `${e.color}06`,
                border: `1px solid ${e.color}20`,
                textAlign: "center"
              },
              children: [u.jsx("div", {
                style: {
                  fontSize: "11px",
                  fontWeight: 700,
                  color: E.muted,
                  marginBottom: "4px"
                },
                children: e.label
              }), u.jsxs("div", {
                style: {
                  fontSize: "22px",
                  fontWeight: 900,
                  color: e.color
                },
                children: ["\u0E3F", (e.value || 0).toLocaleString()]
              }), u.jsx("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: E.sub,
                  marginTop: "2px"
                },
                children: e.desc
              })]
            }, i))
          }), u.jsxs("div", {
            style: {
              textAlign: "center",
              marginTop: "16px",
              padding: "12px",
              borderRadius: "14px",
              background: `${E.ok}06`,
              border: `1px solid ${E.ok}20`
            },
            children: [u.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: E.ok
              },
              children: ["\u{1F4B0} Total Revenue Opportunity: \u0E3F", ((A.pdxRevenue || 0) + (A.mccRevenue || 0) + (A.labRevenue || 0)).toLocaleString()]
            }), u.jsx("div", {
              style: {
                fontSize: "11px",
                color: E.sub,
                marginTop: "4px"
              },
              children: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E32\u0E01 Lab Results + Diagnosis Patterns + LOS Outliers \xB7 \u0E23\u0E32\u0E04\u0E32 RW \u2248 \u0E3F8,350"
            })]
          })]
        }), !A && !loading.medRecDrgOpt && u.jsx("div", {
          style: {
            textAlign: "center",
            padding: "24px",
            color: E.muted,
            fontSize: "12px"
          },
          children: "\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A case \u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 Coding \u2014 DRG Optimization \u0E1B\u0E01\u0E15\u0E34"
        })]
      })
    }), u.jsx(n0, {
      children: (() => {
        const e = s.medRecHeatmap;
        if (!e?.coders?.length) return null;
        const i = e.coders,
          c = e.wards || [],
          n = e.weak_spots || [],
          o = t => t >= 80 ? {
            bg: "#059669",
            text: "#fff"
          } : t >= 60 ? {
            bg: "#10b981",
            text: "#fff"
          } : t >= 40 ? {
            bg: "#fbbf24",
            text: "#1e1b4b"
          } : t >= 20 ? {
            bg: "#f97316",
            text: "#fff"
          } : t > 0 ? {
            bg: "#ef4444",
            text: "#fff"
          } : {
            bg: "#1e1b4b",
            text: "#6b7280"
          };
        return u.jsxs(o0, {
          color: "#e11d48",
          icon: "\u{1F525}",
          title: "Coding Quality Heatmap",
          sub: "Coder \xD7 Ward \u2014 CC/MCC Completeness (30 \u0E27\u0E31\u0E19)",
          badge: "AI Analytics",
          children: [u.jsx("div", {
            style: {
              overflowX: "auto",
              marginBottom: "16px"
            },
            children: u.jsxs("table", {
              style: {
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "3px",
                fontSize: "11px"
              },
              children: [u.jsx("thead", {
                children: u.jsxs("tr", {
                  children: [u.jsx("th", {
                    style: {
                      padding: "6px 10px",
                      textAlign: "left",
                      fontWeight: 800,
                      color: E.sub,
                      fontSize: "11px",
                      minWidth: "240px",
                      position: "sticky",
                      left: 0,
                      background: "var(--md-surface, #fff)",
                      zIndex: 1
                    },
                    children: "Coder"
                  }), c.map((t, d) => u.jsx("th", {
                    style: {
                      padding: "4px 6px",
                      textAlign: "center",
                      fontWeight: 700,
                      color: E.sub,
                      fontSize: "10px",
                      maxWidth: "80px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      writingMode: c.length > 4 ? "vertical-rl" : void 0,
                      height: c.length > 4 ? "80px" : void 0
                    },
                    children: t?.replace("\u0E2B\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22", "").replace("\u0E2A\u0E32\u0E21\u0E31\u0E0D", "")
                  }, d)), u.jsx("th", {
                    style: {
                      padding: "4px 8px",
                      textAlign: "center",
                      fontWeight: 800,
                      color: E.sub,
                      fontSize: "11px"
                    },
                    children: "AVG"
                  })]
                })
              }), u.jsx("tbody", {
                children: i.map((t, d) => u.jsxs("tr", {
                  children: [u.jsxs("td", {
                    style: {
                      padding: "6px 10px",
                      fontWeight: 700,
                      color: E.text,
                      fontSize: "11px",
                      position: "sticky",
                      left: 0,
                      background: "var(--md-surface, #fff)",
                      zIndex: 1,
                      borderRight: "2px solid var(--md-border, #e2e8f0)"
                    },
                    children: [u.jsxs("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      },
                      children: [u.jsx("span", {
                        style: {
                          fontSize: "12px"
                        },
                        children: "\u{1F469}\u200D\u{1F4BB}"
                      }), u.jsx("span", {
                        style: {
                          maxWidth: "220px",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          lineHeight: 1.3
                        },
                        children: t.name
                      })]
                    }), u.jsxs("span", {
                      style: {
                        fontSize: "10px",
                        color: E.muted
                      },
                      children: [t.total_cases, " \u0E40\u0E04\u0E2A"]
                    })]
                  }), c.map((m, D) => {
                    const h = t.wards?.[m];
                    if (!h) return u.jsx("td", {
                      style: {
                        padding: "4px",
                        textAlign: "center",
                        borderRadius: "6px",
                        background: "var(--md-surface-2, #f8fafc)",
                        color: E.muted
                      },
                      children: "\u2014"
                    }, D);
                    const b = o(h.cc_rate);
                    return u.jsxs("td", {
                      title: `${t.name} \xD7 ${m}: CC ${h.cc_rate}% \xB7 ${h.cases} \u0E40\u0E04\u0E2A \xB7 ${h.diag_per_case} dx/case`,
                      style: {
                        padding: "4px 6px",
                        textAlign: "center",
                        borderRadius: "8px",
                        background: b.bg,
                        color: b.text,
                        fontWeight: 800,
                        fontSize: "12px",
                        cursor: "default",
                        transition: "transform 0.15s",
                        minWidth: "44px"
                      },
                      children: [h.cc_rate, "%", u.jsxs("div", {
                        style: {
                          fontSize: "8px",
                          fontWeight: 600,
                          opacity: .8
                        },
                        children: [h.cases, "\u0E40\u0E04\u0E2A"]
                      })]
                    }, D)
                  }), u.jsxs("td", {
                    style: {
                      padding: "4px 8px",
                      textAlign: "center",
                      fontWeight: 900,
                      fontSize: "12px",
                      color: t.avg_cc >= 60 ? "#059669" : t.avg_cc >= 40 ? "#f59e0b" : "#ef4444",
                      background: `${t.avg_cc>=60?"#059669":t.avg_cc>=40?"#f59e0b":"#ef4444"}10`,
                      borderRadius: "8px"
                    },
                    children: [t.avg_cc, "%"]
                  })]
                }, d))
              })]
            })
          }), u.jsx("div", {
            style: {
              display: "flex",
              gap: "8px",
              justifyContent: "center",
              marginBottom: "16px",
              flexWrap: "wrap"
            },
            children: [{
              label: "\u226580% \u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21",
              bg: "#059669"
            }, {
              label: "60-79% \u0E14\u0E35",
              bg: "#10b981"
            }, {
              label: "40-59% \u0E1E\u0E2D\u0E43\u0E0A\u0E49",
              bg: "#fbbf24"
            }, {
              label: "20-39% \u0E15\u0E48\u0E33",
              bg: "#f97316"
            }, {
              label: "<20% \u0E27\u0E34\u0E01\u0E24\u0E15",
              bg: "#ef4444"
            }, {
              label: "0% \u0E44\u0E21\u0E48\u0E21\u0E35 CC",
              bg: "#1e1b4b"
            }].map((t, d) => u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "14px",
                  height: "14px",
                  borderRadius: "4px",
                  background: t.bg
                }
              }), u.jsx("span", {
                style: {
                  fontSize: "10px",
                  color: E.sub,
                  fontWeight: 600
                },
                children: t.label
              })]
            }, d))
          }), n.length > 0 && u.jsxs("div", {
            style: {
              background: "rgba(239,68,68,0.04)",
              borderRadius: "14px",
              padding: "14px",
              border: "1px solid rgba(239,68,68,0.12)"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "14px"
                },
                children: "\u{1F3AF}"
              }), u.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#e11d48"
                },
                children: "AI Coaching Targets \u2014 \u0E08\u0E38\u0E14\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07"
              })]
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              },
              children: n.map((t, d) => u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.7)",
                  borderRadius: "10px",
                  border: "1px solid rgba(239,68,68,0.1)"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "#e11d48",
                    minWidth: "20px"
                  },
                  children: d + 1
                }), u.jsxs("div", {
                  style: {
                    flex: 1
                  },
                  children: [u.jsxs("p", {
                    style: {
                      margin: 0,
                      fontSize: "12px",
                      fontWeight: 700,
                      color: E.text
                    },
                    children: [t.coder, " \u2014 ", t.ward]
                  }), u.jsxs("p", {
                    style: {
                      margin: "2px 0 0",
                      fontSize: "11px",
                      color: E.sub
                    },
                    children: ["CC Rate ", u.jsxs("b", {
                      style: {
                        color: "#ef4444"
                      },
                      children: [t.cc_rate, "%"]
                    }), " \xB7 ", t.cases, " \u0E40\u0E04\u0E2A \xB7 ", t.diag_per_case, " dx/case"]
                  })]
                }), u.jsx("span", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#e11d48",
                    background: "rgba(239,68,68,0.08)",
                    padding: "2px 8px",
                    borderRadius: "99px"
                  },
                  children: t.cc_rate === 0 ? "\u0E2D\u0E1A\u0E23\u0E21\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19" : "Peer Review"
                })]
              }, d))
            })]
          })]
        })
      })()
    }), u.jsx(n0, {
      children: (() => {
        const e = s.medRecTATrend;
        if (!e?.weeks?.length) return null;
        const i = e.weeks,
          c = e.coders || [],
          n = e.target_days || 3,
          o = ["#e11d48", "#0284c7", "#059669", "#f59e0b", "#7c3aed", "#0ea5e9", "#ec4899"],
          t = i.map(b => b.avg_all).filter(b => b > 0),
          d = t.length > 0 ? Math.round(t.reduce((b, T) => b + T, 0) / t.length * 10) / 10 : 0,
          m = i[i.length - 1]?.avg_all || 0,
          D = i[0]?.avg_all || 0,
          h = m < D ? "improving" : m > D ? "worsening" : "stable";
        return u.jsxs(o0, {
          color: "#0284c7",
          icon: "\u23F1\uFE0F",
          title: "Coding Turnaround Trend",
          sub: `\u0E40\u0E27\u0E25\u0E32\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A IPD \u0E23\u0E32\u0E22\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C (${i.length} \u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C) \xB7 \u0E41\u0E22\u0E01 Coder`,
          badge: "12 Weeks",
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              gap: "12px",
              marginBottom: "16px",
              flexWrap: "wrap"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "10px 16px",
                borderRadius: "12px",
                background: "rgba(2,132,199,0.06)",
                border: "1px solid rgba(2,132,199,0.15)",
                textAlign: "center"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "11px",
                  color: E.muted,
                  fontWeight: 600
                },
                children: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E23\u0E27\u0E21"
              }), u.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 900,
                  color: d <= n ? "#059669" : "#e11d48"
                },
                children: [d, " \u0E27\u0E31\u0E19"]
              })]
            }), u.jsxs("div", {
              style: {
                padding: "10px 16px",
                borderRadius: "12px",
                background: "rgba(2,132,199,0.06)",
                border: "1px solid rgba(2,132,199,0.15)",
                textAlign: "center"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "11px",
                  color: E.muted,
                  fontWeight: 600
                },
                children: "\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
              }), u.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 900,
                  color: m <= n ? "#059669" : "#e11d48"
                },
                children: [m, " \u0E27\u0E31\u0E19"]
              })]
            }), u.jsxs("div", {
              style: {
                padding: "10px 16px",
                borderRadius: "12px",
                background: "rgba(2,132,199,0.06)",
                border: "1px solid rgba(2,132,199,0.15)",
                textAlign: "center"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "11px",
                  color: E.muted,
                  fontWeight: 600
                },
                children: "\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22"
              }), u.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 900,
                  color: "#f43f5e"
                },
                children: ["\u2264", n, " \u0E27\u0E31\u0E19"]
              })]
            }), u.jsxs("div", {
              style: {
                padding: "10px 16px",
                borderRadius: "12px",
                background: h === "improving" ? "rgba(16,185,129,0.06)" : "rgba(239,68,68,0.06)",
                border: `1px solid ${h==="improving"?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)"}`,
                textAlign: "center"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "11px",
                  color: E.muted,
                  fontWeight: 600
                },
                children: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21"
              }), u.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: 900,
                  color: h === "improving" ? "#059669" : h === "worsening" ? "#e11d48" : "#64748b"
                },
                children: h === "improving" ? "\u{1F4C8} \u0E14\u0E35\u0E02\u0E36\u0E49\u0E19" : h === "worsening" ? "\u{1F4C9} \u0E41\u0E22\u0E48\u0E25\u0E07" : "\u27A1\uFE0F \u0E04\u0E07\u0E17\u0E35\u0E48"
              })]
            })]
          }), u.jsx(d0, {
            width: "100%",
            height: 280,
            children: u.jsxs(z0, {
              data: i,
              margin: {
                top: 8,
                right: 12,
                bottom: 0,
                left: 4
              },
              children: [u.jsx(h0, {
                strokeDasharray: "3 3",
                stroke: "rgba(203,213,225,.3)",
                vertical: !1
              }), u.jsx(m0, {
                dataKey: "label",
                tick: {
                  fill: "#6b7280",
                  fontSize: 10,
                  fontWeight: 700
                },
                axisLine: !1,
                tickLine: !1
              }), u.jsx(f0, {
                tick: {
                  fill: "#9ca3af",
                  fontSize: 9
                },
                axisLine: !1,
                tickLine: !1,
                width: 30,
                unit: " d",
                domain: [0, "auto"]
              }), u.jsx(b0, {
                contentStyle: {
                  background: "#fff",
                  border: "1px solid #e8eaf2",
                  borderRadius: "10px",
                  fontSize: "12px"
                },
                formatter: (b, T) => b != null ? [`${b} \u0E27\u0E31\u0E19`, T === "avg_all" ? "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E23\u0E27\u0E21" : T] : [null, null]
              }), u.jsx(q0, {
                y: n,
                stroke: "#f43f5e",
                strokeWidth: 2,
                strokeDasharray: "8 4",
                label: {
                  value: `\u0E40\u0E1B\u0E49\u0E32 ${n} \u0E27\u0E31\u0E19`,
                  fill: "#f43f5e",
                  fontSize: 10,
                  fontWeight: 700,
                  position: "right"
                }
              }), c.slice(0, 5).map((b, T) => u.jsx(D0, {
                type: "monotone",
                dataKey: b,
                stroke: o[T % o.length],
                strokeWidth: 2,
                dot: {
                  r: 3,
                  fill: o[T % o.length]
                },
                connectNulls: !0,
                name: b
              }, b)), u.jsx(D0, {
                type: "monotone",
                dataKey: "avg_all",
                stroke: "#1e1b4b",
                strokeWidth: 3,
                dot: {
                  r: 4,
                  fill: "#1e1b4b",
                  stroke: "#fff",
                  strokeWidth: 2
                },
                name: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E23\u0E27\u0E21"
              })]
            })
          }), u.jsxs("div", {
            style: {
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "10px",
              flexWrap: "wrap"
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "16px",
                  height: "3px",
                  background: "#1e1b4b",
                  borderRadius: "2px"
                }
              }), u.jsx("span", {
                style: {
                  fontSize: "11px",
                  color: E.sub,
                  fontWeight: 700
                },
                children: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E23\u0E27\u0E21"
              })]
            }), c.slice(0, 5).map((b, T) => u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: o[T % o.length]
                }
              }), u.jsx("span", {
                style: {
                  fontSize: "10px",
                  color: E.sub,
                  fontWeight: 600,
                  maxWidth: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                children: b
              })]
            }, b)), u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "16px",
                  height: "2px",
                  background: "#f43f5e",
                  borderRadius: "2px",
                  borderTop: "2px dashed #f43f5e"
                }
              }), u.jsxs("span", {
                style: {
                  fontSize: "11px",
                  color: "#f43f5e",
                  fontWeight: 700
                },
                children: ["\u0E40\u0E1B\u0E49\u0E32 ", n, " \u0E27\u0E31\u0E19"]
              })]
            })]
          })]
        })
      })()
    }), u.jsx(n0, {
      children: (() => {
        const e = s.medRecRecovery;
        if (!e?.summary?.total_flagged) return null;
        const i = e.summary,
          c = e.categories || [],
          n = e.rw_impact || {};
        return u.jsxs(o0, {
          color: "#059669",
          icon: "\u{1F4B0}",
          title: "Revenue Recovery Tracker",
          sub: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E1C\u0E25\u0E08\u0E32\u0E01 AI \u0E41\u0E19\u0E30\u0E19\u0E33 DRG Optimization (30 \u0E27\u0E31\u0E19)",
          badge: "AI Follow-up",
          children: [u.jsx("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0",
              marginBottom: "20px",
              flexWrap: "wrap"
            },
            children: [{
              label: "AI \u0E41\u0E19\u0E30\u0E19\u0E33",
              value: i.total_flagged,
              icon: "\u{1F916}",
              color: "#7c3aed",
              sub: "\u0E40\u0E04\u0E2A\u0E17\u0E35\u0E48 AI \u0E15\u0E23\u0E27\u0E08\u0E1E\u0E1A"
            }, null, {
              label: "Coder \u0E41\u0E01\u0E49\u0E44\u0E02",
              value: i.total_actioned,
              icon: "\u2705",
              color: "#059669",
              sub: `${i.conversion_rate}% conversion`
            }, null, {
              label: "Revenue Recovered",
              value: `\u0E3F${(i.recovered_revenue/1e3).toFixed(0)}K`,
              icon: "\u{1F4B0}",
              color: "#f59e0b",
              sub: "\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23"
            }].map((o, t) => o === null ? u.jsx("div", {
              style: {
                fontSize: "24px",
                color: E.muted,
                padding: "0 8px",
                fontWeight: 900
              },
              children: "\u2192"
            }, t) : u.jsxs("div", {
              style: {
                textAlign: "center",
                padding: "14px 20px",
                borderRadius: "16px",
                background: `${o.color}08`,
                border: `2px solid ${o.color}20`,
                minWidth: "130px"
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "20px"
                },
                children: o.icon
              }), u.jsx("p", {
                style: {
                  margin: "4px 0 0",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: E.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em"
                },
                children: o.label
              }), u.jsx("p", {
                style: {
                  margin: "4px 0 0",
                  fontSize: "28px",
                  fontWeight: 900,
                  color: o.color,
                  lineHeight: 1
                },
                children: typeof o.value == "number" ? o.value.toLocaleString() : o.value
              }), u.jsx("p", {
                style: {
                  margin: "2px 0 0",
                  fontSize: "11px",
                  color: E.sub,
                  fontWeight: 600
                },
                children: o.sub
              })]
            }, t))
          }), u.jsx("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px"
            },
            children: u.jsxs("div", {
              style: {
                width: "200px",
                textAlign: "center"
              },
              children: [u.jsx("div", {
                style: {
                  position: "relative",
                  height: "12px",
                  borderRadius: "99px",
                  background: "#e2e8f0",
                  overflow: "hidden"
                },
                children: u.jsx("div", {
                  style: {
                    height: "100%",
                    borderRadius: "99px",
                    transition: "width 0.8s ease",
                    width: `${Math.min(i.conversion_rate,100)}%`,
                    background: i.conversion_rate >= 80 ? "linear-gradient(90deg, #059669, #10b981)" : i.conversion_rate >= 50 ? "linear-gradient(90deg, #f59e0b, #fbbf24)" : "linear-gradient(90deg, #ef4444, #f43f5e)"
                  }
                })
              }), u.jsxs("p", {
                style: {
                  margin: "4px 0 0",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: i.conversion_rate >= 80 ? "#059669" : i.conversion_rate >= 50 ? "#f59e0b" : "#ef4444"
                },
                children: ["Conversion Rate: ", i.conversion_rate, "%"]
              })]
            })
          }), u.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px",
              marginBottom: "16px"
            },
            children: c.map((o, t) => u.jsxs("div", {
              style: {
                padding: "14px",
                borderRadius: "14px",
                background: E.bg,
                border: `1px solid ${E.border}`
              },
              children: [u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "16px"
                  },
                  children: o.icon
                }), u.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: E.text
                  },
                  children: o.type
                })]
              }), u.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: "6px"
                },
                children: [u.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    color: E.muted
                  },
                  children: ["\u0E41\u0E19\u0E30\u0E19\u0E33 ", u.jsx("b", {
                    style: {
                      color: "#7c3aed"
                    },
                    children: o.flagged
                  })]
                }), u.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    color: E.muted
                  },
                  children: ["\u0E41\u0E01\u0E49\u0E44\u0E02 ", u.jsx("b", {
                    style: {
                      color: "#059669"
                    },
                    children: o.actioned
                  })]
                }), u.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 800,
                    color: o.rate >= 80 ? "#059669" : o.rate >= 50 ? "#f59e0b" : "#ef4444"
                  },
                  children: [o.rate, "%"]
                })]
              }), u.jsx("div", {
                style: {
                  height: "6px",
                  borderRadius: "99px",
                  background: "#e2e8f0",
                  overflow: "hidden"
                },
                children: u.jsx("div", {
                  style: {
                    height: "100%",
                    width: `${Math.min(o.rate,100)}%`,
                    background: o.rate >= 80 ? "#059669" : o.rate >= 50 ? "#f59e0b" : "#ef4444",
                    borderRadius: "99px",
                    transition: "width 0.6s ease"
                  }
                })
              }), o.revenue > 0 && u.jsxs("p", {
                style: {
                  margin: "6px 0 0",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#059669"
                },
                children: ["\u{1F4B0} \u0E3F", o.revenue.toLocaleString()]
              })]
            }, t))
          }), n.total_cases > 0 && u.jsxs("div", {
            style: {
              padding: "12px 16px",
              borderRadius: "12px",
              background: "rgba(5,150,105,0.04)",
              border: "1px solid rgba(5,150,105,0.12)"
            },
            children: [u.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "#059669",
                marginBottom: "6px"
              },
              children: "\u{1F4CA} RW Impact Summary (30 \u0E27\u0E31\u0E19)"
            }), u.jsxs("div", {
              style: {
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                fontSize: "12px"
              },
              children: [u.jsxs("span", {
                children: ["\u{1F4C1} ", n.total_cases, " \u0E40\u0E04\u0E2A DRG"]
              }), u.jsxs("span", {
                style: {
                  color: "#059669"
                },
                children: ["\u{1F4C8} RW \u0E40\u0E1E\u0E34\u0E48\u0E21 ", n.rw_increased, " \u0E40\u0E04\u0E2A (+\u0E3F", n.rw_gain?.toLocaleString(), ")"]
              }), u.jsxs("span", {
                style: {
                  color: "#ef4444"
                },
                children: ["\u{1F4C9} RW \u0E25\u0E14 ", n.rw_decreased, " \u0E40\u0E04\u0E2A (-\u0E3F", n.rw_loss?.toLocaleString(), ")"]
              }), u.jsxs("span", {
                style: {
                  fontWeight: 800,
                  color: n.rw_gain > n.rw_loss ? "#059669" : "#ef4444"
                },
                children: ["\u0E2A\u0E38\u0E17\u0E18\u0E34: ", n.rw_gain > n.rw_loss ? "+" : "-", "\u0E3F", Math.abs((n.rw_gain || 0) - (n.rw_loss || 0)).toLocaleString()]
              })]
            })]
          })]
        })
      })()
    }), u.jsx(n0, {
      children: (() => {
        const e = s.medRecHeatmap;
        if (!e?.coders?.length) return null;
        const i = ["#7c3aed", "#0ea5e9", "#f59e0b", "#10b981"],
          c = ["PDx (\u0E2B\u0E25\u0E31\u0E01)", "CC (\u0E23\u0E48\u0E27\u0E21)", "MCC (\u0E41\u0E17\u0E23\u0E01\u0E0B\u0E49\u0E2D\u0E19)", "Procedure (\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23)"],
          n = e.coders.map(t => {
            let d = 0,
              m = 0,
              D = 0,
              h = 0,
              b = 0;
            for (const L of Object.values(t.wards || {})) d += L.cases, m += (L.pdx || 0) * L.cases, D += (L.cc || 0) * L.cases, h += (L.mcc || 0) * L.cases, b += (L.proc || 0) * L.cases;
            const T = L => d > 0 ? Math.round(L / d * 100) / 100 : 0;
            return {
              name: t.name,
              cases: d,
              pdx: T(m),
              cc: T(D),
              mcc: T(h),
              proc: T(b),
              total: T(m + D + h + b)
            }
          }).filter(t => t.cases >= 5).sort((t, d) => d.total - t.total);
        if (!n.length) return null;
        const o = {
          pdx: Math.round(n.reduce((t, d) => t + d.pdx * d.cases, 0) / Math.max(1, n.reduce((t, d) => t + d.cases, 0)) * 100) / 100,
          cc: Math.round(n.reduce((t, d) => t + d.cc * d.cases, 0) / Math.max(1, n.reduce((t, d) => t + d.cases, 0)) * 100) / 100,
          mcc: Math.round(n.reduce((t, d) => t + d.mcc * d.cases, 0) / Math.max(1, n.reduce((t, d) => t + d.cases, 0)) * 100) / 100,
          proc: Math.round(n.reduce((t, d) => t + d.proc * d.cases, 0) / Math.max(1, n.reduce((t, d) => t + d.cases, 0)) * 100) / 100
        };
        return u.jsxs(o0, {
          color: "#7c3aed",
          icon: "\u{1F9EC}",
          title: "Diagnosis Depth Analysis",
          sub: "\u0E04\u0E27\u0E32\u0E21\u0E25\u0E36\u0E01\u0E02\u0E2D\u0E07 Coding \u0E41\u0E22\u0E01 Coder \u2014 PDx / CC / MCC / Procedure (30 \u0E27\u0E31\u0E19)",
          badge: "Per Coder",
          children: [u.jsx("div", {
            style: {
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              marginBottom: "16px",
              flexWrap: "wrap"
            },
            children: c.map((t, d) => u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "5px"
              },
              children: [u.jsx("div", {
                style: {
                  width: "12px",
                  height: "12px",
                  borderRadius: "3px",
                  background: i[d]
                }
              }), u.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 700,
                  color: E.sub
                },
                children: t
              })]
            }, d))
          }), u.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "12px",
              marginBottom: "16px"
            },
            children: [u.jsxs("div", {
              style: {
                padding: "16px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(124,58,237,0.06), rgba(124,58,237,0.02))",
                border: "2px solid rgba(124,58,237,0.2)",
                textAlign: "center"
              },
              children: [u.jsx("p", {
                style: {
                  margin: "0 0 8px",
                  fontSize: "12px",
                  fontWeight: 900,
                  color: "#7c3aed",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em"
                },
                children: "\u{1F3E5} \u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 \u0E23\u0E1E."
              }), u.jsx(d0, {
                width: "100%",
                height: 120,
                children: u.jsx(M0, {
                  children: u.jsx(I0, {
                    data: [{
                      v: o.pdx
                    }, {
                      v: o.cc
                    }, {
                      v: o.mcc
                    }, {
                      v: o.proc
                    }].filter(t => t.v > 0),
                    dataKey: "v",
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 30,
                    outerRadius: 50,
                    paddingAngle: 3,
                    strokeWidth: 0,
                    children: [o.pdx, o.cc, o.mcc, o.proc].filter(t => t > 0).map((t, d) => u.jsx(T0, {
                      fill: i[d]
                    }, d))
                  })
                })
              }), u.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 900,
                  color: "#7c3aed"
                },
                children: (o.pdx + o.cc + o.mcc + o.proc).toFixed(1)
              }), u.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "11px",
                  color: E.muted
                },
                children: "dx/case"
              })]
            }), n.slice(0, 5).map((t, d) => {
              const m = [{
                  v: t.pdx,
                  l: "PDx"
                }, {
                  v: t.cc,
                  l: "CC"
                }, {
                  v: t.mcc,
                  l: "MCC"
                }, {
                  v: t.proc,
                  l: "Proc"
                }].filter(h => h.v > 0),
                D = t.total < (o.pdx + o.cc + o.mcc + o.proc) * .7;
              return u.jsxs("div", {
                style: {
                  padding: "14px",
                  borderRadius: "14px",
                  background: D ? "rgba(239,68,68,0.04)" : E.bg,
                  border: `1px solid ${D?"rgba(239,68,68,0.2)":E.border}`,
                  textAlign: "center"
                },
                children: [u.jsx("p", {
                  style: {
                    margin: "0 0 4px",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: E.text,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    lineHeight: 1.3
                  },
                  children: t.name
                }), u.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: E.muted
                  },
                  children: [t.cases, " \u0E40\u0E04\u0E2A"]
                }), u.jsx(d0, {
                  width: "100%",
                  height: 100,
                  children: u.jsx(M0, {
                    children: u.jsx(I0, {
                      data: m,
                      dataKey: "v",
                      cx: "50%",
                      cy: "50%",
                      innerRadius: 24,
                      outerRadius: 42,
                      paddingAngle: 3,
                      strokeWidth: 0,
                      children: m.map((h, b) => u.jsx(T0, {
                        fill: i[b]
                      }, b))
                    })
                  })
                }), u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: 900,
                    color: D ? "#ef4444" : "#7c3aed"
                  },
                  children: t.total.toFixed(1)
                }), u.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: E.muted
                  },
                  children: "dx/case"
                }), D && u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#ef4444",
                    background: "rgba(239,68,68,0.08)",
                    padding: "1px 6px",
                    borderRadius: "99px"
                  },
                  children: "\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22"
                }), u.jsx("div", {
                  style: {
                    display: "flex",
                    height: "6px",
                    borderRadius: "99px",
                    overflow: "hidden",
                    marginTop: "6px",
                    gap: "1px"
                  },
                  children: [t.pdx, t.cc, t.mcc, t.proc].map((h, b) => h > 0 ? u.jsx("div", {
                    style: {
                      flex: h,
                      background: i[b],
                      borderRadius: "99px"
                    }
                  }, b) : null)
                }), u.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "4px",
                    fontSize: "8px",
                    color: E.muted
                  },
                  children: [u.jsxs("span", {
                    children: ["PDx ", t.pdx]
                  }), u.jsxs("span", {
                    children: ["CC ", t.cc]
                  }), u.jsxs("span", {
                    children: ["MCC ", t.mcc]
                  }), u.jsxs("span", {
                    children: ["Proc ", t.proc]
                  })]
                })]
              }, d)
            })]
          })]
        })
      })()
    }), u.jsx(n0, {
      children: (() => {
        const e = r.ipd_coders_fiscal || [];
        if (e.length < 2) return null;
        const i = e.map(x => ({
            name: x.name,
            current: x.current_month_total || 0,
            prev: x.prev_month_total || 0,
            fiscal: x.fiscal_total || 0,
            cc: x.cc_rate || 0
          })),
          c = Math.max(...i.map(x => x.current), 1),
          n = Math.min(...i.map(x => x.current)),
          o = Math.round(i.reduce((x, q) => x + q.current, 0) / i.length),
          t = i.reduce((x, q) => x + q.current, 0),
          d = [...i].sort((x, q) => x.current - q.current),
          m = d.length;
        let D = 0;
        d.forEach((x, q) => {
          D += (2 * (q + 1) - m - 1) * x.current
        });
        const h = t > 0 ? Math.round(Math.abs(D) / (m * t) * 100) / 100 : 0,
          b = h < .2,
          T = h >= .2 && h < .4,
          L = b ? "#059669" : T ? "#f59e0b" : "#ef4444",
          L0 = b ? "\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E14\u0E35" : T ? "\u0E04\u0E48\u0E2D\u0E19\u0E02\u0E49\u0E32\u0E07\u0E40\u0E1A\u0E35\u0E48\u0E22\u0E07" : "\u0E44\u0E21\u0E48\u0E2A\u0E21\u0E14\u0E38\u0E25",
          O0 = b ? "\u2705" : T ? "\u26A0\uFE0F" : "\u{1F6A8}",
          s0 = [],
          $0 = i.filter(x => x.current > o * 1.5 && o > 0),
          F0 = i.filter(x => x.current < o * .3 && o > 0),
          S0 = i.filter(x => x.current === 0).map(x => x.name.split(" ")[0]);
        return $0.length > 0 && s0.push(`\u{1F534} \u0E07\u0E32\u0E19\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01\u0E17\u0E35\u0E48\u0E1A\u0E32\u0E07\u0E04\u0E19\u0E21\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19\u0E44\u0E1B
\u2022 ${$0.map(x=>`${x.name.split(" ")[0]} \u0E23\u0E31\u0E1A ${x.current} \u0E40\u0E04\u0E2A (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E17\u0E35\u0E21 ${o} \u0E40\u0E04\u0E2A/\u0E04\u0E19)`).join(", ")}
\u2022 \u0E17\u0E33\u0E44\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E1B\u0E31\u0E0D\u0E2B\u0E32: \u0E04\u0E19\u0E17\u0E33\u0E07\u0E32\u0E19\u0E2B\u0E19\u0E31\u0E01\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E2B\u0E31\u0E2A\u0E44\u0E21\u0E48\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14/\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 burnout \xB7 \u0E16\u0E49\u0E32\u0E04\u0E19\u0E19\u0E35\u0E49\u0E25\u0E32\u0E2B\u0E23\u0E37\u0E2D\u0E2D\u0E2D\u0E01 \u0E07\u0E32\u0E19\u0E08\u0E30\u0E2B\u0E22\u0E38\u0E14\u0E17\u0E31\u0E19\u0E17\u0E35
\u2022 \u0E41\u0E19\u0E30\u0E19\u0E33: \u0E22\u0E49\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1A\u0E32\u0E07\u0E2A\u0E48\u0E27\u0E19\u0E44\u0E1B\u0E43\u0E2B\u0E49\u0E04\u0E19\u0E17\u0E35\u0E48\u0E27\u0E48\u0E32\u0E07\u0E01\u0E27\u0E48\u0E32 \xB7 \u0E08\u0E31\u0E14\u0E1B\u0E23\u0E30\u0E0A\u0E38\u0E21\u0E23\u0E35\u0E27\u0E34\u0E27\u0E01\u0E32\u0E23\u0E41\u0E1A\u0E48\u0E07\u0E07\u0E32\u0E19\u0E17\u0E38\u0E01\u0E2A\u0E31\u0E1B\u0E14\u0E32\u0E2B\u0E4C \xB7 \u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E1E\u0E14\u0E32\u0E19\u0E40\u0E04\u0E2A/\u0E04\u0E19/\u0E27\u0E31\u0E19`), F0.length > 0 && s0.push(`\u{1F7E0} \u0E1A\u0E32\u0E07\u0E04\u0E19\u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E17\u0E35\u0E21\u0E21\u0E32\u0E01
\u2022 ${F0.map(x=>`${x.name.split(" ")[0]} \u0E23\u0E31\u0E1A ${x.current} \u0E40\u0E04\u0E2A (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E17\u0E35\u0E21 ${o} \u0E40\u0E04\u0E2A/\u0E04\u0E19)`).join(", ")}
\u2022 \u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E17\u0E35\u0E48\u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E47\u0E19\u0E44\u0E1B\u0E44\u0E14\u0E49: \u0E17\u0E31\u0E01\u0E29\u0E30\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19 \xB7 \u0E15\u0E34\u0E14\u0E07\u0E32\u0E19\u0E2D\u0E37\u0E48\u0E19/\u0E25\u0E32 \xB7 \u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E07\u0E32\u0E19\u0E44\u0E21\u0E48\u0E2A\u0E48\u0E07\u0E43\u0E2B\u0E49
\u2022 \u0E41\u0E19\u0E30\u0E19\u0E33: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E01\u0E32\u0E23\u0E17\u0E33\u0E07\u0E32\u0E19 \xB7 \u0E16\u0E49\u0E32\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E2B\u0E49\u0E2A\u0E48\u0E07\u0E40\u0E04\u0E2A\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 \u0E16\u0E49\u0E32\u0E17\u0E31\u0E01\u0E29\u0E30\u0E44\u0E21\u0E48\u0E1E\u0E2D \u0E43\u0E2B\u0E49\u0E08\u0E31\u0E1A\u0E04\u0E39\u0E48\u0E01\u0E31\u0E1A senior coder \u0E1D\u0E36\u0E01\u0E23\u0E48\u0E27\u0E21\u0E01\u0E31\u0E19`), c > 0 && n === 0 && s0.push(`\u{1F6A8} \u0E21\u0E35 ${S0.length} \u0E04\u0E19 \u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19\u0E40\u0E25\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49
\u2022 \u0E23\u0E32\u0E22\u0E0A\u0E37\u0E48\u0E2D: ${S0.join(", ")}
\u2022 \u0E40\u0E1B\u0E47\u0E19\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E40\u0E0A\u0E34\u0E07\u0E23\u0E30\u0E1A\u0E1A \u2014 \u0E23\u0E1E.\u0E08\u0E48\u0E32\u0E22\u0E40\u0E07\u0E34\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E41\u0E15\u0E48\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E1C\u0E25\u0E07\u0E32\u0E19 \xB7 \u0E17\u0E31\u0E01\u0E29\u0E30\u0E04\u0E19\u0E16\u0E14\u0E16\u0E2D\u0E22\u0E16\u0E49\u0E32\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E17\u0E33\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07
\u2022 \u0E41\u0E19\u0E30\u0E19\u0E33: \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E04\u0E19\u0E40\u0E2B\u0E25\u0E48\u0E32\u0E19\u0E35\u0E49\u0E21\u0E32\u0E17\u0E33\u0E07\u0E32\u0E19\u0E1B\u0E01\u0E15\u0E34\u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \xB7 \u0E16\u0E49\u0E32\u0E21\u0E32 \u0E43\u0E2B\u0E49 assign \u0E07\u0E32\u0E19\u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 \u0E16\u0E49\u0E32\u0E44\u0E21\u0E48\u0E21\u0E32 \u0E1B\u0E23\u0E31\u0E1A\u0E23\u0E30\u0E1A\u0E1A\u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E07\u0E32\u0E19\u0E43\u0E2B\u0E49\u0E02\u0E49\u0E32\u0E21 + \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E2A\u0E16\u0E32\u0E19\u0E30\u0E01\u0E32\u0E23\u0E25\u0E32\u0E2B\u0E22\u0E38\u0E14`), b && s0.length === 0 && s0.push(`\u2705 \u0E17\u0E35\u0E21\u0E41\u0E1A\u0E48\u0E07\u0E07\u0E32\u0E19\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E14\u0E35 (Gini ${h.toFixed(2)})
\u2022 \u0E17\u0E38\u0E01\u0E04\u0E19\u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19\u0E43\u0E01\u0E25\u0E49\u0E40\u0E04\u0E35\u0E22\u0E07\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${o} \u0E40\u0E04\u0E2A/\u0E04\u0E19
\u2022 \u0E41\u0E19\u0E30\u0E19\u0E33\u0E43\u0E2B\u0E49\u0E23\u0E31\u0E01\u0E29\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19: \u0E15\u0E23\u0E27\u0E08 Gini \u0E17\u0E38\u0E01\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E2B\u0E32\u0E01\u0E40\u0E01\u0E34\u0E19 0.30 \u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A \xB7 \u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E40\u0E04\u0E2A\u0E0B\u0E31\u0E1A\u0E0B\u0E49\u0E2D\u0E19\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E04\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1E\u0E31\u0E12\u0E19\u0E32\u0E17\u0E31\u0E01\u0E29\u0E30 \xB7 Cross-training: \u0E17\u0E38\u0E01\u0E04\u0E19\u0E04\u0E27\u0E23\u0E2A\u0E23\u0E38\u0E1B\u0E44\u0E14\u0E49\u0E17\u0E38\u0E01 ward`), u.jsxs(o0, {
          color: "#6366f1",
          icon: "\u2696\uFE0F",
          title: "Workload Balance",
          sub: "\u0E2A\u0E21\u0E14\u0E38\u0E25\u0E07\u0E32\u0E19 IPD Coder \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49 \u2014 Gini Coefficient",
          badge: "AI Balancer",
          children: [u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              marginBottom: "20px",
              flexWrap: "wrap"
            },
            children: [u.jsxs("div", {
              style: {
                textAlign: "center"
              },
              children: [u.jsxs("svg", {
                width: "140",
                height: "80",
                viewBox: "0 0 140 80",
                children: [u.jsx("path", {
                  d: "M 15 70 A 55 55 0 0 1 125 70",
                  fill: "none",
                  stroke: "#e2e8f0",
                  strokeWidth: "12",
                  strokeLinecap: "round"
                }), u.jsx("path", {
                  d: "M 15 70 A 55 55 0 0 1 37 25",
                  fill: "none",
                  stroke: "#059669",
                  strokeWidth: "12",
                  strokeLinecap: "round",
                  opacity: "0.3"
                }), u.jsx("path", {
                  d: "M 37 25 A 55 55 0 0 1 70 15",
                  fill: "none",
                  stroke: "#f59e0b",
                  strokeWidth: "12",
                  strokeLinecap: "round",
                  opacity: "0.3"
                }), u.jsx("path", {
                  d: "M 70 15 A 55 55 0 0 1 125 70",
                  fill: "none",
                  stroke: "#ef4444",
                  strokeWidth: "12",
                  strokeLinecap: "round",
                  opacity: "0.3"
                }), (() => {
                  const x = (-180 + h * 180) * Math.PI / 180,
                    q = 70 + 45 * Math.cos(x),
                    c0 = 70 + 45 * Math.sin(x);
                  return u.jsx("line", {
                    x1: "70",
                    y1: "70",
                    x2: q,
                    y2: c0,
                    stroke: L,
                    strokeWidth: "3",
                    strokeLinecap: "round"
                  })
                })(), u.jsx("circle", {
                  cx: "70",
                  cy: "70",
                  r: "6",
                  fill: L
                }), u.jsx("circle", {
                  cx: "70",
                  cy: "70",
                  r: "3",
                  fill: "white"
                })]
              }), u.jsx("p", {
                style: {
                  margin: "4px 0 0",
                  fontSize: "20px",
                  fontWeight: 900,
                  color: L
                },
                children: h.toFixed(2)
              }), u.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "11px",
                  color: E.muted,
                  fontWeight: 600
                },
                children: "Gini Index"
              }), u.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: L,
                  background: `${L}12`,
                  padding: "2px 10px",
                  borderRadius: "99px"
                },
                children: [O0, " ", L0]
              })]
            }), u.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "6px"
              },
              children: [{
                label: "Coder \u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
                value: `${i.length} \u0E04\u0E19`,
                color: "#6366f1"
              }, {
                label: "\u0E40\u0E04\u0E2A\u0E23\u0E27\u0E21\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
                value: `${t} \u0E40\u0E04\u0E2A`,
                color: "#6366f1"
              }, {
                label: "\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E15\u0E48\u0E2D\u0E04\u0E19",
                value: `${o} \u0E40\u0E04\u0E2A`,
                color: "#0284c7"
              }, {
                label: "\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
                value: `${c} \u0E40\u0E04\u0E2A`,
                color: c > o * 2 ? "#ef4444" : "#059669"
              }, {
                label: "\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14",
                value: `${n} \u0E40\u0E04\u0E2A`,
                color: n === 0 ? "#ef4444" : "#059669"
              }].map((x, q) => u.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "20px",
                  fontSize: "12px"
                },
                children: [u.jsx("span", {
                  style: {
                    color: E.muted,
                    fontWeight: 600
                  },
                  children: x.label
                }), u.jsx("span", {
                  style: {
                    fontWeight: 800,
                    color: x.color
                  },
                  children: x.value
                })]
              }, q))
            })]
          }), u.jsxs("div", {
            style: {
              marginBottom: "16px"
            },
            children: [i.map((x, q) => {
              const c0 = c > 0 ? x.current / c * 100 : 0,
                R0 = x.current > o * 1.5 && o > 0,
                k0 = x.current < o * .3 && o > 0,
                v0 = R0 ? "#ef4444" : k0 ? "#f59e0b" : "#6366f1";
              return u.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px"
                },
                children: [u.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: E.text,
                    width: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flexShrink: 0
                  },
                  children: x.name
                }), u.jsxs("div", {
                  style: {
                    flex: 1,
                    height: "20px",
                    background: "#f1f5f9",
                    borderRadius: "6px",
                    overflow: "hidden",
                    position: "relative"
                  },
                  children: [u.jsx("div", {
                    style: {
                      height: "100%",
                      width: `${c0}%`,
                      background: `linear-gradient(90deg, ${v0}, ${v0}cc)`,
                      borderRadius: "6px",
                      transition: "width 0.6s ease",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "6px"
                    },
                    children: c0 > 20 && u.jsx("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "#fff"
                      },
                      children: x.current
                    })
                  }), u.jsx("div", {
                    style: {
                      position: "absolute",
                      left: `${o/c*100}%`,
                      top: 0,
                      bottom: 0,
                      width: "2px",
                      background: "#1e1b4b",
                      opacity: .4
                    }
                  })]
                }), u.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 800,
                    color: v0,
                    minWidth: "30px",
                    textAlign: "right"
                  },
                  children: c0 <= 20 ? x.current : ""
                }), R0 && u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#ef4444",
                    background: "rgba(239,68,68,0.08)",
                    padding: "1px 4px",
                    borderRadius: "99px",
                    flexShrink: 0
                  },
                  children: "\u0E2A\u0E39\u0E07"
                }), k0 && u.jsx("span", {
                  style: {
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#f59e0b",
                    background: "rgba(245,158,11,0.08)",
                    padding: "1px 4px",
                    borderRadius: "99px",
                    flexShrink: 0
                  },
                  children: "\u0E15\u0E48\u0E33"
                })]
              }, q)
            }), u.jsxs("div", {
              style: {
                fontSize: "10px",
                color: E.muted,
                textAlign: "right",
                marginTop: "4px"
              },
              children: ["\u0E40\u0E2A\u0E49\u0E19\u0E14\u0E33 = \u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 (", o, " \u0E40\u0E04\u0E2A/\u0E04\u0E19)"]
            })]
          }), s0.length > 0 && u.jsxs("div", {
            style: {
              padding: "12px 14px",
              borderRadius: "12px",
              background: `${L}06`,
              border: `1px solid ${L}15`
            },
            children: [u.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "8px"
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
                  color: L
                },
                children: "AI Workload Balancer"
              })]
            }), s0.map((x, q) => u.jsxs("div", {
              style: {
                display: "flex",
                gap: "8px",
                marginBottom: "12px",
                padding: "8px 10px",
                borderRadius: "8px",
                background: "var(--md-surface-2, rgba(0,0,0,.03))",
                fontSize: "12px",
                color: E.text,
                fontWeight: 500
              },
              children: [u.jsxs("span", {
                style: {
                  color: L,
                  fontWeight: 900,
                  flexShrink: 0,
                  fontSize: "14px"
                },
                children: [q + 1, "."]
              }), u.jsx("span", {
                style: {
                  whiteSpace: "pre-line",
                  lineHeight: 1.6,
                  flex: 1
                },
                children: x
              })]
            }, q))]
          })]
        })
      })()
    }), u.jsx(n0, {
      children: u.jsx(uu, {
        drgOpt: A
      })
    }), u.jsx(V0, {
      data: s.medRecAI,
      theme: "default",
      title: "AI Medical Record Audit Intelligence"
    }), u.jsx(U0, {
      title: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 Medical Record Audit (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
      subtitle: "Coding Quality \xB7 Backlog \xB7 DRG Optimization \xB7 Revenue Recovery \xB7 Coder Workload \xB7 Risks \xB7 Recommendations",
      badge: "\u{1F4D0} Rule-based \xB7 10 dimensions",
      accentColor: "#7c3aed",
      headerGradient: "linear-gradient(135deg, rgba(124,58,237,.10), rgba(14,165,233,.06))",
      narrative: X0({
        today: s.medRecToday,
        analytics: s.medRecAnalytics,
        drgOpt: s.medRecDrgOpt,
        recovery: s.medRecRecovery,
        heatmap: s.medRecHeatmap
      })
    })]
  })
}
const iu = [{
  key: "pending",
  label: "\u23F3 Pending Review",
  color: "#7c3aed",
  bg: "rgba(124,58,237,0.04)"
}, {
  key: "review",
  label: "\u{1F50D} Under Review",
  color: "#0284c7",
  bg: "rgba(2,132,199,0.04)"
}, {
  key: "completed",
  label: "\u2705 Completed",
  color: "#059669",
  bg: "rgba(5,150,105,0.04)"
}, {
  key: "recovered",
  label: "\u{1F4B0} Revenue Recovered",
  color: "#f59e0b",
  bg: "rgba(245,158,11,0.04)"
}];

function uu({
  drgOpt: s
}) {
  return null
}
const Eu = _0.memo(J0);
export {
  Eu as
  default
};