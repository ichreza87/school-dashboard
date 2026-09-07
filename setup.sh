#!/bin/bash
# School Dashboard - Installer Linux/macOS
set -e
echo "=== School Dashboard Installer ==="
command -v node >/dev/null 2>&1 || { echo "Node.js belum terinstall. https://nodejs.org"; exit 1; }
echo "1/5 Install dependencies..."
npm install
echo "2/5 Setup env..."
[ -f .env ] || cp .env.example .env
[ -f backend/.env ] || cp .env.example backend/.env
echo "3/5 Setup database..."
(cd backend && npx prisma migrate deploy || npx prisma migrate dev --name init && npx prisma db seed)
echo "4/5 Build..."
npm run build
echo "5/5 Selesai! Login: admin / admin123"
echo "Jalankan: npm run dev  ->  http://localhost:5173"
