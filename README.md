# Aruna Dental Studio — Sistem Klinik Gigi (Demo Portfolio)

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)

Aplikasi web interaktif untuk portfolio developer yang mensimulasikan alur end-to-end klinik gigi modern: mulai dari **Company Profile** resmi dan perkenalan layanan di website publik, **widget interaktif WhatsApp**, pengajuan booking janji temu pasien berstandar real-time, hingga **dashboard operasional admin** untuk mengelola jadwal, status kunjungan, kontrol berkala, dan simulasi outbox reminder WhatsApp.

> **Pemberitahuan Demo:** Aplikasi ini dibangun khusus sebagai bukti keahlian (*proof of work* / portfolio). Seluruh data dokter, pasien, jadwal, dan riwayat tindakan bersifat fiktif. Tidak ada pesan WhatsApp sungguhan atau transaksi medis yang dilakukan.

---

## 🌟 Fitur Utama

### 1. Website Publik & Company Profile
- **Company Profile Beranda (`/`)**: Desain hangat berkarakter editorial (`#F7F5F0`), tipografi serif berwibawa (*Fraunces*) dipadukan dengan sans-serif (*Plus Jakarta Sans*), showcase foto arsitektur ruang tunggu & ruang suite privat, 4 pilar filosofi pelayanan (*Gentle Care, Hospital-Grade Sterilization, Digital 3D, Price Transparency*), katalog 8 layanan, profil tim dokter spesialis, alur 5 langkah kunjungan, dan FAQ interaktif.
- **Halaman Khusus Behel & Aligner (`/behel`)**: Penjelasan komprehensif pilihan perawatan ortodonti (Behel Metal, Behel Sapphire Estetik, Clear Aligner), tahapan kunjungan, rentang biaya ilustrasi, FAQ, dan tombol konsultasi WA.
- **Widget WhatsApp Interaktif (`FloatingWhatsApp`)**: Widget chat melayang dengan indikator online, salam resepsionis otomatis, opsi pertanyaan cepat (*quick chips*), dan direct redirect ke WhatsApp resmi.
- **Form Permintaan Booking Online (`/booking`)**: Alur bertahap (Layanan & Dokter -> Tanggal & Jam -> Kontak Pasien -> Persetujuan Demo) dengan validasi server-side, normalisasi nomor WhatsApp Indonesia (`08...`), serta pencegahan jadwal bentrok (*slot conflict check*).
- **Konfirmasi Booking (`/booking/sukses`)**: Ringkasan data reservasi yang aman tanpa mengekspos data pribadi di query URL.

### 2. Area Admin Operasional Demo
- **Autentikasi Demo (`/admin/login`)**: Login sederhana menggunakan kredensial demo dengan petunjuk akses langsung.
- **Dashboard Ringkasan (`/admin`)**: 4 kartu metrik dinamis (Booking hari ini, Booking minggu ini, Rasio no-show 30 hari, Pasien perlu kontrol) dan visualisasi Recharts (Tren 4 minggu & Distribusi sumber booking).
- **Jadwal & Status Appointment (`/admin/jadwal`)**: Mode filter tanggal, dokter, dan status; switcher status langsung (`dijadwalkan`, `dikonfirmasi`, `datang`, `tidak_datang`, `selesai`, `batal`); pencatatan riwayat log status otomatis; serta modal penjadwalan ulang (*reschedule*) dengan validasi bentrok.
- **Manajemen Pasien (`/admin/pasien` & `/admin/pasien/[id]`)**: Pencarian nama/nomor WA, tambah pasien baru, edit, detail riwayat kunjungan & kontrol, serta proteksi penghapusan data berelasi.
- **Manajemen Dokter (`/admin/dokter`)**: Daftar tenaga medis fiktif, jadwal praktik, edit, dan toggle aktif/nonaktif.
- **Katalog Treatment (`/admin/treatment`)**: Pengaturan durasi, estimasi biaya demo, interval kontrol rutin, dan toggle ketersediaan.
- **Kontrol & Follow-Up (`/admin/kontrol`)**: Pemantauan pasien aktif yang mendekati atau telah melewati jadwal kontrol berkala (*overdue*), disertai aksi cepat membuat janji temu kontrol.
- **Simulasi Reminder WhatsApp (`/admin/reminder`)**: Outbox pesan pengingat H-1 dan kontrol dengan tombol uji simulasi kirim/batal.
- **Reset Demo Kapan Saja**: Tombol satu-klik di header untuk mengembalikan dataset ke kondisi awal presentasi.

