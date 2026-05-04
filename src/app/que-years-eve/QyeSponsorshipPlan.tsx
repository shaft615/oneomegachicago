"use client";

import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgorjngd";

type TierKey = "omega" | "purple" | "gold" | "bronze";
type Status = "idle" | "submitting" | "success" | "error";

interface Tier {
  key: TierKey;
  name: string;
  role: string;
  price: number;
  blurb: string;
  benefits: string[];
  /** Tailwind classes for the card and selected state */
  card: string;
  badge: string;
  emphasis?: boolean;
}

const TIERS: Tier[] = [
  {
    key: "omega",
    name: "Omega Level",
    role: "Presenting Sponsor",
    price: 15000,
    blurb: "Premier presenting sponsorship with full activation rights.",
    emphasis: true,
    card: "bg-regalia-gradient text-omega-gold ring-omega-gold/40",
    badge: "bg-omega-purple-dark text-omega-gold ring-1 ring-omega-gold/60",
    benefits: [
      "Exclusive presenting sponsorship designation",
      "Premier LED wall placement + custom 60-second brand video",
      "Logo on ALL marketing collateral, digital assets & promotions",
      "Branded champagne toast at midnight",
      "Exclusive VIP lounge naming rights",
      "Ten (10) VIP tickets with reserved premium seating",
      "Stage opportunity to address 1,000+ guests",
      "Featured profile on event website + social media",
      "Executive briefing with Foundation leadership",
      "Presenting donor status in community impact report",
      "Full ROI report with engagement metrics",
    ],
  },
  {
    key: "purple",
    name: "Purple Level",
    role: "Prestige Partner",
    price: 10000,
    blurb: "Prestige-tier visibility with strong on-site activation.",
    card: "bg-omega-purple text-omega-gold ring-omega-purple-dark/40",
    badge: "bg-omega-purple-dark text-omega-gold ring-1 ring-omega-gold/60",
    benefits: [
      "Premier LED wall placement + custom 30-second brand video",
      "Logo on select marketing collateral & digital assets",
      "Branded VIP lounge signage or signature moment",
      "Eight (8) VIP tickets with reserved seating",
      "On-site brand activation opportunity",
      "Highlighted press release + media distribution",
      "Featured mention across social media channels",
      "Recognition as major donor in nonprofit impact report",
    ],
  },
  {
    key: "gold",
    name: "Gold Level",
    role: "Impact Partner",
    price: 5000,
    blurb: "Strategic exposure with flexible ticketing options.",
    card: "bg-gilded-gradient text-omega-purple-dark ring-omega-gold",
    badge: "bg-omega-purple-dark text-omega-gold",
    benefits: [
      "10-image loop or 15-second brand video on LED wall",
      "Logo on strategic event signage at high-traffic locations",
      "Four (4) VIP tickets or six (6) general admission tickets",
      "On-site brand activation opportunity",
      "Mention in event press release",
      "Recognition in event program",
      "Digital badge for your marketing materials",
      "Certificate of partnership and appreciation",
    ],
  },
  {
    key: "bronze",
    name: "Bronze Level",
    role: "Community Partner",
    price: 2500,
    blurb: "Community-tier visibility for emerging supporters.",
    card: "bg-white text-omega-purple-dark ring-omega-purple/15",
    badge: "bg-omega-purple text-white",
    benefits: [
      "Static logo placement in LED wall rotation",
      "Logo featured on event website",
      "Verbal acknowledgment by event host during program",
      "Two (2) Premier VIP tickets",
      "Recognition in event program",
      "Digital badge for your marketing materials",
      "Certificate of partnership and appreciation",
    ],
  },
];

const TIER_BY_KEY: Record<TierKey, Tier> = TIERS.reduce(
  (acc, t) => ({ ...acc, [t.key]: t }),
  {} as Record<TierKey, Tier>
);

