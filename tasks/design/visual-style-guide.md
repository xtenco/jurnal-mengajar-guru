# Visual Style Guide - Jurnal Agenda Mengajar Guru

## Design Principles
- Bersih, mudah dibaca, fokus pada konten data.
- Gunakan kontras cukup tinggi agar informasi cepat terbaca di kelas/sekolah.
- Responsif: tampil baik di layar laptop dan tablet/ponsel.

## Color Palette
| Token | Hex | Usage |
| --- | --- | --- |
| `--color-bg` | #F8FAFC | Latar belakang utama (body, dashboard shell). |
| `--color-surface` | #FFFFFF | Kartu, tabel, modal. |
| `--color-primary` | #2563EB | CTA utama, link aktif, highlight kalender. |
| `--color-primary-hover` | #1D4ED8 | Hover state tombol utama. |
| `--color-secondary` | #0EA5E9 | Aksen sekunder (badge, info). |
| `--color-border` | #E2E8F0 | Garis pemisah, tabel grid. |
| `--color-text` | #1E293B | Teks utama. |
| `--color-text-muted` | #64748B | Label sekunder, placeholder. |
| `--color-success` | #16A34A | Notif sukses, status hadir. |
| `--color-warning` | #F97316 | Notif peringatan, status absen. |
| `--color-error` | #DC2626 | Validasi error. |

## Typography
- Gunakan font sans-serif humanist (contoh: `Inter`, fallback `Segoe UI`, `sans-serif`).
- Skala heading:
  - H1: 28px / 34px, semi-bold (dashboard title).
  - H2: 22px / 28px, semi-bold (section header).
  - H3: 18px / 24px, medium (card title).
- Body text: 16px / 24px, regular; gunakan 14px untuk label atau meta.
- Teks tabel: 14px / 20px untuk densitas data yang nyaman.

## Spacing & Layout
- Grid dasar 4px; jarak umum 8, 12, 16, 24px.
- Card padding: 24px desktop, 16px mobile.
- Table row height minimal 44px untuk aksesibilitas.
- Modal content maksimal lebar 480px (form) atau 720px (tabel detail).
- Sidebar lebar 240px desktop, collapse menjadi drawer di mobile.

## Components Guidelines
- **Buttons**: gunakan shadcn `Button` dengan varian `default` (primary), `outline` (secondary), `ghost` (toolbar). Corner radius 6px. Ikuti states: hover, disabled (opacity 60%).
- **Cards**: background `--color-surface`, border halus `--color-border`, shadow ringan (`0 1px 2px rgba(15, 23, 42, 0.08)`).
- **Table**: header bold, background #EDF2FF untuk highlight; zebra stripes opsional (#F1F5F9).
- **Form Inputs**: border 1px `--color-border`, focus ring `--color-primary` 2px. Error state ganti border `--color-error` + helper text merah.
- **Calendar**: tanggal aktif menggunakan lingkaran `--color-primary` dengan teks putih; tanggal dengan entri gunakan dot `--color-secondary`.
- **Badges**: gunakan radius penuh (pill). Variasi warna: primary (highlight), success (hadir), warning (absen).
- **Toasts/Alerts**: latar `--color-surface`, border kiri 4px warna sesuai status.

## Iconography
- Pakai Lucide Icons 20px; warna default `--color-text-muted`.
- Gunakan ikon minimal hanya untuk mendukung teks (contoh: edit, delete, calendar).

## Imagery & Illustrations
- Gunakan ilustrasi sederhana flat style (opsional) untuk empty states; warna serasi dengan palette.
- Hindari foto berat agar loading cepat.

## Accessibility
- Pastikan kontras teks terhadap background >= 4.5:1.
- Semua tombol/ikon harus memiliki label aria.
- Fokus state terlihat jelas (outline atau shadow).

## Usage Notes
- Implement token di file tema (CSS variables) agar konsisten antara web dan PDF pratinjau.
- Jika menggunakan dark mode nanti, palette ini jadi basis mode terang; siapkan token inverse sesuai kebutuhan.
- Update style guide bila ada komponen shadcn baru yang diadopsi.
