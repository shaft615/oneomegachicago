export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgorjngd";

export const FORM_SUCCESS_MESSAGE =
  "Thank you — your message has been received. A representative will be in touch shortly.";

export const FORM_FALLBACK_EMAIL = "events@oneomegachicago.org";

export type FormStatus = "idle" | "submitting" | "success" | "error";

export async function submitToFormspree(
  payload: Record<string, FormDataEntryValue>
): Promise<boolean> {
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.ok;
}
