export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-secondary/60 border-b">
      <div className="container-x py-14 md:py-20">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold text-accent md:text-5xl text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
