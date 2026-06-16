'use server';

import { supabase } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

export async function submitEnquiry(prevState: any, formData: FormData) {
  const restaurantName = formData.get('restaurantName') as string;
  const website = formData.get('website') as string;
  const pocName = formData.get('pocName') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const requirements = formData.get('requirements') as string;
  const numTablesStr = formData.get('numTables') as string;
  const pocDesignation = formData.get('pocDesignation') as string;
  const demoDate = formData.get('demoDate') as string;
  const demoTime = formData.get('demoTime') as string;

  if (!restaurantName || !pocName || !whatsapp || !numTablesStr || !pocDesignation) {
    return { error: 'Please fill in all required fields.' };
  }

  const numTables = parseInt(numTablesStr, 10);
  if (isNaN(numTables) || numTables <= 0) {
    return { error: 'Number of tables must be a positive number.' };
  }

  try {
    console.log("Submitting enquiry", formData);

    const { data, error } = await supabase
      .from("enquiries")
      .insert([
        {
          restaurant_name: restaurantName,
          website: website || null,
          poc_name: pocName,
          poc_designation: pocDesignation,
          whatsapp: whatsapp,
          num_tables: numTables,
          requirements: requirements || null,
          demo_date: demoDate || null,
          demo_time: demoTime || null
        }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return { error: 'Failed to submit enquiry. Please try again.' };
    }

    console.log("Inserted enquiry:", data);

    revalidatePath('/');
    return {
      success: true,
      message: "Enquiry submitted successfully"
    };
  } catch (error: any) {
    console.error('Enquiry submittal error:', error);
    return { error: 'Something went wrong during submission.' };
  }
}
