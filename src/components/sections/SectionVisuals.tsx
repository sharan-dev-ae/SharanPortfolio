"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
import { engineeringApproach } from "@/data/home";

const loop = { duration: 4.8, repeat: Infinity, ease: "easeInOut" } as const;

export function ApproachVisual() {
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageDetails = [
    {
      label: "Understand",
      detail: "People + process",
      icon: Search,
      points: [
        "Map the real workflow",
        "Find friction and constraints",
        "Define the useful outcome",
      ],
    },
    {
      label: "Shape",
      detail: "Flow + experience",
      icon: Sparkles,
      points: [
        "Structure the user journey",
        "Clarify hierarchy and states",
        "Prototype the interaction",
      ],
    },
    {
      label: "Build",
      detail: "Product + platform",
      icon: Code2,
      points: [
        "Connect interface and APIs",
        "Engineer data and rules",
        "Validate, deploy, and refine",
      ],
    },
  ];
  const stages = stageDetails.map((stage, index) => ({
    ...stage,
    title: engineeringApproach[index].title,
    description: engineeringApproach[index].description,
  }));
  const active = stages[activeStage];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setInterval(
      () => setActiveStage((current) => (current + 1) % stages.length),
      3800,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, stages.length]);

  return (
    <div
      className="visual-stage min-h-[440px]"
      aria-label="Animated software delivery workflow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="visual-kicker">Idea to production</span>
        <span className="text-secondary font-mono text-[10px]">
          Stage {activeStage + 1} / {stages.length}
        </span>
      </div>
      <div
        className="relative z-10 mt-7 grid grid-cols-3 gap-2"
        role="tablist"
        aria-label="Delivery stages"
      >
        {stages.map(({ label, detail, icon: Icon }, index) => (
          <button
            type="button"
            key={label}
            role="tab"
            aria-selected={index === activeStage}
            aria-controls="approach-stage-panel"
            onClick={() => setActiveStage(index)}
            className={`relative rounded-xl border p-3 text-left transition-all sm:p-4 ${
              index === activeStage
                ? "border-accent/55 bg-accent/[.09]"
                : "border-border bg-background/80 hover:border-secondary"
            }`}
          >
            <div className="bg-accent/10 text-accent flex size-9 items-center justify-center rounded-lg">
              <Icon size={18} aria-hidden="true" />
            </div>
            <p className="mt-4 text-xs font-semibold sm:text-sm">{label}</p>
            <p className="text-secondary mt-1 hidden text-[11px] sm:block">
              {detail}
            </p>
            <span className="text-accent/60 absolute top-3 right-3 font-mono text-[10px]">
              0{index + 1}
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-10 mt-3">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.label}
            id="approach-stage-panel"
            role="tabpanel"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
            className="border-accent/25 bg-background/90 relative overflow-hidden rounded-xl border p-5"
          >
            <div className="flex items-start gap-4">
              <div className="bg-accent/10 text-accent flex size-11 shrink-0 items-center justify-center rounded-lg">
                <ActiveIcon size={21} aria-hidden="true" />
              </div>
              <div>
                <p className="text-accent text-[9px] font-semibold tracking-[.16em] uppercase">
                  {active.detail}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                  {active.title}
                </h3>
              </div>
            </div>
            <p className="text-secondary mt-4 text-sm leading-6">
              {active.description}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {active.points.map((point) => (
                <li
                  key={point}
                  className="border-border flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px]"
                >
                  <Check
                    className="text-accent shrink-0"
                    size={13}
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
            {!reduceMotion && (
              <motion.span
                key={`approach-progress-${activeStage}`}
                className="bg-accent absolute inset-x-0 bottom-0 h-0.5 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.8, ease: "linear" }}
              />
            )}
          </motion.article>
        </AnimatePresence>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {active.title}
      </p>
    </div>
  );
}

export function ExpertiseVisual() {
  const reduceMotion = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState(0);
  const [paused, setPaused] = useState(false);
  const layers = [
    {
      label: "Experience",
      tech: "Angular · React",
      icon: Layers3,
      color: "text-sky-300",
      title: "Frontend Engineering",
      description:
        "Responsive interfaces that turn complex workflows into clear, usable experiences.",
      capabilities: [
        "Component architecture",
        "Enterprise workflows",
        "Dashboards & data UI",
        "Responsive interaction",
      ],
      tools: ["Angular", "TypeScript", "React", "Next.js"],
    },
    {
      label: "Application",
      tech: ".NET · APIs",
      icon: Braces,
      color: "text-violet-300",
      title: "Application Engineering",
      description:
        "Reliable services, business rules, and integrations shaped around real operational processes.",
      capabilities: [
        "REST API design",
        "Business logic",
        "Role-based workflows",
        "Service integration",
      ],
      tools: [".NET", "ASP.NET Core", "C#", "SignalR"],
    },
    {
      label: "Data",
      tech: "SQL Server",
      icon: Database,
      color: "text-amber-300",
      title: "Data & SQL",
      description:
        "Structured data models and performance-aware queries behind high-volume enterprise systems.",
      capabilities: [
        "Database design",
        "Stored procedures",
        "Query optimization",
        "Reporting data",
      ],
      tools: ["SQL Server", "Dapper", "EF Core", "Data modelling"],
    },
    {
      label: "Delivery",
      tech: "Cloud · CI/CD",
      icon: CloudUpload,
      color: "text-emerald-300",
      title: "Delivery & Architecture",
      description:
        "Connected architecture and repeatable delivery practices that take products beyond local development.",
      capabilities: [
        "CI/CD pipelines",
        "Cloud deployment",
        "System architecture",
        "Release reliability",
      ],
      tools: ["AWS", "Docker", "Jenkins", "IIS"],
    },
  ];

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setInterval(
      () => setActiveLayer((current) => (current + 1) % layers.length),
      3600,
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, layers.length]);

  const active = layers[activeLayer];
  const ActiveIcon = active.icon;

  return (
    <div
      className="visual-stage min-h-[470px]"
      aria-label="Animated full-stack architecture"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="visual-grid" aria-hidden="true" />
      <div className="relative z-10 flex items-center justify-between">
        <span className="visual-kicker">Full-stack system</span>
        <span className="text-secondary font-mono text-[10px]">
          Layer {activeLayer + 1} / {layers.length}
        </span>
      </div>
      <div className="relative z-10 mt-7 grid grid-cols-[8.6rem_1.5rem_minmax(0,1fr)] items-center sm:grid-cols-[11rem_2.5rem_minmax(0,1fr)]">
        <div
          className="space-y-2"
          role="tablist"
          aria-label="Full-stack layers"
        >
          {layers.map(({ label, tech, icon: Icon, color }, index) => (
            <button
              type="button"
              key={label}
              role="tab"
              aria-selected={index === activeLayer}
              aria-controls="expertise-layer-panel"
              onClick={() => setActiveLayer(index)}
              className={`relative flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all sm:px-4 sm:py-3.5 ${
                index === activeLayer
                  ? "border-accent/55 bg-accent/[.09]"
                  : "border-border bg-background/80 hover:border-secondary"
              }`}
            >
              <div
                className={`bg-surface-secondary flex size-8 shrink-0 items-center justify-center rounded-md ${color}`}
              >
                <Icon size={15} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold sm:text-sm">{label}</p>
                <p className="text-secondary mt-0.5 truncate text-[9px] sm:text-[10px]">
                  {tech}
                </p>
              </div>
              {index === activeLayer && (
                <motion.span
                  layoutId="active-layer-dot"
                  className="bg-accent absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full shadow-[0_0_12px_rgba(165,180,252,.85)]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative h-full" aria-hidden="true">
          <span className="bg-border absolute top-1/2 right-0 left-0 h-px" />
          <motion.span
            key={`connector-${activeLayer}`}
            className="bg-accent absolute top-1/2 left-0 h-px"
            initial={reduceMotion ? { width: "100%" } : { width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
          />
        </div>

        <div className="min-w-0 pl-1">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.label}
              id="expertise-layer-panel"
              role="tabpanel"
              initial={reduceMotion ? false : { opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.28 }}
              className="border-accent/25 bg-background/90 relative min-h-[330px] overflow-hidden rounded-xl border p-4 sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`bg-accent/10 flex size-10 items-center justify-center rounded-lg ${active.color}`}
                >
                  <ActiveIcon size={19} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-accent text-[9px] font-semibold tracking-[.16em] uppercase">
                    {active.label} layer
                  </p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight sm:text-lg">
                    {active.title}
                  </h3>
                </div>
              </div>
              <p className="text-secondary mt-4 text-xs leading-5 sm:text-sm sm:leading-6">
                {active.description}
              </p>
              <ul className="mt-4 grid gap-2">
                {active.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-center gap-2 text-[11px] sm:text-xs"
                  >
                    <Check
                      className="text-accent shrink-0"
                      size={13}
                      aria-hidden="true"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
              <div className="border-border mt-5 flex flex-wrap gap-1.5 border-t pt-4">
                {active.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border-border bg-surface text-secondary rounded-full border px-2 py-1 text-[9px] sm:text-[10px]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              {!reduceMotion && (
                <motion.span
                  key={`progress-${activeLayer}`}
                  className="bg-accent absolute inset-x-0 bottom-0 h-0.5 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.6, ease: "linear" }}
                />
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {active.title}
      </p>
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
