-- ==============================================================================
-- SISTEM KLINIK GIGI (DEMO PORTFOLIO) - DETERMINISTIC SEED DATA
-- File: supabase/seed.sql
-- Description: Deterministic mock data for portfolio demonstration.
-- Safe to re-run: deletes existing demo data and re-inserts fresh state.
-- ==============================================================================

-- Clear existing data
TRUNCATE TABLE reminders, appointment_status_logs, patient_treatments, appointments, patients, treatments, doctors RESTART IDENTITY CASCADE;

-- ------------------------------------------------------------------------------
-- 1. DOCTORS (3 Dokter Fiktif)
-- ------------------------------------------------------------------------------
INSERT INTO doctors (id, name, specialty, schedule, is_active) VALUES
('11111111-1111-1111-1111-111111111101', 'Drg. Sarah Wijaya, Sp.Ort', 'Spesialis Ortodonti (Behel & Aligner)', '[
    {"day": "Senin", "start": "10:00", "end": "18:00"},
    {"day": "Rabu", "start": "10:00", "end": "18:00"},
    {"day": "Jumat", "start": "13:00", "end": "20:00"},
    {"day": "Sabtu", "start": "09:00", "end": "16:00"}
]'::jsonb, true),

('11111111-1111-1111-1111-111111111102', 'Drg. Budi Pratama', 'Dokter Gigi Umum & Pencegahan', '[
    {"day": "Senin", "start": "09:00", "end": "17:00"},
    {"day": "Selasa", "start": "09:00", "end": "17:00"},
    {"day": "Kamis", "start": "09:00", "end": "17:00"},
    {"day": "Jumat", "start": "09:00", "end": "17:00"},
    {"day": "Sabtu", "start": "09:00", "end": "15:00"}
]'::jsonb, true),

('11111111-1111-1111-1111-111111111103', 'Drg. Amanda Lestari, Sp.KG', 'Spesialis Konservasi Gigi (Estetik & Saluran Akar)', '[
    {"day": "Selasa", "start": "13:00", "end": "20:00"},
    {"day": "Kamis", "start": "13:00", "end": "20:00"},
    {"day": "Sabtu", "start": "13:00", "end": "19:00"}
]'::jsonb, true);

-- ------------------------------------------------------------------------------
-- 2. TREATMENTS (8 Layanan Fiktif)
-- ------------------------------------------------------------------------------
INSERT INTO treatments (id, name, duration_minutes, category, requires_follow_up, follow_up_interval_days, price_range_label, is_active) VALUES
('22222222-2222-2222-2222-222222222201', 'Konsultasi & Pemeriksaan Gigi Lengkap', 30, 'Umum', false, 0, 'Rp 150.000 - Rp 250.000', true),
('22222222-2222-2222-2222-222222222202', 'Pembersihan Karang Gigi (Scaling Ultrasonic)', 45, 'Pencegahan', true, 180, 'Rp 350.000 - Rp 600.000', true),
('22222222-2222-2222-2222-222222222203', 'Behel Metal Konvensional', 60, 'Ortodonti', true, 30, 'Rp 6.500.000 - Rp 9.000.000', true),
('22222222-2222-2222-2222-222222222204', 'Behel Sapphire Estetik (Transparan)', 60, 'Ortodonti', true, 30, 'Rp 10.000.000 - Rp 14.000.000', true),
('22222222-2222-2222-2222-222222222205', 'Clear Aligner Invisible (Lepas-Pasang)', 45, 'Ortodonti', true, 45, 'Rp 16.000.000 - Rp 25.000.000', true),
('22222222-2222-2222-2222-222222222206', 'Penambalan Gigi Estetik Komposit', 45, 'Restorasi', false, 0, 'Rp 350.000 - Rp 700.000', true),
('22222222-2222-2222-2222-222222222207', 'Perawatan Saluran Akar Gigi', 60, 'Endodonti', true, 14, 'Rp 1.200.000 - Rp 2.500.000', true),
('22222222-2222-2222-2222-222222222208', 'Pencabutan Gigi Bungsu (Odontektomi)', 60, 'Bedah Mulut', true, 7, 'Rp 2.000.000 - Rp 3.500.000', true);

