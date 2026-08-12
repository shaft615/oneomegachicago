/**
 * Conclave Idea Bank intake, shared with chicagoclave2028.com.
 *
 * One Omega carries the exact same feature as the Conclave site: ideas
 * submitted here land in the same conclave_idea_submissions queue that the
 * leadership team triages in the Conclave admin portal's Idea Board. The
 * Conclave site owns the API (and the database behind it); our pages POST
 * to it cross-origin — chicagoclave2028.com allowlists this origin via CORS
 * and attributes anything arriving cross-site to One Omega.
 */

export const CONCLAVE_IDEAS_API = "https://chicagoclave2028.com/api/ideas";

export const IDEAS_FALLBACK_EMAIL = "info@chicagoclave2028.com";

/**
 * POST to the Conclave Idea Bank API, with the same same-origin fallback the
 * Formspree forms use (src/lib/forms.ts): when a firewall or extension
 * silently drops the cross-origin call (a THROWN fetch, not an HTTP error),
 * retry through our own /api/ideas relay. An HTTP error means the Conclave
 * API received and rejected the request, so relaying would change nothing.
 */
export async function fetchIdeasApi(body: unknown): Promise<Response> {
  const init: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  try {
    return await fetch(CONCLAVE_IDEAS_API, init);
  } catch {
    return await fetch("/api/ideas", init);
  }
}
