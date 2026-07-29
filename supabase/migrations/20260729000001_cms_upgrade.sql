-- Add new categorization columns
ALTER TABLE public.cms_config
ADD COLUMN IF NOT EXISTS page text DEFAULT 'Global',
ADD COLUMN IF NOT EXISTS group_name text DEFAULT 'General';

-- Update existing rows to have the right pages and groups
UPDATE public.cms_config SET page = 'Home', group_name = 'Hero Section' WHERE key IN ('hero_title', 'hero_subtitle');
UPDATE public.cms_config SET page = 'Global', group_name = 'Footer' WHERE key = 'footer_tagline';
UPDATE public.cms_config SET page = 'Global', group_name = 'Visibility' WHERE key IN ('show_career_timeline', 'show_contact_form');

-- Insert new CMS entries for Theme and SEO
INSERT INTO public.cms_config (key, value, type, description, page, group_name) VALUES
-- Design & Theme
('font_primary', 'Inter', 'font', 'Primary font used for headings', 'Design', 'Typography'),
('font_secondary', 'Inter', 'font', 'Secondary font used for body text', 'Design', 'Typography'),
('color_accent', '#3b82f6', 'color', 'Main accent color for glows and buttons', 'Design', 'Colors'),

-- SEO Metadata (Global)
('seo_title', 'Amr Samir Edris | Portfolio', 'text', 'Global meta title for the website', 'SEO', 'Metadata'),
('seo_description', 'Building innovative experiences across Events, Marketing, and AI Tech.', 'textarea', 'Global meta description', 'SEO', 'Metadata')
ON CONFLICT (key) DO UPDATE SET 
    page = EXCLUDED.page,
    group_name = EXCLUDED.group_name,
    type = EXCLUDED.type;
