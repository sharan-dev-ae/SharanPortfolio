import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

export function FeaturedProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {projects.map((project, index) => {
        const visuals = (project.visuals?.length
          ? project.visuals
          : [{ type: "cover", label: project.title, src: project.image }]
        ).slice(0, 3);

        return (
          <article
            key={project.slug}
            className="border-border bg-surface flex min-w-0 flex-col rounded-xl border p-5 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-secondary truncate text-[0.65rem] font-semibold tracking-[0.14em] uppercase">
                {project.category}
              </span>
            </div>
            <h3 className="mt-4 text-xl leading-tight font-semibold tracking-[-0.035em] sm:text-2xl">
              {project.title}
            </h3>
            <p className="text-secondary mt-3 line-clamp-3 text-sm leading-6">
              {project.homepageSummary ?? project.shortDescription}
            </p>
            <div className="border-border mt-5 border-t pt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-accent text-[0.62rem] font-semibold tracking-[0.16em] uppercase">
                  Workflow library
                </p>
                <span className="text-secondary font-mono text-[0.62rem]">
                  {String(visuals.length).padStart(2, "0")} views
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {visuals.map((visual) => (
                  <div
                    key={visual.type}
                    className="border-border bg-surface-secondary relative aspect-[4/3] overflow-hidden rounded-md border"
                  >
                    {visual.src && (
                      <Image
                        src={visual.src}
                        alt={visual.alt ?? visual.label}
                        fill
                        sizes="(max-width: 767px) 29vw, 14vw"
                        className="object-contain p-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto pt-5">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:text-accent inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              >
                Read case study <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
