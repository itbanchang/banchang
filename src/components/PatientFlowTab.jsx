// ============================================================
// BCH 360° Intelligence V.10 - Real-Time Patient Flow Heatmap
// 🚦 Live end-to-end funnel (Registration → Discharge) + Bottleneck
// Data: ovst + service_time + rcpt_print + er_regist + lab_head + xray_head
// ============================================================
import React, { useEffect, useMemo, useState } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ComposedChart, Line, Legend,
} from 'recharts';
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import SubErrorBoundary from './shared/SubErrorBoundary.jsx';

const SEVERITY_COLOR = {
  empty: 'rgba(148,163,184,.18)',
  good:  '#16a34a',
  warn:  '#f59e0b',
  crit:  '#dc2626',
};

const STAGE_COLOR = {
  registration: '#0284c7',
  screening:    '#06b6d4',
  waiting:      '#f59e0b',
  examination:  '#7c3aed',
  finance:      '#0f766e',
  discharge:    '#16a34a',
};

const today0 = () => new Date().toISOString().slice(0, 10);

function PatientFlowTab() {
  const state = useShallowDashboardSelector(s => ({
    flowLive: s.flowLive,
    flowBottleneck: s.flowBottleneck,
    flowHeatmap: s.flowHeatmap,
    flowStageComparison: s.flowStageComparison,
    flowHistorical: s.flowHistorical,
    flowClinicDrill: s.flowClinicDrill,
    ipdFlowLive: s.ipdFlowLive,
    ipdLosOutliers: s.ipdLosOutliers,
    ipdAdmissionTimeline: s.ipdAdmissionTimeline,
    ipdBedTurnover: s.ipdBedTurnover,
    flowWaitingList: s.flowWaitingList,
    loading: s.loading,
  }));
  const { fetchData } = useDashboardActions();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedDate, setSelectedDate] = useState(today0());
  const [selectedStage, setSelectedStage] = useState('waiting_doctor');
  const [view, setView] = useState('opd'); // 'opd' | 'ipd'
  const [waitStageFilter, setWaitStageFilter] = useState('all');
  const [selectedVn, setSelectedVn] = useState(null);
  const isToday = selectedDate === today0();

  // Quick-date options (today, yesterday, last 7d, 30d)
  const quickDates = useMemo(() => {
    const now = new Date();
    const d = (offset) => {
      const x = new Date(now);
      x.setDate(x.getDate() - offset);
      return x.toISOString().slice(0, 10);
    };
    return [
      { label: 'วันนี้', value: d(0) },
      { label: 'เมื่อวาน', value: d(1) },
      { label: '7 วันที่แล้ว', value: d(7) },
      { label: '30 วันที่แล้ว', value: d(30) },
    ];
  }, []);

  useEffect(() => {
    const load = () => {
      if (view === 'opd') {
        if (isToday) {
          fetchData('flowLive', '/api/patientflow/live');
          fetchData('flowBottleneck', '/api/patientflow/bottleneck');
          fetchData('flowHeatmap', `/api/patientflow/heatmap?date=${selectedDate}`);
          fetchData('flowStageComparison', '/api/patientflow/stage-comparison');
          fetchData('flowWaitingList', `/api/patientflow/waiting-list?stage=${waitStageFilter}&limit=50`);
        } else {
          fetchData('flowHistorical', `/api/patientflow/historical?date=${selectedDate}`);
          fetchData('flowHeatmap', `/api/patientflow/heatmap?date=${selectedDate}`);
        }
        fetchData('flowClinicDrill', `/api/patientflow/clinic-drilldown?stage=${selectedStage}&date=${selectedDate}`);
      } else {
        // IPD view
        fetchData('ipdFlowLive', '/api/patientflow/ipd-live');
        fetchData('ipdLosOutliers', '/api/patientflow/ipd-los-outliers');
        fetchData('ipdAdmissionTimeline', `/api/patientflow/ipd-admission-timeline?date=${selectedDate}`);
        fetchData('ipdBedTurnover', '/api/patientflow/ipd-bed-turnover');
      }
    };
    load();
    if (!autoRefresh || !isToday) return;
    const id = setInterval(load, 30000); // 30s polling only when live + today
    return () => clearInterval(id);
  }, [fetchData, autoRefresh, selectedDate, selectedStage, isToday, view, waitStageFilter]);

  const live = state.flowLive || {};
  const bottleneck = state.flowBottleneck || {};
  const heatmap = state.flowHeatmap || {};
  const compare = state.flowStageComparison || {};
  const historical = state.flowHistorical || {};
  const clinicDrill = state.flowClinicDrill || {};
  const ipdLive = state.ipdFlowLive || {};
  const ipdLos = state.ipdLosOutliers || {};
  const ipdTimeline = state.ipdAdmissionTimeline || {};
  const ipdTurnover = state.ipdBedTurnover || {};
  const waitingList = state.flowWaitingList || {};

  const stages = live.opd?.stages || [];
  const er = live.er || {};
  const ancillary = live.ancillary || {};

  // ── Metric strip (Live mode) ──
  const liveMetrics = useMemo(() => ([
    { label: 'OPD วันนี้', value: (live.opd?.total_today || 0).toLocaleString(), unit: 'ราย',
      icon: '🏥', status: 'normal', target: 'Visits today' },
    { label: 'ยังอยู่ในระบบ', value: (live.opd?.still_here || 0).toLocaleString(), unit: 'ราย',
      icon: '⏱️', gradient: '#f59e0b', status: 'warning', target: 'In-progress' },
    { label: 'จบการรักษา', value: (live.opd?.completed || 0).toLocaleString(), unit: 'ราย',
      icon: '✅', gradient: '#16a34a', status: 'success', target: 'Done today' },
    { label: 'ER วันนี้', value: (er.total || 0).toLocaleString(), unit: 'ราย',
      icon: '🚑', status: 'normal', target: `Door→Dr ${er.door_to_doctor_min || 0}m` },
    { label: 'รอพบแพทย์', value: (bottleneck.waiting_doctor?.count || 0).toLocaleString(), unit: 'ราย',
      icon: '⏳', gradient: (bottleneck.waiting_doctor?.avg_min || 0) > 60 ? '#dc2626' : '#f59e0b',
      status: (bottleneck.waiting_doctor?.avg_min || 0) > 60 ? 'critical' : 'warning',
      target: `${bottleneck.waiting_doctor?.avg_min || 0}m avg` },
    { label: 'รอรับยา', value: (bottleneck.waiting_pharmacy?.count || 0).toLocaleString(), unit: 'ราย',
      icon: '💊', gradient: (bottleneck.waiting_pharmacy?.avg_min || 0) > 30 ? '#dc2626' : '#f59e0b',
      status: (bottleneck.waiting_pharmacy?.avg_min || 0) > 30 ? 'critical' : 'warning',
      target: `${bottleneck.waiting_pharmacy?.avg_min || 0}m avg` },
    { label: 'Lab รอ', value: (ancillary.lab_pending || 0).toLocaleString(), unit: 'รายการ',
      icon: '🔬', status: 'normal', target: `TAT ${ancillary.lab_avg_tat_min || 0}m` },
    { label: 'X-Ray รอ', value: (ancillary.xray_pending || 0).toLocaleString(), unit: 'รายการ',
      icon: '☢️', status: 'normal', target: `อ่าน ${ancillary.xray_read_count || 0}` },
  ]), [live, er, ancillary, bottleneck]);

  // ── Metric strip (Historical mode) ──
  const histMetrics = useMemo(() => {
    const h = historical.opd || {};
    return [
      { label: 'OPD ของวันนั้น', value: (h.total || 0).toLocaleString(), unit: 'ราย',
        icon: '🏥', status: 'normal', target: selectedDate },
      { label: 'จบการรักษา', value: (h.completed || 0).toLocaleString(), unit: 'ราย',
        icon: '✅', gradient: '#16a34a', status: 'success',
        target: `${h.completion_rate_pct || 0}%` },
      { label: 'LWBS (กลับก่อน)', value: (h.lwbs_count || 0).toLocaleString(), unit: 'ราย',
        icon: '🚪', gradient: (h.lwbs_count || 0) > 5 ? '#dc2626' : '#f59e0b',
        status: (h.lwbs_count || 0) > 5 ? 'critical' : 'warning',
        target: 'เป้า ≤3 ราย/วัน' },
      { label: 'End-to-End', value: `${h.end_to_end_min || 0}`, unit: 'นาที',
        icon: '🕓', gradient: (h.end_to_end_min || 0) > 120 ? '#dc2626' : '#f59e0b',
        status: (h.end_to_end_min || 0) > 120 ? 'critical' : 'normal',
        target: 'รวมทั้งกระบวนการ' },
      { label: 'รอตรวจเฉลี่ย', value: `${h.t_waiting || 0}`, unit: 'นาที',
        icon: '⏳', gradient: (h.t_waiting || 0) > 30 ? '#dc2626' : '#f59e0b',
        status: (h.t_waiting || 0) > 30 ? 'critical' : 'normal',
        target: 'เป้า ≤30 นาที' },
      { label: 'Max รอ', value: `${h.max_wait_min || 0}`, unit: 'นาที',
        icon: '🥵', gradient: '#dc2626',
        status: 'warning', target: 'รายแย่สุด' },
      { label: 'ER ของวันนั้น', value: (historical.er?.total || 0).toLocaleString(), unit: 'ราย',
        icon: '🚑', status: 'normal',
        target: `Door→Dr ${historical.er?.door_to_dr_min || 0}m` },
      { label: 'Lab TAT', value: `${historical.lab?.avg_tat_min || 0}`, unit: 'นาที',
        icon: '🔬', status: 'normal', target: `${historical.lab?.total || 0} orders` },
    ];
  }, [historical, selectedDate]);

  const metrics = isToday ? liveMetrics : histMetrics;

  // ── Funnel / Sankey-style bars for OPD ──
  const funnel = useMemo(() => stages.map(s => ({
    stage: s.label,
    count: s.count,
    avg_min: s.avg_min,
    target: s.target_min,
    over: s.over_target,
    health: s.health,
    id: s.id,
    color: STAGE_COLOR[s.id] || '#64748b',
  })), [stages]);

  // ── Heatmap stages/hours ──
  const heatmapStages = heatmap.stages || [];
  const heatmapHours = heatmap.hours || [];

  return (
    <div className="space-y-4 animate-fade-in pb-8">

      {/* ── View Toggle: OPD vs IPD ── */}
      <div className="glass-card" style={{ padding: '0.5rem', display: 'flex', gap: 4 }}>
        {[
          { id: 'opd', label: '🏥 OPD Flow', desc: 'Outpatient + ER + Ancillary' },
          { id: 'ipd', label: '🛏️ IPD Bed Flow', desc: 'Ward Occupancy + LOS + Turnover' },
        ].map(v => (
          <button key={v.id}
            onClick={() => setView(v.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 800,
              textAlign: 'left',
              background: view === v.id ? 'var(--md-primary)' : 'transparent',
              color: view === v.id ? '#fff' : 'var(--md-text-secondary)',
              transition: 'all .2s',
            }}>
            <div style={{ fontSize: 14 }}>{v.label}</div>
            <div style={{ fontSize: 11, fontWeight: 600, opacity: view === v.id ? 0.85 : 0.65, marginTop: 2 }}>
              {v.desc}
            </div>
          </button>
        ))}
      </div>

      {/* ── Date Picker Header (OPD mode only) ── */}
      {view === 'opd' && (
      <div className="glass-card" style={{ padding: '0.75rem 1rem',
        background: isToday ? 'transparent' : 'linear-gradient(90deg, rgba(124,58,237,.08), rgba(168,85,247,.02))',
        border: `1px solid ${isToday ? 'var(--md-border)' : 'rgba(124,58,237,.2)'}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 800, fontSize: 'var(--fs-sm)', color: 'var(--md-text-primary)',
            display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 18 }}>{isToday ? '🟢' : '🕰️'}</span>
            {isToday ? 'Live Mode' : 'Historical Mode'}
          </div>

          <input type="date"
            value={selectedDate}
            max={today0()}
            min={(() => { const d = new Date(); d.setDate(d.getDate() - 90); return d.toISOString().slice(0, 10); })()}
            onChange={e => setSelectedDate(e.target.value)}
            style={{
              padding: '4px 8px', fontSize: 12, fontWeight: 700,
              borderRadius: 6, border: '1px solid var(--md-border)',
              background: 'var(--md-surface)', color: 'var(--md-text-primary)',
              cursor: 'pointer',
            }} />

          <div style={{ display: 'flex', gap: 4 }}>
            {quickDates.map(q => (
              <button key={q.label}
                onClick={() => setSelectedDate(q.value)}
                style={{
                  padding: '4px 10px', fontSize: 11, fontWeight: 700,
                  borderRadius: 99, cursor: 'pointer',
                  background: selectedDate === q.value ? '#0f766e' : 'transparent',
                  color: selectedDate === q.value ? '#fff' : 'var(--md-text-secondary)',
                  border: '1px solid var(--md-border)',
                }}>
                {q.label}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, fontSize: 11 }}>
            {!isToday && (
              <span style={{ padding: '3px 10px', background: 'rgba(124,58,237,.12)',
                color: '#7c3aed', fontWeight: 700, borderRadius: 99 }}>
                📜 ไม่มี real-time alerts ในโหมดย้อนหลัง
              </span>
            )}
            {isToday && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} />
                Auto-refresh 30s
              </label>
            )}
          </div>
        </div>
      </div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/*          OPD / ER / Ancillary VIEW         */}
      {/* ══════════════════════════════════════════ */}
      {view === 'opd' && (<>

      {/* ── Top metrics ── */}
      <MetricsStrip metrics={metrics} />

      {/* ── Bottleneck alert banner — live mode only ── */}
      {isToday && (
      <SubErrorBoundary name="Bottleneck Alerts">
        {(bottleneck.alerts || []).map((a, i) => (
          <div key={i} className="glass-card" style={{
            padding: '0.75rem 1rem',
            background: a.level === 'crit'
              ? 'linear-gradient(90deg, rgba(220,38,38,.12), rgba(220,38,38,.04))'
              : a.level === 'warn'
              ? 'linear-gradient(90deg, rgba(245,158,11,.12), rgba(245,158,11,.04))'
              : 'linear-gradient(90deg, rgba(22,163,74,.12), rgba(22,163,74,.04))',
            borderLeft: `4px solid ${a.level === 'crit' ? '#dc2626' : a.level === 'warn' ? '#f59e0b' : '#16a34a'}`,
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4,
          }}>
            <span style={{ fontSize: 22 }}>
              {a.level === 'crit' ? '🚨' : a.level === 'warn' ? '⚠️' : '✅'}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 'var(--fs-sm)', color: 'var(--md-text-primary)' }}>
                {a.message}
              </div>
              {a.action && (
                <div style={{ fontSize: 11, color: 'var(--md-text-secondary)', marginTop: 2 }}>
                  💡 {a.action}
                </div>
              )}
            </div>
            <span style={{
              padding: '2px 8px', borderRadius: 99,
              background: a.level === 'crit' ? '#dc2626' : a.level === 'warn' ? '#f59e0b' : '#16a34a',
              color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: '.05em',
            }}>
              {a.level.toUpperCase()}
            </span>
          </div>
        ))}
      </SubErrorBoundary>
      )}

      {/* ── 🚨 Live Waiting List — live mode only ── */}
      {isToday && (
        <LiveWaitingList
          data={waitingList}
          stageFilter={waitStageFilter}
          onStageFilterChange={setWaitStageFilter}
          onRowClick={(vn) => setSelectedVn(vn)}
        />
      )}

      {/* ── 👤 Patient Timeline Modal ── */}
      {selectedVn && (
        <PatientTimelineModal
          vn={selectedVn}
          onClose={() => setSelectedVn(null)}
        />
      )}

      {/* ── 🔍 Clinic Drill-Down Panel ── */}
      <SubErrorBoundary name="Clinic Drill-Down">
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', color: 'var(--md-text-primary)' }}>
              🔍 Clinic Drill-Down — ขั้นตอนใดคลินิกไหนเป็นคอขวด
            </div>
            <span style={{ fontSize: 11, color: 'var(--md-text-secondary)' }}>
              เลือกขั้นตอน → ดู Top {clinicDrill.rows?.length || 10} คลินิกเรียงตามเวลาเฉลี่ย
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
              {[
                { id: 'registration', label: '📝 ลงทะเบียน', target: 10 },
                { id: 'waiting_doctor', label: '⏳ รอตรวจ', target: 30 },
                { id: 'examination', label: '👨‍⚕️ ตรวจ→จ่ายยา', target: 30 },
                { id: 'pharmacy', label: '💊 รับยา→ชำระเงิน', target: 20 },
              ].map(s => (
                <button key={s.id}
                  onClick={() => setSelectedStage(s.id)}
                  style={{
                    padding: '4px 10px', fontSize: 11, fontWeight: 700,
                    borderRadius: 99, cursor: 'pointer',
                    background: selectedStage === s.id ? '#7c3aed' : 'transparent',
                    color: selectedStage === s.id ? '#fff' : 'var(--md-text-secondary)',
                    border: '1px solid var(--md-border)',
                    whiteSpace: 'nowrap',
                  }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target banner */}
          <div style={{
            padding: '8px 12px', borderRadius: 8,
            background: 'rgba(124,58,237,.06)',
            border: '1px solid rgba(124,58,237,.15)',
            fontSize: 12, marginBottom: 10,
          }}>
            🎯 เป้าหมายเวลา: <strong>{clinicDrill.target_min || 0} นาที</strong>
            · วันที่: <strong>{clinicDrill.date || selectedDate}</strong>
            · พบ {clinicDrill.total_clinics || 0} คลินิก (มี ≥3 เคส)
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead><tr style={{ borderBottom: '2px solid var(--md-border)' }}>
                <th style={th}>อันดับ</th>
                <th style={th}>คลินิก/แผนก</th>
                <th style={th}>Visits</th>
                <th style={th}>เวลาเฉลี่ย</th>
                <th style={th}>Max</th>
                <th style={th}>เกินเป้า</th>
                <th style={th}>% เกินเป้า</th>
                <th style={th}>Status</th>
              </tr></thead>
              <tbody>
                {(clinicDrill.rows || []).map((r, i) => (
                  <tr key={i} style={{
                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                    background: i % 2 ? 'rgba(0,0,0,0.015)' : 'transparent',
                  }}>
                    <td style={{ ...td, fontWeight: 800 }}>#{i + 1}</td>
                    <td style={td}>{r.clinic_name}</td>
                    <td style={td}>{r.visit_count}</td>
                    <td style={{
                      ...td, fontWeight: 800,
                      color: r.severity === 'crit' ? '#dc2626'
                        : r.severity === 'warn' ? '#f59e0b' : '#16a34a',
                    }}>
                      {r.avg_min}m
                    </td>
                    <td style={{ ...td, color: 'var(--md-text-secondary)' }}>{r.max_min}m</td>
                    <td style={td}>{r.over_target_count}/{r.visit_count}</td>
                    <td style={{ ...td, fontWeight: 700 }}>
                      <span style={{
                        color: r.over_target_rate_pct > 50 ? '#dc2626'
                          : r.over_target_rate_pct > 25 ? '#f59e0b' : '#16a34a',
                      }}>{r.over_target_rate_pct}%</span>
                    </td>
                    <td style={td}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 800,
                        background: r.severity === 'crit' ? '#dc2626'
                          : r.severity === 'warn' ? '#f59e0b' : '#16a34a',
                        color: '#fff',
                      }}>
                        {r.severity === 'crit' ? '🚨 CRIT' : r.severity === 'warn' ? '⚠ WARN' : '✓ OK'}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!clinicDrill.rows || clinicDrill.rows.length === 0) && (
                  <tr><td colSpan={8} style={{ padding: 24, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                    {state.loading?.flowClinicDrill ? 'กำลังโหลดข้อมูล...' : 'ไม่มีข้อมูลในขั้นตอน/วันนี้'}
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </SubErrorBoundary>

      {/* ── Live funnel — hide in historical mode (historical metrics already shown above) ── */}
      {isToday && (
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', color: 'var(--md-text-primary)' }}>
              🚦 Live Patient Flow — OPD วันนี้
            </div>
            <div style={{ fontSize: 11, color: 'var(--md-text-secondary)', marginTop: 2 }}>
              อัปเดตทุก 30 วินาที · แสดงจำนวนผู้ป่วยและเวลาเฉลี่ย ณ ขั้นตอน
            </div>
          </div>
        </div>

        {/* Stage cards row */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${funnel.length}, 1fr)`, gap: 6 }}>
          {funnel.map((s, i) => (
            <div key={s.id} style={{
              padding: '14px 10px',
              background: s.health === 'crit' ? 'rgba(220,38,38,.10)'
                : s.health === 'warn' ? 'rgba(245,158,11,.10)'
                : 'rgba(22,163,74,.08)',
              border: `1.5px solid ${s.health === 'crit' ? '#dc2626' : s.health === 'warn' ? '#f59e0b' : s.color}`,
              borderRadius: 12,
              position: 'relative',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{stages[i]?.icon || '📍'}</div>
              <div style={{ fontSize: 11, color: 'var(--md-text-secondary)', fontWeight: 700,
                letterSpacing: '.02em', marginBottom: 4 }}>{s.stage}</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.color, lineHeight: 1 }}>
                {s.count.toLocaleString()}
              </div>
              <div style={{ fontSize: 10, color: 'var(--md-text-tertiary)', marginTop: 4 }}>
                {s.avg_min > 0 ? `เฉลี่ย ${s.avg_min}m` : '—'}
                {s.target > 0 && <span style={{ opacity: .6 }}> / เป้า {s.target}m</span>}
              </div>
              {i < funnel.length - 1 && (
                <div style={{
                  position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 14, color: 'var(--md-text-tertiary)', zIndex: 1,
                }}>▶</div>
              )}
            </div>
          ))}
        </div>
      </div>
      )}

      {/* ── Stage comparison: today vs 30-day avg — live mode only ── */}
      {isToday && (
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', marginBottom: 8 }}>
            📊 Stage Time — วันนี้ vs ค่าเฉลี่ย 30 วัน
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={compare.stages || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="m" />
              <Tooltip />
              <Legend />
              <Bar dataKey="today" fill="#0f766e" name="วันนี้ (นาที)" />
              <Bar dataKey="baseline" fill="#94a3b8" name="เฉลี่ย 30 วัน" />
              <Line type="monotone" dataKey="target" stroke="#dc2626" strokeDasharray="5 5" name="เป้า (นาที)" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card" style={{ padding: '1rem' }}>
          <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', marginBottom: 8 }}>
            🔍 Bottleneck Insight
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead><tr style={{ borderBottom: '2px solid var(--md-border)' }}>
              <th style={th}>Stage</th><th style={th}>วันนี้</th>
              <th style={th}>เฉลี่ย</th><th style={th}>Δ</th><th style={th}>Status</th>
            </tr></thead>
            <tbody>
              {(compare.stages || []).map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <td style={td}>{s.label}</td>
                  <td style={{ ...td, fontWeight: 700, color: s.over_target ? '#dc2626' : 'var(--md-text-primary)' }}>
                    {s.today}m
                  </td>
                  <td style={td}>{s.baseline}m</td>
                  <td style={{ ...td, color: s.delta > 0 ? '#dc2626' : '#16a34a', fontWeight: 700 }}>
                    {s.delta > 0 ? '+' : ''}{s.delta}m
                    <span style={{ fontSize: 10, opacity: .75, marginLeft: 3 }}>({s.delta_pct > 0 ? '+' : ''}{s.delta_pct}%)</span>
                  </td>
                  <td style={td}>
                    {s.over_target
                      ? <span style={{ color: '#dc2626', fontWeight: 800 }}>⚠ เกินเป้า</span>
                      : <span style={{ color: '#16a34a', fontWeight: 800 }}>✓ ดี</span>}
                  </td>
                </tr>
              ))}
              {(!compare.stages || compare.stages.length === 0) && (
                <tr><td colSpan={5} style={{ padding: 24, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                  กำลังโหลดข้อมูล...
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* ── Hour × Stage heatmap — ทำงานทั้ง live และ historical ── */}
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', marginBottom: 10 }}>
          🌡️ Heatmap — เวลาเฉลี่ยรายชั่วโมง × ขั้นตอน ({isToday ? 'วันนี้' : selectedDate})
          {heatmap.bottleneck && (
            <span style={{ marginLeft: 10, fontSize: 11, fontWeight: 700, color: '#dc2626',
              background: 'rgba(220,38,38,.08)', padding: '2px 8px', borderRadius: 99 }}>
              Bottleneck: {heatmap.bottleneck.label} เฉลี่ย {heatmap.bottleneck.avg}m (+{heatmap.bottleneck.delta}m)
            </span>
          )}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 2, minWidth: 720 }}>
            <thead>
              <tr>
                <th style={{ ...th, background: 'var(--md-surface)', position: 'sticky', left: 0 }}>ชั่วโมง</th>
                {heatmapStages.map(s => (
                  <th key={s.id} style={{ ...th, textAlign: 'center', minWidth: 110 }}>
                    {s.label}
                    <div style={{ fontSize: 9, color: 'var(--md-text-tertiary)', fontWeight: 600, textTransform: 'none' }}>
                      เป้า {s.target}m
                    </div>
                  </th>
                ))}
                <th style={{ ...th, textAlign: 'center' }}>Visits</th>
              </tr>
            </thead>
            <tbody>
              {heatmapHours.map(h => (
                <tr key={h.hr}>
                  <td style={{ ...td, fontWeight: 700, background: 'var(--md-surface)',
                    position: 'sticky', left: 0, borderRight: '1px solid var(--md-border)' }}>
                    {h.label}
                  </td>
                  {h.cells.map(c => (
                    <td key={c.stage} style={{
                      padding: '10px 6px', textAlign: 'center',
                      background: c.severity === 'empty'
                        ? SEVERITY_COLOR.empty
                        : c.severity === 'good'
                          ? 'rgba(22,163,74,.15)'
                          : c.severity === 'warn'
                            ? 'rgba(245,158,11,.22)'
                            : 'rgba(220,38,38,.25)',
                      border: `1px solid ${c.severity === 'empty' ? 'rgba(0,0,0,.04)' : SEVERITY_COLOR[c.severity]}`,
                      borderRadius: 6,
                      fontSize: 11, fontWeight: 800,
                      color: c.severity === 'empty' ? 'var(--md-text-tertiary)' : SEVERITY_COLOR[c.severity],
                    }}>
                      {c.value > 0 ? `${c.value}m` : '—'}
                    </td>
                  ))}
                  <td style={{ ...td, textAlign: 'center', fontWeight: 700 }}>{h.visit_count}</td>
                </tr>
              ))}
              {heatmapHours.length === 0 && (
                <tr><td colSpan={heatmapStages.length + 2} style={{ padding: 24, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                  กำลังโหลด heatmap...
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11, color: 'var(--md-text-secondary)' }}>
          <Legend2 color={SEVERITY_COLOR.good} label="≤ เป้า" />
          <Legend2 color={SEVERITY_COLOR.warn} label="เกินเป้า ≤1.5×" />
          <Legend2 color={SEVERITY_COLOR.crit} label="เกิน 1.5× เป้า" />
          <Legend2 color={SEVERITY_COLOR.empty} label="ไม่มีข้อมูล" />
        </div>
      </div>

      <div style={{ fontSize: 10, color: 'var(--md-text-tertiary)', textAlign: 'center', marginTop: 4 }}>
        🔒 Data source: <code>ovst + service_time + rcpt_print + er_regist + lab_head + xray_head</code> · HOSxP XE live · 30s polling
      </div>

      </>)}
      {/* ══════════════════════════════════════════ */}
      {/*           IPD BED FLOW VIEW                */}
      {/* ══════════════════════════════════════════ */}
      {view === 'ipd' && <IPDFlowView ipdLive={ipdLive} ipdLos={ipdLos} ipdTimeline={ipdTimeline} ipdTurnover={ipdTurnover} />}
    </div>
  );
}

// ============================================================
// IPD Bed Flow View — ward occupancy, LOS outliers, admission timeline
// ============================================================
function IPDFlowView({ ipdLive, ipdLos, ipdTimeline, ipdTurnover }) {
  const total = ipdLive.total || {};
  const wards = ipdLive.wards || [];

  const ipdMetrics = useMemo(() => [
    { label: 'เตียงทั้งหมด', value: (total.total_beds || 0).toLocaleString(), unit: 'เตียง',
      icon: '🛏️', status: 'normal', target: 'BCH total beds' },
    { label: 'ครองเตียง', value: `${total.occupancy_rate_pct || 0}`, unit: '%',
      icon: '📊', gradient: (total.occupancy_rate_pct || 0) >= 95 ? '#dc2626'
        : (total.occupancy_rate_pct || 0) >= 85 ? '#f59e0b' : '#16a34a',
      status: (total.occupancy_rate_pct || 0) >= 95 ? 'critical'
        : (total.occupancy_rate_pct || 0) >= 85 ? 'warning' : 'success',
      target: `${total.occupied || 0} / ${total.total_beds || 0}` },
    { label: 'เตียงว่าง', value: (total.available || 0).toLocaleString(), unit: 'เตียง',
      icon: '🟢', gradient: '#16a34a',
      status: (total.available || 0) < 5 ? 'critical' : 'success',
      target: 'พร้อม admit' },
    { label: 'Admit วันนี้', value: (total.admits_today || 0).toLocaleString(), unit: 'ราย',
      icon: '📥', gradient: '#0284c7', status: 'normal',
      target: `เมื่อวาน ${total.admits_yesterday || 0}` },
    { label: 'Discharge วันนี้', value: (total.dchs_today || 0).toLocaleString(), unit: 'ราย',
      icon: '📤', gradient: '#7c3aed', status: 'normal',
      target: `Net ${total.net_change_today > 0 ? '+' : ''}${total.net_change_today || 0}` },
    { label: 'รอ admit', value: (total.pending_admits || 0).toLocaleString(), unit: 'ราย',
      icon: '⏳', gradient: (total.pending_admits || 0) > 0 ? '#f59e0b' : '#94a3b8',
      status: (total.pending_admits || 0) > 0 ? 'warning' : 'normal',
      target: 'ipt_admit_queue' },
    { label: 'LOS เฉลี่ย 30d', value: `${total.avg_los_30d || 0}`, unit: 'วัน',
      icon: '🕓', status: (total.avg_los_30d || 0) > 5 ? 'warning' : 'success',
      target: `เป้า ≤5 วัน` },
    { label: 'นอนยาว (>7d)', value: `${total.long_stay_pct || 0}`, unit: '%',
      icon: '🚨', gradient: (total.long_stay_pct || 0) > 20 ? '#dc2626' : '#f59e0b',
      status: (total.long_stay_pct || 0) > 20 ? 'critical' : 'warning',
      target: `${total.total_discharges_30d || 0} discharges` },
  ], [total]);

  const timelineData = ipdTimeline.hours || [];
  const turnoverRows = ipdTurnover.rows || [];

  return <>
    <MetricsStrip metrics={ipdMetrics} />

    {/* ── Ward Heatmap ── */}
    <SubErrorBoundary name="Ward Occupancy">
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', marginBottom: 10 }}>
          🏥 Ward Occupancy Heatmap
          <span style={{ fontSize: 11, color: 'var(--md-text-secondary)', marginLeft: 8, fontWeight: 600 }}>
            แต่ละ ward แสดงอัตราครองเตียง + admit/discharge วันนี้
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
          {wards.length === 0 && (
            <div style={{ gridColumn: '1/-1', padding: 24, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
              กำลังโหลดข้อมูล ward...
            </div>
          )}
          {wards.map(w => {
            const bg = w.severity === 'crit' ? 'rgba(220,38,38,.12)'
              : w.severity === 'warn' ? 'rgba(245,158,11,.12)'
              : w.severity === 'good' ? 'rgba(22,163,74,.10)'
              : 'rgba(148,163,184,.08)';
            const border = w.severity === 'crit' ? '#dc2626'
              : w.severity === 'warn' ? '#f59e0b'
              : w.severity === 'good' ? '#16a34a' : '#94a3b8';
            return (
              <div key={w.ward_code} style={{
                padding: '12px 14px', borderRadius: 10,
                background: bg, border: `1.5px solid ${border}`,
              }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--md-text-primary)' }}>
                  {w.short_name}
                </div>
                <div style={{ fontSize: 10, color: 'var(--md-text-tertiary)', marginBottom: 6,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {w.ward_name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: border, lineHeight: 1 }}>
                    {w.occupancy_rate_pct}
                  </span>
                  <span style={{ fontSize: 11, color: border, fontWeight: 700 }}>%</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--md-text-secondary)', marginTop: 2 }}>
                  {w.occupied}/{w.total_beds} <span style={{ opacity: .7 }}>เตียง</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, fontSize: 10, fontWeight: 700 }}>
                  <span style={{ color: '#0284c7' }}>↓ {w.admits_today}</span>
                  <span style={{ color: '#7c3aed' }}>↑ {w.dchs_today}</span>
                  <span style={{ color: 'var(--md-text-tertiary)', marginLeft: 'auto' }}>
                    ว่าง {w.available}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SubErrorBoundary>

    {/* ── Admission Timeline ── */}
    <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', marginBottom: 8 }}>
          📈 Admission vs Discharge Timeline — วันนี้
          <span style={{ fontSize: 11, color: 'var(--md-text-secondary)', marginLeft: 8, fontWeight: 600 }}>
            Admit {ipdTimeline.total_admits || 0} · Discharge {ipdTimeline.total_dchs || 0}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={1} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="admits" fill="#0284c7" name="Admit" />
            <Bar dataKey="dchs" fill="#7c3aed" name="Discharge" />
            <Line type="monotone" dataKey="net" stroke="#dc2626" strokeWidth={2} name="Net change" dot />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bed Turnover Efficiency ── */}
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', marginBottom: 8 }}>
          🔁 Bed Utilization — 30 วัน
        </div>
        <div style={{ maxHeight: 260, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead><tr style={{ borderBottom: '2px solid var(--md-border)' }}>
              <th style={th}>Ward</th>
              <th style={th}>LOS เฉลี่ย</th>
              <th style={th}>Dch/วัน</th>
              <th style={th}>Utilization</th>
            </tr></thead>
            <tbody>
              {turnoverRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <td style={td}>{r.ward_name}</td>
                  <td style={td}>{r.avg_los}d</td>
                  <td style={td}>{r.avg_dch_per_day}</td>
                  <td style={{ ...td, fontWeight: 800,
                    color: r.efficiency === 'high' ? '#16a34a'
                      : r.efficiency === 'good' ? '#0284c7' : '#f59e0b' }}>
                    {r.utilization_pct}%
                  </td>
                </tr>
              ))}
              {turnoverRows.length === 0 && (
                <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                  กำลังโหลด...
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* ── LOS Outliers ── */}
    <SubErrorBoundary name="LOS Outliers">
      <div className="glass-card" style={{ padding: '1rem' }}>
        <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', marginBottom: 8 }}>
          🚨 Length-of-Stay Outliers — ผู้ป่วยที่นอนนาน
          <span style={{ fontSize: 11, color: 'var(--md-text-secondary)', marginLeft: 8, fontWeight: 600 }}>
            Top {ipdLos.total || 0} รายเรียงตาม LOS ปัจจุบัน (≥5 วัน) · เป้าหมายจัด case conference
          </span>
        </div>
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--md-surface)', zIndex: 1 }}>
              <tr style={{ borderBottom: '2px solid var(--md-border)' }}>
                <th style={th}>Severity</th>
                <th style={th}>AN</th>
                <th style={th}>HN</th>
                <th style={th}>ชื่อ</th>
                <th style={th}>อายุ</th>
                <th style={th}>Ward</th>
                <th style={th}>LOS</th>
                <th style={th}>Expected</th>
                <th style={th}>PDx</th>
                <th style={th}>DRG</th>
                <th style={th}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {(ipdLos.rows || []).map((r, i) => {
                const color = r.severity === 'crit' ? '#dc2626'
                  : r.severity === 'warn' ? '#f59e0b'
                  : r.severity === 'mild' ? '#0284c7' : '#16a34a';
                return (
                  <tr key={r.an} style={{
                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                    background: i % 2 ? 'rgba(0,0,0,0.015)' : 'transparent',
                  }}>
                    <td style={td}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 800,
                        background: color, color: '#fff',
                      }}>
                        {r.severity === 'crit' ? '🚨 ≥14d'
                          : r.severity === 'warn' ? '⚠ ≥10d'
                          : r.severity === 'mild' ? '📌 ≥7d' : '✓'}
                      </span>
                    </td>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: 11 }}>{r.an}</td>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: 11 }}>{r.hn}</td>
                    <td style={td}>{r.name}</td>
                    <td style={td}>{r.age}</td>
                    <td style={td}>{r.ward_name}</td>
                    <td style={{ ...td, fontWeight: 800, color }}>{r.current_los}d</td>
                    <td style={td}>
                      {r.expected_los ? `${r.expected_los}d` : '—'}
                      {r.los_over_expected > 0 && (
                        <span style={{ color: '#dc2626', fontSize: 10, marginLeft: 3 }}>
                          (+{r.los_over_expected}d)
                        </span>
                      )}
                    </td>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: 11 }}>{r.pdx || '—'}</td>
                    <td style={{ ...td, fontFamily: 'monospace', fontSize: 11 }}>{r.drg || '—'}</td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      ฿{(r.accrued_cost || 0).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
              {(!ipdLos.rows || ipdLos.rows.length === 0) && (
                <tr><td colSpan={11} style={{ padding: 24, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                  ไม่มีผู้ป่วยที่นอนเกิน 5 วัน หรือกำลังโหลด...
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SubErrorBoundary>

    <div style={{ fontSize: 10, color: 'var(--md-text-tertiary)', textAlign: 'center', marginTop: 4 }}>
      🔒 Data source: <code>ipt + ward + bedno + an_stat + ipt_admit_queue</code> · HOSxP XE live · 60s cache
    </div>
  </>;
}

function Legend2({ color, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 14, height: 14, borderRadius: 4, background: color, border: '1px solid rgba(0,0,0,.08)' }} />
      {label}
    </span>
  );
}

// ============================================================
// LiveWaitingList — Individual patients waiting right now
// ============================================================
function LiveWaitingList({ data, stageFilter, onStageFilterChange, onRowClick }) {
  const rows = data.rows || [];
  const buckets = data.buckets || {};
  const stageCounts = data.stage_counts || {};

  const totalWaiting = Object.values(stageCounts).reduce((s, x) => s + Number(x || 0), 0);
  const urgentCount = Number(buckets.max || 0) + Number(buckets.crit || 0);

  const stageButtons = [
    { id: 'all',            label: '📋 ทั้งหมด',         count: totalWaiting },
    { id: 'registration',   label: '📝 ลงทะเบียน',        count: stageCounts.registration || 0 },
    { id: 'waiting_doctor', label: '⏳ รอพบแพทย์',         count: stageCounts.waiting_doctor || 0 },
    { id: 'examination',    label: '👨‍⚕️ ตรวจ/Lab',       count: stageCounts.examination || 0 },
    { id: 'pharmacy',       label: '💊 รอรับยา',          count: stageCounts.pharmacy || 0 },
  ];

  return (
    <SubErrorBoundary name="Live Waiting List">
      <div className="glass-card" style={{ padding: '1rem',
        background: urgentCount > 0
          ? 'linear-gradient(90deg, rgba(220,38,38,.04), rgba(255,255,255,0))'
          : undefined,
        border: urgentCount > 0
          ? '1.5px solid rgba(220,38,38,.25)'
          : '1px solid var(--md-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
          <div style={{ fontWeight: 800, fontSize: 'var(--fs-base)', color: 'var(--md-text-primary)' }}>
            🚨 Live Waiting List — ใครรออยู่ตอนนี้
          </div>
          <span style={{ fontSize: 11, color: 'var(--md-text-secondary)' }}>
            {totalWaiting} รายกำลังรอ · Top {rows.length} เรียงตามเวลารอนานสุด
          </span>
          {urgentCount > 0 && (
            <span style={{ padding: '3px 10px', background: '#dc2626', color: '#fff',
              fontSize: 10, fontWeight: 800, borderRadius: 99, letterSpacing: '.05em' }}>
              🔥 {urgentCount} ราย รอ ≥60 นาที
            </span>
          )}
        </div>

        {/* Severity summary bar */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, fontSize: 11, fontWeight: 700 }}>
          {[
            { id: 'max', label: '⛔ ≥120m', color: '#991b1b' },
            { id: 'crit', label: '🔴 ≥90m', color: '#dc2626' },
            { id: 'warn', label: '🟠 ≥60m', color: '#ea580c' },
            { id: 'attn', label: '🟡 ≥30m', color: '#f59e0b' },
            { id: 'ok', label: '🟢 <30m', color: '#16a34a' },
          ].map(b => (
            <div key={b.id} style={{
              padding: '4px 10px', borderRadius: 8,
              background: `${b.color}15`, border: `1px solid ${b.color}40`,
              color: b.color, display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span>{b.label}</span>
              <span style={{ fontWeight: 900, fontSize: 13 }}>{buckets[b.id] || 0}</span>
            </div>
          ))}
        </div>

        {/* Stage filter buttons */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          {stageButtons.map(s => (
            <button key={s.id}
              onClick={() => onStageFilterChange(s.id)}
              style={{
                padding: '5px 12px', fontSize: 11, fontWeight: 700,
                borderRadius: 99, cursor: 'pointer',
                background: stageFilter === s.id ? '#0f766e' : 'transparent',
                color: stageFilter === s.id ? '#fff' : 'var(--md-text-secondary)',
                border: '1px solid var(--md-border)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
              <span>{s.label}</span>
              <span style={{
                padding: '1px 7px', borderRadius: 99, fontSize: 10,
                background: stageFilter === s.id ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.08)',
              }}>{s.count}</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ maxHeight: 480, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--md-surface)', zIndex: 1 }}>
              <tr style={{ borderBottom: '2px solid var(--md-border)' }}>
                <th style={th}>Sev</th>
                <th style={th}>Stage ปัจจุบัน</th>
                <th style={th}>รอในขั้นนี้</th>
                <th style={th}>เวลารวม</th>
                <th style={th}>HN</th>
                <th style={th}>ชื่อ</th>
                <th style={th}>อายุ</th>
                <th style={th}>คลินิก</th>
                <th style={th}>แพทย์</th>
                <th style={th}>Flags</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.vn}
                  onClick={() => onRowClick && onRowClick(r.vn)}
                  style={{
                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                    background: r.severity === 'max' ? 'rgba(153,27,27,.06)'
                      : r.severity === 'crit' ? 'rgba(220,38,38,.04)'
                      : i % 2 ? 'rgba(0,0,0,0.015)' : 'transparent',
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (onRowClick) e.currentTarget.style.background = 'rgba(15,118,110,.08)'; }}
                  onMouseLeave={e => {
                    if (onRowClick) e.currentTarget.style.background = r.severity === 'max' ? 'rgba(153,27,27,.06)'
                      : r.severity === 'crit' ? 'rgba(220,38,38,.04)'
                      : i % 2 ? 'rgba(0,0,0,0.015)' : 'transparent';
                  }}>
                  <td style={td}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 800,
                      background: r.severity_color, color: '#fff', whiteSpace: 'nowrap',
                    }}>
                      {r.severity_label}
                    </span>
                  </td>
                  <td style={{ ...td, fontWeight: 700, fontSize: 11 }}>{r.current_stage_label}</td>
                  <td style={{ ...td, fontWeight: 900, color: r.severity_color, fontSize: 13 }}>
                    {r.wait_in_stage_min}
                    <span style={{ fontSize: 10, fontWeight: 600, opacity: .7, marginLeft: 2 }}>m</span>
                  </td>
                  <td style={{ ...td, color: 'var(--md-text-secondary)' }}>
                    {r.total_min}m
                    <span style={{ fontSize: 10, opacity: .6, marginLeft: 3 }}>({r.arrived})</span>
                  </td>
                  <td style={{ ...td, fontFamily: 'monospace', fontSize: 11 }}>{r.hn}</td>
                  <td style={td}>{r.name}</td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    {r.age > 0 ? r.age : '-'}
                    {r.sex === '1' && <span style={{ fontSize: 9, marginLeft: 2, opacity: .6 }}>♂</span>}
                    {r.sex === '2' && <span style={{ fontSize: 9, marginLeft: 2, opacity: .6 }}>♀</span>}
                  </td>
                  <td style={{ ...td, fontSize: 11 }}>{r.clinic_name}</td>
                  <td style={{ ...td, fontSize: 11, color: 'var(--md-text-secondary)' }}>{r.doctor_name}</td>
                  <td style={td}>
                    <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      {(r.flags || []).map(f => (
                        <span key={f.id} style={{
                          padding: '1px 6px', borderRadius: 6, fontSize: 9, fontWeight: 800,
                          background: `${f.color}18`, color: f.color,
                          border: `1px solid ${f.color}40`,
                        }}>
                          {f.label}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={10} style={{ padding: 24, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                  ✅ ไม่มีผู้ป่วยรอในขณะนี้ (หรือกำลังโหลดข้อมูล)
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ fontSize: 10, color: 'var(--md-text-tertiary)', marginTop: 8, display: 'flex', gap: 12 }}>
          <span>💡 คลิกแถวเพื่อดู Timeline + Vital Signs + รายการยา</span>
          <span style={{ marginLeft: 'auto' }}>Auto-refresh 30s · Max 12 ชม. filter</span>
        </div>
      </div>
    </SubErrorBoundary>
  );
}

const th = { textAlign: 'left', padding: '8px 10px', fontWeight: 700, fontSize: 11,
  color: 'var(--md-text-secondary)', textTransform: 'uppercase', letterSpacing: '.04em' };
const td = { padding: '6px 10px', color: 'var(--md-text-primary)' };

// ============================================================
// PatientTimelineModal — click a patient row → full drill-down
// ============================================================
function PatientTimelineModal({ vn, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(null); setData(null);
    fetch(`/api/patientflow/patient-timeline?vn=${encodeURIComponent(vn)}`, {
      credentials: 'include',
    })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(j => { if (!cancelled) setData(j); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    // ESC to close
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { cancelled = true; window.removeEventListener('keydown', onKey); };
  }, [vn, onClose]);

  const p = data?.patient || {};
  const v = data?.visit || {};
  const vt = data?.vitals || {};
  const timeline = data?.timeline || [];
  const durations = data?.durations || [];

  // Vital sign thresholds (NEWS-inspired lightweight)
  const vitalStatus = (value, low, high) => {
    if (value == null || value === undefined || value === '') return 'muted';
    const n = Number(value);
    if (isNaN(n)) return 'muted';
    if (n < low || n > high) return 'abnormal';
    return 'normal';
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.68)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'fadeIn .2s ease',
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1100, maxHeight: '92vh', overflow: 'auto',
          background: 'var(--md-surface)',
          borderRadius: 16,
          boxShadow: '0 25px 60px rgba(0,0,0,.3)',
          position: 'relative',
        }}>

        {/* ── Header ── */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, rgba(15,118,110,.08), rgba(14,165,233,.04))',
          borderBottom: '1px solid var(--md-border)',
          display: 'flex', alignItems: 'flex-start', gap: 16,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: 'linear-gradient(135deg,#0f766e,#0284c7)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 20, flexShrink: 0,
          }}>
            {(p.name || '').slice(0, 1) || '👤'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ fontWeight: 900, fontSize: 20, color: 'var(--md-text-primary)' }}>
                {p.name || 'กำลังโหลด...'}
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--md-text-secondary)' }}>
                HN {p.hn}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--md-text-tertiary)' }}>
                VN {vn}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap', fontSize: 12 }}>
              <span style={{ color: 'var(--md-text-secondary)' }}>
                🎂 อายุ {p.age || '-'} ปี · {p.sex === '1' ? 'ชาย' : p.sex === '2' ? 'หญิง' : '-'}
              </span>
              <span style={{ color: 'var(--md-text-secondary)' }}>
                🏥 {v.clinic_name} · 👨‍⚕️ {v.doctor_name || '-'}
              </span>
              <span style={{ color: 'var(--md-text-secondary)' }}>
                📞 {p.phone || 'ไม่มีเบอร์'}
              </span>
              <span style={{ color: 'var(--md-text-secondary)' }}>
                💳 {p.pttype_name || '-'}
              </span>
              {v.is_refer_in && (
                <span style={{ padding: '1px 8px', background: '#0f766e', color: '#fff',
                  borderRadius: 99, fontSize: 10, fontWeight: 800 }}>📨 Refer-in</span>
              )}
              {v.priority >= 3 && (
                <span style={{ padding: '1px 8px', background: '#dc2626', color: '#fff',
                  borderRadius: 99, fontSize: 10, fontWeight: 800 }}>⚡ Priority {v.priority}</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 8, alignItems: 'center' }}>
              <span style={{
                padding: '4px 12px', borderRadius: 10, fontWeight: 800, fontSize: 12,
                background: 'rgba(15,118,110,.12)', color: '#0f766e',
              }}>
                {v.current_stage_label || '-'}
              </span>
              <span style={{ fontSize: 12, color: 'var(--md-text-tertiary)' }}>
                · มาถึง {v.vsttime?.slice(0, 5)} · รวม <strong style={{ color: 'var(--md-text-primary)' }}>{v.total_elapsed_min || 0}</strong> นาที
              </span>
              {p.drug_allergy && (
                <span style={{ padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                  background: 'rgba(220,38,38,.1)', color: '#dc2626', border: '1px solid rgba(220,38,38,.25)' }}>
                  ⚠️ แพ้: {p.drug_allergy}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: 10, border: 'none',
            background: 'rgba(0,0,0,.05)', cursor: 'pointer', fontSize: 18,
          }}>✕</button>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '1.25rem 1.5rem' }}>
          {loading && (
            <div style={{ padding: 60, textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
              ⏳ กำลังโหลดข้อมูลผู้ป่วย...
            </div>
          )}
          {error && (
            <div style={{ padding: 24, textAlign: 'center', color: '#dc2626' }}>
              ❌ Error: {error}
            </div>
          )}
          {data && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>

              {/* ── Timeline (left col) ── */}
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12, color: 'var(--md-text-primary)' }}>
                  🕐 Patient Journey Timeline
                </div>
                <div style={{ position: 'relative', paddingLeft: 28 }}>
                  {/* Vertical line */}
                  <div style={{
                    position: 'absolute', left: 10, top: 8, bottom: 8,
                    width: 2, background: 'linear-gradient(180deg, #0f766e, #94a3b8)',
                  }} />
                  {timeline.map((e, idx) => {
                    const icon = ({
                      arrived: '📍', screened: '🩺', examined: '👨‍⚕️',
                      lab_order: '🔬', lab_report: '📋', xray_order: '☢️',
                      dispensed: '💊', billed: '💰',
                    })[e.type] || '📌';
                    const color = ({
                      arrived: '#0284c7', screened: '#06b6d4', examined: '#7c3aed',
                      lab_order: '#f59e0b', lab_report: '#059669',
                      xray_order: '#64748b', dispensed: '#0f766e', billed: '#16a34a',
                    })[e.type] || '#94a3b8';
                    const dur = idx > 0 && durations[idx - 1] ? durations[idx - 1].minutes : null;
                    return (
                      <div key={idx} style={{ position: 'relative', marginBottom: 14 }}>
                        <div style={{
                          position: 'absolute', left: -22, top: 2,
                          width: 22, height: 22, borderRadius: '50%',
                          background: color, color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, boxShadow: `0 0 0 3px ${color}30`,
                        }}>{icon}</div>
                        {dur !== null && dur > 0 && (
                          <div style={{
                            position: 'absolute', left: -44, top: -14,
                            fontSize: 10, color: dur > 60 ? '#dc2626' : dur > 30 ? '#f59e0b' : '#94a3b8',
                            fontWeight: 700, whiteSpace: 'nowrap',
                          }}>+{dur}m</div>
                        )}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                          <span style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 800, color }}>
                            {String(e.time || '').slice(0, 5)}
                          </span>
                          <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--md-text-primary)' }}>
                            {e.label}
                          </span>
                        </div>
                        {e.detail && (
                          <div style={{ fontSize: 11, color: 'var(--md-text-secondary)', marginTop: 2 }}>
                            {e.detail}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* Current stage indicator */}
                  {v.current_stage !== 'completed' && (
                    <div style={{ position: 'relative', marginBottom: 4 }}>
                      <div style={{
                        position: 'absolute', left: -24, top: 2,
                        width: 26, height: 26, borderRadius: '50%',
                        background: '#f59e0b', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, boxShadow: '0 0 0 4px rgba(245,158,11,.3)',
                        animation: 'pulse 1.5s infinite',
                      }}>⏳</div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#f59e0b' }}>
                        กำลังรอที่: {v.current_stage_label}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--md-text-secondary)' }}>
                        รอมาแล้ว {v.total_elapsed_min} นาที
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Right column: Vitals + Diagnoses + Meds + Labs ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Vital Signs */}
                <div style={{
                  padding: 12, borderRadius: 10,
                  background: 'rgba(15,118,110,.04)',
                  border: '1px solid rgba(15,118,110,.15)',
                }}>
                  <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 8 }}>
                    🫀 Vital Signs
                    {!vt && <span style={{ marginLeft: 6, fontWeight: 500, fontSize: 10, color: 'var(--md-text-tertiary)' }}>
                      (ยังไม่ได้บันทึก)
                    </span>}
                  </div>
                  {vt && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                      <VitalCell label="BP" value={vt.bp} unit="mmHg"
                        status={vt.bps && (vt.bps > 140 || vt.bps < 90) ? 'abnormal' : vt.bps ? 'normal' : 'muted'} />
                      <VitalCell label="Pulse" value={vt.pulse || vt.hr} unit="bpm"
                        status={vitalStatus(vt.pulse || vt.hr, 60, 100)} />
                      <VitalCell label="RR" value={vt.rr} unit="/min"
                        status={vitalStatus(vt.rr, 12, 20)} />
                      <VitalCell label="Temp" value={vt.temp} unit="°C"
                        status={vitalStatus(vt.temp, 36.0, 37.5)} />
                      <VitalCell label="Weight" value={vt.weight} unit="kg" status="muted" />
                      <VitalCell label="BMI" value={vt.bmi} unit=""
                        status={vitalStatus(vt.bmi, 18.5, 25)} />
                      {vt.fbs && <VitalCell label="FBS" value={vt.fbs} unit="mg/dL"
                        status={vitalStatus(vt.fbs, 70, 125)} />}
                    </div>
                  )}
                  {vt?.cc && (
                    <div style={{ marginTop: 8, fontSize: 11, color: 'var(--md-text-secondary)' }}>
                      <strong>CC:</strong> {String(vt.cc).slice(0, 200)}
                    </div>
                  )}
                </div>

                {/* Diagnoses */}
                {data.diagnoses?.length > 0 && (
                  <div style={{
                    padding: 12, borderRadius: 10,
                    background: 'rgba(124,58,237,.04)',
                    border: '1px solid rgba(124,58,237,.15)',
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                      🩺 Diagnoses ({data.diagnoses.length})
                    </div>
                    {data.diagnoses.slice(0, 5).map((d, i) => (
                      <div key={i} style={{ fontSize: 11, marginBottom: 3 }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#7c3aed' }}>
                          {d.icd10}
                        </span>
                        <span style={{ marginLeft: 6, color: 'var(--md-text-secondary)' }}>
                          ({d.type_label})
                        </span>
                        <span style={{ marginLeft: 6, color: 'var(--md-text-primary)' }}>
                          {d.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Medications */}
                {data.medications?.length > 0 && (
                  <div style={{
                    padding: 12, borderRadius: 10,
                    background: 'rgba(5,150,105,.04)',
                    border: '1px solid rgba(5,150,105,.15)',
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                      💊 Medications / Orders ({data.medications.length})
                    </div>
                    <div style={{ maxHeight: 160, overflowY: 'auto' }}>
                      {data.medications.slice(0, 15).map((m, i) => (
                        <div key={i} style={{ fontSize: 11, padding: '3px 0', borderBottom: '1px dashed rgba(0,0,0,.05)' }}>
                          <span style={{ fontWeight: 700 }}>{m.name}</span>
                          {m.qty > 0 && (
                            <span style={{ marginLeft: 6, color: 'var(--md-text-secondary)' }}>
                              × {m.qty}
                            </span>
                          )}
                          {m.usage && (
                            <span style={{ marginLeft: 6, color: 'var(--md-text-tertiary)', fontSize: 10 }}>
                              {String(m.usage).slice(0, 60)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Labs */}
                {data.labs?.length > 0 && (
                  <div style={{
                    padding: 12, borderRadius: 10,
                    background: 'rgba(245,158,11,.04)',
                    border: '1px solid rgba(245,158,11,.15)',
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                      🔬 Lab Orders ({data.labs.length})
                    </div>
                    {data.labs.slice(0, 5).map((l, i) => (
                      <div key={i} style={{ fontSize: 11, padding: '3px 0' }}>
                        <span style={{ fontWeight: 700 }}>{l.form_name}</span>
                        {l.tat_min != null && (
                          <span style={{ marginLeft: 6, fontSize: 10,
                            color: l.tat_min > 60 ? '#dc2626' : l.tat_min > 30 ? '#f59e0b' : '#16a34a' }}>
                            TAT {l.tat_min}m
                          </span>
                        )}
                        {!l.confirmed && (
                          <span style={{ marginLeft: 6, fontSize: 10, color: '#f59e0b' }}>
                            ⏳ รอผล
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Xrays */}
                {data.xrays?.length > 0 && (
                  <div style={{
                    padding: 12, borderRadius: 10,
                    background: 'rgba(100,116,139,.05)',
                    border: '1px solid rgba(100,116,139,.15)',
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                      ☢️ X-Ray Orders ({data.xrays.length})
                    </div>
                    {data.xrays.slice(0, 3).map((x, i) => (
                      <div key={i} style={{ fontSize: 11, padding: '3px 0' }}>
                        <span style={{ fontWeight: 700 }}>{x.xray_list || x.department}</span>
                        {!x.read_confirmed && (
                          <span style={{ marginLeft: 6, fontSize: 10, color: '#f59e0b' }}>⏳ รออ่าน</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '0.75rem 1.5rem',
          borderTop: '1px solid var(--md-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(0,0,0,.015)',
          fontSize: 11, color: 'var(--md-text-tertiary)',
        }}>
          <span>📁 Data: <code>ovst + service_time + opdscreen + ovstdiag + opitemrece + lab_head + xray_head</code></span>
          <span>กด <kbd style={{ padding: '2px 6px', background: 'var(--md-surface)', borderRadius: 4,
            border: '1px solid var(--md-border)', fontSize: 10 }}>ESC</kbd> เพื่อปิด</span>
        </div>
      </div>
    </div>
  );
}

function VitalCell({ label, value, unit, status }) {
  const colors = {
    normal: { bg: 'rgba(22,163,74,.08)', fg: '#16a34a' },
    abnormal: { bg: 'rgba(220,38,38,.1)', fg: '#dc2626' },
    muted: { bg: 'rgba(148,163,184,.1)', fg: '#64748b' },
  };
  const c = colors[status] || colors.muted;
  const hasValue = value !== null && value !== undefined && value !== '' && value !== 0;
  return (
    <div style={{
      padding: 8, borderRadius: 8,
      background: c.bg, border: `1px solid ${c.fg}30`,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 10, color: 'var(--md-text-secondary)', fontWeight: 700, letterSpacing: '.04em' }}>
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 900, color: c.fg, lineHeight: 1.2 }}>
        {hasValue ? value : '—'}
        {hasValue && unit && <span style={{ fontSize: 9, fontWeight: 600, marginLeft: 2, opacity: .7 }}>{unit}</span>}
      </div>
    </div>
  );
}

export default PatientFlowTab;
