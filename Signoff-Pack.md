# SIGN-OFF PACK — Prepared for AICOS-112 §0 (Design Systems & Template Library)

Build: Landing Page Set ×3 — Hub + SaaS (Billora) + Agency (Studio Kinetiq) + Local Services (CoolCare AC Services) + Demo Logs, Portfolio Queue #9
Client-facing owner: BalanceBit Solutions · Production: MTS · Date prepared: 2026-11-21 (top-up pass — this build predates the pack requirement; the pack documents the set exactly as built, nothing aspirational)
Status: **prepared for AICOS-112's §0 sign-off — the sign-off itself is AICOS-112's to record; it has NOT been given yet and is not claimed anywhere in this build.**

## 1. Design-direction note
- **Identity:** one component system deliberately re-skinned into **three genuinely different design languages in one repo** — the brief's headline claim, proven side-by-side in the captures (screenshots/saas-phone.png, agency-phone.png, local-phone.png). A neutral gallery hub frames the set; each landing page is a complete, self-contained register.
- **Hub — gallery neutral:** warm grey ground, ink text, Archivo + Inter. Its only job is to present the three pages (swatch cards showing each page's own palette) and route to the logs viewer. It introduces no fourth design language.
- **(a) SaaS-modern — "Billora"** (fictional invoicing + inventory-basics app): white ground, indigo accent, Sora + Inter. The product is shown, not described — an HTML/CSS product-UI mock labelled DEMO DATA, a workspace photograph, a 6-feature grid, 3 steps, and 3-tier pricing with a monthly/yearly toggle. One dominant CTA ("Get a free demo" / "Request my demo") repeated down the page.
- **(b) Agency kinetic-type — "Studio Kinetiq"** (fictional creative agency): warm poster ground, Archivo Black + Archivo. The design IS kinetic typography — viewport-scale stacked headline ("BRANDS / THAT MOVE / PEOPLE.", middle line outlined), a CSS marquee band, numbered work list. **Type-only by design: no photography is used or forced.** All motion is scoped inside `@media (prefers-reduced-motion: no-preference)`; under reduced motion the page renders complete and static (proven in the reduced-motion capture set).
- **(c) Local-services — "CoolCare AC Services"** (fictional, Gujranwala): warm cream ground, Libre Franklin + Public Sans. Trust-led and phone-first: urgent click-to-call strip at the very top, hero Call + WhatsApp CTAs, the lead form above the fold, 6 services with PKR demo prices, areas-served list, hours, and a closing call/WhatsApp bar in normal flow.
- **Why the set works as one build:** the three pages share exactly one component system (buttons, fields, cards, steps) and differ in ground, accent, type pairing and layout register — demonstrating that the system, not a template, is the product. The §0 screenshot test: no page could be mistaken for another page in the set, nor for any predecessor (Gift Basket cream/terracotta/emerald; Restaurant ink/parchment/brick; MTS black/white/lime; Salon porcelain/blush/bronze; Clinic white/petrol; Real Estate navy/copper; Booking Engine slate SaaS skins; LMS paper/academic-green).

## 2. Inspiration references actually used (researched 2026-11-21, as recorded in BUILD-NOTES.md)
- **SaaS — Linear / Stripe pattern research** (fresh search 2026-11-21: SaaS landing teardowns). Taken: show the product instead of describing it (HTML/CSS product mock as hero proof), value proposition as a real sentence, one dominant CTA repeated, pricing visible without a sales call. These are also the Design-Inspiration-Library's Corporate services entries (Stripe + Linear, `~/workspace/mts-webdev-company/Design-Inspiration-Library.md`) — the one place in this set where a library entry genuinely applies, and it applies to the SaaS page only.
- **Agency — kinetic-type references** (fresh search 2026-11-21: kinetic typography agency patterns, incl. the Qalib Kinetic Poster system and kinetic-type design guidance). Taken: viewport-scale display type as the page's architecture, running ticker band between sections, one technique per viewport, legibility surviving motion, everything stops under prefers-reduced-motion. Not a library entry — fresh research, recorded in BUILD-NOTES.md.
- **Local — local-services landing research** (fresh search 2026-11-21: one-page local-services layouts for Pakistan/MENA). Taken: the phone-call order — offer, trust strip, services with price cues, areas, hours, contact — WhatsApp as the primary message channel, city/area names in the headline, and a form asking only name + phone + service. Not a library entry — fresh research, recorded in BUILD-NOTES.md.
- Patterns taken in all three cases; no assets or text copied.

## 3. Palette & type token tables (complete — from css/style.css, one token set per theme via `body[data-theme]`)
Shared semantic hues across all four themes: error red `--error` #B3261E (form errors only) and WhatsApp green `--wa` #14632F (the WhatsApp channel role only; white on it ≥ 4.5:1 per the battery).

### Hub (gallery)
| Token | Hex | Role |
|---|---|---|
| --bg | #F4F4F0 | Warm grey page ground |
| --surface | #E9E9E2 | Tinted section band |
| --card | #FFFFFF | Card ground |
| --ink | #1C1C1A | Text, borders, primary button |
| --muted | #45453F | Secondary text |
| --accent / --focus | #33322E | Links / focus ring |
Type: display "Archivo" · body "Inter".

### (a) SaaS — Billora
| Token | Hex | Role |
|---|---|---|
| --bg / --card | #FFFFFF | Page and card ground |
| --surface | #EEF0FE | Tinted band, mock header, pills |
| --ink | #131A2A | Text, borders |
| --muted | #3E4A68 | Secondary text |
| --accent / --focus | #4338CA | THE indigo accent: primary buttons, step numerals, links, focus |
| --line | #C7CCEA | Hairlines in the mock and lists |
Type: display "Sora" · body "Inter".

### (b) Agency — Studio Kinetiq
| Token | Hex | Role |
|---|---|---|
| --bg | #EFE9DC | Warm poster ground |
| --surface | #E3DAC4 | Tinted band |
| --card | #F7F3E8 | Card ground |
| --ink | #16130E | Text, primary button, marquee band |
| --muted | #4A4130 | Secondary text |
| --accent | #9A3412 | Burnt-orange signal — large type and numerals ONLY |
| --focus | #16130E | Focus ring |
| --line | #B9AC8E | Hairlines |
Type: display "Archivo Black" · body "Archivo". (Agency overrides `.btn` to ink-filled; `.btn-wa` stays the shared WhatsApp green.)

### (c) Local — CoolCare
| Token | Hex | Role |
|---|---|---|
| --bg | #FFF9EC | Warm cream ground |
| --surface | #FCEFCB | Tinted band |
| --card | #FFFFFF | Card ground |
| --ink | #2A2118 | Text, borders |
| --muted | #54432E | Secondary text |
| --accent / --focus | #9A3412 | THE accent: Call CTAs, submit button, urgent strip, focus |
| --line | #DECFA3 | Hairlines |
Type: display "Libre Franklin" · body "Public Sans".

Contrast (computed from hex in the battery, all PASS — tests-output.log): **33 contrast assertions across all four systems**, every text pairing ≥ 4.5:1, focus ≥ 3:1.

Component tokens (shared, all themes): one button system (52px min-height, 10px radius, 2px ink border; filled accent = primary, `.btn-ink` = ink role, `.btn-ghost` = transparent secondary, `.btn-wa` = WhatsApp green channel role), one field system (52px, 2px ink border, 10px radius, bold label above, `.error` line below in --error; fields 16px — no iOS zoom), one card system (2px ink border, 14px radius, 22px padding), one table system (logs viewer: 1px --line cells, surface header row, wrapped in a bordered scroll container).

## 4. Evidence filed for the sign-off read
- Full-page captures of every page at 1440 / 768 / 390 + 320px probes + JS-disabled and reduced-motion sets: `screenshots/` (audit.json per set — 0 overflow / 0 leaf text-overflow / 0 broken images in every set; the marquee track's internals are excluded from the audit by design and disclosed in BUILD-NOTES.md — the band itself is audited).
- Component-consistency pass, page by page: `Component-Consistency-Pass.md` (filed in the same top-up pass as this pack).
- Flow evidence: `screenshots/flow-log.txt` + flow captures — a lead submitted on EACH page (SaaS LP-DEMO-9946, Agency LP-DEMO-1265, Local LP-DEMO-5710), a rendered phone-error state per page, pricing toggle in both states, and the logs page showing all of it (3 sheet rows, 20 events).
- Test battery: `tests-output.log` — 125 PASS / 0 FAIL, including the 33 contrast assertions above and zero live Google/Meta endpoints (integrations are local stubs with DEMO placeholder IDs only).

## 5. What AICOS-112 is asked to record
- §0 screenshot test result against §1 above (each page's layout could not belong to another page in the set or to another industry).
- Palette/type discipline confirmation against §3 (no stray colours in the rendered captures, per theme).
- Sign-off, or defects returned as: what is wrong · where · what fixed looks like.
