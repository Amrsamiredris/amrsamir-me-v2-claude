import Link from 'next/link';
import Footer from '../../components/Footer';
import RoleRotator from '../../components/RoleRotator';
import { supabase } from '../../src/supabaseClient';

export const metadata = {
  title: 'Events - Amr Samir Edris',
  description: 'Senior Project Manager',
};

export const revalidate = 60;

export default async function EventsPage() {
  const { data: settingsData } = await supabase.from('settings').select('*').limit(1).single();

  return (
    <>
      <main className="container">
        
        <section className="hero" id="hero">
          <div className="hero-grid">
            <div className="hero-content">
              

              <h1 className="hero-subtitle">Amr Samir Edris</h1>
              
              <RoleRotator />
              
              <p className="hero-desc">
                Delivering mega events and large-scale productions across the UAE and MENA region. COP28, Expo 2020, F1 Abu Dhabi GP.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="cmd-btn">
                  Get in Touch
                </a>
                <a href="#projects" className="cmd-btn" style={{ background: 'transparent', borderColor: 'transparent', textDecoration: 'underline' }}>
                  View Projects
                </a>
              </div>
              
              <div className="hero-socials">
                <a href="mailto:contact@amrsamir.me" title="Email" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
                <a href="https://wa.me/971507095867" target="_blank" rel="noopener noreferrer" title="WhatsApp UAE" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </a>
                <a href="https://linkedin.com/in/amrsamiredris" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>I am a Senior Project Manager with a proven track record of delivering mega events, government productions, and corporate activations across the UAE, Egypt, Kuwait, and the wider MENA region.</p>
              <p>From <strong>COP 28</strong> to <strong>Expo 2020 Dubai</strong>, I own projects end-to-end from brief and concept through budget management, cross-functional team coordination, on-ground execution, and post-event reporting.</p>
              <div className="skills-list">
                <span className="skill-item">Event Production</span>
                <span className="skill-item">Account Management</span>
                <span className="skill-item">Stakeholder Relations</span>
                <span className="skill-item">Budget Control</span>
                <span className="skill-item">Vendor Management</span>
              </div>
            </div>
            <div>
              <table className="events-table">
                <thead>
                  <tr>
                    <th>Selected Events</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>COP 28 Dubai</td>
                    <td>Government / Global</td>
                  </tr>
                  <tr>
                    <td>Expo 2020 Dubai</td>
                    <td>Mega Event</td>
                  </tr>
                  <tr>
                    <td>Formula 1 Abu Dhabi GP</td>
                    <td>Motorsport</td>
                  </tr>
                  <tr>
                    <td>Louvre Abu Dhabi</td>
                    <td>Cultural</td>
                  </tr>
                  <tr>
                    <td>MEFCC 2025</td>
                    <td>Entertainment</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <h2 className="section-title">Active Projects</h2>
          <div className="projects-grid">
            
            <article className="project-card reveal visible">
              <div className="project-header">
                <h3 className="project-name">Sheikh Zayed Summer Festival</h3>
                <span className="project-role">Project Coordinator</span>
              </div>
              <p className="project-desc">End-to-end coordination of one of Abu Dhabi's flagship summer festivals. Overseeing timelines, logistics, registration of up to 2,000 daily attendees, and cross-functional stakeholder management.</p>
              <div className="project-footer">
                <span className="project-meta">Summer 2026</span>
                <span className="project-meta">LINKVIVA</span>
              </div>
            </article>

            <article className="project-card reveal visible">
              <div className="project-header">
                <h3 className="project-name">AgentXpo</h3>
                <span className="project-role">CMO & Co-Founder</span>
              </div>
              <p className="project-desc">Building the future of AI-powered business automation. AgentXpo lets companies build and deploy AI agents in minutes. No code required.</p>
              <div className="project-footer">
                <span className="project-meta">Active Startup</span>
                <a href="https://agentxpo.tech/" target="_blank" rel="noopener noreferrer" className="project-link">agentxpo.tech</a>
              </div>
            </article>

            <div style={{ padding: '24px', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-md)', textAlign: 'center', background: 'var(--bg-secondary)', gridColumn: '1 / -1' }}>
              <span className="surf-divider" style={{ margin: '0 auto 16px auto' }}></span>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Case Studies In Progress</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: '8px' }}>Detailed project outcomes and performance metrics are currently being compiled.</p>
            </div>

          </div>
        </section>

        <section className="section" id="stats">
          <h2 className="section-title">Experience & Stats</h2>
          <div className="stats-grid reveal visible">
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20+</span>
              <span className="stat-label">Major Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Live Productions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$10M+</span>
              <span className="stat-label">Budgets Managed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </section>

        <section className="section" id="contact" style={{ borderBottom: 'none' }}>
          <h2 className="section-title">Contact</h2>
          
          <div className="contact-grid reveal visible">
            <div className="contact-links">
              <a href="mailto:contact@amrsamir.me" className="contact-link-item">
                <span className="cl-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Email:
                </span>
                <span className="cl-value">contact@amrsamir.me</span>
              </a>
              <a href="https://wa.me/971507095867" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <span className="cl-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  WhatsApp
                </span>
                <span className="cl-value" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: 'normal' }}>Message Me</span>
              </a>
            </div>
            
            {/* Embedded form logic handled in Footer or handled here similarly */}
            {/* The contact grid from original HTML is simplified here, user can use the footer form */}
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
