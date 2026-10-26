import { connection } from 'next/server';
import Link from 'next/link';
import { getDashboardMetrics, getAppointments } from '@/lib/db';
import { formatWIB } from '@/lib/utils';
import { DashboardCharts } from '@/components/admin/dashboard-charts';
import {
  CalendarDays,
  CalendarPlus,
  UserX,
  ClockAlert,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const metadata = {
  title: 'Dashboard Operasional — Aruna Dental Studio',
};

export default async function AdminDashboardPage() {
  await connection();
  const metrics = await getDashboardMetrics();
  const appointments = await getAppointments();
  const recentAppointments = appointments.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#202522]">
            Dashboard Operasional Klinik
          </h1>
          <p className="text-xs text-[#6B7870] mt-0.5">
            Ringkasan aktivitas booking, rasio kehadiran, dan tindak lanjut kontrol pasien.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/jadwal"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-lg transition-colors shadow-2xs"
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Kelola Jadwal & Status</span>
          </Link>
          <Link
            href="/admin/kontrol"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#202522] bg-white border border-[#DFD8C9] hover:bg-[#F8F5EE] rounded-lg transition-colors"
          >
            <ClockAlert className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Lihat Pasien Kontrol ({metrics.kontrolDueCount})</span>
          </Link>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Booking Hari Ini */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6F7A72]">Booking Hari Ini</span>
            <div className="w-8 h-8 rounded-lg bg-[#EAE4D9] flex items-center justify-center text-[#202522]">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-serif text-2xl font-bold text-[#202522] tabular-nums">
              {metrics.todayTotal}
            </div>
            <p className="text-[11px] text-[#6F7A72] mt-0.5">
              {metrics.todayConfirmed} terkonfirmasi / hadir
            </p>
          </div>
        </div>

        {/* 2. Booking Baru Minggu Ini */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6F7A72]">Booking Minggu Ini</span>
            <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] flex items-center justify-center text-[#1D4333]">
              <CalendarPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-serif text-2xl font-bold text-[#202522] tabular-nums">
              {metrics.thisWeekNew}
            </div>
            <p className="text-[11px] text-[#6F7A72] mt-0.5">
              Masuk 7 hari terakhir
            </p>
          </div>
        </div>

        {/* 3. Tingkat No-Show (30 Hari) */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6F7A72]">Rasio No-Show (30 Hari)</span>
            <div className="w-8 h-8 rounded-lg bg-[#FBEAE6] flex items-center justify-center text-[#B43B22]">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-serif text-2xl font-bold text-[#B43B22] tabular-nums">
              {metrics.noShowRate}%
            </div>
            <p className="text-[11px] text-[#6F7A72] mt-0.5">
              {metrics.noShowCount} dari {metrics.eligibleTotal} kunjungan
            </p>
          </div>
        </div>

        {/* 4. Pasien Perlu Kontrol */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6F7A72]">Perlu Kontrol</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF7E8] flex items-center justify-center text-[#B47514]">
              <ClockAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-serif text-2xl font-bold text-[#B47514] tabular-nums">
              {metrics.kontrolDueCount}
            </div>
            <p className="text-[11px] text-[#6F7A72] mt-0.5">
              Jatuh tempo atau mendekati jadwal
            </p>
          </div>
        </div>
      </div>

      {/* Visualizations: Charts */}
      <DashboardCharts
        weeklyTrends={metrics.weeklyTrends}
        sourceBreakdown={metrics.sourceBreakdown}
      />

      {/* Recent Appointments Preview */}
      <div className="bg-white rounded-xl border border-[#E3DDD1] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#EAE4D9] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-base font-semibold text-[#202522]">
              Jadwal Appointment Terbaru
            </h2>
            <p className="text-xs text-[#6F7A72]">
              Booking terbaru yang tercatat di sistem demo secara persisten.
            </p>
          </div>
          <Link
            href="/admin/jadwal"
            className="inline-flex items-center gap-1 text-xs font-medium text-[#C85A32] hover:text-[#B44E28]"
          >
            <span>Buka Semua Jadwal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#202522]">
            <thead className="bg-[#FAF8F5] text-[#6F7A72] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EAE4D9]">
              <tr>
                <th className="px-5 py-3">Waktu Kunjungan</th>
                <th className="px-5 py-3">Nama Pasien</th>
                <th className="px-5 py-3">Dokter</th>
                <th className="px-5 py-3">Treatment</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Sumber</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D9]">
              {recentAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-xs text-[#8E9B93]">
                    Belum ada data appointment. Jalankan Reset Data Demo untuk memuat data contoh.
                  </td>
                </tr>
              ) : (
                recentAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-5 py-3 font-medium text-[#202522] tabular-nums whitespace-nowrap">
                      {formatWIB(apt.starts_at, 'datetime')}
                    </td>
                    <td className="px-5 py-3 font-medium whitespace-nowrap">
                      {apt.patient?.name || 'Pasien Anonim'}
                      <div className="text-[10px] text-[#7A867E]">
                        {apt.patient?.whatsapp_normalized}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[#4A554F] whitespace-nowrap">
                      {apt.doctor?.name || '-'}
                    </td>
                    <td className="px-5 py-3 text-[#4A554F] whitespace-nowrap">
                      {apt.treatment?.name || '-'}
                    </td>
                    <td className="px-5 py-3 whitespace-nowrap">
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
                        {apt.status === 'selesai' && <CheckCircle2 className="w-3 h-3" />}
                        {apt.status === 'tidak_datang' && <AlertCircle className="w-3 h-3" />}
                        {apt.status === 'datang' && <Clock className="w-3 h-3" />}
                        {apt.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[#6F7A72] text-[11px] whitespace-nowrap">
                      {apt.source === 'treatment_behel' ? 'Halaman Behel' : apt.source}
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
