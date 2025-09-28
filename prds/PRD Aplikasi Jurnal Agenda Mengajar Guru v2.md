# **Product Requirements Document (PRD): Aplikasi Jurnal Agenda Mengajar Guru**

Versi: 1.1  
Tanggal: 27 September 2025  
Penulis: Gemini  
Status: Draf Awal

### **1\. Pendahuluan**

#### **1.1. Latar Belakang**

Saat ini, banyak guru, seperti yang terlihat pada dokumen "JURNAL AGENDA HARIAN GURU KELAS \- JANUARI.pdf", masih melakukan pencatatan agenda mengajar secara manual menggunakan format dokumen digital (misalnya Word/Excel) yang kemudian dicetak. Proses ini memakan waktu, rentan terhadap kesalahan, sulit untuk diarsipkan, dan tidak efisien untuk proses rekapitulasi serta pelaporan kepada kepala sekolah.

#### **1.2. Tujuan Produk**

Aplikasi "Jurnal Agenda Mengajar Guru" bertujuan untuk mendigitalisasi dan menyederhanakan proses pencatatan, pengelolaan, dan pelaporan aktivitas mengajar harian guru. Aplikasi ini akan menjadi alat bantu yang efisien, terstruktur, dan mudah diakses untuk meningkatkan produktivitas guru dan mempermudah proses supervisi oleh kepala sekolah.

#### **1.3. Ruang Lingkup**

Aplikasi ini akan fokus pada fitur-fitur inti yang berkaitan dengan pembuatan jurnal harian. Untuk versi awal (MVP), fitur-fitur di luar pencatatan jurnal seperti manajemen nilai siswa, RPP digital, atau komunikasi dengan orang tua **tidak akan disertakan**.

#### **1.4. Target Pengguna**

1. **Guru Mata Pelajaran / Guru Kelas:** Sebagai pengguna utama yang akan mencatat aktivitas mengajarnya setiap hari.  
2. **Kepala Sekolah / Madrasah:** Sebagai pengguna sekunder yang akan mereview, memvalidasi, dan melihat rekapitulasi jurnal dari para guru.

### **2\. Visi dan Strategi Produk**

**Visi:** Menjadi aplikasi pilihan utama bagi para pendidik di Indonesia untuk manajemen agenda mengajar yang praktis, modern, dan terintegrasi.

**Strategi:**

1. **Fase 1 (MVP):** Mengembangkan fitur inti berdasarkan format jurnal yang ada di PDF untuk memastikan semua kebutuhan dasar terpenuhi. Fokus pada kemudahan penggunaan dan output laporan yang sesuai standar.  
2. **Fase 2:** Menambahkan fitur rekapitulasi otomatis, dasbor analitik, dan notifikasi.  
3. **Fase 3:** Mengintegrasikan fitur validasi digital oleh kepala sekolah dan potensi kolaborasi antar guru.

### **3\. Fitur Produk (Product Features)**

Berikut adalah rincian fitur yang akan dikembangkan, diadaptasi dari struktur laporan PDF.

#### **3.1. Manajemen Profil Guru (Prioritas: P1 \- Wajib Ada)**

* **Deskripsi:** Setiap guru dapat mengatur dan menyimpan data profil pribadinya. Data ini akan otomatis muncul di setiap laporan yang dibuat.  
* **Kebutuhan:**  
  * Input Nama Lengkap & Gelar  
  * Input NIP (Nomor Induk Pegawai)  
  * Input Nama Sekolah/Madrasah  
  * Input Tahun Pelajaran & Semester yang aktif

#### **3.2. Pengaturan Data Master (Prioritas: P1 \- Wajib Ada)**

* **Deskripsi:** Guru dapat mengatur data dasar yang akan digunakan berulang kali dalam pengisian jurnal untuk mempercepat proses.  
* **Kebutuhan:**  
  * **Manajemen Kelas:** Menambah, mengedit, dan menghapus daftar kelas yang diajar (contoh: "V-A", "V-B").  
  * **Manajemen Mata Pelajaran:** Menambah, mengedit, dan menghapus daftar mata pelajaran yang diampu (contoh: "Tematik Umum", "Matematika").  
  * **Manajemen Siswa per Kelas:** Mengelola daftar nama siswa untuk setiap kelas. Fitur ini krusial untuk pencatatan kehadiran.

#### **3.3. Pencatatan Jurnal Harian (Prioritas: P1 \- Wajib Ada)**

