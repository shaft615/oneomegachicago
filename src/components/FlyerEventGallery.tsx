import FeaturedEventCard from "@/components/FeaturedEventCard";
import { events, sortByStart } from "@/data/events";

/**
 * Renders every upcoming event that has a flyer and is NOT the featured
 * event — useful as a "more on the horizon" section below the featured
 * card. Hidden entirely when there are no qualifying events.
 */
export default function FlyerEventGallery() {
  const cutoff = Date.now() - 86_400_000; // include today
  const flyerEvents = sortByStart(events).filter(
    (e) =>
      e.flyer &&
      !e.featured &&
      new Date(e.start).getTime() >= cutoff
  );

  if (flyerEvents.length === 0) return null;

  return (
    <section className="section-omega bg-white">
      <div className="container-omega">
        <div className="mb-10 max-w-2xl space-y-2">
          <span className="eyebrow">More on the Horizon</span>
          <h2 className="heading-section">Other upcoming events.</h2>
          <div className="divider-gold" />
          <p className="font-sans text-base leading-relaxed text-neutral-700">
            Browse the latest flyers from across the Chicagoland Thirteen.
            Events without flyers still appear on the full calendar below.
          </p>
        </div>

        <div className="space-y-6">
          {flyerEvents.map((e) => (
            <FeaturedEventCard key={e.id} event={e} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
