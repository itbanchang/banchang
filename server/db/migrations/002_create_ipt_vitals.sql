-- ============================================================
-- BCH 360° Intelligence V.10 - Phase 2 Migration
-- 🏥 IPD Vital Signs Time-Series Table
-- ============================================================
-- Purpose: Track continuous vital signs for hospitalized patients
-- Supports: NEWS2 EWS calculation, trend analysis, clinical alerts

-- Create main table
CREATE TABLE IF NOT EXISTS ipt_vitals (
    ipt_vital_id INT AUTO_INCREMENT PRIMARY KEY,
    an VARCHAR(9) NOT NULL,
    hn VARCHAR(9),
    
    -- Check timestamp
    check_datetime DATETIME NOT NULL,
    
    -- Vital Signs (NEWS2 Parameters)
    rr DOUBLE COMMENT 'Respiratory rate (breaths/min)',
    spo2 DOUBLE COMMENT 'Oxygen saturation (%)',
    bps INT COMMENT 'Systolic blood pressure (mmHg)',
    bpd INT COMMENT 'Diastolic blood pressure (mmHg)',
    pulse INT COMMENT 'Heart rate (beats/min)',
    temperature DOUBLE COMMENT 'Body temperature (°C)',
    
    -- AI/Risk Scoring
    news2_score INT COMMENT 'National Early Warning Score V2',
    news2_risk_level VARCHAR(20) COMMENT 'low, medium, high, critical',
    
    -- Audit Trail
    created_by VARCHAR(25),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_an_datetime (an, check_datetime),
    INDEX idx_hn (hn),
    INDEX idx_risk_level (news2_risk_level, check_datetime),
    INDEX idx_created_at (created_at),
    
    CONSTRAINT fk_ipt_vitals_an FOREIGN KEY (an) REFERENCES ipt(an)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Time-series vital signs for IPD patients (supports EWS/trend analysis)';

-- Create view for last 24h vitals per patient
CREATE OR REPLACE VIEW ipt_vital_last24h AS
SELECT 
    an, 
    hn,
    MAX(check_datetime) as last_check_time,
    COUNT(*) as check_count,
    MIN(news2_score) as min_news2,
    MAX(news2_score) as max_news2,
    ROUND(AVG(news2_score), 1) as avg_news2,
    MAX(IF(news2_risk_level='critical', 1, 0)) as had_critical,
    MAX(IF(news2_risk_level IN ('high', 'critical'), 1, 0)) as had_high_risk
FROM ipt_vitals
WHERE check_datetime > DATE_SUB(NOW(), INTERVAL 24 HOUR)
GROUP BY an, hn;

-- Create view for high-risk patients
CREATE OR REPLACE VIEW ipt_vital_high_risk AS
SELECT DISTINCT
    i.an,
    p.hn,
    p.fname,
    p.lname,
    p.age_y,
    p.sex,
    i.ward,
    i.cur_bedno,
    i.regdate,
    DATEDIFF(NOW(), i.regdate) as stay_days,
    iv.check_datetime,
    iv.news2_score,
    iv.news2_risk_level,
    (SELECT COUNT(*) FROM ipt_vitals WHERE an = i.an AND news2_risk_level IN ('high', 'critical')) as risk_episodes
FROM ipt i
JOIN patient p ON i.hn = p.hn
JOIN ipt_vitals iv ON i.an = iv.an
WHERE i.dchdate IS NULL
    AND iv.news2_score >= 5
    AND iv.check_datetime = (
        SELECT MAX(check_datetime) FROM ipt_vitals iv2 WHERE iv2.an = i.an
    )
ORDER BY iv.news2_score DESC, iv.check_datetime DESC;

-- Create index for faster queries
ALTER TABLE ipt_vitals ADD INDEX idx_an_created (an, created_at);

-- Summary: Creates table with 1 primary key + 4 indexes for fast querying
-- Supports: real-time EWS alerts, 24h trend graphs, high-risk patient identification
