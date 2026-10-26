import { createAdminClient } from '@/lib/supabase/admin';

export async function resetDemoData() {
  const supabase = createAdminClient();

  // 1. Clear existing tables in safe order
  await supabase.from('reminders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('appointment_status_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('patient_treatments').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('appointments').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('patients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('treatments').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('doctors').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // 2. Insert Doctors
  const doctors = [
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
    },
  ];
  const { error: docErr } = await supabase.from('doctors').insert(doctors);
  if (docErr) throw new Error(`Gagal seed dokter: ${docErr.message}`);

  // 3. Insert Treatments
  const treatments = [
    {
      id: '22222222-2222-2222-2222-222222222201',
      name: 'Konsultasi & Pemeriksaan Gigi Lengkap',
      duration_minutes: 30,
      category: 'Umum',
      requires_follow_up: false,
      follow_up_interval_days: 0,
      price_range_label: 'Rp 150.000 - Rp 250.000',
      is_active: true,
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
    },
  ];
  const { error: trtErr } = await supabase.from('treatments').insert(treatments);
  if (trtErr) throw new Error(`Gagal seed treatment: ${trtErr.message}`);

  // 4. Insert Patients
  const patientNames = [
    'Dimas Arya Prasetya', 'Siti Nurhaliza Indah', 'Reza Aditya Firmansyah', 'Dewi Anggraini',
    'Bagus Ramadhan', 'Anisa Tri Rahmawati', 'Fajar Hidayatullah', 'Nabila Syahrani',
    'Gilang Saputra', 'Putri Ayu Wulandari', 'Hendra Kurniawan', 'Mega Silvia',
    'Aris Munandar', 'Rina Marlina', 'Danu Setiawan', 'Lestari Handayani',
    'Yoga Pratama', 'Citra Kirana Melati', 'Rizky Fauzan', 'Maya Kusuma',
    'Eko Purnomo', 'Indah Permatasari', 'Agus Budiman', 'Tania Wardani',
    'Bayu Samudra', 'Widya Astuti', 'Aldi Pratama', 'Dian Rosita',
    'Irfan Maulana', 'Nurul Hikmah', 'Genta Wijaya', 'Clarissa Angel',
    'Rahmat Hidayat', 'Sabrina Larasati', 'Wahyu Wicaksono', 'Tiara Puspita',
    'Bima Sakti', 'Fitri Handayani', 'Kevin Sanjaya', 'Zahra Amelia',
  ];

  const now = new Date();
  const patients = patientNames.map((name, idx) => {
    const pad = String(idx + 1).padStart(2, '0');
    return {
      id: `33333333-3333-3333-3333-3333333333${pad}`,
      name,
      whatsapp_normalized: `0812345678${pad}`,
      birth_date: `199${(idx % 10)}-${String((idx % 12) + 1).padStart(2, '0')}-15`,
      demo_consent_at: new Date(now.getTime() - (idx + 1) * 86400000).toISOString(),
      created_at: new Date(now.getTime() - (idx + 1) * 86400000).toISOString(),
    };
  });

  const { error: patErr } = await supabase.from('patients').insert(patients);
  if (patErr) throw new Error(`Gagal seed pasien: ${patErr.message}`);

  // 5. Patient treatments
  const patientTreatments = [
    {
      id: '44444444-4444-4444-4444-444444444401',
      patient_id: patients[0].id,
      treatment_id: treatments[2].id, // Behel Metal
      doctor_id: doctors[0].id,
      started_at: new Date(now.getTime() - 45 * 86400000).toISOString(),
      next_follow_up_at: new Date(now.getTime() - 5 * 86400000).toISOString(), // Overdue 5 days
      status: 'aktif',
    },
    {
      id: '44444444-4444-4444-4444-444444444402',
      patient_id: patients[3].id,
      treatment_id: treatments[3].id, // Behel Sapphire
      doctor_id: doctors[0].id,
      started_at: new Date(now.getTime() - 40 * 86400000).toISOString(),
      next_follow_up_at: new Date(now.getTime() - 2 * 86400000).toISOString(), // Overdue 2 days
      status: 'aktif',
    },
    {
      id: '44444444-4444-4444-4444-444444444403',
      patient_id: patients[5].id,
      treatment_id: treatments[4].id, // Clear Aligner
      doctor_id: doctors[0].id,
      started_at: new Date(now.getTime() - 42 * 86400000).toISOString(),
      next_follow_up_at: new Date(now.getTime() + 2 * 86400000).toISOString(), // In 2 days
      status: 'aktif',
    },
    {
      id: '44444444-4444-4444-4444-444444444404',
      patient_id: patients[7].id,
      treatment_id: treatments[2].id,
      doctor_id: doctors[0].id,
      started_at: new Date(now.getTime() - 28 * 86400000).toISOString(),
      next_follow_up_at: new Date(now.getTime() + 3 * 86400000).toISOString(), // In 3 days
      status: 'aktif',
    },
  ];

  await supabase.from('patient_treatments').insert(patientTreatments);

  // 6. Reminders
  const reminders = [
    {
      id: '66666666-6666-6666-6666-666666666601',
      appointment_id: null,
      patient_treatment_id: patientTreatments[0].id,
      type: 'kontrol',
      message_preview: `Halo Kak ${patients[0].name}, sudah waktunya kontrol berkala Behel Metal (terlambat 5 hari). Silakan jadwalkan kunjungan Anda kembali melalui website kami. (Demo Portfolio)`,
      scheduled_at: new Date(now.getTime() - 86400000).toISOString(),
      status: 'antre',
    },
    {
      id: '66666666-6666-6666-6666-666666666602',
      appointment_id: null,
      patient_treatment_id: patientTreatments[2].id,
      type: 'kontrol',
      message_preview: `Halo Kak ${patients[5].name}, mengingatkan jadwal kontrol Clear Aligner dalam 2 hari ke depan bersama Drg. Sarah Wijaya. (Demo Portfolio)`,
      scheduled_at: new Date(now.getTime() + 86400000).toISOString(),
      status: 'antre',
    },
  ];

  await supabase.from('reminders').insert(reminders);

  return { success: true, message: 'Data demo berhasil direset' };
}
