import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
        <Link
          href="/"
          className="text-secondary hover:text-foreground inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to homepage
        </Link>
        <p className="text-accent mt-14 text-xs font-semibold tracking-[.2em] uppercase">
          Project catalog
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">
          Selected Work
        </h1>
        <p className="text-secondary mt-6 max-w-2xl text-lg leading-8">
          Enterprise applications, workflows, and product experiences. Explore
          the selected case studies below.
        </p>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {ordered.map((project, index) => (
            <div
              key={project.slug}
              className={index < 2 ? "lg:col-span-2" : ""}
            >
              <ProjectCard
                project={project}
                index={index}
                prominent={index < 2}
              />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
