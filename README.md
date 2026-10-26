# Aruna Dental Studio — Sistem Manajemen & Web Klinik Gigi Terintegrasi

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

Aplikasi web klinik gigi modern terpadu yang menghubungkan calon pasien dengan sistem manajemen operasional klinik: mulai dari **Company Profile** resmi, **layanan interaktif WhatsApp**, formulir pemesanan jadwal dokter spesialis real-time dengan pencegahan jadwal bentrok (*overlap prevention*), hingga **dashboard operasional staf & dokter** untuk mengelola reservasi, direktori pasien, kontrol berkala, serta antrean pesan pengingat WhatsApp otomatis.

---

## 🌟 Fitur Utama

### 1. Website Publik & Informasi Layanan
- **Company Profile Beranda (`/`)**: Desain arsitektural bernuansa hangat dan elegan, menampilkan standar kebersihan klinis, 4 pilar filosofi perawatan (*Gentle Care, Hospital-Grade Sterilization, Digital 3D, Price Transparency*), katalog 8 layanan perawatan gigi, profil dokter spesialis, panduan 5 langkah kunjungan, dan FAQ interaktif.
- **Layanan Khusus Behel & Aligner (`/behel`)**: Penjelasan komprehensif jenis kawat gigi (Metal, Sapphire Estetik, Clear Aligner), alur tahapan pemasangan, transparansi rentang biaya, FAQ ortodonti, dan konsultasi cepat.
- **Widget Layanan WhatsApp (`FloatingWhatsApp`)**: Widget mengambang responsif dengan indikator ketersediaan staf, salam resepsionis otomatis, opsi pertanyaan instan (*quick chips*), dan tautan langsung ke WhatsApp klinik.
- **Form Permintaan Booking Online (`/booking`)**: Formulir reservasi bertahap dengan validasi server-side ketat, normalisasi nomor kontak WhatsApp Indonesia (`08...`), serta pencegahan bentrok jadwal dokter (*slot conflict check*).
- **Konfirmasi Jadwal (`/booking/sukses`)**: Halaman konfirmasi instan yang menampilkan ringkasan janji temu secara aman tanpa memaparkan data privasi pasien di parameter URL.

### 2. Portal Operasional & Manajemen Staf
- **Autentikasi Staf & Admin (`/admin/login`)**: Akses terproteksi berbasis sesi cookie aman dengan otentikasi administrator.
- **Dashboard Ringkasan Eksekutif (`/admin`)**: 4 kartu metrik utama (Booking hari ini, Booking minggu ini, Rasio no-show 30 hari, Pasien perlu kontrol) dan grafik visualisasi Recharts (Tren reservasi mingguan & Sumber rujukan pasien).
- **Manajemen Jadwal Appointment (`/admin/jadwal`)**: Filter fleksibel berdasarkan tanggal, dokter praktik, dan status kunjungan; pengubah status instan (`dijadwalkan`, `dikonfirmasi`, `datang`, `tidak_datang`, `selesai`, `batal`); pencatatan riwayat log perubahan status; serta modal penjadwalan ulang (*reschedule*) dengan validasi slot waktu.
- **Direktori Pasien (`/admin/pasien` & `/admin/pasien/[id]`)**: Pencarian instan berdasarkan nama dan nomor WhatsApp, pencatatan pasien baru, pembaruan data, detail riwayat pemeriksaan, serta proteksi penghapusan data berelasi.
- **Manajemen Tenaga Medis (`/admin/dokter`)**: Direktori dokter spesialis, pengaturan jam praktik harian, pembaruan profil, dan toggle ketersediaan praktik.
- **Katalog Layanan Treatment (`/admin/treatment`)**: Pengaturan estimasi biaya, estimasi durasi tindakan dalam menit, penentuan interval kontrol rutin (hari), dan status aktif layanan.
- **Kontrol & Follow-Up Pasien (`/admin/kontrol`)**: Pelacakan pasien aktif yang mendekati atau telah melewati jadwal kontrol berkala (*overdue*), dilengkapi tombol cepat untuk menerbitkan janji temu kontrol baru.
- **Pengingat WhatsApp Otomatis (`/admin/reminder`)**: Antrean pengingat otomatis untuk H-1 janji temu dan follow-up kontrol berkala dengan pratinjau pesan serta status pengiriman.
- **Pengaturan Sistem (`/admin/pengaturan`)**: Konfigurasi parameter operasional klinik, jam operasional, template pesan pengingat, dan status sumber data.

---

