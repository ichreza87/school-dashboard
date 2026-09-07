# Changelog

Semua perubahan penting dicatat di sini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/) dan [Semantic Versioning](https://semver.org/).

## [0.1.0] - 2026-09-07

### Added
- Foundation: repository, CI, lint, typecheck, build
- Database schema (Prisma + SQLite, PostgreSQL ready) + seed demo
- Auth (JWT + bcrypt) + RBAC (SUPER_ADMIN, OPERATOR, KEPALA_SEKOLAH, GURU, WALI_KELAS, TU)
- Dashboard profesional (recharts, stats, tren)
- Modul Siswa, Guru, Rombel, Mapel, Jadwal (deteksi konflik)
- Kehadiran siswa/guru + alert threshold configurable
- Nilai (formula configurable, bulk input, import/export)
- Grafik perkembangan individual
- Dapodik adapter (interface + MockDapodikProvider) + sync engine (diff, conflict detection)
- Report template builder (R7/R10 configurable)
- Import/Export Excel, Global Search (Ctrl+K), Audit Log, Backup/Restore
- Dokumentasi guru-friendly + GitHub ready

