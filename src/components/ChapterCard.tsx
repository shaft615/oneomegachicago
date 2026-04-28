import Link from "next/link";
import type { Chapter } from "@/data/chapters";

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const designationSize =
    chapter.designation.length >= 3 ? "text-base" : "text-lg";

  return (
    <article className="card-hover relative overflow-hidden p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-14 min-w-14 px-3 place-items-center rounded-2xl bg-regalia-gradient text-white font-display ${designationSize} font-semibold tracking-regalia shadow-chapter`}
          aria-hidden
        >
          {chapter.designation}
        </div>
        <span className="eyebrow text-omega-gold text-right">
          {chapter.area}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold text-omega-purple-dark">
        {chapter.name}
      </h3>

      <div className="mt-4 flex-1">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-omega-purple/70">
          Basileus
        </span>
        <p className="mt-1 font-sans text-sm text-neutral-700">
          {chapter.basileus}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-omega-purple/10 flex items-center justify-between">
        <span className="font-sans text-xs uppercase tracking-[0.18em] text-neutral-400">
          ΩΨΦ Chapter
        </span>
        {chapter.website ? (
          <Link
            href={chapter.website}
            className="link-omega text-sm font-medium"
            target="_blank"
            rel="noreferrer"
          >
            Visit →
          </Link>
        ) : (
          <span className="font-sans text-sm text-neutral-400">—</span>
        )}
      </div>
    </article>
  );
}
