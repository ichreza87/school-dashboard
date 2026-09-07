# Installation

## Mode 1: Local (1 komputer)
Jalankan backend+frontend di komputer yang sama, DB SQLite.

## Mode 2: LAN
Backend di komputer operator, frontend diakses guru via IP LAN (http://192.168.1.10:3000). Set HOST=0.0.0.0, CORS_ORIGIN=* atau IP spesifik.

## Mode 3: Server
Deploy ke VPS, ganti DATABASE_URL ke PostgreSQL, jalankan \
px prisma migrate deploy\, PM2 atau Docker.

Lihat docs/configuration.md untuk env lengkap.
