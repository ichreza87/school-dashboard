# Security Policy

## Melaporkan Kerentanan

Jangan buka Issue publik untuk kerentanan keamanan. Hubungi maintainer via email atau GitHub Security Advisory.

## Praktik Keamanan

- Password di-hash dengan bcrypt (10 rounds).
- JWT untuk session, Helmet untuk secure headers.
- Rate limiting, validasi input (Zod), RBAC.
- Credential sensitif di-encrypt, tidak pernah di-commit.
- Audit log untuk semua perubahan data.

## Versi Didukung

| Versi | Didukung |
|-------|----------|
| 0.1.x | ?        |
