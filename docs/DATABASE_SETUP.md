# Panduan Setup Database Supabase & Data Seed

Dokumen ini menjelaskan langkah-langkah menyiapkan Supabase untuk **Sistem Klinik Gigi (Demo Portfolio)**.

---

## 1. Buat Project di Supabase

1. Buka [database.new](https://database.new) atau dashboard [supabase.com](https://supabase.com).
2. Buat organisasi dan buat project baru, misalnya: `klinik-gigi-demo`.
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

## 3. Jalankan Seed Data Dummy

1. Di **SQL Editor** Supabase, buat query baru (**New Query**).
2. Buka file [seed.sql](file:///c:/Users/Admin/Documents/Project/klinik/supabase/seed.sql), salin seluruh isinya, dan tempel ke SQL Editor.
3. Klik tombol **Run** (Ctrl + Enter).
4. Pastikan query berhasil dieksekusi.

Seed ini memasukkan:
- **3 Dokter Fiktif** (Spesialis Ortodonti, Dokter Gigi Umum, Spesialis Konservasi Gigi) beserta jam praktiknya.
- **8 Treatment Fiktif** (Konsultasi, Scaling, Behel Metal, Behel Sapphire, Clear Aligner, Tambal Estetik, dsb).
- **40 Pasien Fiktif** dengan nomor WhatsApp wajar terformat Indonesia.
- **130+ Appointment Deterministik** mencakup histori 30 hari ke belakang, slot hari ini, dan jadwal 7 hari ke depan.
- **Status appointment realistis:** ~75% selesai, ~10% tidak datang (no-show), ~8% batal, dan appointment terjadwal hari ini & esok hari.
- **Patient Treatments** (data kontrol aktif & kasus overdue untuk demo alur kontrol).
- **Simulasi Reminders** (antre, terkirim_simulasi, dibatalkan).

> **Catatan:** Script `seed.sql` bersifat idempoten (`TRUNCATE ... CASCADE`). Anda dapat menjalankannya ulang kapan saja untuk me-reset data demo ke kondisi awal presentasi!

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

# Akun Admin Demo
ADMIN_EMAIL=admin@klinikdemo.com
ADMIN_PASSWORD=klinikdemo2026

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 5. Prosedur Reset Data Demo Kapan Saja

Untuk mengembalikan data ke kondisi bersih saat presentasi:
1. **Opsi 1 (SQL Editor):** Jalankan ulang file [seed.sql](file:///c:/Users/Admin/Documents/Project/klinik/supabase/seed.sql) di Supabase SQL Editor.
2. **Opsi 2 (Dashboard Admin):** Melalui tombol **"Reset Data Demo"** di dashboard admin demo (yang dilindungi kredensial admin).
