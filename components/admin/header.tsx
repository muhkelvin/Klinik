'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RotateCcw, LogOut, UserCircle } from 'lucide-react';
import { logoutAdminAction, resetDemoAction } from '@/actions/admin';

export function AdminHeader() {
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);

  async function handleReset() {
    const confirmed = window.confirm(
      'Apakah Anda yakin ingin menyinkronkan ulang data jadwal dan pasien ke kondisi awal?'
    );
    if (!confirmed) return;

    setIsResetting(true);
    try {
      const res = await resetDemoAction();
      if ('error' in res && res.error) {
        toast.error(res.error);
      } else {
        toast.success('Data operasional berhasil disinkronkan ke kondisi awal!');
        router.refresh();
      }
    } catch {
      toast.error('Gagal menyinkronkan data.');
    } finally {
      setIsResetting(false);
    }
  }

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[#E3DDD1] px-6 flex items-center justify-between shrink-0 shadow-xs">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E8F0EC] text-[#1D4333] border border-[#C6DDD1]">
          Aruna Dental Studio · WIB
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Reset / Sync Button */}
        <button
          onClick={handleReset}
          disabled={isResetting}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-[#616D65] hover:text-[#202522] hover:bg-[#F3EFE6] border border-[#DFD8C9] transition-colors disabled:opacity-50"
          title="Sinkronkan ulang basis data ke kondisi awal"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
          <span>{isResetting ? 'Menyinkronkan...' : 'Sinkronkan Data'}</span>
        </button>

        <div className="h-4 w-px bg-[#E3DDD1]" />

        {/* User Identity */}
        <div className="flex items-center gap-2 text-xs text-[#202522]">
          <UserCircle className="w-4 h-4 text-[#C85A32]" />
          <span className="font-medium">Administrator</span>
        </div>

        {/* Logout */}
        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="p-1.5 text-[#7A867E] hover:text-[#B43B22] hover:bg-[#FBEAE6] rounded-md transition-colors"
            title="Keluar dari akun admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </form>
      </div>
    </header>
  );
}
