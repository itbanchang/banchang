import {
  R as se,
  r as a,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  u as le
} from "./index-DK7pcb85.js";
import "./shared-ui-OVDEF1.js";
const ae = {
    report: {
      icon: "📋",
      label: "Report Online"
    },
    compare: {
      icon: "📊",
      label: "เปรียบเทียบปีงบ"
    },
    finance: {
      icon: "💰",
      label: "ศูนย์จัดเก็บรายได้"
    },
    opd: {
      icon: "⏱️",
      label: "OPD ผู้ป่วยนอก"
    },
    ipd: {
      icon: "🏥",
      label: "IPD ผู้ป่วยใน"
    },
    er: {
      icon: "🚑",
      label: "ห้องฉุกเฉิน"
    },
    dental: {
      icon: "🦷",
      label: "ทันตกรรม"
    },
    xray: {
      icon: "☢️",
      label: "รังสีวิทยา"
    },
    pharmacy: {
      icon: "💊",
      label: "เภสัชกรรม"
    },
    lab: {
      icon: "🔬",
      label: "ห้องปฏิบัติการ"
    },
    thaimed: {
      icon: "🌿",
      label: "แพทย์แผนไทย"
    },
    phystherapy: {
      icon: "🏋️",
      label: "กายภาพบำบัด"
    },
    ncd: {
      icon: "🫀",
      label: "NCD"
    },
    medrec: {
      icon: "📇",
      label: "Coder Quality"
    },
    quality: {
      icon: "⭐",
      label: "คุณภาพ HA"
    },
    "customer-insight": {
      icon: "🎯",
      label: "Customer Insight"
    },
    "doctor-activity": {
      icon: "👨‍⚕️",
      label: "ผลผลิตแพทย์ + ทันตกรรม"
    }
  },
  h = {
    collection_good: 90,
    full_denial_warn: 3,
    occupancy_warn: 85,
    occupancy_crit: 95,
    alos_warn: 6,
    trend_warn_drop: -5
  };

function B(r) {
  return ae[r] || {
    icon: "📰",
    label: "Dashboard"
  }
}

function g(r) {
  if (r == null || isNaN(r)) return "—";
  const t = Number(r);
  return t >= 1e9 ? `฿${(t/1e9).toFixed(1)}B` : t >= 1e6 ? `฿${(t/1e6).toFixed(1)}M` : t >= 1e3 ? `฿${(t/1e3).toFixed(0)}K` : `฿${Math.round(t).toLocaleString()}`
}

function x(r) {
  return r == null || isNaN(r) ? "—" : Number(r).toLocaleString("th-TH")
}

function M(r, t = 0) {
  return r == null || isNaN(r) ? "—" : `${Number(r).toFixed(t)}%`
}

function C(r) {
  if (r == null || isNaN(r)) return "";
  const t = Number(r);
  return t === 0 ? " ■0%" : ` ${t>0?"▲":"▼"}${Math.abs(t)}%`
}

function f(r) {
  return r == null ? "neutral" : r <= h.trend_warn_drop ? "warn" : r > 0 ? "good" : "neutral"
}

function R(r, t, i) {
  return (r?.[t] || []).find(n => n.id === i)?.count || 0
}

function F(r) {
  if (!r) return [];
  const t = [],
    i = R(r, "doctor", "sepsis_alert"),
    s = R(r, "doctor", "deterioration_alert"),
    n = R(r, "doctor", "critical_labs"),
    u = R(r, "nurse", "fall_risk");
  return i > 0 && t.push({
    icon: "🔴",
    label: "Sepsis Risk",
    value: `${i} ราย`,
    tone: "crit"
  }), s > 0 && t.push({
    icon: "⚠️",
    label: "Deteriorating",
    value: `${s} ราย`,
    tone: "warn"
  }), n > 0 && t.push({
    icon: "🧪",
    label: "Critical Labs",
    value: `${n} รายการ`,
    tone: "warn"
  }), u > 0 && t.push({
    icon: "🦯",
    label: "Fall Risk",
    value: `${u} ราย`,
    tone: "warn"
  }), t
}

function c(r, t, i, s = "neutral") {
  return {
    icon: r,
    label: t,
    value: i,
    tone: s
  }
}

function ce(r) {
  const t = r?.finance || {},
    i = t.full_denial_rate != null ? t.full_denial_rate : t.denial_rate,
    s = t.revenue_month_projected != null && t.revenue_month_projected !== t.revenue_this_month ? `${g(t.revenue_month_projected)} (projected)` : g(t.revenue_this_month);
  return {
    bullets: [{
      icon: "💰",
      label: "รายได้สะสม (YTD)",
      value: g(t.total_revenue),
      tone: "good"
    }, {
      icon: "📈",
      label: "เดือนนี้",
      value: s + C(t.trend_revenue),
      tone: f(t.trend_revenue)
    }, {
      icon: "✅",
      label: "Collection Rate",
      value: M(t.collection_rate, 1),
      tone: t.collection_rate >= h.collection_good ? "good" : "warn"
    }, {
      icon: "⚠️",
      label: "Full Denial",
      value: M(i, 1),
      tone: i > h.full_denial_warn ? "warn" : "good"
    }, {
      icon: "💳",
      label: "ยอดค้างชำระ",
      value: g(t.debtors_outstanding),
      tone: "warn"
    }]
  }
}

