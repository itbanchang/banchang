// ============================================================
// BCH 360° Intelligence V.10 — Server Settings Panel
// เลือก MySQL Server (Master / Slave1 / Slave2)
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';

const STATUS_COLORS = {
  active: '#10b981',
  reachable: '#0ea5e9',
  unreachable: '#ef4444',
  testing: '#f59e0b',
  idle: 'var(--md-text-tertiary)',
};

export default function ServerSettings({ open, onClose }) {
  const [servers, setServers] = useState([]);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(null);
  const [testing, setTesting] = useState(null);
  const [testResults, setTestResults] = useState({});
  const [message, setMessage] = useState(null);

  // Fetch server list
  const fetchServers = useCallback(async () => {
    try {
      const r = await fetch('/api/system/servers', { credentials: 'include' });
      if (r.ok) {
        const data = await r.json();
        setServers(data.servers || []);
        setActive(data.active);
      }
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open) { setLoading(true); setMessage(null); fetchServers(); }
  }, [open, fetchServers]);

  // Test connection
  const testServer = useCallback(async (serverId) => {
    setTesting(serverId);
    setTestResults(prev => ({ ...prev, [serverId]: { status: 'testing' } }));
    try {
      const r = await fetch('/api/system/servers/test', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        credentials: 'include', body: JSON.stringify({ server_id: serverId }),
      });
      const data = await r.json();
      setTestResults(prev => ({ ...prev, [serverId]: data }));
    } catch (e) {
      setTestResults(prev => ({ ...prev, [serverId]: { status: 'unreachable', error: e.message } }));
    }
    setTesting(null);
  }, []);

  // Switch server
  const handleSwitch = useCallback(async (serverId) => {
    if (serverId === active?.id) return;
    setSwitching(serverId);
    setMessage(null);
    try {
      const r = await fetch('/api/system/servers/switch', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        credentials: 'include', body: JSON.stringify({ server_id: serverId }),
      });
      const data = await r.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        await fetchServers();
      } else {
        setMessage({ type: 'error', text: data.error || 'Switch failed' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: e.message });
    }
    setSwitching(null);
  }, [active, fetchServers]);

  // Test all servers
  const testAll = useCallback(() => {
    servers.forEach(s => testServer(s.id));
  }, [servers, testServer]);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: '600px', borderRadius: '24px',
        background: 'var(--md-surface)', border: '1px solid var(--md-border)',
        boxShadow: '0 24px 80px rgba(0,0,0,.25)', overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(15,118,110,.06), rgba(2,132,199,.04))',
          borderBottom: '1px solid var(--md-border)',
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
              Database Server
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
              HOSxP XE — {active?.host || '...'} ({active?.id || '...'})
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={testAll}
              style={{
                padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 700,
                border: '1px solid var(--md-border)', background: 'var(--md-surface)',
                color: 'var(--md-text-secondary)', cursor: 'pointer',
              }}>
              Test All
            </button>
            <button onClick={onClose}
              style={{
                width: '36px', height: '36px', borderRadius: '10px', border: 'none',
                background: 'var(--md-surface-2, #f1f5f9)', cursor: 'pointer',
                fontSize: '18px', color: 'var(--md-text-tertiary)',
              }}>
              x
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div style={{
            margin: '1rem 2rem 0', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700,
            background: message.type === 'success' ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)',
            color: message.type === 'success' ? '#059669' : '#dc2626',
            border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,.3)' : 'rgba(239,68,68,.3)'}`,
          }}>
            {message.type === 'success' ? '✅' : '❌'} {message.text}
          </div>
        )}

        {/* Server List */}
        <div style={{ padding: '1.5rem 2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--md-text-tertiary)' }}>Loading...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {servers.map(srv => {
                const isActive = srv.active;
                const testResult = testResults[srv.id];
                const isTesting = testing === srv.id;
                const isSwitching = switching === srv.id;
                const borderColor = isActive ? '#10b981' : 'var(--md-border)';

                return (
                  <div key={srv.id} style={{
                    padding: '1rem 1.25rem', borderRadius: '16px',
                    border: `2px solid ${borderColor}`,
                    background: isActive ? 'rgba(16,185,129,.04)' : 'var(--md-surface)',
                    transition: 'all .2s',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Status dot */}
                        <div style={{
                          width: '12px', height: '12px', borderRadius: '50%',
                          background: isActive ? '#10b981' : testResult?.status === 'reachable' ? '#0ea5e9' : testResult?.status === 'unreachable' ? '#ef4444' : 'var(--md-text-tertiary)',
                          boxShadow: isActive ? '0 0 8px rgba(16,185,129,.5)' : 'none',
                        }} />
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                            {srv.label}
                            {isActive && (
                              <span style={{
                                marginLeft: '8px', fontSize: '10px', fontWeight: 700,
                                padding: '2px 8px', borderRadius: '99px',
                                background: 'rgba(16,185,129,.15)', color: '#059669',
                              }}>ACTIVE</span>
                            )}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            <span>{srv.host}:{srv.port} / {srv.database}</span>
                            <span style={{ opacity: 0.7 }}>{srv.role}</span>
                            <span style={{
                              fontSize: '9px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px',
                              background: 'rgba(16,185,129,.1)', color: '#059669', border: '1px solid rgba(16,185,129,.2)',
                            }}>READ-ONLY</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {/* Test result badge */}
                        {testResult && !isTesting && (
                          <span style={{
                            fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px',
                            background: testResult.status === 'reachable' ? 'rgba(14,165,233,.1)' : 'rgba(239,68,68,.1)',
                            color: testResult.status === 'reachable' ? '#0284c7' : '#dc2626',
                          }}>
                            {testResult.status === 'reachable'
                              ? `${testResult.latency_ms}ms · v${testResult.version}`
                              : `Error: ${testResult.error?.substring(0, 30)}`}
                          </span>
                        )}

                        {/* Test button */}
                        <button onClick={() => testServer(srv.id)} disabled={isTesting}
                          style={{
                            padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 700,
                            border: '1px solid var(--md-border)', background: 'var(--md-surface)',
                            color: 'var(--md-text-secondary)', cursor: isTesting ? 'wait' : 'pointer',
                            opacity: isTesting ? 0.5 : 1,
                          }}>
                          {isTesting ? '...' : 'Test'}
                        </button>

                        {/* Switch button */}
                        {!isActive && (
                          <button onClick={() => handleSwitch(srv.id)} disabled={isSwitching}
                            style={{
                              padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 800,
                              border: 'none', cursor: isSwitching ? 'wait' : 'pointer',
                              background: 'linear-gradient(135deg, #0f766e, #0284c7)',
                              color: '#fff', opacity: isSwitching ? 0.5 : 1,
                            }}>
                            {isSwitching ? 'Switching...' : 'Switch'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 2rem', borderTop: '1px solid var(--md-border)',
          fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>READ-ONLY ทุก Server · ไม่มีการเขียนข้อมูลลง HOSxP XE</span>
          <span>Admin only · Cache reset เมื่อ Switch</span>
        </div>
      </div>
    </div>
  );
}
