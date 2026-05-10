import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ConclaveCountdown from "@/components/home/ConclaveCountdown";
import SponsorForm from "./SponsorForm";
import {
  CONCLAVE_NUMBER,
  CONCLAVE_CITY,
  CONCLAVE_DATE_LABEL,
  CONCLAVE_DATE_LABEL_LONG,
} from "@/lib/conclave";

export const metadata: Metadata = {
  title: "Conclave 2028",
  description: `The ${CONCLAVE_NUMBER}th Grand Conclave of Omega Psi Phi Fraternity, Inc. — hosted in Chicago by One Omega Foundation.`,
};

const UPDATES = [
  {
    date: "Coming soon",
    title: "Host city announcement",
    body: "One Omega Foundation, Inc. confirmed as host entity for the 86th Grand Conclave under the DBA Chicago Conclave 2028.",
  },
  {
    date: "Coming soon",
    title: "Sponsor interest opens",
    body: "Founders' Circle, Cardinal Patron, and Chapter Champion tiers begin accepting expressions of interest.",
  },
  {
    date: "Coming soon",
    title: "Volunteer call-out",
    body: "Volunteer roles across hospitality, programming, and logistics will be published as the host committee organizes.",
  },
];

export default function Conclave2028Page() {
  return (
    <>
      <PageHeader
        eyebrow={`${CONCLAVE_NUMBER}th Grand Conclave · ${CONCLAVE_CITY} · ${CONCLAVE_DATE_LABEL}`}
        title="The 86th Grand Conclave returns to Chicago."
        description="Hosted by One Omega Foundation, Inc. under the DBA Chicago Conclave 2028 — the official host entity for the Fraternity's quadrennial gathering."
      />

      <section className="bg-omega-purple-dark text-white border-y border-omega-gold/30">
        <div className="container-omega py-6 sm:py-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          <div>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-omega-gold">
              Approved Dates
            </span>
            <p className="mt-1 font-display text-2xl sm:text-3xl font-semibold tracking-regalia text-white">
              {CONCLAVE_DATE_LABEL_LONG}
            </p>
          </div>
        </div>
      </section>

      <ConclaveCountdown />

      <section className="section-omega bg-white">
        <div className="container-omega grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">Sponsor Interest</span>
            <h2 className="heading-section mt-2">
              Express interest in sponsoring the 86th Grand Conclave.
            </h2>
            <div className="divider-gold mt-4" />
            <p className="mt-5 font-sans text-base leading-relaxed text-neutral-700">
              Sponsorship inquiries are reviewed by the Foundation&rsquo;s host
              committee. We will respond with the appropriate prospectus tier
              and follow-up call.
            </p>

            <div className="mt-8">
              <SponsorForm />
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-4">
            <div className="card p-6">
              <span className="eyebrow">Host Entity</span>
              <p className="mt-2 font-display text-xl font-semibold text-omega-purple-dark">
                One Omega Foundation, Inc.
              </p>
              <p className="mt-2 font-sans text-sm text-neutral-600">
                d/b/a Chicago Conclave 2028
              </p>
            </div>
            <div className="card p-6">
              <span className="eyebrow">Quick Links</span>
              <ul className="mt-3 space-y-2 font-sans text-sm">
                <li>
                  <Link href="/about" className="link-omega">
                    About the Foundation →
                  </Link>
                </li>
                <li>
                  <Link href="/chapters" className="link-omega">
                    Chapter directory →
                  </Link>
                </li>
                <li>
                  <Link href="/contact?type=media" className="link-omega">
                    Media inquiries →
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              href="/que-years-eve"
              className="block rounded-2xl bg-regalia-gradient text-white p-5 ring-1 ring-omega-gold/40 shadow-regalia hover:shadow-gilded transition"
            >
              <span className="eyebrow text-omega-gold">
                Also Available
              </span>
              <div className="mt-2 font-display text-lg font-semibold text-white">
                Que Year&rsquo;s Eve<sup>™</sup> 2026 Sponsorship
              </div>
              <p className="mt-1 font-sans text-sm text-white/80">
                The Foundation&rsquo;s NYE gala — four sponsorship tiers from $2.5K to $15K. View prospectus →
              </p>
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-omega bg-neutral-50">
        <div className="container-omega">
          <div className="max-w-2xl mb-10 space-y-3">
            <span className="eyebrow">Updates Feed</span>
            <h2 className="heading-section">Latest from the host committee.</h2>
            <div className="divider-gold" />
          </div>
          <ol className="space-y-5">
            {UPDATES.map((u) => (
              <li
                key={u.title}
                className="card p-6 sm:p-7 flex flex-col sm:flex-row gap-4 sm:items-start"
              >
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-omega-gold sm:w-32 shrink-0 pt-1">
                  {u.date}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-omega-purple-dark">
                    {u.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-700">
                    {u.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
