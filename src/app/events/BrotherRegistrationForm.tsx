"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { chapters } from "@/data/chapters";
import { fetchFormspree } from "@/lib/forms";

const FORMSPREE_FORM_ID = "xjglvlan";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
const EVENTBRITE_URL =
  "https://www.eventbrite.com/e/2026-black-mens-wellness-day-chicago-tickets-1944149807409";
const EVENT_LABEL = "2026 Father's Day CookOwt";

type Status = "idle" | "submitting" | "success" | "error";

export default function BrotherRegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submittedName, setSubmittedName] = useState<string>("Brother");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    const firstName = String(formData.first_name || "").trim();
    const lastName = String(formData.last_name || "Brother").trim() || "Brother";
    const chapter = String(formData.chapter || "").trim();

    // Build a clearly-tagged subject so Father's Day registrations are
    // instantly identifiable in the events@ inbox and easy to count/report.
    const subjectName = [firstName, lastName].filter(Boolean).join(" ") || "Brother";
    const subject = `Father's Day 2026 Registration — ${subjectName}${chapter ? ` (${chapter})` : ""}`;

    try {
      const response = await fetchFormspree(FORMSPREE_FORM_ID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: subject,
        }),
      });

      if (response.ok) {
        setSubmittedName(lastName);
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="register"
      className="relative section-omega bg-omega-purple/5 border-t border-omega-purple/10 scroll-mt-24"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #6D2077 0, transparent 35%), radial-gradient(circle at 85% 80%, #B7A57A 0, transparent 35%)",
        }}
        aria-hidden
      />

      <div className="container-omega relative max-w-4xl">
        <div className="text-center space-y-3 mb-8">
          <h2 className="heading-section">
            Brother Registration — Confirm Your Participation
          </h2>
          <div className="divider-gold mx-auto" />
          <p className="font-sans text-sm text-neutral-600 max-w-2xl mx-auto">
            Help us track Omega brothers attending the 3rd Annual Father&rsquo;s
            Day CookOwt &amp; Black Men&rsquo;s Wellness Day on June 20, 2026.
          </p>
        </div>

        {/* Eventbrite step-1 callout */}
        <div className="rounded-2xl bg-gilded-gradient ring-1 ring-omega-gold/40 shadow-gilded p-6 sm:p-8 mb-8">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-omega-purple-dark">
            Step 1
          </span>
          <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-omega-purple-dark">
            Register on Eventbrite first
          </h3>
          <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-omega-purple-dark/90">
            👉 Click <span className="font-semibold">&ldquo;Get Tickets&rdquo;</span>{" "}
            → Select{" "}
            <span className="font-semibold">
              &ldquo;I&rsquo;m WALKING with One Omega Foundation&rdquo;
            </span>{" "}
            → Complete registration
          </p>
          <p className="mt-2 font-sans text-sm sm:text-base leading-relaxed text-omega-purple-dark/90">
            Then return here to complete{" "}
            <span className="font-semibold">Step 2</span> below so we can track
            your participation.
          </p>
          <div className="mt-5">
            <Link
              href={EVENTBRITE_URL}
              target="_blank"
              rel="noreferrer"
              className="btn bg-omega-purple-dark text-omega-gold border-2 border-omega-gold hover:bg-omega-purple hover:text-white"
            >
              Register on Eventbrite →
            </Link>
          </div>
        </div>

        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            className="card p-8 sm:p-10 border-l-4 border-omega-gold text-center"
          >
            <span className="eyebrow text-omega-gold">Registered</span>
            <p className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-omega-purple-dark">
              Thank you, Brother {submittedName}!
            </p>
            <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 max-w-xl mx-auto">
              Your registration has been recorded. We look forward to seeing you
              at Jackson Park on June 20th.
            </p>
            <p className="mt-5 font-display text-xl text-omega-gold tracking-regalia">
              Omega Psi Phi!
            </p>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            action={FORMSPREE_ENDPOINT}
            method="POST"
            className="card p-6 sm:p-8 space-y-6"
            aria-label="Brother registration form"
            noValidate
          >
            {/* Hidden event identifier */}
            <input type="hidden" name="event" value={EVENT_LABEL} />

            {/* Step 2 header */}
            <div className="border-b border-omega-purple/10 pb-5">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-omega-purple-dark">
                Step 2
              </span>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-omega-purple-dark">
                Confirm your participation
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-600">
                Once you&rsquo;ve registered on Eventbrite above, complete the
                form below so the Foundation can track your attendance.
              </p>
            </div>

            {/* Name row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label-omega" htmlFor="first_name">
                  First Name <span className="text-omega-purple">*</span>
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  className="input-omega"
                  required
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label className="label-omega" htmlFor="last_name">
                  Last Name <span className="text-omega-purple">*</span>
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  className="input-omega"
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Chapter */}
            <div>
              <label className="label-omega" htmlFor="chapter">
                Chapter <span className="text-omega-purple">*</span>
              </label>
              <select
                id="chapter"
                name="chapter"
                className="input-omega"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select your chapter
                </option>
                {chapters.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.designation} — {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact row */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="label-omega" htmlFor="email">
                  Email Address <span className="text-omega-purple">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input-omega"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="label-omega" htmlFor="phone">
                  Phone Number{" "}
                  <span className="font-normal text-neutral-400">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="input-omega"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Eventbrite registration radio */}
            <fieldset>
              <legend className="label-omega mb-3">
                Have you completed Eventbrite registration?{" "}
                <span className="text-omega-purple">*</span>
              </legend>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex-1 cursor-pointer rounded-lg border border-neutral-300 bg-white px-4 py-3 hover:border-omega-purple has-[:checked]:border-omega-purple has-[:checked]:bg-omega-purple/5 has-[:checked]:ring-1 has-[:checked]:ring-omega-purple transition">
                  <input
                    type="radio"
                    name="eventbrite_status"
                    value="Yes, I have registered"
                    required
                    className="mr-3 accent-omega-purple"
                  />
                  <span className="font-sans text-sm font-medium text-neutral-800">
                    Yes, I have registered
                  </span>
                </label>
                <label className="flex-1 cursor-pointer rounded-lg border border-neutral-300 bg-white px-4 py-3 hover:border-omega-purple has-[:checked]:border-omega-purple has-[:checked]:bg-omega-purple/5 has-[:checked]:ring-1 has-[:checked]:ring-omega-purple transition">
                  <input
                    type="radio"
                    name="eventbrite_status"
                    value="Not yet — I will register now"
                    required
                    className="mr-3 accent-omega-purple"
                  />
                  <span className="font-sans text-sm font-medium text-neutral-800">
                    Not yet — I will register now
                  </span>
                </label>
              </div>
            </fieldset>

            {/* Volunteering radio */}
            <fieldset>
              <legend className="label-omega mb-3">
                Will you be volunteering?{" "}
                <span className="text-omega-purple">*</span>
              </legend>
              <div className="grid sm:grid-cols-3 gap-3">
                {(["Yes", "No", "Maybe"] as const).map((opt) => (
                  <label
                    key={opt}
                    className="cursor-pointer rounded-lg border border-neutral-300 bg-white px-4 py-3 text-center hover:border-omega-purple has-[:checked]:border-omega-purple has-[:checked]:bg-omega-purple/5 has-[:checked]:ring-1 has-[:checked]:ring-omega-purple transition"
                  >
                    <input
                      type="radio"
                      name="volunteering"
                      value={opt}
                      required
                      className="mr-2 accent-omega-purple"
                    />
                    <span className="font-sans text-sm font-medium text-neutral-800">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Skills */}
            <div>
              <label className="label-omega" htmlFor="skills">
                Special skills to contribute{" "}
                <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <input
                id="skills"
                name="skills"
                type="text"
                className="input-omega"
                placeholder="e.g. health professional, logistics, security, etc."
              />
            </div>

            {/* Comments */}
            <div>
              <label className="label-omega" htmlFor="comments">
                Additional comments{" "}
                <span className="font-normal text-neutral-400">(optional)</span>
              </label>
              <textarea
                id="comments"
                name="comments"
                rows={4}
                className="input-omega"
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full sm:w-auto"
              >
                {status === "submitting"
                  ? "Submitting…"
                  : "Submit Registration"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
