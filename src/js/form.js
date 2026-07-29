import { supabase } from '../supabaseClient.js';

export function initFormWatcher() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-global-error');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset states
    if (successEl) successEl.style.display = 'none';
    if (errorEl) errorEl.textContent = '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([{
          name: data.name || data.firstName || 'Anonymous',
          email: data.email,
          message: data.message
        }]);

      if (!error) {
        if (successEl) successEl.style.display = 'block';
        form.reset();
      } else {
        if (errorEl) errorEl.textContent = error.message;
      }
    } catch (error) {
      if (errorEl) errorEl.textContent = 'Oops! There was a network error. Please try again.';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    }
  });
}
