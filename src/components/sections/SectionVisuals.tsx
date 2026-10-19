"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Braces,
  Check,
  CloudUpload,
  Code2,
  Database,
  Gauge,
  Layers3,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const loop = { duration: 4.8, repeat: Infinity, ease: "easeInOut" } as const;

export function ApproachVisual() {
  const reduceMotion = useReducedMotion();
  const stages = [
    { label: "Discover", detail: "People + process", icon: Search },
    { label: "Design", detail: "Flow + experience", icon: Sparkles },
    { label: "Deliver", detail: "Product + platform", icon: Code2 },
  ];

  return (
    <div
      className="visual-stage"
      aria-label="Animated software delivery workflow"
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="visual-kicker">Idea to production</span>
        <span className="flex items-center gap-2 text-[11px] text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-300" /> Live
          workflow
        </span>
      </div>
      <div className="relative z-10 mt-10 grid grid-cols-3 gap-2 sm:gap-4">
        {stages.map(({ label, detail, icon: Icon }, index) => (
          <motion.div
            key={label}
            className="border-border/90 bg-background/80 relative rounded-xl border p-3 sm:p-4"
            animate={
              reduceMotion ? undefined : { y: [0, index % 2 ? -5 : 5, 0] }
            }
            transition={{ ...loop, delay: index * 0.45 }}
          >
            <div className="bg-accent/10 text-accent flex size-9 items-center justify-center rounded-lg">
              <Icon size={18} aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm font-semibold">{label}</p>
            <p className="text-secondary mt-1 hidden text-[11px] sm:block">
              {detail}
            </p>
            <span className="text-accent/60 absolute top-3 right-3 font-mono text-[10px]">
              0{index + 1}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="border-border bg-border relative z-10 mx-5 mt-7 h-px">
        <motion.span
          className="bg-accent absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full shadow-[0_0_18px_rgba(165,180,252,.8)]"
          animate={reduceMotion ? { left: "100%" } : { left: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="relative z-10 mt-8 flex items-center justify-between text-xs">
        <span className="text-secondary flex items-center gap-2">
          <Workflow size={14} /> Connected across the stack
        </span>
        <span className="flex items-center gap-1.5 text-emerald-300">
          <Check size={14} /> Shipped
        </span>
      </div>
    </div>
  );
}

export function ExpertiseVisual() {
  const reduceMotion = useReducedMotion();
  const layers = [
    {
      label: "Experience",
      tech: "Angular · React",
      icon: Layers3,
      color: "text-sky-300",
    },
    {
      label: "Application",
      tech: ".NET · APIs",
      icon: Braces,
      color: "text-violet-300",
    },
    {
      label: "Data",
      tech: "SQL Server",
      icon: Database,
      color: "text-amber-300",
    },
    {
      label: "Delivery",
      tech: "Cloud · CI/CD",
      icon: CloudUpload,
      color: "text-emerald-300",
    },
  ];

  return (
    <div
      className="visual-stage min-h-[430px]"
      aria-label="Animated full-stack architecture"
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between">
        <span className="visual-kicker">Full-stack system</span>
        <span className="text-secondary font-mono text-[10px]">
          4 connected layers
        </span>
      </div>
      <div className="relative z-10 mx-auto mt-8 max-w-sm space-y-3">
        {layers.map(({ label, tech, icon: Icon, color }, index) => (
          <motion.div
            key={label}
            className="border-border bg-background/85 flex items-center gap-4 rounded-xl border px-4 py-3 shadow-2xl"
            animate={
              reduceMotion ? undefined : { x: [0, index % 2 ? 7 : -7, 0] }
            }
            transition={{ ...loop, delay: index * 0.35 }}
          >
            <div
              className={`bg-surface-secondary flex size-10 items-center justify-center rounded-lg ${color}`}
            >
              <Icon size={19} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-secondary mt-0.5 text-xs">{tech}</p>
            </div>
            <motion.span
              className="bg-accent size-1.5 rounded-full"
              animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: index * 0.25,
              }}
            />
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 mt-6 flex justify-center">
        <span className="border-accent/30 bg-accent/10 text-accent rounded-full border px-4 py-2 text-xs">
          One product · one connected system
        </span>
      </div>
    </div>
  );
}

export function ImpactVisual() {
  const reduceMotion = useReducedMotion();
  const bars = [46, 72, 58, 88, 68, 94];

  return (
    <div
      className="visual-stage"
      aria-label="Animated enterprise operations dashboard"
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between">
        <span className="visual-kicker">Operational overview</span>
        <span className="flex items-center gap-2 text-[11px] text-emerald-300">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />{" "}
          Synced
        </span>
      </div>
      <div className="relative z-10 mt-7 grid grid-cols-3 gap-3">
        {[
          ["Workflows", "24"],
          ["Automated", "81%"],
          ["Services", "12"],
        ].map(([label, value], index) => (
          <motion.div
            key={label}
            className="border-border bg-background/80 rounded-xl border p-3"
            animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
            transition={{ ...loop, delay: index * 0.5 }}
          >
            <p className="text-secondary text-[10px] uppercase">{label}</p>
            <p className="mt-2 text-xl font-semibold sm:text-2xl">{value}</p>
          </motion.div>
        ))}
      </div>
      <div className="border-border bg-background/80 relative z-10 mt-3 rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">System throughput</span>
          <BarChart3 className="text-accent" size={16} aria-hidden="true" />
        </div>
        <div className="mt-7 flex h-28 items-end gap-2.5">
          {bars.map((height, index) => (
            <motion.span
              key={height + index}
              className="from-accent/35 to-accent flex-1 rounded-t-sm bg-gradient-to-t"
              initial={
                reduceMotion ? { height: `${height}%` } : { height: "10%" }
              }
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                delay: index * 0.08,
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-3 grid grid-cols-2 gap-3">
        <div className="border-border bg-background/80 flex items-center gap-3 rounded-xl border p-3 text-xs">
          <Gauge className="text-emerald-300" size={18} /> Faster decisions
        </div>
        <div className="border-border bg-background/80 flex items-center gap-3 rounded-xl border p-3 text-xs">
          <Workflow className="text-sky-300" size={18} /> Connected teams
        </div>
      </div>
    </div>
  );
}

export function ContactVisual() {
  const reduceMotion = useReducedMotion();
  const channels = [FaWhatsapp, FaLinkedinIn, FaGithub, HiOutlineMail];

  return (
    <div
      className="visual-stage flex min-h-[390px] items-center justify-center"
      aria-label="Animated contact network"
    >
      <div className="visual-grid" aria-hidden="true" />
      <motion.div
        className="border-accent/30 bg-background relative z-10 flex size-32 items-center justify-center rounded-full border shadow-[0_0_50px_rgba(165,180,252,.13)]"
        animate={reduceMotion ? undefined : { scale: [1, 1.035, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Code2 className="text-accent" size={37} aria-hidden="true" />
        <span className="bg-accent absolute -right-1 bottom-4 size-3 rounded-full shadow-[0_0_12px_rgba(165,180,252,.9)]" />
      </motion.div>
      {channels.map((Icon, index) => {
        const positions = [
          "top-[15%] left-[18%]",
          "top-[16%] right-[18%]",
          "bottom-[15%] left-[18%]",
          "right-[18%] bottom-[16%]",
        ];
        return (
          <motion.div
            key={index}
            className={`border-border bg-surface absolute z-10 flex size-12 items-center justify-center rounded-xl border text-lg ${positions[index]}`}
            animate={
              reduceMotion ? undefined : { y: [0, index % 2 ? 6 : -6, 0] }
            }
            transition={{ ...loop, delay: index * 0.55 }}
          >
            <Icon aria-hidden="true" />
          </motion.div>
        );
      })}
      <div
        className="border-accent/20 absolute z-0 size-64 rounded-full border border-dashed"
        aria-hidden="true"
      />
    </div>
  );
}
