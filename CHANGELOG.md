# Changelog

## [1.0.0] - 2026-09-07

### Added - Production Release
- Dashboard profesional lengkap (6 stat cards, 4 grafik, alert kehadiran, DataQuality Center)
- 14 halaman fungsional: Siswa (CRUD+detail 10 tab), Guru, Rombel, Mapel, Jadwal (konflik), Kehadiran Siswa/Guru, Nilai (formula configurable), Perkembangan (grafik individual), Analytics, Laporan (R7/R10 template builder), Dapodik Center, Sinkronisasi (diff+conflict), Backup Center, Audit Log, Pengguna & Pengaturan
- Global search Ctrl+K, Import wizard 3-step, pagination, dark mode, responsive, accessible
- Backend: Zod validasi, duplicate detection (nisn/nama+tgl), report template, backup checksum, audit, RBAC 7 role
- Dapodik abstraction + Mock provider + sync engine NEW/UPDATED/UNCHANGED/CONFLICT/ERROR
- Docker Compose (Postgres+Backend+Frontend+Nginx), 3 mode instalasi (Local/LAN/Server) terdokumentasi
- Tests 23 unit (sync, grade, attendance, report-template) + seed 100 siswa fiktif
- Docs: 13 panduan + 10 tutorial + API reference + architecture
- CI/CD GitHub Actions, issue/PR templates, security scan

## [0.1.0] - 2026-09-07

### Added
- Foundation, DB schema, auth, module awal