const COMPARISON_ROWS: {
  benefit: string;
  bronze: string;
  gold: string;
  purple: string;
  omega: string;
}[] = [
  {
    benefit: "LED Wall Visibility",
    bronze: "Static JPEG",
    gold: "15-sec video",
    purple: "30-sec video",
    omega: "60-sec video + premier",
  },
  {
    benefit: "Event Tickets",
    bronze: "2 Premier VIP",
    gold: "4 Premier VIP",
    purple: "8 Premier VIP",
    omega: "10 Premier VIP",
  },
  {
    benefit: "Marketing Materials",
    bronze: "Website only",
    gold: "Website + signage",
    purple: "All collateral",
    omega: "All + presenting credit",
  },
  {
    benefit: "On-Site Activation",
    bronze: "—",
    gold: "✓",
    purple: "✓",
    omega: "✓",
  },
  {
    benefit: "Signature Branding",
    bronze: "—",
    gold: "—",
    purple: "VIP lounge",
    omega: "Champagne toast + VIP lounge",
  },
  {
    benefit: "Speaking Opportunity",
    bronze: "—",
    gold: "—",
    purple: "—",
    omega: "✓",
  },
  {
    benefit: "Press / Media",
    bronze: "—",
    gold: "Press mention",
    purple: "Press feature",
    omega: "Featured in all media",
  },
  {
    benefit: "Nonprofit Recognition",
    bronze: "Logo recognition",
    gold: "Logo recognition",
    purple: "Premium donor",
    omega: "Presenting donor",
  },
  {
    benefit: "ROI Report",
    bronze: "—",
    gold: "—",
    purple: "—",
    omega: "Full metrics",
  },
];

