import React from 'react';
import {
    ResponsiveContainer, ComposedChart, CartesianGrid,
    XAxis, YAxis, Tooltip, Legend, Bar, Line
} from 'recharts';

export interface IPDBedFlowProps {
    data: any;
    loading: boolean;
}

export const IPDBedFlow = React.memo(function IPDBedFlow({ data, loading }: IPDBedFlowProps) {
    const [activeWard, setActiveWard] = React.useState('all');

    if (loading) {
        return (
            <div style={{ marginTop: '24px', padding: '20px', background: 'var(--md-surface-1)', borderRadius: '14px', border: '1px solid var(--md-border)' }}>
                <div style={{ height: '20px', width: '200px', background: 'var(--md-surface-2)', borderRadius: '6px', marginBottom: '14px' }} />
                <div style={{ height: '180px', background: 'var(--md-surface-2)', borderRadius: '10px' }} />
            </div>
        );
    }
    if (!data?.flow?.length) return null;

    const wards = ['all', ...(data.wards || [])];
    const wardNames: Record<string, string> = {};
    data.flow.forEach((f: any) => { wardNames[f.ward] = f.ward_name || f.ward; });

    const filtered = activeWard === 'all' ? data.flow : data.flow.filter((f: any) => f.ward === activeWard);

    const byDate: Record<string, any> = {};
    filtered.forEach((f: any) => {
        if (!byDate[f.date]) byDate[f.date] = { date: f.date, admissions: 0, discharges: 0 };
        byDate[f.date].admissions += f.admissions;
        byDate[f.date].discharges += f.discharges;
    });
    const chartData = Object.values(byDate).sort((a: any, b: any) => a.date.localeCompare(b.date)).map((d: any) => ({
        ...d,
        label: new Date(d.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
        net: d.admissions - d.discharges,
    }));

    return (
        <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '4px', height: '28px', background: 'linear-gradient(180deg,#0ea5e9,#6366f1)', borderRadius: '2px' }} />
                <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--md-text-primary)' }}>📊 Bed Flow — 14 วันย้อนหลัง</h3>
                    <span style={{ fontSize: '12px', color: 'var(--md-text-tertiary)' }}>Admit vs Discharge per Ward · HOSxP XE</span>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {wards.slice(0, 6).map((w: string) => (
                        <button key={w} onClick={() => setActiveWard(w)} style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer', background: activeWard === w ? '#6366f1' : 'var(--md-surface-2)', color: activeWard === w ? '#fff' : 'var(--md-text-secondary)', transition: 'all 0.15s' }}>
                            {w === 'all' ? 'ทุกวอร์ด' : (wardNames[w] || w)}
                        </button>
                    ))}
                </div>
            </div>
            <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', padding: '16px' }}>
                <ResponsiveContainer width="100%" height={200}>
                    <ComposedChart data={chartData} margin={{ top: 4, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border)" />
                        <XAxis dataKey="label" tick={{ fill: 'var(--md-text-tertiary)', fontSize: 10 }} />
                        <YAxis tick={{ fill: 'var(--md-text-tertiary)', fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{ background: 'var(--md-surface-1)', border: '1px solid var(--md-border)', borderRadius: '8px', fontSize: '12px' }}
                            formatter={(v: any, n: any) => [`${v} ราย`, n === 'admissions' ? 'รับใหม่' : n === 'discharges' ? 'จำหน่าย' : 'Net Flow']}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px' }} formatter={(v: any) => v === 'admissions' ? 'รับใหม่' : v === 'discharges' ? 'จำหน่าย' : 'Net'} />
                        <Bar dataKey="admissions" fill="#6366f1" fillOpacity={0.8} radius={[3, 3, 0, 0]} />
                        <Bar dataKey="discharges" fill="#10b981" fillOpacity={0.8} radius={[3, 3, 0, 0]} />
                        <Line type="monotone" dataKey="net" stroke="#f59e0b" strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: '16px', marginTop: '10px', justifyContent: 'center' }}>
                    {[
                        { label: 'รวมรับ 14 วัน', value: chartData.reduce((s: number, d: any) => s + d.admissions, 0), color: '#6366f1' },
                        { label: 'รวมจำหน่าย 14 วัน', value: chartData.reduce((s: number, d: any) => s + d.discharges, 0), color: '#10b981' },
                        { label: 'Net (รับ - จำหน่าย)', value: chartData.reduce((s: number, d: any) => s + d.net, 0), color: '#f59e0b' },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: s.color }}>{s.value >= 0 ? '+' : ''}{s.value}</div>
                            <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
