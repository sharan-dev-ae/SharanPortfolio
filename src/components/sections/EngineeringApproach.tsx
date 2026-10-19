import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ApproachVisual } from "@/components/sections/SectionVisuals";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EngineeringApproach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="border-border bg-surface/40 border-y py-24 sm:py-32"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <FadeIn from="left">
            <SectionHeading
              id="approach-title"
              eyebrow="How I work"
              title="From understanding the problem to shipping the solution."
              description="I start with the people and process, shape a clear experience, then carry the solution through APIs, data, integrations, and delivery."
            />
          </FadeIn>
          <FadeIn from="right">
            <ApproachVisual />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
