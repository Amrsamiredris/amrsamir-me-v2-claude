/**
 * rotator.js — Rotating role/title badge
 * Cycles through job titles with a vertical slide animation
 */

const TITLES = [
  'Project Manager',
  'Event Coordinator',
  'Social Media Manager',
  'Marketing Strategist',
  'Show Caller',
  'Stage Manager',
  'Programming Manager',
  'Staffing & Registration Manager',
  'Crowd Manager',
  'Account Manager',
];

export function initRotator() {
  const el = document.getElementById('role-text');
  if (!el) return;

  let idx = 0;

  function rotate() {
    el.classList.remove('in');
    el.classList.add('out');

    setTimeout(() => {
      idx = (idx + 1) % TITLES.length;
      el.textContent = TITLES[idx];
      el.classList.remove('out');
      el.classList.add('in');
    }, 300);
  }

  setTimeout(() => {
    setInterval(rotate, 2200);
  }, 1600);
}
