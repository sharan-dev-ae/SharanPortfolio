"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionDistance, motionEase, motionTiming } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  from = "up",
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x:
                from === "left"
                  ? -motionDistance.medium
                  : from === "right"
                    ? motionDistance.medium
                    : 0,
              y: from === "up" ? motionDistance.medium : 0,
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : motionTiming.standard,
        delay: reduceMotion ? 0 : delay,
        ease: motionEase,
      }}
    >
      {children}
    </motion.div>
  );
}
