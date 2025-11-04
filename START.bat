@echo off
title Career Compass - Quick Start
color 0A

echo ========================================
echo Career Compass - Quick Start
echo ========================================
echo.

echo IMPORTANT: Make sure you have completed the setup first!
echo Run setup.bat if you haven't already.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul
echo.

cd backend
echo Starting Backend Server...
echo.
start "Career Compass Backend" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

cd ..\frontend
echo Starting Frontend Server...
echo.
start "Career Compass Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Keep these windows open to view logs.
echo Press any key to close this window (servers will keep running)...
pause >nul

