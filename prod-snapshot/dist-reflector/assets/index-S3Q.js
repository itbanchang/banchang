const F = (e, t = F, s = t.f || (t.f = ["assets/FinanceTab-DxsMfpH2.js", "assets/vendor-react-ByYOq5k4.js", "assets/shared-ui-OVDEF1.js", "assets/vendor-charts-C5q2M-g3.js", "assets/OPDTab-B-3Nwmy8.js", "assets/IPDTab-BAtLSwHc.js", "assets/ERTab-BGDc9EN2.js", "assets/DentalTab-B-F7s0Q_.js", "assets/ThaiMedTab-CqxkseFj.js", "assets/PhysTherapyTab-DOjCiWCi.js", "assets/NCDTab-CLJw8JhT.js", "assets/MedRecTab-eLInVRx8.js", "assets/XRAYTab-C2tK9T1x.js", "assets/PharmacyTab-DkGYHCN0.js", "assets/LaboratoryTab-BqanbJ9D.js", "assets/QualityTab-CIUO0s25.js", "assets/CompareTab-B2-8lP8e.js", "assets/ReportTab-PTSVC12.js", "assets/DoctorActivityTab-DGAX5Rn1.js", "assets/AuditLogTab-BmItc4LE.js", "assets/CustomerInsightTab-CIPO10.js", "assets/AIAssistant-ZY2z1QyQ.js", "assets/ExecutiveCommandCenter-CLfzUk5Q.js", "assets/ServerSettings-DUKaDoqN.js"])) => e.map(r => s[r]);
var Ge = e => {
    throw TypeError(e)
  },
  Oe = (e, t, s) => t.has(e) || Ge("Cannot " + s),
  n = (e, t, s) => (Oe(e, t, "read from private field"), s ? s.call(e) : t.get(e)),
  j = (e, t, s) => t.has(e) ? Ge("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, s),
  b = (e, t, s, r) => (Oe(e, t, "write to private field"), r ? r.call(e, s) : t.set(e, s), s),
  I = (e, t, s) => (Oe(e, t, "access private method"), s),
  Re = (e, t, s, r) => ({
    set _(a) {
      b(e, t, a, s)
    },
    get _() {
      return n(e, t, r)
    }
  });
import {
  r as p,
  j as u,
  R as k,
  b as Ct
} from "./vendor-react-ByYOq5k4.js";
import {
  u as qe,
  a as Ye,
  _ as C,
  b as Bt,
  D as Nt,
  c as Tt,
  A as Pt,
  d as It
} from "./shared-ui-OVDEF1.js";
(function() {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver(r => {
    for (const a of r)
      if (a.type === "childList")
        for (const i of a.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && s(i)
  }).observe(document, {
    childList: !0,
    subtree: !0
  });

  function t(r) {
    const a = {};
    return r.integrity && (a.integrity = r.integrity), r.referrerPolicy && (a.referrerPolicy = r.referrerPolicy), r.crossOrigin === "use-credentials" ? a.credentials = "include" : r.crossOrigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin", a
  }

  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const a = t(r);
    fetch(r.href, a)
  }
})();

function Mt() {
  const e = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/);
  return e ? e[1] : null
}
async function Ve(e, t = {}, s, r) {
  const a = Mt(),
    i = {
      ...t.headers
    };
  a && t.method && t.method !== "GET" && (i["x-csrf-token"] = a);
  const o = {
    ...t,
    credentials: "include",
    headers: i
  };
  let E = await fetch(e, o);
  if (E.status === 401 && r) try {
    await r(), E = await fetch(e, o)
  } catch {}
  return E
}

function Le(e, t) {
  return (s, r = {}) => Ve(s, r, null, t)
}
const Ot = Object.freeze(Object.defineProperty({
  __proto__: null,
  createBoundFetch: Le,
  fetchWithTokenRefresh: Ve
}, Symbol.toStringTag, {
  value: "Module"
}));

function Rt(e = !0) {
  const [t, s] = p.useState([]), [r, a] = p.useState([]), [i, o] = p.useState(null), [E, d] = p.useState(null), [A, f] = p.useState(!1), [D, S] = p.useState(null), {
    tokens: l,
    refreshAccessToken: c
  } = qe(), m = p.useCallback(async () => {
    if (e) {
      f(!0), S(null);
      try {
        const y = Le(l, c),
          [v, x, h, g] = await Promise.all([y("/api/ai/insights").catch(() => ({
            json: () => ({
              insights: []
            })
          })), y("/api/ai/anomalies").catch(() => ({
            json: () => ({
              anomalies: []
            })
          })), y("/api/ai/forecast/revenue?months=3").catch(() => ({
            json: () => ({
              forecast: []
            })
          })), fetch("/api/ai/clinical-insights", {
            credentials: "include"
          }).catch(() => null)]),
          [B, _, T] = await Promise.all([v.ok ? v.json() : {
            insights: []
          }, x.ok ? x.json() : {
            anomalies: []
          }, h.ok ? h.json() : {
            forecast: []
          }]);
        if (s(B.insights || []), a(_.anomalies || []), g?.ok && d(await g.json()), T.forecast && T.forecast.length > 0) {
          const G = T.forecast[0];
          o(`Next month predicted revenue: ${new Intl.NumberFormat("th-TH",{style:"currency",currency:"THB",notation:"compact",maximumFractionDigits:1}).format(G.forecast)} (${G.confidence||85}% confidence)`)
        }
      } catch (y) {
        S(y.message)
      } finally {
        f(!1)
      }
    }
  }, [e, c]);
  return p.useEffect(() => {
    if (e) {
      m();
      const y = setInterval(m, 12e4);
      return () => clearInterval(y)
    }
  }, [e, m]), {
    insights: t,
    anomalies: r,
    prediction: i,
    clinicalInsights: E,
    loading: A,
    error: D,
    refetch: m
  }
}

function qt({
  onLoginSuccess: e
}) {
  const {
    login: t,
    loading: s,
    error: r
  } = qe(), [a, i] = p.useState(""), [o, E] = p.useState(""), [d, A] = p.useState(""), [f, D] = p.useState(!1), S = async c => {
    if (c.preventDefault(), A(""), !a || !o) {
      A("Username and password are required");
      return
    }
    try {
      await t(a, o), e ? e() : window.location.href = "/"
    } catch (m) {
      m.name === "AbortError" || m.name === "TimeoutError" ? A("\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21\u0E15\u0E48\u0E2D server \u0E44\u0E14\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07 (Timeout)") : A(m.message || "Login failed. Please try again.")
    }
  }, l = d || r;
  return u.jsx("div", {
    className: "login-container",
    children: u.jsxs("div", {
      className: "login-card",
      children: [u.jsxs("div", {
        className: "login-header",
        children: [u.jsx("h1", {
          children: "\u{1F3E5} BCH 360\xB0 Intelligence"
        }), u.jsx("p", {
          children: "Hospital Dashboard & Analytics"
        })]
      }), l && u.jsxs("div", {
        className: "error-banner",
        role: "alert",
        children: [u.jsx("span", {
          children: "\u26A0\uFE0F"
        }), u.jsx("span", {
          children: l
        })]
      }), u.jsxs("form", {
        onSubmit: S,
        className: "login-form",
        children: [u.jsxs("div", {
          className: "form-group",
          children: [u.jsx("label", {
            htmlFor: "username",
            children: "Username"
          }), u.jsx("input", {
            id: "username",
            type: "text",
            value: a,
            onChange: c => i(c.target.value),
            placeholder: "Enter your username",
            disabled: s,
            autoComplete: "username",
            required: !0
          })]
        }), u.jsxs("div", {
          className: "form-group",
          children: [u.jsx("label", {
            htmlFor: "password",
            children: "Password"
          }), u.jsxs("div", {
            className: "password-input-wrapper",
            children: [u.jsx("input", {
              id: "password",
              type: f ? "text" : "password",
              value: o,
              onChange: c => E(c.target.value),
              placeholder: "Enter your password",
              disabled: s,
              autoComplete: "current-password",
              required: !0
            }), u.jsx("button", {
              type: "button",
              className: "toggle-password",
              onClick: () => D(!f),
              disabled: s,
              "aria-label": "Toggle password visibility",
              children: f ? "\u{1F441}\uFE0F" : "\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F"
            })]
          })]
        }), u.jsx("button", {
          type: "submit",
          className: "login-button",
          disabled: s,
          children: s ? u.jsxs(u.Fragment, {
            children: [u.jsx("span", {
              className: "spinner"
            }), "Logging in..."]
          }) : "Login"
        })]
      }), u.jsxs("div", {
        className: "login-footer",
        children: [u.jsxs("p", {
          className: "credentials-hint",
          children: ["Demo credentials: Username: ", u.jsx("code", {
            children: "admin"
          })]
        }), u.jsx("p", {
          className: "security-note",
          children: "\u2705 Passwords are encrypted with bcrypt \xB7 Tokens expire automatically"
        })]
      })]
    })
  })
}

function Lt(e, t) {
  let s = 0;
  return (...r) => {
    const a = Date.now();
    a - s >= t && (s = a, e(...r))
  }
}

function Wt() {
  const {
    dispatch: e,
    addAlert: t
  } = Ye(), s = p.useRef(null), r = p.useRef(null), a = p.useRef([]), i = p.useCallback(E => {
    a.current.forEach(({
      event: m,
      handler: y
    }) => {
      E.off(m, y)
    }), a.current = [];
    const d = () => {},
      A = Lt(m => {
        e({
          type: "SET_DATA",
          key: "liveBedData",
          payload: m
        })
      }, 750),
      f = m => {
        t(m)
      },
      D = m => {
        e({
          type: "SET_DATA",
          key: "erResusAlert",
          payload: m
        })
      },
      S = () => {},
      l = m => {
        e({
          type: "SET_LAST_UPDATED",
          payload: Date.now()
        })
      },
      c = m => {
        t({
          ...m,
          timestamp: m.timestamp || new Date().toISOString()
        })
      };
    E.on("connect", d), E.on("bed:update", A), E.on("alert:emergency", f), E.on("er:resus", D), E.on("dashboard:update", l), E.on("alert:new", c), E.on("disconnect", S), a.current = [{
      event: "connect",
      handler: d
    }, {
      event: "bed:update",
      handler: A
    }, {
      event: "alert:emergency",
      handler: f
    }, {
      event: "er:resus",
      handler: D
    }, {
      event: "dashboard:update",
      handler: l
    }, {
      event: "alert:new",
      handler: c
    }, {
      event: "disconnect",
      handler: S
    }]
  }, [e, t]), o = p.useCallback(async () => {
    try {
      const {
        io: E
      } = await C(async () => {
        const {
          io: A
        } = await import("./vendor-socket-c7YYqO-H.js");
        return {
          io: A
        }
      }, []);
      if (s.current?.connected) return;
      const d = E(window.location.origin, {
        transports: ["websocket", "polling"],
        reconnection: !0,
        reconnectionDelay: 3e3,
        reconnectionDelayMax: 1e4,
        maxReconnectionAttempts: 5
      });
      i(d), s.current = d
    } catch {
      r.current = setTimeout(o, 5e3)
    }
  }, [i]);
  return p.useEffect(() => (o(), () => {
    s.current && (a.current.forEach(({
      event: E,
      handler: d
    }) => {
      s.current.off(E, d)
    }), s.current.disconnect(), s.current = null), r.current && clearTimeout(r.current), a.current = []
  }), [o]), s.current
}
const zt = ({
  trend: e,
  size: t = "md"
}) => {
  const s = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  } [t] || "w-4 h-4";
  if (!e) return null;
  const r = e > 0,
    a = r ? "text-emerald-500" : "text-red-500";
  return u.jsx("svg", {
    className: `${s} ${a} inline-block`,
    fill: "currentColor",
    viewBox: "0 0 20 20",
    children: r ? u.jsx("path", {
      fillRule: "evenodd",
      d: "M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z",
      clipRule: "evenodd"
    }) : u.jsx("path", {
      fillRule: "evenodd",
      d: "M12 13a1 1 0 110 2H7a1 1 0 01-1-1V9a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 1.414L8.414 13h3.586z",
      clipRule: "evenodd"
    })
  })
};

function _t({
  title: e,
  value: t,
  unit: s = "",
  icon: r = "\u{1F4CA}",
  color: a = "blue",
  trend: i = null,
  trendLabel: o = "",
  format: E = "number",
  loading: d = !1,
  drillDownId: A,
  drillDownEndpoint: f,
  onDrillDown: D,
  aiInsight: S = null,
  comparison: l = null
}) {
  const [c, m] = p.useState(!1), y = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      accent: "bg-blue-500"
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      accent: "bg-green-500"
    },
    red: {
      bg: "bg-red-50 dark:bg-red-900/20",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      accent: "bg-red-500"
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      accent: "bg-purple-500"
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      accent: "bg-amber-500"
    },
    cyan: {
      bg: "bg-cyan-50 dark:bg-cyan-900/20",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-200 dark:border-cyan-800",
      accent: "bg-cyan-500"
    }
  }, v = y[a] || y.blue, x = (g => {
    if (g == null) return "-";
    switch (E) {
      case "currency":
        return new Intl.NumberFormat("th-TH", {
          style: "currency",
          currency: "THB",
          notation: "compact",
          maximumFractionDigits: 1
        }).format(g);
      case "percent":
        return `${(g*100).toFixed(1)}%`;
      case "decimal":
        return parseFloat(g).toFixed(2);
      case "number":
      default:
        return new Intl.NumberFormat("th-TH").format(g)
    }
  })(t), h = i > 0 ? "text-emerald-600" : "text-red-600";
  return u.jsxs("div", {
    className: `group relative rounded-2xl border transition-all duration-500 cursor-pointer ${v.bg} ${v.border}`,
    onClick: () => A && D && D(A, e, f),
    style: {
      boxShadow: "0 4px 20px -2px rgba(0,0,0,0.05)",
      backdropFilter: "blur(16px)"
    },
    onMouseEnter: g => {
      g.currentTarget.style.transform = "translateY(-4px)", g.currentTarget.style.boxShadow = "0 20px 40px -5px rgba(0,0,0,0.1)"
    },
    onMouseLeave: g => {
      g.currentTarget.style.transform = "none", g.currentTarget.style.boxShadow = "0 4px 20px -2px rgba(0,0,0,0.05)"
    },
    children: [u.jsx("div", {
      className: `absolute -inset-[1px] rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition duration-500 ${v.accent} pointer-events-none`
    }), u.jsxs("div", {
      className: "relative h-full flex flex-col p-4 sm:p-5 md:p-6 z-10 bg-white/30 dark:bg-gray-900/40 rounded-2xl overflow-hidden",
      children: [u.jsx("div", {
        className: `absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-150 ${v.accent}`
      }), u.jsxs("div", {
        className: "flex items-start justify-between gap-3 mb-4",
        children: [u.jsxs("div", {
          className: "flex items-start gap-3 flex-1",
          children: [u.jsx("div", {
            className: `flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-xl sm:text-2xl shadow-sm border border-white/40 dark:border-gray-700/40 backdrop-blur-md ${v.bg}`,
            children: r
          }), u.jsxs("div", {
            className: "flex-1 min-w-0 flex flex-col justify-center min-h-[40px] sm:min-h-[48px]",
            children: [u.jsx("h3", {
              className: "text-[11px] sm:text-xs md:text-[13px] font-extrabold uppercase tracking-wide text-gray-700 dark:text-gray-300 truncate",
              children: e
            }), l && u.jsx("p", {
              className: "text-[10px] sm:text-[11px] font-medium text-gray-500 dark:text-gray-400 mt-0.5 truncate",
              children: l
            })]
          })]
        }), S && u.jsx("button", {
          onClick: g => {
            g.stopPropagation(), m(!c)
          },
          className: `flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-current shadow-sm hover:scale-110 hover:rotate-12 transition-all duration-300 flex-shrink-0 ${c?"bg-current text-white dark:text-gray-900":"bg-white/50 dark:bg-gray-800/50 text-current"} ${v.text}`,
          title: "AI Insight",
          children: u.jsx("span", {
            className: "text-[13px] sm:text-sm",
            children: "\u2728"
          })
        })]
      }), u.jsx("div", {
        className: "mb-auto",
        children: u.jsxs("div", {
          className: "flex items-baseline gap-1.5 flex-wrap",
          children: [u.jsx("p", {
            className: `text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${v.text} break-words`,
            style: {
              textShadow: "0 2px 10px rgba(0,0,0,0.02)"
            },
            children: x
          }), s && u.jsx("span", {
            className: "text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 mt-1",
            children: s
          })]
        })
      }), i !== null && u.jsxs("div", {
        className: `mt-4 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl w-fit border border-current shadow-sm bg-white/60 dark:bg-gray-800/60 backdrop-blur-md transition-transform hover:scale-105 ${h}`,
        children: [u.jsx(zt, {
          trend: i,
          size: "sm"
        }), u.jsxs("span", {
          className: "tracking-wide",
          children: [Math.abs(i), "%"]
        }), o && u.jsxs("span", {
          className: "text-gray-500 dark:text-gray-400 font-medium ml-1",
          children: ["\u2022 ", o]
        })]
      }), u.jsx("div", {
        className: `overflow-hidden transition-all duration-500 ease-in-out ${c?"max-h-40 opacity-100 mt-4":"max-h-0 opacity-0 mt-0"}`,
        children: u.jsxs("div", {
          className: "p-3 sm:p-4 rounded-xl border border-white/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 shadow-inner backdrop-blur-md relative overflow-hidden",
          children: [u.jsx("div", {
            className: `absolute left-0 top-0 bottom-0 w-1 ${v.accent}`
          }), u.jsxs("div", {
            className: "flex items-start gap-2 sm:gap-3",
            children: [u.jsx("span", {
              className: "text-base sm:text-lg flex-shrink-0 mt-0.5 filter drop-shadow-sm",
              children: "\u{1F916}"
            }), u.jsxs("div", {
              className: "flex-1 min-w-0",
              children: [u.jsx("p", {
                className: "text-[10px] sm:text-xs font-bold text-gray-800 dark:text-gray-200 mb-0.5 tracking-wider uppercase",
                children: "Strategic AI Guidance"
              }), u.jsx("p", {
                className: "text-[11px] sm:text-xs leading-relaxed text-gray-700 dark:text-gray-300 font-medium",
                children: S
              })]
            })]
          })]
        })
      }), A && u.jsx("div", {
        className: "absolute bottom-3 right-3 text-gray-400 group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400 transition-all duration-300 text-lg opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0",
        children: u.jsx("svg", {
          className: "w-5 h-5",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: u.jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2.5,
            d: "M14 5l7 7m0 0l-7 7m7-7H3"
          })
        })
      }), d && u.jsx("div", {
        className: "absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-[2px] z-20 flex items-center justify-center",
        children: u.jsx("div", {
          className: `w-8 h-8 rounded-full border-4 border-current border-t-transparent animate-spin ${v.text}`
        })
      })]
    })]
  })
}
const We = k.memo(_t);