function formatPrice(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function QyeSponsorshipPlan() {
  const [selected, setSelected] = useState<TierKey | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [submittedTier, setSubmittedTier] = useState<TierKey | null>(null);

  function handleReserve(key: TierKey) {
    setSelected(key);
    requestAnimationFrame(() => {
      document
        .getElementById("reserve")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmittedTier(selected);
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const selectedTier = selected ? TIER_BY_KEY[selected] : null;

  return (
    <>
      {/* TIER PICKER */}
      <section
        id="levels"
        className="section-omega bg-white scroll-mt-32"
      >
        <div className="container-omega">
          <div className="max-w-2xl space-y-3 mb-10">
            <span className="eyebrow">Sponsorship Packages</span>
            <h2 className="heading-section">Four tiers. One mission.</h2>
            <div className="divider-gold" />
            <p className="font-sans text-base leading-relaxed text-neutral-700">
              Click any level to expand its full benefits, then reserve your
              spot. Limited availability per tier.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {TIERS.map((t) => {
              const isSelected = selected === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() =>
                    setSelected(isSelected ? null : t.key)
                  }
                  aria-pressed={isSelected}
                  className={`relative flex flex-col text-left rounded-3xl ring-1 p-6 shadow-chapter transition hover:-translate-y-1 hover:shadow-regalia ${
                    t.card
                  } ${isSelected ? "ring-2 ring-omega-gold shadow-regalia -translate-y-1" : ""}`}
                >
                  <span
                    className={`inline-flex self-start items-center rounded-full ${t.badge} px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap`}
                  >
                    {t.role}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-regalia">
                    {t.name}
                  </h3>
                  <p className="mt-1 font-display text-3xl sm:text-4xl font-semibold tracking-regalia leading-none">
                    {formatPrice(t.price)}
                  </p>
                  <p className="mt-3 font-sans text-sm leading-relaxed opacity-90 flex-1">
                    {t.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center font-sans text-sm font-semibold">
                    {isSelected ? "Hide details ↑" : "View benefits →"}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedTier && (
            <div
              className="rounded-3xl bg-white shadow-regalia ring-1 ring-omega-purple/10 p-8 sm:p-10"
              role="region"
              aria-label={`${selectedTier.name} benefits`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className="eyebrow text-omega-gold">
                    {selectedTier.role}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-omega-purple-dark">
                    {selectedTier.name}
                  </h3>
                  <p className="mt-1 font-display text-2xl font-semibold text-omega-purple tracking-regalia">
                    {formatPrice(selectedTier.price)}{" "}
                    <span className="font-sans text-sm font-normal text-neutral-500 normal-case tracking-normal">
                      per sponsorship
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleReserve(selectedTier.key)}
                  className="btn-primary"
                >
                  Reserve This Level →
                </button>
              </div>

              <div className="divider-gold mb-6" />

              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {selectedTier.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 font-sans text-sm leading-relaxed text-neutral-700"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-omega-gold text-omega-purple-dark text-[11px] font-bold">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section
        id="compare"
        className="section-omega bg-neutral-50 scroll-mt-32"
      >
        <div className="container-omega">
          <div className="max-w-2xl space-y-3 mb-10">
            <span className="eyebrow">Investment Comparison</span>
            <h2 className="heading-section">
              Choose the right partnership level.
            </h2>
            <div className="divider-gold" />
          </div>

          <div className="overflow-x-auto rounded-2xl shadow-chapter ring-1 ring-omega-purple/10 bg-white">
            <table className="w-full text-left font-sans text-sm">
              <thead>
                <tr className="bg-omega-purple-dark text-white">
                  <th className="p-4 font-semibold uppercase tracking-[0.18em] text-[11px] sticky left-0 bg-omega-purple-dark">
                    Benefit
                  </th>
                  {TIERS.slice()
                    .reverse()
                    .map((t) => {
                      const isPremium =
                        t.key === "omega" || t.key === "purple";
                      return (
                        <th
                          key={t.key}
                          className="p-4 font-semibold text-center"
                        >
                          <div
                            className={`font-display text-base ${
                              isPremium ? "text-omega-gold" : "text-white"
                            }`}
                          >
                            {t.name}
                          </div>
                          <div className="font-sans text-xs text-omega-gold mt-1">
                            {formatPrice(t.price)}
                          </div>
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.benefit}
                    className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                  >
                    <td className="p-4 font-semibold text-omega-purple-dark sticky left-0 bg-inherit">
                      {row.benefit}
                    </td>
                    <td className="p-4 text-center text-neutral-700">
                      {row.bronze}
                    </td>
                    <td className="p-4 text-center text-neutral-700">
                      {row.gold}
                    </td>
                    <td className="p-4 text-center text-neutral-700">
                      {row.purple}
                    </td>
                    <td className="p-4 text-center text-omega-purple-dark font-semibold">
                      {row.omega}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-sans text-xs text-neutral-500 italic">
            Tap a level above to see its full benefits in detail.
          </p>
        </div>
      </section>

      {/* RESERVE / INQUIRY FORM */}
      <section
        id="reserve"
        className="section-omega bg-omega-purple/5 border-t border-omega-purple/10 scroll-mt-32"
      >
        <div className="container-omega max-w-3xl">
          <div className="text-center space-y-3 mb-10">
            <span className="eyebrow">Reserve Your Sponsorship</span>
            <h2 className="heading-section">Lock in your level.</h2>
            <div className="divider-gold mx-auto" />
            <p className="font-sans text-sm text-neutral-600 max-w-xl mx-auto">
              Submit your interest and our Sponsorship Coordinator will reach
              out within two business days to confirm your level and finalize
              activation details.
            </p>
          </div>

          {status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="card p-8 sm:p-10 border-l-4 border-omega-gold text-center"
            >
              <span className="eyebrow text-omega-gold">Submitted</span>
              <p className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-omega-purple-dark">
                Thank you for your interest.
              </p>
              {submittedTier && (
                <p className="mt-2 font-sans text-sm text-neutral-600">
                  Level reserved:{" "}
                  <span className="font-semibold text-omega-purple">
                    {TIER_BY_KEY[submittedTier].name} ·{" "}
                    {formatPrice(TIER_BY_KEY[submittedTier].price)}
                  </span>
                </p>
              )}
              <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 max-w-xl mx-auto">
                Tristan Elmore will follow up at the email address you provided
                to confirm your sponsorship and begin activation planning.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setSubmittedTier(null);
                  setSelected(null);
                }}
                className="btn-outline mt-6"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              action={FORMSPREE_ENDPOINT}
              method="POST"
              className="card p-6 sm:p-8 space-y-6"
              aria-label="Que Year's Eve sponsorship inquiry"
              noValidate
            >
              <input
                type="hidden"
                name="event"
                value="Que Year's Eve 2026"
              />
              <input type="hidden" name="_subject" value="Que Year's Eve Sponsor Inquiry" />

              <div>
                <label className="label-omega" htmlFor="qye-tier">
                  Sponsorship Level{" "}
                  <span className="text-omega-purple">*</span>
                </label>
                <select
                  id="qye-tier"
                  name="tier"
                  className="input-omega"
                  value={selected ?? ""}
                  onChange={(e) =>
                    setSelected(
                      e.target.value
                        ? (e.target.value as TierKey)
                        : null
                    )
                  }
                  required
                >
                  <option value="" disabled>
                    Select a level
                  </option>
                  {TIERS.map((t) => (
                    <option key={t.key} value={t.key}>
                      {t.name} — {formatPrice(t.price)} ({t.role})
                    </option>
                  ))}
                </select>
                {selected && (
                  <p className="mt-2 font-sans text-xs text-neutral-500">
                    You can change levels at any time before submitting.
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-omega" htmlFor="qye-name">
                    Contact Name{" "}
                    <span className="text-omega-purple">*</span>
                  </label>
                  <input
                    id="qye-name"
                    name="contact_name"
                    type="text"
                    className="input-omega"
                    required
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="label-omega" htmlFor="qye-org">
                    Organization{" "}
                    <span className="text-omega-purple">*</span>
                  </label>
                  <input
                    id="qye-org"
                    name="organization"
                    type="text"
                    className="input-omega"
                    required
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-omega" htmlFor="qye-email">
                    Email <span className="text-omega-purple">*</span>
                  </label>
                  <input
                    id="qye-email"
                    name="email"
                    type="email"
                    className="input-omega"
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label className="label-omega" htmlFor="qye-phone">
                    Phone{" "}
                    <span className="font-normal text-neutral-400">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="qye-phone"
                    name="phone"
                    type="tel"
                    className="input-omega"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label className="label-omega" htmlFor="qye-title">
                  Title / Role{" "}
                  <span className="font-normal text-neutral-400">
                    (optional)
                  </span>
                </label>
                <input
                  id="qye-title"
                  name="role"
                  type="text"
                  className="input-omega"
                  placeholder="e.g. Marketing Director, CEO, Community Affairs Lead"
                />
              </div>

              <div>
                <label className="label-omega" htmlFor="qye-message">
                  Message / Activation Ideas{" "}
                  <span className="font-normal text-neutral-400">
                    (optional)
                  </span>
                </label>
                <textarea
                  id="qye-message"
                  name="message"
                  rows={5}
                  className="input-omega"
                  placeholder="Anything you'd like to share about your goals or ideas for activation."
                />
              </div>

              {status === "error" && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-4 font-sans text-sm text-red-800"
                >
                  Something went wrong. Please try again or contact us at{" "}
                  <a
                    href="mailto:events@oneomegachicago.org"
                    className="font-semibold underline underline-offset-4"
                  >
                    events@oneomegachicago.org
                  </a>
                  .
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary"
                >
                  {status === "submitting"
                    ? "Submitting…"
                    : "Submit Sponsorship Interest"}
                </button>
                <p className="font-sans text-xs text-neutral-500">
                  We&rsquo;ll respond within two business days.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