-- ------------------------------------------------------------------------------
-- 3. PATIENTS (45 Pasien Demo Terstruktur)
-- ------------------------------------------------------------------------------
INSERT INTO patients (id, name, whatsapp_normalized, birth_date, demo_consent_at, created_at) VALUES
('33333333-3333-3333-3333-333333333301', 'Dimas Arya Prasetya', '081234567801', '1995-04-12', now() - interval '60 days', now() - interval '60 days'),
('33333333-3333-3333-3333-333333333302', 'Siti Nurhaliza Indah', '081234567802', '1998-08-23', now() - interval '55 days', now() - interval '55 days'),
('33333333-3333-3333-3333-333333333303', 'Reza Aditya Firmansyah', '081234567803', '1992-11-05', now() - interval '50 days', now() - interval '50 days'),
('33333333-3333-3333-3333-333333333304', 'Dewi Anggraini', '081234567804', '1996-02-18', now() - interval '48 days', now() - interval '48 days'),
('33333333-3333-3333-3333-333333333305', 'Bagus Ramadhan', '081234567805', '1994-07-30', now() - interval '45 days', now() - interval '45 days'),
('33333333-3333-3333-3333-333333333306', 'Anisa Tri Rahmawati', '081234567806', '2001-01-14', now() - interval '42 days', now() - interval '42 days'),
('33333333-3333-3333-3333-333333333307', 'Fajar Hidayatullah', '081234567807', '1990-09-09', now() - interval '40 days', now() - interval '40 days'),
('33333333-3333-3333-3333-333333333308', 'Nabila Syahrani', '081234567808', '1999-03-27', now() - interval '38 days', now() - interval '38 days'),
('33333333-3333-3333-3333-333333333309', 'Gilang Saputra', '081234567809', '1997-12-15', now() - interval '35 days', now() - interval '35 days'),
('33333333-3333-3333-3333-333333333310', 'Putri Ayu Wulandari', '081234567810', '2002-05-19', now() - interval '32 days', now() - interval '32 days'),
('33333333-3333-3333-3333-333333333311', 'Hendra Kurniawan', '081234567811', '1988-06-22', now() - interval '30 days', now() - interval '30 days'),
('33333333-3333-3333-3333-333333333312', 'Mega Silvia', '081234567812', '1993-10-10', now() - interval '28 days', now() - interval '28 days'),
('33333333-3333-3333-3333-333333333313', 'Aris Munandar', '081234567813', '1991-03-03', now() - interval '25 days', now() - interval '25 days'),
('33333333-3333-3333-3333-333333333314', 'Rina Marlina', '081234567814', '1996-08-14', now() - interval '24 days', now() - interval '24 days'),
('33333333-3333-3333-3333-333333333315', 'Danu Setiawan', '081234567815', '1995-12-01', now() - interval '22 days', now() - interval '22 days'),
('33333333-3333-3333-3333-333333333316', 'Lestari Handayani', '081234567816', '1997-04-16', now() - interval '20 days', now() - interval '20 days'),
('33333333-3333-3333-3333-333333333317', 'Yoga Pratama', '081234567817', '1994-09-25', now() - interval '19 days', now() - interval '19 days'),
('33333333-3333-3333-3333-333333333318', 'Citra Kirana Melati', '081234567818', '2000-07-07', now() - interval '18 days', now() - interval '18 days'),
('33333333-3333-3333-3333-333333333319', 'Rizky Fauzan', '081234567819', '1993-02-11', now() - interval '16 days', now() - interval '16 days'),
('33333333-3333-3333-3333-333333333320', 'Maya Kusuma', '081234567820', '1999-11-20', now() - interval '15 days', now() - interval '15 days'),
('33333333-3333-3333-3333-333333333321', 'Eko Purnomo', '081234567821', '1987-01-30', now() - interval '14 days', now() - interval '14 days'),
('33333333-3333-3333-3333-333333333322', 'Indah Permatasari', '081234567822', '1996-05-15', now() - interval '12 days', now() - interval '12 days'),
('33333333-3333-3333-3333-333333333323', 'Agus Budiman', '081234567823', '1992-04-04', now() - interval '11 days', now() - interval '11 days'),
('33333333-3333-3333-3333-333333333324', 'Tania Wardani', '081234567824', '1998-10-18', now() - interval '10 days', now() - interval '10 days'),
('33333333-3333-3333-3333-333333333325', 'Bayu Samudra', '081234567825', '1995-06-29', now() - interval '9 days', now() - interval '9 days'),
('33333333-3333-3333-3333-333333333326', 'Widya Astuti', '081234567826', '1997-03-12', now() - interval '8 days', now() - interval '8 days'),
('33333333-3333-3333-3333-333333333327', 'Aldi Pratama', '081234567827', '2001-09-02', now() - interval '7 days', now() - interval '7 days'),
('33333333-3333-3333-3333-333333333328', 'Dian Rosita', '081234567828', '1993-08-08', now() - interval '6 days', now() - interval '6 days'),
('33333333-3333-3333-3333-333333333329', 'Irfan Maulana', '081234567829', '1990-12-24', now() - interval '5 days', now() - interval '5 days'),
('33333333-3333-3333-3333-333333333330', 'Nurul Hikmah', '081234567830', '1998-01-17', now() - interval '4 days', now() - interval '4 days'),
('33333333-3333-3333-3333-333333333331', 'Genta Wijaya', '081234567831', '1996-06-06', now() - interval '3 days', now() - interval '3 days'),
('33333333-3333-3333-3333-333333333332', 'Clarissa Angel', '081234567832', '2000-02-28', now() - interval '3 days', now() - interval '3 days'),
('33333333-3333-3333-3333-333333333333', 'Rahmat Hidayat', '081234567833', '1991-07-19', now() - interval '2 days', now() - interval '2 days'),
('33333333-3333-3333-3333-333333333334', 'Sabrina Larasati', '081234567834', '1997-05-21', now() - interval '2 days', now() - interval '2 days'),
('33333333-3333-3333-3333-333333333335', 'Wahyu Wicaksono', '081234567835', '1994-11-13', now() - interval '1 days', now() - interval '1 days'),
('33333333-3333-3333-3333-333333333336', 'Tiara Puspita', '081234567836', '1999-08-31', now() - interval '1 days', now() - interval '1 days'),
('33333333-3333-3333-3333-333333333337', 'Bima Sakti', '081234567837', '1995-10-04', now(), now()),
('33333333-3333-3333-3333-333333333338', 'Fitri Handayani', '081234567838', '1998-04-09', now(), now()),
('33333333-3333-3333-3333-333333333339', 'Kevin Sanjaya', '081234567839', '1996-03-15', now(), now()),
('33333333-3333-3333-3333-333333333340', 'Zahra Amelia', '081234567840', '2001-12-05', now(), now());

