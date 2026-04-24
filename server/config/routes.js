// ============================================================
// BCH 360° Intelligence V.10 — Route Registration
// All route mounting with RBAC, audit middleware
// ============================================================
import financeRoutes from '../routes/finance.js';
import ipdRoutes from '../routes/ipd.js';
import clinicalRoutes from '../routes/clinical.js';
import authRoutes from '../routes/auth.js';
import opdRoutes from '../routes/opd.js';
import aiRoutes from '../routes/ai/index.js'; // Modular (was ai_routes.js 92KB)
import erRoutes from '../routes/er.js';
import dentalRoutes from '../routes/dental.js';
import thaimedRoutes from '../routes/thaimedicine.js';
import ptRoutes from '../routes/physicaltherapy.js';
import ncdRoutes from '../routes/ncd.js';
import medrecRoutes from '../routes/medrec.js';
import debugRoutes from '../routes/debug.js';
import xrayRoutes from '../routes/xray.js';
import pharmacyRoutes from '../routes/pharmacy.js';
import labRoutes from '../routes/laboratory.js';
import qualityRoutes from '../routes/quality.js';
import evolutionRoutes from '../routes/evolution.js';
import executiveRoutes from '../routes/executive.js';
import reportRoutes from '../routes/report.js';
import customerInsightRoutes from '../routes/customerInsight.js';
import staffingRoutes from '../routes/staffing.js';
import safetyRoutes from '../routes/safety.js';
import kpiExtendedRoutes from '../routes/kpiExtended.js';
import infraRoutes from '../routes/infrastructure.js';
import doctorActivityRoutes from '../routes/doctorActivity.js';
import { authenticate, authorize } from '../middleware/rbac.js';
import { auditMiddleware } from '../middleware/audit.js';

export function registerRoutes(app) {
  // Public routes (before authenticate middleware)
  app.use('/api/auth', authRoutes);

  // All routes below require a valid JWT token
  app.use('/api', authenticate);

  // Protected routes with RBAC + audit
  app.use('/api/finance', auditMiddleware('financial_data'), authorize('finance'), financeRoutes);
  app.use('/api/ipd', auditMiddleware('ward_info'), authorize('ipd'), ipdRoutes);
  app.use('/api/clinical', auditMiddleware('clinical_risk'), authorize('clinical'), clinicalRoutes);
  app.use('/api/opd', auditMiddleware('patient_info'), authorize('opd'), opdRoutes);
  app.use('/api/er', auditMiddleware('patient_info'), authorize('er'), erRoutes);
  app.use('/api/dental', auditMiddleware('patient_info'), authorize('dental'), dentalRoutes);
  app.use(
    '/api/thaimedicine',
    auditMiddleware('patient_info'),
    authorize('thaimed'),
    thaimedRoutes
  );
  app.use(
    '/api/physicaltherapy',
    auditMiddleware('patient_info'),
    authorize('phystherapy'),
    ptRoutes
  );
  app.use('/api/ncd', auditMiddleware('patient_info'), authorize('ncd'), ncdRoutes);
  app.use('/api/medrec', auditMiddleware('patient_info'), authorize('medrec'), medrecRoutes);
  app.use('/api/xray', auditMiddleware('patient_info'), authorize('xray'), xrayRoutes);
  app.use('/api/pharmacy', auditMiddleware('patient_info'), authorize('pharmacy'), pharmacyRoutes);
  app.use('/api/lab', auditMiddleware('patient_info'), authorize('lab'), labRoutes);
  app.use('/api/quality', auditMiddleware('patient_info'), authorize('quality'), qualityRoutes);
  app.use('/api/ai', auditMiddleware('clinical_risk'), authorize('ai'), aiRoutes);
  app.use('/api/evolution', auditMiddleware('operational'), evolutionRoutes);
  app.use(
    '/api/executive',
    auditMiddleware('executive_data'),
    authorize('finance'),
    executiveRoutes
  );
  app.use('/api/report', auditMiddleware('operational'), authorize('finance'), reportRoutes);
  app.use(
    '/api/customer-insight',
    auditMiddleware('operational'),
    authorize('finance'),
    customerInsightRoutes
  );
  app.use('/api/staffing', auditMiddleware('operational'), authorize('clinical'), staffingRoutes);
  app.use('/api/safety', auditMiddleware('patient_safety'), authorize('clinical'), safetyRoutes);
  app.use('/api/kpi', auditMiddleware('operational'), authorize('finance'), kpiExtendedRoutes);
  app.use('/api/doctor', auditMiddleware('operational'), authorize('clinical'), doctorActivityRoutes);
  app.use('/api/infra', authorize('admin'), infraRoutes);
  app.use('/api/debug', authorize('admin'), debugRoutes);
}
