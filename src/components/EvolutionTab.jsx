// ============================================================
// BCH 360° Intelligence V.10 — Self-Upgrade System Tab
// Learning Journal + Evolution Log
// ============================================================
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const MODULE_LABELS = {
    forecast: { label: 'Revenue Forecast', icon: '📈', color: '#7c3aed' },
    ews: { label: 'NEWS2 EWS', icon: '🫀', color: '#ef4444' },
    readmission: { label: 'Readmission Risk', icon: '🔄', color: '#f59e0b' },
    sepsis: { label: 'Sepsis Detection', icon: '🦠', color: '#dc2626' },
    er_surge: { label: 'ER Surge', icon: '🚑', color: '#0ea5e9' },
    drg: { label: 'DRG Optimizer', icon: '🏷️', color: '#10b981' },
    bed_demand: { label: 'Bed Demand', icon: '🛏️', color: '#6366f1' },
    ncd: { label: 'NCD Risk', icon: '💊', color: '#0f766e' },
    billing: { label: 'Billing Anomaly', icon: '💰', color: '#d97706' },
    los: { label: 'LOS Predictor', icon: '⏱️', color: '#8b5cf6' },
    system: { label: 'System', icon: '⚙️', color: '#64748b' },
};

const TYPE_CONFIG = {
    pattern: { label: 'Pattern', icon: '🔍', color: '#0ea5e9' },
    anomaly: { label: 'Anomaly', icon: '⚠️', color: '#f59e0b' },
    decision: { label: 'Decision', icon: '🧠', color: '#8b5cf6' },
    accuracy: { label: 'Accuracy', icon: '🎯', color: '#10b981' },
};

const EVO_CONFIG = {
    release: { label: 'Release', icon: '🚀', color: '#7c3aed' },
    improvement: { label: 'Improvement', icon: '✨', color: '#0ea5e9' },
    bugfix: { label: 'Bug Fix', icon: '🔧', color: '#f59e0b' },
    config: { label: 'Config', icon: '⚙️', color: '#64748b' },
    note: { label: 'Note', icon: '📝', color: '#6366f1' },
};

