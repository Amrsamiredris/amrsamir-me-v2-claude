import { supabase } from './supabaseClient.js';

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginBtn = document.getElementById('login-btn');
const loginLoader = document.getElementById('login-loader');
const logoutBtn = document.getElementById('logout-btn');
const userEmailSpan = document.getElementById('user-email');

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const viewPanels = document.querySelectorAll('.view-panel');

// Settings Elements
const settingsForm = document.getElementById('settings-form');
const settingsLoader = document.getElementById('settings-loader');
const settingsMsg = document.getElementById('settings-msg');

// Inbox Elements
const inboxList = document.getElementById('inbox-list');
const inboxLoader = document.getElementById('inbox-loader');
const inboxEmpty = document.getElementById('inbox-empty');
const refreshInboxBtn = document.getElementById('refresh-inbox');

// Initialization
async function init() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    showDashboard(session.user);
  } else {
    showLogin();
  }

  // Setup Auth State Listener
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      showDashboard(session.user);
    } else {
      showLogin();
    }
  });
}

// Authentication
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  loginBtn.querySelector('span').classList.add('hidden');
  loginLoader.classList.remove('hidden');
  loginError.classList.add('hidden');

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  loginBtn.querySelector('span').classList.remove('hidden');
  loginLoader.classList.add('hidden');

  if (error) {
    loginError.textContent = error.message;
    loginError.classList.remove('hidden');
  }
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
});

// UI State Management
function showLogin() {
  dashboardSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
}

function showDashboard(user) {
  loginSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  userEmailSpan.textContent = user.email;
  userEmailSpan.title = user.email;
  
  // Load initial data
  loadSettings();
  loadInbox();
}

// Navigation
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    viewPanels.forEach(p => p.classList.add('hidden'));
    
    item.classList.add('active');
    document.getElementById(item.dataset.target).classList.remove('hidden');
  });
});

// Load Settings
async function loadSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();
    
  if (data) {
    if (data.whatsapp) document.getElementById('set-whatsapp').value = data.whatsapp;
    if (data.email) document.getElementById('set-email').value = data.email;
    if (data.linkedin) document.getElementById('set-linkedin').value = data.linkedin;
    if (data.substack) document.getElementById('set-substack').value = data.substack;
  }
}

// Save Settings
settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('save-settings-btn');
  btn.querySelector('span').classList.add('hidden');
  settingsLoader.classList.remove('hidden');
  settingsMsg.innerHTML = '';

  const updates = {
    whatsapp: document.getElementById('set-whatsapp').value,
    email: document.getElementById('set-email').value,
    linkedin: document.getElementById('set-linkedin').value,
    substack: document.getElementById('set-substack').value,
    updated_at: new Date().toISOString()
  };

  // We assume there's one row (ID 1 usually, but let's just update based on the single row approach)
  // Actually, we can fetch the existing ID first or upsert.
  // The safest way is an update if it exists.
  const { data: existingData } = await supabase.from('settings').select('id').limit(1).single();

  let result;
  if (existingData) {
    result = await supabase.from('settings').update(updates).eq('id', existingData.id);
  } else {
    result = await supabase.from('settings').insert([updates]);
  }

  btn.querySelector('span').classList.remove('hidden');
  settingsLoader.classList.add('hidden');

  if (result.error) {
    settingsMsg.innerHTML = `<span class="error-msg" style="background:transparent;padding:0;">Error: ${result.error.message}</span>`;
  } else {
    settingsMsg.innerHTML = `<span class="success-msg">Settings saved successfully!</span>`;
    setTimeout(() => { settingsMsg.innerHTML = ''; }, 3000);
  }
});

// Load Inbox
async function loadInbox() {
  inboxLoader.classList.remove('hidden');
  inboxList.classList.add('hidden');
  inboxEmpty.classList.add('hidden');
  inboxList.innerHTML = '';

  const { data, error } = await supabase
    .from('form_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  inboxLoader.classList.add('hidden');

  if (error || !data || data.length === 0) {
    inboxEmpty.classList.remove('hidden');
    return;
  }

  inboxList.classList.remove('hidden');
  
  data.forEach(msg => {
    const li = document.createElement('li');
    li.className = 'message-item';
    
    const date = new Date(msg.created_at).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    li.innerHTML = `
      <div class="msg-header">
        <div>
          <div class="msg-name">${escapeHTML(msg.name)}</div>
          <div class="msg-email"><a href="mailto:${escapeHTML(msg.email)}">${escapeHTML(msg.email)}</a></div>
        </div>
        <div class="msg-date">${date}</div>
      </div>
      <div class="msg-body">
        ${escapeHTML(msg.message).replace(/\n/g, '<br>')}
      </div>
    `;
    inboxList.appendChild(li);
  });
}

refreshInboxBtn.addEventListener('click', loadInbox);

// Helper
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag])
  );
}

// Start
init();
