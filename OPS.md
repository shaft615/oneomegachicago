# OPS.md — Operator's reference for One Omega Chicago

Short orientation for any session working on the site. Read this first.
For the event-intake workflow specifically, also read the `add-event` skill at
[`.claude/skills/add-event/SKILL.md`](.claude/skills/add-event/SKILL.md).

## Project at a glance

- **Repo**: `shaft615/oneomegachicago` (private)
- **Stack**: Next.js 14 (App Router) · TypeScript · Tailwind · fully static prerender
- **Host**: Vercel (project `oneomegachicago`, team `karl-bryants-projects`)
- **Production domain**: https://oneomegachicago.org
- **Deploy**: every push to `main` auto-builds + deploys on Vercel (~60s)
- **Vercel preview URLs** (`*.vercel.app`) are throwaway per-branch — share the
  `oneomegachicago.org` domain, never the preview URL.

## Key file locations

| File | What |
|---|---|
| `src/data/events.ts` | Events array — source of truth for the calendar, Events page, homepage banner |
| `src/data/chapters.ts` | The 13-chapter directory (order = charter year) |
| `src/lib/conclave.ts` | Grand Conclave 2028 dates / constants |
| `src/lib/donate.ts` | Zeffy donation URL |
| `src/lib/nav.ts` | Top-nav links |
| `src/lib/forms.ts` | Shared Formspree endpoint + fallback email constants |
| `src/components/FeaturedEventCard.tsx` | Card used by featured slot, gallery, Looking Back |
| `src/components/calendar/EventCalendar.tsx` | Calendar grid + agenda view |
| `public/events/` | Event flyers (`EventName_Year.jpg`) |
| `public/chapters/` | Chapter logos |
| `.github/intake-ignore.json` | Submissions the auto-drafter should never flag (internal events) |
| `.claude/skills/add-event/SKILL.md` | Full event-intake workflow — read for any event-related task |

## Forms (Formspree)

All four forms POST JSON. Notification emails should route to **events@oneomegachicago.org**
(verify in each form's Formspree dashboard if a notification ever doesn't arrive).

