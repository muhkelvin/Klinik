import { connection } from 'next/server';
import { getTreatments } from '@/lib/db';
import { TreatmentView } from '@/components/admin/treatment-view';

export const metadata = {
  title: 'Kelola Treatment & Layanan — Aruna Dental Studio',
};

export default async function AdminTreatmentPage() {
  await connection();
  const treatments = await getTreatments(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#202522]">
          Katalog Treatment & Layanan Gigi
        </h1>
        <p className="text-xs text-[#6B7870] mt-0.5">
          Atur daftar perawatan, durasi slot booking, estimasi harga ilustrasi, dan interval kontrol rutin.
        </p>
      </div>

      <TreatmentView initialTreatments={treatments} />
    </div>
  );
}
