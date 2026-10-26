import fs from 'fs';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';
import type {
  Doctor,
  Treatment,
  Patient,
  Appointment,
  AppointmentStatusLog,
  PatientTreatment,
  Reminder,
  AppointmentStatus,
  ReminderStatus,
} from '@/types/database';

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'mock-db.json');

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return Boolean(url && !url.includes('your-project') && key && !key.includes('your-'));
}

interface LocalDB {
  doctors: Doctor[];
  treatments: Treatment[];
  patients: Patient[];
  appointments: Appointment[];
  appointment_status_logs: AppointmentStatusLog[];
  patient_treatments: PatientTreatment[];
  reminders: Reminder[];
}

function getInitialLocalData(): LocalDB {
  const now = new Date();
  const doctors: Doctor[] = [
    {
      id: '11111111-1111-1111-1111-111111111101',
      name: 'Drg. Sarah Wijaya, Sp.Ort',
      specialty: 'Spesialis Ortodonti (Behel & Aligner)',
      schedule: [
        { day: 'Senin', start: '10:00', end: '18:00' },
        { day: 'Rabu', start: '10:00', end: '18:00' },
        { day: 'Jumat', start: '13:00', end: '20:00' },
        { day: 'Sabtu', start: '09:00', end: '16:00' },
      ],
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '11111111-1111-1111-1111-111111111102',
      name: 'Drg. Budi Pratama',
      specialty: 'Dokter Gigi Umum & Pencegahan',
      schedule: [
        { day: 'Senin', start: '09:00', end: '17:00' },
        { day: 'Selasa', start: '09:00', end: '17:00' },
        { day: 'Kamis', start: '09:00', end: '17:00' },
        { day: 'Jumat', start: '09:00', end: '17:00' },
        { day: 'Sabtu', start: '09:00', end: '15:00' },
      ],
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '11111111-1111-1111-1111-111111111103',
      name: 'Drg. Amanda Lestari, Sp.KG',
      specialty: 'Spesialis Konservasi Gigi (Estetik & Saluran Akar)',
      schedule: [
        { day: 'Selasa', start: '13:00', end: '20:00' },
        { day: 'Kamis', start: '13:00', end: '20:00' },
        { day: 'Sabtu', start: '13:00', end: '19:00' },
      ],
      is_active: true,
      created_at: now.toISOString(),
    },
  ];

  const treatments: Treatment[] = [
    {
      id: '22222222-2222-2222-2222-222222222201',
      name: 'Konsultasi & Pemeriksaan Gigi Lengkap',
      duration_minutes: 30,
      category: 'Umum',
      requires_follow_up: false,
      follow_up_interval_days: 0,
      price_range_label: 'Rp 150.000 - Rp 250.000',
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '22222222-2222-2222-2222-222222222202',
      name: 'Pembersihan Karang Gigi (Scaling Ultrasonic)',
      duration_minutes: 45,
      category: 'Pencegahan',
      requires_follow_up: true,
      follow_up_interval_days: 180,
      price_range_label: 'Rp 350.000 - Rp 600.000',
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '22222222-2222-2222-2222-222222222203',
      name: 'Behel Metal Konvensional',
      duration_minutes: 60,
      category: 'Ortodonti',
      requires_follow_up: true,
      follow_up_interval_days: 30,
      price_range_label: 'Rp 6.500.000 - Rp 9.000.000',
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '22222222-2222-2222-2222-222222222204',
      name: 'Behel Sapphire Estetik (Transparan)',
      duration_minutes: 60,
      category: 'Ortodonti',
      requires_follow_up: true,
      follow_up_interval_days: 30,
      price_range_label: 'Rp 10.000.000 - Rp 14.000.000',
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '22222222-2222-2222-2222-222222222205',
      name: 'Clear Aligner Invisible (Lepas-Pasang)',
      duration_minutes: 45,
      category: 'Ortodonti',
      requires_follow_up: true,
      follow_up_interval_days: 45,
      price_range_label: 'Rp 16.000.000 - Rp 25.000.000',
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '22222222-2222-2222-2222-222222222206',
      name: 'Penambalan Gigi Estetik Komposit',
      duration_minutes: 45,
      category: 'Restorasi',
      requires_follow_up: false,
      follow_up_interval_days: 0,
      price_range_label: 'Rp 350.000 - Rp 700.000',
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '22222222-2222-2222-2222-222222222207',
      name: 'Perawatan Saluran Akar Gigi',
      duration_minutes: 60,
      category: 'Endodonti',
      requires_follow_up: true,
      follow_up_interval_days: 14,
      price_range_label: 'Rp 1.200.000 - Rp 2.500.000',
      is_active: true,
      created_at: now.toISOString(),
    },
    {
      id: '22222222-2222-2222-2222-222222222208',
      name: 'Pencabutan Gigi Bungsu (Odontektomi)',
      duration_minutes: 60,
      category: 'Bedah Mulut',
      requires_follow_up: true,
      follow_up_interval_days: 7,
      price_range_label: 'Rp 2.000.000 - Rp 3.500.000',
      is_active: true,
      created_at: now.toISOString(),
    },
  ];

  const patientNames = [
    'Dimas Arya Prasetya', 'Siti Nurhaliza Indah', 'Reza Aditya Firmansyah', 'Dewi Anggraini',
    'Bagus Ramadhan', 'Anisa Tri Rahmawati', 'Fajar Hidayatullah', 'Nabila Syahrani',
    'Gilang Saputra', 'Putri Ayu Wulandari', 'Hendra Kurniawan', 'Mega Silvia',
    'Aris Munandar', 'Rina Marlina', 'Danu Setiawan', 'Lestari Handayani',
    'Yoga Pratama', 'Citra Kirana Melati', 'Rizky Fauzan', 'Maya Kusuma',
  ];

  const patients: Patient[] = patientNames.map((name, idx) => {
    const pad = String(idx + 1).padStart(2, '0');
    return {
      id: `33333333-3333-3333-3333-3333333333${pad}`,
      name,
      whatsapp_normalized: `0812345678${pad}`,
      birth_date: `199${idx % 10}-05-12`,
      demo_consent_at: new Date(now.getTime() - (idx + 1) * 86400000).toISOString(),
      created_at: new Date(now.getTime() - (idx + 1) * 86400000).toISOString(),
    };
  });

  const patient_treatments: PatientTreatment[] = [
    {
      id: '44444444-4444-4444-4444-444444444401',
      patient_id: patients[0].id,
      treatment_id: treatments[2].id,
      doctor_id: doctors[0].id,
      started_at: new Date(now.getTime() - 45 * 86400000).toISOString(),
      next_follow_up_at: new Date(now.getTime() - 5 * 86400000).toISOString(),
      status: 'aktif',
      created_at: new Date(now.getTime() - 45 * 86400000).toISOString(),
    },
    {
      id: '44444444-4444-4444-4444-444444444402',
      patient_id: patients[3].id,
      treatment_id: treatments[3].id,
      doctor_id: doctors[0].id,
      started_at: new Date(now.getTime() - 40 * 86400000).toISOString(),
      next_follow_up_at: new Date(now.getTime() - 2 * 86400000).toISOString(),
      status: 'aktif',
      created_at: new Date(now.getTime() - 40 * 86400000).toISOString(),
    },
    {
      id: '44444444-4444-4444-4444-444444444403',
      patient_id: patients[5].id,
      treatment_id: treatments[4].id,
      doctor_id: doctors[0].id,
      started_at: new Date(now.getTime() - 42 * 86400000).toISOString(),
      next_follow_up_at: new Date(now.getTime() + 2 * 86400000).toISOString(),
      status: 'aktif',
      created_at: new Date(now.getTime() - 42 * 86400000).toISOString(),
    },
  ];

  // Appointments for today and recent days
  const appointments: Appointment[] = [
    {
      id: '55555555-5555-5555-5555-555555555501',
      patient_id: patients[0].id,
      doctor_id: doctors[0].id,
      treatment_id: treatments[2].id,
      starts_at: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
      ends_at: new Date(new Date().setHours(10, 45, 0, 0)).toISOString(),
      status: 'selesai',
      source: 'website',
      notes: 'Pemeriksaan bracket behel',
      created_at: new Date(now.getTime() - 2 * 86400000).toISOString(),
      updated_at: now.toISOString(),
    },
    {
      id: '55555555-5555-5555-5555-555555555502',
      patient_id: patients[1].id,
      doctor_id: doctors[1].id,
      treatment_id: treatments[1].id,
      starts_at: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
      ends_at: new Date(new Date().setHours(11, 45, 0, 0)).toISOString(),
      status: 'datang',
      source: 'website',
      notes: 'Sudah tiba di ruang tunggu',
      created_at: new Date(now.getTime() - 1 * 86400000).toISOString(),
      updated_at: now.toISOString(),
    },
    {
      id: '55555555-5555-5555-5555-555555555503',
      patient_id: patients[2].id,
      doctor_id: doctors[0].id,
      treatment_id: treatments[4].id,
      starts_at: new Date(new Date().setHours(13, 0, 0, 0)).toISOString(),
      ends_at: new Date(new Date().setHours(13, 45, 0, 0)).toISOString(),
      status: 'dikonfirmasi',
      source: 'website',
      notes: 'Konfirmasi via WhatsApp',
      created_at: new Date(now.getTime() - 1 * 86400000).toISOString(),
      updated_at: now.toISOString(),
    },
    {
      id: '55555555-5555-5555-5555-555555555504',
      patient_id: patients[3].id,
      doctor_id: doctors[2].id,
      treatment_id: treatments[5].id,
      starts_at: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      ends_at: new Date(new Date().setHours(14, 45, 0, 0)).toISOString(),
      status: 'dijadwalkan',
      source: 'treatment_behel',
      notes: 'Permintaan booking via website',
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    },
  ];

  const appointment_status_logs: AppointmentStatusLog[] = [
    {
      id: '77777777-7777-7777-7777-777777777701',
      appointment_id: appointments[0].id,
      from_status: 'dikonfirmasi',
      to_status: 'selesai',
      actor_label: 'Staf Resepsionis',
      created_at: new Date(new Date().setHours(10, 45, 0, 0)).toISOString(),
    },
    {
      id: '77777777-7777-7777-7777-777777777702',
      appointment_id: appointments[1].id,
      from_status: 'dikonfirmasi',
      to_status: 'datang',
      actor_label: 'Staf Resepsionis',
      created_at: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    },
  ];

  const reminders: Reminder[] = [
    {
      id: '66666666-6666-6666-6666-666666666601',
      appointment_id: appointments[2].id,
      patient_treatment_id: null,
      type: 'h_minus_1',
      message_preview: `Halo Kak ${patients[2].name}, mengingatkan janji temu Clear Aligner hari ini jam 13:00 WIB bersama Drg. Sarah Wijaya di Aruna Dental Studio.`,
      scheduled_at: new Date(now.getTime() - 2 * 3600000).toISOString(),
      status: 'terkirim_simulasi',
      created_at: now.toISOString(),
    },
    {
      id: '66666666-6666-6666-6666-666666666602',
      appointment_id: null,
      patient_treatment_id: patient_treatments[0].id,
      type: 'kontrol',
      message_preview: `Halo Kak ${patients[0].name}, waktu kontrol Behel Metal Anda telah jatuh tempo. Silakan jadwalkan kunjungan di website kami.`,
      scheduled_at: new Date(now.getTime() - 86400000).toISOString(),
      status: 'antre',
      created_at: now.toISOString(),
    },
  ];

  return {
    doctors,
    treatments,
    patients,
    appointments,
    appointment_status_logs,
    patient_treatments,
    reminders,
  };
}

