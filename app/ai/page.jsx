import Link from 'next/link';
import Footer from '../../components/Footer';
import { supabase } from '../../src/supabaseClient';

export const metadata = {
  title: 'AI & Tech | Amr Samir Edris',
  description: 'AI agents, automation, and tech innovation.',
};

export const revalidate = 60;

export default async function AIPage() {
  const { data: settingsData } = await supabase.from('settings').select('*').limit(1).single();

  return (
    <>
      <main className="container">
        
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-content">

              <h1 className="hero-subtitle">AI & Tech</h1>
              <p className="hero-desc">AI agents, automation, and tech innovation.</p>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <h2 className="section-title">Tech & AI Innovation</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I specialize in bridging the gap between cutting-edge AI capabilities and real-world business applications. My focus is on building intelligent agents, workflow automation, and no-code solutions that multiply human productivity.</p>
              <p>Whether it's deploying conversational AI for customer support or automating internal operations, I build systems that work 24/7.</p>
              <div className="skills-list">
                <span className="skill-item">AI Agents</span>
                <span className="skill-item">Workflow Automation</span>
                <span className="skill-item">LLM Integration</span>
                <span className="skill-item">No-Code/Low-Code</span>
                <span className="skill-item">Prompt Engineering</span>
              </div>
            </div>
            <div>
              <table className="events-table">
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th>Application</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Customer Success</td>
                    <td>24/7 AI Support Agents</td>
                  </tr>
                  <tr>
                    <td>Operations</td>
                    <td>Process Automation</td>
                  </tr>
                  <tr>
                    <td>Sales</td>
                    <td>Lead Qualification Bots</td>
                  </tr>
                  <tr>
                    <td>Marketing</td>
                    <td>Content Generation Pipes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section" id="agentxpo">
          <h2 className="section-title">Highlighted Project</h2>
          <div className="projects-grid">
            
            <article className="project-card reveal visible">
              <div className="project-header">
                <h3 className="project-name">AgentXpo</h3>
                <span className="project-role">Co-Founder & CMO</span>
              </div>
              <p className="project-desc">AgentXpo is a revolutionary platform that empowers businesses to build and deploy custom AI agents without writing a single line of code. We are democratizing access to advanced automation and helping companies scale their operations instantly.</p>
              <div className="project-footer">
                <span className="project-meta">SaaS Platform</span>
                <a href="https://agentxpo.tech/" target="_blank" rel="noopener noreferrer" className="project-link">Visit AgentXpo</a>
              </div>
            </article>

          </div>
        </section>

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
