import { redirect } from 'next/navigation';
import { getAdminSession, getDemoCredentialsInfo } from '@/lib/auth';
import { LoginForm } from '@/components/admin/login-form';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Login Admin Demo — Klinik Gigi Aruna',
};

export default async function AdminLoginPage() {
  const isAuth = await getAdminSession();
  if (isAuth) {
    redirect('/admin');
  }

  const demoCreds = getDemoCredentialsInfo();

  return (
    <div className="min-h-screen bg-[#F6F2EA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-[#627068] hover:text-[#202522] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Website</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#C85A32] text-white flex items-center justify-center font-serif font-bold text-xl shadow-xs">
            A
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#202522]">
              Aruna Dental Studio
            </h1>
            <p className="text-xs text-[#6B7870]">Portal Operasional & Demo Portfolio</p>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#E3DDD1] rounded-2xl sm:px-10">
          <h2 className="text-lg font-semibold text-[#202522] mb-1">
            Masuk ke Demo Dashboard
          </h2>
          <p className="text-xs text-[#6B7870] mb-6 leading-relaxed">
            Gunakan kredensial demo di bawah ini untuk mengakses simulasi operasional klinik.
          </p>

          <LoginForm
            defaultEmail={demoCreds.email}
            defaultPassword={demoCreds.password}
          />

          {/* Quick Demo Credentials Info Card */}
          <div className="mt-6 pt-5 border-t border-[#EAE4D9]">
            <div className="p-3 bg-[#F8F5EE] rounded-xl border border-[#DFD7C7] text-xs">
              <div className="flex items-center gap-1.5 font-medium text-[#2E3B33] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
                <span>Petunjuk Akses Presentasi Portfolio:</span>
              </div>
              <div className="space-y-0.5 text-[#54625A] text-[11px] font-mono">
                <div>Email: <strong className="text-[#202522]">{demoCreds.email}</strong></div>
                <div>Sandi: <strong className="text-[#202522]">{demoCreds.password}</strong></div>
              </div>
              <p className="text-[10px] text-[#78857E] mt-2 leading-relaxed">
                *Formulir sudah terisi otomatis untuk mempermudah navigasi penilai portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
