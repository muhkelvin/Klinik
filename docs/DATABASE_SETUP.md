# Panduan Setup Database Supabase & Data Awal

Dokumen ini menjelaskan langkah-langkah menyiapkan Supabase untuk **Aruna Dental Studio — Sistem Manajemen & Web Klinik Gigi**.

---

## 1. Buat Project di Supabase

1. Buka [database.new](https://database.new) atau dashboard [supabase.com](https://supabase.com).
2. Buat organisasi dan buat project baru, misalnya: `aruna-dental-studio`.
3. Pilih region terdekat (misal: **Singapore `ap-southeast-1`**).
4. Catat database password yang Anda buat.

---

## 2. Jalankan Migrasi Skema SQL

1. Masuk ke dashboard project Supabase Anda.
2. Buka menu **SQL Editor** di sidebar kiri.
3. Klik tombol **New Query**.
4. Buka file [01_schema.sql](file:///c:/Users/Admin/Documents/Project/klinik/supabase/migrations/01_schema.sql), salin seluruh isinya, dan tempel ke SQL Editor.
5. Klik tombol **Run** (Ctrl + Enter).
6. Pastikan query berhasil dieksekusi dengan pesan `Success. No rows returned`.

Skema ini membuat:
- Ekstensi `btree_gist` untuk mencegah tabrakan/konflik jadwal dokter (`no_overlapping_appointments`).
- Tabel: `doctors`, `treatments`, `patients`, `appointments`, `appointment_status_logs`, `patient_treatments`, dan `reminders`.
- Index pencarian dan relasi foreign key yang aman.
- Kebijakan Row Level Security (RLS).

---

## 3. Jalankan Seed Data Awal

1. Di **SQL Editor** Supabase, buat query baru (**New Query**).
2. Buka file [seed.sql](file:///c:/Users/Admin/Documents/Project/klinik/supabase/seed.sql), salin seluruh isinya, dan tempel ke SQL Editor.
3. Klik tombol **Run** (Ctrl + Enter).
4. Pastikan query berhasil dieksekusi.

Seed ini memasukkan:
- **3 Dokter Praktik** (Spesialis Ortodonti, Dokter Gigi Umum, Spesialis Konservasi Gigi) beserta jam praktiknya.
- **8 Layanan Treatment** (Konsultasi, Scaling, Behel Metal, Behel Sapphire, Clear Aligner, Tambal Estetik, dsb).
- **40 Pasien Terdaftar** dengan nomor WhatsApp wajar terformat Indonesia.
- **130+ Appointment Terjadwal** mencakup histori 30 hari ke belakang, slot hari ini, dan jadwal 7 hari ke depan.
- **Status appointment:** selesai, no-show, batal, dan appointment terjadwal hari ini & esok hari.
- **Patient Treatments** (data kontrol aktif & kasus jatuh tempo untuk alur kontrol).
- **Reminders WhatsApp** (antre, terkirim, dibatalkan).

> **Catatan:** Script `seed.sql` bersifat idempoten (`TRUNCATE ... CASCADE`). Anda dapat menjalankannya ulang kapan saja untuk menyinkronkan kembali basis data!

---

## 4. Konfigurasi Environment Variable (`.env.local`)

1. Di dashboard Supabase, buka **Project Settings** > **API**.
2. Salin nilai:
   - **Project URL**
   - **anon / public key**
   - **service_role key** (di bagian Project API keys > klik reveal)
3. Buat file `.env.local` di root folder proyek ini (sejajar dengan `package.json`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# Akun Admin
ADMIN_EMAIL=admin@arunadental.com
ADMIN_PASSWORD=arunadental2026

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 5. Prosedur Sinkronisasi Data Kapan Saja

Untuk mengembalikan data ke kondisi bersih:
1. **Opsi 1 (SQL Editor):** Jalankan ulang file [seed.sql](file:///c:/Users/Admin/Documents/Project/klinik/supabase/seed.sql) di Supabase SQL Editor.
2. **Opsi 2 (Dashboard Admin):** Melalui tombol **"Sinkronkan Data"** di dashboard admin.
