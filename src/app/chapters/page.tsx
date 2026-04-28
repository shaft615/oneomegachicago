import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ChapterCard from "@/components/ChapterCard";
import { chapters, TOTAL_CHAPTERS } from "@/data/chapters";

export const metadata: Metadata = {
  title: "Chapters",
  description:
    "Directory of the thirteen Chicagoland chapters of Omega Psi Phi Fraternity, Inc., coordinated by One Omega Foundation.",
};

export default function ChaptersPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Chicagoland Thirteen"
        title="Thirteen chapters. One coordinated voice."
        description="Chapters of Omega Psi Phi Fraternity, Inc., active across Chicago, the suburbs, Northwest Indiana, and surrounding communities — coordinated through One Omega Foundation."
      />

      <section className="section-omega bg-white">
        <div className="container-omega">
          <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
            <div>
              <span className="eyebrow">Directory</span>
              <h2 className="heading-section mt-2">All Chapters</h2>
              <div className="divider-gold mt-3" />
            </div>
            <span className="font-sans text-sm text-neutral-500">
              {TOTAL_CHAPTERS} chapters
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((c) => (
              <ChapterCard key={c.id} chapter={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-12">
        <div className="container-omega text-center">
          <p className="font-sans text-sm text-neutral-600">
            Coordinated by{" "}
            <span className="font-semibold text-omega-purple-dark">
              One Omega Foundation, Inc.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
