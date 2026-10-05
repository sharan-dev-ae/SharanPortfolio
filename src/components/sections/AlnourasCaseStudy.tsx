import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProjectVisualCarousel } from "@/components/sections/ProjectVisualCarousel";
import { getProjectBySlug } from "@/data/projects";

const modules = [
  ["HR", "Workforce records, roles, attendance, and field team coordination."],
  ["Vehicles", "Fleet records, availability, and maintenance visibility."],
  ["Payroll", "Pay-related operations connected to workforce records."],
  [
    "Trip Logging",
    "Trip activity and completion records for operations teams.",
  ],
  ["Invoices", "Service-based invoicing as part of the operations workflow."],
  [
    "Trip Sheet Entry",
    "Trip preparation and collection details before field execution.",
  ],
] as const;

const challenges = [
  [
    "Connecting office and field work",
    "Keep route assignments, trip records, and progress visible across teams.",
  ],
  [
    "Coordinating multiple modules",
    "Present workforce, fleet, billing, and route information as one operational flow.",
  ],
  [
    "Making routes understandable",
    "Show assigned routes and location context in a form that helps teams monitor work.",
  ],
  [
    "Tracking execution",
    "Connect trip activity and service progress to an operational view.",
  ],
  [
    "Supporting oversight",
    "Bring key activity into dashboards that help teams spot areas needing attention.",
  ],
] as const;

function Section({
  number,
  title,
  children,
  shaded = false,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  shaded?: boolean;
}) {
  return (
    <section
      aria-labelledby={`alnouras-${number}`}
      className={`border-border border-t py-16 sm:py-24 ${shaded ? "bg-surface/40" : ""}`}
    >
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,.37fr)_minmax(0,.63fr)] lg:gap-20">
        <FadeIn>
          <p className="text-accent font-mono text-sm">{number}</p>
          <h2
            id={`alnouras-${number}`}
            className="mt-4 max-w-md text-3xl font-semibold tracking-[-.05em] sm:text-4xl"
          >
            {title}
          </h2>
        </FadeIn>
        <FadeIn
          delay={0.08}
          className="text-secondary max-w-4xl text-base leading-8 sm:text-lg"
        >
          {children}
        </FadeIn>
      </Container>
    </section>
  );
}

function Visual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mt-9 aspect-video w-full overflow-hidden bg-black">
      <Image
        src={src}
        alt={alt}
        width={1680}
        height={945}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function AlnourasCaseStudy() {
  const project = getProjectBySlug("alnouras-app")!;

  return (
    <main id="main-content">
      <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <Link
          href="/#work"
          className="text-secondary hover:text-foreground inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to selected work
        </Link>
        <FadeIn>
          <p className="text-accent mt-14 text-xs font-semibold tracking-[.2em] uppercase">
            {project.category}
          </p>
          <h1 className="mt-5 max-w-5xl text-5xl leading-[1.02] font-semibold tracking-[-.065em] sm:text-7xl">
            {project.title}
          </h1>
          <p className="text-secondary mt-6 max-w-3xl text-xl leading-8">
            Waste Management Operations &amp; Fleet Tracking Platform
          </p>
        </FadeIn>
        <FadeIn
          delay={0.12}
          className="border-border mt-12 flex flex-wrap gap-x-12 gap-y-5 border-t pt-6 text-sm"
        >
          <div>
            <p className="text-secondary">Role</p>
            <p className="mt-2 font-medium">{project.role}</p>
          </div>
          <div>
            <p className="text-secondary">Focus</p>
            <p className="mt-2 font-medium">{project.technicalFocus}</p>
          </div>
        </FadeIn>
        <FadeIn className="mt-14">
          <ProjectVisualCarousel
            visuals={project.visuals ?? []}
            label="Alnouras App conceptual visuals"
          />
        </FadeIn>
      </Container>

      <Section number="01" title="Overview">
        <p>
          Alnouras App brings waste management operations into a connected
          platform. It links people, vehicles, routes, trip activity, invoicing,
          and management visibility so office and field teams can work from a
          shared operational picture.
        </p>
      </Section>
      <Section number="02" title="Business Problem" shaded>
        <p>
          {project.businessProblem} When these activities are handled
          separately, it becomes harder to follow a service from planning and
          assignment through field execution and review.
        </p>
      </Section>
      <Section number="03" title="Solution">
        <p>
          {project.solution} The experience organizes the day-to-day flow from
          workforce and fleet readiness to route execution, service records,
          invoicing, and reporting.
        </p>
      </Section>
      <Section number="04" title="Core Modules" shaded>
        <p>Six connected areas support the operational lifecycle:</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {modules.map(([title, body]) => (
            <div key={title} className="border-border rounded-xl border p-5">
              <h3 className="text-foreground text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-7">{body}</p>
            </div>
          ))}
        </div>
        <Visual
          src="/images/projects/alnouras/platform-overview.png"
          alt="Concept diagram of Alnouras operational modules"
        />
      </Section>
      <Section number="05" title="Dedicated Route Management">
        <p>
          Routes provide a structured way to plan service areas and assign work
          to field teams. The platform connects route preparation with trip
          sheets, vehicles, and the activity recorded during execution.
        </p>
        <Visual
          src="/images/projects/alnouras/operations-workflow.png"
          alt="Concept diagram of route assignment within the operational workflow"
        />
      </Section>
      <Section number="06" title="Map-Based Route Visibility" shaded>
        <p>
          A map view gives operations teams location context for assigned routes
          and vehicles. It helps them understand where work is taking place and
          review progress across service areas.
        </p>
        <Visual
          src="/images/projects/alnouras/route-tracking.png"
          alt="Conceptual map view of waste collection routes across the UAE"
        />
      </Section>
      <Section number="07" title="Progress & Efficiency Monitoring">
        <p>
          Trip and route activity feed a progress view of assigned work,
          completed service stops, and areas that may need attention. This
          supports review of execution and opportunities to improve operations.
        </p>
        <Visual
          src="/images/projects/alnouras/route-progress.png"
          alt="Conceptual route progress and efficiency view"
        />
      </Section>
      <Section number="08" title="Dashboards & Operational Insights" shaded>
        <p>
          Dashboards bring together workforce, fleet, route, trip, and billing
          information for operational oversight. They help teams see the broader
          picture without losing the details of individual workflows.
        </p>
      </Section>
      <Section number="09" title="My Contribution">
        <p>
          Full-stack development and operations platform engineering across the
          connected workflows, with particular focus on route visibility, trip
          execution, and field-to-office coordination.
        </p>
      </Section>
      <Section number="10" title="Engineering Challenges" shaded>
        <div className="grid gap-5 sm:grid-cols-2">
          {challenges.map(([title, body]) => (
            <div key={title} className="border-border rounded-xl border p-5">
              <h3 className="text-foreground text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-7">{body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section number="11" title="Outcome">
        <p>
          The result is a connected operational experience that brings route
          planning, field activity, fleet information, and management visibility
          together. The visuals on this page are conceptual illustrations of the
          product areas.
        </p>
      </Section>
      <Section number="12" title="Technology Stack" shaded>
        <p>Technology details will be added when they are confirmed.</p>
      </Section>
      <section className="border-border border-t py-16 sm:py-24">
        <Container>
          <p className="text-accent text-xs font-semibold tracking-[.2em] uppercase">
            Explore more
          </p>
          <Link
            href="/projects"
            className="hover:text-accent mt-5 inline-flex items-center gap-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            All projects <ArrowUpRight size={28} aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </main>
  );
}
