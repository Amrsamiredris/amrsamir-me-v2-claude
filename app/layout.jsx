import { supabase } from '../src/supabaseClient';
import '../src/css/style.css'; // Global CSS

import CommandPalette from '../components/CommandPalette';
import ThemeToggle from '../components/ThemeToggle';
import BackgroundAnimation from '../components/BackgroundAnimation';

import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

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

  // Force accent colors, completely ignoring the CMS.
  let customStyle = `
    --primary-accent: #1E7F8C;
    --accent-glow: #1E7F8C40;
    --primary-accent-dark: #3FB8C4;
    --accent-glow-dark: #3FB8C440;
  `;

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
