# Forward Surge Consultants Web Platform

Modern corporate web platform for **Forward Surge Consultants**, a leadership and management advisory firm specializing in strategy execution, executive coaching, board harmonization, and people practices across Africa.

---

## Tech Stack

- **Framework**: React 19 + TypeScript (ES2022)
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4 + Custom Design Tokens (Amber / Slate Palette)
- **Routing**: React Router DOM v7
- **Motion & Interactions**: Motion (Framer Motion) + Lenis Smooth Scroll
- **Forms & Validation**: React Hook Form
- **Icons**: Lucide React
- **Sanitization & Security**: DOMPurify + Custom Security Utilities
- **Testing**: Vitest

---

## Getting Started

### Prerequisites
- Node.js (v18.17+ or v20+ LTS recommended)
- npm (v9+) or pnpm / yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts the local development server at `http://localhost:3000`.

### Type Checking & Linting
```bash
npm run lint
```
Runs the TypeScript compiler (`tsc --noEmit`) to verify zero type errors.

### Unit Tests
```bash
npm run test
```
Runs the Vitest test suite.

### Production Build
```bash
npm run build
```
Compiles and bundles the application into the `dist/` directory with fingerprinted assets, CSS minification, and `.htaccess` configuration.

### Preview Production Build
```bash
npm run preview
```

---

## Headless CMS & Architecture

The application uses a decoupled repository pattern (`src/services/content/contentService.ts`) with dual-mode support:
1. **Static Mode (`VITE_CMS_MODE=static`)**: Serves verified corporate content and programs directly with zero external latency.
2. **Headless WordPress Mode (`VITE_CMS_MODE=wordpress`)**: Fetches dynamic content from WPGraphQL (`VITE_WP_GRAPHQL_ENDPOINT`) with in-memory TTL caching, query resilience, and automatic fallback to static stubs.

Refer to [`CPANEL_DEPLOYMENT_GUIDE.md`](./CPANEL_DEPLOYMENT_GUIDE.md) for deployment to cPanel / Apache environments.

---

## License
Private & Confidential — Forward Surge Consultants.

