import {
  R as F,
  r as _,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  b as N,
  a as W,
  E as z,
  v as L,
  M as E,
  S as j,
  g as q,
  K as O,
  h as B
} from "./shared-ui-OVDEF1.js";
import "./index-DK7pcb85.js";
import {
  R as C,
  g as Q,
  a as D,
  X as $,
  Y as k,
  T as R,
  L as M,
  d as U,
  b as v,
  c as K,
  B as Y,
  h as G,
  i as V,
  j as J,
  k as X,
  l as Z
} from "./vendor-charts-C5q2M-g3.js";
const a = {
    primary: "#e11d48",
    secondary: "#be123c",
    light: "#fff1f2",
    green: "#10b981",
    yellow: "#f59e0b",
    blue: "#3b82f6",
    purple: "#8b5cf6",
    gray: "#6b7280"
  },
  S = (r, o = 1) => r == null ? "—" : Number(r).toFixed(o),
  c = (r, o = 1) => r == null ? "—" : `${Number(r).toFixed(o)}%`,
  T = (r, o) => e.jsx("span", {
    style: {
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: 99,
      fontSize: 10,
      fontWeight: 700,
      background: o + "20",
      color: o,
      border: `1px solid ${o}40`,
      marginLeft: 4
    },
    children: r
  });

function ee({
  value: r
}) {
  const o = r ?? 0,
    m = o >= 85 ? a.green : o >= 70 ? a.yellow : a.primary,
    y = o >= 85 ? "ผ่านมาตรฐาน HA" : o >= 70 ? "ต้องปรับปรุง" : "ต่ำกว่ามาตรฐาน",
    g = 2 * Math.PI * 52,
    h = g - o / 100 * g;
  return e.jsxs("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8
    },
    children: [e.jsxs("svg", {
      width: 140,
      height: 140,
      viewBox: "0 0 140 140",
      children: [e.jsx("circle", {
        cx: 70,
        cy: 70,
        r: 52,
        fill: "none",
        stroke: "#f3f4f6",
        strokeWidth: 12
      }), e.jsx("circle", {
        cx: 70,
        cy: 70,
        r: 52,
        fill: "none",
        stroke: m,
        strokeWidth: 12,
        strokeDasharray: g,
        strokeDashoffset: h,
        strokeLinecap: "round",
        transform: "rotate(-90 70 70)",
        style: {
          transition: "stroke-dashoffset 1s ease"
        }
      }), e.jsx("text", {
        x: 70,
        y: 64,
        textAnchor: "middle",
        fontSize: 28,
        fontWeight: 800,
        fill: m,
        children: o.toFixed(0)
      }), e.jsx("text", {
        x: 70,
        y: 82,
        textAnchor: "middle",
        fontSize: 11,
        fill: a.gray,
        children: "QPI Score"
      })]
    }), e.jsx("span", {
      style: {
        padding: "4px 14px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 700,
        background: m + "18",
        color: m,
        border: `1px solid ${m}40`
      },
      children: y
    })]
  })
}

function ae({
  domains: r
}) {
  const o = [{
    domain: "PCT",
    score: r?.pct ?? 0
  }, {
    domain: "IC",
    score: r?.ic ?? 0
  }, {
    domain: "MED",
    domain_full: "MED",
    score: r?.med ?? 0
  }, {
    domain: "ENV",
    score: r?.env ?? 0
  }, {
    domain: "IM",
    score: r?.im ?? 0
  }];
  return e.jsx(C, {
    width: "100%",
    height: 220,
    children: e.jsxs(G, {
      data: o,
      cx: "50%",
      cy: "50%",
      outerRadius: 80,
      children: [e.jsx(V, {
        stroke: "#f1f5f9"
      }), e.jsx(J, {
        dataKey: "domain",
        tick: {
          fontSize: 11,
          fontWeight: 700,
          fill: a.gray
        }
      }), e.jsx(X, {
        angle: 90,
        domain: [0, 100],
        tick: {
          fontSize: 9
        }
      }), e.jsx(Z, {
        name: "Score",
        dataKey: "score",
        stroke: a.primary,
        fill: a.primary,
        fillOpacity: .2,
        strokeWidth: 2
      }), e.jsx(R, {
        formatter: m => [`${m.toFixed(1)}`, "คะแนน"]
      })]
    })
  })
}

