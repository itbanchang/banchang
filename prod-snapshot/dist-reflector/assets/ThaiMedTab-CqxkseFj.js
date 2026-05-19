import {
  R as N,
  r as D,
  j as e
} from "./vendor-react-ByYOq5k4.js";
import {
  b as V,
  a as q,
  E as G,
  n as Y,
  S as F,
  M as K,
  g as z,
  h as Q
} from "./shared-ui-OVDEF1.js";
import {
  R as C,
  C as H,
  a as I,
  X as L,
  Y as T,
  T as A,
  B as M,
  b as E,
  c as O,
  e as X
} from "./vendor-charts-C5q2M-g3.js";

function J() {
  const S = V(t => ({
      ttmToday: t.ttmToday,
      ttmAnalytics: t.ttmAnalytics,
      loading: t.loading,
      ttmRevenueFiscal: t.ttmRevenueFiscal,
      thaimedAI: t.thaimedAI
    })),
    {
      fetchData: R
    } = q(),
    b = S.ttmToday,
    u = S.ttmAnalytics,
    v = S.loading;
  D.useEffect(() => {
    R("ttmToday", "/api/thaimedicine/today"), R("ttmAnalytics", "/api/thaimedicine/analytics"), R("ttmRevenueFiscal", "/api/thaimedicine/revenue-fiscal");
    const t = setTimeout(() => R("thaimedAI", "/api/ai/thaimed/optimization"), 300);
    return () => clearTimeout(t)
  }, [R]);
  const d = b || {},
    w = 20,
    B = 30,
    W = D.useMemo(() => {
      const t = new Date().getHours(),
        i = new Date().getMinutes();
      return t > w || t === w && i >= B
    }, []),
    _ = D.useMemo(() => {
      if (!b) return {
        forecast: {
          nextPeak: "—",
          intensity: "Low",
          status: "Stable"
        },
        staffing: {
          status: "Optimal",
          recommendation: "Maintain current staffing",
          color: "#10b981"
        },
        hourlyChart: []
      };
      const t = new Date().getHours(),
        i = b.hourly_prediction || [],
        n = i.find(s => s.hour === t + 1)?.count || 0;
      let f = "Optimal",
        g = "กำลังพลเพียงพอต่อโหลดปัจจุบัน",
        h = "#10b981";
      const c = u?.avg_daily_visits || 25,
        l = b.waiting || 0;
      l > c * .8 || n > 15 ? (f = "Overstrained", g = `🚨 ต้องการทีมนวด/ประคบเพิ่ม ${Math.ceil(l/4)} ท่าน เพื่อรองรับโหลดในชั่วโมงถัดไป`, h = "#f43f5e") : (l > c * .4 || n > 8) && (f = "Tight", g = "⚠️ ควรเฝ้าระวังและเตรียมพร้อมรับเคส Walk-in ใน 30 นาทีถัดไป", h = "#f59e0b");
      const m = (b.hourly || []).map((s, o) => ({
        ...s,
        prediction: i[o]?.count || 0
      })).filter(s => s.hour >= 7 && s.hour <= 20);
      return {
        forecast: {
          nextPeak: n > 0 ? `${t+1}:00` : "—",
          intensity: n > 5 ? "High" : "Normal",
          status: l > 5 ? "Congested" : "Clear"
        },
        staffing: {
          status: f,
          recommendation: g,
          color: h
        },
        hourlyChart: m
      }
    }, [b]);
  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    children: [e.jsx(G, {
      title: "AI Executive Quick Summary — แพทย์แผนไทย",
      subtitle: "Queue · Daily Visits · Utilization",
      badge: "📐 Quick Summary",
      accentColor: "#65a30d",
      headerGradient: "linear-gradient(135deg, rgba(101,163,13,.10), rgba(132,204,22,.05))",
      narrative: Y(S)
    }), e.jsx(F, {
      name: "Revenue Intelligence Hub",
      children: !v.ttmRevenueFiscal && S.ttmRevenueFiscal && (() => {
        const i = S.ttmRevenueFiscal?.fiscal_years || [];
        if (i.length < 2) return null;
        const n = i[i.length - 1],
          f = i[i.length - 2],
          g = n.total_revenue || 0,
          h = f.total_revenue || 0,
          c = n.comparable_revenue ?? g,
          l = f.comparable_revenue ?? h,
          m = l > 0 ? (c - l) / l * 100 : 0,
          s = n.avg_revenue_per_visit || 0;
        let o = "",
          a = [];
        m >= 5 ? (o = "🟢 แนวโน้มการเติบโตดีเยี่ยม โอกาสขยาย Service Line", a = [{
          tag: "High-Value Clinics",
          text: "ขยายบริการคลินิกเฉพาะทางที่มี Margin สูง เช่น นวดจัดกระดูก, ประคบสมุนไพรสูตรรักษาโรคเฉพาะทาง"
        }, {
          tag: "Premium Services",
          text: "พิจารณาเพิ่มบริการ Fast Track หรือ Premium Clinic สำหรับผู้ป่วยที่ต้องการความรวดเร็วและพร้อมจ่ายเพิ่ม"
        }, {
          tag: "Health Packages",
          text: "จัดทำแพ็กเกจตรวจสุขภาพเจาะลึก (Comprehensive Checkup) ควบคู่กับการรักษาผู้ป่วยนอกเพื่อเพิ่มรายได้"
        }]) : m >= 0 ? (o = "🟡 การเติบโตทรงตัว เน้นเพิ่ม Revenue per Visit", a = [{
          tag: "Diagnostic Upsell",
          text: "เสนอโปรแกรมเพิ่มเติม เช่น อบสมุนไพร หรือ ยาหม้อ ให้ผู้ป่วยพิจารณาในเคสที่ต้องการการบรรเทาพิเศษ"
        }, {
          tag: "Recall Optimization",
          text: "ปรับปรุงระบบนัดหมายล่วงหน้า (Chronic Care Recall) ด้วย SMS/LINE อัตโนมัติ เพื่อล๊อคฐานผู้ป่วยโรคเรื้อรัง"
        }, {
          tag: "Cross-Consultation",
          text: "เพิ่มการส่งต่อจากแผนกอื่น (เช่น กายภาพบำบัด) มายังแพทย์แผนไทยในเครือข่ายเดียวกัน"
        }]) : (o = "🔴 รายได้หดตัว ต้องการแผนกระตุ้นและลดรอยรั่วทันที", a = [{
          tag: "Revenue Leakage",
          text: "ระบบการเรียกเก็บเงินมีรอยรั่วเร่งด่วน — ตรวจสอบรายการวัสดุและสมุนไพรเบิกฉุกเฉิน หรือ Missing Charges"
        }, {
          tag: "Throughput Time",
          text: "คอขวดทำให้รับคิวได้น้อยลง — จัด Fast Track ช่วยเร่งระบายคนไข้กลุ่มที่ต้องการนวดเดี่ยว"
        }, {
          tag: "Patient Acquisition",
          text: "โปรโมทคอร์สแพทย์แผนไทยผ่าน Tele-medicine / Social Media หาลูกค้าใหม่"
        }]);
        const r = 500,
          p = 1e3;
        let j = "";
        return s < r ? j = `⚠️ Revenue/Visit อยู่ที่ ฿${Math.round(s).toLocaleString()} สะท้อนกลุ่มผู้ป่วยที่มาทำการรักษาพื้นฐาน (นวดอย่างเดียว) — เสนอให้จัดเป็น Package คู่กับการอบ/ประคบ` : s > p ? j = `✅ Revenue/Visit อยู่ที่ ฿${Math.round(s).toLocaleString()} แสดงถึงศักยภาพของการสร้างรายได้ร่วมกับหัตถการพิเศษ — ควรพิจารณาทำระบบ VIP Membership` : j = `📊 Revenue/Visit อยู่ที่ ฿${Math.round(s).toLocaleString()} อยู่ในเกณฑ์มาตรฐาน — สามารถพิจารณาแพ็กเกจเสริมระดับ Moderate เพื่ออัปยอดบิล`, e.jsxs("div", {
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
                background: "linear-gradient(180deg, #10b981, #059669)",
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
                background: "rgba(16,185,129,.08)",
                padding: "2px 8px",
                borderRadius: "99px"
              },
              children: "EXECUTIVE ADVISORY"
            })]
          }), e.jsx("div", {
            className: "glass-card",
            style: {
              padding: "1.5rem",
              background: "linear-gradient(135deg, rgba(16,185,129,.05) 0%, rgba(5,150,105,.02) 100%)",
              border: "1px solid rgba(16,185,129,.2)"
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
                      color: "#10b981",
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
                    children: o
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
                      color: m >= 0 ? "#10b981" : "#f43f5e",
                      letterSpacing: "-0.02em"
                    },
                    children: [m >= 0 ? "+" : "", m.toFixed(1), "%"]
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
                    children: j
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
                    children: a.map((y, $) => e.jsxs("li", {
                      children: [e.jsxs("strong", {
                        style: {
                          color: "#10b981"
                        },
                        children: [y.tag, ": "]
                      }), y.text]
                    }, $))
                  })]
                })]
              })]
            })
          })]
        })
      })()
    }), !v.ttmToday && b && (() => {
      const t = b,
        i = t.total ?? 0,
        n = t.completed ?? 0,
        f = W ? 0 : t.waiting ?? 0,
        g = i > 0 ? Math.round(n / i * 100) : 0,
        h = t.yesterday_total ?? t.yesterday ?? 0,
        c = h > 0 ? Math.round((i - h) / h * 100) : 0;
      return e.jsx(K, {
        columns: 4,
        gap: "10px",
        metrics: [{
          label: "ผู้ป่วยวันนี้",
          value: i,
          icon: "🌿",
          status: i > 0 ? "success" : "neutral",
          trend: c !== 0 ? `${c>0?"+":""}${c}% vs เมื่อวาน` : void 0
        }, {
          label: "เสร็จสิ้น",
          value: `${g}%`,
          icon: "✅",
          status: g >= 80 ? "success" : g >= 50 ? "warning" : "danger"
        }, {
          label: "รอรับบริการ",
          value: f,
          unit: "ราย",
          icon: "⏳",
          status: f <= 3 ? "success" : f <= 8 ? "warning" : "danger"
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
          label: "เวลาให้บริการ",
          value: W ? "ปิดแล้ว" : "เปิด",
          icon: "🕐",
          status: W ? "neutral" : "success"
        }]
      })
    })(), e.jsx(F, {
      name: "AI Analytics Cards",
      children: !v.ttmToday && !v.ttmAnalytics && (() => {
        const t = b || {},
          i = u || {},
          n = t.total ?? 0;
        t.completed;
        const f = W ? 0 : t.waiting ?? 0,
          g = i.tpi ?? 0,
          h = i.avg_wait_time ?? 0,
          c = i.completion_rate ?? 0,
          l = i.avg_revenue_per_visit ?? 0,
          m = i.total_revenue ?? 0,
          s = i.avg_daily_visits ?? 0,
          o = i.unique_patients ?? t.unique_patients ?? 0,
          a = t.elderly ?? 0,
          r = t.male ?? 0,
          p = t.female ?? 0,
          j = n > 0 ? Math.round(a / n * 100) : 0,
          y = s > 0 ? Math.min(100, Math.round(s / 50 * 100)) : 0;
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
              children: "🧠 AI Intelligence Module — แพทย์แผนไทย"
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                background: "rgba(124,58,237,.08)",
                padding: "2px 8px",
                borderRadius: "99px"
              },
              children: "Rule-based + Real-time"
            })]
          }), e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px"
            },
            children: [e.jsx(z, {
              title: "TPI Score Analysis",
              icon: "🌿",
              priority: g >= 80 ? "LOW" : g >= 60 ? "MEDIUM" : "HIGH",
              summary: `TPI (Thai Medicine Performance Index) อยู่ที่ ${g}/100 — ${g>=80?"ระดับดีเยี่ยม ให้บริการมีประสิทธิภาพสูง":g>=60?"ระดับมาตรฐาน ยังมีโอกาสปรับปรุง":"ต่ำกว่ามาตรฐาน ต้องเร่งแก้ไข"}`,
              analysis: `Wait ${h}min · Completion ${c}% · Rev/Visit ฿${l.toLocaleString()} · Avg ${s} visits/day · ${o} unique patients (30d)`,
              recommendation: g >= 80 ? "รักษามาตรฐาน TPI ≥80 · พิจารณาขยาย Service Line ที่มี Margin สูง (ประคบ+อบ Package)" : "เร่งปรับปรุง Wait Time + Completion Rate เพื่อยกระดับ TPI · จัดทำ Appointment system ลด Walk-in",
              confidence: 92,
              lastUpdated: "Real-time",
              gradient: "#10b981",
              gradientFrom: "rgba(16,185,129,.08)",
              gradientTo: "rgba(5,150,105,.03)",
              borderColor: "rgba(16,185,129,.25)"
            }), e.jsx(z, {
              title: "Utilization & Capacity",
              icon: "⚙️",
              priority: y > 85 ? "HIGH" : y > 60 ? "MEDIUM" : "LOW",
              summary: `Utilization Rate ≈ ${y}% — ${y>85?"กำลังเต็มพิกัด ต้องเพิ่ม Capacity":y>60?"ใช้งานระดับปานกลาง ยังมีช่องว่าง":"ยังรับผู้ป่วยได้อีกมาก"} · เฉลี่ย ${s} ราย/วัน`,
              analysis: `Wait ${h}min · ${f} รอตอนนี้ · Peak: ${_.forecast.nextPeak} · Staffing: ${_.staffing.status} · Forecast intensity: ${_.forecast.intensity}`,
              recommendation: y > 85 ? "เพิ่ม Therapist ช่วง Peak + ขยายเวลาให้บริการ · พิจารณาเปิด Extended hours 1 วัน/สัปดาห์" : "เพิ่มผู้ป่วยผ่าน Cross-referral จากกายภาพบำบัด/ออร์โธ · โปรโมท Wellness packages",
              confidence: 88,
              lastUpdated: "Real-time",
              gradient: "#0ea5e9",
              gradientFrom: "rgba(14,165,233,.08)",
              gradientTo: "rgba(2,132,199,.03)",
              borderColor: "rgba(14,165,233,.25)"
            }), e.jsx(z, {
              title: "Patient Demographics Intelligence",
              icon: "👥",
              priority: j > 50 ? "MEDIUM" : "LOW",
              summary: `วันนี้ ${n} ราย: ชาย ${r} หญิง ${p} · ผู้สูงอายุ ${a} ราย (${j}%) · Unique ${o} (30d)`,
              analysis: `${j>40?"ผู้สูงอายุสัดส่วนสูง — ควรเตรียม Accessibility/Wheelchair":"สัดส่วนผู้สูงอายุปกติ"} · Gender ratio ${r>0&&p>0?(r/p).toFixed(1):"—"} M:F · Chronic care group มีโอกาสสูงที่จะเป็น Repeat visitors`,
              recommendation: j > 40 ? "จัดบริการ Elderly-friendly: (1) ลดเวลารอ Priority Queue (2) Home visit program (3) ยาสมุนไพรพร้อมจัดส่ง (4) นวดผู้สูงอายุ Gentle technique" : "ขยายฐานลูกค้า Working-age ด้วย Corporate wellness + After-work clinic · สร้าง LINE CRM สำหรับนัดหมาย",
              confidence: 85,
              lastUpdated: "Real-time",
              gradient: "#8b5cf6",
              gradientFrom: "rgba(139,92,246,.08)",
              gradientTo: "rgba(109,40,217,.03)",
              borderColor: "rgba(139,92,246,.25)"
            }), e.jsx(z, {
              title: "Revenue Intelligence",
              icon: "💰",
              priority: l < 300 ? "HIGH" : l < 500 ? "MEDIUM" : "LOW",
              summary: `Rev/Visit ฿${l.toLocaleString()} · รายได้รวม 30d ฿${((m||0)/1e3).toFixed(0)}k — ${l<300?"ต่ำกว่าเกณฑ์ ตรวจสอบ Billing":l>=500?"สูงกว่าเกณฑ์ ดีเยี่ยม":"อยู่ในเกณฑ์มาตรฐาน"}`,
              analysis: `Avg Rev/Visit ฿${l.toLocaleString()} · Daily ≈ ฿${((m||0)/30/1e3).toFixed(1)}k · ${l<300?"อาจมี Missing charges สมุนไพร/น้ำมัน/วัสดุ":"Revenue per visit สอดคล้องกับ Service mix"}`,
              recommendation: l < 300 ? "Audit billing ทุก visit — ตรวจสอบ Material charges (สมุนไพร/น้ำมัน) · จัดทำ Package: นวด+ประคบ+อบ+ยาหม้อ" : "พัฒนา Premium wellness packages · VIP Membership program · Corporate tie-ups",
              confidence: 86,
              lastUpdated: "30d avg",
              gradient: "#f59e0b",
              gradientFrom: "rgba(245,158,11,.08)",
              gradientTo: "rgba(217,119,6,.03)",
              borderColor: "rgba(245,158,11,.25)"
            })]
          })]
        })
      })()
    }), !v.ttmToday && b?.top_diagnoses && b.top_diagnoses.length > 0 && e.jsxs(e.Fragment, {
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
            background: "linear-gradient(180deg, #10b981, #059669)",
            borderRadius: "99px"
          }
        }), e.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            letterSpacing: "-0.01em"
          },
          children: "🏷️ Top Diagnoses วันนี้ — แพทย์แผนไทย"
        }), e.jsx("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            background: "rgba(16,185,129,.08)",
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
          children: (b.top_diagnoses || []).slice(0, 10).map((t, i) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 8px",
              borderRadius: "8px",
              background: i === 0 ? "rgba(16,185,129,.06)" : i < 3 ? "rgba(16,185,129,.02)" : "transparent"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: i < 3 ? "#10b981" : "#94a3b8",
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
                color: "#10b981",
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
          background: "linear-gradient(135deg, rgba(16,185,129,.12) 0%, rgba(5,150,105,.06) 100%)",
          border: "1px solid rgba(16,185,129,.2)",
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
            background: "radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), v.ttmToday ? e.jsxs("div", {
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
          const t = d.total ?? 0,
            i = d.completed ?? 0,
            n = W ? 0 : d.waiting ?? 0,
            f = t > 0 ? Math.round(i / t * 100) : 0;
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
                  color: "#10b981",
                  margin: 0
                },
                children: "🌿 แพทย์แผนไทยวันนี้"
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  gap: "6px"
                },
                children: [e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    color: "#10b981",
                    fontWeight: 700,
                    background: "rgba(16,185,129,.08)",
                    padding: "2px 8px",
                    borderRadius: "99px"
                  },
                  children: ["เวลาให้บริการ 07.00-", String(w).padStart(2, "0"), ".", String(B).padStart(2, "0"), " น."]
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600,
                    background: "rgba(16,185,129,.08)",
                    padding: "2px 8px",
                    borderRadius: "99px"
                  },
                  children: "Real-time"
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
                  fontSize: "42px",
                  fontWeight: 900,
                  color: "#10b981",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 0 40px rgba(16,185,129,.3)"
                },
                children: t.toLocaleString("th-TH")
              }), e.jsx("span", {
                style: {
                  fontSize: "14px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: "ราย"
              }), d.today_vs_yesterday_pct !== void 0 && d.today_vs_yesterday_pct !== 0 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: d.today_vs_yesterday_pct > 0 ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)",
                  color: d.today_vs_yesterday_pct > 0 ? "#10b981" : "#ef4444"
                },
                children: [d.today_vs_yesterday_pct > 0 ? "▲" : "▼", " ", Math.abs(d.today_vs_yesterday_pct), "% vs เมื่อวาน"]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: "rgba(16,185,129,.1)",
                  color: "#10b981"
                },
                children: ["✅ ", i.toLocaleString("th-TH"), " เสร็จ (", f, "%)"]
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
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: ["♂️", d.male || 0, " ♀️", d.female || 0]
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
                  children: ["✅ เสร็จสิ้น ", i.toLocaleString("th-TH"), " (", f, "%)"]
                }), e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#f59e0b"
                  },
                  children: ["รอรักษาสะสม ", n.toLocaleString("th-TH"), " คน"]
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
                    width: `${Math.min(100,f)}%`,
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
      }), e.jsxs("div", {
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: `linear-gradient(135deg, ${_.staffing.color}15 0%, transparent 100%)`,
          border: `1.5px solid ${_.staffing.color}30`,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          position: "relative"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 800,
              color: _.staffing.color,
              textTransform: "uppercase",
              letterSpacing: "0.08em"
            },
            children: "🤖 AI Load Predictor"
          }), e.jsx("div", {
            className: "pulse",
            style: {
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: _.staffing.color
            }
          })]
        }), e.jsxs("div", {
          children: [e.jsx("p", {
            style: {
              margin: 0,
              fontSize: "18px",
              fontWeight: 900,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.02em"
            },
            children: _.staffing.status
          }), e.jsx("p", {
            style: {
              margin: "2px 0 0",
              fontSize: "12px",
              color: _.staffing.color,
              fontWeight: 700,
              lineHeight: 1.4
            },
            children: _.staffing.recommendation
          })]
        }), e.jsxs("div", {
          style: {
            marginTop: "auto",
            borderTop: "1px solid rgba(0,0,0,0.05)",
            paddingTop: "6px",
            display: "flex",
            justifyContent: "space-between"
          },
          children: [e.jsxs("span", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: ["Next Peak: ", _.forecast.nextPeak]
          }), e.jsxs("span", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: _.staffing.color
            },
            children: ["Intensity: ", _.forecast.intensity]
          })]
        })]
      }), [{
        title: "Unique Patients",
        value: d.unique_patients ?? 0,
        icon: "👥",
        unit: "คน",
        grad: ["#0ea5e9", "#0284c7"],
        glow: "rgba(14,165,233,.2)",
        loading: v.ttmToday
      }, {
        title: "สำเร็จวันนี้",
        value: (d.total ?? 0) > 0 ? `${Math.round((d.completed??0)/d.total*100)}%` : "—",
        icon: "✅",
        unit: "",
        grad: d.total > 0 && d.completed / d.total >= .8 ? ["#10b981", "#059669"] : ["#f59e0b", "#d97706"],
        glow: "rgba(16,185,129,.2)",
        loading: v.ttmToday
      }, {
        title: "ชาย/หญิง",
        value: `${d.male||0}/${d.female||0}`,
        icon: "👤",
        unit: "",
        grad: ["#8b5cf6", "#7c3aed"],
        glow: "rgba(139,92,246,.2)",
        loading: v.ttmToday
      }, {
        title: "ผู้สูงอายุ",
        value: d.elderly ?? 0,
        icon: "👴",
        unit: "ราย",
        grad: (d.elderly ?? 0) > 10 ? ["#f59e0b", "#d97706"] : ["#0ea5e9", "#0284c7"],
        glow: "rgba(14,165,233,.2)",
        loading: v.ttmToday
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
      }, `ttm-kpi-${i}`))]
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
          background: "linear-gradient(180deg, #10b981, #059669)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🌿 Advanced Analytics — Thai Medicine"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(16,185,129,.08)",
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
      children: v.ttmAnalytics ? e.jsxs("div", {
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
        const t = u || {},
          i = t.tpi ?? 0,
          n = i >= 80 ? "#10b981" : i >= 60 ? "#f59e0b" : "#f43f5e",
          f = i >= 90 ? "A+" : i >= 80 ? "A" : i >= 70 ? "B+" : i >= 60 ? "B" : i >= 50 ? "C" : "D",
          g = 72,
          h = Math.PI * g,
          c = Math.min(i / 100, 1) * h,
          l = t.tpi_components || {};
        l.wait_time, l.completion, l.revisit, l.revenue, l.sla;
        const m = [{
            icon: "⏱️",
            label: "เวลารอเฉลี่ย",
            value: `${t.avg_wait_time??0} min`,
            sub: `σ ${t.sd_wait_time??0}min · SLA ≤30min: ${t.wait_sla_pct??0}%`,
            desc: "เวลารอก่อนพบแพทย์แผนไทย (30 วัน)",
            color: (t.avg_wait_time ?? 30) <= 15 ? "#10b981" : (t.avg_wait_time ?? 30) <= 30 ? "#f59e0b" : "#f43f5e",
            problem: (t.avg_wait_time ?? 30) <= 15 ? `รอเฉลี่ย ${t.avg_wait_time??0} min — ดีเยี่ยม (≤15min) ผู้ป่วยได้รับบริการรวดเร็ว SLA ${t.wait_sla_pct??0}%` : (t.avg_wait_time ?? 30) <= 30 ? `รอเฉลี่ย ${t.avg_wait_time??0} min (σ ${t.sd_wait_time??0}) — ยังอยู่ในเกณฑ์ แต่ควรลด มี ${t.wait_over_30m??0} ครั้งที่รอ >30min ผู้ป่วยแผนไทยต้องการ Relax → รอนาน = ไม่ผ่อนคลาย` : `🚨 รอเฉลี่ย ${t.avg_wait_time??0} min — สูง! ${t.wait_over_30m??0} ครั้ง >30min ผู้ป่วยอาจ dropout หรือเลือกไปนวดข้างนอก`,
            recommend: (t.avg_wait_time ?? 30) <= 15 ? "✅ คงมาตรฐาน — Appointment system ทำงานดี" : "📋 ลดเวลารอ: (1) Appointment-based scheduling (2) เพิ่ม Unit ช่วง Peak (3) Pre-screening ก่อนถึงคิว (4) SMS แจ้งคิว real-time (5) เป้าหมาย: ≤15 min"
          }, {
            icon: "🕐",
            label: "เวลารวม (Visit)",
            value: `${t.avg_total_time??0} min`,
            sub: `σ ${t.sd_total_time??0}min · Total SLA ≤60min: ${t.total_sla_pct??0}%`,
            desc: "เวลาเฉลี่ยทั้งกระบวนการ ลงทะเบียน→นวด/ประคบ→ชำระเงิน",
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
            recommend: "📋 Capacity: (1) วิเคราะห์ห้อง/เตียง utilization rate (2) เพิ่ม Therapist ถ้า Utilization >85% (3) Extended hours สำหรับ Peak days"
          }, {
            icon: "⏰",
            label: "Wait >30 min",
            value: `${t.wait_over_30m??0}`,
            sub: "จาก 30 วัน",
            desc: "จำนวนครั้งที่รอนานเกิน 30 นาที",
            color: (t.wait_over_30m ?? 0) < 10 ? "#10b981" : (t.wait_over_30m ?? 0) < 30 ? "#f59e0b" : "#f43f5e",
            problem: (t.wait_over_30m ?? 0) < 10 ? `Wait >30min เพียง ${t.wait_over_30m??0} ครั้ง — Flow ดี ไม่มีปัญหาคอขวด` : `Wait >30min ${t.wait_over_30m??0} ครั้ง — ${(t.wait_over_30m??0)>=30?"🚨 บ่อยเกินไป! ผู้ป่วยรอนานเป็นประจำ":"ต้องเฝ้าระวัง อาจเกิดช่วง Peak"}`,
            recommend: (t.wait_over_30m ?? 0) < 10 ? "✅ ดี — RCA ทุกครั้งที่เกิด wait >30min" : "📋 ลด Long wait: (1) Buffer time ระหว่าง appointment (2) เพิ่ม Therapist ช่วง Peak (3) Parallel processing: เตรียมสมุนไพร/น้ำมัน ล่วงหน้า"
          }],
          s = [{
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
          o = [{
            icon: "💰",
            label: "รายได้ / Visit",
            value: `฿${(t.avg_revenue_per_visit??0).toLocaleString()}`,
            sub: `Max ฿${(t.max_revenue??0).toLocaleString()} · Daily ฿${(t.daily_revenue??0).toLocaleString()}`,
            desc: "รายได้เฉลี่ยต่อ 1 visit แพทย์แผนไทย",
            color: "#0ea5e9",
            problem: `Avg Rev/Visit ฿${(t.avg_revenue_per_visit??0).toLocaleString()} — ${(t.avg_revenue_per_visit??0)<300?"⚠️ ต่ำ อาจมี Under-billing หรือส่วนใหญ่เป็น นวด/ประคบ Basic":"สอดคล้องกับ Service mix"}`,
            recommend: "📋 Optimize: (1) ตรวจสอบ Procedure billing ครบถ้วน (2) เพิ่ม Wellness packages (นวด+ประคบ+อบสมุนไพร) (3) ลด Free visit %"
          }, {
            icon: "💵",
            label: "รายได้รวม (30d)",
            value: `฿${((t.total_revenue??0)/1e3).toFixed(0)}k`,
            sub: `${(t.total_visits??0).toLocaleString()} visits`,
            desc: "รายได้รวมแพทย์แผนไทย 30 วัน",
            color: "#10b981",
            problem: `Revenue ฿${((t.total_revenue??0)/1e3).toFixed(0)}k / 30 วัน จาก ${(t.total_visits??0).toLocaleString()} visits`,
            recommend: "📋 เพิ่มรายได้: (1) Wellness packages (นวด+ประคบ+อบ+ยาสมุนไพร) (2) Corporate wellness program (3) Referral จาก Rehab/Ortho"
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
                  strokeDasharray: `${c} ${h}`,
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
                  children: "SQI / TPI Score"
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
                  children: f
                }), e.jsx("div", {
                  style: {
                    fontSize: "var(--fs-xs)",
                    fontWeight: 700,
                    color: n
                  },
                  children: i >= 80 ? "ประสิทธิภาพสูง (Optimal)" : i >= 60 ? "ระดับมาตรฐาน (Fair)" : "ต้องปรับปรุง (Critical)"
                }), e.jsx("div", {
                  style: {
                    fontSize: "var(--fs-2xs)",
                    color: "var(--md-text-tertiary)",
                    marginTop: "2px"
                  },
                  children: "Service Quality Index (AI Composite)"
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
                  children: "AI Component Breakdown"
                }), Object.entries(t.sqi_components || {}).map(([a, r], p) => {
                  const j = r.score >= 70 ? "#10b981" : r.score >= 40 ? "#f59e0b" : "#f43f5e",
                    y = {
                      sla_compliance: "SLA Pass",
                      process_completion: "Completion",
                      wait_stability: "Stability",
                      service_yield: "Yield"
                    };
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
                      children: y[a] || a
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
                          background: j,
                          borderRadius: "99px",
                          transition: "width 0.8s ease"
                        }
                      })
                    }), e.jsx("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: j,
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
                cards: m
              }, {
                title: "Quality & Outcomes",
                color: "#0ea5e9",
                cards: s
              }, {
                title: "Financial Intelligence",
                color: "#f59e0b",
                cards: o
              }].map((a, r) => e.jsxs("div", {
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
                      background: `linear-gradient(180deg, ${a.color}, ${a.color}99)`,
                      borderRadius: "99px"
                    }
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      color: a.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: a.title
                  })]
                }), e.jsx("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px"
                  },
                  children: a.cards.map((p, j) => e.jsxs("div", {
                    style: {
                      padding: "8px 10px",
                      borderRadius: "10px",
                      background: `${p.color}06`,
                      border: `1px solid ${p.color}20`
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
                        children: p.icon
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
                          children: p.label
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
                          children: p.desc
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
                            color: p.color,
                            letterSpacing: "-0.02em"
                          },
                          children: p.value
                        }), e.jsx("p", {
                          style: {
                            margin: 0,
                            fontSize: "12px",
                            color: "var(--md-text-tertiary)",
                            fontWeight: 600
                          },
                          children: p.sub
                        })]
                      })]
                    }), p.problem && e.jsxs("div", {
                      style: {
                        marginTop: "6px",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        background: "rgba(203,213,225,.04)",
                        borderLeft: `3px solid ${p.color}`
                      },
                      children: [e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: 700,
                          color: p.color,
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
                        children: p.problem
                      })]
                    }), p.recommend && e.jsxs("div", {
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
                        children: p.recommend
                      })]
                    })]
                  }, j))
                })]
              }, r))
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
                children: "🕐 Load vs Prediction (Today)"
              }), e.jsx(C, {
                width: "100%",
                height: 130,
                children: e.jsxs(H, {
                  data: _.hourlyChart,
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(I, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(L, {
                    dataKey: "label",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 8,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1,
                    tickFormatter: a => a.replace(":00", "")
                  }), e.jsx(T, {
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 9
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 20
                  }), e.jsx(A, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    }
                  }), e.jsx(M, {
                    dataKey: "count",
                    fill: "#10b981",
                    radius: [3, 3, 0, 0],
                    barSize: 8,
                    name: "Actual Load"
                  }), e.jsx(E, {
                    type: "monotone",
                    dataKey: "prediction",
                    stroke: "#f59e0b",
                    strokeWidth: 2,
                    dot: !1,
                    strokeDasharray: "5 5",
                    name: "AI Prediction"
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
              }), e.jsx(C, {
                width: "100%",
                height: 130,
                children: e.jsxs(O, {
                  data: t.age_distribution || [],
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(I, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(L, {
                    dataKey: "group",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 9,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1
                  }), e.jsx(T, {
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 9
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 24
                  }), e.jsx(A, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: a => [`${a} ราย`, "จำนวน"]
                  }), e.jsx(M, {
                    dataKey: "count",
                    radius: [4, 4, 0, 0],
                    barSize: 18,
                    children: (t.age_distribution || []).map((a, r) => {
                      const p = ["#f43f5e", "#f59e0b", "#eab308", "#10b981", "#0ea5e9", "#8b5cf6"];
                      return e.jsx(X, {
                        fill: p[r] || "#7c3aed"
                      }, r)
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
              }), e.jsx(C, {
                width: "100%",
                height: 130,
                children: e.jsxs(H, {
                  data: t.monthly_trend || [],
                  margin: {
                    top: 4,
                    right: 4,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(I, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(L, {
                    dataKey: "month",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 10,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1
                  }), e.jsx(T, {
                    yAxisId: "left",
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 10
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 28
                  }), e.jsx(T, {
                    yAxisId: "right",
                    orientation: "right",
                    tick: {
                      fill: "#10b981",
                      fontSize: 9
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 28,
                    tickFormatter: a => `${(a/1e3).toFixed(0)}k`
                  }), e.jsx(A, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: (a, r) => r === "visits" ? [`${a} ราย`, "จำนวน"] : r === "total_rev" ? [`฿${a.toLocaleString()}`, "รายได้"] : [`${a}`, r]
                  }), e.jsx(M, {
                    yAxisId: "left",
                    dataKey: "visits",
                    fill: "rgba(16,185,129,.3)",
                    radius: [4, 4, 0, 0],
                    barSize: 14
                  }), e.jsx(E, {
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
              children: (t.top_diagnoses || []).slice(0, 8).map((a, r) => e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  background: r === 0 ? "rgba(16,185,129,.06)" : "transparent"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#10b981",
                    width: "16px",
                    textAlign: "center"
                  },
                  children: r + 1
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)",
                    fontFamily: "JetBrains Mono, monospace",
                    width: "48px",
                    flexShrink: 0
                  },
                  children: a.icd10
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
                  children: a.name
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#10b981",
                    flexShrink: 0
                  },
                  children: a.count
                }), e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    flexShrink: 0
                  },
                  children: ["฿", a.avg_rev?.toLocaleString()]
                })]
              }, r))
            })]
          })]
        })
      })()
    }), !v.ttmAnalytics && u && (() => {
      const t = u || {},
        i = t.tpi ?? 0,
        n = t.avg_wait_time ?? 0,
        f = t.sd_wait_time ?? 0;
      t.avg_total_time;
      const g = t.wait_over_30m ?? 0,
        h = t.wait_sla_pct ?? 0,
        c = t.completion_rate ?? 0,
        l = t.dropout_count ?? 0,
        m = t.revisit_rate ?? 0;
      t.avg_daily_visits;
      const s = t.total_visits ?? 0,
        o = t.avg_revenue_per_visit ?? 0;
      t.total_revenue;
      const a = t.peak_hour?.label || "—",
        r = [];
      n > 20 && r.push({
        priority: 1,
        severity: n > 30 ? "critical" : "warning",
        title: `🔴 เวลารอสูง: ${n} min (σ ${f}) — SLA ≤30min ผ่านเพียง ${h}% · ${g} ครั้ง >30min`,
        rootCause: `ผู้ป่วยแพทย์แผนไทยรอเฉลี่ย ${n} นาที (σ ${f}) ── สาเหตุ: (1) Appointment over-booking — นัดเกินกว่าห้อง/เตียงจะรองรับ (2) Session time ไม่แน่นอน — นวด/ประคบ/อบสมุนไพร ใช้เวลาต่างกัน (3) Walk-in ไม่มีนัดมาซ้อน slot (4) Peak hour ${a} — ผู้ป่วยกระจุกตัว (5) Therapist ไม่เพียงพอช่วง Peak`,
        cascadeEffect: `Wait สูง → ผู้ป่วย Dropout (ปัจจุบัน ${l} ราย) → Revenue loss → คนไข้เลือกไปนวดข้างนอก → Volume ลดลง ● Wait สูง → ผู้ป่วยไม่ Relax → ผล Treatment ลดลง → Revisit เพิ่ม ● TPI ลดลง (${i}/100)`,
        fixFirst: `🔧 ด่วนที่สุด: (1) Appointment-based scheduling — จำกัด Walk-in (2) Buffer time ระหว่าง Session (3) เพิ่ม Therapist ช่วง Peak ${a} (4) เตรียมสมุนไพร/น้ำมันล่วงหน้า (5) SMS คิว real-time (6) เป้าหมาย: ≤15 min ภายใน 30 วัน`,
        color: n > 30 ? "#f43f5e" : "#f59e0b"
      }), c < 90 && r.push({
        priority: 2,
        severity: c < 80 ? "critical" : "warning",
        title: `🟡 Completion Rate ต่ำ: ${c}% — Dropout ${l} ราย`,
        rootCause: `${c}% เท่านั้นที่รักษาเสร็จ — ${l} ราย Dropout ── สาเหตุ: (1) Wait time นาน → ผู้ป่วยเลือกออก (2) Session ยาว → ผู้ป่วยไม่มีเวลา (3) ค่าใช้จ่ายสูงกว่าคาด (4) เวลาจำกัด — มาตอนเช้า แต่คิวถึงบ่าย`,
        cascadeEffect: `Dropout สูง → Revenue loss ฿${(l*o).toLocaleString()} → Therapist มี idle time → ห้องว่าง ● ผู้ป่วยที่ Dropout → อาการไม่ดีขึ้น → กลับมาใช้บริการแพงกว่า`,
        fixFirst: "🔧 ลด Dropout: (1) แจ้ง Wait time estimate ทุกราย (2) ให้ข้อมูลค่าใช้จ่ายล่วงหน้า (3) Express treatment option (30 min) (4) Flexible scheduling — นัดรอบบ่าย/เย็น (5) เป้าหมาย: Completion ≥95%",
        color: c < 80 ? "#f43f5e" : "#f59e0b"
      }), m > 10 && r.push({
        priority: 3,
        severity: m > 20 ? "critical" : "warning",
        title: `🟡 Revisit 7d สูง: ${m}% — Treatment Quality Concern`,
        rootCause: `${m}% กลับมาภายใน 7 วัน — ต้องแยก Planned (นวดต่อเนื่อง, แผนรักษา) vs Unplanned (อาการไม่ดีขึ้น, แพ้สมุนไพร)`,
        cascadeEffect: "Unplanned revisit → เพิ่ม Workload Therapist → Wait time เพิ่ม → Satisfaction ลดลง ● แพ้สมุนไพร → ต้อง Monitor ● ผู้ป่วยไม่เชื่อมั่น → Volume ลดลง",
        fixFirst: "🔧 ลด Unplanned Revisit: (1) Audit ทุก 7d revisit — แยก Planned vs ไม่ดีขึ้น (2) ทำ Allergy screening ก่อนใช้สมุนไพร (3) Post-treatment instruction ชัดเจน (4) Follow-up call 48 ชม. หลัง Treatment",
        color: m > 20 ? "#f43f5e" : "#f59e0b"
      }), o < 300 && s > 50 && r.push({
        priority: 4,
        severity: "warning",
        title: `🟠 Revenue/Visit ต่ำ: ฿${o.toLocaleString()} — อาจมี Under-billing หรือ Service mix ไม่สมดุล`,
        rootCause: `Rev/Visit ฿${o.toLocaleString()} ← ต่ำสำหรับแผนไทย (ควร ≥฿300) ── สาเหตุ: (1) ส่วนใหญ่เป็น Basic service (นวดเท่านั้น) ไม่มี Package (2) Under-billing — ทำแล้วไม่ charge ค่าสมุนไพร/น้ำมัน (3) สิทธิ์บัตรทอง/ประกันสังคม Rate ต่ำ (4) Missing charges จาก Material/สมุนไพร`,
        cascadeEffect: "Low revenue → Budget แผนไทยไม่เพียงพอ → ไม่สามารถซื้อสมุนไพรคุณภาพ → Service quality ลดลง → ผู้ป่วยลดลง = วงจรลบ",
        fixFirst: "🔧 เพิ่ม Revenue: (1) Audit billing completeness (2) Wellness packages: นวด+ประคบ+อบสมุนไพร+ยาหม้อ (3) Corporate wellness program (4) Verify procedure coding ถูกต้อง (5) เก็บค่าสมุนไพร/วัสดุครบถ้วน",
        color: "#f59e0b"
      }), r.length === 0 && r.push({
        priority: 0,
        severity: "good",
        title: "✅ แพทย์แผนไทย ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน",
        rootCause: `TPI ${i}/100 · Wait ${n}min · Completion ${c}% · Revisit ${m}% — ตัวชี้วัดอยู่ในเกณฑ์ดี`,
        cascadeEffect: "ไม่มีผลกระทบลูกโซ่ — คลินิกแพทย์แผนไทย ทำงานได้มาตรฐาน",
        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ TPI ≥ ${Math.min(i+10,100)} (2) เพิ่ม Wellness services (3) Patient satisfaction survey`,
        color: "#10b981"
      }), r.sort((x, k) => x.priority - k.priority);
      const p = r.filter(x => x.severity === "critical").length,
        j = r.filter(x => x.severity === "warning").length,
        y = Math.min(10, p * 3 + j * 1.5),
        $ = y >= 7 ? "#f43f5e" : y >= 4 ? "#f59e0b" : "#10b981",
        U = y >= 7 ? "ต้องดำเนินการทันที" : y >= 4 ? "ควรแก้ไขเร็ว" : "สถานการณ์ปกติ";
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
            children: "Cross-analysis Thai Med"
          })]
        }), e.jsxs("div", {
          className: `glass-card ${y>=7?"alert-critical":y>=4?"alert-warning":""}`,
          style: {
            padding: "1.5rem",
            border: `1.5px solid ${$}25`
          },
          children: [e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${$}08, ${$}03)`,
              border: `1px solid ${$}20`,
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
                    color: $,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em"
                  },
                  children: "⚡ ระดับความเร่งด่วนรวม — แพทย์แผนไทย"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: $,
                    background: `${$}15`,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    border: `1px solid ${$}25`
                  },
                  children: U
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
                }), j > 0 && e.jsxs(e.Fragment, {
                  children: [" + ", e.jsxs("strong", {
                    style: {
                      color: "#f59e0b"
                    },
                    children: [j, " เตือน"]
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
                    width: `${y*10}%`,
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
                  color: $,
                  lineHeight: 1
                },
                children: [Math.round(y), e.jsx("span", {
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
                  color: $,
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
            children: r.map((x, k) => e.jsxs("div", {
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
            }, k))
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
              children: "🗺️ แผนที่ความเชื่อมโยง — Thai Medicine Bottleneck Chain"
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
                label: `Dropout ${l}`,
                color: "#f43f5e"
              }, {
                label: `Completion ${c}%`,
                color: "#0ea5e9"
              }, {
                label: `Revisit ${m}%`,
                color: "#e11d48"
              }, {
                label: `Rev ฿${o}`,
                color: "#8b5cf6"
              }, {
                label: `TPI = ${i}/100`,
                color: "#10b981"
              }].map((x, k) => e.jsxs(N.Fragment, {
                children: [k > 0 && e.jsx("span", {
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
              }, k))
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
              }), " ปัญหาแพทย์แผนไทยเริ่มจาก ", e.jsx("strong", {
                style: {
                  color: "#f59e0b"
                },
                children: "Wait time สูง"
              }), " → ผู้ป่วย Dropout → Revenue ลดลง — ", e.jsx("strong", {
                children: "แก้ ด่วนที่ 1 ก่อน"
              }), " (ลดเวลารอด้วย Appointment system + เพิ่ม Therapist) จะปรับปรุง KPI ทุกตัวพร้อมกัน"]
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
          background: "linear-gradient(180deg, #10b981, #059669)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💰 รายได้โดยประมาณ แพทย์แผนไทย — ปีงบประมาณ (3 ปีย้อนหลัง)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(16,185,129,.08)",
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
      children: v.ttmRevenueFiscal ? e.jsxs("div", {
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
        const i = S.ttmRevenueFiscal?.fiscal_years || [];
        if (i.length === 0) return e.jsx("p", {
          style: {
            fontSize: "var(--fs-sm)",
            color: "var(--md-text-tertiary)",
            textAlign: "center",
            padding: "2rem 0"
          },
          children: "ไม่พบข้อมูลรายได้"
        });
        const n = ["#94a3b8", "#34d399", "#10b981"],
          g = ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((s, o) => {
            const a = {
              month: s
            };
            return i.forEach((r, p) => {
              a[`fy${p}`] = r.months[o]?.revenue || 0
            }), a
          }),
          h = i[i.length - 1],
          c = i.length >= 2 ? i[i.length - 2] : null,
          l = h.comparable_months || 12,
          m = c && (c.comparable_revenue ?? c.total_revenue) > 0 ? Math.round(((h.comparable_revenue ?? h.total_revenue) - (c.comparable_revenue ?? c.total_revenue)) / (c.comparable_revenue ?? c.total_revenue) * 1e3) / 10 : 0;
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
            children: i.map((s, o) => {
              const a = o === i.length - 1,
                r = n[o];
              return e.jsxs("div", {
                style: {
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: a ? `linear-gradient(135deg, ${r}12, ${r}05)` : `${r}06`,
                  border: `1px solid ${r}${a?"30":"15"}`
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
                  }), a && e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#10b981",
                      background: "rgba(16,185,129,.1)",
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
                }), a && c && e.jsxs("div", {
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
                      color: m >= 0 ? "#10b981" : "#f43f5e"
                    },
                    children: [m >= 0 ? "📈" : "📉", " YoY ", m >= 0 ? "+" : "", m, "%"]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-tertiary)",
                      fontWeight: 500
                    },
                    children: ["vs ", c.fiscal_label, " (เทียบ ", l, " ด.)"]
                  })]
                })]
              }, o)
            })
          }), e.jsx(C, {
            width: "100%",
            height: 280,
            children: e.jsxs(O, {
              data: g,
              margin: {
                top: 8,
                right: 12,
                bottom: 0,
                left: 4
              },
              children: [e.jsx(I, {
                strokeDasharray: "3 3",
                stroke: "rgba(203,213,225,.3)",
                vertical: !1
              }), e.jsx(L, {
                dataKey: "month",
                tick: {
                  fill: "#6b7280",
                  fontSize: 10,
                  fontWeight: 700
                },
                axisLine: !1,
                tickLine: !1
              }), e.jsx(T, {
                tick: {
                  fill: "#9ca3af",
                  fontSize: 9
                },
                axisLine: !1,
                tickLine: !1,
                width: 40,
                tickFormatter: s => s >= 1e6 ? `${(s/1e6).toFixed(0)}M` : `${(s/1e3).toFixed(0)}K`
              }), e.jsx(A, {
                contentStyle: {
                  background: "#fff",
                  border: "1px solid #e8eaf2",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,.08)"
                },
                formatter: (s, o) => {
                  const a = Number(o.replace("fy", ""));
                  return [`฿${(s/1e6).toFixed(2)}M`, i[a]?.fiscal_label || o]
                }
              }), i.map((s, o) => e.jsx(M, {
                dataKey: `fy${o}`,
                fill: n[o],
                radius: [3, 3, 0, 0],
                barSize: i.length <= 2 ? 20 : 14,
                opacity: o === i.length - 1 ? 1 : .5,
                name: `fy${o}`
              }, o))]
            })
          }), e.jsx("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "center"
            },
            children: i.map((s, o) => e.jsxs("div", {
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
                  background: n[o],
                  opacity: o === i.length - 1 ? 1 : .5
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
            }, o))
          })]
        })
      })()
    }), e.jsx(Z, {
      data: S.ttmAnalytics?.procedure_breakdown,
      loading: S.loading?.ttmAnalytics
    }), e.jsx(F, {
      name: "AI Server Insights",
      children: e.jsx(Q, {
        data: S.thaimedAI,
        theme: "thaimed",
        title: "AI Thai Med Intelligence"
      })
    })]
  })
}
const P = {
  นวดแผนไทย: {
    color: "#10b981",
    icon: "🤲"
  },
  "อบ/ประคบสมุนไพร": {
    color: "#f59e0b",
    icon: "🌿"
  },
  ฝั งเข็ ม: {
    color: "#7c3aed",
    icon: "🔬"
  },
  ยาสมุนไพร: {
    color: "#0ea5e9",
    icon: "🌱"
  },
  อื่ นๆ: {
    color: "#94a3b8",
    icon: "📋"
  }
};

