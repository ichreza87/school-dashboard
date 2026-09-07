# School Dashboard

**Dashboard Sekolah yang Sederhana, Terbuka, dan Mudah Dipelajari Guru.**

Sistem Informasi Manajemen Sekolah modern, open-source, terintegrasi Dapodik — untuk kepala sekolah, guru, wali kelas, operator, dan tata usaha.

![License: MIT](https://img.shields.io/badge/License-MIT-green) ![Stack: TypeScript](https://img.shields.io/badge/Stack-TypeScript-blue) ![Database: Prisma](https://img.shields.io/badge/DB-Prisma%20%7C%20SQLite%2FPostgres-2D3748)

---

## ? Fitur

- ?? Dashboard profesional (total siswa/guru/rombel, kehadiran, nilai, grafik)
- ????? Data siswa lengkap + profil, riwayat, prestasi, catatan
- ????? Data guru & tendik (mendukung R7/R10 configurable)
- ?? Rombel, mata pelajaran, jadwal (deteksi konflik otomatis)
- ? Kehadiran siswa & guru + alert (\<90% / \<85% / \<80% — threshold configurable)
- ?? Nilai (formula configurable, bulk, import/export)
- ?? Perkembangan siswa & analytics sekolah (grafik interaktif Recharts)
- ?? Dapodik Center (test connection, tarik data, preview, sinkronisasi, conflict resolution)
- ?? Report Center + Template Builder (R7/R10 — kolom bisa diatur, export Excel/PDF)
- ?? Global Search (\Ctrl+K\)
- ?? Role management (SUPER_ADMIN, OPERATOR, KEPALA_SEKOLAH, GURU, WALI_KELAS, TU)
- ?? Audit log lengkap
- ?? Backup & restore (manual, scheduled, checksum, rollback)
- ?? Import Excel (wizard: upload ? map ? validate ? preview ? import)
- ?? Keamanan: hashing, RBAC, validasi, audit

---

## ??? Cara Menjalankan untuk Guru (Tanpa Coding)

> **Paling mudah — 7 langkah:**

1. Download aplikasi (atau minta operator kirim installer)
2. Install (klik next-next seperti install aplikasi biasa)
3. Buka **School Dashboard** di browser: \http://localhost:3000\
4. Login (tanya operator untuk username/password)
5. Pilih menu **Siswa** atau **Kelas**
6. Input **Kehadiran** ? klik Simpan
7. Input **Nilai** ? klik Simpan ? Cetak Laporan

Kamu tidak perlu mengetik command apapun. Jika sekolah menjalankan di **LAN**, cukup buka alamat yang diberikan operator (mis. \http://192.168.1.10:3000\) dari komputer guru/kepsek.

Detail: lihat \docs/teacher-guide.md\ dan \docs/operator-guide.md\.

---

## ?? Quick Start

### Untuk Pengguna Biasa (Download)
1. Download release terbaru dari halaman Releases
2. Ekstrak & jalankan installer / docker-compose
3. Buka browser ke \http://localhost:3000\

### Untuk Developer
``bash
git clone https://github.com/<org>/school-dashboard.git
cd school-dashboard

# 1. Install
npm install

# 2. Setup env
cp .env.example .env
# edit DATABASE_URL, JWT_SECRET

# 3. Database
cd backend
npx prisma migrate dev
npx prisma db seed

# 4. Jalankan
npm run dev
# Backend: http://localhost:3000
# Frontend: http://localhost:5173
``

**Demo login:** \dmin / admin123\ (Super Admin), \operator / admin123\, \kepsek / admin123\, \guru / admin123\

---

## ??? Struktur Project

``
school-dashboard/
+-- README.md, LICENSE, CONTRIBUTING.md, SECURITY.md, CHANGELOG.md, ROADMAP.md
+-- docs/ (panduan guru/operator/admin, dapodik, arsitektur, api...)
+-- frontend/ (React + TS + Vite + Tailwind + Recharts)
+-- backend/ (Node + TS + Express + Prisma)
+-- database/ & backend/prisma/ (schema, migrations)
+-- integrations/dapodik/ (provider abstraction)
+-- reports/templates/
+-- examples/demo-data/ & import-templates/
+-- .github/workflows, ISSUE_TEMPLATE
``

## ??? Database

- **SQLite** untuk lokal / single-school (default, tanpa setup).
- **PostgreSQL** untuk server/LAN (ganti \DATABASE_URL\ ke postgres, lalu \
px prisma migrate deploy\).
- Migration: \
px prisma migrate dev\ — jangan edit DB manual.
- Lihat \docs/database.md\ untuk ERD & tabel lengkap.

## ?? Dapodik

Abstraksi di \ackend/src/modules/dapodik/provider.ts\:

``ts
interface DapodikProvider { connect(); authenticate(); getStudents(); getTeachers(); ... sync(); }
``

- \MockDapodikProvider\ untuk development (data fiktif).
- Provider produksi **wajib** mengikuti mekanisme resmi Dapodik (jangan bypass auth / scraping ilegal).

## ?? Sinkronisasi

\LOCAL DB ? COMPARE ? REMOTE ? DIFF ENGINE ? CONFLICT DETECTION ? USER CONFIRMATION ? SYNC\

Preview menampilkan NEW / UPDATED / UNCHANGED / CONFLICT / ERROR. Konflik diselesaikan per-field: \[Gunakan Lokal]\ / \[Gunakan Dapodik]\ / \[Gabungkan]\ / \[Lewati]\ — tanpa overwrite massal.

## ?? Backup

\Backup Center\ di UI atau \POST /api/backup\. Sebelum sinkronisasi besar, sistem mewajibkan backup. Restore via \POST /api/backup/:id/restore\ + audit log.

## ?? Troubleshooting & FAQ

Lihat \docs/troubleshooting.md\ dan \docs/getting-started.md\.

## ?? Contributing

Lihat \CONTRIBUTING.md\. Gunakan conventional commits (\eat:\, \ix:\, \docs:\...).

## ?? License

MIT — lihat \LICENSE\.
