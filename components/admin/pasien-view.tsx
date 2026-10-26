'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Search, Plus, User, Phone, Calendar, ArrowRight, Trash2, Edit2 } from 'lucide-react';
import { createPatientAction, updatePatientAction, deletePatientAction } from '@/actions/admin';
import { formatWIB } from '@/lib/utils';
import type { Patient } from '@/types/database';

interface PasienViewProps {
  initialPatients: Patient[];
  initialSearch: string;
}

export function PasienView({ initialPatients, initialSearch }: PasienViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);

  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/admin/pasien?q=${encodeURIComponent(search.trim())}`);
  }

  function handleDelete(id: string, name: string) {
    const confirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus data pasien demo "${name}"?`
    );
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deletePatientAction(id);
      if ('error' in res && res.error) {
        toast.error(res.error);
      } else {
        toast.success(('message' in res && res.message) ? res.message : 'Pasien berhasil dihapus.');
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E3DDD1] shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E9B93]" />
            <input
              type="text"
              placeholder="Cari nama atau nomor WhatsApp pasien..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 text-xs font-medium text-[#202522] bg-[#EAE4D9] hover:bg-[#DDD5C7] rounded-lg transition-colors"
          >
            Cari
          </button>
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                router.push('/admin/pasien');
              }}
              className="text-xs text-[#C85A32] hover:underline"
            >
              Reset
            </button>
          )}
        </form>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Pasien Baru</span>
        </button>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl border border-[#E3DDD1] shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#EAE4D9] flex items-center justify-between">
          <h2 className="font-serif text-base font-semibold text-[#202522]">
            Data Pasien ({initialPatients.length} Pasien Terdaftar)
          </h2>
          <span className="text-xs text-[#6F7A72]">
            Pasien dengan riwayat aktif tidak dapat dihapus permanen.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#202522]">
            <thead className="bg-[#FAF8F5] text-[#6F7A72] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EAE4D9]">
              <tr>
                <th className="px-5 py-3">Nama Lengkap</th>
                <th className="px-5 py-3">No. WhatsApp</th>
                <th className="px-5 py-3">Tanggal Lahir</th>
                <th className="px-5 py-3">Terdaftar Sejak</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9]">
              {initialPatients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-xs text-[#8E9B93]">
                    Tidak ada pasien yang ditemukan.
                  </td>
                </tr>
              ) : (
                initialPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-3.5 font-medium whitespace-nowrap">
                      <Link
                        href={`/admin/pasien/${p.id}`}
                        className="text-[#202522] hover:text-[#C85A32] transition-colors flex items-center gap-1.5"
                      >
                        <User className="w-3.5 h-3.5 text-[#8E9B93]" />
                        <span>{p.name}</span>
                      </Link>
                    </td>

                    <td className="px-5 py-3.5 text-[#374151] whitespace-nowrap tabular-nums">
                      {p.whatsapp_normalized}
                    </td>

                    <td className="px-5 py-3.5 text-[#6F7A72] whitespace-nowrap">
                      {p.birth_date ? formatWIB(p.birth_date, 'date') : '-'}
                    </td>

                    <td className="px-5 py-3.5 text-[#6F7A72] whitespace-nowrap tabular-nums">
                      {formatWIB(p.created_at, 'date')}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/admin/pasien/${p.id}`}
                          className="px-2.5 py-1 text-[11px] font-medium text-[#202522] bg-[#FAF8F5] border border-[#D5CDC0] rounded-md hover:bg-[#EAE4D9] transition-colors flex items-center gap-1"
                        >
                          <span>Detail</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>

                        <button
                          onClick={() => setEditPatient(p)}
                          className="p-1.5 text-[#4A554F] hover:text-[#202522] hover:bg-[#FAF8F5] rounded-md transition-colors"
                          title="Edit Pasien"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          disabled={isPending}
                          className="p-1.5 text-[#9B1C1C] hover:bg-[#FDF2F2] rounded-md transition-colors"
                          title="Hapus Pasien"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Patient Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Tambah Pasien Baru
            </h3>

            <form
              action={async (formData) => {
                const res = await createPatientAction(formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success('Pasien baru berhasil didaftarkan!');
                  setIsNewModalOpen(false);
                  router.refresh();
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-medium text-[#374151] mb-1">Nama Pasien</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  required
                  placeholder="081234567890"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Tanggal Lahir (Opsional)</label>
                <input
                  type="date"
                  name="birth_date"
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
                  Simpan Pasien
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {editPatient && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Edit Data Pasien
            </h3>

            <form
              action={async (formData) => {
                const res = await updatePatientAction(editPatient.id, formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success('Data pasien berhasil diperbarui!');
                  setEditPatient(null);
                  router.refresh();
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-medium text-[#374151] mb-1">Nama Pasien</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editPatient.name}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  name="whatsapp"
                  required
                  defaultValue={editPatient.whatsapp_normalized}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  name="birth_date"
                  defaultValue={editPatient.birth_date || ''}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setEditPatient(null)}
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
