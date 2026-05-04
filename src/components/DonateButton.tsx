const DONATE_URL =
  "https://www.zeffy.com/en-US/donation-form/donate-to-support-the-2028-grand-conclave";

/**
 * Floating donate button — fixed to the bottom-right viewport corner.
 * Renders inside RootLayout so it appears on every page. External link
 * opens in a new tab, no referrer leak. The Footer also carries an
 * inline Donate link for accessibility / discoverability.
 */
export default function DonateButton() {
  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Donate to support the 2028 Grand Conclave (opens in a new tab)"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 inline-flex items-center gap-2 rounded-full bg-gilded-gradient text-omega-purple-dark px-5 py-3 sm:px-6 sm:py-3.5 font-sans text-sm font-semibold tracking-wide shadow-regalia ring-2 ring-omega-purple-dark/15 hover:scale-105 hover:shadow-gilded transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-omega-purple"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 sm:h-5 sm:w-5"
        aria-hidden
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>Donate</span>
    </a>
  );
}
