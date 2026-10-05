import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProjectConceptVisual } from "@/components/ui/ProjectConceptVisual";
import { ProjectVisualCarousel } from "@/components/sections/ProjectVisualCarousel";
import { projectManagement as copy } from "@/data/projectManagement";
import { projects } from "@/data/projects";

function StorySection({
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
      aria-labelledby={`section-${number}`}
      className={`border-border border-t py-20 sm:py-28 ${shaded ? "bg-surface/40" : ""}`}
    >
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,.37fr)_minmax(0,.63fr)] lg:gap-20">
        <FadeIn>
          <p className="text-accent font-mono text-sm">{number}</p>
          <h2
            id={`section-${number}`}
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

export function ProjectManagementCaseStudy() {
  const project = projects.find(
    (item) => item.slug === "project-management-system",
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
          <h1 className="mt-5 max-w-5xl text-5xl leading-[1.02] font-semibold tracking-[-.065em] sm:text-7xl">
            {project.title}
          </h1>
          <p className="text-secondary mt-6 max-w-3xl text-xl leading-8">
            {copy.subtitle}
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
            label="Project Management System conceptual visuals"
          />
        </FadeIn>
      </Container>
      <StorySection number="01" title="Overview">
        <p>{copy.summary}</p>
      </StorySection>
      <StorySection number="02" title="Business Problem" shaded>
        <p>{copy.businessProblem}</p>
      </StorySection>
      <StorySection number="03" title="Solution">
        <p>{copy.solution}</p>
      </StorySection>
      <StorySection number="04" title="Project Structure & Planning" shaded>
        <p>{copy.structure}</p>
        <ProjectConceptVisual kind="structure" className="mt-9" />
      </StorySection>
      <StorySection number="05" title="Percentage-Based Progress Tracking">
        <p>{copy.progress}</p>
      </StorySection>
      <StorySection number="06" title="Site Progress Updates" shaded>
        <p>{copy.site}</p>
        <ProjectConceptVisual kind="workflow" className="mt-9" />
      </StorySection>
      <StorySection number="07" title="Forecasting">
        <p>
          Planning for resources and financial milestones is part of the same
          project view, so future needs can be considered alongside execution.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {copy.forecasts.map((area) => (
            <div
              key={area.title}
              className="border-border rounded-xl border p-6"
            >
              <h3 className="text-foreground text-xl font-semibold">
                {area.title}
              </h3>
              <p className="mt-3 text-sm leading-7">{area.body}</p>
            </div>
          ))}
        </div>
        <ProjectConceptVisual kind="forecast" className="mt-9" />
      </StorySection>
      <StorySection number="08" title="Project Health & Risk Monitoring" shaded>
        <p>{copy.health}</p>
        <ProjectConceptVisual kind="health" className="mt-9" />
      </StorySection>
      <StorySection
        number="09"
        title="From Detailed Progress to Management Visibility"
      >
        <p>{copy.management}</p>
      </StorySection>
      <StorySection number="10" title="Key Functional Areas" shaded>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {copy.functionalAreas.map((area) => (
            <li
              key={area}
              className="border-border before:text-accent border-b pb-3 before:mr-3 before:content-['/']"
            >
              {area}
            </li>
          ))}
        </ul>
      </StorySection>
      <StorySection number="11" title="My Contribution">
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
      </StorySection>
      <StorySection number="12" title="Engineering Challenges" shaded>
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
      </StorySection>
      <StorySection number="13" title="Outcome">
        <ul className="marker:text-accent list-disc space-y-3 pl-5">
          {copy.outcome.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="mt-7 text-sm">
          Qualitative outcomes; no unverified metrics are shown.
        </p>
      </StorySection>
      <StorySection number="14" title="Technical Stack" shaded>
        <p className="mb-6">
          The current portfolio stack reference for this project. Exact
          implementation details can be refined as they are confirmed.
        </p>
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
      </StorySection>
      <Container className="flex flex-wrap items-center justify-between gap-6 py-16 sm:py-20">
        <div>
          <p className="text-secondary text-sm">Previous flagship project</p>
          <Link
            href="/projects/ems-estimation-management-system"
            className="hover:text-accent mt-2 inline-flex items-center gap-2 text-xl font-semibold"
          >
            EMS – Estimation Management System
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
