import { supabase } from '../src/supabaseClient';
import '../src/css/style.css'; // Global CSS

import BackgroundCanvas from '../components/BackgroundCanvas';
import WatermarkBg from '../components/WatermarkBg';
import CommandPalette from '../components/CommandPalette';

export const metadata = {
  title: 'Amr Samir Edris',
  description: 'Building innovative experiences across Events, Marketing, and AI Tech.',
};

export const revalidate = 60; // Revalidate every 60 seconds (Incremental Static Regeneration)

export default async function RootLayout({ children }) {
  // Server-side fetch from Supabase
  let cmsData = [];
  let settingsData = null;

  try {
    const [cmsRes, settingsRes] = await Promise.all([
      supabase.from('cms_config').select('*'),
      supabase.from('settings').select('*').limit(1).single(),
    ]);

    if (cmsRes.data) cmsData = cmsRes.data;
    if (settingsRes.data) settingsData = settingsRes.data;
  } catch (err) {
    console.error('Error fetching layout data:', err);
  }

  // Process CSS variables and fonts
  let customStyle = '';
  let fontLinks = [];
  let seoTitle = metadata.title;
  let seoDesc = metadata.description;

  cmsData.forEach((item) => {
    if (item.type === 'font' && item.value) {
      const fontName = item.value;
      const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`;
      if (!fontLinks.includes(fontUrl)) fontLinks.push(fontUrl);
      
      if (item.key === 'font_primary') {
        customStyle += `--font-sans: "${fontName}", sans-serif;\n`;
      } else if (item.key === 'font_secondary') {
        customStyle += `--font-mono: "${fontName}", monospace;\n`;
      }
    } else if (item.type === 'color') {
      if (item.key === 'color_accent') {
        customStyle += `--primary-accent: ${item.value};\n`;
        customStyle += `--accent-glow: ${item.value}40;\n`;
      }
    } else if (item.key === 'seo_title') {
      seoTitle = item.value;
    } else if (item.key === 'seo_description') {
      seoDesc = item.value;
    }
  });

  // Inject user settings context if needed (e.g. for footer links)
  // For now, pass to client via a script or context if deeply needed, but typically layout can just render it.

  return (
    <html lang="en">
      <head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        {fontLinks.map((url, i) => (
          <link key={i} href={url} rel="stylesheet" />
        ))}
        {customStyle && (
          <style dangerouslySetInnerHTML={{ __html: `:root { \n${customStyle}\n}` }} />
        )}
      </head>
      <body>
        <WatermarkBg />
        <BackgroundCanvas />
        
        {/* Navigation */}
        <nav className="nav">
          <div className="container nav-inner">
            <div className="nav-left">
              <a href="/" className="nav-logo">amrsamir.me</a>
            </div>
          </div>
        </nav>

        {children}

        <CommandPalette />

      </body>
    </html>
  );
}
