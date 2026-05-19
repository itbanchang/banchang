import {
  R as e
} from "./vendor-react-ByYOq5k4.js";
const {
  useState: _,
  useEffect: C,
  useMemo: N,
  useCallback: A
} = e;
var t = {
    textPrimary: "var(--md-text-primary)",
    textSecondary: "var(--md-text-secondary)",
    textTertiary: "var(--md-text-tertiary)",
    surface: "var(--md-surface)",
    border: "var(--md-border)",
    purple: "#7c3aed",
    cyan: "#0ea5e9",
    green: "#10b981",
    emerald: "#059669",
    amber: "#d97706",
    red: "#dc2626",
    gray: "#94a3b8",
    lime: "#65a30d",
    orange: "#ea580c"
  },
  z = 80;
async function b(r, n = {}) {
  let o = await fetch(r, {
    credentials: "include",
    ...n
  });
  if (!o.ok) throw new Error("HTTP " + o.status);
  return o.json()
}

function a(r) {
  return r == null || isNaN(r) ? "\u2014" : Number(r).toLocaleString("th-TH")
}

function $(r) {
  return r == null || isNaN(r) ? "\u2014" : Number(r).toFixed(1)
}

function c(r) {
  return r == null || isNaN(r) ? "\u2014" : Number(r).toFixed(1) + "%"
}

function m(r, n = "good") {
  return r == null || isNaN(r) ? t.gray : n === "bad" ? r >= 75 ? t.red : r >= 40 ? t.orange : r >= 15 ? t.amber : r > 0 ? t.lime : t.green : r >= 90 ? t.green : r >= 75 ? t.lime : r >= 50 ? t.amber : r >= 25 ? t.orange : t.red
}
var W = ["\u0E21.\u0E04.", "\u0E01.\u0E1E.", "\u0E21\u0E35.\u0E04.", "\u0E40\u0E21.\u0E22.", "\u0E1E.\u0E04.", "\u0E21\u0E34.\u0E22.", "\u0E01.\u0E04.", "\u0E2A.\u0E04.", "\u0E01.\u0E22.", "\u0E15.\u0E04.", "\u0E1E.\u0E22.", "\u0E18.\u0E04."];

function M(r) {
  if (!r) return "";
  let [n, o] = r.split("-");
  return W[(parseInt(o, 10) || 1) - 1] + " " + (parseInt(n, 10) + 543 - 2500)
}

function x({
  icon: r,
  label: n,
  sub: o,
  color: l
}) {
  return e.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 0 6px",
      borderBottom: `1px solid ${t.border}`,
      marginBottom: 2
    }
  }, e.createElement("span", {
    style: {
      fontSize: 16
    }
  }, r), e.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 900,
      color: l || t.textPrimary,
      textTransform: "uppercase",
      letterSpacing: ".05em"
    }
  }, n), o && e.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: t.textTertiary,
      marginLeft: "auto"
    }
  }, o))
}

function P({
  children: r,
  color: n,
  style: o
}) {
  return e.createElement("div", {
    style: {
      padding: "16px 18px",
      borderRadius: 12,
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderLeft: `4px solid ${n||t.purple}`,
      ...o
    }
  }, r)
}

function I({
  label: r,
  value: n,
  sub: o,
  color: l
}) {
  return e.createElement(P, {
    color: l
  }, e.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 800,
      color: t.textTertiary,
      textTransform: "uppercase",
      letterSpacing: ".06em"
    }
  }, r), e.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 900,
      color: l,
      fontVariantNumeric: "tabular-nums",
      marginTop: 4,
      lineHeight: 1.1
    }
  }, n), o && e.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: t.textSecondary,
      marginTop: 4
    }
  }, o))
}

function h({
  children: r,
  color: n
}) {
  return e.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      padding: "2px 7px",
      borderRadius: 6,
      fontSize: 10,
      fontWeight: 800,
      fontVariantNumeric: "tabular-nums",
      background: n + "15",
      color: n
    }
  }, r)
}

