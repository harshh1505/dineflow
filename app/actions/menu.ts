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

// CATEGORIES ACTIONS
export async function createCategory(name: string, restaurantId: string) {
  await verifyAccess(restaurantId);
  if (!name.trim()) return { error: 'Category name is required.' };

  try {
    // Get count for sort order
    const { count } = await supabase
      .from('categories')
      .select('id', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId);

    const sortOrder = count || 0;

    const { data: category, error } = await supabase
      .from('categories')
      .insert({
        name: name.trim(),
        restaurant_id: restaurantId,
        sort_order: sortOrder,
      })
      .select()
      .single();

    if (error || !category) {
      console.error(error);
      return { error: 'Failed to create category.' };
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (restaurant) revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/menu');

    return { success: true, category };
  } catch (e: any) {
    return { error: 'Failed to create category.' };
  }
}

export async function updateCategory(id: string, name: string) {
  if (!name.trim()) return { error: 'Category name is required.' };

  try {
    const { data: existing } = await supabase
      .from('categories')
      .select('restaurant_id')
      .eq('id', id)
      .maybeSingle();

    if (!existing) return { error: 'Category not found.' };
    await verifyAccess(existing.restaurant_id);

    const { data: category, error } = await supabase
      .from('categories')
      .update({ name: name.trim() })
      .eq('id', id)
      .select()
      .single();

    if (error || !category) {
      return { error: 'Failed to update category.' };
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', existing.restaurant_id)
      .maybeSingle();

    if (restaurant) revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/menu');

    return { success: true, category };
  } catch (e) {
    return { error: 'Failed to update category.' };
  }
}

export async function deleteCategory(id: string) {
  try {
    const { data: existing } = await supabase
      .from('categories')
      .select('restaurant_id')
      .eq('id', id)
      .maybeSingle();

    if (!existing) return { error: 'Category not found.' };
    await verifyAccess(existing.restaurant_id);

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: 'Failed to delete category.' };
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', existing.restaurant_id)
      .maybeSingle();

    if (restaurant) revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/menu');

    return { success: true };
  } catch (e) {
    return { error: 'Failed to delete category.' };
  }
}

export async function sortCategories(restaurantId: string, orderedIds: string[]) {
  await verifyAccess(restaurantId);

  try {
    // Perform updates in parallel
    await Promise.all(
      orderedIds.map((id, index) =>
        supabase
          .from('categories')
          .update({ sort_order: index })
          .eq('id', id)
      )
    );

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (restaurant) revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/menu');

    return { success: true };
  } catch (e) {
    return { error: 'Failed to reorder categories.' };
  }
}

// MENU ITEMS ACTIONS
export async function createMenuItem(restaurantId: string, formData: FormData) {
  await verifyAccess(restaurantId);

  const categoryId = formData.get('categoryId') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const foodType = formData.get('foodType') as string;
  const isBestseller = formData.get('isBestseller') === 'true';
  const prepTime = parseInt(formData.get('prepTime') as string) || 15;
  const imageFile = formData.get('image') as File | null;

  if (!categoryId || !name || isNaN(price)) {
    return { error: 'Please provide Category, Name, and valid Price.' };
  }

  try {
    let imageUrl = '';
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, 'menu-items');
    }

    const { data: menuItem, error } = await supabase
      .from('menu_items')
      .insert({
        category_id: categoryId,
        name: name.trim(),
        description: description?.trim() || null,
        price,
        image_url: imageUrl || null,
        food_type: foodType,
        is_bestseller: isBestseller,
        prep_time: prepTime,
        is_available: true,
      })
      .select()
      .single();

    if (error || !menuItem) {
      console.error(error);
      return { error: 'Failed to create menu item.' };
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (restaurant) revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/menu');

    return { success: true, menuItem };
  } catch (e: any) {
    console.error('Create menu item error:', e);
    return { error: 'Failed to create menu item.' };
  }
}

export async function updateMenuItem(id: string, restaurantId: string, formData: FormData) {
  await verifyAccess(restaurantId);

  const categoryId = formData.get('categoryId') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const foodType = formData.get('foodType') as string;
  const isBestseller = formData.get('isBestseller') === 'true';
  const isAvailable = formData.get('isAvailable') === 'true';
  const prepTime = parseInt(formData.get('prepTime') as string) || 15;
  const imageFile = formData.get('image') as File | null;

  if (!categoryId || !name || isNaN(price)) {
    return { error: 'Please provide Category, Name, and valid Price.' };
  }

  try {
    const { data: existing } = await supabase
      .from('menu_items')
      .select('image_url')
      .eq('id', id)
      .maybeSingle();

    if (!existing) return { error: 'Menu item not found.' };

    let imageUrl = existing.image_url || '';
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, 'menu-items');
    }

    const { data: menuItem, error } = await supabase
      .from('menu_items')
      .update({
        category_id: categoryId,
        name: name.trim(),
        description: description?.trim() || null,
        price,
        image_url: imageUrl || null,
        food_type: foodType,
        is_bestseller: isBestseller,
        is_available: isAvailable,
        prep_time: prepTime,
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !menuItem) {
      console.error(error);
      return { error: 'Failed to update menu item.' };
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (restaurant) revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/menu');

    return { success: true, menuItem };
  } catch (e) {
    console.error('Update menu item error:', e);
    return { error: 'Failed to update menu item.' };
  }
}

export async function deleteMenuItem(id: string, restaurantId: string) {
  await verifyAccess(restaurantId);

  try {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: 'Failed to delete menu item.' };
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (restaurant) revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/menu');

    return { success: true };
  } catch (e) {
    return { error: 'Failed to delete menu item.' };
  }
}

export async function toggleItemAvailability(id: string, isAvailable: boolean, restaurantId: string) {
  await verifyAccess(restaurantId);

  try {
    const { error } = await supabase
      .from('menu_items')
      .update({ is_available: isAvailable })
      .eq('id', id);

    if (error) {
      return { error: 'Failed to toggle availability.' };
    }

    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (restaurant) revalidatePath(`/menu/${restaurant.slug}`);
    revalidatePath('/dashboard/menu');

    return { success: true };
  } catch (e) {
    return { error: 'Failed to toggle availability.' };
  }
}
