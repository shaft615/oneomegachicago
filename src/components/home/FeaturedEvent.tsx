import Link from "next/link";
import { getMergedEvents, pickFeatured } from "@/lib/portal-events";
import FeaturedEventCard from "@/components/FeaturedEventCard";

export default async function FeaturedEvent() {
  // Merged static + portal list — an event featured from the governance
  // portal surfaces here exactly like a static one. Falls back to the
  // static list alone when the portal feed is unreachable.
  const event = pickFeatured(await getMergedEvents());
  if (!event) return null;

  return (
    <section className="section-omega bg-neutral-50">
      <div className="container-omega">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="eyebrow">Featured Event</span>
            <h2 className="heading-section">Coming up from the Foundation.</h2>
            <div className="divider-gold" />
          </div>
          <Link href="/events" className="btn-outline self-start lg:self-auto">
            All Events →
          </Link>
        </div>

        <FeaturedEventCard event={event} variant="compact" />
      </div>
    </section>
  );
}