function de(r) {
  const t = r?.opd || {},
    i = r?.staff || {};
  return {
    bullets: [{
      icon: "🧑‍⚕️",
      label: "ผู้ป่วย OPD วันนี้",
      value: `${x(t.today_visits)} ราย${C(t.trend_visits)}`,
      tone: f(t.trend_visits)
    }, {
      icon: "👨‍⚕️",
      label: "แพทย์ออกตรวจ",
      value: `${x(i.doctors_today)} คน`,
      tone: "neutral"
    }]
  }
}

function xe(r) {
  const t = r?.ipd || {},
    i = r?.beds || {},
    s = i.occupancy_rate >= h.occupancy_crit ? "crit" : i.occupancy_rate >= h.occupancy_warn ? "warn" : "good";
  return {
    bullets: [{
      icon: "🛌",
      label: "Admit คงค้าง",
      value: `${x(t.active_admissions)} ราย${C(t.trend_admissions)}`,
      tone: f(t.trend_admissions)
    }, {
      icon: "🛏️",
      label: "อัตราครองเตียง",
      value: M(i.occupancy_rate, 1),
      tone: s
    }, {
      icon: "📊",
      label: "เตียงว่าง",
      value: `${x(i.available)}/${x(i.total)}`,
      tone: "neutral"
    }, {
      icon: "⏱️",
      label: "ALOS 30 วัน",
      value: t.alos != null ? `${t.alos} วัน` : "—",
      tone: t.alos > h.alos_warn ? "warn" : "neutral"
    }]
  }
}

function ue(r, t) {
  const i = r?.er || {},
    s = t?.summary?.critical_count || r?.clinical?.critical_patients || 0,
    n = r?.clinical?.high_risk_patients || 0;
  return {
    bullets: [{
      icon: "🚑",
      label: "ER วันนี้",
      value: `${x(i.today_visits)} ราย${C(i.trend_visits)}`,
      tone: f(i.trend_visits)
    }, {
      icon: "🔴",
      label: "Critical",
      value: `${x(s)} ราย`,
      tone: s > 0 ? "crit" : "good"
    }, {
      icon: "🟠",
      label: "High-Risk",
      value: `${x(n)} ราย`,
      tone: n > 0 ? "warn" : "good"
    }]
  }
}

function fe(r) {
  const t = r?.opd || {},
    i = r?.ipd || {},
    s = r?.er || {},
    n = r?.finance || {};
  return {
    bullets: [c("🧑‍⚕️", "OPD วันนี้", `${x(t.today_visits)} ราย`, f(t.trend_visits)), c("🛌", "IPD คงค้าง", `${x(i.active_admissions)} ราย`, f(i.trend_admissions)), c("🚑", "ER วันนี้", `${x(s.today_visits)} ราย`, f(s.trend_visits)), c("💰", "รายได้เดือนนี้", g(n.revenue_this_month) + C(n.trend_revenue), f(n.trend_revenue))]
  }
}

function pe(r) {
  const t = r?.finance || {};
  return {
    bullets: [c("💰", "รายได้สะสม YTD", g(t.total_revenue), "good"), c("📈", "เทรนด์เดือนนี้", g(t.revenue_this_month) + C(t.trend_revenue), f(t.trend_revenue)), c("📊", "Compare", "ดูเปรียบเทียบ 3 ปีงบ", "neutral")]
  }
}

function U(r, t, i, s = []) {
  const n = B(r),
    u = t?.opd || {},
    p = F(i),
    m = [c("🧑‍⚕️", "OPD วันนี้", `${x(u.today_visits)} ราย`, f(u.trend_visits)), ...s];
  return p.length > 0 && m.push(p[0]), m.push(c(n.icon, n.label, "เปิด Tab เพื่อดูรายละเอียด", "neutral")), {
    bullets: m
  }
}

function be(r, t) {
  const i = F(t),
    s = r?.ipd || {};
  return {
    bullets: [c("🫀", "NCD Registry", "DM · HT · CKD", "neutral"), c("🛌", "IPD (ผู้ป่วยเรื้อรัง)", `${x(s.active_admissions)} ราย`, "neutral"), ...i.length > 0 ? [i[0]] : [c("✅", "Clinical", "ปกติ", "good")]]
  }
}

function he(r) {
  const t = r?.opd || {},
    i = r?.ipd || {};
  return {
    bullets: [c("📇", "เวชระเบียน", "Audit · Coding", "neutral"), c("🧑‍⚕️", "OPD วันนี้", `${x(t.today_visits)} record`, "neutral"), c("🛌", "IPD คงค้าง", `${x(i.active_admissions)} record`, "neutral")]
  }
}

function ye(r, t) {
  const i = t?.summary?.critical_count || r?.clinical?.critical_patients || 0,
    s = r?.clinical?.high_risk_patients || 0,
    n = F(t);
  return {
    bullets: [c("⭐", "HA Thailand", "QPI · Patient Safety", "neutral"), c("🔴", "Critical", `${x(i)} ราย`, i > 0 ? "crit" : "good"), c("🟠", "High-Risk", `${x(s)} ราย`, s > 0 ? "warn" : "good"), ...n.length > 0 ? [n[0]] : []]
  }
}

