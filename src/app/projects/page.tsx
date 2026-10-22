import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected enterprise software projects and case studies by Sharan Kuniyil Shaji.",
};

export default function ProjectsPage() {
  const ordered = projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.homepagePriority ?? 99) - (b.homepagePriority ?? 99));
  return (
    <main id="main-content">
      <Container className="py-20 sm:py-28">
        <p className="text-accent text-xs font-semibold tracking-[.2em] uppercase">
          Project catalog
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">
          Selected Work
        </h1>
        <p className="text-secondary mt-6 max-w-2xl text-lg leading-8">
          Enterprise applications, workflows, and product experiences. Explore
          the selected case studies below.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {ordered.map((project, index) => (
            <div key={project.slug}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
