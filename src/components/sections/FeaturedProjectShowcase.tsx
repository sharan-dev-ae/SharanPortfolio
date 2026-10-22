import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";

export function FeaturedProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="border-border divide-border divide-y border-y">
      {projects.map((project, index) => {
        const visuals = (project.visuals?.length
          ? project.visuals
          : [{ type: "cover", label: project.title, src: project.image }]
        ).slice(0, 3);

        return (
          <article
            key={project.slug}
            className="grid gap-8 py-10 first:pt-8 last:pb-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,.7fr)] lg:gap-14 lg:py-14"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-accent font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-secondary text-[0.68rem] font-semibold tracking-[0.16em] uppercase">
                  {project.category}
                </span>
              </div>

              <h3 className="mt-4 max-w-2xl text-2xl leading-tight font-semibold tracking-[-0.04em] sm:text-3xl">
                {project.title}
              </h3>
              <p className="text-secondary mt-4 max-w-2xl text-sm leading-7 sm:text-base">
                {project.homepageSummary ?? project.shortDescription}
              </p>

              <dl className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="border-border border-l pl-4">
                  <dt className="text-secondary text-[0.68rem] font-semibold tracking-[0.15em] uppercase">
                    The challenge
                  </dt>
                  <dd className="mt-2 text-sm leading-6">
                    {project.businessProblem}
                  </dd>
                </div>
                <div className="border-border border-l pl-4">
                  <dt className="text-secondary text-[0.68rem] font-semibold tracking-[0.15em] uppercase">
                    What I built
                  </dt>
                  <dd className="mt-2 text-sm leading-6">{project.solution}</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:text-accent inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                >
                  Read the case study <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <span className="text-secondary text-xs">{project.role}</span>
              </div>
            </div>

            <div className="self-start">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-accent text-[0.68rem] font-semibold tracking-[0.18em] uppercase">
                    Workflow library
                  </p>
                  <p className="text-secondary mt-1 text-xs leading-5">
                    Small visual references from the system.
                  </p>
                </div>
                <span className="text-secondary font-mono text-[0.65rem]">
                  {String(visuals.length).padStart(2, "0")} views
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {visuals.map((visual) => (
                  <figure key={visual.type} className="min-w-0">
                    <div className="border-border bg-surface-secondary relative aspect-[4/3] overflow-hidden rounded-lg border">
                      {visual.src && (
                        <Image
                          src={visual.src}
                          alt={visual.alt ?? visual.label}
                          fill
                          sizes="(max-width: 1023px) 30vw, 11vw"
                          className="object-contain p-1.5 transition-transform duration-300 hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <figcaption className="text-secondary mt-2 line-clamp-2 text-[0.66rem] leading-4">
                      {visual.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
