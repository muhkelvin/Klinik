export type AppointmentStatus =
  | 'dijadwalkan'
  | 'dikonfirmasi'
  | 'datang'
  | 'tidak_datang'
  | 'batal'
  | 'selesai';

export type ReminderType = 'h_minus_1' | 'kontrol';

export type ReminderStatus =
  | 'antre'
  | 'terkirim_simulasi'
  | 'gagal_simulasi'
  | 'dibatalkan';

export type PatientTreatmentStatus = 'aktif' | 'selesai' | 'dibatalkan';

export interface DoctorScheduleItem {
  day: string;
  start: string;
  end: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  schedule: DoctorScheduleItem[];
  is_active: boolean;
  created_at: string;
}

export interface Treatment {
  id: string;
  name: string;
  duration_minutes: number;
  category: string;
  requires_follow_up: boolean;
  follow_up_interval_days: number;
  price_range_label: string;
  is_active: boolean;
  created_at: string;
}

export interface Patient {
  id: string;
  name: string;
  whatsapp_normalized: string;
  birth_date: string | null;
  demo_consent_at: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  treatment_id: string;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  source: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined relation fields
  patient?: Patient;
  doctor?: Doctor;
  treatment?: Treatment;
}

export interface AppointmentStatusLog {
  id: string;
  appointment_id: string;
  from_status: string | null;
  to_status: string;
  actor_label: string;
  created_at: string;
}

export interface PatientTreatment {
  id: string;
  patient_id: string;
  treatment_id: string;
  doctor_id: string;
  started_at: string;
  next_follow_up_at: string | null;
  status: PatientTreatmentStatus;
  created_at: string;
  // Joined relations
  patient?: Patient;
  treatment?: Treatment;
  doctor?: Doctor;
}

export interface Reminder {
  id: string;
  appointment_id: string | null;
  patient_treatment_id: string | null;
  type: ReminderType;
  message_preview: string;
  scheduled_at: string;
  status: ReminderStatus;
  created_at: string;
  // Joined relations
  appointment?: Appointment;
  patient_treatment?: PatientTreatment;
}
