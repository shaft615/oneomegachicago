import Link from "next/link";
import { CONCLAVE_DATE_LABEL } from "@/lib/conclave";

const COMMITTEES_URL = "https://portal.oneomegachicago.org/committees";

export default function CommitteeCTA() {
  return (
    <section className="section-omega bg-white">
      <div className="container-omega">
        <div className="relative overflow-hidden rounded-3xl bg-omega-purple-dark p-10 sm:p-14 shadow-regalia">
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-omega-gold/20 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />

          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="eyebrow !text-omega-gold">
                86th Grand Conclave · Now Recruiting
              </span>
              <h2 className="heading-section !text-white">
                Serve on a Conclave committee.
              </h2>
              <p className="font-sans text-base leading-relaxed text-white/85 max-w-2xl">
                Brothers, Quettes, and Friends of Omega — the host committee for
                the 86th Grand Conclave is forming now. Review the committees,
                from Registration and Security to STEM, Step Show, and
                Entertainment, and tell us where you&apos;d like to serve. The
                Grand Marshal reviews every request.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={COMMITTEES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Browse Committees &amp; Express Interest
                </a>
                <Link
                  href="/conclave-2028"
                  className="btn border border-white/40 text-white hover:bg-white hover:text-omega-purple-dark"
                >
                  About the Conclave
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white/10 backdrop-blur p-6 ring-1 ring-white/15">
                <div className="font-display text-5xl font-bold text-omega-gold">
                  23
                </div>
                <div className="font-sans text-sm text-white/80 mt-1">
                  committees recruiting Brothers, Quettes &amp; Friends of Omega
                </div>
                <div className="mt-4 h-px bg-white/15" />
                <div className="font-sans text-sm text-white/70 mt-4">
                  {CONCLAVE_DATE_LABEL} · Chicago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
