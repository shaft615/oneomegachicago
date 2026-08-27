import { events as staticEvents, type Event } from "@/data/events";

/**
 * Portal-managed events, merged with the static list.
 *
 * The One Omega governance portal (portal.oneomegachicago.org) is where the
 * Foundation now creates events; its public feed serves published events
 * already shaped to this site's `Event` interface (see the portal repo,
 * lib/events/feed.ts — kept in sync by hand with src/data/events.ts).
 * This site merges that feed into everything event-shaped: the /events page,
 * the calendar, the home featured card, and the /api/events JSON the mobile
 * app consumes.
 *
 * DESIGN RULE — the site must never break on portal downtime. Every failure
 * path (fetch error, timeout, non-200, malformed JSON) returns [] and the
 * static list renders alone, exactly as before the portal existed. ISR
 * revalidates hourly, matching the /events page's own `revalidate = 3600`.
 *
 * Portal flyer URLs are absolute (Supabase Storage), unlike the static
 * list's site-relative paths — next.config.mjs allows that host for
 * next/image.
 */

const DEFAULT_FEED_URL =
  "https://portal.oneomegachicago.org/api/public/events";
const FETCH_TIMEOUT_MS = 8000;

function isValidEvent(e: unknown): e is Event {
  if (typeof e !== "object" || e === null) return false;
  const r = e as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    typeof r.title === "string" &&
    typeof r.start === "string" &&
    !Number.isNaN(Date.parse(r.start)) &&
    typeof r.dateLabel === "string" &&
    typeof r.location === "string" &&
    Array.isArray(r.description) &&
    (r.status === "upcoming" || r.status === "past")
  );
}

export async function fetchPortalEvents(): Promise<Event[]> {
  const url = process.env.PORTAL_EVENTS_URL ?? DEFAULT_FEED_URL;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    }).finally(() => clearTimeout(timer));
    if (!res.ok) throw new Error(`portal events fetch ${res.status}`);
    const body = (await res.json()) as { events?: unknown };
    if (!Array.isArray(body.events)) return [];
    return body.events.filter(isValidEvent);
  } catch (err) {
    console.error("[portal-events] fetch failed:", err);
    return [];
  }
}

/**
 * Static + portal events, portal entries first within equal starts. Dedupes
 * by id and by lowercased title, so an event that exists both as a static
 * entry and a portal record (e.g. added by hand before the portal record was
 * published) appears once — the static entry wins, since it may carry
 * site-local extras (flyerBack, sponsors, registerHref).
 */
export async function getMergedEvents(): Promise<Event[]> {
  const portal = await fetchPortalEvents();
  if (portal.length === 0) return staticEvents;

  const seenIds = new Set(staticEvents.map((e) => e.id));
  const seenTitles = new Set(staticEvents.map((e) => e.title.toLowerCase()));
  const fresh = portal.filter(
    (e) => !seenIds.has(e.id) && !seenTitles.has(e.title.toLowerCase())
  );
  return [...staticEvents, ...fresh];
}

/** Featured resolution over a merged list: first featured, still-upcoming
 *  event wins; the portal feed and static list use the same flag. */
export function pickFeatured(list: Event[]): Event | undefined {
  const now = Date.now();
  return list.find((e) => {
    if (!e.featured || e.status !== "upcoming") return false;
    const endMs = e.end
      ? new Date(e.end).getTime()
      : new Date(e.start).getTime() + 86_400_000;
    return endMs >= now;
  });
}