function Ht() {
  return null
}
const Qt = k.memo(Ht),
  Kt = [{
    id: "ha",
    name: "HA Thailand",
    desc: "Healthcare Accreditation",
    icon: "\u2B50",
    color: "#f59e0b"
  }, {
    id: "pdpa",
    name: "PDPA",
    desc: "\u0E1E.\u0E23.\u0E1A.\u0E04\u0E38\u0E49\u0E21\u0E04\u0E23\u0E2D\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E48\u0E27\u0E19\u0E1A\u0E38\u0E04\u0E04\u0E25",
    icon: "\u{1F512}",
    color: "#e11d48"
  }, {
    id: "hipaa",
    name: "HIPAA",
    desc: "Health Insurance Portability Act",
    icon: "\u{1F6E1}\uFE0F",
    color: "#0284c7"
  }, {
    id: "icd10",
    name: "ICD-10 TM",
    desc: "International Classification of Diseases",
    icon: "\u{1F4CB}",
    color: "#0f766e"
  }, {
    id: "drg",
    name: "DRG v6",
    desc: "Diagnosis Related Groups",
    icon: "\u{1F3E5}",
    color: "#6d28d9"
  }, {
    id: "rbac",
    name: "RBAC",
    desc: "Role-Based Access Control",
    icon: "\u{1F464}",
    color: "#059669"
  }, {
    id: "news2",
    name: "NEWS2",
    desc: "National Early Warning Score",
    icon: "\u{1F6A8}",
    color: "#dc2626"
  }, {
    id: "sepsis",
    name: "Sepsis-3",
    desc: "qSOFA + SIRS Screening",
    icon: "\u{1FA7A}",
    color: "#be185d"
  }],
  Je = {
    pass: {
      label: "PASS",
      color: "#10b981",
      bg: "rgba(16,185,129,.08)",
      icon: "\u2705"
    },
    warn: {
      label: "WARNING",
      color: "#f59e0b",
      bg: "rgba(245,158,11,.08)",
      icon: "\u26A0\uFE0F"
    },
    fail: {
      label: "FAIL",
      color: "#ef4444",
      bg: "rgba(239,68,68,.08)",
      icon: "\u274C"
    },
    info: {
      label: "INFO",
      color: "#0284c7",
      bg: "rgba(2,132,199,.08)",
      icon: "\u2139\uFE0F"
    },
    loading: {
      label: "...",
      color: "#94a3b8",
      bg: "rgba(148,163,184,.08)",
      icon: "\u23F3"
    }
  };

