import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Klinik Gigi Aruna Dental Studio — Portfolio Demo',
  description:
    'Sistem klinik gigi terintegrasi: booking janji temu publik, manajemen jadwal dokter, kontrol berkala, dan simulasi reminder WhatsApp. Demo portfolio fiktif.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${sansFont.variable} ${serifFont.variable}`}>
      <body className="font-sans antialiased bg-[#F7F5F0] text-[#202522] min-h-screen flex flex-col selection:bg-[#C85A32] selection:text-white">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
