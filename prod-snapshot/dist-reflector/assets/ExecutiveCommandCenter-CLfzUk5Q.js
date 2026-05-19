import {
  R as W,
  r as O,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  H as P,
  E as pe
} from "./shared-ui-OVDEF1.js";

function ue(t, r, l) {
  if (!t) return {
    headline: "กำลังรอข้อมูลภาพรวมโรงพยาบาล — AI วิเคราะห์จะปรากฏเมื่อ data พร้อม",
    empty: !0
  };
  const {
    financial: u,
    clinical: c,
    operational: s,
    quality: i,
    overall: o
  } = r || {}, d = (m, de = 0) => Number.isFinite(Number(m)) ? Number(m) : de, f = d(t.revenue_this_month) / 1e6, h = d(t.trend_revenue), n = d(t.collection_rate, 0), x = d(t.denial_rate, 0), g = d(t.debtors_outstanding) / 1e6, p = d(t.opd_today), _ = d(t.trend_opd), F = d(t.ipd_current), I = d(t.alos), ie = d(t.er_today), z = d(t.trend_er), K = d(t.total_beds), U = d(t.beds_occupied), y = d(t.occupancy_rate), k = d(t.critical_patients), V = d(t.high_risk_patients), ne = d(t.staff_on_duty), oe = d(t.doctors_today), B = l?.doctor || [], w = B.find(m => m.id === "sepsis_alert")?.count || 0, M = B.find(m => m.id === "deterioration_alert")?.count || 0, L = B.find(m => m.id === "critical_labs")?.count || 0;
  let A;
  const re = o >= 80 ? "#10b981" : o >= 65 ? "#0ea5e9" : o >= 50 ? "#f59e0b" : "#f43f5e";
  k >= 3 || w >= 2 ? A = `🚨 ภาวะฉุกเฉินทางคลินิก — Critical ${k} / Sepsis Alerts ${w} · Composite Health Score ${o}/100 · ต้องเรียก Clinical Command Huddle ทันที` : o >= 80 ? A = `✅ โรงพยาบาลอยู่ในสถานะแข็งแรง — Composite Score ${o}/100 (Finance ${u} · Clinical ${c} · Operations ${s} · Quality ${i}) · รักษาแนวทางและทำ Continuous Improvement` : o >= 65 ? A = `สถานะโดยรวมอยู่ในเกณฑ์ดี — Composite ${o}/100 · มีจุดที่ต้องปรับปรุง (${[u,c,s,i].filter(m=>m<70).length} หมวด) ดูรายละเอียดใน KPI scorecard` : o >= 50 ? A = `⚠ สถานะโรงพยาบาลต้องการการปรับปรุง — Composite ${o}/100 · จัด Executive Review + สร้าง 30-day improvement plan` : A = `🔴 สถานะวิกฤต — Composite ${o}/100 · หลายหมวดต่ำกว่าเกณฑ์ ต้องเรียก Emergency Executive Committee วันนี้`;
  const T = m => m >= 80 ? "#10b981" : m >= 65 ? "#0ea5e9" : m >= 50 ? "#f59e0b" : "#f43f5e",
    ae = [{
      label: "Composite Health",
      value: `${o}/100`,
      sub: o >= 80 ? "แข็งแรง" : o >= 65 ? "ดี" : o >= 50 ? "ต้องปรับ" : "วิกฤต",
      color: T(o)
    }, {
      label: "Financial",
      value: `${u}/100`,
      sub: `Collection ${n}% · Denial ${x}%`,
      color: T(u)
    }, {
      label: "Clinical Safety",
      value: `${c}/100`,
      sub: `Critical ${k} · High ${V}`,
      color: T(c)
    }, {
      label: "Operational",
      value: `${s}/100`,
      sub: `Occ ${y}% · OPD ${H(p)}`,
      color: T(s)
    }, {
      label: "Quality",
      value: `${i}/100`,
      sub: "Readmit · Mortality · CSAT",
      color: T(i)
    }, {
      label: "Bed Occupancy",
      value: `${y}%`,
      sub: `${U}/${K} beds`,
      color: y >= 95 ? "#f43f5e" : y >= 85 ? "#f59e0b" : y >= 70 ? "#10b981" : "#0ea5e9"
    }],
    E = [],
    le = `รายได้เดือนนี้ ${f.toFixed(2)} ล้านบาท ${h>=0?`เติบโต +${h.toFixed(1)}%`:`ลดลง ${h.toFixed(1)}%`} · Collection Rate ${n.toFixed(1)}% ${n>=90?"(ดีเยี่ยม)":n>=85?"(ดี)":"(ต่ำกว่าเกณฑ์ — ติดตาม AR)"} · Denial Rate ${x.toFixed(1)}% ${x<=3?"(ยอดเยี่ยม)":x<=5?"(ยอมรับได้)":"(สูงกว่าเกณฑ์ — ทบทวน claim)"} · Outstanding AR ${g.toFixed(2)} ล้านบาท`;
  E.push({
    icon: "💰",
    title: "Financial Pulse",
    text: le,
    color: T(u)
  });
  let N = `ผู้ป่วยวิกฤต ${k} ราย · ความเสี่ยงสูง ${V} ราย · IPD active ${F} ราย`;
  if (w > 0 || M > 0 || L > 0) {
    const m = [];
    w > 0 && m.push(`Sepsis Alert ${w}`), M > 0 && m.push(`Clinical Deterioration ${M}`), L > 0 && m.push(`Critical Labs ${L}`), N += ` · 🚨 Active AI Alerts: ${m.join(" · ")} — ควร Review รายเคสโดย Senior MD ภายใน 1 ชม.`
  } else N += " · ไม่มี AI Alert ระดับวิกฤตในขณะนี้";
  E.push({
    icon: "🏥",
    title: "Clinical Command",
    text: N,
    color: T(c)
  });
  const se = y >= 95 ? "แน่นเกินเกณฑ์ — กระทบ admission flow, พิจารณา early discharge" : y >= 85 ? "ใกล้เต็ม — monitor discharge pace" : y >= 70 ? "อยู่ในเกณฑ์ optimal (70–85%)" : "ต่ำกว่า 70% — อาจมี under-utilization, พิจารณา marketing/referral",
    ce = `OPD วันนี้ ${H(p)} ราย ${_>=0?`(+${_.toFixed(1)}%)`:`(${_.toFixed(1)}%)`} · ER วันนี้ ${H(ie)} ราย ${z>=0?`(+${z.toFixed(1)}%)`:`(${z.toFixed(1)}%)`} · Bed Occupancy ${y}% (${U}/${K}) — ${se} · ALOS ${I.toFixed(1)} วัน · Staff on-duty ${H(ne)} (แพทย์ ${oe})`;
  E.push({
    icon: "⚡",
    title: "Live Operations",
    text: ce,
    color: T(s)
  });
  const b = [];
  k >= 3 && b.push(`🔴 P0 · จัด Clinical Command Huddle สำหรับ Critical ${k} ราย + เตรียม ICU capacity`), w > 0 && b.push(`🔴 P0 · Activate Sepsis Hour-1 Bundle (${w} alerts) — Blood culture + Lactate + Fluid resuscitation`), M > 0 && b.push(`🔴 P0 · Rapid Response Team dispatch สำหรับ ${M} เคส deterioration alerts`), y >= 95 ? b.push(`🔴 P0 · Bed Capacity Crisis (${y}%) — Expedite discharges + Open surge beds`) : y >= 85 && b.push(`🟠 P1 · Bed Management — Occupancy ${y}% ควร prep discharge พรุ่งนี้`), x > 5 && b.push(`🟠 P1 · Claim Denial Review — Denial Rate ${x}% สูงกว่ามาตรฐาน · ทบทวน coder training`), n < 85 && b.push(`🟠 P1 · AR Management — Collection Rate ${n}% ต่ำกว่าเกณฑ์ 85%, เร่งเก็บ Outstanding ${g.toFixed(1)}M`), h < -5 && b.push(`🔴 P0 · Revenue Recovery Task Force — รายได้ลด ${h.toFixed(1)}% · วิเคราะห์ root cause ภายใน 7 วัน`), L > 0 && b.push(`🟠 P1 · Critical Lab Follow-through (${L} ผลผิดปกติ) — ensure MD review และ action taken`), _ < -10 && b.push(`🟡 P2 · OPD Volume ลด ${_.toFixed(1)}% · ตรวจสอบ scheduling, no-show rate, patient satisfaction`), b.length === 0 && b.push("✅ ไม่มี Action Item เร่งด่วน — โฟกัสที่ Continuous Improvement และ Strategic Initiatives"), E.push({
    icon: "🎯",
    title: "Priority Action Matrix (P0–P2)",
    list: b,
    color: "#f43f5e"
  });
  const C = [];
  return o >= 80 && h > 5 && C.push(`🚀 Growth Momentum — รายได้ +${h.toFixed(1)}% พร้อม Composite ${o}/100 · โอกาส scale service lines ที่กำไรสูง`), i < 70 && C.push(`📊 Quality Deep-Dive — Quality Score ${i}/100 ต่ำกว่าเกณฑ์ · ทบทวน readmission rate, mortality, patient experience`), s < 60 && C.push(`⚙️ Operational Optimization — Ops Score ${s}/100 · วิเคราะห์ bottleneck ใน patient flow, bed turnover, OR utilization`), u >= 80 && c < 70 && C.push(`⚖️ Balance Alert — การเงินแข็งแรง (${u}) แต่ Clinical Safety ${c}/100 ต่ำ · เสี่ยง reputation, พิจารณา invest ใน safety program`), I > 6 && C.push(`⏱️ ALOS ${I.toFixed(1)} วัน สูงกว่าเกณฑ์ 5 · ทบทวน discharge planning + case management + DRG optimization`), z > 20 && C.push(`🚑 ER Surge — ER เพิ่ม +${z.toFixed(1)}% · เตรียม staffing flex, fast track, และ observation unit`), C.length === 0 && C.push("✅ ภาพรวมสมดุล — ติดตาม trends ต่อเนื่องและเทียบ benchmark รายไตรมาส"), E.push({
    icon: "💡",
    title: "Strategic Insights",
    list: C,
    color: "#10b981"
  }), {
    headline: A,
    headlineColor: re,
    kpi: ae,
    sections: E,
    footerLeft: `Composite Health: ${o}/100 · อัปเดต ${new Date().toLocaleString("th-TH")}`
  }
}
const S = "#0f766e",
  Q = "#2dd4bf",
  v = "#10b981",
  $ = "#f43f5e",
  R = "#f59e0b",
  Y = "#0284c7",
  D = "#7c3aed",
  q = "#64748b",
  a = (t, r = 0) => {
    const l = Number(t);
    return Number.isFinite(l) ? l : r
  },
  j = (t, r = 0, l = 100) => Math.max(r, Math.min(l, t));

