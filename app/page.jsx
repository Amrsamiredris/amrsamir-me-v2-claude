"use client";

import { useState } from 'react';

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
      padding: '40px 20px'
    }}>
      
      <h1 style={{
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '3rem',
        textAlign: 'center',
        letterSpacing: '-0.02em',
        textTransform: 'uppercase'
      }}>
        Coming Soon
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '32px',
        maxWidth: '900px',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        
        {/* Left: Contact Card */}
        <div className="glass-card" style={{ 
          flex: '1 1 350px',
          padding: '40px', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h2 style={{ 
            margin: '0 0 32px 0', 
            fontSize: '1.75rem', 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            textAlign: 'center'
          }}>
            Amr Samir Edris
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="mailto:contact@amrsamir.me" style={{ 
              display: 'flex', alignItems: 'center', gap: '16px',
              color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
              fontFamily: 'var(--font-mono)', fontSize: '0.95rem'
            }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              contact@amrsamir.me
            </a>
            
            <a href="https://wa.me/971507095867" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', alignItems: 'center', gap: '16px',
              color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
              fontFamily: 'var(--font-mono)', fontSize: '0.95rem'
            }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +971 50 709 5867
            </a>
            
            <a href="https://linkedin.com/in/amrsamiredris" target="_blank" rel="noopener noreferrer" style={{ 
              display: 'flex', alignItems: 'center', gap: '16px',
              color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
              fontFamily: 'var(--font-mono)', fontSize: '0.95rem'
            }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              linkedin/amrsamiredris
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="glass-card" style={{ 
          flex: '1 1 350px',
          padding: '40px', 
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h3 style={{ 
            margin: '0 0 24px 0', 
            fontSize: '1.25rem', 
            fontFamily: 'var(--font-sans)', 
            fontWeight: 500, 
            color: 'var(--text-primary)' 
          }}>
            Get in touch
          </h3>
          
          {formStatus === 'success' ? (
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', textAlign: 'center' }}>
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
                    width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', 
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
                    width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', 
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
                    width: '100%', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', 
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
                  padding: '12px 24px', background: 'var(--text-primary)', color: '#000',
                  border: 'none', borderRadius: '8px', fontFamily: 'var(--font-sans)', 
                  fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', transition: 'opacity 0.2s',
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
      </div>
    </main>
  );
}
