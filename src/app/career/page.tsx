import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ExperienceSection } from "@/components/sections/Experience";
import { siteConfig } from "@/config/site";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Career",
  description:
    "The career journey of Sharan Kuniyil Shaji, from software development in Kozhikode to enterprise engineering in Dubai.",
};

export default function CareerPage() {
  return (
    <main id="main-content">
      <Container className="py-20 sm:py-28">
        <Link
          href="/"
          className="text-secondary hover:text-foreground inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft aria-hidden="true" size={16} /> Back to homepage
        </Link>
        <p className="text-accent mt-14 text-xs font-medium tracking-[0.2em] uppercase">
          The journey so far
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
          The Journey So Far.
        </h1>
        <p className="text-secondary mt-7 max-w-3xl text-lg leading-8">
          From building my first full-stack applications in Kozhikode to
          developing large-scale enterprise systems in Dubai.
        </p>
        <div className="border-border text-secondary mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t pt-6 text-sm">
          <p>
            <strong className="text-foreground mr-2 text-xl font-semibold">
              {experience.length}
            </strong>
            roles
          </p>
          <p>
            <strong className="text-foreground mr-2 text-xl font-semibold">
              India → UAE
            </strong>
            career path
          </p>
          <p>
            <strong className="text-foreground mr-2 text-xl font-semibold">
              {siteConfig.engineeringExperience}
            </strong>
            in software
          </p>
        </div>
      </Container>
      <ExperienceSection />
      <section aria-labelledby="evolution-title" className="py-24 sm:py-32">
        <Container>
          <FadeIn>
            <p className="text-accent text-xs font-semibold tracking-[.2em] uppercase">
              Tools along the way
            </p>
            <h2
              id="evolution-title"
              className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-6xl"
            >
              Technology Evolution
            </h2>
            <p className="text-secondary mt-5 max-w-2xl text-lg leading-8">
              The stack has changed with the problems—from web foundations to
              enterprise systems.
            </p>
          </FadeIn>
          <ol className="border-border mt-12 grid gap-0 border-t md:grid-cols-4">
            {[
              { year: "2021", label: "Python · Django · Flask" },
              { year: "2022", label: "React · React Native · Node.js" },
              { year: "2023", label: "Angular · ASP.NET · AWS" },
              { year: "Now", label: "Angular · ASP.NET Core · SQL Server" },
            ].map((stage, index) => (
              <li
                key={stage.year}
                className="border-border border-b py-7 md:pr-8"
              >
                <FadeIn delay={index * 0.09}>
                  <p className="text-accent font-mono text-sm">{stage.year}</p>
                  <p className="mt-4 text-lg leading-7 font-medium">
                    {stage.label}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <Container className="py-16 sm:py-20">
        <Link
          href="/#work"
          className="text-foreground hover:text-accent inline-flex items-center gap-2 text-sm font-semibold"
        >
          Explore selected work <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </Container>
    </main>
  );
}
