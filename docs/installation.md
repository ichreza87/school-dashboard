# Installation — 3 Mode

## Mode 1: Local (1 komputer)
Paling mudah untuk demo / sekolah kecil. DB SQLite (tanpa setup Postgres).
```bash
cp .env.example .env
# biarkan DATABASE_URL=file:./dev.db
npm install
cd backend && npx prisma migrate dev && npx prisma db seed
npm run dev
# Backend http://localhost:3000, Frontend http://localhost:5173
```
Cukup buka `http://localhost:5173`, login `admin/admin123`.

## Mode 2: LAN (Jaringan Sekolah)
```
Komputer Operator (Server)
  ├── Database (SQLite/Postgres)
  ├── Backend (HOST=0.0.0.0 PORT=3000)
  ├── Frontend (Vite build serve)
  ├── Guru 1 (browser http://192.168.1.10:3000)
  ├── Guru 2 (http://192.168.1.10:3000)
  └── Kepala Sekolah (http://192.168.1.10:3000)
```
Langkah:
1. Di komputer operator, set `.env`: `HOST=0.0.0.0`, `CORS_ORIGIN=http://192.168.1.10:5173` (ganti IP).
2. Build frontend: `cd frontend && npm run build`, serve via `npx serve -s dist -l 3000` atau `nginx`.
3. Backend jalankan `npm run start` (listen 0.0.0.0).
4. Buka firewall port 3000/5173.
5. Guru akses via `http://192.168.1.10:5173` (cari IP operator via `ipconfig` / `ifconfig`).
6. Jika pakai Docker, cukup `docker-compose up --build` di operator — semua guru akses `http://<IP>:5173`.

## Mode 3: Server (VPS / Cloud)
```bash
# di VPS Ubuntu
DATABASE_URL=postgresql://user:pass@localhost:5432/school_dashboard?schema=public
npx prisma migrate deploy
npx prisma db seed
pm2 start dist/index.js --name school-dashboard
# atau docker-compose up -d
```
Gunakan reverse proxy (Nginx/Caddy) + HTTPS. Backup harian via cron + `POST /api/backup`.

## Docker Quick Start
```bash
docker-compose up --build
# DB Postgres + Backend + Frontend otomatis
# http://localhost:5173
```

Lihat `docs/configuration.md` untuk env lengkap dan `docs/troubleshooting.md` untuk firewall/CORS.
