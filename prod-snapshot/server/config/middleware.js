// ============================================================
// BCH 360° Intelligence V.10 — Express Middleware Setup
// Compression, CORS, Helmet, JSON parsing, rate limiting
// ============================================================
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import express from 'express';
import { IS_PRODUCTION, USE_SSL, SERVER_IP, PROD_PORT, DEV_PORT, ALLOWED_ORIGINS } from './env.js';
import { trackingMiddleware } from '../middleware/tracking.js';
import { metricsMiddleware } from '../monitoring/metrics.js';
import { csrfCookie, csrfProtect } from '../middleware/csrf.js';
import { dataValidationMiddleware } from '../middleware/dataValidation.js';

export function applyMiddleware(app) {
  // gzip responses >1KB
  app.use(compression({ level: 4, threshold: 1024 }));

  // HTTPS enforcement (only when SSL is active)
  if (USE_SSL) {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') === 'https' || req.secure) {
        return next();
      }
      const host = req.get('host');
      res.redirect(301, `https://${host}${req.originalUrl}`);
    });
  }

  app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          scriptSrcAttr: ["'self'", "'unsafe-inline'"],
          connectSrc: [
            "'self'",
            IS_PRODUCTION ? null : 'ws://localhost:*',
            `${USE_SSL ? 'wss' : 'ws'}://${SERVER_IP}:${PROD_PORT}`,
            `${USE_SSL ? 'https' : 'http'}://${SERVER_IP}:${PROD_PORT}`,
            IS_PRODUCTION ? null : `ws://${SERVER_IP}:${DEV_PORT}`,
          ].filter(Boolean),
          imgSrc: ["'self'", 'data:', 'blob:'],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com'],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"],
          manifestSrc: ["'self'"],
          mediaSrc: ["'self'"],
          upgradeInsecureRequests: USE_SSL ? [] : null,
        },
      },
      crossOriginResourcePolicy: { policy: 'same-site' },
      crossOriginEmbedderPolicy: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      hsts: USE_SSL ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
      frameguard: { action: 'deny' },
      noSniff: true,
      xssFilter: true,
    })
  );

  app.use(express.json({ limit: '512kb' }));
  app.use(express.urlencoded({ extended: true, limit: '512kb' }));
  app.use(cookieParser());

  // CSRF protection (Double-Submit Cookie pattern)
  app.use(csrfCookie);
  app.use('/api', csrfProtect);

  // Request tracking & logging
  app.use(trackingMiddleware());

  // Prometheus metrics collection
  app.use(metricsMiddleware());

  // Data validation — detect anomalies before showing to users
  app.use('/api', dataValidationMiddleware());

  // API rate limiting — internal LAN dashboard: ~25-30 parallel /api calls per page
  // load × multiple users behind NAT × auto-refresh. 600/min (10/sec) protects
  // against runaway loops while not throttling normal heavy initial loads.
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 600,
    message: { error: 'Too many requests. Please slow down.' },
    standardHeaders: true,
  });
  app.use('/api', apiLimiter);
}
