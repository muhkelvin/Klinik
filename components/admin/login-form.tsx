'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { KeyRound } from 'lucide-react';
import { loginAdminAction } from '@/actions/admin';

interface LoginFormProps {
  defaultEmail: string;
  defaultPassword: string;
}

export function LoginForm({ defaultEmail, defaultPassword }: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginAdminAction(formData);
      if (res?.error) {
        setErrorMessage(res.error);
        toast.error(res.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-3 rounded-lg bg-[#FDF2F2] border border-[#F8B4B4] text-xs text-[#9B1C1C]">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-[#374151]">Email Demo</label>
        <input
          type="email"
          name="email"
          required
          defaultValue={defaultEmail}
          className="mt-1 block w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#374151]">Kata Sandi Demo</label>
        <input
          type="password"
          name="password"
          required
          defaultValue={defaultPassword}
          className="mt-1 block w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D5CDC0] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-2 flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-xs text-sm font-medium text-white bg-[#C85A32] hover:bg-[#B44E28] focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-[#C85A32] transition-colors disabled:opacity-60"
      >
        <KeyRound className="w-4 h-4" />
        <span>{isPending ? 'Memproses...' : 'Masuk Demo Admin'}</span>
      </button>
    </form>
  );
}
