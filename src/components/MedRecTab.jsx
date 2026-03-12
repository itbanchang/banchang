// ============================================================
// BCH 360° Intelligence V.10 - Medical Records Tab (เวชระเบียน)
// 📇 Professional Dashboard & Analytics
// ============================================================
import React, { useEffect, useMemo } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Cell, ComposedChart, Area, Line, LineChart, Legend, Bar as ReBar
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import MedRecIntelligenceHub from './medrec/MedRecIntelligenceHub.jsx';
import MedRecKPIBadges from './medrec/MedRecKPIBadges.jsx';

export default function MedRecTab() {
    const { state, fetchData } = useDashboard();
    const mrToday = state.medRecToday;
    const mrAnalytics = state.medRecAnalytics;
    const loading = state.loading;

    useEffect(() => {
        fetchData('medRecToday', '/api/medrec/today');
        fetchData('medRecAnalytics', '/api/medrec/analytics');
        fetchData('drgOptimization', '/api/medrec/drg-optimization');
    }, [fetchData]);

    const today = mrToday || {};
    const analytics = mrAnalytics || {};
    const drgOpt = state.drgOptimization || { mccMissing: [], pdxOptimization: [], losAlert: [], labAlerts: [] };

    // ── Merge Chart Data with Benchmarks ──
    const chartData = useMemo(() => {
        if (!today.hourly) return [];
        return today.hourly.map(h => {
            const bench = analytics.hourly_benchmark?.find(b => b.hr === h.hour);
            return {
                ...h,
                baseline: bench ? Math.round(bench.avg) : 0
            };
        });
    }, [today.hourly, analytics.hourly_benchmark]);

    const getQualityColor = (score) => {
        if (score >= 90) return '#059669';
        if (score >= 70) return '#f59e0b';
        return '#e11d48';
    };

    const ipdCoderTrendData = useMemo(() => {
        const dateMap = {};
        const codersSet = new Set();

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const dt = new Date(year, month, i);
            const formatted = `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
            dateMap[formatted] = { label: formatted, timestamp: dt.getTime() };
        }

        if (today.ipd_coders_daily && today.ipd_coders_daily.length > 0) {
            today.ipd_coders_daily.forEach(row => {
                const dt = new Date(row.date);
                const formatted = `${dt.getDate().toString().padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
                if (!dateMap[formatted]) dateMap[formatted] = { label: formatted, timestamp: dt.getTime() };
                dateMap[formatted][row.name] = row.count;
                codersSet.add(row.name);
            });
        }

        const data = Object.values(dateMap).sort((a, b) => a.timestamp - b.timestamp);

        // Sort topCoders based on today's performance to match the legend colors
        const todayRanks = (today.ipd_coders_fiscal || []).map(c => c.name);
        const topCoders = Array.from(codersSet).sort((a, b) => {
            const idxA = todayRanks.indexOf(a);
            const idxB = todayRanks.indexOf(b);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return 0;
        });

        return { data, topCoders };
    }, [today.ipd_coders_daily, today.ipd_coders_fiscal]);

    const ipdCoderMonthTrend = useMemo(() => {
        if (!today.ipd_coders_trend_fy) return { data: [], topCoders: [], fiscalLabel: '' };
        const monthMap = {};
        const codersSet = new Set();

        today.ipd_coders_trend_fy.forEach(row => {
            const thMonths = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
            const [y, m] = row.month.split('-');
            const shortLabel = thMonths[parseInt(m)] || row.month;
            if (!monthMap[row.month]) monthMap[row.month] = { month: row.month, shortLabel };
            monthMap[row.month][row.name] = row.count;
            codersSet.add(row.name);
        });

        const data = Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month));
        const topCoders = Array.from(codersSet).sort((a, b) => {
            const totalA = today.ipd_coders_trend_fy.filter(r => r.name === a).reduce((s, r) => s + r.count, 0);
            const totalB = today.ipd_coders_trend_fy.filter(r => r.name === b).reduce((s, r) => s + r.count, 0);
            return totalB - totalA;
        }).slice(0, 5);

        // Fiscal year label: ปีงบ พ.ศ. = year the FY ends (e.g. Oct 2025–Sep 2026 = ปีงบ 2569)
        const now = new Date();
        const fyStart = now.getMonth() >= 9 ? now.getFullYear() : now.getFullYear() - 1;
        const fiscalLabel = `ปีงบ ${fyStart + 1 + 543}`;

        return { data, topCoders, fiscalLabel };
    }, [today.ipd_coders_trend_fy]);


    const coderColors = ['#e11d48', '#0284c7', '#059669', '#f59e0b', '#0f766e', '#0ea5e9', '#ec4899'];
    const getCoderColor = (name) => {
        const idx = ipdCoderTrendData.topCoders.indexOf(name);
        return idx !== -1 ? coderColors[idx % coderColors.length] : '#94a3b8';
    };

    return (
        <div className="space-y-4 animate-fade-in pb-12">
            {/* ━━ AI Medical Records & Revenue Recovery Hub ━━ */}
            <MedRecIntelligenceHub today={today} analytics={analytics} />

            {/* ━━━ Professional KPI Dashboard with AI Descriptions ━━━ */}
            <MedRecKPIBadges today={today} />


            {/* ━━━ Header ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '-8px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ padding: '8px', borderRadius: '12px', background: 'linear-gradient(135deg, #059669, #059669)', boxShadow: '0 4px 15px rgba(16,185,129,.3)' }}>
                        <span style={{ fontSize: '20px' }}>📇</span>
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--md-text-primary)' }}>
                            Medical Record & Audit Operations
                        </h2>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                            Dashboard วิเคราะห์ประสิทธิภาพเวชระเบียนและการสรุปรหัสโรค (HOSxP XE Live)
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div className="glass-card" style={{ padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(16,185,129,.2)' }}>
                        <div className="pulse-dot" style={{ background: '#059669' }} />
                        <span style={{ color: '#059669' }}>Live Sync</span>
                    </div>
                    <div className="glass-card" style={{ padding: '4px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
                        Updated: {today.timestamp ? new Date(today.timestamp).toLocaleTimeString() : '—'}
                    </div>
                </div>
            </div>

            {/* ━━━ OPD Section ━━━ */}
            <div style={{ margin: '1.5rem 0', paddingBottom: '0.5rem', borderBottom: '2px dashed var(--md-divider)' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🔵</span> ส่วนผู้ป่วยนอก (OPD)
                </h3>
            </div>

            {/* ━━━ Executive Summary ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                <div style={{
                    padding: '1.5rem', borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.9) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <div>
                                <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#059669', marginBottom: '4px' }}>Traffic Overview</p>
                                <h3 style={{ margin: 0, fontSize: '36px', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em' }}>
                                    {today.total_visits?.toLocaleString() ?? 0}
                                    <span style={{ fontSize: '14px', marginLeft: '8px', color: 'rgba(255,255,255,0.4)' }}>ครั้ง</span>
                                </h3>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>UNIQUE PATIENTS</p>
                                <p style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#fff' }}>{today.unique_patients?.toLocaleString() ?? 0}</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ background: 'rgba(15,118,110,0.1)', border: '1px solid rgba(15,118,110,0.2)', padding: '12px', borderRadius: '16px' }}>
                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#a78bfa' }}>NEW: {today.new_patients}</p>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '4px' }}>
                                    <div style={{ height: '100%', background: '#a78bfa', width: `${today.total_visits > 0 ? (today.new_patients / today.total_visits) * 100 : 0}%` }} />
                                </div>
                            </div>
                            <div style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)', padding: '12px', borderRadius: '16px' }}>
                                <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: '#38bdf8' }}>REVISIT: {today.old_patients}</p>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '4px' }}>
                                    <div style={{ height: '100%', background: '#38bdf8', width: `${today.total_visits > 0 ? (today.old_patients / today.total_visits) * 100 : 0}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--md-text-tertiary)', marginBottom: '1rem' }}>Overall Audit Score</p>
                    <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                            <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="3" />
                            <circle cx="18" cy="18" r="16" fill="none" stroke={getQualityColor(today.quality_score)} strokeWidth="3"
                                strokeDasharray={`${today.quality_score || 0}, 100`} strokeLinecap="round" />
                        </svg>
                        <span style={{ position: 'absolute', fontSize: '24px', fontWeight: 900 }}>{today.quality_score}%</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="glass-card" style={{ padding: '12px 16px', borderRadius: '16px', flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '20px' }}>⏱️</div>
                        <div>
                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)' }}>REG WAIT</p>
                            <p style={{ margin: 0, fontSize: '18px', fontWeight: 900 }}>{today.avg_reg_time} <small>min</small></p>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '12px 16px', borderRadius: '16px', flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '20px' }}>🩺</div>
                        <div>
                            <p style={{ margin: 0, fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)' }}>PROC TIME</p>
                            <p style={{ margin: 0, fontSize: '18px', fontWeight: 900 }}>{today.avg_proc_time} <small>min</small></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ━━━ Main Body ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))', gap: '20px' }}>
                <div className="space-y-6">
                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Hourly Traffic Dynamics</h4>
                            <div style={{ display: 'flex', gap: '15px', fontSize: '10px', fontWeight: 700 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#059669' }} />
                                    <span>Today</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '8px', height: '1px', background: '#64748b', borderTop: '2px dashed #64748b' }} />
                                    <span>30D Avg Baseline</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '280px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="label" fontSize={10} axisLine={false} tickLine={false} interval={2} />
                                    <YAxis axisLine={false} tickLine={false} fontSize={10} />
                                    <Tooltip
                                        contentStyle={{ background: 'rgba(17,24,39,0.95)', border: 'none', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', color: '#fff' }}
                                        itemStyle={{ fontSize: '11px' }}
                                    />
                                    <Area type="monotone" dataKey="count" stroke="#059669" strokeWidth={2} fillOpacity={0.1} fill="#059669" />
                                    <Line type="monotone" dataKey="baseline" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} name="30D Average" />
                                    <Bar dataKey="count" barSize={10} radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={index} fill={entry.count > entry.baseline * 1.3 ? '#e11d48' : '#cbd5e1'} />
                                        ))}
                                    </Bar>
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px' }}>
                        <div className="glass-card" style={{ padding: '1.5rem' }}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '14px', fontWeight: 800 }}>Audit Coverage</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700 }}>{today.audit_coded} / {today.audit_total} Coded</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#e11d48' }}>{today.pending_codes} Pending</span>
                            </div>
                            <div style={{ height: '12px', background: 'var(--md-surface-alt)', borderRadius: '6px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', background: '#059669', width: `${today.quality_score}%` }} />
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '1.5rem' }}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '14px', fontWeight: 800 }}>Top Coder (Today)</h4>
                            <div className="space-y-3">
                                {(today.coders || []).slice(0, 3).map((c, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{c.name}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 900, color: '#0f766e' }}>{c.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card" style={{ padding: '1.25rem' }}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '13px', fontWeight: 800 }}>Clinic Wait (Min)</h4>
                            <div className="space-y-3">
                                {(today.clinic_wait || []).map((cw, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--md-text-secondary)' }}>{cw.clinic}</span>
                                        <span style={{ fontWeight: 900, color: cw.wait > 30 ? '#e11d48' : 'inherit' }}>{cw.wait}m</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ━━━ AI Patient Intelligence ━━━ */}
                {
                    (() => {
                        const total = today.total_visits || 0;
                        const male = Number(today.male || 0);
                        const female = Number(today.female || 0);
                        const children = Number(today.children || 0);
                        const elderly = Number(today.elderly || 0);
                        const newPt = Number(today.new_patients || 0);
                        const revisit = Number(today.old_patients || 0);
                        const malePercent = total > 0 ? Math.round((male / total) * 100) : 0;
                        const femalePercent = total > 0 ? Math.round((female / total) * 100) : 0;
                        const childPercent = total > 0 ? Math.round((children / total) * 100) : 0;
                        const elderlyPercent = total > 0 ? Math.round((elderly / total) * 100) : 0;
                        const newPercent = total > 0 ? Math.round((newPt / total) * 100) : 0;
                        const avgDaily = analytics.avg_daily_visits || 0;
                        const todayVsAvg = avgDaily > 0 ? Math.round(((total - avgDaily) / avgDaily) * 100) : 0;

                        // AI generate insights
                        const insights = [];
                        if (elderlyPercent > 40) insights.push({ icon: '🔴', color: '#e11d48', text: `ผู้สูงอายุ (≥60 ปี) สูงถึง ${elderlyPercent}% ของผู้รับบริการวันนี้ — แนะนำเตรียมคลินิกโรคเรื้อรัง/NCD และ Wheelchair ให้เพียงพอ` });
                        else if (elderlyPercent > 25) insights.push({ icon: '🟡', color: '#f59e0b', text: `สัดส่วนผู้สูงอายุ ${elderlyPercent}% ควรมอนิเตอร์เวลารอของกลุ่มนี้เป็นพิเศษ — ลด Fall Risk` });
                        else insights.push({ icon: '🟢', color: '#059669', text: `สัดส่วนผู้สูงอายุ ${elderlyPercent}% อยู่ในเกณฑ์ปกติ สมดุลกลุ่มอายุดี` });

                        if (childPercent > 20) insights.push({ icon: '🟡', color: '#f59e0b', text: `เด็ก (<15 ปี) คิดเป็น ${childPercent}% สูงกว่าปกติ — ตรวจสอบว่ามีคลินิกเฉพาะเด็กเปิดให้บริการเพียงพอ` });

                        if (newPercent > 30) insights.push({ icon: '🔵', color: '#0284c7', text: `ผู้ป่วยใหม่ ${newPercent}% สูง — โอกาสขยายฐานลูกค้าใหม่ดี ควรเน้นการบริการประทับใจครั้งแรก (First Impression)` });
                        else if (newPercent < 10) insights.push({ icon: '🟡', color: '#f59e0b', text: `ผู้ป่วยใหม่เพียง ${newPercent}% — อาจเป็นสัญญาณว่าชุมชนเลือกไปโรงพยาบาลอื่น ควรหาสาเหตุ` });

                        if (todayVsAvg > 20) insights.push({ icon: '🔴', color: '#e11d48', text: `ปริมาณผู้ป่วยวันนี้สูงกว่าค่าเฉลี่ย 30 วัน +${todayVsAvg}% — เตรียมกำลังคนเพิ่ม ระวัง Bottleneck ที่จุดลงทะเบียน/ห้องยา` });
                        else if (todayVsAvg < -20) insights.push({ icon: '🟢', color: '#059669', text: `ปริมาณผู้ป่วยวันนี้น้อยกว่าค่าเฉลี่ย ${Math.abs(todayVsAvg)}% — โอกาสดีในการทำ Internal Audit/Training` });

                        if (femalePercent > 65) insights.push({ icon: '💜', color: '#a855f7', text: `ผู้หญิง ${femalePercent}% สูงผิดปกติ — ตรวจสอบว่ามีคลินิก ANC/สูตินรีเวช/ตรวจมะเร็งปากมดลูก เปิดให้บริการวันนี้หรือไม่` });

                        return (
                            <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem', border: '1px solid rgba(99,102,241,0.25)', background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.03))' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '4px', height: '20px', background: 'linear-gradient(180deg, #6366f1, #a855f7)', borderRadius: '99px' }} />
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            🧠 AI Patient Intelligence — วิเคราะห์ผู้รับบริการเชิงลึก
                                            <span style={{ fontSize: '10px', background: 'rgba(99,102,241,.15)', color: '#6366f1', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>REAL-TIME</span>
                                        </h3>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>วิเคราะห์เพศ อายุ สิทธิ์การรักษา แผนกที่ใช้บริการ และคำแนะนำเชิงกลยุทธ์จาก AI</p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '1.25rem' }}>
                                    {/* Demographics - Gender */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>👤 เพศ / Gender</span>
                                            <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>N={total}</span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                            <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '20px', marginBottom: '4px' }}>👨</div>
                                                <div style={{ fontSize: '22px', fontWeight: 900, color: '#3b82f6' }}>{male}</div>
                                                <div style={{ fontSize: '10px', fontWeight: 700, color: '#3b82f6' }}>{malePercent}%</div>
                                            </div>
                                            <div style={{ background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.15)', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '20px', marginBottom: '4px' }}>👩</div>
                                                <div style={{ fontSize: '22px', fontWeight: 900, color: '#ec4899' }}>{female}</div>
                                                <div style={{ fontSize: '10px', fontWeight: 700, color: '#ec4899' }}>{femalePercent}%</div>
                                            </div>
                                        </div>
                                        <div style={{ height: '8px', background: 'var(--md-surface-alt)', borderRadius: '4px', overflow: 'hidden', marginTop: '10px', display: 'flex' }}>
                                            <div style={{ height: '100%', background: '#3b82f6', width: `${malePercent}%`, transition: 'width 0.8s ease' }} />
                                            <div style={{ height: '100%', background: '#ec4899', width: `${femalePercent}%`, transition: 'width 0.8s ease' }} />
                                        </div>
                                    </div>

                                    {/* Demographics - Age Groups */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🎂 กลุ่มอายุ / Age</span>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                                            <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)', padding: '10px 6px', borderRadius: '12px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '16px', marginBottom: '2px' }}>👶</div>
                                                <div style={{ fontSize: '18px', fontWeight: 900, color: '#a855f7' }}>{children}</div>
                                                <div style={{ fontSize: '9px', fontWeight: 700, color: '#a855f7' }}>เด็ก {'<'}15 ({childPercent}%)</div>
                                            </div>
                                            <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', padding: '10px 6px', borderRadius: '12px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '16px', marginBottom: '2px' }}>🧑</div>
                                                <div style={{ fontSize: '18px', fontWeight: 900, color: '#3b82f6' }}>{Math.max(0, total - children - elderly)}</div>
                                                <div style={{ fontSize: '9px', fontWeight: 700, color: '#3b82f6' }}>วัยทำงาน ({total > 0 ? Math.round(((total - children - elderly) / total) * 100) : 0}%)</div>
                                            </div>
                                            <div style={{ background: elderlyPercent > 40 ? 'rgba(225,29,72,0.08)' : 'rgba(234,179,8,0.08)', border: `1px solid ${elderlyPercent > 40 ? 'rgba(225,29,72,0.15)' : 'rgba(234,179,8,0.15)'}`, padding: '10px 6px', borderRadius: '12px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '16px', marginBottom: '2px' }}>👴</div>
                                                <div style={{ fontSize: '18px', fontWeight: 900, color: elderlyPercent > 40 ? '#e11d48' : '#eab308' }}>{elderly}</div>
                                                <div style={{ fontSize: '9px', fontWeight: 700, color: elderlyPercent > 40 ? '#e11d48' : '#eab308' }}>สูงอายุ ≥60 ({elderlyPercent}%)</div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '8px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(15,118,110,0.05)', border: '1px solid rgba(15,118,110,0.1)', fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                                            📊 วัยทำงาน {total > 0 ? Math.round(((total - children - elderly) / total) * 100) : 0}% เป็นกลุ่มหลักที่สร้างรายได้ · สูงอายุ {elderlyPercent}% ต้นทุนต่อเคสสูง
                                        </div>
                                    </div>

                                    {/* Top สิทธิ์การรักษา */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🏥 สิทธิ์การรักษา / Rights</span>
                                        </div>
                                        <div className="space-y-2" style={{ maxHeight: '140px', overflow: 'auto' }}>
                                            {(today.top_pttype || []).map((pt, i) => {
                                                const pct = total > 0 ? Math.round((pt.count / total) * 100) : 0;
                                                const colors = ['#0284c7', '#059669', '#f59e0b', '#e11d48', '#a855f7'];
                                                const c = colors[i % colors.length];
                                                return (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <div style={{ width: '3px', height: '22px', borderRadius: '2px', background: c, flexShrink: 0 }} />
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700 }}>
                                                                <span style={{ color: 'var(--md-text-primary)' }}>{pt.name}</span>
                                                                <span style={{ color: c, fontWeight: 900 }}>{pt.count} <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>({pct}%)</span></span>
                                                            </div>
                                                            <div style={{ height: '4px', background: 'var(--md-surface-alt)', borderRadius: '2px', marginTop: '3px' }}>
                                                                <div style={{ height: '100%', background: c, width: `${pct}%`, borderRadius: '2px', transition: 'width 0.6s ease' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {(!today.top_pttype || today.top_pttype.length === 0) && <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>ยังไม่มีข้อมูล</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Department Utilization + AI Insights */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    {/* Top Departments */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📋 แผนกที่มีผู้ป่วยสูงสุด / Top Dept.</span>
                                        </div>
                                        <div className="space-y-2">
                                            {(today.top_departments || []).map((dep, i) => {
                                                const pct = total > 0 ? Math.round((dep.count / total) * 100) : 0;
                                                const colorsD = ['#0f766e', '#0284c7', '#6366f1', '#f59e0b', '#e11d48'];
                                                const cd = colorsD[i % colorsD.length];
                                                return (
                                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', padding: '6px 8px', borderRadius: '8px', background: `${cd}08`, border: `1px solid ${cd}15` }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '6px', background: cd, color: '#fff', fontSize: '10px', fontWeight: 900, flexShrink: 0 }}>{i + 1}</span>
                                                            <span style={{ fontWeight: 700, color: 'var(--md-text-primary)' }}>{dep.name}</span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <span style={{ fontWeight: 900, color: cd }}>{dep.count}</span>
                                                            <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(0,0,0,0.05)', padding: '2px 5px', borderRadius: '4px' }}>{pct}%</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {(!today.top_departments || today.top_departments.length === 0) && <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>ยังไม่มีข้อมูล</p>}
                                        </div>
                                        {today.top_departments && today.top_departments.length > 0 && (() => {
                                            const topDep = today.top_departments[0];
                                            const topPct = total > 0 ? Math.round((topDep.count / total) * 100) : 0;
                                            return (
                                                <div style={{ marginTop: '8px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(15,118,110,0.05)', border: '1px solid rgba(15,118,110,0.1)', fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500, lineHeight: 1.5 }}>
                                                    💡 <strong>{topDep.name}</strong> รับภาระหนักสุด ({topPct}%) — {topPct > 30 ? 'เสี่ยง Bottleneck ควรจัดสรรบุคลากรเสริม' : 'กระจายตัวดี ไม่กระจุกตัว'}
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    {/* AI Deep Insights */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px', borderLeft: '4px solid #6366f1' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🧠 AI Strategic Insights</span>
                                            <span style={{ fontSize: '9px', color: '#6366f1', fontWeight: 700, background: 'rgba(99,102,241,0.1)', padding: '2px 6px', borderRadius: '4px' }}>AUTO-ANALYZED</span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {/* Today vs Average */}
                                            <div style={{ padding: '8px 10px', borderRadius: '10px', background: todayVsAvg > 20 ? 'rgba(225,29,72,0.05)' : todayVsAvg < -20 ? 'rgba(5,150,105,0.05)' : 'rgba(99,102,241,0.05)', border: `1px solid ${todayVsAvg > 20 ? 'rgba(225,29,72,0.15)' : todayVsAvg < -20 ? 'rgba(5,150,105,0.15)' : 'rgba(99,102,241,0.15)'}` }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 800, color: todayVsAvg > 20 ? '#e11d48' : todayVsAvg < -20 ? '#059669' : '#6366f1' }}>📈 Today vs 30D Average</span>
                                                    <span style={{ fontSize: '12px', fontWeight: 900, color: todayVsAvg > 0 ? '#e11d48' : '#059669' }}>{todayVsAvg > 0 ? '+' : ''}{todayVsAvg}%</span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                                                    วันนี้ {total.toLocaleString()} ครั้ง · เฉลี่ย 30 วัน {avgDaily.toLocaleString()} ครั้ง/วัน
                                                </p>
                                            </div>

                                            {/* AI Insights List */}
                                            {insights.map((ins, i) => (
                                                <div key={i} style={{ padding: '8px 10px', borderRadius: '10px', background: `${ins.color}06`, border: `1px solid ${ins.color}15`, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                                    <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{ins.icon}</span>
                                                    <p style={{ margin: 0, fontSize: '10.5px', color: 'var(--md-text-primary)', fontWeight: 500, lineHeight: 1.55 }}>{ins.text}</p>
                                                </div>
                                            ))}

                                            {/* New vs Revisit Insight */}
                                            <div style={{ padding: '8px 10px', borderRadius: '10px', background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#0ea5e9' }}>🔄 Retention Rate</span>
                                                    <span style={{ fontSize: '12px', fontWeight: 900, color: '#0ea5e9' }}>{total > 0 ? Math.round((revisit / total) * 100) : 0}%</span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                                                    ผู้ป่วยเดิม {revisit.toLocaleString()} · ใหม่ {newPt.toLocaleString()} — {newPercent > 25 ? 'ฐานลูกค้าขยายตัวดี' : 'ฐานลูกค้าเดิมแข็งแกร่ง'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                }

                {/* ━━━ AI Patient Flow Forecast + Monthly Trend + Bottleneck ━━━ */}
                {
                    (() => {
                        // ─── Patient Flow Forecast ───
                        const hourlyData = today.hourly || [];
                        const currentHour = new Date().getHours();
                        const completedHours = hourlyData.filter(h => h.hour <= currentHour && h.count > 0);
                        const totalSoFar = completedHours.reduce((s, h) => s + h.count, 0);
                        const activeHoursCount = completedHours.length;
                        const avgPerHour = activeHoursCount > 0 ? totalSoFar / activeHoursCount : 0;
                        const remainingOperationalHours = Math.max(0, 20 - currentHour); // assume ops til 20:00
                        const forecastTotal = Math.round(totalSoFar + (avgPerHour * remainingOperationalHours * 0.6)); // decay factor
                        const peakHour = hourlyData.reduce((max, h) => h.count > (max?.count || 0) ? h : max, { hour: 0, count: 0 });
                        const peakHourBench = (analytics.hourly_benchmark || []).find(b => b.hr === peakHour.hour);
                        const peakVsAvg = peakHourBench?.avg > 0 ? Math.round(((peakHour.count - peakHourBench.avg) / peakHourBench.avg) * 100) : 0;

                        // ─── Monthly Trend Data ───
                        const monthlyData = analytics.monthly || [];
                        const lastMonth = monthlyData.length >= 2 ? monthlyData[monthlyData.length - 1] : null;
                        const prevMonth = monthlyData.length >= 2 ? monthlyData[monthlyData.length - 2] : null;
                        const growthRate = prevMonth?.visits > 0 ? Math.round(((lastMonth?.visits - prevMonth?.visits) / prevMonth.visits) * 100) : 0;
                        const avgMonthly = monthlyData.length > 0 ? Math.round(monthlyData.reduce((s, m) => s + m.visits, 0) / monthlyData.length) : 0;
                        const newPatientRatio = lastMonth?.visits > 0 ? Math.round((lastMonth.new_patients / lastMonth.visits) * 100) : 0;

                        // ─── Bottleneck Analysis ───
                        const clinicWaits = today.clinic_wait || [];
                        const avgRegTime = Number(today.avg_reg_time || 0);
                        const avgProcTime = Number(today.avg_proc_time || 0);
                        const maxWaitClinic = clinicWaits.length > 0 ? clinicWaits[0] : null;
                        const totalWaitEstimate = avgRegTime + avgProcTime + (maxWaitClinic?.wait || 0);

                        return (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginTop: '1rem' }}>

                                {/* 1. Patient Flow Forecast */}
                                <div className="glass-card" style={{ padding: '1.25rem', border: '1px solid rgba(14,165,233,0.25)', background: 'linear-gradient(135deg, rgba(14,165,233,0.06), rgba(6,182,212,0.03))' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                        <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #0ea5e9, #06b6d4)', borderRadius: '99px' }} />
                                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>⏰ AI Patient Flow Forecast</span>
                                        <span style={{ fontSize: '9px', background: 'rgba(14,165,233,.15)', color: '#0ea5e9', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>PREDICTIVE</span>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                                        <div style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '9px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', marginBottom: '4px' }}>ผู้ป่วยถึงตอนนี้</div>
                                            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{totalSoFar.toLocaleString()}</div>
                                            <div style={{ fontSize: '9px', color: 'var(--md-text-tertiary)' }}>ณ {String(currentHour).padStart(2, '0')}:00 น.</div>
                                        </div>
                                        <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.15)', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                                            <div style={{ fontSize: '9px', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', marginBottom: '4px' }}>🔮 คาดการณ์สิ้นวัน</div>
                                            <div style={{ fontSize: '24px', fontWeight: 900, color: '#a855f7' }}>{forecastTotal.toLocaleString()}</div>
                                            <div style={{ fontSize: '9px', color: 'var(--md-text-tertiary)' }}>ครั้ง (EOD Est.)</div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(14,165,233,0.1)', marginBottom: '8px' }}>
                                        <div style={{ fontSize: '10px', fontWeight: 800, color: '#0ea5e9', marginBottom: '4px' }}>📊 Peak Hour: {String(peakHour.hour).padStart(2, '0')}:00 ({peakHour.count} ครั้ง)</div>
                                        <div style={{ fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                                            {peakVsAvg > 30 ? `⚠️ สูงกว่า Baseline +${peakVsAvg}% → เตรียมเปิดช่องลงทะเบียนเพิ่ม` :
                                                peakVsAvg > 0 ? `📈 สูงกว่า Baseline +${peakVsAvg}% → ปริมาณปกติ` :
                                                    `✅ ต่ำกว่า Baseline ${peakVsAvg}% → กำลังคนเพียงพอ`}
                                        </div>
                                    </div>

                                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(168,85,247,0.04)', border: '1px solid rgba(168,85,247,0.1)' }}>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#a855f7', fontWeight: 800, fontSize: '10px', minWidth: '60px' }}>🧠 AI Insight:</span>
                                            <span style={{ fontSize: '10px', color: 'var(--md-text-primary)', fontWeight: 500, lineHeight: 1.55 }}>
                                                {currentHour < 12
                                                    ? `ยังเป็นช่วงเช้า คาดว่าจะมีผู้ป่วยอีก ~${Math.round(forecastTotal - totalSoFar)} ครั้งภายในสิ้นวัน ● เฉลี่ย ${Math.round(avgPerHour)} ครั้ง/ชม.`
                                                    : currentHour < 16
                                                        ? `ผ่านครึ่งวันแล้ว ปริมาณรวม ${totalSoFar} ● คาดว่าอีก ~${Math.round(forecastTotal - totalSoFar)} ครั้ง ● ${avgPerHour > 30 ? 'โหลดสูง — เตรียม Staff บ่ายเสริม' : 'โหลดปกติ'}`
                                                        : `ใกล้สิ้นสุดเวลาทำการ ● คาดว่ารวมสิ้นวัน ~${forecastTotal} ครั้ง ● ${totalSoFar > (analytics.avg_daily_visits || 0) ? 'สูงกว่าค่าเฉลี่ย — Great Day!' : 'ปกติหรือต่ำกว่าค่าเฉลี่ย'}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Monthly Growth Trend */}
                                <div className="glass-card" style={{ padding: '1.25rem', border: '1px solid rgba(16,185,129,0.25)', background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(5,150,105,0.03))' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #059669, #10b981)', borderRadius: '99px' }} />
                                            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>📈 Monthly Growth Trend (6M)</span>
                                        </div>
                                        <span style={{ fontSize: '12px', fontWeight: 900, color: growthRate >= 0 ? '#10b981' : '#e11d48' }}>
                                            {growthRate >= 0 ? '▲' : '▼'} {Math.abs(growthRate)}% MoM
                                        </span>
                                    </div>

                                    {/* Mini Chart */}
                                    <div style={{ height: '110px', marginBottom: '10px' }}>
                                        {monthlyData.length > 0 ? (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <ComposedChart data={monthlyData}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                                    <XAxis dataKey="month" fontSize={9} axisLine={false} tickLine={false} />
                                                    <YAxis axisLine={false} tickLine={false} fontSize={9} width={35} />
                                                    <Tooltip contentStyle={{ background: 'rgba(17,24,39,0.95)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '10px' }} />
                                                    <Area type="monotone" dataKey="visits" stroke="#059669" strokeWidth={2} fillOpacity={0.1} fill="#059669" name="Visits" />
                                                    <Line type="monotone" dataKey="new_patients" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} name="New Patients" />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--md-text-tertiary)' }}>กำลังโหลด...</div>}
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                                        <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(16,185,129,0.08)', textAlign: 'center' }}>
                                            <div style={{ fontSize: '8px', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>Avg Monthly</div>
                                            <div style={{ fontSize: '14px', fontWeight: 900 }}>{avgMonthly.toLocaleString()}</div>
                                        </div>
                                        <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(168,85,247,0.08)', textAlign: 'center' }}>
                                            <div style={{ fontSize: '8px', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase' }}>New Pt Ratio</div>
                                            <div style={{ fontSize: '14px', fontWeight: 900 }}>{newPatientRatio}%</div>
                                        </div>
                                        <div style={{ padding: '6px', borderRadius: '8px', background: growthRate >= 0 ? 'rgba(16,185,129,0.08)' : 'rgba(225,29,72,0.08)', textAlign: 'center' }}>
                                            <div style={{ fontSize: '8px', fontWeight: 800, color: growthRate >= 0 ? '#059669' : '#e11d48', textTransform: 'uppercase' }}>Growth</div>
                                            <div style={{ fontSize: '14px', fontWeight: 900, color: growthRate >= 0 ? '#059669' : '#e11d48' }}>{growthRate >= 0 ? '+' : ''}{growthRate}%</div>
                                        </div>
                                    </div>

                                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)' }}>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#059669', fontWeight: 800, fontSize: '10px', minWidth: '60px' }}>🧠 AI Insight:</span>
                                            <span style={{ fontSize: '10px', color: 'var(--md-text-primary)', fontWeight: 500, lineHeight: 1.55 }}>
                                                {growthRate > 10
                                                    ? `เติบโตเด่นชัด +${growthRate}% ● ผู้ป่วยใหม่ ${newPatientRatio}% แสดงว่าชุมชนมีความเชื่อมั่น ● ควรเตรียมรองรับ Capacity เพิ่ม`
                                                    : growthRate > 0
                                                        ? `เติบโตสม่ำเสมอ +${growthRate}% ● ฐานผู้ป่วยมั่นคง ● เน้นรักษาคุณภาพบริการเพื่อ Retention`
                                                        : growthRate > -10
                                                            ? `ทรงตัว ${growthRate}% ● ปริมาณผู้ป่วยใหม่ ${newPatientRatio}% ● ควรกระตุ้นชุมชนด้วย Health Campaign`
                                                            : `ลดลงเด่นชัด ${growthRate}% ● วิเคราะห์สาเหตุหลัก: (1) คู่แข่งเปิดใหม่? (2) คุณภาพบริการลดลง? (3) ฤดูกาล? ● เร่งแก้ไข`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Registration Bottleneck Analyzer */}
                                <div className="glass-card" style={{ padding: '1.25rem', border: '1px solid rgba(234,179,8,0.25)', background: 'linear-gradient(135deg, rgba(234,179,8,0.06), rgba(245,158,11,0.03))' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                        <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #eab308, #f59e0b)', borderRadius: '99px' }} />
                                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)' }}>⏳ Registration & Wait Bottleneck</span>
                                        <span style={{ fontSize: '9px', background: totalWaitEstimate > 60 ? 'rgba(225,29,72,.15)' : 'rgba(234,179,8,.15)', color: totalWaitEstimate > 60 ? '#e11d48' : '#eab308', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                            {totalWaitEstimate > 60 ? 'CRITICAL' : totalWaitEstimate > 30 ? 'WARNING' : 'NORMAL'}
                                        </span>
                                    </div>

                                    {/* Wait Time Pipeline */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                        {[
                                            { label: 'ลงทะเบียน', val: `${avgRegTime}m`, color: avgRegTime > 15 ? '#e11d48' : '#059669' },
                                            { label: '→', val: '', color: '#94a3b8' },
                                            { label: 'ตรวจรักษา', val: `${avgProcTime}m`, color: avgProcTime > 30 ? '#e11d48' : '#059669' },
                                            { label: '→', val: '', color: '#94a3b8' },
                                            { label: 'รอรับยา', val: maxWaitClinic ? `${maxWaitClinic.wait}m` : '—', color: (maxWaitClinic?.wait || 0) > 30 ? '#e11d48' : '#059669' },
                                        ].map((step, i) => (
                                            step.val === '' ? <span key={i} style={{ fontSize: '12px', color: step.color }}>→</span> :
                                                <div key={i} style={{ padding: '6px 10px', borderRadius: '8px', background: `${step.color}10`, border: `1px solid ${step.color}20`, textAlign: 'center', flex: '1 1 auto' }}>
                                                    <div style={{ fontSize: '8px', fontWeight: 800, color: step.color, textTransform: 'uppercase' }}>{step.label}</div>
                                                    <div style={{ fontSize: '14px', fontWeight: 900, color: step.color }}>{step.val}</div>
                                                </div>
                                        ))}
                                    </div>

                                    <div style={{ padding: '6px 10px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)', marginBottom: '8px' }}>
                                        <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', marginBottom: '4px' }}>⏱️ Total Patient Journey (est.)</div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                            <span style={{ fontSize: '22px', fontWeight: 900, color: totalWaitEstimate > 60 ? '#e11d48' : totalWaitEstimate > 30 ? '#f59e0b' : '#059669' }}>{totalWaitEstimate}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>นาที (ลงทะเบียน → ตรวจ → รับยา)</span>
                                        </div>
                                    </div>

                                    {/* Top Slow Clinics */}
                                    {clinicWaits.length > 0 && (
                                        <div style={{ marginBottom: '8px' }}>
                                            <div style={{ fontSize: '10px', fontWeight: 800, color: '#eab308', marginBottom: '6px', textTransform: 'uppercase' }}>🏥 คลินิกที่รอนานสุด</div>
                                            {clinicWaits.slice(0, 3).map((cw, i) => (
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', padding: '4px 8px', borderRadius: '6px', marginBottom: '3px', background: cw.wait > 30 ? 'rgba(225,29,72,0.05)' : 'rgba(0,0,0,0.02)', border: `1px solid ${cw.wait > 30 ? 'rgba(225,29,72,0.1)' : 'rgba(0,0,0,0.05)'}` }}>
                                                    <span style={{ fontWeight: 600 }}>{cw.clinic}</span>
                                                    <span style={{ fontWeight: 900, color: cw.wait > 30 ? '#e11d48' : '#059669' }}>{cw.wait}m</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(234,179,8,0.04)', border: '1px solid rgba(234,179,8,0.1)' }}>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                            <span style={{ color: '#eab308', fontWeight: 800, fontSize: '10px', minWidth: '60px' }}>🧠 AI Insight:</span>
                                            <span style={{ fontSize: '10px', color: 'var(--md-text-primary)', fontWeight: 500, lineHeight: 1.55 }}>
                                                {totalWaitEstimate > 90
                                                    ? `⚠️ วิกฤต! Patient Journey รวม ${totalWaitEstimate} นาที ● คอขวดหลัก: ${maxWaitClinic ? maxWaitClinic.clinic + ` (${maxWaitClinic.wait}m)` : 'ลงทะเบียน'} ● แนะนำ: เปิดช่องลงทะเบียน Fast Track หรือ Kiosk Self-Service ● ลดรอบ Manual Process`
                                                    : totalWaitEstimate > 45
                                                        ? `เวลาเดินทางผู้ป่วยรวม ${totalWaitEstimate} นาที ● ${avgRegTime > 15 ? 'ลงทะเบียนช้ากว่าเกณฑ์ — ตรวจสอบ Capacity จุดรับ' : 'ลงทะเบียนปกติ'} ● ${maxWaitClinic && maxWaitClinic.wait > 30 ? `คลินิก ${maxWaitClinic.clinic} รอนาน — พิจารณาเสริมแพทย์` : 'คลินิกรอปกติ'}`
                                                        : `✅ ระบบไหลลื่น! Patient Journey ${totalWaitEstimate} นาที ● ลงทะเบียน ${avgRegTime}m ตรวจรักษา ${avgProcTime}m ● ค่าเฉลี่ยต่ำกว่า SLA — ระบบจัดการได้ดีเยี่ยม`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                }

                {/* ━━━ IPD Section ━━━ */}
                <div style={{ margin: '2rem 0 1.5rem', paddingBottom: '0.5rem', borderBottom: '2px dashed var(--md-divider)' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#059669', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🟢</span> ส่วนผู้ป่วยใน (IPD)
                    </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', marginBottom: '1.5rem' }}>
                    {/* IPD Audit Score */}
                    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--md-text-tertiary)', marginBottom: '1rem' }}>IPD Audit Score (30d)</p>
                        <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="3" />
                                <circle cx="18" cy="18" r="16" fill="none" stroke={getQualityColor(today.ipd_quality_score)} strokeWidth="3"
                                    strokeDasharray={`${today.ipd_quality_score || 0}, 100`} strokeLinecap="round" />
                            </svg>
                            <span style={{ position: 'absolute', fontSize: '24px', fontWeight: 900 }}>{today.ipd_quality_score || 0}%</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%', marginTop: '1.25rem' }}>
                            <div style={{ background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.15)', padding: '10px 6px', borderRadius: '12px', textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '9px', fontWeight: 800, color: '#eab308', textTransform: 'uppercase' }}>Turnaround</p>
                                <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{today.ipd_avg_coding_days || 0}<span style={{ fontSize: '10px', marginLeft: '2px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>D</span></p>
                            </div>
                            <div style={{ background: 'rgba(15,118,110,0.08)', border: '1px solid rgba(15,118,110,0.15)', padding: '10px 6px', borderRadius: '12px', textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '9px', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>Total RW</p>
                                <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{today.ipd_total_rw || 0}</p>
                            </div>
                            <div style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.15)', padding: '10px 6px', borderRadius: '12px', textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '9px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase' }}>Avg RW</p>
                                <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{today.ipd_avg_rw || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* IPD Audit Coverage & Pending Wards */}
                    <div className="space-y-5">
                        <div className="glass-card" style={{ padding: '1.5rem' }}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '14px', fontWeight: 800 }}>IPD Audit Coverage (30d)</h4>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700 }}>{today.ipd_audit_coded || 0} / {today.ipd_audit_total || 0} Coded</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#e11d48' }}>{today.ipd_pending_codes || 0} Pending</span>
                            </div>
                            <div style={{ height: '12px', background: 'var(--md-surface-alt)', borderRadius: '6px', overflow: 'hidden', marginBottom: '1.2rem' }}>
                                <div style={{ height: '100%', background: '#059669', width: `${today.ipd_quality_score || 0}%` }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', fontWeight: 700 }}>DRG/RW Calculated</span>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#0284c7' }}>{today.ipd_drg_calculated || 0} / {today.ipd_audit_total || 0}</span>
                            </div>
                            <div style={{ height: '6px', background: 'var(--md-surface-alt)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', background: '#0284c7', width: `${today.ipd_drg_score || 0}%` }} />
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid #e11d48' }}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '13px', fontWeight: 800, color: '#e11d48' }}>Pending IPD Wards (รอสรุปโรค)</h4>
                            <div className="space-y-3">
                                {(today.pending_wards || []).slice(0, 3).map((pw, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                        <span style={{ fontWeight: 600 }}>{pw.ward}</span>
                                        <span style={{ fontWeight: 900 }}>{pw.count}</span>
                                    </div>
                                ))}
                                {(!today.pending_wards || today.pending_wards.length === 0) && (
                                    <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)' }}>ไม่มีงานค้าง</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ━━━ AI IPD Intelligence Dashboard ━━━ */}
                {
                    (() => {
                        const ipdTotal = Number(today.ipd_audit_total || 0);
                        const ipdCoded = Number(today.ipd_audit_coded || 0);
                        const ipdPending = Number(today.ipd_pending_codes || 0);
                        const ipdDrg = Number(today.ipd_drg_calculated || 0);
                        const ipdDrgScore = Number(today.ipd_drg_score || 0);
                        const totalRW = Number(today.ipd_total_rw || 0);
                        const avgRW = Number(today.ipd_avg_rw || 0);
                        const codingDays = Number(today.ipd_avg_coding_days || 0);
                        const pendingWards = today.pending_wards || [];
                        const totalPendingWardCases = pendingWards.reduce((s, w) => s + w.count, 0);
                        const coders = today.ipd_coders_fiscal || [];
                        const teamTotalMonth = coders.reduce((s, c) => s + (c.current_month_total || 0), 0);
                        const teamTotalFiscal = coders.reduce((s, c) => s + (c.fiscal_total || 0), 0);
                        const teamAvgCC = coders.length > 0 ? (coders.reduce((s, c) => s + (c.cc_rate || 0), 0) / coders.length).toFixed(2) : 0;
                        const teamAvgDiag = coders.length > 0 ? (coders.reduce((s, c) => s + (c.diag_per_case || 0), 0) / coders.length).toFixed(2) : 0;

                        // Revenue per RW (ค่าเฉลี่ย DRG payment ≈ 8,350 บาท/RW for สปสช.)
                        const estRevenue = Math.round(totalRW * 8350);
                        const pendingRevenue = Math.round(ipdPending * avgRW * 8350);

                        // AI Insights
                        const ipdInsights = [];

                        // Coding Turnaround Analysis
                        if (codingDays > 7) ipdInsights.push({ icon: '🔴', color: '#e11d48', priority: 'CRITICAL', text: `Coding Turnaround ${codingDays} วัน — สูงกว่า SLA (≤3 วัน) ● เสี่ยงส่งเบิกล่าช้า กระทบกระแสเงินสด ● แนะนำ: จัดเวรพิเศษสะสางเคสค้าง หรือ OT เร่งด่วน` });
                        else if (codingDays > 3) ipdInsights.push({ icon: '🟡', color: '#f59e0b', priority: 'WARNING', text: `Coding Turnaround ${codingDays} วัน — ใกล้ SLA ● ควรเร่งก่อนสะสมเป็น Backlog ● เน้น Priority เคสที่ค้าง > 3 วันก่อน` });
                        else ipdInsights.push({ icon: '🟢', color: '#059669', priority: 'OK', text: `Coding Turnaround ${codingDays} วัน ● ภายใน SLA เยี่ยมมาก ● ส่งเบิกได้ตามกำหนด กระแสเงินสดดี` });

                        // DRG Coverage Analysis
                        if (ipdDrgScore < 70) ipdInsights.push({ icon: '🔴', color: '#e11d48', priority: 'REVENUE RISK', text: `DRG Calculated เพียง ${ipdDrgScore}% ● มีเคสที่ยังไม่ได้ค่า RW ${ipdTotal - ipdDrg} เคส ● รายได้ตกหล่นประมาณ ฿${Math.round((ipdTotal - ipdDrg) * avgRW * 8350).toLocaleString()} ● เร่ง Grouping DRG` });
                        else if (ipdDrgScore < 90) ipdInsights.push({ icon: '🟡', color: '#f59e0b', priority: 'MONITOR', text: `DRG Coverage ${ipdDrgScore}% ● ยังมีช่องว่าง ${100 - ipdDrgScore}% ที่ยังไม่ได้ Group ● ควรตรวจสอบเคสที่ไม่มี PDx หรือข้อมูลไม่ครบ` });

                        // Avg RW Analysis
                        if (avgRW >= 2.0) ipdInsights.push({ icon: '💎', color: '#6366f1', priority: 'HIGH VALUE', text: `Avg RW ${avgRW} สูงกว่าค่าเฉลี่ย (>2.0) ● เคสส่วนใหญ่เป็นเคสซับซ้อน/ผ่าตัดใหญ่ ● ตรวจสอบว่า CC/MCC ครบถ้วนจะเพิ่ม RW ได้อีก` });
                        else if (avgRW < 0.8) ipdInsights.push({ icon: '🟡', color: '#f59e0b', priority: 'LOW VALUE', text: `Avg RW ${avgRW} ต่ำกว่าเกณฑ์ (<0.8) ● อาจมีเคสที่ Coder ลง PDx ทั่วไปเกินไป ● แนะนำ CDI review เพื่อหา Specific Dx ที่ช่วยเพิ่ม RW` });

                        // Pending Ward Analysis
                        if (totalPendingWardCases > 50) ipdInsights.push({ icon: '🔴', color: '#e11d48', priority: 'BACKLOG', text: `วอร์ดค้างสรุป ${totalPendingWardCases} เคส (${pendingWards.length} หอผู้ป่วย) ● รายได้ค้างประมาณ ฿${pendingRevenue.toLocaleString()} ● ควรจัดลำดับ: วอร์ดที่ค้างมากสุดก่อน` });
                        else if (totalPendingWardCases > 20) ipdInsights.push({ icon: '🟡', color: '#f59e0b', priority: 'ATTENTION', text: `วอร์ดค้าง ${totalPendingWardCases} เคส ● ยังอยู่ในเกณฑ์จัดการได้ แต่ไม่ควรปล่อยทิ้งนาน ● ตั้งเป้าเคลียร์ภายใน 3 วันทำการ` });

                        // Team Capacity
                        if (coders.length > 0) {
                            const topCoder = coders[0];
                            const bottomCoder = coders[coders.length - 1];
                            const gap = topCoder.current_month_total - bottomCoder.current_month_total;
                            if (gap > 30 && coders.length >= 3) ipdInsights.push({ icon: '⚖️', color: '#0284c7', priority: 'BALANCE', text: `Workload Gap: ${topCoder.name} (${topCoder.current_month_total}) vs ${bottomCoder.name} (${bottomCoder.current_month_total}) ● ช่วง ${gap} เคส ● ควรกระจายเคสให้สมดุลขึ้น ลดความเสี่ยง Burnout` });
                        }

                        return (
                            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(16,185,129,0.3)', background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(6,182,212,0.03))' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                                    <div style={{ width: '4px', height: '20px', background: 'linear-gradient(180deg, #059669, #06b6d4)', borderRadius: '99px' }} />
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            🧠 AI IPD Intelligence — วิเคราะห์ผู้ป่วยในเชิงลึก
                                            <span style={{ fontSize: '10px', background: 'rgba(16,185,129,.15)', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>REVENUE & QUALITY</span>
                                        </h3>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>วิเคราะห์ Revenue (RW), Coding SLA, Ward Backlog, Team Capacity และคำแนะนำเชิงกลยุทธ์</p>
                                    </div>
                                </div>

                                {/* Row 1: Revenue + Coding SLA + Team Scorecard */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                                    {/* IPD Revenue Intelligence */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px', borderTop: '3px solid #059669' }}>
                                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>💰 Revenue Intelligence (30D)</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                                            <div style={{ background: 'rgba(16,185,129,0.08)', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#059669' }}>TOTAL RW</div>
                                                <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{totalRW}</div>
                                            </div>
                                            <div style={{ background: 'rgba(14,165,233,0.08)', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#0ea5e9' }}>AVG RW/CASE</div>
                                                <div style={{ fontSize: '20px', fontWeight: 900, color: avgRW >= 2.0 ? '#6366f1' : avgRW < 0.8 ? '#e11d48' : 'var(--md-text-primary)' }}>{avgRW}</div>
                                            </div>
                                        </div>
                                        <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: 700, color: 'var(--md-text-secondary)' }}>Est. Revenue (฿8,350/RW)</span>
                                                <span style={{ fontWeight: 900, color: '#059669' }}>฿{estRevenue.toLocaleString()}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                                                <span style={{ fontWeight: 700, color: 'var(--md-text-secondary)' }}>Pending Revenue (est.)</span>
                                                <span style={{ fontWeight: 900, color: '#e11d48' }}>฿{pendingRevenue.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Coding Turnaround SLA */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px', borderTop: `3px solid ${codingDays > 7 ? '#e11d48' : codingDays > 3 ? '#f59e0b' : '#059669'}` }}>
                                        <div style={{ fontSize: '11px', fontWeight: 800, color: codingDays > 7 ? '#e11d48' : codingDays > 3 ? '#f59e0b' : '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>⏱️ Coding Turnaround SLA</div>
                                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                            <div style={{ fontSize: '36px', fontWeight: 900, color: codingDays > 7 ? '#e11d48' : codingDays > 3 ? '#f59e0b' : '#059669' }}>
                                                {codingDays} <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>วัน</span>
                                            </div>
                                            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--md-text-tertiary)', marginTop: '2px' }}>
                                                SLA Target: ≤ 3 วัน
                                            </div>
                                        </div>
                                        {/* SLA Progress */}
                                        <div style={{ height: '8px', background: 'var(--md-surface-alt)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px', position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: '42.8%', top: 0, bottom: 0, width: '2px', background: '#f59e0b', zIndex: 1 }} title="SLA 3 Days" />
                                            <div style={{ height: '100%', background: codingDays > 7 ? '#e11d48' : codingDays > 3 ? '#f59e0b' : '#059669', width: `${Math.min(100, (codingDays / 7) * 100)}%`, transition: 'width 0.8s ease' }} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--md-text-tertiary)' }}>
                                            <span>0 วัน</span>
                                            <span style={{ color: '#f59e0b', fontWeight: 800 }}>3d SLA ▼</span>
                                            <span>7+ วัน</span>
                                        </div>
                                    </div>

                                    {/* Team Productivity Scorecard */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px', borderTop: '3px solid #6366f1' }}>
                                        <div style={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>👥 Team Scorecard (IPD Coders)</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                                            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(99,102,241,0.08)', textAlign: 'center' }}>
                                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#6366f1' }}>THIS MONTH</div>
                                                <div style={{ fontSize: '18px', fontWeight: 900 }}>{teamTotalMonth}</div>
                                            </div>
                                            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(15,118,110,0.08)', textAlign: 'center' }}>
                                                <div style={{ fontSize: '8px', fontWeight: 800, color: '#0f766e' }}>FISCAL YEAR</div>
                                                <div style={{ fontSize: '18px', fontWeight: 900 }}>{teamTotalFiscal}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                                            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)', textAlign: 'center' }}>
                                                <div style={{ fontSize: '8px', fontWeight: 800, color: 'var(--md-text-tertiary)' }}>AVG CC/CASE</div>
                                                <div style={{ fontSize: '14px', fontWeight: 900, color: teamAvgCC > 1.0 ? '#f59e0b' : '#059669' }}>{teamAvgCC}</div>
                                            </div>
                                            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)', textAlign: 'center' }}>
                                                <div style={{ fontSize: '8px', fontWeight: 800, color: 'var(--md-text-tertiary)' }}>AVG DIAG/CASE</div>
                                                <div style={{ fontSize: '14px', fontWeight: 900 }}>{teamAvgDiag}</div>
                                            </div>
                                        </div>
                                        <div style={{ padding: '6px 8px', borderRadius: '8px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)', fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500 }}>
                                            👥 Active Coders: <strong>{coders.length}</strong> คน · เฉลี่ย {coders.length > 0 ? Math.round(teamTotalMonth / coders.length) : 0} เคส/คน/เดือน
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2: Ward Risk Matrix + AI Strategic Insights */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                    {/* Pending Ward Risk Matrix */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🏥 Ward Backlog Risk Matrix</span>
                                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#e11d48', background: 'rgba(225,29,72,0.1)', padding: '2px 8px', borderRadius: '4px' }}>{totalPendingWardCases} เคส</span>
                                        </div>
                                        {pendingWards.length > 0 ? (
                                            <div className="space-y-2">
                                                {pendingWards.slice(0, 5).map((pw, i) => {
                                                    const pct = ipdTotal > 0 ? Math.round((pw.count / ipdTotal) * 100) : 0;
                                                    const severity = pw.count > 20 ? 'HIGH' : pw.count > 10 ? 'MED' : 'LOW';
                                                    const sevColor = severity === 'HIGH' ? '#e11d48' : severity === 'MED' ? '#f59e0b' : '#059669';
                                                    return (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '8px', background: `${sevColor}06`, border: `1px solid ${sevColor}15` }}>
                                                            <span style={{ fontSize: '9px', fontWeight: 900, color: '#fff', background: sevColor, padding: '2px 5px', borderRadius: '4px', minWidth: '32px', textAlign: 'center' }}>{severity}</span>
                                                            <span style={{ flex: 1, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-primary)' }}>{pw.ward}</span>
                                                            <div style={{ textAlign: 'right' }}>
                                                                <span style={{ fontSize: '13px', fontWeight: 900, color: sevColor }}>{pw.count}</span>
                                                                <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', marginLeft: '3px' }}>({pct}%)</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', padding: '20px', color: '#059669', fontSize: '12px', fontWeight: 700 }}>
                                                ✅ ไม่มีเคสค้างสรุป — เยี่ยมมาก!
                                            </div>
                                        )}
                                        {pendingWards.length > 0 && (
                                            <div style={{ marginTop: '8px', padding: '6px 10px', borderRadius: '8px', background: 'rgba(225,29,72,0.04)', border: '1px solid rgba(225,29,72,0.1)', fontSize: '10px', color: 'var(--md-text-secondary)', fontWeight: 500, lineHeight: 1.5 }}>
                                                💡 แนะนำจัดลำดับ: เริ่มจากวอร์ดที่มี severity HIGH ก่อน ● ค้างรวม ~฿{pendingRevenue.toLocaleString()} ● ทุกวันที่ช้า = เงินจม
                                            </div>
                                        )}
                                    </div>

                                    {/* AI Strategic IPD Insights */}
                                    <div className="inner-glass" style={{ padding: '1rem', borderRadius: '16px', borderLeft: '4px solid #059669' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🧠 AI Strategic IPD Insights</span>
                                            <span style={{ fontSize: '9px', color: '#059669', fontWeight: 700, background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                                                {ipdInsights.filter(i => i.priority === 'CRITICAL' || i.priority === 'REVENUE RISK').length > 0 ? '⚠️ ACTION NEEDED' : '✅ STABLE'}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {ipdInsights.map((ins, i) => (
                                                <div key={i} style={{ padding: '8px 10px', borderRadius: '10px', background: `${ins.color}06`, border: `1px solid ${ins.color}15`, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
                                                        <span style={{ fontSize: '14px' }}>{ins.icon}</span>
                                                        <span style={{ fontSize: '7px', fontWeight: 900, color: ins.color, textTransform: 'uppercase' }}>{ins.priority}</span>
                                                    </div>
                                                    <p style={{ margin: 0, fontSize: '10.5px', color: 'var(--md-text-primary)', fontWeight: 500, lineHeight: 1.55 }}>{ins.text}</p>
                                                </div>
                                            ))}

                                            {ipdInsights.length === 0 && (
                                                <div style={{ textAlign: 'center', padding: '15px', color: '#059669', fontSize: '12px', fontWeight: 700 }}>
                                                    ✅ ประสิทธิภาพ IPD อยู่ในเกณฑ์ดีทุกด้าน
                                                </div>
                                            )}

                                            {/* Summary Score */}
                                            <div style={{ padding: '8px 10px', borderRadius: '10px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                                                <div style={{ fontSize: '10px', fontWeight: 800, color: '#059669', marginBottom: '4px' }}>📊 IPD Performance Summary</div>
                                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                    {[
                                                        { label: 'Coding', val: `${today.ipd_quality_score || 0}%`, ok: (today.ipd_quality_score || 0) >= 80 },
                                                        { label: 'DRG', val: `${ipdDrgScore}%`, ok: ipdDrgScore >= 80 },
                                                        { label: 'SLA', val: `${codingDays}D`, ok: codingDays <= 3 },
                                                        { label: 'Backlog', val: `${totalPendingWardCases}`, ok: totalPendingWardCases <= 20 },
                                                    ].map((m, i) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}>
                                                            <span style={{ fontSize: '12px' }}>{m.ok ? '🟢' : '🔴'}</span>
                                                            <span style={{ fontWeight: 700, color: 'var(--md-text-secondary)' }}>{m.label}:</span>
                                                            <span style={{ fontWeight: 900, color: m.ok ? '#059669' : '#e11d48' }}>{m.val}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()
                }

                {/* ━━━ IPD Coder Productivity — Fiscal Year Chart + Coder Cards (Horizontal) ━━━ */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>

                    {/* LEFT — Fiscal Year Productivity Chart */}
                    <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(15,118,110,0.3)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(15,118,110,0.1)', color: '#0f766e' }}>📅</div>
                                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>IPD Coder Productivity ({ipdCoderMonthTrend.fiscalLabel || 'ปีงบประมาณ'})</h4>
                            </div>
                            <span style={{ fontSize: '9px', background: 'rgba(5,150,105,0.1)', color: '#059669', padding: '3px 10px', borderRadius: '6px', fontWeight: 800 }}>FY Monthly</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                            {ipdCoderMonthTrend.topCoders.map((name, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '8px', fontWeight: 700, color: 'var(--md-text-secondary)' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: getCoderColor(name), flexShrink: 0 }} />
                                    <span style={{ whiteSpace: 'nowrap' }}>{name}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ flex: 1, minHeight: '260px', background: 'linear-gradient(180deg, rgba(15,118,110,0.06) 0%, rgba(0,0,0,0.12) 100%)', borderRadius: '16px', padding: '12px 16px 4px 16px', border: '1px solid rgba(15,118,110,0.1)' }}>
                            {loading.medRecToday ? (
                                <div className="skeleton" style={{ height: '100%', borderRadius: '12px' }} />
                            ) : ipdCoderMonthTrend.data.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ipdCoderMonthTrend.data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                                        <XAxis dataKey="shortLabel" fontSize={9} axisLine={false} tickLine={false} tick={{ fill: 'var(--md-text-tertiary)', fontWeight: 700 }} />
                                        <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{ fill: 'var(--md-text-tertiary)' }} />
                                        <Tooltip contentStyle={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)', color: '#fff' }} itemStyle={{ fontSize: '11px', fontWeight: 700 }} />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }} />
                                        {ipdCoderMonthTrend.topCoders.map((coderName, idx) => (
                                            <Bar key={idx} dataKey={coderName} fill={getCoderColor(coderName)} radius={[3, 3, 0, 0]} barSize={16} name={coderName} />
                                        ))}
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--md-text-tertiary)', flexDirection: 'column', gap: '8px' }}>
                                    <span style={{ fontSize: '24px' }}>📊</span>
                                    ยังไม่มีข้อมูลปีงบประมาณนี้
                                </div>
                            )}
                        </div>
                        {/* Summary Stats */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                            {ipdCoderMonthTrend.topCoders.slice(0, 5).map((name, idx) => {
                                const totalFY = ipdCoderMonthTrend.data.reduce((s, d) => s + (d[name] || 0), 0);
                                const avgPerMonth = (totalFY / Math.max(1, ipdCoderMonthTrend.data.length)).toFixed(1);
                                const c = getCoderColor(name);
                                return (
                                    <div key={idx} style={{ flex: '1 1 auto', minWidth: '90px', padding: '5px 8px', borderRadius: '8px', background: `${c}08`, border: `1px solid ${c}18`, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: c, flexShrink: 0 }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '8px', fontWeight: 800, color: c }}>{name}</div>
                                            <div style={{ fontSize: '8px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Σ {totalFY} · avg {avgPerMonth}/เดือน</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT — Top IPD Coder Cards */}
                    <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(15,118,110,0.3)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(15,118,110,0.1)', color: '#0f766e' }}>📊</div>
                                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800 }}>Top IPD Coder (รายบุคคล)</h4>
                            </div>
                            <span style={{ fontSize: '9px', background: 'rgba(15,118,110,0.1)', color: '#0f766e', padding: '3px 10px', borderRadius: '6px', fontWeight: 800 }}>PRODUCTIVITY KPI</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ display: 'flex', gap: '1.25rem', background: 'rgba(15,118,110,0.05)', padding: '6px 16px', borderRadius: '10px', border: '1px solid rgba(15,118,110,0.1)', flexWrap: 'wrap' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f766e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        📁 Monthly Summary Status:
                                    </div>
                                    {today.ipd_month_status_fy && today.ipd_month_status_fy.map((m, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)' }}>{m.month}</span>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                                                <span style={{ fontSize: '12px', fontWeight: 900, color: m.pct >= 90 ? '#059669' : m.pct >= 70 ? '#f59e0b' : '#e11d48' }}>{m.pct}%</span>
                                                <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>({m.coded}/{m.total})</span>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Today's Performers Badge */}
                                    {(today.ipd_coders || []).length > 0 && (
                                        <div style={{ borderLeft: '1px solid rgba(15,118,110,0.2)', paddingLeft: '1.25rem', marginLeft: '0.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '10px', fontWeight: 800, color: '#0284c7' }}>⭐ TODAY:</span>
                                            {today.ipd_coders.slice(0, 2).map((c, i) => (
                                                <span key={i} style={{ fontSize: '11px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{c.name} ({c.count})</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem', flex: 1, marginTop: '1rem' }}>
                            <div className="space-y-3">
                                {loading.medRecToday ? (
                                    <div className="skeleton" style={{ height: '300px', borderRadius: '12px' }} />
                                ) : (today.ipd_coders_fiscal || []).length > 0 ? (today.ipd_coders_fiscal).slice(0, 5).map((c, i) => {
                                    const trend = c.current_month_total - c.prev_month_total;
                                    const trendColor = trend > 0 ? '#10b981' : trend < 0 ? '#e11d48' : '#94a3b8';
                                    const trendSymbol = trend > 0 ? '▲' : trend < 0 ? '▼' : '−';
                                    const trendPct = c.prev_month_total > 0 ? Math.round(Math.abs(trend) / c.prev_month_total * 100) : 0;

                                    let aiAnalysis = '';
                                    if (trend > 20) aiAnalysis = `เพิ่มขึ้นเด่นชัด (+${trend})`;
                                    else if (trend > 0) aiAnalysis = `เพิ่มขึ้น (+${trend})`;
                                    else if (trend < -20) aiAnalysis = `ปริมาณงานลดลง (${trend})`;
                                    else if (trend < 0) aiAnalysis = `ชะลอตัวลง (${trend})`;
                                    else aiAnalysis = 'ทรงตัวเท่าเดิม';

                                    let coderStyle = 'สายมาตรฐาน';
                                    let styleEmoji = '⚙️';
                                    let styleColor = 'var(--md-text-tertiary)';

                                    if (c.cc_rate > 1.5) {
                                        coderStyle = '🟡 นักขุดทอง CC Hunter';
                                        styleEmoji = '🟡';
                                        styleColor = '#f59e0b';
                                    } else if (c.cc_rate > 0.8) {
                                        coderStyle = '🔵 จอมละเอียด Detail Oriented';
                                        styleEmoji = '🔵';
                                        styleColor = '#0284c7';
                                    } else if (c.cc_rate <= 0.3) {
                                        coderStyle = '🔴 สายฟ้าแลบ Speed Coder';
                                        styleEmoji = '🔴';
                                        styleColor = '#e11d48';
                                    } else {
                                        coderStyle = '🟢 สายสมดุล Balanced';
                                        styleEmoji = '🟢';
                                        styleColor = '#059669';
                                    }

                                    // ─── Diagnosis Type Breakdown ───
                                    const diagTypes = [
                                        { key: 'PDx', val: c.type1_per_case || 0, color: '#6366f1', label: 'โรคหลัก' },
                                        { key: 'CC', val: c.type2_per_case || 0, color: '#f59e0b', label: 'โรคร่วม' },
                                        { key: 'MCC', val: c.type3_per_case || 0, color: '#e11d48', label: 'โรคแทรก' },
                                        { key: 'Other', val: c.type4_per_case || 0, color: '#94a3b8', label: 'อื่นๆ' },
                                    ];
                                    const totalDiagTypes = diagTypes.reduce((s, d) => s + d.val, 0);

                                    // ─── Best Day & Consistency from daily data ───
                                    const dailyData = (today.ipd_coders_daily || []).filter(d => d.name === c.name);
                                    const bestDay = dailyData.length > 0 ? dailyData.reduce((max, d) => d.count > max.count ? d : max, dailyData[0]) : null;
                                    const activeDays = dailyData.filter(d => d.count > 0).length;
                                    const today_date = new Date();
                                    const dayOfMonth = today_date.getDate();
                                    const consistencyPct = dayOfMonth > 0 ? Math.round((activeDays / dayOfMonth) * 100) : 0;
                                    const avgPerActiveDay = activeDays > 0 ? (dailyData.reduce((s, d) => s + d.count, 0) / activeDays).toFixed(1) : 0;

                                    // ─── Productivity Score (0-100) ───
                                    const volumeScore = Math.min(40, Math.round((c.current_month_total / 50) * 40));
                                    const qualityScore = Math.min(30, Math.round(c.cc_rate / 1.5 * 30));
                                    const consistScore = Math.min(30, Math.round((consistencyPct / 100) * 30));
                                    const productivityScore = volumeScore + qualityScore + consistScore;
                                    const prodColor = productivityScore >= 80 ? '#059669' : productivityScore >= 50 ? '#f59e0b' : '#e11d48';
                                    const prodLabel = productivityScore >= 80 ? 'Excellent' : productivityScore >= 60 ? 'Good' : productivityScore >= 40 ? 'Fair' : 'Needs Attention';

                                    // ─── Rank Badge ───
                                    const rankEmoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;

                                    // ─── AI Deep Recommendation ───
                                    let aiRecommendation = '';
                                    if (coderStyle.includes('นักขุดทอง')) {
                                        aiRecommendation = trend < 0
                                            ? `CC Rate สูง ${c.cc_rate} แต่งานลด ${trendPct}% ● อาจมีเคสยากติดค้าง ● แนะนำ: จัดลำดับเคสตาม Severity`
                                            : `CC Rate ดีเยี่ยม ${c.cc_rate} ช่วยเพิ่ม RW จากเคสยาก ● ควรเป็น Mentor ให้ทีม ● ดึง Revenue ได้สูง`;
                                    } else if (coderStyle.includes('สายฟ้าแลบ')) {
                                        aiRecommendation = `Code เร็ว CC Rate เพียง ${c.cc_rate} ● เสี่ยงตกหล่น CC/MCC → Revenue Leakage ● แนะนำ: สุ่ม Audit 20% ของเคสที่ Code`;
                                    } else if (coderStyle.includes('จอมละเอียด')) {
                                        aiRecommendation = `ละเอียด CC Rate ${c.cc_rate} ● ลดโอกาส Denial ได้ดี ● ${consistencyPct < 70 ? 'แต่ควรเพิ่มความสม่ำเสมอ (เข้าทำ ' + activeDays + '/' + dayOfMonth + ' วัน)' : 'ความสม่ำเสมอดี ' + consistencyPct + '%'}`;
                                    } else {
                                        aiRecommendation = `สมดุล CC ${c.cc_rate} + Diag/เคส ${c.diag_per_case} ● ${c.current_month_total > 50 ? 'กำลังหลักของแผนก เชื่อถือได้' : 'ปริมาณปานกลาง ยังมี Room to Grow'} ● ${trend >= 0 ? 'Momentum ดี' : 'ควรตรวจสาเหตุที่ชะลอ'}`;
                                    }

                                    if (c.current_month_total > 50 && !coderStyle.includes('สายฟ้าแลบ')) {
                                        aiRecommendation += ' ● 🌟 Key Person ของแผนก';
                                    }

                                    return (
                                        <div key={i} style={{ display: 'flex', flexDirection: 'column', background: 'rgba(255,255,255,0.03)', padding: '12px 14px', borderRadius: '14px', border: `1px solid ${styleColor}20`, borderLeft: `3px solid ${styleColor}` }}>
                                            {/* Row 1: Header */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <div style={{ fontSize: '18px', lineHeight: 1 }}>{typeof rankEmoji === 'string' && rankEmoji.startsWith('#') ? <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--md-text-tertiary)' }}>{rankEmoji}</span> : rankEmoji}</div>
                                                    <div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                            <span style={{ fontSize: '13px', fontWeight: 800 }}>{c.name}</span>
                                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getCoderColor(c.name), boxShadow: `0 0 6px ${getCoderColor(c.name)}60` }} />
                                                        </div>
                                                        <div style={{ marginTop: '2px', fontSize: '9px', fontWeight: 800, color: styleColor, background: `${styleColor}12`, padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>{coderStyle}</div>
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 800, textTransform: 'uppercase' }}>Productivity</div>
                                                    <div style={{ fontSize: '18px', fontWeight: 900, color: prodColor }}>{productivityScore}<span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>/100</span></div>
                                                    <div style={{ fontSize: '8px', fontWeight: 700, color: prodColor }}>{prodLabel}</div>
                                                </div>
                                            </div>

                                            {/* Row 2: Key Metrics */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginTop: '8px' }}>
                                                <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(15,118,110,0.08)', textAlign: 'center' }}>
                                                    <div style={{ fontSize: '7px', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase' }}>This Month</div>
                                                    <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{c.current_month_total}</div>
                                                </div>
                                                <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(99,102,241,0.08)', textAlign: 'center' }}>
                                                    <div style={{ fontSize: '7px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase' }}>FY Total</div>
                                                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#6366f1' }}>{c.fiscal_total}</div>
                                                </div>
                                                <div style={{ padding: '6px', borderRadius: '8px', background: `${trendColor}12`, textAlign: 'center' }}>
                                                    <div style={{ fontSize: '7px', fontWeight: 800, color: trendColor, textTransform: 'uppercase' }}>MoM</div>
                                                    <div style={{ fontSize: '15px', fontWeight: 900, color: trendColor }}>{trendSymbol}{Math.abs(trend)}</div>
                                                </div>
                                                <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(14,165,233,0.08)', textAlign: 'center' }}>
                                                    <div style={{ fontSize: '7px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase' }}>Diag/เคส</div>
                                                    <div style={{ fontSize: '15px', fontWeight: 900, color: '#0ea5e9' }}>{c.diag_per_case}</div>
                                                </div>
                                            </div>

                                            {/* Row 3: Diagnosis Type Breakdown */}
                                            <div style={{ marginTop: '8px', padding: '6px 8px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)' }}>
                                                <div style={{ fontSize: '8px', fontWeight: 800, color: 'var(--md-text-tertiary)', marginBottom: '4px', textTransform: 'uppercase' }}>📋 Diagnosis Type Mix (per case)</div>
                                                {totalDiagTypes > 0 ? (
                                                    <>
                                                        <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', marginBottom: '4px' }}>
                                                            {diagTypes.filter(d => d.val > 0).map((d, di) => (
                                                                <div key={di} style={{ width: `${(d.val / totalDiagTypes) * 100}%`, background: d.color, transition: 'width 0.5s ease' }} title={`${d.key}: ${d.val}`} />
                                                            ))}
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                            {diagTypes.filter(d => d.val > 0).map((d, di) => (
                                                                <div key={di} style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '8px', fontWeight: 700 }}>
                                                                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: d.color }} />
                                                                    <span style={{ color: 'var(--md-text-tertiary)' }}>{d.key}</span>
                                                                    <span style={{ color: d.color, fontWeight: 900 }}>{d.val}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                ) : <div style={{ fontSize: '9px', color: 'var(--md-text-tertiary)' }}>ยังไม่มีข้อมูล Diagnosis Type</div>}
                                            </div>

                                            {/* Row 4: Consistency & Best Day */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '6px' }}>
                                                <div style={{ padding: '6px 8px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)' }}>
                                                    <div style={{ fontSize: '8px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginBottom: '2px' }}>🔄 ความสม่ำเสมอ</div>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                                        <span style={{ fontSize: '14px', fontWeight: 900, color: consistencyPct >= 80 ? '#059669' : consistencyPct >= 50 ? '#f59e0b' : '#e11d48' }}>{consistencyPct}%</span>
                                                        <span style={{ fontSize: '8px', color: 'var(--md-text-tertiary)' }}>({activeDays}/{dayOfMonth} วัน)</span>
                                                    </div>
                                                    <div style={{ height: '3px', background: 'var(--md-surface-alt)', borderRadius: '2px', marginTop: '3px', overflow: 'hidden' }}>
                                                        <div style={{ height: '100%', width: `${consistencyPct}%`, background: consistencyPct >= 80 ? '#059669' : consistencyPct >= 50 ? '#f59e0b' : '#e11d48', transition: 'width 0.5s ease' }} />
                                                    </div>
                                                </div>
                                                <div style={{ padding: '6px 8px', borderRadius: '8px', background: 'rgba(0,0,0,0.03)' }}>
                                                    <div style={{ fontSize: '8px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginBottom: '2px' }}>⭐ Best Day & Avg</div>
                                                    {bestDay ? (
                                                        <div>
                                                            <div style={{ fontSize: '10px', fontWeight: 800, color: '#f59e0b' }}>
                                                                {new Date(bestDay.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} → {bestDay.count} เคส
                                                            </div>
                                                            <div style={{ fontSize: '9px', color: 'var(--md-text-tertiary)', fontWeight: 600, marginTop: '2px' }}>
                                                                เฉลี่ย {avgPerActiveDay} เคส/วัน (เฉพาะวันทำงาน)
                                                            </div>
                                                        </div>
                                                    ) : <span style={{ fontSize: '9px', color: 'var(--md-text-tertiary)' }}>—</span>}
                                                </div>
                                            </div>

                                            {/* Row 5: AI Analysis */}
                                            <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <div style={{ display: 'flex', gap: '6px', fontSize: '10px' }}>
                                                    <span style={{ color: '#0ea5e9', fontWeight: 800, minWidth: '45px' }}>⚡ Trend:</span>
                                                    <span style={{ color: trendColor, fontWeight: 700 }}>{aiAnalysis} {trendPct > 0 ? `(${trendPct}%)` : ''}</span>
                                                </div>
                                                <div style={{ display: 'flex', gap: '6px', fontSize: '10px' }}>
                                                    <span style={{ color: styleColor, fontWeight: 800, minWidth: '45px' }}>🎯 CC Rate:</span>
                                                    <span style={{ fontWeight: 600, color: 'var(--md-text-secondary)' }}>{c.cc_rate} CC/เคส · {c.diag_per_case} Diag/เคส</span>
                                                </div>
                                                <div style={{ padding: '6px 8px', borderRadius: '8px', background: 'rgba(15,118,110,0.04)', border: '1px solid rgba(15,118,110,0.1)', marginTop: '2px' }}>
                                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                                                        <span style={{ color: '#0f766e', fontWeight: 800, fontSize: '10px', minWidth: '60px' }}>🧠 AI Insight:</span>
                                                        <span style={{ fontSize: '10px', color: 'var(--md-text-primary)', lineHeight: 1.55, fontWeight: 500 }}>{aiRecommendation}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : <p style={{ fontSize: '12px', color: 'var(--md-text-tertiary)' }}>ยังไม่มีข้อมูล</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '24px', marginBottom: '1.5rem', border: '1px solid rgba(15,118,110,0.3)', background: 'linear-gradient(135deg, rgba(15,118,110,0.05), rgba(99,102,241,0.02))' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1.25rem' }}>
                        <div style={{ padding: '10px', borderRadius: '12px', background: 'linear-gradient(135deg, #0f766e, #6366f1)', color: '#fff', fontSize: '20px', boxShadow: '0 4px 15px rgba(15,118,110,0.3)' }}>
                            💎
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--md-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                AI Coder Assistant: DRG Optimization & Revenue Recovery
                                <span style={{ fontSize: '10px', background: 'rgba(15,118,110,0.15)', color: '#0f766e', padding: '2px 6px', borderRadius: '4px' }}>AI RECOMMENDED</span>
                            </h4>
                            <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500, lineHeight: 1.6 }}>
                                กลยุทธ์เชิงลึกสำหรับ Coder: AI ตรวจพบโอกาสในการเพิ่มค่า <strong style={{ color: '#0f766e' }}>Relative Weight (RW)</strong> จากการทบทวนเวชระเบียน (CDI) และการบันทึกโรคแทรกซ้อน (MCC/CC) ที่อาจตกหล่น
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
                        {/* MCC/CC Missing */}
                        <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(244,63,94,0.05)', border: '1px solid rgba(244,63,94,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                                <h5 style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#e11d48', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>⚠️</span> ทบทวนโรคร่วม/แทรกซ้อน (MCC/CC)
                                </h5>
                                <span style={{ padding: '2px 8px', background: '#e11d48', color: '#fff', fontSize: '8px', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>HIGH RW IMPACT</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                                <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{(drgOpt.mccMissing || []).length} <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>Cases</span></span>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>+ ฿{(drgOpt.mccRevenue || 0).toLocaleString()} (est.)</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                AI พบการสั่งจ่ายยา/Lab ที่เข้าข่าย <strong>Sepsis, AKI, หรือ Severe Malnutrition</strong> แต่ยังไม่ได้ลงรหัสโรคแทรกซ้อน ควรส่ง CDI ให้แพทย์ยืนยัน
                            </p>

                            <div className="custom-scrollbar" style={{ marginTop: '12px', flex: 1, maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                                {(drgOpt.mccMissing || []).map((c, i) => (
                                    <div key={i} style={{ padding: '8px 10px', background: 'var(--md-surface)', borderRadius: '8px', border: '1px solid rgba(244,63,94,0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', alignItems: 'baseline' }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)' }}>HN {c.hn}</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-secondary)' }}>AN {c.an}</span>
                                            </div>
                                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>{c.ward}</span>
                                        </div>
                                        <div style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 700, color: '#3f3f46', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ fontSize: '12px' }}>👤</span> {c.name}
                                        </div>
                                        <p style={{ margin: '0 0 6px', fontSize: '10px', color: 'var(--md-text-secondary)' }}>📝 {c.issue}</p>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', background: 'rgba(16,185,129,0.05)', padding: '4px 6px', borderRadius: '4px' }}>
                                            <span style={{ fontSize: '10px' }}>🤖</span>
                                            <span style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>{c.aiSuggest}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <button className="hover-lift" style={{ background: 'rgba(244,63,94,0.1)', color: '#e11d48', border: '1px solid rgba(244,63,94,0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}>
                                    ดูเคส High RW Impact ทั้งหมด ({(drgOpt.mccMissing || []).length}) →
                                </button>
                            </div>
                        </div>

                        {/* Principal Diagnosis Optimization */}
                        <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(2,132,199,0.05)', border: '1px solid rgba(2,132,199,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                                <h5 style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>🎯</span> เสนอเปลี่ยนรหัสโรคหลัก (PDx)
                                </h5>
                                <span style={{ padding: '2px 8px', background: '#0284c7', color: '#fff', fontSize: '8px', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>PDx OPTIMIZATION</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                                <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{(drgOpt.pdxOptimization || []).length} <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>Cases</span></span>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>+ ฿{(drgOpt.pdxRevenue || 0).toLocaleString()} (est.)</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                พบการลงรหัสแบบกว้าง (Unspecified) เช่น Pneumonia Unspec. แทนที่จะเป็น <strong>Bacterial Pneumonia</strong> แบบเจาะจง ซึ่งมีค่า DRG RW สูงกว่า
                            </p>

                            <div className="custom-scrollbar" style={{ marginTop: '12px', flex: 1, maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                                {(drgOpt.pdxOptimization || []).map((c, i) => (
                                    <div key={i} style={{ padding: '8px 10px', background: 'var(--md-surface)', borderRadius: '8px', border: '1px solid rgba(2,132,199,0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', alignItems: 'baseline' }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)' }}>HN {c.hn}</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-secondary)' }}>AN {c.an}</span>
                                            </div>
                                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>{c.ward}</span>
                                        </div>
                                        <div style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 700, color: '#3f3f46', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ fontSize: '12px' }}>👤</span> {c.name}
                                        </div>
                                        <p style={{ margin: '0 0 6px', fontSize: '10px', color: 'var(--md-text-secondary)' }}>📝 {c.issue}</p>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', background: 'rgba(2,132,199,0.05)', padding: '4px 6px', borderRadius: '4px' }}>
                                            <span style={{ fontSize: '10px' }}>🤖</span>
                                            <span style={{ fontSize: '10px', color: '#0284c7', fontWeight: 600 }}>{c.aiSuggest}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <button className="hover-lift" style={{ background: 'rgba(2,132,199,0.1)', color: '#0284c7', border: '1px solid rgba(2,132,199,0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}>
                                    ตรวจสอบ PDx Suggestions ({(drgOpt.pdxOptimization || []).length}) →
                                </button>
                            </div>
                        </div>

                        {/* Critical Lab Alert */}
                        <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(15,118,110,0.05)', border: '1px solid rgba(15,118,110,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                                <h5 style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#0f766e', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>🩸</span> แจ้งเตือนผล Lab เฉียบพลัน
                                </h5>
                                <span style={{ padding: '2px 8px', background: '#0f766e', color: '#fff', fontSize: '8px', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>LAB CC/MCC ALERT</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                                <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{(drgOpt.labAlerts || []).length} <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>Cases</span></span>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>+ ฿{(drgOpt.labRevenue || 0).toLocaleString()} (est.)</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                พบผล Lab ที่มีค่าวิกฤตบ่งชี้ถึงโรคร่วม/แทรกซ้อน (CC/MCC) ที่สำคัญ เช่น <strong>AKI, Sepsis, Electrolyte Imbalance</strong> ควรตรวจสอบว่าแพทย์ได้ลงรหัสโรคแล้วหรือยัง
                            </p>

                            <div className="custom-scrollbar" style={{ marginTop: '12px', flex: 1, maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                                {(drgOpt.labAlerts || []).map((c, i) => (
                                    <div key={i} style={{ padding: '8px 10px', background: 'var(--md-surface)', borderRadius: '8px', border: '1px solid rgba(15,118,110,0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', alignItems: 'baseline' }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)' }}>HN {c.hn}</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-secondary)' }}>AN {c.an}</span>
                                            </div>
                                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>{c.ward}</span>
                                        </div>
                                        <div style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 700, color: '#3f3f46', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ fontSize: '12px' }}>👤</span> {c.name}
                                        </div>
                                        <p style={{ margin: '0 0 6px', fontSize: '10px', color: 'var(--md-text-secondary)' }}>📝 {c.issue}</p>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', background: 'rgba(15,118,110,0.05)', padding: '4px 6px', borderRadius: '4px' }}>
                                            <span style={{ fontSize: '10px' }}>🤖</span>
                                            <span style={{ fontSize: '10px', color: '#0f766e', fontWeight: 600 }}>{c.aiSuggest}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <button className="hover-lift" style={{ background: 'rgba(15,118,110,0.1)', color: '#0f766e', border: '1px solid rgba(15,118,110,0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}>
                                    ตรวจสอบ Critical Lab Alerts ({(drgOpt.labAlerts || []).length}) →
                                </button>
                            </div>
                        </div>

                        <div style={{ padding: '14px', borderRadius: '14px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                                <h5 style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span>⏱️</span> แจ้งเตือนวันนอนผิดปกติ (LOS)
                                </h5>
                                <span style={{ padding: '2px 8px', background: '#f59e0b', color: '#fff', fontSize: '8px', fontWeight: 800, borderRadius: '4px', whiteSpace: 'nowrap' }}>ADJ RW ALERT</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                                <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--md-text-primary)' }}>{(drgOpt.losAlert || []).length} <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>Cases</span></span>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#e11d48' }}>Risk of AdjRW Drop</span>
                            </div>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>
                                พบเคสที่ถูกจำหน่ายเร็วกว่ากำหนด <strong>(Short Stay)</strong> หรือนอนนานเกินเกณฑ์ <strong>(Long Stay outlier)</strong> ซึ่งส่งผลให้ AdjRW ถูกปรับลดได้
                            </p>

                            <div className="custom-scrollbar" style={{ marginTop: '12px', flex: 1, maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                                {(drgOpt.losAlert || []).map((c, i) => (
                                    <div key={i} style={{ padding: '8px 10px', background: 'var(--md-surface)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.1)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', alignItems: 'baseline' }}>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)' }}>HN {c.hn}</span>
                                                <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--md-text-secondary)' }}>AN {c.an}</span>
                                            </div>
                                            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>{c.ward}</span>
                                        </div>
                                        <div style={{ marginBottom: '4px', fontSize: '11px', fontWeight: 700, color: '#3f3f46', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ fontSize: '12px' }}>👤</span> {c.name}
                                        </div>
                                        <p style={{ margin: '0 0 6px', fontSize: '10px', color: 'var(--md-text-secondary)' }}>📝 {c.issue}</p>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', background: 'rgba(245,158,11,0.05)', padding: '4px 6px', borderRadius: '4px' }}>
                                            <span style={{ fontSize: '10px' }}>🤖</span>
                                            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 600 }}>{c.aiSuggest}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                <button className="hover-lift" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 700, cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}>
                                    ตรวจสอบ Length of Stay Alert ({(drgOpt.losAlert || []).length}) →
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ fontSize: '24px' }}>💡</div>
                        <div style={{ flex: 1 }}>
                            <h6 style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 800, color: '#059669' }}>AI Workflow Suggestion สำหรับ Coder & Auditor</h6>
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 500, lineHeight: 1.4 }}>
                                เพื่อเพิ่มรายได้และลดข้อผิดพลาด (Claim Denial) แนะนำให้ตรวจสอบเคสที่ AI แนะนำโดย<strong style={{ color: 'var(--md-text-primary)' }}>โฟกัสกลุ่ม High RW Impact (เคสตกหล่น MCC/CC) เป็นอันดับแรกก่อนสรุปชาร์ต</strong> หากพบข้อสงสัย ให้ส่งคำร้องขอ CDI แจ้งเตือนแพทย์ผู้ขีดชาร์ตผ่านระบบทันที
                            </p>
                        </div>
                    </div>
                </div>




            </div>
        </div >
    );
}