| Form ID | Purpose | Used at |
|---|---|---|
| `xgorjngd` | Contact + Conclave 2028 sponsor + Que Year's Eve sponsor | `/contact`, `/conclave-2028`, `/que-years-eve` |
| `xjglvlan` | Brother Registration | `/events` (Father's Day) |
| `mnjwnozy` | Chapter Event Submissions | `/events/submit` |
| `mwvyyvkb` | Father of the Year Nominations | `/events/nominate-father-of-the-year` |

The chapter-event form (`mnjwnozy`) supports **file uploads** (Formspree Professional plan).
Uploaded flyers appear in the API response as `flyer: ["https://user-file-uploads.formspree.io/.../file.png"]`.

## Secrets

| Where | What | Used by |
|---|---|---|
| GitHub repo secret `FORMSPREE_API_KEY` | Read-only Formspree key | Auto-draft workflow pre-check |
| GitHub repo secret `ANTHROPIC_API_KEY` | Anthropic API key | `claude-code-action` in CI |
| Local `.env.local` (gitignored) | `FORMSPREE_API_KEY` only | `scripts/fetch-event-submissions.mjs` (manual local pulls) |
| `.vercel/project.json` (gitignored) | Vercel `projectId` + `orgId` | Vercel MCP / `vercel` CLI |

⚠️ **Never put `ANTHROPIC_API_KEY` in `.env.local`** — only CI uses it, and saving
the file can surface secrets in agent transcripts. Put the Anthropic key
directly in the GitHub secret via the web UI.

## Automation: event intake

Daily workflow at [`.github/workflows/event-auto-draft.yml`](.github/workflows/event-auto-draft.yml)
(cron `30 13 * * *` ≈ 8:30 AM Central; also `workflow_dispatch`):

1. **Pre-check** — `scripts/intake-check.mjs` (Node built-ins only, no `npm ci`)
   fetches submissions from form `mnjwnozy`, diffs against `events.ts` titles +
   `intake-ignore.json`, writes `new-submissions.json` (gitignored), sets
   `has_new` output. Free runs cost ~zero on quiet days.
2. **If `has_new`** → `npm ci` → `claude-code-action@v1` reads the `add-event`
   skill, drafts entries (downloading flyers from the Formspree URLs),
   `npm run build` to verify, creates branch `intake/auto-draft-YYYYMMDD`,
   commits, runs `gh pr create --reviewer shaft615` → opens PR. **Does not merge.**
3. PR notifies @shaft615 by email (reviewer request + body @mention).
4. Human reviews + merges → Vercel deploys.

CI uses `--dangerously-skip-permissions` (safe: ephemeral runner, PR review gate).
Repo setting **"Allow GitHub Actions to create and approve pull requests" must
be ON** (Settings → Actions → General). If it gets disabled, PR creation will fail.

### Manual workflow trigger

```bash
gh workflow run event-auto-draft.yml --repo shaft615/oneomegachicago
```

### Check the latest auto-draft run

```bash
gh run list --workflow=event-auto-draft.yml --repo shaft615/oneomegachicago --limit 3
```

## Common operator tasks

### Add an event by hand
1. Read `add-event` skill — it codifies schema, Central Time offsets,
   flyer handling, curation rules.
2. Add entry to `src/data/events.ts`, drop flyer in `public/events/`, build,
   commit, push.

### Move an event to "Looking Back" (past)
- **Automatic**: `isEventPast(event)` (in `events.ts`) returns true once
  `end` (or `start + 24h`) is in the past. The site **automatically** files
  past-with-flyer events into Looking Back **at the next build**.
- **Manual curation (with thank-you)**: set `status: "past"` + add a `callout`
  line ("🎉 Thank you to everyone who came out…"). This is still the curated
  move — it adds the thank-you message and drops any live ticket link.
- ✅ The `/events` page uses **ISR** (`export const revalidate = 3600`), so the
  date logic re-runs ~hourly on its own — a finished event rolls into Looking
  Back without anyone pushing. Manual curation just makes it look nicer (thank
  -you callout). Note: the **homepage** featured banner is still static and
  uses `status`, not dates — see Known limitations.

### Pull latest submissions locally (no AI, no PR)
```bash
node scripts/fetch-event-submissions.mjs --limit 10
```
Requires `FORMSPREE_API_KEY` in `.env.local` (read-only key works).

### Rotate the Anthropic API key
1. console.anthropic.com → API Keys → delete old, create new.
2. GitHub repo → Settings → Secrets and variables → Actions →
   update `ANTHROPIC_API_KEY` value directly. **Do not** route through
   `.env.local` — that's what kept re-exposing the key.

### Update / replace a flyer
- Drop the new file in `public/events/` under the same filename → push a
  commit (any) to trigger rebuild → **hard-refresh** (Ctrl+Shift+R) to bust
  CDN + browser cache. Vercel images are aggressively cached at the same URL.

### Build before committing
Always:
```bash
rm -rf .next && npm run build
```
The `rm -rf .next` matters because the OneDrive working directory occasionally
leaves stale Next.js artifacts that produce `EINVAL readlink` errors mid-build.

## Live-site contacts

- **events@oneomegachicago.org** — canonical inbox for all form notifications
  and intake fallback email shown in form error banners.
- **Tristan Elmore** — Sponsorship Coordinator (`(708) 582-9520`)
  is the named contact on the Que Year's Eve sponsorship page.

## Known limitations / next-step ideas

- **Static rebuild gap** (mostly resolved): the `/events` page now uses ISR
  (`revalidate = 3600`) so its past/upcoming split self-heals hourly without a
  push. Still open: the **homepage featured banner** (`getFeaturedEvent()`
  filters on `status === "upcoming"`, not dates, and the homepage is fully
  static), so once the featured event passes it lingers until someone flips its
  `status` (or removes `featured`) and a rebuild happens. To fully automate that,
  add `!isEventPast(e)` to `getFeaturedEvent()` **and** `export const revalidate`
  to the homepage — or wire a daily Vercel **Deploy Hook** for a nightly rebuild.
- **Tribute video for Jesse Jackson memorial**: hosted on YouTube
  ([youtu.be/GFLXafU1VqU](https://youtu.be/GFLXafU1VqU)). Large videos like
  this *cannot* go in the repo — always YouTube/Vimeo + link.
- **The Formspree key in `.env.local`** may drift from the value in the
  GitHub secret if either is regenerated. If a local fetch 401s, the GitHub
  secret may still be valid (CI works) and vice versa — they're separate keys.
