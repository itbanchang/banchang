# ============================================================
# BCH 360° V.10 — Rollback to previous git SHA
# Usage:  powershell -ExecutionPolicy Bypass -File deploy/rollback.ps1
# Reads the previous SHA from deploy/.last-deploy-sha.
# ============================================================
param(
    [string]$ProjectRoot = (Split-Path -Parent (Split-Path -Parent $PSCommandPath)),
    [string]$PM2AppName = 'bch360-server'
)

$ErrorActionPreference = 'Stop'
$ShaFile = Join-Path $ProjectRoot 'deploy/.last-deploy-sha'

if (-not (Test-Path $ShaFile)) {
    Write-Error "No rollback target: $ShaFile not found. Record the SHA during deploy."
    exit 1
}

$Sha = (Get-Content $ShaFile -Raw).Trim()
if (-not $Sha) {
    Write-Error "deploy/.last-deploy-sha is empty."
    exit 1
}

Write-Host "Rolling back to $Sha" -ForegroundColor Yellow

Push-Location $ProjectRoot
try {
    git fetch origin
    git checkout $Sha
    if ($LASTEXITCODE -ne 0) { throw "git checkout failed" }

    npm ci
    if ($LASTEXITCODE -ne 0) { throw "npm ci failed" }

    npm run build
    if ($LASTEXITCODE -ne 0) { throw "build failed" }

    pm2 reload $PM2AppName
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "pm2 reload failed; trying restart"
        pm2 restart $PM2AppName
    }

    Write-Host "Rollback complete." -ForegroundColor Green
    Write-Host "Verify /api/health returns 200 before signing off." -ForegroundColor Cyan
} finally {
    Pop-Location
}
