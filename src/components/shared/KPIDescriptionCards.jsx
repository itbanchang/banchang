// ============================================================
// BCH 360° Intelligence V.10 — Shared KPI Description Card
// Reusable component for professional KPI metrics with:
// - Thai/English labels, value, icon, color
// - Description + meaning + formula + benchmark + AI tip
// ============================================================
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

    return (
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, gap: '16px' }}>
            {kpis.map((k, i) => {
                const isClickable = !!k.drillDownId;
                const handleClick = () => {
                    if (isClickable) {
                        openDrillDown(k.drillDownId, k.drillDownTitle || k.thLabel, k.drillDownEndpoint);
                    }
                };

                return (
                    <div
                        key={i}
                        className={`glass-card group ${isClickable ? 'cursor-pointer hover:shadow-lg' : 'cursor-default'}`}
                        style={{
                            padding: '16px 20px',
                            borderTop: `4px solid ${k.color}`,
                            transition: 'all 0.3s ease',
                            position: 'relative',
                        }}
                        onClick={handleClick}
                    >
                        {/* Top: Icon + Value */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <div style={{
                                fontSize: '28px', width: '48px', height: '48px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: '12px', background: `${k.color}15`, flexShrink: 0,
                                boxShadow: `0 4px 12px ${k.color}20`
                            }}>{k.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '32px', fontWeight: 900, color: k.color, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '4px' }}>
                                    {k.value}
                                </div>
                                {k.sub && (
                                    <span style={{
                                        fontSize: '11px', fontWeight: 700, color: k.color,
                                        background: `${k.color}15`, padding: '2px 8px', borderRadius: '4px',
                                        textTransform: 'uppercase', letterSpacing: '0.05em'
                                    }}>{k.sub}</span>
                                )}
                            </div>
                            {isClickable && (
                                <span style={{ fontSize: '14px', opacity: 0.3 }} className="group-hover:opacity-100 transition-opacity">
                                    🔍
                                </span>
                            )}
                        </div>

                        {/* Label */}
                        <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', marginBottom: '2px', letterSpacing: '0.01em' }}>
                            {k.thLabel}
                        </div>
                        <div style={{
                            fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)',
                            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px',
                        }}>{k.label}</div>

                        {/* Description Box */}
                        <div style={{
                            padding: '12px', borderRadius: '10px',
                            background: 'var(--md-surface, rgba(0,0,0,0.025))', border: '1px solid var(--md-border, rgba(0,0,0,0.04))',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.01)'
                        }}>
                            {/* Meaning */}
                            <div style={{ fontSize: '12px', color: 'var(--md-text-secondary)', fontWeight: 500, lineHeight: 1.6, marginBottom: '8px' }}>
                                <span style={{ fontSize: '14px', marginRight: '4px' }}>💡</span> {k.meaning}
                            </div>

                            {/* Data */}
                            <div style={{ fontSize: '13px', color: 'var(--md-text-primary)', fontWeight: 700, marginBottom: '8px', padding: '6px', background: 'var(--md-surface-2)', borderRadius: '6px' }}>
                                {k.desc}
                            </div>

                            {/* Formula */}
                            <div style={{
                                fontSize: '11px', color: '#2dd4bf', fontWeight: 600,
                                fontFamily: "'JetBrains Mono', monospace",
                                background: `${k.color}08`, padding: '5px 8px',
                                borderRadius: '6px', marginBottom: '8px',
                                display: 'flex', alignItems: 'center', gap: '6px'
                            }}>
                                <span style={{ fontSize: '13px' }}>📐</span> <span style={{ opacity: 0.9 }}>{k.calc}</span>
                            </div>

                            {/* Target + Benchmark */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap', gap: '4px' }}>
                                <span style={{ fontSize: '11px', color: k.color, fontWeight: 800, background: `${k.color}10`, padding: '3px 8px', borderRadius: '6px' }}>🎯 เป้า: {k.target}</span>
                                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>📊 <span>{k.benchmark}</span></span>
                            </div>

                            {/* Data source + Period */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px', marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed var(--md-border)' }}>
                                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '3px' }}>🗄️ <span>{k.dataSource}</span></span>
                                <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'var(--md-surface-2)', padding: '2px 6px', borderRadius: '4px' }}>{k.period}</span>
                            </div>
                        </div>

                        {/* AI Tip */}
                        <div style={{
                            marginTop: '10px', padding: '8px 12px', borderRadius: '8px',
                            background: `${k.color}08`, border: `1px solid ${k.color}20`,
                            display: 'flex', alignItems: 'flex-start', gap: '8px',
                            boxShadow: `0 2px 8px ${k.color}10`
                        }}>
                            <span style={{ fontSize: '16px', lineHeight: 1, marginTop: '2px' }}>🤖</span>
                            <span style={{ fontSize: '12px', color: k.color, fontWeight: 700, lineHeight: 1.5, textShadow: `0 1px 2px ${k.color}10` }}>
                                {k.aiTip}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default React.memo(KPIDescriptionCards);
