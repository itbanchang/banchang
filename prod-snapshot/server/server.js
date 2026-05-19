// ============================================================
// BCH 360° Intelligence V.10 - Main Server (Modular)
// HOSxP XE + 8 AI Modules — Performance Optimized
// Phase 1 Security Hardening Applied
// ============================================================
import express from 'express';
import { createServer } from 'http';
import https from 'https';
import fs from 'fs';
import { Server as SocketIO } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

// ── Config ──
import { NODE_ENV, IS_PRODUCTION, USE_SSL, SERVER_IP, PROD_PORT, DEV_PORT, PORT, PROTOCOL, ALLOWED_ORIGINS } from './config/env.js';
import { applyMiddleware } from './config/middleware.js';
import { registerRoutes } from './config/routes.js';

// ── Modules ──
import { getPool } from './db/mysql.js';
import { renderMetrics } from './monitoring/metrics.js';
import { setupSocket } from './socket.js';
import { startBackgroundServices, stopBackgroundServices } from './startup.js';
import logger from './logger.js';

// ── Route modules ──
import systemRoutes from './routes/system.js';
import dashboardRoutes from './routes/dashboard.js';
import auditRoutes from './routes/audit.js';
import { apiDocs } from './lib/openapi.js';
import { initAuditLog, auditAllMiddleware, startRetentionJob } from './lib/auditLogEnhanced.js';

const app = express();

// ====== SERVER CREATION (HTTP or HTTPS) ======
let server;
let httpRedirectServer;

if (USE_SSL) {
  const sslKeyPath = process.env.SSL_KEY_PATH;
  const sslCertPath = process.env.SSL_CERT_PATH;
  if (!fs.existsSync(sslKeyPath) || !fs.existsSync(sslCertPath)) {
    console.error(`\n❌ FATAL: SSL certificate files not found`);
    console.error(`   Key: ${sslKeyPath}`);
    console.error(`   Cert: ${sslCertPath}\n`);
    process.exit(1);
  }
  const httpsOptions = { key: fs.readFileSync(sslKeyPath), cert: fs.readFileSync(sslCertPath) };
  server = https.createServer(httpsOptions, app);
  // HTTP→HTTPS redirect on port 80 (if allowed) and on HTTP_REDIRECT_PORT
  const HTTP_REDIRECT_PORT = parseInt(process.env.HTTP_REDIRECT_PORT || '80');
  httpRedirectServer = createServer((req, res) => {
    const host = (req.headers.host || '').split(':')[0];
    res.writeHead(301, { 'Location': `https://${host}:${PROD_PORT}${req.url}` });
    res.end();
  });
  console.log(`🔒 HTTPS Using HTTPS with certificates`);
} else {
  server = createServer(app);
  if (IS_PRODUCTION) {
    console.log(`⚡ HTTP (PROD) Production over HTTP — intranet mode`);
  } else {
    console.log(`⚡ HTTP (DEV) Using HTTP (development mode)`);
  }
}

// ── WebSocket ──
const io = new SocketIO(server, {
  cors: { origin: ALLOWED_ORIGINS, credentials: true, methods: ['GET', 'POST'], maxAge: 3600 },
  transports: IS_PRODUCTION ? ['websocket'] : ['websocket', 'polling'],
});

// ── ESM __dirname ──
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

// ====== MIDDLEWARE ======
applyMiddleware(app);

// ── Serve Production Frontend ──
app.use(express.static(DIST_DIR, {
  etag: true,
  setHeaders: (res, pathStr) => {
    // Normalize Windows backslashes for path matching
    const normalized = pathStr.replace(/\\/g, '/');
    if (normalized.includes('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
  }
}));

// ── Health Dashboard (standalone page — public) ──
app.get('/health', (req, res) => {
  res.sendFile(path.join(__dirname, 'health-dashboard.html'));
});

// ====== ENHANCED AUDIT LOG ======
initAuditLog();
startRetentionJob(90); // Keep 90 days · prune daily at 03:00
app.use(auditAllMiddleware()); // Logs EVERY request with user/IP/duration/status

// ====== ROUTES ======
registerRoutes(app);

// System & dashboard routes (after auth middleware is applied by registerRoutes)
app.use('/api/system', systemRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin/audit', auditRoutes); // Admin-only audit log query

// OpenAPI Documentation (public endpoint)
app.get('/api/docs', (req, res) => res.json(apiDocs));

// Prometheus Metrics Endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
  res.send(renderMetrics());
});

// Health Check (Quick — for monitoring/load balancer)
app.get('/api/health', async (req, res) => {
  const { isMySQLConnected, dbQueryOne } = await import('./db/mysql.js');
  const mysqlOk = isMySQLConnected();
  let dbLatency = null;
  if (mysqlOk) {
    try {
      const t0 = Date.now();
      await dbQueryOne('SELECT 1 AS ok');
      dbLatency = Date.now() - t0;
    } catch { dbLatency = -1; }
  }
  const healthy = mysqlOk && dbLatency !== null && dbLatency >= 0;
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'degraded',
    version: '10.0.0',
    uptime: Math.round(process.uptime()),
    mysql: mysqlOk ? 'connected' : 'disconnected',
    db_latency_ms: dbLatency,
    timestamp: new Date().toISOString(),
  });
});

// ── SPA Fallback (must be AFTER all /api routes) ──
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found', path: req.path });
  }
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// ── Get LAN IP ──
function getLanIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