* **Deskripsi:** Fitur utama aplikasi di mana guru dapat membuat, melihat, dan mengedit entri jurnal untuk setiap sesi mengajar. Tampilan utama bisa berupa kalender bulanan.  
* **Kebutuhan:**  
  * Formulir entri jurnal dengan kolom-kolom berikut:  
    * **Hari/Tanggal:** Pemilih tanggal (Date Picker).  
    * **Mata Pelajaran & Kelas:** Pilihan dropdown dari data master.  
    * **Alokasi Waktu:** Input angka (misal: "2 JP").  
    * **Materi/Indikator:** Kolom teks untuk deskripsi materi.  
    * **Sumber Belajar:** Kolom teks (misal: "Buku Siswa Tema 6").  
  * **Pencatatan Kehadiran (Smart Attendance):**  
    * Saat kelas dipilih, aplikasi akan menampilkan daftar nama siswa dari data master.  
    * Guru hanya perlu menandai siswa yang **tidak hadir**.  
    * Aplikasi secara otomatis menghitung jumlah "Hadir" dan mencatat nama-nama siswa yang "Tidak Hadir" di kolom keterangan.  
    * Terdapat opsi untuk menambahkan keterangan lain selain nama siswa yang tidak hadir.

#### **3.4. Laporan Bulanan & Ekspor PDF (Prioritas: P1 \- Wajib Ada)**

* **Deskripsi:** Guru dapat menghasilkan laporan bulanan dalam format PDF yang identik dengan contoh yang dilampirkan.  
* **Kebutuhan:**  
  * Fitur untuk memilih bulan dan tahun laporan yang ingin dibuat.  
  * Tombol "Generate Laporan" untuk membuat pratinjau.  
  * Tombol "Ekspor ke PDF".  
  * **Format Output:**  
    * Tata letak, kolom, dan header harus sama persis dengan dokumen PDF.  
    * Data profil guru (Nama, NIP, Sekolah) akan otomatis terisi di header.  
    * Di bagian bawah laporan, akan ada kolom untuk "Kepala Madrasah" dan "Guru Kelas" beserta nama yang sudah terisi, menyisakan ruang untuk tanda tangan dan stempel basah.

#### **3.5. Dasbor & Rekapitulasi (Prioritas: P2 \- Bisa Menyusul)**

* **Deskripsi:** Halaman utama yang memberikan ringkasan aktivitas mengajar guru.  
* **Kebutuhan:**  
  * Menampilkan total jam mengajar dalam sebulan.  
  * Menampilkan ringkasan tingkat kehadiran siswa.  
  * Kalender yang menandai hari-hari di mana ada entri jurnal.

### **4\. Spesifikasi Teknis (Tech Stack)**

* **Framework:** **Next.js**. Dipilih untuk membangun antarmuka pengguna (UI) yang modern dan cepat, serta menangani logika sisi server (server-side logic) dengan efisien.  
* **Otentikasi:** **Clerk**. Digunakan untuk mengelola semua aspek otentikasi pengguna, termasuk pendaftaran, login, dan manajemen sesi, dengan keamanan dan kemudahan implementasi.  
* **Database:** **Supabase**. Berfungsi sebagai backend utama (Backend-as-a-Service), menyediakan database PostgreSQL untuk menyimpan semua data aplikasi (profil guru, jurnal, data master), serta API untuk mengakses data tersebut.  
* **Komponen UI:** **shadcn/ui**. Digunakan untuk membangun antarmuka yang konsisten, aksesibel, dan menarik secara visual dengan kumpulan komponen yang siap pakai dan mudah dikustomisasi.  
* **Ikon:** **Lucide Icons**. Menyediakan set ikon yang bersih dan konsisten untuk memperjelas navigasi dan interaksi di dalam aplikasi.

### **5\. Desain dan Pengalaman Pengguna (UX/UI)**

* **Antarmuka:** Bersih, sederhana, dan intuitif. Hindari menu yang terlalu kompleks.  
* **Alur Pengguna:** Alur pengisian jurnal harus cepat. Guru harus bisa mengisi jurnal harian dalam kurang dari 2 menit.  
* **Aksesibilitas:** Aplikasi dirancang untuk responsif (dapat diakses dengan nyaman di laptop maupun ponsel).

### **6\. Metrik Keberhasilan**

* **Adopsi:** Jumlah guru yang aktif menggunakan aplikasi setiap minggunya.  
* **Engagement:** Rata-rata jumlah entri jurnal yang dibuat per guru per bulan.  
* **Retensi:** Persentase guru yang kembali menggunakan aplikasi di bulan berikutnya.  
* **Feedback:** Skor kepuasan pengguna melalui survei atau ulasan.