// ============================================================
// BCH 360° Intelligence V.10 — Production Auto-Deploy
// Watches src/ and server/ → auto rebuild & restart
// Usage: node server/production.js
// ============================================================
import { spawn } from 'child_process';
import { watch, existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// ── Config ──
const PROD_PORT = process.env.PROD_PORT || 3000;
const DEBOUNCE_MS = 1500;       // Wait 1.5s after last change before action
const BUILD_DEBOUNCE_MS = 3000; // Wait 3s for build (batch multiple saves)

// ── Colors for console ──
const C = {
    reset: '\x1b[0m', bold: '\x1b[1m',
    green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m',
    red: '\x1b[31m', magenta: '\x1b[35m', dim: '\x1b[2m',
    blue: '\x1b[34m', white: '\x1b[37m',
};
const log = (icon, msg) => console.log(`${C.dim}[${new Date().toLocaleTimeString('th-TH')}]${C.reset} ${icon} ${msg}`);

// ── State ──
let serverProcess = null;
let buildTimer = null;
let restartTimer = null;
let isBuilding = false;
let buildQueued = false;
let deployCount = 0;
let lastDeployTime = null;
let startTime = Date.now();

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

// ── Load .env file (simple parser — no dependency needed) ──
function loadEnv() {
    const envPath = path.join(ROOT, '.env');
    if (!existsSync(envPath)) return;
    try {
        const content = readFileSync(envPath, 'utf-8');
        for (const line of content.split('\n')) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx === -1) continue;
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim();
            if (!process.env[key]) process.env[key] = val;
        }
        log('📄', `${C.dim}Loaded .env config${C.reset}`);
    } catch { /* ignore */ }
}

// ── Track deploy info ──
function trackDeploy(type) {
    deployCount++;
    lastDeployTime = new Date().toISOString();
    try {
        writeFileSync(path.join(ROOT, 'dist', '.deploy-info.json'), JSON.stringify({
            version: '10.0.0',
            deploy_count: deployCount,
            last_deploy: lastDeployTime,
            last_deploy_type: type,
            uptime_since: new Date(startTime).toISOString(),
            node_version: process.version,
        }, null, 2));
    } catch { /* dist/ might not exist yet */ }
}

// ── Start Server ──
function startServer() {
    if (serverProcess) {
        log('🔄', `${C.yellow}Restarting server...${C.reset}`);
        serverProcess.kill('SIGTERM');
        // Force kill after 3s if not dead
        setTimeout(() => {
            if (serverProcess && !serverProcess.killed) {
                serverProcess.kill('SIGKILL');
            }
        }, 3000);
    }

    serverProcess = spawn('node', ['server/server.js'], {
        cwd: ROOT,
        stdio: 'inherit',
        env: {
            ...process.env,
            NODE_ENV: 'production',
            PORT: String(PROD_PORT),
        },
    });

    serverProcess.on('exit', (code, signal) => {
        if (signal !== 'SIGTERM' && signal !== 'SIGKILL') {
            log('💀', `${C.red}Server crashed (code: ${code}). Restarting in 2s...${C.reset}`);
            setTimeout(startServer, 2000);
        }
    });

    serverProcess.on('error', (err) => {
        log('❌', `${C.red}Server spawn error: ${err.message}${C.reset}`);
    });

    trackDeploy('server-restart');
}

// ── Build Frontend ──
function buildFrontend() {
    if (isBuilding) {
        buildQueued = true;
        log('⏳', `${C.dim}Build already running — queued next build${C.reset}`);
        return;
    }

    isBuilding = true;
    log('🔨', `${C.cyan}${C.bold}Building frontend...${C.reset}`);
    const buildStart = Date.now();

    // --emptyOutDir ensures stale files are cleaned before build
    const build = spawn('npx', ['vite', 'build', '--emptyOutDir'], {
        cwd: ROOT,
        stdio: 'pipe',
        shell: true,
    });

    let output = '';
    build.stdout.on('data', (d) => { output += d.toString(); });
    build.stderr.on('data', (d) => { output += d.toString(); });

    build.on('close', (code) => {
        isBuilding = false;
        const elapsed = ((Date.now() - buildStart) / 1000).toFixed(1);

        if (code === 0) {
            log('✅', `${C.green}${C.bold}Frontend build OK${C.reset} ${C.dim}(${elapsed}s)${C.reset}`);
            log('🌐', `${C.green}Production updated — users will see changes on next refresh${C.reset}`);
            trackDeploy('frontend-rebuild');
        } else {
            log('❌', `${C.red}${C.bold}Build FAILED${C.reset} ${C.dim}(${elapsed}s)${C.reset}`);
            // Show last few lines of output for debugging
            const lines = output.trim().split('\n').slice(-10);
            lines.forEach(l => console.log(`    ${C.red}${l}${C.reset}`));
        }

        // If another build was queued, run it
        if (buildQueued) {
            buildQueued = false;
            log('🔄', `${C.yellow}Running queued build...${C.reset}`);
            setTimeout(buildFrontend, 500);
        }
    });
}

