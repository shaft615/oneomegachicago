import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import EventSubmissionForm from "./EventSubmissionForm";

export const metadata: Metadata = {
  title: "Submit an Event",
  description:
    "Chicagoland Omega Psi Phi chapters — submit an event for inclusion on the One Omega Foundation calendar.",
};

export default function SubmitEventPage() {
  return (
    <>
      <PageHeader
        eyebrow="Chapter Event Submission"
        title="Submit an event for the calendar."
        description="Chapter Basilei and event leads — share your upcoming event and the Foundation will add it to the public calendar after review."
      />

      <section className="section-omega bg-white">
        <div className="container-omega max-w-4xl">
          <div className="rounded-2xl bg-omega-purple/5 ring-1 ring-omega-purple/10 p-6 mb-8">
            <h2 className="font-display text-lg font-semibold text-omega-purple-dark">
              How this works
            </h2>
            <ol className="mt-3 space-y-2 font-sans text-sm leading-relaxed text-neutral-700 list-decimal list-inside">
              <li>You complete this form and submit.</li>
              <li>
                The Foundation events team reviews and confirms the listing
                (typically within a few business days).
              </li>
              <li>
                Once confirmed, your event appears on the public{" "}
                <Link href="/events" className="link-omega font-semibold">
                  Events calendar
                </Link>{" "}
                with your chapter&rsquo;s designation.
              </li>
              <li>
                You&rsquo;ll receive an email confirmation when it&rsquo;s
                live.
              </li>
            </ol>
            <p className="mt-3 font-sans text-xs text-neutral-500 italic">
              Need to update or cancel an event already on the calendar? Email{" "}
              <a
                href="mailto:events@oneomegachicago.org"
                className="link-omega"
              >
                events@oneomegachicago.org
              </a>
              .
            </p>
          </div>

          <EventSubmissionForm />
        </div>
      </section>
    </>
  );
}
