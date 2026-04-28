"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";

interface EventItem {
  title: string;
  category: string;
  dateLabel: string;
  date: string;
  location: string;
  status: "upcoming" | "past";
  body: string;
}

const EVENTS: EventItem[] = [
  {
    title: "Council of Basilei Quarterly Convening",
    category: "Foundation",
    dateLabel: "Quarterly · TBA",
    date: "TBA",
    location: "Chicago, IL",
    status: "upcoming",
    body: "Joint session of all thirteen chapter leaders, hosted rotating across Chicagoland.",
  },
  {
    title: "Chicago Conclave 2028 — Sponsor Briefing",
    category: "Conclave 2028",
    dateLabel: "TBA",
    date: "TBA",
    location: "Chicago, IL",
    status: "upcoming",
    body: "Host committee briefing for prospective sponsors — Founders' Circle and Cardinal Patron tiers.",
  },
  {
    title: "Talent Hunt Citywide Showcase",
    category: "Scholarship",
    dateLabel: "Spring 2027 (planned)",
    date: "TBA",
    location: "Chicago, IL",
    status: "upcoming",
    body: "Coordinated citywide Talent Hunt program drawing high school finalists from across Chicagoland chapters.",
  },
  {
    title: "Foundation Inaugural Reception",
    category: "Foundation",
    dateLabel: "Past · TBA",
    date: "TBA",
    location: "Chicago, IL",
    status: "past",
    body: "Inaugural gathering announcing One Omega Foundation, Inc. as the coordinating entity for thirteen chapters.",
  },
];

export default function EventsPage() {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const visible = EVENTS.filter((e) => e.status === filter);

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Foundation programming pipeline."
        description="Coordinated events spanning the thirteen chapters — from quarterly leadership convenings to the road to the 86th Grand Conclave."
      />

      <section className="section-omega bg-white">
        <div className="container-omega">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div
              role="tablist"
              aria-label="Event filter"
              className="inline-flex p-1 rounded-full bg-neutral-100"
            >
              {(["upcoming", "past"] as const).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={filter === key}
                  onClick={() => setFilter(key)}
                  className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition ${
                    filter === key
                      ? "bg-omega-purple text-white shadow-regalia"
                      : "text-omega-purple-dark hover:bg-omega-purple/10"
                  }`}
                >
                  {key === "upcoming" ? "Upcoming" : "Past Archive"}
                </button>
              ))}
            </div>
            <span className="font-sans text-sm text-neutral-500">
              {visible.length} {visible.length === 1 ? "event" : "events"}
            </span>
          </div>

          {visible.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="font-sans text-neutral-600">
                No {filter} events to display yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {visible.map((e) => (
                <article key={e.title} className="card-hover p-6 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">{e.category}</span>
                    <span className="font-sans text-xs uppercase tracking-[0.18em] text-neutral-500">
                      {e.dateLabel}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-omega-purple-dark">
                    {e.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-neutral-500">
                    {e.location}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-700 flex-1">
                    {e.body}
                  </p>
                  <div className="mt-5">
                    <span className="link-omega text-sm font-medium">
                      Details coming soon →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
