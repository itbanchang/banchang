// ============================================================
// BCH 360° Intelligence V.10 — Shared KPI Description Card
// Reusable component for professional KPI metrics with:
// - Thai/English labels, value, icon, color
// - Description + meaning + formula + benchmark + AI tip
// ============================================================
import React, { useCallback } from 'react';
import { useDashboard } from '../../context/DashboardContext.jsx';

/**
 * @typedef {Object} KPIItem
 * @property {string} label - English label (e.g. 'OPD Coding Rate')
 * @property {string} thLabel - Thai label (e.g. 'อัตราสรุปรหัสโรค OPD')
 * @property {string} value - Display value (e.g. '77%')
 * @property {string} color - Accent color hex (e.g. '#059669')
 * @property {string} icon - Emoji icon (e.g. '📋')
 * @property {string} [sub] - Sub-label (e.g. 'ดีเยี่ยม')
 * @property {string} desc - Short description 
 * @property {string} meaning - Full Thai meaning
 * @property {string} calc - Formula
 * @property {string} dataSource - Data source
 * @property {string} period - Data period
 * @property {string} target - Target value
 * @property {string} benchmark - Benchmark info
 * @property {string} aiTip - AI recommendation
 * @property {string} [drillDownId] - KPI ID for drill-down
 * @property {string} [drillDownEndpoint] - Endpoint for drill-down data
 * @property {string} [drillDownTitle] - Title for the drill-down view
 */

/**
 * Professional KPI Card with description, formula, benchmark, and AI tip.
 * @param {{ kpis: KPIItem[], columns?: string }} props
 */