function L({
  summary: r
}) {
  if (!r) return null;
  let n = r.total_disch || 0,
    o = n ? r.doc_confirmed / n * 100 : 0,
    l = n ? r.hosxp_mr_audited / n * 100 : 0,
    s = n ? r.coding_done / n * 100 : 0,
    u = (r.dtx_dm || {}).completion_pct || 0,
    i = [{
      label: "Discharges (30 \u0E27\u0E31\u0E19)",
      value: a(n),
      sub: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD)",
      color: t.purple
    }, {
      label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 Final",
      value: c(o),
      sub: a(r.doc_confirmed) + " / " + a(n) + " \u0E23\u0E32\u0E22",
      color: m(o)
    }, {
      label: "\u0E1C\u0E48\u0E32\u0E19 HOSxP MR Audit",
      value: c(l),
      sub: a(r.hosxp_mr_audited) + " \u0E23\u0E32\u0E22",
      color: m(l)
    }, {
      label: "Coding Done",
      value: c(s),
      sub: a(r.coding_done) + " \u0E23\u0E32\u0E22",
      color: m(s)
    }, {
      label: "Avg LOS",
      value: $(r.avg_los) + " \u0E27\u0E31\u0E19",
      sub: "\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22\u0E27\u0E31\u0E19\u0E19\u0E2D\u0E19",
      color: t.cyan
    }, {
      label: "DTX Sheet (DM)",
      value: c(u),
      sub: a((r.dtx_dm || {}).dm_with_dtx) + " / " + a((r.dtx_dm || {}).dm_admits) + " DM admits",
      color: m(u)
    }];
  return e.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 12
    }
  }, i.map((p, f) => e.createElement(I, {
    key: f,
    ...p
  })))
}

function F({
  data: r,
  metric: n,
  onMetricChange: o,
  target: l
}) {
  if (!r || !r.rows || r.rows.length === 0) return e.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: t.textTertiary
    }
  }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25");
  let s = {
      content_completeness: {
        label: "\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E21\u0E1A\u0E39\u0E23\u0E13\u0E4C Content",
        color: t.purple
      },
      doc_confirmed_pct: {
        label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19 Final",
        color: t.cyan
      },
      hosxp_audited_pct: {
        label: "\u0E1C\u0E48\u0E32\u0E19 HOSxP MR Audit",
        color: t.green
      }
    },
    u = s[n] || s.content_completeness,
    i = 100,
    p = 100 / Math.max(r.rows.length, 1),
    f = r.rows.map(d => Number(d[n]) || 0),
    S = f.length ? f.reduce((d, w) => d + w, 0) / f.length : 0,
    y = f[f.length - 1] || 0,
    g = f.filter(d => d >= l).length;
  return e.createElement(P, {
    color: u.color
  }, e.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      padding: 3,
      background: "rgba(148,163,184,0.08)",
      borderRadius: 8,
      width: "fit-content",
      marginBottom: 12
    }
  }, Object.keys(s).map(d => e.createElement("button", {
    key: d,
    onClick: () => o(d),
    style: {
      padding: "5px 12px",
      border: "none",
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 700,
      cursor: "pointer",
      background: n === d ? t.surface : "transparent",
      color: n === d ? t.textPrimary : t.textSecondary,
      boxShadow: n === d ? "0 1px 2px rgba(0,0,0,.06)" : "none"
    }
  }, s[d].label))), e.createElement("div", {
    style: {
      position: "relative",
      height: 220,
      padding: "8px 8px 30px 42px",
      fontVariantNumeric: "tabular-nums"
    }
  }, [0, 25, 50, 75, 100].map(d => e.createElement("div", {
    key: d,
    style: {
      position: "absolute",
      left: 42,
      right: 8,
      bottom: 30 + d / i * 182,
      borderTop: d === l ? `2px dashed ${t.amber}` : `1px dashed ${t.border}`,
      zIndex: d === l ? 2 : 1
    }
  }, e.createElement("span", {
    style: {
      position: "absolute",
      left: -38,
      top: -7,
      fontSize: 9,
      color: d === l ? t.amber : t.textTertiary,
      fontWeight: d === l ? 800 : 600
    }
  }, d === l ? `\u2265 ${l}% (\u0E40\u0E1B\u0E49\u0E32)` : `${d}%`))), e.createElement("div", {
    style: {
      position: "absolute",
      left: 42,
      right: 8,
      top: 8,
      bottom: 30,
      display: "flex",
      alignItems: "flex-end",
      gap: 4
    }
  }, r.rows.map((d, w) => {
    let v = Number(d[n]) || 0,
      k = v / i * 100,
      T = m(v);
    return e.createElement("div", {
      key: d.ym,
      title: `${d.ym}
${u.label}: ${c(v)}
\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22 ${a(d.discharges)} \u0E23\u0E32\u0E22`,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        position: "relative",
        cursor: "default"
      }
    }, e.createElement("div", {
      style: {
        width: "78%",
        height: k + "%",
        background: `linear-gradient(180deg, ${T}cc, ${T})`,
        borderRadius: "4px 4px 0 0"
      }
    }), e.createElement("div", {
      style: {
        position: "absolute",
        bottom: -22,
        fontSize: 9,
        color: t.textTertiary,
        whiteSpace: "nowrap"
      }
    }, M(d.ym)))
  }))), e.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 8,
      marginTop: 8,
      paddingTop: 10,
      borderTop: `1px solid ${t.border}`
    }
  }, e.createElement("div", null, e.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: t.textTertiary,
      textTransform: "uppercase",
      letterSpacing: ".05em"
    }
  }, "\u0E40\u0E14\u0E37\u0E2D\u0E19\u0E25\u0E48\u0E32\u0E2A\u0E38\u0E14"), e.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: m(y),
      marginTop: 2
    }
  }, c(y))), e.createElement("div", null, e.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: t.textTertiary,
      textTransform: "uppercase",
      letterSpacing: ".05em"
    }
  }, "\u0E04\u0E48\u0E32\u0E40\u0E09\u0E25\u0E35\u0E48\u0E22 ", r.rows.length, " \u0E40\u0E14\u0E37\u0E2D\u0E19"), e.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: m(S),
      marginTop: 2
    }
  }, c(S))), e.createElement("div", null, e.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: t.textTertiary,
      textTransform: "uppercase",
      letterSpacing: ".05em"
    }
  }, "\u0E1C\u0E48\u0E32\u0E19\u0E40\u0E1B\u0E49\u0E32 \u2265 ", l, "%"), e.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 900,
      color: g === r.rows.length ? t.green : t.amber,
      marginTop: 2
    }
  }, g, " / ", r.rows.length, " \u0E40\u0E14\u0E37\u0E2D\u0E19"))))
}

