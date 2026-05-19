const R = (E, e = R, u = e.f || (e.f = ["assets/index-DK7pcb85.js", "assets/vendor-react-ByYOq5k4.js", "assets/index-De7vMeua.css"])) => E.map(a => u[a]);
import {
  r as $,
  j as t,
  R as F
} from "./vendor-react-ByYOq5k4.js";
const E0 = "modulepreload",
  t0 = function(E) {
    return "/" + E
  },
  O = {},
  P = function(E, e, u) {
    let a = Promise.resolve();
    if (e && e.length > 0) {
      document.getElementsByTagName("link");
      const r = document.querySelector("meta[property=csp-nonce]"),
        o = r?.nonce || r?.getAttribute("nonce");
      a = Promise.allSettled(e.map(n => {
        if (n = t0(n), n in O) return;
        O[n] = !0;
        const l = n.endsWith(".css"),
          s = l ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${n}"]${s}`)) return;
        const d = document.createElement("link");
        if (d.rel = l ? "stylesheet" : E0, l || (d.as = "script"), d.crossOrigin = "", d.href = n, o && d.setAttribute("nonce", o), document.head.appendChild(d), l) return new Promise((x, p) => {
          d.addEventListener("load", x), d.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${n}`)))
        })
      }))
    }

    function i(r) {
      const o = new Event("vite:preloadError", {
        cancelable: !0
      });
      if (o.payload = r, window.dispatchEvent(o), !o.defaultPrevented) throw r
    }
    return a.then(r => {
      for (const o of r || []) o.status === "rejected" && i(o.reason);
      return E().catch(i)
    })
  },
  H = $.createContext(),
  r0 = ({
    children: E
  }) => {
    const [e, u] = $.useState({
      username: "admin",
      role: "admin",
      full_name: "Administrator"
    }), [a, i] = $.useState(!0), [r, o] = $.useState(null), n = $.useCallback(async (x, p) => (u({
      username: "admin",
      role: "admin",
      full_name: "Administrator"
    }), {
      user: {
        username: "admin",
        role: "admin",
        full_name: "Administrator"
      }
    }), [!0]), l = $.useCallback(async () => {
      {
        u(null);
        return
      }
    }, [!0]), s = $.useCallback(async () => {
      try {
        return (await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
          signal: AbortSignal.timeout(1e4)
        })).ok || (await fetch("/api/auth/auto-session", {
          method: "POST",
          credentials: "include",
          signal: AbortSignal.timeout(5e3)
        })).ok ? !0 : null
      } catch {
        return null
      }
    }, [l, !0]);
    $.useEffect(() => {
      {
        fetch("/api/auth/me", {
          credentials: "include",
          signal: AbortSignal.timeout(5e3)
        }).then(x => x.ok ? x.json() : fetch("/api/auth/auto-session", {
          method: "POST",
          credentials: "include",
          signal: AbortSignal.timeout(5e3)
        }).then(p => p.ok ? p.json() : null)).then(x => {
          x?.user && u(x.user)
        }).catch(() => {}).finally(() => i(!1));
        return
      }
    }, [!0]);
    const d = {
      user: e,
      setUser: u,
      tokens: null,
      loading: a,
      error: r,
      login: n,
      logout: l,
      refreshAccessToken: s,
      isAuthenticated: !!e
    };
    return t.jsx(H.Provider, {
      value: d,
      children: E
    })
  },
  N = () => {
    const E = $.useContext(H);
    if (!E) throw new Error("useAuth must be used within AuthProvider");
    return E
  },
  U = E => {
    let e;
    const u = new Set,
      a = (n, l) => {
        const s = typeof n == "function" ? n(e) : n;
        if (!Object.is(s, e)) {
          const d = e;
          e = l ?? (typeof s != "object" || s === null) ? s : Object.assign({}, e, s), u.forEach(x => x(e, d))
        }
      },
      i = () => e,
      r = {
        setState: a,
        getState: i,
        getInitialState: () => o,
        subscribe: n => (u.add(n), () => u.delete(n))
      },
      o = e = E(a, i, r);
    return r
  },
  i0 = E => E ? U(E) : U,
  a0 = E => E;

function G(E, e = a0) {
  const u = F.useSyncExternalStore(E.subscribe, F.useCallback(() => e(E.getState()), [E, e]), F.useCallback(() => e(E.getInitialState()), [E, e]));
  return F.useDebugValue(u), u
}
const V = E => {
    const e = i0(E),
      u = a => G(e, a);
    return Object.assign(u, e), u
  },
  o0 = E => E ? V(E) : V;

function n0(E) {
  const e = typeof E == "string" ? E : I(E);
  let u = 2166136261;
  for (let a = 0; a < e.length; a++) u ^= e.charCodeAt(a), u = u * 16777619 >>> 0;
  return u
}

function I(E, e = 0) {
  if (e > 4) return "\u2026";
  if (E == null) return "N";
  const u = typeof E;
  if (u === "number" || u === "boolean") return String(E);
  if (u === "string") return E.length > 64 ? E.length + ":" + E.slice(0, 32) + E.slice(-16) : E;
  if (Array.isArray(E)) {
    const a = E.length;
    if (a === 0) return "[]";
    const i = [a],
      r = a <= 3 ? [0, 1, 2].filter(o => o < a) : [0, Math.floor(a / 2), a - 1];
    for (const o of r) i.push(I(E[o], e + 1));
    return "[" + i.join("|") + "]"
  }
  if (u === "object") {
    const a = Object.keys(E),
      i = [a.length],
      r = a.length <= 8 ? a : a.filter((o, n) => n % Math.ceil(a.length / 8) === 0);
    for (const o of r) i.push(o + "=" + I(E[o], e + 1));
    return "{" + i.join("|") + "}"
  }
  return String(E)
}
const l0 = 6e4,
  s0 = 3e5,
  C = {},
  W = {},
  k = new Map;

function d0() {
  for (const [, E] of k) E.abort();
  k.clear();
  for (const E of Object.keys(C)) delete C[E]
}

function c0(E) {
  return async function(e, u, a, i, {
    silent: r = !1
  } = {}) {
    const o = new AbortController;
    k.set(e, o);
    const n = setTimeout(() => o.abort(), 3e4),
      {
        fetchWithTokenRefresh: l
      } = await P(async () => {
        const {
          fetchWithTokenRefresh: x
        } = await import("./index-DK7pcb85.js").then(p => p.f);
        return {
          fetchWithTokenRefresh: x
        }
      }, R([0, 1, 2])),
      {
        tokens: s,
        refreshAccessToken: d
      } = E();
    try {
      const x = await l(u, {
        signal: o.signal
      }, () => s, d);
      if (!x.ok) throw new Error(`HTTP ${x.status}`);
      const p = await x.json(),
        f = W[e],
        m = n0(p);
      return f && f._hash === m ? (f.t = Date.now(), r || a(b => ({
        loading: {
          ...b.loading,
          [e]: !1
        }
      })), f.data) : (a(e === "erTodayPatients" ? {
        erTodayPatients: p.patients || [],
        erWaitTimeForecast: p.wait_time_forecast || null,
        loading: {
          ...i().loading,
          [e]: !1
        },
        lastUpdated: Date.now()
      } : e === "erTriageStats" ? {
        erTriageStats: p.stats || [],
        loading: {
          ...i().loading,
          [e]: !1
        },
        lastUpdated: Date.now()
      } : b => ({
        [e]: p,
        loading: {
          ...b.loading,
          [e]: !1
        },
        lastUpdated: Date.now()
      })), W[e] = {
        data: p,
        _hash: m,
        t: Date.now()
      }, p)
    } catch (x) {
      const p = x.name === "AbortError" ? "Request timeout" : x.message;
      return a(f => ({
        errors: {
          ...f.errors,
          [e]: p
        }
      })), null
    } finally {
      clearTimeout(n), k.delete(e), r || a(x => ({
        loading: {
          ...x.loading,
          [e]: !1
        }
      })), delete C[e]
    }
  }
}

function x0(E) {
  const e = c0(E);
  return o0((u, a) => ({
    activeTab: "overview",
    dashboardSummary: null,
    financeSummary: null,
    claims: [],
    claimStats: null,
    denialAnalytics: null,
    revenueLeakage: null,
    bedOccupancy: null,
    admissions: [],
    alosData: null,
    riskPatients: [],
    riskStats: null,
    riskDistribution: null,
    resourceElasticity: null,
    emergencyAlerts: [],
    denialPrediction: null,
    underCharging: null,
    paymentVariance: null,
    paymentPropensity: null,
    erTodayPatients: [],
    erTriageStats: [],
    erWaitTimeForecast: null,
    erBottlenecks: null,
    erSurge: null,
    erResusAlert: null,
    erDiversionStatus: null,
    ncdGoalAttainment: null,
    medRecToday: null,
    medRecAnalytics: null,
    loading: {},
    errors: {},
    lastUpdated: null,
    user: {
      role: "admin",
      full_name: "Dashboard"
    },
    drillDown: {
      isOpen: !1,
      kpiId: null,
      title: "",
      data: null,
      loading: !1
    },
    setTab: i => {
      d0(), u({
        activeTab: i
      })
    },
    dispatch: i => {
      switch (i.type) {
        case "SET_DATA":
          i.key === "erTodayPatients" ? u({
            erTodayPatients: i.payload?.patients || [],
            erWaitTimeForecast: i.payload?.wait_time_forecast || null,
            loading: {
              ...a().loading,
              [i.key]: !1
            }
          }) : i.key === "erTriageStats" ? u({
            erTriageStats: i.payload?.stats || [],
            loading: {
              ...a().loading,
              [i.key]: !1
            }
          }) : u(r => ({
            [i.key]: i.payload,
            loading: {
              ...r.loading,
              [i.key]: !1
            }
          }));
          break;
        case "SET_LOADING":
          u(r => ({
            loading: {
              ...r.loading,
              [i.key]: i.payload
            }
          }));
          break;
        case "SET_ERROR":
          u(r => ({
            errors: {
              ...r.errors,
              [i.key]: i.payload
            }
          }));
          break;
        case "ADD_ALERT":
          u(r => ({
            emergencyAlerts: [i.payload, ...r.emergencyAlerts].slice(0, 20)
          }));
          break;
        case "DISMISS_ALERT":
          u(r => ({
            emergencyAlerts: r.emergencyAlerts.filter((o, n) => n !== i.payload)
          }));
          break;
        case "SET_LAST_UPDATED":
          u({
            lastUpdated: i.payload
          });
          break;
        case "OPEN_DRILL_DOWN":
          u({
            drillDown: {
              isOpen: !0,
              kpiId: i.kpiId,
              title: i.title,
              data: null,
              loading: !0
            }
          });
          break;
        case "CLOSE_DRILL_DOWN":
          u({
            drillDown: {
              isOpen: !1,
              kpiId: null,
              title: "",
              data: null,
              loading: !1
            }
          });
          break;
        case "SET_DRILL_DOWN_DATA":
          u(r => ({
            drillDown: {
              ...r.drillDown,
              data: i.payload,
              loading: !1
            }
          }));
          break
      }
    },
    fetchData: async (i, r) => {
      if (C[i]) return C[i];
      const o = W[i],
        n = o ? Date.now() - o.t : 1 / 0;
      if (o && n < l0 && o.data) return o.data;
      if (o && n < s0 && o.data) {
        const s = e(i, r, u, a, {
          silent: !0
        });
        return C[i] = s, o.data
      }
      u(s => ({
        loading: {
          ...s.loading,
          [i]: !0
        },
        errors: {
          ...s.errors,
          [i]: null
        }
      }));
      const l = e(i, r, u, a);
      return C[i] = l, l
    },
    fetchParallel: async i => Promise.all(i.map(([r, o]) => a().fetchData(r, o))),
    batchFetch: async i => {
      const r = Object.entries(i),
        o = await Promise.allSettled(r.map(([l, s]) => a().fetchData(l, s).then(d => [l, d]))),
        n = {};
      for (const l of o)
        if (l.status === "fulfilled" && l.value) {
          const [s, d] = l.value;
          n[s] = d
        } return n
    },
    addAlert: i => u(r => ({
      emergencyAlerts: [i, ...r.emergencyAlerts].slice(0, 20)
    })),
    dismissAlert: i => u(r => ({
      emergencyAlerts: r.emergencyAlerts.filter((o, n) => n !== i)
    })),
    openDrillDown: async (i, r, o) => {
      if (u({
          drillDown: {
            isOpen: !0,
            kpiId: i,
            title: r,
            data: null,
            loading: !0
          }
        }), o) try {
        const {
          fetchWithTokenRefresh: n
        } = await P(async () => {
          const {
            fetchWithTokenRefresh: p
          } = await import("./index-DK7pcb85.js").then(f => f.f);
          return {
            fetchWithTokenRefresh: p
          }
        }, R([0, 1, 2])), {
          tokens: l,
          refreshAccessToken: s
        } = E(), d = await n(o, {}, () => l, s);
        if (!d.ok) throw new Error(`HTTP ${d.status}`);
        const x = await d.json();
        u(p => ({
          drillDown: {
            ...p.drillDown,
            data: x,
            loading: !1
          }
        }))
      } catch (n) {
        u(l => ({
          drillDown: {
            ...l.drillDown,
            data: {
              error: n.message
            },
            loading: !1
          }
        }))
      }
    },
    closeDrillDown: () => u({
      drillDown: {
        isOpen: !1,
        kpiId: null,
        title: "",
        data: null,
        loading: !1
      }
    })
  }))
}
const Y = E => Symbol.iterator in E,
  q = E => "entries" in E,
  Q = (E, e) => {
    const u = E instanceof Map ? E : new Map(E.entries()),
      a = e instanceof Map ? e : new Map(e.entries());
    if (u.size !== a.size) return !1;
    for (const [i, r] of u)
      if (!a.has(i) || !Object.is(r, a.get(i))) return !1;
    return !0
  },
  p0 = (E, e) => {
    const u = E[Symbol.iterator](),
      a = e[Symbol.iterator]();
    let i = u.next(),
      r = a.next();
    for (; !i.done && !r.done;) {
      if (!Object.is(i.value, r.value)) return !1;
      i = u.next(), r = a.next()
    }
    return !!i.done && !!r.done
  };

function m0(E, e) {
  return Object.is(E, e) ? !0 : typeof E != "object" || E === null || typeof e != "object" || e === null || Object.getPrototypeOf(E) !== Object.getPrototypeOf(e) ? !1 : Y(E) && Y(e) ? q(E) && q(e) ? Q(E, e) : p0(E, e) : Q({
    entries: () => Object.entries(E)
  }, {
    entries: () => Object.entries(e)
  })
}

function g0(E) {
  const e = F.useRef(void 0);
  return u => {
    const a = E(u);
    return m0(e.current, a) ? e.current : e.current = a
  }
}
const K = $.createContext(null);

function f0({
  children: E
}) {
  const {
    tokens: e,
    refreshAccessToken: u
  } = N(), a = $.useRef({
    tokens: e,
    refreshAccessToken: u
  });
  a.current = {
    tokens: e,
    refreshAccessToken: u
  };
  const i = $.useRef(null);
  return i.current || (i.current = x0(() => a.current)), t.jsx(K.Provider, {
    value: i.current,
    children: E
  })
}

function J() {
  const E = $.useContext(K);
  if (!E) throw new Error("useDashboardStore must be used within DashboardProvider");
  return E
}

function M(E) {
  const e = J();
  return G(e, g0(E))
}

function L() {
  const E = J(),
    e = $.useRef(null);
  if (!e.current) {
    const u = E.getState();
    e.current = {
      setTab: u.setTab,
      dispatch: u.dispatch,
      fetchData: u.fetchData,
      fetchParallel: u.fetchParallel,
      batchFetch: u.batchFetch,
      addAlert: u.addAlert,
      dismissAlert: u.dismissAlert,
      openDrillDown: u.openDrillDown,
      closeDrillDown: u.closeDrillDown
    }
  }
  return e.current
}
const z = 15;

function b0(E) {
  const [e, u] = $.useState(1), a = Math.max(1, Math.ceil((E?.length || 0) / z)), i = Math.min(e, a), r = (E || []).slice((i - 1) * z, i * z);
  return $.useEffect(() => {
    u(1)
  }, [E]), {
    page: i,
    totalPages: a,
    sliced: r,
    setPage: u,
    total: E?.length || 0
  }
}

function h0({
  page: E,
  totalPages: e,
  total: u,
  setPage: a
}) {
  return e <= 1 ? null : t.jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "0.75rem",
      padding: "0.5rem 0.25rem",
      borderTop: "1px solid var(--md-divider)"
    },
    children: [t.jsxs("span", {
      style: {
        fontSize: "12px",
        color: "var(--md-text-tertiary)",
        fontWeight: 600
      },
      children: ["\u0E2B\u0E19\u0E49\u0E32 ", E, " / ", e, " \xA0\xB7\xA0 \u0E23\u0E27\u0E21 ", u.toLocaleString(), " \u0E41\u0E16\u0E27"]
    }), t.jsxs("div", {
      style: {
        display: "flex",
        gap: "6px"
      },
      children: [t.jsx(T, {
        label: "\xAB",
        disabled: E === 1,
        onClick: () => a(1)
      }), t.jsx(T, {
        label: "\u2039",
        disabled: E === 1,
        onClick: () => a(i => i - 1)
      }), t.jsx(T, {
        label: "\u203A",
        disabled: E === e,
        onClick: () => a(i => i + 1)
      }), t.jsx(T, {
        label: "\xBB",
        disabled: E === e,
        onClick: () => a(e)
      })]
    })]
  })
}

function T({
  label: E,
  disabled: e,
  onClick: u
}) {
  return t.jsx("button", {
    onClick: u,
    disabled: e,
    style: {
      padding: "4px 10px",
      borderRadius: "6px",
      border: "1px solid var(--md-border)",
      background: e ? "var(--md-bg)" : "var(--md-surface)",
      color: e ? "var(--md-text-tertiary)" : "var(--md-text-primary)",
      cursor: e ? "not-allowed" : "pointer",
      fontSize: "13px",
      fontWeight: 700,
      lineHeight: 1,
      transition: "background 0.15s"
    },
    children: E
  })
}

function y0() {
  const E = M(n => ({
      drillDown: n.drillDown
    })),
    {
      closeDrillDown: e
    } = L(),
    {
      drillDown: u
    } = E;
  if (!u.isOpen) return null;
  const {
    title: a,
    data: i,
    loading: r,
    kpiId: o
  } = u;
  return t.jsxs("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": a,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1e3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
      backdropFilter: "blur(8px)",
      background: "rgba(0,0,0,0.4)",
      animation: "fadeIn 0.2s ease-out"
    },
    onClick: e,
    children: [t.jsxs("div", {
      style: {
        width: "100%",
        maxWidth: "900px",
        maxHeight: "90%",
        background: "var(--md-surface)",
        borderRadius: "24px",
        border: "1px solid var(--md-border)",
        boxShadow: "var(--md-shadow-lg)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        animation: "slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
      },
      onClick: n => n.stopPropagation(),
      children: [t.jsxs("div", {
        style: {
          padding: "1.25rem 1.75rem",
          borderBottom: "1px solid var(--md-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(to right, var(--md-surface), var(--md-bg))"
        },
        children: [t.jsxs("div", {
          children: [t.jsx("h2", {
            style: {
              fontSize: "var(--fs-lg)",
              fontWeight: 800,
              color: "var(--md-text-primary)",
              margin: 0
            },
            children: a
          }), t.jsx("p", {
            style: {
              fontSize: "var(--fs-xs)",
              color: "var(--md-text-tertiary)",
              margin: "2px 0 0"
            },
            children: "Detailed Analytics Breakdown"
          })]
        }), t.jsx("button", {
          onClick: e,
          "aria-label": "\u0E1B\u0E34\u0E14",
          style: {
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "none",
            background: "var(--md-bg)",
            color: "var(--md-text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 700,
            transition: "all 0.2s"
          },
          onMouseEnter: n => n.currentTarget.style.background = "var(--md-border)",
          onMouseLeave: n => n.currentTarget.style.background = "var(--md-bg)",
          children: "\xD7"
        })]
      }), t.jsx("div", {
        style: {
          flex: 1,
          overflowY: "auto",
          padding: "1.75rem"
        },
        children: r ? t.jsxs("div", {
          style: {
            textAlign: "center"
          },
          children: [t.jsx("div", {
            className: "flex items-center justify-center py-12",
            children: t.jsxs("div", {
              className: "relative w-10 h-10",
              children: [t.jsx("div", {
                className: "absolute inset-0 rounded-full border-4 border-purple-100"
              }), t.jsx("div", {
                className: "absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin"
              })]
            })
          }), t.jsx("p", {
            style: {
              marginTop: "1rem",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: "Analyzing data pools..."
          })]
        }) : i?.error ? t.jsxs("div", {
          style: {
            textAlign: "center",
            padding: "3rem"
          },
          children: [t.jsx("span", {
            style: {
              fontSize: "48px"
            },
            children: "\u26A0\uFE0F"
          }), t.jsx("h3", {
            style: {
              color: "var(--md-text-primary)"
            },
            children: "Unable to retrieve details"
          }), t.jsx("p", {
            style: {
              color: "var(--md-text-tertiary)"
            },
            children: i.error
          })]
        }) : t.jsx(v0, {
          kpiId: o,
          data: i
        })
      }), t.jsxs("div", {
        style: {
          padding: "1rem 1.75rem",
          borderTop: "1px solid var(--md-border)",
          background: "var(--md-bg)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [t.jsx("span", {
          style: {
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600
          },
          children: "BCH 360\xB0 INTELLIGENCE ENGINE V.10"
        }), t.jsx("button", {
          onClick: e,
          style: {
            padding: "0.5rem 1.5rem",
            borderRadius: "10px",
            background: "var(--md-primary)",
            color: "#fff",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "var(--fs-xs)",
            boxShadow: "0 4px 12px rgba(124,58,237,.3)"
          },
          children: "Close View"
        })]
      })]
    }), t.jsx("style", {
      children: `
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `
    })]
  })
}
const j = F.memo(function({
  headers: E,
  rows: e,
  renderCell: u
}) {
  const {
    page: a,
    totalPages: i,
    sliced: r,
    setPage: o,
    total: n
  } = b0(e), l = $.useMemo(() => ({
    page: a,
    totalPages: i,
    total: n
  }), [a, i, n]);
  return t.jsxs("div", {
    children: [t.jsx("div", {
      style: {
        overflowX: "auto",
        borderRadius: "12px",
        border: "1px solid var(--md-border)"
      },
      children: t.jsxs("table", {
        style: {
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "var(--fs-sm)"
        },
        children: [t.jsx("thead", {
          style: {
            background: "var(--md-bg)"
          },
          children: t.jsx("tr", {
            children: E.map((s, d) => t.jsx("th", {
              style: {
                padding: "12px 16px",
                textAlign: "left",
                fontWeight: 800,
                color: "var(--md-text-tertiary)",
                borderBottom: "1px solid var(--md-border)"
              },
              children: s
            }, d))
          })
        }), t.jsx("tbody", {
          children: r.length === 0 ? t.jsx("tr", {
            children: t.jsx("td", {
              colSpan: E.length,
              style: {
                padding: "2rem",
                textAlign: "center",
                color: "var(--md-text-tertiary)"
              },
              children: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25"
            })
          }) : r.map((s, d) => t.jsx("tr", {
            style: {
              borderBottom: d === r.length - 1 ? "none" : "1px solid var(--md-divider)"
            },
            children: E.map((x, p) => t.jsx("td", {
              style: {
                padding: "12px 16px",
                color: "var(--md-text-primary)"
              },
              children: u ? u(s, p) : s[p]
            }, p))
          }, d))
        })]
      })
    }), t.jsx(h0, {
      page: l.page,
      totalPages: l.totalPages,
      total: l.total,
      setPage: o
    })]
  })
});

function v0({
  kpiId: E,
  data: e
}) {
  if (!e) return t.jsx("p", {
    children: "No data available for this metric."
  });
  switch (E) {
    case "finance_revenue":
      return t.jsxs("div", {
        className: "space-y-6",
        children: [t.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem"
          },
          children: [t.jsx(S, {
            label: "OPD Revenue",
            value: e.breakdown?.opd,
            color: "#7c3aed"
          }), t.jsx(S, {
            label: "IPD Revenue",
            value: e.breakdown?.ipd,
            color: "#0ea5e9"
          }), t.jsx(S, {
            label: "Other Revenue",
            value: e.breakdown?.other,
            color: "#10b981"
          })]
        }), t.jsxs("div", {
          children: [t.jsx("h4", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "1rem"
            },
            children: "Revenue by Department Top 10"
          }), t.jsx(j, {
            headers: ["Department", "Visits", "Revenue (THB)"],
            rows: e.byDept || [],
            renderCell: (u, a) => a === 2 ? Number(u.revenue).toLocaleString() : u[a === 0 ? "name" : "visits"]
          })]
        })]
      });
    case "opd_wait":
      return t.jsxs("div", {
        className: "space-y-6",
        children: [t.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem"
          },
          children: [t.jsx(S, {
            label: "Wait < 30m",
            value: e.stats?.under30,
            color: "#10b981"
          }), t.jsx(S, {
            label: "30m - 60m",
            value: e.stats?.to60,
            color: "#f59e0b"
          }), t.jsx(S, {
            label: "60m - 90m",
            value: e.stats?.to90,
            color: "#fb6340"
          }), t.jsx(S, {
            label: "Over 90m",
            value: e.stats?.over90,
            color: "#f5365c"
          })]
        }), t.jsxs("div", {
          children: [t.jsx("h4", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "1rem"
            },
            children: "Longest Wait Active Patients"
          }), t.jsx(j, {
            headers: ["HN", "Name", "Clinic", "Status", "Wait Time"],
            rows: e.topWaiters || [],
            renderCell: (u, a) => a === 4 ? t.jsxs("span", {
              style: {
                fontWeight: 800,
                color: u.minutes > 90 ? "#f5365c" : "#f59e0b"
              },
              children: [u.minutes, " min"]
            }) : a === 3 ? t.jsx("span", {
              style: {
                padding: "2px 8px",
                borderRadius: "4px",
                background: "rgba(0,0,0,0.05)",
                fontSize: "12px"
              },
              children: u.status
            }) : u[["hn", "name", "clinic", "status", "minutes"][a]]
          })]
        })]
      });
    case "ipd_beds":
      return t.jsxs("div", {
        className: "space-y-6",
        children: [t.jsxs("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem"
          },
          children: [t.jsx(S, {
            label: "Total Ward Capacity",
            value: e.wards?.reduce((u, a) => u + a.total, 0),
            color: "#10b981"
          }), t.jsx(S, {
            label: "Active Occupancy",
            value: e.wards?.reduce((u, a) => u + a.occupied, 0),
            color: "#7c3aed"
          }), t.jsx(S, {
            label: "Avg Occupancy Rate",
            value: `${Math.round(e.wards?.reduce((u,a)=>u+a.rate,0)/(e.wards?.length||1))}%`,
            color: "#0ea5e9"
          })]
        }), t.jsxs("div", {
          children: [t.jsx("h4", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "1rem"
            },
            children: "Occupancy by Ward"
          }), t.jsx(j, {
            headers: ["Ward Name", "Beds", "Occupied", "Rate"],
            rows: e.wards || [],
            renderCell: (u, a) => a === 3 ? t.jsxs("span", {
              style: {
                fontWeight: 800,
                color: u.rate > 85 ? "#f5365c" : "#10b981"
              },
              children: [u.rate, "%"]
            }) : Object.values(u)[a]
          })]
        }), t.jsxs("div", {
          children: [t.jsx("h4", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "1rem"
            },
            children: "Active Admissions (Top 15)"
          }), t.jsx(j, {
            headers: ["AN", "Patient Name", "Ward", "LOS (Days)", "Primary Dx"],
            rows: e.activePatients || [],
            renderCell: (u, a) => a === 3 ? `${u.stay} \u0E27\u0E31\u0E19` : Object.values(u)[a]
          })]
        })]
      });
    case "ipd_readmit":
      return t.jsx("div", {
        className: "space-y-6",
        children: t.jsxs("div", {
          children: [t.jsx("h4", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "1rem"
            },
            children: "30-Day Readmission Patients"
          }), t.jsx(j, {
            headers: ["AN", "Patient Name", "Previous Dch", "Readmit Date", "Gap (Days)", "Dx"],
            rows: e.patients || [],
            renderCell: (u, a) => a === 4 ? t.jsxs("span", {
              style: {
                fontWeight: 800,
                color: "#f5365c"
              },
              children: [u.days_since_dch, " \u0E27\u0E31\u0E19"]
            }) : u[["an", "name", "prev_dchdate", "readmit_date", "days_since_dch", "dx_name"][a]]
          })]
        })
      });
    case "ipd_alos":
      return t.jsx("div", {
        className: "space-y-6",
        children: t.jsxs("div", {
          children: [t.jsx("h4", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "1rem"
            },
            children: "LOS Variance & Overstay Cases"
          }), t.jsx(j, {
            headers: ["AN", "Patient Name", "Reg Date", "Actual LOS", "Benchmark", "Excess", "Dx"],
            rows: e.patients || [],
            renderCell: (u, a) => a === 3 ? `${u.actual_alos} \u0E27\u0E31\u0E19` : a === 4 ? `${u.benchmark_alos} \u0E27\u0E31\u0E19` : a === 5 ? t.jsxs("span", {
              style: {
                fontWeight: 800,
                color: "#f5365c"
              },
              children: ["+", u.excess_days, " \u0E27\u0E31\u0E19"]
            }) : u[["an", "name", "regdate", "actual_alos", "benchmark_alos", "excess_days", "dx_name"][a]]
          })]
        })
      });
    case "ipd_cmi":
      return t.jsx("div", {
        className: "space-y-6",
        children: t.jsxs("div", {
          children: [t.jsx("h4", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "1rem"
            },
            children: "Case Mix Index (CMI) Distribution"
          }), t.jsx(j, {
            headers: ["DRG", "Diagnosis", "Cases", "Avg RW", "Total RW", "Avg Revenue"],
            rows: e.drgs || [],
            renderCell: (u, a) => a === 3 ? Number(u.avg_rw).toFixed(3) : a === 4 ? Number(u.total_rw).toFixed(2) : a === 5 ? Number(u.avg_income || 0).toLocaleString() : u[["drg", "dx_name", "cases", "avg_rw", "total_rw", "avg_income"][a]]
          })]
        })
      });
    case "ipd_mortality":
      return t.jsx("div", {
        className: "space-y-6",
        children: t.jsxs("div", {
          children: [t.jsx("h4", {
            style: {
              fontSize: "14px",
              fontWeight: 800,
              marginBottom: "1rem"
            },
            children: "Clinical Mortality Review (Last 90 Days)"
          }), t.jsx(j, {
            headers: ["AN", "Patient Name", "Dch Date", "Ward", "Diagnosis", "Doctor"],
            rows: e.patients || [],
            renderCell: (u, a) => u[["an", "name", "dchdate", "ward", "dx_name", "doctor"][a]]
          })]
        })
      });
    default:
      return t.jsxs("div", {
        style: {
          padding: "2rem",
          textAlign: "center"
        },
        children: [t.jsx("p", {
          style: {
            color: "var(--md-text-secondary)"
          },
          children: "Detailed breakdown for this metric is coming soon."
        }), t.jsx("pre", {
          style: {
            background: "var(--md-bg)",
            padding: "1rem",
            borderRadius: "12px",
            fontSize: "12px",
            textAlign: "left",
            overflow: "auto"
          },
          children: JSON.stringify(e, null, 2)
        })]
      })
  }
}

function S({
  label: E,
  value: e,
  color: u
}) {
  return t.jsxs("div", {
    style: {
      padding: "1rem",
      borderRadius: "16px",
      background: `${u}08`,
      border: `1px solid ${u}20`
    },
    children: [t.jsx("p", {
      style: {
        fontSize: "12px",
        fontWeight: 800,
        color: "var(--md-text-tertiary)",
        textTransform: "uppercase",
        marginBottom: "4px"
      },
      children: E
    }), t.jsx("p", {
      style: {
        fontSize: "20px",
        fontWeight: 900,
        color: u,
        margin: 0
      },
      children: typeof e == "number" ? e.toLocaleString() : e
    })]
  })
}
const w = 120;

function $0(E) {
  if (!E) return "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E42\u0E2B\u0E25\u0E14";
  const e = Math.floor((Date.now() - E) / 1e3);
  if (e < 5) return "\u0E40\u0E21\u0E37\u0E48\u0E2D\u0E01\u0E35\u0E49";
  if (e < 60) return `${e} \u0E27\u0E34\u0E19\u0E32\u0E17\u0E35\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27`;
  const u = Math.floor(e / 60);
  return u < 60 ? `${u} \u0E19\u0E32\u0E17\u0E35\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27` : `${Math.floor(u/60)} \u0E0A\u0E21.\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27`
}

function A0(E) {
  if (!E) return {
    level: "unknown",
    color: "#94a3b8",
    label: "N/A",
    dot: "\u26AA"
  };
  const e = (Date.now() - E) / 1e3;
  return e < 180 ? {
    level: "fresh",
    color: "#10b981",
    label: "LIVE",
    dot: "\u{1F7E2}"
  } : e < 600 ? {
    level: "ok",
    color: "#f59e0b",
    label: "OK",
    dot: "\u{1F7E1}"
  } : e < 900 ? {
    level: "stale",
    color: "#f97316",
    label: "STALE",
    dot: "\u{1F7E0}"
  } : {
    level: "old",
    color: "#ef4444",
    label: "OFFLINE",
    dot: "\u{1F534}"
  }
}

function B0({
  onForceRefresh: E
}) {
  const e = M(m => ({
      lastUpdated: m.lastUpdated
    })),
    {
      lastUpdated: u
    } = e,
    [a, i] = $.useState(Date.now()),
    [r, o] = $.useState(w),
    [n, l] = $.useState(!1);
  $.useEffect(() => {
    const m = setInterval(() => {
      i(Date.now()), o(b => b <= 1 ? w : b - 1)
    }, 1e3);
    return () => clearInterval(m)
  }, []), $.useEffect(() => {
    u && (o(w), l(!1))
  }, [u]);
  const s = A0(u),
    d = $0(u),
    x = (w - r) / w * 100,
    p = $.useCallback(() => {
      l(!0), o(w), E && E()
    }, [E]),
    f = u ? new Date(u).toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : "--:--:--";
  return t.jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "4px 10px",
      borderRadius: "10px",
      background: `${s.color}08`,
      border: `1px solid ${s.color}20`,
      transition: "all 0.3s ease",
      cursor: "default",
      position: "relative",
      overflow: "hidden"
    },
    children: [t.jsx("div", {
      style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        height: "2px",
        width: `${x}%`,
        background: `linear-gradient(90deg, ${s.color}40, ${s.color})`,
        transition: "width 1s linear",
        borderRadius: "0 2px 2px 0"
      }
    }), t.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "4px"
      },
      children: [t.jsx("span", {
        style: {
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: s.color,
          boxShadow: s.level === "fresh" ? `0 0 6px ${s.color}80` : "none",
          animation: s.level === "fresh" ? "pulse-dot 2s infinite" : "none"
        }
      }), t.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 900,
          color: s.color,
          textTransform: "uppercase",
          letterSpacing: "0.08em"
        },
        children: s.label
      })]
    }), t.jsx("div", {
      style: {
        width: "1px",
        height: "14px",
        background: "var(--md-border)"
      }
    }), t.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0px",
        lineHeight: 1
      },
      children: [t.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--md-text-primary)",
          fontFamily: "'JetBrains Mono', monospace"
        },
        children: f
      }), t.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--md-text-tertiary)"
        },
        children: d
      })]
    }), t.jsxs("div", {
      style: {
        fontSize: "12px",
        fontWeight: 700,
        color: "var(--md-text-tertiary)",
        fontFamily: "'JetBrains Mono', monospace",
        minWidth: "22px",
        textAlign: "center"
      },
      children: [r, "s"]
    }), t.jsx("button", {
      onClick: p,
      disabled: n,
      title: "Force Refresh \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E19\u0E17\u0E35",
      style: {
        width: "22px",
        height: "22px",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: n ? `${s.color}15` : "transparent",
        border: `1px solid ${s.color}25`,
        cursor: n ? "wait" : "pointer",
        transition: "all 0.2s ease",
        fontSize: "12px",
        padding: 0,
        animation: n ? "spin 1s linear infinite" : "none"
      },
      onMouseEnter: m => {
        n || (m.currentTarget.style.background = `${s.color}15`, m.currentTarget.style.transform = "scale(1.1)")
      },
      onMouseLeave: m => {
        n || (m.currentTarget.style.background = "transparent", m.currentTarget.style.transform = "none")
      },
      children: "\u{1F504}"
    })]
  })
}

function F0({
  kpis: E,
  columns: e
}) {
  const {
    openDrillDown: u
  } = L(), a = e || "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", i = $.useCallback(r => {
    r.drillDownId && u(r.drillDownId, r.drillDownTitle || r.thLabel, r.drillDownEndpoint)
  }, [u]);
  return t.jsx("div", {
    style: {
      display: "grid",
      gridTemplateColumns: a,
      gap: "16px"
    },
    children: E.map((r, o) => {
      const n = !!r.drillDownId;
      return t.jsxs("div", {
        className: `group ${n?"cursor-pointer":"cursor-default"}`,
        style: {
          padding: "24px",
          background: "var(--md-surface, rgba(255, 255, 255, 0.6))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--md-border, rgba(0, 0, 0, 0.05))",
          borderTop: `4px solid ${r.color}`,
          borderRadius: "24px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          boxShadow: "0 10px 30px -5px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.4)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        },
        onClick: () => i(r),
        onMouseEnter: l => {
          n && (l.currentTarget.style.transform = "translateY(-6px)", l.currentTarget.style.boxShadow = `0 25px 50px -12px ${r.color}25, inset 0 2px 4px rgba(255,255,255,0.5)`)
        },
        onMouseLeave: l => {
          n && (l.currentTarget.style.transform = "translateY(0)", l.currentTarget.style.boxShadow = "0 10px 30px -5px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.4)")
        },
        children: [t.jsx("div", {
          style: {
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "120px",
            height: "120px",
            background: `${r.color}`,
            filter: "blur(50px)",
            opacity: .15,
            borderRadius: "50%",
            pointerEvents: "none",
            transition: "all 0.5s ease"
          },
          className: "group-hover:scale-150 group-hover:opacity-25"
        }), t.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "16px",
            position: "relative",
            zIndex: 1
          },
          children: [t.jsx("div", {
            style: {
              fontSize: "28px",
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${r.color}15 0%, ${r.color}05 100%)`,
              border: `1px solid ${r.color}30`,
              flexShrink: 0,
              boxShadow: `0 8px 16px ${r.color}15`,
              backdropFilter: "blur(8px)"
            },
            children: r.icon
          }), t.jsxs("div", {
            style: {
              flex: 1,
              minWidth: 0
            },
            children: [t.jsx("div", {
              style: {
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 900,
                color: r.color,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: "6px",
                textShadow: "0 2px 10px rgba(0,0,0,0.03)",
                wordBreak: "break-word"
              },
              children: r.value
            }), r.sub && t.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: r.color,
                background: `linear-gradient(to right, ${r.color}20, ${r.color}10)`,
                padding: "3px 10px",
                borderRadius: "6px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                border: `1px solid ${r.color}20`,
                display: "inline-block"
              },
              children: r.sub
            }), r.extra && t.jsx("div", {
              style: {
                marginTop: "10px",
                width: "100%"
              },
              children: r.extra
            })]
          }), n && t.jsx("span", {
            style: {
              fontSize: "18px",
              opacity: 0,
              transform: "translateX(-10px)",
              color: r.color,
              transition: "all 0.3s ease"
            },
            className: "group-hover:opacity-100 group-hover:transform-none",
            children: "\u2197"
          })]
        }), t.jsxs("div", {
          style: {
            position: "relative",
            zIndex: 1,
            flex: "1 0 auto"
          },
          children: [t.jsx("div", {
            style: {
              fontSize: "16px",
              fontWeight: 800,
              color: "var(--md-text-primary, #1e293b)",
              marginBottom: "4px",
              letterSpacing: "0.01em",
              lineHeight: 1.3
            },
            children: r.thLabel
          }), t.jsx("div", {
            style: {
              fontSize: "12px",
              fontWeight: 700,
              color: "var(--md-text-tertiary, #64748b)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "16px"
            },
            children: r.label
          }), t.jsxs("div", {
            style: {
              padding: "16px",
              borderRadius: "16px",
              background: "var(--md-surface-2, rgba(255,255,255,0.7))",
              border: "1px solid var(--md-border, rgba(0,0,0,0.06))",
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.02)",
              backdropFilter: "blur(10px)"
            },
            children: [t.jsxs("div", {
              style: {
                fontSize: "13px",
                color: "var(--md-text-secondary, #475569)",
                fontWeight: 600,
                lineHeight: 1.6,
                marginBottom: "12px",
                display: "flex",
                alignItems: "flex-start",
                gap: "8px"
              },
              children: [t.jsx("span", {
                style: {
                  fontSize: "16px",
                  marginTop: "1px"
                },
                children: "\u{1F4A1}"
              }), t.jsx("span", {
                children: r.meaning
              })]
            }), r.desc && t.jsx("div", {
              style: {
                fontSize: "14px",
                color: "var(--md-text-primary, #0f172a)",
                fontWeight: 800,
                marginBottom: "12px",
                padding: "8px 12px",
                background: "var(--md-surface, #f8fafc)",
                borderRadius: "8px",
                borderLeft: `3px solid ${r.color}`
              },
              children: r.desc
            }), t.jsxs("div", {
              style: {
                fontSize: "12px",
                color: "#0d9488",
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                background: "rgba(13, 148, 136, 0.08)",
                padding: "8px 12px",
                borderRadius: "8px",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid rgba(13, 148, 136, 0.15)"
              },
              children: [t.jsx("span", {
                style: {
                  fontSize: "14px"
                },
                children: "\u{1F4D0}"
              }), " ", t.jsx("span", {
                style: {
                  opacity: .9,
                  letterSpacing: "0.02em"
                },
                children: r.calc
              })]
            }), t.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
                flexWrap: "wrap",
                gap: "8px"
              },
              children: [t.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: r.color,
                  fontWeight: 800,
                  background: `${r.color}15`,
                  padding: "4px 10px",
                  borderRadius: "8px",
                  border: `1px solid ${r.color}25`
                },
                children: ["\u{1F3AF} \u0E40\u0E1B\u0E49\u0E32: ", r.target]
              }), t.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-secondary, #475569)",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                },
                children: ["\u{1F4CA} ", t.jsx("span", {
                  style: {
                    background: "var(--md-surface, #f1f5f9)",
                    padding: "2px 8px",
                    borderRadius: "6px"
                  },
                  children: r.benchmark
                })]
              })]
            }), t.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px dashed var(--md-border, rgba(0,0,0,0.1))"
              },
              children: [t.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary, #64748b)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                },
                children: ["\u{1F5C4}\uFE0F ", t.jsx("span", {
                  children: r.dataSource
                })]
              }), t.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary, #64748b)",
                  fontWeight: 700,
                  background: "var(--md-surface-2, #f1f5f9)",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  letterSpacing: "0.04em"
                },
                children: r.period
              })]
            })]
          })]
        }), r.aiTip && t.jsxs("div", {
          style: {
            marginTop: "16px",
            padding: "12px 16px",
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${r.color}08 0%, ${r.color}15 100%)`,
            border: `1px solid ${r.color}25`,
            display: "flex",
            alignItems: "flex-start",
            gap: "12px",
            boxShadow: `0 4px 12px ${r.color}10`,
            position: "relative",
            zIndex: 1
          },
          className: "group-hover:bg-opacity-50 transition-all duration-300",
          children: [t.jsx("span", {
            style: {
              fontSize: "20px",
              lineHeight: 1,
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
            },
            children: "\u{1F916}"
          }), t.jsxs("div", {
            children: [t.jsx("div", {
              style: {
                fontSize: "11px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: r.color,
                marginBottom: "2px",
                opacity: .8
              },
              children: "AI Insight"
            }), t.jsx("span", {
              style: {
                fontSize: "13px",
                color: r.color,
                fontWeight: 700,
                lineHeight: 1.5,
                textShadow: "0 1px 2px rgba(255,255,255,0.8)"
              },
              children: r.aiTip
            })]
          })]
        })]
      }, o)
    })
  })
}
const D0 = F.memo(F0),
  S0 = ({
    title: E,
    icon: e = "\u{1F9E0}",
    priority: u = "MEDIUM",
    summary: a,
    analysis: i,
    recommendation: r,
    confidence: o = 95,
    lastUpdated: n = "2m ago",
    actionButtons: l = [],
    gradient: s = "#7c3aed",
    gradientFrom: d = "rgba(139,92,246,.08)",
    gradientTo: x = "rgba(99,102,241,.04)",
    borderColor: p = "rgba(139,92,246,.25)"
  }) => {
    const f = {
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
      },
      m = f[u] || f.MEDIUM;
    return t.jsxs("div", {
      className: "glass-card",
      style: {
        background: `linear-gradient(135deg, ${d}, ${x})`,
        border: `1.5px solid ${p}`,
        borderLeft: `4px solid ${s}`,
        padding: "1.25rem",
        borderRadius: "12px",
        backdropFilter: "blur(12px)"
      },
      children: [t.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1rem"
        },
        children: [t.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flex: 1
          },
          children: [t.jsx("span", {
            style: {
              fontSize: "22px"
            },
            children: e
          }), t.jsxs("div", {
            children: [t.jsx("h3", {
              style: {
                margin: 0,
                fontSize: "13px",
                fontWeight: 800,
                color: "var(--md-text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              },
              children: E
            }), t.jsx("p", {
              style: {
                margin: "2px 0 0",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--md-text-secondary)"
              },
              children: "AI-Powered Intelligence"
            })]
          })]
        }), t.jsx("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            padding: "3px 8px",
            borderRadius: "4px",
            background: m.bg,
            color: m.text,
            whiteSpace: "nowrap"
          },
          children: m.label
        })]
      }), t.jsx("p", {
        style: {
          margin: "8px 0",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--md-text-primary)",
          lineHeight: 1.5
        },
        children: a
      }), t.jsx("p", {
        style: {
          margin: "8px 0",
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--md-text-secondary)",
          lineHeight: 1.6
        },
        children: i
      }), t.jsx("div", {
        style: {
          margin: "10px 0",
          padding: "10px",
          borderRadius: "8px",
          background: `${s}15`,
          borderLeft: `3px solid ${s}`
        },
        children: t.jsxs("p", {
          style: {
            margin: 0,
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--md-text-primary)",
            lineHeight: 1.5
          },
          children: ["\u{1F4A1} ", t.jsx("strong", {
            children: "Recommended Action:"
          }), " ", r]
        })
      }), t.jsx("div", {
        style: {
          marginTop: "12px",
          paddingTop: "10px",
          borderTop: "1px solid rgba(255,255,255,.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
          color: "var(--md-text-tertiary)",
          fontWeight: 500
        },
        children: t.jsxs("div", {
          style: {
            display: "flex",
            gap: "16px"
          },
          children: [t.jsxs("span", {
            children: ["\u{1F4CA} Confidence: ", o, "%"]
          }), t.jsxs("span", {
            children: ["\u{1F550} Updated: ", n]
          })]
        })
      }), l.length > 0 && t.jsx("div", {
        style: {
          display: "flex",
          gap: "8px",
          marginTop: "12px",
          flexWrap: "wrap"
        },
        children: l.map((b, h) => t.jsx("button", {
          onClick: b.onClick,
          style: {
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: 700,
            border: "none",
            borderRadius: "6px",
            background: b.primary ? s : "rgba(255,255,255,.1)",
            color: b.primary ? "#fff" : "var(--md-text-primary)",
            cursor: "pointer",
            transition: "all 0.2s ease",
            textTransform: "uppercase"
          },
          onMouseEnter: v => {
            v.target.style.transform = "translateY(-2px)", v.target.style.boxShadow = "0 4px 12px rgba(0,0,0,.1)"
          },
          onMouseLeave: v => {
            v.target.style.transform = "none", v.target.style.boxShadow = "none"
          },
          children: b.label
        }, h))
      })]
    })
  },
  X = F.memo(S0),
  Z = {
    dental: {
      gradient: "#0d9488",
      from: "rgba(13,148,136,.08)",
      to: "rgba(13,148,136,.03)",
      border: "rgba(13,148,136,.25)"
    },
    xray: {
      gradient: "#8b5cf6",
      from: "rgba(139,92,246,.08)",
      to: "rgba(99,102,241,.03)",
      border: "rgba(139,92,246,.25)"
    },
    pharmacy: {
      gradient: "#10b981",
      from: "rgba(16,185,129,.08)",
      to: "rgba(5,150,105,.03)",
      border: "rgba(16,185,129,.25)"
    },
    lab: {
      gradient: "#0ea5e9",
      from: "rgba(14,165,233,.08)",
      to: "rgba(6,182,212,.03)",
      border: "rgba(14,165,233,.25)"
    },
    quality: {
      gradient: "#e11d48",
      from: "rgba(225,29,72,.08)",
      to: "rgba(190,18,60,.03)",
      border: "rgba(225,29,72,.25)"
    },
    customer: {
      gradient: "#7c3aed",
      from: "rgba(124,58,237,.08)",
      to: "rgba(99,102,241,.03)",
      border: "rgba(124,58,237,.25)"
    },
    default: {
      gradient: "#0f766e",
      from: "rgba(15,118,110,.08)",
      to: "rgba(5,150,105,.03)",
      border: "rgba(15,118,110,.25)"
    },
    thaimed: {
      gradient: "#059669",
      from: "rgba(5,150,105,.08)",
      to: "rgba(16,185,129,.03)",
      border: "rgba(5,150,105,.25)"
    },
    phystherapy: {
      gradient: "#0284c7",
      from: "rgba(2,132,199,.08)",
      to: "rgba(14,165,233,.03)",
      border: "rgba(2,132,199,.25)"
    }
  };

function j0(E, e) {
  if (!E) return [];
  const u = Z[e] || Z.default,
    a = [];
  if (E.recommendations?.length > 0 && E.recommendations.forEach((i, r) => {
      a.push({
        title: `AI Recommendation #${r+1}`,
        icon: "\u{1F9E0}",
        priority: r === 0 ? "HIGH" : "MEDIUM",
        summary: i,
        analysis: E.data_source || "AI Analysis",
        recommendation: i,
        ...u
      })
    }), E.demand_forecast) {
    const i = E.demand_forecast;
    a.unshift({
      title: "Demand Forecast",
      icon: "\u{1F4C8}",
      priority: Math.abs(i.growth_rate) > 10 ? "HIGH" : "LOW",
      summary: `Demand ${i.direction==="increasing"?"\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(i.growth_rate)}%`,
      analysis: `\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E32\u0E01 trend 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 ${i.trend?.length||0} data points`,
      recommendation: i.growth_rate > 5 ? "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21" : "\u0E04\u0E07\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19",
      ...u
    })
  }
  if (E.peak_hours?.length > 0 && a.push({
      title: "Peak Hour Analysis",
      icon: "\u23F0",
      priority: "MEDIUM",
      summary: `Peak: ${E.peak_hours.map(i=>i.hour).join(", ")}`,
      analysis: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E32\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 \u2014 \u0E04\u0E27\u0E23\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 unit \u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21",
      recommendation: `\u0E08\u0E31\u0E14\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E0A\u0E48\u0E27\u0E07 ${E.peak_hours[0]?.hour||"peak"}`,
      ...u
    }), E.tat_analysis?.length > 0) {
    const i = E.tat_analysis.reduce((r, o) => r.avg_tat_min > o.avg_tat_min ? r : o, E.tat_analysis[0]);
    a.unshift({
      title: "TAT Performance",
      icon: "\u23F1\uFE0F",
      priority: i.avg_tat_min > 60 ? "HIGH" : "LOW",
      summary: `Slowest: ${i.exam} (${i.avg_tat_min} \u0E19\u0E32\u0E17\u0E35)`,
      analysis: `\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C TAT \u0E08\u0E32\u0E01 ${E.tat_analysis.length} \u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E15\u0E23\u0E27\u0E08`,
      recommendation: i.avg_tat_min > 60 ? `${i.exam} TAT \u0E2A\u0E39\u0E07 \u2014 review workflow` : "TAT \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35",
      ...u
    })
  }
  if (E.pending_reports > 0 && a.push({
      title: "Pending Reports",
      icon: "\u{1F4CB}",
      priority: E.pending_reports > 10 ? "HIGH" : "MEDIUM",
      summary: `${E.pending_reports} report \u0E04\u0E49\u0E32\u0E07\u0E2D\u0E48\u0E32\u0E19\u0E1C\u0E25`,
      analysis: "\u0E1C\u0E25\u0E15\u0E23\u0E27\u0E08\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19",
      recommendation: "\u0E40\u0E23\u0E48\u0E07\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E25\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14 TAT",
      ...u
    }), E.cost_analysis?.top_drugs?.length > 0) {
    const i = E.cost_analysis.top_drugs[0];
    a.unshift({
      title: "Drug Cost Intelligence",
      icon: "\u{1F4B0}",
      priority: "HIGH",
      summary: `Top cost: ${i.name?.substring(0,40)} \u2014 \u0E3F${(i.cost/1e3).toFixed(0)}K`,
      analysis: "15 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E22\u0E32\u0E17\u0E35\u0E48\u0E21\u0E35\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
      recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Formulary \u0E41\u0E25\u0E30\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 Generic substitution",
      ...u
    })
  }
  if (E.high_alert_drugs?.length > 0 && a.push({
      title: "High-Alert Drug Monitor",
      icon: "\u26A0\uFE0F",
      priority: "HIGH",
      summary: `${E.high_alert_drugs.length} High-alert drugs \u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E0A\u0E49\u0E2D\u0E22\u0E39\u0E48`,
      analysis: E.high_alert_drugs.slice(0, 3).map(i => `${i.name} (${i.patients} \u0E23\u0E32\u0E22)`).join(", "),
      recommendation: "Double-check \u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E08\u0E48\u0E32\u0E22\u0E22\u0E32 High-alert (ISMP)",
      ...u
    }), E.optimization?.generic_substitution?.length > 0 && a.push({
      title: "Generic Substitution",
      icon: "\u{1F48A}",
      priority: "MEDIUM",
      summary: `${E.optimization.generic_substitution.length} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E22\u0E32 Original \u0E17\u0E35\u0E48\u0E21\u0E35 Generic \u0E17\u0E14\u0E41\u0E17\u0E19\u0E44\u0E14\u0E49`,
      analysis: E.optimization.generic_substitution.slice(0, 2).map(i => i.drug?.substring(0, 30)).join(", "),
      recommendation: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E40\u0E1B\u0E47\u0E19 Generic \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19",
      ...u
    }), E.critical_values?.count > 0 && a.unshift({
      title: "Critical Lab Values",
      icon: "\u{1F9EA}",
      priority: "HIGH",
      summary: `${E.critical_values.count} Critical values \u0E43\u0E19 24 \u0E0A\u0E21.`,
      analysis: E.critical_values.alerts?.slice(0, 3).map(i => `${i.test_name}: ${i.result} (${i.patient_name})`).join("; ") || "",
      recommendation: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E25\u0E49\u0E27\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22",
      ...u
    }), E.bottlenecks?.length > 0 && a.push({
      title: "Lab TAT Bottlenecks",
      icon: "\u{1F50D}",
      priority: "MEDIUM",
      summary: `${E.bottlenecks.length} tests TAT \u0E2A\u0E39\u0E07`,
      analysis: E.bottlenecks.map(i => `${i.test}: ${i.avg_tat} \u0E19\u0E32\u0E17\u0E35`).join(", "),
      recommendation: E.bottlenecks[0]?.recommendation || "\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 workflow",
      ...u
    }), E.ha_readiness) {
    const i = E.ha_readiness;
    a.unshift({
      title: "HA Readiness Score",
      icon: i.overall_score >= 85 ? "\u2705" : i.overall_score >= 70 ? "\u26A0\uFE0F" : "\u{1F534}",
      priority: i.overall_score >= 85 ? "LOW" : i.overall_score >= 70 ? "MEDIUM" : "HIGH",
      summary: `HA Score: ${i.overall_score}/100 \u2014 ${i.status==="ready"?"\u0E1E\u0E23\u0E49\u0E2D\u0E21 Survey":i.status==="needs_improvement"?"\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07":"\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07"}`,
      analysis: `Mortality: ${i.scores?.mortality}, Readmission: ${i.scores?.readmission}, Infection: ${i.scores?.infection}, Completion: ${i.scores?.completion}`,
      recommendation: i.overall_score < 85 ? "\u0E40\u0E23\u0E48\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E17\u0E35\u0E48\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E48\u0E2D\u0E19 HA Survey" : "\u0E23\u0E31\u0E01\u0E29\u0E32\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E1A Survey",
      ...u
    })
  }
  if (E.segmentation?.by_age?.length > 0) {
    const i = E.segmentation.by_age[0];
    a.unshift({
      title: "Patient Segmentation",
      icon: "\u{1F3AF}",
      priority: "MEDIUM",
      summary: `\u0E01\u0E25\u0E38\u0E48\u0E21 ${i.age_group} \u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 (${i.patients?.toLocaleString()} \u0E04\u0E19, ${i.revenue_share}% revenue)`,
      analysis: `\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C ${E.segmentation.by_age.length} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38, ${E.segmentation.by_payer?.length||0} \u0E2A\u0E34\u0E17\u0E18\u0E34`,
      recommendation: "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 Patient Experience",
      ...u
    })
  }
  if (E.loyalty?.length > 0) {
    const i = E.loyalty.find(r => r.segment?.includes("Loyal"));
    a.push({
      title: "Patient Loyalty Analysis",
      icon: "\u2764\uFE0F",
      priority: "LOW",
      summary: i ? `Loyal patients: ${i.patients?.toLocaleString()} \u0E04\u0E19 (7+ visits/year)` : "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C",
      analysis: E.loyalty.map(r => `${r.segment}: ${r.patients?.toLocaleString()}`).join(" \xB7 "),
      recommendation: "\u0E2A\u0E23\u0E49\u0E32\u0E07 Loyalty program \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Frequent visitors",
      ...u
    })
  }
  if (E.top_services?.length > 0) {
    const i = E.top_services[0];
    a.unshift({
      title: "Top Thai Med Service",
      icon: "\u{1F33F}",
      priority: "MEDIUM",
      summary: `\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14: ${i.service_name||i.name||"\u2014"} (${(i.visits||i.count||0).toLocaleString()} \u0E04\u0E23\u0E31\u0E49\u0E07)`,
      analysis: `\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E32\u0E01 ${E.top_services.length} \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22`,
      recommendation: "\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E19\u0E34\u0E22\u0E21\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
      ...u
    })
  }
  if (E.executive_kpis) {
    const i = E.executive_kpis;
    Object.entries(i).slice(0, 3).forEach(([r, o]) => {
      a.push({
        title: `KPI: ${r.replace(/_/g," ").toUpperCase()}`,
        icon: "\u{1F4CA}",
        priority: typeof o == "number" && o < 0 ? "HIGH" : "LOW",
        summary: typeof o == "object" ? JSON.stringify(o).substring(0, 80) : String(o),
        analysis: "Executive KPI summary \u0E08\u0E32\u0E01 AI Report Engine",
        recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 KPI \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E16\u0E31\u0E14\u0E44\u0E1B",
        ...u
      })
    })
  }
  if (E.yoy_growth != null) {
    const i = E.yoy_growth;
    a.unshift({
      title: "Year-on-Year Growth",
      icon: i >= 0 ? "\u{1F4C8}" : "\u{1F4C9}",
      priority: Math.abs(i) > 15 ? "HIGH" : Math.abs(i) > 5 ? "MEDIUM" : "LOW",
      summary: `YoY Growth: ${i>=0?"+":""}${i}%`,
      analysis: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",
      recommendation: i < 0 ? "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E25\u0E07 \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E17\u0E35\u0E48\u0E21\u0E35\u0E1C\u0E25\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E2A\u0E39\u0E07" : "\u0E23\u0E31\u0E01\u0E29\u0E32\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15 \u2014 \u0E02\u0E22\u0E32\u0E22\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E17\u0E33\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E14\u0E35",
      ...u
    })
  }
  if (E.dept_ranking?.length > 0) {
    const i = E.dept_ranking[0];
    a.push({
      title: "Top Department",
      icon: "\u{1F3C6}",
      priority: "LOW",
      summary: `\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A 1: ${i.dept||i.department||"\u2014"} \u2014 \u0E3F${((i.revenue||i.total||0)/1e6).toFixed(1)}M`,
      analysis: `\u0E08\u0E31\u0E14\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E08\u0E32\u0E01 ${E.dept_ranking.length} \u0E41\u0E1C\u0E19\u0E01`,
      recommendation: "\u0E28\u0E36\u0E01\u0E29\u0E32 Best practice \u0E08\u0E32\u0E01 Top department \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E02\u0E22\u0E32\u0E22\u0E1C\u0E25\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E41\u0E1C\u0E19\u0E01\u0E2D\u0E37\u0E48\u0E19",
      ...u
    })
  }
  if (E.fiscal_years?.length >= 2) {
    const i = E.fiscal_years,
      r = i[i.length - 1],
      o = i[i.length - 2],
      n = r.comparable_revenue ?? r.total_revenue ?? 0,
      l = o.comparable_revenue ?? o.total_revenue ?? 0,
      s = l > 0 ? Math.round((n - l) / l * 1e3) / 10 : 0;
    a.unshift({
      title: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
      icon: "\u{1F4C5}",
      priority: Math.abs(s) > 10 ? "HIGH" : "LOW",
      summary: `${r.fiscal_label||"\u0E1B\u0E35\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"}: \u0E3F${(n/1e6).toFixed(1)}M (${s>=0?"+":""}${s}% vs ${o.fiscal_label||"\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"})`,
      analysis: `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${i.length} \u0E1B\u0E35 \u2014 Comparable months analysis`,
      recommendation: s < -5 ? "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E25\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22" : "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E27\u0E01 \u2014 \u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E15\u0E48\u0E2D\u0E44\u0E1B",
      ...u
    })
  }
  return a
}

