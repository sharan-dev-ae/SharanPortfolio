import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ExpertiseVisual } from "@/components/sections/SectionVisuals";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="border-border border-b py-20 sm:py-24"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,.7fr)] lg:gap-16">
          <FadeIn from="left">
            <ExpertiseVisual />
          </FadeIn>
          <FadeIn from="right">
            <SectionHeading
              id="expertise-title"
              eyebrow="Technical expertise"
              title="Depth across the full stack."
              description="I build the interface, services, data layer, and delivery path as one connected product—with a particular eye for making complex systems feel clear."
            />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
