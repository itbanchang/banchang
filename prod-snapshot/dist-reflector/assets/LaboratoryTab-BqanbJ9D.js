import {
  R as J,
  r as j,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  b as Z,
  a as ee,
  T as te,
  E as re,
  t as ae,
  S as D,
  M as ie,
  g as z,
  K as ne,
  h as oe
} from "./shared-ui-OVDEF1.js";
import {
  R as A,
  P as se,
  f as le,
  e as B,
  T as W,
  c as M,
  a as E,
  X as H,
  Y as F,
  B as G,
  C as de,
  A as pe,
  b as ce
} from "./vendor-charts-C5q2M-g3.js";
const l = {
    primary: "#0ea5e9",
    secondary: "#0284c7",
    accent: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(6,182,212,0.05) 100%)",
    border: "rgba(14,165,233,0.25)",
    light: "rgba(14,165,233,0.08)"
  },
  S = ["#0ea5e9", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#f43f5e", "#6366f1"],
  V = {
    K: {
      unit: "mEq/L",
      danger: [r => r < 2.5 || r > 6.5, "#f43f5e"],
      warning: [r => r < 3 || r > 5.5, "#f59e0b"]
    },
    Na: {
      unit: "mEq/L",
      danger: [r => r < 120 || r > 160, "#f43f5e"],
      warning: [r => r < 125 || r > 155, "#f59e0b"]
    },
    Glucose: {
      unit: "mg/dL",
      danger: [r => r < 40 || r > 500, "#f43f5e"],
      warning: [r => r < 50 || r > 400, "#f59e0b"]
    },
    Hb: {
      unit: "g/dL",
      danger: [r => r < 5, "#f43f5e"],
      warning: [r => r < 7, "#f59e0b"]
    },
    Troponin: {
      unit: "ng/mL",
      danger: [r => r > .4, "#f43f5e"],
      warning: [r => r > .04, "#f59e0b"]
    },
    Lactate: {
      unit: "mmol/L",
      danger: [r => r > 4, "#f43f5e"],
      warning: [r => r > 2, "#f59e0b"]
    },
    WBC: {
      unit: "x10^3",
      danger: [r => r < 1 || r > 30, "#f43f5e"],
      warning: [r => r < 2 || r > 20, "#f59e0b"]
    },
    PLT: {
      unit: "x10^3",
      danger: [r => r < 20 || r > 1e3, "#f43f5e"],
      warning: [r => r < 50, "#f59e0b"]
    },
    Cr: {
      unit: "mg/dL",
      danger: [r => r > 10, "#f43f5e"],
      warning: [r => r > 4, "#f59e0b"]
    },
    pH: {
      unit: "",
      danger: [r => r < 7.1 || r > 7.6, "#f43f5e"],
      warning: [r => r < 7.25 || r > 7.55, "#f59e0b"]
    }
  };

function xe(r, b) {
  const i = parseFloat(b);
  if (isNaN(i)) return "#f59e0b";
  const n = V[r];
  return n ? n.danger[0](i) ? n.danger[1] : n.warning[0](i) ? n.warning[1] : "#10b981" : "#f59e0b"
}

function ge() {
  const r = Z(t => ({
      labToday: t.labToday,
      labAnalytics: t.labAnalytics,
      labRevenueFiscal: t.labRevenueFiscal,
      labAI: t.labAI,
      loading: t.loading
    })),
    {
      fetchData: b
    } = ee(),
    i = r.labToday || {},
    n = r.labAnalytics,
    f = r.labRevenueFiscal,
    x = r.loading || {};
  j.useEffect(() => {
    !i.total_orders && !x.labToday && b("labToday", "/api/lab/today"), !n && !x.labAnalytics && b("labAnalytics", "/api/lab/analytics"), !f && !x.labRevenueFiscal && b("labRevenueFiscal", "/api/lab/revenue-fiscal");
    const t = setTimeout(() => b("labAI", "/api/ai/lab/optimization"), 300);
    return () => clearTimeout(t)
  }, [b]);
  const p = j.useMemo(() => {
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
      if (!n) return t;
      const a = n,
        s = a.lpi ?? 0,
        o = a.avg_tat ?? 0,
        d = a.p90_tat ?? 0,
        h = a.completion_rate ?? 0,
        y = a.abnormal_rate ?? 0,
        v = a.tat_sla_pct ?? 0,
        w = a.overdue_count ?? 0,
        m = [];
      if (d > 240 ? m.push({
          priority: 1,
          severity: "critical",
          color: "#f43f5e",
          title: "TAT P90 วิกฤต: " + d + " นาที (" + (d / 60).toFixed(1) + " ชม.)",
          rootCause: "ผู้ป่วย 10% รอผลนานกว่า " + (d / 60).toFixed(1) + " ชั่วโมง บ่งชี้คอขวดในกระบวนการตรวจหรือรายงานผล",
          cascadeEffect: "Clinical Decision Making ล่าช้า อาจทำให้แพทย์ต้องรอผลก่อน Discharge หรือเปลี่ยนแผนการรักษา",
          fixFirst: "ตรวจสอบ Bottleneck: เครื่องมือ/reagent ขาด หรือ Workload เกินกำลังนักเทคนิค"
        }) : o > 120 && m.push({
          priority: 2,
          severity: "warning",
          color: "#f59e0b",
          title: "TAT เฉลี่ยสูงกว่าเกณฑ์: " + o + " นาที",
          rootCause: "TAT เฉลี่ยเกิน 2 ชั่วโมง (เป้าหมาย < 60 นาที) อาจกระทบ Clinical Decision Making",
          cascadeEffect: "แพทย์ไม่สามารถวินิจฉัยและสั่งการรักษาได้ทันเวลา ส่งผลต่อ Length of Stay",
          fixFirst: "ปรับ Priority Queue สำหรับ Stat/Urgent Orders และตรวจสอบ Analyzer Downtime"
        }), h < 90 && m.push({
          priority: 2,
          severity: "warning",
          color: "#f59e0b",
          title: "อัตราความสมบูรณ์ต่ำ: " + h + "%",
          rootCause: "มี " + w + " รายการที่ยังไม่มีผล อาจมีปัญหา System Interface หรือ Reagent หมด",
          cascadeEffect: "ผลตรวจไม่ครบถ้วนส่งผลกระทบต่อ Care Continuity และ Discharge Planning",
          fixFirst: "ตรวจสอบ LIS Interface กับ Analyzer และรายการค้างรายงานผล"
        }), w > 20 && m.push({
          priority: 1,
          severity: "critical",
          color: "#f43f5e",
          title: "รายการ Overdue: " + w + " รายการ",
          rootCause: "มีผลตรวจค้างมากกว่า 20 รายการ ที่ยังไม่ได้รายงานผลในวันก่อนหน้า",
          cascadeEffect: "Backlog สะสมอาจทำให้ TAT ของวันถัดไปพุ่งสูงขึ้นแบบ Cascading",
          fixFirst: "แจ้งเตือน Supervisor ทันที และ Clear Backlog ก่อน Accept คำสั่งตรวจใหม่"
        }), v > 0 && v < 60 && m.push({
          priority: 3,
          severity: "warning",
          color: "#f59e0b",
          title: "TAT SLA (<60min) ต่ำ: " + v + "%",
          rootCause: "เพียง " + v + "% ของ Lab orders ที่ได้ผลภายใน 60 นาที (เป้าหมาย >= 70%)",
          cascadeEffect: "ER/ICU ได้รับผลตรวจช้า ส่งผลต่อ Time-Critical Decisions",
          fixFirst: "เพิ่ม STAT lane สำหรับ Critical Tests และจัดลำดับความสำคัญ ICU/ER Orders"
        }), y > 30 && m.push({
          priority: 4,
          severity: "info",
          color: "#f59e0b",
          title: "Abnormal Rate สูง: " + y + "%",
          rootCause: "ผล Lab ผิดปกติมากถึง " + y + "% บ่งชี้ผู้ป่วยมีความเจ็บป่วยรุนแรงหรือมีปัญหา Quality Control",
          cascadeEffect: "หาก False Abnormal สูง จะเพิ่ม Unnecessary Follow-up และสิ้นเปลือง Reagent",
          fixFirst: "ตรวจสอบ QC Logs และ Delta Check ว่ามีผล false abnormal จากปัญหา Pre-analytical"
        }), a.top_tests_by_volume && a.top_tests_by_volume.length > 0) {
        const g = a.top_tests_by_volume[0];
        g && g.count > 0 && m.push({
          priority: 5,
          severity: "good",
          color: "#10b981",
          title: "การตรวจสูงสุด: " + (g.name?.substring(0, 35) || "N/A"),
          rootCause: "ตรวจ " + g.count.toLocaleString() + " ครั้ง (30D), Abnormal " + (g.abnormal_rate || 0) + "% — ต้องมั่นใจ Reagent เพียงพอตลอดเวลา",
          cascadeEffect: "Reagent stockout สำหรับ High-volume test จะกระทบ Workflow ทั้งระบบ",
          fixFirst: "ตรวจสอบ Stock Reagent สำหรับการตรวจนี้ให้เพียงพอ >= 2 สัปดาห์ล่วงหน้า"
        })
      }
      const C = f?.fiscal_years || [],
        L = C[C.length - 1] || {
          fiscal_label: "FY"
        },
        P = C[C.length - 2],
        U = L.comparable_revenue || L.total_revenue || 0,
        O = P && (P.comparable_revenue || P.total_revenue) || 0,
        Y = O > 0 ? (U - O) / O * 100 : 0,
        Q = [{
          label: "Avg TAT",
          value: o + "m",
          color: o <= 60 ? "#10b981" : o <= 120 ? "#f59e0b" : "#f43f5e",
          icon: "⏱️"
        }, {
          label: "TAT SLA",
          value: v + "%",
          color: v >= 70 ? "#10b981" : v >= 50 ? "#f59e0b" : "#f43f5e",
          icon: "⚡"
        }, {
          label: "Completion",
          value: h + "%",
          color: h >= 95 ? "#10b981" : h >= 85 ? "#f59e0b" : "#f43f5e",
          icon: "✅"
        }, {
          label: "LPI Score",
          value: "" + s,
          color: s >= 80 ? "#10b981" : s >= 60 ? "#f59e0b" : "#f43f5e",
          icon: "🎯"
        }],
        X = m.filter(g => g.severity === "critical").length,
        q = m.filter(g => g.severity === "warning").length,
        T = Math.min(10, X * 3 + q * 1.5);
      return {
        problems: m.sort((g, $) => g.priority - $.priority),
        urgencyScore: T,
        urgencyColor: T >= 7 ? "#f43f5e" : T >= 4 ? "#f59e0b" : "#10b981",
        urgencyLabel: T >= 7 ? "วิกฤต" : T >= 4 ? "เฝ้าระวัง" : "ปกติ",
        latestFY: L,
        yoyGrowth: Y,
        strategicKPIs: Q
      }
    }, [n, f]),
    N = j.useMemo(() => (n?.monthly_trend || []).map(t => ({
      month: t.month,
      orders: t.orders,
      abnormal: t.abnormal
    })), [n]),
    K = j.useMemo(() => {
      if (!f?.fiscal_years) return [];
      const t = f.fiscal_years;
      return ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((s, o) => {
        const d = {
          month: s
        };
        return t.forEach((h, y) => {
          d["fy" + y] = h.months?.[o]?.revenue || 0
        }), d
      })
    }, [f]),
    _ = j.useMemo(() => (n?.tat_distribution || []).map(t => ({
      name: t.bucket,
      value: t.count
    })), [n]),
    R = j.useMemo(() => {
      const t = i.hourly_distribution || [];
      return t.length === 0 ? [] : t.map(a => ({
        hour: a.hour != null ? a.hour + "h" : "",
        count: a.count || 0
      }))
    }, [i]);
  if (x.labToday && x.labAnalytics && !i.total_orders && !n) return e.jsx(te, {});
  const u = i.total_orders > 0 ? Math.round(i.completed / i.total_orders * 100) : 0,
    k = i.abnormal_rate || (i.total_items > 0 ? Math.round(i.abnormal_count / i.total_items * 100) : 0),
    c = i.critical_values?.length || 0,
    I = i.on_duty?.length || n?.on_duty?.staff?.length || 0;
  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    role: "region",
    "aria-label": "แผนก Laboratory — วิเคราะห์ห้องปฏิบัติการ",
    children: [e.jsx(re, {
      title: "AI Executive Quick Summary — Laboratory",
      subtitle: "Orders · TAT · Completion · Abnormal Rate",
      badge: "📐 Quick Summary",
      accentColor: "#0ea5e9",
      headerGradient: "linear-gradient(135deg, rgba(14,165,233,.10), rgba(6,182,212,.05))",
      narrative: ae(r)
    }), e.jsx(D, {
      name: "AI Strategic Intelligence Feed",
      children: e.jsxs("div", {
        style: {
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          paddingBottom: "4px"
        },
        children: [e.jsxs("div", {
          className: "glass-card",
          style: {
            flex: "1 1 300px",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderLeft: "5px solid " + p.urgencyColor,
            background: "linear-gradient(90deg, " + p.urgencyColor + "10 0%, transparent 100%)"
          },
          children: [e.jsx("div", {
            style: {
              fontSize: "32px"
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
                  color: p.urgencyColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                },
                children: "AI Lab Diagnostics"
              }), e.jsx("span", {
                style: {
                  padding: "2px 8px",
                  borderRadius: "4px",
                  background: p.urgencyColor,
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 900
                },
                children: p.urgencyLabel
              }), e.jsxs("span", {
                style: {
                  fontSize: "11px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: ["Urgency: ", p.urgencyScore.toFixed(1), "/10"]
              })]
            }), e.jsx("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--md-text-primary)"
              },
              children: x.labAnalytics ? "กำลังประมวลผลอัลกอริทึมวิเคราะห์..." : p.problems[0]?.title || "ระบบห้องปฏิบัติการดำเนินงานได้อย่างมีประสิทธิภาพสูงสุด"
            })]
          })]
        }), e.jsxs("div", {
          className: "glass-card",
          style: {
            flex: "0 0 180px",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderLeft: "4px solid #10b981",
            background: "rgba(16,185,129,.05)"
          },
          children: [e.jsx("div", {
            style: {
              fontSize: "24px"
            },
            children: "📈"
          }), e.jsxs("div", {
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: l.primary,
                textTransform: "uppercase"
              },
              children: "Lab Volume YoY"
            }), e.jsxs("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "22px",
                fontWeight: 900,
                color: p.yoyGrowth >= 0 ? "#10b981" : "#f43f5e"
              },
              children: [p.yoyGrowth >= 0 ? "↑" : "↓", " ", Math.abs(p.yoyGrowth).toFixed(1), "%"]
            })]
          })]
        }), e.jsxs("div", {
          className: "glass-card",
          style: {
            flex: "0 0 200px",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            borderLeft: "4px solid " + (c > 0 ? "#f43f5e" : "#10b981"),
            background: c > 0 ? "rgba(244,63,94,.05)" : "rgba(16,185,129,.05)"
          },
          children: [e.jsx("div", {
            style: {
              fontSize: "24px"
            },
            children: "🚨"
          }), e.jsxs("div", {
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: c > 0 ? "#f43f5e" : "#10b981",
                textTransform: "uppercase"
              },
              children: "Critical Values"
            }), e.jsxs("p", {
              style: {
                margin: "2px 0 0",
                fontSize: "18px",
                fontWeight: 900,
                color: c > 0 ? "#f43f5e" : "#10b981"
              },
              children: [c, " รายการ"]
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: "ต้องรายงานแพทย์ทันที"
            })]
          })]
        })]
      })
    }), e.jsx(ie, {
      metrics: [{
        label: "Total Orders",
        value: i.total_orders ?? "—",
        unit: "orders",
        status: i.total_orders > 0 ? "success" : "neutral",
        icon: "🔬"
      }, {
        label: "Completed",
        value: i.completed ?? "—",
        unit: u > 0 ? `${u}%` : "",
        target: "95%",
        status: u >= 95 ? "success" : u >= 80 ? "warning" : "danger",
        icon: "✅"
      }, {
        label: "Pending",
        value: i.pending ?? "—",
        unit: "orders",
        status: (i.pending || 0) > 50 ? "danger" : (i.pending || 0) > 20 ? "warning" : "success",
        icon: "⏳"
      }, {
        label: "Avg TAT",
        value: i.turnaround_time ?? n?.avg_tat ?? "—",
        unit: "นาที",
        target: 60,
        status: (i.turnaround_time || n?.avg_tat || 999) <= 60 ? "success" : (i.turnaround_time || n?.avg_tat || 999) <= 120 ? "warning" : "danger",
        icon: "⏱️"
      }, {
        label: "Abnormal %",
        value: k || "—",
        unit: "%",
        status: k > 30 ? "warning" : "neutral",
        icon: "📊"
      }, {
        label: "Critical Values",
        value: c,
        unit: "cases",
        status: c > 5 ? "danger" : c > 0 ? "warning" : "success",
        icon: "🚨"
      }, {
        label: "Unique Patients",
        value: i.unique_patients ?? "—",
        unit: "patients",
        status: "neutral",
        icon: "👥"
      }, {
        label: "On-Duty Staff",
        value: I,
        unit: "คน",
        status: I > 0 ? "success" : "warning",
        icon: "🧑‍🔬"
      }]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        style: {
          padding: "1.25rem 1.5rem",
          borderRadius: "16px",
          background: l.gradient,
          border: "1px solid " + l.border,
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden"
        },
        children: [e.jsx("div", {
          style: {
            position: "absolute",
            top: -30,
            right: -30,
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), e.jsxs("div", {
          style: {
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
                color: l.primary,
                margin: 0,
                letterSpacing: "0.1em"
              },
              children: "🔬 Today Lab Orders"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                background: l.light,
                padding: "2px 8px",
                borderRadius: "99px"
              },
              children: "Real-time"
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              marginTop: "12px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "42px",
                fontWeight: 950,
                color: l.secondary,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                textShadow: "0 0 40px rgba(14,165,233,.3)"
              },
              children: (i.total_orders || 0).toLocaleString("th-TH")
            }), e.jsx("span", {
              style: {
                fontSize: "14px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: "Orders"
            }), e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: "99px",
                background: u >= 95 ? "rgba(16,185,129,.1)" : "rgba(245,158,11,.1)",
                color: u >= 95 ? "#10b981" : "#f59e0b"
              },
              children: [u, "% Complete"]
            })]
          }), e.jsxs("div", {
            style: {
              marginTop: "12px"
            },
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
                children: ["✅ Completed: ", i.completed || 0]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#f59e0b"
                },
                children: ["⏳ Pending: ", i.pending || 0]
              })]
            }), e.jsxs("div", {
              style: {
                height: "6px",
                borderRadius: "99px",
                overflow: "hidden",
                background: "rgba(0,0,0,0.05)",
                display: "flex",
                gap: "2px"
              },
              children: [e.jsx("div", {
                style: {
                  flex: i.completed || 0,
                  background: "#10b981",
                  borderRadius: "99px",
                  transition: "flex 0.8s ease"
                }
              }), e.jsx("div", {
                style: {
                  flex: i.pending || 0,
                  background: "#f59e0b",
                  borderRadius: "99px",
                  transition: "flex 0.8s ease"
                }
              })]
            })]
          }), i.demographics && e.jsxs("div", {
            style: {
              display: "flex",
              gap: "16px",
              marginTop: "10px"
            },
            children: [e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: "#0ea5e9"
              },
              children: ["♂ ชาย: ", i.demographics.male || 0]
            }), e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: "#ec4899"
              },
              children: ["♀ หญิง: ", i.demographics.female || 0]
            })]
          })]
        })]
      }), e.jsxs("div", {
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(14,165,233,.10) 0%, rgba(6,182,212,.05) 100%)",
          border: "1px solid rgba(14,165,233,.25)",
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
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--md-text-tertiary)"
            },
            children: "Avg TAT (30D)"
          }), e.jsx("span", {
            style: {
              fontSize: "18px"
            },
            children: "⏱️"
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
              color: (n?.avg_tat || 0) <= 60 ? "#10b981" : (n?.avg_tat || 0) <= 120 ? "#f59e0b" : "#f43f5e",
              letterSpacing: "-0.03em",
              lineHeight: 1
            },
            children: n?.avg_tat || 0
          }), e.jsx("span", {
            style: {
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: "นาที"
          })]
        }), e.jsx("p", {
          style: {
            margin: "6px 0 0",
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            fontWeight: 600
          },
          children: (n?.avg_tat || 0) <= 60 ? "✅ ภายในเป้าหมาย (<60min)" : "⚠️ เกินเป้าหมาย — ตรวจสอบ Workflow"
        })]
      }), e.jsxs("div", {
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(139,92,246,.10) 0%, rgba(99,102,241,.05) 100%)",
          border: "1px solid rgba(139,92,246,.25)",
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
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--md-text-tertiary)"
            },
            children: "LPI Index"
          }), e.jsx("span", {
            style: {
              fontSize: "18px"
            },
            children: "🎯"
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
              color: (n?.lpi || 0) >= 80 ? "#10b981" : (n?.lpi || 0) >= 60 ? "#f59e0b" : "#f43f5e",
              letterSpacing: "-0.03em",
              lineHeight: 1
            },
            children: n?.lpi || 0
          }), e.jsx("span", {
            style: {
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: "/100"
          })]
        }), e.jsx("p", {
          style: {
            margin: "6px 0 0",
            fontSize: "12px",
            color: "var(--md-text-secondary)",
            fontWeight: 600
          },
          children: (n?.lpi || 0) >= 80 ? "✅ Lab Performance Optimal" : "⚠️ ต้องปรับปรุง — ดู Component Score"
        })]
      })]
    }), e.jsxs(D, {
      name: "AI Lab Intelligence",
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "-4px",
          marginTop: "8px"
        },
        children: [e.jsx("div", {
          style: {
            width: "4px",
            height: "22px",
            background: "linear-gradient(180deg, #0ea5e9, #06b6d4)",
            borderRadius: "99px"
          }
        }), e.jsx("h3", {
          style: {
            margin: 0,
            fontSize: "16px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: "🧠 AI Lab Intelligence (Executive Briefing)"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            background: "rgba(14,165,233,.15)",
            color: l.primary,
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
          gap: "14px"
        },
        children: [e.jsx(z, {
          title: "Lab Performance Index (LPI)",
          icon: "🎯",
          priority: (n?.lpi || 0) >= 80 ? "LOW" : (n?.lpi || 0) >= 60 ? "MEDIUM" : "HIGH",
          summary: "LPI Score: " + (n?.lpi || 0) + "/100" + ((n?.lpi || 0) >= 80 ? " — Optimal Performance" : " — Below Target"),
          analysis: "ดัชนีรวมประสิทธิภาพห้องปฏิบัติการ คำนวณจาก TAT Score (" + (n?.avg_tat || 0) + "m), Completion Rate (" + (n?.completion_rate || 0) + "%), Volume Score — ถ่วงน้ำหนัก TAT(40%) + Completion(35%) + Volume(25%)",
          recommendation: (n?.lpi || 0) >= 80 ? "รักษามาตรฐานและติดตาม Trend ต่อเนื่อง เน้น Reagent Stock Management" : "ตรวจสอบ Component ที่คะแนนต่ำสุดและแก้ไขก่อน — เริ่มจาก TAT Optimization",
          confidence: 96,
          gradient: "#8b5cf6",
          gradientFrom: "rgba(139,92,246,.08)",
          gradientTo: "rgba(99,102,241,.04)",
          borderColor: "rgba(139,92,246,.25)"
        }), e.jsx(z, {
          title: "TAT Optimization & SLA",
          icon: "⏱️",
          priority: (n?.avg_tat || 0) <= 60 ? "LOW" : (n?.avg_tat || 0) <= 120 ? "MEDIUM" : "HIGH",
          summary: "Avg TAT: " + (n?.avg_tat || 0) + "m | P90: " + (n?.p90_tat || 0) + "m | SLA(<60m): " + (n?.tat_sla_pct || 0) + "%",
          analysis: "วิเคราะห์ Turnaround Time ตั้งแต่ Pre-analytical → Analytical → Post-analytical เพื่อหา Bottleneck และเพิ่มประสิทธิภาพ Critical Path",
          recommendation: (n?.avg_tat || 0) <= 60 ? "TAT ดีเยี่ยม — รักษา Workflow ให้ต่อเนื่อง Focus on STAT lane performance" : "TAT สูง — เพิ่ม STAT lane, ตรวจสอบ Analyzer Capacity และ Pre-analytical Delays",
          confidence: 94,
          gradient: "#0ea5e9",
          gradientFrom: "rgba(14,165,233,.08)",
          gradientTo: "rgba(3,102,214,.04)",
          borderColor: "rgba(14,165,233,.25)"
        }), e.jsx(z, {
          title: "Critical Value Alert System",
          icon: "🚨",
          priority: c > 5 ? "HIGH" : c > 0 ? "MEDIUM" : "LOW",
          summary: "Critical Values วันนี้: " + c + " รายการ" + (c > 0 ? " — ต้องรายงานแพทย์ทันที" : " — ไม่มี Critical Values"),
          analysis: "ระบบตรวจจับ Critical Lab Values อัตโนมัติ ครอบคลุม K, Na, Glucose, Hb, Troponin, Lactate, WBC, PLT, Cr, pH ตาม WHO Critical Value Notification Protocol",
          recommendation: c > 0 ? "ตรวจสอบรายการ Critical Values ด้านล่าง และยืนยันว่าแพทย์เจ้าของไข้ได้รับแจ้งแล้วทุกราย" : "ไม่มี Critical Values — ระบบเฝ้าระวังทำงานปกติ",
          confidence: 99,
          gradient: "#f43f5e",
          gradientFrom: "rgba(244,63,94,.08)",
          gradientTo: "rgba(239,68,68,.04)",
          borderColor: "rgba(244,63,94,.25)"
        }), e.jsx(z, {
          title: "Operational Analysis & Workload",
          icon: "⚙️",
          priority: (i.pending || 0) > 50 ? "HIGH" : (i.pending || 0) > 20 ? "MEDIUM" : "LOW",
          summary: "Orders: " + (i.total_orders || 0) + " | Items: " + (i.total_items || 0) + " | Pending: " + (i.pending || 0) + " | Staff: " + I,
          analysis: "วิเคราะห์ปริมาณงานตรวจ, ความสมดุลระหว่าง Demand vs Capacity, Abnormal Rate " + k + "% และ Staff Utilization เพื่อปรับ Workload Distribution",
          recommendation: (i.pending || 0) > 50 ? "Pending สูง — เพิ่มกำลังคนหรือปรับ Priority Queue ทันที" : "Workload สมดุล — ติดตาม Peak Hours สำหรับ Resource Planning",
          confidence: 91,
          gradient: "#10b981",
          gradientFrom: "rgba(16,185,129,.08)",
          gradientTo: "rgba(5,150,105,.04)",
          borderColor: "rgba(16,185,129,.25)"
        })]
      })]
    }), i.critical_values?.length > 0 && e.jsxs(e.Fragment, {
      children: [e.jsxs("div", {
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
            background: "linear-gradient(180deg, #f43f5e, #f97316)",
            borderRadius: "99px"
          }
        }), e.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: "🚨 Critical Lab Values — ต้องรายงานแพทย์ทันที"
        }), e.jsxs("span", {
          style: {
            fontSize: "12px",
            color: "#f43f5e",
            fontWeight: 800,
            background: "rgba(244,63,94,.1)",
            padding: "2px 10px",
            borderRadius: "99px"
          },
          children: [i.critical_values.length, " รายการ"]
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "0",
          overflow: "hidden",
          border: "1.5px solid rgba(244,63,94,.25)"
        },
        children: [e.jsxs("div", {
          style: {
            padding: "12px 20px",
            background: "linear-gradient(90deg, rgba(244,63,94,.08), transparent)",
            borderBottom: "1px solid rgba(244,63,94,.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "20px"
              },
              children: "🔴"
            }), e.jsxs("div", {
              children: [e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#f43f5e"
                },
                children: "Critical Value Notification Protocol"
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "11px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "WHO Critical Value Reporting · Auto-detected from HOSxP XE"
              })]
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              gap: "8px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "4px",
                background: "rgba(244,63,94,.1)",
                color: "#f43f5e"
              },
              children: "DANGER"
            }), e.jsx("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "4px",
                background: "rgba(245,158,11,.1)",
                color: "#f59e0b"
              },
              children: "WARNING"
            }), e.jsx("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "4px",
                background: "rgba(16,185,129,.1)",
                color: "#10b981"
              },
              children: "NORMAL"
            })]
          })]
        }), e.jsx("div", {
          style: {
            padding: "12px 16px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "10px"
          },
          children: i.critical_values.map((t, a) => {
            const s = t.severity || "WARNING",
              o = s === "DANGER" ? "#f43f5e" : s === "WARNING" ? "#f59e0b" : xe(t.test_name || t.test, t.latest_value || t.result),
              d = s === "DANGER";
            return e.jsxs("div", {
              style: {
                padding: "12px 14px",
                borderRadius: "12px",
                background: o + "08",
                border: "1.5px solid " + o + (d ? "40" : "25"),
                position: "relative",
                overflow: "hidden"
              },
              children: [d && e.jsx("div", {
                style: {
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "40px",
                  height: "40px",
                  background: "radial-gradient(circle at top right, " + o + "20, transparent 70%)",
                  pointerEvents: "none"
                }
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                },
                children: [e.jsxs("div", {
                  children: [e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "13px",
                      fontWeight: 800,
                      color: o
                    },
                    children: t.test_name || t.test
                  }), e.jsxs("p", {
                    style: {
                      margin: "2px 0 0",
                      fontSize: "18px",
                      fontWeight: 950,
                      color: "var(--md-text-primary)"
                    },
                    children: [t.latest_value || t.result, e.jsx("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--md-text-tertiary)",
                        marginLeft: "4px"
                      },
                      children: V[t.test_name || t.test]?.unit || ""
                    })]
                  })]
                }), e.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: o + "20",
                    color: o
                  },
                  children: s
                })]
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "6px"
                },
                children: [t.patient_count != null && e.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: [t.patient_count, " patient", t.patient_count > 1 ? "s" : ""]
                }), t.hn && e.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: ["HN: ", t.hn]
                }), t.normal && e.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: ["Ref: ", t.normal]
                })]
              })]
            }, a)
          })
        })]
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
          background: "linear-gradient(180deg, " + l.primary + ", " + l.accent + ")",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)"
        },
        children: "🧫 นักเทคนิคการแพทย์ที่ปฏิบัติหน้าที่วันนี้ (On-Duty)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: l.light,
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP Activity Logs"
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "0",
          overflow: "hidden"
        },
        children: [e.jsxs("div", {
          style: {
            padding: "12px 16px",
            background: l.light,
            borderBottom: "1px solid " + l.border,
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
              children: "🔬"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: l.primary
              },
              children: "Lab Staff (Today Activity)"
            })]
          }), e.jsxs("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: l.primary
            },
            children: [i.on_duty?.length || 0, " คน"]
          })]
        }), e.jsx("div", {
          style: {
            padding: "8px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "4px",
            maxHeight: "240px",
            overflowY: "auto"
          },
          className: "custom-scrollbar",
          children: i.on_duty?.length > 0 ? i.on_duty.map((t, a) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 10px",
              borderRadius: "10px",
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [e.jsxs("div", {
              style: {
                width: "28px",
                height: "28px",
                borderRadius: "7px",
                flexShrink: 0,
                background: "linear-gradient(135deg, " + l.primary + ", " + l.accent + ")",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              },
              children: [(t.name || t.username || "").substring(0, 1).toUpperCase() || "L", e.jsx("span", {
                style: {
                  position: "absolute",
                  bottom: "-1px",
                  right: "-1px",
                  width: "7px",
                  height: "7px",
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
                children: t.name || t.username
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: ["Login: ", t.login || "—"]
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
                  color: l.primary
                },
                children: t.report_count || 0
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "8px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "ผล"
              })]
            })]
          }, a)) : e.jsx("div", {
            style: {
              gridColumn: "1/-1",
              padding: "2rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)",
              fontSize: "12px"
            },
            children: "ไม่พบข้อมูลเจ้าหน้าที่จาก Today API"
          })
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "0",
          overflow: "hidden"
        },
        children: [e.jsxs("div", {
          style: {
            padding: "12px 16px",
            background: "rgba(139,92,246,.05)",
            borderBottom: "1px solid rgba(139,92,246,.1)",
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
              children: "🧪"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#8b5cf6"
              },
              children: "Lab Staff (Analytics / Shift)"
            })]
          }), e.jsxs("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#8b5cf6"
            },
            children: [n?.on_duty?.staff?.length || 0, " คน"]
          })]
        }), e.jsx("div", {
          style: {
            padding: "8px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "4px",
            maxHeight: "240px",
            overflowY: "auto"
          },
          className: "custom-scrollbar",
          children: x.labAnalytics ? Array(4).fill(0).map((t, a) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              borderRadius: "10px"
            }
          }, a)) : n?.on_duty?.staff?.length > 0 ? n.on_duty.staff.map((t, a) => {
            const s = new Date().getHours(),
              o = s < 12 && t.morning_count > 0 || s >= 12 && s < 17 && t.afternoon_count > 0 || s >= 17 && t.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 10px",
                borderRadius: "10px",
                background: "var(--md-surface)",
                border: "1px solid var(--md-border)"
              },
              children: [e.jsxs("div", {
                style: {
                  width: "28px",
                  height: "28px",
                  borderRadius: "7px",
                  flexShrink: 0,
                  background: o ? "linear-gradient(135deg, #8b5cf6, #6366f1)" : "rgba(0,0,0,0.05)",
                  color: o ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.username?.substring(0, 1)?.toUpperCase() || "L", o && e.jsx("span", {
                  style: {
                    position: "absolute",
                    bottom: "-1px",
                    right: "-1px",
                    width: "7px",
                    height: "7px",
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
                  children: t.username
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "2px",
                    marginTop: "2px"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.morning_count > 0 ? "#8b5cf6" : "#ccc"
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
                    color: "#8b5cf6"
                  },
                  children: t.total_count
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "ผล"
                })]
              })]
            }, a)
          }) : e.jsx("div", {
            style: {
              gridColumn: "1/-1",
              padding: "2rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)",
              fontSize: "12px"
            },
            children: "ไม่พบข้อมูลนักเทคนิคการแพทย์วันนี้"
          })
        })]
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: "16px"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "20px"
        },
        children: [e.jsxs("p", {
          style: {
            fontSize: "15px",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          children: [e.jsx("span", {
            style: {
              background: l.primary,
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "12px"
            },
            children: "ST-01"
          }), "Strategic Indicators"]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px"
          },
          children: p.strategicKPIs.map((t, a) => e.jsxs("div", {
            style: {
              padding: "14px 10px",
              borderRadius: "16px",
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              textAlign: "center"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "22px",
                marginBottom: "6px"
              },
              children: t.icon
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "18px",
                fontWeight: 950,
                color: t.color
              },
              children: t.value
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase",
                marginTop: "2px"
              },
              children: t.label
            })]
          }, a))
        }), _.length > 0 && e.jsxs("div", {
          style: {
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--md-border)"
          },
          children: [e.jsx("p", {
            style: {
              margin: "0 0 8px",
              fontSize: "12px",
              fontWeight: 800,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase"
            },
            children: "TAT Distribution (30D)"
          }), e.jsx("div", {
            style: {
              height: "120px"
            },
            children: e.jsx(A, {
              width: "100%",
              height: "100%",
              children: e.jsxs(se, {
                children: [e.jsx(le, {
                  data: _,
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 30,
                  outerRadius: 50,
                  dataKey: "value",
                  nameKey: "name",
                  children: _.map((t, a) => e.jsx(B, {
                    fill: S[a % S.length]
                  }, a))
                }), e.jsx(W, {
                  contentStyle: {
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    padding: "8px 12px",
                    fontSize: "12px"
                  }
                })]
              })
            })
          }), e.jsx("div", {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              marginTop: "4px"
            },
            children: _.map((t, a) => e.jsxs("span", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: "4px",
                background: S[a % S.length] + "20",
                color: S[a % S.length]
              },
              children: [t.name, ": ", t.value]
            }, a))
          })]
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "20px",
          borderLeft: "5px solid " + p.urgencyColor
        },
        children: [e.jsxs("p", {
          style: {
            fontSize: "15px",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          children: [e.jsx("span", {
            style: {
              background: p.urgencyColor,
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "12px"
            },
            children: "AI-DX"
          }), "Problem Discovery & Root-Cause Analysis"]
        }), e.jsx("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          },
          children: p.problems.length > 0 ? p.problems.map((t, a) => e.jsxs("div", {
            style: {
              borderRadius: "14px",
              border: "1.5px solid " + t.color + "20",
              background: t.color + "04",
              overflow: "hidden"
            },
            children: [e.jsxs("div", {
              style: {
                padding: "10px 16px",
                borderBottom: "1px solid " + t.color + "15",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(90deg, " + t.color + "10, transparent)"
              },
              children: [e.jsx("span", {
                style: {
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: t.color,
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                },
                children: t.priority
              }), e.jsx("span", {
                style: {
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "var(--md-text-primary)"
                },
                children: t.title
              })]
            }), e.jsxs("div", {
              style: {
                padding: "12px 16px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "10px"
              },
              children: [e.jsxs("div", {
                style: {
                  padding: "10px",
                  borderRadius: "10px",
                  background: "rgba(244,63,94,.03)",
                  borderLeft: "3px solid #f43f5e"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: "0 0 4px",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#f43f5e",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  },
                  children: "Root Cause"
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    lineHeight: 1.6,
                    fontWeight: 500
                  },
                  children: t.rootCause
                })]
              }), e.jsxs("div", {
                style: {
                  padding: "10px",
                  borderRadius: "10px",
                  background: "rgba(245,158,11,.03)",
                  borderLeft: "3px solid #f59e0b"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: "0 0 4px",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#f59e0b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  },
                  children: "Cascade Effect"
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    lineHeight: 1.6,
                    fontWeight: 500
                  },
                  children: t.cascadeEffect
                })]
              }), e.jsxs("div", {
                style: {
                  padding: "10px",
                  borderRadius: "10px",
                  background: "rgba(124,58,237,.04)",
                  borderLeft: "3px solid #7c3aed"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: "0 0 4px",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#7c3aed",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  },
                  children: "AI Recommendation"
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    lineHeight: 1.6,
                    fontWeight: 500
                  },
                  children: t.fixFirst
                })]
              })]
            })]
          }, a)) : e.jsxs("div", {
            style: {
              textAlign: "center",
              padding: "3rem",
              color: "var(--md-text-tertiary)",
              background: "rgba(16,185,129,0.03)",
              borderRadius: "16px",
              border: "1px dashed #10b98140"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "32px",
                marginBottom: "10px"
              },
              children: "✨"
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontWeight: 700,
                color: "#10b981"
              },
              children: "High Performance Mode"
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "13px"
              },
              children: "ตัวบ่งชี้ทุกตัวอยู่ในเกณฑ์มาตรฐานคุณภาพ"
            })]
          })
        })]
      })]
    }), n && (() => {
      const t = n,
        a = t.avg_tat ?? 0,
        s = t.p90_tat ?? 0,
        o = t.lpi ?? 0,
        d = t.completion_rate ?? 0,
        h = t.abnormal_rate ?? 0;
      t.tat_sla_pct;
      const y = new Date().toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short"
      });
      return e.jsx(ne, {
        kpis: [{
          label: "Average TAT",
          thLabel: "ระยะเวลาตรวจเฉลี่ย (Turnaround Time)",
          value: a + "m",
          color: a <= 60 ? "#10b981" : a <= 120 ? "#f59e0b" : "#f43f5e",
          icon: "⏱️",
          sub: a <= 60 ? "ดีเยี่ยม" : a <= 120 ? "ปานกลาง" : "วิกฤต",
          desc: "ระยะเวลาเฉลี่ยจากสั่งตรวจถึงรายงานผล: " + a + " นาที",
          meaning: "Turnaround Time (TAT) วัดจากเวลาสั่งตรวจ (order_time) ถึงเวลารายงานผล (report_time) สะท้อนประสิทธิภาพกระบวนการ Pre-analytical -> Analytical -> Post-analytical",
          calc: "TIMESTAMPDIFF(MINUTE, order_datetime, report_datetime) — Mean ของทุก completed orders 30D",
          dataSource: "lab_head (HOSxP XE)",
          period: "30 วันย้อนหลัง ถึง " + y,
          target: "<= 60 นาที (routine)",
          benchmark: "ISO 15189: <=60min | Routine: <=2hr | Stat: <=30min",
          aiTip: a <= 60 ? "TAT ดี — รักษา Workflow ให้ต่อเนื่อง" : "TAT สูง — ตรวจสอบ Pre-analytical Phase และ Analyzer Capacity"
        }, {
          label: "P90 TAT",
          thLabel: "ระยะเวลาตรวจ Percentile 90",
          value: s + "m",
          color: s <= 120 ? "#10b981" : s <= 240 ? "#f59e0b" : "#f43f5e",
          icon: "⚡",
          sub: s <= 120 ? "ดีเยี่ยม" : s <= 240 ? "ปานกลาง" : "วิกฤต",
          desc: "90% ของ Lab orders ได้ผลภายใน " + s + " นาที",
          meaning: "P90 TAT สะท้อนกรณี worst-case ที่ผู้ป่วย 10% ต้องรอนานสุด ช่วยประเมิน Outlier ที่อาจเกิดจาก QC Failure หรือ STAT Override",
          calc: "Mean + 1.28 x SD_TAT (approximation of 90th percentile)",
          dataSource: "lab_head (HOSxP XE)",
          period: "30 วันย้อนหลัง",
          target: "<= 120 นาที",
          benchmark: "Routine: <=2hr P90 | Urgent: <=1hr P90",
          aiTip: s <= 120 ? "P90 TAT ดี — ไม่มี Outlier รุนแรง" : "P90 สูง — ตรวจสอบ QC Failures และ Reagent Shortage Events"
        }, {
          label: "Completion Rate",
          thLabel: "อัตราความสมบูรณ์ผลตรวจ",
          value: d + "%",
          color: d >= 95 ? "#10b981" : d >= 85 ? "#f59e0b" : "#f43f5e",
          icon: "✅",
          sub: d >= 95 ? "ดีมาก" : d >= 85 ? "ปานกลาง" : "ต้องปรับปรุง",
          desc: d + "% ของ Lab orders มีผลรายงานสมบูรณ์",
          meaning: "สัดส่วน Lab orders ที่มีผลตรวจสมบูรณ์ (report_date IS NOT NULL) สะท้อน LIS Interface Reliability และ Pre-analytical rejection rate",
          calc: "(Orders with report_date / Total orders) x 100",
          dataSource: "lab_head (HOSxP XE)",
          period: "30 วันย้อนหลัง",
          target: ">= 95%",
          benchmark: "ISO 15189: >=95% | Accredited Lab: >=98%",
          aiTip: d >= 95 ? "Completion สูง — LIS Interface ทำงานดี" : "Completion ต่ำ — ตรวจสอบ Sample Rejection และ Interface Error Logs"
        }, {
          label: "Abnormal Rate",
          thLabel: "อัตราผลตรวจผิดปกติ",
          value: h + "%",
          color: "#8b5cf6",
          icon: "📊",
          sub: "ผล Abnormal",
          desc: h + "% ของ Lab items มีผลผิดปกติ (30D)",
          meaning: "สัดส่วนผล Lab ที่อยู่นอกช่วงปกติ (abnormal_result = Y) สะท้อน Case Mix ความรุนแรงของผู้ป่วยและ Quality Control",
          calc: "(Abnormal items / Total items) x 100",
          dataSource: "lab_order (HOSxP XE)",
          period: "30 วันย้อนหลัง",
          target: "ขึ้นอยู่กับ Case Mix",
          benchmark: "General hospital: 15-25% | ICU-heavy: 30-40%",
          aiTip: "ติดตาม Trend ถ้า Abnormal Rate เพิ่มขึ้นอย่างรวดเร็ว อาจบ่งชี้ปัญหา QC หรือ Population Change"
        }, {
          label: "LPI Score",
          thLabel: "ดัชนีประสิทธิภาพห้องปฏิบัติการ",
          value: "" + o,
          color: o >= 80 ? "#10b981" : o >= 60 ? "#f59e0b" : "#f43f5e",
          icon: "🎯",
          sub: o >= 80 ? "Optimal" : o >= 60 ? "Fair" : "Critical",
          desc: "Lab Performance Index: " + o + "/100",
          meaning: "ดัชนีรวมประสิทธิภาพห้องปฏิบัติการ คำนวณจาก TAT Score + Completion Rate + Volume Score สะท้อนประสิทธิภาพโดยรวม",
          calc: "TAT(40%) + Completion(35%) + Volume(25%)",
          dataSource: "AI Composite (HOSxP XE)",
          period: "ประมวลผล " + y,
          target: ">= 80",
          benchmark: "BCH Internal >=75 | Excellence >=85",
          aiTip: o >= 80 ? "LPI สูง — ห้องปฏิบัติการทำงานได้ดีรอบด้าน" : "LPI ต่ำ — ดู Component ที่คะแนนต่ำสุดและแก้ไขก่อน"
        }]
      })
    })(), e.jsxs("div", {
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
          background: "linear-gradient(180deg, " + l.primary + ", #8b5cf6)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)"
        },
        children: "🧪 Top Lab Tests Analysis (30D)"
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
        children: [e.jsxs("p", {
          style: {
            margin: "0 0 16px",
            fontSize: "15px",
            fontWeight: 900,
            color: "var(--md-text-primary)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          children: [e.jsx("span", {
            style: {
              background: l.primary,
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 800
            },
            children: "VOL"
          }), "Top 10 การตรวจ — ปริมาณสูงสุด"]
        }), e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "5px"
          },
          children: [(n?.top_tests_by_volume || i.top_tests || []).slice(0, 10).map((t, a) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 10px",
              background: "var(--md-surface)",
              borderRadius: "9px",
              border: "1px solid var(--md-border)"
            },
            children: [e.jsx("div", {
              style: {
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: l.light,
                color: l.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "10px",
                flexShrink: 0
              },
              children: a + 1
            }), e.jsx("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                },
                children: t.name || t.test_name
              })
            }), e.jsxs("div", {
              style: {
                textAlign: "right",
                flexShrink: 0,
                display: "flex",
                gap: "8px",
                alignItems: "center"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: l.primary
                },
                children: t.count?.toLocaleString()
              }), t.abnormal_rate > 0 && e.jsxs("span", {
                style: {
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "1px 5px",
                  borderRadius: "4px",
                  background: t.abnormal_rate > 30 ? "rgba(244,63,94,0.12)" : "rgba(245,158,11,0.12)",
                  color: t.abnormal_rate > 30 ? "#f43f5e" : "#d97706"
                },
                children: [t.abnormal_rate, "%"]
              })]
            })]
          }, a)), !(n?.top_tests_by_volume || i.top_tests)?.length && !x.labAnalytics && e.jsx("div", {
            style: {
              padding: "2rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)",
              fontSize: "12px"
            },
            children: "ไม่มีข้อมูล"
          })]
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "24px"
        },
        children: [e.jsxs("p", {
          style: {
            margin: "0 0 16px",
            fontSize: "15px",
            fontWeight: 900,
            color: "var(--md-text-primary)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          children: [e.jsx("span", {
            style: {
              background: "#f43f5e",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 800
            },
            children: "ABN"
          }), "Top 10 การตรวจ — Abnormal Rate สูงสุด"]
        }), e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "5px"
          },
          children: [(n?.top_tests_by_abnormal || []).slice(0, 10).map((t, a) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 10px",
              background: "var(--md-surface)",
              borderRadius: "9px",
              border: "1px solid var(--md-border)"
            },
            children: [e.jsx("div", {
              style: {
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "rgba(244,63,94,0.08)",
                color: "#f43f5e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "10px",
                flexShrink: 0
              },
              children: a + 1
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
                children: t.name
              }), e.jsx("div", {
                style: {
                  height: "3px",
                  background: "rgba(0,0,0,0.05)",
                  borderRadius: "2px",
                  marginTop: "3px"
                },
                children: e.jsx("div", {
                  style: {
                    height: "100%",
                    borderRadius: "2px",
                    background: t.abnormal_rate > 50 ? "#f43f5e" : t.abnormal_rate > 30 ? "#f59e0b" : "#10b981",
                    width: Math.min(100, t.abnormal_rate) + "%"
                  }
                })
              })]
            }), e.jsxs("div", {
              style: {
                textAlign: "right",
                flexShrink: 0
              },
              children: [e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 900,
                  color: t.abnormal_rate > 50 ? "#f43f5e" : t.abnormal_rate > 30 ? "#f59e0b" : "#10b981"
                },
                children: [t.abnormal_rate, "%"]
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: [t.count, " ครั้ง"]
              })]
            })]
          }, a)), !n?.top_tests_by_abnormal?.length && !x.labAnalytics && e.jsx("div", {
            style: {
              padding: "2rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)",
              fontSize: "12px"
            },
            children: "ไม่มีข้อมูล"
          })]
        })]
      })]
    }), R.length > 0 && e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "24px"
      },
      children: [e.jsx("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px"
        },
        children: e.jsxs("div", {
          children: [e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "16px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: "🕐 Hourly Lab Order Distribution (Today)"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: "ปริมาณ Lab Orders แยกตามชั่วโมง — ระบุ Peak Hours สำหรับ Resource Allocation"
          })]
        })
      }), e.jsx("div", {
        style: {
          height: "180px",
          width: "100%"
        },
        children: e.jsx(A, {
          width: "100%",
          height: "100%",
          children: e.jsxs(M, {
            data: R,
            children: [e.jsx(E, {
              strokeDasharray: "3 3",
              vertical: !1,
              stroke: "rgba(0,0,0,0.05)"
            }), e.jsx(H, {
              dataKey: "hour",
              tick: {
                fontSize: 9,
                fontWeight: 700,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(F, {
              tick: {
                fontSize: 10,
                fontWeight: 600,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(W, {
              contentStyle: {
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                padding: "8px 12px",
                fontSize: "12px"
              }
            }), e.jsx(G, {
              dataKey: "count",
              name: "Orders",
              radius: [4, 4, 0, 0],
              children: R.map((t, a) => e.jsx(B, {
                fill: t.count >= 50 ? "#f43f5e" : t.count >= 30 ? "#f59e0b" : l.primary
              }, a))
            })]
          })
        })
      })]
    }), N.length > 0 && e.jsxs("div", {
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
        children: "📈 Lab Order Volume Trend (6 เดือนย้อนหลัง)"
      }), e.jsx("div", {
        style: {
          height: "240px",
          width: "100%"
        },
        children: e.jsx(A, {
          width: "100%",
          height: "100%",
          children: e.jsxs(de, {
            data: N,
            margin: {
              top: 10,
              right: 10,
              left: -10,
              bottom: 0
            },
            children: [e.jsx(E, {
              strokeDasharray: "3 3",
              vertical: !1,
              stroke: "rgba(0,0,0,0.05)"
            }), e.jsx(H, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fontWeight: 700,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(F, {
              tick: {
                fontSize: 10,
                fontWeight: 600,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(W, {
              contentStyle: {
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                padding: "12px"
              }
            }), e.jsx(pe, {
              type: "monotone",
              dataKey: "orders",
              name: "Orders",
              fill: "rgba(14,165,233,.08)",
              stroke: l.primary,
              strokeWidth: 2.5,
              dot: {
                fill: l.primary,
                strokeWidth: 0,
                r: 4
              }
            }), e.jsx(ce, {
              type: "monotone",
              dataKey: "abnormal",
              name: "Abnormal",
              stroke: "#f43f5e",
              strokeWidth: 2,
              strokeDasharray: "4 2",
              dot: {
                fill: "#f43f5e",
                strokeWidth: 0,
                r: 3
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
          background: "linear-gradient(180deg, " + l.primary + ", #0284c7)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💰 รายได้ Lab ประจำปีงบประมาณ"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: l.light,
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP XE Data Intelligence"
      })]
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: x.labRevenueFiscal ? e.jsx("div", {
        className: "skeleton",
        style: {
          height: "300px",
          width: "100%",
          borderRadius: "12px"
        }
      }) : f?.fiscal_years ? (() => {
        const t = f.fiscal_years,
          a = ["#94a3b8", "#38bdf8", "#0ea5e9"];
        return e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem"
          },
          children: [e.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(" + Math.min(t.length, 3) + ", 1fr)",
              gap: "12px"
            },
            children: t.slice(-3).map((s, o) => e.jsxs("div", {
              style: {
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid " + a[o] + "20",
                background: a[o] + "05"
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
                    background: a[o]
                  }
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: a[o]
                  },
                  children: s.fiscal_label
                })]
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 900,
                  color: a[o]
                },
                children: [(s.total_revenue / 1e3).toFixed(1), "K"]
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)"
                },
                children: "orders"
              })]
            }, o))
          }), e.jsx("div", {
            style: {
              height: "280px",
              width: "100%"
            },
            children: e.jsx(A, {
              width: "100%",
              height: "100%",
              children: e.jsxs(M, {
                data: K,
                margin: {
                  top: 10,
                  right: 10,
                  left: -10,
                  bottom: 0
                },
                children: [e.jsx("defs", {
                  children: e.jsxs("linearGradient", {
                    id: "labBarGrad",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [e.jsx("stop", {
                      offset: "0%",
                      stopColor: "#0ea5e9",
                      stopOpacity: 1
                    }), e.jsx("stop", {
                      offset: "100%",
                      stopColor: "#06b6d4",
                      stopOpacity: 1
                    })]
                  })
                }), e.jsx(E, {
                  strokeDasharray: "3 3",
                  vertical: !1,
                  stroke: "rgba(0,0,0,0.05)"
                }), e.jsx(H, {
                  dataKey: "month",
                  tick: {
                    fontSize: 11,
                    fontWeight: 700,
                    fill: "var(--md-text-tertiary)"
                  },
                  axisLine: !1,
                  tickLine: !1
                }), e.jsx(F, {
                  tick: {
                    fontSize: 10,
                    fontWeight: 600,
                    fill: "var(--md-text-tertiary)"
                  },
                  axisLine: !1,
                  tickLine: !1
                }), e.jsx(W, {
                  contentStyle: {
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                    padding: "12px"
                  }
                }), f.fiscal_years.map((s, o) => {
                  const d = o === f.fiscal_years.length - 1;
                  return e.jsx(G, {
                    dataKey: "fy" + o,
                    name: s.fiscal_label,
                    fill: d ? "url(#labBarGrad)" : "#cbd5e1",
                    radius: [6, 6, 0, 0],
                    barSize: d ? 28 : 20,
                    opacity: d ? 1 : .5
                  }, o)
                })]
              })
            })
          })]
        })
      })() : e.jsx("div", {
        style: {
          height: "280px",
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
            children: x.labRevenueFiscal ? "Loading fiscal data..." : "Data Stream Offline"
          })]
        })
      })
    }), e.jsx(D, {
      name: "AI Server Insights",
      children: e.jsx(oe, {
        data: r.labAI,
        theme: "lab",
        title: "AI Laboratory Intelligence"
      })
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
        children: "BCH Lab Intelligence · Protocol v10.4 · High Fidelity Analytics"
      })
    })]
  })
}
const ye = J.memo(ge);
export {
  ye as
  default
};