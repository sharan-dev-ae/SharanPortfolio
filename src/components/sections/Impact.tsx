import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { impactAreas } from "@/data/home";
import { FadeIn } from "@/components/animations/FadeIn";
import { ImpactVisual } from "@/components/sections/SectionVisuals";

export function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="border-border border-b py-24 sm:py-32"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.88fr)_minmax(0,1.12fr)] lg:gap-16">
          <FadeIn from="left">
            <SectionHeading
              id="impact-title"
              eyebrow="Key impact"
              title="Work shaped around outcomes."
              description="Systems that connect teams, remove repetitive work, and turn operational data into clear decisions."
            />
            <div className="border-border mt-9 divide-y border-y">
              {impactAreas.map((area, index) => (
                <article
                  key={area.title}
                  className="grid grid-cols-[2rem_1fr] gap-3 py-4"
                >
                  <span className="text-accent font-mono text-xs">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{area.title}</h3>
                    <p className="text-secondary mt-1 text-sm leading-6">
                      {area.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
          <FadeIn from="right">
            <ImpactVisual />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
