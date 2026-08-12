"use client";

import { useState, type FormEvent } from "react";
import { fetchIdeasApi, IDEAS_FALLBACK_EMAIL } from "@/lib/ideas";

type Step = "email" | "details" | "done";

interface Folder {
  id: string;
  name: string;
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 p-4 font-sans text-sm text-red-800"
    >
      {message} If it keeps failing, email your idea to{" "}
      <a
        href={`mailto:${IDEAS_FALLBACK_EMAIL}`}
        className="font-semibold underline underline-offset-4"
      >
        {IDEAS_FALLBACK_EMAIL}
      </a>
      .
    </div>
  );
}

/**
 * Two-step Conclave Idea Bank intake — the same flow as
 * chicagoclave2028.com/ideas, wired to the same portal queue. Step one
 * checks the email against the Conclave contact list; a Brother on the list
 * is greeted by name, anyone else introduces himself (name + chapter),
 * which adds him to the list alongside the idea.
 */
export default function IdeaBankForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [known, setKnown] = useState<{ found: boolean; name: string | null }>({
    found: false,
    name: null,
  });
  const [folders, setFolders] = useState<Folder[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onCheck(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy || !email) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetchIdeasApi({ action: "check", email });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as {
        found?: boolean;
        name?: string | null;
        folders?: Folder[];
      };
      setKnown({ found: Boolean(data.found), name: data.name ?? null });
      setFolders(Array.isArray(data.folders) ? data.folders : []);
      setStep("details");
    } catch {
      setError("Could not check the contact list.");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetchIdeasApi({
        action: "submit",
        email,
        source: "one-omega",
        ...data,
      });
      if (!res.ok) throw new Error();
      setStep("done");
    } catch {
      setError("Your idea could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  if (step === "done") {
    return (
      <div role="status" aria-live="polite" className="card p-8 border-l-4 border-omega-gold">
        <span className="eyebrow text-omega-gold">Submitted</span>
        <p className="mt-3 font-display text-xl font-semibold text-omega-purple-dark">
          Thank you{known.name ? `, Brother ${known.name}` : ""}.
        </p>
        <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-700">
          Your idea is in the bank. The Conclave leadership team reviews every
          submission as it plans the 86th Grand Conclave.
        </p>
        <button
          type="button"
          onClick={() => setStep("details")}
          className="mt-4 font-sans text-sm font-semibold text-omega-purple underline underline-offset-4"
        >
          Submit another idea
        </button>
      </div>
    );
  }

  if (step === "email") {
    return (
      <form onSubmit={onCheck} className="card p-8 space-y-5" aria-label="Idea Bank — email check" noValidate>
        <div>
          <h2 className="font-display text-xl font-semibold text-omega-purple-dark">
            First, your email
          </h2>
          <p className="mt-1 font-sans text-sm text-neutral-600">
            We check it against the Conclave contact list so the leadership team
            knows who each idea comes from.
          </p>
        </div>
        <div>
          <label className="label-omega" htmlFor="idea-email">
            Email Address
          </label>
          <input
            id="idea-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-omega"
          />
        </div>
        {error && <ErrorBanner message={error} />}
        <button type="submit" disabled={busy} className="btn-gold disabled:opacity-60">
          {busy ? "Checking…" : "Continue"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-8 space-y-5" aria-label="Idea Bank submission" noValidate>
      {known.found ? (
        <p className="rounded-lg bg-omega-purple/5 ring-1 ring-omega-purple/15 p-4 font-sans text-sm text-omega-purple-dark">
          Welcome{known.name ? `, Brother ${known.name}` : ""} — you&rsquo;re on the
          Conclave contact list. Share your idea below.
        </p>
      ) : (
        <p className="rounded-lg bg-omega-gold/10 ring-1 ring-omega-gold/40 p-4 font-sans text-sm text-neutral-800">
          We don&rsquo;t have <strong>{email}</strong> on the Conclave contact list
          yet. Introduce yourself below so the leadership team knows who this idea
          comes from — we&rsquo;ll add you to the list.
        </p>
      )}

      {!known.found && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label-omega" htmlFor="idea-name">
                Full Name <span aria-hidden>*</span>
              </label>
              <input id="idea-name" name="name" type="text" required autoComplete="name" className="input-omega" />
            </div>
            <div>
              <label className="label-omega" htmlFor="idea-chapter">
                Chapter <span aria-hidden>*</span>
              </label>
              <input
                id="idea-chapter"
                name="chapter"
                type="text"
                required
                placeholder="e.g. Chi Lambda Lambda"
                className="input-omega"
              />
            </div>
          </div>
          <div>
            <label className="label-omega" htmlFor="idea-phone">
              Phone (optional)
            </label>
            <input id="idea-phone" name="phone" type="tel" autoComplete="tel" className="input-omega" />
          </div>
        </>
      )}

      {folders.length > 0 && (
        <div>
          <label className="label-omega" htmlFor="idea-folder">
            Subject Area (optional)
          </label>
          <select id="idea-folder" name="folder_id" defaultValue="" className="input-omega">
            <option value="">Choose a subject area…</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <p className="mt-1 font-sans text-xs text-neutral-500">
            Where you think this belongs — the leadership team may re-file it.
          </p>
        </div>
      )}
      <div>
        <label className="label-omega" htmlFor="idea-title">
          Short Title (optional)
        </label>
        <input id="idea-title" name="title" type="text" maxLength={200} className="input-omega" />
      </div>
      <div>
        <label className="label-omega" htmlFor="idea-body">
          Your Idea <span aria-hidden>*</span>
        </label>
        <textarea
          id="idea-body"
          name="idea"
          required
          rows={6}
          maxLength={5000}
          placeholder="What should the leadership team consider for the 86th Grand Conclave?"
          className="input-omega"
        />
      </div>

      {error && <ErrorBanner message={error} />}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} className="btn-gold disabled:opacity-60">
          {busy ? "Submitting…" : "Submit Idea"}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep("email");
            setError(null);
          }}
          className="font-sans text-sm font-semibold text-omega-purple underline underline-offset-4"
        >
          Use a different email
        </button>
      </div>
    </form>
  );
}
