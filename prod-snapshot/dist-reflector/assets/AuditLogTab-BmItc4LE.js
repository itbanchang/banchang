import {
  R as _,
  r as l,
  j as t
} from "./vendor-react-ByYOq5k4.js";
import {
  q as d
} from "./shared-ui-OVDEF1.js";
const c = s => s == null ? "—" : s < 1e3 ? `${s}ms` : `${(s/1e3).toFixed(2)}s`,
  w = s => s ? s < 1024 ? `${s}B` : s < 1024 * 1024 ? `${(s/1024).toFixed(1)}KB` : `${(s/1024/1024).toFixed(1)}MB` : "—",
  k = s => new Date(s).toLocaleString("th-TH", {
    hour12: !1
  }),
  v = s => s ? s < 300 ? "#10b981" : s < 400 ? "#0ea5e9" : s < 500 ? "#f59e0b" : "#dc2626" : "var(--md-text-tertiary)";

function x({
  label: s,
  value: p,
  sub: a,
  color: u
}) {
  return t.jsxs("div", {
    style: {
      background: "var(--md-surface)",
      border: "1px solid var(--md-border)",
      borderTop: `3px solid ${u}`,
      borderRadius: "10px",
      padding: "12px 16px",
      flex: "1 1 150px"
    },
    children: [t.jsx("div", {
      style: {
        fontSize: "11px",
        fontWeight: 700,
        color: "var(--md-text-tertiary)",
        textTransform: "uppercase",
        letterSpacing: "0.04em"
      },
      children: s
    }), t.jsx("div", {
      style: {
        fontSize: "20px",
        fontWeight: 900,
        color: "var(--md-text-primary)",
        marginTop: "3px"
      },
      children: p
    }), a && t.jsx("div", {
      style: {
        fontSize: "11px",
        color: "var(--md-text-tertiary)",
        marginTop: "2px"
      },
      children: a
    })]
  })
}

