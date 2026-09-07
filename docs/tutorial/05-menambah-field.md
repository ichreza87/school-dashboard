# 05 - Menambah Field

Edit backend/prisma/schema.prisma, tambah field nullable dulu agar seed tidak rusak. Lalu ``npx prisma migrate dev`` dan update UI form di frontend/src/pages/*.tsx.

Contoh: tambah ``nickname String?`` di Student -> migrate -> tambah input di Students.tsx.