-- ------------------------------------------------------------------------------
-- 4. PATIENT TREATMENTS (Treatment aktif & tindak lanjut)
-- ------------------------------------------------------------------------------
INSERT INTO patient_treatments (id, patient_id, treatment_id, doctor_id, started_at, next_follow_up_at, status) VALUES
-- Overdue follow-up (untuk demo dashboard kontrol telat)
('44444444-4444-4444-4444-444444444401', '33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111101', now() - interval '45 days', now() - interval '5 days', 'aktif'),
('44444444-4444-4444-4444-444444444402', '33333333-3333-3333-3333-333333333304', '22222222-2222-2222-2222-222222222204', '11111111-1111-1111-1111-111111111101', now() - interval '40 days', now() - interval '2 days', 'aktif'),

-- Upcoming follow-up in 1-3 days (mendekati tanggal kontrol)
('44444444-4444-4444-4444-444444444403', '33333333-3333-3333-3333-333333333306', '22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111101', now() - interval '42 days', now() + interval '2 days', 'aktif'),
('44444444-4444-4444-4444-444444444404', '33333333-3333-3333-3333-333333333308', '22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111101', now() - interval '28 days', now() + interval '3 days', 'aktif'),
('44444444-4444-4444-4444-444444444405', '33333333-3333-3333-3333-333333333310', '22222222-2222-2222-2222-222222222207', '11111111-1111-1111-1111-111111111103', now() - interval '12 days', now() + interval '1 days', 'aktif'),

