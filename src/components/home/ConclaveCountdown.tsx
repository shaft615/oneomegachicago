"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONCLAVE_DATE,
  CONCLAVE_NUMBER,
  CONCLAVE_CITY,
  CONCLAVE_DATE_LABEL,
} from "@/lib/conclave";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function diff(target: Date): Remaining {
  const now = Date.now();
  const ms = Math.max(0, target.getTime() - now);
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const minutes = Math.floor((ms % 3_600_000) / 60_000);
  const seconds = Math.floor((ms % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function ConclaveCountdown() {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState<Remaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    setRemaining(diff(CONCLAVE_DATE));
    const id = setInterval(() => setRemaining(diff(CONCLAVE_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const cells: { label: string; value: number }[] = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <section className="section-omega bg-omega-purple-dark text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, #B7A57A 0, transparent 35%), radial-gradient(circle at 70% 50%, #6D2077 0, transparent 35%)",
        }}
        aria-hidden
      />

      <div className="container-omega relative grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 space-y-5">
          <span className="eyebrow text-omega-gold">The Countdown</span>
          <h2 className="heading-section !text-white">
            {CONCLAVE_NUMBER}th Grand Conclave · {CONCLAVE_CITY}
          </h2>
          <p className="font-display text-xl text-omega-gold tracking-regalia">
            {CONCLAVE_DATE_LABEL}
          </p>
          <div className="divider-gold" />
          <p className="font-sans text-white/85 leading-relaxed">
            Every two years, the brothers of Omega Psi Phi convene for the
            Grand Conclave. In 2028, that gathering returns to Chicago after
            79 years — hosted by One Omega Foundation, Inc.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/conclave-2028" className="btn-gold">
              Conclave Hub
            </Link>
            <Link
              href="/contact?type=sponsor"
              className="btn border border-white/40 text-white hover:bg-white hover:text-omega-purple-dark"
            >
              Become a Sponsor
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cells.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 p-6 text-center shadow-regalia"
                aria-label={`${c.value} ${c.label.toLowerCase()} remaining`}
              >
                <div className="font-display text-5xl sm:text-6xl font-semibold text-omega-gold tabular-nums leading-none">
                  {mounted ? String(c.value).padStart(2, "0") : "--"}
                </div>
                <div className="mt-3 font-sans text-xs uppercase tracking-[0.22em] text-white/70">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-sans text-xs text-white/60">
            Counting down to opening day · {CONCLAVE_DATE_LABEL}
          </p>
        </div>
      </div>
    </section>
  );
}
