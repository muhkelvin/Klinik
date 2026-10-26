import { connection } from 'next/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPatientById } from '@/lib/db';
import { formatWIB } from '@/lib/utils';
import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  ClockAlert,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const metadata = {
  title: 'Detail Pasien — Aruna Dental Studio',
};

export default async function AdminPatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const data = await getPatientById(id);

  if (!data) {
    notFound();
  }

  const { patient, appointments, treatments } = data;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back button */}
      <Link
        href="/admin/pasien"
        className="inline-flex items-center gap-1.5 text-xs text-[#6F7A72] hover:text-[#202522] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Daftar Pasien</span>
      </Link>

      {/* Header Profile Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3DDD1] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F0EC] text-[#1D4333] flex items-center justify-center font-serif text-2xl font-bold">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#202522]">
                {patient.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6F7A72] mt-1">
                <span className="flex items-center gap-1 tabular-nums">
                  <Phone className="w-3.5 h-3.5 text-[#8E9B93]" />
                  <span>{patient.whatsapp_normalized}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8E9B93]" />
                  <span>Lahir: {patient.birth_date ? formatWIB(patient.birth_date, 'date') : '-'}</span>
                </span>
                <span className="text-[11px] bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#EAE4D9]">
                  Terdaftar: {formatWIB(patient.created_at, 'date')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Treatments & Next Follow-ups */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs">
            <h2 className="font-serif text-base font-semibold text-[#202522] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C85A32]" />
              <span>Program Perawatan Aktif</span>
            </h2>

            {treatments.length === 0 ? (
              <p className="text-xs text-[#8E9B93] py-2">
                Belum ada program perawatan jangka panjang aktif.
              </p>
            ) : (
              <div className="space-y-3">
                {treatments.map((pt) => (
                  <div key={pt.id} className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE4D9] text-xs">
                    <div className="font-semibold text-[#202522]">{pt.treatment?.name}</div>
                    <div className="text-[11px] text-[#6F7A72] mt-0.5">
                      Dokter: {pt.doctor?.name || '-'}
                    </div>
                    {pt.next_follow_up_at && (
                      <div className="mt-2 pt-2 border-t border-[#DFD8C9] flex items-center justify-between text-[11px]">
                        <span className="text-[#6F7A72]">Jadwal Kontrol:</span>
                        <span className="font-medium text-[#C85A32]">
                          {formatWIB(pt.next_follow_up_at, 'date')}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Appointment History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#E3DDD1] shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-[#EAE4D9]">
              <h2 className="font-serif text-base font-semibold text-[#202522]">
                Riwayat Kunjungan ({appointments.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#202522]">
                <thead className="bg-[#FAF8F5] text-[#6F7A72] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EAE4D9]">
                  <tr>
                    <th className="px-4 py-3">Waktu Kunjungan</th>
                    <th className="px-4 py-3">Dokter</th>
                    <th className="px-4 py-3">Treatment</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE4D9]">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-xs text-[#8E9B93]">
                        Belum ada riwayat appointment untuk pasien ini.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap font-medium tabular-nums">
                          {formatWIB(apt.starts_at, 'datetime')}
                        </td>
                        <td className="px-4 py-3 text-[#4A554F] whitespace-nowrap">
                          {apt.doctor?.name || '-'}
                        </td>
                        <td className="px-4 py-3 text-[#4A554F] whitespace-nowrap">
                          {apt.treatment?.name || '-'}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                              apt.status === 'selesai'
                                ? 'bg-[#E8F0EC] text-[#1D4333]'
                                : apt.status === 'tidak_datang'
                                ? 'bg-[#FBEAE6] text-[#B43B22]'
                                : apt.status === 'datang'
                                ? 'bg-[#EBF5FB] text-[#1B4F72]'
                                : apt.status === 'dikonfirmasi'
                                ? 'bg-[#E8F8F5] text-[#117A65]'
                                : apt.status === 'batal'
                                ? 'bg-[#F2F4F4] text-[#5D6D7E]'
                                : 'bg-[#F4ECF7] text-[#6C3483]'
                            }`}
                          >
                            {apt.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
