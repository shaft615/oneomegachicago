"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav";

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

        <div className="hidden lg:block">
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
            <Link href="/conclave-2028" className="btn-gold mt-2">
              Sponsor Conclave
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
