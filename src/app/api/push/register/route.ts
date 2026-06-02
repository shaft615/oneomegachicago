import { NextResponse } from "next/server";

/**
 * Registers an Expo push token from the companion mobile app.
 *
 * Tokens are upserted into a Supabase `push_tokens` table via the PostgREST
 * REST endpoint (no SDK dependency). Configure these env vars in Vercel:
 *   - SUPABASE_URL                 e.g. https://xxxx.supabase.co
 *   - SUPABASE_SERVICE_ROLE_KEY    service-role key (server-only secret)
 *
 * Expected table:
 *   create table push_tokens (
 *     token       text primary key,
 *     platform    text,
 *     updated_at  timestamptz default now()
 *   );
 *
 * If env vars are absent the route returns 503 so the site still builds/deploys
 * before Supabase is provisioned.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json(
      { error: "Push backend not configured" },
      { status: 503, headers: CORS }
    );
  }

  let body: { expoPushToken?: string; platform?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: CORS }
    );
  }

  const token = body.expoPushToken?.trim();
  if (!token || !token.startsWith("ExponentPushToken")) {
    return NextResponse.json(
      { error: "Missing or invalid expoPushToken" },
      { status: 400, headers: CORS }
    );
  }

  const res = await fetch(`${url}/rest/v1/push_tokens`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // Upsert on the token primary key.
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({
      token,
      platform: body.platform ?? null,
      updated_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return NextResponse.json(
      { error: "Failed to store token", detail },
      { status: 502, headers: CORS }
    );
  }

  return NextResponse.json({ ok: true }, { headers: CORS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}
