// ============================================================
// BCH 360° Intelligence V.10 — Audit Log Viewer (Admin)
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';
import { fmt } from '@utils/formatters';

const fmtDuration = (ms) => {
    if (ms == null) return '—';
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
};
const fmtBytes = (n) => {
    if (!n) return '—';
    if (n < 1024) return `${n}B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
    return `${(n / 1024 / 1024).toFixed(1)}MB`;
};
const fmtTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('th-TH', { hour12: false });
};
const statusColor = (s) => {
    if (!s) return 'var(--md-text-tertiary)';
    if (s < 300) return '#10b981';
    if (s < 400) return '#0ea5e9';
    if (s < 500) return '#f59e0b';
    return '#dc2626';
};

function StatCard({ label, value, sub, color }) {
    return (
        <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderTop: `3px solid ${color}`, borderRadius: '10px', padding: '12px 16px', flex: '1 1 150px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--md-text-primary)', marginTop: '3px' }}>{value}</div>
            {sub && <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>{sub}</div>}
        </div>
    );
}

function AuditLogTab() {
    const [stats, setStats] = useState(null);
    const [logs, setLogs] = useState({ rows: [], total: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState({
        hours: 24,
        user: '',
        ip: '',
        path_like: '',
        suspicious_only: false,
        login_only: false,
        min_status: '',
        limit: 100,
        offset: 0,
    });

    const fetchStats = useCallback(async () => {
        try {
            const r = await fetch(`/api/admin/audit/stats?hours=${filter.hours}`, { credentials: 'include' });
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            setStats(await r.json());
        } catch (e) {
            setError(e.message);
        }
    }, [filter.hours]);

    const fetchLogs = useCallback(async () => {
        setLoading(true); setError(null);
        try {
            const params = new URLSearchParams();
            const since = new Date(Date.now() - filter.hours * 3600 * 1000).toISOString();
            params.set('from', since);
            if (filter.user) params.set('user', filter.user);
            if (filter.ip) params.set('ip', filter.ip);
            if (filter.path_like) params.set('path_like', filter.path_like);
            if (filter.suspicious_only) params.set('suspicious_only', '1');
            if (filter.login_only) params.set('login_only', '1');
            if (filter.min_status) params.set('min_status', filter.min_status);
            params.set('limit', filter.limit);
            params.set('offset', filter.offset);

            const r = await fetch(`/api/admin/audit/logs?${params}`, { credentials: 'include' });
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            setLogs(await r.json());
        } catch (e) {
            setError(e.message);
        }
        setLoading(false);
    }, [filter]);

    useEffect(() => { fetchStats(); fetchLogs(); }, [fetchStats, fetchLogs]);

    const s = stats?.stats || {};
    const loginFailRate = s.login_attempts > 0 ? Math.round((s.login_failed / s.login_attempts) * 100) : 0;

    return (
        <div className="space-y-5 animate-fade-in pb-10">
            {/* ── Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ width: '4px', height: '24px', background: 'linear-gradient(180deg, #7c3aed, #0ea5e9)', borderRadius: '99px' }} />
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                    🔍 Audit Log — การเข้าใช้ระบบ (Admin)
                </h2>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'rgba(124,58,237,.1)', color: '#7c3aed' }}>
                    SQLite · 90-day retention
                </span>
            </div>

            {/* ── Stats ── */}
            {stats && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <StatCard label={`Requests (${stats.hoursBack}h)`} value={fmt(s.total_requests)} sub={`${s.unique_users || 0} users · ${s.unique_ips || 0} IPs`} color="#0ea5e9" />
                    <StatCard label="Login Attempts" value={fmt(s.login_attempts)} sub={`Failed: ${s.login_failed} (${loginFailRate}%)`} color={loginFailRate > 30 ? '#dc2626' : loginFailRate > 10 ? '#f59e0b' : '#10b981'} />
                    <StatCard label="Suspicious" value={fmt(s.suspicious_count)} sub="401/403/429/scanner UA" color={s.suspicious_count > 50 ? '#dc2626' : s.suspicious_count > 10 ? '#f59e0b' : '#10b981'} />
                    <StatCard label="Errors 4xx/5xx" value={fmt((s.status_4xx || 0) + (s.status_5xx || 0))} sub={`4xx: ${s.status_4xx || 0} · 5xx: ${s.status_5xx || 0}`} color={(s.status_5xx || 0) > 0 ? '#dc2626' : '#f59e0b'} />
                    <StatCard label="Avg Duration" value={fmtDuration(Math.round(s.avg_duration_ms || 0))} sub={`Max ${fmtDuration(s.max_duration_ms)}`} color="#7c3aed" />
                    <StatCard label="Exports" value={fmt(s.exports)} sub="CSV/Excel/PDF" color="#db2777" />
                </div>
            )}

            {/* ── Top lists (Users / IPs / Paths) ── */}
            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '10px' }}>
                    <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '10px', padding: '12px 16px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '8px' }}>👥 Top Users ({stats.hoursBack}h)</div>
                        <table style={{ width: '100%', fontSize: '12px' }}>
                            <tbody>
                                {(stats.topUsers || []).slice(0, 5).map((u, i) => (
                                    <tr key={i}><td style={{ padding: '3px 0' }}>{u.username}</td><td style={{ textAlign: 'right', fontWeight: 700 }}>{fmt(u.requests)}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '10px', padding: '12px 16px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '8px' }}>🌐 Top IPs</div>
                        <table style={{ width: '100%', fontSize: '12px' }}>
                            <tbody>
                                {(stats.topIPs || []).slice(0, 5).map((x, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: '3px 0', fontFamily: 'monospace' }}>{x.ip}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 700 }}>{fmt(x.requests)}</td>
                                        <td style={{ textAlign: 'right', color: x.suspicious > 0 ? '#dc2626' : 'var(--md-text-tertiary)', fontSize: '11px' }}>{x.suspicious > 0 ? `⚠${x.suspicious}` : ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '10px', padding: '12px 16px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '8px' }}>📊 Top Paths</div>
                        <table style={{ width: '100%', fontSize: '11px' }}>
                            <tbody>
                                {(stats.topPaths || []).slice(0, 5).map((p, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: '3px 0', fontFamily: 'monospace', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.path}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 700 }}>{fmt(p.hits)}</td>
                                        <td style={{ textAlign: 'right', color: 'var(--md-text-tertiary)' }}>{fmtDuration(Math.round(p.avg_ms))}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Filters ── */}
            <div style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)', borderRadius: '12px', padding: '12px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <select value={filter.hours} onChange={e => setFilter({ ...filter, hours: Number(e.target.value) })} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--md-border)', fontSize: '12px' }}>
                    <option value={1}>1 ชั่วโมง</option>
                    <option value={6}>6 ชั่วโมง</option>
                    <option value={24}>24 ชั่วโมง</option>
                    <option value={72}>3 วัน</option>
                    <option value={168}>7 วัน</option>
                </select>
                <input type="text" placeholder="Username" value={filter.user} onChange={e => setFilter({ ...filter, user: e.target.value })} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--md-border)', fontSize: '12px', width: '120px' }} />
                <input type="text" placeholder="IP address" value={filter.ip} onChange={e => setFilter({ ...filter, ip: e.target.value })} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--md-border)', fontSize: '12px', width: '130px' }} />
                <input type="text" placeholder="Path contains..." value={filter.path_like} onChange={e => setFilter({ ...filter, path_like: e.target.value })} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--md-border)', fontSize: '12px', width: '160px' }} />
                <select value={filter.min_status} onChange={e => setFilter({ ...filter, min_status: e.target.value })} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--md-border)', fontSize: '12px' }}>
                    <option value="">ทุก status</option>
                    <option value="200">2xx ขึ้นไป</option>
                    <option value="400">4xx ขึ้นไป</option>
                    <option value="500">5xx เท่านั้น</option>
                </select>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="checkbox" checked={filter.suspicious_only} onChange={e => setFilter({ ...filter, suspicious_only: e.target.checked })} /> Suspicious
                </label>
                <label style={{ fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input type="checkbox" checked={filter.login_only} onChange={e => setFilter({ ...filter, login_only: e.target.checked })} /> Login only
                </label>
                <button onClick={() => { setFilter({ ...filter, offset: 0 }); fetchLogs(); }} style={{ padding: '5px 14px', borderRadius: '6px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '12px' }}>
                    🔍 Search
                </button>
                <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--md-text-tertiary)' }}>
                    {loading ? 'Loading...' : `Total: ${fmt(logs.total)} · Showing ${logs.rows?.length || 0}`}
                </span>
            </div>

            {error && (
                <div style={{ padding: '10px 14px', background: 'rgba(220,38,38,.08)', color: '#dc2626', fontSize: '12px', borderRadius: '8px' }}>⚠ {error}</div>
            )}

            {/* ── Logs table ── */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--md-surface)', border: '1px solid var(--md-border)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', minWidth: '1100px' }}>
                        <thead>
                            <tr style={{ background: 'var(--md-surface-2)', borderBottom: '2px solid var(--md-border)' }}>
                                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>เวลา</th>
                                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>User</th>
                                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>IP</th>
                                <th style={{ padding: '8px', textAlign: 'center', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Method</th>
                                <th style={{ padding: '8px', textAlign: 'left', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Path</th>
                                <th style={{ padding: '8px', textAlign: 'center', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Status</th>
                                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Time</th>
                                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Size</th>
                                <th style={{ padding: '8px', textAlign: 'center', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>Flags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(logs.rows || []).map(r => {
                                const flags = [];
                                if (r.is_login) flags.push('🔑');
                                if (r.is_export) flags.push('📥');
                                if (r.is_suspicious) flags.push('⚠️');
                                return (
                                    <tr key={r.id} style={{ borderBottom: '1px solid var(--md-divider)', background: r.is_suspicious ? 'rgba(220,38,38,.04)' : 'transparent' }}>
                                        <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'nowrap', color: 'var(--md-text-secondary)' }}>{fmtTime(r.ts)}</td>
                                        <td style={{ padding: '6px 8px', fontWeight: 700 }}>{r.username}{r.role && <span style={{ marginLeft: 4, fontSize: '9px', fontWeight: 600, padding: '1px 5px', borderRadius: '4px', background: 'rgba(124,58,237,.1)', color: '#7c3aed' }}>{r.role}</span>}</td>
                                        <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontSize: '10px' }}>{r.ip}</td>
                                        <td style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 700, fontSize: '10px' }}>{r.method}</td>
                                        <td style={{ padding: '6px 8px', fontFamily: 'monospace', fontSize: '10px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.path + (r.query_string ? '?' + r.query_string : '')}>
                                            {r.path}
                                            {r.query_string && <span style={{ color: 'var(--md-text-tertiary)' }}>?{r.query_string.substring(0, 30)}{r.query_string.length > 30 ? '…' : ''}</span>}
                                        </td>
                                        <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                                            <span style={{ fontWeight: 800, fontSize: '11px', padding: '1px 8px', borderRadius: '6px', background: `${statusColor(r.status)}15`, color: statusColor(r.status) }}>{r.status}</span>
                                        </td>
                                        <td style={{ padding: '6px 8px', textAlign: 'right', color: r.duration_ms > 5000 ? '#dc2626' : r.duration_ms > 1000 ? '#f59e0b' : 'var(--md-text-secondary)', fontSize: '10px' }}>{fmtDuration(r.duration_ms)}</td>
                                        <td style={{ padding: '6px 8px', textAlign: 'right', color: 'var(--md-text-tertiary)', fontSize: '10px' }}>{fmtBytes(r.bytes_out)}</td>
                                        <td style={{ padding: '6px 8px', textAlign: 'center' }}>{flags.join(' ')}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {logs.total > logs.limit && (
                    <div style={{ padding: '8px 14px', borderTop: '1px solid var(--md-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                        <span>หน้า {Math.floor(filter.offset / filter.limit) + 1} / {Math.ceil(logs.total / filter.limit)}</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button disabled={filter.offset === 0} onClick={() => setFilter({ ...filter, offset: Math.max(0, filter.offset - filter.limit) })} style={{ padding: '3px 10px', fontSize: '11px', cursor: filter.offset === 0 ? 'not-allowed' : 'pointer' }}>← ก่อน</button>
                            <button disabled={filter.offset + filter.limit >= logs.total} onClick={() => setFilter({ ...filter, offset: filter.offset + filter.limit })} style={{ padding: '3px 10px', fontSize: '11px', cursor: filter.offset + filter.limit >= logs.total ? 'not-allowed' : 'pointer' }}>ถัดไป →</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(AuditLogTab);
