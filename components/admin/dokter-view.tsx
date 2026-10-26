'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, Edit2, Power, UserCheck, Stethoscope } from 'lucide-react';
import { createDoctorAction, updateDoctorAction, toggleDoctorActiveAction } from '@/actions/admin';
import type { Doctor } from '@/types/database';

export function DokterView({ initialDoctors }: { initialDoctors: Doctor[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState<Doctor | null>(null);

  function handleToggleActive(id: string, currentActive: boolean) {
    startTransition(async () => {
      const res = await toggleDoctorActiveAction(id, currentActive);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(`Dokter berhasil di-${currentActive ? 'nonaktifkan' : 'aktifkan'}!`);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#6F7A72]">
          Dokter yang telah memiliki riwayat appointment tidak dihapus permanen, melainkan dinonaktifkan.
        </p>
        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Dokter Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {initialDoctors.map((doc) => (
          <div
            key={doc.id}
            className={`bg-white rounded-xl border p-5 shadow-2xs space-y-4 transition-all ${
              doc.is_active ? 'border-[#E3DDD1]' : 'border-[#E0DCD4] opacity-65 bg-[#FAF9F6]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] text-[#1D4333] flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-[#C85A32]" />
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                  doc.is_active
                    ? 'bg-[#E8F0EC] text-[#1D4333]'
                    : 'bg-[#F2F4F4] text-[#5D6D7E]'
                }`}
              >
                {doc.is_active ? 'Praktik Aktif' : 'Nonaktif'}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-base font-bold text-[#202522]">
                {doc.name}
              </h3>
              <p className="text-xs text-[#6F7A72] mt-0.5">{doc.specialty}</p>
            </div>

            {/* Schedules */}
            <div className="pt-3 border-t border-[#EAE4D9] space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8E9B93]">
                Jadwal Praktik:
              </span>
              <div className="text-[11px] text-[#4A554F] space-y-0.5">
                {Array.isArray(doc.schedule) && doc.schedule.length > 0 ? (
                  doc.schedule.map((s, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{s.day}</span>
                      <span className="font-medium tabular-nums">{s.start} - {s.end}</span>
                    </div>
                  ))
                ) : (
                  <div>Senin - Sabtu: 09:00 - 17:00</div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setEditDoctor(doc)}
                className="px-2.5 py-1 text-xs font-medium text-[#4A554F] hover:text-[#202522] bg-[#FAF8F5] border border-[#D5CDC0] rounded-md hover:bg-[#EAE4D9] transition-colors"
              >
                <Edit2 className="w-3 h-3 inline mr-1" />
                Edit
              </button>

              <button
                onClick={() => handleToggleActive(doc.id, doc.is_active)}
                disabled={isPending}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  doc.is_active
                    ? 'text-[#9B1C1C] hover:bg-[#FDF2F2] border border-[#F8B4B4]'
                    : 'text-[#1D4333] hover:bg-[#E8F0EC] border border-[#BDE0CE]'
                }`}
              >
                <Power className="w-3 h-3 inline mr-1" />
                {doc.is_active ? 'Nonaktifkan' : 'Aktifkan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Doctor Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Tambah Dokter Praktik Baru
            </h3>

            <form
              action={async (formData) => {
                const res = await createDoctorAction(formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success('Dokter baru berhasil ditambahkan!');
                  setIsNewModalOpen(false);
                  router.refresh();
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-medium text-[#374151] mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Drg. Raditya Pratama, Sp.Pros"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Fokus Spesialisasi</label>
                <input
                  type="text"
                  name="specialty"
                  required
                  placeholder="Contoh: Spesialis Ortodonti & Aligner"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
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
                  Simpan Dokter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {editDoctor && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Edit Data Dokter
            </h3>

            <form
              action={async (formData) => {
                const res = await updateDoctorAction(editDoctor.id, formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success('Data dokter berhasil diperbarui!');
                  setEditDoctor(null);
                  router.refresh();
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-medium text-[#374151] mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editDoctor.name}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Fokus Spesialisasi</label>
                <input
                  type="text"
                  name="specialty"
                  required
                  defaultValue={editDoctor.specialty}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setEditDoctor(null)}
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