-- Future follow-ups (2-4 weeks)
('44444444-4444-4444-4444-444444444406', '33333333-3333-3333-3333-333333333312', '22222222-2222-2222-2222-222222222203', '11111111-1111-1111-1111-111111111101', now() - interval '10 days', now() + interval '20 days', 'aktif'),
('44444444-4444-4444-4444-444444444407', '33333333-3333-3333-3333-333333333314', '22222222-2222-2222-2222-222222222205', '11111111-1111-1111-1111-111111111101', now() - interval '15 days', now() + interval '30 days', 'aktif'),
('44444444-4444-4444-4444-444444444408', '33333333-3333-3333-3333-333333333316', '22222222-2222-2222-2222-222222222202', '11111111-1111-1111-1111-111111111102', now() - interval '30 days', now() + interval '150 days', 'aktif');

-- ------------------------------------------------------------------------------
-- 5. DETERMINISTIC APPOINTMENTS GENERATION (130+ Appointments)
-- Past 30 days history + Today + Next 7 days
-- ------------------------------------------------------------------------------
DO $$
DECLARE
    doc_orto UUID := '11111111-1111-1111-1111-111111111101';
    doc_umum UUID := '11111111-1111-1111-1111-111111111102';
    doc_kons UUID := '11111111-1111-1111-1111-111111111103';
    
    trt_konsul UUID := '22222222-2222-2222-2222-222222222201';
    trt_scale  UUID := '22222222-2222-2222-2222-222222222202';
    trt_behel  UUID := '22222222-2222-2222-2222-222222222203';
    trt_align  UUID := '22222222-2222-2222-2222-222222222205';
    trt_tambal UUID := '22222222-2222-2222-2222-222222222206';
    
    pat_records UUID[];
    curr_date DATE;
    apt_id UUID;
    s_time TIMESTAMPTZ;
    e_time TIMESTAMPTZ;
    apt_status TEXT;
    apt_source TEXT;
    target_doc UUID;
    target_trt UUID;
    i INT;
    day_offset INT;
    slot_hour INT;
    p_idx INT := 1;
