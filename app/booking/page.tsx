import { connection } from 'next/server';
import { getDoctors, getTreatments } from '@/lib/db';
import { PublicNavbar } from '@/components/public/navbar';
import { PublicFooter } from '@/components/public/footer';
import { BookingForm } from '@/components/public/booking-form';
import { FloatingWhatsApp } from '@/components/public/floating-whatsapp';
import { ShieldCheck, Sparkles, Clock, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Reservasi Janji Temu — Aruna Dental Studio',
  description: 'Pilih layanan perawatan gigi, dokter spesialis, dan waktu kunjungan Anda. Konfirmasi jadwal instan & reminder WhatsApp.',
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ treatment?: string; source?: string }>;
}) {
  await connection();
  const { treatment = '', source = 'website' } = await searchParams;

  const [doctors, treatments] = await Promise.all([
    getDoctors(false),
    getTreatments(false),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <PublicNavbar />

      <main className="flex-1 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F0EC] text-[#1D4333] border border-[#C6DDD1]">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Permintaan Janji Temu Online</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
              Jadwalkan Konsultasi Perawatan Gigi Anda
            </h1>
            <p className="text-xs sm:text-sm text-[#616E65] max-w-xl mx-auto leading-relaxed">
              Pilih perawatan yang Anda butuhkan, dokter spesialis, serta slot waktu yang nyaman. Permintaan Anda akan segera tercatat di sistem klinik.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E3DDD1] shadow-xs">
            <BookingForm
              doctors={doctors}
              treatments={treatments}
              defaultTreatmentId={treatment}
              source={source}
            />
          </div>
        </div>
      </main>

      <FloatingWhatsApp />
      <PublicFooter />
    </div>
  );
}
