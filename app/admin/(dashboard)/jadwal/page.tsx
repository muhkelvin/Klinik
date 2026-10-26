import { connection } from 'next/server';
import { getAppointments, getDoctors, getTreatments, getPatients } from '@/lib/db';
import { JadwalView } from '@/components/admin/jadwal-view';

export const metadata = {
  title: 'Jadwal & Status Appointment — Aruna Dental Studio',
};

export default async function AdminJadwalPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; doctorId?: string; status?: string }>;
}) {
  await connection();
  const { date = '', doctorId = 'all', status = 'all' } = await searchParams;

  const [appointments, doctors, treatments, patients] = await Promise.all([
    getAppointments({ date: date || undefined, doctorId, status }),
    getDoctors(false),
    getTreatments(false),
    getPatients(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#202522]">
          Jadwal & Manajemen Status Appointment
        </h1>
        <p className="text-xs text-[#6B7870] mt-0.5">
          Pantau seluruh reservasi, ubah status kehadiran (konfirmasi, datang, no-show, selesai), atau jadwalkan ulang.
        </p>
      </div>

      <JadwalView
        initialAppointments={appointments}
        doctors={doctors}
        treatments={treatments}
        patients={patients}
        selectedDate={date}
        selectedDoctorId={doctorId}
        selectedStatus={status}
      />
    </div>
  );
}