function V(e, t, s = "lte") {
  return e == null ? "loading" : s === "lte" ? e <= t ? "pass" : e <= t * 1.5 ? "warn" : "fail" : s === "gte" ? e >= t ? "pass" : e >= t * .7 ? "warn" : "fail" : "info"
}
const je = k.memo(({
    icon: e,
    label: t,
    value: s,
    unit: r,
    target: a,
    standard: i,
    status: o,
    recommendation: E
  }) => {
    const d = Je[o] || Je.info;
    return u.jsxs("div", {
      className: "flex items-center gap-3 p-3 rounded-xl transition-all hover:shadow-sm",
      style: {
        background: d.bg,
        border: `1px solid ${d.color}20`
      },
      children: [u.jsx("span", {
        className: "text-lg flex-shrink-0",
        children: e || d.icon
      }), u.jsxs("div", {
        className: "flex-1 min-w-0",
        children: [u.jsxs("div", {
          className: "flex items-center gap-2 flex-wrap",
          children: [u.jsx("span", {
            className: "text-xs font-bold",
            style: {
              color: "var(--md-text-primary)"
            },
            children: t
          }), i && u.jsx("span", {
            className: "text-[8px] font-black px-1.5 py-0.5 rounded",
            style: {
              background: `${d.color}15`,
              color: d.color
            },
            children: i
          })]
        }), u.jsxs("div", {
          className: "flex items-center gap-2 mt-0.5",
          children: [u.jsx("span", {
            className: "text-sm font-black",
            style: {
              color: d.color
            },
            children: s != null ? `${s}${r||""}` : "\u2014"
          }), a && u.jsxs("span", {
            className: "text-[10px] font-medium",
            style: {
              color: "var(--md-text-tertiary)"
            },
            children: ["\u0E40\u0E1B\u0E49\u0E32: ", a]
          })]
        }), E && o !== "pass" && u.jsxs("p", {
          className: "text-[10px] font-medium mt-1",
          style: {
            color: "var(--md-text-secondary)"
          },
          children: ["\u{1F4A1} ", E]
        })]
      }), u.jsx("span", {
        className: "text-[9px] font-black px-2 py-1 rounded-full flex-shrink-0 text-white",
        style: {
          background: d.color
        },
        children: d.label
      })]
    })
  }),
  Ut = [{
    id: "management",
    icon: "\u{1F454}",
    color: "#6d28d9",
    gradient: "linear-gradient(135deg, #6d28d9, #4f46e5)",
    title: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E41\u0E25\u0E30\u0E02\u0E31\u0E1A\u0E40\u0E04\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23",
    titleEn: "Project Management & Leadership",
    desc: "\u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21\u0E17\u0E34\u0E28\u0E17\u0E32\u0E07 \u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E41\u0E25\u0E30\u0E43\u0E2B\u0E49\u0E41\u0E19\u0E48\u0E43\u0E08\u0E27\u0E48\u0E32\u0E23\u0E30\u0E1A\u0E1A\u0E15\u0E2D\u0E1A\u0E42\u0E08\u0E17\u0E22\u0E4C\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22",
    roles: [{
      title: "Project Sponsor",
      titleTh: "\u0E1C\u0E39\u0E49\u0E2D\u0E38\u0E1B\u0E16\u0E31\u0E21\u0E20\u0E4C\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23",
      who: "\u0E1C\u0E2D.\u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25 (CEO) / CMO",
      icon: "\u{1F3DB}\uFE0F",
      badge: "EXEC",
      duties: ["\u0E2D\u0E19\u0E38\u0E21\u0E31\u0E15\u0E34\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13", "\u0E1C\u0E25\u0E31\u0E01\u0E14\u0E31\u0E19\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22", "\u0E41\u0E01\u0E49\u0E44\u0E02\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22"]
    }, {
      title: "Project Manager",
      titleTh: "\u0E1C\u0E39\u0E49\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23",
      who: "\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 / PM IT",
      icon: "\u{1F4CB}",
      badge: "PM",
      duties: ["\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19 Timeline", "\u0E04\u0E27\u0E1A\u0E04\u0E38\u0E21\u0E07\u0E1A", "\u0E1B\u0E23\u0E30\u0E2A\u0E32\u0E19\u0E17\u0E35\u0E21 Data-IT-\u0E41\u0E1E\u0E17\u0E22\u0E4C"]
    }, {
      title: "Product Owner",
      titleTh: "\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E1C\u0E25\u0E34\u0E15\u0E20\u0E31\u0E13\u0E11\u0E4C",
      who: "\u0E2B\u0E31\u0E27\u0E2B\u0E19\u0E49\u0E32\u0E1D\u0E48\u0E32\u0E22\u0E22\u0E38\u0E17\u0E18\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C",
      icon: "\u{1F3AF}",
      badge: "PO",
      duties: ["\u0E23\u0E27\u0E1A\u0E23\u0E27\u0E21 Requirement / KPIs", "\u0E08\u0E31\u0E14\u0E25\u0E33\u0E14\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E04\u0E31\u0E0D", "\u0E15\u0E23\u0E27\u0E08\u0E23\u0E31\u0E1A\u0E07\u0E32\u0E19"]
    }]
  }, {
    id: "engineering",
    icon: "\u2699\uFE0F",
    color: "#0f766e",
    gradient: "linear-gradient(135deg, #0f766e, #059669)",
    title: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19\u0E41\u0E25\u0E30\u0E27\u0E34\u0E28\u0E27\u0E01\u0E23\u0E23\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
    titleEn: "Data Engineering & Infrastructure",
    desc: '"\u0E2B\u0E25\u0E31\u0E07\u0E1A\u0E49\u0E32\u0E19" \u0E08\u0E31\u0E14\u0E01\u0E32\u0E23 HIS (HOSxP XE), ETL, Data Warehouse',
    roles: [{
      title: "Data Architect",
      titleTh: "\u0E2A\u0E16\u0E32\u0E1B\u0E19\u0E34\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
      who: "\u0E1C\u0E39\u0E49\u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E23\u0E30\u0E1A\u0E1A\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
      icon: "\u{1F3D7}\uFE0F",
      badge: "ARCH",
      duties: ["\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A Data Warehouse / Data Lake", "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "\u0E27\u0E32\u0E07\u0E2A\u0E16\u0E32\u0E1B\u0E31\u0E15\u0E22\u0E01\u0E23\u0E23\u0E21 Real-time"]
    }, {
      title: "Data Engineer",
      titleTh: "\u0E27\u0E34\u0E28\u0E27\u0E01\u0E23\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
      who: "\u0E27\u0E34\u0E28\u0E27\u0E01\u0E23\u0E0B\u0E2D\u0E1F\u0E15\u0E4C\u0E41\u0E27\u0E23\u0E4C",
      icon: "\u{1F527}",
      badge: "DE",
      duties: ["ETL: \u0E14\u0E36\u0E07\u0E08\u0E32\u0E01 HIS, LIS, PACS", "Data Cleansing", "\u0E41\u0E1B\u0E25\u0E07\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C"]
    }, {
      title: "DBA",
      titleTh: "\u0E1C\u0E39\u0E49\u0E14\u0E39\u0E41\u0E25\u0E23\u0E30\u0E1A\u0E1A\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
      who: "\u0E17\u0E35\u0E21 IT \u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25",
      icon: "\u{1F5A5}\uFE0F",
      badge: "DBA",
      duties: ["\u0E14\u0E39\u0E41\u0E25 Server / Network", "\u0E44\u0E21\u0E48\u0E43\u0E2B\u0E49\u0E01\u0E23\u0E30\u0E17\u0E1A Production DB", "Backup & DR"]
    }]
  }, {
    id: "analytics",
    icon: "\u{1F4CA}",
    color: "#0284c7",
    gradient: "linear-gradient(135deg, #0284c7, #0ea5e9)",
    title: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E41\u0E25\u0E30\u0E19\u0E33\u0E40\u0E2A\u0E19\u0E2D\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
    titleEn: "Data Analysis & Visualization",
    desc: '"\u0E2B\u0E19\u0E49\u0E32\u0E1A\u0E49\u0E32\u0E19" \u0E2A\u0E23\u0E49\u0E32\u0E07 Dashboard \u0E43\u0E2B\u0E49\u0E2A\u0E27\u0E22\u0E07\u0E32\u0E21 \u0E40\u0E02\u0E49\u0E32\u0E43\u0E08\u0E07\u0E48\u0E32\u0E22 \u0E41\u0E25\u0E30\u0E40\u0E01\u0E34\u0E14 Insight',
    roles: [{
      title: "BI Developer",
      titleTh: "\u0E19\u0E31\u0E01\u0E1E\u0E31\u0E12\u0E19\u0E32 BI",
      who: "System Analyst / Developer",
      icon: "\u{1F3A8}",
      badge: "BI",
      duties: ["\u0E2A\u0E23\u0E49\u0E32\u0E07 Dashboard", "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A UI/UX", "Responsive \u0E17\u0E38\u0E01\u0E2D\u0E38\u0E1B\u0E01\u0E23\u0E13\u0E4C"]
    }, {
      title: "Data Analyst",
      titleTh: "\u0E19\u0E31\u0E01\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
      who: "\u0E19\u0E31\u0E01\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C / \u0E19\u0E31\u0E01\u0E40\u0E27\u0E0A\u0E2A\u0E16\u0E34\u0E15\u0E34",
      icon: "\u{1F50D}",
      badge: "DA",
      duties: ["\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E40\u0E0A\u0E34\u0E07\u0E25\u0E36\u0E01", "SQL Queries", "Root Cause Analysis", "\u0E04\u0E33\u0E19\u0E27\u0E13 Unit Cost"]
    }, {
      title: "Data Scientist",
      titleTh: "\u0E19\u0E31\u0E01\u0E27\u0E34\u0E17\u0E22\u0E32\u0E28\u0E32\u0E2A\u0E15\u0E23\u0E4C\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
      who: "\u0E1C\u0E39\u0E49\u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D ML/AI",
      icon: "\u{1F9E0}",
      badge: "DS",
      duties: ["\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E42\u0E21\u0E40\u0E14\u0E25 ML", "Predictive Analytics", "\u0E17\u0E33\u0E19\u0E32\u0E22\u0E40\u0E15\u0E35\u0E22\u0E07\u0E40\u0E15\u0E47\u0E21 / \u0E20\u0E32\u0E27\u0E30\u0E41\u0E17\u0E23\u0E01\u0E0B\u0E49\u0E2D\u0E19"]
    }]
  }, {
    id: "compliance",
    icon: "\u{1F6E1}\uFE0F",
    color: "#e11d48",
    gradient: "linear-gradient(135deg, #e11d48, #f43f5e)",
    title: "\u0E01\u0E25\u0E38\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E17\u0E32\u0E07\u0E41\u0E25\u0E30\u0E01\u0E32\u0E23\u0E01\u0E33\u0E01\u0E31\u0E1A\u0E14\u0E39\u0E41\u0E25",
    titleEn: "Domain & Compliance",
    desc: "\u0E43\u0E2B\u0E49\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E25\u0E30\u0E16\u0E39\u0E01\u0E01\u0E0E\u0E2B\u0E21\u0E32\u0E22",
    roles: [{
      title: "Healthcare SME",
      titleTh: "\u0E1C\u0E39\u0E49\u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C",
      who: "\u0E41\u0E1E\u0E17\u0E22\u0E4C, \u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25, \u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23, \u0E19\u0E31\u0E01\u0E40\u0E27\u0E0A\u0E2A\u0E16\u0E34\u0E15\u0E34",
      icon: "\u2695\uFE0F",
      badge: "SME",
      duties: ["Data Dictionary / \u0E19\u0E34\u0E22\u0E32\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25", "\u0E15\u0E23\u0E27\u0E08\u0E23\u0E2B\u0E31\u0E2A ICD-10, DRG", "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 KPI \u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01"]
    }, {
      title: "DPO / Security Officer",
      titleTh: "\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
      who: "DPO \u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25",
      icon: "\u{1F512}",
      badge: "DPO",
      duties: ["\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A PDPA/HIPAA", "Data Masking", "RBAC \u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07"]
    }]
  }];

function $t({
  isOpen: e,
  onClose: t
}) {
  const [s, r] = p.useState("management"), [a, i] = p.useState(null), [o, E] = p.useState(!1), [d, A] = p.useState("audit"), f = p.useCallback(async () => {
    E(!0);
    try {
      const [l, c, m, y, v] = await Promise.all([fetch("/api/dashboard/summary", {
        credentials: "include"
      }).then(x => x.ok ? x.json() : null).catch(() => null), fetch("/api/quality/analytics", {
        credentials: "include"
      }).then(x => x.ok ? x.json() : null).catch(() => null), fetch("/api/ai/ews/summary", {
        credentials: "include"
      }).then(x => x.ok ? x.json() : null).catch(() => null), fetch("/api/ai/clinical-insights", {
        credentials: "include"
      }).then(x => x.ok ? x.json() : null).catch(() => null), fetch("/api/system/status", {
        credentials: "include"
      }).then(x => x.ok ? x.json() : null).catch(() => null)]);
      i({
        summary: l,
        quality: c,
        ews: m,
        clinical: y,
        system: v,
        timestamp: new Date().toISOString()
      })
    } catch {}
    E(!1)
  }, []);
  p.useEffect(() => {
    e && f()
  }, [e, f]);
  const D = p.useMemo(() => {
      if (!a) return {};
      const l = a.summary || {},
        c = a.quality || {},
        m = a.ews || {},
        y = a.clinical || {},
        v = a.system || {},
        x = l.finance || {},
        h = l.beds || {},
        g = l.clinical || {},
        B = l.staff || {},
        _ = y.doctor || [],
        T = y.nurse || [],
        G = _.find(q => q.id === "sepsis_alert")?.count || 0,
        w = _.find(q => q.id === "deterioration_alert")?.count || 0,
        R = _.find(q => q.id === "critical_labs")?.count || 0,
        de = T.find(q => q.id === "fall_risk")?.count || 0,
        he = T.find(q => q.id === "monitor_gaps")?.count || 0,
        ae = T.find(q => q.id === "ward_acuity")?.wards?.filter(q => q.severity === "critical").length || 0,
        Y = c.readmit_rate ?? c.readmission_rate,
        Pe = c.mortality_rate,
        Ie = c.ama_rate,
        Me = c.hai_rate;
      return {
        ha_quality: [{
          icon: "\u{1F504}",
          label: "Readmission Rate 30 \u0E27\u0E31\u0E19",
          value: Y != null ? Number(Y).toFixed(1) : null,
          unit: "%",
          target: "<5%",
          standard: "HA-PCT",
          status: V(Y, 5),
          recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Discharge Planning, Follow-up 48 \u0E0A\u0E21."
        }, {
          icon: "\u{1F4CA}",
          label: "Mortality Rate",
          value: Pe != null ? Number(Pe).toFixed(1) : null,
          unit: "%",
          target: "<2%",
          standard: "HA-PCT",
          status: V(Pe, 2),
          recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Mortality Case Review, EWS compliance"
        }, {
          icon: "\u{1F6AA}",
          label: "AMA Rate (\u0E2B\u0E19\u0E35\u0E01\u0E25\u0E31\u0E1A)",
          value: Ie != null ? Number(Ie).toFixed(1) : null,
          unit: "%",
          target: "<3%",
          standard: "HA-ENV",
          status: V(Ie, 3),
          recommendation: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38: \u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22, \u0E04\u0E27\u0E32\u0E21\u0E1E\u0E36\u0E07\u0E1E\u0E2D\u0E43\u0E08"
        }, {
          icon: "\u{1F9A0}",
          label: "HAI Rate (\u0E15\u0E34\u0E14\u0E40\u0E0A\u0E37\u0E49\u0E2D\u0E43\u0E19 \u0E23\u0E1E.)",
          value: Me != null ? Number(Me).toFixed(1) : null,
          unit: "%",
          target: "<1%",
          standard: "HA-IC",
          status: V(Me, 1),
          recommendation: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Infection Control Protocol"
        }, {
          icon: "\u{1F3E5}",
          label: "Discharge Before Noon",
          value: c.dch_plan != null ? Number(c.dch_plan).toFixed(0) : null,
          unit: "%",
          target: "\u226550%",
          standard: "HA-ENV",
          status: V(c.dch_plan, 50, "gte"),
          recommendation: "\u0E40\u0E23\u0E48\u0E07 Discharge Planning \u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48 Day 1"
        }, {
          icon: "\u{1F4CB}",
          label: "QPI Score",
          value: c.qpi_score != null ? Number(c.qpi_score).toFixed(0) : null,
          unit: "/100",
          target: "\u226580",
          standard: "HA-ALL",
          status: V(c.qpi_score, 80, "gte"),
          recommendation: "\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 Indicators \u0E17\u0E35\u0E48\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E1B\u0E49\u0E32"
        }],
        clinical_safety: [{
          icon: "\u{1F6A8}",
          label: "EWS Critical Patients",
          value: g.critical_patients ?? m.critical,
          unit: " \u0E23\u0E32\u0E22",
          target: "0",
          standard: "NEWS2",
          status: (g.critical_patients || m.critical || 0) > 3 ? "fail" : (g.critical_patients || m.critical || 0) > 0 ? "warn" : "pass",
          recommendation: "\u0E15\u0E23\u0E27\u0E08 EWS \u22657 \u0E17\u0E38\u0E01 30 \u0E19\u0E32\u0E17\u0E35, \u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E31\u0E19\u0E17\u0E35"
        }, {
          icon: "\u{1F534}",
          label: "Sepsis Risk (qSOFA/SIRS)",
          value: G,
          unit: " \u0E23\u0E32\u0E22",
          target: "0",
          standard: "Sepsis-3",
          status: G > 2 ? "fail" : G > 0 ? "warn" : "pass",
          recommendation: "Blood culture + Lactate + ATB \u0E20\u0E32\u0E22\u0E43\u0E19 1 \u0E0A\u0E21."
        }, {
          icon: "\u26A0\uFE0F",
          label: "Deteriorating Patients",
          value: w,
          unit: " \u0E23\u0E32\u0E22",
          target: "0",
          standard: "NEWS2",
          status: w > 3 ? "fail" : w > 0 ? "warn" : "pass",
          recommendation: "\u0E40\u0E1E\u0E34\u0E48\u0E21 Monitoring frequency, \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E41\u0E1C\u0E19\u0E23\u0E31\u0E01\u0E29\u0E32"
        }, {
          icon: "\u{1F9EA}",
          label: "Critical Lab Values",
          value: R,
          unit: " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
          target: "0",
          standard: "Lab Safety",
          status: R > 5 ? "fail" : R > 0 ? "warn" : "pass",
          recommendation: "\u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E38\u0E01 critical value \u0E20\u0E32\u0E22\u0E43\u0E19 30 \u0E19\u0E32\u0E17\u0E35"
        }, {
          icon: "\u{1F9B4}",
          label: "Fall Risk \u0E2A\u0E39\u0E07",
          value: de,
          unit: " \u0E23\u0E32\u0E22",
          standard: "Patient Safety",
          status: de > 10 ? "warn" : "pass",
          recommendation: "Bed rail, \u0E1B\u0E49\u0E32\u0E22\u0E40\u0E15\u0E37\u0E2D\u0E19, Morse Fall Scale"
        }, {
          icon: "\u{1F4CB}",
          label: "V/S Monitoring Gap (\u22656 \u0E0A\u0E21.)",
          value: he,
          unit: " \u0E23\u0E32\u0E22",
          target: "0",
          standard: "NEWS2",
          status: he > 5 ? "fail" : he > 0 ? "warn" : "pass",
          recommendation: "\u0E27\u0E31\u0E14 V/S \u0E15\u0E32\u0E21\u0E01\u0E33\u0E2B\u0E19\u0E14, \u0E44\u0E21\u0E48\u0E02\u0E49\u0E32\u0E21 schedule"
        }, {
          icon: "\u{1F3E5}",
          label: "Critical Ward Acuity",
          value: ae,
          unit: " ward",
          standard: "Staffing",
          status: ae > 2 ? "fail" : ae > 0 ? "warn" : "pass",
          recommendation: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E15\u0E32\u0E21 Acuity Score"
        }],
        infrastructure: [{
          icon: "\u{1F5A5}\uFE0F",
          label: "Database Connection",
          value: v.mysql_connected ? "Connected" : "Disconnected",
          standard: "Infra",
          status: v.mysql_connected ? "pass" : "fail",
          recommendation: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A Network / MySQL service"
        }, {
          icon: "\u{1F9E0}",
          label: "AI Modules Active",
          value: v.ai_modules?.length || 0,
          unit: " modules",
          standard: "AI",
          status: (v.ai_modules?.length || 0) >= 8 ? "pass" : "warn",
          recommendation: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A AI module startup errors"
        }, {
          icon: "\u23F1\uFE0F",
          label: "System Uptime",
          value: v.uptime ? `${Math.floor(v.uptime/3600)}h ${Math.floor(v.uptime%3600/60)}m` : null,
          standard: "SLA",
          status: v.uptime > 3600 ? "pass" : "warn"
        }, {
          icon: "\u{1F6CF}\uFE0F",
          label: "Bed Occupancy",
          value: h.occupancy_rate != null ? Number(h.occupancy_rate).toFixed(0) : null,
          unit: "%",
          target: "75-85%",
          standard: "Capacity",
          status: h.occupancy_rate > 95 ? "fail" : h.occupancy_rate > 90 ? "warn" : "pass",
          recommendation: "\u0E40\u0E1B\u0E34\u0E14 Surge Protocol \u0E16\u0E49\u0E32\u0E40\u0E01\u0E34\u0E19 90%"
        }, {
          icon: "\u{1F468}\u200D\u2695\uFE0F",
          label: "Staff On-Duty",
          value: B.on_duty ?? B.doctors_today,
          unit: " \u0E04\u0E19",
          standard: "Staffing",
          status: (B.on_duty || B.doctors_today || 0) > 0 ? "pass" : "warn"
        }],
        financial: [{
          icon: "\u{1F4B0}",
          label: "Collection Rate",
          value: x.collection_rate != null ? Number(x.collection_rate).toFixed(1) : null,
          unit: "%",
          target: "\u226590%",
          standard: "RCM",
          status: V(x.collection_rate, 90, "gte"),
          recommendation: "\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E25\u0E39\u0E01\u0E2B\u0E19\u0E35\u0E49, \u0E25\u0E14\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E40\u0E23\u0E35\u0E22\u0E01\u0E40\u0E01\u0E47\u0E1A"
        }, {
          icon: "\u{1F6D1}",
          label: "Denial Rate",
          value: x.denial_rate != null ? Number(x.denial_rate).toFixed(1) : null,
          unit: "%",
          target: "<5%",
          standard: "RCM",
          status: V(x.denial_rate, 5),
          recommendation: "Audit Coding accuracy, \u0E17\u0E1A\u0E17\u0E27\u0E19 Claim rejection"
        }, {
          icon: "\u{1F512}",
          label: "Data Masking (PDPA)",
          value: "Active",
          standard: "PDPA",
          status: "pass"
        }, {
          icon: "\u{1F464}",
          label: "RBAC Access Control",
          value: "Enforced",
          standard: "PDPA/HIPAA",
          status: "pass"
        }, {
          icon: "\u{1F4CB}",
          label: "ICD-10 TM Coding",
          value: "Standard",
          standard: "ICD-10 TM",
          status: "pass"
        }, {
          icon: "\u{1F3E5}",
          label: "DRG v6 Classification",
          value: "Active",
          standard: "DRG v6",
          status: "pass"
        }]
      }
    }, [a]),
    S = p.useMemo(() => {
      const l = Object.values(D).flat();
      if (l.length === 0) return {
        total: 0,
        pass: 0,
        warn: 0,
        fail: 0,
        score: 0
      };
      const c = l.filter(x => x.status === "pass").length,
        m = l.filter(x => x.status === "warn").length,
        y = l.filter(x => x.status === "fail").length,
        v = l.length > 0 ? Math.round(c / l.length * 100) : 0;
      return {
        total: l.length,
        pass: c,
        warn: m,
        fail: y,
        score: v
      }
    }, [D]);
  return e ? u.jsx("div", {
    className: "fixed inset-0 z-[200] flex items-center justify-center p-4",
    style: {
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(8px)"
    },
    onClick: t,
    children: u.jsxs("div", {
      className: "w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.3)"
      },
      onClick: l => l.stopPropagation(),
      children: [u.jsxs("div", {
        className: "sticky top-0 z-10 rounded-t-3xl",
        style: {
          background: "linear-gradient(135deg, #0f766e, #059669, #0284c7)",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        },
        children: [u.jsxs("div", {
          className: "p-5 pb-3",
          children: [u.jsxs("div", {
            className: "flex items-center justify-between",
            children: [u.jsxs("div", {
              children: [u.jsx("h2", {
                className: "text-lg font-black text-white tracking-tight flex items-center gap-2",
                children: "\u{1F3D7}\uFE0F Project Team & Standards Verification"
              }), u.jsx("p", {
                className: "text-white/60 text-[11px] font-medium mt-0.5",
                children: "Live Compliance Audit \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E08\u0E32\u0E01\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E23\u0E34\u0E07 Real-time"
              })]
            }), u.jsxs("div", {
              className: "flex items-center gap-2",
              children: [u.jsx("button", {
                onClick: f,
                disabled: o,
                className: "px-3 py-1.5 rounded-lg text-[10px] font-bold text-white border border-white/20 hover:bg-white/10 transition-colors disabled:opacity-50",
                children: o ? "\u23F3 Scanning..." : "\u{1F504} Re-Audit"
              }), u.jsx("button", {
                onClick: t,
                className: "w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm font-bold",
                children: "\u2715"
              })]
            })]
          }), u.jsxs("div", {
            className: "flex items-center gap-4 mt-3",
            children: [u.jsxs("div", {
              className: "flex items-center gap-2 px-3 py-1.5 rounded-xl",
              style: {
                background: "rgba(255,255,255,0.12)"
              },
              children: [u.jsx("span", {
                className: "text-2xl font-black text-white",
                children: S.score
              }), u.jsxs("span", {
                className: "text-white/60 text-[10px] font-bold",
                children: ["/100", u.jsx("br", {}), "SCORE"]
              })]
            }), u.jsxs("div", {
              className: "flex gap-3",
              children: [u.jsxs("span", {
                className: "text-[10px] font-bold text-white/80",
                children: ["\u2705 ", S.pass, " Pass"]
              }), u.jsxs("span", {
                className: "text-[10px] font-bold text-amber-300",
                children: ["\u26A0\uFE0F ", S.warn, " Warning"]
              }), u.jsxs("span", {
                className: "text-[10px] font-bold text-red-300",
                children: ["\u274C ", S.fail, " Fail"]
              }), u.jsxs("span", {
                className: "text-[10px] font-bold text-white/50",
                children: ["\u{1F4CB} ", S.total, " Total"]
              })]
            })]
          }), u.jsx("div", {
            className: "flex flex-wrap gap-1.5 mt-3",
            children: Kt.map(l => u.jsxs("span", {
              className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-white",
              style: {
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.15)"
              },
              children: [l.icon, " ", l.name]
            }, l.id))
          })]
        }), u.jsx("div", {
          className: "flex px-5 pb-0",
          children: [{
            id: "audit",
            label: "\u{1F4D0} Live Audit",
            desc: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19"
          }, {
            id: "team",
            label: "\u{1F465} Team Roles",
            desc: "\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E17\u0E35\u0E21"
          }].map(l => u.jsx("button", {
            onClick: () => A(l.id),
            className: "flex-1 py-2.5 text-center text-xs font-bold transition-all",
            style: {
              color: d === l.id ? "#fff" : "rgba(255,255,255,0.5)",
              borderBottom: d === l.id ? "3px solid #fff" : "3px solid transparent"
            },
            children: l.label
          }, l.id))
        })]
      }), u.jsxs("div", {
        className: "p-5 space-y-4",
        children: [d === "audit" && u.jsxs(u.Fragment, {
          children: [u.jsx(Se, {
            title: "\u2B50 HA Thailand \u2014 \u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E\u0E15\u0E32\u0E21\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19\u0E2A\u0E16\u0E32\u0E19\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25",
            color: "#f59e0b",
            desc: "PCT (Patient Care Team) \xB7 IC (Infection Control) \xB7 MED \xB7 ENV",
            children: (D.ha_quality || []).map((l, c) => u.jsx(je, {
              ...l
            }, c))
          }), u.jsx(Se, {
            title: "\u{1F6A8} Clinical Safety \u2014 \u0E04\u0E27\u0E32\u0E21\u0E1B\u0E25\u0E2D\u0E14\u0E20\u0E31\u0E22\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
            color: "#dc2626",
            desc: "NEWS2 \xB7 Sepsis-3 \xB7 qSOFA \xB7 SIRS \xB7 Fall Risk \xB7 Lab Safety",
            children: (D.clinical_safety || []).map((l, c) => u.jsx(je, {
              ...l
            }, c))
          }), u.jsx(Se, {
            title: "\u{1F5A5}\uFE0F Data Infrastructure \u2014 \u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E1E\u0E37\u0E49\u0E19\u0E10\u0E32\u0E19",
            color: "#0f766e",
            desc: "Database \xB7 AI Modules \xB7 Uptime \xB7 Capacity \xB7 Staffing",
            children: (D.infrastructure || []).map((l, c) => u.jsx(je, {
              ...l
            }, c))
          }), u.jsx(Se, {
            title: "\u{1F512} Financial & Compliance \u2014 \u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19\u0E41\u0E25\u0E30\u0E01\u0E33\u0E01\u0E31\u0E1A\u0E14\u0E39\u0E41\u0E25",
            color: "#6d28d9",
            desc: "PDPA \xB7 HIPAA \xB7 RBAC \xB7 ICD-10 TM \xB7 DRG v6 \xB7 RCM",
            children: (D.financial || []).map((l, c) => u.jsx(je, {
              ...l
            }, c))
          }), u.jsxs("p", {
            className: "text-center text-[10px] font-semibold",
            style: {
              color: "var(--md-text-tertiary)"
            },
            children: ["\u{1F550} Last Audit: ", a?.timestamp ? new Date(a.timestamp).toLocaleString("th-TH") : "\u2014", " \xB7 ", "Data Source: HOSxP XE \xB7 AI Engine: NEWS2 + qSOFA + LACE + Holt-Winters"]
          })]
        }), d === "team" && Ut.map(l => u.jsxs("div", {
          className: "rounded-2xl overflow-hidden transition-all duration-300",
          style: {
            border: "1px solid var(--md-border)",
            boxShadow: s === l.id ? "var(--md-shadow-lg)" : "none"
          },
          children: [u.jsxs("button", {
            onClick: () => r(s === l.id ? null : l.id),
            className: "w-full p-4 flex items-center gap-4 text-left transition-all hover:opacity-90",
            style: {
              background: s === l.id ? l.gradient : "var(--md-surface)"
            },
            children: [u.jsx("span", {
              className: "text-2xl flex-shrink-0",
              children: l.icon
            }), u.jsxs("div", {
              className: "flex-1 min-w-0",
              children: [u.jsx("h3", {
                className: "text-sm font-black",
                style: {
                  color: s === l.id ? "#fff" : "var(--md-text-primary)"
                },
                children: l.title
              }), u.jsx("p", {
                className: "text-[11px] font-semibold mt-0.5",
                style: {
                  color: s === l.id ? "rgba(255,255,255,0.7)" : "var(--md-text-tertiary)"
                },
                children: l.titleEn
              })]
            }), u.jsx("span", {
              className: "text-xs flex-shrink-0 transition-transform duration-200",
              style: {
                transform: s === l.id ? "rotate(180deg)" : "rotate(0)",
                color: s === l.id ? "#fff" : "var(--md-text-tertiary)"
              },
              children: "\u25BC"
            })]
          }), s === l.id && u.jsxs("div", {
            className: "p-4 pt-3 space-y-3",
            style: {
              background: "var(--md-surface-2, var(--md-surface))"
            },
            children: [u.jsx("p", {
              className: "text-xs font-medium px-3 py-2 rounded-xl",
              style: {
                color: "var(--md-text-secondary)",
                background: `${l.color}08`,
                borderLeft: `3px solid ${l.color}`
              },
              children: l.desc
            }), u.jsx("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",
              children: l.roles.map(c => u.jsxs("div", {
                className: "rounded-xl p-4 hover:shadow-md transition-all",
                style: {
                  background: "var(--md-surface)",
                  border: "1px solid var(--md-border)"
                },
                children: [u.jsxs("div", {
                  className: "flex items-center gap-2 mb-2",
                  children: [u.jsx("span", {
                    className: "text-lg",
                    children: c.icon
                  }), u.jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [u.jsxs("div", {
                      className: "flex items-center gap-1.5",
                      children: [u.jsx("h4", {
                        className: "text-xs font-black truncate",
                        style: {
                          color: "var(--md-text-primary)"
                        },
                        children: c.title
                      }), u.jsx("span", {
                        className: "text-[8px] font-black px-1.5 py-0.5 rounded text-white flex-shrink-0",
                        style: {
                          background: l.color
                        },
                        children: c.badge
                      })]
                    }), u.jsx("p", {
                      className: "text-[10px] font-semibold truncate",
                      style: {
                        color: "var(--md-text-tertiary)"
                      },
                      children: c.titleTh
                    })]
                  })]
                }), u.jsxs("p", {
                  className: "text-[10px] font-bold mb-2 px-2 py-1 rounded-lg",
                  style: {
                    background: `${l.color}08`,
                    color: l.color
                  },
                  children: ["\u{1F464} ", c.who]
                }), u.jsx("ul", {
                  className: "space-y-1",
                  children: c.duties.map((m, y) => u.jsxs("li", {
                    className: "flex items-start gap-1.5 text-[10px] font-medium",
                    style: {
                      color: "var(--md-text-secondary)"
                    },
                    children: [u.jsx("span", {
                      className: "w-1 h-1 rounded-full flex-shrink-0 mt-1.5",
                      style: {
                        background: l.color
                      }
                    }), m]
                  }, y))
                })]
              }, c.title))
            })]
          })]
        }, l.id))]
      })]
    })
  }) : null
}
const Se = k.memo(({
    title: e,
    color: t,
    desc: s,
    children: r
  }) => u.jsxs("div", {
    className: "rounded-2xl overflow-hidden",
    style: {
      border: "1px solid var(--md-border)"
    },
    children: [u.jsxs("div", {
      className: "p-4 pb-2",
      style: {
        borderLeft: `4px solid ${t}`
      },
      children: [u.jsx("h3", {
        className: "text-sm font-black",
        style: {
          color: "var(--md-text-primary)"
        },
        children: e
      }), u.jsx("p", {
        className: "text-[10px] font-medium mt-0.5",
        style: {
          color: "var(--md-text-tertiary)"
        },
        children: s
      })]
    }), u.jsx("div", {
      className: "p-3 pt-1 grid gap-2",
      children: r
    })]
  })),
  Gt = k.memo($t),
  Yt = p.memo(function() {
    const [e, t] = p.useState(new Date);
    return p.useEffect(() => {
      const s = setInterval(() => t(new Date), 1e3);
      return () => clearInterval(s)
    }, []), u.jsx("p", {
      className: "text-xs font-mono font-bold text-gray-700 mt-0.5",
      children: e.toLocaleTimeString("th-TH")
    })
  });

