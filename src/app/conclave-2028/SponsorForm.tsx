"use client";

import { useState, type FormEvent } from "react";
import { type FormStatus } from "@/lib/forms";
import { StatusError, SuccessPanel } from "@/components/FormFeedback";

export default function SponsorForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("https://formspree.io/f/xgorjngd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
    return <SuccessPanel />;
  }

  return (
    <form
      onSubmit={onSubmit}
      action="https://formspree.io/f/xgorjngd"
      method="POST"
      className="grid gap-5 sm:grid-cols-2"
      aria-label="Sponsor interest form"
      noValidate
    >
      <div className="sm:col-span-1">
        <label className="label-omega" htmlFor="sponsor-name">
          Contact Name
        </label>
        <input
          id="sponsor-name"
          name="name"
          type="text"
          className="input-omega"
          required
        />
      </div>
      <div className="sm:col-span-1">
        <label className="label-omega" htmlFor="sponsor-org">
          Organization
        </label>
        <input
          id="sponsor-org"
          name="organization"
          type="text"
          className="input-omega"
          required
        />
      </div>
      <div className="sm:col-span-1">
        <label className="label-omega" htmlFor="sponsor-email">
          Email
        </label>
        <input
          id="sponsor-email"
          name="email"
          type="email"
          className="input-omega"
          required
        />
      </div>
      <div className="sm:col-span-1">
        <label className="label-omega" htmlFor="sponsor-tier">
          Interest Tier
        </label>
        <select
          id="sponsor-tier"
          name="tier"
          className="input-omega"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select a tier
          </option>
          <option value="founders-circle">Founders&rsquo; Circle</option>
          <option value="cardinal-patron">Cardinal Patron</option>
          <option value="chapter-champion">Chapter Champion</option>
          <option value="custom">Custom / Discuss</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="label-omega" htmlFor="sponsor-message">
          Message
        </label>
        <textarea
          id="sponsor-message"
          name="message"
          rows={5}
          className="input-omega"
        />
      </div>

      <div className="sm:col-span-2">
        <StatusError status={status} />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary"
        >
          {status === "submitting" ? "Sending…" : "Submit Interest"}
        </button>
      </div>
    </form>
  );
}
