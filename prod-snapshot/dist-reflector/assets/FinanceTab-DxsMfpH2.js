import {
  R as T,
  r as F,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  b as $,
  a as L,
  E as A,
  e as M,
  f as I,
  S as k,
  g as C,
  M as B,
  K as D,
  h as E
} from "./shared-ui-OVDEF1.js";
import {
  R as O,
  C as H,
  a as P,
  X as N,
  Y,
  T as G,
  L as X,
  A as W,
  b as U
} from "./vendor-charts-C5q2M-g3.js";

function K() {
  const x = $(r => ({
      financeSummary: r.financeSummary,
      denialAnalytics: r.denialAnalytics,
      paymentPropensity: r.paymentPropensity,
      ppfsComparison: r.ppfsComparison,
      revenueForecast: r.revenueForecast,
      drgLeakage: r.drgLeakage,
      financeAnalytics: r.financeAnalytics,
      loading: r.loading,
      financeAI: r.financeAI
    })),
    {
      fetchData: p
    } = L(),
    {
      financeSummary: g,
      denialAnalytics: d,
      paymentPropensity: j,
      ppfsComparison: o,
      revenueForecast: u,
      drgLeakage: _
    } = x,
    t = x.financeAnalytics,
    y = x.loading,
    [b, c] = F.useState(null);
  F.useEffect(() => {
    p("financeSummary", `/api/finance/monthly-summary?year=${new Date().getFullYear()}`), p("financeAnalytics", "/api/finance/analytics"), p("denialAnalytics", "/api/finance/denial-analytics"), p("ppfsComparison", "/api/finance/ppfs-comparison");
    const r = setTimeout(() => {
        p("revenueForecast", "/api/finance/revenue-forecast"), p("drgLeakage", "/api/finance/drg-leakage")
      }, 200),
      n = setTimeout(() => p("financeAI", "/api/ai/finance/optimization"), 500);
    return () => {
      clearTimeout(r), clearTimeout(n)
    }
  }, [p]);
  const a = g?.summary;
  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-10",
    children: [e.jsx(A, {
      title: "AI Executive Quick Summary — Finance & RCM",
      subtitle: "Revenue · Collection · Denial · AR Days · DRG Leakage · Margin",
      badge: "📐 Quick Summary",
      accentColor: "#7c3aed",
      headerGradient: "linear-gradient(135deg, rgba(124,58,237,.10), rgba(14,165,233,.05))",
      narrative: M(x)
    }), t?.ai_insights?.risk_intelligence?.score < 70 && e.jsx(I, {
      severity: "critical",
      title: "⚠️ High A/R or Outstanding Risk Detected",
      message: `Outstanding rate: ${d?.denial_rate!=null?Number(d.denial_rate).toFixed(1)+"%":"N/A"}. ${d?.total_denied?d.total_denied+" cases ค้างบันทึก.":""} ${d?.amount_at_risk?"Amount at risk: ฿"+Number(d.amount_at_risk).toLocaleString():""} · A/R ${t?.metrics?.days_in_ar??"?"} วัน`,
      icon: "🚨",
      actions: [{
        label: "Review A/R Aging",
        onClick: () => {},
        primary: !0
      }, {
        label: "View Details",
        onClick: () => {}
      }]
    }), e.jsxs(k, {
      name: "AI Revenue Intelligence",
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "14px",
          marginTop: "12px"
        },
        children: [e.jsx("div", {
          style: {
            width: "4px",
            height: "22px",
            background: "linear-gradient(180deg, #8b5cf6, #7c3aed)",
            borderRadius: "99px"
          }
        }), e.jsx("h3", {
          style: {
            margin: 0,
            fontSize: "16px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: "🧠 AI Revenue Intelligence (Executive Briefing)"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            background: "rgba(139,92,246,.15)",
            color: "#8b5cf6",
            padding: "3px 10px",
            borderRadius: "4px",
            fontWeight: 800,
            marginLeft: "auto"
          },
          children: "REAL-TIME INSIGHTS"
        })]
      }), e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "14px",
          marginBottom: "1.5rem"
        },
        children: [e.jsx(C, {
          title: "สุขภาพรายได้และวงจรรายได้ (Revenue Health & RCM)",
          icon: "💵",
          priority: t?.ai_insights?.revenue_health?.score >= 80 ? "LOW" : "MEDIUM",
          summary: `คะแนนวงจรรายได้ (RCM Score) : ${t?.ai_insights?.revenue_health?.score||0}/100${t?.ai_insights?.revenue_health?.score>=80?" · อยู่ในระดับดีเยี่ยม":" · ต่ำกว่าเกณฑ์มาตรฐาน"}`,
          analysis: t?.ai_insights?.revenue_health?.analysis || "การวิเคราะห์ประสิทธิภาพของวงจรรายได้ (Revenue Cycle) ครอบคลุม 4 ขั้นตอนหลัก ได้แก่ การบันทึกค่าใช้จ่าย (Charge Capture) การลงรหัสโรค (Coding) การออกใบแจ้งหนี้ (Billing) และการจัดเก็บเงิน (Collection) เพื่อระบุจุดที่มีการรั่วไหลของรายได้และวางแนวทางปรับปรุง",
          recommendation: t?.ai_insights?.revenue_health?.recommendation || "",
          confidence: 96,
          gradient: "#8b5cf6",
          gradientFrom: "rgba(139,92,246,.08)",
          gradientTo: "rgba(99,102,241,.04)",
          borderColor: "rgba(139,92,246,.25)",
          actionButtons: [{
            label: "View RCM Dashboard",
            onClick: () => {}
          }]
        }), e.jsx(C, {
          title: "การเติบโตของรายได้และทิศทางเชิงกลยุทธ์",
          icon: "🚀",
          priority: t?.ai_insights?.growth_strategy?.status === "expanding" ? "LOW" : t?.ai_insights?.growth_strategy?.status === "declining" ? "HIGH" : "MEDIUM",
          summary: `การเติบโตเทียบปีต่อปี (YoY) : ${t?.metrics?.yoy_growth_pct>=0?"+":""}${t?.metrics?.yoy_growth_pct??0}%${t?.metrics?.yoy_growth_pct>=5?" · ขยายตัว":t?.metrics?.yoy_growth_pct>=0?" · คงที่":" · หดตัว"} · เทียบเดือนก่อน (MoM) : ${t?.metrics?.growth_pct_prorata>=0?"+":""}${t?.metrics?.growth_pct_prorata??t?.metrics?.growth_pct??0}% (Pro-rata)`,
          analysis: t?.ai_insights?.growth_strategy?.analysis || "การวิเคราะห์แนวโน้มการเติบโตของรายได้ เปรียบเทียบกับช่วงเวลาเดียวกันของปีก่อน และเดือนก่อนหน้า เพื่อประเมินทิศทางการดำเนินงานและวางแผนเชิงกลยุทธ์ในการขยายบริการหรือฟื้นฟูรายได้",
          recommendation: t?.ai_insights?.growth_strategy?.recommendation || "",
          confidence: 91,
          gradient: "#0ea5e9",
          gradientFrom: "rgba(14,165,233,.08)",
          gradientTo: "rgba(3,102,214,.04)",
          borderColor: "rgba(14,165,233,.25)",
          actionButtons: [{
            label: "View Growth Analysis",
            onClick: () => {}
          }]
        }), e.jsx(C, {
          title: "ประสิทธิภาพการดำเนินงานและผลผลิต",
          icon: "⚙️",
          priority: t?.ai_insights?.operational_efficiency?.status === "efficient" ? "LOW" : "MEDIUM",
          summary: `ประสิทธิภาพ : ${t?.ai_insights?.operational_efficiency?.score||0}% · อัตรากำไร : ${t?.metrics?.profit_margin??0}% · FFS ค้างบันทึก : ${t?.metrics?.denial_rate??0}% (${t?.metrics?.unpaid_visits??0} เคส)`,
          analysis: t?.ai_insights?.operational_efficiency?.analysis || "การประเมินประสิทธิภาพของวงจรรายได้ ผ่านตัวชี้วัดสำคัญ 3 ประการ ได้แก่ ประสิทธิภาพการจัดการโดยรวม อัตรากำไรสุทธิ และอัตราการถูกปฏิเสธการเบิกจ่ายจากกองทุน เพื่อวิเคราะห์จุดอ่อนของกระบวนการและวางแผนปรับปรุง",
          recommendation: t?.ai_insights?.operational_efficiency?.recommendation || "",
          confidence: 88,
          gradient: "#10b981",
          gradientFrom: "rgba(16,185,129,.08)",
          gradientTo: "rgba(5,150,105,.04)",
          borderColor: "rgba(16,185,129,.25)",
          actionButtons: [{
            label: "View Efficiency Details",
            onClick: () => {}
          }]
        }), e.jsx(C, {
          title: "ดัชนีความเสี่ยงทางการเงินเชิงกลยุทธ์",
          icon: "🛡️",
          priority: t?.ai_insights?.risk_intelligence?.score >= 70 ? "LOW" : "HIGH",
          summary: `คะแนนความเสี่ยง (Risk Score) : ${t?.ai_insights?.risk_intelligence?.score||0}/100 · ${t?.ai_insights?.risk_intelligence?.score>=70?"อยู่ในระดับปลอดภัย":"อยู่ในระดับสูง ควรเฝ้าระวัง"} · ระยะเวลาลูกหนี้คงค้าง (A/R Days) : ${t?.metrics?.days_in_ar??"—"} วัน`,
          analysis: t?.ai_insights?.risk_intelligence?.analysis || "การประเมินความเสี่ยงทางการเงินขององค์กร วิเคราะห์จากอัตราการจัดเก็บรายได้ ระยะเวลาลูกหนี้คงค้าง อัตราการปฏิเสธการเบิกจ่าย และปริมาณลูกหนี้ที่ค้างชำระนาน เพื่อระบุจุดเปราะบางและวางแผนจัดการความเสี่ยงทางกระแสเงินสด",
          recommendation: t?.ai_insights?.risk_intelligence?.recommendation || "",
          confidence: 94,
          gradient: "#f43f5e",
          gradientFrom: "rgba(244,63,94,.08)",
          gradientTo: "rgba(239,68,68,.04)",
          borderColor: "rgba(244,63,94,.25)",
          actionButtons: [{
            label: "Review Risk Factors",
            onClick: () => {}
          }]
        })]
      })]
    }), e.jsx(B, {
      metrics: [{
        label: "FFS Collection",
        value: t?.metrics?.ffs_collection_rate ?? "—",
        unit: "%",
        target: 95,
        status: t?.metrics?.ffs_collection_rate != null ? t.metrics.ffs_collection_rate >= 90 ? "success" : t.metrics.ffs_collection_rate >= 70 ? "warning" : "critical" : "normal",
        icon: "🎯"
      }, {
        label: "Days in A/R",
        value: t?.metrics?.days_in_ar ?? "—",
        unit: "วัน",
        target: 45,
        status: t?.metrics?.days_in_ar != null ? t.metrics.days_in_ar <= 45 ? "success" : t.metrics.days_in_ar <= 60 ? "warning" : "critical" : "normal",
        icon: "⏳"
      }, {
        label: "RCM Score",
        value: t?.ai_insights?.revenue_health?.score ?? "—",
        unit: "/100",
        target: 80,
        status: (t?.ai_insights?.revenue_health?.score ?? 0) >= 80 ? "success" : "warning",
        icon: "🏦"
      }, {
        label: "Revenue Growth YoY",
        value: t?.metrics?.yoy_growth_pct ?? "—",
        unit: "%",
        target: 5,
        trend: t?.metrics?.yoy_growth_pct,
        status: (t?.metrics?.yoy_growth_pct ?? 0) >= 5 ? "success" : (t?.metrics?.yoy_growth_pct ?? 0) >= 0 ? "normal" : "critical",
        icon: "📈"
      }, {
        label: "Profit Margin",
        value: t?.metrics?.profit_margin ?? "—",
        unit: "%",
        target: 15,
        status: (t?.metrics?.profit_margin ?? 0) >= 15 ? "success" : (t?.metrics?.profit_margin ?? 0) >= 5 ? "warning" : "critical",
        icon: "💰"
      }, {
        label: "FFS Outstanding",
        value: t?.metrics?.denial_rate ?? "—",
        unit: "%",
        target: 5,
        status: (t?.metrics?.denial_rate ?? 0) <= 5 ? "success" : (t?.metrics?.denial_rate ?? 0) <= 10 ? "warning" : "critical",
        icon: "🛑"
      }, {
        label: "MoM Growth",
        value: t?.metrics?.growth_pct_prorata ?? t?.metrics?.growth_pct ?? "—",
        unit: "%",
        trend: t?.metrics?.growth_pct_prorata ?? t?.metrics?.growth_pct,
        status: (t?.metrics?.growth_pct_prorata ?? t?.metrics?.growth_pct ?? 0) >= 0 ? "success" : "warning",
        icon: "📊"
      }, {
        label: "YTD Revenue",
        value: t?.metrics?.ytd_revenue ? `${(t.metrics.ytd_revenue/1e6).toFixed(1)}M` : "—",
        unit: "฿",
        status: "success",
        icon: "💵"
      }]
    }), (() => {
      const r = a?.total_revenue ?? 0,
        n = a?.total_expense ?? Math.round(r * .82),
        i = a?.net_profit ?? r - n,
        s = a?.profit_margin ?? (r > 0 ? Math.round(i / r * 100) : 0),
        l = t?.ai_insights?.revenue_health?.score || 0,
        m = t?.metrics?.ffs_collection_rate ?? null,
        S = t?.metrics?.collection_rate ?? null,
        h = m ?? S,
        f = t?.metrics?.days_in_ar ?? null,
        R = t?.metrics?.yoy_growth_pct ?? null,
        z = new Date().toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short"
        }),
        w = `ปีงบ ${new Date().getFullYear()+543}`;
      return e.jsx(D, {
        kpis: [{
          label: "Revenue Growth",
          thLabel: "อัตราการเติบโตรายได้",
          value: R != null ? `${R}%` : "—",
          color: R >= 5 ? "#059669" : R >= 0 ? "#f59e0b" : "#e11d48",
          icon: "📈",
          desc: `รายได้รวม ${(r/1e6).toFixed(1)} ล้านบาท (${w})`,
          meaning: "เปรียบเทียบรายได้รวมกับช่วงเดียวกันของปีก่อน เพื่อประเมินแนวโน้มการเติบโตขององค์กร",
          calc: "((Revenue ปีนี้ − Revenue ปีก่อน) ÷ Revenue ปีก่อน) × 100",
          dataSource: "income (HOSxP XE) + GL Ledger",
          period: `📅 ${w} ถึง ${z}`,
          target: "≥ 5% YoY",
          benchmark: "สธ.: ≥3% | รพ.ชุมชน: ≥5%",
          aiTip: R >= 5 ? "เติบโตดี — รักษา Service Mix ที่ทำกำไร" : "ต่ำกว่าเป้า — วิเคราะห์ Revenue Source ที่ลดลง",
          drillDownId: "finance_revenue",
          drillDownEndpoint: "/api/finance/drilldown?type=revenue"
        }, {
          label: "Profit Margin",
          thLabel: "อัตรากำไรสุทธิ (ประมาณการ)",
          value: `${s}%`,
          color: s >= 20 ? "#059669" : s >= 0 ? "#f59e0b" : "#e11d48",
          icon: "💰",
          desc: `กำไรประมาณ ${(i/1e6).toFixed(1)} ล้าน · รายจ่ายประมาณ ${(n/1e6).toFixed(1)} ล้าน · รายได้ ${(r/1e6).toFixed(1)} ล้านบาท`,
          meaning: "วัดสัดส่วนกำไรสุทธิเทียบกับรายได้รวม (ค่าใช้จ่ายประมาณการจากอัตราส่วน สธ. 82% เนื่องจาก HOSxP XE ไม่มีข้อมูลฝั่ง GL)",
          calc: "Revenue × (1 − 0.82 Expense Ratio) ÷ Revenue × 100",
          dataSource: "income (HOSxP XE) · expense est. (สธ. benchmark 82%)",
          period: `📅 ${w}`,
          target: "≥ 15%",
          benchmark: "รพ.รัฐ: ≥5% | Benchmark สธ.: Expense Ratio 80-85%",
          aiTip: s >= 15 ? "Margin ดี — อัตราส่วนรายจ่ายอยู่ในเกณฑ์" : s >= 5 ? "Margin พอใช้ — ติดตามค่าใช้จ่ายจากระบบ GL" : "Margin ต่ำ — ตรวจสอบโครงสร้างรายจ่ายจริงจากระบบบัญชี",
          drillDownId: "finance_revenue",
          drillDownEndpoint: "/api/finance/drilldown?type=revenue"
        }, {
          label: "RCM Score",
          thLabel: "คะแนนจัดการวงจรรายได้",
          value: `${l}`,
          color: l >= 80 ? "#059669" : l >= 60 ? "#f59e0b" : "#e11d48",
          icon: "🏦",
          sub: l >= 80 ? "Optimal" : l >= 60 ? "Fair" : "At Risk",
          desc: "Revenue Cycle Management composite score",
          meaning: "คะแนนรวมประสิทธิภาพ Revenue Cycle ตั้งแต่ลงทะเบียน → Coding → Billing → Collection",
          calc: "Charge Capture + Coding Accuracy + Clean Claim Rate + Collection %",
          dataSource: "income + ovst + iptdiag (HOSxP XE)",
          period: `📅 ประมวลผล ${z}`,
          target: "≥ 80",
          benchmark: "HFMA: ≥85 | BCH Internal: ≥80",
          aiTip: l >= 80 ? "RCM ดีเยี่ยม — เน้น Denial Prevention" : "ต่ำกว่าเกณฑ์ — ตรวจ Clean Claim Rate"
        }, {
          label: "Days in A/R",
          thLabel: "ระยะเวลาลูกหนี้คงค้าง",
          value: f != null ? `${f} วัน` : "—",
          color: f != null ? f <= 45 ? "#059669" : f <= 60 ? "#f59e0b" : "#e11d48" : "#64748b",
          icon: "⏳",
          desc: f != null ? `${f<=45?"✅ อยู่ในเกณฑ์":"❌ เกินเกณฑ์"} (เป้า ≤ 45 วัน)` : "ไม่มีข้อมูล A/R จาก HOSxP XE",
          meaning: "จำนวนวันเฉลี่ยตั้งแต่ให้บริการจนถึงวันที่ได้รับชำระเงิน ยิ่งน้อยยิ่งดี",
          calc: "(A/R Balance ÷ Average Daily Revenue)",
          dataSource: "income + ar_transaction (HOSxP XE)",
          period: `📅 ${w}`,
          target: "≤ 45 วัน",
          benchmark: "HFMA: ≤40d | รพ.รัฐ: ≤60d",
          aiTip: f != null ? f <= 45 ? "Cash Flow ดี ลูกหนี้หมุนเร็ว" : "ลูกหนี้ค้างนาน — เร่ง Follow-up สิทธิราชการ" : "ยังไม่มีข้อมูล — ตรวจสอบการเชื่อมต่อ HOSxP XE"
        }, {
          label: "FFS Collection Rate",
          thLabel: "อัตราจัดเก็บ FFS (ไม่รวม Capitation)",
          value: h != null ? `${h}%` : "—",
          color: h != null ? h >= 90 ? "#059669" : h >= 75 ? "#f59e0b" : "#e11d48" : "#64748b",
          icon: "🎯",
          desc: h != null ? `FFS only (Self-pay · ประกัน · พรบ. · ต่างชาติ) — Overall ${S}% รวม Capitation` : "ไม่มีข้อมูล",
          meaning: "อัตราจัดเก็บของกลุ่ม FFS (Fee-for-Service) เท่านั้น — ไม่รวม Capitation (UC/บัตรทอง) ซึ่ง Outstanding 100% by design เพราะรัฐจ่ายเหมาจ่ายรายปี",
          calc: "(FFS Payment Received ÷ FFS Charges) × 100 · คำนวณเฉพาะ pttype ที่เก็บเงินได้จริง",
          dataSource: "income + paid_money (HOSxP XE · pttype FFS only)",
          period: `📅 ${w}`,
          target: "≥ 95% (FFS)",
          benchmark: "MGMA: ≥95% FFS | Capitation แยกติดตาม Adequacy",
          aiTip: h != null ? h >= 95 ? "FFS จัดเก็บดีเยี่ยม — กระบวนการ Cash Register + Billing สมบูรณ์" : h >= 80 ? "FFS เฝ้าระวัง — ทบทวน Digital Payment · Billing Completeness" : "FFS ต่ำกว่าเป้า — ตรวจสอบ Cash Register, Claim Follow-up, ลูกหนี้ค้างชำระ" : "ยังไม่มีข้อมูล — ตรวจสอบการเชื่อมต่อ HOSxP XE"
        }]
      })
    })(), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        style: {
          padding: "1.25rem 1.5rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(124,58,237,.12) 0%, rgba(109,40,217,.06) 100%)",
          border: "1px solid rgba(124,58,237,.2)",
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden"
        },
        children: [e.jsx("div", {
          style: {
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), y.financeSummary ? e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          },
          children: [e.jsx("div", {
            className: "skeleton",
            style: {
              height: "12px",
              width: "80px"
            }
          }), e.jsx("div", {
            className: "skeleton",
            style: {
              height: "40px",
              width: "160px"
            }
          }), e.jsx("div", {
            className: "skeleton",
            style: {
              height: "8px",
              width: "100%",
              borderRadius: "99px"
            }
          })]
        }) : (() => {
          const r = a?.total_revenue ?? 0,
            n = a?.total_expense ?? Math.round(r * .82),
            i = a?.net_profit ?? r - n,
            s = a?.profit_margin ?? (r > 0 ? Math.round(i / r * 100) : 0),
            l = !!a?.expense_ratio_used,
            m = t?.metrics?.yoy_growth_pct;
          return e.jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              position: "relative",
              zIndex: 1
            },
            children: [e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              },
              children: [e.jsx("p", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#7c3aed",
                  margin: 0
                },
                children: "💰 รายได้รวม YTD"
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  gap: "4px"
                },
                children: [m != null && e.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: "99px",
                    background: m >= 0 ? "rgba(16,185,129,.1)" : "rgba(244,63,94,.1)",
                    color: m >= 0 ? "#10b981" : "#f43f5e"
                  },
                  children: ["YoY ", m >= 0 ? "+" : "", m, "%"]
                }), e.jsx("span", {
                  style: {
                    fontSize: "11px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600,
                    background: "rgba(124,58,237,.08)",
                    padding: "2px 8px",
                    borderRadius: "99px"
                  },
                  children: "HOSxP XE"
                })]
              })]
            }), e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "8px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#7c3aed",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 0 40px rgba(124,58,237,.3)"
                },
                children: (r / 1e6).toFixed(1)
              }), e.jsx("span", {
                style: {
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#7c3aed"
                },
                children: "ล้านบาท"
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: s >= 15 ? "rgba(16,185,129,.1)" : s >= 5 ? "rgba(245,158,11,.1)" : "rgba(244,63,94,.1)",
                  color: s >= 15 ? "#10b981" : s >= 5 ? "#f59e0b" : "#f43f5e"
                },
                children: ["Margin ", s, "%"]
              })]
            }), e.jsxs("div", {
              children: [e.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "3px"
                },
                children: [e.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#7c3aed"
                  },
                  children: ["💰 Revenue ", (r / 1e6).toFixed(1), " ล้าน"]
                }), e.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#f43f5e"
                  },
                  children: ["📊 Expense ", (n / 1e6).toFixed(1), " ล้าน", l ? " (est.)" : ""]
                })]
              }), e.jsxs("div", {
                style: {
                  height: "6px",
                  borderRadius: "99px",
                  overflow: "hidden",
                  background: "rgba(244,63,94,.12)",
                  display: "flex"
                },
                children: [e.jsx("div", {
                  style: {
                    width: r > 0 ? `${Math.max(s,0)}%` : "0%",
                    background: "linear-gradient(90deg, #10b981, #059669)",
                    borderRadius: "99px 0 0 99px",
                    transition: "width 0.8s ease"
                  }
                }), e.jsx("div", {
                  style: {
                    flex: 1,
                    background: "rgba(244,63,94,.2)",
                    borderRadius: "0 99px 99px 0"
                  }
                })]
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px"
                },
                children: [e.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#10b981"
                  },
                  children: ["📈 กำไร ", (i / 1e6).toFixed(1), " ล้าน (", s, "%)"]
                }), l && e.jsx("span", {
                  style: {
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: "*ค่าใช้จ่ายประมาณการ สธ. 82%"
                })]
              })]
            })]
          })
        })()]
      }), e.jsx("div", {
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(244,63,94,.10) 0%, rgba(220,38,38,.05) 100%)",
          border: "1px solid rgba(244,63,94,.25)",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: b === "expense" ? "translateY(-2px)" : "none",
          boxShadow: b === "expense" ? "0 8px 25px rgba(244,63,94,.2)" : "none"
        },
        onMouseEnter: () => c("expense"),
        onMouseLeave: () => c(null),
        children: y.financeSummary ? e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          },
          children: [e.jsx("div", {
            className: "skeleton",
            style: {
              height: "10px",
              width: "60px"
            }
          }), e.jsx("div", {
            className: "skeleton",
            style: {
              height: "28px",
              width: "80px"
            }
          })]
        }) : e.jsxs(e.Fragment, {
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "6px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--md-text-tertiary)"
              },
              children: "ค่าใช้จ่ายรวม (est.)"
            }), e.jsx("span", {
              style: {
                fontSize: "18px"
              },
              children: "📊"
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "4px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: "#f43f5e",
                letterSpacing: "-0.03em",
                lineHeight: 1
              },
              children: ((a?.total_expense ?? Math.round((a?.total_revenue ?? 0) * .82)) / 1e6).toFixed(1)
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: "#f43f5e"
              },
              children: "ล้านบาท"
            })]
          }), e.jsx("p", {
            style: {
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              margin: "4px 0 0",
              fontWeight: 600
            },
            children: "*ประมาณการจาก Expense Ratio 82% (สธ.)"
          })]
        })
      }), e.jsx("div", {
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: `linear-gradient(135deg, ${(a?.net_profit??0)>=0?"rgba(16,185,129,.10) 0%, rgba(5,150,105,.05)":"rgba(244,63,94,.10) 0%, rgba(220,38,38,.05)"} 100%)`,
          border: `1px solid ${(a?.net_profit??0)>=0?"rgba(16,185,129,.25)":"rgba(244,63,94,.25)"}`,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: b === "profit" ? "translateY(-2px)" : "none",
          boxShadow: b === "profit" ? `0 8px 25px ${(a?.net_profit??0)>=0?"rgba(16,185,129,.2)":"rgba(244,63,94,.2)"}` : "none"
        },
        onMouseEnter: () => c("profit"),
        onMouseLeave: () => c(null),
        children: y.financeSummary ? e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          },
          children: [e.jsx("div", {
            className: "skeleton",
            style: {
              height: "10px",
              width: "60px"
            }
          }), e.jsx("div", {
            className: "skeleton",
            style: {
              height: "28px",
              width: "80px"
            }
          })]
        }) : e.jsxs(e.Fragment, {
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "6px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--md-text-tertiary)"
              },
              children: "กำไรสุทธิ (est.)"
            }), e.jsx("span", {
              style: {
                fontSize: "18px"
              },
              children: "📈"
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "4px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: (a?.net_profit ?? 0) >= 0 ? "#10b981" : "#f43f5e",
                letterSpacing: "-0.03em",
                lineHeight: 1
              },
              children: ((a?.net_profit ?? Math.round((a?.total_revenue ?? 0) * .18)) / 1e6).toFixed(1)
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: (a?.net_profit ?? 0) >= 0 ? "#10b981" : "#f43f5e"
              },
              children: "ล้านบาท"
            }), e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                padding: "2px 6px",
                borderRadius: "99px",
                background: "rgba(16,185,129,.1)",
                color: "#10b981"
              },
              children: [a?.profit_margin ?? 18, "%"]
            })]
          })]
        })
      })]
    }), e.jsxs(k, {
      name: "Claim Denial Analytics",
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
          marginTop: "16px"
        },
        children: [e.jsx("div", {
          style: {
            width: "4px",
            height: "22px",
            background: "linear-gradient(180deg, #f43f5e, #f59e0b)",
            borderRadius: "99px"
          }
        }), e.jsx("h3", {
          style: {
            margin: 0,
            fontSize: "16px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: "Claim Denial Analytics"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            marginLeft: "auto"
          },
          children: d ? "Live Data" : "Loading..."
        })]
      }), (() => {
        const r = d,
          n = (r?.total_denied || 0) > 0,
          i = n ? r?.by_payer || [] : r?.revenue_by_payer || [],
          s = r?.total_visits_30d || 0;
        return e.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "12px",
            marginBottom: "1.5rem"
          },
          children: [e.jsxs("div", {
            style: {
              padding: "16px",
              borderRadius: "16px",
              background: "var(--md-surface-2)",
              border: "1px solid var(--md-border)",
              borderTop: `3px solid ${n?"#f43f5e":"#10b981"}`
            },
            children: [e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "10px"
              },
              children: [e.jsxs("div", {
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  },
                  children: n ? "Claim Denial Rate" : "Collection Status"
                }), e.jsx("h4", {
                  style: {
                    margin: "4px 0 0 0",
                    color: "var(--md-text-primary)",
                    fontSize: "13px",
                    fontWeight: 700
                  },
                  children: n ? "อัตราค้างชำระ" : "สถานะการจัดเก็บ"
                })]
              }), e.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 700,
                  color: n ? "#f43f5e" : "#10b981",
                  background: n ? "rgba(244,63,94,0.1)" : "rgba(16,185,129,0.1)",
                  padding: "3px 8px",
                  borderRadius: "6px"
                },
                children: r?.status === "excellent" ? "✅ ดีเยี่ยม" : r?.status === "critical" ? "❌ วิกฤต" : n ? "⚠️ มีค้าง" : "✅ ปกติ"
              })]
            }), e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                marginBottom: "8px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "28px",
                  fontWeight: 900,
                  color: n ? "#f43f5e" : "#10b981",
                  letterSpacing: "-0.02em"
                },
                children: r?.denial_rate != null ? `${Number(r.denial_rate).toFixed(1)}%` : "0%"
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: ["(", s.toLocaleString(), " visits · 30 วัน)"]
              })]
            }), e.jsx("div", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-secondary)",
                lineHeight: 1.6
              },
              children: r?.analysis || `ค้างชำระ ${r?.total_denied||0} เคส`
            })]
          }), e.jsxs("div", {
            style: {
              padding: "16px",
              borderRadius: "16px",
              background: "var(--md-surface-2)",
              border: "1px solid var(--md-border)",
              borderTop: `3px solid ${n?"#f59e0b":"#0f766e"}`
            },
            children: [e.jsx("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "10px"
              },
              children: e.jsxs("div", {
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  },
                  children: n ? "Amount at Risk" : "Revenue 30 Days"
                }), e.jsx("h4", {
                  style: {
                    margin: "4px 0 0 0",
                    color: "var(--md-text-primary)",
                    fontSize: "13px",
                    fontWeight: 700
                  },
                  children: n ? "มูลค่าเสี่ยง" : "รายได้ 30 วัน"
                })]
              })
            }), e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                marginBottom: "8px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "24px",
                  fontWeight: 900,
                  color: n ? "#f59e0b" : "#0f766e",
                  letterSpacing: "-0.02em"
                },
                children: n ? `${(Number(r?.amount_at_risk||0)/1e6).toFixed(2)} ล้าน` : `${(i.reduce((l,m)=>l+(m.revenue||0),0)/1e6).toFixed(1)} ล้าน`
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "บาท"
              })]
            }), n && r?.top_reasons?.length > 0 && e.jsxs("div", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-secondary)"
              },
              children: ["สาเหตุ: ", r.top_reasons.map(l => `${l.reason} (${l.count})`).join(", ")]
            }), !n && e.jsx("div", {
              style: {
                fontSize: "12px",
                color: "#10b981",
                fontWeight: 700
              },
              children: "✅ ไม่มียอดค้างชำระ — Collection Rate 100%"
            })]
          }), e.jsxs("div", {
            style: {
              padding: "16px",
              borderRadius: "16px",
              background: "var(--md-surface-2)",
              border: "1px solid var(--md-border)",
              borderTop: "3px solid #8b5cf6"
            },
            children: [e.jsxs("div", {
              style: {
                marginBottom: "10px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase"
                },
                children: n ? "Denial by Payer" : "Revenue by Payer"
              }), e.jsx("h4", {
                style: {
                  margin: "4px 0 0 0",
                  color: "var(--md-text-primary)",
                  fontSize: "13px",
                  fontWeight: 700
                },
                children: n ? "ค้างชำระตามสิทธิ์" : "รายได้ตามสิทธิ์"
              })]
            }), i.length > 0 ? e.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "5px"
              },
              children: i.slice(0, 6).map((l, m) => {
                const S = i[0]?.revenue || i[0]?.amount || 1,
                  h = l.revenue || l.amount || 0,
                  f = S > 0 ? Math.round(h / S * 100) : 0;
                return e.jsxs("div", {
                  children: [e.jsxs("div", {
                    style: {
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      marginBottom: "2px"
                    },
                    children: [e.jsx("span", {
                      style: {
                        color: "var(--md-text-secondary)",
                        maxWidth: "55%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      },
                      children: l.payer
                    }), e.jsxs("span", {
                      style: {
                        fontWeight: 700,
                        color: "#8b5cf6"
                      },
                      children: [n ? `${l.count} เคส` : `฿${(h/1e6).toFixed(1)}M`, !n && l.visits ? ` · ${l.visits.toLocaleString()} visits` : ""]
                    })]
                  }), e.jsx("div", {
                    style: {
                      height: "3px",
                      borderRadius: "99px",
                      background: "var(--md-border)",
                      overflow: "hidden"
                    },
                    children: e.jsx("div", {
                      style: {
                        height: "100%",
                        width: `${f}%`,
                        background: "linear-gradient(90deg, #8b5cf6, #7c3aed)",
                        borderRadius: "99px",
                        transition: "width 0.5s"
                      }
                    })
                  })]
                }, m)
              })
            }) : e.jsx("span", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-tertiary)"
              },
              children: y.denialAnalytics ? "⏳ กำลังโหลด..." : "ไม่มีข้อมูล"
            })]
          })]
        })
      })(), e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "14px",
          marginTop: "4px"
        },
        children: [e.jsx("div", {
          style: {
            width: "3px",
            height: "18px",
            background: "linear-gradient(180deg, #0ea5e9, #7c3aed)",
            borderRadius: "99px"
          }
        }), e.jsxs("h3", {
          style: {
            margin: 0,
            fontSize: "14px",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: ["PPFS — ผลงานส่งเสริมป้องกัน", e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginLeft: "8px"
            },
            children: o?.note || "เปรียบเทียบ ปีงบ 68 vs 69"
          })]
        })]
      }), e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "12px",
          marginBottom: "1.75rem"
        },
        children: [e.jsxs("div", {
          style: {
            padding: "16px",
            borderRadius: "16px",
            background: "var(--md-surface-2)",
            border: "1px solid var(--md-border)",
            borderTop: "3px solid #0ea5e9"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            },
            children: o?.period_1_label || "ปีงบ 2568"
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              margin: "8px 0"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "24px",
                fontWeight: 900,
                color: "#0ea5e9"
              },
              children: o?.total_cases_p1?.toLocaleString() || "—"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: "ราย"
            })]
          }), e.jsxs("div", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-secondary)"
            },
            children: ["มูลค่า ", o?.total_rev_p1 ? `${Number(o.total_rev_p1).toLocaleString()} บาท` : "—"]
          })]
        }), e.jsxs("div", {
          style: {
            padding: "16px",
            borderRadius: "16px",
            background: "var(--md-surface-2)",
            border: "1px solid var(--md-border)",
            borderTop: "3px solid #10b981"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            },
            children: o?.period_2_label || "ปีงบ 2569"
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              margin: "8px 0"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "24px",
                fontWeight: 900,
                color: "#10b981"
              },
              children: o?.total_cases_p2?.toLocaleString() || "—"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: "ราย"
            })]
          }), e.jsxs("div", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-secondary)"
            },
            children: ["มูลค่า ", o?.total_rev_p2 ? `${Number(o.total_rev_p2).toLocaleString()} บาท` : "—"]
          })]
        }), (() => {
          const r = o?.growth_pct ?? 0,
            n = r >= 10 ? "#10b981" : r >= 0 ? "#0ea5e9" : "#f43f5e";
          return e.jsxs("div", {
            style: {
              padding: "16px",
              borderRadius: "16px",
              background: "var(--md-surface-2)",
              border: "1px solid var(--md-border)",
              borderTop: `3px solid ${n}`
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              },
              children: "อัตราเติบโต YoY"
            }), e.jsx("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                margin: "8px 0"
              },
              children: e.jsxs("span", {
                style: {
                  fontSize: "28px",
                  fontWeight: 900,
                  color: n
                },
                children: [r >= 0 ? "+" : "", r, "%"]
              })
            }), e.jsx("div", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-secondary)"
              },
              children: r >= 10 ? "📈 ผลงานเพิ่มขึ้นมาก — กิจกรรมส่งเสริมสุขภาพเข้มแข็ง" : r >= 0 ? "📊 ผลงานเพิ่มขึ้น — รักษาแนวโน้ม" : "📉 ผลงานลดลง — ตรวจสอบกิจกรรมที่ลดลง"
            }), e.jsxs("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                marginTop: "4px"
              },
              children: [o?.activity_count || 0, " กิจกรรมที่มีข้อมูล"]
            })]
          })
        })()]
      })]
    }), e.jsx(k, {
      name: "Revenue Forecast",
      children: e.jsx(Q, {
        data: u,
        loading: y.revenueForecast
      })
    }), e.jsx(k, {
      name: "DRG Revenue Leakage",
      children: e.jsx(q, {
        data: _,
        loading: y.drgLeakage
      })
    }), e.jsx(E, {
      data: x.financeAI,
      theme: "default",
      title: "AI Finance Intelligence"
    })]
  })
}

