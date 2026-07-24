/**
 * marquee.js — Infinite scrolling event ticker
 * Builds two copies of the event list for seamless CSS-animated loop
 */

const EVENTS = [
  'COP 28 Dubai',
  'COP 27 Sharm El Sheikh',
  'Expo 2020 Dubai',
  'Formula 1 Abu Dhabi GP',
  'Louvre Abu Dhabi',
  'Qasr Al Hosn',
  'MEFCC 2025',
  'EA Sports FC 25',
  'Sheikh Zayed Summer Festival',
  'El Gouna Film Festival',
  'Cairo Film Festival',
  'ANIMINA Abu Dhabi',
  'Open Fire Festival',
  'DEF Game Expo 2026',
  'National Day UAE',
  "Emirati Women's Day",
];

function buildItemSet() {
  const frag = document.createDocumentFragment();
  for (const name of EVENTS) {
    const item = document.createElement('span');
    item.className = 'marquee-item';
    item.innerHTML = `<span class="marquee-sep" aria-hidden="true"></span>${name}`;
    frag.appendChild(item);
  }
  return frag;
}

export function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  track.appendChild(buildItemSet());
  track.appendChild(buildItemSet());
}
