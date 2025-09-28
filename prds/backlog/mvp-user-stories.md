# User Stories & Acceptance Criteria - Jurnal Agenda Mengajar Guru (MVP)

## Scope
Fokus pada fitur prioritas P1: profil guru, data master (kelas, mata pelajaran, siswa), pencatatan jurnal harian dengan smart attendance, serta laporan bulanan dan ekspor PDF.

## User Stories

### US-01: Kelola Profil Guru
- **Role**: Guru terautentikasi
- **Need**: Menyimpan data profil agar otomatis terisi saat membuat jurnal dan laporan
- **Acceptance Criteria**
  - Given guru login pertama kali dan profil belum lengkap, When ia membuka aplikasi, Then sistem menampilkan formulir profil wajib diisi sebelum melanjutkan.
  - Given guru mengisi seluruh kolom wajib dengan data valid, When ia menyimpan formulir, Then data tersimpan dan muncul sebagai default pada entri jurnal dan laporan.
  - Given profil sudah tersimpan, When guru memperbarui salah satu kolom dan menyimpan, Then perubahan tercatat dengan cap waktu terbaru dan digunakan pada entri berikutnya.

### US-02: Kelola Daftar Kelas
- **Role**: Guru terautentikasi
- **Need**: Mengelola daftar kelas yang diajar agar pilihan kelas konsisten di jurnal
- **Acceptance Criteria**
  - Given guru berada di halaman pengelolaan kelas, When ia menambahkan nama kelas unik dan menyimpan, Then kelas baru tampil dalam daftar terurut.
  - Given kelas sudah ada, When guru mengubah nama kelas dan menyimpan, Then perubahan terlihat di daftar dan pilihan kelas pada formulir jurnal.
  - Given kelas memiliki entri jurnal aktif, When guru mencoba menghapus kelas tersebut, Then sistem menolak penghapusan dan menampilkan pesan bahwa kelas masih memiliki entri terkait.

### US-03: Kelola Daftar Mata Pelajaran
- **Role**: Guru terautentikasi
- **Need**: Mengelola mata pelajaran yang diampu agar mudah dipilih pada jurnal
- **Acceptance Criteria**
  - Given guru berada di halaman pengelolaan mata pelajaran, When ia menambahkan nama mata pelajaran baru dan menyimpan, Then mata pelajaran tersebut langsung tersedia pada dropdown jurnal.
  - Given mata pelajaran sudah ada, When guru mengubah nama dan menyimpan, Then daftar mata pelajaran dan referensi pada entri jurnal diperbarui.
  - Given mata pelajaran digunakan oleh entri jurnal, When guru mencoba menghapusnya, Then sistem mencegah penghapusan dan memberi tahu bahwa ada entri yang masih menggunakan mata pelajaran tersebut.

### US-04: Kelola Daftar Siswa per Kelas
- **Role**: Guru terautentikasi
- **Need**: Menyimpan daftar siswa per kelas untuk mendukung pencatatan kehadiran
- **Acceptance Criteria**
  - Given guru memilih sebuah kelas, When ia menambahkan siswa baru dengan nama unik dalam kelas tersebut, Then siswa muncul dalam daftar dan dapat digunakan untuk penandaan kehadiran.
  - Given siswa sudah terdaftar, When guru mengedit nama siswa dan menyimpan, Then perubahan terlihat di daftar siswa dan pada form penandaan kehadiran.
  - Given guru ingin menghapus siswa, When ia mengonfirmasi penghapusan, Then siswa hilang dari daftar dan tidak muncul lagi saat menandai ketidakhadiran.

### US-05: Buat dan Kelola Entri Jurnal Harian
- **Role**: Guru terautentikasi
- **Need**: Mencatat aktivitas mengajar harian sesuai format standar
- **Acceptance Criteria**
  - Given guru membuka halaman pencatatan jurnal, When ia mengisi tanggal, kelas, mata pelajaran, alokasi waktu, materi/indikator, dan sumber belajar valid, Then ia dapat menyimpan entri dan melihatnya di daftar entri hari tersebut.
  - Given entri jurnal tersimpan, When guru membukanya kembali untuk penyuntingan sebelum laporan dikunci, Then ia dapat memperbarui kolom apapun dan menyimpan perubahan.
  - Given entri jurnal tersimpan, When guru melihat ringkasan harian, Then entri tampil dengan data lengkap termasuk catatan kehadiran dan keterangan tambahan.

### US-06: Penandaan Kehadiran Pintar
- **Role**: Guru terautentikasi
- **Need**: Menandai siswa yang tidak hadir dengan cepat dan akurat
- **Acceptance Criteria**
  - Given guru memilih kelas pada form jurnal, When data siswa tersedia, Then sistem menampilkan daftar siswa dengan status default hadir.
  - Given guru menandai satu atau lebih siswa sebagai tidak hadir, When ia menyimpan entri, Then sistem menghitung otomatis jumlah hadir dan menyimpan nama siswa yang absen pada kolom keterangan.
  - Given entri jurnal memuat data ketidakhadiran, When guru membuka kembali entri atau melihat laporan, Then daftar siswa yang tidak hadir tetap konsisten dengan penandaan sebelumnya.

### US-07: Lihat Kalender dan Daftar Entri
- **Role**: Guru terautentikasi
- **Need**: Memantau entri jurnal berdasarkan kalender dan daftar ringkas
- **Acceptance Criteria**
  - Given guru membuka halaman utama jurnal, When bulan dipilih, Then kalender menyorot tanggal yang memiliki entri.
  - Given kalender menampilkan entri, When guru memilih tanggal tertentu, Then daftar entri untuk tanggal tersebut muncul dengan ringkasan kunci.
  - Given guru ingin memfilter entri, When ia memilih kelas atau mata pelajaran tertentu, Then daftar dan kalender hanya menampilkan entri yang sesuai filter.

### US-08: Pratinjau Laporan Bulanan
- **Role**: Guru terautentikasi
- **Need**: Menghasilkan pratinjau laporan bulanan sebelum ekspor
- **Acceptance Criteria**
  - Given guru memilih bulan dan tahun pada modul laporan, When ia menekan tombol Generate, Then sistem menyusun tabel laporan dari seluruh entri pada periode tersebut.
  - Given profil guru lengkap, When laporan dihasilkan, Then header laporan otomatis terisi dengan nama, NIP, sekolah, tahun pelajaran, dan semester.
  - Given pratinjau ditampilkan, When guru membandingkan dengan template standar, Then kolom, urutan, dan format tabel identik dengan contoh PDF referensi.

### US-09: Ekspor Laporan ke PDF
- **Role**: Guru terautentikasi
- **Need**: Mengekspor laporan bulanan ke PDF sesuai format resmi
- **Acceptance Criteria**
  - Given pratinjau laporan sudah siap, When guru menekan tombol Ekspor ke PDF, Then sistem menghasilkan file PDF dengan layout yang sama seperti pratinjau.
  - Given file PDF dihasilkan, When guru membukanya, Then seluruh data jurnal, termasuk ringkasan kehadiran dan nama siswa yang tidak hadir, tampil sesuai kolom yang benar.
  - Given proses ekspor berhasil, When guru kembali ke halaman laporan, Then sistem mengonfirmasi keberhasilan unduhan dan menyediakan tautan untuk mengunduh ulang jika diperlukan.
