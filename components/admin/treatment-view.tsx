'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Edit2, Power, Sparkles, Clock, CalendarClock } from 'lucide-react';
import {
  createTreatmentAction,
  updateTreatmentAction,
  toggleTreatmentActiveAction,
} from '@/actions/admin';
import type { Treatment } from '@/types/database';

export function TreatmentView({ initialTreatments }: { initialTreatments: Treatment[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editTreatment, setEditTreatment] = useState<Treatment | null>(null);

  function handleToggleActive(id: string, currentActive: boolean) {
    startTransition(async () => {
      const res = await toggleTreatmentActiveAction(id, currentActive);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(`Treatment berhasil di-${currentActive ? 'nonaktifkan' : 'aktifkan'}!`);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#6F7A72]">
          Treatment aktif akan tampil pada opsi formulir booking website publik dan admin.
        </p>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Treatment Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {initialTreatments.map((trt) => (
          <div
            key={trt.id}
            className={`bg-white rounded-xl border p-5 shadow-2xs flex flex-col justify-between transition-all ${
              trt.is_active ? 'border-[#E3DDD1]' : 'border-[#E0DCD4] opacity-65 bg-[#FAF9F6]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF8F5] text-[#6F7A72] border border-[#EAE4D9]">
                  {trt.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                    trt.is_active
                      ? 'bg-[#E8F0EC] text-[#1D4333]'
                      : 'bg-[#F2F4F4] text-[#5D6D7E]'
                  }`}
                >
                  {trt.is_active ? 'Tersedia' : 'Nonaktif'}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-base font-bold text-[#202522]">
                  {trt.name}
                </h3>
                <p className="text-xs font-medium text-[#C85A32] mt-1">
                  {trt.price_range_label}
                </p>
              </div>

              <div className="pt-2 text-xs text-[#6F7A72] space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#8E9B93]" />
                  <span>Estimasi Durasi: <strong>{trt.duration_minutes} Menit</strong></span>
                </div>
                {trt.requires_follow_up && (
                  <div className="flex items-center gap-1.5 text-[#2A4A3E]">
                    <CalendarClock className="w-3.5 h-3.5" />
                    <span>Kontrol Berkala tiap {trt.follow_up_interval_days} Hari</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#EAE4D9] mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditTreatment(trt)}
                className="px-2.5 py-1 text-xs font-medium text-[#4A554F] hover:text-[#202522] bg-[#FAF8F5] border border-[#D5CDC0] rounded-md hover:bg-[#EAE4D9] transition-colors"
              >
                <Edit2 className="w-3 h-3 inline mr-1" />
                Edit
              </button>

              <button
                onClick={() => handleToggleActive(trt.id, trt.is_active)}
                disabled={isPending}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  trt.is_active
                    ? 'text-[#9B1C1C] hover:bg-[#FDF2F2] border border-[#F8B4B4]'
                    : 'text-[#1D4333] hover:bg-[#E8F0EC] border border-[#BDE0CE]'
                }`}
              >
                <Power className="w-3 h-3 inline mr-1" />
                {trt.is_active ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Treatment Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Tambah Treatment Baru
            </h3>

            <form
              action={async (formData) => {
                const res = await createTreatmentAction(formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success('Treatment baru berhasil ditambahkan!');
                  setIsNewModalOpen(false);
                  router.refresh();
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-medium text-[#374151] mb-1">Nama Layanan</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Bleaching Gigi Estetik"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Kategori</label>
                  <input
                    type="text"
                    name="category"
                    required
                    placeholder="Contoh: Estetik"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    name="duration_minutes"
                    required
                    defaultValue={45}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Label Estimasi Biaya (Demo)</label>
                <input
                  type="text"
                  name="price_range_label"
                  required
                  placeholder="Contoh: Rp 1.500.000 - Rp 2.500.000"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE4D9] space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="requires_follow_up"
                    name="requires_follow_up"
                    value="true"
                    className="rounded text-[#C85A32]"
                  />
                  <label htmlFor="requires_follow_up" className="text-xs font-medium text-[#202522]">
                    Memerlukan Kontrol Rutin
                  </label>
                </div>
                <div>
                  <label className="block text-[11px] text-[#6F7A72] mb-1">Interval Kontrol (Hari)</label>
                  <input
                    type="number"
                    name="follow_up_interval_days"
                    defaultValue={30}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D5CDC0] rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-3.5 py-2 text-[#616D65] hover:bg-[#FAF8F5] rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C85A32] hover:bg-[#B44E28] text-white rounded-lg font-medium"
                >
                  Simpan Treatment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Treatment Modal */}
      {editTreatment && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Edit Data Treatment
            </h3>

            <form
              action={async (formData) => {
                const res = await updateTreatmentAction(editTreatment.id, formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success('Data treatment berhasil diperbarui!');
                  setEditTreatment(null);
                  router.refresh();
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-medium text-[#374151] mb-1">Nama Layanan</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editTreatment.name}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Kategori</label>
                  <input
                    type="text"
                    name="category"
                    required
                    defaultValue={editTreatment.category}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    name="duration_minutes"
                    required
                    defaultValue={editTreatment.duration_minutes}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Label Estimasi Biaya</label>
                <input
                  type="text"
                  name="price_range_label"
                  required
                  defaultValue={editTreatment.price_range_label}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE4D9] space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit_requires_follow_up"
                    name="requires_follow_up"
                    value="true"
                    defaultChecked={editTreatment.requires_follow_up}
                    className="rounded text-[#C85A32]"
                  />
                  <label htmlFor="edit_requires_follow_up" className="text-xs font-medium text-[#202522]">
                    Memerlukan Kontrol Rutin
                  </label>
                </div>
                <div>
                  <label className="block text-[11px] text-[#6F7A72] mb-1">Interval Kontrol (Hari)</label>
                  <input
                    type="number"
                    name="follow_up_interval_days"
                    defaultValue={editTreatment.follow_up_interval_days || 30}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D5CDC0] rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setEditTreatment(null)}
                  className="px-3.5 py-2 text-[#616D65] hover:bg-[#FAF8F5] rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C85A32] hover:bg-[#B44E28] text-white rounded-lg font-medium"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
