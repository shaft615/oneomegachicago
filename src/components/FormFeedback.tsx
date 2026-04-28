import {
  FORM_FALLBACK_EMAIL,
  FORM_SUCCESS_MESSAGE,
  type FormStatus,
} from "@/lib/forms";

export function SuccessPanel() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="card p-8 border-l-4 border-omega-gold"
    >
      <span className="eyebrow text-omega-gold">Submitted</span>
      <p className="mt-3 font-display text-xl font-semibold text-omega-purple-dark">
        Message received.
      </p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-700">
        {FORM_SUCCESS_MESSAGE}
      </p>
    </div>
  );
}

export function ErrorBanner() {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 p-4 font-sans text-sm text-red-800"
    >
      Something went wrong. Please try again or email us directly at{" "}
      <a
        href={`mailto:${FORM_FALLBACK_EMAIL}`}
        className="font-semibold underline underline-offset-4"
      >
        {FORM_FALLBACK_EMAIL}
      </a>
      .
    </div>
  );
}

export function StatusError({ status }: { status: FormStatus }) {
  if (status !== "error") return null;
  return <ErrorBanner />;
}