function readLocalDB(): LocalDB {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial = getInitialLocalData();
      fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), 'utf8');
      return initial;
    }
    const content = fs.readFileSync(DB_FILE_PATH, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading local mock DB:', err);
    return getInitialLocalData();
  }
}

function writeLocalDB(data: LocalDB): void {
  try {
    fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing local mock DB:', err);
  }
}

// ------------------------------------------------------------------------------
// PUBLIC UNIFIED API (DB LAYER)
// ------------------------------------------------------------------------------

// 1. DOCTORS
export async function getDoctors(includeInactive = true): Promise<Doctor[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    let q = supabase.from('doctors').select('*').order('name');
    if (!includeInactive) q = q.eq('is_active', true);
    const { data, error } = await q;
    if (!error && data) return data as Doctor[];
  }
  const db = readLocalDB();
  return includeInactive ? db.doctors : db.doctors.filter(d => d.is_active);
}

export async function createDoctor(doctorData: Omit<Doctor, 'id' | 'created_at'>): Promise<Doctor> {
  const newDoctor: Doctor = {
    id: crypto.randomUUID(),
    ...doctorData,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('doctors').insert(newDoctor).select().single();
    if (error) throw new Error(error.message);
    return data as Doctor;
  }

  const db = readLocalDB();
  db.doctors.push(newDoctor);
  writeLocalDB(db);
  return newDoctor;
}

