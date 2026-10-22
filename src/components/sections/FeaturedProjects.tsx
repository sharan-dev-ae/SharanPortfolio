import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { FeaturedProjectShowcase } from "@/components/sections/FeaturedProjectShowcase";
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
      className="border-border border-b py-14 sm:py-20"
    >
      <Container>
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Systems built around real operational complexity."
            description="A closer look at how I turn fragmented business processes into connected enterprise systems—with clear ownership, reliable handoffs, and workflows built for day-to-day operations."
            className="mx-auto"
          />
          <Link
            href="/projects"
            className="text-secondary hover:text-accent mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            View all projects <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </FadeIn>
        <FadeIn className="mt-8">
          <FeaturedProjectShowcase projects={featuredProjects} />
        </FadeIn>
      </Container>
    </section>
  );
}
