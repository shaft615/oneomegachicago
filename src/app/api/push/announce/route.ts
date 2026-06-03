import { NextResponse } from "next/server";

/**
 * Broadcasts a push notification to every registered device.
 *
 * Admin-only: callers must send `x-push-secret: <PUSH_ADMIN_SECRET>`. Reads all
 * tokens from the Supabase `push_tokens` table and sends them to the Expo Push
 * API in batches of 100.
 *
 * Intended to be called when a new event is published — manually, or as an
 * optional final step of the add-event skill, e.g.:
 *   POST /api/push/announce
 *   { "title": "New event added", "body": "Lake Jam '26 — Jun 13", "eventId": "lake-jam-2026" }
 *
 * Env vars (Vercel): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PUSH_ADMIN_SECRET.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const secret = process.env.PUSH_ADMIN_SECRET;

  if (!url || !key || !secret) {
    return NextResponse.json(
      { error: "Push backend not configured" },
      { status: 503 }
    );
  }
  if (req.headers.get("x-push-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { title?: string; body?: string; eventId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = body.title?.trim() || "One Omega Foundation";
  const message = body.body?.trim() || "A new event has been posted.";

  // Pull all tokens.
  const tokRes = await fetch(`${url}/rest/v1/push_tokens?select=token`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!tokRes.ok) {
    const detail = await tokRes.text();
    return NextResponse.json(
      { error: "Failed to read tokens", detail },
      { status: 502 }
    );
  }
  const rows: { token: string }[] = await tokRes.json();
  const tokens = rows.map((r) => r.token).filter(Boolean);

  if (tokens.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 });
  }

  const data = body.eventId ? { eventId: body.eventId } : undefined;
  let sent = 0;
  for (const batch of chunk(tokens, 100)) {
    const messages = batch.map((to) => ({
      to,
      title,
      body: message,
      sound: "default",
      ...(data ? { data } : {}),
    }));
    const res = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });
    if (res.ok) sent += batch.length;
  }

  return NextResponse.json({ ok: true, sent });
}
