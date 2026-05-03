import type { Metadata } from "next";
import Link from "next/link";
import QyeSponsorshipPlan from "./QyeSponsorshipPlan";

export const metadata: Metadata = {
  title: "Que Year's Eve · Sponsorship",
  description:
    "Que Year's Eve™ — One Night. One Omega. Lasting Impact. Sponsorship prospectus for the Foundation's New Year's Eve gala at the Marriott Marquis McCormick Place.",
};

const EVENT_DETAILS = [
  { label: "Date", value: "New Year's Eve 2026" },
  { label: "Venue", value: "Marriott Marquis McCormick Place" },
  { label: "Location", value: "Chicago, Illinois" },
  { label: "Host", value: "One Omega Foundation" },
  { label: "Expected Attendees", value: "1,000+ professionals" },
  { label: "Individual Tickets", value: "GA $75  ·  VIP $125–$250" },
];

const STAT_BADGES = [
  { value: "30–60", label: "Core Age Range" },
  { value: "1,000+", label: "Expected Attendees" },
  { value: "$100K+", label: "Household Income" },
  { value: "86%", label: "Advanced Degrees" },
];

const LIFESTYLE = [
  "Luxury experience seekers",
  "Philanthropic mindset",
  "High social engagement",
  "Culturally influential",
  "Brand-loyal consumers",
  "Early adopters",
  "Support community-first brands",
  "Influence peer networks",
];

const INDUSTRIES = [
  "Corporate Leadership",
  "Entrepreneurship",
  "Healthcare & Medicine",
  "Legal & Finance",
  "Government & Public Service",
  "Education & Academia",
  "Technology & Innovation",
];

const EXPOSURE_PHASES = [
  {
    label: "Pre-Event",
    title: "8–12 Weeks of Exposure",
    body: "Brand visibility across digital marketing, social media campaigns, email communications, and the event website — reaching thousands.",
  },
  {
    label: "Event Night",
    title: "Direct Engagement",
    body: "Face-to-face access to 1,000+ influential professionals in an elegant luxury setting during their most memorable moments.",
  },
  {
    label: "Post-Event",
    title: "Extended Recognition",
    body: "Continued website presence, sponsor recognition in event recap content, and thank-you communications distributed to all attendees.",
  },
  {
    label: "Year-Round",
    title: "Community Association",
    body: "Ongoing recognition in Foundation annual reports, community program updates, and association with scholarship recipients.",
  },
];

const IMPACT_PILLARS = [
  {
    n: "01",
    title: "Youth Mentoring",
    body: "Guidance and support helping young people reach their full potential through dedicated mentorship programs.",
  },
  {
    n: "02",
    title: "Scholarship Programs",
    body: "Opening doors to educational opportunities through financial support for students pursuing higher education.",
  },
  {
    n: "03",
    title: "Leadership Development",
    body: "Building the next generation of community leaders through comprehensive training and development initiatives.",
  },
];

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "audience", label: "Audience" },
  { id: "why-sponsor", label: "Why Sponsor" },
  { id: "impact", label: "Impact" },
  { id: "levels", label: "Levels" },
  { id: "compare", label: "Compare" },
  { id: "reserve", label: "Reserve" },
];

