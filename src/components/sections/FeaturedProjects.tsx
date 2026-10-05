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
        <FadeIn>
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Enterprise products, thoughtfully engineered."
            description="A selection of enterprise systems where complex workflows, thoughtful interfaces, and full-stack engineering come together."
          />
        </FadeIn>
        <FadeIn className="mt-12">
          <FeaturedProjectCarousel projects={featuredProjects} />
        </FadeIn>
        <Link
          href="/projects"
          className="text-foreground hover:text-accent mt-10 inline-flex items-center gap-2 text-sm font-semibold"
        >
          View all projects <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
