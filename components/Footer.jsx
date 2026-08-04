"use client";

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../src/supabaseClient';

export default function Footer({ settingsData }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const message = formData.get('message');

    const { error: submitError } = await supabase.from('form_submissions').insert([{ email, message, name: 'Contact Form' }]);

    setLoading(false);
    if (submitError) {
      setError(submitError.message);
    } else {
      setSuccess(true);
      e.target.reset();
      setTimeout(() => setSuccess(false), 3000);
    }
  };

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
          color: var(--text-secondary);
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
        </div>

        <div className="footer-col">
          <h3 className="footer-title">Get in Touch</h3>
          <form className="mini-form" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" rows="3" placeholder="How can I help you?" required></textarea>
            {error && <div className="error-msg" style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '8px' }}>{error}</div>}
            {success && <div className="success-msg" style={{ color: '#10b981', fontSize: '0.85rem', marginBottom: '8px' }}>Message sent successfully!</div>}
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        <span className="surf-divider"></span>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Amr Samir Edris. All rights reserved.</p>
      </div>
    </footer>
  );
}
