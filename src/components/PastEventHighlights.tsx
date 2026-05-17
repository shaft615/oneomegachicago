import FeaturedEventCard from "@/components/FeaturedEventCard";
import { events, isEventPast, sortByStart } from "@/data/events";

/**
 * "Looking Back" section — surfaces past events that have a flyer,
 * with a thank-you message to attendees. Auto-hides if no qualifying
 * events exist. Newest past events appear first.
 */
export default function PastEventHighlights() {
  const pastFlyerEvents = sortByStart(events)
    .filter((e) => e.flyer && isEventPast(e))
    .reverse(); // newest first

  if (pastFlyerEvents.length === 0) return null;

  return (
    <section className="section-omega bg-neutral-100 border-t border-omega-purple/10">
      <div className="container-omega">
        <div className="mb-10 max-w-2xl space-y-2">
          <span className="eyebrow">Looking Back</span>
          <h2 className="heading-section">Thank you for coming out.</h2>
          <div className="divider-gold" />
          <p className="font-sans text-base leading-relaxed text-neutral-700">
            Recent gatherings from across the Foundation and our Chapters.
            We&rsquo;re grateful to every brother, sister, partner, and
            friend who joined us.
          </p>
        </div>

        <div className="space-y-6">
          {pastFlyerEvents.map((e) => (
            <FeaturedEventCard key={e.id} event={e} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
