# CLAUDE.md — EMW2026 Student Conference Guide

Single-file mobile-first web app for students attending **East Meets West 2026** (Thursday, April 9, Sheraton Waikiki), now paired with a learner-friendly explainer page. Deployed to GitHub Pages.

## Live URL
`https://lpcode808.github.io/EMW2026`

## Code Guide URL
`https://lpcode808.github.io/EMW2026/code-guide.html`

## Architecture
**Primary attendee app: `index.html`** — all CSS, JS, and data are embedded. No build step, no dependencies, no backend.

**Companion explainer: `code-guide.html`** — a mobile-friendly teaching page that links from the live app and explains the real code structure for students and conference learners.

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
1. **Schedule** — 23 sessions, accordion rows. Each expands to: meta (speaker/location/time), description, Student Summary sub-toggle, session note inline, external link.
2. **Speakers** — 28 Thursday presenters, alphabetical, searchable. Tap → shows company + session chips + a person-note field. Tapping a session chip jumps to Schedule tab and opens that accordion.
3. **Notes** — quick-note composer for unlinked notes, saved session/person notes, export modal, clipboard button.

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
| `toggleNotePanel(btn)` | Opens/closes a session or person note textarea |
| `saveNote(type, id, text)` | Persists typed notes, preserving original creation timestamp |
| `buildExportText()` | Formats all notes as plain text for clipboard export |
| `openSessionContext(id, opts)` | Switches to Schedule and optionally opens the note editor |
| `openSpeakerContext(id, opts)` | Switches to Speakers and optionally opens the person note editor |
| `showToast(msg)` | Shows 2-second bottom toast notification |

## Notes Model

Notes are stored as typed objects keyed by context:

- `session:<sessionId>` for inline session notes
- `speaker:<speakerId>` for notes attached to a speaker profile
- `general:quick-note` for the unlinked quick note in the Notes tab

Each note stores:

```js
{
  key: "session:thu-04",
  type: "session" | "speaker" | "general",
  entityId: "thu-04",
  text: "...",
  createdAt: 1775020500000,
  updatedAt: 1775020500000
}
```

`createdAt` is the real device-local capture time source for the note UI/export (formatted on the client with `Intl.DateTimeFormat`). Existing legacy session notes are migrated automatically on load.

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
