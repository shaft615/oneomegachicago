const PRINCIPLES = [
  {
    title: "Manhood",
    body: "Modeling integrity, accountability, and lifelong character development across our membership.",
  },
  {
    title: "Scholarship",
    body: "Investing in education through scholarships, mentorship, and academic partnerships across Chicagoland.",
  },
  {
    title: "Perseverance",
    body: "Sustaining our work through every season — building institutions that outlast any single chapter year.",
  },
  {
    title: "Uplift",
    body: "Centering service to the community in everything the Foundation and its chapters undertake.",
  },
];

export default function MissionBlock() {
  return (
    <section className="section-omega bg-white">
      <div className="container-omega grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-5">
          <span className="eyebrow">Our Mission</span>
          <h2 className="heading-section">
            A coordinating Foundation for thirteen chapters — and the city that
            raised them.
          </h2>
          <div className="divider-gold" />
          <p className="font-sans text-base leading-relaxed text-neutral-700">
            One Omega Foundation, Inc. is an Illinois not-for-profit
            corporation that coordinates the work of thirteen Chicagoland
            chapters of Omega Psi Phi Fraternity, Inc. We pool capacity, amplify
            impact, and steward the host structure for the 86th Grand Conclave
            in 2028.
          </p>
          <p className="font-sans text-sm italic text-neutral-500">
            501(c)(3) status pending. Operating under the DBA{" "}
            <span className="font-semibold not-italic text-omega-purple-dark">
              Chicago Conclave 2028
            </span>{" "}
            for host activities.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-omega-purple/10 text-omega-purple font-display text-base font-semibold">
                    {p.title.charAt(0)}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-omega-purple-dark">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
