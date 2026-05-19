import {
  R as A,
  j as e,
  r as k
} from "./vendor-react-ByYOq5k4.js";
import {
  b as Oe,
  a as He,
  E as Ne,
  k as Fe,
  S as De,
  h as Ge
} from "./shared-ui-OVDEF1.js";
import {
  R as V,
  c as ne,
  a as J,
  X as Z,
  Y as ee,
  T as Q,
  d as ge,
  B as O,
  e as fe,
  C as We,
  L as ke,
  b as ze,
  P as Ue,
  f as Ke,
  A as Ye
} from "./vendor-charts-C5q2M-g3.js";
A.memo(function({
  bedSummary: l,
  wardChart: z,
  loading: n,
  hoverHero: R,
  setHoverHero: _,
  hoverKpi: D,
  setHoverKpi: T,
  openDrillDown: $,
  alosData: W,
  readmission: i,
  losPrediction: v,
  loadingAlos: p,
  loadingReadmission: H,
  loadingLosPrediction: N
}) {
  const F = l?.occupied ?? 0,
    X = l?.total_beds ?? 0,
    G = l?.occupancy_rate ?? 0,
    oe = X - F,
    L = G > 90 ? "#f43f5e" : G > 80 ? "#f59e0b" : "#10b981",
    le = [{
      title: "ระยะนอนเฉลี่ย",
      value: W?.summary?.overall_alos ?? "—",
      icon: "⏱️",
      unit: "วัน/ราย",
      grad: ["#0ea5e9", "#0284c7"],
      glow: "rgba(14,165,233,.2)",
      loading: p,
      drillDownId: "ipd_alos",
      drillDownEndpoint: "/api/ipd/drilldown?type=alos"
    }, {
      title: "เสี่ยง Re-admit",
      value: i?.patients?.filter(d => ["high", "moderate"].includes(d.risk_level))?.length ?? 0,
      icon: "🧠",
      unit: "ราย",
      grad: (i?.patients?.filter(d => ["high", "moderate"].includes(d.risk_level))?.length ?? 0) > 5 ? ["#f43f5e", "#dc2626"] : ["#f59e0b", "#d97706"],
      glow: "rgba(245,158,11,.2)",
      loading: H,
      drillDownId: "ipd_readmit",
      drillDownEndpoint: "/api/ipd/drilldown?type=readmit"
    }, {
      title: "นอนเกินกำหนด",
      value: v?.patients?.filter(d => ["over_stay", "at_risk"].includes(d.status))?.length ?? 0,
      icon: "⌛",
      unit: "ราย",
      grad: (v?.patients?.filter(d => ["over_stay", "at_risk"].includes(d.status))?.length ?? 0) > 10 ? ["#f43f5e", "#dc2626"] : ["#f59e0b", "#d97706"],
      glow: "rgba(245,158,11,.2)",
      loading: N,
      drillDownId: "ipd_alos",
      drillDownEndpoint: "/api/ipd/drilldown?type=alos"
    }];
  return e.jsxs(e.Fragment, {
    children: [e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        onClick: () => $("ipd_beds", "รายละเอียดการครองเตียง (IPD)", "/api/ipd/drilldown?type=beds"),
        style: {
          gridColumn: "span 2",
          padding: "1.25rem 1.5rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(99,102,241,.12) 0%, rgba(124,58,237,.06) 100%)",
          border: "1px solid rgba(99,102,241,.2)",
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: R ? "translateY(-2px)" : "none",
          boxShadow: R ? "0 10px 30px -10px rgba(99,102,241,.3)" : "none"
        },
        onMouseEnter: () => _(!0),
        onMouseLeave: () => _(!1),
        children: [e.jsx("div", {
          style: {
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), n ? e.jsxs("div", {
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
        }) : e.jsxs("div", {
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
            children: [e.jsxs("p", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6366f1",
                margin: 0
              },
              children: ["🏥 ผู้ป่วยนอนอยู่ ณ ขณะนี้ ", e.jsx("span", {
                style: {
                  fontSize: "12px",
                  opacity: .7,
                  textTransform: "none"
                },
                children: "(ไม่รวม Home Ward)"
              })]
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                color: "var(--md-text-tertiary)",
                fontWeight: 600,
                background: "rgba(99,102,241,.08)",
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
                color: "#6366f1",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                textShadow: "0 0 40px rgba(99,102,241,.3)"
              },
              children: F.toLocaleString("th-TH")
            }), e.jsxs("span", {
              style: {
                fontSize: "14px",
                color: "var(--md-text-tertiary)",
                fontWeight: 700
              },
              children: ["/ ", X.toLocaleString("th-TH"), " เตียง"]
            }), e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: "99px",
                background: `${L}15`,
                color: L
              },
              children: [G, "% ครองเตียง"]
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
                  color: L
                },
                children: ["🛏️ ครองเตียง ", F, " (", G, "%)"]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#10b981"
                },
                children: ["ว่าง ", oe, " เตียง"]
              })]
            }), e.jsxs("div", {
              style: {
                height: "6px",
                borderRadius: "99px",
                overflow: "hidden",
                background: "rgba(16,185,129,.12)",
                display: "flex"
              },
              children: [e.jsx("div", {
                style: {
                  width: `${Math.min(100,G)}%`,
                  background: `linear-gradient(90deg, ${L}, ${L}cc)`,
                  borderRadius: "99px 0 0 99px",
                  transition: "width 0.8s ease"
                }
              }), e.jsx("div", {
                style: {
                  flex: 1,
                  background: "rgba(16,185,129,.2)",
                  borderRadius: "0 99px 99px 0"
                }
              })]
            })]
          })]
        })]
      }), le.map((d, B) => e.jsx("div", {
        onClick: () => d.drillDownId && $(d.drillDownId, d.title, d.drillDownEndpoint),
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: `linear-gradient(135deg, ${d.grad[0]}10 0%, ${d.grad[1]}05 100%)`,
          border: `1px solid ${d.grad[0]}25`,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: d.drillDownId ? "pointer" : "default",
          transform: D === B ? "translateY(-2px)" : "none",
          boxShadow: D === B ? `0 8px 25px ${d.glow}` : "none"
        },
        onMouseEnter: () => d.drillDownId && T(B),
        onMouseLeave: () => T(null),
        children: d.loading ? e.jsxs("div", {
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
              children: d.title
            }), e.jsx("span", {
              style: {
                fontSize: "18px"
              },
              children: d.icon
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
                color: d.grad[0],
                letterSpacing: "-0.03em",
                lineHeight: 1
              },
              children: typeof d.value == "number" ? d.value.toLocaleString() : d.value
            }), d.unit && e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--md-text-tertiary)"
              },
              children: d.unit
            })]
          })]
        })
      }, `ipd-kpi-${B}`))]
    }), e.jsxs("div", {
      className: "chart-container",
      children: [e.jsx("h3", {
        style: {
          fontSize: "var(--fs-md)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em",
          marginBottom: "1rem"
        },
        children: "🏥 Ward Occupancy Census"
      }), e.jsx(V, {
        width: "100%",
        height: 300,
        children: e.jsxs(ne, {
          data: z,
          layout: "vertical",
          children: [e.jsx(J, {
            vertical: !1,
            strokeDasharray: "3 3",
            stroke: "rgba(203,213,225,.4)"
          }), e.jsx(Z, {
            type: "number",
            domain: [0, 100],
            tick: {
              fill: "#9ca3af",
              fontSize: 10,
              fontWeight: 600
            },
            axisLine: !1,
            tickLine: !1,
            tickFormatter: d => `${d}%`
          }), e.jsx(ee, {
            type: "category",
            dataKey: "name",
            width: 80,
            tick: {
              fill: "#6b7280",
              fontSize: 10,
              fontWeight: 700
            },
            axisLine: !1,
            tickLine: !1
          }), e.jsx(Q, {
            cursor: {
              fill: "rgba(124,58,237,.04)"
            },
            contentStyle: {
              background: "#fff",
              border: "1px solid #e8eaf2",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,.08)"
            },
            formatter: (d, B, te) => [`${d}% (${te.payload.occupied}/${te.payload.total} เตียง)`, "Occupancy"]
          }), e.jsx(ge, {
            x: 85,
            stroke: "#f43f5e",
            strokeDasharray: "6 3",
            strokeWidth: 1.5
          }), e.jsx(O, {
            dataKey: "occupancy",
            radius: [0, 6, 6, 0],
            barSize: 18,
            children: z.map((d, B) => e.jsx(fe, {
              fill: d.occupancy > 85 ? "#f43f5e" : d.occupancy > 70 ? "#f59e0b" : "#7c3aed"
            }, B))
          })]
        })
      }), e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "0.5rem"
        },
        children: [
          [{
            color: "#7c3aed",
            label: "ปกติ (<70%)"
          }, {
            color: "#f59e0b",
            label: "สูง (70-85%)"
          }, {
            color: "#f43f5e",
            label: "วิกฤต (>85%)"
          }].map((d, B) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "5px"
            },
            children: [e.jsx("div", {
              style: {
                width: "8px",
                height: "8px",
                borderRadius: "3px",
                background: d.color
              }
            }), e.jsx("span", {
              style: {
                fontSize: "var(--fs-xs)",
                color: "var(--md-text-secondary)",
                fontWeight: 600
              },
              children: d.label
            })]
          }, B)), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginLeft: "auto"
            },
            children: [e.jsx("div", {
              style: {
                width: "18px",
                height: "2px",
                background: "#f43f5e",
                borderRadius: "2px",
                backgroundImage: "repeating-linear-gradient(90deg, #f43f5e 0, #f43f5e 4px, transparent 4px, transparent 8px)"
              }
            }), e.jsx("span", {
              style: {
                fontSize: "var(--fs-xs)",
                color: "#f43f5e",
                fontWeight: 700
              },
              children: "เส้นวิกฤต 85%"
            })]
          })
        ]
      })]
    })]
  })
});
A.memo(function({
  ipdAnalytics: l,
  loading: z
}) {
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
        children: "🩺 บุคลากรที่ปฏิบัติหน้าที่วันนี้ (On-Duty IPD)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(94,114,228,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "Activity Logs · Clinical Database"
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "12px"
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
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#5e72e4"
              },
              children: "แผนกแพทย์ (IPD)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#5e72e4",
              opacity: .8
            },
            children: l?.on_duty?.doctors?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: z ? Array(3).fill(0).map((n, R) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, R)) : l?.on_duty?.doctors?.length > 0 ? l.on_duty.doctors.map((n, R) => e.jsxs("div", {
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
            children: [e.jsx("div", {
              style: {
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #5e72e4, #8b5cf6)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: n.staff_name?.substring(0, 2).replace("น.", "").replace("พ.", "").trim() || "D"
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
                children: n.staff_name
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "Attending Doctor"
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
                  color: "#5e72e4"
                },
                children: n.total_count
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "8px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "เคส"
              })]
            })]
          }, R)) : e.jsx("div", {
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
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#11cdef"
              },
              children: "ทีมพยาบาล (IPD)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#11cdef",
              opacity: .8
            },
            children: l?.on_duty?.nurses?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: z ? Array(3).fill(0).map((n, R) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, R)) : l?.on_duty?.nurses?.length > 0 ? l.on_duty.nurses.map((n, R) => {
            const _ = new Date().getHours(),
              D = _ < 12 && n.morning_count > 0 || _ >= 12 && _ < 17 && n.afternoon_count > 0 || _ >= 17 && n.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: D ? "linear-gradient(135deg, #11cdef, #1171ef)" : "rgba(0,0,0,0.05)",
                  color: D ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [n.staff_name?.substring(0, 1) || "N", D && e.jsx("span", {
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
                  children: n.staff_name
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
                      color: n.morning_count > 0 ? "#5e72e4" : "#ccc"
                    },
                    children: ["🌅", n.morning_count || 0]
                  }), e.jsxs("span", {
                    title: "บ่าย",
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: n.afternoon_count > 0 ? "#fb6340" : "#ccc"
                    },
                    children: ["☀️", n.afternoon_count || 0]
                  }), e.jsxs("span", {
                    title: "ดึก",
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: n.night_count > 0 ? "#172b4d" : "#ccc"
                    },
                    children: ["🌙", n.night_count || 0]
                  })]
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
                    color: "#11cdef"
                  },
                  children: n.total_count
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "งาน"
                })]
              })]
            }, R)
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
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#2dce89"
              },
              children: "หน้าที่สนับสนุน (IPD)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#2dce89",
              opacity: .8
            },
            children: l?.on_duty?.staff?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: z ? Array(3).fill(0).map((n, R) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, R)) : l?.on_duty?.staff?.length > 0 ? l.on_duty.staff.map((n, R) => {
            const _ = new Date().getHours(),
              D = _ < 12 && n.morning_count > 0 || _ >= 12 && _ < 17 && n.afternoon_count > 0 || _ >= 17 && n.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: D ? "linear-gradient(135deg, #2dce89, #2dcecc)" : "rgba(0,0,0,0.05)",
                  color: D ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [n.staff_name?.substring(0, 1) || "S", D && e.jsx("span", {
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
                  children: n.staff_name
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
                      color: n.morning_count > 0 ? "#5e72e4" : "#ccc"
                    },
                    children: ["🌅", n.morning_count || 0]
                  }), e.jsxs("span", {
                    title: "บ่าย",
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: n.afternoon_count > 0 ? "#fb6340" : "#ccc"
                    },
                    children: ["☀️", n.afternoon_count || 0]
                  }), e.jsxs("span", {
                    title: "ดึก",
                    style: {
                      fontSize: "8px",
                      fontWeight: 800,
                      color: n.night_count > 0 ? "#172b4d" : "#ccc"
                    },
                    children: ["🌙", n.night_count || 0]
                  })]
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
                    color: "#2dce89"
                  },
                  children: n.total_count
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "งาน"
                })]
              })]
            }, R)
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
    })]
  })
});
A.memo(function(l) {
  return e.jsx(e.Fragment, {
    children: l.children
  })
});
A.memo(function(l) {
  return e.jsx(e.Fragment, {
    children: l.children
  })
});
const Ve = A.memo(function({
    data: l,
    loading: z
  }) {
    const [n, R] = A.useState("all");
    if (z) return e.jsxs("div", {
      style: {
        marginTop: "24px",
        padding: "20px",
        background: "var(--md-surface-1)",
        borderRadius: "14px",
        border: "1px solid var(--md-border)"
      },
      children: [e.jsx("div", {
        style: {
          height: "20px",
          width: "200px",
          background: "var(--md-surface-2)",
          borderRadius: "6px",
          marginBottom: "14px"
        }
      }), e.jsx("div", {
        style: {
          height: "180px",
          background: "var(--md-surface-2)",
          borderRadius: "10px"
        }
      })]
    });
    if (!l?.flow?.length) return null;
    const _ = ["all", ...l.wards || []],
      D = {};
    l.flow.forEach(i => {
      D[i.ward] = i.ward_name || i.ward
    });
    const T = n === "all" ? l.flow : l.flow.filter(i => i.ward === n),
      $ = {};
    T.forEach(i => {
      $[i.date] || ($[i.date] = {
        date: i.date,
        admissions: 0,
        discharges: 0
      }), $[i.date].admissions += i.admissions, $[i.date].discharges += i.discharges
    });
    const W = Object.values($).sort((i, v) => i.date.localeCompare(v.date)).map(i => ({
      ...i,
      label: new Date(i.date).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short"
      }),
      net: i.admissions - i.discharges
    }));
    return e.jsxs("div", {
      style: {
        marginTop: "24px"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px"
        },
        children: [e.jsx("div", {
          style: {
            width: "4px",
            height: "28px",
            background: "linear-gradient(180deg,#0ea5e9,#6366f1)",
            borderRadius: "2px"
          }
        }), e.jsxs("div", {
          children: [e.jsx("h3", {
            style: {
              margin: 0,
              fontSize: "16px",
              fontWeight: 800,
              color: "var(--md-text-primary)"
            },
            children: "📊 Bed Flow — 14 วันย้อนหลัง"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-tertiary)"
            },
            children: "Admit vs Discharge per Ward · HOSxP XE"
          })]
        }), e.jsx("div", {
          style: {
            marginLeft: "auto",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap"
          },
          children: _.slice(0, 6).map(i => e.jsx("button", {
            onClick: () => R(i),
            style: {
              padding: "3px 10px",
              borderRadius: "99px",
              fontSize: "11px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              background: n === i ? "#6366f1" : "var(--md-surface-2)",
              color: n === i ? "#fff" : "var(--md-text-secondary)",
              transition: "all 0.15s"
            },
            children: i === "all" ? "ทุกวอร์ด" : D[i] || i
          }, i))
        })]
      }), e.jsxs("div", {
        style: {
          background: "var(--md-surface-2)",
          borderRadius: "14px",
          border: "1px solid var(--md-border)",
          padding: "16px"
        },
        children: [e.jsx(V, {
          width: "100%",
          height: 200,
          children: e.jsxs(We, {
            data: W,
            margin: {
              top: 4,
              right: 10,
              left: 0,
              bottom: 0
            },
            children: [e.jsx(J, {
              strokeDasharray: "3 3",
              stroke: "var(--md-border)"
            }), e.jsx(Z, {
              dataKey: "label",
              tick: {
                fill: "var(--md-text-tertiary)",
                fontSize: 10
              }
            }), e.jsx(ee, {
              tick: {
                fill: "var(--md-text-tertiary)",
                fontSize: 10
              }
            }), e.jsx(Q, {
              contentStyle: {
                background: "var(--md-surface-1)",
                border: "1px solid var(--md-border)",
                borderRadius: "8px",
                fontSize: "12px"
              },
              formatter: (i, v) => [`${i} ราย`, v === "admissions" ? "รับใหม่" : v === "discharges" ? "จำหน่าย" : "Net Flow"]
            }), e.jsx(ke, {
              wrapperStyle: {
                fontSize: "11px"
              },
              formatter: i => i === "admissions" ? "รับใหม่" : i === "discharges" ? "จำหน่าย" : "Net"
            }), e.jsx(O, {
              dataKey: "admissions",
              fill: "#6366f1",
              fillOpacity: .8,
              radius: [3, 3, 0, 0]
            }), e.jsx(O, {
              dataKey: "discharges",
              fill: "#10b981",
              fillOpacity: .8,
              radius: [3, 3, 0, 0]
            }), e.jsx(ze, {
              type: "monotone",
              dataKey: "net",
              stroke: "#f59e0b",
              strokeWidth: 2,
              dot: !1
            })]
          })
        }), e.jsx("div", {
          style: {
            display: "flex",
            gap: "16px",
            marginTop: "10px",
            justifyContent: "center"
          },
          children: [{
            label: "รวมรับ 14 วัน",
            value: W.reduce((i, v) => i + v.admissions, 0),
            color: "#6366f1"
          }, {
            label: "รวมจำหน่าย 14 วัน",
            value: W.reduce((i, v) => i + v.discharges, 0),
            color: "#10b981"
          }, {
            label: "Net (รับ - จำหน่าย)",
            value: W.reduce((i, v) => i + v.net, 0),
            color: "#f59e0b"
          }].map((i, v) => e.jsxs("div", {
            style: {
              textAlign: "center"
            },
            children: [e.jsxs("div", {
              style: {
                fontSize: "18px",
                fontWeight: 900,
                color: i.color
              },
              children: [i.value >= 0 ? "+" : "", i.value]
            }), e.jsx("div", {
              style: {
                fontSize: "11px",
                color: "var(--md-text-tertiary)"
              },
              children: i.label
            })]
          }, v))
        })]
      })]
    })
  }),
  Qe = A.memo(function({
    data: l,
    loading: z
  }) {
    const [n, R] = A.useState("all");
    if (z) return e.jsxs("div", {
      style: {
        marginTop: "24px",
        marginBottom: "32px",
        padding: "20px",
        background: "var(--md-surface-1)",
        borderRadius: "14px",
        border: "1px solid var(--md-border)"
      },
      children: [e.jsx("div", {
        style: {
          height: "20px",
          width: "240px",
          background: "var(--md-surface-2)",
          borderRadius: "6px",
          marginBottom: "14px"
        }
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "8px"
        },
        children: [1, 2, 3].map(p => e.jsx("div", {
          style: {
            height: "60px",
            background: "var(--md-surface-2)",
            borderRadius: "10px"
          }
        }, p))
      })]
    });
    if (!l) return null;
    const {
      today_count: _ = 0,
      tomorrow_count: D = 0,
      total: T = 0,
      patients: $ = []
    } = l, W = n === "all" ? $ : $.filter(p => p.discharge_window === n), i = {
      today: "#f43f5e",
      tomorrow: "#f59e0b",
      upcoming: "#10b981"
    }, v = {
      today: "วันนี้",
      tomorrow: "พรุ่งนี้",
      upcoming: "กำลังมา"
    };
    return e.jsxs("div", {
      style: {
        marginTop: "24px",
        marginBottom: "32px"
      },
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px"
        },
        children: [e.jsx("div", {
          style: {
            width: "4px",
            height: "28px",
            background: "linear-gradient(180deg,#10b981,#0ea5e9)",
            borderRadius: "2px"
          }
        }), e.jsxs("div", {
          children: [e.jsx("h3", {
            style: {
              margin: 0,
              fontSize: "16px",
              fontWeight: 800,
              color: "var(--md-text-primary)"
            },
            children: "📋 Discharge Planning Board"
          }), e.jsx("span", {
            style: {
              fontSize: "12px",
              color: "var(--md-text-tertiary)"
            },
            children: "คาดการณ์จาก adjRW × 4d — ผู้ป่วยที่น่าจะจำหน่ายวันนี้/พรุ่งนี้"
          })]
        })]
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px",
          marginBottom: "16px"
        },
        children: [{
          label: "จำหน่ายวันนี้",
          value: _,
          color: "#f43f5e",
          key: "today"
        }, {
          label: "จำหน่ายพรุ่งนี้",
          value: D,
          color: "#f59e0b",
          key: "tomorrow"
        }, {
          label: "รวมทั้งหมด",
          value: T,
          color: "#10b981",
          key: "all"
        }].map((p, H) => e.jsxs("button", {
          onClick: () => R(p.key),
          style: {
            padding: "14px",
            background: n === p.key ? `${p.color}15` : "var(--md-surface-2)",
            border: `1px solid ${n===p.key?p.color:"var(--md-border)"}`,
            borderTop: `3px solid ${p.color}`,
            borderRadius: "12px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.15s"
          },
          children: [e.jsx("div", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--md-text-tertiary)",
              textTransform: "uppercase",
              marginBottom: "4px"
            },
            children: p.label
          }), e.jsx("div", {
            style: {
              fontSize: "24px",
              fontWeight: 900,
              color: p.color
            },
            children: p.value
          }), e.jsx("div", {
            style: {
              fontSize: "11px",
              color: "var(--md-text-tertiary)"
            },
            children: "ราย"
          })]
        }, H))
      }), W.length === 0 ? e.jsxs("div", {
        style: {
          padding: "32px",
          textAlign: "center",
          background: "var(--md-surface-2)",
          borderRadius: "12px",
          border: "1px solid var(--md-border)"
        },
        children: [e.jsx("div", {
          style: {
            fontSize: "24px",
            marginBottom: "8px"
          },
          children: "✅"
        }), e.jsx("div", {
          style: {
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--md-text-secondary)"
          },
          children: "ไม่มีผู้ป่วยที่คาดว่าจะจำหน่ายในช่วงนี้"
        })]
      }) : e.jsxs("div", {
        style: {
          background: "var(--md-surface-2)",
          borderRadius: "14px",
          border: "1px solid var(--md-border)",
          overflow: "hidden"
        },
        children: [e.jsx("div", {
          style: {
            overflowX: "auto"
          },
          children: e.jsxs("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px"
            },
            children: [e.jsx("thead", {
              children: e.jsx("tr", {
                style: {
                  borderBottom: "1px solid var(--md-border)",
                  background: "var(--md-surface-1)"
                },
                children: ["ผู้ป่วย", "Ward", "รับวันที่", "LOS ปัจจุบัน", "คาดจำหน่าย", "adjRW", "แพทย์", "สถานะ"].map(p => e.jsx("th", {
                  style: {
                    padding: "10px 12px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap"
                  },
                  children: p
                }, p))
              })
            }), e.jsx("tbody", {
              children: W.slice(0, 20).map((p, H) => {
                const N = i[p.discharge_window] || "#64748b",
                  F = p.expected_discharge ? new Date(p.expected_discharge).toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "short"
                  }) : "—",
                  X = p.regdate ? new Date(p.regdate).toLocaleDateString("th-TH", {
                    day: "numeric",
                    month: "short"
                  }) : "—";
                return e.jsxs("tr", {
                  style: {
                    borderBottom: "1px solid var(--md-border)",
                    background: H % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)"
                  },
                  children: [e.jsx("td", {
                    style: {
                      padding: "9px 12px",
                      fontWeight: 600
                    },
                    children: p.patient_name || `HN ${p.hn}`
                  }), e.jsx("td", {
                    style: {
                      padding: "9px 12px",
                      color: "var(--md-text-secondary)"
                    },
                    children: p.ward
                  }), e.jsx("td", {
                    style: {
                      padding: "9px 12px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: X
                  }), e.jsxs("td", {
                    style: {
                      padding: "9px 12px",
                      fontWeight: 700,
                      color: p.current_los > p.expected_los ? "#f43f5e" : "var(--md-text-primary)"
                    },
                    children: [p.current_los, " วัน"]
                  }), e.jsx("td", {
                    style: {
                      padding: "9px 12px",
                      fontWeight: 700
                    },
                    children: F
                  }), e.jsx("td", {
                    style: {
                      padding: "9px 12px",
                      color: "#8b5cf6",
                      fontWeight: 700
                    },
                    children: Number(p.rw).toFixed(2)
                  }), e.jsx("td", {
                    style: {
                      padding: "9px 12px",
                      color: "var(--md-text-tertiary)",
                      fontSize: "12px",
                      maxWidth: "120px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    },
                    children: p.doctor_name || "—"
                  }), e.jsx("td", {
                    style: {
                      padding: "9px 12px"
                    },
                    children: e.jsx("span", {
                      style: {
                        background: `${N}15`,
                        color: N,
                        border: `1px solid ${N}40`,
                        borderRadius: "99px",
                        padding: "2px 8px",
                        fontSize: "11px",
                        fontWeight: 700,
                        whiteSpace: "nowrap"
                      },
                      children: v[p.discharge_window] || "—"
                    })
                  })]
                }, H)
              })
            })]
          })
        }), W.length > 20 && e.jsxs("div", {
          style: {
            padding: "8px 16px",
            textAlign: "center",
            fontSize: "12px",
            color: "var(--md-text-tertiary)",
            borderTop: "1px solid var(--md-border)"
          },
          children: ["แสดง 20 จาก ", W.length, " ราย"]
        })]
      })]
    })
  });
