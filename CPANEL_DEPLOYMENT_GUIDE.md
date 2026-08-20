# Forward Surge: cPanel Production Deployment Guide

This guide provides complete, step-by-step instructions for building and deploying the Forward Surge decoupled frontend application to any standard **cPanel** shared, VPS, or dedicated web hosting environment.

---

## 1. System Requirements & Prerequisites

Before deploying, ensure your local build machine and target hosting server meet the following technical specifications:

### Local Build Machine Requirements
- **Node.js**: `v18.17.0` or higher (`v20.x LTS` recommended)
- **Package Manager**: `npm` (`v9+`) or `pnpm` / `yarn`
- **Memory**: Minimum 2 GB RAM available for Vite production bundling

### Hosting Environment (cPanel Server) Requirements
- **Web Server**: Apache 2.4+ or LiteSpeed Web Server
- **Apache Modules Required**:
  - `mod_rewrite` (Essential for React SPA routing fallbacks)
  - `mod_deflate` / `mod_brotli` (Recommended for asset compression)
  - `mod_expires` (Recommended for browser cache headers)
- **SSL Certificate**: Valid Let's Encrypt or commercial TLS/SSL certificate installed via cPanel SSL/TLS Manager
- **Domain/Subdomain**: Configured document root pointing to `public_html` (or `public_html/subfolder` for subdomains)

---

## 2. Environment Configuration

The application supports both static fallback mode and dynamic Headless WordPress CMS integration. Prior to building for production, verify your environment variables.

### Create or edit `.env.production` in the project root:
```ini
# Production Environment Configuration
VITE_SITE_URL=https://forwardsurge.com

# Headless CMS Mode ("wordpress" or "static")
VITE_CMS_MODE=wordpress

# Target Headless WordPress GraphQL API Endpoint
VITE_WP_GRAPHQL_ENDPOINT=https://cms.forwardsurge.com/graphql
```

> [!NOTE]
> If your Headless WordPress instance is not yet live or reachable during build time, you can set `VITE_CMS_MODE=static` to deploy with verified static data and transparent fallback repositories.

---

## 3. Building the Production Bundle

Run the verification and build sequence locally on your build machine or CI/CD pipeline:

```bash
# 1. Install exact dependencies
npm ci

# 2. Verify zero TypeScript errors across all decoupled components
npx tsc --noEmit

# 3. Generate production static bundle
npm run build
```

Upon successful execution, Vite generates a production-ready folder named `dist/` with the following structure:
```text
dist/
├── .htaccess               # Apache SPA router fallback & caching directives
├── index.html              # Entry point HTML
├── favicon.ico             # Site icons
└── assets/                 # Minified, fingerprinted JS, CSS, and media bundles
    ├── index-[hash].js
    ├── index-[hash].css
    └── ...
```

---

## 4. Deploying via cPanel File Manager

### Step 1: Prepare target directory
1. Log in to your **cPanel Dashboard**.
2. Open **File Manager** under the *Files* section.
3. Navigate to `public_html` (or the specific document root for your domain).
4. **Important**: Click **Settings** (top right corner) and enable **Show Hidden Files (dotfiles)** so you can see `.htaccess`.

### Step 2: Clear existing files (if updating)
1. Select existing production files inside `public_html`.
2. Move out-of-date assets to a backup directory or delete them to prevent stale chunks.

### Step 3: Upload and extract production archive
1. On your local machine, zip the **contents** of the `dist/` directory (ensure `.htaccess` and `index.html` are at the root level inside the zip, not nested inside a parent `dist/` folder).
2. In cPanel File Manager, click **Upload** and select your archive (`forwardsurge-dist.zip`).
3. Once uploaded, right-click the zip file in File Manager and click **Extract**.
4. Delete the temporary `.zip` archive.

---

## 5. Deploying via FTP / SFTP (Alternative Method)

If deploying via FileZilla, Cyberduck, or an automated FTP action:
1. Connect to your server using SFTP (Port `22`) or explicit TLS FTP.
2. Navigate to `/public_html`.
3. Upload all files and subdirectories located **inside** your local `dist/` directory directly into `/public_html`.
4. Ensure `.htaccess` is transferred successfully.

---

## 6. Verification & Post-Deployment Checklist

1. **SPA Routing Test**:
   - Navigate to `https://yourdomain.com/programs`.
   - Press **F5 / Refresh**. Ensure the page reloads correctly without returning a `404 Not Found` Apache error (confirming `.htaccess` rewrite rules are active).
2. **Headless CMS Connectivity Test**:
   - Open browser **DevTools (F12)** -> **Network** tab.
   - Verify that requests to `VITE_WP_GRAPHQL_ENDPOINT` return HTTP `200 OK` with valid JSON data payloads.
3. **Resilience & Fallback Test**:
   - If the CMS endpoint is temporarily unreachable, verify that `<ContentErrorBoundary />` catches the failure gracefully without breaking the site header or footer.
