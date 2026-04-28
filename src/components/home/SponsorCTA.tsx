import Link from "next/link";

const TIERS = [
  { name: "Founders' Circle", note: "Premier visibility · 2028 host gala" },
  { name: "Cardinal Patron", note: "Citywide brand presence" },
  { name: "Chapter Champion", note: "Direct chapter partnership" },
];

export default function SponsorCTA() {
  return (
    <section className="section-omega bg-white">
      <div className="container-omega">
        <div className="relative overflow-hidden rounded-3xl bg-gilded-gradient p-10 sm:p-14 shadow-gilded">
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-omega-purple/15 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-white/30 blur-3xl"
            aria-hidden
          />

          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="eyebrow !text-omega-purple-dark">
                Sponsor the Conclave
              </span>
              <h2 className="heading-section">
                Align your brand with thousands of Omega men converging on
                Chicago in 2028.
              </h2>
              <p className="font-sans text-base leading-relaxed text-omega-purple-dark/85 max-w-2xl">
                The Grand Conclave is the largest gathering of Omega Psi Phi
                Fraternity, Inc. — drawing leaders in business, government, and
                culture from every state and several countries. Foundation-led
                sponsorship packages are now open.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/contact?type=sponsor"
                  className="btn bg-omega-purple-dark text-white hover:bg-omega-purple"
                >
                  Request Sponsor Deck
                </Link>
                <Link
                  href="/conclave-2028"
                  className="btn border border-omega-purple-dark/40 text-omega-purple-dark hover:bg-omega-purple-dark hover:text-white"
                >
                  Conclave Details
                </Link>
              </div>
            </div>

            <ul className="lg:col-span-5 space-y-3">
              {TIERS.map((t) => (
                <li
                  key={t.name}
                  className="rounded-xl bg-white/85 backdrop-blur p-4 ring-1 ring-omega-purple-dark/10"
                >
                  <div className="font-display text-lg font-semibold text-omega-purple-dark">
                    {t.name}
                  </div>
                  <div className="font-sans text-sm text-neutral-600">
                    {t.note}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
