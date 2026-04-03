// ============================================================
// BCH 360° Intelligence V.10 — Customer Insight Tab
// คัดกรองผู้รับบริการเบื้องต้น ตามหลักเกณฑ์ วิธีการ เงื่อนไข
// การขอรับค่าใช้จ่ายฯ — แสดง 3 ปีงบประมาณล่าสุด
// ============================================================
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import AIServerInsights from './shared/AIServerInsights.jsx';

function fmt(v, d = 0) {
  if (v == null || v === '' || isNaN(v)) return '—';
  return Number(v).toLocaleString('th-TH', { minimumFractionDigits: d, maximumFractionDigits: d });
}
function fmtPct(v) {
  if (v == null || isNaN(v)) return '—';
  return `${Number(v).toFixed(1)}%`;
}
function growthPct(cur, prev) { return prev > 0 ? Math.round(((cur - prev) / prev) * 100) : cur > 0 ? 100 : 0; }

async function safeJsonFetch(url, opts) {
  const r = await fetch(url, opts);
  const ct = r.headers.get('content-type') || '';
  if (!r.ok) {
    if (ct.includes('json')) { const b = await r.json(); throw new Error(b.error || `HTTP ${r.status}`); }
    throw new Error(`HTTP ${r.status}`);
  }
  if (!ct.includes('json')) throw new Error('เซิร์ฟเวอร์ไม่ตอบกลับ — กรุณาตรวจสอบว่า Backend ทำงานอยู่');
  return r.json();
}

const FY_COLORS = ['#94a3b8', '#7c3aed', '#0284c7']; // fy1(oldest)=grey, fy2=purple, fy3(latest)=blue
const PAYER_COLORS = ['#0284c7', '#7c3aed', '#db2777', '#ea580c', '#059669', '#d97706', '#4f46e5', '#0891b2', '#be123c', '#65a30d'];

