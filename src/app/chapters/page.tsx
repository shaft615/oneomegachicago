import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ChapterCard from "@/components/ChapterCard";
import { chapters, getChaptersByType } from "@/data/chapters";

export const metadata: Metadata = {
  title: "Chapters",
  description:
    "Directory of the thirteen Chicagoland chapters of Omega Psi Phi Fraternity, Inc., coordinated by One Omega Foundation.",
};

export default function ChaptersPage() {
  const graduate = getChaptersByType("graduate");
  const undergraduate = getChaptersByType("undergraduate");

  return (
    <>
      <PageHeader
        eyebrow="The Chicagoland Thirteen"
        title="Thirteen chapters. One coordinated voice."
        description="Graduate and undergraduate chapters of Omega Psi Phi Fraternity, Inc., active across Chicago, the suburbs, and surrounding universities."
      />

      <section className="section-omega bg-white">
        <div className="container-omega space-y-16">
          <div>
            <div className="flex items-end justify-between mb-8 gap-4">
              <div>
                <span className="eyebrow">Graduate Chapters</span>
                <h2 className="heading-section mt-2">Graduate Chapters</h2>
              </div>
              <span className="font-sans text-sm text-neutral-500">
                {graduate.length} chapters
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {graduate.map((c) => (
                <ChapterCard key={c.id} chapter={c} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between mb-8 gap-4">
              <div>
                <span className="eyebrow">Undergraduate Chapters</span>
                <h2 className="heading-section mt-2">
                  Undergraduate Chapters
                </h2>
              </div>
              <span className="font-sans text-sm text-neutral-500">
                {undergraduate.length} chapters
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {undergraduate.map((c) => (
                <ChapterCard key={c.id} chapter={c} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-12">
        <div className="container-omega text-center">
          <p className="font-sans text-sm text-neutral-600">
            Total chapters coordinated by the Foundation:{" "}
            <span className="font-semibold text-omega-purple-dark">
              {chapters.length}
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
