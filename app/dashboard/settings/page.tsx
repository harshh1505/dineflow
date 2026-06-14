import { redirect } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getUserSession } from '@/lib/auth';
import SettingsFormClient from './settings-client';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';

export const revalidate = 0;

export default async function SettingsPage() {
  const session = await getUserSession();
  if (!session || !session.restaurantId) {
    redirect('/login');
  }

  // Fetch restaurant
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*, subscriptions(*)')
    .eq('id', session.restaurantId)
    .maybeSingle();

  if (!restaurant) {
    redirect('/login');
  }

  const subscription = restaurant.subscriptions;
  const currentPlan = subscription?.plan || 'STARTER';

  // Tier limitations checks
  const canCustomizeColor = currentPlan === 'GROWTH' || currentPlan === 'PREMIUM';
  const canUploadLogo = currentPlan === 'PREMIUM';

  // Format contacts json helper
  const contactDetails = (restaurant.contact_details as {
    phone?: string;
    email?: string;
    address?: string;
  }) || { phone: '', email: '', address: '' };

  const formattedRestaurant = {
    id: restaurant.id,
    name: restaurant.name,
    slug: restaurant.slug,
    themeColor: restaurant.theme_color,
    logoUrl: restaurant.logo_url,
  };

  return (
    <div className="space-y-8 animate-slide-up max-w-3xl selection:bg-[#F97316] selection:text-white">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
          Configuration Panel
        </span>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mt-1 font-sans">
          Branding Settings
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1 font-sans">
          Set your restaurant logo, custom menu theme color, and customer contact details.
        </p>
      </div>

      {/* Pricing Upgrade warning card */}
      {currentPlan === 'STARTER' && (
        <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg p-5 flex items-start gap-4 text-slate-600">
          <ShieldAlert className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-[#111827] uppercase tracking-wider block">Starter Tier Limitations:</span>
            <p className="leading-relaxed font-medium">
              Custom theme colors and logos are currently locked. Upgrade your subscription plan to **Growth** or **Premium** to unlock dynamic branding.
            </p>
            <Link
              href="/dashboard/billing"
              className="inline-flex items-center gap-0.5 text-[#F97316] hover:underline font-bold mt-2"
            >
              Upgrade Plan <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {currentPlan === 'GROWTH' && (
        <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg p-5 flex items-start gap-4 text-slate-600">
          <ShieldAlert className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-[#111827] uppercase tracking-wider block">Growth Tier Limitations:</span>
            <p className="leading-relaxed font-medium">
              Logo uploading is locked. Upgrade to **Premium** to upload your custom brand logo.
            </p>
            <Link
              href="/dashboard/billing"
              className="inline-flex items-center gap-0.5 text-[#F97316] hover:underline font-bold mt-2"
            >
              Upgrade to Premium <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Branding configurations form */}
      <SettingsFormClient
        restaurant={formattedRestaurant}
        contactDetails={contactDetails}
        canCustomizeColor={canCustomizeColor}
        canUploadLogo={canUploadLogo}
      />
    </div>
  );
}
