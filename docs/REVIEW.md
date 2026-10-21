# Visual review record

Isolated prototype: `ismet3547/easyqr-ui-lab`, branch `feat/quiet-utility-prototype`, PR #1. The existing branch history and Visual Lab QA workflow are retained; the earlier root `app/` entrypoint and monolithic UI are replaced by the modular `src/app/` implementation. No production repository was opened or modified.

## Verified application revision

**Source commit:** `118451259605e5fa292d00c0217f0751fc224eb5`.

**Green CI run:** [Visual Lab QA #11](https://github.com/ismet3547/easyqr-ui-lab/actions/runs/39639340273).

- Dependency installation, TypeScript and optimized Next.js static export pass on Ubuntu / Node.js 22.
- **30 browser checks passed, 5 intentionally skipped, 0 failed.** Skips are viewport-specific cases: mobile navigation on non-mobile widths and screenshot capture at 320/1100px.
- All 12 application routes render without browser errors or horizontal document overflow at **320, 390, 768, 1100 and 1440px**.
- Browser checks exercise search, local edits/visibility/deletion, design discard/save and client navigation, analytics range/zero state, domain progression, a real PNG download, mobile More navigation, and dialog focus containment/Escape/focus restoration.
- **26 screenshots produced**, including all 22 required combinations. Actual PNG widths are verified as 1440/390/768px. Editor captures use the viewport only; the mobile editor is 390 × 844px.
- The locally run application and exported static preview returned HTTP 200 for every application route; the static QR asset also returned 200.

The initial browser run exposed trailing-slash hydration mismatches, modal Tab wrapping and narrow onboarding progress overflow. These are fixed in the verified source revision. Captures wait for hydration, local fonts and images.

## Screenshot inventory

| Width  | Screens                                                                                                                                                                                                                           | Count |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 1440px | Overview, Content, Content editor, Design, dirty Bold preview, QR & Share, Analytics, zero Analytics, Domain waiting DNS, Domain connected, onboarding business type, onboarding content, onboarding design, final preview, Login | 15    |
| 390px  | Overview, Content, Content editor, Design, dirty Bold preview, QR & Share, Domain waiting DNS, onboarding design                                                                                                                  | 8     |
| 768px  | Overview, Content, Design                                                                                                                                                                                                         | 3     |

[Download the CI screenshot artifact](https://github.com/ismet3547/easyqr-ui-lab/actions/runs/39639340273/artifacts/12364356930). The artifact has a 30-day retention period. The delivery also includes a separate ZIP of all 26 captures.

Primary desktop, tablet and mobile captures were visually inspected, including the corrected editor and onboarding layout. Owner visual approval and manual screen-reader review remain separate from automated browser checks. The PR stays a draft and is not merged.

## Local environment limitation

The execution container does not mount `/proc`. For local Next.js builds, an untracked, environment-only Node preload used V8 heap statistics and process resource usage as a fallback. That workaround lives outside this repository and is not a normal run requirement. CI uses an ordinary Ubuntu runner and passes without it.

The managed browser bridge in this conversation is unavailable (`sites-previewd` mailbox missing; cloud browser connection refused). Interactive browser validation and screenshots therefore ran through this repository's retained GitHub Actions workflow. The prototype remains interactive when run locally using the README commands.

## Known prototype compromises

- All state resets on refresh; client navigation retains local state.
- MENU is the onboarding content fixture. Other business type tiles demonstrate selection only.
- Decorative row drag grips do not reorder content.
- Premium Studio preferences are illustrative. QR customization changes the visual sample; exports use the original fixed QR.
- “Open page” and “Open domain” show the internal customer preview.
- No real DNS checks, authentication, publishing, account changes, uploads, billing or analytics happen.
- Customer pages use compact HTML viewports, not physical phone frames.

## Reproduce

Run `npm ci`, `npm run typecheck`, `npm run build`, `npx playwright install chromium`, then `npm run test:ui`. Captures are written to `review/screenshots/` locally. To use the existing CI entrypoint against a static build, run `npm start` on port 3000, then `node scripts/capture.mjs`; that writes captures to `screenshots/`.

**Production implementation remains blocked until explicit owner visual approval.**
