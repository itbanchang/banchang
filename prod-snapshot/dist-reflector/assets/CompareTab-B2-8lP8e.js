import {
  R as O,
  r as M,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  a as te,
  h as re,
  E as ae,
  q as z
} from "./shared-ui-OVDEF1.js";
import {
  R as ne,
  c as oe,
  a as se,
  X as le,
  Y as ie,
  T as ce,
  B as de,
  L as pe
} from "./vendor-charts-C5q2M-g3.js";

function he({
  deptData: n,
  payerData: p,
  depts: y
}) {
  if (!(n && Object.keys(n).length > 0)) return {
    headline: "กำลังรอข้อมูลเปรียบเทียบแผนก — AI จะวิเคราะห์เมื่อ data พร้อม",
    empty: !0
  };
  const j = (a, r = 0) => Number.isFinite(Number(a)) ? Number(a) : r,
    g = [];
  let R = 0,
    L = 0;
  for (const a of y) {
    const r = n[a.id]?.fiscal_years || [];
    if (r.length < 2) continue;
    const v = r[r.length - 1],
      u = r[r.length - 2],
      b = j(v?.comparable_revenue ?? v?.total_revenue),
      W = j(u?.comparable_revenue ?? u?.total_revenue);
    if (W <= 0 && b <= 0) continue;
    const I = W > 0 ? Math.round((b - W) / W * 100) : b > 0 ? 100 : 0,
      H = b - W;
    R += b, L += W, g.push({
      id: a.id,
      label: a.label,
      icon: a.icon,
      cur: b,
      old: W,
      growth: I,
      diff: H,
      latestLabel: v?.fiscal_label,
      prevLabel: u?.fiscal_label
    })
  }
  if (g.length === 0) return {
    headline: "ไม่มีแผนกที่มีข้อมูลเปรียบเทียบ 2 ปีงบ — ต้องเก็บข้อมูลอย่างน้อย 2 ปีงบ",
    empty: !0
  };
  g.sort((a, r) => r.growth - a.growth);
  const h = g.filter(a => a.growth >= 5),
    l = g.filter(a => a.growth < -3),
    N = g.filter(a => a.growth >= -3 && a.growth < 5),
    i = L > 0 ? Math.round((R - L) / L * 100) : 0,
    $ = R - L,
    P = g[0]?.latestLabel || "ปีล่าสุด",
    T = g[0]?.prevLabel || "ปีก่อน",
    s = p?.fiscal_years || [],
    d = s[s.length - 1],
    _ = s[s.length - 2];
  let k = [],
    w = null;
  if (d && _) {
    const a = (d.payers || []).reduce((u, b) => u + j(b.comparable_revenue ?? b.total_revenue), 0),
      r = (_.payers || []).reduce((u, b) => u + j(b.comparable_revenue ?? b.total_revenue), 0),
      v = Object.fromEntries((_.payers || []).map(u => [u.payer_code || u.payer, j(u.comparable_revenue ?? u.total_revenue)]));
    for (const u of d.payers || []) {
      const b = j(u.comparable_revenue ?? u.total_revenue),
        W = v[u.payer_code || u.payer] || 0,
        I = a > 0 ? b / a * 100 : 0,
        H = r > 0 ? W / r * 100 : 0,
        Z = I - H,
        ee = W > 0 ? Math.round((b - W) / W * 100) : b > 0 ? 100 : 0;
      k.push({
        name: u.payer || u.payer_code,
        cur: b,
        old: W,
        sharLatest: I,
        sharPrev: H,
        shift: Z,
        g: ee
      })
    }
    k.sort((u, b) => b.cur - u.cur), w = k[0]
  }
  let A, x;
  i >= 10 ? (A = `🚀 โรงพยาบาลขยายตัวแข็งแรง — รายได้รวม ${P} เติบโต +${i}% (${$>=0?"+":""}฿${z($)}) · Winners ${h.length} แผนก · Losers ${l.length} แผนก`, x = "#10b981") : i >= 3 ? (A = `✅ รายได้รวมเติบโต +${i}% (${$>=0?"+":""}฿${z($)}) เทียบ ${T} · มี ${h.length} แผนกเป็น Growth Driver · ${l.length} แผนกต้อง attention`, x = "#0ea5e9") : i < -5 ? (A = `🔴 รายได้รวมหดตัว ${i}% (${$}) — ${l.length} แผนกลดรายได้ · ต้องจัด Revenue Recovery Task Force ด่วน`, x = "#f43f5e") : (A = `รายได้รวม ${i>=0?"+":""}${i}% เทียบ ${T} · ${h.length} Winners · ${N.length} Flat · ${l.length} Losers`, x = i >= 0 ? "#0ea5e9" : "#f59e0b");
  const C = g.slice(0, 3),
    S = g.slice(-3).reverse(),
    Y = [{
      label: "รายได้รวม (Latest)",
      value: `฿${z(Math.round(R/1e6))}M`,
      sub: P,
      color: "#7c3aed"
    }, {
      label: "Growth Overall",
      value: `${i>=0?"+":""}${i}%`,
      sub: `${$>=0?"+":""}฿${z(Math.round($/1e6))}M`,
      color: i >= 5 ? "#10b981" : i >= 0 ? "#0ea5e9" : "#f43f5e"
    }, {
      label: "Winners",
      value: `${h.length}`,
      sub: "เติบโต ≥ 5%",
      color: "#10b981"
    }, {
      label: "Losers",
      value: `${l.length}`,
      sub: "ลดลง ≥ 3%",
      color: l.length > 0 ? "#f43f5e" : "#10b981"
    }, {
      label: "Top Driver",
      value: C[0] ? `${C[0].icon}` : "—",
      sub: C[0] ? `${C[0].label.split(" ")[0]} +${C[0].growth}%` : "—",
      color: "#10b981"
    }, {
      label: "Biggest Loser",
      value: S[0] && S[0].growth < 0 ? S[0].icon : "—",
      sub: S[0] && S[0].growth < 0 ? `${S[0].label.split(" ")[0]} ${S[0].growth}%` : "—",
      color: "#f59e0b"
    }],
    D = [];
  if (D.push({
      icon: "📊",
      title: "ภาพรวมการเติบโต",
      text: `ปีงบ ${P} มีรายได้รวม ฿${z(Math.round(R))} เทียบปี ${T} ที่ ฿${z(Math.round(L))} · เปลี่ยนแปลง ${i>=0?"+":""}${i}% (${$>=0?"+":""}฿${z(Math.round($))}). มี ${g.length} แผนกที่เทียบได้ — ${h.length} Winners, ${N.length} Flat, ${l.length} Losers. ` + (h.length >= l.length + 2 ? "เสียงส่วนใหญ่เป็นบวก — momentum ดี" : l.length >= h.length + 2 ? "Losers มากกว่า Winners — ต้องทบทวนยุทธศาสตร์" : "สมดุลระหว่างการเติบโตและหดตัว"),
      color: x
    }), C.length > 0 && C[0].growth > 0) {
    const a = C.filter(r => r.growth > 0).map(r => `${r.icon} ${r.label}: +${r.growth}% (${r.diff>=0?"+":""}฿${z(Math.round(r.diff))})`).join(" · ");
    D.push({
      icon: "🏆",
      title: "Top Growth Drivers",
      text: `${a}. ` + (C[0].growth >= 20 ? "แผนกเหล่านี้เป็น Bright Spots — วิเคราะห์ Best Practice เพื่อ scale ไปแผนกอื่น" : "แนะนำศึกษา factors ที่ช่วยผลักดัน (demand · pricing · service mix) และ protect momentum"),
      color: "#10b981"
    })
  }
  if (S.length > 0 && S[0].growth < 0) {
    const a = S.filter(r => r.growth < 0).map(r => `${r.icon} ${r.label}: ${r.growth}% (${z(Math.round(r.diff))})`).join(" · ");
    D.push({
      icon: "⚠️",
      title: "Underperforming Departments",
      text: `${a}. ต้องวิเคราะห์ root cause รายแผนก: ปริมาณลด (volume), การเปลี่ยนพฤติกรรมผู้ป่วย, การแข่งขัน, supply disruption, หรือ price pressure. ควรตั้ง turnaround team รายแผนก target 90 วัน`,
      color: "#f43f5e"
    })
  }
  if (w && k.length > 0) {
    const a = k.slice().sort((r, v) => Math.abs(v.shift) - Math.abs(r.shift))[0];
    D.push({
      icon: "💳",
      title: "Payer Mix Analysis",
      text: `Top Payer: ${w.name} (฿${z(Math.round(w.cur))}) · ส่วนแบ่ง ${w.sharLatest.toFixed(1)}% (${w.shift>=0?"+":""}${w.shift.toFixed(1)}pp เทียบปีก่อน). สิทธิ์ที่มีการเปลี่ยนแปลงสูงสุด: ${a.name} (${a.shift>=0?"+":""}${a.shift.toFixed(1)}pp). ` + (a.shift > 5 ? `📈 ${a.name} กำลังขยายสัดส่วน — ตรวจสอบ collection rate, reimbursement terms` : a.shift < -5 ? `📉 ${a.name} หดตัว — เสี่ยง revenue mix shift, ต้องติดตาม` : "Portfolio payer ค่อนข้างคงที่"),
      color: "#6366f1"
    })
  }
  const q = g.reduce((a, r) => a + r.cur, 0) > 0 && g[g.length - 1] ? g.slice().sort((a, r) => r.cur - a.cur)[0].cur / R : 0,
    t = g.slice().sort((a, r) => r.cur - a.cur).slice(0, 2).reduce((a, r) => a + r.cur, 0) / (R || 1);
  D.push({
    icon: "🎯",
    title: "Revenue Concentration",
    text: `Top แผนกครองสัดส่วน ${(q*100).toFixed(1)}% · Top 2 รวม ${(t*100).toFixed(1)}% ของรายได้. ` + (t >= .7 ? `⚠ Concentration Risk สูง — 2 แผนกครอง ${(t*100).toFixed(0)}% · หากเกิด disruption จะกระทบรายได้รวมหนัก` : t >= .5 ? "Portfolio กระจุกปานกลาง — monitor และ diversify" : "Portfolio กระจายตัวดี — resilience สูง"),
    color: t >= .7 ? "#f59e0b" : "#10b981"
  });
  const o = [];
  l.length >= 3 && o.push(`🔴 ${l.length} แผนกหดตัว — systemic issue (ไม่ใช่เฉพาะแผนก) ควรทำ root cause analysis ระดับองค์กร`), i < -5 && o.push(`🔴 รายได้รวมหดตัว ${i}% — Revenue Recovery Program เร่งด่วน`);
  const c = S.find(a => a.growth <= -15);
  c && o.push(`🟠 ${c.label} หดตัวหนัก ${c.growth}% — investigation urgent ภายใน 14 วัน`), t >= .7 && o.push(`🟠 Concentration Risk — 2 แผนกครอง ${(t*100).toFixed(0)}% ของรายได้รวม`), h.length === 0 && o.push("🔴 ไม่มี Growth Driver — ทุกแผนก flat/decline · ต้อง strategic pivot"), o.length === 0 && o.push("✅ Portfolio สมดุล · ไม่มี red flag ที่มีนัยสำคัญ");
  const m = [];
  return S[0]?.growth <= -10 && m.push(`🔴 P0 · Turnaround Plan สำหรับ ${S[0].label} (${S[0].growth}%) — 30-60-90 day plan`), h.length > 0 && C[0].growth >= 15 && m.push(`🔵 P1 · Scale Best Practice ของ ${C[0].label} (+${C[0].growth}%) — ถอดบทเรียนและ apply ไปแผนกอื่น`), t >= .7 && m.push("🟠 P1 · Service Diversification — พัฒนา new service lines ลด concentration risk"), i < 0 && m.push("🔴 P0 · Budget Review Meeting — ปรับ cost structure ให้สอดคล้องกับรายได้ที่ลด"), i >= 10 && m.push("🔵 P1 · Capacity Planning — การเติบโตสูงอาจต้อง expand บุคลากร/infrastructure รองรับ"), k.length > 0 && k[0]?.sharLatest >= 40 && m.push("🟠 P1 · Payer Risk Management — top payer ครองสัดส่วนสูง · ทบทวน contract terms และ diversify"), m.push("🔵 P1 · สร้าง Department Performance Dashboard รายเดือน — Revenue · Visits · Growth · Rank"), m.push("🟡 P2 · Benchmarking แผนกที่เทียบขนาดกัน เพื่อ identify under-performance"), D.push({
    icon: "⚠️",
    title: "ความเสี่ยง / Red Flags",
    list: o,
    color: "#f59e0b"
  }), D.push({
    icon: "💡",
    title: "ข้อเสนอแนะเชิงกลยุทธ์ (P0–P2)",
    list: m,
    color: "#10b981"
  }), {
    headline: A,
    headlineColor: x,
    kpi: Y,
    sections: D,
    footerLeft: `${g.length} แผนก · ${P} vs ${T} · อัปเดต ${new Date().toLocaleString("th-TH")}`
  }
}
const F = [{
  id: "opd",
  label: "OPD ผู้ป่วยนอก",
  icon: "⏱️",
  endpoint: "/api/opd/revenue-fiscal",
  color: "#0284c7",
  unit: "revenue"
}, {
  id: "ipd",
  label: "IPD ผู้ป่วยใน",
  icon: "🏥",
  endpoint: "/api/ipd/revenue-fiscal",
  color: "#7c3aed",
  unit: "revenue"
}, {
  id: "er",
  label: "ER ฉุกเฉิน",
  icon: "🚑",
  endpoint: "/api/er/revenue-fiscal",
  color: "#dc2626",
  unit: "revenue"
}, {
  id: "dental",
  label: "ทันตกรรม",
  icon: "🦷",
  endpoint: "/api/dental/revenue-fiscal",
  color: "#f59e0b",
  unit: "revenue"
}, {
  id: "xray",
  label: "รังสีวิทยา",
  icon: "☢️",
  endpoint: "/api/xray/revenue-fiscal",
  color: "#06b6d4",
  unit: "orders"
}, {
  id: "pharmacy",
  label: "เภสัชกรรม",
  icon: "💊",
  endpoint: "/api/pharmacy/revenue-fiscal",
  color: "#10b981",
  unit: "revenue"
}, {
  id: "lab",
  label: "ห้องปฏิบัติการ",
  icon: "🔬",
  endpoint: "/api/lab/revenue-fiscal",
  color: "#0ea5e9",
  unit: "orders"
}, {
  id: "thaimed",
  label: "แพทย์แผนไทย",
  icon: "🌿",
  endpoint: "/api/thaimedicine/revenue-fiscal",
  color: "#65a30d",
  unit: "revenue"
}, {
  id: "phystherapy",
  label: "กายภาพบำบัด",
  icon: "🏋️",
  endpoint: "/api/physicaltherapy/revenue-fiscal",
  color: "#e11d48",
  unit: "revenue"
}, {
  id: "ncd",
  label: "NCD",
  icon: "🫀",
  endpoint: "/api/ncd/revenue-fiscal",
  color: "#0f766e",
  unit: "revenue"
}, {
  id: "quality",
  label: "คุณภาพ HA",
  icon: "⭐",
  endpoint: "/api/quality/revenue-fiscal",
  color: "#d97706",
  unit: "discharges"
}];

