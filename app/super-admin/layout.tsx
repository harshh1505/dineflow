'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, ShieldAlert, BarChart3, Store } from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] flex flex-col md:flex-row selection:bg-rose-500 selection:text-white font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-[#EAEAEA] flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-[#EAEAEA] flex items-center gap-2">
            <div className="bg-rose-500 p-1.5 rounded-lg text-white">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight block text-[#111827]">Platform Admin</span>
              <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded uppercase tracking-wider inline-block mt-0.5">
                Super Admin
              </span>
            </div>
          </div>

          <nav className="py-6 space-y-1">
            <Link
              href="/super-admin"
              className="flex items-center gap-3 px-6 py-2.5 border-l-2 border-rose-500 text-rose-550 bg-[#FAFAFA] font-bold text-xs"
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              SaaS Analytics
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 px-6 py-2.5 border-l-2 border-transparent text-slate-500 hover:text-[#111827] hover:bg-[#F5F5F5] font-medium text-xs transition-colors"
            >
              <Store className="w-4 h-4 shrink-0" />
              Landing Page
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-[#EAEAEA] bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-2 text-slate-555 hover:text-rose-600 font-bold text-xs transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-400 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-[#FAFAFA] p-6 md:p-10 overflow-y-auto w-full md:max-w-[calc(100vw-16rem)]">
        {children}
      </main>
    </div>
  );
}
