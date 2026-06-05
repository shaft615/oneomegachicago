import Link from "next/link";
import { CONCLAVE_NUMBER } from "@/lib/conclave";
import { DONATE_URL } from "@/lib/donate";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-regalia-gradient text-white">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #fff 0, transparent 40%), radial-gradient(circle at 80% 80%, #B7A57A 0, transparent 40%)",
        }}
        aria-hidden
      />
      <div
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-omega-gold/15 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />

      <div className="container-omega relative section-omega grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="eyebrow text-omega-gold">
            One Omega Foundation, Inc.
          </span>
          <h1 className="heading-display !text-white">
            Thirteen chapters.
            <br />
            <span className="text-omega-gold">One Chicago.</span>
            <br />
            One Omega.
          </h1>
          <p className="font-sans text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
            The coordinating Foundation uniting Chicagoland chapters of Omega
            Psi Phi Fraternity, Inc. — and the host entity for the {CONCLAVE_NUMBER}th Grand
            Conclave, returning to Chicago in 2028.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://portal.oneomegachicago.org/committees"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              aria-label="Serve on a Conclave committee (opens in a new tab)"
            >
              Serve on a Committee
            </a>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-omega-gold text-omega-gold hover:bg-omega-gold hover:text-omega-purple-dark inline-flex items-center gap-2"
              aria-label="Donate to support the 2028 Grand Conclave (opens in a new tab)"
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
            <Link
              href="/conclave-2028"
              className="btn border border-omega-gold text-omega-gold hover:bg-omega-gold hover:text-omega-purple-dark"
            >
              Conclave 2028
            </Link>
            <Link
              href="/about"
              className="btn border border-white/40 text-white hover:bg-white hover:text-omega-purple-dark"
            >
              About the Foundation
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-3xl bg-omega-gold/30 blur-xl" />
            <div className="relative rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 p-8 shadow-regalia">
              <p className="eyebrow text-omega-gold">Hosting in 2028</p>
              <p className="mt-3 font-display text-5xl font-semibold tracking-regalia leading-none">
                86<sup className="text-3xl text-omega-gold">th</sup>
              </p>
              <p className="mt-1 font-display text-2xl tracking-regalia">
                Grand Conclave
              </p>
              <div className="my-5 divider-gold" />
              <ul className="space-y-2 font-sans text-sm text-white/85">
                <li className="flex items-center justify-between">
                  <span className="text-white/60">Host City</span>
                  <span className="font-medium">Chicago, IL</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/60">Host Entity</span>
                  <span className="font-medium">One Omega Foundation</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-white/60">DBA</span>
                  <span className="font-medium">Chicago Conclave 2028</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
