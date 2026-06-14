'use client';

import { useState, useTransition, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { QrCode, Lock, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { resetPassword } from '@/app/actions/auth';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setEmail(searchParams.get('email') || '');
    setToken(searchParams.get('token') || '');
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.append('email', email);
    formData.append('token', token);

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    startTransition(async () => {
      const res = await resetPassword(formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    });
  };

  if (success) {
    return (
      <div className="text-center py-6">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
        <h3 className="text-xl font-bold text-[#111827] mb-2">Password Reset Successful!</h3>
        <p className="text-slate-500 text-xs font-medium">
          Your password has been updated. Redirecting you to the login page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium">
          <span className="w-1 h-1 bg-rose-600 rounded-full shrink-0" />
          {error}
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Email Address (Pre-filled)
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="block w-full px-3 py-2.5 bg-slate-50 border border-[#EAEAEA] rounded-lg text-slate-500 text-xs font-medium"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          New Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
          Confirm New Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs shadow-2xs"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Reset Password <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 px-6 selection:bg-[#F97316] selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
          <div className="bg-[#F97316] p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#111827]">MenuQuick</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Confirm Reset</h2>
        <p className="mt-1.5 text-xs text-slate-500 font-medium">
          Enter your new password to securely finalize changes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-[#EAEAEA] rounded-xl shadow-2xs sm:px-10">
          <Suspense fallback={<div className="text-center py-6 text-slate-500 text-xs font-medium">Loading details...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
