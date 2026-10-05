import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProjectConceptVisual } from "@/components/ui/ProjectConceptVisual";
import { ProjectVisualCarousel } from "@/components/sections/ProjectVisualCarousel";
import { emsCaseStudy as copy } from "@/data/ems";
import { projects } from "@/data/projects";

function Chapter({
  number,
  title,
  children,
  shaded = false,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  shaded?: boolean;
}) {
  return (
    <section
      aria-labelledby={`ems-${number}`}
      className={`border-border border-t py-20 sm:py-28 ${shaded ? "bg-surface/40" : ""}`}
    >
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,.37fr)_minmax(0,.63fr)] lg:gap-20">
        <FadeIn>
          <p className="text-accent font-mono text-sm">{number}</p>
          <h2
            id={`ems-${number}`}
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

export function EmsCaseStudy() {
  const project = projects.find(
    (item) => item.slug === "ems-estimation-management-system",
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
          <h1 className="mt-5 max-w-5xl text-6xl leading-none font-semibold tracking-[-.07em] sm:text-8xl">
            EMS
          </h1>
          <p className="mt-4 text-2xl font-medium tracking-tight sm:text-4xl">
            {copy.subtitle}
          </p>
          <p className="text-secondary mt-7 max-w-3xl text-lg leading-8">
            {project.shortDescription}
          </p>
        </FadeIn>
        <FadeIn
          delay={0.12}
          className="border-border mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t pt-6 text-sm"
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
            label="EMS conceptual visuals"
          />
        </FadeIn>
      </Container>
      <Chapter number="01" title="Overview">
        <p>{copy.overview}</p>
      </Chapter>
      <Chapter number="02" title="Business Problem" shaded>
        <p>{copy.problem}</p>
      </Chapter>
      <Chapter number="03" title="From Opportunity to Quotation">
        <p>
          A single opportunity moves through business and technical review
          before estimation, pricing, and quotation preparation. The sequence
          shown here is a portfolio-safe representation of the lifecycle.
        </p>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2">
          {copy.workflow.map((step, index) => (
            <li
              key={step}
              className="border-border flex items-center gap-4 rounded-xl border p-4"
            >
              <span className="text-accent font-mono text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground font-medium">{step}</span>
            </li>
          ))}
        </ol>
        <ProjectConceptVisual kind="lifecycle" className="mt-9" />
      </Chapter>
      <Chapter number="04" title="Opportunity Intake" shaded>
        <p>{copy.intake}</p>
      </Chapter>
      <Chapter number="05" title="Multi-Stage Approval Workflow">
        <p>{copy.approvals}</p>
        <ProjectConceptVisual kind="roles" className="mt-9" />
      </Chapter>
      <Chapter number="06" title="Estimation Management" shaded>
        <p>{copy.management}</p>
      </Chapter>
      <Chapter number="07" title="Estimator Workflow">
        <p>{copy.estimator}</p>
        <ProjectConceptVisual kind="ems-dashboard" className="mt-9" />
      </Chapter>
      <Chapter number="08" title="Pricing & Commercial Adjustments" shaded>
        <p>{copy.pricing}</p>
      </Chapter>
      <Chapter number="09" title="Quotation Preparation">
        <p>{copy.quotation}</p>
      </Chapter>
      <Chapter number="10" title="Built Around Responsibilities" shaded>
        <p>{copy.roleDescription}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {copy.roles.map((role) => (
            <li
              key={role}
              className="border-border text-foreground rounded-full border px-3 py-1.5 text-sm"
            >
              {role}
            </li>
          ))}
        </ul>
      </Chapter>
      <Chapter number="11" title="Evolving Beyond Estimation">
        <p>{copy.evolving}</p>
        <ProjectConceptVisual kind="modules" className="mt-9" />
      </Chapter>
      <Chapter number="12" title="My Contribution" shaded>
        <p>{copy.contribution}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {copy.contributionAreas.map((area) => (
            <li
              key={area}
              className="border-border text-foreground rounded-full border px-3 py-1.5 text-sm"
            >
              {area}
            </li>
          ))}
        </ul>
      </Chapter>
      <Chapter number="13" title="Engineering Challenges">
        <div className="space-y-7">
          {copy.challenges.map((challenge) => (
            <div key={challenge.title} className="border-border border-b pb-6">
              <h3 className="text-foreground text-xl font-semibold">
                {challenge.title}
              </h3>
              <p className="mt-2">{challenge.body}</p>
            </div>
          ))}
        </div>
        <ProjectConceptVisual kind="architecture" className="mt-9" />
      </Chapter>
      <Chapter number="14" title="Outcome" shaded>
        <ul className="marker:text-accent list-disc space-y-3 pl-5">
          {copy.outcomes.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="mt-7 text-sm">
          Qualitative outcomes; no unverified metrics are shown.
        </p>
      </Chapter>
      <Chapter number="15" title="Technology Stack">
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
            href="/projects/project-management-system"
            className="hover:text-accent mt-2 inline-flex items-center gap-2 text-xl font-semibold"
          >
            Project Management System{" "}
            <ArrowUpRight size={19} aria-hidden="true" />
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
