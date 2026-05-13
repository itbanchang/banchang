// ============================================================
// BCH 360° Intelligence V.10 — IT Incident / Ticket API
// Persistent IT operations log (admin-only)
// ============================================================
import { Router } from 'express';
import { z } from 'zod';
import { validate, validateQuery } from '../middleware/validate.js';
import {
  createIncident,
  listIncidents,
  getIncident,
  updateIncident,
  addComment,
  deleteIncident,
  getIncidentStats,
  ENUMS,
} from '../db/itIncidentStore.js';

const router = Router();

// ── Schemas ──
const listQuery = z.object({
  status: z.enum(ENUMS.status).optional(),
  severity: z.enum(ENUMS.severity).optional(),
  category: z.enum(ENUMS.category).optional(),
  search: z.string().max(200).optional(),
  days: z.coerce.number().int().min(1).max(3650).optional(),
  limit: z.coerce.number().int().min(1).max(500).default(100),
  offset: z.coerce.number().int().min(0).default(0),
});

const createBody = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(4000).optional(),
  category: z.enum(ENUMS.category).default('other'),
  severity: z.enum(ENUMS.severity).default('medium'),
  affected_system: z.string().max(200).optional(),
  assignee: z.string().max(100).optional(),
});

const patchBody = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(4000).optional(),
  category: z.enum(ENUMS.category).optional(),
  severity: z.enum(ENUMS.severity).optional(),
  status: z.enum(ENUMS.status).optional(),
  assignee: z.string().max(100).nullable().optional(),
  affected_system: z.string().max(200).nullable().optional(),
  resolution_note: z.string().max(4000).nullable().optional(),
});

const commentBody = z.object({
  body: z.string().min(1).max(4000),
});

// ── Routes ──
router.get('/enums', (req, res) => res.json(ENUMS));

router.get('/stats', (req, res) => {
  try {
    res.json(getIncidentStats());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', validateQuery(listQuery), (req, res) => {
  try {
    const data = listIncidents(req.query);
    res.json({ data, count: data.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id(\\d+)', (req, res) => {
  try {
    const inc = getIncident(Number(req.params.id));
    if (!inc) return res.status(404).json({ error: 'incident not found' });
    res.json(inc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', validate(createBody), (req, res) => {
  try {
    const reporter = req.user?.username || req.user?.full_name || 'unknown';
    const inc = createIncident({ ...req.body, reporter });
    res.status(201).json(inc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id(\\d+)', validate(patchBody), (req, res) => {
  try {
    const inc = updateIncident(Number(req.params.id), req.body);
    if (!inc) return res.status(404).json({ error: 'incident not found' });
    res.json(inc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id(\\d+)/comments', validate(commentBody), (req, res) => {
  try {
    const author = req.user?.username || req.user?.full_name || 'unknown';
    const inc = addComment(Number(req.params.id), { author, body: req.body.body });
    if (!inc) return res.status(404).json({ error: 'incident not found' });
    res.status(201).json(inc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id(\\d+)', (req, res) => {
  try {
    const ok = deleteIncident(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: 'incident not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
