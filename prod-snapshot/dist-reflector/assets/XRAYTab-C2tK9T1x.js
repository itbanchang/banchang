import {
  R as K,
  r as z,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  b as V,
  a as Q,
  E as J,
  r as Z,
  S as D,
  M as ee,
  g as te,
  K as ie,
  h as re
} from "./shared-ui-OVDEF1.js";
import {
  K as M
} from "./index-DK7pcb85.js";
import {
  R as ae,
  c as ne,
  a as oe,
  X as se,
  Y as le,
  T as de,
  B as ce
} from "./vendor-charts-C5q2M-g3.js";
const l = {
  primary: "#8b5cf6",
  secondary: "#6366f1",
  accent: "#a78bfa",
  gradient: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.05) 100%)",
  border: "rgba(139,92,246,0.25)",
  light: "rgba(139,92,246,0.08)"
};

function pe() {
  const f = V(t => ({
      xrayToday: t.xrayToday,
      xrayAnalytics: t.xrayAnalytics,
      xrayRevenueFiscal: t.xrayRevenueFiscal,
      xrayAI: t.xrayAI,
      loading: t.loading
    })),
    {
      fetchData: W
    } = Q(),
    m = f.xrayToday || {},
    r = f.xrayAnalytics,
    y = f.xrayRevenueFiscal,
    c = f.loading || {};
  z.useEffect(() => {
    !m.total_requests && !m.total && !c.xrayToday && W("xrayToday", "/api/xray/today"), !r && !c.xrayAnalytics && W("xrayAnalytics", "/api/xray/analytics"), !y && !c.xrayRevenueFiscal && W("xrayRevenueFiscal", "/api/xray/revenue-fiscal");
    const t = setTimeout(() => W("xrayAI", "/api/ai/xray/optimization"), 300);
    return () => clearTimeout(t)
  }, [W]);
  const p = m.total_requests ?? m.total ?? 0,
    w = m.completed ?? 0,
    v = m.waiting ?? 0,
    C = m.unique_patients ?? 0,
    b = m.avg_wait_time ?? 0,
    R = m.avg_tat ?? 0,
    g = m.demographics || {},
    L = m.hourly_distribution || m.hourly || [],
    I = m.top_items || [],
    T = p > 0 ? Math.round(w / p * 100) : 0,
    _ = g.elderly && p > 0 ? Math.round(g.elderly / p * 100) : 0,
    d = z.useMemo(() => {
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
      if (!r) return t;
      const i = r,
        n = i.completion_rate ?? 0,
        s = i.avg_wait_time ?? 0,
        o = i.median_wait_time ?? 0,
        a = i.p90_wait_time ?? 0,
        u = i.avg_revenue_per_visit ?? 0,
        h = [];
      if (a > 60 && h.push({
          priority: 1,
          severity: "critical",
          color: "#f43f5e",
          title: `P90 Wait Time Critical: ${a}m`,
          rootCause: "10% of patients wait over 1 hour, indicating triage or staffing issues during peak hours",
          fixFirst: "Implement load balancing for appointments; shift urgent cases before 10:00"
        }), s > 30 && h.push({
          priority: 2,
          severity: "warning",
          color: "#f59e0b",
          title: `Average Wait Time Elevated: ${s}m`,
          rootCause: `Mean wait exceeds 30-minute target (Median: ${o}m)`,
          fixFirst: "Check equipment prep bottlenecks and scanner availability"
        }), n < 85 && h.push({
          priority: 3,
          severity: "warning",
          color: "#f59e0b",
          title: `Case Completion Rate Low: ${n}%`,
          rootCause: `${i.dropout_count||0} patient dropouts this month`,
          fixFirst: "Improve patient tracking via LINE/SMS notification systems"
        }), i.peak_hour && i.peak_hour.avg > 10 && a > 45 && h.push({
          priority: 4,
          severity: "info",
          color: "#8b5cf6",
          title: `Peak Hour Congestion: ${i.peak_hour.label} (${i.peak_hour.avg} cases/hr)`,
          rootCause: "High volume during peak creates queue overflow and scanner bottleneck",
          fixFirst: "Load-balance Chest X-Ray appointments into off-peak windows"
        }), i.top_diagnoses && i.top_diagnoses.length > 0) {
        const x = [...i.top_diagnoses].sort((Y, U) => (U.count || 0) - (Y.count || 0))[0];
        x && x.count > 50 && h.push({
          priority: 5,
          severity: "good",
          color: "#10b981",
          title: `Top Procedure: ${x.name}`,
          rootCause: "Most frequently ordered imaging study this period",
          fixFirst: "Monitor film stock and equipment load capacity for this procedure"
        })
      }
      if (i.dept_pattern && i.dept_pattern.length > 0) {
        const x = i.dept_pattern[0];
        x && x.pct > 40 && h.push({
          priority: 7,
          severity: "info",
          color: "#0ea5e9",
          title: `${x.name} drives ${x.pct}% of X-Ray demand`,
          rootCause: `${x.name} is the primary demand source (${x.count} requests/30d) -- peaks here cascade to queue system`,
          fixFirst: `Coordinate pre-scheduling with ${x.name} to distribute workload`
        })
      }
      if (i.workload_heatmap?.peak?.count > 15) {
        const x = i.workload_heatmap.peak;
        h.push({
          priority: 8,
          severity: "info",
          color: "#f97316",
          title: `Peak Workload: ${x.dayLabel} ${String(x.hour).padStart(2,"0")}:00 (${x.count} cases/30d)`,
          rootCause: "Highest volume window -- risk of queue overflow and extended TAT",
          fixFirst: "Add staffing during peak or open additional X-Ray room"
        })
      }
      const A = i.total_visits > 0 ? Math.round(i.children_total / i.total_visits * 100) : 0;
      A > 25 && h.push({
        priority: 6,
        severity: "info",
        color: "#0ea5e9",
        title: `High pediatric ratio: ${A}%`,
        rootCause: "Patients under 15 represent a significant portion -- additional radiation protection required",
        fixFirst: "Prepare Gonad Shield / Thyroid Shield and reduce exposure per Pediatric Protocol"
      });
      const j = y?.fiscal_years || [],
        S = j[j.length - 1] || {
          fiscal_label: "FY"
        },
        $ = j[j.length - 2],
        E = S.comparable_revenue || S.total_revenue || 0,
        P = $ && ($.comparable_revenue || $.total_revenue) || 0,
        O = P > 0 ? (E - P) / P * 100 : 0,
        G = [{
          label: "P90 Wait",
          value: `${a}m`,
          color: a < 45 ? "#10b981" : a < 75 ? "#f59e0b" : "#f43f5e",
          icon: "⚡"
        }, {
          label: "Wait SLA",
          value: `${i.wait_sla_pct??0}%`,
          color: (i.wait_sla_pct ?? 0) > 85 ? "#10b981" : "#f59e0b",
          icon: "⏱️"
        }, {
          label: "Completion",
          value: `${n}%`,
          color: n > 90 ? "#10b981" : "#f59e0b",
          icon: "✅"
        }, {
          label: "Rev/Visit",
          value: `${u.toLocaleString()}`,
          color: "#8b5cf6",
          icon: "💰"
        }],
        q = h.filter(x => x.severity === "critical").length,
        X = h.filter(x => x.severity === "warning").length,
        k = Math.min(10, q * 3 + X * 1.5);
      return {
        problems: h,
        urgencyScore: k,
        urgencyColor: k >= 7 ? "#f43f5e" : k >= 4 ? "#f59e0b" : "#10b981",
        urgencyLabel: k >= 7 ? "วิกฤต" : k >= 4 ? "เฝ้าระวัง" : "ปกติ",
        latestFY: S,
        yoyGrowth: O,
        strategicKPIs: G,
        benchmarks: {
          medianWait: o,
          p90Wait: a
        }
      }
    }, [r, y]),
    N = z.useMemo(() => {
      if (!y?.fiscal_years) return [];
      const t = y.fiscal_years;
      return ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((n, s) => {
        const o = {
          month: n
        };
        return t.forEach((a, u) => {
          o[`fy${u}`] = a.months && a.months[s] ? a.months[s].revenue : 0
        }), o
      })
    }, [y]),
    H = z.useMemo(() => {
      const t = r?.on_duty?.staff?.length ?? 0;
      return [{
        label: "Total Requests",
        value: p,
        unit: "cases",
        icon: "☢️",
        status: p > 0 ? "normal" : "warning"
      }, {
        label: "Completed",
        value: w,
        unit: "cases",
        icon: "✅",
        status: "success",
        target: p || void 0
      }, {
        label: "Waiting",
        value: v,
        unit: "cases",
        icon: "⏳",
        status: v > 20 ? "critical" : v > 10 ? "warning" : "normal"
      }, {
        label: "Avg TAT",
        value: R,
        unit: "min",
        icon: "⚡",
        status: R > 60 ? "critical" : R > 30 ? "warning" : "success"
      }, {
        label: "Avg Wait",
        value: b,
        unit: "min",
        icon: "⏱️",
        status: b > 45 ? "critical" : b > 25 ? "warning" : "success"
      }, {
        label: "Unique Patients",
        value: C,
        unit: "pts",
        icon: "👤",
        status: "normal"
      }, {
        label: "Elderly %",
        value: _,
        unit: "%",
        icon: "👴",
        status: _ > 50 ? "warning" : "normal"
      }, {
        label: "Staff On-Duty",
        value: t,
        unit: "persons",
        icon: "🩺",
        status: t > 0 ? "success" : "warning"
      }]
    }, [p, w, v, R, b, C, _, r]),
    B = z.useMemo(() => {
      const t = r?.rpi ?? 0,
        i = r?.completion_rate ?? 0,
        n = r?.p90_wait_time ?? 0,
        s = r?.avg_revenue_per_visit ?? 0,
        o = r?.peak_hour,
        a = r?.avg_daily_visits ?? 0;
      return [{
        title: "Radiology Performance Index",
        icon: "🎯",
        priority: t >= 80 ? "LOW" : t >= 60 ? "MEDIUM" : "HIGH",
        summary: `RPI Score: ${t}/100 -- ${t>=80?"Excellent operational performance":t>=60?"Moderate performance, optimization needed":"Critical: immediate intervention required"}`,
        analysis: `Composite index derived from Wait Time Score (40%), Completion Rate (40%), and Revenue Profitability (20%). Current completion: ${i}%, P90 Wait: ${n}m.`,
        recommendation: t >= 80 ? "Maintain current performance levels. Focus on consistency and patient satisfaction metrics." : "Prioritize reducing P90 wait times and improving case completion rates through better scheduling.",
        confidence: t > 0 ? 92 : 50,
        gradient: t >= 80 ? "#10b981" : t >= 60 ? "#f59e0b" : "#f43f5e",
        gradientFrom: t >= 80 ? "rgba(16,185,129,.08)" : t >= 60 ? "rgba(245,158,11,.08)" : "rgba(244,63,94,.08)",
        gradientTo: "rgba(99,102,241,.04)",
        borderColor: t >= 80 ? "rgba(16,185,129,.25)" : t >= 60 ? "rgba(245,158,11,.25)" : "rgba(244,63,94,.25)"
      }, {
        title: "Workload Analysis",
        icon: "📊",
        priority: o && o.avg > 12 ? "HIGH" : "MEDIUM",
        summary: `Daily average: ${a||p} cases/day. ${o?`Peak at ${o.label} with ~${o.avg} cases/hour.`:"No peak hour data yet."}`,
        analysis: `Today's throughput: ${p} requests, ${w} completed, ${v} waiting. ${T}% completion rate indicates ${T>=90?"healthy":"suboptimal"} workflow.`,
        recommendation: o && o.avg > 10 ? `Redistribute Chest X-Ray appointments from ${o.label} to off-peak slots. Consider adding dedicated scanner for walk-ins.` : "Current workload distribution is within acceptable limits. Monitor for trend changes.",
        confidence: 88,
        gradient: "#8b5cf6",
        gradientFrom: "rgba(139,92,246,.08)",
        gradientTo: "rgba(99,102,241,.04)",
        borderColor: "rgba(139,92,246,.25)"
      }, {
        title: "Patient Flow Intelligence",
        icon: "🔄",
        priority: b > 40 ? "HIGH" : b > 20 ? "MEDIUM" : "LOW",
        summary: `Current wait time: ${b}m avg, TAT: ${R}m. ${v} patients in queue. ${C} unique patients served today.`,
        analysis: `${g.male??0} male, ${g.female??0} female patients. Elderly (${g.elderly??0}) represent ${_}% of volume. ${g.children??0} pediatric cases. Average age: ${g.avg_age??"N/A"} years.`,
        recommendation: b > 30 ? "Implement real-time queue display and SMS notification when patient number approaches. Consider express lane for simple procedures." : "Patient flow is well-managed. Continue monitoring elderly and pediatric ratio for resource planning.",
        confidence: 90,
        gradient: "#0ea5e9",
        gradientFrom: "rgba(14,165,233,.08)",
        gradientTo: "rgba(6,182,212,.04)",
        borderColor: "rgba(14,165,233,.25)"
      }, {
        title: "Revenue Optimization",
        icon: "💰",
        priority: d.yoyGrowth < 0 ? "HIGH" : d.yoyGrowth < 5 ? "MEDIUM" : "LOW",
        summary: `YoY Growth: ${d.yoyGrowth>=0?"+":""}${d.yoyGrowth.toFixed(1)}%. Avg revenue/visit: ฿${(s||0).toLocaleString()}. ${d.latestFY.fiscal_label||"Current FY"} performance.`,
        analysis: `Revenue per visit reflects service mix between plain film, CT, and special studies. ${s>=400?"Good service mix with sufficient advanced imaging.":"Low revenue/visit suggests predominance of plain film studies."}`,
        recommendation: d.yoyGrowth < 0 ? "Investigate declining revenue. Check billing completeness, patient volume trends, and service mix ratio." : "Growth trajectory is positive. Focus on expanding CT/special study capacity to increase per-visit revenue.",
        confidence: 85,
        gradient: "#f59e0b",
        gradientFrom: "rgba(245,158,11,.08)",
        gradientTo: "rgba(249,115,22,.04)",
        borderColor: "rgba(245,158,11,.25)"
      }]
    }, [r, d, p, w, v, b, R, C, g, _, T]);
  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    children: [e.jsx(J, {
      title: "AI Executive Quick Summary — รังสีวิทยา",
      subtitle: "Requests · Completion · Wait · TAT · Revenue",
      badge: "📐 Quick Summary",
      accentColor: "#06b6d4",
      headerGradient: "linear-gradient(135deg, rgba(6,182,212,.10), rgba(139,92,246,.05))",
      narrative: Z(f)
    }), e.jsx(D, {
      name: "AI Intelligence Banner",
      children: e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "12px",
          marginBottom: "0.5rem"
        },
        children: [e.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderLeft: `5px solid ${d.urgencyColor}`,
            background: `linear-gradient(90deg, ${d.urgencyColor}10 0%, transparent 100%)`
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
                  color: d.urgencyColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                },
                children: "AI Radiology Diagnostics"
              }), e.jsx("span", {
                style: {
                  padding: "2px 8px",
                  borderRadius: "4px",
                  background: d.urgencyColor,
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 900
                },
                children: d.urgencyLabel
              })]
            }), e.jsx("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--md-text-primary)"
              },
              children: c.xrayAnalytics ? "Processing radiology intelligence algorithms..." : d.problems[0]?.title || "Radiology operations running at peak efficiency"
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
            children: "Growth Index"
          }), e.jsxs("p", {
            style: {
              margin: "4px 0 0",
              fontSize: "22px",
              fontWeight: 900,
              color: d.yoyGrowth >= 0 ? "#10b981" : "#f43f5e"
            },
            children: [d.yoyGrowth >= 0 ? "↑" : "↓", " ", Math.abs(d.yoyGrowth).toFixed(1), "%"]
          })]
        })]
      })
    }), e.jsxs("div", {
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px"
        },
        children: [e.jsx("div", {
          style: {
            width: "3px",
            height: "18px",
            background: `linear-gradient(180deg, ${l.primary}, ${l.secondary})`,
            borderRadius: "99px"
          }
        }), e.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            letterSpacing: "-0.01em"
          },
          children: "Real-Time Performance Metrics"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            background: l.light,
            padding: "2px 8px",
            borderRadius: "99px"
          },
          children: "Today Live"
        })]
      }), e.jsx(ee, {
        metrics: H,
        columns: 4,
        gap: "10px",
        minWidth: "180px"
      })]
    }), e.jsx(D, {
      name: "AI Analytics Insight Cards",
      children: e.jsxs("div", {
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px"
          },
          children: [e.jsx("div", {
            style: {
              width: "3px",
              height: "18px",
              background: "linear-gradient(180deg, #f59e0b, #f97316)",
              borderRadius: "99px"
            }
          }), e.jsx("span", {
            style: {
              fontSize: "var(--fs-sm)",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.01em"
            },
            children: "AI Strategic Analytics"
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              padding: "2px 8px",
              borderRadius: "4px"
            },
            children: "AI-POWERED"
          })]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "14px"
          },
          children: B.map((t, i) => e.jsx(te, {
            ...t
          }, i))
        })]
      })
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
          background: l.gradient,
          border: `1px solid ${l.border}`,
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
          children: "☢️"
        }), e.jsx("p", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            textTransform: "uppercase",
            color: l.primary,
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
                color: l.secondary,
                letterSpacing: "-0.04em"
              },
              children: p.toLocaleString("th-TH")
            }), e.jsx("span", {
              style: {
                fontSize: "14px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700,
                marginLeft: "6px"
              },
              children: "cases"
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
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#10b981"
                },
                children: [w, " / ", p]
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
                  width: `${Math.min(100,T)}%`,
                  transition: "width 0.8s ease"
                }
              })
            }), e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--md-text-secondary)"
                },
                children: "Waiting"
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: v > 15 ? "#f43f5e" : "#f59e0b"
                },
                children: v
              })]
            })]
          })]
        })]
      }), e.jsx(M, {
        title: "Wait (Median)",
        value: d.benchmarks.medianWait || 0,
        unit: "min (30D)",
        icon: "⏱️",
        loading: c.xrayAnalytics,
        color: "blue",
        aiInsight: (d.benchmarks.medianWait || 0) > 40 ? "X-Ray wait times are elevated. Address scheduling blocks or scanner availability." : "X-Ray wait times are within normal limits."
      }), e.jsx(M, {
        title: "RPI Index",
        value: r?.rpi || 0,
        unit: "/100 (Operational Score)",
        icon: "🎯",
        loading: c.xrayAnalytics,
        color: "purple",
        aiInsight: r?.rpi > 80 ? "Radiology operational index is excellent." : "Radiology operations need optimization. Check scan turnaround times."
      })]
    }), e.jsxs("div", {
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px"
        },
        children: [e.jsx("div", {
          style: {
            width: "3px",
            height: "18px",
            background: `linear-gradient(180deg, ${l.primary}, #a78bfa)`,
            borderRadius: "99px"
          }
        }), e.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: "Top Imaging Studies Today"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            background: l.light,
            padding: "2px 8px",
            borderRadius: "99px"
          },
          children: "Live Ranking"
        })]
      }), e.jsx("div", {
        className: "glass-card",
        style: {
          padding: "20px"
        },
        children: I.length > 0 ? e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "10px"
          },
          children: I.slice(0, 10).map((t, i) => {
            const n = I[0]?.count || 1,
              s = Math.round(t.count / n * 100),
              o = ["#f43f5e", "#f97316", "#f59e0b", l.primary, "#06b6d4", "#10b981", "#6366f1", "#ec4899", "#a855f7", "#64748b"],
              a = o[i % o.length];
            return e.jsxs("div", {
              style: {
                padding: "12px 16px",
                background: "var(--md-surface)",
                borderRadius: "12px",
                border: "1px solid var(--md-border)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderLeft: `3px solid ${a}`
              },
              children: [e.jsx("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: `${a}15`,
                  color: a,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: "13px",
                  flexShrink: 0
                },
                children: i + 1
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
                  children: t.item_name || "Unknown Study"
                }), e.jsx("div", {
                  style: {
                    marginTop: "4px",
                    height: "4px",
                    background: "rgba(0,0,0,0.04)",
                    borderRadius: "2px"
                  },
                  children: e.jsx("div", {
                    style: {
                      height: "100%",
                      background: `linear-gradient(90deg, ${a}, ${a}90)`,
                      borderRadius: "2px",
                      width: `${s}%`,
                      transition: "width 0.6s ease"
                    }
                  })
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "right",
                  flexShrink: 0
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: 900,
                    color: a
                  },
                  children: t.count
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "cases"
                })]
              })]
            }, i)
          })
        }) : e.jsx("div", {
          style: {
            textAlign: "center",
            padding: "2rem",
            color: "var(--md-text-tertiary)"
          },
          children: c.xrayToday ? e.jsx("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            },
            children: Array(3).fill(0).map((t, i) => e.jsx("div", {
              className: "skeleton",
              style: {
                height: "48px",
                borderRadius: "10px"
              }
            }, i))
          }) : "No imaging study data available today"
        })
      })]
    }), e.jsxs("div", {
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px"
        },
        children: [e.jsx("div", {
          style: {
            width: "3px",
            height: "18px",
            background: "linear-gradient(180deg, #06b6d4, #0ea5e9)",
            borderRadius: "99px"
          }
        }), e.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: "Patient Demographics"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            background: "rgba(6,182,212,.08)",
            padding: "2px 8px",
            borderRadius: "99px"
          },
          children: "Today"
        })]
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "12px"
        },
        children: [{
          label: "Male",
          value: g.male ?? 0,
          icon: "👨",
          color: "#3b82f6",
          bgFrom: "rgba(59,130,246,.1)"
        }, {
          label: "Female",
          value: g.female ?? 0,
          icon: "👩",
          color: "#ec4899",
          bgFrom: "rgba(236,72,153,.1)"
        }, {
          label: "Elderly",
          value: g.elderly ?? 0,
          icon: "👴",
          color: "#f59e0b",
          bgFrom: "rgba(245,158,11,.1)",
          sub: `${_}%`
        }, {
          label: "Children",
          value: g.children ?? 0,
          icon: "👶",
          color: "#10b981",
          bgFrom: "rgba(16,185,129,.1)"
        }, {
          label: "Avg Age",
          value: g.avg_age ?? "N/A",
          icon: "📊",
          color: l.primary,
          bgFrom: l.light,
          unit: "yrs"
        }].map((t, i) => e.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "1.25rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(135deg, ${t.bgFrom}, transparent)`,
            border: `1px solid ${t.color}25`
          },
          children: [e.jsx("div", {
            style: {
              fontSize: "28px",
              marginBottom: "6px"
            },
            children: t.icon
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "28px",
              fontWeight: 950,
              color: t.color,
              lineHeight: 1
            },
            children: typeof t.value == "number" ? t.value.toLocaleString() : t.value
          }), t.unit && e.jsx("span", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: t.unit
          }), t.sub && e.jsxs("span", {
            style: {
              fontSize: "12px",
              color: t.color,
              fontWeight: 800,
              marginLeft: "4px"
            },
            children: ["(", t.sub, ")"]
          }), e.jsx("p", {
            style: {
              margin: "4px 0 0",
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-secondary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            },
            children: t.label
          })]
        }, i))
      }), (g.male > 0 || g.female > 0) && (() => {
        const t = (g.male || 0) + (g.female || 0),
          i = t > 0 ? Math.round(g.male / t * 100) : 50;
        return e.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "12px 20px",
            marginTop: "10px"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "6px"
            },
            children: [e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#3b82f6"
              },
              children: ["Male ", i, "%"]
            }), e.jsx("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "Gender Distribution"
            }), e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#ec4899"
              },
              children: ["Female ", 100 - i, "%"]
            })]
          }), e.jsxs("div", {
            style: {
              height: "8px",
              borderRadius: "4px",
              background: "rgba(0,0,0,0.04)",
              overflow: "hidden",
              display: "flex"
            },
            children: [e.jsx("div", {
              style: {
                width: `${i}%`,
                background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                transition: "width 0.8s ease"
              }
            }), e.jsx("div", {
              style: {
                flex: 1,
                background: "linear-gradient(90deg, #f472b6, #ec4899)",
                transition: "width 0.8s ease"
              }
            })]
          })]
        })
      })()]
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
          background: `linear-gradient(180deg, ${l.primary}, ${l.secondary})`,
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "Radiology Staff On-Duty"
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
            children: "☢️"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 800,
              color: l.primary
            },
            children: "Radiologic Technologists"
          })]
        }), e.jsxs("span", {
          style: {
            fontSize: "11px",
            fontWeight: 700,
            color: l.primary,
            opacity: .8
          },
          children: [r?.on_duty?.staff?.length || 0, " persons"]
        })]
      }), e.jsx("div", {
        style: {
          maxHeight: "280px",
          overflowY: "auto",
          padding: "8px"
        },
        className: "custom-scrollbar",
        children: c.xrayAnalytics ? Array(3).fill(0).map((t, i) => e.jsx("div", {
          className: "skeleton",
          style: {
            height: "50px",
            margin: "4px 0",
            borderRadius: "10px"
          }
        }, i)) : r?.on_duty?.staff?.length > 0 ? r.on_duty.staff.map((t, i) => e.jsxs("div", {
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
              background: `linear-gradient(135deg, ${l.primary}, ${l.accent})`,
              color: "#fff",
              fontSize: "12px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: (t.staff_name || t.username || "").substring(0, 1) || "R"
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
              children: t.staff_name || t.username || "Unknown"
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: "Radiologic Technologist"
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
              children: t.total_count
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "8px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "cases"
            })]
          })]
        }, i)) : e.jsx("div", {
          style: {
            padding: "2rem",
            textAlign: "center",
            color: "var(--md-text-tertiary)"
          },
          children: e.jsx("p", {
            style: {
              fontSize: "12px"
            },
            children: "No radiology staff data available today"
          })
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
          padding: "20px"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px"
          },
          children: [e.jsxs("div", {
            children: [e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "15px",
                fontWeight: 900,
                color: "var(--md-text-primary)",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              },
              children: [e.jsx("span", {
                style: {
                  background: `linear-gradient(135deg, ${l.primary}, ${l.secondary})`,
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 900
                },
                children: "AI"
              }), "Workload Heatmap"]
            }), e.jsx("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: "Hourly x Day volume (30 days)"
            })]
          }), r?.workload_heatmap?.peak && e.jsxs("div", {
            style: {
              textAlign: "right",
              background: "rgba(239,68,68,0.06)",
              padding: "4px 10px",
              borderRadius: "8px",
              border: "1px solid rgba(239,68,68,0.15)"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "10px",
                fontWeight: 800,
                color: "#ef4444",
                textTransform: "uppercase"
              },
              children: "Peak"
            }), e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                fontWeight: 900,
                color: "#ef4444"
              },
              children: [r.workload_heatmap.peak.dayLabel, " ", String(r.workload_heatmap.peak.hour).padStart(2, "0"), ":00"]
            })]
          })]
        }), c.xrayAnalytics ? e.jsx("div", {
          className: "skeleton",
          style: {
            height: "200px",
            borderRadius: "12px"
          }
        }) : r?.workload_heatmap?.grid ? e.jsxs("div", {
          style: {
            overflowX: "auto"
          },
          children: [e.jsx("div", {
            style: {
              display: "flex",
              gap: "2px",
              marginLeft: "38px",
              marginBottom: "4px"
            },
            children: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map(t => e.jsx("div", {
              style: {
                width: "22px",
                fontSize: "8px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)",
                textAlign: "center",
                marginRight: t < 22 ? "24px" : 0
              },
              children: String(t).padStart(2, "0")
            }, t))
          }), r.workload_heatmap.grid.map((t, i) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "2px",
              marginBottom: "2px"
            },
            children: [e.jsx("span", {
              style: {
                width: "32px",
                fontSize: "11px",
                fontWeight: 800,
                color: "var(--md-text-secondary)",
                textAlign: "right",
                paddingRight: "4px"
              },
              children: t.dayLabel
            }), t.hours.map((n, s) => {
              const o = r.workload_heatmap.max_count || 1,
                a = n.count / o,
                u = n.count === 0 ? "rgba(0,0,0,0.03)" : a > .75 ? `rgba(239,68,68,${.3+a*.6})` : a > .5 ? `rgba(249,115,22,${.2+a*.5})` : a > .25 ? `rgba(139,92,246,${.15+a*.4})` : `rgba(139,92,246,${.05+a*.25})`;
              return e.jsx("div", {
                title: `${t.dayLabel} ${String(s).padStart(2,"0")}:00 - ${n.count} cases`,
                style: {
                  width: "20px",
                  height: "20px",
                  borderRadius: "3px",
                  background: u,
                  cursor: "pointer",
                  transition: "transform 0.15s",
                  fontSize: "7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: a > .5 ? "#fff" : "transparent",
                  fontWeight: 800
                },
                children: n.count > 0 ? n.count : ""
              }, s)
            })]
          }, i)), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "10px",
              marginLeft: "38px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "10px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: "Low"
            }), [.1, .3, .5, .75, 1].map((t, i) => e.jsx("div", {
              style: {
                width: "14px",
                height: "14px",
                borderRadius: "3px",
                background: t <= .25 ? "rgba(139,92,246,0.15)" : t <= .5 ? "rgba(139,92,246,0.35)" : t <= .75 ? "rgba(249,115,22,0.5)" : "rgba(239,68,68,0.75)"
              }
            }, i)), e.jsx("span", {
              style: {
                fontSize: "10px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: "High"
            })]
          })]
        }) : e.jsx("div", {
          style: {
            textAlign: "center",
            padding: "2rem",
            color: "var(--md-text-tertiary)"
          },
          children: "No heatmap data available"
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "20px"
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
              background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 900
            },
            children: "AI"
          }), "Requesting Departments"]
        }), e.jsx("p", {
          style: {
            margin: "-10px 0 14px",
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600
          },
          children: "Department Pattern (30D)"
        }), c.xrayAnalytics ? Array(5).fill(0).map((t, i) => e.jsx("div", {
          className: "skeleton",
          style: {
            height: "32px",
            marginBottom: "6px",
            borderRadius: "8px"
          }
        }, i)) : r?.dept_pattern?.length > 0 ? e.jsx("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          },
          children: r.dept_pattern.slice(0, 8).map((t, i) => {
            const n = ["#ef4444", "#f97316", "#8b5cf6", "#06b6d4", "#10b981", "#6366f1", "#ec4899", "#a855f7"],
              s = n[i % n.length];
            return e.jsxs("div", {
              children: [e.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "3px"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--md-text-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "60%"
                  },
                  children: t.name
                }), e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 900,
                    color: s
                  },
                  children: [t.count, " ", e.jsxs("span", {
                    style: {
                      fontWeight: 600,
                      color: "var(--md-text-tertiary)"
                    },
                    children: ["(", t.pct, "%)"]
                  })]
                })]
              }), e.jsx("div", {
                style: {
                  height: "6px",
                  background: "rgba(0,0,0,0.04)",
                  borderRadius: "3px"
                },
                children: e.jsx("div", {
                  style: {
                    height: "100%",
                    background: `linear-gradient(90deg, ${s}, ${s}90)`,
                    borderRadius: "3px",
                    width: `${t.pct}%`,
                    transition: "width 0.8s ease"
                  }
                })
              })]
            }, i)
          })
        }) : e.jsx("div", {
          style: {
            textAlign: "center",
            padding: "2rem",
            color: "var(--md-text-tertiary)"
          },
          children: "No department data available"
        })]
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 0.5fr 1fr",
        gap: "16px"
      },
      children: [e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "20px"
        },
        children: [e.jsxs("p", {
          style: {
            margin: "0 0 4px",
            fontSize: "15px",
            fontWeight: 900,
            color: "var(--md-text-primary)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          children: [e.jsx("span", {
            style: {
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 900
            },
            children: "AI"
          }), "TAT Predictor"]
        }), e.jsx("p", {
          style: {
            margin: "0 0 12px",
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600
          },
          children: "Wait time by procedure type (30D)"
        }), c.xrayAnalytics ? Array(4).fill(0).map((t, i) => e.jsx("div", {
          className: "skeleton",
          style: {
            height: "36px",
            marginBottom: "4px",
            borderRadius: "8px"
          }
        }, i)) : r?.tat_predictor?.length > 0 ? e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            maxHeight: "300px",
            overflowY: "auto"
          },
          className: "custom-scrollbar",
          children: [e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 60px 60px",
              gap: "6px",
              padding: "4px 8px",
              borderBottom: "1px solid var(--md-border)"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "10px",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                textTransform: "uppercase"
              },
              children: "Procedure"
            }), e.jsx("span", {
              style: {
                fontSize: "10px",
                fontWeight: 800,
                color: "#f59e0b",
                textAlign: "center",
                textTransform: "uppercase"
              },
              children: "Wait"
            }), e.jsx("span", {
              style: {
                fontSize: "10px",
                fontWeight: 800,
                color: l.primary,
                textAlign: "center",
                textTransform: "uppercase"
              },
              children: "TAT"
            })]
          }), r.tat_predictor.map((t, i) => e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 60px 60px",
              gap: "6px",
              padding: "6px 8px",
              borderRadius: "8px",
              background: i === 0 ? "rgba(139,92,246,0.04)" : "transparent",
              border: i === 0 ? "1px solid rgba(139,92,246,0.1)" : "1px solid transparent"
            },
            children: [e.jsxs("div", {
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
                children: t.item_name
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: [t.total_count, " cases"]
              })]
            }), e.jsx("div", {
              style: {
                textAlign: "center"
              },
              children: e.jsxs("span", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: t.overall_avg_wait <= 30 ? "#10b981" : t.overall_avg_wait <= 60 ? "#f59e0b" : "#ef4444"
                },
                children: [t.overall_avg_wait, "m"]
              })
            }), e.jsx("div", {
              style: {
                textAlign: "center"
              },
              children: e.jsx("span", {
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                  color: l.primary
                },
                children: t.overall_avg_tat > 0 ? `${t.overall_avg_tat}m` : "—"
              })
            })]
          }, i))]
        }) : e.jsx("div", {
          style: {
            textAlign: "center",
            padding: "2rem",
            color: "var(--md-text-tertiary)"
          },
          children: "No TAT data available"
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "20px",
          display: "flex",
          flexDirection: "column"
        },
        children: [e.jsxs("p", {
          style: {
            margin: "0 0 4px",
            fontSize: "15px",
            fontWeight: 900,
            color: "var(--md-text-primary)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          },
          children: [e.jsx("span", {
            style: {
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 900
            },
            children: "AI"
          }), "Priority"]
        }), e.jsx("p", {
          style: {
            margin: "0 0 16px",
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600
          },
          children: "Urgency distribution"
        }), c.xrayAnalytics ? e.jsx("div", {
          className: "skeleton",
          style: {
            height: "140px",
            borderRadius: "50%",
            width: "140px",
            margin: "0 auto"
          }
        }) : r?.priority_mix?.length > 0 ? e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            flex: 1,
            justifyContent: "center"
          },
          children: [e.jsxs("div", {
            style: {
              position: "relative",
              width: "120px",
              height: "120px"
            },
            children: [e.jsx("svg", {
              viewBox: "0 0 42 42",
              style: {
                width: "100%",
                height: "100%",
                transform: "rotate(-90deg)"
              },
              children: (() => {
                let t = 0;
                return r.priority_mix.map((i, n) => {
                  const s = i.pct,
                    o = `${s} ${100-s}`,
                    a = e.jsx("circle", {
                      cx: "21",
                      cy: "21",
                      r: "15.915",
                      fill: "transparent",
                      stroke: i.color,
                      strokeWidth: "4",
                      strokeDasharray: o,
                      strokeDashoffset: -t,
                      style: {
                        transition: "stroke-dasharray 0.8s ease"
                      }
                    }, n);
                  return t += s, a
                })
              })()
            }), e.jsxs("div", {
              style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center"
              },
              children: [e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 950,
                  color: "var(--md-text-primary)"
                },
                children: r.priority_mix.reduce((t, i) => t + i.count, 0)
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "8px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "total"
              })]
            })]
          }), e.jsx("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              width: "100%"
            },
            children: r.priority_mix.map((t, i) => e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                justifyContent: "space-between"
              },
              children: [e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                },
                children: [e.jsx("div", {
                  style: {
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: t.color
                  }
                }), e.jsx("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--md-text-secondary)"
                  },
                  children: t.label
                })]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 900,
                  color: t.color
                },
                children: [t.pct, "%"]
              })]
            }, i))
          })]
        }) : e.jsx("div", {
          style: {
            textAlign: "center",
            padding: "2rem",
            color: "var(--md-text-tertiary)"
          },
          children: "No data available"
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "20px"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "4px"
          },
          children: [e.jsxs("div", {
            children: [e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "15px",
                fontWeight: 900,
                color: "var(--md-text-primary)",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              },
              children: [e.jsx("span", {
                style: {
                  background: "linear-gradient(135deg, #10b981, #06b6d4)",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 900
                },
                children: "AI"
              }), "Hourly Forecast"]
            }), e.jsx("p", {
              style: {
                margin: "4px 0 0",
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: "Actual vs Predicted (today)"
            })]
          }), r?.hourly_forecast && (() => {
            const t = r.predicted_daily_total || r.hourly_forecast.reduce((s, o) => s + (o.predicted || 0), 0),
              n = Math.max(0, t - p);
            return e.jsxs("div", {
              style: {
                textAlign: "right",
                background: "rgba(16,185,129,0.06)",
                padding: "4px 10px",
                borderRadius: "8px",
                border: "1px solid rgba(16,185,129,0.15)"
              },
              children: [e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#10b981",
                  textTransform: "uppercase"
                },
                children: "Predicted"
              }), e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 900,
                  color: "#10b981"
                },
                children: ["~", t, " ", e.jsxs("span", {
                  style: {
                    fontSize: "11px",
                    fontWeight: 600
                  },
                  children: ["(", n > 0 ? `~${n} remaining` : "target met", ")"]
                })]
              })]
            })
          })()]
        }), c.xrayAnalytics ? e.jsx("div", {
          className: "skeleton",
          style: {
            height: "180px",
            borderRadius: "12px"
          }
        }) : r?.hourly_forecast ? e.jsx("div", {
          style: {
            display: "flex",
            alignItems: "flex-end",
            gap: "2px",
            height: "180px",
            paddingTop: "12px"
          },
          children: r.hourly_forecast.filter(t => t.hour >= 6 && t.hour <= 22).map((t, i) => {
            const n = new Date().getHours(),
              s = L,
              o = s.find(S => S.hour === t.hour),
              a = o ? o.count : 0,
              u = t.hour <= n,
              h = u ? a : t.predicted,
              A = Math.max(...r.hourly_forecast.map(S => S.predicted || 0), ...s.map(S => S.count || 0), 1),
              j = h / A * 140;
            return e.jsxs("div", {
              style: {
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px"
              },
              children: [e.jsx("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  height: "150px",
                  width: "100%"
                },
                children: u ? e.jsx("div", {
                  title: `${t.label}: actual ${a} cases`,
                  style: {
                    width: "85%",
                    height: `${j}px`,
                    borderRadius: "3px 3px 0 0",
                    background: `linear-gradient(180deg, ${l.primary}, ${l.secondary})`,
                    minHeight: j > 0 ? "4px" : 0
                  }
                }) : e.jsx("div", {
                  title: `${t.label}: predicted ${t.predicted} cases`,
                  style: {
                    width: "85%",
                    height: `${j}px`,
                    borderRadius: "3px 3px 0 0",
                    background: "repeating-linear-gradient(45deg, rgba(16,185,129,0.2), rgba(16,185,129,0.2) 2px, rgba(16,185,129,0.08) 2px, rgba(16,185,129,0.08) 4px)",
                    border: "1px dashed rgba(16,185,129,0.4)",
                    minHeight: j > 0 ? "4px" : 0
                  }
                })
              }), e.jsx("span", {
                style: {
                  fontSize: "7px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: t.hour
              })]
            }, i)
          })
        }) : e.jsx("div", {
          style: {
            textAlign: "center",
            padding: "2rem",
            color: "var(--md-text-tertiary)"
          },
          children: "No forecast data available"
        }), e.jsxs("div", {
          style: {
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            marginTop: "8px"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "4px"
            },
            children: [e.jsx("div", {
              style: {
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background: `linear-gradient(180deg, ${l.primary}, ${l.secondary})`
              }
            }), e.jsx("span", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "Actual (Today)"
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "4px"
            },
            children: [e.jsx("div", {
              style: {
                width: "10px",
                height: "10px",
                borderRadius: "2px",
                background: "repeating-linear-gradient(45deg, rgba(16,185,129,0.3), rgba(16,185,129,0.3) 2px, transparent 2px, transparent 4px)",
                border: "1px dashed rgba(16,185,129,0.5)"
              }
            }), e.jsx("span", {
              style: {
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "Predicted (AI)"
            })]
          })]
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
          }), " Strategic Indicators"]
        }), e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px"
          },
          children: d.strategicKPIs.length > 0 ? d.strategicKPIs.map((t, i) => e.jsxs("div", {
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
          }, i)) : e.jsx("div", {
            style: {
              gridColumn: "span 2",
              textAlign: "center",
              padding: "3rem",
              color: "var(--md-text-tertiary)",
              fontSize: "13px"
            },
            children: c.xrayAnalytics ? "Loading Strategic Dashboard..." : "No Data Available"
          })
        })]
      }), e.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "20px",
          borderLeft: `5px solid ${d.urgencyColor}`
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
              background: d.urgencyColor,
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
          children: d.problems.length > 0 ? d.problems.map((t, i) => e.jsxs("div", {
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
                children: "💡"
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
          }, i)) : e.jsxs("div", {
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
              children: "All indicators are within quality and safety standards"
            })]
          })
        })]
      })]
    }), r && (() => {
      const t = r,
        i = t.p90_wait_time ?? 0,
        n = t.wait_sla_pct ?? 0,
        s = t.completion_rate ?? 0,
        o = t.rpi ?? 0,
        a = t.avg_revenue_per_visit ?? 0,
        u = new Date().toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short"
        });
      return e.jsx(ie, {
        kpis: [{
          label: "P90 Wait Time",
          thLabel: "P90 Wait Time (Percentile 90)",
          value: `${i}m`,
          color: i < 45 ? "#10b981" : i < 75 ? "#f59e0b" : "#f43f5e",
          icon: "⚡",
          sub: i < 45 ? "Excellent" : i < 75 ? "Moderate" : "Critical",
          desc: `90% of patients wait no more than ${i} minutes`,
          meaning: "Time within which 90% of patients receive service (P90). Better reflects worst-case patient experience than averages.",
          calc: "PERCENTILE(wait_times, 0.90) -- computed from all visits over 30 days",
          dataSource: "service_time (HOSxP XE)",
          period: `30 days through ${u}`,
          target: "< 45 min",
          benchmark: "Community hospital: <60m | Private: <30m",
          aiTip: i < 45 ? "P90 excellent -- most patients receive prompt service" : "P90 elevated -- investigate peak-hour bottlenecks and increase pre-scheduling"
        }, {
          label: "Wait SLA Compliance",
          thLabel: "Wait SLA Compliance (<=30m)",
          value: `${n}%`,
          color: n > 85 ? "#10b981" : n > 70 ? "#f59e0b" : "#f43f5e",
          icon: "⏱️",
          sub: n > 85 ? "Passing" : "Below Target",
          desc: `${n}% of patients wait 30 minutes or less`,
          meaning: "Percentage of patients served within the 30-minute SLA. Measures queue management effectiveness.",
          calc: "(visits with wait <= 30min / total visits) x 100",
          dataSource: "service_time (HOSxP XE)",
          period: "30 days rolling",
          target: ">= 85%",
          benchmark: "MoPH: >=80% | HA: >=85%",
          aiTip: n > 85 ? "Queue management excellent -- maintain standards" : "Below target -- implement appointment scheduling and load balancing"
        }, {
          label: "Completion Rate",
          thLabel: "Case Completion Rate",
          value: `${s}%`,
          color: s > 90 ? "#10b981" : s > 80 ? "#f59e0b" : "#f43f5e",
          icon: "✅",
          sub: s > 90 ? "Excellent" : "Needs Improvement",
          desc: `${s}% of patients complete their imaging as planned`,
          meaning: "Proportion of patients who complete the full imaging workflow (no dropout). Reflects service quality.",
          calc: "(Completed visits / Total registered visits) x 100",
          dataSource: "ovst + vn_stat (HOSxP XE)",
          period: "30 days rolling",
          target: ">= 90%",
          benchmark: "Community hospital: >=85% | HA: >=90%",
          aiTip: s > 90 ? "Low dropout -- patients are satisfied" : "High dropout -- analyze root cause (long wait? cost? unclear instructions?)"
        }, {
          label: "RPI Score",
          thLabel: "Radiology Performance Index",
          value: `${o}`,
          color: o >= 80 ? "#10b981" : o >= 60 ? "#f59e0b" : "#f43f5e",
          icon: "🎯",
          sub: o >= 80 ? "Optimal" : o >= 60 ? "Fair" : "Critical",
          desc: `Radiology Performance Index: ${o}/100`,
          meaning: "Composite radiology performance index. Calculated from Wait Time + Completion Rate + Revenue Profitability.",
          calc: "W(0.4) x Wait_Score + W(0.4) x Completion + W(0.2) x Revenue",
          dataSource: "AI Composite (HOSxP XE)",
          period: `Computed ${u}`,
          target: ">= 80",
          benchmark: "BCH Internal >=75 | Excellence >=85",
          aiTip: o >= 80 ? "RPI high -- radiology clinic performing well across all dimensions" : "RPI low -- check lowest-scoring component for targeted improvement"
        }, {
          label: "Revenue / Visit",
          thLabel: "Average Revenue per Visit",
          value: `${a.toLocaleString()}`,
          color: "#8b5cf6",
          icon: "💰",
          desc: "Average revenue per radiology visit",
          meaning: "Average revenue per imaging visit. Reflects service mix (Plain Film vs CT/MRI) and billing completeness.",
          calc: "Total Revenue (30d) / Total Visits (30d)",
          dataSource: "xray_head.total_price (HOSxP XE)",
          period: "30 days rolling",
          target: ">= 400 THB",
          benchmark: "Plain Film: 150-300 | CT: 2,000-5,000 | MRI: 5,000+",
          aiTip: a >= 400 ? "Good service mix with sufficient advanced imaging studies" : "Low revenue/visit -- check billing completeness and service mix"
        }]
      })
    })(), e.jsxs("div", {
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
            children: "Financial Performance & Fiscal Trends"
          }), e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: "Revenue comparison across fiscal years"
          })]
        }), e.jsx("div", {
          style: {
            display: "flex",
            gap: "12px"
          },
          children: y?.fiscal_years?.slice(-2).map((t, i) => e.jsxs("div", {
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
                color: i === 1 ? l.primary : "var(--md-text-secondary)"
              },
              children: ["฿", (t.total_revenue / 1e6).toFixed(2), "M"]
            })]
          }, i))
        })]
      }), y?.fiscal_years ? e.jsx("div", {
        style: {
          height: "320px",
          width: "100%"
        },
        children: e.jsx(ae, {
          width: "100%",
          height: "100%",
          children: e.jsxs(ne, {
            data: N,
            margin: {
              top: 10,
              right: 10,
              left: -10,
              bottom: 0
            },
            children: [e.jsx("defs", {
              children: e.jsxs("linearGradient", {
                id: "xrayBarGrad",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [e.jsx("stop", {
                  offset: "0%",
                  stopColor: l.primary,
                  stopOpacity: 1
                }), e.jsx("stop", {
                  offset: "100%",
                  stopColor: l.secondary,
                  stopOpacity: 1
                })]
              })
            }), e.jsx(oe, {
              strokeDasharray: "3 3",
              vertical: !1,
              stroke: "rgba(0,0,0,0.05)"
            }), e.jsx(se, {
              dataKey: "month",
              tick: {
                fontSize: 11,
                fontWeight: 700,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(le, {
              tick: {
                fontSize: 10,
                fontWeight: 600,
                fill: "var(--md-text-tertiary)"
              },
              axisLine: !1,
              tickLine: !1,
              tickFormatter: t => `${(t/1e6).toFixed(1)}M`
            }), e.jsx(de, {
              cursor: {
                fill: "rgba(139,92,246,0.05)"
              },
              contentStyle: {
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                padding: "12px"
              }
            }), y.fiscal_years.map((t, i) => {
              const n = i === y.fiscal_years.length - 1;
              return e.jsx(ce, {
                dataKey: `fy${i}`,
                name: t.fiscal_label,
                fill: n ? "url(#xrayBarGrad)" : "#cbd5e1",
                radius: [6, 6, 0, 0],
                barSize: n ? 28 : 20
              }, i)
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
            children: c.xrayRevenueFiscal ? "Loading financial analytics..." : "Financial Data Stream Offline"
          })]
        })
      })]
    }), e.jsx(ge, {
      data: r?.modality_breakdown,
      loading: c.xrayAnalytics
    }), e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "24px"
      },
      children: [e.jsx("p", {
        style: {
          margin: "0 0 20px 0",
          fontSize: "15px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "Top Clinical Diagnoses & Procedures (30D)"
      }), e.jsxs("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "12px"
        },
        children: [r?.top_diagnoses?.slice(0, 6).map((t, i) => e.jsxs("div", {
          style: {
            padding: "12px 16px",
            background: "var(--md-surface)",
            borderRadius: "12px",
            border: "1px solid var(--md-border)",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          },
          children: [e.jsx("div", {
            style: {
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#8b5cf610",
              color: "#8b5cf6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: "12px"
            },
            children: i + 1
          }), e.jsxs("div", {
            style: {
              flex: 1,
              minWidth: 0
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "13px",
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              },
              children: t.name || "Unknown X-Ray"
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                color: "var(--md-text-tertiary)"
              },
              children: t.code || "Radiology Item"
            })]
          }), e.jsxs("div", {
            style: {
              textAlign: "right"
            },
            children: [e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "14px",
                fontWeight: 800,
                color: l.primary
              },
              children: t.count
            }), e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: "Requests"
            })]
          })]
        }, i)), (!r?.top_diagnoses || r.top_diagnoses.length === 0) && !c.xrayAnalytics && e.jsx("div", {
          style: {
            gridColumn: "1/-1",
            textAlign: "center",
            padding: "2rem",
            color: "var(--md-text-tertiary)"
          },
          children: "No diagnosis data available for this period"
        })]
      })]
    }), e.jsx(D, {
      name: "AI Server Insights",
      children: e.jsx(re, {
        data: f.xrayAI,
        theme: "xray",
        title: "AI Radiology Intelligence"
      })
    })]
  })
}
const xe = {
    "Plain Film": {
      icon: "🩻",
      color: "#8b5cf6"
    },
    "CT Scan": {
      icon: "🔬",
      color: "#f43f5e"
    },
    MRI: {
      icon: "🧲",
      color: "#0ea5e9"
    },
    Ultrasound: {
      icon: "🔊",
      color: "#10b981"
    },
    "Fluoroscopy / Special": {
      icon: "⚡",
      color: "#f59e0b"
    }
  },
  F = {
    on_time: {
      color: "#10b981",
      label: "On Time"
    },
    delayed: {
      color: "#f59e0b",
      label: "Delayed"
    },
    critical: {
      color: "#f43f5e",
      label: "Critical"
    },
    no_data: {
      color: "#94a3b8",
      label: "No Data"
    }
  };

