'use server';

import { supabase } from '@/lib/supabase';
import { getUserSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function verifySuperAdmin() {
  const session = await getUserSession();
  if (!session || session.role !== 'SUPER_ADMIN') {
    throw new Error('Unauthorized. Super Admin access only.');
  }
}

export async function getAdminStats() {
  await verifySuperAdmin();

  try {
    const { count: totalRestaurants } = await supabase
      .from('restaurants')
      .select('*', { count: 'exact', head: true });

    const { count: totalMenuItems } = await supabase
      .from('menu_items')
      .select('*', { count: 'exact', head: true });

    const { count: totalTables } = await supabase
      .from('tables')
      .select('*', { count: 'exact', head: true });

    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('price')
      .eq('status', 'ACTIVE');

    const monthlyRecurringRevenue = (subscriptions || []).reduce((acc: number, sub: any) => acc + Number(sub.price || 0), 0);

    return {
      totalRestaurants: totalRestaurants || 0,
      totalMenuItems: totalMenuItems || 0,
      totalTables: totalTables || 0,
      monthlyRecurringRevenue,
    };
  } catch (e) {
    console.error('Error fetching admin stats:', e);
    return {
      totalRestaurants: 0,
      totalMenuItems: 0,
      totalTables: 0,
      monthlyRecurringRevenue: 0,
    };
  }
}

export async function getRestaurantsList() {
  await verifySuperAdmin();

  try {
    const { data: list, error } = await supabase
      .from('restaurants')
      .select(`
        *,
        users (
          id,
          email,
          role
        ),
        subscriptions (*),
        categories (
          id
        ),
        tables (
          id
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      return { error: 'Failed to fetch restaurants.' };
    }

    const formattedList = (list || []).map((r: any) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      createdAt: r.created_at,
      users: r.users || [],
      subscription: r.subscriptions,
      _count: {
        categories: r.categories?.length || 0,
        tables: r.tables?.length || 0,
      },
    }));

    return { success: true, list: formattedList };
  } catch (e) {
    console.error('Error fetching restaurants list:', e);
    return { error: 'Failed to fetch restaurants.' };
  }
}

export async function updateRestaurantSubscriptionStatus(
  restaurantId: string,
  plan: 'STARTER' | 'GROWTH' | 'PREMIUM',
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PAST_DUE'
) {
  await verifySuperAdmin();

  let price = 0;
  if (plan === 'GROWTH') price = 19.0;
  if (plan === 'PREMIUM') price = 49.0;

  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        plan,
        status,
        price,
      })
      .eq('restaurant_id', restaurantId);

    if (error) {
      console.error(error);
      return { error: 'Failed to update subscription.' };
    }

    revalidatePath('/super-admin');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (e) {
    console.error('Error updating subscription:', e);
    return { error: 'Failed to update subscription.' };
  }
}
