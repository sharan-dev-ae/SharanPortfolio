import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-accent mb-4 text-xs font-medium tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="text-foreground text-3xl leading-tight font-semibold tracking-[-0.045em] sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="text-secondary mt-5 text-base leading-7">{description}</p>
      )}
    </div>
  );
}
