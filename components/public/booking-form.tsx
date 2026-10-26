'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { submitPublicBooking } from '@/actions/booking';
import type { Doctor, Treatment } from '@/types/database';

interface BookingFormProps {
  doctors: Doctor[];
  treatments: Treatment[];
  defaultTreatmentId?: string;
  source?: string;
}

const AVAILABLE_HOURS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:30', '19:15'
];

export function BookingForm({
  doctors,
  treatments,
  defaultTreatmentId = '',
  source = 'website',
}: BookingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [selectedTreatmentId, setSelectedTreatmentId] = useState(defaultTreatmentId || (treatments[0]?.id || ''));
  const [selectedDoctorId, setSelectedDoctorId] = useState('any');
  const [slotDate, setSlotDate] = useState(() => {
    // Tomorrow as default booking date
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [slotTime, setSlotTime] = useState('10:00');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notes, setNotes] = useState('');
  const [demoConsent, setDemoConsent] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedTreatment = treatments.find((t) => t.id === selectedTreatmentId);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (!demoConsent) {
      setErrorMsg('Persetujuan demo wajib dicentang untuk melanjutkan.');
      return;
    }

    const formData = new FormData();
    formData.append('treatment_id', selectedTreatmentId);
    formData.append('doctor_id', selectedDoctorId);
    formData.append('slot_date', slotDate);
    formData.append('slot_time', slotTime);
    formData.append('name', name);
    formData.append('whatsapp', whatsapp);
    formData.append('notes', notes);
    formData.append('demo_consent', 'true');
    formData.append('source', source);

    startTransition(async () => {
      const res = await submitPublicBooking(null, formData);
      if (res.error) {
        setErrorMsg(res.error);
        toast.error(res.error);
      } else if (res.success && res.bookingSummary) {
        // Store confirmation in sessionStorage to keep URL clean without exposing patient data in query string
        sessionStorage.setItem('last_demo_booking', JSON.stringify(res.bookingSummary));
        router.push('/booking/sukses');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errorMsg && (
        <div className="p-4 rounded-xl bg-[#FDF2F2] border border-[#F8B4B4] text-xs text-[#9B1C1C] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="leading-relaxed">{errorMsg}</div>
        </div>
      )}

      {/* Step 1: Treatment & Doctor */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAE4D9] pb-2">
          <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white text-[11px] font-bold flex items-center justify-center">
            1
          </span>
          <h2 className="font-serif text-base font-semibold text-[#202522]">
            Pilih Layanan & Dokter
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">
              Treatment yang Diinginkan
            </label>
            <select
              value={selectedTreatmentId}
              onChange={(e) => setSelectedTreatmentId(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
            >
              {treatments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.duration_minutes}m — {t.price_range_label})
                </option>
              ))}
            </select>
            {selectedTreatment && (
              <p className="text-[11px] text-[#6F7A72] mt-1.5">
                Estimasi durasi: {selectedTreatment.duration_minutes} menit · {selectedTreatment.price_range_label}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">
              Pilihan Dokter
            </label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
            >
              <option value="any">Rekomendasi Terbaik (Dokter Mana Saja)</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} — {d.specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Step 2: Date & Time Slot */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAE4D9] pb-2">
          <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white text-[11px] font-bold flex items-center justify-center">
            2
          </span>
          <h2 className="font-serif text-base font-semibold text-[#202522]">
            Tentukan Waktu Kunjungan
          </h2>
        </div>

        <div className="space-y-3">
          <div className="max-w-xs">
            <label className="block text-xs font-medium text-[#374151] mb-1.5">
              Pilih Hari / Tanggal
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().slice(0, 10)}
              value={slotDate}
              onChange={(e) => setSlotDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#374151] mb-2">
              Pilihan Slot Jam (WIB)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {AVAILABLE_HOURS.map((hour) => (
                <button
                  key={hour}
                  type="button"
                  onClick={() => setSlotTime(hour)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                    slotTime === hour
                      ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs'
                      : 'bg-white text-[#202522] border-[#DFD8C9] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {hour} WIB
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Patient Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#EAE4D9] pb-2">
          <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white text-[11px] font-bold flex items-center justify-center">
            3
          </span>
          <h2 className="font-serif text-base font-semibold text-[#202522]">
            Kontak & Identitas Pemesan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Danu Arya Pratama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#374151] mb-1.5">
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              required
              placeholder="081234567890 atau 628..."
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[#374151] mb-1.5">
            Catatan Tambahan (Opsional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Catatan umum atau jadwal preferensi. Mohon JANGAN mengirimkan informasi medis sensitif."
            className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDC0] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
          />
        </div>

        {/* Demo Consent */}
        <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] flex items-start gap-3">
          <input
            type="checkbox"
            id="consent_check"
            checked={demoConsent}
            onChange={(e) => setDemoConsent(e.target.checked)}
            className="mt-0.5 rounded text-[#C85A32] focus:ring-[#C85A32]"
          />
          <label htmlFor="consent_check" className="text-xs text-[#54625A] leading-relaxed select-none">
            Saya memahami bahwa formulir ini adalah <strong>demo interaktif portfolio</strong>. Data yang dikirimkan akan tersimpan di sistem demo untuk simulasi operasional admin, dan tidak ada pesan WhatsApp atau janji temu medis sungguhan yang dibuat.
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-6 text-sm font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <Sparkles className="w-4 h-4" />
        <span>{isPending ? 'Memvalidasi & Memproses Booking...' : 'Kirim Permintaan Booking Janji Temu'}</span>
      </button>
    </form>
  );
}
