import Ae, {
  useState as P,
  useEffect as ge,
  useMemo as He,
  useCallback as be
} from "./react-shim-eraudit.js";
import "./react-shim-eraudit.js";
import {
  jsx as Ze,
  jsxs as et
} from "./react-jsx-shim-eraudit.js";
import {
  Fragment as te,
  jsx as e,
  jsxs as r
} from "./react-jsx-shim-eraudit.js";
var i = t => t == null || isNaN(t) ? "\u2014" : Number(t).toLocaleString("th-TH"),
  xe = (t, l = 1) => t == null || isNaN(t) ? "\u2014" : `${Number(t).toFixed(l)}%`,
  k = t => t == null || isNaN(t) ? "\u2014" : Number(t).toLocaleString("th-TH");
async function Oe(t, l) {
  let u = await fetch(t, l);
  if (!u.ok) throw new Error(`HTTP ${u.status}`);
  return u.json()
}
var d = {
    cyan: "#0ea5e9",
    purple: "#7c3aed",
    green: "#10b981",
    amber: "#f59e0b",
    red: "#f43f5e",
    pink: "#ec4899",
    orange: "#fb923c",
    blue: "#3b82f6",
    gray: "#94a3b8",
    emerald: "#059669"
  },
  Ne = `
@keyframes ov-pulse-warn {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245,158,11,.4); }
  50%      { box-shadow: 0 0 0 6px rgba(245,158,11,0); }
}
@keyframes ov-pulse-crit {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244,63,94,.5); }
  50%      { box-shadow: 0 0 0 8px rgba(244,63,94,0); }
}
@keyframes ov-siren-flash {
  0%, 100% {
    transform: scale(1) rotate(-8deg);
    filter: drop-shadow(0 0 4px rgba(244,63,94,.9)) drop-shadow(0 0 12px rgba(244,63,94,.6));
    opacity: 1;
  }
  25%      {
    transform: scale(1.18) rotate(8deg);
    filter: drop-shadow(0 0 8px rgba(244,63,94,1)) drop-shadow(0 0 20px rgba(244,63,94,.9));
    opacity: 1;
  }
  50%      {
    transform: scale(.95) rotate(-8deg);
    filter: drop-shadow(0 0 2px rgba(244,63,94,.5));
    opacity: .65;
  }
  75%      {
    transform: scale(1.18) rotate(8deg);
    filter: drop-shadow(0 0 8px rgba(244,63,94,1)) drop-shadow(0 0 20px rgba(244,63,94,.9));
    opacity: 1;
  }
}
@keyframes ov-status-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,.6); transform: scale(1); }
  50%      { box-shadow: 0 0 0 4px rgba(16,185,129,0); transform: scale(1.15); }
}
@keyframes ov-close-blink {
  0%, 100% { opacity: 1;    transform: scale(1); }
  50%      { opacity: 0.45; transform: scale(0.92); }
}
@keyframes ov-watch-blink {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 3px rgba(245,158,11,.7));
    opacity: 1;
  }
  50%      {
    transform: scale(1.12);
    filter: drop-shadow(0 0 6px rgba(245,158,11,.9));
    opacity: .75;
  }
}
.ov-alert-warn { animation: ov-pulse-warn 2s ease-in-out infinite; }
.ov-alert-crit { animation: ov-pulse-crit 1.5s ease-in-out infinite; }
.ov-siren { animation: ov-siren-flash 1s ease-in-out infinite; display: inline-block; }
.ov-watch-icon { animation: ov-watch-blink 1.6s ease-in-out infinite; display: inline-block; }
.ov-clickable:hover { transform: translateY(-2px); transition: transform .15s ease; }
`;

function Fe({
  series: t = [],
  color: l = "#0ea5e9",
  width: u = 70,
  height: v = 22,
  type: f = "line"
}) {
  if (!Array.isArray(t) || t.length === 0) return null;
  let x = Math.max(...t, 1),
    g = Math.min(...t, 0),
    w = x - g || 1,
    b = u / Math.max(1, t.length - 1),
    N = F => v - (F - g) / w * (v - 3) - 1;
  if (f === "bar") {
    let F = Math.max(1, u / t.length - 1);
    return e("svg", {
      width: u,
      height: v,
      style: {
        display: "block",
        overflow: "visible"
      },
      children: t.map((L, Y) => {
        let K = (L - g) / w * (v - 1);
        return e("rect", {
          x: Y * (u / t.length),
          y: v - K,
          width: F,
          height: K,
          fill: l,
          opacity: Y === t.length - 1 ? 1 : .6,
          rx: 1
        }, Y)
      })
    })
  }
  let q = t.map((F, L) => `${L*b},${N(F)}`).join(" "),
    H = t[t.length - 1];
  return r("svg", {
    width: u,
    height: v,
    style: {
      display: "block",
      overflow: "visible"
    },
    children: [e("polyline", {
      points: q,
      fill: "none",
      stroke: l,
      strokeWidth: "1.5",
      strokeLinejoin: "round"
    }), e("polyline", {
      points: `0,${v} ${q} ${u},${v}`,
      fill: l,
      opacity: "0.12"
    }), e("circle", {
      cx: (t.length - 1) * b,
      cy: N(H),
      r: "2",
      fill: l
    })]
  })
}

function Le({
  anomaly: t
}) {
  if (!t) return null;
  let l = t.severity === "critical" ? "#f43f5e" : "#f59e0b",
    u = t.direction === "surge" ? "\u26A1" : "\u{1F4C9}",
    v = t.direction === "surge" ? "\u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34" : "\u0E15\u0E48\u0E33\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34";
  return r("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      fontSize: 9,
      fontWeight: 800,
      padding: "1px 6px",
      borderRadius: 99,
      background: `${l}20`,
      color: l,
      lineHeight: 1.3,
      whiteSpace: "nowrap"
    },
    title: `Today: ${t.today} \xB7 baseline mean ${t.baseline_mean} \xB1 ${t.baseline_stddev} (z=${t.z_score})`,
    children: [u, " ", v, " (z=", t.z_score, ")"]
  })
}

function Ee({
  score: t = 0,
  level: l = "normal"
}) {
  let u = l === "critical" ? "#f43f5e" : l === "warn" ? "#f59e0b" : "#10b981",
    v = Math.min(180, t / 100 * 180),
    f = 140,
    x = 80,
    g = f / 2,
    w = x - 6,
    b = 56,
    N = (v - 180) * Math.PI / 180,
    q = g + Math.cos(N) * b,
    H = w + Math.sin(N) * b,
    F = `M ${g-b} ${w} A ${b} ${b} 0 0 1 ${q} ${H}`,
    L = `M ${g-b} ${w} A ${b} ${b} 0 0 1 ${g+b} ${w}`;
  return r("div", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0
    },
    children: [r("svg", {
      width: f,
      height: x,
      style: {
        display: "block"
      },
      children: [e("path", {
        d: L,
        fill: "none",
        stroke: "rgba(148,163,184,.2)",
        strokeWidth: "10",
        strokeLinecap: "round"
      }), e("path", {
        d: F,
        fill: "none",
        stroke: u,
        strokeWidth: "10",
        strokeLinecap: "round"
      }), e("text", {
        x: g,
        y: w - 14,
        textAnchor: "middle",
        fontSize: "22",
        fontWeight: "900",
        fill: "var(--md-text-primary)",
        fontFamily: "ui-monospace, monospace",
        children: t
      }), e("text", {
        x: g,
        y: w - 2,
        textAnchor: "middle",
        fontSize: "9",
        fontWeight: "700",
        fill: "var(--md-text-tertiary)",
        children: "RISK / 100"
      })]
    }), e("div", {
      style: {
        fontSize: 10,
        fontWeight: 900,
        color: u,
        padding: "2px 10px",
        borderRadius: 99,
        background: `${u}15`,
        border: `1px solid ${u}40`,
        textTransform: "uppercase",
        letterSpacing: ".06em",
        marginTop: -4
      },
      children: l === "critical" ? "\u{1F6A8} CRITICAL" : l === "warn" ? "\u26A0\uFE0F WATCH" : "\u2705 NORMAL"
    })]
  })
}

function Ge({
  deltaPct: t,
  invertGood: l = !1
}) {
  if (t == null || isNaN(t)) return null;
  let u = t >= 0,
    v = l ? !u : u,
    f = Math.abs(t) < 1 ? "#94a3b8" : v ? "#10b981" : "#f43f5e";
  return r("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 2,
      fontSize: 9,
      fontWeight: 800,
      padding: "1px 5px",
      borderRadius: 99,
      background: `${f}18`,
      color: f,
      lineHeight: 1.3,
      whiteSpace: "nowrap"
    },
    title: `\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32 ${t>=0?"+":""}${t}%`,
    children: [Math.abs(t) < 1 ? "\u25C6" : u ? "\u25B2" : "\u25BC", " ", Math.abs(t).toFixed(1), "%"]
  })
}

