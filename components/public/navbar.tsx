'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Calendar, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PublicNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E8E2D5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#C85A32] text-white flex items-center justify-center font-serif font-bold text-lg shadow-2xs group-hover:bg-[#B44E28] transition-colors">
            A
          </div>
          <div>
            <div className="font-serif font-bold text-[#202522] text-lg leading-tight tracking-tight">
              Aruna Dental Studio
            </div>
            <div className="text-[10px] text-[#7A867E] tracking-wider uppercase font-medium">
              Klinik Gigi & Ortodonti
            </div>
          </div>
        </Link>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[#54625A]">
          <Link
            href="/"
            className={cn(
              'hover:text-[#202522] transition-colors',
              pathname === '/' && 'text-[#C85A32] font-semibold'
            )}
          >
            Beranda
          </Link>
          <Link
            href="/behel"
            className={cn(
              'hover:text-[#202522] transition-colors',
              pathname === '/behel' && 'text-[#C85A32] font-semibold'
            )}
          >
            Behel & Aligner
          </Link>
          <Link
            href="/booking"
            className={cn(
              'hover:text-[#202522] transition-colors',
              pathname === '/booking' && 'text-[#C85A32] font-semibold'
            )}
          >
            Buat Janji Temu
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/6281234567801?text=Halo%20Aruna%20Dental%20Studio,%20saya%20ingin%20tanya%20jadwal%20dan%20layanan%20klinik"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1E5631] bg-[#E8F8F0] hover:bg-[#D4F1E3] border border-[#BDE0CE] rounded-xl transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <span>WA: 0812-3456-7801</span>
          </a>

          <Link
            href="/admin"
            className="hidden lg:inline-flex items-center gap-1 text-xs font-medium text-[#6F7A72] hover:text-[#202522] px-3 py-1.5 rounded-lg hover:bg-[#EAE4D9] transition-colors"
          >
            <span>Demo Admin</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/booking"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-xl shadow-2xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reservasi Jadwal</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