export async function updateDoctor(id: string, updates: Partial<Doctor>): Promise<Doctor> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('doctors').update(updates).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data as Doctor;
  }

  const db = readLocalDB();
  const idx = db.doctors.findIndex(d => d.id === id);
  if (idx === -1) throw new Error('Dokter tidak ditemukan');
  db.doctors[idx] = { ...db.doctors[idx], ...updates };
  writeLocalDB(db);
  return db.doctors[idx];
}

// 2. TREATMENTS
export async function getTreatments(includeInactive = true): Promise<Treatment[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    let q = supabase.from('treatments').select('*').order('name');
    if (!includeInactive) q = q.eq('is_active', true);
    const { data, error } = await q;
    if (!error && data) return data as Treatment[];
  }
  const db = readLocalDB();
  return includeInactive ? db.treatments : db.treatments.filter(t => t.is_active);
}

export async function createTreatment(treatmentData: Omit<Treatment, 'id' | 'created_at'>): Promise<Treatment> {
  const newTreatment: Treatment = {
    id: crypto.randomUUID(),
    ...treatmentData,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('treatments').insert(newTreatment).select().single();
    if (error) throw new Error(error.message);
    return data as Treatment;
  }

  const db = readLocalDB();
  db.treatments.push(newTreatment);
  writeLocalDB(db);
  return newTreatment;
}

