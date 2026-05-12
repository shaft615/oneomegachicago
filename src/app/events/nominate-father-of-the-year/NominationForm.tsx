"use client";

import { useState, type FormEvent } from "react";
import { chapters } from "@/data/chapters";

// TODO: swap in the dedicated Formspree form ID for Father of the Year nominations
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_FOTY_ID";

type Status = "idle" | "submitting" | "success" | "error";

export default function NominationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submittedName, setSubmittedName] = useState<string>("Brother");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());

    // Pull the nominator's last name for the success message
    const fullName = String(formData.nominator_name || "").trim();
    const parts = fullName.split(/\s+/);
    const lastName =
      parts.length > 1 ? parts[parts.length - 1] : fullName || "Brother";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card p-8 sm:p-10 border-l-4 border-omega-gold text-center"
      >
        <span className="eyebrow text-omega-gold">Nomination Received</span>
        <p className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-omega-purple-dark">
          Thank you, Brother {submittedName}!
        </p>
        <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-neutral-700 max-w-xl mx-auto">
          Your nomination has been recorded and will be reviewed by the
          Father&rsquo;s Day Honors Committee. We&rsquo;ll follow up if we need
          additional information.
        </p>
        <p className="mt-5 font-display text-xl text-omega-gold tracking-regalia">
          Omega Psi Phi!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      action={FORMSPREE_ENDPOINT}
      method="POST"
      className="card p-6 sm:p-8 space-y-6"
      aria-label="Father of the Year nomination form"
      noValidate
    >
      <input
        type="hidden"
        name="event"
        value="2026 Father's Day CookOwt — Father of the Year"
      />
      <input
        type="hidden"
        name="_subject"
        value="Father of the Year Nomination"
      />

      {/* Nominator */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold text-omega-purple-dark mb-2">
          Nominator
        </legend>
        <div>
          <label className="label-omega" htmlFor="nominator_name">
            Your Name <span className="text-omega-purple">*</span>
          </label>
          <input
            id="nominator_name"
            name="nominator_name"
            type="text"
            className="input-omega"
            required
            autoComplete="name"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="label-omega" htmlFor="nominator_email">
              Email <span className="text-omega-purple">*</span>
            </label>
            <input
              id="nominator_email"
              name="nominator_email"
              type="email"
              className="input-omega"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="label-omega" htmlFor="nominator_phone">
              Phone <span className="text-omega-purple">*</span>
            </label>
            <input
              id="nominator_phone"
              name="nominator_phone"
              type="tel"
              className="input-omega"
              required
              autoComplete="tel"
            />
          </div>
        </div>
      </fieldset>

      <hr className="border-omega-purple/10" />

      {/* Nominee */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold text-omega-purple-dark mb-2">
          Nominee
        </legend>
        <div>
          <label className="label-omega" htmlFor="nominee_name">
            Nominee Full Name <span className="text-omega-purple">*</span>
          </label>
          <input
            id="nominee_name"
            name="nominee_name"
            type="text"
            className="input-omega"
            required
          />
        </div>
        <div>
          <label className="label-omega" htmlFor="nominee_relationship">
            Your Relationship to Nominee{" "}
            <span className="text-omega-purple">*</span>
          </label>
          <input
            id="nominee_relationship"
            name="nominee_relationship"
            type="text"
            className="input-omega"
            placeholder="e.g. Father, Grandfather, Father figure, Mentor"
            required
          />
        </div>
        <div>
          <label className="label-omega" htmlFor="nominee_chapter">
            Nominee&rsquo;s Chapter{" "}
            <span className="font-normal text-neutral-400">
              (if Omega brother)
            </span>
          </label>
          <select
            id="nominee_chapter"
            name="nominee_chapter"
            className="input-omega"
            defaultValue=""
          >
            <option value="">Not applicable / skip</option>
            {chapters.map((c) => (
              <option key={c.id} value={`${c.designation} — ${c.name}`}>
                {c.designation} — {c.name}
              </option>
            ))}
            <option value="Other">Other Omega chapter</option>
          </select>
        </div>
      </fieldset>

      <hr className="border-omega-purple/10" />

      {/* Nomination details */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-semibold text-omega-purple-dark mb-2">
          Nomination Details
        </legend>
        <div>
          <label className="label-omega" htmlFor="why_deserves">
            Why does this man deserve to be Father of the Year?{" "}
            <span className="text-omega-purple">*</span>
          </label>
          <textarea
            id="why_deserves"
            name="why_deserves"
            rows={6}
            className="input-omega"
            required
          />
        </div>
        <div>
          <label className="label-omega" htmlFor="contributions">
            Notable contributions to family and community{" "}
            <span className="text-omega-purple">*</span>
          </label>
          <textarea
            id="contributions"
            name="contributions"
            rows={6}
            className="input-omega"
            required
          />
        </div>
        <div>
          <label className="label-omega" htmlFor="other_achievements">
            Any other relevant achievements (fraternal or otherwise){" "}
            <span className="text-omega-purple">*</span>
          </label>
          <textarea
            id="other_achievements"
            name="other_achievements"
            rows={5}
            className="input-omega"
            required
          />
        </div>
      </fieldset>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 font-sans text-sm text-red-800"
        >
          Something went wrong. Please try again or email us at{" "}
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
          {status === "submitting" ? "Submitting…" : "Submit Nomination"}
        </button>
        <p className="font-sans text-xs text-neutral-500">
          Reviewed by the Father&rsquo;s Day Honors Committee.
        </p>
      </div>
    </form>
  );
}
