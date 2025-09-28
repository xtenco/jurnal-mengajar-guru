# Sprint 01 Plan - Jurnal Agenda Mengajar Guru

## Sprint Details
- **Sprint Goal**: Guru dapat login, melengkapi profil, dan mengelola data master (kelas & mata pelajaran) sebagai dasar pencatatan jurnal.
- **Duration**: 2 minggu (tentatif) – menyesuaikan ritme agent.
- **Success Criteria**:
  1. Onboarding profil wajib jalan dan memblokir akses fitur lain sampai lengkap.
  2. Guru dapat CRUD data kelas dan mata pelajaran dengan guard referensi.
  3. Lingkungan Next.js + Supabase siap untuk pengembangan fitur jurnal selanjutnya.

## Sprint Backlog

### SP-01: Project Scaffolding & Infrastructure
- Setup project Next.js (App Router) + TypeScript + linting/prettier.
- Integrate Clerk (auth) basic login/logout, protect dashboard routes.
- Add Supabase client/server helpers & environment wiring.
- Definition of Done (DoD): repo scaffolding dengan CI lint/test placeholder, env sample (.env.example), basic health check page.

### SP-02: Database Foundations
- Apply migrations for `profiles`, `classes`, `subjects` tables dengan RLS policies.
- Configure Supabase CLI workspace + documentation for running migrations.
- DoD: tabel & RLS tervalidasi via Supabase studio atau script, migration files tersimpan.

### SP-03: Profil Guru Onboarding (US-01)
- Implement Clerk webhook/server action untuk bootstrap profil.
- Bangun halaman `/profile/onboarding` + `/profile` sesuai wireframe.
- Middleware/route guard yang memastikan profil lengkap sebelum masuk dashboard.
- DoD: form validasi client/server, unit test server action, UX flow dari login -> jurnal tanpa error.

### SP-04: Manajemen Kelas (US-02)
- CRUD UI untuk kelas (table + modal) dengan TanStack Query + server actions.
- Backend guard prevent delete jika kelas digunakan oleh jurnal (placeholder logic hingga jurnal siap).
- DoD: operasi tambah/edit/hapus berfungsi, ada notifikasi feedback, error guard tampil.

### SP-05: Manajemen Mata Pelajaran (US-03)
- CRUD UI reuse komponen dari kelas.
- Safe-delete constraint jika mapel direferensikan.
- DoD: Fitur lengkap dengan state loading/error jelas, tests minimal untuk server action delete check.

## Carryovers / Out of Scope
- Manajemen siswa (US-04) dan fitur jurnal (US-05+) akan dimulai Sprint 02.
- PDF/report pipeline belum masuk sprint ini.

## Risks & Mitigations
- **Integrasi Clerk/Supabase**: siapkan dokumentasi environment dan testing stub; lakukan setup di awal sprint (SP-01).
- **RLS misconfig**: tambahkan script verifikasi akses per user saat SP-02.

## Review Checklist
- Demo akhir: alur login -> onboarding -> update profil -> tambah kelas/mapel -> guard delete.
- Dokumentasi diperbarui (`tasks/planning/mvp-tech-task-list.md` progress & README dev setup).
