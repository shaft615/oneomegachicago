import { NextResponse } from "next/server";
import { getMergedEvents } from "@/lib/portal-events";

/**
 * Public JSON feed of all events — the static src/data/events.ts list merged
 * with the governance portal's published events (src/lib/portal-events.ts).
 *
 * Consumed by the One Omega companion mobile app (Expo) so the calendar stays
 * dynamic without shipping a new app build. Both add-event workflows update
 * this feed automatically: editing events.ts → commit → deploy, and
 * publishing an event in the portal (picked up within the hour via ISR).
 *
 * Flyer paths on STATIC events are site-relative (e.g. "/events/foo.jpg");
 * clients must prefix them with the site origin (https://oneomegachicago.org).
 * Portal events (`source: "portal"`, ids prefixed `portal-`) carry ABSOLUTE
 * flyer URLs already — clients must not prefix those (checking for "://" is
 * enough).
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

export async function GET() {
  const events = await getMergedEvents();
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
