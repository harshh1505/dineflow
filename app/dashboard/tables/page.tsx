import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getUserSession } from '@/lib/auth';
import TableManagerClient from './table-client';

export const revalidate = 0;

export default async function TablesDashboardPage() {
  const session = await getUserSession();
  if (!session || !session.restaurantId) {
    redirect('/login');
  }

  // Fetch the restaurant details
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', session.restaurantId)
    .maybeSingle();

  if (!restaurant) {
    redirect('/login');
  }

  // Fetch tables with their joined qr_codes
  const { data: tables } = await supabase
    .from('tables')
    .select('*, qr_codes(*)')
    .eq('restaurant_id', session.restaurantId)
    .order('created_at', { ascending: true });

  // Map to client contract
  const formattedTables = (tables || []).map((t: any) => ({
    id: t.id,
    name: t.name,
    createdAt: new Date(t.created_at),
    qrCode: t.qr_codes && t.qr_codes.length > 0 ? {
      id: t.qr_codes[0].id,
      code: t.qr_codes[0].code,
      url: t.qr_codes[0].url,
    } : null,
  }));

  // Re-map restaurant details for client
  const formattedRestaurant = {
    id: restaurant.id,
    name: restaurant.name,
    slug: restaurant.slug,
    themeColor: restaurant.theme_color,
    logoUrl: restaurant.logo_url,
  };

  return (
    <div className="space-y-8 animate-slide-up selection:bg-[#F97316] selection:text-white">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Floor Management
        </span>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mt-1">
          Tables & QR Codes
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Add specific dining tables, bulk generate codes, and print high-quality QR codes for display.
        </p>
      </div>

      <TableManagerClient
        initialTables={formattedTables}
        restaurant={formattedRestaurant}
      />
    </div>
  );
}
