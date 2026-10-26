import { connection } from 'next/server';
import { getDoctors } from '@/lib/db';
import { DokterView } from '@/components/admin/dokter-view';

export const metadata = {
  title: 'Kelola Dokter — Aruna Dental Studio',
};

export default async function AdminDokterPage() {
  await connection();
  const doctors = await getDoctors(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#202522]">
          Data Dokter Praktik
        </h1>
        <p className="text-xs text-[#6B7870] mt-0.5">
          Kelola profil tenaga medis, spesialisasi, dan jadwal praktik aktif dokter di klinik.
        </p>
      </div>

      <DokterView initialDoctors={doctors} />
    </div>
  );
}
