import { supabase } from '../src/supabaseClient';
import Footer from '../components/Footer';
import PersonaCards from '../components/PersonaCards';

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
      <main id="main-content" className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '40px' }}>
        
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-content">
              <h1 className="hero-subtitle" dangerouslySetInnerHTML={{ __html: getCms('hero_title', 'Amr Samir Edris').replace(/\\n/g, '<br>') }} />
              <p className="hero-desc" dangerouslySetInnerHTML={{ __html: getCms('hero_subtitle', 'Select a persona below to explore.').replace(/\\n/g, '<br>') }} />
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <PersonaCards />
        </section>

        {/* Newsletter Section */}
        {showNewsletter && (
          <section className="section" id="newsletter">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
               <span className="surf-divider" style={{ margin: '0 auto 16px auto' }}></span>
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
