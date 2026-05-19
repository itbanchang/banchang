import {
  R as v,
  j as e,
  r as z
} from "./vendor-react-ByYOq5k4.js";
import {
  b as q,
  a as J,
  T as U,
  i as Z,
  E as ee,
  j as te,
  K as ie,
  h as re
} from "./shared-ui-OVDEF1.js";
import {
  R as $,
  C as E,
  a as L,
  X as O,
  Y as H,
  T as A,
  A as w,
  b as K,
  B as P,
  c as ae
} from "./vendor-charts-C5q2M-g3.js";
v.memo(function(x) {
  return e.jsx(e.Fragment, {
    children: x.children
  })
});
v.memo(function(x) {
  return e.jsx(e.Fragment, {
    children: x.children
  })
});
v.memo(function(x) {
  return e.jsx(e.Fragment, {
    children: x.children
  })
});
v.memo(function(x) {
  return e.jsx(e.Fragment, {
    children: x.children
  })
});
v.memo(function(x) {
  return e.jsx(e.Fragment, {
    children: x.children
  })
});
v.memo(function(x) {
  return e.jsx(e.Fragment, {
    children: x.children
  })
});
v.memo(function(x) {
  return e.jsx(e.Fragment, {
    children: x.children
  })
});
v.memo(function(x) {
  return e.jsx(e.Fragment, {
    children: x.children
  })
});
const ne = {
  รอคั ดกรอง: "#f5365c",
  กำลั งตรวจ: "#fb6340",
  รอรั บยา: "#5e72e4",
  กลั บบ้ าน: "#2dce89"
};

function se(p) {
  if (!p && p !== 0) return "—";
  if (p < 60) return `${p}m`;
  const x = Math.floor(p / 60),
    i = p % 60;
  return `${x}h ${i>0?i+"m":""}`
}

function T(p) {
  if (!p) return 0;
  const x = Math.min(p.sla_pct || 0, 100),
    i = Math.max(0, Math.min(100, Math.round(100 - (p.avg_total_minutes || 0) / 120 * 100))),
    m = Math.min(100, Math.round((p.throughput || 0) / 30 * 100)),
    u = Math.max(0, 100 - (p.dropout_pct || 0));
  return Math.round(x * .3 + i * .25 + m * .25 + u * .2)
}

