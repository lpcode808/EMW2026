# Conference-Day Sweep

Sweep run on Wednesday, April 8, 2026 (Pacific/Honolulu) for Thursday, April 9, 2026 conference use.

## Scope

- Fact-check the local student guide against currently public EMW 2026 sources.
- Check day-of usability for the core student flows.
- Record what was fixed immediately versus what still needs a human spot-check.

## Official-source notes

- Verified from `https://emwhawaii.com/2026` on April 8, 2026:
  - East Meets West 2026 is scheduled for April 8-9, 2026.
  - Blue Startups is the organizer.
  - The public site describes the event broadly as taking place on Oahu / Honolulu, not only at one venue.
- Verified from `https://emwhawaii.com/sitemap.xml` on April 8, 2026:
  - The public site has separate 2026 routes for `conference`, `summit`, and `reception`.
  - The public site exposes speaker pages for many names used in the student guide, including Tim Draper, Chenoa Farnsworth, Maya Rogers, Liya Safina, James Tokioka, John Lim, Bill Reichert, Chris Yeh, Miki Hardisty, Rayfe Gaspar-Asaoka, and Paʻa Sibbett.

## Fixed In This Pass

- Synced the app metadata and internal docs to the current fact-checked Thursday roster:
  - `index.html` social/meta copy now describes the full Thursday speaker roster without a stale hard-coded count.
  - `README.md` and `CLAUDE.md` now describe the current Thursday schedule and speaker counts more clearly.
- Removed stale day-of phrasing from the podcast surfaces:
  - The main app banner no longer says `Pre-Conference Episode — Tune In Before April 9`.
  - `podcast.html` now uses absolute dates and the confirmed Sheraton Waikiki venue reference instead of relative wording like `this Thursday` and the uncertain `Koula ballrooms`.
- Corrected official Thursday schedule details from the public EMW 2026 pages:
  - The two mindfulness session titles now match the official conference schedule (`Mindfulness Intro and Interlude` / `Mindfulness Interlude`).
  - The closing `Pacific Bridge` panel now uses the official Thursday speaker pairing: `Miki Hardisty · Bill Reichert`.
  - The Thursday speaker roster dropped three event-wide names that no longer belong on the Thursday-only guide: `Rich Robinson`, `Suzanne Basalla`, and `Guy Kawasaki`.
  - The podcast transcript now reflects that `Meet the Drapers: Hawaii` belongs to Wednesday, April 8, while the Thursday program hosts the `Startup World Cup` regional.
- Normalized one remaining naming mismatch to match both the public EMW site and the source packet:
  - `Brent J. Freeman` is now `Brent Freeman`.
- Cleaned up the last remaining Thursday-day drift in speaker bios:
  - `James Tokioka` now uses the official `DBEDT` company label.
  - `Keyvan Peymani` now uses his public EMW speaker-page role/company (`Executive Chairman` / `Versus Systems`) instead of placeholder VC-session fields.
  - `Paʻa Sibbett` now uses the sourced `Chief of War` company label without the added platform suffix.
- Fixed one conference-day timing bug:
  - `NOW` / `Up Next` badges now stay hidden outside Thursday, April 9, 2026 in the Hawaiʻi time zone, so Wednesday no longer shows a misleading `Up Next` state.
- Tightened the transcript and offline behavior:
  - `podcast.html` no longer name-drops `Guy Kawasaki` in the Thursday floor scene-setting copy.
  - The service worker now pre-caches `podcast.html`, and the cache version is bumped to `emw2026-v11`.
- Expanded the VC 1-on-1 block to the full published live roster:
  - `thu-14` now lists all 15 names from the live EMW `one_on_ones` roster instead of `+9 more`.
  - `Who's In The Room` now shows the published table assignments with each participant's current company.
  - The Speakers tab now includes the added VC participants so the schedule roster stays searchable and tappable.
- Repaired the mobile smoke test:
  - `scripts/chrome-mobile-smoke.mjs` now checks that the rendered schedule count matches `SCHEDULE.length` instead of a stale hard-coded number.
  - The smoke path now also checks the deterministic `NOW` / `Up Next` day guard, verifies that `sw.js` still pre-caches `podcast.html`, and loads `podcast.html` directly.
  - It now also fails if the VC roster regresses back to a truncated `+ N more` preview or drops the published table list.
- Updated the learner/maintainer docs to match the current note model:
  - Quick notes are described as multiple saved notes keyed like `general:quick-note-<timestamp>`, not a single `general:quick-note`.

## Source-Packet Notes

- The original source PDFs in `HSG-Branding` support several Thursday names that do not currently have public 2026 speaker pages in the EMW sitemap:
  - Abigail Wen
  - Dan Dan Li
  - Helena Janulis
  - Jeannie Yang
  - Keyvan Peymani
  - Summer Kim
- The source packet also includes `Rich Robinson` on the Thursday closing panel, but the current public conference page did not. For conference-day use, the local guide now follows the current public EMW schedule instead of the older PDF snapshot.

## Verification Notes

- The local headless Chrome smoke path was exercised after bringing up a local HTTP preview.
- Before the smoke patch, the run failed immediately because the script still expected `23` schedule items while the current app renders `24`.
- After the patch, `node scripts/chrome-mobile-smoke.mjs` completed successfully against the local preview. The only remaining browser output was the benign Spotify iframe `allowfullscreen` warning.

## Next Turn

- Keep `node scripts/chrome-mobile-smoke.mjs` as the pre-deploy regression check if any schedule or copy changes land.
