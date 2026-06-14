'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { QrCode, Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { requestPasswordReset } from '@/app/actions/auth';

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError('Please provide your email.');
      return;
    }

    startTransition(async () => {
      const res = await requestPasswordReset(email);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setMessage('A reset link has been logged to the server console.');
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 px-6 selection:bg-[#F97316] selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
          <div className="bg-[#F97316] p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform duration-200">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-[#111827]">MenuQuick</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Reset Password</h2>
        <p className="mt-1.5 text-xs text-slate-500 font-medium">
          Enter your email to receive a password reset token
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-[#EAEAEA] rounded-xl shadow-2xs sm:px-10">
          
          {error && (
            <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium">
              <span className="w-1 h-1 bg-rose-600 rounded-full shrink-0" />
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 bg-amber-50 border border-amber-100 text-amber-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors"
                  placeholder="you@example.com"
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
                  Request Reset Link <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-[#EAEAEA] pt-6 text-center text-xs text-slate-500 font-medium">
            Remember your password?{' '}
            <Link href="/login" className="font-bold text-[#F97316] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
