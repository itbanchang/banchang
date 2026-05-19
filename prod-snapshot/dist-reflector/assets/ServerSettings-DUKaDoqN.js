import {
  r as i,
  j as e
} from "./vendor-react-ByYOq5k4.js";

function T({
  open: p,
  onClose: b
}) {
  const [x, m] = i.useState([]), [o, v] = i.useState(null), [j, h] = i.useState(!0), [S, f] = i.useState(null), [w, y] = i.useState(null), [k, g] = i.useState({}), [n, d] = i.useState(null), c = i.useCallback(async () => {
    try {
      const t = await fetch("/api/system/servers", {
        credentials: "include"
      });
      if (t.ok) {
        const r = await t.json();
        m(r.servers || []), v(r.active)
      }
    } catch {}
    h(!1)
  }, []);
  i.useEffect(() => {
    p && (h(!0), d(null), c())
  }, [p, c]);
  const u = i.useCallback(async t => {
      y(t), g(r => ({
        ...r,
        [t]: {
          status: "testing"
        }
      }));
      try {
        const s = await (await fetch("/api/system/servers/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            server_id: t
          })
        })).json();
        g(a => ({
          ...a,
          [t]: s
        }))
      } catch (r) {
        g(s => ({
          ...s,
          [t]: {
            status: "unreachable",
            error: r.message
          }
        }))
      }
      y(null)
    }, []),
    C = i.useCallback(async t => {
      if (t !== o?.id) {
        f(t), d(null);
        try {
          const s = await (await fetch("/api/system/servers/switch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
              server_id: t
            })
          })).json();
          s.success ? (d({
            type: "success",
            text: s.message
          }), await c()) : d({
            type: "error",
            text: s.error || "Switch failed"
          })
        } catch (r) {
          d({
            type: "error",
            text: r.message
          })
        }
        f(null)
      }
    }, [o, c]),
    R = i.useCallback(() => {
      x.forEach(t => u(t.id))
    }, [x, u]);
  return p ? e.jsx("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,.5)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    onClick: b,
    children: e.jsxs("div", {
      onClick: t => t.stopPropagation(),
      style: {
        width: "100%",
        maxWidth: "600px",
        borderRadius: "24px",
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        boxShadow: "0 24px 80px rgba(0,0,0,.25)",
        overflow: "hidden"
      },
      children: [e.jsxs("div", {
        style: {
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, rgba(15,118,110,.06), rgba(2,132,199,.04))",
          borderBottom: "1px solid var(--md-border)"
        },
        children: [e.jsxs("div", {
          children: [e.jsx("h2", {
            style: {
              margin: 0,
              fontSize: "18px",
              fontWeight: 900,
              color: "var(--md-text-primary)"
            },
            children: "Database Server"
          }), e.jsxs("p", {
            style: {
              margin: "4px 0 0",
              fontSize: "12px",
              color: "var(--md-text-tertiary)",
              fontWeight: 600
            },
            children: ["HOSxP XE — ", o?.host || "...", " (", o?.id || "...", ")"]
          })]
        }), e.jsxs("div", {
          style: {
            display: "flex",
            gap: "8px"
          },
          children: [e.jsx("button", {
            onClick: R,
            style: {
              padding: "8px 16px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: 700,
              border: "1px solid var(--md-border)",
              background: "var(--md-surface)",
              color: "var(--md-text-secondary)",
              cursor: "pointer"
            },
            children: "Test All"
          }), e.jsx("button", {
            onClick: b,
            style: {
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "none",
              background: "var(--md-surface-2, #f1f5f9)",
              cursor: "pointer",
              fontSize: "18px",
              color: "var(--md-text-tertiary)"
            },
            children: "x"
          })]
        })]
      }), n && e.jsxs("div", {
        style: {
          margin: "1rem 2rem 0",
          padding: "10px 16px",
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: 700,
          background: n.type === "success" ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)",
          color: n.type === "success" ? "#059669" : "#dc2626",
          border: `1px solid ${n.type==="success"?"rgba(16,185,129,.3)":"rgba(239,68,68,.3)"}`
        },
        children: [n.type === "success" ? "✅" : "❌", " ", n.text]
      }), e.jsx("div", {
        style: {
          padding: "1.5rem 2rem"
        },
        children: j ? e.jsx("div", {
          style: {
            textAlign: "center",
            padding: "2rem",
            color: "var(--md-text-tertiary)"
          },
          children: "Loading..."
        }) : e.jsx("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          },
          children: x.map(t => {
            const r = t.active,
              s = k[t.id],
              a = w === t.id,
              l = S === t.id,
              W = r ? "#10b981" : "var(--md-border)";
            return e.jsx("div", {
              style: {
                padding: "1rem 1.25rem",
                borderRadius: "16px",
                border: `2px solid ${W}`,
                background: r ? "rgba(16,185,129,.04)" : "var(--md-surface)",
                transition: "all .2s"
              },
              children: e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
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
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: r ? "#10b981" : s?.status === "reachable" ? "#0ea5e9" : s?.status === "unreachable" ? "#ef4444" : "var(--md-text-tertiary)",
                      boxShadow: r ? "0 0 8px rgba(16,185,129,.5)" : "none"
                    }
                  }), e.jsxs("div", {
                    children: [e.jsxs("div", {
                      style: {
                        fontSize: "14px",
                        fontWeight: 800,
                        color: "var(--md-text-primary)"
                      },
                      children: [t.label, r && e.jsx("span", {
                        style: {
                          marginLeft: "8px",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "99px",
                          background: "rgba(16,185,129,.15)",
                          color: "#059669"
                        },
                        children: "ACTIVE"
                      })]
                    }), e.jsxs("div", {
                      style: {
                        fontSize: "12px",
                        color: "var(--md-text-tertiary)",
                        fontWeight: 600,
                        marginTop: "2px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        flexWrap: "wrap"
                      },
                      children: [e.jsxs("span", {
                        children: [t.host, ":", t.port, " / ", t.database]
                      }), e.jsx("span", {
                        style: {
                          opacity: .7
                        },
                        children: t.role
                      }), e.jsx("span", {
                        style: {
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "1px 6px",
                          borderRadius: "4px",
                          background: "rgba(16,185,129,.1)",
                          color: "#059669",
                          border: "1px solid rgba(16,185,129,.2)"
                        },
                        children: "READ-ONLY"
                      })]
                    })]
                  })]
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    gap: "6px",
                    alignItems: "center"
                  },
                  children: [s && !a && e.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "99px",
                      background: s.status === "reachable" ? "rgba(14,165,233,.1)" : "rgba(239,68,68,.1)",
                      color: s.status === "reachable" ? "#0284c7" : "#dc2626"
                    },
                    children: s.status === "reachable" ? `${s.latency_ms}ms · v${s.version}` : `Error: ${s.error?.substring(0,30)}`
                  }), e.jsx("button", {
                    onClick: () => u(t.id),
                    disabled: a,
                    style: {
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      border: "1px solid var(--md-border)",
                      background: "var(--md-surface)",
                      color: "var(--md-text-secondary)",
                      cursor: a ? "wait" : "pointer",
                      opacity: a ? .5 : 1
                    },
                    children: a ? "..." : "Test"
                  }), !r && e.jsx("button", {
                    onClick: () => C(t.id),
                    disabled: l,
                    style: {
                      padding: "6px 14px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 800,
                      border: "none",
                      cursor: l ? "wait" : "pointer",
                      background: "linear-gradient(135deg, #0f766e, #0284c7)",
                      color: "#fff",
                      opacity: l ? .5 : 1
                    },
                    children: l ? "Switching..." : "Switch"
                  })]
                })]
              })
            }, t.id)
          })
        })
      }), e.jsxs("div", {
        style: {
          padding: "1rem 2rem",
          borderTop: "1px solid var(--md-border)",
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        },
        children: [e.jsx("span", {
          children: "READ-ONLY ทุก Server · ไม่มีการเขียนข้อมูลลง HOSxP XE"
        }), e.jsx("span", {
          children: "Admin only · Cache reset เมื่อ Switch"
        })]
      })]
    })
  }) : null
}
export {
  T as
  default
};