function Vt({
  darkMode: e,
  isLive: t,
  user: s,
  onDarkModeToggle: r,
  onServerSettings: a,
  onForceRefresh: i
}) {
  const o = (s?.full_name || "Admin").split(" ").map(E => E[0]).join("").slice(0, 2).toUpperCase();
  return u.jsx("header", {
    className: "sticky top-0 z-50 backdrop-blur-md border-b",
    style: {
      background: e ? "rgba(15,23,42,0.92)" : "rgba(255,255,255,0.92)",
      borderColor: "var(--md-border)",
      boxShadow: e ? "0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,.2)" : "0 1px 0 var(--md-divider), 0 2px 8px rgba(0,0,0,.04)"
    },
    children: u.jsx("div", {
      className: "max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-5 py-2.5",
      children: u.jsxs("div", {
        className: "flex items-center justify-between gap-4",
        children: [u.jsxs("div", {
          className: "flex items-center gap-3",
          children: [u.jsxs("div", {
            className: "relative",
            children: [u.jsx("div", {
              className: "w-10 h-10 rounded-2xl flex items-center justify-center text-white text-base font-black shadow-md",
              style: {
                background: "linear-gradient(135deg,#0f766e,#059669)"
              },
              children: "B"
            }), u.jsx("span", {
              className: "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white",
              style: {
                background: t ? "#10b981" : "#94a3b8"
              }
            })]
          }), u.jsxs("div", {
            children: [u.jsxs("h1", {
              className: "text-[17px] font-black tracking-tight leading-none flex items-center gap-1.5",
              style: {
                color: "var(--md-text-primary)"
              },
              children: ["BCH", u.jsx("span", {
                style: {
                  color: "var(--md-primary)"
                },
                children: "360\xB0"
              }), u.jsx("span", {
                style: {
                  color: "var(--md-text-secondary)",
                  fontWeight: 400,
                  fontSize: 13,
                  letterSpacing: "0.05em"
                },
                children: "Intelligence"
              })]
            }), u.jsxs("div", {
              className: "flex items-center gap-1.5 mt-1",
              children: [u.jsx("span", {
                className: "w-1.5 h-1.5 rounded-full",
                style: {
                  background: t ? "#10b981" : "#f59e0b"
                }
              }), u.jsx("p", {
                style: {
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--md-text-secondary)",
                  margin: 0
                },
                children: t ? "System Online" : "Connecting\u2026"
              })]
            })]
          })]
        }), u.jsx("div", {
          className: "hidden md:flex",
          children: u.jsx(Nt, {
            onForceRefresh: i
          })
        }), u.jsxs("div", {
          className: "flex items-center gap-3",
          children: [u.jsxs("div", {
            className: "text-right hidden sm:block",
            children: [u.jsx("p", {
              style: {
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--md-text-tertiary)",
                margin: 0
              },
              children: "Global Scan"
            }), u.jsx(Yt, {})]
          }), u.jsx("button", {
            id: "dark-mode-toggle",
            onClick: r,
            title: e ? "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E40\u0E1B\u0E47\u0E19 Light Mode" : "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E40\u0E1B\u0E47\u0E19 Dark Mode",
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: e ? "rgba(45,212,191,0.15)" : "rgba(15,23,42,0.06)",
              border: `1px solid ${e?"rgba(45,212,191,0.3)":"rgba(0,0,0,0.06)"}`,
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "16px"
            },
            children: e ? "\u2600\uFE0F" : "\u{1F319}"
          }), u.jsx("button", {
            onClick: a,
            title: "Database Server Settings",
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(15,118,110,0.08)",
              border: "1px solid rgba(15,118,110,0.15)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "16px"
            },
            children: "\u2699\uFE0F"
          }), u.jsx("div", {
            className: "w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm",
            style: {
              background: "linear-gradient(135deg,#0f766e,#0284c7)"
            },
            children: o
          })]
        })]
      })
    })
  })
}

function Jt({
  systemStatus: e,
  onShowTeam: t
}) {
  return u.jsx("footer", {
    className: "mt-auto border-t",
    style: {
      background: "var(--md-surface)",
      borderColor: "var(--md-border)",
      boxShadow: "0 -1px 0 var(--md-divider)"
    },
    children: u.jsxs("div", {
      className: `max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-5 py-5\r
                        flex flex-wrap items-center justify-between gap-3`,
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: "var(--md-text-secondary)"
      },
      children: [u.jsxs("div", {
        className: "flex items-center gap-2 flex-wrap",
        children: [u.jsx("span", {
          style: {
            color: "var(--md-text-tertiary)",
            fontWeight: 600
          },
          children: "\xA9 2026"
        }), u.jsx("span", {
          style: ze("rgba(15,118,110,.08)", "#0f766e"),
          children: "AI PROJECT"
        }), u.jsx("span", {
          className: "font-bold",
          style: {
            color: "var(--md-primary)",
            letterSpacing: "-0.01em"
          },
          children: "BCH 360\xB0 Intelligence"
        }), u.jsx("span", {
          style: {
            color: "var(--md-text-tertiary)"
          },
          children: "v10.4.0"
        }), u.jsx(Xe, {}), u.jsx("span", {
          style: ze("rgba(244,63,94,.08)", "#f43f5e"),
          children: "SYSTEM ANALYST & DEVELOPMENT BY"
        }), u.jsx("span", {
          style: {
            fontWeight: 800,
            color: "#f43f5e",
            letterSpacing: "-0.01em"
          },
          children: "BOSSART"
        }), u.jsx(Xe, {}), u.jsx("span", {
          style: ze("rgba(14,165,233,.08)", "#0ea5e9"),
          children: "TESTER & SUPPORTED BY"
        }), u.jsx("span", {
          style: {
            fontWeight: 800,
            color: "#0ea5e9",
            letterSpacing: "-0.01em"
          },
          children: "ITBANCHANG TEAM"
        })]
      })]
    })
  })
}

function Xe() {
  return u.jsx("span", {
    style: {
      color: "var(--md-border)"
    },
    children: "\xB7"
  })
}

function ze(e, t) {
  return {
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    background: e,
    padding: "2px 6px",
    borderRadius: "4px",
    color: t
  }
}
const Xt = k.lazy(() => C(() => import("./FinanceTab-DxsMfpH2.js"), F([0, 1, 2, 3]))),
  Zt = k.lazy(() => C(() => import("./OPDTab-B-3Nwmy8.js"), F([4, 1, 2, 3]))),
  eu = k.lazy(() => C(() => import("./IPDTab-BAtLSwHc.js"), F([5, 1, 2, 3]))),
  tu = k.lazy(() => C(() => import("./ERTab-BGDc9EN2.js"), F([6, 1, 2, 3]))),
  uu = k.lazy(() => C(() => import("./DentalTab-B-F7s0Q_.js"), F([7, 1, 2, 3]))),
  su = k.lazy(() => C(() => import("./ThaiMedTab-CqxkseFj.js"), F([8, 1, 2, 3]))),
  ru = k.lazy(() => C(() => import("./PhysTherapyTab-DOjCiWCi.js"), F([9, 1, 2, 3]))),
  au = k.lazy(() => C(() => import("./NCDTab-CLJw8JhT.js"), F([10, 1, 2, 3]))),
  nu = k.lazy(() => C(() => import("./MedRecTab-eLInVRx8.js"), F([11, 1, 2, 3]))),
  iu = k.lazy(() => C(() => import("./XRAYTab-C2tK9T1x.js"), F([12, 1, 2, 3]))),
  ou = k.lazy(() => C(() => import("./PharmacyTab-DkGYHCN0.js"), F([13, 1, 2, 3]))),
  Eu = k.lazy(() => C(() => import("./LaboratoryTab-BqanbJ9D.js"), F([14, 1, 2, 3]))),
  lu = k.lazy(() => C(() => import("./QualityTab-CIUO0s25.js"), F([15, 1, 2, 3]))),
  cu = k.lazy(() => C(() => import("./CompareTab-B2-8lP8e.js"), F([16, 1, 2, 3]))),
  du = k.lazy(() => C(() => import("./ReportTab-PTSVC12.js"), F([17, 2, 1]))),
  hu = k.lazy(() => C(() => import("./DoctorActivityTab-DGAX5Rn1.js"), F([18, 1, 2, 3]))),
  pu = k.lazy(() => C(() => import("./AuditLogTab-BmItc4LE.js"), F([19, 1, 2]))),
  mu = k.lazy(() => C(() => import("./MRAuditTab-MRAUD002.js"), F([]))),
  fu = k.lazy(() => C(() => import("./StaffCIDTab-SCID001.js"), F([]))),
  xu = k.lazy(() => C(() => import("./ErauditTab-ERAUDIT02.js"), F([]))),
  bu = k.lazy(() => C(() => import("./CustomerInsightTab-CIPO10.js"), F([20, 1, 2, 3]))),
  gu = k.lazy(() => C(() => import("./OverviewTab-S3Q.js"), F([]))),
  yu = {
    finance: Xt,
    opd: Zt,
    ipd: eu,
    er: tu,
    dental: uu,
    xray: iu,
    pharmacy: ou,
    lab: Eu,
    thaimed: su,
    phystherapy: ru,
    ncd: au,
    medrec: nu,
    quality: lu,
    report: du,
    compare: cu,
    "customer-insight": bu,
    "doctor-activity": hu,
    "audit-log": pu,
    "mr-audit": mu,
    "staff-cid": fu,
    eraudit: xu,
    overview: gu
  },
  Ze = [{
    id: "overview",
    label: "\u{1F3AF} \u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E1C\u0E39\u0E49\u0E1A\u0E23\u0E34\u0E2B\u0E32\u0E23",
    icon: "\u{1F3AF}",
    desc: "Today + MTD + 3 \u0E1B\u0E35\u0E07\u0E1A \xB7 \u0E17\u0E38\u0E01\u0E41\u0E1C\u0E19\u0E01 \xB7 AI insights"
  }, {
    id: "report",
    label: "Report",
    icon: "\u{1F4CB}",
    desc: "REPORT Online \u0E42\u0E23\u0E07\u0E1E\u0E22\u0E32\u0E1A\u0E32\u0E25\u0E1A\u0E49\u0E32\u0E19\u0E09\u0E32\u0E07"
  }, {
    id: "compare",
    label: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A",
    icon: "\u{1F4CA}",
    desc: "YoY \xB7 3 \u0E1B\u0E35\u0E07\u0E1A \xB7 \u0E17\u0E38\u0E01\u0E41\u0E1C\u0E19\u0E01"
  }, {
    id: "finance",
    label: "\u0E28\u0E39\u0E19\u0E22\u0E4C\u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49",
    icon: "\u{1F4B0}",
    desc: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49 \xB7 \u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22 \xB7 AI Forecast"
  }, {
    id: "opd",
    label: "OPD \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E19\u0E2D\u0E01",
    icon: "\u23F1\uFE0F",
    desc: "\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E04\u0E2D\u0E22 \xB7 \u0E2A\u0E16\u0E32\u0E19\u0E30\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01"
  }, {
    id: "ipd",
    label: "IPD \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19",
    icon: "\u{1F3E5}",
    desc: "\u0E40\u0E15\u0E35\u0E22\u0E07 \xB7 \u0E01\u0E32\u0E23\u0E19\u0E2D\u0E19 \xB7 AI \u0E1E\u0E22\u0E32\u0E01\u0E23\u0E13\u0E4C"
  }, {
    id: "er",
    label: "\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19",
    icon: "\u{1F691}",
    desc: "\u0E2A\u0E16\u0E32\u0E19\u0E30 ER \xB7 AI Surge Alert"
  }, {
    id: "eraudit",
    label: "\u0E2B\u0E49\u0E2D\u0E07\u0E09\u0E38\u0E01\u0E40\u0E09\u0E34\u0E19 (Audit)",
    icon: "\u{1F4CD}",
    desc: "\u0E41\u0E22\u0E01\u0E15\u0E33\u0E1A\u0E25 \xB7 Trauma/Non-Trauma \xB7 Stroke/STEMI/Sepsis"
  }, {
    id: "dental",
    label: "\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
    icon: "\u{1F9B7}",
    desc: "\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E1F\u0E31\u0E19 \xB7 DPI Analytics"
  }, {
    id: "xray",
    label: "\u0E23\u0E31\u0E07\u0E2A\u0E35\u0E27\u0E34\u0E17\u0E22\u0E32",
    icon: "\u2622\uFE0F",
    desc: "X-Ray \xB7 CT \xB7 MRI"
  }, {
    id: "pharmacy",
    label: "\u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23\u0E23\u0E21",
    icon: "\u{1F48A}",
    desc: "\u0E22\u0E32 \xB7 Generic \xB7 PPI Analytics"
  }, {
    id: "lab",
    label: "\u0E2B\u0E49\u0E2D\u0E07\u0E1B\u0E0F\u0E34\u0E1A\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23",
    icon: "\u{1F52C}",
    desc: "TAT \xB7 Abnormal \xB7 LPI Analytics"
  }, {
    id: "thaimed",
    label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22",
    icon: "\u{1F33F}",
    desc: "\u0E19\u0E27\u0E14 \xB7 \u0E2A\u0E21\u0E38\u0E19\u0E44\u0E1E\u0E23 \xB7 TPI Analytics"
  }, {
    id: "phystherapy",
    label: "\u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14",
    icon: "\u{1F3CB}\uFE0F",
    desc: "Rehab \xB7 PT \xB7 PPI Analytics"
  }, {
    id: "ncd",
    label: "NCD",
    icon: "\u{1FAC0}",
    desc: "DM \xB7 HT \xB7 CKD \xB7 NCI Analytics"
  }, {
    id: "medrec",
    label: "Coder Quality",
    icon: "\u{1F4C7}",
    desc: "Audit \xB7 Coding Quality Analytics"
  }, {
    id: "mr-audit",
    label: "MRA \u2014 Medical Record Audit",
    icon: "\u{1F4CB}",
    desc: "IPD Paperless \xB7 Completeness \xB7 Sidecar audit"
  }, {
    id: "staff-cid",
    label: "\u0E15\u0E23\u0E27\u0E08 CID \u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23",
    icon: "\u{1F194}",
    desc: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E01\u0E32\u0E23\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E02\u0E2D\u0E07\u0E1A\u0E38\u0E04\u0E25\u0E32\u0E01\u0E23 \xB7 498 CID"
  }, {
    id: "quality",
    label: "\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E HA",
    icon: "\u2B50",
    desc: "HA Thailand \xB7 QPI Analytics"
  }, {
    id: "customer-insight",
    label: "Customer Insight",
    icon: "\u{1F3AF}",
    desc: "\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u0E1C\u0E39\u0E49\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23 \xB7 \u0E2A\u0E34\u0E17\u0E18\u0E34 \xB7 \u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22"
  }, {
    id: "doctor-activity",
    label: "\u0E1C\u0E25\u0E1C\u0E25\u0E34\u0E15\u0E41\u0E1E\u0E17\u0E22\u0E4C + \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21",
    icon: "\u{1F468}\u200D\u2695\uFE0F",
    desc: "OPD \xB7 IPD \xB7 Orders \xB7 Revenue"
  }, {
    id: "audit-log",
    label: "Audit Log",
    icon: "\u{1F50D}",
    desc: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E43\u0E0A\u0E49 \xB7 Admin only",
    adminOnly: !0
  }];

