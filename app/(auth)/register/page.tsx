'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QrCode, Lock, Mail, ArrowRight, Loader2, Store } from 'lucide-react';
import { registerRestaurant } from '@/app/actions/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await registerRestaurant(null, formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success && res.slug) {
        router.push('/dashboard');
        router.refresh();
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
        <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Onboard Your Restaurant</h2>
        <p className="mt-1.5 text-xs text-slate-500 font-medium">
          Create your digital menu and table QR codes in minutes
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

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="restaurantName" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Restaurant Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Store className="w-4 h-4" />
                </div>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors"
                  placeholder="The Gourmet Kitchen"
                />
              </div>
            </div>

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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors"
                  placeholder="owner@myrestaurant.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
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

            <div className="text-[10px] text-slate-500 leading-relaxed font-medium">
              By signing up, you agree to our Terms of Service and Privacy Policy. You will be registered on our free Starter Plan automatically.
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
                  Create Account & Continue <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-[#EAEAEA] pt-6 text-center text-xs text-slate-500 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#F97316] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