export async function updateTreatment(id: string, updates: Partial<Treatment>): Promise<Treatment> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('treatments').update(updates).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data as Treatment;
  }

  const db = readLocalDB();
  const idx = db.treatments.findIndex(t => t.id === id);
  if (idx === -1) throw new Error('Treatment tidak ditemukan');
  db.treatments[idx] = { ...db.treatments[idx], ...updates };
  writeLocalDB(db);
  return db.treatments[idx];
}

// 3. PATIENTS
export async function getPatients(searchQuery = ''): Promise<Patient[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    let q = supabase.from('patients').select('*').order('created_at', { ascending: false });
    if (searchQuery.trim()) {
      q = q.or(`name.ilike.%${searchQuery}%,whatsapp_normalized.ilike.%${searchQuery}%`);
    }
    const { data, error } = await q;
    if (!error && data) return data as Patient[];
  }

  const db = readLocalDB();
  let list = db.patients;
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.whatsapp_normalized.includes(q));
  }
  return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getPatientById(id: string): Promise<{
  patient: Patient;
  appointments: Appointment[];
  treatments: PatientTreatment[];
} | null> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: patient } = await supabase.from('patients').select('*').eq('id', id).single();
    if (!patient) return null;
    const { data: apts } = await supabase.from('appointments').select('*, doctor:doctors(*), treatment:treatments(*)').eq('patient_id', id).order('starts_at', { ascending: false });
    const { data: trts } = await supabase.from('patient_treatments').select('*, doctor:doctors(*), treatment:treatments(*)').eq('patient_id', id);
    return {
      patient: patient as Patient,
      appointments: (apts || []) as Appointment[],
      treatments: (trts || []) as PatientTreatment[],
    };
  }

  const db = readLocalDB();
  const patient = db.patients.find(p => p.id === id);
  if (!patient) return null;

  const apts = db.appointments
    .filter(a => a.patient_id === id)
    .map(a => ({
      ...a,
      doctor: db.doctors.find(d => d.id === a.doctor_id),
      treatment: db.treatments.find(t => t.id === a.treatment_id),
    }))
    .sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());

  const trts = db.patient_treatments
    .filter(pt => pt.patient_id === id)
    .map(pt => ({
      ...pt,
      doctor: db.doctors.find(d => d.id === pt.doctor_id),
      treatment: db.treatments.find(t => t.id === pt.treatment_id),
    }));

  return { patient, appointments: apts, treatments: trts };
}

