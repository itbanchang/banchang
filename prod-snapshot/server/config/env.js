// ============================================================
// BCH 360° Intelligence V.10 — Environment Configuration
// Validates required env vars and exports config constants
// ============================================================
import 'dotenv/config';

const requiredEnvVars = ['JWT_SECRET', 'MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASS', 'MYSQL_DB'];
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';

// REFRESH_TOKEN_SECRET is required in production for secure token separation
if (IS_PRODUCTION) {
  requiredEnvVars.push('REFRESH_TOKEN_SECRET');
}

// SSL is optional — only required if SSL_KEY_PATH is explicitly set
export const USE_SSL = IS_PRODUCTION && process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH;
if (IS_PRODUCTION && process.env.SSL_KEY_PATH) {
  requiredEnvVars.push('SSL_KEY_PATH', 'SSL_CERT_PATH');
}

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error(`\n❌ FATAL: Missing required environment variables:`);
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error(`\nPlease set these variables before starting the server.\n`);
  process.exit(1);
}

// Validate JWT_SECRET strength
if (process.env.JWT_SECRET.length < 32) {
  console.error(`\n❌ FATAL: JWT_SECRET must be at least 32 characters (currently ${process.env.JWT_SECRET.length})`);
  process.exit(1);
}

export const SERVER_IP = process.env.SERVER_IP || '10.1.0.68';
export const PROD_PORT = process.env.PROD_PORT || 4001;
export const DEV_PORT = process.env.DEV_PORT || 3001;
export const PORT = process.env.PORT || (IS_PRODUCTION ? PROD_PORT : DEV_PORT);
export const PROTOCOL = USE_SSL ? 'https' : 'http';

export const ALLOWED_ORIGINS = IS_PRODUCTION
  ? [
      `${PROTOCOL}://${SERVER_IP}:${PROD_PORT}`,
    ]
  : [
      'http://localhost:5173',
      'http://localhost:4000',
      'http://localhost:3001',
      `http://${SERVER_IP}:${DEV_PORT}`,
      `http://${SERVER_IP}:${PROD_PORT}`,
    ];
