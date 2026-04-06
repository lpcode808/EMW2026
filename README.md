# EMW 2026 — Student Conference Guide

**Live app → [https://lpcode808.github.io/EMW2026](https://lpcode808.github.io/EMW2026)**

**Code guide → [https://lpcode808.github.io/EMW2026/code-guide.html](https://lpcode808.github.io/EMW2026/code-guide.html)**

A mobile-first companion app for students attending **East Meets West 2026** (Thursday, April 9, Sheraton Waikiki, Honolulu). Scroll the schedule, tap sessions for details and student-friendly summaries, take notes, and export them at the end of the day.

---

## How This Was Built

This app was built in an initial Claude Code session and then refined through follow-up conversation. Here's how that process went — useful context if you're continuing development or using this as a template for future conference guides.

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

### 9. Post-Launch Iteration

After the first release, the app kept improving through a series of small, very targeted requests instead of one giant redesign.

The user first pushed the notes model further:

> *"Whenever someone makes a note during a session, make sure to have a real timestamp to that session of the local device time. then, in notes section, allow there to be an option to make a note without being stuck to somewhere. lastly, include a note in case someone meet someone and they click the person's profile, and then can make a note"*

That led to:
- Device-local timestamps on saved notes
- A freeform **Quick Note** in the Notes tab
- **Person notes** directly from expanded speaker cards
- Typed notes in the Notes tab instead of one undifferentiated list

Then the user added a research workflow to speaker profiles:

> *"for the speakers list, add a thoughtful button that links out to g.ai search parm using the speaker's name and job title / company"*

That became a speaker-specific **Google AI mode** link on each expanded speaker card.

From there, interaction polish stayed intentionally narrow:

> *"for main schedule, when you open up the event and it expands, that clicking the person's name would jump you to the expanded list in the speakers section? think carefully before overcomplicating things."*

So instead of turning every speaker mention into a link, only the speaker names in the expanded schedule meta row became tappable, and only when they map cleanly to an actual speaker profile.

Finally, the visual system was refined to make state and context easier to read:
- Expanded schedule and speaker details now sit on a slightly different dark sub-surface from their tap rows
- The Notes tab now differentiates **Quick Notes**, **Session Notes**, and **Person Notes** with subtle accent colors rather than one shared teal style
- Small styling adjustments were made in place, preserving the original dark-mode direction instead of switching visual themes midstream

### 10. Conference Learner Guide

Once the attendee app was working, the focus expanded from "students using the site" to "students learning from the site."

The user asked for a linked HTML page explaining how the website works for conference attendees and learners who might poke around the repo:

> *"run through the repo and make it so that there is a linked HTML page that explains the code of the website (mobile optimzied) so that students and learners who poke around can undrestand whats going on. use this attachemnt as a starting point but not the be all and end all. this will be viewed at a conference"*

That led to a new companion page, [`code-guide.html`](./code-guide.html), linked directly from the live app. It teaches from the real project rather than a fake demo, covering:
- How the page structure, styling, interactions, and notes flow work
- Why the project was kept simple and single-file for the attendee-facing app
- Safe "change one thing and refresh" experiments for curious learners
- A mobile-friendly reading experience in the same visual language as the app

Then the guide itself was refined for a truer beginner audience:

> *"overall good, but start off at the top of the explainer page with making parallels to scrolling a common website for teens. say instagram or youtube. then also do another pass to make the langauage eaccessible to a beginnier... we could have a submode for high schoolers who have done basic programming"*

That second pass changed the guide in a few important ways:
- It now opens with familiar comparisons to scrolling Instagram, YouTube, or TikTok
- The default tone assumes the reader uses websites often but may never have coded before
- A small audience toggle switches between **New to coding** and **Done a little coding**
- More technical notes are hidden by default and only revealed in the higher-context mode

That refinement mattered because the explainer was no longer just repo documentation — it became part of the conference experience itself.

### 11. Manual Polish Pass (User-Driven)

With the core app complete, the teacher made a few direct edits without Claude — working in the repo like any other developer would after an AI-assisted build.

A conference-inspired **favicon** was added: a minimal SVG using the app's teal and orange to make the browser tab and home screen shortcut feel intentional. Both `index.html` and `code-guide.html` got the `<link rel="icon">` reference.

The code guide got a second intent toggle alongside the audience mode. The first toggle already let readers switch between "New to coding" and "Done a little coding." The new one asks **why** you're reading: just browsing the site's structure, or actually trying to tinker with the code. This separated the reading experience from the hands-on experiments, so curious students who don't want to touch anything can skim without the tinkering prompts cluttering their view.

Then all 23 student summaries were reviewed on a real phone, with weaker ones rewritten by hand and some sessions getting light **context links** — external resources relevant to what the speaker would be discussing. This was judgment work that needed a teacher's eye rather than a prompt.

A Chrome DevTools Protocol smoke test script (`scripts/chrome-mobile-smoke.mjs`) was also written to verify the app behaves correctly in a mobile viewport — checking that tabs switch, sessions expand, the search input works, and no console errors fire. This gave a repeatable sanity check before sharing the link with students.

### 12. Pre-Launch Claude Session

A dedicated pre-launch session with Claude addressed the last few things that were still missing a few days before the conference.

The most visible was a **live session indicator**. The app had no sense of time — it just listed all 23 sessions equally. Now the currently-running session gets a pulsing **NOW** badge in teal, and the next upcoming one gets an **Up Next** badge in lime. The indicator updates every minute via `setInterval`, comparing session times against the device clock in HST.

There was also a data bug: session `thu-14` had its speaker field set to `"Bill Bryant + more"`, which meant the app couldn't match "Bill Bryant" to his actual speaker profile and render his name as a tappable link. The fix replaced that with the proper `·`-separated format including Rayfe Gaspar-Asaoka, who was already in the speakers list for that session.

Two small but meaningful UI details rounded out the session:
- A `<meta name="theme-color">` tag was added so the mobile browser chrome (the address bar and status bar area) matches the app's navy background instead of staying white
- The header's external conference link was relabeled from a bare `↗` arrow to **EMW ↗**, giving students a recognizable destination cue before they tap

### 13. Multi-Sticky Quick Notes

The original Quick Note in the Notes tab was a single persistent textarea. If a student typed something, then came back later to add a new thought, they'd overwrite what they already wrote. That's the wrong behavior for a day of back-to-back sessions.

The replacement: each tap of **Add Note** creates a new sticky with its own timestamp and its own edit/delete controls. The composer resets to blank after saving, ready for the next thought. Existing stickies stack below and remain editable in place. Legacy `general:quick-note` entries from the old model migrate automatically via the existing note normalization on load.

The underlying data model didn't need to change — notes were already stored as independent objects keyed by type and entity ID. What changed was the UI: instead of loading the one `general:quick-note` value back into the textarea, the composer now only writes forward, and the accumulated stickies are rendered as a separate list.

### 14. Content Review Pass + Speaker Bio Planning

As the conference date approached, a session focused entirely on content quality rather than new features.

Claude reviewed all 23 sessions and flagged summaries with problems:
- `thu-02` (Women's Breakfast): the summary implied the session was optional or low-value — rewritten to explain why dedicated networking spaces matter in a historically male-dominated field
- `thu-14` (VC 1-on-1 Meetings): the word "watch" implied students would observe meetings — rewritten to clarify these are private sessions between founders and investors, not an open panel

A handful of sessions also got `SESSION_RESEARCH` annotations with learn-more links — context for teachers preparing students on what `thu-04`, `thu-05`, and `thu-06` are actually about before they walk in the door.

The larger output of that session was [`SPEAKER_BIOS_PLAN.md`](./SPEAKER_BIOS_PLAN.md): a full implementation proposal for adding short bios and 2–3 curated links to every speaker card. The file includes:
- The data structure change needed in `SPEAKERS` (two new fields: `bio` and `links`)
- The CSS class and render logic change needed in `renderSpeakers()`
- AI-drafted bio paragraphs for all 27 Thursday speakers — written as starting points, explicitly flagged for teacher review before they go live

The bios themselves weren't merged into `index.html` yet. That was a deliberate call: AI-drafted speaker bios benefit from a human review pass before students read them at a real conference. The plan document is the handoff artifact — the teacher can review, edit, and then implement when ready.

### 15. Last-Minute Readability + Notes Search Pass

One final polish session focused on the parts students would feel most directly while using the app during the event itself.

The first target was the **Code Guide** promo at the top of the Schedule tab. On first load, it was visually useful but a little too tall relative to the actual conference content. The solution kept the teaching value without letting it dominate the page:
- The Schedule tab code-guide panel now auto-collapses after about 10 seconds into a one-line reminder
- Students can still reopen it at any time with a small toggle
- The secondary action now points to the repo's **README.md** on GitHub instead of "Try safe experiments," which better matches the likely conference use case

That same thinking carried into readability inside the schedule cards. Some non-core schedule items (like meals, breaks, and background events) were intentionally lighter-weight visually, but dimming the whole card made the description text harder to read than intended. The styling was rebalanced so those entries still feel secondary while keeping the actual body copy bright enough to read comfortably on a phone.

The other addition was to the **My Notes** tab. By this point, notes had grown into three kinds of saved content: quick notes, session notes, and person notes. That made retrieval matter more than it did in the earliest versions, so the Notes tab gained a lightweight search input that filters saved notes client-side by:
- Note text
- Session title
- Speaker name
- Context text already shown in the note cards

Importantly, the search feature did **not** add any new storage model or backend. It just filters the already-loaded `localStorage` note records in memory, which kept the implementation small and low-risk a few days before the conference.

### 16. Speaker Stars + Swipe Follow-Through

The next iteration came from a very conference-specific question: how do students quickly keep track of speakers they want to remember without opening every card and losing their place in the list?

The first answer was a lightweight starring system in the **Speakers** tab:
- Speaker rows can now be starred and unstarred, with the state saved in `localStorage`
- On phones, a quick **swipe left** on a speaker row toggles the star without needing to open the card first
- Expanded speaker cards still include a clear tap fallback button for desktop use or for anyone who prefers not to use gestures
- New toolbar controls can pull starred speakers to the top of the list or clear them with an explicit confirmation step

That first pass solved the feature need, but real interaction testing surfaced a subtle UX problem right away: after a successful swipe, the row could still register the follow-up tap/click and accidentally open or close the accordion. In other words, the gesture worked, but it didn't feel isolated from the existing tap behavior.

So the follow-up fix was not a redesign. It was a cleanup pass based on how the feature actually felt in-hand:
- Gesture detection moved to `touchend` instead of `touchmove`
- A swipe only counts when it is fast enough, horizontal enough, and long enough to look intentional rather than like normal scrolling
- The next click is ignored immediately after a successful swipe so starring a speaker does not also toggle that speaker card open or closed
- The mobile smoke test was expanded to cover the starred-speaker controls so the quick-save flow keeps getting checked

This is a good example of how later-stage UI work often happens in this repo: ship the smallest useful version, try it in the real interaction context, then tighten the behavior without overcomplicating the structure.

---

## App Features

| Feature | Details |
|---|---|
| **Schedule tab** | 23 sessions, tap-to-expand accordion rows, with speaker-name jumps from expanded session details into the Speakers tab |
| **NOW / Up Next** | Live session indicator: pulsing teal NOW badge on the currently-running session, lime Up Next badge on the next one — updates every minute |
| **Student Summaries** | Reviewed and rewritten plain-language descriptions per session, toggle inside expanded row |
| **Notes** | Session notes carry a real device-local timestamp, plus multi-sticky quick notes and per-speaker person notes |
| **Speakers tab** | 28 Thursday presenters, searchable, with session jumps, person notes, a `g.ai` research button per speaker, and saved speaker stars with swipe-to-star on mobile plus starred-up-top controls |
| **My Notes tab** | Quick note composer (each save creates a new sticky), saved session/person notes, delete or jump back into context, distinct visual treatment per note type, and search across saved notes |
| **Export** | Plain-text formatted copy of all notes, clipboard button |
| **Code Guide** | Separate mobile-friendly HTML walkthrough that explains the real structure, styling, logic, and note-saving patterns, with a beginner-first mode, an optional "done a little coding" mode, a viewing/tinkering intent toggle, and a Schedule-tab promo that now collapses down after first load |
| **Favicon** | Conference-inspired SVG favicon using the app's teal/orange palette |
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
- **Keep later refinements narrow.** Requests like "just the highlighted speaker line should jump to profiles" led to cleaner UX than trying to make every related text element interactive.
- **State the audience as specifically as the feature.** "Assume they use websites but may never have coded before" was more useful than simply saying "make it educational."
- **Use familiar product metaphors.** Referencing Instagram and YouTube scrolling behavior immediately grounded the explainer page in something students already understand.
- **Separate the draft from the merge.** For content that needs human review before students read it (speaker bios, session summaries), ask Claude to produce a plan document first rather than writing directly into the live file. The plan becomes the review artifact.
- **Direct edits and AI sessions can coexist.** After the initial build, the teacher made several commits directly — favicon, summary rewrites, tinkering mode on the guide. The AI sessions and manual edits interleaved naturally. The repo doesn't care who authored what.
- **Ask for the live-clock feature once the data is stable.** The NOW indicator only made sense after the session times were confirmed correct. Timing-dependent features are safer to add late.

---

## Data Source

Conference schedule and speaker data sourced from official East Meets West 2026 materials (PDF documents). Original site: [emwhawaii.com/2026](https://emwhawaii.com/2026)

Presented by **Blue Startups** · Title sponsor: **Pegasus Tech Ventures**

---

## Development

See [`CLAUDE.md`](./CLAUDE.md) for architecture details, data schemas, JS function reference, and a list of suggested improvements for future development.

The live attendee app still lives in `index.html`. The repo now also includes `code-guide.html`, a companion page meant for conference learners and curious students who want to understand how the site works without digging through the entire file cold.

### Mobile Smoke Test

A lightweight browser-level smoke test now lives at [`scripts/chrome-mobile-smoke.mjs`](./scripts/chrome-mobile-smoke.mjs). It checks the most important student flows in a phone-sized viewport:

- Schedule accordion opens
- Student summary expands
- Session notes save to `localStorage`
- Speaker search, starring, and starred-speaker controls work
- Quick note + export modal work
- Key mobile tap targets stay at or above 44px

Run it against a local server plus headless Chrome remote debugging:

```bash
python3 -m http.server 8765
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless \
  --disable-gpu \
  --no-first-run \
  --no-default-browser-check \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/emw-chrome-profile \
  http://127.0.0.1:8765/index.html
node scripts/chrome-mobile-smoke.mjs
```

```bash
# Deploy after any edit:
git add .
git commit -m "describe your change"
git push
# Live at https://lpcode808.github.io/EMW2026 within ~60 seconds
```
