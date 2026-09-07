# Architecture

``mermaid
Frontend (Vite React) --fetch--> Express API --Prisma--> SQLite/Postgres
                                |
                                +-- DapodikProvider -- Mock/Real
                                +-- SyncEngine (diff, conflict)
                                +-- RBAC, Audit, Backup
``

**Monorepo:** root package.json workspaces [frontend, backend]. Frontend Tailwind + Recharts, Backend Express + Zod + Helmet + RateLimit.

**DB:** Prisma schema 20+ model, migration di backend/prisma/migrations, seed 1 sekolah/100 siswa/20 guru.

**Keamanan:** bcrypt, JWT, RBAC, Helmet, CORS, validasi Zod, audit log.

**Performance:** pagination (20), index di fullName/status, aggregation via groupBy/count, lazy loading, debounced search, vite build chunk.