function A({
  code: r,
  name_th: o,
  desc: m,
  score: y,
  color: g,
  indicators: h = []
}) {
  const x = g || a.primary,
    f = y >= 85 ? {
      label: "ดี",
      bg: a.green
    } : y >= 70 ? {
      label: "พอใช้",
      bg: a.yellow
    } : {
      label: "ต้องปรับ",
      bg: a.primary
    };
  return e.jsxs("div", {
    className: "glass-card",
    style: {
      padding: "1rem 1.25rem",
      borderLeft: `4px solid ${x}`
    },
    children: [e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8
      },
      children: [e.jsxs("div", {
        children: [e.jsx("span", {
          style: {
            fontWeight: 800,
            fontSize: 13,
            color: x
          },
          children: r
        }), e.jsx("span", {
          style: {
            fontWeight: 600,
            fontSize: 12,
            color: a.gray,
            marginLeft: 6
          },
          children: o
        })]
      }), e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 6
        },
        children: [e.jsx("span", {
          style: {
            fontWeight: 800,
            fontSize: 18,
            color: x
          },
          children: y?.toFixed(1) ?? "—"
        }), e.jsx("span", {
          style: {
            fontSize: 10,
            color: a.gray
          },
          children: "/100"
        }), T(f.label, f.bg)]
      })]
    }), e.jsx("p", {
      style: {
        fontSize: 10,
        color: a.gray,
        marginBottom: 8
      },
      children: m
    }), h.length > 0 && e.jsx("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 4
      },
      children: h.map((t, n) => e.jsxs("span", {
        style: {
          fontSize: 10,
          padding: "2px 8px",
          borderRadius: 99,
          background: t.alert ? a.primary + "15" : "#f3f4f6",
          color: t.alert ? a.primary : a.gray,
          border: `1px solid ${t.alert?a.primary+"40":"#e5e7eb"}`
        },
        children: [t.label, ": ", e.jsx("strong", {
          children: t.value
        })]
      }, n))
    })]
  })
}
const te = [{
  label: "QPI Score",
  thLabel: "ดัชนีคุณภาพโดยรวม (QPI)",
  icon: "⭐",
  color: a.primary,
  meaning: "ดัชนีชี้วัดคุณภาพโดยรวมของโรงพยาบาล คำนวณจาก 5 มิติ HA Thailand",
  calc: "Readmit×0.28 + Mortality×0.28 + AMA×0.16 + HAI×0.16 + DchPlan×0.12",
  target: "≥ 85 คะแนน",
  benchmark: "≥ 85 = ผ่านมาตรฐาน HA, ≥ 70 = ต้องปรับปรุง",
  dataSource: "ipt, an_stat, iptdiag, ovst",
  period: "Real-time",
  _key: "qpi_score",
  _fmt: r => `${Number(r).toFixed(0)}`,
  _sub: r => Number(r) >= 85 ? "ผ่านมาตรฐาน" : Number(r) >= 70 ? "ต้องปรับปรุง" : "ต่ำกว่ามาตรฐาน"
}, {
  label: "Readmission Rate (PCT)",
  thLabel: "อัตรา Readmission 28 วัน",
  icon: "🔄",
  color: a.secondary,
  meaning: "อัตราผู้ป่วยกลับเข้ารักษาซ้ำภายใน 28 วัน หลังจำหน่าย",
  calc: "(Readmit ≤28d / จำหน่ายทั้งหมด) × 100",
  target: "< 5%",
  benchmark: "HA Standard: < 5%, ดีเลิศ: < 3%",
  dataSource: "ipt (self-join)",
  period: "90 วันล่าสุด",
  _key: "readmit_rate",
  _fmt: r => `${Number(r).toFixed(2)}%`,
  _sub: r => Number(r) <= 3 ? "ดีเลิศ" : Number(r) <= 5 ? "ผ่านมาตรฐาน" : "เกินมาตรฐาน"
}, {
  label: "Mortality Rate (PCT)",
  thLabel: "อัตราผู้เสียชีวิตใน รพ.",
  icon: "💔",
  color: "#7c3aed",
  meaning: "อัตราผู้เสียชีวิตในโรงพยาบาล (dchtype = 09) ต่อผู้จำหน่ายทั้งหมด",
  calc: "(ผู้เสียชีวิต / ผู้จำหน่าย) × 100",
  target: "< 2%",
  benchmark: "HA Standard: < 2%, ICU < 15%",
  dataSource: "ipt (dchtype)",
  period: "30 วันล่าสุด",
  _key: "mortality_rate",
  _fmt: r => `${Number(r).toFixed(2)}%`,
  _sub: r => Number(r) <= 2 ? "ผ่านมาตรฐาน" : "เกินมาตรฐาน"
}, {
  label: "HAI Rate (IC Domain)",
  thLabel: "อัตราติดเชื้อในโรงพยาบาล (HAI)",
  icon: "🦠",
  color: a.yellow,
  meaning: "อัตราการติดเชื้อในโรงพยาบาล (Hospital Acquired Infection) ตรวจพบจาก secondary ICD-10",
  calc: "(HAI cases / LOS > 2d) × 100  [T80–T88, A40–A41, J15–J18, L89, N39.0]",
  target: "< 1%",
  benchmark: "HA IC Standard: < 1%, ดีมาก: < 0.5%",
  dataSource: "iptdiag + ipt (LOS filter)",
  period: "30 วันล่าสุด",
  _key: "hai_rate",
  _fmt: r => `${Number(r).toFixed(2)}%`,
  _sub: r => Number(r) <= .5 ? "ดีมาก" : Number(r) <= 1 ? "ผ่านมาตรฐาน" : "เกินมาตรฐาน"
}, {
  label: "Discharge Planning (ENV)",
  thLabel: "ความครบถ้วนแผนการจำหน่าย",
  icon: "📋",
  color: a.blue,
  meaning: "ความครบถ้วนของแผนการดูแลต่อเนื่องก่อนจำหน่าย วัดจากการบันทึก dchtime",
  calc: "(ผู้ป่วยมี dchtime / ผู้จำหน่าย) × 100",
  target: "> 95%",
  benchmark: "มาตรฐาน: > 95%, ดีเลิศ: > 98%",
  dataSource: "ipt (dchtime)",
  period: "30 วันล่าสุด",
  _key: "dch_plan_rate",
  _fmt: r => `${Number(r).toFixed(1)}%`,
  _sub: r => Number(r) >= 98 ? "ดีเลิศ" : Number(r) >= 95 ? "ผ่านมาตรฐาน" : "ต้องปรับปรุง"
}];

