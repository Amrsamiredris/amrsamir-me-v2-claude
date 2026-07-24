import './css/style.css';
import { initNav } from './js/nav.js';
import { initFormWatcher } from './js/form.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFormWatcher();
});
