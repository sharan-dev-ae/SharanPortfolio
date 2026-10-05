import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutPreview } from "@/data/about";

export function AboutPreview() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-border border-b py-20 sm:py-28"
    >
      <Container className="grid items-center gap-8 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <FadeIn
          from="left"
          className="about-photo-frame relative order-2 min-h-[360px] sm:min-h-[490px] lg:order-1 lg:min-h-[580px]"
        >
          <Image
            src="/images/profile/about-portrait-bw.png"
            alt="Portrait of Sharan Kuniyil Shaji"
            fill
            sizes="(max-width: 1023px) 100vw, 46vw"
            className="about-photo-image object-cover object-[center_38%]"
          />
        </FadeIn>
        <FadeIn className="order-1 max-w-2xl lg:order-2">
          <SectionHeading
            id="about-title"
            eyebrow="The person behind the systems"
            title="About Me"
          />
          <div className="text-secondary mt-7 space-y-5 text-base leading-8 sm:text-lg">
            {aboutPreview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/about"
            className="text-foreground hover:text-accent mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            More about me <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
