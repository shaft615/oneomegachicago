---
name: add-event
description: >-
  Add a One Omega Foundation chapter event to the oneomegachicago.org website
  end-to-end: place the flyer, map the submission to the Event schema in
  src/data/events.ts, insert it, build, commit, and push. Use this whenever
  someone hands over a Formspree event-submission email, a chapter event flyer
  image, or raw event details (title, date, time, location, host chapter,
  ticketing link) and wants it on the Events page / calendar. Trigger on
  "add this event", "new event submission", "a chapter sent in an event",
  "put this on the calendar", "update the events", or when given a flyer plus
  details for the One Omega / Chicago Conclave site — even if they don't say
  the word "skill". Also use to move a finished event to the past ("Looking
  Back") section or refresh an event's flyer/link.
---

# Add a One Omega event

This skill captures the repeatable intake workflow for the One Omega Foundation
website (repo: `shaft615/oneomegachicago`, deployed on Vercel). Chapters submit
events; the Foundation curates them into a static data file that drives the
Events page, the homepage featured banner, and the calendar. There is no
database — everything is a typed entry in `src/data/events.ts` plus a flyer
image in `public/events/`, committed to git. A push triggers a Vercel deploy.

Your job: turn a submission into a correct, committed, deployed event with no
broken images, wrong dates, or fabricated facts.

## Step 0 — Read the ground truth first

Before writing anything, **read these two files** so you match the current shape
exactly (the schema and conventions evolve — don't trust this doc over the code):

- `src/data/events.ts` — the `Event` interface, all existing entries (copy their
  style), and the helper functions (`sortByStart`, `groupByDay`, `isoDateKey`,
  `isEventPast`).
- `src/components/FeaturedEventCard.tsx` — how each field renders, so you know
  which fields produce which buttons/badges.

## Step 1 — Gather the inputs

A submission gives you some or all of: submitter name/email, event title, host
chapter, category, date, start/end time, location, description, registration
link, recurrence, notes, and possibly a **flyer** (an attached image from the
Formspree Professional inbox, a pasted image, or a file already dropped in
`public/events/`).

If anything required is missing or ambiguous (no time, bare venue name with no
city, unclear host), **ask rather than guess**. Never fabricate dates,
addresses, or facts about real chapters or people.

## Step 2 — Place the flyer (if there is one)

Flyers live in `public/events/`. Confirm the file is on disk with `ls`. Use a
clear, URL-safe name following the existing pattern, e.g. `LakeJam_2026.jpeg`,
`Coleman-Love_2026.jpg`. The `flyer` field path must match the filename on disk
**exactly**, including extension and case — production (Vercel/Linux) is
case-sensitive even though local Windows is not.

If the submitter provided the flyer as a link or attachment you can't save
directly, ask the user to drop it in `public/events/` and tell you the filename.

## Step 3 — Map to the Event schema

Build the entry. Key conventions (verify against `src/data/events.ts`):

- **id**: unique slug, usually `event-name-year` (e.g. `lake-jam-2026`).
- **hostChapter**: the chapter's **designation only** (the Greek/abbreviation
  badge, e.g. `ΧΛΛ`, `ΣΩ`, `ΜΞ`, `ΝΠ`, `ΡΓΓ`, `AKK`). Leave undefined for
  Foundation-wide events. **host**: the full descriptive string
  (e.g. `"Mu Xi Chapter (ΜΞ), Omega Psi Phi Fraternity, Inc."`). The 13 chapter
  designations live in `src/data/chapters.ts` — read it if unsure.
- **start / end**: ISO 8601 **with Central Time offset**. This is the #1 source
  of bugs — get the offset right:
  - **CDT = `-05:00`** roughly mid-March through early November (daylight time)
  - **CST = `-06:00`** roughly early November through mid-March (standard time)
  - June event → `-05:00`. December event → `-06:00`.
  - Events crossing midnight (e.g. an NYE party ending 2 AM) set `end` to the
    next calendar day; ISO handles it.
- **dateLabel / timeLabel**: human-readable strings shown on cards
  (e.g. `"Saturday, June 13, 2026"`, `"6:00 PM – Midnight"`). The calendar
  positions by `start`; humans read these.
- **category**: pick from the set used in existing entries / the submission form
  (Community, Wellness, Scholarship, Brotherhood, Foundation, Conclave 2028,
  Service, Social, Other).
- **description**: array of paragraphs. Each element renders as its own `<p>`.
- **status**: `"upcoming"` for future events. (`isEventPast()` auto-moves events
  to the past section once their end time passes, so you don't have to flip this
  for every old event — but see Step 6.)

Optional CTA / display fields (only set what applies):

- **link** — primary external URL (ticketing/RSVP). Renders "Tickets & Details →".
- **secondaryLink** / **secondaryLinkLabel** — second outline button (e.g. an
  event website alongside a ticketing link).
- **registerHref** — in-page anchor (e.g. `"#register"`) for a registration form
  on the same page; renders a gold "Register below ↓" CTA (full variant only).
- **nominationHref** / **nominationLabel** — nomination/application form button.
  Internal route (`/events/...`) → client-side `Link`; external → new tab.
- **additionalCalendarDates** — `["YYYY-MM-DD", ...]` extra calendar cells for a
  multi-day drive so one entry shows on every relevant day without fragmenting
  into multiple entries.
- **callout** — single emphasized gold banner line (great for "Arrive early…"
  or a post-event "🎉 Thank you to everyone who came out!").
- **recurrence** — free-form label ("Annual", "Quarterly"); shows a "↻" badge.
- **featured** — at most ONE upcoming event. Don't add a second featured event
  without confirming which should hold the slot.

## Step 4 — Insert into events.ts

Add the object to the `events` array. Order doesn't affect correctness (the
calendar and galleries sort by `start` at runtime), but insert near its
chronological neighbors to keep the file readable. Keep the featured event near
the top by convention.