export async function createPatient(data: Omit<Patient, 'id' | 'created_at' | 'demo_consent_at'>): Promise<Patient> {
  const newPatient: Patient = {
    id: crypto.randomUUID(),
    ...data,
    demo_consent_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: saved, error } = await supabase.from('patients').insert(newPatient).select().single();
    if (error) throw new Error(error.message);
    return saved as Patient;
  }

  const db = readLocalDB();
  db.patients.unshift(newPatient);
  writeLocalDB(db);
  return newPatient;
}

export async function updatePatient(id: string, updates: Partial<Patient>): Promise<Patient> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('patients').update(updates).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return data as Patient;
  }

  const db = readLocalDB();
  const idx = db.patients.findIndex(p => p.id === id);
  if (idx === -1) throw new Error('Pasien tidak ditemukan');
  db.patients[idx] = { ...db.patients[idx], ...updates };
  writeLocalDB(db);
  return db.patients[idx];
}

export async function deletePatient(id: string): Promise<{ success: boolean; message: string }> {
  // Check relations before deleting to prevent breaking foreign keys (PRD Section 6.1)
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: apts } = await supabase.from('appointments').select('id').eq('patient_id', id).limit(1);
    if (apts && apts.length > 0) {
      throw new Error('Pasien tidak dapat dihapus karena memiliki riwayat appointment.');
    }
    const { error } = await supabase.from('patients').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true, message: 'Data pasien berhasil dihapus' };
  }

  const db = readLocalDB();
  const hasApt = db.appointments.some(a => a.patient_id === id);
  if (hasApt) {
    throw new Error('Pasien tidak dapat dihapus karena memiliki riwayat appointment.');
  }
  db.patients = db.patients.filter(p => p.id !== id);
  writeLocalDB(db);
  return { success: true, message: 'Data pasien berhasil dihapus' };
}

// 4. APPOINTMENTS
export async function getAppointments(filters?: {
  date?: string;
  doctorId?: string;
  status?: string;
}): Promise<Appointment[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    let q = supabase
      .from('appointments')
      .select('*, patient:patients(*), doctor:doctors(*), treatment:treatments(*)')
      .order('starts_at', { ascending: false });

    if (filters?.doctorId && filters.doctorId !== 'all') {
      q = q.eq('doctor_id', filters.doctorId);
    }
    if (filters?.status && filters.status !== 'all') {
      q = q.eq('status', filters.status);
    }
    if (filters?.date) {
      const startOfDay = `${filters.date}T00:00:00+07:00`;
      const endOfDay = `${filters.date}T23:59:59+07:00`;
      q = q.gte('starts_at', startOfDay).lte('starts_at', endOfDay);
    }

    const { data, error } = await q;
    if (!error && data) return data as Appointment[];
  }

  const db = readLocalDB();
  let list = db.appointments.map(a => ({
    ...a,
    patient: db.patients.find(p => p.id === a.patient_id),
    doctor: db.doctors.find(d => d.id === a.doctor_id),
    treatment: db.treatments.find(t => t.id === a.treatment_id),
  }));

  if (filters?.doctorId && filters.doctorId !== 'all') {
    list = list.filter(a => a.doctor_id === filters.doctorId);
  }
  if (filters?.status && filters.status !== 'all') {
    list = list.filter(a => a.status === filters.status);
  }
  if (filters?.date) {
    list = list.filter(a => a.starts_at.startsWith(filters.date!));
  }

  return list.sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());
}

