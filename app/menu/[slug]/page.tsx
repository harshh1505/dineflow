import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import CustomerMenuClient from './menu-client';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ table?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('name')
    .eq('slug', resolvedParams.slug)
    .maybeSingle();

  if (!restaurant) {
    return {
      title: 'Menu Not Found',
    };
  }

  return {
    title: `${restaurant.name} - View Live Digital Menu`,
    description: `Browse our delicious selection of freshly prepared courses, view items, pricing, and ingredients online.`,
  };
}

export default async function CustomerMenuPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const slug = resolvedParams.slug;
  const table = resolvedSearchParams.table || '';

  // Fetch restaurant and joined categories
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('*, categories(*)')
    .eq('slug', slug)
    .maybeSingle();

  if (!restaurant) {
    notFound();
  }

  const rawCategories = restaurant.categories || [];
  // Sort categories by sort_order
  const sortedCategories = [...rawCategories].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  const categoryIds = sortedCategories.map(c => c.id);
  let menuItems: any[] = [];

  if (categoryIds.length > 0) {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .in('category_id', categoryIds);
    menuItems = data || [];
  }

  // Extract contact json safely
  const contacts = (restaurant.contact_details as {
    phone?: string;
    email?: string;
    address?: string;
  }) || {};

  // Formatted mappings
  const formattedCategories = sortedCategories.map(c => ({
    id: c.id,
    name: c.name,
    sortOrder: c.sort_order,
  }));

  const formattedMenuItems = menuItems.map(i => ({
    id: i.id,
    categoryId: i.category_id,
    name: i.name,
    description: i.description,
    price: Number(i.price),
    imageUrl: i.image_url,
    foodType: i.food_type as 'VEG' | 'NON_VEG' | 'JAIN',
    isBestseller: i.is_bestseller,
    prepTime: i.prep_time,
    isAvailable: i.is_available,
  }));

  const formattedRestaurant = {
    id: restaurant.id,
    name: restaurant.name,
    slug: restaurant.slug,
    themeColor: restaurant.theme_color,
    logoUrl: restaurant.logo_url,
  };

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col items-center select-none pb-24 selection:bg-[#F97316] selection:text-white">
      {/* Dynamic theme style injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary-menu: ${restaurant.theme_color};
        }
      `}} />

      <CustomerMenuClient
        restaurant={formattedRestaurant}
        categories={formattedCategories}
        menuItems={formattedMenuItems}
        tableContext={table}
        contacts={contacts}
      />
    </div>
  );
}
