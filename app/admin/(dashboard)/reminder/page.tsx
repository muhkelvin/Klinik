import { connection } from 'next/server';
import { getReminders } from '@/lib/db';
import { ReminderView } from '@/components/admin/reminder-view';

export const metadata = {
  title: 'Simulasi Reminder WhatsApp — Aruna Dental Studio',
};

export default async function AdminReminderPage() {
  await connection();
  const reminders = await getReminders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#202522]">
          Outbox Simulasi Reminder WhatsApp
        </h1>
        <p className="text-xs text-[#6B7870] mt-0.5">
          Daftar pengingat terjadwal untuk H-1 janji temu dan tindak lanjut kontrol berkala pasien.
        </p>
      </div>

      <ReminderView reminders={reminders} />
    </div>
  );
}
