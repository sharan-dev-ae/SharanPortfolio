import { Container } from "@/components/layout/Container";
import { stats } from "@/data/home";

export function Stats() {
  return (
    <section
      aria-label="Professional snapshot"
      className="border-border bg-surface/60 border-b"
    >
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-border flex flex-col px-3 py-8 first:pl-0 odd:border-r lg:border-r lg:px-10 lg:py-10 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="text-secondary order-2 mt-2 text-xs tracking-[0.12em] uppercase">
                {stat.label}
              </dt>
              <dd className="text-foreground order-1 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