function ie() {
  const r = N(i => ({
      qualityToday: i.qualityToday,
      qualityAnalytics: i.qualityAnalytics,
      qualityIndicators: i.qualityIndicators,
      qualityAI: i.qualityAI,
      loading: i.loading
    })),
    {
      fetchData: o
    } = W(),
    m = r.qualityToday,
    y = r.qualityAnalytics,
    g = r.qualityIndicators,
    h = r.loading?.qualityAnalytics !== !1 && !y;
  _.useEffect(() => {
    o("qualityToday", "/api/quality/today"), o("qualityAnalytics", "/api/quality/analytics"), o("qualityIndicators", "/api/quality/indicators");
    const i = setTimeout(() => o("qualityAI", "/api/ai/quality/prediction"), 300);
    return () => clearTimeout(i)
  }, [o]);
  const x = _.useMemo(() => {
      if (!y) return [];
      const i = [],
        l = y;
      return l.readmit_rate > 5 && i.push({
        level: "critical",
        icon: "🔄",
        msg: `Readmission สูง ${c(l.readmit_rate)} — เกินมาตรฐาน HA (< 5%)`
      }), l.mortality_rate > 2 && i.push({
        level: "critical",
        icon: "⚠️",
        msg: `Mortality Rate ${c(l.mortality_rate)} — ตรวจสอบ case review`
      }), l.hai_rate > 1 && i.push({
        level: "warning",
        icon: "🦠",
        msg: `HAI Rate ${c(l.hai_rate)} — IC Team ควรตรวจสอบ`
      }), l.ama_rate > 3 && i.push({
        level: "warning",
        icon: "🚪",
        msg: `AMA Rate ${c(l.ama_rate)} — ผู้ป่วย DC เองสูง`
      }), l.doc_completeness < 90 && i.push({
        level: "info",
        icon: "📋",
        msg: `เอกสารไม่ครบ ${c(l.doc_completeness)} — กรอกข้อมูลให้ครบถ้วน`
      }), l.adr_rate > 2 && i.push({
        level: "info",
        icon: "💊",
        msg: `ADR Rate ${c(l.adr_rate)} — ทบทวนความปลอดภัยยา`
      }), i.length === 0 && i.push({
        level: "ok",
        icon: "✅",
        msg: `คุณภาพโดยรวมอยู่ในเกณฑ์ดี — QPI ${S(l.qpi_score)} คะแนน`
      }), i
    }, [y]),
    f = {
      critical: a.primary,
      warning: a.yellow,
      info: a.blue,
      ok: a.green
    },
    t = y || {},
    n = m || {},
    I = g || {},
    H = _.useMemo(() => te.map(({
      _key: i,
      _fmt: l,
      _sub: s,
      ...d
    }) => {
      const p = t[i],
        u = p != null ? l(p) : "—",
        b = p != null ? s(p) : void 0;
      return {
        ...d,
        value: u,
        sub: b
      }
    }), [t]),
    P = _.useMemo(() => [{
      label: "QPI Score",
      value: `${(t.qpi_score??0).toFixed(0)}`,
      unit: "/100",
      icon: "⭐",
      status: (t.qpi_score ?? 0) >= 85 ? "success" : (t.qpi_score ?? 0) >= 70 ? "warning" : "critical",
      target: "HA Standard ≥85"
    }, {
      label: "Readmission",
      value: `${(t.readmit_rate??0).toFixed(1)}%`,
      icon: "🔄",
      status: (t.readmit_rate ?? 0) <= 3 ? "success" : (t.readmit_rate ?? 0) <= 5 ? "warning" : "critical",
      target: "HA <5%"
    }, {
      label: "Mortality",
      value: `${(t.mortality_rate??0).toFixed(2)}%`,
      icon: "💔",
      status: (t.mortality_rate ?? 0) <= 2 ? "success" : "critical",
      target: "HA <2%",
      gradient: "#7c3aed"
    }, {
      label: "HAI Rate",
      value: `${(t.hai_rate??0).toFixed(2)}%`,
      icon: "🦠",
      status: (t.hai_rate ?? 0) <= .5 ? "success" : (t.hai_rate ?? 0) <= 1 ? "warning" : "critical",
      target: "IC <1%"
    }, {
      label: "AMA Rate",
      value: `${(t.ama_rate??0).toFixed(2)}%`,
      icon: "🚪",
      status: (t.ama_rate ?? 0) <= 3 ? "success" : "warning",
      target: "<3%"
    }, {
      label: "Dch Planning",
      value: `${(t.dch_plan_rate??0).toFixed(1)}%`,
      icon: "📋",
      status: (t.dch_plan_rate ?? 0) >= 95 ? "success" : "warning",
      target: ">95%"
    }, {
      label: "Admitted Today",
      value: `${n.admitted_today??0}`,
      unit: "ราย",
      icon: "🏥",
      status: "normal",
      target: "รับใหม่วันนี้"
    }, {
      label: "Discharged",
      value: `${n.discharged_today??0}`,
      unit: "ราย",
      icon: "📤",
      status: "normal",
      target: "จำหน่ายวันนี้"
    }], [t, n]),
    w = _.useMemo(() => {
      const i = t.qpi_score ?? 0,
        l = t.readmit_rate ?? 0,
        s = t.mortality_rate ?? 0,
        d = t.hai_rate ?? 0,
        p = t.ama_rate ?? 0,
        u = t.dch_plan_rate ?? 0;
      return [{
        title: "QPI Score Analysis",
        icon: "⭐",
        priority: i >= 85 ? "LOW" : i >= 70 ? "MEDIUM" : "HIGH",
        summary: `QPI ${i.toFixed(0)}/100 -- ${i>=85?"ผ่านมาตรฐาน HA Thailand ครบทุกมิติ":i>=70?"ต้องปรับปรุงบางมิติ HA":"ต่ำกว่ามาตรฐาน HA ต้องเร่งแก้ไข"}`,
        analysis: `QPI คำนวณจาก 5 มิติ: PCT (${t.domains?.pct?.toFixed(0)??"—"}), IC (${t.domains?.ic?.toFixed(0)??"—"}), MED (${t.domains?.med?.toFixed(0)??"—"}), ENV (${t.domains?.env?.toFixed(0)??"—"}), IM (${t.domains?.im?.toFixed(0)??"—"}) -- Readmit x0.28 + Mortality x0.28 + AMA x0.16 + HAI x0.16 + DchPlan x0.12`,
        recommendation: i >= 85 ? "คงมาตรฐาน เฝ้าระวัง Domain ที่ต่ำสุด ทำ PDCA รายเดือน" : "เร่ง Domain ต่ำสุด: ตรวจสอบ PCT (Readmit+Mortality) และ IC (HAI) เป็นอันดับแรก",
        gradient: a.primary,
        gradientFrom: `${a.primary}08`,
        gradientTo: `${a.secondary}04`,
        borderColor: `${a.primary}25`,
        confidence: 94
      }, {
        title: "Patient Safety Monitor",
        icon: "🛡️",
        priority: s > 2 || d > 1 ? "HIGH" : s > 1 || d > .5 ? "MEDIUM" : "LOW",
        summary: `Mortality ${s.toFixed(2)}% | HAI ${d.toFixed(2)}% | ADR ${(t.adr_rate??0).toFixed(2)}% -- ${s<=2&&d<=1?"Patient Safety อยู่ในเกณฑ์ดี":"มีจุดที่ต้องเฝ้าระวังด้านความปลอดภัย"}`,
        analysis: `Mortality Rate ต้อง <2% (HA Standard), HAI Rate ต้อง <1% (IC Standard) -- แยก HAI: BSI ${t.hai_types?.bsi??0}, SSI ${t.hai_types?.ssi??0}, VAP ${t.hai_types?.vap??0}, CAUTI ${t.hai_types?.cauti??0} -- ADR Cases: ${t.adr_count??0} ราย`,
        recommendation: s > 2 ? "Case review ทุกรายที่เสียชีวิต ตรวจสอบ Morbidity Conference" : d > 1 ? "IC Team ตรวจสอบ HAI เร่งด่วน Hand hygiene + Bundle compliance" : "เฝ้าระวังต่อเนื่อง ทำ Sentinel Event Report ทุกเดือน",
        gradient: "#7c3aed",
        gradientFrom: "rgba(124,58,237,.08)",
        gradientTo: "rgba(99,102,241,.04)",
        borderColor: "rgba(124,58,237,.25)",
        confidence: 91
      }, {
        title: "Readmission Prevention",
        icon: "🔄",
        priority: l > 5 ? "HIGH" : l > 3 ? "MEDIUM" : "LOW",
        summary: `Readmit 28d: ${l.toFixed(2)}% -- ${l<=3?"ดีเลิศ ต่ำกว่ามาตรฐานมาก":l<=5?"ผ่านมาตรฐาน HA (<5%)":"เกินมาตรฐาน HA ต้องทบทวน"}`,
        analysis: `Top Readmit Diagnoses: ${(t.top_readmit_diag||[]).slice(0,3).map(b=>b.icd10).join(", ")||"N/A"} -- ALOS: ${(t.alos??0).toFixed(1)} วัน, CMI: ${(t.cmi??0).toFixed(2)} -- Ward breakdown: ${(t.ward_breakdown||[]).filter(b=>b.readmit>0).length} wards มี readmit`,
        recommendation: l > 5 ? "เร่ง Case Conference ทุก Readmit case + ปรับ Discharge Planning + Home visit follow-up" : "คงมาตรฐาน ติดตาม Top diagnosis ที่ readmit สูง ทำ Care map",
        gradient: a.secondary,
        gradientFrom: `${a.secondary}08`,
        gradientTo: `${a.primary}04`,
        borderColor: `${a.secondary}25`,
        confidence: 89
      }, {
        title: "Compliance & Documentation",
        icon: "📋",
        priority: u < 95 || (t.doc_completeness ?? 100) < 90 ? "MEDIUM" : "LOW",
        summary: `Dch Plan ${u.toFixed(1)}% | Doc Complete ${(t.doc_completeness??0).toFixed(1)}% | AMA ${p.toFixed(2)}% -- ${u>=95&&p<=3?"Compliance ดี":"ต้องปรับปรุง"}`,
        analysis: `Discharge Planning ต้อง >95% (HA Standard) -- AMA Rate สะท้อนผู้ป่วยที่กลับก่อน ซึ่งเพิ่ม Readmission risk -- IM Domain: Diag Coded ${(t.diag_coded_rate??0).toFixed(1)}%`,
        recommendation: u < 95 ? "เพิ่ม Dch Planning: (1) Checklist ก่อนจำหน่าย (2) อบรมพยาบาล (3) เป้า >98%" : p > 3 ? "ลด AMA: สำรวจสาเหตุ ปรับ Communication + Patient Education" : "คงมาตรฐาน ทำ Self-audit Documentation ทุกเดือน",
        gradient: a.blue,
        gradientFrom: "rgba(59,130,246,.08)",
        gradientTo: "rgba(37,99,235,.04)",
        borderColor: "rgba(59,130,246,.25)",
        confidence: 87
      }]
    }, [t]);
  return h ? e.jsxs("div", {
    style: {
      textAlign: "center",
      padding: "4rem",
      color: a.gray
    },
    children: [e.jsx("div", {
      style: {
        fontSize: 40,
        marginBottom: 12
      },
      children: "⭐"
    }), e.jsx("p", {
      style: {
        fontWeight: 700
      },
      children: "กำลังโหลดข้อมูลคุณภาพ HA Thailand…"
    })]
  }) : e.jsxs("div", {
    style: {
      padding: "1.5rem 0",
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    },
    children: [e.jsx(z, {
      title: "AI Executive Quick Summary — คุณภาพ HA",
      subtitle: "QPI Score · Readmit · Mortality · HAI · Discharge Plan",
      badge: "📐 Quick Summary",
      accentColor: "#e11d48",
      headerGradient: "linear-gradient(135deg, rgba(225,29,72,.10), rgba(190,18,60,.05))",
      narrative: L(r)
    }), e.jsx(E, {
      metrics: P
    }), e.jsx(j, {
      name: "AI Analytics Cards",
      children: e.jsxs("div", {
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "12px"
          },
          children: [e.jsx("div", {
            style: {
              width: "3px",
              height: "18px",
              background: `linear-gradient(180deg, ${a.primary}, ${a.purple})`,
              borderRadius: "99px"
            }
          }), e.jsx("span", {
            style: {
              fontWeight: 800,
              fontSize: 13,
              color: a.primary,
              letterSpacing: 1
            },
            children: "🧠 AI QUALITY INTELLIGENCE"
          }), e.jsx("span", {
            style: {
              fontSize: 11,
              color: a.gray,
              fontWeight: 600,
              background: `${a.primary}10`,
              padding: "2px 8px",
              borderRadius: 99
            },
            children: "4 Analytics Modules"
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "12px"
          },
          children: w.map((i, l) => e.jsx(q, {
            ...i
          }, l))
        })]
      })
    }), x.length > 0 && e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "1rem 1.25rem",
        borderLeft: `4px solid ${a.primary}`
      },
      children: [e.jsx("div", {
        style: {
          fontWeight: 800,
          fontSize: 12,
          color: a.primary,
          marginBottom: 8,
          letterSpacing: 1
        },
        children: "⭐ AI QUALITY MONITOR — HA THAILAND"
      }), e.jsx("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 4
        },
        children: x.map((i, l) => e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12
          },
          children: [e.jsx("span", {
            children: i.icon
          }), e.jsx("span", {
            style: {
              color: f[i.level] || a.gray,
              fontWeight: i.level === "critical" ? 700 : 500
            },
            children: i.msg
          }), T(i.level.toUpperCase(), f[i.level] || a.gray)]
        }, l))
      })]
    }), e.jsx(j, {
      name: "Today Snapshot & QPI Gauge",
      children: e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "1.25rem 1.5rem",
          background: `linear-gradient(135deg, ${a.primary}08, ${a.secondary}05)`
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem"
          },
          children: [e.jsxs("div", {
            children: [e.jsx("h2", {
              style: {
                fontWeight: 800,
                fontSize: "var(--fs-lg)",
                color: a.primary,
                margin: 0
              },
              children: "คุณภาพวันนี้"
            }), e.jsx("p", {
              style: {
                fontSize: 11,
                color: a.gray,
                margin: 0
              },
              children: "HA Thailand Accreditation Dashboard — Real-time"
            })]
          }), e.jsx(ee, {
            value: t.qpi_score
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "0.75rem"
          },
          children: [{
            label: "จำหน่ายวันนี้",
            value: n.discharged_today ?? "—",
            unit: "ราย",
            color: a.primary
          }, {
            label: "รับใหม่วันนี้",
            value: n.admitted_today ?? "—",
            unit: "ราย",
            color: a.blue
          }, {
            label: "เสียชีวิตวันนี้",
            value: n.deaths_today ?? "—",
            unit: "ราย",
            color: n.deaths_today > 0 ? "#7c3aed" : a.gray
          }, {
            label: "AMA วันนี้",
            value: n.ama_today ?? "—",
            unit: "ราย",
            color: n.ama_today > 0 ? a.yellow : a.gray
          }, {
            label: "Readmit Flag",
            value: n.readmit_today ?? "—",
            unit: "ราย",
            color: n.readmit_today > 0 ? a.primary : a.gray
          }, {
            label: "ADR วันนี้",
            value: n.adr_today ?? "—",
            unit: "ราย",
            color: n.adr_today > 0 ? a.yellow : a.gray
          }].map(({
            label: i,
            value: l,
            unit: s,
            color: d
          }) => e.jsxs("div", {
            style: {
              background: "#fff",
              borderRadius: 12,
              padding: "0.75rem 1rem",
              border: `1px solid ${d}30`,
              textAlign: "center"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: 22,
                fontWeight: 900,
                color: d
              },
              children: l
            }), e.jsx("div", {
              style: {
                fontSize: 10,
                color: a.gray
              },
              children: s
            }), e.jsx("div", {
              style: {
                fontSize: 10,
                color: a.gray,
                marginTop: 2
              },
              children: i
            })]
          }, i))
        })]
      })
    }), e.jsxs("div", {
      children: [e.jsx("h3", {
        style: {
          fontWeight: 800,
          fontSize: 13,
          color: a.primary,
          marginBottom: 12,
          letterSpacing: 1
        },
        children: "⭐ 5 DOMAINS — HA THAILAND ACCREDITATION"
      }), e.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem"
        },
        children: [e.jsx(A, {
          code: "PCT",
          name_th: "Patient Care Process",
          desc: "กระบวนการดูแลผู้ป่วย — Readmission, Mortality, ALOS, CMI",
          score: t.domains?.pct,
          color: a.primary,
          indicators: [{
            label: "Readmit 28d",
            value: c(t.readmit_rate),
            alert: t.readmit_rate > 5
          }, {
            label: "Mortality",
            value: c(t.mortality_rate),
            alert: t.mortality_rate > 2
          }, {
            label: "ALOS",
            value: `${S(t.alos)} วัน`,
            alert: t.alos > 5
          }, {
            label: "CMI",
            value: S(t.cmi, 2)
          }]
        }), e.jsx(A, {
          code: "IC",
          name_th: "Infection Control",
          desc: "การควบคุมการติดเชื้อ — HAI Rate แยกตามประเภท",
          score: t.domains?.ic,
          color: a.yellow,
          indicators: [{
            label: "HAI Rate",
            value: c(t.hai_rate),
            alert: t.hai_rate > 1
          }, {
            label: "BSI",
            value: t.hai_types?.bsi ?? "—",
            alert: (t.hai_types?.bsi ?? 0) > 0
          }, {
            label: "SSI",
            value: t.hai_types?.ssi ?? "—",
            alert: (t.hai_types?.ssi ?? 0) > 0
          }, {
            label: "VAP",
            value: t.hai_types?.vap ?? "—",
            alert: (t.hai_types?.vap ?? 0) > 0
          }, {
            label: "CAUTI",
            value: t.hai_types?.cauti ?? "—",
            alert: (t.hai_types?.cauti ?? 0) > 0
          }]
        }), e.jsx(A, {
          code: "MED",
          name_th: "Medication Safety",
          desc: "ความปลอดภัยด้านยา — ADR, Polypharmacy",
          score: t.domains?.med,
          color: a.green,
          indicators: [{
            label: "ADR Rate",
            value: c(t.adr_rate),
            alert: t.adr_rate > 2
          }, {
            label: "ADR Cases",
            value: t.adr_count ?? "—",
            alert: (t.adr_count ?? 0) > 5
          }]
        }), e.jsx(A, {
          code: "ENV",
          name_th: "Environment & Discharge Planning",
          desc: "สิ่งแวดล้อมและแผนการจำหน่าย — AMA Rate, Discharge Planning",
          score: t.domains?.env,
          color: a.blue,
          indicators: [{
            label: "AMA Rate",
            value: c(t.ama_rate),
            alert: t.ama_rate > 3
          }, {
            label: "Dch Plan",
            value: c(t.dch_plan_rate),
            alert: t.dch_plan_rate < 95
          }]
        }), e.jsx(A, {
          code: "IM",
          name_th: "Information Management",
          desc: "การจัดการข้อมูล — ความครบถ้วนของเอกสารทางการแพทย์",
          score: t.domains?.im,
          color: a.purple,
          indicators: [{
            label: "Doc Complete",
            value: c(t.doc_completeness),
            alert: t.doc_completeness < 90
          }, {
            label: "Diag Coded",
            value: c(t.diag_coded_rate),
            alert: t.diag_coded_rate < 95
          }]
        })]
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "1.25rem"
        },
        children: [e.jsx("h3", {
          style: {
            fontWeight: 800,
            fontSize: 12,
            color: a.primary,
            marginBottom: 8,
            letterSpacing: 1
          },
          children: "⭐ HA DOMAIN RADAR"
        }), e.jsx(ae, {
          domains: t.domains
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 4,
            marginTop: 8
          },
          children: [{
            code: "PCT",
            score: t.domains?.pct
          }, {
            code: "IC",
            score: t.domains?.ic
          }, {
            code: "MED",
            score: t.domains?.med
          }, {
            code: "ENV",
            score: t.domains?.env
          }, {
            code: "IM",
            score: t.domains?.im
          }].map(({
            code: i,
            score: l
          }) => {
            const s = l ?? 0,
              d = s >= 85 ? a.green : s >= 70 ? a.yellow : a.primary;
            return e.jsxs("div", {
              style: {
                textAlign: "center",
                padding: "4px 0"
              },
              children: [e.jsx("div", {
                style: {
                  fontSize: 14,
                  fontWeight: 800,
                  color: d
                },
                children: s.toFixed(0)
              }), e.jsx("div", {
                style: {
                  fontSize: 9,
                  color: a.gray
                },
                children: i
              })]
            }, i)
          })
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "1.25rem"
        },
        children: [e.jsx("h3", {
          style: {
            fontWeight: 800,
            fontSize: 12,
            color: a.primary,
            marginBottom: 8,
            letterSpacing: 1
          },
          children: "🏥 WARD BREAKDOWN"
        }), e.jsx("div", {
          style: {
            overflowY: "auto",
            maxHeight: 280
          },
          children: e.jsxs("table", {
            style: {
              width: "100%",
              fontSize: 11,
              borderCollapse: "collapse"
            },
            children: [e.jsx("thead", {
              children: e.jsx("tr", {
                style: {
                  background: a.light
                },
                children: ["Ward", "จำหน่าย", "Readmit", "Death", "ALOS"].map(i => e.jsx("th", {
                  style: {
                    padding: "4px 6px",
                    textAlign: "center",
                    color: a.gray,
                    fontWeight: 700
                  },
                  children: i
                }, i))
              })
            }), e.jsx("tbody", {
              children: (t.ward_breakdown || []).map((i, l) => e.jsxs("tr", {
                style: {
                  borderBottom: "1px solid #f3f4f6"
                },
                children: [e.jsx("td", {
                  style: {
                    padding: "4px 6px",
                    fontWeight: 600,
                    color: a.primary,
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: i.ward_name || i.ward
                }), e.jsx("td", {
                  style: {
                    padding: "4px 6px",
                    textAlign: "center"
                  },
                  children: i.discharges
                }), e.jsx("td", {
                  style: {
                    padding: "4px 6px",
                    textAlign: "center",
                    color: i.readmit > 0 ? a.primary : "inherit"
                  },
                  children: i.readmit ?? 0
                }), e.jsx("td", {
                  style: {
                    padding: "4px 6px",
                    textAlign: "center",
                    color: i.deaths > 0 ? "#7c3aed" : "inherit"
                  },
                  children: i.deaths ?? 0
                }), e.jsx("td", {
                  style: {
                    padding: "4px 6px",
                    textAlign: "center"
                  },
                  children: S(i.alos)
                })]
              }, l))
            })]
          })
        })]
      })]
    }), (t.top_readmit_diag || []).length > 0 && e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem"
      },
      children: [e.jsx("h3", {
        style: {
          fontWeight: 800,
          fontSize: 12,
          color: a.primary,
          marginBottom: 12,
          letterSpacing: 1
        },
        children: "🔄 TOP 10 READMISSION DIAGNOSES (30 วัน)"
      }), e.jsx("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 4
        },
        children: t.top_readmit_diag.slice(0, 10).map((i, l) => {
          const s = t.top_readmit_diag[0]?.count || 1,
            d = (i.count / s * 100).toFixed(0);
          return e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11
            },
            children: [e.jsx("span", {
              style: {
                width: 20,
                color: a.gray,
                fontWeight: 700,
                textAlign: "right",
                flexShrink: 0
              },
              children: l + 1
            }), e.jsx("span", {
              style: {
                width: 60,
                fontFamily: "monospace",
                fontWeight: 700,
                color: a.primary,
                flexShrink: 0
              },
              children: i.icd10
            }), e.jsx("span", {
              style: {
                flex: 1,
                color: "#374151",
                fontSize: 10
              },
              children: i.diagnosis || i.icd10_name || i.icd10
            }), e.jsx("div", {
              style: {
                width: 100,
                height: 6,
                background: "#f3f4f6",
                borderRadius: 99,
                overflow: "hidden",
                flexShrink: 0
              },
              children: e.jsx("div", {
                style: {
                  width: `${d}%`,
                  height: "100%",
                  background: a.primary,
                  borderRadius: 99
                }
              })
            }), e.jsx("span", {
              style: {
                width: 28,
                textAlign: "right",
                fontWeight: 700,
                color: a.primary,
                flexShrink: 0
              },
              children: i.count
            })]
          }, l)
        })
      })]
    }), (t.monthly_trend || []).length > 0 && e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem"
      },
      children: [e.jsx("h3", {
        style: {
          fontWeight: 800,
          fontSize: 12,
          color: a.primary,
          marginBottom: 12,
          letterSpacing: 1
        },
        children: "📈 MONTHLY QUALITY TREND (12 เดือน)"
      }), e.jsx(C, {
        width: "100%",
        height: 260,
        children: e.jsxs(Q, {
          data: t.monthly_trend,
          margin: {
            top: 5,
            right: 20,
            left: 0,
            bottom: 5
          },
          children: [e.jsx(D, {
            strokeDasharray: "3 3",
            stroke: "#f1f5f9"
          }), e.jsx($, {
            dataKey: "month",
            tick: {
              fontSize: 10
            }
          }), e.jsx(k, {
            tick: {
              fontSize: 10
            }
          }), e.jsx(R, {
            contentStyle: {
              fontSize: 11
            }
          }), e.jsx(M, {
            iconType: "circle",
            wrapperStyle: {
              fontSize: 11
            }
          }), e.jsx(U, {
            y: 5,
            stroke: a.primary,
            strokeDasharray: "4 4",
            label: {
              value: "Readmit 5%",
              fontSize: 9,
              fill: a.primary
            }
          }), e.jsx(v, {
            type: "monotone",
            dataKey: "readmit_rate",
            name: "Readmit %",
            stroke: a.primary,
            strokeWidth: 2,
            dot: {
              r: 3
            }
          }), e.jsx(v, {
            type: "monotone",
            dataKey: "mortality_rate",
            name: "Mortality %",
            stroke: "#7c3aed",
            strokeWidth: 2,
            dot: {
              r: 3
            }
          }), e.jsx(v, {
            type: "monotone",
            dataKey: "hai_rate",
            name: "HAI %",
            stroke: a.yellow,
            strokeWidth: 2,
            dot: {
              r: 3
            }
          }), e.jsx(v, {
            type: "monotone",
            dataKey: "ama_rate",
            name: "AMA %",
            stroke: a.blue,
            strokeWidth: 2,
            dot: {
              r: 3
            },
            strokeDasharray: "5 5"
          })]
        })
      })]
    }), (I.fiscal_trend || []).length > 0 && e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem"
      },
      children: [e.jsx("h3", {
        style: {
          fontWeight: 800,
          fontSize: 12,
          color: a.primary,
          marginBottom: 12,
          letterSpacing: 1
        },
        children: "📊 DISCHARGE VOLUME BY FISCAL YEAR"
      }), e.jsx(C, {
        width: "100%",
        height: 220,
        children: e.jsxs(K, {
          data: I.fiscal_trend,
          margin: {
            top: 5,
            right: 20,
            left: 0,
            bottom: 5
          },
          children: [e.jsx(D, {
            strokeDasharray: "3 3",
            stroke: "#f1f5f9"
          }), e.jsx($, {
            dataKey: "month_label",
            tick: {
              fontSize: 9
            }
          }), e.jsx(k, {
            tick: {
              fontSize: 10
            }
          }), e.jsx(R, {
            contentStyle: {
              fontSize: 11
            }
          }), e.jsx(M, {
            iconType: "circle",
            wrapperStyle: {
              fontSize: 11
            }
          }), (I.fiscal_years || []).map((i, l) => {
            const s = [a.primary, a.blue, a.green];
            return e.jsx(Y, {
              dataKey: i,
              name: `FY${i}`,
              fill: s[l % 3],
              radius: [3, 3, 0, 0]
            }, i)
          })]
        })
      })]
    }), e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem",
        borderLeft: `4px solid ${a.primary}`
      },
      children: [e.jsx("div", {
        style: {
          fontWeight: 800,
          fontSize: 12,
          color: a.primary,
          marginBottom: 12,
          letterSpacing: 1
        },
        children: "💰 QUALITY & REVENUE FISCAL SUMMARY"
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "0.75rem"
        },
        children: [{
          label: "ALOS เฉลี่ย",
          value: `${(t.alos??0).toFixed(1)} วัน`,
          color: (t.alos ?? 5) <= 5 ? a.green : a.yellow
        }, {
          label: "CMI (Case Mix)",
          value: (t.cmi ?? 0).toFixed(2),
          color: a.blue
        }, {
          label: "Census Today",
          value: `${n.census_today??n.admitted_today??0}`,
          color: a.primary
        }, {
          label: "Overstay >14d",
          value: `${n.overstay_today??0}`,
          color: (n.overstay_today ?? 0) > 0 ? a.yellow : a.green
        }, {
          label: "Critical Labs",
          value: `${n.critical_labs_today??0}`,
          color: (n.critical_labs_today ?? 0) > 0 ? a.primary : a.green
        }, {
          label: "Doc Completeness",
          value: `${(t.doc_completeness??0).toFixed(1)}%`,
          color: (t.doc_completeness ?? 100) >= 90 ? a.green : a.yellow
        }].map(({
          label: i,
          value: l,
          color: s
        }) => e.jsxs("div", {
          style: {
            background: "#fff",
            borderRadius: 12,
            padding: "0.75rem 1rem",
            border: `1px solid ${s}30`,
            textAlign: "center"
          },
          children: [e.jsx("div", {
            style: {
              fontSize: 22,
              fontWeight: 900,
              color: s
            },
            children: l
          }), e.jsx("div", {
            style: {
              fontSize: 10,
              color: a.gray,
              marginTop: 2
            },
            children: i
          })]
        }, i))
      })]
    }), e.jsx(j, {
      name: "QPI Indicators",
      children: e.jsx(O, {
        kpis: H,
        accentColor: a.primary,
        title: "ตัวชี้วัดคุณภาพ HA Thailand"
      })
    }), e.jsx(j, {
      name: "AI Server Insights",
      children: e.jsx(B, {
        data: r.qualityAI,
        theme: "quality",
        title: "AI Quality Intelligence"
      })
    })]
  })
}
const se = F.memo(ie);
export {
  se as
  default
};