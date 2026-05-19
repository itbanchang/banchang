import {
  R as G,
  r as L,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  b as V,
  a as Y,
  E as X,
  p as Q,
  M as J,
  S as P,
  g as Z,
  h as ee
} from "./shared-ui-OVDEF1.js";
import {
  R as z,
  c as H,
  a as R,
  X as T,
  Y as $,
  T as N,
  B as M,
  e as E,
  C as U,
  b as O,
  A as F
} from "./vendor-charts-C5q2M-g3.js";

function te() {
  const u = V(t => ({
      ncdToday: t.ncdToday,
      ncdAnalytics: t.ncdAnalytics,
      loading: t.loading,
      ncdRiskStratification: t.ncdRiskStratification,
      ncdRevenueFiscal: t.ncdRevenueFiscal,
      ncdGoalAttainment: t.ncdGoalAttainment,
      ncdMonthlyFiscal: t.ncdMonthlyFiscal,
      ncdAI: t.ncdAI
    })),
    {
      fetchData: k
    } = Y(),
    b = u.ncdToday,
    m = u.ncdAnalytics,
    f = u.loading;
  L.useEffect(() => {
    k("ncdToday", "/api/ncd/today"), k("ncdAnalytics", "/api/ncd/analytics"), k("ncdRevenueFiscal", "/api/ncd/revenue-fiscal"), k("ncdMonthlyFiscal", "/api/ncd/monthly-fiscal"), k("ncdRiskStratification", "/api/ncd/ai/risk-stratification"), k("ncdGoalAttainment", "/api/ncd/goal-attainment");
    const t = setTimeout(() => k("ncdAI", "/api/ai/ncd/optimization"), 600);
    return () => clearTimeout(t)
  }, [k]);
  const s = b || {},
    I = m || {},
    B = L.useMemo(() => {
      const t = s.diseases || s.disease_breakdown || {};
      return [{
        code: "DM",
        label: "Diabetes Mellitus",
        icon: "🩸",
        count: t.dm ?? t.DM ?? 0,
        color: "#e11d48",
        target: "HbA1c <7%"
      }, {
        code: "HT",
        label: "Hypertension",
        icon: "💓",
        count: t.ht ?? t.HT ?? 0,
        color: "#7c3aed",
        target: "BP <140/90"
      }, {
        code: "IHD",
        label: "Ischemic Heart Disease",
        icon: "🫀",
        count: t.ihd ?? t.IHD ?? 0,
        color: "#f59e0b",
        target: "LDL <70"
      }, {
        code: "Stroke",
        label: "Cerebrovascular",
        icon: "🧠",
        count: t.stroke ?? t.Stroke ?? 0,
        color: "#0ea5e9",
        target: "BP <130/80"
      }, {
        code: "COPD",
        label: "Chronic Lung Disease",
        icon: "🫁",
        count: t.copd ?? t.COPD ?? 0,
        color: "#059669",
        target: "FEV1 >80%"
      }, {
        code: "CKD",
        label: "Chronic Kidney Disease",
        icon: "🫘",
        count: t.ckd ?? t.CKD ?? 0,
        color: "#be123c",
        target: "eGFR >60"
      }]
    }, [s]),
    K = L.useMemo(() => {
      const t = s,
        i = I,
        n = t.total ?? 0,
        d = t.completed ?? 0,
        g = n > 0 ? Math.round(d / n * 100) : 0,
        j = t.diseases || t.disease_breakdown || {};
      return [{
        label: "NCD Visits",
        value: n.toLocaleString(),
        unit: "ราย",
        icon: "🫀",
        status: n > 0 ? "success" : "warning",
        target: "วันนี้ Real-time"
      }, {
        label: "Unique Patients",
        value: (t.unique_patients ?? 0).toLocaleString(),
        unit: "คน",
        icon: "👥",
        status: "normal",
        target: "HN ไม่ซ้ำ"
      }, {
        label: "DM Cases",
        value: (j.dm ?? j.DM ?? 0).toLocaleString(),
        unit: "ราย",
        icon: "🩸",
        gradient: "#e11d48",
        status: "normal",
        target: "เบาหวาน"
      }, {
        label: "HT Cases",
        value: (j.ht ?? j.HT ?? 0).toLocaleString(),
        unit: "ราย",
        icon: "💓",
        gradient: "#7c3aed",
        status: "normal",
        target: "ความดันสูง"
      }, {
        label: "Completion",
        value: `${g}%`,
        icon: "✅",
        status: g >= 90 ? "success" : g >= 70 ? "warning" : "critical",
        target: "เป้า ≥95%"
      }, {
        label: "NCI Score",
        value: `${i.nci??0}`,
        unit: "/100",
        icon: "⭐",
        gradient: "#e11d48",
        status: (i.nci ?? 0) >= 80 ? "success" : (i.nci ?? 0) >= 60 ? "warning" : "critical",
        target: "NCD Control Index"
      }, {
        label: "Avg Wait",
        value: `${i.avg_wait_time??0}`,
        unit: "min",
        icon: "⏱️",
        status: (i.avg_wait_time ?? 30) <= 15 ? "success" : (i.avg_wait_time ?? 30) <= 30 ? "warning" : "critical",
        target: "SLA ≤30 min"
      }, {
        label: "Revenue/Visit",
        value: `฿${(i.avg_revenue_per_visit??0).toLocaleString()}`,
        icon: "💰",
        status: "normal",
        target: "เฉลี่ยต่อ visit"
      }]
    }, [s, I]),
    q = L.useMemo(() => {
      const t = I,
        i = t.nci ?? 0,
        n = t.avg_wait_time ?? 0,
        d = t.completion_rate ?? 0,
        g = t.revisit_rate ?? 0;
      return [{
        title: "NCI Score Analysis",
        icon: "⭐",
        priority: i >= 80 ? "LOW" : i >= 60 ? "MEDIUM" : "HIGH",
        summary: `NCD Control Index: ${i}/100 (${i>=80?"Grade A":i>=60?"Grade B":"Grade C"}) - ${i>=80?"ประสิทธิภาพสูง คลินิก NCD ทำงานได้ดีทุกมิติ":i>=60?"มาตรฐานดี แต่มีจุดปรับปรุงได้":"ต้องปรับปรุงเร่งด่วน หลายมิติต่ำกว่าเกณฑ์"}`,
        analysis: `NCI คำนวณจาก 5 มิติ: Wait Time (${t.nci_components?.wait_time??0}), Completion (${t.nci_components?.completion??0}), Revisit (${t.nci_components?.revisit??0}), Revenue (${t.nci_components?.revenue??0}), SLA (${t.nci_components?.sla??0}) -- ครอบคลุมทั้ง Operational และ Financial dimension`,
        recommendation: i >= 80 ? "คงมาตรฐาน ขยายผลไปคลินิกอื่น เพิ่ม Complication Screening" : "เร่งแก้ไข Wait Time + Completion Rate เพื่อยกระดับ NCI ≥80",
        gradient: "#e11d48",
        gradientFrom: "rgba(225,29,72,.08)",
        gradientTo: "rgba(190,18,60,.04)",
        borderColor: "rgba(225,29,72,.25)",
        confidence: 92
      }, {
        title: "Disease Control Assessment",
        icon: "🫀",
        priority: d >= 90 ? "LOW" : d >= 75 ? "MEDIUM" : "HIGH",
        summary: `Completion Rate ${d}% | Dropout ${t.dropout_count??0} ราย -- ${d>=90?"Control ดี ผู้ป่วยส่วนใหญ่รักษาครบ":"Dropout สูง เสี่ยง Uncontrolled NCD"}`,
        analysis: `ผู้ป่วย NCD ที่ Dropout (${t.dropout_count??0} ราย) มีความเสี่ยงขาดยา นำไปสู่ Uncontrolled DM/HT ซึ่งเพิ่มโอกาส Complication: Stroke ฿150k+, MI ฿200k+, Dialysis ฿500k+/ปี`,
        recommendation: d >= 90 ? "เฝ้าระวัง Dropout ใหม่ด้วย SMS/LINE เตือนนัด + Telemedicine" : "ลด Dropout: (1) Pre-lab ก่อนพบแพทย์ (2) Fast-track Stable NCD (3) SMS/LINE เตือน (4) Telemedicine refill",
        gradient: "#7c3aed",
        gradientFrom: "rgba(124,58,237,.08)",
        gradientTo: "rgba(99,102,241,.04)",
        borderColor: "rgba(124,58,237,.25)",
        confidence: 88
      }, {
        title: "Patient Compliance Tracking",
        icon: "📋",
        priority: g < 5 ? "LOW" : g < 15 ? "MEDIUM" : "HIGH",
        summary: `Revisit 7d: ${g}% (${t.revisit_count??0} ราย) -- ${g<5?"Treatment plan ดี ผู้ป่วยควบคุมได้":g<15?"ปานกลาง ตรวจสอบ Planned vs Unplanned":"สูง Uncontrolled NCD concern"}`,
        analysis: "การกลับมาภายใน 7 วัน ต้องแยก Planned (Lab follow-up, ปรับยา) vs Unplanned (BP crisis, Hypoglycemia) -- Unplanned revisit สะท้อน Treatment quality และ Drug adherence",
        recommendation: g < 5 ? "RCA ทุกครั้งที่เกิด Unplanned revisit เพื่อป้องกัน" : "Audit ทุก 7d revisit -- Home BP/FBS monitoring + ปรับยาให้เหมาะสมตั้งแต่ครั้งแรก",
        gradient: "#0ea5e9",
        gradientFrom: "rgba(14,165,233,.08)",
        gradientTo: "rgba(6,182,212,.04)",
        borderColor: "rgba(14,165,233,.25)",
        confidence: 85
      }, {
        title: "Risk Stratification Intelligence",
        icon: "🔥",
        priority: n > 30 ? "HIGH" : n > 15 ? "MEDIUM" : "LOW",
        summary: `Wait Time ${n} min (SLA ≤30min: ${t.wait_sla_pct??0}%) | Over 30min: ${t.wait_over_30m??0} ครั้ง -- ${n<=15?"Flow ดีเยี่ยม":n<=30?"ต้องเฝ้าระวัง":"วิกฤต ผู้ป่วยอาจขาดนัด"}`,
        analysis: `NCD Patients ที่รอนาน >30min มีโอกาสขาดนัดครั้งถัดไปสูงขึ้น 2.5x -- ส่งผลให้ขาดยา → Uncontrolled → Complication → IPD cost สูง -- Peak hour: ${t.peak_hour?.label||"N/A"}`,
        recommendation: n <= 15 ? "คงมาตรฐาน -- Appointment system ทำงานดี" : "ลดเวลารอ: (1) Pre-lab ก่อนนัด (2) เพิ่มแพทย์ Peak hour (3) Fast-track Stable NCD (4) Digital queue SMS",
        gradient: "#f43f5e",
        gradientFrom: "rgba(244,63,94,.08)",
        gradientTo: "rgba(225,29,72,.04)",
        borderColor: "rgba(244,63,94,.25)",
        confidence: 90
      }]
    }, [I]);
  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    children: [e.jsx(X, {
      title: "AI Executive Quick Summary — NCD",
      subtitle: "9-Step Care Bundle · Completion · NCI Score",
      badge: "📐 Quick Summary",
      accentColor: "#0f766e",
      headerGradient: "linear-gradient(135deg, rgba(15,118,110,.10), rgba(20,184,166,.05))",
      narrative: Q(u)
    }), e.jsx(J, {
      metrics: K
    }), e.jsx(P, {
      name: "AI Analytics Cards",
      children: !f.ncdAnalytics && e.jsxs(e.Fragment, {
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "-4px"
          },
          children: [e.jsx("div", {
            style: {
              width: "3px",
              height: "18px",
              background: "linear-gradient(180deg, #e11d48, #7c3aed)",
              borderRadius: "99px"
            }
          }), e.jsx("span", {
            style: {
              fontSize: "var(--fs-sm)",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.01em"
            },
            children: "🧠 AI Intelligence Cards — NCD"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              background: "rgba(225,29,72,.08)",
              padding: "2px 8px",
              borderRadius: "99px"
            },
            children: "4 Analytics Modules"
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "12px"
          },
          children: q.map((t, i) => e.jsx(Z, {
            ...t
          }, i))
        })]
      })
    }), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #e11d48, #be123c)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🏷️ Disease Breakdown — NCD Categories"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(225,29,72,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "DM/HT/IHD/Stroke/COPD/CKD"
      })]
    }), e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "10px"
      },
      children: B.map(t => {
        const i = Math.max(...B.map(d => d.count), 1),
          n = Math.round(t.count / i * 100);
        return e.jsxs("div", {
          style: {
            padding: "1rem 1.25rem",
            borderRadius: "14px",
            background: `linear-gradient(135deg, ${t.color}08, ${t.color}03)`,
            border: `1.5px solid ${t.color}20`,
            position: "relative",
            overflow: "hidden"
          },
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
                color: t.color,
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: t.code
            }), e.jsx("span", {
              style: {
                fontSize: "18px"
              },
              children: t.icon
            })]
          }), e.jsx("div", {
            style: {
              fontSize: "28px",
              fontWeight: 900,
              color: t.color,
              lineHeight: 1,
              letterSpacing: "-0.03em"
            },
            children: t.count.toLocaleString()
          }), e.jsx("div", {
            style: {
              fontSize: "11px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              marginTop: "2px"
            },
            children: t.label
          }), e.jsx("div", {
            style: {
              height: "4px",
              background: `${t.color}15`,
              borderRadius: "99px",
              overflow: "hidden",
              marginTop: "8px"
            },
            children: e.jsx("div", {
              style: {
                width: `${n}%`,
                height: "100%",
                background: t.color,
                borderRadius: "99px",
                transition: "width 0.8s ease"
              }
            })
          }), e.jsxs("div", {
            style: {
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              marginTop: "3px"
            },
            children: ["Target: ", t.target]
          })]
        }, t.code)
      })
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        style: {
          gridColumn: "span 2",
          padding: "1.25rem 1.5rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(225,29,72,.12) 0%, rgba(190,18,60,.06) 100%)",
          border: "1px solid rgba(225,29,72,.2)",
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
            background: "radial-gradient(circle, rgba(225,29,72,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), f.ncdToday ? e.jsxs("div", {
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
              width: "120px"
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
          const t = s.total ?? 0,
            i = s.completed ?? 0,
            n = s.waiting ?? 0,
            d = t > 0 ? Math.round(i / t * 100) : 0;
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
                  color: "#e11d48",
                  margin: 0
                },
                children: "🫀 NCD Clinic วันนี้ — DM/HT/IHD/Stroke/COPD/CKD"
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600,
                  background: "rgba(225,29,72,.08)",
                  padding: "2px 8px",
                  borderRadius: "99px"
                },
                children: "Real-time"
              })]
            }), e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "8px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "42px",
                  fontWeight: 900,
                  color: "#e11d48",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 0 40px rgba(225,29,72,.3)"
                },
                children: t.toLocaleString("th-TH")
              }), e.jsx("span", {
                style: {
                  fontSize: "14px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: "ราย"
              }), s.today_vs_yesterday_pct !== void 0 && s.today_vs_yesterday_pct !== 0 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: s.today_vs_yesterday_pct > 0 ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)",
                  color: s.today_vs_yesterday_pct > 0 ? "#10b981" : "#ef4444"
                },
                children: [s.today_vs_yesterday_pct > 0 ? "▲" : "▼", " ", Math.abs(s.today_vs_yesterday_pct), "% vs เมื่อวาน"]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: "rgba(16,185,129,.1)",
                  color: "#10b981"
                },
                children: ["✅ ", i.toLocaleString("th-TH"), " เสร็จ (", d, "%)"]
              }), n > 0 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: "rgba(245,158,11,.1)",
                  color: "#f59e0b"
                },
                children: ["⏳ ", n, " รอ"]
              }), s.unique_patients > 0 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: ["👤 Unique: ", s.unique_patients]
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
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#10b981"
                  },
                  children: ["✅ เสร็จสิ้น ", i.toLocaleString("th-TH"), " (", d, "%)"]
                }), e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#f59e0b"
                  },
                  children: ["รอรับบริการ ", n.toLocaleString("th-TH")]
                })]
              }), e.jsxs("div", {
                style: {
                  height: "6px",
                  borderRadius: "99px",
                  overflow: "hidden",
                  background: "rgba(245,158,11,.12)",
                  display: "flex"
                },
                children: [e.jsx("div", {
                  style: {
                    width: `${Math.min(100,d)}%`,
                    background: "linear-gradient(90deg, #10b981, #059669)",
                    borderRadius: "99px 0 0 99px",
                    transition: "width 0.8s ease"
                  }
                }), e.jsx("div", {
                  style: {
                    flex: 1,
                    background: "rgba(245,158,11,.2)",
                    borderRadius: "0 99px 99px 0"
                  }
                })]
              })]
            })]
          })
        })()]
      }), [{
        title: "Unique Patients",
        value: s.unique_patients ?? 0,
        icon: "👥",
        unit: "คน",
        grad: ["#0ea5e9", "#0284c7"],
        glow: "rgba(14,165,233,.2)",
        loading: f.ncdToday
      }, {
        title: "สำเร็จวันนี้",
        value: (s.total ?? 0) > 0 ? `${Math.round((s.completed??0)/s.total*100)}%` : "—",
        icon: "✅",
        unit: "",
        grad: s.total > 0 && s.completed / s.total >= .8 ? ["#10b981", "#059669"] : ["#f59e0b", "#d97706"],
        glow: "rgba(16,185,129,.2)",
        loading: f.ncdToday
      }, {
        title: "ชาย/หญิง",
        value: `${s.male||0}/${s.female||0}`,
        icon: "👤",
        unit: "",
        grad: ["#8b5cf6", "#7c3aed"],
        glow: "rgba(139,92,246,.2)",
        loading: f.ncdToday
      }, {
        title: "ผู้สูงอายุ",
        value: s.elderly ?? 0,
        icon: "👴",
        unit: "ราย",
        grad: (s.elderly ?? 0) > 10 ? ["#8b5cf6", "#7c3aed"] : ["#e11d48", "#be123c"],
        glow: "rgba(139,92,246,.2)",
        loading: f.ncdToday
      }].map((t, i) => e.jsx("div", {
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: `linear-gradient(135deg, ${t.grad[0]}10 0%, ${t.grad[1]}05 100%)`,
          border: `1px solid ${t.grad[0]}25`,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s"
        },
        onMouseEnter: n => {
          n.currentTarget.style.transform = "translateY(-2px)", n.currentTarget.style.boxShadow = `0 8px 25px ${t.glow}`
        },
        onMouseLeave: n => {
          n.currentTarget.style.transform = "none", n.currentTarget.style.boxShadow = "none"
        },
        children: t.loading ? e.jsxs("div", {
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
              width: "50px"
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
              children: t.title
            }), e.jsx("span", {
              style: {
                fontSize: "18px"
              },
              children: t.icon
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
                color: t.grad[0],
                letterSpacing: "-0.03em",
                lineHeight: 1
              },
              children: typeof t.value == "number" ? t.value.toLocaleString() : t.value
            }), t.unit && e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: t.unit
            })]
          })]
        })
      }, `ncd-kpi-${i}`))]
    }), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #e11d48, #be123c)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🫀 Advanced Analytics — NCD"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(225,29,72,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "30d · HOSxP XE · DM/HT/IHD/Stroke/COPD/CKD"
      })]
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: f.ncdAnalytics ? e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "1.5rem"
        },
        children: [e.jsx("div", {
          className: "skeleton",
          style: {
            height: "200px",
            width: "200px",
            borderRadius: "50%"
          }
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px"
          },
          children: [1, 2, 3, 4, 5, 6].map(t => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "56px",
              borderRadius: "10px"
            }
          }, t))
        })]
      }) : (() => {
        const t = m || {},
          i = t.nci ?? 0,
          n = i >= 80 ? "#10b981" : i >= 60 ? "#f59e0b" : "#f43f5e",
          d = i >= 90 ? "A+" : i >= 80 ? "A" : i >= 70 ? "B+" : i >= 60 ? "B" : i >= 50 ? "C" : "D",
          g = 72,
          j = Math.PI * g,
          h = Math.min(i / 100, 1) * j,
          v = t.nci_components || {},
          S = [{
            name: "Wait Time",
            score: v.wait_time || 0
          }, {
            name: "Completion",
            score: v.completion || 0
          }, {
            name: "Revisit",
            score: v.revisit || 0
          }, {
            name: "Revenue",
            score: v.revenue || 0
          }, {
            name: "SLA",
            score: v.sla || 0
          }],
          x = [{
            icon: "⏱️",
            label: "เวลารอเฉลี่ย",
            value: `${t.avg_wait_time??0} min`,
            sub: `σ ${t.sd_wait_time??0}min · SLA ≤30min: ${t.wait_sla_pct??0}%`,
            desc: "เวลารอก่อนพบแพทย์ NCD Clinic (30 วัน)",
            color: (t.avg_wait_time ?? 30) <= 15 ? "#10b981" : (t.avg_wait_time ?? 30) <= 30 ? "#f59e0b" : "#f43f5e",
            problem: (t.avg_wait_time ?? 30) <= 15 ? `รอเฉลี่ย ${t.avg_wait_time??0} min — ดีเยี่ยม SLA ${t.wait_sla_pct??0}%` : (t.avg_wait_time ?? 30) <= 30 ? `รอเฉลี่ย ${t.avg_wait_time??0} min (σ ${t.sd_wait_time??0}) — มี ${t.wait_over_30m??0} ครั้งที่รอ >30min ผู้ป่วยเรื้อรังต้องมาบ่อย → รอนาน = ไม่มาตามนัด` : `🚨 รอเฉลี่ย ${t.avg_wait_time??0} min — สูง! ${t.wait_over_30m??0} ครั้ง >30min ผู้ป่วยอาจ ขาดนัด ส่งผล Uncontrolled NCD`,
            recommend: (t.avg_wait_time ?? 30) <= 15 ? "✅ คงมาตรฐาน — Appointment system ทำงานดี" : "📋 ลดเวลารอ: (1) NCD Clinic appointment slot (2) เพิ่มแพทย์ช่วง Peak (3) Fast-track สำหรับ Stable NCD (4) SMS แจ้งคิว (5) เป้าหมาย: ≤15 min"
          }, {
            icon: "🕐",
            label: "เวลารวม (Visit)",
            value: `${t.avg_total_time??0} min`,
            sub: `σ ${t.sd_total_time??0}min`,
            desc: "เวลาเฉลี่ยทั้งกระบวนการ ลงทะเบียน→ตรวจ→Lab→รับยา",
            color: (t.avg_total_time ?? 60) <= 45 ? "#10b981" : (t.avg_total_time ?? 60) <= 60 ? "#f59e0b" : "#f43f5e",
            problem: `เวลารวม ${t.avg_total_time??0} min (σ ${t.sd_total_time??0}) — ${(t.avg_total_time??60)<=45?"ดี Flow ลื่นไหล":"⚠️ NCD ต้องรอ Lab + พบแพทย์ + รับยา หลายจุด"}`,
            recommend: "📋 ลดเวลารวม: (1) Lab ก่อนพบแพทย์ (Pre-lab) (2) Digital payment (3) ตู้ยาอัตโนมัติ (4) Lean flow"
          }, {
            icon: "📊",
            label: "Avg Daily Visits",
            value: `${t.avg_daily_visits??0}`,
            sub: `${(t.total_visits??0).toLocaleString()} ราย / 30 วัน · ${t.unique_patients??0} patients`,
            desc: "จำนวน NCD visits เฉลี่ยต่อวัน",
            color: "#0ea5e9",
            problem: `เฉลี่ย ${t.avg_daily_visits??0} ราย/วัน · Unique ${t.unique_patients??0} คน — ${(t.avg_daily_visits??0)>80?"⚠️ Volume สูง ตรวจสอบ Capacity":"Volume ปกติ"}`,
            recommend: "📋 Capacity: (1) วิเคราะห์ Clinic utilization (2) เพิ่มแพทย์ NCD ถ้า >85% (3) Group visit สำหรับ Stable patients"
          }, {
            icon: "⏰",
            label: "Wait >30 min",
            value: `${t.wait_over_30m??0}`,
            sub: "จาก 30 วัน",
            desc: "จำนวนครั้งที่รอนานเกิน 30 นาที",
            color: (t.wait_over_30m ?? 0) < 10 ? "#10b981" : (t.wait_over_30m ?? 0) < 30 ? "#f59e0b" : "#f43f5e",
            problem: (t.wait_over_30m ?? 0) < 10 ? `Wait >30min เพียง ${t.wait_over_30m??0} ครั้ง — Flow ดี` : `Wait >30min ${t.wait_over_30m??0} ครั้ง — ${(t.wait_over_30m??0)>=30?"🚨 บ่อยเกินไป! NCD patients อาจขาดนัด":"ต้องเฝ้าระวัง"}`,
            recommend: (t.wait_over_30m ?? 0) < 10 ? "✅ ดี — RCA ทุกครั้งที่เกิด wait >30min" : "📋 ลด Long wait: (1) Pre-lab ก่อนนัด (2) เพิ่มแพทย์ Peak (3) Fast-track Stable NCD (4) Telemedicine refill ยา"
          }],
          c = [{
            icon: "✅",
            label: "Completion Rate",
            value: `${t.completion_rate??0}%`,
            sub: `Dropout ${t.dropout_count??0} ราย`,
            desc: "% ผู้ป่วย NCD ที่ตรวจเสร็จสิ้น",
            color: (t.completion_rate ?? 0) >= 95 ? "#10b981" : (t.completion_rate ?? 0) >= 85 ? "#f59e0b" : "#f43f5e",
            problem: (t.completion_rate ?? 0) >= 95 ? `Completion ${t.completion_rate??0}% — ดีเยี่ยม` : `Completion ${t.completion_rate??0}% — Dropout ${t.dropout_count??0} ราย ${(t.completion_rate??0)<85?"⚠️ NCD dropout = ขาดยา = Uncontrolled":""}`,
            recommend: "📋 ลด Dropout: (1) SMS เตือนก่อนนัด (2) ลด Wait time (3) Telemedicine สำหรับ Stable (4) เป้าหมาย: ≥95%"
          }, {
            icon: "🔄",
            label: "Revisit 7 วัน",
            value: `${t.revisit_rate??0}%`,
            sub: `${t.revisit_count??0} ราย กลับมาภายใน 7 วัน`,
            desc: "% ผู้ป่วยที่กลับมาอีกในสัปดาห์",
            color: (t.revisit_rate ?? 0) < 5 ? "#10b981" : (t.revisit_rate ?? 0) < 15 ? "#f59e0b" : "#f43f5e",
            problem: (t.revisit_rate ?? 0) < 5 ? `Revisit ${t.revisit_rate??0}% — ต่ำ Treatment plan ดี` : `Revisit ${t.revisit_rate??0}% — ${(t.revisit_rate??0)>=15?"⚠️ สูง! อาจมี Uncontrolled NCD กลับมาซ้ำ":"ปานกลาง ตรวจสอบ Comorbidity"}`,
            recommend: "📋 Review: (1) แยก Planned vs Unplanned revisit (2) Audit: Uncontrolled BP/FBS? (3) ปรับยาให้เหมาะสม (4) Home monitoring"
          }],
          y = [{
            icon: "💰",
            label: "รายได้ / Visit",
            value: `฿${(t.avg_revenue_per_visit??0).toLocaleString()}`,
            sub: `Max ฿${(t.max_revenue??0).toLocaleString()} · Daily ฿${(t.daily_revenue??0).toLocaleString()}`,
            desc: "รายได้เฉลี่ยต่อ 1 visit NCD",
            color: "#0ea5e9",
            problem: `Avg Rev/Visit ฿${(t.avg_revenue_per_visit??0).toLocaleString()} — ${(t.avg_revenue_per_visit??0)<500?"⚠️ ต่ำ NCD ควรมี Lab+ยา ตรวจสอบ billing":"สอดคล้องกับ NCD service"}`,
            recommend: "📋 Optimize: (1) ตรวจสอบ Lab billing ครบ (2) เพิ่ม Screening packages (3) ลด Free visit % (4) Annual NCD screening"
          }, {
            icon: "💵",
            label: "รายได้รวม (30d)",
            value: `฿${((t.total_revenue??0)/1e3).toFixed(0)}k`,
            sub: `${(t.total_visits??0).toLocaleString()} visits`,
            desc: "รายได้รวม NCD Clinic 30 วัน",
            color: "#10b981",
            problem: `Revenue ฿${((t.total_revenue??0)/1e3).toFixed(0)}k / 30 วัน จาก ${(t.total_visits??0).toLocaleString()} visits`,
            recommend: "📋 เพิ่มรายได้: (1) Annual NCD screening packages (2) Complication screening (Eye/Foot/Kidney) (3) Corporate health check"
          }];
        return e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem"
          },
          children: [e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "1.5rem",
              alignItems: "start"
            },
            children: [e.jsxs("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px"
              },
              children: [e.jsxs("svg", {
                width: "180",
                height: "100",
                viewBox: "0 0 180 105",
                style: {
                  overflow: "visible"
                },
                children: [e.jsx("path", {
                  d: `M 18,90 A ${g},${g} 0 0,1 162,90`,
                  fill: "none",
                  stroke: "rgba(203,213,225,.5)",
                  strokeWidth: "14",
                  strokeLinecap: "round"
                }), e.jsx("path", {
                  d: `M 18,90 A ${g},${g} 0 0,1 162,90`,
                  fill: "none",
                  stroke: n,
                  strokeWidth: "14",
                  strokeLinecap: "round",
                  strokeDasharray: `${h} ${j}`,
                  style: {
                    transition: "stroke-dasharray 1s ease"
                  }
                }), e.jsx("text", {
                  x: "90",
                  y: "78",
                  textAnchor: "middle",
                  fontSize: "32",
                  fontWeight: "900",
                  fill: n,
                  fontFamily: "'Outfit',sans-serif",
                  children: i
                }), e.jsx("text", {
                  x: "90",
                  y: "96",
                  textAnchor: "middle",
                  fontSize: "11",
                  fontWeight: "700",
                  fill: "#6b7280",
                  fontFamily: "sans-serif",
                  children: "NCI Score"
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "center"
                },
                children: [e.jsx("div", {
                  style: {
                    fontSize: "26px",
                    fontWeight: 900,
                    color: n
                  },
                  children: d
                }), e.jsx("div", {
                  style: {
                    fontSize: "var(--fs-xs)",
                    fontWeight: 700,
                    color: n
                  },
                  children: i >= 80 ? "ประสิทธิภาพสูง" : i >= 60 ? "ระดับมาตรฐาน" : "ต้องปรับปรุง"
                }), e.jsx("div", {
                  style: {
                    fontSize: "var(--fs-2xs)",
                    color: "var(--md-text-tertiary)",
                    marginTop: "2px"
                  },
                  children: "NCD Control Index"
                })]
              }), e.jsxs("div", {
                style: {
                  width: "100%",
                  marginTop: "6px"
                },
                children: [e.jsx("p", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "6px",
                    textAlign: "center"
                  },
                  children: "NCI Components"
                }), S.map((r, p) => {
                  const a = r.score >= 70 ? "#10b981" : r.score >= 40 ? "#f59e0b" : "#f43f5e";
                  return e.jsxs("div", {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "3px"
                    },
                    children: [e.jsx("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)",
                        width: "64px",
                        textAlign: "right",
                        flexShrink: 0
                      },
                      children: r.name
                    }), e.jsx("div", {
                      style: {
                        flex: 1,
                        height: "6px",
                        background: "rgba(203,213,225,.2)",
                        borderRadius: "99px",
                        overflow: "hidden"
                      },
                      children: e.jsx("div", {
                        style: {
                          width: `${r.score}%`,
                          height: "100%",
                          background: a,
                          borderRadius: "99px",
                          transition: "width 0.8s ease"
                        }
                      })
                    }), e.jsx("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: a,
                        width: "24px",
                        textAlign: "right"
                      },
                      children: r.score
                    })]
                  }, p)
                })]
              })]
            }), e.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              },
              children: [{
                title: "Wait Time & Flow",
                color: "#f43f5e",
                cards: x
              }, {
                title: "Quality & Outcomes",
                color: "#0ea5e9",
                cards: c
              }, {
                title: "Financial Intelligence",
                color: "#f59e0b",
                cards: y
              }].map((r, p) => e.jsxs("div", {
                children: [e.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "6px"
                  },
                  children: [e.jsx("div", {
                    style: {
                      width: "3px",
                      height: "14px",
                      background: `linear-gradient(180deg, ${r.color}, ${r.color}99)`,
                      borderRadius: "99px"
                    }
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      color: r.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: r.title
                  })]
                }), e.jsx("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px"
                  },
                  children: r.cards.map((a, o) => e.jsxs("div", {
                    style: {
                      padding: "8px 10px",
                      borderRadius: "10px",
                      background: `${a.color}06`,
                      border: `1px solid ${a.color}20`
                    },
                    children: [e.jsxs("div", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      },
                      children: [e.jsx("span", {
                        style: {
                          fontSize: "18px",
                          flexShrink: 0
                        },
                        children: a.icon
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
                            color: "var(--md-text-tertiary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.04em"
                          },
                          children: a.label
                        }), e.jsx("p", {
                          style: {
                            margin: "2px 0 0",
                            fontSize: "12px",
                            color: "var(--md-text-tertiary)",
                            fontStyle: "italic",
                            lineHeight: 1.4,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          },
                          children: a.desc
                        })]
                      }), e.jsxs("div", {
                        style: {
                          textAlign: "right",
                          flexShrink: 0
                        },
                        children: [e.jsx("p", {
                          style: {
                            margin: 0,
                            fontSize: "var(--fs-lg)",
                            fontWeight: 900,
                            color: a.color,
                            letterSpacing: "-0.02em"
                          },
                          children: a.value
                        }), e.jsx("p", {
                          style: {
                            margin: 0,
                            fontSize: "12px",
                            color: "var(--md-text-tertiary)",
                            fontWeight: 600
                          },
                          children: a.sub
                        })]
                      })]
                    }), a.problem && e.jsxs("div", {
                      style: {
                        marginTop: "6px",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        background: "rgba(203,213,225,.04)",
                        borderLeft: `3px solid ${a.color}`
                      },
                      children: [e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: 700,
                          color: a.color,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: "3px"
                        },
                        children: "📊 วิเคราะห์สถานการณ์"
                      }), e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          color: "var(--md-text-secondary)",
                          lineHeight: 1.5,
                          fontWeight: 500
                        },
                        children: a.problem
                      })]
                    }), a.recommend && e.jsxs("div", {
                      style: {
                        marginTop: "4px",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        background: "rgba(124,58,237,.04)",
                        borderLeft: "3px solid #7c3aed"
                      },
                      children: [e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#7c3aed",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: "3px"
                        },
                        children: "💡 แนะนำเชิงนโยบาย"
                      }), e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          color: "var(--md-text-secondary)",
                          lineHeight: 1.5,
                          fontWeight: 500
                        },
                        children: a.recommend
                      })]
                    })]
                  }, o))
                })]
              }, p))
            })]
          }), e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "1rem",
              borderTop: "1px solid var(--md-border)",
              paddingTop: "1rem"
            },
            children: [e.jsxs("div", {
              children: [e.jsx("p", {
                style: {
                  fontSize: "var(--fs-xs)",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px"
                },
                children: "🕐 Hourly Load (30 วัน)"
              }), e.jsx(z, {
                width: "100%",
                height: 130,
                children: e.jsxs(H, {
                  data: (t.hourly_pattern || []).filter(r => r.avg > 0),
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(R, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(T, {
                    dataKey: "label",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 8,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1,
                    tickFormatter: r => r.replace(":00", "")
                  }), e.jsx($, {
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 9
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 20
                  }), e.jsx(N, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: r => [`${r} ราย/วัน`, "เฉลี่ย"]
                  }), e.jsx(M, {
                    dataKey: "avg",
                    radius: [3, 3, 0, 0],
                    barSize: 8,
                    children: (t.hourly_pattern || []).filter(r => r.avg > 0).map((r, p) => e.jsx(E, {
                      fill: r.hour === t.peak_hour?.hour ? "#f43f5e" : "#e11d48"
                    }, p))
                  })]
                })
              })]
            }), e.jsxs("div", {
              children: [e.jsx("p", {
                style: {
                  fontSize: "var(--fs-xs)",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px"
                },
                children: "👥 Age Distribution (30 วัน)"
              }), e.jsx(z, {
                width: "100%",
                height: 130,
                children: e.jsxs(H, {
                  data: t.age_distribution || [],
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(R, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(T, {
                    dataKey: "group",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 9,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1
                  }), e.jsx($, {
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 9
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 24
                  }), e.jsx(N, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: r => [`${r} ราย`, "จำนวน"]
                  }), e.jsx(M, {
                    dataKey: "count",
                    radius: [4, 4, 0, 0],
                    barSize: 18,
                    children: (t.age_distribution || []).map((r, p) => {
                      const a = ["#10b981", "#f59e0b", "#eab308", "#f43f5e", "#e11d48"];
                      return e.jsx(E, {
                        fill: a[p] || "#7c3aed"
                      }, p)
                    })
                  })]
                })
              })]
            }), e.jsxs("div", {
              children: [e.jsx("p", {
                style: {
                  fontSize: "var(--fs-xs)",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px"
                },
                children: "📈 Monthly Trend (6 เดือน)"
              }), e.jsx(z, {
                width: "100%",
                height: 130,
                children: e.jsxs(U, {
                  data: t.monthly_trend || [],
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(R, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(T, {
                    dataKey: "month",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 10,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1
                  }), e.jsx($, {
                    yAxisId: "left",
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 10
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 28
                  }), e.jsx($, {
                    yAxisId: "right",
                    orientation: "right",
                    tick: {
                      fill: "#10b981",
                      fontSize: 9
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 28,
                    tickFormatter: r => `${(r/1e3).toFixed(0)}k`
                  }), e.jsx(N, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: (r, p) => p === "visits" ? [`${r} ราย`, "จำนวน"] : p === "total_rev" ? [`฿${r.toLocaleString()}`, "รายได้"] : [`${r}`, p]
                  }), e.jsx(M, {
                    yAxisId: "left",
                    dataKey: "visits",
                    fill: "rgba(225,29,72,.25)",
                    radius: [4, 4, 0, 0],
                    barSize: 14
                  }), e.jsx(O, {
                    yAxisId: "right",
                    type: "monotone",
                    dataKey: "total_rev",
                    stroke: "#10b981",
                    strokeWidth: 2,
                    dot: {
                      r: 3,
                      fill: "#10b981"
                    }
                  })]
                })
              })]
            })]
          }), e.jsxs("div", {
            style: {
              borderTop: "1px solid var(--md-border)",
              paddingTop: "1rem"
            },
            children: [e.jsx("p", {
              style: {
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px"
              },
              children: "🏷️ Top NCD Diagnoses (30 วัน)"
            }), e.jsx("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "3px"
              },
              children: (t.top_diagnoses || []).slice(0, 8).map((r, p) => e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  background: p === 0 ? "rgba(225,29,72,.06)" : "transparent"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#e11d48",
                    width: "16px",
                    textAlign: "center"
                  },
                  children: p + 1
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    fontFamily: "JetBrains Mono, monospace",
                    width: "48px",
                    flexShrink: 0
                  },
                  children: r.icd10
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--md-text-secondary)",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  children: r.name
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#e11d48",
                    flexShrink: 0
                  },
                  children: r.count
                }), e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    flexShrink: 0
                  },
                  children: ["฿", r.avg_rev?.toLocaleString()]
                })]
              }, p))
            })]
          })]
        })
      })()
    }), (() => {
      const t = u.ncdMonthlyFiscal,
        i = m || {},
        n = i.wait_steps || {},
        d = n.registration_to_screening || 0,
        g = n.screening_to_doctor || 0,
        j = n.doctor_to_pharmacy || 0,
        h = n.pharmacy_to_finance || 0,
        v = i.avg_total_time || 0,
        S = d + g + j + h,
        x = Math.max(0, v - S),
        c = i.estimated_median_cycle || Math.round(v * .85),
        y = [{
          icon: "📋",
          label: "ลงทะเบียน",
          sub: "เช็คอิน → คัดกรอง",
          value: Math.round(d),
          color: "#7c3aed",
          warn: 15,
          critical: 30
        }, {
          icon: "🔬",
          label: "รอพบแพทย์",
          sub: "คัดกรอง → พบแพทย์",
          value: Math.round(g),
          color: "#0ea5e9",
          warn: 30,
          critical: 60
        }, {
          icon: "🩺",
          label: "ตรวจ+รอยา",
          sub: "พบแพทย์ → รับยา",
          value: Math.round(j),
          color: "#8b5cf6",
          warn: 20,
          critical: 45
        }, {
          icon: "💊",
          label: "ชำระเงิน",
          sub: "รับยา → จ่ายเงิน",
          value: Math.round(h),
          color: "#10b981",
          warn: 15,
          critical: 30
        }];
      x > 10 && y.push({
        icon: "🔄",
        label: "รอ Lab/อื่นๆ",
        sub: "ช่วงเวลาที่ไม่ได้วัด",
        value: Math.round(x),
        color: "#94a3b8",
        warn: 30,
        critical: 60
      });
      const r = y,
        p = r.reduce((a, o) => o.value > (a?.value || 0) ? o : a, r[0]);
      return e.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        },
        children: [t?.months && e.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "1.25rem 1.5rem"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            },
            children: [e.jsxs("div", {
              children: [e.jsxs("h3", {
                style: {
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "var(--md-text-primary)",
                  margin: 0
                },
                children: ["📅 ระยะเวลาบริการรวม (Cycle Time) — NCD Clinic ปีงบ ", t.fiscal_year_be]
              }), e.jsx("p", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: "ตุลาคม–กันยายน · แยกตามขั้นตอน · main_dep 024"
              })]
            }), e.jsxs("div", {
              style: {
                display: "flex",
                gap: "12px",
                alignItems: "center"
              },
              children: [e.jsxs("div", {
                style: {
                  textAlign: "center"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "11px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "เฉลี่ยทั้งปี"
                }), e.jsxs("p", {
                  style: {
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 900,
                    color: "#7c3aed"
                  },
                  children: [t.benchmark_avg, " น."]
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "center"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "11px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "ผู้ป่วยสะสม"
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 900,
                    color: "#0f766e"
                  },
                  children: t.months.reduce((a, o) => a + o.total_visits, 0).toLocaleString()
                })]
              })]
            })]
          }), e.jsx(z, {
            width: "100%",
            height: 240,
            children: e.jsxs(U, {
              data: t.months.filter(a => a.has_data),
              margin: {
                top: 8,
                right: 12,
                bottom: 0,
                left: 4
              },
              children: [e.jsx(R, {
                strokeDasharray: "3 3",
                stroke: "rgba(203,213,225,.3)",
                vertical: !1
              }), e.jsx(T, {
                dataKey: "month",
                tick: {
                  fill: "#6b7280",
                  fontSize: 10,
                  fontWeight: 700
                },
                axisLine: !1,
                tickLine: !1
              }), e.jsx($, {
                tick: {
                  fill: "#9ca3af",
                  fontSize: 9
                },
                axisLine: !1,
                tickLine: !1,
                width: 30,
                unit: "น"
              }), e.jsx(N, {
                contentStyle: {
                  background: "#fff",
                  border: "1px solid #e8eaf2",
                  borderRadius: "10px",
                  fontSize: "12px"
                },
                formatter: (a, o) => [`${a} นาที`, o === "avg_reg" ? "ลงทะเบียน" : o === "avg_screen" ? "คัดกรอง" : o === "avg_doc" ? "ตรวจรักษา" : o === "avg_total" ? "Cycle Time" : o]
              }), e.jsx(F, {
                type: "monotone",
                dataKey: "avg_reg",
                stackId: "1",
                fill: "#c4b5fd",
                stroke: "#7c3aed",
                fillOpacity: .6
              }), e.jsx(F, {
                type: "monotone",
                dataKey: "avg_screen",
                stackId: "1",
                fill: "#93c5fd",
                stroke: "#0ea5e9",
                fillOpacity: .6
              }), e.jsx(F, {
                type: "monotone",
                dataKey: "avg_doc",
                stackId: "1",
                fill: "#a5b4fc",
                stroke: "#6366f1",
                fillOpacity: .6
              }), e.jsx(O, {
                type: "monotone",
                dataKey: "avg_total",
                stroke: "#e11d48",
                strokeWidth: 2.5,
                dot: {
                  r: 4,
                  fill: "#e11d48"
                },
                name: "Cycle Time"
              })]
            })
          }), e.jsx("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "8px"
            },
            children: [{
              label: "ลงทะเบียน",
              color: "#c4b5fd"
            }, {
              label: "คัดกรอง",
              color: "#93c5fd"
            }, {
              label: "ตรวจรักษา",
              color: "#a5b4fc"
            }, {
              label: "รับยา",
              color: "#86efac"
            }].map((a, o) => e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [e.jsx("div", {
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  background: a.color
                }
              }), e.jsx("span", {
                style: {
                  fontSize: "11px",
                  color: "var(--md-text-secondary)",
                  fontWeight: 600
                },
                children: a.label
              })]
            }, o))
          })]
        }), v > 0 && e.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "1.25rem 1.5rem"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px"
            },
            children: [e.jsxs("div", {
              children: [e.jsx("h3", {
                style: {
                  fontSize: "14px",
                  fontWeight: 800,
                  color: "var(--md-text-primary)",
                  margin: 0
                },
                children: "⏱️ ขั้นตอนการรับบริการ NCD Clinic"
              }), e.jsx("p", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  marginTop: "2px"
                },
                children: "เวลาเฉลี่ยในแต่ละขั้นตอน (30 วัน)"
              })]
            }), e.jsxs("div", {
              style: {
                textAlign: "right"
              },
              children: [e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(124,58,237,.08)",
                  borderRadius: "999px",
                  padding: "6px 14px"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    fontWeight: 600
                  },
                  children: "Cycle Time"
                }), e.jsx("span", {
                  style: {
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#7c3aed"
                  },
                  children: v
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "นาที"
                })]
              }), e.jsxs("div", {
                style: {
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  marginTop: "3px"
                },
                children: [c > 0 && e.jsxs("span", {
                  children: ["Median ≈ ", c, " น. · "]
                }), p?.value > 30 && e.jsxs("span", {
                  style: {
                    color: "#f43f5e",
                    fontWeight: 700
                  },
                  children: ["คอขวด: ", p.label, " (", p.value, " น.)"]
                })]
              })]
            })]
          }), e.jsx("div", {
            style: {
              display: "flex",
              alignItems: "stretch",
              gap: 0,
              overflowX: "auto"
            },
            children: r.map((a, o, A) => {
              const D = a.value,
                C = D >= a.critical,
                _ = D >= a.warn && !C,
                W = C ? "#f43f5e" : _ ? "#f59e0b" : "#10b981",
                l = C ? "ช้ามาก" : _ ? "ช้า" : "ปกติ",
                w = a.critical * 1.5 || 60;
              return e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  flex: "1 1 0",
                  minWidth: "120px"
                },
                children: [e.jsxs("div", {
                  style: {
                    flex: 1,
                    padding: "10px",
                    borderRadius: "12px",
                    background: `${a.color}08`,
                    border: `1px solid ${a.color}18`,
                    textAlign: "center"
                  },
                  children: [e.jsx("span", {
                    style: {
                      fontSize: "18px"
                    },
                    children: a.icon
                  }), e.jsx("p", {
                    style: {
                      margin: "2px 0 0",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: a.color
                    },
                    children: a.label
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "10px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: a.sub
                  }), e.jsx("p", {
                    style: {
                      margin: "6px 0 2px",
                      fontSize: "22px",
                      fontWeight: 900,
                      color: a.color
                    },
                    children: D
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "11px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: "นาที"
                  }), e.jsx("div", {
                    style: {
                      height: "4px",
                      borderRadius: "99px",
                      background: `${a.color}15`,
                      marginTop: "6px",
                      overflow: "hidden"
                    },
                    children: e.jsx("div", {
                      style: {
                        height: "100%",
                        width: `${Math.min(100,D/w*100)}%`,
                        background: W,
                        borderRadius: "99px"
                      }
                    })
                  }), e.jsx("span", {
                    style: {
                      fontSize: "10px",
                      fontWeight: 700,
                      color: W,
                      background: `${W}10`,
                      padding: "1px 6px",
                      borderRadius: "99px",
                      marginTop: "4px",
                      display: "inline-block"
                    },
                    children: l
                  })]
                }), o < A.length - 1 && e.jsx("div", {
                  style: {
                    padding: "0 4px",
                    color: "var(--md-text-tertiary)",
                    fontSize: "14px",
                    fontWeight: 700
                  },
                  children: "→"
                })]
              }, o)
            })
          })]
        })]
      })
    })(), !f.ncdAnalytics && m && (() => {
      const t = m || {},
        i = t.nci ?? 0,
        n = t.avg_wait_time ?? 0,
        d = t.sd_wait_time ?? 0,
        g = t.wait_over_30m ?? 0,
        j = t.wait_sla_pct ?? 0,
        h = t.completion_rate ?? 0,
        v = t.dropout_count ?? 0,
        S = t.revisit_rate ?? 0;
      t.total_visits;
      const x = t.avg_revenue_per_visit ?? 0,
        c = t.peak_hour?.label || "—",
        y = t.collection_rate ?? 0,
        r = t.claim_success ?? 0,
        p = t.bad_debt_ratio ?? 0,
        a = t.days_in_ar ?? 0,
        o = [];
      n > 20 && o.push({
        priority: 1,
        severity: n > 30 ? "critical" : "warning",
        title: `🔴 เวลารอสูง: ${n} min (σ ${d}) — SLA ≤30min ผ่านเพียง ${j}% · ${g} ครั้ง >30min`,
        rootCause: `ผู้ป่วย NCD รอเฉลี่ย ${n} นาที (σ ${d}) ── สาเหตุ: (1) NCD Clinic volume สูง — DM+HT คิวยาว (2) Lab result ช้า → แพทย์ต้องรอผล (3) Multi-morbidity ใช้เวลาตรวจนาน (4) Peak hour ${c} — ผู้ป่วยกระจุกเช้า (5) แพทย์ NCD ไม่เพียงพอ`,
        cascadeEffect: `Wait สูง → ผู้ป่วย NCD ขาดนัด (${v} ราย) → ขาดยา → Uncontrolled DM/HT → Complication (Stroke/MI/CKD) → IPD cost สูง ● NCI ลดลง (${i}/100)`,
        fixFirst: `🔧 ด่วนที่สุด: (1) Pre-lab ก่อนนัดพบแพทย์ (2) Fast-track Stable NCD — refill ยาอย่างเดียว (3) เพิ่มแพทย์ช่วง Peak ${c} (4) Telemedicine สำหรับ Follow-up (5) เป้าหมาย: ≤15 min`,
        color: n > 30 ? "#f43f5e" : "#f59e0b"
      }), y < 85 && o.push({
        priority: 2,
        severity: y < 75 ? "critical" : "warning",
        title: `🔴 วิกฤต: Collection Rate NCD (${y}%) ต่ำกว่ามาตรฐาน (85%)`,
        rootCause: "ส่วนต่างระหว่างยอดเรียกเก็บและยอดรับเงิน NCD สูง ── สาเหตุ: (1) Denial สิทธิ์ UC/SSS จากการลงรหัส DM/HT complication ไม่ครบ (2) ยังไม่ทำ Reconciliation ยอดค้างสิทธิ์รัฐ (3) ขาดการติดตามส่วนต่าง Lab/ยา นอกสิทธิ์",
        cascadeEffect: "Cash Flow NCD Clinic ตึงตัว ── รายได้ทางบัญชีสูงแต่เงินเข้าจริงไม่ถึง ── เพิ่มภาระการติดตามหนี้ (Account Receivable) ● Revenue Loss สะสม",
        fixFirst: "🔧 Urgent Actions: (1) Audit เคส NCD ที่มี Denial สูงสุด (2) เร่ง Reconciliation ยอดค้างสิทธิ์ประกันสังคม NCD (3) ปรับปรุงกระบวนการ Pre-authorization สำหรับยา Specialty NCD",
        color: y < 75 ? "#f43f5e" : "#f59e0b"
      }), h < 90 && o.push({
        priority: 3,
        severity: h < 80 ? "critical" : "warning",
        title: `🟡 Completion Rate ต่ำ: ${h}% — Dropout ${v} ราย`,
        rootCause: `${h}% เท่านั้นที่ตรวจ NCD เสร็จ — ${v} ราย Dropout ── สาเหตุ: (1) Wait time นาน → กลับก่อน (2) Lab+พบแพทย์+รับยา หลายจุด (3) ค่าใช้จ่ายสะสมสูง (4) ผู้ป่วยรู้สึกดี → คิดว่าไม่ต้องมา`,
        cascadeEffect: `NCD Dropout → ขาดยา → BP/FBS Uncontrolled → Complication (Stroke ฿150k+, MI ฿200k+, Dialysis ฿500k+/ปี) → ต้นทุนพุ่ง ● Revenue loss ฿${(v*x).toLocaleString()}`,
        fixFirst: "🔧 ลด Dropout: (1) แจ้ง Wait estimate ทุกราย (2) Telemedicine refill (3) Community NCD Clinic (4) SMS/LINE เตือนนัด (5) เป้าหมาย: Completion ≥95%",
        color: h < 80 ? "#f43f5e" : "#f59e0b"
      }), r < 90 && o.push({
        priority: 4,
        severity: "warning",
        title: `⚠️ Claim Success Rate NCD เพียง ${r}% (Target > 90%)`,
        rootCause: "การส่งเบิก e-Claim NCD ถูกปฏิเสธ ── สาเหตุ: (1) ICD-10 Complication ไม่สอดคล้องกับ Lab Evidence (2) Lab ผลออกไม่ทันเวลาส่งเบิก (3) ข้อมูลเวชระเบียน DM/HT ไม่สมบูรณ์",
        cascadeEffect: `เสียสิทธิ์การเบิกจ่าย NCD Revenue ── เพิ่ม Workload ฝ่าย Coder ที่ต้อง Appeal ── ยอดเรียกเก็บค้างนาน (Days A/R ${a}d)`,
        fixFirst: "🔧 Corrective Plan: (1) ใช้ AI Coder ช่วยตรวจสอบความสอดคล้อง Lab vs DX (2) อบรมการลงรหัส NCD Complication (3) Sync ผล Lab เข้า e-Claim อัตโนมัติ",
        color: "#f59e0b"
      }), S > 10 && o.push({
        priority: 5,
        severity: S > 20 ? "critical" : "warning",
        title: `🟡 Revisit 7d สูง: ${S}% — Uncontrolled NCD Concern`,
        rootCause: `${S}% กลับมาภายใน 7 วัน — ต้องแยก: (1) Planned (Lab follow-up, ปรับยา) vs (2) Unplanned (BP crisis, Hypoglycemia, Complication) ● Unplanned revisit สะท้อน Treatment quality`,
        cascadeEffect: "Unplanned revisit → เพิ่ม Workload → Wait time เพิ่ม → NCD patients อื่นรอนาน → ขาดนัด → Uncontrolled เพิ่ม = วงจรลบ",
        fixFirst: "🔧 ลด Unplanned Revisit: (1) Audit ทุก 7d revisit — แยก Planned vs Complication (2) Home BP/FBS monitoring (3) ปรับยาให้เหมาะสมตั้งแต่ครั้งแรก (4) Hotline สำหรับ NCD emergency",
        color: S > 20 ? "#f43f5e" : "#f59e0b"
      }), p > 5 && o.push({
        priority: 6,
        severity: "warning",
        title: `🕵️ ความเสี่ยงหนี้สูญ: NCD Bad Debt Ratio ${p}%`,
        rootCause: "ผู้ป่วย NCD สิทธิ์ชำระเงินเองหรือส่วนต่าง มีการค้างชำระเพิ่มขึ้น ── สาเหตุ: (1) ไม่มีการประเมินราคายา NCD ล่วงหน้า (2) ระบบติดตามหนี้ขาดต่อเนื่องสำหรับผู้ป่วยเรื้อรัง",
        cascadeEffect: "กระทบ Net Profit NCD Clinic ── ต้องตั้งสำรองหนี้สูญเพิ่มขึ้น (Allowances) ── Profit Margin ระยะยาวลดลง",
        fixFirst: "🔧 Risk Mitigation: (1) แจ้งประมาณการค่ายา NCD ล่วงหน้า (2) นามเสนอระบบแบ่งจ่ายค่ายา Specialty (3) ทีม Tele-tracking ติดตามค้างจ่ายภายใน 14 วัน",
        color: "#f59e0b"
      }), o.length === 0 && o.push({
        priority: 0,
        severity: "good",
        title: "✅ NCD Clinic ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน",
        rootCause: `NCI ${i}/100 · Wait ${n}min · Completion ${h}% · Collection ${y}% — ตัวชี้วัดอยู่ในเกณฑ์ดี`,
        cascadeEffect: "ไม่มีผลกระทบลูกโซ่ — NCD Clinic มีประสิทธิภาพทั้ง Operational และ Financial",
        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ NCI ≥ ${Math.min(i+10,100)} (2) เพิ่ม Complication screening (3) DM/HT control rate monitoring`,
        color: "#10b981"
      }), o.sort((l, w) => l.priority - w.priority);
      const A = o.filter(l => l.severity === "critical").length,
        D = o.filter(l => l.severity === "warning").length,
        C = Math.min(10, A * 3 + D * 1.5),
        _ = C >= 7 ? "#f43f5e" : C >= 4 ? "#f59e0b" : "#10b981",
        W = C >= 7 ? "ต้องดำเนินการทันที" : C >= 4 ? "ควรแก้ไขเร็ว" : "สถานการณ์ปกติ";
      return e.jsxs(e.Fragment, {
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "-4px"
          },
          children: [e.jsx("div", {
            style: {
              width: "3px",
              height: "18px",
              background: "linear-gradient(180deg, #f43f5e, #f59e0b)",
              borderRadius: "99px"
            }
          }), e.jsx("span", {
            style: {
              fontSize: "var(--fs-sm)",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.01em"
            },
            children: "🔥 Deep Root-Cause Analysis"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600,
              background: "rgba(244,63,94,.08)",
              padding: "2px 8px",
              borderRadius: "99px"
            },
            children: "Cross-analysis NCD + RCM"
          })]
        }), e.jsxs("div", {
          className: `glass-card ${C>=7?"alert-critical":C>=4?"alert-warning":""}`,
          style: {
            padding: "1.5rem",
            border: `1.5px solid ${_}25`
          },
          children: [e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${_}08, ${_}03)`,
              border: `1px solid ${_}20`,
              marginBottom: "1.25rem"
            },
            children: [e.jsxs("div", {
              children: [e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: _,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em"
                  },
                  children: "⚡ ระดับความเร่งด่วนรวม — NCD Clinic"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: _,
                    background: `${_}15`,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    border: `1px solid ${_}25`
                  },
                  children: W
                })]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-secondary)",
                  fontWeight: 600
                },
                children: ["พบ ", e.jsxs("strong", {
                  style: {
                    color: "#f43f5e"
                  },
                  children: [A, " วิกฤต"]
                }), D > 0 && e.jsxs(e.Fragment, {
                  children: [" + ", e.jsxs("strong", {
                    style: {
                      color: "#f59e0b"
                    },
                    children: [D, " เตือน"]
                  })]
                }), o[0]?.severity === "good" && e.jsx("strong", {
                  style: {
                    color: "#10b981"
                  },
                  children: " ไม่พบปัญหา"
                })]
              }), e.jsx("div", {
                style: {
                  marginTop: "8px",
                  height: "6px",
                  background: "rgba(0,0,0,.06)",
                  borderRadius: "99px",
                  overflow: "hidden"
                },
                children: e.jsx("div", {
                  style: {
                    height: "100%",
                    width: `${C*10}%`,
                    background: "linear-gradient(90deg, #10b981, #f59e0b, #f43f5e)",
                    borderRadius: "99px",
                    transition: "width 1s ease"
                  }
                })
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3px"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    color: "#10b981",
                    fontWeight: 600
                  },
                  children: "ปกติ"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    color: "#f59e0b",
                    fontWeight: 600
                  },
                  children: "เตือน"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    color: "#f43f5e",
                    fontWeight: 600
                  },
                  children: "วิกฤต"
                })]
              })]
            }), e.jsxs("div", {
              style: {
                textAlign: "center"
              },
              children: [e.jsxs("div", {
                className: "urgency-score-pulse",
                style: {
                  fontSize: "36px",
                  fontWeight: 900,
                  color: _,
                  lineHeight: 1
                },
                children: [Math.round(C), e.jsx("span", {
                  style: {
                    fontSize: "16px",
                    fontWeight: 700
                  },
                  children: "/10"
                })]
              }), e.jsx("div", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: _,
                  marginTop: "2px"
                },
                children: "Urgency"
              })]
            })]
          }), e.jsx("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            },
            children: o.map((l, w) => e.jsxs("div", {
              style: {
                borderRadius: "14px",
                border: `1.5px solid ${l.color}20`,
                background: `${l.color}04`,
                overflow: "hidden"
              },
              children: [e.jsxs("div", {
                style: {
                  padding: "10px 16px",
                  background: `linear-gradient(90deg, ${l.color}12, transparent)`,
                  borderBottom: `1px solid ${l.color}15`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [l.priority > 0 && e.jsx("span", {
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: l.color,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 900,
                    flexShrink: 0
                  },
                  children: l.priority
                }), e.jsx("span", {
                  style: {
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)",
                    lineHeight: 1.4
                  },
                  children: l.title
                }), e.jsx("span", {
                  style: {
                    marginLeft: "auto",
                    flexShrink: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    background: `${l.color}15`,
                    color: l.color,
                    border: `1px solid ${l.color}25`
                  },
                  children: l.severity === "critical" ? "🔴 CRITICAL" : l.severity === "warning" ? "🟡 WARNING" : "🟢 GOOD"
                })]
              }), e.jsxs("div", {
                style: {
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                },
                children: [e.jsxs("div", {
                  style: {
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "rgba(244,63,94,.03)",
                    borderLeft: "3px solid #f43f5e"
                  },
                  children: [e.jsx("p", {
                    style: {
                      margin: "0 0 4px",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#f43f5e",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: "🔍 ปัญหาที่แท้จริง (Root Cause)"
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "11.5px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.65,
                      fontWeight: 500
                    },
                    children: l.rootCause
                  })]
                }), e.jsxs("div", {
                  style: {
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "rgba(245,158,11,.03)",
                    borderLeft: "3px solid #f59e0b"
                  },
                  children: [e.jsx("p", {
                    style: {
                      margin: "0 0 4px",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#f59e0b",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: "⚡ ผลกระทบลูกโซ่ (Cascade Effect)"
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "11.5px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.65,
                      fontWeight: 500
                    },
                    children: l.cascadeEffect
                  })]
                }), e.jsxs("div", {
                  style: {
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "rgba(124,58,237,.04)",
                    borderLeft: "3px solid #7c3aed"
                  },
                  children: [e.jsxs("p", {
                    style: {
                      margin: "0 0 4px",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#7c3aed",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: ["🔧 แก้ไขก่อน — ด่วนที่ ", l.priority > 0 ? l.priority : "—", " (Fix First)"]
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "11.5px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.65,
                      fontWeight: 500
                    },
                    children: l.fixFirst
                  })]
                })]
              })]
            }, w))
          }), o.length > 1 && o[0]?.severity !== "good" && e.jsxs("div", {
            style: {
              marginTop: "16px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: "rgba(14,165,233,.04)",
              border: "1px solid rgba(14,165,233,.15)"
            },
            children: [e.jsx("p", {
              style: {
                margin: "0 0 10px",
                fontSize: "12px",
                fontWeight: 800,
                color: "#0ea5e9",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: "🗺️ แผนที่ความเชื่อมโยง — NCD Bottleneck & RCM Chain"
            }), e.jsx("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap"
              },
              children: [{
                label: `Wait ${n}min`,
                color: "#f59e0b"
              }, {
                label: `Collection ${y}%`,
                color: "#f43f5e"
              }, {
                label: `Claim ${r}%`,
                color: "#fb7185"
              }, {
                label: `Dropout ${v}`,
                color: "#0ea5e9"
              }, {
                label: `AR ${a}d`,
                color: "#8b5cf6"
              }, {
                label: `NCI = ${i}/100`,
                color: "#10b981"
              }].map((l, w) => e.jsxs(G.Fragment, {
                children: [w > 0 && e.jsx("span", {
                  style: {
                    color: "#94a3b8",
                    fontSize: "14px"
                  },
                  children: "→"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: l.color,
                    background: `${l.color}10`,
                    padding: "4px 10px",
                    borderRadius: "8px",
                    border: `1px solid ${l.color}20`
                  },
                  children: l.label
                })]
              }, w))
            }), e.jsxs("p", {
              style: {
                margin: "10px 0 0",
                fontSize: "12px",
                color: "var(--md-text-secondary)",
                lineHeight: 1.6,
                fontWeight: 500,
                fontStyle: "italic"
              },
              children: ["💡 ", e.jsx("strong", {
                children: "สรุปวิเคราะห์:"
              }), " ปัญหา NCD ข้ามมิติจาก ", e.jsx("strong", {
                style: {
                  color: "#f59e0b"
                },
                children: "Wait time สูง"
              }), " (Operational) ส่งผลให้เกิด Dropout และกระทบ ", e.jsx("strong", {
                style: {
                  color: "#f43f5e"
                },
                children: "Collection Rate"
              }), " (Financial) ── ", e.jsx("strong", {
                children: 'แก้ "ด่วนที่ 1" (Wait time)'
              }), " เพื่อลด Dropout และ ", e.jsx("strong", {
                children: '"ด่วนที่ 2" (Collection)'
              }), " เพื่อรักษา Cash Flow จะช่วยกู้คืนสุขภาพรายได้ NCD Clinic ได้ทันที"]
            })]
          })]
        })]
      })
    })(), u.ncdRiskStratification && e.jsxs(e.Fragment, {
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "-4px"
        },
        children: [e.jsx("div", {
          style: {
            width: "3px",
            height: "18px",
            background: "linear-gradient(180deg, #f43f5e, #7c3aed)",
            borderRadius: "99px"
          }
        }), e.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            letterSpacing: "-0.01em"
          },
          children: "🫀 AI Risk Stratification Engine"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            background: "rgba(244,63,94,.08)",
            padding: "2px 8px",
            borderRadius: "99px"
          },
          children: "AI Powered"
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
          borderTop: "4px solid #f43f5e"
        },
        children: [e.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "1rem",
            marginBottom: "1.25rem"
          },
          children: [e.jsxs("div", {
            style: {
              padding: "12px",
              background: "rgba(244,63,94,.05)",
              borderRadius: "12px",
              border: "1px solid rgba(244,63,94,.15)"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "#f43f5e",
                textTransform: "uppercase"
              },
              children: "Critical Risk"
            }), e.jsx("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "28px",
                fontWeight: 900,
                color: "#f43f5e",
                lineHeight: 1
              },
              children: u.ncdRiskStratification.summary?.risk_distribution?.critical || 0
            })]
          }), e.jsxs("div", {
            style: {
              padding: "12px",
              background: "rgba(245,158,11,.05)",
              borderRadius: "12px",
              border: "1px solid rgba(245,158,11,.15)"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "#f59e0b",
                textTransform: "uppercase"
              },
              children: "High Risk"
            }), e.jsx("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "28px",
                fontWeight: 900,
                color: "#f59e0b",
                lineHeight: 1
              },
              children: u.ncdRiskStratification.summary?.risk_distribution?.high || 0
            })]
          }), e.jsxs("div", {
            style: {
              padding: "12px",
              background: "rgba(14,165,233,.05)",
              borderRadius: "12px",
              border: "1px solid rgba(14,165,233,.15)"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "#0ea5e9",
                textTransform: "uppercase"
              },
              children: "Moderate Risk"
            }), e.jsx("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "28px",
                fontWeight: 900,
                color: "#0ea5e9",
                lineHeight: 1
              },
              children: u.ncdRiskStratification.summary?.risk_distribution?.moderate || 0
            })]
          }), e.jsxs("div", {
            style: {
              padding: "12px",
              background: "rgba(16,185,129,.05)",
              borderRadius: "12px",
              border: "1px solid rgba(16,185,129,.15)"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "#10b981",
                textTransform: "uppercase"
              },
              children: "BP Control Rate"
            }), e.jsxs("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "28px",
                fontWeight: 900,
                color: "#10b981",
                lineHeight: 1
              },
              children: [u.ncdRiskStratification.summary?.bp_control_rate, "%"]
            })]
          })]
        }), e.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "8px"
          },
          children: [e.jsx("p", {
            style: {
              margin: "0 0 4px",
              fontSize: "12px",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.04em"
            },
            children: "💡 AI Interventions (Highest Risk Patients)"
          }), u.ncdRiskStratification.recommendations?.slice(0, 4).map((t, i) => {
            const d = t.risk_level === "critical" ? "#f43f5e" : "#f59e0b";
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                background: `${d}05`,
                borderRadius: "10px",
                borderLeft: `3px solid ${d}`
              },
              children: [e.jsx("div", {
                style: {
                  minWidth: "40px"
                },
                children: e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 900,
                    color: d
                  },
                  children: ["HN ", t.hn]
                })
              }), e.jsxs("div", {
                style: {
                  flex: 1
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: t.action
                }), e.jsx("p", {
                  style: {
                    margin: "2px 0 0",
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    fontWeight: 500
                  },
                  children: t.reason
                })]
              }), e.jsx("div", {
                style: {
                  textAlign: "right"
                },
                children: e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    background: `${d}15`,
                    color: d,
                    padding: "2px 8px",
                    borderRadius: "99px"
                  },
                  children: t.risk_level.toUpperCase()
                })
              })]
            }, i)
          })]
        })]
      })]
    }), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #e11d48, #be123c)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💰 รายได้โดยประมาณ NCD Clinic — ปีงบประมาณ (3 ปีย้อนหลัง)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(225,29,72,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "vn_stat · HOSxP XE"
      })]
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: f.ncdRevenueFiscal ? e.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        },
        children: [e.jsx("div", {
          className: "skeleton",
          style: {
            height: "80px",
            borderRadius: "12px"
          }
        }), e.jsx("div", {
          className: "skeleton",
          style: {
            height: "280px",
            borderRadius: "12px"
          }
        })]
      }) : (() => {
        const i = u.ncdRevenueFiscal?.fiscal_years || [];
        if (i.length === 0) return e.jsx("p", {
          style: {
            fontSize: "var(--fs-sm)",
            color: "var(--md-text-tertiary)",
            textAlign: "center",
            padding: "2rem 0"
          },
          children: "ไม่พบข้อมูลรายได้"
        });
        const n = ["#94a3b8", "#fb7185", "#e11d48"],
          g = ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((x, c) => {
            const y = {
              month: x
            };
            return i.forEach((r, p) => {
              y[`fy${p}`] = r.months[c]?.revenue || 0
            }), y
          }),
          j = i[i.length - 1],
          h = i.length >= 2 ? i[i.length - 2] : null,
          v = j.comparable_months || 12,
          S = h && (h.comparable_revenue ?? h.total_revenue) > 0 ? Math.round(((j.comparable_revenue ?? j.total_revenue) - (h.comparable_revenue ?? h.total_revenue)) / (h.comparable_revenue ?? h.total_revenue) * 1e3) / 10 : 0;
        return e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          },
          children: [e.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: `repeat(${i.length}, 1fr)`,
              gap: "10px"
            },
            children: i.map((x, c) => {
              const y = c === i.length - 1,
                r = n[c];
              return e.jsxs("div", {
                style: {
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: y ? `linear-gradient(135deg, ${r}12, ${r}05)` : `${r}06`,
                  border: `1px solid ${r}${y?"30":"15"}`
                },
                children: [e.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "6px"
                  },
                  children: [e.jsx("div", {
                    style: {
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: r
                    }
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      color: r,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: x.fiscal_label
                  }), y && e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#e11d48",
                      background: "rgba(225,29,72,.1)",
                      padding: "1px 6px",
                      borderRadius: "99px",
                      marginLeft: "auto"
                    },
                    children: "ปัจจุบัน"
                  })]
                }), e.jsxs("p", {
                  style: {
                    fontSize: "22px",
                    fontWeight: 900,
                    color: r,
                    margin: "0 0 2px",
                    letterSpacing: "-0.02em"
                  },
                  children: ["฿", (x.total_revenue / 1e6).toFixed(1), "M"]
                }), e.jsxs("p", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    margin: 0,
                    fontWeight: 600
                  },
                  children: [x.total_visits.toLocaleString(), " visits · ", x.total_patients.toLocaleString(), " patients · ฿", x.avg_revenue_per_visit.toLocaleString(), "/visit"]
                }), y && h && e.jsxs("div", {
                  style: {
                    marginTop: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      color: S >= 0 ? "#10b981" : "#f43f5e"
                    },
                    children: [S >= 0 ? "📈" : "📉", " YoY ", S >= 0 ? "+" : "", S, "%"]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-tertiary)",
                      fontWeight: 500
                    },
                    children: ["vs ", h.fiscal_label, " (เทียบ ", v, " ด.)"]
                  })]
                })]
              }, c)
            })
          }), e.jsx(z, {
            width: "100%",
            height: 280,
            children: e.jsxs(H, {
              data: g,
              margin: {
                top: 8,
                right: 12,
                bottom: 0,
                left: 4
              },
              children: [e.jsx(R, {
                strokeDasharray: "3 3",
                stroke: "rgba(203,213,225,.3)",
                vertical: !1
              }), e.jsx(T, {
                dataKey: "month",
                tick: {
                  fill: "#6b7280",
                  fontSize: 10,
                  fontWeight: 700
                },
                axisLine: !1,
                tickLine: !1
              }), e.jsx($, {
                tick: {
                  fill: "#9ca3af",
                  fontSize: 9
                },
                axisLine: !1,
                tickLine: !1,
                width: 40,
                tickFormatter: x => x >= 1e6 ? `${(x/1e6).toFixed(0)}M` : `${(x/1e3).toFixed(0)}K`
              }), e.jsx(N, {
                contentStyle: {
                  background: "#fff",
                  border: "1px solid #e8eaf2",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,.08)"
                },
                formatter: (x, c) => {
                  const y = Number(c.replace("fy", ""));
                  return [`฿${(x/1e6).toFixed(2)}M`, i[y]?.fiscal_label || c]
                }
              }), i.map((x, c) => e.jsx(M, {
                dataKey: `fy${c}`,
                fill: n[c],
                radius: [3, 3, 0, 0],
                barSize: i.length <= 2 ? 20 : 14,
                opacity: c === i.length - 1 ? 1 : .5,
                name: `fy${c}`
              }, c))]
            })
          }), e.jsx("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "center"
            },
            children: i.map((x, c) => e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "5px"
              },
              children: [e.jsx("div", {
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  background: n[c],
                  opacity: c === i.length - 1 ? 1 : .5
                }
              }), e.jsx("span", {
                style: {
                  fontSize: "var(--fs-xs)",
                  color: "var(--md-text-secondary)",
                  fontWeight: 600
                },
                children: x.fiscal_label
              }), e.jsxs("span", {
                style: {
                  fontSize: "var(--fs-2xs)",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 500
                },
                children: ["฿", (x.total_revenue / 1e6).toFixed(1), "M"]
              })]
            }, c))
          })]
        })
      })()
    }), e.jsx(P, {
      name: "NCD Goal Attainment",
      children: e.jsx(ie, {
        data: u.ncdGoalAttainment,
        loading: u.loading?.ncdGoalAttainment
      })
    }), e.jsx(ee, {
      data: u.ncdAI,
      theme: "default",
      title: "AI NCD Intelligence"
    })]
  })
}

