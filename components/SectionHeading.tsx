interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span className="h-px w-8 bg-destructive" />
          <span className="text-sm font-semibold uppercase tracking-wider text-destructive">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-destructive" />
        </div>
      )}
      <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-muted-foreground text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
