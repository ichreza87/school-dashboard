# Architecture

Monorepo: frontend (Vite React) <-> Express API <-> Prisma <-> SQLite/Postgres. Provider -> Validation -> Sync Engine -> DB. RBAC middleware, audit log, rate limit, helmet.
