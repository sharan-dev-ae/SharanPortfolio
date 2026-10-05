import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillTag } from "@/components/ui/SkillTag";
import { expertiseAreas, skills } from "@/data/skills";
import type { ExpertiseArea } from "@/data/skills";

function ExpertiseCard({ area }: { area: ExpertiseArea }) {
  const areaSkills = skills.filter((skill) => skill.category === area.category);
  return (
    <article className="border-border hover:border-accent/50 bg-surface h-full rounded-xl border p-5 transition-colors sm:p-6">
      <p className="text-accent text-xs font-semibold tracking-[.18em] uppercase">
        {area.category}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-[-.04em] sm:text-2xl">
        {area.title}
      </h3>
      {area.subtitle && (
        <p className="text-accent mt-1 text-sm">{area.subtitle}</p>
      )}
      <p className="text-secondary mt-3 text-sm leading-6">
        {area.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {areaSkills.map((skill) => (
          <li key={skill.name}>
            <SkillTag skill={skill} />
          </li>
        ))}
      </ul>
      <details className="border-border mt-4 border-t pt-3">
        <summary className="text-secondary hover:text-foreground cursor-pointer text-xs font-semibold tracking-[.12em] uppercase">
          What I work on
        </summary>
        <ul className="text-secondary mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs leading-5">
          {area.capabilities.map((capability) => (
            <li
              key={capability}
              className="before:text-accent before:mr-2 before:content-['/']"
            >
              {capability}
            </li>
          ))}
        </ul>
      </details>
    </article>
  );
}

export function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-title"
      className="border-border border-b py-20 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="expertise-title"
          eyebrow="Technical expertise"
          title="Depth across the full stack."
          description="My work spans the full application stack, but I’m especially drawn to the point where engineering meets user experience. I enjoy building interfaces that make complex systems feel simple while owning the APIs, business logic, and data behind them."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {expertiseAreas.map((area, index) => (
            <FadeIn
              key={area.title}
              delay={index * 0.05}
              className={`h-full ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
            >
              <ExpertiseCard area={area} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
