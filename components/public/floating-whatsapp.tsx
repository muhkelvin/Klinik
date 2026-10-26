'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Clock, Sparkles } from 'lucide-react';

interface FloatingWhatsAppProps {
  clinicPhone?: string;
  clinicName?: string;
}

export function FloatingWhatsApp({
  clinicPhone = '6281234567801',
  clinicName = 'Aruna Dental Studio',
}: FloatingWhatsAppProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const quickChips = [
    'Halo, saya ingin tanya jadwal dokter hari ini',
    'Halo, mau konsultasi mengenai behel dan aligner',
    'Halo, saya mau buat janji temu scaling gigi',
  ];

  function handleSend(customText?: string) {
    const textToSend = customText || message || 'Halo Aruna Dental Studio, saya ingin menanyakan informasi perawatan.';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/${clinicPhone}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setMessage('');
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Pop-up Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#DFD8C9] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#1E2421] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#C85A32] flex items-center justify-center font-serif font-bold text-white text-base shadow-xs">
                  A
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#16A34A] border-2 border-[#1E2421]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white leading-tight">
                  {clinicName}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#A2B0A7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  <span>Resepsionis Online (WIB)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#A2B0A7] hover:text-white p-1 rounded-lg transition-colors"
              title="Tutup chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#F7F5F0] space-y-3 max-h-80 overflow-y-auto text-xs">
            {/* Incoming Message Bubble */}
            <div className="flex gap-2">
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs border border-[#E3DDD1] shadow-2xs text-[#202522] space-y-1.5 max-w-[85%] leading-relaxed">
                <p>
                  Halo! Selamat datang di <strong>{clinicName}</strong>. 👋
                </p>
                <p className="text-[#54625A]">
                  Ada yang bisa kami bantu seputar jadwal praktik dokter spesialis atau estimasi perawatan gigi Anda hari ini?
                </p>
                <div className="text-[10px] text-[#8E9B93] text-right pt-1">
                  Hari ini · Buka 09:00 - 20:00 WIB
                </div>
              </div>
            </div>

            {/* Quick Chips */}
            <div className="pt-2 space-y-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8A80]">
                Pilihan Pertanyaan Cepat:
              </span>
              <div className="flex flex-col gap-1.5">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(chip)}
                    className="text-left p-2 rounded-xl bg-white hover:bg-[#EAE4D9] border border-[#DFD8C9] text-[11px] text-[#202522] transition-colors"
                  >
                    💬 {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#EAE4D9] flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-xl focus:outline-hidden focus:ring-1 focus:ring-[#C85A32]"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#25D366] hover:bg-[#20BA59] text-white rounded-xl transition-colors shadow-xs"
              title="Kirim ke WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Hotline Note */}
          <div className="py-1.5 px-3 bg-[#FAF8F5] text-center text-[10px] text-[#8E9B93] border-t border-[#EAE4D9]">
            Nomor Layanan: <strong>+62 812-3456-7801</strong> (Simulasi Demo)
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA59] text-white py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        title="Chat dengan Kami di WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-semibold tracking-wide">
          Chat WhatsApp
        </span>
      </button>
    </div>
  );
}
