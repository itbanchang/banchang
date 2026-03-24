// ============================================================
// BCH 360° Intelligence V.10 - IPD Occupancy Sync Job
// 🏥 Phase 2: Real-Time Occupancy Synchronization
// ============================================================
// Syncs current IPD occupancy every 30 minutes
// Caches result for instant API response
// Broadcasts WebSocket updates to connected clients

import cron from 'node-cron';
import { dbQuery } from '../db/mysql.js';
import logger from '../logger.js';

let occupancyCache = {
    lastUpdated: null,
    data: {},
    totalOccupied: 0,
    totalBeds: 0
};

/**
 * Sync current IPD occupancy from ipt table
 * Groups by ward, calculates occupancy metrics
 */
async function syncOccupancy() {
    try {
        logger.info('[OCCUPANCY] Starting sync...');
        
        const occupancy = await dbQuery(`
            SELECT 
                i.an, i.ward, i.cur_bedno,
                DATEDIFF(NOW(), i.regdate) as stay_days,
                p.hn, p.fname, p.lname, TIMESTAMPDIFF(YEAR, p.birthday, NOW()) as age, p.sex,
                i.drg, i.rw, i.dchdate,
                ans.last_sos_score as risk_flag,
                ans.last_bps, ans.last_bpd, ans.last_temperature,
                w.bedcount as ward_total_beds
            FROM ipt i
            JOIN patient p ON i.hn = p.hn
            LEFT JOIN an_stat ans ON i.an = ans.an
            LEFT JOIN ward w ON i.ward = w.ward
            WHERE i.dchdate IS NULL
            ORDER BY i.ward, CAST(i.cur_bedno AS UNSIGNED)
        `);
        
        // Group by ward
        const occupancyByWard = {};
        let totalOccupied = 0;
        let totalBeds = 0;
        
        occupancy.forEach(occ => {
            if (!occupancyByWard[occ.ward]) {
                occupancyByWard[occ.ward] = {
                    ward_code: occ.ward,
                    total_beds: occ.ward_total_beds || 0,
                    patients: []
                };
                totalBeds += occ.ward_total_beds || 0;
            }
            occupancyByWard[occ.ward].patients.push({
                an: occ.an,
                bed_no: occ.cur_bedno,
                stay_days: occ.stay_days,
                hn: occ.hn,
                patient_name: `${occ.fname} ${occ.lname}`,
                age: occ.age,
                sex: occ.sex,
                drg: occ.drg,
                risk_flag: occ.risk_flag
            });
            totalOccupied++;
        });
        
        // Calculate occupancy rates
        const wardSummary = Object.keys(occupancyByWard).map(wardCode => {
            const ward = occupancyByWard[wardCode];
            return {
                ward_code: wardCode,
                total_beds: ward.total_beds,
                occupied: ward.patients.length,
                available: ward.total_beds - ward.patients.length,
                occupancy_rate: ward.total_beds > 0 
                    ? Math.round((ward.patients.length / ward.total_beds) * 100)
                    : 0,
                alert: ward.patients.length > (ward.total_beds * 0.85) ? 'HIGH_OCCUPANCY' : null
            };
        });
        
        // Update cache
        occupancyCache = {
            lastUpdated: new Date(),
            data: occupancyByWard,
            totalOccupied,
            totalBeds,
            summary: wardSummary
        };
        
        logger.info('[OCCUPANCY] Sync complete', {
            totalOccupied,
            totalBeds,
            occupancyRate: totalBeds > 0 ? Math.round((totalOccupied / totalBeds) * 100) : 0,
            wardsCount: Object.keys(occupancyByWard).length
        });
        
        return occupancyCache;
        
    } catch (error) {
        logger.error('[OCCUPANCY] Sync failed', { 
            error: error.message,
            stack: error.stack
        });
        throw error;
    }
}

/**
 * Get cached occupancy data (instant response)
 * Returns null if cache is older than 30 minutes
 */
export function getCachedOccupancy() {
    if (!occupancyCache.lastUpdated) {
        return null;
    }
    
    const timeSinceUpdate = Date.now() - occupancyCache.lastUpdated.getTime();
    const cacheMaxAge = 30 * 60 * 1000;  // 30 minutes
    
    if (timeSinceUpdate > cacheMaxAge) {
        logger.warn('[OCCUPANCY] Cache expired', { 
            ageMinutes: Math.round(timeSinceUpdate / 60000)
        });
        return null;
    }
    
    return occupancyCache;
}

/**
 * Start the occupancy sync job
 * Runs every 30 minutes: 0, 30 of each hour
 * Returns a Promise that resolves after initial sync
 */
export async function startOccupancySyncJob(ioInstance = null) {
    // Run initial sync immediately
    try {
        await syncOccupancy();
        logger.info('[OCCUPANCY] Initial sync completed successfully');
    } catch (error) {
        logger.error('[OCCUPANCY] Initial sync failed', { error: error.message });
    }

    // Run every 30 minutes after that
    const job = cron.schedule('*/30 * * * *', async () => {
        try {
            const updated = await syncOccupancy();
            
            // Broadcast update via WebSocket if available
            if (ioInstance) {
                ioInstance.emit('occupancy_updated', {
                    timestamp: new Date(),
                    totalOccupied: updated.totalOccupied,
                    totalBeds: updated.totalBeds,
                    byWard: updated.summary
                });
                logger.info('[OCCUPANCY] WebSocket broadcast sent', {
                    listeners: ioInstance.engine?.ws?.length ?? 0
                });
            }
        } catch (error) {
            logger.error('[OCCUPANCY] Job execution failed', { error: error.message });
        }
    });
    
    logger.info('[OCCUPANCY] Sync job started (every 30 minutes)');
    return Promise.resolve(job);
}

/**
 * Stop the occupancy sync job
 */
export function stopOccupancySyncJob(job) {
    if (job) {
        job.stop();
        logger.info('[OCCUPANCY] Sync job stopped');
    }
}

/**
 * Force immediate occupancy sync
 * Called manually for urgent updates
 */
export async function forceOccupancySync(ioInstance = null) {
    try {
        const updated = await syncOccupancy();
        
        if (ioInstance) {
            ioInstance.emit('occupancy_updated', {
                timestamp: new Date(),
                totalOccupied: updated.totalOccupied,
                totalBeds: updated.totalBeds,
                byWard: updated.summary,
                forced: true
            });
        }
        
        return updated;
    } catch (error) {
        logger.error('[OCCUPANCY] Force sync failed', { error: error.message });
        throw error;
    }
}

export default {
    syncOccupancy,
    getCachedOccupancy,
    startOccupancySyncJob,
    stopOccupancySyncJob,
    forceOccupancySync
};
