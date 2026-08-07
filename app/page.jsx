import { supabase } from '../src/supabaseClient';
import Footer from '../components/Footer';
import PersonaCards from '../components/PersonaCards';
import AnimatedLogo from '../components/AnimatedLogo';
import AnimatedDivider from '../components/AnimatedDivider';

export const revalidate = 60;

export default async function Home() {
  let cmsData = [];
  let settingsData = null;

  try {
    const [cmsRes, settingsRes] = await Promise.all([
      supabase.from('cms_config').select('*'),
      supabase.from('settings').select('*').limit(1).single()
    ]);
    if (cmsRes.data) cmsData = cmsRes.data;
    if (settingsRes.data) settingsData = settingsRes.data;
  } catch (error) {
    console.error('Error fetching data for Home:', error);
  }
  
  const getCms = (key, defaultVal) => {
    const item = cmsData?.find(d => d.key === key);
    return item ? item.value : defaultVal;
  };

  const showNewsletter = getCms('show_contact_form', 'true') === 'true';

  return (
    <>
      <main id="main-content" className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '40px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <section className="hero" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '40vh', marginTop: '10vh' }}>
          
          <AnimatedLogo />

          <h1 className="hero-subtitle" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-mono)', fontWeight: 500, color: 'var(--ink)', marginBottom: '1rem', letterSpacing: '-0.03em' }} dangerouslySetInnerHTML={{ __html: getCms('hero_title', 'Amr Samir Edris').replace(/\\n/g, '<br>') }} />
          <p className="hero-desc" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-mono)' }}>
            <span dangerouslySetInnerHTML={{ __html: getCms('hero_subtitle', 'Select a persona below to explore.').replace(/\\n/g, '<br>') }} />
            <span className="blinking-cursor">_</span>
          </p>
        </section>

        <style dangerouslySetInnerHTML={{ __html: `
          .blinking-cursor {
            font-family: var(--font-mono);
            font-weight: 700;
            color: var(--accent);
            animation: blink 1s step-end infinite;
            margin-left: 4px;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}} />

        <section className="section" style={{ paddingTop: '40px', flex: 1 }}>
          <h2 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>Personas</h2>
          <PersonaCards />
        </section>

        {/* Newsletter Section */}
        {showNewsletter && (
          <section className="section" id="newsletter" style={{ marginTop: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
               <AnimatedDivider style={{ margin: '0 auto 16px auto' }} />
               <h2 className="section-title">Newsletter</h2>
            </div>
            <div className="contact-form" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Subscribe to my Substack newsletter to get updates across Events, Marketing, and Tech.</p>
              
              <div style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-strong)', background: 'var(--bg-secondary)' }}>
                <iframe 
                  src={`${settingsData?.substack || 'https://amrsamiredris.substack.com'}/embed?transparent=1`} 
                  width="100%" 
                  height="320" 
                  style={{ border: 0, background: 'transparent', maxWidth: '480px' }} 
                  frameBorder="0" 
                  scrolling="no">
                </iframe>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer settingsData={settingsData} />
    </>
  );
}
