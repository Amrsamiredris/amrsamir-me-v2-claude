"use client";

import { useState } from 'react';
import { supabase } from '../src/supabaseClient';

export default function ContactForm() {
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
    <form className="mini-form" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" rows="3" placeholder="How can I help you?" required></textarea>
      {error && <div className="error-msg" style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '8px' }}>{error}</div>}
      {success && <div className="success-msg" style={{ color: '#10b981', fontSize: '0.85rem', marginBottom: '8px' }}>Message sent successfully!</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
