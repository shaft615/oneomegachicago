interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="bg-regalia-gradient text-white relative overflow-hidden">
      <div
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-omega-gold/15 blur-3xl"
        aria-hidden
      />
      <div className="container-omega relative py-16 sm:py-20 lg:py-24">
        {eyebrow && (
          <span className="eyebrow text-omega-gold">{eyebrow}</span>
        )}
        <h1 className="heading-display !text-white mt-3 max-w-3xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl font-sans text-base sm:text-lg text-white/85 leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-6 divider-gold" />
      </div>
    </section>
  );
}
