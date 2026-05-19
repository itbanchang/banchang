import {
  R as N,
  r as _,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  b as E,
  a as G,
  E as Y,
  m as K,
  S as W,
  M as X,
  g as v,
  K as V,
  h as U
} from "./shared-ui-OVDEF1.js";
import {
  K as w
} from "./index-DK7pcb85.js";
import {
  R,
  c as I,
  a as T,
  X as k,
  Y as C,
  T as A,
  B as D
} from "./vendor-charts-C5q2M-g3.js";

function q() {
  const m = E(t => ({
      dentalToday: t.dentalToday,
      dentalAnalytics: t.dentalAnalytics,
      dentalRevenueFiscal: t.dentalRevenueFiscal,
      dentalAI: t.dentalAI,
      loading: t.loading
    })),
    {
      fetchData: f
    } = G(),
    i = m.dentalToday || {},
    a = m.dentalAnalytics,
    c = m.dentalRevenueFiscal,
    p = m.loading || {};
  _.useEffect(() => {
    !i.total && !p.dentalToday && f("dentalToday", "/api/dental/today"), !a && !p.dentalAnalytics && f("dentalAnalytics", "/api/dental/analytics"), !c && !p.dentalRevenueFiscal && f("dentalRevenueFiscal", "/api/dental/revenue-fiscal");
    const t = setTimeout(() => f("dentalAI", "/api/ai/dental/optimization"), 300);
    return () => clearTimeout(t)
  }, [f]);
  const n = _.useMemo(() => {
      const t = {
        problems: [],
        urgencyScore: 0,
        urgencyColor: "#10b981",
        urgencyLabel: "ปกติ",
        latestFY: {
          fiscal_label: "FY"
        },
        yoyGrowth: 0,
        strategicKPIs: [],
        benchmarks: {}
      };
      if (!a) return t;
      const r = a,
        o = r.completion_rate ?? 0;
      r.revisit_rate;
      const s = r.avg_wait_time ?? 0,
        d = r.median_wait_time ?? 0,
        l = r.p90_wait_time ?? 0,
        g = r.avg_revenue_per_visit ?? 0,
        x = [];
      if (l > 60 && x.push({
          priority: 1,
          severity: "critical",
          color: "#f43f5e",
          title: `🔴 ประสบการณ์ผู้ป่วยแย่ (P90: ${l}m)`,
          rootCause: "ผู้ป่วย 10% รอนานกว่า 1 ชม. แสดงถึงปัญหาระบบคัดกรองหรือกำลังคนไม่พอในช่วงพีค",
          fixFirst: "เกลี่ยคิวนัดหมาย (Load Balancing) ย้ายเคสเร่งด่วนไปช่วงก่อน 10:00"
        }), s > 30 && x.push({
          priority: 2,
          severity: "warning",
          color: "#f59e0b",
          title: `🟡 เวลารอเฉลี่ยตึงตัว: ${s}m`,
          rootCause: `ค่าเฉลี่ยสูงกว่าเป้าหมาย 30 นาที (Median: ${d}m)`,
          fixFirst: "ตรวจสอบคอขวดขั้นตอนการเตรียมเครื่องมือและอุปกรณ์"
        }), o < 85 && x.push({
          priority: 3,
          severity: "warning",
          color: "#f59e0b",
          title: `🟡 ประสิทธิภาพการปิดเคส: ${o}%`,
          rootCause: `มีผู้ป่วย Dropout ${r.dropout_count||0} รายในเดือนนี้`,
          fixFirst: "ปรับปรุงระบบติดตามผ่าน LINE/SMS และแจ้งแผนการรักษาระยะยาว"
        }), r.peak_hour && r.peak_hour.avg > 10 && l > 45 && x.push({
          priority: 4,
          severity: "info",
          color: "#8b5cf6",
          title: `💡 พบการกระจุกตัวช่วง ${r.peak_hour.label} (Peak Hour)`,
          rootCause: `มีผู้ป่วยสูงถึง ${r.peak_hour.avg} เคส/ชม. (เฉลี่ย) ทำให้คิวล้นและอุปกรณ์เก้าอี้ไม่เพียงพอ`,
          fixFirst: "เกลี่ยคิว (Load Balancing) ย้ายกลุ่มขูดหินปูนไปลงช่วงที่ว่างกว่า เพื่อลดคอขวด"
        }), r.top_diagnoses && r.top_diagnoses.length > 0) {
        const h = [...r.top_diagnoses].sort((O, H) => (H.avg_rev || 0) - (O.avg_rev || 0))[0];
        h && h.avg_rev > 1200 && x.push({
          priority: 5,
          severity: "good",
          color: "#10b981",
          title: `💎 หัตถการทำมูลค่าสูงสุด: ${h.name||h.icd10}`,
          rootCause: `สร้างรายได้เฉลี่ย ฿${h.avg_rev.toLocaleString()}/ครั้ง ซึ่งสูงกว่าหัตถการอื่นๆ อย่างมีนัยสำคัญ`,
          fixFirst: "ควรทำการตลาดเพิ่มในกลุ่มหัตถการนี้ และเติมสล็อตคิวในช่วงเวลา Low-peak"
        })
      }
      const z = r.total_visits > 0 ? Math.round(r.children_total / r.total_visits * 100) : 0;
      z > 25 && x.push({
        priority: 6,
        severity: "info",
        color: "#0ea5e9",
        title: `👧 โอกาสทอง: กลุ่มทันตกรรมเด็กสูงถึง ${z}%`,
        rootCause: "ผู้ที่มีอายุต่ำกว่า 12 ปี เข้ามารับบริการเป็นสัดส่วนมาก อาจใช้เวลาจัดการนานกว่าปกติ",
        fixFirst: "พิจารณาใช้ทันตแพทย์เฉพาะทางเด็ก (Pedodontist) เพื่อจัดการเคสได้เร็วและลดความเครียดผู้ป่วย"
      });
      const u = c?.fiscal_years || [],
        b = u[u.length - 1] || {
          fiscal_label: "FY"
        },
        j = u[u.length - 2],
        P = b.comparable_revenue || b.total_revenue || 0,
        S = j && (j.comparable_revenue || j.total_revenue) || 0,
        L = S > 0 ? (P - S) / S * 100 : 0,
        M = [{
          label: "P90 Wait",
          value: `${l}m`,
          color: l < 45 ? "#10b981" : l < 75 ? "#f59e0b" : "#f43f5e",
          icon: "⚡"
        }, {
          label: "Wait SLA",
          value: `${r.wait_sla_pct??0}%`,
          color: (r.wait_sla_pct ?? 0) > 85 ? "#10b981" : "#f59e0b",
          icon: "⏱️"
        }, {
          label: "Completion",
          value: `${o}%`,
          color: o > 90 ? "#10b981" : "#f59e0b",
          icon: "✅"
        }, {
          label: "Rev/Visit",
          value: `฿${g.toLocaleString()}`,
          color: "#8b5cf6",
          icon: "💰"
        }],
        F = x.filter(h => h.severity === "critical").length,
        B = x.filter(h => h.severity === "warning").length,
        y = Math.min(10, F * 3 + B * 1.5);
      return {
        problems: x,
        urgencyScore: y,
        urgencyColor: y >= 7 ? "#f43f5e" : y >= 4 ? "#f59e0b" : "#10b981",
        urgencyLabel: y >= 7 ? "วิกฤต" : y >= 4 ? "เฝ้าระวัง" : "ปกติ",
        latestFY: b,
        yoyGrowth: L,
        strategicKPIs: M,
        benchmarks: {
          medianWait: d,
          p90Wait: l
        }
      }
    }, [a, c]),
    $ = _.useMemo(() => {
      if (!c?.fiscal_years) return [];
      const t = c.fiscal_years;
      return ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((o, s) => {
        const d = {
          month: o
        };
        return t.forEach((l, g) => {
          d[`fy${g}`] = l.months && l.months[s] ? l.months[s].revenue : 0
        }), d
      })
    }, [c]);
  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    children: [e.jsx(Y, {
      title: "AI Executive Quick Summary — ทันตกรรม",
      subtitle: "Cases · Completion · Wait · Revenue/Visit",
      badge: "📐 Quick Summary",
      accentColor: "#f59e0b",
      headerGradient: "linear-gradient(135deg, rgba(245,158,11,.10), rgba(251,146,60,.05))",
      narrative: K(m)
    }), e.jsx(W, {
      name: "AI Intelligence Feed",
      children: e.jsxs("div", {
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
            borderLeft: `5px solid ${n.urgencyColor}`,
            background: `linear-gradient(90deg, ${n.urgencyColor}10 0%, transparent 100%)`
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
                  color: n.urgencyColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                },
                children: "AI Operational Diagnostics"
              }), e.jsx("span", {
                style: {
                  padding: "2px 8px",
                  borderRadius: "4px",
                  background: n.urgencyColor,
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 900
                },
                children: n.urgencyLabel
              })]
            }), e.jsx("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--md-text-primary)"
              },
              children: p.dentalAnalytics ? "กำลังประมวลผลอัลกอริทึมวิเคราะห์..." : n.problems[0]?.title || "ระบบทันตกรรมดำเนินงานได้อย่างมีประสิทธิภาพสูงสุด"
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
              color: "#8b5cf6",
              textTransform: "uppercase"
            },
            children: "Growth index"
          }), e.jsxs("p", {
            style: {
              margin: "4px 0 0",
              fontSize: "22px",
              fontWeight: 900,
              color: n.yoyGrowth >= 0 ? "#10b981" : "#f43f5e"
            },
            children: [n.yoyGrowth >= 0 ? "↑" : "↓", " ", Math.abs(n.yoyGrowth).toFixed(1), "%"]
          })]
        })]
      })
    }), e.jsx(X, {
      metrics: [{
        label: "Total Visits",
        value: i.total ?? "—",
        unit: i.total != null ? "ราย" : "",
        target: null,
        trend: null,
        status: i.total > 0 ? "success" : "neutral",
        icon: "🦷"
      }, {
        label: "Completed",
        value: i.completed ?? "—",
        unit: i.completed != null ? "ราย" : "",
        target: null,
        trend: null,
        status: i.total > 0 && i.completed >= i.total * .8 ? "success" : "warning",
        icon: "✅"
      }, {
        label: "Avg Wait Time",
        value: i.avg_wait_time != null ? Math.round(i.avg_wait_time) : "—",
        unit: i.avg_wait_time != null ? "min" : "",
        target: 30,
        trend: null,
        status: i.avg_wait_time != null ? i.avg_wait_time <= 30 ? "success" : "warning" : "neutral",
        icon: "⏱️"
      }, {
        label: "Avg Treatment",
        value: i.avg_total_time != null ? Math.round(i.avg_total_time) : "—",
        unit: i.avg_total_time != null ? "min" : "",
        target: null,
        trend: null,
        status: "neutral",
        icon: "⚡"
      }, {
        label: "Children %",
        value: i.demographics?.children != null && i.total > 0 ? Math.round(i.demographics.children / i.total * 100) : "—",
        unit: i.demographics?.children != null ? "%" : "",
        target: null,
        trend: null,
        status: "neutral",
        icon: "👧"
      }, {
        label: "Elderly %",
        value: i.demographics?.elderly != null && i.total > 0 ? Math.round(i.demographics.elderly / i.total * 100) : "—",
        unit: i.demographics?.elderly != null ? "%" : "",
        target: null,
        trend: null,
        status: "neutral",
        icon: "👴"
      }, {
        label: "Unique Patients",
        value: i.unique_patients ?? "—",
        unit: i.unique_patients != null ? "คน" : "",
        target: null,
        trend: null,
        status: "neutral",
        icon: "👤"
      }, {
        label: "Completion Rate",
        value: i.total > 0 ? Math.round(i.completed / i.total * 100) : "—",
        unit: i.total > 0 ? "%" : "",
        target: 90,
        trend: null,
        status: i.total > 0 ? i.completed / i.total * 100 >= 90 ? "success" : "warning" : "neutral",
        icon: "🎯"
      }]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "14px"
      },
      children: [e.jsxs("div", {
        style: {
          gridColumn: "span 2",
          padding: "1.5rem",
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.05) 100%)",
          border: "1px solid rgba(139,92,246,0.25)",
          position: "relative",
          overflow: "hidden"
        },
        children: [e.jsx("div", {
          style: {
            position: "absolute",
            top: -20,
            right: -20,
            fontSize: "120px",
            opacity: .05
          },
          children: "🦷"
        }), e.jsx("p", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            textTransform: "uppercase",
            color: "#8b5cf6",
            margin: 0,
            letterSpacing: "0.08em"
          },
          children: "Daily Patient Throughput"
        }), e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "12px"
          },
          children: [e.jsxs("div", {
            children: [e.jsx("span", {
              style: {
                fontSize: "42px",
                fontWeight: 950,
                color: "#6366f1",
                letterSpacing: "-0.04em"
              },
              children: (i.total || 0).toLocaleString("th-TH")
            }), e.jsx("span", {
              style: {
                fontSize: "14px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700,
                marginLeft: "6px"
              },
              children: "ราย"
            })]
          }), e.jsx("div", {
            style: {
              height: "40px",
              width: "1px",
              background: "rgba(0,0,0,0.1)"
            }
          }), e.jsxs("div", {
            style: {
              flex: 1
            },
            children: [e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--md-text-secondary)"
                },
                children: "Completed"
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#10b981"
                },
                children: i.completed || 0
              })]
            }), e.jsx("div", {
              style: {
                height: "6px",
                background: "rgba(0,0,0,0.05)",
                borderRadius: "3px"
              },
              children: e.jsx("div", {
                style: {
                  height: "100%",
                  background: "#10b981",
                  borderRadius: "3px",
                  width: `${Math.min(100,i.total>0?Math.round(i.completed/i.total*100):0)}%`
                }
              })
            })]
          })]
        })]
      }), e.jsx(w, {
        title: "Wait (Median)",
        value: n.benchmarks.medianWait || 0,
        unit: "นาที (30D)",
        icon: "⏱️",
        loading: p.dentalAnalytics,
        color: "blue",
        aiInsight: (n.benchmarks.medianWait || 0) > 30 ? "Wait times are elevated. Consider adjusting appointment intervals or adding support staff." : "Wait times are within acceptable limits."
      }), e.jsx(w, {
        title: "DPI Index",
        value: a?.dpi || 0,
        unit: "/100 (Operational Score)",
        icon: "🎯",
        loading: p.dentalAnalytics,
        color: "purple",
        aiInsight: a?.dpi > 80 ? "Operational scoring is excellent." : "DPI score suggests room for operational improvement. Review chair turnover times."
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
          background: "linear-gradient(180deg, #8b5cf6, #6366f1)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🩺 บุคลากรทางการแพทย์ที่ปฏิบัติหน้าที่วันนี้ (On-Duty)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(139,92,246,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP Activity Logs"
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
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
              children: "🦷"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#8b5cf6"
              },
              children: "ทันตแพทย์ (Dental)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#8b5cf6",
              opacity: .8
            },
            children: a?.on_duty?.doctors?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: p.dentalAnalytics ? Array(3).fill(0).map((t, r) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, r)) : a?.on_duty?.doctors?.length > 0 ? a.on_duty.doctors.map((t, r) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 10px",
              borderRadius: "10px",
              borderBottom: "1px solid rgba(0,0,0,0.03)"
            },
            children: [e.jsx("div", {
              style: {
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: (t.staff_name || "").replace(/ทพ\.|ทพญ\.|พญ\.|นพ\./g, "").trim().substring(0, 1) || "D"
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
                children: "Dentist / Medical Officer"
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
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "เคส"
              })]
            })]
          }, r)) : e.jsx("div", {
            style: {
              padding: "2rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: e.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "ไม่พบข้อมูลทันตแพทย์วันนี้"
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
            background: "rgba(124,58,237,.05)",
            borderBottom: "1px solid rgba(124,58,237,.1)",
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
              children: "🧑‍🏫"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#7c3aed"
              },
              children: "ทันตาภิบาล / ผช. (Clinical)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#7c3aed",
              opacity: .8
            },
            children: a?.on_duty?.nurses?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: p.dentalAnalytics ? Array(3).fill(0).map((t, r) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, r)) : a?.on_duty?.nurses?.length > 0 ? a.on_duty.nurses.map((t, r) => {
            const o = new Date().getHours(),
              s = o < 12 && t.morning_count > 0 || o >= 12 && o < 17 && t.afternoon_count > 0 || o >= 17 && t.night_count > 0;
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
                  background: s ? "linear-gradient(135deg, #7c3aed, #8b5cf6)" : "rgba(0,0,0,0.05)",
                  color: s ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.staff_name?.substring(0, 1) || "N", s && e.jsx("span", {
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
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "Dental Hygienist / Clinical Staff"
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "3px",
                    marginTop: "3px"
                  },
                  children: [e.jsxs("span", {
                    title: "เช้า",
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.morning_count > 0 ? "#7c3aed" : "#ccc"
                    },
                    children: ["🌅", t.morning_count || 0]
                  }), e.jsxs("span", {
                    title: "บ่าย",
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.afternoon_count > 0 ? "#fb6340" : "#ccc"
                    },
                    children: ["☀️", t.afternoon_count || 0]
                  }), e.jsxs("span", {
                    title: "ดึก",
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
                    color: "#7c3aed"
                  },
                  children: t.total_count
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "เคส"
                })]
              })]
            }, r)
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
              children: "ไม่พบข้อมูลทันตาภิบาล"
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
              children: "เจ้าหน้าที่สนับสนุน (Dental)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#6366f1",
              opacity: .8
            },
            children: a?.on_duty?.staff?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: p.dentalAnalytics ? Array(3).fill(0).map((t, r) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, r)) : a?.on_duty?.staff?.length > 0 ? a.on_duty.staff.map((t, r) => {
            const o = new Date().getHours(),
              s = o < 12 && t.morning_count > 0 || o >= 12 && o < 17 && t.afternoon_count > 0 || o >= 17 && t.night_count > 0;
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
                  background: s ? "linear-gradient(135deg, #6366f1, #818cf8)" : "rgba(0,0,0,0.05)",
                  color: s ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.staff_name?.substring(0, 1) || "S", s && e.jsx("span", {
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
                    title: "เช้า",
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.morning_count > 0 ? "#6366f1" : "#ccc"
                    },
                    children: ["🌅", t.morning_count || 0]
                  }), e.jsxs("span", {
                    title: "บ่าย",
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: t.afternoon_count > 0 ? "#fb6340" : "#ccc"
                    },
                    children: ["☀️", t.afternoon_count || 0]
                  }), e.jsxs("span", {
                    title: "ดึก",
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
                  children: t.total_count
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "งาน"
                })]
              })]
            }, r)
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
    }), e.jsxs(W, {
      name: "AI Dental Intelligence Hub",
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
            background: "linear-gradient(180deg, #8b5cf6, #6366f1)",
            borderRadius: "99px"
          }
        }), e.jsx("h3", {
          style: {
            margin: 0,
            fontSize: "16px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: "🧠 AI Dental Intelligence (Executive Briefing)"
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
        children: [e.jsx(v, {
          title: "Dental Performance Index (DPI)",
          icon: "🎯",
          priority: (a?.dpi ?? 0) >= 80 ? "LOW" : (a?.dpi ?? 0) >= 60 ? "MEDIUM" : "HIGH",
          summary: `DPI Score: ${a?.dpi||0}/100${(a?.dpi??0)>=80?" — Optimal":(a?.dpi??0)>=60?" — Fair":" — Needs Improvement"}`,
          analysis: `ดัชนีรวมประสิทธิภาพทันตกรรม คำนวณจาก Wait Time Score (30%), Completion Rate (25%), Revisit Rate (20%), Revenue Yield (25%) — P90 Wait: ${a?.p90_wait_time??0}m, Completion: ${a?.completion_rate??0}%`,
          recommendation: (a?.dpi ?? 0) >= 80 ? "รักษามาตรฐานต่อเนื่อง และเน้นเพิ่ม Service Mix สูง" : "ปรับปรุง Component ที่คะแนนต่ำสุด เพื่อยกระดับ DPI",
          confidence: 94,
          gradient: "#8b5cf6",
          gradientFrom: "rgba(139,92,246,.08)",
          gradientTo: "rgba(99,102,241,.04)",
          borderColor: "rgba(139,92,246,.25)"
        }), e.jsx(v, {
          title: "Workload & Operational Efficiency",
          icon: "⚙️",
          priority: n.benchmarks.p90Wait > 60 ? "HIGH" : n.benchmarks.p90Wait > 45 ? "MEDIUM" : "LOW",
          summary: `P90 Wait: ${n.benchmarks.p90Wait}m | Median: ${n.benchmarks.medianWait}m${n.benchmarks.p90Wait<=45?" — Efficient":" — Bottleneck Detected"}`,
          analysis: `วิเคราะห์ประสิทธิภาพการจัดคิวและ Throughput — Wait SLA: ${a?.wait_sla_pct??0}%, Completion Rate: ${a?.completion_rate??0}%, Peak Hour: ${a?.peak_hour?.label||"N/A"}`,
          recommendation: n.benchmarks.p90Wait > 45 ? "เกลี่ยคิวช่วง Peak ด้วย Load Balancing และเพิ่ม Appointment Slot ช่วงเช้า" : "Throughput ดี คงระบบนัดหมายปัจจุบัน",
          confidence: 91,
          gradient: "#0ea5e9",
          gradientFrom: "rgba(14,165,233,.08)",
          gradientTo: "rgba(3,102,214,.04)",
          borderColor: "rgba(14,165,233,.25)"
        }), e.jsx(v, {
          title: "Patient Demographics & Segmentation",
          icon: "👥",
          priority: "LOW",
          summary: `Avg Age: ${i.demographics?.avg_age?Math.round(i.demographics.avg_age):"—"} | M:F Ratio: ${i.demographics?.male||0}:${i.demographics?.female||0}`,
          analysis: `กลุ่มผู้ป่วยวันนี้: เด็ก ${i.demographics?.children||0} ราย, ผู้สูงอายุ ${i.demographics?.elderly||0} ราย — ข้อมูลช่วยในการวางแผนจัดสรรทันตแพทย์เฉพาะทาง`,
          recommendation: i.demographics?.children > i.demographics?.elderly ? "เด็กเข้ามามาก — พิจารณาเพิ่มทันตแพทย์เด็ก (Pedodontist) ในช่วงเช้า" : "ดูแลกลุ่มผู้สูงอายุ — เน้นหัตถการฟันเทียมและทันตกรรมประดิษฐ์",
          confidence: 88,
          gradient: "#10b981",
          gradientFrom: "rgba(16,185,129,.08)",
          gradientTo: "rgba(5,150,105,.04)",
          borderColor: "rgba(16,185,129,.25)"
        }), e.jsx(v, {
          title: "Revenue & Fiscal Growth Analysis",
          icon: "💰",
          priority: n.yoyGrowth >= 5 ? "LOW" : n.yoyGrowth >= 0 ? "MEDIUM" : "HIGH",
          summary: `YoY Growth: ${n.yoyGrowth>=0?"+":""}${n.yoyGrowth.toFixed(1)}% | Rev/Visit: ฿${(a?.avg_revenue_per_visit||0).toLocaleString()}`,
          analysis: `รายได้ปีงบประมาณ ${n.latestFY.fiscal_label}: ฿${((n.latestFY.comparable_revenue||n.latestFY.total_revenue||0)/1e6).toFixed(2)}M — วิเคราะห์ Service Mix และ Billing Completeness`,
          recommendation: n.yoyGrowth >= 5 ? "การเติบโตดี — ลงทุนเพิ่มหัตถการมูลค่าสูง (ครอบฟัน, รากเทียม)" : "Growth ต่ำ — วิเคราะห์ Revenue Source ที่ลดลง และเพิ่ม Procedure Mix",
          confidence: 92,
          gradient: "#f59e0b",
          gradientFrom: "rgba(245,158,11,.08)",
          gradientTo: "rgba(234,179,8,.04)",
          borderColor: "rgba(245,158,11,.25)"
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
              background: "#8b5cf6",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "12px"
            },
            children: "ST-01"
          }), " Strategic Indicators"]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px"
          },
          children: n.strategicKPIs.length > 0 ? n.strategicKPIs.map((t, r) => e.jsxs("div", {
            style: {
              padding: "14px 10px",
              borderRadius: "16px",
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)",
              textAlign: "center",
              transition: "transform 0.2s"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "24px",
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
          }, r)) : e.jsx("div", {
            style: {
              gridColumn: "span 2",
              textAlign: "center",
              padding: "3rem",
              color: "var(--md-text-tertiary)",
              fontSize: "13px"
            },
            children: p.dentalAnalytics ? "รวบรวมข้อมูล Strategic Dashboard..." : "No Data Available"
          })
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "20px",
          borderLeft: `5px solid ${n.urgencyColor}`
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
              background: n.urgencyColor,
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "12px"
            },
            children: "AI-DX"
          }), " Problem Discovery & Diagnosis"]
        }), e.jsx("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          },
          children: n.problems.length > 0 ? n.problems.map((t, r) => e.jsxs("div", {
            style: {
              padding: "14px",
              borderRadius: "16px",
              background: `${t.color}08`,
              border: `1px solid ${t.color}20`,
              position: "relative"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "14px",
                fontWeight: 800,
                color: t.color
              },
              children: t.title
            }), e.jsx("p", {
              style: {
                margin: "6px 0 0",
                fontSize: "12px",
                color: "var(--md-text-secondary)",
                lineHeight: 1.6
              },
              children: t.rootCause
            }), e.jsxs("div", {
              style: {
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px dashed rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "14px"
                },
                children: "🧪"
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#10b981"
                },
                children: ["RECOMMENDATION: ", t.fixFirst]
              })]
            })]
          }, r)) : e.jsxs("div", {
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
              children: "ตัวบ่งชี้ทุกตัวอยู่ในเกณฑ์มาตรฐานความปลอดภัยและคุณภาพ"
            })]
          })
        })]
      })]
    }), a && (() => {
      const t = a,
        r = t.p90_wait_time ?? 0,
        o = t.wait_sla_pct ?? 0,
        s = t.completion_rate ?? 0,
        d = t.dpi ?? 0,
        l = t.avg_revenue_per_visit ?? 0,
        g = new Date().toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short"
        });
      return e.jsx(V, {
        kpis: [{
          label: "P90 Wait Time",
          thLabel: "เวลารอ P90 (Percentile 90)",
          value: `${r}m`,
          color: r < 45 ? "#10b981" : r < 75 ? "#f59e0b" : "#f43f5e",
          icon: "⚡",
          sub: r < 45 ? "ดีเยี่ยม" : r < 75 ? "ปานกลาง" : "วิกฤต",
          desc: `ผู้ป่วย 90% รอไม่เกิน ${r} นาที`,
          meaning: "เวลารอที่ผู้ป่วย 90% จะได้รับบริการ (P90) สะท้อนประสบการณ์ผู้ป่วยกลุ่ม worst-case ได้ดีกว่าค่าเฉลี่ย",
          calc: "PERCENTILE(wait_times, 0.90) — คำนวณจากทุก visit 30 วัน",
          dataSource: "service_time (HOSxP XE)",
          period: `📅 30 วันย้อนหลัง ถึง ${g}`,
          target: "< 45 นาที",
          benchmark: "รพ.ชุมชน: <60m | รพ.เอกชน: <30m",
          aiTip: r < 45 ? "P90 ดี — ผู้ป่วยส่วนใหญ่ได้รับบริการเร็ว" : "P90 สูง — ตรวจสอบคอขวดช่วง Peak และเพิ่มนัดหมายล่วงหน้า"
        }, {
          label: "Wait SLA Compliance",
          thLabel: "อัตราผ่าน SLA เวลารอ (≤30m)",
          value: `${o}%`,
          color: o > 85 ? "#10b981" : o > 70 ? "#f59e0b" : "#f43f5e",
          icon: "⏱️",
          sub: o > 85 ? "ผ่านเกณฑ์" : "ต่ำกว่าเกณฑ์",
          desc: `${o}% ของผู้ป่วยรอไม่เกิน 30 นาที`,
          meaning: "สัดส่วนผู้ป่วยที่ได้รับบริการภายใน 30 นาที (Service Level Agreement) วัดประสิทธิภาพการจัดคิว",
          calc: "(จำนวน visit ที่รอ ≤ 30min ÷ Total visits) × 100",
          dataSource: "service_time (HOSxP XE)",
          period: "📅 30 วันย้อนหลัง",
          target: "≥ 85%",
          benchmark: "สธ.: ≥80% | HA: ≥85%",
          aiTip: o > 85 ? "การจัดคิวดีเยี่ยม — คงมาตรฐาน" : "ต่ำกว่าเป้า — ปรับระบบนัดหมายและ Load Balancing"
        }, {
          label: "Completion Rate",
          thLabel: "อัตราการรักษาเสร็จสมบูรณ์",
          value: `${s}%`,
          color: s > 90 ? "#10b981" : s > 80 ? "#f59e0b" : "#f43f5e",
          icon: "✅",
          sub: s > 90 ? "ดีมาก" : "ต้องปรับปรุง",
          desc: `${s}% ของผู้ป่วยรักษาเสร็จสิ้นตามแผน`,
          meaning: "สัดส่วนผู้ป่วยที่เข้ารับบริการครบถ้วนจนเสร็จสิ้น (ไม่ Dropout ระหว่างรอ) สะท้อนคุณภาพบริการ",
          calc: "(Completed visits ÷ Total registered visits) × 100",
          dataSource: "ovst + vn_stat (HOSxP XE)",
          period: "📅 30 วันย้อนหลัง",
          target: "≥ 90%",
          benchmark: "รพ.ชุมชน: ≥85% | HA: ≥90%",
          aiTip: s > 90 ? "Dropout ต่ำ — ผู้ป่วยพึงพอใจ" : "Dropout สูง — วิเคราะห์สาเหตุ (รอนาน? ค่าใช้จ่าย?)"
        }, {
          label: "DPI Score",
          thLabel: "ดัชนีประสิทธิภาพทันตกรรม",
          value: `${d}`,
          color: d >= 80 ? "#10b981" : d >= 60 ? "#f59e0b" : "#f43f5e",
          icon: "🎯",
          sub: d >= 80 ? "Optimal" : d >= 60 ? "Fair" : "Critical",
          desc: `Dental Performance Index: ${d}/100`,
          meaning: "ดัชนีรวมประสิทธิภาพคลินิกทันตกรรม คำนวณจาก Wait Time + Completion Rate + Revisit Rate + Revenue Yield",
          calc: "W(0.3)×Wait_Score + W(0.25)×Completion + W(0.2)×Revisit + W(0.25)×Revenue",
          dataSource: "AI Composite (HOSxP XE)",
          period: `📅 ประมวลผล ${g}`,
          target: "≥ 80",
          benchmark: "BCH Internal ≥75 | Excellence ≥85",
          aiTip: d >= 80 ? "DPI สูง — คลินิกทันตกรรมทำงานได้ดีรอบด้าน" : "DPI ต่ำ — ตรวจสอบ Component ที่คะแนนต่ำสุด"
        }, {
          label: "Revenue / Visit",
          thLabel: "รายได้เฉลี่ยต่อ Visit",
          value: `฿${l.toLocaleString()}`,
          color: "#8b5cf6",
          icon: "💰",
          desc: "รายได้เฉลี่ยต่อ 1 visit ทันตกรรม",
          meaning: "รายได้เฉลี่ยต่อ 1 ครั้งที่ผู้ป่วยเข้ารับบริการทันตกรรม สะท้อน Service Mix และ Billing Completeness",
          calc: "Total Revenue (30d) ÷ Total Visits (30d)",
          dataSource: "income + ovst (HOSxP XE)",
          period: "📅 30 วันย้อนหลัง",
          target: "≥ ฿800",
          benchmark: "รพ.ชุมชน: ฿500-800 | รพ.ศูนย์: ฿800-1500",
          aiTip: l >= 800 ? "Service Mix ดี — มีหัตถการมูลค่าสูง" : "Revenue/Visit ต่ำ — เพิ่ม Procedure Mix (ครอบฟัน, รากเทียม)"
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
          background: "linear-gradient(180deg, #0ea5e9, #6366f1)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "👥 Patient Demographics Breakdown (Today)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(14,165,233,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "/api/dental/today"
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        style: {
          padding: "16px",
          borderRadius: "16px",
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderTop: "3px solid #0ea5e9"
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
              fontSize: "20px"
            },
            children: "👨"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            },
            children: "Male"
          })]
        }), e.jsx("div", {
          style: {
            fontSize: "28px",
            fontWeight: 900,
            color: "#0ea5e9"
          },
          children: i.demographics?.male ?? "—"
        }), e.jsx("div", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            marginTop: "4px"
          },
          children: i.total > 0 ? `${Math.round((i.demographics?.male||0)/i.total*100)}% of total` : "—"
        })]
      }), e.jsxs("div", {
        style: {
          padding: "16px",
          borderRadius: "16px",
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderTop: "3px solid #ec4899"
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
              fontSize: "20px"
            },
            children: "👩"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            },
            children: "Female"
          })]
        }), e.jsx("div", {
          style: {
            fontSize: "28px",
            fontWeight: 900,
            color: "#ec4899"
          },
          children: i.demographics?.female ?? "—"
        }), e.jsx("div", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            marginTop: "4px"
          },
          children: i.total > 0 ? `${Math.round((i.demographics?.female||0)/i.total*100)}% of total` : "—"
        })]
      }), e.jsxs("div", {
        style: {
          padding: "16px",
          borderRadius: "16px",
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderTop: "3px solid #f59e0b"
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
              fontSize: "20px"
            },
            children: "👧"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            },
            children: "Children (<12)"
          })]
        }), e.jsx("div", {
          style: {
            fontSize: "28px",
            fontWeight: 900,
            color: "#f59e0b"
          },
          children: i.demographics?.children ?? "—"
        }), e.jsx("div", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            marginTop: "4px"
          },
          children: i.total > 0 ? `${Math.round((i.demographics?.children||0)/i.total*100)}% of total` : "—"
        })]
      }), e.jsxs("div", {
        style: {
          padding: "16px",
          borderRadius: "16px",
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderTop: "3px solid #8b5cf6"
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
              fontSize: "20px"
            },
            children: "👴"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            },
            children: "Elderly (≥60)"
          })]
        }), e.jsx("div", {
          style: {
            fontSize: "28px",
            fontWeight: 900,
            color: "#8b5cf6"
          },
          children: i.demographics?.elderly ?? "—"
        }), e.jsx("div", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            marginTop: "4px"
          },
          children: i.total > 0 ? `${Math.round((i.demographics?.elderly||0)/i.total*100)}% of total` : "—"
        })]
      }), e.jsxs("div", {
        style: {
          padding: "16px",
          borderRadius: "16px",
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderTop: "3px solid #10b981"
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
              fontSize: "20px"
            },
            children: "📊"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            },
            children: "Average Age"
          })]
        }), e.jsxs("div", {
          style: {
            fontSize: "28px",
            fontWeight: 900,
            color: "#10b981"
          },
          children: [i.demographics?.avg_age ? Math.round(i.demographics.avg_age) : "—", i.demographics?.avg_age && e.jsx("span", {
            style: {
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              marginLeft: "4px"
            },
            children: "ปี"
          })]
        }), e.jsx("div", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            marginTop: "4px"
          },
          children: "Mean patient age today"
        })]
      })]
    }), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "-4px",
        marginTop: "12px"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #8b5cf6, #a855f7)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💰 รายได้ทันตกรรมประจำปีงบประมาณ"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(139,92,246,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP XE Data Intelligence"
      })]
    }), c?.fiscal_years && e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(c.fiscal_years.length,3)}, 1fr)`,
        gap: "12px",
        marginBottom: "4px"
      },
      children: c.fiscal_years.slice(-3).map((t, r, o) => {
        const s = r === o.length - 1,
          l = ["#94a3b8", "#a78bfa", "#8b5cf6"][r] || "#8b5cf6";
        return e.jsxs("div", {
          style: {
            padding: "14px 16px",
            borderRadius: "14px",
            border: `1px solid ${l}20`,
            background: `${l}05`,
            borderTop: `3px solid ${l}`
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px"
            },
            children: [e.jsx("div", {
              style: {
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: l
              }
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: l
              },
              children: t.fiscal_label
            }), s && e.jsx("span", {
              style: {
                fontSize: "10px",
                fontWeight: 800,
                color: "#fff",
                background: l,
                padding: "1px 6px",
                borderRadius: "4px",
                marginLeft: "auto"
              },
              children: "CURRENT"
            })]
          }), e.jsxs("p", {
            style: {
              margin: 0,
              fontSize: "22px",
              fontWeight: 900,
              color: l
            },
            children: ["฿", (t.total_revenue / 1e6).toFixed(2), "M"]
          }), e.jsxs("p", {
            style: {
              margin: "4px 0 0",
              fontSize: "12px",
              color: "var(--md-text-tertiary)"
            },
            children: [t.total_visits ? `${t.total_visits.toLocaleString()} visits` : "", t.months_active ? ` · ${t.months_active} months` : ""]
          })]
        }, r)
      })
    }), e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "24px"
      },
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
            children: "Financial Persistence & Fiscal Trends"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: "เปรียบเทียบรายได้ปีงบประมาณปัจจุบันและย้อนหลัง"
          })]
        }), e.jsx("div", {
          style: {
            display: "flex",
            gap: "12px"
          },
          children: c?.fiscal_years?.slice(-2).map((t, r) => e.jsxs("div", {
            style: {
              textAlign: "right"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase"
              },
              children: t.fiscal_label
            }), e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "15px",
                fontWeight: 900,
                color: r === 1 ? "#8b5cf6" : "var(--md-text-secondary)"
              },
              children: ["฿", (t.total_revenue / 1e6).toFixed(2), "M"]
            })]
          }, r))
        })]
      }), c?.fiscal_years ? e.jsx("div", {
        style: {
          height: "320px",
          width: "100%"
        },
        children: e.jsx(R, {
          width: "100%",
          height: "100%",
          children: e.jsxs(I, {
            data: $,
            margin: {
              top: 10,
              right: 10,
              left: -10,
              bottom: 0
            },
            children: [e.jsx("defs", {
              children: e.jsxs("linearGradient", {
                id: "barGrad",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [e.jsx("stop", {
                  offset: "0%",
                  stopColor: "#8b5cf6",
                  stopOpacity: 1
                }), e.jsx("stop", {
                  offset: "100%",
                  stopColor: "#6366f1",
                  stopOpacity: 1
                })]
              })
            }), e.jsx(T, {
              strokeDasharray: "3 3",
              vertical: !1,
              stroke: "rgba(0,0,0,0.05)"
            }), e.jsx(k, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fontWeight: 700,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(C, {
              tick: {
                fontSize: 10,
                fontWeight: 600,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1,
              tickFormatter: t => `${(t/1e6).toFixed(1)}M`
            }), e.jsx(A, {
              cursor: {
                fill: "rgba(139,92,246,0.05)"
              },
              contentStyle: {
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                padding: "12px"
              }
            }), c.fiscal_years.map((t, r) => {
              const o = r === c.fiscal_years.length - 1;
              return e.jsx(D, {
                dataKey: `fy${r}`,
                name: t.fiscal_label,
                fill: o ? "url(#barGrad)" : "#cbd5e1",
                radius: [6, 6, 0, 0],
                barSize: o ? 28 : 20
              }, r)
            })]
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
            children: p.dentalRevenueFiscal ? "Predictive Analytics is running..." : "Financial Data Stream Offline"
          })]
        })
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "16px"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "24px"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px"
          },
          children: [e.jsx("span", {
            style: {
              background: "#8b5cf6",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: 800
            },
            children: "DX-30D"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "15px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: "Top Clinical Diagnoses & Procedures"
          })]
        }), e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          },
          children: [a?.top_diagnoses?.slice(0, 8).map((t, r) => {
            const o = a.top_diagnoses[0]?.count || 1,
              s = Math.round(t.count / o * 100),
              l = ["#8b5cf6", "#6366f1", "#7c3aed", "#a78bfa", "#818cf8", "#6d28d9", "#4f46e5", "#4338ca"][r] || "#8b5cf6";
            return e.jsxs("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "32px 1fr 70px 60px",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                background: r === 0 ? `${l}08` : "transparent",
                borderRadius: "12px",
                border: `1px solid ${r===0?l+"20":"var(--md-border)"}`,
                transition: "all 0.15s"
              },
              children: [e.jsx("div", {
                style: {
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: r < 3 ? l : "var(--md-surface)",
                  color: r < 3 ? "#fff" : "var(--md-text-tertiary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "12px",
                  border: r >= 3 ? "1px solid var(--md-border)" : "none"
                },
                children: r + 1
              }), e.jsxs("div", {
                style: {
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
                  children: t.name || t.icd10
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "4px"
                  },
                  children: [e.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)",
                      fontFamily: "monospace"
                    },
                    children: t.icd10
                  }), e.jsx("div", {
                    style: {
                      flex: 1,
                      height: "4px",
                      background: "rgba(0,0,0,0.04)",
                      borderRadius: "2px",
                      overflow: "hidden"
                    },
                    children: e.jsx("div", {
                      style: {
                        height: "100%",
                        width: `${s}%`,
                        background: l,
                        borderRadius: "2px",
                        transition: "width 0.5s ease"
                      }
                    })
                  })]
                })]
              }), e.jsx("div", {
                style: {
                  textAlign: "right"
                },
                children: e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "15px",
                    fontWeight: 900,
                    color: l
                  },
                  children: t.count
                })
              }), e.jsx("div", {
                style: {
                  textAlign: "right"
                },
                children: e.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: a.top_diagnoses.reduce((g, x) => g + x.count, 0) > 0 ? `${Math.round(t.count/a.top_diagnoses.reduce((g,x)=>g+x.count,0)*100)}%` : "—"
                })
              })]
            }, r)
          }), (!a?.top_diagnoses || a.top_diagnoses.length === 0) && !p.dentalAnalytics && e.jsx("div", {
            style: {
              textAlign: "center",
              padding: "2rem",
              color: "var(--md-text-tertiary)"
            },
            children: "No diagnosis data available for this period"
          })]
        })]
      }), e.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        },
        children: [e.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "20px",
            flex: 1
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
                background: "#6366f1",
                color: "white",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 800
              },
              children: "HOURLY"
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "Patient Flow Distribution"
            })]
          }), i.hourly_distribution && i.hourly_distribution.length > 0 ? e.jsx("div", {
            style: {
              height: "180px"
            },
            children: e.jsx(R, {
              width: "100%",
              height: "100%",
              children: e.jsxs(I, {
                data: i.hourly_distribution,
                margin: {
                  top: 5,
                  right: 5,
                  left: -20,
                  bottom: 0
                },
                children: [e.jsx(T, {
                  strokeDasharray: "3 3",
                  vertical: !1,
                  stroke: "rgba(0,0,0,0.05)"
                }), e.jsx(k, {
                  dataKey: "hour",
                  tick: {
                    fontSize: 9,
                    fontWeight: 600,
                    fill: "var(--md-text-tertiary)"
                  },
                  axisLine: !1,
                  tickLine: !1,
                  tickFormatter: t => `${t}:00`
                }), e.jsx(C, {
                  tick: {
                    fontSize: 9,
                    fill: "var(--md-text-tertiary)"
                  },
                  axisLine: !1,
                  tickLine: !1
                }), e.jsx(A, {
                  contentStyle: {
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                    padding: "8px 12px",
                    fontSize: "12px"
                  }
                }), e.jsx(D, {
                  dataKey: "count",
                  name: "Patients",
                  fill: "#8b5cf6",
                  radius: [4, 4, 0, 0],
                  barSize: 16
                })]
              })
            })
          }) : e.jsx("div", {
            style: {
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--md-text-tertiary)",
              fontSize: "12px"
            },
            children: p.dentalToday ? "Loading hourly data..." : "No hourly data available"
          })]
        }), i.top_diagnoses && i.top_diagnoses.length > 0 && e.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "20px"
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
                background: "#10b981",
                color: "white",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 800
              },
              children: "TODAY"
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)"
              },
              children: "Top Diagnoses Today"
            })]
          }), e.jsx("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            },
            children: i.top_diagnoses.slice(0, 5).map((t, r) => e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 10px",
                borderRadius: "8px",
                background: r === 0 ? "rgba(16,185,129,.05)" : "transparent"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "11px",
                  fontWeight: 900,
                  color: r < 3 ? "#10b981" : "var(--md-text-tertiary)",
                  width: "18px",
                  textAlign: "center"
                },
                children: r + 1
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
                  children: t.name || t.icd10
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontFamily: "monospace"
                  },
                  children: t.icd10
                })]
              }), e.jsx("span", {
                style: {
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "#10b981"
                },
                children: t.count
              })]
            }, r))
          })]
        })]
      })]
    }), e.jsx(W, {
      name: "AI Server Insights",
      children: e.jsx(U, {
        data: m.dentalAI,
        theme: "dental",
        title: "AI Dental Intelligence"
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
        children: "BCH Dental Intelligence · Protocol v10.4 · High Fidelity Analytics"
      })
    })]
  })
}
const te = N.memo(q);
export {
  te as
  default
};