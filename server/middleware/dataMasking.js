// ============================================================
// BCH 360° Intelligence V.10 - Data Masking Middleware
// 🔐 Phase 1 Security Hardening — PDPA Compliance
// ============================================================
// Masks patient data based on user role (clinical, finance, director, admin)
// Prevents unauthorized access to sensitive personal information

/**
 * Masks patient data based on user role and PDPA requirements
 * @param {Object} patient - Full patient object from database
 * @param {String} userRole - User's role (clinical, nursing, finance, director, admin)
 * @returns {Object} - Role-appropriate patient data
 */
export function maskPatientData(patient, userRole) {
    if (!patient) return null;
    
    switch(userRole) {
        case 'clinical':
        case 'nursing':
            // Clinical staff can see full patient data including medical history
            // But NOT contact information or financial data
            return {
                hn: patient.hn,
                fname: patient.fname,
                lname: patient.lname,
                full_name: patient.full_name,
                age_y: patient.age_y,
                sex: patient.sex,
                bloodgrp: patient.bloodgrp,
                birthday: patient.birthday,
                pttype: patient.pttype,
                g6pd: patient.g6pd,
                allergy: patient.drugallergy,
                clinic: patient.clinic,
                citizenship: patient.citizenship,
                // EXCLUDE: cid, contact info, address, family members, financial data
            };
            
        case 'finance':
            // Finance staff can see HN, age, pttype, debt info ONLY
            // NO names or personal identifiers
            return {
                hn: patient.hn,
                age_y: patient.age_y,
                sex: patient.sex,
                pttype: patient.pttype,
                cid_last4: patient.cid ? patient.cid.slice(-4) : null,  // Last 4 digits only
                citizenship: patient.citizenship,
                // EXCLUDE: name, contact info, address, medical data, clinic, allergies
            };
            
        case 'director':
        case 'admin':
            // Directors/Admins can see aggregated data, NOT individual patient records
            // If individual records needed, they must go through aggregation endpoints
            return {
                hn: patient.hn,
                age_bucket: getAgeBucket(patient.age_y),  // Bucketed age (0-10, 11-20, etc)
                sex: patient.sex,
                pttype: patient.pttype,
                citizenship: patient.citizenship,
                // EXCLUDE: any identifiable data, personal details, contact info
            };
            
        default:
            // Unknown role - deny by default
            console.warn(`⚠️ Unknown user role: ${userRole}`);
            return null;
    }
}

/**
 * Masks a list of patient objects
 * @param {Array} patients - Array of patient objects
 * @param {String} userRole - User's role
 * @returns {Array} - Array of masked patient objects
 */
export function maskPatientList(patients, userRole) {
    if (!Array.isArray(patients)) return null;
    return patients
        .map(p => maskPatientData(p, userRole))
        .filter(p => p !== null);
}

/**
 * Masks patient vitals data (from OPDSCREEN, ipt_vitals, or AN_STAT)
 * @param {Object} vitals - Vital signs object
 * @param {String} userRole - User's role
 * @returns {Object} - Role-appropriate vitals data
 */
export function maskVitalSigns(vitals, userRole) {
    if (!vitals) return null;
    
    switch(userRole) {
        case 'clinical':
        case 'nursing':
            // Clinical staff can see all vital signs for diagnosis/treatment
            return vitals;
            
        case 'finance':
        case 'director':
        case 'admin':
            // No access to detailed vital signs (patient privacy)
            return null;
            
        default:
            return null;
    }
}

/**
 * Masks financial transaction data for non-finance roles
 * @param {Object} transaction - Financial transaction object
 * @param {String} userRole - User's role
 * @returns {Object} - Role-appropriate financial data
 */
export function maskFinancialData(transaction, userRole) {
    if (!transaction) return null;
    
    switch(userRole) {
        case 'finance':
        case 'admin':
            // Finance staff and admins can see all financial data
            return transaction;
            
        case 'director':
            // Directors see summary data only, not transaction-level detail
            return {
                total: transaction.total,
                paid: transaction.paid,
                remain: transaction.remain,
                pttype: transaction.pttype,
                year_month: transaction.year_month,
                // EXCLUDE: patient name/HN, item details, payer breakdown
            };
            
        case 'clinical':
        case 'nursing':
            // Clinical staff should not see financial data
            return null;
            
        default:
            return null;
    }
}

/**
 * Masks audit log entries based on role
 * @param {Object} auditLog - Audit log entry
 * @param {String} userRole - User's role
 * @returns {Object} - Role-appropriate audit data
 */
export function maskAuditLog(auditLog, userRole) {
    if (!auditLog) return null;
    
    switch(userRole) {
        case 'admin':
            // Admins see full audit logs
            return auditLog;
            
        case 'director':
            // Directors see summarized audit data (no patient names)
            return {
                timestamp: auditLog.timestamp,
                action: auditLog.action,
                module: auditLog.module,
                ip: auditLog.ip,
                outcome: auditLog.outcome,
                // EXCLUDE: patient data, raw queries, detailed parameters
            };
            
        default:
            // Other roles cannot access audit logs
            return null;
    }
}

/**
 * Helper: Convert age to bucket (for director/admin views)
 * @param {Number} age - Age in years
 * @returns {String} - Age bucket (e.g., "0-10", "11-20", etc)
 */
function getAgeBucket(age) {
    if (age == null) return 'unknown';
    const bucket = Math.floor(age / 10) * 10;
    return `${bucket}-${bucket + 9}`;
}

/**
 * Express middleware to apply masking to response data
 * Usage: app.use(maskingMiddleware);
 */
export function maskingMiddleware(req, res, next) {
    // Store the original json() method
    const originalJson = res.json;
    
    // Override res.json() to apply masking
    res.json = function(data) {
        // Only mask if we have a user context
        if (!req.user) {
            return originalJson.call(this, data);
        }
        
        // Apply masking based on endpoint
        if (req.path.includes('/api/clinical') || req.path.includes('/api/ipd') || req.path.includes('/api/opd')) {
            if (data && data.patient) {
                data.patient = maskPatientData(data.patient, req.user.role);
            } else if (data && Array.isArray(data)) {
                // Array of patients
                data = data.map(item => {
                    if (item && item.hn) {
                        return maskPatientData(item, req.user.role);
                    }
                    return item;
                });
            }
        }
        
        return originalJson.call(this, data);
    };
    
    next();
}

export default {
    maskPatientData,
    maskPatientList,
    maskVitalSigns,
    maskFinancialData,
    maskAuditLog,
    maskingMiddleware
};