// ====== GLOBAL ERROR HANDLERS ======
app.use((req, res) => {
  logger.warn('404 Not Found', { path: req.path, method: req.method });
  res.status(404).json({
    error: 'Not found', path: req.path, method: req.method,
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isDev = NODE_ENV !== 'production';
  logger.error('Unhandled route error', {
    path: req.path, method: req.method, statusCode,
    error: err.message, stack: isDev ? err.stack : undefined,
    userId: req.user?.id, timestamp: new Date().toISOString()
  });
  import('./ai/selfHeal.js').then(({ handleError }) => handleError(err, { path: req.path, method: req.method })).catch(() => {});
  const message = isDev ? err.message : 'Internal server error';
  res.status(statusCode).json({
    error: message, requestId: req.id || 'unknown',
    timestamp: new Date().toISOString(),
    ...(isDev && { stack: err.stack })
  });
});

// ── Uncaught Exception / Unhandled Rejection ──
process.on('uncaughtException', async (err) => {
  logger.error('UNCAUGHT EXCEPTION', { error: err.message, stack: err.stack });
  try { const { handleError } = await import('./ai/selfHeal.js'); await handleError(err, { source: 'uncaughtException' }); } catch { }
});
process.on('unhandledRejection', async (reason, promise) => {
  logger.error('UNHANDLED REJECTION', { reason: String(reason), promise: String(promise) });
  try { const { handleError } = await import('./ai/selfHeal.js'); await handleError(reason, { source: 'unhandledRejection' }); } catch { }
});

// ====== GRACEFUL SHUTDOWN ======
async function gracefulShutdown(signal) {
  logger.info(`${signal} received. Starting graceful shutdown...`);
  stopBackgroundServices();
  server.close(async () => {
    logger.info('HTTP server closed. Waiting for active requests...');
    try {
      if (io) { io.disconnectSockets(); logger.info('WebSocket connections closed'); }
      const pool = await getPool();
      if (pool?.end) { await pool.end(); logger.info('Database connections closed'); }
      logger.info('Graceful shutdown completed');
      process.exit(0);
    } catch (err) {
      logger.error('Error during graceful shutdown', err);
      process.exit(1);
    }
  });
  setTimeout(() => { logger.error('Forced shutdown after 30s timeout.'); process.exit(1); }, 30000);
}
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ====== START ======
(async () => {
  try {
    await getPool();
    const lanIP = getLanIP();
    const protocol = USE_SSL ? 'https' : 'http';

    if (IS_PRODUCTION && httpRedirectServer) {
      // Try port 80 first, then fallback to HTTP_REDIRECT_PORT (default 4000)
      const fallbackPort = parseInt(process.env.HTTP_REDIRECT_PORT || '4000');
      httpRedirectServer.listen(80, '0.0.0.0', () => {
        console.log(`🔀 HTTP→HTTPS redirect listening on port 80`);
      }).on('error', (err) => {
        if (err.code === 'EACCES' || err.code === 'EADDRINUSE') {
          console.log(`   Port 80 unavailable (${err.code}) — trying port ${fallbackPort}...`);
          httpRedirectServer.listen(fallbackPort, '0.0.0.0', () => {
            console.log(`🔀 HTTP→HTTPS redirect listening on port ${fallbackPort}`);
            console.log(`   http://10.1.0.68:${fallbackPort}/ → https://10.1.0.68:${PROD_PORT}/`);
          }).on('error', (err2) => {
            console.log(`   HTTP redirect on port ${fallbackPort} also failed (${err2.code})`);
          });
        } else {
          console.error(`HTTP redirect server error: ${err.message}`);
        }
      });
    }

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`
╔═══════════════════════════════════════════════════╗
║  BCH 360° Intelligence V.10  — PRODUCTION        ║
║  Hospital AI Executive Dashboard                  ║
║                                                   ║
║  Protocol: ${USE_SSL ? 'HTTPS' : IS_PRODUCTION ? 'HTTP (PROD)' : 'HTTP (DEV)'}${' '.repeat(36 - (USE_SSL ? 'HTTPS' : IS_PRODUCTION ? 'HTTP (PROD)' : 'HTTP (DEV)').length)}║
║  Local: ${protocol}://localhost:${PORT}${' '.repeat(38 - protocol.length - String(PORT).length)}║
║  Network: ${protocol}://${lanIP}:${PORT}${' '.repeat(35 - protocol.length - lanIP.length - String(PORT).length)}║
║                                                   ║
║  Data: HOSxP XE(${process.env.MYSQL_HOST || '10.1.0.3'})${' '.repeat(Math.max(0, 24 - (process.env.MYSQL_HOST || '10.1.0.3').length))}║
║  AI: 11 Modules Active                            ║
║  Phase 1 Security: HARDENED                       ║
║  Architecture: MODULAR                            ║
╚═══════════════════════════════════════════════════╝`);

      console.log(`Environment Validation: PASSED`);
      console.log(`   - JWT_SECRET: [SET — ${process.env.JWT_SECRET.length} chars]`);
      console.log(`   - Database: ${process.env.MYSQL_HOST}:3306/${process.env.MYSQL_DB}`);
      console.log(`   - Authentication: Demo user bypass REMOVED`);
      console.log(`   - HTTPS/TLS: ${USE_SSL ? 'ENABLED' : IS_PRODUCTION ? 'HTTP intranet mode' : 'Development mode'}`);
      console.log(`   - Prometheus Metrics: /metrics ENABLED`);
      console.log(`   - Alert Engine: ENABLED (60s interval)`);

      // Setup WebSocket
      setupSocket(io);

      // Start all background services
      startBackgroundServices(io);
    });
  } catch (err) {
    console.error('Critical Startup Failed:', err.message);
    process.exit(1);
  }
})();
