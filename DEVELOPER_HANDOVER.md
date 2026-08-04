# Comprehensive Developer Handover Documentation
## Project: amrsamir.me (Multi-Domain Portfolio Hub)

This document is an exhaustive, highly-detailed handover guide. It breaks down every file, every route, the complete database schema, API integrations, and the security lockdown logic currently in place for the `amrsamir.me` project.

---

## 1. Executive Summary
- **Project Name:** amrsamir.me
- **Purpose:** A personal multi-domain portfolio hub for Amr Samir Edris. It serves as a central point for his endeavors in Events, Marketing, and AI/Tech, and includes a private CV tracking tool.
- **Current State:** The site is in a **"Coming Soon"** lockdown mode. All public pages except the root `/` redirect back to the home page. The Admin dashboard (`/admin`) is functional but secured.
- **Primary Tech Stack:** Next.js 14+ (App Router), React 19, Supabase, Vercel, PostHog, Framer Motion.

---

## 2. Directory and Architecture Breakdown

The project follows a modern Next.js App Router structure combined with a vanilla JS implementation for the admin panel to bypass React hydration overhead in the dashboard.

### `app/` (Next.js App Router)
- **`layout.jsx`**: The root layout. It connects to Supabase (`cms_config` and `settings` tables) on the server side to dynamically load fonts (via Google Fonts), CSS color variables (`--primary-accent`), and SEO Metadata. It renders global components like `<BackgroundCanvas />`, `<WatermarkBg />`, and `<CommandPalette />`.
- **`page.jsx`**: The public landing page. Currently hardcoded as a **"Coming Soon"** page. It features a glassmorphism contact card and a contact form UI (note: the submission logic here is currently simulated with a `setTimeout`).
- **`admin/page.jsx`**: The Admin Dashboard shell. It is a React Server Component that dynamically imports the vanilla JS admin logic (`src/admin.js`). It contains the massive HTML shell for the dashboard UI (Sidebar, Overview, Analytics, CV Tracker, Form Submissions, Content Manager).
- **`login/page.jsx`**: The authentication portal. Uses Supabase Auth (`signInWithPassword`) to log the user in and redirects to `/admin`.
- **Locked Subpages (`events/`, `marketing/`, `ai/`, `cv/`)**: These directories contain individual portfolio pages, but they are currently inaccessible to the public due to the middleware.

### `components/` (React UI Components)
- `BackgroundCanvas.jsx`, `WatermarkBg.jsx`: Canvas-based background animations and watermarks.
- `CommandPalette.jsx`: Likely a `Cmd+K` style navigation palette.
- `Footer.jsx`, `PersonaCards.jsx`, `RoleRotator.jsx`: Reusable UI elements for the main site once un-gated.

### `src/` (Vanilla JS & CSS for Admin)
- **`admin.js`**: The monolithic, vanilla JavaScript file driving the `/admin` dashboard. It handles DOM manipulation, Supabase data fetching, and interactivity (details in Section 5).
- **`supabaseClient.js`**: Initializes the Supabase client using the environment variables.
- **`css/`**: Contains modular CSS files (`admin.css`, `tokens.css`, `utilities.css`, `style.css`) defining the design system, CSS variables, and layout rules.

### Root Level Utility
- **`update_footer.py`**: A Python script designed to recursively search through static `index.html` files and perform a Regex replace to inject a new unified Footer and Contact section.

---

## 3. Environment Variables & API Keys

The following keys are absolutely critical for the project to run. 

> [!CAUTION]
> **Security Notice:** Do not expose the PostHog or Vercel keys in the public client bundle. The Supabase Anon key is safe for the client but should have RLS (Row Level Security) enforced in the database.

**`.env`**
```env
NEXT_PUBLIC_SUPABASE_URL=https://wmdtfzvasenyuuneqtnj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZHRmenZhc2VueXV1bmVxdG5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5OTM5NjEsImV4cCI6MjEwMDU2OTk2MX0.zUoRUvzIXLSff36vGfDRH7LHiP65lEFs61OQZaozFD8

NEXT_PUBLIC_POSTHOG_KEY=phx_YOUR_POSTHOG_KEY_HERE
```

