import { NextResponse } from "next/server";
import { events } from "@/data/events";

/**
 * Public JSON feed of all events — single source of truth is src/data/events.ts.
 *
 * Consumed by the One Omega companion mobile app (Expo) so the calendar stays
 * dynamic without shipping a new app build. The existing add-event workflow
 * (edit events.ts → commit → Vercel deploy) automatically updates this feed.
 *
 * Flyer paths in each event are site-relative (e.g. "/events/foo.jpg"); clients
 * must prefix them with the site origin (https://oneomegachicago.org).
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

export function GET() {
  return NextResponse.json(
    { events },
    {
      headers: {
        ...CORS,
        // Edge-cache for 5 min, serve stale while revalidating in the background.
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    }
  );
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}
