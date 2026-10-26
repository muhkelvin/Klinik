'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Calendar,
  Filter,
  Plus,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Check,
} from 'lucide-react';
import {
  updateAppointmentStatusAction,
  updateAppointmentScheduleAction,
  createAppointmentAction,
} from '@/actions/admin';
import { formatWIB } from '@/lib/utils';
import type { Appointment, Doctor, Treatment, Patient, AppointmentStatus } from '@/types/database';

interface JadwalViewProps {
  initialAppointments: Appointment[];
  doctors: Doctor[];
  treatments: Treatment[];
  patients: Patient[];
  selectedDate: string;
  selectedDoctorId: string;
  selectedStatus: string;
}

export function JadwalView({
  initialAppointments,
  doctors,
  treatments,
  patients,
  selectedDate,
  selectedDoctorId,
  selectedStatus,
}: JadwalViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Filters
  const [dateFilter, setDateFilter] = useState(selectedDate);
  const [doctorFilter, setDoctorFilter] = useState(selectedDoctorId);
  const [statusFilter, setStatusFilter] = useState(selectedStatus);

  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [rescheduleApt, setRescheduleApt] = useState<Appointment | null>(null);

  // Reschedule Form State
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('10:00');
  const [rescheduleDoctorId, setRescheduleDoctorId] = useState('');

  // Apply filters by refreshing URL with query params
  function applyFilters(newDate = dateFilter, newDoc = doctorFilter, newStatus = statusFilter) {
    const params = new URLSearchParams();
    if (newDate) params.set('date', newDate);
    if (newDoc && newDoc !== 'all') params.set('doctorId', newDoc);
    if (newStatus && newStatus !== 'all') params.set('status', newStatus);
    router.push(`/admin/jadwal?${params.toString()}`);
  }

  function handleStatusChange(aptId: string, newStatus: AppointmentStatus) {
    startTransition(async () => {
      const res = await updateAppointmentStatusAction(aptId, newStatus);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(`Status berhasil diubah menjadi "${newStatus.replace('_', ' ')}"`);
        router.refresh();
      }
    });
  }

  function openReschedule(apt: Appointment) {
    setRescheduleApt(apt);
    setRescheduleDate(apt.starts_at.slice(0, 10));
    setRescheduleTime(apt.starts_at.slice(11, 16));
    setRescheduleDoctorId(apt.doctor_id);
  }

  function handleRescheduleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rescheduleApt) return;

    startTransition(async () => {
      const startsAt = `${rescheduleDate}T${rescheduleTime}:00+07:00`;
      const duration = rescheduleApt.treatment?.duration_minutes || 45;
      const endsAt = new Date(new Date(startsAt).getTime() + duration * 60000).toISOString();

      const res = await updateAppointmentScheduleAction(
        rescheduleApt.id,
        startsAt,
        endsAt,
        rescheduleDoctorId
      );

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Jadwal kunjungan berhasil diperbarui!');
        setRescheduleApt(null);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E3DDD1] shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#6F7A72]">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          {/* Date Picker */}
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              applyFilters(e.target.value, doctorFilter, statusFilter);
            }}
            className="px-2.5 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
          />

          {/* Doctor Filter */}
          <select
            value={doctorFilter}
            onChange={(e) => {
              setDoctorFilter(e.target.value);
              applyFilters(dateFilter, e.target.value, statusFilter);
            }}
            className="px-2.5 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
          >
            <option value="all">Semua Dokter</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              applyFilters(dateFilter, doctorFilter, e.target.value);
            }}
            className="px-2.5 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
          >
            <option value="all">Semua Status</option>
            <option value="dijadwalkan">Dijadwalkan</option>
            <option value="dikonfirmasi">Dikonfirmasi</option>
            <option value="datang">Datang</option>
            <option value="tidak_datang">Tidak Datang (No-Show)</option>
            <option value="selesai">Selesai</option>
            <option value="batal">Batal</option>
          </select>

          {(dateFilter || doctorFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setDateFilter('');
                setDoctorFilter('all');
                setStatusFilter('all');
                applyFilters('', 'all', 'all');
              }}
              className="text-[11px] text-[#C85A32] hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-lg transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tambah Booking Baru</span>
        </button>
      </div>

      {/* Appointment Table */}
      <div className="bg-white rounded-xl border border-[#E3DDD1] shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-[#EAE4D9] flex items-center justify-between">
          <h2 className="font-serif text-base font-semibold text-[#202522]">
            Daftar Jadwal ({initialAppointments.length} Kunjungan)
          </h2>
          <span className="text-xs text-[#6F7A72]">
            Perubahan status akan otomatis tercatat di log dan metrik dashboard.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#202522]">
            <thead className="bg-[#FAF8F5] text-[#6F7A72] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EAE4D9]">
              <tr>
                <th className="px-4 py-3">Waktu & Tanggal</th>
                <th className="px-4 py-3">Pasien</th>
                <th className="px-4 py-3">Dokter</th>
                <th className="px-4 py-3">Treatment</th>
                <th className="px-4 py-3">Status Saat Ini</th>
                <th className="px-4 py-3 text-right">Ubah Status / Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9]">
              {initialAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-xs text-[#8E9B93]">
                    Tidak ada jadwal appointment yang sesuai dengan filter yang dipilih.
                  </td>
                </tr>
              ) : (
                initialAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-medium text-[#202522] tabular-nums">
                        {formatWIB(apt.starts_at, 'datetime')}
                      </div>
                      <div className="text-[10px] text-[#7A867E]">
                        Durasi: {apt.treatment?.duration_minutes || 30} menit
                      </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-medium text-[#202522]">{apt.patient?.name}</div>
                      <div className="text-[10px] text-[#7A867E]">
                        WA: {apt.patient?.whatsapp_normalized}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-[#374151] whitespace-nowrap">
                      {apt.doctor?.name}
                    </td>

                    <td className="px-4 py-3.5 text-[#374151] whitespace-nowrap">
                      <div>{apt.treatment?.name}</div>
                      <span className="text-[10px] text-[#8E9B93]">
                        Sumber: {apt.source === 'treatment_behel' ? 'Halaman Behel' : apt.source}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
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

                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Status switcher select */}
                        <select
                          disabled={isPending}
                          value={apt.status}
                          onChange={(e) =>
                            handleStatusChange(apt.id, e.target.value as AppointmentStatus)
                          }
                          className="px-2 py-1 text-[11px] bg-[#FAF8F5] border border-[#D5CDC0] rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
                        >
                          <option value="dijadwalkan">Dijadwalkan</option>
                          <option value="dikonfirmasi">Dikonfirmasi</option>
                          <option value="datang">Datang</option>
                          <option value="tidak_datang">Tidak Datang (No-Show)</option>
                          <option value="selesai">Selesai</option>
                          <option value="batal">Batal</option>
                        </select>

                        <button
                          onClick={() => openReschedule(apt)}
                          disabled={isPending}
                          className="px-2.5 py-1 text-[11px] font-medium text-[#4A554F] hover:text-[#202522] bg-[#FAF8F5] border border-[#D5CDC0] rounded-md hover:bg-[#F0ECE2] transition-colors"
                          title="Ganti jam atau dokter"
                        >
                          Jadwalkan Ulang
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

      {/* Reschedule Modal */}
      {rescheduleApt && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Jadwalkan Ulang Appointment
            </h3>
            <p className="text-xs text-[#6F7A72]">
              Pasien: <strong>{rescheduleApt.patient?.name}</strong> ({rescheduleApt.treatment?.name})
            </p>

            <form onSubmit={handleRescheduleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-[#374151] mb-1">Pilih Tanggal Baru</label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Pilih Jam Mulai</label>
                <input
                  type="time"
                  required
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Dokter</label>
                <select
                  value={rescheduleDoctorId}
                  onChange={(e) => setRescheduleDoctorId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setRescheduleApt(null)}
                  className="px-3.5 py-2 text-[#616D65] hover:bg-[#FAF8F5] rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-[#C85A32] hover:bg-[#B44E28] text-white rounded-lg font-medium"
                >
                  {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#DFD8C9] space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#202522]">
              Tambah Booking / Appointment Baru
            </h3>
            <p className="text-xs text-[#6F7A72]">
              Buat janji temu manual via admin untuk walk-in atau reservasi langsung.
            </p>

            <form
              action={async (formData) => {
                const res = await createAppointmentAction(formData);
                if (res?.error) {
                  toast.error(res.error);
                } else {
                  toast.success('Appointment baru berhasil dibuat!');
                  setIsNewModalOpen(false);
                  router.refresh();
                }
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-medium text-[#374151] mb-1">Pilih Pasien</label>
                <select
                  name="patient_id"
                  required
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                >
                  <option value="">-- Pilih Pasien Terdaftar --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.whatsapp_normalized})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#374151] mb-1">Dokter</label>
                  <select
                    name="doctor_id"
                    required
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#374151] mb-1">Treatment</label>
                  <select
                    name="treatment_id"
                    required
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  >
                    {treatments.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.duration_minutes}m)
                      </option>
                    ))}
                  </select>
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
                    defaultValue={new Date(Date.now() + 45 * 60000).toISOString().slice(0, 16)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#374151] mb-1">Catatan Kunjungan</label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="Catatan umum atau keluhan singkat..."
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
                  Simpan Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
