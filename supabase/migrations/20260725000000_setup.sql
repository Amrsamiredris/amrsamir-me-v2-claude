-- 1. Create the Settings Table (to hold your contact info)
CREATE TABLE IF NOT EXISTS public.settings (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    whatsapp text,
    email text,
    linkedin text,
    substack text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Insert a default row so you have something to edit
INSERT INTO public.settings (whatsapp, email, linkedin, substack)
VALUES ('+971501234567', 'your@email.com', 'https://linkedin.com/in/yourprofile', 'https://your.substack.com')
ON CONFLICT DO NOTHING;

-- 2. Create the Form Submissions Table
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. Set up Security (Row Level Security)

-- Enable RLS on both tables
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Settings Policies:
-- Anyone can read your contact settings
CREATE POLICY "Allow public read access on settings"
ON public.settings FOR SELECT USING (true);

-- Only authenticated users (YOU) can update settings
CREATE POLICY "Allow authenticated users to update settings"
ON public.settings FOR UPDATE USING (auth.role() = 'authenticated');

-- Form Submissions Policies:
-- Anyone can submit a form (insert)
CREATE POLICY "Allow public insert on form_submissions"
ON public.form_submissions FOR INSERT WITH CHECK (true);

-- Only authenticated users (YOU) can read the form submissions
CREATE POLICY "Allow authenticated users to read form_submissions"
ON public.form_submissions FOR SELECT USING (auth.role() = 'authenticated');
-- Only authenticated users (YOU) can delete form submissions
CREATE POLICY "Allow authenticated users to delete form_submissions"
ON public.form_submissions FOR DELETE USING (auth.role() = 'authenticated');
