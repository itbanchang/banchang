// ============================================================
// BCH 360° Intelligence V.10 — AI Routes: Main Index
// Aggregates all sub-route modules into a single Express Router
// Replaces the monolithic 1578-line ai_routes.js
// ============================================================
import { Router } from 'express';
import coreRouter from './core.js';
import clinicalRouter from './clinical.js';
import departmentsRouter from './departments.js';

const router = Router();

// Core AI modules (EWS, Forecast, Readmission, Bed Demand, Hub...)
router.use('/', coreRouter);

// Clinical Intelligence (Sepsis, Deterioration, Labs, Acuity, Mortality...)
router.use('/', clinicalRouter);

// Department Optimization (OPD, IPD, ER, Finance, NCD, MedRec...)
router.use('/', departmentsRouter);

export default router;
