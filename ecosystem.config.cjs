// ============================================================
// BCH 360° Intelligence V.10 — PM2 Ecosystem Configuration
// Usage:
//   pm2 start ecosystem.config.cjs              ← Start production
//   pm2 start ecosystem.config.cjs --env dev    ← Start development
//   pm2 reload ecosystem.config.cjs             ← Zero-downtime reload
//   pm2 stop all                                ← Stop all
//   pm2 monit                                   ← Real-time monitoring
//
// Log Rotation (install once):
//   pm2 install pm2-logrotate
//   pm2 set pm2-logrotate:max_size 10M
//   pm2 set pm2-logrotate:retain 30
//   pm2 set pm2-logrotate:compress true
//   pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm
//   pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
// ============================================================

module.exports = {
  apps: [
    {
      // ── Production Server ──
      name: 'bch360-server',
      script: './server/server.js',
      node_args: '--max-old-space-size=512',

      // Cluster mode — ใช้ CPU หลาย core
      instances: 2,
      exec_mode: 'cluster',

      // Auto-restart policies
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 3000,

      // Memory limit — restart ถ้าเกิน
      max_memory_restart: '512M',

      // Watch mode (production ปิด, dev เปิด)
      watch: false,

      // Logging — with rotation via pm2-logrotate module
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      log_type: 'json',

      // Graceful shutdown — รอให้ request ที่ค้างอยู่จบก่อน
      kill_timeout: 5000,
      listen_timeout: 10000,
      shutdown_with_message: true,

      // Exponential backoff restart (PM2 3.x+)
      exp_backoff_restart_delay: 1000,

      // Environment — Production (default)
      env: {
        NODE_ENV: 'production',
        PORT: 4001,
      },

      // Environment — Development (pm2 start --env dev)
      env_dev: {
        NODE_ENV: 'development',
        PORT: 4000,
      },
    },
  ],

  // ── Deployment (optional — สำหรับ remote deploy) ──
  deploy: {
    production: {
      user: 'bch',
      host: '10.1.0.68',
      ref: 'origin/main',
      repo: 'git@github.com:your-org/bch-360-intelligence.git',
      path: '/opt/bch360',
      'pre-deploy-local': '',
      'post-deploy':
        'npm ci --omit=dev && npm run build && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': '',
    },
  },
};
