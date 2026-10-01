@echo off
REM Starts the Strikar Lifescience frontend (Vite dev server).
REM Run this from anywhere; it switches to its own folder first.

cd /d "%~dp0"

if not exist "node_modules\" (
    echo [!] node_modules not found - running npm install first...
    call npm install
)

echo Starting Strikar Lifescience frontend (demo 2) on http://localhost:5175 ...
call npm run dev

pause
