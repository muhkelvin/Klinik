import { connection } from 'next/server';
import Link from 'next/link';
import Image from 'next/image';
import { PublicNavbar } from '@/components/public/navbar';
import { PublicFooter } from '@/components/public/footer';
import { FloatingWhatsApp } from '@/components/public/floating-whatsapp';
import { getDoctors, getTreatments } from '@/lib/db';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Stethoscope,
  Smile,
  Users,
  Award,
  Layers,
  HeartHandshake,
  Microscope,
  Phone,
  HelpCircle,
  Building2,
  Check,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const metadata = {
  title: 'Aruna Dental Studio — Company Profile & Klinik Gigi Modern Jakarta',
  description:
    'Profil resmi Aruna Dental Studio: Pusat perawatan gigi dan ortodonti modern dengan standar sterilisasi rumah sakit, ruang privat bebas cemas, dan dokter spesialis berpengalaman.',
};

export default async function HomePage() {
  await connection();
  const [doctors, treatments] = await Promise.all([
    getDoctors(false),
    getTreatments(false),
  ]);

  const featuredTreatments = treatments.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <PublicNavbar />

      <main className="flex-1 space-y-28 pb-28">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION WITH ARCHITECTURAL CLINIC BANNER */}
        {/* ========================================================================= */}
        <section className="pt-12 sm:pt-16 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E8F0EC] text-[#1D4333] border border-[#C6DDD1]">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>Profil Resmi Klinik Gigi & Ortodonti · Demo Portfolio</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#202522] leading-[1.12] tracking-tight">
                Standar Baru Perawatan Gigi: Tenang, Berpresisi, dan Menghargai Waktu Anda.
              </h1>

              <p className="text-sm sm:text-base text-[#54625A] leading-relaxed max-w-xl">
                Aruna Dental Studio menghadirkan pengalaman perawatan gigi modern di Jakarta Selatan. Menggabungkan teknologi diagnostik digital, ruang praktik privat kedap suara, dan rencana perawatan transparan tanpa kecemasan.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/booking?source=home"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-xl shadow-xs transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Jadwalkan Konsultasi Online</span>
                </Link>

                <a
                  href="https://wa.me/6281234567801?text=Halo%20Aruna%20Dental%20Studio,%20saya%20ingin%20konsultasi%20jadwal%20dan%20layanan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-medium text-[#1E5631] bg-[#E8F8F0] hover:bg-[#D4F1E3] border border-[#BDE0CE] rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>Konsultasi WhatsApp</span>
                </a>

                <Link
                  href="/behel"
                  className="inline-flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-medium text-[#54625A] hover:text-[#202522] rounded-xl transition-colors"
                >
                  <span>Layanan Behel & Aligner</span>
                  <ArrowRight className="w-4 h-4 text-[#8E9B93]" />
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 border-t border-[#E8E2D5] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#54625A]">
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#202522]">100% Steril</strong>
                  <span className="text-[11px] text-[#7A8A80]">Autoclave Class B</span>
                </div>
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#202522]">Ruang Privat</strong>
                  <span className="text-[11px] text-[#7A8A80]">Satu Pasien Per Ruang</span>
                </div>
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#202522]">Transparan</strong>
                  <span className="text-[11px] text-[#7A8A80]">Biaya Tertulis Di Awal</span>
                </div>
                <div>
                  <strong className="block text-sm font-serif font-bold text-[#202522]">Tepat Waktu</strong>
                  <span className="text-[11px] text-[#7A8A80]">Jadwal Terjadwal WIB</span>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#DFD8C9] shadow-lg bg-[#EFEBE1] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/clinic_interior.jpg"
                  alt="Suasana Ruang Tunggu dan Reception Lounge Aruna Dental Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#E5A88B]">
                    Suasana Klinik
                  </span>
                  <p className="font-serif text-base font-medium leading-snug">
                    Lounge penerimaan pasien dengan interior hangat & tenang di Senopati, Jakarta.
                  </p>
                </div>
              </div>

              {/* Floating Quick Card */}
              <div className="hidden sm:block absolute -bottom-8 -left-6 bg-white p-4 rounded-2xl border border-[#DFD8C9] shadow-md max-w-xs text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#1D4333] flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold text-[#202522]">Praktik Buka Hari Ini</div>
                    <div className="text-[11px] text-[#7A867E]">09:00 - 20:00 WIB (Senopati, Jaksel)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ABOUT US & COMPANY PHILOSOPHY (VISI & MISI KLINIK) */}
        {/* ========================================================================= */}
        <section className="bg-white py-20 border-y border-[#E8E2D5] px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                  Tentang Aruna Dental Studio
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522] leading-tight">
                  Mengubah Paradigma Perawatan Gigi Menjadi Pengalaman Menenangkan
                </h2>
                <p className="text-xs sm:text-sm text-[#54625A] leading-relaxed">
                  Aruna Dental Studio didirikan dengan satu tujuan mendasar: menghilangkan ketakutan dan ketidakpastian yang sering dialami masyarakat saat mengunjungi dokter gigi. Kami menyatukan ruang berdesain biofilik hangat dengan teknologi kedokteran gigi mutakhir.
                </p>
                <p className="text-xs sm:text-sm text-[#54625A] leading-relaxed">
                  Setiap pasien disambut bukan sebagai nomor antrean, melainkan sebagai individu dengan kebutuhan estetika dan fungsional yang unik. Seluruh prosedur dibicarakan bersama secara terbuka sebelum tindakan dimulai.
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <div>
                    <div className="font-serif text-3xl font-bold text-[#C85A32] tabular-nums">100%</div>
                    <div className="text-xs text-[#6F7A72]">Privasi Pasien Terjaga</div>
                  </div>
                  <div className="h-8 w-px bg-[#E3DDD1]" />
                  <div>
                    <div className="font-serif text-3xl font-bold text-[#202522] tabular-nums">3</div>
                    <div className="text-xs text-[#6F7A72]">Dokter Spesialis Bersertifikat</div>
                  </div>
                  <div className="h-8 w-px bg-[#E3DDD1]" />
                  <div>
                    <div className="font-serif text-3xl font-bold text-[#202522] tabular-nums">8+</div>
                    <div className="text-xs text-[#6F7A72]">Layanan Perawatan Lengkap</div>
                  </div>
                </div>
              </div>

              {/* Philosophy Pillars Card Grid */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#1D4333] flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4 text-[#C85A32]" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#202522]">Gentle Care Mindset</h3>
                  <p className="text-xs text-[#54625A] leading-relaxed">
                    Tindakan tanpa rasa terburu-buru, komunikasi ramah di setiap tahapan, dan pendekatan lembut untuk meminimalkan rasa ngilu.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#1D4333] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#202522]">Standar Sterilisasi RS</h3>
                  <p className="text-xs text-[#54625A] leading-relaxed">
                    Setiap instrumen dibersihkan secara ultrasonik dan disterilkan dalam Autoclave Class B dengan pouch kedap udara bersegel.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#1D4333] flex items-center justify-center">
                    <Microscope className="w-4 h-4 text-[#C85A32]" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#202522]">Digital Diagnostic 3D</h3>
                  <p className="text-xs text-[#54625A] leading-relaxed">
                    Pemeriksaan memakai kamera intraoral definisi tinggi dan rontgen beradiasi rendah untuk perencanaan tindakan berpresisi.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE4D9] space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0EC] text-[#1D4333] flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#C85A32]" />
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#202522]">Transparansi Biaya</h3>
                  <p className="text-xs text-[#54625A] leading-relaxed">
                    Rincian perkiraan biaya disampaikan secara tertulis di awal sebelum tindakan disetujui. Tidak ada biaya siluman.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CLINIC FACILITIES SHOWCASE */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
              Fasilitas & Teknologi Klinik
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
              Ruang Perawatan Privat dengan Kenyamanan Setara Spa Medis
            </h2>
            <p className="text-xs sm:text-sm text-[#616E65] leading-relaxed">
              Kami merancang setiap sudut ruang klinik untuk menjamin sterilitas maksimal, ketenangan mental, dan privasi penuh selama Anda menjalani perawatan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Treatment Room Image */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden border border-[#DFD8C9] shadow-md aspect-[16/10] bg-[#EFEBE1]">
                <img
                  src="/images/dental_treatment_room.jpg"
                  alt="Ruang Perawatan Dental Privat Aruna Dental Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#E5A88B]">
                    Private Treatment Suite
                  </span>
                  <p className="font-serif text-base font-medium leading-snug">
                    Dilengkapi kursi dental ergonomis ultra-lembut, monitor display hasil rontgen, dan pencahayaan alami yang menenangkan.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Points */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-1.5">
                <div className="font-serif font-bold text-sm text-[#202522] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C85A32]" />
                  <span>Ruang Perawatan Individual Kedap Suara</span>
                </div>
                <p className="text-xs text-[#54625A] leading-relaxed pl-6">
                  Setiap pasien berada di dalam ruangan tersendiri. Tidak ada deretan kursi terbuka yang membuat Anda canggung atau terganggu oleh suara alat pasien lain.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-1.5">
                <div className="font-serif font-bold text-sm text-[#202522] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C85A32]" />
                  <span>Kamera Intraoral & Layar Edukasi Pasien</span>
                </div>
                <p className="text-xs text-[#54625A] leading-relaxed pl-6">
                  Anda diajak melihat sendiri kondisi gigi Anda secara nyata pada monitor di depan kursi periksa, sehingga mengerti alasan di balik rekomendasi dokter.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-1.5">
                <div className="font-serif font-bold text-sm text-[#202522] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C85A32]" />
                  <span>Ruang Sterilisasi Kaca Transparan (Glass-Cased)</span>
                </div>
                <p className="text-xs text-[#54625A] leading-relaxed pl-6">
                  Kami mengusung transparansi: proses sterilisasi instrumen dapat dilihat secara terbuka oleh pasien sebagai jaminan kepatuhan protokol infeksi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. COMPREHENSIVE CLINICAL SERVICES (KATALOG LAYANAN) */}
        {/* ========================================================================= */}
        <section className="bg-white py-20 border-y border-[#E8E2D5] px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                  Layanan Medis & Perawatan
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
                  Solusi Kesehatan & Estetika Gigi Menyeluruh
                </h2>
                <p className="text-xs sm:text-sm text-[#616E65]">
                  Dari perawatan pencegahan rutin hingga rekonstruksi ortodonti dan konservasi gigi berteknologi tinggi.
                </p>
              </div>

              <Link
                href="/booking?source=home"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
              >
                <span>Lihat Seluruh Jadwal Booking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {treatments.map((trt) => (
                <div
                  key={trt.id}
                  className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EAE4D9] hover:border-[#C85A32]/40 transition-colors flex flex-col justify-between space-y-4 shadow-2xs"
                >
                  <div className="space-y-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white text-[#6F7A72] border border-[#DFD8C9]">
                      {trt.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#202522]">
                      {trt.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#C85A32]">
                      {trt.price_range_label}
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#DFD8C9]">
                    <div className="text-[11px] text-[#6F7A72] flex items-center justify-between">
                      <span>Estimasi Waktu:</span>
                      <strong className="text-[#202522]">{trt.duration_minutes} Menit</strong>
                    </div>

                    <Link
                      href={`/booking?treatment=${trt.id}&source=home`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-[#202522] bg-white border border-[#D5CDC0] hover:bg-[#F3EFE6] rounded-xl transition-colors"
                    >
                      <span>Reservasi Layanan</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C85A32]" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. MEDICAL SPECIALIST TEAM (TIM DOKTER SPESIALIS) */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
              Tim Dokter Praktik
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
              Didukung Dokter Gigi Spesialis Berpengalaman
            </h2>
            <p className="text-xs sm:text-sm text-[#616E65]">
              Setiap dokter berfokus pada bidang keahliannya masing-masing untuk memberikan evaluasi klinis dan penanganan yang tepat sasaran.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor 1: Drg. Sarah Wijaya with generated photo */}
            <div className="bg-white rounded-3xl border border-[#E3DDD1] shadow-2xs overflow-hidden flex flex-col justify-between">
              <div className="aspect-square relative bg-[#FAF8F5]">
                <img
                  src="/images/doctor_sarah.jpg"
                  alt="Drg. Sarah Wijaya, Sp.Ort"
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-[#1D4333] shadow-xs">
                  Ortodonti
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#202522]">
                    Drg. Sarah Wijaya, Sp.Ort
                  </h3>
                  <p className="text-xs text-[#C85A32] font-medium mt-0.5">
                    Spesialis Ortodonti (Behel Kawat & Clear Aligner)
                  </p>
                </div>
                <p className="text-xs text-[#54625A] leading-relaxed">
                  Fokus pada reposisi maloklusi gigi dan perbaikan profil senyum dengan pendekatan ortodonti estetik presisi.
                </p>
                <div className="pt-2 text-[11px] text-[#7A867E] border-t border-[#EAE4D9]">
                  Jadwal Praktik: <strong>Senin, Rabu, Jumat & Sabtu</strong>
                </div>
              </div>
            </div>

            {/* Doctor 2: Drg. Budi Pratama */}
            <div className="bg-white rounded-3xl border border-[#E3DDD1] shadow-2xs overflow-hidden flex flex-col justify-between">
              <div className="aspect-square relative bg-[#EAE4D9] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#FAF8F5] text-[#202522] flex items-center justify-center font-serif text-3xl font-bold shadow-xs">
                  BP
                </div>
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-[#1D4333] shadow-xs">
                  Umum & Preventif
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#202522]">
                    Drg. Budi Pratama
                  </h3>
                  <p className="text-xs text-[#C85A32] font-medium mt-0.5">
                    Dokter Gigi Umum & Pencegahan
                  </p>
                </div>
                <p className="text-xs text-[#54625A] leading-relaxed">
                  Ahli dalam scaling karang gigi mendalam, deteksi dini karies, serta edukasi kesehatan gusi keluarga.
                </p>
                <div className="pt-2 text-[11px] text-[#7A867E] border-t border-[#EAE4D9]">
                  Jadwal Praktik: <strong>Senin s.d. Sabtu (Pagi - Sore)</strong>
                </div>
              </div>
            </div>

            {/* Doctor 3: Drg. Amanda Lestari, Sp.KG */}
            <div className="bg-white rounded-3xl border border-[#E3DDD1] shadow-2xs overflow-hidden flex flex-col justify-between">
              <div className="aspect-square relative bg-[#EAE4D9] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#FAF8F5] text-[#202522] flex items-center justify-center font-serif text-3xl font-bold shadow-xs">
                  AL
                </div>
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-xs text-[#1D4333] shadow-xs">
                  Konservasi Gigi
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#202522]">
                    Drg. Amanda Lestari, Sp.KG
                  </h3>
                  <p className="text-xs text-[#C85A32] font-medium mt-0.5">
                    Spesialis Konservasi Gigi & Endodonti
                  </p>
                </div>
                <p className="text-xs text-[#54625A] leading-relaxed">
                  Menangani penyelamatan gigi asli lewat perawatan saluran akar mikroskopis dan penambalan komposit estetik.
                </p>
                <div className="pt-2 text-[11px] text-[#7A867E] border-t border-[#EAE4D9]">
                  Jadwal Praktik: <strong>Selasa, Kamis & Sabtu (Siang - Malam)</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. PATIENT JOURNEY / 5-STEP EXPERIENCE */}
        {/* ========================================================================= */}
        <section className="bg-[#FAF8F5] py-20 border-y border-[#E8E2D5] px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                Alur Kunjungan Pasien
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#202522]">
                5 Langkah Mudah Menuju Gigi Sehat
              </h2>
              <p className="text-xs sm:text-sm text-[#616E65]">
                Alur terstruktur sejak Anda memilih slot reservasi hingga kepulangan Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-3">
                <span className="font-serif text-2xl font-bold text-[#C85A32]">01</span>
                <h4 className="font-serif text-sm font-bold text-[#202522]">Booking Online</h4>
                <p className="text-[11px] text-[#54625A] leading-relaxed">
                  Pilih dokter, treatment, tanggal, dan slot jam yang sesuai kebutuhan Anda tanpa perlu antre manual.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-3">
                <span className="font-serif text-2xl font-bold text-[#C85A32]">02</span>
                <h4 className="font-serif text-sm font-bold text-[#202522]">Welcome Lounge</h4>
                <p className="text-[11px] text-[#54625A] leading-relaxed">
                  Tiba di klinik dan disambut staf resepsionis ramah di ruang tunggu nyaman beraroma terapi menenangkan.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-3">
                <span className="font-serif text-2xl font-bold text-[#C85A32]">03</span>
                <h4 className="font-serif text-sm font-bold text-[#202522]">Diagnosa Digital</h4>
                <p className="text-[11px] text-[#54625A] leading-relaxed">
                  Pemeriksaan kamera intraoral dan rontgen digital. Kondisi gigi Anda diperlihatkan secara visual di layar.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-3">
                <span className="font-serif text-2xl font-bold text-[#C85A32]">04</span>
                <h4 className="font-serif text-sm font-bold text-[#202522]">Perawatan Lembut</h4>
                <p className="text-[11px] text-[#54625A] leading-relaxed">
                  Tindakan medis dilakukan di ruang suite privat dengan peralatan steril dan teknik minim rasa ngilu.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-3">
                <span className="font-serif text-2xl font-bold text-[#C85A32]">05</span>
                <h4 className="font-serif text-sm font-bold text-[#202522]">Follow-Up Terjadwal</h4>
                <p className="text-[11px] text-[#54625A] leading-relaxed">
                  Sistem pengingat otomatis akan memberitahu saat tiba waktunya kontrol berkala untuk hasil maksimal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PATIENT STORIES (TESTIMONI DEMO) */}
        {/* ========================================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
              Ulasan Pengunjung
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#202522]">
              Pengalaman Pasien Aruna Dental Studio
            </h2>
            <p className="text-xs text-[#8E9B93]">
              *Testimoni di bawah adalah data peraga demo portfolio untuk mensimulasikan kepuasan layanan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-4">
              <div className="flex text-[#C85A32] text-xs">★★★★★</div>
              <p className="text-xs text-[#54625A] italic leading-relaxed">
                &quot;Biasanya saya selalu panik ke dokter gigi. Di Aruna Dental, ruangannya privat dan tenang sekali. Drg. Sarah menjelaskan kondisi gigi saya lewat monitor sebelum pasang behel.&quot;
              </p>
              <div className="pt-2 border-t border-[#EAE4D9] text-xs">
                <strong className="text-[#202522] block">Siti Nurhaliza I.</strong>
                <span className="text-[#8E9B93] text-[11px]">Pasien Behel Sapphire Estetik</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-4">
              <div className="flex text-[#C85A32] text-xs">★★★★★</div>
              <p className="text-xs text-[#54625A] italic leading-relaxed">
                &quot;Sistem booking online-nya luar biasa nyaman. Pas datang langsung masuk ruangan tanpa nunggu lama. Scaling-nya sangat hati-hati dan bersih.&quot;
              </p>
              <div className="pt-2 border-t border-[#EAE4D9] text-xs">
                <strong className="text-[#202522] block">Dimas Arya P.</strong>
                <span className="text-[#8E9B93] text-[11px]">Pasien Scaling & Pemeriksaan Rutin</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E3DDD1] shadow-2xs space-y-4">
              <div className="flex text-[#C85A32] text-xs">★★★★★</div>
              <p className="text-xs text-[#54625A] italic leading-relaxed">
                &quot;Sangat terbantu dengan jadwal kontrol yang terjadwal. Saya dapat notifikasi WhatsApp pengingat pas aligner sudah waktunya ganti set cetakan.&quot;
              </p>
              <div className="pt-2 border-t border-[#EAE4D9] text-xs">
                <strong className="text-[#202522] block">Anisa Tri R.</strong>
                <span className="text-[#8E9B93] text-[11px]">Pasien Clear Aligner Invisible</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. CLINIC LOCATION, ACCESS & FAQ */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Location & Contact Info */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#E3DDD1] shadow-2xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                  Kunjungi Klinik Kami
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#202522]">
                  Lokasi Strategis di Pusat Jakarta Selatan
                </h3>
                <p className="text-xs text-[#54625A] leading-relaxed">
                  Mudah dijangkau dengan transportasi umum maupun kendaraan pribadi dengan fasilitas valet parkir gratis.
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#4A554F] pt-4 border-t border-[#EAE4D9]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#202522] block">Alamat Studio Demo:</strong>
                    <span>Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan 12190 (Alamat Fiktif)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#202522] block">Jam Praktik Operasional:</strong>
                    <span>Senin - Jumat: 09:00 - 20:00 WIB</span><br />
                    <span>Sabtu: 09:00 - 17:00 WIB</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#202522] block">Layanan Konsultasi WhatsApp:</strong>
                    <a
                      href="https://wa.me/6281234567801?text=Halo%20Aruna%20Dental%20Studio,%20saya%20ingin%20konsultasi%20jadwal%20dan%20layanan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E5631] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>0812-3456-7801 (Chat Langsung)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/booking?source=home"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-xl transition-colors shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Pilih Jam Kunjungan Anda</span>
                </Link>

                <a
                  href="https://wa.me/6281234567801?text=Halo%20Aruna%20Dental%20Studio,%20saya%20ingin%20tanya%20jadwal%20praktik%20dokter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-medium text-[#1E5631] bg-[#E8F8F0] hover:bg-[#D4F1E3] border border-[#BDE0CE] rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick FAQ Accordion / Cards */}
            <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#E3DDD1] shadow-2xs space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                  Informasi Penting
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#202522]">
                  Pertanyaan Seputar Kunjungan Pertama
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] space-y-1.5">
                  <strong className="text-[#202522] font-serif font-bold text-sm block">
                    Apa yang perlu saya siapkan pada kunjungan pertama?
                  </strong>
                  <p className="text-[#54625A] leading-relaxed">
                    Cukup membawa identitas diri dan mengisi formulir booking online. Tim kami akan melakukan pencatatan riwayat kesehatan gigi serta foto rontgen diagnostik bila diperlukan.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] space-y-1.5">
                  <strong className="text-[#202522] font-serif font-bold text-sm block">
                    Apakah saya bisa membatalkan atau mengubah jadwal booking?
                  </strong>
                  <p className="text-[#54625A] leading-relaxed">
                    Tentu. Anda dapat menghubungi hotline WhatsApp demo kami atau staf resepsionis minimal 1 hari sebelumnya agar slot waktu dapat dialihkan dengan rapi.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE4D9] space-y-1.5">
                  <strong className="text-[#202522] font-serif font-bold text-sm block">
                    Bagaimana transparansi biaya di Aruna Dental Studio?
                  </strong>
                  <p className="text-[#54625A] leading-relaxed">
                    Setelah evaluasi visual dan rontgen, dokter akan menyusun opsi rencana tindakan beserta rincian biaya tertulis. Anda bebas memutuskan tanpa ada tekanan keharusan tindakan saat itu juga.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FINAL CALL TO ACTION BANNER */}
        {/* ========================================================================= */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-[#1E2421] text-white p-8 sm:p-14 rounded-3xl text-center space-y-6 relative overflow-hidden">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E5A88B]">
              Aruna Dental Studio
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold max-w-2xl mx-auto leading-tight">
              Mulai Perjalanan Senyum Sehat & Percaya Diri Anda Bersama Kami
            </h2>
            <p className="text-xs sm:text-sm text-[#A2B0A7] max-w-lg mx-auto leading-relaxed">
              Jadwalkan konsultasi awal Anda hari ini. Nikmati ketenangan dan kepastian jadwal tanpa waktu tunggu yang berlarut-larut.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/booking?source=home"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] rounded-xl shadow-xs transition-colors"
              >
                <span>Reservasi Janji Temu Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/6281234567801?text=Halo%20Aruna%20Dental%20Studio,%20saya%20ingin%20konsultasi%20via%20WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-medium text-[#1E5631] bg-[#E8F8F0] hover:bg-[#D4F1E3] rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>Konsultasi WhatsApp</span>
              </a>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
              >
                <span>Demo Admin</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FloatingWhatsApp />
      <PublicFooter />
    </div>
  );
}
