# EMW 2026 — Student Conference Guide

**Live app → [https://lpcode808.github.io/EMW2026](https://lpcode808.github.io/EMW2026)**

**Code guide → [https://lpcode808.github.io/EMW2026/code-guide.html](https://lpcode808.github.io/EMW2026/code-guide.html)**

A mobile-first companion app for students attending **East Meets West 2026** (Thursday, April 9, Sheraton Waikiki, Honolulu). Scroll the schedule, tap sessions for details and student-friendly summaries, take notes, and export them at the end of the day.

---

## How This Was Built

This app was built in a single Claude Code session using a conversational prompting workflow. Here's how that conversation went — useful context if you're continuing development or using this as a template for future conference guides.

### 1. Initial Request

The prompt opened with a description of the use case:

> *"I have a local conference that we're attending. I have the information from the website to scrape and I want to build a mobile-first app that my students can access... It's only going to be like six hours for them. So if anything, it's prep. I want some sort of modality where it's mobile-first. So you scroll, scroll, scroll. You tap once to reveal an item. Maybe you tap another sub-area to reveal something else... I'll have a particular styling, which I'll include here or point you to. HSG-Branding dark mode pls."*

The key constraints from this first message:
- Mobile-first, scroll-based browsing
- Tap-to-reveal accordion interaction
- Dark mode using an existing brand system (`~/Coding/HSG-Branding/`)
- Student audience (not a general public app)

### 2. Exploration Phase (Plan Mode)

Claude entered plan mode and launched two parallel research agents:
- One to read and catalog the HSG-Branding design system (colors, typography, components)
- One to read the two PDF files the user had placed in the HSG-Branding folder, which contained the full East Meets West 2026 conference schedule and speaker roster

**The PDFs were the data source.** No web scraping was needed — the schedule and speakers were extracted directly from conference materials shared as PDFs.

### 3. Clarifying Questions

Before writing the plan, Claude asked three questions:

| Question | Answer |
|---|---|
| Do you have the conference data ready? | "I placed it in the HSG-Branding folder, two PDFs" |
| How should tap-to-reveal work? | Accordion list (tap row → expands inline) |
| Where will students access this? | GitHub Pages |

### 4. Plan Refinement

The initial plan was reviewed by the user, who added two important directions before implementation began:

> *"While we're at this initial phase, it would be good to experiment with some sort of note thing. I assume that the students would be doing this on their default browser, so I guess there's some sort of local storage thing, and then they can export at the very end."*

> *"We are not going on Wednesday, we're only going on Thursday."*

> *"Auto accept edits for this first one!"*

This refined the plan to:
- **Thursday April 9 only** (Wednesday Summit at Koʻolau Ballrooms removed)
- **Notes feature** with `localStorage` persistence and export
- Auto-approved edits (no confirmation prompts during build)

### 5. Build

Claude built the full `index.html` in one pass:
- Dark mode HSG-Branding design tokens
- 23 Thursday sessions with descriptions and student-friendly summaries
- Accordion interactions (session → student summary → note)
- Notes tab with localStorage, export modal, clipboard copy
- Single self-contained file, no build step

### 6. GitHub Deploy

User created the repo at `github.com/lpcode808/EMW2026`. Claude ran:
```bash
git init && git add . && git commit -m "Initial commit" && git remote add origin ... && git push -u origin main
```
GitHub Pages was already enabled on repo creation.

### 7. Speakers Tab (Follow-up)

After seeing the schedule, the user asked:

> *"How would a speakers list look since I think you have access to that data?"*

Claude added a third tab with:
- 28 Thursday-only speakers, alphabetical, with initials avatars
- Live search/filter by name, company, or role
- Tap to expand → company + session chips
- Session chips jump to the Schedule tab and open the relevant accordion

### 8. Documentation

User requested `CLAUDE.md` (for future AI agents) and this `README.md` (for humans):

> *"Lastly, update any docs in this new folder so future harnesses can improve, add, etc."*

> *"Might as well put a README that has an overview of how I prompted you here and answered questions... while you still have access to the very conversation."*

---

## App Features

| Feature | Details |
|---|---|
| **Schedule tab** | 23 sessions, tap-to-expand accordion rows |
| **Student Summaries** | AI-written plain-language descriptions per session, toggle inside expanded row |
| **Notes** | Session notes carry a real device-local timestamp, plus quick-note and speaker-profile note flows |
| **Speakers tab** | 28 Thursday presenters, searchable, with session jumps, person notes, and a `g.ai` research button per speaker |
| **My Notes tab** | Quick note composer, saved session/person notes, delete or jump back into context |
| **Export** | Plain-text formatted copy of all notes, clipboard button |
| **Code Guide** | Separate mobile-friendly HTML walkthrough that explains the real structure, styling, logic, and localStorage patterns behind the site |
| **Dark mode** | HSG-Branding color system (navy/teal/orange/lime) |
| **No install** | The attendee app still runs as a single HTML file in any mobile browser, with no app store or install required |

---

## Prompting Patterns That Worked Well

For anyone building something similar:

- **Point to existing assets early.** Saying "use HSG-Branding dark mode" with an actual folder gave Claude a real design system to work from instead of inventing one.
- **Share data as files, not text.** Dropping the conference PDFs in a folder and saying "I placed it there" was enough — Claude read and structured the data automatically.
- **Clarify scope before build.** "Thursday only, not Wednesday" saved a lot of cleanup. Scope questions answered upfront = cleaner first pass.
- **Name the interaction model.** "Scroll, scroll, scroll. Tap once to reveal. Tap sub-area for more." gave a precise mental model that translated directly into the accordion structure.
- **Add features as follow-ups.** Notes and speakers were added after the initial build in natural conversation, not as upfront requirements. The single-file architecture made this easy.

---

## Data Source

Conference schedule and speaker data sourced from official East Meets West 2026 materials (PDF documents). Original site: [emwhawaii.com/2026](https://emwhawaii.com/2026)

Presented by **Blue Startups** · Title sponsor: **Pegasus Tech Ventures**

---

## Development

See [`CLAUDE.md`](./CLAUDE.md) for architecture details, data schemas, JS function reference, and a list of suggested improvements for future development.

The live attendee app still lives in `index.html`. The repo now also includes `code-guide.html`, a companion page meant for conference learners and curious students who want to understand how the site works without digging through the entire file cold.

```bash
# Deploy after any edit:
git add .
git commit -m "describe your change"
git push
# Live at https://lpcode808.github.io/EMW2026 within ~60 seconds
```
