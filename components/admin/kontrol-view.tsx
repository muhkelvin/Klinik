'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ClockAlert, CalendarPlus, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createAppointmentAction } from '@/actions/admin';
import { formatWIB } from '@/lib/utils';
import type { PatientTreatment, Doctor, Treatment } from '@/types/database';

interface KontrolViewProps {
  patientTreatments: PatientTreatment[];
  doctors: Doctor[];
  treatments: Treatment[];
}

export function KontrolView({ patientTreatments, doctors, treatments }: KontrolViewProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'overdue' | 'due'>('all');
  const [bookingTarget, setBookingTarget] = useState<PatientTreatment | null>(null);

  const now = new Date();

  const filteredList = patientTreatments.filter((pt) => {
    if (!pt.next_follow_up_at) return false;
    const followUpDate = new Date(pt.next_follow_up_at);
    if (filter === 'overdue') {
      return followUpDate < now;
    }
    if (filter === 'due') {
      const next7Days = new Date(now.getTime() + 7 * 86400000);
      return followUpDate >= now && followUpDate <= next7Days;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E3DDD1] pb-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-[#202522] text-white'
              : 'text-[#6F7A72] hover:bg-[#EAE4D9]'
          }`}
        >
          Semua Pasien Kontrol ({patientTreatments.length})
        </button>

        <button
          onClick={() => setFilter('overdue')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            filter === 'overdue'
              ? 'bg-[#B43B22] text-white'
              : 'text-[#B43B22] hover:bg-[#FBEAE6]'
          }`}
        >
          Terlambat / Overdue
        </button>

        <button
          onClick={() => setFilter('due')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            filter === 'due'
              ? 'bg-[#B47514] text-white'
              : 'text-[#B47514] hover:bg-[#FFF7E8]'
          }`}
        >
          Jatuh Tempo 7 Hari ke Depan
        </button>
      </div>

      {/* Kontrol List */}
      <div className="bg-white rounded-xl border border-[#E3DDD1] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#202522]">
            <thead className="bg-[#FAF8F5] text-[#6F7A72] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EAE4D9]">
              <tr>
                <th className="px-5 py-3">Nama Pasien</th>
                <th className="px-5 py-3">Treatment Aktif</th>
                <th className="px-5 py-3">Dokter Penanggung Jawab</th>
                <th className="px-5 py-3">Jadwal Kontrol Terencana</th>
                <th className="px-5 py-3">Status Kontrol</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9]">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-xs text-[#8E9B93]">
                    Tidak ada pasien dalam kategori kontrol ini.
                  </td>
                </tr>
              ) : (
                filteredList.map((pt) => {
                  const isOverdue = pt.next_follow_up_at && new Date(pt.next_follow_up_at) < now;
                  return (
                    <tr key={pt.id} className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="px-5 py-3.5 font-medium whitespace-nowrap">
                        <div className="text-[#202522]">{pt.patient?.name}</div>
                        <div className="text-[10px] text-[#7A867E]">
                          WA: {pt.patient?.whatsapp_normalized}
                        </div>
                      </td>

                      <td className="px-5 py-3.5 font-medium text-[#202522] whitespace-nowrap">
                        {pt.treatment?.name}
                      </td>

                      <td className="px-5 py-3.5 text-[#4A554F] whitespace-nowrap">
                        {pt.doctor?.name || '-'}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap tabular-nums">
                        {pt.next_follow_up_at ? formatWIB(pt.next_follow_up_at, 'date') : '-'}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        {isOverdue ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FBEAE6] text-[#B43B22]">
                            <AlertCircle className="w-3 h-3" />
                            <span>Terlambat Kontrol</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFF7E8] text-[#B47514]">
                            <ClockAlert className="w-3 h-3" />
                            <span>Mendekati Jadwal</span>
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => setBookingTarget(pt)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-lg transition-colors shadow-2xs"
                        >
                          <CalendarPlus className="w-3.5 h-3.5" />
                          <span>Buat Booking Kontrol</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Kontrol Modal */}
      {bookingTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Buat Janji Temu Kontrol Pasien
            </h3>
            <p className="text-xs text-[#6F7A72]">
              Pasien: <strong>{bookingTarget.patient?.name}</strong> — {bookingTarget.treatment?.name}
            </p>

            <form
              action={async (formData) => {
                const res = await createAppointmentAction(formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success('Jadwal kunjungan kontrol berhasil dibuat!');
                  setBookingTarget(null);
                  router.push('/admin/jadwal');
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <input type="hidden" name="patient_id" value={bookingTarget.patient_id} />
              <input type="hidden" name="treatment_id" value={bookingTarget.treatment_id} />
              <input type="hidden" name="doctor_id" value={bookingTarget.doctor_id} />

              <div>
                <label className="block font-medium text-[#374151] mb-1">Dokter</label>
                <div className="px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg text-[#202522] font-medium">
                  {bookingTarget.doctor?.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Waktu Mulai</label>
                  <input
                    type="datetime-local"
                    name="starts_at"
                    required
                    defaultValue={new Date().toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Waktu Selesai</label>
                  <input
                    type="datetime-local"
                    name="ends_at"
                    required
                    defaultValue={new Date(Date.now() + 30 * 60000).toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Catatan</label>
                <textarea
                  name="notes"
                  rows={2}
                  defaultValue="Kontrol rutin evaluasi behel / perawatan gigi."
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setBookingTarget(null)}
                  className="px-3.5 py-2 text-[#616D65] hover:bg-[#FAF8F5] rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C85A32] hover:bg-[#B44E28] text-white rounded-lg font-medium"
                >
                  Jadwalkan Kunjungan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
