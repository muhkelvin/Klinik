'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  verifyAdminCredentials,
  setAdminSession,
  clearAdminSession,
  getAdminSession,
} from '@/lib/auth';
import {
  createDoctor,
  updateDoctor,
  createTreatment,
  updateTreatment,
  createPatient,
  updatePatient,
  deletePatient,
  createAppointment,
  updateAppointmentSchedule,
  updateAppointmentStatus,
  createPatientTreatment,
  updateReminderStatus,
  resetDatabaseToSeed,
} from '@/lib/db';
import { normalizeWhatsApp, isValidIndonesianPhone } from '@/lib/utils';
import type { AppointmentStatus, ReminderStatus } from '@/types/database';

async function requireAuth() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    throw new Error('Sesi tidak valid atau telah kedaluwarsa. Silakan login kembali.');
  }
}

// ------------------------------------------------------------------------------
// AUTH ACTIONS
// ------------------------------------------------------------------------------
export async function loginAdminAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi.' };
  }

  const isValid = await verifyAdminCredentials(email, password);
  if (!isValid) {
    return { error: 'Kredensial salah. Gunakan akun demo yang tersedia pada petunjuk.' };
  }

  await setAdminSession();
  redirect('/admin');
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

// ------------------------------------------------------------------------------
// DOCTORS CRUD
// ------------------------------------------------------------------------------
export async function createDoctorAction(formData: FormData) {
  await requireAuth();
  const name = formData.get('name') as string;
  const specialty = formData.get('specialty') as string;

  if (!name?.trim() || !specialty?.trim()) {
    return { error: 'Nama dan spesialisasi dokter wajib diisi.' };
  }

  try {
    await createDoctor({
      name: name.trim(),
      specialty: specialty.trim(),
      schedule: [
        { day: 'Senin - Jumat', start: '09:00', end: '17:00' },
        { day: 'Sabtu', start: '09:00', end: '15:00' },
      ],
      is_active: true,
    });
    revalidatePath('/admin');
    revalidatePath('/admin/dokter');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal menambahkan dokter.' };
  }
}

export async function updateDoctorAction(id: string, formData: FormData) {
  await requireAuth();
  const name = formData.get('name') as string;
  const specialty = formData.get('specialty') as string;

  if (!name?.trim() || !specialty?.trim()) {
    return { error: 'Nama dan spesialisasi dokter wajib diisi.' };
  }

  try {
    await updateDoctor(id, {
      name: name.trim(),
      specialty: specialty.trim(),
    });
    revalidatePath('/admin');
    revalidatePath('/admin/dokter');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal memperbarui data dokter.' };
  }
}

export async function toggleDoctorActiveAction(id: string, currentActive: boolean) {
  await requireAuth();
  try {
    await updateDoctor(id, { is_active: !currentActive });
    revalidatePath('/admin');
    revalidatePath('/admin/dokter');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal mengubah status dokter.' };
  }
}

// ------------------------------------------------------------------------------
// TREATMENTS CRUD
// ------------------------------------------------------------------------------
export async function createTreatmentAction(formData: FormData) {
  await requireAuth();
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const duration = parseInt(formData.get('duration_minutes') as string, 10) || 30;
  const priceRange = formData.get('price_range_label') as string;
  const requiresFollowUp = formData.get('requires_follow_up') === 'true';
  const followUpInterval = parseInt(formData.get('follow_up_interval_days') as string, 10) || 0;

  if (!name?.trim() || !category?.trim() || !priceRange?.trim()) {
    return { error: 'Nama, kategori, dan estimasi biaya wajib diisi.' };
  }

  try {
    await createTreatment({
      name: name.trim(),
      category: category.trim(),
      duration_minutes: duration,
      price_range_label: priceRange.trim(),
      requires_follow_up: requiresFollowUp,
      follow_up_interval_days: followUpInterval,
      is_active: true,
    });
    revalidatePath('/admin');
    revalidatePath('/admin/treatment');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal menambahkan treatment.' };
  }
}

export async function updateTreatmentAction(id: string, formData: FormData) {
  await requireAuth();
  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const duration = parseInt(formData.get('duration_minutes') as string, 10) || 30;
  const priceRange = formData.get('price_range_label') as string;
  const requiresFollowUp = formData.get('requires_follow_up') === 'true';
  const followUpInterval = parseInt(formData.get('follow_up_interval_days') as string, 10) || 0;

  try {
    await updateTreatment(id, {
      name: name.trim(),
      category: category.trim(),
      duration_minutes: duration,
      price_range_label: priceRange.trim(),
      requires_follow_up: requiresFollowUp,
      follow_up_interval_days: followUpInterval,
    });
    revalidatePath('/admin');
    revalidatePath('/admin/treatment');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal memperbarui treatment.' };
  }
}

export async function toggleTreatmentActiveAction(id: string, currentActive: boolean) {
  await requireAuth();
  try {
    await updateTreatment(id, { is_active: !currentActive });
    revalidatePath('/admin');
    revalidatePath('/admin/treatment');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal mengubah status treatment.' };
  }
}

