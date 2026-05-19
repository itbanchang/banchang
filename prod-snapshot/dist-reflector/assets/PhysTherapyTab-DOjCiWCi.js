import {
  R as M,
  r as F,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  b as D,
  a as B,
  E,
  o as H,
  M as N,
  S as I,
  h as O,
  g as U
} from "./shared-ui-OVDEF1.js";
import {
  R as k,
  c as L,
  a as T,
  X as W,
  Y as w,
  T as z,
  B as P,
  e as A,
  C as q,
  b as V
} from "./vendor-charts-C5q2M-g3.js";

function G({
  today: S,
  analytics: $,
  loading: d
}) {
  if (d) return e.jsx("div", {
    className: "glass-card",
    style: {
      padding: "1.25rem 1.5rem"
    },
    children: e.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      },
      children: [e.jsx("div", {
        className: "skeleton",
        style: {
          height: "12px",
          width: "120px"
        }
      }), e.jsx("div", {
        className: "skeleton",
        style: {
          height: "60px",
          borderRadius: "10px"
        }
      })]
    })
  });
  const j = S?.total ?? 0,
    f = S?.completed ?? 0,
    n = S?.waiting ?? 0,
    t = $?.avg_wait_time ?? 0,
    i = $?.peak_hour,
    o = new Date().getHours(),
    y = i && Math.abs(i.hour - o) <= 1,
    u = y ? Math.round(t * 1.3) : t,
    b = n === 0 ? "empty" : n <= 3 ? "normal" : n <= 8 ? "busy" : "critical",
    l = {
      empty: {
        color: "#10b981",
        label: "ว่าง",
        icon: "✅"
      },
      normal: {
        color: "#0ea5e9",
        label: "ปกติ",
        icon: "🟢"
      },
      busy: {
        color: "#f59e0b",
        label: "ยุ่ง",
        icon: "🟡"
      },
      critical: {
        color: "#f43f5e",
        label: "วิกฤต",
        icon: "🔴"
      }
    } [b],
    c = (S?.hourly || []).filter(a => a.count > 0),
    s = Math.max(...c.map(a => a.count), 1);
  return e.jsxs("div", {
    className: "glass-card",
    style: {
      padding: "1.25rem 1.5rem"
    },
    children: [e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px"
        },
        children: [e.jsx("div", {
          style: {
            width: "3px",
            height: "16px",
            background: `linear-gradient(180deg, ${l.color}, ${l.color}88)`,
            borderRadius: "99px"
          }
        }), e.jsx("span", {
          style: {
            fontSize: "13px",
            fontWeight: 800,
            color: "var(--md-text-primary)"
          },
          children: "⏳ Waitlist Management — วันนี้"
        })]
      }), e.jsxs("span", {
        style: {
          fontSize: "12px",
          fontWeight: 700,
          padding: "2px 10px",
          borderRadius: "99px",
          background: `${l.color}15`,
          color: l.color,
          border: `1px solid ${l.color}25`
        },
        children: [l.icon, " ", l.label, " · ", n, " รอ"]
      })]
    }), e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "8px",
        marginBottom: "1rem"
      },
      children: [{
        label: "รับบริการทั้งหมด",
        value: j,
        color: "#0ea5e9",
        unit: "ราย"
      }, {
        label: "เสร็จสิ้นแล้ว",
        value: f,
        color: "#10b981",
        unit: "ราย"
      }, {
        label: "รอรับบริการ",
        value: n,
        color: l.color,
        unit: "ราย"
      }, {
        label: "เวลารอ Est.",
        value: u,
        color: u <= 20 ? "#10b981" : u <= 30 ? "#f59e0b" : "#f43f5e",
        unit: "min"
      }].map((a, h) => e.jsxs("div", {
        style: {
          padding: "10px 12px",
          borderRadius: "10px",
          background: `${a.color}08`,
          border: `1px solid ${a.color}20`,
          textAlign: "center"
        },
        children: [e.jsx("p", {
          style: {
            margin: "0 0 3px",
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em"
          },
          children: a.label
        }), e.jsx("p", {
          style: {
            margin: 0,
            fontSize: "22px",
            fontWeight: 900,
            color: a.color,
            lineHeight: 1
          },
          children: a.value
        }), e.jsx("p", {
          style: {
            margin: "2px 0 0",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)"
          },
          children: a.unit
        })]
      }, h))
    }), j > 0 && e.jsxs("div", {
      style: {
        marginBottom: "12px"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px"
        },
        children: [e.jsxs("span", {
          style: {
            fontSize: "12px",
            fontWeight: 700,
            color: "#10b981"
          },
          children: ["✅ สำเร็จ ", f, " (", Math.round(f / j * 100), "%)"]
        }), e.jsxs("span", {
          style: {
            fontSize: "12px",
            fontWeight: 700,
            color: l.color
          },
          children: ["⏳ รอ ", n, " ราย"]
        })]
      }), e.jsxs("div", {
        style: {
          height: "8px",
          borderRadius: "99px",
          overflow: "hidden",
          background: `${l.color}15`,
          display: "flex"
        },
        children: [e.jsx("div", {
          style: {
            width: `${Math.min(100,f/j*100)}%`,
            background: "linear-gradient(90deg, #10b981, #059669)",
            borderRadius: "99px 0 0 99px",
            transition: "width 0.8s ease"
          }
        }), e.jsx("div", {
          style: {
            flex: 1,
            background: `${l.color}20`,
            borderRadius: "0 99px 99px 0"
          }
        })]
      })]
    }), c.length > 0 && e.jsxs("div", {
      children: [e.jsxs("p", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          color: "var(--md-text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          marginBottom: "6px"
        },
        children: ["🕐 รูปแบบผู้ป่วยวันนี้ (รายชั่วโมง)", y && e.jsx("span", {
          style: {
            marginLeft: "8px",
            color: "#f43f5e",
            fontWeight: 800
          },
          children: "⚡ ช่วง Peak ตอนนี้!"
        })]
      }), e.jsx("div", {
        style: {
          display: "flex",
          alignItems: "flex-end",
          gap: "2px",
          height: "44px"
        },
        children: c.map((a, h) => {
          const r = Math.max(a.count / s * 100, 4),
            p = a.hour === o,
            m = i && a.hour === i.hour;
          return e.jsxs("div", {
            title: `${a.label}: ${a.count} ราย`,
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "2px"
            },
            children: [e.jsx("div", {
              style: {
                width: "100%",
                height: `${r}%`,
                background: p ? "#0ea5e9" : m ? "#f43f5e" : "rgba(14,165,233,.3)",
                borderRadius: "2px 2px 0 0",
                transition: "height 0.6s ease"
              }
            }), e.jsx("span", {
              style: {
                fontSize: "8px",
                color: p ? "#0ea5e9" : "var(--md-text-tertiary)",
                fontWeight: p ? 800 : 500
              },
              children: a.hour
            })]
          }, h)
        })
      })]
    }), y && e.jsx("div", {
      style: {
        marginTop: "10px",
        padding: "8px 12px",
        borderRadius: "8px",
        background: "rgba(245,158,11,.06)",
        border: "1px solid rgba(245,158,11,.2)"
      },
      children: e.jsxs("p", {
        style: {
          margin: 0,
          fontSize: "12px",
          fontWeight: 700,
          color: "#f59e0b"
        },
        children: ["⚡ ขณะนี้อยู่ช่วง Peak Hour (", i.label, ") — เฉลี่ย ", i.avg, " ราย/วัน · เวลารอ Est. ≈ ", u, " min"]
      })
    })]
  })
}

