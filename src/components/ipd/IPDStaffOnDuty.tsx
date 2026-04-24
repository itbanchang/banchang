import React from 'react';

export interface IPDStaffOnDutyProps {
    ipdAnalytics: any;
    loading: boolean;
}

export const IPDStaffOnDuty = React.memo(function IPDStaffOnDuty({ ipdAnalytics, loading }: IPDStaffOnDutyProps) {
    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '-4px' }}>
                <div style={{ width: '3px', height: '18px', background: 'linear-gradient(180deg, #5e72e4, #11cdef)', borderRadius: '99px' }} />
                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 800, color: 'var(--md-text-primary)', letterSpacing: '-0.01em' }}>
                    🩺 บุคลากรที่ปฏิบัติหน้าที่วันนี้ (On-Duty IPD)
                </span>
                <span style={{ fontSize: '12px', color: 'var(--md-text-tertiary)', fontWeight: 600, background: 'rgba(94,114,228,.08)', padding: '2px 8px', borderRadius: '99px' }}>
                    Activity Logs · Clinical Database
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {/* ── Active Doctors List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(94,114,228,.05)', borderBottom: '1px solid rgba(94,114,228,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>👨‍⚕️</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#5e72e4' }}>แผนกแพทย์ (IPD)</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#5e72e4', opacity: 0.8 }}>{ipdAnalytics?.on_duty?.doctors?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (ipdAnalytics?.on_duty?.doctors?.length > 0) ? (
                            ipdAnalytics.on_duty.doctors.map((dr: any, i: number) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                    borderRadius: '10px', transition: 'background 0.2s', cursor: 'default',
                                    borderBottom: '1px solid rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{
                                        width: '32px', height: '32px', borderRadius: '8px',
                                        background: 'linear-gradient(135deg, #5e72e4, #8b5cf6)',
                                        color: '#fff', fontSize: '12px', fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {dr.staff_name?.substring(0, 2).replace('น.', '').replace('พ.', '').trim() || 'D'}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dr.staff_name}</p>
                                        <p style={{ margin: 0, fontSize: '10px', color: 'var(--md-text-tertiary)', fontWeight: 600 }}>Attending Doctor</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#5e72e4' }}>{dr.total_count}</p>
                                        <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>เคส</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '12px' }}>ไม่พบข้อมูล</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Active Nurses List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(17,205,239,.05)', borderBottom: '1px solid rgba(17,205,239,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>👩‍⚕️</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#11cdef' }}>ทีมพยาบาล (IPD)</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#11cdef', opacity: 0.8 }}>{ipdAnalytics?.on_duty?.nurses?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (ipdAnalytics?.on_duty?.nurses?.length > 0) ? (
                            ipdAnalytics.on_duty.nurses.map((nr: any, i: number) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && nr.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && nr.afternoon_count > 0) ||
                                    (currentHour >= 17 && nr.night_count > 0);

                                return (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                        borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)'
                                    }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, #11cdef, #1171ef)' : 'rgba(0,0,0,0.05)',
                                            color: isActiveNow ? '#fff' : 'var(--md-text-tertiary)',
                                            fontSize: '12px', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            {nr.staff_name?.substring(0, 1) || 'N'}
                                            {isActiveNow && <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nr.staff_name}</p>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: nr.morning_count > 0 ? '#5e72e4' : '#ccc' }}>🌅{nr.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: nr.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{nr.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: nr.night_count > 0 ? '#172b4d' : '#ccc' }}>🌙{nr.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#11cdef' }}>{nr.total_count}</p>
                                            <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>งาน</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '12px' }}>ไม่พบข้อมูล</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Active Staff List ── */}
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px 16px', background: 'rgba(45,206,137,.05)', borderBottom: '1px solid rgba(45,206,137,.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px' }}>🏢</span>
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#2dce89' }}>หน้าที่สนับสนุน (IPD)</span>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#2dce89', opacity: 0.8 }}>{ipdAnalytics?.on_duty?.staff?.length || 0}</span>
                    </div>
                    <div style={{ maxHeight: '240px', overflowY: 'auto', padding: '8px' }} className="custom-scrollbar">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => <div key={i} className="skeleton" style={{ height: '50px', margin: '4px 0', borderRadius: '10px' }} />)
                        ) : (ipdAnalytics?.on_duty?.staff?.length > 0) ? (
                            ipdAnalytics.on_duty.staff.map((st: any, i: number) => {
                                const currentHour = new Date().getHours();
                                const isActiveNow = (currentHour < 12 && st.morning_count > 0) ||
                                    (currentHour >= 12 && currentHour < 17 && st.afternoon_count > 0) ||
                                    (currentHour >= 17 && st.night_count > 0);

                                return (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px',
                                        borderRadius: '10px', borderBottom: '1px solid rgba(0,0,0,0.03)'
                                    }}>
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '8px',
                                            background: isActiveNow ? 'linear-gradient(135deg, #2dce89, #2dcecc)' : 'rgba(0,0,0,0.05)',
                                            color: isActiveNow ? '#fff' : 'var(--md-text-tertiary)',
                                            fontSize: '12px', fontWeight: 800,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            {st.staff_name?.substring(0, 1) || 'S'}
                                            {isActiveNow && <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '8px', height: '8px', background: '#2dce89', border: '1.5px solid #fff', borderRadius: '50%' }} />}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--md-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.staff_name}</p>
                                            <div style={{ display: 'flex', gap: '3px', marginTop: '3px' }}>
                                                <span title="เช้า" style={{ fontSize: '8px', fontWeight: 800, color: st.morning_count > 0 ? '#5e72e4' : '#ccc' }}>🌅{st.morning_count || 0}</span>
                                                <span title="บ่าย" style={{ fontSize: '8px', fontWeight: 800, color: st.afternoon_count > 0 ? '#fb6340' : '#ccc' }}>☀️{st.afternoon_count || 0}</span>
                                                <span title="ดึก" style={{ fontSize: '8px', fontWeight: 800, color: st.night_count > 0 ? '#172b4d' : '#ccc' }}>🌙{st.night_count || 0}</span>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#2dce89' }}>{st.total_count}</p>
                                            <p style={{ margin: 0, fontSize: '8px', fontWeight: 700, color: 'var(--md-text-tertiary)' }}>งาน</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--md-text-tertiary)' }}>
                                <p style={{ fontSize: '12px' }}>ไม่พบข้อมูล</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});