function ue() {
  const n = new Date,
    p = n.getMonth() + 1,
    y = n.getFullYear(),
    f = p >= 10 ? y : y - 1;
  return {
    start: `${f-2}-10-01`,
    end: `${f+1}-09-30`
  }
}
const X = {
    opd: ["#7dd3fc", "#0ea5e9", "#0264a7"],
    ipd: ["#c4b5fd", "#8b5cf6", "#6d28d9"],
    er: ["#fca5a5", "#ef4444", "#b91c1c"],
    dental: ["#fde68a", "#f59e0b", "#b45309"],
    xray: ["#a5f3fc", "#06b6d4", "#0e7490"],
    pharmacy: ["#6ee7b7", "#10b981", "#047857"],
    lab: ["#93c5fd", "#3b82f6", "#1d4ed8"],
    thaimed: ["#bef264", "#84cc16", "#4d7c0f"],
    phystherapy: ["#fda4af", "#f43f5e", "#be123c"],
    ncd: ["#5eead4", "#14b8a6", "#0f766e"],
    quality: ["#fdba74", "#f97316", "#c2410c"]
  },
  G = ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."],
  K = G.map((n, p) => (p + 10 - 1) % 12 + 1),
  xe = n => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `${(n/1e3).toFixed(0)}K` : n?.toLocaleString() ?? "—",
  E = n => n != null ? `฿${Number(n).toLocaleString()}` : "—";