export default function QueYearsEvePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-regalia-gradient text-white">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #B7A57A 0, transparent 40%), radial-gradient(circle at 75% 75%, #fff 0, transparent 40%)",
          }}
          aria-hidden
        />
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-omega-gold/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />

        <div className="container-omega relative section-omega text-center max-w-5xl">
          <span className="eyebrow text-omega-gold">
            One Omega Foundation
          </span>
          <h1 className="mt-4 font-display !text-white text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-regalia leading-[0.95]">
            Que Year&rsquo;s Eve<sup className="text-2xl text-omega-gold align-super">™</sup>
          </h1>
          <p className="mt-6 font-display text-2xl sm:text-3xl text-omega-gold tracking-regalia">
            One Night. One Omega. Lasting Impact.
          </p>
          <div className="my-8 mx-auto divider-gold" />
          <p className="font-sans text-base sm:text-lg text-white/85 max-w-2xl mx-auto">
            The Foundation&rsquo;s premier New Year&rsquo;s Eve gala — a luxury
            celebration rooted in Omega Psi Phi tradition and Black Excellence.
          </p>

          <dl className="mt-10 inline-flex flex-wrap justify-center gap-x-10 gap-y-3 font-sans text-sm">
            <div>
              <dt className="text-white/60 uppercase tracking-[0.2em] text-[10px]">
                When
              </dt>
              <dd className="font-medium text-white">New Year&rsquo;s Eve 2026</dd>
            </div>
            <div>
              <dt className="text-white/60 uppercase tracking-[0.2em] text-[10px]">
                Where
              </dt>
              <dd className="font-medium text-white">
                Marriott Marquis McCormick Place
              </dd>
            </div>
            <div>
              <dt className="text-white/60 uppercase tracking-[0.2em] text-[10px]">
                City
              </dt>
              <dd className="font-medium text-white">Chicago, IL</dd>
            </div>
          </dl>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <a href="#levels" className="btn-gold">
              View Sponsorship Levels →
            </a>
            <a
              href="#reserve"
              className="btn border border-white/40 text-white hover:bg-white hover:text-omega-purple-dark"
            >
              Reserve Now
            </a>
          </div>
        </div>
      </section>

      {/* JUMP NAV */}
      <nav
        className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b border-omega-purple/10 shadow-chapter"
        aria-label="Prospectus sections"
      >
        <div className="container-omega flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 px-4 py-2 rounded-full font-sans text-sm font-medium text-omega-purple-dark hover:bg-omega-purple/10 transition"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ABOUT */}
      <section id="about" className="section-omega bg-white scroll-mt-32">
        <div className="container-omega grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-4">
            <span className="eyebrow">About the Event</span>
            <h2 className="heading-section">
              What is Que Year&rsquo;s Eve<sup>™</sup>?
            </h2>
            <div className="divider-gold" />
            <p className="font-sans text-base leading-relaxed text-neutral-700">
              Chicago&rsquo;s premier New Year&rsquo;s Eve gala — a luxury
              celebration rooted in Omega Psi Phi tradition and Black
              Excellence. Hosted by the One Omega Foundation, this annual
              event unites Chicago&rsquo;s most accomplished professionals for
              an unforgettable evening of culture, connection, and community.
            </p>
            <p className="font-sans text-sm text-neutral-500 italic">
              300+ influential professionals · Foundation fundraiser · Live
              entertainment · Top-shelf premium bar.
            </p>
          </div>

          <dl className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {EVENT_DETAILS.map((d) => (
              <div key={d.label} className="card p-5">
                <dt className="font-sans text-[10px] uppercase tracking-[0.2em] text-omega-purple/70">
                  {d.label}
                </dt>
                <dd className="mt-2 font-display text-lg font-semibold text-omega-purple-dark">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* AUDIENCE */}
      <section
        id="audience"
        className="section-omega bg-neutral-50 scroll-mt-32"
      >
        <div className="container-omega">
          <div className="max-w-2xl space-y-3 mb-12">
            <span className="eyebrow">Audience &amp; Reach</span>
            <h2 className="heading-section">Who you&rsquo;re reaching.</h2>
            <div className="divider-gold" />
            <p className="font-sans text-base leading-relaxed text-neutral-700">
              An audience of Black professionals at the height of their careers
              — high-income, highly-credentialed, culturally influential.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {STAT_BADGES.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-regalia-gradient text-white p-6 text-center shadow-regalia"
              >
                <div className="font-display text-4xl sm:text-5xl font-semibold text-omega-gold tracking-regalia leading-none">
                  {s.value}
                </div>
                <div className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-white/80">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold text-omega-purple-dark">
                Lifestyle Profile
              </h3>
              <div className="divider-gold mt-2 mb-4" />
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 font-sans text-sm text-neutral-700">
                {LIFESTYLE.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="text-omega-gold mt-0.5">▸</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-display text-lg font-semibold text-omega-purple-dark">
                Industries Represented
              </h3>
              <div className="divider-gold mt-2 mb-4" />
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 font-sans text-sm text-neutral-700">
                {INDUSTRIES.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-omega-purple mt-0.5">▸</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SPONSOR */}
      <section
        id="why-sponsor"
        className="section-omega bg-white scroll-mt-32"
      >
        <div className="container-omega">
          <div className="max-w-2xl space-y-3 mb-12">
            <span className="eyebrow">Why Sponsor</span>
            <h2 className="heading-section">
              Your brand. Their moment. Lasting impact.
            </h2>
            <div className="divider-gold" />
            <p className="font-sans text-base leading-relaxed text-neutral-700">
              Sponsorship value compounds across four phases of the event
              cycle.
            </p>
          </div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {EXPOSURE_PHASES.map((p, i) => (
              <li
                key={p.label}
                className="card p-6 relative overflow-hidden flex flex-col h-full"
              >
                <span className="absolute top-3 right-4 font-display text-5xl font-semibold text-omega-purple/10 tracking-regalia">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow">{p.label}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-omega-purple-dark">
                  {p.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600 flex-1">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-3xl mx-auto text-center font-display text-lg italic text-omega-purple-dark">
            Aligning your brand with Chicago&rsquo;s most respected community
            institutions.
          </p>
        </div>
      </section>

      {/* IMPACT */}
      <section
        id="impact"
        className="section-omega bg-omega-purple-dark text-white scroll-mt-32 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, #B7A57A 0, transparent 40%)",
          }}
          aria-hidden
        />
        <div className="container-omega relative">
          <div className="max-w-2xl space-y-3 mb-12">
            <span className="eyebrow text-omega-gold">
              One Omega Foundation
            </span>
            <h2 className="heading-section !text-white">
              Sponsorship with purpose.
            </h2>
            <div className="divider-gold" />
            <p className="font-sans text-base leading-relaxed text-white/85">
              Every sponsorship dollar directly funds community programs,
              youth mentoring, scholarships, and leadership development across
              the Chicagoland area. Your investment transcends marketing — it
              creates lasting impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {IMPACT_PILLARS.map((p) => (
              <div
                key={p.n}
                className="rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-7"
              >
                <div className="font-display text-5xl font-semibold text-omega-gold tracking-regalia leading-none">
                  {p.n}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center font-display text-xl text-omega-gold tracking-regalia">
            100% of net proceeds benefit the One Omega Foundation community
            programs.
          </p>
        </div>
      </section>

      {/* TIERS / COMPARE / RESERVE — interactive */}
      <QyeSponsorshipPlan />

      {/* CONTACT */}
      <section className="section-omega bg-omega-purple-dark text-white relative overflow-hidden">
        <div
          className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-omega-gold/15 blur-3xl"
          aria-hidden
        />
        <div className="container-omega relative max-w-3xl text-center">
          <span className="eyebrow text-omega-gold">
            Let&rsquo;s Create Impact Together
          </span>
          <h2 className="heading-section !text-white mt-3">
            Speak with our Sponsorship Coordinator.
          </h2>
          <div className="divider-gold mx-auto mt-4 mb-6" />
          <p className="font-sans text-base leading-relaxed text-white/85 max-w-xl mx-auto">
            Sponsorships are limited. Securing your level early ensures maximum
            pre-event exposure and preferred placement across all marketing
            channels.
          </p>

          <div className="mt-10 inline-block rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-8">
            <p className="font-display text-2xl font-semibold text-white">
              Tristan Elmore
            </p>
            <p className="font-sans text-sm text-omega-gold uppercase tracking-[0.2em]">
              Sponsorship Coordinator
            </p>
            <div className="divider-gold mx-auto my-5" />
            <ul className="space-y-2 font-sans text-base text-white/90">
              <li>
                <a
                  href="tel:+17085829520"
                  className="hover:text-omega-gold transition"
                >
                  (708) 582-9520
                </a>
              </li>
              <li>
                <a
                  href="mailto:events@oneomegachicago.org"
                  className="hover:text-omega-gold transition"
                >
                  events@oneomegachicago.org
                </a>
              </li>
            </ul>
          </div>

          <p className="mt-12 font-sans text-xs text-white/50 italic">
            One Omega Foundation, Inc. · 501(c)(3) nonprofit (pending) ·
            Sponsorships may be tax-deductible.
          </p>
          <div className="mt-8">
            <Link
              href="/conclave-2028"
              className="font-sans text-xs text-omega-gold hover:underline underline-offset-4"
            >
              Looking for Conclave 2028 sponsorship instead? View prospectus →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