function Y({
  analytics: S,
  loading: $
}) {
  if ($ || !S) return null;
  const d = S,
    j = d.avg_wait_time ?? 0,
    f = d.completion_rate ?? 0,
    n = d.dropout_count ?? 0,
    t = d.revisit_rate ?? 0,
    i = d.avg_revenue_per_visit ?? 0,
    o = d.total_revenue ?? 0,
    y = d.avg_daily_visits ?? 0,
    u = d.ppi ?? 0,
    b = d.wait_sla_pct ?? 0,
    g = d.wait_over_30m ?? 0,
    l = d.peak_hour?.label || "—",
    c = d.monthly_trend || [],
    s = c[c.length - 1],
    a = c[c.length - 2],
    h = s && a ? (s.visits || 0) - (a.visits || 0) : 0,
    r = s && a ? (s.total_rev || 0) - (a.total_rev || 0) : 0,
    p = h > 0 ? "📈 เพิ่มขึ้น" : h < 0 ? "📉 ลดลง" : "➡️ คงที่",
    m = n * i,
    _ = [{
      title: "PT Operational Intelligence",
      icon: "⚙️",
      priority: j > 30 ? "HIGH" : j > 20 ? "MEDIUM" : "LOW",
      summary: j > 20 ? `เวลารอ ${j} min เกินมาตรฐาน — SLA ≤30min ผ่านเพียง ${b}% · Peak: ${l}` : `Flow ดี — เวลารอ ${j} min · SLA pass ${b}% · Peak: ${l}`,
      analysis: `ผู้ป่วยเฉลี่ย ${y} ราย/วัน · ${g} ครั้งรอ >30min · Trend: ${p} (${Math.abs(h)} ราย MoM) · PPI ${u}/100`,
      recommendation: j > 20 ? `(1) Appointment scheduling แทน Walk-in (2) Buffer time ระหว่าง session (3) เพิ่ม Physio ช่วง Peak ${l} เป้าหมาย: Wait ≤15 min` : "(1) Monitor SLA weekly (2) Appointment system ต่อเนื่อง (3) Capacity plan ล่วงหน้า 1 เดือน",
      confidence: j > 20 ? 91 : 87,
      gradient: "#0ea5e9",
      gradientFrom: "rgba(14,165,233,.08)",
      gradientTo: "rgba(2,132,199,.03)",
      borderColor: "rgba(14,165,233,.25)"
    }, {
      title: "Rehab Quality Intelligence",
      icon: "🏥",
      priority: f < 85 ? "HIGH" : f < 95 ? "MEDIUM" : "LOW",
      summary: f < 90 ? `Completion ${f}% ต่ำกว่าเป้า 95% — Dropout ${n} ราย · Revisit ${t}%` : `Completion ${f}% ดีเยี่ยม — Dropout เพียง ${n} ราย · Revisit ${t}%`,
      analysis: `Dropout ${n} ราย × ฿${i.toLocaleString()}/visit = Revenue loss ≈ ฿${m.toLocaleString()} · Revisit ${t}% (แยก Planned vs Unplanned)`,
      recommendation: f < 90 ? "(1) SMS เตือนก่อนนัด 24h (2) Home exercise program ทดแทน session สั้น (3) Flexible schedule บ่าย/เย็น (4) เป้าหมาย: Completion ≥95%" : "(1) Patient satisfaction survey (2) Audit Revisit cases (3) Outcome measurement: ROM/Pain score ก่อน-หลัง treatment",
      confidence: 88,
      gradient: "#10b981",
      gradientFrom: "rgba(16,185,129,.08)",
      gradientTo: "rgba(5,150,105,.03)",
      borderColor: "rgba(16,185,129,.25)"
    }, {
      title: "PT Financial Intelligence",
      icon: "💰",
      priority: i < 400 ? "HIGH" : i < 600 ? "MEDIUM" : "LOW",
      summary: i < 400 ? `Revenue/Visit ฿${i.toLocaleString()} ต่ำกว่าเกณฑ์ (≥฿400) — ตรวจสอบ billing ครบถ้วน` : `Revenue/Visit ฿${i.toLocaleString()} · รายได้รวม ฿${(o/1e3).toFixed(0)}k/30d · ${r>=0?"+":""}฿${(Math.abs(r)/1e3).toFixed(0)}k MoM`,
      analysis: `รายได้รวม ฿${(o/1e3).toFixed(0)}k / 30 วัน · ${(d.total_visits||0).toLocaleString()} visits · Max ฿${(d.max_revenue||0).toLocaleString()}/visit · Daily ฿${(d.daily_revenue||0).toLocaleString()}`,
      recommendation: i < 400 ? "(1) Audit ทุก Modality charge (TENS/US/Laser) (2) Rehab packages: PT+Hydro+Equipment (3) Verify procedure coding (4) เป้าหมาย: Rev/Visit ≥฿500" : "(1) Sports medicine program (2) Specialized packages: Neuro/Ortho/Sports (3) Referral ขยาย จาก Ortho/Neuro/Surgery (4) Extended hours",
      confidence: 84,
      gradient: "#f59e0b",
      gradientFrom: "rgba(245,158,11,.08)",
      gradientTo: "rgba(217,119,6,.03)",
      borderColor: "rgba(245,158,11,.25)"
    }, {
      title: "Patient Demographics Intelligence",
      icon: "👥",
      priority: (d.elderly_pct ?? 0) > 50 ? "MEDIUM" : "LOW",
      summary: `Unique patients ${d.unique_patients??0} (30d) · Avg ${y} ราย/วัน · ${(d.elderly_pct??0)>40?"ผู้สูงอายุสัดส่วนสูง ต้องปรับ Protocol":"สัดส่วนผู้ป่วยสมดุล"}`,
      analysis: `${d.unique_patients??0} unique patients จาก ${(d.total_visits??0).toLocaleString()} visits · Revisit ${t}% · ${(d.elderly_pct??0)>40?"Elderly-dominant group ต้องการ Gentle exercises + Longer sessions":"Mixed age group — จัดกลุ่ม Treatment protocol ตาม Age"} · Dropout ${n} ราย (${i>0?`Rev loss ≈ ฿${m.toLocaleString()}`:"—"})`,
      recommendation: (d.elderly_pct ?? 0) > 40 ? "(1) Elderly-adapted PT protocol (2) Home exercise video program (3) Caregiver training (4) Priority queue สำหรับผู้สูงอายุ (5) Fall prevention program" : "(1) Segment patients by condition: Ortho/Neuro/Sports (2) Group exercise class ลดต้นทุนต่อหัว (3) Outcome tracking: ROM/Pain score per visit",
      confidence: 82,
      gradient: "#8b5cf6",
      gradientFrom: "rgba(139,92,246,.08)",
      gradientTo: "rgba(109,40,217,.03)",
      borderColor: "rgba(139,92,246,.25)"
    }];
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
          background: "linear-gradient(180deg, #7c3aed, #6d28d9)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🧠 AI Intelligence Module — กายภาพบำบัด"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(124,58,237,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "Rule-based · 30d data"
      })]
    }), e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
      },
      children: _.map((v, C) => e.jsx(U, {
        title: v.title,
        icon: v.icon,
        priority: v.priority,
        summary: v.summary,
        analysis: v.analysis,
        recommendation: v.recommendation,
        confidence: v.confidence,
        lastUpdated: "30d avg",
        gradient: v.gradient,
        gradientFrom: v.gradientFrom,
        gradientTo: v.gradientTo,
        borderColor: v.borderColor
      }, C))
    })]
  })
}