function et() {
  return u.jsx("div", {
    className: "flex items-center justify-center py-24",
    children: u.jsxs("div", {
      className: "relative w-12 h-12",
      children: [u.jsx("div", {
        className: "absolute inset-0 rounded-full border-4 border-purple-100"
      }), u.jsx("div", {
        className: "absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"
      })]
    })
  })
}

function vu({
  activeTab: e,
  onTabChange: t,
  userRole: s
}) {
  const r = Ze.filter(h => !h.adminOnly || s === "admin"),
    [a, i] = p.useState(!1),
    [o, E] = p.useState(""),
    [d, A] = p.useState(() => {
      try {
        return new Set(JSON.parse(localStorage.getItem("bch360.hiddenTabs") || "[]"))
      } catch {
        return new Set
      }
    }),
    [f, D] = p.useState(!1),
    S = h => {
      A(g => {
        const B = new Set(g);
        B.has(h) ? B.delete(h) : B.add(h);
        try {
          localStorage.setItem("bch360.hiddenTabs", JSON.stringify([...B]))
        } catch {}
        return B
      })
    },
    l = () => {
      try {
        localStorage.removeItem("bch360.hiddenTabs")
      } catch {}
      A(new Set)
    },
    c = r.find(h => h.id === "report" && !d.has("report")) || r.find(h => !d.has(h.id)) || r[0],
    m = h => {
      t(h), i(!1), E("")
    };
  p.useEffect(() => {
    if (!a) return;
    const h = g => {
      g.key === "Escape" && i(!1)
    };
    return window.addEventListener("keydown", h), document.body.style.overflow = "hidden", () => {
      window.removeEventListener("keydown", h), document.body.style.overflow = ""
    }
  }, [a]);
  const y = o.trim().toLowerCase(),
    v = y ? r.filter(h => (h.label || "").toLowerCase().includes(y) || (h.desc || "").toLowerCase().includes(y) || (h.id || "").toLowerCase().includes(y)) : r,
    x = f ? v : v.filter(h => !d.has(h.id));
  return u.jsxs("div", {
    children: [u.jsx("div", {
      className: "mb-5 sticky z-40",
      style: {
        top: "64px"
      },
      children: u.jsxs("button", {
        onClick: () => i(!0),
        "aria-label": "\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E21\u0E19\u0E39",
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
          padding: "0.625rem 0.875rem",
          borderRadius: "1rem",
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          boxShadow: "var(--md-shadow-sm)",
          cursor: "pointer",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          textAlign: "left"
        },
        onMouseEnter: h => {
          h.currentTarget.style.transform = "translateY(-1px)", h.currentTarget.style.boxShadow = "var(--md-shadow-md, 0 6px 20px rgba(0,0,0,.08))"
        },
        onMouseLeave: h => {
          h.currentTarget.style.transform = "", h.currentTarget.style.boxShadow = "var(--md-shadow-sm)"
        },
        children: [u.jsx("div", {
          style: {
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, var(--md-primary, #0f766e), #7c3aed)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 3px 12px rgba(15,118,110,.3)"
          },
          children: u.jsxs("div", {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "3px",
              width: "16px"
            },
            children: [u.jsx("div", {
              style: {
                height: "2px",
                background: "#fff",
                borderRadius: "1px"
              }
            }), u.jsx("div", {
              style: {
                height: "2px",
                background: "#fff",
                borderRadius: "1px",
                width: "70%"
              }
            }), u.jsx("div", {
              style: {
                height: "2px",
                background: "#fff",
                borderRadius: "1px"
              }
            })]
          })
        }), u.jsx("span", {
          style: {
            fontSize: "1.75rem",
            lineHeight: 1,
            flexShrink: 0
          },
          children: c.icon
        }), u.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            flex: 1,
            minWidth: 0
          },
          children: [u.jsx("span", {
            style: {
              fontSize: "var(--fs-base, 14px)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--md-text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            children: c.label
          }), u.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--md-text-secondary)",
              opacity: .75,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            children: c.desc
          })]
        }), u.jsxs("span", {
          style: {
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--md-text-tertiary)",
            padding: "0.375rem 0.75rem",
            borderRadius: "999px",
            background: "var(--md-surface-2, rgba(0,0,0,.04))",
            whiteSpace: "nowrap",
            flexShrink: 0
          },
          children: [r.length, " \u0E40\u0E21\u0E19\u0E39 \u203A"]
        })]
      })
    }), u.jsx("div", {
      onClick: () => i(!1),
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex: 200,
        opacity: a ? 1 : 0,
        pointerEvents: a ? "auto" : "none",
        transition: "opacity 0.25s ease"
      }
    }), u.jsxs("div", {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "min(380px, 92vw)",
        background: "var(--md-surface)",
        borderRight: "1px solid var(--md-border)",
        boxShadow: "8px 0 40px rgba(0,0,0,0.25)",
        zIndex: 201,
        padding: "1.25rem 0.875rem",
        overflowY: "auto",
        transform: a ? "translateX(0)" : "translateX(-105%)",
        transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.875rem"
      },
      children: [u.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0.5rem"
        },
        children: [u.jsxs("div", {
          children: [u.jsx("div", {
            style: {
              fontSize: "10px",
              fontWeight: 800,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.12em"
            },
            children: "\u0E40\u0E21\u0E19\u0E39\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14"
          }), u.jsxs("div", {
            style: {
              fontSize: "16px",
              fontWeight: 900,
              color: "var(--md-text-primary)",
              marginTop: "2px"
            },
            children: [r.length - d.size, " / ", r.length, " \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", d.size > 0 ? u.jsx("span", {
              style: {
                fontSize: "11px",
                fontWeight: 700,
                color: "#f59e0b",
                marginLeft: "8px",
                background: "rgba(245,158,11,.12)",
                padding: "2px 8px",
                borderRadius: "99px"
              },
              children: ["\u{1F648} \u0E0B\u0E48\u0E2D\u0E19 ", d.size]
            }) : null]
          })]
        }), u.jsxs("div", {
          style: {
            display: "flex",
            gap: "6px",
            alignItems: "center"
          },
          children: [f && d.size > 0 ? u.jsx("button", {
            onClick: l,
            "aria-label": "\u0E41\u0E2A\u0E14\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
            title: "\u0E41\u0E2A\u0E14\u0E07\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
            style: {
              height: "34px",
              padding: "0 10px",
              borderRadius: "10px",
              border: "1px solid #f59e0b",
              background: "rgba(245,158,11,.12)",
              cursor: "pointer",
              fontSize: "11px",
              color: "#f59e0b",
              fontWeight: 800,
              letterSpacing: ".04em"
            },
            children: "\u21BA \u0E40\u0E0B\u0E47\u0E15"
          }) : null, u.jsx("button", {
            onClick: () => D(!f),
            "aria-label": f ? "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E40\u0E21\u0E19\u0E39" : "\u0E40\u0E1B\u0E34\u0E14\u0E42\u0E2B\u0E21\u0E14\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E40\u0E21\u0E19\u0E39",
            title: f ? "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 (\u0E04\u0E25\u0E34\u0E01 \u0E1B\u0E34\u0E14\u0E42\u0E2B\u0E21\u0E14)" : "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E40\u0E21\u0E19\u0E39 (\u0E0B\u0E48\u0E2D\u0E19/\u0E41\u0E2A\u0E14\u0E07)",
            style: {
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              border: f ? "1px solid #10b981" : "none",
              background: f ? "rgba(16,185,129,.12)" : "var(--md-surface-2, rgba(0,0,0,0.05))",
              cursor: "pointer",
              fontSize: "14px",
              color: f ? "#10b981" : "var(--md-text-secondary)",
              fontWeight: 700
            },
            children: f ? "\u2713" : "\u2699\uFE0F"
          }), u.jsx("button", {
            onClick: () => i(!1),
            "aria-label": "\u0E1B\u0E34\u0E14\u0E40\u0E21\u0E19\u0E39",
            style: {
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              border: "none",
              background: "var(--md-surface-2, rgba(0,0,0,0.05))",
              cursor: "pointer",
              fontSize: "14px",
              color: "var(--md-text-secondary)",
              fontWeight: 700
            },
            children: "\u2715"
          })]
        })]
      }), u.jsxs("div", {
        style: {
          position: "relative",
          padding: "0 0.5rem"
        },
        children: [u.jsx("input", {
          type: "text",
          value: o,
          onChange: h => E(h.target.value),
          placeholder: "\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E40\u0E21\u0E19\u0E39...",
          autoFocus: a,
          style: {
            width: "100%",
            padding: "0.625rem 0.75rem 0.625rem 2.25rem",
            borderRadius: "10px",
            border: "1px solid var(--md-border)",
            background: "var(--md-surface-2, rgba(0,0,0,0.03))",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--md-text-primary)",
            outline: "none"
          }
        }), u.jsx("span", {
          style: {
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "14px",
            opacity: .5
          },
          children: "\u{1F50D}"
        })]
      }), u.jsx("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "3px",
          padding: "0 0.25rem"
        },
        children: x.length === 0 ? u.jsx("div", {
          style: {
            padding: "2rem 1rem",
            textAlign: "center",
            fontSize: "12px",
            color: "var(--md-text-tertiary)"
          },
          children: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E40\u0E21\u0E19\u0E39\u0E17\u0E35\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E19"
        }) : x.map(h => {
          const g = d.has(h.id);
          return u.jsxs("button", {
            onClick: () => f ? S(h.id) : m(h.id),
            "data-active": e === h.id,
            style: {
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.625rem 0.75rem",
              borderRadius: "10px",
              border: f && g ? "1px dashed rgba(245,158,11,.45)" : "none",
              cursor: "pointer",
              background: e === h.id && !f ? "linear-gradient(135deg, var(--md-primary, #0f766e), #7c3aed)" : f && g ? "rgba(245,158,11,.04)" : "transparent",
              textAlign: "left",
              width: "100%",
              transition: "background 0.15s, transform 0.15s, opacity 0.15s",
              boxShadow: e === h.id && !f ? "0 4px 14px rgba(15,118,110,.25)" : "none",
              opacity: f && g ? .55 : 1
            },
            onMouseEnter: B => {
              e !== h.id && !f && (B.currentTarget.style.background = "var(--md-surface-2, rgba(0,0,0,0.04))")
            },
            onMouseLeave: B => {
              e !== h.id && !f ? B.currentTarget.style.background = "transparent" : f && g ? B.currentTarget.style.background = "rgba(245,158,11,.04)" : f && (B.currentTarget.style.background = "transparent")
            },
            children: [u.jsx("span", {
              style: {
                fontSize: "1.5rem",
                flexShrink: 0,
                filter: e === h.id && !f ? "drop-shadow(0 1px 4px rgba(0,0,0,.2))" : "none"
              },
              children: h.icon
            }), u.jsxs("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                flex: 1,
                minWidth: 0
              },
              children: [u.jsx("span", {
                style: {
                  fontSize: "13px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  color: e === h.id && !f ? "#fff" : "var(--md-text-primary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textDecoration: f && g ? "line-through" : "none"
                },
                children: h.label
              }), u.jsx("span", {
                style: {
                  fontSize: "10px",
                  fontWeight: 600,
                  color: e === h.id && !f ? "rgba(255,255,255,0.85)" : "var(--md-text-tertiary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                },
                children: h.desc
              })]
            }), f ? u.jsx("span", {
              style: {
                fontSize: "18px",
                flexShrink: 0,
                padding: "4px 8px",
                borderRadius: "8px",
                background: g ? "rgba(245,158,11,.18)" : "rgba(16,185,129,.15)",
                color: g ? "#f59e0b" : "#10b981",
                fontWeight: 700,
                letterSpacing: "0.02em",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              },
              children: g ? "\u{1F648} \u0E0B\u0E48\u0E2D\u0E19" : "\u{1F441}\uFE0F \u0E41\u0E2A\u0E14\u0E07"
            }) : e === h.id && u.jsx("span", {
              style: {
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.85)",
                flexShrink: 0,
                boxShadow: "0 0 8px rgba(255,255,255,0.6)"
              }
            })]
          }, h.id)
        })
      }), u.jsx("div", {
        style: {
          marginTop: "auto",
          padding: "0.75rem",
          fontSize: "10px",
          color: "var(--md-text-tertiary)",
          textAlign: "center",
          borderTop: "1px solid var(--md-border)"
        },
        children: f ? "\u{1F6E0}\uFE0F \u0E42\u0E2B\u0E21\u0E14\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E40\u0E21\u0E19\u0E39 \xB7 \u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E40\u0E21\u0E19\u0E39\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E0B\u0E48\u0E2D\u0E19/\u0E41\u0E2A\u0E14\u0E07 \xB7 \u0E01\u0E14 \u2713 \u0E40\u0E21\u0E37\u0E48\u0E2D\u0E40\u0E2A\u0E23\u0E47\u0E08" : "Esc \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E34\u0E14 \xB7 \u0E04\u0E25\u0E34\u0E01\u0E1E\u0E37\u0E49\u0E19\u0E2B\u0E25\u0E31\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E1B\u0E34\u0E14 \xB7 \u0E01\u0E14 \u2699\uFE0F \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E40\u0E21\u0E19\u0E39"
      })]
    })]
  })
}

function wu({
  activeTab: e
}) {
  const t = yu[e];
  return t ? u.jsx("div", {
    className: "min-h-[600px] mb-10 animate-fade-in",
    style: {
      animationDuration: "0.5s"
    },
    children: u.jsx(p.Suspense, {
      fallback: u.jsx(et, {}),
      children: u.jsx(t, {})
    })
  }) : null
}

