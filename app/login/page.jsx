"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../src/supabaseClient';
import '../../src/admin.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) window.location.href = '/admin';
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <div data-theme="classic-black" style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-container auth-box" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="logo" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Control Panel</h2>
        <p className="subtitle" style={{ textAlign: 'center', marginBottom: '24px' }}>Secure access required</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group" style={{ marginBottom: '16px' }}>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required placeholder="you@amrsamir.me" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
          </div>
          <div className="input-group" style={{ marginBottom: '24px' }}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
          </div>
          {error && <div className="error-msg" style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
          <button type="submit" className="btn primary-btn" disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer' }}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