function B(n) {
  const p = n.fiscal_label || n.fiscalLabel || "";
  if (p.startsWith("ปีงบ")) return p;
  const y = p.match(/FY\s*(\d{4})/i);
  return y ? `ปีงบ ${parseInt(y[1])+543}` : n.fiscal_year_be ? `ปีงบ ${n.fiscal_year_be}` : n.fiscal_year ? `ปีงบ ${n.fiscal_year+543}` : p || "—"
}
const U = {};
G.forEach((n, p) => {
  U[n] = (p + 10 - 1) % 12 + 1
});

function V(n) {
  const p = new Map;
  for (const y of n || []) {
    const f = y.month_num ?? U[y.month];
    f != null && p.set(f, y)
  }
  return p
}
const Q = O.memo(({
  current: n,
  previous: p
}) => {
  if (n == null || p == null || p === 0) return null;
  const y = Math.round((n - p) / p * 100),
    f = y >= 0 ? "#10b981" : "#ef4444";
  return e.jsxs("span", {
    style: {
      fontSize: "11px",
      fontWeight: 800,
      color: f,
      background: `${f}15`,
      padding: "2px 6px",
      borderRadius: "99px",
      marginLeft: "6px"
    },
    children: [y >= 0 ? "↑" : "↓", " ", y >= 0 ? "+" : "", y, "%"]
  })
});

