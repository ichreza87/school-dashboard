# Contributing - School Dashboard

Terima kasih ingin berkontribusi!

## Cara Kontribusi (Mudah untuk Guru & Developer Pemula)

1. **Fork** repository ini (tombol Fork di kanan atas GitHub)
2. **Clone** hasil fork kamu:
   ``bash
   git clone https://github.com/username-kamu/school-dashboard.git
   cd school-dashboard
   ``
3. Buat branch baru:
   ``bash
   git checkout -b feat/nama-fitur
   ``
4. Install & jalankan lokal:
   ``bash
   npm install
   npm run dev
   ``
5. Lakukan perubahan, lalu test:
   ``bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ``
6. Commit dengan conventional commits:
   - feat: tambah fitur baru
   - fix: perbaiki bug
   - docs: perbaikan dokumentasi
   - chore: tugas pemeliharaan
7. Push & buat Pull Request

## Aturan

- Jangan commit file \.env\, credential, atau data siswa nyata.
- Gunakan data demo fiktif (lihat \examples/demo-data\).
- Tulis deskripsi PR yang jelas: masalah, solusi, cara test.

## Butuh Bantuan?

Buka Issue dengan template yang tersedia atau tanya di Discussions.