---

## 🛠️ Stack Teknologi

- **Framework**: Next.js (App Router, Turbopack, TypeScript)
- **Styling**: Tailwind CSS dikustomisasi dengan art direction warm editorial off-white, terracotta accents, dan shadcn/ui patterns
- **Font**: Fraunces (Serif Heading) & Plus Jakarta Sans (Body)
- **Database**: Supabase PostgreSQL (dengan dukungan persistent local fallback)
- **Charts**: Recharts
- **Notifikasi**: Sonner
- **Icons**: Lucide React

---

## 🔑 Kredensial Demo Admin

Reviewer dan penilai portfolio dapat masuk ke area admin menggunakan:
- **URL**: `http://localhost:3000/admin/login`
- **Email Demo**: `admin@klinikdemo.com`
- **Kata Sandi**: `klinikdemo2026`

*(Formulir login sudah terisi otomatis secara default untuk memudahkan demonstrasi).*

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/muhkelvin/Klinik.git
cd Klinik
npm install
```

### 2. Konfigurasi Environment (`.env.local`)
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi variabel environment:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

ADMIN_EMAIL=admin@klinikdemo.com
ADMIN_PASSWORD=klinikdemo2026

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Catatan:** Jika belum menghubungkan Supabase, aplikasi secara otomatis menggunakan database lokal persisten (`data/mock-db.json`) sehingga seluruh fitur CRUD, booking, dan jadwal tetap berfungsi 100% tanpa error!

### 3. Migrasi & Seed Supabase (Opsional jika menggunakan Supabase Cloud)
1. Buka dashboard [supabase.com](https://supabase.com) > **SQL Editor**.
2. Jalankan isi file `supabase/migrations/01_schema.sql` (membuat tabel, ekstensi `btree_gist`, constraint bentrok jadwal, dan RLS).
3. Jalankan isi file `supabase/seed.sql` (memasukkan 3 dokter, 8 treatment, 40 pasien, dan 130+ appointment deterministik).
4. Panduan lengkap tersedia di [`docs/DATABASE_SETUP.md`](docs/DATABASE_SETUP.md).

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 🎬 Skenario Presentasi Demo (3 Menit)

1. **Jelajahi Company Profile**: Buka `/` untuk melihat company profile lengkap dengan fasilitas dan filosofi pelayanan, lalu buka `/behel` untuk melihat detail layanan ortodonti.
2. **Coba Widget WhatsApp**: Klik widget WhatsApp di pojok kanan bawah untuk menguji respons pesan cepat.
3. **Kirim Permintaan Booking**: Klik tombol booking, pilih treatment Behel Sapphire, tentukan dokter dan slot jam, isi identitas pasien, lalu kirim permintaan.
4. **Konfirmasi Booking**: Periksa halaman sukses `/booking/sukses` yang menjelaskan status demo.
5. **Masuk ke Admin**: Masuk ke `/admin` menggunakan kredensial demo.
6. **Cek Booking Masuk**: Buka `/admin/jadwal` dan lihat booking yang baru saja diajukan.
7. **Ubah Status Kehadiran**: Ubah status menjadi `tidak_datang` (no-show) atau `selesai`.
8. **Periksa Dashboard**: Kembali ke `/admin` dan amati rasio no-show serta metrik yang otomatis terhitung ulang.
9. **Buka Kontrol & Reminder**: Lihat daftar pasien yang overdue di `/admin/kontrol` dan simulasikan pengiriman pesan di `/admin/reminder`.
