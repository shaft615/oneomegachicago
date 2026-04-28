import Link from "next/link";
import { chapters, TOTAL_CHAPTERS } from "@/data/chapters";
import ChapterCard from "@/components/ChapterCard";

export default function ChapterGrid() {
  return (
    <section className="section-omega bg-neutral-50">
      <div className="container-omega">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10">
          <div className="space-y-3 max-w-2xl">
            <span className="eyebrow">The Chicagoland Thirteen</span>
            <h2 className="heading-section">
              {TOTAL_CHAPTERS} chapters serving every corner of Chicago.
            </h2>
            <div className="divider-gold" />
            <p className="font-sans text-base leading-relaxed text-neutral-700">
              Graduate and undergraduate chapters of Omega Psi Phi Fraternity,
              Inc., active across the city, suburbs, and surrounding
              universities — coordinated through One Omega Foundation.
            </p>
          </div>
          <Link href="/chapters" className="btn-outline self-start lg:self-auto">
            Full Directory →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </div>
    </section>
  );
}
