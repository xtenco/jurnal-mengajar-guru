# PDF Implementation Plan - Jurnal Agenda Mengajar Guru

## 1. Goals & Constraints
- Hasil PDF harus identik dengan template referensi PRD (kolom, header, footer, ruang tanda tangan).
- Render stabil di server tanpa memerlukan headless browser eksternal jika memungkinkan.
- File final siap diunduh pengguna melalui tombol "Ekspor PDF" di `/reports`.

## 2. Data Pipeline
- Input: parameter `month`, `year`, `userId`.
- Service `generateMonthlyReport(userId, month, year)` menarik data berikut:
  - Profil guru: nama, NIP, sekolah, tahun pelajaran, semester.
  - Daftar entri jurnal pada rentang tanggal -> join kelas, mapel.
  - Absensi: join `journal_absences` untuk nama siswa tidak hadir.
- Service mengembalikan struktur JSON:
```ts
{
  profile: {...},
  period: { monthLabel, year, generatedAt },
  rows: [
    {
      date,
      dayName,
      className,
      subjectName,
      timeAllocation,
      material,
      source,
      attendanceSummary, // "Hadir: xx; Tidak Hadir: yy"
      absentees,         // string nama siswa dipisah koma
      notes
    }
  ],
  totals: { sessionCount, totalTime }
}
```

## 3. Layout Mapping
- Header kiri: kop madrasah/sekolah (nama sekolah, alamat opsional) -> ambil dari profil; header kanan: tabel kecil (Nama Guru, NIP, Kelas?, perlu verifikasi template).
- Judul tengah: "AGENDA KEGIATAN HARIAN GURU" + subheader bulan / tahun.
- Table utama kolom: No, Hari/Tanggal, Mata Pelajaran, Kelas, Alokasi Waktu, Materi/Indikator, Sumber Belajar, Kehadiran Siswa, Keterangan.
- Footer: baris tanda tangan tiga kolom (Kepala Madrasah, Guru Kelas, Tanggal) sesuai referensi.
- Spacing: gunakan unit konsisten (pt) agar PDF rapi; margin 1.5cm.

## 4. Tooling & Rendering Strategy
- Pilih `@react-pdf/renderer` untuk membangun komponen PDF dengan React (sesuai environment Next.js Node runtime).
- Alternatif fallback: Puppeteer + HTML template jika layout tabel complex, namun default ke react-pdf.
- Struktur file:
  - `app/api/reports/pdf/route.ts`: menerima POST (month/year) -> auth check -> panggil service -> render PDF -> stream Response.
  - `lib/reports/report-pdf.tsx`: komponen React-pdf (Document, Page, View, Text, Table) menggunakan data dari service.
- Gunakan font standar (Liberation Serif/Sans) di-embed agar konsisten cross-device.

## 5. Styling Details
- Header table memanfaatkan bold text, background abu-abu (#f2f2f2).
- Tabel: garis 0.5pt, cell padding 6pt vertikal, 8pt horizontal.
- Kolom kehadiran menampilkan ringkasan + daftar nama absen dengan line break jika panjang.
- Penomoran baris otomatis (index + 1).
- Footer tanda tangan: letakkan `..................................` placeholder di bawah nama.

## 6. Caching & Reuse
- Setelah PDF dibuat, simpan buffer di Supabase Storage bucket `reports/` dengan key `${userId}/${year}-${month}.pdf`.
- Di endpoint, jika flag `reuse=true` dan file ada -> return storage file stream tanpa render ulang.
- Tambah metadata (generatedAt, totalEntries) di Storage table atau Supabase key-value jika diperlukan.

## 7. Error Handling
- Validasi: jika profil belum lengkap -> return error (409) dengan pesan "Lengkapi profil".
- Jika tidak ada entri -> return 404 + pesan -> UI tampilkan modal "Belum ada data bulan ini".
- Tangkap error render -> log ke Supabase logs + return 500.

## 8. Testing & QA
- Snapshot test: jalankan Node script yang memanggil komponen react-pdf -> bandingkan output size/layout (manual visual diff).
- Uji data edge case: banyak entri satu hari, keterangan panjang, siswa absen >10 nama.
- Verifikasi PDF di viewer standar (Adobe Reader, browser) agar layout konsisten.
- QA check: cocokkan kolom dengan PDF referensi (posisi, font size, spacing).

## 9. Deployment Considerations
- Endpoint `route.ts` harus set `export const runtime = "nodejs";` untuk akses Node features.
- Pastikan ukuran PDF < 5MB untuk unduhan cepat.
- Monitoring: log waktu render; jika >3 detik, evaluasi caching atau pre-generation.

## 10. Alignment with Tasks
- Mendukung task US-08 (pratinjau) & US-09 (ekspor) dari `tasks/mvp-tech-tasks.md`.
- Memberi detail implementasi untuk bullet "Implement server action/route handler" dan "Pastikan hasil PDF identik".