function oe() {
  const p = q(t => ({
      opdToday: t.opdToday,
      loading: t.loading,
      opdMonthlyFiscal: t.opdMonthlyFiscal,
      opdRevenueFiscal: t.opdRevenueFiscal,
      opdAI: t.opdAI
    })),
    {
      fetchData: x
    } = J(),
    i = p.opdToday,
    m = p.loading,
    u = p.opdMonthlyFiscal;
  z.useEffect(() => {
    x("opdToday", "/api/opd/today"), x("opdMonthlyFiscal", "/api/opd/monthly-fiscal"), x("opdRevenueFiscal", "/api/opd/revenue-fiscal"), x("opdFlowPrediction", "/api/opd/ai/flow-prediction"), x("opdWaitOptimizer", "/api/opd/ai/wait-optimizer");
    const t = setTimeout(() => x("opdAI", "/api/ai/opd/optimization"), 400);
    return () => clearTimeout(t)
  }, [x]);
  const G = z.useMemo(() => {
      if (!i?.hourly) return [];
      new Date().getHours();
      const t = i.hourly_yesterday || [],
        a = i.hourly_prediction || [],
        r = i.hourly_benchmark || [];
      return i.hourly.map((n, s) => {
        const l = n.hour,
          o = r.find(c => c.hr === l);
        return {
          ...n,
          yesterday: t[s]?.count || 0,
          prediction: a[s]?.count || 0,
          confidence: a[s]?.confidence || 0,
          baseline: o ? o.avg : 0
        }
      }).filter(n => {
        const s = i?.is_holiday ? 12 : 20;
        return n.hour >= 7 && n.hour <= s
      })
    }, [i]),
    M = i?.patients || [],
    y = z.useMemo(() => {
      if (!i) return {
        problems: [],
        critCount: 0,
        warnCount: 0,
        urgencyScore: 0,
        urgencyColor: "#10b981",
        urgencyLabel: "สถานการณ์ปกติ",
        forecast: {
          nextPeak: "—",
          intensity: "Low",
          waitTrend: "Stable"
        },
        staffing: {
          status: "Optimal",
          recommendation: "Maintain current staffing",
          color: "#10b981"
        }
      };
      const t = i.sla_pct || 0,
        a = i.avg_total_minutes || 0;
      i.max_wait;
      const r = i.p90_wait || 0,
        n = i.dropout_pct || 0,
        s = i.revenue_loss_30d || 0,
        l = i.uncoded_visits_30d || 0;
      i.throughput;
      const o = i.capacity_utilization || 0,
        c = i.waiting_doctor || 0;
      i.morning_count, i.afternoon_count;
      const d = [];
      if (t < 70 || a > 60 || c > 25) {
        const h = t < 50 || a > 90 || c > 40,
          W = i.wait_steps?.screening_to_doctor > 30 ? "จุดรอพบแพทย์" : "จุดคัดกรองประวัติ",
          Q = Math.max(i.wait_steps?.screening_to_doctor || 0, i.wait_steps?.registration_to_screening || 0);
        d.push({
          priority: 1,
          severity: h ? "critical" : "warning",
          title: h ? `ภาวะวิกฤตจุดคอขวด : "${W}" หน่วงการบริการอย่างรุนแรง` : `พบการชะลอตัว ณ จุด "${W}"`,
          rootCause: `ผู้ป่วยใช้เวลารอที่จุดดีเลย์หลักเฉลี่ย ${Q} นาที ส่งผลให้อัตราผ่าน SLA ลดลงเหลือ ${t}% (ต่ำกว่าเป้าหมาย 80%) ผู้ป่วย 10% กลุ่มท้าย (P90) ต้องรอนานถึง ${r} นาที สาเหตุสำคัญที่พบบ่อย ได้แก่ การจัดเจ้าหน้าที่ไม่สอดคล้องกับชั่วโมงเร่งด่วน การรับผู้ป่วย Walk-in เข้ามาแทรกคิวที่นัดหมาย และปริมาณการใช้บริการที่สูงผิดปกติในช่วงเวลาดังกล่าว`,
          cascadeEffect: `เกิดการสะสมของผู้ป่วย (Congestion) ในโถงรอคอย ส่งผลให้เจ้าหน้าที่หน้างานเกิดความกดดัน ประสิทธิภาพในการคัดกรองและการบริการลดลง เพิ่มความเสี่ยงต่อการเกิดข้อผิดพลาด ผู้ป่วยบางส่วนอาจยกเลิกคิวไปก่อน (Dropout ปัจจุบัน ${n}%) และประสบการณ์ของผู้ป่วย (Patient Experience) ถูกกระทบ นำไปสู่การร้องเรียนและความไม่พึงพอใจ`,
          fixFirst: h ? "มาตรการเร่งด่วน ต้องดำเนินการภายในวันนี้ : (1) เปิดช่องบริการด่วน (Fast-Track Lane) สำหรับเคสไม่ซับซ้อน เช่น การรับยาต่อเนื่อง การตรวจตามนัดแบบสถานะคงที่ (2) เรียกแพทย์สำรองเสริมจุดตรวจในช่วงเวลาเร่งด่วน (3) แจ้งสถานะคิวแบบเรียลไทม์ให้ผู้ป่วยทราบ ผ่านหน้าจอแสดงคิวหรือระบบ SMS เพื่อลดความวิตกกังวลและการเข้าใจผิด" : "ข้อเสนอแนะ : (1) กระจายปริมาณผู้ป่วยจากจุดคอขวดไปยังคลินิกข้างเคียงที่มีขีดความสามารถเหลือ (2) เพิ่มเจ้าหน้าที่ช่วยคัดกรองในช่วง Peak Hour 30 นาทีข้างหน้า (3) ทบทวนการจัดตารางเวรให้สอดคล้องกับปริมาณผู้ป่วยในแต่ละช่วงเวลา",
          color: h ? "#f43f5e" : "#f59e0b"
        })
      }
      if (s > 3e4 || l > 0) {
        const h = s > 1e5;
        d.push({
          priority: 2,
          severity: h ? "critical" : "warning",
          title: `การรั่วไหลเชิงรายได้ : พบเคสที่ยังไม่ลงรหัสวินิจฉัย ${l} รายการ`,
          rootCause: `พบหัตถการและการตรวจรักษาบางส่วนไม่ได้ถูกลงรหัสวินิจฉัย (ICD-10) ให้ครบถ้วน ส่งผลให้สูญเสียโอกาสในการเบิกจ่ายจากกองทุนสุขภาพ ประเมินความเสียหายสะสมประมาณ ฿${(s/1e3).toFixed(1)}K จากสถิติ 30 วันล่าสุด สาเหตุที่พบบ่อย ได้แก่ การลืมลงรหัส การลงรหัสไม่ตรงกับหัตถการที่ทำจริง และการปิดเคสโดยไม่มีการตรวจสอบ`,
          cascadeEffect: "กระแสเงินสด (Cash Flow) ของโรงพยาบาลติดขัดจากการเบิกจ่ายล่าช้า อัตราการปฏิเสธการเบิกจ่าย (Claim Rejection) จากสำนักงานหลักประกันสุขภาพแห่งชาติ (สปสช.) และประกันสังคมเพิ่มสูงขึ้น กระทบตัวชี้วัดทางการเงินรายเดือน และอาจนำไปสู่ความเสี่ยงในการถูกตรวจสอบจากหน่วยงานกำกับดูแล",
          fixFirst: "มาตรการป้องกันการรั่วไหลของรายได้ : (1) ปรับตั้งระบบ HOSxP ให้บังคับแพทย์ลงรหัสวินิจฉัยก่อนปิดเคสทุกครั้ง (2) จัดตั้งทีมตรวจสอบ (Coder Audit) ตรวจเคสที่ค้างภายในวันเดียวกัน (3) จัดอบรมแพทย์และเจ้าหน้าที่เกี่ยวกับหลักการลงรหัส ICD-10 ให้ถูกต้องและครบถ้วน",
          color: h ? "#f43f5e" : "#f59e0b"
        })
      }
      const f = new Date().getHours(),
        g = (i.hourly_prediction || []).find(h => h.hour === f + 1)?.count || 0,
        b = i.active_doctors_list?.length || 0,
        k = i.active_nurses_list?.length || 0,
        j = i.still_here_breakdown?.likely_waiting ?? i.still_here ?? 0,
        _ = b * 8 + k * 15,
        C = (_ > 0 ? j / _ : 99) > 2 ? Math.ceil((j - _ * 2) / 8) : 0;
      let D = "Optimal",
        I = `กำลังพลเพียงพอ (${b} แพทย์ + ${k} พยาบาล)`,
        R = "#10b981";
      C > 5 || o > 90 ? (D = "Overstrained", I = `🚨 คิวค้าง ${j} ราย — แนะนำเพิ่มแพทย์อีก ${Math.min(C,10)} ท่าน หรือเปิด Fast-track`, R = "#f43f5e") : (C > 0 || o > 75) && (D = "Tight", I = `⚠️ คิวค้าง ${j} ราย — ควรเฝ้าระวังและงดการพักในช่วง 60 นาทีถัดไป`, R = "#f59e0b");
      const Y = a > (i.yesterday_avg_wait || 60) ? "Increasing" : "Improving";
      i.wait_stddev > 30 && d.push({
        priority: 3,
        severity: "warning",
        title: "ความไม่สม่ำเสมอของการให้บริการ (High Variance)",
        rootCause: `ค่าเบี่ยงเบนมาตรฐานของเวลารอ (σ) สูงถึง ${i.wait_stddev} นาที แสดงว่าผู้ป่วยได้รับประสบการณ์การรอที่แตกต่างกันมาก ผู้ป่วยบางรายรอนานผิดปกติขณะที่ผู้ป่วยบางรายใช้เวลารับบริการเร็วมาก ส่งผลให้การคาดการณ์เวลารอทำได้ยาก สาเหตุที่พบบ่อย ได้แก่ การแทรกคิวฉุกเฉินที่ไม่ได้นัดหมาย ระบบการจัดลำดับความเร่งด่วน (Triage) ไม่แม่นยำ และการจัดสรรเจ้าหน้าที่ไม่สมดุลกับความซับซ้อนของเคส`,
        cascadeEffect: "ผู้ป่วยที่รอนานจะเปรียบเทียบกับผู้ป่วยที่ได้รับบริการเร็วกว่า นำไปสู่ความไม่พึงพอใจและการร้องเรียน ระบบคิวถูกมองว่าไม่มีความน่าเชื่อถือ กระทบต่อภาพลักษณ์ของโรงพยาบาล และอาจทำให้ผู้ป่วยเลือกใช้บริการที่อื่นในครั้งต่อไป",
        fixFirst: "มาตรการแก้ไข : (1) ตรวจสอบการแทรกคิวหรือเคสที่ตกหล่น (Dropped Queue) จากระบบ (2) ปรับจูนระบบคัดแยกประเภท (Triage) ให้สามารถระบุความเร่งด่วนได้แม่นยำ (3) จัดสรรเจ้าหน้าที่ตามความซับซ้อนของแต่ละช่วงเวลา (4) สื่อสารเวลาที่คาดว่าจะได้รับบริการให้ผู้ป่วยทราบอย่างสม่ำเสมอ",
        color: "#f59e0b"
      }), d.length === 0 && d.push({
        priority: 0,
        severity: "good",
        title: "ประสิทธิภาพการให้บริการ OPD อยู่ในเกณฑ์ดีเยี่ยม",
        rootCause: `ดัชนีคุณภาพการบริการ (SQI Score) ${i.sqi||0}/100 · อัตราผ่าน SLA ${t}% · เวลารอเฉลี่ย ${a} นาที · ทุกตัวชี้วัดอยู่ในเกณฑ์ที่กำหนด`,
        cascadeEffect: "ไม่พบผลกระทบเชิงลบ การไหลเวียนของผู้ป่วยมีเสถียรภาพสูง (Flow Stability เกิน 95%) บุคลากรสามารถให้บริการได้อย่างมีประสิทธิภาพและไม่เกิดภาวะเครียด",
        fixFirst: "ข้อเสนอแนะ : รักษามาตรฐานการปฏิบัติงานในปัจจุบัน และติดตามผลการประเมินความพึงพอใจของผู้ป่วย (Patient Feedback) อย่างต่อเนื่อง เพื่อยกระดับคุณภาพการบริการให้ดียิ่งขึ้น",
        color: "#10b981"
      }), d.sort((h, W) => h.priority - W.priority);
      const F = d.filter(h => h.severity === "critical").length,
        N = d.filter(h => h.severity === "warning").length,
        S = Math.min(10, F * 3 + N * 1.5),
        V = S >= 7 ? "#f43f5e" : S >= 4 ? "#f59e0b" : "#10b981",
        X = S >= 7 ? "ต้องดำเนินการทันที" : S >= 4 ? "ควรแก้ไขเร็ว" : "สถานการณ์ปกติ";
      return {
        problems: d,
        critCount: F,
        warnCount: N,
        urgencyScore: S,
        urgencyColor: V,
        urgencyLabel: X,
        forecast: {
          nextPeak: g > 0 ? `${f+1}:00` : "—",
          intensity: g > 40 ? "Critical" : g > 25 ? "High" : "Moderate",
          waitTrend: Y
        },
        staffing: {
          status: D,
          recommendation: I,
          color: R
        }
      }
    }, [i]);
  return z.useCallback(({
    index: t,
    style: a
  }) => {
    const r = M[t];
    if (!r) return null;
    const n = r.total_minutes,
      s = n > 120,
      l = n > 60 && !s,
      o = s ? "#f43f5e" : l ? "#f59e0b" : "#10b981",
      c = ne[r.current_status] || "#94a3b8";
    return e.jsxs("div", {
      style: {
        ...a,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0 1.25rem",
        borderBottom: "1px solid var(--md-divider)",
        background: "transparent",
        transition: "background 0.15s",
        cursor: "default"
      },
      onMouseEnter: d => d.currentTarget.style.background = "rgba(124,58,237,.03)",
      onMouseLeave: d => d.currentTarget.style.background = "transparent",
      children: [e.jsx("div", {
        style: {
          width: "42px",
          fontSize: "var(--fs-xs)",
          fontWeight: 700,
          color: "var(--md-text-tertiary)",
          fontFamily: "JetBrains Mono, monospace"
        },
        children: r.vsttime?.substring(0, 5)
      }), e.jsxs("div", {
        style: {
          flex: 1,
          minWidth: 0
        },
        children: [e.jsx("p", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 700,
            color: "var(--md-text-primary)",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          },
          children: r.name
        }), e.jsxs("p", {
          style: {
            fontSize: "var(--fs-2xs)",
            color: "var(--md-text-tertiary)",
            margin: 0,
            fontWeight: 500
          },
          children: ["HN ", r.hn, " · ", r.clinic_name || "คลินิกทั่วไป"]
        })]
      }), e.jsx("div", {
        style: {
          width: "80px",
          textAlign: "center"
        },
        children: e.jsx("span", {
          style: {
            display: "inline-block",
            padding: "3px 8px",
            borderRadius: "999px",
            fontSize: "var(--fs-2xs)",
            fontWeight: 700,
            background: `${c}18`,
            color: c,
            border: `1px solid ${c}30`,
            whiteSpace: "nowrap"
          },
          children: r.current_status
        })
      }), e.jsx("div", {
        style: {
          width: "64px",
          textAlign: "right"
        },
        children: e.jsx("span", {
          style: {
            fontSize: "var(--fs-sm)",
            fontWeight: 800,
            color: o
          },
          children: n ? `${n} นาที` : "—"
        })
      })]
    })
  }, [M]), m.opdToday ? e.jsx(U, {}) : i ? e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    role: "region",
    "aria-label": "แผนก OPD — วิเคราะห์ผู้ป่วยนอก",
    children: [e.jsx(ee, {
      title: "AI Executive Quick Summary — OPD",
      subtitle: "Wait Time · Throughput · SLA · Capacity",
      badge: "📐 Quick Summary",
      accentColor: "#0284c7",
      headerGradient: "linear-gradient(135deg, rgba(2,132,199,.10), rgba(14,165,233,.05))",
      narrative: te(p)
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "0.75rem 1.25rem",
        border: "1px solid rgba(124,58,237,.2)",
        background: "linear-gradient(90deg, rgba(124,58,237,.08), transparent)"
      },
      children: e.jsxs("div", {
        style: {
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
          children: [e.jsxs("span", {
            className: "relative flex h-2 w-2",
            children: [e.jsx("span", {
              className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"
            }), e.jsx("span", {
              className: "relative inline-flex rounded-full h-2 w-2 bg-purple-500"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              fontWeight: 800,
              color: "#7c3aed",
              textTransform: "uppercase",
              letterSpacing: "0.04em"
            },
            children: "Live Executive Intelligence Feed"
          })]
        }), e.jsx("div", {
          style: {
            display: "flex",
            gap: "12px"
          },
          children: e.jsxs("span", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: [e.jsx("strong", {
              style: {
                color: "var(--md-text-primary)"
              },
              children: "System Status:"
            }), " Online & Auditing"]
          })
        })]
      })
    }), i?.avg_total_minutes > 90 && e.jsx("div", {
      className: "glass-card shadow-lg bg-gradient-to-r from-[#fb6340]/10 to-transparent p-4 border-l-4 border-[#fb6340] rounded-2xl",
      children: e.jsxs("div", {
        className: "flex items-center gap-3",
        children: [e.jsx("span", {
          className: "text-xl",
          children: "⏱️"
        }), e.jsx("span", {
          className: "text-[13px] font-bold text-white uppercase tracking-wider",
          children: "High Congestion Detected"
        }), e.jsxs("span", {
          className: "text-xs text-[#fb6340] font-bold",
          children: ["Avg wait: ", se(i.avg_total_minutes)]
        })]
      })
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        style: {
          gridColumn: "span 2",
          padding: "1.25rem 1.5rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(124,58,237,.12) 0%, rgba(99,102,241,.06) 100%)",
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
        }), m.opdToday ? e.jsxs("div", {
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
          const t = i?.today_total || 0,
            a = i?.male || 0,
            r = i?.female || 0;
          i?.new_patient;
          const n = t > 0 ? Math.round(a / t * 100) : 0;
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
                children: "👥 ผู้รับบริการวันนี้"
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600,
                  background: "rgba(124,58,237,.08)",
                  padding: "2px 8px",
                  borderRadius: "99px"
                },
                children: new Date().toLocaleDateString("th-TH", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })
              })]
            }), e.jsxs("div", {
              style: {
                marginBottom: "8px"
              },
              children: [e.jsx("div", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--md-text-tertiary)",
                  marginBottom: "4px"
                },
                children: "ปริมาณผู้ป่วยและประชากรศาสตร์"
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
                    color: "#7c3aed",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    textShadow: "0 0 40px rgba(124,58,237,.3)"
                  },
                  children: t.toLocaleString()
                }), e.jsx("span", {
                  style: {
                    fontSize: "14px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 700
                  },
                  children: "ราย"
                }), i?.today_vs_yesterday_pct !== 0 && e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "99px",
                    background: i?.today_vs_yesterday_pct > 0 ? "rgba(245,158,11,.12)" : "rgba(16,185,129,.12)",
                    color: i?.today_vs_yesterday_pct > 0 ? "#f59e0b" : "#10b981"
                  },
                  children: [i?.today_vs_yesterday_pct > 0 ? "▲" : "▼", " ", Math.abs(i?.today_vs_yesterday_pct), "% vs เมื่อวาน"]
                })]
              })]
            }), e.jsx("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "10px",
                marginBottom: "12px"
              },
              children: e.jsxs("div", {
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
                      color: "#3b82f6"
                    },
                    children: ["♂ ชาย ", a, " (", n, "%)"]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#ec4899"
                    },
                    children: ["♀ หญิง ", r, " (", 100 - n, "%)"]
                  })]
                }), e.jsxs("div", {
                  style: {
                    height: "6px",
                    borderRadius: "99px",
                    overflow: "hidden",
                    background: "rgba(236,72,153,.12)",
                    display: "flex"
                  },
                  children: [e.jsx("div", {
                    style: {
                      width: `${n}%`,
                      background: "linear-gradient(90deg,#3b82f6,#60a5fa)",
                      borderRadius: "99px 0 0 99px",
                      transition: "width 0.8s ease"
                    }
                  }), e.jsx("div", {
                    style: {
                      flex: 1,
                      background: "linear-gradient(90deg,#f472b6,#ec4899)",
                      borderRadius: "0 99px 99px 0"
                    }
                  })]
                })]
              })
            }), e.jsx("div", {
              style: {
                marginTop: "auto",
                paddingTop: "8px",
                borderTop: "1px solid rgba(0,0,0,0.05)",
                fontSize: "8.5px",
                color: "var(--md-text-tertiary)",
                lineHeight: 1.4,
                fontStyle: "italic"
              },
              children: "วิธีคำนวณ: นับรายการจากทะเบียนผู้ป่วยนอก (ovst) เทียบกับยอดรวมของวันก่อนหน้า"
            }), e.jsxs("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px"
              },
              children: [e.jsxs("div", {
                style: {
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: "0",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "var(--md-text-tertiary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  },
                  children: "👥 กลุ่มเปราะบาง"
                }), e.jsx("p", {
                  style: {
                    margin: "0 0 8px",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "สัดส่วนประชากรผู้รับบริการ"
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    marginBottom: "8px"
                  },
                  children: [e.jsxs("div", {
                    children: [e.jsxs("span", {
                      style: {
                        fontSize: "14px",
                        fontWeight: 900,
                        color: "#f59e0b",
                        display: "block",
                        lineHeight: 1
                      },
                      children: [i?.elderly_pct || 0, "%"]
                    }), e.jsx("span", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)"
                      },
                      children: "สูงวัย (60+)"
                    })]
                  }), e.jsx("div", {
                    style: {
                      width: "1px",
                      height: "18px",
                      background: "rgba(255,255,255,0.1)"
                    }
                  }), e.jsxs("div", {
                    children: [e.jsxs("span", {
                      style: {
                        fontSize: "14px",
                        fontWeight: 900,
                        color: "#0ea5e9",
                        display: "block",
                        lineHeight: 1
                      },
                      children: [i?.child_pct || 0, "%"]
                    }), e.jsxs("span", {
                      style: {
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--md-text-tertiary)"
                      },
                      children: ["เด็ก (", "<", "15)"]
                    })]
                  })]
                }), e.jsx("div", {
                  style: {
                    marginTop: "auto",
                    paddingTop: "6px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "8.5px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 500,
                    fontStyle: "italic",
                    lineHeight: 1.3
                  },
                  children: "วิธีคำนวณ: (จำนวนผู้ป่วยตามกลุ่มอายุ ÷ ผู้ป่วยทั้งหมดวันนี้) × 100"
                })]
              }), e.jsxs("div", {
                style: {
                  padding: "10px 14px",
                  background: "rgba(124,58,237,0.06)",
                  borderRadius: "12px",
                  border: "1px solid rgba(124,58,237,0.12)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                },
                children: [e.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "4px"
                  },
                  children: [e.jsxs("div", {
                    children: [e.jsx("p", {
                      style: {
                        margin: "0",
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "#8b5cf6",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      },
                      children: "⚡ P90 Wait Time"
                    }), e.jsx("p", {
                      style: {
                        margin: "0",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "var(--md-text-tertiary)"
                      },
                      children: "จุดวิกฤตความล่าช้า (Critical Delay)"
                    })]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "#7c3aed",
                      lineHeight: 1
                    },
                    children: [i?.p90_wait || "—", " ", e.jsx("small", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 700
                      },
                      children: "น."
                    })]
                  })]
                }), e.jsx("div", {
                  style: {
                    marginTop: "auto",
                    paddingTop: "6px",
                    borderTop: "1px solid rgba(124,58,237,0.1)",
                    fontSize: "10px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 500,
                    fontStyle: "italic"
                  },
                  children: "วิธีคำนวณ: Percentile 90 (ผู้ป่วย 90% ของวันนี้ รอไม่เกินเวลานี้)"
                })]
              })]
            })]
          })
        })()]
      }), [{
        title: "กลับบ้านแล้ว",
        value: i?.completed,
        icon: "✅",
        unit: "ราย",
        grad: ["#10b981", "#059669"],
        glow: "rgba(16,185,129,.2)"
      }, {
        title: "ยังรอรับบริการ",
        value: i?.still_here_breakdown?.likely_waiting ?? i?.still_here,
        icon: "⌛",
        unit: "ราย",
        grad: ["#f59e0b", "#d97706"],
        glow: "rgba(245,158,11,.2)",
        raw_still_here: i?.still_here
      }, {
        title: "เวลารอเฉลี่ย",
        value: i?.avg_total_minutes,
        icon: "⏱️",
        unit: "นาที",
        grad: i?.avg_total_minutes > 90 ? ["#f43f5e", "#dc2626"] : i?.avg_total_minutes > 60 ? ["#f59e0b", "#d97706"] : ["#10b981", "#059669"],
        glow: i?.avg_total_minutes > 90 ? "rgba(244,63,94,.2)" : "rgba(16,185,129,.2)"
      }].map((t, a) => e.jsx("div", {
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: `linear-gradient(135deg, ${t.grad[0]}10 0%, ${t.grad[1]}05 100%)`,
          border: `1px solid ${t.grad[0]}25`,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        },
        onMouseEnter: r => {
          r.currentTarget.style.transform = "translateY(-2px)", r.currentTarget.style.boxShadow = `0 8px 25px ${t.glow}`
        },
        onMouseLeave: r => {
          r.currentTarget.style.transform = "none", r.currentTarget.style.boxShadow = "none"
        },
        children: m.opdToday ? e.jsxs("div", {
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
              marginBottom: "2px"
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
          }), t.title === "กลับบ้านแล้ว" && e.jsx("div", {
            style: {
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--md-text-tertiary)",
              marginBottom: "8px"
            },
            children: "ประสิทธิภาพการบริการ (Throughput)"
          }), t.title === "ยังรอรับบริการ" && (() => {
            const r = i?.still_here_breakdown;
            return e.jsx("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginBottom: "8px"
              },
              children: r ? e.jsxs(e.Fragment, {
                children: [e.jsxs("span", {
                  children: ["น่าจะรออยู่จริง ", e.jsx("b", {
                    style: {
                      color: "#f59e0b"
                    },
                    children: r.likely_waiting
                  })]
                }), r.likely_gone > 0 && e.jsxs("span", {
                  children: [" · น่าจะกลับแล้ว ", e.jsx("b", {
                    style: {
                      color: "#94a3b8"
                    },
                    children: r.likely_gone
                  })]
                }), r.by_stage && e.jsxs("div", {
                  style: {
                    marginTop: "3px",
                    display: "flex",
                    gap: "6px",
                    flexWrap: "wrap"
                  },
                  children: [r.by_stage.wait_registration > 0 && e.jsxs("span", {
                    children: ["📋 รอคัดกรอง ", r.by_stage.wait_registration]
                  }), r.by_stage.wait_doctor > 0 && e.jsxs("span", {
                    children: ["🩺 รอแพทย์ ", r.by_stage.wait_doctor]
                  }), r.by_stage.wait_pharmacy > 0 && e.jsxs("span", {
                    children: ["💊 รอยา ", r.by_stage.wait_pharmacy]
                  })]
                })]
              }) : "ภาระงานที่คงค้าง (Work-in-Progress)"
            })
          })(), t.title === "เวลารอเฉลี่ย" && (() => {
            const r = i?.wait_steps,
              n = i?.estimated_median_cycle,
              s = {
                registration_to_screening: "ลงทะเบียน→คัดกรอง",
                screening_to_doctor: "คัดกรอง→แพทย์",
                doctor_to_pharmacy: "แพทย์→รับยา",
                pharmacy_to_finance: "รับยา→ชำระเงิน"
              },
              l = r ? Object.entries(r).reduce((o, [c, d]) => d > (o?.val || 0) ? {
                key: c,
                val: d
              } : o, {
                key: "",
                val: 0
              }) : null;
            return e.jsxs("div", {
              style: {
                fontSize: "10px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginBottom: "8px"
              },
              children: [e.jsx("span", {
                children: "Cycle Time (ลงทะเบียน → กลับบ้าน)"
              }), n > 0 && e.jsxs("span", {
                children: [" · Median ≈ ", n, " น."]
              }), l?.val > 30 && e.jsxs("div", {
                style: {
                  marginTop: "3px",
                  color: "#f43f5e",
                  fontWeight: 700
                },
                children: ["🔴 คอขวด: ", s[l.key] || l.key, " (", l.val, " น.)"]
              })]
            })
          })(), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "4px",
              marginBottom: "8px"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "28px",
                fontWeight: 900,
                color: t.grad[0],
                letterSpacing: "-0.03em",
                lineHeight: 1
              },
              children: (t.value ?? 0).toLocaleString()
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: t.unit
            })]
          }), t.title === "กลับบ้านแล้ว" && e.jsx("div", {
            style: {
              marginTop: "auto",
              paddingTop: "8px",
              borderTop: "1px solid rgba(0,0,0,0.05)",
              fontSize: "8.5px",
              color: "var(--md-text-tertiary)",
              lineHeight: 1.4,
              fontStyle: "italic"
            },
            children: "วิธีคำนวณ: นับผู้ป่วยที่จบกระบวนการ (service7, bill_time หรือลงสถานะแพทย์ให้กลับบ้าน/Admit/ส่งต่อ)"
          }), t.title === "ยังรอรับบริการ" && e.jsxs("div", {
            style: {
              marginTop: "auto",
              paddingTop: "8px",
              borderTop: "1px solid rgba(0,0,0,0.05)",
              fontSize: "8.5px",
              color: "var(--md-text-tertiary)",
              lineHeight: 1.4,
              fontStyle: "italic"
            },
            children: ['วิธีคำนวณ: นับผู้ป่วยที่ยังไม่จบกระบวนการ แยก "น่าจะรออยู่" (มี activity ใน 2 ชม.) vs "น่าจะกลับแล้ว" (ไม่มี activity >2 ชม. + ไม่เคยคัดกรอง)', t.raw_still_here > 0 && t.raw_still_here !== t.value && e.jsxs("span", {
              children: [" · ดิบ: ", t.raw_still_here, " ราย"]
            })]
          }), t.title === "เวลารอเฉลี่ย" && e.jsx("div", {
            style: {
              marginTop: "auto",
              paddingTop: "8px",
              borderTop: "1px solid rgba(0,0,0,0.05)",
              fontSize: "8.5px",
              color: "var(--md-text-tertiary)",
              lineHeight: 1.4,
              fontStyle: "italic"
            },
            children: "วิธีคำนวณ: True Cycle Time = AVG(เวลาชำระเงิน − เวลาลงทะเบียน) ต่อราย (เฉพาะผู้ป่วยที่จบกระบวนการ ไม่นับคิวที่ยกเลิก/ไม่รับบริการ)"
          })]
        })
      }, a))]
    }), i && (() => {
      const t = i.sla_pct || 0,
        a = i.avg_total_minutes || 0,
        r = i.throughput || 0,
        n = i.dpi || T(i),
        s = i.dropout_pct || 0,
        l = new Date().toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short"
        });
      return e.jsx(ie, {
        kpis: [{
          label: "SLA Compliance",
          thLabel: "อัตราผ่าน SLA (≤60 นาที)",
          value: `${t}%`,
          color: t >= 80 ? "#059669" : t >= 60 ? "#f59e0b" : "#e11d48",
          icon: "🎯",
          sub: t >= 80 ? "ผ่านเกณฑ์" : "ต่ำกว่าเกณฑ์",
          desc: "ผู้ป่วยที่รอไม่เกิน 60 นาที",
          meaning: "สัดส่วนผู้ป่วยที่ได้รับบริการครบวงจร (ลงทะเบียน→ตรวจ→รับยา) ภายใน 60 นาที",
          calc: "(Patients with Total Wait ≤60min ÷ Total Patients) × 100",
          dataSource: "service_time (HOSxP XE)",
          period: `📅 ข้อมูลวันนี้ ${l}`,
          target: "≥ 80%",
          benchmark: "สปสช.: ≥80% | HA: ≥70%",
          aiTip: t >= 80 ? "SLA ดีเยี่ยม — รักษาคุณภาพ" : "ต่ำ — ตรวจสอบจุดคอขวดและเพิ่ม Fast-track"
        }, {
          label: "Avg Wait Time",
          thLabel: "เวลารอเฉลี่ยรวม",
          value: `${a} นาที`,
          color: a <= 60 ? "#059669" : a <= 90 ? "#f59e0b" : "#e11d48",
          icon: "⏱️",
          desc: "รวมทุกขั้นตอน (ลงทะเบียน → รับยา)",
          meaning: "เวลาเฉลี่ยตั้งแต่ผู้ป่วยลงทะเบียนจนถึงพิมพ์ใบสั่งยา ยิ่งน้อยยิ่งดี",
          calc: "AVG(rcpt_print.print_time − ovst.vsttime) [minutes]",
          dataSource: "service_time + rcpt_print (HOSxP XE)",
          period: `📅 ข้อมูลวันนี้ ${l}`,
          target: "≤ 60 นาที",
          benchmark: "สปสช.: ≤60m | HA: ≤90m",
          aiTip: a <= 60 ? "ดีเยี่ยม — ผู้ป่วยพึงพอใจ" : "ช้า — วิเคราะห์ขั้นตอนที่ใช้เวลามากที่สุด",
          drillDownId: "opd_wait",
          drillDownEndpoint: "/api/opd/drilldown?type=wait"
        }, {
          label: "Throughput Rate",
          thLabel: "อัตราบริการต่อชั่วโมง",
          value: `${r} ราย/ชม.`,
          color: r >= 25 ? "#059669" : r >= 15 ? "#f59e0b" : "#e11d48",
          icon: "⚡",
          desc: "อัตราบริการต่อชั่วโมง (งาน OPD)",
          meaning: "จำนวนผู้ป่วยที่รับบริการครบวงจรและกลับบ้านต่อชั่วโมงการทำงาน",
          calc: "Completed Visits ÷ Operating Hours [per hour]",
          dataSource: "ovst + service_time (HOSxP XE)",
          period: "📅 ข้อมูลวันนี้",
          target: "≥ 20 ราย/ชม.",
          benchmark: "รพ.ชุมชน: 20-30 | รพ.ศูนย์: 40+",
          aiTip: r >= 20 ? "Throughput ดี — กำลังคนเพียงพอ" : "ต่ำ — เพิ่มจำนวนแพทย์หรือเปิด Fast-track"
        }, {
          label: "DPI Score",
          thLabel: "ดัชนีประสิทธิภาพ OPD",
          value: `${n}/100`,
          color: n >= 80 ? "#059669" : n >= 60 ? "#f59e0b" : "#e11d48",
          icon: "🧠",
          sub: n >= 80 ? "ดีเยี่ยม" : n >= 60 ? "ปานกลาง" : "ต้องปรับปรุง",
          desc: "OPD Department Performance Index",
          meaning: "คะแนนรวมประสิทธิภาพ OPD จาก AI ถ่วงน้ำหนัก SLA, Wait Time, Throughput, Dropout",
          calc: "SLA×30% + WaitScore×25% + Throughput×25% + (100−Dropout%)×20%",
          dataSource: "คำนวณจาก KPI รวม (Composite)",
          period: `📅 ประมวลผล ${l}`,
          target: "≥ 80",
          benchmark: "BCH Internal: ≥80 = ดีเยี่ยม",
          aiTip: n >= 80 ? "ภาพรวมดีเยี่ยม" : "ต้องปรับปรุง — ดู KPI ที่ต่ำสุด"
        }, {
          label: "Dropout Rate",
          thLabel: "อัตรายกเลิกคิว",
          value: `${s}%`,
          color: s <= 3 ? "#059669" : s <= 7 ? "#f59e0b" : "#e11d48",
          icon: "🚶",
          desc: "ผู้ป่วยที่ยกเลิกคิวก่อนรับบริการ (30 วัน)",
          meaning: "สัดส่วนผู้ป่วยที่ยกเลิกคิวก่อนได้รับบริการครบวงจร สะท้อนความพึงพอใจและโอกาสรายได้ที่เสียไป",
          calc: "(Dropout Patients ÷ Total Registered) × 100 [30 days]",
          dataSource: "ovst + bill_transaction (HOSxP XE)",
          period: "📅 30 วันย้อนหลัง",
          target: "≤ 3%",
          benchmark: "สปสช.: ≤5% | HA: ≤3%",
          aiTip: s <= 3 ? "Dropout ต่ำ ผู้ป่วยพึงพอใจ" : "สูง — ลดเวลารอจะลด Dropout"
        }]
      })
    })(), (() => {
      i?.sla_pct;
      const {
        problems: t,
        critCount: a,
        warnCount: r,
        urgencyScore: n,
        urgencyColor: s,
        urgencyLabel: l
      } = y;
      return !i || t.length === 0 ? null : e.jsxs(e.Fragment, {
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
            children: "🔥 AI Deep Root-Cause & Strategy"
          })]
        }), e.jsx("div", {
          className: "glass-card",
          style: {
            padding: "1.5rem",
            border: `1.5px solid ${s}25`
          },
          children: e.jsx("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            },
            children: t.map((o, c) => e.jsxs("div", {
              style: {
                borderRadius: "14px",
                border: `1.5px solid ${o.color}20`,
                background: `${o.color}04`,
                overflow: "hidden"
              },
              children: [e.jsxs("div", {
                style: {
                  padding: "10px 16px",
                  borderBottom: `1px solid ${o.color}15`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: `linear-gradient(90deg, ${o.color}10, transparent)`
                },
                children: [o.priority > 0 && e.jsx("span", {
                  style: {
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: o.color,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  },
                  children: o.priority
                }), e.jsx("span", {
                  style: {
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: o.title
                })]
              }), e.jsxs("div", {
                style: {
                  padding: "12px 16px",
                  display: "grid",
                  gridTemplateColumns: "minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr)",
                  gap: "12px"
                },
                children: [e.jsxs("div", {
                  style: {
                    padding: "12px",
                    borderRadius: "10px",
                    background: "rgba(244,63,94,.03)",
                    borderLeft: "3px solid #f43f5e"
                  },
                  children: [e.jsx("p", {
                    style: {
                      margin: "0 0 6px",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#f43f5e",
                      letterSpacing: "0.02em"
                    },
                    children: "🔍 การวิเคราะห์สาเหตุของปัญหา"
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "12px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.6,
                      fontWeight: 500
                    },
                    children: o.rootCause
                  })]
                }), e.jsxs("div", {
                  style: {
                    padding: "12px",
                    borderRadius: "10px",
                    background: "rgba(245,158,11,.03)",
                    borderLeft: "3px solid #f59e0b"
                  },
                  children: [e.jsx("p", {
                    style: {
                      margin: "0 0 6px",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#f59e0b",
                      letterSpacing: "0.02em"
                    },
                    children: "⚡ ผลกระทบต่อเนื่อง"
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "12px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.6,
                      fontWeight: 500
                    },
                    children: o.cascadeEffect
                  })]
                }), e.jsxs("div", {
                  style: {
                    padding: "12px",
                    borderRadius: "10px",
                    background: "rgba(124,58,237,.04)",
                    borderLeft: "3px solid #7c3aed"
                  },
                  children: [e.jsx("p", {
                    style: {
                      margin: "0 0 6px",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#7c3aed",
                      letterSpacing: "0.02em"
                    },
                    children: "🚀 ข้อเสนอแนะและมาตรการ"
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "12px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.6,
                      fontWeight: 500
                    },
                    children: o.fixFirst
                  })]
                })]
              })]
            }, c))
          })
        })]
      })
    })(), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px",
        marginTop: "1.5rem"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #5e72e4, #11cdef)",
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
          background: "rgba(94,114,228,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "HOSxP Activity Logs"
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
        marginBottom: "1.5rem"
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
            background: "rgba(94,114,228,.05)",
            borderBottom: "1px solid rgba(94,114,228,.1)",
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
              children: "👨‍⚕️"
            }), e.jsxs("div", {
              children: [e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#5e72e4",
                  display: "block"
                },
                children: "ทีมแพทย์ (OPD)"
              }), e.jsx("span", {
                style: {
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "คัดกรอง: นพ./พญ."
              })]
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#5e72e4",
              opacity: .8
            },
            children: i?.active_doctors_list?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "300px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: m.opdToday ? Array(3).fill(0).map((t, a) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, a)) : i?.active_doctors_list?.length > 0 ? i.active_doctors_list.map((t, a) => {
            const r = new Date().getHours(),
              n = r < 12 && t.morning_count > 0 || r >= 12 && r < 17 && t.afternoon_count > 0 || r >= 17 && t.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                transition: "background 0.2s",
                cursor: "default",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              onMouseEnter: s => s.currentTarget.style.background = "rgba(94,114,228,.04)",
              onMouseLeave: s => s.currentTarget.style.background = "transparent",
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: n ? "linear-gradient(135deg, #5e72e4, #8b5cf6)" : "rgba(0,0,0,0.05)",
                  color: n ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.name?.substring(0, 2).replace("น.", "").replace("พ.", "").trim() || "D", n && e.jsx("span", {
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
                  children: t.name
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
                      color: t.morning_count > 0 ? "#5e72e4" : "#ccc"
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
                      color: t.night_count > 0 ? "#172b4d" : "#ccc"
                    },
                    children: ["🌙", t.night_count || 0]
                  })]
                })]
              }), e.jsx("div", {
                style: {
                  textAlign: "right"
                },
                children: e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#5e72e4"
                  },
                  children: t.total_count
                })
              })]
            }, a)
          }) : e.jsx("div", {
            style: {
              padding: "1rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: e.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "ไม่พบข้อมูล"
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
            background: "rgba(17,205,239,.05)",
            borderBottom: "1px solid rgba(17,205,239,.1)",
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
              children: "👩‍⚕️"
            }), e.jsxs("div", {
              children: [e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#11cdef",
                  display: "block"
                },
                children: "ทีมพยาบาล"
              }), e.jsx("span", {
                style: {
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "พว./พช./นป./พยาบาล"
              })]
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#11cdef",
              opacity: .8
            },
            children: i?.active_nurses_list?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "300px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: m.opdToday ? Array(3).fill(0).map((t, a) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, a)) : i?.active_nurses_list?.length > 0 ? i.active_nurses_list.map((t, a) => {
            const r = new Date().getHours(),
              n = r < 12 && t.morning_count > 0 || r >= 12 && r < 17 && t.afternoon_count > 0 || r >= 17 && t.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                transition: "background 0.2s",
                cursor: "default",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              onMouseEnter: s => s.currentTarget.style.background = "rgba(17,205,239,.04)",
              onMouseLeave: s => s.currentTarget.style.background = "transparent",
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: n ? "linear-gradient(135deg, #11cdef, #1171ef)" : "rgba(0,0,0,0.05)",
                  color: n ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.staff_name?.substring(0, 1) || "N", n && e.jsx("span", {
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
                      color: t.morning_count > 0 ? "#5e72e4" : "#ccc"
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
                      color: t.night_count > 0 ? "#172b4d" : "#ccc"
                    },
                    children: ["🌙", t.night_count || 0]
                  })]
                })]
              }), e.jsx("div", {
                style: {
                  textAlign: "right"
                },
                children: e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#11cdef"
                  },
                  children: t.screen_count
                })
              })]
            }, a)
          }) : e.jsx("div", {
            style: {
              padding: "1rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: e.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "ไม่พบข้อมูล"
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
            background: "rgba(45,206,137,.05)",
            borderBottom: "1px solid rgba(45,206,137,.1)",
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
            }), e.jsxs("div", {
              children: [e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#2dce89",
                  display: "block"
                },
                children: "เจ้าหน้าที่อื่นๆ"
              }), e.jsx("span", {
                style: {
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "คัดกรอง/ห้องบัตร/อื่นๆ"
              })]
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#2dce89",
              opacity: .8
            },
            children: i?.active_staff_list?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "300px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: m.opdToday ? Array(3).fill(0).map((t, a) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, a)) : i?.active_staff_list?.length > 0 ? i.active_staff_list.map((t, a) => {
            const r = new Date().getHours(),
              n = r < 12 && t.morning_count > 0 || r >= 12 && r < 17 && t.afternoon_count > 0 || r >= 17 && t.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                transition: "background 0.2s",
                cursor: "default",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              onMouseEnter: s => s.currentTarget.style.background = "rgba(45,206,137,.04)",
              onMouseLeave: s => s.currentTarget.style.background = "transparent",
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: n ? "linear-gradient(135deg, #2dce89, #2dcecc)" : "rgba(0,0,0,0.05)",
                  color: n ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.staff_name?.substring(0, 1) || "S", n && e.jsx("span", {
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
                      color: t.morning_count > 0 ? "#5e72e4" : "#ccc"
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
                      color: t.night_count > 0 ? "#172b4d" : "#ccc"
                    },
                    children: ["🌙", t.night_count || 0]
                  })]
                })]
              }), e.jsx("div", {
                style: {
                  textAlign: "right"
                },
                children: e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#2dce89"
                  },
                  children: t.screen_count
                })
              })]
            }, a)
          }) : e.jsx("div", {
            style: {
              padding: "1rem",
              textAlign: "center",
              color: "var(--md-text-tertiary)"
            },
            children: e.jsx("p", {
              style: {
                fontSize: "12px"
              },
              children: "ไม่พบข้อมูล"
            })
          })
        })]
      })]
    }), e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #7c3aed, #0ea5e9)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🩺 แดชบอร์ดวิเคราะห์ประสิทธิภาพ OPD — ประเด็นยุทธศาสตร์"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(124,58,237,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "ขับเคลื่อนด้วย AI"
      })]
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem",
        marginBottom: "1.5rem"
      },
      children: e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "12px"
        },
        children: [{
          icon: "📐",
          label: "ความผันผวนของเวลารอ",
          value: `${i?.wait_stddev||0} นาที`,
          sub: `ค่าเบี่ยงเบนมาตรฐาน (σ) ${(i?.wait_stddev||0)>30?"· ผันผวนสูง ผู้ป่วยได้ประสบการณ์ต่างกันมาก":"· เสถียร ประสบการณ์ผู้ป่วยสม่ำเสมอ"}`,
          color: (i?.wait_stddev || 0) > 30 ? "#f43f5e" : "#10b981",
          calc: "STDDEV(total_wait_minutes) [30 วัน]"
        }, {
          icon: "🤖",
          label: "การประเมินกำลังคน (AI)",
          value: y.staffing.status === "Optimal" ? "เพียงพอ" : y.staffing.status === "Tight" ? "ตึงตัว" : y.staffing.status === "Overstrained" ? "ขาดแคลน" : y.staffing.status,
          sub: y.staffing.recommendation,
          color: y.staffing.color,
          calc: "AI Capacity Model · แพทย์×8 + พยาบาล×15/ชม."
        }, {
          icon: "📈",
          label: "พยากรณ์แนวโน้มเวลารอ",
          value: y.forecast.waitTrend === "Increasing" ? "มีแนวโน้มเพิ่มขึ้น ↑" : y.forecast.waitTrend === "Improving" ? "มีแนวโน้มลดลง ↓" : y.forecast.waitTrend,
          sub: `คาดว่าช่วง Peak Hour ถัดไป คือเวลา ${y.forecast.nextPeak} · เตรียมกำลังคนให้พร้อม`,
          color: y.forecast.intensity === "High" ? "#f43f5e" : "#7c3aed",
          calc: "Time-Series Analysis · Hourly prediction"
        }, {
          icon: "🚶",
          label: "อัตราการยกเลิกคิว (Dropout)",
          value: `${i?.dropout_pct||0}%`,
          sub: `ผู้ป่วยที่ยกเลิกคิวก่อนรับบริการครบ (30 วัน) · ${(i?.dropout_pct||0)>5?"สูงกว่าเกณฑ์ 5% · สะท้อนความไม่พึงพอใจและโอกาสรายได้ที่สูญเสีย":"อยู่ในเกณฑ์มาตรฐาน"}`,
          color: (i?.dropout_pct || 0) > 5 ? "#f43f5e" : "#10b981",
          calc: "(Dropouts ÷ Registered) × 100 [30 วัน]"
        }, {
          icon: "✅",
          label: "อัตราการปิดเคสสำเร็จ",
          value: `${i?.completion_rate||0}%`,
          sub: "ผู้ป่วยที่ได้รับบริการครบทั้งกระบวนการ (ตรวจ → รับยา → ชำระเงิน) · เป้าหมาย ≥ 90%",
          color: (i?.completion_rate || 0) < 90 ? "#f59e0b" : "#10b981",
          calc: "(Completed ÷ Registered) × 100 [30 วัน]"
        }, {
          icon: "🔋",
          label: "อัตราการใช้ทรัพยากร",
          value: `${i?.capacity_utilization||0}%`,
          sub: `ความหนาแน่นของผู้ป่วยเทียบขีดความสามารถของแผนก · ${(i?.capacity_utilization||0)>100?"เกินกำลัง ควรขยายบริการหรือเพิ่มบุคลากร":(i?.capacity_utilization||0)>85?"ใกล้เต็มกำลัง ควรเฝ้าระวัง":"ยังสามารถรับผู้ป่วยเพิ่มได้"}`,
          color: (i?.capacity_utilization || 0) > 100 ? "#f43f5e" : (i?.capacity_utilization || 0) > 85 ? "#f59e0b" : "#0ea5e9",
          calc: "(Current Load ÷ Max Capacity) × 100"
        }, {
          icon: "👵",
          label: "สัดส่วนผู้สูงอายุ",
          value: `${i?.elderly_pct||0}%`,
          sub: "ผู้ป่วยอายุ ≥ 60 ปี ที่มารับบริการในวันนี้ · ใช้วางแผนบริการเฉพาะกลุ่ม และเตรียมบุคลากรที่เชี่ยวชาญด้านผู้สูงอายุ",
          color: "#8b5cf6",
          calc: "(Age ≥ 60 ÷ Total Visits) × 100 [วันนี้]"
        }, {
          icon: "⚡",
          label: "เวลาเข้าถึงบริการแรก",
          value: `${i?.wait_steps?.registration_to_screening||0} นาที`,
          sub: `ระยะเวลาเฉลี่ยจากลงทะเบียนถึงคัดกรอง · เป้าหมาย ≤ 15 นาที · ${(i?.wait_steps?.registration_to_screening||0)>15?"ช้ากว่ามาตรฐาน ควรเพิ่มจุดคัดกรอง":"อยู่ในเกณฑ์"}`,
          color: (i?.wait_steps?.registration_to_screening || 0) > 15 ? "#f43f5e" : "#10b981",
          calc: "AVG(screen_time − registration_time)"
        }, {
          icon: "💎",
          label: "รายได้เฉลี่ยต่อการรับบริการ",
          value: `${(i?.avg_revenue_per_visit||0).toLocaleString()} บาท`,
          sub: "ค่ารักษาเฉลี่ยต่อผู้ป่วย 1 ราย (รวมค่ายาและค่าตรวจ) · สะท้อนความซับซ้อนของการรักษาและความครบถ้วนของการบันทึกค่าใช้จ่าย",
          color: "#10b981",
          calc: "Total Revenue ÷ Total Visits"
        }, {
          icon: "📊",
          label: "ดัชนีประสิทธิภาพ OPD (DPI)",
          value: `${i?.dpi||T(i)}/100`,
          sub: `คะแนนรวมของ OPD Department Performance Index · ถ่วงน้ำหนัก SLA · Wait Time · Throughput · Dropout · ${(i?.dpi||T(i))<70?"ต่ำกว่าเกณฑ์ ต้องปรับปรุงเร่งด่วน":"อยู่ในเกณฑ์ดี"}`,
          color: (i?.dpi || T(i)) < 70 ? "#f43f5e" : "#10b981",
          calc: "SLA×30% + WaitScore×25% + Throughput×25% + (100−Dropout%)×20%"
        }].map((t, a) => e.jsxs("div", {
          style: {
            padding: "12px 14px",
            borderRadius: "12px",
            background: `${t.color}06`,
            border: `1px solid ${t.color}15`,
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px"
            },
            children: [e.jsx("div", {
              style: {
                fontSize: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: `${t.color}12`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              },
              children: t.icon
            }), e.jsxs("div", {
              style: {
                flex: 1,
                minWidth: 0
              },
              children: [e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "var(--md-text-primary)",
                  letterSpacing: "0.01em",
                  lineHeight: 1.3,
                  wordBreak: "break-word"
                },
                children: t.label
              }), e.jsx("p", {
                style: {
                  margin: "2px 0 0",
                  fontSize: "18px",
                  fontWeight: 900,
                  color: t.color,
                  letterSpacing: "-0.02em"
                },
                children: t.value
              })]
            })]
          }), e.jsx("div", {
            style: {
              flex: 1
            },
            children: e.jsx("p", {
              style: {
                margin: 0,
                fontSize: "12px",
                color: "var(--md-text-secondary)",
                fontWeight: 500,
                lineHeight: 1.5,
                wordBreak: "break-word"
              },
              children: t.sub
            })
          }), e.jsx("div", {
            style: {
              marginTop: "auto",
              paddingTop: "6px",
              borderTop: "1px solid rgba(0,0,0,0.03)",
              fontSize: "10px",
              color: "var(--md-text-tertiary)",
              fontStyle: "italic",
              fontWeight: 500,
              wordBreak: "break-word"
            },
            children: t.calc
          })]
        }, a))
      })
    }), e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
          flexWrap: "wrap",
          gap: "0.75rem"
        },
        children: [e.jsxs("div", {
          children: [e.jsxs("h3", {
            style: {
              fontSize: "var(--fs-md)",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.01em",
              margin: 0
            },
            children: ["📅 ระยะเวลาบริการรวม (Cycle Time) และ เวลารอเฉลี่ยรายเดือน — ปีงบประมาณ ", u?.fiscal_year_be || ""]
          }), e.jsx("p", {
            style: {
              fontSize: "var(--fs-xs)",
              color: "var(--md-text-tertiary)",
              marginTop: "3px"
            },
            children: "ตุลาคม–กันยายน · แยกตามขั้นตอน"
          })]
        }), e.jsxs("span", {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            color: "#10b981",
            background: "rgba(16,185,129,.08)",
            border: "1px solid rgba(16,185,129,.2)",
            borderRadius: "999px",
            padding: "4px 12px"
          },
          children: [e.jsx("span", {
            style: {
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10b981"
            }
          }), "HOSxP XE Live"]
        })]
      }), u && (() => {
        const t = u.months || [],
          r = t.filter(l => l.has_data).reduce((l, o) => o.avg_total > (l?.avg_total || 0) ? o : l, null),
          n = t.reduce((l, o) => l + o.total_visits, 0),
          s = [{
            label: "ปีงบประมาณ",
            value: `พ.ศ. ${u.fiscal_year_be}`,
            color: "#7c3aed",
            icon: "📆"
          }, {
            label: "ระยะเวลาบริการรวม (เฉลี่ยทั้งปี)",
            value: u.benchmark_avg ? `${u.benchmark_avg} นาที` : "—",
            color: u.benchmark_avg > 90 ? "#f43f5e" : "#10b981",
            icon: "⏱️"
          }, {
            label: "เดือนที่นานสุด",
            value: r ? `${r.month} (${r.avg_total}น.)` : "—",
            color: "#f59e0b",
            icon: "📌"
          }, {
            label: "ผู้ป่วยสะสม (ปีนี้)",
            value: n.toLocaleString() + " ราย",
            color: "#0ea5e9",
            icon: "👥"
          }];
        return e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "0.75rem",
            marginBottom: "1.25rem"
          },
          children: s.map((l, o) => e.jsxs("div", {
            style: {
              background: `${l.color}08`,
              border: `1px solid ${l.color}20`,
              borderRadius: "12px",
              padding: "0.625rem 0.875rem"
            },
            children: [e.jsxs("p", {
              style: {
                fontSize: "var(--fs-2xs)",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              },
              children: [l.icon, " ", l.label]
            }), e.jsx("p", {
              style: {
                fontSize: "var(--fs-lg)",
                fontWeight: 900,
                color: l.color,
                margin: "2px 0 0",
                letterSpacing: "-0.01em"
              },
              children: l.value
            })]
          }, o))
        })
      })(), m.opdMonthlyFiscal ? e.jsx("div", {
        style: {
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: e.jsx("div", {
          className: "skeleton",
          style: {
            width: "100%",
            height: "280px",
            borderRadius: "12px"
          }
        })
      }) : e.jsx($, {
        width: "100%",
        height: 300,
        children: e.jsxs(E, {
          data: u?.months || [],
          margin: {
            top: 8,
            right: 16,
            bottom: 0,
            left: 0
          },
          children: [e.jsxs("defs", {
            children: [e.jsxs("linearGradient", {
              id: "gradReg",
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [e.jsx("stop", {
                offset: "5%",
                stopColor: "#7c3aed",
                stopOpacity: .4
              }), e.jsx("stop", {
                offset: "95%",
                stopColor: "#7c3aed",
                stopOpacity: .05
              })]
            }), e.jsxs("linearGradient", {
              id: "gradScreen",
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [e.jsx("stop", {
                offset: "5%",
                stopColor: "#0ea5e9",
                stopOpacity: .4
              }), e.jsx("stop", {
                offset: "95%",
                stopColor: "#0ea5e9",
                stopOpacity: .05
              })]
            }), e.jsxs("linearGradient", {
              id: "gradDoc",
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [e.jsx("stop", {
                offset: "5%",
                stopColor: "#8b5cf6",
                stopOpacity: .4
              }), e.jsx("stop", {
                offset: "95%",
                stopColor: "#8b5cf6",
                stopOpacity: .05
              })]
            }), e.jsxs("linearGradient", {
              id: "gradRx",
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
              children: [e.jsx("stop", {
                offset: "5%",
                stopColor: "#10b981",
                stopOpacity: .35
              }), e.jsx("stop", {
                offset: "95%",
                stopColor: "#10b981",
                stopOpacity: .05
              })]
            })]
          }), e.jsx(L, {
            strokeDasharray: "3 3",
            stroke: "rgba(203,213,225,.4)",
            vertical: !1
          }), e.jsx(O, {
            dataKey: "month",
            tick: {
              fill: "#6b7280",
              fontSize: 11,
              fontWeight: 700
            },
            axisLine: !1,
            tickLine: !1
          }), e.jsx(H, {
            tick: {
              fill: "#9ca3af",
              fontSize: 10,
              fontWeight: 600
            },
            axisLine: !1,
            tickLine: !1,
            tickFormatter: t => `${t}น`,
            width: 36
          }), e.jsx(A, {
            contentStyle: {
              background: "var(--md-tooltip-bg, #fff)",
              border: "1px solid var(--md-tooltip-border, #e8eaf2)",
              borderRadius: "14px",
              boxShadow: "0 8px 32px rgba(0,0,0,.10)",
              padding: "12px 16px",
              fontSize: "12px"
            },
            labelStyle: {
              fontWeight: 800,
              color: "var(--md-text-primary)",
              marginBottom: "6px",
              display: "block",
              fontSize: "13px"
            },
            formatter: (t, a) => {
              if (t === 0) return ["—", a];
              const r = {
                avg_reg: "📋 ลงทะเบียน → คัดกรอง",
                avg_screen: "🔬 คัดกรอง → พบแพทย์",
                avg_doc: "🩺 ตรวจรักษา → รับยา",
                avg_rx: "💊 รับยา → ชำระเงิน",
                avg_total: "⏱️ ระยะเวลาบริการรวม (Cycle Time)"
              };
              return [`${t} นาที`, r[a] || a]
            },
            labelFormatter: (t, a) => {
              const r = a?.[0]?.payload;
              return r ? `${t}  ·  ${(r.total_visits||0).toLocaleString()} ราย` : t
            }
          }), e.jsx(w, {
            type: "monotone",
            dataKey: "avg_reg",
            stackId: "s",
            stroke: "#7c3aed",
            fill: "url(#gradReg)",
            strokeWidth: 1.5,
            dot: !1,
            name: "avg_reg"
          }), e.jsx(w, {
            type: "monotone",
            dataKey: "avg_screen",
            stackId: "s",
            stroke: "#0ea5e9",
            fill: "url(#gradScreen)",
            strokeWidth: 1.5,
            dot: !1,
            name: "avg_screen"
          }), e.jsx(w, {
            type: "monotone",
            dataKey: "avg_doc",
            stackId: "s",
            stroke: "#8b5cf6",
            fill: "url(#gradDoc)",
            strokeWidth: 1.5,
            dot: !1,
            name: "avg_doc"
          }), e.jsx(w, {
            type: "monotone",
            dataKey: "avg_rx",
            stackId: "s",
            stroke: "#10b981",
            fill: "url(#gradRx)",
            strokeWidth: 1.5,
            dot: !1,
            name: "avg_rx"
          }), e.jsx(K, {
            type: "monotone",
            dataKey: "avg_total",
            stroke: "#1a1f36",
            strokeWidth: 2.5,
            dot: t => {
              const {
                cx: a,
                cy: r,
                payload: n
              } = t;
              if (!n.has_data) return null;
              const s = n.avg_total > 90 ? "#f43f5e" : n.avg_total > 60 ? "#f59e0b" : "#10b981";
              return e.jsx("circle", {
                cx: a,
                cy: r,
                r: 4,
                fill: s,
                stroke: "#fff",
                strokeWidth: 2
              }, `dot-${a}`)
            },
            name: "avg_total",
            legendType: "none"
          })]
        })
      }), e.jsx("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "0.75rem",
          flexWrap: "wrap"
        },
        children: [{
          color: "#7c3aed",
          label: "ลงทะเบียน"
        }, {
          color: "#0ea5e9",
          label: "คัดกรอง"
        }, {
          color: "#8b5cf6",
          label: "ตรวจรักษา"
        }, {
          color: "#10b981",
          label: "รับยา"
        }].map((t, a) => e.jsxs("div", {
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
              background: t.color
            }
          }), e.jsx("span", {
            style: {
              fontSize: "var(--fs-xs)",
              color: "var(--md-text-secondary)",
              fontWeight: 600
            },
            children: t.label
          })]
        }, a))
      })]
    }), e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.25rem"
        },
        children: [e.jsxs("div", {
          children: [e.jsx("h3", {
            style: {
              fontSize: "var(--fs-md)",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              letterSpacing: "-0.01em",
              margin: 0
            },
            children: "⏱️ ขั้นตอนการรับบริการผู้ป่วยนอก"
          }), e.jsx("p", {
            style: {
              fontSize: "var(--fs-xs)",
              color: "var(--md-text-tertiary)",
              marginTop: "2px"
            },
            children: "เวลาเฉลี่ยในแต่ละขั้นตอน วันนี้"
          })]
        }), e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(124,58,237,.08)",
            border: "1px solid rgba(124,58,237,.15)",
            borderRadius: "999px",
            padding: "6px 14px"
          },
          children: [e.jsx("span", {
            style: {
              fontSize: "var(--fs-xs)",
              color: "var(--md-text-secondary)",
              fontWeight: 600
            },
            children: "รวมทั้งหมด"
          }), e.jsx("span", {
            style: {
              fontSize: "var(--fs-xl)",
              fontWeight: 900,
              color: "#7c3aed",
              letterSpacing: "-0.02em"
            },
            children: i?.avg_total_minutes || 0
          }), e.jsx("span", {
            style: {
              fontSize: "var(--fs-xs)",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: "นาที"
          })]
        })]
      }), e.jsx("div", {
        style: {
          display: "flex",
          alignItems: "stretch",
          gap: 0,
          overflowX: "auto"
        },
        children: (() => {
          const t = i?.wait_steps || {},
            a = [{
              key: "reg",
              raw: t.registration_to_screening || 0
            }, {
              key: "screen",
              raw: t.screening_to_doctor || 0
            }, {
              key: "doc",
              raw: t.doctor_to_pharmacy || 0
            }, {
              key: "rx",
              raw: t.pharmacy_to_finance || 0
            }],
            r = a.reduce((o, c) => o + c.raw, 0),
            n = i?.avg_total_minutes || r,
            s = r > 0 ? n / r : 1,
            l = a.map(o => Math.round(o.raw * s));
          return [{
            icon: "📋",
            label: "ลงทะเบียน",
            sublabel: "เช็คอิน → คัดกรอง",
            value: l[0],
            color: "#7c3aed",
            bg: "rgba(124,58,237,.07)",
            border: "rgba(124,58,237,.2)",
            warn: 15,
            critical: 30
          }, {
            icon: "🔬",
            label: "คัดกรอง",
            sublabel: "คัดกรอง → พบแพทย์",
            value: l[1],
            color: "#0ea5e9",
            bg: "rgba(14,165,233,.07)",
            border: "rgba(14,165,233,.2)",
            warn: 30,
            critical: 60
          }, {
            icon: "🩺",
            label: "ตรวจรักษา",
            sublabel: "พบแพทย์ → รับยา",
            value: l[2],
            color: "#8b5cf6",
            bg: "rgba(139,92,246,.07)",
            border: "rgba(139,92,246,.2)",
            warn: 20,
            critical: 45
          }, {
            icon: "💊",
            label: "รับยา",
            sublabel: "รับยา → ชำระเงิน",
            value: l[3],
            color: "#10b981",
            bg: "rgba(16,185,129,.07)",
            border: "rgba(16,185,129,.2)",
            warn: 20,
            critical: 40
          }, {
            icon: "💳",
            label: "ชำระเงิน",
            sublabel: "ชำระเงิน → กลับบ้าน",
            value: t.pharmacy_to_finance || 0,
            color: "#f59e0b",
            bg: "rgba(245,158,11,.07)",
            border: "rgba(245,158,11,.2)",
            warn: 10,
            critical: 20
          }]
        })().map((t, a, r) => {
          const n = t.value || 0,
            s = n >= t.critical,
            l = n >= t.warn && !s,
            o = s ? "#f43f5e" : l ? "#f59e0b" : "#10b981",
            c = s ? "ช้ามาก" : l ? "ช้า" : "ปกติ",
            d = s ? "rgba(244,63,94,.1)" : l ? "rgba(245,158,11,.1)" : "rgba(16,185,129,.1)",
            f = t.critical * 1.5 || 60,
            g = Math.min(100, n / f * 100);
          return e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              flex: "1 1 0",
              minWidth: "140px"
            },
            children: [e.jsxs("div", {
              style: {
                flex: 1,
                background: t.bg,
                border: `1.5px solid ${t.border}`,
                borderRadius: "16px",
                padding: "1rem 0.875rem",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transition: "box-shadow 0.2s",
                cursor: "default"
              },
              children: [e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "1.25rem",
                    lineHeight: 1
                  },
                  children: t.icon
                }), e.jsxs("div", {
                  children: [e.jsx("p", {
                    style: {
                      fontSize: "var(--fs-sm)",
                      fontWeight: 800,
                      color: "var(--md-text-primary)",
                      margin: 0,
                      lineHeight: 1.2
                    },
                    children: t.label
                  }), e.jsx("p", {
                    style: {
                      fontSize: "var(--fs-2xs)",
                      color: "var(--md-text-tertiary)",
                      margin: 0,
                      lineHeight: 1.3,
                      marginTop: "2px"
                    },
                    children: t.sublabel
                  })]
                })]
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "baseline",
                  gap: "4px"
                },
                children: [e.jsx("span", {
                  style: {
                    fontSize: "var(--fs-3xl)",
                    fontWeight: 900,
                    color: t.color,
                    letterSpacing: "-0.03em",
                    lineHeight: 1
                  },
                  children: n
                }), e.jsx("span", {
                  style: {
                    fontSize: "var(--fs-xs)",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 600
                  },
                  children: "นาที"
                })]
              }), e.jsx("div", {
                style: {
                  height: "5px",
                  background: "rgba(0,0,0,.06)",
                  borderRadius: "99px",
                  overflow: "hidden"
                },
                children: e.jsx("div", {
                  style: {
                    height: "100%",
                    width: `${g}%`,
                    background: o,
                    borderRadius: "99px",
                    transition: "width 0.8s ease"
                  }
                })
              }), e.jsxs("div", {
                style: {
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  background: d,
                  borderRadius: "999px",
                  padding: "2px 8px",
                  alignSelf: "flex-start"
                },
                children: [e.jsx("span", {
                  style: {
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: o,
                    flexShrink: 0
                  }
                }), e.jsx("span", {
                  style: {
                    fontSize: "var(--fs-2xs)",
                    fontWeight: 700,
                    color: o
                  },
                  children: c
                })]
              })]
            }), a < r.length - 1 && e.jsx("div", {
              style: {
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0 6px",
                color: "#cbd5e1"
              },
              children: e.jsx("svg", {
                width: "20",
                height: "16",
                viewBox: "0 0 20 16",
                fill: "none",
                children: e.jsx("path", {
                  d: "M0 8 H16 M11 3 L16 8 L11 13",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })
              })
            })]
          }, a)
        })
      })]
    }), e.jsx("div", {
      children: e.jsxs("div", {
        className: "chart-container",
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem"
          },
          children: [e.jsxs("h3", {
            style: {
              fontSize: "var(--fs-md)",
              fontWeight: 700,
              color: "var(--md-text-primary)",
              margin: 0
            },
            children: ["📊 จำนวนผู้ป่วยรายชั่วโมง ", e.jsxs("span", {
              style: {
                fontSize: "var(--fs-xs)",
                color: "var(--md-text-tertiary)",
                fontWeight: 600
              },
              children: ["(", i?.is_holiday ? "วันหยุดและนักขัตฤกษ์" : "วันทำการปกติ", " เวลา ", i?.op_hours || (i?.is_holiday ? "07:00 - 12:00" : "07:00 - 20:30"), " น.)"]
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              gap: "12px",
              fontSize: "12px",
              fontWeight: 600
            },
            children: [e.jsxs("span", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [e.jsx("span", {
                style: {
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  background: "#7c3aed"
                }
              }), "วันนี้"]
            }), e.jsxs("span", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [e.jsx("span", {
                style: {
                  width: "10px",
                  height: "2px",
                  borderBottom: "2px dashed #94a3b8"
                }
              }), "เมื่อวาน"]
            }), e.jsxs("span", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "4px"
              },
              children: [e.jsx("span", {
                style: {
                  width: "10px",
                  height: "2px",
                  borderBottom: "2px dotted #10b981"
                }
              }), "🤖 AI พรุ่งนี้"]
            })]
          })]
        }), e.jsx($, {
          width: "100%",
          height: 280,
          children: e.jsxs(E, {
            data: G,
            children: [e.jsx("defs", {
              children: e.jsxs("linearGradient", {
                id: "predGrad",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [e.jsx("stop", {
                  offset: "0%",
                  stopColor: "#10b981",
                  stopOpacity: .15
                }), e.jsx("stop", {
                  offset: "100%",
                  stopColor: "#10b981",
                  stopOpacity: .02
                })]
              })
            }), e.jsx(L, {
              vertical: !1,
              strokeDasharray: "3 3",
              stroke: "rgba(203,213,225,.4)"
            }), e.jsx(O, {
              dataKey: "label",
              tick: {
                fill: "#9ca3af",
                fontSize: 10,
                fontWeight: 600
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(H, {
              tick: {
                fill: "#9ca3af",
                fontSize: 10,
                fontWeight: 600
              },
              axisLine: !1,
              tickLine: !1
            }), e.jsx(A, {
              cursor: {
                fill: "rgba(124,58,237,.05)"
              },
              contentStyle: {
                background: "#fff",
                border: "1px solid #e8eaf2",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,.08)",
                fontSize: "12px"
              },
              content: ({
                active: t,
                payload: a,
                label: r
              }) => {
                if (t && a && a.length) {
                  const n = a[0].payload;
                  return e.jsxs("div", {
                    style: {
                      background: "var(--md-tooltip-bg, #fff)",
                      border: "1px solid var(--md-tooltip-border, #e8eaf2)",
                      borderRadius: "12px",
                      padding: "12px",
                      boxShadow: "0 8px 24px rgba(0,0,0,.08)"
                    },
                    children: [e.jsxs("p", {
                      style: {
                        margin: "0 0 8px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)",
                        fontSize: "13px",
                        borderBottom: "1px solid var(--md-border)",
                        paddingBottom: "6px"
                      },
                      children: ["เวลา ", r]
                    }), e.jsxs("div", {
                      style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        fontSize: "12px"
                      },
                      children: [e.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "16px"
                        },
                        children: [e.jsx("span", {
                          style: {
                            color: "#7c3aed",
                            fontWeight: 700
                          },
                          children: "● เสร็จสิ้น:"
                        }), e.jsxs("span", {
                          style: {
                            fontWeight: 800
                          },
                          children: [n.completed, " ราย"]
                        })]
                      }), e.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "16px"
                        },
                        children: [e.jsx("span", {
                          style: {
                            color: "#f59e0b",
                            fontWeight: 700
                          },
                          children: "● ยังรอ:"
                        }), e.jsxs("span", {
                          style: {
                            fontWeight: 800
                          },
                          children: [n.waiting, " ราย"]
                        })]
                      }), e.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "16px",
                          borderTop: "1px dashed #e2e8f0",
                          paddingTop: "4px"
                        },
                        children: [e.jsx("span", {
                          style: {
                            color: "var(--md-text-primary)",
                            fontWeight: 800
                          },
                          children: "รวมวันนี้:"
                        }), e.jsxs("span", {
                          style: {
                            fontWeight: 800
                          },
                          children: [n.count, " ราย"]
                        })]
                      }), e.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "16px"
                        },
                        children: [e.jsx("span", {
                          style: {
                            color: "#94a3b8",
                            fontWeight: 700
                          },
                          children: "เมื่อวาน:"
                        }), e.jsxs("span", {
                          style: {
                            fontWeight: 800
                          },
                          children: [n.yesterday, " ราย"]
                        })]
                      }), e.jsxs("div", {
                        style: {
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "16px"
                        },
                        children: [e.jsx("span", {
                          style: {
                            color: "#10b981",
                            fontWeight: 700
                          },
                          children: "AI คาดคะเน:"
                        }), e.jsxs("span", {
                          style: {
                            fontWeight: 800
                          },
                          children: [n.prediction, " ราย"]
                        })]
                      })]
                    })]
                  })
                }
                return null
              }
            }), e.jsx(w, {
              type: "monotone",
              dataKey: "prediction",
              fill: "url(#predGrad)",
              stroke: "#10b981",
              strokeWidth: 2,
              strokeDasharray: "4 4",
              dot: !1,
              name: "prediction"
            }), e.jsx(K, {
              type: "monotone",
              dataKey: "yesterday",
              stroke: "#94a3b8",
              strokeWidth: 1.5,
              strokeDasharray: "6 3",
              dot: !1,
              name: "yesterday"
            }), e.jsx(P, {
              dataKey: "completed",
              stackId: "a",
              fill: "#7c3aed",
              barSize: 20,
              radius: [0, 0, 0, 0],
              name: "completed"
            }), e.jsx(P, {
              dataKey: "waiting",
              stackId: "a",
              fill: "#f59e0b",
              barSize: 20,
              radius: [6, 6, 0, 0],
              name: "waiting"
            })]
          })
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
        children: "💰 รายได้โดยประมาณ — ปีงบประมาณ (3 ปีย้อนหลัง)"
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
      children: m.opdRevenueFiscal ? e.jsxs("div", {
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
        const a = p.opdRevenueFiscal?.fiscal_years || [];
        if (a.length === 0) return e.jsx("p", {
          style: {
            fontSize: "var(--fs-sm)",
            color: "var(--md-text-tertiary)",
            textAlign: "center",
            padding: "2rem 0"
          },
          children: "ไม่พบข้อมูลรายได้"
        });
        const r = ["#94a3b8", "#8b5cf6", "#10b981"],
          s = ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((c, d) => {
            const f = {
              month: c
            };
            return a.forEach((g, b) => {
              f[`fy${b}`] = g.months[d]?.revenue || 0
            }), f
          }),
          l = a[a.length - 1],
          o = a.length >= 2 ? a[a.length - 2] : null;
        return l.comparable_months, o && (o.comparable_revenue ?? o.total_revenue) > 0 && Math.round(((l.comparable_revenue ?? l.total_revenue) - (o.comparable_revenue ?? o.total_revenue)) / (o.comparable_revenue ?? o.total_revenue) * 1e3) / 10, e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          },
          children: [e.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: `repeat(${a.length}, 1fr)`,
              gap: "10px"
            },
            children: a.map((c, d) => {
              const f = d === a.length - 1;
              a.length - 2;
              const g = r[d];
              return e.jsxs("div", {
                style: {
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: f ? `linear-gradient(135deg, ${g}12, ${g}05)` : `${g}06`,
                  border: `1px solid ${g}${f?"30":"15"}`,
                  position: "relative"
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
                      background: g
                    }
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      color: g,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: c.fiscal_label
                  }), f && e.jsx("span", {
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
                    color: g,
                    margin: "0 0 2px",
                    letterSpacing: "-0.02em"
                  },
                  children: [c.total_revenue.toLocaleString(), " บาท"]
                }), e.jsxs("p", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    margin: 0,
                    fontWeight: 600
                  },
                  children: [c.total_visits.toLocaleString(), " visits · ", c.total_patients.toLocaleString(), " patients · ฿", c.avg_revenue_per_visit.toLocaleString(), "/visit"]
                }), d > 0 && (() => {
                  const b = a[d - 1];
                  if (!b) return null;
                  const k = c.comparable_revenue ?? c.total_revenue,
                    j = b.comparable_revenue ?? b.total_revenue,
                    _ = j > 0 ? Math.round((k - j) / j * 1e3) / 10 : 0,
                    B = c.comparable_months || 12;
                  return e.jsxs("div", {
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
                        color: _ >= 0 ? "#10b981" : "#f43f5e"
                      },
                      children: [_ >= 0 ? "📈" : "📉", " YoY ", _ >= 0 ? "+" : "", _, "%"]
                    }), e.jsxs("span", {
                      style: {
                        fontSize: "12px",
                        color: "var(--md-text-tertiary)",
                        fontWeight: 500
                      },
                      children: ["vs ", b.fiscal_label, " ", f ? `(เทียบ ${B} ด.)` : ""]
                    })]
                  })
                })()]
              }, d)
            })
          }), e.jsx($, {
            width: "100%",
            height: 280,
            children: e.jsxs(ae, {
              data: s,
              margin: {
                top: 8,
                right: 12,
                bottom: 0,
                left: 4
              },
              children: [e.jsx(L, {
                strokeDasharray: "3 3",
                stroke: "rgba(203,213,225,.3)",
                vertical: !1
              }), e.jsx(O, {
                dataKey: "month",
                tick: {
                  fill: "#6b7280",
                  fontSize: 10,
                  fontWeight: 700
                },
                axisLine: !1,
                tickLine: !1
              }), e.jsx(H, {
                tick: {
                  fill: "#9ca3af",
                  fontSize: 9
                },
                axisLine: !1,
                tickLine: !1,
                width: 40,
                tickFormatter: c => c >= 1e6 ? `${(c/1e6).toFixed(0)}M` : `${(c/1e3).toFixed(0)}K`
              }), e.jsx(A, {
                contentStyle: {
                  background: "#fff",
                  border: "1px solid #e8eaf2",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,.08)"
                },
                formatter: (c, d) => {
                  const f = Number(d.replace("fy", "")),
                    g = a[f]?.fiscal_label || d;
                  return [`${Number(c).toLocaleString()} บาท`, g]
                }
              }), a.map((c, d) => e.jsx(P, {
                dataKey: `fy${d}`,
                fill: r[d],
                radius: [3, 3, 0, 0],
                barSize: a.length <= 2 ? 20 : 14,
                opacity: d === a.length - 1 ? 1 : .5,
                name: `fy${d}`
              }, d))]
            })
          }), e.jsx("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "center"
            },
            children: a.map((c, d) => e.jsxs("div", {
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
                  background: r[d],
                  opacity: d === a.length - 1 ? 1 : .5
                }
              }), e.jsx("span", {
                style: {
                  fontSize: "var(--fs-xs)",
                  color: "var(--md-text-secondary)",
                  fontWeight: 600
                },
                children: c.fiscal_label
              }), e.jsxs("span", {
                style: {
                  fontSize: "var(--fs-2xs)",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 500
                },
                children: [c.total_revenue.toLocaleString(), " บาท"]
              })]
            }, d))
          })]
        })
      })()
    }), e.jsx(re, {
      data: p.opdAI,
      theme: "default",
      title: "AI OPD Intelligence"
    })]
  }) : e.jsx(Z, {
    icon: "🏥",
    title: "ไม่พบข้อมูล OPD",
    description: "ไม่สามารถโหลดข้อมูลผู้ป่วยนอกได้ในขณะนี้ กรุณาตรวจสอบการเชื่อมต่อ HOSxP XE"
  })
}
const pe = v.memo(oe);
export {
  pe as
  default
};