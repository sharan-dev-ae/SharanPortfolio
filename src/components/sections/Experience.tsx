"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { experience } from "@/data/experience";
import type { Experience } from "@/types/experience";

function CareerMilestone({ item, index }: { item: Experience; index: number }) {
  const reduceMotion = useReducedMotion();
  const card = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: card,
    offset: ["start 75%", "start 35%"],
  });
  const opacity = useSpring(scrollYProgress, { stiffness: 110, damping: 25 });
  const side =
    index % 2 === 0 ? "lg:col-start-1 lg:pr-16" : "lg:col-start-2 lg:pl-16";
  return (
    <motion.li
      ref={card}
      className="relative grid min-w-0 gap-5 pb-16 pl-12 lg:grid-cols-2 lg:pb-28 lg:pl-0"
      initial={reduceMotion ? false : { opacity: 0.45, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.65, ease: "easeOut" }}
    >
      <motion.span
        aria-hidden="true"
        style={reduceMotion ? undefined : { opacity }}
        className={`border-background bg-accent ring-accent/70 absolute top-4 left-[8px] z-10 size-5 rounded-full border-4 ring-1 lg:left-1/2 lg:-translate-x-1/2 ${item.current ? "shadow-[0_0_18px_rgba(165,180,252,.45)]" : ""}`}
      />
      <span
        className="text-accent/60 font-mono text-6xl font-semibold tracking-[-.08em] lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2 lg:text-7xl"
        aria-hidden="true"
      >
        {item.milestoneYear}
      </span>
      <article
        className={`bg-surface min-w-0 rounded-2xl border p-6 sm:p-9 lg:mt-24 ${side} ${item.current ? "border-accent/55 bg-accent/[.045]" : "border-border"}`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-accent font-mono text-xs tracking-[.2em] uppercase">
            Chapter 0{index + 1}
          </p>
          {item.current && (
            <span className="border-accent/40 bg-accent/10 text-accent rounded-full border px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              ● Current
            </span>
          )}
        </div>
        {index === 2 && (
          <p className="text-accent mt-5 text-xs font-semibold tracking-[.18em] uppercase">
            India → UAE
          </p>
        )}
        <p className="text-secondary mt-7 text-sm">{item.periodLabel}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-.04em] sm:text-3xl">
          {item.company}
        </h3>
        <p className="text-foreground mt-2 text-base font-medium">
          {item.role}
        </p>
        <p className="text-secondary mt-1 text-sm">{item.location}</p>
        <p className="border-border text-accent mt-8 border-t pt-6 text-sm font-medium">
          {item.careerContext}
        </p>
        <p className="text-secondary mt-3 text-base leading-8">
          {item.summary}
        </p>
        <ul className="text-secondary marker:text-accent mt-5 list-disc space-y-2 pl-5 text-sm leading-7">
          {item.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <motion.ul
          className="mt-8 flex flex-wrap gap-2"
          initial={reduceMotion ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            shown: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.045,
                delayChildren: reduceMotion ? 0 : 0.15,
              },
            },
          }}
        >
          {item.technologies.map((technology) => (
            <motion.li
              key={technology}
              variants={{
                hidden: {
                  opacity: reduceMotion ? 1 : 0,
                  y: reduceMotion ? 0 : 8,
                },
                shown: { opacity: 1, y: 0 },
              }}
              className="border-border text-secondary rounded-full border px-3 py-1.5 text-xs"
            >
              {technology}
            </motion.li>
          ))}
        </motion.ul>
      </article>
    </motion.li>
  );
}

export function ExperienceSection() {
  const track = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start 75%", "end 70%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  return (
    <section
      aria-labelledby="journey-title"
      className="border-border bg-surface/30 border-y py-24 sm:py-32"
    >
      <Container>
        <div className="mb-20 max-w-2xl">
          <p className="text-accent text-xs font-semibold tracking-[.2em] uppercase">
            Kozhikode → Dubai
          </p>
          <h2
            id="journey-title"
            className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-6xl"
          >
            A path built in chapters.
          </h2>
          <p className="text-secondary mt-5 text-lg leading-8">
            Four roles, each expanding the scale of what I build and the
            responsibility I take on.
          </p>
        </div>
        <ol ref={track} aria-label="Career milestones" className="relative">
          <span
            aria-hidden="true"
            className="bg-border absolute top-0 bottom-0 left-[17px] w-[2px] lg:left-1/2 lg:-translate-x-1/2"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : progress }}
            className="bg-accent absolute top-0 bottom-0 left-[17px] w-[2px] origin-top lg:left-1/2 lg:-translate-x-1/2"
          />
          {experience.map((item, index) => (
            <CareerMilestone key={item.company} item={item} index={index} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
