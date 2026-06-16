-- Supabase Database Schema for DineFlow
-- Direct drop-in runnable in Supabase SQL Editor

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing triggers and functions if they exist
DROP TRIGGER IF EXISTS tr_subscription_plans_updated_at ON public.subscription_plans;
DROP TRIGGER IF EXISTS tr_restaurants_updated_at ON public.restaurants;
DROP TRIGGER IF EXISTS tr_restaurant_users_updated_at ON public.restaurant_users;
DROP TRIGGER IF EXISTS tr_restaurant_settings_updated_at ON public.restaurant_settings;
DROP TRIGGER IF EXISTS tr_categories_updated_at ON public.categories;
DROP TRIGGER IF EXISTS tr_menu_items_updated_at ON public.menu_items;
DROP TRIGGER IF EXISTS tr_tables_updated_at ON public.tables;
DROP TRIGGER IF EXISTS tr_qr_codes_updated_at ON public.qr_codes;
DROP TRIGGER IF EXISTS tr_orders_updated_at ON public.orders;
DROP TRIGGER IF EXISTS tr_subscriptions_updated_at ON public.subscriptions;

DROP FUNCTION IF EXISTS public.handle_updated_at();
DROP FUNCTION IF EXISTS public.get_my_role();
DROP FUNCTION IF EXISTS public.get_my_restaurant_id();

-- 1. Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. CREATE TABLES

-- subscription_plans
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- restaurants
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  theme_color TEXT NOT NULL DEFAULT '#FF6B35',
  logo_url TEXT,
  contact_details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- restaurant_users (Profile linked to auth.users)
CREATE TABLE IF NOT EXISTS public.restaurant_users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'restaurant_owner')),
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- restaurant_settings
CREATE TABLE IF NOT EXISTS public.restaurant_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID UNIQUE NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  custom_domain TEXT,
  is_ordering_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- categories
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- menu_items
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image_url TEXT,
  food_type TEXT NOT NULL CHECK (food_type IN ('VEG', 'NON_VEG', 'JAIN')),
  is_bestseller BOOLEAN NOT NULL DEFAULT FALSE,
  prep_time INTEGER NOT NULL DEFAULT 15,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- tables