function B({
  data: r
}) {
  if (!r) return null;
  let n = ({
    title: o,
    rows: l,
    color: s
  }) => {
    let u = Math.max(1, ...(l || []).map(i => i.pct));
    return e.createElement(P, {
      color: s
    }, e.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 900,
        color: s,
        textTransform: "uppercase",
        letterSpacing: ".05em",
        marginBottom: 10
      }
    }, o), (l || []).map(i => e.createElement("div", {
      key: i.key,
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 56px 76px",
        gap: 10,
        alignItems: "center",
        fontSize: 11,
        padding: "5px 0",
        borderBottom: `1px dashed ${t.border}`
      }
    }, e.createElement("div", {
      style: {
        minWidth: 0,
        overflow: "hidden"
      }
    }, e.createElement("div", {
      style: {
        fontWeight: 700,
        color: t.textPrimary,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, i.label), e.createElement("div", {
      style: {
        height: 6,
        borderRadius: 3,
        background: "rgba(148,163,184,.18)",
        marginTop: 3,
        overflow: "hidden"
      }
    }, e.createElement("div", {
      style: {
        height: "100%",
        width: Math.min(100, i.pct / u * 100) + "%",
        borderRadius: 3,
        background: s
      }
    }))), e.createElement("b", {
      style: {
        textAlign: "right",
        color: s,
        fontVariantNumeric: "tabular-nums"
      }
    }, a(i.count)), e.createElement("span", {
      style: {
        textAlign: "right"
      }
    }, e.createElement(h, {
      color: s
    }, c(i.pct))))))
  };
  return e.createElement(e.Fragment, null, e.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: 12
    }
  }, e.createElement(n, {
    title: "\u{1F4CB} Content Defects \u2014 \u0E40\u0E19\u0E37\u0E49\u0E2D\u0E2B\u0E32",
    rows: r.content,
    color: t.red
  }), e.createElement(n, {
    title: "\u2699\uFE0F Format Defects \u2014 Workflow",
    rows: r.format,
    color: t.amber
  })), e.createElement("div", {
    style: {
      fontSize: 10,
      color: t.textTertiary,
      fontStyle: "italic",
      textAlign: "right",
      marginTop: 6
    }
  }, "\u0E23\u0E27\u0E21 ", a(r.total_disch), " \u0E23\u0E32\u0E22 \xB7 \u0E43\u0E19\u0E23\u0E2D\u0E1A ", r.window_days || 30, " \u0E27\u0E31\u0E19"))
}

