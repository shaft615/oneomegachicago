"use client";

import { useState, type FormEvent } from "react";
import { chapters } from "@/data/chapters";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjwnozy";

type Status = "idle" | "submitting" | "success" | "error";

const CATEGORIES = [
  "Community",
  "Wellness",
  "Scholarship",
  "Brotherhood",
  "Foundation",
  "Conclave 2028",
  "Service",
  "Social",
  "Other",
] as const;

export default function EventSubmissionForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [recurring, setRecurring] = useState(false);

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
        setStatus("success");
        form.reset();
        setRecurring(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card p-8 sm:p-10 border-l-4 border-omega-gold text-center"
      >
        <span className="eyebrow text-omega-gold">Submitted</span>
        <p className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-omega-purple-dark">
          Thank you for the submission.
        </p>
        <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 max-w-xl mx-auto">
          The Foundation will review your event and add it to the public
          calendar within a few business days. You&rsquo;ll receive a
          confirmation email once it&rsquo;s posted.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-6"
        >
          Submit Another Event
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      action={FORMSPREE_ENDPOINT}
      method="POST"
      className="card p-6 sm:p-8 space-y-6"
      aria-label="Chapter event submission form"
      noValidate
    >
      {/* Submitter info */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold text-omega-purple-dark mb-2">
          Submitter
        </legend>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label-omega" htmlFor="submitter_name">
              Your Name <span className="text-omega-purple">*</span>
            </label>
            <input
              id="submitter_name"
              name="submitter_name"
              type="text"
              className="input-omega"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="label-omega" htmlFor="submitter_email">
              Your Email <span className="text-omega-purple">*</span>
            </label>
            <input
              id="submitter_email"
              name="submitter_email"
              type="email"
              className="input-omega"
              required
              autoComplete="email"
            />
          </div>
        </div>
        <div>
          <label className="label-omega" htmlFor="submitter_role">
            Your Role{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input
            id="submitter_role"
            name="submitter_role"
            type="text"
            className="input-omega"
            placeholder="e.g. Basileus, Vice Basileus, Keeper of Records"
          />
        </div>
      </fieldset>

      <hr className="border-omega-purple/10" />

      {/* Event details */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold text-omega-purple-dark mb-2">
          Event Details
        </legend>

        <div>
          <label className="label-omega" htmlFor="title">
            Event Title <span className="text-omega-purple">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="input-omega"
            required
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label-omega" htmlFor="host_chapter">
              Host Chapter <span className="text-omega-purple">*</span>
            </label>
            <select
              id="host_chapter"
              name="host_chapter"
              className="input-omega"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select host chapter
              </option>
              <option value="One Omega Foundation">
                One Omega Foundation (cross-chapter)
              </option>
              {chapters.map((c) => (
                <option key={c.id} value={`${c.designation} — ${c.name}`}>
                  {c.designation} — {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-omega" htmlFor="category">
              Category <span className="text-omega-purple">*</span>
            </label>
            <select
              id="category"
              name="category"
              className="input-omega"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="label-omega" htmlFor="date">
              Date <span className="text-omega-purple">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className="input-omega"
              required
            />
          </div>
          <div>
            <label className="label-omega" htmlFor="start_time">
              Start Time{" "}
              <span className="font-normal text-neutral-400">(optional)</span>
            </label>
            <input
              id="start_time"
              name="start_time"
              type="time"
              className="input-omega"
            />
          </div>
          <div>
            <label className="label-omega" htmlFor="end_time">
              End Time{" "}
              <span className="font-normal text-neutral-400">(optional)</span>
            </label>
            <input
              id="end_time"
              name="end_time"
              type="time"
              className="input-omega"
            />
          </div>
        </div>

        <div>
          <label className="label-omega" htmlFor="location">
            Location <span className="text-omega-purple">*</span>
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className="input-omega"
            placeholder="Venue name, address, city"
            required
          />
        </div>

        <div>
          <label className="label-omega" htmlFor="description">
            Description <span className="text-omega-purple">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            className="input-omega"
            placeholder="What's the event? Who's it for? What should attendees expect?"
            required
          />
        </div>

        <div>
          <label className="label-omega" htmlFor="registration_link">
            Registration / RSVP Link{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <input
            id="registration_link"
            name="registration_link"
            type="url"
            className="input-omega"
            placeholder="https://eventbrite.com/... or chapter site URL"
          />
        </div>

        {/* Recurring */}
        <div className="rounded-xl bg-omega-purple/5 ring-1 ring-omega-purple/10 p-5 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_recurring"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="h-4 w-4 accent-omega-purple"
            />
            <span className="font-sans text-sm font-medium text-omega-purple-dark">
              This is a recurring event
            </span>
          </label>
          {recurring && (
            <div>
              <label className="label-omega" htmlFor="recurrence">
                Recurrence pattern
              </label>
              <input
                id="recurrence"
                name="recurrence"
                type="text"
                className="input-omega"
                placeholder="e.g. Quarterly, Monthly · 1st Saturday, Weekly · Tuesdays"
              />
              <p className="mt-2 font-sans text-xs text-neutral-500">
                The Foundation will display this label on the event. Submit a
                separate entry for each occurrence you want shown on the
                calendar grid.
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="label-omega" htmlFor="notes">
            Notes for the Foundation{" "}
            <span className="font-normal text-neutral-400">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="input-omega"
            placeholder="Anything else the Foundation should know? Sponsors, special accommodations, conflicts to watch for, etc."
          />
        </div>
      </fieldset>

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
          {status === "submitting" ? "Submitting…" : "Submit Event"}
        </button>
        <p className="font-sans text-xs text-neutral-500">
          Submissions are reviewed by the Foundation before publication.
        </p>
      </div>
    </form>
  );
}
