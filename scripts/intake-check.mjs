#!/usr/bin/env node
/**
 * Pre-check for the auto-draft workflow (Phase 2, Step 2).
 *
 * Uses only Node built-ins (no npm install needed) so it can run as a cheap
 * gate BEFORE the expensive Claude step. Fetches submissions, filters to
 * genuinely-new public ones (diffed against src/data/events.ts and the ignore
 * list), writes them to new-submissions.json (gitignored), and sets the
 * `has_new` / `count` GitHub Action outputs. The Claude drafting step only runs
 * when has_new == 'true', so days with nothing new cost no API tokens.
 *
 * DEDUP — how a submission is matched to an already-curated event:
 *   Curators routinely rewrite a submitted title when adding it (insert
 *   honorifics, append ", Sr.", expand a name, tack on a subtitle). A plain
 *   case-insensitive substring match then misses, so the submission is
 *   re-flagged as "new" on every run and has to be hand-suppressed in
 *   intake-ignore.json. Concrete case that motivated this: submitted
 *   "Omega Memorial Service for Bro. Jesse L. Jackson" vs curated
 *   "Omega Memorial Service for Bro. Rev. Jesse L. Jackson, Sr.".
 *
 *   A submission counts as already-present if ANY existing event matches on
 *   either signal:
 *     1. Normalized title containment — both titles are lower-cased, stripped
 *        of punctuation and personal honorifics/suffixes (Bro./Rev./Sr./Jr./
 *        Dr.…), and whitespace-collapsed; a match is when one normalized title
 *        contains the other. This is a strict generalization of the old
 *        substring check and catches the Jesse case (both normalize to
 *        "omega memorial service for jesse l jackson").
 *     2. Same start date + same host chapter + a shared significant word — a
 *        backstop for titles that diverge beyond containment. Requiring the
 *        exact YYYY-MM-DD, the same chapter designation, AND at least one
 *        shared content word keeps it from suppressing a genuinely different
 *        event that merely happens to fall on the same day.
 *
 * Env: FORMSPREE_API_KEY (read-only key, repo secret).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FORM_ID = "mnjwnozy";
const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(here, "..");

async function fetchSubmissions(key) {
  const url = new URL(`https://formspree.io/api/0/forms/${FORM_ID}/submissions`);
  url.searchParams.set("limit", "50");
  const auth = "Basic " + Buffer.from(":" + key).toString("base64");
  const res = await fetch(url, {
    headers: { Authorization: auth, Accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`Formspree API ${res.status} ${res.statusText} ${body.slice(0, 300)}`);
    process.exit(1);
  }
  const data = await res.json();
  return Array.isArray(data.submissions) ? data.submissions : [];
}

// Personal honorifics / generational suffixes that curators add or drop freely.
// Stripping them lets "Bro. Rev. … Jackson, Sr." and "Bro. … Jackson" line up.
const HONORIFICS = new Set([
  "bro", "bros", "brother", "brothers", "sis", "sister",
  "rev", "reverend", "dr", "mr", "mrs", "ms", "hon", "honorable",
  "sr", "jr", "esq", "phd", "md",
]);

// Short connective words excluded when looking for a *significant* shared word,
// so the date+chapter backstop keys on real content, not "the"/"for"/"and".
const STOPWORDS = new Set([
  "the", "and", "for", "with", "from", "into", "your", "you",
]);

/**
 * Lower-case, drop apostrophes (so possessives stay one token), turn every other
 * non-alphanumeric run into a space, drop honorific/suffix tokens, collapse
 * whitespace. "Omega Memorial Service for Bro. Rev. Jesse L. Jackson, Sr." and
 * "Omega Memorial Service for Bro. Jesse L. Jackson" both -> the same string.
 */
function normalizeTitle(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((w) => w && !HONORIFICS.has(w))
    .join(" ")
    .trim();
}

/** Significant content words (>= 4 chars, not a stopword, not a bare number). */
function significantTokens(s) {
  return new Set(
    normalizeTitle(s)
      .split(" ")
      .filter((w) => w.length >= 4 && !STOPWORDS.has(w) && !/^\d+$/.test(w))
  );
}

/**
 * Chapter designation only. Submissions store host_chapter as
 * "ΧΛΛ — Chi Lambda Lambda" / "Ι — Iota"; events.ts stores the bare "ΧΛΛ" / "Ι".
 * Take the part before the first dash so both sides compare equal.
 */
