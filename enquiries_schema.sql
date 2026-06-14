-- Create the enquiries table
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

-- Enable Row Level Security (RLS)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anonymous users) to insert new enquiries
CREATE POLICY "Allow public insert on enquiries" 
  ON public.enquiries
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Allow authenticated users (super admins, if any) to view enquiries
CREATE POLICY "Allow authenticated to view enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (true);
