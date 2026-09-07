@echo off
REM School Dashboard - Installer 1-Klik (Windows CMD)
echo === School Dashboard Installer ===
where node >nul 2>nul || (echo Node.js belum terinstall. Download di https://nodejs.org && pause && exit /b 1)

echo 1/5 Install dependencies...
call npm install || exit /b 1

echo 2/5 Setup environment...
if not exist .env copy .env.example .env
if not exist backend\.env copy .env.example backend\.env

echo 3/5 Setup database...
cd backend
call npx prisma migrate deploy || call npx prisma migrate dev --name init
call npx prisma db seed
cd ..

echo 4/5 Build...
call npm run build

echo 5/5 Selesai! Login: admin / admin123
echo Jalankan: npm run dev  ->  http://localhost:5173
pause
