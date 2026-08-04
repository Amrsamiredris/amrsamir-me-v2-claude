"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
    }, 1000);
  };

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      position: 'relative', 
      zIndex: 10,
      padding: '40px 20px',
      background: 'var(--bg-primary)'
    }}>
      
      {/* Surfboard Monoline Logo with Stroke-Draw Animation */}
      <motion.svg 
        width="48" height="48" viewBox="0 0 24 24" 
        fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ marginBottom: '1.5rem' }}
      >
        <motion.path 
          d="M12 2C10.5 2 7 7.5 7 14C7 20 9.5 22 12 22C14.5 22 17 20 17 14C17 7.5 13.5 2 12 2Z" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.line 
          x1="12" y1="2" x2="12" y2="22"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.svg>

      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '3rem',
          textAlign: 'center',
          letterSpacing: '-0.03em',
        }}
      >
        Coming Soon
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '32px',
          maxWidth: '900px',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
        
        {/* Left: Contact Card */}
        <div style={{ 
          flex: '1 1 350px',
          padding: '40px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h2 style={{ 
            margin: '0 0 32px 0', 
            fontSize: '1.5rem', 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 500, 
            color: 'var(--text-primary)',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Amr Samir Edris
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="mailto:contact@amrsamir.me" style={{ 
              display: 'flex', alignItems: 'center', gap: '16px',
              color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
              fontFamily: 'var(--font-sans)', fontSize: '0.95rem'
            }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              contact@amrsamir.me
            </a>
            
            <a href="https://wa.me/971507095867" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', alignItems: 'center', gap: '16px',
              color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
              fontFamily: 'var(--font-sans)', fontSize: '0.95rem'
            }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +971 50 709 5867
            </a>
            
            <a href="https://linkedin.com/in/amrsamiredris" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', alignItems: 'center', gap: '16px',
              color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
              fontFamily: 'var(--font-sans)', fontSize: '0.95rem'
            }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              linkedin/amrsamiredris
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div style={{ 
          flex: '1 1 350px',
          padding: '40px', 
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h3 style={{ 
            margin: '0 0 24px 0', 
            fontSize: '1.25rem', 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 500, 
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em'
          }}>
            Get in touch
          </h3>
          
          {formStatus === 'success' ? (
            <div style={{ padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', textAlign: 'center' }}>
              <p>Thank you! Your message has been sent.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  style={{
                    width: '100%', padding: '12px 16px', background: 'var(--bg-primary)', 
                    border: '1px solid var(--border-subtle)', borderRadius: '8px',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: '0.95rem',
                    outline: 'none', transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--text-muted)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  required
                  style={{
                    width: '100%', padding: '12px 16px', background: 'var(--bg-primary)', 
                    border: '1px solid var(--border-subtle)', borderRadius: '8px',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: '0.95rem',
                    outline: 'none', transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--text-muted)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                />
              </div>
              <div>
                <textarea 
                  placeholder="Message" 
                  required
                  rows={4}
                  style={{
                    width: '100%', padding: '12px 16px', background: 'var(--bg-primary)', 
                    border: '1px solid var(--border-subtle)', borderRadius: '8px',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: '0.95rem',
                    outline: 'none', resize: 'vertical', transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--text-muted)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                style={{
                  padding: '12px 24px', background: 'var(--accent)', color: 'white',
                  border: 'none', borderRadius: '8px', fontFamily: 'var(--font-sans)', 
                  fontWeight: 500, fontSize: '0.95rem', cursor: 'pointer', transition: 'opacity 0.2s',
                  marginTop: '8px', opacity: formStatus === 'submitting' ? 0.7 : 1
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </main>
  );
}
