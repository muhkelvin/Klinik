import Link from 'next/link';
import { PublicNavbar } from '@/components/public/navbar';
import { PublicFooter } from '@/components/public/footer';
import { FloatingWhatsApp } from '@/components/public/floating-whatsapp';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  Info,
  MessageCircle,
} from 'lucide-react';

export const metadata = {
  title: 'Perawatan Behel Gigi & Clear Aligner — Aruna Dental Studio',
  description:
    'Konsultasi ortodonti profesional untuk merapikan susunan gigi. Pilihan behel konvensional, sapphire transparan, dan clear aligner tanpa rasa cemas.',
};

export default function BehelPage() {
  const options = [
    {
      name: 'Behel Metal Konvensional',
      tag: 'Kuat & Teruji',
      desc: 'Pilihan populer dan ekonomis untuk perbaikan susunan gigi dari tingkat ringan hingga kompleks.',
      price: 'Rp 6.500.000 - Rp 9.000.000',
      interval: 'Kontrol berkala setiap 3-4 minggu',
      treatmentId: '22222222-2222-2222-2222-222222222203',
    },
    {
      name: 'Behel Sapphire Estetik',
      tag: 'Transparan & Elegan',
      desc: 'Bracket berbahan kristal safir monokristalin yang jernih dan menyatu alami dengan warna gigi Anda.',
      price: 'Rp 10.000.000 - Rp 14.000.000',
      interval: 'Kontrol berkala setiap 4 minggu',
      treatmentId: '22222222-2222-2222-2222-222222222204',
    },
    {
      name: 'Clear Aligner Invisible',
      tag: 'Lepas-Pasang & Nyaman',
      desc: 'Plastik transparan medis berpresisi tinggi yang dapat dilepas saat makan dan menyikat gigi.',
      price: 'Rp 16.000.000 - Rp 25.000.000',
      interval: 'Evaluasi cetakan baru setiap 6-8 minggu',
      treatmentId: '22222222-2222-2222-2222-222222222205',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Konsultasi Awal & Foto Klinis',
      desc: 'Pemeriksaan struktur rahang dan gigi bersama spesialis ortodonti. Dilakukan pengambilan rontgen panoramik dan cetak model studi.',
    },
    {
      step: '02',
      title: 'Pembersihan & Pemasangan Bracket',
      desc: 'Gigi dibersihkan dari plak dan karang terlebih dahulu, sebelum pemasangan bracket atau fitting set aligner pertama Anda.',
    },
    {
      step: '03',
      title: 'Kontrol Rutin & Penyesuaian Kawat',
      desc: 'Kunjungan berkala terjadwal untuk mengganti karet kawat atau mengevaluasi pergerakan gigi ke posisi ideal secara bertahap.',
    },
    {
      step: '04',
      title: 'Pelepasan & Pemakaian Retainer',
      desc: 'Setelah susunan gigi ideal tercapai, bracket dilepas dan retainer dipasangkan untuk menjaga stabilitas posisi gigi baru.',
    },
  ];

  const faqs = [
    {
      q: 'Kapan waktu yang tepat untuk mulai konsultasi behel?',
      a: 'Konsultasi dapat dilakukan mulai usia remaja hingga dewasa saat gigi permanen telah tumbuh lengkap. Spesialis ortodonti kami akan mengevaluasi apakah kondisi gigitan Anda memerlukan intervensi.',
    },
    {
      q: 'Apakah pemasangan behel menimbulkan rasa sakit?',
      a: 'Proses pemasangan tidak sakit. Namun, rasa ngilu wajar dapat terasa selama 2-4 hari pertama setelah kawat dipasang atau disesuaikan, yang dapat diatasi dengan makanan lunak.',
    },
    {
      q: 'Berapa lama rata-rata durasi pemakaian behel?',
      a: 'Durasi perawatan bervariasi bergantung pada tingkat keparahan susunan gigi dan kedisiplinan kontrol, umumnya berkisar antara 12 hingga 24 bulan setelah evaluasi klinis dokter.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <PublicNavbar />

      <main className="flex-1 space-y-20 pb-20">
        {/* Editorial Hero */}
        <section className="pt-16 sm:pt-24 pb-12 border-b border-[#E8E2D5] px-4 sm:px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F0EC] text-[#1D4333] border border-[#C6DDD1]">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Layanan Spesialis Ortodonti</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#202522] leading-tight">
              Kerapian Gigi untuk Fungsi Kunyah Optimal dan Senyum Percaya Diri
            </h1>

            <p className="text-sm sm:text-base text-[#54625A] leading-relaxed max-w-2xl">
              Susunan gigi yang berjejal, renggang, atau gigitan tidak selaras dapat mempengaruhi kenyamanan saat makan dan kebersihan mulut. Kami menyediakan rencana perawatan ortodonti yang dipersonalisasi sesuai kebutuhan klinis Anda.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/booking?treatment=22222222-2222-2222-2222-222222222203&source=treatment_behel"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-xl shadow-xs transition-colors"
              >
                <span>Konsultasikan dengan Dokter Ortodonti</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-[#7A8A80]">
                Slot booking WIB · Estimasi konsultasi awal 30 menit
              </span>
            </div>
          </div>
        </section>

        {/* Treatment Options */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Pilihan Perawatan Ortodonti
            </h2>
            <p className="text-xs sm:text-sm text-[#616E65]">
              Setiap opsi memiliki karakteristik material dan estetika yang disesuaikan dengan preferensi serta aktivitas harian Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {options.map((opt) => (
              <div
                key={opt.name}
                className="bg-white p-6 rounded-2xl border border-[#E3DDD1] shadow-2xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF8F5] text-[#1D4333] border border-[#EAE4D9]">
                    {opt.tag}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#202522]">
                    {opt.name}
                  </h3>
                  <p className="text-xs text-[#54625A] leading-relaxed">
                    {opt.desc}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#EAE4D9]">
                  <div>
                    <div className="text-[11px] text-[#8E9B93]">Rentang Biaya Contoh:</div>
                    <div className="text-xs font-semibold text-[#C85A32] mt-0.5">
                      {opt.price}
                    </div>
                  </div>

                  <div className="text-[11px] text-[#6F7A72] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#8E9B93]" />
                    <span>{opt.interval}</span>
                  </div>

                  <Link
                    href={`/booking?treatment=${opt.treatmentId}&source=treatment_behel`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-medium text-[#202522] bg-[#FAF8F5] border border-[#D5CDC0] hover:bg-[#EAE4D9] rounded-xl transition-colors"
                  >
                    <span>Pilih Perawatan Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] flex items-start gap-2.5 text-xs text-[#6F7A72]">
            <Info className="w-4 h-4 text-[#8E9B93] shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              *Rentang biaya di atas merupakan estimasi transparan. Rencana biaya aktual akan disesuaikan setelah evaluasi klinis dan rontgen oleh dokter spesialis ortodonti.
            </span>
          </div>
        </section>

        {/* Process Steps */}
        <section className="bg-[#FAF8F5] py-16 border-y border-[#E8E2D5] px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="max-w-xl space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
                Tahapan Perjalanan Perawatan
              </h2>
              <p className="text-xs sm:text-sm text-[#616E65]">
                Gambaran alur dari kunjungan konsultasi pertama hingga pelepasan kawat gigi secara terstruktur.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.step} className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs space-y-3">
                  <span className="font-serif text-2xl font-bold text-[#C85A32]">
                    {s.step}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[#202522]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#54625A] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#202522]">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xs sm:text-sm text-[#616E65]">
              Informasi praktis seputar konsultasi behel dan aligner di klinik kami.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-[#E3DDD1] shadow-2xs space-y-2">
                <h3 className="font-serif text-sm font-semibold text-[#202522] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#C85A32]" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-[#54625A] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="bg-[#1E2421] text-white p-8 sm:p-10 rounded-2xl text-center space-y-4 mt-12">
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Siap Memulai Konsultasi Behel Anda?
            </h3>
            <p className="text-xs sm:text-sm text-[#95A59B] max-w-md mx-auto">
              Tentukan hari dan slot waktu yang sesuai, atau konsultasikan kebutuhan Anda via WhatsApp bersama tim kami.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/booking?treatment=22222222-2222-2222-2222-222222222203&source=treatment_behel"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-xl shadow-xs transition-colors"
              >
                <span>Ajukan Janji Temu Behel</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/6281234567801?text=Halo%20Aruna%20Dental%20Studio,%20saya%20ingin%20tanya%20seputar%20pilihan%20behel%20dan%20aligner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-medium text-[#1E5631] bg-[#E8F8F0] hover:bg-[#D4F1E3] rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Konsultasi Behel via WA</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsApp />
      <PublicFooter />
    </div>
  );
}
