'use server';

import { supabase } from '@/lib/supabase';
import { getUserSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function verifyAccess(restaurantId: string) {
  const session = await getUserSession();
  if (!session || (session.role !== 'SUPER_ADMIN' && session.restaurantId !== restaurantId)) {
    throw new Error('Unauthorized access.');
  }
}

export async function createTable(name: string, restaurantId: string) {
  await verifyAccess(restaurantId);

  if (!name.trim()) return { error: 'Table name is required.' };

  try {
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (!restaurant) return { error: 'Restaurant not found.' };

    // Create table
    const { data: newTable, error: tableError } = await supabase
      .from('tables')
      .insert({
        name: name.trim(),
        restaurant_id: restaurantId,
      })
      .select()
      .single();

    if (tableError || !newTable) {
      console.error(tableError);
      return { error: 'Failed to create table.' };
    }

    // Generate unique token code
    const code = `qr-${restaurant.slug}-${newTable.id.substring(0, 8)}`;
    const { data: qrCode, error: qrError } = await supabase
      .from('qr_codes')
      .insert({
        restaurant_id: restaurantId,
        table_id: newTable.id,
        code,
        url: `/menu/${restaurant.slug}?table=${encodeURIComponent(newTable.name)}`,
      })
      .select()
      .single();

    if (qrError || !qrCode) {
      // rollback table
      await supabase.from('tables').delete().eq('id', newTable.id);
      console.error(qrError);
      return { error: 'Failed to generate QR association.' };
    }

    revalidatePath('/dashboard/tables');
    return {
      success: true,
      table: {
        ...newTable,
        qrCode,
      },
    };
  } catch (e: any) {
    console.error('Create table error:', e);
    return { error: 'Failed to create table.' };
  }
}

export async function bulkCreateTables(prefix: string, startNumber: number, count: number, restaurantId: string) {
  await verifyAccess(restaurantId);

  if (!prefix.trim()) return { error: 'Table prefix is required.' };
  if (isNaN(count) || count <= 0 || count > 50) return { error: 'Please enter a count between 1 and 50.' };

  try {
    const { data: restaurant } = await supabase
      .from('restaurants')
      .select('slug')
      .eq('id', restaurantId)
      .maybeSingle();

    if (!restaurant) return { error: 'Restaurant not found.' };

    for (let i = 0; i < count; i++) {
      const tableName = `${prefix.trim()} ${startNumber + i}`;
      const { data: newTable } = await supabase
        .from('tables')
        .insert({
          name: tableName,
          restaurant_id: restaurantId,
        })
        .select()
        .single();

      if (newTable) {
        const code = `qr-${restaurant.slug}-${newTable.id.substring(0, 8)}`;
        await supabase
          .from('qr_codes')
          .insert({
            restaurant_id: restaurantId,
            table_id: newTable.id,
            code,
            url: `/menu/${restaurant.slug}?table=${encodeURIComponent(tableName)}`,
          });
      }
    }

    revalidatePath('/dashboard/tables');
    return { success: true };
  } catch (e: any) {
    console.error('Bulk create tables error:', e);
    return { error: 'Failed to bulk-create tables.' };
  }
}

export async function deleteTable(id: string, restaurantId: string) {
  await verifyAccess(restaurantId);

  try {
    const { error } = await supabase
      .from('tables')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      return { error: 'Failed to delete table.' };
    }

    revalidatePath('/dashboard/tables');
    return { success: true };
  } catch (e) {
    console.error('Delete table error:', e);
    return { error: 'Failed to delete table.' };
  }
}
