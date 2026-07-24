/**
 * form.js — Formspree success state watcher
 * Monitors the [data-fs-success] element for visibility changes
 */

export function initFormWatcher() {
  const successEl = document.getElementById('form-success');
  if (!successEl) return;

  const observer = new MutationObserver(() => {
    if (successEl.style.display !== 'none' || successEl.textContent.trim()) {
      successEl.classList.add('visible');
    }
  });

  observer.observe(successEl, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}
