import { NextResponse, type NextRequest } from "next/server";
import { CONCLAVE_IDEAS_API } from "@/lib/ideas";

/**
 * Same-origin relay for the Conclave Idea Bank, mirroring the Formspree
 * relay at /api/forms/[formId]: some visitors sit behind firewalls or
 * extensions that silently drop a cross-origin POST, and a POST to our own
 * origin is far less likely to be blocked. The client (src/lib/ideas.ts →
 * fetchIdeasApi) tries chicagoclave2028.com directly first and only falls
 * back here when the direct call throws, so normal traffic never touches
 * the relay.
 *
 * Server-to-server calls carry no browser Origin header, so the Conclave
 * API attributes them by the explicit `source` field the form already
 * sends ('one-omega').
 */

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: string;
  try {
    body = await req.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read the submission." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(CONCLAVE_IDEAS_API, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body,
    });
    const payload = await upstream.text();
    return new NextResponse(payload, {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach the Conclave idea bank." },
      { status: 502 }
    );
  }
}