function D({
  rows: r,
  columns: n
}) {
  return !r || r.length === 0 ? e.createElement("div", {
    style: {
      padding: 20,
      textAlign: "center",
      color: t.textTertiary,
      fontSize: 12
    }
  }, "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25") : e.createElement("div", {
    style: {
      overflowX: "auto",
      border: `1px solid ${t.border}`,
      borderRadius: 10
    }
  }, e.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 11,
      fontVariantNumeric: "tabular-nums"
    }
  }, e.createElement("thead", null, e.createElement("tr", {
    style: {
      background: "rgba(148,163,184,.06)"
    }
  }, n.map((o, l) => e.createElement("th", {
    key: l,
    style: {
      padding: "8px 10px",
      textAlign: o.num ? "right" : "left",
      fontSize: 10,
      fontWeight: 800,
      color: t.textTertiary,
      textTransform: "uppercase",
      letterSpacing: ".04em",
      borderBottom: `1px solid ${t.border}`,
      whiteSpace: "nowrap"
    }
  }, o.label)))), e.createElement("tbody", null, r.map((o, l) => e.createElement("tr", {
    key: l
  }, n.map((s, u) => e.createElement("td", {
    key: u,
    style: {
      padding: "7px 10px",
      textAlign: s.num ? "right" : "left",
      borderBottom: `1px solid ${t.border}`,
      color: t.textPrimary,
      whiteSpace: s.wrap ? "normal" : "nowrap"
    }
  }, s.render ? s.render(o, l) : o[s.key])))))))
}

function H({
  data: r
}) {
  if (!r || !r.rows) return null;
  let n = [{
    key: "ward_name",
    label: "\u0E41\u0E1C\u0E19\u0E01 / Ward",
    render: o => e.createElement(e.Fragment, null, o.ward_name, " ", e.createElement("span", {
      style: {
        color: t.textTertiary,
        fontSize: 9
      }
    }, "(", o.ward, ")"))
  }, {
    key: "discharges",
    label: "Disch.",
    num: !0
  }, {
    key: "avg_los",
    label: "LOS",
    num: !0
  }, {
    key: "cc",
    label: "Content %",
    num: !0,
    render: o => e.createElement(h, {
      color: m(o.content_completeness)
    }, c(o.content_completeness))
  }, {
    key: "dc",
    label: "Doc Conf %",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: m(o.doc_confirmed_pct)
      }
    }, c(o.doc_confirmed_pct))
  }, {
    key: "au",
    label: "Audit %",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: m(o.hosxp_audited_pct)
      }
    }, c(o.hosxp_audited_pct))
  }, {
    key: "d_pdx",
    label: "\u0E02\u0E32\u0E14 PDx",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: t.red
      }
    }, a(o.defects_pdx))
  }, {
    key: "d_sum",
    label: "\u0E02\u0E32\u0E14 Disch.Sum",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: t.red
      }
    }, a(o.defects_dch_summary))
  }, {
    key: "d_nurse",
    label: "\u0E02\u0E32\u0E14 Nurse N.",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: t.amber
      }
    }, a(o.defects_nurse_notes))
  }, {
    key: "d_plan",
    label: "\u0E02\u0E32\u0E14 Disch.Plan",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: t.amber
      }
    }, a(o.defects_dch_plan))
  }];
  return e.createElement(D, {
    rows: r.rows,
    columns: n
  })
}

