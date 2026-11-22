# PERFORMANCE PACK — Landing Page Set ×3 (Queue #9)

Purpose: everything the served-preview measurement needs from the build side. The main agent serves finished sites via GitHub Pages; this pack records the measured local weights and the weight-discipline choices made so the served numbers can pass when measured. **No Lighthouse or Core Web Vitals numbers are claimed anywhere in this pack — none exist yet (see the pending section).** Filed in the 2026-11-21 top-up pass from the build's own battery output and filesystem; no figure is estimated.

## Measured weights (local, 2026-11-21, from the test battery + filesystem)
- Code (5 HTML pages + css/style.css + js/app.js + js/logic.js): **45,960 B total** — budget < 400 KB, using ~11% of it (battery figure, tests-output.log).
- Media: **344,593 B total across 3 photographs** — budget ≤ 1.6 MB, using ~22% of it (battery figure; the 251 B favicon.svg is additional and negligible).
- Per-image sizes (each under the ≤ 120 KB ceiling):
  - assets/saas-workspace.jpg — 116,086 B (SaaS hero)
  - assets/local-team.jpg — 114,978 B (Local page)
  - assets/local-hero.jpg — 113,529 B (Local hero)
  - assets/favicon.svg — 251 B (text)
  - The Agency page carries **no photograph at all** — type-only by design (battery-asserted: no jpg referenced on that page).

## Weight-discipline choices (why the served numbers should pass)
- **Zero JavaScript libraries and zero CSS frameworks.** Hand-coded vanilla JS + ONE stylesheet shared by all five pages (the three themes are token sets in the same file, not three stylesheets); the only third-party request is Google Fonts (Archivo / Archivo Black / Inter / Sora / Libre Franklin / Public Sans, `display=swap` — text renders on the fallback first).
- **No live third-party calls at all:** the GA4 + Meta Pixel wiring is a local stub with DEMO placeholder IDs (`G-DEMO-000000`, `DEMO-PIXEL-000000`); the battery asserts zero live endpoints in source (no googletagmanager.com, no connect.facebook.net, no google-analytics.com). The lead form writes to a localStorage sheet log; nothing leaves the browser.
- **Photography only where the register needs it:** SaaS 1 photo, Local 2 photos, Agency 0 — the set's total media weight (344,593 B) is lower than most single-page predecessors despite holding three landing pages.
- **No layout-shift machinery:** images are block-level with natural aspect inside stable card/hero structure; no popups, cookie banners or late-injected bars. The local page's closing call bar is in normal flow (an earlier sticky version was rebuilt into flow during the build and the affected sets re-shot clean — disclosed in BUILD-NOTES.md).
- **Motion is CSS-only and fenced:** the agency marquee + headline rise exist only inside `@media (prefers-reduced-motion: no-preference)`; the SaaS hero's Ken Burns drift is disabled under reduced motion. Reduced-motion capture set filed, 0 findings.
- **Reveal-by-default:** content is visible without JS (JS-disabled capture set filed for all 5 pages, fully visible), so first paint is HTML + CSS + at most one photograph per page.

## Served-preview CWV: PENDING — to be measured on the GitHub Pages preview by the main agent
- LCP / INP / CLS: **not measured** — the build is not deployed, and no numbers are estimated or invented here (honesty rule). Lab numbers from the local file:// preview are not filed in this pack because the #11–#14 pack standard records weights only until a served measurement exists.
- Expected risk points to check at measurement: the six-family Google Fonts payload (the heaviest third-party cost in the set — check font swap behaviour per theme), the SaaS hero photograph (116,086 B — should be that page's LCP element), and the agency marquee's composited animation on low-end phones.
- Fixed by: the main agent deploying the GitHub Pages preview and filing a measured Lighthouse report against this pack; Area 7 of the scorecard is scored on partial (weight) evidence until then.