function p({
  icon: t,
  label: l,
  value: u,
  unit: v,
  sub: f,
  color: x,
  alert: g,
  onClick: w,
  expanded: b,
  detailText: N,
  onGoToTab: q,
  sparkline: H,
  sparkType: F,
  delta: L,
  invertGoodDelta: Y,
  anomaly: K,
  status: O
}) {
  let W = g?.level,
    h = g?.level === "critical" ? d.red : g?.level === "warn" ? d.amber : null,
    V = !!w;
  return r("div", {
    className: [W === "critical" ? "ov-alert-crit" : "", W === "warn" ? "ov-alert-warn" : "", V ? "ov-clickable" : ""].filter(Boolean).join(" "),
    onClick: V ? w : void 0,
    style: {
      padding: "14px 16px",
      borderRadius: 12,
      background: W ? `linear-gradient(135deg, ${h}20 0%, ${x}08 100%)` : `linear-gradient(135deg, ${x}12 0%, transparent 100%)`,
      border: `1px solid ${W?h+"60":x+"30"}`,
      borderLeft: `4px solid ${W?h:x}`,
      minWidth: 0,
      cursor: V ? "pointer" : "default",
      position: "relative"
    },
    title: V ? "\u0E04\u0E25\u0E34\u0E01\u0E14\u0E39\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14" : void 0,
    children: [O && !O.open && e("div", {
      style: {
        position: "absolute",
        top: 8,
        right: 10,
        background: "#f97316",
        border: "2.5px solid #000",
        borderRadius: 6,
        padding: "3px 11px",
        color: "#000",
        fontSize: 14,
        fontWeight: 900,
        letterSpacing: "0.12em",
        fontFamily: "Arial, Helvetica, sans-serif",
        lineHeight: 1.3,
        boxShadow: "0 0 0 1.5px rgba(249,115,22,.45), 0 2px 5px rgba(0,0,0,.4)",
        animation: "ov-close-blink 2.4s ease-in-out infinite",
        zIndex: 5,
        pointerEvents: "none",
        whiteSpace: "nowrap"
      },
      title: "\u0E1B\u0E34\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 (\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 visit \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49)",
      children: "CLOSE"
    }), W && O?.open !== !1 && e("span", {
      className: W === "critical" ? "ov-siren" : "ov-watch-icon",
      style: {
        position: "absolute",
        top: 8,
        right: 10,
        fontSize: W === "critical" ? 28 : 22,
        lineHeight: 1,
        transformOrigin: "center center",
        pointerEvents: "none"
      },
      title: W === "critical" ? "\u{1F6A8} CRITICAL \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E23\u0E48\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23" : "\u26A0\uFE0F WATCH \u2014 \u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07",
      children: W === "critical" ? "\u{1F6A8}" : "\u26A0\uFE0F"
    }), r("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginBottom: 4
      },
      children: [e("span", {
        style: {
          fontSize: 16
        },
        children: t
      }), e("span", {
        style: {
          fontSize: 10,
          fontWeight: 800,
          color: x,
          textTransform: "uppercase",
          letterSpacing: ".05em",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          flex: 1
        },
        children: l
      }), O && O.open && r("span", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 3,
          fontSize: 9,
          fontWeight: 800,
          padding: "2px 6px",
          borderRadius: 99,
          background: "rgba(16,185,129,.12)",
          color: "#10b981",
          border: "1px solid #10b98135",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
          flexShrink: 0
        },
        title: "\u0E40\u0E1B\u0E34\u0E14\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23",
        children: [e("span", {
          style: {
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#10b981",
            boxShadow: "0 0 4px #10b981",
            animation: "ov-status-pulse 1.8s ease-in-out infinite",
            flexShrink: 0
          }
        }), "\u0E40\u0E1B\u0E34\u0E14"]
      })]
    }), r("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 4,
        flexWrap: "wrap"
      },
      children: [e("span", {
        style: {
          fontSize: 24,
          fontWeight: 900,
          color: "var(--md-text-primary)",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1
        },
        children: u
      }), v && e("span", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: "var(--md-text-tertiary)"
        },
        children: v
      }), L != null && e(Ge, {
        deltaPct: L,
        invertGood: Y
      }), K && e(Le, {
        anomaly: K
      })]
    }), H && Array.isArray(H) && H.length > 1 && e("div", {
      style: {
        marginTop: 6,
        opacity: .85
      },
      children: e(Fe, {
        series: H,
        color: x,
        type: F || "line"
      })
    }), f && e("div", {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: "var(--md-text-tertiary)",
        marginTop: 4
      },
      children: f
    }), V && !b && e("div", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        color: W ? h : "var(--md-text-tertiary)",
        marginTop: 6,
        textDecoration: "underline dotted"
      },
      children: "\u{1F50D} \u0E04\u0E25\u0E34\u0E01\u0E14\u0E39\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"
    }), b && g && r("div", {
      style: {
        marginTop: 10,
        paddingTop: 10,
        borderTop: `1.5px dashed ${h}40`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontSize: 11,
        lineHeight: 1.6
      },
      onClick: J => J.stopPropagation(),
      children: [N && r("div", {
        children: [e("div", {
          style: {
            fontSize: 9,
            fontWeight: 800,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: ".05em",
            marginBottom: 3
          },
          children: "\u{1F4CB} \u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14"
        }), e("div", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-primary)",
            whiteSpace: "pre-line"
          },
          children: N
        })]
      }), r("div", {
        children: [e("div", {
          style: {
            fontSize: 9,
            fontWeight: 800,
            color: "var(--md-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: ".05em",
            marginBottom: 3
          },
          children: "\u{1F4CF} \u0E40\u0E01\u0E13\u0E11\u0E4C"
        }), e("div", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-secondary)"
          },
          children: g.threshold
        })]
      }), r("div", {
        style: {
          padding: "8px 10px",
          borderRadius: 8,
          background: `${h}12`,
          borderLeft: `3px solid ${h}`
        },
        children: [e("div", {
          style: {
            fontSize: 9,
            fontWeight: 800,
            color: h,
            textTransform: "uppercase",
            letterSpacing: ".05em",
            marginBottom: 3
          },
          children: "\u{1F4A1} \u0E04\u0E33\u0E41\u0E19\u0E30\u0E19\u0E33"
        }), e("div", {
          style: {
            fontWeight: 600,
            color: "var(--md-text-primary)"
          },
          children: g.recommendation
        })]
      }), r("div", {
        style: {
          display: "flex",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap"
        },
        children: [e("button", {
          onClick: w,
          style: {
            padding: "4px 10px",
            borderRadius: 6,
            border: `1px solid ${h}40`,
            fontSize: 10,
            fontWeight: 700,
            cursor: "pointer",
            background: "transparent",
            color: h
          },
          children: "\u2191 \u0E22\u0E48\u0E2D"
        }), g.drillToTab && q && r("button", {
          onClick: J => {
            J.stopPropagation(), q(g.drillToTab)
          },
          style: {
            padding: "4px 12px",
            borderRadius: 6,
            border: "none",
            fontSize: 10,
            fontWeight: 800,
            cursor: "pointer",
            background: h,
            color: "#fff"
          },
          children: ["\u279C \u0E44\u0E1B\u0E17\u0E35\u0E48\u0E41\u0E17\u0E47\u0E1A ", g.drillToTab]
        })]
      })]
    })]
  })
}

function j({
  icon: t,
  label: l,
  sub: u,
  color: v = d.purple
}) {
  return r("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
      marginTop: 4
    },
    children: [e("div", {
      style: {
        width: 4,
        height: 24,
        borderRadius: 99,
        background: `linear-gradient(180deg, ${v}, ${d.cyan})`
      }
    }), e("span", {
      style: {
        fontSize: 18
      },
      children: t
    }), e("span", {
      style: {
        fontSize: 15,
        fontWeight: 900,
        color: "var(--md-text-primary)"
      },
      children: l
    }), u && r("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: "var(--md-text-tertiary)"
      },
      children: ["\xB7 ", u]
    })]
  })
}