## Step 5 — Verify before building

- **Day-of-week check**: confirm the weekday in `dateLabel` actually matches the
  date. A flyer that says "Saturday, June 13" should compute to a Saturday — if
  your `start` date lands on a different weekday, something's off. Flag it.
- **Flyer path** matches a real file in `public/events/` (exact name + case).
- No fabricated detail slipped in.

## Step 6 — Moving an event to the past ("Looking Back")

When an event has happened, the curated move is: set `status: "past"` and add a
`callout` with a thank-you message (e.g.
`"🎉 Thank you to everyone who came out!"`). The `PastEventHighlights` section
shows past events that have a flyer; `FlyerEventGallery` shows upcoming ones.
The `isEventPast()` helper already hides finished events from the upcoming
gallery automatically based on end time, but the explicit flip + thank-you
callout is what makes it appear nicely in Looking Back.

## Step 7 — Build, commit, push

Run from the repo root. **Always build before committing** — it catches type
errors and bad imports, and the OneDrive location needs the `.next` cleanup:

```bash
rm -rf .next && npm run build
```

The build is clean when you see `✓ Compiled successfully` and the static route
list with `○ (Static)` — `/events` should be in it.

Then commit and push. **Fetch first** — the Foundation sometimes commits
directly via the GitHub web editor, so the local branch may be behind; rebase to
avoid a rejected push:

```bash
git fetch origin
# if behind, rebase local work on top:
git rev-list --count HEAD..origin/main   # >0 means behind
git rebase origin/main                   # only if behind and you have local commits
git add public/events/<flyer> src/data/events.ts
git commit -m "Add <Event> (<Chapter>)"
git push
```

Use a HEREDOC for multi-line commit messages. Stage specific files (the flyer +
events.ts), not `git add -A`. Co-author the commit per repo convention:
`Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.

## Step 8 — Report back

Tell the user concisely: what landed, where it surfaces (which gallery / which
calendar day), the commit hash, and that Vercel deploys in ~60s. Remind them to
hard-refresh (Ctrl+Shift+R) since flyers are CDN-cached, especially if a flyer
was replaced under an unchanged filename.

## Common pitfalls (learned the hard way)

- **Wrong TZ offset** puts the event on the wrong calendar day. June = `-05:00`.
- **Filename case/extension mismatch** → broken image in production only.
- **`.next` not cleaned** on OneDrive → `EINVAL readlink` build error; `rm -rf .next` first.
- **Push rejected** → someone committed to `origin/main`; fetch + rebase, don't force.
- **Two featured events** → only one may be `featured: true`.
- **Replacing a flyer under the same filename** → looks unchanged until a hard
  refresh because the URL didn't change; mention this to the user.