function CustomerInsightTab() {
  const [data, setData] = useState(null);       // screening-summary (3 FY)
  const [trendData, setTrendData] = useState(null);
  const [dxData, setDxData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('overview');
  const [selectedPttype, setSelectedPttype] = useState(null);
  const [aiSegment, setAiSegment] = useState(null);
  const tableRef = useRef(null);

  // ── Fetch all data (3 FY auto-detected by backend) ──
  const fetchAll = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [summary, trend] = await Promise.all([
        safeJsonFetch(`/api/customer-insight/screening-summary?_t=${Date.now()}`, { credentials: 'include' }),
        safeJsonFetch(`/api/customer-insight/monthly-trend?_t=${Date.now()}`, { credentials: 'include' }),
      ]);
      setData(summary);
      setTrendData(trend);
      // AI Customer Segmentation (deferred)
      safeJsonFetch('/api/ai/customer/segmentation', { credentials: 'include' }).then(setAiSegment).catch(() => {});
    } catch (e) { setError(e.message); }
    setLoading(false);
  }, []);

  const fetchDiagnosis = useCallback(async (pttype) => {
    try {
      const pp = pttype ? `&pttype=${pttype}` : '';
      const dx = await safeJsonFetch(`/api/customer-insight/top-diagnosis?${pp}&_t=${Date.now()}`, { credentials: 'include' });
      setDxData(dx);
    } catch (e) { setError(e.message); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);
  useEffect(() => { if (activeView === 'diagnosis') fetchDiagnosis(selectedPttype); }, [activeView, selectedPttype, fetchDiagnosis]);

  // Fiscal year labels
  const fys = data?.fiscal_years || [];
  const fyLabels = fys.map(f => f.be);

  // ── Print ──
  const handlePrint = useCallback(() => {
    if (!tableRef.current) return;
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>Customer Insight — 3 ปีงบ</title>
      <style>body{font-family:Sarabun,sans-serif;padding:20px}table{border-collapse:collapse;width:100%;font-size:10px}
      th,td{border:1px solid #ccc;padding:3px 6px;text-align:right}th{background:#f0f4f8;font-weight:800}
      td:first-child,th:first-child{text-align:left}</style></head><body>`);
    win.document.write(tableRef.current.outerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  }, []);

  // ── CSV ──
  const handleExport = useCallback(() => {
    if (!data?.payers || fys.length < 3) return;
    const BOM = '\uFEFF';
    const cols = ['รหัสสิทธิ', 'ชื่อสิทธิ'];
    for (const fy of fys) cols.push(`${fy.be} OPD`, `${fy.be} IPD`, `${fy.be} รายได้`, `${fy.be} จัดเก็บ`, `${fy.be} ค้างชำระ`, `${fy.be} อัตราจัดเก็บ%`);
    cols.push('Growth %');
    const rows = data.payers.map(p => {
      const r = [p.pttype_code, p.pttype_name];
      for (const fy of fys) {
        const d = p.fys[fy.be];
        r.push(d.opd_visits, d.ipd_admissions, d.total_income, d.total_paid, d.total_outstanding, d.collection_rate);
      }
      r.push(p.income_growth);
      return r;
    });
    const csv = BOM + [cols, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `BCH360_CustomerInsight_3FY.csv`;
    a.click(); URL.revokeObjectURL(url);
  }, [data, fys]);

  // ── Styles ──
  const S = {
    th: { padding: '6px 8px', fontSize: '10px', fontWeight: 800, whiteSpace: 'nowrap', color: 'var(--md-text-secondary)', borderBottom: '2px solid var(--md-border)', textAlign: 'right' },
    td: { padding: '5px 8px', fontSize: '11px', fontWeight: 600, whiteSpace: 'nowrap', color: 'var(--md-text-primary)', borderBottom: '1px solid var(--md-border)', textAlign: 'right' },
    tdName: { padding: '5px 8px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', color: 'var(--md-text-primary)', borderBottom: '1px solid var(--md-border)', textAlign: 'left', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' },
    badge: (bg, color) => ({ fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '99px', background: bg, color }),
  };

  // ── KPI Card (with 3-FY mini trend) ──
  const KPICard = ({ label, icon, values, unit = '', accent = '#0284c7', reverse = false }) => {
    const latest = values[2]; const prev = values[1];
    const g = growthPct(latest, prev);
    const gColor = reverse ? (g <= 0 ? '#059669' : '#dc2626') : (g >= 0 ? '#059669' : '#dc2626');
    return (
      <div className="rounded-2xl p-4" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', flex: '1 1 200px', minWidth: '190px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '18px' }}>{icon}</span>
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>{label}</span>
        </div>
        <div style={{ fontSize: '20px', fontWeight: 900, color: accent }}>{fmt(latest)} <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{unit}</span></div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '6px', fontSize: '10px', fontWeight: 700 }}>
          {fyLabels.map((be, i) => (
            <span key={be} style={{ color: i === 2 ? accent : 'var(--md-text-tertiary)' }}>
              {be}: {fmt(values[i])}
            </span>
          ))}
        </div>
        {prev > 0 && (
          <div style={{ marginTop: '4px', fontSize: '10px', fontWeight: 800, color: gColor }}>
            {g >= 0 ? '+' : ''}{g}% vs ปีก่อน
          </div>
        )}
      </div>
    );
  };

  // ── Chart tooltip ──
  const ChartTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '10px', padding: '10px 14px', fontSize: '11px', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}>
        <div style={{ fontWeight: 800, marginBottom: '4px' }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
            <span style={{ fontWeight: 600, color: 'var(--md-text-secondary)' }}>{p.name}:</span>
            <span style={{ fontWeight: 800 }}>{fmt(p.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  // ── Growth badge ──
  const GrowthBadge = ({ value }) => {
    if (value == null || isNaN(value)) return null;
    const color = value >= 0 ? '#059669' : '#dc2626';
    return <span style={{ fontSize: '9px', fontWeight: 800, color }}>{value >= 0 ? '+' : ''}{value}%</span>;
  };

  return (
    <div className="space-y-5 animate-fade-in pb-10">
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #7c3aed, #0284c7)', borderRadius: '99px' }} />
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}>Customer Insight</h2>
        <span style={S.badge('rgba(124,58,237,.1)', '#7c3aed')}>คัดกรองผู้รับบริการ · หลักเกณฑ์การขอรับค่าใช้จ่ายฯ</span>
        {fys.length === 3 && (
          <span style={S.badge('rgba(2,132,199,.1)', '#0284c7')}>
            3 ปีงบ: {fyLabels[0]} · {fyLabels[1]} · {fyLabels[2]}
          </span>
        )}
      </div>

      {/* ── Controls ── */}
      <div className="rounded-2xl p-4" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)' }}>มุมมอง</span>
        {[
          { id: 'overview', label: 'ภาพรวม 3 ปีงบ' },
          { id: 'payer-detail', label: 'รายละเอียดสิทธิ' },
          { id: 'diagnosis', label: 'Top โรค / หัตถการ' },
        ].map(v => (
          <button key={v.id} onClick={() => setActiveView(v.id)}
            style={{
              padding: '5px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              border: activeView === v.id ? '1.5px solid #7c3aed' : '1px solid var(--md-border)',
              background: activeView === v.id ? 'rgba(124,58,237,.08)' : 'var(--md-surface)',
              color: activeView === v.id ? '#7c3aed' : 'var(--md-text-secondary)',
            }}
          >{v.label}</button>
        ))}
        <div style={{ width: '1px', height: '24px', background: 'var(--md-border)' }} />
        <button onClick={fetchAll} disabled={loading}
          style={{ padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 800, border: 'none', cursor: 'pointer', background: loading ? '#94a3b8' : 'linear-gradient(135deg, #7c3aed, #0284c7)', color: '#fff' }}
        >{loading ? 'กำลังโหลด...' : 'โหลดข้อมูล'}</button>
        <button onClick={handlePrint} disabled={!data} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: '1px solid var(--md-border)', cursor: 'pointer', background: 'var(--md-surface)', color: 'var(--md-text-secondary)' }}>Print</button>
        <button onClick={handleExport} disabled={!data} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: '1px solid var(--md-border)', cursor: 'pointer', background: 'var(--md-surface)', color: 'var(--md-text-secondary)' }}>CSV</button>
      </div>

      {error && <div className="rounded-xl p-3" style={{ background: 'rgba(220,38,38,.08)', border: '1px solid rgba(220,38,38,.2)', color: '#dc2626', fontSize: '13px', fontWeight: 700 }}>{error}</div>}
      {loading && <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>กำลังโหลดข้อมูล Customer Insight (3 ปีงบ)...</div>}

      {/* ━━━━━━━━━━━ OVERVIEW 3 FY ━━━━━━━━━━━ */}
      {!loading && data && fys.length === 3 && activeView === 'overview' && (() => {
        const gt = data.grand_totals;
        const vals = (field) => fys.map(f => gt[f.be]?.[field] || 0);

        // Chart data: monthly income comparison
        const chartData = (trendData?.comparison || []).map(c => {
          const row = { month: c.month };
          for (const fy of fys) {
            row[`fy${fy.be}`] = c[`fy${fy.be}`]?.income || 0;
          }
          return row;
        }).filter(r => fys.some(fy => r[`fy${fy.be}`] > 0));

        return (
          <>
            {/* KPI Cards */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <KPICard icon="👥" label="OPD Visits" values={vals('opd_visits')} unit="ครั้ง" accent="#0284c7" />
              <KPICard icon="🏥" label="IPD Admissions" values={vals('ipd_admissions')} unit="ครั้ง" accent="#7c3aed" />
              <KPICard icon="💰" label="รายได้รวม" values={vals('total_income')} unit="บาท" accent="#059669" />
              <KPICard icon="📊" label="อัตราจัดเก็บ" values={fys.map(f => gt[f.be]?.collection_rate || 0)} unit="%" accent="#0284c7" />
              <KPICard icon="🚩" label="สิทธิต้องติดตาม" values={[0, 0, data.flagged_count]} unit="สิทธิ" accent="#dc2626" />
            </div>

            {/* Monthly Income Trend — 3 FY line chart */}
            {chartData.length > 0 && (
              <div className="rounded-2xl p-5" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '12px' }}>
                  รายได้รายเดือน เปรียบเทียบ 3 ปีงบประมาณ
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={v => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} />
                    {fys.map((fy, i) => (
                      <Line key={fy.be} type="monotone" dataKey={`fy${fy.be}`} name={`ปีงบ ${fy.be}`}
                        stroke={FY_COLORS[i]} strokeWidth={i === 2 ? 3 : 1.5}
                        strokeDasharray={i === 0 ? '5 5' : undefined}
                        dot={{ r: i === 2 ? 4 : 2 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* ── 3-FY Payer Screening Table ── */}
            <div className="rounded-2xl" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', overflow: 'hidden' }} ref={tableRef}>
              <div style={{ padding: '14px 20px', borderBottom: '2px solid var(--md-border)', background: 'linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                  คัดกรองผู้รับบริการ แยกตามสิทธิ — เปรียบเทียบ 3 ปีงบประมาณ ({fyLabels.join(' · ')})
                </div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                  หลักเกณฑ์ วิธีการ เงื่อนไข การขอรับค่าใช้จ่ายฯ · สิทธิที่อัตราจัดเก็บ &lt;80% (ปีงบล่าสุด) จะถูก Flag
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    {/* Row 1: FY group headers */}
                    <tr style={{ background: 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                      <th rowSpan={2} style={{ ...S.th, textAlign: 'left', paddingLeft: '14px', borderRight: '2px solid var(--md-border)', verticalAlign: 'bottom' }}>สิทธิ</th>
                      {fys.map((fy, i) => (
                        <th key={fy.be} colSpan={4} style={{ ...S.th, textAlign: 'center', borderRight: '2px solid var(--md-border)', background: `${FY_COLORS[i]}10`, color: FY_COLORS[i], fontSize: '11px' }}>
                          ปีงบ {fy.be}
                        </th>
                      ))}
                      <th rowSpan={2} style={{ ...S.th, textAlign: 'center', verticalAlign: 'bottom' }}>Growth</th>
                      <th rowSpan={2} style={{ ...S.th, textAlign: 'center', verticalAlign: 'bottom' }}>สถานะ</th>
                    </tr>
                    {/* Row 2: sub-headers per FY */}
                    <tr style={{ background: 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                      {fys.map(fy => (
                        <React.Fragment key={fy.be}>
                          <th style={{ ...S.th, fontSize: '9px' }}>ครั้ง</th>
                          <th style={{ ...S.th, fontSize: '9px' }}>รายได้</th>
                          <th style={{ ...S.th, fontSize: '9px' }}>ค้างชำระ</th>
                          <th style={{ ...S.th, fontSize: '9px', borderRight: '2px solid var(--md-border)' }}>จัดเก็บ%</th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.payers.map((p, idx) => {
                      const isFlagged = p.flag_low_collection || p.flag_high_outstanding;
                      const rowBg = isFlagged ? 'rgba(220,38,38,.04)' : idx % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))';
                      return (
                        <tr key={p.pttype_code} style={{ background: rowBg }}>
                          <td style={{ ...S.tdName, paddingLeft: '14px', borderRight: '2px solid var(--md-border)' }}>
                            <span style={{ fontWeight: 800 }}>{p.pttype_code}</span>
                            <span style={{ marginLeft: '4px', fontWeight: 600, color: 'var(--md-text-secondary)', fontSize: '10px' }}>{p.pttype_name}</span>
                          </td>
                          {fys.map(fy => {
                            const d = p.fys[fy.be];
                            return (
                              <React.Fragment key={fy.be}>
                                <td style={S.td}>{fmt(d.opd_visits + d.ipd_admissions)}</td>
                                <td style={{ ...S.td, fontWeight: 700 }}>{fmt(d.total_income)}</td>
                                <td style={{ ...S.td, color: d.total_outstanding > 0 ? '#dc2626' : 'inherit' }}>{fmt(d.total_outstanding)}</td>
                                <td style={{ ...S.td, fontWeight: 800, borderRight: '2px solid var(--md-border)', color: d.collection_rate >= 90 ? '#059669' : d.collection_rate >= 80 ? '#d97706' : d.total_income > 0 ? '#dc2626' : 'inherit' }}>
                                  {d.total_income > 0 ? fmtPct(d.collection_rate) : '—'}
                                </td>
                              </React.Fragment>
                            );
                          })}
                          <td style={{ ...S.td, textAlign: 'center' }}><GrowthBadge value={p.income_growth} /></td>
                          <td style={{ ...S.td, textAlign: 'center' }}>
                            {isFlagged
                              ? <span style={S.badge('rgba(220,38,38,.1)', '#dc2626')}>ติดตาม</span>
                              : <span style={S.badge('rgba(5,150,105,.1)', '#059669')}>ปกติ</span>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr style={{ background: 'rgba(14,165,233,.06)' }}>
                      <td style={{ ...S.td, textAlign: 'left', paddingLeft: '14px', fontWeight: 900, borderRight: '2px solid var(--md-border)', borderTop: '2px solid var(--md-border)' }}>รวมทั้งหมด</td>
                      {fys.map(fy => {
                        const t = gt[fy.be];
                        return (
                          <React.Fragment key={fy.be}>
                            <td style={{ ...S.td, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(t.opd_visits + t.ipd_admissions)}</td>
                            <td style={{ ...S.td, fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>{fmt(t.total_income)}</td>
                            <td style={{ ...S.td, fontWeight: 900, borderTop: '2px solid var(--md-border)', color: '#dc2626' }}>{fmt(t.total_outstanding)}</td>
                            <td style={{ ...S.td, fontWeight: 900, borderRight: '2px solid var(--md-border)', borderTop: '2px solid var(--md-border)', color: t.collection_rate >= 80 ? '#059669' : '#dc2626' }}>
                              {fmtPct(t.collection_rate)}
                            </td>
                          </React.Fragment>
                        );
                      })}
                      <td style={{ ...S.td, textAlign: 'center', fontWeight: 900, borderTop: '2px solid var(--md-border)' }}>
                        <GrowthBadge value={growthPct(gt[fys[2].be]?.total_income, gt[fys[1].be]?.total_income)} />
                      </td>
                      <td style={{ ...S.td, borderTop: '2px solid var(--md-border)' }} />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </>
        );
      })()}

      {/* ━━━━━━━━━━━ PAYER DETAIL ━━━━━━━━━━━ */}
      {!loading && data && fys.length === 3 && activeView === 'payer-detail' && (() => {
        // Bar chart: top 12 payers income across 3 FYs
        const topPayers = data.payers.filter(p => p._sort_income > 0).slice(0, 12);
        const chartData = topPayers.map(p => {
          const row = { name: p.pttype_code };
          for (const fy of fys) row[`fy${fy.be}`] = p.fys[fy.be].total_income;
          return row;
        });

        return (
          <>
            <div className="rounded-2xl p-5" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '12px' }}>
                รายได้ตามสิทธิ (Top 12) — 3 ปีงบเปรียบเทียบ
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700 }} interval={0} angle={-30} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 700 }} />
                  {fys.map((fy, i) => (
                    <Bar key={fy.be} dataKey={`fy${fy.be}`} name={`ปีงบ ${fy.be}`} fill={FY_COLORS[i]} radius={[3, 3, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Payer Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '12px' }}>
              {data.payers.filter(p => p._sort_income > 0).slice(0, 20).map((p, i) => {
                const isFlagged = p.flag_low_collection || p.flag_high_outstanding;
                const latest = p.fys[fys[2].be];
                return (
                  <div key={p.pttype_code} className="rounded-2xl p-4" style={{ background: 'var(--md-surface)', border: isFlagged ? '1.5px solid rgba(220,38,38,.3)' : '1px solid var(--md-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: PAYER_COLORS[i % PAYER_COLORS.length] }}>{p.pttype_code}</span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-secondary)', marginLeft: '6px' }}>{p.pttype_name}</span>
                      </div>
                      {isFlagged
                        ? <span style={S.badge('rgba(220,38,38,.1)', '#dc2626')}>ติดตาม</span>
                        : <span style={S.badge('rgba(5,150,105,.1)', '#059669')}>ปกติ</span>
                      }
                    </div>
                    {/* 3-FY mini table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: '3px 4px', fontWeight: 700, color: 'var(--md-text-tertiary)', borderBottom: '1px solid var(--md-border)' }}>ปีงบ</th>
                          <th style={{ textAlign: 'right', padding: '3px 4px', fontWeight: 700, color: 'var(--md-text-tertiary)', borderBottom: '1px solid var(--md-border)' }}>ครั้ง</th>
                          <th style={{ textAlign: 'right', padding: '3px 4px', fontWeight: 700, color: 'var(--md-text-tertiary)', borderBottom: '1px solid var(--md-border)' }}>รายได้</th>
                          <th style={{ textAlign: 'right', padding: '3px 4px', fontWeight: 700, color: 'var(--md-text-tertiary)', borderBottom: '1px solid var(--md-border)' }}>ค้างชำระ</th>
                          <th style={{ textAlign: 'right', padding: '3px 4px', fontWeight: 700, color: 'var(--md-text-tertiary)', borderBottom: '1px solid var(--md-border)' }}>จัดเก็บ%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fys.map((fy, fi) => {
                          const d = p.fys[fy.be];
                          return (
                            <tr key={fy.be} style={{ fontWeight: fi === 2 ? 800 : 600 }}>
                              <td style={{ textAlign: 'left', padding: '3px 4px', color: FY_COLORS[fi] }}>{fy.be}</td>
                              <td style={{ textAlign: 'right', padding: '3px 4px' }}>{fmt(d.opd_visits + d.ipd_admissions)}</td>
                              <td style={{ textAlign: 'right', padding: '3px 4px' }}>{fmt(d.total_income)}</td>
                              <td style={{ textAlign: 'right', padding: '3px 4px', color: d.total_outstanding > 0 ? '#dc2626' : 'inherit' }}>{fmt(d.total_outstanding)}</td>
                              <td style={{ textAlign: 'right', padding: '3px 4px', color: d.collection_rate >= 90 ? '#059669' : d.collection_rate >= 80 ? '#d97706' : '#dc2626' }}>
                                {d.total_income > 0 ? fmtPct(d.collection_rate) : '—'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div style={{ marginTop: '6px', fontSize: '10px', fontWeight: 800 }}>
                      <span style={{ color: 'var(--md-text-tertiary)' }}>Growth: </span>
                      <GrowthBadge value={p.income_growth} />
                      {latest.ipd_avg_rw > 0 && <span style={{ marginLeft: '10px', color: 'var(--md-text-tertiary)' }}>Avg RW: <b style={{ color: 'var(--md-text-primary)' }}>{latest.ipd_avg_rw.toFixed(2)}</b></span>}
                      {latest.ipd_avg_los > 0 && <span style={{ marginLeft: '10px', color: 'var(--md-text-tertiary)' }}>LOS: <b style={{ color: 'var(--md-text-primary)' }}>{latest.ipd_avg_los.toFixed(1)}d</b></span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      })()}

      {/* ━━━━━━━━━━━ DIAGNOSIS ━━━━━━━━━━━ */}
      {!loading && activeView === 'diagnosis' && (
        <>
          <div className="rounded-2xl p-4" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-secondary)' }}>กรองตามสิทธิ</span>
            <select value={selectedPttype || ''} onChange={e => setSelectedPttype(e.target.value || null)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '12px', fontWeight: 700, background: 'var(--md-surface)', color: 'var(--md-text-primary)' }}
            >
              <option value="">ทุกสิทธิ</option>
              {(data?.payers || []).map(p => (
                <option key={p.pttype_code} value={p.pttype_code}>{p.pttype_code} — {p.pttype_name}</option>
              ))}
            </select>
          </div>
          {dxData?.diagnoses && (
            <div className="rounded-2xl" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '2px solid var(--md-border)', background: 'linear-gradient(135deg, rgba(124,58,237,.04), rgba(2,132,199,.04))' }}>
                <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                  Top โรค/หัตถการ — ปีงบ {dxData.fiscal_year?.be || fyLabels[2]}
                  {selectedPttype && <span style={{ ...S.badge('rgba(124,58,237,.1)', '#7c3aed'), marginLeft: '8px' }}>สิทธิ: {selectedPttype}</span>}
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                      <th style={{ ...S.th, textAlign: 'center', width: '36px' }}>#</th>
                      <th style={{ ...S.th, textAlign: 'left' }}>ICD-10</th>
                      <th style={{ ...S.th, textAlign: 'left' }}>ชื่อโรค/หัตถการ</th>
                      <th style={S.th}>ครั้ง</th>
                      <th style={S.th}>คน</th>
                      <th style={S.th}>รายได้</th>
                      <th style={S.th}>ค้างชำระ</th>
                      <th style={S.th}>จัดเก็บ%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dxData.diagnoses.map((dx, i) => (
                      <tr key={dx.icd10} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))' }}>
                        <td style={{ ...S.td, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>{i + 1}</td>
                        <td style={{ ...S.td, textAlign: 'left', fontWeight: 800, fontFamily: 'monospace' }}>{dx.icd10}</td>
                        <td style={S.tdName}>{dx.name}</td>
                        <td style={S.td}>{fmt(dx.visits)}</td>
                        <td style={S.td}>{fmt(dx.patients)}</td>
                        <td style={S.td}>{fmt(dx.income)}</td>
                        <td style={{ ...S.td, color: (dx.outstanding || dx.remain || 0) > 0 ? '#dc2626' : 'inherit', fontWeight: (dx.outstanding || dx.remain || 0) > 0 ? 800 : 600 }}>{fmt(dx.outstanding || dx.remain || 0)}</td>
                        <td style={{ ...S.td, fontWeight: 800, color: dx.collection_rate >= 90 ? '#059669' : dx.collection_rate >= 80 ? '#d97706' : '#dc2626' }}>{fmtPct(dx.collection_rate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <AIServerInsights data={aiSegment} theme="customer" title="AI Customer Intelligence" />

      {/* Footer */}
      {!loading && data && (
        <div style={{ textAlign: 'center', fontSize: '10px', fontWeight: 600, color: 'var(--md-text-tertiary)', padding: '8px 0' }}>
          {data.data_source} · อัปเดต {new Date(data.timestamp).toLocaleString('th-TH')}
        </div>
      )}
    </div>
  );
}

export default React.memo(CustomerInsightTab);
