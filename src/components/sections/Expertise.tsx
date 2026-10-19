import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillTag } from "@/components/ui/SkillTag";
import { expertiseAreas, skills } from "@/data/skills";
import type { ExpertiseArea } from "@/data/skills";
import { ExpertiseVisual } from "@/components/sections/SectionVisuals";
import {
  Braces,
  CloudCog,
  Code2,
  Database,
  Network,
  type LucideIcon,
} from "lucide-react";

const expertiseIcons: Record<ExpertiseArea["category"], LucideIcon> = {
  Frontend: Code2,
  Backend: Braces,
  Database,
  Architecture: Network,
  "DevOps / Cloud": CloudCog,
};

function ExpertiseCard({
  area,
  index,
}: {
  area: ExpertiseArea;
  index: number;
}) {
  const areaSkills = skills.filter((skill) => skill.category === area.category);
  const Icon = expertiseIcons[area.category];
  const visibleSkills = areaSkills.slice(0, 4);
  const remainingSkills = areaSkills.length - visibleSkills.length;

  return (
    <article className="border-border hover:border-accent/45 bg-surface/70 group hover:bg-surface relative h-full overflow-hidden rounded-xl border p-4 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 sm:p-5">
      <span
        aria-hidden="true"
        className="from-accent/70 absolute inset-y-0 left-0 w-px bg-gradient-to-b via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
      />
      <div className="flex items-start gap-4">
        <div className="border-border bg-background text-accent flex size-10 shrink-0 items-center justify-center rounded-lg border">
          <Icon size={18} aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-accent text-[10px] font-semibold tracking-[.17em] uppercase">
              {area.category}
            </p>
            <span className="text-secondary/45 font-mono text-[10px]">
              0{index + 1}
            </span>
          </div>
          <h3 className="mt-1.5 text-lg font-semibold tracking-[-.035em]">
            {area.title}
          </h3>
          <p className="text-secondary mt-2 line-clamp-2 text-xs leading-5">
            {area.description}
          </p>
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-1.5 pl-14">
        {visibleSkills.map((skill) => (
          <li key={skill.name}>
            <SkillTag skill={skill} />
          </li>
        ))}
        {remainingSkills > 0 && (
          <li className="border-border text-secondary rounded-full border px-2.5 py-1 text-[11px]">
            +{remainingSkills}
          </li>
        )}
      </ul>
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
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:gap-16">
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
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          {expertiseAreas.map((area, index) => (
            <FadeIn
              key={area.title}
              delay={index * 0.05}
              className={`h-full ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
            >
              <ExpertiseCard area={area} index={index} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
