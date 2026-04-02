# CLAUDE.md — EMW2026 Student Conference Guide

Single-file mobile-first web app for students attending **East Meets West 2026** (Thursday, April 9, Sheraton Waikiki). Deployed to GitHub Pages.

## Live URL
`https://lpcode808.github.io/EMW2026`

## Architecture
**One file: `index.html`** — all CSS, JS, and data are embedded. No build step, no dependencies, no backend.

- Data lives in two JS `const` arrays at the top of the `<script>` block: `SCHEDULE` and `SPEAKERS`
- Notes persist in `localStorage` key `emw2026_notes`
- Fonts loaded via Google Fonts: **Sen** (display/headings) + **Manrope** (body)

## Design System
Dark mode adaptation of HSG-Branding (`~/Coding/HSG-Branding/`). CSS custom properties:

| Token | Value | Role |
|---|---|---|
| `--bg` | `#001329` | Page background |
| `--surface` | `#002040` | Cards, session rows |
| `--teal` | `#07a8a8` | Primary accent, CTAs, active states |
| `--orange` | `#c8531d` | Keynote/pitch badges |
| `--lime` | `#afcd53` | Student summary, networking badges |
| `--text` | `#fff7eb` | Body text |

Accordion animation uses `max-height` transitions with `cubic-bezier(0.16, 1, 0.3, 1)`. Tap targets are minimum 44px throughout.

## Three Tabs
1. **Schedule** — 23 sessions, accordion rows. Each expands to: meta (speaker/location/time), description, Student Summary sub-toggle, Add Note inline, external link.
2. **Speakers** — 28 Thursday presenters, alphabetical, searchable. Tap → shows company + session chips. Tapping a session chip jumps to Schedule tab and opens that accordion.
3. **Notes** — lists all saved notes in schedule order. Export button opens a modal with plain-text formatted copy, clipboard button.

## Data Structure

### SCHEDULE item
```js
{
  id: "thu-01",          // unique, sequential
  time: "9:15 AM",
  timeEnd: "9:20 AM",
  title: "...",
  type: "keynote",       // see badge types below
  speaker: "Name · Name2",   // · separated for multi-speaker
  location: "...",
  description: "...",    // factual, from original PDF
  studentSummary: "...", // student-friendly AI rewrite — FILL IN before event
  subItems: [            // optional nested list (e.g. VC firm list)
    { title: "...", speaker: "..." }
  ]
}
```

### Badge types
`keynote` `fireside` `panel` `pitch` `roundtable` `networking` `mindfulness` `ceremony` `meal` `break` `welcome` `presentation` `announcement` `background`

Meal/break/background items render at 60% opacity — intentionally de-emphasized.

### SPEAKERS item
```js
{
  name: "Full Name",
  role: "Job Title",
  company: "Organization",
  sessions: ["thu-04", "thu-22"]   // array of session IDs they appear in
}
```

## Key JS Functions
| Function | Purpose |
|---|---|
| `renderSchedule()` | Builds schedule HTML from `SCHEDULE`, attaches all events |
| `renderSpeakers(filter)` | Builds speakers list, accepts search string |
| `renderNotesTab()` | Renders saved notes sorted by schedule order |
| `toggleSession(id)` | Opens/closes a session accordion |
| `toggleSummary(id)` | Opens/closes the Student Summary sub-accordion |
| `toggleNote(id)` | Opens/closes the note textarea |
| `saveNote(id, text)` | Persists to localStorage, syncs UI indicators |
| `buildExportText()` | Formats all notes as plain text for clipboard export |
| `showToast(msg)` | Shows 2-second bottom toast notification |

## Things to improve / add
- **Student summaries**: All sessions have placeholder summaries written by the agent. Teacher should review and rewrite with class context before April 9.
- **"You are here" indicator**: Could highlight the current/next session based on `new Date()` — compare `time` strings against current HST time.
- **Bookmark/star sessions**: Could add a ⭐ toggle per session stored in localStorage alongside notes.
- **Speaker photos**: Could add a `photo` field to SPEAKERS and render `<img>` in the avatar circle instead of initials.
- **Share notes**: Instead of clipboard export, could generate a mailto: link or use Web Share API (`navigator.share()`).
- **Offline support**: A service worker would make this work without internet at the venue — one script block, no dependencies needed.
- **Filter by type**: A row of badge-type filter pills above the schedule list (e.g., tap "Keynote" to show only keynotes).

## Source PDFs
Original conference data came from two PDFs placed in `~/Coding/HSG-Branding/` at build time. Schedule covers Thursday April 9 only — the group is not attending Wednesday April 8 (Summit at Koʻolau Ballrooms).

## Deploy
```bash
git add index.html
git commit -m "your message"
git push
# → live at https://lpcode808.github.io/EMW2026 within ~60 seconds
```
