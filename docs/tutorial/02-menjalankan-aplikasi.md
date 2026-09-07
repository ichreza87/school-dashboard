# 02 - Menjalankan Aplikasi

``bash
cp .env.example .env
npm install
cd backend
npx prisma migrate dev
npx prisma db seed   # 1 sekolah, 100 siswa fiktif
npm run dev          # backend http://localhost:3000
# di terminal lain
cd frontend && npm run dev  # http://localhost:5173
``

Login demo: admin/admin123 (Super Admin), operator/admin123, kepsek/admin123, guru/admin123.

Troubleshooting: cek port 3000/5173 tidak bentrok, DATABASE_URL file:./prisma/dev.db untuk SQLite.
