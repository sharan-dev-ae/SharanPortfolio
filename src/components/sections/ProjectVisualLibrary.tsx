import Image from "next/image";
import type { Project } from "@/types/project";

export function ProjectVisualLibrary({
  visuals,
  label = "Workflow library",
}: {
  visuals: NonNullable<Project["visuals"]>;
  label?: string;
}) {
  if (!visuals.length) return null;

  return (
    <section className="border-border mt-10 border-t pt-7" aria-label={label}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-accent text-xs font-semibold tracking-[.18em] uppercase">
            Workflow library
          </p>
          <p className="text-secondary mt-2 text-sm">
            Compact visual references supporting the case study explanation.
          </p>
        </div>
        <p className="text-secondary font-mono text-xs">
          {String(visuals.length).padStart(2, "0")} views
        </p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visuals.map((visual) => (
          <figure key={visual.type} className="min-w-0">
            <div className="border-border bg-surface-secondary relative aspect-[4/3] overflow-hidden rounded-lg border">
              {visual.src && (
                <Image
                  src={visual.src}
                  alt={visual.alt ?? visual.label}
                  fill
                  sizes="(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 20vw"
                  className="object-contain p-2"
                />
              )}
            </div>
            <figcaption className="text-secondary mt-2 text-xs leading-5">
              {visual.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
