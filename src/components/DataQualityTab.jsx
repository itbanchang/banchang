// ============================================================
// BCH 360° Intelligence V.10 — Data Quality Dashboard
// Renders /api/dq/status — schema contracts, freshness,
// volume anomalies, invariants. Admin-only tab.
// ============================================================
import React, { useEffect, useMemo } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';

const STATUS_COLOR = {
    ok: '#2dce89',
    warning: '#fb6340',
    danger: '#f5365c',
    unknown: '#8392ab',
};
const STATUS_LABEL = {
    ok: 'ผ่าน',
    warning: 'เตือน',
    danger: 'ล้มเหลว',
    unknown: 'ไม่ทราบ',
};

function StatusDot({ severity }) {
    const s = severity || 'unknown';
    return (
        <span
            aria-label={STATUS_LABEL[s]}
            style={{
                display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
                background: STATUS_COLOR[s], marginRight: 8, verticalAlign: 'middle',
            }}
        />
    );
}

function CheckRow({ check }) {
    const sev = check.severity || (check.pass ? 'ok' : 'warning');
    return (
        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <td style={{ padding: '10px 12px', verticalAlign: 'top' }}>
                <StatusDot severity={sev} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{check.check}</span>
            </td>
            <td style={{ padding: '10px 12px', fontSize: 13, color: '#334155', verticalAlign: 'top' }}>
                {renderDetails(check)}
            </td>
        </tr>
    );
}

function renderDetails(c) {
    if (c.error) return <span style={{ color: '#f5365c' }}>⚠️ {c.error}</span>;
    if (c.age_minutes != null) {
        return <>ล่าสุด <strong>{c.age_minutes} นาที</strong> ที่แล้ว (target ≤ {c.target_minutes} นาที)</>;
    }
    if (c.z_score != null) {
        return <>
            วันนี้ <strong>{c.today?.toLocaleString?.('th-TH') ?? c.today}</strong> •
            ค่าเฉลี่ย 60 วัน <strong>{c.baseline_mean?.toLocaleString?.('th-TH') ?? c.baseline_mean}</strong> •
            z-score <strong>{c.z_score}</strong>
        </>;
    }
    if (c.row_count != null) {
        return <>rows: {c.row_count.toLocaleString('th-TH')}{c.missing?.length ? ` • missing: ${c.missing.join(', ')}` : ''}</>;
    }
    if (c.rate != null) {
        return <>rate <strong>{(c.rate * 100).toFixed(2)}%</strong> (max {(c.max_rate * 100).toFixed(0)}%) • violations {c.violations?.toLocaleString?.('th-TH')}</>;
    }
    if (c.violations != null) return <>violations: <strong>{c.violations.toLocaleString('th-TH')}</strong></>;
    return <span style={{ color: '#64748b' }}>—</span>;
}

