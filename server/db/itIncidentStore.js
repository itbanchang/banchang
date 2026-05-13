// ============================================================
// BCH 360° Intelligence V.10 — IT Incident / Ticket Store
// Persistent IT operations log (SQLite warehouse)
// ============================================================
import { getWarehouseDb } from './dataWarehouse.js';

function db() {
  const d = getWarehouseDb();
  if (!d) throw new Error('Warehouse DB not initialized');
  return d;
}

const VALID_CATEGORY = ['server', 'network', 'db', 'app', 'security', 'other'];
const VALID_SEVERITY = ['low', 'medium', 'high', 'critical'];
const VALID_STATUS = ['open', 'in_progress', 'resolved', 'closed'];

function pickEnum(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

export function createIncident({
  title,
  description,
  category,
  severity,
  reporter,
  assignee,
  affected_system,
}) {
  const result = db()
    .prepare(
      `INSERT INTO it_incidents
        (title, description, category, severity, reporter, assignee, affected_system)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      title,
      description ?? null,
      pickEnum(category, VALID_CATEGORY, 'other'),
      pickEnum(severity, VALID_SEVERITY, 'medium'),
      reporter ?? null,
      assignee ?? null,
      affected_system ?? null
    );
  return getIncident(result.lastInsertRowid);
}

export function listIncidents({
  status,
  severity,
  category,
  search,
  days,
  limit = 100,
  offset = 0,
} = {}) {
  let sql = `SELECT i.*,
              (SELECT COUNT(*) FROM it_incident_comments c WHERE c.incident_id = i.id) AS comment_count
             FROM it_incidents i
             WHERE 1=1`;
  const params = [];

  if (status) {
    sql += ` AND status = ?`;
    params.push(status);
  }
  if (severity) {
    sql += ` AND severity = ?`;
    params.push(severity);
  }
  if (category) {
    sql += ` AND category = ?`;
    params.push(category);
  }
  if (search) {
    sql += ` AND (title LIKE ? OR description LIKE ? OR affected_system LIKE ?)`;
    const like = `%${search}%`;
    params.push(like, like, like);
  }
  if (days) {
    sql += ` AND created_at >= datetime('now','localtime',?)`;
    params.push(`-${Number(days)} days`);
  }
  sql += ` ORDER BY
             CASE status WHEN 'open' THEN 0 WHEN 'in_progress' THEN 1 WHEN 'resolved' THEN 2 ELSE 3 END,
             CASE severity WHEN 'critical' THEN 0 WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
             created_at DESC
           LIMIT ? OFFSET ?`;
  params.push(Number(limit), Number(offset));

  return db().prepare(sql).all(...params);
}

export function getIncident(id) {
  const incident = db()
    .prepare(`SELECT * FROM it_incidents WHERE id = ?`)
    .get(id);
  if (!incident) return null;
  const comments = db()
    .prepare(
      `SELECT * FROM it_incident_comments WHERE incident_id = ? ORDER BY created_at ASC`
    )
    .all(id);
  return { ...incident, comments };
}

export function updateIncident(id, patch = {}) {
  const fields = [];
  const params = [];

  if (patch.status !== undefined) {
    fields.push('status = ?');
    params.push(pickEnum(patch.status, VALID_STATUS, 'open'));
  }
  if (patch.severity !== undefined) {
    fields.push('severity = ?');
    params.push(pickEnum(patch.severity, VALID_SEVERITY, 'medium'));
  }
  if (patch.category !== undefined) {
    fields.push('category = ?');
    params.push(pickEnum(patch.category, VALID_CATEGORY, 'other'));
  }
  if (patch.assignee !== undefined) {
    fields.push('assignee = ?');
    params.push(patch.assignee || null);
  }
  if (patch.affected_system !== undefined) {
    fields.push('affected_system = ?');
    params.push(patch.affected_system || null);
  }
  if (patch.resolution_note !== undefined) {
    fields.push('resolution_note = ?');
    params.push(patch.resolution_note || null);
  }
  if (patch.title !== undefined) {
    fields.push('title = ?');
    params.push(patch.title);
  }
  if (patch.description !== undefined) {
    fields.push('description = ?');
    params.push(patch.description || null);
  }

  if (fields.length === 0) return getIncident(id);

  fields.push(`updated_at = datetime('now','localtime')`);

  // Auto-stamp resolved_at when transitioning to resolved/closed
  if (patch.status === 'resolved' || patch.status === 'closed') {
    fields.push(`resolved_at = COALESCE(resolved_at, datetime('now','localtime'))`);
  } else if (patch.status === 'open' || patch.status === 'in_progress') {
    fields.push(`resolved_at = NULL`);
  }

  params.push(id);
  db().prepare(`UPDATE it_incidents SET ${fields.join(', ')} WHERE id = ?`).run(...params);
  return getIncident(id);
}

export function addComment(incidentId, { author, body }) {
  const exists = db().prepare(`SELECT id FROM it_incidents WHERE id = ?`).get(incidentId);
  if (!exists) return null;
  db()
    .prepare(
      `INSERT INTO it_incident_comments (incident_id, author, body) VALUES (?, ?, ?)`
    )
    .run(incidentId, author || 'system', body);
  db()
    .prepare(`UPDATE it_incidents SET updated_at = datetime('now','localtime') WHERE id = ?`)
    .run(incidentId);
  return getIncident(incidentId);
}

export function deleteIncident(id) {
  // FK ON DELETE CASCADE removes comments
  const r = db().prepare(`DELETE FROM it_incidents WHERE id = ?`).run(id);
  return r.changes > 0;
}

export function getIncidentStats() {
  const d = db();
  const byStatus = d
    .prepare(`SELECT status, COUNT(*) AS count FROM it_incidents GROUP BY status`)
    .all();
  const bySeverity = d
    .prepare(`SELECT severity, COUNT(*) AS count FROM it_incidents GROUP BY severity`)
    .all();
  const byCategory = d
    .prepare(`SELECT category, COUNT(*) AS count FROM it_incidents GROUP BY category`)
    .all();
  const open = d
    .prepare(
      `SELECT COUNT(*) AS count FROM it_incidents WHERE status IN ('open','in_progress')`
    )
    .get();
  const critOpen = d
    .prepare(
      `SELECT COUNT(*) AS count FROM it_incidents
       WHERE status IN ('open','in_progress') AND severity = 'critical'`
    )
    .get();
  const mttrRow = d
    .prepare(
      `SELECT AVG((julianday(resolved_at) - julianday(created_at)) * 24 * 60) AS mttr_min
       FROM it_incidents
       WHERE resolved_at IS NOT NULL
         AND created_at >= datetime('now','localtime','-30 days')`
    )
    .get();
  const last30Row = d
    .prepare(
      `SELECT COUNT(*) AS count FROM it_incidents
       WHERE created_at >= datetime('now','localtime','-30 days')`
    )
    .get();

  return {
    open: open.count,
    critical_open: critOpen.count,
    last_30_days: last30Row.count,
    mttr_minutes_30d: mttrRow.mttr_min ? Math.round(mttrRow.mttr_min) : null,
    by_status: byStatus,
    by_severity: bySeverity,
    by_category: byCategory,
  };
}

export const ENUMS = {
  category: VALID_CATEGORY,
  severity: VALID_SEVERITY,
  status: VALID_STATUS,
};
