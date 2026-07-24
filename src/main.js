import './css/style.css';
import { initNav } from './js/nav.js';
import { initFormWatcher } from './js/form.js';
import { inject } from '@vercel/analytics';

document.addEventListener('DOMContentLoaded', () => {
  inject();
  initNav();
  initFormWatcher();
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
