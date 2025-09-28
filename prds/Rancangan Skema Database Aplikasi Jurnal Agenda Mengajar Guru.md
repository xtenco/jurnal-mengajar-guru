# **Rancangan Skema Database \- Aplikasi Jurnal Mengajar**

Dokumen ini merinci struktur tabel database yang akan digunakan dalam aplikasi Jurnal Agenda Mengajar Guru, diimplementasikan menggunakan Supabase (PostgreSQL).

### **Diagram Relasi Antar Tabel**

Berikut adalah gambaran sederhana mengenai hubungan antar tabel yang akan kita buat:

\[ profiles \] 1--\* \[ classes \] 1--\* \[ students \]  
     |  
     | 1--\* \[ subjects \]  
     |  
     | 1--\* \[ journal\_entries \] \*--1 \[ classes \]  
           |                   \*--1 \[ subjects \]  
           |  
           \*--\* \[ journal\_absences \] \*--\* \[ students \]

* 1--\* menandakan relasi *one-to-many*.  
* \*--\* menandakan relasi *many-to-many* (melalui tabel journal\_absences).

### **Detail Skema Tabel**

#### **1\. profiles**

Tabel ini menyimpan data spesifik yang melekat pada setiap guru (pengguna). Data ini akan ditautkan ke user\_id dari Clerk.

| Nama Kolom | Tipe Data | Deskripsi | Keterangan |
| :---- | :---- | :---- | :---- |
| id | uuid | ID unik pengguna, diambil dari Clerk user\_id. | **Primary Key** |
| full\_name | text | Nama lengkap guru beserta gelar. | Wajib diisi. |
| nip | text | Nomor Induk Pegawai. | Opsional. |
| school\_name | text | Nama sekolah/madrasah tempat mengajar. | Wajib diisi. |
| academic\_year | text | Tahun pelajaran yang sedang aktif, cth: "2023/2024". | Wajib diisi. |
| semester | smallint | Semester yang sedang aktif (1 atau 2). | Wajib diisi. |
| created\_at | timestamptz | Waktu pembuatan data. | Default: now() |
| updated\_at | timestamptz | Waktu terakhir data diperbarui. | Default: now() |

#### **2\. classes (Master Data)**

Tabel ini berfungsi sebagai master data untuk semua kelas yang diajar oleh seorang guru.

| Nama Kolom | Tipe Data | Deskripsi | Keterangan |
| :---- | :---- | :---- | :---- |
| id | uuid | ID unik untuk setiap kelas. | **Primary Key**, auto-generate. |
| user\_id | uuid | Menautkan kelas ini ke guru tertentu. | **Foreign Key** ke profiles.id. |
| name | text | Nama kelas, contoh: "V-A", "Kelas V-B". | Wajib diisi. |
| created\_at | timestamptz | Waktu pembuatan data. | Default: now() |

#### **3\. subjects (Master Data)**

Tabel ini berfungsi sebagai master data untuk semua mata pelajaran yang diampu oleh seorang guru.

| Nama Kolom | Tipe Data | Deskripsi | Keterangan |
| :---- | :---- | :---- | :---- |
| id | uuid | ID unik untuk setiap mata pelajaran. | **Primary Key**, auto-generate. |
| user\_id | uuid | Menautkan mata pelajaran ini ke guru tertentu. | **Foreign Key** ke profiles.id. |
| name | text | Nama mata pelajaran, cth: "Matematika". | Wajib diisi. |
| created\_at | timestamptz | Waktu pembuatan data. | Default: now() |

#### **4\. students (Master Data)**

Tabel ini berfungsi sebagai master data untuk semua siswa yang ada di setiap kelas.

| Nama Kolom | Tipe Data | Deskripsi | Keterangan |
| :---- | :---- | :---- | :---- |
| id | uuid | ID unik untuk setiap siswa. | **Primary Key**, auto-generate. |
| class\_id | uuid | Menautkan siswa ini ke kelas tertentu. | **Foreign Key** ke classes.id. |
| user\_id | uuid | Menautkan data siswa ke guru pemilik data. | **Foreign Key** ke profiles.id. |
| name | text | Nama lengkap siswa. | Wajib diisi. |
| created\_at | timestamptz | Waktu pembuatan data. | Default: now() |

#### **5\. journal\_entries (Data Transaksional)**

Tabel ini merupakan tabel inti yang menyimpan setiap entri jurnal harian yang dibuat oleh guru.

| Nama Kolom | Tipe Data | Deskripsi | Keterangan |
| :---- | :---- | :---- | :---- |
| id | uuid | ID unik untuk setiap entri jurnal. | **Primary Key**, auto-generate. |
| user\_id | uuid | Menautkan entri jurnal ke guru yang membuat. | **Foreign Key** ke profiles.id. |
| entry\_date | date | Tanggal pelaksanaan kegiatan mengajar. | Wajib diisi. |
| class\_id | uuid | Kelas tempat mengajar. | **Foreign Key** ke classes.id. |
| subject\_id | uuid | Mata pelajaran yang diajarkan. | **Foreign Key** ke subjects.id. |
| time\_allocation | text | Alokasi waktu, contoh: "2 JP". | Wajib diisi. |
| material\_indicator | text | Materi atau indikator pencapaian yang diajarkan. | Wajib diisi. |
| learning\_source | text | Sumber belajar yang digunakan. | Opsional. |
| other\_notes | text | Catatan tambahan untuk kolom keterangan. | Opsional. |
| created\_at | timestamptz | Waktu pembuatan data. | Default: now() |

#### **6\. journal\_absences (Data Relasional)**

Tabel ini mencatat siswa mana saja yang tidak hadir pada sebuah sesi jurnal. Ini lebih efisien daripada menyimpan array di tabel journal\_entries.

| Nama Kolom | Tipe Data | Deskripsi | Keterangan |
| :---- | :---- | :---- | :---- |
| id | uuid | ID unik untuk setiap record absensi. | **Primary Key**, auto-generate. |
| journal\_entry\_id | uuid | Menautkan ke entri jurnal yang relevan. | **Foreign Key** ke journal\_entries.id. |
| student\_id | uuid | Menautkan ke siswa yang tidak hadir. | **Foreign Key** ke students.id. |
| created\_at | timestamptz | Waktu pembuatan data. | Default: now() |

