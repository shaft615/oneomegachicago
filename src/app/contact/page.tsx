import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact One Omega Foundation, Inc. — media, sponsorship, chapter, and volunteer inquiries.",
};

const ROUTING = [
  {
    type: "media",
    title: "Media",
    body: "Press, journalism, podcast bookings, and brand partnerships.",
  },
  {
    type: "sponsor",
    title: "Sponsorship",
    body: "Conclave 2028 sponsorship interest and prospectus requests.",
  },
  {
    type: "chapter",
    title: "Chapter",
    body: "Chapter leadership, Foundation coordination, council business.",
  },
  {
    type: "volunteer",
    title: "Volunteer",
    body: "Volunteer roles for Conclave 2028 and Foundation programming.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="How can the Foundation help?"
        description="Inquiries are routed to the appropriate Foundation officer based on type. Choose a category below — or select directly in the form."
      />

      <section className="section-omega bg-white">
        <div className="container-omega grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-5 space-y-3">
            <span className="eyebrow">Inquiry Types</span>
            <h2 className="heading-section mt-2">Routed to the right desk.</h2>
            <div className="divider-gold" />
            <ul className="mt-6 space-y-3">
              {ROUTING.map((r) => (
                <li key={r.type} className="card p-5">
                  <div className="font-display text-lg font-semibold text-omega-purple-dark">
                    {r.title}
                  </div>
                  <p className="mt-1 font-sans text-sm text-neutral-600">
                    {r.body}
                  </p>
                </li>
              ))}
            </ul>

            {/* Que Year's Eve sponsorship CTA */}
            <Link
              href="/que-years-eve"
              className="mt-6 block rounded-2xl bg-regalia-gradient text-white p-5 ring-1 ring-omega-gold/40 shadow-regalia hover:shadow-gilded transition group"
            >
              <span className="eyebrow text-omega-gold">
                NYE Sponsorship
              </span>
              <div className="mt-2 font-display text-lg font-semibold text-white">
                Que Year&rsquo;s Eve<sup>™</sup> 2026
              </div>
              <p className="mt-1 font-sans text-sm text-white/80">
                Four sponsorship tiers from $2,500 to $15,000. View prospectus &amp; reserve your level →
              </p>
            </Link>
          </aside>

          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="card p-8 font-sans text-sm text-neutral-500">
                  Loading form…
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
