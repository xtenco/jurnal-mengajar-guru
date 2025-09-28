# Effort Estimates - MVP Technical Tasks

## Estimation Model
- Skala poin Fibonacci ringan: 1 (trivial), 2 (ringan), 3 (sedang), 5 (kompleks).
- Estimasi mencerminkan effort dev penuh termasuk coding, unit testing, dan review.
- Dependency menunjukkan prasyarat yang perlu selesai terlebih dahulu.

## US-01: Kelola Profil Guru (Total 11 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Provision Supabase `profiles` table (columns, defaults, RLS policies) via migration | 2 | - | Gunakan Supabase CLI, siapkan policy auth.uid() |
| Implement Clerk webhook/server action to upsert profile on first login | 3 | profiles table | Perlukan endpoint secure + background retries |
| Build profile onboarding & edit form page with client/server validation | 5 | profiles table, auth guard | UI + zod validation, handling error |
| Add route guard/middleware to block access until profil wajib terisi | 1 | profiles table | Cek profile completeness sebelum akses |

## US-02: Kelola Daftar Kelas (Total 8 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Create Supabase `classes` table migration plus ownership RLS | 2 | profiles table | Pastikan FK ke profiles |
| Develop kelas management UI (list, create, edit) with optimistic updates | 3 | classes table | Gunakan TanStack Query |
| Enforce backend constraint that prevents deleting kelas with journal entries | 3 | classes & journal_entries tables | Perlu trigger/check + error handling |

## US-03: Kelola Daftar Mata Pelajaran (Total 7 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Create Supabase `subjects` table migration plus ownership RLS | 2 | profiles table | Mirip struktur classes |
| Build mata pelajaran management page (CRUD) sharing UI pattern with kelas | 3 | subjects table | Bisa reuse komponen table |
| Add safe-delete guard returning error when subject still referenced | 2 | subjects & journal_entries tables | Validasi di server action |

## US-04: Kelola Daftar Siswa per Kelas (Total 9 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Create Supabase `students` table migration and RLS scoped ke user + kelas | 3 | classes table | Pastikan FK cascade restrict |
| Implement siswa management UI filtered per kelas (list, add, edit, delete) | 3 | students table | Dropdown filter + TanStack Query |
| Ensure delete/action hooks update journal attendance references gracefully | 3 | journal_absences table | Perlu penjagaan cascading |

## US-05: Buat dan Kelola Entri Jurnal Harian (Total 12 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Create Supabase `journal_entries` table migration (relations, defaults) | 3 | classes, subjects tables | Termasuk index tanggal |
| Implement jurnal harian form page with server action untuk create/update | 5 | journal_entries table, master data | Form kompleks + handling attendance payload |
| Build entri list view per tanggal with inline edit trigger | 2 | journal_entries table | Tampilkan summary per entri |
| Add validation rules matching mandatory kolom di PRD | 2 | form page | Zod schema + server validation |

## US-06: Penandaan Kehadiran Pintar (Total 11 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Create Supabase `journal_absences` join table migration + RLS | 3 | journal_entries, students tables | Many-to-many bridging |
| Build attendance widget: daftar siswa default hadir + toggles ketidakhadiran | 5 | students data, form infra | Client interaction intensif |
| Auto-calc hadir/tidak hadir di sisi server dan persist summary fields | 2 | journal_entries update | Logika agregasi saat submit |
| Render kembali status kehadiran saat entri dibuka ulang | 1 | attendance widget | Prefill state dari data server |

## US-07: Lihat Kalender dan Daftar Entri (Total 10 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Implement kalender bulan dengan highlight tanggal bersumber dari jurnal | 3 | journal_entries data | Pakai react-day-picker/custom calendar |
| Wire data fetching (per bulan) dan caching untuk kalender + daftar entri | 3 | API endpoints journal | Gunakan TanStack Query/Server RSC |
| Tambahkan filter kelas/mata pelajaran yang mempengaruhi kalender & daftar | 2 | master data | Refilter dataset client/server |
| Sinkronkan klik kalender dengan tampilan detail entri harian | 2 | list view | Pastikan navigasi mulus |

## US-08: Pratinjau Laporan Bulanan (Total 9 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Bangun service aggregator untuk menarik seluruh entri pada periode terpilih | 3 | journal_entries + absences | Dipakai juga oleh PDF |
| Implement halaman pratinjau laporan meniru layout PDF referensi | 3 | aggregator service | Layout tabel responsif |
| Prefill header laporan dengan data profil (nama, NIP, sekolah, tahun, semester) | 1 | profiles data | Pastikan fallback bila kosong |
| Sertakan ringkasan kehadiran & keterangan sesuai format tabel | 2 | aggregator output | Format string ringkas |

## US-09: Ekspor Laporan ke PDF (Total 13 pts)
| Task | Poin | Dependency | Catatan |
| --- | --- | --- | --- |
| Tentukan & integrasikan library PDF (mis. react-pdf / Puppeteer) pada sisi server | 3 | architecture decision | Setup runtime + fonts |
| Implement server action/route handler untuk rendering dan streaming file PDF | 5 | aggregator service | Perlu auth & error handling |
| Tambah tombol unduh + notif sukses serta opsi unduhan ulang dari cache | 2 | reports UI | Gunakan state management |
| Pastikan hasil PDF identik dengan pratinjau (parity tests/manual review) | 3 | PDF output | QA + snapshot script |

## Summary
- Total poin seluruh MVP: **90 poin**.
- Estimasi burn rate: dengan kapasitas 10 poin/minggu, butuh ~9 minggu; jika 20 poin, ~4.5 minggu.
- Prioritas awal: US-01 s/d US-06 untuk core journaling; US-08/09 bisa paralel setelah aggregator siap.