**`.env.local`** (Vercel Sync)
```env
VERCEL_OIDC_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1yay00MzAyZWMxYjY3MGY0OGE5OGFkNjFkYWRlNGEyM2JlNyJ9.eyJpc3MiOiJodHRwczovL29pZGMudmVyY2VsLmNvbS9hbXItc2FtaXItcy1wcm9qZWN0cyIsInN1YiI6Im93bmVyOmFtci1zYW1pci1zLXByb2plY3RzOnByb2plY3Q6YW1yc2FtaXItbWUtZmluYWw6ZW52aXJvbm1lbnQ6ZGV2ZWxvcG1lbnQiLCJzY29wZSI6Im93bmVyOmFtci1zYW1pci1zLXByb2plY3RzOnByb2plY3Q6YW1yc2FtaXItbWUtZmluYWw6ZW52aXJvbm1lbnQ6ZGV2ZWxvcG1lbnQiLCJhdWQiOiJodHRwczovL3ZlcmNlbC5jb20vYW1yLXNhbWlyLXMtcHJvamVjdHMiLCJvd25lciI6ImFtci1zYW1pci1zLXByb2plY3RzIiwib3duZXJfaWQiOiJ0ZWFtX2ViMFZYNVUwODdXNERSMmhYWDRoUXZKNiIsInByb2plY3QiOiJhbXJzYW1pci1tZS1maW5hbCIsInByb2plY3RfaWQiOiJwcmpfdUw5UmhVTVZlNjVPY1BHakViQVJBMTBOMEt1dCIsImVudmlyb25tZW50IjoiZGV2ZWxvcG1lbnQiLCJwbGFuIjoiaG9iYnkiLCJ1c2VyX2lkIjoiTXdKSGR4RllDekg5Qnc0U3FHQWFjOHdBIiwiY2xpZW50X2lkIjoiY2xfSFl5T1BCTnRGTWZIaGFVbjlMNFFQZlRaejZUUDQ3YnAiLCJuYmYiOjE3ODUwMTY3MzksImlhdCI6MTc4NTAxNjczOSwiZXhwIjoxNzg1MDU5OTM5fQ.KPOoiKFYZwwnw3ecpYNzxzq_yXfYmGY0X0wGx2PnYsikCs10iowJW2vyEEetTcpmdFqvzsqw_eybp8d9LPdZr-LKfJlADUWjeFmW2ACWzXRdo2S2DI-1DK8icPVkUqP1A1bP2Jl5caT7xqv_WrSnPqyAf0526o3pDV6_Dt-8z7n27iLAwxsHy3EP7sxHTKOwObnBxi5koZEKw9O8nsPrg4xRjhiSCQ5sV-KZjiJcAZAxNHgkOixHrYwu8jwrzd83UJXmUC2you3sAXJ5q8uVClVLZIUVM81XsLo9hLuAM_n35JoKPb_WkTC4YltZ7Nx4nOeyJMOtjE3VCf1HxKI-IQ"
```

---

## 4. Security & Routing Logic (`middleware.js`)

The `middleware.js` file is the gatekeeper of the application. It establishes three main rules using `@supabase/ssr`:
1. **Admin Protection:** If a user accesses `/admin` without a valid Supabase session, they are redirected to `/login`.
2. **Login Redirect:** If an authenticated user accesses `/login`, they are redirected to `/admin`.
3. **Site Lockdown (Coming Soon):** The array `const publicLockedPaths = ['/events', '/marketing', '/ai', '/cv'];` dictates the lockdown. Any request starting with these paths is forcefully redirected to `/`. 
   - **How to Un-gate:** When you are ready to launch, either remove this logic block entirely or clear the array in `middleware.js`.

---

## 5. Database Schema & Admin Dashboard Mechanics

