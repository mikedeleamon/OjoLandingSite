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
          <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3 font-outfit">
            {eyebrow}
          </p>
        )}
        <h1 className="font-outfit font-bold text-4xl md:text-5xl text-white text-shadow mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white text-base md:text-lg leading-relaxed max-w-xl mx-auto font-dm">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
