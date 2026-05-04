"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";
import { DONATE_URL } from "@/lib/donate";

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-chapter"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-omega flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="One Omega Foundation home"
        >
          <Image
            src="/OneOmegaClean.png"
            alt="One Omega Foundation — Chicagoland"
            width={256}
            height={256}
            priority
            className="h-12 w-12 object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-omega-purple-dark tracking-regalia">
              One Omega Foundation
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-omega-gold">
              Chicago Conclave 2028
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-omega-purple text-white shadow-regalia"
                  : "text-omega-purple-dark hover:bg-omega-purple/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-omega-purple-dark hover:text-omega-purple transition-colors"
            aria-label="Donate (opens in a new tab)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-omega-gold"
              aria-hidden
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Donate
          </a>
          <Link href="/conclave-2028" className="btn-gold">
            Sponsor Conclave
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-omega-purple/20 text-omega-purple-dark hover:bg-omega-purple/10 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-omega-purple/10 bg-white">
          <nav
            className="container-omega flex flex-col py-4 gap-1"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-xl font-sans text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-omega-purple text-white"
                    : "text-omega-purple-dark hover:bg-omega-purple/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gilded-gradient text-omega-purple-dark px-4 py-3 font-sans text-base font-semibold shadow-gilded ring-1 ring-omega-purple-dark/15"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Donate
            </a>
            <Link href="/conclave-2028" className="btn-outline">
              Sponsor Conclave
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
