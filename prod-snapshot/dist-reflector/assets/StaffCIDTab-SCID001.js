// ============================================================
// BCH 360° — Staff CID Services Tab
// รายงานการรับบริการของบุคลากร · ตรวจสอบ CID
// อ่าน CID list จาก sidecar.staff_cid_list (498 รายการ)
// แล้วเทียบกับ HOSxP patient/ovst/ipt ตามช่วงเวลาที่เลือก
// ============================================================
import {
  R as React,
  j as t
} from "./vendor-react-ByYOq5k4.js";
const {
  useState,
  useEffect,
  useMemo,
  useCallback
} = React;
const jsx = t.jsx,
  jsxs = t.jsxs,
  Fragment = t.Fragment;

// ── Fetch helper (shared CSRF pattern) ──
function readCookie(name) {
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : null;
}
async function api(path, opts = {}) {
  const method = (opts.method || "GET").toUpperCase();
  const headers = {
    "Content-Type": "application/json",
    ...(opts.headers || {})
  };
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    const csrf = readCookie("csrf_token");
    if (csrf) headers["X-CSRF-Token"] = csrf;
  }
  const res = await fetch(path, {
    credentials: "include",
    headers,
    ...opts
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({
      error: res.statusText
    }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── Helpers ──
function fmtDate(s) {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function fmtMoney(n) {
  return Number(n || 0).toLocaleString("en-US", {
    maximumFractionDigits: 0
  });
}

function defaultFY() {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const fyYear = m >= 10 ? y : y - 1;
  return {
    start: `${fyYear}-10-01`,
    end: today.toISOString().slice(0, 10),
    fyBe: fyYear + 543
  };
}

// ──────────────────────────────────────────────────────────
// KPI Card
// ──────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  sub,
  accent = "#7c3aed"
}) {
  return jsx("div", {
    style: {
      background: "white",
      border: "1px solid #e2e8f0",
      borderRadius: 16,
      padding: "16px 18px",
      boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
      borderTop: `3px solid ${accent}`,
    },
    children: jsxs("div", {
      children: [
        jsx("div", {
          style: {
            fontSize: 11,
            color: "#64748b",
            fontWeight: 500,
            marginBottom: 4
          },
          children: label
        }),
        jsx("div", {
          style: {
            fontSize: 24,
            fontWeight: 700,
            color: "#0f172a",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums"
          },
          children: value
        }),
        sub ? jsx("div", {
          style: {
            fontSize: 10,
            color: "#94a3b8",
            marginTop: 6
          },
          children: sub
        }) : null,
      ]
    }),
  });
}

// ──────────────────────────────────────────────────────────
// Sortable column header
// ──────────────────────────────────────────────────────────
function Th({
  label,
  sortKey,
  sortBy,
  sortDir,
  onSort,
  align = "left"
}) {
  const active = sortBy === sortKey;
  return jsx("th", {
    onClick: () => onSort(sortKey),
    style: {
      textAlign: align,
      padding: "10px 12px",
      fontSize: 11,
      fontWeight: 600,
      color: active ? "#7c3aed" : "#64748b",
      borderBottom: "2px solid #e2e8f0",
      whiteSpace: "nowrap",
      position: "sticky",
      top: 0,
      background: "#f8fafc",
      cursor: "pointer",
      userSelect: "none",
    },
    children: jsxs("span", {
      children: [
        label,
        active ? jsx("span", {
          style: {
            marginLeft: 4,
            color: "#7c3aed"
          },
          children: sortDir === "asc" ? " ▲" : " ▼"
        }) : null,
      ]
    }),
  });
}

// ──────────────────────────────────────────────────────────
// StaffCIDTab — main
// ──────────────────────────────────────────────────────────
function StaffCIDTab() {
  const fy = defaultFY();
  const [start, setStart] = useState(fy.start);
  const [end, setEnd] = useState(fy.end);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [refreshTick, setRefreshTick] = useState(0);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // all | with | without | missing
  const [sortBy, setSortBy] = useState("total_income");
  const [sortDir, setSortDir] = useState("desc");

  // Fetch
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);
    api(`/api/mr-audit/staff-cid-services?start=${start}&end=${end}`)
      .then((d) => {
        if (alive) setData(d);
      })
      .catch((e) => {
        if (alive) setErr(e.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [start, end, refreshTick]);

  const refresh = useCallback(() => setRefreshTick((x) => x + 1), []);
  const exportPdf = () => window.open(`/api/mr-audit/staff-cid-services/pdf?start=${start}&end=${end}`, "_blank");
  const handleSort = (key) => {
    if (sortBy === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortBy(key);
      setSortDir("desc");
    }
  };

  const rows = data?.rows || [];
  const filteredRows = useMemo(() => {
    let r = [...rows];
    if (filterMode === "with") r = r.filter((x) => x.has_visit);
    else if (filterMode === "without") r = r.filter((x) => !x.has_visit);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((x) =>
        (x.cid || "").includes(q) ||
        (x.hn || "").includes(q) ||
        (x.pt_name || "").toLowerCase().includes(q)
      );
    }
    r.sort((a, b) => {
      const va = a[sortBy],
        vb = b[sortBy];
      const na = typeof va === "number" ? va : Number(va) || 0;
      const nb = typeof vb === "number" ? vb : Number(vb) || 0;
      if (typeof va === "string" && typeof vb === "string") {
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortDir === "asc" ? na - nb : nb - na;
    });
    return r;
  }, [rows, filterMode, search, sortBy, sortDir]);

  const inputStyle = {
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 13,
    background: "white",
  };
  const labelStyle = {
    fontSize: 11,
    color: "#64748b",
    fontWeight: 500,
    marginBottom: 4,
    display: "block"
  };

  return jsxs("div", {
    style: {
      padding: 24,
      fontFamily: "Kanit, system-ui, sans-serif"
    },
    children: [
      // Title bar
      jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18
        },
        children: [
          jsxs("div", {
            children: [
              jsx("div", {
                style: {
                  fontSize: 11,
                  color: "#7c3aed",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  marginBottom: 2
                },
                children: "STAFF CID SERVICE AUDIT"
              }),
              jsx("div", {
                style: {
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#0f172a"
                },
                children: "ตรวจสอบ CID บุคลากร — รายงานการรับบริการ"
              }),
              jsx("div", {
                style: {
                  fontSize: 12,
                  color: "#64748b",
                  marginTop: 2
                },
                children: "เทียบ CID ใน list กับ HOSxP ovst/ipt · ปีงบประมาณ + ช่วงเวลา customizable · 498 CID seeded"
              }),
            ]
          }),
          jsxs("div", {
            style: {
              display: "flex",
              gap: 8
            },
            children: [
              jsx("button", {
                onClick: exportPdf,
                style: {
                  padding: "10px 16px",
                  background: "white",
                  color: "#7c3aed",
                  border: "1px solid #ddd6fe",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600
                },
                children: "📄 Export PDF",
              }),
              jsx("button", {
                onClick: refresh,
                style: {
                  padding: "10px 18px",
                  background: "#7c3aed",
                  color: "white",
                  border: 0,
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600
                },
                children: "↻ Refresh",
              }),
            ]
          }),
        ],
      }),
      // KPI cards
      data ? jsx("div", {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: 12,
          marginBottom: 16
        },
        children: [
          jsx(KpiCard, {
            label: "CID ทั้งหมดใน list",
            value: (data.cid_total || 0).toLocaleString(),
            sub: `seeded ใน sidecar`,
            accent: "#7c3aed"
          }),
          jsx(KpiCard, {
            label: "พบใน patient table",
            value: (data.matched || 0).toLocaleString(),
            sub: `${data.missing || 0} ไม่พบ (no patient record)`,
            accent: "#0ea5e9"
          }),
          jsx(KpiCard, {
            label: "มาใช้บริการในช่วง",
            value: (data.with_visits || 0).toLocaleString(),
            sub: `${data.without_visits || 0} ไม่มา · ${(data.with_visits / Math.max(1, data.matched) * 100).toFixed(1)}%`,
            accent: "#10b981"
          }),
          jsx(KpiCard, {
            label: "OPD รวม",
            value: (data.totals?.opd_visits || 0).toLocaleString(),
            sub: `เฉลี่ย ${(data.totals?.opd_visits / Math.max(1, data.with_visits)).toFixed(1)} ครั้ง/คน`,
            accent: "#f59e0b"
          }),
          jsx(KpiCard, {
            label: "IPD รวม",
            value: (data.totals?.ipd_admits || 0).toLocaleString(),
            sub: `Admission count`,
            accent: "#3b82f6"
          }),
          jsx(KpiCard, {
            label: "รายได้รวม",
            value: `${fmtMoney(data.totals?.total_income)} ฿`,
            sub: `OPD ${fmtMoney(data.totals?.opd_income)} + IPD ${fmtMoney(data.totals?.ipd_income)}`,
            accent: "#dc2626"
          }),
        ],
      }, "kpi") : null,
      // Filters
      jsx("div", {
        style: {
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "flex-end"
        },
        children: jsxs(Fragment, {
          children: [
            jsxs("label", {
              children: [
                jsx("div", {
                  style: labelStyle,
                  children: "เริ่ม"
                }),
                jsx("input", {
                  type: "date",
                  value: start,
                  onChange: (e) => setStart(e.target.value),
                  style: inputStyle
                }),
              ]
            }),
            jsxs("label", {
              children: [
                jsx("div", {
                  style: labelStyle,
                  children: "ถึง"
                }),
                jsx("input", {
                  type: "date",
                  value: end,
                  onChange: (e) => setEnd(e.target.value),
                  style: inputStyle
                }),
              ]
            }),
            jsxs("label", {
              children: [
                jsx("div", {
                  style: labelStyle,
                  children: "กรอง"
                }),
                jsxs("select", {
                  value: filterMode,
                  onChange: (e) => setFilterMode(e.target.value),
                  style: {
                    ...inputStyle,
                    minWidth: 160
                  },
                  children: [
                    jsx("option", {
                      value: "all",
                      children: "ทั้งหมด"
                    }),
                    jsx("option", {
                      value: "with",
                      children: "เฉพาะที่มาใช้บริการ"
                    }),
                    jsx("option", {
                      value: "without",
                      children: "เฉพาะที่ไม่มา"
                    }),
                  ],
                }),
              ]
            }),
            jsxs("label", {
              style: {
                flex: 1,
                minWidth: 200
              },
              children: [
                jsx("div", {
                  style: labelStyle,
                  children: "ค้นหา (CID / HN / ชื่อ)"
                }),
                jsx("input", {
                  type: "text",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  placeholder: "พิมพ์เพื่อค้นหา...",
                  style: {
                    ...inputStyle,
                    width: "100%"
                  }
                }),
              ]
            }),
            jsx("button", {
              onClick: () => {
                setStart(fy.start);
                setEnd(fy.end);
                setSearch("");
                setFilterMode("all");
              },
              style: {
                ...inputStyle,
                cursor: "pointer",
                color: "#7c3aed",
                fontWeight: 600,
                background: "#f5f3ff",
                border: "1px solid #ddd6fe"
              },
              children: "ล้างตัวกรอง",
            }),
          ],
        }),
      }),
      // Body
      err ?
      jsx("div", {
        style: {
          padding: 24,
          background: "#fee2e2",
          color: "#991b1b",
          borderRadius: 12
        },
        children: `Error: ${err}`
      }) :
      loading ?
      jsx("div", {
        style: {
          padding: 32,
          textAlign: "center",
          color: "#64748b"
        },
        children: "กำลังโหลด..."
      }) :
      jsxs(Fragment, {
        children: [
          jsxs("div", {
            style: {
              fontSize: 12,
              color: "#64748b",
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between"
            },
            children: [
              jsx("div", {
                children: `แสดง ${filteredRows.length} จาก ${rows.length} ราย (matched). ${data?.missing || 0} CID ไม่พบใน patient table`
              }),
              jsx("div", {
                children: `ช่วง ${fmtDate(data?.window?.start)} → ${fmtDate(data?.window?.end)} · ปีงบประมาณ ${data?.window?.fy_be || "-"}`
              }),
            ],
          }),
          // Table
          jsx("div", {
            style: {
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              overflow: "hidden"
            },
            children: jsx("div", {
              style: {
                maxHeight: "60vh",
                overflow: "auto"
              },
              children: jsxs("table", {
                style: {
                  width: "100%",
                  borderCollapse: "collapse",
                  fontVariantNumeric: "tabular-nums"
                },
                children: [
                  jsx("thead", {
                    children: jsxs("tr", {
                      children: [
                        jsx(Th, {
                          label: "#",
                          sortKey: "_idx",
                          sortBy,
                          sortDir,
                          onSort: handleSort,
                          align: "right"
                        }),
                        jsx(Th, {
                          label: "CID",
                          sortKey: "cid",
                          sortBy,
                          sortDir,
                          onSort: handleSort
                        }),
                        jsx(Th, {
                          label: "HN",
                          sortKey: "hn",
                          sortBy,
                          sortDir,
                          onSort: handleSort
                        }),
                        jsx(Th, {
                          label: "ชื่อ-สกุล",
                          sortKey: "pt_name",
                          sortBy,
                          sortDir,
                          onSort: handleSort
                        }),
                        jsx(Th, {
                          label: "อายุ",
                          sortKey: "age",
                          sortBy,
                          sortDir,
                          onSort: handleSort,
                          align: "right"
                        }),
                        jsx(Th, {
                          label: "OPD",
                          sortKey: "opd_visits",
                          sortBy,
                          sortDir,
                          onSort: handleSort,
                          align: "right"
                        }),
                        jsx(Th, {
                          label: "IPD",
                          sortKey: "ipd_admits",
                          sortBy,
                          sortDir,
                          onSort: handleSort,
                          align: "right"
                        }),
                        jsx(Th, {
                          label: "รายได้รวม (฿)",
                          sortKey: "total_income",
                          sortBy,
                          sortDir,
                          onSort: handleSort,
                          align: "right"
                        }),
                        jsx(Th, {
                          label: "ครั้งล่าสุด",
                          sortKey: "last_visit",
                          sortBy,
                          sortDir,
                          onSort: handleSort
                        }),
                        jsx(Th, {
                          label: "สิทธิ์หลัก",
                          sortKey: "top_pttype",
                          sortBy,
                          sortDir,
                          onSort: handleSort
                        }),
                        jsx(Th, {
                          label: "แผนกหลัก",
                          sortKey: "top_dept",
                          sortBy,
                          sortDir,
                          onSort: handleSort
                        }),
                      ]
                    })
                  }),
                  jsx("tbody", {
                    children: filteredRows.map((r, i) => {
                      const td = (children, extra = {}) => jsx("td", {
                        style: {
                          padding: "8px 12px",
                          fontSize: 12,
                          color: "#0f172a",
                          borderBottom: "1px solid #f1f5f9",
                          ...extra
                        },
                        children
                      });
                      return jsxs("tr", {
                        style: {
                          background: r.has_visit ? "white" : "#fafafa"
                        },
                        children: [
                          td(i + 1, {
                            textAlign: "right",
                            color: "#94a3b8",
                            fontSize: 11
                          }),
                          td(jsx("span", {
                            style: {
                              fontFamily: "monospace",
                              fontSize: 11
                            },
                            children: r.cid
                          })),
                          td(r.hn || "—"),
                          td(r.pt_name || "—", {
                            fontWeight: 500
                          }),
                          td(r.age != null ? r.age : "—", {
                            textAlign: "right"
                          }),
                          td(jsx("span", {
                            style: {
                              fontWeight: r.opd_visits > 0 ? 600 : 400,
                              color: r.opd_visits > 0 ? "#0f172a" : "#cbd5e1"
                            },
                            children: r.opd_visits || 0
                          }), {
                            textAlign: "right"
                          }),
                          td(jsx("span", {
                            style: {
                              fontWeight: r.ipd_admits > 0 ? 600 : 400,
                              color: r.ipd_admits > 0 ? "#0f172a" : "#cbd5e1"
                            },
                            children: r.ipd_admits || 0
                          }), {
                            textAlign: "right"
                          }),
                          td(jsx("span", {
                            style: {
                              fontWeight: 600,
                              color: r.total_income > 0 ? "#7c3aed" : "#cbd5e1"
                            },
                            children: fmtMoney(r.total_income)
                          }), {
                            textAlign: "right"
                          }),
                          td(r.last_visit ? fmtDate(r.last_visit) : jsx("span", {
                            style: {
                              color: "#cbd5e1"
                            },
                            children: "—"
                          })),
                          td(r.top_pttype || "—"),
                          td(r.top_dept || "—", {
                            fontSize: 11,
                            color: "#64748b"
                          }),
                        ],
                      }, r.cid + i);
                    })
                  }),
                ],
              }),
            }),
          }),
          // Missing CIDs callout
          data?.missing > 0 ? jsx("div", {
            style: {
              marginTop: 12,
              padding: "10px 14px",
              background: "#fef3c7",
              border: "1px solid #fcd34d",
              borderRadius: 8,
              fontSize: 11,
              color: "#92400e"
            },
            children: jsxs(Fragment, {
              children: [
                jsx("strong", {
                  children: `⚠ ${data.missing} CID ไม่พบใน HOSxP patient table:`
                }),
                " ",
                (data.missing_cids || []).slice(0, 30).map((c) =>
                  jsx("span", {
                    style: {
                      fontFamily: "monospace",
                      marginRight: 6
                    },
                    children: c
                  }, c)
                ),
                data.missing_cids?.length > 30 ? ` ... และอีก ${data.missing_cids.length - 30}` : "",
              ]
            }),
          }) : null,
        ]
      }),
    ],
  });
}

export default StaffCIDTab;