The `/admin` dashboard relies entirely on the Supabase database. Based on the queries in `src/admin.js` and `app/layout.jsx`, here is the complete database schema structure you must maintain in Supabase:

### Storage Buckets
- **`cv_pdfs`**: A public bucket used to store uploaded PDF Resumes for the CV Tracker.

### Tables
1. **`settings`**
   - **Fields:** `id`, `whatsapp`, `email`, `linkedin`, `substack`, `analytics_url`, `updated_at`.
   - **Purpose:** Stores global contact info and the PostHog shared dashboard URL which is embedded directly into the Admin UI via an `<iframe>`.
2. **`form_submissions`**
   - **Fields:** `id`, `name`, `email`, `message`, `created_at`.
   - **Purpose:** Receives contact form submissions. Pulled into the Admin "Inbox".
3. **`cv_links`**
   - **Fields:** `slug` (unique), `company`, `title`, `pdf_url`.
   - **Purpose:** Powers the CV Tracking system. Generates unique `/cv/:slug` URLs tailored to specific recruiters.
4. **`cv_views`**
   - **Fields:** `id`, `cv_link_slug` (FK to `cv_links.slug`), `event_type` ('view' or 'download'), `created_at`.
   - **Purpose:** Analytics for when a recruiter views or downloads the custom CV.
5. **`user_roles`**
   - **Fields:** `user_id`, `email`, `role`, `created_at`.
   - **Purpose:** Custom RBAC (Role Based Access Control). Handled via a Supabase Edge Function (`invite-user`).
6. **`cms_config`**
   - **Fields:** `id`, `key`, `value`, `type` ('font', 'color', 'boolean', 'textarea', 'text'), `description`, `page`, `group_name`, `updated_at`.
   - **Purpose:** A dynamic Content Management System. It renders UI fields dynamically in the admin dashboard based on `page` and `group_name`, and pushes updates back to the DB. `app/layout.jsx` consumes this on page load to alter fonts and CSS variables dynamically.
7. **`tech_tools`**
   - **Fields:** `id`, `name`, `category`, `url`, `description`, `created_at`.
   - **Purpose:** Powers a portfolio section listing tools and tech stacks.

---

## 6. DNS, Domain, & Integrations Setup

The domain is hosted via **Cloudflare** with the following topology (`dns.json`):
- **Vercel Hosting:** `amrsamir.me`, `www.amrsamir.me`, `admin.amrsamir.me`, `shop.amrsamir.me`, `tools.amrsamir.me` all point to Vercel IP `76.76.21.21` and CNAME `cname.vercel-dns.com`.
- **Cloudflare Email Routing:** `route1/2/3.mx.cloudflare.net` intercepts emails for `contact@amrsamir.me`.
- **Brevo (Sendinblue):** DKIM and SPF verification texts are present, mapping transactional/marketing emails securely through Brevo.

---

## 7. Handover Action Plan for the Receiving Team

To fully assume control of this project, you must secure the following platform transfers:

1. **Vercel Account Transfer:** Request transfer of the `amrsamir-me-final` project or link your own Vercel account to the GitHub repository.
2. **Supabase Ownership:** You need Owner access to the `wmdtfzvasenyuuneqtnj` Supabase instance.
   - *CRITICAL:* Ensure Row Level Security (RLS) is active on all tables so `anon` keys cannot overwrite data.
   - Verify the `invite-user` Edge Function exists in the Supabase instance, as `admin.js` relies on it for inviting new admins.
3. **Cloudflare Transfer:** The domain `amrsamir.me` must be transferred to your Cloudflare account to maintain the complex Email Routing and Brevo DKIM configurations.
4. **PostHog Access:** Transfer the PostHog project space to retain historical analytics.
5. **Launch the Site:** When the time comes, navigate to `/middleware.js` and delete the `publicLockedPaths` logic. Re-wire the fake `setTimeout` submission in `app/page.jsx` to actually insert into the `form_submissions` Supabase table.

---
*End of Document. Prepared automatically for developer transition.*
