# API Reference

Base: ``/api``, auth via ``Authorization: Bearer <JWT>``.

| Method | Path | Role | Deskripsi |
|--------|------|------|-----------|
| POST | /auth/login | public | Login -> token |
| POST | /auth/register | public | Register |
| GET | /auth/me | auth | Profil |
| GET | /students?search=&page=&limit=&rombelId= | auth | List + pagination (20) |
| POST | /students | auth | Create (Zod validasi) |
| GET | /students/:id | auth | Detail + relations |
| PUT | /students/:id | auth | Update |
| DELETE | /students/:id | OPERATOR | Soft delete |
| GET | /teachers | auth | List |
| POST | /teachers | auth | Create |
| GET | /rombels | auth | List |
| POST | /rombels | auth | Create |
| GET/POST | /subjects, /schedules | auth | CRUD + deteksi konflik jadwal |
| GET/POST | /attendance/students, /attendance/teachers | auth | Presensi |
| GET/POST | /grades, /grades/bulk | auth | Nilai + formula configurable |
| GET | /analytics/overview | auth | Agregasi total, rate, avg |
| GET | /report-templates | auth | List template R7/R10 |
| POST | /report-templates | auth | Buat template |
| GET | /search?q= | auth | Global search |
| GET | /dapodik/status | auth | Status koneksi |
| POST | /dapodik/test-connection | auth | Test |
| POST | /dapodik/preview | auth | Diff preview |
| POST | /dapodik/sync | auth | Eksekusi sync |
| GET | /sync/history | auth | History |
| GET | /data-quality | auth | Completeness, dup, conflict |
| GET | /duplicates?type=nisn|nama | auth | Deteksi duplikat |
| POST | /import/students/preview, /execute | auth | Import wizard |
| GET | /export/students | auth | Export xlsx |
| POST/GET | /backup | OPERATOR | Backup |
| POST | /backup/:id/restore | SUPER_ADMIN | Restore |
| GET | /audit-logs | ADMIN | Audit |
| GET/PUT | /settings/:key | auth | Config |

Lihat ``backend/src/index.ts`` untuk implementasi lengkap.
