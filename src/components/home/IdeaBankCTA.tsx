import Link from "next/link";
import { CONCLAVE_DATE_LABEL } from "@/lib/conclave";

/**
 * Conclave Idea Bank call-to-action — the same feature the Conclave site
 * carries on its home and welcome pages, wired to the same leadership
 * queue in the Conclave admin portal (see src/lib/ideas.ts).
 */
export default function IdeaBankCTA() {
  return (
    <section className="section-omega bg-white">
      <div className="container-omega">
        <div className="relative overflow-hidden rounded-3xl bg-omega-purple-dark p-10 sm:p-14 shadow-regalia">
          <div
            className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-omega-gold/20 blur-3xl"
            aria-hidden
          />
          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <span className="eyebrow !text-omega-gold">
                Conclave 2028 · Idea Bank
              </span>
              <h2 className="heading-section !text-white">
                Have an idea for Conclave 2028?
              </h2>
              <p className="font-sans text-base leading-relaxed text-white/85 max-w-2xl">
                Brothers, drop your ideas in the bank — programming, venues,
                logistics, anything. The Conclave leadership team reviews every
                submission as it plans the 86th Grand Conclave.
              </p>
              <div className="pt-2">
                <Link href="/ideas" className="btn-gold">
                  Submit an Idea
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white/10 backdrop-blur p-6 ring-1 ring-white/15">
                <div className="font-sans text-sm text-white/80">
                  Every idea goes straight to the leadership team&rsquo;s idea
                  bank for review.
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
