# Project Audit Report

## Phase 1 - Full Audit

### 1.1 Codebase inventory
- **Issue:** Turbopack Build Failure
  - **Evidence:** `npm run build` fails with `Operation not permitted (os error 1)` reading `/Users/amrsamiredris` due to Turbopack scanning the home directory because of a misplaced `package-lock.json` in `~`.
  - **Severity:** blocker
  - **Proposed fix:** Remove Turbopack experimental configuration from `next.config.mjs` or remove the home directory lockfile.

- **Issue:** Invalid Environment Variables
  - **Evidence:** `src/main.js` calls `posthog.init(import.meta.env.VITE_POSTHOG_KEY)`. This is a Next.js app, not Vite. `import.meta.env` is undefined and will cause a runtime error.
  - **Severity:** blocker
  - **Proposed fix:** Update to use `process.env.NEXT_PUBLIC_POSTHOG_KEY`.

### 1.2 Link & content integrity
- **Issue:** Hardcoded contact links
  - **Evidence:** Static `mailto:contact@amrsamir.me` and hardcoded WhatsApp numbers in multiple pages.
  - **Severity:** medium
  - **Proposed fix:** Pull these from `settingsData` consistently.

### 1.3 Performance
- **Issue:** Missing Bundle Analyzer
  - **Evidence:** `@next/bundle-analyzer` is not installed or configured in `next.config.mjs`.
  - **Severity:** low
  - **Proposed fix:** Install and configure the bundle analyzer plugin.

### 1.4 Security & config
- **Issue:** Missing CSP / Security Headers
  - **Evidence:** `next.config.mjs` does not define `headers()`.
  - **Severity:** high
  - **Proposed fix:** Add Content-Security-Policy, X-Frame-Options, and strict transport security headers to `next.config.mjs`.

- **Issue:** Supabase Client Degradation
  - **Evidence:** `src/supabaseClient.js` falls back to `'https://dummy.supabase.co'` if env vars are missing instead of failing fast.
  - **Severity:** high
  - **Proposed fix:** Throw an error if `NEXT_PUBLIC_SUPABASE_URL` is missing during build/runtime.

### 1.5 SEO / discoverability
- **Issue:** Missing `robots.txt` and `sitemap.xml`
  - **Evidence:** Not found in `public/` or `app/`.
  - **Severity:** high
  - **Proposed fix:** Generate dynamic or static `sitemap.xml` and `robots.txt`.

## Phase 2 - Feature Gaps

### 2.1 AI / Tech Vertical
- **Issue:** Placeholder Case Study Data
  - **Evidence:** `app/ai/page.jsx` contains a hardcoded section: "Case Studies In Progress: Detailed project outcomes and performance metrics are currently being compiled."
  - **Severity:** [missing-blocker]
  - **Proposed fix:** Add real case studies or metrics. Cannot proceed without user input.

- **Issue:** Generic CTA
  - **Evidence:** The CTA in `app/ai/page.jsx` uses the same `mailto:` link as the marketing page.
  - **Severity:** [recommend]
  - **Proposed fix:** Pass a specific subject line or route to a dedicated AI inquiry form.

### 2.2 Marketing Vertical
- **Issue:** Placeholder Campaign Data
  - **Evidence:** `app/marketing/page.jsx` contains a hardcoded section: "Campaigns In Progress: Detailed project outcomes and performance metrics are currently being compiled."
  - **Severity:** [missing-blocker]
  - **Proposed fix:** Add real campaign data. Cannot proceed without user input.

- **Issue:** Generic CTA
  - **Evidence:** Uses the same generic contact footer/links.
  - **Severity:** [recommend]
  - **Proposed fix:** Implement segmented intent form.

### 2.3 Aesthetic Check
- **Issue:** CSS Tokens are present but manual
  - **Evidence:** `src/css/tokens.css` defines the tokens, but Tailwind is not used.
  - **Severity:** low
  - **Proposed fix:** Keep as is if sticking to vanilla CSS, but ensure all inline styles (e.g. `style={{ padding: '24px' }}`) use classes instead.
