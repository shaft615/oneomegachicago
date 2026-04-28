import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description:
    "One Omega Foundation, Inc. — story, leadership, 501(c)(3) status, and the Chicago Conclave 2028 DBA.",
};

const LEADERSHIP = [
  { role: "Foundation President", name: "TBA" },
  { role: "Vice President", name: "TBA" },
  { role: "Treasurer", name: "TBA" },
  { role: "Secretary", name: "TBA" },
  { role: "Conclave 2028 Chair", name: "TBA" },
  { role: "Council of Basilei Liaison", name: "TBA" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Foundation"
        title="One Foundation. Thirteen chapters. One Chicago."
        description="One Omega Foundation, Inc. is the Illinois not-for-profit corporation that coordinates the work of thirteen Chicagoland chapters of Omega Psi Phi Fraternity, Inc., and serves as host entity for the 86th Grand Conclave."
      />

      <section className="section-omega bg-white">
        <div className="container-omega grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-5">
            <span className="eyebrow">Our Story</span>
            <h2 className="heading-section">
              A coordinating Foundation for the Chicagoland Thirteen.
            </h2>
            <div className="divider-gold" />
            <p className="font-sans text-base leading-relaxed text-neutral-700">
              The Foundation exists to pool resources across thirteen Chicago-area
              chapters of Omega Psi Phi Fraternity, Inc., elevating shared
              programming, scholarship, and civic impact under one banner.
            </p>
            <p className="font-sans text-base leading-relaxed text-neutral-700">
              In 2028, the Foundation also serves as the host entity for the
              International Fraternity&rsquo;s 86th Grand Conclave — a
              gathering of thousands of Omega men in the city of Chicago.
            </p>
          </div>

          <aside className="lg:col-span-5 space-y-4">
            <div className="card p-6">
              <span className="eyebrow">Legal Structure</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-omega-purple-dark">
                Illinois Not-For-Profit Corporation
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-700">
                One Omega Foundation, Inc. is incorporated in the State of
                Illinois as a not-for-profit corporation.
              </p>
            </div>
            <div className="card p-6">
              <span className="eyebrow">Tax Status</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-omega-purple-dark">
                501(c)(3) — Pending
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-700">
                The Foundation has applied for federal tax-exempt recognition.
                Donors should consult counsel regarding deductibility while
                determination is pending.
              </p>
            </div>
            <div className="card p-6">
              <span className="eyebrow">Doing Business As</span>
              <h3 className="mt-2 font-display text-xl font-semibold text-omega-purple-dark">
                Chicago Conclave 2028
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-700">
                The Foundation operates host activities for the 86th Grand
                Conclave under the registered DBA{" "}
                <span className="font-semibold text-omega-purple">
                  Chicago Conclave 2028
                </span>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-omega bg-neutral-50">
        <div className="container-omega">
          <div className="max-w-2xl space-y-3 mb-10">
            <span className="eyebrow">Leadership</span>
            <h2 className="heading-section">Board of Directors</h2>
            <div className="divider-gold" />
            <p className="font-sans text-base leading-relaxed text-neutral-700">
              The Foundation is governed by a Board of Directors drawn from the
              thirteen chapters. Roster forthcoming.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((m) => (
              <div key={m.role} className="card p-6">
                <span className="eyebrow">{m.role}</span>
                <p className="mt-3 font-display text-xl font-semibold text-omega-purple-dark">
                  {m.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
