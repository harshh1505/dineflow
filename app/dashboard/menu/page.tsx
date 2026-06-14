import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getUserSession } from '@/lib/auth';
import MenuManagerClient from './menu-client';

export const revalidate = 0;

export default async function MenuDashboardPage() {
  const session = await getUserSession();
  if (!session || !session.restaurantId) {
    redirect('/login');
  }

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('restaurant_id', session.restaurantId)
    .order('sort_order', { ascending: true });

  const categoryIds = (categories || []).map((c: any) => c.id);
  let menuItems: any[] = [];
  
  if (categoryIds.length > 0) {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .in('category_id', categoryIds)
      .order('created_at', { ascending: false });
    menuItems = data || [];
  }

  // Map database snake_case to frontend camelCase contracts
  const formattedCategories = (categories || []).map((c: any) => ({
    id: c.id,
    name: c.name,
    sortOrder: c.sort_order,
    restaurantId: c.restaurant_id,
  }));

  const formattedMenuItems = menuItems.map(i => ({
    id: i.id,
    categoryId: i.category_id,
    name: i.name,
    description: i.description,
    price: Number(i.price),
    imageUrl: i.image_url,
    isAvailable: i.is_available,
    foodType: i.food_type as 'VEG' | 'NON_VEG' | 'JAIN',
    isBestseller: i.is_bestseller,
    prepTime: i.prep_time,
  }));

  return (
    <div className="space-y-8 animate-slide-up selection:bg-[#F97316] selection:text-white">
      <div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Catalog Management
        </span>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight mt-1">
          Menu & Categories
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Add food categories, create menu items, sort order, and toggle stock availability.
        </p>
      </div>

      <MenuManagerClient
        initialCategories={formattedCategories}
        initialMenuItems={formattedMenuItems}
        restaurantId={session.restaurantId}
      />
    </div>
  );
}
