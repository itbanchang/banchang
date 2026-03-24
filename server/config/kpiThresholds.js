// ============================================================
// BCH 360° Intelligence V.10 — KPI Threshold Configuration
// แหล่งความจริงเดียวสำหรับทุก hardcoded threshold ในโปรเจกต์
// แก้ไขที่นี่แห่งเดียว แทนการแก้หลายไฟล์กระจัดกระจาย
// Override ด้วย environment variables ได้ทุกค่า
// ============================================================

export const KPI = {
    // ─── แพทย์แผนไทย (TTM) ───────────────────────────────────
    ttm: {
        // เวลาให้บริการ — ปรับได้ผ่าน TTM_CLOSE_HOUR / TTM_CLOSE_MIN ใน .env
        close_hour:   Number(process.env.TTM_CLOSE_HOUR  ?? 20),
        close_minute: Number(process.env.TTM_CLOSE_MIN   ?? 30),

        // Revenue/Visit thresholds (บาท) — อ้างอิงราคาบริการ BCH ปัจจุบัน
        // basic  = นวดพื้นฐาน / standard service
        // premium = หัตถการพิเศษ (ฝังเข็ม, อบสมุนไพรสูตรพิเศษ)
        rev_basic_thb:   Number(process.env.TTM_REV_BASIC   ?? 500),
        rev_premium_thb: Number(process.env.TTM_REV_PREMIUM ?? 1000),

        sla_wait_min: 30,
        dept_code: '003',
    },

    // ─── ทันตกรรม (Dental) ───────────────────────────────────
    dental: {
        sla_wait_min:     30,
        sla_total_min:    60,
        p90_alert_min:    60,
        avg_wait_alert:   30,

        // Revenue thresholds — อ้างอิง รพช. (Community Hospital)
        rev_community_thb: Number(process.env.DENTAL_REV_COMMUNITY ?? 800),
        high_yield_thb:    Number(process.env.DENTAL_HIGH_YIELD    ?? 1200),

        completion_target_pct: 85,
        dept_code: '010',
    },

    // ─── โรคเรื้อรัง (NCD) ───────────────────────────────────
    ncd: {
        // ≥60 ปี ตาม นโยบายกระทรวงสาธารณสุขไทย
        // (WHO ใช้ ≥65 ปี แต่ไทยกำหนด ≥60 ปี ตาม พรบ.ผู้สูงอายุ 2546)
        elderly_age: 60,

        // Clinical targets — อ้างอิง ADA 2024 + กรมการแพทย์ ไทย
        hba1c_target_pct:   Number(process.env.NCD_HBAIC_TARGET ?? 7),   // HbA1c <7%
        bp_systolic_mmhg:   Number(process.env.NCD_BP_SYS       ?? 140), // BP <140 mmHg
        bp_diastolic_mmhg:  Number(process.env.NCD_BP_DIA       ?? 90),  // BP <90 mmHg

        sla_wait_min: 30,
        dept_code: '024',
    },

    // ─── รังสีวิทยา (X-Ray) ──────────────────────────────────
    xray: {
        sla_wait_min:   30,
        wait_alert_min: 60,

        // Radiologist Report TAT targets (นาที) — ตาม ACR Timeliness Guidelines
        tat_plain_min:     Number(process.env.XRAY_TAT_PLAIN  ?? 30),  // Plain Film
        tat_ct_min:        Number(process.env.XRAY_TAT_CT     ?? 120), // CT Scan
        tat_mri_min:       Number(process.env.XRAY_TAT_MRI    ?? 240), // MRI
        tat_us_min:        Number(process.env.XRAY_TAT_US     ?? 60),  // Ultrasound
        tat_emergency_min: Number(process.env.XRAY_TAT_EMERG  ?? 15),  // Emergency (ทุก modality)

        dept_codes: ['090', '091'],
    },

    // ─── กายภาพบำบัด (Physical Therapy) ─────────────────────
    pt: {
        sla_wait_min:        30,
        daily_volume_alert:  50,
        completion_good_pct: 80,
        revenue_low_thb:     400,
        dept_code: '008', // ปรับตามรหัส HOSxP ของ BCH
    },

    // ─── ห้องฉุกเฉิน (ER) ────────────────────────────────────
    er: {
        // Triage SLA targets (วินาที) — ACEP / ESI guidelines
        triage1_sla_sec:  60,   // Resuscitation: <1 นาที
        triage2_sla_sec:  900,  // Emergency: <15 นาที
        triage3_sla_sec:  1800, // Urgent: <30 นาที
        triage4_sla_sec:  3600, // Semi-urgent: <60 นาที

        lwbs_alert_pct:     5,
        return_72h_alert:   3,
        overcrowd_critical: 30,
        overcrowd_warning:  20,
    },

    // ─── ผู้ป่วยใน (IPD) ─────────────────────────────────────
    ipd: {
        occupancy_critical_pct: 95,
        occupancy_warning_pct:  85,
        alos_target_days:       4,
        readmit_alert_pct:      5,
        total_beds:             Number(process.env.IPD_TOTAL_BEDS ?? 120), // เตียงจริง BCH
        home_ward: '06', // หอผู้ป่วยโฮมวาร์ด — ไม่นับเตียงจริง
    },

    // ─── การเงิน (Finance) ───────────────────────────────────
    finance: {
        collection_rate_good_pct: 90,
        days_in_ar_target:        45,
        denial_rate_alert_pct:    10,
    },
};
