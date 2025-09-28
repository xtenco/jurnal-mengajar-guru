# Architecture Plan - Next.js + Supabase

## 1. Goals & Constraints
- Deliver MVP fitur P1 dengan performa baik di desktop/mobile tanpa kompleksitas berlebih.
- Mengutamakan kesederhanaan deployment (Vercel + Supabase) dan maintainability modul.
- Memastikan data guru terisolasi (multitenant) melalui Clerk auth + Supabase RLS.

## 2. Aplikasi Next.js (App Router)
- Struktur folder `/app` dibagi berdasarkan domain fitur (`/profile`, `/master-data`, `/journal`, `/reports`).
- Gunakan server components sebagai default untuk data-read, kombinasikan client components hanya untuk interaksi intensif (form, kalender).
- Shared layout: `/app/(dashboard)/layout.tsx` menangani shell (sidebar, top bar) setelah profil lengkap.
- Global providers: `SupabaseProvider` (client), `ClerkProvider`, dan `QueryClientProvider` (TanStack Query) ditempatkan di `app/providers.tsx`.

## 3. Authentication & Authorization
- Clerk sebagai identity layer: config di `middleware.ts` untuk proteksi route dan enforce login.
- Server actions & RSC memakai `@clerk/nextjs/server` untuk mengambil `auth().userId`.
- Onboarding check: middleware custom memeriksa keberadaan profil di Supabase; redirect ke `/profile/onboarding` jika belum lengkap.
- Clerk webhook (`/api/webhooks/clerk`) opsional untuk sinkronisasi user baru -> stub profil Supabase dengan `user_id`.

## 4. Supabase Integration
- Database akses via `@supabase/auth-helpers-nextjs` untuk client component dan service role key (Edge-safe) untuk server actions.
- Migrations & seed dijalankan via Supabase CLI (`supabase/migrations`).
- Gunakan helper layer `lib/supabase/server.ts` dan `lib/supabase/client.ts` untuk inisialisasi terstandar.
- Semua query tulis dijalankan di server actions/route handlers untuk menjaga key rahasia.

## 5. Data Access & RLS
- Tabel `profiles`, `classes`, `subjects`, `students`, `journal_entries`, `journal_absences` memiliki kolom `user_id`.
- RLS policy: hanya pemilik (`auth.uid() = user_id`) yang dapat `select`, `insert`, `update`, `delete` kecuali `profiles.id` yang langsung pakai Clerk `user_id`.
- Gunakan Supabase policies tambahan untuk mencegah delete jika ada foreign key (gunakan `on delete restrict` plus validation di server action).

## 6. Feature Module Breakdown
- **Profile Module**: server action `upsertProfile`, form dengan React Hook Form + Zod; data fetch via server component.
- **Master Data Module**: shared table component, modals untuk create/edit, TanStack Query mutate + invalidate cache.
- **Journal Module**: form wizard memuat dropdown kelas/mapel (prefetched), attendance widget (client component) menulis ke server action `saveJournalEntry` dengan payload absensi.
- **Calendar View**: server component fetch summary per bulan, client calendar (mis. `@fullcalendar/react` atau `react-day-picker`) menerima dataset highlight.
- **Reporting Module**: aggregator service `lib/reports/generateMonthlyReport.ts` susun struktur data tabel + metadata.

## 7. PDF Generation Strategy
- Render PDF di server route `/api/reports/pdf` menggunakan `@react-pdf/renderer` untuk kesetiaan terhadap layout tabel.
- Pipeline: client request -> server memanggil `generateMonthlyReport` -> mapping ke komponen PDF -> stream PDF via `Response`.
- Simpan cache (optional) di Supabase storage dengan key kombinasi `userId-month-year` untuk unduhan ulang.
- Validasi kesamaan layout dengan snapshot testing (Node env) atau manual QA terhadap template referensi.

## 8. UI & State Management
- UI components menggunakan shadcn/ui (Button, Table, Dialog, Form).
- Form state: React Hook Form + Zod resolver untuk validasi sinkron.
- Remote state caching: TanStack Query memegang data master dan entri jurnal; invalidasi setelah mutasi server action.
- Global toast/feedback via `sonner` atau komponen toast shadcn.

## 9. Error Handling & Observability
- Tangani error server action dengan pattern `try/catch` -> `return { error }` ke client.
- Global error boundary (`app/error.tsx`) dan not-found handling untuk entri yang tidak ditemukan.
- Logging penting (mis. kegagalan PDF) kirim ke Supabase `logs` table atau pihak ketiga (Sentry) jika ditambahkan nanti.

## 10. Environment & Deployment
- Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`.
- Pastikan route PDF menggunakan runtime Node (`export const runtime = "nodejs";`) di Next.js.
- Deploy di Vercel dengan Supabase sebagai managed Postgres; gunakan Vercel env untuk key rahasia.

## 11. Alignment with Task Breakdown
- Dokumen ini mendukung `tasks/mvp-tech-tasks.md` dengan memberikan jalur implementasi setiap modul.
- Pastikan saat mark tugas selesai, developer mengikuti struktur arsitektur dan policy yang dijelaskan di sini.