function J(n) {
  if (!n) return !0;
  const p = new Date,
    y = new Date(n + "T23:59:59");
  return p <= y
}
const me = O.memo(({
    dept: n,
    data: p,
    loading: y,
    appliedEnd: f
  }) => {
    const j = p?.fiscal_years || [];
    if (y) return e.jsxs("div", {
      className: "rounded-2xl p-4 animate-pulse",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [e.jsx("div", {
        className: "h-4 w-24 rounded mb-3",
        style: {
          background: "var(--md-border)"
        }
      }), e.jsx("div", {
        className: "h-8 w-32 rounded mb-2",
        style: {
          background: "var(--md-border)"
        }
      }), e.jsx("div", {
        className: "h-24 rounded",
        style: {
          background: "var(--md-border)"
        }
      })]
    });
    if (!j.length) return null;
    const g = j[j.length - 1],
      R = n.unit === "revenue",
      L = R ? "รายได้" : n.unit === "orders" ? "จำนวน Order" : "จำนวน Discharge",
      h = g?.comparable_months || 0,
      l = (g?.months || []).filter(s => s.has_data).map(s => s.month),
      N = h > 0 ? `เปรียบเทียบช่วง ${l[0]||""}–${l[l.length-1]||""} (${h} เดือน)` : "",
      i = j.map(s => V(s.months)),
      $ = J(f) ? new Date().getMonth() + 1 : -1,
      T = G.map((s, d) => {
        const _ = K[d],
          k = {
            month: s,
            _monthNum: _
          };
        return i.forEach((w, A) => {
          const x = w.get(_);
          k[`fy${A}`] = x?.revenue || x?.total || 0
        }), k
      }).filter(s => s._monthNum === $ ? !1 : j.some((d, _) => s[`fy${_}`] > 0));
    return e.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)"
      },
      children: [e.jsxs("div", {
        className: "p-4 pb-3",
        style: {
          borderLeft: `4px solid ${n.color}`
        },
        children: [e.jsxs("div", {
          className: "flex items-center justify-between mb-1",
          children: [e.jsxs("h3", {
            className: "text-sm font-black flex items-center gap-2",
            style: {
              color: "var(--md-text-primary)"
            },
            children: [e.jsx("span", {
              children: n.icon
            }), " ", n.label]
          }), e.jsxs("div", {
            className: "flex items-center gap-2",
            children: [N && e.jsxs("span", {
              className: "text-[8px] font-bold px-2 py-0.5 rounded-full",
              style: {
                background: "rgba(245,158,11,.1)",
                color: "#f59e0b"
              },
              children: ["📅 ", N]
            }), e.jsx("span", {
              className: "text-[9px] font-bold px-2 py-0.5 rounded-full",
              style: {
                background: `${n.color}15`,
                color: n.color
              },
              children: L
            })]
          })]
        }), e.jsx("div", {
          className: "flex gap-3 mt-2",
          children: j.map((s, d) => {
            const _ = d === j.length - 1,
              k = s.comparable_revenue ?? s.total_revenue ?? 0,
              w = d > 0 ? j[d - 1].comparable_revenue ?? j[d - 1].total_revenue ?? 0 : null,
              A = X[n.id] || [n.color],
              x = A[d] || A[A.length - 1];
            return e.jsxs("div", {
              className: "flex-1 rounded-xl p-2.5",
              style: {
                background: `${x}10`,
                border: `1px solid ${x}${_?"40":"20"}`,
                borderTop: `3px solid ${x}`
              },
              children: [e.jsxs("div", {
                className: "text-[9px] font-bold uppercase tracking-wider mb-1",
                style: {
                  color: x
                },
                children: [B(s), _ && e.jsx("span", {
                  style: {
                    marginLeft: "4px"
                  },
                  children: "● ปัจจุบัน"
                })]
              }), e.jsxs("div", {
                className: "flex items-baseline gap-1",
                children: [e.jsx("span", {
                  className: "text-base font-black",
                  style: {
                    color: x
                  },
                  children: R ? E(k) : k?.toLocaleString() ?? "—"
                }), e.jsx(Q, {
                  current: k,
                  previous: w
                })]
              }), e.jsxs("div", {
                className: "text-[8px] font-medium mt-0.5",
                style: {
                  color: "var(--md-text-tertiary)"
                },
                children: [(s.total_visits ?? s.total_cases ?? 0).toLocaleString(), " visits", s.comparable_months ? ` · ${s.comparable_months} เดือน` : ""]
              }), s.total_revenue != null && s.comparable_revenue != null && s.total_revenue !== s.comparable_revenue && e.jsxs("div", {
                className: "text-[8px] font-medium",
                style: {
                  color: "var(--md-text-tertiary)",
                  opacity: .7
                },
                children: ["ทั้งปี: ", R ? E(s.total_revenue) : s.total_revenue?.toLocaleString()]
              })]
            }, d)
          })
        })]
      }), e.jsx("div", {
        className: "px-3 pb-3",
        children: e.jsx(ne, {
          width: "100%",
          height: 180,
          children: e.jsxs(oe, {
            data: T,
            margin: {
              top: 5,
              right: 5,
              left: -15,
              bottom: 0
            },
            children: [e.jsx(se, {
              strokeDasharray: "3 3",
              stroke: "var(--md-border)"
            }), e.jsx(le, {
              dataKey: "month",
              tick: {
                fontSize: 9,
                fill: "var(--md-text-tertiary)"
              }
            }), e.jsx(ie, {
              tick: {
                fontSize: 9,
                fill: "var(--md-text-tertiary)"
              },
              tickFormatter: xe
            }), e.jsx(ce, {
              contentStyle: {
                background: "var(--md-surface)",
                border: "1px solid var(--md-border)",
                borderRadius: "12px",
                fontSize: "12px"
              },
              formatter: (s, d) => [R ? E(s) : s?.toLocaleString(), d]
            }), j.map((s, d) => {
              const _ = B(s),
                k = X[n.id] || [n.color + "50", n.color + "90", n.color],
                w = k[d] || k[k.length - 1];
              return e.jsx(de, {
                dataKey: `fy${d}`,
                name: _,
                fill: w,
                radius: [2, 2, 0, 0]
              }, d)
            }), e.jsx(pe, {
              verticalAlign: "bottom",
              height: 24,
              iconType: "square",
              iconSize: 8,
              wrapperStyle: {
                fontSize: "10px",
                fontWeight: 700,
                paddingTop: "4px"
              }
            })]
          })
        })
      })]
    })
  }),
  fe = O.memo(({
    dept: n,
    data: p,
    appliedEnd: y
  }) => {
    const f = p?.fiscal_years || [];
    if (!f.length) return null;
    const j = n.unit === "revenue",
      g = f.map(h => V(h.months));
    f[f.length - 1]?.comparable_months;
    const R = J(y) ? new Date().getMonth() + 1 : -1,
      L = G.map((h, l) => {
        const N = K[l],
          i = g.some($ => {
            const P = $.get(N);
            return (P?.revenue || P?.total || 0) > 0
          });
        return {
          m: h,
          i: l,
          monthNum: N,
          show: i && N !== R
        }
      }).filter(h => h.show);
    return e.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [e.jsx("div", {
        className: "p-3",
        style: {
          borderLeft: `4px solid ${n.color}`
        },
        children: e.jsxs("h4", {
          className: "text-xs font-black flex items-center gap-2",
          style: {
            color: "var(--md-text-primary)"
          },
          children: [n.icon, " ", n.label, " — รายเดือน"]
        })
      }), e.jsx("div", {
        style: {
          overflowX: "auto"
        },
        children: e.jsxs("table", {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px"
          },
          children: [e.jsx("thead", {
            children: e.jsxs("tr", {
              style: {
                background: "var(--md-surface-2, #f8fafc)"
              },
              children: [e.jsx("th", {
                style: {
                  padding: "6px 10px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: "เดือน"
              }), f.map((h, l) => e.jsx("th", {
                style: {
                  padding: "6px 10px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: l === f.length - 1 ? n.color : "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: B(h)
              }, l)), e.jsx("th", {
                style: {
                  padding: "6px 10px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "#10b981",
                  fontSize: "11px"
                },
                children: "YoY %"
              })]
            })
          }), e.jsxs("tbody", {
            children: [L.map(({
              m: h,
              i: l,
              monthNum: N
            }) => {
              const i = g.map(s => {
                  const d = s.get(N);
                  return d?.revenue || d?.total || 0
                }),
                $ = i[i.length - 1],
                P = i.length >= 2 ? i[i.length - 2] : 0,
                T = P > 0 ? Math.round(($ - P) / P * 100) : null;
              return e.jsxs("tr", {
                style: {
                  borderBottom: "1px solid var(--md-border)"
                },
                children: [e.jsx("td", {
                  style: {
                    padding: "5px 10px",
                    fontWeight: 600,
                    color: "var(--md-text-secondary)"
                  },
                  children: h
                }), i.map((s, d) => e.jsx("td", {
                  style: {
                    padding: "5px 10px",
                    textAlign: "right",
                    fontWeight: d === i.length - 1 ? 700 : 400,
                    color: d === i.length - 1 ? "var(--md-text-primary)" : "var(--md-text-tertiary)"
                  },
                  children: s > 0 ? j ? E(s) : s.toLocaleString() : "—"
                }, d)), e.jsx("td", {
                  style: {
                    padding: "5px 10px",
                    textAlign: "right",
                    fontWeight: 700,
                    color: T == null ? "var(--md-text-tertiary)" : T >= 0 ? "#10b981" : "#ef4444"
                  },
                  children: T != null ? `${T>=0?"+":""}${T}%` : "—"
                })]
              }, l)
            }), e.jsxs("tr", {
              style: {
                background: "var(--md-surface-2, #f8fafc)",
                fontWeight: 800
              },
              children: [e.jsx("td", {
                style: {
                  padding: "8px 10px",
                  color: "var(--md-text-primary)"
                },
                children: "รวมทั้งปี"
              }), f.map((h, l) => {
                const N = h.comparable_revenue ?? h.total_revenue ?? 0;
                return e.jsx("td", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "right",
                    color: l === f.length - 1 ? n.color : "var(--md-text-primary)"
                  },
                  children: j ? E(N) : N.toLocaleString()
                }, l)
              }), e.jsx("td", {
                style: {
                  padding: "8px 10px",
                  textAlign: "right"
                },
                children: (() => {
                  const h = f[f.length - 1],
                    l = f.length >= 2 ? f[f.length - 2] : null,
                    N = h?.comparable_revenue ?? h?.total_revenue ?? 0,
                    i = l?.comparable_revenue ?? l?.total_revenue ?? 0,
                    $ = i > 0 ? Math.round((N - i) / i * 100) : null;
                  return $ != null ? e.jsxs("span", {
                    style: {
                      color: $ >= 0 ? "#10b981" : "#ef4444",
                      fontWeight: 800
                    },
                    children: [$ >= 0 ? "+" : "", $, "%"]
                  }) : "—"
                })()
              })]
            })]
          })]
        })
      })]
    })
  });

