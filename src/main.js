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
    const { data, error } = await supabase.from('settings').select('*').limit(1).single();
    if (data) {
      if (data.whatsapp) {
        document.querySelectorAll('a[href^="https://wa.me/"]').forEach(el => {
          el.href = `https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`;
        });
      }
      if (data.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
          el.href = `mailto:${data.email}`;
          // If the link text is an email, update it
          if (el.textContent.includes('@')) {
            el.textContent = data.email;
          }
        });
      }
      if (data.linkedin) {
        document.querySelectorAll('a[href*="linkedin.com/in/"]').forEach(el => {
          el.href = data.linkedin;
        });
      }
      if (data.substack) {
        document.querySelectorAll('iframe[src*="substack.com/embed"]').forEach(el => {
          // Keep embed params if needed
          el.src = data.substack + '/embed?transparent=1&light=1';
        });
      }
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
