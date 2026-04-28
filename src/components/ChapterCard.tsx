import Link from "next/link";
import type { Chapter } from "@/data/chapters";

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  const isPlaceholder = chapter.placeholder;
  const typeLabel =
    chapter.type === "graduate" ? "Graduate Chapter" : "Undergraduate Chapter";

  return (
    <article
      className={`card-hover relative overflow-hidden p-6 flex flex-col h-full ${
        isPlaceholder ? "opacity-90" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-14 w-14 place-items-center rounded-2xl font-display text-lg font-semibold tracking-regalia shadow-chapter ${
            isPlaceholder
              ? "bg-neutral-100 text-neutral-400 ring-1 ring-neutral-200"
              : "bg-regalia-gradient text-white"
          }`}
          aria-hidden
        >
          {chapter.letters}
        </div>
        <span
          className={`eyebrow ${
            isPlaceholder ? "text-neutral-400" : "text-omega-gold"
          }`}
        >
          {typeLabel}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold text-omega-purple-dark">
        {chapter.name}
      </h3>
      <p className="mt-1 font-sans text-sm text-neutral-500">{chapter.area}</p>

      <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-700 flex-1">
        {isPlaceholder
          ? "Chapter details coming soon. The Foundation is finalizing public-facing information for this chapter."
          : chapter.description ?? ""}
      </p>

      <div className="mt-6 flex items-center justify-between">
        {chapter.chartered ? (
          <span className="font-sans text-xs uppercase tracking-[0.18em] text-neutral-500">
            Chartered {chapter.chartered}
          </span>
        ) : (
          <span className="font-sans text-xs uppercase tracking-[0.18em] text-neutral-400">
            {isPlaceholder ? "TBA" : "Est. Chicagoland"}
          </span>
        )}
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

      <span className="absolute inset-x-0 bottom-0 h-1 bg-gilded-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
    </article>
  );
}
