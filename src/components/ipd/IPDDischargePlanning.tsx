import React from 'react';

export interface IPDDischargePlanningProps {
    data: any;
    loading: boolean;
}

export const IPDDischargePlanning = React.memo(function IPDDischargePlanning({ data, loading }: IPDDischargePlanningProps) {
    const [filter, setFilter] = React.useState('all');

    if (loading) {
        return (
            <div style={{ marginTop: '24px', marginBottom: '32px', padding: '20px', background: 'var(--md-surface-1)', borderRadius: '14px', border: '1px solid var(--md-border)' }}>
                <div style={{ height: '20px', width: '240px', background: 'var(--md-surface-2)', borderRadius: '6px', marginBottom: '14px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                    {[1, 2, 3].map(i => <div key={i} style={{ height: '60px', background: 'var(--md-surface-2)', borderRadius: '10px' }} />)}
                </div>
            </div>
        );
    }
    if (!data) return null;

    const { today_count = 0, tomorrow_count = 0, total = 0, patients = [] } = data;
    const filtered = filter === 'all' ? patients : patients.filter((p: any) => p.discharge_window === filter);

    const windowColor: Record<string, string> = { today: '#f43f5e', tomorrow: '#f59e0b', upcoming: '#10b981' };
    const windowLabel: Record<string, string> = { today: 'วันนี้', tomorrow: 'พรุ่งนี้', upcoming: 'กำลังมา' };

    return (
        <div style={{ marginTop: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '4px', height: '28px', background: 'linear-gradient(180deg,#10b981,#0ea5e9)', borderRadius: '2px' }} />
                <div>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--md-text-primary)' }}>📋 Discharge Planning Board</h3>
                    <span style={{ fontSize: '12px', color: 'var(--md-text-tertiary)' }}>คาดการณ์จาก adjRW × 4d — ผู้ป่วยที่น่าจะจำหน่ายวันนี้/พรุ่งนี้</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '16px' }}>
                {[
                    { label: 'จำหน่ายวันนี้', value: today_count, color: '#f43f5e', key: 'today' },
                    { label: 'จำหน่ายพรุ่งนี้', value: tomorrow_count, color: '#f59e0b', key: 'tomorrow' },
                    { label: 'รวมทั้งหมด', value: total, color: '#10b981', key: 'all' },
                ].map((k, i) => (
                    <button key={i} onClick={() => setFilter(k.key)} style={{ padding: '14px', background: filter === k.key ? `${k.color}15` : 'var(--md-surface-2)', border: `1px solid ${filter === k.key ? k.color : 'var(--md-border)'}`, borderTop: `3px solid ${k.color}`, borderRadius: '12px', cursor: 'pointer', textAlign: 'left' as const, transition: 'all 0.15s' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' as const, marginBottom: '4px' }}>{k.label}</div>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: k.color }}>{k.value}</div>
                        <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>ราย</div>
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div style={{ padding: '32px', textAlign: 'center', background: 'var(--md-surface-2)', borderRadius: '12px', border: '1px solid var(--md-border)' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--md-text-secondary)' }}>ไม่มีผู้ป่วยที่คาดว่าจะจำหน่ายในช่วงนี้</div>
                </div>
            ) : (
                <div style={{ background: 'var(--md-surface-2)', borderRadius: '14px', border: '1px solid var(--md-border)', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' as const, fontSize: '12px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--md-border)', background: 'var(--md-surface-1)' }}>
                                    {['ผู้ป่วย', 'Ward', 'รับวันที่', 'LOS ปัจจุบัน', 'คาดจำหน่าย', 'adjRW', 'แพทย์', 'สถานะ'].map(h => (
                                        <th key={h} style={{ padding: '10px 12px', textAlign: 'left' as const, fontWeight: 700, color: 'var(--md-text-tertiary)', fontSize: '11px', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.slice(0, 20).map((p: any, i: number) => {
                                    const wColor = windowColor[p.discharge_window] || '#64748b';
                                    const expectedDate = p.expected_discharge ? new Date(p.expected_discharge).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : '—';
                                    const admitDate = p.regdate ? new Date(p.regdate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : '—';
                                    return (
                                        <tr key={i} style={{ borderBottom: '1px solid var(--md-border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                                            <td style={{ padding: '9px 12px', fontWeight: 600 }}>{p.patient_name || `HN ${p.hn}`}</td>
                                            <td style={{ padding: '9px 12px', color: 'var(--md-text-secondary)' }}>{p.ward}</td>
                                            <td style={{ padding: '9px 12px', color: 'var(--md-text-tertiary)' }}>{admitDate}</td>
                                            <td style={{ padding: '9px 12px', fontWeight: 700, color: p.current_los > p.expected_los ? '#f43f5e' : 'var(--md-text-primary)' }}>{p.current_los} วัน</td>
                                            <td style={{ padding: '9px 12px', fontWeight: 700 }}>{expectedDate}</td>
                                            <td style={{ padding: '9px 12px', color: '#8b5cf6', fontWeight: 700 }}>{Number(p.rw).toFixed(2)}</td>
                                            <td style={{ padding: '9px 12px', color: 'var(--md-text-tertiary)', fontSize: '12px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{p.doctor_name || '—'}</td>
                                            <td style={{ padding: '9px 12px' }}>
                                                <span style={{ background: `${wColor}15`, color: wColor, border: `1px solid ${wColor}40`, borderRadius: '99px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' as const }}>
                                                    {windowLabel[p.discharge_window] || '—'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length > 20 && (
                        <div style={{ padding: '8px 16px', textAlign: 'center', fontSize: '12px', color: 'var(--md-text-tertiary)', borderTop: '1px solid var(--md-border)' }}>
                            แสดง 20 จาก {filtered.length} ราย
                        </div>
                    )}
                </div>
            )}
        </div>
    );
});
