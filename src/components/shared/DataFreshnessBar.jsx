// ============================================================
// BCH 360° Intelligence V.10 — Data Freshness Bar
// Shows last updated time, auto-refresh countdown, force refresh
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';
import { useDashboard } from '../../context/DashboardContext.jsx';

const REFRESH_INTERVAL = 30; // seconds — matches App.jsx setInterval

/**
 * Formats elapsed seconds into Thai relative time
 */
function formatElapsed(ms) {
    if (!ms) return 'ยังไม่โหลด';
    const s = Math.floor((Date.now() - ms) / 1000);
    if (s < 5) return 'เมื่อกี้';
    if (s < 60) return `${s} วินาทีที่แล้ว`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m} นาทีที่แล้ว`;
    const h = Math.floor(m / 60);
    return `${h} ชม.ที่แล้ว`;
}

/**
 * Returns freshness level: fresh (<2m), ok (<5m), stale (<15m), old (>15m)
 */
function getFreshness(ms) {
    if (!ms) return { level: 'unknown', color: '#94a3b8', label: 'N/A', dot: '⚪' };
    const elapsed = (Date.now() - ms) / 1000;
    if (elapsed < 120) return { level: 'fresh', color: '#10b981', label: 'LIVE', dot: '🟢' };
    if (elapsed < 300) return { level: 'ok', color: '#f59e0b', label: 'OK', dot: '🟡' };
    if (elapsed < 900) return { level: 'stale', color: '#f97316', label: 'STALE', dot: '🟠' };
    return { level: 'old', color: '#ef4444', label: 'OFFLINE', dot: '🔴' };
}

export default function DataFreshnessBar({ onForceRefresh }) {
    const { state } = useDashboard();
    const { lastUpdated } = state;
    const [now, setNow] = useState(Date.now());
    const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Tick every second for countdown + elapsed time
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
            setCountdown(prev => {
                if (prev <= 1) return REFRESH_INTERVAL;
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Reset countdown when data updates
    useEffect(() => {
        if (lastUpdated) {
            setCountdown(REFRESH_INTERVAL);
            setIsRefreshing(false);
        }
    }, [lastUpdated]);

    const freshness = getFreshness(lastUpdated);
    const elapsedText = formatElapsed(lastUpdated);
    const progressPct = ((REFRESH_INTERVAL - countdown) / REFRESH_INTERVAL) * 100;

    const handleForceRefresh = useCallback(() => {
        setIsRefreshing(true);
        setCountdown(REFRESH_INTERVAL);
        if (onForceRefresh) onForceRefresh();
    }, [onForceRefresh]);

    const lastTimeStr = lastUpdated
        ? new Date(lastUpdated).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        : '--:--:--';

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '4px 10px', borderRadius: '10px',
            background: `${freshness.color}08`,
            border: `1px solid ${freshness.color}20`,
            transition: 'all 0.3s ease',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Auto-refresh progress bar (bottom) */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0,
                height: '2px',
                width: `${progressPct}%`,
                background: `linear-gradient(90deg, ${freshness.color}40, ${freshness.color})`,
                transition: 'width 1s linear',
                borderRadius: '0 2px 2px 0',
            }} />

            {/* Freshness dot + label */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
            }}>
                <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: freshness.color,
                    boxShadow: freshness.level === 'fresh' ? `0 0 6px ${freshness.color}80` : 'none',
                    animation: freshness.level === 'fresh' ? 'pulse-dot 2s infinite' : 'none',
                }} />
                <span style={{
                    fontSize: '8px', fontWeight: 900, color: freshness.color,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                    {freshness.label}
                </span>
            </div>

            {/* Divider */}
            <div style={{
                width: '1px', height: '14px',
                background: 'var(--md-border)',
            }} />

            {/* Last updated time */}
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                gap: '0px', lineHeight: 1,
            }}>
                <span style={{
                    fontSize: '9px', fontWeight: 700,
                    color: 'var(--md-text-primary)',
                    fontFamily: "'JetBrains Mono', monospace",
                }}>
                    {lastTimeStr}
                </span>
                <span style={{
                    fontSize: '7px', fontWeight: 600,
                    color: 'var(--md-text-tertiary)',
                }}>
                    {elapsedText}
                </span>
            </div>

            {/* Countdown to next refresh */}
            <div style={{
                fontSize: '7px', fontWeight: 700,
                color: 'var(--md-text-tertiary)',
                fontFamily: "'JetBrains Mono', monospace",
                minWidth: '22px', textAlign: 'center',
            }}>
                {countdown}s
            </div>

            {/* Force refresh button */}
            <button
                onClick={handleForceRefresh}
                disabled={isRefreshing}
                title="Force Refresh ข้อมูลทันที"
                style={{
                    width: '22px', height: '22px', borderRadius: '6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isRefreshing ? `${freshness.color}15` : 'transparent',
                    border: `1px solid ${freshness.color}25`,
                    cursor: isRefreshing ? 'wait' : 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '11px',
                    padding: 0,
                    animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                }}
                onMouseEnter={e => {
                    if (!isRefreshing) {
                        e.currentTarget.style.background = `${freshness.color}15`;
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }
                }}
                onMouseLeave={e => {
                    if (!isRefreshing) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'none';
                    }
                }}
            >
                🔄
            </button>
        </div>
    );
}
