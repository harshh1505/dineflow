'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  QrCode,
  LayoutDashboard,
  UtensilsCrossed,
  TableProperties,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { logoutUser } from '@/app/actions/auth';
import { UserSession } from '@/lib/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState<UserSession | null>(null);

  // Fetch session details on load
  useEffect(() => {
    async function fetchSession() {
      const res = await fetch('/api/session').then((r) => r.json()).catch(() => null);
      if (res?.session) {
        setSession(res.session);
      }
    }
    fetchSession();
  }, [pathname]);

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Menu Items', href: '/dashboard/menu', icon: UtensilsCrossed },
    { name: 'Tables & QRs', href: '/dashboard/tables', icon: TableProperties },
    { name: 'Billing Plan', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Branding Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] flex flex-col md:flex-row selection:bg-[#F97316] selection:text-white font-sans">
      {/* Mobile Header */}
      <header className="md:hidden flex justify-between items-center bg-white border-b border-[#EAEAEA] px-6 py-4 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-[#F97316] p-1.5 rounded-lg text-white">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-lg text-[#111827] tracking-tight">MenuQuick</span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-1.5 rounded-lg bg-white text-slate-500 hover:text-[#111827] border border-[#EAEAEA]"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-[#EAEAEA] flex flex-col justify-between z-50 transform md:translate-x-0 transition-transform duration-300 ease-in-out md:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 flex justify-between items-center border-b border-[#EAEAEA]">
            <div className="flex items-center gap-2">
              <div className="bg-[#F97316] p-1.5 rounded-lg text-white">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-[#111827]">MenuQuick</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-white text-slate-500 border border-[#EAEAEA] hover:text-[#111827]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="py-6 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-6 py-2.5 border-l-2 font-medium text-xs transition-all duration-150 ${
                    isActive
                      ? 'border-[#F97316] text-[#F97316] bg-[#FAFAFA] font-bold'
                      : 'border-transparent text-slate-500 hover:text-[#111827] hover:bg-[#F5F5F5]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info footer */}
        <div className="p-6 border-t border-[#EAEAEA] bg-white">
          {session && (
            <div className="mb-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Partner Account
              </div>
              <div className="font-bold text-xs truncate text-[#111827] mt-1">
                {session.email}
              </div>
              <div className="inline-flex items-center gap-1 bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] rounded-full px-2 py-0.5 text-[10px] font-bold mt-2">
                <ShieldCheck className="w-3 h-3" />
                {session.role === 'SUPER_ADMIN' ? 'Admin' : session.role === 'RESTAURANT_OWNER' ? 'Owner' : 'Manager'}
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 py-2 text-slate-500 hover:text-rose-600 font-bold text-xs transition-colors"
          >
            <LogOut className="w-4 h-4 text-slate-400 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content wrapper */}
      <main className="flex-1 bg-[#FAFAFA] p-6 md:p-10 overflow-y-auto w-full md:max-w-[calc(100vw-16rem)]">
        {/* Mobile slide-drawer overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
          />
        )}
        {children}
      </main>
    </div>
  );
}
