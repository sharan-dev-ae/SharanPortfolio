"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TimelineProgress() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="bg-accent/70 absolute top-0 left-[11px] h-full w-[2px] origin-top"
      initial={reduceMotion ? false : { scaleY: 0.05 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeOut" }}
    />
  );
}
