# ============================================================
# BCH 360 Intelligence V.10 - Production Dockerfile
# Multi-stage build: Debian slim base (glibc compatible)
# ============================================================

# ─── Build stage ───
FROM node:20-slim AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY package.json ./
# Use npm install (not npm ci) to regenerate lock for Linux platform
# package-lock.json from Windows has @esbuild/win32-x64 which breaks ci
RUN npm install --omit=dev --no-audit --no-fund --no-package-lock

COPY . .

# Install build-only deps + build frontend
RUN npm install --no-save --no-audit --no-fund \
    vite @vitejs/plugin-react @vitejs/plugin-react-swc \
    tailwindcss autoprefixer postcss && \
    npm run build

# ─── Runtime stage ───
FROM node:20-slim
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates tini && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/public ./public
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package.json ./
COPY --from=builder /app/ecosystem.config.cjs ./

EXPOSE 4001

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server/server.js"]
