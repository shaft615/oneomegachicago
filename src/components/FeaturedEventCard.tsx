import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/data/events";

interface FeaturedEventCardProps {
  event: Event;
  /** Compact = used in homepage section. Full = used on /events page. */
  variant?: "compact" | "full";
}

export default function FeaturedEventCard({
  event,
  variant = "full",
}: FeaturedEventCardProps) {
  const isFull = variant === "full";

  return (
    <article
      className={`relative overflow-hidden rounded-3xl bg-white shadow-regalia ring-1 ring-omega-purple/10 ${
        isFull ? "" : ""
      }`}
    >
      <div className="grid lg:grid-cols-12">
        {event.flyer && (
          event.flyerBack ? (
            // Two-page flyer (e.g. front + program): stack both images.
            <div className="lg:col-span-5 bg-omega-purple-dark flex flex-col">
              {[event.flyer, event.flyerBack].map((src, i) => (
                <div key={i} className="relative aspect-[4/5] w-full">
                  <Image
                    src={src}
                    alt={`${event.title} flyer${i === 1 ? " — program" : ""}`}
                    fill
                    className="object-contain p-2"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    priority={isFull && i === 0}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="lg:col-span-5 relative bg-omega-purple-dark">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full w-full">
                <Image
                  src={event.flyer}
                  alt={`${event.title} flyer`}
                  fill
                  className="object-contain p-2"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority={isFull}
                />
              </div>
            </div>
          )
        )}

        <div
          className={`${
            event.flyer ? "lg:col-span-7" : "lg:col-span-12"
          } p-8 sm:p-10 flex flex-col`}
        >
          <span className="eyebrow text-omega-gold">
            {event.featured
              ? `Featured Event · ${event.category}`
              : `${event.hostChapter ?? "Foundation"} · ${event.category}`}
          </span>
          <h3
            className={`mt-3 font-display font-semibold text-omega-purple-dark ${
              isFull ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
            } leading-tight`}
          >
            {event.title}
          </h3>

          <dl className="mt-5 grid sm:grid-cols-2 gap-4">
            <div>
              <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-omega-purple/70">
                Date
              </dt>
              <dd className="mt-1 font-sans text-sm font-medium text-neutral-800">
                {event.dateLabel}
              </dd>
            </div>
            {event.timeLabel && (
              <div>
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-omega-purple/70">
                  Time
                </dt>
                <dd className="mt-1 font-sans text-sm font-medium text-neutral-800">
                  {event.timeLabel}
                </dd>
              </div>
            )}
            <div>
              <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-omega-purple/70">
                Location
              </dt>
              <dd className="mt-1 font-sans text-sm font-medium text-neutral-800">
                {event.location}
              </dd>
            </div>
            <div>
              <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-omega-purple/70">
                Host
              </dt>
              <dd className="mt-1 font-sans text-sm font-medium text-neutral-800">
                {event.host}
              </dd>
            </div>
          </dl>

          {event.callout && (
            <div
              role="note"
              className="mt-6 rounded-xl bg-gilded-gradient p-4 ring-1 ring-omega-gold/40 shadow-gilded"
            >
              <p className="font-sans text-sm font-semibold text-omega-purple-dark leading-snug">
                {event.callout}
              </p>
            </div>
          )}

          {isFull &&
            event.description.map((p, i) => (
              <p
                key={i}
                className="mt-4 font-sans text-sm leading-relaxed text-neutral-700"
              >
                {p}
              </p>
            ))}

          {!isFull && event.description[0] && (
            <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-700 line-clamp-3">
              {event.description[0]}
            </p>
          )}

          {event.registration && (
            <p className="mt-5 font-sans text-xs uppercase tracking-[0.18em] text-omega-purple-dark">
              Registration:{" "}
              <span className="font-semibold">{event.registration}</span>
            </p>
          )}

          {(event.link ||
            event.secondaryLink ||
            (isFull && event.registerHref) ||
            (isFull && event.nominationHref)) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {isFull && event.registerHref && (
                <a
                  href={event.registerHref}
                  className="btn-gold text-omega-purple-dark inline-flex items-center gap-2"
                >
                  Register below ↓
                </a>
              )}
              {isFull && event.nominationHref && (
                event.nominationHref.startsWith("/") ? (
                  <Link
                    href={event.nominationHref}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {event.nominationLabel ?? "Nominate"}
                  </Link>
                ) : (
                  <a
                    href={event.nominationHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                    aria-label={`${event.nominationLabel ?? "Nominate"} (opens in a new tab)`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden
                    >
                      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {event.nominationLabel ?? "Nominate"}
                  </a>
                )
              )}
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-omega-purple text-omega-purple hover:bg-omega-purple hover:text-white inline-flex items-center gap-2"
                  aria-label={`Tickets and details for ${event.title} (opens in a new tab)`}
                >
                  Tickets &amp; Details →
                </a>
              )}
              {event.secondaryLink && (
                <a
                  href={event.secondaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-omega-purple text-omega-purple hover:bg-omega-purple hover:text-white inline-flex items-center gap-2"
                  aria-label={`${event.secondaryLinkLabel ?? "Event Website"} for ${event.title} (opens in a new tab)`}
                >
                  {event.secondaryLinkLabel ?? "Event Website"} →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
