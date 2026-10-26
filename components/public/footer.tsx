import Link from 'next/link';
import { ShieldAlert, Clock, MapPin, Phone } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-[#1E2421] text-[#E8ECE9] pt-14 pb-10 border-t border-[#2C3530]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-serif font-bold text-base">
                A
              </div>
              <span className="font-serif font-bold text-white text-base">
                Aruna Dental
              </span>
            </div>
            <p className="text-xs text-[#95A59B] leading-relaxed">
              Klinik perawatan gigi terpadu dengan pendekatan personal, tenang, dan transparan untuk senyum yang sehat.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigasi Layanan
            </h4>
            <ul className="text-xs text-[#95A59B] space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Beranda Klinik
                </Link>
              </li>
              <li>
                <Link href="/behel" className="hover:text-white transition-colors">
                  Behel & Clear Aligner
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-white transition-colors">
                  Pemesanan Janji Temu
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Dashboard Demo Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Jam Praktik (WIB)</span>
            </h4>
            <div className="text-xs text-[#95A59B] space-y-1">
              <div className="flex justify-between">
                <span>Senin - Jumat:</span>
                <span className="text-white">09:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sabtu:</span>
                <span className="text-white">09:00 - 17:00</span>
              </div>
              <div className="flex justify-between text-[#728077]">
                <span>Minggu / Libur:</span>
                <span>Tutup</span>
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Lokasi & Kontak Demo</span>
            </h4>
            <div className="text-xs text-[#95A59B] space-y-1 leading-relaxed">
              <p>Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan (Alamat Fiktif)</p>
              <p className="pt-1 text-[#E5A88B]">WhatsApp: 0812-3456-7801</p>
            </div>
          </div>
        </div>

        {/* Portfolio Demo Notice */}
        <div className="pt-8 border-t border-[#2C3530] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A8A80]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldAlert className="w-4 h-4 text-[#C85A32] shrink-0" />
            <span>
              <strong>Pemberitahuan Demo:</strong> Aplikasi ini adalah proyek portfolio rekayasa web. Tidak menyediakan rekam medis sungguhan atau transaksi komersial.
            </span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-[#637067]">
            &copy; 2026 Aruna Dental Studio · Portfolio Demo
          </div>
        </div>
      </div>
    </footer>
  );
}