BEGIN
    SELECT array_agg(id) INTO pat_records FROM patients;

    -- Generate across 30 past days (-28 to -1)
    FOR day_offset IN -28..-1 LOOP
        curr_date := (CURRENT_DATE + (day_offset || ' days')::INTERVAL)::DATE;
        
        -- Generate 3-4 appointments per day across doctors
        FOR slot_hour IN 10..15 LOOP
            -- Skip some slots to simulate natural bookings
            IF (day_offset + slot_hour) % 3 != 0 THEN
                apt_id := gen_random_uuid();
                
                -- Determine doctor & treatment
                IF slot_hour = 10 OR slot_hour = 13 THEN
                    target_doc := doc_orto;
                    target_trt := CASE WHEN slot_hour = 10 THEN trt_behel ELSE trt_align END;
                ELSIF slot_hour = 11 OR slot_hour = 14 THEN
                    target_doc := doc_umum;
                    target_trt := CASE WHEN slot_hour = 11 THEN trt_scale ELSE trt_konsul END;
                ELSE
                    target_doc := doc_kons;
                    target_trt := trt_tambal;
                END IF;

                s_time := (curr_date || ' ' || LPAD(slot_hour::TEXT, 2, '0') || ':00:00+07')::TIMESTAMPTZ;
                e_time := s_time + interval '45 minutes';

                -- Deterministic status distribution: ~75% selesai, ~10% tidak_datang, ~8% batal, ~7% datang
                IF (day_offset + slot_hour) % 11 = 0 THEN
                    apt_status := 'tidak_datang';
                ELSIF (day_offset + slot_hour) % 13 = 0 THEN
                    apt_status := 'batal';
                ELSE
                    apt_status := 'selesai';
                END IF;

                apt_source := CASE WHEN (day_offset + slot_hour) % 2 = 0 THEN 'website' ELSE 'treatment_behel' END;

                INSERT INTO appointments (id, patient_id, doctor_id, treatment_id, starts_at, ends_at, status, source, notes, created_at, updated_at)
                VALUES (
                    apt_id,
                    pat_records[(p_idx % array_length(pat_records, 1)) + 1],
                    target_doc,
                    target_trt,
                    s_time,
                    e_time,
                    apt_status,
                    apt_source,
                    'Catatan kunjungan demo',
                    s_time - interval '3 days',
                    s_time
                );

                -- Insert status logs
                INSERT INTO appointment_status_logs (appointment_id, from_status, to_status, actor_label, created_at)
                VALUES (apt_id, 'dijadwalkan', 'dikonfirmasi', 'Admin Demo', s_time - interval '1 days');

                IF apt_status <> 'dikonfirmasi' AND apt_status <> 'dijadwalkan' THEN
                    INSERT INTO appointment_status_logs (appointment_id, from_status, to_status, actor_label, created_at)
                    VALUES (apt_id, 'dikonfirmasi', apt_status, 'Admin Demo', s_time);
                END IF;

                p_idx := p_idx + 1;
            END IF;
        END LOOP;
    END LOOP;

    -- Generate TODAY (Day 0) appointments
    curr_date := CURRENT_DATE;
    -- Slot 10:00 Selesai
    s_time := (curr_date || ' 10:00:00+07')::TIMESTAMPTZ;
    apt_id := '55555555-5555-5555-5555-555555555501';
    INSERT INTO appointments (id, patient_id, doctor_id, treatment_id, starts_at, ends_at, status, source, notes)
    VALUES (apt_id, pat_records[1], doc_orto, trt_behel, s_time, s_time + interval '45 minutes', 'selesai', 'website', 'Pemeriksaan bracket behel');
    INSERT INTO appointment_status_logs (appointment_id, from_status, to_status, actor_label, created_at) VALUES (apt_id, 'dikonfirmasi', 'selesai', 'Admin Demo', s_time);

    -- Slot 11:00 Datang
    s_time := (curr_date || ' 11:00:00+07')::TIMESTAMPTZ;
    apt_id := '55555555-5555-5555-5555-555555555502';
    INSERT INTO appointments (id, patient_id, doctor_id, treatment_id, starts_at, ends_at, status, source, notes)
    VALUES (apt_id, pat_records[2], doc_umum, trt_scale, s_time, s_time + interval '45 minutes', 'datang', 'website', 'Sudah tiba di ruang tunggu');
    INSERT INTO appointment_status_logs (appointment_id, from_status, to_status, actor_label, created_at) VALUES (apt_id, 'dikonfirmasi', 'datang', 'Admin Demo', s_time);

    -- Slot 13:00 Dikonfirmasi
    s_time := (curr_date || ' 13:00:00+07')::TIMESTAMPTZ;
    apt_id := '55555555-5555-5555-5555-555555555503';
    INSERT INTO appointments (id, patient_id, doctor_id, treatment_id, starts_at, ends_at, status, source, notes)
    VALUES (apt_id, pat_records[3], doc_orto, trt_align, s_time, s_time + interval '45 minutes', 'dikonfirmasi', 'website', 'Pasien konfirmasi hadir via chat');

    -- Slot 14:00 Dijadwalkan
    s_time := (curr_date || ' 14:00:00+07')::TIMESTAMPTZ;
    apt_id := '55555555-5555-5555-5555-555555555504';
    INSERT INTO appointments (id, patient_id, doctor_id, treatment_id, starts_at, ends_at, status, source, notes)
    VALUES (apt_id, pat_records[4], doc_kons, trt_tambal, s_time, s_time + interval '45 minutes', 'dijadwalkan', 'treatment_behel', 'Permintaan booking website');

    -- Slot 15:00 Dijadwalkan
    s_time := (curr_date || ' 15:00:00+07')::TIMESTAMPTZ;
    apt_id := '55555555-5555-5555-5555-555555555505';
    INSERT INTO appointments (id, patient_id, doctor_id, treatment_id, starts_at, ends_at, status, source, notes)
    VALUES (apt_id, pat_records[5], doc_umum, trt_konsul, s_time, s_time + interval '30 minutes', 'dijadwalkan', 'website', 'Konsultasi pertama');

    -- Generate NEXT 7 DAYS (Day +1 to +7)
    FOR day_offset IN 1..7 LOOP
        curr_date := (CURRENT_DATE + (day_offset || ' days')::INTERVAL)::DATE;
        FOR slot_hour IN 10..15 LOOP
            IF (day_offset + slot_hour) % 2 = 0 THEN
                apt_id := gen_random_uuid();
                target_doc := CASE WHEN slot_hour % 2 = 0 THEN doc_orto ELSE doc_umum END;
                target_trt := CASE WHEN slot_hour % 2 = 0 THEN trt_behel ELSE trt_scale END;

                s_time := (curr_date || ' ' || LPAD(slot_hour::TEXT, 2, '0') || ':00:00+07')::TIMESTAMPTZ;
                e_time := s_time + interval '45 minutes';
                apt_status := CASE WHEN day_offset <= 2 THEN 'dikonfirmasi' ELSE 'dijadwalkan' END;

                INSERT INTO appointments (id, patient_id, doctor_id, treatment_id, starts_at, ends_at, status, source, notes, created_at, updated_at)
                VALUES (
                    apt_id,
                    pat_records[(p_idx % array_length(pat_records, 1)) + 1],
                    target_doc,
                    target_trt,
                    s_time,
                    e_time,
                    apt_status,
                    'website',
                    'Booking terjadwal',
                    now(),
                    now()
                );

                p_idx := p_idx + 1;
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- ------------------------------------------------------------------------------
-- 6. SIMULATED REMINDERS (Antre, Terkirim, Dibatalkan)
-- ------------------------------------------------------------------------------
INSERT INTO reminders (id, appointment_id, patient_treatment_id, type, message_preview, scheduled_at, status) VALUES
('66666666-6666-6666-6666-666666666601', '55555555-5555-5555-5555-555555555503', NULL, 'h_minus_1',
 'Halo Kak Reza Aditya, mengingatkan jadwal kunjungan konsultasi Clear Aligner besok pukul 13:00 WIB bersama Drg. Sarah Wijaya. Mohon konfirmasi kehadirannya. (Demo Portfolio)',
 now() - interval '6 hours', 'terkirim_simulasi'),

