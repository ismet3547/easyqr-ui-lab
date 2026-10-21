# Actual review status

This is an isolated mock prototype in `ismet3547/easyqr-ui-lab`, branch `feat/quiet-utility-prototype`. No production repository was opened or modified. The existing feature-branch history and Visual Lab QA workflow are retained; the earlier root `app/` entrypoint and monolithic UI are replaced by the modular `src/app/` implementation.

## Completed

- Strict TypeScript check.
- Optimized Next.js static export: all routes prerendered.
- Local application run: HTTP 200 for every application route listed in the README, including `/create/setup`.
- Static output inspection: every application screen contains its page heading.
- Source inspection for central palette tokens, local state, native dialog behavior, reduced-motion styles, mobile navigation structure, and bundled assets.

The execution container does not mount `/proc`. Next.js process-memory instrumentation fails in that environment. For the build and local run, an untracked environment-only Node preload used V8 heap statistics and process resource usage as a fallback. This workaround lives outside the repository and is not an application dependency or a normal run requirement.

## Blocked here

The managed browser preview supervisor is unavailable (`sites-previewd` mailbox missing), and the cloud browser cannot reach the local application (`ERR_CONNECTION_REFUSED`). The app itself responds successfully to HTTP checks in its local execution session.

**Screenshots produced: 0.** No browser layout, screenshot, keyboard interaction or viewport assertion is claimed as verified. The Playwright suite is provided and typechecked but has not been executed in a browser in this environment. All 320/390/768/1100/1440px browser checks for this revision remain pending. The retained GitHub Actions workflow can run the full suite against this revision after the branch update; previous successful runs do not verify this new UI.

This branch is **not yet ready for visual approval**. Complete the browser suite and inspect the captures before approving the UI.

## Capture inventory supplied by the suite

| Width  | Screens                                                                                                                                                                                                                           |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1440px | Overview, Content, Content editor, Design, dirty Bold preview, QR & Share, Analytics, zero Analytics, Domain waiting DNS, Domain connected, onboarding business type, onboarding content, onboarding design, final preview, Login |
| 390px  | Overview, Content, Content editor, Design, dirty Bold preview, QR & Share, Domain waiting DNS, onboarding design                                                                                                                  |
| 768px  | Overview, Content, Design                                                                                                                                                                                                         |

This is 26 planned captures, including all 22 required combinations. They are not existing screenshots.

## Known prototype compromises

- All state resets on refresh; client navigation retains local state.
- MENU is the onboarding content fixture. Other type tiles demonstrate selection only.
- Decorative row drag grips do not reorder content.
- Premium Studio settings are illustrative. QR customization changes the visual sample; exports use the original fixed QR.
- “Open page” and “Open domain” show the internal customer preview.
- No real DNS checks, authentication, publishing, account changes, uploads, billing or analytics happen.
- Public pages are compact previews of real HTML content, not physical phone mockups.

## Review checklist

Run `npm ci`, `npm run typecheck`, `npm run build`, `npx playwright install chromium`, then `npm run test:ui`. Inspect the screenshots at 390, 768 and 1440px. Review the 320 and 1100px overflow results and keyboard tests. Confirm the editor and dirty-design bar remain easy to use on narrow screens. Any visual changes require fresh captures before approval.
