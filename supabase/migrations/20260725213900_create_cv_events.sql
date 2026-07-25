CREATE TABLE IF NOT EXISTS public.cv_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('view', 'download')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.cv_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (anyone can trigger a view/download event)
CREATE POLICY "Allow anonymous inserts to cv_events" 
  ON public.cv_events FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Allow authenticated users to view all cv_events
CREATE POLICY "Allow authenticated users to read cv_events" 
  ON public.cv_events FOR SELECT 
  TO authenticated 
  USING (true);
