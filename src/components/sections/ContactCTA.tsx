import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { ContactVisual } from "@/components/sections/SectionVisuals";

export function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-border border-b py-24 sm:py-32"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <FadeIn from="left">
            <ContactVisual />
          </FadeIn>
          <FadeIn from="right" className="relative">
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase">
              Let&apos;s connect
            </p>
            <h2
              id="contact-title"
              className="mt-5 text-4xl leading-tight font-semibold tracking-[-0.055em] sm:text-5xl"
            >
              Let&apos;s build something useful.
            </h2>
            <p className="text-secondary mt-5 max-w-xl leading-7">
              Open to software engineering opportunities and meaningful work
              across enterprise systems and digital products.
            </p>
            <p className="text-secondary mt-6 flex items-center gap-2 text-sm">
              <MapPin aria-hidden="true" size={16} /> {siteConfig.location}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={`mailto:${siteConfig.email}`}>
                <Mail aria-hidden="true" size={16} /> Email me
              </Button>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border hover:bg-surface-secondary inline-flex min-h-10 items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              >
                LinkedIn <ArrowUpRight aria-hidden="true" size={14} />
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border hover:bg-surface-secondary inline-flex min-h-10 items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              >
                GitHub <ArrowUpRight aria-hidden="true" size={14} />
              </a>
              <Button href={siteConfig.resumeFilePath} variant="secondary">
                Download resume <Download aria-hidden="true" size={16} />
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