function C0({
  data: E,
  theme: e = "default",
  title: u = "AI Intelligence"
}) {
  const a = $.useMemo(() => j0(E, e), [E, e]);
  return !E || a.length === 0 ? null : t.jsxs("div", {
    style: {
      marginTop: "1.5rem"
    },
    children: [t.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: "1rem"
      },
      children: [t.jsx("span", {
        style: {
          fontSize: 20
        },
        children: "\u{1F9E0}"
      }), t.jsx("h3", {
        style: {
          margin: 0,
          fontSize: 14,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--md-text-primary)"
        },
        children: u
      }), t.jsx("span", {
        style: {
          fontSize: 10,
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: 4,
          background: "rgba(124,58,237,.08)",
          color: "#7c3aed",
          textTransform: "uppercase"
        },
        children: "Server-Side AI"
      })]
    }), t.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1rem"
      },
      children: a.map((i, r) => t.jsx(X, {
        ...i,
        confidence: 90,
        lastUpdated: "just now"
      }, r))
    })]
  })
}
const _0 = ({
  level: E = "MEDIUM",
  text: e,
  icon: u = !0,
  size: a = "sm"
}) => {
  const i = {
      HIGH: {
        bg: "rgba(244,63,94,.15)",
        text: "#f43f5e",
        icon: "\u{1F534}",
        label: "HIGH"
      },
      MEDIUM: {
        bg: "rgba(245,158,11,.15)",
        text: "#f59e0b",
        icon: "\u{1F7E1}",
        label: "MEDIUM"
      },
      LOW: {
        bg: "rgba(16,185,129,.15)",
        text: "#10b981",
        icon: "\u{1F7E2}",
        label: "LOW"
      },
      INFO: {
        bg: "rgba(59,130,246,.15)",
        text: "#3b82f6",
        icon: "\u{1F535}",
        label: "INFO"
      },
      SUCCESS: {
        bg: "rgba(16,185,129,.15)",
        text: "#10b981",
        icon: "\u2705",
        label: "SUCCESS"
      }
    },
    r = i[E] || i.MEDIUM,
    o = {
      sm: "10px",
      md: "11px",
      lg: "12px"
    };
  return t.jsxs("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontSize: o[a],
      fontWeight: 800,
      padding: a === "sm" ? "2px 6px" : a === "md" ? "4px 8px" : "6px 10px",
      borderRadius: "4px",
      background: r.bg,
      color: r.text,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap"
    },
    children: [u && t.jsx("span", {
      children: r.icon
    }), t.jsx("span", {
      children: e || r.label
    })]
  })
};
F.memo(_0);
const u0 = {
    normal: {
      color: "#7c3aed",
      bg: "rgba(124,58,237,.1)"
    },
    warning: {
      color: "#f59e0b",
      bg: "rgba(245,158,11,.1)"
    },
    critical: {
      color: "#f43f5e",
      bg: "rgba(244,63,94,.1)"
    },
    success: {
      color: "#10b981",
      bg: "rgba(16,185,129,.1)"
    }
  },
  w0 = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  k0 = {
    margin: 0,
    fontSize: "12px",
    fontWeight: 700,
    color: "var(--md-text-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  },
  T0 = {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginBottom: "8px"
  },
  R0 = {
    fontSize: "12px",
    color: "var(--md-text-secondary)",
    fontWeight: 600
  },
  P0 = {
    marginTop: "8px"
  },
  I0 = {
    fontSize: "11px",
    color: "var(--md-text-tertiary)",
    marginBottom: "4px"
  },
  W0 = {
    height: "4px",
    borderRadius: "99px",
    background: "rgba(255,255,255,.1)",
    overflow: "hidden"
  },
  M0 = ({
    label: E,
    value: e,
    unit: u = "",
    target: a,
    trend: i,
    status: r = "normal",
    icon: o = "\u{1F4CA}",
    gradient: n = "#7c3aed"
  }) => {
    const l = u0[r] || u0.normal,
      s = i != null && Number.isFinite(Number(i)),
      d = s ? Number(i) : 0,
      x = d > 0 ? "#10b981" : d < 0 ? "#f43f5e" : "#94a3b8",
      p = d > 0 ? "\u2191" : d < 0 ? "\u2193" : "\u2192",
      f = typeof e == "number" ? e : parseFloat(e),
      m = Number.isFinite(f);
    return t.jsxs("div", {
      style: {
        padding: "1rem",
        borderRadius: "12px",
        background: `linear-gradient(135deg, ${l.bg}, transparent)`,
        border: `1px solid ${l.color}30`,
        backdropFilter: "blur(8px)"
      },
      children: [t.jsxs("div", {
        style: w0,
        children: [t.jsxs("p", {
          style: k0,
          children: [o, " ", E]
        }), s && t.jsxs("span", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: x,
            display: "flex",
            alignItems: "center",
            gap: "2px"
          },
          children: [p, " ", d > 0 ? "+" : "", d, "%"]
        })]
      }), t.jsxs("div", {
        style: T0,
        children: [t.jsx("span", {
          style: {
            fontSize: "28px",
            fontWeight: 900,
            color: l.color,
            lineHeight: 1
          },
          children: e
        }), u && t.jsx("span", {
          style: R0,
          children: u
        })]
      }), a != null && m && t.jsxs("div", {
        style: P0,
        children: [t.jsxs("div", {
          style: I0,
          children: ["Target: ", a, typeof a == "number" && u && !String(u).includes("%") ? u : ""]
        }), t.jsx("div", {
          style: W0,
          children: t.jsx("div", {
            style: {
              height: "100%",
              borderRadius: "99px",
              background: `linear-gradient(90deg, ${l.color}, ${l.color}dd)`,
              width: `${Math.min(Math.max(f/a*100,0),100)}%`,
              transition: "width 0.5s ease"
            }
          })
        })]
      })]
    })
  },
  L0 = F.memo(M0),
  z0 = ({
    metrics: E = [],
    columns: e = "auto-fit",
    gap: u = "12px",
    minWidth: a = "165px"
  }) => {
    const i = e === "auto-fit" ? `grid-template-columns: repeat(auto-fit, minmax(${a}, 1fr))` : `grid-template-columns: repeat(${e}, 1fr)`;
    return t.jsx("div", {
      style: {
        display: "grid",
        gap: u,
        [i.split(":")[0]]: i.split(":")[1]
      },
      children: E.map((r, o) => t.jsx(L0, {
        label: r.label,
        value: r.value,
        unit: r.unit,
        target: r.target,
        trend: r.trend,
        status: r.status,
        icon: r.icon,
        gradient: r.gradient
      }, o))
    })
  },
  O0 = F.memo(z0),
  e0 = {
    sm: {
      outer: 100,
      inner: 80,
      fontSize: 24
    },
    md: {
      outer: 140,
      inner: 110,
      fontSize: 32
    },
    lg: {
      outer: 180,
      inner: 140,
      fontSize: 40
    }
  },
  H0 = ({
    score: E = 75,
    max: e = 100,
    label: u = "Health Score",
    icon: a = "\u{1F3E5}",
    color: i = "#7c3aed",
    size: r = "md",
    showSegments: o = !1,
    segments: n = []
  }) => {
    const l = e0[r] || e0.md,
      {
        radius: s,
        circumference: d,
        offset: x,
        scoreColor: p
      } = $.useMemo(() => {
        const f = l.outer / 2,
          m = 2 * Math.PI * (f - 15),
          b = E / e * 100,
          h = m - b / 100 * m,
          v = E >= 80 ? "#10b981" : E >= 60 ? "#f59e0b" : "#f43f5e";
        return {
          radius: f,
          circumference: m,
          offset: h,
          scoreColor: v
        }
      }, [E, e, l.outer]);
    return t.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px"
      },
      children: [t.jsxs("div", {
        style: {
          position: "relative",
          width: l.outer,
          height: l.outer
        },
        children: [t.jsxs("svg", {
          width: l.outer,
          height: l.outer,
          style: {
            transform: "rotate(-90deg)"
          },
          children: [t.jsx("circle", {
            cx: s,
            cy: s,
            r: s - 15,
            fill: "none",
            stroke: "rgba(255,255,255,.1)",
            strokeWidth: "10"
          }), t.jsx("circle", {
            cx: s,
            cy: s,
            r: s - 15,
            fill: "none",
            stroke: p,
            strokeWidth: "10",
            strokeDasharray: d,
            strokeDashoffset: x,
            strokeLinecap: "round",
            style: {
              transition: "stroke-dashoffset 0.8s ease",
              filter: `drop-shadow(0 0 8px ${p}40)`
            }
          })]
        }), t.jsxs("div", {
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center"
          },
          children: [t.jsx("div", {
            style: {
              fontSize: "20px",
              marginBottom: "4px"
            },
            children: a
          }), t.jsx("div", {
            style: {
              fontSize: l.fontSize,
              fontWeight: 900,
              color: p,
              lineHeight: 1
            },
            children: Math.round(E)
          }), t.jsxs("div", {
            style: {
              fontSize: "11px",
              color: "var(--md-text-secondary)",
              fontWeight: 600,
              marginTop: "4px"
            },
            children: ["/ ", e]
          })]
        })]
      }), t.jsxs("div", {
        style: {
          textAlign: "center"
        },
        children: [t.jsx("p", {
          style: {
            margin: 0,
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          },
          children: u
        }), t.jsx("p", {
          style: {
            margin: "4px 0 0",
            fontSize: "12px",
            color: p,
            fontWeight: 700
          },
          children: E >= 80 ? "\u2705 Excellent" : E >= 60 ? "\u26A0\uFE0F Caution" : "\u{1F534} Critical"
        })]
      }), o && n.length > 0 && t.jsx("div", {
        style: {
          width: "100%"
        },
        children: n.map((f, m) => t.jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "6px",
            fontSize: "12px"
          },
          children: [t.jsx("div", {
            style: {
              width: "8px",
              height: "8px",
              borderRadius: "2px",
              background: f.color
            }
          }), t.jsx("span", {
            style: {
              flex: 1,
              color: "var(--md-text-secondary)"
            },
            children: f.label
          }), t.jsxs("span", {
            style: {
              fontWeight: 700,
              color: "var(--md-text-primary)"
            },
            children: [f.value, "/100"]
          })]
        }, m))
      })]
    })
  },
  N0 = F.memo(H0),
  U0 = ({
    severity: E = "warning",
    title: e,
    message: u,
    icon: a = "\u{1F6A8}",
    actions: i = [],
    onDismiss: r
  }) => {
    const o = {
        critical: {
          bg: "linear-gradient(135deg, rgba(244,63,94,.15), rgba(239,68,68,.1))",
          border: "#f43f5e",
          text: "#f43f5e",
          light: "rgba(244,63,94,.08)"
        },
        warning: {
          bg: "linear-gradient(135deg, rgba(245,158,11,.15), rgba(251,146,60,.1))",
          border: "#f59e0b",
          text: "#f59e0b",
          light: "rgba(245,158,11,.08)"
        },
        info: {
          bg: "linear-gradient(135deg, rgba(59,130,246,.15), rgba(96,165,250,.1))",
          border: "#3b82f6",
          text: "#3b82f6",
          light: "rgba(59,130,246,.08)"
        },
        success: {
          bg: "linear-gradient(135deg, rgba(16,185,129,.15), rgba(34,197,94,.1))",
          border: "#10b981",
          text: "#10b981",
          light: "rgba(16,185,129,.08)"
        }
      },
      n = o[E] || o.warning;
    return t.jsxs("div", {
      style: {
        background: n.bg,
        border: `1.5px solid ${n.border}`,
        borderLeft: `4px solid ${n.border}`,
        borderRadius: "12px",
        padding: "1.25rem",
        backdropFilter: "blur(12px)"
      },
      children: [t.jsxs("div", {
        style: {
          display: "flex",
          gap: "12px"
        },
        children: [t.jsx("div", {
          style: {
            fontSize: "24px",
            flexShrink: 0
          },
          children: a
        }), t.jsxs("div", {
          style: {
            flex: 1
          },
          children: [t.jsx("h3", {
            style: {
              margin: 0,
              fontSize: "14px",
              fontWeight: 800,
              color: n.text,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "6px"
            },
            children: e
          }), t.jsx("p", {
            style: {
              margin: 0,
              fontSize: "12px",
              color: "var(--md-text-primary)",
              fontWeight: 500,
              lineHeight: 1.6
            },
            children: u
          })]
        }), r && t.jsx("button", {
          onClick: r,
          style: {
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "var(--md-text-tertiary)",
            padding: "4px",
            flexShrink: 0
          },
          children: "\u2715"
        })]
      }), i.length > 0 && t.jsx("div", {
        style: {
          display: "flex",
          gap: "8px",
          marginTop: "12px",
          flexWrap: "wrap"
        },
        children: i.map((l, s) => t.jsx("button", {
          onClick: l.onClick,
          style: {
            padding: "6px 14px",
            fontSize: "12px",
            fontWeight: 700,
            border: l.primary ? "none" : `1px solid ${n.border}`,
            borderRadius: "6px",
            background: l.primary ? n.border : n.light,
            color: l.primary ? "#fff" : n.text,
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.2s ease"
          },
          onMouseEnter: d => {
            d.target.style.transform = "translateY(-2px)", d.target.style.boxShadow = `0 4px 12px ${n.border}40`
          },
          onMouseLeave: d => {
            d.target.style.transform = "none", d.target.style.boxShadow = "none"
          },
          children: l.label
        }, s))
      })]
    })
  };
