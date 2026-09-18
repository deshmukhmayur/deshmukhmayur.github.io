# UI polish pass: nav, footer, social icons, prompt lines, type scale

Type: spec
Status: ready-for-agent

Origin: grilling session (grill-with-docs), Sep 2026. All decisions were settled interactively; CONTEXT.md and ADR 0007 were amended in-session to permit the `show` verb.

## Problem Statement

The site's chrome has accumulated rough edges: the nav has no home affordance, no active-page indicator, a broken mobile layout where the theme toggle stretches to full navbar height; social links are bare text where icons would communicate faster; the breadcrumb line on every subpage is redundant with the nav and duplicates the filter-row command directly beneath it (`ls projects --kind` followed by `--kind= …` chips); and the type system renders the base text at 14px with a long tail of sub-12px chrome text, all hardcoded in px.

## Solution

A single polish pass that: rebuilds the nav (logo mark home link, active-state marker, two-row mobile layout, compact theme toggle), replaces text social links with monochrome icon links on the homepage panes and footer, deletes the breadcrumb in favor of terminal-native prompt lines (filter rows absorb the listing prompt; detail pages get `~/section $ show <slug>`), removes the duplicated `--kind` from filter command labels, and migrates the type scale to rem with a 16px body base and a 12px chrome floor.

## User Stories

1. As a visitor, I want a logo mark in the nav that links home, so that I can always get back to the homepage with one click.
2. As a visitor, I want the current section highlighted in the nav with a `>` prefix and cyan highlight, so that I know where I am without reading breadcrumbs.
3. As a mobile visitor, I want the nav laid out in two rows (brand + toggle, then links), so that the theme toggle doesn't stretch to double height and the links stay readable.
4. As a visitor, I want the theme toggle to be a compact `[dark]`/`[light]` chip, so that it looks like part of the terminal chrome instead of an oversized button.
5. As a visitor, I want social links on the homepage panes as monochrome icons, so that I can recognize the platforms at a glance without reading labels.
6. As a screen-reader user, I want each icon-only social link to carry an aria-label, so that I know where it leads.
7. As a visitor, I want social icons in the footer on the right side with copyright/rss/contact on the left, so that the footer balances and gives me one consistent place to find Mayur elsewhere.
8. As a visitor on mobile, I want the footer to stack vertically, so that the two sides don't squeeze together.
9. As a visitor, I want the listing pages to show one prompt line (`~ $ ls projects`) instead of a breadcrumb plus a filter command, so that the top of the page is less noisy.
10. As a visitor, I want the filter command label to not repeat the flag name statically (`--kind --kind=`), so that the line reads like a real command.
11. As a visitor, I want detail pages to open with `~/section $ show <slug>`, so that the navigation metaphor feels consistent (ls → show) and the section segment links back to the listing.
12. As a visitor, I want the about and contact pages to follow the same prompt-line treatment, so that every subpage behaves the same way.
13. As a visitor, I want body text at 16px, so that prose is comfortably readable.
14. As a visitor with low vision, I want no chrome text below 12px, so that captions and meta labels stay legible.
15. As a visitor who sets a custom browser font size, I want the whole site sized in rem, so that my preference scales everything.
16. As a visitor using keyboard navigation, I want visible focus outlines preserved on all new icon links and toggle, so that keyboard use still works.
17. As the site owner, I want the homepage doodle placeholder left as-is, so that it gets replaced during the content-generation phase as planned.
18. As the site owner, I want the about page's `ls elsewhere/` rail to keep text labels, so that the command-output metaphor stays intact there.

## Implementation Decisions

- **Nav**: extract the mark portion of `img/logo.svg` (first two paths, viewBox cropped to `0 0 172 172`) into a standalone mark asset; ~24px, left side, links to `/`. Section links right. Active page = `>` prefix + cyan highlight. Mobile (≤760px): two rows — row 1 mark + toggle, row 2 wrapping links; toggle vertically centered at fixed compact height.
- **Theme toggle**: restyle as compact chip `[dark]`/`[light]` in Space Mono.
- **Social icons**: new `SocialIcon.astro` component — inline monochrome brand SVGs (github, linkedin, cara, instagram, printables), ~16px, `currentColor`, default `--dim`, hover `--cyan`, `aria-label` per link, tooltip via `title`. Icon-only on homepage pane corners; icon row in footer right side. About rail keeps text labels.
- **Footer**: left = © year · rss · contact; right = social icon row; stacks on mobile; ASCII cat unchanged; no uptime line (dropped during grilling).
- **Prompt lines**: `Breadcrumb.astro` deleted and replaced by a `PromptLine.astro` that renders `~/section $ show <slug>` (detail pages, about, contact), with the section segment linking back to the listing. On listings, no separate prompt line — `LsFilterRow` absorbs it, rendering `~ $ ls <section>` as its command label. The static flag name (`--kind`) is removed from the command label; option chips stay always visible; `--kind=<value>` text appears only when a non-"all" filter is active (consistent with `?kind=` deep-link state).
- **Verb rule**: detail-page verb is `show` (from `git show`). CONTEXT.md's Command entry and ADR 0007's fiction-boundary paragraph were amended in-session: verbs must be real POSIX commands or established shell-culture commands.
- **Type scale (option C)**: `body` font-size → 1rem (16px); html font-size 100%. All font-sizes converted to rem (÷16). Mapping: body/prose 1rem; chrome body 0.8125rem; small labels/meta 0.75rem; anything currently below 12px raised to the 0.75rem floor; headings remapped (h1 ≈ 1.75rem, h2 ≈ 1.125rem, hierarchy preserved). Line-heights reviewed in the same pass; spacing (padding/margin/gap) → rem as a stretch goal within the same PR if the page review doesn't bog down.
- **Out of the fiction boundary**: nothing else changes; prompts remain `~ $` (global) and `~/<section> $` (sections) per ADR 0007 canonical strings.
- Homepage doodle placeholder stays; about page untouched.

## Testing Decisions

- Test external behavior only: run `astro build` (plus any existing check script) to catch broken imports after deleting Breadcrumb and rewiring 12 pages.
- Visual review seam: dev server screenshots of every page type (home, about, one listing + one detail per section, contact, 404, resume) at desktop and mobile widths — agent screenshots and reports; user gives thumbs-up on borderline cases. This is the primary acceptance test for a styling pass.
- Interaction checks in the browser: filter row renders `~ $ ls projects` with no duplicated flag text; chips still filter rows, update the count, and reflect `?kind=` deep links; theme toggle still persists and doesn't stretch; active nav state matches current section.
- Prior art: the site has no unit test framework; validation is build + browser inspection, consistent with how previous tickets (prototype → implement) were verified.

## Out of Scope

- Cloudflare deployment and analytics (next phase).
- Content generation, including the real homepage doodle illustration (spec §7 of the original plan).
- Any redesign beyond the agreed surfaces: about page body, listings' row design, detail page bodies, contact form.
- A breadcrumb JSON-LD / structured data (none existed; the loss of the breadcrumb nav landmark is accepted).

## Further Notes

- The `show` verb and the amended command-verb rule are already recorded in CONTEXT.md and ADR 0007 — no further doc work needed for that.
- If the rem migration reveals scope creep (e.g. dozens of one-off px values in inline styles), stop at font sizes + line-heights and defer spacing to a follow-up ticket rather than rushing the same PR.
