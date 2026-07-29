import os
import re
import glob

directory = "/Users/amrsamiredris/Desktop/amrsamir.me site coming soon "

new_footer = """<footer class="footer">
  <div class="container footer-inner">
    <div class="footer-col">
      <h3 class="footer-title">Amr Samir Edris</h3>
      <p class="footer-desc">
        Building innovative experiences across Events, Marketing, and AI Tech.
      </p>
      <p style="margin-bottom: 12px; color: var(--text-primary); font-family: var(--font-mono); font-size: 0.95rem;">contact@amrsamir.me</p>
      <div class="footer-contact-icons">
        <a href="mailto:contact@amrsamir.me" class="footer-social-btn icon-only" title="Email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
        <a href="https://wa.link/crjfyr" target="_blank" rel="noopener noreferrer" class="footer-social-btn icon-only" title="WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
        <a href="https://linkedin.com/in/amrsamiredris" target="_blank" rel="noopener noreferrer" class="footer-social-btn icon-only" title="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
    
    <div class="footer-col">
      <h3 class="footer-title">Quick Links</h3>
      <ul class="footer-links">
        <li><a href="/">Home</a></li>
        <li><a href="/events/">Events & Project Management</a></li>
        <li><a href="/marketing/">Marketing</a></li>
        <li><a href="/ai/">AI & Tech</a></li>
        <li><a href="/cv/">CV Tracker</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h3 class="footer-title">Get in Touch</h3>
      <form class="mini-form" id="contact-form">
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" rows="3" placeholder="How can I help you?" required></textarea>
        <div id="form-global-error" class="error-msg" style="color: #ef4444; font-size: 0.85rem; margin-bottom: 8px;"></div>
        <div id="form-success" class="success-msg" style="color: #10b981; font-size: 0.85rem; margin-bottom: 8px; display: none;">Message sent successfully!</div>
        <button type="submit" id="submit-btn">Send Message</button>
      </form>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; 2026 Amr Samir Edris. All rights reserved.</p>
  </div>
</footer>"""

new_contact_section = """<div class="contact-links">
        <a href="mailto:contact@amrsamir.me" class="contact-link-item">
          <span class="cl-label">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Email:
          </span>
          <span class="cl-value">contact@amrsamir.me</span>
        </a>
        <a href="https://wa.link/crjfyr" target="_blank" rel="noopener noreferrer" class="contact-link-item">
          <span class="cl-label">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            WhatsApp
          </span>
          <span class="cl-value" style="color:var(--text-muted); font-size:var(--text-sm); font-weight:normal;">Message Me</span>
        </a>
        <a href="https://linkedin.com/in/amrsamiredris" target="_blank" rel="noopener noreferrer" class="contact-link-item">
          <span class="cl-label">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </span>
          <span class="cl-value" style="color:var(--text-muted); font-size:var(--text-sm); font-weight:normal;">Connect</span>
        </a>
      </div>"""

for filepath in glob.glob(directory + '/**/index.html', recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace footer
    pattern_footer = r'<footer class="footer">.*?</footer>'
    content = re.sub(pattern_footer, new_footer, content, flags=re.DOTALL)
    
    # Replace contact-links div if present
    pattern_contact = r'<div class="contact-links">.*?</div>'
    content = re.sub(pattern_contact, new_contact_section, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Updated all footers and contact links.")