const SEVERITY_COLOR = { info: '#0ea5e9', warning: '#f59e0b', critical: '#ef4444' };
const PIE_COLORS = ['#7c3aed', '#0ea5e9', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#d97706', '#0f766e'];

function EvolutionTab() {
    const [timeline, setTimeline] = useState([]);
    const [stats, setStats] = useState(null);
    const [evolution, setEvolution] = useState([]);
    const [healing, setHealing] = useState(null);
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeView, setActiveView] = useState('healing'); // 'healing' | 'timeline' | 'learning' | 'evolution'
    const [filterModule, setFilterModule] = useState('');
    const [filterDays, setFilterDays] = useState(30);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const [tl, st, ev, hl, hc] = await Promise.all([
                fetch(`/api/evolution/timeline?days=${filterDays}&limit=200`, { credentials: 'include' }).then(r => r.ok ? r.json() : null),
                fetch('/api/evolution/learning/stats', { credentials: 'include' }).then(r => r.ok ? r.json() : null),
                fetch(`/api/evolution/evolution?days=365&limit=100`, { credentials: 'include' }).then(r => r.ok ? r.json() : null),
                fetch('/api/evolution/healing', { credentials: 'include' }).then(r => r.ok ? r.json() : null),
                fetch('/api/evolution/health', { credentials: 'include' }).then(r => r.ok ? r.json() : null),
            ]);
            if (tl?.data) setTimeline(tl.data);
            if (st) setStats(st);
            if (ev?.data) setEvolution(ev.data);
            if (hl) setHealing(hl);
            if (hc) setHealth(hc);
        } catch { }
        setLoading(false);
    }, [filterDays]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    // Filtered timeline
    const filtered = useMemo(() => {
        if (!filterModule) return timeline;
        return timeline.filter(e => e.source_module === filterModule || e.category === filterModule);
    }, [timeline, filterModule]);

    // Chart data: events by module
    const moduleChart = useMemo(() => {
        return (stats?.by_module || []).map(m => ({
            name: MODULE_LABELS[m.module]?.label || m.module,
            count: m.count,
            fill: MODULE_LABELS[m.module]?.color || '#64748b',
        }));
    }, [stats]);

    // Chart data: events by type
    const typeChart = useMemo(() => {
        return (stats?.by_type || []).map(t => ({
            name: TYPE_CONFIG[t.event_type]?.label || t.event_type,
            value: t.count,
        }));
    }, [stats]);

    const cardStyle = { padding: '16px', borderRadius: '16px', background: 'var(--md-surface)', border: '1px solid var(--md-border)' };

    return (
        <div className="space-y-5 animate-fade-in pb-10">
            {/* ── Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #7c3aed, #6366f1)', borderRadius: '99px' }} />
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    🧬 Self-Upgrade System
                </h2>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'rgba(124,58,237,.1)', color: '#7c3aed' }}>
                    Learning Journal · Evolution Log
                </span>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'rgba(99,102,241,.1)', color: '#6366f1' }}>
                    {stats?.total_all || 0} Total Events
                </span>
            </div>

            {/* ── KPI Summary ── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
                {[
                    { label: 'System Health', sub: health?.uptime_hours ? `Uptime ${health.uptime_hours}h` : 'checking...', value: health?.status === 'healthy' ? '✓' : health?.status === 'warning' ? '⚠' : health?.status === 'critical' ? '✗' : '...', icon: health?.status === 'healthy' ? '💚' : health?.status === 'warning' ? '💛' : '❤️', color: health?.status === 'healthy' ? '#10b981' : health?.status === 'warning' ? '#f59e0b' : '#ef4444', gradient: health?.status === 'healthy' ? 'rgba(16,185,129,.08)' : 'rgba(245,158,11,.08)' },
                    { label: 'Auto-Fixed', sub: 'แก้อัตโนมัติสำเร็จ', value: healing?.auto_fixed || 0, icon: '🔧', color: '#0ea5e9', gradient: 'rgba(14,165,233,.08)' },
                    { label: 'Errors/Hour', sub: 'ตรวจจับ error', value: healing?.total_errors_last_hour || 0, icon: '⚡', color: healing?.total_errors_last_hour > 10 ? '#ef4444' : '#64748b', gradient: healing?.total_errors_last_hour > 10 ? 'rgba(239,68,68,.08)' : 'rgba(100,116,139,.08)' },
                    { label: 'Needs Human', sub: 'ต้องให้คนแก้', value: healing?.needs_human || 0, icon: '👨‍💻', color: healing?.needs_human > 0 ? '#f59e0b' : '#10b981', gradient: healing?.needs_human > 0 ? 'rgba(245,158,11,.08)' : 'rgba(16,185,129,.08)' },
                    { label: 'Memory', sub: `${health?.memory?.heap_used_mb || '?'} / ${health?.memory?.heap_total_mb || '?'} MB`, value: `${health?.memory?.pct || 0}%`, icon: '🧮', color: (health?.memory?.pct || 0) > 80 ? '#ef4444' : '#0ea5e9', gradient: 'rgba(14,165,233,.08)' },
                    { label: 'Evolution', sub: 'การอัปเกรดระบบ', value: evolution.length, icon: '🚀', color: '#7c3aed', gradient: 'rgba(124,58,237,.08)' },
                ].map((kpi, i) => (
                    <div key={i} style={{ ...cardStyle, background: kpi.gradient, borderTop: `3px solid ${kpi.color}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</span>
                                <div style={{ fontSize: '28px', fontWeight: 900, color: kpi.color, lineHeight: 1.2, marginTop: '4px' }}>{kpi.value}</div>
                                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)' }}>{kpi.sub}</span>
                            </div>
                            <span style={{ fontSize: '24px' }}>{kpi.icon}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── View Toggle + Filters ── */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                {[
                    { id: 'healing', label: '🔧 Self-Healing' },
                    { id: 'timeline', label: '📋 Timeline' },
                    { id: 'learning', label: '🧠 Learning Analytics' },
                    { id: 'evolution', label: '🚀 Evolution Log' },
                ].map(v => (
                    <button key={v.id} onClick={() => setActiveView(v.id)}
                        style={{
                            padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer',
                            background: activeView === v.id ? 'linear-gradient(135deg, #7c3aed, #6366f1)' : 'var(--md-surface-2, #f1f5f9)',
                            color: activeView === v.id ? '#fff' : 'var(--md-text-secondary)', transition: 'all 0.2s',
                        }}>{v.label}</button>
                ))}
                <select value={filterDays} onChange={e => setFilterDays(Number(e.target.value))}
                    style={{ padding: '5px 10px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '11px', fontWeight: 600, background: 'var(--md-surface)', color: 'var(--md-text-primary)' }}>
                    <option value={7}>7 วัน</option>
                    <option value={30}>30 วัน</option>
                    <option value={90}>90 วัน</option>
                    <option value={365}>1 ปี</option>
                </select>
                {activeView === 'timeline' && (
                    <select value={filterModule} onChange={e => setFilterModule(e.target.value)}
                        style={{ padding: '5px 10px', borderRadius: '8px', border: '1px solid var(--md-border)', fontSize: '11px', fontWeight: 600, background: 'var(--md-surface)', color: 'var(--md-text-primary)' }}>
                        <option value="">ทุก Module</option>
                        {Object.entries(MODULE_LABELS).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
                    </select>
                )}
                {loading && <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>กำลังโหลด...</span>}
            </div>

            {/* ══════ SELF-HEALING VIEW ══════ */}
            {activeView === 'healing' && (
                <div className="space-y-4">
                    {/* Error Pattern Detection */}
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                            🔧 Self-Healing Engine — Error Pattern Detection
                        </h3>
                        {(healing?.error_patterns || []).length === 0 && (
                            <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--md-text-tertiary)', fontSize: '12px' }}>
                                ระบบ Self-Healing พร้อมทำงาน — ยังไม่มี error ที่ต้องจัดการ
                            </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
                            {(healing?.error_patterns || []).map((p, i) => {
                                const isActive = (healing?.by_pattern || []).find(bp => bp.pattern_id === p.id);
                                const sevColor = p.severity === 'critical' ? '#ef4444' : p.severity === 'warning' ? '#f59e0b' : '#64748b';
                                return (
                                    <div key={i} style={{
                                        padding: '10px 14px', borderRadius: '10px', borderLeft: `3px solid ${sevColor}`,
                                        background: isActive ? `${sevColor}08` : 'var(--md-surface-2, rgba(0,0,0,.02))',
                                        border: `1px solid ${isActive ? sevColor + '30' : 'var(--md-border)'}`,
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{p.diagnosis}</span>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <span style={{ fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px', background: `${sevColor}15`, color: sevColor }}>{p.severity}</span>
                                                {p.auto_fixable && <span style={{ fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px', background: 'rgba(16,185,129,.1)', color: '#10b981' }}>auto-fix</span>}
                                                {!p.auto_fixable && <span style={{ fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px', background: 'rgba(245,158,11,.1)', color: '#f59e0b' }}>manual</span>}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '10px', color: 'var(--md-text-tertiary)' }}>
                                            {p.module} {isActive ? ` · ${isActive.count} occurrences` : ''}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Healing Actions */}
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 14px 0', fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                            ⚡ Recent Actions — ล่าสุด
                        </h3>
                        {(healing?.recent_actions || []).length === 0 && (
                            <div style={{ textAlign: 'center', padding: '30px 0', color: '#10b981', fontSize: '13px', fontWeight: 700 }}>
                                ✅ ไม่มี error — ระบบทำงานปกติ
                            </div>
                        )}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {(healing?.recent_actions || []).map((action, i) => {
                                const sevColor = action.severity === 'critical' ? '#ef4444' : action.severity === 'warning' ? '#f59e0b' : '#64748b';
                                const fixed = action.fix_result?.success;
                                return (
                                    <div key={i} style={{
                                        display: 'flex', gap: '10px', padding: '8px 12px', borderRadius: '8px',
                                        background: i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))',
                                        borderLeft: `3px solid ${fixed ? '#10b981' : action.auto_fix ? '#ef4444' : '#f59e0b'}`,
                                    }}>
                                        <span style={{ fontSize: '14px', minWidth: '20px' }}>{fixed ? '✅' : action.auto_fix ? '❌' : '👨‍💻'}</span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)', marginBottom: '2px' }}>
                                                {action.diagnosis}
                                            </div>
                                            <div style={{ fontSize: '10px', color: 'var(--md-text-secondary)' }}>
                                                {action.fix_result ? `${action.fix_result.action}${action.fix_result.error ? ` — ${action.fix_result.error}` : ''}` : action.suggested_fix || action.error_message?.slice(0, 100)}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                                            <span style={{ fontSize: '8px', fontWeight: 700, padding: '1px 6px', borderRadius: '99px', background: `${sevColor}15`, color: sevColor }}>{action.severity}</span>
                                            <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)' }}>
                                                {action.timestamp ? new Date(action.timestamp).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Health Issues */}
                    {health?.issues?.length > 0 && (
                        <div style={{ ...cardStyle, borderTop: '3px solid #ef4444' }}>
                            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800, color: '#ef4444' }}>
                                🚨 Active Issues — ปัญหาที่ตรวจพบ
                            </h3>
                            {health.issues.map((issue, i) => (
                                <div key={i} style={{ padding: '8px 12px', borderRadius: '8px', marginBottom: '6px', background: issue.severity === 'critical' ? 'rgba(239,68,68,.06)' : 'rgba(245,158,11,.06)', border: `1px solid ${issue.severity === 'critical' ? 'rgba(239,68,68,.2)' : 'rgba(245,158,11,.2)'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)' }}>{issue.issue}</span>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {issue.fix_applied && <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px', background: 'rgba(16,185,129,.1)', color: '#10b981' }}>auto-fixed</span>}
                                            {!issue.fix_applied && issue.autoFix && <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px', background: 'rgba(245,158,11,.1)', color: '#f59e0b' }}>fix pending</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ══════ TIMELINE VIEW ══════ */}
            {activeView === 'timeline' && (
                <div style={cardStyle}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                        📋 Timeline — {filtered.length} events
                    </h3>
                    {filtered.length === 0 && !loading && (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--md-text-tertiary)', fontSize: '13px' }}>
                            ยังไม่มีข้อมูล — ระบบจะเริ่มบันทึกอัตโนมัติจาก AI Modules
                        </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {filtered.map((item, i) => {
                            const isLearning = item.source === 'learning';
                            const cfg = isLearning ? (TYPE_CONFIG[item.category] || TYPE_CONFIG.pattern) : (EVO_CONFIG[item.category] || EVO_CONFIG.note);
                            const modCfg = MODULE_LABELS[item.source_module] || { label: item.source_module, icon: '📦', color: '#64748b' };
                            const sevColor = SEVERITY_COLOR[item.severity] || '#64748b';

                            return (
                                <div key={`${item.source}-${item.id}`} style={{
                                    display: 'flex', gap: '12px', padding: '10px 12px', borderRadius: '10px',
                                    background: i % 2 === 0 ? 'transparent' : 'var(--md-surface-2, rgba(0,0,0,.02))',
                                    borderLeft: `3px solid ${cfg.color}`,
                                }}>
                                    {/* Icon */}
                                    <div style={{ fontSize: '18px', minWidth: '28px', textAlign: 'center', paddingTop: '2px' }}>{cfg.icon}</div>
                                    {/* Content */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '2px' }}>
                                            <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{item.title}</span>
                                            <span style={{ fontSize: '9px', fontWeight: 700, padding: '1px 6px', borderRadius: '99px', background: `${cfg.color}15`, color: cfg.color }}>
                                                {cfg.label}
                                            </span>
                                            {isLearning && (
                                                <span style={{ fontSize: '9px', fontWeight: 700, padding: '1px 6px', borderRadius: '99px', background: `${modCfg.color}15`, color: modCfg.color }}>
                                                    {modCfg.icon} {modCfg.label}
                                                </span>
                                            )}
                                            {item.severity && item.severity !== 'info' && item.severity !== 'minor' && (
                                                <span style={{ fontSize: '9px', fontWeight: 700, padding: '1px 6px', borderRadius: '99px', background: `${sevColor}15`, color: sevColor }}>
                                                    {item.severity}
                                                </span>
                                            )}
                                            {item.metric_value != null && (
                                                <span style={{ fontSize: '9px', fontWeight: 800, color: '#7c3aed' }}>
                                                    {Number(item.metric_value).toLocaleString()} {item.metric_unit || ''}
                                                </span>
                                            )}
                                        </div>
                                        {item.detail && (
                                            <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, marginTop: '2px' }}>
                                                {item.detail.length > 200 ? item.detail.slice(0, 200) + '...' : item.detail}
                                            </div>
                                        )}
                                    </div>
                                    {/* Date */}
                                    <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)', whiteSpace: 'nowrap', minWidth: '70px', textAlign: 'right' }}>
                                        {item.created_at ? new Date(item.created_at).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }) : item.event_date}
                                        <div style={{ fontSize: '8px', marginTop: '2px', opacity: 0.7 }}>
                                            {isLearning ? '🧠 AI' : '🚀 System'}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ══════ LEARNING ANALYTICS VIEW ══════ */}
            {activeView === 'learning' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
                    {/* Events by Module — Bar Chart */}
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                            🤖 Learning Events by Module (30 days)
                        </h3>
                        {moduleChart.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={moduleChart} layout="vertical" margin={{ top: 0, right: 10, left: 80, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--md-border)" horizontal={false} />
                                    <XAxis type="number" tick={{ fontSize: 9, fill: 'var(--md-text-tertiary)' }} />
                                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--md-text-secondary)', fontWeight: 600 }} width={80} />
                                    <Tooltip contentStyle={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '10px', fontSize: '11px' }} />
                                    <Bar dataKey="count" name="Events" radius={[0, 4, 4, 0]}>
                                        {moduleChart.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--md-text-tertiary)', fontSize: '12px' }}>
                                ยังไม่มีข้อมูล Learning — AI Modules จะเริ่มบันทึกอัตโนมัติ
                            </div>
                        )}
                    </div>

                    {/* Events by Type — Pie Chart */}
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                            📊 Events by Type
                        </h3>
                        {typeChart.length > 0 ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ResponsiveContainer width="60%" height={220}>
                                    <PieChart>
                                        <Pie data={typeChart} cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={3} dataKey="value">
                                            {typeChart.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip contentStyle={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '10px', fontSize: '11px' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {typeChart.map((t, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: PIE_COLORS[i % PIE_COLORS.length] }} />
                                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-secondary)' }}>{t.name}</span>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)', marginLeft: 'auto' }}>{t.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--md-text-tertiary)', fontSize: '12px' }}>
                                ยังไม่มีข้อมูล
                            </div>
                        )}
                    </div>

                    {/* Severity breakdown */}
                    <div style={cardStyle}>
                        <h3 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                            🔔 Severity Distribution
                        </h3>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {(stats?.by_severity || []).map((s, i) => (
                                <div key={i} style={{ flex: 1, minWidth: '100px', padding: '12px', borderRadius: '12px', background: `${SEVERITY_COLOR[s.severity] || '#64748b'}10`, borderTop: `3px solid ${SEVERITY_COLOR[s.severity] || '#64748b'}`, textAlign: 'center' }}>
                                    <div style={{ fontSize: '24px', fontWeight: 900, color: SEVERITY_COLOR[s.severity] || '#64748b' }}>{s.count}</div>
                                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase' }}>{s.severity}</div>
                                </div>
                            ))}
                            {(stats?.by_severity || []).length === 0 && (
                                <div style={{ textAlign: 'center', width: '100%', padding: '20px 0', color: 'var(--md-text-tertiary)', fontSize: '12px' }}>—</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ══════ EVOLUTION LOG VIEW ══════ */}
            {activeView === 'evolution' && (
                <div style={cardStyle}>
                    <h3 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                        🚀 Evolution Log — ประวัติการพัฒนาระบบ
                    </h3>
                    {evolution.length === 0 && !loading && (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--md-text-tertiary)', fontSize: '13px' }}>ยังไม่มีข้อมูล</div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {evolution.map((ev, i) => {
                            const cfg = EVO_CONFIG[ev.category] || EVO_CONFIG.note;
                            const impactColor = ev.impact === 'major' ? '#7c3aed' : ev.impact === 'patch' ? '#64748b' : '#0ea5e9';
                            return (
                                <div key={ev.id} style={{
                                    display: 'flex', gap: '12px', padding: '12px 14px', borderRadius: '12px',
                                    background: 'var(--md-surface-2, rgba(0,0,0,.02))',
                                    border: `1px solid var(--md-border)`,
                                    borderLeft: `4px solid ${cfg.color}`,
                                }}>
                                    <div style={{ fontSize: '22px', minWidth: '32px', textAlign: 'center' }}>{cfg.icon}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>{ev.title}</span>
                                            {ev.version && (
                                                <span style={{ fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px', background: 'rgba(124,58,237,.1)', color: '#7c3aed' }}>
                                                    {ev.version}
                                                </span>
                                            )}
                                            <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px', background: `${impactColor}15`, color: impactColor }}>
                                                {ev.impact}
                                            </span>
                                            <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '99px', background: `${cfg.color}15`, color: cfg.color }}>
                                                {cfg.label}
                                            </span>
                                        </div>
                                        {ev.description && (
                                            <div style={{ fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5 }}>{ev.description}</div>
                                        )}
                                        {ev.tags && (
                                            <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                                                {ev.tags.split(',').map((tag, ti) => (
                                                    <span key={ti} style={{ fontSize: '9px', fontWeight: 600, padding: '1px 6px', borderRadius: '99px', background: 'var(--md-surface)', border: '1px solid var(--md-border)', color: 'var(--md-text-tertiary)' }}>
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-tertiary)', whiteSpace: 'nowrap', minWidth: '80px', textAlign: 'right' }}>
                                        {new Date(ev.event_date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
                                        <div style={{ fontSize: '9px', marginTop: '2px', opacity: 0.7 }}>{ev.author}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="text-center" style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', padding: '12px 0' }}>
                🧬 BCH 360° Intelligence · Self-Upgrade System · Learning Journal + Evolution Log · Auto-capture from 11 AI Modules
            </div>
        </div>
    );
}

export default React.memo(EvolutionTab);
