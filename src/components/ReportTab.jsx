// ============================================================
// BCH 360° Intelligence V.10 — Report Tab
// รายงานจำนวนผู้ป่วยในเปรียบเทียบปีงบประมาณ
// ============================================================
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PTStaffReport, { usePTStaffData } from './reports/PTStaffReport';

const FISCAL_MONTHS = [
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
];

function fmt(v, d = 0) {
  if (v == null || v === '' || isNaN(v)) return '—';
  return Number(v).toLocaleString('th-TH', { minimumFractionDigits: d, maximumFractionDigits: d });
}

export default function ReportTab() {
  const [reportType, setReportType] = useState('opd-compare');
  const [ipdData, setIpdData] = useState(null);
  const [opdData, setOpdData] = useState(null);
  const [resourceData, setResourceData] = useState(null);
  const [resOpdMonthly, setResOpdMonthly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);

  // Default: current FY vs previous FY
  const now = new Date();
  const cm = now.getMonth() + 1;
  const cy = now.getFullYear();
  const defaultFY2 = cm >= 10 ? cy + 544 : cy + 543;
  const defaultFY1 = defaultFY2 - 1;

  const [fy1, setFy1] = useState(defaultFY1);
  const [fy2, setFy2] = useState(defaultFY2);

  // Sub-sheet selector: onepage (infographic) | overview (summary) | data (tables)
  const [sheet, setSheet] = useState('onepage');

  const fetchIPDCompare = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/report/ipd-compare?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setIpdData(d);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  const fetchOPDCompare = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/report/opd-compare?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setOpdData(d);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  const fetchResourceUsage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/report/resource-usage?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setResourceData(d);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  const fetchResOpdMonthly = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/report/resource-opd-monthly?fy1=${fy1}&fy2=${fy2}&_t=${Date.now()}`, {
        credentials: 'include',
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      setResOpdMonthly(d);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, [fy1, fy2]);

  // PT/Staff date range derived from FY2 (Oct 1 of fy2-543 → today).
  // PT/Staff use ?start=&end= instead of ?fy1=&fy2= because they're patient-level.
  const ptStaffRange = useMemo(() => {
    const ceY = fy2 - 543; // BE → CE
    const start = `${ceY - 1}-10-01`;
    const today = new Date();
    const end = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    return { start, end };
  }, [fy2]);

  const ptMode = reportType === 'staff-services' ? 'staff-services' : 'pt';
  const ptStaffHook = usePTStaffData(ptMode, ptStaffRange.start, ptStaffRange.end);

  useEffect(() => {
    if (reportType === 'ipd-compare') fetchIPDCompare();
    else if (reportType === 'opd-compare') fetchOPDCompare();
    else if (reportType === 'resource-opd') fetchResOpdMonthly();
    else if (reportType === 'resource-ipd') fetchResourceUsage();
    else if (reportType === 'pt' || reportType === 'staff-services') {
      // PT/Staff data fetch — uses usePTStaffData hook with date range
      ptStaffHook.load();
    }
  }, [reportType, fetchIPDCompare, fetchOPDCompare, fetchResourceUsage, fetchResOpdMonthly, ptStaffHook]);

  // Determine which months of fy2 have data for the subtitle
  const fy2DataMonths = useMemo(() => {
    if (!ipdData?.comparison) return '';
    const months = ipdData.comparison.filter(c => c.fy2.has_data).map(c => c.month);
    if (months.length === 0) return '';
    return `(${months[0]} - ${months[months.length - 1]} ${fy2})`;
  }, [ipdData, fy2]);

  // Print handler
  const handlePrint = useCallback(() => {
    const printContent = tableRef.current;
    if (!printContent) return;
    const win = window.open('', '_blank');
    win.document.write(`
      <html><head><title>รายงานผู้ป่วยใน ${fy1}-${fy2}</title>
      <style>
        body { font-family: 'Kanit', 'Segoe UI', sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; font-size: 11px; }
        th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: center; }
        th { font-weight: 700; }
        .header-fy1 { background: #dbeafe; }
        .header-fy2 { background: #fce7f3; }
        .header-growth { background: #dcfce7; }
        .row-total { background: #e0f2fe; font-weight: 800; }
        .negative { color: #dc2626; }
        .positive { color: #16a34a; }
        @media print { body { margin: 0; } }
      </style></head><body>${printContent.outerHTML}</body></html>
    `);
    win.document.close();
    win.print();
  }, [fy1, fy2]);

  // CSV export
  const handleExport = useCallback(() => {
    if (reportType === 'ipd-compare') {
      if (!ipdData?.comparison) return;
      const cols = [
        'เดือน',
        'จำนวน Admit (ปีงบ ' + fy1 + ')',
        'วันนอน',
        'วันนอนเฉลี่ย',
        'อัตราครองเตียง',
        'เตียงที่ใช้จริง',
        'Sum AdjRW',
        'CMI',
        'จำนวน Admit (ปีงบ ' + fy2 + ')',
        'วันนอน',
        'วันนอนเฉลี่ย',
        'อัตราครองเตียง',
        'เตียงที่ใช้จริง',
        'Sum AdjRW',
        'CMI',
        'เติบโต %',
        'ส่วนต่าง Admit',
      ];

      const rows = ipdData.comparison.map(c => [
        c.month,
        c.fy1.admits,
        c.fy1.total_los,
        c.fy1.alos,
        c.fy1.occupancy_rate,
        c.fy1.active_beds,
        c.fy1.sum_adjrw,
        c.fy1.cmi,
        c.fy2.admits,
        c.fy2.total_los,
        c.fy2.alos,
        c.fy2.occupancy_rate,
        c.fy2.active_beds,
        c.fy2.sum_adjrw,
        c.fy2.cmi,
        c.growth_pct + '%',
        c.admit_diff,
      ]);

      const t1 = ipdData.fy1_totals;
      const t2 = ipdData.fy2_totals;
      rows.push([
        'รวม',
        t1.admits,
        t1.total_los,
        t1.alos,
        t1.occupancy_rate,
        t1.active_beds,
        t1.sum_adjrw,
        t1.cmi,
        t2.admits,
        t2.total_los,
        t2.alos,
        t2.occupancy_rate,
        t2.active_beds,
        t2.sum_adjrw,
        t2.cmi,
        ipdData.overall_growth_pct + '%',
        ipdData.overall_admit_diff,
      ]);

      const csv = '\uFEFF' + [cols.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BCH360_IPD_Compare_${fy1}_${fy2}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (reportType === 'resource-opd') {
      if (!resOpdMonthly?.comparison) return;
      const cols = [
        'เดือน',
        `Lab ครั้ง (${fy1})`, `Lab บาท (${fy1})`,
        `Drug ครั้ง (${fy1})`, `Drug บาท (${fy1})`,
        `Xray ครั้ง (${fy1})`, `Xray บาท (${fy1})`,
        `Lab ครั้ง (${fy2})`, `Lab บาท (${fy2})`,
        `Drug ครั้ง (${fy2})`, `Drug บาท (${fy2})`,
        `Xray ครั้ง (${fy2})`, `Xray บาท (${fy2})`,
        'จำนวน %', 'มูลค่า %',
      ];
      const rows = resOpdMonthly.comparison.map(c => {
        const m1 = c.fy1, m2 = c.fy2;
        return [
          c.month,
          m1.lab_orders, m1.lab_price, m1.drug_orders, m1.drug_price, m1.xray_orders, m1.xray_price,
          m2.lab_orders, m2.lab_price, m2.drug_orders, m2.drug_price, m2.xray_orders, m2.xray_price,
          '', '',
        ];
      });
      const csv = '\uFEFF' + [cols.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BCH360_Resource_OPD_Monthly_${fy1}_${fy2}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    if (reportType === 'resource-ipd') {
      if (!resourceData) return;
      const level = 'inpatient';
      const cols = [
        'รายการ',
        `จำนวนที่สั่ง ปีงบ ${fy1}`,
        `Total Price ปีงบ ${fy1}`,
        `จำนวนที่สั่ง ปีงบ ${fy2}`,
        `Total Price ปีงบ ${fy2}`,
        'Growth Orders %',
        'Growth Price %',
      ];

      const categories = ['Lab', 'Drug', 'CT / X-ray'];
      const rows = [];
      for (const cat of categories) {
        const r1 = resourceData[level][cat]?.fy1 || { orders: 0, total_price: 0 };
        const r2 = resourceData[level][cat]?.fy2 || { orders: 0, total_price: 0 };
        const growthOrd = r1.orders > 0
          ? Math.round(((r2.orders - r1.orders) / r1.orders) * 100) : 0;
        const growthPrice = r1.total_price > 0
          ? Math.round(((r2.total_price - r1.total_price) / Math.abs(r1.total_price)) * 100) : 0;
        rows.push([cat, r1.orders, r1.total_price, r2.orders, r2.total_price, `${growthOrd}%`, `${growthPrice}%`]);
      }

      const csv = '\uFEFF' + [cols.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BCH360_Resource_IPD_${fy1}_${fy2}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [reportType, ipdData, resourceData, resOpdMonthly, fy1, fy2]);

  // ── FY selector options ──
  const fyOptions = useMemo(() => {
    const opts = [];
    for (let y = defaultFY2; y >= defaultFY2 - 2; y--) opts.push(y);
    return opts;
  }, [defaultFY2]);

  // ── Styles ──
  const S = {
    th: {
      padding: '8px 10px',
      fontSize: '12px',
      fontWeight: 800,
      textAlign: 'center',
      whiteSpace: 'nowrap',
      borderBottom: '2px solid var(--md-border)',
      color: 'var(--md-text-primary)',
    },
    td: {
      padding: '7px 10px',
      fontSize: '12px',
      fontWeight: 600,
      textAlign: 'center',
      borderBottom: '1px solid var(--md-border)',
      color: 'var(--md-text-primary)',
    },
    tdNum: {
      padding: '7px 10px',
      fontSize: '12px',
      fontWeight: 600,
      textAlign: 'right',
      borderBottom: '1px solid var(--md-border)',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--md-text-primary)',
    },
    fy1Bg: 'rgba(59,130,246,.06)',
    fy2Bg: 'rgba(236,72,153,.06)',
    growthBg: 'rgba(34,197,94,.06)',
    totalBg: 'rgba(14,165,233,.08)',
  };

  return (
    <div className="space-y-5 animate-fade-in pb-10">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div
          style={{
            width: '4px',
            height: '24px',
            background: 'linear-gradient(180deg, #0284c7, #7c3aed)',
            borderRadius: '99px',
          }}
        />
        <h2
          style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}
        >
          REPORT Online โรงพยาบาลบ้านฉาง
        </h2>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '99px',
            background: 'rgba(2,132,199,.1)',
            color: '#0284c7',
          }}
        >
          {reportType === 'ipd-compare'
            ? 'จำนวนผู้ป่วยใน (IPD)'
            : reportType === 'opd-compare'
              ? 'จำนวนผู้ป่วยนอก (OPD)'
              : reportType === 'resource-opd'
                ? 'ทรัพยากร ผู้ป่วยนอก (Lab/Drug/CT-Xray)'
                : 'ทรัพยากร ผู้ป่วยใน (Lab/Drug/CT-Xray)'}
        </span>
      </div>

      {/* Controls */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: 'var(--md-surface)',
          border: '1px solid var(--md-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)' }}>
          เลือกรายงาน
        </span>
        <select
          value={reportType}
          onChange={e => setReportType(e.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid var(--md-border)',
            fontSize: '13px',
            fontWeight: 700,
            background: 'var(--md-surface)',
            color: 'var(--md-text-primary)',
          }}
        >
          <option value="opd-compare">จำนวนผู้ป่วยนอก (OPD)</option>
          <option value="ipd-compare">จำนวนผู้ป่วยใน (IPD)</option>
          <option value="resource-opd">ทรัพยากร ผู้ป่วยนอก (Lab/Drug/CT-Xray)</option>
          <option value="resource-ipd">ทรัพยากร ผู้ป่วยใน (Lab/Drug/CT-Xray)</option>
          <option value="pt">รายงานกายภาพบำบัด และ PMC</option>
          <option value="staff-services">รายงานการรับบริการของบุคลากร</option>
        </select>

        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)' }}>
          ปีงบประมาณ
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <select
            value={fy1}
            onChange={e => setFy1(Number(e.target.value))}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--md-border)',
              fontSize: '13px',
              fontWeight: 700,
              background: 'var(--md-surface)',
              color: 'var(--md-text-primary)',
            }}
          >
            {fyOptions.map(y => (
              <option key={y} value={y}>
                ปีงบ {y}
              </option>
            ))}
          </select>
          <span style={{ fontWeight: 800, color: 'var(--md-text-tertiary)' }}>vs</span>
          <select
            value={fy2}
            onChange={e => setFy2(Number(e.target.value))}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--md-border)',
              fontSize: '13px',
              fontWeight: 700,
              background: 'var(--md-surface)',
              color: 'var(--md-text-primary)',
            }}
          >
            {fyOptions.map(y => (
              <option key={y} value={y}>
                ปีงบ {y}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() =>
            reportType === 'ipd-compare' ? fetchIPDCompare()
              : reportType === 'opd-compare' ? fetchOPDCompare()
                : reportType === 'resource-opd' ? fetchResOpdMonthly()
                  : fetchResourceUsage()
          }
          disabled={loading}
          style={{
            padding: '6px 16px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 800,
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #0284c7, #7c3aed)',
            color: '#fff',
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Loading...' : 'โหลดข้อมูล'}
        </button>

        <button
          onClick={handlePrint}
          disabled={reportType === 'ipd-compare' ? !ipdData : reportType === 'opd-compare' ? !opdData : reportType === 'resource-opd' ? !resOpdMonthly : !resourceData}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid var(--md-border)',
            background: 'var(--md-surface)',
            color: 'var(--md-text-secondary)',
            cursor: 'pointer',
          }}
        >
          Print
        </button>
        <button
          onClick={handleExport}
          disabled={reportType === 'ipd-compare' ? !ipdData : reportType === 'opd-compare' ? !opdData : reportType === 'resource-opd' ? !resOpdMonthly : !resourceData}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid var(--md-border)',
            background: 'var(--md-surface)',
            color: 'var(--md-text-secondary)',
            cursor: 'pointer',
          }}
        >
          CSV
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(239,68,68,.08)',
            color: '#dc2626',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <div
          className="rounded-2xl p-8 animate-pulse"
          style={{
            background: 'var(--md-surface)',
            border: '1px solid var(--md-border)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>
            กำลังโหลดรายงาน...
          </div>
        </div>
      )}

      {/* ── Sub-sheet tabs: Onepage (infographic) · Overview · ข้อมูล ────── */}
      <div
        role="tablist"
        aria-label="มุมมองรายงาน"
        style={{
          display: 'flex',
          gap: '6px',
          padding: '4px',
          borderRadius: '12px',
          background: 'var(--md-surface-2, rgba(0,0,0,.04))',
          border: '1px solid var(--md-border)',
          width: 'fit-content',
        }}
      >
        {[
          { id: 'onepage', label: 'One Page', icon: '📄', hint: 'สรุป infographic' },
          { id: 'overview', label: 'Overview', icon: '📊', hint: 'สรุป KPI' },
          { id: 'data', label: 'ข้อมูล', icon: '📋', hint: 'ตารางรายละเอียด' },
        ].map(s => {
          const active = sheet === s.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSheet(s.id)}
              title={s.hint}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                background: active ? 'linear-gradient(135deg, #0284c7, #7c3aed)' : 'transparent',
                color: active ? '#fff' : 'var(--md-text-secondary)',
                boxShadow: active ? '0 2px 6px rgba(124,58,237,.25)' : 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all .15s ease',
              }}
            >
              <span aria-hidden="true">{s.icon}</span>
              {s.label}
            </button>
          );
        })}
      </div>

      {/* ── PT/Staff Reports — patient-level, no FY-comparison sheets ──
          Bypasses One Page / Overview / Data sheets — renders own structure
          (KPI grid + breakdowns + daily trend + patient table). */}
      {(reportType === 'pt' || reportType === 'staff-services') && (
        <div style={{ marginTop: '12px' }}>
          {ptStaffHook.loading && (
            <div style={{ padding: '32px', textAlign: 'center',
              color: 'var(--md-text-tertiary)' }}>
              กำลังโหลดข้อมูล...
            </div>
          )}
          {ptStaffHook.error && (
            <div style={{ padding: '16px', borderRadius: '12px',
              background: 'rgba(239,68,68,.08)', color: '#dc2626',
              border: '1px solid rgba(239,68,68,.2)' }}>
              ❌ {ptStaffHook.error}
            </div>
          )}
          {!ptStaffHook.loading && !ptStaffHook.error && (
            <PTStaffReport
              data={ptStaffHook.data}
              mode={reportType}
              displayLimit={100}
            />
          )}
        </div>
      )}

      {/* ── Sheet 1: ONE PAGE (infographic) ─────────────────────────────── */}
      {!loading && sheet === 'onepage' && (() => {
        // Resolve active dataset + helpers for the infographic
        const anyData = reportType === 'ipd-compare' ? ipdData
          : reportType === 'opd-compare' ? opdData
          : reportType === 'resource-opd' ? resOpdMonthly
          : resourceData;
        if (!anyData) {
          return (
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', color: 'var(--md-text-tertiary)', fontSize: '13px', fontWeight: 600 }}
            >
              ยังไม่มีข้อมูล — กดปุ่ม &ldquo;โหลดข้อมูล&rdquo; ด้านบน
            </div>
          );
        }

        const reportTitle =
          reportType === 'ipd-compare' ? 'สรุปรายงานผู้ป่วยใน (IPD)'
          : reportType === 'opd-compare' ? 'สรุปรายงานผู้ป่วยนอก (OPD)'
          : reportType === 'resource-opd' ? 'สรุปการใช้ทรัพยากรผู้ป่วยนอก (Lab · Drug · CT/X-ray)'
          : 'สรุปการใช้ทรัพยากรผู้ป่วยใน (Lab · Drug · CT/X-ray)';
        const subtitle = `เปรียบเทียบปีงบประมาณ ${fy1} กับ ${fy2}` +
          (anyData.comparable_months ? ` · ข้อมูล ${anyData.comparable_months} เดือน` : '');

        // ── Tile primitive (big stat) ──
        const Tile = ({ label, value, sub, accent = '#0284c7', icon }) => (
          <div
            style={{
              padding: '18px',
              borderRadius: '14px',
              border: '1px solid var(--md-border)',
              background: 'var(--md-surface)',
              boxShadow: 'var(--md-shadow-sm)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${accent}14, transparent 60%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '11px', fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '.05em' }}>
              <span aria-hidden="true" style={{ fontSize: '18px' }}>{icon}</span>
              {label}
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900, color: 'var(--md-text-primary)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '4px' }}>{sub}</div>}
          </div>
        );

        // ── Growth pill ──
        const Growth = ({ pct, label }) => {
          const up = pct >= 0;
          const color = up ? '#16a34a' : '#dc2626';
          const arrow = pct > 0 ? '▲' : pct < 0 ? '▼' : '—';
          return (
            <div
              style={{
                padding: '16px',
                borderRadius: '14px',
                border: `1px solid ${color}33`,
                background: `${color}0c`,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '.05em' }}>
                {label || 'การเปลี่ยนแปลง'}
              </div>
              <div style={{ fontSize: '28px', fontWeight: 900, color, lineHeight: 1 }}>
                {arrow} {Math.abs(pct)}%
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>
                FY{fy2} vs FY{fy1}
              </div>
            </div>
          );
        };

        // ── Content per report type ──
        let section1 = null, section2 = null;

        if (reportType === 'ipd-compare' && ipdData?.fy1_totals && ipdData?.fy2_totals) {
          const t1 = ipdData.fy1_totals, t2 = ipdData.fy2_totals;
          const g = ipdData.overall_growth_pct || 0;
          const diff = ipdData.overall_admit_diff || 0;

          // Find top month (highest admits fy2)
          const monthData = (ipdData.comparison || []).filter(c => c.fy2?.has_data ?? c.fy2?.admits > 0);
          const topMonth = monthData.length ? monthData.reduce((a, b) => (b.fy2.admits > a.fy2.admits ? b : a)) : null;
          const biggestMover = monthData.length ? monthData.reduce((a, b) => (Math.abs(b.growth_pct) > Math.abs(a.growth_pct) ? b : a)) : null;

          section1 = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <Tile icon="🏥" label={`Admit ปีงบ ${fy2}`} value={fmt(t2.admits)} sub={`ปีงบ ${fy1}: ${fmt(t1.admits)} ราย`} accent="#db2777" />
              <Tile icon="🛏️" label="อัตราครองเตียง" value={`${fmt(t2.occupancy_rate, 1)}%`} sub={`เตียงรวม: ${fmt(ipdData.total_beds)} · ใช้จริง ${fmt(t2.active_beds, 1)}`} accent="#0284c7" />
              <Tile icon="📅" label="ALOS (วันนอนเฉลี่ย)" value={fmt(t2.alos, 2)} sub={`วันนอนรวม: ${fmt(t2.total_los)}`} accent="#7c3aed" />
              <Tile icon="⚖️" label="CMI / AdjRW" value={fmt(t2.cmi, 3)} sub={`Sum AdjRW: ${fmt(t2.sum_adjrw, 0)}`} accent="#0d9488" />
            </div>
          );

          section2 = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <Growth pct={g} label="อัตราการเติบโตของ Admit" />
              <div style={{ padding: '16px', borderRadius: '14px', border: '1px solid var(--md-border)', background: 'var(--md-surface)', boxShadow: 'var(--md-shadow-sm)' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>
                  📌 ส่วนต่าง Admit (ปี)
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: diff >= 0 ? '#16a34a' : '#dc2626', fontVariantNumeric: 'tabular-nums' }}>
                  {diff > 0 ? '+' : ''}{fmt(diff)} ราย
                </div>
                <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '4px' }}>รวมทุกเดือนที่เปรียบเทียบได้</div>
              </div>
              {topMonth && (
                <div style={{ padding: '16px', borderRadius: '14px', border: '1px solid var(--md-border)', background: 'var(--md-surface)', boxShadow: 'var(--md-shadow-sm)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>
                    🏆 เดือน Admit สูงสุด
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{topMonth.month}</div>
                  <div style={{ fontSize: '12px', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>{fmt(topMonth.fy2.admits)} ราย</div>
                </div>
              )}
              {biggestMover && (
                <div style={{ padding: '16px', borderRadius: '14px', border: '1px solid var(--md-border)', background: 'var(--md-surface)', boxShadow: 'var(--md-shadow-sm)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#db2777', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>
                    🎯 เดือนที่เปลี่ยนแปลงมากที่สุด
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{biggestMover.month}</div>
                  <div style={{ fontSize: '12px', color: biggestMover.growth_pct >= 0 ? '#16a34a' : '#dc2626', marginTop: '2px', fontWeight: 700 }}>
                    {biggestMover.growth_pct > 0 ? '▲' : '▼'} {Math.abs(biggestMover.growth_pct)}%
                  </div>
                </div>
              )}
            </div>
          );
        } else if (reportType === 'opd-compare' && opdData?.fy1_totals && opdData?.fy2_totals) {
          const t1 = opdData.fy1_totals, t2 = opdData.fy2_totals;
          const visitsGrowth = t1.visits > 0 ? Math.round(((t2.visits - t1.visits) / t1.visits) * 100) : 0;
          const revGrowth = t1.revenue > 0 ? Math.round(((t2.revenue - t1.revenue) / t1.revenue) * 100) : 0;
          const monthData = (opdData.comparison || []).filter(c => c.fy2?.visits > 0);
          const topMonth = monthData.length ? monthData.reduce((a, b) => (b.fy2.visits > a.fy2.visits ? b : a)) : null;

          section1 = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <Tile icon="👥" label={`Visits ปีงบ ${fy2}`} value={fmt(t2.visits)} sub={`ปีงบ ${fy1}: ${fmt(t1.visits)} ครั้ง`} accent="#0284c7" />
              <Tile icon="🧑" label={`ผู้ป่วยรวม ปีงบ ${fy2}`} value={fmt(t2.patients)} sub={`Visits/คน: ${t2.patients > 0 ? (t2.visits / t2.patients).toFixed(2) : '—'}`} accent="#7c3aed" />
              <Tile icon="💰" label={`รายได้ ปีงบ ${fy2}`} value={`฿${fmt(t2.revenue)}`} sub={`ปีงบ ${fy1}: ฿${fmt(t1.revenue)}`} accent="#16a34a" />
              <Tile icon="📈" label="รายได้เฉลี่ย/ครั้ง" value={`฿${fmt(t2.avg_income, 0)}`} sub={`ปีงบ ${fy1}: ฿${fmt(t1.avg_income, 0)}`} accent="#db2777" />
            </div>
          );

          section2 = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <Growth pct={visitsGrowth} label="การเติบโต Visits" />
              <Growth pct={revGrowth} label="การเติบโตรายได้" />
              {topMonth && (
                <div style={{ padding: '16px', borderRadius: '14px', border: '1px solid var(--md-border)', background: 'var(--md-surface)', boxShadow: 'var(--md-shadow-sm)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>
                    🏆 เดือน Visits สูงสุด
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{topMonth.month}</div>
                  <div style={{ fontSize: '12px', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>{fmt(topMonth.fy2.visits)} ครั้ง</div>
                </div>
              )}
            </div>
          );
        } else if (reportType === 'resource-opd' && resOpdMonthly?.fy1_totals && resOpdMonthly?.fy2_totals) {
          const t1 = resOpdMonthly.fy1_totals, t2 = resOpdMonthly.fy2_totals;
          const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : a > 0 ? 100 : 0;
          const labG = pct(t2.lab_orders, t1.lab_orders);
          const drugG = pct(t2.drug_orders, t1.drug_orders);
          const xrayG = pct(t2.xray_orders, t1.xray_orders);
          const totalOrd2 = t2.lab_orders + t2.drug_orders + t2.xray_orders;
          const totalPrice2 = t2.lab_price + t2.drug_price + t2.xray_price;

          section1 = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <Tile icon="🧪" label={`Lab · ${fy2}`} value={fmt(t2.lab_orders)} sub={`มูลค่า: ฿${fmt(t2.lab_price)}`} accent="#0284c7" />
              <Tile icon="💊" label={`Drug · ${fy2}`} value={fmt(t2.drug_orders)} sub={`มูลค่า: ฿${fmt(t2.drug_price)}`} accent="#7c3aed" />
              <Tile icon="🩻" label={`CT/X-ray · ${fy2}`} value={fmt(t2.xray_orders)} sub={`มูลค่า: ฿${fmt(t2.xray_price)}`} accent="#db2777" />
              <Tile icon="💰" label="มูลค่ารวม" value={`฿${fmt(totalPrice2)}`} sub={`สั่งรวม: ${fmt(totalOrd2)} ครั้ง`} accent="#16a34a" />
            </div>
          );

          section2 = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <Growth pct={labG} label="Lab orders" />
              <Growth pct={drugG} label="Drug orders" />
              <Growth pct={xrayG} label="CT/X-ray orders" />
            </div>
          );
        } else if (reportType === 'resource-ipd' && resourceData?.inpatient) {
          const lv = resourceData.inpatient;
          const lab1 = lv.Lab?.fy1 || { orders: 0, total_price: 0 };
          const lab2 = lv.Lab?.fy2 || { orders: 0, total_price: 0 };
          const drug1 = lv.Drug?.fy1 || { orders: 0, total_price: 0 };
          const drug2 = lv.Drug?.fy2 || { orders: 0, total_price: 0 };
          const xray1 = lv['CT / X-ray']?.fy1 || { orders: 0, total_price: 0 };
          const xray2 = lv['CT / X-ray']?.fy2 || { orders: 0, total_price: 0 };
          const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : a > 0 ? 100 : 0;
          const totalPrice2 = lab2.total_price + drug2.total_price + xray2.total_price;
          const totalOrd2 = lab2.orders + drug2.orders + xray2.orders;

          section1 = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <Tile icon="🧪" label={`Lab · ${fy2}`} value={fmt(lab2.orders)} sub={`มูลค่า: ฿${fmt(lab2.total_price)}`} accent="#0284c7" />
              <Tile icon="💊" label={`Drug · ${fy2}`} value={fmt(drug2.orders)} sub={`มูลค่า: ฿${fmt(drug2.total_price)}`} accent="#7c3aed" />
              <Tile icon="🩻" label={`CT/X-ray · ${fy2}`} value={fmt(xray2.orders)} sub={`มูลค่า: ฿${fmt(xray2.total_price)}`} accent="#db2777" />
              <Tile icon="💰" label="มูลค่ารวม" value={`฿${fmt(totalPrice2)}`} sub={`สั่งรวม: ${fmt(totalOrd2)} ครั้ง`} accent="#16a34a" />
            </div>
          );

          section2 = (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <Growth pct={pct(lab2.orders, lab1.orders)} label="Lab orders" />
              <Growth pct={pct(drug2.orders, drug1.orders)} label="Drug orders" />
              <Growth pct={pct(xray2.orders, xray1.orders)} label="CT/X-ray orders" />
            </div>
          );
        }

        return (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', boxShadow: 'var(--md-shadow-sm)' }}
          >
            {/* Gradient title strip */}
            <div
              style={{
                padding: '18px 22px',
                background: 'linear-gradient(135deg, rgba(2,132,199,.08), rgba(124,58,237,.08))',
                borderBottom: '2px solid var(--md-border)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                {reportTitle} · โรงพยาบาลบ้านฉาง
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                {subtitle}
              </div>
            </div>

            {/* Two-column sections */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '18px', padding: '20px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '10px' }}>
                  SECTION 1 · ภาพรวมสถิติ (OVERVIEW &amp; VOLUME)
                </div>
                {section1 || <div style={{ fontSize: '12px', color: 'var(--md-text-tertiary)' }}>รอข้อมูล</div>}
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '10px' }}>
                  SECTION 2 · ประเด็นสำคัญ (HIGHLIGHTS &amp; TRENDS)
                </div>
                {section2 || <div style={{ fontSize: '12px', color: 'var(--md-text-tertiary)' }}>รอข้อมูล</div>}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '10px 22px',
                borderTop: '1px solid var(--md-border)',
                background: 'linear-gradient(90deg, rgba(2,132,199,.04), rgba(124,58,237,.04))',
                fontSize: '10px',
                color: 'var(--md-text-tertiary)',
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>BCH 360° Intelligence · One-Page Summary</span>
              <span>{anyData?.timestamp && new Date(anyData.timestamp).toLocaleString('th-TH')}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Sheet 2: OVERVIEW (quick KPI cards) ─────────────────────────── */}
      {!loading && sheet === 'overview' && (() => {
        const anyData = reportType === 'ipd-compare' ? ipdData
          : reportType === 'opd-compare' ? opdData
          : reportType === 'resource-opd' ? resOpdMonthly
          : resourceData;
        if (!anyData) {
          return (
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', color: 'var(--md-text-tertiary)', fontSize: '13px', fontWeight: 600 }}
            >
              ยังไม่มีข้อมูล — กดปุ่ม &ldquo;โหลดข้อมูล&rdquo; ด้านบน
            </div>
          );
        }

        // Build KPI rows per report type
        const rows = [];
        if (reportType === 'ipd-compare' && ipdData?.fy1_totals && ipdData?.fy2_totals) {
          const t1 = ipdData.fy1_totals, t2 = ipdData.fy2_totals;
          rows.push(
            { label: 'Admit',      fy1: fmt(t1.admits),            fy2: fmt(t2.admits),            growth: ipdData.overall_growth_pct },
            { label: 'วันนอนรวม',  fy1: fmt(t1.total_los),         fy2: fmt(t2.total_los) },
            { label: 'ALOS',       fy1: fmt(t1.alos, 2),           fy2: fmt(t2.alos, 2) },
            { label: 'Occupancy',  fy1: `${fmt(t1.occupancy_rate, 1)}%`, fy2: `${fmt(t2.occupancy_rate, 1)}%` },
            { label: 'Active Bed', fy1: fmt(t1.active_beds, 1),    fy2: fmt(t2.active_beds, 1) },
            { label: 'Sum AdjRW',  fy1: fmt(t1.sum_adjrw, 0),      fy2: fmt(t2.sum_adjrw, 0) },
            { label: 'CMI',        fy1: fmt(t1.cmi, 3),            fy2: fmt(t2.cmi, 3) },
          );
        } else if (reportType === 'opd-compare' && opdData?.fy1_totals && opdData?.fy2_totals) {
          const t1 = opdData.fy1_totals, t2 = opdData.fy2_totals;
          const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : 0;
          rows.push(
            { label: 'Visits',             fy1: fmt(t1.visits),   fy2: fmt(t2.visits),   growth: pct(t2.visits, t1.visits) },
            { label: 'ผู้ป่วย (Patients)',  fy1: fmt(t1.patients), fy2: fmt(t2.patients), growth: pct(t2.patients, t1.patients) },
            { label: 'รายได้ (บาท)',        fy1: fmt(t1.revenue),  fy2: fmt(t2.revenue),  growth: pct(t2.revenue, t1.revenue) },
            { label: 'รายได้/ครั้ง',        fy1: fmt(t1.avg_income, 0), fy2: fmt(t2.avg_income, 0) },
          );
        } else if (reportType === 'resource-opd' && resOpdMonthly?.fy1_totals && resOpdMonthly?.fy2_totals) {
          const t1 = resOpdMonthly.fy1_totals, t2 = resOpdMonthly.fy2_totals;
          const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : 0;
          rows.push(
            { label: 'Lab — ครั้ง',        fy1: fmt(t1.lab_orders),   fy2: fmt(t2.lab_orders),   growth: pct(t2.lab_orders, t1.lab_orders) },
            { label: 'Lab — มูลค่า (บาท)',  fy1: fmt(t1.lab_price),    fy2: fmt(t2.lab_price),    growth: pct(t2.lab_price, t1.lab_price) },
            { label: 'Drug — ครั้ง',       fy1: fmt(t1.drug_orders),  fy2: fmt(t2.drug_orders),  growth: pct(t2.drug_orders, t1.drug_orders) },
            { label: 'Drug — มูลค่า (บาท)', fy1: fmt(t1.drug_price),   fy2: fmt(t2.drug_price),   growth: pct(t2.drug_price, t1.drug_price) },
            { label: 'Xray — ครั้ง',       fy1: fmt(t1.xray_orders),  fy2: fmt(t2.xray_orders),  growth: pct(t2.xray_orders, t1.xray_orders) },
            { label: 'Xray — มูลค่า (บาท)', fy1: fmt(t1.xray_price),   fy2: fmt(t2.xray_price),   growth: pct(t2.xray_price, t1.xray_price) },
          );
        } else if (reportType === 'resource-ipd' && resourceData?.inpatient) {
          const lv = resourceData.inpatient;
          const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : 0;
          ['Lab', 'Drug', 'CT / X-ray'].forEach(cat => {
            const r1 = lv[cat]?.fy1 || { orders: 0, total_price: 0 };
            const r2 = lv[cat]?.fy2 || { orders: 0, total_price: 0 };
            rows.push(
              { label: `${cat} — ครั้ง`,       fy1: fmt(r1.orders),      fy2: fmt(r2.orders),      growth: pct(r2.orders, r1.orders) },
              { label: `${cat} — มูลค่า (บาท)`, fy1: fmt(r1.total_price), fy2: fmt(r2.total_price), growth: pct(r2.total_price, r1.total_price) },
            );
          });
        }

        return (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', boxShadow: 'var(--md-shadow-sm)' }}
          >
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '2px solid var(--md-border)',
                background: 'linear-gradient(135deg, rgba(2,132,199,.04), rgba(124,58,237,.04))',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--md-text-primary)' }}>Overview · สรุปตัวเลขรวม</div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                ปีงบ {fy1} vs {fy2}{anyData.comparable_months ? ` · ${anyData.comparable_months} เดือน` : ''}
              </div>
            </div>
            <div style={{ padding: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ ...S.th, textAlign: 'left' }}>รายการ</th>
                    <th style={{ ...S.th, background: S.fy1Bg, color: '#2563eb' }}>ปีงบ {fy1}</th>
                    <th style={{ ...S.th, background: S.fy2Bg, color: '#db2777' }}>ปีงบ {fy2}</th>
                    <th style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>เปลี่ยนแปลง</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                      <td style={{ ...S.td, textAlign: 'left', fontWeight: 700 }}>{r.label}</td>
                      <td style={S.tdNum}>{r.fy1}</td>
                      <td style={S.tdNum}>{r.fy2}</td>
                      <td style={{ ...S.tdNum, fontWeight: 800, color: r.growth == null ? 'var(--md-text-tertiary)' : r.growth >= 0 ? '#16a34a' : '#dc2626' }}>
                        {r.growth == null ? '—' : `${r.growth > 0 ? '▲' : r.growth < 0 ? '▼' : ''} ${Math.abs(r.growth)}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* ── Sheet 3: DATA (detailed tables) ─────────────────────────────── */}
      {!loading && sheet === 'data' && reportType === 'ipd-compare' && ipdData?.comparison && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--md-surface)',
            border: '1px solid var(--md-border)',
            boxShadow: 'var(--md-shadow-sm)',
          }}
        >
          <div ref={tableRef} style={{ overflowX: 'auto' }}>
            {/* Title */}
            <div
              style={{
                padding: '16px 20px',
                textAlign: 'center',
                borderBottom: '2px solid var(--md-border)',
                background: 'linear-gradient(135deg, rgba(2,132,199,.04), rgba(124,58,237,.04))',
              }}
            >
              <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                {ipdData.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--md-text-tertiary)',
                  marginTop: '4px',
                }}
              >
                {fy2DataMonths && `${ipdData.fiscal_years.fy2.label} ${fy2DataMonths}`}
                {' · เตียงจริง: '}
                {ipdData.total_beds} เตียง
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1200px' }}>
              <thead>
                {/* Row 1: FY group headers */}
                <tr>
                  <th
                    rowSpan={2}
                    style={{
                      ...S.th,
                      width: '60px',
                      borderRight: '2px solid var(--md-border)',
                      position: 'sticky',
                      left: 0,
                      background: 'var(--md-surface)',
                      zIndex: 2,
                    }}
                  >
                    เดือน
                  </th>
                  <th
                    colSpan={7}
                    style={{
                      ...S.th,
                      background: S.fy1Bg,
                      color: '#2563eb',
                      borderRight: '2px solid var(--md-border)',
                    }}
                  >
                    ปี งบ {fy1}
                  </th>
                  <th
                    colSpan={7}
                    style={{
                      ...S.th,
                      background: S.fy2Bg,
                      color: '#db2777',
                      borderRight: '2px solid var(--md-border)',
                    }}
                  >
                    ปี งบ {fy2} {fy2DataMonths}
                  </th>
                  <th colSpan={2} style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>
                    เปรียบเทียบ
                  </th>
                </tr>
                {/* Row 2: Column headers */}
                <tr>
                  {[
                    'จำนวน Admit',
                    'วันนอน',
                    'วันนอนเฉลี่ย',
                    'อัตราครองเตียง',
                    'เตียงที่ใช้จริง\n(Actived Bed)',
                    'Sum AdjRW',
                    'CMI',
                  ].map((h, i) => (
                    <th
                      key={`fy1_${i}`}
                      style={{
                        ...S.th,
                        background: S.fy1Bg,
                        fontSize: '10px',
                        fontWeight: 700,
                        borderRight: i === 6 ? '2px solid var(--md-border)' : undefined,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                  {[
                    'จำนวน Admit',
                    'วันนอน',
                    'วันนอนเฉลี่ย',
                    'อัตราครองเตียง',
                    'เตียงที่ใช้จริง\n(Actived Bed)',
                    'Sum AdjRW',
                    'CMI',
                  ].map((h, i) => (
                    <th
                      key={`fy2_${i}`}
                      style={{
                        ...S.th,
                        background: S.fy2Bg,
                        fontSize: '10px',
                        fontWeight: 700,
                        borderRight: i === 6 ? '2px solid var(--md-border)' : undefined,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                  <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>
                    จำนวนผู้ป่วยใน
                    <br />
                    เติบโต
                  </th>
                  <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>
                    ส่วนต่าง
                    <br />
                    Admit
                  </th>
                </tr>
              </thead>
              <tbody>
                {ipdData.comparison.map((c, i) => (
                  <tr
                    key={i}
                    style={{
                      background:
                        i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))',
                    }}
                  >
                    <td
                      style={{
                        ...S.td,
                        fontWeight: 800,
                        position: 'sticky',
                        left: 0,
                        background:
                          i % 2 === 0 ? 'var(--md-surface)' : 'var(--md-surface-2, #f8fafc)',
                        zIndex: 1,
                        borderRight: '2px solid var(--md-border)',
                      }}
                    >
                      {c.month}
                    </td>
                    <td style={S.tdNum}>{fmt(c.fy1.admits)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.total_los)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.alos, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.occupancy_rate, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.active_beds, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.sum_adjrw, 2)}</td>
                    <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>
                      {fmt(c.fy1.cmi, 2)}
                    </td>
                    <td style={S.tdNum}>{fmt(c.fy2.admits)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.total_los)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.alos, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.occupancy_rate, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.active_beds, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.sum_adjrw, 2)}</td>
                    <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>
                      {fmt(c.fy2.cmi, 2)}
                    </td>
                    <td
                      style={{
                        ...S.tdNum,
                        fontWeight: 800,
                        color: c.growth_pct >= 0 ? '#16a34a' : '#dc2626',
                      }}
                    >
                      {c.growth_pct > 0 ? '▲' : c.growth_pct < 0 ? '▼' : ''} {Math.abs(c.growth_pct)}%
                    </td>
                    <td
                      style={{
                        ...S.tdNum,
                        fontWeight: 800,
                        color: c.admit_diff >= 0 ? '#16a34a' : '#dc2626',
                      }}
                    >
                      {c.admit_diff > 0 ? '▲' : c.admit_diff < 0 ? '▼' : ''}{' '}
                      {fmt(Math.abs(c.admit_diff))}
                    </td>
                  </tr>
                ))}

                <tr style={{ background: S.totalBg }}>
                  <td
                    style={{
                      ...S.td,
                      fontWeight: 900,
                      position: 'sticky',
                      left: 0,
                      background: 'rgba(14,165,233,.12)',
                      zIndex: 1,
                      borderRight: '2px solid var(--md-border)',
                      borderTop: '2px solid var(--md-border)',
                    }}
                  >
                    รวม
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.admits)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.total_los)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.alos, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.occupancy_rate, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.active_beds, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy1_totals.sum_adjrw, 2)}
                  </td>
                  <td
                    style={{
                      ...S.tdNum,
                      fontWeight: 900,
                      borderTop: '2px solid var(--md-border)',
                      borderRight: '2px solid var(--md-border)',
                    }}
                  >
                    {fmt(ipdData.fy1_totals.cmi, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.admits)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.total_los)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.alos, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.occupancy_rate, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.active_beds, 2)}
                  </td>
                  <td
                    style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}
                  >
                    {fmt(ipdData.fy2_totals.sum_adjrw, 2)}
                  </td>
                  <td
                    style={{
                      ...S.tdNum,
                      fontWeight: 900,
                      borderTop: '2px solid var(--md-border)',
                      borderRight: '2px solid var(--md-border)',
                    }}
                  >
                    {fmt(ipdData.fy2_totals.cmi, 2)}
                  </td>
                  <td
                    style={{
                      ...S.tdNum,
                      fontWeight: 900,
                      borderTop: '2px solid var(--md-border)',
                      color: ipdData.overall_growth_pct >= 0 ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {ipdData.overall_growth_pct > 0 ? '▲' : ipdData.overall_growth_pct < 0 ? '▼' : ''} {Math.abs(ipdData.overall_growth_pct)}%
                  </td>
                  <td
                    style={{
                      ...S.tdNum,
                      fontWeight: 900,
                      borderTop: '2px solid var(--md-border)',
                      color: ipdData.overall_admit_diff >= 0 ? '#16a34a' : '#dc2626',
                    }}
                  >
                    {ipdData.overall_admit_diff > 0 ? '▲' : ipdData.overall_admit_diff < 0 ? '▼' : ''}{' '}
                    {fmt(Math.abs(ipdData.overall_admit_diff))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '10px 20px',
              borderTop: '1px solid var(--md-border)',
              fontSize: '10px',
              color: 'var(--md-text-tertiary)',
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>BCH 360° Intelligence · HOSxP XE · ipt + an_stat</span>
            <span>{ipdData.timestamp && new Date(ipdData.timestamp).toLocaleString('th-TH')}</span>
          </div>
        </div>
      )}

      {/* ── OPD Compare Table ── */}
      {!loading && sheet === 'data' && reportType === 'opd-compare' && opdData?.comparison && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', boxShadow: 'var(--md-shadow-sm)' }}
        >
          <div ref={tableRef} style={{ overflowX: 'auto' }}>
            <div style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '2px solid var(--md-border)', background: 'linear-gradient(135deg, rgba(16,185,129,.04), rgba(59,130,246,.04))' }}>
              <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{opdData.title}</div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                {opdData.fiscal_years.fy2.label} · ข้อมูลเปรียบเทียบ {opdData.comparable_months} เดือน
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr>
                  <th rowSpan={2} style={{ ...S.th, width: '60px', borderRight: '2px solid var(--md-border)', position: 'sticky', left: 0, background: 'var(--md-surface)', zIndex: 2 }}>เดือน</th>
                  <th colSpan={4} style={{ ...S.th, background: S.fy1Bg, color: '#2563eb', borderRight: '2px solid var(--md-border)' }}>ปี งบ {fy1}</th>
                  <th colSpan={4} style={{ ...S.th, background: S.fy2Bg, color: '#0d9488', borderRight: '2px solid var(--md-border)' }}>ปี งบ {fy2}</th>
                  <th colSpan={2} style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>เปรียบเทียบ</th>
                </tr>
                <tr>
                  {['จำนวน Visit', 'ผู้ป่วย (UNQ)', 'รายได้', 'รายได้เฉลี่ย/Visit'].map((h, i) => (
                    <th key={`fy1_${i}`} style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', fontWeight: 700, borderRight: i === 3 ? '2px solid var(--md-border)' : undefined }}>{h}</th>
                  ))}
                  {['จำนวน Visit', 'ผู้ป่วย (UNQ)', 'รายได้', 'รายได้เฉลี่ย/Visit'].map((h, i) => (
                    <th key={`fy2_${i}`} style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', fontWeight: 700, borderRight: i === 3 ? '2px solid var(--md-border)' : undefined }}>{h}</th>
                  ))}
                  <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>จำนวน Visit<br />เติบโต</th>
                  <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>ส่วนต่าง<br />Visit</th>
                </tr>
              </thead>
              <tbody>
                {opdData.comparison.map((c, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                    <td style={{ ...S.td, fontWeight: 800, position: 'sticky', left: 0, background: i % 2 === 0 ? 'var(--md-surface)' : 'var(--md-surface-2, #f8fafc)', zIndex: 1, borderRight: '2px solid var(--md-border)' }}>{c.month}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.visits)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.patients)}</td>
                    <td style={S.tdNum}>{fmt(c.fy1.revenue)}</td>
                    <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>{fmt(c.fy1.avg_income, 2)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.visits)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.patients)}</td>
                    <td style={S.tdNum}>{fmt(c.fy2.revenue)}</td>
                    <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>{fmt(c.fy2.avg_income, 2)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 800, color: c.growth_pct >= 0 ? '#16a34a' : '#dc2626' }}>
                      {c.growth_pct > 0 ? '▲' : c.growth_pct < 0 ? '▼' : ''} {Math.abs(c.growth_pct)}%
                    </td>
                    <td style={{ ...S.tdNum, fontWeight: 800, color: c.visit_diff >= 0 ? '#16a34a' : '#dc2626' }}>
                      {c.visit_diff > 0 ? '▲' : c.visit_diff < 0 ? '▼' : ''} {fmt(Math.abs(c.visit_diff))}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr style={{ background: S.totalBg }}>
                  <td style={{ ...S.td, fontWeight: 900, position: 'sticky', left: 0, background: 'rgba(14,165,233,.12)', zIndex: 1, borderRight: '2px solid var(--md-border)', borderTop: '2px solid var(--md-border)' }}>รวม</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy1_totals.visits)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy1_totals.patients)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy1_totals.revenue)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', borderRight: '2px solid var(--md-border)' }}>{fmt(opdData.fy1_totals.avg_income, 2)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy2_totals.visits)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy2_totals.patients)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(opdData.fy2_totals.revenue)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', borderRight: '2px solid var(--md-border)' }}>{fmt(opdData.fy2_totals.avg_income, 2)}</td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: opdData.overall_growth_pct >= 0 ? '#16a34a' : '#dc2626' }}>
                    {opdData.overall_growth_pct > 0 ? '▲' : opdData.overall_growth_pct < 0 ? '▼' : ''} {Math.abs(opdData.overall_growth_pct)}%
                  </td>
                  <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: opdData.overall_visit_diff >= 0 ? '#16a34a' : '#dc2626' }}>
                    {opdData.overall_visit_diff > 0 ? '▲' : opdData.overall_visit_diff < 0 ? '▼' : ''} {fmt(Math.abs(opdData.overall_visit_diff))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 20px', borderTop: '1px solid var(--md-border)', fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            <span>BCH 360° Intelligence · HOSxP XE · vn_stat</span>
            <span>{opdData.timestamp && new Date(opdData.timestamp).toLocaleString('th-TH')}</span>
          </div>
        </div>
      )}

      {/* ── Resource OPD Monthly Table (ทรัพยากร ผู้ป่วยนอก — รายเดือน) ── */}
      {!loading && sheet === 'data' && reportType === 'resource-opd' && resOpdMonthly?.comparison && (() => {
        const d = resOpdMonthly;
        const t1 = d.fy1_totals;
        const t2 = d.fy2_totals;
        const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : a > 0 ? 100 : 0;

        // Totals for comparison row
        const t1TotalOrders = t1.lab_orders + t1.drug_orders + t1.xray_orders;
        const t1TotalPrice = t1.lab_price + t1.drug_price + t1.xray_price;
        const t2TotalOrders = t2.lab_orders + t2.drug_orders + t2.xray_orders;
        const t2TotalPrice = t2.lab_price + t2.drug_price + t2.xray_price;

        const border2 = '2px solid var(--md-border)';
        const border1 = '1px solid var(--md-border)';

        return (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: border1, boxShadow: 'var(--md-shadow-sm)' }}>
            <div ref={tableRef} style={{ overflowX: 'auto' }}>
              {/* Title */}
              <div style={{ padding: '16px 20px', textAlign: 'center', borderBottom: border2, background: 'linear-gradient(135deg, rgba(16,185,129,.05), rgba(59,130,246,.05))' }}>
                <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                  {d.title}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                  เปรียบเทียบ {d.comparable_months} เดือน
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1400px' }}>
                <thead>
                  {/* Row 1: FY group headers */}
                  <tr>
                    <th rowSpan={3} style={{ ...S.th, width: '55px', borderRight: border2, position: 'sticky', left: 0, background: 'var(--md-surface)', zIndex: 2 }}>
                      เดือน
                    </th>
                    <th colSpan={6} style={{ ...S.th, background: S.fy1Bg, color: '#2563eb', borderRight: border2 }}>
                      ปี งบ {fy1}
                    </th>
                    <th colSpan={6} style={{ ...S.th, background: S.fy2Bg, color: '#0d9488', borderRight: border2 }}>
                      ปี งบ {fy2}
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>
                      เปรียบเทียบ
                    </th>
                  </tr>
                  {/* Row 2: Category headers */}
                  <tr>
                    <th colSpan={2} style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', fontWeight: 700, borderRight: border1 }}>
                      Lab (ตรวจทางห้องปฏิบัติการ)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', fontWeight: 700, borderRight: border1 }}>
                      Drug (ยา)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', fontWeight: 700, borderRight: border2 }}>
                      CT / X-ray (รังสีวินิจฉัย)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', fontWeight: 700, borderRight: border1 }}>
                      Lab (ตรวจทางห้องปฏิบัติการ)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', fontWeight: 700, borderRight: border1 }}>
                      Drug (ยา)
                    </th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', fontWeight: 700, borderRight: border2 }}>
                      CT / X-ray (รังสีวินิจฉัย)
                    </th>
                    <th rowSpan={2} style={{ ...S.th, background: S.growthBg, fontSize: '9px', fontWeight: 700 }}>
                      จำนวน %
                    </th>
                    <th rowSpan={2} style={{ ...S.th, background: S.growthBg, fontSize: '9px', fontWeight: 700 }}>
                      มูลค่า %
                    </th>
                  </tr>
                  {/* Row 3: Sub-column headers */}
                  <tr>
                    {/* FY1 columns */}
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600, borderRight: border1 }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600, borderRight: border1 }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '9px', fontWeight: 600, borderRight: border2 }}>มูลค่า (บาท)</th>
                    {/* FY2 columns */}
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600, borderRight: border1 }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600, borderRight: border1 }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600 }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '9px', fontWeight: 600, borderRight: border2 }}>มูลค่า (บาท)</th>
                  </tr>
                </thead>
                <tbody>
                  {d.comparison.map((c, i) => {
                    const m1 = c.fy1, m2 = c.fy2;
                    const totalOrd1 = m1.lab_orders + m1.drug_orders + m1.xray_orders;
                    const totalPrice1 = m1.lab_price + m1.drug_price + m1.xray_price;
                    const totalOrd2 = m2.lab_orders + m2.drug_orders + m2.xray_orders;
                    const totalPrice2 = m2.lab_price + m2.drug_price + m2.xray_price;
                    const ordGrowth = pct(totalOrd2, totalOrd1);
                    const priceGrowth = pct(totalPrice2, totalPrice1);
                    const rowBg = i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))';
                    const stickyBg = i % 2 === 0 ? 'var(--md-surface)' : 'var(--md-surface-2, #f8fafc)';

                    return (
                      <tr key={i} style={{ background: rowBg }}>
                        <td style={{ ...S.td, fontWeight: 800, position: 'sticky', left: 0, background: stickyBg, zIndex: 1, borderRight: border2 }}>{c.month}</td>
                        {/* FY1: Lab */}
                        <td style={S.tdNum}>{m1.lab_orders ? fmt(m1.lab_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border1 }}>{m1.lab_price ? fmt(m1.lab_price) : ''}</td>
                        {/* FY1: Drug */}
                        <td style={S.tdNum}>{m1.drug_orders ? fmt(m1.drug_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border1 }}>{m1.drug_price ? fmt(m1.drug_price) : ''}</td>
                        {/* FY1: Xray */}
                        <td style={S.tdNum}>{m1.xray_orders ? fmt(m1.xray_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border2 }}>{m1.xray_price ? fmt(m1.xray_price) : ''}</td>
                        {/* FY2: Lab */}
                        <td style={S.tdNum}>{m2.lab_orders ? fmt(m2.lab_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border1 }}>{m2.lab_price ? fmt(m2.lab_price) : ''}</td>
                        {/* FY2: Drug */}
                        <td style={S.tdNum}>{m2.drug_orders ? fmt(m2.drug_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border1 }}>{m2.drug_price ? fmt(m2.drug_price) : ''}</td>
                        {/* FY2: Xray */}
                        <td style={S.tdNum}>{m2.xray_orders ? fmt(m2.xray_orders) : ''}</td>
                        <td style={{ ...S.tdNum, borderRight: border2 }}>{m2.xray_price ? fmt(m2.xray_price) : ''}</td>
                        {/* Comparison */}
                        <td style={{ ...S.tdNum, fontWeight: 800, color: ordGrowth >= 0 ? '#16a34a' : '#dc2626' }}>
                          {c.has_data ? `${ordGrowth > 0 ? '▲' : ordGrowth < 0 ? '▼' : ''} ${Math.abs(ordGrowth)}%` : ''}
                        </td>
                        <td style={{ ...S.tdNum, fontWeight: 800, color: priceGrowth >= 0 ? '#16a34a' : '#dc2626' }}>
                          {c.has_data ? `${priceGrowth > 0 ? '▲' : priceGrowth < 0 ? '▼' : ''} ${Math.abs(priceGrowth)}%` : ''}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Total Row (รวม) */}
                  <tr style={{ background: S.totalBg }}>
                    <td style={{ ...S.td, fontWeight: 900, position: 'sticky', left: 0, background: 'rgba(14,165,233,.12)', zIndex: 1, borderRight: border2, borderTop: border2 }}>รวม</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t1.lab_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border1 }}>{fmt(t1.lab_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t1.drug_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border1 }}>{fmt(t1.drug_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t1.xray_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border2 }}>{fmt(t1.xray_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t2.lab_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border1 }}>{fmt(t2.lab_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t2.drug_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border1 }}>{fmt(t2.drug_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2 }}>{fmt(t2.xray_orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, borderRight: border2 }}>{fmt(t2.xray_price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, color: d.overall_orders_growth_pct >= 0 ? '#16a34a' : '#dc2626' }}>
                      {d.overall_orders_growth_pct > 0 ? '▲' : d.overall_orders_growth_pct < 0 ? '▼' : ''} {Math.abs(d.overall_orders_growth_pct)}%
                    </td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: border2, color: d.overall_price_growth_pct >= 0 ? '#16a34a' : '#dc2626' }}>
                      {d.overall_price_growth_pct > 0 ? '▲' : d.overall_price_growth_pct < 0 ? '▼' : ''} {Math.abs(d.overall_price_growth_pct)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note */}
            {(fy1 <= 2567 || fy2 <= 2567) && (
              <div style={{ padding: '10px 20px', borderTop: border1, fontSize: '11px', fontWeight: 600, color: '#d97706', background: 'rgba(251,191,36,.06)' }}>
                หมายเหตุ: HOSxP บันทึก inc_drug ช่วง ก.ย.–พ.ย. 2566 สูงเกินจริง (~300 เท่า) — ระบบตัด outlier (inc_drug {'>'} 25,000) ออกอัตโนมัติ
              </div>
            )}

            {/* Footer */}
            <div style={{ padding: '10px 20px', borderTop: border1, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              <span>BCH 360° Intelligence · HOSxP XE · vn_stat (inc03 · inc_drug · inc04)</span>
              <span>{d.timestamp && new Date(d.timestamp).toLocaleString('th-TH')}</span>
            </div>
          </div>
        );
      })()}

      {/* ── Resource IPD Table (yearly summary — unchanged) ── */}
      {!loading && sheet === 'data' && reportType === 'resource-ipd' && resourceData && (() => {
        const level = 'inpatient';
        const levelTH = 'ผู้ป่วยใน (IPD)';
        const gradBg = 'linear-gradient(135deg, rgba(236,72,153,.05), rgba(251,146,60,.05))';
        const accentColor = '#db2777';
        const categories = ['Lab', 'Drug', 'CT / X-ray'];

        let totalFy1Orders = 0, totalFy1Price = 0, totalFy2Orders = 0, totalFy2Price = 0;
        const catRows = categories.map(cat => {
          const r1 = resourceData[level][cat]?.fy1 || { orders: 0, total_price: 0 };
          const r2 = resourceData[level][cat]?.fy2 || { orders: 0, total_price: 0 };
          totalFy1Orders += r1.orders;
          totalFy1Price += r1.total_price;
          totalFy2Orders += r2.orders;
          totalFy2Price += r2.total_price;
          const growthOrd = r1.orders > 0 ? Math.round(((r2.orders - r1.orders) / r1.orders) * 100) : r2.orders > 0 ? 100 : 0;
          const growthPrice = r1.total_price > 0 ? Math.round(((r2.total_price - r1.total_price) / Math.abs(r1.total_price)) * 100) : r2.total_price > 0 ? 100 : 0;
          return { cat, r1, r2, growthOrd, growthPrice };
        });
        const totalGrowthOrd = totalFy1Orders > 0 ? Math.round(((totalFy2Orders - totalFy1Orders) / totalFy1Orders) * 100) : 0;
        const totalGrowthPrice = totalFy1Price > 0 ? Math.round(((totalFy2Price - totalFy1Price) / Math.abs(totalFy1Price)) * 100) : 0;

        return (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', boxShadow: 'var(--md-shadow-sm)' }}>
            <div ref={tableRef} style={{ overflowX: 'auto' }}>
              <div style={{ padding: '16px 20px', textAlign: 'center', borderBottom: '2px solid var(--md-border)', background: gradBg }}>
                <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                  รายงานการใช้ทรัพยากรสำคัญในโรงพยาบาล — {levelTH}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '4px' }}>
                  เปรียบเทียบปีงบประมาณ {fy1} vs {fy2}
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                <thead>
                  <tr>
                    <th rowSpan={2} style={{ ...S.th, width: '140px', borderRight: '2px solid var(--md-border)' }}>รายการ</th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy1Bg, color: '#2563eb', borderRight: '2px solid var(--md-border)' }}>ปีงบ {fy1}</th>
                    <th colSpan={2} style={{ ...S.th, background: S.fy2Bg, color: accentColor, borderRight: '2px solid var(--md-border)' }}>ปีงบ {fy2}</th>
                    <th colSpan={2} style={{ ...S.th, background: S.growthBg, color: '#16a34a' }}>เปรียบเทียบ</th>
                  </tr>
                  <tr>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '10px' }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy1Bg, fontSize: '10px', borderRight: '2px solid var(--md-border)' }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '10px' }}>จำนวนที่สั่ง (ครั้ง)</th>
                    <th style={{ ...S.th, background: S.fy2Bg, fontSize: '10px', borderRight: '2px solid var(--md-border)' }}>มูลค่า (บาท)</th>
                    <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>จำนวน %</th>
                    <th style={{ ...S.th, background: S.growthBg, fontSize: '10px' }}>มูลค่า %</th>
                  </tr>
                </thead>
                <tbody>
                  {catRows.map((row, idx) => (
                    <tr key={row.cat} style={{ background: idx % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                      <td style={{ ...S.td, fontWeight: 800, borderRight: '2px solid var(--md-border)', textAlign: 'left', paddingLeft: '16px' }}>
                        {row.cat === 'Lab' ? 'Lab (ตรวจทางห้องปฏิบัติการ)' : row.cat === 'Drug' ? 'Drug (ยา)' : 'CT / X-ray (รังสีวินิจฉัย)'}
                      </td>
                      <td style={S.tdNum}>{fmt(row.r1.orders)}</td>
                      <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>{fmt(row.r1.total_price)}</td>
                      <td style={S.tdNum}>{fmt(row.r2.orders)}</td>
                      <td style={{ ...S.tdNum, borderRight: '2px solid var(--md-border)' }}>{fmt(row.r2.total_price)}</td>
                      <td style={{ ...S.tdNum, fontWeight: 800, color: row.growthOrd >= 0 ? '#16a34a' : '#dc2626' }}>
                        {row.growthOrd > 0 ? '▲' : row.growthOrd < 0 ? '▼' : ''} {Math.abs(row.growthOrd)}%
                      </td>
                      <td style={{ ...S.tdNum, fontWeight: 800, color: row.growthPrice >= 0 ? '#16a34a' : '#dc2626' }}>
                        {row.growthPrice > 0 ? '▲' : row.growthPrice < 0 ? '▼' : ''} {Math.abs(row.growthPrice)}%
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: S.totalBg }}>
                    <td style={{ ...S.td, fontWeight: 900, borderRight: '2px solid var(--md-border)', borderTop: '2px solid var(--md-border)', textAlign: 'left', paddingLeft: '16px' }}>รวมทั้งหมด</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(totalFy1Orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', borderRight: '2px solid var(--md-border)' }}>{fmt(totalFy1Price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(totalFy2Orders)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', borderRight: '2px solid var(--md-border)' }}>{fmt(totalFy2Price)}</td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: totalGrowthOrd >= 0 ? '#16a34a' : '#dc2626' }}>
                      {totalGrowthOrd > 0 ? '▲' : totalGrowthOrd < 0 ? '▼' : ''} {Math.abs(totalGrowthOrd)}%
                    </td>
                    <td style={{ ...S.tdNum, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: totalGrowthPrice >= 0 ? '#16a34a' : '#dc2626' }}>
                      {totalGrowthPrice > 0 ? '▲' : totalGrowthPrice < 0 ? '▼' : ''} {Math.abs(totalGrowthPrice)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ padding: '10px 20px', borderTop: '1px solid var(--md-border)', fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
              <span>BCH 360° Intelligence · HOSxP XE · an_stat (inc03 · inc12 · inc04)</span>
              <span>{resourceData.timestamp && new Date(resourceData.timestamp).toLocaleString('th-TH')}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
