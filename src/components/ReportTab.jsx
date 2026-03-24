// ============================================================
// BCH 360° Intelligence V.10 — Report Tab
// รายงานจำนวนผู้ป่วยในเปรียบเทียบปีงบประมาณ
// ============================================================
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

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

  useEffect(() => {
    if (reportType === 'ipd-compare') fetchIPDCompare();
    else if (reportType === 'opd-compare') fetchOPDCompare();
    else if (reportType === 'resource-opd') fetchResOpdMonthly();
    else if (reportType === 'resource-ipd') fetchResourceUsage();
  }, [reportType, fetchIPDCompare, fetchOPDCompare, fetchResourceUsage, fetchResOpdMonthly]);

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

      {/* Report Table */}
      {!loading && reportType === 'ipd-compare' && ipdData?.comparison && (
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
      {!loading && reportType === 'opd-compare' && opdData?.comparison && (
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
      {!loading && reportType === 'resource-opd' && resOpdMonthly?.comparison && (() => {
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
      {!loading && reportType === 'resource-ipd' && resourceData && (() => {
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