A.memo(function(l) {
  return e.jsx(e.Fragment, {
    children: l.children
  })
});
A.memo(function(l) {
  return e.jsx(e.Fragment, {
    children: l.children
  })
});
A.memo(function(l) {
  return e.jsx(e.Fragment, {
    children: l.children
  })
});

function Xe() {
  const b = Oe(t => ({
      bedOccupancy: t.bedOccupancy,
      alosData: t.alosData,
      bedDemand: t.bedDemand,
      readmission: t.readmission,
      losPrediction: t.losPrediction,
      loading: t.loading,
      ipdAnalytics: t.ipdAnalytics,
      medRecToday: t.medRecToday,
      ipdRevenueFiscal: t.ipdRevenueFiscal,
      bedFlow: t.bedFlow,
      dischargePlanning: t.dischargePlanning,
      ipdAI: t.ipdAI
    })),
    {
      fetchData: l,
      dispatch: z,
      openDrillDown: n,
      closeDrillDown: R
    } = He(),
    {
      bedOccupancy: _,
      alosData: D
    } = b,
    T = b.bedDemand,
    $ = b.readmission,
    W = b.losPrediction,
    i = b.loading,
    [v, p] = k.useState(!1),
    [H, N] = k.useState(!1),
    [F, X] = k.useState(null),
    [G, oe] = k.useState(null),
    [L, le] = k.useState(null),
    [d, B] = k.useState(!1);
  k.useEffect(() => {
    let t = !1;
    async function r() {
      try {
        const f = await fetch("/api/ipd/undiagnosed-day1", {
          credentials: "include"
        });
        if (!f.ok || t) return;
        const x = await f.json();
        t || le(x)
      } catch {}
    }
    r();
    const a = setInterval(r, 5 * 6e4);
    return () => {
      t = !0, clearInterval(a)
    }
  }, []);
  const te = new Date,
    $e = te.getMonth() + 1,
    he = te.getFullYear(),
    Ce = $e >= 10 ? he : he - 1,
    [me, Ie] = k.useState(`${Ce}-10-01`),
    [ye, Ae] = k.useState(te.toISOString().slice(0, 10)),
    [de, ue] = k.useState(!1),
    be = k.useRef(null),
    Te = k.useCallback(async (t, r) => {
      ue(!0), z({
        type: "SET_LOADING",
        key: "ipdRevenueFiscal",
        payload: !0
      });
      try {
        const a = new URLSearchParams;
        t && a.set("start", t), r && a.set("end", r);
        const f = `/api/ipd/revenue-fiscal${a.toString()?"?"+a:""}`,
          x = await fetch(f);
        if (!x.ok) throw new Error(`HTTP ${x.status}`);
        const I = await x.json();
        z({
          type: "SET_DATA",
          key: "ipdRevenueFiscal",
          payload: I
        })
      } catch (a) {
        z({
          type: "SET_ERROR",
          key: "ipdRevenueFiscal",
          payload: a.message
        })
      } finally {
        ue(!1), z({
          type: "SET_LOADING",
          key: "ipdRevenueFiscal",
          payload: !1
        })
      }
    }, [z]),
    Le = k.useCallback(() => {
      const t = be.current;
      if (!t) return;
      const r = window.open("", "_blank");
      r.document.write(`<html><head><title>รายได้โดยประมาณ IPD</title>
        <style>
            body { font-family: 'Kanit','Segoe UI',sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; font-size: 11px; }
            th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: center; }
            th { background: #f0f0ff; font-weight: 700; }
            .row-total { background: #e0f2fe; font-weight: 800; }
            @media print { body { margin: 0; } }
        </style></head><body>${t.outerHTML}</body></html>`), r.document.close(), r.print()
    }, []),
    Pe = k.useCallback(() => {
      const r = b.ipdRevenueFiscal?.fiscal_years || [];
      if (!r.length) return;
      const a = ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."],
        f = ["เดือน", ...r.map(c => `รายได้ (${c.fiscal_label})`), ...r.map(c => `Cases (${c.fiscal_label})`), ...r.map(c => `Patients (${c.fiscal_label})`)],
        x = a.map((c, g) => [c, ...r.map(S => S.months[g]?.revenue || 0), ...r.map(S => S.months[g]?.cases || 0), ...r.map(S => S.months[g]?.patients || 0)]);
      x.push(["รวม", ...r.map(c => c.total_revenue), ...r.map(c => c.total_cases), ...r.map(c => c.total_patients)]);
      const I = "\uFEFF" + [f.join(","), ...x.map(c => c.join(","))].join(`\r
`),
        m = new Blob([I], {
          type: "text/csv;charset=utf-8;"
        }),
        u = URL.createObjectURL(m),
        h = document.createElement("a");
      h.href = u, h.download = "BCH360_IPD_Revenue_Fiscal.csv", h.click(), URL.revokeObjectURL(u)
    }, [b.ipdRevenueFiscal]),
    P = b.ipdAnalytics;
  b.medRecToday, k.useEffect(() => {
    l("bedOccupancy", "/api/ipd/bed-occupancy"), l("alosData", "/api/ipd/alos"), l("ipdAnalytics", "/api/ipd/analytics");
    const t = setTimeout(() => {
        l("medRecToday", "/api/medrec/today"), l("ipdRevenueFiscal", "/api/ipd/revenue-fiscal")
      }, 400),
      r = setTimeout(() => {
        l("bedDemand", "/api/ai/bed-demand"), l("readmission", "/api/ai/readmission"), l("losPrediction", "/api/ai/los-predictor"), l("dischargePlanning", "/api/ipd/discharge-planning"), l("bedFlow", "/api/ipd/bed-flow")
      }, 600),
      a = setTimeout(() => l("ipdAI", "/api/ai/ipd/optimization"), 900);
    return () => {
      clearTimeout(t), clearTimeout(r), clearTimeout(a)
    }
  }, [l]);
  const ve = k.useMemo(() => _?.wards ? _.wards.filter(t => t.total_beds > 0).map(t => ({
      name: (t.name?.length ?? 0) > 10 ? t.shortname || t.name.substring(0, 10) : t.name ?? "",
      occupancy: t.occupancy_rate,
      occupied: t.occupied,
      total: t.total_beds
    })) : [], [_]),
    Be = k.useMemo(() => T?.wards ? T.wards.filter(t => t.total_beds > 0).map(t => ({
      name: t.ward,
      now: t.current_rate,
      h24: t.forecast[0]?.occupancy_rate || 0,
      h48: t.forecast[1]?.occupancy_rate || 0,
      h72: t.forecast[2]?.occupancy_rate || 0
    })) : [], [T]),
    re = _?.summary;
  return e.jsxs("div", {
    className: "space-y-4 animate-fade-in pb-8",
    children: [e.jsx(Ne, {
      title: "AI Executive Quick Summary — IPD",
      subtitle: "Bed Occupancy · ALOS · Readmission · Flow",
      badge: "📐 Quick Summary",
      accentColor: "#7c3aed",
      headerGradient: "linear-gradient(135deg, rgba(124,58,237,.10), rgba(236,72,153,.05))",
      narrative: Fe(b)
    }), T?.alert_count > 0 && e.jsx("div", {
      className: "glass-card shadow-xl bg-gradient-to-r from-[#fb6340]/10 to-transparent p-4 border-l-4 border-[#fb6340] rounded-2xl",
      children: e.jsxs("div", {
        className: "flex items-center gap-3",
        children: [e.jsx("span", {
          className: "text-xl",
          children: "🧠"
        }), e.jsxs("div", {
          className: "flex-1",
          children: [e.jsx("h3", {
            className: "text-xs font-bold text-white uppercase tracking-widest",
            children: "Neural Demand Forecast Alert"
          }), e.jsxs("p", {
            className: "text-[11px] text-[#fb6340] font-bold mt-0.5",
            children: [T.alert_count, " wards projected to reach critical capacity (90%+) within 24-72 hours."]
          })]
        })]
      })
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))",
        gap: "12px"
      },
      children: [e.jsxs("div", {
        onClick: () => n("ipd_beds", "รายละเอียดการครองเตียง (IPD)", "/api/ipd/drilldown?type=beds"),
        style: {
          gridColumn: "span 2",
          padding: "1.25rem 1.5rem",
          borderRadius: "16px",
          background: "linear-gradient(135deg, rgba(99,102,241,.12) 0%, rgba(124,58,237,.06) 100%)",
          border: "1px solid rgba(99,102,241,.2)",
          backdropFilter: "blur(12px)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          transform: H ? "translateY(-2px)" : "none",
          boxShadow: H ? "0 10px 30px -10px rgba(99,102,241,.3)" : "none"
        },
        onMouseEnter: () => N(!0),
        onMouseLeave: () => N(!1),
        children: [e.jsx("div", {
          style: {
            position: "absolute",
            top: "-30px",
            right: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }
        }), i.bedOccupancy ? e.jsxs("div", {
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
          const t = re?.occupied ?? 0,
            r = re?.total_beds ?? 0,
            a = re?.occupancy_rate ?? 0,
            f = r - t,
            x = a > 90 ? "#f43f5e" : a > 80 ? "#f59e0b" : "#10b981";
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
              children: [e.jsxs("p", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#6366f1",
                  margin: 0
                },
                children: ["🏥 ผู้ป่วยนอนอยู่ ณ ขณะนี้ ", e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    opacity: .7,
                    textTransform: "none"
                  },
                  children: "(ไม่รวม Home Ward)"
                })]
              }), e.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600,
                  background: "rgba(99,102,241,.08)",
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
                  color: "#6366f1",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  textShadow: "0 0 40px rgba(99,102,241,.3)"
                },
                children: t.toLocaleString("th-TH")
              }), e.jsxs("span", {
                style: {
                  fontSize: "14px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 700
                },
                children: ["/ ", r.toLocaleString("th-TH"), " เตียง"]
              }), e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: "99px",
                  background: `${x}15`,
                  color: x
                },
                children: [a, "% ครองเตียง"]
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
                    color: x
                  },
                  children: ["🛏️ ครองเตียง ", t, " (", a, "%)"]
                }), e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#10b981"
                  },
                  children: ["ว่าง ", f, " เตียง"]
                })]
              }), e.jsxs("div", {
                style: {
                  height: "6px",
                  borderRadius: "99px",
                  overflow: "hidden",
                  background: "rgba(16,185,129,.12)",
                  display: "flex"
                },
                children: [e.jsx("div", {
                  style: {
                    width: `${Math.min(100,a)}%`,
                    background: `linear-gradient(90deg, ${x}, ${x}cc)`,
                    borderRadius: "99px 0 0 99px",
                    transition: "width 0.8s ease"
                  }
                }), e.jsx("div", {
                  style: {
                    flex: 1,
                    background: "rgba(16,185,129,.2)",
                    borderRadius: "0 99px 99px 0"
                  }
                })]
              })]
            })]
          })
        })()]
      }), [{
        title: "ระยะนอนเฉลี่ย",
        value: D?.summary?.overall_alos ?? "—",
        icon: "⏱️",
        unit: "วัน/ราย",
        grad: ["#0ea5e9", "#0284c7"],
        glow: "rgba(14,165,233,.2)",
        loading: i.alosData,
        drillDownId: "ipd_alos",
        drillDownEndpoint: "/api/ipd/drilldown?type=alos"
      }, {
        title: "เสี่ยง Re-admit",
        value: $?.patients?.filter(t => ["high", "moderate"].includes(t.risk_level))?.length ?? 0,
        icon: "🧠",
        unit: "ราย",
        grad: ($?.patients?.filter(t => ["high", "moderate"].includes(t.risk_level))?.length ?? 0) > 5 ? ["#f43f5e", "#dc2626"] : ["#f59e0b", "#d97706"],
        glow: "rgba(245,158,11,.2)",
        loading: i.readmission,
        drillDownId: "ipd_readmit",
        drillDownEndpoint: "/api/ipd/drilldown?type=readmit"
      }, {
        title: "นอนเกินกำหนด",
        value: W?.patients?.filter(t => ["over_stay", "at_risk"].includes(t.status))?.length ?? 0,
        icon: "⌛",
        unit: "ราย",
        grad: (W?.patients?.filter(t => ["over_stay", "at_risk"].includes(t.status))?.length ?? 0) > 10 ? ["#f43f5e", "#dc2626"] : ["#f59e0b", "#d97706"],
        glow: "rgba(245,158,11,.2)",
        loading: i.losPrediction,
        drillDownId: "ipd_alos",
        drillDownEndpoint: "/api/ipd/drilldown?type=alos"
      }].map((t, r) => e.jsx("div", {
        onClick: () => t.drillDownId && n(t.drillDownId, t.title, t.drillDownEndpoint),
        style: {
          padding: "1rem 1.25rem",
          borderRadius: "14px",
          background: `linear-gradient(135deg, ${t.grad[0]}10 0%, ${t.grad[1]}05 100%)`,
          border: `1px solid ${t.grad[0]}25`,
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: t.drillDownId ? "pointer" : "default",
          transform: F === r ? "translateY(-2px)" : "none",
          boxShadow: F === r ? `0 8px 25px ${t.glow}` : "none"
        },
        onMouseEnter: () => t.drillDownId && X(r),
        onMouseLeave: () => X(null),
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
      }, `ipd-kpi-${r}`))]
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
        children: "🩺 บุคลากรที่ปฏิบัติหน้าที่วันนี้ (On-Duty IPD)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(94,114,228,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "Activity Logs · Clinical Database"
      })]
    }), e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "12px"
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
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#5e72e4"
              },
              children: "แผนกแพทย์ (IPD)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#5e72e4",
              opacity: .8
            },
            children: P?.on_duty?.doctors?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: i.ipdAnalytics ? Array(3).fill(0).map((t, r) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, r)) : P?.on_duty?.doctors?.length > 0 ? P.on_duty.doctors.map((t, r) => e.jsxs("div", {
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
            children: [e.jsx("div", {
              style: {
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #5e72e4, #8b5cf6)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: t.staff_name?.substring(0, 2).replace("น.", "").replace("พ.", "").trim() || "D"
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
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "10px",
                  color: "var(--md-text-tertiary)",
                  fontWeight: 600
                },
                children: "Attending Doctor"
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
                  color: "#5e72e4"
                },
                children: t.total_count
              }), e.jsx("p", {
                style: {
                  margin: 0,
                  fontSize: "8px",
                  fontWeight: 700,
                  color: "var(--md-text-tertiary)"
                },
                children: "เคส"
              })]
            })]
          }, r)) : e.jsx("div", {
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
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#11cdef"
              },
              children: "ทีมพยาบาล (IPD)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#11cdef",
              opacity: .8
            },
            children: P?.on_duty?.nurses?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: i.ipdAnalytics ? Array(3).fill(0).map((t, r) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, r)) : P?.on_duty?.nurses?.length > 0 ? P.on_duty.nurses.map((t, r) => {
            const a = new Date().getHours(),
              f = a < 12 && t.morning_count > 0 || a >= 12 && a < 17 && t.afternoon_count > 0 || a >= 17 && t.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: f ? "linear-gradient(135deg, #11cdef, #1171ef)" : "rgba(0,0,0,0.05)",
                  color: f ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.staff_name?.substring(0, 1) || "N", f && e.jsx("span", {
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
              }), e.jsxs("div", {
                style: {
                  textAlign: "right"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#11cdef"
                  },
                  children: t.total_count
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "งาน"
                })]
              })]
            }, r)
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
            }), e.jsx("span", {
              style: {
                fontSize: "12px",
                fontWeight: 800,
                color: "#2dce89"
              },
              children: "หน้าที่สนับสนุน (IPD)"
            })]
          }), e.jsx("span", {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              color: "#2dce89",
              opacity: .8
            },
            children: P?.on_duty?.staff?.length || 0
          })]
        }), e.jsx("div", {
          style: {
            maxHeight: "240px",
            overflowY: "auto",
            padding: "8px"
          },
          className: "custom-scrollbar",
          children: i.ipdAnalytics ? Array(3).fill(0).map((t, r) => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "50px",
              margin: "4px 0",
              borderRadius: "10px"
            }
          }, r)) : P?.on_duty?.staff?.length > 0 ? P.on_duty.staff.map((t, r) => {
            const a = new Date().getHours(),
              f = a < 12 && t.morning_count > 0 || a >= 12 && a < 17 && t.afternoon_count > 0 || a >= 17 && t.night_count > 0;
            return e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "10px",
                borderBottom: "1px solid rgba(0,0,0,0.03)"
              },
              children: [e.jsxs("div", {
                style: {
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: f ? "linear-gradient(135deg, #2dce89, #2dcecc)" : "rgba(0,0,0,0.05)",
                  color: f ? "#fff" : "var(--md-text-tertiary)",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                },
                children: [t.staff_name?.substring(0, 1) || "S", f && e.jsx("span", {
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
              }), e.jsxs("div", {
                style: {
                  textAlign: "right"
                },
                children: [e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 900,
                    color: "#2dce89"
                  },
                  children: t.total_count
                }), e.jsx("p", {
                  style: {
                    margin: 0,
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)"
                  },
                  children: "งาน"
                })]
              })]
            }, r)
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
        marginBottom: "-4px"
      },
      children: [e.jsx("div", {
        style: {
          width: "3px",
          height: "18px",
          background: "linear-gradient(180deg, #0ea5e9, #6366f1)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "🔬 Advanced Analytics — IPD"
      }), e.jsxs("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(14,165,233,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: [new Intl.DateTimeFormat("th-TH", {
          day: "numeric",
          month: "short",
          year: "2-digit"
        }).format(new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3)), " - ", new Intl.DateTimeFormat("th-TH", {
          day: "numeric",
          month: "short",
          year: "2-digit"
        }).format(new Date), " · HOSxP XE"]
      })]
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      children: i.ipdAnalytics ? e.jsxs("div", {
        style: {
          display: "flex",
          gap: "1.5rem"
        },
        children: [e.jsx("div", {
          className: "skeleton",
          style: {
            height: "200px",
            width: "200px",
            borderRadius: "50%",
            flexShrink: 0
          }
        }), e.jsx("div", {
          style: {
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px"
          },
          children: [1, 2, 3, 4, 5, 6].map(t => e.jsx("div", {
            className: "skeleton",
            style: {
              height: "64px",
              borderRadius: "10px"
            }
          }, t))
        })]
      }) : (() => {
        const t = P || {},
          r = t.wei ?? 0,
          a = r >= 80 ? "#10b981" : r >= 60 ? "#f59e0b" : "#f43f5e",
          f = r >= 90 ? "A+" : r >= 80 ? "A" : r >= 70 ? "B+" : r >= 60 ? "B" : r >= 50 ? "C" : "D",
          x = 72,
          I = Math.PI * x,
          m = Math.min(r / 100, 1) * I,
          u = t.wei_components || {},
          h = [{
            name: "Turnover",
            score: u.turnover || 0
          }, {
            name: "ALOS",
            score: u.alos || 0
          }, {
            name: "Overstay",
            score: u.overstay || 0
          }, {
            name: "CMI",
            score: u.cmi || 0
          }, {
            name: "Disch Plan",
            score: u.disch_plan || 0
          }, {
            name: "Re-admit",
            score: u.readmit || 0
          }],
          c = (t.admission_trend || []).map(o => ({
            date: o.d ? new Date(o.d).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "short"
            }) : "",
            รั บใหม่: Number(o.admissions || 0),
            จำหน่ าย: Number(o.discharges || 0)
          })),
          g = (t.male || 0) + (t.female || 0),
          S = g > 0 ? Math.round(t.male / g * 100) : 0,
          w = [{
            icon: "🔄",
            label: "อัตราการหมุนเวียนเตียง (Bed Turnover Rate)",
            value: `${t.bed_turnover_rate??"—"}x`,
            sub: `รอบ/เตียง/30 วัน · จำหน่าย ${t.discharged_30d??0} ราย`,
            desc: "ตัวชี้วัดประสิทธิภาพการใช้ทรัพยากรเตียง · คำนวณจาก จำนวนผู้ป่วยที่จำหน่าย ÷ จำนวนเตียงทั้งหมด ใน 1 เดือน · ค่าสูงแสดงถึงการใช้เตียงอย่างคุ้มค่า",
            color: (t.bed_turnover_rate ?? 0) >= 3 ? "#10b981" : (t.bed_turnover_rate ?? 0) >= 1.5 ? "#f59e0b" : "#f43f5e",
            problem: (t.bed_turnover_rate ?? 0) >= 3 ? `ค่าที่วัดได้ ${t.bed_turnover_rate} รอบต่อเตียงต่อเดือน อยู่ในเกณฑ์ดีเยี่ยม (มาตรฐานกระทรวงสาธารณสุข ≥ 3 รอบ) แสดงให้เห็นว่า ระบบการจำหน่ายผู้ป่วยและการจัดการเตียงดำเนินไปอย่างมีประสิทธิภาพ ผู้ป่วยรายใหม่สามารถเข้ารับการรักษาได้ทันเวลา ไม่เกิดปัญหาการค้างเตียงที่ห้องฉุกเฉิน (ER Boarding)` : (t.bed_turnover_rate ?? 0) >= 1.5 ? `ค่าที่วัดได้ ${t.bed_turnover_rate??0} รอบต่อเตียงต่อเดือน ต่ำกว่ามาตรฐาน (≥ 3 รอบ) สะท้อนว่า เตียงถูกใช้งานนานกว่าที่ควรจะเป็น อาจเกิดจากระยะเวลานอนรักษา (Length of Stay) ยาวนาน การวางแผนจำหน่ายล่าช้า หรือภาวะแทรกซ้อนระหว่างการรักษา ส่งผลให้ผู้ป่วยรายใหม่รอรับบริการที่ห้องฉุกเฉินหรือคลินิกนอก` : `ค่าที่วัดได้ ${t.bed_turnover_rate??0} รอบต่อเตียงต่อเดือน อยู่ในระดับวิกฤตอย่างยิ่ง การหมุนเวียนเตียงช้ามาก ส่งผลรุนแรง ได้แก่ เวลารับผู้ป่วยค้างที่ ER เพิ่มขึ้น การผ่าตัดตามนัด (Elective Surgery) ถูกเลื่อน และต้นทุนต่อผู้ป่วยหนึ่งรายเพิ่มสูงขึ้น เนื่องจากค่าใช้จ่ายคงที่ (Fixed Cost) ถูกหารด้วยจำนวนผู้ป่วยน้อย`,
            recommend: (t.bed_turnover_rate ?? 0) >= 3 ? "ข้อเสนอแนะสำหรับผู้บริหาร : คงมาตรฐานที่ดีนี้ไว้ โดยติดตามหอผู้ป่วย (Ward) ที่มีอัตราการหมุนเวียนต่ำกว่าเป้าเป็นรายกรณี เพื่อค้นหาโอกาสในการปรับปรุงกระบวนการ · ข้อเสนอแนะสำหรับพยาบาล : ร่วมประชุม Morning Huddle กับแพทย์ทุกเช้า เพื่อระบุผู้ป่วยที่พร้อมจำหน่าย และประสานกับพยาบาลจัดการผู้ป่วย (Case Manager) ในการเตรียมผู้ป่วยก่อนจำหน่าย 1 วัน" : (t.bed_turnover_rate ?? 0) >= 1.5 ? "มาตรการปรับปรุงที่แนะนำ : (1) จัดตั้งทีมวางแผนจำหน่ายผู้ป่วย (Discharge Planning Team) ที่ทำงานตั้งแต่วันแรกที่รับผู้ป่วยเข้านอน (2) กำหนดรอบตรวจผู้ป่วยช่วงเช้า (Morning Round) ก่อน 10.00 น. ทุกวัน เพื่อตัดสินใจจำหน่ายให้เร็วขึ้น (3) นำแนวทางเวชปฏิบัติ (Clinical Pathway) ตามกลุ่มโรค DRG มาใช้เพื่อควบคุมระยะเวลานอน (4) ขยายบริการดูแลผู้ป่วยที่บ้าน (Home Health Care) และการผ่าตัดแบบไปเช้า-กลับเย็น (Day Surgery) เพื่อลดการนอนโรงพยาบาลที่ไม่จำเป็น" : "มาตรการเร่งด่วน ต้องดำเนินการภายใน 7 วัน : (1) ตรวจสอบผู้ป่วยทุกรายที่นอนเกินมาตรฐาน LOS ของ DRG ภายใน 48 ชั่วโมง (2) จัดตั้งห้องพักรอจำหน่าย (Discharge Lounge) เพื่อย้ายผู้ป่วยที่พร้อมกลับบ้านออกจากหอผู้ป่วย (3) จัดประชุมบริหารเตียง (Bed Management Huddle) ทั้งช่วงเช้าและบ่ายทุกวัน (4) พิจารณาจัดตั้งหอผู้ป่วยระยะฟื้นฟู (Step-down Unit) สำหรับผู้ป่วยที่พ้นวิกฤตแต่ยังต้องอยู่โรงพยาบาล",
            drillDownId: "ipd_beds",
            drillDownEndpoint: "/api/ipd/drilldown?type=beds"
          }, {
            icon: "📐",
            label: "ส่วนต่าง LOS เทียบมาตรฐาน DRG",
            value: `${t.alos_variance_pct>=0?"+":""}${t.alos_variance_pct??0}%`,
            sub: `จริง ${t.actual_alos??"—"}d · DRG ${t.benchmark_alos??"—"}d`,
            desc: "เปรียบเทียบระยะเวลานอนรักษาจริง (Actual Length of Stay) กับมาตรฐานของกลุ่มวินิจฉัยโรคร่วม (Diagnosis-Related Group) · ค่าใกล้ 0% แสดงว่ากระบวนการรักษาเป็นไปตามมาตรฐาน",
            color: Math.abs(t.alos_variance_pct ?? 0) <= 10 ? "#10b981" : Math.abs(t.alos_variance_pct ?? 0) <= 25 ? "#f59e0b" : "#f43f5e",
            problem: Math.abs(t.alos_variance_pct ?? 0) <= 10 ? `ค่าส่วนต่าง ${t.alos_variance_pct}% อยู่ในเกณฑ์ยอมรับได้ (±10%) แสดงว่าระยะเวลานอนรักษาจริงใกล้เคียงกับมาตรฐาน DRG สะท้อนว่า แนวทางเวชปฏิบัติ (Clinical Pathway) และการประสานงานของทีมสหวิชาชีพดำเนินไปอย่างมีประสิทธิภาพ ไม่เกิดความสูญเสียเตียง-วัน (Bed-day) ส่วนเกิน` : Math.abs(t.alos_variance_pct ?? 0) <= 25 ? `ค่าส่วนต่าง ${t.alos_variance_pct}% แสดงว่าระยะเวลานอนจริง (${t.actual_alos} วัน) เกินมาตรฐาน DRG (${t.benchmark_alos} วัน) สาเหตุที่พบบ่อย ได้แก่ (1) ภาวะแทรกซ้อนระหว่างการรักษา เช่น การติดเชื้อในโรงพยาบาล (2) การวางแผนจำหน่ายล่าช้า (3) การรอผลตรวจทางห้องปฏิบัติการหรือภาพถ่ายรังสี (4) การรับไว้ด้วยเหตุผลทางสังคม (Social Admission) ที่ไม่มีผู้ดูแลที่บ้าน` : `ค่าส่วนต่าง ${t.alos_variance_pct}% อยู่ในระดับเกินมาตรฐานมาก ส่งผลกระทบรุนแรง ได้แก่ (1) สูญเสียเตียง-วันส่วนเกินที่ไม่สามารถใช้รักษาผู้ป่วยรายอื่น (2) ค่ารักษาพยาบาลจริงสูงขึ้น แต่การเบิกจ่ายตาม DRG คงที่ ทำให้โรงพยาบาลขาดทุน (3) คุณภาพชีวิตผู้ป่วยลดลง เพิ่มความเสี่ยงต่อการติดเชื้อในโรงพยาบาล และแผลกดทับ`,
            recommend: Math.abs(t.alos_variance_pct ?? 0) <= 10 ? "ข้อเสนอแนะสำหรับผู้บริหาร : ใช้แนวทางเวชปฏิบัติปัจจุบันเป็นต้นแบบ (Benchmark) เพื่อขยายผลไปยังหอผู้ป่วยอื่น · ข้อเสนอแนะสำหรับพยาบาล : บันทึกและแบ่งปันแนวปฏิบัติที่ดี (Best Practice) กับหอผู้ป่วยอื่น โดยเฉพาะการประสานทีมสหวิชาชีพและการวางแผนจำหน่ายเชิงรุก" : Math.abs(t.alos_variance_pct ?? 0) <= 25 ? "มาตรการแก้ไขที่แนะนำ : (1) ทบทวนกลุ่มโรค DRG 10 อันดับแรกที่มีส่วนต่างสูงสุด เพื่อระบุกลุ่มปัญหา (2) วิเคราะห์หาสาเหตุรากของปัญหา (Root Cause Analysis) แยกตาม DRG (3) ปรับปรุงแนวทางเวชปฏิบัติให้มีจุดชี้วัดผลการรักษา (Clinical Milestone) ที่ชัดเจนในวันที่ 1, 3 และ 5 (4) จัดประชุมทีมสหวิชาชีพ (Multidisciplinary Team Round) ทุก 48 ชั่วโมง สำหรับผู้ป่วยที่มีความซับซ้อน" : "มาตรการวิกฤต ต้องดำเนินการทันที : (1) บังคับจัดประชุมทบทวนผู้ป่วย (Case Conference) ทุกรายที่นอนเกินมาตรฐาน DRG มากกว่า 3 วัน (2) ตรวจสอบ 100% ของเคสที่นอนเกินมาตรฐาน (3) ลงทุนระบบสนับสนุนการตัดสินใจทางคลินิก (Clinical Decision Support System) (4) กำหนดเป้าหมาย: ลดส่วนต่างให้ไม่เกิน 15% ภายใน 60 วัน (5) ผูกตัวชี้วัดผลการปฏิบัติงาน (KPI) กับผลงานของแพทย์ผู้ดูแล",
            drillDownId: "ipd_alos",
            drillDownEndpoint: "/api/ipd/drilldown?type=alos"
          }, {
            icon: "🔔",
            label: "อัตราการกลับมานอนซ้ำ 30 วัน (Readmission)",
            value: `${t.readmit_rate??0}%`,
            sub: `${t.readmit_count??0}/${t.readmit_total_discharges??0} ราย`,
            desc: "ตัวชี้วัดคุณภาพการรักษาที่สำคัญของ HA และ JCI · คำนวณจาก จำนวนผู้ป่วยที่กลับมานอนโรงพยาบาลภายใน 30 วันหลังจำหน่าย ÷ จำนวนผู้ป่วยที่จำหน่ายทั้งหมด · ค่าต่ำแสดงว่าคุณภาพการดูแลและการวางแผนจำหน่ายดี",
            color: (t.readmit_rate ?? 0) < 5 ? "#10b981" : (t.readmit_rate ?? 0) < 10 ? "#f59e0b" : "#f43f5e",
            problem: (t.readmit_rate ?? 0) < 5 ? `ค่าที่วัดได้ ${t.readmit_rate}% ต่ำกว่าเกณฑ์มาตรฐาน HA (< 5%) สะท้อนคุณภาพการวางแผนจำหน่ายและการดูแลต่อเนื่องหลังจำหน่ายในระดับดีเยี่ยม ผู้ป่วยได้รับการเตรียมความพร้อมก่อนกลับบ้านอย่างเหมาะสม มีระบบติดตามอาการและการนัดติดตามที่มีประสิทธิภาพ` : (t.readmit_rate ?? 0) < 10 ? `ค่าที่วัดได้ ${t.readmit_rate}% (จำนวน ${t.readmit_count} ราย) สูงกว่ามาตรฐาน HA (< 5%) สาเหตุที่พบบ่อย ได้แก่ (1) การจำหน่ายผู้ป่วยก่อนอาการคงที่ (Premature Discharge) (2) ไม่มีแผนการดูแลต่อเนื่องที่ชัดเจน (3) ผู้ป่วยขาดผู้ดูแล (Caregiver) ที่บ้าน (4) เกิดภาวะแทรกซ้อนที่บ้านเนื่องจากคำแนะนำไม่ชัดเจน` : `ค่าที่วัดได้ ${t.readmit_rate}% อยู่ในระดับสูงมาก ส่งผลกระทบหลายด้าน ได้แก่ (1) สิ้นเปลืองเตียง-วันเพิ่มขึ้น 3-5 เท่าของค่าใช้จ่ายครั้งแรก (2) คุณภาพการรักษาถูกตั้งคำถาม กระทบชื่อเสียงโรงพยาบาล (3) เสี่ยงถูกตรวจสอบจากสำนักงานหลักประกันสุขภาพแห่งชาติ (สปสช.) และสถาบันรับรองคุณภาพสถานพยาบาล (สรพ.) (4) กระทบการต่ออายุการรับรองคุณภาพ`,
            recommend: (t.readmit_rate ?? 0) < 5 ? "ข้อเสนอแนะสำหรับผู้บริหาร : ขยายผลแนวปฏิบัติที่ดี (Best Practice) ได้แก่ รายการตรวจสอบก่อนจำหน่าย (Discharge Checklist) และการโทรศัพท์ติดตามอาการภายใน 48 ชั่วโมง ไปยังทุกหอผู้ป่วย · ข้อเสนอแนะสำหรับพยาบาล : จัดทำสื่อการสอนการดูแลตนเองที่บ้านในรูปแบบวิดีโอภาษาที่เข้าใจง่าย เพื่อขยายผลไปยังผู้ป่วยกลุ่มอื่น" : (t.readmit_rate ?? 0) < 10 ? "มาตรการลดอัตราการกลับมานอนซ้ำ : (1) ดำเนินการโทรศัพท์ติดตามอาการผู้ป่วยทุกรายภายใน 48 ชั่วโมงหลังจำหน่าย (2) จัดทำสรุปการรักษา (Discharge Summary) ด้วยภาษาที่เข้าใจง่าย พร้อมวิดีโอสอนการดูแลตนเอง (3) นัดตรวจที่คลินิกนอกภายใน 7 วันหลังจำหน่าย (4) ส่งหน่วยบริการสุขภาพที่บ้าน (Home Health Care) เยี่ยมผู้ป่วยกลุ่มเสี่ยงสูง (5) วิเคราะห์ 5 กลุ่มโรค DRG ที่มีการกลับมานอนซ้ำบ่อย เพื่อหาสาเหตุเฉพาะ" : "มาตรการเร่งด่วน : (1) บังคับวิเคราะห์หาสาเหตุราก (Root Cause Analysis) ทุกรายที่กลับมานอนซ้ำ (2) จัดตั้งทีมป้องกันการกลับมานอนซ้ำ (Readmission Prevention Team) (3) จัดทำรายการตรวจสอบการส่งต่อการดูแล (Transition-of-Care Checklist) 10 รายการ ก่อนจำหน่ายทุกราย (4) แยกระดับความเสี่ยง (Risk Stratification) ผู้ป่วยที่มีความเสี่ยงสูงก่อนจำหน่าย เพื่อจัดการดูแลเชิงรุก (5) ตั้งเป้าหมาย : ลดให้ต่ำกว่า 5% ภายใน 90 วัน",
            drillDownId: "ipd_readmit",
            drillDownEndpoint: "/api/ipd/drilldown?type=readmit"
          }, {
            icon: "🕐",
            label: "การจำหน่ายก่อน 12.00 น. (Morning Discharge)",
            value: `${t.disch_before_noon_pct??0}%`,
            sub: `${t.disch_before_noon??0} ราย · เฉลี่ย ${t.avg_dch_hour??"—"} น.`,
            desc: "สัดส่วนผู้ป่วยที่จำหน่ายออกจากโรงพยาบาลก่อนเวลา 12.00 น. · ส่งผลโดยตรงต่อการปล่อยเตียงว่างเพื่อรับผู้ป่วยรายใหม่ · ค่าสูงแสดงถึงการจัดการการจำหน่ายที่มีประสิทธิภาพ",
            color: (t.disch_before_noon_pct ?? 0) >= 50 ? "#10b981" : (t.disch_before_noon_pct ?? 0) >= 30 ? "#f59e0b" : "#f43f5e",
            problem: (t.disch_before_noon_pct ?? 0) >= 50 ? `ค่าที่วัดได้ ${t.disch_before_noon_pct}% อยู่ในเกณฑ์ดีเยี่ยม (≥ 50%) เตียงว่างสามารถรองรับผู้ป่วยรายใหม่ได้ตั้งแต่ช่วงบ่ายวันเดียวกัน ช่วยลดเวลาค้างเตียงที่ห้องฉุกเฉิน (ER Boarding Time) อย่างมีนัยสำคัญ และเพิ่มอัตราการหมุนเวียนเตียงโดยรวม` : (t.disch_before_noon_pct ?? 0) >= 30 ? `ค่าที่วัดได้ ${t.disch_before_noon_pct}% อยู่ในระดับพอใช้ ยังไม่ถึงเกณฑ์ที่ดี (≥ 50%) ผู้ป่วยส่วนใหญ่ยังจำหน่ายช่วงบ่ายถึงเย็น ทำให้เตียงว่างเฉพาะช่วงค่ำ ผู้ป่วยที่ห้องฉุกเฉินต้องรอรับการย้ายเข้าข้ามวัน ส่งผลต่อประสิทธิภาพการรับผู้ป่วยและการใช้ทรัพยากรของ ER` : `ค่าที่วัดได้ ${t.disch_before_noon_pct}% อยู่ในระดับวิกฤต ผู้ป่วยส่วนใหญ่จำหน่ายหลัง 16.00 น. ส่งผลกระทบรุนแรง ได้แก่ (1) เตียงไม่พร้อมรับผู้ป่วยรายใหม่ในช่วงกลางวัน (2) การค้างเตียงที่ห้องฉุกเฉินเพิ่มสูง (3) อัตราการหมุนเวียนเตียงโดยรวมลดลง (4) ห้องฉุกเฉินแออัด (ER Overcrowding) กระทบความปลอดภัยผู้ป่วย`,
            recommend: (t.disch_before_noon_pct ?? 0) >= 50 ? "ข้อเสนอแนะสำหรับผู้บริหาร : คงระดับที่ดีนี้ไว้ โดยทำการจำหน่ายช่วงเช้าให้เป็นวัฒนธรรมองค์กร และใช้ห้องพักรอจำหน่าย (Discharge Lounge) สำหรับผู้ป่วยที่อยู่ในช่วงรอญาติมารับ · ข้อเสนอแนะสำหรับพยาบาล : รักษามาตรฐานการเตรียมผู้ป่วยและสรุปการรักษาล่วงหน้า 1 วัน พร้อมประสานกับครอบครัวให้มารับผู้ป่วยในช่วงเช้า" : (t.disch_before_noon_pct ?? 0) >= 30 ? "มาตรการเพิ่มการจำหน่ายช่วงเช้า : (1) แพทย์เขียนคำสั่งจำหน่าย (Discharge Order) ก่อน 08.00 น. (2) เภสัชกรจัดยากลับบ้านล่วงหน้า 1 วัน (3) ฝ่ายการเงินเตรียมใบแจ้งหนี้ช่วง 06.00-08.00 น. (4) กำหนดตัวชี้วัดผลงาน : อัตราการจำหน่ายช่วงเช้า ≥ 50% ต่อหอผู้ป่วย (5) จัดอบรมทีมสหวิชาชีพเรื่องการวางแผนจำหน่ายเชิงรุก" : "มาตรการทำทันที : (1) นโยบายบังคับ : แพทย์ตรวจเยี่ยมผู้ป่วย 06.00-07.00 น. และเขียนคำสั่งจำหน่ายก่อน 08.00 น. (2) พยาบาลเตรียมสรุปการรักษาก่อนวันจำหน่าย 1 วัน (3) ตั้งรางวัลจูงใจ (Incentive) สำหรับหอผู้ป่วยที่ทำการจำหน่ายช่วงเช้า ≥ 50% (4) จัดเจ้าหน้าที่ประสานการจำหน่าย (Discharge Coordinator) ประจำทุกชั้น (5) ตั้งเป้าหมาย : ≥ 40% ภายใน 30 วัน",
            drillDownId: "ipd_beds",
            drillDownEndpoint: "/api/ipd/drilldown?type=beds"
          }],
          M = [{
            icon: "🧬",
            label: "ดัชนีความซับซ้อน (Case Mix Index)",
            value: t.cmi ?? "—",
            sub: `Complex (RW≥2) ${t.complex_cases??0} ราย · σ ${t.cmi_stddev??"—"}`,
            desc: "ค่าเฉลี่ยของ Adjusted Relative Weight (adjRW) ที่สะท้อนความซับซ้อนและต้นทุนการรักษาของผู้ป่วย IPD · ใช้เปรียบเทียบระหว่างโรงพยาบาลและเป็นพื้นฐานของการเบิกจ่ายตาม DRG",
            color: "#8b5cf6",
            problem: `ค่า CMI = ${t.cmi??"—"} (ส่วนเบี่ยงเบน σ = ${t.cmi_stddev??"—"}) ${(t.cmi??0)>=1.5?"อยู่ในระดับสูง แสดงว่าผู้ป่วยที่รับรักษามีความซับซ้อนเฉลี่ยสูง ต้องการทรัพยากรการดูแลแบบเข้มข้น (Resource-Intensive Care) เช่น ICU, การผ่าตัดใหญ่ หรือการรักษาที่ต้องใช้เทคโนโลยีชั้นสูง":(t.cmi??0)>=.8?"อยู่ในระดับปานกลาง สะท้อนว่าโครงสร้างผู้ป่วยมีความสมดุลระหว่างเคสซับซ้อนและเคสทั่วไป ทรัพยากรที่ใช้เหมาะสมกับกลุ่มผู้ป่วย":"อยู่ในระดับต่ำ ผู้ป่วยส่วนใหญ่ไม่ซับซ้อน อาจรักษาด้วยบริการผู้ป่วยนอก (OPD) หรือการผ่าตัดแบบไปเช้า-กลับเย็น (Day Surgery) ได้ แทนที่จะใช้เตียงนอน"} · พบผู้ป่วยที่มีความซับซ้อนสูง (RW ≥ 2) จำนวน ${t.complex_cases??0} ราย`,
            recommend: (t.cmi ?? 0) >= 1.5 ? "ข้อเสนอแนะสำหรับผู้บริหาร : (1) วางแผนอัตรากำลังคนให้สอดคล้องกับความซับซ้อน โดยเพิ่มพยาบาลวิชาชีพ (2) จัดทีมสหวิชาชีพดูแลผู้ป่วยซับซ้อนทุกราย (3) ใช้ค่า CMI เจรจาปรับอัตราการเบิกจ่ายตาม DRG ให้สอดคล้องกับต้นทุนจริง (4) เพิ่มสัดส่วนเตียงหอผู้ป่วยวิกฤต (ICU) · ข้อเสนอแนะสำหรับพยาบาล : ประเมินอัตราส่วนพยาบาลต่อผู้ป่วย (Nurse-to-Patient Ratio) ให้เหมาะสมกับความรุนแรง ไม่ควรเกิน 1:4 สำหรับผู้ป่วยซับซ้อน" : "ข้อเสนอแนะ : (1) ทบทวนเกณฑ์การรับผู้ป่วยเข้านอน (Admission Criteria) เพื่อลดการรับผู้ป่วยที่ไม่จำเป็น (2) ขยายบริการผ่าตัดแบบไปเช้า-กลับเย็น (Day Surgery) และหน่วยตรวจเคลื่อนที่ (Ambulatory Care) (3) ปรับปรุงการลงรหัส DRG ให้ครบถ้วน สะท้อนความรุนแรงจริง (4) พิจารณาจัดตั้งหอผู้ป่วยระยะกึ่งเฉียบพลัน (Sub-acute Ward) สำหรับผู้ป่วยความรุนแรงต่ำที่ต้องนอนนาน",
            drillDownId: "ipd_cmi",
            drillDownEndpoint: "/api/ipd/drilldown?type=cmi"
          }, {
            icon: "💀",
            label: "อัตราการเสียชีวิต (Mortality Rate)",
            value: `${t.mortality_rate??0}%`,
            sub: `${t.deaths_30d??0}/${t.mortality_total_dch??0} ราย · 30 วัน`,
            desc: "ตัวชี้วัดคุณภาพการรักษาที่สำคัญที่สุดตามมาตรฐาน HA และ JCI · คำนวณจาก จำนวนผู้ป่วยที่เสียชีวิตในโรงพยาบาล ÷ จำนวนผู้ป่วยที่จำหน่ายทั้งหมด ในช่วง 30 วัน · ค่าต่ำแสดงถึงคุณภาพการดูแลที่ดี",
            color: (t.mortality_rate ?? 0) < 2 ? "#10b981" : (t.mortality_rate ?? 0) < 5 ? "#f59e0b" : "#f43f5e",
            problem: (t.mortality_rate ?? 0) < 2 ? `ค่าที่วัดได้ ${t.mortality_rate}% อยู่ในเกณฑ์ดี (มาตรฐาน HA < 2%) สะท้อนว่าระบบเฝ้าระวังภาวะวิกฤตเบื้องต้น (Early Warning System) และการดูแลรักษาทางคลินิกมีประสิทธิภาพ ทีมแพทย์และพยาบาลสามารถระบุและจัดการผู้ป่วยที่มีความเสี่ยงได้ทันเวลา` : (t.mortality_rate ?? 0) < 5 ? `ค่าที่วัดได้ ${t.mortality_rate}% (จำนวน ${t.deaths_30d} ราย) สูงกว่ามาตรฐาน HA (< 2%) จำเป็นต้องทบทวนคุณภาพการรักษาในประเด็นสำคัญ ได้แก่ (1) การเสียชีวิตมาจากสาเหตุที่สามารถป้องกันได้ (Preventable Cause) หรือไม่ (2) มีการรักษาล่าช้า (Delayed Treatment) เช่น การให้ยาปฏิชีวนะในผู้ป่วยภาวะพิษเหตุติดเชื้อ (Sepsis) ช้ากว่า 1 ชั่วโมง หรือไม่ (3) ระบบเฝ้าระวังอาการ (Early Warning Score) ทำงานมีประสิทธิภาพหรือไม่` : `ค่าที่วัดได้ ${t.mortality_rate}% อยู่ในระดับวิกฤต เกินมาตรฐาน HA (< 2%) มาก ต้องตรวจสอบคุณภาพการรักษาเร่งด่วน ความเสี่ยงสำคัญ ได้แก่ (1) ถูกสถาบันรับรองคุณภาพสถานพยาบาล (สรพ.) ตรวจประเมินพิเศษ กระทบการต่ออายุการรับรอง (2) ภาพลักษณ์โรงพยาบาลเสียหาย ผู้ป่วยลดลง (3) เพิ่มความเสี่ยงต่อการถูกฟ้องร้องทางการแพทย์ (Malpractice) (4) กระทบขวัญกำลังใจของบุคลากร`,
            recommend: (t.mortality_rate ?? 0) < 2 ? "ข้อเสนอแนะ : คงมาตรฐานที่ดีนี้ไว้ โดย (1) จัดประชุมทบทวนการเสียชีวิตและภาวะแทรกซ้อน (Mortality and Morbidity Conference) ทุกเดือน (2) ใช้ระบบเฝ้าระวังอาการ Modified Early Warning Score (MEWS) หรือ National Early Warning Score (NEWS) ในทุกหอผู้ป่วย (3) พัฒนาบุคลากรอย่างต่อเนื่อง โดยเฉพาะทักษะการกู้ชีพ (CPR/ACLS)" : (t.mortality_rate ?? 0) < 5 ? "มาตรการลดอัตราการเสียชีวิต : (1) บังคับวิเคราะห์สาเหตุราก (Root Cause Analysis) ทุกรายที่เสียชีวิต (2) นำระบบ Modified Early Warning Score (MEWS) มาใช้ในทุกหอผู้ป่วย (3) จัดตั้งทีมตอบสนองฉุกเฉิน (Rapid Response Team) พร้อมให้บริการ 24 ชั่วโมง (4) ทบทวนแนวทางการรักษาภาวะพิษเหตุติดเชื้อ (Sepsis Protocol) และเวลาให้ยาปฏิชีวนะครั้งแรก (Door-to-Antibiotic Time) ให้ภายใน 1 ชั่วโมง (5) ประชุม M&M Conference ทุกสัปดาห์" : "มาตรการวิกฤต : (1) จัดตั้งคณะกรรมการทบทวนการเสียชีวิต (Mortality Review Board) ทันที (2) ตรวจสอบ 100% ของการเสียชีวิตทุกราย (3) ฝึกอบรมใหม่ทักษะการช่วยชีวิตขั้นสูง (ACLS) ในทุกหอผู้ป่วย (4) กำหนดเกณฑ์ย้ายเข้า ICU ตั้งแต่เริ่มมีสัญญาณเสื่อมถอย (Early ICU Admission) (5) รายงานผู้บริหารรายสัปดาห์ โดยแยกกลุ่มการเสียชีวิตที่สามารถป้องกันได้ (Preventable Deaths) ตาม DRG (6) ตั้งเป้าหมาย : ลดให้ต่ำกว่า 3% ภายใน 60 วัน",
            drillDownId: "ipd_mortality",
            drillDownEndpoint: "/api/ipd/drilldown?type=mortality"
          }, {
            icon: "🎯",
            label: "ความรุนแรงผู้ป่วย (Current Acuity)",
            value: t.current_acuity ?? "—",
            sub: `🔴 ${t.high_acuity_count??0} · 🟡 ${t.medium_acuity_count??0} · 🟢 ${t.low_acuity_count??0}`,
            desc: "ค่า adjRW เฉลี่ยของผู้ป่วยที่กำลังนอนรักษาอยู่ ใช้วัดภาระงานของบุคลากร (Workload Intensity) · ค่าสูงหมายถึงผู้ป่วยมีความซับซ้อน ต้องการการดูแลเข้มข้น",
            color: (t.current_acuity ?? 0) >= 2 ? "#f43f5e" : (t.current_acuity ?? 0) >= 1 ? "#f59e0b" : "#10b981",
            problem: (t.current_acuity ?? 0) >= 2 ? `ค่าที่วัดได้ ${t.current_acuity} อยู่ในระดับสูงมาก ผู้ป่วยที่นอนอยู่มีความซับซ้อนสูง โดยมีผู้ป่วยกลุ่มความรุนแรงสูง ${t.high_acuity_count??0} ราย ส่งผลให้ภาระงานของบุคลากรเพิ่มสูง เพิ่มความเสี่ยงต่อภาวะหมดไฟ (Burnout) และความคลาดเคลื่อนทางการแพทย์ (Medical Error) จำเป็นต้องปรับอัตรากำลังคนให้เหมาะสมโดยเร่งด่วน` : (t.current_acuity ?? 0) >= 1 ? `ค่าที่วัดได้ ${t.current_acuity} อยู่ในระดับปานกลาง สะท้อนความสมดุลระหว่างผู้ป่วยซับซ้อนและผู้ป่วยทั่วไป ทีมพยาบาลยังจัดการได้ แต่ต้องติดตามอัตราส่วนพยาบาลต่อผู้ป่วย (Staff Ratio) อย่างใกล้ชิด เพื่อรองรับการเปลี่ยนแปลงของภาระงาน` : `ค่าที่วัดได้ ${t.current_acuity} อยู่ในระดับต่ำ ผู้ป่วยส่วนใหญ่ไม่ซับซ้อน อาจพิจารณาย้ายไปหอผู้ป่วยระยะฟื้นฟู (Step-down Unit) หรือจำหน่ายก่อนเวลา (Early Discharge) เพื่อเพิ่มขีดความสามารถในการรับผู้ป่วยรายใหม่`,
            recommend: (t.current_acuity ?? 0) >= 2 ? "มาตรการเร่งด่วน : (1) ลดอัตราส่วนพยาบาลต่อผู้ป่วยเหลือ 1:4 ทันที (2) เรียกบุคลากรสำรอง (Staff On-call) (3) กำหนดให้แพทย์อาวุโสดูแลผู้ป่วยซับซ้อน (Senior Physician Assignment) (4) เตรียมเตียง ICU สำรองสำหรับการย้ายผู้ป่วยอาการเปลี่ยนแปลง (5) ชะลอการรับผู้ป่วยตามนัดที่ไม่เร่งด่วน (Elective Admission) ชั่วคราว" : (t.current_acuity ?? 0) >= 1 ? "ข้อเสนอแนะ : (1) ตรวจสอบรูปแบบการจัดอัตรากำลัง (Staffing Model) ให้เหมาะสมกับการผสมผสานความรุนแรง (Acuity Mix) (2) นำแนวทางการมอบหมายงานพยาบาลตามความรุนแรง (Acuity-Based Nursing Assignment) มาใช้ (3) ติดตามอัตราส่วนทุกเวรว่ายังเหมาะสมหรือไม่" : "ข้อเสนอแนะ : (1) ทบทวนเกณฑ์การรับผู้ป่วยเข้านอน เพื่อป้องกันการรับที่ไม่จำเป็น (2) พิจารณาจำหน่ายผู้ป่วยที่พร้อมกลับบ้านให้เร็วขึ้น (3) ใช้ขีดความสามารถที่เหลือจัดการฝึกอบรมพัฒนาบุคลากร",
            drillDownId: "ipd_beds",
            drillDownEndpoint: "/api/ipd/drilldown?type=beds"
          }, {
            icon: "👥",
            label: "โครงสร้างผู้ป่วย (Demographics)",
            value: `♂${S}% ♀${100-S}%`,
            sub: `Avg ${t.avg_age??"—"} ปี · 👴 ${t.elderly??0} · 👶 ${t.pediatric??0}`,
            desc: "สัดส่วนเพศและอายุของผู้ป่วย IPD ที่นอนรักษาอยู่ ณ ปัจจุบัน · ใช้วางแผนทรัพยากร บริการเฉพาะกลุ่ม และมาตรฐานการดูแลที่เหมาะสม",
            color: "#0ea5e9",
            problem: `ผู้ป่วย IPD ปัจจุบัน ประกอบด้วย ชาย ${S}% และหญิง ${100-S}% อายุเฉลี่ย ${t.avg_age??"—"} ปี · มีผู้สูงอายุ (อายุ ≥ 60 ปี) จำนวน ${t.elderly??0} ราย และเด็ก (อายุ < 15 ปี) จำนวน ${t.pediatric??0} ราย${(t.elderly??0)>g*.5?" · สัดส่วนผู้สูงอายุสูงกว่าครึ่งของผู้ป่วยทั้งหมด ซึ่งกลุ่มนี้มีความเสี่ยงต่อการเกิดภาวะแทรกซ้อน เช่น การพลัดตก หลงลืม (Delirium) แผลกดทับ และการติดเชื้อ จำเป็นต้องมีการดูแลแบบผู้สูงอายุเชิงรุก":" · สัดส่วนผู้ป่วยสมดุลดี"}`,
            recommend: (t.elderly ?? 0) > g * .5 ? "มาตรการดูแลผู้สูงอายุเชิงรุก : (1) ประเมินสภาพผู้สูงอายุอย่างครอบคลุม (Comprehensive Geriatric Assessment) ตั้งแต่วันแรกที่รับเข้านอน (2) ใช้แนวทางป้องกันการพลัดตก (Fall Prevention Protocol) ในทุกหอผู้ป่วย (3) คัดกรองภาวะสับสนเฉียบพลัน (Delirium Screening) ทุกวัน (4) จัดทีมการดูแลแบบประคับประคอง (Palliative Care Team) สำหรับผู้ป่วยระยะสุดท้าย (5) เพิ่มกายภาพบำบัดทุกราย เพื่อป้องกันกล้ามเนื้อลีบจากการนอนนาน" : "ข้อเสนอแนะ : (1) ดูแลกลุ่มเสี่ยงเป็นพิเศษ ได้แก่ ผู้สูงอายุและเด็กเล็ก (2) จัดสรรทรัพยากรตามการกระจายอายุของผู้ป่วย (3) วางแผนการจำหน่ายโดยคำนึงถึงการสนับสนุนทางสังคม (Social Support) ของผู้สูงอายุเป็นสำคัญ"
          }],
          se = [{
            icon: "💰",
            label: "รายได้/เตียง-วัน (Rev per Bed-Day)",
            value: `฿${(t.rev_per_bed_day??0).toLocaleString()}`,
            sub: `${(t.total_bed_days??0).toLocaleString()} เตียง-วัน · 30 วัน`,
            desc: "รายได้เฉลี่ยต่อ 1 เตียง-วัน (Bed-Day) · เป็นตัวชี้วัดมูลค่าที่สร้างจากการใช้ทรัพยากรเตียง · คำนวณจาก รายได้ IPD ทั้งหมด ÷ จำนวนเตียง-วันที่ใช้จริง · ค่าสูงแสดงว่าใช้เตียงสร้างมูลค่าได้ดี",
            color: "#0ea5e9",
            problem: (t.rev_per_bed_day ?? 0) >= 3e3 ? `ค่าที่วัดได้ ฿${(t.rev_per_bed_day??0).toLocaleString()} ต่อเตียง-วัน อยู่ในเกณฑ์ดี (เกณฑ์ ≥ 3,000 บาท) สะท้อนว่ามีการผสมผสานโรค (Case Mix) ที่เหมาะสม และการบันทึกค่าบริการ (Billing) ครบถ้วน ไม่มีการตกหล่นของรายการที่ควรจะเบิกจ่ายได้` : `ค่าที่วัดได้ ฿${(t.rev_per_bed_day??0).toLocaleString()} ต่อเตียง-วัน ต่ำกว่าเกณฑ์ (≥ 3,000 บาท) สาเหตุที่พบบ่อย ได้แก่ (1) การลงรหัสโรคไม่ครบถ้วน (Under-coding) ทำให้ adjRW ต่ำกว่าที่ควรได้ (2) ผู้ป่วยนอนนานแต่ไม่ซับซ้อน (Long-stay Low-acuity) (3) การบันทึกค่าใช้จ่ายตกหล่น (Missed Charges) เช่น ยา เครื่องมือแพทย์ หัตถการ ต้องตรวจสอบการรั่วไหลของรายได้ (Revenue Leakage) โดยเร่งด่วน`,
            recommend: (t.rev_per_bed_day ?? 0) >= 3e3 ? "ข้อเสนอแนะ : ทำการเปรียบเทียบ (Benchmark) ระหว่างหอผู้ป่วย เพื่อค้นหาหอผู้ป่วยที่มีค่ารายได้ต่อเตียง-วันต่ำกว่าค่าเฉลี่ย และวิเคราะห์สาเหตุเพื่อปรับปรุง" : "มาตรการเพิ่มรายได้ต่อเตียง-วัน : (1) ตรวจสอบคุณภาพการลงรหัส DRG (DRG Coding Audit) เพื่อค้นหาเคสที่ลงรหัสไม่ครบ (2) ตรวจสอบการบันทึกค่าใช้จ่ายของทุกหอผู้ป่วยรายสัปดาห์ (Weekly Missing Charges Audit) (3) ลดระยะเวลานอน (LOS) ผ่านการใช้แนวทางเวชปฏิบัติ (Clinical Pathway) (4) ขยายการผ่าตัดแบบไปเช้า-กลับเย็น (Day Surgery) และการผ่าตัดแบบแผลเล็ก (Minimally Invasive Surgery) เพื่อลดจำนวนเตียง-วันที่ไม่จำเป็น",
            drillDownId: "finance_revenue",
            drillDownEndpoint: "/api/finance/drilldown?type=revenue"
          }, {
            icon: "💵",
            label: "รายได้/Discharge (Rev per Case)",
            value: `฿${(t.rev_per_discharge??0).toLocaleString()}`,
            sub: `σ ฿${(t.rev_stddev??0).toLocaleString()} · Max ฿${(t.max_charge??0).toLocaleString()}`,
            desc: "รายได้เฉลี่ยต่อผู้ป่วย 1 ราย ที่จำหน่ายออก · วัดประสิทธิภาพการสร้างรายได้ต่อเคส · คำนวณจาก รายได้ IPD ทั้งหมด ÷ จำนวนผู้ป่วยที่จำหน่าย · ค่าส่วนเบี่ยงเบน σ สะท้อนความผันผวนของรายได้ระหว่างเคส",
            color: "#10b981",
            problem: `ค่าที่วัดได้ ฿${(t.rev_per_discharge??0).toLocaleString()} ต่อการจำหน่ายหนึ่งครั้ง (ส่วนเบี่ยงเบน σ = ฿${(t.rev_stddev??0).toLocaleString()}) ${(t.rev_stddev??0)>(t.rev_per_discharge??1)*1.5?"ส่วนเบี่ยงเบนสูงมาก แสดงว่ารายได้ต่อเคสผันผวนสูง มีเคสที่รายได้สูงผิดปกติ (Outlier) จำนวนมาก ควรตรวจสอบเคสที่มีค่ารักษาสูงเป็นพิเศษ (Top 10%) และเคสที่ต่ำผิดปกติ (Bottom 10%) เพื่อหาสาเหตุ":"การกระจายรายได้ค่อนข้างสม่ำเสมอ แสดงว่ามาตรฐานการรักษาและการคิดค่าบริการมีความคงที่"}`,
            recommend: "มาตรการเพิ่มประสิทธิภาพรายได้ต่อเคส : (1) วิเคราะห์เคสที่มีค่ารักษาสูงและต่ำผิดปกติ (Top/Bottom 10%) เพื่อหาสาเหตุ (2) ตรวจสอบเคสที่มีรายได้ต่ำผิดปกติ อาจมีการตกหล่นของค่าใช้จ่ายที่ควรเบิกได้ (3) เพิ่มรายได้จากหัตถการและการแทรกแซงทางการแพทย์ (Procedure-Based Revenue) เช่น ห้องผ่าตัด การสวนหัวใจ (4) ลดจำนวนเตียง-วันที่ไม่สร้างคุณค่า (Non-Value-Added Bed-Days) โดยการจำหน่ายผู้ป่วยที่พร้อมกลับบ้านให้รวดเร็ว",
            drillDownId: "finance_revenue",
            drillDownEndpoint: "/api/finance/drilldown?type=revenue"
          }, {
            icon: "⚠️",
            label: "ผลกระทบนอนเกิน (Overstay Impact)",
            value: `฿${(t.overstay_impact_thb??0).toLocaleString()}`,
            sub: `${t.overstay_count??0} ราย · +${t.avg_excess_days??0}d (${t.overstay_pct??0}%)`,
            desc: "ประมาณการมูลค่าความเสียโอกาส (Opportunity Cost) จากการที่ผู้ป่วยนอนเกินมาตรฐาน DRG · คำนวณจาก จำนวนวันนอนส่วนเกิน × รายได้เฉลี่ยต่อเตียง-วัน · สะท้อนผลกระทบต่อการรับผู้ป่วยรายใหม่",
            color: (t.overstay_pct ?? 0) < 10 ? "#10b981" : (t.overstay_pct ?? 0) < 20 ? "#f59e0b" : "#f43f5e",
            problem: (t.overstay_pct ?? 0) < 10 ? `อัตราการนอนเกิน ${t.overstay_pct}% (จำนวน ${t.overstay_count??0} ราย) อยู่ในเกณฑ์ที่ยอมรับได้ (< 10%) ผลกระทบต่อการบริหารเตียงต่ำ แสดงว่าระบบวางแผนจำหน่ายทำงานมีประสิทธิภาพ` : (t.overstay_pct ?? 0) < 20 ? `อัตราการนอนเกิน ${t.overstay_pct}% (จำนวน ${t.overstay_count??0} ราย เฉลี่ย ${t.avg_excess_days??0} วันต่อราย) สูงกว่าเกณฑ์ มูลค่าความเสียโอกาสประมาณ ฿${(t.overstay_impact_thb??0).toLocaleString()} เตียงถูกใช้โดยผู้ป่วยที่ควรจะจำหน่ายไปแล้ว ส่งผลให้ผู้ป่วยรายใหม่ต้องรอรับบริการ` : `อัตราการนอนเกิน ${t.overstay_pct}% อยู่ในระดับวิกฤต มีผู้ป่วย ${t.overstay_count??0} รายที่นอนเกินมาตรฐานรวม ${t.avg_excess_days??0} วัน สูญเสียขีดความสามารถในการรับผู้ป่วยคิดเป็นมูลค่าประมาณ ฿${(t.overstay_impact_thb??0).toLocaleString()} ส่งผลกระทบต่อเนื่อง ได้แก่ (1) อัตราการหมุนเวียนเตียงลดลง (2) ผู้ป่วยค้างที่ห้องฉุกเฉินเพิ่มขึ้น (3) การรับผู้ป่วยตามนัดถูกเลื่อน`,
            recommend: (t.overstay_pct ?? 0) < 10 ? "ข้อเสนอแนะ : ติดตามผู้ป่วยที่นอนเกินเป็นรายวัน เพื่อป้องกันไม่ให้อัตราเพิ่มขึ้นเกิน 10%" : "มาตรการลดการนอนเกิน : (1) ติดตั้งระบบแจ้งเตือนแพทย์โดยอัตโนมัติเมื่อผู้ป่วยนอนครบตามมาตรฐาน DRG (LOS Alert System) (2) จัดประชุมวางแผนจำหน่ายประจำวัน (Daily Discharge Planning Meeting) (3) พัฒนากระบวนการจำหน่ายเร่งด่วน (Fast-track Discharge) ให้เสร็จสิ้นภายใน 3 ชั่วโมง ครอบคลุมผลตรวจทางห้องปฏิบัติการ การปรึกษา และการออกใบแจ้งหนี้ (4) จัดนักสังคมสงเคราะห์ช่วยเหลือกรณีรับไว้ด้วยเหตุผลทางสังคม (Social Admission) (5) ตั้งเป้าหมาย : ลดอัตราการนอนเกินให้ต่ำกว่า 10% ภายใน 45 วัน",
            drillDownId: "ipd_alos",
            drillDownEndpoint: "/api/ipd/drilldown?type=alos"
          }, {
            icon: "📊",
            label: "ค้างชำระเฉลี่ย/Case (Avg Unpaid)",
            value: `฿${(t.avg_unpaid??0).toLocaleString()}`,
            sub: `Total RW ${(t.total_rw??0).toLocaleString()} · ${t.cmi_cases??0} ราย`,
            desc: "ค่าเฉลี่ยส่วนต่างระหว่างค่ารักษาที่เรียกเก็บ (Charge) กับเงินที่ได้รับจริง (Paid) ต่อผู้ป่วย 1 ราย · สะท้อนประสิทธิภาพของการเบิกจ่ายและการจัดเก็บรายได้",
            color: Math.abs(t.avg_unpaid ?? 0) < 1e3 ? "#10b981" : "#f59e0b",
            problem: Math.abs(t.avg_unpaid ?? 0) < 1e3 ? `ค่าเฉลี่ยส่วนต่าง ฿${(t.avg_unpaid??0).toLocaleString()} ต่อราย อยู่ในเกณฑ์ดี (HA Benchmark < 1,000 บาท) แสดงว่าอัตราการจัดเก็บ (Collection Rate) อยู่ในระดับดี การเบิกจ่ายเป็นไปตามกำหนดเวลา ไม่มีการปฏิเสธการเบิกจ่าย (Claim Denial) ที่มีนัยสำคัญ` : `ค่าเฉลี่ยส่วนต่าง ฿${(t.avg_unpaid??0).toLocaleString()} ต่อราย สูงเกินเกณฑ์ สาเหตุที่พบบ่อย ได้แก่ (1) การลงรหัส DRG ไม่ครบถ้วน (Under-coding) ทำให้ได้รับเงินเบิกจ่ายต่ำกว่าต้นทุนจริง (2) สิทธิ์ผู้ป่วยไม่ครอบคลุมบริการบางรายการ (3) การเรียกเก็บถูกปฏิเสธ (Claim Denial) จากผู้จ่าย (4) เอกสารประกอบการเบิกจ่ายไม่ครบถ้วน`,
            recommend: Math.abs(t.avg_unpaid ?? 0) < 1e3 ? "ข้อเสนอแนะ : รักษาคุณภาพการลงรหัส DRG และตรวจสอบอัตราการปฏิเสธการเบิกจ่าย (Claim Rejection Rate) เป็นรายเดือน" : "มาตรการลดส่วนต่างค่ารักษา : (1) ปรับปรุงการลงรหัส DRG ให้สะท้อนความรุนแรงจริง (Optimize adjRW) (2) ตรวจสอบอัตราการปฏิเสธการเบิกจ่าย และแก้ไขสาเหตุราก (3) ตรวจสอบสิทธิ์ผู้ป่วยตั้งแต่วันรับเข้านอน (Admission) (4) เพิ่มทีมนักวิชาการเวชระเบียน (Medical Coder) ที่ทำการลงรหัสไปพร้อมกับการรักษา (Concurrent Coding) (5) จัดประชุมกับผู้จ่ายเบี้ย (Payer) กรณีพบการปฏิเสธเป็นระบบ"
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
                  d: `M 18,90 A ${x},${x} 0 0,1 162,90`,
                  fill: "none",
                  stroke: "rgba(203,213,225,.5)",
                  strokeWidth: "14",
                  strokeLinecap: "round"
                }), e.jsx("path", {
                  d: `M 18,90 A ${x},${x} 0 0,1 162,90`,
                  fill: "none",
                  stroke: a,
                  strokeWidth: "14",
                  strokeLinecap: "round",
                  strokeDasharray: `${m} ${I}`,
                  style: {
                    transition: "stroke-dasharray 1s ease"
                  }
                }), e.jsx("text", {
                  x: "90",
                  y: "78",
                  textAnchor: "middle",
                  fontSize: "32",
                  fontWeight: "900",
                  fill: a,
                  fontFamily: "'Outfit',sans-serif",
                  children: r
                }), e.jsx("text", {
                  x: "90",
                  y: "96",
                  textAnchor: "middle",
                  fontSize: "11",
                  fontWeight: "700",
                  fill: "#6b7280",
                  fontFamily: "sans-serif",
                  children: "WEI v2 Score"
                })]
              }), e.jsxs("div", {
                style: {
                  textAlign: "center"
                },
                children: [e.jsx("div", {
                  style: {
                    fontSize: "26px",
                    fontWeight: 900,
                    color: a
                  },
                  children: f
                }), e.jsx("div", {
                  style: {
                    fontSize: "var(--fs-xs)",
                    fontWeight: 700,
                    color: a
                  },
                  children: r >= 80 ? "Ward ประสิทธิภาพสูง" : r >= 60 ? "ระดับมาตรฐาน" : "ต้องปรับปรุง"
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
                  children: "WEI v2 Components"
                }), h.map((o, j) => {
                  const y = o.score >= 70 ? "#10b981" : o.score >= 40 ? "#f59e0b" : "#f43f5e";
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
                        width: "54px",
                        textAlign: "right",
                        flexShrink: 0
                      },
                      children: o.name
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
                          width: `${o.score}%`,
                          height: "100%",
                          background: y,
                          borderRadius: "99px",
                          transition: "width 0.8s ease"
                        }
                      })
                    }), e.jsx("span", {
                      style: {
                        fontSize: "12px",
                        fontWeight: 800,
                        color: y,
                        width: "24px",
                        textAlign: "right"
                      },
                      children: o.score
                    })]
                  }, j)
                })]
              })]
            }), e.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              },
              children: [{
                title: "Operational Efficiency",
                color: "#7c3aed",
                cards: w
              }, {
                title: "Clinical Quality",
                color: "#0ea5e9",
                cards: M
              }, {
                title: "Financial Intelligence",
                color: "#f59e0b",
                cards: se
              }].map((o, j) => e.jsxs("div", {
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
                      background: `linear-gradient(180deg, ${o.color}, ${o.color}99)`,
                      borderRadius: "99px"
                    }
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      color: o.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: o.title
                  })]
                }), e.jsx("div", {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
                    gap: "8px"
                  },
                  children: o.cards.map((y, U) => e.jsxs("div", {
                    onClick: () => y.drillDownId && n(y.drillDownId, y.label, y.drillDownEndpoint),
                    style: {
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: `${y.color}06`,
                      border: `1px solid ${y.color}20`,
                      cursor: y.drillDownId ? "pointer" : "default",
                      transition: "transform 0.2s",
                      transform: G === `${j}-${U}` ? "translateY(-1px)" : "none",
                      boxShadow: G === `${j}-${U}` ? `0 4px 12px ${y.color}20` : "none",
                      minWidth: 0,
                      overflow: "hidden"
                    },
                    onMouseEnter: () => y.drillDownId && oe(`${j}-${U}`),
                    onMouseLeave: () => oe(null),
                    children: [e.jsxs("div", {
                      style: {
                        display: "grid",
                        gridTemplateColumns: "auto 1fr auto",
                        gap: "8px",
                        alignItems: "start"
                      },
                      children: [e.jsx("span", {
                        style: {
                          fontSize: "18px",
                          lineHeight: 1.2
                        },
                        children: y.icon
                      }), e.jsxs("div", {
                        style: {
                          minWidth: 0
                        },
                        children: [e.jsx("p", {
                          style: {
                            margin: 0,
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "var(--md-text-primary)",
                            letterSpacing: "0.01em",
                            lineHeight: 1.3,
                            wordBreak: "break-word"
                          },
                          children: y.label
                        }), e.jsx("p", {
                          style: {
                            margin: "3px 0 0",
                            fontSize: "11px",
                            color: "var(--md-text-tertiary)",
                            fontStyle: "italic",
                            lineHeight: 1.4,
                            wordBreak: "break-word"
                          },
                          children: y.desc
                        })]
                      }), e.jsxs("div", {
                        style: {
                          textAlign: "right",
                          minWidth: 0
                        },
                        children: [e.jsx("p", {
                          style: {
                            margin: 0,
                            fontSize: "18px",
                            fontWeight: 900,
                            color: y.color,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.1,
                            wordBreak: "keep-all"
                          },
                          children: y.value
                        }), e.jsx("p", {
                          style: {
                            margin: "2px 0 0",
                            fontSize: "11px",
                            color: "var(--md-text-tertiary)",
                            fontWeight: 600,
                            lineHeight: 1.3,
                            wordBreak: "break-word"
                          },
                          children: y.sub
                        })]
                      })]
                    }), y.problem && e.jsxs("div", {
                      style: {
                        marginTop: "6px",
                        padding: "5px 10px",
                        borderRadius: "6px",
                        background: "rgba(203,213,225,.04)",
                        borderLeft: `3px solid ${y.color}`
                      },
                      children: [e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          fontWeight: 700,
                          color: y.color,
                          letterSpacing: "0.02em",
                          marginBottom: "3px"
                        },
                        children: "📊 การวิเคราะห์สถานการณ์"
                      }), e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          color: "var(--md-text-secondary)",
                          lineHeight: 1.5,
                          fontWeight: 500
                        },
                        children: y.problem
                      })]
                    }), y.recommend && e.jsxs("div", {
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
                          letterSpacing: "0.02em",
                          marginBottom: "3px"
                        },
                        children: "💡 ข้อเสนอแนะและมาตรการปรับปรุง"
                      }), e.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "12px",
                          color: "var(--md-text-secondary)",
                          lineHeight: 1.5,
                          fontWeight: 500
                        },
                        children: y.recommend
                      })]
                    })]
                  }, U))
                })]
              }, j))
            })]
          }), t.disch_total > 0 && e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
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
                children: "🕐 สัดส่วนเวลาจำหน่าย (30 วัน)"
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem"
                },
                children: [e.jsx(V, {
                  width: "55%",
                  height: 130,
                  children: e.jsxs(Ue, {
                    children: [e.jsx(Ke, {
                      data: [{
                        name: "ก่อนเที่ยง",
                        value: t.disch_before_noon || 0,
                        fill: "#10b981"
                      }, {
                        name: "บ่าย (12-16)",
                        value: t.disch_afternoon || 0,
                        fill: "#f59e0b"
                      }, {
                        name: "เย็น (16+)",
                        value: t.disch_evening || 0,
                        fill: "#f43f5e"
                      }],
                      dataKey: "value",
                      cx: "50%",
                      cy: "50%",
                      innerRadius: 32,
                      outerRadius: 55,
                      paddingAngle: 3
                    }), e.jsx(Q, {
                      contentStyle: {
                        background: "#fff",
                        border: "1px solid #e8eaf2",
                        borderRadius: "10px",
                        fontSize: "12px"
                      },
                      formatter: (o, j) => [`${o} ราย`, j]
                    })]
                  })
                }), e.jsx("div", {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    flex: 1
                  },
                  children: [{
                    label: "ก่อนเที่ยง",
                    value: t.disch_before_noon || 0,
                    color: "#10b981"
                  }, {
                    label: "บ่าย (12-16)",
                    value: t.disch_afternoon || 0,
                    color: "#f59e0b"
                  }, {
                    label: "เย็น (16+)",
                    value: t.disch_evening || 0,
                    color: "#f43f5e"
                  }].map((o, j) => e.jsxs("div", {
                    style: {
                      display: "flex",
                      alignItems: "center",
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
                          background: o.color
                        }
                      }), e.jsx("span", {
                        style: {
                          fontSize: "var(--fs-xs)",
                          fontWeight: 600,
                          color: "var(--md-text-secondary)"
                        },
                        children: o.label
                      })]
                    }), e.jsx("span", {
                      style: {
                        fontSize: "var(--fs-sm)",
                        fontWeight: 800,
                        color: o.color
                      },
                      children: o.value
                    })]
                  }, j))
                })]
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
                children: "📅 รูปแบบการ Admit รายวัน (90 วัน)"
              }), e.jsx(V, {
                width: "100%",
                height: 130,
                children: e.jsxs(ne, {
                  data: t.dow_pattern || [],
                  margin: {
                    top: 4,
                    right: 8,
                    bottom: 0,
                    left: 0
                  },
                  children: [e.jsx(J, {
                    strokeDasharray: "3 3",
                    stroke: "rgba(203,213,225,.3)",
                    vertical: !1
                  }), e.jsx(Z, {
                    dataKey: "day",
                    tick: {
                      fill: "#6b7280",
                      fontSize: 10,
                      fontWeight: 700
                    },
                    axisLine: !1,
                    tickLine: !1
                  }), e.jsx(ee, {
                    tick: {
                      fill: "#9ca3af",
                      fontSize: 10
                    },
                    axisLine: !1,
                    tickLine: !1,
                    width: 28
                  }), e.jsx(Q, {
                    contentStyle: {
                      background: "#fff",
                      border: "1px solid #e8eaf2",
                      borderRadius: "10px",
                      fontSize: "12px"
                    },
                    formatter: (o, j) => j === "total" ? [`${o} ราย`, "Admissions (90d)"] : [`${o} วัน`, "ALOS เฉลี่ย"]
                  }), e.jsx(O, {
                    dataKey: "total",
                    radius: [4, 4, 0, 0],
                    barSize: 22,
                    children: (t.dow_pattern || []).map((o, j) => {
                      const y = o.dow === 1 || o.dow === 7;
                      return e.jsx(fe, {
                        fill: y ? "#f59e0b" : "#7c3aed"
                      }, j)
                    })
                  })]
                })
              })]
            })]
          }), c.length > 0 && e.jsxs("div", {
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
              children: "📈 แนวโน้มรับ/จำหน่าย 7 วันล่าสุด"
            }), e.jsx(V, {
              width: "100%",
              height: 130,
              children: e.jsxs(We, {
                data: c,
                margin: {
                  top: 4,
                  right: 8,
                  bottom: 0,
                  left: 0
                },
                children: [e.jsx(J, {
                  strokeDasharray: "3 3",
                  stroke: "rgba(203,213,225,.4)",
                  vertical: !1
                }), e.jsx(Z, {
                  dataKey: "date",
                  tick: {
                    fill: "#6b7280",
                    fontSize: 10,
                    fontWeight: 700
                  },
                  axisLine: !1,
                  tickLine: !1
                }), e.jsx(ee, {
                  tick: {
                    fill: "#9ca3af",
                    fontSize: 10
                  },
                  axisLine: !1,
                  tickLine: !1,
                  width: 28
                }), e.jsx(Q, {
                  contentStyle: {
                    background: "#fff",
                    border: "1px solid #e8eaf2",
                    borderRadius: "12px",
                    fontSize: "12px"
                  }
                }), e.jsx(Ye, {
                  type: "monotone",
                  dataKey: "รับใหม่",
                  stroke: "#7c3aed",
                  fill: "rgba(124,58,237,.1)",
                  strokeWidth: 2,
                  dot: {
                    r: 3,
                    fill: "#7c3aed"
                  }
                }), e.jsx(ze, {
                  type: "monotone",
                  dataKey: "จำหน่าย",
                  stroke: "#10b981",
                  strokeWidth: 2,
                  dot: {
                    r: 3,
                    fill: "#10b981"
                  }
                })]
              })
            })]
          }), (t.high_acuity_count > 0 || t.medium_acuity_count > 0 || t.low_acuity_count > 0) && e.jsxs("div", {
            style: {
              borderTop: "1px solid var(--md-border)",
              paddingTop: "0.75rem"
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
              children: "🎯 Acuity Distribution (ผู้ป่วยปัจจุบัน)"
            }), e.jsx("div", {
              style: {
                display: "flex",
                gap: "3px",
                height: "12px",
                borderRadius: "99px",
                overflow: "hidden"
              },
              children: [{
                c: t.high_acuity_count || 0,
                color: "#f43f5e",
                label: "สูง (RW≥2)"
              }, {
                c: t.medium_acuity_count || 0,
                color: "#f59e0b",
                label: "กลาง (RW 1-2)"
              }, {
                c: t.low_acuity_count || 0,
                color: "#10b981",
                label: "ต่ำ (RW<1)"
              }].filter(o => o.c > 0).map((o, j) => e.jsx("div", {
                title: `${o.label}: ${o.c} ราย`,
                style: {
                  flex: o.c,
                  background: o.color,
                  borderRadius: "99px",
                  transition: "flex 0.8s ease"
                }
              }, j))
            }), e.jsx("div", {
              style: {
                display: "flex",
                gap: "1rem",
                marginTop: "6px",
                flexWrap: "wrap"
              },
              children: [{
                c: t.high_acuity_count || 0,
                color: "#f43f5e",
                label: "สูง (RW≥2)"
              }, {
                c: t.medium_acuity_count || 0,
                color: "#f59e0b",
                label: "กลาง (RW 1-2)"
              }, {
                c: t.low_acuity_count || 0,
                color: "#10b981",
                label: "ต่ำ (RW<1)"
              }].map((o, j) => e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                },
                children: [e.jsx("div", {
                  style: {
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: o.color
                  }
                }), e.jsx("span", {
                  style: {
                    fontSize: "var(--fs-xs)",
                    fontWeight: 600,
                    color: "var(--md-text-secondary)"
                  },
                  children: o.label
                }), e.jsxs("span", {
                  style: {
                    fontSize: "var(--fs-xs)",
                    fontWeight: 800,
                    color: o.color
                  },
                  children: [o.c, " ราย"]
                })]
              }, j))
            })]
          })]
        })
      })()
    }), !i.ipdAnalytics && P && (() => {
      const t = P || {},
        r = t.wei ?? 0,
        a = re?.occupancy_rate ?? 0,
        f = re?.total_beds ?? 0,
        x = re?.occupied ?? 0,
        I = f - x,
        m = t.bed_turnover_rate ?? 0,
        u = t.alos_variance_pct ?? 0,
        h = t.actual_alos ?? 0,
        c = t.benchmark_alos ?? 0,
        g = t.readmit_rate ?? 0,
        S = t.readmit_count ?? 0,
        w = t.disch_before_noon_pct ?? 0,
        M = t.mortality_rate ?? 0,
        se = t.deaths_30d ?? 0,
        o = t.current_acuity ?? 0,
        j = t.high_acuity_count ?? 0,
        y = t.medium_acuity_count ?? 0,
        U = t.low_acuity_count ?? 0,
        K = t.overstay_pct ?? 0,
        ce = t.overstay_count ?? 0,
        pe = t.avg_excess_days ?? 0,
        je = t.overstay_impact_thb ?? 0,
        ie = t.rev_per_bed_day ?? 0,
        q = t.avg_unpaid ?? 0,
        Se = t.cmi ?? 0,
        _e = t.elderly ?? 0,
        we = t.avg_age ?? 0,
        C = [];
      if (a > 80 || m < 2) {
        const s = a > 90 || m < 1.5;
        C.push({
          priority: 1,
          severity: s ? "critical" : "warning",
          title: `🔴 Bed Capacity Crisis: Occupancy ${a}% + Turnover เพียง ${m}x`,
          rootCause: `อัตราครองเตียง ${a}% (${x}/${f} เตียง, ว่างเพียง ${I} เตียง) ${a>90?"— เกินวิกฤต!":"— ใกล้เต็ม"} ขณะเดียวกัน Bed Turnover = ${m}x/เดือน (Benchmark ≥3x) ── สาเหตุที่แท้จริง: (1) ผู้ป่วยนอนนานเกินมาตรฐาน DRG → ALOS Variance = ${u>0?"+":""}${u}% (2) Discharge Planning ไม่มีประสิทธิภาพ — เพียง ${w}% จำหน่ายก่อนเที่ยง (3) Overstay ${K}% (${ce} ราย เกินเฉลี่ย ${pe} วัน) กินเตียงที่ควรว่าง (4) ไม่มีระบบ Step-down/Intermediate care → ผู้ป่วยพ้นวิกฤตยังอยู่ ward เดิม`,
          cascadeEffect: `ผลกระทบลูกโซ่ร้ายแรง: เตียงเต็ม → ER Boarding Time เพิ่มขึ้น (ผู้ป่วย ER รอ admit ข้ามวัน) → Elective surgery ถูกเลื่อน → รายได้สูญเสีย → Staff workload สูง + Burnout → ความผิดพลาดทางการแพทย์เพิ่มขึ้น ● Overstay opportunity cost ≈ ฿${je.toLocaleString()}/เดือน`,
          fixFirst: "🔧 ด่วนที่สุด: (1) Daily Bed Management Huddle เช้า-บ่าย — Review ทุกรายที่นอน ≥ DRG standard (2) Morning Discharge Protocol: แพทย์เขียน D/C order ก่อน 08:00 น. → ปลดปล่อยเตียงก่อนเที่ยง (3) Discharge Lounge: ย้ายผู้ป่วยรอกลับบ้านออกจาก ward → เตียงว่างทันที (4) Fast-track Social admit cases → ส่ง Home Health Care / Intermediate care (5) เป้าหมาย: Occupancy ≤85% + Turnover ≥3x ภายใน 45 วัน",
          color: s ? "#f43f5e" : "#f59e0b"
        })
      }
      if (Math.abs(u) > 15 || K > 15) {
        const s = Math.abs(u) > 25 || K > 25;
        C.push({
          priority: 2,
          severity: s ? "critical" : "warning",
          title: `🔴 LOS Overrun: ALOS Variance ${u>0?"+":""}${u}% + Overstay ${K}%`,
          rootCause: `ALOS จริง = ${h} วัน vs มาตรฐาน DRG = ${c} วัน (Variance ${u>0?"+":""}${u}%) ── Overstay ${ce} ราย (${K}%) นอนเกินเฉลี่ย ${pe} วัน ── สาเหตุลึก: (1) ไม่มี Clinical Pathway ที่ชัดเจนตาม DRG — ทำให้แพทย์แต่ละคนวางแผนต่างกัน (2) Delayed investigation: รอ Lab/Imaging/Consult นาน (3) Complication ในช่วง admit ← Infection control? Surgical technique? (4) Social barriers: ไม่มีญาติรับ, ผู้สูงอายุอยู่คนเดียว, รอ Hospice placement`,
          cascadeEffect: `ผลกระทบ: ทุก 1 วันที่ผู้ป่วยนอนเกิน DRG = ฿${ie.toLocaleString()} bed-day cost แต่ DRG reimbursement ไม่เพิ่ม → Financial loss ● Overstay ${ce} ราย × ${pe} วัน × ฿${ie.toLocaleString()} = ฿${je.toLocaleString()} opportunity cost/เดือน ● เตียงถูกครอบครอง → Turnover ต่ำ (${m}x) → Occupancy สูง (${a}%) → ER Boarding สูงขึ้น`,
          fixFirst: "🔧 ต้องแก้ก่อน: (1) ตั้ง LOS Alert อัตโนมัติ: เมื่อ LOS ≥ DRG standard → แจ้งแพทย์ + Discharge Planning Team ทันที (2) ทำ Clinical Pathway Top 10 DRGs — กำหนด Milestone Day 1/3/5/7 ชัดเจน (3) Multidisciplinary Team Round ทุก 48 ชม. สำหรับผู้ป่วยนอนเกิน (4) Social Worker ทำ Discharge assessment ตั้งแต่ Day 1 — ไม่ต้องรอถึงวัน D/C (5) เป้าหมาย: Variance ≤±10% + Overstay <10% ภายใน 60 วัน",
          color: s ? "#f43f5e" : "#f59e0b"
        })
      }
      if (w < 40) {
        const s = w < 25;
        C.push({
          priority: 3,
          severity: s ? "critical" : "warning",
          title: `🟡 Discharge ช้า: เพียง ${w}% จำหน่ายก่อนเที่ยง (เฉลี่ย ${t.avg_dch_hour??"—"} น.)`,
          rootCause: `${100-w}% ของผู้ป่วยถูกจำหน่ายช่วงบ่าย-เย็น ← หมายความว่าเตียงว่างเฉพาะช่วงค่ำ-ดึก ── สาเหตุลึก: (1) แพทย์ round ช้า (หลัง 10:00 น.) → เขียน D/C order บ่าย (2) Pharmacy จัดยากลับบ้านหลังจากได้ D/C order → ใช้เวลา 1-2 ชม. (3) Finance ออก Bill ช้า — รอ coding review + ตรวจสอบสิทธิ์ (4) ผู้ป่วย/ญาติไม่พร้อม — ไม่ได้แจ้ง D/C plan ล่วงหน้า`,
          cascadeEffect: 'เตียงว่างค่ำ → ผู้ป่วยใหม่จาก ER ต้องรอ admit ทั้งวัน → ER Overcrowding → Boarding time สูงขึ้น → ER mortality risk เพิ่ม ● Bed Turnover ลด → เตียงหมุนเวียนไม่ทัน demand → Elective surgery ถูก cancel → Revenue loss ● เตียงว่างค่ำ = เตียง "เสียเปล่า" ครึ่งวัน',
          fixFirst: "🔧 Quick Win สูง: (1) Policy: แพทย์ round 06:00-07:30 น. — เขียน D/C Order ก่อน 08:00 (2) Anticipatory Discharge: Nurse เตรียม Discharge Summary + Medication list ก่อน 1 วัน (3) Pharmacy: Pre-pack ยากลับบ้านก่อน D/C 1 วัน (ยาเดิม + ยาใหม่) (4) Finance: Bill preparation ตั้งแต่ 06:00 น. (5) ตั้ง Incentive: Ward ที่ Morning D/C ≥50% → ได้ performance points (6) เป้าหมาย: ≥50% Morning D/C ภายใน 30 วัน",
          color: s ? "#f43f5e" : "#f59e0b"
        })
      }
      if (g > 5) {
        const s = g > 10;
        C.push({
          priority: 4,
          severity: s ? "critical" : "warning",
          title: `🟡 Readmission 30d: ${g}% (${S} ราย) — สูงกว่า HA Benchmark 5%`,
          rootCause: `${g}% ของผู้ป่วยที่ Discharge กลับมา Admit ซ้ำภายใน 30 วัน ── สาเหตุลึก: (1) Premature Discharge: ปล่อยผู้ป่วยเร็วเกินไป อาการยังไม่คงที่ (2) Post-discharge care gap: ไม่มี follow-up call, ไม่มี Home Health Care visit (3) Discharge instruction ไม่ชัดเจน: ผู้ป่วย/ญาติไม่เข้าใจวิธีดูแลตัวเองที่บ้าน (4) Complication ที่ไม่ได้ป้องกัน: Infection, Drug reaction, Inadequate pain control (5) Social factor: ผู้สูงอายุ (${_e} ราย, เฉลี่ย ${we} ปี) อยู่คนเดียว ไม่มี Caregiver`,
          cascadeEffect: "Readmission ซ้ำ = ต้นทุนเพิ่ม 3-5 เท่า (admit ซ้ำ + complication ที่แย่กว่า) ● สิทธิ์ UC: ค่ารักษาครั้งที่ 2 เป็นภาระ รพ. (DRG ไม่จ่ายเพิ่ม) ● สวรส./สปสช. ตรวจสอบ → อาจถูกหักเงิน Global Budget ● ภาพลักษณ์ + Patient trust ลดลง → HA Accreditation เสี่ยง",
          fixFirst: "🔧 ลด Readmission: (1) Post-discharge Phone Call ภายใน 48 ชม. — ถามอาการ + ย้ำ medication (2) Discharge Summary ภาษาง่าย + VDO สอนการดูแลตนเอง (3) Home Health Care visit สำหรับ High-risk patient ภายใน 7 วัน (4) นัด OPD follow-up ภายใน 7 วัน (ไม่ใช่ 30 วัน) (5) Risk Stratification: คัดกรองผู้ป่วยที่มี Readmission Risk Score สูง → Intensive follow-up (6) เป้าหมาย: Readmission <5% ภายใน 90 วัน",
          color: s ? "#f43f5e" : "#f59e0b"
        })
      }
      if (M > 2) {
        const s = M > 5;
        C.push({
          priority: 5,
          severity: s ? "critical" : "warning",
          title: `🔴 Mortality Rate: ${M}% (${se} ราย) — เกิน HA Standard 2%`,
          rootCause: `อัตราตาย IPD ${M}% (${se} ราย จาก ${t.mortality_total_dch??0} discharge) ── ${M>5?"⚠️ สูงกว่ามาตรฐานมาก!":"สูงกว่าเกณฑ์ HA 2%"} ── ต้องวิเคราะห์แยก: (1) ตรวจสอบว่าเป็น Preventable death กี่ราย? (2) มี Delayed recognition / Delayed treatment หรือไม่? (3) Early Warning Score (MEWS/NEWS) ถูกใช้ทุก ward หรือไม่? (4) Rapid Response Team ถูกเรียกทันเวลาหรือไม่? (5) Acuity สูง (${o}) + High-risk patients (${j} ราย RW≥2) อาจเป็น contributing factor`,
          cascadeEffect: "ผลกระทบ: Mortality สูง → สรพ. (HA) ตรวจสอบ + อาจส่งผลต่อ Accreditation ● สปสช. audit → อาจถูก financial penalty ● Malpractice risk เพิ่มขึ้น → Premium ประกันสูงขึ้น ● Staff morale ลดลง → Burnout → Turnover สูง ● ภาพลักษณ์ รพ. เสียหาย → Volume ผู้ป่วยลดลง",
          fixFirst: "🔧 เร่งด่วน: (1) Mortality & Morbidity Conference ทุกสัปดาห์ — Review ทุกราย Death (2) Mandatory RCA (Root Cause Analysis) ทุกราย (3) Implement Modified Early Warning Score (MEWS) ทุก ward — Activate RRT เมื่อ score สูง (4) Sepsis Bundle: Door-to-Antibiotic ≤1 ชม. (5) Re-train CPR/ACLS ทั้ง Nursing + Medical staff (6) ICU Early Admission Policy: ย้ายเร็วก่อน deteriorate",
          color: s ? "#f43f5e" : "#f59e0b"
        })
      }
      if (o >= 1.5 || j > x * .3) {
        const s = x > 0 ? Math.round(j / x * 100) : 0;
        C.push({
          priority: 6,
          severity: o >= 2 ? "critical" : "warning",
          title: `🟡 High Acuity Load: CMI=${Se}, Current Acuity=${o}, High-risk ${s}%`,
          rootCause: `ผู้ป่วยที่นอนอยู่มีความซับซ้อนสูง — Acuity Score = ${o} (🔴 High ${j} ราย, 🟡 Medium ${y} ราย, 🟢 Low ${U} ราย) ● CMI (30 วัน) = ${Se} ── สาเหตุ: (1) ผู้ป่วย High-acuity ${s}% ของ census → Nurse workload สูงกว่า staffing ratio ที่มี (2) ผู้สูงอายุ ${_e} ราย (เฉลี่ย ${we} ปี) → ดูแลซับซ้อน ต้องการ Geriatric expertise (3) Low-acuity cases (${U} ราย) อาจ admit ไม่จำเป็น — ควรเป็น Observation/Day case`,
          cascadeEffect: "Acuity สูง → Nurse:Patient ratio ไม่เพียงพอ → Nursing errors เพิ่มขึ้น (Med error, Fall, Pressure injury) → Mortality risk สูงขึ้น → Staff burnout + turnover สูง → ต้องจ้าง Agency nurse ต้นทุนสูง ● Extended stay สำหรับ complex cases → เตียงเต็ม → วงจร Capacity crisis",
          fixFirst: `🔧 ปรับ: (1) Acuity-based Nursing Assignment: ≤1:4 สำหรับ High-acuity, 1:6 สำหรับ Medium (2) เรียก Staff สำรองเมื่อ Heavy census (3) Review Low-acuity cases (${U} ราย) → เปลี่ยนเป็น Observation/Day case ที่ทำได้ (4) Senior physician ดูแล High-risk cases (5) เตรียม ICU bed สำรอง 1-2 เตียงเสมอ`,
          color: o >= 2 ? "#f43f5e" : "#f59e0b"
        })
      }(Math.abs(q) > 2e3 || ie < 2e3) && C.push({
        priority: 7,
        severity: Math.abs(q) > 5e3 ? "critical" : "warning",
        title: `🟠 Financial Leakage: Rev/Bed-Day ฿${ie.toLocaleString()} + Unpaid Gap ฿${q.toLocaleString()}`,
        rootCause: `Revenue/Bed-Day = ฿${ie.toLocaleString()} ${ie<2e3?"— ต่ำกว่า Benchmark":"— อยู่ในเกณฑ์"} ● Avg Unpaid Gap = ฿${q.toLocaleString()} ต่อ case ── สาเหตุ: (1) DRG Under-coding: adjRW ต่ำกว่าความซับซ้อนจริง → reimbursement ไม่คุ้ม (2) Missing charges: ไม่บันทึก procedure, supply, หรือ medication ครบ (3) Long-stay low-acuity cases กิน bed-day แต่สร้าง revenue น้อย (4) Claim rejection จาก สปสช./ประกัน → Revenue ไม่ได้รับ`,
        cascadeEffect: `Revenue ต่ำ + Unpaid สูง → Cash flow ลดลง → ไม่มีงบลงทุน equipment/staffing → คุณภาพลดลง → ผู้ป่วยไปที่อื่น → Revenue ลดอีก → Downward spiral ● ผลกระทบต่อเดือน: หากลด Unpaid gap ฿${q.toLocaleString()} × ${t.cmi_cases??0} cases = ฿${(Math.abs(q)*(t.cmi_cases??0)).toLocaleString()} ต่อเดือน`,
        fixFirst: "🔧 เพิ่ม Revenue: (1) DRG Coding Audit รายสัปดาห์ — หา Under-coding cases (2) Concurrent Coding: Medical Coder review chart ระหว่าง admit ไม่ต้องรอ discharge (3) Missing Charge Audit ทุก ward ทุกสัปดาห์ (4) ลด Non-value bed-days ผ่าน Clinical Pathway (5) ตรวจสอบ Claim rejection rate → แก้ Root cause กับ Payer",
        color: Math.abs(q) > 5e3 ? "#f43f5e" : "#f59e0b"
      }), C.length === 0 && C.push({
        priority: 0,
        severity: "good",
        title: "✅ ระบบ IPD ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน",
        rootCause: `WEI Score ${r}/100 ● Occupancy ${a}% ● Turnover ${m}x ● ALOS Variance ${u}% ● Readmission ${g}% ● Mortality ${M}% ● Overstay ${K}% — ตัวชี้วัดอยู่ในเกณฑ์ยอมรับได้`,
        cascadeEffect: "ไม่มีผลกระทบลูกโซ่ — ระบบ Ward ทำงานราบรื่น ควร Monitor ต่อเนื่อง",
        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ WEI ≥ ${Math.min(r+10,100)} ภายไตรมาสหน้า (2) Benchmark กับ รพ. ระดับเดียวกัน (3) Patient experience survey ทุกเดือน`,
        color: "#10b981"
      }), C.sort((s, ae) => s.priority - ae.priority);
      const Re = C.filter(s => s.severity === "critical").length,
        xe = C.filter(s => s.severity === "warning").length,
        Y = Math.min(10, Re * 3 + xe * 1.5),
        E = Y >= 7 ? "#f43f5e" : Y >= 4 ? "#f59e0b" : "#10b981",
        Me = Y >= 7 ? "ต้องดำเนินการทันที" : Y >= 4 ? "ควรแก้ไขเร็ว" : "สถานการณ์ปกติ",
        Ee = [{
          label: `Overstay ${K}%`,
          color: "#f43f5e"
        }, {
          label: `ALOS +${u}%`,
          color: "#f59e0b"
        }, {
          label: `Turnover ${m}x`,
          color: "#8b5cf6"
        }, {
          label: `Occupancy ${a}%`,
          color: "#ef4444"
        }, {
          label: `D/C ก่อนเที่ยง ${w}%`,
          color: "#0ea5e9"
        }, {
          label: `WEI = ${r}/100`,
          color: "#10b981"
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
            children: "Cross-analysis IPD"
          })]
        }), e.jsxs("div", {
          className: `glass-card ${Y>=7?"alert-critical":Y>=4?"alert-warning":""}`,
          style: {
            padding: "1.5rem",
            border: `1.5px solid ${E}25`
          },
          children: [e.jsxs("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "1.5rem",
              alignItems: "center",
              padding: "1rem 1.25rem",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${E}08, ${E}03)`,
              border: `1px solid ${E}20`,
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
                    color: E,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em"
                  },
                  children: "⚡ ระดับความเร่งด่วนรวม — IPD"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: E,
                    background: `${E}15`,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    border: `1px solid ${E}25`
                  },
                  children: Me
                })]
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap"
                },
                children: [e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-secondary)",
                    fontWeight: 600
                  },
                  children: ["พบ ", e.jsxs("strong", {
                    style: {
                      color: "#f43f5e"
                    },
                    children: [Re, " ปัญหาวิกฤต"]
                  }), xe > 0 && e.jsxs(e.Fragment, {
                    children: [" + ", e.jsxs("strong", {
                      style: {
                        color: "#f59e0b"
                      },
                      children: [xe, " ปัญหาเตือน"]
                    })]
                  }), C[0]?.severity === "good" && e.jsx("strong", {
                    style: {
                      color: "#10b981"
                    },
                    children: "ไม่พบปัญหา"
                  })]
                }), e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    fontWeight: 500
                  },
                  children: ["WEI: ", r, "/100 · Occ: ", a, "% · Turnover: ", m, "x · Mortality: ", M, "%"]
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
                    width: `${Y*10}%`,
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
                  color: E,
                  lineHeight: 1,
                  letterSpacing: "-0.03em"
                },
                children: [Math.round(Y), e.jsx("span", {
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
                  color: E,
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
            children: C.map((s, ae) => e.jsxs("div", {
              style: {
                borderRadius: "14px",
                border: `1.5px solid ${s.color}20`,
                background: `${s.color}04`,
                overflow: "hidden"
              },
              children: [e.jsxs("div", {
                style: {
                  padding: "10px 16px",
                  background: `linear-gradient(90deg, ${s.color}12, transparent)`,
                  borderBottom: `1px solid ${s.color}15`,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                },
                children: [s.priority > 0 && e.jsx("span", {
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: s.color,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 900,
                    flexShrink: 0
                  },
                  children: s.priority
                }), e.jsx("span", {
                  style: {
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)",
                    lineHeight: 1.4
                  },
                  children: s.title
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
                    background: `${s.color}15`,
                    color: s.color,
                    border: `1px solid ${s.color}25`
                  },
                  children: s.severity === "critical" ? "🔴 CRITICAL" : s.severity === "warning" ? "🟡 WARNING" : "🟢 GOOD"
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
                    children: s.rootCause
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
                    children: s.cascadeEffect
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
                    children: ["🔧 แก้ไขก่อน — ด่วนที่ ", s.priority > 0 ? s.priority : "—", " (Fix First)"]
                  }), e.jsx("p", {
                    style: {
                      margin: 0,
                      fontSize: "11.5px",
                      color: "var(--md-text-secondary)",
                      lineHeight: 1.65,
                      fontWeight: 500
                    },
                    children: s.fixFirst
                  })]
                })]
              })]
            }, ae))
          }), C.length > 1 && C[0]?.severity !== "good" && e.jsxs("div", {
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
              children: "🗺️ แผนที่ความเชื่อมโยง — IPD Root-Cause Chain"
            }), e.jsx("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap"
              },
              children: Ee.map((s, ae) => e.jsxs(A.Fragment, {
                children: [ae > 0 && e.jsx("span", {
                  style: {
                    color: "#94a3b8",
                    fontSize: "14px"
                  },
                  children: "→"
                }), e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    color: s.color,
                    background: `${s.color}10`,
                    padding: "4px 10px",
                    borderRadius: "8px",
                    border: `1px solid ${s.color}20`
                  },
                  children: s.label
                })]
              }, ae))
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
              }), " ปัญหา IPD มีต้นตอจาก ", e.jsxs("strong", {
                style: {
                  color: "#f43f5e"
                },
                children: ["Overstay (", K, "%)"]
              }), " + ", e.jsxs("strong", {
                style: {
                  color: "#f43f5e"
                },
                children: ["ALOS เกิน DRG (", u > 0 ? "+" : "", u, "%)"]
              }), "→ ทำให้เตียงหมุนเวียนช้า → Occupancy สูง → เตียงไม่ว่างรับ admit ใหม่ — ", e.jsx("strong", {
                children: "แก้ ด่วนที่ 1 ก่อน"
              }), " (Discharge Planning + LOS Management) จะเห็นผลลัพธ์ดีขึ้นในทุกตัวชี้วัดพร้อมกัน"]
            })]
          })]
        })]
      })
    })(), e.jsxs("div", {
      className: "chart-container",
      children: [e.jsx("h3", {
        style: {
          fontSize: "var(--fs-md)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em",
          marginBottom: "1rem"
        },
        children: "🏥 Ward Occupancy Census"
      }), e.jsx(V, {
        width: "100%",
        height: 300,
        children: e.jsxs(ne, {
          data: ve,
          layout: "vertical",
          children: [e.jsx(J, {
            vertical: !1,
            strokeDasharray: "3 3",
            stroke: "rgba(203,213,225,.4)"
          }), e.jsx(Z, {
            type: "number",
            domain: [0, 100],
            tick: {
              fill: "#9ca3af",
              fontSize: 10,
              fontWeight: 600
            },
            axisLine: !1,
            tickLine: !1,
            tickFormatter: t => `${t}%`
          }), e.jsx(ee, {
            type: "category",
            dataKey: "name",
            width: 80,
            tick: {
              fill: "#6b7280",
              fontSize: 10,
              fontWeight: 700
            },
            axisLine: !1,
            tickLine: !1
          }), e.jsx(Q, {
            cursor: {
              fill: "rgba(124,58,237,.04)"
            },
            contentStyle: {
              background: "#fff",
              border: "1px solid #e8eaf2",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,.08)"
            },
            formatter: (t, r, a) => [`${t}% (${a.payload.occupied}/${a.payload.total} เตียง)`, "Occupancy"]
          }), e.jsx(ge, {
            x: 85,
            stroke: "#f43f5e",
            strokeDasharray: "6 3",
            strokeWidth: 1.5
          }), e.jsx(O, {
            dataKey: "occupancy",
            radius: [0, 6, 6, 0],
            barSize: 18,
            children: ve.map((t, r) => e.jsx(fe, {
              fill: t.occupancy > 85 ? "#f43f5e" : t.occupancy > 70 ? "#f59e0b" : "#7c3aed"
            }, r))
          })]
        })
      }), e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "0.5rem"
        },
        children: [
          [{
            color: "#7c3aed",
            label: "ปกติ (<70%)"
          }, {
            color: "#f59e0b",
            label: "สูง (70-85%)"
          }, {
            color: "#f43f5e",
            label: "วิกฤต (>85%)"
          }].map((t, r) => e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "5px"
            },
            children: [e.jsx("div", {
              style: {
                width: "8px",
                height: "8px",
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
          }, r)), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginLeft: "auto"
            },
            children: [e.jsx("div", {
              style: {
                width: "18px",
                height: "2px",
                background: "#f43f5e",
                borderRadius: "2px",
                backgroundImage: "repeating-linear-gradient(90deg, #f43f5e 0, #f43f5e 4px, transparent 4px, transparent 8px)"
              }
            }), e.jsx("span", {
              style: {
                fontSize: "var(--fs-xs)",
                color: "#f43f5e",
                fontWeight: 700
              },
              children: "เส้นวิกฤต 85%"
            })]
          })
        ]
      })]
    }), e.jsxs("div", {
      className: "chart-container",
      children: [e.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem"
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
            children: "🧠 Predictive Capacity Flow (24-72h)"
          }), e.jsx("p", {
            style: {
              fontSize: "var(--fs-xs)",
              color: "var(--md-text-tertiary)",
              marginTop: "2px"
            },
            children: "AI Neural Demand Forecast — พยากรณ์อัตราครองเตียง"
          })]
        }), e.jsxs("span", {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "var(--fs-xs)",
            fontWeight: 700,
            color: "#8b5cf6",
            background: "rgba(139,92,246,.08)",
            border: "1px solid rgba(139,92,246,.2)",
            borderRadius: "999px",
            padding: "4px 12px"
          },
          children: [e.jsx("span", {
            style: {
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#8b5cf6",
              animation: "pulse 2s infinite"
            }
          }), "AI Forecast"]
        })]
      }), e.jsx(V, {
        width: "100%",
        height: 300,
        children: e.jsxs(ne, {
          data: Be,
          children: [e.jsx(J, {
            vertical: !1,
            strokeDasharray: "3 3",
            stroke: "rgba(203,213,225,.4)"
          }), e.jsx(Z, {
            dataKey: "name",
            tick: {
              fill: "#6b7280",
              fontSize: 10,
              fontWeight: 700
            },
            axisLine: !1,
            tickLine: !1
          }), e.jsx(ee, {
            domain: [0, 100],
            tick: {
              fill: "#9ca3af",
              fontSize: 10,
              fontWeight: 600
            },
            axisLine: !1,
            tickLine: !1,
            tickFormatter: t => `${t}%`
          }), e.jsx(Q, {
            cursor: {
              fill: "rgba(124,58,237,.04)"
            },
            contentStyle: {
              background: "#fff",
              border: "1px solid #e8eaf2",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,.08)"
            },
            formatter: t => [`${t}%`, "Occupancy"]
          }), e.jsx(ke, {
            iconType: "circle",
            iconSize: 8,
            wrapperStyle: {
              fontSize: "12px",
              paddingTop: "8px"
            }
          }), e.jsx(ge, {
            y: 85,
            stroke: "#f43f5e",
            strokeDasharray: "6 3",
            strokeWidth: 1.5,
            label: {
              value: "Critical 85%",
              position: "insideTopRight",
              fill: "#f43f5e",
              fontSize: 10,
              fontWeight: 700
            }
          }), e.jsx(O, {
            dataKey: "now",
            fill: "#7c3aed",
            name: "ปัจจุบัน",
            radius: [4, 4, 0, 0]
          }), e.jsx(O, {
            dataKey: "h24",
            fill: "#0ea5e9",
            name: "24 ชม.",
            radius: [4, 4, 0, 0]
          }), e.jsx(O, {
            dataKey: "h48",
            fill: "#8b5cf6",
            name: "48 ชม.",
            radius: [4, 4, 0, 0]
          }), e.jsx(O, {
            dataKey: "h72",
            fill: "#f59e0b",
            name: "72 ชม.",
            radius: [4, 4, 0, 0]
          })]
        })
      })]
    }), L && (() => {
      const t = L.patients || [],
        r = L.undiagnosed_count || 0,
        a = L.total_new_admits || 0,
        f = L.undiagnosed_pct || 0,
        x = L.ward_summary || [],
        I = r >= 5 || f >= 20,
        m = r === 0 ? "#10b981" : I ? "#f43f5e" : "#f59e0b",
        u = r === 0 ? "rgba(16,185,129,.1)" : I ? "rgba(244,63,94,.1)" : "rgba(245,158,11,.1)";
      return e.jsxs("div", {
        className: "chart-container",
        style: {
          marginBottom: "1.5rem",
          borderLeft: `4px solid ${m}`
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: d ? "1.25rem" : "0",
            flexWrap: "wrap",
            gap: "8px"
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
              children: "📋 รายชื่อผู้ป่วยยังไม่ลง Diagnosis วันแรกที่ Admit"
            }), e.jsx("p", {
              style: {
                fontSize: "var(--fs-xs)",
                color: "var(--md-text-tertiary)",
                marginTop: "2px"
              },
              children: "Coding Quality · DRG Readiness — ไม่มี Principal Diagnosis (PDx) ภายใน 24 ชม.หลัง Admit"
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap"
            },
            children: [e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: m,
                background: u,
                padding: "4px 10px",
                borderRadius: "6px"
              },
              children: [r, " / ", a, " ราย (", f, "%)"]
            }), r > 0 && e.jsx("button", {
              onClick: () => B(h => !h),
              style: {
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                color: d ? m : "#0284c7",
                background: d ? u : "rgba(2,132,199,.08)",
                border: `1px solid ${d?m+"33":"rgba(2,132,199,.2)"}`,
                padding: "4px 12px",
                borderRadius: "6px"
              },
              children: d ? "🔽 ซ่อนรายชื่อ" : "▶ แสดงรายชื่อ"
            })]
          })]
        }), r === 0 ? e.jsx("div", {
          style: {
            padding: "14px",
            background: "rgba(16,185,129,.06)",
            borderRadius: "10px",
            fontSize: "var(--fs-sm)",
            color: "#10b981",
            fontWeight: 700
          },
          children: "✅ ผู้ป่วยทุกรายที่ admit ในช่วง 24 ชม.ที่ผ่านมา มี Principal Diagnosis ครบถ้วน"
        }) : x.length > 0 && !d && e.jsx("div", {
          style: {
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "10px"
          },
          children: x.slice(0, 6).map((h, c) => e.jsxs("span", {
            style: {
              fontSize: "12px",
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "6px",
              background: "var(--md-surface-2)",
              color: "var(--md-text-secondary)",
              border: "1px solid var(--md-border)"
            },
            children: ["🏥 ", h.ward, " · ", e.jsx("strong", {
              style: {
                color: m
              },
              children: h.count
            })]
          }, c))
        }), d && r > 0 && e.jsx("div", {
          style: {
            maxHeight: "400px",
            overflowY: "auto",
            marginTop: "1rem"
          },
          children: e.jsxs("table", {
            style: {
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px"
            },
            children: [e.jsx("thead", {
              style: {
                position: "sticky",
                top: 0,
                background: "var(--md-surface)",
                zIndex: 1
              },
              children: e.jsxs("tr", {
                style: {
                  borderBottom: "2px solid var(--md-border)"
                },
                children: [e.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px"
                  },
                  children: "AN / HN"
                }), e.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px"
                  },
                  children: "ชื่อ"
                }), e.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px"
                  },
                  children: "เพศ/อายุ"
                }), e.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px"
                  },
                  children: "Ward"
                }), e.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px"
                  },
                  children: "Admit"
                }), e.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px"
                  },
                  children: "ผ่านไป"
                }), e.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "left",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px"
                  },
                  children: "แพทย์"
                }), e.jsx("th", {
                  style: {
                    padding: "8px 10px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: "var(--md-text-tertiary)",
                    fontSize: "11px"
                  },
                  children: "Dx"
                })]
              })
            }), e.jsx("tbody", {
              children: t.map((h, c) => {
                const g = h.hours_since_admit >= 24;
                return e.jsxs("tr", {
                  style: {
                    borderBottom: "1px solid var(--md-divider)",
                    background: c % 2 === 0 ? "transparent" : "rgba(0,0,0,.02)"
                  },
                  children: [e.jsxs("td", {
                    style: {
                      padding: "8px 10px",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "11px",
                      color: "var(--md-text-secondary)"
                    },
                    children: [e.jsx("div", {
                      style: {
                        fontWeight: 800,
                        color: "var(--md-text-primary)"
                      },
                      children: h.an
                    }), e.jsx("div", {
                      children: h.hn
                    })]
                  }), e.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      fontWeight: 700,
                      color: "var(--md-text-primary)"
                    },
                    children: h.name
                  }), e.jsxs("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "center"
                    },
                    children: [h.sex === "ชาย" || h.sex === "1" ? "♂" : "♀", " ", h.age || "—"]
                  }), e.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      fontSize: "11px"
                    },
                    children: h.ward_name
                  }), e.jsxs("td", {
                    style: {
                      padding: "8px 10px",
                      fontSize: "11px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: [h.regdate, " ", (h.regtime || "").slice(0, 5)]
                  }), e.jsxs("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "center",
                      fontWeight: 800,
                      color: g ? "#f43f5e" : "#f59e0b"
                    },
                    children: [h.hours_since_admit, "h"]
                  }), e.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      fontSize: "11px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: h.admit_doctor
                  }), e.jsx("td", {
                    style: {
                      padding: "8px 10px",
                      textAlign: "center"
                    },
                    children: e.jsx("span", {
                      style: {
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "99px",
                        background: "rgba(244,63,94,.1)",
                        color: "#f43f5e"
                      },
                      children: "PDx: 0"
                    })
                  })]
                }, h.an)
              })
            })]
          })
        }), r > 0 && e.jsxs("div", {
          style: {
            marginTop: "12px",
            padding: "10px 14px",
            background: "rgba(245,158,11,.06)",
            borderLeft: "3px solid #f59e0b",
            borderRadius: "8px",
            fontSize: "12px",
            color: "var(--md-text-primary)",
            lineHeight: 1.6
          },
          children: [e.jsx("strong", {
            style: {
              color: m
            },
            children: "💡 ทำไมสำคัญ:"
          }), " การลง Principal Diagnosis ภายใน 24 ชม. หลัง admit ช่วย (1) Clinical pathway เริ่มได้เร็ว (2) DRG coding ถูกต้อง (3) Claim submission ไม่สะดุด (4) HA audit compliance · ", e.jsx("strong", {
            children: "เป้าหมาย:"
          }), " PDx recorded ≤24 ชม. ทุกราย"]
        })]
      })
    })(), $?.patients?.filter(t => t.risk_level === "high" || t.risk_level === "moderate")?.length > 0 && (() => {
      const t = $.patients.filter(r => r.risk_level === "high" || r.risk_level === "moderate");
      return e.jsxs("div", {
        className: "chart-container",
        style: {
          marginBottom: "1.5rem"
        },
        children: [e.jsxs("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: v ? "1.25rem" : "0"
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
              children: "🚨 รายชื่อผู้ป่วยเสี่ยง Re-admit (LACE+ & Comorbidity)"
            }), e.jsx("p", {
              style: {
                fontSize: "var(--fs-xs)",
                color: "var(--md-text-tertiary)",
                marginTop: "2px"
              },
              children: "ควบคุมคุณภาพการจำหน่าย (Discharge Planning & Follow-up Prevention)"
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [e.jsxs("span", {
              style: {
                fontSize: "12px",
                fontWeight: 700,
                color: "#f43f5e",
                background: "rgba(244,63,94,.1)",
                padding: "4px 10px",
                borderRadius: "6px"
              },
              children: [t.length, " ราย"]
            }), e.jsx("button", {
              onClick: () => p(r => !r),
              style: {
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                color: v ? "#f43f5e" : "#7c3aed",
                background: v ? "rgba(244,63,94,.08)" : "rgba(124,58,237,.08)",
                border: `1px solid ${v?"rgba(244,63,94,.2)":"rgba(124,58,237,.2)"}`,
                padding: "4px 12px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all .2s ease"
              },
              children: v ? "🔽 ซ่อนรายชื่อ" : "▶ แสดงรายชื่อ"
            })]
          })]
        }), v && e.jsx("div", {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "12px",
            animation: "fadeIn .3s ease"
          },
          children: t.map((r, a) => e.jsxs("div", {
            style: {
              padding: "1rem",
              borderRadius: "12px",
              background: r.risk_level === "high" ? "linear-gradient(to right, rgba(244,63,94,.05), transparent)" : "linear-gradient(to right, rgba(245,158,11,.05), transparent)",
              border: `1px solid ${r.risk_level==="high"?"rgba(244,63,94,.2)":"rgba(245,158,11,.2)"}`,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            },
            children: [e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start"
              },
              children: [e.jsxs("div", {
                children: [e.jsx("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: e.jsx("span", {
                    style: {
                      fontSize: "14px",
                      fontWeight: 800,
                      color: "var(--md-text-primary)"
                    },
                    children: r.name
                  })
                }), e.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "4px"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-tertiary)"
                    },
                    children: [Number(r.age || 0), " ปี · ", r.ward]
                  }), r.drg && e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 700,
                      background: "var(--md-bg-body)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      border: "1px solid var(--md-border)",
                      color: "var(--md-text-secondary)"
                    },
                    children: ["DRG: ", r.drg]
                  })]
                }), e.jsx("div", {
                  style: {
                    marginTop: "4px"
                  },
                  children: e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-primary)"
                    },
                    children: [e.jsx("strong", {
                      children: "อ.:"
                    }), " ", r.doctor || "ไม่ระบุ", " ", e.jsxs("span", {
                      style: {
                        opacity: .6
                      },
                      children: ["(", new Date(r.regdate).toLocaleDateString("th-TH"), ")"]
                    })]
                  })
                }), e.jsx("div", {
                  style: {
                    marginTop: "2px"
                  },
                  children: e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-primary)"
                    },
                    children: [e.jsx("strong", {
                      children: "Primary Dx:"
                    }), " ", r.dx_icd10, " - ", r.dx_name]
                  })
                }), r.comorbidity_count > 0 && e.jsx("div", {
                  style: {
                    marginTop: "2px",
                    lineHeight: 1.3
                  },
                  children: e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-secondary)"
                    },
                    children: [e.jsx("strong", {
                      children: "โรคร่วม:"
                    }), " ", e.jsx("span", {
                      style: {
                        opacity: .85
                      },
                      children: r.comorbidity_details
                    })]
                  })
                }), r.op_names && e.jsx("div", {
                  style: {
                    marginTop: "2px"
                  },
                  children: e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-secondary)"
                    },
                    children: [e.jsx("strong", {
                      children: "Oper:"
                    }), " ", r.op_names]
                  })
                }), r.vitals && e.jsxs("div", {
                  style: {
                    marginTop: "2px",
                    display: "flex",
                    gap: "6px",
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    flexWrap: "wrap"
                  },
                  children: [e.jsxs("span", {
                    style: {
                      background: "var(--md-bg-body)",
                      padding: "1px 4px",
                      borderRadius: "3px"
                    },
                    children: ["BP: ", Math.round(r.vitals.bps || 0), "/", Math.round(r.vitals.bpd || 0)]
                  }), e.jsxs("span", {
                    style: {
                      background: "var(--md-bg-body)",
                      padding: "1px 4px",
                      borderRadius: "3px"
                    },
                    children: ["PR: ", Math.round(r.vitals.pulse || 0)]
                  }), e.jsxs("span", {
                    style: {
                      background: "var(--md-bg-body)",
                      padding: "1px 4px",
                      borderRadius: "3px",
                      color: r.vitals.temperature >= 37.5 ? "#f43f5e" : "inherit"
                    },
                    children: ["T: ", r.vitals.temperature || "-", "°C"]
                  }), e.jsxs("span", {
                    style: {
                      background: "var(--md-bg-body)",
                      padding: "1px 4px",
                      borderRadius: "3px",
                      color: r.vitals.o2sat < 95 && r.vitals.o2sat > 0 ? "#f43f5e" : "inherit"
                    },
                    children: ["SpO2: ", r.vitals.o2sat || "-", "%"]
                  })]
                }), r.labs && r.labs.length > 0 && e.jsx("div", {
                  style: {
                    marginTop: "4px",
                    display: "flex",
                    gap: "6px",
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    flexWrap: "wrap"
                  },
                  children: r.labs.map((f, x) => e.jsx("span", {
                    style: {
                      background: "rgba(139,92,246,.08)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      color: "#7c3aed",
                      fontWeight: 600,
                      border: "1px solid rgba(139,92,246,.15)"
                    },
                    children: f
                  }, `lab-${x}`))
                })]
              }), e.jsx("div", {
                style: {
                  textAlign: "right"
                },
                children: e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 800,
                    color: r.risk_level === "high" ? "#f43f5e" : "#f59e0b",
                    background: r.risk_level === "high" ? "rgba(244,63,94,.1)" : "rgba(245,158,11,.1)",
                    padding: "2px 8px",
                    borderRadius: "99px",
                    whiteSpace: "nowrap"
                  },
                  children: ["LACE+ ", r.total_score, " (", r.risk_pct, "%)"]
                })
              })]
            }), e.jsxs("div", {
              style: {
                display: "flex",
                gap: "6px",
                flexWrap: "wrap"
              },
              children: [r.los > 3 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: "#6366f1",
                  background: "rgba(99,102,241,.1)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid rgba(99,102,241,.2)",
                  fontWeight: 600
                },
                children: ["L - นอนนาน ", r.los, " วัน"]
              }), r.er_visits_6m > 0 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: "#f43f5e",
                  background: "rgba(244,63,94,.1)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid rgba(244,63,94,.2)",
                  fontWeight: 600
                },
                children: ["A - เข้า ER ", r.er_visits_6m, " ครั้ง (6 ด.)"]
              }), r.comorbidity_count > 0 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: "#f59e0b",
                  background: "rgba(245,158,11,.1)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid rgba(245,158,11,.2)",
                  fontWeight: 600
                },
                children: ["C - โรคร่วม ", r.comorbidity_count, " โรค"]
              }), r.rw > 1.5 && e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  color: "#8b5cf6",
                  background: "rgba(139,92,246,.1)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid rgba(139,92,246,.2)",
                  fontWeight: 600
                },
                children: ["RW สูง (", Number(r.rw || 0).toFixed(2), ")"]
              }), r.age >= 70 && e.jsx("span", {
                style: {
                  fontSize: "12px",
                  color: "#64748b",
                  background: "rgba(100,116,139,.1)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  border: "1px solid rgba(100,116,139,.2)",
                  fontWeight: 600
                },
                children: "วัยผู้สูงอายุ"
              })]
            }), e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
                padding: "8px 10px",
                background: "var(--md-surface)",
                borderRadius: "6px",
                border: "1px solid var(--md-border)"
              },
              children: [e.jsx("span", {
                style: {
                  fontSize: "13px",
                  paddingTop: "1px"
                },
                children: "💡"
              }), e.jsx("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                },
                children: r.recommendation.split(" | ").map((f, x) => e.jsx("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--md-text-primary)"
                  },
                  children: f
                }, x))
              })]
            })]
          }, a))
        })]
      })
    })(), W?.patients?.filter(t => t.status === "over_stay" || t.status === "at_risk")?.length > 0 && e.jsxs("div", {
      className: "chart-container",
      style: {
        marginBottom: "1.5rem"
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
            children: "⌛ รายชื่อผู้ป่วยนอนเกินกำหนด (AI LOS Predictor)"
          }), e.jsx("p", {
            style: {
              fontSize: "var(--fs-xs)",
              color: "var(--md-text-tertiary)",
              marginTop: "2px"
            },
            children: "เฝ้าระวังผู้ป่วยที่นอนเกินเกณฑ์มาตรฐาน DRG ของโรงพยาบาล"
          })]
        }), e.jsxs("span", {
          style: {
            fontSize: "12px",
            fontWeight: 700,
            color: "#f59e0b",
            background: "rgba(245,158,11,.1)",
            padding: "4px 10px",
            borderRadius: "6px"
          },
          children: [W.patients.filter(t => t.status === "over_stay" || t.status === "at_risk").length, " ราย"]
        })]
      }), e.jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "12px"
        },
        children: W.patients.filter(t => t.status === "over_stay" || t.status === "at_risk").map((t, r) => e.jsxs("div", {
          style: {
            padding: "1rem",
            borderRadius: "12px",
            background: t.status === "over_stay" ? "linear-gradient(to right, rgba(245,158,11,.05), transparent)" : "linear-gradient(to right, rgba(99,102,241,.05), transparent)",
            border: `1px solid ${t.status==="over_stay"?"rgba(245,158,11,.2)":"rgba(99,102,241,.2)"}`,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          },
          children: [e.jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start"
            },
            children: [e.jsxs("div", {
              children: [e.jsx("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                },
                children: e.jsx("span", {
                  style: {
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "var(--md-text-primary)"
                  },
                  children: t.name
                })
              }), e.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "4px"
                },
                children: [e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)"
                  },
                  children: [Number(t.age || 0), " ปี · ", t.ward]
                }), t.drg && e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    fontWeight: 700,
                    background: "var(--md-bg-body)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    border: "1px solid var(--md-border)",
                    color: "var(--md-text-secondary)"
                  },
                  children: ["DRG: ", t.drg]
                })]
              }), e.jsx("div", {
                style: {
                  marginTop: "4px"
                },
                children: e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-primary)"
                  },
                  children: [e.jsx("strong", {
                    children: "Dx:"
                  }), " ", t.dx_icd10, " - ", t.dx_name]
                })
              }), t.op_names && e.jsx("div", {
                style: {
                  marginTop: "2px"
                },
                children: e.jsxs("span", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-secondary)"
                  },
                  children: [e.jsx("strong", {
                    children: "Oper:"
                  }), " ", t.op_names]
                })
              }), t.vitals && e.jsxs("div", {
                style: {
                  marginTop: "2px",
                  display: "flex",
                  gap: "6px",
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  flexWrap: "wrap"
                },
                children: [e.jsxs("span", {
                  style: {
                    background: "var(--md-bg-body)",
                    padding: "1px 4px",
                    borderRadius: "3px"
                  },
                  children: ["BP: ", Math.round(t.vitals.bps || 0), "/", Math.round(t.vitals.bpd || 0)]
                }), e.jsxs("span", {
                  style: {
                    background: "var(--md-bg-body)",
                    padding: "1px 4px",
                    borderRadius: "3px"
                  },
                  children: ["PR: ", Math.round(t.vitals.pulse || 0)]
                }), e.jsxs("span", {
                  style: {
                    background: "var(--md-bg-body)",
                    padding: "1px 4px",
                    borderRadius: "3px",
                    color: t.vitals.temperature >= 37.5 ? "#f43f5e" : "inherit"
                  },
                  children: ["T: ", t.vitals.temperature || "-", "°C"]
                }), e.jsxs("span", {
                  style: {
                    background: "var(--md-bg-body)",
                    padding: "1px 4px",
                    borderRadius: "3px",
                    color: t.vitals.o2sat < 95 && t.vitals.o2sat > 0 ? "#f43f5e" : "inherit"
                  },
                  children: ["SpO2: ", t.vitals.o2sat || "-", "%"]
                })]
              }), t.labs && t.labs.length > 0 && e.jsx("div", {
                style: {
                  marginTop: "4px",
                  display: "flex",
                  gap: "6px",
                  fontSize: "12px",
                  color: "var(--md-text-tertiary)",
                  flexWrap: "wrap"
                },
                children: t.labs.map((a, f) => e.jsx("span", {
                  style: {
                    background: "rgba(139,92,246,.08)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    color: "#7c3aed",
                    fontWeight: 600,
                    border: "1px solid rgba(139,92,246,.15)"
                  },
                  children: a
                }, `lab-${f}`))
              })]
            }), e.jsx("div", {
              style: {
                textAlign: "right"
              },
              children: e.jsxs("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 800,
                  color: t.status === "over_stay" ? "#f59e0b" : "#6366f1",
                  background: t.status === "over_stay" ? "rgba(245,158,11,.1)" : "rgba(99,102,241,.1)",
                  padding: "2px 8px",
                  borderRadius: "99px",
                  whiteSpace: "nowrap"
                },
                children: ["นอน ", Math.round(t.current_los), " / ", t.expected_los, " วัน"]
              })
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              gap: "6px",
              flexWrap: "wrap"
            },
            children: [t.gap >= 0 && e.jsxs("span", {
              style: {
                fontSize: "12px",
                color: t.status === "over_stay" ? "#f43f5e" : "#f59e0b",
                background: t.status === "over_stay" ? "rgba(244,63,94,.1)" : "rgba(245,158,11,.1)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: `1px solid ${t.status==="over_stay"?"rgba(244,63,94,.2)":"rgba(245,158,11,.2)"}`,
                fontWeight: 600
              },
              children: ["เกินกำหนด ", Number(t.gap || 0).toFixed(1), " วัน"]
            }), t.comorbidity_count > 0 && e.jsxs("span", {
              style: {
                fontSize: "12px",
                color: "#f59e0b",
                background: "rgba(245,158,11,.1)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid rgba(245,158,11,.2)",
                fontWeight: 600
              },
              children: ["C - โรคร่วม ", t.comorbidity_count, " โรค"]
            }), t.rw > 1.5 && e.jsxs("span", {
              style: {
                fontSize: "12px",
                color: "#8b5cf6",
                background: "rgba(139,92,246,.1)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid rgba(139,92,246,.2)",
                fontWeight: 600
              },
              children: ["RW สูง (", Number(t.rw || 0).toFixed(2), ")"]
            }), t.age >= 70 && e.jsx("span", {
              style: {
                fontSize: "12px",
                color: "#64748b",
                background: "rgba(100,116,139,.1)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid rgba(100,116,139,.2)",
                fontWeight: 600
              },
              children: "วัยผู้สูงอายุ"
            })]
          }), e.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              padding: "8px 10px",
              background: "var(--md-surface)",
              borderRadius: "6px",
              border: "1px solid var(--md-border)"
            },
            children: [e.jsx("span", {
              style: {
                fontSize: "13px",
                paddingTop: "1px"
              },
              children: "💡"
            }), e.jsx("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              },
              children: t.suggestion.split(" | ").map((a, f) => e.jsx("span", {
                style: {
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--md-text-primary)"
                },
                children: a
              }, f))
            })]
          })]
        }, r))
      })]
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
          background: "linear-gradient(180deg, #8b5cf6, #7c3aed)",
          borderRadius: "99px"
        }
      }), e.jsx("span", {
        style: {
          fontSize: "var(--fs-sm)",
          fontWeight: 800,
          color: "var(--md-text-primary)",
          letterSpacing: "-0.01em"
        },
        children: "💰 รายได้โดยประมาณ IPD — ปีงบประมาณ (3 ปีย้อนหลัง)"
      }), e.jsx("span", {
        style: {
          fontSize: "12px",
          color: "var(--md-text-tertiary)",
          fontWeight: 600,
          background: "rgba(139,92,246,.08)",
          padding: "2px 8px",
          borderRadius: "99px"
        },
        children: "an_stat · HOSxP XE"
      })]
    }), e.jsxs("div", {
      className: "glass-card",
      style: {
        padding: "0.75rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap"
      },
      children: [e.jsx("span", {
        style: {
          fontSize: "12px",
          fontWeight: 800,
          color: "var(--md-text-secondary)"
        },
        children: "ช่วงวันที่"
      }), e.jsx("input", {
        type: "date",
        value: me,
        onChange: t => Ie(t.target.value),
        style: {
          padding: "5px 10px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "13px",
          fontWeight: 700,
          background: "var(--md-surface)",
          color: "var(--md-text-primary)"
        }
      }), e.jsx("span", {
        style: {
          fontWeight: 800,
          color: "var(--md-text-tertiary)",
          fontSize: "12px"
        },
        children: "ถึง"
      }), e.jsx("input", {
        type: "date",
        value: ye,
        onChange: t => Ae(t.target.value),
        style: {
          padding: "5px 10px",
          borderRadius: "8px",
          border: "1px solid var(--md-border)",
          fontSize: "13px",
          fontWeight: 700,
          background: "var(--md-surface)",
          color: "var(--md-text-primary)"
        }
      }), e.jsx("button", {
        onClick: () => Te(me, ye),
        disabled: de,
        style: {
          padding: "5px 16px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 800,
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
          color: "#fff",
          opacity: de ? .5 : 1
        },
        children: de ? "Loading..." : "โหลดข้อมูล"
      }), e.jsx("button", {
        onClick: Le,
        disabled: !b.ipdRevenueFiscal?.fiscal_years?.length,
        style: {
          padding: "5px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)",
          cursor: "pointer"
        },
        children: "Print"
      }), e.jsx("button", {
        onClick: Pe,
        disabled: !b.ipdRevenueFiscal?.fiscal_years?.length,
        style: {
          padding: "5px 14px",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: 700,
          border: "1px solid var(--md-border)",
          background: "var(--md-surface)",
          color: "var(--md-text-secondary)",
          cursor: "pointer"
        },
        children: "CSV"
      })]
    }), e.jsx("div", {
      className: "glass-card",
      style: {
        padding: "1.25rem 1.5rem"
      },
      ref: be,
      children: i.ipdRevenueFiscal ? e.jsxs("div", {
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
        const r = b.ipdRevenueFiscal?.fiscal_years || [];
        if (r.length === 0) return e.jsx("p", {
          style: {
            fontSize: "var(--fs-sm)",
            color: "var(--md-text-tertiary)",
            textAlign: "center",
            padding: "2rem 0"
          },
          children: "ไม่พบข้อมูลรายได้ IPD"
        });
        const a = ["#94a3b8", "#8b5cf6", "#7c3aed"],
          x = ["ต.ค.", "พ.ย.", "ธ.ค.", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย."].map((c, g) => {
            const S = {
              month: c
            };
            return r.forEach((w, M) => {
              S[`fy${M}`] = w.months[g]?.revenue || 0
            }), S
          }),
          I = r[r.length - 1],
          m = r.length >= 2 ? r[r.length - 2] : null,
          u = I.comparable_months || 12,
          h = m && (m.comparable_revenue ?? m.total_revenue) > 0 ? Math.round(((I.comparable_revenue ?? I.total_revenue) - (m.comparable_revenue ?? m.total_revenue)) / (m.comparable_revenue ?? m.total_revenue) * 1e3) / 10 : 0;
        return e.jsxs("div", {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          },
          children: [e.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: `repeat(${r.length}, 1fr)`,
              gap: "10px"
            },
            children: r.map((c, g) => {
              const S = g === r.length - 1,
                w = a[g];
              return e.jsxs("div", {
                style: {
                  padding: "0.75rem 1rem",
                  borderRadius: "12px",
                  background: S ? `linear-gradient(135deg, ${w}12, ${w}05)` : `${w}06`,
                  border: `1px solid ${w}${S?"30":"15"}`
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
                      background: w
                    }
                  }), e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 800,
                      color: w,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em"
                    },
                    children: c.fiscal_label
                  }), S && e.jsx("span", {
                    style: {
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#7c3aed",
                      background: "rgba(124,58,237,.1)",
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
                    color: w,
                    margin: "0 0 2px",
                    letterSpacing: "-0.02em"
                  },
                  children: ["฿", (c.total_revenue / 1e6).toFixed(1), "M"]
                }), e.jsxs("p", {
                  style: {
                    fontSize: "12px",
                    color: "var(--md-text-tertiary)",
                    margin: 0,
                    fontWeight: 600
                  },
                  children: [c.total_cases.toLocaleString(), " cases · ", c.total_patients.toLocaleString(), " patients · ฿", c.avg_revenue_per_case.toLocaleString(), "/case"]
                }), S && m && e.jsxs("div", {
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
                      color: h >= 0 ? "#10b981" : "#f43f5e"
                    },
                    children: [h >= 0 ? "📈" : "📉", " YoY ", h >= 0 ? "+" : "", h, "%"]
                  }), e.jsxs("span", {
                    style: {
                      fontSize: "12px",
                      color: "var(--md-text-tertiary)",
                      fontWeight: 500
                    },
                    children: ["vs ", m.fiscal_label, " (เทียบ ", u, " ด.)"]
                  })]
                })]
              }, g)
            })
          }), e.jsx(V, {
            width: "100%",
            height: 280,
            children: e.jsxs(ne, {
              data: x,
              margin: {
                top: 8,
                right: 12,
                bottom: 0,
                left: 4
              },
              children: [e.jsx(J, {
                strokeDasharray: "3 3",
                stroke: "rgba(203,213,225,.3)",
                vertical: !1
              }), e.jsx(Z, {
                dataKey: "month",
                tick: {
                  fill: "#6b7280",
                  fontSize: 10,
                  fontWeight: 700
                },
                axisLine: !1,
                tickLine: !1
              }), e.jsx(ee, {
                tick: {
                  fill: "#9ca3af",
                  fontSize: 9
                },
                axisLine: !1,
                tickLine: !1,
                width: 40,
                tickFormatter: c => c >= 1e6 ? `${(c/1e6).toFixed(0)}M` : `${(c/1e3).toFixed(0)}K`
              }), e.jsx(Q, {
                contentStyle: {
                  background: "#fff",
                  border: "1px solid #e8eaf2",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,.08)"
                },
                formatter: (c, g) => {
                  const S = Number(g.replace("fy", "")),
                    w = r[S]?.fiscal_label || g;
                  return [`฿${(c/1e6).toFixed(2)}M`, w]
                }
              }), r.map((c, g) => e.jsx(O, {
                dataKey: `fy${g}`,
                fill: a[g],
                radius: [3, 3, 0, 0],
                barSize: r.length <= 2 ? 20 : 14,
                opacity: g === r.length - 1 ? 1 : .5,
                name: `fy${g}`
              }, g))]
            })
          }), e.jsx("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "center"
            },
            children: r.map((c, g) => e.jsxs("div", {
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
                  background: a[g],
                  opacity: g === r.length - 1 ? 1 : .5
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
                children: ["฿", (c.total_revenue / 1e6).toFixed(1), "M"]
              })]
            }, g))
          })]
        })
      })()
    }), e.jsx(De, {
      name: "IPD Bed Flow",
      children: e.jsx(Ve, {
        data: b.bedFlow,
        loading: i.bedFlow
      })
    }), e.jsx(De, {
      name: "IPD Discharge Planning",
      children: e.jsx(Qe, {
        data: b.dischargePlanning,
        loading: i.dischargePlanning
      })
    }), e.jsx(Ge, {
      data: b.ipdAI,
      theme: "default",
      title: "AI IPD Intelligence"
    })]
  })
}
const et = A.memo(Xe);
export {
  et as
  default
};