function K() {
  const S = D(t => ({
      ptToday: t.ptToday,
      ptAnalytics: t.ptAnalytics,
      loading: t.loading,
      ptRevenueFiscal: t.ptRevenueFiscal,
      phystherapyAI: t.phystherapyAI
    })),
    {
      fetchData: $
    } = B(),
    d = S.ptToday,
    j = S.ptAnalytics,
    f = S.loading;
  F.useEffect(() => {
    $("ptToday", "/api/physicaltherapy/today"), $("ptAnalytics", "/api/physicaltherapy/analytics"), $("ptRevenueFiscal", "/api/physicaltherapy/revenue-fiscal");
    const t = setTimeout(() => $("phystherapyAI", "/api/ai/phystherapy/optimization"), 300);
    return () => clearTimeout(t)
  }, [$]);
  const n = d || {};
  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    children: [e.jsx(E, {
      title: "AI Executive Quick Summary — กายภาพบำบัด",
      subtitle: "Sessions · Waiting · Wait Time · Completion",
      badge: "📐 Quick Summary",
      accentColor: "#e11d48",
      headerGradient: "linear-gradient(135deg, rgba(225,29,72,.10), rgba(244,63,94,.05))",
      narrative: H(S)
    }), !f.ptToday && d && (() => {
      const t = d,
        i = t.total ?? 0,
        o = t.completed ?? 0,
        y = t.waiting ?? 0,
        u = i > 0 ? Math.round(o / i * 100) : 0,
        b = t.yesterday_total ?? t.yesterday ?? 0,
        g = b > 0 ? Math.round((i - b) / b * 100) : 0;
      return e.jsx(N, {
        columns: 4,
        gap: "10px",
        metrics: [{
          label: "ผู้ป่วยวันนี้",
          value: i,
          icon: "🏋️",
          status: i > 0 ? "success" : "neutral",
          trend: g !== 0 ? `${g>0?"+":""}${g}% vs เมื่อวาน` : void 0
        }, {
          label: "เสร็จสิ้น",
          value: `${u}%`,
          icon: "✅",
          status: u >= 80 ? "success" : u >= 50 ? "warning" : "danger"
        }, {
          label: "รอรับบริการ",
          value: y,
          unit: "ราย",
          icon: "⏳",
          status: y <= 3 ? "success" : y <= 8 ? "warning" : "danger"
        }, {
          label: "Unique Patients",
          value: t.unique_patients ?? 0,
          unit: "คน",
          icon: "👥",
          status: "info"
        }, {
          label: "ผู้สูงอายุ",
          value: t.elderly ?? 0,
          unit: "ราย",
          icon: "👴",
          status: (t.elderly ?? 0) > 10 ? "warning" : "success"
        }, {
          label: "เพศชาย",
          value: t.male ?? 0,
          unit: "คน",
          icon: "♂️",
          status: "info"
        }, {
          label: "เพศหญิง",
          value: t.female ?? 0,
          unit: "คน",
          icon: "♀️",
          status: "info"
        }, {
          label: "สัดส่วนเสร็จ",
          value: `${o}/${i}`,
          icon: "📊",
          status: u >= 80 ? "success" : "warning"
        }]
      })
    })(), e.jsx(I, {
      name: "Revenue Fiscal Summary",
      children: !f.ptRevenueFiscal && S.ptRevenueFiscal && (() => {
        const i = S.ptRevenueFiscal?.fiscal_years || [];
        if (i.length < 2) return null;
        const o = i[i.length - 1],
          y = i[i.length - 2],
          u = o.total_revenue || 0,
          b = y.total_revenue || 0,
          g = o.comparable_revenue ?? u,
          l = y.comparable_revenue ?? b,
          c = l > 0 ? (g - l) / l * 100 : 0,
          s = o.avg_revenue_per_visit || 0;
        let a = "",
          h = [];
        return c >= 5 ? (a = "🟢 แนวโน้มการเติบโตดีเยี่ยม โอกาสขยาย Service Line", h = [{
          tag: "Sports Medicine",
          text: "ขยายบริการ Sports PT clinic สำหรับนักกีฬา/ออกกำลังกาย มี Margin สูง"
        }, {
          tag: "Premium Rehab",
          text: "เพิ่มบริการ Hydrotherapy / Robotic-assisted PT สำหรับกลุ่ม Premium"
        }, {
          tag: "Wellness Packages",
          text: "จัดทำ Rehab packages รวม PT+Equipment+Home program เพิ่มรายได้"
        }]) : c >= 0 ? (a = "🟡 การเติบโตทรงตัว เน้นเพิ่ม Revenue per Visit", h = [{
          tag: "Modality Upsell",
          text: "เสนอ Modality เพิ่มเติม (US/TENS/Laser/IPC) ในทุก Session เพื่อเพิ่ม Rev/Visit"
        }, {
          tag: "Recall System",
          text: "ระบบนัดหมาย PT ต่อเนื่อง SMS/LINE อัตโนมัติ ลด Dropout rate"
        }, {
          tag: "Cross-Referral",
          text: "เพิ่ม Referral จาก Ortho/Neuro/Surgery → PT เพิ่ม Volume"
        }]) : (a = "🔴 รายได้หดตัว ต้องการแผนกระตุ้นและลดรอยรั่วทันที", h = [{
          tag: "Billing Audit",
          text: "ตรวจสอบ Missing charges — Modality/Equipment ที่ทำแล้วไม่ได้ Charge"
        }, {
          tag: "Throughput",
          text: "ลดคอขวด — จัด Fast Track PT สำหรับ Follow-up sessions"
        }, {
          tag: "Patient Acquisition",
          text: "โปรโมท PT clinic ผ่าน Social Media + Corporate wellness contracts"
        }]), e.jsxs("div", {
          style: {
            marginTop: "0.5rem",
            marginBottom: "1.25rem"
          },
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
                background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
                borderRadius: "99px"
              }
            }), e.jsx("span", {
              style: {
                fontSize: "var(--fs-sm)",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                letterSpacing: "-0.01em"
              },
              children: "🧠 Revenue Intelligence Hub"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                background: "rgba(14,165,233,.08)",
                padding: "2px 8px",
                borderRadius: "99px"
              },
              children: "EXECUTIVE ADVISORY"
            })]
          }), e.jsx("div", {
            className: "glass-card",
            style: {
              padding: "1.5rem",
              background: "linear-gradient(135deg, rgba(14,165,233,.05) 0%, rgba(2,132,199,.02) 100%)",
              border: "1px solid rgba(14,165,233,.2)"
            },
            children: e.jsxs("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1.25rem"
              },
              children: [e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "12px",
                  borderBottom: "1px solid rgba(203,213,225,.2)"
                },
                children: [e.jsxs("div", {
                  children: [e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#0ea5e9",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    },
                    children: "AI Revenue Growth Diagnosis"
                  }), e.jsx("p", {
                    style: {
                      margin: "4px 0 0",
                      fontSize: "var(--fs-sm)",
                      fontWeight: 700,
                      color: "var(--md-text-primary)"
                    },
                    children: a
                  })]
                }), e.jsxs("div", {
                  style: {
                    textAlign: "right"
                  },
                  children: [e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "12px",
                      color: "var(--md-text-tertiary)",
                      fontWeight: 600
                    },
                    children: "YoY Growth"
                  }), e.jsxs("p", {
                    style: {
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: 900,
                      color: c >= 0 ? "#10b981" : "#f43f5e",
                      letterSpacing: "-0.02em"
                    },
                    children: [c >= 0 ? "+" : "", c.toFixed(1), "%"]
                  })]
                })]
              }), e.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                  gap: "1.5rem",
                  alignItems: "start"
                },
                children: [e.jsxs("div", {
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
                      children: "👁️"
                    }), e.jsx("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em"
                      },
                      children: "Financial Deep Insight"
                    })]
                  }), e.jsx("p", {
                    style: {
                      fontSize: "11.5px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.6,
                      fontWeight: 500,
                      background: "var(--md-surface-2)",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      margin: 0,
                      border: "1px solid var(--md-border)"
                    },
                    children: s < 400 ? `⚠️ Revenue/Visit อยู่ที่ ฿${Math.round(s).toLocaleString()} สะท้อนกลุ่มผู้ป่วยที่ทำ Basic exercise เท่านั้น — เสนอให้เพิ่ม Modality (US/TENS/Laser) ทุก session` : s > 800 ? `✅ Revenue/Visit อยู่ที่ ฿${Math.round(s).toLocaleString()} แสดงถึง Service mix ที่ดี — พิจารณา VIP Rehab membership` : `📊 Revenue/Visit อยู่ที่ ฿${Math.round(s).toLocaleString()} อยู่ในเกณฑ์มาตรฐาน — เพิ่ม Specialized packages เพื่ออัปยอด`
                  })]
                }), e.jsxs("div", {
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
                      children: "🎯"
                    }), e.jsx("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em"
                      },
                      children: "Recommended Actions for Director"
                    })]
                  }), e.jsx("ul", {
                    style: {
                      margin: 0,
                      paddingLeft: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      fontSize: "11.5px",
                      color: "var(--md-text-secondary)",
                      fontWeight: 500,
                      lineHeight: 1.5
                    },
                    children: h.map((r, p) => e.jsxs("li", {
                      children: [e.jsxs("strong", {
                        style: {
                          color: "#0ea5e9"
                        },
                        children: [r.tag, ": "]
                      }), r.text]
                    }, p))
                  })]
                })]
              })]
            })
          })]
        })
      })()
    }), !f.ptToday && d?.top_diagnoses && d.top_diagnoses.length > 0 && e.jsxs(e.Fragment, {
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
            background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
            borderRadius: "99px"
          }
        }), e.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            letterSpacing: "-0.01em"
          },
          children: "🏷️ Top Diagnoses วันนี้ — กายภาพบำบัด"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            background: "rgba(14,165,233,.08)",
            padding: "2px 8px",
            borderRadius: "99px"
          },
          children: "Real-time · HOSxP XE"
        })]
      }), e.jsx("div", {
        className: "glass-card",
        style: {
          padding: "1rem 1.25rem"
        },
        children: e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3px"
          },
          children: (d.top_diagnoses || []).slice(0, 10).map((t, i) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 8px",
              borderRadius: "8px",
              background: i === 0 ? "rgba(14,165,233,.06)" : i < 3 ? "rgba(14,165,233,.02)" : "transparent"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: i < 3 ? "#0ea5e9" : "#94a3b8",
                width: "18px",
                textAlign: "center",
                flexShrink: 0
              },
              children: i + 1
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                fontFamily: "JetBrains Mono, monospace",
                width: "52px",
                flexShrink: 0
              },
              children: t.icd10 || t.code || "—"
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
              children: t.name || t.diagnosis || "—"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#0ea5e9",
                flexShrink: 0
              },
              children: t.count ?? t.visits ?? 0
            })]
          }, i))
        })
      })]
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
          background: "linear-gradient(135deg, rgba(14,165,233,.12) 0%, rgba(2,132,199,.06) 100%)",
          border: "1px solid rgba(14,165,233,.2)",
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
            background: "radial-gradient(circle, rgba(14,165,233,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), f.ptToday ? e.jsxs("div", {
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
          const t = n.total ?? 0,
            i = n.completed ?? 0,
            o = n.waiting ?? 0,
            y = t > 0 ? Math.round(i / t * 100) : 0;
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
                  color: "#0ea5e9",
                  margin: 0
                },
                children: "🏋️ กายภาพบำบัดวันนี้"
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600,
                  background: "rgba(14,165,233,.08)",
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
                  color: "#0ea5e9",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 0 40px rgba(14,165,233,.3)"
                },
                children: t.toLocaleString("th-TH")
              }), e.jsx("span", {
                style: {
                  fontSize: "14px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: "ราย"
              }), n.today_vs_yesterday_pct !== void 0 && n.today_vs_yesterday_pct !== 0 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: n.today_vs_yesterday_pct > 0 ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)",
                  color: n.today_vs_yesterday_pct > 0 ? "#10b981" : "#ef4444"
                },
                children: [n.today_vs_yesterday_pct > 0 ? "▲" : "▼", " ", Math.abs(n.today_vs_yesterday_pct), "% vs เมื่อวาน"]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: "rgba(16,185,129,.1)",
                  color: "#10b981"
                },
                children: ["✅ ", i.toLocaleString("th-TH"), " เสร็จ (", y, "%)"]
              }), o > 0 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: "rgba(245,158,11,.1)",
                  color: "#f59e0b"
                },
                children: ["⏳ ", o, " รอ"]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: ["♂️", n.male || 0, " ♀️", n.female || 0]
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
                  children: ["✅ เสร็จสิ้น ", i.toLocaleString("th-TH"), " (", y, "%)"]
                }), e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#f59e0b"
                  },
                  children: ["รอรับบริการ ", o.toLocaleString("th-TH")]
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
                    width: `${Math.min(100,y)}%`,
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
        value: n.unique_patients ?? 0,
        icon: "👥",
        unit: "คน",
        grad: ["#0ea5e9", "#0284c7"],
        glow: "rgba(14,165,233,.2)",
        loading: f.ptToday
      }, {
        title: "สำเร็จวันนี้",
        value: (n.total ?? 0) > 0 ? `${Math.round((n.completed??0)/n.total*100)}%` : "—",
        icon: "✅",
        unit: "",
        grad: n.total > 0 && n.completed / n.total >= .8 ? ["#10b981", "#059669"] : ["#f59e0b", "#d97706"],
        glow: "rgba(16,185,129,.2)",
        loading: f.ptToday
      }, {
        title: "ชาย/หญิง",
        value: `${n.male||0}/${n.female||0}`,
        icon: "👤",
        unit: "",
        grad: ["#8b5cf6", "#7c3aed"],
        glow: "rgba(139,92,246,.2)",
        loading: f.ptToday
      }, {
        title: "ผู้สูงอายุ",
        value: n.elderly ?? 0,
        icon: "👴",
        unit: "ราย",
        grad: (n.elderly ?? 0) > 10 ? ["#f59e0b", "#d97706"] : ["#0ea5e9", "#0284c7"],
        glow: "rgba(14,165,233,.2)",
        loading: f.ptToday
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
        onMouseEnter: o => {
          o.currentTarget.style.transform = "translateY(-2px)", o.currentTarget.style.boxShadow = `0 8px 25px ${t.glow}`
        },
        onMouseLeave: o => {
          o.currentTarget.style.transform = "none", o.currentTarget.style.boxShadow = "none"
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
      }, `pt-kpi-${i}`))]
    }), e.jsx(G, {
      today: d,
      analytics: j,
      loading: f.ptToday
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
          background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🏋️ Advanced Analytics — Physical Therapy"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(14,165,233,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "30d · HOSxP XE"
      })]
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: f.ptAnalytics ? e.jsxs("div", {
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
        const t = j || {},
          i = t.ppi ?? 0,
          o = i >= 80 ? "#10b981" : i >= 60 ? "#f59e0b" : "#f43f5e",
          y = i >= 90 ? "A+" : i >= 80 ? "A" : i >= 70 ? "B+" : i >= 60 ? "B" : i >= 50 ? "C" : "D",
          u = 72,
          b = Math.PI * u,
          g = Math.min(i / 100, 1) * b,
          l = t.ppi_components || {},
          c = [{
            name: "Wait Time",
            score: l.wait_time || 0
          }, {
            name: "Completion",
            score: l.completion || 0
          }, {
            name: "Revisit",
            score: l.revisit || 0
          }, {
            name: "Revenue",
            score: l.revenue || 0
          }, {
            name: "SLA",
            score: l.sla || 0
          }],
          s = [{
            icon: "⏱️",
            label: "เวลารอเฉลี่ย",
            value: `${t.avg_wait_time??0} min`,
            sub: `σ ${t.sd_wait_time??0}min · SLA ≤30min: ${t.wait_sla_pct??0}%`,
            desc: "เวลารอก่อนเข้ารับกายภาพบำบัด (30 วัน)",
            color: (t.avg_wait_time ?? 30) <= 15 ? "#10b981" : (t.avg_wait_time ?? 30) <= 30 ? "#f59e0b" : "#f43f5e",
            problem: (t.avg_wait_time ?? 30) <= 15 ? `รอเฉลี่ย ${t.avg_wait_time??0} min — ดีเยี่ยม (≤15min) ผู้ป่วยได้รับบริการรวดเร็ว SLA ${t.wait_sla_pct??0}%` : (t.avg_wait_time ?? 30) <= 30 ? `รอเฉลี่ย ${t.avg_wait_time??0} min (σ ${t.sd_wait_time??0}) — ยังอยู่ในเกณฑ์ แต่ควรลด มี ${t.wait_over_30m??0} ครั้งที่รอ >30min ผู้ป่วย Rehab ต้องการทำกายภาพตามตาราง` : `🚨 รอเฉลี่ย ${t.avg_wait_time??0} min — สูง! ${t.wait_over_30m??0} ครั้ง >30min ผู้ป่วยอาจ dropout หรือพลาด Session`,
            recommend: (t.avg_wait_time ?? 30) <= 15 ? "✅ คงมาตรฐาน — Appointment system ทำงานดี" : "📋 ลดเวลารอ: (1) Appointment-based scheduling (2) เพิ่ม Unit ช่วง Peak (3) Pre-screening ก่อนถึงคิว (4) SMS แจ้งคิว real-time (5) เป้าหมาย: ≤15 min"
          }, {
            icon: "🕐",
            label: "เวลารวม (Visit)",
            value: `${t.avg_total_time??0} min`,
            sub: `σ ${t.sd_total_time??0}min · Total SLA ≤60min: ${t.total_sla_pct??0}%`,
            desc: "เวลาเฉลี่ยทั้งกระบวนการ ลงทะเบียน→ทำกายภาพ→ชำระเงิน",
            color: (t.avg_total_time ?? 60) <= 45 ? "#10b981" : (t.avg_total_time ?? 60) <= 60 ? "#f59e0b" : "#f43f5e",
            problem: `เวลารวม ${t.avg_total_time??0} min (σ ${t.sd_total_time??0}) — ${(t.avg_total_time??60)<=45?"ดี Flow ลื่นไหล":(t.avg_total_time??60)<=60?"ปานกลาง ควรลด bottleneck":"⚠️ สูง! ผู้ป่วยใช้เวลาทั้งหมดนานเกินไป ตรวจสอบ bottleneck"}`,
            recommend: "📋 ลดเวลารวม: (1) Pre-register online (2) Digital payment ลดรอชำระเงิน (3) Chair-side billing (4) Lean flow: ลด Non-value steps"
          }, {
            icon: "📊",
            label: "Avg Daily Visits",
            value: `${t.avg_daily_visits??0}`,
            sub: `${(t.total_visits??0).toLocaleString()} ราย / 30 วัน · ${t.unique_patients??0} patients`,
            desc: "จำนวนผู้ป่วยเฉลี่ยต่อวัน",
            color: "#0ea5e9",
            problem: `เฉลี่ย ${t.avg_daily_visits??0} ราย/วัน (รวม ${(t.total_visits??0).toLocaleString()} ราย) · Unique patients ${t.unique_patients??0} — ${(t.avg_daily_visits??0)>50?"⚠️ Volume สูง ตรวจสอบ Capacity":"Volume ปกติ"}`,
            recommend: "📋 Capacity: (1) วิเคราะห์ห้อง/อุปกรณ์ utilization rate (2) เพิ่ม Physio ถ้า Utilization >85% (3) Extended hours สำหรับ Peak days"
          }, {
            icon: "⏰",
            label: "Wait >30 min",
            value: `${t.wait_over_30m??0}`,
            sub: "จาก 30 วัน",
            desc: "จำนวนครั้งที่รอนานเกิน 30 นาที",
            color: (t.wait_over_30m ?? 0) < 10 ? "#10b981" : (t.wait_over_30m ?? 0) < 30 ? "#f59e0b" : "#f43f5e",
            problem: (t.wait_over_30m ?? 0) < 10 ? `Wait >30min เพียง ${t.wait_over_30m??0} ครั้ง — Flow ดี ไม่มีปัญหาคอขวด` : `Wait >30min ${t.wait_over_30m??0} ครั้ง — ${(t.wait_over_30m??0)>=30?"🚨 บ่อยเกินไป! ผู้ป่วยรอนานเป็นประจำ":"ต้องเฝ้าระวัง อาจเกิดช่วง Peak"}`,
            recommend: (t.wait_over_30m ?? 0) < 10 ? "✅ ดี — RCA ทุกครั้งที่เกิด wait >30min" : "📋 ลด Long wait: (1) Buffer time ระหว่าง appointment (2) เพิ่ม Physio ช่วง Peak (3) Parallel processing: เตรียมอุปกรณ์/เตียงล่วงหน้า"
          }],
          a = [{
            icon: "✅",
            label: "Completion Rate",
            value: `${t.completion_rate??0}%`,
            sub: `Dropout ${t.dropout_count??0} ราย`,
            desc: "% ผู้ป่วยที่รักษาเสร็จสิ้น",
            color: (t.completion_rate ?? 0) >= 95 ? "#10b981" : (t.completion_rate ?? 0) >= 85 ? "#f59e0b" : "#f43f5e",
            problem: (t.completion_rate ?? 0) >= 95 ? `Completion ${t.completion_rate??0}% — ดีเยี่ยม Dropout เพียง ${t.dropout_count??0} ราย` : `Completion ${t.completion_rate??0}% — Dropout ${t.dropout_count??0} ราย ${(t.completion_rate??0)<85?"⚠️ สูง! ตรวจสอบสาเหตุ: รอนาน? กลัว? ค่าใช้จ่าย?":"ควรสอบถามสาเหตุ"}`,
            recommend: "📋 ลด Dropout: (1) SMS เตือนก่อนนัด 1 วัน (2) ลด Wait time (3) ให้ข้อมูลค่าใช้จ่ายล่วงหน้า (4) เป้าหมาย: ≥95%"
          }, {
            icon: "🔄",
            label: "Revisit 7 วัน",
            value: `${t.revisit_rate??0}%`,
            sub: `${t.revisit_count??0} ราย กลับมาภายใน 7 วัน`,
            desc: "% ผู้ป่วยที่กลับมาอีกในสัปดาห์เดียวกัน",
            color: (t.revisit_rate ?? 0) < 5 ? "#10b981" : (t.revisit_rate ?? 0) < 15 ? "#f59e0b" : "#f43f5e",
            problem: (t.revisit_rate ?? 0) < 5 ? `Revisit ${t.revisit_rate??0}% — ต่ำ สะท้อน Treatment quality ดี` : `Revisit ${t.revisit_rate??0}% (${t.revisit_count??0} ราย) — ${(t.revisit_rate??0)>=15?"⚠️ สูง! อาจมี Complication หรือ Treatment plan ต้องหลาย visit":"ปานกลาง อาจเป็น Planned multi-visit cases"}`,
            recommend: "📋 Review: (1) แยก Planned revisit vs Unplanned (2) Audit unplanned — Complication? Undertreated? (3) Treatment plan ที่ดียิ่งขึ้น"
          }],
          h = [{
            icon: "💰",
            label: "รายได้ / Visit",
            value: `฿${(t.avg_revenue_per_visit??0).toLocaleString()}`,
            sub: `Max ฿${(t.max_revenue??0).toLocaleString()} · Daily ฿${(t.daily_revenue??0).toLocaleString()}`,
            desc: "รายได้เฉลี่ยต่อ 1 visit กายภาพบำบัด",
            color: "#0ea5e9",
            problem: `Avg Rev/Visit ฿${(t.avg_revenue_per_visit??0).toLocaleString()} — ${(t.avg_revenue_per_visit??0)<400?"⚠️ ต่ำ อาจมี Under-billing หรือส่วนใหญ่เป็น Basic exercise":"สอดคล้องกับ Service mix"}`,
            recommend: "📋 Optimize: (1) ตรวจสอบ Procedure billing ครบถ้วน (2) เพิ่ม Rehab packages (กายภาพ+อุปกรณ์+ออกกำลังกาย) (3) ลด Free visit %"
          }, {
            icon: "💵",
            label: "รายได้รวม (30d)",
            value: `฿${((t.total_revenue??0)/1e3).toFixed(0)}k`,
            sub: `${(t.total_visits??0).toLocaleString()} visits`,
            desc: "รายได้รวมกายภาพบำบัด 30 วัน",
            color: "#10b981",
            problem: `Revenue ฿${((t.total_revenue??0)/1e3).toFixed(0)}k / 30 วัน จาก ${(t.total_visits??0).toLocaleString()} visits`,
            recommend: "📋 เพิ่มรายได้: (1) Rehab packages (กายภาพ+Hydro+Equipment) (2) Sports medicine program (3) Referral จาก Ortho/Neuro"
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
                  d: `M 18,90 A ${u},${u} 0 0,1 162,90`,
                  fill: "none",
                  stroke: "rgba(203,213,225,.5)",
                  strokeWidth: "14",
                  strokeLinecap: "round"
                }), e.jsx("path", {
                  d: `M 18,90 A ${u},${u} 0 0,1 162,90`,
                  fill: "none",
                  stroke: o,
                  strokeWidth: "14",
                  strokeLinecap: "round",
                  strokeDasharray: `${g} ${b}`,
                  style: {
                    transition: "stroke-dasharray 1s ease"
                  }
                }), e.jsx("text", {
                  x: "90",
                  y: "78",
                  textAnchor: "middle",
                  fontSize: "32",
                  fontWeight: "900",
                  fill: o,
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
                  children: "PPI Score"
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "center"
                },
                children: [e.jsx("div", {
                  style: {
                    fontSize: "26px",
                    fontWeight: 900,
                    color: o
                  },
                  children: y
                }), e.jsx("div", {
                  style: {
                    fontSize: "var(--fs-xs)",
                    fontWeight: 700,
                    color: o
                  },
                  children: i >= 80 ? "ประสิทธิภาพสูง" : i >= 60 ? "ระดับมาตรฐาน" : "ต้องปรับปรุง"
                }), e.jsx("div", {
                  style: {
                    fontSize: "var(--fs-2xs)",
                    color: "var(--md-text-tertiary)",
                    marginTop: "2px"
                  },
                  children: "PT Performance Index"
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
                  children: "PPI Components"
                }), c.map((r, p) => {
                  const m = r.score >= 70 ? "#10b981" : r.score >= 40 ? "#f59e0b" : "#f43f5e";
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
                          background: m,
                          borderRadius: "99px",
                          transition: "width 0.8s ease"
                        }
                      })
                    }), e.jsx("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: m,
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
                cards: s
              }, {
                title: "Quality & Outcomes",
                color: "#0ea5e9",
                cards: a
              }, {
                title: "Financial Intelligence",
                color: "#f59e0b",
                cards: h
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
                  children: r.cards.map((m, _) => e.jsxs("div", {
                    style: {
                      padding: "8px 10px",
                      borderRadius: "10px",
                      background: `${m.color}06`,
                      border: `1px solid ${m.color}20`
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
                        children: m.icon
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
                          children: m.label
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
                          children: m.desc
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
                            color: m.color,
                            letterSpacing: "-0.02em"
                          },
                          children: m.value
                        }), e.jsx("p", {
                          style: {
                            margin: 0,
                            fontSize: "12px",
                            color: "var(--md-text-tertiary)",
                            fontWeight: 600
                          },
                          children: m.sub
                        })]
                      })]
                    }), m.problem && e.jsxs("div", {
                      style: {
                        marginTop: "6px",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        background: "rgba(203,213,225,.04)",
                        borderLeft: `3px solid ${m.color}`
                      },
                      children: [e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: 700,
                          color: m.color,
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
                        children: m.problem
                      })]
                    }), m.recommend && e.jsxs("div", {
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
                        children: m.recommend
                      })]
                    })]
                  }, _))
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
              }), e.jsx(k, {
                width: "100%",
                height: 130,
                children: e.jsxs(L, {
                  data: (t.hourly_pattern || []).filter(r => r.avg > 0),
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(T, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(W, {
                    dataKey: "label",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 8,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1,
                    tickFormatter: r => r.replace(":00", "")
                  }), e.jsx(w, {
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 9
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 20
                  }), e.jsx(z, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: r => [`${r} ราย/วัน`, "เฉลี่ย"]
                  }), e.jsx(P, {
                    dataKey: "avg",
                    radius: [3, 3, 0, 0],
                    barSize: 8,
                    children: (t.hourly_pattern || []).filter(r => r.avg > 0).map((r, p) => e.jsx(A, {
                      fill: r.hour === t.peak_hour?.hour ? "#f43f5e" : "#0ea5e9"
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
              }), e.jsx(k, {
                width: "100%",
                height: 130,
                children: e.jsxs(L, {
                  data: t.age_distribution || [],
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(T, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(W, {
                    dataKey: "group",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 9,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1
                  }), e.jsx(w, {
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 9
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 24
                  }), e.jsx(z, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: r => [`${r} ราย`, "จำนวน"]
                  }), e.jsx(P, {
                    dataKey: "count",
                    radius: [4, 4, 0, 0],
                    barSize: 18,
                    children: (t.age_distribution || []).map((r, p) => {
                      const m = ["#f43f5e", "#f59e0b", "#eab308", "#10b981", "#0ea5e9", "#8b5cf6"];
                      return e.jsx(A, {
                        fill: m[p] || "#7c3aed"
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
              }), e.jsx(k, {
                width: "100%",
                height: 130,
                children: e.jsxs(q, {
                  data: t.monthly_trend || [],
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(T, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(W, {
                    dataKey: "month",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 10,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1
                  }), e.jsx(w, {
                    yAxisId: "left",
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 10
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 28
                  }), e.jsx(w, {
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
                  }), e.jsx(z, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: (r, p) => p === "visits" ? [`${r} ราย`, "จำนวน"] : p === "total_rev" ? [`฿${r.toLocaleString()}`, "รายได้"] : [`${r}`, p]
                  }), e.jsx(P, {
                    yAxisId: "left",
                    dataKey: "visits",
                    fill: "rgba(14,165,233,.3)",
                    radius: [4, 4, 0, 0],
                    barSize: 14
                  }), e.jsx(V, {
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
              children: "🏷️ Top Diagnoses (30 วัน)"
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
                  background: p === 0 ? "rgba(14,165,233,.06)" : "transparent"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#0ea5e9",
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
                    color: "#0ea5e9",
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
    }), e.jsx(I, {
      name: "AI Intelligence Module",
      children: e.jsx(Y, {
        analytics: j,
        loading: f.ptAnalytics
      })
    }), !f.ptAnalytics && j && (() => {
      const t = j || {},
        i = t.ppi ?? 0,
        o = t.avg_wait_time ?? 0,
        y = t.sd_wait_time ?? 0;
      t.avg_total_time;
      const u = t.wait_over_30m ?? 0,
        b = t.wait_sla_pct ?? 0,
        g = t.completion_rate ?? 0,
        l = t.dropout_count ?? 0,
        c = t.revisit_rate ?? 0;
      t.avg_daily_visits;
      const s = t.total_visits ?? 0,
        a = t.avg_revenue_per_visit ?? 0;
      t.total_revenue;
      const h = t.peak_hour?.label || "—",
        r = [];
      o > 20 && r.push({
        priority: 1,
        severity: o > 30 ? "critical" : "warning",
        title: `🔴 เวลารอสูง: ${o} min (σ ${y}) — SLA ≤30min ผ่านเพียง ${b}% · ${u} ครั้ง >30min`,
        rootCause: `ผู้ป่วย PT รอเฉลี่ย ${o} นาที (σ ${y}) ── สาเหตุ: (1) Appointment over-booking — นัดเกินกว่าเตียง/อุปกรณ์จะรองรับ (2) Session time ไม่แน่นอน — Exercise/Modality ใช้เวลาต่างกัน (3) Walk-in Refer จาก IPD/OPD ซ้อน slot (4) Peak hour ${h} — ผู้ป่วยกระจุกตัว (5) Physio ไม่เพียงพอช่วง Peak`,
        cascadeEffect: `Wait สูง → ผู้ป่วย Dropout (ปัจจุบัน ${l} ราย) → Rehab outcome ลดลง → พลาด Treatment window → Recovery ช้า ● Wait สูง → ผู้ป่วยทำ PT ไม่ต่อเนื่อง → Functional outcome ลดลง ● PPI ลดลง (${i}/100)`,
        fixFirst: `🔧 ด่วนที่สุด: (1) Appointment-based scheduling — จำกัด Walk-in (2) Buffer time ระหว่าง Session (3) เพิ่ม Physio ช่วง Peak ${h} (4) เตรียมอุปกรณ์/เตียงล่วงหน้า (5) SMS คิว real-time (6) เป้าหมาย: ≤15 min ภายใน 30 วัน`,
        color: o > 30 ? "#f43f5e" : "#f59e0b"
      }), g < 90 && r.push({
        priority: 2,
        severity: g < 80 ? "critical" : "warning",
        title: `🟡 Completion Rate ต่ำ: ${g}% — Dropout ${l} ราย`,
        rootCause: `${g}% เท่านั้นที่ทำ PT เสร็จ — ${l} ราย Dropout ── สาเหตุ: (1) Wait time นาน → ผู้ป่วยเลือกกลับ (2) Session ยาว → ผู้ป่วยเหนื่อย/ไม่มีเวลา (3) ค่าใช้จ่ายสูงกว่าคาด (4) ผู้ป่วยเจ็บ/ไม่สบายระหว่าง Session`,
        cascadeEffect: `Dropout สูง → Revenue loss ฿${(l*a).toLocaleString()} → Physio มี idle time → ห้องว่าง ● ผู้ป่วยที่ Dropout → Recovery ล่าช้า → Re-admit หรือ Complication → ต้นทุนรวมสูงขึ้น`,
        fixFirst: "🔧 ลด Dropout: (1) แจ้ง Wait time estimate ทุกราย (2) Home exercise program ทดแทน (3) Express PT session (20 min) (4) Flexible scheduling — นัดรอบบ่าย/เย็น (5) เป้าหมาย: Completion ≥95%",
        color: g < 80 ? "#f43f5e" : "#f59e0b"
      }), c > 10 && r.push({
        priority: 3,
        severity: c > 20 ? "critical" : "warning",
        title: `🟡 Revisit 7d สูง: ${c}% — Treatment Quality Concern`,
        rootCause: `${c}% กลับมาภายใน 7 วัน — PT ส่วนใหญ่เป็น Planned revisit (ทำกายภาพต่อเนื่อง) ต้องแยก Planned vs Unplanned (เจ็บหลังทำ, อาการแย่ลง)`,
        cascadeEffect: "Unplanned revisit → เพิ่ม Workload Physio → Wait time เพิ่ม → Session ล่าช้า ● อาการแย่ลง → ต้อง Re-evaluate → เสียเวลาทั้ง Physio และผู้ป่วย",
        fixFirst: "🔧 ลด Unplanned Revisit: (1) Audit ทุก 7d revisit — แยก Planned PT vs Pain/Complication (2) Graded exercise progression ที่เหมาะสม (3) Home exercise instruction ชัดเจน (4) Follow-up call หลัง Session",
        color: c > 20 ? "#f43f5e" : "#f59e0b"
      }), a < 400 && s > 50 && r.push({
        priority: 4,
        severity: "warning",
        title: `🟠 Revenue/Visit ต่ำ: ฿${a.toLocaleString()} — อาจมี Under-billing หรือ Service mix ไม่สมดุล`,
        rootCause: `Rev/Visit ฿${a.toLocaleString()} ← ต่ำสำหรับ PT (ควร ≥฿400) ── สาเหตุ: (1) ส่วนใหญ่เป็น Basic exercise ไม่มี Modality (2) Under-billing — ทำ US/TENS/Laser แล้วไม่ charge (3) สิทธิ์บัตรทอง/ประกันสังคม Rate ต่ำ (4) Missing charges จาก Equipment/Modality`,
        cascadeEffect: "Low revenue → Budget PT ไม่เพียงพอ → ไม่สามารถซื้ออุปกรณ์ใหม่ → Service quality ลดลง → Referral ลดลง = วงจรลบ",
        fixFirst: "🔧 เพิ่ม Revenue: (1) Audit billing ทุก Modality ครบถ้วน (2) Rehab packages: PT+Hydro+Equipment+Home program (3) Sports medicine clinic (4) Verify procedure coding (5) เก็บค่า Modality/อุปกรณ์ครบ",
        color: "#f59e0b"
      }), r.length === 0 && r.push({
        priority: 0,
        severity: "good",
        title: "✅ กายภาพบำบัด ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน",
        rootCause: `PPI ${i}/100 · Wait ${o}min · Completion ${g}% · Revisit ${c}% — ตัวชี้วัดอยู่ในเกณฑ์ดี`,
        cascadeEffect: "ไม่มีผลกระทบลูกโซ่ — คลินิก PT ทำงานได้มาตรฐาน",
        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ PPI ≥ ${Math.min(i+10,100)} (2) เพิ่ม Specialized PT programs (3) Outcome measurement`,
        color: "#10b981"
      }), r.sort((x, R) => x.priority - R.priority);
      const p = r.filter(x => x.severity === "critical").length,
        m = r.filter(x => x.severity === "warning").length,
        _ = Math.min(10, p * 3 + m * 1.5),
        v = _ >= 7 ? "#f43f5e" : _ >= 4 ? "#f59e0b" : "#10b981",
        C = _ >= 7 ? "ต้องดำเนินการทันที" : _ >= 4 ? "ควรแก้ไขเร็ว" : "สถานการณ์ปกติ";
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
            children: "Cross-analysis PT"
          })]
        }), e.jsxs("div", {
          className: `glass-card ${_>=7?"alert-critical":_>=4?"alert-warning":""}`,
          style: {
            padding: "1.5rem",
            border: `1.5px solid ${v}25`
          },
          children: [e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${v}08, ${v}03)`,
              border: `1px solid ${v}20`,
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
                    color: v,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em"
                  },
                  children: "⚡ ระดับความเร่งด่วนรวม — กายภาพบำบัด"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: v,
                    background: `${v}15`,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    border: `1px solid ${v}25`
                  },
                  children: C
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
                  children: [p, " วิกฤต"]
                }), m > 0 && e.jsxs(e.Fragment, {
                  children: [" + ", e.jsxs("strong", {
                    style: {
                      color: "#f59e0b"
                    },
                    children: [m, " เตือน"]
                  })]
                }), r[0]?.severity === "good" && e.jsx("strong", {
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
                    width: `${_*10}%`,
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
                  color: v,
                  lineHeight: 1
                },
                children: [Math.round(_), e.jsx("span", {
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
                  color: v,
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
            children: r.map((x, R) => e.jsxs("div", {
              style: {
                borderRadius: "14px",
                border: `1.5px solid ${x.color}20`,
                background: `${x.color}04`,
                overflow: "hidden"
              },
              children: [e.jsxs("div", {
                style: {
                  padding: "10px 16px",
                  background: `linear-gradient(90deg, ${x.color}12, transparent)`,
                  borderBottom: `1px solid ${x.color}15`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [x.priority > 0 && e.jsx("span", {
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: x.color,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 900,
                    flexShrink: 0
                  },
                  children: x.priority
                }), e.jsx("span", {
                  style: {
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)",
                    lineHeight: 1.4
                  },
                  children: x.title
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
                    background: `${x.color}15`,
                    color: x.color,
                    border: `1px solid ${x.color}25`
                  },
                  children: x.severity === "critical" ? "🔴 CRITICAL" : x.severity === "warning" ? "🟡 WARNING" : "🟢 GOOD"
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
                    children: x.rootCause
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
                    children: x.cascadeEffect
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
                    children: ["🔧 แก้ไขก่อน — ด่วนที่ ", x.priority > 0 ? x.priority : "—", " (Fix First)"]
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "11.5px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.65,
                      fontWeight: 500
                    },
                    children: x.fixFirst
                  })]
                })]
              })]
            }, R))
          }), r.length > 1 && r[0]?.severity !== "good" && e.jsxs("div", {
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
              children: "🗺️ แผนที่ความเชื่อมโยง — PT Bottleneck Chain"
            }), e.jsx("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap"
              },
              children: [{
                label: `Wait ${o}min`,
                color: "#f59e0b"
              }, {
                label: `Dropout ${l}`,
                color: "#f43f5e"
              }, {
                label: `Completion ${g}%`,
                color: "#0ea5e9"
              }, {
                label: `Revisit ${c}%`,
                color: "#e11d48"
              }, {
                label: `Rev ฿${a}`,
                color: "#8b5cf6"
              }, {
                label: `PPI = ${i}/100`,
                color: "#10b981"
              }].map((x, R) => e.jsxs(M.Fragment, {
                children: [R > 0 && e.jsx("span", {
                  style: {
                    color: "#94a3b8",
                    fontSize: "14px"
                  },
                  children: "→"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: x.color,
                    background: `${x.color}10`,
                    padding: "4px 10px",
                    borderRadius: "8px",
                    border: `1px solid ${x.color}20`
                  },
                  children: x.label
                })]
              }, R))
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
                children: "สรุป:"
              }), " ปัญหา PT เริ่มจาก ", e.jsx("strong", {
                style: {
                  color: "#f59e0b"
                },
                children: "Wait time สูง"
              }), " → ผู้ป่วย Dropout → Rehab outcome ลดลง — ", e.jsx("strong", {
                children: "แก้ ด่วนที่ 1 ก่อน"
              }), " (ลดเวลารอด้วย Appointment system + เพิ่ม Physio) จะปรับปรุง KPI ทุกตัวพร้อมกัน"]
            })]
          })]
        })]
      })
    })(), e.jsxs("div", {
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
          background: "linear-gradient(180deg, #0ea5e9, #0284c7)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💰 รายได้โดยประมาณ กายภาพบำบัด — ปีงบประมาณ (3 ปีย้อนหลัง)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(14,165,233,.08)",
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
      children: f.ptRevenueFiscal ? e.jsxs("div", {
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
        const i = S.ptRevenueFiscal?.fiscal_years || [];
        if (i.length === 0) return e.jsx("p", {
          style: {
            fontSize: "var(--fs-sm)",
            color: "var(--md-text-tertiary)",
            textAlign: "center",
            padding: "2rem 0"
          },
          children: "ไม่พบข้อมูลรายได้"
        });
        const o = ["#94a3b8", "#38bdf8", "#0ea5e9"],
          u = ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((s, a) => {
            const h = {
              month: s
            };
            return i.forEach((r, p) => {
              h[`fy${p}`] = r.months[a]?.revenue || 0
            }), h
          }),
          b = i[i.length - 1],
          g = i.length >= 2 ? i[i.length - 2] : null,
          l = b.comparable_months || 12,
          c = g && (g.comparable_revenue ?? g.total_revenue) > 0 ? Math.round(((b.comparable_revenue ?? b.total_revenue) - (g.comparable_revenue ?? g.total_revenue)) / (g.comparable_revenue ?? g.total_revenue) * 1e3) / 10 : 0;
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
            children: i.map((s, a) => {
              const h = a === i.length - 1,
                r = o[a];
              return e.jsxs("div", {
                style: {
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: h ? `linear-gradient(135deg, ${r}12, ${r}05)` : `${r}06`,
                  border: `1px solid ${r}${h?"30":"15"}`
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
                    children: s.fiscal_label
                  }), h && e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#0ea5e9",
                      background: "rgba(14,165,233,.1)",
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
                  children: ["฿", (s.total_revenue / 1e6).toFixed(1), "M"]
                }), e.jsxs("p", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    margin: 0,
                    fontWeight: 600
                  },
                  children: [s.total_visits.toLocaleString(), " visits · ", s.total_patients.toLocaleString(), " patients · ฿", s.avg_revenue_per_visit.toLocaleString(), "/visit"]
                }), h && g && e.jsxs("div", {
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
                      color: c >= 0 ? "#10b981" : "#f43f5e"
                    },
                    children: [c >= 0 ? "📈" : "📉", " YoY ", c >= 0 ? "+" : "", c, "%"]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-tertiary)",
                      fontWeight: 500
                    },
                    children: ["vs ", g.fiscal_label, " (เทียบ ", l, " ด.)"]
                  })]
                })]
              }, a)
            })
          }), e.jsx(k, {
            width: "100%",
            height: 280,
            children: e.jsxs(L, {
              data: u,
              margin: {
                top: 8,
                right: 12,
                bottom: 0,
                left: 4
              },
              children: [e.jsx(T, {
                strokeDasharray: "3 3",
                stroke: "rgba(203,213,225,.3)",
                vertical: !1
              }), e.jsx(W, {
                dataKey: "month",
                tick: {
                  fill: "#6b7280",
                  fontSize: 10,
                  fontWeight: 700
                },
                axisLine: !1,
                tickLine: !1
              }), e.jsx(w, {
                tick: {
                  fill: "#9ca3af",
                  fontSize: 9
                },
                axisLine: !1,
                tickLine: !1,
                width: 40,
                tickFormatter: s => s >= 1e6 ? `${(s/1e6).toFixed(0)}M` : `${(s/1e3).toFixed(0)}K`
              }), e.jsx(z, {
                contentStyle: {
                  background: "#fff",
                  border: "1px solid #e8eaf2",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,.08)"
                },
                formatter: (s, a) => {
                  const h = Number(a.replace("fy", ""));
                  return [`฿${(s/1e6).toFixed(2)}M`, i[h]?.fiscal_label || a]
                }
              }), i.map((s, a) => e.jsx(P, {
                dataKey: `fy${a}`,
                fill: o[a],
                radius: [3, 3, 0, 0],
                barSize: i.length <= 2 ? 20 : 14,
                opacity: a === i.length - 1 ? 1 : .5,
                name: `fy${a}`
              }, a))]
            })
          }), e.jsx("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "center"
            },
            children: i.map((s, a) => e.jsxs("div", {
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
                  background: o[a],
                  opacity: a === i.length - 1 ? 1 : .5
                }
              }), e.jsx("span", {
                style: {
                  fontSize: "var(--fs-xs)",
                  color: "var(--md-text-secondary)",
                  fontWeight: 600
                },
                children: s.fiscal_label
              }), e.jsxs("span", {
                style: {
                  fontSize: "var(--fs-2xs)",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 500
                },
                children: ["฿", (s.total_revenue / 1e6).toFixed(1), "M"]
              })]
            }, a))
          })]
        })
      })()
    }), e.jsx(I, {
      name: "AI Server Insights",
      children: e.jsx(O, {
        data: S.phystherapyAI,
        theme: "phystherapy",
        title: "AI Rehabilitation Intelligence"
      })
    })]
  })
}
const Z = M.memo(K);
export {
  Z as
  default
};