function O({
  data: r
}) {
  if (!r || !r.rows) return null;
  let n = [{
    key: "idx",
    label: "#",
    render: (o, l) => l + 1
  }, {
    key: "doctor_name",
    label: "\u0E41\u0E1E\u0E17\u0E22\u0E4C (Discharge)",
    wrap: !0,
    render: o => e.createElement(e.Fragment, null, o.doctor_name, " ", e.createElement("span", {
      style: {
        color: t.textTertiary,
        fontSize: 9
      }
    }, "(", o.doctor_code, ")"))
  }, {
    key: "discharges",
    label: "Disch.",
    num: !0
  }, {
    key: "cc",
    label: "Content %",
    num: !0,
    render: o => e.createElement(h, {
      color: m(o.content_completeness)
    }, c(o.content_completeness))
  }, {
    key: "dc",
    label: "Doc Conf %",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: m(o.doc_confirmed_pct)
      }
    }, c(o.doc_confirmed_pct))
  }, {
    key: "au",
    label: "Audit %",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: m(o.hosxp_audited_pct)
      }
    }, c(o.hosxp_audited_pct))
  }, {
    key: "d_pdx",
    label: "\u0E02\u0E32\u0E14 PDx",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: t.red
      }
    }, a(o.defects_pdx))
  }, {
    key: "d_sum",
    label: "\u0E02\u0E32\u0E14 Disch.Sum",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: t.red
      }
    }, a(o.defects_dch_summary))
  }, {
    key: "d_nurse",
    label: "\u0E02\u0E32\u0E14 Nurse N.",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: t.amber
      }
    }, a(o.defects_nurse_notes))
  }, {
    key: "d_plan",
    label: "\u0E02\u0E32\u0E14 Disch.Plan",
    num: !0,
    render: o => e.createElement("span", {
      style: {
        color: t.amber
      }
    }, a(o.defects_dch_plan))
  }];
  return e.createElement(D, {
    rows: r.rows,
    columns: n
  })
}

function E({
  list: r,
  filter: n,
  onFilterChange: o,
  wards: l
}) {
  let s = N(() => {
      if (!r || !r.rows) return [];
      let i = (n.search || "").trim().toLowerCase();
      return r.rows.filter(p => !(n.ward && p.ward !== n.ward || n.maxScore != null && p.completeness.score > n.maxScore || i && !(String(p.an) + " " + String(p.hn) + " " + String(p.pt_name)).toLowerCase().includes(i)))
    }, [r, n]),
    u = [{
      key: "an",
      label: "AN"
    }, {
      key: "hn",
      label: "HN"
    }, {
      key: "pt_name",
      label: "\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
      wrap: !0
    }, {
      key: "ward",
      label: "\u0E41\u0E1C\u0E19\u0E01",
      render: i => i.ward_name || i.ward
    }, {
      key: "dchdate",
      label: "\u0E27\u0E31\u0E19\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22"
    }, {
      key: "los_days",
      label: "LOS",
      num: !0
    }, {
      key: "score",
      label: "Score",
      num: !0,
      render: i => e.createElement(h, {
        color: m(i.completeness.score)
      }, i.completeness.score, "%")
    }, {
      key: "flags",
      label: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E02\u0E32\u0E14",
      render: i => {
        let p = [];
        return i.completeness.pdx || p.push("PDx"), i.completeness.dch_summary || p.push("Disch.Sum"), i.completeness.nurse_notes || p.push("Nurse"), i.completeness.dch_plan || p.push("Plan"), p.length === 0 ? e.createElement(h, {
          color: t.green
        }, "\u0E04\u0E23\u0E1A") : p.map(f => e.createElement("span", {
          key: f,
          style: {
            marginRight: 3
          }
        }, e.createElement(h, {
          color: t.red
        }, f)))
      }
    }];
  return e.createElement(e.Fragment, null, e.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 10,
      alignItems: "center"
    }
  }, e.createElement("input", {
    type: "text",
    value: n.search || "",
    onChange: i => o({
      ...n,
      search: i.target.value
    }),
    placeholder: "\u{1F50E} \u0E04\u0E49\u0E19 AN / HN / \u0E0A\u0E37\u0E48\u0E2D\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22",
    style: {
      flex: "1 1 220px",
      minWidth: 200,
      padding: "8px 12px",
      borderRadius: 8,
      border: `1px solid ${t.border}`,
      background: t.surface,
      color: t.textPrimary,
      fontSize: 12,
      fontFamily: "inherit"
    }
  }), e.createElement("select", {
    value: n.ward || "",
    onChange: i => o({
      ...n,
      ward: i.target.value
    }),
    style: {
      padding: "8px 12px",
      borderRadius: 8,
      border: `1px solid ${t.border}`,
      background: t.surface,
      color: t.textPrimary,
      fontSize: 12,
      fontFamily: "inherit"
    }
  }, e.createElement("option", {
    value: ""
  }, "\u0E17\u0E38\u0E01\u0E41\u0E1C\u0E19\u0E01"), (l || []).map(i => e.createElement("option", {
    key: i.ward,
    value: i.ward
  }, i.ward_name, " (", i.ward, ")"))), e.createElement("select", {
    value: n.maxScore == null ? "" : String(n.maxScore),
    onChange: i => o({
      ...n,
      maxScore: i.target.value === "" ? null : parseInt(i.target.value, 10)
    }),
    style: {
      padding: "8px 12px",
      borderRadius: 8,
      border: `1px solid ${t.border}`,
      background: t.surface,
      color: t.textPrimary,
      fontSize: 12,
      fontFamily: "inherit"
    }
  }, e.createElement("option", {
    value: ""
  }, "\u0E17\u0E38\u0E01 Score"), e.createElement("option", {
    value: "0"
  }, "Score = 0%"), e.createElement("option", {
    value: "25"
  }, "Score \u2264 25%"), e.createElement("option", {
    value: "50"
  }, "Score \u2264 50%"), e.createElement("option", {
    value: "75"
  }, "Score < 75%"), e.createElement("option", {
    value: "99"
  }, "Score < 100%")), e.createElement("span", {
    style: {
      fontSize: 11,
      color: t.textTertiary,
      marginLeft: "auto"
    }
  }, a(s.length), " / ", a(r.rows.length), " \u0E23\u0E32\u0E22")), e.createElement(D, {
    rows: s.slice(0, 200),
    columns: u
  }), s.length > 200 && e.createElement("div", {
    style: {
      fontSize: 10,
      color: t.textTertiary,
      fontStyle: "italic",
      textAlign: "right",
      marginTop: 6
    }
  }, "\u0E41\u0E2A\u0E14\u0E07 200 \u0E08\u0E32\u0E01 ", a(s.length), " \u0E23\u0E32\u0E22 \u2014 \u0E01\u0E23\u0E2D\u0E07\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E08\u0E33\u0E01\u0E31\u0E14"))
}

