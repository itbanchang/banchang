import {
  R as ie,
  r as F,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  q as l,
  w as X,
  h as me,
  E as ue
} from "./shared-ui-OVDEF1.js";
import {
  R as ne,
  g as be,
  a as ae,
  X as le,
  Y as se,
  T as de,
  L as ce,
  b as ye,
  c as fe,
  B as ve
} from "./vendor-charts-C5q2M-g3.js";

function Z(d, y) {
  const $ = d.pttype_name || d.pttype_code || "",
    m = pe($),
    f = y?.collection_rate ?? 0;
  return (y?.total_income || 0) > 0 ? m === "capitation" ? {
    label: "\u0E40\u0E2B\u0E21\u0E32\u0E08\u0E48\u0E32\u0E22",
    bg: "rgba(59,130,246,.1)",
    color: "#2563eb"
  } : m === "government" ? f >= 80 ? {
    label: "Gov \u0E1B\u0E01\u0E15\u0E34",
    bg: "rgba(5,150,105,.1)",
    color: "#059669"
  } : {
    label: "Gov AR \u0E0A\u0E49\u0E32",
    bg: "rgba(217,119,6,.1)",
    color: "#d97706"
  } : m === "ffs" ? f >= 95 ? {
    label: "\u0E1B\u0E01\u0E15\u0E34",
    bg: "rgba(5,150,105,.1)",
    color: "#059669"
  } : f >= 80 ? {
    label: "\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07",
    bg: "rgba(217,119,6,.1)",
    color: "#d97706"
  } : {
    label: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
    bg: "rgba(220,38,38,.1)",
    color: "#dc2626"
  } : f >= 80 ? {
    label: "\u0E1B\u0E01\u0E15\u0E34",
    bg: "rgba(5,150,105,.1)",
    color: "#059669"
  } : {
    label: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
    bg: "rgba(220,38,38,.1)",
    color: "#dc2626"
  } : {
    label: "\u2014",
    bg: "transparent",
    color: "var(--md-text-tertiary)"
  }
}