function xe(t) {
  if (!t) return 50;
  const r = a(t.collection_rate, 85),
    l = j(r, 0, 100),
    u = a(t.revenue_this_month, 0),
    c = a(t.revenue_target, u * 1.1 || 1e7),
    s = c > 0 ? j(u / c * 100) : 50,
    i = a(t.denial_rate, 5),
    o = j(100 - i * 5);
  return Math.round(l * .4 + s * .35 + o * .25)
}

function ge(t) {
  if (!t) return 75;
  const r = a(t.critical_patients, 0),
    l = a(t.high_risk_patients || t.risk_patients, 0);
  return j(Math.round(100 - r * 10 - l * 3))
}

function he(t) {
  if (!t) return 60;
  const r = a(t.opd_today, 0),
    l = a(t.opd_target, 800),
    u = l > 0 ? j(r / l * 100) : 50,
    c = a(t.occupancy_rate, 50),
    s = Math.abs(c - 80),
    i = j(100 - s * 2);
  return Math.round(u * .5 + i * .5)
}

function me(t) {
  if (!t) return 70;
  const r = a(t.readmission_rate, 5),
    l = a(t.mortality_rate, 1),
    u = a(t.satisfaction_score || t.quality_score, 80),
    c = j(100 - r * 5),
    s = j(100 - l * 10);
  return Math.round(c * .3 + s * .3 + j(u) * .4)
}

