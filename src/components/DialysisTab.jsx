// ============================================================
// BCH 360° Intelligence V.10 - Dialysis Tab (ไตเทียม)
// Scaffolded by bch-360-expert. Fill in real KPIs + charts.
// ============================================================
import React, { useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useDashboard } from '../context/DashboardContext.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';
import KPICardV2 from './KPICardV2.jsx';

function DialysisTab() {
    const { state, fetchData } = useDashboard();

    useEffect(() => {
        fetchData('dialysisToday', '/api/dialysis/today');
        fetchData('dialysisTrend', '/api/dialysis/trend?days=30');
    }, [fetchData]);

    const data = state.dialysisToday;
    const trendData = state.dialysisTrend;
    const isLoading = state.loading?.dialysisToday;

    if (isLoading && !data) return <TabLoadingSkeleton />;
    if (!data) return <EmptyState title="ไม่มีข้อมูล ไตเทียม" />;

    return (
        <div className="space-y-6">
            <KPIDescriptionCards
                title="ไตเทียม Analytics"
                subtitle="คำอธิบายแท็บ ไตเทียม — ปรับให้ตรงกับโดเมนจริง"
                color="blue"
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPICardV2 title="รวมวันนี้" value={data.total} icon="📊" color="blue" loading={isLoading} />
                <KPICardV2
                    title="เทียบเมื่อวาน"
                    value={data.trend}
                    format="percent"
                    color={data.trend > 0 ? 'green' : 'red'}
                    loading={isLoading}
                />
                <KPICardV2 title="ค่าเฉลี่ย" value={data.avg} format="decimal" color="purple" loading={isLoading} />
                <KPICardV2 title="ยอดคงเหลือ" value={data.pending} icon="⏳" color="amber" loading={isLoading} />
            </div>

            {data.ai && <AIInsightCard {...data.ai} />}

            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">แนวโน้ม 30 วัน</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData?.series || []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="d" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="n"
                            stroke="#5e72e4"
                            strokeWidth={2}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default DialysisTab;
