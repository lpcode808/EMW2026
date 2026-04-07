# EMW 2026 — Student Conference Guide

**Live app → [https://lpcode808.github.io/EMW2026](https://lpcode808.github.io/EMW2026)**
**Code guide → [https://lpcode808.github.io/EMW2026/code-guide.html](https://lpcode808.github.io/EMW2026/code-guide.html)**

---

A mobile-first conference companion for students from **[Hawai'i School for Girls at La Pietra](https://www.lapietra.edu/academics/techzone)** attending **[East Meets West 2026](https://emwhawaii.com/2026)** (Thursday, April 9 · Sheraton Waikiki, Honolulu).

Tap sessions for details and student-friendly summaries, take timestamped notes, star speakers you want to remember, and export everything at the end of the day. Works offline once loaded.

---

## What's in the Repo

| File | Purpose |
|---|---|
| `index.html` | The attendee app — all CSS, JS, and data in one file |
| `code-guide.html` | Mobile-friendly teaching page explaining how the app works |
| `sw.js` | Service worker for offline support (stale-while-revalidate) |
| `favicon.svg` | Conference-inspired SVG favicon (teal + orange) |
| `scripts/chrome-mobile-smoke.mjs` | Headless smoke test for student flows in a phone viewport |
| `CLAUDE.md` | Architecture reference for AI agents and future developers |
| `SPEAKER_BIOS_PLAN.md` | Draft bios + curated links for all 27 Thursday speakers (pending teacher review) |

---

## App Features

| Feature | Details |
|---|---|
| **Schedule tab** | 23 Thursday sessions, tap-to-expand accordion rows |
| **NOW / Up Next** | Pulsing teal **NOW** badge on the live session, lime **Up Next** on the next — updates every minute against HST |
| **Student Summaries** | Plain-language session recaps inside each accordion, reviewed and rewritten for the student audience |
| **Speaker jumps** | Tap a speaker name inside an expanded session to jump to their profile in the Speakers tab |
| **Speakers tab** | 27 Thursday presenters — alphabetical, searchable by name/role/company, expandable cards |
| **Star speakers** | Swipe left to star on mobile; tap-to-star button also in expanded card; pull starred speakers to top or clear them |
| **g.ai research** | One-tap Google AI Mode search pre-filled with speaker name + title |
| **All speaker names** | Session previews show every presenter instead of truncating with "+ N more" |
| **Notes** | Timestamped session notes, per-speaker person notes, and multi-sticky quick notes |
| **Notes search** | Filter saved notes by text, session title, or speaker name |
| **Collapsed notes view** | Compact single-line display for long note lists; tap to expand |
| **Export / Clear** | Copy all notes as plain text; confirmation-guarded Clear All button |
| **Code Guide** | Linked explainer page with beginner and "done a little coding" audience modes, a view/tinker intent toggle, and a Schedule-tab callout that collapses after first load |
| **Offline support** | Service worker pre-caches the app on first visit so it loads at the venue without WiFi |
| **Social meta** | Open Graph and Twitter Card tags for clean link previews when sharing the URL |
| **Dark mode** | HSG-Branding design system — navy/teal/orange/lime color tokens |
| **No install** | Single HTML file, runs in any mobile browser, no app store required |

---

## How This Was Built

This app started as a single Claude Code session and grew through focused follow-up conversations. What follows is a condensed version of that story — useful if you're continuing development or building something similar.

### 1. Initial Request

The project opened with a simple brief:

> *"I have a local conference we're attending. I have the information from the website to scrape and I want to build a mobile-first app that my students can access... It's only going to be like six hours for them. Mobile-first — scroll, scroll, scroll. You tap once to reveal an item. Maybe tap a sub-area to reveal something else. I'll have a particular styling I'll point you to. HSG-Branding dark mode pls."*

Key constraints from that first message:
- Mobile-first, scroll-based browsing
- Tap-to-reveal accordion interaction
- Dark mode using an existing brand folder (`~/Coding/HSG-Branding/`)
- Student audience, not general public

### 2. Data + Planning

Claude entered plan mode and launched two parallel agents: one to read the HSG-Branding design system, one to extract the conference schedule and speakers from two PDFs the teacher had placed in that folder. The PDFs were the data source — no scraping needed.

Three quick questions clarified the rest before any code was written:
- *How should tap-to-reveal work?* → Accordion (tap row → expands inline)
- *Where will students access this?* → GitHub Pages
- *Which days?* → "We're only going on Thursday"

### 3. Build — First Pass

The initial `index.html` came out in one pass:
- Dark-mode HSG-Branding design tokens applied throughout
- 23 Thursday sessions with descriptions and student-friendly summaries
- Accordion interactions (session → student summary → note)
- Notes tab with `localStorage` persistence and plain-text export
- Single self-contained file, zero dependencies, no build step

### 4. Speakers Tab

After seeing the schedule the teacher asked: *"How would a speakers list look since I think you have access to that data?"*

That added a third tab with 27 Thursday speakers, live search, initials avatars, and session chips that jump to the relevant accordion.

### 5. Deeper Notes Model

> *"Whenever someone makes a note during a session, have a real timestamp to that session of the local device time. Allow a note without being stuck somewhere. And if someone clicks a person's profile, they can make a note on that person."*

The notes model expanded to three types:
- **Session notes** — timestamped, attached to a schedule entry
- **Quick notes** — free-form multi-sticky composer in the Notes tab; each save creates a new independent sticky
- **Person notes** — attached to a speaker card

### 6. Speaker Research + Profile Jumps

A one-tap **Google AI Mode** link (pre-filled with speaker name + title) was added to each expanded speaker card, giving students a way to research who they're about to hear from.

Speaker names mentioned in expanded schedule rows became tappable — tapping one jumps to that speaker's profile in the Speakers tab.

### 7. Code Guide

The app was working, so the focus shifted from *students using the site* to *students learning from the site*. A new `code-guide.html` was linked directly from the live app. It teaches from the real project structure — not a simplified demo — and opens with comparisons to scrolling Instagram, YouTube, or TikTok to ground it in something familiar.

Two toggles let readers self-sort:
- **Audience mode** — New to coding / Done a little coding
- **Intent mode** — Just browsing / Want to tinker

### 8. Pre-Launch Polish

A dedicated session before the conference date addressed the remaining gaps:

- **NOW / Up Next indicator** — The app had no sense of time. The currently-running session now gets a pulsing teal **NOW** badge; the next upcoming one gets a lime **Up Next** badge. It updates every minute.
- **Mobile browser theming** — A `<meta name="theme-color">` tag makes the browser chrome match the app's navy background on iOS and Android.
- **Header link** — The external conference link was relabeled from a bare `↗` to **EMW ↗** so students recognize the destination before they tap.

### 9. iPhone Testing Surfaces Real Bugs

The teacher tested on a real iPhone and found three issues invisible in any desktop test:

1. **No way to recover from corrupted notes** — A confirmation-guarded **Clear All Notes** button was added alongside export.
2. **Blur-save firing on the wrong element** — The `blur` auto-save handler was attached to any `.note-textarea`, including the quick-note composer which lacks the required `data-note-type` attribute. A one-line guard fixed it.
3. **iOS Safari zoom on small text inputs** — iOS zooms the viewport when any `<input>` or `<textarea>` with `font-size` below 16px gets focused. A `@supports (-webkit-touch-callout: none)` CSS block bumps all form elements to exactly 16px on iOS only, leaving the design unchanged everywhere else.

This is why the smoke test exists, and why real-hardware testing is non-negotiable before students use the app.

### 10. Speaker Stars + Swipe Gesture

> *"How do students quickly track speakers they want to remember without opening every card?"*

A starring system was added with swipe-to-star on mobile (swipe left on any speaker row), a tap fallback button in expanded cards, and toolbar controls to pull starred speakers to the top or clear them. Gesture detection moved to `touchend` with velocity/direction thresholds to prevent swipes from also toggling the card open.

### 11. Content + Offline

A content review pass went through all 23 sessions and corrected two summaries with misleading framing. Research annotations with learn-more links were added to several sessions.

`sw.js` added offline support via a stale-while-revalidate service worker — the app now loads at the venue even without WiFi. The Notes tab also gained a search input that filters all saved notes by text, session title, or speaker name entirely in memory (no backend needed).

### 12. Final Pre-Conference Pass

The last round of improvements addressed what students would feel most directly on the day:

- **Show all speaker names** — Session previews previously truncated presenter lists with "+ N more"; now every name shows.
- **Collapsed Notes view** — Long note lists can be toggled to a compact single-line format.
- **"Curious how this app works?" button** — Fixed to toggle the code-guide callout panel in place rather than navigating away.
- **Social sharing meta** — Open Graph + Twitter Card tags for clean previews when the app URL gets shared.
- **Hawai'i School attribution** — The app now surfaces the school's [TechZone](https://www.lapietra.edu/academics/techzone) link for context.
- **Enhanced summaries** — All 23 session summaries and research sections reviewed and rewritten once more with updated context.

---

## Prompting Patterns That Worked

For anyone building something similar:

- **Point to existing assets early.** Saying "use HSG-Branding dark mode" with a real folder gave Claude a concrete design system rather than an invented one.
- **Share data as files, not text.** Dropping the PDFs in a folder and saying "I placed it there" was enough — the data was read and structured automatically.
- **Clarify scope before build.** "Thursday only, not Wednesday" saved a lot of cleanup. Scope constraints answered early produce cleaner first passes.
- **Name the interaction model precisely.** "Scroll, scroll, scroll. Tap once to reveal. Tap sub-area for more." translated directly into the accordion structure.
- **Add features as follow-ups.** Notes, speakers, and stars were added after the initial build in natural conversation. The single-file architecture made this easy.
- **Keep later refinements narrow.** "Only the highlighted speaker line should jump to profiles" led to cleaner UX than making every related text element interactive.
- **State the audience as specifically as the feature.** "Assume they use websites but may never have coded before" was more useful than "make it educational."
- **Use familiar product metaphors.** Referencing Instagram and YouTube scrolling immediately grounded the explainer page in something students already understand.
- **Separate the draft from the merge.** For content that needs human review before students read it (speaker bios, session summaries), produce a plan document first. The plan becomes the review artifact — [`SPEAKER_BIOS_PLAN.md`](./SPEAKER_BIOS_PLAN.md) is the current example.
- **Test on the actual device.** Three iOS-specific bugs were invisible in every desktop and headless test. For anything student-facing, a real-hardware smoke run is not optional.
- **Time-dependent features belong at the end.** The NOW indicator only made sense once the session times were confirmed correct.

---

## Data Source

Conference schedule and speaker data sourced from official East Meets West 2026 materials (PDF documents).
Original site: [emwhawaii.com/2026](https://emwhawaii.com/2026) · Presented by **Blue Startups** · Title sponsor: **Pegasus Tech Ventures**

---

## Development

See [`CLAUDE.md`](./CLAUDE.md) for the full architecture reference: data schemas, JS function index, CSS design tokens, and a list of suggested next improvements.

### Service Worker Cache

After editing any cached file (`index.html`, `code-guide.html`, `favicon.svg`), bump `CACHE_NAME` in `sw.js` (e.g. `emw2026-v3` → `emw2026-v4`). Without this bump, returning visitors may see stale content until the background revalidate completes.

### Mobile Smoke Test

[`scripts/chrome-mobile-smoke.mjs`](./scripts/chrome-mobile-smoke.mjs) checks student flows in a phone-sized headless Chrome viewport:

- Schedule accordion opens; student summary expands
- Session notes save to `localStorage`
- Speaker search, starring, and starred-speaker controls work
- Quick note + export modal function correctly
- Key tap targets stay at or above 44px

```bash
# Run a local server first
python3 -m http.server 8765

# Then launch headless Chrome with remote debugging
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless --disable-gpu --no-first-run \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/emw-chrome-profile \
  http://127.0.0.1:8765/index.html

# Then run the test
node scripts/chrome-mobile-smoke.mjs
```

### Deploy

```bash
# If you changed index.html, code-guide.html, or favicon.svg — bump CACHE_NAME in sw.js first!
git add index.html sw.js   # or whichever files changed
git commit -m "describe your change"
git push
# Live at https://lpcode808.github.io/EMW2026 within ~60 seconds
```
