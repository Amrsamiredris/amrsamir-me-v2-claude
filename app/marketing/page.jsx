import Link from 'next/link';
import Footer from '../../components/Footer';
import { supabase } from '../../src/supabaseClient';

export const metadata = {
  title: 'Marketing | Amr Samir Edris',
  description: 'Brand strategy, digital growth, and creative campaigns.',
};

export const revalidate = 60;

export default async function MarketingPage() {
  const { data: settingsData } = await supabase.from('settings').select('*').limit(1).single();
  const { data: cmsData } = await supabase.from('cms_config').select('*');

  const getCms = (key, defaultVal) => {
    const item = cmsData?.find(d => d.key === key);
    return item ? item.value : defaultVal;
  };

  const showCareerTimeline = getCms('show_career_timeline', 'true') === 'true';

  return (
    <>
      <main className="container">
        
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="ascii-container">
                <pre className="ascii-art">
                  {`  ██████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗ ██████╗    ███████╗ ██████╗  ██████╗ ███╗   ██╗
 ██╔════╝██╔═══██╗████╗ ████║██║████╗  ██║██╔════╝    ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║
 ██║     ██║   ██║██╔████╔██║██║██╔██╗ ██║██║  ███╗   ███████╗██║   ██║██║   ██║██╔██╗ ██║
 ██║     ██║   ██║██║╚██╔╝██║██║██║╚██╗██║██║   ██║   ╚════██║██║   ██║██║   ██║██║╚██╗██║
 ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║██║ ╚████║╚██████╔╝   ███████║╚██████╔╝╚██████╔╝██║ ╚████║
  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝`}
                </pre>
              </div>
              <h1 className="hero-subtitle">Marketing</h1>
              <p className="hero-desc">Brand strategy, digital growth, and creative campaigns.</p>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <h2 className="section-title">About</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I develop comprehensive brand strategies and digital growth campaigns that turn attention into measurable results. From data-driven performance marketing to viral creative campaigns, I bridge the gap between creative vision and business objectives.</p>
              <p>With experience scaling startups and running campaigns for major corporate clients, I know how to craft a narrative that resonates.</p>
              <div className="skills-list">
                <span className="skill-item">Brand Strategy</span>
                <span className="skill-item">Performance Marketing</span>
                <span className="skill-item">Content Creation</span>
                <span className="skill-item">SEO / SEM</span>
                <span className="skill-item">Analytics</span>
              </div>
            </div>
            <div>
              <table className="events-table">
                <thead>
                  <tr>
                    <th>Core Services</th>
                    <th>Focus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Go-to-Market Strategy</td>
                    <td>Startups & New Products</td>
                  </tr>
                  <tr>
                    <td>Growth Hacking</td>
                    <td>User Acquisition</td>
                  </tr>
                  <tr>
                    <td>Event Marketing</td>
                    <td>Live & Experiential</td>
                  </tr>
                  <tr>
                    <td>Brand Positioning</td>
                    <td>Market Authority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <h2 className="section-title">Campaigns & Case Studies</h2>
          <div className="projects-grid">
            
            <article className="project-card reveal visible">
              <div className="project-header">
                <h3 className="project-name">AgentXpo Launch</h3>
                <span className="project-role">CMO</span>
              </div>
              <p className="project-desc">Led the full go-to-market strategy for AgentXpo. Built the brand identity from scratch, established the initial user acquisition funnel, and drove early beta signups through targeted LinkedIn outreach and content marketing.</p>
              <div className="project-footer">
                <span className="project-meta">Tech Startup</span>
                <a href="https://agentxpo.tech/" target="_blank" rel="noopener noreferrer" className="project-link">View Case Study</a>
              </div>
            </article>

            <article className="project-card reveal visible">
              <div className="project-header">
                <h3 className="project-name">Mega Event Digital Amplification</h3>
                <span className="project-role">Lead Strategist</span>
              </div>
              <p className="project-desc">Designed and executed the digital amplification strategy for a major government event. Coordinated influencers, managed paid social spend, and tracked real-time sentiment analysis during the event lifecycle.</p>
              <div className="project-footer">
                <span className="project-meta">Live Event</span>
                <span className="project-meta">Confidential</span>
              </div>
            </article>

          </div>
        </section>

        {showCareerTimeline && (
          <section className="section" id="timeline">
            <h2 className="section-title reveal visible">Career Timeline</h2>
            <div className="timeline reveal visible">
              
              <div className="timeline-item">
                <span className="timeline-date">2024 - Present</span>
                <h3 className="timeline-title">Chief Marketing Officer @ AgentXpo</h3>
                <p className="timeline-desc">Spearheading digital growth, brand positioning, and go-to-market strategies for AI-driven tech products.</p>
              </div>

              <div className="timeline-item">
                <span className="timeline-date">2021 - 2024</span>
                <h3 className="timeline-title">Lead Digital Strategist</h3>
                <p className="timeline-desc">Designed omnichannel campaigns and managed performance marketing budgets for high-profile government events and activations.</p>
              </div>

              <div className="timeline-item">
                <span className="timeline-date">2018 - 2021</span>
                <h3 className="timeline-title">Event Marketing Manager</h3>
                <p className="timeline-desc">Oversaw end-to-end promotional strategies for large-scale corporate conferences, driving record attendance metrics.</p>
              </div>

            </div>
          </section>
        )}

        <section className="section" id="contact" style={{ borderBottom: 'none' }}>
          <h2 className="section-title">Contact</h2>
          
          <div className="contact-grid reveal visible">
            <div className="contact-links">
              <a href={`mailto:${settingsData?.email || 'contact@amrsamir.me'}`} className="contact-link-item">
                <span className="cl-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Email:
                </span>
                <span className="cl-value">{settingsData?.email || 'contact@amrsamir.me'}</span>
              </a>
              <a href={settingsData?.whatsapp ? `https://wa.me/${settingsData.whatsapp.replace(/[^0-9]/g, '')}` : "https://wa.link/crjfyr"} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="cl-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  WhatsApp
                </span>
                <span className="cl-value" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: 'normal' }}>Message Me</span>
              </a>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>Or use the form in the footer below.</p>
            </div>
          </div>
        </section>

      </main>

      <Footer settingsData={settingsData} />
    </>
  );
}
