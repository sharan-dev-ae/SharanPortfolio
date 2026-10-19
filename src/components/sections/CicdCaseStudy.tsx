import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  KeyRound,
  Radio,
  RotateCcw,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProjectVisualCarousel } from "@/components/sections/ProjectVisualCarousel";
import { projects } from "@/data/projects";

function Chapter({
  number,
  title,
  children,
  shaded = false,
}: {
  number: string;
  title: string;
  children: ReactNode;
  shaded?: boolean;
}) {
  return (
    <section
      aria-labelledby={`cicd-${number}`}
      className={`border-border border-t py-20 sm:py-28 ${shaded ? "bg-surface/40" : ""}`}
    >
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,.32fr)_minmax(0,.68fr)] lg:gap-20">
        <FadeIn>
          <p className="text-accent font-mono text-sm">{number}</p>
          <h2
            id={`cicd-${number}`}
            className="mt-4 max-w-md text-3xl font-semibold tracking-[-.05em] sm:text-4xl"
          >
            {title}
          </h2>
        </FadeIn>
        <FadeIn
          delay={0.08}
          className="text-secondary max-w-4xl text-base leading-8 sm:text-lg"
        >
          {children}
        </FadeIn>
      </Container>
    </section>
  );
}

const capabilities = [
  {
    title: "Separated release stages",
    body: "Build, package, artifact staging, and backup run independently from the approved production deployment.",
    icon: Workflow,
  },
  {
    title: "Secure release approval",
    body: "Email OTP verification and role-based authorization protect production workflow dispatch.",
    icon: KeyRound,
  },
  {
    title: "Live execution visibility",
    body: "SignalR streams workflow status, execution progress, and error logs into the monitoring experience.",
    icon: Radio,
  },
  {
    title: "Recovery by design",
    body: "Automated backups, post-deployment checks, and rollback make failed releases recoverable and traceable.",
    icon: RotateCcw,
  },
];

export function CicdCaseStudy() {
  const project = projects.find(
    (item) => item.slug === "cicd-monitoring-deployment-platform",
  )!;

  return (
    <main id="main-content">
      <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Link
          href="/#work"
          className="text-secondary hover:text-foreground inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to selected work
        </Link>
        <FadeIn>
          <p className="text-accent mt-14 text-xs font-semibold tracking-[.2em] uppercase">
            {project.category}
          </p>
          <h1 className="mt-5 max-w-6xl text-5xl leading-[.96] font-semibold tracking-[-.07em] sm:text-7xl">
            CI/CD Monitoring & Deployment Management Platform
          </h1>
          <p className="text-secondary mt-7 max-w-4xl text-lg leading-8">
            {project.shortDescription}
          </p>
        </FadeIn>
        <FadeIn
          delay={0.12}
          className="border-border mt-12 grid gap-6 border-t pt-6 text-sm sm:grid-cols-2"
        >
          <div>
            <p className="text-secondary">Role</p>
            <p className="mt-2 font-medium">{project.role}</p>
          </div>
          <div>
            <p className="text-secondary">Focus</p>
            <p className="mt-2 font-medium">{project.technicalFocus}</p>
          </div>
        </FadeIn>
        <FadeIn className="mt-14">
          <ProjectVisualCarousel
            visuals={project.visuals ?? []}
            label="CI/CD deployment workflow"
          />
        </FadeIn>
      </Container>

      <Chapter number="01" title="The release problem">
        <p>{project.businessProblem}</p>
        <p className="mt-5">
          The platform was designed for enterprise Angular applications hosted
          on IIS, where build integrity, production authorization, live
          visibility, and recovery all need to be part of one controlled
          process.
        </p>
      </Chapter>

      <Chapter number="02" title="A controlled delivery path" shaded>
        <p>{project.solution}</p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {capabilities.map(({ title, body, icon: Icon }) => (
            <article
              key={title}
              className="border-border bg-background rounded-xl border p-5"
            >
              <Icon className="text-accent" size={20} aria-hidden="true" />
              <h3 className="text-foreground mt-4 text-base font-semibold">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6">{body}</p>
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter number="03" title="End-to-end workflow">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Source update or manual trigger",
            "Build initialization on a self-hosted runner",
            "Angular build and artifact packaging",
            "Application backup and artifact staging",
            "Authorized approval request",
            "Email OTP verification",
            "Controlled IIS deployment",
            "Real-time monitoring and diagnostics",
            "Verification, recovery, and release history",
          ].map((step, index) => (
            <li
              key={step}
              className="border-border flex gap-3 rounded-xl border p-4"
            >
              <span className="text-accent font-mono text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground text-sm leading-6 font-medium">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Chapter>

      <Chapter number="04" title="Engineering contribution" shaded>
        <ul className="space-y-4">
          {[
            "Architected the deployment platform across Angular, ASP.NET Core Web API, C#, and SQL Server.",
            "Orchestrated GitHub Actions workflows through Windows self-hosted runners for Angular builds and IIS releases.",
            "Enforced approval and OTP validation through role-aware ASP.NET Core APIs.",
            "Built real-time monitoring with SignalR for progress, workflow state, errors, and execution history.",
            "Added automated backups, deployment verification, and rollback for release reliability and traceability.",
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2
                className="text-accent mt-1 shrink-0"
                size={17}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Chapter>

      <Chapter number="05" title="Technology stack">
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="border-accent/30 bg-accent/5 text-foreground rounded-full border px-4 py-2 text-sm"
            >
              {technology}
            </li>
          ))}
        </ul>
      </Chapter>

      <Container className="flex flex-wrap items-center justify-between gap-6 py-16 sm:py-20">
        <div>
          <p className="text-secondary text-sm">Next project</p>
          <Link
            href="/projects/alnouras-app"
            className="hover:text-accent mt-2 inline-flex items-center gap-2 text-xl font-semibold"
          >
            Alnouras App <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
        <Link
          href="/projects"
          className="text-secondary hover:text-foreground text-sm"
        >
          All projects
        </Link>
      </Container>
    </main>
  );
}
