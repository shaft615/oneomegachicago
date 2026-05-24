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

function existingTitles() {
  const src = fs.readFileSync(path.join(repoRoot, "src", "data", "events.ts"), "utf8");
  const titles = [];
  const re = /title:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) titles.push(m[1].toLowerCase());
  return titles;
}

function isNew(sub, titles) {
  const t = String(sub.title || "").trim().toLowerCase();
  if (!t) return false;
  return !titles.some((et) => et.includes(t) || t.includes(et));
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
  const titles = existingTitles();
  const ignore = loadIgnore();
  const news = subs.filter((s) => isNew(s, titles) && !isIgnored(s, ignore));

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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
