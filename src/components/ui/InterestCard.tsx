import type { Interest } from "@/data/about";
import { cn } from "@/lib/utils";

export function InterestCard({
  interest,
  index,
  featured = false,
}: {
  interest: Interest;
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "border-border bg-surface/70 hover:border-accent/40 h-full min-h-44 rounded-xl border p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 motion-reduce:transform-none",
        featured && "border-accent/20 bg-surface-secondary min-h-52 sm:p-8",
      )}
    >
      <p className="text-accent text-xs font-medium tracking-[0.18em]">
        0{index + 1} / BEYOND WORK
      </p>
      <h3
        className={cn(
          "text-foreground mt-8 font-semibold tracking-tight",
          featured ? "text-2xl" : "text-xl",
        )}
      >
        {interest.name}
      </h3>
      <p className="text-secondary mt-3 max-w-xl text-sm leading-7">
        {interest.detail}
      </p>
    </article>
  );
}
