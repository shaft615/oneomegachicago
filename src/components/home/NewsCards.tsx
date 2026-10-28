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
    title: "One Omega Foundation awarded 501(c)(3) recognition",
    excerpt:
      "The IRS has granted the Foundation federal tax-exempt status under Section 501(c)(3). Contributions are now tax-deductible to the extent allowed by law.",
    date: "Coming soon",
    href: "/about",
  },
  {
    category: "Que Year's Eve",
    title: "Que Year's Eve\u2122 2026 sponsorship prospectus now available",
    excerpt:
      "Four sponsorship tiers from $2,500 to $15,000 for the Foundation's New Year's Eve gala at the Marriott Marquis McCormick Place.",
    date: "Coming soon",
    href: "/que-years-eve",
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
