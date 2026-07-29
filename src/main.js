import './css/style.css';
import { initNav } from './js/nav.js';
import { initFormWatcher } from './js/form.js';
import { inject } from '@vercel/analytics';
import { supabase } from './supabaseClient.js';
import posthog from 'posthog-js';

// Correct version:
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
});

async function initDynamicSettings() {
  try {
    const { data: settingsData, error: settingsError } = await supabase.from('settings').select('*').limit(1).single();
    if (settingsData) {
      if (settingsData.whatsapp) {
        document.querySelectorAll('a[href^="https://wa.me/"]').forEach(el => {
          el.href = `https://wa.me/${settingsData.whatsapp.replace(/[^0-9]/g, '')}`;
        });
      }
      if (settingsData.linkedin) {
        document.querySelectorAll('a[href*="linkedin.com/in/"]').forEach(el => {
          el.href = settingsData.linkedin;
        });
      }
      if (settingsData.substack) {
        document.querySelectorAll('iframe[src*="substack.com/embed"]').forEach(el => {
          el.src = settingsData.substack + '/embed?transparent=1';
        });
      }
    }

    // Fetch CMS Content
    const { data: cmsData, error: cmsError } = await supabase.from('cms_config').select('*');
    if (cmsData) {
      cmsData.forEach(item => {
        if (item.type === 'font') {
          const fontName = item.value;
          if (fontName) {
            const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@300;400;500;600;700;800&display=swap`;
            let link = document.getElementById(`font-${item.key}`);
            if (!link) {
              link = document.createElement('link');
              link.id = `font-${item.key}`;
              link.rel = 'stylesheet';
              document.head.appendChild(link);
            }
            link.href = fontUrl;
            
            if (item.key === 'font_primary') {
              document.documentElement.style.setProperty('--font-sans', `"${fontName}", sans-serif`);
            } else if (item.key === 'font_secondary') {
              // using it for body or another variable if needed
              document.documentElement.style.setProperty('--font-mono', `"${fontName}", monospace`);
            }
          }
        } else if (item.type === 'color') {
          if (item.key === 'color_accent') {
            document.documentElement.style.setProperty('--primary-accent', item.value);
            // Optional: hex to rgb conversion for glowing effects if --accent-glow expects rgb, but if it expects hex+alpha we can do it simply:
            document.documentElement.style.setProperty('--accent-glow', item.value + '40'); 
          }
        } else if (item.key === 'seo_title') {
          document.title = item.value;
        } else if (item.key === 'seo_description') {
          let meta = document.querySelector('meta[name="description"]');
          if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'description';
            document.head.appendChild(meta);
          }
          meta.content = item.value;
        } else if (item.type === 'boolean') {
          const shouldShow = item.value === 'true';
          const sections = document.querySelectorAll(`[data-cms-section="${item.key}"]`);
          sections.forEach(section => {
            section.style.display = shouldShow ? '' : 'none';
          });
        } else {
          // Replace text/textarea content
          const textNodes = document.querySelectorAll(`[data-cms="${item.key}"]`);
          textNodes.forEach(node => {
            node.innerHTML = item.value.replace(/\n/g, '<br>');
          });
        }
      });
    }

  } catch (err) {
    console.error("Could not fetch settings", err);
  }
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

function initCommandPalette() {
  const html = `
    <div class="cmd-palette-backdrop" id="cmd-backdrop">
      <div class="cmd-palette">
        <input type="text" class="cmd-input" id="cmd-input" placeholder="Search commands... (e.g. 'contact')" autocomplete="off">
        <div class="cmd-results" id="cmd-results">
          <a href="/" class="cmd-item"><span>Home Hub</span><span class="cmd-kbd">↵</span></a>
          <a href="/events/" class="cmd-item"><span>Events Persona</span><span class="cmd-kbd">↵</span></a>
          <a href="/marketing/" class="cmd-item"><span>Marketing Persona</span><span class="cmd-kbd">↵</span></a>
          <a href="/ai/" class="cmd-item"><span>AI & Tech Persona</span><span class="cmd-kbd">↵</span></a>
          <a href="#newsletter" class="cmd-item"><span>Subscribe Newsletter</span><span class="cmd-kbd">↵</span></a>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);

  const backdrop = document.getElementById('cmd-backdrop');
  const input = document.getElementById('cmd-input');
  const items = document.querySelectorAll('.cmd-item');

  function toggle() {
    const isVisible = backdrop.classList.contains('visible');
    if (isVisible) {
      backdrop.classList.remove('visible');
      input.blur();
    } else {
      backdrop.classList.add('visible');
      input.value = '';
      filter('');
      setTimeout(() => input.focus(), 100);
    }
  }

  function filter(query) {
    query = query.toLowerCase();
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      toggle();
    }
    if (e.key === 'Escape' && backdrop.classList.contains('visible')) {
      toggle();
    }
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) toggle();
  });

  input.addEventListener('input', (e) => filter(e.target.value));
}

document.addEventListener('DOMContentLoaded', () => {
  inject();
  initDynamicSettings();
  initNav();
  initFormWatcher();
  initScrollReveal();
  initCommandPalette();
  initRotator();
  initBgAnimation();
  
  // Auto-scroll logic (scrolls down slightly after 3.5s if user hasn't scrolled)
  if (window.location.pathname === '/' || window.location.pathname === '') {
    let hasScrolled = false;
    window.addEventListener('scroll', () => { hasScrolled = true; }, { once: true });
    
    setTimeout(() => {
      if (!hasScrolled && window.scrollY === 0) {
        const target = document.getElementById('main-content');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollBy({ top: window.innerHeight * 0.25, behavior: 'smooth' });
        }
      }
    }, 3500);
  }
});

const TITLES = [
  'Project Manager',
  'Event Coordinator',
  'Marketing Strategist',
  'Show Caller',
  'Stage Manager'
];

function initRotator() {
  const el = document.getElementById('role-text');
  if (!el) return;

  let idx = 0;
  setInterval(() => {
    el.classList.remove('in');
    el.classList.add('out');

    setTimeout(() => {
      idx = (idx + 1) % TITLES.length;
      el.textContent = TITLES[idx];
      el.classList.remove('out');
      el.classList.add('in');
    }, 300);
  }, 2200);
}

function initBgAnimation() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';

  let w, h;
  const dots = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();

  for(let i=0; i<40; i++) {
    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.5
    });
  }

  let isVisible = true;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0 });
  
  // Observe the body or main element to determine if canvas is needed
  // Since it's fixed, we can just let it run unless we want to pause it entirely.
  // Actually, to save battery on mobile, we can throttle the frame rate or pause when not actively scrolling, but a better way is to pause it if they scroll past the hero. 
  // Let's observe the #hero section if it exists, otherwise just observe the top of the body.
  const hero = document.getElementById('hero') || document.body;
  observer.observe(hero);

  function draw() {
    if (!isVisible) {
      requestAnimationFrame(draw);
      return;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0) d.x = w;
      if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h;
      if (d.y > h) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}
