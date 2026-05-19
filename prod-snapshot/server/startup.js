// ============================================================
// BCH 360° Intelligence V.10 — Background Startup Tasks
// DataLake, MV, DW, Self-Heal, Archival, Jobs
// ============================================================
import logger from './logger.js';
import { initDataLake, archiveSnapshot } from './db/dataLake.js';
import { initMaterializedViews, getMV } from './db/materializedViews.js';
import dw from './db/dataWarehouse.js';
import hosxp from './db/hosxpIntegration.js';
import { startAlertEngine, stopAlertEngine } from './monitoring/alerts.js';
import { startCalibrationEngine, stopCalibrationEngine } from './ai/calibration.js';
import { registerJob, startAllJobs } from './infra/jobQueue.js';
import { startOccupancySyncJob } from './jobs/occupancySync.js';
import { startDrugMonthlySync } from './jobs/drugMonthlySync.js';
import { initMasterData } from './cache/masterData.js';

// Track all intervals for cleanup on shutdown
const _intervals = [];

export async function startBackgroundServices(io) {
  // Wire self-heal WebSocket notifications
  try {
    const { setSelfHealSocket } = await import('./ai/selfHeal.js');
    setSelfHealSocket(io);
  } catch {}

  // Alert Engine (every 60s)
  startAlertEngine(60_000);

  // AI Calibration Engine (every 24h)
  startCalibrationEngine(24 * 60 * 60 * 1000);

  // Infrastructure status
  console.log(`   - Cache: In-Memory`);
  console.log(`   - Job Queue: node-cron (local)`);

  // Background initializations (non-blocking)
  setImmediate(async () => {
    try {
      await initDataLake();

      // Master Data Cache (ICD-10, Ward, Clinic, Doctor, Drug, etc.)
      initMasterData().catch(e => {
        logger.warn('MasterData Init Error', { error: e.message });
      });

      // Materialized Views
      initMaterializedViews().catch(e => {
        logger.warn('MV Background Init Error', { error: e.message });
      });

      // Data Warehouse (SQLite)
      try {
        dw.initDataWarehouse();
        const { seedEvolutionIfEmpty } = await import('./db/evolutionStore.js');
        seedEvolutionIfEmpty();
      } catch (e) {
        logger.warn('DW Background Init Error', { error: e.message });
      }

      // Self-Healing health check every 5 minutes
      _intervals.push(
        setInterval(
          async () => {
            try {
              const { runHealthCheck } = await import('./ai/selfHeal.js');
              const health = await runHealthCheck();
              if (health.status !== 'healthy') {
                logger.warn(`[SelfHeal] Health: ${health.status}`, {
                  issues: health.issues.length,
                });
              }
            } catch (e) {
              logger.warn('[SelfHeal] Health check error', { error: e?.message });
            }
          },
          5 * 60 * 1000
        )
      );

      // Automated archiving jobs
      const archiveJobs = () => {
        setImmediate(async () => {
          try {
            const summary = await hosxp.getDashboardSummary();
            await archiveSnapshot('dashboard_summary', summary);
            try {
              dw.archiveDailySnapshot(summary);
              const mvIPD = getMV('mv_ipd_summary');
              if (mvIPD?.length) dw.archiveIPDMonthly(mvIPD);
              const mvER = getMV('mv_er_daily');
              if (mvER?.length) {
                const todayER = mvER.find(
                  r => r.vstdate === new Date().toISOString().split('T')[0]
                );
                if (todayER) dw.archiveERDaily(todayER);
              }
              const mvRevenue = getMV('mv_monthly_dept_revenue');
              if (mvRevenue?.length) dw.archiveMonthlyRevenue(mvRevenue);
            } catch (dwErr) {
              logger.warn('DW archive job failed', { error: dwErr.message });
            }
          } catch (e) {
            logger.warn('Daily archive snapshot failed', { error: e.message });
          }
        });
      };
      archiveJobs();
      _intervals.push(setInterval(archiveJobs, 24 * 60 * 60 * 1000));

      // IPD Occupancy Sync Job (every 30 min)
      try {
        startOccupancySyncJob(io).catch(err => {
          logger.warn('Occupancy sync startup error', { error: err.message });
        });
      } catch (occErr) {
        logger.warn('Failed to start occupancy sync job', { error: String(occErr) });
      }

      // Drug Monthly Sync (pre-aggregate opitemrece → SQLite)
      try {
        startDrugMonthlySync();
      } catch (drugErr) {
        logger.warn('Failed to start drug monthly sync', { error: String(drugErr) });
      }

      // Register background jobs with distributed queue
      registerJob(
        'health_check',
        async () => {
          const { runHealthCheck } = await import('./ai/selfHeal.js');
          return runHealthCheck();
        },
        { cron: '*/5 * * * *', description: 'Self-healing health check', runOnStart: false }
      );

      registerJob(
        'daily_archive',
        async () => {
          const summary = await hosxp.getDashboardSummary();
          await archiveSnapshot('dashboard_summary', summary);
          dw.archiveDailySnapshot(summary);
          return { archived: true };
        },
        { cron: '0 2 * * *', description: 'Daily data archival (2 AM)', runOnStart: false }
      );

      startAllJobs().catch(e => logger.warn('Job queue start error', { error: e.message }));

      console.log('\nAll background analytical processes started.');
    } catch (initErr) {
      console.error('Lazy Boot Background Init Failed:', initErr.message);
    }
  });
}

/** Stop all background services — called during graceful shutdown */
export function stopBackgroundServices() {
  _intervals.forEach(t => clearInterval(t));
  _intervals.length = 0;
  stopAlertEngine();
  stopCalibrationEngine();
  logger.info('All background services stopped');
}
