// ============================================================
// BCH 360° Intelligence V.10 — Drill-Down Modal
// Professional Analytics Detail View
// ============================================================
import React, { useEffect, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext.jsx';

export default function DrillDownModal() {
    const { state, closeDrillDown } = useDashboard();
    const { drillDown } = state;

    if (!drillDown.isOpen) return null;

    const { title, data, loading, kpiId } = drillDown;

    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem',
                backdropFilter: 'blur(8px)',
                background: 'rgba(0,0,0,0.4)',
                animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={closeDrillDown}
        >
            <div
                style={{
                    width: '100%', maxWidth: '900px', maxHeight: '90%',
                    background: 'var(--md-surface)',
                    borderRadius: '24px',
                    border: '1px solid var(--md-border)',
                    boxShadow: 'var(--md-shadow-lg)',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '1.25rem 1.75rem',
                    borderBottom: '1px solid var(--md-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'linear-gradient(to right, var(--md-surface), var(--md-bg))'
                }}>
                    <div>
                        <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, color: 'var(--md-text-primary)', margin: 0 }}>
                            {title}
                        </h2>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--md-text-tertiary)', margin: '2px 0 0' }}>
                            Detailed Analytics Breakdown
                        </p>
                    </div>
                    <button
                        onClick={closeDrillDown}
                        style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            border: 'none', background: 'var(--md-bg)',
                            color: 'var(--md-text-secondary)',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '18px', fontWeight: 700,
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--md-border)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'var(--md-bg)'}
                    >
                        &times;
                    </button>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem' }}>
                    {loading ? (
                        <div style={{ py: '4rem', textAlign: 'center' }}>
                            <div className="flex items-center justify-center py-12">
                                <div className="relative w-10 h-10">
                                    <div className="absolute inset-0 rounded-full border-4 border-purple-100" />
                                    <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
                                </div>
                            </div>
                            <p style={{ marginTop: '1rem', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Analyzing data pools...</p>
                        </div>
                    ) : data?.error ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <span style={{ fontSize: '48px' }}>⚠️</span>
                            <h3 style={{ color: 'var(--md-text-primary)' }}>Unable to retrieve details</h3>
                            <p style={{ color: 'var(--md-text-tertiary)' }}>{data.error}</p>
                        </div>
                    ) : (
                        <DrillDownContent kpiId={kpiId} data={data} />
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1rem 1.75rem',
                    borderTop: '1px solid var(--md-border)',
                    background: 'var(--md-bg)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <span style={{ fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>
                        BCH 360° INTELLIGENCE ENGINE V.10
                    </span>
                    <button
                        onClick={closeDrillDown}
                        style={{
                            padding: '0.5rem 1.5rem', borderRadius: '10px',
                            background: 'var(--md-primary)', color: '#fff',
                            border: 'none', fontWeight: 700, cursor: 'pointer',
                            fontSize: 'var(--fs-xs)', boxShadow: '0 4px 12px rgba(124,58,237,.3)'
                        }}
                    >
                        Close View
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>
    );
}

function DrillDownContent({ kpiId, data }) {
    if (!data) return <p>No data available for this metric.</p>;

    // Table rendering helper
    const renderTable = (headers, rows, renderCell) => (
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--md-border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
                <thead style={{ background: 'var(--md-bg)' }}>
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 800, color: 'var(--md-text-tertiary)', borderBottom: '1px solid var(--md-border)' }}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} style={{ borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--md-divider)' }}>
                            {headers.map((_, j) => (
                                <td key={j} style={{ padding: '12px 16px', color: 'var(--md-text-primary)' }}>
                                    {renderCell ? renderCell(row, j) : row[j]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Dynamic content based on KPI ID
    switch (kpiId) {
        case 'finance_revenue':
            return (
                <div className="space-y-6">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <InfoCard label="OPD Revenue" value={data.breakdown?.opd} color="#7c3aed" />
                        <InfoCard label="IPD Revenue" value={data.breakdown?.ipd} color="#0ea5e9" />
                        <InfoCard label="Other Revenue" value={data.breakdown?.other} color="#10b981" />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>Revenue by Department Top 10</h4>
                        {renderTable(
                            ['Department', 'Visits', 'Revenue (THB)'],
                            data.byDept || [],
                            (row, j) => j === 2 ? Number(row.revenue).toLocaleString() : row[j === 0 ? 'name' : 'visits']
                        )}
                    </div>
                </div>
            );

        case 'opd_wait':
            return (
                <div className="space-y-6">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <InfoCard label="Wait < 30m" value={data.stats?.under30} color="#10b981" />
                        <InfoCard label="30m - 60m" value={data.stats?.to60} color="#f59e0b" />
                        <InfoCard label="60m - 90m" value={data.stats?.to90} color="#fb6340" />
                        <InfoCard label="Over 90m" value={data.stats?.over90} color="#f5365c" />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>Longest Wait Active Patients</h4>
                        {renderTable(
                            ['HN', 'Name', 'Clinic', 'Status', 'Wait Time'],
                            data.topWaiters || [],
                            (row, j) => {
                                if (j === 4) return <span style={{ fontWeight: 800, color: row.minutes > 90 ? '#f5365c' : '#f59e0b' }}>{row.minutes} min</span>;
                                if (j === 3) return <span style={{ padding: '2px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.05)', fontSize: '11px' }}>{row.status}</span>;
                                const keys = ['hn', 'name', 'clinic', 'status', 'minutes'];
                                return row[keys[j]];
                            }
                        )}
                    </div>
                </div>
            );

        case 'ipd_beds':
            return (
                <div className="space-y-6">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <InfoCard label="Total Ward Capacity" value={data.wards?.reduce((s, w) => s + w.total, 0)} color="#10b981" />
                        <InfoCard label="Active Occupancy" value={data.wards?.reduce((s, w) => s + w.occupied, 0)} color="#7c3aed" />
                        <InfoCard label="Avg Occupancy Rate" value={`${Math.round(data.wards?.reduce((s, w) => s + w.rate, 0) / (data.wards?.length || 1))}%`} color="#0ea5e9" />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>Occupancy by Ward</h4>
                        {renderTable(
                            ['Ward Name', 'Beds', 'Occupied', 'Rate'],
                            data.wards || [],
                            (row, j) => {
                                if (j === 3) return <span style={{ fontWeight: 800, color: row.rate > 85 ? '#f5365c' : '#10b981' }}>{row.rate}%</span>;
                                return Object.values(row)[j];
                            }
                        )}
                    </div>
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>Active Admissions (Top 15)</h4>
                        {renderTable(
                            ['AN', 'Patient Name', 'Ward', 'LOS (Days)', 'Primary Dx'],
                            data.activePatients || [],
                            (row, j) => {
                                if (j === 3) return `${row.stay} วัน`;
                                return Object.values(row)[j];
                            }
                        )}
                    </div>
                </div>
            );

        case 'ipd_readmit':
            return (
                <div className="space-y-6">
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>30-Day Readmission Patients</h4>
                        {renderTable(
                            ['AN', 'Patient Name', 'Previous Dch', 'Readmit Date', 'Gap (Days)', 'Dx'],
                            data.patients || [],
                            (row, j) => {
                                if (j === 4) return <span style={{ fontWeight: 800, color: '#f5365c' }}>{row.days_since_dch} วัน</span>;
                                const keys = ['an', 'name', 'prev_dchdate', 'readmit_date', 'days_since_dch', 'dx_name'];
                                return row[keys[j]];
                            }
                        )}
                    </div>
                </div>
            );

        case 'ipd_alos':
            return (
                <div className="space-y-6">
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>LOS Variance & Overstay Cases</h4>
                        {renderTable(
                            ['AN', 'Patient Name', 'Reg Date', 'Actual LOS', 'Benchmark', 'Excess', 'Dx'],
                            data.patients || [],
                            (row, j) => {
                                if (j === 3) return `${row.actual_alos} วัน`;
                                if (j === 4) return `${row.benchmark_alos} วัน`;
                                if (j === 5) return <span style={{ fontWeight: 800, color: '#f5365c' }}>+{row.excess_days} วัน</span>;
                                const keys = ['an', 'name', 'regdate', 'actual_alos', 'benchmark_alos', 'excess_days', 'dx_name'];
                                return row[keys[j]];
                            }
                        )}
                    </div>
                </div>
            );

        case 'ipd_cmi':
            return (
                <div className="space-y-6">
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>Case Mix Index (CMI) Distribution</h4>
                        {renderTable(
                            ['DRG', 'Diagnosis', 'Cases', 'Avg RW', 'Total RW', 'Avg Revenue'],
                            data.drgs || [],
                            (row, j) => {
                                if (j === 3) return Number(row.avg_rw).toFixed(3);
                                if (j === 4) return Number(row.total_rw).toFixed(2);
                                if (j === 5) return Number(row.avg_income || 0).toLocaleString();
                                const keys = ['drg', 'dx_name', 'cases', 'avg_rw', 'total_rw', 'avg_income'];
                                return row[keys[j]];
                            }
                        )}
                    </div>
                </div>
            );

        case 'ipd_mortality':
            return (
                <div className="space-y-6">
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '1rem' }}>Clinical Mortality Review (Last 90 Days)</h4>
                        {renderTable(
                            ['AN', 'Patient Name', 'Dch Date', 'Ward', 'Diagnosis', 'Doctor'],
                            data.patients || [],
                            (row, j) => {
                                const keys = ['an', 'name', 'dchdate', 'ward', 'dx_name', 'doctor'];
                                return row[keys[j]];
                            }
                        )}
                    </div>
                </div>
            );

        default:
            return (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--md-text-secondary)' }}>Detailed breakdown for this metric is coming soon.</p>
                    <pre style={{ background: 'var(--md-bg)', padding: '1rem', borderRadius: '12px', fontSize: '10px', textAlign: 'left', overflow: 'auto' }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            );
    }
}

function InfoCard({ label, value, color }) {
    return (
        <div style={{ padding: '1rem', borderRadius: '16px', background: `${color}08`, border: `1px solid ${color}20` }}>
            <p style={{ fontSize: '10px', fontWeight: 800, color: 'var(--md-text-tertiary)', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</p>
            <p style={{ fontSize: '20px', fontWeight: 900, color: color, margin: 0 }}>
                {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
        </div>
    );
}