export async function checkSlotConflict(
  doctorId: string,
  startsAt: string,
  endsAt: string,
  excludeAppointmentId?: string
): Promise<boolean> {
  const newStart = new Date(startsAt).getTime();
  const newEnd = new Date(endsAt).getTime();

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    let q = supabase
      .from('appointments')
      .select('id, starts_at, ends_at')
      .eq('doctor_id', doctorId)
      .neq('status', 'batal');

    if (excludeAppointmentId) {
      q = q.neq('id', excludeAppointmentId);
    }

    const { data, error } = await q;
    if (!error && data) {
      return data.some(a => {
        const s = new Date(a.starts_at).getTime();
        const e = new Date(a.ends_at).getTime();
        return newStart < e && newEnd > s; // overlap condition
      });
    }
  }

  const db = readLocalDB();
  return db.appointments.some(a => {
    if (a.doctor_id !== doctorId || a.status === 'batal') return false;
    if (excludeAppointmentId && a.id === excludeAppointmentId) return false;
    const s = new Date(a.starts_at).getTime();
    const e = new Date(a.ends_at).getTime();
    return newStart < e && newEnd > s;
  });
}

export async function createAppointment(data: {
  patient_id: string;
  doctor_id: string;
  treatment_id: string;
  starts_at: string;
  ends_at: string;
  source?: string;
  notes?: string;
}): Promise<Appointment> {
  // Validate conflict
  const hasConflict = await checkSlotConflict(data.doctor_id, data.starts_at, data.ends_at);
  if (hasConflict) {
    throw new Error('Jadwal bentrok: Dokter sudah memiliki janji temu pada slot waktu tersebut.');
  }

  const newApt: Appointment = {
    id: crypto.randomUUID(),
    patient_id: data.patient_id,
    doctor_id: data.doctor_id,
    treatment_id: data.treatment_id,
    starts_at: data.starts_at,
    ends_at: data.ends_at,
    status: 'dijadwalkan',
    source: data.source || 'website',
    notes: data.notes || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: saved, error } = await supabase.from('appointments').insert(newApt).select().single();
    if (error) throw new Error(error.message);

    // Insert log
    await supabase.from('appointment_status_logs').insert({
      id: crypto.randomUUID(),
      appointment_id: newApt.id,
      from_status: null,
      to_status: 'dijadwalkan',
      actor_label: 'Sistem Booking',
      created_at: new Date().toISOString(),
    });

    return saved as Appointment;
  }

  const db = readLocalDB();
  db.appointments.unshift(newApt);
  db.appointment_status_logs.push({
    id: crypto.randomUUID(),
    appointment_id: newApt.id,
    from_status: null,
    to_status: 'dijadwalkan',
    actor_label: 'Sistem Booking',
    created_at: new Date().toISOString(),
  });
  writeLocalDB(db);
  return newApt;
}

export async function updateAppointmentStatus(
  id: string,
  newStatus: AppointmentStatus,
  actorLabel = 'Staf Klinik'
): Promise<Appointment> {
  let prevStatus: string | null = null;

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: current } = await supabase.from('appointments').select('status').eq('id', id).single();
    prevStatus = current?.status || null;

    const { data: updated, error } = await supabase
      .from('appointments')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*, patient:patients(*), doctor:doctors(*), treatment:treatments(*)')
      .single();

    if (error) throw new Error(error.message);

    // Record status log
    await supabase.from('appointment_status_logs').insert({
      id: crypto.randomUUID(),
      appointment_id: id,
      from_status: prevStatus,
      to_status: newStatus,
      actor_label: actorLabel,
      created_at: new Date().toISOString(),
    });

    return updated as Appointment;
  }

  const db = readLocalDB();
  const idx = db.appointments.findIndex(a => a.id === id);
  if (idx === -1) throw new Error('Appointment tidak ditemukan');

  prevStatus = db.appointments[idx].status;
  db.appointments[idx].status = newStatus;
  db.appointments[idx].updated_at = new Date().toISOString();

  db.appointment_status_logs.push({
    id: crypto.randomUUID(),
    appointment_id: id,
    from_status: prevStatus,
    to_status: newStatus,
    actor_label: actorLabel,
    created_at: new Date().toISOString(),
  });

  writeLocalDB(db);

  return {
    ...db.appointments[idx],
    patient: db.patients.find(p => p.id === db.appointments[idx].patient_id),
    doctor: db.doctors.find(d => d.id === db.appointments[idx].doctor_id),
    treatment: db.treatments.find(t => t.id === db.appointments[idx].treatment_id),
  };
}

