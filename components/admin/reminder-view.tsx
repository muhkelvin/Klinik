'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { BellRing, Send, CheckCircle2, XCircle, Clock, ShieldAlert } from 'lucide-react';
import { updateReminderStatusAction } from '@/actions/admin';
import { formatWIB } from '@/lib/utils';
import type { Reminder, ReminderStatus } from '@/types/database';

export function ReminderView({ reminders }: { reminders: Reminder[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSimulateSend(id: string, targetStatus: ReminderStatus) {
    startTransition(async () => {
      const res = await updateReminderStatusAction(id, targetStatus);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(`Status pengingat berhasil disimulasikan: ${targetStatus.replace('_', ' ')}`);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="p-4 bg-[#F8F5EE] rounded-xl border border-[#DFD7C7] flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
        <div className="text-xs text-[#54625A] space-y-1">
          <strong className="text-[#202522]">Layanan Pengingat Otomatis WhatsApp:</strong>
          <p className="leading-relaxed">
            Antrean pengiriman pesan WhatsApp untuk konfirmasi H-1 janji temu dan notifikasi jadwal kontrol berkala pasien. Staf dapat memantau status terkirim dan membatalkan antrean jika diperlukan.
          </p>
        </div>
      </div>

      {/* Reminder Cards / Table */}
      <div className="bg-white rounded-xl border border-[#E3DDD1] shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#EAE4D9]">
          <h2 className="font-serif text-base font-semibold text-[#202522]">
            Antrean Reminder Pesan ({reminders.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#202522]">
            <thead className="bg-[#FAF8F5] text-[#6F7A72] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EAE4D9]">
              <tr>
                <th className="px-5 py-3">Jenis Pengingat</th>
                <th className="px-5 py-3">Pratinjau Pesan WhatsApp</th>
                <th className="px-5 py-3">Jadwal Kirim</th>
                <th className="px-5 py-3">Status Simulasi</th>
                <th className="px-5 py-3 text-right">Aksi Simulasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9]">
              {reminders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-xs text-[#8E9B93]">
                    Belum ada antrean reminder simulasi.
                  </td>
                </tr>
              ) : (
                reminders.map((rem) => (
                  <tr key={rem.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          rem.type === 'h_minus_1'
                            ? 'bg-[#EBF5FB] text-[#1B4F72]'
                            : 'bg-[#FFF7E8] text-[#B47514]'
                        }`}
                      >
                        {rem.type === 'h_minus_1' ? 'H-1 Kunjungan' : 'Kontrol Berkala'}
                      </span>
                    </td>

                    <td className="px-5 py-4 max-w-md">
                      <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#EAE4D9] text-[#202522] text-[11px] font-mono leading-relaxed">
                        {rem.message_preview}
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-[#6F7A72] tabular-nums">
                      {formatWIB(rem.scheduled_at, 'datetime')}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                          rem.status === 'terkirim_simulasi'
                            ? 'bg-[#E8F0EC] text-[#1D4333]'
                            : rem.status === 'antre'
                            ? 'bg-[#FFF7E8] text-[#B47514]'
                            : rem.status === 'dibatalkan'
                            ? 'bg-[#F2F4F4] text-[#5D6D7E]'
                            : 'bg-[#FBEAE6] text-[#B43B22]'
                        }`}
                      >
                        {rem.status === 'terkirim_simulasi' && <CheckCircle2 className="w-3 h-3" />}
                        {rem.status === 'antre' && <Clock className="w-3 h-3" />}
                        {rem.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {rem.status === 'antre' && (
                          <button
                            onClick={() => handleSimulateSend(rem.id, 'terkirim_simulasi')}
                            disabled={isPending}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-md transition-colors shadow-2xs"
                            title="Tandai simulasi pesan terkirim"
                          >
                            <Send className="w-3 h-3" />
                            <span>Simulasikan Kirim</span>
                          </button>
                        )}

                        {rem.status !== 'dibatalkan' && (
                          <button
                            onClick={() => handleSimulateSend(rem.id, 'dibatalkan')}
                            disabled={isPending}
                            className="px-2 py-1 text-xs font-medium text-[#6F7A72] hover:text-[#9B1C1C] hover:bg-[#FBEAE6] rounded-md transition-colors"
                            title="Batalkan reminder"
                          >
                            Batalkan
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
