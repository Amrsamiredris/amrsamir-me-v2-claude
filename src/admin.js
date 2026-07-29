import { supabase } from './supabaseClient.js';

// Load existing PDFs on init
async function loadExistingPdfs() {
  const select = document.getElementById('cv-existing-pdf');
  if (!select) return;
  try {
    const { data, error } = await supabase.storage.from('cv_pdfs').list();
    if (error) {
      if (error.message.includes('Bucket not found')) {
        select.innerHTML = '<option value="">(Create the cv_pdfs bucket in Supabase first)</option>';
        select.disabled = true;
      }
      return;
    }
    if (data && data.length > 0) {
      data.forEach(file => {
        if (file.name !== '.emptyFolderPlaceholder') {
          const opt = document.createElement('option');
          const { data: publicUrlData } = supabase.storage.from('cv_pdfs').getPublicUrl(file.name);
          opt.value = publicUrlData.publicUrl;
          opt.textContent = file.name;
          select.appendChild(opt);
        }
      });
    }
  } catch (err) {
    console.error('Error loading PDFs:', err);
  }
}

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

// Analytics Elements
const overviewInboxCount = document.getElementById('overview-inbox-count');
const analyticsUrlInput = document.getElementById('set-analytics-url');
const saveAnalyticsBtn = document.getElementById('save-analytics-btn');
const analyticsIframe = document.getElementById('analytics-iframe');
const noAnalyticsMsg = document.getElementById('no-analytics-msg');

