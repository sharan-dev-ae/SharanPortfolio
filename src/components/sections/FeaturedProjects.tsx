import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { FeaturedProjectCarousel } from "@/components/sections/FeaturedProjectCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.homepagePriority ?? 99) - (b.homepagePriority ?? 99))
    .slice(0, 4);
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="border-border border-b py-24 sm:py-32"
    >
      <Container>
        <FadeIn className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Systems built around real operational complexity."
            description="Explore the workflows, architecture, and product thinking behind enterprise platforms I have taken from business problem to production."
          />
          <Link
            href="/projects"
            className="text-secondary hover:text-accent inline-flex items-center gap-2 self-start text-sm font-semibold transition-colors lg:self-auto"
          >
            View all projects <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </FadeIn>
        <FadeIn className="mt-14">
          <FeaturedProjectCarousel projects={featuredProjects} />
        </FadeIn>
      </Container>
    </section>
  );
}