function fe(t, r) {
  const l = [],
    u = r?.doctor || [],
    c = u.find(p => p.id === "sepsis_alert"),
    s = u.find(p => p.id === "deterioration_alert"),
    i = u.find(p => p.id === "critical_labs");
  if ((c?.count || 0) + (s?.count || 0) + (i?.count || 0) > 0) {
    const p = [];
    c?.count > 0 && p.push(`Sepsis risk ${c.count} ราย`), s?.count > 0 && p.push(`Deteriorating ${s.count} ราย`), i?.count > 0 && p.push(`Critical lab ${i.count} รายการ`), l.push({
      type: "clinical",
      severity: c?.priority === "critical" || s?.priority === "critical" ? "critical" : "warning",
      icon: "🔬",
      title: "Clinical Risk Alert",
      titleTh: "แจ้งเตือนความเสี่ยงทางคลินิก",
      text: p.join(" · ") + " — ต้องดำเนินการ",
      color: $
    })
  } else {
    const p = a(t?.critical_patients, 0);
    l.push({
      type: "clinical",
      severity: p > 3 ? "critical" : p > 0 ? "warning" : "stable",
      icon: "🔬",
      title: "Clinical Risk Alert",
      titleTh: "แจ้งเตือนความเสี่ยงทางคลินิก",
      text: p > 3 ? `${p} critical patients — sepsis screening recommended` : p > 0 ? `${p} patient(s) under monitoring — vitals stable` : "All patients within safe parameters",
      color: p > 3 ? $ : p > 0 ? R : v
    })
  }
  const d = a(t?.revenue_this_month, 0),
    f = a(t?.revenue_ytd, 0),
    h = a(t?.collection_rate, 85);
  l.push({
    type: "financial",
    severity: h < 80 ? "warning" : "stable",
    icon: "💹",
    title: "Financial Intelligence",
    titleTh: "วิเคราะห์การเงิน",
    text: d > 0 ? `Monthly revenue ฿${(d/1e6).toFixed(1)}M | YTD ฿${(f/1e6).toFixed(1)}M — ${h>=85?"collection rate on target":"collection rate below target, review pending claims"}` : "Revenue data syncing — financial analytics will refresh at next cycle",
    color: h < 80 ? R : S
  });
  const n = a(t?.opd_today, 0),
    x = a(t?.er_today, 0),
    g = a(t?.occupancy_rate, 0);
  return l.push({
    type: "operational",
    severity: g > 90 ? "critical" : g > 80 ? "warning" : "stable",
    icon: "⚙️",
    title: "Operational Status",
    titleTh: "สถานะการดำเนินงาน",
    text: `OPD ${n} visits | ER ${x} cases | Bed occupancy ${g}% — ${g>90?"SURGE PROTOCOL: activate overflow beds":g>80?"approaching capacity, monitor admissions":"capacity within normal range"}`,
    color: g > 90 ? $ : g > 80 ? R : v
  }), l
}
const H = t => {
    const r = a(t);
    return r >= 1e6 ? `${(r/1e6).toFixed(1)}M` : r >= 1e3 ? `${(r/1e3).toFixed(0)}K` : r.toLocaleString()
  },
  ye = t => `฿${H(t)}`,
  X = {
    position: "relative",
    borderRadius: "20px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid var(--md-border)",
    boxShadow: "var(--md-shadow-xl, 0 20px 40px rgba(15,23,42,.08))",
    overflow: "hidden",
    marginBottom: "1.5rem"
  },
  J = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: `linear-gradient(90deg, ${S}, ${Q}, ${v}, ${Y}, ${D})`,
    borderRadius: "20px 20px 0 0",
    zIndex: 2
  },
  G = {
    margin: 0,
    fontSize: "11px",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    color: "var(--md-text-tertiary)"
  },
  be = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px 12px"
  },
  Z = {
    height: "1px",
    margin: "0 24px",
    background: "linear-gradient(90deg, transparent, var(--md-border), transparent)"
  },
  ve = W.memo(function({
    icon: r,
    label: l,
    value: u,
    unit: c,
    trend: s,
    color: i = S
  }) {
    const o = s > 0 ? v : s < 0 ? $ : q,
      d = s > 0 ? "▲" : s < 0 ? "▼" : "—";
    return e.jsxs("div", {
      style: {
        padding: "12px 14px",
        borderRadius: "14px",
        background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
        border: `1px solid ${i}25`,
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        cursor: "default",
        minWidth: 0
      },
      onMouseEnter: f => {
        f.currentTarget.style.borderColor = `${i}60`, f.currentTarget.style.boxShadow = `0 4px 20px ${i}20`, f.currentTarget.style.transform = "translateY(-2px)"
      },
      onMouseLeave: f => {
        f.currentTarget.style.borderColor = `${i}25`, f.currentTarget.style.boxShadow = "none", f.currentTarget.style.transform = "none"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          minWidth: 0
        },
        children: [e.jsx("span", {
          style: {
            fontSize: "14px",
            lineHeight: 1,
            flexShrink: 0
          },
          children: r
        }), e.jsx("span", {
          style: {
            fontSize: "11px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--md-text-tertiary)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          },
          children: l
        })]
      }), e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "baseline",
          gap: "4px",
          minWidth: 0
        },
        children: [e.jsx("span", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "var(--md-text-primary)",
            lineHeight: 1
          },
          children: u ?? "—"
        }), c && e.jsx("span", {
          style: {
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--md-text-tertiary)"
          },
          children: c
        })]
      }), s != null && e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "4px"
        },
        children: [e.jsx("span", {
          style: {
            fontSize: "10px",
            fontWeight: 900,
            color: o,
            lineHeight: 1
          },
          children: d
        }), e.jsxs("span", {
          style: {
            fontSize: "11px",
            fontWeight: 800,
            color: o
          },
          children: [Math.abs(s), "%"]
        })]
      })]
    })
  }),
  _e = W.memo(function({
    icon: r,
    title: l,
    titleTh: u,
    text: c,
    color: s,
    severity: i
  }) {
    const o = i === "critical" ? `${$}12` : i === "warning" ? `${R}12` : `${v}10`,
      d = i === "critical" ? `${$}35` : i === "warning" ? `${R}35` : `${v}25`,
      f = i === "critical" ? "CRITICAL" : i === "warning" ? "MONITOR" : "STABLE",
      h = i === "critical" ? $ : i === "warning" ? R : v;
    return e.jsxs("div", {
      style: {
        padding: "14px 16px",
        borderRadius: "14px",
        background: `linear-gradient(135deg, ${o}, transparent)`,
        border: `1px solid ${d}`,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flex: "1 1 0",
        minWidth: 0,
        transition: "all 0.3s ease"
      },
      onMouseEnter: n => {
        n.currentTarget.style.boxShadow = `0 8px 24px ${s}18`, n.currentTarget.style.transform = "translateY(-2px)"
      },
      onMouseLeave: n => {
        n.currentTarget.style.boxShadow = "none", n.currentTarget.style.transform = "none"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "16px",
              lineHeight: 1
            },
            children: r
          }), e.jsxs("div", {
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--md-text-primary)",
                lineHeight: 1.2
              },
              children: l
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                lineHeight: 1.3
              },
              children: u
            })]
          })]
        }), e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "2px 8px",
            borderRadius: "999px",
            background: `${h}18`,
            border: `1px solid ${h}40`
          },
          children: [e.jsx("span", {
            style: {
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: h,
              boxShadow: `0 0 6px ${h}80`,
              animation: i === "critical" ? "ecc-pulse 1.5s infinite" : "none"
            }
          }), e.jsx("span", {
            style: {
              fontSize: "8px",
              fontWeight: 900,
              color: h,
              letterSpacing: "0.1em"
            },
            children: f
          })]
        })]
      }), e.jsx("p", {
        style: {
          margin: 0,
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--md-text-secondary)",
          lineHeight: 1.55,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        },
        children: c
      })]
    })
  }),
  ee = W.memo(function({
    isLive: r
  }) {
    return e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "6px"
      },
      children: [e.jsx("span", {
        style: {
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: r ? v : q,
          boxShadow: r ? `0 0 8px ${v}80` : "none",
          animation: r ? "ecc-pulse 2s infinite" : "none"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "11px",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: r ? v : q
        },
        children: r ? "LIVE" : "OFFLINE"
      })]
    })
  }),
  te = "ecc-keyframes";