// CV Tracker Elements
const cvCompanyInput = document.getElementById('cv-company');
const cvTitleInput = document.getElementById('cv-title');
const cvSlugInput = document.getElementById('cv-slug');
const cvPdfInput = document.getElementById('cv-pdf');
const generateCvBtn = document.getElementById('generate-cv-link-btn');
const generateCvLoader = document.getElementById('generate-cv-loader');
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
  loadExistingPdfs();
  loadCmsConfig();
  loadTechTools();
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
generateCvBtn.addEventListener('click', async () => {
  const company = cvCompanyInput.value.trim();
  const title = cvTitleInput.value.trim();
  let slug = cvSlugInput.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const pdfFile = cvPdfInput.files[0];

  if (!company || !slug || !title) {
    alert('Please enter a company name, title, and URL slug.');
    return;
  }

  generateCvBtn.querySelector('span').style.display = 'none';
  generateCvLoader.classList.remove('hidden');

  let finalPdfUrl = null;

  try {
    // 1. Upload PDF if selected
    if (pdfFile) {
      const fileName = `${slug}-${Date.now()}.pdf`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cv_pdfs')
        .upload(fileName, pdfFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase.storage
        .from('cv_pdfs')
        .getPublicUrl(fileName);
        
      finalPdfUrl = publicUrlData.publicUrl;
    } else if (document.getElementById('cv-existing-pdf') && document.getElementById('cv-existing-pdf').value) {
      // Reuse selected PDF
      finalPdfUrl = document.getElementById('cv-existing-pdf').value;
    }

    // 2. Insert into cv_links
    const { error: dbError } = await supabase
      .from('cv_links')
      .insert([{
        slug: slug,
        company: company,
        title: title,
        pdf_url: finalPdfUrl
      }]);

    if (dbError) {
      if (dbError.code === '23505') throw new Error('That URL slug is already taken. Please choose another.');
      throw dbError;
    }

    const baseUrl = window.location.origin;
    const link = `${baseUrl}/cv/${slug}`;
    cvGeneratedUrl.textContent = link;
    cvLinkResult.style.display = 'block';

    // Reset form
    cvCompanyInput.value = '';
    cvTitleInput.value = '';
    cvSlugInput.value = '';
    cvPdfInput.value = '';
  } catch (error) {
    console.error('Error generating CV link:', error);
    let errorMsg = error.message || 'Failed to generate link.';
    if (errorMsg.includes('Bucket not found') || errorMsg.includes('storage bucket')) {
      errorMsg = "ACTION REQUIRED: You need to create a storage bucket in Supabase!\n\n1. Go to your Supabase Dashboard\n2. Click 'Storage' on the left\n3. Create a New Bucket named 'cv_pdfs'\n4. Make sure it is Public!";
    }
    alert(errorMsg);
  } finally {
    generateCvBtn.querySelector('span').style.display = 'block';
    generateCvLoader.classList.add('hidden');
  }
});

async function loadCvStats() {
  cvStatsBody.innerHTML = '<tr><td colspan="3" style="padding: 20px; text-align: center; color: var(--text-muted);">Loading stats...</td></tr>';
  
  const { data, error } = await supabase
    .from('cv_views')
    .select(`
      *,
      cv_links (
        company
      )
    `)
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
    const companyName = event.cv_links ? event.cv_links.company : 'Unknown';
    
    tr.innerHTML = `
      <td style="padding: 12px 8px; font-weight: 500;">${escapeHTML(companyName)}</td>
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



// Documentation Logic
const docTabs = document.querySelectorAll('.doc-tab');
const docContent = document.getElementById('doc-content');

async function loadDoc(docName) {
  if (!docContent) return;
  docContent.innerHTML = '<p style="color: var(--text-muted);">Loading documentation...</p>';
  try {
    const res = await fetch(`/${docName}.md`);
    if (!res.ok) throw new Error('Document not found');
    const md = await res.text();
    // Parse markdown using marked.js
    if (window.marked) {
      docContent.innerHTML = window.marked.parse(md);
      
      // Check and render mermaid diagrams
      if (window.mermaid) {
        const mermaidNodes = docContent.querySelectorAll('.language-mermaid');
        mermaidNodes.forEach((node, i) => {
          const graphDefinition = node.textContent;
          const parentPre = node.parentNode;
          const newDiv = document.createElement('div');
          newDiv.className = 'mermaid';
          newDiv.textContent = graphDefinition;
          parentPre.parentNode.replaceChild(newDiv, parentPre);
        });
        
        if (mermaidNodes.length > 0) {
          try {
            await window.mermaid.run({ querySelector: '.mermaid' });
          } catch (e) {
            console.error('Mermaid rendering failed', e);
          }
        }
      }
    } else {
      docContent.innerHTML = '<p style="color: var(--text-muted);">Error: Markdown parser not loaded.</p>';
    }
  } catch (err) {
    docContent.innerHTML = `<p style="color: var(--text-muted);">Error loading ${docName}.md</p>`;
  }
}

docTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all
    docTabs.forEach(t => t.classList.remove('active'));
    // Add to clicked
    tab.classList.add('active');
    // Load doc
    loadDoc(tab.dataset.doc);
  });
});

// Load default doc if we navigate to documents view
document.querySelector('[data-target="documents-view"]').addEventListener('click', () => {
  loadDoc('project_architecture');
});


// CMS Logic
let globalCmsData = [];

async function loadCmsConfig() {
  const { data, error } = await supabase.from('cms_config').select('*').order('page').order('group_name');
  if (error || !data) return;
  globalCmsData = data;
  
  const tabsNav = document.getElementById('cms-tabs-nav');
  const dynamicFields = document.getElementById('cms-dynamic-fields');
  if (!tabsNav || !dynamicFields) return;
  
  tabsNav.innerHTML = '';
  dynamicFields.innerHTML = '';
  
  // Group by page
  const pages = [...new Set(data.map(item => item.page || 'Global'))];
  
  pages.forEach((page, index) => {
    // Create Tab Button
    const tabBtn = document.createElement('button');
    tabBtn.type = 'button';
    tabBtn.className = `btn ${index === 0 ? 'primary-btn' : 'secondary-btn'} cms-tab-btn`;
    tabBtn.textContent = page;
    tabBtn.dataset.page = page;
    tabsNav.appendChild(tabBtn);
    
    // Create Tab Content
    const tabContent = document.createElement('div');
    tabContent.className = `cms-page-content ${index === 0 ? '' : 'hidden'}`;
    tabContent.dataset.page = page;
    
    // Group by group_name within the page
    const pageItems = data.filter(item => (item.page || 'Global') === page);
    const groups = [...new Set(pageItems.map(item => item.group_name || 'General'))];
    
    groups.forEach(group => {
      const groupHeader = document.createElement('h3');
      groupHeader.style.cssText = 'margin-top: 24px; margin-bottom: 16px; font-size: 1.1rem; color: var(--text-primary); border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;';
      groupHeader.textContent = group;
      tabContent.appendChild(groupHeader);
      
      const groupItems = pageItems.filter(item => (item.group_name || 'General') === group);
      
      groupItems.forEach(item => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        if (item.type === 'boolean') {
          inputGroup.style.cssText = 'flex-direction: row; align-items: center; justify-content: space-between;';
          inputGroup.innerHTML = `
            <div>
              <label for="cms-${item.key}" style="margin-bottom: 0;">${item.description || item.key}</label>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="cms-${item.key}" ${item.value === 'true' ? 'checked' : ''}>
              <span class="slider round"></span>
            </label>
          `;
        } else if (item.type === 'textarea') {
          inputGroup.innerHTML = `
            <label for="cms-${item.key}">${item.description || item.key}</label>
            <textarea id="cms-${item.key}" rows="3">${item.value || ''}</textarea>
          `;
        } else if (item.type === 'color') {
          inputGroup.style.cssText = 'flex-direction: row; align-items: center; gap: 12px;';
          inputGroup.innerHTML = `
            <label for="cms-${item.key}" style="margin-bottom: 0; flex: 1;">${item.description || item.key}</label>
            <input type="color" id="cms-${item.key}" value="${item.value || '#3b82f6'}" style="width: 50px; height: 32px; padding: 0; border: none; border-radius: 4px; background: transparent; cursor: pointer;">
          `;
        } else if (item.type === 'font') {
          const fonts = ['Inter', 'Roboto', 'Outfit', 'Playfair Display', 'Lora', 'Merriweather', 'Space Grotesk'];
          const options = fonts.map(f => `<option value="${f}" ${item.value === f ? 'selected' : ''}>${f}</option>`).join('');
          inputGroup.innerHTML = `
            <label for="cms-${item.key}">${item.description || item.key}</label>
            <select id="cms-${item.key}">
              ${options}
              <option value="${item.value}" ${!fonts.includes(item.value) ? 'selected' : 'hidden'}>${item.value} (Custom)</option>
            </select>
          `;
        } else {
          // text or default
          inputGroup.innerHTML = `
            <label for="cms-${item.key}">${item.description || item.key}</label>
            <input type="text" id="cms-${item.key}" value="${item.value || ''}" />
          `;
        }
        tabContent.appendChild(inputGroup);
      });
    });
    
    dynamicFields.appendChild(tabContent);
  });
  
  // Tab click logic
  document.querySelectorAll('.cms-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.cms-tab-btn').forEach(b => {
        b.classList.remove('primary-btn');
        b.classList.add('secondary-btn');
      });
      btn.classList.add('primary-btn');
      btn.classList.remove('secondary-btn');
      
      const targetPage = btn.dataset.page;
      document.querySelectorAll('.cms-page-content').forEach(content => {
        if (content.dataset.page === targetPage) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });
}

const cmsForm = document.getElementById('cms-form');
if (cmsForm) {
  cmsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('save-cms-btn');
    const msg = document.getElementById('cms-msg');
    const loader = document.getElementById('cms-loader');
    
    btn.querySelector('span').classList.add('hidden');
    loader.classList.remove('hidden');
    msg.innerHTML = '';
    
    const updates = globalCmsData.map(item => {
      const el = document.getElementById(`cms-${item.key}`);
      let val = item.value;
      if (el) {
        if (item.type === 'boolean') {
          val = el.checked.toString();
        } else {
          val = el.value;
        }
      }
      return { ...item, value: val, updated_at: new Date().toISOString() };
    });
    
    const { error } = await supabase.from('cms_config').upsert(updates);
    
    btn.querySelector('span').classList.remove('hidden');
    loader.classList.add('hidden');
    
    if (error) {
      msg.innerHTML = `<span class="error-msg" style="background:transparent;padding:0;">Error: ${error.message}</span>`;
    } else {
      msg.innerHTML = `<span class="success-msg">CMS Content saved successfully!</span>`;
      setTimeout(() => { msg.innerHTML = ''; }, 3000);
    }
  });
}

// Tech Tools Logic
async function loadTechTools() {
  const toolsBody = document.getElementById('tools-list-body');
  if (!toolsBody) return;
  
  toolsBody.innerHTML = '<tr><td colspan="4" style="padding: 20px; text-align: center; color: var(--text-muted);">Loading tools...</td></tr>';
  
  const { data, error } = await supabase.from('tech_tools').select('*').order('created_at', { ascending: false });
  
  if (error || !data || data.length === 0) {
    toolsBody.innerHTML = '<tr><td colspan="4" style="padding: 20px; text-align: center; color: var(--text-muted);">No tools found. Add one above!</td></tr>';
    return;
  }
  
  toolsBody.innerHTML = '';
  data.forEach(tool => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--border-subtle)';
    tr.innerHTML = `
      <td style="padding: 12px 8px; font-weight: 500;">
        ${tool.url ? `<a href="${escapeHTML(tool.url)}" target="_blank" style="color: var(--accent); text-decoration: none;">${escapeHTML(tool.name)}</a>` : escapeHTML(tool.name)}
      </td>
      <td style="padding: 12px 8px;"><span style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; font-size: 13px;">${escapeHTML(tool.category || 'General')}</span></td>
      <td style="padding: 12px 8px; color: var(--text-muted); font-size: 14px;">${escapeHTML(tool.description || '')}</td>
      <td style="padding: 12px 8px;">
        <button class="btn text-btn delete-tool-btn" data-id="${tool.id}" style="color: #ef4444; padding: 4px 8px; font-size: 13px;">Delete</button>
      </td>
    `;
    toolsBody.appendChild(tr);
  });
  
  document.querySelectorAll('.delete-tool-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      if (confirm('Are you sure you want to delete this tool?')) {
        const id = e.target.dataset.id;
        await supabase.from('tech_tools').delete().eq('id', id);
        loadTechTools();
      }
    });
  });
}

const addToolForm = document.getElementById('add-tool-form');
if (addToolForm) {
  addToolForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('save-tool-btn');
    const msg = document.getElementById('tool-msg');
    const loader = document.getElementById('tool-loader');
    
    btn.querySelector('span').classList.add('hidden');
    loader.classList.remove('hidden');
    msg.innerHTML = '';
    
    const name = document.getElementById('tool-name').value;
    const category = document.getElementById('tool-category').value;
    const url = document.getElementById('tool-url').value;
    const description = document.getElementById('tool-desc').value;
    
    const { error } = await supabase.from('tech_tools').insert([{ name, category, url, description }]);
    
    btn.querySelector('span').classList.remove('hidden');
    loader.classList.add('hidden');
    
    if (error) {
      msg.innerHTML = `<span class="error-msg" style="background:transparent;padding:0;">Error: ${error.message}</span>`;
    } else {
      msg.innerHTML = `<span class="success-msg">Tool added!</span>`;
      addToolForm.reset();
      loadTechTools();
      setTimeout(() => { msg.innerHTML = ''; }, 3000);
    }
  });
}


// Start
init();
