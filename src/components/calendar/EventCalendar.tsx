"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  events as allEvents,
  groupByDay,
  isoDateKey,
  sortByStart,
  type Event,
} from "@/data/events";

type View = "month" | "agenda";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function EventCalendar() {
  const [view, setView] = useState<View>("month");
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [agendaFilter, setAgendaFilter] = useState<"upcoming" | "past">(
    "upcoming"
  );

  const eventsByDay = useMemo(() => groupByDay(allEvents), []);

  const monthLabel = `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`;

  return (
    <div className="space-y-6">
      {/* Header / view toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Calendar view"
          className="inline-flex p-1 rounded-full bg-white shadow-chapter ring-1 ring-omega-purple/10"
        >
          {(["month", "agenda"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition ${
                view === v
                  ? "bg-omega-purple text-white shadow-regalia"
                  : "text-omega-purple-dark hover:bg-omega-purple/10"
              }`}
            >
              {v === "month" ? "Month" : "Agenda"}
            </button>
          ))}
        </div>

        <Link
          href="/events/submit"
          className="btn-gold text-omega-purple-dark"
        >
          Submit Your Chapter Event →
        </Link>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-sans text-neutral-600">
        <LegendDot className="bg-omega-purple-dark" /> Foundation
        <LegendDot className="bg-omega-purple" /> Chapter
        <LegendDot className="bg-omega-gold" /> Featured
        <span className="text-neutral-400">·</span>
        <span className="text-neutral-400">Click any event to see details</span>
      </div>

      {view === "month" ? (
        <MonthView
          cursor={cursor}
          setCursor={setCursor}
          today={today}
          eventsByDay={eventsByDay}
          monthLabel={monthLabel}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
      ) : (
        <AgendaView
          today={today}
          filter={agendaFilter}
          setFilter={setAgendaFilter}
        />
      )}
    </div>
  );
}

/* -------------------- Month View -------------------- */

function MonthView({
  cursor,
  setCursor,
  today,
  eventsByDay,
  monthLabel,
  selectedDay,
  setSelectedDay,
}: {
  cursor: Date;
  setCursor: (d: Date) => void;
  today: Date;
  eventsByDay: Map<string, Event[]>;
  monthLabel: string;
  selectedDay: string | null;
  setSelectedDay: (k: string | null) => void;
}) {
  const cells = useMemo(() => buildMonthCells(cursor), [cursor]);
  const todayKey = isoDateKey(today);
  const selectedEvents = selectedDay ? eventsByDay.get(selectedDay) ?? [] : [];

  function shift(months: number) {
    const next = new Date(cursor.getFullYear(), cursor.getMonth() + months, 1);
    setCursor(next);
    setSelectedDay(null);
  }

  return (
    <>
      {/* Month nav */}
      <div className="flex items-center justify-between gap-4 rounded-2xl bg-white shadow-chapter ring-1 ring-omega-purple/10 px-4 py-3">
        <button
          onClick={() => shift(-1)}
          className="btn-ghost px-3 py-2"
          aria-label="Previous month"
        >
          ← Prev
        </button>
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-omega-purple-dark tracking-regalia">
          {monthLabel}
        </h3>
        <button
          onClick={() => shift(1)}
          className="btn-ghost px-3 py-2"
          aria-label="Next month"
        >
          Next →
        </button>
      </div>

      {/* Day-of-week header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-omega-purple/70 py-2"
          >
            <span className="hidden sm:inline">{d}</span>
            <span className="sm:hidden">{d.slice(0, 1)}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {cells.map((cell) => {
          const key = cell.key;
          const dayEvents = eventsByDay.get(key) ?? [];
          const isToday = key === todayKey;
          const isSelected = key === selectedDay;
          const isOtherMonth = !cell.inMonth;

          return (
            <button
              key={key}
              onClick={() =>
                dayEvents.length > 0
                  ? setSelectedDay(isSelected ? null : key)
                  : null
              }
              disabled={dayEvents.length === 0}
              className={`min-h-20 sm:min-h-24 rounded-xl p-1.5 sm:p-2 text-left transition ring-1 ${
                isOtherMonth
                  ? "bg-neutral-50/50 ring-neutral-200/50"
                  : "bg-white ring-omega-purple/10"
              } ${
                isSelected
                  ? "ring-2 ring-omega-purple shadow-regalia"
                  : dayEvents.length > 0
                  ? "hover:ring-omega-purple/40 hover:shadow-chapter cursor-pointer"
                  : "cursor-default"
              }`}
              aria-label={`${cell.date.toDateString()}${
                dayEvents.length ? ` — ${dayEvents.length} event(s)` : ""
              }`}
            >
              <div
                className={`flex items-center justify-between mb-1 ${
                  isOtherMonth ? "opacity-40" : ""
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full font-sans text-xs font-semibold ${
                    isToday
                      ? "bg-omega-gold text-omega-purple-dark"
                      : "text-neutral-700"
                  }`}
                >
                  {cell.date.getDate()}
                </span>
                {dayEvents.length > 2 && (
                  <span className="font-sans text-[10px] text-omega-purple font-semibold">
                    +{dayEvents.length - 2}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((e) => (
                  <EventPill key={e.id} event={e} />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day details */}
      {selectedDay && selectedEvents.length > 0 && (
        <div className="rounded-2xl bg-white shadow-regalia ring-1 ring-omega-purple/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-display text-lg font-semibold text-omega-purple-dark">
              {formatLongDate(new Date(selectedDay + "T12:00:00"))}
            </h4>
            <button
              onClick={() => setSelectedDay(null)}
              className="font-sans text-xs uppercase tracking-[0.18em] text-omega-purple hover:text-omega-purple-dark"
              aria-label="Close day details"
            >
              Close ✕
            </button>
          </div>
          <div className="space-y-4">
            {selectedEvents.map((e) => (
              <EventDetailRow key={e.id} event={e} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* -------------------- Agenda View -------------------- */

function AgendaView({
  today,
  filter,
  setFilter,
}: {
  today: Date;
  filter: "upcoming" | "past";
  setFilter: (f: "upcoming" | "past") => void;
}) {
  const todayMs = today.getTime();
  const filtered = useMemo(() => {
    const sorted = sortByStart(allEvents);
    return sorted.filter((e) => {
      const t = new Date(e.start).getTime();
      return filter === "upcoming" ? t >= todayMs - 86_400_000 : t < todayMs;
    });
  }, [filter, todayMs]);

  // Group by month
  const groups = useMemo(() => {
    const out = new Map<string, Event[]>();
    for (const e of filtered) {
      const d = new Date(e.start);
      const k = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
      const arr = out.get(k) ?? [];
      arr.push(e);
      out.set(k, arr);
    }
    return out;
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div
          role="tablist"
          className="inline-flex p-1 rounded-full bg-white shadow-chapter ring-1 ring-omega-purple/10"
        >
          {(["upcoming", "past"] as const).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-sans text-sm font-medium transition ${
                filter === f
                  ? "bg-omega-purple text-white shadow-regalia"
                  : "text-omega-purple-dark hover:bg-omega-purple/10"
              }`}
            >
              {f === "upcoming" ? "Upcoming" : "Past"}
            </button>
          ))}
        </div>
        <span className="font-sans text-sm text-neutral-500">
          {filtered.length} {filtered.length === 1 ? "event" : "events"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white shadow-chapter ring-1 ring-omega-purple/10 p-10 text-center">
          <p className="font-sans text-neutral-600">
            No {filter} events to display.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Array.from(groups.entries()).map(([k, items]) => {
            const [yyyy, mm] = k.split("-");
            const monthLabel = `${MONTHS[parseInt(mm)]} ${yyyy}`;
            return (
              <section key={k}>
                <h4 className="font-display text-lg font-semibold text-omega-purple-dark tracking-regalia mb-4">
                  {monthLabel}
                </h4>
                <div className="space-y-3">
                  {items.map((e) => (
                    <EventDetailRow key={e.id} event={e} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------- Shared bits -------------------- */

function EventPill({ event }: { event: Event }) {
  const isFoundation = !event.hostChapter;
  const bg = event.featured
    ? "bg-omega-gold text-omega-purple-dark"
    : isFoundation
    ? "bg-omega-purple-dark text-white"
    : "bg-omega-purple text-white";

  return (
    <span
      className={`block truncate rounded-md px-1.5 py-0.5 text-[10px] sm:text-[11px] font-sans font-medium ${bg}`}
      title={event.title}
    >
      {event.hostChapter && (
        <span className="font-semibold mr-1">{event.hostChapter}</span>
      )}
      {event.title}
    </span>
  );
}

function EventDetailRow({ event }: { event: Event }) {
  const isFoundation = !event.hostChapter;
  return (
    <article className="rounded-xl ring-1 ring-omega-purple/10 bg-white p-5 hover:shadow-chapter transition">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
              isFoundation
                ? "bg-omega-purple-dark text-white"
                : "bg-omega-purple text-white"
            }`}
          >
            {event.hostChapter ?? "Foundation"}
          </span>
          {event.featured && (
            <span className="inline-flex items-center rounded-full bg-omega-gold text-omega-purple-dark px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
              Featured
            </span>
          )}
          {event.recurrence && (
            <span className="inline-flex items-center rounded-full ring-1 ring-omega-purple/30 text-omega-purple-dark px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
              ↻ {event.recurrence}
            </span>
          )}
        </div>
        <span className="font-sans text-xs uppercase tracking-[0.18em] text-omega-gold">
          {event.category}
        </span>
      </div>
      <h5 className="mt-3 font-display text-lg font-semibold text-omega-purple-dark">
        {event.title}
      </h5>
      <dl className="mt-2 grid sm:grid-cols-3 gap-2 font-sans text-sm text-neutral-700">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.18em] text-omega-purple/70">
            Date
          </dt>
          <dd>{event.dateLabel}</dd>
        </div>
        {event.timeLabel && (
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-omega-purple/70">
              Time
            </dt>
            <dd>{event.timeLabel}</dd>
          </div>
        )}
        <div>
          <dt className="text-[10px] uppercase tracking-[0.18em] text-omega-purple/70">
            Location
          </dt>
          <dd>{event.location}</dd>
        </div>
      </dl>
      {event.description[0] && (
        <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600">
          {event.description[0]}
        </p>
      )}
      {event.link && (
        <div className="mt-3">
          <Link
            href={event.link}
            target="_blank"
            rel="noreferrer"
            className="link-omega text-sm font-medium"
          >
            More info / register →
          </Link>
        </div>
      )}
    </article>
  );
}

function LegendDot({ className }: { className: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${className}`} />
    </span>
  );
}

/* -------------------- Date helpers -------------------- */

function buildMonthCells(cursor: Date) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sun

  // Start cell: Sunday on or before the 1st
  const start = new Date(year, month, 1 - startWeekday);

  const cells: { date: Date; key: string; inMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    cells.push({
      date: d,
      key: isoDateKey(d),
      inMonth: d.getMonth() === month,
    });
  }
  return cells;
}

function formatLongDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
