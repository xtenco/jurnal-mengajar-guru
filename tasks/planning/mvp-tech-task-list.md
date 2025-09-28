# Technical Task Breakdown - MVP

## Status Legend
- [ ] Not started
- [x] Completed

## US-01: Kelola Profil Guru
- [ ] Provision Supabase `profiles` table (columns, defaults, RLS policies) via migration.
- [ ] Implement Clerk webhook/server action to upsert profile on first login.
- [ ] Build profile onboarding & edit form page with client/server validation.
- [ ] Add route guard/middleware to block access until profil wajib terisi.

## US-02: Kelola Daftar Kelas
- [ ] Create Supabase `classes` table migration plus ownership RLS.
- [ ] Develop kelas management UI (list, create, edit) with optimistic updates.
- [ ] Enforce backend constraint that prevents deleting kelas with journal entries.

## US-03: Kelola Daftar Mata Pelajaran
- [ ] Create Supabase `subjects` table migration plus ownership RLS.
- [ ] Build mata pelajaran management page (CRUD) sharing UI pattern with kelas.
- [ ] Add safe-delete guard returning error when subject still referenced.

## US-04: Kelola Daftar Siswa per Kelas
- [ ] Create Supabase `students` table migration and RLS scoped ke user + kelas.
- [ ] Implement siswa management UI filtered per kelas (list, add, edit, delete).
- [ ] Ensure delete/action hooks update journal attendance references gracefully.

## US-05: Buat dan Kelola Entri Jurnal Harian
- [ ] Create Supabase `journal_entries` table migration (relations, defaults).
- [ ] Implement jurnal harian form page with server action untuk create/update.
- [ ] Build entri list view per tanggal with inline edit trigger.
- [ ] Add validation rules matching mandatory kolom di PRD.

## US-06: Penandaan Kehadiran Pintar
- [ ] Create Supabase `journal_absences` join table migration + RLS.
- [ ] Build attendance widget: daftar siswa default hadir + toggles ketidakhadiran.
- [ ] Auto-calc hadir/tidak hadir di sisi server dan persist summary fields.
- [ ] Render kembali status kehadiran saat entri dibuka ulang.

## US-07: Lihat Kalender dan Daftar Entri
- [ ] Implement kalender bulan dengan highlight tanggal bersumber dari jurnal.
- [ ] Wire data fetching (per bulan) dan caching untuk kalender + daftar entri.
- [ ] Tambahkan filter kelas/mata pelajaran yang mempengaruhi kalender & daftar.
- [ ] Sinkronkan klik kalender dengan tampilan detail entri harian.

## US-08: Pratinjau Laporan Bulanan
- [ ] Bangun service aggregator untuk menarik seluruh entri pada periode terpilih.
- [ ] Implement halaman pratinjau laporan meniru layout PDF referensi.
- [ ] Prefill header laporan dengan data profil (nama, NIP, sekolah, tahun, semester).
- [ ] Sertakan ringkasan kehadiran & keterangan sesuai format tabel.

## US-09: Ekspor Laporan ke PDF
- [ ] Tentukan & integrasikan library PDF (mis. react-pdf / Puppeteer) pada sisi server.
- [ ] Implement server action/route handler untuk rendering dan streaming file PDF.
- [ ] Tambah tombol unduh + notif sukses serta opsi unduhan ulang dari cache.
- [ ] Pastikan hasil PDF identik dengan pratinjau (parity tests/manual review).
