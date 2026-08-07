"use client";

import Link from 'next/link';
import AnimatedDivider from './AnimatedDivider';
import ContactForm from './ContactForm';

export default function Footer({ settingsData }) {

  return (
    <footer className="footer">
      <div className="footer-marquee">
        <div className="marquee-content">
          <span>// EVENTS // MARKETING // AI & TECH</span>
          <span>// EVENTS // MARKETING // AI & TECH</span>
          <span>// EVENTS // MARKETING // AI & TECH</span>
          <span>// EVENTS // MARKETING // AI & TECH</span>
          <span>// EVENTS // MARKETING // AI & TECH</span>
          <span>// EVENTS // MARKETING // AI & TECH</span>
        </div>
      </div>
      <style jsx>{`
        .footer-marquee {
          width: 100%;
          overflow: hidden;
          background: var(--bg-secondary);
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          padding: 8px 0;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
        }
        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: scrollMarquee 20s linear infinite;
        }
        .marquee-content span {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-primary);
          padding: 0 16px;
        }
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="container footer-inner">
        <div className="footer-col">
          <h3 className="footer-title">Amr Samir Edris</h3>
          <p className="footer-desc">
            Building innovative experiences across Events, Marketing, and AI Tech.
          </p>
          <p style={{ marginBottom: '12px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
            contact@amrsamir.me
          </p>
          <div className="footer-contact-icons">
            <a href="mailto:contact@amrsamir.me" className="footer-social-btn icon-only" title="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="https://wa.me/971507095867" target="_blank" rel="noopener noreferrer" className="footer-social-btn icon-only" title="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href="https://linkedin.com/in/amrsamiredris" target="_blank" rel="noopener noreferrer" className="footer-social-btn icon-only" title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/events">Events & Project Management</Link></li>
            <li><Link href="/marketing">Marketing</Link></li>
            <li><Link href="/ai">AI & Tech</Link></li>
            <li><Link href="/cv">CV Tracker</Link></li>
          </ul>

          <div style={{ marginTop: '24px' }}>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn secondary-btn" style={{ padding: '10px 16px', fontSize: '0.85rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download Media Kit / CV
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-title">Get in Touch</h3>
          <ContactForm />
        </div>
      </div>
      <div className="container">
        <AnimatedDivider />
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Amr Samir Edris. All rights reserved.</p>
      </div>
    </footer>
  );
}
