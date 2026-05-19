const R = (E, e = R, u = e.f || (e.f = ["assets/index-DK7pcb85.js", "assets/vendor-react-ByYOq5k4.js", "assets/index-De7vMeua.css"])) => E.map(i => u[i]);
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
    let i = Promise.resolve();
    if (e && e.length > 0) {
      document.getElementsByTagName("link");
      const r = document.querySelector("meta[property=csp-nonce]"),
        n = r?.nonce || r?.getAttribute("nonce");
      i = Promise.allSettled(e.map(a => {
        if (a = t0(a), a in O) return;
        O[a] = !0;
        const l = a.endsWith(".css"),
          s = l ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${a}"]${s}`)) return;
        const d = document.createElement("link");
        if (d.rel = l ? "stylesheet" : E0, l || (d.as = "script"), d.crossOrigin = "", d.href = a, n && d.setAttribute("nonce", n), document.head.appendChild(d), l) return new Promise((x, p) => {
          d.addEventListener("load", x), d.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${a}`)))
        })
      }))
    }

    function o(r) {
      const n = new Event("vite:preloadError", {
        cancelable: !0
      });
      if (n.payload = r, window.dispatchEvent(n), !n.defaultPrevented) throw r
    }
    return i.then(r => {
      for (const n of r || []) n.status === "rejected" && o(n.reason);
      return E().catch(o)
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
    }), [i, o] = $.useState(!0), [r, n] = $.useState(null), a = $.useCallback(async (x, p) => (u({
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
        }).catch(() => {}).finally(() => o(!1));
        return
      }
    }, [!0]);
    const d = {
      user: e,
      setUser: u,
      tokens: null,
      loading: i,
      error: r,
      login: a,
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
      i = (a, l) => {
        const s = typeof a == "function" ? a(e) : a;
        if (!Object.is(s, e)) {
          const d = e;
          e = l ?? (typeof s != "object" || s === null) ? s : Object.assign({}, e, s), u.forEach(x => x(e, d))
        }
      },
      o = () => e,
      r = {
        setState: i,
        getState: o,
        getInitialState: () => n,
        subscribe: a => (u.add(a), () => u.delete(a))
      },
      n = e = E(i, o, r);
    return r
  },
  o0 = E => E ? U(E) : U,
  i0 = E => E;

function G(E, e = i0) {
  const u = F.useSyncExternalStore(E.subscribe, F.useCallback(() => e(E.getState()), [E, e]), F.useCallback(() => e(E.getInitialState()), [E, e]));
  return F.useDebugValue(u), u
}
const V = E => {
    const e = o0(E),
      u = i => G(e, i);
    return Object.assign(u, e), u
  },
  a0 = E => E ? V(E) : V;

function n0(E) {
  const e = typeof E == "string" ? E : I(E);
  let u = 2166136261;
  for (let i = 0; i < e.length; i++) u ^= e.charCodeAt(i), u = u * 16777619 >>> 0;
  return u
}

function I(E, e = 0) {
  if (e > 4) return "\u2026";
  if (E == null) return "N";
  const u = typeof E;
  if (u === "number" || u === "boolean") return String(E);
  if (u === "string") return E.length > 64 ? E.length + ":" + E.slice(0, 32) + E.slice(-16) : E;
  if (Array.isArray(E)) {
    const i = E.length;
    if (i === 0) return "[]";
    const o = [i],
      r = i <= 3 ? [0, 1, 2].filter(n => n < i) : [0, Math.floor(i / 2), i - 1];
    for (const n of r) o.push(I(E[n], e + 1));
    return "[" + o.join("|") + "]"
  }
  if (u === "object") {
    const i = Object.keys(E),
      o = [i.length],
      r = i.length <= 8 ? i : i.filter((n, a) => a % Math.ceil(i.length / 8) === 0);
    for (const n of r) o.push(n + "=" + I(E[n], e + 1));
    return "{" + o.join("|") + "}"
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
  return async function(e, u, i, o, {
    silent: r = !1
  } = {}) {
    const n = new AbortController;
    k.set(e, n);
    const a = setTimeout(() => n.abort(), 3e4),
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
        signal: n.signal
      }, () => s, d);
      if (!x.ok) throw new Error(`HTTP ${x.status}`);
      const p = await x.json(),
        b = W[e],
        m = n0(p);
      return b && b._hash === m ? (b.t = Date.now(), r || i(f => ({
        loading: {
          ...f.loading,
          [e]: !1
        }
      })), b.data) : (i(e === "erTodayPatients" ? {
        erTodayPatients: p.patients || [],
        erWaitTimeForecast: p.wait_time_forecast || null,
        loading: {
          ...o().loading,
          [e]: !1
        },
        lastUpdated: Date.now()
      } : e === "erTriageStats" ? {
        erTriageStats: p.stats || [],
        loading: {
          ...o().loading,
          [e]: !1
        },
        lastUpdated: Date.now()
      } : f => ({
        [e]: p,
        loading: {
          ...f.loading,
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
      return i(b => ({
        errors: {
          ...b.errors,
          [e]: p
        }
      })), null
    } finally {
      clearTimeout(a), k.delete(e), r || i(x => ({
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
  return a0((u, i) => ({
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
    setTab: o => {
      d0(), u({
        activeTab: o
      })
    },
    dispatch: o => {
      switch (o.type) {
        case "SET_DATA":
          o.key === "erTodayPatients" ? u({
            erTodayPatients: o.payload?.patients || [],
            erWaitTimeForecast: o.payload?.wait_time_forecast || null,
            loading: {
              ...i().loading,
              [o.key]: !1
            }
          }) : o.key === "erTriageStats" ? u({
            erTriageStats: o.payload?.stats || [],
            loading: {
              ...i().loading,
              [o.key]: !1
            }
          }) : u(r => ({
            [o.key]: o.payload,
            loading: {
              ...r.loading,
              [o.key]: !1
            }
          }));
          break;
        case "SET_LOADING":
          u(r => ({
            loading: {
              ...r.loading,
              [o.key]: o.payload
            }
          }));
          break;
        case "SET_ERROR":
          u(r => ({
            errors: {
              ...r.errors,
              [o.key]: o.payload
            }
          }));
          break;
        case "ADD_ALERT":
          u(r => ({
            emergencyAlerts: [o.payload, ...r.emergencyAlerts].slice(0, 20)
          }));
          break;
        case "DISMISS_ALERT":
          u(r => ({
            emergencyAlerts: r.emergencyAlerts.filter((n, a) => a !== o.payload)
          }));
          break;
        case "SET_LAST_UPDATED":
          u({
            lastUpdated: o.payload
          });
          break;
        case "OPEN_DRILL_DOWN":
          u({
            drillDown: {
              isOpen: !0,
              kpiId: o.kpiId,
              title: o.title,
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
              data: o.payload,
              loading: !1
            }
          }));
          break
      }
    },
    fetchData: async (o, r) => {
      if (C[o]) return C[o];
      const n = W[o],
        a = n ? Date.now() - n.t : 1 / 0;
      if (n && a < l0 && n.data) return n.data;
      if (n && a < s0 && n.data) {
        const s = e(o, r, u, i, {
          silent: !0
        });
        return C[o] = s, n.data
      }
      u(s => ({
        loading: {
          ...s.loading,
          [o]: !0
        },
        errors: {
          ...s.errors,
          [o]: null
        }
      }));
      const l = e(o, r, u, i);
      return C[o] = l, l
    },
    fetchParallel: async o => Promise.all(o.map(([r, n]) => i().fetchData(r, n))),
    batchFetch: async o => {
      const r = Object.entries(o),
        n = await Promise.allSettled(r.map(([l, s]) => i().fetchData(l, s).then(d => [l, d]))),
        a = {};
      for (const l of n)
        if (l.status === "fulfilled" && l.value) {
          const [s, d] = l.value;
          a[s] = d
        } return a
    },
    addAlert: o => u(r => ({
      emergencyAlerts: [o, ...r.emergencyAlerts].slice(0, 20)
    })),
    dismissAlert: o => u(r => ({
      emergencyAlerts: r.emergencyAlerts.filter((n, a) => a !== o)
    })),
    openDrillDown: async (o, r, n) => {
      if (u({
          drillDown: {
            isOpen: !0,
            kpiId: o,
            title: r,
            data: null,
            loading: !0
          }
        }), n) try {
        const {
          fetchWithTokenRefresh: a
        } = await P(async () => {
          const {
            fetchWithTokenRefresh: p
          } = await import("./index-DK7pcb85.js").then(b => b.f);
          return {
            fetchWithTokenRefresh: p
          }
        }, R([0, 1, 2])), {
          tokens: l,
          refreshAccessToken: s
        } = E(), d = await a(n, {}, () => l, s);
        if (!d.ok) throw new Error(`HTTP ${d.status}`);
        const x = await d.json();
        u(p => ({
          drillDown: {
            ...p.drillDown,
            data: x,
            loading: !1
          }
        }))
      } catch (a) {
        u(l => ({
          drillDown: {
            ...l.drillDown,
            data: {
              error: a.message
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
const q = E => Symbol.iterator in E,
  Y = E => "entries" in E,
  Q = (E, e) => {
    const u = E instanceof Map ? E : new Map(E.entries()),
      i = e instanceof Map ? e : new Map(e.entries());
    if (u.size !== i.size) return !1;
    for (const [o, r] of u)
      if (!i.has(o) || !Object.is(r, i.get(o))) return !1;
    return !0
  },
  p0 = (E, e) => {
    const u = E[Symbol.iterator](),
      i = e[Symbol.iterator]();
    let o = u.next(),
      r = i.next();
    for (; !o.done && !r.done;) {
      if (!Object.is(o.value, r.value)) return !1;
      o = u.next(), r = i.next()
    }
    return !!o.done && !!r.done
  };

function m0(E, e) {
  return Object.is(E, e) ? !0 : typeof E != "object" || E === null || typeof e != "object" || e === null || Object.getPrototypeOf(E) !== Object.getPrototypeOf(e) ? !1 : q(E) && q(e) ? Y(E) && Y(e) ? Q(E, e) : p0(E, e) : Q({
    entries: () => Object.entries(E)
  }, {
    entries: () => Object.entries(e)
  })
}

function g0(E) {
  const e = F.useRef(void 0);
  return u => {
    const i = E(u);
    return m0(e.current, i) ? e.current : e.current = i
  }
}
const K = $.createContext(null);

function b0({
  children: E
}) {
  const {
    tokens: e,
    refreshAccessToken: u
  } = N(), i = $.useRef({
    tokens: e,
    refreshAccessToken: u
  });
  i.current = {
    tokens: e,
    refreshAccessToken: u
  };
  const o = $.useRef(null);
  return o.current || (o.current = x0(() => i.current)), t.jsx(K.Provider, {
    value: o.current,
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

function f0(E) {
  const [e, u] = $.useState(1), i = Math.max(1, Math.ceil((E?.length || 0) / z)), o = Math.min(e, i), r = (E || []).slice((o - 1) * z, o * z);
  return $.useEffect(() => {
    u(1)
  }, [E]), {
    page: o,
    totalPages: i,
    sliced: r,
    setPage: u,
    total: E?.length || 0
  }
}

function h0({
  page: E,
  totalPages: e,
  total: u,
  setPage: i
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
        onClick: () => i(1)
      }), t.jsx(T, {
        label: "\u2039",
        disabled: E === 1,
        onClick: () => i(o => o - 1)
      }), t.jsx(T, {
        label: "\u203A",
        disabled: E === e,
        onClick: () => i(o => o + 1)
      }), t.jsx(T, {
        label: "\xBB",
        disabled: E === e,
        onClick: () => i(e)
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
  const E = M(a => ({
      drillDown: a.drillDown
    })),
    {
      closeDrillDown: e
    } = L(),
    {
      drillDown: u
    } = E;
  if (!u.isOpen) return null;
  const {
    title: i,
    data: o,
    loading: r,
    kpiId: n
  } = u;
  return t.jsxs("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": i,
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
      onClick: a => a.stopPropagation(),
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
            children: i
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
          onMouseEnter: a => a.currentTarget.style.background = "var(--md-border)",
          onMouseLeave: a => a.currentTarget.style.background = "var(--md-bg)",
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
        }) : o?.error ? t.jsxs("div", {
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
            children: o.error
          })]
        }) : t.jsx(v0, {
          kpiId: n,
          data: o
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
    page: i,
    totalPages: o,
    sliced: r,
    setPage: n,
    total: a
  } = f0(e), l = $.useMemo(() => ({
    page: i,
    totalPages: o,
    total: a
  }), [i, o, a]);
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
      setPage: n
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
            renderCell: (u, i) => i === 2 ? Number(u.revenue).toLocaleString() : u[i === 0 ? "name" : "visits"]
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
            renderCell: (u, i) => i === 4 ? t.jsxs("span", {
              style: {
                fontWeight: 800,
                color: u.minutes > 90 ? "#f5365c" : "#f59e0b"
              },
              children: [u.minutes, " min"]
            }) : i === 3 ? t.jsx("span", {
              style: {
                padding: "2px 8px",
                borderRadius: "4px",
                background: "rgba(0,0,0,0.05)",
                fontSize: "12px"
              },
              children: u.status
            }) : u[["hn", "name", "clinic", "status", "minutes"][i]]
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
            value: e.wards?.reduce((u, i) => u + i.total, 0),
            color: "#10b981"
          }), t.jsx(S, {
            label: "Active Occupancy",
            value: e.wards?.reduce((u, i) => u + i.occupied, 0),
            color: "#7c3aed"
          }), t.jsx(S, {
            label: "Avg Occupancy Rate",
            value: `${Math.round(e.wards?.reduce((u,i)=>u+i.rate,0)/(e.wards?.length||1))}%`,
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
            renderCell: (u, i) => i === 3 ? t.jsxs("span", {
              style: {
                fontWeight: 800,
                color: u.rate > 85 ? "#f5365c" : "#10b981"
              },
              children: [u.rate, "%"]
            }) : Object.values(u)[i]
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
            renderCell: (u, i) => i === 3 ? `${u.stay} \u0E27\u0E31\u0E19` : Object.values(u)[i]
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
            renderCell: (u, i) => i === 4 ? t.jsxs("span", {
              style: {
                fontWeight: 800,
                color: "#f5365c"
              },
              children: [u.days_since_dch, " \u0E27\u0E31\u0E19"]
            }) : u[["an", "name", "prev_dchdate", "readmit_date", "days_since_dch", "dx_name"][i]]
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
            renderCell: (u, i) => i === 3 ? `${u.actual_alos} \u0E27\u0E31\u0E19` : i === 4 ? `${u.benchmark_alos} \u0E27\u0E31\u0E19` : i === 5 ? t.jsxs("span", {
              style: {
                fontWeight: 800,
                color: "#f5365c"
              },
              children: ["+", u.excess_days, " \u0E27\u0E31\u0E19"]
            }) : u[["an", "name", "regdate", "actual_alos", "benchmark_alos", "excess_days", "dx_name"][i]]
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
            renderCell: (u, i) => i === 3 ? Number(u.avg_rw).toFixed(3) : i === 4 ? Number(u.total_rw).toFixed(2) : i === 5 ? Number(u.avg_income || 0).toLocaleString() : u[["drg", "dx_name", "cases", "avg_rw", "total_rw", "avg_income"][i]]
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
            renderCell: (u, i) => u[["an", "name", "dchdate", "ward", "dx_name", "doctor"][i]]
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
    [i, o] = $.useState(Date.now()),
    [r, n] = $.useState(w),
    [a, l] = $.useState(!1);
  $.useEffect(() => {
    const m = setInterval(() => {
      o(Date.now()), n(f => f <= 1 ? w : f - 1)
    }, 1e3);
    return () => clearInterval(m)
  }, []), $.useEffect(() => {
    u && (n(w), l(!1))
  }, [u]);
  const s = A0(u),
    d = $0(u),
    x = (w - r) / w * 100,
    p = $.useCallback(() => {
      l(!0), n(w), E && E()
    }, [E]),
    b = u ? new Date(u).toLocaleTimeString("th-TH", {
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
        children: b
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
      disabled: a,
      title: "Force Refresh \u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E31\u0E19\u0E17\u0E35",
      style: {
        width: "22px",
        height: "22px",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: a ? `${s.color}15` : "transparent",
        border: `1px solid ${s.color}25`,
        cursor: a ? "wait" : "pointer",
        transition: "all 0.2s ease",
        fontSize: "12px",
        padding: 0,
        animation: a ? "spin 1s linear infinite" : "none"
      },
      onMouseEnter: m => {
        a || (m.currentTarget.style.background = `${s.color}15`, m.currentTarget.style.transform = "scale(1.1)")
      },
      onMouseLeave: m => {
        a || (m.currentTarget.style.background = "transparent", m.currentTarget.style.transform = "none")
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
  } = L(), i = e || "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", o = $.useCallback(r => {
    r.drillDownId && u(r.drillDownId, r.drillDownTitle || r.thLabel, r.drillDownEndpoint)
  }, [u]);
  return t.jsx("div", {
    style: {
      display: "grid",
      gridTemplateColumns: i,
      gap: "16px"
    },
    children: E.map((r, n) => {
      const a = !!r.drillDownId;
      return t.jsxs("div", {
        className: `group ${a?"cursor-pointer":"cursor-default"}`,
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
        onClick: () => o(r),
        onMouseEnter: l => {
          a && (l.currentTarget.style.transform = "translateY(-6px)", l.currentTarget.style.boxShadow = `0 25px 50px -12px ${r.color}25, inset 0 2px 4px rgba(255,255,255,0.5)`)
        },
        onMouseLeave: l => {
          a && (l.currentTarget.style.transform = "translateY(0)", l.currentTarget.style.boxShadow = "0 10px 30px -5px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.4)")
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
          }), a && t.jsx("span", {
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
      }, n)
    })
  })
}
const D0 = F.memo(F0),
  S0 = ({
    title: E,
    icon: e = "\u{1F9E0}",
    priority: u = "MEDIUM",
    summary: i,
    analysis: o,
    recommendation: r,
    confidence: n = 95,
    lastUpdated: a = "2m ago",
    actionButtons: l = [],
    gradient: s = "#7c3aed",
    gradientFrom: d = "rgba(139,92,246,.08)",
    gradientTo: x = "rgba(99,102,241,.04)",
    borderColor: p = "rgba(139,92,246,.25)"
  }) => {
    const b = {
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
      m = b[u] || b.MEDIUM;
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
        children: i
      }), t.jsx("p", {
        style: {
          margin: "8px 0",
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--md-text-secondary)",
          lineHeight: 1.6
        },
        children: o
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
            children: ["\u{1F4CA} Confidence: ", n, "%"]
          }), t.jsxs("span", {
            children: ["\u{1F550} Updated: ", a]
          })]
        })
      }), l.length > 0 && t.jsx("div", {
        style: {
          display: "flex",
          gap: "8px",
          marginTop: "12px",
          flexWrap: "wrap"
        },
        children: l.map((f, h) => t.jsx("button", {
          onClick: f.onClick,
          style: {
            padding: "6px 12px",
            fontSize: "12px",
            fontWeight: 700,
            border: "none",
            borderRadius: "6px",
            background: f.primary ? s : "rgba(255,255,255,.1)",
            color: f.primary ? "#fff" : "var(--md-text-primary)",
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
          children: f.label
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
    i = [];
  if (E.recommendations?.length > 0 && E.recommendations.forEach((o, r) => {
      i.push({
        title: `AI Recommendation #${r+1}`,
        icon: "\u{1F9E0}",
        priority: r === 0 ? "HIGH" : "MEDIUM",
        summary: o,
        analysis: E.data_source || "AI Analysis",
        recommendation: o,
        ...u
      })
    }), E.demand_forecast) {
    const o = E.demand_forecast;
    i.unshift({
      title: "Demand Forecast",
      icon: "\u{1F4C8}",
      priority: Math.abs(o.growth_rate) > 10 ? "HIGH" : "LOW",
      summary: `Demand ${o.direction==="increasing"?"\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E36\u0E49\u0E19":"\u0E25\u0E14\u0E25\u0E07"} ${Math.abs(o.growth_rate)}%`,
      analysis: `\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E32\u0E01 trend 6 \u0E40\u0E14\u0E37\u0E2D\u0E19 \u2014 ${o.trend?.length||0} data points`,
      recommendation: o.growth_rate > 5 ? "\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E01\u0E33\u0E25\u0E31\u0E07\u0E04\u0E19\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21" : "\u0E04\u0E07\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19",
      ...u
    })
  }
  if (E.peak_hours?.length > 0 && i.push({
      title: "Peak Hour Analysis",
      icon: "\u23F0",
      priority: "MEDIUM",
      summary: `Peak: ${E.peak_hours.map(o=>o.hour).join(", ")}`,
      analysis: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E17\u0E35\u0E48\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E21\u0E32\u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 \u2014 \u0E04\u0E27\u0E23\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21 unit \u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21",
      recommendation: `\u0E08\u0E31\u0E14\u0E40\u0E08\u0E49\u0E32\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E0A\u0E48\u0E27\u0E07 ${E.peak_hours[0]?.hour||"peak"}`,
      ...u
    }), E.tat_analysis?.length > 0) {
    const o = E.tat_analysis.reduce((r, n) => r.avg_tat_min > n.avg_tat_min ? r : n, E.tat_analysis[0]);
    i.unshift({
      title: "TAT Performance",
      icon: "\u23F1\uFE0F",
      priority: o.avg_tat_min > 60 ? "HIGH" : "LOW",
      summary: `Slowest: ${o.exam} (${o.avg_tat_min} \u0E19\u0E32\u0E17\u0E35)`,
      analysis: `\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C TAT \u0E08\u0E32\u0E01 ${E.tat_analysis.length} \u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E15\u0E23\u0E27\u0E08`,
      recommendation: o.avg_tat_min > 60 ? `${o.exam} TAT \u0E2A\u0E39\u0E07 \u2014 review workflow` : "TAT \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E14\u0E35",
      ...u
    })
  }
  if (E.pending_reports > 0 && i.push({
      title: "Pending Reports",
      icon: "\u{1F4CB}",
      priority: E.pending_reports > 10 ? "HIGH" : "MEDIUM",
      summary: `${E.pending_reports} report \u0E04\u0E49\u0E32\u0E07\u0E2D\u0E48\u0E32\u0E19\u0E1C\u0E25`,
      analysis: "\u0E1C\u0E25\u0E15\u0E23\u0E27\u0E08\u0E17\u0E35\u0E48\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19",
      recommendation: "\u0E40\u0E23\u0E48\u0E07\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E1C\u0E25\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14 TAT",
      ...u
    }), E.cost_analysis?.top_drugs?.length > 0) {
    const o = E.cost_analysis.top_drugs[0];
    i.unshift({
      title: "Drug Cost Intelligence",
      icon: "\u{1F4B0}",
      priority: "HIGH",
      summary: `Top cost: ${o.name?.substring(0,40)} \u2014 \u0E3F${(o.cost/1e3).toFixed(0)}K`,
      analysis: "15 \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E22\u0E32\u0E17\u0E35\u0E48\u0E21\u0E35\u0E21\u0E39\u0E25\u0E04\u0E48\u0E32\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E19\u0E35\u0E49",
      recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 Formulary \u0E41\u0E25\u0E30\u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 Generic substitution",
      ...u
    })
  }
  if (E.high_alert_drugs?.length > 0 && i.push({
      title: "High-Alert Drug Monitor",
      icon: "\u26A0\uFE0F",
      priority: "HIGH",
      summary: `${E.high_alert_drugs.length} High-alert drugs \u0E01\u0E33\u0E25\u0E31\u0E07\u0E43\u0E0A\u0E49\u0E2D\u0E22\u0E39\u0E48`,
      analysis: E.high_alert_drugs.slice(0, 3).map(o => `${o.name} (${o.patients} \u0E23\u0E32\u0E22)`).join(", "),
      recommendation: "Double-check \u0E17\u0E38\u0E01\u0E04\u0E23\u0E31\u0E49\u0E07\u0E01\u0E48\u0E2D\u0E19\u0E08\u0E48\u0E32\u0E22\u0E22\u0E32 High-alert (ISMP)",
      ...u
    }), E.optimization?.generic_substitution?.length > 0 && i.push({
      title: "Generic Substitution",
      icon: "\u{1F48A}",
      priority: "MEDIUM",
      summary: `${E.optimization.generic_substitution.length} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E22\u0E32 Original \u0E17\u0E35\u0E48\u0E21\u0E35 Generic \u0E17\u0E14\u0E41\u0E17\u0E19\u0E44\u0E14\u0E49`,
      analysis: E.optimization.generic_substitution.slice(0, 2).map(o => o.drug?.substring(0, 30)).join(", "),
      recommendation: "\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19\u0E40\u0E1B\u0E47\u0E19 Generic \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E25\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19",
      ...u
    }), E.critical_values?.count > 0 && i.unshift({
      title: "Critical Lab Values",
      icon: "\u{1F9EA}",
      priority: "HIGH",
      summary: `${E.critical_values.count} Critical values \u0E43\u0E19 24 \u0E0A\u0E21.`,
      analysis: E.critical_values.alerts?.slice(0, 3).map(o => `${o.test_name}: ${o.result} (${o.patient_name})`).join("; ") || "",
      recommendation: "\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E27\u0E48\u0E32\u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E25\u0E49\u0E27\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22",
      ...u
    }), E.bottlenecks?.length > 0 && i.push({
      title: "Lab TAT Bottlenecks",
      icon: "\u{1F50D}",
      priority: "MEDIUM",
      summary: `${E.bottlenecks.length} tests TAT \u0E2A\u0E39\u0E07`,
      analysis: E.bottlenecks.map(o => `${o.test}: ${o.avg_tat} \u0E19\u0E32\u0E17\u0E35`).join(", "),
      recommendation: E.bottlenecks[0]?.recommendation || "\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07 workflow",
      ...u
    }), E.ha_readiness) {
    const o = E.ha_readiness;
    i.unshift({
      title: "HA Readiness Score",
      icon: o.overall_score >= 85 ? "\u2705" : o.overall_score >= 70 ? "\u26A0\uFE0F" : "\u{1F534}",
      priority: o.overall_score >= 85 ? "LOW" : o.overall_score >= 70 ? "MEDIUM" : "HIGH",
      summary: `HA Score: ${o.overall_score}/100 \u2014 ${o.status==="ready"?"\u0E1E\u0E23\u0E49\u0E2D\u0E21 Survey":o.status==="needs_improvement"?"\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07":"\u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07"}`,
      analysis: `Mortality: ${o.scores?.mortality}, Readmission: ${o.scores?.readmission}, Infection: ${o.scores?.infection}, Completion: ${o.scores?.completion}`,
      recommendation: o.overall_score < 85 ? "\u0E40\u0E23\u0E48\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E17\u0E35\u0E48\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E01\u0E48\u0E2D\u0E19 HA Survey" : "\u0E23\u0E31\u0E01\u0E29\u0E32\u0E23\u0E30\u0E14\u0E31\u0E1A\u0E04\u0E38\u0E13\u0E20\u0E32\u0E1E \u2014 \u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E1A Survey",
      ...u
    })
  }
  if (E.segmentation?.by_age?.length > 0) {
    const o = E.segmentation.by_age[0];
    i.unshift({
      title: "Patient Segmentation",
      icon: "\u{1F3AF}",
      priority: "MEDIUM",
      summary: `\u0E01\u0E25\u0E38\u0E48\u0E21 ${o.age_group} \u0E21\u0E32\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14 (${o.patients?.toLocaleString()} \u0E04\u0E19, ${o.revenue_share}% revenue)`,
      analysis: `\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C ${E.segmentation.by_age.length} \u0E01\u0E25\u0E38\u0E48\u0E21\u0E2D\u0E32\u0E22\u0E38, ${E.segmentation.by_payer?.length||0} \u0E2A\u0E34\u0E17\u0E18\u0E34`,
      recommendation: "\u0E2D\u0E2D\u0E01\u0E41\u0E1A\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E40\u0E09\u0E1E\u0E32\u0E30\u0E01\u0E25\u0E38\u0E48\u0E21\u0E40\u0E1B\u0E49\u0E32\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E1E\u0E34\u0E48\u0E21 Patient Experience",
      ...u
    })
  }
  if (E.loyalty?.length > 0) {
    const o = E.loyalty.find(r => r.segment?.includes("Loyal"));
    i.push({
      title: "Patient Loyalty Analysis",
      icon: "\u2764\uFE0F",
      priority: "LOW",
      summary: o ? `Loyal patients: ${o.patients?.toLocaleString()} \u0E04\u0E19 (7+ visits/year)` : "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C",
      analysis: E.loyalty.map(r => `${r.segment}: ${r.patients?.toLocaleString()}`).join(" \xB7 "),
      recommendation: "\u0E2A\u0E23\u0E49\u0E32\u0E07 Loyalty program \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A Frequent visitors",
      ...u
    })
  }
  if (E.top_services?.length > 0) {
    const o = E.top_services[0];
    i.unshift({
      title: "Top Thai Med Service",
      icon: "\u{1F33F}",
      priority: "MEDIUM",
      summary: `\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14: ${o.service_name||o.name||"\u2014"} (${(o.visits||o.count||0).toLocaleString()} \u0E04\u0E23\u0E31\u0E49\u0E07)`,
      analysis: `\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E08\u0E32\u0E01 ${E.top_services.length} \u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22`,
      recommendation: "\u0E40\u0E15\u0E23\u0E35\u0E22\u0E21\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E32\u0E01\u0E23\u0E43\u0E2B\u0E49\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E19\u0E34\u0E22\u0E21\u0E2A\u0E39\u0E07\u0E2A\u0E38\u0E14",
      ...u
    })
  }
  if (E.executive_kpis) {
    const o = E.executive_kpis;
    Object.entries(o).slice(0, 3).forEach(([r, n]) => {
      i.push({
        title: `KPI: ${r.replace(/_/g," ").toUpperCase()}`,
        icon: "\u{1F4CA}",
        priority: typeof n == "number" && n < 0 ? "HIGH" : "LOW",
        summary: typeof n == "object" ? JSON.stringify(n).substring(0, 80) : String(n),
        analysis: "Executive KPI summary \u0E08\u0E32\u0E01 AI Report Engine",
        recommendation: "\u0E17\u0E1A\u0E17\u0E27\u0E19 KPI \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E01\u0E25\u0E22\u0E38\u0E17\u0E18\u0E4C\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E16\u0E31\u0E14\u0E44\u0E1B",
        ...u
      })
    })
  }
  if (E.yoy_growth != null) {
    const o = E.yoy_growth;
    i.unshift({
      title: "Year-on-Year Growth",
      icon: o >= 0 ? "\u{1F4C8}" : "\u{1F4C9}",
      priority: Math.abs(o) > 15 ? "HIGH" : Math.abs(o) > 5 ? "MEDIUM" : "LOW",
      summary: `YoY Growth: ${o>=0?"+":""}${o}%`,
      analysis: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 vs \u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19\u0E2B\u0E19\u0E49\u0E32",
      recommendation: o < 0 ? "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E2A\u0E32\u0E40\u0E2B\u0E15\u0E38\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E25\u0E07 \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32\u0E41\u0E1C\u0E19\u0E01\u0E17\u0E35\u0E48\u0E21\u0E35\u0E1C\u0E25\u0E01\u0E23\u0E30\u0E17\u0E1A\u0E2A\u0E39\u0E07" : "\u0E23\u0E31\u0E01\u0E29\u0E32\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15 \u2014 \u0E02\u0E22\u0E32\u0E22\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E17\u0E33\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E14\u0E35",
      ...u
    })
  }
  if (E.dept_ranking?.length > 0) {
    const o = E.dept_ranking[0];
    i.push({
      title: "Top Department",
      icon: "\u{1F3C6}",
      priority: "LOW",
      summary: `\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A 1: ${o.dept||o.department||"\u2014"} \u2014 \u0E3F${((o.revenue||o.total||0)/1e6).toFixed(1)}M`,
      analysis: `\u0E08\u0E31\u0E14\u0E2D\u0E31\u0E19\u0E14\u0E31\u0E1A\u0E08\u0E32\u0E01 ${E.dept_ranking.length} \u0E41\u0E1C\u0E19\u0E01`,
      recommendation: "\u0E28\u0E36\u0E01\u0E29\u0E32 Best practice \u0E08\u0E32\u0E01 Top department \u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E02\u0E22\u0E32\u0E22\u0E1C\u0E25\u0E44\u0E1B\u0E22\u0E31\u0E07\u0E41\u0E1C\u0E19\u0E01\u0E2D\u0E37\u0E48\u0E19",
      ...u
    })
  }
  if (E.fiscal_years?.length >= 2) {
    const o = E.fiscal_years,
      r = o[o.length - 1],
      n = o[o.length - 2],
      a = r.comparable_revenue ?? r.total_revenue ?? 0,
      l = n.comparable_revenue ?? n.total_revenue ?? 0,
      s = l > 0 ? Math.round((a - l) / l * 1e3) / 10 : 0;
    i.unshift({
      title: "\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E40\u0E17\u0E35\u0E22\u0E1A\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13",
      icon: "\u{1F4C5}",
      priority: Math.abs(s) > 10 ? "HIGH" : "LOW",
      summary: `${r.fiscal_label||"\u0E1B\u0E35\u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19"}: \u0E3F${(a/1e6).toFixed(1)}M (${s>=0?"+":""}${s}% vs ${n.fiscal_label||"\u0E1B\u0E35\u0E01\u0E48\u0E2D\u0E19"})`,
      analysis: `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E1B\u0E35\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 ${o.length} \u0E1B\u0E35 \u2014 Comparable months analysis`,
      recommendation: s < -5 ? "\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E25\u0E14\u0E25\u0E07\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22" : "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E23\u0E32\u0E22\u0E44\u0E14\u0E49\u0E40\u0E1B\u0E47\u0E19\u0E1A\u0E27\u0E01 \u2014 \u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E15\u0E48\u0E2D\u0E44\u0E1B",
      ...u
    })
  }
  return i
}