function z() {
  const [s, p] = l.useState(null), [a, u] = l.useState({
    rows: [],
    total: 0
  }), [S, y] = l.useState(!1), [b, h] = l.useState(null), [i, n] = l.useState({
    hours: 24,
    user: "",
    ip: "",
    path_like: "",
    suspicious_only: !1,
    login_only: !1,
    min_status: "",
    limit: 100,
    offset: 0
  }), j = l.useCallback(async () => {
    try {
      const e = await fetch(`/api/admin/audit/stats?hours=${i.hours}`, {
        credentials: "include"
      });
      if (!e.ok) throw new Error(`HTTP ${e.status}`);
      p(await e.json())
    } catch (e) {
      h(e.message)
    }
  }, [i.hours]), g = l.useCallback(async () => {
    y(!0), h(null);
    try {
      const e = new URLSearchParams,
        o = new Date(Date.now() - i.hours * 3600 * 1e3).toISOString();
      e.set("from", o), i.user && e.set("user", i.user), i.ip && e.set("ip", i.ip), i.path_like && e.set("path_like", i.path_like), i.suspicious_only && e.set("suspicious_only", "1"), i.login_only && e.set("login_only", "1"), i.min_status && e.set("min_status", i.min_status), e.set("limit", i.limit), e.set("offset", i.offset);
      const m = await fetch(`/api/admin/audit/logs?${e}`, {
        credentials: "include"
      });
      if (!m.ok) throw new Error(`HTTP ${m.status}`);
      u(await m.json())
    } catch (e) {
      h(e.message)
    }
    y(!1)
  }, [i]);
  l.useEffect(() => {
    j(), g()
  }, [j, g]);
  const r = s?.stats || {},
    f = r.login_attempts > 0 ? Math.round(r.login_failed / r.login_attempts * 100) : 0;
  return t.jsxs("div", {
    className: "space-y-5 animate-fade-in pb-10",
    children: [t.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [t.jsx("div", {
        style: {
          width: "4px",
          height: "24px",
          background: "linear-gradient(180deg, #7c3aed, #0ea5e9)",
          borderRadius: "99px"
        }
      }), t.jsx("h2", {
        style: {
          margin: 0,
          fontSize: "18px",
          fontWeight: 900,
          color: "var(--md-text-primary)"
        },
        children: "🔍 Audit Log — การเข้าใช้ระบบ (Admin)"
      }), t.jsx("span", {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          padding: "3px 10px",
          borderRadius: "99px",
          background: "rgba(124,58,237,.1)",
          color: "#7c3aed"
        },
        children: "SQLite · 90-day retention"
      })]
    }), s && t.jsxs("div", {
      style: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap"
      },
      children: [t.jsx(x, {
        label: `Requests (${s.hoursBack}h)`,
        value: d(r.total_requests),
        sub: `${r.unique_users||0} users · ${r.unique_ips||0} IPs`,
        color: "#0ea5e9"
      }), t.jsx(x, {
        label: "Login Attempts",
        value: d(r.login_attempts),
        sub: `Failed: ${r.login_failed} (${f}%)`,
        color: f > 30 ? "#dc2626" : f > 10 ? "#f59e0b" : "#10b981"
      }), t.jsx(x, {
        label: "Suspicious",
        value: d(r.suspicious_count),
        sub: "401/403/429/scanner UA",
        color: r.suspicious_count > 50 ? "#dc2626" : r.suspicious_count > 10 ? "#f59e0b" : "#10b981"
      }), t.jsx(x, {
        label: "Errors 4xx/5xx",
        value: d((r.status_4xx || 0) + (r.status_5xx || 0)),
        sub: `4xx: ${r.status_4xx||0} · 5xx: ${r.status_5xx||0}`,
        color: (r.status_5xx || 0) > 0 ? "#dc2626" : "#f59e0b"
      }), t.jsx(x, {
        label: "Avg Duration",
        value: c(Math.round(r.avg_duration_ms || 0)),
        sub: `Max ${c(r.max_duration_ms)}`,
        color: "#7c3aed"
      }), t.jsx(x, {
        label: "Exports",
        value: d(r.exports),
        sub: "CSV/Excel/PDF",
        color: "#db2777"
      })]
    }), s && t.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "10px"
      },
      children: [t.jsxs("div", {
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderRadius: "10px",
          padding: "12px 16px"
        },
        children: [t.jsxs("div", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            marginBottom: "8px"
          },
          children: ["👥 Top Users (", s.hoursBack, "h)"]
        }), t.jsx("table", {
          style: {
            width: "100%",
            fontSize: "12px"
          },
          children: t.jsx("tbody", {
            children: (s.topUsers || []).slice(0, 5).map((e, o) => t.jsxs("tr", {
              children: [t.jsx("td", {
                style: {
                  padding: "3px 0"
                },
                children: e.username
              }), t.jsx("td", {
                style: {
                  textAlign: "right",
                  fontWeight: 700
                },
                children: d(e.requests)
              })]
            }, o))
          })
        })]
      }), t.jsxs("div", {
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderRadius: "10px",
          padding: "12px 16px"
        },
        children: [t.jsx("div", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            marginBottom: "8px"
          },
          children: "🌐 Top IPs"
        }), t.jsx("table", {
          style: {
            width: "100%",
            fontSize: "12px"
          },
          children: t.jsx("tbody", {
            children: (s.topIPs || []).slice(0, 5).map((e, o) => t.jsxs("tr", {
              children: [t.jsx("td", {
                style: {
                  padding: "3px 0",
                  fontFamily: "monospace"
                },
                children: e.ip
              }), t.jsx("td", {
                style: {
                  textAlign: "right",
                  fontWeight: 700
                },
                children: d(e.requests)
              }), t.jsx("td", {
                style: {
                  textAlign: "right",
                  color: e.suspicious > 0 ? "#dc2626" : "var(--md-text-tertiary)",
                  fontSize: "11px"
                },
                children: e.suspicious > 0 ? `⚠${e.suspicious}` : ""
              })]
            }, o))
          })
        })]
      }), t.jsxs("div", {
        style: {
          background: "var(--md-surface)",
          border: "1px solid var(--md-border)",
          borderRadius: "10px",
          padding: "12px 16px"
        },
        children: [t.jsx("div", {
          style: {
            fontSize: "12px",
            fontWeight: 800,
            color: "var(--md-text-primary)",
            marginBottom: "8px"
          },
          children: "📊 Top Paths"
        }), t.jsx("table", {
          style: {
            width: "100%",
            fontSize: "11px"
          },
          children: t.jsx("tbody", {
            children: (s.topPaths || []).slice(0, 5).map((e, o) => t.jsxs("tr", {
              children: [t.jsx("td", {
                style: {
                  padding: "3px 0",
                  fontFamily: "monospace",
                  maxWidth: "200px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                children: e.path
              }), t.jsx("td", {
                style: {
                  textAlign: "right",
                  fontWeight: 700
                },
                children: d(e.hits)
              }), t.jsx("td", {
                style: {
                  textAlign: "right",
                  color: "var(--md-text-tertiary)"
                },
                children: c(Math.round(e.avg_ms))
              })]
            }, o))
          })
        })]
      })]
    }), t.jsxs("div", {
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)",
        borderRadius: "12px",
        padding: "12px 16px",
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        alignItems: "center"
      },
      children: [t.jsxs("select", {
        value: i.hours,
        onChange: e => n({
          ...i,
          hours: Number(e.target.value)
        }),
        style: {
          padding: "5px 10px",
          borderRadius: "6px",
          border: "1px solid var(--md-border)",
          fontSize: "12px"
        },
        children: [t.jsx("option", {
          value: 1,
          children: "1 ชั่วโมง"
        }), t.jsx("option", {
          value: 6,
          children: "6 ชั่วโมง"
        }), t.jsx("option", {
          value: 24,
          children: "24 ชั่วโมง"
        }), t.jsx("option", {
          value: 72,
          children: "3 วัน"
        }), t.jsx("option", {
          value: 168,
          children: "7 วัน"
        })]
      }), t.jsx("input", {
        type: "text",
        placeholder: "Username",
        value: i.user,
        onChange: e => n({
          ...i,
          user: e.target.value
        }),
        style: {
          padding: "5px 10px",
          borderRadius: "6px",
          border: "1px solid var(--md-border)",
          fontSize: "12px",
          width: "120px"
        }
      }), t.jsx("input", {
        type: "text",
        placeholder: "IP address",
        value: i.ip,
        onChange: e => n({
          ...i,
          ip: e.target.value
        }),
        style: {
          padding: "5px 10px",
          borderRadius: "6px",
          border: "1px solid var(--md-border)",
          fontSize: "12px",
          width: "130px"
        }
      }), t.jsx("input", {
        type: "text",
        placeholder: "Path contains...",
        value: i.path_like,
        onChange: e => n({
          ...i,
          path_like: e.target.value
        }),
        style: {
          padding: "5px 10px",
          borderRadius: "6px",
          border: "1px solid var(--md-border)",
          fontSize: "12px",
          width: "160px"
        }
      }), t.jsxs("select", {
        value: i.min_status,
        onChange: e => n({
          ...i,
          min_status: e.target.value
        }),
        style: {
          padding: "5px 10px",
          borderRadius: "6px",
          border: "1px solid var(--md-border)",
          fontSize: "12px"
        },
        children: [t.jsx("option", {
          value: "",
          children: "ทุก status"
        }), t.jsx("option", {
          value: "200",
          children: "2xx ขึ้นไป"
        }), t.jsx("option", {
          value: "400",
          children: "4xx ขึ้นไป"
        }), t.jsx("option", {
          value: "500",
          children: "5xx เท่านั้น"
        })]
      }), t.jsxs("label", {
        style: {
          fontSize: "12px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "4px"
        },
        children: [t.jsx("input", {
          type: "checkbox",
          checked: i.suspicious_only,
          onChange: e => n({
            ...i,
            suspicious_only: e.target.checked
          })
        }), " Suspicious"]
      }), t.jsxs("label", {
        style: {
          fontSize: "12px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: "4px"
        },
        children: [t.jsx("input", {
          type: "checkbox",
          checked: i.login_only,
          onChange: e => n({
            ...i,
            login_only: e.target.checked
          })
        }), " Login only"]
      }), t.jsx("button", {
        onClick: () => {
          n({
            ...i,
            offset: 0
          }), g()
        },
        style: {
          padding: "5px 14px",
          borderRadius: "6px",
          border: "none",
          background: "linear-gradient(135deg, #7c3aed, #0ea5e9)",
          color: "#fff",
          fontWeight: 800,
          cursor: "pointer",
          fontSize: "12px"
        },
        children: "🔍 Search"
      }), t.jsx("span", {
        style: {
          marginLeft: "auto",
          fontSize: "11px",
          color: "var(--md-text-tertiary)"
        },
        children: S ? "Loading..." : `Total: ${d(a.total)} · Showing ${a.rows?.length||0}`
      })]
    }), b && t.jsxs("div", {
      style: {
        padding: "10px 14px",
        background: "rgba(220,38,38,.08)",
        color: "#dc2626",
        fontSize: "12px",
        borderRadius: "8px"
      },
      children: ["⚠ ", b]
    }), t.jsxs("div", {
      className: "rounded-2xl overflow-hidden",
      style: {
        background: "var(--md-surface)",
        border: "1px solid var(--md-border)"
      },
      children: [t.jsx("div", {
        style: {
          overflowX: "auto"
        },
        children: t.jsxs("table", {
          style: {
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "11px",
            minWidth: "1100px"
          },
          children: [t.jsx("thead", {
            children: t.jsxs("tr", {
              style: {
                background: "var(--md-surface-2)",
                borderBottom: "2px solid var(--md-border)"
              },
              children: [t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "เวลา"
              }), t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "User"
              }), t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "IP"
              }), t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "Method"
              }), t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "left",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "Path"
              }), t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "Status"
              }), t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "Time"
              }), t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "right",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "Size"
              }), t.jsx("th", {
                style: {
                  padding: "8px",
                  textAlign: "center",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "Flags"
              })]
            })
          }), t.jsx("tbody", {
            children: (a.rows || []).map(e => {
              const o = [];
              return e.is_login && o.push("🔑"), e.is_export && o.push("📥"), e.is_suspicious && o.push("⚠️"), t.jsxs("tr", {
                style: {
                  borderBottom: "1px solid var(--md-divider)",
                  background: e.is_suspicious ? "rgba(220,38,38,.04)" : "transparent"
                },
                children: [t.jsx("td", {
                  style: {
                    padding: "6px 8px",
                    fontFamily: "monospace",
                    fontSize: "10px",
                    whiteSpace: "nowrap",
                    color: "var(--md-text-secondary)"
                  },
                  children: k(e.ts)
                }), t.jsxs("td", {
                  style: {
                    padding: "6px 8px",
                    fontWeight: 700
                  },
                  children: [e.username, e.role && t.jsx("span", {
                    style: {
                      marginLeft: 4,
                      fontSize: "9px",
                      fontWeight: 600,
                      padding: "1px 5px",
                      borderRadius: "4px",
                      background: "rgba(124,58,237,.1)",
                      color: "#7c3aed"
                    },
                    children: e.role
                  })]
                }), t.jsx("td", {
                  style: {
                    padding: "6px 8px",
                    fontFamily: "monospace",
                    fontSize: "10px"
                  },
                  children: e.ip
                }), t.jsx("td", {
                  style: {
                    padding: "6px 8px",
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "10px"
                  },
                  children: e.method
                }), t.jsxs("td", {
                  style: {
                    padding: "6px 8px",
                    fontFamily: "monospace",
                    fontSize: "10px",
                    maxWidth: "300px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  },
                  title: e.path + (e.query_string ? "?" + e.query_string : ""),
                  children: [e.path, e.query_string && t.jsxs("span", {
                    style: {
                      color: "var(--md-text-tertiary)"
                    },
                    children: ["?", e.query_string.substring(0, 30), e.query_string.length > 30 ? "…" : ""]
                  })]
                }), t.jsx("td", {
                  style: {
                    padding: "6px 8px",
                    textAlign: "center"
                  },
                  children: t.jsx("span", {
                    style: {
                      fontWeight: 800,
                      fontSize: "11px",
                      padding: "1px 8px",
                      borderRadius: "6px",
                      background: `${v(e.status)}15`,
                      color: v(e.status)
                    },
                    children: e.status
                  })
                }), t.jsx("td", {
                  style: {
                    padding: "6px 8px",
                    textAlign: "right",
                    color: e.duration_ms > 5e3 ? "#dc2626" : e.duration_ms > 1e3 ? "#f59e0b" : "var(--md-text-secondary)",
                    fontSize: "10px"
                  },
                  children: c(e.duration_ms)
                }), t.jsx("td", {
                  style: {
                    padding: "6px 8px",
                    textAlign: "right",
                    color: "var(--md-text-tertiary)",
                    fontSize: "10px"
                  },
                  children: w(e.bytes_out)
                }), t.jsx("td", {
                  style: {
                    padding: "6px 8px",
                    textAlign: "center"
                  },
                  children: o.join(" ")
                })]
              }, e.id)
            })
          })]
        })
      }), a.total > a.limit && t.jsxs("div", {
        style: {
          padding: "8px 14px",
          borderTop: "1px solid var(--md-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px"
        },
        children: [t.jsxs("span", {
          children: ["หน้า ", Math.floor(i.offset / i.limit) + 1, " / ", Math.ceil(a.total / i.limit)]
        }), t.jsxs("div", {
          style: {
            display: "flex",
            gap: "4px"
          },
          children: [t.jsx("button", {
            disabled: i.offset === 0,
            onClick: () => n({
              ...i,
              offset: Math.max(0, i.offset - i.limit)
            }),
            style: {
              padding: "3px 10px",
              fontSize: "11px",
              cursor: i.offset === 0 ? "not-allowed" : "pointer"
            },
            children: "← ก่อน"
          }), t.jsx("button", {
            disabled: i.offset + i.limit >= a.total,
            onClick: () => n({
              ...i,
              offset: i.offset + i.limit
            }),
            style: {
              padding: "3px 10px",
              fontSize: "11px",
              cursor: i.offset + i.limit >= a.total ? "not-allowed" : "pointer"
            },
            children: "ถัดไป →"
          })]
        })]
      })]
    })]
  })
}
const R = _.memo(z);
export {
  R as
  default
};