function V({
  active: x,
  payload: p,
  label: g
}) {
  return !x || !p?.length ? null : e.jsxs("div", {
    style: {
      background: "var(--md-surface-1)",
      border: "1px solid var(--md-border)",
      borderRadius: "10px",
      padding: "10px 14px",
      fontSize: "12px"
    },
    children: [e.jsx("div", {
      style: {
        fontWeight: 700,
        marginBottom: "6px",
        color: "var(--md-text-primary)"
      },
      children: g
    }), p.map((d, j) => e.jsxs("div", {
      style: {
        color: d.color,
        marginBottom: "2px"
      },
      children: [d.name, ": ฿", (Number(d.value) / 1e6).toFixed(2), "M"]
    }, j))]
  })
}

function v({
  icon: x,
  title: p,
  text: g,
  list: d,
  color: j = "#7c3aed"
}) {
  return e.jsxs("div", {
    style: {
      background: "var(--md-surface-2)",
      border: "1px solid var(--md-border)",
      borderLeft: `3px solid ${j}`,
      borderRadius: "10px",
      padding: "14px 16px"
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
        children: x
      }), e.jsx("span", {
        style: {
          fontWeight: 700,
          fontSize: "12px",
          color: "var(--md-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        },
        children: p
      })]
    }), g && e.jsx("p", {
      style: {
        fontSize: "13px",
        color: "var(--md-text-primary)",
        lineHeight: 1.6,
        margin: 0
      },
      children: g
    }), d && e.jsx("ul", {
      style: {
        margin: "4px 0 0 0",
        paddingLeft: "16px"
      },
      children: d.map((o, u) => e.jsx("li", {
        style: {
          fontSize: "13px",
          color: "var(--md-text-primary)",
          lineHeight: 1.7
        },
        children: o
      }, u))
    })]
  })
}

