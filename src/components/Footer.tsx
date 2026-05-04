import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { DONATE_URL } from "@/lib/donate";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-regalia-gradient text-white">
      <div className="container-omega py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/OneOmegaClean.png"
              alt="One Omega Foundation — Chicagoland"
              width={256}
              height={256}
              className="h-16 w-16 object-contain rounded-full bg-white/95 p-1"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold tracking-regalia">
                One Omega Foundation, Inc.
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-omega-gold">
                d/b/a Chicago Conclave 2028
              </span>
            </div>
          </div>
          <p className="font-sans text-sm text-white/80 max-w-md leading-relaxed">
            Illinois not-for-profit corporation serving as the coordinating
            entity for thirteen Chicagoland chapters of Omega Psi Phi
            Fraternity, Inc., and host of the 86th Grand Conclave in 2028.
          </p>
          <p className="font-sans text-xs text-white/60 italic">
            501(c)(3) status pending.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-white tracking-regalia mb-4">
            Explore
          </h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-white/80 hover:text-omega-gold transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-white tracking-regalia mb-4">
            Connect
          </h3>
          <ul className="space-y-2 font-sans text-sm text-white/80">
            <li>
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-omega-gold hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                  aria-hidden
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Donate
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-omega-gold transition-colors"
              >
                General Inquiries
              </Link>
            </li>
            <li>
              <Link
                href="/contact?type=media"
                className="hover:text-omega-gold transition-colors"
              >
                Media Requests
              </Link>
            </li>
            <li>
              <Link
                href="/contact?type=sponsor"
                className="hover:text-omega-gold transition-colors"
              >
                Sponsorship
              </Link>
            </li>
            <li>
              <Link
                href="/que-years-eve"
                className="hover:text-omega-gold transition-colors"
              >
                Que Year&rsquo;s Eve Sponsorship
              </Link>
            </li>
            <li>
              <Link
                href="/contact?type=volunteer"
                className="hover:text-omega-gold transition-colors"
              >
                Volunteer
              </Link>
            </li>
            <li className="pt-2">
              <a
                href="https://oneomegachicago.org"
                className="text-omega-gold hover:underline underline-offset-4"
              >
                oneomegachicago.org
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-omega py-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-white/60">
            © {year} One Omega Foundation, Inc. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/60">
            Friendship is essential to the soul.
          </p>
        </div>
      </div>
    </footer>
  );
}
