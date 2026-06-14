'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QrCode, Lock, Mail, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { loginUser, sendOTP, verifyOTP } from '@/app/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handlePasswordLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await loginUser(null, formData);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        if (res.role === 'SUPER_ADMIN') {
          router.push('/super-admin');
        } else {
          router.push('/dashboard');
        }
        router.refresh();
      }
    });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    startTransition(async () => {
      const res = await sendOTP(email);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setOtpSent(true);
        setMessage('A verification code has been logged to the server console.');
      }
    });
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!otpCode || otpCode.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    startTransition(async () => {
      const res = await verifyOTP(email, otpCode);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        if (res.role === 'SUPER_ADMIN') {
          router.push('/super-admin');
        } else {
          router.push('/dashboard');
        }
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
        <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">Partner Sign In</h2>
        <p className="mt-1.5 text-xs text-slate-500 font-medium">
          Manage your restaurant menu dashboard and table codes
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-[#EAEAEA] rounded-xl shadow-2xs sm:px-10">
          
          {/* Method Selector */}
          <div className="flex bg-[#F5F5F5] p-1 rounded-lg border border-[#EAEAEA] mb-6 text-xs">
            <button
              onClick={() => {
                setAuthMethod('password');
                setError(null);
                setMessage(null);
              }}
              className={`flex-1 py-1.5 rounded font-bold transition-all ${
                authMethod === 'password'
                  ? 'bg-white text-[#111827] border border-[#EAEAEA] shadow-2xs'
                  : 'text-slate-500 hover:text-[#111827]'
              }`}
            >
              Password Login
            </button>
            <button
              onClick={() => {
                setAuthMethod('otp');
                setError(null);
                setMessage(null);
              }}
              className={`flex-1 py-1.5 rounded font-bold transition-all ${
                authMethod === 'otp'
                  ? 'bg-white text-[#111827] border border-[#EAEAEA] shadow-2xs'
                  : 'text-slate-500 hover:text-[#111827]'
              }`}
            >
              Email OTP
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium">
              <span className="w-1 h-1 bg-rose-600 rounded-full shrink-0" />
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 bg-amber-50 border border-amber-100 text-amber-600 text-xs p-3 rounded-lg flex items-center gap-2 font-medium animate-pulse">
              <span className="w-1 h-1 bg-amber-600 rounded-full shrink-0" />
              {message}
            </div>
          )}

          {authMethod === 'password' ? (
            <form className="space-y-4" onSubmit={handlePasswordLogin}>
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
                    required
                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-[10px] font-bold text-[#F97316] hover:underline">
                    Forgot?
                  </Link>
                </div>
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

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-xs shadow-2xs"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div>
                    <label htmlFor="otp-email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="otp-email"
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
                    className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center text-xs"
                  >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Verification Code'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div>
                    <label htmlFor="otp-code" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                      Enter 6-Digit OTP Code
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        id="otp-code"
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-2.5 bg-white border border-[#EAEAEA] rounded-lg text-[#111827] placeholder-slate-400 text-xs tracking-widest text-center font-mono font-bold"
                        placeholder="000000"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#F97316] hover:bg-[#ea580c] text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center text-xs"
                  >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify and Log In'}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[10px] text-slate-500 hover:text-[#111827] font-bold"
                    >
                      Change Email Address
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          <div className="mt-6 border-t border-[#EAEAEA] pt-6 text-center text-xs text-slate-500 font-medium">
            Don't have a partner account?{' '}
            <Link href="/register" className="font-bold text-[#F97316] hover:underline">
              Register Restaurant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
