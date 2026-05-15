// ============================================================
// BCH 360° Intelligence V.10 — WebSocket Handler
// Real-time updates, alert detection, bed/EWS broadcasting
// + dashboard:update push on MV refresh
// + alert:new push from alert engine
// ============================================================
import hosxp from './db/hosxpIntegration.js';
import { getEWSSummary } from './ai/ewsEngine.js';
import { dbQueryOne } from './db/mysql.js';
import logger from './logger.js';

// ── Global IO reference — allows other modules to broadcast ──
let _io = null;

/** Get the Socket.IO server instance for broadcasting from anywhere */
export function getIO() {
  return _io;
}

/**
 * Broadcast an event to ALL connected clients.
 * Safe to call even if no clients are connected.
 */
export function broadcast(event, data) {
  if (_io) {
    _io.emit(event, data);
  }
}

// Alert detection — checks HOSxP XE for critical conditions
const recentAlerts = new Map();
const ALERT_COOLDOWN = 300000; // 5 min cooldown per alert type

function shouldAlert(key) {
  const last = recentAlerts.get(key);
  if (last && Date.now() - last < ALERT_COOLDOWN) return false;
  recentAlerts.set(key, Date.now());
  return true;
}

async function detectAlerts() {
  const alerts = [];
  try {
    const results = await Promise.allSettled([
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM an_stat a
        INNER JOIN patient p ON a.hn = p.hn
        WHERE a.dchdate IS NULL AND a.rw > 0
      `),
      // Phase H.6: still-in-ER filter uses finish_time IS NULL
      // (er_dch_type was NULL 100% at BCH so the old check was a no-op).
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.finish_time IS NULL AND st.service7 IS NULL
      `),
      dbQueryOne(`
        SELECT
          SUM(CASE WHEN a.dchdate IS NULL THEN 1 ELSE 0 END) as occupied,
          (SELECT SUM(bedcount) FROM ward WHERE ward_active = 'Y') as total
        FROM an_stat a WHERE a.dchdate IS NULL
      `),
      // Phase H.6: still-in-ER filter via finish_time IS NULL.
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.finish_time IS NULL AND st.service1 IS NULL
        AND o.vsttime IS NOT NULL
        AND TIME_TO_SEC(TIMEDIFF(CURTIME(), o.vsttime)) > 7200
      `),
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.er_emergency_type = '1'
        AND e.finish_time IS NULL AND st.service1 IS NULL
      `),
    ]);
    const [ewsHigh, erOvercrowd, bedCrisis, erLongWait, criticalTriage] =
      results.map(r => r.status === 'fulfilled' ? r.value : null);

    const erWaiting = Number(erOvercrowd?.cnt || 0);
    if (erWaiting > 30 && shouldAlert('er-overcrowd')) {
      alerts.push({ severity: 'critical', category: 'ER', message: `ER แออัด: ${erWaiting} ราย กำลังรอรับบริการ — เกินขีดรองรับ`, timestamp: new Date().toISOString() });
    } else if (erWaiting > 20 && shouldAlert('er-busy')) {
      alerts.push({ severity: 'warning', category: 'ER', message: `ER หนาแน่น: ${erWaiting} ราย กำลังรอรับบริการ`, timestamp: new Date().toISOString() });
    }

    const occupied = Number(bedCrisis?.occupied || 0);
    const totalBeds = Number(bedCrisis?.total || 1);
    const occPct = Math.round((occupied / totalBeds) * 100);
    if (occPct > 90 && shouldAlert('bed-crisis')) {
      alerts.push({ severity: 'critical', category: 'IPD', message: `Bed Occupancy วิกฤต: ${occPct}% (${occupied}/${totalBeds} เตียง) — เหลือเตียงว่าง ${totalBeds - occupied} เตียง`, timestamp: new Date().toISOString() });
    }

    const longWait = Number(erLongWait?.cnt || 0);
    if (longWait > 0 && shouldAlert('er-long-wait')) {
      alerts.push({ severity: 'critical', category: 'ER', message: `ER ผู้ป่วยรอนาน: ${longWait} ราย รอ > 2 ชม.ยังไม่ได้รับบริการ`, timestamp: new Date().toISOString() });
    }

    const criticalUnseen = Number(criticalTriage?.cnt || 0);
    if (criticalUnseen > 0 && shouldAlert('er-critical-triage')) {
      alerts.push({ severity: 'critical', category: 'ER', message: `Triage Level 1(Resuscitation): ${criticalUnseen} ราย ยังไม่ได้รับการตรวจ!`, timestamp: new Date().toISOString(), _resus_count: criticalUnseen });
    }

  } catch (err) { logger.warn('[Alerts] detectAlerts error', { error: err.message }); }
  return alerts;
}

export function setupSocket(io) {
  _io = io;

  io.on('connection', (socket) => {
    const sendAll = async () => {
      try {
        const [beds, ews, alerts] = await Promise.all([
          hosxp.getBedOccupancy().catch(() => null),
          getEWSSummary().catch(() => null),
          detectAlerts(),
        ]);
        if (beds) socket.emit('bed:update', beds.map(w => ({ ward: w.name, occupied: w.occupied, available: (w.total_beds || 0) - w.occupied, total: w.total_beds || 0 })));
        if (ews?.alerts?.length) socket.emit('ews:alerts', { critical_count: ews.critical, high_count: ews.high, alerts: ews.alerts.slice(0, 5).map(a => ({ name: a.name, ward: a.ward, ews_score: a.ews.score, action: a.ews.action })) });

        if (alerts.length > 0) {
          for (const alert of alerts) {
            socket.emit('alert:emergency', alert);
            if (alert._resus_count > 0) {
              socket.emit('er:resus', { count: alert._resus_count, message: alert.message, timestamp: alert.timestamp });
            }
          }
        }
      } catch (err) { logger.warn('[Socket] sendAll error', { error: err.message }); }
    };
    sendAll();
    const timer = setInterval(sendAll, 30000);
    socket.on('disconnect', () => clearInterval(timer));
  });
}
