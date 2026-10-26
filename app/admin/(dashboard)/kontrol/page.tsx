import { connection } from 'next/server';
import { getPatientTreatments, getDoctors, getTreatments } from '@/lib/db';
import { KontrolView } from '@/components/admin/kontrol-view';

export const metadata = {
  title: 'Kontrol & Tindak Lanjut Pasien — Aruna Dental Studio',
};

export default async function AdminKontrolPage() {
  await connection();
  const [patientTreatments, doctors, treatments] = await Promise.all([
    getPatientTreatments(),
    getDoctors(false),
    getTreatments(false),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#202522]">
          Jadwal Kontrol & Follow-Up Pasien
        </h1>
        <p className="text-xs text-[#6B7870] mt-0.5">
          Pantau pasien dengan perawatan aktif (behel, aligner, saluran akar) yang mendekati atau telah melewati tanggal kontrol berkala.
        </p>
      </div>

      <KontrolView
        patientTreatments={patientTreatments}
        doctors={doctors}
        treatments={treatments}
      />
    </div>
  );
}
