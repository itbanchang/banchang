-- ============================================================
-- BCH 360° Intelligence V.10 - Phase 2 Migration
-- 💰 Patient Debt Aging History Table
-- ============================================================
-- Purpose: Track outstanding patient debts and aging buckets
-- Enables: Debt collection analysis, aging dashboard, financial forecasting

-- Create main table
CREATE TABLE IF NOT EXISTS patient_debt_history (
    debt_id INT AUTO_INCREMENT PRIMARY KEY,
    an VARCHAR(9),
    vn VARCHAR(13),
    hn VARCHAR(9) NOT NULL,
    
    -- Debt Amount Tracking
    original_amount DOUBLE(15, 3) COMMENT 'Initial invoice amount',
    remain_amount DOUBLE(15, 3) COMMENT 'Outstanding balance',
    due_date DATE NOT NULL COMMENT 'Payment due date',
    
    -- Timeline
    created_date DATE NOT NULL DEFAULT CURDATE() COMMENT 'Invoice/debt creation date',
    paid_date DATE COMMENT 'Payment received date (NULL if unpaid)',
    payment_amount DOUBLE(15, 3) COMMENT 'Amount actually paid',
    payment_method VARCHAR(20) COMMENT 'cash, installment, waived, written_off',
    
    -- Aging Calculation (auto-generated)
    days_overdue INT GENERATED ALWAYS AS (
        CASE 
            WHEN paid_date IS NOT NULL THEN 0
            ELSE DATEDIFF(CURDATE(), due_date)
        END
    ) STORED COMMENT 'Days past due (0 if paid)',
    
    aging_bucket VARCHAR(20) GENERATED ALWAYS AS (
        CASE
            WHEN paid_date IS NOT NULL THEN 'paid'
            WHEN DATEDIFF(CURDATE(), due_date) < 0 THEN 'not_due'
            WHEN DATEDIFF(CURDATE(), due_date) <= 30 THEN '0-30_days'
            WHEN DATEDIFF(CURDATE(), due_date) <= 60 THEN '31-60_days'
            WHEN DATEDIFF(CURDATE(), due_date) <= 90 THEN '61-90_days'
            ELSE '>90_days'
        END
    ) STORED COMMENT 'Aging bucket for dashboard',
    
    -- Audit
    created_by VARCHAR(25),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for performance queries
    INDEX idx_hn (hn),
    INDEX idx_due_date (due_date),
    INDEX idx_aging_bucket (aging_bucket),
    INDEX idx_created_date (created_date),
    INDEX idx_unpaid (paid_date, remain_amount),
    INDEX idx_an (an),
    
    CONSTRAINT fk_debt_hn FOREIGN KEY (hn) REFERENCES patient(hn)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
COMMENT='Patient outstanding debts with aging tracking for collections';

-- Create view for aging summary dashboard
CREATE OR REPLACE VIEW debt_aging_summary AS
SELECT 
    aging_bucket,
    COUNT(DISTINCT hn) as patient_count,
    COUNT(*) as debt_incident_count,
    SUM(remain_amount) as total_debt_amount,
    ROUND(AVG(remain_amount), 2) as avg_debt_per_incident,
    MIN(due_date) as oldest_debt_date,
    MAX(due_date) as newest_debt_date,
    DATEDIFF(CURDATE(), MIN(due_date)) as oldest_days_overdue
FROM patient_debt_history
WHERE paid_date IS NULL
GROUP BY aging_bucket
ORDER BY 
    CASE 
        WHEN aging_bucket = 'not_due' THEN 0
        WHEN aging_bucket = '0-30_days' THEN 1
        WHEN aging_bucket = '31-60_days' THEN 2
        WHEN aging_bucket = '61-90_days' THEN 3
        WHEN aging_bucket = '>90_days' THEN 4
        ELSE 5
    END;

-- Create view for high-priority debt collection
CREATE OR REPLACE VIEW debt_high_priority AS
SELECT 
    pdh.debt_id,
    pdh.hn,
    CONCAT(p.fname, ' ', p.lname) as patient_name,
    p.cid,
    pdh.remain_amount,
    pdh.due_date,
    pdh.days_overdue,
    pdh.aging_bucket,
    pdh.created_date,
    pdh.an,
    pdh.vn,
    i.dchdate,
    i.dchstts,
    p.informtel,
    p.hometel
FROM patient_debt_history pdh
JOIN patient p ON pdh.hn = p.hn
LEFT JOIN ipt i ON pdh.an = i.an
WHERE pdh.paid_date IS NULL
    AND pdh.days_overdue >= 60  -- 60+ days overdue
    AND pdh.remain_amount >= 1000  -- Significant amount
ORDER BY pdh.days_overdue DESC, pdh.remain_amount DESC;

-- Create trigger to log debt status changes
DELIMITER //
CREATE TRIGGER IF NOT EXISTS tr_debt_payment_log
AFTER UPDATE ON patient_debt_history
FOR EACH ROW
BEGIN
    IF NEW.paid_date IS NOT NULL AND OLD.paid_date IS NULL THEN
        -- Log debt payment
        INSERT INTO audit_log (user_id, action, table_name, record_id, old_value, new_value, created_at)
        VALUES ('system', 'DEBT_PAID', 'patient_debt_history', NEW.debt_id, 
                CONCAT('remain=', OLD.remain_amount), 
                CONCAT('paid=', NEW.payment_amount, ' method=', NEW.payment_method),
                NOW());
    END IF;
END //
DELIMITER ;

-- Create view for monthly debt collection rate
CREATE OR REPLACE VIEW debt_collection_monthly AS
SELECT 
    DATE_FORMAT(paid_date, '%Y-%m') as month,
    COUNT(*) as debts_paid,
    SUM(payment_amount) as total_collected,
    ROUND(AVG(payment_amount), 2) as avg_payment,
    COUNT(DISTINCT hn) as unique_patients
FROM patient_debt_history
WHERE paid_date IS NOT NULL
GROUP BY DATE_FORMAT(paid_date, '%Y-%m')
ORDER BY month DESC;

-- Summary: Creates comprehensive debt tracking with 6 indexes + 4 views for analytics
-- Supports: aging dashboard, collection prioritization, financial forecasting, audit trail