function SectionCard({ title, icon, checks }) {
    if (!checks || checks.length === 0) return null;
    const failures = checks.filter(c => c.pass === false || c.severity === 'danger').length;
    const warnings = checks.filter(c => c.severity === 'warning').length;
    return (
        <div
            style={{
                background: 'rgba(255,255,255,.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,0,0,.05)',
                borderTop: `4px solid ${failures ? STATUS_COLOR.danger : warnings ? STATUS_COLOR.warning : STATUS_COLOR.ok}`,
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1e293b' }}>
                    {icon} {title}
                </h3>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                    {checks.length} checks • {failures} failed • {warnings} warn
                </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                    {checks.map((c, i) => <CheckRow key={i} check={c} />)}
                </tbody>
            </table>
        </div>
    );
}

function OverallBadge({ status, summary, durationMs }) {
    const color = STATUS_COLOR[status] || STATUS_COLOR.unknown;
    const label = status === 'ok' ? 'ระบบข้อมูลปกติ' : status === 'warning' ? 'พบเตือน' : 'พบข้อผิดพลาด';
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', borderRadius: 16, marginBottom: 16,
            background: `linear-gradient(135deg, ${color}22 0%, ${color}0a 100%)`,
            border: `1px solid ${color}44`,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <StatusDot severity={status} />
                <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#1e293b' }}>{label}</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                        {summary?.pass ?? 0} ผ่าน • {summary?.warning ?? 0} เตือน • {summary?.fail ?? 0} ล้มเหลว
                    </div>
                </div>
            </div>
            <div style={{ fontSize: 12, color: '#94a3b8' }}>
                ตรวจเสร็จใน {durationMs ?? 0} ms
            </div>
        </div>
    );
}

function DataQualityTab() {
    const { state, fetchData } = useDashboard();

    useEffect(() => {
        fetchData('dqStatus', '/api/dq/status');
        const t = setInterval(() => fetchData('dqStatus', '/api/dq/status'), 60000);
        return () => clearInterval(t);
    }, [fetchData]);

    const data = state.dqStatus;
    const loading = state.loading?.dqStatus;

    const kpiCards = useMemo(() => ([
        { label: 'DQ', thLabel: 'Data Quality', value: data?.status || '—',
          color: STATUS_COLOR[data?.status] || STATUS_COLOR.unknown, icon: '🛡️',
          desc: 'สถานะรวมของ Data Quality', meaning: 'รวมจากทุกรายการ: schema contracts, freshness, volume anomalies, invariants',
          calc: 'worst(all DQ checks)', dataSource: '/api/dq/status', period: 'realtime (60s refresh)',
          target: 'ok', benchmark: 'zero failures', aiTip: 'ถ้า DQ ไม่ผ่าน — อย่าเชื่อตัวเลข KPI ของวันนั้น ตรวจ DQ ก่อน' },
        { label: 'pass', thLabel: 'ผ่าน', value: String(data?.summary?.pass ?? '—'),
          color: STATUS_COLOR.ok, icon: '✅', desc: 'จำนวน check ที่ผ่าน',
          meaning: 'checks ที่เสร็จสิ้นโดยไม่มีปัญหา', calc: 'count(pass)', dataSource: '/api/dq/status',
          period: 'realtime', target: 'all', benchmark: '-', aiTip: '' },
        { label: 'warn', thLabel: 'เตือน', value: String(data?.summary?.warning ?? '—'),
          color: STATUS_COLOR.warning, icon: '⚠️', desc: 'จำนวน check ที่มีคำเตือน',
          meaning: 'ผิดเล็กน้อย ควรเฝ้าระวัง', calc: 'count(severity=warning)', dataSource: '/api/dq/status',
          period: 'realtime', target: 0, benchmark: '-', aiTip: '' },
        { label: 'fail', thLabel: 'ล้มเหลว', value: String(data?.summary?.fail ?? '—'),
          color: STATUS_COLOR.danger, icon: '🛑', desc: 'จำนวน check ที่ไม่ผ่าน',
          meaning: 'ต้องดำเนินการแก้ทันที', calc: 'count(pass=false)', dataSource: '/api/dq/status',
          period: 'realtime', target: 0, benchmark: '-', aiTip: 'ถ้ามี fail — ดู runbook ใน bch-data-quality/references/dq-runbook.md' },
    ]), [data]);

    if (loading && !data) return <TabLoadingSkeleton />;
    if (!data) return <EmptyState title="ไม่สามารถโหลด DQ status ได้" />;

    return (
        <div className="space-y-6">
            <KPIDescriptionCards kpis={kpiCards} />

            <OverallBadge
                status={data.status}
                summary={data.summary}
                durationMs={data.duration_ms}
            />

            <SectionCard title="Schema Contracts" icon="📐" checks={data.details?.contracts} />
            <SectionCard title="Freshness (ข้อมูลล่าสุด)" icon="⏱️" checks={data.details?.freshness} />
            <SectionCard title="Volume Anomalies (z-score)" icon="📊" checks={data.details?.volumes} />
            <SectionCard title="Invariants (ความสอดคล้อง)" icon="🧮" checks={data.details?.invariants} />

            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>
                อัปเดตล่าสุด: {data.generated_at ? new Date(data.generated_at).toLocaleString('th-TH') : '—'}
                {' '}• refresh อัตโนมัติทุก 60 วินาที
                {' '}• ดู runbook ที่ <code>.claude/skills/bch-data-quality/references/dq-runbook.md</code>
            </div>
        </div>
    );
}

export default DataQualityTab;
