// ============================================================
// BCH 360° Intelligence V.10 — Master Data Cache
// Pre-loads small lookup tables into memory Maps for instant access.
// Eliminates repeated LEFT JOINs to icd101, ward, clinic, doctor,
// drugitems, kskdepartment, pttype across 28+ route files.
// ============================================================
import { dbQuery } from '../db/mysql.js';
import logger from '../logger.js';

// ── In-Memory Maps ──
const _cache = {
  icd10:      new Map(),  // code → { code, name }
  ward:       new Map(),  // ward → { ward, name, shortname, bedcount }
  clinic:     new Map(),  // clinic → { clinic, name }
  doctor:     new Map(),  // code → { code, name, licenseno }
  department: new Map(),  // depcode → { depcode, department }
  pttype:     new Map(),  // pttype → { pttype, name }
  drugitems:  new Map(),  // icode → { icode, name, generic_name, unitprice, units }
};

const _meta = {
  lastRefresh: null,
  refreshCount: 0,
  errors: [],
};

let _initialized = false;
let _refreshTimer = null;

// ── Refresh Intervals ──
const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour for all master data

// ── Load Functions ──
async function _loadTable(name, sql, keyFn) {
  try {
    const rows = await dbQuery(sql);
    const map = _cache[name];
    map.clear();
    for (const row of rows) {
      map.set(keyFn(row), row);
    }
    return rows.length;
  } catch (err) {
    logger.warn(`[MasterData] Failed to load ${name}`, { error: err.message });
    _meta.errors.push({ table: name, error: err.message, at: new Date().toISOString() });
    return 0;
  }
}

/**
 * Initialize all master data caches. Call once on server startup.
 */
export async function initMasterData() {
  if (_initialized) return;
  const start = Date.now();

  const counts = await Promise.all([
    _loadTable('icd10', `SELECT code, name, tname FROM icd101`, r => r.code),
    _loadTable('ward', `SELECT ward, name, shortname, bedcount, real_bedcount FROM ward WHERE ward_active = 'Y'`, r => r.ward),
    _loadTable('clinic', `SELECT clinic, name FROM clinic`, r => r.clinic),
    _loadTable('doctor', `SELECT code, name, licenseno FROM doctor WHERE active = 'Y'`, r => r.code),
    _loadTable('department', `SELECT depcode, department FROM kskdepartment`, r => r.depcode),
    _loadTable('pttype', `SELECT pttype, name FROM pttype`, r => r.pttype),
    _loadTable('drugitems', `SELECT icode, name, generic_name, unitprice, units FROM drugitems`, r => r.icode),
  ]);

  const names = ['icd10', 'ward', 'clinic', 'doctor', 'department', 'pttype', 'drugitems'];
  const summary = names.map((n, i) => `${n}=${counts[i]}`).join(' ');

  _meta.lastRefresh = new Date().toISOString();
  _meta.refreshCount++;
  _initialized = true;

  logger.info(`[MasterData] Loaded in ${Date.now() - start}ms — ${summary}`);

  // Schedule periodic refresh
  if (!_refreshTimer) {
    _refreshTimer = setInterval(async () => {
      const s = Date.now();
      await Promise.all([
        _loadTable('icd10', `SELECT code, name, tname FROM icd101`, r => r.code),
        _loadTable('ward', `SELECT ward, name, shortname, bedcount, real_bedcount FROM ward WHERE ward_active = 'Y'`, r => r.ward),
        _loadTable('clinic', `SELECT clinic, name FROM clinic`, r => r.clinic),
        _loadTable('doctor', `SELECT code, name, licenseno FROM doctor WHERE active = 'Y'`, r => r.code),
        _loadTable('department', `SELECT depcode, department FROM kskdepartment`, r => r.depcode),
        _loadTable('pttype', `SELECT pttype, name FROM pttype`, r => r.pttype),
        _loadTable('drugitems', `SELECT icode, name, generic_name, unitprice, units FROM drugitems`, r => r.icode),
      ]);
      _meta.lastRefresh = new Date().toISOString();
      _meta.refreshCount++;
      logger.info(`[MasterData] Refreshed in ${Date.now() - s}ms`);
    }, REFRESH_INTERVAL_MS);
  }
}

// ── Lookup Functions (instant, no DB query) ──

/** Get ICD-10 diagnosis name by code (English) */
export function getICD10Name(code) {
  return _cache.icd10.get(code)?.name || null;
}

/** Get ICD-10 diagnosis Thai name by code */
export function getICD10TName(code) {
  return _cache.icd10.get(code)?.tname || null;
}

/** Get ward info by ward code */
export function getWard(wardCode) {
  return _cache.ward.get(wardCode) || null;
}

/** Get ward name by ward code */
export function getWardName(wardCode) {
  return _cache.ward.get(wardCode)?.name || null;
}

/** Get clinic name by clinic code */
export function getClinicName(clinicCode) {
  return _cache.clinic.get(clinicCode)?.name || null;
}

/** Get doctor name by doctor code */
export function getDoctorName(doctorCode) {
  return _cache.doctor.get(doctorCode)?.name || null;
}

/** Get department name by depcode */
export function getDeptName(depcode) {
  return _cache.department.get(depcode)?.department || null;
}

/** Get payer type name by pttype code */
export function getPtypeName(pttype) {
  return _cache.pttype.get(pttype)?.name || null;
}

/** Get drug info by icode */
export function getDrug(icode) {
  return _cache.drugitems.get(icode) || null;
}

/** Get drug name by icode */
export function getDrugName(icode) {
  return _cache.drugitems.get(icode)?.name || null;
}

/**
 * Enrich an array of rows with master data lookups.
 * Avoids LEFT JOINs in SQL — join in JS instead.
 * @param {Array} rows - Query result rows
 * @param {Object} mappings - { targetField: { source: 'sourceField', lookup: lookupFn } }
 * @returns {Array} Enriched rows
 * @example
 *   enrichRows(rows, {
 *     ward_name: { source: 'ward', lookup: getWardName },
 *     dx_name:   { source: 'icd10', lookup: getICD10Name },
 *   })
 */
export function enrichRows(rows, mappings) {
  if (!rows?.length) return rows;
  return rows.map(row => {
    const enriched = { ...row };
    for (const [target, { source, lookup }] of Object.entries(mappings)) {
      if (row[source] != null) {
        enriched[target] = lookup(row[source]) || enriched[target] || null;
      }
    }
    return enriched;
  });
}

/** Get all cached data sizes for health/debug endpoint */
export function getMasterDataStatus() {
  return {
    sizes: {
      icd10: _cache.icd10.size,
      ward: _cache.ward.size,
      clinic: _cache.clinic.size,
      doctor: _cache.doctor.size,
      department: _cache.department.size,
      pttype: _cache.pttype.size,
      drugitems: _cache.drugitems.size,
    },
    lastRefresh: _meta.lastRefresh,
    refreshCount: _meta.refreshCount,
    refreshIntervalMs: REFRESH_INTERVAL_MS,
    initialized: _initialized,
    recentErrors: _meta.errors.slice(-5),
  };
}
