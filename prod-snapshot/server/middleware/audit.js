// ============================================================
// BCH 360° Intelligence V.10 - PDPA Audit Logger
// ============================================================
import { v4 as uuidv4 } from 'uuid';
import { insert, find } from '../db/dataStore.js';
import logger from '../logger.js';

const SENSITIVITY_MAP = {
    'patient_info': 'highly_sensitive', 'vital_signs': 'highly_sensitive',
    'clinical_risk': 'highly_sensitive', 'financial_data': 'sensitive',
    'claims': 'sensitive', 'billing': 'sensitive',
    'bed_status': 'normal', 'ward_info': 'normal', 'statistics': 'normal'
};

export function logAudit(event) {
    try {
        insert('audit_logs', {
            id: uuidv4(),
            user_id: event.user_id || 'system',
            action: event.action,
            resource_type: event.resource_type,
            resource_id: event.resource_id || null,
            patient_id: event.patient_id || null,
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
