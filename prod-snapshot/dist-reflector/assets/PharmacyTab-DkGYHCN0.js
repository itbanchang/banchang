import {
  R as F,
  j as e,
  r as w
} from "./vendor-react-ByYOq5k4.js";
import {
  b as Ie,
  a as Ae,
  E as Fe,
  s as $e,
  M as Be,
  h as Ge
} from "./shared-ui-OVDEF1.js";
import "./index-DK7pcb85.js";
import {
  R as je,
  g as He,
  a as Se,
  X as _e,
  Y as Re,
  T as ze,
  b as Ee,
  c as Oe,
  B as qe
} from "./vendor-charts-C5q2M-g3.js";
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});
F.memo(function(h) {
  return e.jsx(e.Fragment, {
    children: h.children
  })
});

function Ye() {
  const _ = Ie(t => ({
      pharmacyToday: t.pharmacyToday,
      pharmacyAnalytics: t.pharmacyAnalytics,
      pharmacyRevenueFiscal: t.pharmacyRevenueFiscal,
      pharmacyAI: t.pharmacyAI,
      loading: t.loading
    })),
    {
      fetchData: h
    } = Ae(),
    K = _.pharmacyToday || {},
    c = _.pharmacyAnalytics,
    v = _.pharmacyRevenueFiscal,
    B = _.loading || {},
    re = new Date,
    X = re.getMonth() + 1,
    $ = re.getFullYear(),
    J = `${X>=10?$:$-1}-10-01`,
    Z = re.toISOString().slice(0, 10),
    [G, ie] = w.useState(J),
    [H, ne] = w.useState(Z),
    [E, xe] = w.useState({
      start: J,
      end: Z
    }),
    [D, We] = w.useState(null),
    [oe, ge] = w.useState(!1),
    he = w.useCallback(async (t, o) => {
      ge(!0);
      try {
        const n = await fetch(`/api/pharmacy/top-drugs?start=${t}&end=${o}`, {
          credentials: "include"
        });
        if (n.ok) {
          const a = await n.json();
          We(a)
        }
      } catch {}
      ge(!1)
    }, []);
  w.useEffect(() => {
    he(E.start, E.end)
  }, [E, he]), w.useEffect(() => {
    !K.total_prescriptions && !B.pharmacyToday && h("pharmacyToday", "/api/pharmacy/today"), !c && !B.pharmacyAnalytics && h("pharmacyAnalytics", "/api/pharmacy/analytics"), !v && !B.pharmacyRevenueFiscal && h("pharmacyRevenueFiscal", "/api/pharmacy/revenue-fiscal");
    const t = setTimeout(() => h("pharmacyAI", "/api/ai/pharmacy/optimization"), 300);
    return () => clearTimeout(t)
  }, [h]);
  const y = {
      primary: "#10b981",
      secondary: "#059669",
      border: "rgba(16,185,129,0.25)",
      light: "rgba(16,185,129,0.08)"
    },
    L = w.useMemo(() => {
      const t = {
        problems: [],
        urgencyScore: 0,
        urgencyColor: "#10b981",
        urgencyLabel: "ปกติ",
        latestFY: {
          fiscal_label: "FY"
        },
        yoyGrowth: 0,
        strategicKPIs: []
      };
      if (!c) return t;
      const o = c,
        n = o.ppi ?? 0,
        a = o.generic_ratio ?? 0,
        i = o.drug_cost_per_rx ?? 0,
        x = o.rev_cost_ratio ?? 1,
        d = o.avg_daily_rx ?? 0,
        l = [];
      if (a < 60 ? l.push({
          priority: 1,
          severity: "critical",
          color: "#f43f5e",
          title: "Generic Drug Ratio ต่ำมาก: " + a + "%",
          rootCause: "ยา Generic มีสัดส่วนเพียง " + a + "% (เป้าหมาย >= 80%) ทำให้ต้นทุนยาสูงเกินความจำเป็น",
          fixFirst: "ทบทวน Formulary และกำหนดนโยบาย Generic First ทุกแผนก"
        }) : a < 75 && l.push({
          priority: 2,
          severity: "warning",
          color: "#f59e0b",
          title: "Generic Drug Ratio ต่ำกว่าเป้า: " + a + "%",
          rootCause: "สัดส่วนยา Generic ยังต่ำกว่ามาตรฐาน 80% ทำให้ต้นทุนยาสูง",
          fixFirst: "ประชุม PCT และ PTC เพื่อขยายรายการยา Generic ใน Formulary"
        }), i > 800 ? l.push({
          priority: 2,
          severity: "critical",
          color: "#f43f5e",
          title: "ต้นทุนยาต่อ Rx สูงมาก: " + i.toLocaleString() + " บาท",
          rootCause: "ค่าเฉลี่ยยาต่อ 1 ใบสั่งยาสูงกว่าเกณฑ์ 500 บาท บ่งชี้ว่ามียา High-Cost หรือ Brand Name มากเกินไป",
          fixFirst: "วิเคราะห์ Top High-Cost Drug และเพิ่มทางเลือก Generic หรือเจรจาต่อรองราคา"
        }) : i > 600 && l.push({
          priority: 3,
          severity: "warning",
          color: "#f59e0b",
          title: "ต้นทุนยาต่อ Rx ตึงตัว: " + i.toLocaleString() + " บาท",
          rootCause: "ค่าเฉลี่ยยาต่อ Rx อยู่ที่ " + i.toLocaleString() + " บาท ใกล้เคียงเพดานที่ยอมรับได้",
          fixFirst: "ติดตาม Top 10 High-Cost Drug และพิจารณา Therapeutic Substitution"
        }), x < 1 && l.push({
          priority: 1,
          severity: "critical",
          color: "#f43f5e",
          title: "Revenue/Cost Ratio < 1.0: ขาดทุนจากยา",
          rootCause: "รายได้จากยาน้อยกว่าต้นทุน (Ratio: " + x.toFixed(2) + ") อาจมีปัญหาการ Charge ยาไม่ครบ",
          fixFirst: "ตรวจสอบ Billing Completeness และระบบ Interface ระหว่างคลินิกกับห้องยา"
        }), d > 0 && d < 50 && l.push({
          priority: 4,
          severity: "info",
          color: "#0ea5e9",
          title: "ปริมาณจ่ายยาต่ำ: " + d + " Rx/วัน",
          rootCause: "ปริมาณ Prescription ต่ำกว่าเกณฑ์โรงพยาบาลขนาดเดียวกัน อาจมีปัญหา Interface หรือ Under-reporting",
          fixFirst: "ตรวจสอบระบบ Interface ระหว่าง Doctor Workstation กับ Pharmacy System"
        }), o.top_drugs_by_value && o.top_drugs_by_value.length > 0) {
        const R = o.top_drugs_by_value[0];
        R && R.value > 0 && l.push({
          priority: 5,
          severity: "good",
          color: "#10b981",
          title: "ยาใช้สูงสุดด้านมูลค่า: " + (R.name?.substring(0, 30) || R.icode),
          rootCause: "ยาดังกล่าวมีมูลค่าการจ่ายสูงถึง " + R.value.toLocaleString() + " บาท (30 วัน) ควรติดตามอย่างใกล้ชิด",
          fixFirst: "ตรวจสอบว่ามียา Generic ทดแทนได้หรือไม่ และติดตาม Stock Level ให้เพียงพอ"
        })
      }
      const u = v?.fiscal_years || [],
        f = u[u.length - 1] || {
          fiscal_label: "FY"
        },
        b = u[u.length - 2],
        M = f.comparable_revenue || f.total_revenue || 0,
        W = b && (b.comparable_revenue || b.total_revenue) || 0,
        j = W > 0 ? (M - W) / W * 100 : 0,
        z = [{
          label: "Generic Ratio",
          value: a + "%",
          color: a >= 80 ? "#10b981" : a >= 60 ? "#f59e0b" : "#f43f5e",
          icon: "💊"
        }, {
          label: "Cost/Rx",
          value: i.toLocaleString() + " บาท",
          color: i <= 500 ? "#10b981" : i <= 700 ? "#f59e0b" : "#f43f5e",
          icon: "💰"
        }, {
          label: "Rev/Cost",
          value: x.toFixed(2) + "x",
          color: x >= 1.2 ? "#10b981" : x >= 1 ? "#f59e0b" : "#f43f5e",
          icon: "📈"
        }, {
          label: "PPI Score",
          value: "" + n,
          color: n >= 80 ? "#10b981" : n >= 60 ? "#f59e0b" : "#f43f5e",
          icon: "🎯"
        }],
        T = l.filter(R => R.severity === "critical").length,
        I = l.filter(R => R.severity === "warning").length,
        m = Math.min(10, T * 3 + I * 1.5);
      return {
        problems: l,
        urgencyScore: m,
        urgencyColor: m >= 7 ? "#f43f5e" : m >= 4 ? "#f59e0b" : "#10b981",
        urgencyLabel: m >= 7 ? "วิกฤต" : m >= 4 ? "เฝ้าระวัง" : "ปกติ",
        latestFY: f,
        yoyGrowth: j,
        strategicKPIs: z
      }
    }, [c, v]),
    Ce = w.useMemo(() => {
      if (!v?.fiscal_years) return [];
      const t = v.fiscal_years;
      return ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((n, a) => {
        const i = {
          month: n
        };
        return t.forEach((x, d) => {
          i["fy" + d] = x.months && x.months[a] ? x.months[a].revenue : 0
        }), i
      })
    }, [v]),
    ye = w.useMemo(() => (c?.monthly_trend || []).map(t => ({
      month: t.month,
      prescriptions: t.prescriptions,
      value: t.value
    })), [c]),
    r = w.useMemo(() => {
      if (!c) return null;
      const t = c,
        o = t.top_drugs_by_value || [];
      t.top_drugs_by_volume;
      const n = t.total_drug_revenue || 1,
        a = t.total_drug_cost || 1,
        i = t.generic_ratio || 0,
        x = t.drug_cost_per_rx || 0,
        d = t.rev_cost_ratio || 1,
        l = t.ppi || 0,
        u = t.monthly_trend || [],
        f = o.slice(0, 5).reduce((s, g) => s + (g.value || g.total_value || 0), 0),
        b = o.slice(0, 10).reduce((s, g) => s + (g.value || g.total_value || 0), 0),
        M = n > 0 ? Math.round(f / n * 100) : 0,
        W = o.filter(s => (s.value || s.total_value || 0) / n * 100 > 15),
        j = t.on_duty?.pharmacists?.length || 0,
        z = (t.on_duty?.pharmacists?.length || 0) + (t.on_duty?.staff?.length || 0),
        T = j > 0 ? Math.round((t.avg_daily_rx || 0) / j) : 0,
        I = t.opd_value || 0,
        m = t.ipd_value || 0,
        R = I + m || 1,
        S = Math.round(m / R * 100),
        C = u.map(s => s.total_value || s.value || 0).filter(s => s > 0),
        q = C.length > 0 ? C.reduce((s, g) => s + g, 0) / C.length : 0,
        p = C.length > 1 ? Math.sqrt(C.reduce((s, g) => s + Math.pow(g - q, 2), 0) / (C.length - 1)) : 0,
        k = q > 0 ? Math.round(p / q * 100) : 0,
        A = D?.by_value || o,
        le = A.filter(s => (s.yoy_qty_pct || s.yoy_val_pct) > 50),
        ke = A.filter(s => (s.yoy_qty_pct || s.yoy_val_pct) < -30 && (s.yoy_qty_pct || s.yoy_val_pct) != null),
        Pe = o.filter(s => {
          const g = s.value || s.total_value || 0,
            O = s.qty || s.total_qty || 1;
          return g / O > 50
        }),
        Y = Math.round(Math.min(100, Math.max(0, 50 + (L.yoyGrowth || 0) * 3))),
        N = x > 0 ? Math.max(0, Math.min(100, Math.round(100 - x / 500 * 50))) : 50,
        V = Math.min(100, Math.round(i * 1.25)),
        U = Math.max(0, Math.min(100, Math.round(100 - k * 2))),
        Q = Math.min(100, Math.round(d / 1.2 * 80)),
        De = Math.round(Y * .2 + N * .2 + V * .25 + U * .15 + Q * .2),
        ce = [...t.on_duty?.pharmacists || [], ...t.on_duty?.staff || []],
        Le = ce.reduce((s, g) => s + (g.morning_count || 0), 0),
        we = ce.reduce((s, g) => s + (g.afternoon_count || 0), 0),
        Me = ce.reduce((s, g) => s + (g.night_count || 0), 0),
        be = v?.fiscal_years || [],
        P = be[be.length - 1],
        Te = P?.months ? [{
          label: "Q1 (ต.ค.-ธ.ค.)",
          rev: (P.months[0]?.revenue || 0) + (P.months[1]?.revenue || 0) + (P.months[2]?.revenue || 0)
        }, {
          label: "Q2 (ม.ค.-มี.ค.)",
          rev: (P.months[3]?.revenue || 0) + (P.months[4]?.revenue || 0) + (P.months[5]?.revenue || 0)
        }, {
          label: "Q3 (เม.ย.-มิ.ย.)",
          rev: (P.months[6]?.revenue || 0) + (P.months[7]?.revenue || 0) + (P.months[8]?.revenue || 0)
        }, {
          label: "Q4 (ก.ค.-ก.ย.)",
          rev: (P.months[9]?.revenue || 0) + (P.months[10]?.revenue || 0) + (P.months[11]?.revenue || 0)
        }] : [];
      return {
        dci: M,
        top5Val: f,
        top10Val: b,
        singleDrugRisks: W,
        rxPerPhar: T,
        pharCount: j,
        staffCount: z,
        ipdMixPct: S,
        opdVal: I,
        ipdVal: m,
        volatility: k,
        trendMean: q,
        surges: le,
        declines: ke,
        highUnitCost: Pe,
        healthOverall: De,
        healthDimensions: [{
          label: "Revenue Growth",
          score: Y,
          icon: "📈",
          color: Y >= 70 ? "#10b981" : Y >= 40 ? "#f59e0b" : "#f43f5e",
          desc: `YoY ${(L.yoyGrowth||0).toFixed(1)}% — ${Y>=70?"รายได้ยาเติบโตดี สะท้อน demand สูงขึ้นและ Formulary ครอบคลุมดี":Y>=40?"รายได้ทรงตัว ควรขยายบริการเพื่อเพิ่ม revenue":"รายได้ลดลง ตรวจสอบ Prescribing Pattern และ Drug Utilization"}`,
          formula: "50 + (YoY Growth% × 3)",
          target: "≥70 (เติบโต >7% YoY)"
        }, {
          label: "Cost Control",
          score: N,
          icon: "💰",
          color: N >= 70 ? "#10b981" : N >= 40 ? "#f59e0b" : "#f43f5e",
          desc: `ต้นทุนยา ${x.toLocaleString()} บาท/Rx (เป้า ≤500 บาท) — ${N>=70?"ต้นทุนต่ำ Formulary มีประสิทธิภาพ ยาราคาเหมาะสม":N>=40?"ต้นทุนปานกลาง ทบทวน High-Cost Drug และหา Generic Alternative":"ต้นทุนสูง ต้องเจรจาต่อรองราคายากับ Supplier ด่วน"}`,
          formula: "100 − (Cost per Rx ÷ 500 × 50)",
          target: "≥70 (Cost/Rx ≤300 บาท)"
        }, {
          label: "Generic Adoption",
          score: V,
          icon: "💊",
          color: V >= 70 ? "#10b981" : V >= 40 ? "#f59e0b" : "#f43f5e",
          desc: `Generic Ratio ${i.toFixed(1)}% (เป้า ≥80%) — ${V>=70?"สัดส่วน Generic สูง ลดต้นทุนยาได้ดี สอดคล้อง สธ.":V>=40?"ยังต่ำกว่าเป้า ประชุม PTC เพิ่มรายการ Generic ใน Formulary":"วิกฤต กำหนดนโยบาย Generic First ทันที เป้า ≥60% ใน 90 วัน"}`,
          formula: "Generic Ratio × 1.25",
          target: "≥70 (Generic ≥56%)"
        }, {
          label: "Revenue Stability",
          score: U,
          icon: "📊",
          color: U >= 70 ? "#10b981" : U >= 40 ? "#f59e0b" : "#f43f5e",
          desc: `ความผันผวน (CV) ${k}% — ${U>=70?"รายได้สม่ำเสมอ วางแผนจัดซื้อยาล่วงหน้าได้แม่นยำ Cash Flow มั่นคง":U>=40?"มีความผันผวนบ้าง ตรวจสอบเดือนที่ revenue ต่ำผิดปกติ":"ผันผวนสูง อาจเกิดจาก Seasonal Demand หรือ Billing Error"}`,
          formula: "100 − (CV% × 2)",
          target: "≥70 (CV ≤15%)"
        }, {
          label: "Billing Integrity",
          score: Q,
          icon: "🧾",
          color: Q >= 70 ? "#10b981" : Q >= 40 ? "#f59e0b" : "#f43f5e",
          desc: `Rev/Cost Ratio ${d.toFixed(2)}x (เป้า ≥1.2x) — ${Q>=70?"Billing ครบถ้วน ไม่มี Revenue Leakage ระบบ Charge ยาทำงานดี":Q>=40?"มี Gap เล็กน้อย ตรวจสอบยาที่ไม่ถูก Charge หรือ Charge ผิดราคา":"Revenue Leakage สูง ตรวจสอบ Interface Pharmacy-Billing ด่วน"}`,
          formula: "(Rev/Cost Ratio ÷ 1.2) × 80",
          target: "≥70 (Ratio ≥1.05x)"
        }],
        morningTotal: Le,
        afternoonTotal: we,
        nightTotal: Me,
        quarters: Te,
        genericGap: Math.max(0, 80 - i),
        potentialSavingPerMonth: i < 80 ? Math.round(n / 30 * (80 - i) / 100 * .3) : 0,
        potentialSavingPerYear: i < 80 ? Math.round(n * 12 / 30 * (80 - i) / 100 * .3) : 0,
        highUnitCostDrugs: o.map(s => {
          const g = s.value || s.total_value || 0,
            O = s.qty || s.total_qty || 1;
          return {
            ...s,
            unitCost: Math.round(g / O),
            pctOfTotal: Math.round(g / n * 100 * 10) / 10
          }
        }).filter(s => s.unitCost > 20).sort((s, g) => g.unitCost - s.unitCost).slice(0, 10),
        rxPerVisit: t.opd_rx > 0 && t.opd_value > 0 ? Math.round(t.opd_value / t.opd_rx) : 0,
        ipdCostPerCase: t.ipd_rx > 0 && t.ipd_value > 0 ? Math.round(t.ipd_value / t.ipd_rx) : 0,
        momentum: (() => {
          if (C.length < 4) return {
            direction: "ไม่มีข้อมูล",
            pct: 0
          };
          const s = C.slice(-3).reduce((de, pe) => de + pe, 0),
            g = C.slice(-6, -3).reduce((de, pe) => de + pe, 0),
            O = g > 0 ? Math.round((s - g) / g * 100) : 0;
          return {
            direction: O > 5 ? "เร่งตัว" : O > -5 ? "ทรงตัว" : "ชะลอตัว",
            pct: O,
            recent3: s,
            prev3: g
          }
        })(),
        genericDrugsInTop20: o.filter(s => s.generic_name && s.generic_name !== "").length,
        brandDrugsInTop20: o.filter(s => !s.generic_name || s.generic_name === "").length,
        totalRev: n,
        totalCost: a,
        gr: i,
        dcr: x,
        rcr: d,
        ppiScore: l
      }
    }, [c, v, D, L]),
    ee = K.total_prescriptions || 0,
    fe = K.opd_prescriptions || 0,
    ue = K.ipd_prescriptions || 0,
    me = K.total_value || 0,
    te = c?.drug_cost_per_rx || (ee > 0 ? Math.round(me / ee) : 0),
    ae = c?.generic_ratio ?? 0,
    se = c?.ppi ?? 0,
    ve = (c?.on_duty?.pharmacists?.length || 0) + (c?.on_duty?.staff?.length || 0);
  return c?.top_drugs_by_value?.[0]?.name?.substring(0, 20), e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    children: [e.jsx(Fe, {
      title: "AI Executive Quick Summary — เภสัชกรรม",
      subtitle: "Rx Volume · Generic Ratio · Cost per Rx · Margin",
      badge: "📐 Quick Summary",
      accentColor: "#10b981",
      headerGradient: "linear-gradient(135deg, rgba(16,185,129,.10), rgba(14,165,233,.05))",
      narrative: $e(_)
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "12px",
        marginBottom: "1rem"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          borderLeft: "5px solid " + L.urgencyColor,
          background: "linear-gradient(90deg, " + L.urgencyColor + "10 0%, transparent 100%)"
        },
        children: [e.jsx("div", {
          style: {
            fontSize: "32px",
            filter: "drop-shadow(0 0 8px rgba(0,0,0,0.1))"
          },
          children: "🤖"
        }), e.jsxs("div", {
          style: {
            flex: 1
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: L.urgencyColor,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              },
              children: "AI Pharmacy Diagnostics"
            }), e.jsx("span", {
              style: {
                padding: "2px 8px",
                borderRadius: "4px",
                background: L.urgencyColor,
                color: "white",
                fontSize: "12px",
                fontWeight: 900
              },
              children: L.urgencyLabel
            })]
          }), e.jsx("p", {
            style: {
              margin: "4px 0 0",
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--md-text-primary)"
            },
            children: B.pharmacyAnalytics ? "กำลังประมวลผลอัลกอริทึมวิเคราะห์..." : L.problems[0]?.title || "ระบบเภสัชกรรมดำเนินงานได้อย่างมีประสิทธิภาพสูงสุด"
          })]
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "14px 20px",
          textAlign: "center",
          minWidth: "150px"
        },
        children: [e.jsx("p", {
          style: {
            margin: 0,
            fontSize: "12px",
            fontWeight: 800,
            color: y.primary,
            textTransform: "uppercase"
          },
          children: "Drug Revenue YoY"
        }), e.jsxs("p", {
          style: {
            margin: "4px 0 0",
            fontSize: "22px",
            fontWeight: 900,
            color: L.yoyGrowth >= 0 ? "#10b981" : "#f43f5e"
          },
          children: [L.yoyGrowth >= 0 ? "↑" : "↓", " ", Math.abs(L.yoyGrowth).toFixed(1), "%"]
        })]
      })]
    }), e.jsx(Be, {
      metrics: [{
        label: "Total Rx",
        value: ee,
        unit: "Rx",
        status: ee > 0 ? "success" : "neutral",
        icon: "📋"
      }, {
        label: "OPD Rx",
        value: fe,
        unit: "Rx",
        status: fe > 0 ? "success" : "neutral",
        icon: "🏥"
      }, {
        label: "IPD Rx",
        value: ue,
        unit: "Rx",
        status: ue > 0 ? "success" : "neutral",
        icon: "🛏️"
      }, {
        label: "Total Value",
        value: me.toLocaleString(),
        unit: "บาท",
        status: "neutral",
        icon: "💰"
      }, {
        label: "Avg Cost/Rx",
        value: te,
        unit: "บาท",
        target: 500,
        status: te > 0 ? te <= 500 ? "success" : te <= 700 ? "warning" : "danger" : "neutral",
        icon: "📊"
      }, {
        label: "Generic Ratio",
        value: ae,
        unit: "%",
        target: 80,
        status: ae >= 80 ? "success" : ae >= 60 ? "warning" : "danger",
        icon: "💊"
      }, {
        label: "PPI Score",
        value: se,
        unit: "/100",
        target: 80,
        status: se >= 80 ? "success" : se >= 60 ? "warning" : "danger",
        icon: "🎯"
      }, {
        label: "Staff On-Duty",
        value: ve,
        unit: "คน",
        status: ve > 0 ? "success" : "neutral",
        icon: "👨‍⚕️"
      }]
    }), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px",
        marginTop: "8px"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, " + y.primary + ", " + y.secondary + ")",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💊 บุคลากรเภสัชกรรมที่ปฏิบัติหน้าที่วันนี้ (On-Duty)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: y.light,
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP Activity Logs"
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        },
        children: [e.jsxs("div", {
          style: {
            padding: "12px 16px",
            background: y.light,
            borderBottom: "1px solid " + y.border,
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
                fontSize: "18px"
              },
              children: "💊"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: y.primary
              },
              children: "เภสัชกร (ภก./ภญ.)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: y.primary,
              opacity: .8
            },
            children: c?.on_duty?.pharmacists?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "280px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: B.pharmacyAnalytics ? Array(3).fill(0).map((t, o) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, o)) : c?.on_duty?.pharmacists?.length > 0 ? c.on_duty.pharmacists.map((t, o) => {
            const n = new Date().getHours(),
              a = n < 12 && t.morning_count > 0 || n >= 12 && n < 17 && t.afternoon_count > 0 || n >= 17 && t.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: a ? "linear-gradient(135deg, " + y.primary + ", " + y.secondary + ")" : "rgba(0,0,0,0.05)",
                  color: a ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [(t.staff_name || "").replace(/ภก\.|ภญ\.|นภ\./g, "").trim().substring(0, 1) || "P", a && e.jsx("span", {
                  style: {
                    position: "absolute",
                    bottom: "-1px",
                    right: "-1px",
                    width: "8px",
                    height: "8px",
                    background: "#2dce89",
                    border: "1.5px solid #fff",
                    borderRadius: "50%"
                  }
                })]
              }), e.jsxs("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--md-text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  children: t.staff_name || "Unknown"
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "Pharmacist"
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "3px",
                    marginTop: "3px"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.morning_count > 0 ? y.primary : "#ccc"
                    },
                    children: ["🌅", t.morning_count || 0]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.afternoon_count > 0 ? "#fb6340" : "#ccc"
                    },
                    children: ["☀️", t.afternoon_count || 0]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.night_count > 0 ? "#1e293b" : "#ccc"
                    },
                    children: ["🌙", t.night_count || 0]
                  })]
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "right"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 900,
                    color: y.primary
                  },
                  children: t.prescriptions
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "Rx"
                })]
              })]
            }, o)
          }) : e.jsx("div", {
            style: {
              padding: "2rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: e.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "ไม่พบข้อมูลเภสัชกรวันนี้"
            })
          })
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "0",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        },
        children: [e.jsxs("div", {
          style: {
            padding: "12px 16px",
            background: "rgba(99,102,241,.05)",
            borderBottom: "1px solid rgba(99,102,241,.1)",
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
                fontSize: "18px"
              },
              children: "🏢"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#6366f1"
              },
              children: "เจ้าหน้าที่ห้องยา (Support)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#6366f1",
              opacity: .8
            },
            children: c?.on_duty?.staff?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "280px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: B.pharmacyAnalytics ? Array(3).fill(0).map((t, o) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, o)) : c?.on_duty?.staff?.length > 0 ? c.on_duty.staff.map((t, o) => {
            const n = new Date().getHours(),
              a = n < 12 && t.morning_count > 0 || n >= 12 && n < 17 && t.afternoon_count > 0 || n >= 17 && t.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: a ? "linear-gradient(135deg, #6366f1, #818cf8)" : "rgba(0,0,0,0.05)",
                  color: a ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.staff_name?.substring(0, 1) || "S", a && e.jsx("span", {
                  style: {
                    position: "absolute",
                    bottom: "-1px",
                    right: "-1px",
                    width: "8px",
                    height: "8px",
                    background: "#2dce89",
                    border: "1.5px solid #fff",
                    borderRadius: "50%"
                  }
                })]
              }), e.jsxs("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--md-text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  children: t.staff_name
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "3px",
                    marginTop: "3px"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.morning_count > 0 ? "#6366f1" : "#ccc"
                    },
                    children: ["🌅", t.morning_count || 0]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.afternoon_count > 0 ? "#fb6340" : "#ccc"
                    },
                    children: ["☀️", t.afternoon_count || 0]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.night_count > 0 ? "#1e293b" : "#ccc"
                    },
                    children: ["🌙", t.night_count || 0]
                  })]
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "right"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#6366f1"
                  },
                  children: t.prescriptions
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "Rx"
                })]
              })]
            }, o)
          }) : e.jsx("div", {
            style: {
              padding: "2rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: e.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "ไม่พบข้อมูลเจ้าหน้าที่วันนี้"
            })
          })
        })]
      })]
    }), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px",
        marginTop: "8px",
        flexWrap: "wrap"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #8b5cf6, #7c3aed)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💊 Top Drug Analysis"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(139,92,246,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP XE Data"
      }), oe && e.jsx("span", {
        style: {
          fontSize: "11px",
          color: "#8b5cf6",
          fontWeight: 700
        },
        children: "กำลังโหลด..."
      })]
    }), e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "-8px"
      },
      children: [e.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)"
        },
        children: "📅 ช่วงข้อมูล"
      }), e.jsx("input", {
        type: "date",
        value: G,
        onChange: t => ie(t.target.value),
        style: {
          padding: "4px 8px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "12px",
          fontWeight: 600,
          background: "var(--md-surface-2, #f8fafc)",
          color: "var(--md-text-primary)",
          outline: "none"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)"
        },
        children: "ถึง"
      }), e.jsx("input", {
        type: "date",
        value: H,
        onChange: t => ne(t.target.value),
        style: {
          padding: "4px 8px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "12px",
          fontWeight: 600,
          background: "var(--md-surface-2, #f8fafc)",
          color: "var(--md-text-primary)",
          outline: "none"
        }
      }), e.jsx("button", {
        onClick: () => {
          if (G && H) {
            const t = G < H ? G : H,
              o = G < H ? H : G;
            ie(t), ne(o), xe({
              start: t,
              end: o
            })
          }
        },
        disabled: !G || !H,
        style: {
          padding: "5px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
          color: "#fff",
          opacity: !G || !H ? .5 : 1
        },
        children: "โหลดข้อมูล"
      }), (E.start !== J || E.end !== Z) && e.jsx("button", {
        onClick: () => {
          ie(J), ne(Z), xe({
            start: J,
            end: Z
          })
        },
        style: {
          padding: "5px 10px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)",
          cursor: "pointer"
        },
        children: "รีเซ็ต"
      }), e.jsxs("span", {
        style: {
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600
        },
        children: [new Date(E.start).toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short",
          year: "2-digit"
        }), " — ", new Date(E.end).toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short",
          year: "2-digit"
        })]
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "24px"
        },
        children: [e.jsx("p", {
          style: {
            margin: "0 0 16px",
            fontSize: "15px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: "Top 20 ยา -- มูลค่าสูงสุด"
        }), e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          },
          children: [(D?.by_value || c?.top_drugs_by_value || []).slice(0, 20).map((t, o) => {
            const n = D?.by_value || c?.top_drugs_by_value || [],
              a = n[0]?.total_value || n[0]?.value || 1,
              i = t.total_value ?? t.value ?? 0,
              x = t.total_qty ?? t.qty ?? 0,
              d = t.visit_count ?? t.visits ?? 0,
              l = Math.round(i / a * 100);
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                background: "var(--md-surface)",
                borderRadius: "10px",
                border: "1px solid var(--md-border)"
              },
              children: [e.jsx("div", {
                style: {
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: y.light,
                  color: y.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "11px",
                  flexShrink: 0
                },
                children: o + 1
              }), e.jsxs("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  children: t.name || t.icode
                }), e.jsx("div", {
                  style: {
                    marginTop: "3px",
                    height: "3px",
                    borderRadius: "99px",
                    background: "var(--md-border)",
                    overflow: "hidden"
                  },
                  children: e.jsx("div", {
                    style: {
                      height: "100%",
                      width: l + "%",
                      background: "linear-gradient(90deg, " + y.primary + ", " + y.secondary + ")",
                      borderRadius: "99px",
                      transition: "width 0.5s ease"
                    }
                  })
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: [t.units, " | ", d.toLocaleString(), " visits · ", (t.patient_count ?? 0).toLocaleString(), " คน"]
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "right",
                  flexShrink: 0
                },
                children: [e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 800,
                    color: y.primary
                  },
                  children: [i.toLocaleString(), " บาท"]
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: [x.toLocaleString(), " หน่วย"]
                }), t.yoy_val_pct != null && e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "3px",
                    justifyContent: "flex-end",
                    marginTop: "2px"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 4px",
                      borderRadius: "4px",
                      background: t.yoy_val_pct >= 0 ? "rgba(16,185,129,.1)" : "rgba(244,63,94,.1)",
                      color: t.yoy_val_pct >= 0 ? "#10b981" : "#f43f5e"
                    },
                    children: [t.yoy_val_pct >= 0 ? "↑" : "↓", Math.abs(t.yoy_val_pct), "% vs ", D?.compare_periods?.prev1?.fy_label || `ปีงบ ${(X>=10?$:$-1)+543}`]
                  }), t.yoy2_val_pct != null && e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 4px",
                      borderRadius: "4px",
                      background: t.yoy2_val_pct >= 0 ? "rgba(14,165,233,.1)" : "rgba(244,63,94,.1)",
                      color: t.yoy2_val_pct >= 0 ? "#0ea5e9" : "#f43f5e"
                    },
                    children: [t.yoy2_val_pct >= 0 ? "↑" : "↓", Math.abs(t.yoy2_val_pct), "% vs ", D?.compare_periods?.prev2?.fy_label || `ปีงบ ${(X>=10?$:$-1)+542}`]
                  })]
                })]
              })]
            }, o)
          }), (D?.by_value || c?.top_drugs_by_value || []).length === 0 && !oe && !B.pharmacyAnalytics && e.jsx("div", {
            style: {
              textAlign: "center",
              padding: "2rem",
              color: "var(--md-text-tertiary)"
            },
            children: "ไม่มีข้อมูล"
          })]
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "24px"
        },
        children: [e.jsx("p", {
          style: {
            margin: "0 0 16px",
            fontSize: "15px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: "Top 20 ยา -- ปริมาณสูงสุด"
        }), e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          },
          children: [(D?.by_volume || c?.top_drugs_by_volume || []).slice(0, 20).map((t, o) => {
            const n = D?.by_volume || c?.top_drugs_by_volume || [],
              a = n[0]?.total_qty || n[0]?.qty || 1,
              i = t.total_qty ?? t.qty ?? 0,
              x = t.visit_count ?? t.visits ?? 0,
              d = Math.round(i / a * 100);
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                background: "var(--md-surface)",
                borderRadius: "10px",
                border: "1px solid var(--md-border)"
              },
              children: [e.jsx("div", {
                style: {
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: "rgba(139,92,246,0.08)",
                  color: "#8b5cf6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "11px",
                  flexShrink: 0
                },
                children: o + 1
              }), e.jsxs("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  children: t.name || t.icode
                }), e.jsx("div", {
                  style: {
                    marginTop: "3px",
                    height: "3px",
                    borderRadius: "99px",
                    background: "var(--md-border)",
                    overflow: "hidden"
                  },
                  children: e.jsx("div", {
                    style: {
                      height: "100%",
                      width: d + "%",
                      background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
                      borderRadius: "99px",
                      transition: "width 0.5s ease"
                    }
                  })
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: [t.units, " | ", x.toLocaleString(), " visits · ", (t.patient_count ?? 0).toLocaleString(), " คน"]
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "right",
                  flexShrink: 0
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#8b5cf6"
                  },
                  children: i.toLocaleString()
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "หน่วย"
                }), t.yoy_qty_pct != null && e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "3px",
                    justifyContent: "flex-end",
                    marginTop: "2px"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 4px",
                      borderRadius: "4px",
                      background: t.yoy_qty_pct >= 0 ? "rgba(16,185,129,.1)" : "rgba(244,63,94,.1)",
                      color: t.yoy_qty_pct >= 0 ? "#10b981" : "#f43f5e"
                    },
                    children: [t.yoy_qty_pct >= 0 ? "↑" : "↓", Math.abs(t.yoy_qty_pct), "% vs ", D?.compare_periods?.prev1?.fy_label || `ปีงบ ${(X>=10?$:$-1)+543}`]
                  }), t.yoy2_qty_pct != null && e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 4px",
                      borderRadius: "4px",
                      background: t.yoy2_qty_pct >= 0 ? "rgba(14,165,233,.1)" : "rgba(244,63,94,.1)",
                      color: t.yoy2_qty_pct >= 0 ? "#0ea5e9" : "#f43f5e"
                    },
                    children: [t.yoy2_qty_pct >= 0 ? "↑" : "↓", Math.abs(t.yoy2_qty_pct), "% vs ", D?.compare_periods?.prev2?.fy_label || `ปีงบ ${(X>=10?$:$-1)+542}`]
                  })]
                })]
              })]
            }, o)
          }), (D?.by_volume || c?.top_drugs_by_volume || []).length === 0 && !oe && !B.pharmacyAnalytics && e.jsx("div", {
            style: {
              textAlign: "center",
              padding: "2rem",
              color: "var(--md-text-tertiary)"
            },
            children: "ไม่มีข้อมูล"
          })]
        })]
      })]
    }), ye.length > 0 && e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "24px"
      },
      children: [e.jsx("p", {
        style: {
          margin: "0 0 20px",
          fontSize: "16px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "Prescription Volume Trend (6 เดือนย้อนหลัง)"
      }), e.jsx("div", {
        style: {
          height: "240px",
          width: "100%"
        },
        children: e.jsx(je, {
          width: "100%",
          height: "100%",
          children: e.jsxs(He, {
            data: ye,
            margin: {
              top: 10,
              right: 10,
              left: -10,
              bottom: 0
            },
            children: [e.jsx(Se, {
              strokeDasharray: "3 3",
              vertical: !1,
              stroke: "rgba(0,0,0,0.05)"
            }), e.jsx(_e, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fontWeight: 700,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(Re, {
              tick: {
                fontSize: 10,
                fontWeight: 600,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(ze, {
              cursor: {
                stroke: y.primary,
                strokeWidth: 1
              },
              contentStyle: {
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                padding: "12px"
              }
            }), e.jsx(Ee, {
              type: "monotone",
              dataKey: "prescriptions",
              name: "Prescriptions",
              stroke: y.primary,
              strokeWidth: 2.5,
              dot: {
                fill: y.primary,
                strokeWidth: 0,
                r: 4
              }
            })]
          })
        })
      })]
    }), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px",
        marginTop: "8px"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, " + y.primary + ", #059669)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💰 รายได้ยา — เปรียบเทียบปีงบประมาณ"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: y.light,
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP XE Data Intelligence"
      })]
    }), v?.fiscal_years && e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(" + Math.min(v.fiscal_years.length, 3) + ", 1fr)",
        gap: "12px",
        marginBottom: "12px"
      },
      children: v.fiscal_years.slice(-3).map((t, o) => {
        const n = o === v.fiscal_years.slice(-3).length - 1,
          i = ["#94a3b8", "#0ea5e9", "#10b981"][o] || "#10b981";
        return e.jsxs("div", {
          style: {
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid " + i + "30",
            background: i + "08",
            borderTop: "3px solid " + i
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "4px"
            },
            children: [e.jsx("div", {
              style: {
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: i
              }
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: i
              },
              children: t.fiscal_label
            }), n && e.jsx("span", {
              style: {
                fontSize: "10px",
                fontWeight: 800,
                color: "#fff",
                background: i,
                padding: "1px 6px",
                borderRadius: "99px",
                marginLeft: "auto"
              },
              children: "CURRENT"
            })]
          }), e.jsxs("p", {
            style: {
              margin: 0,
              fontSize: "22px",
              fontWeight: 900,
              color: i
            },
            children: [Math.round(t.total_revenue).toLocaleString(), " บาท"]
          }), e.jsxs("p", {
            style: {
              margin: 0,
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: [t.total_visits ? t.total_visits.toLocaleString() + " visits" : "Revenue Only", t.total_patients ? " · " + t.total_patients.toLocaleString() + " คน" : ""]
          })]
        }, o)
      })
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "24px"
      },
      children: (() => {
        const t = ["#94a3b8", "#0ea5e9", "#10b981"],
          o = ["#64748b", "#0284c7", "#059669"];
        return e.jsxs(e.Fragment, {
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px"
            },
            children: [e.jsxs("div", {
              children: [e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "16px",
                  fontWeight: 900,
                  color: "var(--md-text-primary)"
                },
                children: "รายได้ยา — เปรียบเทียบปีงบประมาณ"
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "เปรียบเทียบรายได้ยาปีงบประมาณปัจจุบันและย้อนหลัง"
              })]
            }), e.jsx("div", {
              style: {
                display: "flex",
                gap: "16px"
              },
              children: v?.fiscal_years?.map((n, a) => e.jsxs("div", {
                style: {
                  textAlign: "right"
                },
                children: [e.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: "flex-end"
                  },
                  children: [e.jsx("div", {
                    style: {
                      width: "10px",
                      height: "10px",
                      borderRadius: "3px",
                      background: t[a] || "#94a3b8"
                    }
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "12px",
                      fontWeight: 800,
                      color: o[a] || "#64748b"
                    },
                    children: n.fiscal_label
                  })]
                }), e.jsxs("p", {
                  style: {
                    margin: "2px 0 0",
                    fontSize: "15px",
                    fontWeight: 900,
                    color: o[a] || "#64748b"
                  },
                  children: [Math.round(n.total_revenue).toLocaleString(), " บาท"]
                })]
              }, a))
            })]
          }), v?.fiscal_years ? e.jsx("div", {
            style: {
              height: "320px",
              width: "100%"
            },
            children: e.jsx(je, {
              width: "100%",
              height: "100%",
              children: e.jsxs(Oe, {
                data: Ce,
                margin: {
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 0
                },
                children: [e.jsx(Se, {
                  strokeDasharray: "3 3",
                  vertical: !1,
                  stroke: "rgba(0,0,0,0.05)"
                }), e.jsx(_e, {
                  dataKey: "month",
                  tick: {
                    fontSize: 11,
                    fontWeight: 700,
                    fill: "var(--md-text-tertiary)"
                  },
                  axisLine: !1,
                  tickLine: !1
                }), e.jsx(Re, {
                  tick: {
                    fontSize: 10,
                    fontWeight: 600,
                    fill: "var(--md-text-tertiary)"
                  },
                  axisLine: !1,
                  tickLine: !1,
                  tickFormatter: n => (n / 1e6).toFixed(1) + "M"
                }), e.jsx(ze, {
                  cursor: {
                    fill: "rgba(16,185,129,0.05)"
                  },
                  contentStyle: {
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                    padding: "12px",
                    fontSize: "12px"
                  },
                  formatter: (n, a) => [Number(n).toLocaleString() + " บาท", a]
                }), v.fiscal_years.map((n, a) => e.jsx(qe, {
                  dataKey: "fy" + a,
                  name: n.fiscal_label,
                  fill: t[a] || "#94a3b8",
                  radius: [4, 4, 0, 0]
                }, a))]
              })
            })
          }) : e.jsx("div", {
            style: {
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed var(--md-border)",
              borderRadius: "24px"
            },
            children: e.jsxs("div", {
              style: {
                textAlign: "center"
              },
              children: [e.jsx("div", {
                style: {
                  fontSize: "32px",
                  marginBottom: "12px"
                },
                children: "📊"
              }), e.jsx("p", {
                style: {
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: B.pharmacyRevenueFiscal ? "Predictive Analytics is running..." : "Financial Data Stream Offline"
              })]
            })
          })]
        })
      })()
    }), v?.fiscal_years?.length >= 2 && (() => {
      const t = v.fiscal_years,
        o = t[t.length - 1],
        n = t[t.length - 2],
        a = t.length >= 3 ? t[0] : null,
        i = o.comparable_revenue || o.total_revenue || 0,
        x = n.comparable_revenue || n.total_revenue || 0,
        d = a && (a.comparable_revenue || a.total_revenue) || 0,
        l = x > 0 ? (i - x) / x * 100 : 0,
        u = d > 0 && a ? (x - d) / d * 100 : null,
        f = o.months?.filter(p => p.revenue > 0).length || 0,
        b = o.months?.filter(p => p.revenue > 0).map(p => p.month) || [],
        M = b.length > 0 ? `${b[0]}–${b[b.length-1]}` : "",
        W = f > 0 ? i / f : 0,
        j = Math.round(W * 12),
        z = n.total_revenue > 0 ? (j - n.total_revenue) / n.total_revenue * 100 : 0,
        T = (o.months || []).map((p, k) => {
          const A = n.months?.[k],
            le = A?.revenue > 0 ? (p.revenue - A.revenue) / A.revenue * 100 : null;
          return {
            month: p.month,
            latest: p.revenue,
            prev: A?.revenue || 0,
            yoy: le,
            hasData: p.revenue > 0
          }
        }).filter(p => p.hasData),
        I = [...T].sort((p, k) => (k.yoy || 0) - (p.yoy || 0))[0],
        m = [...T].sort((p, k) => (p.yoy || 0) - (k.yoy || 0))[0],
        R = c?.drug_cost_per_rx || 0,
        S = c?.generic_ratio || 0,
        C = c?.rev_cost_ratio || 0,
        q = c?.ppi || 0;
      return e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "24px",
          borderTop: "4px solid " + y.primary
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "24px"
            },
            children: "🧠"
          }), e.jsxs("div", {
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "16px",
                fontWeight: 900,
                color: "var(--md-text-primary)"
              },
              children: "AI Pharmacy Fiscal Intelligence"
            }), e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: ["วิเคราะห์ภาพรวมรายปีงบประมาณ · Comparable ", f, " เดือน (", M, ")"]
            })]
          }), e.jsxs("span", {
            style: {
              marginLeft: "auto",
              fontSize: "11px",
              fontWeight: 800,
              padding: "4px 12px",
              borderRadius: "99px",
              background: l >= 0 ? "rgba(16,185,129,.1)" : "rgba(244,63,94,.1)",
              color: l >= 0 ? "#10b981" : "#f43f5e"
            },
            children: ["YoY ", l >= 0 ? "+" : "", l.toFixed(1), "%"]
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: `repeat(${a?5:4}, 1fr)`,
            gap: "12px",
            marginBottom: "20px"
          },
          children: [{
            label: `${o.fiscal_label} (${f} ด.)`,
            value: `${Math.round(i).toLocaleString()} บาท`,
            sub: `${(o.comparable_visits||o.total_visits||0).toLocaleString()} visits · ${(o.total_patients||0).toLocaleString()} คน`,
            color: y.primary
          }, {
            label: `${n.fiscal_label} (${f} ด.)`,
            value: `${Math.round(x).toLocaleString()} บาท`,
            sub: `${(n.comparable_visits||n.total_visits||0).toLocaleString()} visits · ${(n.total_patients||0).toLocaleString()} คน`,
            color: "#0ea5e9"
          }, ...a ? [{
            label: `${a.fiscal_label} (${f} ด.)`,
            value: `${Math.round(d).toLocaleString()} บาท`,
            sub: `${(a.comparable_visits||a.total_visits||0).toLocaleString()} visits · ${(a.total_patients||0).toLocaleString()} คน`,
            color: "#94a3b8"
          }] : [], {
            label: "YoY Growth",
            value: `${l>=0?"+":""}${l.toFixed(1)}%`,
            sub: u != null ? `${a?.fiscal_label||"ปีก่อนหน้า"} → ${n.fiscal_label}: ${u>=0?"+":""}${u.toFixed(0)}%` : "—",
            color: l >= 0 ? "#10b981" : "#f43f5e"
          }, {
            label: "Projected ทั้งปี",
            value: `${Math.round(j).toLocaleString()} บาท`,
            sub: `${z>=0?"+":""}${z.toFixed(0)}% vs ${n.fiscal_label}`,
            color: "#8b5cf6"
          }].map((p, k) => e.jsxs("div", {
            style: {
              padding: "12px",
              borderRadius: "12px",
              background: p.color + "08",
              border: "1px solid " + p.color + "20"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "11px",
                fontWeight: 700,
                color: p.color,
                textTransform: "uppercase"
              },
              children: p.label
            }), e.jsx("p", {
              style: {
                margin: "4px 0 2px",
                fontSize: "20px",
                fontWeight: 900,
                color: p.color
              },
              children: p.value
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: p.sub
            })]
          }, k))
        }), e.jsxs("div", {
          style: {
            marginBottom: "20px"
          },
          children: [e.jsxs("p", {
            style: {
              margin: "0 0 10px",
              fontSize: "13px",
              fontWeight: 800,
              color: "var(--md-text-primary)"
            },
            children: ["📊 YoY รายเดือน — ", o.fiscal_label, " vs ", n.fiscal_label]
          }), e.jsx("div", {
            style: {
              display: "flex",
              gap: "4px",
              flexWrap: "wrap"
            },
            children: T.map((p, k) => {
              const A = p.yoy == null ? "#94a3b8" : p.yoy >= 10 ? "#10b981" : p.yoy >= 0 ? "#6ee7b7" : p.yoy >= -10 ? "#fbbf24" : "#f43f5e";
              return e.jsxs("div", {
                style: {
                  flex: "1 0 70px",
                  padding: "8px 6px",
                  borderRadius: "8px",
                  background: A + "15",
                  border: "1px solid " + A + "30",
                  textAlign: "center"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: p.month
                }), e.jsx("p", {
                  style: {
                    margin: "2px 0 0",
                    fontSize: "14px",
                    fontWeight: 900,
                    color: A
                  },
                  children: p.yoy != null ? `${p.yoy>=0?"+":""}${p.yoy.toFixed(0)}%` : "—"
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: [Math.round(p.latest).toLocaleString(), " บาท"]
                })]
              }, k)
            })
          })]
        }), e.jsxs("div", {
          style: {
            borderTop: "1px solid var(--md-border)",
            paddingTop: "16px"
          },
          children: [e.jsx("p", {
            style: {
              margin: "0 0 12px",
              fontSize: "13px",
              fontWeight: 800,
              color: "var(--md-text-primary)"
            },
            children: "🔥 AI วิเคราะห์เชิงลึก — Pharmacy Strategic Intelligence"
          }), e.jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            },
            children: [e.jsxs("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: l >= 5 ? "rgba(16,185,129,.06)" : l >= 0 ? "rgba(251,191,36,.06)" : "rgba(244,63,94,.06)",
                border: "1px solid " + (l >= 5 ? "#10b98130" : l >= 0 ? "#fbbf2430" : "#f43f5e30")
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
                    fontSize: "16px"
                  },
                  children: l >= 5 ? "📈" : l >= 0 ? "📊" : "📉"
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: ["Revenue Trend: ", l >= 10 ? "เติบโตแข็งแกร่ง" : l >= 5 ? "เติบโตดี" : l >= 0 ? "ทรงตัว" : l >= -10 ? "ชะลอตัว" : "หดตัว"]
                })]
              }), e.jsxs("p", {
                style: {
                  margin: "0 0 6px",
                  fontSize: "12px",
                  color: "var(--md-text-secondary)",
                  lineHeight: 1.5
                },
                children: ["รายได้ยา ", o.fiscal_label, " (", f, " เดือน) อยู่ที่ ", Math.round(i).toLocaleString(), " บาท ", l >= 0 ? "เพิ่มขึ้น" : "ลดลง", " ", Math.abs(l).toFixed(1), "% จาก ", n.fiscal_label, I && ` · เดือนที่ดีที่สุด: ${I.month} (${I.yoy>=0?"+":""}${I.yoy?.toFixed(0)}%)`, m && m.yoy < 0 && ` · ต่ำสุด: ${m.month} (${m.yoy?.toFixed(0)}%)`]
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  color: y.primary,
                  fontWeight: 700
                },
                children: ["💡 ", l >= 5 ? "รักษา momentum — เน้น Stock Management ให้เพียงพอในเดือนถัดไป" : l >= 0 ? "ทรงตัว — วิเคราะห์ยาที่ใช้สูงสุดและเจรจาต่อรองราคาเพื่อเพิ่ม margin" : "ลดลง — ตรวจสอบ Formulary และ Prescribing pattern ว่ามีการเปลี่ยนแปลง"]
              })]
            }), e.jsxs("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: S >= 60 ? "rgba(16,185,129,.06)" : "rgba(244,63,94,.06)",
                border: "1px solid " + (S >= 60 ? "#10b98130" : "#f43f5e30")
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
                    fontSize: "16px"
                  },
                  children: "💊"
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: ["Generic & Cost Efficiency: ", S >= 80 ? "ดีเยี่ยม" : S >= 60 ? "พอใช้" : S >= 40 ? "ต่ำกว่าเกณฑ์" : "วิกฤต"]
                })]
              }), e.jsxs("p", {
                style: {
                  margin: "0 0 6px",
                  fontSize: "12px",
                  color: "var(--md-text-secondary)",
                  lineHeight: 1.5
                },
                children: ["Generic Ratio ", S.toFixed(1), "% (เป้า ≥80%) · ต้นทุนยา ", R.toLocaleString(), " บาท/Rx (เป้า ≤500 บาท) · Rev/Cost ", C.toFixed(2), "x · PPI ", q, "/100", S < 80 && ` · ส่วนต่างจากเป้า: ${(80-S).toFixed(1)}% — หากเพิ่ม Generic ทุก 10% จะประหยัดต้นทุนยาประมาณ ${Math.round(i*.05/1e3)}K/เดือน`]
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  color: S >= 60 ? "#10b981" : "#f43f5e",
                  fontWeight: 700
                },
                children: ["💡 ", S >= 80 ? "ดีเยี่ยม — รักษาสัดส่วน Generic และ Monitor ยาใหม่ที่เข้า Formulary" : S >= 60 ? "ปรับปรุง — ประชุม PTC ทบทวน Formulary เพิ่มรายการ Generic" : "เร่งด่วน — กำหนดนโยบาย Generic First ทุกแผนก ภายใน 30 วัน ตั้งเป้า Generic ≥60% ใน Quarter หน้า"]
              })]
            }), e.jsxs("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: "rgba(139,92,246,.06)",
                border: "1px solid rgba(139,92,246,.15)"
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
                    fontSize: "16px"
                  },
                  children: "⚙️"
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: "Operational & Workload Intelligence"
                })]
              }), e.jsxs("p", {
                style: {
                  margin: "0 0 6px",
                  fontSize: "12px",
                  color: "var(--md-text-secondary)",
                  lineHeight: 1.5
                },
                children: ["จ่ายยาเฉลี่ย ", (c?.avg_daily_rx || 0).toFixed(0), " Rx/วัน · OPD ", (c?.opd_rx || 0).toLocaleString(), " Rx (30D) · IPD ", (c?.ipd_rx || 0).toLocaleString(), " Rx (30D)", c?.top_drugs_by_value?.[0] && ` · ยามูลค่าสูงสุด: ${c.top_drugs_by_value[0].name?.substring(0,25)} (฿${c.top_drugs_by_value[0].value?.toLocaleString()})`]
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  color: "#8b5cf6",
                  fontWeight: 700
                },
                children: ["💡 ", (c?.avg_daily_rx || 0) > 300 ? "Workload สูง — พิจารณาเพิ่มกำลังคนหรือ Automated Dispensing" : "ติดตาม Trend ปริมาณจ่ายยาเพื่อวางแผนกำลังคนและ Stock ล่วงหน้า"]
              })]
            }), e.jsxs("div", {
              style: {
                padding: "14px",
                borderRadius: "12px",
                background: "rgba(99,102,241,.06)",
                border: "1px solid rgba(99,102,241,.15)"
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
                    fontSize: "16px"
                  },
                  children: "🎯"
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: "Strategic Projection & Action Plan"
                })]
              }), e.jsxs("p", {
                style: {
                  margin: "0 0 6px",
                  fontSize: "12px",
                  color: "var(--md-text-secondary)",
                  lineHeight: 1.5
                },
                children: ["คาดการณ์รายได้ยาทั้งปี ", o.fiscal_label, ": ", Math.round(j).toLocaleString(), " บาท (", z >= 0 ? "+" : "", z.toFixed(0), "% vs ", n.fiscal_label, " ", Math.round(n.total_revenue).toLocaleString(), " บาท) · ค่าเฉลี่ย ", Math.round(W).toLocaleString(), " บาท/เดือน"]
              }), e.jsxs("div", {
                style: {
                  margin: "8px 0",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  background: "rgba(99,102,241,.08)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#6366f1",
                  lineHeight: 1.6
                },
                children: ["🚀 แผนยุทธศาสตร์:", e.jsx("br", {}), "(1) เพิ่ม Generic Ratio จาก ", S.toFixed(0), "% → 60% ภายใน Q2 — ลดต้นทุนยาโดยตรง", e.jsx("br", {}), "(2) ทบทวน Top 10 High-Cost Drug ทุกเดือน — หา Therapeutic Alternative ที่ถูกกว่า", e.jsx("br", {}), "(3) เพิ่ม Billing Accuracy — ตรวจสอบ Drug Charge ครบทุกรายการก่อน Discharge", e.jsx("br", {}), "(4) ติดตาม Rev/Cost Ratio ≥ 1.2x ทุกสัปดาห์ — ป้องกัน Revenue Leakage"]
              })]
            })]
          })]
        })]
      })
    })(), r && e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "24px",
        borderTop: "4px solid #6366f1"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px"
        },
        children: [e.jsx("span", {
          style: {
            fontSize: "24px"
          },
          children: "🏥"
        }), e.jsxs("div", {
          style: {
            flex: 1
          },
          children: [e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "16px",
              fontWeight: 900
            },
            children: "Pharmacy Financial Health Scorecard"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: "คะแนนสุขภาพทางการเงิน 5 มิติ · AI Composite Analysis"
          })]
        }), e.jsxs("div", {
          style: {
            textAlign: "center",
            padding: "8px 16px",
            borderRadius: "12px",
            background: r.healthOverall >= 70 ? "rgba(16,185,129,.1)" : r.healthOverall >= 45 ? "rgba(245,158,11,.1)" : "rgba(244,63,94,.1)",
            border: "2px solid " + (r.healthOverall >= 70 ? "#10b981" : r.healthOverall >= 45 ? "#f59e0b" : "#f43f5e")
          },
          children: [e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "28px",
              fontWeight: 900,
              color: r.healthOverall >= 70 ? "#10b981" : r.healthOverall >= 45 ? "#f59e0b" : "#f43f5e"
            },
            children: r.healthOverall
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: "/100"
          })]
        })]
      }), e.jsx("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "20px"
        },
        children: r.healthDimensions.map((t, o) => e.jsxs("div", {
          style: {
            padding: "10px 12px",
            borderRadius: "10px",
            background: t.color + "06",
            border: "1px solid " + t.color + "15"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "14px",
                width: "24px",
                textAlign: "center"
              },
              children: t.icon
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                flex: 1
              },
              children: t.label
            }), e.jsx("div", {
              style: {
                flex: 2,
                height: "8px",
                borderRadius: "99px",
                background: "var(--md-border)",
                overflow: "hidden"
              },
              children: e.jsx("div", {
                style: {
                  height: "100%",
                  width: t.score + "%",
                  background: t.color,
                  borderRadius: "99px",
                  transition: "width 0.5s"
                }
              })
            }), e.jsx("span", {
              style: {
                fontSize: "14px",
                fontWeight: 900,
                width: "40px",
                textAlign: "right",
                color: t.color
              },
              children: t.score
            })]
          }), t.desc && e.jsx("p", {
            style: {
              margin: "0 0 4px 34px",
              fontSize: "12px",
              color: "var(--md-text-secondary)",
              lineHeight: 1.5
            },
            children: t.desc
          }), t.formula && e.jsxs("div", {
            style: {
              marginLeft: "34px",
              display: "flex",
              gap: "12px",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: [e.jsxs("span", {
              children: ["📐 ", t.formula]
            }), e.jsxs("span", {
              children: ["🎯 ", t.target]
            })]
          })]
        }, o))
      }), e.jsxs("div", {
        style: {
          padding: "14px",
          borderRadius: "12px",
          background: r.dci > 50 ? "rgba(244,63,94,.06)" : "rgba(16,185,129,.06)",
          border: "1px solid " + (r.dci > 50 ? "#f43f5e30" : "#10b98130"),
          marginBottom: "12px"
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
              fontSize: "16px"
            },
            children: "🎲"
          }), e.jsxs("p", {
            style: {
              margin: 0,
              fontSize: "13px",
              fontWeight: 800
            },
            children: ["Drug Concentration Index (DCI): ", r.dci, "%"]
          }), e.jsx("span", {
            style: {
              fontSize: "10px",
              fontWeight: 800,
              padding: "2px 6px",
              borderRadius: "4px",
              background: r.dci <= 40 ? "#10b98120" : r.dci <= 60 ? "#f59e0b20" : "#f43f5e20",
              color: r.dci <= 40 ? "#10b981" : r.dci <= 60 ? "#f59e0b" : "#f43f5e"
            },
            children: r.dci <= 40 ? "กระจายตัวดี" : r.dci <= 60 ? "ค่อนข้างกระจุก" : "กระจุกตัวสูง"
          })]
        }), e.jsxs("p", {
          style: {
            margin: "0 0 6px",
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            lineHeight: 1.5
          },
          children: ["รายได้ยา Top 5 รายการ คิดเป็น ", r.dci, "% ของรายได้ยาทั้งหมด (", r.top5Val?.toLocaleString(), " จาก ", (c?.total_drug_revenue || 0).toLocaleString(), " บาท)", r.singleDrugRisks?.length > 0 && ` · ⚠️ ${r.singleDrugRisks.length} รายการ มีสัดส่วน >15% — เสี่ยงหากขาดสต็อก`]
        }), e.jsxs("p", {
          style: {
            margin: 0,
            fontSize: "12px",
            fontWeight: 700,
            color: r.dci <= 40 ? "#10b981" : "#f59e0b"
          },
          children: ["💡 ", r.dci <= 40 ? "ดี — Formulary มีความหลากหลาย ลดความเสี่ยง Supply Chain" : "ทบทวน Formulary — กระจายการใช้ยาให้หลากหลายขึ้น เจรจาสัญญาจัดซื้อระยะยาวกับ Supplier หลัก"]
        })]
      }), e.jsxs("div", {
        style: {
          padding: "14px",
          borderRadius: "12px",
          background: "rgba(139,92,246,.06)",
          border: "1px solid rgba(139,92,246,.15)",
          marginBottom: "12px"
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
              fontSize: "16px"
            },
            children: "👨‍⚕️"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "13px",
              fontWeight: 800
            },
            children: "Pharmacist Productivity & Workload"
          })]
        }), e.jsxs("p", {
          style: {
            margin: "0 0 6px",
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            lineHeight: 1.5
          },
          children: ["เภสัชกร ", r.pharCount, " คน · เจ้าหน้าที่ ", r.staffCount - r.pharCount, " คน · จ่ายยาเฉลี่ย ", (c?.avg_daily_rx || 0).toFixed(0), " Rx/วัน", r.pharCount > 0 && ` · ภาระงานเภสัชกร ${r.rxPerPhar} Rx/คน/วัน`, " ", "· Shift: เช้า ", r.morningTotal, " | บ่าย ", r.afternoonTotal, " | ค่ำ ", r.nightTotal, " รายการ"]
        }), e.jsxs("p", {
          style: {
            margin: 0,
            fontSize: "12px",
            fontWeight: 700,
            color: "#8b5cf6"
          },
          children: ["💡 ", r.rxPerPhar > 150 ? "⚠️ ภาระงานสูง — ควรเพิ่มเภสัชกรหรือใช้ Automated Dispensing Machine" : r.rxPerPhar > 100 ? "ภาระงานปานกลาง — ติดตามและจัดสรรเวรให้เหมาะสม" : "ภาระงานพอเหมาะ — ใช้เวลาว่างเพื่อ Drug Counseling และ MTM"]
        })]
      }), e.jsxs("div", {
        style: {
          padding: "14px",
          borderRadius: "12px",
          background: "rgba(14,165,233,.06)",
          border: "1px solid rgba(14,165,233,.15)",
          marginBottom: "12px"
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
              fontSize: "16px"
            },
            children: "🏥"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "13px",
              fontWeight: 800
            },
            children: "OPD / IPD Drug Revenue Mix (30D)"
          })]
        }), e.jsxs("div", {
          style: {
            display: "flex",
            gap: "8px",
            marginBottom: "8px"
          },
          children: [e.jsx("div", {
            style: {
              flex: 100 - r.ipdMixPct,
              height: "12px",
              borderRadius: "6px 0 0 6px",
              background: "#0ea5e9"
            }
          }), e.jsx("div", {
            style: {
              flex: Math.max(r.ipdMixPct, 1),
              height: "12px",
              borderRadius: "0 6px 6px 0",
              background: "#8b5cf6"
            }
          })]
        }), e.jsxs("p", {
          style: {
            margin: 0,
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            lineHeight: 1.5
          },
          children: ["OPD: ", r.opdVal?.toLocaleString(), " บาท (", 100 - r.ipdMixPct, "%) · IPD: ", r.ipdVal?.toLocaleString(), " บาท (", r.ipdMixPct, "%) · Revenue Stability (CV): ", r.volatility, "% ", r.volatility <= 15 ? "— เสถียร" : r.volatility <= 30 ? "— ปานกลาง" : "— ผันผวนสูง"]
        })]
      }), r.quarters?.length > 0 && r.quarters.some(t => t.rev > 0) && e.jsxs("div", {
        style: {
          padding: "14px",
          borderRadius: "12px",
          background: "rgba(99,102,241,.06)",
          border: "1px solid rgba(99,102,241,.15)"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "16px"
            },
            children: "📅"
          }), e.jsxs("p", {
            style: {
              margin: 0,
              fontSize: "13px",
              fontWeight: 800
            },
            children: ["Quarterly Performance — ", v?.fiscal_years?.[v.fiscal_years.length - 1]?.fiscal_label]
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px"
          },
          children: r.quarters.map((t, o) => {
            const n = Math.max(...r.quarters.map(i => i.rev)),
              a = n > 0 ? Math.round(t.rev / n * 100) : 0;
            return e.jsxs("div", {
              style: {
                textAlign: "center",
                padding: "10px 6px",
                borderRadius: "10px",
                background: t.rev > 0 ? "#6366f108" : "var(--md-surface)",
                border: "1px solid " + (t.rev > 0 ? "#6366f120" : "var(--md-border)")
              },
              children: [e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#6366f1"
                },
                children: t.label
              }), e.jsx("p", {
                style: {
                  margin: "4px 0 2px",
                  fontSize: "15px",
                  fontWeight: 900,
                  color: t.rev > 0 ? "#6366f1" : "var(--md-text-tertiary)"
                },
                children: t.rev > 0 ? Math.round(t.rev).toLocaleString() : "—"
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)"
                },
                children: t.rev > 0 ? "บาท" : "ยังไม่มีข้อมูล"
              }), t.rev > 0 && e.jsx("div", {
                style: {
                  marginTop: "4px",
                  height: "4px",
                  borderRadius: "99px",
                  background: "#e5e7eb"
                },
                children: e.jsx("div", {
                  style: {
                    height: "100%",
                    width: a + "%",
                    background: "#6366f1",
                    borderRadius: "99px"
                  }
                })
              })]
            }, o)
          })
        })]
      })]
    }), r && (r.surges?.length > 0 || r.declines?.length > 0) && (() => {
      const t = r.totalRev || 1,
        o = r.surges.reduce((i, x) => i + (x.total_value || x.value || 0), 0),
        n = r.declines.reduce((i, x) => i + (x.total_value || x.value || 0), 0),
        a = Math.min(10, Math.round(r.surges.filter(i => (i.yoy_qty_pct || i.yoy_val_pct || 0) > 200).length * 3 + r.surges.filter(i => (i.yoy_qty_pct || i.yoy_val_pct || 0) > 100).length * 1.5 + r.declines.length));
      return e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "24px",
          borderTop: "4px solid #f59e0b"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "24px"
            },
            children: "🔍"
          }), e.jsxs("div", {
            style: {
              flex: 1
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "16px",
                fontWeight: 900
              },
              children: "Drug Movement Anomaly Detection"
            }), e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: ["ตรวจจับยาที่มีการเปลี่ยนแปลงผิดปกติ · AI Pattern Recognition · ", r.surges.length + r.declines.length, " รายการ"]
            })]
          }), e.jsxs("div", {
            style: {
              textAlign: "center",
              padding: "6px 14px",
              borderRadius: "10px",
              background: a >= 7 ? "#f43f5e15" : a >= 4 ? "#f59e0b15" : "#10b98115",
              border: "1px solid " + (a >= 7 ? "#f43f5e30" : a >= 4 ? "#f59e0b30" : "#10b98130")
            },
            children: [e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "18px",
                fontWeight: 900,
                color: a >= 7 ? "#f43f5e" : a >= 4 ? "#f59e0b" : "#10b981"
              },
              children: [a, "/10"]
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "8px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "Supply Risk"
            })]
          })]
        }), e.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            marginBottom: "16px"
          },
          children: [e.jsxs("div", {
            style: {
              padding: "10px",
              borderRadius: "10px",
              background: "#f43f5e08",
              border: "1px solid #f43f5e15",
              textAlign: "center"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "20px",
                fontWeight: 900,
                color: "#f43f5e"
              },
              children: r.surges.length
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "#f43f5e"
              },
              children: "SURGE"
            })]
          }), e.jsxs("div", {
            style: {
              padding: "10px",
              borderRadius: "10px",
              background: "#0ea5e908",
              border: "1px solid #0ea5e915",
              textAlign: "center"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "20px",
                fontWeight: 900,
                color: "#0ea5e9"
              },
              children: r.declines.length
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "#0ea5e9"
              },
              children: "DECLINE"
            })]
          }), e.jsxs("div", {
            style: {
              padding: "10px",
              borderRadius: "10px",
              background: "#f59e0b08",
              border: "1px solid #f59e0b15",
              textAlign: "center"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "14px",
                fontWeight: 900,
                color: "#f59e0b"
              },
              children: o.toLocaleString()
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "#f59e0b"
              },
              children: "มูลค่า SURGE (บาท)"
            })]
          }), e.jsxs("div", {
            style: {
              padding: "10px",
              borderRadius: "10px",
              background: "#64748b08",
              border: "1px solid #64748b15",
              textAlign: "center"
            },
            children: [e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "14px",
                fontWeight: 900,
                color: "#64748b"
              },
              children: [Math.round((o + n) / t * 100), "%"]
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "#64748b"
              },
              children: "ของรายได้ยารวม"
            })]
          })]
        }), r.surges.length > 0 && e.jsxs("div", {
          style: {
            marginBottom: "16px"
          },
          children: [e.jsx("p", {
            style: {
              margin: "0 0 8px",
              fontSize: "13px",
              fontWeight: 800,
              color: "#f43f5e"
            },
            children: "🔴 ยาที่ใช้เพิ่มขึ้นผิดปกติ (SURGE)"
          }), e.jsx("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            },
            children: r.surges.slice(0, 10).map((i, x) => {
              const d = i.yoy_qty_pct || i.yoy_val_pct || 0,
                l = i.yoy2_qty_pct || i.yoy2_val_pct,
                u = i.total_qty || i.qty || 0,
                f = i.total_value || i.value || 0,
                b = i.prev1_qty || 0,
                M = i.visit_count || i.visits || 0,
                W = i.patient_count || 0,
                j = i.generic_name && i.generic_name !== "",
                z = Math.round(f / t * 100 * 10) / 10,
                T = u > 0 ? Math.round(f / u) : 0,
                I = d > 200 ? "วิกฤต" : d > 100 ? "สูงมาก" : "สูง",
                m = d > 200 ? "#dc2626" : d > 100 ? "#f43f5e" : "#f59e0b",
                R = d > 200 ? 9 : d > 100 ? 7 : 5;
              return e.jsxs("div", {
                style: {
                  padding: "14px",
                  borderRadius: "12px",
                  background: m + "05",
                  border: "1px solid " + m + "18"
                },
                children: [e.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 900,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: m,
                      color: "#fff"
                    },
                    children: ["SURGE ", I]
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      flex: 1
                    },
                    children: (i.name || i.icode)?.substring(0, 45)
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: m
                    },
                    children: ["↑", d, "%"]
                  })]
                }), e.jsx("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "6px",
                    marginBottom: "8px"
                  },
                  children: [{
                    label: "ปริมาณ",
                    value: u.toLocaleString(),
                    sub: i.units || "หน่วย"
                  }, {
                    label: "มูลค่า",
                    value: f.toLocaleString(),
                    sub: "บาท"
                  }, {
                    label: "ราคา/หน่วย",
                    value: T.toLocaleString(),
                    sub: "บาท"
                  }, {
                    label: "ผู้ป่วย",
                    value: (W || M).toLocaleString(),
                    sub: W > 0 ? "คน" : "visits"
                  }, {
                    label: "สัดส่วน",
                    value: z + "%",
                    sub: "ของรายได้รวม"
                  }].map((S, C) => e.jsxs("div", {
                    style: {
                      textAlign: "center",
                      padding: "4px",
                      borderRadius: "6px",
                      background: "var(--md-surface)"
                    },
                    children: [e.jsx("p", {
                      style: {
                        margin: 0,
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)"
                      },
                      children: S.value
                    }), e.jsx("p", {
                      style: {
                        margin: 0,
                        fontSize: "8px",
                        color: "var(--md-text-tertiary)"
                      },
                      children: S.sub
                    })]
                  }, C))
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "4px",
                    flexWrap: "wrap",
                    marginBottom: "6px"
                  },
                  children: [e.jsx("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: j ? "#10b98115" : "#8b5cf615",
                      color: j ? "#10b981" : "#8b5cf6"
                    },
                    children: j ? "Generic" : "Brand"
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: "#f59e0b15",
                      color: "#f59e0b"
                    },
                    children: ["Supply Risk: ", R, "/10"]
                  }), b > 0 && e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: "#64748b15",
                      color: "#64748b"
                    },
                    children: ["ปีก่อน: ", b.toLocaleString(), " หน่วย"]
                  }), l != null && e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: l >= 0 ? "#0ea5e915" : "#f43f5e15",
                      color: l >= 0 ? "#0ea5e9" : "#f43f5e"
                    },
                    children: ["2 ปีก่อน: ", l >= 0 ? "+" : "", l, "%"]
                  })]
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "11px",
                    color: m,
                    fontWeight: 700,
                    lineHeight: 1.6
                  },
                  children: ["🔍 ", d > 200 ? `วิกฤต: เพิ่มขึ้น ${d}% จากปีก่อน (${b.toLocaleString()} → ${u.toLocaleString()}) ${j?"":"⚠️ เป็นยา Brand — ควรหา Generic ทดแทนด่วน"} — สาเหตุที่เป็นไปได้: เปลี่ยน Protocol, โรคระบาด, ย้ายผู้ป่วยจาก รพ.อื่น` : d > 100 ? `สูงมาก: เพิ่มขึ้น ${d}% — ตรวจสอบว่าเกิดจาก Clinical Need จริงหรือ Over-prescribing ${T>50?"· ราคาต่อหน่วยสูง ("+T+" บาท) ควรเจรจาต่อรองราคา":""}` : `สูง: เพิ่มขึ้น ${d}% — ติดตามแนวโน้ม 3 เดือน ${z>5?"· สัดส่วนรายได้สูง ("+z+"%) — ควรมี Supplier สำรอง":""}`]
                }), e.jsxs("p", {
                  style: {
                    margin: "4px 0 0",
                    fontSize: "11px",
                    color: "#059669",
                    fontWeight: 700
                  },
                  children: ["💡 แนะนำ: ", d > 200 ? "(1) เพิ่ม Safety Stock 200% ทันที (2) เจรจา Supplier สำรอง (3) แจ้ง PCT ทบทวน Protocol" : d > 100 ? "(1) เพิ่ม Safety Stock 100% (2) ติดตาม demand รายสัปดาห์ (3) ตรวจสอบ Expiry ล็อตเก่า" : "(1) ปรับ Reorder Point ตาม 3M average (2) Monitor demand รายเดือน"]
                })]
              }, "s" + x)
            })
          })]
        }), r.declines.length > 0 && e.jsxs("div", {
          style: {
            marginBottom: "16px"
          },
          children: [e.jsx("p", {
            style: {
              margin: "0 0 8px",
              fontSize: "13px",
              fontWeight: 800,
              color: "#0ea5e9"
            },
            children: "🔵 ยาที่ใช้ลดลงผิดปกติ (DECLINE)"
          }), e.jsx("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            },
            children: r.declines.slice(0, 8).map((i, x) => {
              const d = Math.abs(i.yoy_qty_pct || i.yoy_val_pct || 0),
                l = i.yoy2_qty_pct || i.yoy2_val_pct,
                u = i.total_qty || i.qty || 0,
                f = i.total_value || i.value || 0,
                b = i.prev1_qty || 0,
                M = i.generic_name && i.generic_name !== "",
                W = u > 0 ? Math.round(f / u) : 0;
              return e.jsxs("div", {
                style: {
                  padding: "14px",
                  borderRadius: "12px",
                  background: "rgba(14,165,233,.05)",
                  border: "1px solid rgba(14,165,233,.18)"
                },
                children: [e.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px"
                  },
                  children: [e.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 900,
                      padding: "2px 8px",
                      borderRadius: "4px",
                      background: "#0ea5e9",
                      color: "#fff"
                    },
                    children: "DECLINE"
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      flex: 1
                    },
                    children: (i.name || i.icode)?.substring(0, 45)
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 900,
                      color: "#0ea5e9"
                    },
                    children: ["↓", d, "%"]
                  })]
                }), e.jsx("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "6px",
                    marginBottom: "8px"
                  },
                  children: [{
                    label: "ปริมาณ",
                    value: u.toLocaleString(),
                    sub: "หน่วย"
                  }, {
                    label: "มูลค่า",
                    value: f.toLocaleString(),
                    sub: "บาท"
                  }, {
                    label: "ราคา/หน่วย",
                    value: W.toLocaleString(),
                    sub: "บาท"
                  }, {
                    label: "ปีก่อน",
                    value: b.toLocaleString(),
                    sub: "หน่วย"
                  }].map((j, z) => e.jsxs("div", {
                    style: {
                      textAlign: "center",
                      padding: "4px",
                      borderRadius: "6px",
                      background: "var(--md-surface)"
                    },
                    children: [e.jsx("p", {
                      style: {
                        margin: 0,
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)"
                      },
                      children: j.value
                    }), e.jsx("p", {
                      style: {
                        margin: 0,
                        fontSize: "8px",
                        color: "var(--md-text-tertiary)"
                      },
                      children: j.sub
                    })]
                  }, z))
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "4px",
                    flexWrap: "wrap",
                    marginBottom: "6px"
                  },
                  children: [e.jsx("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: M ? "#10b98115" : "#8b5cf615",
                      color: M ? "#10b981" : "#8b5cf6"
                    },
                    children: M ? "Generic" : "Brand"
                  }), l != null && e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: "#64748b15",
                      color: "#64748b"
                    },
                    children: ["2 ปีก่อน: ", l >= 0 ? "+" : "", l, "%"]
                  }), e.jsx("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: "#0ea5e915",
                      color: "#0ea5e9"
                    },
                    children: "Inventory Risk: ยาค้างสต็อก"
                  })]
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "11px",
                    color: "#0ea5e9",
                    fontWeight: 700,
                    lineHeight: 1.6
                  },
                  children: ["🔍 ", d > 70 ? `ลดลงมาก ${d}% (${b.toLocaleString()} → ${u.toLocaleString()}) — สาเหตุ: Supply Shortage, เปลี่ยนยาทดแทน, หรือ Protocol เปลี่ยน — ตรวจสอบสต็อกคงเหลือ ป้องกันยาหมดอายุ` : `ลดลง ${d}% — อาจมี Generic/Alternative ใหม่ หรือ Prescribing Pattern เปลี่ยน — ลดปริมาณสั่งซื้อ ตรวจ Expiry Date`]
                }), e.jsxs("p", {
                  style: {
                    margin: "4px 0 0",
                    fontSize: "11px",
                    color: "#059669",
                    fontWeight: 700
                  },
                  children: ["💡 แนะนำ: (1) ลดปริมาณสั่งซื้อ ", Math.round(d / 2), "% (2) ตรวจสอบ Expiry Date ล็อตปัจจุบัน (3) ", d > 70 ? "พิจารณาตัดออกจาก Formulary หากไม่จำเป็น" : "ติดตาม demand อีก 1-2 เดือน"]
                })]
              }, "d" + x)
            })
          })]
        }), e.jsxs("div", {
          style: {
            padding: "16px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(245,158,11,.06), rgba(234,179,8,.03))",
            border: "1px solid rgba(245,158,11,.20)"
          },
          children: [e.jsx("p", {
            style: {
              margin: "0 0 8px",
              fontSize: "14px",
              fontWeight: 900,
              color: "#f59e0b"
            },
            children: "🧠 AI สรุปภาพรวมและแผนปฏิบัติการ"
          }), e.jsxs("p", {
            style: {
              margin: "0 0 10px",
              fontSize: "12px",
              color: "var(--md-text-secondary)",
              lineHeight: 1.6
            },
            children: ["ตรวจพบยา ", e.jsxs("strong", {
              style: {
                color: "#f43f5e"
              },
              children: [r.surges.length, " รายการ SURGE"]
            }), " (มูลค่ารวม ", o.toLocaleString(), " บาท)", r.declines.length > 0 && e.jsxs(e.Fragment, {
              children: [" และ ", e.jsxs("strong", {
                style: {
                  color: "#0ea5e9"
                },
                children: [r.declines.length, " รายการ DECLINE"]
              }), " (มูลค่า ", n.toLocaleString(), " บาท)"]
            }), " ", "· Supply Chain Risk Score: ", e.jsxs("strong", {
              style: {
                color: a >= 7 ? "#f43f5e" : a >= 4 ? "#f59e0b" : "#10b981"
              },
              children: [a, "/10"]
            })]
          }), e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px"
            },
            children: [e.jsxs("div", {
              style: {
                padding: "12px",
                borderRadius: "10px",
                background: "#f43f5e08",
                border: "1px solid #f43f5e15"
              },
              children: [e.jsx("p", {
                style: {
                  margin: "0 0 4px",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#f43f5e"
                },
                children: "🔴 แผนจัดการ SURGE"
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "11px",
                  color: "var(--md-text-secondary)",
                  lineHeight: 1.6
                },
                children: ["(1) ปรับ Safety Stock ยา SURGE ขึ้น 50-200%", e.jsx("br", {}), "(2) เจรจา Supplier สำรอง 2+ ราย", e.jsx("br", {}), "(3) ประชุม PCT ทบทวน Clinical Need", e.jsx("br", {}), "(4) Lock ราคาจัดซื้อล่วงหน้า 3-6 เดือน"]
              })]
            }), e.jsxs("div", {
              style: {
                padding: "12px",
                borderRadius: "10px",
                background: "#0ea5e908",
                border: "1px solid #0ea5e915"
              },
              children: [e.jsx("p", {
                style: {
                  margin: "0 0 4px",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#0ea5e9"
                },
                children: "🔵 แผนจัดการ DECLINE"
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "11px",
                  color: "var(--md-text-secondary)",
                  lineHeight: 1.6
                },
                children: ["(1) ลดปริมาณสั่งซื้อตาม demand จริง", e.jsx("br", {}), "(2) ตรวจ Expiry Date ป้องกันยาเสื่อม", e.jsx("br", {}), "(3) วิเคราะห์ว่ามียาทดแทนหรือไม่", e.jsx("br", {}), "(4) พิจารณาตัดจาก Formulary หากไม่ใช้"]
              })]
            })]
          })]
        })]
      })
    })(), r && e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "24px",
        borderTop: "4px solid #0f172a"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px"
        },
        children: [e.jsx("span", {
          style: {
            fontSize: "24px"
          },
          children: "🎯"
        }), e.jsxs("div", {
          children: [e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "16px",
              fontWeight: 900
            },
            children: "AI Executive Decision Intelligence"
          }), e.jsxs("p", {
            style: {
              margin: 0,
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: ["ข้อมูลสำหรับตัดสินใจเชิงนโยบาย · วิเคราะห์จาก ", (c?.opd_rx || 0) + (c?.ipd_rx || 0), " Rx (30 วัน)"]
          })]
        })]
      }), r.potentialSavingPerYear > 0 && e.jsxs("div", {
        style: {
          padding: "16px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(16,185,129,.08), rgba(5,150,105,.03))",
          border: "2px solid rgba(16,185,129,.2)",
          marginBottom: "14px"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "18px"
            },
            children: "💎"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "14px",
              fontWeight: 900,
              color: "#059669"
            },
            children: "โอกาสประหยัดต้นทุน (Cost Savings Opportunity)"
          })]
        }), e.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            marginBottom: "10px"
          },
          children: [e.jsxs("div", {
            style: {
              textAlign: "center",
              padding: "10px",
              borderRadius: "10px",
              background: "#10b98110"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "#059669"
              },
              children: "Generic Gap"
            }), e.jsxs("p", {
              style: {
                margin: "2px 0",
                fontSize: "22px",
                fontWeight: 900,
                color: "#059669"
              },
              children: [r.genericGap.toFixed(0), "%"]
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                color: "var(--md-text-tertiary)"
              },
              children: "ส่วนต่างจากเป้า 80%"
            })]
          }), e.jsxs("div", {
            style: {
              textAlign: "center",
              padding: "10px",
              borderRadius: "10px",
              background: "#10b98110"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "#059669"
              },
              children: "ประหยัดได้/เดือน"
            }), e.jsx("p", {
              style: {
                margin: "2px 0",
                fontSize: "22px",
                fontWeight: 900,
                color: "#059669"
              },
              children: r.potentialSavingPerMonth.toLocaleString()
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                color: "var(--md-text-tertiary)"
              },
              children: "บาท (ประมาณ)"
            })]
          }), e.jsxs("div", {
            style: {
              textAlign: "center",
              padding: "10px",
              borderRadius: "10px",
              background: "#10b98110"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "#059669"
              },
              children: "ประหยัดได้/ปี"
            }), e.jsx("p", {
              style: {
                margin: "2px 0",
                fontSize: "22px",
                fontWeight: 900,
                color: "#059669"
              },
              children: r.potentialSavingPerYear.toLocaleString()
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                color: "var(--md-text-tertiary)"
              },
              children: "บาท (ประมาณ)"
            })]
          })]
        }), e.jsxs("p", {
          style: {
            margin: 0,
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            lineHeight: 1.6
          },
          children: ["📐 ", e.jsx("strong", {
            children: "สูตร:"
          }), " (Generic Gap ", r.genericGap.toFixed(0), "%) × Drug Revenue × 30% (ส่วนต่างราคา Brand vs Generic เฉลี่ย) — หากเพิ่ม Generic จาก ", r.gr?.toFixed(0), "% เป็น 80% จะประหยัดต้นทุนยาได้ประมาณ ", r.potentialSavingPerYear.toLocaleString(), " บาท/ปี"]
        })]
      }), r.highUnitCostDrugs?.length > 0 && e.jsxs("div", {
        style: {
          padding: "14px",
          borderRadius: "12px",
          background: "rgba(245,158,11,.06)",
          border: "1px solid rgba(245,158,11,.20)",
          marginBottom: "14px"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "16px"
            },
            children: "💰"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "13px",
              fontWeight: 800
            },
            children: "High Unit Cost Drug — ยาราคาต่อหน่วยสูง"
          }), e.jsxs("span", {
            style: {
              fontSize: "10px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "4px",
              background: "#f59e0b20",
              color: "#f59e0b"
            },
            children: [r.highUnitCostDrugs.length, " รายการ"]
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "6px",
            marginBottom: "8px"
          },
          children: r.highUnitCostDrugs.slice(0, 6).map((t, o) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 10px",
              borderRadius: "8px",
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [e.jsxs("span", {
              style: {
                fontSize: "11px",
                fontWeight: 900,
                color: "#f59e0b",
                width: "20px"
              },
              children: ["#", o + 1]
            }), e.jsxs("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: [e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "11px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                },
                children: (t.name || t.icode)?.substring(0, 30)
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)"
                },
                children: [t.pctOfTotal, "% ของรายได้รวม"]
              })]
            }), e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#f59e0b"
              },
              children: [t.unitCost.toLocaleString(), " บาท/หน่วย"]
            })]
          }, o))
        }), e.jsx("p", {
          style: {
            margin: 0,
            fontSize: "11px",
            color: "#d97706",
            fontWeight: 700,
            lineHeight: 1.5
          },
          children: "💡 ยาราคาสูงควร: (1) เจรจาต่อรองราคากับ Supplier หลายราย (2) ตรวจสอบ Therapeutic Alternative ที่ถูกกว่า (3) กำหนด Prior Authorization สำหรับยาราคาสูงเกิน 100 บาท/หน่วย (4) ติดตาม Stock Level ใกล้ชิดเพราะมูลค่าสูง"
        })]
      }), e.jsxs("div", {
        style: {
          padding: "14px",
          borderRadius: "12px",
          background: "rgba(99,102,241,.06)",
          border: "1px solid rgba(99,102,241,.15)",
          marginBottom: "14px"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "16px"
            },
            children: "📈"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "13px",
              fontWeight: 800
            },
            children: "Revenue Momentum & Trend Analysis"
          }), e.jsxs("span", {
            style: {
              fontSize: "10px",
              fontWeight: 800,
              padding: "2px 8px",
              borderRadius: "4px",
              background: r.momentum.pct > 5 ? "#10b98120" : r.momentum.pct > -5 ? "#f59e0b20" : "#f43f5e20",
              color: r.momentum.pct > 5 ? "#10b981" : r.momentum.pct > -5 ? "#f59e0b" : "#f43f5e"
            },
            children: [r.momentum.direction, " ", r.momentum.pct > 0 ? "+" : "", r.momentum.pct, "%"]
          })]
        }), e.jsxs("p", {
          style: {
            margin: "0 0 8px",
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            lineHeight: 1.6
          },
          children: ["เปรียบเทียบ 3 เดือนล่าสุด (", r.momentum.recent3?.toLocaleString() || 0, " บาท) vs 3 เดือนก่อนหน้า (", r.momentum.prev3?.toLocaleString() || 0, " บาท) · ค่าเฉลี่ยรายได้ยา ", Math.round(r.trendMean).toLocaleString(), " บาท/เดือน · ความผันผวน (CV) ", r.volatility, "%"]
        }), e.jsxs("p", {
          style: {
            margin: 0,
            fontSize: "11px",
            fontWeight: 700,
            color: "#6366f1",
            lineHeight: 1.6
          },
          children: ["🔍 ", r.momentum.pct > 10 ? "Momentum แข็งแกร่ง — demand เพิ่มขึ้นต่อเนื่อง ควรเพิ่ม Safety Stock ยาหลัก 20% และเจรจาสัญญาจัดซื้อระยะยาวเพื่อ lock ราคา" : r.momentum.pct > 0 ? "Momentum ทรงตัว — เติบโตเล็กน้อย ยังไม่ต้องปรับกลยุทธ์ แต่ติดตาม demand ยาเรื้อรัง (DM, HT) ใกล้ชิด" : r.momentum.pct > -10 ? "Momentum ชะลอตัวเล็กน้อย — ตรวจสอบว่ามียา Shortage หรือผู้ป่วยลดลง และปรับปริมาณสั่งซื้อตาม demand จริง" : "Momentum ชะลอตัวมาก — วิเคราะห์สาเหตุเร่งด่วน: (1) ผู้ป่วยลดลง? (2) เปลี่ยน Prescribing Pattern? (3) ยาขาดสต็อก? ควรประชุม PCT ทันที"]
        })]
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          marginBottom: "14px"
        },
        children: [{
          label: "OPD Drug/Visit",
          value: r.rxPerVisit?.toLocaleString() + " บาท",
          icon: "🏥",
          desc: "ค่ายาเฉลี่ยต่อ Visit OPD",
          color: "#0ea5e9"
        }, {
          label: "IPD Drug/Case",
          value: r.ipdCostPerCase?.toLocaleString() + " บาท",
          icon: "🛏️",
          desc: "ค่ายาเฉลี่ยต่อ Case IPD",
          color: "#8b5cf6"
        }, {
          label: "Generic ใน Top20",
          value: r.genericDrugsInTop20 + "/" + (r.genericDrugsInTop20 + r.brandDrugsInTop20),
          icon: "💊",
          desc: "ยาสามัญในรายการยอดนิยม",
          color: "#10b981"
        }, {
          label: "Rx/เภสัชกร/วัน",
          value: r.rxPerPhar || "—",
          icon: "👨‍⚕️",
          desc: r.pharCount + " เภสัชกรปฏิบัติงาน",
          color: "#f59e0b"
        }].map((t, o) => e.jsxs("div", {
          style: {
            padding: "12px",
            borderRadius: "12px",
            background: t.color + "08",
            border: "1px solid " + t.color + "20",
            textAlign: "center"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "16px"
            },
            children: t.icon
          }), e.jsx("p", {
            style: {
              margin: "4px 0 2px",
              fontSize: "16px",
              fontWeight: 900,
              color: t.color
            },
            children: t.value
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "10px",
              fontWeight: 700,
              color: t.color
            },
            children: t.label
          }), e.jsx("p", {
            style: {
              margin: "2px 0 0",
              fontSize: "8px",
              color: "var(--md-text-tertiary)"
            },
            children: t.desc
          })]
        }, o))
      }), e.jsxs("div", {
        style: {
          padding: "16px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(15,23,42,.04), rgba(30,41,59,.02))",
          border: "1px solid rgba(15,23,42,.1)"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "18px"
            },
            children: "🧭"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "14px",
              fontWeight: 900
            },
            children: "Strategic Decision Matrix — แผนปฏิบัติการเภสัชกรรม"
          }), e.jsxs("p", {
            style: {
              margin: 0,
              fontSize: "11px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: ["ประมวลผล: ", new Date().toLocaleDateString("th-TH", {
              day: "numeric",
              month: "long",
              year: "numeric"
            }), " เวลา ", new Date().toLocaleTimeString("th-TH", {
              hour: "2-digit",
              minute: "2-digit"
            }), " น."]
          })]
        }), e.jsx("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          },
          children: [{
            priority: 1,
            area: "Generic First Policy",
            status: r.gr >= 60 ? "progress" : "critical",
            action: `เพิ่ม Generic จาก ${r.gr?.toFixed(0)}% → 60% (Phase 1) → 80% (Phase 2)`,
            impact: `ประหยัด ~${r.potentialSavingPerMonth?.toLocaleString()||0} บาท/เดือน`,
            timeline: "ภายใน 90 วัน",
            owner: "PTC + หัวหน้ากลุ่มงานเภสัชกรรม"
          }, {
            priority: 2,
            area: "High-Cost Drug Review",
            status: r.highUnitCostDrugs?.length > 5 ? "warning" : "ok",
            action: `ทบทวนยาราคาสูง ${r.highUnitCostDrugs?.length||0} รายการ หา Alternative`,
            impact: "ลดต้นทุนยา 10-15% ต่อรายการ",
            timeline: "ทุกเดือน",
            owner: "PCT + เภสัชกร"
          }, {
            priority: 3,
            area: "Supply Chain Risk",
            status: r.dci > 50 ? "warning" : "ok",
            action: `DCI ${r.dci}% — ${r.dci>50?"กระจาย Supplier ลดความเสี่ยง":"ยอมรับได้ ติดตามต่อ"}`,
            impact: "ป้องกัน Drug Shortage 99%",
            timeline: "ต่อเนื่อง",
            owner: "จัดซื้อ + เภสัชกร"
          }, {
            priority: 4,
            area: "Billing Accuracy",
            status: r.rcr < 1.1 ? "critical" : "ok",
            action: `Rev/Cost ${r.rcr?.toFixed(2)}x — ${r.rcr<1.1?"ตรวจสอบ Missing Charge ทุกสัปดาห์":"รักษามาตรฐาน Audit รายเดือน"}`,
            impact: "เพิ่ม Revenue 5-10%",
            timeline: "ทุกสัปดาห์",
            owner: "เภสัชกร + การเงิน"
          }, {
            priority: 5,
            area: "Workforce Planning",
            status: r.rxPerPhar > 120 ? "warning" : "ok",
            action: `${r.rxPerPhar} Rx/เภสัชกร — ${r.rxPerPhar>120?"ภาระงานสูง พิจารณาเพิ่มกำลังคน":"ภาระงานเหมาะสม จัดสรรเวรตาม Peak Hour"}`,
            impact: "ลด Dispensing Error + Burnout",
            timeline: "ทุกไตรมาส",
            owner: "หัวหน้ากลุ่มงาน"
          }].map((t, o) => {
            const n = t.status === "critical" ? "#f43f5e" : t.status === "warning" ? "#f59e0b" : t.status === "progress" ? "#0ea5e9" : "#10b981",
              a = t.status === "critical" ? "เร่งด่วน" : t.status === "warning" ? "ติดตาม" : t.status === "progress" ? "ดำเนินการ" : "ปกติ";
            return e.jsxs("div", {
              style: {
                display: "flex",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "10px",
                background: n + "06",
                border: "1px solid " + n + "15"
              },
              children: [e.jsx("div", {
                style: {
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: n + "15",
                  color: n,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "12px",
                  flexShrink: 0
                },
                children: t.priority
              }), e.jsxs("div", {
                style: {
                  flex: 1
                },
                children: [e.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "4px"
                  },
                  children: [e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800
                    },
                    children: t.area
                  }), e.jsx("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      padding: "1px 6px",
                      borderRadius: "4px",
                      background: n,
                      color: "#fff"
                    },
                    children: a
                  })]
                }), e.jsx("p", {
                  style: {
                    margin: "0 0 3px",
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    lineHeight: 1.4
                  },
                  children: t.action
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "12px",
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: [e.jsxs("span", {
                    children: ["📊 ผลลัพธ์: ", t.impact]
                  }), e.jsxs("span", {
                    children: ["⏰ ", t.timeline]
                  }), e.jsxs("span", {
                    children: ["👤 ", t.owner]
                  })]
                })]
              })]
            }, o)
          })
        })]
      })]
    }), e.jsx(Ge, {
      data: _.pharmacyAI,
      theme: "pharmacy",
      title: "AI Pharmacy Intelligence"
    }), e.jsx("div", {
      style: {
        textAlign: "center",
        opacity: .3,
        padding: "16px 0"
      },
      children: e.jsx("p", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "var(--md-text-tertiary)",
          textTransform: "uppercase",
          margin: 0
        },
        children: "BCH Pharmacy Intelligence | Protocol v10.5 | Advanced AI Analytics"
      })
    })]
  })
}
const Ke = F.memo(Ye);
export {
  Ke as
  default
};