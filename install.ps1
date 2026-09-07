# School Dashboard - Installer 1-Klik untuk Guru/Operator (Windows PowerShell)
# Cara pakai: klik kanan -> Run with PowerShell, atau: powershell -ExecutionPolicy Bypass -File install.ps1
Write-Host "=== School Dashboard Installer ===" -ForegroundColor Cyan
$ErrorActionPreference = "Stop"

function Test-Command($cmd) { Get-Command $cmd -ErrorAction SilentlyContinue }

if (-not (Test-Command node)) { Write-Host "Node.js belum terinstall. Download di https://nodejs.org (LTS) lalu jalankan lagi." -ForegroundColor Red; pause; exit 1 }
if (-not (Test-Command npm)) { Write-Host "npm tidak ditemukan." -ForegroundColor Red; pause; exit 1 }

Write-Host "1/5 Install dependencies..." -ForegroundColor Yellow
npm install

Write-Host "2/5 Setup environment..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) { Copy-Item ".env.example" ".env"; Write-Host "  .env dibuat dari .env.example (edit jika perlu)" }
if (-not (Test-Path "backend\.env")) { Copy-Item ".env.example" "backend\.env" }

Write-Host "3/5 Setup database (SQLite)..." -ForegroundColor Yellow
Push-Location backend
npx prisma migrate deploy
if ($LASTEXITCODE -ne 0) { npx prisma migrate dev --name init }
npx prisma db seed
Pop-Location

Write-Host "4/5 Build aplikasi..." -ForegroundColor Yellow
npm run build

Write-Host "5/5 Selesai!" -ForegroundColor Green
Write-Host ""
Write-Host "Login demo: admin / admin123 (Super Admin)" -ForegroundColor Cyan
Write-Host "Jalankan: npm run dev  ->  http://localhost:5173" -ForegroundColor Cyan
Write-Host "Atau LAN: set HOST=0.0.0.0 di backend/.env lalu akses via http://<IP>:5173" -ForegroundColor Cyan
pause
