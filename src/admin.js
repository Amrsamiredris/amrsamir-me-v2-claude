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

// Theme & Analytics Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const overviewInboxCount = document.getElementById('overview-inbox-count');
const analyticsUrlInput = document.getElementById('set-analytics-url');
const saveAnalyticsBtn = document.getElementById('save-analytics-btn');
const analyticsIframe = document.getElementById('analytics-iframe');
const noAnalyticsMsg = document.getElementById('no-analytics-msg');

// CV Tracker Elements
const cvCompanyInput = document.getElementById('cv-company');
const generateCvBtn = document.getElementById('generate-cv-link-btn');
const cvLinkResult = document.getElementById('cv-link-result');
const cvGeneratedUrl = document.getElementById('cv-generated-url');
const refreshCvStatsBtn = document.getElementById('refresh-cv-stats');
const cvStatsBody = document.getElementById('cv-stats-body');

// User Management Elements
const inviteForm = document.getElementById('invite-form');
const inviteEmailInput = document.getElementById('invite-email');
const inviteRoleSelect = document.getElementById('invite-role');
const inviteLoader = document.getElementById('invite-loader');
const inviteMsg = document.getElementById('invite-msg');
const sendInviteBtn = document.getElementById('send-invite-btn');
const usersRolesBody = document.getElementById('users-roles-body');

// Initialization
async function init() {
  // Check theme
  const savedTheme = localStorage.getItem('adminTheme');
  if (savedTheme === 'classic-black') {
    document.body.setAttribute('data-theme', 'classic-black');
  }
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
  loadCvStats();
  loadUsersRoles();
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
    if (data.analytics_url) {
      analyticsUrlInput.value = data.analytics_url;
      updateAnalyticsIframe(data.analytics_url);
    }
  }
}

function updateAnalyticsIframe(url) {
  if (url && url.startsWith('http')) {
    analyticsIframe.src = url;
    analyticsIframe.style.display = 'block';
    noAnalyticsMsg.style.display = 'none';
  } else {
    analyticsIframe.style.display = 'none';
    noAnalyticsMsg.style.display = 'block';
  }
}

saveAnalyticsBtn.addEventListener('click', async () => {
  const url = analyticsUrlInput.value;
  saveAnalyticsBtn.textContent = 'Saving...';
  
  const { data: existingData } = await supabase.from('settings').select('id').limit(1).single();
  let result;
  if (existingData) {
    result = await supabase.from('settings').update({ analytics_url: url }).eq('id', existingData.id);
  } else {
    result = await supabase.from('settings').insert([{ analytics_url: url }]);
  }
  
  saveAnalyticsBtn.textContent = 'Save';
  if (!result.error) {
    updateAnalyticsIframe(url);
  }
});

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
    overviewInboxCount.textContent = '0';
    return;
  }

  inboxList.classList.remove('hidden');
  overviewInboxCount.textContent = data.length.toString();
  
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

// CV Tracker Logic
generateCvBtn.addEventListener('click', () => {
  const company = cvCompanyInput.value.trim();
  if (!company) {
    alert('Please enter a company name first.');
    return;
  }
  const baseUrl = window.location.origin;
  const link = `${baseUrl}/cv/?ref=${encodeURIComponent(company)}`;
  cvGeneratedUrl.textContent = link;
  cvLinkResult.style.display = 'block';
});

async function loadCvStats() {
  cvStatsBody.innerHTML = '<tr><td colspan="3" style="padding: 20px; text-align: center; color: var(--text-muted);">Loading stats...</td></tr>';
  
  const { data, error } = await supabase
    .from('cv_events')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error || !data || data.length === 0) {
    cvStatsBody.innerHTML = '<tr><td colspan="3" style="padding: 20px; text-align: center; color: var(--text-muted);">No CV tracking data found yet.</td></tr>';
    return;
  }
  
  cvStatsBody.innerHTML = '';
  data.forEach(event => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-color)';
    
    const date = new Date(event.created_at).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    const badgeColor = event.event_type === 'download' ? '#10b981' : '#3b82f6';
    const badge = `<span style="background: ${badgeColor}33; color: ${badgeColor}; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${event.event_type}</span>`;
    
    tr.innerHTML = `
      <td style="padding: 12px 8px; font-weight: 500;">${escapeHTML(event.company_name)}</td>
      <td style="padding: 12px 8px;">${badge}</td>
      <td style="padding: 12px 8px; color: var(--text-muted); font-size: 14px;">${date}</td>
    `;
    cvStatsBody.appendChild(tr);
  });
}

refreshCvStatsBtn.addEventListener('click', loadCvStats);

// User Management Logic
async function loadUsersRoles() {
  usersRolesBody.innerHTML = '<tr><td colspan="2" style="padding: 20px; text-align: center; color: var(--text-muted);">Loading roles...</td></tr>';
  
  const { data, error } = await supabase.from('user_roles').select('*').order('created_at', { ascending: false });
    
  if (error || !data || data.length === 0) {
    usersRolesBody.innerHTML = '<tr><td colspan="2" style="padding: 20px; text-align: center; color: var(--text-muted);">No active roles found.</td></tr>';
    return;
  }
  
  usersRolesBody.innerHTML = '';
  data.forEach(user => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-color)';
    tr.innerHTML = `
      <td style="padding: 12px 8px; font-weight: 500;">
        ${escapeHTML(user.email)}<br>
        <span style="font-size:12px; color:var(--text-muted); font-weight:400;">${user.user_id}</span>
      </td>
      <td style="padding: 12px 8px;">
        <span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; font-size: 13px;">${escapeHTML(user.role)}</span>
      </td>
    `;
    usersRolesBody.appendChild(tr);
  });
}

inviteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  sendInviteBtn.querySelector('span').classList.add('hidden');
  inviteLoader.classList.remove('hidden');
  inviteMsg.innerHTML = '';
  
  const email = inviteEmailInput.value.trim();
  const role = inviteRoleSelect.value;
  
  // Call Supabase Edge Function to securely invite the user
  const { data, error } = await supabase.functions.invoke('invite-user', {
    body: { email, role }
  });
  
  sendInviteBtn.querySelector('span').classList.remove('hidden');
  inviteLoader.classList.add('hidden');
  
  if (error || (data && data.error)) {
    inviteMsg.innerHTML = `<span class="error-msg" style="background:transparent;padding:0;">Error: ${error?.message || data?.error}</span>`;
  } else {
    inviteMsg.innerHTML = `<span class="success-msg">Invitation sent successfully!</span>`;
    inviteForm.reset();
    loadUsersRoles();
    setTimeout(() => { inviteMsg.innerHTML = ''; }, 3000);
  }
});

// Theme Toggle
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  if (currentTheme === 'classic-black') {
    document.body.removeAttribute('data-theme');
    localStorage.removeItem('adminTheme');
  } else {
    document.body.setAttribute('data-theme', 'classic-black');
    localStorage.setItem('adminTheme', 'classic-black');
  }
});

// Start
init();
