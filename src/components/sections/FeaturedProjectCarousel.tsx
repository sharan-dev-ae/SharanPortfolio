"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectVisualCarousel } from "@/components/sections/ProjectVisualCarousel";
import type { Project } from "@/types/project";

export function FeaturedProjectCarousel({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const touchStart = useRef(0);
  const region = useRef<HTMLDivElement>(null);
  const inView = useInView(region, { amount: 0.15 });
  const project = projects[active];
  const go = (step: number) =>
    setActive((value) => (value + step + projects.length) % projects.length);
  useEffect(() => {
    if (reducedMotion || hovered || focused || !inView || projects.length < 2)
      return;
    const duration = Math.max(1, project.visuals?.length ?? 1) * 5000;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((value) => (value + 1) % projects.length);
    }, duration);
    return () => window.clearInterval(timer);
  }, [
    active,
    reducedMotion,
    hovered,
    focused,
    inView,
    projects.length,
    project.visuals?.length,
  ]);
  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
      }}
      className="group border-border hover:border-accent/40 bg-surface rounded-2xl border p-4 transition-colors outline-none sm:p-7 lg:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug + "-heading"}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.24 }}
          >
            <p className="text-accent text-xs font-semibold tracking-[.19em] uppercase">
              Featured project · {String(active + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-.05em] sm:text-4xl">
              {project.title}
            </h3>
            <p className="text-secondary mt-2 text-sm">{project.category}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="border-border hover:border-accent flex size-11 items-center justify-center rounded-full border"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="border-border hover:border-accent flex size-11 items-center justify-center rounded-full border"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div
        className="border-border mt-5 border-t pt-5"
        onTouchStart={(event) => {
          touchStart.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const delta = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={reducedMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: "easeOut" }}
            className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,.34fr)_minmax(0,.66fr)] lg:items-center"
          >
            <div className="flex flex-col items-start">
              <p className="text-secondary max-w-xl text-sm leading-6 sm:text-base">
                {project.homepageSummary ?? project.shortDescription}
              </p>
              <p className="text-accent mt-4 hidden max-w-lg text-sm leading-6 lg:block">
                {project.highlight}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                className="text-foreground hover:text-accent mt-5 inline-flex items-center gap-2 text-sm font-semibold [&_svg]:transition-transform group-hover:[&_svg]:translate-x-1"
              >
                View case study <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div
              className="min-w-0 transition-transform duration-300 motion-safe:group-hover:translate-x-2"
              onTouchStart={(event) => event.stopPropagation()}
              onTouchEnd={(event) => event.stopPropagation()}
            >
              <ProjectVisualCarousel
                key={project.slug}
                visuals={project.visuals ?? []}
                label={`${project.title} images`}
                compact
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex gap-2" aria-label="Choose a project">
        {projects.map((item, index) => (
          <button
            type="button"
            key={item.slug}
            onClick={() => setActive(index)}
            aria-label={`Show project ${index + 1}: ${item.title}`}
            aria-current={index === active ? "true" : undefined}
            className={`h-1 flex-1 rounded-full ${index === active ? "bg-accent" : "bg-border hover:bg-secondary"}`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Project {active + 1} of {projects.length}: {project.title}
      </p>
    </div>
  );
}