function ge(r) {
  const t = r?.finance || {},
    i = t.full_denial_rate != null ? t.full_denial_rate : t.denial_rate;
  return {
    bullets: [c("🎯", "คัดกรองผู้รับบริการ", "สิทธิ · การเบิกจ่าย", "neutral"), c("✅", "Collection", M(t.collection_rate, 1), t.collection_rate >= h.collection_good ? "good" : "warn"), c("⚠️", "Full Denial", M(i, 1), i > h.full_denial_warn ? "warn" : "good")]
  }
}

function me(r) {
  const i = (r?.doctorActivity || {}).summary || {},
    s = i.opd_doctors || 0,
    n = i.ipd_doctors || 0,
    u = i.avg_visits_per_doctor || 0;
  return {
    bullets: [c("👨‍⚕️", "แพทย์ OPD", `${s} คน`, "neutral"), c("🏥", "แพทย์ IPD", `${n} คน`, "neutral"), c("📊", "เฉลี่ย/คน", `${u} ครั้ง`, u > 0 ? "good" : "neutral")]
  }
}

function je(r, t, i) {
  const s = B(r);
  let n;
  switch (r) {
    case "finance":
      n = ce(t);
      break;
    case "opd":
      n = de(t);
      break;
    case "ipd":
      n = xe(t);
      break;
    case "er":
      n = ue(t, i);
      break;
    case "report":
      n = fe(t);
      break;
    case "compare":
      n = pe(t);
      break;
    case "ncd":
      n = be(t, i);
      break;
    case "medrec":
      n = he(t);
      break;
    case "quality":
      n = ye(t, i);
      break;
    case "customer-insight":
      n = ge(t);
      break;
    case "doctor-activity":
      n = me(t);
      break;
    case "dental":
    case "xray":
    case "pharmacy":
    case "lab":
    case "thaimed":
    case "phystherapy":
      n = U(r, t, i);
      break;
    default:
      n = U(r, t, i)
  }
  return {
    tab: r,
    meta: s,
    ...n
  }
}