## 🛠️ Stack Teknologi

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Komponen Adaptif
- **Tipografi**: *Fraunces* (Serif Editorial) & *Plus Jakarta Sans* (Sans)
- **Database**: [Supabase](https://supabase.com/) PostgreSQL (dengan lapisan fallback lokal persisten)
- **Visualisasi Data**: [Recharts](https://recharts.org/)
- **Notifikasi**: [Sonner](https://sonner.emilkowal.ski/)
- **Ikonografi**: [Lucide React](https://lucide.dev/)

---

## 🔑 Kredensial Akses Administrator

Akses ke portal manajemen staf & dokter:
- **URL Login**: `/admin/login`
- **Email Admin**: `admin@arunadental.com`
- **Kata Sandi**: `arunadental2026`

*(Dapat dikustomisasi melalui variabel `ADMIN_EMAIL` dan `ADMIN_PASSWORD` di environment).*

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/muhkelvin/Klinik.git
cd Klinik
npm install
```

### 2. Salin File Environment
```bash
cp .env.example .env.local
```

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

> **Catatan:** Sistem telah dilengkapi *persistent database layer* bawaan sehingga seluruh alur booking, manajemen jadwal, dokter, pasien, dan pengingat langsung berfungsi 100% saat dijalankan pertama kali.

---

## ☁️ Panduan Deploy ke Vercel (Manual)

Deploy proyek ini ke Vercel sangat mudah karena menggunakan standar arsitektur Next.js App Router:

### Langkah 1: Hubungkan Repository ke Vercel
1. Buka dashboard [vercel.com](https://vercel.com/) dan login menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Cari repository **`muhkelvin/Klinik`** dan klik **"Import"**.

### Langkah 2: Konfigurasi Project Settings di Vercel
- **Framework Preset**: `Next.js` (terdeteksi otomatis)
- **Root Directory**: `./` (default)
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Langkah 3: Tambahkan Environment Variables
Pada bagian **Environment Variables**, tambahkan variabel berikut:

| Key | Value Contoh | Deskripsi |
| :--- | :--- | :--- |
| `ADMIN_EMAIL` | `admin@arunadental.com` | Email login portal admin |
| `ADMIN_PASSWORD` | `arunadental2026` | Kata sandi login portal admin |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | URL domain produksi |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | *(Opsional)* URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `ey...` | *(Opsional)* Public anon key Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | `ey...` | *(Opsional)* Service role key Supabase |

> **Catatan:** Jika Anda belum memasang Supabase Cloud, aplikasi tetap akan berhasil di-build dan berjalan normal menggunakan basis data lokal terintegrasi.

### Langkah 4: Klik Deploy
Klik tombol **"Deploy"**. Vercel akan menjalankan proses build dan menyediakan URL produksi dalam hitungan detik.

---

## 🗄️ Setup Database Supabase Cloud (Opsional)

Jika Anda ingin menghubungkan data ke server PostgreSQL Supabase:

1. Buat project baru di [supabase.com](https://supabase.com).
2. Masuk ke menu **SQL Editor** pada dashboard Supabase.
3. Jalankan script skema tabel di [`supabase/migrations/01_schema.sql`](supabase/migrations/01_schema.sql) (mencakup tabel, ekstensi `btree_gist`, constraint bentrok jadwal, dan RLS).
4. Jalankan script dataset di [`supabase/seed.sql`](supabase/seed.sql) untuk memuat data awal dokter, layanan, pasien, dan jadwal.
5. Salin **Project URL**, **Anon Key**, dan **Service Role Key** dari menu *Project Settings > API*, lalu masukkan ke `.env.local` atau Vercel Environment Variables.
6. Detail lengkap tersedia di [`docs/DATABASE_SETUP.md`](docs/DATABASE_SETUP.md).

---

## 📁 Struktur Direktori

```text
├── actions/              # Next.js Server Actions (booking, admin, status updater)
├── app/                  # Next.js App Router
│   ├── (public)          # Halaman beranda, /behel, dan alur booking
│   └── admin/            # Dashboard manajemen operasional staf & dokter
├── components/           # Komponen UI modular
│   ├── admin/            # Tabel jadwal, modal reschedule, pasien, reminder
│   └── public/           # Navbar, footer, floating WhatsApp, form booking
├── data/                 # Basis data lokal deterministik persisten
├── docs/                 # Dokumentasi teknis & setup database
├── lib/                  # Database abstraction layer, auth, utils, seed runner
├── public/               # Aset gambar arsitektur klinik & avatar tim medis
├── supabase/             # Migrasi skema SQL PostgreSQL & script seed
└── types/                # Definisi TypeScript interface & database types
```

---

## 📄 Lisensi
Hak Cipta &copy; 2026 Aruna Dental Studio. Dikembangkan untuk solusi digital layanan kesehatan gigi modern.
