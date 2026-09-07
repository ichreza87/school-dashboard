# 09 - Synchronization

Alur: LOCAL DB -> COMPARE -> REMOTE -> DIFF ENGINE (backend/src/modules/sync/engine.ts) -> CONFLICT DETECTION -> USER CONFIRMATION -> SYNC.

Preview menampilkan NEW/UPDATED/UNCHANGED/CONFLICT/ERROR. Konflik per-field dengan opsi Gunakan Lokal / Dapodik / Gabungkan / Lewati. Tidak ada overwrite massal. History di /api/sync/history wajib backup sebelum sync besar.
