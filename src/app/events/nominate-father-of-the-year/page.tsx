import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import NominationForm from "./NominationForm";

export const metadata: Metadata = {
  title: "Nominate Father of the Year",
  description:
    "Honor a father, grandfather, or father figure with a Father of the Year nomination — recognized at the 3rd Annual Father's Day CookOwt & Black Men's Wellness Day, June 20, 2026.",
};

export default function NominateFatherOfTheYearPage() {
  return (
    <>
      <PageHeader
        eyebrow="Father's Day · 3rd Annual CookOwt"
        title="Nominate the Father of the Year."
        description="Recognize a father, grandfather, or father figure who has shaped your life and your community. Honorees will be recognized at the 3rd Annual Father's Day CookOwt & Black Men's Wellness Day on Saturday, June 20, 2026 at Jackson Park."
      />

      <section className="section-omega bg-white">
        <div className="container-omega max-w-3xl">
          <div className="rounded-2xl bg-omega-purple/5 ring-1 ring-omega-purple/10 p-6 mb-8">
            <h2 className="font-display text-lg font-semibold text-omega-purple-dark">
              How it works
            </h2>
            <ol className="mt-3 space-y-2 font-sans text-sm leading-relaxed text-neutral-700 list-decimal list-inside">
              <li>Complete the nomination form below.</li>
              <li>
                The Father&rsquo;s Day Honors Committee reviews all
                nominations.
              </li>
              <li>
                Honorees and their families are notified ahead of the event.
              </li>
              <li>
                Recognition takes place during the CookOwt program at Jackson
                Park on Saturday, June 20.
              </li>
            </ol>
            <p className="mt-4 font-sans text-xs text-neutral-500 italic">
              Questions? Email{" "}
              <a
                href="mailto:events@oneomegachicago.org"
                className="link-omega"
              >
                events@oneomegachicago.org
              </a>
              .
            </p>
          </div>

          <NominationForm />

          <p className="mt-8 text-center font-sans text-sm text-neutral-600">
            <Link href="/events" className="link-omega">
              ← Back to Events
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
