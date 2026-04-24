// ============================================================
// BCH 360° Intelligence V.10 — OpenAPI 3.0 Documentation
// Complete API specification for all 185 endpoints
// ============================================================

const get = (tags, summary, desc, params) => ({
  get: { tags, summary, description: desc, ...(params ? { parameters: params } : {}), responses: { 200: { description: 'Success' } } },
});
const post = (tags, summary, desc) => ({
  post: { tags, summary, description: desc, responses: { 200: { description: 'Success' } } },
});
const qp = (name, type, desc, opts) => ({ name, in: 'query', schema: { type, ...opts }, description: desc });
const pp = (name, desc) => ({ name, in: 'path', required: true, schema: { type: 'string' }, description: desc });

export const apiDocs = {
  openapi: '3.0.0',
  info: {
    title: 'BCH 360° Intelligence API',
    version: '10.0.0',
    description: 'Hospital Intelligence Dashboard API — Ban Chang Hospital. 20+ modules, 185 endpoints, 11 AI engines. Real-time data from HOSxP XE.',
    contact: { name: 'BCH IT Department' },
  },
  servers: [{ url: '/api', description: 'Current server' }],
  tags: [
    { name: 'Auth', description: 'Authentication — login, token refresh, session' },
    { name: 'Dashboard', description: 'Executive dashboard summary' },
    { name: 'OPD', description: 'Outpatient Department — visits, wait times, clinics' },
    { name: 'IPD', description: 'Inpatient Department — admissions, bed occupancy, ALOS, DRG' },
    { name: 'ER', description: 'Emergency Room — triage, patients, bottlenecks' },
    { name: 'Finance', description: 'Revenue, claims, denial analytics, debt aging' },
    { name: 'Pharmacy', description: 'Dispensing, drug analytics, drug safety' },
    { name: 'Lab', description: 'Laboratory — orders, TAT, critical values' },
    { name: 'Xray', description: 'Radiology — imaging workload, capacity' },
    { name: 'Dental', description: 'Dental services' },
    { name: 'ThaiMed', description: 'Thai traditional medicine' },
    { name: 'PT', description: 'Physical therapy / rehabilitation' },
    { name: 'NCD', description: 'Non-communicable disease management (DM, HT, CKD)' },
    { name: 'MedRec', description: 'Medical records — coding quality, chart audit' },
    { name: 'Clinical', description: 'Clinical risk — EWS, vitals, deterioration' },
    { name: 'Quality', description: 'Quality & patient safety — HA indicators' },
    { name: 'Safety', description: 'Patient safety — adverse events, HAI' },
    { name: 'Staffing', description: 'Workforce KPIs — doctors, nurses, ratios' },
    { name: 'AI', description: 'AI engines — EWS, forecast, readmission, DRG, surge, sepsis' },
    { name: 'KPI', description: 'Extended KPI — BSC, operations, supply chain' },
    { name: 'Executive', description: 'Executive reports — benchmark, export' },
    { name: 'CustomerInsight', description: 'Patient segmentation, screening, payer mix' },
    { name: 'Evolution', description: 'System evolution & learning journal' },
    { name: 'Report', description: 'Data export and warehouse trends' },
    { name: 'Infra', description: 'Infrastructure — cache, jobs, logs' },
    { name: 'System', description: 'System health, server management' },
  ],
  paths: {
    // ━━━ Auth ━━━
    '/auth/login':          post(['Auth'], 'Login', 'Authenticate with username/password. Returns httpOnly JWT cookies.'),
    '/auth/refresh':        post(['Auth'], 'Refresh token', 'Rotate access token using refresh cookie.'),
    '/auth/auto-session':   post(['Auth'], 'Auto-session', 'Dashboard viewer kiosk bypass (dev mode).'),
    '/auth/logout':         post(['Auth'], 'Logout', 'Clear session cookies.'),
    '/auth/me':             get(['Auth'], 'Current user', 'Get authenticated user profile.'),

    // ━━━ Dashboard ━━━
    '/dashboard/summary':           get(['Dashboard'], 'Dashboard summary', 'All KPIs in one response: finance, OPD, IPD, ER, beds, clinical, staff.'),
    '/dashboard/resource-elasticity': get(['Dashboard'], 'Resource elasticity', 'Bed, staff, supply utilization metrics.'),

    // ━━━ OPD ━━━
    '/opd/today':               get(['OPD'], 'OPD today', 'Real-time: visits, wait times, SLA, demographics, staff, hourly, patients.'),
    '/opd/by-clinic':           get(['OPD'], 'By clinic', 'Wait times grouped by clinic (today).'),
    '/opd/wait-trend':          get(['OPD'], '7-day wait trend', 'Daily visit counts and wait times for past 7 days.'),
    '/opd/monthly-fiscal':      get(['OPD'], 'Monthly fiscal', 'Monthly visits and wait times (current fiscal year Oct-Sep).'),
    '/opd/revenue-fiscal':      get(['OPD', 'Finance'], 'OPD revenue fiscal', '3-year revenue comparison.', [qp('start','string','Start date'), qp('end','string','End date')]),
    '/opd/drilldown':           get(['OPD'], 'OPD drill-down', 'Detailed drill-down.', [qp('type','string','Metric type',{enum:['wait','clinic','revenue','readmit','revisit']})]),
    '/opd/opd-daterange':       get(['OPD'], 'OPD date range', 'Historical OPD data.', [qp('start_date','string','Start'), qp('end_date','string','End')]),
    '/opd/opd-compare-daterange': get(['OPD'], 'Period comparison', 'Compare two date ranges.'),
    '/opd/today-patients':      get(['OPD'], 'Current patients', 'Live patient queue.'),
    '/opd/ai/flow-prediction':  get(['OPD', 'AI'], 'AI flow prediction', 'ML-based patient flow forecast.'),
    '/opd/ai/wait-optimizer':   get(['OPD', 'AI'], 'AI wait optimizer', 'Recommendations to reduce wait times.'),

    // ━━━ IPD ━━━
    '/ipd/bed-occupancy':       get(['IPD'], 'Bed occupancy', 'Current occupancy by ward.'),
    '/ipd/admissions':          get(['IPD'], 'Active admissions', 'Currently admitted patients.', [qp('ward_id','string','Ward filter')]),
    '/ipd/alos':                get(['IPD'], 'ALOS', 'Average Length of Stay by DRG/ward.', [qp('year','integer','Year (CE or BE)'), qp('ward_id','string','Ward')]),
    '/ipd/analytics':           get(['IPD'], 'IPD analytics', 'WEI, bed turnover, CMI, readmission, mortality, acuity, staff.'),
    '/ipd/cmi':                 get(['IPD'], 'Case Mix Index', 'CMI by ward and DRG.'),
    '/ipd/revenue-fiscal':      get(['IPD', 'Finance'], 'IPD revenue fiscal', '3-year IPD revenue from an_stat.', [qp('start','string','Start'), qp('end','string','End')]),
    '/ipd/occupancy-now':       get(['IPD'], 'Real-time occupancy', 'Instant occupancy from background sync.'),
    '/ipd/drilldown':           get(['IPD'], 'IPD drill-down', 'Deep analysis.', [qp('type','string','Type',{enum:['beds','readmit','alos','cmi','mortality']})]),
    '/ipd/high-risk-patients':  get(['IPD'], 'High-risk patients', 'NEWS2 filtered patients.', [qp('limit','integer','Limit',{default:50}), qp('offset','integer','Offset')]),
    '/ipd/discharge-planning':  get(['IPD'], 'Discharge planning', 'Discharge readiness and barriers.'),
    '/ipd/mortality-risk':      get(['IPD'], 'Mortality risk', 'Death risk scoring.'),
    '/ipd/drg-optimization':    get(['IPD'], 'DRG optimization', 'Revenue optimization suggestions.'),
    '/ipd/bed-flow':            get(['IPD'], 'Bed flow', 'Admission/discharge flow.'),
    '/ipd/:an/vitals-history':  get(['IPD'], 'Vitals history', 'Historical vitals for admission.', [pp('an','Admission number')]),

    // ━━━ ER ━━━
    '/er/today':            get(['ER'], 'ER today', 'Summary + triage + patients + bottlenecks in one call.'),
    '/er/today-patients':   get(['ER'], 'ER patients', 'Current ER patients with AI admission prediction.'),
    '/er/triage-stats':     get(['ER'], 'Triage stats', 'Triage category breakdown.'),
    '/er/flow-bottlenecks': get(['ER'], 'Flow bottlenecks', 'Lab/xray TAT analysis.'),
    '/er/analytics':        get(['ER'], 'ER 30-day analytics', 'TTD, LWBS, SLA, disposition, trends, diagnoses.'),
    '/er/diversion-status': get(['ER'], 'Diversion status', 'ER diversion on/off.'),
    '/er/revenue-fiscal':   get(['ER', 'Finance'], 'ER revenue fiscal', '3-year ER revenue.'),

    // ━━━ Finance ━━━
    '/finance/monthly-summary':     get(['Finance'], 'Monthly summary', 'Revenue/expense/profit by month.', [qp('year','integer','Year (CE or BE, auto-converts)')]),
    '/finance/revenue-fiscal':      get(['Finance'], 'Revenue fiscal', 'Hospital-wide 3-year revenue.'),
    '/finance/revenue-by-payer-fiscal': get(['Finance'], 'Revenue by payer', '3-year revenue by insurance type.'),
    '/finance/claims':              get(['Finance'], 'Claims list', 'Insurance claims.', [qp('limit','integer','Limit'), qp('offset','integer','Offset'), qp('dateFrom','string','From'), qp('dateTo','string','To')]),
    '/finance/debt-aging':          get(['Finance'], 'Debt aging', 'Debt aging analysis.', [qp('bucket','string','Bucket',{enum:['0-30_days','31-60_days','61-90_days','>90_days']})]),
    '/finance/debt-aging/details':  get(['Finance'], 'Debt aging details', 'Detailed debtor list.'),
    '/finance/debt-aging/record-payment': post(['Finance'], 'Record payment', 'Record debtor payment.'),
    '/finance/denial-analytics':    get(['Finance'], 'Denial analytics', 'Denial reasons analysis.'),
    '/finance/ppfs-comparison':     get(['Finance'], 'PPFS comparison', 'Promotion & Prevention benchmarking.', [qp('type','string','Type',{enum:['activity','revenue','los']})]),
    '/finance/revenue-leakage':     get(['Finance'], 'Revenue leakage', 'Underbilling analysis.'),
    '/finance/predict-denial':      post(['Finance'], 'Predict denial', 'ML denial prediction.'),

    // ━━━ Pharmacy ━━━
    '/pharmacy/today':          get(['Pharmacy'], 'Pharmacy today', 'Dispensing counts, top drugs, on-duty staff.'),
    '/pharmacy/analytics':      get(['Pharmacy'], 'Pharmacy analytics', 'PPI, generic ratio, trends.'),
    '/pharmacy/revenue-fiscal': get(['Pharmacy', 'Finance'], 'Drug revenue fiscal', '3-year drug revenue.'),
    '/pharmacy/top-drugs':      get(['Pharmacy'], 'Top drugs', 'Top drugs by value/volume.', [qp('start','string','Start'), qp('end','string','End')]),
    '/pharmacy/drug-safety/check/:hn': get(['Pharmacy'], 'Drug interaction check', 'DDI check for patient.', [pp('hn','Hospital number')]),
    '/pharmacy/optimization':   get(['Pharmacy', 'AI'], 'Pharmacy optimization', 'AI efficiency recommendations.'),

    // ━━━ Lab ━━━
    '/lab/today':           get(['Lab'], 'Lab today', 'Daily workload, critical values.'),
    '/lab/optimization':    get(['Lab', 'AI'], 'Lab optimization', 'Efficiency metrics.'),
    '/lab/revenue-fiscal':  get(['Lab', 'Finance'], 'Lab revenue fiscal', '3-year lab data.'),

    // ━━━ Xray ━━━
    '/xray/today':          get(['Xray'], 'Xray today', 'Imaging daily volume.'),
    '/xray/optimization':   get(['Xray', 'AI'], 'Xray optimization', 'Capacity optimization.'),
    '/xray/revenue-fiscal': get(['Xray', 'Finance'], 'Xray revenue fiscal', '3-year imaging data.'),

    // ━━━ Dental ━━━
    '/dental/today':            get(['Dental'], 'Dental today', 'Cases, wait times, diagnoses.'),
    '/dental/analytics':        get(['Dental'], 'Dental analytics', '30-day analytics.'),
    '/dental/optimization':     get(['Dental', 'AI'], 'Dental optimization', 'Operatory utilization.'),
    '/dental/revenue-fiscal':   get(['Dental', 'Finance'], 'Dental revenue fiscal', '3-year dental revenue.'),

    // ━━━ ThaiMed ━━━
    '/thaimedicine/today':          get(['ThaiMed'], 'ThaiMed today', 'Daily visits, procedures.'),
    '/thaimedicine/analytics':      get(['ThaiMed'], 'ThaiMed analytics', '30-day analytics.'),
    '/thaimedicine/optimization':   get(['ThaiMed', 'AI'], 'ThaiMed optimization', 'Service optimization.'),
    '/thaimedicine/revenue-fiscal': get(['ThaiMed', 'Finance'], 'ThaiMed revenue fiscal', '3-year revenue.'),

    // ━━━ PT ━━━
    '/physicaltherapy/today':          get(['PT'], 'PT today', 'Daily sessions.'),
    '/physicaltherapy/analytics':      get(['PT'], 'PT analytics', '30-day analytics.'),
    '/physicaltherapy/optimization':   get(['PT', 'AI'], 'PT optimization', 'Therapy optimization.'),
    '/physicaltherapy/revenue-fiscal': get(['PT', 'Finance'], 'PT revenue fiscal', '3-year revenue.'),

    // ━━━ NCD ━━━
    '/ncd/today':           get(['NCD'], 'NCD today', 'Chronic disease visits (DM, HT, CKD, COPD).'),
    '/ncd/analytics':       get(['NCD'], 'NCD analytics', '30-day analytics.'),
    '/ncd/revenue-fiscal':  get(['NCD', 'Finance'], 'NCD revenue fiscal', '3-year NCD revenue.'),

    // ━━━ MedRec ━━━
    '/medrec/today':            get(['MedRec'], 'MedRec today', 'OPD/IPD coding quality, coder performance, DRG analysis.'),
    '/medrec/analytics':        get(['MedRec'], 'MedRec analytics', 'Coding trend analysis.'),
    '/medrec/revenue-fiscal':   get(['MedRec', 'Finance'], 'MedRec revenue fiscal', 'Hospital-wide revenue.'),

    // ━━━ Clinical ━━━
    '/clinical/patients':       get(['Clinical'], 'Clinical patients', 'High-risk patient list.'),
    '/clinical/vitals/:patient_id': get(['Clinical'], 'Patient vitals', 'Vital signs.', [pp('patient_id','Patient ID')]),
    '/clinical/risk-distribution': get(['Clinical'], 'Risk distribution', 'Risk level breakdown.'),
    '/clinical/calculate-ews':  post(['Clinical'], 'Calculate EWS', 'Manual NEWS2 score.'),
    '/clinical/clinical-insights': get(['Clinical'], 'Clinical insights', 'Professional insights.'),

    // ━━━ Quality ━━━
    '/quality/today':       get(['Quality'], 'Quality today', 'Daily quality metrics.'),
    '/quality/prediction':  get(['Quality', 'AI'], 'Quality prediction', 'KPI forecast.'),
    '/quality/alerts':      get(['Quality'], 'Quality alerts', 'Active quality alerts.'),
    '/quality/revenue-fiscal': get(['Quality', 'Finance'], 'Quality revenue fiscal', 'Discharge data.'),

    // ━━━ Safety ━━━
    '/safety/today':            get(['Safety'], 'Safety today', 'Adverse events, HAI, falls, ADR.'),
    '/safety/analytics':        get(['Safety'], 'Safety analytics', 'Safety trend analysis.'),
    '/safety/revenue-fiscal':   get(['Safety', 'Finance'], 'Safety revenue fiscal', 'Safety-related fiscal data.'),

    // ━━━ Staffing ━━━
    '/staffing/today':          get(['Staffing'], 'Staffing today', 'Doctors, nurses (OPD+IPD), pharmacists, lab techs, ratios.'),
    '/staffing/analytics':      get(['Staffing'], 'Staffing analytics', '30-day productivity trends.'),
    '/staffing/revenue-fiscal': get(['Staffing'], 'Staffing revenue fiscal', 'N/A — returns empty.'),

    // ━━━ AI ━━━
    '/ai/ews/summary':      get(['AI'], 'EWS summary', 'NEWS2 critical/high/medium/low counts + alerts.'),
    '/ai/ews/patients':     get(['AI'], 'EWS patients', 'Filtered patient EWS list.', [qp('ward','string','Ward'), qp('level','string','Risk level',{enum:['low','medium','high','critical']})]),
    '/ai/ews/calculate':    post(['AI'], 'Calculate EWS', 'Manual NEWS2 score calculation.'),
    '/ai/forecast/revenue': get(['AI'], 'Revenue forecast', 'Holt-Winters monthly revenue forecast.', [qp('months','integer','Months ahead (1-60)')]),
    '/ai/forecast/by-payer': get(['AI'], 'Forecast by payer', 'Revenue forecast by insurance type.'),
    '/ai/readmission':      get(['AI'], 'Readmission risk', 'LACE readmission scoring.'),
    '/ai/bed-demand':       get(['AI'], 'Bed demand', 'Ward occupancy prediction.'),
    '/ai/drg-optimizer':    get(['AI'], 'DRG optimizer', 'Case mix optimization.'),
    '/ai/er-surge':         get(['AI'], 'ER surge', 'ED arrival prediction.'),
    '/ai/insights':         get(['AI'], 'AI insights', 'Role-based AI insights.'),
    '/ai/anomalies':        get(['AI'], 'Anomalies', 'Unusual pattern detection.'),

    // ━━━ KPI ━━━
    '/kpi/operations':      get(['KPI'], 'Operations KPI', 'Operational metrics.'),
    '/kpi/supply-chain':    get(['KPI'], 'Supply chain', 'Supply chain analytics.'),
    '/kpi/financial-deep':  get(['KPI'], 'Financial deep', 'Deep financial KPIs.'),
    '/kpi/bsc':             get(['KPI'], 'Balanced Scorecard', 'BSC framework.'),

    // ━━━ Executive ━━━
    '/executive/benchmark':     get(['Executive'], 'Benchmark', 'Peer hospital benchmarking.'),
    '/executive/report':        get(['Executive'], 'Executive report', 'Summary report.'),
    '/executive/bsc':           get(['Executive'], 'Executive BSC', 'BSC for executives.'),
    '/executive/export/:dataset': get(['Executive'], 'Export dataset', 'Export to Excel/CSV.', [pp('dataset','Dataset name'), qp('months','integer','Months')]),

    // ━━━ Customer Insight ━━━
    '/customer-insight/screening-summary': get(['CustomerInsight'], 'Screening summary', '3 fiscal years screening overview.'),
    '/customer-insight/top-diagnosis':     get(['CustomerInsight'], 'Top diagnosis', 'Top ICD-10 current fiscal year.', [qp('limit','integer','Limit'), qp('pttype','string','Insurance type')]),
    '/customer-insight/monthly-trend':     get(['CustomerInsight'], 'Monthly trend', '3 fiscal years monthly revenue trend.'),

    // ━━━ Evolution ━━━
    '/evolution/evolution':     get(['Evolution'], 'Evolution log', 'System change history.'),
    '/evolution/learning':      get(['Evolution'], 'Learning journal', 'AI learning events.'),
    '/evolution/learning/stats': get(['Evolution'], 'Learning stats', 'Learning effectiveness.'),

    // ━━━ Report / Warehouse ━━━
    '/report/warehouse/daily-trend':    get(['Report'], 'Daily trend', 'Daily KPI trends.', [qp('months','integer','Months (1-120)')]),
    '/report/warehouse/revenue-trend':  get(['Report'], 'Revenue trend', 'Revenue trends.'),
    '/report/warehouse/ipd-trend':      get(['Report'], 'IPD trend', 'IPD trends.'),
    '/report/warehouse/er-trend':       get(['Report'], 'ER trend', 'ER trends.'),
    '/report/warehouse/yoy':            get(['Report'], 'Year-over-year', 'YoY comparison.', [qp('years','integer','Years (1-20)')]),
    '/report/warehouse/stats':          get(['Report'], 'Warehouse stats', 'Data warehouse summary.'),

    // ━━━ Infrastructure ━━━
    '/infra/status':    get(['Infra'], 'Infra status', 'Cache, job queue, log stats.'),
    '/infra/cache':     get(['Infra'], 'Cache stats', 'Cache hit/miss rates.'),
    '/infra/jobs':      get(['Infra'], 'Job status', 'Background job queue.'),
    '/infra/jobs/:name/trigger': post(['Infra'], 'Trigger job', 'Manually trigger a job.'),
    '/infra/logs':      get(['Infra'], 'Query logs', 'Search centralized logs.'),

    // ━━━ System ━━━
    '/system/status':           get(['System'], 'System status', 'Health, version, uptime.'),
    '/system/servers':          get(['System'], 'DB servers', 'Database server list.'),
    '/system/servers/switch':   post(['System'], 'Switch server', 'Switch active database.'),
    '/system/servers/test':     post(['System'], 'Test server', 'Test database connection.'),
    '/system/mv-status':        get(['System'], 'MV status', 'Materialized view status.'),
    '/system/mv-refresh':       post(['System'], 'MV refresh', 'Force materialized view refresh.'),
    '/system/calibration':      get(['System'], 'Calibration', 'AI calibration metadata.'),
    '/system/calibration/run':  post(['System'], 'Run calibration', 'Trigger full recalibration.'),
    '/system/health/detailed':  get(['System'], 'Detailed health', 'Detailed system health check.'),

    // ━━━ Meta ━━━
    '/docs':            get(['System'], 'API docs', 'This OpenAPI 3.0 specification.'),
    '/health':          get(['System'], 'Health check', 'Quick health: status, mysql, latency.'),
  },

  components: {
    schemas: {
      OPDToday: { type: 'object', properties: { data_source: { type: 'string' }, today_total: { type: 'integer' }, completed: { type: 'integer' }, sla_pct: { type: 'number' }, median_wait: { type: 'integer' }, p90_wait: { type: 'integer' }, throughput: { type: 'integer' } } },
      IPDAnalytics: { type: 'object', properties: { wei: { type: 'integer' }, cmi: { type: 'number' }, readmit_rate: { type: 'number' }, mortality_rate: { type: 'number' } } },
      ERToday: { type: 'object', properties: { total: { type: 'integer' }, critical: { type: 'integer' }, waiting: { type: 'integer' }, avg_ttd_min: { type: 'number' }, triage: { type: 'array' }, patients: { type: 'array' }, bottlenecks: { type: 'object' } } },
      FinanceSummary: { type: 'object', properties: { year: { type: 'integer' }, monthly: { type: 'array' }, summary: { type: 'object' } } },
      FiscalRevenue: { type: 'object', properties: { fiscal_years: { type: 'array' }, timestamp: { type: 'string' } } },
    },
    securitySchemes: {
      cookieAuth: { type: 'apiKey', in: 'cookie', name: 'access_token', description: 'httpOnly JWT cookie from /api/auth/login' },
    },
  },
  security: [{ cookieAuth: [] }],
};
