'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Stethoscope,
  Sparkles,
  ClockAlert,
  BellRing,
  Settings,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Jadwal & Status', href: '/admin/jadwal', icon: Calendar },
  { name: 'Pasien', href: '/admin/pasien', icon: Users },
  { name: 'Kontrol Berkala', href: '/admin/kontrol', icon: ClockAlert },
  { name: 'Simulasi Reminder', href: '/admin/reminder', icon: BellRing },
  { name: 'Data Dokter', href: '/admin/dokter', icon: Stethoscope },
  { name: 'Layanan Treatment', href: '/admin/treatment', icon: Sparkles },
  { name: 'Pengaturan Demo', href: '/admin/pengaturan', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1E2421] text-[#E8ECE9] flex flex-col shrink-0 border-r border-[#2C3530] min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#2C3530]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-serif font-bold text-lg">
            A
          </div>
          <div>
            <h1 className="font-serif font-semibold text-white tracking-wide text-base leading-tight">
              Aruna Dental
            </h1>
            <p className="text-[11px] text-[#8E9B93] uppercase tracking-wider font-medium">
              Demo Portfolio v1.1
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold text-[#728078] uppercase tracking-wider">
          Menu Operasional
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[#C85A32] text-white shadow-sm'
                  : 'text-[#B0BCB4] hover:bg-[#28322D] hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Info / Public Link */}
      <div className="p-3 border-t border-[#2C3530] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#A2B0A7] hover:text-white hover:bg-[#28322D] rounded-lg transition-colors"
        >
          <span>Buka Website Publik</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <div className="p-2.5 bg-[#252D28] rounded-lg border border-[#333E37]">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#E5A88B]">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Mode Demo Aktif</span>
          </div>
          <p className="text-[10px] text-[#8E9B93] mt-0.5 leading-relaxed">
            Semua data bersifat fiktif. Tidak ada pesan WhatsApp sungguhan yang dikirim.
          </p>
        </div>
      </div>
    </aside>
  );
}
