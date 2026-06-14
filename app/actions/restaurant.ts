'use server';

import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';
import { getUserSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function verifyAccess(restaurantId: string) {
  const session = await getUserSession();
  if (!session || (session.role !== 'SUPER_ADMIN' && session.restaurantId !== restaurantId)) {
    throw new Error('Unauthorized access.');
  }
}

export async function updateRestaurantProfile(restaurantId: string, formData: FormData) {
  await verifyAccess(restaurantId);

  const name = formData.get('name') as string;
  const themeColor = formData.get('themeColor') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const address = formData.get('address') as string;
  const logoFile = formData.get('logo') as File | null;

  if (!name.trim()) return { error: 'Restaurant name is required.' };

  try {
    const { data: existing } = await supabase
      .from('restaurants')
      .select('logo_url, slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (!existing) return { error: 'Restaurant not found.' };

    let logoUrl = existing.logo_url || '';
    if (logoFile && logoFile.size > 0) {
      logoUrl = await uploadImage(logoFile, 'logos');
    }

    const contactDetails = {
      phone: phone?.trim() || '',
      email: email?.trim() || '',
      address: address?.trim() || '',
    };

    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .update({
        name: name.trim(),
        theme_color: themeColor,
        logo_url: logoUrl || null,
        contact_details: contactDetails,
      })
      .eq('id', restaurantId)
      .select()
      .single();

    if (error || !restaurant) {
      console.error(error);
      return { error: 'Failed to update restaurant profile.' };
    }

    revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/settings');
    revalidatePath('/dashboard');

    return { success: true, restaurant };
  } catch (e: any) {
    console.error('Update restaurant error:', e);
    return { error: 'Failed to update restaurant profile.' };
  }
}

export async function updateSubscriptionPlan(restaurantId: string, plan: 'STARTER' | 'GROWTH' | 'PREMIUM') {
  await verifyAccess(restaurantId);

  let price = 0;
  if (plan === 'GROWTH') price = 19.0;
  if (plan === 'PREMIUM') price = 49.0;

  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        plan,
        price,
        start_date: new Date().toISOString(),
      })
      .eq('restaurant_id', restaurantId);

    if (error) {
      console.error(error);
      return { error: 'Failed to update subscription plan.' };
    }

    revalidatePath('/dashboard/billing');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (e) {
    console.error('Subscription update error:', e);
    return { error: 'Failed to update subscription plan.' };
  }
}