function C0({
  data: E,
  theme: e = "default",
  title: u = "AI Intelligence"
}) {
  const i = $.useMemo(() => j0(E, e), [E, e]);
  return !E || i.length === 0 ? null : t.jsxs("div", {
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
      children: i.map((o, r) => t.jsx(X, {
        ...o,
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
  size: i = "sm"
}) => {
  const o = {
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
    r = o[E] || o.MEDIUM,
    n = {
      sm: "10px",
      md: "11px",
      lg: "12px"
    };
  return t.jsxs("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontSize: n[i],
      fontWeight: 800,
      padding: i === "sm" ? "2px 6px" : i === "md" ? "4px 8px" : "6px 10px",
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
    target: i,
    trend: o,
    status: r = "normal",
    icon: n = "\u{1F4CA}",
    gradient: a = "#7c3aed"
  }) => {
    const l = u0[r] || u0.normal,
      s = o != null && Number.isFinite(Number(o)),
      d = s ? Number(o) : 0,
      x = d > 0 ? "#10b981" : d < 0 ? "#f43f5e" : "#94a3b8",
      p = d > 0 ? "\u2191" : d < 0 ? "\u2193" : "\u2192",
      b = typeof e == "number" ? e : parseFloat(e),
      m = Number.isFinite(b);
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
          children: [n, " ", E]
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
      }), i != null && m && t.jsxs("div", {
        style: P0,
        children: [t.jsxs("div", {
          style: I0,
          children: ["Target: ", i, typeof i == "number" && u && !String(u).includes("%") ? u : ""]
        }), t.jsx("div", {
          style: W0,
          children: t.jsx("div", {
            style: {
              height: "100%",
              borderRadius: "99px",
              background: `linear-gradient(90deg, ${l.color}, ${l.color}dd)`,
              width: `${Math.min(Math.max(b/i*100,0),100)}%`,
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
    minWidth: i = "165px"
  }) => {
    const o = e === "auto-fit" ? `grid-template-columns: repeat(auto-fit, minmax(${i}, 1fr))` : `grid-template-columns: repeat(${e}, 1fr)`;
    return t.jsx("div", {
      style: {
        display: "grid",
        gap: u,
        [o.split(":")[0]]: o.split(":")[1]
      },
      children: E.map((r, n) => t.jsx(L0, {
        label: r.label,
        value: r.value,
        unit: r.unit,
        target: r.target,
        trend: r.trend,
        status: r.status,
        icon: r.icon,
        gradient: r.gradient
      }, n))
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
    icon: i = "\u{1F3E5}",
    color: o = "#7c3aed",
    size: r = "md",
    showSegments: n = !1,
    segments: a = []
  }) => {
    const l = e0[r] || e0.md,
      {
        radius: s,
        circumference: d,
        offset: x,
        scoreColor: p
      } = $.useMemo(() => {
        const b = l.outer / 2,
          m = 2 * Math.PI * (b - 15),
          f = E / e * 100,
          h = m - f / 100 * m,
          v = E >= 80 ? "#10b981" : E >= 60 ? "#f59e0b" : "#f43f5e";
        return {
          radius: b,
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
            children: i
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
      }), n && a.length > 0 && t.jsx("div", {
        style: {
          width: "100%"
        },
        children: a.map((b, m) => t.jsxs("div", {
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
              background: b.color
            }
          }), t.jsx("span", {
            style: {
              flex: 1,
              color: "var(--md-text-secondary)"
            },
            children: b.label
          }), t.jsxs("span", {
            style: {
              fontWeight: 700,
              color: "var(--md-text-primary)"
            },
            children: [b.value, "/100"]
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
    icon: i = "\u{1F6A8}",
    actions: o = [],
    onDismiss: r
  }) => {
    const n = {
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
      a = n[E] || n.warning;
    return t.jsxs("div", {
      style: {
        background: a.bg,
        border: `1.5px solid ${a.border}`,
        borderLeft: `4px solid ${a.border}`,
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
          children: i
        }), t.jsxs("div", {
          style: {
            flex: 1
          },
          children: [t.jsx("h3", {
            style: {
              margin: 0,
              fontSize: "14px",
              fontWeight: 800,
              color: a.text,
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
      }), o.length > 0 && t.jsx("div", {
        style: {
          display: "flex",
          gap: "8px",
          marginTop: "12px",
          flexWrap: "wrap"
        },
        children: o.map((l, s) => t.jsx("button", {
          onClick: l.onClick,
          style: {
            padding: "6px 14px",
            fontSize: "12px",
            fontWeight: 700,
            border: l.primary ? "none" : `1px solid ${a.border}`,
            borderRadius: "6px",
            background: l.primary ? a.border : a.light,
            color: l.primary ? "#fff" : a.text,
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "all 0.2s ease"
          },
          onMouseEnter: d => {
            d.target.style.transform = "translateY(-2px)", d.target.style.boxShadow = `0 4px 12px ${a.border}40`
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

function q0(E, e = 1) {
  return E == null || Number.isNaN(Number(E)) ? "\u2014" : `${Number(E).toFixed(e)}%`
}

function Y0({
  icon: E,
  title: e,
  text: u,
  list: i,
  color: o = "#7c3aed"
}) {
  return t.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderLeft: `3px solid ${o}`,
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
    }), i && t.jsx("ul", {
      style: {
        margin: "4px 0 0 0",
        paddingLeft: "18px"
      },
      children: i.map((r, n) => t.jsx("li", {
        style: {
          fontSize: "13px",
          color: "var(--md-text-primary)",
          lineHeight: 1.7,
          fontWeight: 500,
          marginBottom: "3px"
        },
        children: r
      }, n))
    })]
  })
}

function Q0({
  label: E,
  value: e,
  sub: u,
  color: i = "#7c3aed",
  accent: o
}) {
  return t.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderTop: `3px solid ${i}`,
      borderRadius: "10px",
      padding: "10px 12px",
      minWidth: 0
    },
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
        color: o || i,
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
  accentColor: i = "#7c3aed",
  headerGradient: o,
  narrative: r
}) {
  if (!r) return null;
  const n = r.headlineColor || i,
    a = `linear-gradient(135deg, ${i}14, ${i}08)`;
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
        background: o || a,
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
          background: `${i}18`,
          color: i,
          border: `1px solid ${i}40`
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
            background: `${n}14`,
            borderLeft: `3px solid ${n}`,
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
          children: r.sections.map((l, s) => t.jsx(Y0, {
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
    i = c(e.completed),
    o = c(e.still_here_breakdown?.likely_waiting ?? e.still_here),
    r = c(e.sla_pct),
    n = c(e.avg_total_minutes ?? e.avg_wait_minutes),
    a = c(e.p90_wait),
    l = c(e.dropout_pct),
    s = c(e.capacity_utilization),
    d = c(e.throughput);
  let x, p;
  return a >= 90 || l >= 10 ? (x = `\u{1F534} OPD \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E21\u0E35 Bottleneck \u2014 P90 Wait ${a} \u0E19\u0E32\u0E17\u0E35 \xB7 Dropout ${l.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21 capacity \u0E17\u0E31\u0E19\u0E17\u0E35`, p = "#f43f5e") : r >= 80 && n <= 30 ? (x = `\u2705 OPD \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E15\u0E32\u0E21\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 \u2014 SLA ${r.toFixed(0)}% \xB7 Avg Wait ${n.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 \xB7 Visits ${g(u)} \u0E23\u0E32\u0E22`, p = "#10b981") : (x = `OPD \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${g(u)} \u0E23\u0E32\u0E22 (\u0E08\u0E1A\u0E41\u0E25\u0E49\u0E27 ${g(i)} \xB7 \u0E22\u0E31\u0E07\u0E23\u0E2D ${g(o)}) \xB7 SLA ${r.toFixed(0)}% \xB7 Avg Wait ${n.toFixed(0)} \u0E19\u0E32\u0E17\u0E35`, p = "#0ea5e9"), {
    headline: x,
    headlineColor: p,
    kpi: [{
      label: "Visits Today",
      value: g(u),
      sub: `\u0E08\u0E1A ${g(i)} \xB7 \u0E23\u0E2D ${g(o)}`,
      color: "#0284c7"
    }, {
      label: "SLA %",
      value: `${r.toFixed(0)}%`,
      sub: r >= 80 ? "\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C" : "\u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C",
      color: y(r, 80, 65)
    }, {
      label: "Avg Wait",
      value: `${n.toFixed(0)} \u0E19\u0E32\u0E17\u0E35`,
      sub: `P90: ${a} \u0E19\u0E32\u0E17\u0E35`,
      color: A(n, 30, 45)
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
      text: `Average Wait ${n.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 \xB7 P90 ${a} \u0E19\u0E32\u0E17\u0E35 \xB7 SLA ${r.toFixed(1)}%. ${a>=90?"Tail \u0E22\u0E32\u0E27 \u2014 \u0E1A\u0E48\u0E07\u0E0A\u0E35\u0E49 bottleneck \u0E17\u0E35\u0E48\u0E08\u0E38\u0E14\u0E43\u0E14\u0E08\u0E38\u0E14\u0E2B\u0E19\u0E36\u0E48\u0E07 (\u0E04\u0E31\u0E14\u0E01\u0E23\u0E2D\u0E07\u2192\u0E1E\u0E1A\u0E41\u0E1E\u0E17\u0E22\u0E4C \u0E2B\u0E23\u0E37\u0E2D \u0E23\u0E2D\u0E22\u0E32)":n<=30?"Patient Flow \u0E44\u0E2B\u0E25\u0E25\u0E37\u0E48\u0E19":"\u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07"}`,
      color: A(a, 60, 90)
    }, {
      icon: "\u{1F4C9}",
      title: "Demand vs Capacity",
      text: `Visits ${g(u)} \u0E23\u0E32\u0E22 \xB7 \u0E08\u0E1A\u0E41\u0E25\u0E49\u0E27 ${g(i)} \xB7 \u0E22\u0E31\u0E07\u0E23\u0E2D ${g(o)} \xB7 Throughput ${d}/\u0E0A\u0E21. \xB7 Utilization ${s.toFixed(0)}%. ${s>=95?"\u26A0 \u0E41\u0E19\u0E48\u0E19\u0E40\u0E01\u0E34\u0E19 95% \u2014 \u0E40\u0E1E\u0E34\u0E48\u0E21 slot \u0E2B\u0E23\u0E37\u0E2D extended hours":s<=60?"Under-utilization \u2014 marketing/outreach \u0E2D\u0E32\u0E08\u0E0A\u0E48\u0E27\u0E22":"Capacity balance \u0E14\u0E35"}`,
      color: s >= 95 || s <= 60 ? "#f59e0b" : "#10b981"
    }]
  }
}

function X0(E) {
  const e = E?.bedOccupancy?.summary,
    u = E?.alosData?.summary,
    i = E?.ipdAnalytics,
    o = E?.readmission;
  if (!e && !u && !i) return null;
  const r = c(e?.occupancy_rate),
    n = c(e?.total_beds),
    a = c(e?.occupied),
    l = c(u?.overall_alos),
    s = c(i?.readmit_rate),
    d = c(i?.readmit_count),
    x = c(i?.mortality_rate),
    p = c(i?.bed_turnover_rate),
    b = c(i?.overstay_pct),
    m = (o?.patients || []).filter(v => ["high", "moderate"].includes(v?.risk_level)).length;
  let f, h;
  return r >= 95 ? (f = `\u{1F534} Bed Capacity Crisis \u2014 Occupancy ${r.toFixed(0)}% (${a}/${n}) \xB7 \u0E01\u0E23\u0E30\u0E17\u0E1A admission flow \xB7 \u0E15\u0E49\u0E2D\u0E07 expedite discharge`, h = "#f43f5e") : x >= 3 || s > 10 ? (f = `\u26A0 IPD Quality \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Mortality ${x.toFixed(1)}% \xB7 Readmit ${s.toFixed(1)}% \xB7 \u0E17\u0E1A\u0E17\u0E27\u0E19 Clinical Pathway + Discharge planning`, h = "#f59e0b") : l > 6 || b > 20 ? (f = `\u26A0 IPD Flow \u0E15\u0E49\u0E2D\u0E07 attention \u2014 ALOS ${l.toFixed(1)} \u0E27\u0E31\u0E19 \xB7 Overstay ${b.toFixed(1)}% \xB7 Clinical Pathway review`, h = "#f59e0b") : r >= 70 && r <= 85 && l <= 5 && x < 2 ? (f = `\u2705 IPD \u0E17\u0E33\u0E07\u0E32\u0E19\u0E43\u0E19 Optimal Zone \u2014 Occupancy ${r.toFixed(0)}% \xB7 ALOS ${l.toFixed(1)} \u0E27\u0E31\u0E19 \xB7 Mortality ${x.toFixed(1)}% \xB7 Patient Flow \u0E14\u0E35`, h = "#10b981") : (f = `IPD: Occupancy ${r.toFixed(0)}% (${a}/${n}) \xB7 ALOS ${l.toFixed(1)} \u0E27\u0E31\u0E19 \xB7 Readmit ${s.toFixed(1)}% \xB7 Mortality ${x.toFixed(1)}%`, h = "#0ea5e9"), {
    headline: f,
    headlineColor: h,
    kpi: [{
      label: "Occupancy",
      value: `${r.toFixed(0)}%`,
      sub: `${a}/${n} beds`,
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
      value: `${b.toFixed(1)}%`,
      sub: b > 20 ? "\u0E2A\u0E39\u0E07" : "\u0E1B\u0E01\u0E15\u0E34",
      color: A(b, 10, 20)
    }],
    sections: [{
      icon: "\u{1F6CF}\uFE0F",
      title: "Bed Management",
      text: `${a}/${n} \u0E40\u0E15\u0E35\u0E22\u0E07\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49 (${r.toFixed(0)}%) \xB7 Turnover ${p.toFixed(1)}x. ${r>=95?"\u{1F534} \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 open surge beds, expedite discharge":r>=85?"\u0E43\u0E01\u0E25\u0E49\u0E40\u0E15\u0E47\u0E21 \u2014 monitor discharge pace":r>=70?"\u2705 Optimal range (70-85%)":"Under-utilized \u2014 \u0E1E\u0E34\u0E08\u0E32\u0E23\u0E13\u0E32 marketing / service expansion"}`,
      color: r >= 95 ? "#f43f5e" : r >= 70 ? "#10b981" : "#f59e0b"
    }, {
      icon: "\u23F1\uFE0F",
      title: "ALOS & Overstay",
      text: `ALOS ${l.toFixed(1)} \u0E27\u0E31\u0E19 \xB7 Overstay ${b.toFixed(1)}%. ${l>6?"ALOS \u0E22\u0E32\u0E27 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Discharge planning + Clinical Pathway":b>20?"Overstay \u0E2A\u0E39\u0E07 \u2014 Daily Discharge Planning Meeting":"\u2705 LOS \u0E17\u0E33\u0E07\u0E32\u0E19\u0E44\u0E14\u0E49\u0E14\u0E35"}`,
      color: l > 6 || b > 20 ? "#f59e0b" : "#10b981"
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
    i = E?.erSurge;
  if (!e && !u) return null;
  const o = c(e?.avg_time_to_doctor),
    r = c(e?.p90_time_to_doctor),
    n = c(e?.lwbs_rate),
    a = c(e?.return_visit_rate),
    l = e?.today_acuity || {},
    s = c(l.acuity_pct),
    d = !!i?.surge_alert,
    x = Array.isArray(u) ? u.length : u?.total ?? null,
    p = c(l.total ?? 0),
    b = x ?? p,
    m = d ? "critical" : n >= 2 ? "high" : "normal",
    f = c(l.resus),
    h = c(l.emerg),
    v = f + h;
  let B, D;
  return m === "critical" || n >= 5 ? (B = `\u{1F6A8} ER Surge \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07 ${b} \u0E23\u0E32\u0E22 \xB7 LWBS ${n.toFixed(1)}% \xB7 \u0E40\u0E23\u0E35\u0E22\u0E01 extra staff + open fast-track`, D = "#f43f5e") : r >= 60 || s >= 30 ? (B = `\u26A0 ER Under Pressure \u2014 P90 Time-to-Doctor ${r} \u0E19\u0E32\u0E17\u0E35 \xB7 High Acuity ${s.toFixed(0)}% \xB7 ${b} \u0E23\u0E32\u0E22`, D = "#f59e0b") : o <= 30 && n < 2 ? (B = `\u2705 ER Flow \u0E14\u0E35 \u2014 Door-to-Doc ${o.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 (P90 ${r}) \xB7 LWBS ${n.toFixed(1)}% \xB7 ${b} \u0E23\u0E32\u0E22 \u0E13 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19`, D = "#10b981") : (B = `ER: ${g(b)} \u0E23\u0E32\u0E22 \u0E13 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 \xB7 TTD ${o.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 \xB7 LWBS ${n.toFixed(1)}% \xB7 High Acuity ${s.toFixed(0)}%`, D = "#0ea5e9"), {
    headline: B,
    headlineColor: D,
    kpi: [{
      label: "Patients Now",
      value: g(b),
      sub: `\u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E2B\u0E49\u0E2D\u0E07 \xB7 \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49\u0E23\u0E27\u0E21 ${g(p)}`,
      color: m === "critical" ? "#f43f5e" : m === "high" ? "#f59e0b" : "#10b981"
    }, {
      label: "Door-to-Doctor",
      value: `${o.toFixed(0)} \u0E19\u0E32\u0E17\u0E35`,
      sub: `P90: ${r} \u0E19\u0E32\u0E17\u0E35`,
      color: A(o, 30, 60)
    }, {
      label: "LWBS %",
      value: `${n.toFixed(1)}%`,
      sub: n >= 5 ? "\u0E27\u0E34\u0E01\u0E24\u0E15" : n >= 2 ? "\u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u0E14\u0E35",
      color: A(n, 2, 5)
    }, {
      label: "High Acuity",
      value: `${s.toFixed(0)}%`,
      sub: `L1: ${f} \xB7 L2: ${h}`,
      color: s >= 30 ? "#f43f5e" : "#0ea5e9"
    }, {
      label: "Return 72h",
      value: `${a.toFixed(1)}%`,
      sub: "Bounce-back rate",
      color: A(a, 3, 5)
    }, {
      label: "Surge Status",
      value: d ? "\u{1F6A8} Active" : "\u2705 Normal",
      sub: d ? "Extra staff" : "Baseline",
      color: d ? "#f43f5e" : "#10b981"
    }],
    sections: [{
      icon: "\u26A1",
      title: "ER Throughput & Flow",
      text: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22 \u0E13 \u0E1B\u0E31\u0E08\u0E08\u0E38\u0E1A\u0E31\u0E19 ${g(b)} \u0E23\u0E32\u0E22 \xB7 Door-to-Doctor ${o.toFixed(0)} \u0E19\u0E32\u0E17\u0E35 (P90 ${r}). ${r>=60?"Tail \u0E22\u0E32\u0E27 \u2014 bottleneck \u0E17\u0E35\u0E48 triage/physician assignment":o===0&&b>0?"Triage \u0E40\u0E23\u0E47\u0E27 \u0E41\u0E15\u0E48\u0E15\u0E34\u0E14\u0E15\u0E32\u0E21\u0E40\u0E27\u0E25\u0E32\u0E23\u0E2D\u0E23\u0E31\u0E01\u0E29\u0E32\u0E08\u0E23\u0E34\u0E07\u0E14\u0E49\u0E27\u0E22 (\u0E14\u0E39 ER Diversion)":"Flow \u0E1B\u0E01\u0E15\u0E34"}`,
      color: A(r, 60, 90)
    }, {
      icon: "\u{1F6A8}",
      title: "Acuity & Safety",
      text: `High Acuity ${s.toFixed(0)}% (L1 ${f} \xB7 L2 ${h}) \xB7 LWBS ${n.toFixed(1)}% \xB7 Return 72h ${a.toFixed(1)}%. ${s>=30?"\u26A0 Case mix \u0E2B\u0E19\u0E31\u0E01 \u2014 staff cognitive load \u0E2A\u0E39\u0E07":n>=5?"LWBS \u0E2A\u0E39\u0E07 \u2014 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E44\u0E21\u0E48\u0E23\u0E2D \u0E40\u0E2A\u0E35\u0E48\u0E22\u0E07 missed care":"\u2705 Safety indicators \u0E14\u0E35"}`,
      color: s >= 30 || n >= 5 ? "#f59e0b" : "#10b981"
    }]
  }
}

function uu(E) {
  const e = E?.ncdToday,
    u = E?.ncdAnalytics;
  if (!e && !u) return null;
  const i = c(e?.total),
    o = c(e?.completed),
    r = i > 0 ? o / i * 100 : 0,
    n = c(u?.completion_rate),
    a = n > 0 ? n : r,
    l = c(u?.avg_wait_time ?? e?.avg_wait_time),
    s = c(u?.wait_sla_pct),
    d = c(u?.nci),
    x = c(u?.revisit_rate),
    p = c(u?.avg_revenue_per_visit),
    b = c(u?.avg_daily_visits),
    m = e?.diseases || e?.disease_breakdown || {},
    f = c(m.dm ?? m.DM),
    h = c(m.ht ?? m.HT),
    v = c(m.ckd ?? m.CKD);
  let B, D;
  return d > 0 && d < 50 ? (B = `\u{1F534} NCD \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 NCI ${d}/100 \xB7 Wait ${l}m (SLA ${s}%) \xB7 Revisit ${x.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07 intervention \u0E14\u0E48\u0E27\u0E19`, D = "#f43f5e") : l >= 45 || x >= 15 || s < 60 ? (B = `\u26A0 NCD \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Wait ${l}m \xB7 SLA ${s}% \xB7 Revisit ${x.toFixed(1)}% \xB7 NCI ${d}/100`, D = "#f59e0b") : d >= 80 && a >= 95 ? (B = `\u2705 NCD Care \u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 NCI ${d}/100 \xB7 Completion ${a.toFixed(1)}% \xB7 ${g(i)} \u0E23\u0E32\u0E22`, D = "#10b981") : (B = `NCD \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${g(i)} \u0E23\u0E32\u0E22 (DM ${f} \xB7 HT ${h} \xB7 CKD ${v}) \xB7 NCI ${d}/100 \xB7 Wait ${l}m \xB7 SLA ${s}%`, D = "#0ea5e9"), {
    headline: B,
    headlineColor: D,
    kpi: [{
      label: "Today",
      value: g(i),
      sub: `\u0E08\u0E1A ${o} \xB7 Avg daily ${Math.round(b)}`,
      color: "#0f766e"
    }, {
      label: "Disease Mix",
      value: `${f}/${h}`,
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
      text: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(i)} \u0E23\u0E32\u0E22 (\u0E08\u0E1A ${o}) \xB7 Avg daily ${b.toFixed(0)} \xB7 Wait ${l}m (SLA \u226430m: ${s}%) \xB7 Completion ${a.toFixed(1)}%. ${l>=45?"\u{1F534} Wait \u0E2A\u0E39\u0E07 \u2014 Pre-lab + Fast-track Stable NCD + \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E0A\u0E48\u0E27\u0E07 Peak (07:00) + Telemedicine refill":"\u2705 Flow \u0E1B\u0E01\u0E15\u0E34"}`,
      color: l >= 45 ? "#f43f5e" : "#10b981"
    }, {
      icon: "\u{1F3E5}",
      title: "Disease Control Intelligence",
      text: `\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: DM ${f} \xB7 HT ${h} \xB7 CKD ${v}. Revisit 7d ${x.toFixed(1)}%. ${x>=15?"\u26A0 Revisit \u0E2A\u0E39\u0E07 \u2014 \u0E41\u0E22\u0E01 Planned (Lab follow-up, \u0E1B\u0E23\u0E31\u0E1A\u0E22\u0E32) vs Unplanned (BP crisis, Hypoglycemia) \xB7 Home BP/FBS monitoring \xB7 \u0E1B\u0E23\u0E31\u0E1A\u0E22\u0E32\u0E15\u0E31\u0E49\u0E07\u0E41\u0E15\u0E48\u0E04\u0E23\u0E31\u0E49\u0E07\u0E41\u0E23\u0E01":"\u2705 Disease control \u0E14\u0E35"}. \u0E02\u0E32\u0E14\u0E19\u0E31\u0E14 = Uncontrolled \u2192 Complication (Stroke/MI/CKD) \u2192 IPD cost \u0E2A\u0E39\u0E07`,
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
  const i = c(e?.total_prescriptions ?? u?.total_prescriptions),
    o = c(e?.opd_prescriptions),
    r = c(e?.ipd_prescriptions),
    n = c(e?.total_value),
    a = c(u?.generic_ratio),
    l = c(u?.drug_cost_per_rx),
    s = c(u?.avg_daily_rx),
    d = c(u?.rev_cost_ratio),
    x = c(u?.ppi),
    p = c(u?.on_duty?.pharmacists?.length),
    b = p > 0 ? Math.round(i / p) : 0;
  let m, f;
  return a < 30 ? (m = `\u{1F534} Generic Adoption \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 ${a.toFixed(1)}% (\u0E40\u0E1B\u0E49\u0E32 \u226580%) \xB7 PPI ${x}/100 \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22 Generic First \u0E14\u0E48\u0E27\u0E19`, f = "#f43f5e") : a < 50 || d < 1 ? (m = `\u26A0 Generic Substitution \u0E15\u0E48\u0E33 \u2014 ${a.toFixed(1)}% \xB7 Rev/Cost ${d.toFixed(2)} \xB7 \u0E40\u0E2A\u0E35\u0E22\u0E42\u0E2D\u0E01\u0E32\u0E2A\u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19`, f = "#f59e0b") : a >= 75 && d >= 1.3 && x >= 75 ? (m = `\u2705 \u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23\u0E23\u0E21\u0E21\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35 \u2014 Generic ${a.toFixed(0)}% \xB7 Rev/Cost ${d.toFixed(2)} \xB7 PPI ${x}/100`, f = "#10b981") : (m = `Pharmacy: ${g(i)} Rx (OPD ${o} \xB7 IPD ${r}) \xB7 Generic ${a.toFixed(1)}% \xB7 Cost/Rx \u0E3F${g(l)} \xB7 PPI ${x}/100`, f = "#0ea5e9"), {
    headline: m,
    headlineColor: f,
    kpi: [{
      label: "Rx Today",
      value: g(i),
      sub: `OPD ${o} \xB7 IPD ${r}`,
      color: "#10b981"
    }, {
      label: "Generic %",
      value: `${a.toFixed(1)}%`,
      sub: a >= 75 ? "\u0E14\u0E35" : a >= 50 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E15\u0E48\u0E33",
      color: y(a, 75, 50)
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
      value: p > 0 ? `${b}/\u0E04\u0E19` : `${g(Math.round(s))}/\u0E27\u0E31\u0E19`,
      sub: p > 0 ? `${p} \u0E40\u0E20\u0E2A\u0E31\u0E0A\u0E01\u0E23` : "Avg daily",
      color: "#7c3aed"
    }],
    sections: [{
      icon: "\u{1F48A}",
      title: "Formulary & Generic Policy",
      text: `Generic ${a.toFixed(1)}% (\u0E40\u0E1B\u0E49\u0E32 \u226580%) \xB7 Cost/Rx \u0E3F${g(l)} \xB7 \u0E22\u0E2D\u0E14\u0E08\u0E48\u0E32\u0E22\u0E22\u0E32\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(i)} Rx (OPD ${o} \xB7 IPD ${r}) \u0E21\u0E39\u0E25\u0E04\u0E48\u0E32 \u0E3F${g(n)}. ${a<30?"\u{1F534} Generic \u0E15\u0E48\u0E33\u0E21\u0E32\u0E01 \u2014 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E38\u0E01 10% \u0E1B\u0E23\u0E30\u0E2B\u0E22\u0E31\u0E14\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19\u0E44\u0E14\u0E49\u0E21\u0E35\u0E19\u0E31\u0E22\u0E2A\u0E33\u0E04\u0E31\u0E0D":a<50?"\u26A0 \u0E22\u0E31\u0E07 substitute \u0E44\u0E14\u0E49\u0E2D\u0E35\u0E01\u0E21\u0E32\u0E01 \u2014 P&T Committee \u0E17\u0E1A\u0E17\u0E27\u0E19 formulary":"\u2705 Formulary mix \u0E14\u0E35"}`,
      color: y(a, 75, 50)
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
  const i = c(e?.total_orders),
    o = c(e?.completed),
    r = c(e?.pending),
    n = c(e?.unique_patients),
    a = Array.isArray(e?.critical_values) ? e.critical_values.length : c(e?.critical_values_count),
    l = c(u?.avg_tat),
    s = c(u?.p90_tat),
    d = c(u?.tat_sla_pct),
    x = c(u?.lpi),
    p = c(u?.completion_rate),
    b = i > 0 ? Math.round(o / i * 100) : 0,
    m = p > 0 ? p : b,
    f = c(e?.abnormal_rate ?? u?.abnormal_rate);
  let h, v;
  return a >= 10 || s >= 180 ? (h = `\u{1F534} Lab \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 Critical Values ${a} \u0E23\u0E32\u0E22 \xB7 P90 TAT ${s}m (SLA ${d}%) \xB7 \u0E15\u0E49\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E31\u0E19\u0E17\u0E35`, v = "#f43f5e") : a >= 5 || l >= 120 || m < 70 || d < 50 ? (h = `\u26A0 Lab \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Critical ${a} \xB7 TAT ${l}m (SLA ${d}%) \xB7 Completion ${m.toFixed(0)}% \xB7 LPI ${x}`, v = "#f59e0b") : l <= 60 && m >= 90 && d >= 85 ? (h = `\u2705 Lab TAT \u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 ${g(i)} orders \xB7 Avg ${l}m \xB7 SLA ${d}% \xB7 LPI ${x}/100`, v = "#10b981") : (h = `Lab: ${g(i)} orders (\u0E08\u0E1A ${o} \xB7 \u0E04\u0E49\u0E32\u0E07 ${r}) \xB7 TAT ${l}m (P90 ${s}) \xB7 SLA ${d}% \xB7 Critical ${a}`, v = "#0ea5e9"), {
    headline: h,
    headlineColor: v,
    kpi: [{
      label: "Orders Today",
      value: g(i),
      sub: `\u0E08\u0E1A ${o} \xB7 \u0E04\u0E49\u0E32\u0E07 ${r}`,
      color: "#0ea5e9"
    }, {
      label: "\u{1F6A8} Critical Values",
      value: g(a),
      sub: a > 0 ? "\u0E15\u0E49\u0E2D\u0E07\u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C" : "\u0E44\u0E21\u0E48\u0E21\u0E35",
      color: a >= 10 ? "#f43f5e" : a >= 5 || a > 0 ? "#f59e0b" : "#10b981"
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
      text: `Critical Values \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${a} \u0E23\u0E32\u0E22 \xB7 Unique Patients ${n} \xB7 Abnormal Rate ${f.toFixed(1)}%. ${a>=10?"\u{1F534} Critical values \u0E2A\u0E39\u0E07\u0E21\u0E32\u0E01 \u2014 \u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E27\u0E48\u0E32\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E44\u0E02\u0E49\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E41\u0E08\u0E49\u0E07\u0E04\u0E23\u0E1A\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22 (WHO Critical Value Protocol)":a>0?"\u26A0 \u0E15\u0E49\u0E2D\u0E07\u0E41\u0E08\u0E49\u0E07\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E17\u0E38\u0E01\u0E23\u0E32\u0E22 + \u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 Closed-loop communication":"\u2705 \u0E44\u0E21\u0E48\u0E21\u0E35 Critical Values"}`,
      color: a >= 10 ? "#f43f5e" : a > 0 ? "#f59e0b" : "#10b981"
    }, {
      icon: "\u{1F52C}",
      title: "Throughput & Completion",
      text: `${g(i)} orders \xB7 \u0E08\u0E1A ${o} \xB7 \u0E04\u0E49\u0E32\u0E07 ${r} (Completion ${m.toFixed(1)}%) \xB7 LPI ${x}/100. ${r>150?"\u26A0 Pending \u0E2A\u0E39\u0E07 \u2014 backlog risk \xB7 \u0E40\u0E1E\u0E34\u0E48\u0E21\u0E04\u0E19/\u0E40\u0E1B\u0E34\u0E14 STAT queue":m<70?"Completion \u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08 LIS Interface + Sample rejection":"\u2705 Throughput \u0E14\u0E35"}`,
      color: r > 150 || m < 70 ? "#f59e0b" : "#10b981"
    }]
  }
}

function tu(E) {
  const e = E?.xrayToday,
    u = E?.xrayAnalytics;
  if (!e && !u) return null;
  const i = c(e?.total_requests ?? e?.total),
    o = c(e?.completed),
    r = c(e?.waiting),
    n = i > 0 ? o / i * 100 : 0,
    a = c(e?.avg_wait_time ?? u?.avg_wait_time),
    l = c(u?.p90_wait_time),
    s = c(u?.wait_sla_pct);
  c(e?.avg_tat ?? u?.avg_tat);
  const d = c(u?.avg_revenue_per_visit),
    x = c(u?.rpi);
  let p, b;
  return l >= 300 || x < 50 ? (p = `\u{1F534} X-Ray \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 P90 Wait ${l} \u0E19\u0E32\u0E17\u0E35 \xB7 Wait SLA ${s}% \xB7 RPI ${x}/100 \xB7 peak-hour bottleneck`, b = "#f43f5e") : a >= 60 || n < 75 || s < 70 ? (p = `\u26A0 X-Ray Queue \u0E2A\u0E30\u0E2A\u0E21 \u2014 Avg Wait ${a}m \xB7 P90 ${l}m \xB7 Completion ${n.toFixed(0)}% \xB7 SLA ${s}%`, b = "#f59e0b") : n >= 90 && a <= 30 && l < 60 ? (p = `\u2705 Radiology Flow \u0E14\u0E35 \u2014 ${g(i)} requests \xB7 Wait ${a}m (P90 ${l}m) \xB7 SLA ${s}%`, b = "#10b981") : (p = `X-Ray: ${g(i)} requests \xB7 Completion ${n.toFixed(0)}% \xB7 Wait ${a}m (P90 ${l}m) \xB7 SLA ${s}%`, b = "#0ea5e9"), {
    headline: p,
    headlineColor: b,
    kpi: [{
      label: "Requests",
      value: g(i),
      sub: `\u0E08\u0E1A ${o} \xB7 \u0E23\u0E2D ${r}`,
      color: "#06b6d4"
    }, {
      label: "Completion",
      value: `${n.toFixed(0)}%`,
      sub: n >= 90 ? "\u0E14\u0E35" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A",
      color: y(n, 90, 75)
    }, {
      label: "Avg Wait",
      value: `${a} \u0E19\u0E32\u0E17\u0E35`,
      sub: "Queue avg",
      color: A(a, 30, 60)
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
      text: `${g(i)} requests \xB7 \u0E08\u0E1A ${o} \xB7 \u0E23\u0E2D ${r} (Completion ${n.toFixed(0)}%) \xB7 Avg Wait ${a}m \xB7 P90 ${l}m \xB7 SLA ${s}%. ${l>=300?"\u{1F534} P90 Wait \u0E2A\u0E39\u0E07\u0E1C\u0E34\u0E14\u0E1B\u0E01\u0E15\u0E34 \u2014 bottleneck \u0E17\u0E35\u0E48 peak hours (08:00)":n<75?"\u26A0 Backlog accumulating \u2014 staff or equipment issue":"\u2705 Throughput \u0E14\u0E35"}`,
      color: l >= 300 ? "#f43f5e" : y(n, 90, 75)
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
  const i = c(e?.total),
    o = c(e?.completed),
    r = u?.completion_rate != null ? c(u.completion_rate) : i > 0 ? Math.round(o / i * 100) : 0,
    n = c(e?.avg_wait_time ?? u?.avg_wait_time),
    a = c(u?.p90_wait_time),
    l = c(u?.avg_revenue_per_visit);
  let s, d;
  return n >= 45 || r < 70 ? (s = `\u26A0 \u0E04\u0E25\u0E34\u0E19\u0E34\u0E01\u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Wait ${n} \u0E19\u0E32\u0E17\u0E35 \xB7 Completion ${r.toFixed(0)}%`, d = "#f59e0b") : r >= 85 && n <= 20 ? (s = `\u2705 \u0E17\u0E31\u0E19\u0E15\u0E01\u0E23\u0E23\u0E21 Flow \u0E14\u0E35 \u2014 ${g(i)} \u0E40\u0E04\u0E2A \xB7 Wait ${n} \u0E19\u0E32\u0E17\u0E35 \xB7 Completion ${r.toFixed(0)}%`, d = "#10b981") : (s = `Dental \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49: ${g(i)} \u0E40\u0E04\u0E2A \xB7 Wait ${n} \u0E19\u0E32\u0E17\u0E35 \xB7 Completion ${r.toFixed(0)}%`, d = "#0ea5e9"), {
    headline: s,
    headlineColor: d,
    kpi: [{
      label: "Cases Today",
      value: g(i),
      sub: "Total appointments",
      color: "#f59e0b"
    }, {
      label: "Completion",
      value: `${r.toFixed(0)}%`,
      sub: "Attended rate",
      color: y(r, 85, 70)
    }, {
      label: "Avg Wait",
      value: `${n} \u0E19\u0E32\u0E17\u0E35`,
      sub: `P90: ${a}`,
      color: A(n, 20, 45)
    }, {
      label: "Revenue/Visit",
      value: `\u0E3F${g(Math.round(l))}`,
      sub: "Avg",
      color: "#7c3aed"
    }],
    sections: [{
      icon: "\u{1F9B7}",
      title: "Dental Clinic Flow",
      text: `${g(i)} \u0E40\u0E04\u0E2A \xB7 Wait ${n} \u0E19\u0E32\u0E17\u0E35 (P90 ${a}) \xB7 Completion ${r.toFixed(0)}%. ${r<70?"No-show rate \u0E2A\u0E39\u0E07 \xB7 \u0E2A\u0E48\u0E07 reminder \u0E40\u0E1E\u0E34\u0E48\u0E21":"Schedule efficiency \u0E14\u0E35"}`,
      color: y(r, 85, 70)
    }]
  }
}

function ou(E) {
  const e = E?.ttmToday,
    u = E?.ttmAnalytics;
  if (!e && !u) return null;
  const i = c(e?.total),
    o = c(e?.completed),
    r = c(e?.waiting),
    n = c(u?.avg_daily_visits),
    a = c(u?.avg_wait_time),
    l = c(u?.completion_rate),
    s = c(u?.revisit_rate),
    d = c(u?.avg_revenue_per_visit),
    x = c(u?.total_revenue),
    p = c(u?.tpi),
    b = i > 0 ? Math.round(o / i * 100) : 0;
  let m, f;
  return p > 0 && p < 50 ? (m = `\u{1F534} TTM \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 TPI ${p}/100 \xB7 Wait ${a}m \xB7 Rev/Visit \u0E3F${g(d)} \xB7 Revisit ${s.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07 intervention \u0E14\u0E48\u0E27\u0E19`, f = "#f43f5e") : a >= 60 || s >= 15 || d < 300 ? (m = `\u26A0 TTM \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Wait ${a}m \xB7 Revisit ${s.toFixed(1)}% \xB7 Rev/Visit \u0E3F${g(d)} \xB7 TPI ${p}/100`, f = "#f59e0b") : p >= 80 && l >= 95 ? (m = `\u2705 \u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E41\u0E1C\u0E19\u0E44\u0E17\u0E22 \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35 \u2014 TPI ${p}/100 \xB7 Completion ${l.toFixed(1)}% \xB7 Avg daily ${n.toFixed(0)} visits`, f = "#10b981") : (m = `TTM: \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(i)} \u0E23\u0E32\u0E22 \xB7 Avg daily ${n.toFixed(0)} \xB7 Wait ${a}m \xB7 Rev/Visit \u0E3F${g(d)} \xB7 TPI ${p}/100`, f = "#0ea5e9"), {
    headline: m,
    headlineColor: f,
    kpi: [{
      label: "Today",
      value: g(i),
      sub: `\u0E08\u0E1A ${o} (${b}%) \xB7 \u0E23\u0E2D ${r}`,
      color: "#65a30d"
    }, {
      label: "Avg Daily",
      value: g(Math.round(n)),
      sub: "30d rolling",
      color: "#84cc16"
    }, {
      label: "TPI Score",
      value: `${p}/100`,
      sub: p >= 80 ? "\u0E14\u0E35\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : p >= 60 ? "\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19" : "\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A",
      color: y(p, 80, 60)
    }, {
      label: "Avg Wait",
      value: `${a}m`,
      sub: a <= 15 ? "\u0E14\u0E35" : a <= 30 ? "\u0E1B\u0E32\u0E19\u0E01\u0E25\u0E32\u0E07" : "\u0E2A\u0E39\u0E07",
      color: A(a, 15, 30)
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
      text: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(i)} \u0E23\u0E32\u0E22 \xB7 \u0E08\u0E1A ${o} (${b}%) \xB7 \u0E23\u0E2D ${r} \xB7 Avg daily ${n.toFixed(1)} visits \xB7 Completion ${l.toFixed(1)}%. ${a>=60?"\u{1F534} Wait time \u0E2A\u0E39\u0E07 \u2014 appointment system + \u0E40\u0E1E\u0E34\u0E48\u0E21 Therapist \u0E0A\u0E48\u0E27\u0E07 Peak":n<20?"Under-utilized \u2014 marketing + cross-referral":"\u2705 Flow \u0E1B\u0E01\u0E15\u0E34"}`,
      color: a >= 60 ? "#f43f5e" : n >= 30 ? "#10b981" : "#f59e0b"
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

function iu(E) {
  const e = E?.ptToday,
    u = E?.ptAnalytics;
  if (!e && !u) return null;
  const i = c(e?.total),
    o = c(e?.completed),
    r = c(e?.waiting),
    n = c(u?.avg_wait_time),
    a = c(u?.completion_rate),
    l = c(u?.revisit_rate),
    s = c(u?.avg_revenue_per_visit),
    d = c(u?.total_revenue),
    x = c(u?.avg_daily_visits),
    p = c(u?.ppi),
    b = c(u?.dropout_count);
  let m, f;
  return p > 0 && p < 50 ? (m = `\u{1F534} PT \u0E27\u0E34\u0E01\u0E24\u0E15 \u2014 PPI ${p}/100 \xB7 Wait ${n}m \xB7 Revisit ${l.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07 intervention \u0E14\u0E48\u0E27\u0E19`, f = "#f43f5e") : n >= 60 || l >= 15 || a < 80 ? (m = `\u26A0 \u0E01\u0E32\u0E22\u0E20\u0E32\u0E1E\u0E1A\u0E33\u0E1A\u0E31\u0E14 \u0E15\u0E49\u0E2D\u0E07 attention \u2014 Wait ${n}m \xB7 Revisit ${l.toFixed(1)}% \xB7 Completion ${a.toFixed(1)}% \xB7 PPI ${p}/100`, f = "#f59e0b") : p >= 80 && a >= 95 ? (m = `\u2705 PT \u0E1B\u0E23\u0E30\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E20\u0E32\u0E1E\u0E14\u0E35 \u2014 PPI ${p}/100 \xB7 Completion ${a.toFixed(1)}% \xB7 ${g(i)} sessions \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49`, f = "#10b981") : (m = `PT: \u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(i)} \xB7 Avg daily ${x.toFixed(0)} \xB7 Wait ${n}m \xB7 Rev/Visit \u0E3F${g(s)} \xB7 PPI ${p}/100`, f = "#0ea5e9"), {
    headline: m,
    headlineColor: f,
    kpi: [{
      label: "Today",
      value: g(i),
      sub: `\u0E08\u0E1A ${o} \xB7 \u0E23\u0E2D ${r}`,
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
      value: `${n}m`,
      sub: n <= 15 ? "\u0E14\u0E35" : n <= 30 ? "\u0E1B\u0E01\u0E15\u0E34" : "\u0E2A\u0E39\u0E07",
      color: A(n, 15, 30)
    }, {
      label: "Rev / Visit",
      value: `\u0E3F${g(s)}`,
      sub: s >= 700 ? "\u0E14\u0E35" : s >= 400 ? "\u0E1B\u0E01\u0E15\u0E34" : "\u0E15\u0E48\u0E33",
      color: y(s, 700, 400)
    }, {
      label: "Completion",
      value: `${a.toFixed(1)}%`,
      sub: `Dropout ${b}`,
      color: y(a, 95, 85)
    }],
    sections: [{
      icon: "\u{1F3CB}\uFE0F",
      title: "PT Session Flow",
      text: `\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49 ${g(i)} \xB7 \u0E08\u0E1A ${o} \xB7 \u0E23\u0E2D ${r} \xB7 Avg daily ${x.toFixed(1)} sessions \xB7 Completion ${a.toFixed(1)}% (Dropout ${b}). ${n>=60?"\u{1F534} Wait \u0E2A\u0E39\u0E07 \u2014 Appointment + Buffer time + \u0E40\u0E1E\u0E34\u0E48\u0E21 Physio \u0E0A\u0E48\u0E27\u0E07 Peak (08:00)":"\u2705 Flow \u0E1B\u0E01\u0E15\u0E34"}`,
      color: n >= 60 ? "#f43f5e" : "#10b981"
    }, {
      icon: "\u{1F4B0}",
      title: "Revenue & Mix",
      text: `Rev/Visit \u0E3F${g(s)} \xB7 Revenue 30d \u0E3F${g(d)}. ${s<400?"\u26A0 \u0E15\u0E48\u0E33 \u2014 \u0E15\u0E23\u0E27\u0E08 Billing completeness":s>=700?"\u2705 Service mix \u0E14\u0E35 (Sports PT/Advanced modality)":"Mix \u0E1B\u0E01\u0E15\u0E34"} \xB7 \u0E42\u0E2D\u0E01\u0E32\u0E2A: Rehab packages \xB7 Hydrotherapy \xB7 Sports medicine`,
      color: s >= 700 ? "#10b981" : s >= 400 ? "#f59e0b" : "#f43f5e"
    }, {
      icon: "\u{1F504}",
      title: "Quality & Outcomes",
      text: `PPI ${p}/100 \xB7 Completion ${a.toFixed(1)}% \xB7 Revisit 7d ${l.toFixed(1)}%. ${l>=15?"Revisit \u0E2A\u0E39\u0E07 \u2014 \u0E41\u0E22\u0E01 Planned PT vs Unplanned (pain/complication) \xB7 audit graded exercise progression":p<50?"\u{1F534} PPI \u0E15\u0E48\u0E33 \u2014 \u0E14\u0E39 lowest component (Wait/SLA)":"\u2705 Outcomes \u0E14\u0E35 \u2014 \u0E23\u0E31\u0E01\u0E29\u0E32\u0E21\u0E32\u0E15\u0E23\u0E10\u0E32\u0E19 + Outcome measurement (ROM/Pain score)"}`,
      color: p < 50 || l >= 15 ? "#f43f5e" : p >= 80 ? "#10b981" : "#f59e0b"
    }]
  }
}

function au(E) {
  const e = E?.qualityToday,
    u = E?.qualityAnalytics;
  if (!e && !u) return null;
  const i = c(u?.qpi_score),
    o = c(u?.readmit_rate ?? u?.readmission_rate),
    r = c(u?.mortality_rate),
    n = c(u?.hai_rate),
    a = c(u?.dch_plan_rate ?? u?.discharge_planning ?? u?.discharge_before_noon_pct),
    l = c(u?.doc_completeness),
    s = c(u?.ama_rate);
  let d, x;
  return i < 70 ? (d = `\u{1F534} Quality Score \u0E15\u0E48\u0E33 (${i}/100) \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 HA standards \xB7 prepare for re-accreditation`, x = "#f43f5e") : r >= 3 || n >= 5 ? (d = `\u26A0 Quality Risk \u2014 Mortality ${r.toFixed(2)}% \xB7 HAI ${n.toFixed(1)}% \xB7 \u0E15\u0E49\u0E2D\u0E07 Quality Huddle`, x = "#f59e0b") : i >= 85 ? (d = `\u2705 Quality Performance \u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21 \u2014 QPI ${i}/100 \xB7 HAI ${n.toFixed(1)}% \xB7 Readmit ${o.toFixed(1)}%`, x = "#10b981") : (d = `Quality: QPI ${i}/100 \xB7 Readmit ${o.toFixed(1)}% \xB7 Mortality ${r.toFixed(2)}% \xB7 HAI ${n.toFixed(1)}%`, x = "#0ea5e9"), {
    headline: d,
    headlineColor: x,
    kpi: [{
      label: "QPI Score",
      value: `${i}/100`,
      sub: i >= 85 ? "\u0E22\u0E2D\u0E14\u0E40\u0E22\u0E35\u0E48\u0E22\u0E21" : i >= 70 ? "\u0E14\u0E35" : "\u0E15\u0E48\u0E33",
      color: y(i, 85, 70)
    }, {
      label: "Readmit Rate",
      value: `${o.toFixed(1)}%`,
      sub: "HA <5%",
      color: A(o, 5, 10)
    }, {
      label: "Mortality",
      value: `${r.toFixed(2)}%`,
      sub: "HA <2%",
      color: A(r, 2, 3)
    }, {
      label: "HAI Rate",
      value: `${n.toFixed(2)}%`,
      sub: "IC <1%",
      color: A(n, 1, 2)
    }, {
      label: "Discharge Plan",
      value: `${a.toFixed(1)}%`,
      sub: ">95%",
      color: y(a, 95, 80)
    }, {
      label: "Doc Complete",
      value: `${l.toFixed(1)}%`,
      sub: "IM Domain",
      color: y(l, 90, 70)
    }],
    sections: [{
      icon: "\u2B50",
      title: "HA Accreditation Pulse",
      text: `QPI ${i}/100 \xB7 5 Domain composite (PCT \xB7 IC \xB7 MED \xB7 ENV \xB7 IM). ${i>=85?"\u2705 \u0E1E\u0E23\u0E49\u0E2D\u0E21 re-accreditation":i>=70?"\u0E15\u0E49\u0E2D\u0E07\u0E1B\u0E23\u0E31\u0E1A\u0E1A\u0E32\u0E07\u0E08\u0E38\u0E14 \xB7 \u0E40\u0E19\u0E49\u0E19 domain \u0E17\u0E35\u0E48\u0E15\u0E48\u0E33\u0E2A\u0E38\u0E14":"\u{1F534} \u0E15\u0E49\u0E2D\u0E07 intervention plan \xB7 Case Conference + M&M + IC Round"}`,
      color: y(i, 85, 70)
    }, {
      icon: "\u{1F6E1}\uFE0F",
      title: "Patient Safety Indicators",
      text: `Mortality ${r.toFixed(2)}% (HA <2%) \xB7 HAI ${n.toFixed(2)}% (IC <1%) \xB7 Readmit ${o.toFixed(1)}% (HA <5%) \xB7 AMA ${s.toFixed(2)}%. ${r>=3||n>=1||o>=5?"\u26A0 \u0E15\u0E31\u0E27\u0E0A\u0E35\u0E49\u0E27\u0E31\u0E14\u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C HA \u2014 \u0E40\u0E23\u0E48\u0E07 M&M Conference + IC Review + Readmission Prevention":"\u2705 Safety indicators \u0E14\u0E35"}`,
      color: r >= 3 || n >= 1 || o >= 5 ? "#f43f5e" : "#10b981"
    }, {
      icon: "\u{1F4CB}",
      title: "Compliance & Documentation",
      text: `Discharge Planning ${a.toFixed(1)}% \xB7 Documentation ${l.toFixed(1)}% \xB7 AMA ${s.toFixed(2)}%. ${l<70?"\u{1F534} Documentation \u0E15\u0E48\u0E33 \u2014 \u0E01\u0E23\u0E30\u0E17\u0E1A audit/claim \xB7 \u0E1D\u0E36\u0E01 Coder + checklist":a<95?"Dch Plan \u0E15\u0E48\u0E33\u0E01\u0E27\u0E48\u0E32\u0E40\u0E01\u0E13\u0E11\u0E4C \u2014 \u0E43\u0E0A\u0E49 checklist \u0E01\u0E48\u0E2D\u0E19\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22":"\u2705 Compliance \u0E14\u0E35"}`,
      color: l < 70 ? "#f43f5e" : a < 95 ? "#f59e0b" : "#10b981"
    }]
  }
}

function nu(E) {
  const e = E?.financeSummary?.summary,
    u = E?.financeAnalytics?.metrics,
    i = E?.denialAnalytics,
    o = E?.drgLeakage;
  if (!e && !u) return null;
  const r = c(u?.mtd_revenue ?? u?.revenue_this_month ?? u?.cur_month_revenue),
    n = c(u?.ytd_revenue ?? e?.total_revenue),
    a = r > 0 ? r : n,
    l = c(u?.yoy_growth_pct ?? e?.yoy_growth),
    s = c(u?.growth_pct_prorata ?? u?.growth_pct),
    d = c(u?.ffs_collection_rate ?? u?.collection_rate),
    x = c(u?.collection_rate),
    p = c(u?.denial_rate ?? i?.denial_rate),
    b = c(u?.unpaid_visits ?? i?.total_denied),
    m = c(u?.days_in_ar),
    f = c(o?.total_estimated_loss ?? o?.estimated_loss),
    h = c(u?.profit_margin ?? e?.profit_margin);
  let v, B;
  return p >= 7 || d < 80 ? (v = `\u{1F534} FFS Collection \u0E15\u0E48\u0E33 \u2014 \u0E08\u0E31\u0E14\u0E40\u0E01\u0E47\u0E1A FFS ${d.toFixed(1)}% \xB7 \u0E04\u0E49\u0E32\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 ${p.toFixed(1)}% (${b} \u0E40\u0E04\u0E2A) \xB7 \u0E15\u0E49\u0E2D\u0E07 RCM audit`, B = "#f43f5e") : m > 90 ? (v = `\u{1F534} A/R ${m} \u0E27\u0E31\u0E19 (\u0E40\u0E1B\u0E49\u0E32 \u2264 45) \u2014 \u0E40\u0E23\u0E48\u0E07 Aging Review + e-Claim Reconciliation`, B = "#f43f5e") : l < -5 || m > 60 ? (v = `\u26A0 Financial Pressure \u2014 Revenue ${l>=0?"+":""}${l.toFixed(1)}% \xB7 AR Days ${m}`, B = "#f59e0b") : d >= 90 && l >= 5 ? (v = `\u2705 \u0E01\u0E32\u0E23\u0E40\u0E07\u0E34\u0E19\u0E41\u0E02\u0E47\u0E07\u0E41\u0E23\u0E07 \u2014 Revenue +${l.toFixed(1)}% \xB7 FFS Collection ${d.toFixed(1)}% \xB7 Margin ${h.toFixed(1)}%`, B = "#10b981") : (v = `Finance: Revenue \u0E3F${g(Math.round(a/1e6))}M (${l>=0?"+":""}${l.toFixed(1)}%) \xB7 FFS Collection ${d.toFixed(1)}% \xB7 A/R ${m}d`, B = "#0ea5e9"), {
    headline: v,
    headlineColor: B,
    kpi: [{
      label: "Revenue YTD",
      value: `\u0E3F${g(Math.round(n/1e6))}M`,
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
      sub: `${b} \u0E40\u0E04\u0E2A \u0E04\u0E49\u0E32\u0E07\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 (\u0E44\u0E21\u0E48\u0E43\u0E0A\u0E48 Denial)`,
      color: A(p, 3, 5)
    }, {
      label: "A/R Days",
      value: `${m}`,
      sub: m <= 45 ? "\u2705 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C" : m <= 60 ? "\u26A0 \u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07" : "\u{1F534} \u0E40\u0E01\u0E34\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E40\u0E23\u0E48\u0E07 Follow-up",
      color: A(m, 45, 60)
    }, {
      label: "DRG Leakage",
      value: `\u0E3F${g(Math.round(f/1e3))}K`,
      sub: "Potential loss",
      color: f >= 5e5 ? "#f43f5e" : "#f59e0b"
    }, {
      label: "Profit Margin",
      value: `${h.toFixed(1)}%`,
      sub: h >= 15 ? "\u0E14\u0E35" : h >= 5 ? "\u0E1E\u0E2D\u0E43\u0E0A\u0E49" : "\u0E1A\u0E32\u0E07",
      color: y(h, 15, 5)
    }],
    sections: [{
      icon: "\u{1F4B0}",
      title: "Revenue Cycle Health (FFS-focused)",
      text: `YTD Revenue \u0E3F${g(Math.round(n))} (${l>=0?"+":""}${l.toFixed(1)}% YoY) \xB7 MTD \u0E3F${g(Math.round(r))} (${s>=0?"+":""}${s.toFixed(1)}% MoM Pro-rata) \xB7 FFS Collection ${d.toFixed(1)}% (\u0E23\u0E27\u0E21 ${x.toFixed(1)}%) \xB7 Outstanding ${p.toFixed(1)}% (${b} \u0E40\u0E04\u0E2A). ${p>=7||d<80?"\u{1F534} \u0E15\u0E49\u0E2D\u0E07\u0E17\u0E33 RCM audit \u0E14\u0E48\u0E27\u0E19\u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A FFS":d>=90?"\u2705 FFS Revenue Cycle \u0E17\u0E33\u0E07\u0E32\u0E19\u0E14\u0E35":"FFS \u0E21\u0E35\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07"}`,
      color: d >= 90 && p <= 5 ? "#10b981" : "#f59e0b"
    }, {
      icon: "\u23F3",
      title: "A/R & Cash Flow",
      text: `A/R Days ${m} \u0E27\u0E31\u0E19 (\u0E40\u0E1B\u0E49\u0E32 \u2264 45). ${m>90?"\u{1F534} A/R \u0E04\u0E49\u0E32\u0E07\u0E40\u0E01\u0E34\u0E19 90 \u0E27\u0E31\u0E19 \u2014 \u0E40\u0E23\u0E48\u0E07 Aging Review + e-Claim Reconciliation \u0E14\u0E48\u0E27\u0E19":m>60?"\u26A0 A/R \u0E04\u0E49\u0E32\u0E07 60\u201390 \u0E27\u0E31\u0E19 \u2014 \u0E15\u0E34\u0E14\u0E15\u0E32\u0E21 Gov \u0E40\u0E1A\u0E34\u0E01\u0E08\u0E48\u0E32\u0E22\u0E15\u0E23\u0E07":m>45?"\u{1F7E1} A/R \u0E40\u0E1D\u0E49\u0E32\u0E23\u0E30\u0E27\u0E31\u0E07 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19 Billing Cycle":"\u2705 Cash Flow \u0E2B\u0E21\u0E38\u0E19\u0E40\u0E27\u0E35\u0E22\u0E19\u0E1B\u0E01\u0E15\u0E34"}`,
      color: m > 90 ? "#f43f5e" : m > 60 ? "#f59e0b" : "#10b981"
    }, {
      icon: "\u{1F50D}",
      title: "DRG Leakage & Coding",
      text: `DRG Leakage \u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13 \u0E3F${g(Math.round(f))}${f>=2e5?" \u2014 \u0E41\u0E19\u0E30\u0E19\u0E33 Coding Audit (ICD-10 Secondary Dx, CC/MCC)":" \u2014 \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E40\u0E01\u0E13\u0E11\u0E4C\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E44\u0E14\u0E49"}`,
      color: f >= 5e5 ? "#f43f5e" : f >= 2e5 ? "#f59e0b" : "#10b981"
    }, {
      icon: "\u{1F4CA}",
      title: "Profitability",
      text: `Profit Margin ${h.toFixed(1)}% \xB7 Revenue YTD \u0E3F${g(Math.round(n))}. ${h>=15?"\u2705 \u0E01\u0E33\u0E44\u0E23\u0E14\u0E35":h>=5?"\u0E01\u0E33\u0E44\u0E23\u0E1E\u0E2D\u0E43\u0E0A\u0E49 \u2014 \u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19":h>0?"\u26A0 Margin \u0E1A\u0E32\u0E07 \u2014 \u0E17\u0E1A\u0E17\u0E27\u0E19\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E15\u0E49\u0E19\u0E17\u0E38\u0E19":"\u{1F534} \u0E02\u0E32\u0E14\u0E17\u0E38\u0E19 \u2014 \u0E15\u0E49\u0E2D\u0E07 restructuring \u0E14\u0E48\u0E27\u0E19"}`,
      color: h >= 15 ? "#10b981" : h >= 5 ? "#f59e0b" : "#f43f5e"
    }]
  }
}

function _({
  height: E = "1rem",
  width: e = "100%",
  borderRadius: u = "8px",
  style: i = {}
}) {
  return t.jsx("div", {
    className: "skeleton",
    "aria-hidden": "true",
    style: {
      height: E,
      width: e,
      borderRadius: u,
      ...i
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
  action: i = null
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
    }), i && t.jsx("div", {
      style: {
        marginTop: "0.5rem"
      },
      children: i
    })]
  })
});
export {
  r0 as A, B0 as D, K0 as E, N0 as H, D0 as K, O0 as M, V0 as S, lu as T, P as _, L as a, M as b, y0 as c, b0 as d, nu as e, U0 as f, X as g, C0 as h, su as i, J0 as j, X0 as k, Z0 as l, ru as m, ou as n, iu as o, uu as p, g as q, tu as r, eu as s, Eu as t, N as u, au as v, q0 as w
};