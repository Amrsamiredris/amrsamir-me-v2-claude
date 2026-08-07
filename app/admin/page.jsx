"use client";

import { useEffect, useRef } from 'react';
import '../../src/admin.css';

export default function AdminPage() {
  const containerRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      import('../../src/admin.js').then((module) => {
        module.startAdmin();
      });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Abstract Background for Admin to match site */}
      <div className="bg-shape shape1" style={{ opacity: 0.5 }}></div>
      <div className="bg-shape shape2" style={{ opacity: 0.5 }}></div>
      <div className="bg-shape shape3" style={{ opacity: 0.5 }}></div>

      <div id="app" dangerouslySetInnerHTML={{ __html: `
        <!-- Login Section (Moved to /login, kept as empty div to prevent JS errors) -->
        <div id="login-section" class="hidden"></div>

        <!-- Dashboard Section (Hidden by default) -->
        <div id="dashboard-section" class="dashboard-layout hidden">
          
          <!-- Sidebar -->
          <aside class="sidebar glass-panel">
            <div class="sidebar-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <h3 style="font-family: var(--font-sans); color: var(--text-primary);">Admin Panel</h3>
            </div>
            
            <nav class="sidebar-nav">
              <button class="nav-item active" data-target="overview-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                Overview
              </button>
              <button class="nav-item" data-target="analytics-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-4"></path></svg>
                Analytics
              </button>
              <button class="nav-item" data-target="documents-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Documents
              </button>
              <button class="nav-item" data-target="cvtracker-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                CV Tracker
              </button>
              <button class="nav-item" data-target="users-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                User Management
              </button>
              <button class="nav-item" data-target="settings-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Global Settings
              </button>
              <button class="nav-item" data-target="cms-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Content Manager
              </button>
              <button class="nav-item" data-target="tools-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
                Tech Stack & Tools
              </button>
              <button class="nav-item" data-target="inbox-view">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Form Submissions
              </button>
              <a href="/cv/" target="_blank" class="nav-item" style="text-decoration: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                View Hidden CV
              </a>
            </nav>

            <div class="sidebar-footer">
              <div class="user-info">
                <div class="avatar">A</div>
                <span id="user-email">admin@amrsamir.me</span>
              </div>
              <button id="logout-btn" class="btn text-btn">Sign Out</button>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="main-content">
            
            <!-- View: Overview -->
            <div id="overview-view" class="view-panel active">
              <header class="view-header">
                <h2>Overview</h2>
                <p>Welcome back! Here is a summary of your platform.</p>
              </header>
              
              <div class="overview-grid">
                <div class="glass-panel summary-card">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path></svg>
                  <div class="summary-info">
                    <h3>Total Form Submissions</h3>
                    <p class="summary-value" id="overview-inbox-count">0</p>
                  </div>
                </div>
                <div class="glass-panel summary-card">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  <div class="summary-info">
                    <h3>Settings Status</h3>
                    <p class="summary-value active-status">Active & Synced</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Other Views (Analytics, Settings, etc.) omitted from snippet but included below -->
            <div id="analytics-view" class="view-panel hidden">
              <header class="view-header">
                <h2>Analytics</h2>
                <p>View your live PostHog dashboard embedded directly here.</p>
              </header>
              <div class="glass-panel form-card mb-4" style="margin-bottom: 24px;">
                <div class="input-group">
                  <label for="set-analytics-url">PostHog Shared Dashboard URL</label>
                  <div style="display: flex; gap: 10px;">
                    <input type="url" id="set-analytics-url" placeholder="https://us.i.posthog.com/shared/..." style="flex: 1;" />
                    <button class="btn secondary-btn" id="save-analytics-btn">Save</button>
                  </div>
                </div>
              </div>
              <div class="iframe-container glass-panel" style="padding:0; overflow:hidden; border-radius:12px; min-height: 500px; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.2);">
                <p id="no-analytics-msg" style="color: var(--text-muted);">Please save a Shared Dashboard URL to view analytics.</p>
                <iframe id="analytics-iframe" src="" style="width: 100%; height: 100%; border: none; display: none; min-height: 500px;"></iframe>
              </div>
            </div>

            <!-- Documents View -->
            <div id="documents-view" class="view-panel hidden">
              <header class="view-header">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <h2>Documentation</h2>
                    <p>View the system architecture and design guidelines.</p>
                  </div>
                </div>
              </header>
              <div style="display: flex; gap: 10px; margin-bottom: 24px;">
                <button class="btn secondary-btn doc-tab active" data-doc="project_architecture">Project Architecture</button>
                <button class="btn secondary-btn doc-tab" data-doc="design_system">Design System</button>
                <button class="btn secondary-btn doc-tab" data-doc="domains_guide">Domains Guide</button>
              </div>
              <div class="glass-panel" style="padding: 32px; border-radius: 12px; min-height: 600px; background: rgba(255, 255, 255, 0.02);">
                <div id="doc-content" class="markdown-body" style="color: var(--text-primary); line-height: 1.6; font-size: 15px;">
                  <p style="color: var(--text-muted);">Loading documentation...</p>
                </div>
              </div>
            </div>
            
            <!-- CV Tracker View -->
            <div id="cvtracker-view" class="view-panel hidden">
              <header class="view-header">
                <h2>CV Tracking System</h2>
                <p>Generate links for recruiters and track views/downloads.</p>
              </header>
              
              <div class="glass-panel form-card mb-4" style="margin-bottom: 24px;">
                <div class="input-group" style="margin-bottom: 12px;">
                  <label for="cv-company">Company / Recruiter Name</label>
                  <input type="text" id="cv-company" placeholder="e.g. Google" style="width: 100%;" />
                </div>
                <div class="input-group" style="margin-bottom: 12px;">
                  <label for="cv-title">Custom Job Title</label>
                  <input type="text" id="cv-title" placeholder="e.g. Project Manager" style="width: 100%;" />
                </div>
                <div class="input-group" style="margin-bottom: 12px;">
                  <label for="cv-slug">URL Slug (e.g. "apple" for /cv/apple)</label>
                  <input type="text" id="cv-slug" placeholder="apple" style="width: 100%;" />
                </div>
                <div style="margin-bottom: 24px;">
                  <label style="display: block; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem;">Upload New Custom PDF CV (Optional)</label>
                  <input type="file" id="cv-pdf" accept=".pdf" style="width: 100%; padding: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white;" />
                </div>
                
                <div style="text-align: center; margin: 10px 0; color: var(--text-secondary); font-size: 0.9rem;">-- OR --</div>
                
                <div style="margin-bottom: 24px;">
                  <label style="display: block; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem;">Reuse Previously Uploaded PDF (Optional)</label>
                  <select id="cv-existing-pdf" class="input-field" style="width: 100%; background: rgba(255,255,255,0.05); padding: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: white; cursor: pointer;">
                    <option value="">-- Select an existing PDF --</option>
                  </select>
                  <p style="margin-top: 8px; font-size: 0.85rem; color: var(--text-secondary);">If both are left empty, your default CV will be used.</p>
                </div>
                <button class="btn primary-btn" id="generate-cv-link-btn" style="margin-top: 16px;">
                  <span>Generate Link</span>
                  <div class="loader hidden" id="generate-cv-loader"></div>
                </button>
                <div id="cv-link-result" style="margin-top: 15px; padding: 15px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border: 1px dashed var(--accent); display: none;">
                  <p style="font-size: 14px; margin-bottom: 8px;">Send this exact link:</p>
                  <code id="cv-generated-url" style="color: var(--accent); word-break: break-all;"></code>
                </div>
              </div>
  
              <div class="glass-panel" style="padding: 24px;">
                <h3 style="margin-bottom: 16px;">Tracking Analytics</h3>
                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                  <button class="btn secondary-btn" id="refresh-cv-stats">Refresh Stats</button>
                </div>
                <div style="overflow-x: auto;">
                  <table style="width: 100%; text-align: left; border-collapse: collapse;">
                    <thead>
                      <tr style="border-bottom: 1px solid var(--border-color);">
                        <th style="padding: 12px 8px;">Company</th>
                        <th style="padding: 12px 8px;">Event Type</th>
                        <th style="padding: 12px 8px;">Date/Time</th>
                      </tr>
                    </thead>
                    <tbody id="cv-stats-body">
                      <tr><td colspan="3" style="padding: 20px; text-align: center; color: var(--text-muted);">Loading stats...</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Views for Settings, CMS, Tools, Inbox -->
            <div id="users-view" class="view-panel hidden">
              <!-- Users view logic is handled in JS -->
              <header class="view-header"><h2>User Access Control</h2></header>
              <div class="glass-panel form-card mb-4">
                <form id="invite-form">
                  <div class="input-group">
                    <label for="invite-email">Email Address</label>
                    <input type="email" id="invite-email" required />
                  </div>
                  <div class="input-group">
                    <label for="invite-role">Access Role</label>
                    <select id="invite-role">
                      <option value="Editor">Editor</option>
                      <option value="Developer">Developer</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                  <div class="form-actions">
                    <div id="invite-msg"></div>
                    <button type="submit" class="btn primary-btn" id="send-invite-btn"><span>Send Invitation</span><div class="loader hidden" id="invite-loader"></div></button>
                  </div>
                </form>
              </div>
              <div class="glass-panel" style="padding: 24px;">
                <tbody id="users-roles-body"></tbody>
              </div>
            </div>
            
            <div id="settings-view" class="view-panel hidden">
              <header class="view-header"><h2>Global Settings</h2></header>
              <div class="glass-panel form-card">
                <form id="settings-form">
                  <div class="input-group"><label>WhatsApp</label><input type="text" id="set-whatsapp" /></div>
                  <div class="input-group"><label>Email</label><input type="email" id="set-email" /></div>
                  <div class="input-group"><label>LinkedIn</label><input type="url" id="set-linkedin" /></div>
                  <div class="input-group"><label>Substack</label><input type="url" id="set-substack" /></div>
                  <div class="form-actions">
                    <div id="settings-msg"></div>
                    <button type="submit" class="btn primary-btn" id="save-settings-btn"><span>Save</span><div class="loader hidden" id="settings-loader"></div></button>
                  </div>
                </form>
              </div>
            </div>
            
            <div id="cms-view" class="view-panel hidden">
              <header class="view-header"><h2>Content Manager</h2></header>
              <div class="glass-panel form-card">
                <form id="cms-form">
                  <div class="cms-tabs" id="cms-tabs-nav" style="display: flex; gap: 12px; margin-bottom: 24px; overflow-x: auto; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;"></div>
                  <div id="cms-dynamic-fields"></div>
                  <div class="form-actions" style="margin-top: 24px;">
                    <div id="cms-msg" class="msg-box"></div>
                    <button type="submit" class="btn primary-btn" id="save-cms-btn"><span>Save Content</span><div class="loader hidden" id="cms-loader"></div></button>
                  </div>
                </form>
              </div>
            </div>
            
            <div id="tools-view" class="view-panel hidden">
              <header class="view-header"><h2>Tech Stack & Tools</h2></header>
              <div class="glass-panel form-card mb-4" style="margin-bottom: 24px;">
                <form id="add-tool-form">
                  <div class="input-group"><label>Tool Name</label><input type="text" id="tool-name" required /></div>
                  <div class="input-group"><label>Category</label><input type="text" id="tool-category" required /></div>
                  <div class="input-group"><label>URL</label><input type="url" id="tool-url" /></div>
                  <div class="input-group"><label>Description</label><input type="text" id="tool-desc" /></div>
                  <div class="form-actions" style="margin-top: 24px;">
                    <div id="tool-msg"></div>
                    <button type="submit" class="btn primary-btn" id="save-tool-btn"><span>Add Tool</span><div class="loader hidden" id="tool-loader"></div></button>
                  </div>
                </form>
              </div>
              <div class="glass-panel" style="padding: 24px;">
                <tbody id="tools-list-body"></tbody>
              </div>
            </div>
            
            <div id="inbox-view" class="view-panel hidden">
              <header class="view-header">
                <h2>Form Submissions</h2>
                <button id="refresh-inbox" class="btn secondary-btn">Refresh</button>
              </header>
              <div class="inbox-container glass-panel">
                <div id="inbox-loader" class="loader-lg"></div>
                <ul id="inbox-list" class="message-list hidden"></ul>
                <div id="inbox-empty" class="empty-state hidden"><p>No messages yet.</p></div>
              </div>
            </div>

          </main>
        </div>
      ` }} />
      
      {/* We don't load marked.js globally via tags to avoid Next.js warnings, but we can append them dynamically if needed by the dashboard, or let the user do it manually. */}
    </div>
  );
}
