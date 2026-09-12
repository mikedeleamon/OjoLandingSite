interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="pt-32 pb-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {eyebrow && (
          <p className="text-ink-primary text-xs font-semibold uppercase tracking-widest mb-3 font-outfit">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl text-ink-primary text-shadow mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-ink-secondary text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