function Au() {
  C(() => import("./FinanceTab-DxsMfpH2.js"), F([0, 1, 2, 3])), C(() => import("./OPDTab-B-3Nwmy8.js"), F([4, 1, 2, 3])), C(() => import("./IPDTab-BAtLSwHc.js"), F([5, 1, 2, 3]))
}
const c0 = k.lazy(() => C(() => import("./AIAssistant-ZY2z1QyQ.js"), F([21, 1, 2]))),
  d0 = k.lazy(() => C(() => import("./ExecutiveCommandCenter-CLfzUk5Q.js"), F([22, 1, 2]))),
  ju = k.lazy(() => C(() => import("./ServerSettings-DUKaDoqN.js"), F([23, 1]))),
  Su = /Failed to fetch dynamically imported module|Loading chunk|ChunkLoadError|Loading CSS chunk|Importing a module script failed/i,
  ke = "bch-chunk-reloaded";

function tt(e) {
  return e && typeof e.message == "string" && Su.test(e.message)
}
class ku extends k.Component {
  constructor(t) {
    super(t), this.state = {
      hasError: !1,
      error: null,
      isChunkError: !1,
      reloading: !1
    }
  }
  static getDerivedStateFromError(t) {
    return {
      hasError: !0,
      error: t,
      isChunkError: tt(t)
    }
  }
  componentDidCatch(t, s) {
    if (tt(t)) try {
      sessionStorage.getItem(ke) || (sessionStorage.setItem(ke, Date.now().toString()), this.setState({
        reloading: !0
      }), setTimeout(() => window.location.reload(), 600))
    } catch {} else try {
      sessionStorage.removeItem(ke)
    } catch {}
  }
  render() {
    if (this.state.hasError) {
      const {
        isChunkError: t,
        reloading: s
      } = this.state;
      return u.jsxs("div", {
        className: "glass-card",
        style: {
          padding: "3rem",
          textAlign: "center",
          margin: "2rem 0"
        },
        children: [u.jsx("div", {
          style: {
            fontSize: "48px",
            marginBottom: "1rem"
          },
          children: t ? s ? "\u{1F504}" : "\u{1F195}" : "\u26A0\uFE0F"
        }), u.jsx("h3", {
          style: {
            fontSize: "var(--fs-xl)",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            marginBottom: "0.5rem"
          },
          children: t ? s ? "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E0A\u0E31\u0E19\u0E43\u0E2B\u0E21\u0E48..." : "\u0E23\u0E30\u0E1A\u0E1A\u0E21\u0E35\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E0A\u0E31\u0E19\u0E43\u0E2B\u0E21\u0E48" : `\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E43\u0E19\u0E01\u0E32\u0E23\u0E41\u0E2A\u0E14\u0E07\u0E1C\u0E25${this.props.tabName?` \u2014 ${this.props.tabName}`:""}`
        }), u.jsx("p", {
          style: {
            fontSize: "var(--fs-sm)",
            color: "var(--md-text-secondary)",
            marginBottom: "0.5rem"
          },
          children: t ? "\u0E23\u0E30\u0E1A\u0E1A\u0E16\u0E39\u0E01\u0E2D\u0E31\u0E1B\u0E40\u0E14\u0E15\u0E43\u0E2B\u0E21\u0E48 \u2014 \u0E15\u0E49\u0E2D\u0E07\u0E23\u0E35\u0E42\u0E2B\u0E25\u0E14\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E36\u0E07\u0E42\u0E04\u0E49\u0E14\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E0A\u0E31\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14" : this.state.error?.message || "Unknown error"
        }), u.jsxs("p", {
          style: {
            fontSize: "10px",
            color: "var(--md-text-tertiary)",
            marginBottom: "1.5rem",
            fontFamily: "'JetBrains Mono', monospace"
          },
          children: ["\u{1F4A1} ", t ? "\u0E2B\u0E19\u0E49\u0E32\u0E08\u0E30\u0E23\u0E35\u0E42\u0E2B\u0E25\u0E14\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34\u0E43\u0E19 1 \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35 (\u0E2B\u0E23\u0E37\u0E2D\u0E01\u0E14\u0E1B\u0E38\u0E48\u0E21\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07)" : "\u0E25\u0E2D\u0E07\u0E01\u0E14\u0E1B\u0E38\u0E48\u0E21\u0E14\u0E49\u0E32\u0E19\u0E25\u0E48\u0E32\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E35\u0E40\u0E0B\u0E47\u0E15 \u0E2B\u0E23\u0E37\u0E2D\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19 Tab \u0E41\u0E25\u0E49\u0E27\u0E01\u0E25\u0E31\u0E1A\u0E21\u0E32\u0E43\u0E2B\u0E21\u0E48"]
        }), u.jsx("button", {
          onClick: () => {
            if (t) {
              try {
                sessionStorage.removeItem(ke)
              } catch {}
              window.location.reload()
            } else this.setState({
              hasError: !1,
              error: null,
              isChunkError: !1
            })
          },
          style: {
            background: t ? "#0284c7" : "var(--md-primary)",
            color: "#fff",
            padding: "0.625rem 2rem",
            borderRadius: "0.75rem",
            fontWeight: 700,
            fontSize: "var(--fs-sm)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(15,118,110,.3)"
          },
          children: t ? "\u{1F504} \u0E23\u0E35\u0E42\u0E2B\u0E25\u0E14\u0E40\u0E27\u0E2D\u0E23\u0E4C\u0E0A\u0E31\u0E19\u0E43\u0E2B\u0E21\u0E48" : "\u{1F504} \u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E2D\u0E35\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07"
        })]
      })
    }
    return this.props.children
  }
}

function Du() {
  const {
    isAuthenticated: e,
    loading: t,
    tokens: s,
    refreshAccessToken: r
  } = qe(), a = Bt(w => ({
    activeTab: w.activeTab,
    dashboardSummary: w.dashboardSummary,
    user: w.user
  })), {
    setTab: i,
    fetchData: o
  } = Ye(), {
    activeTab: E,
    dashboardSummary: d
  } = a, [A, f] = p.useState(null), [D, S] = p.useState(!1), [l, c] = p.useState(!1), [m, y] = p.useState(!1), {
    clinicalInsights: v
  } = Rt(!0), [x, h] = p.useState(() => typeof window < "u" ? localStorage.getItem("bch-dark-mode") === "true" : !1), g = p.useCallback((w, R) => Le(s, r)(w, R), [s?.accessToken, r]), B = p.useRef(!1);
  p.useEffect(() => {
    if (!e) return;
    let w = null,
      R = !1;
    async function de() {
      try {
        const ae = await g("/api/system/build-info", {
          cache: "no-store"
        });
        if (!ae.ok || R) return;
        const Y = (await ae.json())?.buildId;
        if (!Y || Y === "unknown") return;
        if (w == null) {
          w = Y;
          return
        }
        if (Y !== w) {
          try {
            sessionStorage.removeItem("bch-chunk-reloaded")
          } catch {}
          window.location.reload()
        }
      } catch {}
    }
    de();
    const he = setInterval(de, 9e4);
    return () => {
      R = !0, clearInterval(he)
    }
  }, [e, g]);
  const _ = p.useCallback(() => {
    o("dashboardSummary", "/api/dashboard/summary"), g("/api/system/status").then(w => w.ok ? w.json() : null).then(w => w && f(w)).catch(() => {})
  }, [o, g]);
  if (Wt(), p.useEffect(() => {
      const w = setTimeout(() => y(!0), 4e3);
      return () => clearTimeout(w)
    }, []), p.useEffect(() => {
      const w = document.documentElement;
      x ? w.classList.add("dark") : w.classList.remove("dark"), localStorage.setItem("bch-dark-mode", x)
    }, [x]), p.useEffect(() => {
      if (!e) return;
      _();
      const w = setInterval(_, 12e4),
        R = setTimeout(Au, 100);
      return () => {
        clearInterval(w), clearTimeout(R)
      }
    }, [_, e]), p.useEffect(() => {
      if (B.current) return;
      const w = a.user?.role;
      if (!w) return;
      const R = {
        admin: "overview",
        director: "overview",
        finance: "overview",
        clinical: "overview",
        nursing: "overview"
      } [w] || "overview";
      R !== E && i(R), B.current = !0
    }, [a.user?.role]), p.useEffect(() => {
      const J = Y => {
        const Z = Y?.detail?.tab;
        if (Z && Z !== E) i(Z)
      };
      window.addEventListener("bch360:setTab", J);
      return () => window.removeEventListener("bch360:setTab", J)
    }, [i, E]), t) return u.jsx(et, {});
  if (!e) return u.jsx(qt, {});
  const T = d,
    G = A?.mysql_connected;
  return u.jsxs("div", {
    className: "min-h-screen",
    style: {
      background: "var(--md-bg)"
    },
    children: [u.jsx(Vt, {
      darkMode: x,
      isLive: G,
      user: a.user,
      onDarkModeToggle: () => h(w => !w),
      onServerSettings: () => c(!0),
      onForceRefresh: _
    }), u.jsxs("main", {
      className: "max-w-[1700px] xl:max-w-[2100px] 2xl:max-w-[2800px] mx-auto px-4 sm:px-5 py-4",
      children: [u.jsx(Qt, {}), u.jsx("div", {
        className: "hidden lg:block mb-5",
        children: u.jsx(p.Suspense, {
          fallback: u.jsxs("div", {
            className: "rounded-2xl p-8 animate-pulse",
            style: {
              background: "var(--md-surface)",
              border: "1px solid var(--md-border)"
            },
            children: [u.jsx("div", {
              className: "grid grid-cols-4 gap-4 mb-4",
              children: [1, 2, 3, 4].map(w => u.jsx("div", {
                className: "h-28 rounded-xl",
                style: {
                  background: "var(--md-border)"
                }
              }, w))
            }), u.jsx("div", {
              className: "grid grid-cols-4 gap-3",
              children: [1, 2, 3, 4, 5, 6, 7, 8].map(w => u.jsx("div", {
                className: "h-16 rounded-lg",
                style: {
                  background: "var(--md-border)"
                }
              }, w))
            })]
          }),
          children: null
        })
      }), u.jsxs("div", {
        className: "grid grid-cols-2 lg:hidden gap-2 mb-3",
        children: [u.jsx(We, {
          title: "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E23\u0E27\u0E21",
          value: T?.finance?.total_revenue,
          format: "currency",
          icon: "\u{1F4B0}",
          color: "blue",
          trend: T?.finance?.trend_revenue,
          trendLabel: "vs \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E01\u0E48\u0E2D\u0E19",
          loading: !T && !m,
          drillDownId: "finance_revenue",
          drillDownEndpoint: "/api/finance/drilldown?type=revenue",
          aiInsight: T?.finance?.trend_revenue > 5 ? `Strong growth at ${T?.finance?.trend_revenue}% - excellent momentum` : null
        }), u.jsx(We, {
          title: "\u0E2D\u0E31\u0E15\u0E23\u0E32\u0E04\u0E23\u0E2D\u0E07\u0E40\u0E15\u0E35\u0E22\u0E07",
          value: T?.beds?.occupancy_rate,
          format: "percent",
          icon: "\u{1F6CF}\uFE0F",
          color: "green",
          loading: !T && !m,
          drillDownId: "ipd_beds",
          drillDownEndpoint: "/api/ipd/drilldown?type=beds",
          aiInsight: T?.beds?.occupancy_rate > 85 ? `High bed occupancy at ${T?.beds?.occupancy_rate}% - plan for expansion` : "Adequate bed availability"
        })]
      }), u.jsx(vu, {
        activeTab: E,
        onTabChange: i,
        userRole: a.user?.role
      }), u.jsx(ku, {
        tabName: Ze.find(w => w.id === E)?.label || E,
        children: u.jsx(wu, {
          activeTab: E
        })
      }, E), u.jsx(p.Suspense, {
        fallback: null,
        children: null
      }), u.jsx(Tt, {})]
    }), u.jsx(Jt, {
      systemStatus: A,
      onShowTeam: () => S(!0)
    }), u.jsx(Gt, {
      isOpen: D,
      onClose: () => S(!1)
    }), u.jsx(p.Suspense, {
      fallback: null,
      children: u.jsx(ju, {
        open: l,
        onClose: () => c(!1)
      })
    })]
  })
}
const ut = p.createContext(null);

function Fu({
  children: e
}) {
  const [t, s] = p.useState({}), r = p.useCallback((o, E) => {
    !o || !E || s(d => ({
      ...d,
      [o]: {
        ...E,
        updatedAt: Date.now()
      }
    }))
  }, []), a = p.useCallback(o => {
    s(E => {
      if (!E[o]) return E;
      const d = {
        ...E
      };
      return delete d[o], d
    })
  }, []), i = p.useMemo(() => ({
    registry: t,
    publishBrief: r,
    clearBrief: a
  }), [t, r, a]);
  return u.jsx(ut.Provider, {
    value: i,
    children: e
  })
}

function Cu(e) {
  return p.useContext(ut)?.registry?.[e] || null
}
var De = class {
    constructor() {
      this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
    }
    subscribe(e) {
      return this.listeners.add(e), this.onSubscribe(), () => {
        this.listeners.delete(e), this.onUnsubscribe()
      }
    }
    hasListeners() {
      return this.listeners.size > 0
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  ne, Z, pe, st, Bu = (st = class extends De {
    constructor() {
      super(), j(this, ne), j(this, Z), j(this, pe), b(this, pe, e => {
        if (typeof window < "u" && window.addEventListener) {
          const t = () => e();
          return window.addEventListener("visibilitychange", t, !1), () => {
            window.removeEventListener("visibilitychange", t)
          }
        }
      })
    }
    onSubscribe() {
      n(this, Z) || this.setEventListener(n(this, pe))
    }
    onUnsubscribe() {
      var e;
      this.hasListeners() || ((e = n(this, Z)) == null || e.call(this), b(this, Z, void 0))
    }
    setEventListener(e) {
      var t;
      b(this, pe, e), (t = n(this, Z)) == null || t.call(this), b(this, Z, e(s => {
        typeof s == "boolean" ? this.setFocused(s) : this.onFocus()
      }))
    }
    setFocused(e) {
      n(this, ne) !== e && (b(this, ne, e), this.onFocus())
    }
    onFocus() {
      const e = this.isFocused();
      this.listeners.forEach(t => {
        t(e)
      })
    }
    isFocused() {
      return typeof n(this, ne) == "boolean" ? n(this, ne) : globalThis.document?.visibilityState !== "hidden"
    }
  }, ne = new WeakMap, Z = new WeakMap, pe = new WeakMap, st),
  rt = new Bu,
  Nu = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: e => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: e => clearInterval(e)
  },
  ee, at, nt, Tu = (nt = class {
    constructor() {
      j(this, ee, Nu), j(this, at, !1)
    }
    setTimeoutProvider(e) {
      b(this, ee, e)
    }
    setTimeout(e, t) {
      return n(this, ee).setTimeout(e, t)
    }
    clearTimeout(e) {
      n(this, ee).clearTimeout(e)
    }
    setInterval(e, t) {
      return n(this, ee).setInterval(e, t)
    }
    clearInterval(e) {
      n(this, ee).clearInterval(e)
    }
  }, ee = new WeakMap, at = new WeakMap, nt),
  _e = new Tu;

function Pu(e) {
  setTimeout(e, 0)
}
var Iu = typeof window > "u" || "Deno" in globalThis;

function L() {}

function Mu(e, t) {
  return typeof e == "function" ? e(t) : e
}

function Ou(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0
}

function Ru(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0)
}

function He(e, t) {
  return typeof e == "function" ? e(t) : e
}

function qu(e, t) {
  return typeof e == "function" ? e(t) : e
}

function it(e, t) {
  const {
    type: s = "all",
    exact: r,
    fetchStatus: a,
    predicate: i,
    queryKey: o,
    stale: E
  } = e;
  if (o) {
    if (r) {
      if (t.queryHash !== Qe(o, t.options)) return !1
    } else if (!fe(t.queryKey, o)) return !1
  }
  if (s !== "all") {
    const d = t.isActive();
    if (s === "active" && !d || s === "inactive" && d) return !1
  }
  return !(typeof E == "boolean" && t.isStale() !== E || a && a !== t.state.fetchStatus || i && !i(t))
}

function ot(e, t) {
  const {
    exact: s,
    status: r,
    predicate: a,
    mutationKey: i
  } = e;
  if (i) {
    if (!t.options.mutationKey) return !1;
    if (s) {
      if (me(t.options.mutationKey) !== me(i)) return !1
    } else if (!fe(t.options.mutationKey, i)) return !1
  }
  return !(r && t.state.status !== r || a && !a(t))
}

function Qe(e, t) {
  return (t?.queryKeyHashFn || me)(e)
}

function me(e) {
  return JSON.stringify(e, (t, s) => Ke(s) ? Object.keys(s).sort().reduce((r, a) => (r[a] = s[a], r), {}) : s)
}

function fe(e, t) {
  return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every(s => fe(e[s], t[s])) : !1
}
var Lu = Object.prototype.hasOwnProperty;