function ge() {
  const {
    fetchData: n
  } = te(), [p, y] = M.useState({}), [f, j] = M.useState({}), [g, R] = M.useState("cards"), [L, h] = M.useState(F.map(t => t.id)), [l, N] = M.useState(null), [i, $] = M.useState(!1), [P, T] = M.useState(null), s = M.useRef(null), d = M.useMemo(() => ue(), []), [_, k] = M.useState(d.start), [w, A] = M.useState(d.end), [x, C] = M.useState({
    start: d.start,
    end: d.end
  }), S = x.start !== d.start || x.end !== d.end, Y = M.useCallback(t => {
    const o = t.includes("?") ? "&" : "?";
    return `${t}${o}start=${x.start}&end=${x.end}`
  }, [x]);
  M.useEffect(() => {
    s.current && s.current.abort();
    const t = new AbortController;
    s.current = t;
    const o = t.signal,
      c = {};
    F.forEach(r => {
      c[r.id] = !0
    }), j(c), $(!0);
    const m = async r => {
      try {
        const v = Y(r.endpoint),
          u = await fetch(v, {
            credentials: "include",
            signal: o
          });
        if (u.ok) {
          const b = await u.json();
          !o.aborted && b?.fiscal_years?.length > 0 && y(W => ({
            ...W,
            [r.id]: b
          }))
        }
      } catch (v) {
        if (v.name === "AbortError") return
      }
      o.aborted || j(v => ({
        ...v,
        [r.id]: !1
      }))
    }, a = async () => {
      try {
        const r = await fetch(Y("/api/finance/revenue-by-payer-fiscal"), {
          credentials: "include",
          signal: o
        });
        if (r.ok) {
          const v = await r.json();
          !o.aborted && v && N(v)
        }
      } catch (r) {
        if (r.name === "AbortError") return
      }
      o.aborted || $(!1)
    };
    return F.forEach(r => m(r)), a(), () => t.abort()
  }, [x, Y]), M.useEffect(() => {
    const t = setTimeout(() => {
      fetch("/api/ai/compare/trend-analysis", {
        credentials: "include"
      }).then(o => o.json()).then(T).catch(() => {})
    }, 300);
    return () => clearTimeout(t)
  }, []);
  const D = M.useMemo(() => {
      const t = {
          fyLabels: [],
          totalByFY: [],
          visitsByFY: []
        },
        o = {};
      for (const c of F) {
        const m = p[c.id]?.fiscal_years;
        if (m)
          for (const a of m) {
            if (c.unit !== "revenue") continue;
            const r = B(a);
            o[r] || (o[r] = {
              revenue: 0,
              visits: 0
            }), o[r].revenue += a.comparable_revenue ?? a.total_revenue ?? 0, o[r].visits += a.total_visits ?? a.total_cases ?? 0
          }
      }
      return t.fyLabels = Object.keys(o), t.totalByFY = Object.values(o).map(c => c.revenue), t.visitsByFY = Object.values(o).map(c => c.visits), t
    }, [p]),
    q = M.useCallback(t => {
      h(o => o.includes(t) ? o.filter(c => c !== t) : [...o, t])
    }, []);
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
          background: "linear-gradient(180deg, #0f766e, #0284c7)",
          borderRadius: "99px"
        }
      }), e.jsx("h2", {
        style: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "📊 เปรียบเทียบข้อมูลปีงบประมาณ"
      }), e.jsxs("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(15,118,110,.1)",
          color: "#0f766e"
        },
        children: [F.length, " แผนก · ปีงบไทย ต.ค.–ก.ย."]
      }), S && e.jsx("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(139,92,246,.1)",
          color: "#7c3aed"
        },
        children: "กำหนดเอง"
      }), e.jsx("div", {
        style: {
          marginLeft: "auto",
          display: "flex",
          gap: "4px"
        },
        children: [{
          id: "cards",
          label: "📊 Cards"
        }, {
          id: "table",
          label: "📋 Table"
        }].map(t => e.jsx("button", {
          onClick: () => R(t.id),
          style: {
            padding: "5px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            background: g === t.id ? "var(--md-primary)" : "var(--md-surface-2, #f1f5f9)",
            color: g === t.id ? "#fff" : "var(--md-text-secondary)"
          },
          children: t.label
        }, t.id))
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
        children: "📅 ช่วงข้อมูล"
      }), e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px"
        },
        children: [e.jsx("label", {
          style: {
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)"
          },
          children: "เริ่มต้น"
        }), e.jsx("input", {
          type: "date",
          value: _,
          onChange: t => k(t.target.value),
          style: {
            padding: "5px 10px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 600,
            background: "var(--md-surface-2, #f8fafc)",
            color: "var(--md-text-primary)",
            outline: "none"
          }
        })]
      }), e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px"
        },
        children: [e.jsx("label", {
          style: {
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)"
          },
          children: "สิ้นสุด"
        }), e.jsx("input", {
          type: "date",
          value: w,
          onChange: t => A(t.target.value),
          style: {
            padding: "5px 10px",
            borderRadius: "8px",
            border: "1px solid var(--md-border)",
            fontSize: "12px",
            fontWeight: 600,
            background: "var(--md-surface-2, #f8fafc)",
            color: "var(--md-text-primary)",
            outline: "none"
          }
        })]
      }), e.jsx("button", {
        onClick: () => {
          _ && w && _ <= w && C({
            start: _,
            end: w
          })
        },
        disabled: !_ || !w || _ > w,
        style: {
          padding: "6px 16px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s",
          background: "linear-gradient(135deg, #0f766e, #0284c7)",
          color: "#fff",
          opacity: !_ || !w || _ > w ? .5 : 1
        },
        children: "โหลดข้อมูล"
      }), S && e.jsx("button", {
        onClick: () => {
          k(d.start), A(d.end), C({
            start: d.start,
            end: d.end
          })
        },
        style: {
          padding: "6px 12px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)",
          cursor: "pointer"
        },
        children: "รีเซ็ต (3 ปีงบ)"
      }), e.jsx("span", {
        style: {
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600
        },
        children: S ? `${new Date(x.start).toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"})} — ${new Date(x.end).toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"})}` : "ค่าเริ่มต้น: 3 ปีงบประมาณ ต.ค.–ก.ย."
      })]
    }), D.fyLabels.length > 0 && e.jsxs("div", {
      className: "rounded-2xl p-5",
      style: {
        background: "linear-gradient(135deg, rgba(15,118,110,.06), rgba(2,132,199,.04))",
        border: "1px solid var(--md-border)"
      },
      children: [e.jsxs("div", {
        className: "flex items-center justify-between mb-3 flex-wrap gap-2",
        children: [e.jsx("h3", {
          className: "text-xs font-black uppercase tracking-wider",
          style: {
            color: "var(--md-text-secondary)"
          },
          children: "🏥 รายได้รวมทุกแผนก (Comparable Period — เปรียบเทียบช่วงเดียวกันทุกปี)"
        }), e.jsxs("span", {
          className: "text-[9px] font-bold px-2 py-1 rounded-lg",
          style: {
            background: "rgba(245,158,11,.08)",
            color: "#d97706",
            border: "1px solid rgba(245,158,11,.2)"
          },
          children: ["⚠️ นับถึง ", new Date().toLocaleDateString("th-TH", {
            day: "numeric",
            month: "short"
          }), " — เปรียบเทียบเฉพาะเดือนที่มีข้อมูลครบทุกปี"]
        })]
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${D.fyLabels.length}, 1fr)`,
          gap: "12px"
        },
        children: D.fyLabels.map((t, o) => {
          const c = o === D.fyLabels.length - 1,
            m = o > 0 ? D.totalByFY[o - 1] : null;
          return e.jsxs("div", {
            className: "rounded-xl p-4",
            style: {
              background: c ? "rgba(15,118,110,.08)" : "var(--md-surface)",
              border: c ? "2px solid rgba(15,118,110,.3)" : "1px solid var(--md-border)"
            },
            children: [e.jsxs("div", {
              className: "text-[10px] font-bold uppercase tracking-wider mb-2",
              style: {
                color: c ? "#0f766e" : "var(--md-text-tertiary)"
              },
              children: [t, " ", c && "● ปัจจุบัน"]
            }), e.jsxs("div", {
              className: "flex items-baseline gap-2",
              children: [e.jsxs("span", {
                className: "text-xl font-black",
                style: {
                  color: c ? "#0f766e" : "var(--md-text-primary)"
                },
                children: ["฿", (D.totalByFY[o] / 1e6).toFixed(1), "M"]
              }), e.jsx(Q, {
                current: D.totalByFY[o],
                previous: m
              })]
            }), e.jsxs("div", {
              className: "text-[10px] font-medium mt-1",
              style: {
                color: "var(--md-text-tertiary)"
              },
              children: [D.visitsByFY[o]?.toLocaleString() || "—", " visits"]
            })]
          }, o)
        })
      })]
    }), e.jsxs("div", {
      className: "flex flex-wrap gap-1.5",
      children: [e.jsx("button", {
        onClick: () => h(L.length === F.length ? [] : F.map(t => t.id)),
        style: {
          padding: "4px 10px",
          borderRadius: "99px",
          fontSize: "11px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          background: L.length === F.length ? "var(--md-primary)" : "var(--md-surface)",
          color: L.length === F.length ? "#fff" : "var(--md-text-secondary)",
          cursor: "pointer"
        },
        children: L.length === F.length ? "✓ ทั้งหมด" : "เลือกทั้งหมด"
      }), F.map(t => e.jsxs("button", {
        onClick: () => q(t.id),
        style: {
          padding: "4px 10px",
          borderRadius: "99px",
          fontSize: "11px",
          fontWeight: 700,
          border: `1px solid ${L.includes(t.id)?t.color+"50":"var(--md-border)"}`,
          background: L.includes(t.id) ? `${t.color}12` : "var(--md-surface)",
          color: L.includes(t.id) ? t.color : "var(--md-text-tertiary)",
          cursor: "pointer",
          transition: "all 0.2s"
        },
        children: [t.icon, " ", t.label]
      }, t.id))]
    }), g === "cards" ? e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
        gap: "16px"
      },
      children: F.filter(t => L.includes(t.id)).map(t => e.jsx(me, {
        dept: t,
        data: p[t.id],
        loading: f[t.id],
        appliedEnd: x.end
      }, t.id))
    }) : e.jsx("div", {
      className: "space-y-4",
      children: F.filter(t => L.includes(t.id)).map(t => e.jsx(fe, {
        dept: t,
        data: p[t.id],
        appliedEnd: x.end
      }, t.id))
    }), e.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-sm)"
      },
      children: [e.jsx("div", {
        className: "p-4 pb-3",
        style: {
          borderLeft: "4px solid #8b5cf6"
        },
        children: e.jsxs("div", {
          className: "flex items-center justify-between flex-wrap gap-2",
          children: [e.jsxs("h3", {
            className: "text-sm font-black flex items-center gap-2",
            style: {
              color: "var(--md-text-primary)"
            },
            children: ["💳 รายได้แยกตามสิทธิ์ — ", S ? `${new Date(x.start).toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"})} – ${new Date(x.end).toLocaleDateString("th-TH",{day:"numeric",month:"short",year:"2-digit"})}` : "เปรียบเทียบปีงบประมาณ"]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              gap: "6px",
              alignItems: "center"
            },
            children: [l?.comparable_months > 0 && e.jsxs("span", {
              className: "text-[9px] font-bold px-2 py-0.5 rounded-full",
              style: {
                background: "rgba(245,158,11,.1)",
                color: "#f59e0b"
              },
              children: ["📅 Comparable ", l.comparable_months, " เดือน"]
            }), S && e.jsxs("span", {
              className: "text-[9px] font-bold px-2 py-0.5 rounded-full",
              style: {
                background: "rgba(245,158,11,.1)",
                color: "#d97706"
              },
              children: ["📅 ", new Date(x.start).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "short"
              }), " — ", new Date(x.end).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "short"
              }), " ทุกปี"]
            }), e.jsx("span", {
              className: "text-[9px] font-bold px-2 py-0.5 rounded-full",
              style: {
                background: "rgba(139,92,246,.1)",
                color: "#8b5cf6"
              },
              children: "Top 15 สิทธิ์ · Comparable Period"
            })]
          })]
        })
      }), i && e.jsxs("div", {
        className: "p-6 animate-pulse",
        children: [e.jsx("div", {
          className: "h-6 w-48 rounded mb-3",
          style: {
            background: "var(--md-border)"
          }
        }), [1, 2, 3, 4, 5].map(t => e.jsx("div", {
          className: "h-12 rounded mb-2",
          style: {
            background: "var(--md-border)"
          }
        }, t))]
      }), !i && l?.fiscal_years?.length > 0 && e.jsx("div", {
        style: {
          overflowX: "auto"
        },
        children: e.jsxs("table", {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px"
          },
          children: [e.jsx("thead", {
            children: e.jsxs("tr", {
              style: {
                background: "var(--md-surface-2, #f8fafc)"
              },
              children: [e.jsx("th", {
                style: {
                  padding: "8px 12px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px",
                  minWidth: "180px"
                },
                children: "สิทธิ์การรักษา"
              }), l.fiscal_years.map((t, o) => {
                const c = o === l.fiscal_years.length - 1,
                  m = t.query_start && t.query_end && S ? `${new Date(t.query_start).toLocaleDateString("th-TH",{day:"numeric",month:"short"})}–${new Date(t.query_end).toLocaleDateString("th-TH",{day:"numeric",month:"short"})}` : null;
                return e.jsxs("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "right",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: c ? "#8b5cf6" : "var(--md-text-tertiary)"
                  },
                  children: [e.jsxs("div", {
                    children: [B(t), c && e.jsx("span", {
                      style: {
                        color: "#8b5cf6",
                        marginLeft: "4px"
                      },
                      children: "●"
                    })]
                  }), m && e.jsx("div", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      opacity: .7
                    },
                    children: m
                  }), t.comparable_months && t.comparable_months < 12 && e.jsxs("div", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 600,
                      opacity: .6
                    },
                    children: ["(", t.comparable_months, " เดือน)"]
                  })]
                }, o)
              }), e.jsx("th", {
                style: {
                  padding: "8px 10px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "#10b981",
                  fontSize: "11px"
                },
                children: "YoY %"
              })]
            })
          }), e.jsxs("tbody", {
            children: [(l.top_payers || []).map((t, o) => {
              const c = l.fiscal_years.map(v => {
                  const u = (v.payers || []).find(b => (b.payer_code || b.payer) === (t.payer_code || t.payer));
                  return u?.comparable_revenue ?? u?.total_revenue ?? 0
                }),
                m = c[c.length - 1],
                a = c.length >= 2 ? c[c.length - 2] : 0,
                r = a > 0 ? Math.round((m - a) / a * 100) : null;
              return e.jsxs("tr", {
                style: {
                  borderBottom: "1px solid var(--md-border)"
                },
                children: [e.jsxs("td", {
                  style: {
                    padding: "6px 12px",
                    fontWeight: 600,
                    color: "var(--md-text-primary)",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: [e.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 800,
                      color: "#8b5cf6",
                      background: "rgba(139,92,246,.08)",
                      padding: "1px 4px",
                      borderRadius: "3px",
                      marginRight: "4px"
                    },
                    children: t.payer_code || "#"
                  }), t.payer]
                }), c.map((v, u) => e.jsx("td", {
                  style: {
                    padding: "6px 10px",
                    textAlign: "right",
                    fontWeight: u === c.length - 1 ? 700 : 400,
                    color: u === c.length - 1 ? "var(--md-text-primary)" : "var(--md-text-tertiary)"
                  },
                  children: v > 0 ? E(v) : "—"
                }, u)), e.jsx("td", {
                  style: {
                    padding: "6px 10px",
                    textAlign: "right",
                    fontWeight: 700,
                    color: r == null ? "var(--md-text-tertiary)" : r >= 0 ? "#10b981" : "#ef4444"
                  },
                  children: r != null ? `${r>=0?"+":""}${r}%` : "—"
                })]
              }, o)
            }), e.jsxs("tr", {
              style: {
                background: "var(--md-surface-2, #f8fafc)",
                fontWeight: 800
              },
              children: [e.jsx("td", {
                style: {
                  padding: "10px 12px",
                  color: "var(--md-text-primary)"
                },
                children: "รวมทั้งหมด"
              }), l.fiscal_years.map((t, o) => {
                const c = (t.payers || []).reduce((m, a) => m + (a.comparable_revenue ?? a.total_revenue ?? 0), 0);
                return e.jsx("td", {
                  style: {
                    padding: "10px 10px",
                    textAlign: "right",
                    color: o === l.fiscal_years.length - 1 ? "#8b5cf6" : "var(--md-text-primary)"
                  },
                  children: E(c)
                }, o)
              }), e.jsx("td", {
                style: {
                  padding: "10px 10px",
                  textAlign: "right"
                },
                children: (() => {
                  const t = l.fiscal_years.map(a => (a.payers || []).reduce((r, v) => r + (v.comparable_revenue ?? v.total_revenue ?? 0), 0)),
                    o = t[t.length - 1],
                    c = t.length >= 2 ? t[t.length - 2] : 0,
                    m = c > 0 ? Math.round((o - c) / c * 100) : null;
                  return m != null ? e.jsxs("span", {
                    style: {
                      color: m >= 0 ? "#10b981" : "#ef4444"
                    },
                    children: [m >= 0 ? "+" : "", m, "%"]
                  }) : "—"
                })()
              })]
            })]
          })]
        })
      }), !i && !l && e.jsx("div", {
        className: "p-8 text-center",
        style: {
          color: "var(--md-text-tertiary)",
          fontSize: "12px"
        },
        children: "กำลังโหลดข้อมูลสิทธิ์..."
      })]
    }), e.jsx(re, {
      data: P,
      theme: "default",
      title: "AI Trend Analysis"
    }), e.jsx(ae, {
      title: "AI วิเคราะห์เชิงคุณภาพ — เปรียบเทียบปีงบ (สำหรับผู้บริหาร)",
      subtitle: "Cross-Department Growth · Winners / Losers · Payer Mix · Concentration · Risks · Recommendations",
      badge: "📐 Rule-based · 8 dimensions",
      accentColor: "#0284c7",
      headerGradient: "linear-gradient(135deg, rgba(2,132,199,.10), rgba(124,58,237,.06))",
      narrative: he({
        deptData: p,
        payerData: l,
        depts: F
      })
    }), e.jsxs("div", {
      className: "text-center",
      style: {
        fontSize: "11px",
        color: "var(--md-text-tertiary)",
        padding: "12px 0"
      },
      children: ["📊 BCH 360° Intelligence · ปีงบประมาณไทย (ต.ค.–ก.ย.) · HOSxP XE · ", S ? "ช่วงกำหนดเอง" : "3 ปีงบ", " · Comparable months"]
    })]
  })
}
const je = O.memo(ge);
export {
  je as
  default
};