function KPIDescriptionCards({ kpis, columns }) {
    const { openDrillDown } = useDashboard();
    const gridCols = columns || 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))';

    const handleClick = useCallback((k) => {
        if (k.drillDownId) {
            openDrillDown(k.drillDownId, k.drillDownTitle || k.thLabel, k.drillDownEndpoint);
        }
    }, [openDrillDown]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '16px' }}>
            {kpis.map((k, i) => {
                const isClickable = !!k.drillDownId;

                return (
                    <div
                        key={i}
                        className={`group ${isClickable ? 'cursor-pointer' : 'cursor-default'}`}
                        style={{
                            padding: '24px',
                            background: 'var(--md-surface, rgba(255, 255, 255, 0.6))',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid var(--md-border, rgba(0, 0, 0, 0.05))',
                            borderTop: `4px solid ${k.color}`,
                            borderRadius: '24px',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative',
                            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.4)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                        onClick={() => handleClick(k)}
                        onMouseEnter={e => {
                            if (!isClickable) return;
                            e.currentTarget.style.transform = 'translateY(-6px)';
                            e.currentTarget.style.boxShadow = `0 25px 50px -12px ${k.color}25, inset 0 2px 4px rgba(255,255,255,0.5)`;
                        }}
                        onMouseLeave={e => {
                            if (!isClickable) return;
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.4)';
                        }}
                    >
                        {/* Soft Glow Background */}
                        <div style={{
                            position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px',
                            background: `${k.color}`, filter: 'blur(50px)', opacity: 0.15,
                            borderRadius: '50%', pointerEvents: 'none', transition: 'all 0.5s ease'
                        }} className="group-hover:scale-150 group-hover:opacity-25" />

                        {/* Top: Icon + Value */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                            <div style={{
                                fontSize: '28px', width: '56px', height: '56px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: '16px', background: `linear-gradient(135deg, ${k.color}15 0%, ${k.color}05 100%)`,
                                border: `1px solid ${k.color}30`,
                                flexShrink: 0, boxShadow: `0 8px 16px ${k.color}15`,
                                backdropFilter: 'blur(8px)',
                            }}>{k.icon}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 900, color: k.color, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '6px', textShadow: '0 2px 10px rgba(0,0,0,0.03)', wordBreak: 'break-word' }}>
                                    {k.value}
                                </div>
                                {k.sub && (
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, color: k.color,
                                        background: `linear-gradient(to right, ${k.color}20, ${k.color}10)`, padding: '3px 10px', borderRadius: '6px',
                                        textTransform: 'uppercase', letterSpacing: '0.08em', border: `1px solid ${k.color}20`,
                                        display: 'inline-block'
                                    }}>{k.sub}</span>
                                )}
                            </div>
                            {isClickable && (
                                <span style={{ fontSize: '18px', opacity: 0, transform: 'translateX(-10px)', color: k.color, transition: 'all 0.3s ease' }} className="group-hover:opacity-100 group-hover:transform-none">
                                    ↗
                                </span>
                            )}
                        </div>

                        {/* Label */}
                        <div style={{ position: 'relative', zIndex: 1, flex: '1 0 auto' }}>
                            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--md-text-primary, #1e293b)', marginBottom: '4px', letterSpacing: '0.01em', lineHeight: 1.3 }}>
                                {k.thLabel}
                            </div>
                            <div style={{
                                fontSize: '12px', fontWeight: 700, color: 'var(--md-text-tertiary, #64748b)',
                                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px',
                            }}>{k.label}</div>

                            {/* Description Box */}
                            <div style={{
                                padding: '16px', borderRadius: '16px',
                                background: 'var(--md-surface-2, rgba(255,255,255,0.7))',
                                border: '1px solid var(--md-border, rgba(0,0,0,0.06))',
                                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.02)',
                                backdropFilter: 'blur(10px)',
                            }}>
                                {/* Meaning */}
                                <div style={{ fontSize: '13px', color: 'var(--md-text-secondary, #475569)', fontWeight: 600, lineHeight: 1.6, marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <span style={{ fontSize: '16px', marginTop: '1px' }}>💡</span>
                                    <span>{k.meaning}</span>
                                </div>

                                {/* Data Indicator */}
                                {k.desc && (
                                    <div style={{ fontSize: '14px', color: 'var(--md-text-primary, #0f172a)', fontWeight: 800, marginBottom: '12px', padding: '8px 12px', background: 'var(--md-surface, #f8fafc)', borderRadius: '8px', borderLeft: `3px solid ${k.color}` }}>
                                        {k.desc}
                                    </div>
                                )}

                                {/* Formula */}
                                <div style={{
                                    fontSize: '12px', color: '#0d9488', fontWeight: 700,
                                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                    background: `rgba(13, 148, 136, 0.08)`, padding: '8px 12px',
                                    borderRadius: '8px', marginBottom: '12px',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    border: '1px solid rgba(13, 148, 136, 0.15)'
                                }}>
                                    <span style={{ fontSize: '14px' }}>📐</span> <span style={{ opacity: 0.9, letterSpacing: '0.02em' }}>{k.calc}</span>
                                </div>

                                {/* Target + Benchmark */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                                    <span style={{ fontSize: '12px', color: k.color, fontWeight: 800, background: `${k.color}15`, padding: '4px 10px', borderRadius: '8px', border: `1px solid ${k.color}25` }}>🎯 เป้า: {k.target}</span>
                                    <span style={{ fontSize: '12px', color: 'var(--md-text-secondary, #475569)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>📊 <span style={{ background: 'var(--md-surface, #f1f5f9)', padding: '2px 8px', borderRadius: '6px' }}>{k.benchmark}</span></span>
                                </div>

                                {/* Data source + Period */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--md-border, rgba(0,0,0,0.1))' }}>
                                    <span style={{ fontSize: '12px', color: 'var(--md-text-tertiary, #64748b)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>🗄️ <span>{k.dataSource}</span></span>
                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary, #64748b)', fontWeight: 700, background: 'var(--md-surface-2, #f1f5f9)', padding: '4px 8px', borderRadius: '6px', letterSpacing: '0.04em' }}>{k.period}</span>
                                </div>
                            </div>
                        </div>

                        {/* AI Tip with beautiful styling */}
                        {k.aiTip && (
                            <div style={{
                                marginTop: '16px', padding: '12px 16px', borderRadius: '12px',
                                background: `linear-gradient(135deg, ${k.color}08 0%, ${k.color}15 100%)`,
                                border: `1px solid ${k.color}25`,
                                display: 'flex', alignItems: 'flex-start', gap: '12px',
                                boxShadow: `0 4px 12px ${k.color}10`,
                                position: 'relative', zIndex: 1,
                            }} className="group-hover:bg-opacity-50 transition-all duration-300">
                                <span style={{ fontSize: '20px', lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🤖</span>
                                <div>
                                    <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: k.color, marginBottom: '2px', opacity: 0.8 }}>AI Insight</div>
                                    <span style={{ fontSize: '13px', color: k.color, fontWeight: 700, lineHeight: 1.5, textShadow: `0 1px 2px rgba(255,255,255,0.8)` }}>
                                        {k.aiTip}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default React.memo(KPIDescriptionCards);
