export const FORMSPREE_FORM_ID = "xgorjngd";
export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

export const FORM_SUCCESS_MESSAGE =
  "Thank you — your message has been received. A representative will be in touch shortly.";

export const FORM_FALLBACK_EMAIL = "events@oneomegachicago.org";

export type FormStatus = "idle" | "submitting" | "success" | "error";

/**
 * POST to a Formspree form, with an automatic same-origin fallback.
 *
 * Some visitors sit behind corporate firewalls, TLS-inspecting antivirus, or
 * request-blocking browser extensions that silently drop a cross-origin POST to
 * formspree.io. The browser surfaces that as a THROWN "Failed to fetch"
 * (net::ERR_EMPTY_RESPONSE) — not an HTTP error status. When the direct call
 * throws, we retry the identical request against our own same-origin
 * /api/forms/<id> route, which relays it to Formspree from the server (see
 * src/app/api/forms/[formId]/route.ts). A same-origin POST to
 * oneomegachicago.org is far less likely to be blocked.
 *
 * We fall back ONLY when the direct call throws. An HTTP error (4xx/5xx) means
 * Formspree received and rejected the submission, so proxying would just
 * reproduce the same rejection.
 *
 * `init` is reused as-is for both attempts. Pass a string or FormData body
 * (both are re-readable) — do not pass a one-shot ReadableStream.
 */
export async function fetchFormspree(
  formId: string,
  init: RequestInit
): Promise<Response> {
  try {
    return await fetch(`https://formspree.io/f/${formId}`, init);
  } catch {
    return await fetch(`/api/forms/${formId}`, init);
  }
}

export async function submitToFormspree(
  payload: Record<string, FormDataEntryValue>
): Promise<boolean> {
  const res = await fetchFormspree(FORMSPREE_FORM_ID, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
}