class G0 extends F.Component {
  constructor(e) {
    super(e), this.state = {
      hasError: !1,
      error: null
    }
  }
  static getDerivedStateFromError(e) {
    return {
      hasError: !0,
      error: e
    }
  }
  componentDidCatch(e, u) {}
  render() {
    return this.state.hasError ? t.jsxs("div", {
      className: "rounded-2xl p-4",
      style: {
        background: "rgba(239,68,68,.04)",
        border: "1px solid rgba(239,68,68,.15)",
        textAlign: "center"
      },
      children: [t.jsx("span", {
        style: {
          fontSize: "24px"
        },
        children: "\u26A0\uFE0F"
      }), t.jsxs("p", {
        style: {
          fontSize: "12px",
          fontWeight: 700,
          color: "#dc2626",
          margin: "4px 0"
        },
        children: [this.props.name || "Section", " \u2014 \u0E42\u0E2B\u0E25\u0E14\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08"]
      }), t.jsx("button", {
        onClick: () => this.setState({
          hasError: !1,
          error: null
        }),
        style: {
          fontSize: "12px",
          fontWeight: 700,
          color: "#0284c7",
          background: "none",
          border: "none",
          cursor: "pointer",
          textDecoration: "underline"
        },
        children: "\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48"
      })]
    }) : this.props.children
  }
}
const V0 = F.memo(G0),
  c = (E, e = 0) => {
    if (E == null || E === "") return e;
    const u = Number(E);
    return Number.isFinite(u) ? u : e
  };