function Et(e, t, s = 0) {
  if (e === t) return e;
  if (s > 500) return t;
  const r = lt(e) && lt(t);
  if (!r && !(Ke(e) && Ke(t))) return t;
  const a = (r ? e : Object.keys(e)).length,
    i = r ? t : Object.keys(t),
    o = i.length,
    E = r ? new Array(o) : {};
  let d = 0;
  for (let A = 0; A < o; A++) {
    const f = r ? A : i[A],
      D = e[f],
      S = t[f];
    if (D === S) {
      E[f] = D, (r ? A < a : Lu.call(e, f)) && d++;
      continue
    }
    if (D === null || S === null || typeof D != "object" || typeof S != "object") {
      E[f] = S;
      continue
    }
    const l = Et(D, S, s + 1);
    E[f] = l, l === D && d++
  }
  return a === o && d === a ? e : E
}

function lt(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length
}

function Ke(e) {
  if (!ct(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const s = t.prototype;
  return !(!ct(s) || !s.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype)
}

function ct(e) {
  return Object.prototype.toString.call(e) === "[object Object]"
}

function Wu(e) {
  return new Promise(t => {
    _e.setTimeout(t, e)
  })
}

function zu(e, t, s) {
  return typeof s.structuralSharing == "function" ? s.structuralSharing(e, t) : s.structuralSharing !== !1 ? Et(e, t) : t
}

function _u(e, t, s = 0) {
  const r = [...e, t];
  return s && r.length > s ? r.slice(1) : r
}

function Hu(e, t, s = 0) {
  const r = [t, ...e];
  return s && r.length > s ? r.slice(0, -1) : r
}
var Ue = Symbol();

function dt(e, t) {
  return !e.queryFn && t?.initialPromise ? () => t.initialPromise : !e.queryFn || e.queryFn === Ue ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn
}

function Qu(e, t, s) {
  let r = !1,
    a;
  return Object.defineProperty(e, "signal", {
    enumerable: !0,
    get: () => (a ?? (a = t()), r || (r = !0, a.aborted ? s() : a.addEventListener("abort", s, {
      once: !0
    })), a)
  }), e
}
var ht = (() => {
  let e = () => Iu;
  return {
    isServer() {
      return e()
    },
    setIsServer(t) {
      e = t
    }
  }
})();

function Ku() {
  let e, t;
  const s = new Promise((a, i) => {
    e = a, t = i
  });
  s.status = "pending", s.catch(() => {});

  function r(a) {
    Object.assign(s, a), delete s.resolve, delete s.reject
  }
  return s.resolve = a => {
    r({
      status: "fulfilled",
      value: a
    }), e(a)
  }, s.reject = a => {
    r({
      status: "rejected",
      reason: a
    }), t(a)
  }, s
}
var Uu = Pu;

function $u() {
  let e = [],
    t = 0,
    s = E => {
      E()
    },
    r = E => {
      E()
    },
    a = Uu;
  const i = E => {
      t ? e.push(E) : a(() => {
        s(E)
      })
    },
    o = () => {
      const E = e;
      e = [], E.length && a(() => {
        r(() => {
          E.forEach(d => {
            s(d)
          })
        })
      })
    };
  return {
    batch: E => {
      let d;
      t++;
      try {
        d = E()
      } finally {
        t--, t || o()
      }
      return d
    },
    batchCalls: E => (...d) => {
      i(() => {
        E(...d)
      })
    },
    schedule: i,
    setNotifyFunction: E => {
      s = E
    },
    setBatchNotifyFunction: E => {
      r = E
    },
    setScheduler: E => {
      a = E
    }
  }
}
var M = $u(),
  xe, te, be, pt, Gu = (pt = class extends De {
    constructor() {
      super(), j(this, xe, !0), j(this, te), j(this, be), b(this, be, e => {
        if (typeof window < "u" && window.addEventListener) {
          const t = () => e(!0),
            s = () => e(!1);
          return window.addEventListener("online", t, !1), window.addEventListener("offline", s, !1), () => {
            window.removeEventListener("online", t), window.removeEventListener("offline", s)
          }
        }
      })
    }
    onSubscribe() {
      n(this, te) || this.setEventListener(n(this, be))
    }
    onUnsubscribe() {
      var e;
      this.hasListeners() || ((e = n(this, te)) == null || e.call(this), b(this, te, void 0))
    }
    setEventListener(e) {
      var t;
      b(this, be, e), (t = n(this, te)) == null || t.call(this), b(this, te, e(this.setOnline.bind(this)))
    }
    setOnline(e) {
      n(this, xe) !== e && (b(this, xe, e), this.listeners.forEach(t => {
        t(e)
      }))
    }
    isOnline() {
      return n(this, xe)
    }
  }, xe = new WeakMap, te = new WeakMap, be = new WeakMap, pt),
  Fe = new Gu;

function Yu(e) {
  return Math.min(1e3 * 2 ** e, 3e4)
}

function mt(e) {
  return (e ?? "online") === "online" ? Fe.isOnline() : !0
}
var $e = class extends Error {
  constructor(e) {
    super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent
  }
};

function ft(e) {
  let t = !1,
    s = 0,
    r;
  const a = Ku(),
    i = () => a.status !== "pending",
    o = m => {
      if (!i()) {
        const y = new $e(m);
        S(y), e.onCancel?.(y)
      }
    },
    E = () => {
      t = !0
    },
    d = () => {
      t = !1
    },
    A = () => rt.isFocused() && (e.networkMode === "always" || Fe.isOnline()) && e.canRun(),
    f = () => mt(e.networkMode) && e.canRun(),
    D = m => {
      i() || (r?.(), a.resolve(m))
    },
    S = m => {
      i() || (r?.(), a.reject(m))
    },
    l = () => new Promise(m => {
      r = y => {
        (i() || A()) && m(y)
      }, e.onPause?.()
    }).then(() => {
      r = void 0, i() || e.onContinue?.()
    }),
    c = () => {
      if (i()) return;
      let m;
      const y = s === 0 ? e.initialPromise : void 0;
      try {
        m = y ?? e.fn()
      } catch (v) {
        m = Promise.reject(v)
      }
      Promise.resolve(m).then(D).catch(v => {
        if (i()) return;
        const x = e.retry ?? (ht.isServer() ? 0 : 3),
          h = e.retryDelay ?? Yu,
          g = typeof h == "function" ? h(s, v) : h,
          B = x === !0 || typeof x == "number" && s < x || typeof x == "function" && x(s, v);
        if (t || !B) {
          S(v);
          return
        }
        s++, e.onFail?.(s, v), Wu(g).then(() => A() ? void 0 : l()).then(() => {
          t ? S(v) : c()
        })
      })
    };
  return {
    promise: a,
    status: () => a.status,
    cancel: o,
    continue: () => (r?.(), a),
    cancelRetry: E,
    continueRetry: d,
    canStart: f,
    start: () => (f() ? c() : l().then(c), a)
  }
}
var ie, xt, bt = (xt = class {
    constructor() {
      j(this, ie)
    }
    destroy() {
      this.clearGcTimeout()
    }
    scheduleGc() {
      this.clearGcTimeout(), Ou(this.gcTime) && b(this, ie, _e.setTimeout(() => {
        this.optionalRemove()
      }, this.gcTime))
    }
    updateGcTime(e) {
      this.gcTime = Math.max(this.gcTime || 0, e ?? (ht.isServer() ? 1 / 0 : 5 * 60 * 1e3))
    }
    clearGcTimeout() {
      n(this, ie) && (_e.clearTimeout(n(this, ie)), b(this, ie, void 0))
    }
  }, ie = new WeakMap, xt),
  oe, ge, W, Ee, P, Ce, le, z, gt, Q, yt, Vu = (yt = class extends bt {
    constructor(e) {
      super(), j(this, z), j(this, oe), j(this, ge), j(this, W), j(this, Ee), j(this, P), j(this, Ce), j(this, le), b(this, le, !1), b(this, Ce, e.defaultOptions), this.setOptions(e.options), this.observers = [], b(this, Ee, e.client), b(this, W, n(this, Ee).getQueryCache()), this.queryKey = e.queryKey, this.queryHash = e.queryHash, b(this, oe, wt(this.options)), this.state = e.state ?? n(this, oe), this.scheduleGc()
    }
    get meta() {
      return this.options.meta
    }
    get promise() {
      return n(this, P)?.promise
    }
    setOptions(e) {
      if (this.options = {
          ...n(this, Ce),
          ...e
        }, this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
        const t = wt(this.options);
        t.data !== void 0 && (this.setState(vt(t.data, t.dataUpdatedAt)), b(this, oe, t))
      }
    }
    optionalRemove() {
      !this.observers.length && this.state.fetchStatus === "idle" && n(this, W).remove(this)
    }
    setData(e, t) {
      const s = zu(this.state.data, e, this.options);
      return I(this, z, Q).call(this, {
        data: s,
        type: "success",
        dataUpdatedAt: t?.updatedAt,
        manual: t?.manual
      }), s
    }
    setState(e, t) {
      I(this, z, Q).call(this, {
        type: "setState",
        state: e,
        setStateOptions: t
      })
    }
    cancel(e) {
      const t = n(this, P)?.promise;
      return n(this, P)?.cancel(e), t ? t.then(L).catch(L) : Promise.resolve()
    }
    destroy() {
      super.destroy(), this.cancel({
        silent: !0
      })
    }
    get resetState() {
      return n(this, oe)
    }
    reset() {
      this.destroy(), this.setState(this.resetState)
    }
    isActive() {
      return this.observers.some(e => qu(e.options.enabled, this) !== !1)
    }
    isDisabled() {
      return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Ue || !this.isFetched()
    }
    isFetched() {
      return this.state.dataUpdateCount + this.state.errorUpdateCount > 0
    }
    isStatic() {
      return this.getObserversCount() > 0 ? this.observers.some(e => He(e.options.staleTime, this) === "static") : !1
    }
    isStale() {
      return this.getObserversCount() > 0 ? this.observers.some(e => e.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated
    }
    isStaleByTime(e = 0) {
      return this.state.data === void 0 ? !0 : e === "static" ? !1 : this.state.isInvalidated ? !0 : !Ru(this.state.dataUpdatedAt, e)
    }
    onFocus() {
      this.observers.find(e => e.shouldFetchOnWindowFocus())?.refetch({
        cancelRefetch: !1
      }), n(this, P)?.continue()
    }
    onOnline() {
      this.observers.find(e => e.shouldFetchOnReconnect())?.refetch({
        cancelRefetch: !1
      }), n(this, P)?.continue()
    }
    addObserver(e) {
      this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), n(this, W).notify({
        type: "observerAdded",
        query: this,
        observer: e
      }))
    }
    removeObserver(e) {
      this.observers.includes(e) && (this.observers = this.observers.filter(t => t !== e), this.observers.length || (n(this, P) && (n(this, le) || I(this, z, gt).call(this) ? n(this, P).cancel({
        revert: !0
      }) : n(this, P).cancelRetry()), this.scheduleGc()), n(this, W).notify({
        type: "observerRemoved",
        query: this,
        observer: e
      }))
    }
    getObserversCount() {
      return this.observers.length
    }
    invalidate() {
      this.state.isInvalidated || I(this, z, Q).call(this, {
        type: "invalidate"
      })
    }
    async fetch(e, t) {
      if (this.state.fetchStatus !== "idle" && n(this, P)?.status() !== "rejected") {
        if (this.state.data !== void 0 && t?.cancelRefetch) this.cancel({
          silent: !0
        });
        else if (n(this, P)) return n(this, P).continueRetry(), n(this, P).promise
      }
      if (e && this.setOptions(e), !this.options.queryFn) {
        const o = this.observers.find(E => E.options.queryFn);
        o && this.setOptions(o.options)
      }
      const s = new AbortController,
        r = o => {
          Object.defineProperty(o, "signal", {
            enumerable: !0,
            get: () => (b(this, le, !0), s.signal)
          })
        },
        a = () => {
          const o = dt(this.options, t),
            E = (() => {
              const d = {
                client: n(this, Ee),
                queryKey: this.queryKey,
                meta: this.meta
              };
              return r(d), d
            })();
          return b(this, le, !1), this.options.persister ? this.options.persister(o, E, this) : o(E)
        },
        i = (() => {
          const o = {
            fetchOptions: t,
            options: this.options,
            queryKey: this.queryKey,
            client: n(this, Ee),
            state: this.state,
            fetchFn: a
          };
          return r(o), o
        })();
      this.options.behavior?.onFetch(i, this), b(this, ge, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== i.fetchOptions?.meta) && I(this, z, Q).call(this, {
        type: "fetch",
        meta: i.fetchOptions?.meta
      }), b(this, P, ft({
        initialPromise: t?.initialPromise,
        fn: i.fetchFn,
        onCancel: o => {
          o instanceof $e && o.revert && this.setState({
            ...n(this, ge),
            fetchStatus: "idle"
          }), s.abort()
        },
        onFail: (o, E) => {
          I(this, z, Q).call(this, {
            type: "failed",
            failureCount: o,
            error: E
          })
        },
        onPause: () => {
          I(this, z, Q).call(this, {
            type: "pause"
          })
        },
        onContinue: () => {
          I(this, z, Q).call(this, {
            type: "continue"
          })
        },
        retry: i.options.retry,
        retryDelay: i.options.retryDelay,
        networkMode: i.options.networkMode,
        canRun: () => !0
      }));
      try {
        const o = await n(this, P).start();
        if (o === void 0) throw new Error(`${this.queryHash} data is undefined`);
        return this.setData(o), n(this, W).config.onSuccess?.(o, this), n(this, W).config.onSettled?.(o, this.state.error, this), o
      } catch (o) {
        if (o instanceof $e) {
          if (o.silent) return n(this, P).promise;
          if (o.revert) {
            if (this.state.data === void 0) throw o;
            return this.state.data
          }
        }
        throw I(this, z, Q).call(this, {
          type: "error",
          error: o
        }), n(this, W).config.onError?.(o, this), n(this, W).config.onSettled?.(this.state.data, o, this), o
      } finally {
        this.scheduleGc()
      }
    }
  }, oe = new WeakMap, ge = new WeakMap, W = new WeakMap, Ee = new WeakMap, P = new WeakMap, Ce = new WeakMap, le = new WeakMap, z = new WeakSet, gt = function() {
    return this.state.fetchStatus === "paused" && this.state.status === "pending"
  }, Q = function(e) {
    const t = s => {
      switch (e.type) {
        case "failed":
          return {
            ...s, fetchFailureCount: e.failureCount, fetchFailureReason: e.error
          };
        case "pause":
          return {
            ...s, fetchStatus: "paused"
          };
        case "continue":
          return {
            ...s, fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...s, ...Ju(s.data, this.options), fetchMeta: e.meta ?? null
          };
        case "success":
          const r = {
            ...s,
            ...vt(e.data, e.dataUpdatedAt),
            dataUpdateCount: s.dataUpdateCount + 1,
            ...!e.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          return b(this, ge, e.manual ? r : void 0), r;
        case "error":
          const a = e.error;
          return {
            ...s, error: a, errorUpdateCount: s.errorUpdateCount + 1, errorUpdatedAt: Date.now(), fetchFailureCount: s.fetchFailureCount + 1, fetchFailureReason: a, fetchStatus: "idle", status: "error", isInvalidated: !0
          };
        case "invalidate":
          return {
            ...s, isInvalidated: !0
          };
        case "setState":
          return {
            ...s, ...e.state
          }
      }
    };
    this.state = t(this.state), M.batch(() => {
      this.observers.forEach(s => {
        s.onQueryUpdate()
      }), n(this, W).notify({
        query: this,
        type: "updated",
        action: e
      })
    })
  }, yt);

function Ju(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: mt(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  }
}

function vt(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  }
}

function wt(e) {
  const t = typeof e.initialData == "function" ? e.initialData() : e.initialData,
    s = t !== void 0,
    r = s ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: s ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: s ? "success" : "pending",
    fetchStatus: "idle"
  }
}

function At(e) {
  return {
    onFetch: (t, s) => {
      const r = t.options,
        a = t.fetchOptions?.meta?.fetchMore?.direction,
        i = t.state.data?.pages || [],
        o = t.state.data?.pageParams || [];
      let E = {
          pages: [],
          pageParams: []
        },
        d = 0;
      const A = async () => {
        let f = !1;
        const D = c => {
            Qu(c, () => t.signal, () => f = !0)
          },
          S = dt(t.options, t.fetchOptions),
          l = async (c, m, y) => {
            if (f) return Promise.reject();
            if (m == null && c.pages.length) return Promise.resolve(c);
            const v = (() => {
                const B = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: m,
                  direction: y ? "backward" : "forward",
                  meta: t.options.meta
                };
                return D(B), B
              })(),
              x = await S(v),
              {
                maxPages: h
              } = t.options,
              g = y ? Hu : _u;
            return {
              pages: g(c.pages, x, h),
              pageParams: g(c.pageParams, m, h)
            }
          };
        if (a && i.length) {
          const c = a === "backward",
            m = c ? Xu : jt,
            y = {
              pages: i,
              pageParams: o
            },
            v = m(r, y);
          E = await l(y, v, c)
        } else {
          const c = e ?? i.length;
          do {
            const m = d === 0 ? o[0] ?? r.initialPageParam : jt(r, E);
            if (d > 0 && m == null) break;
            E = await l(E, m), d++
          } while (d < c)
        }
        return E
      };
      t.options.persister ? t.fetchFn = () => t.options.persister?.(A, {
        client: t.client,
        queryKey: t.queryKey,
        meta: t.options.meta,
        signal: t.signal
      }, s) : t.fetchFn = A
    }
  }
}