export async function updateAppointmentSchedule(
  id: string,
  startsAt: string,
  endsAt: string,
  doctorId?: string
): Promise<Appointment> {
  let docId = doctorId;
  if (!docId) {
    const apts = await getAppointments();
    const cur = apts.find(a => a.id === id);
    if (!cur) throw new Error('Appointment tidak ditemukan');
    docId = cur.doctor_id;
  }

  const hasConflict = await checkSlotConflict(docId, startsAt, endsAt, id);
  if (hasConflict) {
    throw new Error('Jadwal bentrok: Dokter sudah memiliki janji temu pada slot waktu tersebut.');
  }

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: updated, error } = await supabase
      .from('appointments')
      .update({
        starts_at: startsAt,
        ends_at: endsAt,
        doctor_id: docId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*, patient:patients(*), doctor:doctors(*), treatment:treatments(*)')
      .single();

    if (error) throw new Error(error.message);
    return updated as Appointment;
  }

  const db = readLocalDB();
  const idx = db.appointments.findIndex(a => a.id === id);
  if (idx === -1) throw new Error('Appointment tidak ditemukan');

  db.appointments[idx].starts_at = startsAt;
  db.appointments[idx].ends_at = endsAt;
  db.appointments[idx].doctor_id = docId;
  db.appointments[idx].updated_at = new Date().toISOString();
  writeLocalDB(db);

  return {
    ...db.appointments[idx],
    patient: db.patients.find(p => p.id === db.appointments[idx].patient_id),
    doctor: db.doctors.find(d => d.id === db.appointments[idx].doctor_id),
    treatment: db.treatments.find(t => t.id === db.appointments[idx].treatment_id),
  };
}

// 5. PATIENT TREATMENTS & KONTROL
export async function getPatientTreatments(filter?: 'all' | 'due' | 'overdue'): Promise<PatientTreatment[]> {
  const now = new Date();

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    let q = supabase
      .from('patient_treatments')
      .select('*, patient:patients(*), doctor:doctors(*), treatment:treatments(*)')
      .eq('status', 'aktif')
      .order('next_follow_up_at', { ascending: true });

    if (filter === 'overdue') {
      q = q.lt('next_follow_up_at', now.toISOString());
    }

    const { data, error } = await q;
    if (!error && data) return data as PatientTreatment[];
  }

  const db = readLocalDB();
  let list = db.patient_treatments
    .filter(pt => pt.status === 'aktif')
    .map(pt => ({
      ...pt,
      patient: db.patients.find(p => p.id === pt.patient_id),
      doctor: db.doctors.find(d => d.id === pt.doctor_id),
      treatment: db.treatments.find(t => t.id === pt.treatment_id),
    }));

  if (filter === 'overdue') {
    list = list.filter(pt => pt.next_follow_up_at && new Date(pt.next_follow_up_at) < now);
  } else if (filter === 'due') {
    const next7Days = new Date(now.getTime() + 7 * 86400000);
    list = list.filter(
      pt => pt.next_follow_up_at && new Date(pt.next_follow_up_at) >= now && new Date(pt.next_follow_up_at) <= next7Days
    );
  }

  return list.sort((a, b) => {
    if (!a.next_follow_up_at) return 1;
    if (!b.next_follow_up_at) return -1;
    return new Date(a.next_follow_up_at).getTime() - new Date(b.next_follow_up_at).getTime();
  });
}

export async function createPatientTreatment(data: {
  patient_id: string;
  treatment_id: string;
  doctor_id: string;
  next_follow_up_at: string;
}): Promise<PatientTreatment> {
  const newPt: PatientTreatment = {
    id: crypto.randomUUID(),
    patient_id: data.patient_id,
    treatment_id: data.treatment_id,
    doctor_id: data.doctor_id,
    started_at: new Date().toISOString(),
    next_follow_up_at: data.next_follow_up_at,
    status: 'aktif',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data: saved, error } = await supabase.from('patient_treatments').insert(newPt).select().single();
    if (error) throw new Error(error.message);
    return saved as PatientTreatment;
  }

  const db = readLocalDB();
  db.patient_treatments.push(newPt);
  writeLocalDB(db);
  return newPt;
}

