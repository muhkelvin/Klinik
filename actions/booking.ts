'use server';

import { revalidatePath } from 'next/cache';
import {
  getPatients,
  createPatient,
  getDoctors,
  getTreatments,
  checkSlotConflict,
  createAppointment,
} from '@/lib/db';
import { normalizeWhatsApp, isValidIndonesianPhone } from '@/lib/utils';

export interface BookingSubmissionState {
  success?: boolean;
  error?: string;
  bookingSummary?: {
    patientName: string;
    doctorName: string;
    treatmentName: string;
    startsAt: string;
    endsAt: string;
    source: string;
  };
}

export async function submitPublicBooking(
  prevState: BookingSubmissionState | null,
  formData: FormData
): Promise<BookingSubmissionState> {
  const treatmentId = formData.get('treatment_id') as string;
  let doctorId = formData.get('doctor_id') as string;
  const slotDate = formData.get('slot_date') as string;
  const slotTime = formData.get('slot_time') as string;
  const name = formData.get('name') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const notes = (formData.get('notes') as string) || '';
  const demoConsent = formData.get('demo_consent') === 'on' || formData.get('demo_consent') === 'true';
  const source = (formData.get('source') as string) || 'website';

  // 1. Validation
  if (!treatmentId || !slotDate || !slotTime || !name?.trim() || !whatsapp?.trim()) {
    return { error: 'Mohon lengkapi seluruh kolom formulir booking yang wajib diisi.' };
  }

  if (!demoConsent) {
    return { error: 'Anda harus menyetujui penggunaan data fiktif untuk keperluan demo.' };
  }

  if (!isValidIndonesianPhone(whatsapp)) {
    return { error: 'Format nomor WhatsApp tidak valid. Masukkan nomor yang wajar (contoh: 081234567890).' };
  }

  const normalizedPhone = normalizeWhatsApp(whatsapp);

  // 2. Fetch doctors & treatments
  const treatments = await getTreatments(false);
  const selectedTreatment = treatments.find(t => t.id === treatmentId);
  if (!selectedTreatment) {
    return { error: 'Treatment yang dipilih tidak valid atau sudah tidak aktif.' };
  }

  const doctors = await getDoctors(false);
  if (doctors.length === 0) {
    return { error: 'Saat ini belum ada dokter yang aktif menerima jadwal.' };
  }

  // Handle "any doctor" option
  if (!doctorId || doctorId === 'any') {
    // Pick the first active doctor who doesn't have a conflict
    const startsAtCandidate = `${slotDate}T${slotTime}:00+07:00`;
    const duration = selectedTreatment.duration_minutes || 45;
    const endsAtCandidate = new Date(new Date(startsAtCandidate).getTime() + duration * 60000).toISOString();

    let assignedDoc = null;
    for (const doc of doctors) {
      const hasConflict = await checkSlotConflict(doc.id, startsAtCandidate, endsAtCandidate);
      if (!hasConflict) {
        assignedDoc = doc;
        break;
      }
    }

    if (!assignedDoc) {
      return { error: 'Maaf, semua dokter sudah memiliki jadwal pada slot waktu yang Anda pilih. Silakan pilih jam lain.' };
    }
    doctorId = assignedDoc.id;
  }

  const selectedDoctor = doctors.find(d => d.id === doctorId);
  if (!selectedDoctor) {
    return { error: 'Dokter yang dipilih tidak ditemukan.' };
  }

  // Calculate starts_at and ends_at in ISO format
  const startsAt = `${slotDate}T${slotTime}:00+07:00`;
  const durationMinutes = selectedTreatment.duration_minutes || 45;
  const endsAt = new Date(new Date(startsAt).getTime() + durationMinutes * 60000).toISOString();

  // 3. Server-side overlap verification
  const hasConflict = await checkSlotConflict(doctorId, startsAt, endsAt);
  if (hasConflict) {
    return {
      error: `Dokter ${selectedDoctor.name} sudah memiliki janji temu pada slot waktu tersebut. Silakan pilih jam atau hari lain.`,
    };
  }

  try {
    // 4. Find or create patient by normalized phone
    const existingPatients = await getPatients(normalizedPhone);
    let patient = existingPatients.find(p => p.whatsapp_normalized === normalizedPhone);

    if (!patient) {
      patient = await createPatient({
        name: name.trim(),
        whatsapp_normalized: normalizedPhone,
        birth_date: null,
      });
    }

    // 5. Create Appointment
    await createAppointment({
      patient_id: patient.id,
      doctor_id: doctorId,
      treatment_id: treatmentId,
      starts_at: startsAt,
      ends_at: endsAt,
      source: source,
      notes: notes.slice(0, 300), // Limit notes length
    });

    revalidatePath('/admin');
    revalidatePath('/admin/jadwal');

    return {
      success: true,
      bookingSummary: {
        patientName: patient.name,
        doctorName: selectedDoctor.name,
        treatmentName: selectedTreatment.name,
        startsAt,
        endsAt,
        source,
      },
    };
  } catch (err: any) {
    return { error: err.message || 'Terjadi kesalahan sistem saat memproses booking Anda.' };
  }
}
