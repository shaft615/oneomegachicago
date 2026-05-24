#!/usr/bin/env node
/**
 * Fetch chapter event submissions from Formspree's Submissions API.
 *
 * Part of the Phase-1 event intake workflow: a human runs this in a Claude
 * session to pull new submissions, then the `add-event` skill turns each into
 * a committed event. No always-on infrastructure — you trigger it.
 *
 * Usage:
 *   node scripts/fetch-event-submissions.mjs [--since ISO] [--limit N] [--form HASHID] [--spam] [--json]
 *
 * Auth — the Formspree API key is a SECRET. Never commit it. Provide it via:
 *   1. an environment variable:  FORMSPREE_API_KEY=xxx node scripts/fetch-event-submissions.mjs
 *   2. or a gitignored .env.local at the repo root containing:  FORMSPREE_API_KEY=xxx
 *
 * Requires a Formspree Professional/Business plan with the form's "HTTP API"
 * toggle enabled (Form → Settings → HTTP API). Defaults to the Chapter Event
 * Submissions form (mnjwnozy).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_FORM = "mnjwnozy"; // Chapter Event Submissions

function loadApiKey() {
  if (process.env.FORMSPREE_API_KEY) return process.env.FORMSPREE_API_KEY.trim();
  const here = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.join(here, "..", ".env.local");
  if (fs.existsSync(envPath)) {
    const line = fs
      .readFileSync(envPath, "utf8")
      .replace(/^﻿/, "") // strip BOM some Windows editors prepend
      .split(/\r?\n/)
      .find((l) => l.trim().startsWith("FORMSPREE_API_KEY="));
    if (line) {
      return line
        .slice(line.indexOf("=") + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  }
  return null;
}

function parseArgs(argv) {
  const args = { limit: "20", form: DEFAULT_FORM, json: false, spam: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--since") args.since = argv[++i];
    else if (a === "--limit") args.limit = argv[++i];
    else if (a === "--form") args.form = argv[++i];
    else if (a === "--json") args.json = true;
    else if (a === "--spam") args.spam = true;
    else if (a === "--help" || a === "-h") args.help = true;
  }
  return args;
}

function usage() {
  console.log(
    `Fetch Formspree event submissions.\n\n` +
      `  node scripts/fetch-event-submissions.mjs [--since ISO] [--limit N] [--form HASHID] [--spam] [--json]\n\n` +
      `Set FORMSPREE_API_KEY via env var or .env.local (gitignored). Never commit the key.`
  );
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) return usage();

  const key = loadApiKey();
  if (!key) {
    console.error(
      "ERROR: FORMSPREE_API_KEY not set.\n" +
        "Set it as an environment variable, or add a line to a gitignored .env.local:\n" +
        "  FORMSPREE_API_KEY=your_key_here"
    );
    process.exit(1);
  }

  const url = new URL(`https://formspree.io/api/0/forms/${args.form}/submissions`);
  if (args.since) url.searchParams.set("since", args.since);
  if (args.limit) url.searchParams.set("limit", String(args.limit));
  if (args.spam) url.searchParams.set("spam", "true");

  const auth = "Basic " + Buffer.from(":" + key).toString("base64");
  let res;
  try {
    res = await fetch(url, {
      headers: { Authorization: auth, Accept: "application/json" },
    });
  } catch (e) {
    console.error("ERROR: network request failed:", e.message);
    process.exit(1);
  }

  if (!res.ok) {
    console.error(`ERROR: Formspree API returned ${res.status} ${res.statusText}`);
    const body = await res.text().catch(() => "");
    if (body) console.error(body.slice(0, 600));
    if (res.status === 401 || res.status === 403) {
      console.error(
        "\nAuth failed. Check the API key and that the form's HTTP API toggle is enabled."
      );
    }
    process.exit(1);
  }

  const data = await res.json();
  const subs = Array.isArray(data.submissions) ? data.submissions : [];

  if (args.json) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(`\n${subs.length} submission(s) from form ${args.form}:\n`);
  subs.forEach((s, i) => {
    console.log(`--- Submission ${i + 1} ---`);
    for (const [k, v] of Object.entries(s)) {
      console.log(`  ${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`);
    }
    console.log("");
  });
  console.log(
    "Tip: re-run with --json to see the raw payload (useful for spotting how uploaded flyer files are represented)."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
