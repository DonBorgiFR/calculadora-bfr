@echo off
echo ========================================================
echo   INCICIANDO LA CALCULADORA DE SUELDOS (Premium 360)
echo ========================================================
echo.
echo 1. Instalando dependencias (por si acaso)...
call npm install
echo.
echo 2. Levantando el motor (Vite + React) y abriendo navegador...
echo.
npm run dev -- --open
pause
