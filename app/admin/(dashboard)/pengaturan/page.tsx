import { getDemoCredentialsInfo } from '@/lib/auth';
import { Settings, Clock, MessageSquare, ShieldAlert, Database } from 'lucide-react';

export const metadata = {
  title: 'Pengaturan Demo — Aruna Dental Studio',
};

export default function AdminPengaturanPage() {
  const creds = getDemoCredentialsInfo();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#202522]">
          Pengaturan Konfigurasi Demo
        </h1>
        <p className="text-xs text-[#6B7870] mt-0.5">
          Parameter operasional yang digunakan dalam simulasi demo sistem klinik gigi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Jam Operasional */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C85A32]" />
            <h2 className="font-serif text-base font-semibold text-[#202522]">
              Jam Operasional Praktik (WIB)
            </h2>
          </div>
          <p className="text-xs text-[#6F7A72]">
            Jadwal default yang digunakan untuk slot appointment pada booking publik:
          </p>
          <div className="text-xs text-[#202522] space-y-1.5 pt-2 border-t border-[#EAE4D9]">
            <div className="flex justify-between">
              <span>Senin - Jumat:</span>
              <span className="font-medium">09:00 - 20:00 WIB</span>
            </div>
            <div className="flex justify-between">
              <span>Sabtu:</span>
              <span className="font-medium">09:00 - 17:00 WIB</span>
            </div>
            <div className="flex justify-between text-[#8E9B93]">
              <span>Minggu & Hari Libur:</span>
              <span>Tutup (Hanya Janji Khusus)</span>
            </div>
          </div>
        </div>

        {/* Template Reminder */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#C85A32]" />
            <h2 className="font-serif text-base font-semibold text-[#202522]">
              Format Pesan WhatsApp (Simulasi)
            </h2>
          </div>
          <p className="text-xs text-[#6F7A72]">
            Template teks otomatis untuk outbox reminder simulasi:
          </p>
          <div className="text-[11px] font-mono bg-[#FAF8F5] p-3 rounded-lg border border-[#EAE4D9] text-[#4A554F] leading-relaxed">
            &quot;Halo Kak [Nama], mengingatkan jadwal konsultasi [Treatment] besok pukul [Waktu] WIB bersama [Dokter]. Mohon konfirmasi kehadirannya. (Demo Portfolio)&quot;
          </div>
        </div>

        {/* Database & Environment Info */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#C85A32]" />
            <h2 className="font-serif text-base font-semibold text-[#202522]">
              Koneksi Sumber Data
            </h2>
          </div>
          <div className="text-xs text-[#54625A] space-y-2">
            <div className="flex items-center justify-between">
              <span>Sistem Penyimpanan:</span>
              <span className="font-medium text-[#202522]">Supabase PostgreSQL / Persistent Local DB</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Status Overlap Slot:</span>
              <span className="font-medium text-[#1D4333]">Aktif (Server-Side + DB Index)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Zona Waktu Operasional:</span>
              <span className="font-medium text-[#202522]">WIB (Asia/Jakarta, UTC+7)</span>
            </div>
          </div>
        </div>

        {/* Akun Demo Info */}
        <div className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#C85A32]" />
            <h2 className="font-serif text-base font-semibold text-[#202522]">
              Akses Kredensial Demo Admin
            </h2>
          </div>
          <div className="text-xs text-[#54625A] space-y-1.5 font-mono bg-[#FAF8F5] p-3 rounded-lg border border-[#EAE4D9]">
            <div>Email Demo: <strong className="text-[#202522]">{creds.email}</strong></div>
            <div>Sandi Demo: <strong className="text-[#202522]">{creds.password}</strong></div>
          </div>
          <p className="text-[11px] text-[#7A867E]">
            Digunakan oleh reviewer portfolio untuk menguji alur operasional klinik.
          </p>
        </div>
      </div>
    </div>
  );
}