function D(t, l, u = {}) {
  switch (t) {
    case "ipd_active": {
      let v = u.cap || 60,
        f = l / v;
      return f > 1 ? {
        level: "critical",
        message: `IPD \u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E40\u0E01\u0E34\u0E19\u0E02\u0E35\u0E14\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16 ${(f*100).toFixed(0)}% \u0E02\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07\u0E1B\u0E01\u0E15\u0E34 ${v} \u0E40\u0E15\u0E35\u0E22\u0E07`,
        recommendation: "\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 step-down \xB7 early discharge planning \xB7 open extra beds \xB7 alert \u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23",
        threshold: `> ${v} \u0E40\u0E15\u0E35\u0E22\u0E07 = \u0E40\u0E01\u0E34\u0E19 capacity (\u0E2A\u0E21\u0E21\u0E15\u0E34 ${v})`,
        drillToTab: "ipd"
      } : f > .9 ? {
        level: "warn",
        message: `IPD \u0E43\u0E01\u0E25\u0E49\u0E40\u0E15\u0E47\u0E21\u0E17\u0E35\u0E48 ${(f*100).toFixed(0)}% \u0E02\u0E2D\u0E07 ${v} \u0E40\u0E15\u0E35\u0E22\u0E07`,
        recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 discharge planning \xB7 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A pipeline admit ER+OPD",
        threshold: `> 90% \u0E02\u0E2D\u0E07 ${v} \u0E40\u0E15\u0E35\u0E22\u0E07`,
        drillToTab: "ipd"
      } : null
    }
    case "er_in_now":
      return l > 15 ? {
        level: "critical",
        message: `ER \u0E21\u0E35\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E23\u0E27\u0E08 ${l} \u0E23\u0E32\u0E22 \u2014 surge alert`,
        recommendation: "\u0E40\u0E23\u0E35\u0E22\u0E01 backup MD/RN \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 triage protocol \xB7 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 diversion",
        threshold: "> 15 \u0E23\u0E32\u0E22 = critical surge",
        drillToTab: "er"
      } : l > 10 ? {
        level: "warn",
        message: `ER \u0E21\u0E35\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E2D\u0E15\u0E23\u0E27\u0E08 ${l} \u0E23\u0E32\u0E22 \u2014 watch surge`,
        recommendation: "monitor wait time \xB7 pre-call backup \xB7 \u0E40\u0E23\u0E48\u0E07 disposition",
        threshold: "> 10 \u0E23\u0E32\u0E22 = watch",
        drillToTab: "er"
      } : null;
    case "trauma_pct_mtd":
      return l > 25 ? {
        level: "critical",
        message: `\u0E2D\u0E31\u0E15\u0E23\u0E32 Trauma ${l.toFixed(1)}% \u0E2A\u0E39\u0E07\u0E40\u0E01\u0E34\u0E19\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH (15-20%)`,
        recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 RTI hotspot \xB7 \u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E02\u0E19\u0E2A\u0E48\u0E07/\u0E15\u0E23. \xB7 \u0E17\u0E33 Heat Map \u0E2D\u0E38\u0E1A\u0E31\u0E15\u0E34\u0E40\u0E2B\u0E15\u0E38\u0E08\u0E23\u0E32\u0E08\u0E23",
        threshold: "> 25% = critical (\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 15-20%)",
        drillToTab: "eraudit"
      } : l > 20 ? {
        level: "warn",
        message: `\u0E2D\u0E31\u0E15\u0E23\u0E32 Trauma ${l.toFixed(1)}% \u0E2A\u0E39\u0E07\u0E01\u0E27\u0E48\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH (15-20%)`,
        recommendation: "\u0E14\u0E39\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21 3 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E40\u0E0A\u0E47\u0E04\u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22 RTI/\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E16\u0E19\u0E19",
        threshold: "> 20% = watch",
        drillToTab: "eraudit"
      } : null;
    case "adjrw_mtd":
      return l < .5 ? {
        level: "critical",
        message: `AdjRW MTD = ${l.toFixed(2)} \u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 (target \u2265 0.85 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A \u0E23\u0E1E\u0E0A. F2)`,
        recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 DRG coding completeness \xB7 \u0E1D\u0E36\u0E01\u0E2D\u0E1A\u0E23\u0E21 coder \xB7 audit \u0E17\u0E38\u0E01 case",
        threshold: "< 0.5 = critical coding gap",
        drillToTab: "medrec"
      } : l < .8 ? {
        level: "warn",
        message: `AdjRW MTD = ${l.toFixed(2)} \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32 target 0.85`,
        recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 DRG completeness \xB7 \u0E40\u0E23\u0E48\u0E07 coding pending cases",
        threshold: "< 0.8 = watch",
        drillToTab: "medrec"
      } : null;
    case "service_zero":
      return l === 0 && u.expectedMin > 0 ? {
        level: "warn",
        message: `${u.serviceName} \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 = 0 visits \u2014 \u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 (\u0E1B\u0E01\u0E15\u0E34 ~${u.expectedMin}+/\u0E27\u0E31\u0E19)`,
        recommendation: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E23\u0E30\u0E1A\u0E1A\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 \xB7 \u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E40\u0E1E\u0E37\u0E48\u0E2D confirm",
        threshold: "expected > 0",
        drillToTab: u.drillTab
      } : null;
    case "yoy_decline":
      return l < -10 ? {
        level: "critical",
        message: `YoY (fair) \u0E25\u0E14 ${Math.abs(l).toFixed(0)}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 (prorate)`,
        recommendation: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38 \u2014 capacity? OPD reach? coding lag?",
        threshold: "< -10% = critical decline",
        drillToTab: "customer-insight"
      } : l < -5 ? {
        level: "warn",
        message: `YoY (fair) \u0E25\u0E14 ${Math.abs(l).toFixed(0)}% \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19`,
        recommendation: "monitor \u0E15\u0E48\u0E2D 1-2 \u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E14\u0E39 mix shift",
        threshold: "< -5% = watch",
        drillToTab: "customer-insight"
      } : null;
    case "aging_overdue_pct":
      return l > 80 ? {
        level: "critical",
        message: `\u0E2B\u0E19\u0E35\u0E49\u0E04\u0E49\u0E32\u0E07 > 90 \u0E27\u0E31\u0E19 \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ${l.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E23\u0E27\u0E21 \u2014 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 write-off`,
        recommendation: "\u0E40\u0E23\u0E48\u0E07\u0E17\u0E35\u0E21\u0E40\u0E01\u0E47\u0E1A\u0E40\u0E07\u0E34\u0E19 \xB7 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 reimbursement reports \u0E2A\u0E1B\u0E2A\u0E0A./CSMBS",
        threshold: "> 80% = critical",
        drillToTab: "customer-insight"
      } : l > 60 ? {
        level: "warn",
        message: `\u0E2B\u0E19\u0E35\u0E49\u0E04\u0E49\u0E32\u0E07 > 90 \u0E27\u0E31\u0E19 \u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19 ${l.toFixed(1)}% \u0E02\u0E2D\u0E07\u0E23\u0E27\u0E21`,
        recommendation: "\u0E17\u0E33 aging report \u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E40\u0E2D\u0E01\u0E2A\u0E32\u0E23 claim",
        threshold: "> 60% = watch",
        drillToTab: "customer-insight"
      } : null;
    default:
      return null
  }
}
var B = () => new Date().toISOString().slice(0, 10),
  ve = (t, l) => {
    let u = new Date(t + "T00:00:00Z");
    return u.setUTCDate(u.getUTCDate() + l), u.toISOString().slice(0, 10)
  },
  he = () => {
    let t = new Date;
    return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-01`
  },
  je = [{
    id: "today",
    label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
    get: () => ({
      from: B(),
      to: B()
    })
  }, {
    id: "yest",
    label: "\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E19",
    get: () => {
      let t = ve(B(), -1);
      return {
        from: t,
        to: t
      }
    }
  }, {
    id: "mtd",
    label: "MTD (\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49)",
    get: () => ({
      from: he(),
      to: B()
    })
  }, {
    id: "l7",
    label: "7 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
    get: () => ({
      from: ve(B(), -6),
      to: B()
    })
  }, {
    id: "l30",
    label: "30 \u0E27\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14",
    get: () => ({
      from: ve(B(), -29),
      to: B()
    })
  }, {
    id: "custom",
    label: "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E2D\u0E07",
    get: null
  }],
  ye = "bch-overview-alert-history",
  _e = "bch-overview-alert-dismissed";

function $e() {
  try {
    return JSON.parse(localStorage.getItem(ye) || "[]")
  } catch {
    return []
  }
}

function Be(t) {
  try {
    let l = $e(),
      u = new Date().toISOString();
    t.forEach(f => {
      let x = l.find(g => g.key === f.key);
      (!x || Date.now() - new Date(x.ts).getTime() > 30 * 60 * 1e3 || x.level !== f.level) && l.unshift({
        ts: u,
        key: f.key,
        label: f.label,
        level: f.level,
        message: f.message
      })
    });
    let v = l.slice(0, 200).filter(f => Date.now() - new Date(f.ts).getTime() < 30 * 864e5);
    localStorage.setItem(ye, JSON.stringify(v))
  } catch {}
}

function we() {
  try {
    return JSON.parse(localStorage.getItem(_e) || "{}")
  } catch {
    return {}
  }
}

function qe(t, l) {
  try {
    let u = we();
    l ? u[t] = new Date().toISOString() : delete u[t], localStorage.setItem(_e, JSON.stringify(u))
  } catch {}
}

function Ue() {
  let [t, l] = P(null), [u, v] = P(!0), [f, x] = P(null), [g, w] = P(null), [b, N] = P(60), [q, H] = P(60), [F, L] = P(null), [Y, K] = P("mtd"), [O, W] = P(he()), [h, V] = P(B()), [J, Se] = P(!1), [Ye, Te] = P(0), [Ke, ke] = P(0), oe = be(async (a, s) => {
    v(!0), x(null);
    try {
      let o = new URLSearchParams;
      a && o.set("from", a), s && o.set("to", s), o.set("_t", Date.now().toString());
      let _ = await Oe(`/api/overview/executive?${o}`, {
        credentials: "include"
      });
      l(_), L(new Date)
    } catch (o) {
      x(o.message)
    }
    v(!1)
  }, []);
  ge(() => {
    oe(O, h)
  }, [oe, O, h]), ge(() => {
    if (!b) return;
    H(b);
    let a = setInterval(() => {
      H(s => s <= 1 ? (oe(), b) : s - 1)
    }, 1e3);
    return () => clearInterval(a)
  }, [b, oe]);
  let E = be(a => {
    a && window.dispatchEvent(new CustomEvent("bch360:setTab", {
      detail: {
        tab: a
      }
    }))
  }, []);
  ge(() => {
    if (t) try {
      let a = t.today_snapshot,
        s = t.mtd,
        o = t.revenue_3fy || [],
        _ = o[2] || {},
        A = o[1] || {},
        y = Math.max(1, Math.floor((new Date(t.timestamp).getTime() - new Date(t.fiscal_years[2].start)) / 864e5)),
        z = A.total_income * y / 365,
        Q = z > 0 ? Math.round((_.total_income - z) / z * 100) : 0,
        T = s.er.visits > 0 ? s.er.trauma / s.er.visits * 100 : 0,
        de = t.aging_summary.total > 0 ? (t.aging_summary.a91_180 + t.aging_summary.a180p) / t.aging_summary.total * 100 : 0,
        re = t.ipd_capacity?.total_beds || 60,
        ie = {
          ipdActive: D("ipd_active", a.ipd.active_beds, {
            cap: re
          }),
          erInNow: D("er_in_now", a.er.in_er_now),
          traumaMtd: D("trauma_pct_mtd", T),
          adjrwMtd: D("adjrw_mtd", s.ipd.avg_rw),
          yoyFair: D("yoy_decline", Q),
          agingOverdue: D("aging_overdue_pct", de)
        },
        Z = Object.entries(ie).filter(([$, X]) => X?.level).map(([$, X]) => ({
          key: $,
          label: $,
          level: X.level,
          message: X.message
        }));
      Z.length > 0 && Be(Z)
    } catch {}
  }, [t]);
  let le = He(() => {
    if (!t) return [];
    let a = [],
      s = t.today_snapshot,
      o = t.mtd,
      _ = t.revenue_3fy || [],
      A = t.aging_summary,
      y = o?.ncd || {},
      z = _[0] || {},
      Q = _[1] || {},
      T = _[2] || {},
      de = Math.max(1, Math.floor((new Date(t.timestamp).getTime() - new Date(t.fiscal_years[2].start)) / 864e5)),
      re = Q.total_income * de / 365,
      ie = re > 0 ? Math.round((T.total_income - re) / re * 100) : 0;
    if (a.push({
        priority: "HIGH",
        icon: "\u{1F3AF}",
        color: d.purple,
        title: "Executive Overview \u2014 \u0E2A\u0E23\u0E38\u0E1B\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
        body: `\u{1F4C5} \u0E27\u0E31\u0E19\u0E17\u0E35\u0E48 ${t.today} \xB7 \u0E1B\u0E35\u0E07\u0E1A ${t.current_fy}

\u{1FA7A} \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49:
  \u2022 OPD ${i(s.opd.visits)} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${i(s.opd.income)} \u0E1A\u0E32\u0E17
  \u2022 IPD \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 ${i(s.ipd.active_beds)} \u0E40\u0E15\u0E35\u0E22\u0E07 (\u0E23\u0E31\u0E1A\u0E43\u0E2B\u0E21\u0E48 ${i(s.ipd.admits_today)} \xB7 \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 ${i(s.ipd.discharges_today)})
  \u2022 ER ${i(s.er.visits_today)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u{1F6A8} Trauma ${i(s.er.trauma_today)} \xB7 \u{1FA7A} Non-Trauma ${i(Math.max(0,s.er.visits_today-s.er.trauma_today))} \xB7 \u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E23\u0E27\u0E08 ${i(s.er.in_er_now)})

\u{1F4CA} \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E2A\u0E30\u0E2A\u0E21 (${o.from} \u2192 ${o.to}):
  \u2022 OPD ${i(o.opd.visits)} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 ${i(o.opd.income)} \u0E1A\u0E32\u0E17
  \u2022 IPD admit ${i(o.ipd.admissions)} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 AdjRW ${o.ipd.avg_rw.toFixed(2)} \xB7 LOS ${o.ipd.avg_los.toFixed(1)} \u0E27\u0E31\u0E19
  \u2022 ER ${i(o.er.visits)} \u0E04\u0E23\u0E31\u0E49\u0E07 (\u{1F6A8} Trauma ${i(o.er.trauma)} \xB7 \u{1FA7A} Non-Trauma ${i(Math.max(0,o.er.visits-o.er.trauma))})

\u{1F4B0} \u0E1B\u0E35\u0E07\u0E1A ${t.current_fy} \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E2A\u0E30\u0E2A\u0E21: ${k(T.total_income)} \u0E1A\u0E32\u0E17 \xB7 YoY (fair) ${ie>=0?"\u25B2":"\u25BC"} ${Math.abs(ie)}%`
      }), _.length === 3 && a.push({
        priority: "HIGH",
        icon: "\u{1F4B0}",
        color: d.green,
        title: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
        body: `${_.map(m=>`  \u2022 \u0E1B\u0E35\u0E07\u0E1A ${m.be}: ${k(m.total_income)} \u0E1A\u0E32\u0E17 (OPD ${k(m.opd_income)} + IPD ${k(m.ipd_income)})`).join(`
`)}

\u{1F4C8} YoY:
  \u2022 ${Q.be} vs ${z.be}: ${z.total_income>0?(Q.total_income-z.total_income)/z.total_income*100>=0?"\u25B2":"\u25BC":""} ${z.total_income>0?Math.abs(Math.round((Q.total_income-z.total_income)/z.total_income*100)):0}%
  \u2022 ${T.be} (\u0E1B\u0E35\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 partial) vs ${Q.be} prorated: ${ie>=0?"\u25B2":"\u25BC"} ${Math.abs(ie)}%

\u{1F4A1} \u0E2B\u0E32\u0E01\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E04\u0E07\u0E17\u0E35\u0E48 FY-end ${T.be} \u0E2D\u0E32\u0E08\u0E1B\u0E34\u0E14\u0E17\u0E35\u0E48 ~${k(T.total_income/(de/365))} \u0E1A\u0E32\u0E17`
      }), s.ipd.active_beds > 0) {
      let m = t.ipd_capacity?.total_beds || 60,
        C = s.ipd.active_beds / m,
        ee = t.ipd_capacity?.total_beds ? `${m} \u0E40\u0E15\u0E35\u0E22\u0E07 (${t.ipd_capacity.ward_count} \u0E2B\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E08\u0E32\u0E01 ward table)` : `${m} \u0E40\u0E15\u0E35\u0E22\u0E07 (\u0E04\u0E48\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19)`;
      a.push({
        priority: C > .9 ? "HIGH" : "MEDIUM",
        icon: "\u{1F6CF}\uFE0F",
        color: d.amber,
        title: `IPD Bed Status \u2014 ${s.ipd.active_beds} \u0E40\u0E15\u0E35\u0E22\u0E07\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19`,
        body: `\u0E01\u0E33\u0E25\u0E31\u0E07\u0E19\u0E2D\u0E19 ${s.ipd.active_beds} \u0E23\u0E32\u0E22 (~${(C*100).toFixed(0)}% capacity \u0E08\u0E32\u0E01 ${ee})
\u0E23\u0E31\u0E1A\u0E43\u0E2B\u0E21\u0E48\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${s.ipd.admits_today} \u0E23\u0E32\u0E22 \xB7 \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${s.ipd.discharges_today} \u0E23\u0E32\u0E22
Net flow: ${s.ipd.admits_today-s.ipd.discharges_today>=0?"+":""}${s.ipd.admits_today-s.ipd.discharges_today} \u0E40\u0E15\u0E35\u0E22\u0E07

MTD: admit ${i(o.ipd.admissions)} \u0E23\u0E32\u0E22 \xB7 AdjRW ${o.ipd.avg_rw.toFixed(2)} \xB7 LOS ${o.ipd.avg_los.toFixed(1)} \u0E27\u0E31\u0E19${o.ipd.avg_rw<.85?`
\u26A0\uFE0F AdjRW \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32 target 0.85 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 DRG coding completeness`:""}`
      })
    }
    if (s.er.visits_today > 0) {
      let m = s.er.visits_today > 0 ? s.er.trauma_today / s.er.visits_today * 100 : 0;
      a.push({
        priority: s.er.in_er_now > 10 ? "HIGH" : "MEDIUM",
        icon: "\u{1F691}",
        color: d.red,
        title: `ER Status \u2014 ${s.er.visits_today} \u0E04\u0E23\u0E31\u0E49\u0E07\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49`,
        body: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49:
  \u2022 \u{1F6A8} Trauma ${s.er.trauma_today} \u0E23\u0E32\u0E22 (${m.toFixed(0)}%)
  \u2022 \u{1FA7A} Non-Trauma ${Math.max(0,s.er.visits_today-s.er.trauma_today)} \u0E23\u0E32\u0E22
  \u2022 \u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E23\u0E27\u0E08 ${s.er.in_er_now} \u0E23\u0E32\u0E22

MTD (\u0E2A\u0E30\u0E2A\u0E21):
  \u2022 \u0E23\u0E27\u0E21 ${i(o.er.visits)} \u0E04\u0E23\u0E31\u0E49\u0E07
  \u2022 \u{1F6A8} Trauma ${i(o.er.trauma)} (${o.er.visits>0?(o.er.trauma/o.er.visits*100).toFixed(0):0}%)
  \u2022 \u{1FA7A} Non-Trauma ${i(Math.max(0,o.er.visits-o.er.trauma))} (${o.er.visits>0?((o.er.visits-o.er.trauma)/o.er.visits*100).toFixed(0):0}%)${o.er.visits>0&&o.er.trauma/o.er.visits>.25?`

\u{1F534} Trauma \u0E2A\u0E39\u0E07 > 25% \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E1B\u0E31\u0E08\u0E08\u0E31\u0E22 RTI/\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E16\u0E19\u0E19`:""}${s.er.in_er_now>10?`

\u26A0\uFE0F \u0E21\u0E35\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E23\u0E2D\u0E15\u0E23\u0E27\u0E08 > 10 \u0E23\u0E32\u0E22 \u2014 surge alert`:""}`
      })
    }
    let Z = y.ht + y.dm + y.ckd + y.dlp + y.ihd + y.stroke + y.copd;
    if (Z > 0) {
      let m = Object.entries({
        "\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E2A\u0E39\u0E07 (HT)": y.ht,
        "\u0E40\u0E1A\u0E32\u0E2B\u0E27\u0E32\u0E19 (DM)": y.dm,
        "CKD \u0E44\u0E15\u0E27\u0E32\u0E22\u0E40\u0E23\u0E37\u0E49\u0E2D\u0E23\u0E31\u0E07": y.ckd,
        "\u0E44\u0E02\u0E21\u0E31\u0E19\u0E43\u0E19\u0E40\u0E25\u0E37\u0E2D\u0E14\u0E2A\u0E39\u0E07 (DLP)": y.dlp,
        "\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08 (IHD)": y.ihd,
        Stroke: y.stroke,
        COPD: y.copd
      }).sort((C, ee) => ee[1] - C[1]).slice(0, 5);
      a.push({
        priority: "HIGH",
        icon: "\u{1FAC0}",
        color: d.pink,
        title: `NCD Burden \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49 \u2014 ${i(Z)} visits`,
        body: `Top 5 \u0E42\u0E23\u0E04 NCD (\u0E08\u0E32\u0E01 primary diagnosis):
${m.map((C,ee)=>`  ${ee+1}. ${C[0]}: ${i(C[1])} visits (${(C[1]/Z*100).toFixed(1)}%)`).join(`
`)}

\u{1F4A1} NCD \u0E04\u0E23\u0E2D\u0E07 ${(Z/o.opd.visits*100).toFixed(1)}% \u0E02\u0E2D\u0E07 OPD visits \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49
${y.ckd>=100?"\u26A0\uFE0F CKD high \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 HD/CAPD capacity":""}
${y.stroke+y.ihd>=30?"\u26A0\uFE0F CV events \u0E2A\u0E39\u0E07 \u2014 \u0E40\u0E23\u0E48\u0E07 Stroke Fast Track / Cardiac Bundle audit":""}`
      })
    }
    let $ = o.service_lines || {},
      X = $.pharmacy + $.lab + $.xray + $.dental + $.pt + $.thaimed;
    if (X > 0 && a.push({
        priority: "MEDIUM",
        icon: "\u{1F3E5}",
        color: d.blue,
        title: "Service Lines \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49 (visits per dept)",
        body: `  \u{1F48A} \u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23\u0E23\u0E21: ${i($.pharmacy)}
  \u{1F52C} \u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23: ${i($.lab)}
  \u2622\uFE0F \u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32: ${i($.xray)}
  \u{1F9B7} \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21: ${i($.dental)}
  \u{1F3CB}\uFE0F \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14: ${i($.pt)}
  \u{1F33F} \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22: ${i($.thaimed)}

\u0E23\u0E27\u0E21 service-line visits: ${i(X)}
\u{1F4A1} \u0E2D\u0E31\u0E15\u0E23\u0E32\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49 services per OPD visit: ${(X/o.opd.visits).toFixed(2)} (\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 service requests/visit)`
      }), o.unique_patients > 0) {
      let m = (o.opd.visits / o.unique_patients).toFixed(2);
      a.push({
        priority: "LOW",
        icon: "\u{1F465}",
        color: d.cyan,
        title: "Patient Flow \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
        body: `Unique patients: ${i(o.unique_patients)} \u0E04\u0E19
OPD visits: ${i(o.opd.visits)} \u0E04\u0E23\u0E31\u0E49\u0E07
\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ${m} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19${m>4?`
\u26A0\uFE0F Patient revisit rate \u0E2A\u0E39\u0E07 \u2014 \u0E14\u0E39 chronic care monitoring`:""}

\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22/\u0E04\u0E19: ${i(Math.round(o.opd.income/o.unique_patients))} \u0E1A\u0E32\u0E17`
      })
    }
    if (T.total_income > 0) {
      let m = T.opd_income / T.total_income * 100,
        C = T.ipd_income / T.total_income * 100;
      a.push({
        priority: "LOW",
        icon: "\u{1F4CA}",
        color: d.emerald,
        title: "Revenue Mix \xB7 OPD vs IPD",
        body: `\u0E1B\u0E35\u0E07\u0E1A ${T.be}:
  \u2022 OPD ${m.toFixed(1)}% (${k(T.opd_income)})
  \u2022 IPD ${C.toFixed(1)}% (${k(T.ipd_income)})

\u{1F4A1} ${m>70?"\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 OPD-heavy \u2014 focus efficiency + service-mix optimization":C>40?"IPD significant \u2014 DRG/AdjRW optimization \u0E2A\u0E33\u0E04\u0E31\u0E0D":"Balanced mix"}
\u{1F4A1} IPD AdjRW ${o.ipd.avg_rw.toFixed(2)} (target \u2265 0.85 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A \u0E23\u0E1E\u0E0A. F2) ${o.ipd.avg_rw<.85?"\u{1F7E1} \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 DRG coding completeness":"\u2705"}`
      })
    }
    if (t.quality_scorecard) {
      let m = t.quality_scorecard,
        C = Math.max(0, m.opd_total - m.opd_coded),
        ee = Math.max(0, m.ipd_eligible - m.ipd_coded),
        ae = t.ncd_followup || {},
        ze = (ae.ht_patients || 0) + (ae.dm_patients || 0) + (ae.ckd_patients || 0),
        Ce = m.opd_coding_rate >= 90 ? "\u2705 \u0E1C\u0E48\u0E32\u0E19" : m.opd_coding_rate >= 80 ? "\u{1F7E1} \u0E43\u0E01\u0E25\u0E49\u0E40\u0E01\u0E13\u0E11\u0E4C" : "\u{1F534} \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C",
        Pe = m.ipd_coding_rate >= 95 ? "\u2705 \u0E1C\u0E48\u0E32\u0E19" : m.ipd_coding_rate >= 90 ? "\u{1F7E1} \u0E43\u0E01\u0E25\u0E49\u0E40\u0E01\u0E13\u0E11\u0E4C" : "\u{1F534} \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C";
      a.push({
        priority: m.opd_coding_rate < 80 || m.ipd_coding_rate < 90 ? "HIGH" : "MEDIUM",
        icon: "\u{1FA7A}",
        color: d.emerald,
        title: "Quality Scorecard \xB7 \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH",
        body: `\u{1F4CB} OPD Coding Rate (MRA): ${m.opd_coding_rate}% ${Ce}
  \u2022 Coded: ${i(m.opd_coded)} / ${i(m.opd_total)} visits
  \u2022 Gap: ${i(C)} visits \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 Dx \xB7 target \u2265 90%

\u{1F3E5} IPD Coding Rate (3-day grace): ${m.ipd_coding_rate}% ${Pe}
  \u2022 Coded: ${i(m.ipd_coded)} / ${i(m.ipd_eligible)} admits
  \u2022 Gap: ${i(ee)} admits \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 pdx \xB7 target \u2265 95%

\u{1FAC0} NCD Active Followup (unique patients MTD): ${i(ze)} \u0E04\u0E19
  \u2022 HT ${i(ae.ht_patients)} \xB7 DM ${i(ae.dm_patients)} \xB7 CKD ${i(ae.ckd_patients)}

\u{1F4A1} ${m.ipd_coding_rate<90?"\u0E40\u0E23\u0E48\u0E07 DRG coding \u2014 \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E42\u0E14\u0E22\u0E15\u0E23\u0E07\u0E15\u0E48\u0E2D AdjRW + reimbursement":m.opd_coding_rate<80?"OPD coding gap \u0E2A\u0E48\u0E07\u0E1C\u0E25\u0E15\u0E48\u0E2D data quality + audit MoPH":"Quality \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E23\u0E31\u0E01\u0E29\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 + monitoring"}`
      })
    }
    return a.push({
      priority: "LOW",
      icon: "\u{1F5FA}\uFE0F",
      color: d.purple,
      title: "Strategic Priorities \xB7 \u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E04\u0E27\u0E23\u0E42\u0E1F\u0E01\u0E31\u0E2A",
      body: `\u{1F3AF} \u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21:

1) **NCD Prevention** \u2014 HT+DM+CKD \u0E04\u0E23\u0E2D\u0E07 ${o.opd.visits>0?((y.ht+y.dm+y.ckd)/o.opd.visits*100).toFixed(0):0}% \u0E02\u0E2D\u0E07 OPD \u2192 \u0E02\u0E22\u0E32\u0E22\u0E42\u0E1B\u0E23\u0E41\u0E01\u0E23\u0E21 screening + lifestyle modification

2) **Revenue Optimization** \u2014 DRG coding (AdjRW ${o.ipd.avg_rw.toFixed(2)}) + Aging cleanup (>${(A.a91_180+A.a180p)/1e6|0}M \u0E04\u0E49\u0E32\u0E07\u0E40\u0E01\u0E48\u0E32)

3) **Operational Efficiency** \u2014 Bed occupancy + ER throughput + Patient flow

4) **Quality Assurance** \u2014 Stroke Fast Track \xB7 STEMI Bundle \xB7 Sepsis 1hr Bundle audit

5) **Customer Insight** \u2014 Inactive cohort recall + Service line cross-sell`
    }), a
  }, [t]);
  if (u && !t) return e("div", {
    className: "rounded-2xl p-8",
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      textAlign: "center",
      color: "var(--md-text-tertiary)",
      fontWeight: 700
    },
    children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14 Executive Overview..."
  });
  if (f) return r("div", {
    className: "rounded-xl p-3",
    style: {
      background: "rgba(220,38,38,.08)",
      border: "1px solid rgba(220,38,38,.2)",
      color: "#dc2626",
      fontWeight: 700
    },
    children: ["\u274C ", f]
  });
  if (!t) return null;
  let n = t.today_snapshot,
    c = t.mtd,
    G = t.revenue_3fy || [],
    De = G[2] || {},
    We = G[1] || {},
    Me = Math.max(1, Math.floor((new Date(t.timestamp).getTime() - new Date(t.fiscal_years[2].start)) / 864e5)),
    ce = We.total_income * Me / 365,
    Re = ce > 0 ? Math.round((De.total_income - ce) / ce * 100) : 0,
    pe = c.er.visits > 0 ? c.er.trauma / c.er.visits * 100 : 0,
    Ie = t.aging_summary.total > 0 ? (t.aging_summary.a91_180 + t.aging_summary.a180p) / t.aging_summary.total * 100 : 0,
    ne = t.ipd_capacity?.total_beds || 60,
    S = {
      ipdActive: D("ipd_active", n.ipd.active_beds, {
        cap: ne
      }),
      erInNow: D("er_in_now", n.er.in_er_now),
      traumaMtd: D("trauma_pct_mtd", pe),
      adjrwMtd: D("adjrw_mtd", c.ipd.avg_rw),
      yoyFair: D("yoy_decline", Re),
      agingOverdue: D("aging_overdue_pct", Ie),
      svcPharmacyToday: n.service_lines ? D("service_zero", n.service_lines.pharmacy, {
        serviceName: "\u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23\u0E23\u0E21",
        expectedMin: 100,
        drillTab: "pharmacy"
      }) : null,
      svcLabToday: n.service_lines ? D("service_zero", n.service_lines.lab, {
        serviceName: "\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23",
        expectedMin: 50,
        drillTab: "lab"
      }) : null,
      svcXrayToday: n.service_lines ? D("service_zero", n.service_lines.xray, {
        serviceName: "\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32",
        expectedMin: 20,
        drillTab: "xray"
      }) : null
    },
    U = a => () => w(s => s === a ? null : a),
    M = t.compare || {},
    ue = t.sparklines || {},
    R = t.forecast || {},
    me = t.anomalies || {},
    Ve = t.er_predictive,
    I = t.risk,
    se = t.recommendations || [],
    fe = Object.values(S).filter(a => a?.level).length;
  return r("div", {
    className: "space-y-4 animate-fade-in pb-8",
    children: [r("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [e("div", {
        style: {
          width: "4px",
          height: "24px",
          background: "linear-gradient(180deg, #7c3aed, #0284c7)",
          borderRadius: "99px"
        }
      }), e("h2", {
        style: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "\u{1F3AF} Executive Overview"
      }), e("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(124,58,237,.1)",
          color: "#7c3aed"
        },
        children: "\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E17\u0E38\u0E01\u0E41\u0E1C\u0E19\u0E01 \xB7 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23"
      }), r("span", {
        style: {
          fontSize: "11px",
          fontWeight: 600,
          color: "var(--md-text-tertiary)"
        },
        children: ["Update: ", new Date(t.timestamp).toLocaleString("th-TH")]
      }), r("div", {
        style: {
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap"
        },
        children: [b > 0 && r("span", {
          style: {
            fontSize: "11px",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 99,
            background: "rgba(16,185,129,.10)",
            color: "#059669",
            display: "inline-flex",
            alignItems: "center",
            gap: 4
          },
          children: [e("span", {
            style: {
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
              animation: "ov-pulse-warn 1.4s ease-in-out infinite"
            }
          }), "Auto \u0E43\u0E19 ", q, "s"]
        }), r("select", {
          value: b,
          onChange: a => N(Number(a.target.value)),
          style: {
            padding: "5px 8px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            border: "1px solid var(--md-border)",
            background: "var(--md-surface)",
            color: "var(--md-text-primary)",
            cursor: "pointer"
          },
          children: [e("option", {
            value: 0,
            children: "\u23F8\uFE0F Off"
          }), e("option", {
            value: 30,
            children: "\u23F1\uFE0F 30s"
          }), e("option", {
            value: 60,
            children: "\u23F1\uFE0F 60s"
          }), e("option", {
            value: 120,
            children: "\u23F1\uFE0F 2 \u0E19\u0E32\u0E17\u0E35"
          })]
        }), e("button", {
          onClick: () => Se(a => !a),
          style: {
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 800,
            border: "1px solid var(--md-border)",
            cursor: "pointer",
            background: J ? "#f59e0b15" : "var(--md-surface)",
            color: J ? "#f59e0b" : "var(--md-text-primary)"
          },
          children: "\u{1F4DC} \u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34 Alert"
        }), e("button", {
          onClick: () => oe(O, h),
          disabled: u,
          style: {
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #7c3aed, #0284c7)",
            color: "#fff"
          },
          children: "\u{1F504} \u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A"
        })]
      })]
    }), r("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        padding: "8px 12px",
        borderRadius: 10,
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [e("span", {
        style: {
          fontSize: 11,
          fontWeight: 800,
          color: "var(--md-text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: ".05em"
        },
        children: "\u{1F4C5} \u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"
      }), je.map(a => {
        let s = Y === a.id;
        return e("button", {
          onClick: () => {
            if (a.id === "custom") {
              K("custom");
              return
            }
            let {
              from: o,
              to: _
            } = a.get();
            K(a.id), W(o), V(_)
          },
          style: {
            padding: "5px 10px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 800,
            border: s ? "1.5px solid #7c3aed" : "1px solid var(--md-border)",
            cursor: "pointer",
            background: s ? "#7c3aed15" : "transparent",
            color: s ? "#7c3aed" : "var(--md-text-primary)"
          },
          children: a.label
        }, a.id)
      }), Y === "custom" && r("span", {
        style: {
          display: "inline-flex",
          gap: 6,
          alignItems: "center",
          flexWrap: "wrap"
        },
        children: [e("input", {
          type: "date",
          value: O,
          max: h,
          onChange: a => W(a.target.value),
          style: {
            padding: "4px 8px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            border: "1px solid var(--md-border)",
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          }
        }), e("span", {
          style: {
            fontSize: 12,
            color: "var(--md-text-tertiary)"
          },
          children: "\u2192"
        }), e("input", {
          type: "date",
          value: h,
          min: O,
          max: B(),
          onChange: a => V(a.target.value),
          style: {
            padding: "4px 8px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 700,
            border: "1px solid var(--md-border)",
            background: "var(--md-surface)",
            color: "var(--md-text-primary)"
          }
        })]
      }), t.range && r("span", {
        style: {
          marginLeft: "auto",
          fontSize: 10,
          fontWeight: 700,
          color: "var(--md-text-tertiary)"
        },
        children: [t.range.from, " \u2192 ", t.range.to, " (", t.range.days, " \u0E27\u0E31\u0E19) \xB7 \u0E40\u0E17\u0E35\u0E22\u0E1A ", t.range.prior_from, " \u2192 ", t.range.prior_to]
      })]
    }), (I || se.length > 0) && r("div", {
      className: "rounded-2xl",
      style: {
        padding: "14px 18px",
        background: `linear-gradient(135deg, ${I?.level==="critical"?"rgba(244,63,94,.08)":I?.level==="warn"?"rgba(245,158,11,.08)":"rgba(16,185,129,.06)"} 0%, var(--md-surface) 100%)`,
        border: `1.5px solid ${I?.level==="critical"?"#f43f5e40":I?.level==="warn"?"#f59e0b40":"#10b98140"}`,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 16,
        alignItems: "flex-start"
      },
      children: [I && r("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          minWidth: 160
        },
        children: [e(Ee, {
          score: I.score,
          level: I.level
        }), r("div", {
          style: {
            fontSize: 9,
            fontWeight: 700,
            color: "var(--md-text-tertiary)",
            textAlign: "center",
            lineHeight: 1.5
          },
          children: ["Bed ", I.breakdown.bed_occupancy, " \xB7 ER ", I.breakdown.er_surge, e("br", {}), "AdjRW ", I.breakdown.adjrw_gap, " \xB7 Code ", I.breakdown.ipd_coding, e("br", {}), "Anomaly ", I.breakdown.anomaly]
        })]
      }), r("div", {
        children: [r("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8
          },
          children: [e("span", {
            style: {
              fontSize: 16
            },
            children: "\u{1F3AF}"
          }), e("span", {
            style: {
              fontSize: 13,
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: "AI Recommended Actions \xB7 \u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D"
          }), r("span", {
            style: {
              fontSize: 10,
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: ["\xB7 ", se.length, " \u0E02\u0E49\u0E2D \xB7 rule-based"]
          })]
        }), se.length === 0 ? e("div", {
          style: {
            fontSize: 12,
            fontWeight: 600,
            color: "#10b981",
            padding: "8px 0"
          },
          children: "\u2705 \u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E40\u0E23\u0E48\u0E07\u0E14\u0E48\u0E27\u0E19 \u2014 \u0E17\u0E38\u0E01\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E1B\u0E01\u0E15\u0E34"
        }) : e("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: 6
          },
          children: se.map((a, s) => {
            let o = a.priority === 1 ? "#f43f5e" : a.priority === 2 ? "#f59e0b" : "#0ea5e9";
            return r("div", {
              style: {
                padding: "8px 12px",
                borderRadius: 8,
                background: `${o}08`,
                borderLeft: `3px solid ${o}`,
                display: "flex",
                alignItems: "center",
                gap: 10
              },
              children: [r("span", {
                style: {
                  fontSize: 9,
                  fontWeight: 900,
                  color: o,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: `${o}20`,
                  whiteSpace: "nowrap"
                },
                children: ["P", a.priority]
              }), e("span", {
                style: {
                  fontSize: 16
                },
                children: a.icon
              }), r("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [e("div", {
                  style: {
                    fontSize: 12,
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: a.title
                }), e("div", {
                  style: {
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--md-text-secondary)"
                  },
                  children: a.action
                })]
              }), a.tab && r("button", {
                onClick: () => E(a.tab),
                style: {
                  padding: "4px 10px",
                  fontSize: 10,
                  fontWeight: 800,
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  background: o,
                  color: "#fff",
                  whiteSpace: "nowrap"
                },
                children: ["\u279C ", a.tab]
              })]
            }, s)
          })
        })]
      })]
    }), J && (() => {
      let a = $e(),
        s = we();
      return a.length === 0 ? e("div", {
        className: "rounded-xl",
        style: {
          padding: "12px 16px",
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--md-text-tertiary)"
        },
        children: "\u{1F4DC} \u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 alert history \u2014 \u0E23\u0E30\u0E1A\u0E1A\u0E08\u0E30\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 alert \u0E17\u0E35\u0E48\u0E1E\u0E1A\u0E43\u0E2B\u0E49\u0E04\u0E38\u0E13\u0E40\u0E2D\u0E07\u0E15\u0E32\u0E21\u0E40\u0E27\u0E25\u0E32"
      }) : r("div", {
        className: "rounded-xl",
        style: {
          padding: "12px 16px",
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)"
        },
        children: [r("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8
          },
          children: [e("span", {
            style: {
              fontSize: 13,
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: "\u{1F4DC} \u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34 Alert (30 \u0E27\u0E31\u0E19)"
          }), r("span", {
            style: {
              fontSize: 11,
              fontWeight: 700,
              color: "var(--md-text-tertiary)"
            },
            children: ["\xB7 ", a.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"]
          }), e("button", {
            onClick: () => {
              localStorage.removeItem(ye), Te(o => o + 1)
            },
            style: {
              marginLeft: "auto",
              padding: "3px 10px",
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 6,
              border: "1px solid var(--md-border)",
              background: "transparent",
              color: "#dc2626",
              cursor: "pointer"
            },
            children: "\u{1F5D1} \u0E25\u0E49\u0E32\u0E07"
          })]
        }), e("div", {
          style: {
            maxHeight: 280,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 6
          },
          children: a.slice(0, 50).map((o, _) => {
            let A = s[o.key],
              y = o.level === "critical" ? "#f43f5e" : "#f59e0b";
            return r("div", {
              style: {
                padding: "8px 10px",
                borderRadius: 8,
                background: `${y}08`,
                borderLeft: `3px solid ${y}`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                opacity: A ? .5 : 1
              },
              children: [e("span", {
                style: {
                  fontSize: 14
                },
                children: o.level === "critical" ? "\u{1F6A8}" : "\u26A0\uFE0F"
              }), r("div", {
                style: {
                  flex: 1,
                  minWidth: 0
                },
                children: [e("div", {
                  style: {
                    fontSize: 11,
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: o.label
                }), e("div", {
                  style: {
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--md-text-secondary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  },
                  children: o.message
                })]
              }), e("span", {
                style: {
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)",
                  whiteSpace: "nowrap"
                },
                children: new Date(o.ts).toLocaleString("th-TH")
              }), e("button", {
                onClick: () => {
                  qe(o.key, !A), ke(z => z + 1)
                },
                style: {
                  padding: "3px 8px",
                  fontSize: 9,
                  fontWeight: 700,
                  borderRadius: 5,
                  border: `1px solid ${y}40`,
                  background: A ? `${y}15` : "transparent",
                  color: y,
                  cursor: "pointer",
                  whiteSpace: "nowrap"
                },
                children: A ? "\u2713 \u0E1B\u0E34\u0E14\u0E41\u0E25\u0E49\u0E27" : "\xD7 \u0E1B\u0E34\u0E14"
              })]
            }, _)
          })
        })]
      })
    })(), e(j, {
      icon: "\u{1F4C5}",
      label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \u2014 Real-time Pulse",
      sub: fe > 0 ? `${t.today} \xB7 \u26A0\uFE0F ${fe} alerts` : t.today,
      color: d.cyan
    }), e("style", {
      children: Ne
    }), r("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 12
      },
      children: [e(p, {
        icon: "\u{1FA7A}",
        label: "OPD \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
        value: i(n.opd.visits),
        unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
        sub: `${i(n.opd.unique_hn)} \u0E04\u0E19 \xB7 ${i(n.opd.income)} \u0E1A.`,
        color: d.cyan,
        anomaly: me.opd_visits
      }), e(p, {
        icon: "\u{1F6CF}\uFE0F",
        label: "IPD \u0E02\u0E13\u0E30\u0E19\u0E35\u0E49",
        value: i(n.ipd.active_beds),
        unit: "\u0E40\u0E15\u0E35\u0E22\u0E07",
        sub: `${i(n.ipd.active_beds)} \u0E08\u0E32\u0E01 ${i(ne)} \u0E40\u0E15\u0E35\u0E22\u0E07 \xB7 \u0E23\u0E31\u0E1A\u0E43\u0E2B\u0E21\u0E48 ${n.ipd.admits_today} \xB7 \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 ${n.ipd.discharges_today}`,
        color: d.amber,
        alert: S.ipdActive,
        onClick: S.ipdActive ? U("ipdActive") : void 0,
        expanded: g === "ipdActive",
        onGoToTab: E,
        anomaly: me.ipd_admits,
        detailText: `IPD \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19: ${n.ipd.active_beds} \u0E40\u0E15\u0E35\u0E22\u0E07 \xB7 ${(n.ipd.active_beds/ne*100).toFixed(0)}% \u0E02\u0E2D\u0E07 capacity ${ne}
\u0E23\u0E31\u0E1A\u0E43\u0E2B\u0E21\u0E48\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${n.ipd.admits_today} \xB7 \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${n.ipd.discharges_today}
Net flow: ${n.ipd.admits_today-n.ipd.discharges_today>=0?"+":""}${n.ipd.admits_today-n.ipd.discharges_today}
\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 capacity: ${t.ipd_capacity?.total_beds?`\u0E08\u0E32\u0E01 ward table \xB7 ${t.ipd_capacity.ward_count} \u0E2B\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 active`:"\u0E04\u0E48\u0E32\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19 (\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 ward)"}`
      }), e(p, {
        icon: "\u{1F691}",
        label: "ER \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
        value: i(n.er.visits_today),
        unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
        sub: `\u{1F6A8} Trauma ${n.er.trauma_today} \xB7 \u{1FA7A} Non-Trauma ${Math.max(0,n.er.visits_today-n.er.trauma_today)} \xB7 \u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E23\u0E27\u0E08 ${n.er.in_er_now}`,
        color: d.red,
        alert: S.erInNow,
        onClick: S.erInNow ? U("erInNow") : void 0,
        expanded: g === "erInNow",
        onGoToTab: E,
        anomaly: me.er_visits,
        detailText: `ER \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${n.er.visits_today} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 \u0E01\u0E33\u0E25\u0E31\u0E07\u0E15\u0E23\u0E27\u0E08 ${n.er.in_er_now} \xB7 Trauma ${n.er.trauma_today}`
      }), e(p, {
        icon: "\u{1F4CA}",
        label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 OPD \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49",
        value: i(n.opd.income),
        unit: "\u0E1A\u0E32\u0E17",
        sub: n.opd.visits > 0 ? `${i(Math.round(n.opd.income/n.opd.visits))} \u0E1A./visit` : "\u2014",
        color: d.green
      })]
    }), n.service_lines && r(te, {
      children: [e(j, {
        icon: "\u{1F3E2}",
        label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \u2014 Service Lines",
        sub: "\u0E41\u0E15\u0E48\u0E25\u0E30\u0E41\u0E1C\u0E19\u0E01\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \xB7 12 \u0E41\u0E1C\u0E19\u0E01",
        color: d.blue
      }), r("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          gap: 12
        },
        children: [e(p, {
          icon: "\u{1F48A}",
          label: "\u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23\u0E23\u0E21",
          value: i(n.service_lines.pharmacy),
          unit: "visits",
          sub: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E14\u0E49\u0E22\u0E32",
          color: "#7c3aed",
          status: {
            open: n.service_lines.pharmacy > 0
          },
          alert: S.svcPharmacyToday,
          onClick: S.svcPharmacyToday ? U("svcPharmacy") : void 0,
          expanded: g === "svcPharmacy",
          onGoToTab: E,
          detailText: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${n.service_lines.pharmacy} visits (\u0E08\u0E32\u0E01 opitemrece) \xB7 \u0E1B\u0E01\u0E15\u0E34 100+/\u0E27\u0E31\u0E19 \u2014 \u0E2D\u0E32\u0E08\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E2B\u0E15\u0E38\u0E23\u0E30\u0E1A\u0E1A \u0E2B\u0E23\u0E37\u0E2D\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E16\u0E36\u0E07\u0E40\u0E17\u0E35\u0E48\u0E22\u0E07`
        }), e(p, {
          icon: "\u{1F52C}",
          label: "\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23",
          value: i(n.service_lines.lab),
          unit: "visits",
          sub: "Lab orders",
          color: "#0284c7",
          status: {
            open: n.service_lines.lab > 0
          },
          alert: S.svcLabToday,
          onClick: S.svcLabToday ? U("svcLab") : void 0,
          expanded: g === "svcLab",
          onGoToTab: E,
          detailText: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${n.service_lines.lab} visits (\u0E08\u0E32\u0E01 lab_head) \xB7 \u0E1B\u0E01\u0E15\u0E34 50+/\u0E27\u0E31\u0E19`
        }), e(p, {
          icon: "\u2622\uFE0F",
          label: "\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32",
          value: i(n.service_lines.xray),
          unit: "visits",
          sub: "X-ray \xB7 CT",
          color: "#059669",
          status: {
            open: n.service_lines.xray > 0
          },
          alert: S.svcXrayToday,
          onClick: S.svcXrayToday ? U("svcXray") : void 0,
          expanded: g === "svcXray",
          onGoToTab: E,
          detailText: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${n.service_lines.xray} visits (\u0E08\u0E32\u0E01 xray_report) \xB7 \u0E1B\u0E01\u0E15\u0E34 20+/\u0E27\u0E31\u0E19`
        }), e(p, {
          icon: "\u{1F9B7}",
          label: "\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
          value: i(n.service_lines.dental),
          unit: "visits",
          sub: "\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E1F\u0E31\u0E19",
          color: "#f43f5e",
          status: {
            open: n.service_lines.dental > 0
          }
        }), e(p, {
          icon: "\u{1F3CB}\uFE0F",
          label: "\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14",
          value: i(n.service_lines.pt),
          unit: "visits",
          sub: "PT \xB7 Rehab",
          color: "#d97706",
          status: {
            open: n.service_lines.pt > 0
          }
        }), e(p, {
          icon: "\u{1F33F}",
          label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22",
          value: i(n.service_lines.thaimed),
          unit: "visits",
          sub: "TM \xB7 \u0E19\u0E27\u0E14",
          color: "#16a34a",
          status: {
            open: n.service_lines.thaimed > 0
          }
        }), e(p, {
          icon: "\u{1F4BC}",
          label: "PMC \u0E2D\u0E2D\u0E1F\u0E1F\u0E34\u0E28\u0E0B\u0E34\u0E19\u0E42\u0E14\u0E23\u0E21",
          value: i(n.service_lines.dept_140 || 0),
          unit: "visits",
          sub: "\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E02\u0E49\u0E32\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23",
          color: "#0891b2",
          status: {
            open: (n.service_lines.dept_140 || 0) > 0
          }
        }), e(p, {
          icon: "\u{1F9B4}",
          label: "PMC \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
          value: i(n.service_lines.dept_143 || 0),
          unit: "visits",
          sub: "\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E",
          color: "#9333ea",
          status: {
            open: (n.service_lines.dept_143 || 0) > 0
          }
        }), e(p, {
          icon: "\u{1F3C3}",
          label: "PMC \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E GC",
          value: i(n.service_lines.dept_145 || 0),
          unit: "visits",
          sub: "\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E GC",
          color: "#db2777",
          status: {
            open: (n.service_lines.dept_145 || 0) > 0
          }
        }), e(p, {
          icon: "\u{1FA78}",
          label: "\u0E44\u0E15\u0E40\u0E17\u0E35\u0E22\u0E21",
          value: i(n.service_lines.dept_040 || 0),
          unit: "visits",
          sub: "HD \xB7 \u0E0A\u0E31\u0E49\u0E19 2",
          color: "#dc2626",
          status: {
            open: (n.service_lines.dept_040 || 0) > 0
          }
        }), e(p, {
          icon: "\u{1F489}",
          label: "\u0E09\u0E35\u0E14\u0E22\u0E32\u0E17\u0E33\u0E41\u0E1C\u0E25",
          value: i(n.service_lines.dept_053 || 0),
          unit: "visits",
          sub: "\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E35\u0E14\u0E22\u0E32 5",
          color: "#ea580c",
          status: {
            open: (n.service_lines.dept_053 || 0) > 0
          }
        }), e(p, {
          icon: "\u{1F634}",
          label: "Sleep Test",
          value: i(n.service_lines.dept_130 || 0),
          unit: "visits",
          sub: "\u0E15\u0E23\u0E27\u0E08\u0E01\u0E32\u0E23\u0E19\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E1A",
          color: "#6366f1",
          status: {
            open: (n.service_lines.dept_130 || 0) > 0
          }
        })]
      })]
    }), n.ncd && n.ncd.ht + n.ncd.dm + n.ncd.ckd + n.ncd.dlp + n.ncd.ihd + n.ncd.stroke + n.ncd.copd > 0 && r(te, {
      children: [e(j, {
        icon: "\u{1FAC0}",
        label: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 \u2014 NCD Burden",
        sub: "primary diagnosis",
        color: d.pink
      }), r("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: 10
        },
        children: [e(p, {
          icon: "\u{1FA78}",
          label: "\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E2A\u0E39\u0E07 (HT)",
          value: i(n.ncd.ht),
          unit: "visits",
          color: d.red
        }), e(p, {
          icon: "\u{1F36F}",
          label: "\u0E40\u0E1A\u0E32\u0E2B\u0E27\u0E32\u0E19 (DM)",
          value: i(n.ncd.dm),
          unit: "visits",
          color: d.orange
        }), e(p, {
          icon: "\u{1F9E0}",
          label: "Stroke",
          value: i(n.ncd.stroke),
          unit: "visits",
          color: d.purple
        }), e(p, {
          icon: "\u2764\uFE0F",
          label: "\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08 (IHD)",
          value: i(n.ncd.ihd),
          unit: "visits",
          color: d.red
        }), e(p, {
          icon: "\u{1FAD8}",
          label: "CKD \u0E44\u0E15\u0E27\u0E32\u0E22",
          value: i(n.ncd.ckd),
          unit: "visits",
          color: d.amber
        }), e(p, {
          icon: "\u{1FAC1}",
          label: "COPD",
          value: i(n.ncd.copd),
          unit: "visits",
          color: d.cyan
        }), e(p, {
          icon: "\u{1F9C8}",
          label: "\u0E44\u0E02\u0E21\u0E31\u0E19 (DLP)",
          value: i(n.ncd.dlp),
          unit: "visits",
          color: d.green
        })]
      })]
    }), e(j, {
      icon: "\u{1F4C6}",
      label: t.range ? `\u0E0A\u0E48\u0E27\u0E07 ${t.range.from} \u2192 ${t.range.to} (${t.range.days} \u0E27\u0E31\u0E19)` : "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49\u0E2A\u0E30\u0E2A\u0E21 \u2014 MTD",
      sub: `\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E01\u0E48\u0E2D\u0E19 (${t.range?.prior_from||"\u2014"} \u2192 ${t.range?.prior_to||"\u2014"}) \u0E1C\u0E48\u0E32\u0E19 \u25B2/\u25BC`,
      color: d.purple
    }), r("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 12
      },
      children: [e(p, {
        icon: "\u{1FA7A}",
        label: "OPD \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07",
        value: i(c.opd.visits),
        unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
        sub: `${i(c.opd.unique_hn)} \u0E04\u0E19 \xB7 ${i(c.opd.income)} \u0E1A.`,
        color: d.cyan,
        delta: M.opd_visits?.delta_pct,
        sparkline: ue.opd_visits,
        sparkType: "line"
      }), e(p, {
        icon: "\u{1F3E5}",
        label: "IPD admit",
        value: i(c.ipd.admissions),
        unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
        sub: `AdjRW ${c.ipd.avg_rw.toFixed(2)} \xB7 LOS ${c.ipd.avg_los.toFixed(1)}d`,
        color: d.amber,
        alert: S.adjrwMtd,
        onClick: S.adjrwMtd ? U("adjrwMtd") : void 0,
        expanded: g === "adjrwMtd",
        onGoToTab: E,
        delta: M.ipd_admissions?.delta_pct,
        sparkline: ue.ipd_admits,
        sparkType: "bar",
        detailText: `\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07: ${c.ipd.admissions} admits \xB7 AdjRW (NULLIF) = ${c.ipd.avg_rw.toFixed(2)} \xB7 LOS ${c.ipd.avg_los.toFixed(1)} \u0E27\u0E31\u0E19
IPD income: ${i(c.ipd.income)} \u0E1A\u0E32\u0E17
Target AdjRW: \u2265 0.85 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A \u0E23\u0E1E\u0E0A. F2
\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E01\u0E48\u0E2D\u0E19: AdjRW ${M.ipd_adjrw?.prior?.toFixed?.(2)||"\u2014"} (${M.ipd_adjrw?.delta_pct!=null?(M.ipd_adjrw.delta_pct>=0?"+":"")+M.ipd_adjrw.delta_pct+"%":"\u2014"})`
      }), e(p, {
        icon: "\u{1F691}",
        label: "ER \u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07",
        value: i(c.er.visits),
        unit: "\u0E04\u0E23\u0E31\u0E49\u0E07",
        sub: `\u{1F6A8} Trauma ${i(c.er.trauma)} (${pe.toFixed(0)}%) \xB7 \u{1FA7A} Non-Trauma ${i(Math.max(0,c.er.visits-c.er.trauma))}`,
        color: d.red,
        alert: S.traumaMtd,
        onClick: S.traumaMtd ? U("traumaMtd") : void 0,
        expanded: g === "traumaMtd",
        onGoToTab: E,
        delta: M.er_visits?.delta_pct,
        sparkline: ue.er_visits,
        sparkType: "line",
        detailText: `\u0E43\u0E19\u0E0A\u0E48\u0E27\u0E07: ER ${i(c.er.visits)} \u0E04\u0E23\u0E31\u0E49\u0E07 \xB7 Trauma ${i(c.er.trauma)} (${pe.toFixed(1)}%) \xB7 Non-Trauma ${i(Math.max(0,c.er.visits-c.er.trauma))}
\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH: Trauma 15-20%
\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E0A\u0E48\u0E27\u0E07\u0E01\u0E48\u0E2D\u0E19: Trauma ${i(M.er_trauma?.prior)} (${M.er_trauma?.delta_pct!=null?(M.er_trauma.delta_pct>=0?"+":"")+M.er_trauma.delta_pct+"%":"\u2014"})`
      }), e(p, {
        icon: "\u{1F465}",
        label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E21\u0E48\u0E0B\u0E49\u0E33",
        value: i(c.unique_patients),
        unit: "\u0E04\u0E19",
        sub: c.opd.visits > 0 ? `${(c.opd.visits/c.unique_patients).toFixed(1)} \u0E04\u0E23\u0E31\u0E49\u0E07/\u0E04\u0E19` : "\u2014",
        color: d.pink,
        delta: M.unique_patients?.delta_pct
      }), e(p, {
        icon: "\u{1F4B0}",
        label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 IPD",
        value: i(c.ipd.income),
        unit: "\u0E1A\u0E32\u0E17",
        sub: c.ipd.admissions > 0 ? `${i(Math.round(c.ipd.income/c.ipd.admissions))} \u0E1A./admit` : "\u2014",
        color: d.green,
        delta: M.ipd_income?.delta_pct
      })]
    }), e(j, {
      icon: "\u{1F3E2}",
      label: "Service Lines \xB7 visits \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
      sub: "\u0E41\u0E15\u0E48\u0E25\u0E30\u0E41\u0E1C\u0E19\u0E01 \xB7 12 \u0E41\u0E1C\u0E19\u0E01",
      color: d.blue
    }), r("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        gap: 12
      },
      children: [e(p, {
        icon: "\u{1F48A}",
        label: "\u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23\u0E23\u0E21",
        value: i(c.service_lines.pharmacy),
        unit: "visits",
        sub: "\u0E22\u0E32 \xB7 Generic",
        color: "#7c3aed"
      }), e(p, {
        icon: "\u{1F52C}",
        label: "\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23",
        value: i(c.service_lines.lab),
        unit: "visits",
        sub: "Lab orders",
        color: "#0284c7"
      }), e(p, {
        icon: "\u2622\uFE0F",
        label: "\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32",
        value: i(c.service_lines.xray),
        unit: "visits",
        sub: "X-ray \xB7 CT",
        color: "#059669"
      }), e(p, {
        icon: "\u{1F9B7}",
        label: "\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
        value: i(c.service_lines.dental),
        unit: "visits",
        sub: "DPI",
        color: "#f43f5e"
      }), e(p, {
        icon: "\u{1F3CB}\uFE0F",
        label: "\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14",
        value: i(c.service_lines.pt),
        unit: "visits",
        sub: "PT \xB7 Rehab",
        color: "#d97706"
      }), e(p, {
        icon: "\u{1F33F}",
        label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22",
        value: i(c.service_lines.thaimed),
        unit: "visits",
        sub: "TM \xB7 \u0E19\u0E27\u0E14",
        color: "#16a34a"
      }), e(p, {
        icon: "\u{1F4BC}",
        label: "PMC \u0E2D\u0E2D\u0E1F\u0E1F\u0E34\u0E28\u0E0B\u0E34\u0E19\u0E42\u0E14\u0E23\u0E21",
        value: i(c.service_lines.dept_140 || 0),
        unit: "visits",
        sub: "\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E02\u0E49\u0E32\u0E23\u0E32\u0E0A\u0E01\u0E32\u0E23",
        color: "#0891b2"
      }), e(p, {
        icon: "\u{1F9B4}",
        label: "PMC \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07",
        value: i(c.service_lines.dept_143 || 0),
        unit: "visits",
        sub: "\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E",
        color: "#9333ea"
      }), e(p, {
        icon: "\u{1F3C3}",
        label: "PMC \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E GC",
        value: i(c.service_lines.dept_145 || 0),
        unit: "visits",
        sub: "\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E GC",
        color: "#db2777"
      }), e(p, {
        icon: "\u{1FA78}",
        label: "\u0E44\u0E15\u0E40\u0E17\u0E35\u0E22\u0E21",
        value: i(c.service_lines.dept_040 || 0),
        unit: "visits",
        sub: "HD \xB7 \u0E0A\u0E31\u0E49\u0E19 2",
        color: "#dc2626"
      }), e(p, {
        icon: "\u{1F489}",
        label: "\u0E09\u0E35\u0E14\u0E22\u0E32\u0E17\u0E33\u0E41\u0E1C\u0E25",
        value: i(c.service_lines.dept_053 || 0),
        unit: "visits",
        sub: "\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E35\u0E14\u0E22\u0E32 5",
        color: "#ea580c"
      }), e(p, {
        icon: "\u{1F634}",
        label: "Sleep Test",
        value: i(c.service_lines.dept_130 || 0),
        unit: "visits",
        sub: "\u0E15\u0E23\u0E27\u0E08\u0E01\u0E32\u0E23\u0E19\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E1A",
        color: "#6366f1"
      })]
    }), e(j, {
      icon: "\u{1FAC0}",
      label: "NCD Burden \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
      sub: "primary diagnosis",
      color: d.pink
    }), r("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 10
      },
      children: [e(p, {
        icon: "\u{1FA78}",
        label: "\u0E04\u0E27\u0E32\u0E21\u0E14\u0E31\u0E19\u0E2A\u0E39\u0E07 (HT)",
        value: i(c.ncd.ht),
        unit: "visits",
        color: d.red
      }), e(p, {
        icon: "\u{1F36F}",
        label: "\u0E40\u0E1A\u0E32\u0E2B\u0E27\u0E32\u0E19 (DM)",
        value: i(c.ncd.dm),
        unit: "visits",
        color: d.orange
      }), e(p, {
        icon: "\u{1F9E0}",
        label: "Stroke",
        value: i(c.ncd.stroke),
        unit: "visits",
        color: d.purple
      }), e(p, {
        icon: "\u2764\uFE0F",
        label: "\u0E42\u0E23\u0E04\u0E2B\u0E31\u0E27\u0E43\u0E08 (IHD)",
        value: i(c.ncd.ihd),
        unit: "visits",
        color: d.red
      }), e(p, {
        icon: "\u{1FAD8}",
        label: "CKD \u0E44\u0E15\u0E27\u0E32\u0E22",
        value: i(c.ncd.ckd),
        unit: "visits",
        color: d.amber
      }), e(p, {
        icon: "\u{1FAC1}",
        label: "COPD",
        value: i(c.ncd.copd),
        unit: "visits",
        color: d.cyan
      }), e(p, {
        icon: "\u{1F9C8}",
        label: "\u0E44\u0E02\u0E21\u0E31\u0E19 (DLP)",
        value: i(c.ncd.dlp),
        unit: "visits",
        color: d.green
      })]
    }), (t.quality_scorecard || t.ncd_followup) && r(te, {
      children: [e(j, {
        icon: "\u{1FA7A}",
        label: "Quality Scorecard \xB7 \u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 MoPH",
        sub: "MRA coding \xB7 NCD monitoring \xB7 MTD",
        color: d.emerald
      }), r("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 12
        },
        children: [t.quality_scorecard && (() => {
          let a = t.quality_scorecard,
            s = a.opd_coding_rate,
            o = a.ipd_coding_rate,
            _ = s < 80 ? {
              level: s < 60 ? "critical" : "warn",
              threshold: "target \u2265 90% (MRA)",
              recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 OPD coding queue \xB7 \u0E40\u0E23\u0E48\u0E07 coder \xB7 audit ICD-10 completeness",
              drillToTab: "medrec"
            } : null,
            A = o < 90 ? {
              level: o < 70 ? "critical" : "warn",
              threshold: "target \u2265 95% (HA \xB7 3-day grace)",
              recommendation: "\u0E40\u0E23\u0E48\u0E07 DRG coding \xB7 audit pdx completeness \xB7 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 coder",
              drillToTab: "medrec"
            } : null;
          return r(te, {
            children: [e(p, {
              icon: "\u{1F4CB}",
              label: "OPD Coding Rate (MRA)",
              value: xe(s),
              unit: "",
              sub: `${i(a.opd_coded)}/${i(a.opd_total)} visits \xB7 target \u2265 90%`,
              color: d.cyan,
              alert: _,
              onClick: _ ? U("opdCoding") : void 0,
              expanded: g === "opdCoding",
              onGoToTab: E,
              detailText: `MTD: ${i(a.opd_coded)} visits \u0E21\u0E35 diagnosis \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 \u0E08\u0E32\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${i(a.opd_total)} visits
Visits \u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35 Dx: ${i(a.opd_total-a.opd_coded)}
\u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32 ${s}%`
            }), e(p, {
              icon: "\u{1F3E5}",
              label: "IPD Coding Rate (3d grace)",
              value: xe(o),
              unit: "",
              sub: `${i(a.ipd_coded)}/${i(a.ipd_eligible)} admits \xB7 target \u2265 95%`,
              color: d.purple,
              alert: A,
              onClick: A ? U("ipdCoding") : void 0,
              expanded: g === "ipdCoding",
              onGoToTab: E,
              detailText: `MTD: ${i(a.ipd_coded)} admits \u0E21\u0E35 pdx \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 \u0E08\u0E32\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${i(a.ipd_eligible)} admits (\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E40\u0E01\u0E34\u0E19 3 \u0E27\u0E31\u0E19)
Admits \u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48 coded: ${i(a.ipd_eligible-a.ipd_coded)}
\u0E04\u0E34\u0E14\u0E40\u0E1B\u0E47\u0E19\u0E2D\u0E31\u0E15\u0E23\u0E32 ${o}%`
            })]
          })
        })(), t.ncd_followup && r(te, {
          children: [e(p, {
            icon: "\u{1FA78}",
            label: "HT Patients (unique)",
            value: i(t.ncd_followup.ht_patients),
            unit: "\u0E04\u0E19",
            sub: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 HT \u0E17\u0E35\u0E48\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
            color: d.red
          }), e(p, {
            icon: "\u{1F36F}",
            label: "DM Patients (unique)",
            value: i(t.ncd_followup.dm_patients),
            unit: "\u0E04\u0E19",
            sub: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 DM \u0E17\u0E35\u0E48\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
            color: d.orange
          }), e(p, {
            icon: "\u{1FAD8}",
            label: "CKD Patients (unique)",
            value: i(t.ncd_followup.ckd_patients),
            unit: "\u0E04\u0E19",
            sub: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 CKD \u0E17\u0E35\u0E48\u0E21\u0E32\u0E15\u0E23\u0E27\u0E08\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
            color: d.amber
          })]
        })]
      })]
    }), e(j, {
      icon: "\u{1F4B0}",
      label: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 3 \u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
      sub: "OPD + IPD \u0E23\u0E27\u0E21",
      color: d.green
    }), e("div", {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${G.length}, 1fr)`,
        gap: 12
      },
      children: G.map((a, s) => {
        let o = s === G.length - 1;
        return r("div", {
          style: {
            padding: "16px 18px",
            borderRadius: 12,
            background: o ? `linear-gradient(135deg, ${d.green}15 0%, ${d.cyan}10 100%)` : "var(--md-surface)",
            border: `1px solid ${o?d.green:"var(--md-border)"}`,
            borderLeft: `4px solid ${o?d.green:d.gray}`
          },
          children: [r("div", {
            style: {
              fontSize: 11,
              fontWeight: 800,
              color: o ? d.green : "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: ".05em"
            },
            children: ["\u0E1B\u0E35\u0E07\u0E1A ", a.be, " ", o && "(\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19)"]
          }), r("div", {
            style: {
              fontSize: 22,
              fontWeight: 900,
              color: "var(--md-text-primary)",
              fontVariantNumeric: "tabular-nums",
              marginTop: 4
            },
            children: [k(a.total_income), " ", e("span", {
              style: {
                fontSize: 11,
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "\u0E1A\u0E32\u0E17"
            })]
          }), r("div", {
            style: {
              marginTop: 8,
              fontSize: 11,
              fontWeight: 600,
              color: "var(--md-text-secondary)",
              display: "flex",
              flexDirection: "column",
              gap: 3
            },
            children: [r("span", {
              children: ["OPD: ", k(a.opd_income)]
            }), r("span", {
              children: ["IPD: ", k(a.ipd_income)]
            }), r("span", {
              children: ["Visits: ", i(a.opd_visits)]
            })]
          })]
        }, a.be)
      })
    }), R && (R.eom_opd_visits || R.fy_total_income_projection) && r(te, {
      children: [e(j, {
        icon: "\u{1F52E}",
        label: "Forecast \xB7 \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E2A\u0E34\u0E49\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19 \xB7 \u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35\u0E07\u0E1A",
        sub: "linear projection \u0E08\u0E32\u0E01 pace \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19",
        color: d.blue
      }), e("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12
        },
        children: [{
          key: "eom_opd_visits",
          icon: "\u{1FA7A}",
          label: "OPD visits \u2192 \u0E2A\u0E34\u0E49\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19",
          color: d.cyan,
          current: c.opd.visits
        }, {
          key: "eom_opd_income",
          icon: "\u{1F4B0}",
          label: "OPD \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \u2192 \u0E2A\u0E34\u0E49\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19",
          color: d.green,
          current: c.opd.income,
          isMoney: !0
        }, {
          key: "eom_ipd_admissions",
          icon: "\u{1F3E5}",
          label: "IPD admit \u2192 \u0E2A\u0E34\u0E49\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19",
          color: d.amber,
          current: c.ipd.admissions
        }, {
          key: "eom_ipd_income",
          icon: "\u{1F4B0}",
          label: "IPD \u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \u2192 \u0E2A\u0E34\u0E49\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19",
          color: d.emerald,
          current: c.ipd.income,
          isMoney: !0
        }, {
          key: "eom_er_visits",
          icon: "\u{1F691}",
          label: "ER visits \u2192 \u0E2A\u0E34\u0E49\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19",
          color: d.red,
          current: c.er.visits
        }].filter(a => R[a.key]).map(a => {
          let s = R[a.key],
            o = a.isMoney ? k : i;
          return r("div", {
            style: {
              padding: "14px 16px",
              borderRadius: 12,
              background: `linear-gradient(135deg, ${a.color}12 0%, transparent 100%)`,
              border: `1px solid ${a.color}30`,
              borderLeft: `4px solid ${a.color}`
            },
            children: [r("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 6
              },
              children: [e("span", {
                style: {
                  fontSize: 16
                },
                children: a.icon
              }), e("span", {
                style: {
                  fontSize: 10,
                  fontWeight: 800,
                  color: a.color,
                  textTransform: "uppercase",
                  letterSpacing: ".05em"
                },
                children: a.label
              })]
            }), r("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: 8
              },
              children: [e("span", {
                style: {
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"
              }), e("span", {
                style: {
                  fontSize: 16,
                  fontWeight: 900,
                  color: "var(--md-text-primary)",
                  fontVariantNumeric: "tabular-nums"
                },
                children: o(a.current)
              })]
            }), r("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                marginTop: 4
              },
              children: [e("span", {
                style: {
                  fontSize: 13,
                  fontWeight: 700,
                  color: a.color
                },
                children: "\u2192 \u0E2A\u0E34\u0E49\u0E19\u0E40\u0E14\u0E37\u0E2D\u0E19"
              }), e("span", {
                style: {
                  fontSize: 22,
                  fontWeight: 900,
                  color: a.color,
                  fontVariantNumeric: "tabular-nums"
                },
                children: o(s.value)
              })]
            }), r("div", {
              style: {
                fontSize: 10,
                fontWeight: 600,
                color: "var(--md-text-tertiary)",
                marginTop: 4
              },
              children: [s.days_elapsed, "/", s.days_in_month, " \u0E27\u0E31\u0E19\u0E1C\u0E48\u0E32\u0E19\u0E44\u0E1B \xB7 \u0E16\u0E36\u0E07 ", s.eom]
            })]
          }, a.key)
        })
      }), R.fy_total_income_projection > 0 && r("div", {
        style: {
          padding: "14px 18px",
          borderRadius: 12,
          background: `linear-gradient(135deg, ${d.purple}10 0%, ${d.cyan}08 100%)`,
          border: `1.5px solid ${d.purple}40`,
          borderLeft: `4px solid ${d.purple}`,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12
        },
        children: [r("div", {
          children: [r("div", {
            style: {
              fontSize: 10,
              fontWeight: 800,
              color: d.purple,
              textTransform: "uppercase",
              letterSpacing: ".05em"
            },
            children: ["\u{1F3AF} \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E01\u0E32\u0E23\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21 \u2192 \u0E2A\u0E34\u0E49\u0E19\u0E1B\u0E35\u0E07\u0E1A ", t.current_fy]
          }), r("div", {
            style: {
              fontSize: 24,
              fontWeight: 900,
              color: "var(--md-text-primary)",
              fontVariantNumeric: "tabular-nums",
              marginTop: 4
            },
            children: [k(R.fy_total_income_projection), " ", e("span", {
              style: {
                fontSize: 12,
                fontWeight: 700,
                color: "var(--md-text-tertiary)"
              },
              children: "\u0E1A\u0E32\u0E17"
            })]
          }), r("div", {
            style: {
              fontSize: 11,
              fontWeight: 600,
              color: "var(--md-text-secondary)",
              marginTop: 4
            },
            children: ["\u0E1C\u0E48\u0E32\u0E19\u0E44\u0E1B ", R.fy_days_elapsed, "/", R.fy_total_days, " \u0E27\u0E31\u0E19 \xB7 \u0E16\u0E36\u0E07 ", R.fy_end]
          })]
        }), r("div", {
          children: [e("div", {
            style: {
              fontSize: 10,
              fontWeight: 800,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: ".05em"
            },
            children: "\u{1F4CA} \u0E41\u0E22\u0E01\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17"
          }), r("div", {
            style: {
              marginTop: 4,
              fontSize: 12,
              fontWeight: 600,
              color: "var(--md-text-secondary)",
              display: "flex",
              flexDirection: "column",
              gap: 2
            },
            children: [r("span", {
              children: ["\u{1FA7A} OPD: ", e("strong", {
                style: {
                  color: d.cyan
                },
                children: k(R.fy_opd_income_projection)
              })]
            }), r("span", {
              children: ["\u{1F3E5} IPD: ", e("strong", {
                style: {
                  color: d.amber
                },
                children: k(R.fy_ipd_income_projection)
              })]
            })]
          })]
        }), r("div", {
          children: [r("div", {
            style: {
              fontSize: 10,
              fontWeight: 800,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: ".05em"
            },
            children: ["\u{1F4C8} vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19 (", G[1]?.be, ")"]
          }), e("div", {
            style: {
              marginTop: 4,
              fontSize: 13,
              fontWeight: 800,
              color: "var(--md-text-primary)"
            },
            children: G[1]?.total_income > 0 ? (() => {
              let a = (R.fy_total_income_projection - G[1].total_income) / G[1].total_income * 100,
                s = a >= 0;
              return r("span", {
                style: {
                  color: s ? "#10b981" : "#f43f5e"
                },
                children: [s ? "\u25B2" : "\u25BC", " ", Math.abs(a).toFixed(1), "%"]
              })
            })() : "\u2014"
          }), r("div", {
            style: {
              fontSize: 10,
              fontWeight: 600,
              color: "var(--md-text-tertiary)"
            },
            children: ["\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19: ", k(G[1]?.total_income)]
          })]
        })]
      })]
    }), le.length > 0 && r(te, {
      children: [e(j, {
        icon: "\u{1F9E0}",
        label: "AI \u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C \xB7 \u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
        sub: `${le.length} \u0E1B\u0E23\u0E30\u0E40\u0E14\u0E47\u0E19`,
        color: d.purple
      }), e("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 12
        },
        children: le.map((a, s) => {
          let o = {
            HIGH: {
              bg: "rgba(244,63,94,.08)",
              text: "#f43f5e",
              label: "\u26A0\uFE0F HIGH"
            },
            MEDIUM: {
              bg: "rgba(245,158,11,.08)",
              text: "#f59e0b",
              label: "\u{1F4CC} MEDIUM"
            },
            LOW: {
              bg: "rgba(16,185,129,.08)",
              text: "#10b981",
              label: "\u2713 LOW"
            }
          } [a.priority] || {
            bg: "rgba(245,158,11,.08)",
            text: "#f59e0b",
            label: "\u{1F4CC} MEDIUM"
          };
          return r("div", {
            style: {
              borderRadius: 14,
              border: `1.5px solid ${a.color}20`,
              background: `${a.color}04`,
              overflow: "hidden"
            },
            children: [r("div", {
              style: {
                padding: "10px 16px",
                borderBottom: `1px solid ${a.color}15`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: `linear-gradient(90deg, ${a.color}10, transparent)`
              },
              children: [e("span", {
                style: {
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: a.color,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 900,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                },
                children: s + 1
              }), e("span", {
                style: {
                  fontSize: 20
                },
                children: a.icon
              }), e("span", {
                style: {
                  flex: 1,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "var(--md-text-primary)"
                },
                children: a.title
              }), e("span", {
                style: {
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: 99,
                  background: o.bg,
                  color: o.text,
                  letterSpacing: ".06em",
                  whiteSpace: "nowrap"
                },
                children: o.label
              })]
            }), e("div", {
              style: {
                padding: "12px 16px",
                fontSize: 12,
                lineHeight: 1.7,
                color: "var(--md-text-secondary)",
                fontWeight: 500,
                whiteSpace: "pre-line"
              },
              children: a.body
            })]
          }, s)
        })
      })]
    }), r("div", {
      style: {
        textAlign: "center",
        fontSize: "10px",
        fontWeight: 600,
        color: "var(--md-text-tertiary)",
        padding: "8px 0"
      },
      children: [t.data_source, " \xB7 Update ", new Date(t.timestamp).toLocaleString("th-TH")]
    })]
  })
}
var rt = Ae.memo(Ue);
export {
  rt as
  default
};