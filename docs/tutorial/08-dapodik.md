# 08 - Dapodik

Abstraksi di backend/src/modules/dapodik/provider.ts. Interface DapodikProvider wajib diimplementasi provider resmi (jangan bypass auth/scraping ilegal). MockDapodikProvider untuk dev mengembalikan 10 siswa & 2 guru fiktif. Ganti via env DAPODIK_PROVIDER=mock|real.
