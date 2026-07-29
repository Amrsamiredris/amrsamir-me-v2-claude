-- 1. Create CMS Config Table
CREATE TABLE IF NOT EXISTS public.cms_config (
    key text PRIMARY KEY,
    value text,
    type text NOT NULL DEFAULT 'text', -- 'text', 'boolean', 'textarea'
    description text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Insert default sections visibility and text
INSERT INTO public.cms_config (key, value, type, description) VALUES
('hero_title', 'Amr Samir Edris', 'text', 'Main title on the hero section'),
('hero_subtitle', 'Select a persona below to explore.', 'text', 'Subtitle on the hero section'),
('show_career_timeline', 'true', 'boolean', 'Show or hide the career timeline section'),
('show_contact_form', 'true', 'boolean', 'Show or hide the newsletter/contact section'),
('footer_tagline', 'Building innovative experiences across Events, Marketing, and AI Tech.', 'textarea', 'Tagline in the footer')
ON CONFLICT (key) DO NOTHING;

-- 2. Create Tech Tools Table
CREATE TABLE IF NOT EXISTS public.tech_tools (
    id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    url text,
    description text,
    category text DEFAULT 'General',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Insert some default tools
INSERT INTO public.tech_tools (name, url, description, category) VALUES
('Vite', 'https://vitejs.dev/', 'Frontend build tool', 'Frontend'),
('Supabase', 'https://supabase.com/', 'Backend as a Service (Auth, DB, Storage)', 'Backend'),
('PostHog', 'https://posthog.com/', 'Product analytics', 'Analytics'),
('Formspree', 'https://formspree.io/', 'Form submission handling', 'Services')
ON CONFLICT DO NOTHING;

-- 3. Set up Row Level Security (RLS)

-- Enable RLS
ALTER TABLE public.cms_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tech_tools ENABLE ROW LEVEL SECURITY;

-- CMS Policies
CREATE POLICY "Allow public read access on cms_config"
ON public.cms_config FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to modify cms_config"
ON public.cms_config FOR ALL USING (auth.role() = 'authenticated');

-- Tech Tools Policies
CREATE POLICY "Allow authenticated users to read tech_tools"
ON public.tech_tools FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to modify tech_tools"
ON public.tech_tools FOR ALL USING (auth.role() = 'authenticated');
