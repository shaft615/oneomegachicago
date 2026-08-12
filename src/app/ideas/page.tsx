import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import IdeaBankForm from "./IdeaBankForm";
import { CONCLAVE_CITY, CONCLAVE_DATE_LABEL, CONCLAVE_NUMBER } from "@/lib/conclave";

export const metadata: Metadata = {
  title: "Conclave Idea Bank",
  description: `Brothers: share your ideas for the ${CONCLAVE_NUMBER}th Grand Conclave. Every submission goes to the Conclave leadership team's idea bank for review.`,
};

export default function IdeasPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${CONCLAVE_NUMBER}th Grand Conclave · ${CONCLAVE_CITY} · ${CONCLAVE_DATE_LABEL}`}
        title="Share your ideas for Conclave 2028."
        description="Brothers, the Conclave leadership team wants your ideas — programming, venues, logistics, technology, anything that would make Chicago 2028 the best Conclave yet. Every submission goes straight to the team's idea bank for review."
      />
      <section className="section-omega bg-white">
        <div className="container-omega">
          <div className="max-w-2xl">
            <IdeaBankForm />
          </div>
        </div>
      </section>
    </>
  );
}
