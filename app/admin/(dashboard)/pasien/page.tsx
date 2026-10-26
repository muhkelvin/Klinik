import { connection } from 'next/server';
import { getPatients } from '@/lib/db';
import { PasienView } from '@/components/admin/pasien-view';

export const metadata = {
  title: 'Data Pasien — Aruna Dental Studio',
};

export default async function AdminPasienPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await connection();
  const { q = '' } = await searchParams;
  const patients = await getPatients(q);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#202522]">
          Data Pasien Demo
        </h1>
        <p className="text-xs text-[#6B7870] mt-0.5">
          Kelola data calon pasien dan riwayat kunjungan. Seluruh data bersifat fiktif untuk demo portfolio.
        </p>
      </div>

      <PasienView initialPatients={patients} initialSearch={q} />
    </div>
  );
}