CREATE TABLE IF NOT EXISTS public.tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- qr_codes
CREATE TABLE IF NOT EXISTS public.qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  table_id UUID UNIQUE NOT NULL REFERENCES public.tables(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- orders
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  table_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('received', 'preparing', 'ready', 'served', 'completed')) DEFAULT 'received',
  cooking_instructions TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('counter', 'upi', 'split')),
  payment_status TEXT NOT NULL CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
  grand_total NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- order_items
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES public.menu_items(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID UNIQUE NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PAST_DUE')) DEFAULT 'ACTIVE',
  price NUMERIC(10, 2) NOT NULL,
  billing_cycle TEXT NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- activity_logs
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- enquiries
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_name TEXT NOT NULL,
  website TEXT,
  poc_name TEXT NOT NULL,
  poc_designation TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  num_tables INTEGER NOT NULL,
  requirements TEXT,
  demo_date TEXT,
  demo_time TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_restaurants_slug ON public.restaurants(slug);
CREATE INDEX IF NOT EXISTS idx_restaurant_users_restaurant ON public.restaurant_users(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_categories_restaurant ON public.categories(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_tables_restaurant ON public.tables(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_table ON public.qr_codes(table_id);
CREATE INDEX IF NOT EXISTS idx_orders_restaurant ON public.orders(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_restaurant ON public.subscriptions(restaurant_id);

-- 4. CREATE UPDATED_AT TRIGGERS
CREATE TRIGGER tr_subscription_plans_updated_at BEFORE UPDATE ON public.subscription_plans FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_restaurants_updated_at BEFORE UPDATE ON public.restaurants FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_restaurant_users_updated_at BEFORE UPDATE ON public.restaurant_users FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_restaurant_settings_updated_at BEFORE UPDATE ON public.restaurant_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_tables_updated_at BEFORE UPDATE ON public.tables FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_qr_codes_updated_at BEFORE UPDATE ON public.qr_codes FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER tr_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 5. SECURITY DEFINER FUNCTIONS FOR RLS (Avoiding recursion)
CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM public.restaurant_users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_my_restaurant_id()
RETURNS UUID AS $$
  SELECT restaurant_id FROM public.restaurant_users WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- 6. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 7. DEFINE ROW LEVEL SECURITY POLICIES

-- subscription_plans policies
CREATE POLICY "Allow public select on plans" ON public.subscription_plans FOR SELECT TO public USING (true);
CREATE POLICY "Allow super_admin all on plans" ON public.subscription_plans FOR ALL TO authenticated USING (public.get_my_role() = 'super_admin');

-- restaurants policies
CREATE POLICY "Allow public select on restaurants" ON public.restaurants FOR SELECT TO public USING (true);
CREATE POLICY "Allow owners to update their own restaurant" ON public.restaurants FOR UPDATE TO authenticated USING (
  id = public.get_my_restaurant_id() OR public.get_my_role() = 'super_admin'
);
CREATE POLICY "Allow super_admin all on restaurants" ON public.restaurants FOR ALL TO authenticated USING (public.get_my_role() = 'super_admin');

-- restaurant_users policies
CREATE POLICY "Allow users to read their own profile" ON public.restaurant_users FOR SELECT TO authenticated USING (
  id = auth.uid() OR public.get_my_role() = 'super_admin'
);
CREATE POLICY "Allow users to insert their own profile during signup" ON public.restaurant_users FOR INSERT TO authenticated WITH CHECK (
  auth.uid() = id
);
CREATE POLICY "Allow users to update their own profile" ON public.restaurant_users FOR UPDATE TO authenticated USING (
  id = auth.uid() OR public.get_my_role() = 'super_admin'
);
CREATE POLICY "Allow super_admin all on profiles" ON public.restaurant_users FOR ALL TO authenticated USING (public.get_my_role() = 'super_admin');

-- restaurant_settings policies
CREATE POLICY "Allow public select on settings" ON public.restaurant_settings FOR SELECT TO public USING (true);
CREATE POLICY "Allow owners to manage settings" ON public.restaurant_settings FOR ALL TO authenticated USING (
  restaurant_id = public.get_my_restaurant_id() OR public.get_my_role() = 'super_admin'
);

-- categories policies
CREATE POLICY "Allow public select on categories" ON public.categories FOR SELECT TO public USING (true);
CREATE POLICY "Allow owners to manage categories" ON public.categories FOR ALL TO authenticated USING (
  restaurant_id = public.get_my_restaurant_id() OR public.get_my_role() = 'super_admin'
);

-- menu_items policies
CREATE POLICY "Allow public select on menu_items" ON public.menu_items FOR SELECT TO public USING (true);
CREATE POLICY "Allow owners to manage menu_items" ON public.menu_items FOR ALL TO authenticated USING (
  category_id IN (
    SELECT id FROM public.categories WHERE restaurant_id = public.get_my_restaurant_id()
  ) OR public.get_my_role() = 'super_admin'
);

-- tables policies
CREATE POLICY "Allow public select on tables" ON public.tables FOR SELECT TO public USING (true);
CREATE POLICY "Allow owners to manage tables" ON public.tables FOR ALL TO authenticated USING (
  restaurant_id = public.get_my_restaurant_id() OR public.get_my_role() = 'super_admin'
);

-- qr_codes policies
CREATE POLICY "Allow public select on qr_codes" ON public.qr_codes FOR SELECT TO public USING (true);
CREATE POLICY "Allow owners to manage qr_codes" ON public.qr_codes FOR ALL TO authenticated USING (
  restaurant_id = public.get_my_restaurant_id() OR public.get_my_role() = 'super_admin'
);

-- orders policies
CREATE POLICY "Allow public insert on orders" ON public.orders FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public select on orders for tracking" ON public.orders FOR SELECT TO public USING (true);
CREATE POLICY "Allow owners to manage orders" ON public.orders FOR ALL TO authenticated USING (
  restaurant_id = public.get_my_restaurant_id() OR public.get_my_role() = 'super_admin'
);

-- order_items policies
CREATE POLICY "Allow public insert on order_items" ON public.order_items FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow public select on order_items" ON public.order_items FOR SELECT TO public USING (true);
CREATE POLICY "Allow owners to manage order_items" ON public.order_items FOR ALL TO authenticated USING (
  order_id IN (
    SELECT id FROM public.orders WHERE restaurant_id = public.get_my_restaurant_id()
  ) OR public.get_my_role() = 'super_admin'
);

-- subscriptions policies
CREATE POLICY "Allow owners to view subscriptions" ON public.subscriptions FOR SELECT TO authenticated USING (
  restaurant_id = public.get_my_restaurant_id() OR public.get_my_role() = 'super_admin'
);
CREATE POLICY "Allow super_admin all on subscriptions" ON public.subscriptions FOR ALL TO authenticated USING (public.get_my_role() = 'super_admin');

-- activity_logs policies
CREATE POLICY "Allow authenticated to write logs" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow owners to read logs" ON public.activity_logs FOR SELECT TO authenticated USING (
  restaurant_id = public.get_my_restaurant_id() OR public.get_my_role() = 'super_admin'
);

-- enquiries policies
CREATE POLICY "Allow public insert on enquiries" ON public.enquiries FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Allow super_admin to read enquiries" ON public.enquiries FOR SELECT TO authenticated USING (public.get_my_role() = 'super_admin');

-- 8. SEED DATA FOR SUBSCRIPTION PLANS
INSERT INTO public.subscription_plans (name, price, features) VALUES
('STARTER', 0.00, ARRAY['Up to 5 tables', 'Standard QR Generation', 'Digital Menu Browser']),
('GROWTH', 19.00, ARRAY['Up to 20 tables', 'Custom Theme Branding', 'Advanced QR Menu Customization', 'E-mail Support']),
('PREMIUM', 49.00, ARRAY['Unlimited tables', 'Custom Domain Branding', 'Priority 24/7 Support', 'Order Feed Analytics Dashboard'])
ON CONFLICT (name) DO NOTHING;
