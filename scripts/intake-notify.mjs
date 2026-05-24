#!/usr/bin/env node
/**
 * Event intake notifier (Phase 2, Step 1).
 *
 * Runs in CI on a schedule. Fetches chapter event submissions from Formspree,
 * diffs them against the events already in src/data/events.ts, and — if there
 * are new ones not yet on the site — opens a single GitHub issue listing them
 * so a human gets pinged and can run the add-event intake flow.
 *
 * Dedup: if an open issue labeled `event-intake` already exists, this exits
 * without opening another, so you never get spammed. Close the issue once
 * you've processed the submissions; the next run opens a fresh one if more
 * have arrived.
 *
 * Env (provided by the GitHub Action):
 *   FORMSPREE_API_KEY  — Formspree read-only key (repo secret)
 *   GH_TOKEN           — provided automatically as secrets.GITHUB_TOKEN
 *
 * Requires the `gh` CLI (preinstalled on GitHub-hosted runners).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const FORM_ID = "mnjwnozy"; // Chapter Event Submissions
const LABEL = "event-intake";
const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(here, "..");

function fail(msg) {
  console.error("ERROR: " + msg);
  process.exit(1);
}

async function fetchSubmissions(key) {
  const url = new URL(`https://formspree.io/api/0/forms/${FORM_ID}/submissions`);
  url.searchParams.set("limit", "50");
  const auth = "Basic " + Buffer.from(":" + key).toString("base64");
  const res = await fetch(url, {
    headers: { Authorization: auth, Accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    fail(`Formspree API ${res.status} ${res.statusText} ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  return Array.isArray(data.submissions) ? data.submissions : [];
}

/** Pull existing event titles out of events.ts for a loose "already on site" check. */
function existingTitles() {
  const file = path.join(repoRoot, "src", "data", "events.ts");
  const src = fs.readFileSync(file, "utf8");
  const titles = [];
  const re = /title:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) titles.push(m[1].toLowerCase());
  return titles;
}

/** A submission is "new" if no existing title contains it (or vice versa). */
function isNew(sub, titles) {
  const t = String(sub.title || "").trim().toLowerCase();
  if (!t) return false;
  return !titles.some((et) => et.includes(t) || t.includes(et));
}

/**
 * Submissions the Foundation explicitly decided NOT to post (e.g. internal
 * chapter business). Edit .github/intake-ignore.json to add more — match by
 * title (case-insensitive substring) or by exact submission _date.
 */
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

function gh(args) {
  return execFileSync("gh", args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function openIssueExists() {
  try {
    const out = gh([
      "issue",
      "list",
      "--label",
      LABEL,
      "--state",
      "open",
      "--json",
      "number",
    ]);
    const arr = JSON.parse(out || "[]");
    return arr.length > 0;
  } catch {
    // If the label doesn't exist yet, `gh issue list --label` can error;
    // treat that as "no open issue".
    return false;
  }
}

function ensureLabel() {
  try {
    gh([
      "label",
      "create",
      LABEL,
      "--color",
      "6D2077",
      "--description",
      "New chapter event submissions awaiting intake",
      "--force",
    ]);
  } catch {
    /* label may already exist; ignore */
  }
}

function truncate(s, n) {
  s = String(s || "").replace(/\s+/g, " ").trim();
  return s.length > n ? s.slice(0, n) + "…" : s;
}

function issueBody(news) {
  const lines = [
    `The intake notifier found **${news.length}** event submission(s) on the Chapter Event Submissions form that aren't on the site yet.`,
    "",
    "**To process:** in a Claude session, say _“pull the latest event submissions and add any new public ones”_ (runs the `add-event` skill), then close this issue.",
    "",
    "_Curation reminder: skip internal chapter business (routine meetings, council sessions) per the add-event skill._",
    "",
    "---",
    "",
  ];
  news.forEach((s, i) => {
    lines.push(`### ${i + 1}. ${s.title || "(untitled)"}`);
    lines.push(`- **Chapter:** ${s.host_chapter || "—"}`);
    lines.push(
      `- **Date:** ${s.date || "—"} ${s.start_time || ""}${
        s.end_time ? "–" + s.end_time : ""
      }`.trim()
    );
    lines.push(`- **Category:** ${s.category || "—"}`);
    lines.push(`- **Location:** ${s.location || "—"}`);
    lines.push(
      `- **Submitted by:** ${s.submitter_name || "—"}${
        s.submitter_email ? ` (${s.submitter_email})` : ""
      }${s._date ? ` on ${s._date.slice(0, 10)}` : ""}`
    );
    lines.push(`- **Registration:** ${s.registration_link || "—"}`);
    lines.push(`- **Description:** ${truncate(s.description, 280)}`);
    lines.push("");
  });
  return lines.join("\n");
}

async function main() {
  const key = process.env.FORMSPREE_API_KEY;
  if (!key) fail("FORMSPREE_API_KEY not set (add it as a repo secret).");

  const subs = await fetchSubmissions(key.trim());
  const titles = existingTitles();
  const ignore = loadIgnore();
  const news = subs.filter((s) => isNew(s, titles) && !isIgnored(s, ignore));

  console.log(
    `Fetched ${subs.length} submission(s); ${news.length} new and not ignored.`
  );

  if (news.length === 0) {
    console.log("Nothing new. Exiting.");
    return;
  }

  if (openIssueExists()) {
    console.log(
      "An open `event-intake` issue already exists — not opening another."
    );
    return;
  }

  ensureLabel();
  const title = `📥 ${news.length} new event submission(s) to review`;
  const body = issueBody(news);
  const out = gh([
    "issue",
    "create",
    "--title",
    title,
    "--body",
    body,
    "--label",
    LABEL,
  ]);
  console.log("Opened issue: " + out.trim());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
