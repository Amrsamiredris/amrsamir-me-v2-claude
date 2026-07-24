/**
 * form.js — Custom Formspree submission handler
 * Uses application/json to bypass Formspree's "File Uploads Not Permitted" error
 * which happens when using FormData (multipart/form-data) on a free plan.
 */

export function initFormWatcher() {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-global-error');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset states
    successEl.classList.remove('visible');
    errorEl.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/mdaqwvek', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        successEl.classList.add('visible');
        form.reset();
      } else {
        const result = await response.json();
        if (Object.hasOwn(result, 'errors')) {
          errorEl.textContent = result.errors.map(err => err.message).join(', ');
        } else {
          errorEl.textContent = 'Oops! There was a problem submitting your form.';
        }
      }
    } catch (error) {
      errorEl.textContent = 'Oops! There was a network error. Please try again.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
