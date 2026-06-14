import { redirect } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getUserSession } from '@/lib/auth';
import {
  UtensilsCrossed,
  TableProperties,
  QrCode as QrIcon,
  CreditCard,
  ExternalLink,
  Plus,
  Settings,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const revalidate = 0;

export default async function DashboardPage() {
  const session = await getUserSession();
  if (!session || !session.restaurantId) {
    redirect('/login');
  }

  // Fetch restaurant and joined subscription
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*, subscriptions(*)')
    .eq('id', session.restaurantId)
    .maybeSingle();

  if (!restaurant) {
    redirect('/login');
  }

  // Fetch counts
  const { count: catCount } = await supabase
    .from('categories')
    .select('id', { count: 'exact', head: true })
    .eq('restaurant_id', session.restaurantId);

  const { count: tableCount } = await supabase
    .from('tables')
    .select('id', { count: 'exact', head: true })
    .eq('restaurant_id', session.restaurantId);

  const { count: qrCount } = await supabase
    .from('qr_codes')
    .select('id', { count: 'exact', head: true })
    .eq('restaurant_id', session.restaurantId);

  // Fetch category IDs to count items
  const { data: categories } = await supabase
    .from('categories')
    .select('id')
    .eq('restaurant_id', session.restaurantId);

  const categoryIds = (categories || []).map((c: any) => c.id);
  let menuItemsCount = 0;
  
  if (categoryIds.length > 0) {
    const { count } = await supabase
      .from('menu_items')
      .select('id', { count: 'exact', head: true })
      .in('category_id', categoryIds);
    menuItemsCount = count || 0;
  }

  const subscription = restaurant.subscriptions;
  const planName = subscription?.plan || 'STARTER';
  const subStatus = subscription?.status || 'EXPIRED';

  return (
    <div className="space-y-12 animate-slide-up selection:bg-[#F97316] selection:text-white">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Partner Workspace
          </span>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mt-1">
            {restaurant.name}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage your digital menu and table QR distributions.
          </p>
        </div>

        <Link
          href={`/menu/${restaurant.slug}`}
          target="_blank"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#ea580c] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors shadow-2xs"
        >
          View Live Menu <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {/* Subscription Warnings if expired */}
      {subStatus !== 'ACTIVE' && (
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 text-amber-700">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
          <div className="text-xs font-medium">
            <span className="font-bold">Subscription Alert:</span> Your subscription is currently{' '}
            <span className="underline font-semibold">{subStatus.toLowerCase()}</span>. Customers might see limitations on menu items. Please check your billing settings.
          </div>
        </div>
      )}

      {/* Metrics Section (Raw data blocks with generous spacing, borderless) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4 border-y border-[#EAEAEA]">
        {/* Menu Items Count */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Menu Items</span>
          </div>
          <div className="text-3xl font-extrabold text-[#111827] tracking-tight">
            {menuItemsCount}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            Across {catCount || 0} food categories
          </p>
        </div>

        {/* Active Tables Count */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <TableProperties className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Tables</span>
          </div>
          <div className="text-3xl font-extrabold text-[#111827] tracking-tight">
            {tableCount || 0}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            Dining room layout codes
          </p>
        </div>

        {/* Generated QR count */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <QrIcon className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">QR Codes</span>
          </div>
          <div className="text-3xl font-extrabold text-[#111827] tracking-tight">
            {qrCount || 0}
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            Generated codes for print
          </p>
        </div>

        {/* Subscription Status Card */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <CreditCard className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Subscription Plan</span>
          </div>
          <div className="text-xl font-extrabold text-[#111827] tracking-tight uppercase">
            {planName}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-1.5 h-1.5 rounded-full ${subStatus === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              {subStatus.toLowerCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Quick Tools List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Quick Tools</h3>
          
          <div className="bg-white border border-[#EAEAEA] rounded-xl overflow-hidden divide-y divide-[#EAEAEA]">
            <Link
              href="/dashboard/menu"
              className="flex items-center justify-between p-4 hover:bg-[#FAFAFA] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#111827]">Add Menu Item</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Create categories, foods, and toggle stock</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/tables"
              className="flex items-center justify-between p-4 hover:bg-[#FAFAFA] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
                  <TableProperties className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#111827]">Create Table QR</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Bulk create tables and print codes</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/settings"
              className="flex items-center justify-between p-4 hover:bg-[#FAFAFA] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#111827]">Branding & Color</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Choose logo, custom theme colors, and contacts</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/dashboard/billing"
              className="flex items-center justify-between p-4 hover:bg-[#FAFAFA] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#111827]">Manage Subscription</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Upgrade plans to unlock logos and bulk table creation</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Live QR Panel */}
        <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-1">Restaurant QR</h3>
            <p className="text-[10px] text-slate-500 font-medium">Scan code to load the primary menu landing page directly.</p>
            
            <div className="mt-8 flex justify-center bg-[#FAFAFA] p-6 rounded-lg border border-[#EAEAEA] w-full aspect-square max-w-[180px] mx-auto items-center">
              <QrIcon className="w-24 h-24 text-[#F97316]" />
            </div>
          </div>
          
          <Link
            href="/dashboard/tables"
            className="mt-8 w-full bg-[#F5F5F5] hover:bg-[#EAEAEA] text-[#111827] font-bold text-xs py-2.5 rounded-lg text-center block transition-colors"
          >
            Manage Codes
          </Link>
        </div>
      </div>
    </div>
  );
}
