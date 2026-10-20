# EasyQRService — Product UI V2 Visual Lab

> **Not production.** This repository is a disposable, independent visual prototype to review the owner-facing **Quiet Utility** UI direction before any implementation in `ismet3547/easyqrservice`.

## Purpose

Evaluate a calm, premium, practical interface for small-business owners managing an EasyQRService page. This lab is isolated from production: **no production code, APIs, accounts, real authentication, database, Prisma, billing, analytics collection, AI/M12, template hub, domain provider integration, upload storage, QR generation infrastructure, or publishing behavior**.

Everything shown is static sample content or session-only React state. The example business is **Acme Coffee** (MENU, LIVE, PILOT_PREMIUM).

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm install
npm run dev
# Visit http://localhost:3000/dashboard
```

Validation:

```bash
npm run typecheck
npm run build
npx playwright install chromium
npm run start
# In another terminal:
node scripts/capture.mjs
```

The screenshot script requires a server at `http://127.0.0.1:3000` (or set `BASE_URL`), captures to `screenshots/`, visits all 11 routes at 320/390/768/1440px, and asserts no horizontal document overflow. GitHub Actions also runs the visual QA suite and uploads screenshots as a build artifact.

## Routes

| Route | Purpose |
| --- | --- |
| `/dashboard` | Owner overview and public page preview |
| `/dashboard/content` | Category-organized menu list, search, filter and edit drawer |
| `/dashboard/design` | Design selector, responsive preview, dirty save/discard state |
| `/dashboard/share` | Permanent-QR visual demo, size selector and share controls |
| `/dashboard/analytics` | Mock trends, ranges, traffic and zero-activity state |
| `/dashboard/domain` | Four guided mock domain setup states |
| `/create` | Business page type selection |
| `/create/content` | First content setup |
| `/create/design` | Design selection with thumbnail and preview |
| `/create/preview` | Final customer-facing preview and mock publish |
| `/login` | Minimal login **demo** — no authentication |

The root path `/` also shows the overview.

## Visual direction: Quiet Utility

Influences: Linear for understated density, Shopify Admin for merchant-oriented information architecture, and Vercel for interaction polish. These are references, **not copies**.

- Design tokens: `app/globals.css` — canvas, surfaces, borders, text, accent, state colors, typography, radii and spacing.
- Responsive composition: `app/responsive.css` — desktop sidebar, compact tablet rail and five-item mobile bottom navigation.
- Shared foundations: `src/ui.tsx` — buttons, inputs, status, dialogs, drawer, navigation, badges, copy control, toast and related components.
- Mock content: `src/data.ts` — one business, 24 menu items, performance and design/domain types.
- Route views and visual components: `src/lab.tsx` — reusable page preview and the UI-only route flows.
- App Router entry: `app/[[...segments]]/page.tsx`.

### Review viewports

- **1440px** — desktop approval reference
- **1100px** — desktop-to-tablet transition
- **768px** — tablet approval reference
- **390px** — mobile approval reference
- **320px** — overflow/accessibility stress test

### Key mock interactions

Sidebar and mobile navigation; business switcher; item search/filter, edit, create and delete confirmation; toast feedback; design preview with save/discard; QR size switch; analytics ranges and a zero-activity checkbox; switchable domain DNS states; page-type selection; modal dialogs; login demo; preview-only publishing.

QR is an illustrative, **non-scannable** visual placeholder. PNG download currently demonstrates the action with a toast; no real file is generated. Domain verification and publication are **not performed**. Photographic preview assets use Unsplash image URLs for visual context only; they are not uploaded or stored.

## Accessibility and review limitations

Focus indicators, associated labels, keyboard-operable actions, Escape-to-close, dialog focus containment, reduced-motion support, and mobile touch targets are included. Automated checks validate route rendering, client errors and width overflow but do **not** substitute for manual screen-reader testing or owner visual review.

No production changes are authorized or included here. Do not merge the prototype as a production feature. **Production implementation remains blocked pending explicit visual approval.**
