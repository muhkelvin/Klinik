'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Calendar, User, Stethoscope, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import { formatWIB } from '@/lib/utils';

interface BookingSummaryData {
  patientName: string;
  doctorName: string;
  treatmentName: string;
  startsAt: string;
  endsAt: string;
  source: string;
}

export function BookingSuccessView() {
  const [summary, setSummary] = useState<BookingSummaryData | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('last_demo_booking');
      if (stored) {
        setSummary(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E3DDD1] shadow-xs text-center space-y-6 max-w-xl mx-auto">
      <div className="w-16 h-16 rounded-full bg-[#E8F0EC] text-[#1D4333] flex items-center justify-center mx-auto shadow-2xs">
        <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
          Permintaan Booking Berhasil Terdaftar!
        </h1>
        <p className="text-xs sm:text-sm text-[#616E65] leading-relaxed">
          Data kunjungan telah masuk ke sistem kami dan sedang diproses oleh staf resepsionis Aruna Dental Studio.
        </p>
      </div>

      {/* Booking Details Card */}
      {summary ? (
        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] text-left text-xs space-y-2.5">
          <div className="flex justify-between border-b border-[#E3DDD1] pb-2">
            <span className="text-[#6F7A72]">Nama Pasien:</span>
            <strong className="text-[#202522]">{summary.patientName}</strong>
          </div>
          <div className="flex justify-between border-b border-[#E3DDD1] pb-2">
            <span className="text-[#6F7A72]">Layanan Perawatan:</span>
            <strong className="text-[#202522]">{summary.treatmentName}</strong>
          </div>
          <div className="flex justify-between border-b border-[#E3DDD1] pb-2">
            <span className="text-[#6F7A72]">Dokter Spesialis:</span>
            <strong className="text-[#202522]">{summary.doctorName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6F7A72]">Waktu Kunjungan:</span>
            <strong className="text-[#C85A32] tabular-nums">
              {formatWIB(summary.startsAt, 'datetime')}
            </strong>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] text-xs text-[#6F7A72]">
          Jadwal reservasi Anda telah berhasil terdaftar pada sistem klinik.
        </div>
      )}

      {/* Next Step Info */}
      <div className="p-3.5 bg-[#F8F5EE] rounded-xl border border-[#DFD7C7] text-left flex items-start gap-2.5 text-xs text-[#54625A]">
        <Sparkles className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
        <div className="leading-relaxed text-[11px]">
          <strong>Langkah Selanjutnya:</strong> Staf resepsionis kami akan mengirimkan konfirmasi jadwal dan panduan persiapan kedatangan melalui pesan WhatsApp ke nomor yang Anda daftarkan.
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-xl transition-colors shadow-2xs"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/admin/jadwal"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-medium text-[#202522] bg-[#FAF8F5] border border-[#DFD8C9] hover:bg-[#EAE4D9] rounded-xl transition-colors"
        >
          <span>Portal Kelola Jadwal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
