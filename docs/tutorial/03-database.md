# 03 - Database

Schema di backend/prisma/schema.prisma. Tabel utama: users, schools, students, teachers, rombels, subjects, schedules, studentAttendance, teacherAttendance, assessments, studentGrades, syncSessions, auditLogs, backups, reportTemplates, settings.

Migration: ``bash
npx prisma migrate dev --name tambah-field
npx prisma generate
``

Jangan edit DB manual — selalu via migration. Untuk Postgres, ganti DATABASE_URL ke postgresql://... lalu ``npx prisma migrate deploy``.
