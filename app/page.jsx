import { supabase } from '../src/supabaseClient';
import Link from 'next/link';
import Footer from '../components/Footer';

export const revalidate = 60;

export default async function Home() {
  const { data: cmsData } = await supabase.from('cms_config').select('*');
  const { data: settingsData } = await supabase.from('settings').select('*').limit(1).single();

  const getCms = (key, defaultVal) => {
    const item = cmsData?.find(d => d.key === key);
    return item ? item.value : defaultVal;
  };

  const showNewsletter = getCms('show_contact_form', 'true') === 'true';

  return (
    <>
      <main id="main-content" className="container" style={{ marginTop: '100vh', position: 'relative', zIndex: 10, paddingBottom: '40px' }}>
        
        <section className="hero" style={{ borderBottom: 'none', paddingBottom: '40px' }}>
          <div className="hero-grid" style={{ gap: '20px' }}>
            <div className="hero-content">
              <h1 className="hero-subtitle" style={{ fontSize: '2.5rem', marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: getCms('hero_title', 'Amr Samir Edris').replace(/\\n/g, '<br>') }} />
              <p className="hero-desc" style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: getCms('hero_subtitle', 'Select a persona below to explore.').replace(/\\n/g, '<br>') }} />
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0, borderBottom: 'none' }}>
          <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            
            {/* Events Persona */}
            <article className="project-card reveal visible" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px' }}>
              <h3 className="project-name" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Events & Project Management</h3>
              <p className="project-desc" style={{ textAlign: 'center', marginBottom: '32px' }}>Mega events, government productions, and corporate activations.</p>
              <Link href="/events" className="cmd-btn" style={{ textDecoration: 'none' }}>
                Go to Events Page
              </Link>
            </article>

            {/* Marketing Persona */}
            <article className="project-card reveal visible" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px' }}>
              <h3 className="project-name" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Marketing</h3>
              <p className="project-desc" style={{ textAlign: 'center', marginBottom: '32px' }}>Brand strategy, digital growth, and creative campaigns.</p>
              <Link href="/marketing" className="cmd-btn" style={{ textDecoration: 'none' }}>
                Go to Marketing Page
              </Link>
            </article>

            {/* AI & Tech Persona */}
            <article className="project-card reveal visible" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px' }}>
              <h3 className="project-name" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>AI & Tech</h3>
              <p className="project-desc" style={{ textAlign: 'center', marginBottom: '32px' }}>AI agents, automation, and tech innovation.</p>
              <Link href="/ai" className="cmd-btn" style={{ textDecoration: 'none' }}>
                Go to AI & Tech Page
              </Link>
            </article>

          </div>
        </section>

        {/* Newsletter Section */}
        {showNewsletter && (
          <section className="section" id="newsletter">
            <h2 className="section-title">Newsletter</h2>
            <div className="contact-form" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Subscribe to my Substack newsletter to get updates across Events, Marketing, and Tech.</p>
              
              <iframe 
                src={`${settingsData?.substack || 'https://amrsamiredris.substack.com'}/embed?transparent=1`} 
                width="100%" 
                height="320" 
                style={{ border: 0, background: 'transparent', maxWidth: '480px' }} 
                frameBorder="0" 
                scrolling="no">
              </iframe>
            </div>
          </section>
        )}

      </main>

      <Footer settingsData={settingsData} />
    </>
  );
}