function pe(d) {
  if (!d) return "unknown";
  const y = String(d);
  return /ชำระเงิน/.test(y) && !/ฟอกไต|ล้างไต/.test(y) || /ประกันสุขภาพเอกชน|ประกันอุบัติเหตุ|\bพรบ\b|ประกันภัยจากรถ|ต่างชาติ|รัฐวิสาหกิจ|ครูเอกชน/.test(y) && !/UC/.test(y) || /^\s*ต่างด้าว/.test(y) && /ชำระเงิน|ต่างด้าวรพ\.บ้านฉาง\s*\(จ่าย/.test(y) ? "ffs" : /เบิกจ่ายตรง|กรมบัญชีกลาง|อปท|\bกทม\b|ทหารผ่านศึก/.test(y) ? "government" : /ประกันสังคม\s*(นอกเครือข่าย|ฉุกเฉิน|72\s*ชม)/.test(y) ? "ffs" : /ประกันสังคม|\bปกส\b/.test(y) || /\bUC\b|บัตรทอง|สปสช|ส่งเสริมป้องกัน|\bPP\b|ฟอกไต|ล้างไต|สิทธิว่าง|ผู้มีปัญหาสถานะ|ฝากครรภ์ฟรี/.test(y) || /ผู้สูงอายุ|ผู้พิการ|ผู้มีรายได้น้อย|นักเรียน|ภิกษุ|ผู้นำ|บัตร อสม|เด็กอายุ|อนุเคราะห์|ตรวจสุขภาพ|ตรวจฟัน|บริจาคโลหิต|ฉีดวัคซีน|ตรวจ amphet/.test(y) ? "capitation" : "other"
}

function je(d) {
  const y = d - 544,
    $ = new Date(y, 9, 1),
    m = new Date(y + 1, 8, 30),
    f = new Date;
  if (f < $) return 0;
  if (f > m) return 12;
  const G = (f.getFullYear() - $.getFullYear()) * 12 + (f.getMonth() - $.getMonth()) + 1;
  return Math.max(0, Math.min(12, G))
}

function _e({
  data: d,
  trendData: y,
  dxData: $
}) {
  if (!d?.payers || !d?.fiscal_years) return {
    headline: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E23\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u2014 AI \u0E08\u0E30\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E21\u0E37\u0E48\u0E2D data \u0E1E\u0E23\u0E49\u0E2D\u0E21",
    empty: !0
  };
  const m = (r, c = 0) => Number.isFinite(Number(r)) ? Number(r) : c,
    f = d.fiscal_years || [],
    G = f[f.length - 1]?.be,
    z = f[f.length - 2]?.be,
    E = d.grand_totals?.[G] || {},
    re = d.grand_totals?.[z] || {},
    k = m(E.total_income),
    C = m(re.total_income);
  m(E.total_outstanding), m(E.opd_visits), m(E.ipd_admissions);
  const O = je(G),
    W = O > 0 && O < 12,
    J = W ? C * (O / 12) : C,
    Q = C > 0 ? Math.round((k - C) / C * 100) : 0,
    oe = J > 0 ? Math.round((k - J) / J * 100) : 0,
    D = W && O > 0 ? k * (12 / O) : k,
    Y = (d.payers || []).map(r => {
      const c = r.fys?.[G] || {},
        V = r.fys?.[z] || {},
        ge = pe(r.pttype_name || r.pttype_code);
      return {
        code: r.pttype_code,
        name: r.pttype_name || r.pttype_code,
        category: ge,
        incLatest: m(c.total_income),
        incPrev: m(V.total_income),
        paid: m(c.total_paid),
        outstanding: m(c.total_outstanding),
        collectionRate: m(c.collection_rate),
        opd: m(c.opd_visits),
        ipd: m(c.ipd_admissions),
        flag_low: r.flag_low_collection,
        flag_out: r.flag_high_outstanding,
        growth: r.income_growth != null ? r.income_growth : m(V.total_income) > 0 ? Math.round((m(c.total_income) - m(V.total_income)) / m(V.total_income) * 100) : 0
      }
    }).filter(r => r.incLatest > 0),
    M = Y.filter(r => r.category === "ffs"),
    U = Y.filter(r => r.category === "capitation"),
    H = Y.filter(r => r.category === "government"),
    L = M.reduce((r, c) => r + c.incLatest, 0),
    g = M.reduce((r, c) => r + c.paid, 0),
    N = M.reduce((r, c) => r + c.outstanding, 0),
    _ = L > 0 ? g / L * 100 : 0,
    q = H.reduce((r, c) => r + c.incLatest, 0),
    i = H.reduce((r, c) => r + c.outstanding, 0),
    w = q > 0 ? Math.round(i / q * 365) : 0,
    K = U.reduce((r, c) => r + c.incLatest, 0),
    B = k > 0 ? K / k * 100 : 0;
  m(E.collection_rate);
  const t = M.filter(r => r.flag_low || r.collectionRate < 80 && r.incLatest > 5e4),
    o = H.filter(r => r.outstanding > 5e5);
  Y.sort((r, c) => c.incLatest - r.incLatest);
  const u = Y.slice(0, 3),
    a = k > 0 ? u.reduce((r, c) => r + c.incLatest, 0) / k * 100 : 0,
    x = u[0],
    h = M.filter(r => r.incLatest > 5e4).sort((r, c) => r.collectionRate - c.collectionRate)[0],
    v = M.slice().sort((r, c) => c.outstanding - r.outstanding)[0],
    s = Y.filter(r => r.incLatest > k * .02).sort((r, c) => c.growth - r.growth)[0],
    p = ($?.diagnoses || []).slice(0, 5),
    b = ($?.diagnoses || []).filter(r => m(r.outstanding || r.remain) > 5e4).slice(0, 3);
  let j, T;
  const S = W ? oe : Q;
  _ > 0 && _ < 85 ? (j = `\u26A0 FFS Collection \u0E15\u0E48\u0E33 \u2014 Self-pay/\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19 Collection Rate ${_.toFixed(1)}% (\u0E1B\u0E01\u0E15\u0E34\u0E04\u0E27\u0E23 \u226595%) \xB7 \u0E15\u0E23\u0E27\u0E08 billing + follow-up`, T = "#f43f5e") : S < -5 ? (j = `\u26A0 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2B\u0E14\u0E15\u0E31\u0E27 ${S}% YoY${W?" (pro-rata)":""} \u2014 Demand shrinkage \u0E2B\u0E23\u0E37\u0E2D payer shift \xB7 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E14\u0E48\u0E27\u0E19`, T = "#f59e0b") : _ >= 95 && t.length === 0 ? (j = `\u2705 FFS Revenue Cycle \u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \u2014 FFS Collection ${_.toFixed(1)}% \xB7 Growth ${S>=0?"+":""}${S}%${W?" (pro-rata)":""}`, T = "#10b981") : (j = `\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21: FFS ${l(Math.round(L/1e6))}M (Collection ${_.toFixed(1)}%) \xB7 Capitation ${B.toFixed(0)}% \xB7 Gov \u0E3F${l(Math.round(q/1e6))}M (AR ~${w}d)${W?` \xB7 Growth ${S>=0?"+":""}${S}% (pro-rata)`:""}`, T = "#0ea5e9");
  const n = (r, c, V) => r >= c ? "#10b981" : r >= V ? "#f59e0b" : "#f43f5e",
    R = [{
      label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 YTD",
      value: `\u0E3F${l(Math.round(k/1e6))}M`,
      sub: W ? `${O}/12 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 annualized ${l(Math.round(D/1e6))}M` : `FY ${G}`,
      color: "#7c3aed"
    }, {
      label: "Growth YoY",
      value: `${S>=0?"+":""}${S}%`,
      sub: W ? `pro-rata \xB7 raw ${Q>=0?"+":""}${Q}%` : `\u0E40\u0E17\u0E35\u0E22\u0E1A FY ${z}`,
      color: n(S, 5, -3)
    }, {
      label: "FFS Collection",
      value: `${_.toFixed(1)}%`,
      sub: `Self-pay/\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19 \xB7 ${l(Math.round(L/1e6))}M`,
      color: n(_, 95, 85)
    }, {
      label: "Capitation Share",
      value: `${B.toFixed(0)}%`,
      sub: `UC/\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07 \xB7 ${l(Math.round(K/1e6))}M`,
      color: "#8b5cf6"
    }, {
      label: "Gov AR Days",
      value: `~${w}d`,
      sub: `Outstanding \u0E3F${l(Math.round(i/1e6))}M`,
      color: w > 90 ? "#f43f5e" : w > 60 ? "#f59e0b" : "#10b981"
    }, {
      label: "Flagged (FFS+Gov)",
      value: `${t.length+o.length}`,
      sub: `FFS ${t.length} \xB7 Gov ${o.length}`,
      color: t.length + o.length >= 3 ? "#f43f5e" : t.length + o.length > 0 ? "#f59e0b" : "#10b981"
    }],
    A = [];
  if (A.push({
      icon: "\u{1F4B3}",
      title: "Fee-for-Service Revenue (Real Collection)",
      text: `FFS (\u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07/\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19\u0E40\u0E2D\u0E01\u0E0A\u0E19/\u0E1E\u0E23\u0E1A./\u0E15\u0E48\u0E32\u0E07\u0E0A\u0E32\u0E15\u0E34): \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \u0E3F${l(Math.round(L))} \xB7 \u0E40\u0E01\u0E47\u0E1A\u0E44\u0E14\u0E49 \u0E3F${l(Math.round(g))} \xB7 \u0E04\u0E49\u0E32\u0E07 \u0E3F${l(Math.round(N))} \xB7 Collection ${_.toFixed(1)}%. ${_>=95?"\u2705 FFS Collection \u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 Cash-handling + billing \u0E04\u0E23\u0E1A\u0E16\u0E49\u0E27\u0E19":_>=85?"Collection \u0E14\u0E35 \u2014 \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07":"\u26A0 FFS Collection \u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A cash register, digital payment, billing completeness"}`,
      color: n(_, 95, 85)
    }), A.push({
      icon: "\u{1F39F}\uFE0F",
      title: "Capitation Revenue (UC/\u0E1A\u0E31\u0E15\u0E23\u0E17\u0E2D\u0E07/\u0E2A\u0E1B\u0E2A\u0E0A.)",
      text: `Capitation: \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${B.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (\u0E3F${l(Math.round(K))}) \xB7 ${U.length} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C. \u2139\uFE0F Capitation \u0E21\u0E35 Outstanding \u2248 100% \u0E42\u0E14\u0E22 design \u2014 \u0E1D\u0E31\u0E48\u0E07\u0E23\u0E31\u0E10\u0E08\u0E48\u0E32\u0E22\u0E40\u0E2B\u0E21\u0E32 (Per-capita) \u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48 Fee-for-Service \u0E14\u0E31\u0E07\u0E19\u0E31\u0E49\u0E19 Collection% \u0E15\u0E48\u0E33\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E2A\u0E30\u0E17\u0E49\u0E2D\u0E19\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A. \u0E04\u0E27\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21: (1) Capitation Revenue Adequacy (\u0E08\u0E48\u0E32\u0E22\u0E1E\u0E2D\u0E01\u0E31\u0E1A\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E44\u0E2B\u0E21?) (2) DRG Optimization (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A IPD UC) (3) \u0E25\u0E14 Capitation Leakage (\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E1B\u0E43\u0E0A\u0E49\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48 \u0E23\u0E1E.\u0E2D\u0E37\u0E48\u0E19)`,
      color: "#8b5cf6"
    }), q > 0 && A.push({
      icon: "\u{1F3DB}\uFE0F",
      title: "Government Direct-Reimbursement (Slow-Pay AR)",
      text: `\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E15\u0E23\u0E07 (\u0E01\u0E23\u0E21\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E01\u0E25\u0E32\u0E07/\u0E2D\u0E1B\u0E17./\u0E01\u0E17\u0E21.): \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \u0E3F${l(Math.round(q))} \xB7 Outstanding \u0E3F${l(Math.round(i))} \xB7 AR Days \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${w} \u0E27\u0E31\u0E19. ${w>90?"\u{1F534} AR Days \u0E40\u0E01\u0E34\u0E19 90 \u0E27\u0E31\u0E19 \u2014 \u0E15\u0E32\u0E21 e-Claim + Reconciliation \u0E14\u0E48\u0E27\u0E19":w>60?"\u26A0 AR Days \u0E40\u0E01\u0E34\u0E19 60 \u0E27\u0E31\u0E19 \u2014 \u0E04\u0E27\u0E23\u0E17\u0E33 Aging Report":"\u2705 AR Days \u0E43\u0E19 track"}`,
      color: w > 90 ? "#f43f5e" : w > 60 ? "#f59e0b" : "#10b981"
    }), u.length > 0) {
    const r = u.map(c => `${c.name} (\u0E3F${l(Math.round(c.incLatest/1e6))}M \xB7 ${c.category==="capitation"?"Capitation":c.category==="government"?"Gov":"FFS"})`).join(" \xB7 ");
    A.push({
      icon: "\u{1F3C6}",
      title: "Top 3 Payers \u2014 Revenue Mix",
      text: `${r}. Top 3 \u0E23\u0E27\u0E21 ${a.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14. ` + (a >= 70 ? `\u26A0 Payer Concentration \u0E2A\u0E39\u0E07 \u2014 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 ${x?.name} \u0E21\u0E32\u0E01 \u0E2B\u0E32\u0E01\u0E23\u0E31\u0E10\u0E1B\u0E23\u0E31\u0E1A reimbursement \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E40\u0E2B\u0E21\u0E32\u0E08\u0E30\u0E01\u0E23\u0E30\u0E17\u0E1A` : "Portfolio Payer \u0E01\u0E23\u0E30\u0E08\u0E32\u0E22\u0E15\u0E31\u0E27\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35"),
      color: a >= 70 ? "#f59e0b" : "#10b981"
    })
  }
  if (h || v) {
    const r = [];
    h && h.collectionRate < 95 && r.push(`FFS Collection \u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14: ${h.name} ${h.collectionRate.toFixed(1)}% (\u0E3F${l(Math.round(h.incLatest))})`), v && v.outstanding > 5e4 && r.push(`FFS Outstanding \u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14: ${v.name} \u0E3F${l(Math.round(v.outstanding))}`), r.length > 0 && A.push({
      icon: "\u{1F3AF}",
      title: "FFS Payer Deep-Dive (\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E35\u0E48\u0E04\u0E27\u0E23\u0E40\u0E01\u0E47\u0E1A\u0E44\u0E14\u0E49)",
      text: r.join(" \xB7 ") + ". \u0E40\u0E1E\u0E34\u0E48\u0E21 intensity \u0E43\u0E19\u0E01\u0E32\u0E23\u0E15\u0E32\u0E21\u0E40\u0E01\u0E47\u0E1A (AR aging report, pre-auth, digital payment reminder)",
      color: "#f59e0b"
    })
  }
  s && s.growth > 10 && A.push({
    icon: "\u{1F680}",
    title: "Growth Leader",
    text: `\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E40\u0E23\u0E47\u0E27\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14: ${s.name} +${s.growth}% (\u0E3F${l(Math.round(s.incLatest))}) \xB7 ${s.category==="capitation"?"Capitation \u2014 \u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E47\u0E19\u0E01\u0E32\u0E23 shift \u0E08\u0E32\u0E01 \u0E23\u0E1E.\u0E2D\u0E37\u0E48\u0E19":"\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A demographics \u0E41\u0E25\u0E30 acquisition channel"}`,
    color: "#10b981"
  }), p.length > 0 && A.push({
    icon: "\u{1F3E5}",
    title: "Top Diagnoses Pattern",
    text: `\u0E42\u0E23\u0E04\u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E21\u0E32\u0E01: ${p.slice(0,3).map(r=>`${r.icd10} ${r.name}`).join(" \xB7 ")}. ` + (b.length > 0 ? `\u26A0 \u0E42\u0E23\u0E04\u0E17\u0E35\u0E48\u0E21\u0E35 Outstanding \u0E2A\u0E39\u0E07: ${b.map(r=>`${r.icd10} (\u0E3F${l(Math.round(r.outstanding||r.remain))})`).join(" \xB7 ")} \u2014 review coding \u0E41\u0E25\u0E30 claim documentation` : "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E23\u0E04\u0E2B\u0E25\u0E31\u0E01\u0E44\u0E21\u0E48\u0E21\u0E35 Outstanding \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34"),
    color: "#6366f1"
  });
  const P = [];
  _ > 0 && _ < 85 && P.push(`\u{1F534} FFS Collection \u0E15\u0E48\u0E33 (${_.toFixed(1)}%) \u2014 \u0E40\u0E2A\u0E35\u0E22\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \u0E1B\u0E23\u0E30\u0E40\u0E21\u0E34\u0E19 \u0E3F${l(Math.round(L*(1-_/100)))}`), N > L * .15 && P.push(`\u{1F534} FFS Outstanding \u0E3F${l(Math.round(N))} \xB7 >15% \u0E02\u0E2D\u0E07 FFS Revenue \u2014 AR recovery sprint`), w > 90 && P.push(`\u{1F534} Gov AR Days \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${w} \u0E27\u0E31\u0E19 \u2014 Outstanding \u0E3F${l(Math.round(i))} \xB7 \u0E40\u0E23\u0E48\u0E07 Reconciliation + e-Claim appeal`), S < -5 && P.push(`\u{1F534} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2B\u0E14\u0E15\u0E31\u0E27 ${S}%${W?" (pro-rata YoY)":""} \u2014 Demand shrinkage \u0E2B\u0E23\u0E37\u0E2D payer shift \xB7 \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C root cause \u0E14\u0E48\u0E27\u0E19`), h && h.collectionRate < 80 && P.push(`\u{1F7E0} ${h.name} FFS Collection ${h.collectionRate.toFixed(1)}% \xB7 \u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Self-pay`), a >= 70 && P.push(`\u{1F7E0} Payer Concentration \u2014 Top 3 \u0E04\u0E23\u0E2D\u0E07 ${a.toFixed(1)}% \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E16\u0E49\u0E32 major payer \u0E1B\u0E23\u0E31\u0E1A rate`), t.length >= 3 && P.push(`\u{1F7E0} ${t.length} FFS Payers \u0E1B\u0E31\u0E0D\u0E2B\u0E32 \u2014 Billing completeness review`), B > 80 && P.push(`\u{1F7E1} Capitation Share ${B.toFixed(0)}% \u2014 \u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 UC \u0E21\u0E32\u0E01 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E15\u0E48\u0E2D\u0E2B\u0E31\u0E27\u0E16\u0E39\u0E01\u0E08\u0E33\u0E01\u0E31\u0E14 \xB7 \u0E1E\u0E31\u0E12\u0E19\u0E32 FFS/Premium services \u0E40\u0E1E\u0E34\u0E48\u0E21`), P.length === 0 && P.push("\u2705 Payer Portfolio \u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \xB7 \u0E44\u0E21\u0E48\u0E21\u0E35 Red Flags \u0E17\u0E35\u0E48\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D");
  const I = [];
  return _ > 0 && _ < 90 && I.push("\u{1F534} P0 \xB7 FFS Revenue Cycle Audit \u2014 Cash register reconciliation \xB7 Digital payment adoption \xB7 Billing completeness (\u0E40\u0E19\u0E49\u0E19 \u0E0A\u0E33\u0E23\u0E30\u0E40\u0E07\u0E34\u0E19\u0E40\u0E2D\u0E07 + \u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19) \xB7 \u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22 FFS Collection \u2265 95%"), w > 60 && I.push(`\u{1F534} P0 \xB7 Gov e-Claim Recovery Sprint \u2014 \u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E15\u0E23\u0E07 Outstanding \u0E3F${l(Math.round(i))} \xB7 Reconciliation + Appeal \u0E20\u0E32\u0E22\u0E43\u0E19 60 \u0E27\u0E31\u0E19`), h && h.collectionRate < 80 && I.push(`\u{1F7E0} P1 \xB7 ${h.name} \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A billing process (FFS \u0E04\u0E27\u0E23 ~100%)`), B > 70 && I.push("\u{1F7E0} P1 \xB7 Diversification \u2014 \u0E02\u0E22\u0E32\u0E22 FFS revenue (Premium/Package/International) \u0E25\u0E14\u0E1E\u0E36\u0E48\u0E07\u0E1E\u0E32 Capitation"), a >= 70 && I.push("\u{1F7E0} P1 \xB7 Payer Diversification \u2014 \u0E14\u0E36\u0E07\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48\u0E08\u0E32\u0E01\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E01\u0E23\u0E30\u0E08\u0E38\u0E01\u0E15\u0E31\u0E27\u0E19\u0E49\u0E2D\u0E22"), s && s.growth > 20 && I.push(`\u{1F535} P1 \xB7 Scale Growth \u0E02\u0E2D\u0E07 ${s.name} (+${s.growth}%) \xB7 Marketing \xB7 Service expansion`), b.length > 0 && I.push(`\u{1F7E0} P1 \xB7 CDI \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A ${b[0].icd10} \u2014 coding gap \u0E2D\u0E32\u0E08\u0E17\u0E33\u0E43\u0E2B\u0E49 claim \u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18`), I.push("\u{1F535} P1 \xB7 Executive Payer Dashboard \u2014 \u0E41\u0E22\u0E01 FFS/Capitation/Government \xB7 Collection \u0E41\u0E22\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17 \xB7 AR Aging \u0E41\u0E22\u0E01 payer type"), I.push("\u{1F7E1} P2 \xB7 Capitation Adequacy Review \u2014 \u0E27\u0E31\u0E14\u0E27\u0E48\u0E32 UC revenue per-capita \u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D\u0E01\u0E31\u0E1A actual cost \u0E2B\u0E23\u0E37\u0E2D\u0E44\u0E21\u0E48 \xB7 \u0E16\u0E49\u0E32\u0E44\u0E21\u0E48\u0E15\u0E49\u0E2D\u0E07 cross-subsidize \u0E08\u0E32\u0E01 FFS"), A.push({
    icon: "\u26A0\uFE0F",
    title: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 / Red Flags (FFS-Focused)",
    list: P,
    color: "#f59e0b"
  }), A.push({
    icon: "\u{1F4A1}",
    title: "\u0E02\u0E49\u0E2D\u0E40\u0E2A\u0E19\u0E2D\u0E41\u0E19\u0E30\u0E40\u0E0A\u0E34\u0E07\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C (P0\u2013P2)",
    list: I,
    color: "#10b981"
  }), {
    headline: j,
    headlineColor: T,
    kpi: R,
    sections: A,
    footerLeft: `${Y.length} \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C \xB7 FFS ${M.length} \xB7 Gov ${H.length} \xB7 Capitation ${U.length} \xB7 FY ${G} (${O}/12 \u0E40\u0E14\u0E37\u0E2D\u0E19)${W?" \xB7 Pro-rata YoY":""} \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ${new Date().toLocaleString("th-TH")}`
  }
}

function xe(d, y) {
  return y > 0 ? Math.round((d - y) / y * 100) : d > 0 ? 100 : 0
}
async function ee(d, y) {
  const $ = await fetch(d, y),
    m = $.headers.get("content-type") || "";
  if (!$.ok) {
    if (m.includes("json")) {
      const f = await $.json();
      throw new Error(f.error || `HTTP ${$.status}`)
    }
    throw new Error(`HTTP ${$.status}`)
  }
  if (!m.includes("json")) throw new Error("\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E44\u0E21\u0E48\u0E15\u0E2D\u0E1A\u0E01\u0E25\u0E31\u0E1A \u2014 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32 Backend \u0E17\u0E33\u0E07\u0E32\u0E19\u0E2D\u0E22\u0E39\u0E48");
  return $.json()
}
const te = ["#94a3b8", "#7c3aed", "#0284c7"],
  he = ["#0284c7", "#7c3aed", "#db2777", "#ea580c", "#059669", "#d97706", "#4f46e5", "#0891b2", "#be123c", "#65a30d"];

function Se() {
  const [d, y] = F.useState(null), [$, m] = F.useState(null), [f, G] = F.useState(null), [z, E] = F.useState(!0), [re, k] = F.useState(null), [C, O] = F.useState("patient-insight"), [W, J] = F.useState(null), [Q, oe] = F.useState(null), [D, Y] = F.useState(null), M = F.useRef(null), U = F.useCallback(async () => {
    E(!0), k(null);
    try {
      const [t, o] = await Promise.all([ee(`/api/customer-insight/screening-summary?_t=${Date.now()}`, {
        credentials: "include"
      }), ee(`/api/customer-insight/monthly-trend?_t=${Date.now()}`, {
        credentials: "include"
      })]);
      y(t), m(o), ee("/api/ai/customer/segmentation", {
        credentials: "include"
      }).then(oe).catch(() => {})
    } catch (t) {
      k(t.message)
    }
    E(!1)
  }, []), H = F.useCallback(async t => {
    try {
      const o = t ? `&pttype=${t}` : "",
        u = await ee(`/api/customer-insight/top-diagnosis?${o}&_t=${Date.now()}`, {
          credentials: "include"
        });
      G(u)
    } catch (o) {
      k(o.message)
    }
  }, []), L = F.useCallback(async () => {
    try {
      const t = await ee(`/api/customer-insight/patient-insight?_t=${Date.now()}`, {
        credentials: "include"
      });
      Y(t)
    } catch (t) {
      k(t.message)
    }
  }, []);
  F.useEffect(() => {
    U()
  }, [U]), F.useEffect(() => {
    C === "diagnosis" && H(W)
  }, [C, W, H]), F.useEffect(() => {
    C === "patient-insight" && !D && L()
  }, [C, D, L]);
  const g = d?.fiscal_years || [],
    N = g.map(t => t.be),
    _ = F.useCallback(() => {
      if (!M.current) return;
      const t = window.open("", "_blank");
      t.document.write(`<!DOCTYPE html><html><head><title>Customer Insight \u2014 3 \u0E1B\u0E35\u0E07\u0E1A</title>
      <style>body{font-family:Sarabun,sans-serif;padding:20px}table{border-collapse:collapse;width:100%;font-size:10px}
      th,td{border:1px solid #ccc;padding:3px 6px;text-align:right}th{background:#f0f4f8;font-weight:800}
      td:first-child,th:first-child{text-align:left}</style></head><body>`), t.document.write(M.current.outerHTML), t.document.write("</body></html>"), t.document.close(), t.print()
    }, []),
    q = F.useCallback(() => {
      if (!d?.payers || g.length < 3) return;
      const t = "\uFEFF",
        o = ["\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34", "\u0E0A\u0E37\u0E48\u0E2D\u0E2A\u0E34\u0E17\u0E18\u0E34"];
      for (const s of g) o.push(`${s.be} OPD`, `${s.be} IPD`, `${s.be} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49`, `${s.be} \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A`, `${s.be} \u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30`, `${s.be} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%`);
      o.push("Growth %");
      const u = d.payers.map(s => {
          const p = [s.pttype_code, s.pttype_name];
          for (const b of g) {
            const j = s.fys[b.be];
            p.push(j.opd_visits, j.ipd_admissions, j.total_income, j.total_paid, j.total_outstanding, j.collection_rate)
          }
          return p.push(s.income_growth), p
        }),
        a = t + [o, ...u].map(s => s.join(",")).join(`
`),
        x = new Blob([a], {
          type: "text/csv;charset=utf-8"
        }),
        h = URL.createObjectURL(x),
        v = document.createElement("a");
      v.href = h, v.download = "BCH360_CustomerInsight_3FY.csv", v.click(), URL.revokeObjectURL(h)
    }, [d, g]),
    i = {
      th: {
        padding: "6px 8px",
        fontSize: "11px",
        fontWeight: 800,
        whiteSpace: "nowrap",
        color: "var(--md-text-secondary)",
        borderBottom: "2px solid var(--md-border)",
        textAlign: "right"
      },
      td: {
        padding: "5px 8px",
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        color: "var(--md-text-primary)",
        borderBottom: "1px solid var(--md-border)",
        textAlign: "right"
      },
      tdName: {
        padding: "5px 8px",
        fontSize: "12px",
        fontWeight: 700,
        whiteSpace: "nowrap",
        color: "var(--md-text-primary)",
        borderBottom: "1px solid var(--md-border)",
        textAlign: "left",
        maxWidth: "180px",
        overflow: "hidden",
        textOverflow: "ellipsis"
      },
      badge: (t, o) => ({
        fontSize: "10px",
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: "99px",
        background: t,
        color: o
      })
    },
    w = ({
      label: t,
      icon: o,
      values: u,
      unit: a = "",
      accent: x = "#0284c7",
      reverse: h = !1
    }) => {
      const v = u[2],
        s = u[1],
        p = xe(v, s),
        b = h ? p <= 0 ? "#059669" : "#dc2626" : p >= 0 ? "#059669" : "#dc2626";
      return e.jsxs("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          flex: "1 1 200px",
          minWidth: "190px"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "6px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "18px"
            },
            children: o
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: t
          })]
        }), e.jsxs("div", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            color: x
          },
          children: [l(v), " ", e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)"
            },
            children: a
          })]
        }), e.jsx("div", {
          style: {
            display: "flex",
            gap: "8px",
            marginTop: "6px",
            fontSize: "11px",
            fontWeight: 700
          },
          children: N.map((j, T) => e.jsxs("span", {
            style: {
              color: T === 2 ? x : "var(--md-text-tertiary)"
            },
            children: [j, ": ", l(u[T])]
          }, j))
        }), s > 0 && e.jsxs("div", {
          style: {
            marginTop: "4px",
            fontSize: "11px",
            fontWeight: 800,
            color: b
          },
          children: [p >= 0 ? "+" : "", p, "% vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"]
        })]
      })
    },
    K = ({
      active: t,
      payload: o,
      label: u
    }) => !t || !o?.length ? null : e.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderRadius: "10px",
        padding: "10px 14px",
        fontSize: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)"
      },
      children: [e.jsx("div", {
        style: {
          fontWeight: 800,
          marginBottom: "4px"
        },
        children: u
      }), o.map((a, x) => e.jsxs("div", {
        style: {
          display: "flex",
          gap: "6px",
          alignItems: "center"
        },
        children: [e.jsx("span", {
          style: {
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: a.color
          }
        }), e.jsxs("span", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-secondary)"
          },
          children: [a.name, ":"]
        }), e.jsx("span", {
          style: {
            fontWeight: 800
          },
          children: l(a.value)
        })]
      }, x))]
    }),
    B = ({
      value: t
    }) => {
      if (t == null || isNaN(t)) return null;
      const o = t >= 0 ? "#059669" : "#dc2626";
      return e.jsxs("span", {
        style: {
          fontSize: "10px",
          fontWeight: 800,
          color: o
        },
        children: [t >= 0 ? "+" : "", t, "%"]
      })
    };
  return e.jsxs("div", {
    className: "space-y-5 animate-fade-in pb-10",
    children: [e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [e.jsx("div", {
        style: {
          width: "4px",
          height: "24px",
          background: "linear-gradient(180deg, #7c3aed, #0284c7)",
          borderRadius: "99px"
        }
      }), e.jsx("h2", {
        style: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "Customer Insight"
      }), e.jsx("span", {
        style: i.badge("rgba(124,58,237,.1)", "#7c3aed"),
        children: "\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \xB7 \u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F"
      }), g.length === 3 && e.jsxs("span", {
        style: i.badge("rgba(2,132,199,.1)", "#0284c7"),
        children: ["3 \u0E1B\u0E35\u0E07\u0E1A: ", N[0], " \xB7 ", N[1], " \xB7 ", N[2]]
      })]
    }), e.jsxs("div", {
      className: "rounded-2xl p-4",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap"
      },
      children: [e.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)"
        },
        children: "\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07"
      }), [{
        id: "patient-insight",
        label: "\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23"
      }, {
        id: "diagnosis",
        label: "Top \u0E42\u0E23\u0E04 / \u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
      }].map(t => e.jsx("button", {
        onClick: () => O(t.id),
        style: {
          padding: "5px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          cursor: "pointer",
          border: C === t.id ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
          background: C === t.id ? "rgba(124,58,237,.08)" : "var(--md-surface)",
          color: C === t.id ? "#7c3aed" : "var(--md-text-secondary)"
        },
        children: t.label
      }, t.id)), e.jsx("div", {
        style: {
          width: "1px",
          height: "24px",
          background: "var(--md-border)"
        }
      }), e.jsx("button", {
        onClick: U,
        disabled: z,
        style: {
          padding: "6px 16px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          background: z ? "#94a3b8" : "linear-gradient(135deg, #7c3aed, #0284c7)",
          color: "#fff"
        },
        children: z ? "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14..." : "\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
      }), e.jsx("button", {
        onClick: _,
        disabled: !d,
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          cursor: "pointer",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)"
        },
        children: "Print"
      }), e.jsx("button", {
        onClick: q,
        disabled: !d,
        style: {
          padding: "6px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          cursor: "pointer",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)"
        },
        children: "CSV"
      })]
    }), re && e.jsx("div", {
      className: "rounded-xl p-3",
      style: {
        background: "rgba(220,38,38,.08)",
        border: "1px solid rgba(220,38,38,.2)",
        color: "#dc2626",
        fontSize: "13px",
        fontWeight: 700
      },
      children: re
    }), z && e.jsx("div", {
      style: {
        textAlign: "center",
        padding: "60px 0",
        color: "var(--md-text-tertiary)",
        fontWeight: 700
      },
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 Customer Insight (3 \u0E1B\u0E35\u0E07\u0E1A)..."
    }), !z && d && g.length === 3 && C === "overview" && (() => {
      const t = d.grand_totals,
        o = a => g.map(x => t[x.be]?.[a] || 0),
        u = ($?.comparison || []).map(a => {
          const x = {
            month: a.month
          };
          for (const h of g) x[`fy${h.be}`] = a[`fy${h.be}`]?.income || 0;
          return x
        }).filter(a => g.some(x => a[`fy${x.be}`] > 0));
      return e.jsxs(e.Fragment, {
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          },
          children: [e.jsx(w, {
            icon: "\u{1F465}",
            label: "OPD Visits",
            values: o("opd_visits"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#0284c7"
          }), e.jsx(w, {
            icon: "\u{1F3E5}",
            label: "IPD Admissions",
            values: o("ipd_admissions"),
            unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
            accent: "#7c3aed"
          }), e.jsx(w, {
            icon: "\u{1F4B0}",
            label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
            values: o("total_income"),
            unit: "\u0E1A\u0E32\u0E17",
            accent: "#059669"
          }), e.jsx(w, {
            icon: "\u{1F4CA}",
            label: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A",
            values: g.map(a => t[a.be]?.collection_rate || 0),
            unit: "%",
            accent: "#0284c7"
          }), e.jsx(w, {
            icon: "\u{1F6A9}",
            label: "FFS \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21",
            values: [0, 0, (d.payers || []).filter(a => Z(a, a.fys?.[g[2].be]).label === "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21").length],
            unit: "\u0E2A\u0E34\u0E17\u0E18\u0E34",
            accent: "#dc2626"
          })]
        }), u.length > 0 && e.jsxs("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [e.jsx("div", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: "12px"
            },
            children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13"
          }), e.jsx(ne, {
            width: "100%",
            height: 300,
            children: e.jsxs(be, {
              data: u,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [e.jsx(ae, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), e.jsx(le, {
                dataKey: "month",
                tick: {
                  fontSize: 11,
                  fontWeight: 700
                }
              }), e.jsx(se, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: a => a >= 1e6 ? `${(a/1e6).toFixed(1)}M` : a >= 1e3 ? `${(a/1e3).toFixed(0)}K` : a
              }), e.jsx(de, {
                content: e.jsx(K, {})
              }), e.jsx(ce, {
                wrapperStyle: {
                  fontSize: "12px",
                  fontWeight: 700
                }
              }), g.map((a, x) => e.jsx(ye, {
                type: "monotone",
                dataKey: `fy${a.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${a.be}`,
                stroke: te[x],
                strokeWidth: x === 2 ? 3 : 1.5,
                strokeDasharray: x === 0 ? "5 5" : void 0,
                dot: {
                  r: x === 2 ? 4 : 2
                }
              }, a.be))]
            })
          })]
        }), (() => {
          const a = g[g.length - 1]?.be,
            x = [...d.payers].sort((p, b) => {
              const j = Number(p?.fys?.[a]?.total_income || 0);
              return Number(b?.fys?.[a]?.total_income || 0) - j
            }).slice(0, 10),
            h = x.reduce((p, b) => p + Number(b?.fys?.[a]?.total_income || 0), 0),
            v = Number(t?.[a]?.total_income || 0),
            s = v > 0 ? Math.round(h / v * 100) : 0;
          return e.jsxs("div", {
            className: "rounded-2xl",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              overflow: "hidden"
            },
            ref: M,
            children: [e.jsxs("div", {
              style: {
                padding: "14px 20px",
                borderBottom: "2px solid var(--md-border)",
                background: "linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px"
              },
              children: [e.jsxs("div", {
                children: [e.jsxs("div", {
                  style: {
                    fontSize: "15px",
                    fontWeight: 900,
                    color: "var(--md-text-primary)"
                  },
                  children: ["\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E41\u0E22\u0E01\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 \u2014 ", e.jsx("span", {
                    style: {
                      color: "#7c3aed"
                    },
                    children: "Top 10 \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14"
                  }), " (\u0E1B\u0E35\u0E07\u0E1A ", a, ")"]
                }), e.jsxs("div", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    marginTop: "2px"
                  },
                  children: ["\u0E2B\u0E25\u0E31\u0E01\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E27\u0E34\u0E18\u0E35\u0E01\u0E32\u0E23 \u0E40\u0E07\u0E37\u0E48\u0E2D\u0E19\u0E44\u0E02 \u0E01\u0E32\u0E23\u0E02\u0E2D\u0E23\u0E31\u0E1A\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2F \xB7 \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E17\u0E35\u0E48\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A <80% (\u0E1B\u0E35\u0E07\u0E1A\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14) \u0E08\u0E30\u0E16\u0E39\u0E01 Flag \xB7 \u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A ", N.join(" \xB7 ")]
                })]
              }), e.jsxs("div", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: "8px",
                  background: "rgba(124,58,237,.1)",
                  color: "#7c3aed",
                  border: "1px solid rgba(124,58,237,.25)"
                },
                children: ["Top 10 = ", e.jsxs("strong", {
                  children: [s, "%"]
                }), " \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 (", d.payers.length, " \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14)"]
              })]
            }), e.jsx("div", {
              style: {
                overflowX: "auto"
              },
              children: e.jsxs("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse"
                },
                children: [e.jsxs("thead", {
                  children: [e.jsxs("tr", {
                    style: {
                      background: "var(--md-surface-2, rgba(0,0,0,.02))"
                    },
                    children: [e.jsx("th", {
                      rowSpan: 2,
                      style: {
                        ...i.th,
                        textAlign: "left",
                        paddingLeft: "14px",
                        borderRight: "2px solid var(--md-border)",
                        verticalAlign: "bottom"
                      },
                      children: "\u0E2A\u0E34\u0E17\u0E18\u0E34"
                    }), g.map((p, b) => e.jsxs("th", {
                      colSpan: 4,
                      style: {
                        ...i.th,
                        textAlign: "center",
                        borderRight: "2px solid var(--md-border)",
                        background: `${te[b]}10`,
                        color: te[b],
                        fontSize: "12px"
                      },
                      children: ["\u0E1B\u0E35\u0E07\u0E1A ", p.be]
                    }, p.be)), e.jsx("th", {
                      rowSpan: 2,
                      style: {
                        ...i.th,
                        textAlign: "center",
                        verticalAlign: "bottom"
                      },
                      children: "Growth"
                    }), e.jsx("th", {
                      rowSpan: 2,
                      style: {
                        ...i.th,
                        textAlign: "center",
                        verticalAlign: "bottom"
                      },
                      children: "\u0E2A\u0E16\u0E32\u0E19\u0E30"
                    })]
                  }), e.jsx("tr", {
                    style: {
                      background: "var(--md-surface-2, rgba(0,0,0,.02))"
                    },
                    children: g.map(p => e.jsxs(ie.Fragment, {
                      children: [e.jsx("th", {
                        style: {
                          ...i.th,
                          fontSize: "10px"
                        },
                        children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                      }), e.jsx("th", {
                        style: {
                          ...i.th,
                          fontSize: "10px"
                        },
                        children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                      }), e.jsx("th", {
                        style: {
                          ...i.th,
                          fontSize: "10px"
                        },
                        children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                      }), e.jsx("th", {
                        style: {
                          ...i.th,
                          fontSize: "10px",
                          borderRight: "2px solid var(--md-border)"
                        },
                        children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                      })]
                    }, p.be))
                  })]
                }), e.jsx("tbody", {
                  children: x.map((p, b) => {
                    const j = p.fys[g[2].be],
                      T = Z(p, j).label === "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21" ? "rgba(220,38,38,.04)" : b % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))";
                    return e.jsxs("tr", {
                      style: {
                        background: T
                      },
                      children: [e.jsxs("td", {
                        style: {
                          ...i.tdName,
                          paddingLeft: "14px",
                          borderRight: "2px solid var(--md-border)"
                        },
                        children: [e.jsxs("span", {
                          style: {
                            display: "inline-block",
                            width: "22px",
                            fontSize: "11px",
                            fontWeight: 800,
                            color: "#7c3aed",
                            textAlign: "center"
                          },
                          children: ["#", b + 1]
                        }), e.jsx("span", {
                          style: {
                            fontWeight: 800
                          },
                          children: p.pttype_code
                        }), e.jsx("span", {
                          style: {
                            marginLeft: "4px",
                            fontWeight: 600,
                            color: "var(--md-text-secondary)",
                            fontSize: "11px"
                          },
                          children: p.pttype_name
                        })]
                      }), g.map(S => {
                        const n = p.fys[S.be];
                        return e.jsxs(ie.Fragment, {
                          children: [e.jsx("td", {
                            style: i.td,
                            children: l(n.opd_visits + n.ipd_admissions)
                          }), e.jsx("td", {
                            style: {
                              ...i.td,
                              fontWeight: 700
                            },
                            children: l(n.total_income)
                          }), e.jsx("td", {
                            style: {
                              ...i.td,
                              color: n.total_outstanding > 0 ? "#dc2626" : "inherit"
                            },
                            children: l(n.total_outstanding)
                          }), e.jsx("td", {
                            style: {
                              ...i.td,
                              fontWeight: 800,
                              borderRight: "2px solid var(--md-border)",
                              color: n.collection_rate >= 90 ? "#059669" : n.collection_rate >= 80 ? "#d97706" : n.total_income > 0 ? "#dc2626" : "inherit"
                            },
                            children: n.total_income > 0 ? X(n.collection_rate) : "\u2014"
                          })]
                        }, S.be)
                      }), e.jsx("td", {
                        style: {
                          ...i.td,
                          textAlign: "center"
                        },
                        children: e.jsx(B, {
                          value: p.income_growth
                        })
                      }), e.jsx("td", {
                        style: {
                          ...i.td,
                          textAlign: "center"
                        },
                        children: (() => {
                          const S = Z(p, p.fys[g[2].be]);
                          return e.jsx("span", {
                            style: i.badge(S.bg, S.color),
                            children: S.label
                          })
                        })()
                      })]
                    }, p.pttype_code)
                  })
                }), e.jsx("tfoot", {
                  children: e.jsxs("tr", {
                    style: {
                      background: "rgba(14,165,233,.06)"
                    },
                    children: [e.jsx("td", {
                      style: {
                        ...i.td,
                        textAlign: "left",
                        paddingLeft: "14px",
                        fontWeight: 900,
                        borderRight: "2px solid var(--md-border)",
                        borderTop: "2px solid var(--md-border)"
                      },
                      children: "\u0E23\u0E27\u0E21\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
                    }), g.map(p => {
                      const b = t[p.be];
                      return e.jsxs(ie.Fragment, {
                        children: [e.jsx("td", {
                          style: {
                            ...i.td,
                            fontWeight: 900,
                            borderTop: "2px solid var(--md-border)"
                          },
                          children: l(b.opd_visits + b.ipd_admissions)
                        }), e.jsx("td", {
                          style: {
                            ...i.td,
                            fontWeight: 900,
                            borderTop: "2px solid var(--md-border)"
                          },
                          children: l(b.total_income)
                        }), e.jsx("td", {
                          style: {
                            ...i.td,
                            fontWeight: 900,
                            borderTop: "2px solid var(--md-border)",
                            color: "#dc2626"
                          },
                          children: l(b.total_outstanding)
                        }), e.jsx("td", {
                          style: {
                            ...i.td,
                            fontWeight: 900,
                            borderRight: "2px solid var(--md-border)",
                            borderTop: "2px solid var(--md-border)",
                            color: b.collection_rate >= 80 ? "#059669" : "#dc2626"
                          },
                          children: X(b.collection_rate)
                        })]
                      }, p.be)
                    }), e.jsx("td", {
                      style: {
                        ...i.td,
                        textAlign: "center",
                        fontWeight: 900,
                        borderTop: "2px solid var(--md-border)"
                      },
                      children: e.jsx(B, {
                        value: xe(t[g[2].be]?.total_income, t[g[1].be]?.total_income)
                      })
                    }), e.jsx("td", {
                      style: {
                        ...i.td,
                        borderTop: "2px solid var(--md-border)"
                      }
                    })]
                  })
                })]
              })
            }), e.jsxs("div", {
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
              children: [e.jsxs("span", {
                children: ["\u0E41\u0E2A\u0E14\u0E07 Top 10 \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E35\u0E48\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14 (\u0E1B\u0E35\u0E07\u0E1A ", a, ") \xB7 \u0E23\u0E27\u0E21\u0E40\u0E1B\u0E47\u0E19 ", s, "% \u0E02\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"]
              }), e.jsxs("span", {
                children: ["\u0E14\u0E39\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 (", d.payers.length, ') \u2192 \u0E2A\u0E25\u0E31\u0E1A "\u0E21\u0E38\u0E21\u0E21\u0E2D\u0E07: \u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\u0E2A\u0E34\u0E17\u0E18\u0E34"']
              })]
            })]
          })
        })()]
      })
    })(), !z && d && g.length === 3 && C === "payer-detail" && (() => {
      const t = d.payers.filter(o => o._sort_income > 0).slice(0, 12).map(o => {
        const u = {
          name: o.pttype_code
        };
        for (const a of g) u[`fy${a.be}`] = o.fys[a.be].total_income;
        return u
      });
      return e.jsxs(e.Fragment, {
        children: [e.jsxs("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [e.jsx("div", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: "12px"
            },
            children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34 (Top 12) \u2014 3 \u0E1B\u0E35\u0E07\u0E1A\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A"
          }), e.jsx(ne, {
            width: "100%",
            height: 350,
            children: e.jsxs(fe, {
              data: t,
              margin: {
                top: 5,
                right: 10,
                left: 10,
                bottom: 5
              },
              children: [e.jsx(ae, {
                strokeDasharray: "3 3",
                stroke: "var(--md-border)"
              }), e.jsx(le, {
                dataKey: "name",
                tick: {
                  fontSize: 10,
                  fontWeight: 700
                },
                interval: 0,
                angle: -30,
                textAnchor: "end",
                height: 50
              }), e.jsx(se, {
                tick: {
                  fontSize: 10
                },
                tickFormatter: o => o >= 1e6 ? `${(o/1e6).toFixed(1)}M` : o >= 1e3 ? `${(o/1e3).toFixed(0)}K` : o
              }), e.jsx(de, {
                content: e.jsx(K, {})
              }), e.jsx(ce, {
                wrapperStyle: {
                  fontSize: "12px",
                  fontWeight: 700
                }
              }), g.map((o, u) => e.jsx(ve, {
                dataKey: `fy${o.be}`,
                name: `\u0E1B\u0E35\u0E07\u0E1A ${o.be}`,
                fill: te[u],
                radius: [3, 3, 0, 0]
              }, o.be))]
            })
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "12px"
          },
          children: d.payers.filter(o => o._sort_income > 0).slice(0, 20).map((o, u) => {
            const a = o.fys[g[2].be],
              x = Z(o, a).label === "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21";
            return e.jsxs("div", {
              className: "rounded-2xl p-4",
              style: {
                background: "var(--md-surface)",
                border: x ? "1.5px solid rgba(220,38,38,.3)" : "1px solid var(--md-border)"
              },
              children: [e.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px"
                },
                children: [e.jsxs("div", {
                  children: [e.jsx("span", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: he[u % he.length]
                    },
                    children: o.pttype_code
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--md-text-secondary)",
                      marginLeft: "6px"
                    },
                    children: o.pttype_name
                  })]
                }), (() => {
                  const h = Z(o, a);
                  return e.jsx("span", {
                    style: i.badge(h.bg, h.color),
                    children: h.label
                  })
                })()]
              }), e.jsxs("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "11px"
                },
                children: [e.jsx("thead", {
                  children: e.jsxs("tr", {
                    children: [e.jsx("th", {
                      style: {
                        textAlign: "left",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E1B\u0E35\u0E07\u0E1A"
                    }), e.jsx("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), e.jsx("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), e.jsx("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                    }), e.jsx("th", {
                      style: {
                        textAlign: "right",
                        padding: "3px 4px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        borderBottom: "1px solid var(--md-border)"
                      },
                      children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                    })]
                  })
                }), e.jsx("tbody", {
                  children: g.map((h, v) => {
                    const s = o.fys[h.be];
                    return e.jsxs("tr", {
                      style: {
                        fontWeight: v === 2 ? 800 : 600
                      },
                      children: [e.jsx("td", {
                        style: {
                          textAlign: "left",
                          padding: "3px 4px",
                          color: te[v]
                        },
                        children: h.be
                      }), e.jsx("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: l(s.opd_visits + s.ipd_admissions)
                      }), e.jsx("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px"
                        },
                        children: l(s.total_income)
                      }), e.jsx("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: s.total_outstanding > 0 ? "#dc2626" : "inherit"
                        },
                        children: l(s.total_outstanding)
                      }), e.jsx("td", {
                        style: {
                          textAlign: "right",
                          padding: "3px 4px",
                          color: s.collection_rate >= 90 ? "#059669" : s.collection_rate >= 80 ? "#d97706" : "#dc2626"
                        },
                        children: s.total_income > 0 ? X(s.collection_rate) : "\u2014"
                      })]
                    }, h.be)
                  })
                })]
              }), e.jsxs("div", {
                style: {
                  marginTop: "6px",
                  fontSize: "11px",
                  fontWeight: 800
                },
                children: [e.jsx("span", {
                  style: {
                    color: "var(--md-text-tertiary)"
                  },
                  children: "Growth: "
                }), e.jsx(B, {
                  value: o.income_growth
                }), a.ipd_avg_rw > 0 && e.jsxs("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["Avg RW: ", e.jsx("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: a.ipd_avg_rw.toFixed(2)
                  })]
                }), a.ipd_avg_los > 0 && e.jsxs("span", {
                  style: {
                    marginLeft: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: ["LOS: ", e.jsxs("b", {
                    style: {
                      color: "var(--md-text-primary)"
                    },
                    children: [a.ipd_avg_los.toFixed(1), "d"]
                  })]
                })]
              })]
            }, o.pttype_code)
          })
        })]
      })
    })(), !z && C === "diagnosis" && e.jsxs(e.Fragment, {
      children: [e.jsxs("div", {
        className: "rounded-2xl p-4",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap"
        },
        children: [e.jsx("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-secondary)"
          },
          children: "\u0E01\u0E23\u0E2D\u0E07\u0E15\u0E32\u0E21\u0E2A\u0E34\u0E17\u0E18\u0E34"
        }), e.jsxs("select", {
          value: W || "",
          onChange: t => J(t.target.value || null),
          style: {
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 700,
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          },
          children: [e.jsx("option", {
            value: "",
            children: "\u0E17\u0E38\u0E01\u0E2A\u0E34\u0E17\u0E18\u0E34"
          }), (d?.payers || []).map(t => e.jsxs("option", {
            value: t.pttype_code,
            children: [t.pttype_code, " \u2014 ", t.pttype_name]
          }, t.pttype_code))]
        })]
      }), f?.diagnoses && e.jsxs("div", {
        className: "rounded-2xl",
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          overflow: "hidden"
        },
        children: [e.jsx("div", {
          style: {
            padding: "14px 20px",
            borderBottom: "2px solid var(--md-border)",
            background: "linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))"
          },
          children: e.jsxs("div", {
            style: {
              fontSize: "15px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: ["Top \u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23 \u2014 \u0E1B\u0E35\u0E07\u0E1A ", f.fiscal_year?.be || N[2], W && e.jsxs("span", {
              style: {
                ...i.badge("rgba(124,58,237,.1)", "#7c3aed"),
                marginLeft: "8px"
              },
              children: ["\u0E2A\u0E34\u0E17\u0E18\u0E34: ", W]
            })]
          })
        }), e.jsx("div", {
          style: {
            overflowX: "auto"
          },
          children: e.jsxs("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse"
            },
            children: [e.jsx("thead", {
              children: e.jsxs("tr", {
                style: {
                  background: "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [e.jsx("th", {
                  style: {
                    ...i.th,
                    textAlign: "center",
                    width: "36px"
                  },
                  children: "#"
                }), e.jsx("th", {
                  style: {
                    ...i.th,
                    textAlign: "left"
                  },
                  children: "ICD-10"
                }), e.jsx("th", {
                  style: {
                    ...i.th,
                    textAlign: "left"
                  },
                  children: "\u0E0A\u0E37\u0E48\u0E2D\u0E42\u0E23\u0E04/\u0E2B\u0E31\u0E15\u0E16\u0E01\u0E32\u0E23"
                }), e.jsx("th", {
                  style: i.th,
                  children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                }), e.jsx("th", {
                  style: i.th,
                  children: "\u0E04\u0E19"
                }), e.jsx("th", {
                  style: i.th,
                  children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                }), e.jsx("th", {
                  style: i.th,
                  children: "\u0E04\u0E49\u0E32\u0E07\u0E0A\u0E33\u0E23\u0E30"
                }), e.jsx("th", {
                  style: i.th,
                  children: "\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A%"
                })]
              })
            }), e.jsx("tbody", {
              children: f.diagnoses.map((t, o) => e.jsxs("tr", {
                style: {
                  background: o % 2 === 0 ? "transparent" : "var(--md-surface-2, rgba(0,0,0,.02))"
                },
                children: [e.jsx("td", {
                  style: {
                    ...i.td,
                    textAlign: "center",
                    color: "var(--md-text-tertiary)"
                  },
                  children: o + 1
                }), e.jsx("td", {
                  style: {
                    ...i.td,
                    textAlign: "left",
                    fontWeight: 800,
                    fontFamily: "monospace"
                  },
                  children: t.icd10
                }), e.jsx("td", {
                  style: i.tdName,
                  children: t.name
                }), e.jsx("td", {
                  style: i.td,
                  children: l(t.visits)
                }), e.jsx("td", {
                  style: i.td,
                  children: l(t.patients)
                }), e.jsx("td", {
                  style: i.td,
                  children: l(t.income)
                }), e.jsx("td", {
                  style: {
                    ...i.td,
                    color: (t.outstanding || t.remain || 0) > 0 ? "#dc2626" : "inherit",
                    fontWeight: (t.outstanding || t.remain || 0) > 0 ? 800 : 600
                  },
                  children: l(t.outstanding || t.remain || 0)
                }), e.jsx("td", {
                  style: {
                    ...i.td,
                    fontWeight: 800,
                    color: t.collection_rate >= 90 ? "#059669" : t.collection_rate >= 80 ? "#d97706" : "#dc2626"
                  },
                  children: X(t.collection_rate)
                })]
              }, t.icd10))
            })]
          })
        })]
      })]
    }), !z && C === "patient-insight" && (() => {
      if (!D) return e.jsx("div", {
        style: {
          textAlign: "center",
          padding: "40px 0",
          color: "var(--md-text-tertiary)",
          fontWeight: 700
        },
        children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23..."
      });
      const t = D.loyalty || {},
        o = D.demographics || {
          age_bands: {},
          sex: {}
        },
        u = D.inactive || {},
        a = D.fiscal_year?.be,
        x = o.age_bands || {},
        h = (x.lt18 || 0) + (x.a18_34 || 0) + (x.a35_59 || 0) + (x.gte60 || 0),
        v = (o.sex?.male || 0) + (o.sex?.female || 0),
        s = n => n ? new Date(n).toLocaleDateString("th-TH", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) : "\u2014",
        p = [{
          label: `\u{1F465} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \u0E1B\u0E35\u0E07\u0E1A ${a||""}`,
          val: t.total_unique || 0,
          sub: `${l(t.total_visits||0)} visits \xB7 \u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${t.avg_visits_per_patient||0} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19`,
          color: "#0284c7"
        }, {
          label: "\u2728 \u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E43\u0E2B\u0E21\u0E48 (First Visit \u0E43\u0E19\u0E1B\u0E35\u0E19\u0E35\u0E49)",
          val: t.new_patients || 0,
          sub: `${X(t.new_pct||0)} \u0E02\u0E2D\u0E07 ${l(t.total_unique||0)} \u0E23\u0E32\u0E22`,
          color: "#059669"
        }, {
          label: "\u{1F501} \u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E0B\u0E49\u0E33 (Retention)",
          val: t.returning_patients || 0,
          sub: `${X(t.returning_pct||0)} \xB7 Retention rate`,
          color: "#7c3aed"
        }, {
          label: "\u{1F4B0} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
          val: t.total_income || 0,
          sub: `\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${l(t.total_unique>0?Math.round(t.total_income/t.total_unique):0)} \u0E1A\u0E32\u0E17/\u0E04\u0E19`,
          color: "#d97706"
        }],
        b = [{
          label: "<18 \u0E1B\u0E35 (\u0E40\u0E14\u0E47\u0E01/\u0E40\u0E22\u0E32\u0E27\u0E0A\u0E19)",
          val: x.lt18 || 0,
          color: "#3b82f6"
        }, {
          label: "18-34 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E17\u0E33\u0E07\u0E32\u0E19\u0E15\u0E49\u0E19)",
          val: x.a18_34 || 0,
          color: "#10b981"
        }, {
          label: "35-59 \u0E1B\u0E35 (\u0E27\u0E31\u0E22\u0E01\u0E25\u0E32\u0E07)",
          val: x.a35_59 || 0,
          color: "#f59e0b"
        }, {
          label: "60+ \u0E1B\u0E35 (\u0E1C\u0E39\u0E49\u0E2A\u0E39\u0E07\u0E2D\u0E32\u0E22\u0E38)",
          val: x.gte60 || 0,
          color: "#ef4444"
        }],
        j = [{
          label: "\u2642 \u0E0A\u0E32\u0E22",
          val: o.sex?.male || 0,
          color: "#3b82f6"
        }, {
          label: "\u2640 \u0E2B\u0E0D\u0E34\u0E07",
          val: o.sex?.female || 0,
          color: "#ec4899"
        }],
        T = [{
          label: "\u0E02\u0E32\u0E14 3-6 \u0E40\u0E14\u0E37\u0E2D\u0E19",
          val: u.inactive_3_6mo || 0,
          color: "#d97706",
          hint: "\u0E43\u0E01\u0E25\u0E49\u0E40\u0E02\u0E49\u0E32\u0E19\u0E31\u0E14 \xB7 proactive call"
        }, {
          label: "\u0E02\u0E32\u0E14 6-12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
          val: u.inactive_6_12mo || 0,
          color: "#dc2626",
          hint: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E17\u0E31\u0E19\u0E17\u0E35 \xB7 NCD/chronic risk"
        }, {
          label: "\u0E02\u0E32\u0E14 >12 \u0E40\u0E14\u0E37\u0E2D\u0E19",
          val: u.inactive_12mo_plus || 0,
          color: "#7c3aed",
          hint: "\u0E23\u0E2D\u0E1A recall \u0E43\u0E2B\u0E0D\u0E48"
        }],
        S = [{
          title: "\u2B50 Top 20 \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
          list: D.top_high_value || [],
          accent: "#d97706",
          hint: "Target retention / care management"
        }, {
          title: "\u{1F501} Top 20 \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E21\u0E32\u0E1A\u0E48\u0E2D\u0E22\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14",
          list: D.top_high_frequency || [],
          accent: "#7c3aed",
          hint: "Chronic care candidates"
        }];
      return e.jsxs(e.Fragment, {
        children: [e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px"
          },
          children: p.map(n => e.jsxs("div", {
            className: "rounded-2xl p-4",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              borderTop: `3px solid ${n.color}`
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: ".04em"
              },
              children: n.label
            }), e.jsx("div", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: n.color,
                marginTop: "6px",
                fontVariantNumeric: "tabular-nums"
              },
              children: l(n.val)
            }), e.jsx("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-secondary)",
                fontWeight: 600,
                marginTop: "4px"
              },
              children: n.sub
            })]
          }, n.label))
        }), e.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "12px"
          },
          children: [e.jsxs("div", {
            className: "rounded-2xl p-5",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginBottom: "12px"
              },
              children: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38"
            }), ...b.map(n => {
              const R = h > 0 ? n.val / h * 100 : 0;
              return e.jsxs("div", {
                style: {
                  marginBottom: "10px"
                },
                children: [e.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 700,
                    marginBottom: "4px"
                  },
                  children: [e.jsx("span", {
                    style: {
                      color: "var(--md-text-secondary)"
                    },
                    children: n.label
                  }), e.jsxs("span", {
                    style: {
                      color: n.color,
                      fontVariantNumeric: "tabular-nums"
                    },
                    children: [l(n.val), " (", R.toFixed(1), "%)"]
                  })]
                }), e.jsx("div", {
                  style: {
                    height: "8px",
                    background: "rgba(0,0,0,.04)",
                    borderRadius: "99px",
                    overflow: "hidden"
                  },
                  children: e.jsx("div", {
                    style: {
                      width: `${R}%`,
                      height: "100%",
                      background: n.color,
                      borderRadius: "99px",
                      transition: "width .4s ease"
                    }
                  })
                })]
              }, n.label)
            })]
          }), e.jsxs("div", {
            className: "rounded-2xl p-5",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                marginBottom: "12px"
              },
              children: "\u0E40\u0E1E\u0E28"
            }), e.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              },
              children: j.map(n => {
                const R = v > 0 ? n.val / v * 100 : 0;
                return e.jsxs("div", {
                  children: [e.jsxs("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "4px"
                    },
                    children: [e.jsx("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 700,
                        color: n.color
                      },
                      children: n.label
                    }), e.jsx("span", {
                      style: {
                        fontSize: "14px",
                        fontWeight: 900,
                        color: n.color,
                        fontVariantNumeric: "tabular-nums"
                      },
                      children: l(n.val)
                    })]
                  }), e.jsxs("div", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--md-text-tertiary)",
                      marginBottom: "4px"
                    },
                    children: [R.toFixed(1), "%"]
                  }), e.jsx("div", {
                    style: {
                      height: "6px",
                      background: "rgba(0,0,0,.04)",
                      borderRadius: "99px",
                      overflow: "hidden"
                    },
                    children: e.jsx("div", {
                      style: {
                        width: `${R}%`,
                        height: "100%",
                        background: n.color,
                        borderRadius: "99px"
                      }
                    })
                  })]
                }, n.label)
              })
            })]
          })]
        }), e.jsxs("div", {
          className: "rounded-2xl p-5",
          style: {
            background: "var(--md-surface)",
            border: "1px solid var(--md-border)"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
              flexWrap: "wrap",
              gap: "8px"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "\u{1F4DE} \u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E02\u0E32\u0E14\u0E01\u0E32\u0E23\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 (Recall Opportunity)"
            }), e.jsxs("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: ["Total \u0E17\u0E35\u0E48\u0E40\u0E04\u0E22\u0E21\u0E32\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ", l(u.total_patients_ever || 0), " \u0E23\u0E32\u0E22"]
            })]
          }), e.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "10px"
            },
            children: T.map(n => e.jsxs("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: `${n.color}08`,
                border: `1px solid ${n.color}25`
              },
              children: [e.jsx("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  color: n.color,
                  textTransform: "uppercase",
                  letterSpacing: ".04em",
                  marginBottom: "4px"
                },
                children: n.label
              }), e.jsx("div", {
                style: {
                  fontSize: "22px",
                  fontWeight: 900,
                  color: n.color,
                  fontVariantNumeric: "tabular-nums"
                },
                children: l(n.val)
              }), e.jsx("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-secondary)",
                  marginTop: "4px"
                },
                children: n.hint
              })]
            }, n.label))
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
            gap: "12px"
          },
          children: S.map(n => e.jsxs("div", {
            className: "rounded-2xl",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              overflow: "hidden"
            },
            children: [e.jsxs("div", {
              style: {
                padding: "12px 16px",
                borderBottom: "2px solid var(--md-border)",
                background: `linear-gradient(135deg, ${n.accent}08, transparent)`
              },
              children: [e.jsx("div", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: n.accent
                },
                children: n.title
              }), e.jsx("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: n.hint
              })]
            }), e.jsx("div", {
              style: {
                overflowX: "auto",
                maxHeight: "480px",
                overflowY: "auto"
              },
              children: e.jsxs("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse"
                },
                children: [e.jsx("thead", {
                  style: {
                    position: "sticky",
                    top: 0,
                    background: "var(--md-surface)",
                    zIndex: 1
                  },
                  children: e.jsxs("tr", {
                    children: [e.jsx("th", {
                      style: {
                        ...i.th,
                        textAlign: "center",
                        width: "32px"
                      },
                      children: "#"
                    }), e.jsx("th", {
                      style: {
                        ...i.th,
                        textAlign: "left"
                      },
                      children: "HN \xB7 \u0E0A\u0E37\u0E48\u0E2D"
                    }), e.jsx("th", {
                      style: i.th,
                      children: "\u0E2D\u0E32\u0E22\u0E38"
                    }), e.jsx("th", {
                      style: i.th,
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07"
                    }), e.jsx("th", {
                      style: i.th,
                      children: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49"
                    }), e.jsx("th", {
                      style: {
                        ...i.th,
                        textAlign: "left"
                      },
                      children: "\u0E04\u0E23\u0E31\u0E49\u0E07\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"
                    })]
                  })
                }), e.jsx("tbody", {
                  children: n.list.length === 0 ? e.jsx("tr", {
                    children: e.jsx("td", {
                      colSpan: 6,
                      style: {
                        ...i.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)",
                        padding: "24px"
                      },
                      children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
                    })
                  }) : n.list.map((R, A) => e.jsxs("tr", {
                    style: {
                      background: A % 2 === 0 ? "transparent" : "rgba(0,0,0,.02)"
                    },
                    children: [e.jsx("td", {
                      style: {
                        ...i.td,
                        textAlign: "center",
                        color: "var(--md-text-tertiary)"
                      },
                      children: A + 1
                    }), e.jsxs("td", {
                      style: i.tdName,
                      children: [e.jsx("div", {
                        style: {
                          fontFamily: "monospace",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--md-text-tertiary)"
                        },
                        children: R.hn
                      }), e.jsx("div", {
                        style: {
                          fontSize: "11px",
                          fontWeight: 700
                        },
                        children: R.pt_name || "\u2014"
                      })]
                    }), e.jsx("td", {
                      style: i.td,
                      children: R.age || "\u2014"
                    }), e.jsx("td", {
                      style: {
                        ...i.td,
                        fontWeight: 800,
                        color: n.accent
                      },
                      children: l(R.visit_count)
                    }), e.jsx("td", {
                      style: {
                        ...i.td,
                        fontWeight: 800
                      },
                      children: l(R.total_income)
                    }), e.jsx("td", {
                      style: {
                        ...i.td,
                        textAlign: "left",
                        fontSize: "10px",
                        color: "var(--md-text-secondary)"
                      },
                      children: s(R.last_visit)
                    })]
                  }, R.hn))
                })]
              })
            })]
          }, n.title))
        })]
      })
    })(), e.jsx(me, {
      data: Q,
      theme: "customer",
      title: "AI Customer Intelligence"
    }), !z && d && e.jsx(ue, {
      title: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 Customer & Payer (\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23)",
      subtitle: "Revenue Pulse \xB7 Payer Mix \xB7 Collection Efficiency \xB7 Outstanding \xB7 Diagnosis Pattern \xB7 Risks \xB7 Recommendations",
      badge: "\u{1F4D0} Rule-based \xB7 8 dimensions",
      accentColor: "#db2777",
      headerGradient: "linear-gradient(135deg, rgba(219,39,119,.10), rgba(124,58,237,.06))",
      narrative: _e({
        data: d,
        trendData: $,
        dxData: f
      })
    }), !z && d && e.jsxs("div", {
      style: {
        textAlign: "center",
        fontSize: "11px",
        fontWeight: 600,
        color: "var(--md-text-tertiary)",
        padding: "8px 0"
      },
      children: [d.data_source, " \xB7 \u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15 ", new Date(d.timestamp).toLocaleString("th-TH")]
    })]
  })
}
const $e = ie.memo(Se);
export {
  $e as
  default
};