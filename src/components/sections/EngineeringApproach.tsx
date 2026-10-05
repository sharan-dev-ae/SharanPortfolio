import { Container } from "@/components/layout/Container";
import { ApproachFlow } from "@/components/sections/ApproachFlow";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EngineeringApproach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="border-border bg-surface/40 border-y py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="approach-title"
          eyebrow="How I work"
          title="From understanding the problem to shipping the solution."
          description="I like to understand how a business actually works before deciding how the software should work. From shaping the experience to building APIs, data flows, and database logic, I enjoy owning the path from an idea to a system people can use."
        />
        <ApproachFlow />
      </Container>
    </section>
  );
}