function ke(r) {
  if (!r || !r.bullets || r.bullets.length === 0) return [];
  const t = `${r.meta?.icon||"📰"} ${r.meta?.label||"Dashboard"}`;
  return r.bullets.filter(i => i.value && i.value !== "—").map(i => `${t} · ${i.icon} ${i.label} ${i.value}`)
}
const _e = ["สวัสดีค่ะ ขวัญใจพร้อมสรุปข่าวให้ค่ะ", "กำลังอ่านข่าวสรุปจาก HOSxP XE ค่ะ", "วันนี้ขวัญใจจะช่วยเฝ้าระวังทุกตัวชี้วัดให้นะคะ"],
  Ce = se.memo(function({
    clinicalData: t = null,
    activeTab: i = null,
    summary: s = null
  }) {
    const [n, u] = a.useState(0), [p, m] = a.useState(!1), [j, G] = a.useState(!1), [y, P] = a.useState({
      x: 0,
      y: 0
    }), [I, H] = a.useState({
      x: 0,
      y: 0
    }), [ee, z] = a.useState(1), [N, X] = a.useState(!0), [te, Q] = a.useState(!1), [Y, re] = a.useState({
      x: 0,
      y: 0
    }), [b, q] = a.useState(!1), A = a.useRef({
      x: 0,
      y: 0
    }), D = a.useRef(null);
    a.useEffect(() => {
      const o = window.innerWidth - 140,
        d = window.innerHeight - 160;
      P({
        x: o,
        y: d
      }), H({
        x: o,
        y: d
      })
    }, []), a.useEffect(() => {
      if (j || b) return;
      const o = () => {
          const S = 100 + Math.random() * (window.innerWidth - 200 - 100),
            $ = Math.max(window.innerHeight - 220, window.innerHeight * .55) + Math.random() * 140;
          H({
            x: S,
            y: Math.min($, window.innerHeight - 120)
          }), X(!0)
        },
        d = setInterval(o, 5e3 + Math.random() * 7e3);
      return o(), () => clearInterval(d)
    }, [j, b]), a.useEffect(() => {
      if (b) return;
      const o = () => {
        P(d => {
          const W = I.x - d.x,
            S = I.y - d.y,
            $ = Math.sqrt(W * W + S * S);
          if ($ < 2) return X(!1), d;
          const J = Math.min(1.8, $ * .025);
          return W > 1 ? z(1) : W < -1 && z(-1), {
            x: d.x + W / $ * J,
            y: d.y + S / $ * J
          }
        }), D.current = requestAnimationFrame(o)
      };
      return D.current = requestAnimationFrame(o), () => {
        D.current && cancelAnimationFrame(D.current)
      }
    }, [I, b]), a.useEffect(() => {
      const o = setInterval(() => {
        Q(!0), setTimeout(() => Q(!1), 120)
      }, 2500 + Math.random() * 3e3);
      return () => clearInterval(o)
    }, []), a.useEffect(() => {
      const o = d => re({
        x: d.clientX,
        y: d.clientY
      });
      return window.addEventListener("mousemove", o), () => window.removeEventListener("mousemove", o)
    }, []);
    const ie = a.useCallback(o => {
        j || (q(!0), A.current = {
          x: o.clientX - y.x,
          y: o.clientY - y.y
        }, o.currentTarget.setPointerCapture(o.pointerId))
      }, [y, j]),
      ne = a.useCallback(o => {
        b && P({
          x: o.clientX - A.current.x,
          y: o.clientY - A.current.y
        })
      }, [b]),
      oe = a.useCallback(() => q(!1), []),
      E = a.useMemo(() => t?.summary?.critical_count || 0, [t]),
      l = E > 0,
      L = le(i),
      T = a.useMemo(() => {
        const o = je(i, s, t);
        return L?.bullets?.length > 0 ? {
          ...o,
          bullets: L.bullets,
          source: "tab"
        } : {
          ...o,
          source: "baseline"
        }
      }, [i, s, t, L]),
      K = a.useMemo(() => B(i), [i]),
      k = a.useMemo(() => {
        const o = ke(T);
        return o.length > 0 ? o : _e
      }, [T]);
    a.useEffect(() => {
      const o = setInterval(() => {
        m(!0), setTimeout(() => {
          u(d => (d + 1) % k.length), m(!1)
        }, 400)
      }, 5500);
      return () => clearInterval(o)
    }, [k.length]);
    const _ = Math.max(-3, Math.min(3, (Y.x - y.x - 45) * .008)),
      v = Math.max(-2, Math.min(2, (Y.y - y.y - 20) * .008)),
      w = l ? "#ef4444" : "#a78bfa",
      O = l ? "#dc2626" : "#7c3aed",
      V = l ? "rgba(239,68,68,0.4)" : "rgba(167,139,250,0.4)";
    return e.jsxs("div", {
      style: {
        position: "fixed",
        left: `${y.x}px`,
        top: `${y.y}px`,
        zIndex: 9999,
        transition: b ? "none" : void 0,
        cursor: b ? "grabbing" : "grab",
        userSelect: "none",
        filter: `drop-shadow(0 6px 20px ${V})`
      },
      onPointerDown: ie,
      onPointerMove: ne,
      onPointerUp: oe,
      children: [!j && e.jsxs("div", {
        style: {
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "10px",
          width: "240px",
          opacity: p ? .3 : 1,
          transition: "opacity 0.3s"
        },
        children: [e.jsx("div", {
          style: {
            fontSize: "8px",
            fontWeight: 800,
            letterSpacing: "0.18em",
            color: O,
            textTransform: "uppercase",
            marginBottom: "3px",
            textAlign: "center",
            textShadow: "0 1px 2px rgba(255,255,255,0.8)"
          },
          children: "📰 News Brief"
        }), e.jsxs("div", {
          style: {
            background: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(12px)",
            borderRadius: "14px",
            padding: "8px 12px",
            border: `1.5px solid ${w}40`,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            fontSize: "11px",
            fontWeight: 600,
            color: "#475569",
            lineHeight: 1.5
          },
          children: [k[n % k.length], e.jsx("div", {
            style: {
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "10px",
              height: "10px",
              background: "rgba(255,255,255,0.95)",
              borderRight: `1.5px solid ${w}40`,
              borderBottom: `1.5px solid ${w}40`
            }
          })]
        })]
      }), j && e.jsxs("div", {
        style: {
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "12px",
          width: "300px",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          borderRadius: "18px",
          padding: "14px",
          border: `2px solid ${w}30`,
          boxShadow: `0 12px 40px rgba(0,0,0,0.12), 0 0 20px ${V}`,
          animation: "alita-pop 0.3s ease-out"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "2px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.15em",
                color: "#94a3b8",
                textTransform: "uppercase"
              },
              children: "📰 สรุปข่าวสั้น · น้องขวัญใจ"
            }), e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 900,
                background: `linear-gradient(135deg, ${O}, #ec4899)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              },
              children: [K.icon, " ", K.label]
            })]
          }), e.jsx("button", {
            onClick: () => G(!1),
            style: {
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              border: "none",
              background: "#f1f5f9",
              cursor: "pointer",
              fontSize: "12px",
              color: "#94a3b8"
            },
            children: "✕"
          })]
        }), e.jsx("div", {
          style: {
            background: `${w}08`,
            borderRadius: "10px",
            padding: "8px 10px",
            marginBottom: "10px",
            border: `1px solid ${w}15`,
            fontSize: "12px",
            fontWeight: 600,
            color: "#475569",
            lineHeight: 1.5,
            minHeight: "34px"
          },
          children: k[n % k.length]
        }), T?.bullets?.map((o, d) => e.jsx(ve, {
          icon: o.icon,
          label: o.label,
          value: o.value,
          tone: o.tone
        }, d)), l && e.jsxs("div", {
          style: {
            marginTop: "8px",
            padding: "6px 10px",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#dc2626",
            textAlign: "center"
          },
          children: ["🚨 แจ้งเตือน Clinical ", E, " เคสวิกฤต"]
        })]
      }), e.jsxs("svg", {
        width: "90",
        height: "115",
        viewBox: "0 0 90 115",
        onClick: () => G(o => !o),
        style: {
          transform: `scaleX(${ee})`,
          transition: "transform 0.3s"
        },
        children: [e.jsxs("defs", {
          children: [e.jsxs("radialGradient", {
            id: "headGrad",
            cx: "0.38",
            cy: "0.28",
            children: [e.jsx("stop", {
              offset: "0%",
              stopColor: "#818cf8"
            }), e.jsx("stop", {
              offset: "55%",
              stopColor: "#4338ca"
            }), e.jsx("stop", {
              offset: "100%",
              stopColor: "#1e1b4b"
            })]
          }), e.jsxs("radialGradient", {
            id: "bodyGrad",
            cx: "0.5",
            cy: "0.3",
            children: [e.jsx("stop", {
              offset: "0%",
              stopColor: "#4f46e5"
            }), e.jsx("stop", {
              offset: "100%",
              stopColor: "#1e1b4b"
            })]
          }), e.jsxs("radialGradient", {
            id: "eyeGrad",
            cx: "0.5",
            cy: "0.5",
            children: [e.jsx("stop", {
              offset: "0%",
              stopColor: "#1e293b"
            }), e.jsx("stop", {
              offset: "100%",
              stopColor: "#020617"
            })]
          }), e.jsxs("radialGradient", {
            id: "bulbGrad",
            cx: "0.3",
            cy: "0.3",
            children: [e.jsx("stop", {
              offset: "0%",
              stopColor: "#fef9c3"
            }), e.jsx("stop", {
              offset: "100%",
              stopColor: l ? "#dc2626" : "#eab308"
            })]
          }), e.jsxs("radialGradient", {
            id: "metalGrad",
            cx: "0.3",
            cy: "0.3",
            children: [e.jsx("stop", {
              offset: "0%",
              stopColor: "#94a3b8"
            }), e.jsx("stop", {
              offset: "100%",
              stopColor: "#334155"
            })]
          })]
        }), e.jsx("line", {
          x1: "29",
          y1: "10",
          x2: "29",
          y2: "3",
          stroke: "#1e1b4b",
          strokeWidth: "1.3"
        }), e.jsx("circle", {
          cx: "29",
          cy: "2.5",
          r: "3",
          fill: "url(#bulbGrad)",
          stroke: l ? "#991b1b" : "#ca8a04",
          strokeWidth: "0.4",
          children: e.jsx("animate", {
            attributeName: "opacity",
            values: "0.75;1;0.75",
            dur: "1.5s",
            repeatCount: "indefinite"
          })
        }), e.jsxs("circle", {
          cx: "29",
          cy: "2.5",
          r: "4.5",
          fill: l ? "#ef4444" : "#fde047",
          opacity: "0.25",
          children: [e.jsx("animate", {
            attributeName: "r",
            values: "3.5;5.5;3.5",
            dur: "1.5s",
            repeatCount: "indefinite"
          }), e.jsx("animate", {
            attributeName: "opacity",
            values: "0.35;0;0.35",
            dur: "1.5s",
            repeatCount: "indefinite"
          })]
        }), e.jsx("line", {
          x1: "61",
          y1: "10",
          x2: "61",
          y2: "3",
          stroke: "#1e1b4b",
          strokeWidth: "1.3"
        }), e.jsx("circle", {
          cx: "61",
          cy: "2.5",
          r: "3",
          fill: "url(#bulbGrad)",
          stroke: l ? "#991b1b" : "#ca8a04",
          strokeWidth: "0.4",
          children: e.jsx("animate", {
            attributeName: "opacity",
            values: "1;0.75;1",
            dur: "1.5s",
            repeatCount: "indefinite"
          })
        }), e.jsxs("circle", {
          cx: "61",
          cy: "2.5",
          r: "4.5",
          fill: l ? "#ef4444" : "#fde047",
          opacity: "0.25",
          children: [e.jsx("animate", {
            attributeName: "r",
            values: "5.5;3.5;5.5",
            dur: "1.5s",
            repeatCount: "indefinite"
          }), e.jsx("animate", {
            attributeName: "opacity",
            values: "0.35;0;0.35",
            dur: "1.5s",
            repeatCount: "indefinite"
          })]
        }), e.jsx("ellipse", {
          cx: "45",
          cy: "32",
          rx: "32",
          ry: "26",
          fill: "url(#headGrad)",
          stroke: "#1e1b4b",
          strokeWidth: "0.7"
        }), e.jsx("ellipse", {
          cx: "33",
          cy: "17",
          rx: "10",
          ry: "4",
          fill: "rgba(255,255,255,0.28)"
        }), e.jsx("path", {
          d: "M18,24 Q45,10 72,24",
          stroke: "rgba(255,255,255,0.3)",
          strokeWidth: "0.9",
          fill: "none",
          opacity: "0.7"
        }), e.jsx("path", {
          d: "M14,32 Q45,36 76,32",
          stroke: "rgba(0,0,0,0.25)",
          strokeWidth: "0.5",
          fill: "none"
        }), e.jsx("circle", {
          cx: "29",
          cy: "10",
          r: "2.2",
          fill: "#312e81",
          stroke: "#1e1b4b",
          strokeWidth: "0.3"
        }), e.jsx("circle", {
          cx: "61",
          cy: "10",
          r: "2.2",
          fill: "#312e81",
          stroke: "#1e1b4b",
          strokeWidth: "0.3"
        }), e.jsx("ellipse", {
          cx: "14",
          cy: "36",
          rx: "4",
          ry: "7",
          fill: "#1e1b4b",
          stroke: l ? "#ef4444" : "#22d3ee",
          strokeWidth: "0.7"
        }), e.jsx("ellipse", {
          cx: "14",
          cy: "36",
          rx: "2.5",
          ry: "4.5",
          fill: l ? "#7f1d1d" : "#134e4a"
        }), e.jsx("ellipse", {
          cx: "14",
          cy: "36",
          rx: "1.5",
          ry: "3",
          fill: l ? "#ef4444" : "#5eead4",
          opacity: "0.7",
          children: e.jsx("animate", {
            attributeName: "opacity",
            values: "0.4;0.85;0.4",
            dur: "1.8s",
            repeatCount: "indefinite"
          })
        }), e.jsx("ellipse", {
          cx: "76",
          cy: "36",
          rx: "4",
          ry: "7",
          fill: "#1e1b4b",
          stroke: l ? "#ef4444" : "#22d3ee",
          strokeWidth: "0.7"
        }), e.jsx("ellipse", {
          cx: "76",
          cy: "36",
          rx: "2.5",
          ry: "4.5",
          fill: l ? "#7f1d1d" : "#134e4a"
        }), e.jsx("ellipse", {
          cx: "76",
          cy: "36",
          rx: "1.5",
          ry: "3",
          fill: l ? "#ef4444" : "#5eead4",
          opacity: "0.7",
          children: e.jsx("animate", {
            attributeName: "opacity",
            values: "0.85;0.4;0.85",
            dur: "1.8s",
            repeatCount: "indefinite"
          })
        }), e.jsx("circle", {
          cx: "22",
          cy: "42",
          r: "1.8",
          fill: "#f472b6",
          opacity: "0.85"
        }), te ? e.jsxs(e.Fragment, {
          children: [e.jsx("path", {
            d: "M26,35 Q33,39 40,35",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "2",
            fill: "none",
            strokeLinecap: "round"
          }), e.jsx("path", {
            d: "M50,35 Q57,39 64,35",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "2",
            fill: "none",
            strokeLinecap: "round"
          })]
        }) : e.jsxs(e.Fragment, {
          children: [e.jsx("circle", {
            cx: "33",
            cy: "35",
            r: "9",
            fill: "url(#eyeGrad)",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "1.2"
          }), e.jsx("circle", {
            cx: "33",
            cy: "35",
            r: "7",
            fill: "none",
            stroke: "rgba(34,211,238,0.18)",
            strokeWidth: "0.3"
          }), e.jsx("circle", {
            cx: "33",
            cy: "35",
            r: "5",
            fill: "none",
            stroke: "rgba(34,211,238,0.2)",
            strokeWidth: "0.3"
          }), e.jsx("circle", {
            cx: "31",
            cy: "33",
            r: "0.4",
            fill: "#22d3ee",
            opacity: "0.5"
          }), e.jsx("circle", {
            cx: "35",
            cy: "33",
            r: "0.4",
            fill: "#22d3ee",
            opacity: "0.5"
          }), e.jsx("circle", {
            cx: "31",
            cy: "37",
            r: "0.4",
            fill: "#22d3ee",
            opacity: "0.5"
          }), e.jsx("circle", {
            cx: "35",
            cy: "37",
            r: "0.4",
            fill: "#22d3ee",
            opacity: "0.5"
          }), e.jsx("circle", {
            cx: 33 + _,
            cy: 35 + v,
            r: "3.2",
            fill: l ? "#ef4444" : "#22d3ee",
            opacity: "0.95",
            children: e.jsx("animate", {
              attributeName: "opacity",
              values: "0.75;1;0.75",
              dur: "2s",
              repeatCount: "indefinite"
            })
          }), e.jsx("circle", {
            cx: 33 + _,
            cy: 35 + v,
            r: "1.5",
            fill: "#fff",
            opacity: "0.95"
          }), e.jsx("circle", {
            cx: 32 + _ * .5,
            cy: 34 + v * .5,
            r: "0.6",
            fill: "#fff"
          }), e.jsx("circle", {
            cx: "57",
            cy: "35",
            r: "9",
            fill: "url(#eyeGrad)",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "1.2"
          }), e.jsx("circle", {
            cx: "57",
            cy: "35",
            r: "7",
            fill: "none",
            stroke: "rgba(34,211,238,0.18)",
            strokeWidth: "0.3"
          }), e.jsx("circle", {
            cx: "57",
            cy: "35",
            r: "5",
            fill: "none",
            stroke: "rgba(34,211,238,0.2)",
            strokeWidth: "0.3"
          }), e.jsx("circle", {
            cx: "55",
            cy: "33",
            r: "0.4",
            fill: "#22d3ee",
            opacity: "0.5"
          }), e.jsx("circle", {
            cx: "59",
            cy: "33",
            r: "0.4",
            fill: "#22d3ee",
            opacity: "0.5"
          }), e.jsx("circle", {
            cx: "55",
            cy: "37",
            r: "0.4",
            fill: "#22d3ee",
            opacity: "0.5"
          }), e.jsx("circle", {
            cx: "59",
            cy: "37",
            r: "0.4",
            fill: "#22d3ee",
            opacity: "0.5"
          }), e.jsx("circle", {
            cx: 57 + _,
            cy: 35 + v,
            r: "3.2",
            fill: l ? "#ef4444" : "#22d3ee",
            opacity: "0.95",
            children: e.jsx("animate", {
              attributeName: "opacity",
              values: "0.75;1;0.75",
              dur: "2s",
              repeatCount: "indefinite"
            })
          }), e.jsx("circle", {
            cx: 57 + _,
            cy: 35 + v,
            r: "1.5",
            fill: "#fff",
            opacity: "0.95"
          }), e.jsx("circle", {
            cx: 56 + _ * .5,
            cy: 34 + v * .5,
            r: "0.6",
            fill: "#fff"
          })]
        }), e.jsx("circle", {
          cx: "45",
          cy: "50",
          r: p ? 1.2 : .9,
          fill: l ? "#ef4444" : "#22d3ee",
          opacity: p ? .95 : .65,
          children: p && e.jsx("animate", {
            attributeName: "r",
            values: "0.7;1.4;0.7",
            dur: "0.8s",
            repeatCount: "indefinite"
          })
        }), e.jsx("rect", {
          x: "27",
          y: "60",
          width: "36",
          height: "28",
          rx: "6",
          fill: "url(#bodyGrad)",
          stroke: "#1e1b4b",
          strokeWidth: "0.7"
        }), e.jsx("rect", {
          x: "29",
          y: "62",
          width: "32",
          height: "2.5",
          rx: "1.2",
          fill: "rgba(255,255,255,0.15)"
        }), e.jsx("rect", {
          x: "27",
          y: "60",
          width: "3",
          height: "28",
          rx: "1",
          fill: "rgba(0,0,0,0.2)"
        }), e.jsx("circle", {
          cx: "45",
          cy: "64",
          r: "1",
          fill: l ? "#ef4444" : "#22d3ee",
          children: e.jsx("animate", {
            attributeName: "opacity",
            values: "0.4;1;0.4",
            dur: "1.3s",
            repeatCount: "indefinite"
          })
        }), e.jsx("rect", {
          x: "38",
          y: "67",
          width: "14",
          height: "17",
          rx: "1.5",
          fill: "#1e293b",
          stroke: l ? "#ef4444" : "#22d3ee",
          strokeWidth: "0.5"
        }), e.jsx("line", {
          x1: "40",
          y1: "70",
          x2: "50",
          y2: "70",
          stroke: "#64748b",
          strokeWidth: "0.5"
        }), e.jsx("line", {
          x1: "40",
          y1: "72.5",
          x2: "50",
          y2: "72.5",
          stroke: "#64748b",
          strokeWidth: "0.5"
        }), e.jsx("line", {
          x1: "40",
          y1: "75",
          x2: "50",
          y2: "75",
          stroke: "#64748b",
          strokeWidth: "0.5"
        }), e.jsx("line", {
          x1: "40",
          y1: "77.5",
          x2: "50",
          y2: "77.5",
          stroke: "#64748b",
          strokeWidth: "0.5"
        }), e.jsx("line", {
          x1: "40",
          y1: "80",
          x2: "50",
          y2: "80",
          stroke: "#64748b",
          strokeWidth: "0.5"
        }), e.jsx("line", {
          x1: "40",
          y1: "82.5",
          x2: "50",
          y2: "82.5",
          stroke: "#64748b",
          strokeWidth: "0.5"
        }), p && e.jsx("circle", {
          cx: "45",
          cy: "75.5",
          r: "0.8",
          fill: "#fbbf24",
          children: e.jsx("animate", {
            attributeName: "cy",
            values: "70;82;70",
            dur: "1.2s",
            repeatCount: "indefinite"
          })
        }), e.jsxs("g", {
          style: {
            animation: N ? "bot-arm-l 0.6s ease-in-out infinite" : void 0,
            transformOrigin: "26px 66px"
          },
          children: [e.jsx("circle", {
            cx: "26",
            cy: "66",
            r: "3",
            fill: "#1e1b4b",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "0.5"
          }), e.jsx("rect", {
            x: "20",
            y: "68",
            width: "6",
            height: "12",
            rx: "2.5",
            fill: "#312e81",
            stroke: "#1e1b4b",
            strokeWidth: "0.4"
          }), e.jsx("circle", {
            cx: "23",
            cy: "82",
            r: "3.2",
            fill: "#312e81",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "0.4"
          }), e.jsx("path", {
            d: "M21,84 L18,87",
            stroke: "#312e81",
            strokeWidth: "1.3",
            strokeLinecap: "round"
          }), e.jsx("path", {
            d: "M23,85 L23,89",
            stroke: "#312e81",
            strokeWidth: "1.3",
            strokeLinecap: "round"
          }), e.jsx("path", {
            d: "M25,84 L27,87",
            stroke: "#312e81",
            strokeWidth: "1.3",
            strokeLinecap: "round"
          }), e.jsx("circle", {
            cx: "18",
            cy: "87",
            r: "0.8",
            fill: "#1e1b4b"
          }), e.jsx("circle", {
            cx: "23",
            cy: "89",
            r: "0.8",
            fill: "#1e1b4b"
          }), e.jsx("circle", {
            cx: "27",
            cy: "87",
            r: "0.8",
            fill: "#1e1b4b"
          })]
        }), e.jsxs("g", {
          style: {
            animation: N ? "bot-arm-r 0.6s ease-in-out infinite" : void 0,
            transformOrigin: "64px 66px"
          },
          children: [e.jsx("circle", {
            cx: "64",
            cy: "66",
            r: "3",
            fill: "#1e1b4b",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "0.5"
          }), e.jsx("rect", {
            x: "64",
            y: "68",
            width: "6",
            height: "12",
            rx: "2.5",
            fill: "#312e81",
            stroke: "#1e1b4b",
            strokeWidth: "0.4"
          }), e.jsx("circle", {
            cx: "67",
            cy: "82",
            r: "3.2",
            fill: "#312e81",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "0.4"
          }), e.jsx("path", {
            d: "M65,84 L63,87",
            stroke: "#312e81",
            strokeWidth: "1.3",
            strokeLinecap: "round"
          }), e.jsx("path", {
            d: "M67,85 L67,89",
            stroke: "#312e81",
            strokeWidth: "1.3",
            strokeLinecap: "round"
          }), e.jsx("path", {
            d: "M69,84 L72,87",
            stroke: "#312e81",
            strokeWidth: "1.3",
            strokeLinecap: "round"
          }), e.jsx("circle", {
            cx: "63",
            cy: "87",
            r: "0.8",
            fill: "#1e1b4b"
          }), e.jsx("circle", {
            cx: "67",
            cy: "89",
            r: "0.8",
            fill: "#1e1b4b"
          }), e.jsx("circle", {
            cx: "72",
            cy: "87",
            r: "0.8",
            fill: "#1e1b4b"
          })]
        }), e.jsxs("g", {
          style: {
            animation: N ? "bot-leg-l 0.6s ease-in-out infinite" : void 0,
            transformOrigin: "37px 88px"
          },
          children: [e.jsx("rect", {
            x: "34",
            y: "88",
            width: "6",
            height: "10",
            rx: "2",
            fill: "#312e81",
            stroke: "#1e1b4b",
            strokeWidth: "0.4"
          }), e.jsx("ellipse", {
            cx: "36",
            cy: "105",
            rx: "8",
            ry: "5",
            fill: "#1e1b4b",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "0.5"
          }), e.jsx("ellipse", {
            cx: "36",
            cy: "107.5",
            rx: "7",
            ry: "3",
            fill: "#312e81"
          }), e.jsx("ellipse", {
            cx: "34",
            cy: "102",
            rx: "2",
            ry: "1",
            fill: "rgba(255,255,255,0.25)"
          })]
        }), e.jsxs("g", {
          style: {
            animation: N ? "bot-leg-r 0.6s ease-in-out infinite" : void 0,
            transformOrigin: "53px 88px"
          },
          children: [e.jsx("rect", {
            x: "50",
            y: "88",
            width: "6",
            height: "10",
            rx: "2",
            fill: "#312e81",
            stroke: "#1e1b4b",
            strokeWidth: "0.4"
          }), e.jsx("ellipse", {
            cx: "54",
            cy: "105",
            rx: "8",
            ry: "5",
            fill: "#1e1b4b",
            stroke: l ? "#ef4444" : "#22d3ee",
            strokeWidth: "0.5"
          }), e.jsx("ellipse", {
            cx: "54",
            cy: "107.5",
            rx: "7",
            ry: "3",
            fill: "#312e81"
          }), e.jsx("ellipse", {
            cx: "52",
            cy: "102",
            rx: "2",
            ry: "1",
            fill: "rgba(255,255,255,0.25)"
          })]
        }), l && e.jsxs("g", {
          children: [e.jsx("circle", {
            cx: "78",
            cy: "12",
            r: "9",
            fill: "#ef4444",
            stroke: "white",
            strokeWidth: "2",
            children: e.jsx("animate", {
              attributeName: "r",
              values: "8;10;8",
              dur: "1s",
              repeatCount: "indefinite"
            })
          }), e.jsx("text", {
            x: "78",
            y: "16",
            textAnchor: "middle",
            fill: "white",
            fontSize: "10",
            fontWeight: "900",
            children: E
          })]
        })]
      }), e.jsx("div", {
        style: {
          textAlign: "center",
          marginTop: "-4px",
          fontSize: "11px",
          fontWeight: 900,
          background: `linear-gradient(135deg, ${O}, #ec4899)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.05em",
          textShadow: "none"
        },
        children: "น้องขวัญใจ"
      }), e.jsx("style", {
        children: `
                @keyframes alita-pop { 0%{transform:translateX(-50%) scale(0.85);opacity:0} 100%{transform:translateX(-50%) scale(1);opacity:1} }
                @keyframes bot-arm-l { 0%,100%{transform:rotate(0)} 50%{transform:rotate(-18deg)} }
                @keyframes bot-arm-r { 0%,100%{transform:rotate(0)} 50%{transform:rotate(18deg)} }
                @keyframes bot-leg-l { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-12deg)} }
                @keyframes bot-leg-r { 0%,100%{transform:rotate(0)} 75%{transform:rotate(-12deg)} }
                @keyframes bot-orbit { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
            `
      })]
    })
  }),
  Z = {
    good: "#059669",
    warn: "#d97706",
    crit: "#dc2626",
    neutral: "#475569"
  };

function ve({
  icon: r,
  label: t,
  value: i,
  tone: s = "neutral"
}) {
  const n = Z[s] || Z.neutral;
  return e.jsxs("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "12px",
      padding: "6px 9px",
      background: `${n}0d`,
      borderRadius: "7px",
      border: `1px solid ${n}22`,
      marginBottom: "4px"
    },
    children: [e.jsxs("span", {
      style: {
        fontWeight: 700,
        color: "#334155",
        display: "flex",
        alignItems: "center",
        gap: "6px"
      },
      children: [e.jsx("span", {
        style: {
          fontSize: "12px"
        },
        children: r
      }), t]
    }), e.jsx("span", {
      style: {
        fontWeight: 900,
        color: n,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: "12px"
      },
      children: i
    })]
  })
}
export {
  Ce as
  default
};