import { redirect } from 'next/navigation';
import { getAdminStats, getRestaurantsList } from '@/app/actions/admin';
import { getUserSession } from '@/lib/auth';
import { BarChart3, Store, Utensils, TableProperties, DollarSign } from 'lucide-react';
import SuperAdminClient from './admin-client';

export const revalidate = 0;

export default async function SuperAdminPage() {
  const session = await getUserSession();
  if (!session || session.role !== 'SUPER_ADMIN') {
    redirect('/login');
  }

  // Fetch Platform stats
  const stats = await getAdminStats();

  // Fetch Restaurants tenant list
  const res = await getRestaurantsList();
  const list = res.success && res.list ? res.list : [];

  return (
    <div className="space-y-12 animate-slide-up selection:bg-rose-500 selection:text-white">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest font-sans">
          Platform Overview
        </span>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mt-1 font-sans">
          SaaS Admin Control
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1 font-sans">
          View platform health metrics, monitor tenant databases, and override subscription states.
        </p>
      </div>

      {/* Aggregate Stats (Raw data blocks with generous spacing, borderless) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4 border-y border-[#EAEAEA]">
        {/* Total Tenants */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Store className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Restaurants</span>
          </div>
          <div className="text-3xl font-extrabold text-[#111827] tracking-tight">
            {stats.totalRestaurants}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Registered SaaS tenants</p>
        </div>

        {/* Total Menu Items */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Utensils className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Global Items</span>
          </div>
          <div className="text-3xl font-extrabold text-[#111827] tracking-tight">
            {stats.totalMenuItems}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Menu items platform-wide</p>
        </div>

        {/* Total Tables */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <TableProperties className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Global Tables</span>
          </div>
          <div className="text-3xl font-extrabold text-[#111827] tracking-tight">
            {stats.totalTables}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Table QR configurations</p>
        </div>

        {/* Estimated MRR */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <DollarSign className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Estimated MRR</span>
          </div>
          <div className="text-3xl font-extrabold text-[#111827] tracking-tight">
            ${stats.monthlyRecurringRevenue.toFixed(2)}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Monthly Recurring Revenue</p>
        </div>
      </div>

      {/* Tenant Table Client Editor */}
      <SuperAdminClient initialRestaurants={list as any} />
    </div>
  );
}