function Q({
  data: x,
  loading: p
}) {
  if (p) return e.jsxs("div", {
    style: {
      marginTop: "32px",
      padding: "24px",
      background: "var(--md-surface-1)",
      borderRadius: "16px",
      border: "1px solid var(--md-border)"
    },
    children: [e.jsx("div", {
      style: {
        height: "24px",
        width: "260px",
        background: "var(--md-surface-2)",
        borderRadius: "8px",
        marginBottom: "16px"
      }
    }), e.jsx("div", {
      style: {
        height: "240px",
        background: "var(--md-surface-2)",
        borderRadius: "12px"
      }
    })]
  });
  if (!x) return null;
  const {
    forecast: g = [],
    summary: d = {},
    seasonal_index: j = {},
    narrative: o
  } = x, u = g.map((a, r) => ({
    name: `${a.month_name} ${a.year}`,
    forecast: a.forecast,
    lower: Math.max(a.lower, 0),
    upper: a.upper,
    ci_band: [Math.max(a.lower, 0), a.upper]
  })), _ = d.yoy_growth ?? 0, t = d.trend_direction === "increasing", y = d.total_forecast ?? 0, b = d.avg_monthly_forecast ?? 0, c = o?._source === "claude" ? "🤖 Claude AI" : "📐 Rule-based";
  return e.jsxs("div", {
    style: {
      marginTop: "32px"
    },
    children: [e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px"
      },
      children: [e.jsx("div", {
        style: {
          width: "4px",
          height: "32px",
          background: "linear-gradient(180deg,#7c3aed,#a855f7)",
          borderRadius: "2px"
        }
      }), e.jsxs("div", {
        children: [e.jsx("h3", {
          style: {
            margin: 0,
            fontSize: "18px",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: "📈 Revenue Forecast — 3 เดือนข้างหน้า"
        }), e.jsxs("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)"
          },
          children: ["Holt-Winters + Multiplicative Seasonality · ", c]
        })]
      }), e.jsxs("span", {
        style: {
          marginLeft: "auto",
          padding: "4px 12px",
          borderRadius: "99px",
          fontSize: "12px",
          fontWeight: 700,
          background: t ? "rgba(16,185,129,0.12)" : "rgba(244,63,94,0.12)",
          color: t ? "#10b981" : "#f43f5e"
        },
        children: [t ? "▲" : "▼", " YoY ", Math.abs(_).toFixed(1), "%"]
      })]
    }), e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "12px",
        marginBottom: "20px"
      },
      children: [{
        label: "รวม 3 เดือน",
        value: `฿${(y/1e6).toFixed(2)}M`,
        color: "#7c3aed"
      }, {
        label: "เฉลี่ย/เดือน",
        value: `฿${(b/1e6).toFixed(2)}M`,
        color: "#8b5cf6"
      }, ...g.map(a => ({
        label: `${a.month_name} ${a.year}`,
        value: `฿${(a.forecast/1e6).toFixed(2)}M`,
        color: "#6d28d9"
      }))].map((a, r) => e.jsxs("div", {
        style: {
          padding: "14px",
          background: "var(--md-surface-2)",
          border: "1px solid var(--md-border)",
          borderTop: `3px solid ${a.color}`,
          borderRadius: "12px"
        },
        children: [e.jsx("div", {
          style: {
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "6px"
          },
          children: a.label
        }), e.jsx("div", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            color: a.color
          },
          children: a.value
        })]
      }, r))
    }), e.jsxs("div", {
      style: {
        background: "var(--md-surface-2)",
        borderRadius: "14px",
        border: "1px solid var(--md-border)",
        padding: "20px",
        marginBottom: "20px"
      },
      children: [e.jsx(O, {
        width: "100%",
        height: 220,
        children: e.jsxs(H, {
          data: u,
          margin: {
            top: 10,
            right: 20,
            left: 10,
            bottom: 0
          },
          children: [e.jsx(P, {
            strokeDasharray: "3 3",
            stroke: "var(--md-border)"
          }), e.jsx(N, {
            dataKey: "name",
            tick: {
              fill: "var(--md-text-tertiary)",
              fontSize: 11
            }
          }), e.jsx(Y, {
            tickFormatter: a => `฿${(a/1e6).toFixed(1)}M`,
            tick: {
              fill: "var(--md-text-tertiary)",
              fontSize: 11
            }
          }), e.jsx(G, {
            content: e.jsx(V, {})
          }), e.jsx(X, {
            wrapperStyle: {
              fontSize: "12px"
            }
          }), e.jsx(W, {
            type: "monotone",
            dataKey: "upper",
            name: "Upper CI",
            fill: "#7c3aed",
            fillOpacity: .08,
            stroke: "none"
          }), e.jsx(W, {
            type: "monotone",
            dataKey: "lower",
            name: "Lower CI",
            fill: "var(--md-surface-1)",
            fillOpacity: 1,
            stroke: "none"
          }), e.jsx(U, {
            type: "monotone",
            dataKey: "forecast",
            name: "พยากรณ์",
            stroke: "#7c3aed",
            strokeWidth: 2.5,
            strokeDasharray: "6 3",
            dot: {
              fill: "#7c3aed",
              r: 5
            }
          })]
        })
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "16px"
        },
        children: g.map((a, r) => e.jsxs("div", {
          style: {
            background: "var(--md-surface-1)",
            borderRadius: "10px",
            padding: "12px",
            textAlign: "center",
            border: "1px solid var(--md-border)"
          },
          children: [e.jsxs("div", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              marginBottom: "4px"
            },
            children: [a.month_name, " ", a.year]
          }), e.jsxs("div", {
            style: {
              fontSize: "18px",
              fontWeight: 800,
              color: "#7c3aed",
              marginBottom: "4px"
            },
            children: ["฿", (a.forecast / 1e6).toFixed(2), "M"]
          }), e.jsxs("div", {
            style: {
              fontSize: "11px",
              color: "var(--md-text-tertiary)"
            },
            children: ["CI: ฿", (Math.max(a.lower, 0) / 1e6).toFixed(2), "M – ฿", (a.upper / 1e6).toFixed(2), "M"]
          })]
        }, r))
      })]
    }), o && e.jsxs("div", {
      style: {
        background: "var(--md-surface-2)",
        borderRadius: "14px",
        border: "1px solid var(--md-border)",
        padding: "20px"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px"
        },
        children: [e.jsx("span", {
          style: {
            fontSize: "14px"
          },
          children: "🧠"
        }), e.jsx("span", {
          style: {
            fontWeight: 700,
            fontSize: "13px",
            color: "var(--md-text-primary)"
          },
          children: "AI Analysis"
        }), e.jsx("span", {
          style: {
            marginLeft: "auto",
            fontSize: "11px",
            color: "var(--md-text-tertiary)",
            background: "var(--md-surface-1)",
            padding: "2px 8px",
            borderRadius: "99px",
            border: "1px solid var(--md-border)"
          },
          children: c
        })]
      }), o.headline && e.jsx("div", {
        style: {
          padding: "12px 16px",
          background: "rgba(124,58,237,0.08)",
          borderRadius: "10px",
          borderLeft: "3px solid #7c3aed",
          marginBottom: "14px",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--md-text-primary)"
        },
        children: o.headline
      }), e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "10px"
        },
        children: [o.trend_analysis && e.jsx(v, {
          icon: "📊",
          title: "Trend Analysis",
          text: o.trend_analysis,
          color: "#7c3aed"
        }), o.seasonal_insight && e.jsx(v, {
          icon: "🗓️",
          title: "Seasonal Pattern",
          text: o.seasonal_insight,
          color: "#8b5cf6"
        })]
      }), e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px"
        },
        children: [o.risks?.length > 0 && e.jsx(v, {
          icon: "⚠️",
          title: "ความเสี่ยง",
          list: o.risks,
          color: "#f59e0b"
        }), o.recommendations?.length > 0 && e.jsx(v, {
          icon: "💡",
          title: "คำแนะนำ",
          list: o.recommendations,
          color: "#10b981"
        })]
      }), o.model_note && e.jsxs("div", {
        style: {
          marginTop: "10px",
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontStyle: "italic"
        },
        children: ["📐 ", o.model_note]
      })]
    })]
  })
}

