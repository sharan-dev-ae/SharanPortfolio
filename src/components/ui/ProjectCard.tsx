import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { PROJECTS_BASE_PATH } from "@/lib/constants";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const href = `${PROJECTS_BASE_PATH}/${project.slug}`;
  const visuals = (project.visuals?.length
    ? project.visuals
    : [{ type: "cover", label: project.title, src: project.image }]
  ).slice(0, 3);
  return (
    <article className={`group border-border bg-surface flex h-full flex-col rounded-xl border p-5 transition-colors hover:border-secondary/60 sm:p-6 ${index === 0 ? "border-accent/40" : ""}`}>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{project.category}</Badge>
          {project.year && (
            <span className="text-secondary text-xs">{project.year}</span>
          )}
        </div>
        <h3 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
          <Link href={href} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="text-secondary mt-3 text-sm leading-6">
          {project.homepageSummary ?? project.shortDescription}
        </p>
        <dl className="border-border mt-5 grid gap-4 border-t pt-5 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-secondary text-xs tracking-[0.12em] uppercase">
              Business problem
            </dt>
            <dd className="text-foreground/85 mt-1">
              {project.businessProblem}
            </dd>
          </div>
          <div>
            <dt className="text-secondary text-xs tracking-[0.12em] uppercase">
              Solution
            </dt>
            <dd className="text-foreground/85 mt-1">{project.solution}</dd>
          </div>
        </dl>
        <div className="mt-5"><p className="text-accent text-[.65rem] font-semibold tracking-[.16em] uppercase">Workflow library</p><div className="mt-3 grid grid-cols-3 gap-2">{visuals.map((visual) => <div key={visual.type} className="border-border bg-surface-secondary relative aspect-[4/3] overflow-hidden rounded-md border">{visual.src && <Image src={visual.src} alt={visual.alt ?? visual.label} fill sizes="(max-width: 767px) 29vw, 14vw" className="object-contain p-1"/>}</div>)}</div></div>
        <Link
          href={href}
          className="text-foreground hover:text-accent mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors"
        >
          View case study <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}
