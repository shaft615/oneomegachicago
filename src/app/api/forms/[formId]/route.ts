import { NextResponse, type NextRequest } from "next/server";

/**
 * Same-origin relay for our Formspree forms.
 *
 * Some visitors sit behind corporate firewalls, TLS-inspecting antivirus, or
 * request-blocking browser extensions (e.g. ZoomInfo ReachOut) that silently
 * drop a cross-origin POST to formspree.io — the browser surfaces this as
 * net::ERR_EMPTY_RESPONSE / a thrown "Failed to fetch", so the submission never
 * lands. A POST to our own origin (oneomegachicago.org) is far less likely to
 * be blocked. The client (see src/lib/forms.ts → fetchFormspree) tries
 * Formspree directly first and only falls back to this route when the direct
 * call throws, so normal traffic never touches the proxy.
 *
 * We forward the raw request body and its Content-Type verbatim, so this works
 * for both JSON forms and the multipart event-submission form (flyer upload).
 */

// Allowlist of the Formspree form IDs this site owns. Restricting the relay to
// known IDs keeps it from being abused as an open proxy to arbitrary Formspree
// forms (or as a spam relay from our server's IP).
const ALLOWED_FORM_IDS = new Set<string>([
  "xjglvlan", // Father's Day — brother registration
  "mnjwnozy", // Chapter event submission (multipart; includes flyer)
  "xgorjngd", // Contact / sponsorship interest (shared)
  "mwvyyvkb", // Father of the Year nomination
]);

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: { formId: string } }
) {
  const { formId } = params;

  if (!ALLOWED_FORM_IDS.has(formId)) {
    return NextResponse.json({ error: "Unknown form." }, { status: 404 });
  }

  // Preserve the original Content-Type (incl. the multipart boundary) and the
  // exact bytes so the relayed request is identical to a direct submission.
  // Note: Vercel serverless functions cap the request body around 4.5MB. The
  // event-submission form already retries without its flyer on failure, so an
  // oversized multipart relayed here degrades gracefully (event still recorded)
  // rather than being lost outright.
  const contentType = req.headers.get("content-type");
  let body: ArrayBuffer;
  try {
    body = await req.arrayBuffer();
  } catch {
    return NextResponse.json(
      { error: "Could not read the submission." },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        ...(contentType ? { "content-type": contentType } : {}),
        // Force a JSON response from Formspree (instead of a redirect) so the
        // client can read res.ok reliably.
        accept: "application/json",
      },
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
    // Even our server couldn't reach Formspree — surface a 502 so the client
    // shows its error state with the email fallback.
    return NextResponse.json(
      { error: "Could not reach the submission service." },
      { status: 502 }
    );
  }
}