function jt(e, {
  pages: t,
  pageParams: s
}) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, s[r], s) : void 0
}

function Xu(e, {
  pages: t,
  pageParams: s
}) {
  return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, s[0], s) : void 0
}
var Be, K, O, ce, U, J, St, Zu = (St = class extends bt {
  constructor(e) {
    super(), j(this, U), j(this, Be), j(this, K), j(this, O), j(this, ce), b(this, Be, e.client), this.mutationId = e.mutationId, b(this, O, e.mutationCache), b(this, K, []), this.state = e.state || e0(), this.setOptions(e.options), this.scheduleGc()
  }
  setOptions(e) {
    this.options = e, this.updateGcTime(this.options.gcTime)
  }
  get meta() {
    return this.options.meta
  }
  addObserver(e) {
    n(this, K).includes(e) || (n(this, K).push(e), this.clearGcTimeout(), n(this, O).notify({
      type: "observerAdded",
      mutation: this,
      observer: e
    }))
  }
  removeObserver(e) {
    b(this, K, n(this, K).filter(t => t !== e)), this.scheduleGc(), n(this, O).notify({
      type: "observerRemoved",
      mutation: this,
      observer: e
    })
  }
  optionalRemove() {
    n(this, K).length || (this.state.status === "pending" ? this.scheduleGc() : n(this, O).remove(this))
  }
  continue () {
    return n(this, ce)?.continue() ?? this.execute(this.state.variables)
  }
  async execute(e) {
    const t = () => {
        I(this, U, J).call(this, {
          type: "continue"
        })
      },
      s = {
        client: n(this, Be),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
    b(this, ce, ft({
      fn: () => this.options.mutationFn ? this.options.mutationFn(e, s) : Promise.reject(new Error("No mutationFn found")),
      onFail: (i, o) => {
        I(this, U, J).call(this, {
          type: "failed",
          failureCount: i,
          error: o
        })
      },
      onPause: () => {
        I(this, U, J).call(this, {
          type: "pause"
        })
      },
      onContinue: t,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => n(this, O).canRun(this)
    }));
    const r = this.state.status === "pending",
      a = !n(this, ce).canStart();
    try {
      if (r) t();
      else {
        I(this, U, J).call(this, {
          type: "pending",
          variables: e,
          isPaused: a
        }), n(this, O).config.onMutate && await n(this, O).config.onMutate(e, this, s);
        const o = await this.options.onMutate?.(e, s);
        o !== this.state.context && I(this, U, J).call(this, {
          type: "pending",
          context: o,
          variables: e,
          isPaused: a
        })
      }
      const i = await n(this, ce).start();
      return await n(this, O).config.onSuccess?.(i, e, this.state.context, this, s), await this.options.onSuccess?.(i, e, this.state.context, s), await n(this, O).config.onSettled?.(i, null, this.state.variables, this.state.context, this, s), await this.options.onSettled?.(i, null, e, this.state.context, s), I(this, U, J).call(this, {
        type: "success",
        data: i
      }), i
    } catch (i) {
      try {
        await n(this, O).config.onError?.(i, e, this.state.context, this, s)
      } catch (o) {
        Promise.reject(o)
      }
      try {
        await this.options.onError?.(i, e, this.state.context, s)
      } catch (o) {
        Promise.reject(o)
      }
      try {
        await n(this, O).config.onSettled?.(void 0, i, this.state.variables, this.state.context, this, s)
      } catch (o) {
        Promise.reject(o)
      }
      try {
        await this.options.onSettled?.(void 0, i, e, this.state.context, s)
      } catch (o) {
        Promise.reject(o)
      }
      throw I(this, U, J).call(this, {
        type: "error",
        error: i
      }), i
    } finally {
      n(this, O).runNext(this)
    }
  }
}, Be = new WeakMap, K = new WeakMap, O = new WeakMap, ce = new WeakMap, U = new WeakSet, J = function(e) {
  const t = s => {
    switch (e.type) {
      case "failed":
        return {
          ...s, failureCount: e.failureCount, failureReason: e.error
        };
      case "pause":
        return {
          ...s, isPaused: !0
        };
      case "continue":
        return {
          ...s, isPaused: !1
        };
      case "pending":
        return {
          ...s, context: e.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: e.isPaused, status: "pending", variables: e.variables, submittedAt: Date.now()
        };
      case "success":
        return {
          ...s, data: e.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: !1
        };
      case "error":
        return {
          ...s, data: void 0, error: e.error, failureCount: s.failureCount + 1, failureReason: e.error, isPaused: !1, status: "error"
        }
    }
  };
  this.state = t(this.state), M.batch(() => {
    n(this, K).forEach(s => {
      s.onMutationUpdate(e)
    }), n(this, O).notify({
      mutation: this,
      type: "updated",
      action: e
    })
  })
}, St);

function e0() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  }
}
var X, H, Ne, kt, t0 = (kt = class extends De {
  constructor(e = {}) {
    super(), j(this, X), j(this, H), j(this, Ne), this.config = e, b(this, X, new Set), b(this, H, new Map), b(this, Ne, 0)
  }
  build(e, t, s) {
    const r = new Zu({
      client: e,
      mutationCache: this,
      mutationId: ++Re(this, Ne)._,
      options: e.defaultMutationOptions(t),
      state: s
    });
    return this.add(r), r
  }
  add(e) {
    n(this, X).add(e);
    const t = Te(e);
    if (typeof t == "string") {
      const s = n(this, H).get(t);
      s ? s.push(e) : n(this, H).set(t, [e])
    }
    this.notify({
      type: "added",
      mutation: e
    })
  }
  remove(e) {
    if (n(this, X).delete(e)) {
      const t = Te(e);
      if (typeof t == "string") {
        const s = n(this, H).get(t);
        if (s)
          if (s.length > 1) {
            const r = s.indexOf(e);
            r !== -1 && s.splice(r, 1)
          } else s[0] === e && n(this, H).delete(t)
      }
    }
    this.notify({
      type: "removed",
      mutation: e
    })
  }
  canRun(e) {
    const t = Te(e);
    if (typeof t == "string") {
      const s = n(this, H).get(t)?.find(r => r.state.status === "pending");
      return !s || s === e
    } else return !0
  }
  runNext(e) {
    const t = Te(e);
    return typeof t == "string" ? n(this, H).get(t)?.find(s => s !== e && s.state.isPaused)?.continue() ?? Promise.resolve() : Promise.resolve()
  }
  clear() {
    M.batch(() => {
      n(this, X).forEach(e => {
        this.notify({
          type: "removed",
          mutation: e
        })
      }), n(this, X).clear(), n(this, H).clear()
    })
  }
  getAll() {
    return Array.from(n(this, X))
  }
  find(e) {
    const t = {
      exact: !0,
      ...e
    };
    return this.getAll().find(s => ot(t, s))
  }
  findAll(e = {}) {
    return this.getAll().filter(t => ot(e, t))
  }
  notify(e) {
    M.batch(() => {
      this.listeners.forEach(t => {
        t(e)
      })
    })
  }
  resumePausedMutations() {
    const e = this.getAll().filter(t => t.state.isPaused);
    return M.batch(() => Promise.all(e.map(t => t.continue().catch(L))))
  }
}, X = new WeakMap, H = new WeakMap, Ne = new WeakMap, kt);

function Te(e) {
  return e.options.scope?.id
}
var $, Dt, u0 = (Dt = class extends De {
    constructor(e = {}) {
      super(), j(this, $), this.config = e, b(this, $, new Map)
    }
    build(e, t, s) {
      const r = t.queryKey,
        a = t.queryHash ?? Qe(r, t);
      let i = this.get(a);
      return i || (i = new Vu({
        client: e,
        queryKey: r,
        queryHash: a,
        options: e.defaultQueryOptions(t),
        state: s,
        defaultOptions: e.getQueryDefaults(r)
      }), this.add(i)), i
    }
    add(e) {
      n(this, $).has(e.queryHash) || (n(this, $).set(e.queryHash, e), this.notify({
        type: "added",
        query: e
      }))
    }
    remove(e) {
      const t = n(this, $).get(e.queryHash);
      t && (e.destroy(), t === e && n(this, $).delete(e.queryHash), this.notify({
        type: "removed",
        query: e
      }))
    }
    clear() {
      M.batch(() => {
        this.getAll().forEach(e => {
          this.remove(e)
        })
      })
    }
    get(e) {
      return n(this, $).get(e)
    }
    getAll() {
      return [...n(this, $).values()]
    }
    find(e) {
      const t = {
        exact: !0,
        ...e
      };
      return this.getAll().find(s => it(t, s))
    }
    findAll(e = {}) {
      const t = this.getAll();
      return Object.keys(e).length > 0 ? t.filter(s => it(e, s)) : t
    }
    notify(e) {
      M.batch(() => {
        this.listeners.forEach(t => {
          t(e)
        })
      })
    }
    onFocus() {
      M.batch(() => {
        this.getAll().forEach(e => {
          e.onFocus()
        })
      })
    }
    onOnline() {
      M.batch(() => {
        this.getAll().forEach(e => {
          e.onOnline()
        })
      })
    }
  }, $ = new WeakMap, Dt),
  N, ue, se, ye, ve, re, we, Ae, Ft, s0 = (Ft = class {
    constructor(e = {}) {
      j(this, N), j(this, ue), j(this, se), j(this, ye), j(this, ve), j(this, re), j(this, we), j(this, Ae), b(this, N, e.queryCache || new u0), b(this, ue, e.mutationCache || new t0), b(this, se, e.defaultOptions || {}), b(this, ye, new Map), b(this, ve, new Map), b(this, re, 0)
    }
    mount() {
      Re(this, re)._++, n(this, re) === 1 && (b(this, we, rt.subscribe(async e => {
        e && (await this.resumePausedMutations(), n(this, N).onFocus())
      })), b(this, Ae, Fe.subscribe(async e => {
        e && (await this.resumePausedMutations(), n(this, N).onOnline())
      })))
    }
    unmount() {
      var e, t;
      Re(this, re)._--, n(this, re) === 0 && ((e = n(this, we)) == null || e.call(this), b(this, we, void 0), (t = n(this, Ae)) == null || t.call(this), b(this, Ae, void 0))
    }
    isFetching(e) {
      return n(this, N).findAll({
        ...e,
        fetchStatus: "fetching"
      }).length
    }
    isMutating(e) {
      return n(this, ue).findAll({
        ...e,
        status: "pending"
      }).length
    }
    getQueryData(e) {
      const t = this.defaultQueryOptions({
        queryKey: e
      });
      return n(this, N).get(t.queryHash)?.state.data
    }
    ensureQueryData(e) {
      const t = this.defaultQueryOptions(e),
        s = n(this, N).build(this, t),
        r = s.state.data;
      return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && s.isStaleByTime(He(t.staleTime, s)) && this.prefetchQuery(t), Promise.resolve(r))
    }
    getQueriesData(e) {
      return n(this, N).findAll(e).map(({
        queryKey: t,
        state: s
      }) => {
        const r = s.data;
        return [t, r]
      })
    }
    setQueryData(e, t, s) {
      const r = this.defaultQueryOptions({
          queryKey: e
        }),
        a = n(this, N).get(r.queryHash)?.state.data,
        i = Mu(t, a);
      if (i !== void 0) return n(this, N).build(this, r).setData(i, {
        ...s,
        manual: !0
      })
    }
    setQueriesData(e, t, s) {
      return M.batch(() => n(this, N).findAll(e).map(({
        queryKey: r
      }) => [r, this.setQueryData(r, t, s)]))
    }
    getQueryState(e) {
      const t = this.defaultQueryOptions({
        queryKey: e
      });
      return n(this, N).get(t.queryHash)?.state
    }
    removeQueries(e) {
      const t = n(this, N);
      M.batch(() => {
        t.findAll(e).forEach(s => {
          t.remove(s)
        })
      })
    }
    resetQueries(e, t) {
      const s = n(this, N);
      return M.batch(() => (s.findAll(e).forEach(r => {
        r.reset()
      }), this.refetchQueries({
        type: "active",
        ...e
      }, t)))
    }
    cancelQueries(e, t = {}) {
      const s = {
          revert: !0,
          ...t
        },
        r = M.batch(() => n(this, N).findAll(e).map(a => a.cancel(s)));
      return Promise.all(r).then(L).catch(L)
    }
    invalidateQueries(e, t = {}) {
      return M.batch(() => (n(this, N).findAll(e).forEach(s => {
        s.invalidate()
      }), e?.refetchType === "none" ? Promise.resolve() : this.refetchQueries({
        ...e,
        type: e?.refetchType ?? e?.type ?? "active"
      }, t)))
    }
    refetchQueries(e, t = {}) {
      const s = {
          ...t,
          cancelRefetch: t.cancelRefetch ?? !0
        },
        r = M.batch(() => n(this, N).findAll(e).filter(a => !a.isDisabled() && !a.isStatic()).map(a => {
          let i = a.fetch(void 0, s);
          return s.throwOnError || (i = i.catch(L)), a.state.fetchStatus === "paused" ? Promise.resolve() : i
        }));
      return Promise.all(r).then(L)
    }
    fetchQuery(e) {
      const t = this.defaultQueryOptions(e);
      t.retry === void 0 && (t.retry = !1);
      const s = n(this, N).build(this, t);
      return s.isStaleByTime(He(t.staleTime, s)) ? s.fetch(t) : Promise.resolve(s.state.data)
    }
    prefetchQuery(e) {
      return this.fetchQuery(e).then(L).catch(L)
    }
    fetchInfiniteQuery(e) {
      return e.behavior = At(e.pages), this.fetchQuery(e)
    }
    prefetchInfiniteQuery(e) {
      return this.fetchInfiniteQuery(e).then(L).catch(L)
    }
    ensureInfiniteQueryData(e) {
      return e.behavior = At(e.pages), this.ensureQueryData(e)
    }
    resumePausedMutations() {
      return Fe.isOnline() ? n(this, ue).resumePausedMutations() : Promise.resolve()
    }
    getQueryCache() {
      return n(this, N)
    }
    getMutationCache() {
      return n(this, ue)
    }
    getDefaultOptions() {
      return n(this, se)
    }
    setDefaultOptions(e) {
      b(this, se, e)
    }
    setQueryDefaults(e, t) {
      n(this, ye).set(me(e), {
        queryKey: e,
        defaultOptions: t
      })
    }
    getQueryDefaults(e) {
      const t = [...n(this, ye).values()],
        s = {};
      return t.forEach(r => {
        fe(e, r.queryKey) && Object.assign(s, r.defaultOptions)
      }), s
    }
    setMutationDefaults(e, t) {
      n(this, ve).set(me(e), {
        mutationKey: e,
        defaultOptions: t
      })
    }
    getMutationDefaults(e) {
      const t = [...n(this, ve).values()],
        s = {};
      return t.forEach(r => {
        fe(e, r.mutationKey) && Object.assign(s, r.defaultOptions)
      }), s
    }
    defaultQueryOptions(e) {
      if (e._defaulted) return e;
      const t = {
        ...n(this, se).queries,
        ...this.getQueryDefaults(e.queryKey),
        ...e,
        _defaulted: !0
      };
      return t.queryHash || (t.queryHash = Qe(t.queryKey, t)), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === Ue && (t.enabled = !1), t
    }
    defaultMutationOptions(e) {
      return e?._defaulted ? e : {
        ...n(this, se).mutations,
        ...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
        ...e,
        _defaulted: !0
      }
    }
    clear() {
      n(this, N).clear(), n(this, ue).clear()
    }
  }, N = new WeakMap, ue = new WeakMap, se = new WeakMap, ye = new WeakMap, ve = new WeakMap, re = new WeakMap, we = new WeakMap, Ae = new WeakMap, Ft),
  r0 = p.createContext(void 0),
  a0 = ({
    client: e,
    children: t
  }) => (p.useEffect(() => (e.mount(), () => {
    e.unmount()
  }), [e]), u.jsx(r0.Provider, {
    value: e,
    children: t
  })),
  n0 = function() {
    return null
  };
const i0 = new s0({
  defaultOptions: {
    queries: {
      staleTime: 3e4,
      gcTime: 5 * 6e4,
      retry: 2,
      retryDelay: e => Math.min(1e3 * 2 ** e, 1e4),
      refetchOnWindowFocus: !1,
      refetchOnMount: !0
    },
    mutations: {
      retry: 0
    }
  }
});

function o0({
  children: e
}) {
  return u.jsxs(a0, {
    client: i0,
    children: [e, u.jsx(n0, {
      initialIsOpen: !1,
      buttonPosition: "bottom-left"
    })]
  })
}
Ct.createRoot(document.getElementById("root")).render(u.jsx(k.StrictMode, {
  children: u.jsx(o0, {
    children: u.jsx(Pt, {
      children: u.jsx(It, {
        children: u.jsx(Fu, {
          children: u.jsx(Du, {})
        })
      })
    })
  })
}));
export {
  We as K, Ot as f, Cu as u
};