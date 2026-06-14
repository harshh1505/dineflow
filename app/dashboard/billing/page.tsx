import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getUserSession } from '@/lib/auth';
import BillingPlansClient from './billing-client';

export const revalidate = 0;

export default async function BillingPage() {
  const session = await getUserSession();
  if (!session || !session.restaurantId) {
    redirect('/login');
  }

  // Fetch subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('restaurant_id', session.restaurantId)
    .maybeSingle();

  return (
    <div className="space-y-8 animate-slide-up selection:bg-[#F97316] selection:text-white">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
          Subscription Center
        </span>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mt-1 font-sans">
          Billing & Plans
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1 font-sans">
          Select or modify your subscription tier. Upgrading instantly unlocks logos and unlimited items.
        </p>
      </div>

      <BillingPlansClient
        restaurantId={session.restaurantId}
        initialPlan={subscription?.plan || 'STARTER'}
        initialStatus={subscription?.status || 'ACTIVE'}
      />
    </div>
  );
}
