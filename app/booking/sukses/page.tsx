import { PublicNavbar } from '@/components/public/navbar';
import { PublicFooter } from '@/components/public/footer';
import { BookingSuccessView } from '@/components/public/booking-success-view';

export const metadata = {
  title: 'Konfirmasi Booking Berhasil — Aruna Dental Studio',
};

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0]">
      <PublicNavbar />
      <main className="flex-1 py-14 px-4 sm:px-6 flex items-center justify-center">
        <BookingSuccessView />
      </main>
      <PublicFooter />
    </div>
  );
}
