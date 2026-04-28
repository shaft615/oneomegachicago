import Link from "next/link";

interface NewsItem {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
}

const NEWS: NewsItem[] = [
  {
    category: "Foundation",
    title: "One Omega Foundation files for 501(c)(3) recognition",
    excerpt:
      "The Foundation has submitted its IRS Form 1023 and will operate under expedited review while determination is pending.",
    date: "Coming soon",
    href: "/about",
  },
  {
    category: "Conclave 2028",
    title: "Sponsor interest opens for the 86th Grand Conclave",
    excerpt:
      "Founders' Circle, Cardinal Patron, and Chapter Champion tiers are now accepting expressions of interest.",
    date: "Coming soon",
    href: "/conclave-2028",
  },
  {
    category: "Chapters",
    title: "Thirteen Chicagoland chapters convene quarterly",
    excerpt:
      "The Council of Basilei sets shared programming priorities each quarter through the Foundation.",
    date: "Coming soon",
    href: "/chapters",
  },
];

export default function NewsCards() {
  return (
    <section className="section-omega bg-neutral-50">
      <div className="container-omega">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="eyebrow">News & Updates</span>
            <h2 className="heading-section">From the Foundation desk.</h2>
            <div className="divider-gold" />
          </div>
          <Link href="/events" className="btn-outline self-start lg:self-auto">
            All Updates →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {NEWS.map((n) => (
            <Link
              key={n.title}
              href={n.href}
              className="card-hover group p-6 flex flex-col h-full"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">{n.category}</span>
                <span className="font-sans text-xs text-neutral-400">
                  {n.date}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-omega-purple-dark group-hover:text-omega-purple transition-colors">
                {n.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600 flex-1">
                {n.excerpt}
              </p>
              <span className="mt-5 link-omega text-sm font-medium">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
