"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  ProjectConceptVisual,
  type VisualKind,
} from "@/components/ui/ProjectConceptVisual";

export function ProjectVisualCarousel({
  visuals,
  label,
  compact = false,
}: {
  visuals: Array<{ type: string; label: string; src?: string; alt?: string }>;
  label: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotion();
  const region = useRef<HTMLDivElement>(null);
  const inView = useInView(region, { amount: 0.15 });
  const touchStart = useRef(0);
  const go = useCallback(
    (delta: number) =>
      setActive((value) => (value + delta + visuals.length) % visuals.length),
    [visuals.length],
  );
  useEffect(() => {
    const node = region.current;
    if (!node) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [go]);
  useEffect(() => {
    if (reduceMotion || hovered || focused || !inView || visuals.length < 2)
      return;
    const timer = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, hovered, focused, inView, visuals.length, go]);
  const visual = visuals[active];
  const nextVisual = visuals[(active + 1) % visuals.length];
  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setFocused(false);
      }}
      className="outline-none"
    >
      <div
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={visual.type}
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
          >
            {visual.src ? (
              <div
                className={`relative mx-auto aspect-video w-full overflow-hidden ${compact ? "max-w-[311px] sm:max-w-[427px] lg:max-w-[498px]" : ""}`}
              >
                <Image
                  src={visual.src}
                  alt={visual.alt ?? visual.label}
                  fill
                  sizes={
                    compact
                      ? "(max-width: 767px) 100vw, 65vw"
                      : "(max-width: 767px) 100vw, 92vw"
                  }
                  className="object-contain"
                  priority={active === 0 && !compact}
                />
                {!compact && (
                  <a
                    href={visual.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background/85 text-foreground hover:text-accent absolute right-3 bottom-3 rounded-md border border-white/15 px-3 py-1.5 text-xs backdrop-blur-sm"
                  >
                    Open full image
                  </a>
                )}
              </div>
            ) : (
              <div className={compact ? "max-h-[280px] overflow-y-auto" : ""}>
                <ProjectConceptVisual kind={visual.type as VisualKind} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-secondary font-mono text-sm">
          <span className="text-foreground">
            {String(active + 1).padStart(2, "0")}
          </span>{" "}
          / {String(visuals.length).padStart(2, "0")}{" "}
          <span className="ml-3 hidden sm:inline">{visual.label}</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous visual"
            className="border-border hover:border-accent flex size-11 items-center justify-center rounded-full border"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next visual"
            className="border-border hover:border-accent flex size-11 items-center justify-center rounded-full border"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {visuals.map((item, index) => (
          <button
            type="button"
            key={item.type}
            onClick={() => setActive(index)}
            aria-label={`Show visual ${index + 1}: ${item.label}`}
            aria-current={index === active ? "true" : undefined}
            className={`h-1 flex-1 rounded-full ${index === active ? "bg-accent" : "bg-border hover:bg-secondary"}`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Visual {active + 1} of {visuals.length}: {visual.label}
      </p>
      {nextVisual?.src && (
        <Image
          src={nextVisual.src}
          alt=""
          width={1600}
          height={900}
          sizes={
            compact
              ? "(max-width: 767px) 100vw, 65vw"
              : "(max-width: 767px) 100vw, 92vw"
          }
          loading="eager"
          aria-hidden="true"
          className="sr-only"
        />
      )}
    </div>
  );
}
