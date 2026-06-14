'use server';

import { supabase } from '@/lib/supabase';
import { hashPassword, comparePassword, setUserSession, clearUserSession } from '@/lib/auth';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function registerRestaurant(prevState: any, formData: FormData) {
  const name = formData.get('restaurantName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'Please fill in all fields.' };
  }

  try {
    // 1. Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      return { error: 'A user with this email already exists.' };
    }

    // 2. Generate slug and ensure uniqueness
    let slug = generateSlug(name);
    const { data: existingSlug } = await supabase
      .from('restaurants')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existingSlug) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const passwordHash = await hashPassword(password);

    // 3. Create restaurant
    const { data: restaurant, error: restError } = await supabase
      .from('restaurants')
      .insert({
        name,
        slug,
        theme_color: '#ef4444',
      })
      .select()
      .single();

    if (restError || !restaurant) {
      console.error('Error creating restaurant:', restError);
      return { error: 'Failed to create restaurant profile.' };
    }

    // 4. Create user
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: passwordHash,
        role: 'RESTAURANT_OWNER',
        restaurant_id: restaurant.id,
      })
      .select()
      .single();

    if (userError || !user) {
      // rollback restaurant creation
      await supabase.from('restaurants').delete().eq('id', restaurant.id);
      console.error('Error creating user:', userError);
      return { error: 'Failed to register owner credentials.' };
    }

    // 5. Create subscription
    const { error: subError } = await supabase
      .from('subscriptions')
      .insert({
        restaurant_id: restaurant.id,
        plan: 'STARTER',
        status: 'ACTIVE',
        price: 0.0,
        billing_cycle: 'monthly',
      });

    if (subError) {
      console.error('Error creating subscription:', subError);
      // Non-blocking but logged
    }

    // 6. Set session
    await setUserSession({
      id: user.id,
      email: user.email,
      role: user.role as 'RESTAURANT_OWNER' | 'SUPER_ADMIN' | 'MANAGER',
      restaurantId: restaurant.id,
      restaurantSlug: restaurant.slug,
    });

    return { success: true, slug: restaurant.slug };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { error: 'Something went wrong during registration.' };
  }
}

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please enter both email and password.' };
  }

  try {
    // Fetch user and joined restaurant
    const { data: user, error } = await supabase
      .from('users')
      .select('*, restaurants(*)')
      .eq('email', email)
      .maybeSingle();

    if (error || !user) {
      return { error: 'Invalid email or password.' };
    }

    const matches = await comparePassword(password, user.password_hash);
    if (!matches) {
      return { error: 'Invalid email or password.' };
    }

    const restaurant = user.restaurants;

    // Set user session
    await setUserSession({
      id: user.id,
      email: user.email,
      role: user.role as any,
      restaurantId: user.restaurant_id,
      restaurantSlug: restaurant?.slug || null,
    });

    return {
      success: true,
      role: user.role,
      slug: restaurant?.slug || null,
    };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong during login.' };
  }
}

export async function logoutUser() {
  await clearUserSession();
}

export async function sendOTP(email: string) {
  if (!email) return { error: 'Email is required' };

  try {
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (!user) return { error: 'No user registered with this email.' };

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // ISO string for supabase timestamp

    await supabase
      .from('users')
      .update({
        otp_code: otpCode,
        otp_expires_at: otpExpiresAt,
      })
      .eq('email', email);

    // Console-log the OTP for testing
    console.log(`\n--- OTP CODE SENT --- \nTo: ${email}\nCode: ${otpCode}\nValid until: ${otpExpiresAt}\n---------------------\n`);

    return { success: true, message: 'OTP sent successfully!' };
  } catch (e) {
    return { error: 'Failed to send OTP code.' };
  }
}

export async function verifyOTP(email: string, code: string) {
  if (!email || !code) return { error: 'Email and verification code are required.' };

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*, restaurants(*)')
      .eq('email', email)
      .maybeSingle();

    if (error || !user || !user.otp_code || !user.otp_expires_at) {
      return { error: 'No OTP code requested.' };
    }

    if (user.otp_code !== code) {
      return { error: 'Invalid verification code.' };
    }

    if (new Date() > new Date(user.otp_expires_at)) {
      return { error: 'Verification code has expired.' };
    }

    // Clear OTP details on success
    await supabase
      .from('users')
      .update({ otp_code: null, otp_expires_at: null })
      .eq('email', email);

    const restaurant = user.restaurants;

    // Login user
    await setUserSession({
      id: user.id,
      email: user.email,
      role: user.role as any,
      restaurantId: user.restaurant_id,
      restaurantSlug: restaurant?.slug || null,
    });

    return { success: true, role: user.role, slug: restaurant?.slug || null };
  } catch (e) {
    return { error: 'Failed to verify OTP.' };
  }
}

export async function requestPasswordReset(email: string) {
  if (!email) return { error: 'Email is required' };

  try {
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (!user) return { error: 'No user found with this email.' };

    // Generate simple token for reset url
    const resetToken = Math.random().toString(36).substring(2, 15);
    const otpExpiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

    await supabase
      .from('users')
      .update({
        otp_code: resetToken,
        otp_expires_at: otpExpiresAt,
      })
      .eq('email', email);

    const resetLink = `/reset-password?email=${encodeURIComponent(email)}&token=${resetToken}`;
    console.log(`\n--- PASSWORD RESET LINK --- \nTo: ${email}\nLink: ${resetLink}\n---------------------------\n`);

    return { success: true, message: 'Password reset link sent! Please check server logs.' };
  } catch (e) {
    return { error: 'Failed to request password reset.' };
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get('email') as string;
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;

  if (!email || !token || !password) {
    return { error: 'All fields are required.' };
  }

  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (!user || user.otp_code !== token || !user.otp_expires_at) {
      return { error: 'Invalid or expired reset token.' };
    }

    if (new Date() > new Date(user.otp_expires_at)) {
      return { error: 'Reset token has expired.' };
    }

    const passwordHash = await hashPassword(password);
    await supabase
      .from('users')
      .update({
        password_hash: passwordHash,
        otp_code: null,
        otp_expires_at: null,
      })
      .eq('email', email);

    return { success: true };
  } catch (e) {
    return { error: 'Failed to reset password.' };
  }
}
