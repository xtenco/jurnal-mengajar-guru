# UI Wireframes & Flows - Jurnal Agenda Mengajar Guru (MVP)

## Legend
- Screen IDs mengikuti struktur Next.js routes.
- Komponen utama disebutkan agar desain shadcn/ui konsisten.

## 1. Onboarding & Profil Guru
**Screen WF-01** `/profile/onboarding`
- Hero section tipis dengan judul "Lengkapi Profil Guru" dan progress 1/1.
- Form grid 2 kolom: field Full Name, NIP, School Name, Academic Year (select), Semester (radio).
- Primary button "Simpan & Lanjut" (full width di mobile).
- Secondary link "Nanti dulu" dinonaktifkan untuk MVP.

**Flow F-01**
1. User login pertama kali -> middleware detect profil kosong -> redirect WF-01.
2. Submit valid -> server action upsert -> toast sukses -> redirect `/journal`.
3. Error validasi -> field highlight merah + helper text.

## 2. Dashboard Shell
**Component WF-00** `(dashboard layout)`
- Sidebar kiri (desktop) list menu: Dashboard, Jurnal Harian, Data Master (Kelas, Mapel, Siswa), Laporan Bulanan, Profil.
- Top bar: info guru (avatar + nama sekolah), tombol logout, switch bulan singkat.
- Konten utama responsive (stack di mobile).

## 3. Master Data

### 3.1 Kelas
**Screen WF-02** `/master-data/classes`
- Header: title + button "Tambah Kelas".
- Table: Kolom Nama Kelas, Jumlah Siswa, Aksi (edit, delete).
- Modal create/edit dengan single input + save.
- Confirm dialog (delete) menampilkan peringatan jika ada entri jurnal.

**Flow F-02**
1. Klik "Tambah Kelas" -> modal -> submit -> mutate -> close -> table refresh.
2. Klik edit -> modal prefills -> submit -> toast sukses.
3. Klik delete -> jika tidak ada dependensi -> konfirmasi -> hapus -> toast.
4. Jika ada entri terkait -> dialog menampilkan pesan guard.

### 3.2 Mata Pelajaran
**Screen WF-03** `/master-data/subjects`
- Mirip WF-02 dengan table nama mapel.
- Badge warna jika mapel umum (opsional).
- Modal create/edit untuk nama.

**Flow F-03** sequent sama dengan F-02.

### 3.3 Siswa per Kelas
**Screen WF-04** `/master-data/students`
- Header: select dropdown kelas (default kelas pertama) + tombol "Tambah Siswa".
- Table: Nama Siswa, Terdaftar Sejak, Aksi.
- Empty state ilustrasi jika belum ada siswa.
- Modal create: input nama + badge info kelas aktif.

**Flow F-04**
1. Pilih kelas -> table reload data siswa.
2. Tambah siswa -> modal -> submit -> table update.
3. Edit -> modal -> simpan -> update.
4. Delete -> konfirmasi -> remove -> toast.

## 4. Jurnal Harian
### 4.1 Kalender & Ringkasan
**Screen WF-05** `/journal` (default view)
- Two-column (desktop): kiri calendar month view, kanan daftar entri tanggal terpilih.
- Calendar highlight dot per entri, badge warna jika lebih dari 1 entri.
- Filter bar di atas calendar (dropdown kelas + mapel).
- List panel: setiap entri card menampilkan jam, mapel, materi, status kehadiran.
- CTA "Tambah Entri" floating button (mobile) / button di header (desktop).

**Flow F-05**
1. Calendar load bulan current -> default tanggal hari ini.
2. Klik tanggal -> list panel update -> scrollable list.
3. Tekan filter -> calendar + list re-render.
4. Klik entri -> navigate ke WF-06 edit mode.

### 4.2 Form Entri Jurnal
**Screen WF-06** `/journal/new` dan `/journal/[id]`
- Breadcrumb: Jurnal > Tanggal.
- Section 1: Tanggal (date picker), dropdown Kelas, dropdown Mapel, input Alokasi Waktu.
- Section 2: Textarea Materi/Indikator, Textarea Sumber Belajar, Textarea Catatan tambahan.
- Section 3: Attendance widget (lihat WF-07).
- Footer: tombol "Simpan" (primary), "Simpan & Tambah Lagi" (secondary) opsional, "Batalkan" link.

**Flow F-06**
1. Buka form -> fetch master data -> default tanggal hari ini.
2. Kelas dipilih -> attendance widget load data siswa.
3. Submit -> server action -> redirect ke `/journal` dengan toast.
4. Edit mode -> fields prefill -> `Simpan` update dan kembali.

### 4.3 Attendance Widget
**Component WF-07** (digunakan di WF-06)
- Grid daftar siswa, masing-masing chip dengan toggle hadir/absen.
- Badge counter summary (Hadir: X, Tidak Hadir: Y) realtime.
- Textarea kecil untuk catatan manual.

**Flow F-07**
1. Default semua siswa status hadir.
2. Tap chip -> status toggle -> counter update.
3. Submit form -> daftar absen dikirim -> stored di `journal_absences` + ringkasan.

## 5. Laporan Bulanan
### 5.1 Pratinjau
**Screen WF-08** `/reports`
- Header: title + bulan/tahun picker (combobox).
- Button "Generate" dan "Ekspor PDF" (disabled sebelum generate).
- Setelah generate: preview table full-width menyerupai template (scroll horizontal mobile).
- Header info guru (nama, NIP, sekolah, tahun, semester) dalam card di atas tabel.
- Footer area kosong untuk tanda tangan (dalam preview).

**Flow F-08**
1. Pilih bulan/tahun -> klik Generate -> loading state -> tabel muncul.
2. Jika tidak ada entri -> empty state dengan CTA ke `/journal`.
3. Tombol Ekspor aktif setelah data siap.

### 5.2 Ekspor PDF
**Flow F-09**
1. Klik "Ekspor PDF" -> call API -> tampilkan progress spinner.
2. Respons stream -> trigger browser download -> toast sukses + link "Unduh ulang".
3. Jika gagal -> toast error + opsi retry.

## 6. Profil (Edit)
**Screen WF-09** `/profile`
- Card form mirip onboarding, menampilkan data tersimpan.
- Tombol "Simpan Perubahan" + indicator last updated.
- Seksi tambahan: tombol "Kelola Kredensial" redirect ke portal Clerk.

**Flow F-10**
1. User akses menu Profil -> lihat data -> edit -> simpan -> toast.
2. Klik kredensial -> buka tab baru ke Clerk user settings.

## 7. Navigasi Global
- Breadcrumb di halaman detail untuk membantu orientasi.
- State CTA diselaraskan (primary untuk aksi utama, subtle untuk cancel).
- Responsif: sidebar collapse jadi drawer, tabel -> card list.

## 8. Future Enhancements Placeholder
- Slot di WF-05 untuk kartu ringkasan (total jam, attendance rate) saat fitur P2 siap.
- WF-08 dapat ditambah toggle tampilan grafik pada fase lanjutan.
