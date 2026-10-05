"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { aboutStories } from "@/data/about";

export function BeyondCodeCarousel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduceMotion = useReducedMotion();
  const region = useRef<HTMLDivElement>(null);
  const inView = useInView(region, { amount: 0.15 });
  const touchStart = useRef(0);
  const total = aboutStories.length;
  const go = useCallback(
    (direction: number) =>
      setActive((value) => (value + direction + total) % total),
    [total],
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
    if (reduceMotion || hovered || focused || !inView || total < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, hovered, focused, inView, total, go]);

  const slide = aboutStories[active];
  const transition = {
    duration: reduceMotion ? 0 : 0.45,
    ease: "easeOut" as const,
  };

  return (
    <div
      ref={region}
      role="region"
      aria-roledescription="carousel"
      aria-label="Stories beyond the code"
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
      <div className="border-border bg-surface grid overflow-hidden rounded-2xl border lg:min-h-[620px] lg:grid-cols-[minmax(0,.43fr)_minmax(0,.57fr)]">
        <div className="flex min-h-[340px] flex-col justify-between p-7 sm:p-10 lg:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id + "-copy"}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={transition}
            >
              <p className="text-accent text-xs font-semibold tracking-[.2em] uppercase">
                {slide.category}
              </p>
              <h3 className="mt-8 max-w-md text-4xl leading-[1.05] font-semibold tracking-[-.05em] sm:text-5xl">
                {slide.title}
              </h3>
              <p className="text-secondary mt-7 max-w-md text-base leading-8">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-12 flex items-center justify-between gap-5">
            <p className="text-secondary font-mono text-sm">
              <span className="text-foreground">
                {String(active + 1).padStart(2, "0")}
              </span>{" "}
              / {String(total).padStart(2, "0")}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous story"
                className="border-border hover:border-accent focus-visible:border-accent flex size-11 items-center justify-center rounded-full border transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next story"
                className="border-border hover:border-accent focus-visible:border-accent flex size-11 items-center justify-center rounded-full border transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div
          className="relative min-h-[440px] overflow-hidden sm:min-h-[560px] lg:min-h-full"
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
              key={slide.image}
              className="absolute inset-0"
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -24 }}
              transition={transition}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 57vw"
                className="object-cover"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
      </div>
      <div className="mt-5 flex gap-2" aria-label="Choose a story">
        {aboutStories.map((story, index) => (
          <button
            key={story.id}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show story ${index + 1}: ${story.category}`}
            aria-current={index === active ? "true" : undefined}
            className="group flex h-8 flex-1 items-center"
          >
            <span className="bg-border group-hover:bg-secondary relative h-[2px] w-full transition-colors">
              {index === active && (
                <motion.span
                  layoutId="beyond-active-line"
                  className="bg-accent absolute inset-0"
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Story {active + 1} of {total}: {slide.title}
      </p>
      <Image
        src={aboutStories[(active + 1) % total].image}
        alt=""
        width={864}
        height={1536}
        sizes="(max-width: 1023px) 100vw, 57vw"
        loading="eager"
        aria-hidden="true"
        className="sr-only"
      />
    </div>
  );
}
