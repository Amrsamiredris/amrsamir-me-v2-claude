import './css/style.css';
import { initParticles } from './js/particles.js';
import { initMarquee } from './js/marquee.js';
import { initRotator } from './js/rotator.js';
import { initScrollReveal, initCounters } from './js/reveal.js';
import { initNav } from './js/nav.js';
import { initFormWatcher } from './js/form.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initMarquee();
  initRotator();
  initScrollReveal();
  initCounters();
  initNav();
  initFormWatcher();
  
  initGSAP();
});

/* ═══════════════════════════════════════════════════════
   GSAP SCROLL ANIMATIONS (progressive enhancement)
   ═══════════════════════════════════════════════════════ */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* Hero name — letter stagger reveal */
  const heroName = document.getElementById('hero-name');
  if (heroName) {
    const allChars = [];

    /* Wrap loose text nodes in spans */
    heroName.childNodes.forEach((node) => {
      if (node.nodeType === 3 && node.textContent.trim()) {
        const wrapper = document.createElement('span');
        wrapper.textContent = '';
        const text = node.textContent;
        for (let i = 0; i < text.length; i++) {
          const ch = document.createElement('span');
          ch.textContent = text[i] === ' ' ? '\u00a0' : text[i];
          ch.style.display = 'inline-block';
          ch.style.opacity = '0';
          ch.style.transform = 'translateY(30px)';
          wrapper.appendChild(ch);
          allChars.push(ch);
        }
        node.replaceWith(wrapper);
      }
    });

    /* Wrap <span> children text into char spans */
    heroName.querySelectorAll('span > span, .gradient-word').forEach((sp) => {
      if (sp.children.length > 0) return;
      const t = sp.textContent;
      sp.textContent = '';
      for (let i = 0; i < t.length; i++) {
        const c = document.createElement('span');
        c.textContent = t[i] === ' ' ? '\u00a0' : t[i];
        c.style.display = 'inline-block';
        c.style.opacity = '0';
        c.style.transform = 'translateY(30px)';
        sp.appendChild(c);
        allChars.push(c);
      }
    });

    if (allChars.length > 0) {
      gsap.to(allChars, {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.035,
        ease: 'power3.out',
        delay: 0.3,
      });
    }
  }

  /* Project cards */
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: i * 0.15,
      ease: 'power3.out',
    });
  });

  /* Stat items */
  gsap.utils.toArray('.stat-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 90%' },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power2.out',
    });
  });

  /* Contact cards */
  gsap.utils.toArray('.contact-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 36,
      opacity: 0,
      scale: 0.96,
      duration: 0.55,
      delay: i * 0.1,
      ease: 'back.out(1.2)',
    });
  });
}
