@echo off
REM ============================================================
REM BCH 360° Intelligence V.10 — PM2 Auto-Start on Boot
REM This script is called by Windows Task Scheduler at startup
REM ============================================================
cd /d "C:\BCH 360° Intelligence V.10"
C:\Users\User\AppData\Roaming\npm\pm2.cmd resurrect
