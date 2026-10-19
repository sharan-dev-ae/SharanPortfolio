"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import type { Project } from "@/types/project";

export function FeaturedProjectCarousel({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState(0);
  const [activeVisual, setActiveVisual] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = useReducedMotion();
  const region = useRef<HTMLDivElement>(null);
  const inView = useInView(region, { amount: 0.2 });
  const project = projects[activeProject];
  const visuals = project.visuals?.length
    ? project.visuals
    : [{ type: "cover", label: project.title, src: project.image }];
  const visual = visuals[activeVisual] ?? visuals[0];

  const chooseProject = useCallback((index: number) => {
    setActiveProject(index);
    setActiveVisual(0);
  }, []);

  const moveVisual = useCallback(
    (step: number) => {
      setActiveVisual(
        (current) => (current + step + visuals.length) % visuals.length,
      );
    },
    [visuals.length],
  );

  useEffect(() => {
    if (
      reducedMotion ||
      paused ||
      interacting ||
      !inView ||
      projects.length < 2
    )
      return;

    const timer = window.setTimeout(() => {
      if (document.hidden) return;
      if (activeVisual < visuals.length - 1) {
        setActiveVisual((current) => current + 1);
      } else {
        setActiveProject((current) => (current + 1) % projects.length);
        setActiveVisual(0);
      }
    }, 4800);

    return () => window.clearTimeout(timer);
  }, [
    activeProject,
    activeVisual,
    inView,
    interacting,
    paused,
    projects.length,
    reducedMotion,
    visuals.length,
  ]);

  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setInteracting(false);
        }
      }}
      className="border-border grid overflow-hidden border-y lg:grid-cols-[21rem_minmax(0,1fr)]"
    >
      <div className="border-border bg-surface/45 border-b lg:border-r lg:border-b-0">
        <div className="border-border flex items-center justify-between border-b px-5 py-4 sm:px-6">
          <p className="text-secondary text-[0.68rem] font-semibold tracking-[0.2em] uppercase">
            Projects / {String(projects.length).padStart(2, "0")}
          </p>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              aria-label={
                paused ? "Resume project carousel" : "Pause project carousel"
              }
              className="text-secondary hover:text-foreground flex size-8 items-center justify-center rounded-full transition-colors"
            >
              {paused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          )}
        </div>

        <div className="flex overflow-x-auto lg:block lg:overflow-visible">
          {projects.map((item, index) => {
            const selected = index === activeProject;
            return (
              <button
                type="button"
                key={item.slug}
                onClick={() => chooseProject(index)}
                aria-current={selected ? "true" : undefined}
                className={`border-border relative min-w-[16rem] border-r px-5 py-5 text-left transition-colors last:border-r-0 lg:w-full lg:min-w-0 lg:border-r-0 lg:border-b lg:px-6 ${
                  selected ? "bg-surface-secondary" : "hover:bg-surface/70"
                }`}
              >
                <span
                  className={`font-mono text-xs ${selected ? "text-accent" : "text-secondary"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 block text-sm leading-5 font-semibold">
                  {item.title}
                </span>
                <span className="text-secondary mt-1.5 block text-xs leading-5">
                  {item.technicalFocus}
                </span>
                {selected && (
                  <motion.span
                    layoutId="active-project-marker"
                    className="bg-accent absolute inset-y-0 left-0 w-0.5"
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-w-0 px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
                  {project.category}
                </p>
                <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.045em] sm:text-3xl xl:text-4xl">
                  {project.title}
                </h3>
                <p className="text-secondary mt-3 max-w-2xl text-sm leading-6 sm:text-base">
                  {project.homepageSummary ?? project.shortDescription}
                </p>
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="border-border hover:border-accent hover:text-accent inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors xl:self-auto"
              >
                View case study <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-7 min-w-0">
              <div className="bg-background relative aspect-video w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${project.slug}-${visual.type}`}
                    initial={
                      reducedMotion ? false : { opacity: 0, scale: 0.99 }
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.35 }}
                    className="absolute inset-0"
                  >
                    {visual.src && (
                      <Image
                        src={visual.src}
                        alt={visual.alt ?? visual.label}
                        fill
                        sizes="(max-width: 1023px) 100vw, 75vw"
                        className="object-contain"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-foreground text-sm font-medium">
                    {visual.label}
                  </p>
                  <p className="text-secondary mt-1 font-mono text-xs">
                    {String(activeVisual + 1).padStart(2, "0")} /{" "}
                    {String(visuals.length).padStart(2, "0")}
                  </p>
                </div>
                {visuals.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveVisual(-1)}
                      aria-label="Previous project image"
                      className="border-border hover:border-accent flex size-10 items-center justify-center rounded-full border transition-colors"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveVisual(1)}
                      aria-label="Next project image"
                      className="border-border hover:border-accent flex size-10 items-center justify-center rounded-full border transition-colors"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>

              {visuals.length > 1 && (
                <div
                  className="mt-4 flex gap-1.5"
                  aria-label="Choose project image"
                >
                  {visuals.map((item, index) => (
                    <button
                      type="button"
                      key={item.type}
                      onClick={() => setActiveVisual(index)}
                      aria-label={`Show image ${index + 1}: ${item.label}`}
                      aria-current={index === activeVisual ? "true" : undefined}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        index === activeVisual
                          ? "bg-accent"
                          : "bg-border hover:bg-secondary"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-border mt-6 grid gap-5 border-t pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="text-secondary text-xs tracking-[0.16em] uppercase">
                  My role
                </p>
                <p className="mt-2 text-sm leading-6">{project.role}</p>
              </div>
              {project.technologies.length > 0 && (
                <ul
                  className="flex flex-wrap gap-2 sm:justify-end"
                  aria-label="Technologies"
                >
                  {project.technologies.slice(0, 5).map((technology) => (
                    <li
                      key={technology}
                      className="border-border text-secondary rounded-full border px-3 py-1.5 text-xs"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite">
        Project {activeProject + 1} of {projects.length}: {project.title}. Image{" "}
        {activeVisual + 1} of {visuals.length}: {visual.label}.
      </p>
    </div>
  );
}
