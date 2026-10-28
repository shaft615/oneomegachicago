import Image from "next/image";
import Link from "next/link";
import { DONATE_URL } from "@/lib/donate";
import { getMergedEvents, pickFeatured } from "@/lib/portal-events";
import type { Event } from "@/data/events";

/**
 * The hero's right-hand card. When an upcoming event is featured — from the
 * governance portal or the static list — it takes the spot: flyer, date,
 * place and a ticket button. Otherwise the Foundation card shows. Server
 * component, so the featured lookup runs at render
 * (hourly ISR on the home page, same as the Featured Event section).
 */
function FeaturedHeroCard({ event }: { event: Event }) {
  return (
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-6 shadow-regalia">
      <p className="eyebrow text-omega-gold">Featured Event</p>
      {event.flyer && (
        <a
          href={event.link ?? "/events"}
          target={event.link ? "_blank" : undefined}
          rel={event.link ? "noopener noreferrer" : undefined}
          className="relative mt-4 block aspect-[4/5] overflow-hidden rounded-2xl bg-omega-purple-dark ring-1 ring-white/15"
          aria-label={`${event.title} flyer`}
        >
          <Image
            src={event.flyer}
            alt={`${event.title} flyer`}
            fill
            priority
            className="object-contain p-1"
            sizes="(min-width: 1024px) 24rem, 100vw"
          />
        </a>
      )}
      <p className="mt-4 font-display text-2xl tracking-regalia leading-tight">
        {event.title}
      </p>
      <p className="mt-2 font-sans text-sm text-white/85">
        {event.dateLabel}
        {event.timeLabel ? ` · ${event.timeLabel}` : ""}
      </p>
      <p className="font-sans text-sm text-white/65">{event.location}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            aria-label={`Tickets for ${event.title} (opens in a new tab)`}
          >
            Get Tickets
          </a>
        )}
        <Link
          href="/events"
          className="btn border border-white/40 text-white hover:bg-white hover:text-omega-purple-dark"
        >
          All Events
        </Link>
      </div>
    </div>
  );
}

function FoundationCard() {
  return (
    <div className="relative rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-8 shadow-regalia">
      <p className="eyebrow text-omega-gold">Chicagoland</p>
      <p className="mt-3 font-display text-5xl font-semibold tracking-regalia leading-none">
        13
      </p>
      <p className="mt-1 font-display text-2xl tracking-regalia">
        Chapters. One Foundation.
      </p>
      <div className="my-5 divider-gold" />
      <ul className="space-y-2 font-sans text-sm text-white/85">
        <li className="flex items-center justify-between">
          <span className="text-white/60">Home</span>
          <span className="font-medium">Chicago, IL</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-white/60">Structure</span>
          <span className="font-medium">Illinois Not-For-Profit</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-white/60">Tax Status</span>
          <span className="font-medium">501(c)(3)</span>
        </li>
      </ul>
    </div>
  );
}

export default async function HeroSection() {
  const featured = pickFeatured(await getMergedEvents());
  return (
    <section className="relative overflow-hidden bg-regalia-gradient text-white">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #fff 0, transparent 40%), radial-gradient(circle at 80% 80%, #B7A57A 0, transparent 40%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-omega-gold/15 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />

      <div className="container-omega relative section-omega grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="eyebrow text-omega-gold">
            One Omega Foundation, Inc.
          </span>
          <h1 className="heading-display !text-white">
            Thirteen chapters.
            <br />
            <span className="text-omega-gold">One Chicago.</span>
            <br />
            One Omega.
          </h1>
          <p className="font-sans text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
            The coordinating Foundation uniting thirteen Chicagoland chapters
            of Omega Psi Phi Fraternity, Inc. — pooling capacity, amplifying
            impact, and serving the city that raised them.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2"
              aria-label="Donate to One Omega Foundation (opens in a new tab)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Donate
            </a>
            <Link
              href="/events"
              className="btn border border-omega-gold text-omega-gold hover:bg-omega-gold hover:text-omega-purple-dark"
            >
              Events
            </Link>
            <Link
              href="/about"
              className="btn border border-white/40 text-white hover:bg-white hover:text-omega-purple-dark"
            >
              About the Foundation
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-3xl bg-omega-gold/30 blur-xl" />
            {featured ? (
              <FeaturedHeroCard event={featured} />
            ) : (
              <FoundationCard />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