function g(E, e = 0) {
  return E == null || E === "" || Number.isNaN(Number(E)) ? "\u2014" : Number(E).toLocaleString("th-TH", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  })
}

function Y0(E, e = 1) {
  return E == null || Number.isNaN(Number(E)) ? "\u2014" : `${Number(E).toFixed(e)}%`
}

function q0({
  icon: E,
  title: e,
  text: u,
  list: a,
  color: i = "#7c3aed"
}) {
  return t.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderLeft: `3px solid ${i}`,
      borderRadius: "10px",
      padding: "14px 16px"
    },
    children: [t.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px"
      },
      children: [t.jsx("span", {
        style: {
          fontSize: "16px"
        },
        children: E
      }), t.jsx("span", {
        style: {
          fontWeight: 800,
          fontSize: "13px",
          color: "var(--md-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em"
        },
        children: e
      })]
    }), u && t.jsx("p", {
      style: {
        fontSize: "13px",
        color: "var(--md-text-primary)",
        lineHeight: 1.7,
        margin: 0,
        fontWeight: 500
      },
      children: u
    }), a && t.jsx("ul", {
      style: {
        margin: "4px 0 0 0",
        paddingLeft: "18px"
      },
      children: a.map((r, o) => t.jsx("li", {
        style: {
          fontSize: "13px",
          color: "var(--md-text-primary)",
          lineHeight: 1.7,
          fontWeight: 500,
          marginBottom: "3px"
        },
        children: r
      }, o))
    })]
  })
}

