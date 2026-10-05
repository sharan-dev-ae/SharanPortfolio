import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { impactAreas } from "@/data/home";

export function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="border-border border-b py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="impact-title"
          eyebrow="Key impact"
          title="Work shaped around outcomes."
          description="The areas below show the kinds of problems addressed. Verified measures can be added as they become available."
        />
        <div className="border-border mt-12 grid border-t sm:grid-cols-2 xl:grid-cols-4">
          {impactAreas.map((area) => (
            <article
              key={area.title}
              className="border-border border-b py-8 pr-6 sm:even:pl-6 xl:pr-8 xl:even:pl-0"
            >
              {area.metric && (
                <p className="text-accent mb-5 text-3xl font-semibold tracking-tight">
                  {area.metric}
                </p>
              )}
              <h3 className="text-lg font-semibold tracking-tight">
                {area.title}
              </h3>
              <p className="text-secondary mt-3 text-sm leading-7">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