// ------------------------------------------------------------------------------
// PATIENTS CRUD
// ------------------------------------------------------------------------------
export async function createPatientAction(formData: FormData) {
  await requireAuth();
  const name = formData.get('name') as string;
  const phone = formData.get('whatsapp') as string;
  const birthDate = formData.get('birth_date') as string;

  if (!name?.trim() || !phone?.trim()) {
    return { error: 'Nama dan nomor WhatsApp pasien wajib diisi.' };
  }

  if (!isValidIndonesianPhone(phone)) {
    return { error: 'Format nomor WhatsApp tidak valid. Gunakan format wajar seperti 0812xxxxxxxx.' };
  }

  try {
    const patient = await createPatient({
      name: name.trim(),
      whatsapp_normalized: normalizeWhatsApp(phone),
      birth_date: birthDate || null,
    });
    revalidatePath('/admin');
    revalidatePath('/admin/pasien');
    return { success: true, patient };
  } catch (err: any) {
    return { error: err.message || 'Gagal menambahkan pasien.' };
  }
}

export async function updatePatientAction(id: string, formData: FormData) {
  await requireAuth();
  const name = formData.get('name') as string;
  const phone = formData.get('whatsapp') as string;
  const birthDate = formData.get('birth_date') as string;

  if (!name?.trim() || !phone?.trim()) {
    return { error: 'Nama dan nomor WhatsApp pasien wajib diisi.' };
  }

  if (!isValidIndonesianPhone(phone)) {
    return { error: 'Format nomor WhatsApp tidak valid. Gunakan format wajar seperti 0812xxxxxxxx.' };
  }

  try {
    await updatePatient(id, {
      name: name.trim(),
      whatsapp_normalized: normalizeWhatsApp(phone),
      birth_date: birthDate || null,
    });
    revalidatePath('/admin');
    revalidatePath('/admin/pasien');
    revalidatePath(`/admin/pasien/${id}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal memperbarui data pasien.' };
  }
}

export async function deletePatientAction(id: string) {
  await requireAuth();
  try {
    const result = await deletePatient(id);
    revalidatePath('/admin');
    revalidatePath('/admin/pasien');
    return result;
  } catch (err: any) {
    return { error: err.message || 'Gagal menghapus pasien.' };
  }
}

// ------------------------------------------------------------------------------
// APPOINTMENTS CRUD & STATUS
// ------------------------------------------------------------------------------
export async function createAppointmentAction(formData: FormData) {
  await requireAuth();
  const patientId = formData.get('patient_id') as string;
  const doctorId = formData.get('doctor_id') as string;
  const treatmentId = formData.get('treatment_id') as string;
  const startsAt = formData.get('starts_at') as string;
  const endsAt = formData.get('ends_at') as string;
  const notes = formData.get('notes') as string;

  if (!patientId || !doctorId || !treatmentId || !startsAt || !endsAt) {
    return { error: 'Semua field wajib diisi.' };
  }

  try {
    const appointment = await createAppointment({
      patient_id: patientId,
      doctor_id: doctorId,
      treatment_id: treatmentId,
      starts_at: startsAt,
      ends_at: endsAt,
      source: 'admin',
      notes: notes || undefined,
    });
    revalidatePath('/admin');
    revalidatePath('/admin/jadwal');
    return { success: true, appointment };
  } catch (err: any) {
    return { error: err.message || 'Gagal membuat appointment.' };
  }
}

export async function updateAppointmentStatusAction(id: string, newStatus: AppointmentStatus) {
  await requireAuth();
  try {
    await updateAppointmentStatus(id, newStatus, 'Admin Demo');
    revalidatePath('/admin');
    revalidatePath('/admin/jadwal');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal memperbarui status appointment.' };
  }
}

export async function updateAppointmentScheduleAction(
  id: string,
  startsAt: string,
  endsAt: string,
  doctorId?: string
) {
  await requireAuth();
  try {
    await updateAppointmentSchedule(id, startsAt, endsAt, doctorId);
    revalidatePath('/admin');
    revalidatePath('/admin/jadwal');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal mengubah jadwal appointment.' };
  }
}

// ------------------------------------------------------------------------------
// PATIENT TREATMENT & KONTROL
// ------------------------------------------------------------------------------
export async function createPatientTreatmentAction(formData: FormData) {
  await requireAuth();
  const patientId = formData.get('patient_id') as string;
  const treatmentId = formData.get('treatment_id') as string;
  const doctorId = formData.get('doctor_id') as string;
  const nextFollowUpAt = formData.get('next_follow_up_at') as string;

  if (!patientId || !treatmentId || !doctorId || !nextFollowUpAt) {
    return { error: 'Lengkapi semua informasi pasien dan tanggal kontrol.' };
  }

  try {
    await createPatientTreatment({
      patient_id: patientId,
      treatment_id: treatmentId,
      doctor_id: doctorId,
      next_follow_up_at: nextFollowUpAt,
    });
    revalidatePath('/admin');
    revalidatePath('/admin/kontrol');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal menambahkan data kontrol pasien.' };
  }
}

// ------------------------------------------------------------------------------
// REMINDERS
// ------------------------------------------------------------------------------
export async function updateReminderStatusAction(id: string, status: ReminderStatus) {
  await requireAuth();
  try {
    await updateReminderStatus(id, status);
    revalidatePath('/admin');
    revalidatePath('/admin/reminder');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Gagal memperbarui status reminder simulasi.' };
  }
}

// ------------------------------------------------------------------------------
// RESET DEMO
// ------------------------------------------------------------------------------
export async function resetDemoAction() {
  await requireAuth();
  try {
    const res = await resetDatabaseToSeed();
    revalidatePath('/admin');
    revalidatePath('/admin/jadwal');
    revalidatePath('/admin/pasien');
    revalidatePath('/admin/kontrol');
    revalidatePath('/admin/reminder');
    return res;
  } catch (err: any) {
    return { error: err.message || 'Gagal mereset data demo.' };
  }
}