// ── Watch Directories (recursive, using fs.watch) ──
function watchDir(dir, label, onChange) {
    if (!existsSync(dir)) {
        log('⚠️', `${C.yellow}Directory not found: ${dir}${C.reset}`);
        return;
    }

    try {
        watch(dir, { recursive: true }, (eventType, filename) => {
            if (!filename) return;
            // Ignore non-source files
            if (filename.includes('node_modules')) return;
            if (filename.includes('.git')) return;
            if (filename.endsWith('.map')) return;
            if (filename.startsWith('.')) return;

            onChange(filename);
        });
        log('👁️', `${C.dim}Watching ${label}: ${dir}${C.reset}`);
    } catch (err) {
        log('❌', `${C.red}Watch error on ${label}: ${err.message}${C.reset}`);
    }
}

// ── Main ──
function main() {
    // Load .env before anything else
    loadEnv();

    const lanIP = getLanIP();

    console.log(`
${C.cyan}${C.bold}╔════════════════════════════════════════════════════════════╗
║  🏥 BCH 360° Intelligence V.10 — PRODUCTION AUTO-DEPLOY  ║
║  Production Server with Live Rebuild                      ║
║                                                           ║
║  🌐 Production: http://localhost:${PROD_PORT}                     ║
║  🌐 Network:    http://${lanIP}:${PROD_PORT}${' '.repeat(Math.max(0, 24 - String(lanIP).length))}║
║                                                           ║
║  📁 Watching:                                             ║
║     src/    → auto vite build → dist/ updated             ║
║     server/ → auto server restart                         ║
║                                                           ║
║  💡 Dev Server: npm run dev (port 3001)                   ║
║  💡 This Prod:  port ${PROD_PORT} (auto-deploy on change)        ║
╚════════════════════════════════════════════════════════════╝${C.reset}
`);

    // Check if dist/ exists — if not, do initial build
    const distIndex = path.join(ROOT, 'dist', 'index.html');
    if (!existsSync(distIndex)) {
        log('📦', `${C.yellow}No dist/ found — running initial build...${C.reset}`);
        buildFrontend();
        // Wait for build to finish before starting server
        const checkBuild = setInterval(() => {
            if (!isBuilding) {
                clearInterval(checkBuild);
                startServer();
                setupWatchers();
            }
        }, 1000);
    } else {
        log('✅', `${C.green}dist/ exists — starting server immediately${C.reset}`);
        startServer();
        setupWatchers();
    }
}

function setupWatchers() {
    // Watch src/ → rebuild frontend
    watchDir(path.join(ROOT, 'src'), 'src/ (frontend)', (filename) => {
        log('📝', `${C.magenta}Changed: src/${filename}${C.reset}`);
        clearTimeout(buildTimer);
        buildTimer = setTimeout(buildFrontend, BUILD_DEBOUNCE_MS);
    });

    // Watch server/ → restart server (but NOT this file itself triggering infinite restart)
    watchDir(path.join(ROOT, 'server'), 'server/ (backend)', (filename) => {
        // Don't restart when production.js itself changes
        if (filename === 'production.js') return;

        log('📝', `${C.magenta}Changed: server/${filename}${C.reset}`);
        clearTimeout(restartTimer);
        restartTimer = setTimeout(startServer, DEBOUNCE_MS);
    });

    // Watch public files (index.html, etc.) → rebuild
    watchDir(path.join(ROOT, 'public'), 'public/ (assets)', (filename) => {
        log('📝', `${C.magenta}Changed: public/${filename}${C.reset}`);
        clearTimeout(buildTimer);
        buildTimer = setTimeout(buildFrontend, BUILD_DEBOUNCE_MS);
    });

    // Watch root index.html → rebuild
    watchDir(ROOT, 'root (index.html)', (filename) => {
        if (filename === 'index.html') {
            log('📝', `${C.magenta}Changed: ${filename}${C.reset}`);
            clearTimeout(buildTimer);
            buildTimer = setTimeout(buildFrontend, BUILD_DEBOUNCE_MS);
        }
    });

    // Graceful shutdown
    const shutdown = (signal) => {
        log('👋', `${C.yellow}${signal} received — shutting down...${C.reset}`);
        if (serverProcess) serverProcess.kill('SIGTERM');
        setTimeout(() => process.exit(0), 1000);
    };
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));

    // Deploy status every 30 min
    setInterval(() => {
        const upMin = Math.round((Date.now() - startTime) / 60000);
        log('📊', `${C.dim}Status: uptime ${upMin}m, deploys: ${deployCount}, last: ${lastDeployTime || 'none'}${C.reset}`);
    }, 1800000);
}

main();
