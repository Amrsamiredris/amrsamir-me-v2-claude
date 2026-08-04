import { supabase } from '../src/supabaseClient';
import '../src/css/style.css'; // Global CSS

import CommandPalette from '../components/CommandPalette';
import ThemeToggle from '../components/ThemeToggle';
import BackgroundAnimation from '../components/BackgroundAnimation';

export const metadata = {
  title: 'Amr Samir Edris',
  description: 'Building innovative experiences across Events, Marketing, and AI Tech.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/site.webmanifest',
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

  // Enforce correct accent colors, ignoring generic blue from CMS if present
  let finalAccentLight = '#1E7F8C';
  let finalAccentDark = '#3FB8C4';
  
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
        // If CMS has a generic blue or something unintended, we still enforce the spec'd teal
        // Otherwise use the CMS value if it's meant to be dynamic, but since we are correcting it:
        if (item.value !== '#0070f3' && item.value !== 'blue' && item.value !== '#1E7F8C') {
           finalAccentLight = item.value; // Trust CMS if it's a completely different custom color
        }
      }
    }
  });

  // Inject the final accent colors
  customStyle += `--primary-accent: ${finalAccentLight};\n`;
  customStyle += `--accent-glow: ${finalAccentLight}40;\n`;
  customStyle += `--primary-accent-dark: ${finalAccentDark};\n`;
  customStyle += `--accent-glow-dark: ${finalAccentDark}40;\n`;

  // Theme Init Script (Blocking FOUC)
  const themeScript = `
    (function() {
      try {
        var localTheme = localStorage.getItem('theme');
        var sysTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (localTheme === 'dark' || (!localTheme && sysTheme)) {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {fontLinks.map((url, i) => (
          <link key={i} href={url} rel="stylesheet" />
        ))}
        {customStyle && (
          <style dangerouslySetInnerHTML={{ __html: `:root { \n${customStyle}\n}` }} />
        )}
      </head>
      <body>
        <ThemeToggle />
        <BackgroundAnimation />
        {/* Navigation Hidden for Coming Soon */}

        {children}

        <CommandPalette />

      </body>
    </html>
  );
}
