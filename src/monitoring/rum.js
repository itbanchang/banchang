// ============================================================
// Client-side RUM — web-vitals + error capture
// Load once from src/main.jsx
// Requires: npm i web-vitals
// ============================================================

function report(metric) {
    try {
        fetch('/api/rum', {
            method: 'POST',
            keepalive: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: metric.name,
                value: Math.round(metric.value * 1000) / 1000,
                path: location.pathname,
            }),
        });
    } catch {/* fail silently — never break the page for a metric */}
}

/** Register web-vitals callbacks. Call once at startup. */
export async function registerWebVitals() {
    try {
        const wv = await import('web-vitals');
        wv.onLCP?.(report);
        wv.onINP?.(report);
        wv.onCLS?.(report);
        wv.onTTFB?.(report);
        wv.onFCP?.(report);
    } catch {/* web-vitals not installed — silent */}
}

/** Capture unhandled errors. Call once at startup. */
export function registerErrorCapture() {
    window.addEventListener('error', (ev) => {
        try {
            fetch('/api/rum/error', {
                method: 'POST',
                keepalive: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: ev.message,
                    source: ev.filename,
                    line: ev.lineno,
                    col: ev.colno,
                    stack: ev.error?.stack,
                    path: location.pathname,
                    userAgent: navigator.userAgent,
                }),
            });
        } catch {/* silent */}
    });

    window.addEventListener('unhandledrejection', (ev) => {
        try {
            fetch('/api/rum/error', {
                method: 'POST',
                keepalive: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'unhandled promise rejection: ' + (ev.reason?.message || String(ev.reason)),
                    stack: ev.reason?.stack,
                    path: location.pathname,
                    userAgent: navigator.userAgent,
                }),
            });
        } catch { /* ignore */ }
    });
}