function Q0({
  label: E,
  value: e,
  sub: u,
  color: a = "#7c3aed",
  accent: i,
  onClick: r
}) {
  return t.jsxs("div", {
    onClick: r,
    role: r ? "button" : void 0,
    tabIndex: r ? 0 : void 0,
    onKeyDown: r ? o => {
      (o.key === "Enter" || o.key === " ") && (o.preventDefault(), r())
    } : void 0,
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderTop: `3px solid ${a}`,
      borderRadius: "10px",
      padding: "10px 12px",
      minWidth: 0,
      cursor: r ? "pointer" : "default",
      transition: r ? "transform 0.15s, box-shadow 0.15s, border-color 0.15s" : void 0,
      outline: "none"
    },
    onMouseEnter: r ? o => {
      o.currentTarget.style.transform = "translateY(-1px)", o.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,.08)"
    } : void 0,
    onMouseLeave: r ? o => {
      o.currentTarget.style.transform = "", o.currentTarget.style.boxShadow = ""
    } : void 0,
    children: [t.jsx("div", {
      style: {
        fontSize: "11px",
        fontWeight: 800,
        color: "var(--md-text-tertiary)",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        marginBottom: "4px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      },
      children: E
    }), t.jsx("div", {
      style: {
        fontSize: "17px",
        fontWeight: 900,
        color: i || a,
        lineHeight: 1.1
      },
      children: e
    }), u && t.jsx("div", {
      style: {
        fontSize: "11px",
        color: "var(--md-text-tertiary)",
        marginTop: "3px",
        fontWeight: 600
      },
      children: u
    })]
  })
}

function K0({
  title: E = "AI Executive Analysis",
  subtitle: e,
  badge: u = "\u{1F4D0} Rule-based Analysis",
  accentColor: a = "#7c3aed",
  headerGradient: i,
  narrative: r
}) {
  if (!r) return null;
  const o = r.headlineColor || a,
    n = `linear-gradient(135deg, ${a}14, ${a}08)`;
  return t.jsxs("div", {
    className: "rounded-2xl overflow-hidden",
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      boxShadow: "var(--md-shadow-sm)",
      marginTop: "16px"
    },
    children: [t.jsxs("div", {
      style: {
        padding: "14px 20px",
        borderBottom: "1px solid var(--md-border)",
        background: i || n,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [t.jsx("span", {
        style: {
          fontSize: "18px"
        },
        children: "\u{1F9E0}"
      }), t.jsxs("div", {
        style: {
          flex: 1,
          minWidth: 0
        },
        children: [t.jsx("div", {
          style: {
            fontSize: "14px",
            fontWeight: 900,
            color: "var(--md-text-primary)"
          },
          children: E
        }), e && t.jsx("div", {
          style: {
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--md-text-tertiary)",
            marginTop: "2px"
          },
          children: e
        })]
      }), t.jsx("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: `${a}18`,
          color: a,
          border: `1px solid ${a}40`
        },
        children: u
      })]
    }), t.jsx("div", {
      style: {
        padding: "18px 20px"
      },
      children: r.empty ? t.jsx("div", {
        style: {
          padding: "14px 16px",
          background: "rgba(251,191,36,.08)",
          borderLeft: "3px solid #f59e0b",
          borderRadius: "10px",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--md-text-primary)"
        },
        children: r.headline
      }) : t.jsxs(t.Fragment, {
        children: [r.headline && t.jsx("div", {
          style: {
            padding: "14px 16px",
            background: `${o}14`,
            borderLeft: `3px solid ${o}`,
            borderRadius: "10px",
            marginBottom: "14px",
            fontSize: "14px",
            fontWeight: 700,
            color: "var(--md-text-primary)",
            lineHeight: 1.6
          },
          children: r.headline
        }), Array.isArray(r.kpi) && r.kpi.length > 0 && t.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "8px",
            marginBottom: "14px"
          },
          children: r.kpi.map((l, s) => t.jsx(Q0, {
            ...l
          }, s))
        }), Array.isArray(r.sections) && r.sections.length > 0 && t.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "10px"
          },
          children: r.sections.map((l, s) => t.jsx(q0, {
            ...l
          }, s))
        }), (r.footer || r.footerLeft) && t.jsxs("div", {
          style: {
            marginTop: "14px",
            padding: "10px 14px",
            background: "var(--md-surface-2, rgba(0,0,0,.02))",
            borderRadius: "8px",
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "6px"
          },
          children: [t.jsx("span", {
            children: r.footerLeft || ""
          }), t.jsx("span", {
            children: r.footer || "\u26A0 \u0E01\u0E32\u0E23\u0E15\u0E31\u0E14\u0E2A\u0E34\u0E19\u0E43\u0E08\u0E40\u0E0A\u0E34\u0E07\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E04\u0E27\u0E23\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E32\u0E07\u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E41\u0E25\u0E30\u0E1A\u0E23\u0E34\u0E1A\u0E17\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E15\u0E34\u0E21"
          })]
        })]
      })
    })]
  })
}
const y = (E, e, u) => E >= e ? "#10b981" : E >= u ? "#f59e0b" : "#f43f5e",
  A = (E, e, u) => E <= e ? "#10b981" : E <= u ? "#f59e0b" : "#f43f5e";

function J0(E) {
  const e = E?.opdToday;
  if (!e) return null;
  const u = c(e.today_total ?? e.total_visits),
    a = c(e.completed),
    i = c(e.still_here_breakdown?.likely_waiting ?? e.still_here),
    r = c(e.sla_pct),
    o = c(e.avg_total_minutes ?? e.avg_wait_minutes),
    n = c(e.p90_wait),
    l = c(e.dropout_pct),
    s = c(e.capacity_utilization),
    d = c(e.throughput);
  let x, p;
  return n >= 90 || l >= 10 ? (x = `\u{1F534} OPD \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E21\u0E35 Bottleneck \u2014 P90 Wait ${n} \u0E19\u0E32\u0E17\u0E35 \xB7 Dropout ${l.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21 capacity \u0E17\u0E31\u0E19\u0E17\u0E35`, p = "#f43f5e") : r >= 80 && o <= 30 ? (x = `\u2705 OPD \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u2014 SLA ${r.toFixed(0)}% \xB7 Avg Wait ${o.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 \xB7 Visits ${g(u)} \u0E23\u0E32\u0E22`, p = "#10b981") : (x = `OPD \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${g(u)} \u0E23\u0E32\u0E22 (\u0E08\u0E1A\u0E41\u0E25\u0E49\u0E27 ${g(a)} \xB7 \u0E22\u0E31\u0E07\u0E23\u0E2D ${g(i)}) \xB7 SLA ${r.toFixed(0)}% \xB7 Avg Wait ${o.toFixed(0)} \u0E19\u0E32\u0E17\u0E35`, p = "#0ea5e9"), {
    headline: x,
    headlineColor: p,
    kpi: [{
      label: "Visits Today",
      value: g(u),
      sub: `\u0E08\u0E1A ${g(a)} \xB7 \u0E23\u0E2D ${g(i)}`,
      color: "#0284c7"
    }, {
      label: "SLA %",
      value: `${r.toFixed(0)}%`,
      sub: r >= 80 ? "\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C" : "\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C",
      color: y(r, 80, 65)
    }, {
      label: "Avg Wait",
      value: `${o.toFixed(0)} \u0E19\u0E32\u0E17\u0E35`,
      sub: `P90: ${n} \u0E19\u0E32\u0E17\u0E35`,
      color: A(o, 30, 45)
    }, {
      label: "Dropout %",
      value: `${l.toFixed(1)}%`,
      sub: l >= 10 ? "\u0E2A\u0E39\u0E07" : l >= 5 ? "\u0E1B\u0E01\u0E15\u0E34" : "\u0E15\u0E48\u0E33",
      color: A(l, 5, 10)
    }, {
      label: "Throughput",
      value: `${d}/\u0E0A\u0E21.`,
      sub: d >= 20 ? "\u0E14\u0E35" : "\u0E15\u0E48\u0E33",
      color: y(d, 20, 10)
    }, {
      label: "Capacity",
      value: `${s.toFixed(0)}%`,
      sub: s >= 95 ? "\u0E40\u0E15\u0E47\u0E21" : s >= 80 ? "\u0E43\u0E01\u0E25\u0E49\u0E40\u0E15\u0E47\u0E21" : "\u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48",
      color: s >= 95 ? "#f43f5e" : s >= 80 ? "#f59e0b" : "#10b981"
    }],
    sections: [{
      icon: "\u23F1\uFE0F",
      title: "Wait Time & Flow",
      text: `Average Wait ${o.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 \xB7 P90 ${n} \u0E19\u0E32\u0E17\u0E35 \xB7 SLA ${r.toFixed(1)}%. ${n>=90?"Tail \u0E22\u0E32\u0E27 \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 bottleneck \u0E17\u0E35\u0E48\u0E08\u0E38\u0E14\u0E43\u0E14\u0E08\u0E38\u0E14\u0E2B\u0E19\u0E36\u0E48\u0E07 (\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u2192\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C \u0E2B\u0E23\u0E37\u0E2D \u0E23\u0E2D\u0E22\u0E32)":o<=30?"Patient Flow \u0E44\u0E2B\u0E25\u0E25\u0E37\u0E48\u0E19":"\u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07"}`,
      color: A(n, 60, 90)
    }, {
      icon: "\u{1F4C9}",
      title: "Demand vs Capacity",
      text: `Visits ${g(u)} \u0E23\u0E32\u0E22 \xB7 \u0E08\u0E1A\u0E41\u0E25\u0E49\u0E27 ${g(a)} \xB7 \u0E22\u0E31\u0E07\u0E23\u0E2D ${g(i)} \xB7 Throughput ${d}/\u0E0A\u0E21. \xB7 Utilization ${s.toFixed(0)}%. ${s>=95?"\u26A0 \u0E41\u0E19\u0E48\u0E19\u0E40\u0E01\u0E34\u0E19 95% \u2014 \u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E2B\u0E23\u0E37\u0E2D extended hours":s<=60?"Under-utilization \u2014 marketing/outreach \u0E2D\u0E32\u0E08\u0E0A\u0E48\u0E27\u0E22":"Capacity balance \u0E14\u0E35"}`,
      color: s >= 95 || s <= 60 ? "#f59e0b" : "#10b981"
    }]
  }
}

function X0(E) {
  const e = E?.bedOccupancy?.summary,
    u = E?.alosData?.summary,
    a = E?.ipdAnalytics,
    i = E?.readmission;
  if (!e && !u && !a) return null;
  const r = c(e?.occupancy_rate),
    o = c(e?.total_beds),
    n = c(e?.occupied),
    l = c(u?.overall_alos),
    s = c(a?.readmit_rate),
    d = c(a?.readmit_count),
    x = c(a?.mortality_rate),
    p = c(a?.bed_turnover_rate),
    f = c(a?.overstay_pct),
    m = (i?.patients || []).filter(v => ["high", "moderate"].includes(v?.risk_level)).length;
  let b, h;
  return r >= 95 ? (b = `\u{1F534} Bed Capacity Crisis \u2014 Occupancy ${r.toFixed(0)}% (${n}/${o}) \xB7 \u0E01\u0E23\u0E30\u0E17\u0E1A admission flow \xB7 \u0E15\u0E49\u0E2D\u0E07 expedite discharge`, h = "#f43f5e") : x >= 3 || s > 10 ? (b = `\u26A0 IPD Quality \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Mortality ${x.toFixed(1)}% \xB7 Readmit ${s.toFixed(1)}% \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway + Discharge planning`, h = "#f59e0b") : l > 6 || f > 20 ? (b = `\u26A0 IPD Flow \u0E15\u0E49\u0E2D\u0E07 attention \u2014 ALOS ${l.toFixed(1)} \u0E27\u0E31\u0E19 \xB7 Overstay ${f.toFixed(1)}% \xB7 Clinical Pathway review`, h = "#f59e0b") : r >= 70 && r <= 85 && l <= 5 && x < 2 ? (b = `\u2705 IPD \u0E17\u0E33\u0E07\u0E32\u0E19\u0E43\u0E19 Optimal Zone \u2014 Occupancy ${r.toFixed(0)}% \xB7 ALOS ${l.toFixed(1)} \u0E27\u0E31\u0E19 \xB7 Mortality ${x.toFixed(1)}% \xB7 Patient Flow \u0E14\u0E35`, h = "#10b981") : (b = `IPD: Occupancy ${r.toFixed(0)}% (${n}/${o}) \xB7 ALOS ${l.toFixed(1)} \u0E27\u0E31\u0E19 \xB7 Readmit ${s.toFixed(1)}% \xB7 Mortality ${x.toFixed(1)}%`, h = "#0ea5e9"), {
    headline: b,
    headlineColor: h,
    kpi: [{
      label: "Occupancy",
      value: `${r.toFixed(0)}%`,
      sub: `${n}/${o} beds`,
      color: r >= 95 ? "#f43f5e" : r >= 85 ? "#f59e0b" : r >= 70 ? "#10b981" : "#0ea5e9"
    }, {
      label: "ALOS",
      value: `${l.toFixed(1)} \u0E27\u0E31\u0E19`,
      sub: l > 6 ? "\u0E22\u0E32\u0E27\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C" : "\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C",
      color: A(l, 5, 6)
    }, {
      label: "Readmit Rate",
      value: `${s.toFixed(1)}%`,
      sub: `${d} \u0E23\u0E32\u0E22 / \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 ${m}`,
      color: A(s, 5, 10)
    }, {
      label: "Mortality",
      value: `${x.toFixed(1)}%`,
      sub: x >= 3 ? "\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C HA" : x >= 2 ? "\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C",
      color: A(x, 2, 3)
    }, {
      label: "Bed Turnover",
      value: `${p.toFixed(1)}x`,
      sub: p >= 3 ? "\u0E14\u0E35" : "\u0E15\u0E48\u0E33",
      color: y(p, 3, 1.5)
    }, {
      label: "Overstay",
      value: `${f.toFixed(1)}%`,
      sub: f > 20 ? "\u0E2A\u0E39\u0E07" : "\u0E1B\u0E01\u0E15\u0E34",
      color: A(f, 10, 20)
    }],
    sections: [{
      icon: "\u{1F6CF}\uFE0F",
      title: "Bed Management",
      text: `${n}/${o} \u0E40\u0E15\u0E35\u0E22\u0E07\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49 (${r.toFixed(0)}%) \xB7 Turnover ${p.toFixed(1)}x. ${r>=95?"\u{1F534} \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 open surge beds, expedite discharge":r>=85?"\u0E43\u0E01\u0E25\u0E49\u0E40\u0E15\u0E47\u0E21 \u2014 monitor discharge pace":r>=70?"\u2705 Optimal range (70-85%)":"Under-utilized \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 marketing / service expansion"}`,
      color: r >= 95 ? "#f43f5e" : r >= 70 ? "#10b981" : "#f59e0b"
    }, {
      icon: "\u23F1\uFE0F",
      title: "ALOS & Overstay",
      text: `ALOS ${l.toFixed(1)} \u0E27\u0E31\u0E19 \xB7 Overstay ${f.toFixed(1)}%. ${l>6?"ALOS \u0E22\u0E32\u0E27 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Discharge planning + Clinical Pathway":f>20?"Overstay \u0E2A\u0E39\u0E07 \u2014 Daily Discharge Planning Meeting":"\u2705 LOS \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E14\u0E35"}`,
      color: l > 6 || f > 20 ? "#f59e0b" : "#10b981"
    }, {
      icon: "\u{1FA7A}",
      title: "Clinical Quality",
      text: `Readmit 30d ${s.toFixed(1)}% (${d} \u0E23\u0E32\u0E22 \xB7 \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 ${m}) \xB7 Mortality ${x.toFixed(1)}%. ${x>=3?"\u{1F534} Mortality \u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C HA 2% \u2014 M&M Conference + RCA":s>10?"\u26A0 Readmit \u0E2A\u0E39\u0E07 \u2014 post-discharge follow-up protocol":"\u2705 Quality indicators \u0E14\u0E35"}`,
      color: x >= 3 || s > 10 ? "#f43f5e" : "#10b981"
    }]
  }
}