function V() {
  let [r, n] = _({
    summary: null,
    trend: null,
    defects: null,
    byDept: null,
    byDoctor: null,
    list: null
  }), [o, l] = _(!0), [s, u] = _(null), [i, p] = _("content_completeness"), [f, S] = _({
    ward: "",
    search: "",
    maxScore: null
  }), y = A(() => {
    l(!0), u(null), Promise.all([b("/api/mr-audit/summary?days=30"), b("/api/mr-audit/trend?months=12"), b("/api/mr-audit/defect-categories?days=30"), b("/api/mr-audit/by-department?days=30"), b("/api/mr-audit/by-doctor?days=30"), b("/api/mr-audit/list?days=30&completeness_max=100&limit=500")]).then(([g, d, w, v, k, T]) => {
      n({
        summary: g,
        trend: d,
        defects: w,
        byDept: v,
        byDoctor: k,
        list: T
      }), l(!1)
    }).catch(g => {
      u(g.message), l(!1)
    })
  }, []);
  return C(() => {
    y()
  }, [y]), o ? e.createElement("div", {
    style: {
      padding: 60,
      textAlign: "center",
      color: t.textTertiary,
      fontSize: 13
    }
  }, e.createElement("div", {
    style: {
      display: "inline-block",
      width: 16,
      height: 16,
      border: `2px solid ${t.purple}`,
      borderRightColor: "transparent",
      borderRadius: "50%",
      animation: "spin 0.6s linear infinite",
      marginRight: 8,
      verticalAlign: "middle"
    }
  }), "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25 MRA\u2026", e.createElement("style", null, "@keyframes spin{to{transform:rotate(360deg)}}")) : s ? e.createElement("div", {
    style: {
      padding: 30,
      textAlign: "center",
      color: t.red,
      background: "rgba(220,38,38,.06)",
      border: `1px solid ${t.red}30`,
      borderRadius: 10
    }
  }, "\u274C \u0E42\u0E2B\u0E25\u0E14\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08: ", s, e.createElement("button", {
    onClick: y,
    style: {
      marginLeft: 12,
      padding: "5px 12px",
      borderRadius: 6,
      border: `1px solid ${t.red}`,
      background: "transparent",
      color: t.red,
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11
    }
  }, "\u0E25\u0E2D\u0E07\u0E43\u0E2B\u0E21\u0E48")) : e.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      fontFamily: "Kanit, Sarabun, Noto Sans Thai, sans-serif"
    }
  }, e.createElement(x, {
    icon: "\u{1F4CB}",
    label: "Medical Record Audit (MRA)",
    sub: "\u0E40\u0E01\u0E13\u0E11\u0E4C \u0E2A\u0E23\u0E1E./\u0E2A\u0E1B\u0E2A\u0E0A. \xB7 \u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E43\u0E19 (IPD) \xB7 \u0E43\u0E19\u0E23\u0E2D\u0E1A 30 \u0E27\u0E31\u0E19",
    color: t.purple
  }), e.createElement(L, {
    summary: r.summary
  }), e.createElement(x, {
    icon: "\u{1F4C8}",
    label: "\u0E41\u0E19\u0E27\u0E42\u0E19\u0E49\u0E21\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E21\u0E1A\u0E39\u0E23\u0E13\u0E4C\u0E23\u0E32\u0E22\u0E40\u0E14\u0E37\u0E2D\u0E19",
    sub: `12 \u0E40\u0E14\u0E37\u0E2D\u0E19\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07 \xB7 \u0E40\u0E17\u0E35\u0E22\u0E1A\u0E40\u0E1B\u0E49\u0E32 \u2265 ${z}%`,
    color: t.cyan
  }), e.createElement(F, {
    data: r.trend,
    metric: i,
    onMetricChange: p,
    target: z
  }), e.createElement(x, {
    icon: "\u{1F50D}",
    label: "\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E02\u0E49\u0E2D\u0E1A\u0E01\u0E1E\u0E23\u0E48\u0E2D\u0E07\u0E41\u0E22\u0E01\u0E2B\u0E21\u0E27\u0E14",
    sub: "Content (\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E2B\u0E32) vs Format (workflow / \u0E01\u0E32\u0E23\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19)",
    color: t.red
  }), e.createElement(B, {
    data: r.defects
  }), e.createElement(x, {
    icon: "\u{1F3E5}",
    label: "\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E32\u0E22\u0E41\u0E1C\u0E19\u0E01 / Ward",
    sub: "\u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E08\u0E33\u0E19\u0E27\u0E19\u0E1C\u0E39\u0E49\u0E1B\u0E48\u0E27\u0E22\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22",
    color: t.green
  }), e.createElement(H, {
    data: r.byDept
  }), e.createElement(x, {
    icon: "\u{1F468}\u200D\u2695\uFE0F",
    label: "\u0E2A\u0E23\u0E38\u0E1B\u0E23\u0E32\u0E22\u0E41\u0E1E\u0E17\u0E22\u0E4C \u2014 Top 50",
    sub: "\u2265 3 \u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E43\u0E19 30 \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E23\u0E35\u0E22\u0E07\u0E15\u0E32\u0E21\u0E08\u0E33\u0E19\u0E27\u0E19",
    color: t.emerald
  }), e.createElement(O, {
    data: r.byDoctor
  }), e.createElement(x, {
    icon: "\u26A0\uFE0F",
    label: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E27\u0E0A\u0E23\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E15\u0E49\u0E2D\u0E07\u0E41\u0E01\u0E49\u0E44\u0E02",
    sub: "\u0E04\u0E49\u0E19\u0E2B\u0E32 / \u0E01\u0E23\u0E2D\u0E07\u0E23\u0E32\u0E22\u0E41\u0E1C\u0E19\u0E01 / \u0E01\u0E23\u0E2D\u0E07 Score",
    color: t.amber
  }), e.createElement(E, {
    list: r.list,
    filter: f,
    onFilterChange: S,
    wards: r.byDept ? r.byDept.rows : []
  }), e.createElement("div", {
    style: {
      fontSize: 10,
      color: t.textTertiary,
      fontStyle: "italic",
      textAlign: "right",
      marginTop: 4
    }
  }, "\u0E17\u0E35\u0E48\u0E21\u0E32: HOSxP XE (ipt + ipt_discharge + iptdiag + ipd_nurse_note + asm_discharge_planning) + sidecar mr_audit_status \xB7 \u0E01\u0E23\u0E2D\u0E1A\u0E40\u0E27\u0E25\u0E32 30 \u0E27\u0E31\u0E19 \xB7 \u0E40\u0E01\u0E13\u0E11\u0E4C \u0E2A\u0E23\u0E1E./\u0E2A\u0E1B\u0E2A\u0E0A."))
}
var K = V;
export {
  K as
  default
};