// 6. SIMULATED REMINDERS
export async function getReminders(): Promise<Reminder[]> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('reminders')
      .select('*, appointment:appointments(*, patient:patients(*)), patient_treatment:patient_treatments(*, patient:patients(*), treatment:treatments(*))')
      .order('scheduled_at', { ascending: false });
    if (!error && data) return data as Reminder[];
  }

  const db = readLocalDB();
  return db.reminders.map(r => ({
    ...r,
    appointment: db.appointments.find(a => a.id === r.appointment_id),
    patient_treatment: db.patient_treatments.find(pt => pt.id === r.patient_treatment_id),
  })).sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime());
}

export async function updateReminderStatus(id: string, status: ReminderStatus): Promise<Reminder> {
  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('reminders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as Reminder;
  }

  const db = readLocalDB();
  const idx = db.reminders.findIndex(r => r.id === id);
  if (idx === -1) throw new Error('Reminder tidak ditemukan');
  db.reminders[idx].status = status;
  writeLocalDB(db);
  return db.reminders[idx];
}

// 7. DASHBOARD METRICS CALCULATION
export async function getDashboardMetrics() {
  const apts = await getAppointments();
  const followUps = await getPatientTreatments();
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // 1. Booking hari ini
  const todayApts = apts.filter(a => a.starts_at.startsWith(todayStr));

  // 2. Booking baru minggu ini (last 7 days)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);
  const thisWeekApts = apts.filter(a => new Date(a.created_at) >= sevenDaysAgo);

  // 3. No-show rate (last 30 days)
  // PRD definition: status 'tidak_datang' dibagi total appointment (tidak termasuk 'batal')
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);
  const past30DaysApts = apts.filter(a => new Date(a.starts_at) >= thirtyDaysAgo && new Date(a.starts_at) <= now);
  const eligibleApts = past30DaysApts.filter(a => a.status !== 'batal');
  const noShowCount = eligibleApts.filter(a => a.status === 'tidak_datang').length;
  const noShowRate = eligibleApts.length > 0 ? Math.round((noShowCount / eligibleApts.length) * 100) : 0;

  // 4. Pasien yang perlu kontrol (overdue or due within 7 days)
  const overdueKontrol = followUps.filter(pt => pt.next_follow_up_at && new Date(pt.next_follow_up_at) < now);

  // 5. Booking trend (past 4 weeks)
  const weeklyTrends = [
    { week: 'Minggu 1', bookings: 0, selesai: 0 },
    { week: 'Minggu 2', bookings: 0, selesai: 0 },
    { week: 'Minggu 3', bookings: 0, selesai: 0 },
    { week: 'Minggu 4', bookings: 0, selesai: 0 },
  ];

  past30DaysApts.forEach(a => {
    const aptTime = new Date(a.starts_at).getTime();
    const diffDays = Math.floor((now.getTime() - aptTime) / 86400000);
    const weekIdx = Math.min(3, Math.max(0, 3 - Math.floor(diffDays / 7)));
    weeklyTrends[weekIdx].bookings += 1;
    if (a.status === 'selesai') {
      weeklyTrends[weekIdx].selesai += 1;
    }
  });

  // 6. Booking by source
  const sourceBreakdown = [
    { name: 'Website Utama', value: apts.filter(a => a.source === 'website').length },
    { name: 'Halaman Behel', value: apts.filter(a => a.source === 'treatment_behel').length },
    { name: 'Admin / Walk-in', value: apts.filter(a => a.source === 'admin').length },
  ];

  return {
    todayTotal: todayApts.length,
    todayConfirmed: todayApts.filter(a => a.status === 'dikonfirmasi' || a.status === 'datang').length,
    thisWeekNew: thisWeekApts.length,
    noShowRate,
    noShowCount,
    eligibleTotal: eligibleApts.length,
    kontrolDueCount: overdueKontrol.length,
    weeklyTrends,
    sourceBreakdown,
  };
}

export async function resetDatabaseToSeed() {
  const initial = getInitialLocalData();
  writeLocalDB(initial);
  return { success: true, message: 'Data operasional lokal berhasil disinkronkan ke kondisi awal.' };
}