function ge({
  data: f,
  loading: W
}) {
  if (W) return e.jsx("div", {
    className: "skeleton",
    style: {
      height: "160px",
      borderRadius: "16px"
    }
  });
  if (!f || f.length === 0) return null;
  const m = f.reduce((r, y) => r + y.count, 0);
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
          background: "linear-gradient(180deg, #8b5cf6, #7c3aed)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)"
        },
        children: "Modality Breakdown + Radiologist Report TAT"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(139,92,246,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "30 days | ACR Guidelines"
      })]
    }), e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "10px"
      },
      children: f.map((r, y) => {
        const c = xe[r.modality] || {
            icon: "📊",
            color: "#94a3b8"
          },
          p = F[r.tat_status] || F.no_data,
          w = m > 0 ? Math.round(r.count / m * 100) : 0;
        return e.jsxs("div", {
          className: "glass-card",
          style: {
            padding: "1rem 1.25rem",
            borderLeft: `3px solid ${c.color}`
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px"
            },
            children: [e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "18px"
                },
                children: c.icon
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: c.color
                },
                children: r.modality
              })]
            }), e.jsx("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: p.color,
                background: `${p.color}12`,
                padding: "2px 6px",
                borderRadius: "6px"
              },
              children: p.label
            })]
          }), e.jsx("p", {
            style: {
              margin: "0 0 4px",
              fontSize: "22px",
              fontWeight: 900,
              color: c.color
            },
            children: r.count.toLocaleString()
          }), e.jsxs("p", {
            style: {
              margin: "0 0 8px",
              fontSize: "11px",
              color: "var(--md-text-tertiary)",
              fontWeight: 700
            },
            children: [w, "% of total | ", r.completion_rate, "% done"]
          }), e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px"
            },
            children: [e.jsxs("div", {
              style: {
                padding: "6px",
                borderRadius: "6px",
                background: "rgba(203,213,225,.08)",
                textAlign: "center"
              },
              children: [e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "var(--md-text-primary)"
                },
                children: [r.avg_wait_min || "—", e.jsx("span", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "m"
                })]
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: "Wait (shoot)"
              })]
            }), e.jsxs("div", {
              style: {
                padding: "6px",
                borderRadius: "6px",
                background: `${p.color}08`,
                textAlign: "center"
              },
              children: [e.jsxs("p", {
                style: {
                  margin: 0,
                  fontSize: "13px",
                  fontWeight: 800,
                  color: p.color
                },
                children: [r.avg_tat_min || "—", e.jsx("span", {
                  style: {
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "m"
                })]
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: "TAT (report)"
              })]
            })]
          }), e.jsxs("p", {
            style: {
              margin: "6px 0 0",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: ["Target TAT: ", "≤", r.tat_target_min, "m"]
          })]
        }, y)
      })
    })]
  })
}
const ue = K.memo(pe);
export {
  ue as
  default
};