function q({
  data: x,
  loading: p
}) {
  const [g, d] = T.useState("no_cc");
  if (p) return e.jsxs("div", {
    style: {
      marginTop: "32px",
      padding: "24px",
      background: "var(--md-surface-1)",
      borderRadius: "16px",
      border: "1px solid var(--md-border)"
    },
    children: [e.jsx("div", {
      style: {
        height: "24px",
        width: "280px",
        background: "var(--md-surface-2)",
        borderRadius: "8px",
        marginBottom: "16px"
      }
    }), e.jsx("div", {
      style: {
        height: "200px",
        background: "var(--md-surface-2)",
        borderRadius: "12px"
      }
    })]
  });
  if (!x) return null;
  const {
    total_estimated_loss: j = 0,
    no_cc_mcc_count: o = 0,
    low_rw_count: u = 0,
    total_cases: _ = 0,
    by_ward: t = [],
    no_cc_cases: y = [],
    low_rw_cases: b = [],
    narrative: c
  } = x, a = _ > 0 ? ((o + u) / _ * 100).toFixed(1) : 0, r = c?._source === "claude" ? "🤖 Claude AI" : "📐 Rule-based", n = g === "no_cc" ? y : b;
  return e.jsxs("div", {
    style: {
      marginTop: "32px",
      marginBottom: "32px"
    },
    children: [e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px"
      },
      children: [e.jsx("div", {
        style: {
          width: "4px",
          height: "32px",
          background: "linear-gradient(180deg,#f43f5e,#f97316)",
          borderRadius: "2px"
        }
      }), e.jsxs("div", {
        children: [e.jsx("h3", {
          style: {
            margin: 0,
            fontSize: "18px",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: "🔍 DRG Revenue Leakage Detection"
        }), e.jsxs("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)"
          },
          children: ["30 วันล่าสุด · CC/MCC Absence + Low RW vs LOS · ", r]
        })]
      }), e.jsxs("span", {
        style: {
          marginLeft: "auto",
          padding: "6px 14px",
          borderRadius: "99px",
          fontSize: "13px",
          fontWeight: 800,
          background: "rgba(244,63,94,0.12)",
          color: "#f43f5e",
          border: "1px solid rgba(244,63,94,0.3)"
        },
        children: ["฿", j.toLocaleString(), " estimated loss"]
      })]
    }), e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "12px",
        marginBottom: "20px"
      },
      children: [{
        label: "Total Cases",
        value: _.toLocaleString(),
        color: "#64748b"
      }, {
        label: "No CC/MCC",
        value: o.toLocaleString(),
        color: "#f59e0b",
        sub: "เคส Undercoding"
      }, {
        label: "Low RW vs LOS",
        value: u.toLocaleString(),
        color: "#ef4444",
        sub: "RW ต่ำ / LOS สูง"
      }, {
        label: "Leakage Rate",
        value: `${a}%`,
        color: Number(a) > 20 ? "#f43f5e" : "#f59e0b"
      }, {
        label: "Est. Loss (NoCC)",
        value: `฿${(o*.35*8e3).toLocaleString()}`,
        color: "#f97316"
      }, {
        label: "Est. Loss (LowRW)",
        value: `฿${(u*.4*8e3).toLocaleString()}`,
        color: "#f43f5e"
      }].map((i, s) => e.jsxs("div", {
        style: {
          padding: "14px",
          background: "var(--md-surface-2)",
          border: "1px solid var(--md-border)",
          borderTop: `3px solid ${i.color}`,
          borderRadius: "12px"
        },
        children: [e.jsx("div", {
          style: {
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "6px"
          },
          children: i.label
        }), e.jsx("div", {
          style: {
            fontSize: "20px",
            fontWeight: 900,
            color: i.color
          },
          children: i.value
        }), i.sub && e.jsx("div", {
          style: {
            fontSize: "11px",
            color: "var(--md-text-tertiary)",
            marginTop: "2px"
          },
          children: i.sub
        })]
      }, s))
    }), t.length > 0 && e.jsxs("div", {
      style: {
        background: "var(--md-surface-2)",
        borderRadius: "14px",
        border: "1px solid var(--md-border)",
        padding: "20px",
        marginBottom: "20px"
      },
      children: [e.jsx("div", {
        style: {
          fontWeight: 700,
          fontSize: "13px",
          color: "var(--md-text-secondary)",
          marginBottom: "14px",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        },
        children: "🏥 Ward Breakdown — DRG Leakage Priority"
      }), e.jsx("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        },
        children: t.slice(0, 5).map((i, s) => {
          const l = t[0]?.estimated_baht_loss || 1,
            m = Math.round(i.estimated_baht_loss / l * 100);
          return e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "140px 1fr 80px 90px",
              alignItems: "center",
              gap: "12px"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-primary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              },
              children: i.ward
            }), e.jsx("div", {
              style: {
                height: "8px",
                background: "var(--md-border)",
                borderRadius: "99px",
                overflow: "hidden"
              },
              children: e.jsx("div", {
                style: {
                  height: "100%",
                  width: `${m}%`,
                  background: s === 0 ? "#f43f5e" : s === 1 ? "#f97316" : "#f59e0b",
                  borderRadius: "99px",
                  transition: "width 0.5s ease"
                }
              })
            }), e.jsxs("div", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                textAlign: "right"
              },
              children: [i.case_count, " เคส"]
            }), e.jsxs("div", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: "#f43f5e",
                textAlign: "right"
              },
              children: ["฿", (i.estimated_baht_loss || 0).toLocaleString()]
            })]
          }, s)
        })
      })]
    }), e.jsxs("div", {
      style: {
        background: "var(--md-surface-2)",
        borderRadius: "14px",
        border: "1px solid var(--md-border)",
        padding: "20px",
        marginBottom: "20px"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px"
        },
        children: [e.jsx("span", {
          style: {
            fontWeight: 700,
            fontSize: "13px",
            color: "var(--md-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginRight: "8px"
          },
          children: "Top Cases"
        }), [{
          key: "no_cc",
          label: "⚠️ No CC/MCC"
        }, {
          key: "low_rw",
          label: "📉 Low RW"
        }].map(i => e.jsx("button", {
          onClick: () => d(i.key),
          style: {
            padding: "5px 14px",
            borderRadius: "99px",
            fontSize: "12px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            background: g === i.key ? "#7c3aed" : "var(--md-surface-1)",
            color: g === i.key ? "#fff" : "var(--md-text-secondary)",
            transition: "all 0.2s"
          },
          children: i.label
        }, i.key))]
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
            children: e.jsx("tr", {
              style: {
                borderBottom: "1px solid var(--md-border)"
              },
              children: ["AN", "Ward", "LOS", "Diag", "adjRW", "Issue"].map(i => e.jsx("th", {
                style: {
                  textAlign: "left",
                  padding: "8px 10px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  fontSize: "11px",
                  textTransform: "uppercase"
                },
                children: i
              }, i))
            })
          }), e.jsxs("tbody", {
            children: [n.slice(0, 8).map((i, s) => e.jsxs("tr", {
              style: {
                borderBottom: "1px solid var(--md-border)",
                background: s % 2 === 0 ? "transparent" : "rgba(0,0,0,0.02)"
              },
              children: [e.jsx("td", {
                style: {
                  padding: "8px 10px",
                  color: "var(--md-text-tertiary)",
                  fontFamily: "monospace",
                  fontSize: "12px"
                },
                children: i.an
              }), e.jsx("td", {
                style: {
                  padding: "8px 10px",
                  fontSize: "12px",
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                children: i.ward
              }), e.jsxs("td", {
                style: {
                  padding: "8px 10px",
                  fontWeight: 700,
                  color: i.los >= 5 ? "#f43f5e" : "var(--md-text-primary)"
                },
                children: [i.los, "d"]
              }), e.jsx("td", {
                style: {
                  padding: "8px 10px",
                  color: "var(--md-text-tertiary)",
                  fontSize: "12px",
                  maxWidth: "180px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                title: i.pdx_name || i.pdx,
                children: i.pdx_name || i.pdx || i.drg || "—"
              }), e.jsx("td", {
                style: {
                  padding: "8px 10px",
                  fontWeight: 700,
                  color: Number(i.rw) < .5 ? "#f43f5e" : "#f59e0b"
                },
                children: Number(i.rw).toFixed(4)
              }), e.jsx("td", {
                style: {
                  padding: "8px 10px"
                },
                children: e.jsx("span", {
                  style: {
                    background: i.issue === "no_cc_mcc" ? "rgba(245,158,11,0.1)" : "rgba(244,63,94,0.1)",
                    color: i.issue === "no_cc_mcc" ? "#f59e0b" : "#f43f5e",
                    borderRadius: "99px",
                    padding: "2px 8px",
                    fontSize: "11px",
                    fontWeight: 700
                  },
                  children: i.issue === "no_cc_mcc" ? "No CC/MCC" : `LowRW (${i.los_per_rw||"—"})`
                })
              })]
            }, s)), n.length === 0 && e.jsx("tr", {
              children: e.jsx("td", {
                colSpan: 6,
                style: {
                  padding: "20px",
                  textAlign: "center",
                  color: "var(--md-text-tertiary)",
                  fontSize: "12px"
                },
                children: "ไม่พบเคส"
              })
            })]
          })]
        })
      })]
    }), c && e.jsxs("div", {
      style: {
        background: "var(--md-surface-2)",
        borderRadius: "14px",
        border: "1px solid var(--md-border)",
        padding: "20px"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px"
        },
        children: [e.jsx("span", {
          style: {
            fontSize: "14px"
          },
          children: "🧠"
        }), e.jsx("span", {
          style: {
            fontWeight: 700,
            fontSize: "13px",
            color: "var(--md-text-primary)"
          },
          children: "AI Analysis — DRG Revenue Leakage"
        }), e.jsx("span", {
          style: {
            marginLeft: "auto",
            fontSize: "11px",
            color: "var(--md-text-tertiary)",
            background: "var(--md-surface-1)",
            padding: "2px 8px",
            borderRadius: "99px",
            border: "1px solid var(--md-border)"
          },
          children: r
        })]
      }), c.headline && e.jsx("div", {
        style: {
          padding: "12px 16px",
          background: "rgba(244,63,94,0.08)",
          borderRadius: "10px",
          borderLeft: "3px solid #f43f5e",
          marginBottom: "14px",
          fontSize: "14px",
          fontWeight: 600,
          color: "var(--md-text-primary)"
        },
        children: c.headline
      }), e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "10px"
        },
        children: [c.top_issues?.length > 0 && e.jsx(v, {
          icon: "🚨",
          title: "ปัญหาหลัก",
          list: c.top_issues,
          color: "#f43f5e"
        }), c.impact_analysis && e.jsx(v, {
          icon: "💰",
          title: "ผลกระทบทางการเงิน",
          text: c.impact_analysis,
          color: "#f97316"
        })]
      }), e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px"
        },
        children: [c.action_plan?.length > 0 && e.jsx(v, {
          icon: "📋",
          title: "แผนปฏิบัติ",
          list: c.action_plan,
          color: "#7c3aed"
        }), c.priority_wards && e.jsx(v, {
          icon: "🏥",
          title: "Ward Priority",
          text: `เร่งดำเนินการที่ Ward: ${c.priority_wards}`,
          color: "#0ea5e9"
        })]
      })]
    })]
  })
}
const te = T.memo(K);
export {
  te as
  default
};