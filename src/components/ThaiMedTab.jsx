// ============================================================
// BCH 360° Intelligence V.10 - Thai Traditional Medicine Tab
// 🌿 Professional TTM Analytics + Deep Root-Cause Analysis
// ============================================================
import React, { useEffect, useMemo } from 'react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Cell, ComposedChart, Area, Line, PieChart, Pie
} from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import MetricCard from './shared/MetricCard.jsx';
import MetricsStrip from './shared/MetricsStrip.jsx';
import HealthGauge from './shared/HealthGauge.jsx';
import AlertBanner from './shared/AlertBanner.jsx';

function ThaiMedTab() {
    const { state, fetchData } = useDashboard();
    const ttmToday = state.ttmToday;
    const ttmAnalytics = state.ttmAnalytics;
    const loading = state.loading;

    useEffect(() => {
        fetchData('ttmToday', '/api/thaimedicine/today');
        fetchData('ttmAnalytics', '/api/thaimedicine/analytics');
        fetchData('ttmRevenueFiscal', '/api/thaimedicine/revenue-fiscal');
    }, [fetchData]);

    const today = ttmToday || {};

    // BCH แพทย์แผนไทย เวลาให้บริการ 07:00-20:30
    // แก้ TTM_CLOSE_HOUR / TTM_CLOSE_MIN ใน server/.env ถ้าเวลาเปลี่ยน
    const TTM_CLOSE_HOUR = 20;
    const TTM_CLOSE_MIN  = 30;
    const isPastServiceTime = useMemo(() => {
        const h = new Date().getHours(), m = new Date().getMinutes();
        return h > TTM_CLOSE_HOUR || (h === TTM_CLOSE_HOUR && m >= TTM_CLOSE_MIN);
    }, []);

    // ━━━━━━ 🧠 AI Strategic & Operational Intelligence ━━━━━━
    const aiIntelligence = useMemo(() => {
        if (!ttmToday) return {
            forecast: { nextPeak: '—', intensity: 'Low', status: 'Stable' },
            staffing: { status: 'Optimal', recommendation: 'Maintain current staffing', color: '#10b981' },
            hourlyChart: []
        };

        const currentHour = new Date().getHours();
        const predictions = ttmToday.hourly_prediction || [];
        const nextHourPeak = predictions.find(f => f.hour === (currentHour + 1))?.count || 0;

        // Staffing Logic
        let staffingStatus = 'Optimal';
        let staffingRec = 'กำลังพลเพียงพอต่อโหลดปัจจุบัน';
        let staffingColor = '#10b981';

        const currentLoad = ttmToday.waiting || 0;
        if (currentLoad > 10 || nextHourPeak > 5) {
            staffingStatus = 'Overstrained';
            staffingRec = `🚨 ต้องการทีมนวด/ประคบเพิ่ม ${Math.ceil((nextHourPeak + currentLoad) / 3)} ท่าน เพื่อรองรับโหลดในชั่วโมงถัดไป`;
            staffingColor = '#f43f5e';
        } else if (currentLoad > 5) {
            staffingStatus = 'Tight';
            staffingRec = '⚠️ ควรเฝ้าระวังและเตรียมพร้อมรับเคส Walk-in ใน 30 นาทีถัดไป';
            staffingColor = '#f59e0b';
        }

        const hourlyChart = (ttmToday.hourly || []).map((h, i) => ({
            ...h,
            prediction: predictions[i]?.count || 0
        })).filter(h => h.hour >= 7 && h.hour <= 20);

        return {
            forecast: {
                nextPeak: nextHourPeak > 0 ? `${currentHour + 1}:00` : '—',
                intensity: nextHourPeak > 5 ? 'High' : 'Normal',
                status: currentLoad > 5 ? 'Congested' : 'Clear'
            },
            staffing: { status: staffingStatus, recommendation: staffingRec, color: staffingColor },
            hourlyChart
        };
    }, [ttmToday]);


    return (
        <div className="space-y-4 animate-fade-in pb-8">
            {/* ━━━━━━ 🧠 Revenue Intelligence Hub ━━━━━━ */}
            {!loading.ttmRevenueFiscal && state.ttmRevenueFiscal && (() => {
                const fd = state.ttmRevenueFiscal;
                const years = fd?.fiscal_years || [];
                if (years.length < 2) return null;

                const latestYear = years[years.length - 1];
                const prevYear = years[years.length - 2];
                const totalRev = latestYear.total_revenue || 0;
                const prevRev = prevYear.total_revenue || 0;

                const compRevLatest = latestYear.comparable_revenue ?? totalRev;
                const compRevPrev = prevYear.comparable_revenue ?? prevRev;

                const yoyGrowth = compRevPrev > 0 ? ((compRevLatest - compRevPrev) / compRevPrev) * 100 : 0;
                const avgRevPerVisit = latestYear.avg_revenue_per_visit || 0;

                let growthStatus = '';
                let recommendations = [];

                if (yoyGrowth >= 5) {
                    growthStatus = '🟢 แนวโน้มการเติบโตดีเยี่ยม โอกาสขยาย Service Line';
                    recommendations = [
                        { tag: 'High-Value Clinics', text: 'ขยายบริการคลินิกเฉพาะทางที่มี Margin สูง เช่น นวดจัดกระดูก, ประคบสมุนไพรสูตรรักษาโรคเฉพาะทาง' },
                        { tag: 'Premium Services', text: 'พิจารณาเพิ่มบริการ Fast Track หรือ Premium Clinic สำหรับผู้ป่วยที่ต้องการความรวดเร็วและพร้อมจ่ายเพิ่ม' },
                        { tag: 'Health Packages', text: 'จัดทำแพ็กเกจตรวจสุขภาพเจาะลึก (Comprehensive Checkup) ควบคู่กับการรักษาผู้ป่วยนอกเพื่อเพิ่มรายได้' }
                    ];
                } else if (yoyGrowth >= 0) {
                    growthStatus = '🟡 การเติบโตทรงตัว เน้นเพิ่ม Revenue per Visit';
                    recommendations = [
                        { tag: 'Diagnostic Upsell', text: 'เสนอโปรแกรมเพิ่มเติม เช่น อบสมุนไพร หรือ ยาหม้อ ให้ผู้ป่วยพิจารณาในเคสที่ต้องการการบรรเทาพิเศษ' },
                        { tag: 'Recall Optimization', text: 'ปรับปรุงระบบนัดหมายล่วงหน้า (Chronic Care Recall) ด้วย SMS/LINE อัตโนมัติ เพื่อล๊อคฐานผู้ป่วยโรคเรื้อรัง' },
                        { tag: 'Cross-Consultation', text: 'เพิ่มการส่งต่อจากแผนกอื่น (เช่น กายภาพบำบัด) มายังแพทย์แผนไทยในเครือข่ายเดียวกัน' }
                    ];
                } else {
                    growthStatus = '🔴 รายได้หดตัว ต้องการแผนกระตุ้นและลดรอยรั่วทันที';
                    recommendations = [
                        { tag: 'Revenue Leakage', text: 'ระบบการเรียกเก็บเงินมีรอยรั่วเร่งด่วน — ตรวจสอบรายการวัสดุและสมุนไพรเบิกฉุกเฉิน หรือ Missing Charges' },
                        { tag: 'Throughput Time', text: 'คอขวดทำให้รับคิวได้น้อยลง — จัด Fast Track ช่วยเร่งระบายคนไข้กลุ่มที่ต้องการนวดเดี่ยว' },
                        { tag: 'Patient Acquisition', text: 'โปรโมทคอร์สแพทย์แผนไทยผ่าน Tele-medicine / Social Media หาลูกค้าใหม่' }
                    ];
                }

                // Revenue/Visit thresholds — อ้างอิงราคา BCH แพทย์แผนไทยปัจจุบัน
                // ปรับ TTM_REV_BASIC / TTM_REV_PREMIUM ใน server/.env ถ้าราคาเปลี่ยน
                const TTM_REV_BASIC   = 500;  // นวดพื้นฐาน (฿/ครั้ง)
                const TTM_REV_PREMIUM = 1000; // หัตถการพิเศษ (฿/ครั้ง)

                let revPerVisitInsight = '';
                if (avgRevPerVisit < TTM_REV_BASIC) {
                    revPerVisitInsight = `⚠️ Revenue/Visit อยู่ที่ ฿${Math.round(avgRevPerVisit).toLocaleString()} สะท้อนกลุ่มผู้ป่วยที่มาทำการรักษาพื้นฐาน (นวดอย่างเดียว) — เสนอให้จัดเป็น Package คู่กับการอบ/ประคบ`;
                } else if (avgRevPerVisit > TTM_REV_PREMIUM) {
                    revPerVisitInsight = `✅ Revenue/Visit อยู่ที่ ฿${Math.round(avgRevPerVisit).toLocaleString()} แสดงถึงศักยภาพของการสร้างรายได้ร่วมกับหัตถการพิเศษ — ควรพิจารณาทำระบบ VIP Membership`;
                } else {
                    revPerVisitInsight = `📊 Revenue/Visit อยู่ที่ ฿${Math.round(avgRevPerVisit).toLocaleString()} อยู่ในเกณฑ์มาตรฐาน — สามารถพิจารณาแพ็กเกจเสริมระดับ Moderate เพื่ออัปยอดบิล`;
                }

                return (
                    <div style={{ marginTop: '0.5rem', marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                🧠 Revenue Intelligence Hub
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                EXECUTIVE ADVISORY
                            </span>
                        </div>

                        <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(16,185,129,.05) 0%, rgba(5,150,105,.02) 100%)', border: '1px solid rgba(16,185,129,.2)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                                {/* Status Bar */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(203,213,225,.2)' }}>
                                    <div>
                                        <p style={{ margin: 0, fontSize: '11px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            AI Revenue Growth Diagnosis
                                        </p>
                                        <p style={{ margin: '4px 0 0', fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--md-text-primary)' }}>
                                            {growthStatus}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>YoY Growth</p>
                                        <p style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: yoyGrowth >= 0 ? '#10b981' : '#f43f5e', letterSpacing: '-0.02em' }}>
                                            {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth.toFixed(1)}%
                                        </p>
                                    </div>
                                </div>

                                {/* Insight & Actions */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem', alignItems: 'start' }}>
                                    {/* Left: Deep Insight */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '16px' }}>👁️</span>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Financial Deep Insight</span>
                                        </div>
                                        <p style={{ fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500, background: 'var(--md-surface-2)', padding: '10px 12px', borderRadius: '8px', margin: 0, border: '1px solid var(--md-border)' }}>
                                            {revPerVisitInsight}
                                        </p>
                                    </div>

                                    {/* Right: CFO Actions */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '16px' }}>🎯</span>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--md-text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Recommended Actions for Director</span>
                                        </div>
                                        <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11.5px', color: 'var(--md-text-secondary)', fontWeight: 500, lineHeight: 1.5 }}>
                                            {recommendations.map((rec, i) => (
                                                <li key={i}>
                                                    <strong style={{ color: '#10b981' }}>{rec.tag}: </strong>
                                                    {rec.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* ━━━ Premium MetricsStrip — 8 KPIs ━━━ */}
            {!loading.ttmToday && ttmToday && (() => {
                const t = ttmToday;
                const total = t.total ?? 0;
                const completed = t.completed ?? 0;
                const waiting = isPastServiceTime ? 0 : (t.waiting ?? 0);
                const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                const yesterdayTotal = t.yesterday_total ?? t.yesterday ?? 0;
                const dayChange = yesterdayTotal > 0 ? Math.round(((total - yesterdayTotal) / yesterdayTotal) * 100) : 0;

                return (
                    <MetricsStrip columns={4} gap="10px" metrics={[
                        { label: 'ผู้ป่วยวันนี้', value: total, icon: '🌿', status: total > 0 ? 'success' : 'neutral', trend: dayChange !== 0 ? `${dayChange > 0 ? '+' : ''}${dayChange}% vs เมื่อวาน` : undefined },
                        { label: 'เสร็จสิ้น', value: `${pct}%`, icon: '✅', status: pct >= 80 ? 'success' : pct >= 50 ? 'warning' : 'danger' },
                        { label: 'รอรับบริการ', value: waiting, unit: 'ราย', icon: '⏳', status: waiting <= 3 ? 'success' : waiting <= 8 ? 'warning' : 'danger' },
                        { label: 'Unique Patients', value: t.unique_patients ?? 0, unit: 'คน', icon: '👥', status: 'info' },
                        { label: 'ผู้สูงอายุ', value: t.elderly ?? 0, unit: 'ราย', icon: '👴', status: (t.elderly ?? 0) > 10 ? 'warning' : 'success' },
                        { label: 'เพศชาย', value: t.male ?? 0, unit: 'คน', icon: '♂️', status: 'info' },
                        { label: 'เพศหญิง', value: t.female ?? 0, unit: 'คน', icon: '♀️', status: 'info' },
                        { label: 'เวลาให้บริการ', value: isPastServiceTime ? 'ปิดแล้ว' : 'เปิด', icon: '🕐', status: isPastServiceTime ? 'neutral' : 'success' },
                    ]} />
                );
            })()}

            {/* ━━━ AI Analytics Section — 4 AIInsightCards ━━━ */}
            {!loading.ttmToday && !loading.ttmAnalytics && (() => {
                const t = ttmToday || {};
                const a = ttmAnalytics || {};
                const total = t.total ?? 0;
                const completed = t.completed ?? 0;
                const waiting = isPastServiceTime ? 0 : (t.waiting ?? 0);
                const tpi = a.tpi ?? 0;
                const avgWait = a.avg_wait_time ?? 0;
                const completionRate = a.completion_rate ?? 0;
                const avgRevenue = a.avg_revenue_per_visit ?? 0;
                const totalRevenue = a.total_revenue ?? 0;
                const avgDaily = a.avg_daily_visits ?? 0;
                const uniquePatients = a.unique_patients ?? t.unique_patients ?? 0;
                const elderly = t.elderly ?? 0;
                const male = t.male ?? 0;
                const female = t.female ?? 0;
                const elderlyPct = total > 0 ? Math.round((elderly / total) * 100) : 0;

                const utilizationRate = avgDaily > 0 ? Math.min(100, Math.round((avgDaily / 50) * 100)) : 0;

                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #7c3aed, #6d28d9)', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                                🧠 AI Intelligence Module — แพทย์แผนไทย
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(124,58,237,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                Rule-based + Real-time
                            </span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <AIInsightCard
                                title="TPI Score Analysis"
                                icon="🌿"
                                priority={tpi >= 80 ? 'LOW' : tpi >= 60 ? 'MEDIUM' : 'HIGH'}
                                summary={`TPI (Thai Medicine Performance Index) อยู่ที่ ${tpi}/100 — ${tpi >= 80 ? 'ระดับดีเยี่ยม ให้บริการมีประสิทธิภาพสูง' : tpi >= 60 ? 'ระดับมาตรฐาน ยังมีโอกาสปรับปรุง' : 'ต่ำกว่ามาตรฐาน ต้องเร่งแก้ไข'}`}
                                analysis={`Wait ${avgWait}min · Completion ${completionRate}% · Rev/Visit ฿${avgRevenue.toLocaleString()} · Avg ${avgDaily} visits/day · ${uniquePatients} unique patients (30d)`}
                                recommendation={tpi >= 80 ? 'รักษามาตรฐาน TPI ≥80 · พิจารณาขยาย Service Line ที่มี Margin สูง (ประคบ+อบ Package)' : 'เร่งปรับปรุง Wait Time + Completion Rate เพื่อยกระดับ TPI · จัดทำ Appointment system ลด Walk-in'}
                                confidence={92}
                                lastUpdated="Real-time"
                                gradient="#10b981"
                                gradientFrom="rgba(16,185,129,.08)"
                                gradientTo="rgba(5,150,105,.03)"
                                borderColor="rgba(16,185,129,.25)"
                            />
                            <AIInsightCard
                                title="Utilization & Capacity"
                                icon="⚙️"
                                priority={utilizationRate > 85 ? 'HIGH' : utilizationRate > 60 ? 'MEDIUM' : 'LOW'}
                                summary={`Utilization Rate ≈ ${utilizationRate}% — ${utilizationRate > 85 ? 'กำลังเต็มพิกัด ต้องเพิ่ม Capacity' : utilizationRate > 60 ? 'ใช้งานระดับปานกลาง ยังมีช่องว่าง' : 'ยังรับผู้ป่วยได้อีกมาก'} · เฉลี่ย ${avgDaily} ราย/วัน`}
                                analysis={`Wait ${avgWait}min · ${waiting} รอตอนนี้ · Peak: ${aiIntelligence.forecast.nextPeak} · Staffing: ${aiIntelligence.staffing.status} · Forecast intensity: ${aiIntelligence.forecast.intensity}`}
                                recommendation={utilizationRate > 85 ? 'เพิ่ม Therapist ช่วง Peak + ขยายเวลาให้บริการ · พิจารณาเปิด Extended hours 1 วัน/สัปดาห์' : 'เพิ่มผู้ป่วยผ่าน Cross-referral จากกายภาพบำบัด/ออร์โธ · โปรโมท Wellness packages'}
                                confidence={88}
                                lastUpdated="Real-time"
                                gradient="#0ea5e9"
                                gradientFrom="rgba(14,165,233,.08)"
                                gradientTo="rgba(2,132,199,.03)"
                                borderColor="rgba(14,165,233,.25)"
                            />
                            <AIInsightCard
                                title="Patient Demographics Intelligence"
                                icon="👥"
                                priority={elderlyPct > 50 ? 'MEDIUM' : 'LOW'}
                                summary={`วันนี้ ${total} ราย: ชาย ${male} หญิง ${female} · ผู้สูงอายุ ${elderly} ราย (${elderlyPct}%) · Unique ${uniquePatients} (30d)`}
                                analysis={`${elderlyPct > 40 ? 'ผู้สูงอายุสัดส่วนสูง — ควรเตรียม Accessibility/Wheelchair' : 'สัดส่วนผู้สูงอายุปกติ'} · Gender ratio ${male > 0 && female > 0 ? (male / female).toFixed(1) : '—'} M:F · Chronic care group มีโอกาสสูงที่จะเป็น Repeat visitors`}
                                recommendation={elderlyPct > 40 ? 'จัดบริการ Elderly-friendly: (1) ลดเวลารอ Priority Queue (2) Home visit program (3) ยาสมุนไพรพร้อมจัดส่ง (4) นวดผู้สูงอายุ Gentle technique' : 'ขยายฐานลูกค้า Working-age ด้วย Corporate wellness + After-work clinic · สร้าง LINE CRM สำหรับนัดหมาย'}
                                confidence={85}
                                lastUpdated="Real-time"
                                gradient="#8b5cf6"
                                gradientFrom="rgba(139,92,246,.08)"
                                gradientTo="rgba(109,40,217,.03)"
                                borderColor="rgba(139,92,246,.25)"
                            />
                            <AIInsightCard
                                title="Revenue Intelligence"
                                icon="💰"
                                priority={avgRevenue < 300 ? 'HIGH' : avgRevenue < 500 ? 'MEDIUM' : 'LOW'}
                                summary={`Rev/Visit ฿${avgRevenue.toLocaleString()} · รายได้รวม 30d ฿${((totalRevenue || 0) / 1000).toFixed(0)}k — ${avgRevenue < 300 ? 'ต่ำกว่าเกณฑ์ ตรวจสอบ Billing' : avgRevenue >= 500 ? 'สูงกว่าเกณฑ์ ดีเยี่ยม' : 'อยู่ในเกณฑ์มาตรฐาน'}`}
                                analysis={`Avg Rev/Visit ฿${avgRevenue.toLocaleString()} · Daily ≈ ฿${((totalRevenue || 0) / 30 / 1000).toFixed(1)}k · ${avgRevenue < 300 ? 'อาจมี Missing charges สมุนไพร/น้ำมัน/วัสดุ' : 'Revenue per visit สอดคล้องกับ Service mix'}`}
                                recommendation={avgRevenue < 300 ? 'Audit billing ทุก visit — ตรวจสอบ Material charges (สมุนไพร/น้ำมัน) · จัดทำ Package: นวด+ประคบ+อบ+ยาหม้อ' : 'พัฒนา Premium wellness packages · VIP Membership program · Corporate tie-ups'}
                                confidence={86}
                                lastUpdated="30d avg"
                                gradient="#f59e0b"
                                gradientFrom="rgba(245,158,11,.08)"
                                gradientTo="rgba(217,119,6,.03)"
                                borderColor="rgba(245,158,11,.25)"
                            />
                        </div>
                    </>
                );
            })()}

            {/* ━━━ Top Diagnoses (Today) ━━━ */}
            {!loading.ttmToday && ttmToday?.top_diagnoses && ttmToday.top_diagnoses.length > 0 && (
                <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                        <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '99px' }} />
                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                            🏷️ Top Diagnoses วันนี้ — แพทย์แผนไทย
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                            Real-time · HOSxP XE
                        </span>
                    </div>
                    <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                            {(ttmToday.top_diagnoses || []).slice(0, 10).map((d, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 8px', borderRadius: '8px', background: i === 0 ? 'rgba(16,185,129,.06)' : i < 3 ? 'rgba(16,185,129,.02)' : 'transparent' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: i < 3 ? '#10b981' : '#94a3b8', width: '18px', textAlign: 'center', flexShrink: 0 }}>{i + 1}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', fontFamily: 'JetBrains Mono, monospace', width: '52px', flexShrink: 0 }}>{d.icd10 || d.code || '—'}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name || d.diagnosis || '—'}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', flexShrink: 0 }}>{d.count ?? d.visits ?? 0}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* ━━━ Hero KPI Strip — Professional Design ━━━ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '12px' }}>

                {/* ── ผู้ป่วยวันนี้ (Hero Card) ── */}
                <div style={{
                    gridColumn: 'span 2', padding: '1.25rem 1.5rem', borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(16,185,129,.12) 0%, rgba(5,150,105,.06) 100%)',
                    border: '1px solid rgba(16,185,129,.2)',
                    backdropFilter: 'blur(12px)',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {loading.ttmToday ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                            <div className="skeleton" style={{ height: '40px', width: '120px' }} />
                            <div className="skeleton" style={{ height: '8px', width: '100%', borderRadius: '99px' }} />
                        </div>
                    ) : (() => {
                        const total = today.total ?? 0;
                        const completed = today.completed ?? 0;
                        const waiting = isPastServiceTime ? 0 : (today.waiting ?? 0);
                        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#10b981', margin: 0 }}>
                                        🌿 แพทย์แผนไทยวันนี้
                                    </p>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                            เวลาให้บริการ 07.00-{String(TTM_CLOSE_HOUR).padStart(2,'0')}.{String(TTM_CLOSE_MIN).padStart(2,'0')} น.
                                        </span>
                                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                                            Real-time
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '42px', fontWeight: 900, color: '#10b981', letterSpacing: '-0.04em', lineHeight: 1, textShadow: '0 0 40px rgba(16,185,129,.3)' }}>
                                        {total.toLocaleString('th-TH')}
                                    </span>
                                    <span style={{ fontSize: '14px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>ราย</span>
                                    {today.today_vs_yesterday_pct !== undefined && today.today_vs_yesterday_pct !== 0 && (
                                        <span style={{
                                            fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                            background: today.today_vs_yesterday_pct > 0 ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)',
                                            color: today.today_vs_yesterday_pct > 0 ? '#10b981' : '#ef4444',
                                        }}>
                                            {today.today_vs_yesterday_pct > 0 ? '▲' : '▼'} {Math.abs(today.today_vs_yesterday_pct)}% vs เมื่อวาน
                                        </span>
                                    )}
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                        background: 'rgba(16,185,129,.1)', color: '#10b981',
                                    }}>
                                        ✅ {completed.toLocaleString('th-TH')} เสร็จ ({pct}%)
                                    </span>
                                    {waiting > 0 && (
                                        <span style={{
                                            fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px',
                                            background: 'rgba(245,158,11,.1)', color: '#f59e0b',
                                        }}>
                                            ⏳ {waiting} รอ
                                        </span>
                                    )}
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>
                                        ♂️{today.male || 0} ♀️{today.female || 0}
                                    </span>
                                </div>

                                {/* Completion bar */}
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>✅ เสร็จสิ้น {completed.toLocaleString('th-TH')} ({pct}%)</span>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>รอรักษาสะสม {waiting.toLocaleString('th-TH')} คน</span>
                                    </div>
                                    <div style={{ height: '6px', borderRadius: '99px', overflow: 'hidden', background: 'rgba(245,158,11,.12)', display: 'flex' }}>
                                        <div style={{ width: `${Math.min(100, pct)}%`, background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: '99px 0 0 99px', transition: 'width 0.8s ease' }} />
                                        <div style={{ flex: 1, background: 'rgba(245,158,11,.2)', borderRadius: '0 99px 99px 0' }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* AI Load Predictor & Staffing Alert */}
                <div style={{
                    padding: '1rem 1.25rem', borderRadius: '14px',
                    background: `linear-gradient(135deg, ${aiIntelligence.staffing.color}15 0%, transparent 100%)`,
                    border: `1.5px solid ${aiIntelligence.staffing.color}30`,
                    display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: aiIntelligence.staffing.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            🤖 AI Load Predictor
                        </span>
                        <div className="pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: aiIntelligence.staffing.color }} />
                    </div>
                    <div>
                        <p style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--md-text-primary)', letterSpacing: '-0.02em' }}>
                            {aiIntelligence.staffing.status}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: '11px', color: aiIntelligence.staffing.color, fontWeight: 700, lineHeight: 1.4 }}>
                            {aiIntelligence.staffing.recommendation}
                        </p>
                    </div>
                    <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Next Peak: {aiIntelligence.forecast.nextPeak}</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: aiIntelligence.staffing.color }}>Intensity: {aiIntelligence.forecast.intensity}</span>
                    </div>
                </div>

                {/* ── Mini KPI Cards ── */}
                {[
                    {
                        title: 'Unique Patients', value: today.unique_patients ?? 0, icon: '👥', unit: 'คน',
                        grad: ['#0ea5e9', '#0284c7'], glow: 'rgba(14,165,233,.2)',
                        loading: loading.ttmToday,
                    },
                    {
                        title: 'สำเร็จวันนี้',
                        value: (today.total ?? 0) > 0 ? `${Math.round((today.completed ?? 0) / today.total * 100)}%` : '—',
                        icon: '✅', unit: '',
                        grad: (today.total > 0 && (today.completed / today.total) >= 0.8) ? ['#10b981', '#059669'] : ['#f59e0b', '#d97706'],
                        glow: 'rgba(16,185,129,.2)',
                        loading: loading.ttmToday,
                    },
                    {
                        title: 'ชาย/หญิง', value: `${today.male || 0}/${today.female || 0}`, icon: '👤', unit: '',
                        grad: ['#8b5cf6', '#7c3aed'], glow: 'rgba(139,92,246,.2)',
                        loading: loading.ttmToday,
                    },
                    {
                        title: 'ผู้สูงอายุ', value: today.elderly ?? 0, icon: '👴', unit: 'ราย',
                        grad: (today.elderly ?? 0) > 10 ? ['#f59e0b', '#d97706'] : ['#0ea5e9', '#0284c7'],
                        glow: 'rgba(14,165,233,.2)',
                        loading: loading.ttmToday,
                    },
                ].map((kpi, i) => (
                    <div key={`ttm-kpi-${i}`} style={{
                        padding: '1rem 1.25rem', borderRadius: '14px',
                        background: `linear-gradient(135deg, ${kpi.grad[0]}10 0%, ${kpi.grad[1]}05 100%)`,
                        border: `1px solid ${kpi.grad[0]}25`,
                        position: 'relative', overflow: 'hidden',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 25px ${kpi.glow}`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        {kpi.loading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <div className="skeleton" style={{ height: '10px', width: '60px' }} />
                                <div className="skeleton" style={{ height: '28px', width: '50px' }} />
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--md-text-tertiary)' }}>
                                        {kpi.title}
                                    </span>
                                    <span style={{ fontSize: '18px' }}>{kpi.icon}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                    <span style={{ fontSize: '28px', fontWeight: 900, color: kpi.grad[0], letterSpacing: '-0.03em', lineHeight: 1 }}>
                                        {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                                    </span>
                                    {kpi.unit && <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)' }}>{kpi.unit}</span>}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* ━━━━━ TPI + Advanced Thai Medicine Analytics Panel ━━━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🌿 Advanced Analytics — Thai Medicine
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>30d · HOSxP XE</span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.ttmAnalytics ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '1.5rem' }}>
                        <div className="skeleton" style={{ height: '200px', width: '200px', borderRadius: '50%' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton" style={{ height: '56px', borderRadius: '10px' }} />)}
                        </div>
                    </div>
                ) : (() => {
                    const a = ttmAnalytics || {};
                    const tpi = a.tpi ?? 0;
                    const tpiColor = tpi >= 80 ? '#10b981' : tpi >= 60 ? '#f59e0b' : '#f43f5e';
                    const tpiGrade = tpi >= 90 ? 'A+' : tpi >= 80 ? 'A' : tpi >= 70 ? 'B+' : tpi >= 60 ? 'B' : tpi >= 50 ? 'C' : 'D';
                    const r = 72;
                    const circumference = Math.PI * r;
                    const dashLen = Math.min(tpi / 100, 1) * circumference;

                    const tpiComp = a.tpi_components || {};
                    const tpiRadar = [
                        { name: 'Wait Time', score: tpiComp.wait_time || 0 },
                        { name: 'Completion', score: tpiComp.completion || 0 },
                        { name: 'Revisit', score: tpiComp.revisit || 0 },
                        { name: 'Revenue', score: tpiComp.revenue || 0 },
                        { name: 'SLA', score: tpiComp.sla || 0 },
                    ];

                    // ━━━ Tier 1: Wait Time & Flow ━━━
                    const tier1Cards = [
                        {
                            icon: '⏱️', label: 'เวลารอเฉลี่ย',
                            value: `${a.avg_wait_time ?? 0} min`,
                            sub: `σ ${a.sd_wait_time ?? 0}min · SLA ≤30min: ${a.wait_sla_pct ?? 0}%`,
                            desc: 'เวลารอก่อนพบแพทย์แผนไทย (30 วัน)',
                            color: (a.avg_wait_time ?? 30) <= 15 ? '#10b981' : (a.avg_wait_time ?? 30) <= 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.avg_wait_time ?? 30) <= 15
                                ? `รอเฉลี่ย ${a.avg_wait_time ?? 0} min — ดีเยี่ยม (≤15min) ผู้ป่วยได้รับบริการรวดเร็ว SLA ${a.wait_sla_pct ?? 0}%`
                                : (a.avg_wait_time ?? 30) <= 30
                                    ? `รอเฉลี่ย ${a.avg_wait_time ?? 0} min (σ ${a.sd_wait_time ?? 0}) — ยังอยู่ในเกณฑ์ แต่ควรลด มี ${a.wait_over_30m ?? 0} ครั้งที่รอ >30min ผู้ป่วยแผนไทยต้องการ Relax → รอนาน = ไม่ผ่อนคลาย`
                                    : `🚨 รอเฉลี่ย ${a.avg_wait_time ?? 0} min — สูง! ${a.wait_over_30m ?? 0} ครั้ง >30min ผู้ป่วยอาจ dropout หรือเลือกไปนวดข้างนอก`,
                            recommend: (a.avg_wait_time ?? 30) <= 15
                                ? '✅ คงมาตรฐาน — Appointment system ทำงานดี'
                                : '📋 ลดเวลารอ: (1) Appointment-based scheduling (2) เพิ่ม Unit ช่วง Peak (3) Pre-screening ก่อนถึงคิว (4) SMS แจ้งคิว real-time (5) เป้าหมาย: ≤15 min',
                        },
                        {
                            icon: '🕐', label: 'เวลารวม (Visit)',
                            value: `${a.avg_total_time ?? 0} min`,
                            sub: `σ ${a.sd_total_time ?? 0}min · Total SLA ≤60min: ${a.total_sla_pct ?? 0}%`,
                            desc: 'เวลาเฉลี่ยทั้งกระบวนการ ลงทะเบียน→นวด/ประคบ→ชำระเงิน',
                            color: (a.avg_total_time ?? 60) <= 45 ? '#10b981' : (a.avg_total_time ?? 60) <= 60 ? '#f59e0b' : '#f43f5e',
                            problem: `เวลารวม ${a.avg_total_time ?? 0} min (σ ${a.sd_total_time ?? 0}) — ${(a.avg_total_time ?? 60) <= 45 ? 'ดี Flow ลื่นไหล' : (a.avg_total_time ?? 60) <= 60 ? 'ปานกลาง ควรลด bottleneck' : '⚠️ สูง! ผู้ป่วยใช้เวลาทั้งหมดนานเกินไป ตรวจสอบ bottleneck'}`,
                            recommend: '📋 ลดเวลารวม: (1) Pre-register online (2) Digital payment ลดรอชำระเงิน (3) Chair-side billing (4) Lean flow: ลด Non-value steps',
                        },
                        {
                            icon: '📊', label: 'Avg Daily Visits',
                            value: `${a.avg_daily_visits ?? 0}`,
                            sub: `${(a.total_visits ?? 0).toLocaleString()} ราย / 30 วัน · ${a.unique_patients ?? 0} patients`,
                            desc: 'จำนวนผู้ป่วยเฉลี่ยต่อวัน',
                            color: '#0ea5e9',
                            problem: `เฉลี่ย ${a.avg_daily_visits ?? 0} ราย/วัน (รวม ${(a.total_visits ?? 0).toLocaleString()} ราย) · Unique patients ${a.unique_patients ?? 0} — ${(a.avg_daily_visits ?? 0) > 50 ? '⚠️ Volume สูง ตรวจสอบ Capacity' : 'Volume ปกติ'}`,
                            recommend: '📋 Capacity: (1) วิเคราะห์ห้อง/เตียง utilization rate (2) เพิ่ม Therapist ถ้า Utilization >85% (3) Extended hours สำหรับ Peak days',
                        },
                        {
                            icon: '⏰', label: 'Wait >30 min',
                            value: `${a.wait_over_30m ?? 0}`,
                            sub: `จาก 30 วัน`,
                            desc: 'จำนวนครั้งที่รอนานเกิน 30 นาที',
                            color: (a.wait_over_30m ?? 0) < 10 ? '#10b981' : (a.wait_over_30m ?? 0) < 30 ? '#f59e0b' : '#f43f5e',
                            problem: (a.wait_over_30m ?? 0) < 10
                                ? `Wait >30min เพียง ${a.wait_over_30m ?? 0} ครั้ง — Flow ดี ไม่มีปัญหาคอขวด`
                                : `Wait >30min ${a.wait_over_30m ?? 0} ครั้ง — ${(a.wait_over_30m ?? 0) >= 30 ? '🚨 บ่อยเกินไป! ผู้ป่วยรอนานเป็นประจำ' : 'ต้องเฝ้าระวัง อาจเกิดช่วง Peak'}`,
                            recommend: (a.wait_over_30m ?? 0) < 10
                                ? '✅ ดี — RCA ทุกครั้งที่เกิด wait >30min'
                                : '📋 ลด Long wait: (1) Buffer time ระหว่าง appointment (2) เพิ่ม Therapist ช่วง Peak (3) Parallel processing: เตรียมสมุนไพร/น้ำมัน ล่วงหน้า',
                        },
                    ];

                    // ━━━ Tier 2: Quality ━━━
                    const tier2Cards = [
                        {
                            icon: '✅', label: 'Completion Rate',
                            value: `${a.completion_rate ?? 0}%`,
                            sub: `Dropout ${a.dropout_count ?? 0} ราย`,
                            desc: '% ผู้ป่วยที่รักษาเสร็จสิ้น',
                            color: (a.completion_rate ?? 0) >= 95 ? '#10b981' : (a.completion_rate ?? 0) >= 85 ? '#f59e0b' : '#f43f5e',
                            problem: (a.completion_rate ?? 0) >= 95
                                ? `Completion ${a.completion_rate ?? 0}% — ดีเยี่ยม Dropout เพียง ${a.dropout_count ?? 0} ราย`
                                : `Completion ${a.completion_rate ?? 0}% — Dropout ${a.dropout_count ?? 0} ราย ${(a.completion_rate ?? 0) < 85 ? '⚠️ สูง! ตรวจสอบสาเหตุ: รอนาน? กลัว? ค่าใช้จ่าย?' : 'ควรสอบถามสาเหตุ'}`,
                            recommend: '📋 ลด Dropout: (1) SMS เตือนก่อนนัด 1 วัน (2) ลด Wait time (3) ให้ข้อมูลค่าใช้จ่ายล่วงหน้า (4) เป้าหมาย: ≥95%',
                        },
                        {
                            icon: '🔄', label: 'Revisit 7 วัน',
                            value: `${a.revisit_rate ?? 0}%`,
                            sub: `${a.revisit_count ?? 0} ราย กลับมาภายใน 7 วัน`,
                            desc: '% ผู้ป่วยที่กลับมาอีกในสัปดาห์เดียวกัน',
                            color: (a.revisit_rate ?? 0) < 5 ? '#10b981' : (a.revisit_rate ?? 0) < 15 ? '#f59e0b' : '#f43f5e',
                            problem: (a.revisit_rate ?? 0) < 5
                                ? `Revisit ${a.revisit_rate ?? 0}% — ต่ำ สะท้อน Treatment quality ดี`
                                : `Revisit ${a.revisit_rate ?? 0}% (${a.revisit_count ?? 0} ราย) — ${(a.revisit_rate ?? 0) >= 15 ? '⚠️ สูง! อาจมี Complication หรือ Treatment plan ต้องหลาย visit' : 'ปานกลาง อาจเป็น Planned multi-visit cases'}`,
                            recommend: '📋 Review: (1) แยก Planned revisit vs Unplanned (2) Audit unplanned — Complication? Undertreated? (3) Treatment plan ที่ดียิ่งขึ้น',
                        },
                    ];

                    // ━━━ Tier 3: Financial ━━━
                    const tier3Cards = [
                        {
                            icon: '💰', label: 'รายได้ / Visit',
                            value: `฿${(a.avg_revenue_per_visit ?? 0).toLocaleString()}`,
                            sub: `Max ฿${(a.max_revenue ?? 0).toLocaleString()} · Daily ฿${(a.daily_revenue ?? 0).toLocaleString()}`,
                            desc: 'รายได้เฉลี่ยต่อ 1 visit แพทย์แผนไทย',
                            color: '#0ea5e9',
                            problem: `Avg Rev/Visit ฿${(a.avg_revenue_per_visit ?? 0).toLocaleString()} — ${(a.avg_revenue_per_visit ?? 0) < 300 ? '⚠️ ต่ำ อาจมี Under-billing หรือส่วนใหญ่เป็น นวด/ประคบ Basic' : 'สอดคล้องกับ Service mix'}`,
                            recommend: '📋 Optimize: (1) ตรวจสอบ Procedure billing ครบถ้วน (2) เพิ่ม Wellness packages (นวด+ประคบ+อบสมุนไพร) (3) ลด Free visit %',
                        },
                        {
                            icon: '💵', label: 'รายได้รวม (30d)',
                            value: `฿${((a.total_revenue ?? 0) / 1000).toFixed(0)}k`,
                            sub: `${(a.total_visits ?? 0).toLocaleString()} visits`,
                            desc: 'รายได้รวมแพทย์แผนไทย 30 วัน',
                            color: '#10b981',
                            problem: `Revenue ฿${((a.total_revenue ?? 0) / 1000).toFixed(0)}k / 30 วัน จาก ${(a.total_visits ?? 0).toLocaleString()} visits`,
                            recommend: '📋 เพิ่มรายได้: (1) Wellness packages (นวด+ประคบ+อบ+ยาสมุนไพร) (2) Corporate wellness program (3) Referral จาก Rehab/Ortho',
                        },
                    ];

                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* DPI Gauge + Component Breakdown */}
                            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                    <svg width="180" height="100" viewBox="0 0 180 105" style={{ overflow: 'visible' }}>
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke="rgba(203,213,225,.5)" strokeWidth="14" strokeLinecap="round" />
                                        <path d={`M 18,90 A ${r},${r} 0 0,1 162,90`} fill="none" stroke={tpiColor} strokeWidth="14" strokeLinecap="round"
                                            strokeDasharray={`${dashLen} ${circumference}`} style={{ transition: 'stroke-dasharray 1s ease' }} />
                                        <text x="90" y="78" textAnchor="middle" fontSize="32" fontWeight="900" fill={tpiColor} fontFamily="'Outfit',sans-serif">{tpi}</text>
                                        <text x="90" y="96" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6b7280" fontFamily="sans-serif">SQI / TPI Score</text>
                                    </svg>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '26px', fontWeight: 900, color: tpiColor }}>{tpiGrade}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: tpiColor }}>
                                            {tpi >= 80 ? 'ประสิทธิภาพสูง (Optimal)' : tpi >= 60 ? 'ระดับมาตรฐาน (Fair)' : 'ต้องปรับปรุง (Critical)'}
                                        </div>
                                        <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', marginTop: '2px' }}>Service Quality Index (AI Composite)</div>
                                    </div>
                                    <div style={{ width: '100%', marginTop: '6px' }}>
                                        <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px', textAlign: 'center' }}>AI Component Breakdown</p>
                                        {(Object.entries(a.sqi_components || {})).map(([key, c], i) => {
                                            const barColor = c.score >= 70 ? '#10b981' : c.score >= 40 ? '#f59e0b' : '#f43f5e';
                                            const labelMap = {
                                                sla_compliance: 'SLA Pass',
                                                process_completion: 'Completion',
                                                wait_stability: 'Stability',
                                                service_yield: 'Yield'
                                            };
                                            return (
                                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', width: '64px', textAlign: 'right', flexShrink: 0 }}>{labelMap[key] || key}</span>
                                                    <div style={{ flex: 1, height: '6px', background: 'rgba(203,213,225,.2)', borderRadius: '99px', overflow: 'hidden' }}>
                                                        <div style={{ width: `${c.score}%`, height: '100%', background: barColor, borderRadius: '99px', transition: 'width 0.8s ease' }} />
                                                    </div>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: barColor, width: '24px', textAlign: 'right' }}>{c.score}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tiered KPI Cards */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { title: 'Wait Time & Flow', color: '#f43f5e', cards: tier1Cards },
                                        { title: 'Quality & Outcomes', color: '#0ea5e9', cards: tier2Cards },
                                        { title: 'Financial Intelligence', color: '#f59e0b', cards: tier3Cards },
                                    ].map((tier, ti) => (
                                        <div key={ti}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '3px', height: '14px', background: `linear-gradient(180deg, ${tier.color}, ${tier.color}99)`, borderRadius: '99px' }} />
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: tier.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{tier.title}</span>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                                                {tier.cards.map((k, i) => (
                                                    <div key={i} style={{ padding: '8px 10px', borderRadius: '10px', background: `${k.color}06`, border: `1px solid ${k.color}20` }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <span style={{ fontSize: '18px', flexShrink: 0 }}>{k.icon}</span>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</p>
                                                                <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--md-text-tertiary)', fontStyle: 'italic', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.desc}</p>
                                                            </div>
                                                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                                                <p style={{ margin: 0, fontSize: 'var(--fs-lg)', fontWeight: 900, color: k.color, letterSpacing: '-0.02em' }}>{k.value}</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>{k.sub}</p>
                                                            </div>
                                                        </div>
                                                        {k.problem && (
                                                            <div style={{ marginTop: '6px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(203,213,225,.04)', borderLeft: `3px solid ${k.color}` }}>
                                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: k.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>📊 วิเคราะห์สถานการณ์</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.problem}</p>
                                                            </div>
                                                        )}
                                                        {k.recommend && (
                                                            <div style={{ marginTop: '4px', padding: '5px 10px', borderRadius: '6px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                                <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>💡 แนะนำเชิงนโยบาย</p>
                                                                <p style={{ margin: 0, fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.5, fontWeight: 500 }}>{k.recommend}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Charts Row */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px solid var(--md-border)', paddingTop: '1rem' }}>
                                {/* Hourly Pattern */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>🕐 Load vs Prediction (Today)</p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <ComposedChart data={aiIntelligence.hourlyChart} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 8, fontWeight: 700 }} axisLine={false} tickLine={false}
                                                tickFormatter={l => l.replace(':00', '')} />
                                            <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={20} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }} />
                                            <Bar dataKey="count" fill="#10b981" radius={[3, 3, 0, 0]} barSize={8} name="Actual Load" />
                                            <Line type="monotone" dataKey="prediction" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" name="AI Prediction" />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Age Distribution */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>👥 Age Distribution (30 วัน)</p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <BarChart data={a.age_distribution || []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="group" tick={{ fill: '#6b7280', fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={24} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v) => [`${v} ราย`, 'จำนวน']} />
                                            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={18}>
                                                {(a.age_distribution || []).map((_, i) => {
                                                    const colors = ['#f43f5e', '#f59e0b', '#eab308', '#10b981', '#0ea5e9', '#8b5cf6'];
                                                    return <Cell key={i} fill={colors[i] || '#7c3aed'} />;
                                                })}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Monthly Trend */}
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>📈 Monthly Trend (6 เดือน)</p>
                                    <ResponsiveContainer width="100%" height={130}>
                                        <ComposedChart data={a.monthly_trend || []} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                            <YAxis yAxisId="left" tick={{ fill: '#9ca3af', fontSize: 10 }} axisLine={false} tickLine={false} width={28} />
                                            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#10b981', fontSize: 9 }} axisLine={false} tickLine={false} width={28}
                                                tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                                            <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '10px', fontSize: '11px' }}
                                                formatter={(v, n) => {
                                                    if (n === 'visits') return [`${v} ราย`, 'จำนวน'];
                                                    if (n === 'total_rev') return [`฿${v.toLocaleString()}`, 'รายได้'];
                                                    return [`${v}`, n];
                                                }} />
                                            <Bar yAxisId="left" dataKey="visits" fill="rgba(16,185,129,.3)" radius={[4, 4, 0, 0]} barSize={14} />
                                            <Line yAxisId="right" type="monotone" dataKey="total_rev" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Top Diagnoses */}
                            <div style={{ borderTop: '1px solid var(--md-border)', paddingTop: '1rem' }}>
                                <p style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>🏷️ Top Diagnoses (30 วัน)</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                                    {(a.top_diagnoses || []).slice(0, 8).map((d, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', borderRadius: '8px', background: i === 0 ? 'rgba(16,185,129,.06)' : 'transparent' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', width: '16px', textAlign: 'center' }}>{i + 1}</span>
                                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-tertiary)', fontFamily: 'JetBrains Mono, monospace', width: '48px', flexShrink: 0 }}>{d.icd10}</span>
                                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--md-text-secondary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
                                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981', flexShrink: 0 }}>{d.count}</span>
                                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', flexShrink: 0 }}>฿{d.avg_rev?.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* ━━━━━━ 🔥 Deep Root-Cause Analysis Panel — Thai Medicine ━━━━━━ */}
            {!loading.ttmAnalytics && ttmAnalytics && (() => {
                const a = ttmAnalytics || {};

                const tpi = a.tpi ?? 0;
                const avgWait = a.avg_wait_time ?? 0;
                const sdWait = a.sd_wait_time ?? 0;
                const avgTotal = a.avg_total_time ?? 0;
                const waitOver30m = a.wait_over_30m ?? 0;
                const waitSlaPct = a.wait_sla_pct ?? 0;
                const completionRate = a.completion_rate ?? 0;
                const dropoutCount = a.dropout_count ?? 0;
                const revisitRate = a.revisit_rate ?? 0;
                const avgDaily = a.avg_daily_visits ?? 0;
                const totalVisits = a.total_visits ?? 0;
                const avgRevenue = a.avg_revenue_per_visit ?? 0;
                const totalRevenue = a.total_revenue ?? 0;
                const peakHour = a.peak_hour?.label || '—';

                const problems = [];

                if (avgWait > 20) {
                    problems.push({
                        priority: 1, severity: avgWait > 30 ? 'critical' : 'warning',
                        title: `🔴 เวลารอสูง: ${avgWait} min (σ ${sdWait}) — SLA ≤30min ผ่านเพียง ${waitSlaPct}% · ${waitOver30m} ครั้ง >30min`,
                        rootCause: `ผู้ป่วยแพทย์แผนไทยรอเฉลี่ย ${avgWait} นาที (σ ${sdWait}) ── สาเหตุ: (1) Appointment over-booking — นัดเกินกว่าห้อง/เตียงจะรองรับ (2) Session time ไม่แน่นอน — นวด/ประคบ/อบสมุนไพร ใช้เวลาต่างกัน (3) Walk-in ไม่มีนัดมาซ้อน slot (4) Peak hour ${peakHour} — ผู้ป่วยกระจุกตัว (5) Therapist ไม่เพียงพอช่วง Peak`,
                        cascadeEffect: `Wait สูง → ผู้ป่วย Dropout (ปัจจุบัน ${dropoutCount} ราย) → Revenue loss → คนไข้เลือกไปนวดข้างนอก → Volume ลดลง ● Wait สูง → ผู้ป่วยไม่ Relax → ผล Treatment ลดลง → Revisit เพิ่ม ● TPI ลดลง (${tpi}/100)`,
                        fixFirst: `🔧 ด่วนที่สุด: (1) Appointment-based scheduling — จำกัด Walk-in (2) Buffer time ระหว่าง Session (3) เพิ่ม Therapist ช่วง Peak ${peakHour} (4) เตรียมสมุนไพร/น้ำมันล่วงหน้า (5) SMS คิว real-time (6) เป้าหมาย: ≤15 min ภายใน 30 วัน`,
                        color: avgWait > 30 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (completionRate < 90) {
                    problems.push({
                        priority: 2, severity: completionRate < 80 ? 'critical' : 'warning',
                        title: `🟡 Completion Rate ต่ำ: ${completionRate}% — Dropout ${dropoutCount} ราย`,
                        rootCause: `${completionRate}% เท่านั้นที่รักษาเสร็จ — ${dropoutCount} ราย Dropout ── สาเหตุ: (1) Wait time นาน → ผู้ป่วยเลือกออก (2) Session ยาว → ผู้ป่วยไม่มีเวลา (3) ค่าใช้จ่ายสูงกว่าคาด (4) เวลาจำกัด — มาตอนเช้า แต่คิวถึงบ่าย`,
                        cascadeEffect: `Dropout สูง → Revenue loss ฿${(dropoutCount * avgRevenue).toLocaleString()} → Therapist มี idle time → ห้องว่าง ● ผู้ป่วยที่ Dropout → อาการไม่ดีขึ้น → กลับมาใช้บริการแพงกว่า`,
                        fixFirst: `🔧 ลด Dropout: (1) แจ้ง Wait time estimate ทุกราย (2) ให้ข้อมูลค่าใช้จ่ายล่วงหน้า (3) Express treatment option (30 min) (4) Flexible scheduling — นัดรอบบ่าย/เย็น (5) เป้าหมาย: Completion ≥95%`,
                        color: completionRate < 80 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (revisitRate > 10) {
                    problems.push({
                        priority: 3, severity: revisitRate > 20 ? 'critical' : 'warning',
                        title: `🟡 Revisit 7d สูง: ${revisitRate}% — Treatment Quality Concern`,
                        rootCause: `${revisitRate}% กลับมาภายใน 7 วัน — ต้องแยก Planned (นวดต่อเนื่อง, แผนรักษา) vs Unplanned (อาการไม่ดีขึ้น, แพ้สมุนไพร)`,
                        cascadeEffect: `Unplanned revisit → เพิ่ม Workload Therapist → Wait time เพิ่ม → Satisfaction ลดลง ● แพ้สมุนไพร → ต้อง Monitor ● ผู้ป่วยไม่เชื่อมั่น → Volume ลดลง`,
                        fixFirst: `🔧 ลด Unplanned Revisit: (1) Audit ทุก 7d revisit — แยก Planned vs ไม่ดีขึ้น (2) ทำ Allergy screening ก่อนใช้สมุนไพร (3) Post-treatment instruction ชัดเจน (4) Follow-up call 48 ชม. หลัง Treatment`,
                        color: revisitRate > 20 ? '#f43f5e' : '#f59e0b',
                    });
                }

                if (avgRevenue < 300 && totalVisits > 50) {
                    problems.push({
                        priority: 4, severity: 'warning',
                        title: `🟠 Revenue/Visit ต่ำ: ฿${avgRevenue.toLocaleString()} — อาจมี Under-billing หรือ Service mix ไม่สมดุล`,
                        rootCause: `Rev/Visit ฿${avgRevenue.toLocaleString()} ← ต่ำสำหรับแผนไทย (ควร ≥฿300) ── สาเหตุ: (1) ส่วนใหญ่เป็น Basic service (นวดเท่านั้น) ไม่มี Package (2) Under-billing — ทำแล้วไม่ charge ค่าสมุนไพร/น้ำมัน (3) สิทธิ์บัตรทอง/ประกันสังคม Rate ต่ำ (4) Missing charges จาก Material/สมุนไพร`,
                        cascadeEffect: `Low revenue → Budget แผนไทยไม่เพียงพอ → ไม่สามารถซื้อสมุนไพรคุณภาพ → Service quality ลดลง → ผู้ป่วยลดลง = วงจรลบ`,
                        fixFirst: `🔧 เพิ่ม Revenue: (1) Audit billing completeness (2) Wellness packages: นวด+ประคบ+อบสมุนไพร+ยาหม้อ (3) Corporate wellness program (4) Verify procedure coding ถูกต้อง (5) เก็บค่าสมุนไพร/วัสดุครบถ้วน`,
                        color: '#f59e0b',
                    });
                }

                if (problems.length === 0) {
                    problems.push({
                        priority: 0, severity: 'good',
                        title: '✅ แพทย์แผนไทย ทำงานได้ดี — ไม่พบปัญหาเร่งด่วน',
                        rootCause: `TPI ${tpi}/100 · Wait ${avgWait}min · Completion ${completionRate}% · Revisit ${revisitRate}% — ตัวชี้วัดอยู่ในเกณฑ์ดี`,
                        cascadeEffect: `ไม่มีผลกระทบลูกโซ่ — คลินิกแพทย์แผนไทย ทำงานได้มาตรฐาน`,
                        fixFirst: `🎯 Continuous Improvement: (1) ยกระดับ TPI ≥ ${Math.min(tpi + 10, 100)} (2) เพิ่ม Wellness services (3) Patient satisfaction survey`,
                        color: '#10b981',
                    });
                }

                problems.sort((a, b) => a.priority - b.priority);
                const critCount = problems.filter(p => p.severity === 'critical').length;
                const warnCount = problems.filter(p => p.severity === 'warning').length;
                const urgencyScore = Math.min(10, critCount * 3 + warnCount * 1.5);
                const urgencyColor = urgencyScore >= 7 ? '#f43f5e' : urgencyScore >= 4 ? '#f59e0b' : '#10b981';
                const urgencyLabel = urgencyScore >= 7 ? 'ต้องดำเนินการทันที' : urgencyScore >= 4 ? 'ควรแก้ไขเร็ว' : 'สถานการณ์ปกติ';

                return (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                            <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #f43f5e, #f59e0b)', borderRadius: '99px' }} />
                            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>🔥 Deep Root-Cause Analysis</span>
                            <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(244,63,94,.08)', padding: '2px 8px', borderRadius: '99px' }}>Cross-analysis Thai Med</span>
                        </div>
                        <div className={`glass-card ${urgencyScore >= 7 ? 'alert-critical' : urgencyScore >= 4 ? 'alert-warning' : ''}`} style={{ padding: '1.5rem', border: `1.5px solid ${urgencyColor}25` }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem', alignItems: 'center', padding: '1rem 1.25rem', borderRadius: '14px', background: `linear-gradient(135deg, ${urgencyColor}08, ${urgencyColor}03)`, border: `1px solid ${urgencyColor}20`, marginBottom: '1.25rem' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 800, color: urgencyColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ ระดับความเร่งด่วนรวม — แพทย์แผนไทย</span>
                                        <span style={{ fontSize: '11px', fontWeight: 700, color: urgencyColor, background: `${urgencyColor}15`, padding: '2px 8px', borderRadius: '999px', border: `1px solid ${urgencyColor}25` }}>{urgencyLabel}</span>
                                    </div>
                                    <span style={{ fontSize: '11px', color: 'var(--md-text-secondary)', fontWeight: 600 }}>
                                        พบ <strong style={{ color: '#f43f5e' }}>{critCount} วิกฤต</strong>
                                        {warnCount > 0 && <> + <strong style={{ color: '#f59e0b' }}>{warnCount} เตือน</strong></>}
                                        {problems[0]?.severity === 'good' && <strong style={{ color: '#10b981' }}> ไม่พบปัญหา</strong>}
                                    </span>
                                    <div style={{ marginTop: '8px', height: '6px', background: 'rgba(0,0,0,.06)', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${urgencyScore * 10}%`, background: 'linear-gradient(90deg, #10b981, #f59e0b, #f43f5e)', borderRadius: '99px', transition: 'width 1s ease' }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
                                        <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600 }}>ปกติ</span>
                                        <span style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>เตือน</span>
                                        <span style={{ fontSize: '11px', color: '#f43f5e', fontWeight: 600 }}>วิกฤต</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="urgency-score-pulse" style={{ fontSize: '36px', fontWeight: 900, color: urgencyColor, lineHeight: 1 }}>{Math.round(urgencyScore)}<span style={{ fontSize: '16px', fontWeight: 700 }}>/10</span></div>
                                    <div style={{ fontSize: '11px', fontWeight: 700, color: urgencyColor, marginTop: '2px' }}>Urgency</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {problems.map((p, i) => (
                                    <div key={i} style={{ borderRadius: '14px', border: `1.5px solid ${p.color}20`, background: `${p.color}04`, overflow: 'hidden' }}>
                                        <div style={{ padding: '10px 16px', background: `linear-gradient(90deg, ${p.color}12, transparent)`, borderBottom: `1px solid ${p.color}15`, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {p.priority > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: p.color, color: '#fff', fontSize: '11px', fontWeight: 900, flexShrink: 0 }}>{p.priority}</span>}
                                            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--md-text-primary)', lineHeight: 1.4 }}>{p.title}</span>
                                            <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 8px', borderRadius: '999px', background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}>
                                                {p.severity === 'critical' ? '🔴 CRITICAL' : p.severity === 'warning' ? '🟡 WARNING' : '🟢 GOOD'}
                                            </span>
                                        </div>
                                        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(244,63,94,.03)', borderLeft: '3px solid #f43f5e' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🔍 ปัญหาที่แท้จริง (Root Cause)</p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.rootCause}</p>
                                            </div>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(245,158,11,.03)', borderLeft: '3px solid #f59e0b' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ ผลกระทบลูกโซ่ (Cascade Effect)</p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.cascadeEffect}</p>
                                            </div>
                                            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(124,58,237,.04)', borderLeft: '3px solid #7c3aed' }}>
                                                <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🔧 แก้ไขก่อน — ด่วนที่ {p.priority > 0 ? p.priority : '—'} (Fix First)</p>
                                                <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--md-text-secondary)', lineHeight: 1.65, fontWeight: 500 }}>{p.fixFirst}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {problems.length > 1 && problems[0]?.severity !== 'good' && (
                                <div style={{ marginTop: '16px', padding: '14px 16px', borderRadius: '12px', background: 'rgba(14,165,233,.04)', border: '1px solid rgba(14,165,233,.15)' }}>
                                    <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 800, color: '#0ea5e9', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🗺️ แผนที่ความเชื่อมโยง — Thai Medicine Bottleneck Chain</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                        {[
                                            { label: `Wait ${avgWait}min`, color: '#f59e0b' },
                                            { label: `Dropout ${dropoutCount}`, color: '#f43f5e' },
                                            { label: `Completion ${completionRate}%`, color: '#0ea5e9' },
                                            { label: `Revisit ${revisitRate}%`, color: '#e11d48' },
                                            { label: `Rev ฿${avgRevenue}`, color: '#8b5cf6' },
                                            { label: `TPI = ${tpi}/100`, color: '#10b981' },
                                        ].map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i > 0 && <span style={{ color: '#94a3b8', fontSize: '14px' }}>→</span>}
                                                <span style={{ fontSize: '11px', fontWeight: 700, color: item.color, background: `${item.color}10`, padding: '4px 10px', borderRadius: '8px', border: `1px solid ${item.color}20` }}>{item.label}</span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <p style={{ margin: '10px 0 0', fontSize: '11px', color: 'var(--md-text-secondary)', lineHeight: 1.6, fontWeight: 500, fontStyle: 'italic' }}>
                                        💡 <strong>สรุป:</strong> ปัญหาแพทย์แผนไทยเริ่มจาก <strong style={{ color: '#f59e0b' }}>Wait time สูง</strong> → ผู้ป่วย Dropout → Revenue ลดลง — <strong>แก้ ด่วนที่ 1 ก่อน</strong> (ลดเวลารอด้วย Appointment system + เพิ่ม Therapist) จะปรับปรุง KPI ทุกตัวพร้อมกัน
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                );
            })()}

            {/* ━━━ รายได้โดยประมาณ แพทย์แผนไทย — ปีงบประมาณ (3 ปีย้อนหลัง) ━━━ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    💰 รายได้โดยประมาณ แพทย์แผนไทย — ปีงบประมาณ (3 ปีย้อนหลัง)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>vn_stat · HOSxP XE</span>
            </div>
            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {loading.ttmRevenueFiscal ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="skeleton" style={{ height: '80px', borderRadius: '12px' }} />
                        <div className="skeleton" style={{ height: '280px', borderRadius: '12px' }} />
                    </div>
                ) : (() => {
                    const fd = state.ttmRevenueFiscal;
                    const years = fd?.fiscal_years || [];
                    if (years.length === 0) return <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--md-text-tertiary)', textAlign: 'center', padding: '2rem 0' }}>ไม่พบข้อมูลรายได้</p>;
                    const FY_COLORS = ['#94a3b8', '#34d399', '#10b981'];
                    const MONTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];
                    const chartData = MONTH_ORDER.map((label, i) => {
                        const row = { month: label };
                        years.forEach((fy, fi) => { row[`fy${fi}`] = (fy.months[i]?.revenue || 0); });
                        return row;
                    });
                    const latestYear = years[years.length - 1];
                    const prevYear = years.length >= 2 ? years[years.length - 2] : null;
                    const compMonths = latestYear.comparable_months || 12;
                    const yoyGrowth = prevYear && (prevYear.comparable_revenue ?? prevYear.total_revenue) > 0
                        ? Math.round(((latestYear.comparable_revenue ?? latestYear.total_revenue) - (prevYear.comparable_revenue ?? prevYear.total_revenue)) / (prevYear.comparable_revenue ?? prevYear.total_revenue) * 1000) / 10 : 0;
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${years.length}, 1fr)`, gap: '10px' }}>
                                {years.map((fy, fi) => {
                                    const isLatest = fi === years.length - 1; const color = FY_COLORS[fi];
                                    return (
                                        <div key={fi} style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: isLatest ? `linear-gradient(135deg, ${color}12, ${color}05)` : `${color}06`, border: `1px solid ${color}${isLatest ? '30' : '15'}` }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                                                <span style={{ fontSize: '11px', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{fy.fiscal_label}</span>
                                                {isLatest && <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,.1)', padding: '1px 6px', borderRadius: '99px', marginLeft: 'auto' }}>ปัจจุบัน</span>}
                                            </div>
                                            <p style={{ fontSize: '22px', fontWeight: 900, color, margin: '0 0 2px', letterSpacing: '-0.02em' }}>฿{(fy.total_revenue / 1e6).toFixed(1)}M</p>
                                            <p style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', margin: 0, fontWeight: 600 }}>
                                                {fy.total_visits.toLocaleString()} visits · {fy.total_patients.toLocaleString()} patients · ฿{fy.avg_revenue_per_visit.toLocaleString()}/visit
                                            </p>
                                            {isLatest && prevYear && (
                                                <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: 800, color: yoyGrowth >= 0 ? '#10b981' : '#f43f5e' }}>{yoyGrowth >= 0 ? '📈' : '📉'} YoY {yoyGrowth >= 0 ? '+' : ''}{yoyGrowth}%</span>
                                                    <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>vs {prevYear.fiscal_label} (เทียบ {compMonths} ด.)</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <ResponsiveContainer width="100%" height={280}>
                                <BarChart data={chartData} margin={{ top: 8, right: 12, bottom: 0, left: 4 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(203,213,225,.3)" vertical={false} />
                                    <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fill: '#9ca3af', fontSize: 9 }} axisLine={false} tickLine={false} width={40}
                                        tickFormatter={v => v >= 1e6 ? `${(v / 1e6).toFixed(0)}M` : `${(v / 1e3).toFixed(0)}K`} />
                                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e8eaf2', borderRadius: '12px', fontSize: '11px', boxShadow: '0 4px 20px rgba(0,0,0,.08)' }}
                                        formatter={(v, name) => { const idx = Number(name.replace('fy', '')); return [`฿${(v / 1e6).toFixed(2)}M`, years[idx]?.fiscal_label || name]; }} />
                                    {years.map((fy, fi) => (
                                        <Bar key={fi} dataKey={`fy${fi}`} fill={FY_COLORS[fi]} radius={[3, 3, 0, 0]} barSize={years.length <= 2 ? 20 : 14} opacity={fi === years.length - 1 ? 1 : 0.5} name={`fy${fi}`} />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                {years.map((fy, fi) => (
                                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: FY_COLORS[fi], opacity: fi === years.length - 1 ? 1 : 0.5 }} />
                                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-secondary)', fontWeight: 600 }}>{fy.fiscal_label}</span>
                                        <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--md-text-tertiary)', fontWeight: 500 }}>฿{(fy.total_revenue / 1e6).toFixed(1)}M</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* ━━━━━━ TTM Procedure Breakdown ━━━━━━ */}
            <TTMProcedurePanel data={state.ttmAnalytics?.procedure_breakdown} loading={state.loading?.ttmAnalytics} />
        </div>
    );
}

// ── Thai Traditional Medicine Procedure Breakdown Panel ───────────────────
// แสดงสัดส่วนหัตถการ 4 กลุ่มหลัก: นวด / อบประคบ / ฝังเข็ม / ยาสมุนไพร
// ข้อมูลจาก ICD-10 name pattern matching ใน thaimedicine.js
const PROC_CONFIG = {
    'นวดแผนไทย':       { color: '#10b981', icon: '🤲' },
    'อบ/ประคบสมุนไพร': { color: '#f59e0b', icon: '🌿' },
    'ฝังเข็ม':          { color: '#7c3aed', icon: '🔬' },
    'ยาสมุนไพร':        { color: '#0ea5e9', icon: '🌱' },
    'อื่นๆ':            { color: '#94a3b8', icon: '📋' },
};

function TTMProcedurePanel({ data, loading }) {
    if (loading) return <div className="skeleton" style={{ height: '120px', borderRadius: '14px' }} />;
    if (!data || data.length === 0) return null;

    const total = data.reduce((s, p) => s + p.visits, 0);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #10b981, #059669)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)' }}>
                    🌿 สัดส่วนหัตถการแพทย์แผนไทย (30 วัน)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(16,185,129,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    {total.toLocaleString()} ครั้ง
                </span>
            </div>

            <div className="glass-card" style={{ padding: '1.25rem 1.5rem' }}>
                {/* Proportion bar */}
                <div style={{ display: 'flex', height: '12px', borderRadius: '99px', overflow: 'hidden', marginBottom: '16px' }}>
                    {data.map((p, i) => {
                        const cfg = PROC_CONFIG[p.type] || PROC_CONFIG['อื่นๆ'];
                        const pct = total > 0 ? (p.visits / total) * 100 : 0;
                        return pct > 0 ? (
                            <div key={i} style={{ width: `${pct}%`, background: cfg.color, transition: 'width 0.6s ease' }} title={`${p.type}: ${Math.round(pct)}%`} />
                        ) : null;
                    })}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                    {data.map((p, i) => {
                        const cfg = PROC_CONFIG[p.type] || PROC_CONFIG['อื่นๆ'];
                        const pct = total > 0 ? Math.round((p.visits / total) * 100) : 0;
                        return (
                            <div key={i} style={{ padding: '12px', borderRadius: '12px', border: `1.5px solid ${cfg.color}25`, background: `${cfg.color}06` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '16px' }}>{cfg.icon}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: cfg.color }}>{p.type}</span>
                                </div>
                                <p style={{ margin: '0 0 2px', fontSize: '20px', fontWeight: 900, color: cfg.color }}>{p.visits.toLocaleString()}</p>
                                <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 700 }}>
                                    {pct}% · {p.patients.toLocaleString()} คน
                                    {p.avg_rev > 0 && ` · ฿${p.avg_rev.toLocaleString()}/ครั้ง`}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <p style={{ margin: '12px 0 0', fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                    หมายเหตุ: จำแนกจากชื่อ ICD-10 — ความแม่นยำขึ้นกับการบันทึกรหัสใน HOSxP
                </p>
            </div>
        </div>
    );
}

export default React.memo(ThaiMedTab);
