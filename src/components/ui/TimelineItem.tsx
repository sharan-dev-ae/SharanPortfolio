import type { Experience } from "@/types/experience";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

export function TimelineItem({
  experience,
  index,
  total,
}: {
  experience: Experience;
  index: number;
  total: number;
}) {
  return (
    <article
      className={cn(
        "bg-surface rounded-xl border p-6 transition-colors duration-300 sm:p-8",
        experience.current
          ? "border-accent/35 hover:border-accent/60"
          : "border-border hover:border-secondary/50",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-accent text-xs font-medium tracking-[0.16em] uppercase">
          Milestone {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
        {experience.current && (
          <Badge className="border-accent/40 bg-accent/10 text-accent">
            Current role
          </Badge>
        )}
      </div>
      <p className="text-secondary mt-5 text-sm">
        {experience.periodLabel ??
          `${experience.startDate} — ${experience.endDate ?? "Present"}`}
      </p>
      <h3 className="text-foreground mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
        {experience.role}
      </h3>
      <p className="text-foreground mt-2 text-base font-medium">
        {experience.company}
      </p>
      <p className="text-secondary mt-1 text-sm">{experience.location}</p>
      <p className="border-border text-secondary mt-6 max-w-3xl border-t pt-6 text-base leading-8">
        {experience.summary}
      </p>
      <ul className="text-secondary marker:text-accent mt-5 max-w-3xl list-disc space-y-2 pl-5 text-sm leading-7">
        {experience.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="mt-8">
        <p className="text-secondary text-xs font-medium tracking-[0.16em] uppercase">
          Technology stack
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <li
              key={technology}
              className="border-border text-secondary hover:border-accent/40 hover:text-foreground rounded-full border px-3 py-1 text-xs transition-colors"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
