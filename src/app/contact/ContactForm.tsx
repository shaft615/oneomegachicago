"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { submitToFormspree, type FormStatus } from "@/lib/forms";
import { StatusError, SuccessPanel } from "@/components/FormFeedback";

type InquiryType = "media" | "sponsor" | "chapter" | "volunteer" | "general";

const TYPE_OPTIONS: { value: InquiryType; label: string }[] = [
  { value: "general", label: "General" },
  { value: "media", label: "Media" },
  { value: "sponsor", label: "Sponsorship" },
  { value: "chapter", label: "Chapter" },
  { value: "volunteer", label: "Volunteer" },
];

const ROUTING_LABEL: Record<InquiryType, string> = {
  general: "Foundation Secretary",
  media: "Communications Officer",
  sponsor: "Conclave 2028 Sponsorship Chair",
  chapter: "Council of Basilei Liaison",
  volunteer: "Volunteer Coordinator",
};

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initial = (searchParams.get("type") as InquiryType) || "general";
  const [type, setType] = useState<InquiryType>(
    TYPE_OPTIONS.some((o) => o.value === initial) ? initial : "general"
  );
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const ok = await submitToFormspree({
        ...data,
        _form: "contact",
        _routedTo: ROUTING_LABEL[type],
      });
      if (ok) {
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
      className="card p-8 space-y-5"
      aria-label="Contact form"
      noValidate
    >
      <div>
        <label className="label-omega" htmlFor="contact-type">
          Inquiry Type
        </label>
        <select
          id="contact-type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value as InquiryType)}
          className="input-omega"
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <p className="mt-2 font-sans text-xs text-neutral-500">
          Routes to:{" "}
          <span className="font-semibold text-omega-purple">
            {ROUTING_LABEL[type]}
          </span>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="label-omega" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="input-omega"
            required
          />
        </div>
        <div>
          <label className="label-omega" htmlFor="contact-email">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="input-omega"
            required
          />
        </div>
      </div>

      <div>
        <label className="label-omega" htmlFor="contact-org">
          Organization (optional)
        </label>
        <input
          id="contact-org"
          name="organization"
          type="text"
          className="input-omega"
        />
      </div>

      <div>
        <label className="label-omega" htmlFor="contact-subject">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className="input-omega"
          required
        />
      </div>

      <div>
        <label className="label-omega" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className="input-omega"
          required
        />
      </div>

      <StatusError status={status} />

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary"
        >
          {status === "submitting" ? "Sending…" : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}
