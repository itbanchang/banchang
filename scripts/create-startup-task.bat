@echo off
REM ============================================================
REM BCH 360° Intelligence V.10 — Register PM2 as Windows Startup Task
REM Run this script AS ADMINISTRATOR (right-click > Run as administrator)
REM ============================================================
schtasks /create /sc onstart /tn "BCH360-PM2-AutoStart" /tr "\"C:\BCH 360° Intelligence V.10\scripts\pm2-startup.bat\"" /ru SYSTEM /rl HIGHEST /f
if %errorlevel% equ 0 (
    echo.
    echo ================================================
    echo  SUCCESS: BCH360-PM2-AutoStart task created!
    echo  PM2 will auto-start after every reboot.
    echo ================================================
) else (
    echo.
    echo ================================================
    echo  FAILED: Please run this script as Administrator
    echo  Right-click ^> Run as administrator
    echo ================================================
)
pause
