"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../src/supabaseClient';
import '../../src/admin.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login'); // 'login', 'forgot', 'update', 'request_access'
  const [requestName, setRequestName] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setView('update');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && view !== 'update') window.location.href = '/admin';
    });
  }, [view]);

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

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login',
    });
    
    // Also notify admin
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'password_reset_alert', email })
      });
    } catch (err) {
      console.error('Error sending reset alert', err);
    }

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMsg('Password reset link sent to your email.');
    }
  };

  const handleAccessRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);
    
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'access_request', name: requestName, email, message: requestMessage })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to send request');
      
      setMsg('Access request sent successfully! You will be contacted shortly.');
      setRequestName('');
      setRequestMessage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setMsg('Password updated successfully. Redirecting to admin...');
      setTimeout(() => window.location.href = '/admin', 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-container auth-box" style={{ maxWidth: '400px', width: '100%', padding: '32px' }}>
        <div className="logo" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', color: 'var(--text-primary)' }}>Control Panel</h2>
        
        {view === 'login' && (
          <>
            <p className="subtitle" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)' }}>Secure access required</p>
            <form onSubmit={handleLogin}>
              <div className="input-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="email" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" id="email" required placeholder="you@amrsamir.me" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              </div>
              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="password" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <input type="password" id="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              </div>
              {error && <div className="error-msg" style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
              <button type="submit" className="btn primary-btn" disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '12px' }}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              <button type="button" onClick={() => { setView('forgot'); setError(null); setMsg(null); }} style={{ width: '100%', padding: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Forgot Password?
              </button>
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Don't have an account? </span>
                <button type="button" onClick={() => { setView('request_access'); setError(null); setMsg(null); }} style={{ background: 'transparent', color: 'var(--accent)', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '0.9rem' }}>
                  Request Access
                </button>
              </div>
            </form>
          </>
        )}

        {view === 'forgot' && (
          <>
            <p className="subtitle" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)' }}>Reset your password</p>
            <form onSubmit={handleResetRequest}>
              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="email" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" id="email" required placeholder="you@amrsamir.me" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              </div>
              {error && <div className="error-msg" style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
              {msg && <div className="success-msg" style={{ color: '#10b981', marginBottom: '16px', textAlign: 'center' }}>{msg}</div>}
              <button type="submit" className="btn primary-btn" disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '12px' }}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <button type="button" onClick={() => { setView('login'); setError(null); setMsg(null); }} style={{ width: '100%', padding: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Back to Login
              </button>
            </form>
          </>
        )}

        {view === 'update' && (
          <>
            <p className="subtitle" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)' }}>Update your password</p>
            <form onSubmit={handleUpdatePassword}>
              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="password" style={{ color: 'var(--text-secondary)' }}>New Password</label>
                <input type="password" id="password" required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              </div>
              {error && <div className="error-msg" style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
              {msg && <div className="success-msg" style={{ color: '#10b981', marginBottom: '16px', textAlign: 'center' }}>{msg}</div>}
              <button type="submit" className="btn primary-btn" disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer' }}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </>
        )}

        {view === 'request_access' && (
          <>
            <p className="subtitle" style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-secondary)' }}>Request Admin Access</p>
            <form onSubmit={handleAccessRequest}>
              <div className="input-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="requestName" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" id="requestName" required placeholder="John Doe" value={requestName} onChange={e => setRequestName(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              </div>
              <div className="input-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="email" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" id="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-primary)' }} />
              </div>
              <div className="input-group" style={{ marginBottom: '24px' }}>
                <label htmlFor="requestMessage" style={{ color: 'var(--text-secondary)' }}>Reason for Access</label>
                <textarea id="requestMessage" required rows="3" placeholder="Why do you need access?" value={requestMessage} onChange={e => setRequestMessage(e.target.value)} style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-primary)', fontFamily: 'inherit' }}></textarea>
              </div>
              
              {error && <div className="error-msg" style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
              {msg && <div className="success-msg" style={{ color: '#10b981', marginBottom: '16px', textAlign: 'center' }}>{msg}</div>}
              
              <button type="submit" className="btn primary-btn" disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '12px' }}>
                {loading ? 'Sending...' : 'Send Request'}
              </button>
              <button type="button" onClick={() => { setView('login'); setError(null); setMsg(null); }} style={{ width: '100%', padding: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                Back to Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
