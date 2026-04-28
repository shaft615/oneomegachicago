import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";

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
