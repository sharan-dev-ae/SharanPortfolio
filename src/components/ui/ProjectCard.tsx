import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { PROJECTS_BASE_PATH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface ProjectCardProps {
  project: Project;
  index: number;
  prominent?: boolean;
}

export function ProjectCard({
  project,
  index,
  prominent = false,
}: ProjectCardProps) {
  const href = `${PROJECTS_BASE_PATH}/${project.slug}`;
  return (
    <article
      className={cn(
        "group border-border bg-surface hover:border-secondary/60 overflow-hidden rounded-xl border transition-colors",
        prominent && "lg:grid lg:grid-cols-[1.1fr_1fr]",
        index === 0 && "border-accent/40",
      )}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={cn(
          "border-border bg-surface-secondary relative block overflow-hidden border-b",
          prominent && "lg:border-r lg:border-b-0",
        )}
      >
        <Image
          src={project.image}
          alt=""
          width={1200}
          height={675}
          className={cn(
            "aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]",
            prominent && "lg:aspect-auto lg:h-full",
          )}
        />
        <span className="bg-background/70 text-foreground absolute top-5 left-5 rounded border border-white/10 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] uppercase backdrop-blur-sm">
          Concept preview / 0{index + 1}
        </span>
      </Link>
      <div
        className={cn(
          "flex flex-col p-6 sm:p-8",
          prominent && "lg:justify-center lg:p-10",
        )}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{project.category}</Badge>
          {project.year && (
            <span className="text-secondary text-xs">{project.year}</span>
          )}
        </div>
        <h3
          className={cn(
            "mt-6 font-semibold tracking-tight",
            prominent
              ? index === 0
                ? "text-3xl sm:text-4xl"
                : "text-2xl sm:text-3xl"
              : "text-xl",
          )}
        >
          <Link href={href} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="text-secondary mt-3 max-w-2xl leading-7">
          {project.shortDescription}
        </p>
        <dl className="border-border mt-6 space-y-3 border-t pt-5 text-sm">
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
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-secondary text-xs tracking-[0.12em] uppercase">
                My role
              </dt>
              <dd className="text-foreground/85 mt-1">{project.role}</dd>
            </div>
            <div>
              <dt className="text-secondary text-xs tracking-[0.12em] uppercase">
                Technical focus
              </dt>
              <dd className="text-foreground/85 mt-1">
                {project.technicalFocus}
              </dd>
            </div>
          </div>
        </dl>
        {project.technologies.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="border-border text-secondary rounded border px-2.5 py-1 text-xs"
              >
                {technology}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={href}
          className="text-foreground hover:text-accent mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors"
        >
          View case study <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}