function chapterDesignation(s) {
  return String(s || "").split(/[—–-]/)[0].trim();
}

/**
 * Parse src/data/events.ts for the fields dedup needs: title, the YYYY-MM-DD of
 * `start`, and hostChapter. We can't import the .ts at runtime (no transpile in
 * the pre-gate), so read the source. Isolate the `events` array literal, then
 * split it into one chunk per event on the leading `id:` field — keeping each
 * event's title/start/hostChapter associated even though hostChapter is optional.
 */
function existingEvents() {
  const src = fs.readFileSync(path.join(repoRoot, "src", "data", "events.ts"), "utf8");
  const decl = src.indexOf("export const events");
  const eq = decl === -1 ? -1 : src.indexOf("=", decl);
  const arrStart = eq === -1 ? -1 : src.indexOf("[", eq);
  const arrEnd = arrStart === -1 ? -1 : src.indexOf("\n];", arrStart);
  if (arrStart === -1 || arrEnd === -1) return [];
  const body = src.slice(arrStart, arrEnd);

  return body
    .split(/(?=^[ \t]*id:\s*")/m)
    .filter((chunk) => /^[ \t]*id:\s*"/m.test(chunk))
    .map((chunk) => {
      const title = (chunk.match(/\btitle:\s*"([^"]+)"/) || [])[1] || "";
      const start = (chunk.match(/\bstart:\s*"([^"]+)"/) || [])[1] || "";
      const hostChapter = (chunk.match(/\bhostChapter:\s*"([^"]+)"/) || [])[1] || "";
      return {
        norm: normalizeTitle(title),
        sig: significantTokens(title),
        date: start.slice(0, 10),
        chapter: chapterDesignation(hostChapter),
      };
    })
    .filter((e) => e.norm);
}

/** True if `sub` is NOT already represented by any curated event. */
function isNew(sub, events) {
  const norm = normalizeTitle(sub.title);
  if (!norm) return false; // blank/garbage title — never auto-draft it

  const date = String(sub.date || "").slice(0, 10);
  const chapter = chapterDesignation(sub.host_chapter);
  const sig = significantTokens(sub.title);

  const present = events.some((ev) => {
    // 1) Normalized title containment (generalizes the old substring check).
    if (norm.includes(ev.norm) || ev.norm.includes(norm)) return true;
    // 2) Same date + same chapter + a shared significant word (retitle backstop).
    if (date && ev.date === date && chapter && ev.chapter && ev.chapter === chapter) {
      for (const t of sig) if (ev.sig.has(t)) return true;
    }
    return false;
  });

  return !present;
}

function loadIgnore() {
  const file = path.join(repoRoot, ".github", "intake-ignore.json");
  if (!fs.existsSync(file)) return { titles: [], dates: [] };
  try {
    const j = JSON.parse(fs.readFileSync(file, "utf8"));
    return {
      titles: (j.ignoreTitles || []).map((s) => String(s).toLowerCase()),
      dates: j.ignoreDates || [],
    };
  } catch {
    return { titles: [], dates: [] };
  }
}

function isIgnored(sub, ignore) {
  const t = String(sub.title || "").trim().toLowerCase();
  if (ignore.titles.some((it) => t.includes(it))) return true;
  if (sub._date && ignore.dates.includes(sub._date)) return true;
  return false;
}

async function main() {
  const key = process.env.FORMSPREE_API_KEY;
  if (!key) {
    console.error("FORMSPREE_API_KEY not set");
    process.exit(1);
  }
  const subs = await fetchSubmissions(key.trim());
  const events = existingEvents();
  const ignore = loadIgnore();
  const news = subs.filter((s) => isNew(s, events) && !isIgnored(s, ignore));

  fs.writeFileSync(
    path.join(repoRoot, "new-submissions.json"),
    JSON.stringify(news, null, 2)
  );
  console.log(`${news.length} new public submission(s).`);

  const out = process.env.GITHUB_OUTPUT;
  if (out) {
    fs.appendFileSync(out, `has_new=${news.length > 0}\n`);
    fs.appendFileSync(out, `count=${news.length}\n`);
  }
}

// Run only when executed directly (`node scripts/intake-check.mjs`), so the
// pure helpers above can be imported by a test without firing the network call.
const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (invokedDirectly) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { normalizeTitle, significantTokens, chapterDesignation, existingEvents, isNew };
