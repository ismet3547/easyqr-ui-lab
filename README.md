# EasyQRService — Product UI V2 Visual Lab

**Product UI V2 visual prototype only. Not production.**

An independent, disposable owner-facing prototype in the **Quiet Utility** visual direction: calm working surfaces, restrained navigation, clear resource lists, a charcoal primary action, and a small indigo accent.

This repository has no connection to `ismet3547/easyqrservice`. It contains no production dependency, API integration, real authentication, database, Prisma, billing, AI/M12, Template Hub, domain infrastructure, or analytics collection. Publishing and sign-in are explicitly simulated. Refreshing the page resets the mock state.

## Run

Use Node.js 22.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open `http://localhost:4173/dashboard`.

```sh
npm run typecheck
npm run build
```

The build uses Next.js static export and writes a fully static site to `out/`. Serve that directory with any static server; no runtime backend is needed. `npm start` serves the exported files at `http://127.0.0.1:3000` with a small development-only static server; it has no API or application backend.

## Routes

| Route                  | Screen                                                                     |
| ---------------------- | -------------------------------------------------------------------------- |
| `/dashboard`           | Overview, customer preview, page summary, performance and quick actions    |
| `/dashboard/content`   | 24 menu items in four categories, search, status filtering and item editor |
| `/dashboard/design`    | Design choices, live preview and save/discard bar                          |
| `/dashboard/share`     | Permanent QR, PNG download sizes and customization preview                 |
| `/dashboard/analytics` | 7/30/90-day ranges, chart, sources, top content and zero state             |
| `/dashboard/domain`    | Empty, waiting for DNS, securing and connected visual states               |
| `/create`              | Business type selection                                                    |
| `/create/content`      | First menu item entry and preview                                          |
| `/create/setup`        | Business name and optional address; completes the five-step flow           |
| `/create/design`       | Three thumbnail-based choices and actual customer preview                  |
| `/create/preview`      | Mobile/desktop customer preview and simulated publish                      |
| `/login`               | Minimal sign-in visual demo; credentials are not sent or saved             |
| `/review`              | Lab-only responsive iframe fixture with viewport and route controls        |

The root route redirects to `/dashboard`. Navigation stays within this prototype, including “Open page” and “Open domain.”

## Structure

```text
src/app/                  Thin App Router routes and shared layouts
  tokens.css              Central colors, spacing, radii and type hierarchy
  globals.css             Ordered stylesheet entrypoint
src/styles/               Shared components, screens, responsive styles and type
src/lib/mock-data.ts      Business, 24 menu items, designs and analytics fixtures
src/lib/lab-context.tsx   Local React state shared across client navigation
src/components/
  app-shell.tsx           AppShell, Sidebar, MobileNavigation, BusinessSwitcher,
                          OnboardingShell, Logo, UI Lab controls
  ui.tsx                  PageHeader, SectionHeader, Button, IconButton, Badge,
                          StatusBadge, Input, Select, Textarea, Checkbox, Toggle,
                          Tabs, SegmentedControl, ResourceList, ResourceRow,
                          Drawer, Dialog, ConfirmationDialog, InlineNotice,
                          EmptyState, Toast, Skeleton, Metric, ChartShell, CopyField
  public-preview.tsx      Customer menu, responsive viewport and design thumbnails
  overview.tsx            Owner overview
  content.tsx             Resource management and item editor
  design.tsx              Design workspace and browse dialog
  share.tsx               QR page, local PNG export and customization dialog
  analytics.tsx           Restrained chart and analytics states
  domain.tsx              Domain/DNS setup states
  onboarding.tsx          Five-step creation flow
  login.tsx               Sign-in visual demo
public/images/            Bundled photographs and one fixed, pre-generated QR
```

## Interactions

- Full desktop sidebar, tablet rail and mobile Home / Content / Design / Share / More navigation. Analytics and Domain stay inside More.
- Keyboard-operable business popover and native modal dialogs with focus containment, Escape dismissal and focus restoration.
- Search and filter the real 24-item fixture; add, edit, hide, change availability, upload a browser-local photo, or confirm deletion. Changes update the shared mock state and show a toast.
- Preview another design without changing the saved design. Discard restores the saved design; Save design commits it locally. The action bar exists only while dirty.
- Copy the page link, download a real static QR at 512/1,024/2,048px, and explore QR customization. Customization is a visual sample; downloads use the original QR.
- Switch analytics ranges and the zero-activity state.
- Switch all four domain states. “Check again” and “Check status” advance local demo state and never inspect DNS.
- Complete onboarding, including business details, design selection, viewport switching and an explicitly simulated publish dialog.
- UI Lab controls switch Free / Pilot Premium, Live / Unpublished, Data / Zero, and domain states.

No action invokes a production service. Photos are read locally with FileReader; uploads are not persisted. Content drag grips are decorative in this visual prototype; drag reordering is not implemented. Premium Studio preferences are illustrative and do not change page settings. The onboarding content demo is scoped to MENU even when another business type is selected.

## Packages

All direct packages are pinned in `package.json` and `package-lock.json`.

| Package                         | Version | Purpose                                             |
| ------------------------------- | ------- | --------------------------------------------------- |
| Next.js                         | 16.4.2  | App Router, static export                           |
| React / React DOM               | 19.3.1  | Client UI and local mock state                      |
| TypeScript                      | 5.9.3   | Strict typing                                       |
| Geist                           | 1.8.1   | Bundled Geist Sans variable font                    |
| lucide-react                    | 1.61.0  | Prototype-only icon dependency                      |
| @playwright/test                | 1.64.1  | Development-only interaction checks and screenshots |
| @types/node                     | 22.18.6 | Development types                                   |
| @types/react / @types/react-dom | 19.2.2  | Development types                                   |

No UI framework or Tailwind is used. The static QR asset was generated once with the `qrcode` 1.5.4 CLI; that CLI is not an application dependency or runtime service.

## Visual review

Review at **320, 390, 768, 1100 and 1440px**. Primary approval sizes are **390, 768 and 1440px**. The `/review` fixture creates an actual CSS viewport in an iframe; its controls do not change the production UI.

To run the browser checks and produce the screenshot set on a normal local development machine:

```sh
npx playwright install chromium
npm run test:ui
# Capture the requested review screens only:
npm run test:capture
```

Screenshots are written to `review/screenshots/{390px,768px,1440px}/`. HTML test results are in `playwright-report/`. Generated screenshots and reports are ignored by Git.

The existing `Visual Lab QA` GitHub Actions workflow is retained. Its `scripts/capture.mjs` entrypoint runs the complete browser suite against the exported site and uploads captures from `screenshots/`.

The capture suite covers all 22 requested combinations, plus desktop onboarding content, zero analytics and dirty design previews. The interactive suite exercises content edits/deletion, design discard/save, analytics ranges/zero, domain progression, QR download, mobile More and keyboard focus/Escape. All 12 application screens are checked for document overflow at all five widths. See [docs/REVIEW.md](docs/REVIEW.md) for the actual verification status; a configured test is not a completed test.

## Asset sources

The bundled sample café photographs are from Unsplash (image IDs): `1554118811-1e0d58224f24` (interior), `1509042239860-f550ce710b93` (coffee), `1461023058943-07fcbe16d735` (iced coffee), `1555507036-ab1f4038808a` (croissant), `1525351484163-7529414344d8` (toast). They are visual fixtures, not images supplied by a real Acme Coffee business.

## Approval boundary

This prototype must be visually reviewed before any production implementation. Do not merge or begin production work without explicit owner instruction. Browser layout approval is pending; this is a review branch, not an approved production design.
