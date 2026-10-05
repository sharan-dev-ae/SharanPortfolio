"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionDistance, motionEase, motionTiming } from "@/lib/motion";

export function StoryHeading({
  number,
  title,
  eyebrow,
}: {
  number: string;
  title: string;
  eyebrow: string;
}) {
  const reduceMotion = useReducedMotion();
  const transition = {
    duration: reduceMotion ? 0 : motionTiming.standard,
    ease: motionEase,
  };
  return (
    <div className="lg:sticky lg:top-32 lg:self-start">
      <motion.span
        initial={
          reduceMotion ? false : { opacity: 0, x: -motionDistance.medium }
        }
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={transition}
        className="text-accent/70 block font-mono text-7xl font-light tracking-[-.08em] sm:text-8xl"
      >
        {number}
      </motion.span>
      <motion.div
        initial={reduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.08 }}
        className="bg-accent/50 mt-5 h-px w-12 origin-left"
        aria-hidden="true"
      />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: motionDistance.small }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.15 }}
      >
        <p className="text-accent mt-5 text-xs font-semibold tracking-[.2em] uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-.055em] sm:text-6xl">
          {title}
        </h2>
      </motion.div>
    </div>
  );
}
