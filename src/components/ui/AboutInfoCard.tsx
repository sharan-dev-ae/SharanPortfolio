import type { AboutCard } from "@/data/about";
import { cn } from "@/lib/utils";

interface AboutInfoCardProps {
  card: AboutCard;
  index: number;
  featured?: boolean;
}

export function AboutInfoCard({
  card,
  index,
  featured = false,
}: AboutInfoCardProps) {
  return (
    <article
      className={cn(
        "group border-border bg-surface hover:border-accent/40 rounded-xl border p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 motion-reduce:transform-none sm:p-8",
        featured && "border-accent/25 bg-surface-secondary md:col-span-2",
      )}
    >
      <p className="text-accent text-xs font-medium tracking-[0.18em]">
        0{index + 1} / ABOUT
      </p>
      <h3
        className={cn(
          "text-foreground mt-8 font-semibold tracking-tight",
          featured ? "text-2xl sm:text-3xl" : "text-xl",
        )}
      >
        {card.title}
      </h3>
      <p className="text-secondary mt-4 max-w-3xl text-sm leading-7 sm:text-base">
        {card.body}
      </p>
    </article>
  );
}
