'use client';

import { useState } from 'react';

export default function SubstackForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate Substack API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="newsletter-box glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '16px', fontSize: 'var(--text-xl)' }}>Join the Newsletter</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        Get insights on AI, marketing, and events delivered straight to your inbox.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
        <input 
          type="email" 
          placeholder="Your email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
          style={{ width: '100%', padding: '12px 16px' }}
        />
        <button 
          type="submit" 
          className="btn primary-btn" 
          disabled={status === 'loading'}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {message && (
        <p style={{ marginTop: '16px', color: status === 'success' ? 'var(--accent)' : 'var(--error)' }}>
          {message}
        </p>
      )}
    </div>
  );
}
