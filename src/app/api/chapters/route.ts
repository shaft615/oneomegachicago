import { NextResponse } from "next/server";
import { chapters } from "@/data/chapters";

/**
 * Public JSON feed of all chapters — single source of truth is
 * src/data/chapters.ts. Consumed by the One Omega companion mobile app.
 *
 * `logo` paths are site-relative (e.g. "/chapters/iota.png"); clients must
 * prefix them with the site origin (https://oneomegachicago.org).
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

export function GET() {
  return NextResponse.json(
    { chapters },
    {
      headers: {
        ...CORS,
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    }
  );
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}
