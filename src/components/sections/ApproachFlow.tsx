"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { engineeringApproach } from "@/data/home";
import { motionDistance, motionEase, motionTiming } from "@/lib/motion";

export function ApproachFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  return (
    <div ref={ref} className="border-border relative mt-14 border-t pt-8">
      <motion.div
        aria-hidden="true"
        className="bg-accent/70 absolute top-0 left-0 hidden h-px w-full origin-left md:block"
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: reduceMotion ? 0 : 0.85, ease: motionEase }}
      />
      <motion.div
        aria-hidden="true"
        className="bg-accent/70 absolute top-8 bottom-8 left-0 w-px origin-top md:hidden"
        initial={reduceMotion ? false : { scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : undefined}
        transition={{ duration: reduceMotion ? 0 : 0.85, ease: motionEase }}
      />
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {engineeringApproach.map((pillar, index) => (
          <motion.article
            key={pillar.title}
            initial={
              reduceMotion ? false : { opacity: 0, y: motionDistance.medium }
            }
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: reduceMotion ? 0 : motionTiming.standard,
              delay: reduceMotion ? 0 : 0.12 + index * 0.18,
              ease: motionEase,
            }}
            className="group border-border hover:border-accent/70 border-b pb-6 pl-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 md:border-b-0 md:border-l md:pl-6"
          >
            <p className="text-accent text-xs font-medium tracking-[0.18em]">
              0{index + 1}
            </p>
            <h3 className="mt-5 text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
              {pillar.title}
            </h3>
            <p className="text-secondary mt-3 max-w-md leading-7">
              {pillar.description}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
