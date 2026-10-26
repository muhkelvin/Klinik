import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const isAuth = await getAdminSession();
  if (!isAuth) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-[#F7F5F0]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
