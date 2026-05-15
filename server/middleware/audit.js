// ============================================================
// BCH 360° Intelligence V.10 - PDPA Audit Logger
// ============================================================
// Phase H.3 (2026-05-15): patient_id is now SHA256-hashed before insert.
// Plain HN never reaches audit_logs storage. Traceability preserved —
// same HN deterministically maps to same hash so investigators can still
// correlate access events. Salt = AUDIT_HASH_SALT || JWT_SECRET.
// ============================================================
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { insert, find } from '../db/dataStore.js';
import logger from '../logger.js';

const SENSITIVITY_MAP = {
    'patient_info': 'highly_sensitive', 'vital_signs': 'highly_sensitive',
    'clinical_risk': 'highly_sensitive', 'financial_data': 'sensitive',
    'claims': 'sensitive', 'billing': 'sensitive',
    'bed_status': 'normal', 'ward_info': 'normal', 'statistics': 'normal'
};

// Salt sourced once at module load. AUDIT_HASH_SALT is preferred so it can
// be rotated independently of JWT_SECRET; falls back to JWT_SECRET so the
// hash is never unsalted even if the dedicated var isn't set.
const HASH_SALT = process.env.AUDIT_HASH_SALT || process.env.JWT_SECRET || '';
if (!HASH_SALT) {
    logger.warn('Audit HN hashing salt is empty — set AUDIT_HASH_SALT or JWT_SECRET');
}

export function hashPatientId(hn) {
    if (hn === null || hn === undefined || hn === '') return null;
    return crypto.createHash('sha256').update(String(hn) + HASH_SALT).digest('hex');
}

export function logAudit(event) {
    try {
        insert('audit_logs', {
            id: uuidv4(),
            user_id: event.user_id || 'system',
            action: event.action,
            resource_type: event.resource_type,
            resource_id: event.resource_id || null,
            patient_id: hashPatientId(event.patient_id),
            ip_address: event.req?.ip || 'unknown',
            user_agent: event.req?.headers?.['user-agent'] || 'unknown',
            details: event.details || {},
            sensitivity_level: SENSITIVITY_MAP[event.resource_type] || 'normal',
            created_at: new Date().toISOString()
        });
    } catch (err) {
        logger.error('Audit error', { message: err.message, stack: err.stack });
    }
}

export function auditMiddleware(resourceType, action = 'view') {
    return (req, res, next) => {
        res.on('finish', () => {
            if (res.statusCode < 400) {
                logAudit({
                    user_id: req.user?.id, action: `${action}:${resourceType}`,
                    resource_type: resourceType, resource_id: req.params?.id,
                    patient_id: req.params?.patient_id || req.query?.patient_id,
                    req, details: { method: req.method, path: req.originalUrl, status: res.statusCode }
                });
            }
        });
        next();
    };
}

export function getAuditLogs(filters = {}) {
    let logs = find('audit_logs', () => true);
    if (filters.user_id) logs = logs.filter(l => l.user_id === filters.user_id);
    if (filters.resource_type) logs = logs.filter(l => l.resource_type === filters.resource_type);
    if (filters.sensitivity) logs = logs.filter(l => l.sensitivity_level === filters.sensitivity);
    return logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, filters.limit || 100);
}