function Z({
  data: S,
  loading: R
}) {
  if (R) return e.jsx("div", {
    className: "skeleton",
    style: {
      height: "120px",
      borderRadius: "14px"
    }
  });
  if (!S || S.length === 0) return null;
  const b = S.reduce((u, v) => u + v.visits, 0);
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
          background: "linear-gradient(180deg, #10b981, #059669)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)"
        },
        children: "🌿 สัดส่วนหัตถการแพทย์แผนไทย (30 วัน)"
      }), e.jsxs("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(16,185,129,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: [b.toLocaleString(), " ครั้ง"]
      })]
    }), e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: [e.jsx("div", {
        style: {
          display: "flex",
          height: "12px",
          borderRadius: "99px",
          overflow: "hidden",
          marginBottom: "16px"
        },
        children: S.map((u, v) => {
          const d = P[u.type] || P.อื่ นๆ,
            w = b > 0 ? u.visits / b * 100 : 0;
          return w > 0 ? e.jsx("div", {
            style: {
              width: `${w}%`,
              background: d.color,
              transition: "width 0.6s ease"
            },
            title: `${u.type}: ${Math.round(w)}%`
          }, v) : null
        })
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "10px"
        },
        children: S.map((u, v) => {
          const d = P[u.type] || P.อื่ นๆ,
            w = b > 0 ? Math.round(u.visits / b * 100) : 0;
          return e.jsxs("div", {
            style: {
              padding: "12px",
              borderRadius: "12px",
              border: `1.5px solid ${d.color}25`,
              background: `${d.color}06`
            },
            children: [e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "6px"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "16px"
                },
                children: d.icon
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: d.color
                },
                children: u.type
              })]
            }), e.jsx("p", {
              style: {
                margin: "0 0 2px",
                fontSize: "20px",
                fontWeight: 900,
                color: d.color
              },
              children: u.visits.toLocaleString()
            }), e.jsxs("p", {
              style: {
                margin: 0,
                fontSize: "11px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: [w, "% · ", u.patients.toLocaleString(), " คน", u.avg_rev > 0 && ` · ฿${u.avg_rev.toLocaleString()}/ครั้ง`]
            })]
          }, v)
        })
      }), e.jsx("p", {
        style: {
          margin: "12px 0 0",
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600
        },
        children: "หมายเหตุ: จำแนกจากชื่อ ICD-10 — ความแม่นยำขึ้นกับการบันทึกรหัสใน HOSxP"
      })]
    })]
  })
}
const re = N.memo(J);
export {
  re as
  default
};