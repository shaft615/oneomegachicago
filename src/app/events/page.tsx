import PageHeader from "@/components/PageHeader";
import FeaturedEventCard from "@/components/FeaturedEventCard";
import FlyerEventGallery from "@/components/FlyerEventGallery";
import BrotherRegistrationForm from "./BrotherRegistrationForm";
import EventCalendar from "@/components/calendar/EventCalendar";
import { getFeaturedEvent } from "@/data/events";

export default function EventsPage() {
  const featured = getFeaturedEvent();

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Foundation programming pipeline."
        description="Coordinated events spanning the thirteen chapters — from quarterly leadership convenings to community wellness, and the road to the 86th Grand Conclave."
      />

      <section className="bg-white border-b border-omega-purple/10">
        <div className="container-omega py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-sans text-sm text-neutral-600">
            Looking for the full event calendar?
          </p>
          <a href="#calendar" className="btn-outline">
            Jump to Calendar ↓
          </a>
        </div>
      </section>

      {featured && (
        <>
          <section className="section-omega bg-white">
            <div className="container-omega">
              <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
                <div className="space-y-2">
                  <span className="eyebrow">Featured · Upcoming</span>
                  <h2 className="heading-section">
                    Don&rsquo;t miss our next gathering.
                  </h2>
                  <div className="divider-gold" />
                </div>
              </div>
              <FeaturedEventCard event={featured} variant="full" />
            </div>
          </section>
          <BrotherRegistrationForm />
        </>
      )}

      <FlyerEventGallery />

      <section
        id="calendar"
        className="section-omega bg-neutral-50 scroll-mt-24"
      >
        <div className="container-omega">
          <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
            <div className="space-y-2 max-w-2xl">
              <span className="eyebrow">Calendar</span>
              <h2 className="heading-section">
                Foundation &amp; chapter event calendar.
              </h2>
              <div className="divider-gold" />
              <p className="font-sans text-base leading-relaxed text-neutral-700">
                Every coordinated event across the Chicagoland Thirteen, in one
                view. Toggle between month and agenda — chapters can submit
                their own events for inclusion.
              </p>
            </div>
          </div>

          <EventCalendar />
        </div>
      </section>
    </>
  );
}