if (typeof document < "u" && !document.getElementById(te)) {
  const t = document.createElement("style");
  t.id = te, t.textContent = `
    @keyframes ecc-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }
    @keyframes ecc-scan {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
  `, document.head.appendChild(t)
}

function $e({
  summary: t,
  systemStatus: r,
  isLive: l,
  clinicalInsights: u
}) {
  const [c, s] = O.useState(!0), i = O.useMemo(() => {
    if (!t) return null;
    const n = t.finance || {},
      x = t.opd || {},
      g = t.ipd || {},
      p = t.er || {},
      _ = t.beds || {},
      F = t.clinical || {},
      I = t.staff || {};
    return {
      revenue_this_month: n.revenue_this_month ?? n.total_revenue,
      total_revenue: n.total_revenue,
      collection_rate: n.collection_rate,
      denial_rate: n.denial_rate,
      trend_revenue: n.trend_revenue,
      debtors_outstanding: n.debtors_outstanding,
      opd_today: x.today_visits,
      trend_opd: x.trend_visits,
      ipd_current: g.active_admissions,
      trend_ipd: g.trend_admissions,
      alos: g.alos,
      er_today: p.today_visits,
      trend_er: p.trend_visits,
      total_beds: _.total,
      beds_occupied: _.occupied,
      beds_available: _.available,
      occupancy_rate: _.occupancy_rate,
      critical_patients: F.critical_patients,
      high_risk_patients: F.high_risk_patients,
      total_monitored: F.total_monitored,
      staff_on_duty: I.on_duty,
      doctors_today: I.doctors_today
    }
  }, [t]), o = O.useMemo(() => {
    const n = xe(i),
      x = ge(i),
      g = he(i),
      p = me(i);
    return {
      overall: Math.round(n * .25 + x * .3 + g * .25 + p * .2),
      financial: n,
      clinical: x,
      operational: g,
      quality: p
    }
  }, [i]), d = O.useMemo(() => [{
    icon: "💰",
    label: "รายได้เดือนนี้",
    value: i?.revenue_this_month ? ye(i.revenue_this_month) : "—",
    unit: "",
    trend: i?.trend_revenue != null ? a(i.trend_revenue) : null,
    color: S
  }, {
    icon: "⏱️",
    label: "OPD วันนี้",
    value: i?.opd_today != null ? a(i.opd_today).toLocaleString() : "—",
    unit: "visits",
    trend: i?.trend_opd != null ? a(i.trend_opd) : null,
    color: Y
  }, {
    icon: "🏥",
    label: "IPD ปัจจุบัน",
    value: i?.ipd_current != null ? a(i.ipd_current).toLocaleString() : "—",
    unit: "pts",
    trend: i?.trend_ipd != null ? a(i.trend_ipd) : null,
    color: D
  }, {
    icon: "🚑",
    label: "ER วันนี้",
    value: i?.er_today != null ? a(i.er_today).toLocaleString() : "—",
    unit: "cases",
    trend: i?.trend_er != null ? a(i.trend_er) : null,
    color: $
  }, {
    icon: "🛏️",
    label: "เตียงว่าง",
    value: i?.beds_occupied != null ? `${a(i.beds_occupied)}/${a(i.total_beds)}` : "—",
    unit: i?.occupancy_rate != null ? `${a(i.occupancy_rate)}%` : "",
    trend: null,
    color: R
  }, {
    icon: "👨‍⚕️",
    label: "Staff On-Duty",
    value: i?.staff_on_duty != null ? a(i.staff_on_duty) : "—",
    unit: "",
    trend: null,
    color: v
  }, {
    icon: "🚨",
    label: "Critical Pts",
    value: i?.critical_patients != null ? a(i.critical_patients) : "—",
    unit: "pts",
    trend: null,
    color: $
  }, {
    icon: "📊",
    label: "Quality Score",
    value: o.quality,
    unit: "/100",
    trend: null,
    color: S
  }], [i, o.quality]), f = O.useMemo(() => fe(i, u), [i, u]), h = O.useMemo(() => new Date().toLocaleString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }), [l]);
  return e.jsxs(e.Fragment, {
    children: [e.jsxs("div", {
      className: "hidden lg:block",
      style: X,
      children: [e.jsx("div", {
        style: J
      }), e.jsx("div", {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "30%",
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${Q}90, transparent)`,
          animation: l ? "ecc-scan 3s linear infinite" : "none",
          zIndex: 3,
          borderRadius: "20px 20px 0 0"
        }
      }), e.jsxs("div", {
        style: be,
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px"
          },
          children: [e.jsx("div", {
            style: {
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${S}, ${Q})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 12px ${S}40`
            },
            children: e.jsx("span", {
              style: {
                fontSize: "16px",
                lineHeight: 1
              },
              children: "🎛️"
            })
          }), e.jsxs("div", {
            children: [e.jsx("h2", {
              style: {
                margin: 0,
                fontSize: "13px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--md-text-primary)",
                lineHeight: 1.2
              },
              children: "Executive Command Center"
            }), e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                letterSpacing: "0.06em"
              },
              children: ["BCH 360° INTELLIGENCE ・ ", h]
            })]
          })]
        }), e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "16px"
          },
          children: [e.jsx(ee, {
            isLive: l
          }), e.jsx("button", {
            onClick: () => s(n => !n),
            style: {
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--md-border)",
              borderRadius: "8px",
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: 800,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              transition: "all 0.2s ease"
            },
            onMouseEnter: n => {
              n.currentTarget.style.background = "rgba(255,255,255,0.12)", n.currentTarget.style.color = "var(--md-text-primary)"
            },
            onMouseLeave: n => {
              n.currentTarget.style.background = "rgba(255,255,255,0.06)", n.currentTarget.style.color = "var(--md-text-tertiary)"
            },
            "aria-label": c ? "Expand command center" : "Collapse command center",
            children: c ? "▼ EXPAND" : "▲ COLLAPSE"
          })]
        })]
      }), e.jsxs("div", {
        style: {
          maxHeight: c ? "0px" : "2400px",
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(.4,0,.2,1)"
        },
        children: [e.jsxs("div", {
          style: {
            padding: "4px 24px 16px"
          },
          children: [e.jsx("p", {
            style: {
              ...G,
              marginBottom: "14px"
            },
            children: "◆ Hospital Pulse"
          }), e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              justifyItems: "center"
            },
            children: [e.jsx(P, {
              score: o.overall,
              label: "Overall Health",
              icon: "🏥",
              size: "sm",
              color: S
            }), e.jsx(P, {
              score: o.financial,
              label: "Financial Health",
              icon: "💰",
              size: "sm",
              color: v
            }), e.jsx(P, {
              score: o.clinical,
              label: "Clinical Safety",
              icon: "🩺",
              size: "sm",
              color: $
            }), e.jsx(P, {
              score: o.operational,
              label: "Operational",
              icon: "⚙️",
              size: "sm",
              color: Y
            })]
          })]
        }), e.jsx("div", {
          style: Z
        }), e.jsxs("div", {
          style: {
            padding: "14px 24px 16px"
          },
          children: [e.jsx("p", {
            style: {
              ...G,
              marginBottom: "12px"
            },
            children: "◆ Live Operations"
          }), e.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px"
            },
            children: d.map((n, x) => e.jsx(ve, {
              ...n
            }, x))
          })]
        }), e.jsx("div", {
          style: Z
        }), e.jsxs("div", {
          style: {
            padding: "14px 24px 18px"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px"
            },
            children: [e.jsx("p", {
              style: G,
              children: "◆ AI Intelligence"
            }), e.jsx("span", {
              style: {
                fontSize: "8px",
                fontWeight: 900,
                padding: "2px 6px",
                borderRadius: "4px",
                background: `${D}20`,
                color: D,
                letterSpacing: "0.1em"
              },
              children: "CLAUDE AI"
            })]
          }), e.jsx("div", {
            style: {
              display: "flex",
              gap: "12px"
            },
            children: f.map((n, x) => e.jsx(_e, {
              ...n
            }, x))
          })]
        })]
      })]
    }), e.jsxs("div", {
      className: "block lg:hidden",
      style: {
        ...X,
        padding: "12px 16px"
      },
      children: [e.jsx("div", {
        style: J
      }), e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "16px"
            },
            children: "🎛️"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--md-text-primary)"
            },
            children: "Command Center"
          })]
        }), e.jsx(ee, {
          isLive: l
        })]
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          marginBottom: "12px"
        },
        children: [{
          score: o.overall,
          label: "Overall",
          icon: "🏥"
        }, {
          score: o.financial,
          label: "Finance",
          icon: "💰"
        }, {
          score: o.clinical,
          label: "Clinical",
          icon: "🩺"
        }, {
          score: o.operational,
          label: "Ops",
          icon: "⚙️"
        }].map((n, x) => {
          const g = n.score >= 80 ? v : n.score >= 60 ? R : $;
          return e.jsxs("div", {
            style: {
              textAlign: "center",
              padding: "8px 4px",
              borderRadius: "10px",
              background: `${g}08`,
              border: `1px solid ${g}20`
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "14px",
                marginBottom: "2px"
              },
              children: n.icon
            }), e.jsx("div", {
              style: {
                fontSize: "18px",
                fontWeight: 900,
                color: g,
                lineHeight: 1
              },
              children: n.score
            }), e.jsx("div", {
              style: {
                fontSize: "8px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginTop: "2px"
              },
              children: n.label
            })]
          }, x)
        })
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "6px"
        },
        children: d.slice(0, 4).map((n, x) => e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 8px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--md-border)"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "12px"
            },
            children: n.icon
          }), e.jsxs("div", {
            style: {
              minWidth: 0
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "8px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              },
              children: n.label
            }), e.jsx("div", {
              style: {
                fontSize: "13px",
                fontWeight: 900,
                color: "var(--md-text-primary)",
                lineHeight: 1
              },
              children: n.value
            })]
          })]
        }, x))
      }), !c && i && e.jsx("div", {
        style: {
          padding: "0 24px 20px"
        },
        children: e.jsx(pe, {
          title: "AI Executive Summary — ภาพรวมโรงพยาบาล",
          subtitle: "Hospital-wide Executive Analysis · Finance · Clinical · Operations · Quality · Priority Actions · Strategic Insights",
          badge: "📐 Rule-based · Composite Health",
          accentColor: S,
          headerGradient: `linear-gradient(135deg, ${S}15, ${D}0A)`,
          narrative: ue(i, o, u)
        })
      })]
    })]
  })
}
const je = W.memo($e);
export {
  je as
  default
};