function Z0(E) {
  const e = E?.erAnalytics,
    u = E?.erTodayPatients,
    a = E?.erSurge;
  if (!e && !u) return null;
  const i = c(e?.avg_time_to_doctor),
    r = c(e?.p90_time_to_doctor),
    o = c(e?.lwbs_rate),
    n = c(e?.return_visit_rate),
    l = e?.today_acuity || {},
    s = c(l.acuity_pct),
    d = !!a?.surge_alert,
    x = Array.isArray(u) ? u.length : u?.total ?? null,
    p = c(l.total ?? 0),
    f = x ?? p,
    m = d ? "critical" : o >= 2 ? "high" : "normal",
    b = c(l.resus),
    h = c(l.emerg),
    v = b + h;
  let B, D;
  return m === "critical" || o >= 5 ? (B = `\u{1F6A8} ER Surge \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07 ${f} \u0E23\u0E32\u0E22 \xB7 LWBS ${o.toFixed(1)}% \xB7 \u0E40\u0E23\u0E35\u0E22\u0E01 extra staff + open fast-track`, D = "#f43f5e") : r >= 60 || s >= 30 ? (B = `\u26A0 ER Under Pressure \u2014 P90 Time-to-Doctor ${r} \u0E19\u0E32\u0E17\u0E35 \xB7 High Acuity ${s.toFixed(0)}% \xB7 ${f} \u0E23\u0E32\u0E22`, D = "#f59e0b") : i <= 30 && o < 2 ? (B = `\u2705 ER Flow \u0E14\u0E35 \u2014 Door-to-Doc ${i.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 (P90 ${r}) \xB7 LWBS ${o.toFixed(1)}% \xB7 ${f} \u0E23\u0E32\u0E22 \u0E13 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19`, D = "#10b981") : (B = `ER: ${g(f)} \u0E23\u0E32\u0E22 \u0E13 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 \xB7 TTD ${i.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 \xB7 LWBS ${o.toFixed(1)}% \xB7 High Acuity ${s.toFixed(0)}%`, D = "#0ea5e9"), {
    headline: B,
    headlineColor: D,
    kpi: [{
      label: "Patients Now",
      value: g(f),
      sub: `\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07 \xB7 \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E23\u0E27\u0E21 ${g(p)}`,
      color: m === "critical" ? "#f43f5e" : m === "high" ? "#f59e0b" : "#10b981"
    }, {
      label: "Door-to-Doctor",
      value: `${i.toFixed(0)} \u0E19\u0E32\u0E17\u0E35`,
      sub: `P90: ${r} \u0E19\u0E32\u0E17\u0E35`,
      color: A(i, 30, 60)
    }, {
      label: "LWBS %",
      value: `${o.toFixed(1)}%`,
      sub: o >= 5 ? "\u0E27\u0E34\u0E01\u0E24\u0E15" : o >= 2 ? "\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u0E14\u0E35",
      color: A(o, 2, 5)
    }, {
      label: "High Acuity",
      value: `${s.toFixed(0)}%`,
      sub: `L1: ${b} \xB7 L2: ${h}`,
      color: s >= 30 ? "#f43f5e" : "#0ea5e9"
    }, {
      label: "Return 72h",
      value: `${n.toFixed(1)}%`,
      sub: "Bounce-back rate",
      color: A(n, 3, 5)
    }, {
      label: "Surge Status",
      value: d ? "\u{1F6A8} Active" : "\u2705 Normal",
      sub: d ? "Extra staff" : "Baseline",
      color: d ? "#f43f5e" : "#10b981"
    }],
    sections: [{
      icon: "\u26A1",
      title: "ER Throughput & Flow",
      text: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E13 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 ${g(f)} \u0E23\u0E32\u0E22 \xB7 Door-to-Doctor ${i.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 (P90 ${r}). ${r>=60?"Tail \u0E22\u0E32\u0E27 \u2014 bottleneck \u0E17\u0E35\u0E48 triage/physician assignment":i===0&&f>0?"Triage \u0E40\u0E23\u0E47\u0E27 \u0E41\u0E15\u0E48\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E23\u0E31\u0E01\u0E29\u0E32\u0E08\u0E23\u0E34\u0E07\u0E14\u0E49\u0E27\u0E22 (\u0E14\u0E39 ER Diversion)":"Flow \u0E1B\u0E01\u0E15\u0E34"}`,
      color: A(r, 60, 90)
    }, {
      icon: "\u{1F6A8}",
      title: "Acuity & Safety",
      text: `High Acuity ${s.toFixed(0)}% (L1 ${b} \xB7 L2 ${h}) \xB7 LWBS ${o.toFixed(1)}% \xB7 Return 72h ${n.toFixed(1)}%. ${s>=30?"\u26A0 Case mix \u0E2B\u0E19\u0E31\u0E01 \u2014 staff cognitive load \u0E2A\u0E39\u0E07":o>=5?"LWBS \u0E2A\u0E39\u0E07 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E21\u0E48\u0E23\u0E2D \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 missed care":"\u2705 Safety indicators \u0E14\u0E35"}`,
      color: s >= 30 || o >= 5 ? "#f59e0b" : "#10b981"
    }]
  }
}

function uu(E) {
  const e = E?.ncdToday,
    u = E?.ncdAnalytics;
  if (!e && !u) return null;
  const a = c(e?.total),
    i = c(e?.completed),
    r = a > 0 ? i / a * 100 : 0,
    o = c(u?.completion_rate),
    n = o > 0 ? o : r,
    l = c(u?.avg_wait_time ?? e?.avg_wait_time),
    s = c(u?.wait_sla_pct),
    d = c(u?.nci),
    x = c(u?.revisit_rate),
    p = c(u?.avg_revenue_per_visit),
    f = c(u?.avg_daily_visits),
    m = e?.diseases || e?.disease_breakdown || {},
    b = c(m.dm ?? m.DM),
    h = c(m.ht ?? m.HT),
    v = c(m.ckd ?? m.CKD);
  let B, D;
  return d > 0 && d < 50 ? (B = `\u{1F534} NCD \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 NCI ${d}/100 \xB7 Wait ${l}m (SLA ${s}%) \xB7 Revisit ${x.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07 intervention \u0E14\u0E48\u0E27\u0E19`, D = "#f43f5e") : l >= 45 || x >= 15 || s < 60 ? (B = `\u26A0 NCD \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Wait ${l}m \xB7 SLA ${s}% \xB7 Revisit ${x.toFixed(1)}% \xB7 NCI ${d}/100`, D = "#f59e0b") : d >= 80 && n >= 95 ? (B = `\u2705 NCD Care \u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 NCI ${d}/100 \xB7 Completion ${n.toFixed(1)}% \xB7 ${g(a)} \u0E23\u0E32\u0E22`, D = "#10b981") : (B = `NCD \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${g(a)} \u0E23\u0E32\u0E22 (DM ${b} \xB7 HT ${h} \xB7 CKD ${v}) \xB7 NCI ${d}/100 \xB7 Wait ${l}m \xB7 SLA ${s}%`, D = "#0ea5e9"), {
    headline: B,
    headlineColor: D,
    kpi: [{
      label: "Today",
      value: g(a),
      sub: `\u0E08\u0E1A ${i} \xB7 Avg daily ${Math.round(f)}`,
      color: "#0f766e"
    }, {
      label: "Disease Mix",
      value: `${b}/${h}`,
      sub: `DM/HT \xB7 CKD ${v}`,
      color: "#14b8a6"
    }, {
      label: "NCI Score",
      value: `${d}/100`,
      sub: d >= 80 ? "\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : d >= 60 ? "\u0E14\u0E35" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A",
      color: y(d, 80, 60)
    }, {
      label: "Avg Wait",
      value: `${l}m`,
      sub: `SLA ${s}%`,
      color: A(l, 30, 45)
    }, {
      label: "Revisit 7d",
      value: `${x.toFixed(1)}%`,
      sub: x <= 5 ? "\u0E14\u0E35" : x <= 15 ? "\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u0E2A\u0E39\u0E07",
      color: A(x, 5, 15)
    }, {
      label: "Rev / Visit",
      value: `\u0E3F${g(p)}`,
      sub: p >= 1200 ? "\u0E14\u0E35" : "\u0E1B\u0E01\u0E15\u0E34",
      color: y(p, 1200, 800)
    }],
    sections: [{
      icon: "\u{1FAC0}",
      title: "NCD Clinic Flow",
      text: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(a)} \u0E23\u0E32\u0E22 (\u0E08\u0E1A ${i}) \xB7 Avg daily ${f.toFixed(0)} \xB7 Wait ${l}m (SLA \u226430m: ${s}%) \xB7 Completion ${n.toFixed(1)}%. ${l>=45?"\u{1F534} Wait \u0E2A\u0E39\u0E07 \u2014 Pre-lab + Fast-track Stable NCD + \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E0A\u0E48\u0E27\u0E07 Peak (07:00) + Telemedicine refill":"\u2705 Flow \u0E1B\u0E01\u0E15\u0E34"}`,
      color: l >= 45 ? "#f43f5e" : "#10b981"
    }, {
      icon: "\u{1F3E5}",
      title: "Disease Control Intelligence",
      text: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: DM ${b} \xB7 HT ${h} \xB7 CKD ${v}. Revisit 7d ${x.toFixed(1)}%. ${x>=15?"\u26A0 Revisit \u0E2A\u0E39\u0E07 \u2014 \u0E41\u0E22\u0E01 Planned (Lab follow-up, \u0E1B\u0E23\u0E31\u0E1A\u0E22\u0E32) vs Unplanned (BP crisis, Hypoglycemia) \xB7 Home BP/FBS monitoring \xB7 \u0E1B\u0E23\u0E31\u0E1A\u0E22\u0E32\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E04\u0E23\u0E31\u0E49\u0E07\u0E41\u0E23\u0E01":"\u2705 Disease control \u0E14\u0E35"}. \u0E02\u0E32\u0E14\u0E19\u0E31\u0E14 = Uncontrolled \u2192 Complication (Stroke/MI/CKD) \u2192 IPD cost \u0E2A\u0E39\u0E07`,
      color: x >= 15 ? "#f59e0b" : "#10b981"
    }, {
      icon: "\u{1F4B0}",
      title: "NCD Revenue & Quality Index",
      text: `Rev/Visit \u0E3F${g(p)} \xB7 NCI ${d}/100. ${d<50?"\u{1F534} NCI \u0E15\u0E48\u0E33 \u2014 \u0E14\u0E39 lowest component (Wait/SLA/Completion/Revenue)":d>=80?"\u2705 NCI \u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21":"\u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 \xB7 \u0E40\u0E1E\u0E34\u0E48\u0E21 Annual NCD Screening + Complication screening (Eye/Foot/Kidney) \xB7 Corporate health check"}`,
      color: d < 50 ? "#f43f5e" : d >= 80 ? "#10b981" : "#f59e0b"
    }]
  }
}

function eu(E) {
  const e = E?.pharmacyToday,
    u = E?.pharmacyAnalytics;
  if (!e && !u) return null;
  const a = c(e?.total_prescriptions ?? u?.total_prescriptions),
    i = c(e?.opd_prescriptions),
    r = c(e?.ipd_prescriptions),
    o = c(e?.total_value),
    n = c(u?.generic_ratio),
    l = c(u?.drug_cost_per_rx),
    s = c(u?.avg_daily_rx),
    d = c(u?.rev_cost_ratio),
    x = c(u?.ppi),
    p = c(u?.on_duty?.pharmacists?.length),
    f = p > 0 ? Math.round(a / p) : 0;
  let m, b;
  return n < 30 ? (m = `\u{1F534} Generic Adoption \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 ${n.toFixed(1)}% (\u0E40\u0E1B\u0E49\u0E32 \u226580%) \xB7 PPI ${x}/100 \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22 Generic First \u0E14\u0E48\u0E27\u0E19`, b = "#f43f5e") : n < 50 || d < 1 ? (m = `\u26A0 Generic Substitution \u0E15\u0E48\u0E33 \u2014 ${n.toFixed(1)}% \xB7 Rev/Cost ${d.toFixed(2)} \xB7 \u0E40\u0E2A\u0E35\u0E22\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19`, b = "#f59e0b") : n >= 75 && d >= 1.3 && x >= 75 ? (m = `\u2705 \u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23\u0E23\u0E21\u0E21\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35 \u2014 Generic ${n.toFixed(0)}% \xB7 Rev/Cost ${d.toFixed(2)} \xB7 PPI ${x}/100`, b = "#10b981") : (m = `Pharmacy: ${g(a)} Rx (OPD ${i} \xB7 IPD ${r}) \xB7 Generic ${n.toFixed(1)}% \xB7 Cost/Rx \u0E3F${g(l)} \xB7 PPI ${x}/100`, b = "#0ea5e9"), {
    headline: m,
    headlineColor: b,
    kpi: [{
      label: "Rx Today",
      value: g(a),
      sub: `OPD ${i} \xB7 IPD ${r}`,
      color: "#10b981"
    }, {
      label: "Generic %",
      value: `${n.toFixed(1)}%`,
      sub: n >= 75 ? "\u0E14\u0E35" : n >= 50 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E15\u0E48\u0E33",
      color: y(n, 75, 50)
    }, {
      label: "Cost / Rx",
      value: `\u0E3F${g(l)}`,
      sub: l <= 300 ? "\u0E14\u0E35" : l <= 500 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E2A\u0E39\u0E07",
      color: A(l, 300, 500)
    }, {
      label: "Rev / Cost",
      value: d.toFixed(2),
      sub: d >= 1.3 ? "\u0E01\u0E33\u0E44\u0E23\u0E14\u0E35" : d >= 1 ? "\u0E1E\u0E2D\u0E43\u0E0A\u0E49" : "\u0E02\u0E32\u0E14\u0E17\u0E38\u0E19",
      color: y(d, 1.3, 1)
    }, {
      label: "PPI Score",
      value: `${x}/100`,
      sub: x >= 75 ? "\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : x >= 50 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A",
      color: y(x, 75, 50)
    }, {
      label: "Workload",
      value: p > 0 ? `${f}/\u0E04\u0E19` : `${g(Math.round(s))}/\u0E27\u0E31\u0E19`,
      sub: p > 0 ? `${p} \u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23` : "Avg daily",
      color: "#7c3aed"
    }],
    sections: [{
      icon: "\u{1F48A}",
      title: "Formulary & Generic Policy",
      text: `Generic ${n.toFixed(1)}% (\u0E40\u0E1B\u0E49\u0E32 \u226580%) \xB7 Cost/Rx \u0E3F${g(l)} \xB7 \u0E22\u0E2D\u0E14\u0E08\u0E48\u0E32\u0E22\u0E22\u0E32\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(a)} Rx (OPD ${i} \xB7 IPD ${r}) \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 \u0E3F${g(o)}. ${n<30?"\u{1F534} Generic \u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 \u2014 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E38\u0E01 10% \u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E44\u0E14\u0E49\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D":n<50?"\u26A0 \u0E22\u0E31\u0E07 substitute \u0E44\u0E14\u0E49\u0E2D\u0E35\u0E01\u0E21\u0E32\u0E01 \u2014 P&T Committee \u0E17\u0E1A\u0E17\u0E27\u0E19 formulary":"\u2705 Formulary mix \u0E14\u0E35"}`,
      color: y(n, 75, 50)
    }, {
      icon: "\u{1F4CA}",
      title: "Margin & Performance Index",
      text: `Rev/Cost ${d.toFixed(2)} \xB7 PPI ${x}/100. ${d<1?"\u{1F534} \u0E02\u0E32\u0E14\u0E17\u0E38\u0E19 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 pricing":d>=1.3?"\u2705 Margin \u0E14\u0E35":"Margin \u0E1A\u0E32\u0E07"}${x>=75?" \xB7 PPI \u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21":x>=50?" \xB7 PPI \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07":" \xB7 PPI \u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A lowest component"}`,
      color: d >= 1.3 && x >= 75 ? "#10b981" : d < 1 ? "#f43f5e" : "#f59e0b"
    }]
  }
}

function Eu(E) {
  const e = E?.labToday,
    u = E?.labAnalytics;
  if (!e && !u) return null;
  const a = c(e?.total_orders),
    i = c(e?.completed),
    r = c(e?.pending),
    o = c(e?.unique_patients),
    n = Array.isArray(e?.critical_values) ? e.critical_values.length : c(e?.critical_values_count),
    l = c(u?.avg_tat),
    s = c(u?.p90_tat),
    d = c(u?.tat_sla_pct),
    x = c(u?.lpi),
    p = c(u?.completion_rate),
    f = a > 0 ? Math.round(i / a * 100) : 0,
    m = p > 0 ? p : f,
    b = c(e?.abnormal_rate ?? u?.abnormal_rate);
  let h, v;
  return n >= 10 || s >= 180 ? (h = `\u{1F534} Lab \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 Critical Values ${n} \u0E23\u0E32\u0E22 \xB7 P90 TAT ${s}m (SLA ${d}%) \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E31\u0E19\u0E17\u0E35`, v = "#f43f5e") : n >= 5 || l >= 120 || m < 70 || d < 50 ? (h = `\u26A0 Lab \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Critical ${n} \xB7 TAT ${l}m (SLA ${d}%) \xB7 Completion ${m.toFixed(0)}% \xB7 LPI ${x}`, v = "#f59e0b") : l <= 60 && m >= 90 && d >= 85 ? (h = `\u2705 Lab TAT \u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 ${g(a)} orders \xB7 Avg ${l}m \xB7 SLA ${d}% \xB7 LPI ${x}/100`, v = "#10b981") : (h = `Lab: ${g(a)} orders (\u0E08\u0E1A ${i} \xB7 \u0E04\u0E49\u0E32\u0E07 ${r}) \xB7 TAT ${l}m (P90 ${s}) \xB7 SLA ${d}% \xB7 Critical ${n}`, v = "#0ea5e9"), {
    headline: h,
    headlineColor: v,
    kpi: [{
      label: "Orders Today",
      value: g(a),
      sub: `\u0E08\u0E1A ${i} \xB7 \u0E04\u0E49\u0E32\u0E07 ${r}`,
      color: "#0ea5e9"
    }, {
      label: "\u{1F6A8} Critical Values",
      value: g(n),
      sub: n > 0 ? "\u0E15\u0E49\u0E2D\u0E07\u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C" : "\u0E44\u0E21\u0E48\u0E21\u0E35",
      color: n >= 10 ? "#f43f5e" : n >= 5 || n > 0 ? "#f59e0b" : "#10b981"
    }, {
      label: "Avg TAT",
      value: `${l}m`,
      sub: `P90: ${s}m`,
      color: A(l, 60, 120)
    }, {
      label: "TAT SLA",
      value: `${d}%`,
      sub: "\u226460m",
      color: y(d, 85, 70)
    }, {
      label: "Completion",
      value: `${m.toFixed(0)}%`,
      sub: m >= 90 ? "\u0E14\u0E35" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A",
      color: y(m, 90, 75)
    }, {
      label: "LPI Score",
      value: `${x}/100`,
      sub: x >= 80 ? "\u0E14\u0E35" : x >= 60 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E15\u0E48\u0E33",
      color: y(x, 80, 60)
    }],
    sections: [{
      icon: "\u23F1\uFE0F",
      title: "Turnaround Time & SLA",
      text: `Avg TAT ${l}m \xB7 P90 ${s}m \xB7 SLA ${d}% (\u226460m). ${s>=180?"\u{1F534} Tail \u0E22\u0E32\u0E27\u0E21\u0E32\u0E01 \u2014 instrument downtime \u0E2B\u0E23\u0E37\u0E2D batch processing":l<=60&&d>=85?"\u2705 Fast TAT \xB7 impact clinical rapid":"TAT \u0E01\u0E23\u0E30\u0E17\u0E1A Clinical Decision \u2014 \u0E40\u0E1E\u0E34\u0E48\u0E21 STAT lane \xB7 \u0E15\u0E23\u0E27\u0E08 Pre-analytical delays"}`,
      color: s >= 180 ? "#f43f5e" : A(s, 120, 180)
    }, {
      icon: "\u{1F6A8}",
      title: "Critical Values & Safety",
      text: `Critical Values \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${n} \u0E23\u0E32\u0E22 \xB7 Unique Patients ${o} \xB7 Abnormal Rate ${b.toFixed(1)}%. ${n>=10?"\u{1F534} Critical values \u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 \u2014 \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E44\u0E02\u0E49\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E04\u0E23\u0E1A\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22 (WHO Critical Value Protocol)":n>0?"\u26A0 \u0E15\u0E49\u0E2D\u0E07\u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22 + \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 Closed-loop communication":"\u2705 \u0E44\u0E21\u0E48\u0E21\u0E35 Critical Values"}`,
      color: n >= 10 ? "#f43f5e" : n > 0 ? "#f59e0b" : "#10b981"
    }, {
      icon: "\u{1F52C}",
      title: "Throughput & Completion",
      text: `${g(a)} orders \xB7 \u0E08\u0E1A ${i} \xB7 \u0E04\u0E49\u0E32\u0E07 ${r} (Completion ${m.toFixed(1)}%) \xB7 LPI ${x}/100. ${r>150?"\u26A0 Pending \u0E2A\u0E39\u0E07 \u2014 backlog risk \xB7 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E19/\u0E40\u0E1B\u0E34\u0E14 STAT queue":m<70?"Completion \u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08 LIS Interface + Sample rejection":"\u2705 Throughput \u0E14\u0E35"}`,
      color: r > 150 || m < 70 ? "#f59e0b" : "#10b981"
    }]
  }
}

function tu(E) {
  const e = E?.xrayToday,
    u = E?.xrayAnalytics;
  if (!e && !u) return null;
  const a = c(e?.total_requests ?? e?.total),
    i = c(e?.completed),
    r = c(e?.waiting),
    o = a > 0 ? i / a * 100 : 0,
    n = c(e?.avg_wait_time ?? u?.avg_wait_time),
    l = c(u?.p90_wait_time),
    s = c(u?.wait_sla_pct);
  c(e?.avg_tat ?? u?.avg_tat);
  const d = c(u?.avg_revenue_per_visit),
    x = c(u?.rpi);
  let p, f;
  return l >= 300 || x < 50 ? (p = `\u{1F534} X-Ray \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 P90 Wait ${l} \u0E19\u0E32\u0E17\u0E35 \xB7 Wait SLA ${s}% \xB7 RPI ${x}/100 \xB7 peak-hour bottleneck`, f = "#f43f5e") : n >= 60 || o < 75 || s < 70 ? (p = `\u26A0 X-Ray Queue \u0E2A\u0E30\u0E2A\u0E21 \u2014 Avg Wait ${n}m \xB7 P90 ${l}m \xB7 Completion ${o.toFixed(0)}% \xB7 SLA ${s}%`, f = "#f59e0b") : o >= 90 && n <= 30 && l < 60 ? (p = `\u2705 Radiology Flow \u0E14\u0E35 \u2014 ${g(a)} requests \xB7 Wait ${n}m (P90 ${l}m) \xB7 SLA ${s}%`, f = "#10b981") : (p = `X-Ray: ${g(a)} requests \xB7 Completion ${o.toFixed(0)}% \xB7 Wait ${n}m (P90 ${l}m) \xB7 SLA ${s}%`, f = "#0ea5e9"), {
    headline: p,
    headlineColor: f,
    kpi: [{
      label: "Requests",
      value: g(a),
      sub: `\u0E08\u0E1A ${i} \xB7 \u0E23\u0E2D ${r}`,
      color: "#06b6d4"
    }, {
      label: "Completion",
      value: `${o.toFixed(0)}%`,
      sub: o >= 90 ? "\u0E14\u0E35" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A",
      color: y(o, 90, 75)
    }, {
      label: "Avg Wait",
      value: `${n} \u0E19\u0E32\u0E17\u0E35`,
      sub: "Queue avg",
      color: A(n, 30, 60)
    }, {
      label: "P90 Wait",
      value: `${l} \u0E19\u0E32\u0E17\u0E35`,
      sub: l >= 300 ? "\u0E27\u0E34\u0E01\u0E24\u0E15" : l >= 60 ? "\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u0E14\u0E35",
      color: l >= 300 ? "#f43f5e" : l >= 60 ? "#f59e0b" : "#10b981"
    }, {
      label: "Wait SLA",
      value: `${s}%`,
      sub: "\u226430 \u0E19\u0E32\u0E17\u0E35",
      color: y(s, 85, 70)
    }, {
      label: "Revenue/Visit",
      value: `\u0E3F${g(Math.round(d))}`,
      sub: x > 0 ? `RPI ${x}/100` : "Per case",
      color: x >= 75 ? "#10b981" : x >= 50 ? "#f59e0b" : x > 0 ? "#f43f5e" : "#7c3aed"
    }],
    sections: [{
      icon: "\u{1FA7B}",
      title: "Radiology Throughput & Wait",
      text: `${g(a)} requests \xB7 \u0E08\u0E1A ${i} \xB7 \u0E23\u0E2D ${r} (Completion ${o.toFixed(0)}%) \xB7 Avg Wait ${n}m \xB7 P90 ${l}m \xB7 SLA ${s}%. ${l>=300?"\u{1F534} P90 Wait \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 \u2014 bottleneck \u0E17\u0E35\u0E48 peak hours (08:00)":o<75?"\u26A0 Backlog accumulating \u2014 staff or equipment issue":"\u2705 Throughput \u0E14\u0E35"}`,
      color: l >= 300 ? "#f43f5e" : y(o, 90, 75)
    }, {
      icon: "\u{1F4B0}",
      title: "Service Mix & Value",
      text: `Revenue/Visit \u0E3F${g(Math.round(d))} ${d>=2e3?"(Service mix \u0E14\u0E35 \u2014 CT/Advanced imaging \u0E2A\u0E31\u0E14\u0E2A\u0E48\u0E27\u0E19\u0E2A\u0E39\u0E07)":d>=500?"(Mix \u0E1B\u0E01\u0E15\u0E34 \u2014 Plain Film + CT)":"(Mix \u0E40\u0E19\u0E49\u0E19 Plain Film)"} ${x>0?`\xB7 RPI ${x}/100 ${x>=75?"\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21":x>=50?"\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07":"\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A \u2014 \u0E14\u0E39 lowest component"}`:""}`,
      color: "#7c3aed"
    }]
  }
}

function ru(E) {
  const e = E?.dentalToday,
    u = E?.dentalAnalytics;
  if (!e && !u) return null;
  const a = c(e?.total),
    i = c(e?.completed),
    r = u?.completion_rate != null ? c(u.completion_rate) : a > 0 ? Math.round(i / a * 100) : 0,
    o = c(e?.avg_wait_time ?? u?.avg_wait_time),
    n = c(u?.p90_wait_time),
    l = c(u?.avg_revenue_per_visit);
  let s, d;
  return o >= 45 || r < 70 ? (s = `\u26A0 \u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Wait ${o} \u0E19\u0E32\u0E17\u0E35 \xB7 Completion ${r.toFixed(0)}%`, d = "#f59e0b") : r >= 85 && o <= 20 ? (s = `\u2705 \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 Flow \u0E14\u0E35 \u2014 ${g(a)} \u0E40\u0E04\u0E2A \xB7 Wait ${o} \u0E19\u0E32\u0E17\u0E35 \xB7 Completion ${r.toFixed(0)}%`, d = "#10b981") : (s = `Dental \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${g(a)} \u0E40\u0E04\u0E2A \xB7 Wait ${o} \u0E19\u0E32\u0E17\u0E35 \xB7 Completion ${r.toFixed(0)}%`, d = "#0ea5e9"), {
    headline: s,
    headlineColor: d,
    kpi: [{
      label: "Cases Today",
      value: g(a),
      sub: "Total appointments",
      color: "#f59e0b"
    }, {
      label: "Completion",
      value: `${r.toFixed(0)}%`,
      sub: "Attended rate",
      color: y(r, 85, 70)
    }, {
      label: "Avg Wait",
      value: `${o} \u0E19\u0E32\u0E17\u0E35`,
      sub: `P90: ${n}`,
      color: A(o, 20, 45)
    }, {
      label: "Revenue/Visit",
      value: `\u0E3F${g(Math.round(l))}`,
      sub: "Avg",
      color: "#7c3aed"
    }],
    sections: [{
      icon: "\u{1F9B7}",
      title: "Dental Clinic Flow",
      text: `${g(a)} \u0E40\u0E04\u0E2A \xB7 Wait ${o} \u0E19\u0E32\u0E17\u0E35 (P90 ${n}) \xB7 Completion ${r.toFixed(0)}%. ${r<70?"No-show rate \u0E2A\u0E39\u0E07 \xB7 \u0E2A\u0E48\u0E07 reminder \u0E40\u0E1E\u0E34\u0E48\u0E21":"Schedule efficiency \u0E14\u0E35"}`,
      color: y(r, 85, 70)
    }]
  }
}

function iu(E) {
  const e = E?.ttmToday,
    u = E?.ttmAnalytics;
  if (!e && !u) return null;
  const a = c(e?.total),
    i = c(e?.completed),
    r = c(e?.waiting),
    o = c(u?.avg_daily_visits),
    n = c(u?.avg_wait_time),
    l = c(u?.completion_rate),
    s = c(u?.revisit_rate),
    d = c(u?.avg_revenue_per_visit),
    x = c(u?.total_revenue),
    p = c(u?.tpi),
    f = a > 0 ? Math.round(i / a * 100) : 0;
  let m, b;
  return p > 0 && p < 50 ? (m = `\u{1F534} TTM \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 TPI ${p}/100 \xB7 Wait ${n}m \xB7 Rev/Visit \u0E3F${g(d)} \xB7 Revisit ${s.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07 intervention \u0E14\u0E48\u0E27\u0E19`, b = "#f43f5e") : n >= 60 || s >= 15 || d < 300 ? (m = `\u26A0 TTM \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Wait ${n}m \xB7 Revisit ${s.toFixed(1)}% \xB7 Rev/Visit \u0E3F${g(d)} \xB7 TPI ${p}/100`, b = "#f59e0b") : p >= 80 && l >= 95 ? (m = `\u2705 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22 \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35 \u2014 TPI ${p}/100 \xB7 Completion ${l.toFixed(1)}% \xB7 Avg daily ${o.toFixed(0)} visits`, b = "#10b981") : (m = `TTM: \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(a)} \u0E23\u0E32\u0E22 \xB7 Avg daily ${o.toFixed(0)} \xB7 Wait ${n}m \xB7 Rev/Visit \u0E3F${g(d)} \xB7 TPI ${p}/100`, b = "#0ea5e9"), {
    headline: m,
    headlineColor: b,
    kpi: [{
      label: "Today",
      value: g(a),
      sub: `\u0E08\u0E1A ${i} (${f}%) \xB7 \u0E23\u0E2D ${r}`,
      color: "#65a30d"
    }, {
      label: "Avg Daily",
      value: g(Math.round(o)),
      sub: "30d rolling",
      color: "#84cc16"
    }, {
      label: "TPI Score",
      value: `${p}/100`,
      sub: p >= 80 ? "\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : p >= 60 ? "\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A",
      color: y(p, 80, 60)
    }, {
      label: "Avg Wait",
      value: `${n}m`,
      sub: n <= 15 ? "\u0E14\u0E35" : n <= 30 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E2A\u0E39\u0E07",
      color: A(n, 15, 30)
    }, {
      label: "Rev / Visit",
      value: `\u0E3F${g(d)}`,
      sub: d >= 400 ? "\u0E14\u0E35" : d >= 300 ? "\u0E1B\u0E01\u0E15\u0E34" : "\u0E15\u0E48\u0E33",
      color: y(d, 400, 300)
    }, {
      label: "Revisit 7d",
      value: `${s.toFixed(1)}%`,
      sub: s <= 5 ? "\u0E14\u0E35" : s <= 15 ? "\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u0E2A\u0E39\u0E07",
      color: A(s, 5, 15)
    }],
    sections: [{
      icon: "\u{1F33F}",
      title: "TTM Service Flow",
      text: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(a)} \u0E23\u0E32\u0E22 \xB7 \u0E08\u0E1A ${i} (${f}%) \xB7 \u0E23\u0E2D ${r} \xB7 Avg daily ${o.toFixed(1)} visits \xB7 Completion ${l.toFixed(1)}%. ${n>=60?"\u{1F534} Wait time \u0E2A\u0E39\u0E07 \u2014 appointment system + \u0E40\u0E1E\u0E34\u0E48\u0E21 Therapist \u0E0A\u0E48\u0E27\u0E07 Peak":o<20?"Under-utilized \u2014 marketing + cross-referral":"\u2705 Flow \u0E1B\u0E01\u0E15\u0E34"}`,
      color: n >= 60 ? "#f43f5e" : o >= 30 ? "#10b981" : "#f59e0b"
    }, {
      icon: "\u{1F4B0}",
      title: "Revenue & Service Mix",
      text: `Rev/Visit \u0E3F${g(d)} \xB7 Revenue 30d \u0E3F${g(x)}. ${d<300?"\u26A0 \u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08 Under-billing (\u0E2A\u0E21\u0E38\u0E19\u0E44\u0E1E\u0E23/\u0E19\u0E49\u0E33\u0E21\u0E31\u0E19) \xB7 \u0E08\u0E31\u0E14 Package (\u0E19\u0E27\u0E14+\u0E1B\u0E23\u0E30\u0E04\u0E1A+\u0E2D\u0E1A+\u0E22\u0E32\u0E2B\u0E21\u0E49\u0E2D)":"\u2705 Mix \u0E40\u0E2B\u0E21\u0E32\u0E30\u0E2A\u0E21"}`,
      color: d >= 400 ? "#10b981" : d >= 300 ? "#f59e0b" : "#f43f5e"
    }, {
      icon: "\u{1FA79}",
      title: "Quality & Outcomes",
      text: `TPI ${p}/100 \xB7 Completion ${l.toFixed(1)}% \xB7 Revisit 7d ${s.toFixed(1)}%. ${s>=15?"\u26A0 Revisit \u0E2A\u0E39\u0E07 \u2014 \u0E41\u0E22\u0E01 Planned vs Unplanned \xB7 Allergy screening \xB7 Post-treatment instruction":p<50?"\u{1F534} TPI \u0E15\u0E48\u0E33 \u2014 \u0E14\u0E39 lowest component (Wait/Completion/Revenue/SLA)":"\u2705 Outcomes \u0E14\u0E35"}`,
      color: p < 50 || s >= 15 ? "#f43f5e" : p >= 80 ? "#10b981" : "#f59e0b"
    }]
  }
}

function au(E) {
  const e = E?.ptToday,
    u = E?.ptAnalytics;
  if (!e && !u) return null;
  const a = c(e?.total),
    i = c(e?.completed),
    r = c(e?.waiting),
    o = c(u?.avg_wait_time),
    n = c(u?.completion_rate),
    l = c(u?.revisit_rate),
    s = c(u?.avg_revenue_per_visit),
    d = c(u?.total_revenue),
    x = c(u?.avg_daily_visits),
    p = c(u?.ppi),
    f = c(u?.dropout_count);
  let m, b;
  return p > 0 && p < 50 ? (m = `\u{1F534} PT \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 PPI ${p}/100 \xB7 Wait ${o}m \xB7 Revisit ${l.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07 intervention \u0E14\u0E48\u0E27\u0E19`, b = "#f43f5e") : o >= 60 || l >= 15 || n < 80 ? (m = `\u26A0 \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Wait ${o}m \xB7 Revisit ${l.toFixed(1)}% \xB7 Completion ${n.toFixed(1)}% \xB7 PPI ${p}/100`, b = "#f59e0b") : p >= 80 && n >= 95 ? (m = `\u2705 PT \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35 \u2014 PPI ${p}/100 \xB7 Completion ${n.toFixed(1)}% \xB7 ${g(a)} sessions \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49`, b = "#10b981") : (m = `PT: \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(a)} \xB7 Avg daily ${x.toFixed(0)} \xB7 Wait ${o}m \xB7 Rev/Visit \u0E3F${g(s)} \xB7 PPI ${p}/100`, b = "#0ea5e9"), {
    headline: m,
    headlineColor: b,
    kpi: [{
      label: "Today",
      value: g(a),
      sub: `\u0E08\u0E1A ${i} \xB7 \u0E23\u0E2D ${r}`,
      color: "#e11d48"
    }, {
      label: "Avg Daily",
      value: g(Math.round(x)),
      sub: "30d rolling",
      color: "#f43f5e"
    }, {
      label: "PPI Score",
      value: `${p}/100`,
      sub: p >= 80 ? "\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : p >= 60 ? "\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A",
      color: y(p, 80, 60)
    }, {
      label: "Avg Wait",
      value: `${o}m`,
      sub: o <= 15 ? "\u0E14\u0E35" : o <= 30 ? "\u0E1B\u0E01\u0E15\u0E34" : "\u0E2A\u0E39\u0E07",
      color: A(o, 15, 30)
    }, {
      label: "Rev / Visit",
      value: `\u0E3F${g(s)}`,
      sub: s >= 700 ? "\u0E14\u0E35" : s >= 400 ? "\u0E1B\u0E01\u0E15\u0E34" : "\u0E15\u0E48\u0E33",
      color: y(s, 700, 400)
    }, {
      label: "Completion",
      value: `${n.toFixed(1)}%`,
      sub: `Dropout ${f}`,
      color: y(n, 95, 85)
    }],
    sections: [{
      icon: "\u{1F3CB}\uFE0F",
      title: "PT Session Flow",
      text: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(a)} \xB7 \u0E08\u0E1A ${i} \xB7 \u0E23\u0E2D ${r} \xB7 Avg daily ${x.toFixed(1)} sessions \xB7 Completion ${n.toFixed(1)}% (Dropout ${f}). ${o>=60?"\u{1F534} Wait \u0E2A\u0E39\u0E07 \u2014 Appointment + Buffer time + \u0E40\u0E1E\u0E34\u0E48\u0E21 Physio \u0E0A\u0E48\u0E27\u0E07 Peak (08:00)":"\u2705 Flow \u0E1B\u0E01\u0E15\u0E34"}`,
      color: o >= 60 ? "#f43f5e" : "#10b981"
    }, {
      icon: "\u{1F4B0}",
      title: "Revenue & Mix",
      text: `Rev/Visit \u0E3F${g(s)} \xB7 Revenue 30d \u0E3F${g(d)}. ${s<400?"\u26A0 \u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08 Billing completeness":s>=700?"\u2705 Service mix \u0E14\u0E35 (Sports PT/Advanced modality)":"Mix \u0E1B\u0E01\u0E15\u0E34"} \xB7 \u0E42\u0E2D\u0E01\u0E32\u0E2A: Rehab packages \xB7 Hydrotherapy \xB7 Sports medicine`,
      color: s >= 700 ? "#10b981" : s >= 400 ? "#f59e0b" : "#f43f5e"
    }, {
      icon: "\u{1F504}",
      title: "Quality & Outcomes",
      text: `PPI ${p}/100 \xB7 Completion ${n.toFixed(1)}% \xB7 Revisit 7d ${l.toFixed(1)}%. ${l>=15?"Revisit \u0E2A\u0E39\u0E07 \u2014 \u0E41\u0E22\u0E01 Planned PT vs Unplanned (pain/complication) \xB7 audit graded exercise progression":p<50?"\u{1F534} PPI \u0E15\u0E48\u0E33 \u2014 \u0E14\u0E39 lowest component (Wait/SLA)":"\u2705 Outcomes \u0E14\u0E35 \u2014 \u0E23\u0E31\u0E01\u0E29\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 + Outcome measurement (ROM/Pain score)"}`,
      color: p < 50 || l >= 15 ? "#f43f5e" : p >= 80 ? "#10b981" : "#f59e0b"
    }]
  }
}

function ou(E) {
  const e = E?.qualityToday,
    u = E?.qualityAnalytics;
  if (!e && !u) return null;
  const a = c(u?.qpi_score),
    i = c(u?.readmit_rate ?? u?.readmission_rate),
    r = c(u?.mortality_rate),
    o = c(u?.hai_rate),
    n = c(u?.dch_plan_rate ?? u?.discharge_planning ?? u?.discharge_before_noon_pct),
    l = c(u?.doc_completeness),
    s = c(u?.ama_rate);
  let d, x;
  return a < 70 ? (d = `\u{1F534} Quality Score \u0E15\u0E48\u0E33 (${a}/100) \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 HA standards \xB7 prepare for re-accreditation`, x = "#f43f5e") : r >= 3 || o >= 5 ? (d = `\u26A0 Quality Risk \u2014 Mortality ${r.toFixed(2)}% \xB7 HAI ${o.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07 Quality Huddle`, x = "#f59e0b") : a >= 85 ? (d = `\u2705 Quality Performance \u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 QPI ${a}/100 \xB7 HAI ${o.toFixed(1)}% \xB7 Readmit ${i.toFixed(1)}%`, x = "#10b981") : (d = `Quality: QPI ${a}/100 \xB7 Readmit ${i.toFixed(1)}% \xB7 Mortality ${r.toFixed(2)}% \xB7 HAI ${o.toFixed(1)}%`, x = "#0ea5e9"), {
    headline: d,
    headlineColor: x,
    kpi: [{
      label: "QPI Score",
      value: `${a}/100`,
      sub: a >= 85 ? "\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : a >= 70 ? "\u0E14\u0E35" : "\u0E15\u0E48\u0E33",
      color: y(a, 85, 70)
    }, {
      label: "Readmit Rate",
      value: `${i.toFixed(1)}%`,
      sub: "HA <5%",
      color: A(i, 5, 10)
    }, {
      label: "Mortality",
      value: `${r.toFixed(2)}%`,
      sub: "HA <2%",
      color: A(r, 2, 3)
    }, {
      label: "HAI Rate",
      value: `${o.toFixed(2)}%`,
      sub: "IC <1%",
      color: A(o, 1, 2)
    }, {
      label: "Discharge Plan",
      value: `${n.toFixed(1)}%`,
      sub: ">95%",
      color: y(n, 95, 80)
    }, {
      label: "Doc Complete",
      value: `${l.toFixed(1)}%`,
      sub: "IM Domain",
      color: y(l, 90, 70)
    }],
    sections: [{
      icon: "\u2B50",
      title: "HA Accreditation Pulse",
      text: `QPI ${a}/100 \xB7 5 Domain composite (PCT \xB7 IC \xB7 MED \xB7 ENV \xB7 IM). ${a>=85?"\u2705 \u0E1E\u0E23\u0E49\u0E2D\u0E21 re-accreditation":a>=70?"\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1A\u0E32\u0E07\u0E08\u0E38\u0E14 \xB7 \u0E40\u0E19\u0E49\u0E19 domain \u0E17\u0E35\u0E48\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14":"\u{1F534} \u0E15\u0E49\u0E2D\u0E07 intervention plan \xB7 Case Conference + M&M + IC Round"}`,
      color: y(a, 85, 70)
    }, {
      icon: "\u{1F6E1}\uFE0F",
      title: "Patient Safety Indicators",
      text: `Mortality ${r.toFixed(2)}% (HA <2%) \xB7 HAI ${o.toFixed(2)}% (IC <1%) \xB7 Readmit ${i.toFixed(1)}% (HA <5%) \xB7 AMA ${s.toFixed(2)}%. ${r>=3||o>=1||i>=5?"\u26A0 \u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C HA \u2014 \u0E40\u0E23\u0E48\u0E07 M&M Conference + IC Review + Readmission Prevention":"\u2705 Safety indicators \u0E14\u0E35"}`,
      color: r >= 3 || o >= 1 || i >= 5 ? "#f43f5e" : "#10b981"
    }, {
      icon: "\u{1F4CB}",
      title: "Compliance & Documentation",
      text: `Discharge Planning ${n.toFixed(1)}% \xB7 Documentation ${l.toFixed(1)}% \xB7 AMA ${s.toFixed(2)}%. ${l<70?"\u{1F534} Documentation \u0E15\u0E48\u0E33 \u2014 \u0E01\u0E23\u0E30\u0E17\u0E1A audit/claim \xB7 \u0E1D\u0E36\u0E01 Coder + checklist":n<95?"Dch Plan \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E43\u0E0A\u0E49 checklist \u0E01\u0E48\u0E2D\u0E19\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22":"\u2705 Compliance \u0E14\u0E35"}`,
      color: l < 70 ? "#f43f5e" : n < 95 ? "#f59e0b" : "#10b981"
    }]
  }
}

function nu(E) {
  const e = E?.financeSummary?.summary,
    u = E?.financeAnalytics?.metrics,
    a = E?.denialAnalytics,
    i = E?.drgLeakage;
  if (!e && !u) return null;
  const r = c(u?.mtd_revenue ?? u?.revenue_this_month ?? u?.cur_month_revenue),
    o = c(u?.ytd_revenue ?? e?.total_revenue),
    n = r > 0 ? r : o,
    l = c(u?.yoy_growth_pct ?? e?.yoy_growth),
    s = c(u?.growth_pct_prorata ?? u?.growth_pct),
    d = c(u?.ffs_collection_rate ?? u?.collection_rate),
    x = c(u?.collection_rate),
    p = c(u?.denial_rate ?? a?.denial_rate),
    f = c(u?.unpaid_visits ?? a?.total_denied),
    m = c(u?.days_in_ar),
    b = c(i?.total_estimated_loss ?? i?.estimated_loss),
    h = c(u?.profit_margin ?? e?.profit_margin);
  let v, B;
  return p >= 7 || d < 80 ? (v = `\u{1F534} FFS Collection \u0E15\u0E48\u0E33 \u2014 \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A FFS ${d.toFixed(1)}% \xB7 \u0E04\u0E49\u0E32\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ${p.toFixed(1)}% (${f} \u0E40\u0E04\u0E2A) \xB7 \u0E15\u0E49\u0E2D\u0E07 RCM audit`, B = "#f43f5e") : m > 90 ? (v = `\u{1F534} A/R ${m} \u0E27\u0E31\u0E19 (\u0E40\u0E1B\u0E49\u0E32 \u2264 45) \u2014 \u0E40\u0E23\u0E48\u0E07 Aging Review + e-Claim Reconciliation`, B = "#f43f5e") : l < -5 || m > 60 ? (v = `\u26A0 Financial Pressure \u2014 Revenue ${l>=0?"+":""}${l.toFixed(1)}% \xB7 AR Days ${m}`, B = "#f59e0b") : d >= 90 && l >= 5 ? (v = `\u2705 \u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19\u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \u2014 Revenue +${l.toFixed(1)}% \xB7 FFS Collection ${d.toFixed(1)}% \xB7 Margin ${h.toFixed(1)}%`, B = "#10b981") : (v = `Finance: Revenue \u0E3F${g(Math.round(n/1e6))}M (${l>=0?"+":""}${l.toFixed(1)}%) \xB7 FFS Collection ${d.toFixed(1)}% \xB7 A/R ${m}d`, B = "#0ea5e9"), {
    headline: v,
    headlineColor: B,
    kpi: [{
      label: "Revenue YTD",
      value: `\u0E3F${g(Math.round(o/1e6))}M`,
      sub: `${l>=0?"+":""}${l.toFixed(1)}% YoY \xB7 MoM ${s>=0?"+":""}${s.toFixed(1)}%`,
      color: l >= 5 ? "#10b981" : l >= 0 ? "#0ea5e9" : "#f43f5e"
    }, {
      label: "Revenue MTD",
      value: `\u0E3F${g(Math.round(r/1e6))}M`,
      sub: "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
      color: "#0ea5e9"
    }, {
      label: "FFS Collection",
      value: `${d.toFixed(1)}%`,
      sub: `FFS \u0E40\u0E17\u0E48\u0E32\u0E19\u0E31\u0E49\u0E19 \xB7 \u0E23\u0E27\u0E21 ${x.toFixed(1)}%`,
      color: y(d, 90, 80)
    }, {
      label: "FFS Outstanding",
      value: `${p.toFixed(1)}%`,
      sub: `${f} \u0E40\u0E04\u0E2A \u0E04\u0E49\u0E32\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 (\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48 Denial)`,
      color: A(p, 3, 5)
    }, {
      label: "A/R Days",
      value: `${m}`,
      sub: m <= 45 ? "\u2705 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C" : m <= 60 ? "\u26A0 \u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u{1F534} \u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E40\u0E23\u0E48\u0E07 Follow-up",
      color: A(m, 45, 60)
    }, {
      label: "DRG Leakage",
      value: `\u0E3F${g(Math.round(b/1e3))}K`,
      sub: "Potential loss",
      color: b >= 5e5 ? "#f43f5e" : "#f59e0b"
    }, {
      label: "Profit Margin",
      value: `${h.toFixed(1)}%`,
      sub: h >= 15 ? "\u0E14\u0E35" : h >= 5 ? "\u0E1E\u0E2D\u0E43\u0E0A\u0E49" : "\u0E1A\u0E32\u0E07",
      color: y(h, 15, 5)
    }],
    sections: [{
      icon: "\u{1F4B0}",
      title: "Revenue Cycle Health (FFS-focused)",
      text: `YTD Revenue \u0E3F${g(Math.round(o))} (${l>=0?"+":""}${l.toFixed(1)}% YoY) \xB7 MTD \u0E3F${g(Math.round(r))} (${s>=0?"+":""}${s.toFixed(1)}% MoM Pro-rata) \xB7 FFS Collection ${d.toFixed(1)}% (\u0E23\u0E27\u0E21 ${x.toFixed(1)}%) \xB7 Outstanding ${p.toFixed(1)}% (${f} \u0E40\u0E04\u0E2A). ${p>=7||d<80?"\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E17\u0E33 RCM audit \u0E14\u0E48\u0E27\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A FFS":d>=90?"\u2705 FFS Revenue Cycle \u0E17\u0E33\u0E07\u0E32\u0E19\u0E14\u0E35":"FFS \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07"}`,
      color: d >= 90 && p <= 5 ? "#10b981" : "#f59e0b"
    }, {
      icon: "\u23F3",
      title: "A/R & Cash Flow",
      text: `A/R Days ${m} \u0E27\u0E31\u0E19 (\u0E40\u0E1B\u0E49\u0E32 \u2264 45). ${m>90?"\u{1F534} A/R \u0E04\u0E49\u0E32\u0E07\u0E40\u0E01\u0E34\u0E19 90 \u0E27\u0E31\u0E19 \u2014 \u0E40\u0E23\u0E48\u0E07 Aging Review + e-Claim Reconciliation \u0E14\u0E48\u0E27\u0E19":m>60?"\u26A0 A/R \u0E04\u0E49\u0E32\u0E07 60\u201390 \u0E27\u0E31\u0E19 \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 Gov \u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E15\u0E23\u0E07":m>45?"\u{1F7E1} A/R \u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Billing Cycle":"\u2705 Cash Flow \u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E1B\u0E01\u0E15\u0E34"}`,
      color: m > 90 ? "#f43f5e" : m > 60 ? "#f59e0b" : "#10b981"
    }, {
      icon: "\u{1F50D}",
      title: "DRG Leakage & Coding",
      text: `DRG Leakage \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E3F${g(Math.round(b))}${b>=2e5?" \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33 Coding Audit (ICD-10 Secondary Dx, CC/MCC)":" \u2014 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"}`,
      color: b >= 5e5 ? "#f43f5e" : b >= 2e5 ? "#f59e0b" : "#10b981"
    }, {
      icon: "\u{1F4CA}",
      title: "Profitability",
      text: `Profit Margin ${h.toFixed(1)}% \xB7 Revenue YTD \u0E3F${g(Math.round(o))}. ${h>=15?"\u2705 \u0E01\u0E33\u0E44\u0E23\u0E14\u0E35":h>=5?"\u0E01\u0E33\u0E44\u0E23\u0E1E\u0E2D\u0E43\u0E0A\u0E49 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19":h>0?"\u26A0 Margin \u0E1A\u0E32\u0E07 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19":"\u{1F534} \u0E02\u0E32\u0E14\u0E17\u0E38\u0E19 \u2014 \u0E15\u0E49\u0E2D\u0E07 restructuring \u0E14\u0E48\u0E27\u0E19"}`,
      color: h >= 15 ? "#10b981" : h >= 5 ? "#f59e0b" : "#f43f5e"
    }]
  }
}

function _({
  height: E = "1rem",
  width: e = "100%",
  borderRadius: u = "8px",
  style: a = {}
}) {
  return t.jsx("div", {
    className: "skeleton",
    "aria-hidden": "true",
    style: {
      height: E,
      width: e,
      borderRadius: u,
      ...a
    }
  })
}

function lu() {
  return t.jsxs("div", {
    role: "status",
    "aria-label": "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
    "aria-busy": "true",
    className: "space-y-4 animate-fade-in pb-8",
    children: [t.jsx("span", {
      className: "sr-only",
      children: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E23\u0E2D\u0E2A\u0E31\u0E01\u0E04\u0E23\u0E39\u0E48..."
    }), t.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: "12px"
      },
      children: Array.from({
        length: 5
      }).map((E, e) => t.jsxs("div", {
        style: {
          padding: "1.25rem",
          borderRadius: "16px",
          border: "1px solid var(--md-border)",
          background: "var(--md-surface)"
        },
        children: [t.jsx(_, {
          height: "0.75rem",
          width: "60%",
          style: {
            marginBottom: "0.75rem"
          }
        }), t.jsx(_, {
          height: "2rem",
          width: "80%",
          style: {
            marginBottom: "0.5rem"
          }
        }), t.jsx(_, {
          height: "0.625rem",
          width: "40%"
        })]
      }, e))
    }), t.jsxs("div", {
      style: {
        padding: "1.5rem",
        borderRadius: "20px",
        border: "1px solid var(--md-border)",
        background: "var(--md-surface)"
      },
      children: [t.jsx(_, {
        height: "0.875rem",
        width: "30%",
        style: {
          marginBottom: "1.25rem"
        }
      }), t.jsx(_, {
        height: "200px",
        borderRadius: "12px"
      })]
    }), t.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
      },
      children: [0, 1].map(E => t.jsxs("div", {
        style: {
          padding: "1.5rem",
          borderRadius: "20px",
          border: "1px solid var(--md-border)",
          background: "var(--md-surface)"
        },
        children: [t.jsx(_, {
          height: "0.875rem",
          width: "50%",
          style: {
            marginBottom: "1rem"
          }
        }), Array.from({
          length: 4
        }).map((e, u) => t.jsx(_, {
          height: "0.75rem",
          width: `${75-u*10}%`,
          style: {
            marginBottom: "0.75rem"
          }
        }, u))]
      }, E))
    })]
  })
}
const su = F.memo(function({
  icon: E = "\u{1F4CA}",
  title: e = "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25",
  description: u = "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E43\u0E19\u0E02\u0E13\u0E30\u0E19\u0E35\u0E49 \u0E01\u0E23\u0E38\u0E13\u0E32\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48\u0E20\u0E32\u0E22\u0E2B\u0E25\u0E31\u0E07",
  action: a = null
}) {
  return t.jsxs("div", {
    role: "status",
    "aria-label": e,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "3rem 2rem",
      textAlign: "center",
      gap: "0.75rem"
    },
    children: [t.jsx("span", {
      style: {
        fontSize: "48px",
        lineHeight: 1
      },
      "aria-hidden": "true",
      children: E
    }), t.jsx("h3", {
      style: {
        fontSize: "var(--fs-md)",
        fontWeight: 800,
        color: "var(--md-text-primary)",
        margin: 0
      },
      children: e
    }), t.jsx("p", {
      style: {
        fontSize: "var(--fs-sm)",
        color: "var(--md-text-tertiary)",
        margin: 0,
        maxWidth: "360px"
      },
      children: u
    }), a && t.jsx("div", {
      style: {
        marginTop: "0.5rem"
      },
      children: a
    })]
  })
});
export {
  r0 as A, B0 as D, K0 as E, N0 as H, D0 as K, O0 as M, V0 as S, lu as T, P as _, L as a, M as b, y0 as c, f0 as d, nu as e, U0 as f, X as g, C0 as h, su as i, J0 as j, X0 as k, Z0 as l, ru as m, iu as n, au as o, uu as p, g as q, tu as r, eu as s, Eu as t, N as u, ou as v, Y0 as w
};