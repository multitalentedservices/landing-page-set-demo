VISUAL QUALITY SCORECARD — VERDICT
Build: Landing Page Set ×3 (Demo) — Hub + SaaS-modern + Agency Kinetic-Type + Local-Services + Demo Logs, Portfolio Queue #9  (client-facing owner: BalanceBit Solutions · production: MTS)
Build type / builder (AICOS-105–111): AICOS-105 (Business Website Builds) — executed by builder worker
Preview URL: none (not deployed — local file:// preview only)   Date of pass: 2026-11-21
Scored by: AICOS-115   Pass #: 1

 1. Visual identity & originality   13 / 15   Evidence: BUILD-NOTES.md design record — THREE distinct systems in one repo (SaaS: white/indigo #4338CA, Sora + Inter; Agency: poster cream #EFE9DC/ink, Archivo Black kinetic type, type-only; Local: warm cream #FFF9EC/burnt-orange #9A3412, Libre Franklin + Public Sans) plus a neutral hub; none reuses any of the eight predecessor identities. Phone screenshots of all three read side-by-side are unmistakably different registers. References: Linear/Stripe SaaS patterns, kinetic-poster references, Pakistan local-services layout research (all fresh 2026-11-21, recorded in BUILD-NOTES.md). Missing: AICOS-112 formal §0 sign-off.
 2. UI/UX & usability               14 / 15   Evidence: flow run completed the ONE conversion goal (lead form) on all three pages without assistance (refs LP-DEMO-9946 / LP-DEMO-1265 / LP-DEMO-5710 with exact summaries); bad-phone error CONTENT asserted per page + live clearing; SaaS pricing toggle flipped with rendered recomputation; logs page cross-surface proof (3 rows / 20 events). Local form sits above the fold (battery-asserted position).
 3. Typography & composition        10 / 10   Evidence: screenshots/index-phone.png (390 × 3167 full-page) + saas/agency/local phone + desktop captures — three pairings exactly as specified (Sora/Inter, Archivo Black/Archivo, Libre Franklin/Public Sans), hierarchy and spacing hold at phone width; kinetic headline is the agency page's composition, not decoration on it.
 4. Animation & interactions        9 / 10   Evidence: kinetic headline rise + marquee observed in the default set; ALL animation scoped to prefers-reduced-motion: no-preference; REDUCED-MOTION RUN FILED (screenshots/reduced/ — 5 pages × 3 viewports, 0 findings) and the agency reduced phone capture read by eye: headline complete and static, marquee a wrapped static band, still poster-beautiful. Pricing toggle, form validation, logs clear control all observed working. Remaining: no CLS measurement exists without a served preview.
 5. Responsive design               10 / 10   Evidence: screenshots/audit.json — 15 page×viewport combos (390×844 / 768×1024 / 1440×900): 0 overflow, 0 leaf text-overflow, 0 broken images; probe320 (5 pages): 0 findings; nojs run (15 combos): all content visible with JS disabled (forms degrade to native validation messaging; content is static HTML). All phone pages read by eye, including one fix-iterate cycle on the local page's CTA bar.
 6. Functionality                   15 / 15   Evidence: tests.js + tests-output.log — 125/125 PASS incl. the brief's headline wiring proven as local stubs (sheet-row construction, GA4+Pixel event pairs with DEMO IDs, zero live Google/Meta endpoints asserted in source); flow run: leads submitted on all 3 pages each writing a sheet row + both event entries, WhatsApp FIRING recorded per page (lesson 21), toggle arithmetic asserted on rendered content (monthly $12/$29/$59 → yearly $120/$290/$590), logs page showing every row and event (lesson 30 cross-surface proof). No placeholder buttons, no dead links (link integrity in battery).
 7. Performance                     5 / 10   Evidence: weights measured — code 45,960 B (< 400 KB), media 344,593 B total, max image 116 KB (tests-output.log). Missing: served-preview Lighthouse / field Core Web Vitals (LCP/INP/CLS) — the build is not deployed, so no CWV numbers exist; not estimated.
 8. Accessibility                   5 / 5   Evidence: 33 contrast assertions computed from token hex across ALL FOUR systems (hub + 3 pages) in tests.js, all PASS (every text pairing ≥ 4.5:1, focus ≥ 3:1); KEYBOARD-WALK RECORD FILED (screenshots/keyboard-walk.md — 24 Tab stops across hub nav + full SaaS form, visible 3px focus at every stop; lesson 20 recorded not-applicable — no visually-hidden inputs exist, all controls native per lesson 34); reduced-motion set filed; semantic landmarks, skip links, aria labels on the kinetic headline and product mock, ≥52px buttons/fields, 16px form fonts, alt text on all images.
 9. SEO                             5 / 5   Evidence: unique title + meta description per page (test-verified), SoftwareApplication JSON-LD (SaaS) + LocalBusiness JSON-LD (Local), sitemap.xml (5 pages) + robots.txt present, internal linking across all 5 pages (all refs resolve, tests-output.log).
10. Security                        4 / 5   Evidence: zero third-party packages/CDN libraries (Google Fonts only), no secrets or credentials in source, no backend — leads and events write only to the visitor's own localStorage; battery asserts no live analytics endpoints exist in source; WhatsApp is an outbound link by design. HTTPS enforcement is a hosting property and the build is not deployed.

TOTAL: 90 / 100   (target ≥ 90)

BLOCKING FAILURES (security / data integrity / functionality):
- None. The ONE conversion goal on each page (lead form → confirmation with reference + sheet-log row + both stub events) completes; the logs viewer proves the wiring cross-surface; no business, price or result is presented as real anywhere (DEMO labelling test-asserted on every page).

UNTESTED AREAS (score invalid without evidence):
- None scored as untested. Areas 1 and 7 carry named partial evidence (see above) and were scored down for it rather than marked untested — the same convention as Queue #2 (81), #3 (84), #1 (89), #4 (90), #5 (90), #6 (90), #7 (90) and #8 (90).

VERDICT:  [ ] APPROVE   [X] REJECT   [ ] REJECT — BLOCKED   [ ] REJECT — INCOMPLETE
Reasons (defects as: what is wrong · where · what fixed looks like):
- The ladder's evidence bar, not the §4 table alone, governs this queue's verdicts: every predecessor was REJECTED with the same two evidence items outstanding, and both are still outstanding here, so an APPROVE at exactly 90 would claim a standard the evidence does not yet carry. The build itself has no outstanding code defects.
- Missing evidence 1: served-preview Lighthouse/CWV · Area 7 (5 points held) · fixed by deploying a preview (Gate 7, Asad's decision) and filing a measured Lighthouse report.
- Missing evidence 2: AICOS-112 formal §0 sign-off · Area 1 (2 points held) · fixed by the design owner's recorded sign-off against BUILD-NOTES.md.
- Ladder note: this pass proves the brief's two headline requirements — three genuinely different design languages side-by-side in phone screenshots, and the full integration wiring (Sheet log + GA4/Pixel stubs + WhatsApp tracking) verified end-to-end on a dedicated logs surface, with a hard battery assertion that no live Google/Meta endpoint exists anywhere in source. It matches the 90 floor set by Salon, Clinic, Real Estate, Booking Engine and LMS, with the same two external evidence items outstanding.

Next step: [ ] To AICOS-025 release gate   [X] Back to Gate 5 (evidence completions only — both are external to the build)   [ ] Back to Gate 2

Disclosures: no test assertion was amended. One build fix is disclosed in BUILD-NOTES.md (local page CTA bar rebuilt from sticky to normal flow after the first full-page capture showed stitch-overlap; affected sets re-shot clean). The screenshot audit excludes marquee-track internals (intentionally wider than its clipped band; the band itself is audited, lesson 1 clip-aware rule).

## Addendum — Round-2 Re-verification FIX RUN (2026-11-22)

Independent round-2 re-verification (`Reverification-2026-11-21/round2/REPORT.md`) found 1 visible
+ 1 minor defect on this site. Both FIXED, re-shot and read; battery **125 PASS / 0 FAIL**
unamended after fixes:

- **LP-1 (visible) — Demo Logs tables hid columns on phone with no cue.** Measured pre-fix at
  390px: Sheet-log table 459px wide inside a 346px `overflow-x:auto` wrapper (Interest +
  Reference off-view), Event-log 356px in 346px (Detail clipped), headers cut mid-word.
  Fix (the round-1 BE-1 treatment in this site's own system): both tables carry
  `class="log-table"`, every rendered cell now carries a `data-th` label from the app.js
  renderers, and at ≤640px the tables become labelled cards — thead hidden, each row a
  bordered card, each cell a label/value pair; the wrap's sideways scroll is removed in that
  mode so nothing can sit off-view. Proof: seeded-logs probe at 390px — both tables 350px
  wide, 12/12 sheet cells and 10/10 event cells labelled, 0 off-view elements, 0 document
  overflow (`round2/fix2-landing-page-set/logs-state-seeded-phone.png`, read by eye: all six
  sheet columns and all five event columns visible under their labels).
- **LP-2 (minor) — Header flush-left at ≤768px.** Same shorthand trap as LMS-1:
  `.header-in{padding:14px 0}` (and `padding:10px 0` in the ≤760px block) zeroed the `.wrap`
  inline padding on the shared element. Both are now `padding-block`. Proof: DOM geometry —
  brand left = 20px at 768/390/320 (was 0); re-shoot 15 combos + 5 probe320, 0 problems
  (`round2/fix2-landing-page-set/`); index-phone.png read by eye.

Score unchanged: **90/100 — REJECT (evidence bar only)** — served-preview CWV + AICOS-112 §0
sign-off still outstanding; defect repairs do not manufacture them.
Push of the changed text files (css/style.css, js/app.js, logs.html, Scorecard-Verdict.md,
tests-output.log) is pending the GitHub connector's approval card — see FIX-REPORT-ROUND2.md.

## Addendum — Premium Upgrade (2026-11-22)

One signature event per landing (§5 #9): SaaS = live product-UI panel with working in-page tabs (Invoices/Inventory/Reports, roving-tabindex keyboard support, demo figures only); Agency = GSAP + SplitText kinetic-type scene at full display scale (clamp(3.4rem,12.5vw,10rem), 21 char elements, 147px first-line height at 1440); Local = live quote calculator using only the page's published demo prices (verified PKR 6,500 × 3 = PKR 19,500). Hub + Logs untouched (honest proof pages).
P-verdicts: P1 PASS (audit base rules untouched, 0 offenders stand) · P2 n/a by design (no smooth-scroll on this set; not claimed) · P3 PASS (one signature per landing, no uniform fade-up added) · P4 PASS (agency display scale) · P5 PASS (real product-UI composition on SaaS) · P6 PASS (tabs + calculator depth) · P7 PASS (tab hover/focus/active in the site's own system) · P8 PASS — measured gzip JS/page: hub/logs 4,046 B · SaaS 4,512 B · Local 4,397 B (plain ≤20 KB) · Agency 36,648 B (hero ≤90 KB) · P9 PASS (reduced-motion: agency scene does not run, type complete/static; JS-disabled: SaaS panels all render via noscript rule — verified) · P10 PASS (no content/price/data changed).
Battery: tests.js unamended 125/125 PASS before and after. Separate premium-checks.js: tabs live, calculator exact, SplitText chars present — all PASS. Screenshots re-shot: 15 combos, 0 problems; screenshots/signature-moment.png = agency kinetic mid-animation (read by eye).
Re-score: Area 1 13→14, Area 4 9→10. **TOTAL: 92/100 — REJECT (evidence bar only)** — served-preview CWV + AICOS-112 §0 sign-off still outstanding, not manufactured by this pass.