('66666666-6666-6666-6666-666666666602', '55555555-5555-5555-5555-555555555504', NULL, 'h_minus_1',
 'Halo Kak Dewi Anggraini, mengingatkan jadwal perawatan penambalan gigi hari ini pukul 14:00 WIB bersama Drg. Amanda Lestari. (Demo Portfolio)',
 now() - interval '2 hours', 'terkirim_simulasi'),

('66666666-6666-6666-6666-666666666603', NULL, '44444444-4444-4444-4444-444444444401', 'kontrol',
 'Halo Kak Dimas Arya, sudah waktunya kontrol berkala Behel Metal (terlambat 5 hari). Silakan jadwalkan kunjungan Anda kembali melalui website kami. (Demo Portfolio)',
 now() - interval '1 days', 'antre'),

('66666666-6666-6666-6666-666666666604', NULL, '44444444-4444-4444-4444-444444444403', 'kontrol',
 'Halo Kak Anisa Tri, mengingatkan jadwal kontrol Clear Aligner dalam 2 hari ke depan bersama Drg. Sarah Wijaya. (Demo Portfolio)',
 now() + interval '1 days', 'antre'),

('66666666-6666-6666-6666-666666666605', '55555555-5555-5555-5555-555555555505', NULL, 'h_minus_1',
 'Pengingat janji temu Konsultasi Gigi pukul 15:00 WIB dibatalkan atas permintaan pasien. (Demo Portfolio)',
 now() - interval '12 hours', 'dibatalkan');
