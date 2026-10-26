-- ==============================================================================
-- SISTEM KLINIK GIGI (DEMO PORTFOLIO) - DATABASE SCHEMA
-- Migration: 01_schema.sql
-- ==============================================================================

-- Enable btree_gist extension for overlap prevention constraints
CREATE EXTENSION IF NOT EXISTS "btree_gist";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean existing tables if needed (safe rebuild order)
DROP TABLE IF EXISTS reminders CASCADE;
DROP TABLE IF EXISTS appointment_status_logs CASCADE;
DROP TABLE IF EXISTS patient_treatments CASCADE;
DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS treatments CASCADE;
DROP TABLE IF EXISTS doctors CASCADE;

-- 1. DOCTORS
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    schedule JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TREATMENTS
CREATE TABLE treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    category TEXT NOT NULL,
    requires_follow_up BOOLEAN NOT NULL DEFAULT false,
    follow_up_interval_days INTEGER DEFAULT 30,
    price_range_label TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. PATIENTS
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    whatsapp_normalized TEXT NOT NULL,
    birth_date DATE,
    demo_consent_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for searching patients by name or whatsapp
CREATE INDEX idx_patients_name ON patients (name);
CREATE INDEX idx_patients_whatsapp ON patients (whatsapp_normalized);

-- 4. APPOINTMENTS
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
    treatment_id UUID NOT NULL REFERENCES treatments(id) ON DELETE RESTRICT,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('dijadwalkan', 'dikonfirmasi', 'datang', 'tidak_datang', 'batal', 'selesai')),
    source TEXT NOT NULL DEFAULT 'website',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_appointment_times CHECK (starts_at < ends_at),
    -- Overlap prevention constraint: doctor cannot have overlapping appointments unless canceled ('batal')
    CONSTRAINT no_overlapping_appointments EXCLUDE USING gist (
        doctor_id WITH =,
        tstzrange(starts_at, ends_at, '[)') WITH &&
    ) WHERE (status <> 'batal')
);

CREATE INDEX idx_appointments_starts_at ON appointments (starts_at);
CREATE INDEX idx_appointments_status ON appointments (status);
CREATE INDEX idx_appointments_doctor ON appointments (doctor_id);
CREATE INDEX idx_appointments_patient ON appointments (patient_id);

-- 5. APPOINTMENT STATUS LOGS
CREATE TABLE appointment_status_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
    from_status TEXT,
    to_status TEXT NOT NULL,
    actor_label TEXT NOT NULL DEFAULT 'Admin Demo',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_logs_appointment_id ON appointment_status_logs (appointment_id);

-- 6. PATIENT TREATMENTS (Treatment aktif & kontrol berulang)
CREATE TABLE patient_treatments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    treatment_id UUID NOT NULL REFERENCES treatments(id) ON DELETE RESTRICT,
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    next_follow_up_at TIMESTAMPTZ,
    status TEXT NOT NULL CHECK (status IN ('aktif', 'selesai', 'dibatalkan')) DEFAULT 'aktif',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_patient_treatments_patient ON patient_treatments (patient_id);
CREATE INDEX idx_patient_treatments_followup ON patient_treatments (next_follow_up_at);

-- 7. REMINDERS (Simulasi Outbox)
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    patient_treatment_id UUID REFERENCES patient_treatments(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('h_minus_1', 'kontrol')),
    message_preview TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('antre', 'terkirim_simulasi', 'gagal_simulasi', 'dibatalkan')) DEFAULT 'antre',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reminders_scheduled ON reminders (scheduled_at);
CREATE INDEX idx_reminders_status ON reminders (status);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_status_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- 1. Public Read for Active Doctors & Treatments (needed for public booking & landing page)
CREATE POLICY "Public can view active doctors" ON doctors
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active treatments" ON treatments
    FOR SELECT USING (is_active = true);

-- 2. Service role / Authenticated admin demo full access
CREATE POLICY "Admin full access doctors" ON doctors
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admin full access treatments" ON treatments
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admin full access patients" ON patients
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admin full access appointments" ON appointments
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admin full access appointment_status_logs" ON appointment_status_logs
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admin full access patient_treatments" ON patient_treatments
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Admin full access reminders" ON reminders
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 3. Public Appointment Booking Policy
-- Note: In Next.js App Router, public booking will be submitted via a verified Server Action
-- using server-side validation and Supabase service_role or controlled insert.
-- We also allow direct insert for patients & appointments if anon client is used with constraints.
CREATE POLICY "Public anon insert patient" ON patients
    FOR INSERT WITH CHECK (name IS NOT NULL AND whatsapp_normalized IS NOT NULL);

CREATE POLICY "Public anon insert appointment" ON appointments
    FOR INSERT WITH CHECK (status = 'dijadwalkan');

CREATE POLICY "Public anon view doctors slots" ON appointments
    FOR SELECT USING (status <> 'batal');