function ie({
  data: u,
  loading: k
}) {
  if (k) return e.jsx("div", {
    className: "skeleton",
    style: {
      height: "140px",
      borderRadius: "16px"
    }
  });
  if (!u) return null;
  const {
    hba1c: b,
    bp: m
  } = u;
  return e.jsxs("div", {
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
          background: "linear-gradient(180deg, #e11d48, #be185c)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🎯 NCD Goal Attainment Dashboard"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(225,29,72,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "ADA 2024 · กรมการแพทย์"
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "1.25rem 1.5rem",
          borderLeft: "4px solid #e11d48"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px"
          },
          children: [e.jsxs("div", {
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "#e11d48",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: "HbA1c <7% — DM"
            }), e.jsxs("p", {
              style: {
                margin: "2px 0 0",
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: ["ผู้ป่วยเบาหวาน · ", b.window_days, " วันล่าสุด"]
            })]
          }), e.jsxs("div", {
            style: {
              textAlign: "right"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "28px",
                fontWeight: 900,
                color: (b.goal_rate ?? 0) >= 50 ? "#10b981" : "#f43f5e",
                letterSpacing: "-0.02em"
              },
              children: b.goal_rate != null ? `${b.goal_rate}%` : "—"
            }), e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: [b.goal_met, "/", b.total_tested, " ราย"]
            })]
          })]
        }), e.jsx("div", {
          style: {
            height: "8px",
            borderRadius: "99px",
            background: "rgba(203,213,225,.2)",
            overflow: "hidden",
            marginBottom: "12px"
          },
          children: e.jsx("div", {
            style: {
              width: `${Math.min(b.goal_rate??0,100)}%`,
              height: "100%",
              borderRadius: "99px",
              background: (b.goal_rate ?? 0) >= 50 ? "#10b981" : "#f43f5e",
              transition: "width 0.8s ease"
            }
          })
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px"
          },
          children: [{
            label: "ควบคุมได้ <7%",
            val: b.goal_met,
            color: "#10b981"
          }, {
            label: "ต้องปรับ 7-9%",
            val: b.suboptimal,
            color: "#f59e0b"
          }, {
            label: "ควบคุมไม่ได้ ≥9%",
            val: b.poor_control,
            color: "#f43f5e"
          }].map((f, s) => e.jsxs("div", {
            style: {
              padding: "8px",
              borderRadius: "8px",
              background: `${f.color}08`,
              border: `1px solid ${f.color}20`,
              textAlign: "center"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "16px",
                fontWeight: 900,
                color: f.color
              },
              children: f.val ?? "—"
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                lineHeight: 1.3
              },
              children: f.label
            })]
          }, s))
        }), b.avg_value > 0 && e.jsxs("p", {
          style: {
            margin: "10px 0 0",
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            fontWeight: 600
          },
          children: ["ค่าเฉลี่ย HbA1c: ", e.jsxs("strong", {
            style: {
              color: b.avg_value < 7 ? "#10b981" : "#f43f5e"
            },
            children: [b.avg_value, "%"]
          }), " · ", "ช่วง: ", b.min_value, "–", b.max_value, "%"]
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "1.25rem 1.5rem",
          borderLeft: "4px solid #7c3aed"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "16px"
          },
          children: [e.jsxs("div", {
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "#7c3aed",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: "BP <140/90 — HT"
            }), e.jsxs("p", {
              style: {
                margin: "2px 0 0",
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: ["ผู้ป่วยความดันโลหิตสูง · ", m.window_days, " วันล่าสุด"]
            })]
          }), e.jsxs("div", {
            style: {
              textAlign: "right"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "28px",
                fontWeight: 900,
                color: (m.goal_rate ?? 0) >= 60 ? "#10b981" : "#f43f5e",
                letterSpacing: "-0.02em"
              },
              children: m.goal_rate != null ? `${m.goal_rate}%` : "—"
            }), e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: [m.goal_met, "/", m.total_measured, " ราย"]
            })]
          })]
        }), e.jsx("div", {
          style: {
            height: "8px",
            borderRadius: "99px",
            background: "rgba(203,213,225,.2)",
            overflow: "hidden",
            marginBottom: "12px"
          },
          children: e.jsx("div", {
            style: {
              width: `${Math.min(m.goal_rate??0,100)}%`,
              height: "100%",
              borderRadius: "99px",
              background: (m.goal_rate ?? 0) >= 60 ? "#10b981" : "#f43f5e",
              transition: "width 0.8s ease"
            }
          })
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px"
          },
          children: [{
            label: "ควบคุมได้ <140/90",
            val: m.goal_met,
            color: "#10b981"
          }, {
            label: "Stage 1 HT",
            val: m.stage1_ht,
            color: "#f59e0b"
          }, {
            label: "Stage 2 HT ≥160",
            val: m.stage2_ht,
            color: "#f43f5e"
          }].map((f, s) => e.jsxs("div", {
            style: {
              padding: "8px",
              borderRadius: "8px",
              background: `${f.color}08`,
              border: `1px solid ${f.color}20`,
              textAlign: "center"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "16px",
                fontWeight: 900,
                color: f.color
              },
              children: f.val ?? "—"
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                lineHeight: 1.3
              },
              children: f.label
            })]
          }, s))
        }), m.avg_systolic > 0 && e.jsxs("p", {
          style: {
            margin: "10px 0 0",
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            fontWeight: 600
          },
          children: ["ค่าเฉลี่ย BP: ", e.jsxs("strong", {
            style: {
              color: m.avg_systolic < 140 ? "#10b981" : "#f43f5e"
            },
            children: [m.avg_systolic, "/", m.avg_diastolic]
          }), " mmHg"]
        })]
      })]
    })]
  })
}
const oe = G.memo(te);
export {
  oe as
  default
};